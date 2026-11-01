"use client";

import { useSyncExternalStore } from "react";

// 図解レクチャーを「読んだ」記録。この端末だけに保存する (登録なし)。
// read: { [単元id]: 読み終えた時刻(ms) }。last: 最後に開いた単元 (「続きから読む」に使う)。

const KEY = "aoharu_lecture_read_v1";
const EVENT = "aoharu-lecture-read";

export interface ReadLog {
  read: Record<string, number>;
  last?: string;
}

const EMPTY: ReadLog = { read: {} };

function read(): ReadLog {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const p = JSON.parse(raw) as ReadLog;
      if (p && typeof p.read === "object" && p.read) return p;
    }
  } catch {
    // 読めないときは空として扱う
  }
  return EMPTY;
}

function write(p: ReadLog) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
    window.dispatchEvent(new Event(EVENT));
  } catch {
    // 保存できない環境では記録しない
  }
}

export function markOpened(unit: string) {
  const p = read();
  if (p.last !== unit) write({ ...p, last: unit });
}

export function markRead(unit: string) {
  const p = read();
  if (!p.read[unit]) write({ read: { ...p.read, [unit]: Date.now() }, last: unit });
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

let cache: { raw: string | null; value: ReadLog } = { raw: null, value: EMPTY };
function snapshot(): ReadLog {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {
    raw = null;
  }
  if (raw !== cache.raw) cache = { raw, value: read() };
  return cache.value;
}

/** 読んだ記録 (サーバー描画のときは空) */
export function useReadLog(): ReadLog {
  return useSyncExternalStore(subscribe, snapshot, () => EMPTY);
}
