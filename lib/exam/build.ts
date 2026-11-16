import { LEVELS } from "@/lib/school";
import { REGISTRY, UNIT_REGISTRY } from "@/lib/moshi/registry";
import { makeRng, hashSeed } from "@/lib/moshi/rng";
import { buildRound, daimonToSection, materialize, pickQuestions, questionCatalog, type Round } from "@/lib/moshi/unit";
import type { Answer, Material, MoshiSection, QKind, Question, QuestionBody, QuestionC, WrittenQ } from "@/lib/moshi/types";
import { examSpecOf } from "./modes";
import { EXAM_POOL } from "./pool";
import { carriedLead, isGenericLead, leakOf, materialFor, renumber } from "./quality";
import type { DaimonSpec, ExamChoice, ExamScope, ExamSpec, ModeId } from "./types";

// 試験モードの1回分を組む (サーバー側で使う。単元模試と大問の全データを読む)。
//   1. 材料: questionCatalog() (書き下ろしの単元模試の全問題) ＋ 従来の大問 (Daimon) を C の節に読みかえたもの
//   2. 「まとまり (Block)」にする: 資料つきの節・前の小問の答えを使う小問・「上の図で」など前を指す小問は、ひとまとまりで出す。
//      それ以外は1問ずつ。まとまりは先頭から切りつめて使える (前を指すのはいつも前の小問なので、先頭からなら崩れない)
//   3. 大問の仕様 (DaimonSpec) ごとに、範囲・タイプ・答えの形式で候補をしぼり、シードで並べてから、
//      難易度の配分と単元のばらけ具合を見て、小問の数が [最小, 最大] に入るまで選ぶ。同じ問題は1回分の中で1度だけ
//      同じ大問の中で、ある小問の答えが別の小問の問題文・選択肢に出る組み合わせは選ばない (まとまりの中なら後の小問を外す。lib/exam/quality.ts)
//   4. 小問の配点を、難易度と記述かどうかの重みで大問の配点に配りなおす (記述は採点基準の点も同じ比で配りなおす)
//   5. 問題として読めるように直す: 元の節の lead にしかない指示・条件を問題文へ移す／「(3) の答え」などの番号を組みなおした番号に／
//      資料は使う小問の直前へ (「(6) …」と番号のある資料はその小問の前、まとまりの資料はまとまりの最初の小問の前。大問の最初なら大問の頭)／
//      分野つきの題 (tsec) は、出た小問の分野だけの題に
//   6. 節の並びにして buildRound に渡す (単元模試と同じ形の1回分。画面は MoshiPlay)
// 問題が足りない大問があれば、組まずに「この範囲はまだ問題が少ない」を返す。

// ---- 地図の場所 ----

interface UnitLoc {
  level: ExamScope["level"];
  subjectKey: string;
  subjectName: string;
  group: string;
}
const LOC = new Map<string, UnitLoc>();
for (const l of LEVELS) for (const s of l.subjects) for (const g of s.groups) for (const u of g.units) LOC.set(u.id, { level: l.key as UnitLoc["level"], subjectKey: s.key, subjectName: s.name, group: g.title });
export const unitLoc = (u: string) => LOC.get(u);

export const subjectNameOf = (level: ExamScope["level"], key: string) => LEVELS.find((l) => l.key === level)?.subjects.find((s) => s.key === key)?.name;

/** 範囲の単元 (地図の順) */
export function scopeUnits(scope: ExamScope, from?: DaimonSpec["from"]): string[] {
  const l = LEVELS.find((x) => x.key === scope.level);
  const s = l?.subjects.find((x) => x.key === scope.subjectKey);
  if (!s) return [];
  const out: string[] = [];
  for (const g of s.groups) {
    if (scope.groups && !scope.groups.includes(g.title)) continue;
    if (from?.groups && !from.groups.includes(g.title)) continue;
    for (const u of g.units) {
      if (scope.units && !scope.units.includes(u.id)) continue;
      if (from?.units && !from.units.includes(u.id)) continue;
      out.push(u.id);
    }
  }
  return out;
}

// ---- まとまり ----

