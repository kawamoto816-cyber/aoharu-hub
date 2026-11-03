import { LEVELS } from "@/lib/school";
import { REGISTRY, UNIT_REGISTRY } from "@/lib/moshi/registry";
import { makeRng, hashSeed } from "@/lib/moshi/rng";
import { buildRound, daimonToSection, pickQuestions, questionCatalog, type Round } from "@/lib/moshi/unit";
import type { Material, MoshiSection, Question, WrittenQ } from "@/lib/moshi/types";
import { examSpecOf } from "./modes";
import type { DaimonSpec, ExamChoice, ExamScope, ExamSpec, ModeId } from "./types";

// 試験モードの1回分を組む (サーバー側で使う。単元模試と大問の全データを読む)。
//   1. 材料: questionCatalog() (書き下ろしの単元模試の全問題) ＋ 従来の大問 (Daimon) を C の節に読みかえたもの
//   2. 「まとまり (Block)」にする: 資料つきの節・前の小問の答えを使う小問・「上の図で」など前を指す小問は、ひとまとまりで出す。
//      それ以外は1問ずつ。まとまりは先頭から切りつめて使える (前を指すのはいつも前の小問なので、先頭からなら崩れない)
//   3. 大問の仕様 (DaimonSpec) ごとに、範囲・タイプ・答えの形式で候補をしぼり、シードで並べてから、
//      難易度の配分と単元のばらけ具合を見て、小問の数が [最小, 最大] に入るまで選ぶ。同じ問題は1回分の中で1度だけ
//   4. 小問の配点を、難易度と記述かどうかの重みで大問の配点に配りなおす (記述は採点基準の点も同じ比で配りなおす)
//   5. 節の並びにして buildRound に渡す (単元模試と同じ形の1回分。画面は MoshiPlay)
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
  /** 元の節 (資料・B の pick) */
  sec: MoshiSection;
  material?: Material[];
  /** 単元を書き入れた問題 (q.unit は必ずある) */
  questions: Question[];
  /** 資料つき・前を指す小問をふくむ (切りつめるときは2問以上残す) */
  linked: boolean;
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
  if (sec.material?.length || (legacy && qs.some(refers))) return [{ key, sec, material: sec.material, questions: qs, linked: true }];
  // 前の小問を使う小問は、前とひとまとまりに (dependsOn は同じ節の前の小問)
  const out: Block[] = [];
  for (const q of qs) {
    const last = out[out.length - 1];
    if (last && refers(q)) {
      last.questions.push(q);
      last.linked = true;
    } else out.push({ key: `${key}#${q.id}`, sec, questions: [q], linked: false });
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
  BLOCKS = out;
  return out;
}

