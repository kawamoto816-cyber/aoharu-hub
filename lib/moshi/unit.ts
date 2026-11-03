import { hasLecture, lectureHref } from "@/lib/lecture";
import { daimonOfUnit, MOSHI_HOME, moshiUnitInfo, resolveDaimon } from "./index";
import { UNIT_REGISTRY } from "./registry";
import { hashSeed, makeRng } from "./rng";
import type { Answer, ChoiceQ, Daimon, Exam, Item, MoshiSection, Question, QuestionBody, QuestionC, UnitMoshi } from "./types";

// 単元模試 (/learn/moshi/<単元id>) を組む。サーバー側で使う (レクチャー・大問の全データを読む)。
//   - lib/moshi/data/<単元id>.ts に UnitMoshi があればそれを使う
//   - なければ、その単元の大問 (Daimon) を「C (固定) の節」に読みかえて使う (従来の定期テスト模試のデータをそのまま読む)
// 1回分は「節 → 大問 (Daimon)」に変えて返すので、画面は定期テスト模試と同じ MoshiPlay で解ける。

export const unitMoshiHref = (unit: string, seed?: number) => `${MOSHI_HOME}/${encodeURIComponent(unit)}${seed ? `?seed=${seed}` : ""}`;

/** 書き下ろしの単元模試 (UnitMoshi) がある単元 */
export const UNIT_MOSHI_IDS = Object.keys(UNIT_REGISTRY);
export const getUnitMoshi = (unit: string): UnitMoshi | undefined => UNIT_REGISTRY[unit];

// ---- 大問 → 節 (アダプタ) ----

function itemToQuestion(d: Daimon, it: Item): QuestionC {
  return {
    id: it.id,
    type: "C",
    no: it.no,
    difficulty: it.level,
    points: it.points,
    seconds: Math.round((d.minutes * 60) / Math.max(1, d.items.length)),
    skill: it.skill,
    unit: it.unit,
    dependsOn: it.dependsOn,
    prompt: it.prompt,
    figure: it.figure,
    answer: it.answer,
    steps: it.steps,
    point: it.point,
  };
}

/** 大問1つを C (固定) の節にする */
export function daimonToSection(d: Daimon): MoshiSection {
  return { id: d.id, title: d.title, lead: d.lead, material: d.material, style: d.style, questions: d.items.map((it) => itemToQuestion(d, it)) };
}

/** 単元の大問から UnitMoshi を作る (UnitMoshi が書かれていない単元用)。大問がなければ undefined */
export function unitMoshiFromDaimon(unit: string): UnitMoshi | undefined {
  const ds = daimonOfUnit(unit);
  if (ds.length === 0) return undefined;
  return {
    unit,
    subject: ds[0].subject,
    grade: ds[0].grade,
    minutes: ds.reduce((a, d) => a + d.minutes, 0),
    sections: ds.map(daimonToSection),
    review: { status: ds.every((d) => d.review.status !== "draft") ? "checked" : "draft" },
  };
}

/** 単元の模試 (書き下ろし → なければ大問から) */
export const unitMoshiOf = (unit: string): UnitMoshi | undefined => getUnitMoshi(unit) ?? unitMoshiFromDaimon(unit);
/** 単元模試のページがある単元か (書き下ろし または 大問がある) */
export const hasUnitMoshi = (unit: string) => !!unitMoshiOf(unit);

// ---- 1問を出す形にする ----

/** 問題ごとのシード (同じシード・同じ問題なら、どの回・どのモードで出ても同じ数値) */
export const questionSeed = (seed: number, unit: string, qid: string) => hashSeed(`${seed}:${unit}:${qid}`);

/** 選択肢をシードで並べかえる (correct・why・mistakeOf もいっしょに) */
function shuffleChoice(a: ChoiceQ, seed: number): ChoiceQ {
  const order = makeRng(seed).shuffle(a.options.map((_, i) => i));
  const at = (i: number) => order.indexOf(i);
  return {
    ...a,
    options: order.map((i) => a.options[i]),
    why: order.map((i) => a.why[i]),
    mistakeOf: a.mistakeOf ? order.map((i) => a.mistakeOf![i] ?? null) : undefined,
    correct: Array.isArray(a.correct) ? a.correct.map(at) : at(a.correct),
  };
}

/** 問題を、このシードの中身にする (A は生成、B は選択肢の並べかえ、C はそのまま) */
export function materialize(q: Question, seed: number, unit: string): QuestionBody {
  const s = questionSeed(seed, unit, q.id);
  if (q.type === "A") return q.generate(makeRng(s));
  const body: QuestionBody = { prompt: q.prompt, figure: q.figure, answer: q.answer, steps: q.steps, point: q.point };
  if (q.type === "B" && !q.keepOrder && q.answer.kind === "choice") return { ...body, answer: shuffleChoice(q.answer, s) as Answer };
  return body;
}

