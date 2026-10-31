"use client";

import { useSyncExternalStore } from "react";

// 「①覚える」の共通エンジン (漢字・都道府県など)。英単語2000 と同じ間隔反復を、カードの束ごとに保存する。
//   b = 箱 (0〜5)。正解で1つ上がり、まちがえると1に戻る。d = 次に出す日 (日本時間の通し日)。
//   箱ごとの間隔: 1日・3日・7日・14日・30日。箱3以上で「覚えた」、箱5で「マスター」。

export interface CardState {
  b: number;
  d: number;
  s: number;
  x: number;
}

export interface DeckState {
  w: Record<string, CardState>;
  perDay: number;
  day: number;
  newToday: number;
}

export const INTERVALS = [0, 1, 3, 7, 14, 30];
export const LEARNED_BOX = 3;
export const MASTER_BOX = 5;

export function today(): number {
  return Math.floor((Date.now() + 9 * 3600 * 1000) / 86400000);
}

const EMPTY: DeckState = { w: {}, perDay: 10, day: 0, newToday: 0 };

export interface DeckStore {
  read(): DeckState;
  setPerDay(n: number): void;
  record(id: string, correct: boolean): void;
  use(): DeckState;
}

const stores = new Map<string, DeckStore>();

/** key ごとに1つのストア (localStorage のキーは aoharu_deck_<key>_v1) */
export function deckStore(key: string): DeckStore {
  const found = stores.get(key);
  if (found) return found;
  const KEY = `aoharu_deck_${key}_v1`;
  const EVENT = `aoharu-deck-${key}`;

  function read(): DeckState {
    try {
      const raw = localStorage.getItem(KEY);
      const v = raw ? (JSON.parse(raw) as DeckState) : EMPTY;
      if (!v || typeof v !== "object" || !v.w) return EMPTY;
      return v.day === today() ? v : { ...v, day: today(), newToday: 0 };
    } catch {
      return EMPTY;
    }
  }
  function write(p: DeckState) {
    try {
      localStorage.setItem(KEY, JSON.stringify(p));
      window.dispatchEvent(new Event(EVENT));
    } catch {
      /* 保存できない環境では何もしない */
    }
  }
  function record(id: string, correct: boolean) {
    const p = read();
    const prev = p.w[id];
    const isNew = !prev;
    const s = prev ?? { b: 0, d: 0, s: 0, x: 0 };
    const b = correct ? Math.min(MASTER_BOX, s.b + 1) : 1;
    const d = today() + (correct ? INTERVALS[b] : 1);
    write({ ...p, w: { ...p.w, [id]: { b, d, s: s.s + 1, x: s.x + (correct ? 0 : 1) } }, newToday: p.newToday + (isNew ? 1 : 0) });
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
    const v = read();
    const raw = JSON.stringify(v);
    if (raw !== cache.raw) cache = { raw, value: v };
    return cache.value;
  }
  const store: DeckStore = {
    read,
    setPerDay: (n) => write({ ...read(), perDay: n }),
    record,
    use: () => useSyncExternalStore(subscribe, snapshot, () => EMPTY),
  };
  stores.set(key, store);
  return store;
}

export type DeckMode = "learn" | "easy" | "hard";
export interface DeckItem {
  id: string;
  mode: DeckMode;
}

/** 1回の修行: 期限の来た復習 (古い順、最大50) + 新しいカード (1日の数まで)。group で範囲をしぼる */
export function buildDeckSession(p: DeckState, ids: string[], opts: { extra?: boolean } = {}): DeckItem[] {
  const t = today();
  const inScope = new Set(ids);
  const due = Object.entries(p.w)
    .filter(([id, s]) => s.d <= t && inScope.has(id))
    .sort((a, b) => a[1].d - b[1].d)
    .slice(0, 50)
    .map(([id, s]) => ({ id, mode: (s.b >= LEARNED_BOX ? "hard" : "easy") as DeckMode }));
  const n = opts.extra ? 10 : Math.max(0, p.perDay - p.newToday);
  const fresh = ids.filter((id) => !p.w[id]).slice(0, n).map((id) => ({ id, mode: "learn" as DeckMode }));
  return [...due, ...fresh];
}

export function dueIn(p: DeckState, ids: string[]): number {
  const t = today();
  return ids.filter((id) => p.w[id] && p.w[id].d <= t).length;
}
