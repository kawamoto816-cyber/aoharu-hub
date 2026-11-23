"use client";

import { useSyncExternalStore } from "react";
import { MASTERY_KEY } from "@/lib/sakanobori/mastery";
import { MOSHI_RESULTS_KEY } from "@/lib/moshi/results";
import { ROOM_GRADES, ROOM_STREAK_KING } from "@/lib/station/room-rules";

// アオハルーム（勉強王自習室・試作）。自習ホームの中の「みんなで学ぶ部屋（話さないつながり）」。
// 25分＋5分（または50分＋10分）を1サイクルとして繰り返し、集中している間に自習ホームで起きた
// 「学びのできごと」（解いた・正解した・単元模試を終えた）と、サイクルの完走を「学びポイント」にして競う。
// 座っているだけ・タイマーをかけっぱなしでは点にならない（時間は参考として出すだけ）。
//
// 試作では、学びのできごとを、この端末にある習熟度（さかのぼり）と模試の結果の記録の差分で数える。
// 本番ではサーバーで数え、画面から送られた数字は信じない（設計図の「不正をふせぐ」）。
// 23時〜朝5時に始めたサイクルはランキングに数えない（未成年が多いので深夜の競争をあおらない）。

export type Mode = 25 | 50;
export const MODES: { mode: Mode; focus: number; rest: number; label: string }[] = [
  { mode: 25, focus: 25, rest: 5, label: "25分＋休憩5分" },
  { mode: 50, focus: 50, rest: 10, label: "50分＋休憩10分" },
];
export const modeOf = (m: Mode) => MODES.find((x) => x.mode === m)!;

export const REFLECT = ["できた", "半分できた", "できなかった"] as const;
export type Reflect = (typeof REFLECT)[number];

export const GRADES = ROOM_GRADES;
export type Grade = (typeof GRADES)[number];

/** 学びポイントの決まり */
export const POINT_RULE = { solved: 1, correct: 2, unit: 10, cycle: 5 };
/** 1つの単元で、1サイクルにふつうに数える問題の数。これを超えた分は半分 */
export const SAME_UNIT_FULL = 20;

/** 習熟度・模試の記録の写し（サイクルを始めたとき） */
export interface Snap {
  n: Record<string, number>;
  ok: Record<string, number>;
  moshi: Record<string, number>;
}

export interface Gains {
  solved: number;
  correct: number;
  units: number;
  mathCorrect: number;
}

export interface Cycle {
  id: string;
  /** 始めた時刻 (ISO) */
  at: string;
  mode: Mode;
  plan: string;
  /** 集中した秒数（参考） */
  focusSec: number;
  /** 最後まで走りきったか */
  completed: boolean;
  reflect: Reflect;
  note: string;
  gains: Gains;
  points: number;
  /** 23時〜5時に始めた（ランキングに数えない） */
  night: boolean;
}

export interface Running {
  startAt: number;
  mode: Mode;
  plan: string;
  snap: Snap;
}

export interface RoomState {
  nick: string;
  grade: Grade;
  mode: Mode;
  running: Running | null;
  /** 集中が終わってふり返りを待っているサイクル */
  pending: { running: Running; endAt: number; completed: boolean } | null;
  /** 休憩の終わる時刻 */
  restUntil: number | null;
  cycles: Cycle[];
  stamps: number;
  league?: LeagueState;
  /** 音（rain・cafe・library。無音は null） */
  sound?: string | null;
  volume?: number;
}

const KEY = "aoharu-room-v1";
const INITIAL: RoomState = { nick: "あなた", grade: "高1", mode: 25, running: null, pending: null, restUntil: null, cycles: [], stamps: 0 };

let state: RoomState = INITIAL;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) state = { ...INITIAL, ...(JSON.parse(raw) as Partial<RoomState>) };
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

