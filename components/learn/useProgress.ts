"use client";

import { useSyncExternalStore } from "react";
import { readProgress, subscribeProgress, type CardStatus } from "@/lib/learn/progress";

// 進み具合をコンポーネントで読む。サーバー描画では空 (まだ何も覚えていない状態) として扱う。
let cache: { raw: string; value: Record<string, CardStatus> } = { raw: "{}", value: {} };

function snapshot(): Record<string, CardStatus> {
  const value = readProgress();
  const raw = JSON.stringify(value);
  if (raw !== cache.raw) cache = { raw, value };
  return cache.value;
}

const EMPTY: Record<string, CardStatus> = {};

export function useProgress(): Record<string, CardStatus> {
  return useSyncExternalStore(subscribeProgress, snapshot, () => EMPTY);
}
