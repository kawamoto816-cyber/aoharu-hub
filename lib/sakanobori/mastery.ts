import type { ChoiceQ } from "@/lib/moshi/types";

// 単元ごとの習熟度を端末内 (localStorage) に記録する。さかのぼりの入口と、試験モードの「苦手に合わせて次の回」で使う。
// 記録するところ: 単元模試・試験モード（components/moshi/MoshiPlay の採点のあと）、さかのぼりのチェック問題（components/sakanobori）。
// 読めない・書けない環境 (プライベートモードなど) では何もしない（lib/moshi/results.ts と同じ作法）。依存は型だけ。

export const MASTERY_KEY = "aoharu.sakanobori.mastery.v1";

/** 指数移動平均の重み（新しい1問の重さ） */
export const MASTERY_ALPHA = 0.3;
/** はじめての単元の出発点 */
export const MASTERY_PRIOR = 0.5;
/** これより低いと「苦手」 */
export const WEAK_BELOW = 0.6;
/** 「苦手」と言うのに必要な小問の数 */
export const WEAK_MIN_N = 2;

export interface UnitMastery {
  /** 解いた小問の数 */
  n: number;
  /** 正解（満点）の数 */
  ok: number;
  /** 習熟度 0〜1（指数移動平均） */
  m: number;
  /** 最後に解いた日時 (ISO 8601) */
  at: string;
  /** まちがいの番号（Lecture.mistakes[i]）→ 回数 */
  miss?: Record<string, number>;
}

export type MasteryMap = Record<string, UnitMastery>;

/** 採点した小問1つ */
export interface MasteryAnswer {
  unit: string;
  ok: boolean;
  /** まちがいの番号（分かるとき） */
  mistake?: number | null;
}

function isMastery(v: unknown): v is UnitMastery {
  if (!v || typeof v !== "object") return false;
  const r = v as Record<string, unknown>;
  return typeof r.n === "number" && typeof r.ok === "number" && typeof r.m === "number" && r.m >= 0 && r.m <= 1;
}

export function readMastery(): MasteryMap {
  try {
    const raw = window.localStorage.getItem(MASTERY_KEY);
    if (!raw) return {};
    const obj = JSON.parse(raw) as unknown;
    if (!obj || typeof obj !== "object") return {};
    const out: MasteryMap = {};
    for (const [k, v] of Object.entries(obj as Record<string, unknown>)) if (isMastery(v)) out[k] = v;
    return out;
  } catch {
    return {};
  }
}

/** 記録に1問足した値（純粋な関数。テスト用にも） */
export function applyAnswer(prev: UnitMastery | undefined, a: MasteryAnswer, at: string): UnitMastery {
  const m0 = prev?.m ?? MASTERY_PRIOR;
  const m = Math.round((m0 + MASTERY_ALPHA * ((a.ok ? 1 : 0) - m0)) * 1000) / 1000;
  const next: UnitMastery = { n: (prev?.n ?? 0) + 1, ok: (prev?.ok ?? 0) + (a.ok ? 1 : 0), m, at, miss: prev?.miss };
  if (!a.ok && a.mistake !== undefined && a.mistake !== null && a.mistake >= 0) next.miss = { ...(prev?.miss ?? {}), [a.mistake]: (prev?.miss?.[a.mistake] ?? 0) + 1 };
  if (!next.miss) delete next.miss;
  return next;
}

/** 採点結果をまとめて記録する。保存後の記録を返す（保存できなければ null） */
export function recordMastery(answers: MasteryAnswer[]): MasteryMap | null {
  if (!answers.length) return null;
  try {
    const all = readMastery();
    const at = new Date().toISOString();
    for (const a of answers) if (a.unit) all[a.unit] = applyAnswer(all[a.unit], a, at);
    window.localStorage.setItem(MASTERY_KEY, JSON.stringify(all));
    return all;
  } catch {
    return null;
  }
}

/** 選択問題で、選んだ選択肢のまちがいの番号（mistakeOf）。正解・未回答・書いていないときは null */
export function mistakeOfChoice(a: ChoiceQ, picked: number[]): number | null {
  if (!a.mistakeOf || picked.length !== 1) return null;
  const correct = Array.isArray(a.correct) ? a.correct : [a.correct];
  if (correct.includes(picked[0])) return null;
  const v = a.mistakeOf[picked[0]];
  return typeof v === "number" ? v : null;
}

export const isWeak = (r: UnitMastery | undefined) => !!r && r.n >= WEAK_MIN_N && r.m < WEAK_BELOW;

/** 苦手な単元（習熟度の低い順）。units を渡すとその中だけ */
export function weakUnits(map: MasteryMap, units?: string[]): string[] {
  const keys = units ?? Object.keys(map);
  return keys.filter((u) => isWeak(map[u])).sort((a, b) => map[a].m - map[b].m);
}
