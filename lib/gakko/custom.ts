// あたらしいがっこうの「時間割を自分で組む」。
// 週の型 = 曜日ごとの「教科の並び」(1日1〜6コマ)。各コマは教科だけ決めておき、単元は
// その教科のまだ読んでいない単元から学校の地図の順に自動で入る (決定的)。単元を固定 (ピン留め) したコマはその単元。
// 「きょうだけ入れかえ」はその日だけ、1コマを別の単元にする。
// 保存はこの端末の localStorage (lib/gakko/store の PLAN_KEY)。ここは純粋な関数だけ (クライアントからも読む)。

import { hash, jstDayStart, type GakkoData, type Period } from "./timetable";

export const MIN_SLOTS = 1;
export const MAX_SLOTS = 6;
export const DEFAULT_SLOTS = 4;

/** 1コマ: 教科 (s) と、固定した単元 (pin、なければ自動) */
export interface CustomSlot {
  s: string;
  pin?: string;
}

/** 週の型: [0]=日 … [6]=土 */
export type CustomWeek = CustomSlot[][];

export interface CustomPlan {
  mode: "auto" | "custom";
  /** 学年 → 週の型 (学年で教科がちがうので学年ごと) */
  weeks: Record<string, CustomWeek>;
  /** きょうだけ入れかえ: その日・その学年だけ、コマ番号 (0から) → 単元id */
  swap?: { date: string; grade: string; slots: Record<string, string> };
}

export const EMPTY_PLAN: CustomPlan = { mode: "auto", weeks: {} };

/** 0=日 … 6=土 */
export const weekdayOf = (dateKey: string) => new Date(`${dateKey}T00:00:00Z`).getUTCDay();
export const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];
/** 画面に並べる順 (月はじまり) */
export const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0];

// ---- 保存した文字列 → 計画 (こわれていたら自動) ----

const isObj = (v: unknown): v is Record<string, unknown> => !!v && typeof v === "object" && !Array.isArray(v);

function cleanDay(v: unknown): CustomSlot[] {
  if (!Array.isArray(v)) return [];
  const out: CustomSlot[] = [];
  for (const x of v) {
    if (!isObj(x) || typeof x.s !== "string" || !x.s) continue;
    out.push(typeof x.pin === "string" && x.pin ? { s: x.s, pin: x.pin } : { s: x.s });
    if (out.length >= MAX_SLOTS) break;
  }
  return out;
}

export function parsePlan(raw: string | null): CustomPlan {
  if (!raw) return EMPTY_PLAN;
  let v: unknown;
  try {
    v = JSON.parse(raw);
  } catch {
    return EMPTY_PLAN;
  }
  if (!isObj(v)) return EMPTY_PLAN;
  const weeks: Record<string, CustomWeek> = {};
  if (isObj(v.weeks)) for (const [g, w] of Object.entries(v.weeks)) if (Array.isArray(w) && w.length === 7) weeks[g] = w.map(cleanDay);
  const plan: CustomPlan = { mode: v.mode === "custom" ? "custom" : "auto", weeks };
  const sw = v.swap;
  if (isObj(sw) && typeof sw.date === "string" && typeof sw.grade === "string" && isObj(sw.slots)) {
    const slots: Record<string, string> = {};
    for (const [k, id] of Object.entries(sw.slots)) if (/^\d$/.test(k) && typeof id === "string") slots[k] = id;
    plan.swap = { date: sw.date, grade: sw.grade, slots };
  }
  return plan;
}

// ---- 学年の教科と単元 ----

/** 学年の教科 (学校の地図の順) */
export function gradeSubjects(data: GakkoData, grade: string): string[] {
  const out: string[] = [];
  for (const id of data.byGrade[grade] ?? []) {
    const s = data.units[id]?.s;
    if (s && !out.includes(s)) out.push(s);
  }
  return out;
}

/** 学年の、その教科の単元 (学校の地図の順) */
export function subjectUnits(data: GakkoData, grade: string, subject: string): string[] {
  return (data.byGrade[grade] ?? []).filter((id) => data.units[id]?.s === subject);
}

