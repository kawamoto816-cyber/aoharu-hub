"use client";

import { useSyncExternalStore } from "react";
import { cardId, review, stumble, type NewMistake, type ReviewLog, type ZukanCard } from "./schedule";

// つまずき図鑑の保存 (この端末の localStorage だけ。サーバーには送らない)。
//   cards: まちがえた小問のカード (本文は持たない)。logs: 図鑑での復習の正誤 (何日後の復習か。1週間後の思い出し率の集計用)。
// 保存領域が使えない環境では、空の図鑑として動く (記録は残らない・画面は壊れない)。

export const ZUKAN_KEY = "aoharu.zukan.v1";
const EVENT = "aoharu-zukan";
const MAX_CARDS = 500;
const MAX_LOGS = 1000;

export interface ZukanState {
  cards: Record<string, ZukanCard>;
  logs: ReviewLog[];
}

const EMPTY: ZukanState = { cards: {}, logs: [] };

let cacheRaw: string | null | undefined;
let cacheVal: ZukanState = EMPTY;

export function readZukan(): ZukanState {
  try {
    const raw = window.localStorage.getItem(ZUKAN_KEY);
    if (raw === cacheRaw) return cacheVal;
    cacheRaw = raw;
    cacheVal = EMPTY;
    if (!raw) return EMPTY;
    const v = JSON.parse(raw) as Partial<ZukanState> | null;
    if (!v || typeof v !== "object") return EMPTY;
    const cards: Record<string, ZukanCard> = {};
    if (v.cards && typeof v.cards === "object")
      for (const [k, c] of Object.entries(v.cards)) if (c && typeof c === "object" && typeof c.u === "string" && typeof c.q === "string" && typeof c.due === "number") cards[k] = c;
    const logs = Array.isArray(v.logs) ? v.logs.filter((l) => l && typeof l.iv === "number" && typeof l.ok === "boolean") : [];
    cacheVal = { cards, logs };
    return cacheVal;
  } catch {
    return EMPTY;
  }
}

function write(s: ZukanState) {
  try {
    let es = Object.entries(s.cards);
    if (es.length > MAX_CARDS) {
      // 卒業したカードから、古い順に外す
      es = es.sort((a, b) => (a[1].grad ? 0 : 1) - (b[1].grad ? 0 : 1) || a[1].last - b[1].last).slice(es.length - MAX_CARDS);
    }
    window.localStorage.setItem(ZUKAN_KEY, JSON.stringify({ cards: Object.fromEntries(es), logs: s.logs.slice(-MAX_LOGS) }));
    window.dispatchEvent(new Event(EVENT));
  } catch {
    /* 保存できない環境では何もしない */
  }
}

/** 模試でまちがえた小問をまとめて図鑑に入れる。入れたカード (保存できなくても計算した形) を返す */
export function recordStumbles(ms: NewMistake[], now = Date.now()): { card: ZukanCard; again: boolean }[] {
  const s = readZukan();
  const cards = { ...s.cards };
  const out: { card: ZukanCard; again: boolean }[] = [];
  for (const m of ms) {
    const id = cardId(m);
    const prev = cards[id];
    const card = stumble(prev, m, now);
    cards[id] = card;
    out.push({ card, again: !!prev });
  }
  if (ms.length) write({ cards, logs: s.logs });
  return out;
}

/** 図鑑で復習して答えた */
export function recordReview(id: string, ok: boolean, now = Date.now()): { card: ZukanCard; graduated: boolean } | null {
  const s = readZukan();
  const c = s.cards[id];
  if (!c) return null;
  const r = review(c, ok, now);
  write({ cards: { ...s.cards, [id]: r.card }, logs: [...s.logs, r.log] });
  return { card: r.card, graduated: r.graduated };
}

function subscribe(cb: () => void) {
  const on = (e: Event) => {
    if (e instanceof StorageEvent && e.key !== ZUKAN_KEY) return;
    cb();
  };
  window.addEventListener(EVENT, on);
  window.addEventListener("storage", on);
  return () => {
    window.removeEventListener(EVENT, on);
    window.removeEventListener("storage", on);
  };
}

/** 画面用 (サーバー描画のときは空。読みこんだあとで端末の図鑑に変わる) */
export function useZukan(): ZukanState {
  return useSyncExternalStore(subscribe, readZukan, () => EMPTY);
}
