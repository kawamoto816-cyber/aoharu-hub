import { getSupabaseAdmin } from "@/lib/aoharu-entitlements/supabase/client";

// 学習便の学習ログをアカウントに保存する (Supabase: station_learn_log / station_members、定義は docs/station-log.sql)。
// テーブルがまだ無いなど書けないときは false / null を返し、画面側はそのまま動き続ける。
// 数字は端末から送られた差分（試験運用のあいだの作り）。1回の送信あたりの上限をかけて、けた外れの値は受け取らない。

export interface LogEntry {
  unit: string;
  solved: number;
  correct: number;
  moshi: number;
}

export interface LogRow extends LogEntry {
  user_id: string;
  at: string;
}

export interface Member {
  user_id: string;
  nick: string;
  grade: string;
}

/** 学びポイントの決まり（lib/station/room.ts の POINT_RULE と同じ。完走の5点はここでは数えない） */
const POINT = { solved: 1, correct: 2, unit: 10 };
const SAME_UNIT_FULL = 20;

const UNIT = /^[\w.:\/-]{1,80}$/;
const int = (v: unknown, max: number) => (typeof v === "number" && Number.isFinite(v) ? Math.min(Math.max(Math.floor(v), 0), max) : 0);

/** 受け取った差分をととのえる（単元は60個まで、1単元200問まで、模試は10回まで） */
export function cleanEntries(input: unknown): LogEntry[] {
  if (!Array.isArray(input)) return [];
  const out: LogEntry[] = [];
  for (const raw of input.slice(0, 60)) {
    if (!raw || typeof raw !== "object") continue;
    const r = raw as Record<string, unknown>;
    if (typeof r.unit !== "string" || !UNIT.test(r.unit)) continue;
    const solved = int(r.solved, 200);
    const correct = Math.min(int(r.correct, 200), solved);
    const moshi = int(r.moshi, 10);
    if (solved === 0 && moshi === 0) continue;
    out.push({ unit: r.unit, solved, correct, moshi });
  }
  return out;
}

export const cleanText = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/[\u0000-\u001f]/g, "").trim().slice(0, max) : "");

export async function saveLog(userId: string, entries: LogEntry[], profile: { nick: string; grade: string }): Promise<boolean> {
  try {
    const db = getSupabaseAdmin();
    if (entries.length) {
      const { error } = await db.from("station_learn_log").insert(entries.map((e) => ({ user_id: userId, ...e })));
      if (error) return false;
    }
    if (profile.nick || profile.grade) {
      await db.from("station_members").upsert({ user_id: userId, nick: profile.nick, grade: profile.grade, updated_at: new Date().toISOString() }, { onConflict: "user_id" });
    }
    return true;
  } catch {
    return false;
  }
}

export interface UserSummary {
  user_id: string;
  nick: string;
  grade: string;
  solved: number;
  correct: number;
  moshi: number;
  points: number;
  units: string[];
  first: string;
  last: string;
}

/** 期間内のログを人ごとにまとめる（純粋な関数） */
export function summarize(rows: LogRow[], members: Member[]): UserSummary[] {
  const who = new Map(members.map((m) => [m.user_id, m]));
  const byUser = new Map<string, { perUnit: Map<string, LogEntry>; first: string; last: string }>();
  for (const r of rows) {
    const u = byUser.get(r.user_id) ?? { perUnit: new Map<string, LogEntry>(), first: r.at, last: r.at };
    const e = u.perUnit.get(r.unit) ?? { unit: r.unit, solved: 0, correct: 0, moshi: 0 };
    e.solved += r.solved;
    e.correct += r.correct;
    e.moshi += r.moshi;
    u.perUnit.set(r.unit, e);
    if (r.at < u.first) u.first = r.at;
    if (r.at > u.last) u.last = r.at;
    byUser.set(r.user_id, u);
  }
  const out: UserSummary[] = [];
  for (const [user_id, u] of byUser) {
    let solved = 0;
    let correct = 0;
    let moshi = 0;
    let points = 0;
    for (const e of u.perUnit.values()) {
      solved += e.solved;
      correct += e.correct;
      moshi += e.moshi;
      const full = Math.min(e.solved, SAME_UNIT_FULL);
      const fullOk = Math.min(e.correct, SAME_UNIT_FULL);
      points += (full + (e.solved - full) / 2) * POINT.solved + (fullOk + (e.correct - fullOk) / 2) * POINT.correct + e.moshi * POINT.unit;
    }
    const m = who.get(user_id);
    out.push({ user_id, nick: m?.nick ?? "", grade: m?.grade ?? "", solved, correct, moshi, points: Math.round(points), units: [...u.perUnit.keys()].sort(), first: u.first, last: u.last });
  }
  return out.sort((a, b) => (a.nick || a.user_id).localeCompare(b.nick || b.user_id, "ja"));
}

/** 期間 [from, to) のログを人ごとにまとめて返す。読めなければ null */
export async function loadSummary(fromIso: string, toIso: string): Promise<UserSummary[] | null> {
  try {
    const db = getSupabaseAdmin();
    const { data, error } = await db.from("station_learn_log").select("user_id,at,unit,solved,correct,moshi").gte("at", fromIso).lt("at", toIso).order("at", { ascending: true }).limit(20000);
    if (error) return null;
    const rows = (data ?? []) as LogRow[];
    const ids = [...new Set(rows.map((r) => r.user_id))];
    let members: Member[] = [];
    if (ids.length) {
      const res = await db.from("station_members").select("user_id,nick,grade").in("user_id", ids);
      members = (res.data ?? []) as Member[];
    }
    return summarize(rows, members);
  } catch {
    return null;
  }
}

/** 日本時間の日付と時刻（HH:MM）から期間を作る。形がおかしければ、その日の0時〜24時 */
export function rangeOf(date: string | undefined, from: string | undefined, to: string | undefined, now = new Date()): { date: string; from: string; to: string; fromIso: string; toIso: string } {
  const jst = new Date(now.getTime() + 9 * 3600 * 1000);
  const today = jst.toISOString().slice(0, 10);
  const d = date && /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : today;
  const hm = (v: string | undefined, fallback: string) => (v && /^([01]\d|2[0-3]):[0-5]\d$/.test(v) ? v : fallback);
  const f = hm(from, "00:00");
  const t = hm(to, "23:59");
  const fromIso = new Date(`${d}T${f}:00+09:00`).toISOString();
  const end = new Date(`${d}T${t}:00+09:00`).getTime() + 60 * 1000;
  return { date: d, from: f, to: t, fromIso, toIso: new Date(end).toISOString() };
}
