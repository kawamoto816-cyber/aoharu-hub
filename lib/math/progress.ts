"use client";

import { useSyncExternalStore } from "react";

// AOHARU MATH の進み具合。この端末のブラウザに保存する (登録なしで使える)。
//   passes  … 続けて合格したセット数 (2 で次の段へ)
//   cleared … その段を合格した
//   misses  … 続けて満点を逃したセット数 (3 で前の段を1セット挟む)
//   best    … 合格したときのいちばん速いタイム (秒)

export interface StepRecord {
  passes: number;
  cleared: boolean;
  misses: number;
  sets: number;
  best?: number;
}

export interface MathProgress {
  steps: Record<string, StepRecord>;
  /** いま進めている段 */
  current?: number;
}

const KEY = "aoharu_math_v1";
const EVENT = "aoharu-math-progress";
export const PASSES_TO_CLEAR = 2;

const EMPTY: MathProgress = { steps: {} };

export function readMath(): MathProgress {
  try {
    const raw = localStorage.getItem(KEY);
    const v = raw ? (JSON.parse(raw) as MathProgress) : EMPTY;
    return v && typeof v === "object" && v.steps ? v : EMPTY;
  } catch {
    return EMPTY;
  }
}

function write(p: MathProgress) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
    window.dispatchEvent(new Event(EVENT));
  } catch {
    /* 保存できない環境では何もしない */
  }
}

export function setCurrent(no: number) {
  const p = readMath();
  write({ ...p, current: no });
}

/** 1セットの結果を記録する。pass = 解き直しなしで満点かつ目標時間内 */
export function recordSet(no: number, r: { pass: boolean; perfect: boolean; seconds: number }) {
  const p = readMath();
  const prev = p.steps[no] ?? { passes: 0, cleared: false, misses: 0, sets: 0 };
  const passes = r.pass ? prev.passes + 1 : 0;
  const cleared = prev.cleared || passes >= PASSES_TO_CLEAR;
  const misses = r.perfect ? 0 : prev.misses + 1;
  const best = r.pass ? Math.min(prev.best ?? Infinity, r.seconds) : prev.best;
  const rec: StepRecord = { passes, cleared, misses, sets: prev.sets + 1, best: Number.isFinite(best) ? best : undefined };
  const justCleared = !prev.cleared && cleared;
  write({ ...p, steps: { ...p.steps, [no]: rec }, current: justCleared && no < 50 ? no + 1 : (p.current ?? no) });
  return { rec, justCleared };
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

let cache: { raw: string; value: MathProgress } = { raw: "", value: EMPTY };
function snapshot(): MathProgress {
  const v = readMath();
  const raw = JSON.stringify(v);
  if (raw !== cache.raw) cache = { raw, value: v };
  return cache.value;
}

export function useMathProgress(): MathProgress {
  return useSyncExternalStore(subscribe, snapshot, () => EMPTY);
}
