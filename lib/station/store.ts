"use client";

import { useSyncExternalStore } from "react";
import type { CoinEntry, LessonPlan, PlanCheck, Rating, ShareCard } from "./types";

// ラーニングステーション（試作）の、その人の操作の記録。サーバーには送らず、このブラウザにだけ残す。
// 保存できないとき（プライベートブラウズなど）も、画面はそのまま動く（記録が残らないだけ）。

export interface MyLesson {
  id: string;
  at: string;
  plan: LessonPlan;
  check: PlanCheck;
}

export interface StationState {
  nick: string;
  member: boolean;
  teacher: boolean;
  booked: string[];
  attended: string[];
  myShares: ShareCard[];
  questions: Record<string, { by: string; text: string }[]>;
  clapped: string[];
  ratings: Record<string, Rating>;
  tips: Record<string, number>;
  coins: CoinEntry[];
  oshieruPassed: string[];
  myLessons: MyLesson[];
  learnedDays: string[];
}

const KEY = "aoharu-station-v1";
const now = () => new Date().toISOString();

const INITIAL: StationState = {
  nick: "あなた",
  member: false,
  teacher: false,
  booked: [],
  attended: [],
  myShares: [],
  questions: {},
  clapped: [],
  ratings: {},
  tips: {},
  coins: [{ at: "2026-11-19T00:00:00.000Z", delta: 30, reason: "駅へようこそ（はじめのコイン）" }],
  oshieruPassed: [],
  myLessons: [],
  learnedDays: [],
};

let state: StationState = INITIAL;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) state = { ...INITIAL, ...(JSON.parse(raw) as Partial<StationState>) };
  } catch {
    // 読めないときは最初の状態のまま
  }
}

function save() {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // 保存できなくても続ける
  }
}

export function update(fn: (s: StationState) => StationState) {
  load();
  state = fn(state);
  save();
  for (const l of listeners) l();
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useStation(): StationState {
  return useSyncExternalStore(
    subscribe,
    () => {
      load();
      return state;
    },
    () => INITIAL,
  );
}

export const balance = (s: StationState) => s.coins.reduce((a, c) => a + c.delta, 0);

export const addCoins = (delta: number, reason: string) =>
  update((s) => ({ ...s, coins: [{ at: now(), delta, reason }, ...s.coins].slice(0, 200) }));

/** 同じ先生への感謝コインは、1つの授業につき10枚まで（仲間うちで回し合うのを防ぐ） */
export const TIP_CAP = 10;

export function sendTip(lessonId: string, teacher: string, n: number): string | null {
  let msg: string | null = null;
  update((s) => {
    const sent = s.tips[lessonId] ?? 0;
    if (!s.attended.includes(lessonId)) {
      msg = "感謝コインを送れるのは、その授業を受けた人だけです";
      return s;
    }
    if (sent + n > TIP_CAP) {
      msg = `1つの授業に送れるのは${TIP_CAP}枚までです`;
      return s;
    }
    if (balance(s) < n) {
      msg = "コインが足りません";
      return s;
    }
    return { ...s, tips: { ...s.tips, [lessonId]: sent + n }, coins: [{ at: now(), delta: -n, reason: `${teacher}さんの授業に感謝` }, ...s.coins] };
  });
  return msg;
}

export function resetStation() {
  update(() => INITIAL);
}

export const newId = (p: string) => `${p}${Date.now().toString(36)}${Math.floor(Math.random() * 1e4).toString(36)}`;
