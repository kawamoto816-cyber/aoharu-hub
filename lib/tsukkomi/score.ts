import type { Boke, TsukkomiKind, TsukkomiMode } from "./types";

// ツッコミ学習法の採点・称号・出題の組み方。画面（components/tsukkomi）からも、確認スクリプトからも使う純粋な関数だけを置く。

/** 1回の問題数 */
export const ROUND_SIZE = 10;
/** 1問の制限時間（ミリ秒） */
export const TIME_LIMIT: Record<TsukkomiMode, number> = { normal: 15_000, advanced: 20_000 };

export const POINTS = {
  /** 正しく訂正できた（または正しくスルーできた）ときの基本点 */
  base: 100,
  /** 上級で理由まで正しく選べたときの上乗せ */
  reason: 50,
  /** 速さの最大点（残り時間の割合 × これ） */
  speed: 100,
  /** 連続正解ボーナス（2問目から1問ごとに、上限 streakMax まで） */
  streak: 20,
  streakMax: 100,
  /** 場所は当てたが正しい語句（理由）でまちがえたとき */
  partial: 30,
  /** 正しい文にツッコんだときの減点 */
  overkill: -50,
  /** 発展問題の倍率（基本点・速さに掛ける） */
  levelRate: { 1: 1, 2: 1.5 } as Record<1 | 2, number>,
} as const;

/** 1問の答え方 */
export type Answer =
  /** 時間切れ */
  | { type: "timeout" }
  /** 「スルー」を押した */
  | { type: "through" }
  /** ツッコんだ：tapped＝タップした語句の位置、choice＝選んだ正しい語句（場所がちがえば null）、reason＝選んだ理由（上級のみ） */
  | { type: "tsukkomi"; tapped: number; choice: number | null; reason?: number | null };

export interface Scored {
  kind: TsukkomiKind;
  /** 正解（ボケを訂正しきった・正しくスルーした）なら true。連続ボーナスと正解率に使う */
  correct: boolean;
  points: number;
  breakdown: { base: number; speed: number; streak: number; reason: number; penalty: number };
}

/** ①どこ？の判定。スルー問題では、どこをタップしても不正解 */
export const isWrongToken = (b: Boke, i: number) => b.wrongIndex !== null && b.wrongIndex === i;
/** ②正しくは？の判定 */
export const isRightChoice = (b: Boke, c: number) => b.options?.answer === c;
/** ③なんでやねんの判定 */
export const isRightReason = (b: Boke, r: number) => b.reasons?.answer === r;

/**
 * 1問を採点する。
 * elapsedMs＝答え終わるまでの時間、streak＝この問題の前までの連続正解数。
 */
export function scoreAnswer(b: Boke, mode: TsukkomiMode, ans: Answer, elapsedMs: number, streak: number): Scored {
  const limit = TIME_LIMIT[mode];
  const rate = POINTS.levelRate[b.level];
  const zero = { base: 0, speed: 0, streak: 0, reason: 0, penalty: 0 };
  const win = (kind: TsukkomiKind, reason = 0): Scored => {
    const left = Math.max(0, Math.min(1, 1 - elapsedMs / limit));
    const base = Math.round(POINTS.base * rate);
    const speed = Math.round(POINTS.speed * rate * left);
    const st = Math.min(POINTS.streakMax, streak * POINTS.streak);
    return { kind, correct: true, points: base + speed + st + reason, breakdown: { ...zero, base, speed, streak: st, reason } };
  };
  if (ans.type === "timeout") return { kind: "timeout", correct: false, points: 0, breakdown: zero };
  const suru = b.wrongIndex === null;
  if (ans.type === "through") return suru ? win("through") : { kind: "miss", correct: false, points: 0, breakdown: zero };
  // ツッコんだ
  if (suru) return { kind: "overkill", correct: false, points: POINTS.overkill, breakdown: { ...zero, penalty: POINTS.overkill } };
  if (!isWrongToken(b, ans.tapped)) return { kind: "miss", correct: false, points: 0, breakdown: zero };
  if (ans.choice === null || !isRightChoice(b, ans.choice)) return { kind: "partial", correct: false, points: POINTS.partial, breakdown: { ...zero, base: POINTS.partial } };
  if (mode === "advanced") {
    if (ans.reason == null || !isRightReason(b, ans.reason)) return { kind: "partial", correct: false, points: Math.round(POINTS.base * rate), breakdown: { ...zero, base: Math.round(POINTS.base * rate) } };
    return win("hit", POINTS.reason);
  }
  return win("hit");
}

/** 1回分の合計（0点より下にはしない） */
export const roundTotal = (results: { points: number }[]) => Math.max(0, results.reduce((n, r) => n + r.points, 0));

/** 正解率（0〜100 の整数） */
export const accuracy = (results: { correct: boolean }[]) => (results.length ? Math.round((results.filter((r) => r.correct).length / results.length) * 100) : 0);

// ── 称号（ためたツッコミポイントで上がる。他人とは比べない） ──

export const TITLES = [
  { name: "見習い", from: 0 },
  { name: "若手", from: 3_000 },
  { name: "中堅", from: 10_000 },
  { name: "師匠", from: 30_000 },
] as const;

export function titleOf(total: number) {
  let i = 0;
  for (let k = 0; k < TITLES.length; k++) if (total >= TITLES[k].from) i = k;
  const next = TITLES[i + 1];
  return { name: TITLES[i].name, index: i, next: next ? { name: next.name, need: next.from - total } : null };
}

// ── 出題 ──

/** 配列をまぜる（rng は 0〜1 を返す関数。テストでは固定できる） */
export function shuffle<T>(list: readonly T[], rng: () => number = Math.random): T[] {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * 1回分の問題を組む。ツッコみそこねた問題（missed の id）を先に出し、残りは「基本（level 1）→ 発展（level 2）」の順に。
 * どちらのまとまりの中でも、基本を先・発展を後にして、同じ level の中はまぜる。最大 ROUND_SIZE 問。返すのは問題の id の並び。
 */
export function pickRound(pool: readonly Boke[], missed: ReadonlySet<string>, rng: () => number = Math.random, size = ROUND_SIZE): string[] {
  const byLevel = (list: Boke[]) => [...shuffle(list.filter((b) => b.level === 1), rng), ...shuffle(list.filter((b) => b.level !== 1), rng)];
  const again = byLevel(pool.filter((b) => missed.has(b.id)));
  const rest = byLevel(pool.filter((b) => !missed.has(b.id)));
  return [...again, ...rest].slice(0, size).map((b) => b.id);
}