interface Block {
  key: string;
  /** 元の節 (同じ節から分けたまとまりは同じ src) */
  src: string;
  /** 元の節 (資料・B の pick) */
  sec: MoshiSection;
  material?: Material[];
  /** 単元を書き入れた問題 (q.unit は必ずある) */
  questions: Question[];
  /** 資料つき・前を指す小問をふくむ (切りつめるときは2問以上残す) */
  linked: boolean;
  /** 試験モードだけの問題 (lib/exam/pool) の tag */
  tag?: string;
}

/** 前の小問・図を指す言い方 (この小問だけ取り出すと意味が通らない) */
const REFERS = /上の|前の|右の図|左の図|[（(][0-9０-９]+[)）](で|の|と)|この(図|表|グラフ|式|関数|三角形|四角形|円|立体|実験|装置|回路|文章|資料)|図[0-9０-９１-９]*のように|同じ(図|実験|装置)/;

function withUnit(q: Question, unit: string): Question {
  return { ...q, unit: q.unit ?? unit } as Question;
}

function sectionBlocks(sec: MoshiSection, fileUnit: string, legacy: boolean): Block[] {
  const qs = sec.questions.map((q) => withUnit(q, fileUnit));
  const key = sec.id ?? fileUnit;
  const refers = (q: Question) => !!q.dependsOn || (q.type !== "A" && REFERS.test(q.prompt));
  if (sec.material?.length || (legacy && qs.some(refers))) return [{ key, src: key, sec, material: sec.material, questions: qs, linked: true }];
  // 前の小問を使う小問は、前とひとまとまりに (dependsOn は同じ節の前の小問)
  const out: Block[] = [];
  for (const q of qs) {
    const last = out[out.length - 1];
    if (last && refers(q)) {
      last.questions.push(q);
      last.linked = true;
    } else out.push({ key: `${key}#${q.id}`, src: key, sec, questions: [q], linked: false });
  }
  return out;
}

let BLOCKS: Block[] | null = null;
/** すべてのまとまり (はじめて使うときに作る) */
function allBlocks(): Block[] {
  if (BLOCKS) return BLOCKS;
  const out: Block[] = [];
  // 書き下ろしの単元模試: 目録 (questionCatalog) を節ごとに集め、節の資料・pick は元の節から
  const secById = new Map<string, { sec: MoshiSection; unit: string }>();
  for (const m of Object.values(UNIT_REGISTRY)) m.sections.forEach((s, i) => secById.set(s.id ?? `${m.unit}/s${i + 1}`, { sec: s, unit: m.unit }));
  const seen = new Set<string>();
  for (const e of questionCatalog()) {
    if (seen.has(e.section)) continue;
    seen.add(e.section);
    const s = secById.get(e.section);
    if (s) out.push(...sectionBlocks({ ...s.sec, id: e.section }, s.unit, false));
  }
  // 従来の大問 (書き下ろしの単元模試がない単元だけ)
  for (const [unit, ds] of Object.entries(REGISTRY)) {
    if (UNIT_REGISTRY[unit]) continue;
    for (const d of ds) out.push(...sectionBlocks(daimonToSection(d), unit, true));
  }
  // 試験モードだけの問題 (tag つき。tag のない大問には出さない)
  for (const p of EXAM_POOL) for (const b of sectionBlocks(p.section, p.unit, false)) out.push({ ...b, key: `pool:${p.tag}:${b.key}`, tag: p.tag });
  BLOCKS = out;
  return out;
}

/** 範囲・タイプ・形式に合う問題だけ残す (資料つきのまとまりは、合わない小問と、それを前提にする小問を外す) */
function filterBlock(b: Block, allowed: Set<string>, spec: DaimonSpec, qs: Question[]): Question[] {
  const keep: Question[] = [];
  const dropped = new Set<string>();
  for (const q of qs) {
    const ok = allowed.has(q.unit!) && (!spec.types || spec.types.includes(q.type)) && (!spec.kinds || spec.kinds.includes(kindOf(q))) && !(q.dependsOn && dropped.has(q.dependsOn));
    if (ok) keep.push(q);
    else dropped.add(q.id);
  }
  void b;
  return keep;
}