/** 節の中から、このシードで出す問題を選ぶ。A・C は全部。B は pick 問を、難易度がかたよらないように (難易度ごとに順に1つずつ) 選び、元の並び順で返す */
export function pickQuestions(sec: MoshiSection, seed: number, salt: string): Question[] {
  const bs = sec.questions.filter((q) => q.type === "B");
  const n = sec.pick ?? bs.length;
  if (n >= bs.length) return sec.questions;
  const rng = makeRng(hashSeed(`${seed}:${salt}:pick`));
  const byDiff = [1, 2, 3].map((d) => rng.shuffle(bs.filter((q) => q.difficulty === d)));
  const chosen = new Set<Question>();
  for (let k = 0; chosen.size < n; k = (k + 1) % 3) {
    const q = byDiff[k].shift();
    if (q) chosen.add(q);
  }
  return sec.questions.filter((q) => q.type !== "B" || chosen.has(q));
}

// ---- 1回分を組む ----

export interface RoundSpec {
  id: string;
  title: string;
  subject: UnitMoshi["subject"];
  grade: string;
  /** 範囲の単元 (先頭が主な単元) */
  units: string[];
  /** 目安時間 (分)。省略＝出た問題の seconds の合計 */
  minutes?: number;
  sections: MoshiSection[];
  kind?: Exam["kind"];
}

export interface Round {
  seed: number;
  exam: Exam;
  /** 画面 (MoshiPlay) にそのまま渡せる大問 (図の参照はほどき済み) */
  daimon: Daimon[];
  /** A・B がある (もう一度で、ちがう問題になる) */
  varies: boolean;
}

/** 節の並びとシードから1回分を組む (単元模試・あとで入試モードなどでも使う) */
export function buildRound(spec: RoundSpec, seed: number): Round {
  const unit = spec.units[0];
  let seconds = 0;
  const daimon: Daimon[] = spec.sections.map((sec, si) => {
    const id = sec.id ?? `${unit}/s${si + 1}`;
    const qs = pickQuestions(sec, seed, id);
    const items: Item[] = qs.map((q, k) => {
      const body = materialize(q, seed, q.unit ?? unit);
      seconds += q.seconds;
      return {
        id: q.id,
        no: q.no ?? `(${k + 1})`,
        prompt: body.prompt,
        figure: body.figure,
        points: q.points,
        skill: q.skill,
        unit: q.unit && q.unit !== unit ? q.unit : undefined,
        answer: body.answer,
        steps: body.steps,
        point: body.point,
        level: q.difficulty,
        dependsOn: q.dependsOn,
      };
    });
    const secSeconds = qs.reduce((a, q) => a + q.seconds, 0);
    const lv = Math.round(qs.reduce((a, q) => a + q.difficulty, 0) / Math.max(1, qs.length));
    return resolveDaimon({
      id,
      subject: spec.subject,
      grade: spec.grade,
      units: [unit],
      title: sec.title,
      lead: sec.lead,
      material: sec.material,
      items,
      points: items.reduce((a, it) => a + it.points, 0),
      minutes: Math.max(1, Math.round(secSeconds / 60)),
      style: sec.style ?? "mix",
      level: (Math.min(3, Math.max(1, lv)) as 1 | 2 | 3),
      review: { status: "draft" },
    });
  });
  const varies = spec.sections.some((s) => s.questions.some((q) => q.type === "A") || (s.pick ?? Infinity) < s.questions.filter((q) => q.type === "B").length || s.questions.some((q) => q.type === "B" && !q.keepOrder && q.answer.kind === "choice"));
  return {
    seed,
    varies,
    daimon,
    exam: {
      id: `${spec.id}#${seed}`,
      title: spec.title,
      subject: spec.subject,
      grade: spec.grade,
      kind: spec.kind ?? "tangen",
      units: spec.units,
      minutes: spec.minutes ?? Math.max(5, Math.ceil(seconds / 60)),
      total: daimon.reduce((a, d) => a + d.points, 0),
      daimon: daimon.map((d) => d.id),
    },
  };
}

/** 単元模試の1回分。単元に模試がなければ null */
export function buildUnitRound(unit: string, seed: number): Round | null {
  const m = unitMoshiOf(unit);
  if (!m) return null;
  const info = moshiUnitInfo(unit);
  return buildRound(
    {
      id: `unit:${unit}`,
      title: `${info ? `${/^[小中高]\d/.test(info.group) ? info.group : info.level.replace(/校$/, "")}${info.subject}` : ""}「${info?.name ?? unit}」単元模試`,
      subject: m.subject,
      grade: m.grade,
      units: [unit],
      minutes: m.minutes,
      sections: m.sections,
    },
    seed,
  );
}

/** 単元の画面用の情報 (MoshiPlay の units) */
export function unitView(unit: string) {
  const info = moshiUnitInfo(unit);
  return { name: info?.name ?? unit, href: info?.href ?? "", lecture: hasLecture(unit) ? lectureHref(unit) : undefined, subject: info ? `${info.level}${info.subject}` : "", kids: info?.kids ?? false };
}

// ---- 入試モード・共通テストモード用の目録 ----

export interface CatalogEntry {
  unit: string;
  subject: UnitMoshi["subject"];
  grade: string;
  section: string;
  question: Question;
}

/** 書き下ろしの単元模試の全問題 (範囲・難易度・タイプ・配点・目安時間で選びなおして、節を組む材料) */
export function questionCatalog(): CatalogEntry[] {
  return Object.values(UNIT_REGISTRY).flatMap((m) => m.sections.flatMap((s, i) => s.questions.map((q) => ({ unit: q.unit ?? m.unit, subject: m.subject, grade: m.grade, section: s.id ?? `${m.unit}/s${i + 1}`, question: q }))));
}