/** はじめの週の型: 曜日ごとに教科の順をずらして4コマずつ */
export function defaultWeek(data: GakkoData, grade: string): CustomWeek {
  const subs = gradeSubjects(data, grade);
  return Array.from({ length: 7 }, (_, d) => (subs.length ? Array.from({ length: DEFAULT_SLOTS }, (_, i) => ({ s: subs[(d + i) % subs.length] })) : []));
}

export function weekFor(plan: CustomPlan, data: GakkoData, grade: string): CustomWeek {
  return plan.weeks[grade] ?? defaultWeek(data, grade);
}

/** その日の型 (学年にない教科のコマは除く) */
export function daySlots(plan: CustomPlan, data: GakkoData, grade: string, dateKey: string): CustomSlot[] {
  const subs = new Set(gradeSubjects(data, grade));
  return (weekFor(plan, data, grade)[weekdayOf(dateKey)] ?? []).filter((x) => subs.has(x.s)).slice(0, MAX_SLOTS);
}

/**
 * 自分で組んだ、その日の時間割。
 * 1. きょうだけ入れかえた単元・固定した単元を先に置く。
 * 2. のこりのコマは、その教科の「まだ読んでいない (またはきょう読んだ)」単元を学校の地図の順に、重ならないように入れる。
 *    きょう読んだ単元も候補に残すので、読み終えてもコマが入れかわらない。
 * 3. その教科をぜんぶ読んでいたら、読んだ単元から日付で決まった1つを復習コマにする。
 * 固定・入れかえた単元がきょうより前に読んだものなら、復習コマ (開いたら読んだことにする)。
 */
export function buildCustomTimetable(data: GakkoData, grade: string, dateKey: string, read: Record<string, number>, plan: CustomPlan): Period[] {
  const gradeIds = new Set(data.byGrade[grade] ?? []);
  const slots = daySlots(plan, data, grade, dateKey);
  const start = jstDayStart(dateKey);
  const fresh = (id: string) => !read[id] || read[id] >= start;
  const swaps = plan.swap && plan.swap.date === dateKey && plan.swap.grade === grade ? plan.swap.slots : {};

  const out: (Period | null)[] = slots.map((slot, i) => {
    const sw = swaps[String(i)];
    if (sw && gradeIds.has(sw)) return { unit: sw, review: !fresh(sw), subject: data.units[sw]?.s ?? slot.s, swapped: true };
    if (slot.pin && gradeIds.has(slot.pin) && data.units[slot.pin]?.s === slot.s) return { unit: slot.pin, review: !fresh(slot.pin), subject: slot.s, pinned: true };
    return null;
  });
  const taken = new Set(out.filter((p): p is Period => !!p).map((p) => p.unit));

  return slots.map((slot, i) => {
    const fixed = out[i];
    if (fixed) return fixed;
    const own = subjectUnits(data, grade, slot.s);
    const next = own.find((id) => !taken.has(id) && fresh(id));
    if (next) {
      taken.add(next);
      return { unit: next, review: false, subject: slot.s };
    }
    const pool = own.filter((id) => !taken.has(id));
    const list = pool.length ? pool : own;
    const unit = list[hash(`${dateKey}|${grade}|${i}`) % list.length];
    taken.add(unit);
    return { unit, review: true, subject: slot.s };
  });
}

// ---- 週の型を変える (新しい計画を返す) ----

export function setDay(plan: CustomPlan, data: GakkoData, grade: string, wd: number, day: CustomSlot[]): CustomPlan {
  const week = weekFor(plan, data, grade).map((d, i) => (i === wd ? day.slice(0, MAX_SLOTS) : d));
  return { ...plan, weeks: { ...plan.weeks, [grade]: week } };
}

/** コマ数を n にする (へらすときは後ろから、ふやすときはまだ少ない教科を足す) */
export function resizeDay(day: CustomSlot[], n: number, subjects: string[]): CustomSlot[] {
  const k = Math.max(MIN_SLOTS, Math.min(MAX_SLOTS, n));
  if (day.length >= k) return day.slice(0, k);
  const out = [...day];
  while (out.length < k && subjects.length) {
    const count = (s: string) => out.filter((x) => x.s === s).length;
    const s = [...subjects].sort((a, b) => count(a) - count(b) || subjects.indexOf(a) - subjects.indexOf(b))[0];
    out.push({ s });
  }
  return out;
}