/** 範囲・タイプ・形式に合う問題だけ残す (資料つきのまとまりは、合わない小問と、それを前提にする小問を外す) */
function filterBlock(b: Block, allowed: Set<string>, spec: DaimonSpec, qs: Question[]): Question[] {
  const keep: Question[] = [];
  const dropped = new Set<string>();
  for (const q of qs) {
    const ok = allowed.has(q.unit!) && (!spec.types || spec.types.includes(q.type)) && (!spec.kinds || q.type === "A" || spec.kinds.includes(q.answer.kind)) && !(q.dependsOn && dropped.has(q.dependsOn));
    if (ok) keep.push(q);
    else dropped.add(q.id);
  }
  // A の答えの形式は生成しないとわからないので、kinds の判定は組んだあと (assemble) で見る
  void b;
  return keep;
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

export type ExamBuild =
  | { ok: true; spec: ExamSpec; round: Round; /** 大問ごとの出題元の単元 (検査用) */ allowed: string[][] }
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

export function assemble(spec: ExamSpec, seed: number): ExamBuild {
  const used = new Set<string>();
  const unitUse = new Map<string, number>();
  const shortages: Shortage[] = [];
  const sections: MoshiSection[] = [];
  const allowedList: string[][] = [];

  spec.sections.forEach((ds, si) => {
    const allowedUnits = scopeUnits(spec.scope, ds.from);
    allowedList.push(allowedUnits);
    const allowed = new Set(allowedUnits);
    const rng = makeRng(hashSeed(`${spec.id}:${seed}:${si}`));
    // 候補 (このシードでの中身: B の pick は元の節のルールで選ぶ)
    const cands = rng
      .shuffle(allBlocks().filter((b) => !used.has(b.key)))
      .map((b) => {
        const base = b.material?.length && b.sec.pick !== undefined ? pickQuestions(b.sec, seed, b.key).map((q) => withUnit(q, b.questions[0].unit!)) : b.questions;
        return { b, qs: filterBlock(b, allowed, ds, base) };
      })
      .filter((c) => c.qs.length > 0);
    const [lo, hi] = ds.count;
    const msum = ds.mix[0] + ds.mix[1] + ds.mix[2] || 1;
    const need = apportion(lo, ds.mix.map((m) => m / msum), [0, 0, 0]);
    const chosen: { b: Block; qs: Question[] }[] = [];
    let n = 0;
    const pref = (c: { b: Block }) => (ds.prefer === "material" ? (c.b.material?.length ? 0 : 1) : ds.prefer === "single" ? (c.b.linked ? 1 : 0) : 0);
    while (n < lo) {
      let best: { c: (typeof cands)[number]; take: Question[]; score: number } | null = null;
      for (const c of cands) {
        if (chosen.includes(c)) continue;
        const room = hi - n;
        const take = c.qs.slice(0, room);
        if (take.length === 0 || (c.b.linked && take.length < Math.min(2, c.qs.length))) continue;
        const fit = take.filter((q) => need[q.difficulty - 1] > 0).length;
        const spread = (unitUse.get(take[0].unit!) ?? 0) * 2;
        const over = Math.max(0, n + take.length - lo);
        // 小さいほどよい: 好みの形 → 難易度の配分に合う → 単元がばらける → 最小をこえすぎない
        const score = pref(c) * 100 - fit * 10 + spread + over * 3;
        if (!best || score < best.score) best = { c, take, score };
      }
      if (!best) break;
      chosen.push(best.c);
      used.add(best.c.b.key);
      for (const q of best.take) {
        need[q.difficulty - 1] -= 1;
        unitUse.set(q.unit!, (unitUse.get(q.unit!) ?? 0) + 1);
      }
      best.c.qs = best.take;
      n += best.take.length;
    }
    if (n < lo) {
      shortages.push({ title: ds.title, need: lo, have: n });
      return;
    }
    // 出題順: まとまりは崩さず、易しい順
    const groups = chosen.map((c) => c.qs).sort((a, b) => avgDiff(a) - avgDiff(b));
    const qs = groups.flat();
    const points = apportion(ds.points, qs.map(weightOf), qs.map(minPointsOf));
    const ids = new Map(chosen.flatMap((c) => c.qs.map((q) => [q, `${c.b.sec.id ?? q.unit}~${q.id}`] as const)));
    const idOf = (q: Question) => ids.get(q)!;
    const material = chosen.flatMap((c) => c.b.material ?? []);
    sections.push({
      id: `${spec.id}/d${si + 1}`,
      title: ds.title,
      lead: ds.lead,
      material: material.length ? material : undefined,
      style: material.length ? "reading" : "mix",
      questions: qs.map((q, k) => {
        const g = groups.find((x) => x.includes(q))!;
        const dep = q.dependsOn ? g.find((x) => x.id === q.dependsOn) : undefined;
        return { ...repoint(q, points[k]), id: idOf(q), no: undefined, dependsOn: dep ? idOf(dep) : undefined } as Question;
      }),
    });
  });

  if (shortages.length) return { ok: false, spec, available: availableCount(spec), shortages };
  const units = [...new Set(sections.flatMap((s) => s.questions.map((q) => q.unit!)))];
  const round = buildRound({ id: spec.id, title: spec.title, subject: spec.subject, grade: spec.target, units, minutes: spec.minutes, sections, kind: "jitsuryoku" }, seed);
  return { ok: true, spec, round, allowed: allowedList };
}

const avgDiff = (qs: Question[]) => qs.reduce((a, q) => a + q.difficulty, 0) / Math.max(1, qs.length);

/** えらんだもの → 仕様 → 1回分。仕様が作れなければ null */
export function buildExamRound(mode: ModeId, choice: ExamChoice, seed: number): ExamBuild | null {
  const spec = examSpecOf(mode, choice, subjectNameOf);
  if (!spec) return null;
  return assemble(spec, seed);
}

export const examSpec = (mode: ModeId, choice: ExamChoice) => examSpecOf(mode, choice, subjectNameOf);
