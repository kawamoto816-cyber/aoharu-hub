import { createHash } from "node:crypto";
import { getCurrentUserId, getEntitlement } from "@/lib/aoharu-entitlements";

// オシエルの回数の上限。上限の判断は checkOshieruLimit() 1つにまとめてある（あとで plans.ts につなぐ）。
//
//   登録なし   1日1回（IPをハッシュにして数える）
//   無料登録   月10回
//   Pro       1日10回
//   Max       1日20回
//
// 数えるのは「マスター判定まで完走した回」だけ（op: "complete"）。途中の会話のやりとりは数えない。
// そのかわり、乱用と費用を抑えるために、ハルの発言（op: "turn"）と採点しなおし（op: "rejudge"）にも別の上限を付ける。
//
// いまは同じインスタンスの中だけの簡易カウンタ（メモリ）。インスタンスをまたぐ分は全体の上限 (OSHIERU_DAILY_CALL_CAP) で抑える。
// TODO(plans): plans.ts に `oshieru` を足したら、resolveTier() を hasAccess("oshieru") での判断にかえ、
//              カウンタも利用ログ（logUsage。本文は送らず単元idだけ）にうつして、インスタンスをまたいで数える。

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
  /** 数える単位（登録なしは IP のハッシュ、登録ずみはユーザーid） */
  key: string;
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

type Counter = { period: string; n: number };
const sessions = new Map<string, Counter>();
const turns = new Map<string, Counter>();
const rejudges = new Map<string, Counter>();
let global: Counter = { period: "", n: 0 };

function read(map: Map<string, Counter>, key: string, period: string): number {
  const c = map.get(key);
  return c && c.period === period ? c.n : 0;
}
function bump(map: Map<string, Counter>, key: string, period: string) {
  const c = map.get(key);
  if (!c || c.period !== period) map.set(key, { period, n: 1 });
  else c.n += 1;
  // 古い日のカウンタがたまりすぎないように
  if (map.size > 50_000) for (const [k, v] of map) if (v.period !== period) map.delete(k);
}

export function hashIp(ip: string): string {
  return createHash("sha256").update(`oshieru:${ip}`).digest("hex").slice(0, 16);
}

/**
 * 契約プランを見て free / pro / max を返す（読めないとき・支払いが止まっているときは free）。
 * TODO(plans): plans.ts に `oshieru` を足したら、ent.hasAccess("oshieru") と FREE_TIER_POLICY で判断する形にする。
 */
async function resolveTier(userId: string): Promise<OshieruTier> {
  try {
    const ent = await getEntitlement(userId);
    if (ent.isBlocked) return "free";
    return ent.plan === "pro" || ent.plan === "max" ? ent.plan : "free";
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
  if (userId) return { tier: await resolveTier(userId), key: `u:${userId}` };
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  return { tier: "guest", key: `ip:${hashIp(ip)}` };
}

/**
 * 上限の判断はすべてここを通す。
 *   peek     … 残りの回数を見るだけ（数えない）
 *   turn     … ハルの発言を1回生成してよいか（完走の残りがあること＋発言の上限）。よければ数える
 *   complete … マスター判定まで完走した1回を数える（採点の前に呼ぶ）
 *   rejudge  … 採点しなおし（完走の回数には数えない）。よければ数える
 */
export function checkOshieruLimit(viewer: Viewer, op: LimitOp): LimitDecision {
  const { n: limit, per } = OSHIERU_LIMITS[viewer.tier];
  const pk = periodKey(per);
  const used = read(sessions, viewer.key, pk);
  const remaining = Math.max(0, limit - used);
  const base = { tier: viewer.tier, limit, per, remaining };
  if (op === "peek") return { ...base, allowed: remaining > 0 };

  // 全体の上限（費用の安全弁）。AIを呼ぶ操作だけ数える
  const day = jstDate();
  if (global.period !== day) global = { period: day, n: 0 };
  const cap = Number(process.env.OSHIERU_DAILY_CALL_CAP ?? "3000");
  if (global.n >= cap) return { ...base, allowed: false, reason: "limit_daily" };

  if (op === "turn") {
    if (remaining <= 0) return { ...base, allowed: false, reason: "limit_sessions" };
    const tUsed = read(turns, viewer.key, day);
    // 1日に許すハルの発言：完走1回分×（1日の回数。月ぎめの無料登録は1日3回分）
    if (tUsed >= TURNS_PER_SESSION * (per === "day" ? limit : 3)) return { ...base, allowed: false, reason: "limit_turns" };
    bump(turns, viewer.key, day);
    global.n += 1;
    return { ...base, allowed: true };
  }
  if (op === "complete") {
    if (remaining <= 0) return { ...base, allowed: false, reason: "limit_sessions" };
    bump(sessions, viewer.key, pk);
    global.n += 1;
    return { ...base, remaining: remaining - 1, allowed: true };
  }
  // rejudge
  if (read(rejudges, viewer.key, day) >= REJUDGE_PER_DAY) return { ...base, allowed: false, reason: "limit_rejudge" };
  bump(rejudges, viewer.key, day);
  global.n += 1;
  return { ...base, allowed: true };
}
