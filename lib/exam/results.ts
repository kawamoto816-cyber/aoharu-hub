// 試験モードの結果を端末内 (localStorage) に残す。1回ごとの記録を新しい順に最大 50 件。
// 読めない・書けない環境 (プライベートモードなど) では何もしない。

export const EXAM_RESULTS_KEY = "aoharu.exam.results.v1";
const MAX = 50;

export interface ExamPart {
  title: string;
  score: number;
  total: number;
  /** その大問を画面に出していた秒数 (時間配分の目安) */
  sec: number;
}

export interface ExamAttempt {
  /** ExamSpec.id */
  spec: string;
  mode: string;
  title: string;
  seed: number;
  /** ISO 8601 */
  at: string;
  score: number;
  total: number;
  /** 制限時間 (分) と、提出までにかかった秒数 */
  minutes: number;
  usedSec: number;
  /** 時間切れで自動提出した */
  timeout: boolean;
  parts: ExamPart[];
  /** 単元ごと [得点, 満点] */
  units: Record<string, [number, number]>;
}

function isAttempt(v: unknown): v is ExamAttempt {
  if (!v || typeof v !== "object") return false;
  const r = v as Record<string, unknown>;
  return typeof r.spec === "string" && typeof r.score === "number" && typeof r.total === "number" && Array.isArray(r.parts);
}

export function readExamResults(): ExamAttempt[] {
  try {
    const raw = window.localStorage.getItem(EXAM_RESULTS_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw) as unknown;
    return Array.isArray(arr) ? arr.filter(isAttempt) : [];
  } catch {
    return [];
  }
}

/** 1回分を足す。同じ仕様のこれまでの最高点 (今回をのぞく) と回数を返す。保存できなければ null */
export function recordExamResult(a: ExamAttempt): { count: number; prevBest: number | null } | null {
  try {
    const all = readExamResults();
    const same = all.filter((x) => x.spec === a.spec);
    const prevBest = same.length ? Math.max(...same.map((x) => (x.total ? Math.round((x.score / x.total) * 100) : 0))) : null;
    window.localStorage.setItem(EXAM_RESULTS_KEY, JSON.stringify([a, ...all].slice(0, MAX)));
    return { count: same.length + 1, prevBest };
  } catch {
    return null;
  }
}
