import "server-only";
import { createHash } from "node:crypto";
import { APP_KEYS, getCurrentUserId, getEntitlement } from "@/lib/aoharu-entitlements";
import { getSupabaseAdmin } from "@/lib/aoharu-entitlements/supabase/client";

// オシエルの回数の上限（代表承認：Pro 1日10回・Max 1日20回）。上限の判断は checkOshieruLimit() 1つにまとめてある。
//
//   登録なし   1日1回（IPをハッシュにして数える。同じインスタンスの中だけの数え方）
//   無料登録   月10回
//   Pro       1日10回
//   Max       1日20回
//
// tier は entitlements で決める：APP_KEYS.OSHIERU が使えるプラン（plans.ts の PLAN_APPS。Pro・Max）ならそのプラン、
// 使えない（無料・支払いが止まっている・読めない）なら free。
// 数えるのは「マスター判定まで完走した回」だけ（op: "complete"）。途中の会話のやりとりは数えない。
// そのかわり、乱用と費用を抑えるために、ハルの発言（op: "turn"）と採点しなおし（op: "rejudge"）にも別の上限を付ける。
// 登録ずみは usage_log（app_key "oshieru"、action "complete"・"turn"・"rejudge"、metadata は単元idだけ）を数えるので、インスタンスをまたいで数えられる。
// 数えられないとき（Supabase 不通）は通す（なぜなぜ先生・声で説明と同じ）。
// 費用の安全弁として、AIを呼ぶ回数の全体の上限（OSHIERU_DAILY_CALL_CAP、既定 3000/日。インスタンスごと）も付ける。

export const OSHIERU_APP = APP_KEYS.OSHIERU;
export type OshieruTier = "guest" | "free" | "pro" | "max";
export type LimitPeriod = "day" | "month";
export type LimitOp = "peek" | "turn" | "complete" | "rejudge";

export const OSHIERU_LIMITS: Record<OshieruTier, { n: number; per: LimitPeriod }> = {
  guest: { n: 1, per: "day" },
  free: { n: 10, per: "month" },
  pro: { n: 10, per: "day" },
  max: { n: 20, per: "day" },
};

/** 1回の会話でハルが話す上限（台本と同じ。6〜8回） */
export const MAX_HARU_TURNS = 8;
/** 完走1回分あたりに許すハルの発言の数（途中でやめる回もあるので多めに） */
const TURNS_PER_SESSION = MAX_HARU_TURNS * 4;
const REJUDGE_PER_DAY = 5;

export interface Viewer {
  tier: OshieruTier;
  /** 登録ずみのユーザーid（usage_log で数える） */
  userId: string | null;
  /** 登録なしの数える単位（IP のハッシュ） */
  guestKey: string | null;
}

export interface LimitDecision {
  allowed: boolean;
  tier: OshieruTier;
  limit: number;
  per: LimitPeriod;
  /** 完走できる残りの回数 */
  remaining: number;
  reason?: "limit_sessions" | "limit_turns" | "limit_rejudge" | "limit_daily";
}

function jstDate(): string {
  return new Date(Date.now() + 9 * 3600_000).toISOString().slice(0, 10);
}
const periodKey = (per: LimitPeriod) => (per === "day" ? jstDate() : jstDate().slice(0, 7));
/** その期間（JSTの今日・今月）の始まり */
const periodStartIso = (per: LimitPeriod) => new Date(`${per === "day" ? jstDate() : `${jstDate().slice(0, 7)}-01`}T00:00:00+09:00`).toISOString();

export function hashIp(ip: string): string {
  return createHash("sha256").update(`oshieru:${ip}`).digest("hex").slice(0, 16);
}

/** 契約を見て free / pro / max を返す（APP_KEYS.OSHIERU が使えないとき・読めないときは free） */
async function resolveTier(userId: string): Promise<OshieruTier> {
  try {
    const ent = await getEntitlement(userId);
    if (!ent.hasAccess(OSHIERU_APP)) return "free";
    return ent.plan === "max" ? "max" : "pro";
  } catch {
    return "free";
  }
}

export async function getViewer(req: Request): Promise<Viewer> {
  let userId: string | null = null;
  try {
    userId = await getCurrentUserId();
  } catch {
    userId = null;
  }
  if (userId) return { tier: await resolveTier(userId), userId, guestKey: null };
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  return { tier: "guest", userId: null, guestKey: `ip:${hashIp(ip)}` };
}

