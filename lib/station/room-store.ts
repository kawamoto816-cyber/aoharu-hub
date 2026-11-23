import { getSupabaseAdmin } from "@/lib/aoharu-entitlements/supabase/client";
import { GRADES, STREAK_KING, type Grade } from "@/lib/station/room";

// アオハルーム（無料の自習室）の、みんなで共有する部分の保存と集計
// （Supabase: station_room_cycles / station_room_presence / station_members。定義は docs/station-room.sql）。
//   ・いま部屋にいる人：集中しているあいだ、画面が1分ごとに知らせる。2分半たっても知らせが無ければ「いない」
//   ・ランキングと称号：集中のサイクルの記録を、日本時間の週（月曜はじまり）で足す
// ほかの人に見せるのは、ニックネーム・学年・ポイントなどの数字だけ。やることの文やひとことは受け取らない。
// テーブルがまだ無いなど読み書きできないときは ready:false を返し、画面はこの端末だけの表示で動き続ける。

const MIN = 60_000;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;
const JST = 9 * HOUR;
/** 知らせが途切れてから「いない」とみなすまで */
const PRESENT_MS = 150_000;
const MAX_ROWS = 100;

export interface LiveRow {
  nick: string;
  grade: Grade;
  week: number;
  today: number;
  math: number;
  early: number;
  streak: number;
  focusMin: number;
  me: boolean;
}

export interface LiveRoom {
  signedIn: boolean;
  /** 保存先が使えるか（false なら、画面はこの端末だけの表示にする） */
  ready: boolean;
  member: { nick: string; grade: string } | null;
  /** いま集中している人 */
  present: { nick: string; mode: number; me: boolean }[];
  /** 今週、記録のある人（上位と自分） */
  rows: LiveRow[];
}

const jstDay = (ms: number) => new Date(ms + JST).toISOString().slice(0, 10);
const jstHour = (ms: number) => new Date(ms + JST).getUTCHours();
/** その時刻をふくむ週の、月曜0時（日本時間）のミリ秒 */
export function weekStartMs(ms: number): number {
  const d = new Date(ms + JST);
  const dow = (d.getUTCDay() + 6) % 7;
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) - dow * DAY - JST;
}
const isNight = (ms: number) => jstHour(ms) >= 23 || jstHour(ms) < 5;
const isEarly = (ms: number) => jstHour(ms) >= 5 && jstHour(ms) < 8;

// ---------- ニックネームと学年 ----------

