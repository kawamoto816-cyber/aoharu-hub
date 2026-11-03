// あたらしいがっこうの「学びのダッシュボード」(/learn/gakko/dashboard) の集計。
// localStorage の生の文字列を受けとって数えるだけの純粋な関数 (読み書きは components/learn/gakko/GakkoDashboard)。
// 使う記録 (すべてこの端末の localStorage。サーバーには送らない):
//   aoharu.gakko.attendance.v1   出席 (その日の時間割4コマ完了)       lib/gakko/store
//   aoharu_lecture_read_v1       読んだ単元 { read: { id: 時刻 } }    lib/lecture/readLog
//   aoharu.moshi.results.v1      単元模試の結果 (単元ごとの最新・最高) lib/moshi/results
//   aoharu.exam.results.v1       入試・定期テストモードの1回ごとの結果 lib/exam/results
//   aoharu:tsukkomi:v1           ツッコミ学習法 (best・log)            lib/tsukkomi/storage

import { jstDateKey, type GakkoData } from "./timetable";
import type { MoshiResults, MoshiUnitRecord } from "@/lib/moshi/results";
import type { ExamAttempt } from "@/lib/exam/results";
import type { TsukkomiLogEntry } from "@/lib/tsukkomi/storage";

export interface DashData extends GakkoData {
  /** 単元模試 (/learn/moshi/<id>) がある単元 */
  moshi: string[];
}

export type Attendance = Record<string, string[]>;

export interface Records {
  attendance: Attendance;
  read: Record<string, number>;
  moshi: MoshiResults;
  exam: ExamAttempt[];
  tsukkomi: TsukkomiLogEntry[];
  /** log のない古い記録用 (単元:モード → 最高点) */
  tsukkomiBest: Record<string, number>;
}

// ---- 生の文字列 → 記録 (こわれていたら空) ----