/** 答えの形式。A は生成しないとわからないので、決まったシードで1度だけ作ってみる (生成のたびに形式が変わる A はない前提。check-exam が確かめる) */
const A_KIND = new WeakMap<object, QKind>();
function kindOf(q: Question): QKind {
  if (q.type !== "A") return q.answer.kind;
  let k = A_KIND.get(q.generate);
  if (!k) {
    try {
      k = q.generate(makeRng(1)).answer.kind;
    } catch {
      k = "written";
    }
    A_KIND.set(q.generate, k);
  }
  return k;
}

/** 単元ごとの問題数 (範囲をえらぶ画面用) */
export function questionCountByUnit(): Record<string, number> {
  const out: Record<string, number> = {};
  for (const b of allBlocks()) for (const q of b.questions) out[q.unit!] = (out[q.unit!] ?? 0) + 1;
  return out;
}

// ---- 配点 ----

const weightOf = (q: Question) => (1 + 0.3 * (q.difficulty - 1)) * (q.type !== "A" && q.answer.kind === "written" ? 1.6 : 1);
const minPointsOf = (q: Question) => (q.type !== "A" && q.answer.kind === "written" ? Math.max(1, q.answer.rubric.length) : 1);

/** total を重みの比で整数に配る (各 min 以上、合計ぴったり) */
export function apportion(total: number, weights: number[], mins: number[]): number[] {
  const base = mins.slice();
  let rest = total - base.reduce((a, b) => a + b, 0);
  if (rest < 0) {
    // 最小を守れないときは 1 ずつ
    const out = weights.map(() => 0);
    for (let i = 0; i < total; i++) out[i % out.length] += 1;
    return out;
  }
  const W = weights.reduce((a, b) => a + b, 0) || 1;
  const raw = weights.map((w) => (rest * w) / W);
  const fl = raw.map(Math.floor);
  rest -= fl.reduce((a, b) => a + b, 0);
  const order = raw.map((r, i) => [r - fl[i], i] as const).sort((a, b) => b[0] - a[0] || a[1] - b[1]);
  for (let k = 0; k < rest; k++) fl[order[k % order.length][1]] += 1;
  return base.map((b, i) => b + fl[i]);
}

function repoint(q: Question, points: number): Question {
  if (q.type === "A" || q.answer.kind !== "written" || q.points === points) return { ...q, points } as Question;
  const w = q.answer as WrittenQ;
  const ps = apportion(points, w.rubric.map((r) => r.points), w.rubric.map(() => (points >= w.rubric.length ? 1 : 0)));
  return { ...q, points, answer: { ...w, rubric: w.rubric.map((r, i) => ({ ...r, points: ps[i] })) } } as Question;
}

// ---- 組み立て ----

export interface Shortage {
  title: string;
  need: number;
  have: number;
}

/** 組み立てた小問の出どころ (検査用): 元の節と、その節が本文 (passage) の資料つきか */
export interface ItemSource {
  src: string;
  passage: boolean;
}

export type ExamBuild =
  | { ok: true; spec: ExamSpec; round: Round; /** 大問ごとの出題元の単元 (検査用) */ allowed: string[][]; /** 大問ごと・小問ごとの出どころ (検査用) */ sources: ItemSource[][] }
  | { ok: false; spec: ExamSpec; /** 範囲に入る問題の数 */ available: number; shortages: Shortage[] };

/** 範囲に入る問題の数 (大問の出題元をあわせたもの・形式のしぼりこみ後) */
export function availableCount(spec: ExamSpec): number {
  const keys = new Set<string>();
  for (const ds of spec.sections) {
    const allowed = new Set(scopeUnits(spec.scope, ds.from));
    for (const b of allBlocks()) for (const q of filterBlock(b, allowed, ds, b.questions)) keys.add(`${b.key}|${q.unit}|${q.id}`);
  }
  return keys.size;
}

/** 分野つきの題 (tsec) → 出た小問の単元がふくまれる分野だけの題。分野のない大問は仕様の題のまま */
export function daimonTitle(ds: DaimonSpec, units: string[]): string {
  if (!ds.topics || !ds.titleTemplate) return ds.title;
  const used = ds.topics.filter((t) => t.units.some((u) => units.includes(u)));
  return used.length ? ds.titleTemplate.replace("{t}", used.map((t) => t.label).join("・")) : ds.title;
}