export function updateRoom(fn: (s: RoomState) => RoomState) {
  load();
  state = fn(state);
  save();
  for (const l of listeners) l();
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useRoom(): RoomState {
  return useSyncExternalStore(
    subscribe,
    () => {
      load();
      return state;
    },
    () => INITIAL,
  );
}

export function resetRoom() {
  updateRoom(() => INITIAL);
}

// ---------- 学びのできごと ----------

function readJson(key: string): Record<string, unknown> {
  try {
    const raw = window.localStorage.getItem(key);
    const v = raw ? (JSON.parse(raw) as unknown) : {};
    return v && typeof v === "object" ? (v as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}

const num = (v: unknown, k: string) => {
  const x = v && typeof v === "object" ? (v as Record<string, unknown>)[k] : undefined;
  return typeof x === "number" && Number.isFinite(x) ? x : 0;
};

/** いまの記録の写し（読めない環境では空） */
export function takeSnap(): Snap {
  const snap: Snap = { n: {}, ok: {}, moshi: {} };
  if (typeof window === "undefined") return snap;
  for (const [u, v] of Object.entries(readJson(MASTERY_KEY))) {
    snap.n[u] = num(v, "n");
    snap.ok[u] = num(v, "ok");
  }
  for (const [u, v] of Object.entries(readJson(MOSHI_RESULTS_KEY))) snap.moshi[u] = num(v, "count");
  return snap;
}

const isMath = (unit: string) => /math|sansu|sugaku/.test(unit);

/** 始めたときと今の差（純粋な関数）。同じ単元をたくさん解いた分は半分に数える */
export function gainsOf(a: Snap, b: Snap): Gains & { solvedPts: number; correctPts: number } {
  let solved = 0;
  let correct = 0;
  let mathCorrect = 0;
  let solvedPts = 0;
  let correctPts = 0;
  for (const u of Object.keys(b.n)) {
    const dn = Math.max(0, (b.n[u] ?? 0) - (a.n[u] ?? 0));
    const dok = Math.min(dn, Math.max(0, (b.ok[u] ?? 0) - (a.ok[u] ?? 0)));
    solved += dn;
    correct += dok;
    if (isMath(u)) mathCorrect += dok;
    const full = Math.min(dn, SAME_UNIT_FULL);
    solvedPts += full + (dn - full) / 2;
    const fullOk = Math.min(dok, SAME_UNIT_FULL);
    correctPts += fullOk + (dok - fullOk) / 2;
  }
  let units = 0;
  for (const u of Object.keys(b.moshi)) if ((b.moshi[u] ?? 0) > (a.moshi[u] ?? 0)) units++;
  return { solved, correct, units, mathCorrect, solvedPts, correctPts };
}

/** サイクルの学びポイント。完走ボーナスは、1問でも解いたサイクルだけ */
export function pointsOf(g: ReturnType<typeof gainsOf>, completed: boolean): number {
  const p = g.solvedPts * POINT_RULE.solved + g.correctPts * POINT_RULE.correct + g.units * POINT_RULE.unit + (completed && g.solved > 0 ? POINT_RULE.cycle : 0);
  return Math.round(p);
}

// ---------- 時間 ----------

/** 23時〜朝5時（ランキングに数えない） */
export const isNight = (d: Date) => d.getHours() >= 23 || d.getHours() < 5;
/** 早起き（5時〜8時に始めた） */
export const isEarly = (d: Date) => d.getHours() >= 5 && d.getHours() < 8;

export const dayKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** その週の月曜日 */
export function weekKey(d: Date): string {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  x.setDate(x.getDate() - ((x.getDay() + 6) % 7));
  return dayKey(x);
}

/** 今日か昨日まで、完走したサイクルが続いている日数 */
export function streakOf(cycles: Cycle[], now: Date): number {
  const days = new Set(cycles.filter((c) => c.completed).map((c) => dayKey(new Date(c.at))));
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (!days.has(dayKey(d))) d.setDate(d.getDate() - 1);
  let n = 0;
  while (days.has(dayKey(d))) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}

export interface MyStats {
  today: number;
  week: number;
  weekMath: number;
  weekEarly: number;
  weekCycles: number;
  weekFocusMin: number;
  weekSolved: number;
  todayFocusMin: number;
  streak: number;
  nightPoints: number;
}

export function myStats(cycles: Cycle[], now: Date): MyStats {
  const wk = weekKey(now);
  const td = dayKey(now);
  const s: MyStats = { today: 0, week: 0, weekMath: 0, weekEarly: 0, weekCycles: 0, weekFocusMin: 0, weekSolved: 0, todayFocusMin: 0, streak: streakOf(cycles, now), nightPoints: 0 };
  for (const c of cycles) {
    const d = new Date(c.at);
    if (dayKey(d) === td) s.todayFocusMin += c.focusSec / 60;
    if (weekKey(d) !== wk) continue;
    s.weekFocusMin += c.focusSec / 60;
    s.weekSolved += c.gains.solved;
    if (c.night) {
      s.nightPoints += c.points;
      continue;
    }
    s.week += c.points;
    if (dayKey(d) === td) s.today += c.points;
    s.weekMath += c.gains.mathCorrect;
    if (c.completed) s.weekCycles++;
    if (c.completed && isEarly(d)) s.weekEarly++;
  }
  s.weekFocusMin = Math.round(s.weekFocusMin);
  s.todayFocusMin = Math.round(s.todayFocusMin);
  return s;
}

// ---------- ランキングと勉強王 ----------

export interface Peer {
  nick: string;
  grade: Grade;
  week: number;
  today: number;
  math: number;
  early: number;
  streak: number;
  focusMin: number;
  /** いま部屋にいる（見本） */
  here?: string;
}

/** 見本の仲間（架空のニックネーム） */
export const PEERS: Peer[] = [
  { nick: "そらまめ", grade: "高1", week: 412, today: 58, math: 96, early: 3, streak: 34, focusMin: 640, here: "数学" },
  { nick: "ひなた", grade: "高2", week: 388, today: 71, math: 40, early: 6, streak: 12, focusMin: 590, here: "英語" },
  { nick: "かもめ", grade: "中3", week: 365, today: 44, math: 120, early: 1, streak: 21, focusMin: 700 },
  { nick: "ゆずこ", grade: "高1", week: 330, today: 36, math: 61, early: 0, streak: 8, focusMin: 520, here: "国語" },
  { nick: "テツ", grade: "高3", week: 318, today: 0, math: 88, early: 4, streak: 46, focusMin: 810 },
  { nick: "みずいろ", grade: "中2", week: 290, today: 52, math: 70, early: 2, streak: 5, focusMin: 430, here: "理科" },
  { nick: "あおば", grade: "高1", week: 274, today: 25, math: 33, early: 5, streak: 17, focusMin: 470 },
  { nick: "ことり", grade: "中1", week: 251, today: 40, math: 59, early: 0, streak: 9, focusMin: 360, here: "数学" },
  { nick: "しろくま", grade: "高2", week: 233, today: 18, math: 77, early: 1, streak: 3, focusMin: 410 },
  { nick: "なぎさ", grade: "中3", week: 219, today: 30, math: 42, early: 7, streak: 30, focusMin: 380, here: "社会" },
  { nick: "こむぎ", grade: "高1", week: 198, today: 12, math: 21, early: 0, streak: 2, focusMin: 300 },
  { nick: "ルカ", grade: "高3", week: 186, today: 33, math: 54, early: 2, streak: 14, focusMin: 350, here: "数学" },
  { nick: "つばめ", grade: "中2", week: 160, today: 0, math: 38, early: 0, streak: 0, focusMin: 260 },
  { nick: "はるき", grade: "高2", week: 142, today: 20, math: 15, early: 3, streak: 6, focusMin: 240 },
  { nick: "もみじ", grade: "小6", week: 131, today: 22, math: 47, early: 4, streak: 11, focusMin: 210, here: "算数" },
  { nick: "いるか", grade: "中1", week: 118, today: 9, math: 12, early: 0, streak: 1, focusMin: 200 },
  { nick: "くるみ", grade: "高1", week: 96, today: 14, math: 20, early: 1, streak: 4, focusMin: 170 },
  { nick: "ほたる", grade: "中3", week: 74, today: 0, math: 9, early: 0, streak: 0, focusMin: 120 },
];

export interface Row extends Peer {
  me: boolean;
}

export function rows(s: RoomState, st: MyStats): Row[] {
  const me: Row = { nick: s.nick, grade: s.grade, week: st.week, today: st.today, math: st.weekMath, early: st.weekEarly, streak: st.streak, focusMin: st.weekFocusMin, me: true };
  return [me, ...PEERS.map((p) => ({ ...p, me: false }))];
}

export type Board = "week" | "today" | "grade";
export function board(all: Row[], kind: Board, grade: Grade): Row[] {
  const list = kind === "grade" ? all.filter((r) => r.grade === grade) : all;
  const key = kind === "today" ? "today" : "week";
  return [...list].sort((a, b) => b[key] - a[key] || Number(b.me) - Number(a.me));
}

export const STREAK_KING = ROOM_STREAK_KING;

export interface Title {
  id: string;
  name: string;
  how: string;
  holder: Row | null;
  /** 自分があと少しで届くとき */
  mine: string;
}

/** だれにでも王になる道があるように、称号をいくつも用意する */
export function titles(all: Row[]): Title[] {
  const me = all.find((r) => r.me)!;
  const top = (k: "week" | "math" | "early") => [...all].sort((a, b) => b[k] - a[k] || Number(b.me) - Number(a.me))[0];
  const gap = (k: "week" | "math" | "early", unit: string) => {
    const t = top(k);
    if (t.me) return "あなたが王です";
    return `あと${t[k] - me[k] + 1}${unit}で王`;
  };
  const streakers = all.filter((r) => r.streak >= STREAK_KING).sort((a, b) => b.streak - a.streak);
  return [
    { id: "week", name: "今週の勉強王", how: "今週の学びポイントがいちばん多い人", holder: top("week"), mine: gap("week", "ポイント") },
    { id: "math", name: "数学王", how: "今週、数学（算数）で正解した問題がいちばん多い人", holder: top("math"), mine: gap("math", "問") },
    { id: "early", name: "早起き王", how: "今週、朝5時〜8時に始めて完走したサイクルがいちばん多い人", holder: top("early"), mine: gap("early", "サイクル") },
    {
      id: "streak",
      name: "継続王",
      how: `${STREAK_KING}日続けて、完走したサイクルがある人（何人でもなれる）`,
      holder: streakers[0] ?? null,
      mine: me.streak >= STREAK_KING ? "あなたも継続王です" : `あなたは${me.streak}日。あと${STREAK_KING - me.streak}日`,
    },
  ];
}

export const newCycleId = () => `c${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

// ---------- 部屋の「いまいる人」（見本） ----------

const hash = (s: string) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
};
const SUBJECTS = ["数学", "英語", "国語", "理科", "社会", "数学", "英語"];

/** その時刻（10分ごと）に部屋にいるか。夕方〜夜は多め、深夜はだれもいない */
export function presentAt(p: Peer, now: Date): string | undefined {
  const h = now.getHours();
  if (isNight(now)) return undefined;
  const rate = h >= 19 ? 60 : h >= 16 ? 50 : h >= 8 && h < 12 ? 30 : h < 8 ? 20 : 35;
  const slot = Math.floor(now.getTime() / 600_000);
  const x = hash(`${p.nick}:${slot}`);
  if (x % 100 >= rate) return undefined;
  return p.grade === "小6" ? "算数" : SUBJECTS[(x >>> 8) % SUBJECTS.length];
}

// ---------- 週のリーグ（30人・上位5人が昇格、下位5人が降格） ----------

export const LEAGUES = ["若葉リーグ", "若竹リーグ", "青空リーグ", "流星リーグ", "王者リーグ"];
export const LEAGUE_SIZE = 30;
export const MOVE = 5;
const LEAGUE_BASE = [40, 90, 150, 230, 330];
const NAME_A = ["あお", "そら", "みど", "ゆき", "はる", "なつ", "あき", "ふゆ", "ほし", "うみ", "かぜ", "もり", "つき", "ひか", "しお"];
const NAME_B = ["まる", "りん", "すけ", "こ", "た", "の", "ぴ", "ぼう", "なみ", "ね", "ちゃん", "ろう"];

export interface LeagueRow {
  nick: string;
  points: number;
  me: boolean;
}

/** その週・そのリーグの仲間（見本）。progress は週の進み (0〜1) */
export function leaguePeers(week: string, level: number, progress: number): LeagueRow[] {
  const out: LeagueRow[] = [];
  const used = new Set<string>();
  for (let i = 0; out.length < LEAGUE_SIZE - 1; i++) {
    const x = hash(`${week}:${level}:${i}`);
    const nick = NAME_A[x % NAME_A.length] + NAME_B[(x >>> 5) % NAME_B.length];
    if (used.has(nick)) continue;
    used.add(nick);
    const full = LEAGUE_BASE[level] * (0.35 + ((x >>> 10) % 1000) / 800);
    const pace = 0.7 + ((x >>> 20) % 60) / 100;
    out.push({ nick, points: Math.round(full * Math.min(1, progress * pace)), me: false });
  }
  return out;
}

/** 週の進み（月曜0時から日曜24時まで） */
export function weekProgress(now: Date): number {
  const d = (now.getDay() + 6) % 7;
  return Math.min(1, (d * 24 + now.getHours() + now.getMinutes() / 60) / (7 * 24));
}

export function leagueTable(week: string, level: number, progress: number, me: { nick: string; points: number }): LeagueRow[] {
  return [...leaguePeers(week, level, progress), { nick: me.nick, points: me.points, me: true }].sort((a, b) => b.points - a.points || Number(b.me) - Number(a.me));
}

/** 週の結果で、次の週のリーグを決める */
export function nextLevel(level: number, rank: number): { level: number; moved: "up" | "down" | "stay" } {
  if (rank <= MOVE && level < LEAGUES.length - 1) return { level: level + 1, moved: "up" };
  if (rank > LEAGUE_SIZE - MOVE && level > 0) return { level: level - 1, moved: "down" };
  return { level, moved: "stay" };
}

/** ある週の自分の学びポイント（夜をのぞく） */
export const weekPoints = (cycles: Cycle[], week: string) => cycles.filter((c) => !c.night && weekKey(new Date(c.at)) === week).reduce((a, c) => a + c.points, 0);

export interface LeagueState {
  level: number;
  week: string;
  last?: { week: string; rank: number; moved: "up" | "down" | "stay"; from: number };
}

/** 週が変わっていたら、前の週の順位で昇格・降格を決める（純粋な関数） */
export function rollLeague(l: LeagueState | undefined, cycles: Cycle[], nick: string, now: Date): LeagueState {
  const wk = weekKey(now);
  if (!l || !l.week) return { level: 0, week: wk };
  if (l.week === wk) return l;
  const table = leagueTable(l.week, l.level, 1, { nick, points: weekPoints(cycles, l.week) });
  const rank = table.findIndex((r) => r.me) + 1;
  const n = nextLevel(l.level, rank);
  return { level: n.level, week: wk, last: { week: l.week, rank, moved: n.moved, from: l.level } };
}
