"use client";

import { useSyncExternalStore } from "react";

// 英単語2000 の進み具合 (この端末のブラウザに保存)。忘れかけたころに出し直す「間隔反復」。
//   b = 箱 (0〜5)。正解で1つ上がり、まちがえると1に戻る。d = 次に出す日。
//   箱ごとの間隔: 1日・3日・7日・14日・30日。箱3以上で「覚えた」、箱5で「マスター」。

export interface WordState {
  b: number;
  d: number;
  /** 出した回数 */
  s: number;
  /** まちがえた回数 */
  x: number;
}

export interface WordsProgress {
  w: Record<string, WordState>;
  perDay: number;
  /** newToday を数えている日 */
  day: number;
  newToday: number;
}

export const INTERVALS = [0, 1, 3, 7, 14, 30];
export const LEARNED_BOX = 3;
export const MASTER_BOX = 5;

const KEY = "aoharu_words_v1";
const EVENT = "aoharu-words-progress";
const EMPTY: WordsProgress = { w: {}, perDay: 10, day: 0, newToday: 0 };

/** 日本時間の日付の通し番号 */
export function today(): number {
  return Math.floor((Date.now() + 9 * 3600 * 1000) / 86400000);
}

export function readWords(): WordsProgress {
  try {
    const raw = localStorage.getItem(KEY);
    const v = raw ? (JSON.parse(raw) as WordsProgress) : EMPTY;
    if (!v || typeof v !== "object" || !v.w) return EMPTY;
    return v.day === today() ? v : { ...v, day: today(), newToday: 0 };
  } catch {
    return EMPTY;
  }
}

function write(p: WordsProgress) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
    window.dispatchEvent(new Event(EVENT));
  } catch {
    /* 保存できない環境では何もしない */
  }
}

export function setPerDay(n: number) {
  write({ ...readWords(), perDay: n });
}

/** 1語の結果を記録する (その日の最初の答えだけ記録する) */
export function recordAnswer(no: number, correct: boolean) {
  const p = readWords();
  const t = today();
  const prev = p.w[no];
  const isNew = !prev;
  const b = correct ? Math.min((prev?.b ?? 0) + 1, MASTER_BOX) : 1;
  const st: WordState = { b, d: t + (correct ? INTERVALS[b] : 1), s: (prev?.s ?? 0) + 1, x: (prev?.x ?? 0) + (correct ? 0 : 1) };
  write({ ...p, day: t, newToday: p.newToday + (isNew ? 1 : 0), w: { ...p.w, [no]: st } });
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

let cache: { raw: string; value: WordsProgress } = { raw: "", value: EMPTY };
function snapshot(): WordsProgress {
  const v = readWords();
  const raw = JSON.stringify(v);
  if (raw !== cache.raw) cache = { raw, value: v };
  return cache.value;
}

export function useWords(): WordsProgress {
  return useSyncExternalStore(subscribe, snapshot, () => EMPTY);
}