/** 候補の小問 (このシードでの中身つき) */
interface Prep {
  q: Question;
  body: QuestionBody;
  /** 元の節での番号 (「(3) の答え」の 3) */
  orig: number;
}
interface Cand {
  b: Block;
  /** 範囲・形式でしぼった小問 */
  qs: Question[];
  /** 元の節での番号を数える並び */
  numbering: Question[];
  /** 中身つき (prep で作る) */
  ps?: Prep[];
}
/** 選んだまとまり */
interface Group {
  b: Block;
  ps: Prep[];
}

const hasPassage = (b: Block) => !!b.material?.some((m) => m.kind === "passage");
const leaks = (x: Prep, y: Prep, same: boolean) => !!leakOf(x.body, y.body, same) || !!leakOf(y.body, x.body, same);

/** まとまりの中で、前の小問の答えが後の小問に出る (または逆) なら、後の小問を外す (それを前提にする小問も) */
function dropInnerLeaks(b: Block, ps: Prep[]): Prep[] {
  if (ps.length < 2 && !b.material?.length) return ps;
  const keep: Prep[] = [];
  const dropped = new Set<string>();
  const passage = hasPassage(b);
  // 資料 (本文以外) に答えの語句がそのまま書いてある小問も外す (「母線の長さが 12cm の円錐」と「母線を何といいますか」)
  const shown = passage ? null : { prompt: "", answer: { kind: "term", accept: [] } as Answer, material: b.material };
  for (const p of ps) {
    if (shown && p.body.answer.kind === "term" && leakOf(p.body, shown, true)) {
      dropped.add(p.q.id);
      continue;
    }
    // 本文つきのまとまりは、本文に答えの語句があるのがふつうなので、語句・選択の答えはくらべない (数だけ)
    const bad = (p.q.dependsOn && dropped.has(p.q.dependsOn)) || keep.some((k) => (passage ? numLeak(k, p) : leaks(k, p, true)));
    if (bad) dropped.add(p.q.id);
    else keep.push(p);
  }
  return keep;
}
const numLeak = (x: Prep, y: Prep) => (x.body.answer.kind === "num" && !!leakOf(x.body, y.body, true)) || (y.body.answer.kind === "num" && !!leakOf(y.body, x.body, true));

/** 元の節での番号: 書いてある番号 (従来の大問の "(3)") か、節の中の順番 */
function origNo(q: Question, list: Question[]): number {
  const m = q.no?.match(/[（(]([0-9０-９]+)[)）]/);
  if (m) return Number(m[1].normalize("NFKC"));
  const i = list.findIndex((x) => x.id === q.id);
  return i + 1;
}

