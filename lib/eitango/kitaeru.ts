"use client";

import { useSyncExternalStore } from "react";
import { STAGE_DATA } from "./data";
import { CTX_DATA, type CtxEntry } from "./ctx";
import type { WordEntry } from "./types";

// 英単語2000「②鍛える」。覚えた単語を、速く・文の中で使えるかを試す。
//   瞬発 … 60秒で、英単語の意味を4択で何語答えられるか。SHUN_PASS 語以上・まちがい2つ以下で合格
//   文脈 … 初めて見る英文の空所に入る語を4択で選ぶ。10問で CTX_PASS 問以上なら合格
// 記録はこの端末に保存 (ステージごとのベストと合格)。

export const SHUN_SECONDS = 60;
export const SHUN_PASS = 20;
export const SHUN_MAX_MISS = 2;
export const CTX_COUNT = 10;
export const CTX_PASS = 9;

export interface KitaeruRecord {
  shun: Record<string, { best: number; cleared: boolean }>;
  ctx: Record<string, { best: number; cleared: boolean }>;
}

const KEY = "aoharu_words_kitaeru_v1";
const EVENT = "aoharu-words-kitaeru";
const EMPTY: KitaeruRecord = { shun: {}, ctx: {} };

export function readKitaeru(): KitaeruRecord {
  try {
    const raw = localStorage.getItem(KEY);
    const v = raw ? (JSON.parse(raw) as KitaeruRecord) : EMPTY;
    return v && v.shun && v.ctx ? v : EMPTY;
  } catch {
    return EMPTY;
  }
}

export function recordKitaeru(kind: "shun" | "ctx", stage: number, score: number, passed: boolean) {
  const p = readKitaeru();
  const prev = p[kind][stage] ?? { best: 0, cleared: false };
  const next = { best: Math.max(prev.best, score), cleared: prev.cleared || passed };
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...p, [kind]: { ...p[kind], [stage]: next } }));
    window.dispatchEvent(new Event(EVENT));
  } catch {
    /* 保存できない環境では何もしない */
  }
  return { prev, next };
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
  const v = readKitaeru();
  const raw = JSON.stringify(v);
  if (raw !== cache.raw) cache = { raw, value: v };
  return cache.value;
}
export function useKitaeru(): KitaeruRecord {
  return useSyncExternalStore(subscribe, snapshot, () => EMPTY);
}

export function shuffle<T>(xs: T[], rnd: () => number = Math.random): T[] {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// 意味がほぼ同じで、文脈だけでは区別しにくい組 (文脈問題で、おたがいを誤答にしない)
const NEAR: string[][] = [
  ["particularly", "especially"],
  ["imply", "suggest", "indicate"],
  ["prove", "confirm"],
  ["consequence", "result", "outcome"],
  ["suppose", "imagine", "assume"],
  ["tranquility", "serenity"],
  ["allegedly", "supposedly"],
  ["barely", "scarcely", "hardly"],
  ["drought", "famine"],
  ["reform", "modify"],
  ["terrify", "frighten"],
  ["amuse", "entertain"],
  ["enormous", "vast", "huge"],
  ["achieve", "accomplish", "succeed"],
  ["critical", "vital", "crucial"],
  ["basic", "fundamental"],
  ["confident", "certain"],
  ["one-sided", "biased"],
];
const nearOf = (w: string) => NEAR.find((g) => g.includes(w)) ?? [];

/** 文脈問題の4択。同じステージ・同じ品詞の語から。a / an の後ろなら、頭の音が合う語だけにする */
export function ctxChoices(w: WordEntry, c: CtxEntry, rnd: () => number = Math.random): string[] {
  const stage = STAGE_DATA[Math.ceil(w.no / 100)];
  const before = c.ctx.split("___")[0].trim().split(/\s+/).pop()?.toLowerCase();
  const vowel = (s: string) => /^[aeiou]/i.test(s);
  const near = nearOf(w.word);
  const fits = (x: WordEntry) => !near.includes(x.word) && (before === "an" ? vowel(x.word) : before === "a" ? !vowel(x.word) : true);
  const pools = [
    stage.filter((x) => x.no !== w.no && x.pos === w.pos && fits(x)),
    Object.values(STAGE_DATA).flat().filter((x) => x.no !== w.no && x.pos === w.pos && fits(x) && Math.abs(x.no - w.no) < 400),
  ];
  const out: string[] = [];
  for (const pool of pools)
    for (const x of shuffle(pool, rnd)) {
      if (out.length >= 3) break;
      if (!out.includes(x.word) && x.word !== w.word) out.push(x.word);
    }
  return shuffle([w.word, ...out], rnd);
}

export function ctxSet(stage: number, rnd: () => number = Math.random): { w: WordEntry; c: CtxEntry }[] {
  const ws = STAGE_DATA[stage];
  return shuffle(CTX_DATA[stage], rnd)
    .slice(0, CTX_COUNT)
    .map((c) => ({ w: ws[(c.no - 1) % 100], c }));
}