// ---------- 数え方：登録ずみは usage_log、登録なしはメモリ ----------
type Action = "complete" | "turn" | "rejudge";
type Counter = { period: string; n: number };
const guest: Record<Action, Map<string, Counter>> = { complete: new Map(), turn: new Map(), rejudge: new Map() };

async function used(v: Viewer, action: Action, per: LimitPeriod): Promise<number> {
  if (v.userId) {
    try {
      const { count, error } = await getSupabaseAdmin()
        .from("usage_log")
        .select("*", { count: "exact", head: true })
        .eq("user_id", v.userId)
        .eq("app_key", OSHIERU_APP)
        .eq("action", action)
        .gte("created_at", periodStartIso(per));
      if (error) throw new Error(error.message);
      return count ?? 0;
    } catch (e) {
      console.warn("[oshieru] count skipped:", e instanceof Error ? e.message : e);
      return 0;
    }
  }
  const c = v.guestKey ? guest[action].get(v.guestKey) : undefined;
  return c && c.period === periodKey(per) ? c.n : 0;
}

async function bump(v: Viewer, action: Action, per: LimitPeriod, unit: string): Promise<void> {
  if (v.userId) {
    try {
      // 記録するのは単元idだけ（会話本文は送らない）
      await getSupabaseAdmin().from("usage_log").insert({ user_id: v.userId, app_key: OSHIERU_APP, action, metadata: { unit } });
    } catch {
      /* 記録の失敗で本体は止めない */
    }
    return;
  }
  if (!v.guestKey) return;
  const map = guest[action];
  const period = periodKey(per);
  const c = map.get(v.guestKey);
  if (!c || c.period !== period) map.set(v.guestKey, { period, n: 1 });
  else c.n += 1;
  // 古い期間のカウンタがたまりすぎないように
  if (map.size > 50_000) for (const [k, x] of map) if (x.period !== period) map.delete(k);
}

// ---------- 全体の上限（AIを呼ぶ回数） ----------
let global: Counter = { period: "", n: 0 };
function takeGlobalCall(): boolean {
  const day = jstDate();
  if (global.period !== day) global = { period: day, n: 0 };
  if (global.n >= Number(process.env.OSHIERU_DAILY_CALL_CAP ?? "3000")) return false;
  global.n += 1;
  return true;
}

/**
 * 上限の判断はすべてここを通す。
 *   peek     … 残りの回数を見るだけ（数えない）
 *   turn     … ハルの発言を1回生成してよいか（完走の残りがあること＋発言の上限）。よければ数える
 *   complete … マスター判定まで完走した1回を数える（採点のあとに呼ぶ）
 *   rejudge  … 採点しなおし（完走の回数には数えない）。よければ数える
 */
export async function checkOshieruLimit(viewer: Viewer, op: LimitOp, unit = ""): Promise<LimitDecision> {
  const { n: limit, per } = OSHIERU_LIMITS[viewer.tier];
  const remaining = Math.max(0, limit - (await used(viewer, "complete", per)));
  const base = { tier: viewer.tier, limit, per, remaining };
  if (op === "peek") return { ...base, allowed: remaining > 0 };

  if (op === "turn") {
    if (remaining <= 0) return { ...base, allowed: false, reason: "limit_sessions" };
    // 1日に許すハルの発言：完走1回分×（1日の回数。月ぎめの無料登録は1日3回分）
    if ((await used(viewer, "turn", "day")) >= TURNS_PER_SESSION * (per === "day" ? limit : 3)) return { ...base, allowed: false, reason: "limit_turns" };
    if (!takeGlobalCall()) return { ...base, allowed: false, reason: "limit_daily" };
    await bump(viewer, "turn", "day", unit);
    return { ...base, allowed: true };
  }
  if (op === "complete") {
    if (remaining <= 0) return { ...base, allowed: false, reason: "limit_sessions" };
    await bump(viewer, "complete", per, unit);
    return { ...base, remaining: remaining - 1, allowed: true };
  }
  // rejudge
  if ((await used(viewer, "rejudge", "day")) >= REJUDGE_PER_DAY) return { ...base, allowed: false, reason: "limit_rejudge" };
  if (!takeGlobalCall()) return { ...base, allowed: false, reason: "limit_daily" };
  await bump(viewer, "rejudge", "day", unit);
  return { ...base, allowed: true };
}

/** 採点（AIを呼ぶ）の前に、全体の上限を1回分とる */
export const takeScoreCall = takeGlobalCall;