function json(raw: string | null): unknown {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
const isObj = (v: unknown): v is Record<string, unknown> => !!v && typeof v === "object" && !Array.isArray(v);

export function parseAttendance(raw: string | null): Attendance {
  const v = json(raw);
  if (!isObj(v)) return {};
  const out: Attendance = {};
  for (const [k, ids] of Object.entries(v)) if (/^\d{4}-\d{2}-\d{2}$/.test(k)) out[k] = Array.isArray(ids) ? ids.filter((x): x is string => typeof x === "string") : [];
  return out;
}

export function parseMoshi(raw: string | null): MoshiResults {
  const v = json(raw);
  if (!isObj(v)) return {};
  const out: MoshiResults = {};
  for (const [k, r] of Object.entries(v)) if (isObj(r) && typeof r.count === "number" && typeof r.bestPct === "number") out[k] = r as unknown as MoshiUnitRecord;
  return out;
}

export function parseExam(raw: string | null): ExamAttempt[] {
  const v = json(raw);
  if (!Array.isArray(v)) return [];
  return v.filter((r): r is ExamAttempt => isObj(r) && typeof r.at === "string" && typeof r.score === "number" && typeof r.total === "number" && isObj(r.units));
}

export const isEmpty = (r: Records) =>
  !Object.keys(r.attendance).length && !Object.keys(r.read).length && !Object.keys(r.moshi).length && !r.exam.length && !r.tsukkomi.length && !Object.keys(r.tsukkomiBest).length;

// ---- 日付 ----

const pct = (s: number, t: number) => (t > 0 ? Math.round((s / t) * 100) : 0);
const isoMs = (iso: string) => {
  const t = Date.parse(iso);
  return Number.isFinite(t) ? t : 0;
};

/** "YYYY-MM-DD" に n 日足す */
export function addDays(key: string, n: number): string {
  const d = new Date(`${key}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}
/** 0=日 … 6=土 */
export const weekday = (key: string) => new Date(`${key}T00:00:00Z`).getUTCDay();
export const WEEK = ["日", "月", "火", "水", "木", "金", "土"];
export function dayLabel(key: string, withYear = false): string {
  const [y, m, d] = key.split("-").map(Number);
  return `${withYear ? `${y}年` : ""}${m}月${d}日（${WEEK[weekday(key)]}）`;
}
/** その月 ("YYYY-MM") の日数 */
export function monthLength(month: string): number {
  const [y, m] = month.split("-").map(Number);
  return new Date(Date.UTC(y, m, 0)).getUTCDate();
}
export function shiftMonth(month: string, n: number): string {
  const [y, m] = month.split("-").map(Number);
  const d = new Date(Date.UTC(y, m - 1 + n, 1));
  return d.toISOString().slice(0, 7);
}

// ---- 出席簿 ----

export interface Days {
  /** 出席した日 (4コマ完了) */
  attended: Set<string>;
  /** 1単元以上読んだ日 → その日に読んだ単元 */
  learned: Map<string, string[]>;
}

export function days(r: Records): Days {
  const learned = new Map<string, string[]>();
  for (const [id, at] of Object.entries(r.read)) {
    if (typeof at !== "number" || !at) continue;
    const k = jstDateKey(at);
    learned.set(k, [...(learned.get(k) ?? []), id]);
  }
  for (const [k, ids] of learned) learned.set(k, ids.sort((a, b) => (r.read[a] ?? 0) - (r.read[b] ?? 0)));
  return { attended: new Set(Object.keys(r.attendance)), learned };
}

/** きょう (まだならきのう) までさかのぼって、出席か学んだ日が続いた日数 */
export function streak(d: Days, today: string): number {
  const ok = (k: string) => d.attended.has(k) || d.learned.has(k);
  let k = ok(today) ? today : addDays(today, -1);
  let n = 0;
  while (ok(k)) {
    n++;
    k = addDays(k, -1);
  }
  return n;
}

// ---- 教科ごと (得意と苦手) ----

export interface SubjectStat {
  subject: string;
  color: string;
  /** その学年で読んだ単元数 / その学年の単元数 */
  read: number;
  units: number;
  readPct: number;
  /** 模試・入試モードの平均得点率 (記録がなければ null) と件数 */
  testPct: number | null;
  testN: number;
  /** ツッコミの正解率 (log がなければ null) と回数・最高点 */
  tsukkomiPct: number | null;
  tsukkomiN: number;
  tsukkomiBest: number;
  /** 並べるための点 (読んだ割合・模試・ツッコミのうち、記録のあるものの平均) */
  score: number;
  active: boolean;
  /** のびしろのときに出す: 次に読むとよい単元・単元模試 */
  nextRead?: string;
  nextReadName?: string;
  nextMoshi?: string;
  nextMoshiName?: string;
}

export function subjectStats(data: DashData, grade: string, r: Records): SubjectStat[] {
  const ids = data.byGrade[grade] ?? [];
  const subjOf = (id: string) => data.units[id]?.s;
  const moshiSet = new Set(data.moshi);

  // 模試・入試: 単元模試は単元ごとの最新の得点率、入試・定期テストモードは1回ごと・教科ごとの得点率
  const test = new Map<string, number[]>();
  const push = (s: string | undefined, v: number) => s && test.set(s, [...(test.get(s) ?? []), v]);
  for (const [id, m] of Object.entries(r.moshi)) push(subjOf(id), typeof m.lastPct === "number" ? m.lastPct : m.bestPct);
  for (const a of r.exam) {
    const by = new Map<string, [number, number]>();
    for (const [id, st] of Object.entries(a.units)) {
      const s = subjOf(id);
      if (!s || !Array.isArray(st)) continue;
      const cur = by.get(s) ?? [0, 0];
      by.set(s, [cur[0] + (Number(st[0]) || 0), cur[1] + (Number(st[1]) || 0)]);
    }
    for (const [s, [sc, t]] of by) if (t > 0) push(s, pct(sc, t));
  }

  const tk = new Map<string, { c: number; n: number; times: number }>();
  for (const e of r.tsukkomi) {
    const s = subjOf(e.unit);
    if (!s || e.n <= 0) continue;
    const cur = tk.get(s) ?? { c: 0, n: 0, times: 0 };
    tk.set(s, { c: cur.c + e.correct, n: cur.n + e.n, times: cur.times + 1 });
  }
  const tkBest = new Map<string, number>();
  for (const [k, v] of Object.entries(r.tsukkomiBest)) {
    const s = subjOf(k.split(":")[0]);
    if (s && typeof v === "number") tkBest.set(s, Math.max(tkBest.get(s) ?? 0, v));
  }

  const subjects: string[] = [];
  for (const id of ids) {
    const s = subjOf(id);
    if (s && !subjects.includes(s)) subjects.push(s);
  }

  return subjects.map((s) => {
    const own = ids.filter((id) => subjOf(id) === s);
    const read = own.filter((id) => r.read[id]).length;
    const readPct = pct(read, own.length);
    const t = test.get(s) ?? [];
    const testPct = t.length ? Math.round(t.reduce((a, b) => a + b, 0) / t.length) : null;
    const k = tk.get(s);
    const tsukkomiPct = k && k.n ? pct(k.c, k.n) : null;
    const parts = [readPct, testPct, tsukkomiPct].filter((x): x is number => x !== null);
    const active = read > 0 || t.length > 0 || !!k || tkBest.has(s);
    const nextRead = own.find((id) => !r.read[id]);
    const withMoshi = own.filter((id) => moshiSet.has(id));
    const nextMoshi =
      withMoshi.find((id) => r.read[id] && !r.moshi[id]) ??
      withMoshi.filter((id) => r.moshi[id]).sort((a, b) => r.moshi[a].lastPct - r.moshi[b].lastPct)[0] ??
      withMoshi[0];
    return {
      subject: s,
      color: data.units[own[0]]?.c ?? "#6E7084",
      read,
      units: own.length,
      readPct,
      testPct,
      testN: t.length,
      tsukkomiPct,
      tsukkomiN: k?.times ?? 0,
      tsukkomiBest: tkBest.get(s) ?? 0,
      score: parts.length ? parts.reduce((a, b) => a + b, 0) / parts.length : 0,
      active,
      nextRead,
      nextReadName: nextRead ? data.units[nextRead]?.n : undefined,
      nextMoshi,
      nextMoshiName: nextMoshi ? data.units[nextMoshi]?.n : undefined,
    };
  });
}

/** 得意 (上位) とのびしろ (下位)。記録のある教科が2つ未満なら、のびしろはまだ記録のない教科 */
export function rank(stats: SubjectStat[]): { strong: SubjectStat[]; grow: SubjectStat[]; untouched: boolean } {
  const act = stats.filter((s) => s.active).sort((a, b) => b.score - a.score);
  if (act.length < 2) return { strong: act, grow: stats.filter((s) => !s.active).slice(0, 2), untouched: true };
  const k = Math.min(2, Math.floor(act.length / 2));
  return { strong: act.slice(0, k), grow: act.slice(-k).reverse(), untouched: false };
}

/** 学年がえらばれていないとき、読んだ単元がいちばん多い学年 */
export function guessGrade(data: DashData, read: Record<string, number>): string {
  let best = "";
  let n = 0;
  for (const [g, ids] of Object.entries(data.byGrade)) {
    const c = ids.filter((id) => read[id]).length;
    if (c > n) [best, n] = [g, c];
  }
  return best;
}

// ---- 最近の学び ----

export interface Activity {
  at: number;
  kind: "read" | "moshi" | "exam" | "tsukkomi";
  unit?: string;
  /** 教科 */
  subject?: string;
  text: string;
}

export const KIND_LABEL: Record<Activity["kind"], string> = { read: "読了", moshi: "単元模試", exam: "入試・テスト", tsukkomi: "ツッコミ" };

export function activities(data: DashData, r: Records): Activity[] {
  const name = (id: string) => data.units[id]?.n ?? id;
  const subj = (id: string) => data.units[id]?.s;
  const out: Activity[] = [];
  for (const [id, at] of Object.entries(r.read)) if (typeof at === "number" && at) out.push({ at, kind: "read", unit: id, subject: subj(id), text: `「${name(id)}」を読んだ` });
  for (const [id, m] of Object.entries(r.moshi)) {
    const at = isoMs(m.lastAt);
    if (at) out.push({ at, kind: "moshi", unit: id, subject: subj(id), text: `「${name(id)}」の模試 ${m.lastPct}%` });
  }
  for (const a of r.exam) {
    const at = isoMs(a.at);
    if (at) out.push({ at, kind: "exam", text: `${a.title} ${a.score}点／${a.total}点` });
  }
  for (const e of r.tsukkomi) out.push({ at: e.at, kind: "tsukkomi", unit: e.unit, subject: subj(e.unit), text: `「${name(e.unit)}」${e.n}問中${e.correct}問${e.mode === "advanced" ? "（上級）" : ""}` });
  return out.sort((a, b) => b.at - a.at);
}

// ---- 報告書 ----

export interface ReportDay {
  key: string;
  attended: boolean;
  items: Activity[];
}

export interface Report {
  from: string;
  to: string;
  days: ReportDay[];
  learnedDays: number;
  attendedDays: number;
  readUnits: number;
  tests: number;
  tsukkomi: number;
  bySubject: { subject: string; n: number }[];
}

export function report(data: DashData, r: Records, from: string, to: string): Report {
  const acts = activities(data, r).filter((a) => {
    const k = jstDateKey(a.at);
    return k >= from && k <= to;
  });
  const map = new Map<string, ReportDay>();
  const day = (k: string) => {
    let d = map.get(k);
    if (!d) map.set(k, (d = { key: k, attended: !!r.attendance[k], items: [] }));
    return d;
  };
  for (const a of [...acts].reverse()) day(jstDateKey(a.at)).items.push(a);
  for (const k of Object.keys(r.attendance)) if (k >= from && k <= to) day(k).attended = true;
  const ds = [...map.values()].sort((a, b) => a.key.localeCompare(b.key));
  const reads = acts.filter((a) => a.kind === "read");
  const sub = new Map<string, number>();
  for (const a of reads) if (a.subject) sub.set(a.subject, (sub.get(a.subject) ?? 0) + 1);
  return {
    from,
    to,
    days: ds,
    learnedDays: ds.filter((d) => d.items.some((a) => a.kind === "read")).length,
    attendedDays: ds.filter((d) => d.attended).length,
    readUnits: reads.length,
    tests: acts.filter((a) => a.kind === "moshi" || a.kind === "exam").length,
    tsukkomi: acts.filter((a) => a.kind === "tsukkomi").length,
    bySubject: [...sub].map(([subject, n]) => ({ subject, n })).sort((a, b) => b.n - a.n),
  };
}
