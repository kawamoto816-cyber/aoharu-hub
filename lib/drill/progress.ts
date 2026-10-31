"use client";

import { useSyncExternalStore } from "react";

// ドリルの記録 (単元ごとのベストと合格)。この端末に保存。
export type DrillRecord = Record<string, { best: number; cleared: boolean }>;

const KEY = "aoharu_drill_v1";
const EVENT = "aoharu-drill";
const EMPTY: DrillRecord = {};

export function readDrill(): DrillRecord {
  try {
    const raw = localStorage.getItem(KEY);
    const v = raw ? (JSON.parse(raw) as DrillRecord) : EMPTY;
    return v && typeof v === "object" ? v : EMPTY;
  } catch {
    return EMPTY;
  }
}

export function recordDrill(unit: string, score: number, passed: boolean) {
  const p = readDrill();
  const prev = p[unit] ?? { best: 0, cleared: false };
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...p, [unit]: { best: Math.max(prev.best, score), cleared: prev.cleared || passed } }));
    window.dispatchEvent(new Event(EVENT));
  } catch {
    /* 保存できない環境では何もしない */
  }
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}
let cache = { raw: "", value: EMPTY };
function snapshot() {
  const v = readDrill();
  const raw = JSON.stringify(v);
  if (raw !== cache.raw) cache = { raw, value: v };
  return cache.value;
}
export function useDrill(): DrillRecord {
  return useSyncExternalStore(subscribe, snapshot, () => EMPTY);
}
