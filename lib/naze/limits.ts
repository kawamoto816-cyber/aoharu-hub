import "server-only";
import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { APP_KEYS, getCurrentUserId, getEntitlement } from "@/lib/aoharu-entitlements";
import { getSupabaseAdmin } from "@/lib/aoharu-entitlements/supabase/client";
import { MAX_EXCHANGES } from "./index";

// なぜなぜ先生の回数（2026-11-04 代表承認）。数えるのは「会話を1つ始めた」とき（最初の「ここがわからない」を送ったとき）だけ。
//
//   登録なし   1日5回（IPのハッシュ。lib/unizeb/server.ts の guest と同じく、同じインスタンスの中だけの数え方）
//   無料登録   1日10回
//   Pro・Max   1日30回
//
// 登録ずみは usage_log（app_key "naze"・action "start"、metadata は単元idだけ）を数える。数えられないとき（Supabase 不通）は通す。
// 2回目からのやりとりは、始めたときに渡す札（session）で同じ会話だとたしかめる（札1枚で生徒の発言 MAX_EXCHANGES 回まで）。
// 費用の安全弁として、AIを呼ぶ回数の全体の上限（NAZE_DAILY_CALL_CAP、既定 3000/日）も付ける。

export const NAZE_APP = APP_KEYS.NAZE;
export type NazeTier = "guest" | "free" | "pro" | "max";
export const NAZE_LIMITS: Record<NazeTier, number> = { guest: 5, free: 10, pro: 30, max: 30 };

export interface NazeViewer {
  tier: NazeTier;
  userId: string | null;
  /** 登録なしの数える単位（IPのハッシュ） */
  guestKey: string | null;
}

function jstDay(): string {
  return new Date(Date.now() + 9 * 3600_000).toISOString().slice(0, 10);
}
const jstStartIso = () => new Date(`${jstDay()}T00:00:00+09:00`).toISOString();

export async function getNazeViewer(req: Request): Promise<NazeViewer> {
  let userId: string | null = null;
  try {
    userId = await getCurrentUserId();
  } catch {
    userId = null;
  }
  if (userId) {
    let tier: NazeTier = "free";
    try {
      const ent = await getEntitlement(userId);
      if (!ent.isBlocked && (ent.plan === "pro" || ent.plan === "max")) tier = ent.plan;
    } catch {
      tier = "free";
    }
    return { tier, userId, guestKey: null };
  }
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  return { tier: "guest", userId: null, guestKey: createHash("sha256").update(`naze:${ip}`).digest("hex").slice(0, 24) };
}

const guestStarts = new Map<string, { day: string; n: number }>();

async function usedToday(v: NazeViewer): Promise<number> {
  if (v.userId) {
    try {
      const { count, error } = await getSupabaseAdmin()
        .from("usage_log")
        .select("*", { count: "exact", head: true })
        .eq("user_id", v.userId)
        .eq("app_key", NAZE_APP)
        .eq("action", "start")
        .gte("created_at", jstStartIso());
      if (error) throw new Error(error.message);
      return count ?? 0;
    } catch (e) {
      console.warn("[naze] count skipped:", e instanceof Error ? e.message : e);
      return 0;
    }
  }
  const c = v.guestKey ? guestStarts.get(v.guestKey) : undefined;
  return c && c.day === jstDay() ? c.n : 0;
}

export async function nazeRemaining(v: NazeViewer): Promise<{ limit: number; remaining: number }> {
  const limit = NAZE_LIMITS[v.tier];
  return { limit, remaining: Math.max(0, limit - (await usedToday(v))) };
}

/** 会話を1つ始めてよいか。よければ数える */
export async function startConversation(v: NazeViewer, unit: string): Promise<{ allowed: boolean; limit: number; remaining: number }> {
  const { limit, remaining } = await nazeRemaining(v);
  if (remaining <= 0) return { allowed: false, limit, remaining: 0 };
  if (v.userId) {
    try {
      await getSupabaseAdmin().from("usage_log").insert({ user_id: v.userId, app_key: NAZE_APP, action: "start", metadata: { unit } });
    } catch {
      /* 記録の失敗で本体は止めない */
    }
  } else if (v.guestKey) {
    const day = jstDay();
    const c = guestStarts.get(v.guestKey);
    guestStarts.set(v.guestKey, { day, n: c && c.day === day ? c.n + 1 : 1 });
    if (guestStarts.size > 50_000) for (const [k, x] of guestStarts) if (x.day !== day) guestStarts.delete(k);
  }
  return { allowed: true, limit, remaining: remaining - 1 };
}

// ---------- 全体の上限（AIを呼ぶ回数） ----------
let global = { day: "", n: 0 };
export function takeGlobalCall(): boolean {
  const day = jstDay();
  if (global.day !== day) global = { day, n: 0 };
  if (global.n >= Number(process.env.NAZE_DAILY_CALL_CAP ?? "3000")) return false;
  global.n += 1;
  return true;
}

// ---------- 会話の札 ----------
const TOKEN_TTL = 2 * 3600_000;
const tokenUses = new Map<string, number>();

function secret(): string {
  return process.env.NAZE_SECRET ?? process.env.ANTHROPIC_API_KEY ?? "naze-dev";
}
function sign(body: string): string {
  return createHmac("sha256", secret()).update(body).digest("base64url");
}

/** 会話を始めたときに渡す札（単元・時刻・乱数に署名したもの。会話本文は入れない） */
export function issueSession(unit: string): string {
  const body = `${unit}.${Date.now().toString(36)}.${randomBytes(6).toString("base64url")}`;
  return `${body}.${sign(body)}`;
}

/** 札が正しく、この単元のもので、まだ使えるか。使えるなら1回分数える */
export function consumeSession(token: unknown, unit: string): boolean {
  if (typeof token !== "string" || token.length > 300) return false;
  const i = token.lastIndexOf(".");
  if (i < 0) return false;
  const body = token.slice(0, i);
  const sig = Buffer.from(token.slice(i + 1));
  const want = Buffer.from(sign(body));
  if (sig.length !== want.length || !timingSafeEqual(sig, want)) return false;
  const [u, t] = body.split(".");
  if (u !== unit) return false;
  const at = parseInt(t ?? "", 36);
  if (!Number.isFinite(at) || Date.now() - at > TOKEN_TTL) return false;
  const n = tokenUses.get(token) ?? 0;
  // 最初の1回は始めたときに使っているので、残り MAX_EXCHANGES - 1 回
  if (n >= MAX_EXCHANGES - 1) return false;
  tokenUses.set(token, n + 1);
  if (tokenUses.size > 50_000) tokenUses.clear();
  return true;
}