export function assemble(spec: ExamSpec, seed: number): ExamBuild {
  const used = new Set<string>();
  const unitUse = new Map<string, number>();
  const shortages: Shortage[] = [];
  const sections: MoshiSection[] = [];
  const allowedList: string[][] = [];
  const sources: ItemSource[][] = [];
  let varies = false;

  spec.sections.forEach((ds, si) => {
    const allowedUnits = scopeUnits(spec.scope, ds.from);
    allowedList.push(allowedUnits);
    const allowed = new Set(allowedUnits);
    const rng = makeRng(hashSeed(`${spec.id}:${seed}:${si}`));
    // 候補 (このシードでの中身: B の pick は元の節のルールで選ぶ。A はこのシードで生成した中身)
    const cands: Cand[] = rng
      .shuffle(allBlocks().filter((b) => !used.has(b.key) && b.tag === ds.poolTag))
      .map((b) => {
        const picked = b.material?.length && b.sec.pick !== undefined;
        const base = picked ? pickQuestions(b.sec, seed, b.key).map((q) => withUnit(q, b.questions[0].unit!)) : b.questions;
        return { b, qs: filterBlock(b, allowed, ds, base), numbering: picked ? base : b.sec.questions };
      })
      .filter((c) => c.qs.length > 0);
    // このシードでの中身 (A の生成) と、まとまりの中の答えのもれを外したもの。選ぶ候補になったときに作る
    const prep = (c: Cand): Prep[] => {
      if (!c.ps) {
        c.ps = c.qs.map((q) => ({ q, body: materialize(q, seed, q.unit!), orig: origNo(q, c.numbering) }));
        c.ps = dropInnerLeaks(c.b, c.ps);
      }
      return c.ps;
    };
    const [lo, hi] = ds.count;
    const msum = ds.mix[0] + ds.mix[1] + ds.mix[2] || 1;
    const need = apportion(lo, ds.mix.map((m) => m / msum), [0, 0, 0]);
    const chosen: { c: Cand; take: Prep[] }[] = [];
    let n = 0;
    const pref = (c: Cand) => (ds.prefer === "material" ? (c.b.material?.length ? 0 : 1) : ds.prefer === "single" ? (c.b.linked ? 1 : 0) : 0);
    const takeOf = <T,>(c: Cand, list: T[]): T[] | null => {
      const take = list.slice(0, hi - n);
      return take.length === 0 || (c.b.linked && take.length < Math.min(2, list.length)) ? null : take;
    };
    while (n < lo) {
      // 小さいほどよい: 好みの形 → 難易度の配分に合う → 単元がばらける → 最小をこえすぎない
      const scored: { c: Cand; score: number }[] = [];
      for (const c of cands) {
        if (chosen.some((x) => x.c === c)) continue;
        const take = takeOf(c, c.ps ?? c.qs.map((q) => ({ q })));
        if (!take) continue;
        const fit = take.filter((p) => need[p.q.difficulty - 1] > 0).length;
        const spread = (unitUse.get(take[0].q.unit!) ?? 0) * 2;
        const over = Math.max(0, n + take.length - lo);
        scored.push({ c, score: pref(c) * 100 - fit * 10 + spread + over * 3 });
      }
      scored.sort((x, y) => x.score - y.score);
      let best: { c: Cand; take: Prep[] } | null = null;
      for (const { c } of scored) {
        const take = takeOf(c, prep(c));
        if (!take) continue;
        // ほかのまとまりの小問と答えがもれあう組み合わせは選ばない
        if (chosen.some((x) => x.take.some((p) => take.some((t) => leaks(p, t, x.c.b.src === c.b.src))))) continue;
        best = { c, take };
        break;
      }
      if (!best) break;
      chosen.push(best);
      used.add(best.c.b.key);
      for (const p of best.take) {
        need[p.q.difficulty - 1] -= 1;
        unitUse.set(p.q.unit!, (unitUse.get(p.q.unit!) ?? 0) + 1);
      }
      n += best.take.length;
    }
    if (n < lo) {
      shortages.push({ title: ds.title, need: lo, have: n });
      return;
    }
    // 出題順: まとまりは崩さず、易しい順
    const groups = chosen.map((x) => ({ b: x.c.b, ps: x.take })).sort((a, b) => avgDiff(a.ps.map((p) => p.q)) - avgDiff(b.ps.map((p) => p.q)));
    const flat = groups.flatMap((c) => c.ps.map((p) => ({ c, p })));
    const qs = flat.map((x) => x.p.q);
    varies ||= qs.some((q) => q.type !== "C");
    const points = apportion(ds.points, qs.map(weightOf), qs.map(minPointsOf));
    const idOf = (c: Group, q: Question) => `${c.b.sec.id ?? q.unit}~${q.id}`;
    const daimonMaterial: Material[] = [];
    const itemMaterial = new Map<Prep, Material[]>();
    const bodies = new Map<Prep, QuestionBody>();
    let at = 0;
    for (const c of groups) {
      const first = at;
      // 元の節での番号 → この大問での番号
      const map = new Map(c.ps.map((p, k) => [p.orig, first + k + 1] as const));
      const rn = (t: string) => renumber(t, map);
      for (const p of c.ps) bodies.set(p, renumberBody(p.body, rn));
      // 元の節の lead にしかない指示・条件: 1問なら問題文の前に、まとまりなら最初の資料に
      const mats: Material[] = (c.b.material ?? []).slice();
      const lead = c.b.sec.lead;
      if (lead && lead !== ds.lead && !isGenericLead(lead)) {
        const carry = carriedLead(lead, c.ps.map((p) => bodies.get(p)!.prompt));
        if (carry && c.ps.length === 1 && !mats.length) {
          const p = c.ps[0];
          bodies.set(p, { ...bodies.get(p)!, prompt: `${carry}\n${bodies.get(p)!.prompt}` });
        } else if (carry) mats.unshift({ kind: "text", body: carry });
      }
      // 資料は使う小問の直前に。「(6) …」なら (6) の前 (番号は外す)、「(1)〜(3) は…」なら (1) の前、番号がなければまとまりの最初の小問の前
      mats.forEach((m) => {
        const f = materialFor(m);
        let target = c.ps[0];
        let mm = renumberMaterial(m, rn);
        if (f) {
          const hit = c.ps.find((p) => f.nos.includes(p.orig));
          if (!hit) return; // 使う小問が出ていない資料は出さない
          target = hit;
          if (f.nos.length === 1) mm = renumberMaterial(withMaterialText(m, f.rest), rn);
        }
        if (target === flat[0].p) daimonMaterial.push(mm);
        else itemMaterial.set(target, [...(itemMaterial.get(target) ?? []), mm]);
      });
      at += c.ps.length;
    }
    sources.push(flat.map(({ c }) => ({ src: c.b.src, passage: hasPassage(c.b) })));
    sections.push({
      id: `${spec.id}/d${si + 1}`,
      title: daimonTitle(ds, qs.map((q) => q.unit!)),
      lead: ds.lead,
      material: daimonMaterial.length ? daimonMaterial : undefined,
      style: daimonMaterial.length || itemMaterial.size ? "reading" : "mix",
      questions: flat.map(({ c, p }, k) => {
        const q = p.q;
        const body = bodies.get(p)!;
        const dep = q.dependsOn ? c.ps.find((x) => x.q.id === q.dependsOn) : undefined;
        const fixed: QuestionC = {
          id: idOf(c, q),
          type: "C",
          difficulty: q.difficulty,
          points: q.points,
          seconds: q.seconds,
          skill: q.skill,
          unit: q.unit,
          tags: q.tags,
          dependsOn: dep ? idOf(c, dep.q) : undefined,
          ...body,
          material: itemMaterial.get(p),
        };
        return repoint(fixed, points[k]);
      }),
    });
  });

  if (shortages.length) return { ok: false, spec, available: availableCount(spec), shortages };
  const units = [...new Set(sections.flatMap((s) => s.questions.map((q) => q.unit!)))];
  const round = buildRound({ id: spec.id, title: spec.title, subject: spec.subject, grade: spec.target, units, minutes: spec.minutes, sections, kind: "jitsuryoku" }, seed);
  // 中身はこのシードで作り済み (C にした) なので、「もう一度でちがう問題になるか」は元の問題で決める
  return { ok: true, spec, round: { ...round, varies }, allowed: allowedList, sources };
}