/** ほかの人に見えるニックネームの検証。連絡先に使えそうなもの（長い数字・@・URL）は通さない */
export function cleanNick(v: unknown): { ok: true; nick: string } | { ok: false; error: string } {
  if (typeof v !== "string") return { ok: false, error: "ニックネームを入れてください。" };
  const nick = v
    .replace(/[\u0000-\u001f\u007f\u2028\u2029]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (nick.length < 1 || nick.length > 12) return { ok: false, error: "ニックネームは1〜12字で入れてください。" };
  if (nick === "あなた") return { ok: false, error: "「あなた」のままでは座れません。ニックネームを決めてください。" };
  if (/[@＠]|https?:|www\.|\.com|\.jp|[0-9０-９]{4,}/i.test(nick)) return { ok: false, error: "連絡先に見える文字（@・URL・4けた以上の数字）は使えません。" };
  return { ok: true, nick };
}

export async function getRoomMember(userId: string): Promise<{ nick: string; grade: string } | null> {
  try {
    const { data, error } = await getSupabaseAdmin().from("station_members").select("nick,grade").eq("user_id", userId).maybeSingle();
    if (error || !data || !data.nick) return null;
    return { nick: data.nick as string, grade: (data.grade as string) ?? "" };
  } catch {
    return null;
  }
}

export async function saveRoomProfile(userId: string, nick: string, grade: string): Promise<boolean> {
  try {
    const { error } = await getSupabaseAdmin()
      .from("station_members")
      .upsert({ user_id: userId, nick, grade, updated_at: new Date().toISOString() }, { onConflict: "user_id" });
    return !error;
  } catch {
    return false;
  }
}

// ---------- いま部屋にいる ----------

export async function beat(userId: string, on: boolean, mode: number): Promise<boolean> {
  try {
    const db = getSupabaseAdmin();
    if (!on) {
      const { error } = await db.from("station_room_presence").delete().eq("user_id", userId);
      return !error;
    }
    const now = new Date().toISOString();
    // since（座った時刻）は、はじめて座ったときだけ入れる
    const { data } = await db.from("station_room_presence").select("seen_at").eq("user_id", userId).maybeSingle();
    const fresh = !data || Date.now() - Date.parse(data.seen_at as string) > PRESENT_MS;
    const { error } = fresh
      ? await db.from("station_room_presence").upsert({ user_id: userId, mode, since: now, seen_at: now }, { onConflict: "user_id" })
      : await db.from("station_room_presence").update({ mode, seen_at: now }).eq("user_id", userId);
    return !error;
  } catch {
    return false;
  }
}

// ---------- 集中のサイクルの記録 ----------

export interface CycleInput {
  id: string;
  atMs: number;
  mode: 25 | 50;
  focusSec: number;
  completed: boolean;
  points: number;
  solved: number;
  math: number;
}

const int = (v: unknown, max: number) => (typeof v === "number" && Number.isFinite(v) ? Math.min(max, Math.max(0, Math.floor(v))) : 0);

/** 画面から届いたサイクルの検証。古すぎる・先すぎる時刻、ありえない大きさの数は受け取らない */
export function cleanCycle(input: Record<string, unknown>, nowMs: number): CycleInput | null {
  const id = typeof input.id === "string" && /^[a-z0-9]{6,24}$/.test(input.id) ? input.id : "";
  const atMs = typeof input.at === "string" ? Date.parse(input.at) : NaN;
  const mode = input.mode === 50 ? 50 : input.mode === 25 ? 25 : 0;
  if (!id || !Number.isFinite(atMs) || !mode) return null;
  // 始めた時刻は、いまから8日前〜5分先まで（今週と先週のぶんの送り直しは受け取る）
  if (atMs > nowMs + 5 * MIN || atMs < nowMs - 8 * DAY) return null;
  const focusSec = int(input.focusSec, mode * 60 + 60);
  const completed = input.completed === true && focusSec >= mode * 60 - 30;
  const solved = int(input.solved, 300);
  // 1サイクルのポイントの上限：解いた数×3（1問1点＋正解2点）＋単元模試10点×10回＋完走5点
  const points = int(input.points, solved * 3 + 105);
  return { id, atMs, mode, focusSec, completed, points, solved, math: int(input.math, solved) };
}

export async function saveCycle(userId: string, c: CycleInput): Promise<boolean> {
  try {
    const { error } = await getSupabaseAdmin()
      .from("station_room_cycles")
      .upsert(
        { user_id: userId, id: c.id, at: new Date(c.atMs).toISOString(), mode: c.mode, focus_sec: c.focusSec, completed: c.completed, points: c.points, solved: c.solved, math: c.math },
        { onConflict: "user_id,id", ignoreDuplicates: true },
      );
    return !error;
  } catch {
    return false;
  }
}

// ---------- 部屋のいま（座席・ランキング） ----------

interface CycleRow {
  user_id: string;
  at: string;
  focus_sec: number;
  completed: boolean;
  points: number;
  math: number;
}

/** サイクルの記録から、1人ぶんの今週の数字を作る（23時〜5時に始めたぶんはポイント・称号に数えない） */
export function rowOf(cycles: { atMs: number; focusSec: number; completed: boolean; points: number; math: number }[], nowMs: number) {
  const wk = weekStartMs(nowMs);
  const today = jstDay(nowMs);
  const r = { week: 0, today: 0, math: 0, early: 0, focusMin: 0 };
  let focusSec = 0;
  for (const c of cycles) {
    if (c.atMs < wk) continue;
    focusSec += c.focusSec;
    if (isNight(c.atMs)) continue;
    r.week += c.points;
    if (jstDay(c.atMs) === today) r.today += c.points;
    r.math += c.math;
    if (c.completed && isEarly(c.atMs)) r.early++;
  }
  r.focusMin = Math.round(focusSec / 60);
  return r;
}

/** 完走したサイクルのある日が、今日（まだ無ければ昨日）から何日続いているか */
export function streakFrom(days: Set<string>, nowMs: number): number {
  let ms = nowMs;
  if (!days.has(jstDay(ms))) ms -= DAY;
  let n = 0;
  while (days.has(jstDay(ms))) {
    n++;
    ms -= DAY;
  }
  return n;
}

export async function loadRoom(userId: string | null, nowMs = Date.now()): Promise<LiveRoom> {
  const empty: LiveRoom = { signedIn: !!userId, ready: false, member: null, present: [], rows: [] };
  try {
    const db = getSupabaseAdmin();
    const wk = weekStartMs(nowMs);
    const [pres, cyc] = await Promise.all([
      db.from("station_room_presence").select("user_id,mode,since").gte("seen_at", new Date(nowMs - PRESENT_MS).toISOString()).order("since", { ascending: true }).limit(200),
      db.from("station_room_cycles").select("user_id,at,focus_sec,completed,points,math").gte("at", new Date(wk).toISOString()).limit(20000),
    ]);
    if (pres.error || cyc.error) return empty;
    const presence = (pres.data ?? []) as { user_id: string; mode: number }[];
    const cycles = (cyc.data ?? []) as CycleRow[];

    const byUser = new Map<string, CycleRow[]>();
    for (const c of cycles) {
      const list = byUser.get(c.user_id);
      if (list) list.push(c);
      else byUser.set(c.user_id, [c]);
    }
    const ids = [...new Set([...byUser.keys(), ...presence.map((p) => p.user_id), ...(userId ? [userId] : [])])];
    if (!ids.length) return { ...empty, ready: true };

    // ニックネームと学年、続けた日数のもと（完走した日。継続王の日数＋少しぶん）
    const [mem, done] = await Promise.all([
      db.from("station_members").select("user_id,nick,grade").in("user_id", ids),
      db.from("station_room_cycles").select("user_id,at").eq("completed", true).gte("at", new Date(nowMs - (STREAK_KING + 5) * DAY).toISOString()).in("user_id", ids).limit(20000),
    ]);
    if (mem.error) return empty;
    const members = new Map<string, { nick: string; grade: string }>();
    for (const m of (mem.data ?? []) as { user_id: string; nick: string; grade: string }[]) if (m.nick) members.set(m.user_id, { nick: m.nick, grade: m.grade ?? "" });
    const doneDays = new Map<string, Set<string>>();
    for (const d of (done.data ?? []) as { user_id: string; at: string }[]) {
      const set = doneDays.get(d.user_id) ?? new Set<string>();
      set.add(jstDay(Date.parse(d.at)));
      doneDays.set(d.user_id, set);
    }

    const rows: LiveRow[] = [];
    for (const [uid, list] of byUser) {
      const m = members.get(uid);
      if (!m) continue;
      const r = rowOf(
        list.map((c) => ({ atMs: Date.parse(c.at), focusSec: c.focus_sec, completed: c.completed, points: c.points, math: c.math })),
        nowMs,
      );
      rows.push({
        nick: m.nick,
        grade: (GRADES as readonly string[]).includes(m.grade) ? (m.grade as Grade) : "中1",
        ...r,
        streak: streakFrom(doneDays.get(uid) ?? new Set(), nowMs),
        me: uid === userId,
      });
    }
    rows.sort((a, b) => b.week - a.week);
    const top = rows.slice(0, MAX_ROWS);
    const mine = rows.find((r) => r.me);
    if (mine && !top.includes(mine)) top.push(mine);

    return {
      signedIn: !!userId,
      ready: true,
      member: userId ? (members.get(userId) ?? null) : null,
      present: presence.flatMap((p) => {
        const m = members.get(p.user_id);
        return m ? [{ nick: m.nick, mode: p.mode, me: p.user_id === userId }] : [];
      }),
      rows: top,
    };
  } catch {
    return empty;
  }
}

// ---------- 社内（ニックネームの見回り） ----------

export interface RoomAdminRow {
  user_id: string;
  nick: string;
  grade: string;
  week: number;
  cycles: number;
  present: boolean;
}

/** 今週、部屋を使った人の一覧（社内用。ニックネームの見回りに使う） */
export async function listRoomUsers(nowMs = Date.now()): Promise<RoomAdminRow[] | null> {
  try {
    const db = getSupabaseAdmin();
    const [pres, cyc] = await Promise.all([
      db.from("station_room_presence").select("user_id").gte("seen_at", new Date(nowMs - PRESENT_MS).toISOString()).limit(500),
      db.from("station_room_cycles").select("user_id,at,points").gte("at", new Date(weekStartMs(nowMs)).toISOString()).limit(20000),
    ]);
    if (pres.error || cyc.error) return null;
    const here = new Set(((pres.data ?? []) as { user_id: string }[]).map((p) => p.user_id));
    const agg = new Map<string, { week: number; cycles: number }>();
    for (const c of (cyc.data ?? []) as { user_id: string; at: string; points: number }[]) {
      const a = agg.get(c.user_id) ?? { week: 0, cycles: 0 };
      a.cycles++;
      if (!isNight(Date.parse(c.at))) a.week += c.points;
      agg.set(c.user_id, a);
    }
    const ids = [...new Set([...agg.keys(), ...here])];
    if (!ids.length) return [];
    const mem = await db.from("station_members").select("user_id,nick,grade").in("user_id", ids);
    if (mem.error) return null;
    return ((mem.data ?? []) as { user_id: string; nick: string; grade: string }[])
      .map((m) => ({ user_id: m.user_id, nick: m.nick, grade: m.grade ?? "", week: agg.get(m.user_id)?.week ?? 0, cycles: agg.get(m.user_id)?.cycles ?? 0, present: here.has(m.user_id) }))
      .sort((a, b) => b.week - a.week);
  } catch {
    return null;
  }
}

/** ニックネームを消す（その人は部屋とランキングに出なくなり、次に開いたとき決め直すことになる）。席も空ける */
export async function clearNick(userId: string): Promise<boolean> {
  try {
    const db = getSupabaseAdmin();
    const { error } = await db.from("station_members").update({ nick: "", updated_at: new Date().toISOString() }).eq("user_id", userId);
    await db.from("station_room_presence").delete().eq("user_id", userId);
    return !error;
  } catch {
    return false;
  }
}
