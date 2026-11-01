"use client";

import { useSyncExternalStore } from "react";

// まちがいノート: 4択ドリルでまちがえた問題を、この端末 (localStorage) に問題文ごと保存する。
//   同じ問題 (単元id＋問題文) は1件にまとめ、まちがえるたびに wrongCount を1つ増やす。
//   考え方は lib/deck (間隔反復の箱) と同じで「まちがえたら振り出し、正解で1つ進む」。
//   deckStore はカードの id しか持たず、問題文・選択肢・解説を残せないので、保存の形はここで別に持つ。
//   rightStreak = 続けて正解した回数。2回続けて正解したら「卒業」(ノートから外し、卒業ずみに移す)。
//   定期テスト模試 (/learn/moshi) の小問も同じノートに入る。選択式でない小問は choices を空にし、
//   model (模範解答) と mine (自分の答え) を文字で残す。解き直しは「答えを見て自己判定」になる。
// 保存領域が使えない環境では、空のノートとして動く (記録は残らない)。

export const NOTE_KEY = "aoharu:mistakes:v1";
const EVENT = "aoharu-mistakes";
/** 何回続けて正解したら卒業か */
export const GRADUATE_STREAK = 2;
const MAX_ITEMS = 300;
const MAX_GRADUATED = 300;

export interface Mistake {
  unitId: string;
  unitName: string;
  /** 単元のページ (/learn/<セット>/<単元id>) */
  href: string;
  /** 教科 (ドリルのセット名。例: 中学英文法) */
  subject: string;
  /** 小1・小2の単元 (ひらがな多めで出す) */
  kids?: boolean;
  /** 問題文 (空所は ___) */
  q: string;
  choices: string[];
  /** 正解の番号 */
  answer: number;
  /** 最後にまちがえたとき選んだ番号 */
  picked: number;
  /** 解説 */
  ex: string;
  /** どこでまちがえたか (なければドリル) */
  source?: "drill" | "moshi";
  /** 選択式でない問題の模範解答 (choices が空のとき) */
  model?: string;
  /** 選択式でない問題で、最後にまちがえたときの自分の答え */
  mine?: string;
  /** 最後にまちがえた時刻 (ms) */
  at: number;
  wrongCount: number;
  rightStreak: number;
}

export interface Graduated {
  unitId: string;
  unitName: string;
  q: string;
  at: number;
}

export interface NoteState {
  items: Record<string, Mistake>;
  graduated: Record<string, Graduated>;
}

export type MistakeMeta = Pick<Mistake, "unitId" | "unitName" | "href" | "subject" | "kids">;

const EMPTY: NoteState = { items: {}, graduated: {} };

export const mistakeId = (unitId: string, q: string) => `${unitId}\u0000${q}`;

export function readNote(): NoteState {
  try {
    const raw = localStorage.getItem(NOTE_KEY);
    if (!raw) return EMPTY;
    const v = JSON.parse(raw) as Partial<NoteState> | null;
    if (!v || typeof v !== "object" || !v.items || typeof v.items !== "object") return EMPTY;
    return { items: v.items, graduated: v.graduated && typeof v.graduated === "object" ? v.graduated : {} };
  } catch {
    return EMPTY;
  }
}

function newest<T extends { at: number }>(rec: Record<string, T>, max: number): Record<string, T> {
  const es = Object.entries(rec);
  if (es.length <= max) return rec;
  return Object.fromEntries(es.sort((a, b) => b[1].at - a[1].at).slice(0, max));
}

function write(p: NoteState) {
  try {
    localStorage.setItem(NOTE_KEY, JSON.stringify({ items: newest(p.items, MAX_ITEMS), graduated: newest(p.graduated, MAX_GRADUATED) }));
    window.dispatchEvent(new Event(EVENT));
  } catch {
    /* 保存できない環境では何もしない */
  }
}

/** まちがえた: ノートに入れる (すでにあれば wrongCount を増やし、続けての正解を0に戻す) */
export function recordMistake(meta: MistakeMeta, q: { q: string; choices: string[]; answer: number; ex: string; source?: Mistake["source"] }, picked: number) {
  const p = readNote();
  const id = mistakeId(meta.unitId, q.q);
  const prev = p.items[id];
  const item: Mistake = {
    ...meta,
    ...(q.source ? { source: q.source } : {}),
    q: q.q,
    choices: [...q.choices],
    answer: q.answer,
    picked,
    ex: q.ex,
    at: Date.now(),
    wrongCount: (prev?.wrongCount ?? 0) + 1,
    rightStreak: 0,
  };
  const graduated = { ...p.graduated };
  delete graduated[id];
  write({ items: { ...p.items, [id]: item }, graduated });
}

/** 選択式でない問題 (数値・語句・並べかえ・記述) をまちがえた: q と模範解答を文字で残す */
export function recordMistakeText(meta: MistakeMeta, q: { q: string; model: string; ex: string; source?: Mistake["source"] }, mine: string) {
  const p = readNote();
  const id = mistakeId(meta.unitId, q.q);
  const prev = p.items[id];
  const item: Mistake = {
    ...meta,
    source: q.source,
    q: q.q,
    choices: [],
    answer: -1,
    picked: -1,
    model: q.model,
    mine,
    ex: q.ex,
    at: Date.now(),
    wrongCount: (prev?.wrongCount ?? 0) + 1,
    rightStreak: 0,
  };
  const graduated = { ...p.graduated };
  delete graduated[id];
  write({ items: { ...p.items, [id]: item }, graduated });
}

/** 選択式でない問題か (ノートの画面で出し方を変える) */
export const isTextMistake = (m: Mistake) => m.choices.length === 0;

/**
 * 正解した: ノートにある問題なら rightStreak を1つ進め、GRADUATE_STREAK に届いたら卒業させる。
 * 戻り値: ノートに無い問題は null、卒業したら "graduated"、まだなら残りの回数。
 */
export function recordRight(unitId: string, q: string): null | "graduated" | { left: number } {
  const p = readNote();
  const id = mistakeId(unitId, q);
  const prev = p.items[id];
  if (!prev) return null;
  const streak = prev.rightStreak + 1;
  if (streak >= GRADUATE_STREAK) {
    const items = { ...p.items };
    delete items[id];
    write({ items, graduated: { ...p.graduated, [id]: { unitId, unitName: prev.unitName, q, at: Date.now() } } });
    return "graduated";
  }
  write({ ...p, items: { ...p.items, [id]: { ...prev, rightStreak: streak } } });
  return { left: GRADUATE_STREAK - streak };
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}
let cache: { raw: string | null; value: NoteState } = { raw: null, value: EMPTY };
function snapshot(): NoteState {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(NOTE_KEY);
  } catch {
    return EMPTY;
  }
  if (raw !== cache.raw) cache = { raw, value: readNote() };
  return cache.value;
}
export function useNote(): NoteState {
  return useSyncExternalStore(subscribe, snapshot, () => EMPTY);
}