function renumberBody(b: QuestionBody, rn: (t: string) => string): QuestionBody {
  const a = b.answer;
  const answer = a.kind === "choice" ? { ...a, options: a.options.map(rn), why: a.why.map(rn) } : a.kind === "written" ? { ...a, model: rn(a.model), rubric: a.rubric.map((r) => ({ ...r, label: rn(r.label) })) } : a;
  return { ...b, prompt: rn(b.prompt), answer, point: rn(b.point), steps: b.steps.map((st) => ({ ...st, title: rn(st.title), body: rn(st.body), trap: st.trap && rn(st.trap) })) };
}

function renumberMaterial(m: Material, rn: (t: string) => string): Material {
  if (m.kind === "table") return { ...m, caption: rn(m.caption) };
  if (m.kind === "text" || m.kind === "passage") return { ...m, body: rn(m.body) };
  return m;
}

function withMaterialText(m: Material, t: string): Material {
  if (m.kind === "table") return { ...m, caption: t };
  if (m.kind === "text" || m.kind === "passage") return { ...m, body: t };
  return m;
}

const avgDiff = (qs: Question[]) => qs.reduce((a, q) => a + q.difficulty, 0) / Math.max(1, qs.length);

/** えらんだもの → 仕様 → 1回分。仕様が作れなければ null */
export function buildExamRound(mode: ModeId, choice: ExamChoice, seed: number): ExamBuild | null {
  const spec = examSpecOf(mode, choice, subjectNameOf);
  if (!spec) return null;
  return assemble(spec, seed);
}

export const examSpec = (mode: ModeId, choice: ExamChoice) => examSpecOf(mode, choice, subjectNameOf);
