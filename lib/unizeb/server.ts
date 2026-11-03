import "server-only";
import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";
import { APP_KEYS, getCurrentUserId, getEntitlement, getFreeAccessApps, getUserEmail } from "@/lib/aoharu-entitlements";
import { getSupabaseAdmin } from "@/lib/aoharu-entitlements/supabase/client";
import { checkAiBudget, recordAiCost } from "@/lib/ai-budget";
import { gradeLimit, type UzPlan } from "./access";

// ユニゼブ（ゼロワンOSユース版）のサーバー側の共通部分（本体チャットが組み込み。2026-11-04）。
//   - serverPlan()：ログインとプラン（本体の entitlements）から UzPlan を決める
//   - countGrades / logGrade：AI採点の回数（usage_log の app_key "unizeb"・action "grade"）
//   - callClaude：Claude API を呼び、運営の月のAI予算（lib/ai-budget）に記録する
//   - 保存の暗号化（UNIZEB_STATE_KEY）

export const UZ_APP = APP_KEYS.UNIZEB;

export interface UzViewer {
  plan: UzPlan;
  userId: string | null;
}

export async function serverViewer(): Promise<UzViewer> {
  // ここは try で包まない（ページの静的生成のときの「動的な処理」の合図を飲みこむと、全員に guest の画面が配られてしまう）
  const userId = await getCurrentUserId();
  if (!userId) return { plan: "guest", userId: null };
  try {
    const ent = await getEntitlement(userId);
    if (!ent.isBlocked && (ent.plan === "pro" || ent.plan === "max")) return { plan: ent.plan, userId };
    // 組織向け無料アクセス（free_access_grants に unizeb があれば Max と同じ）
    const free = await getFreeAccessApps(await getUserEmail(userId));
    if (free.has(UZ_APP)) return { plan: "max", userId };
    return { plan: "free", userId };
  } catch (e) {
    console.warn("[unizeb] entitlement failed:", e instanceof Error ? e.message : e);
    return { plan: "free", userId };
  }
}

export async function serverPlan(): Promise<UzPlan> {
  return (await serverViewer()).plan;
}

// ---------- AI採点の回数 ----------
function jstStartIso(unit: "day" | "month"): string {
  const now = new Date(Date.now() + 9 * 3600_000).toISOString();
  const d = unit === "day" ? now.slice(0, 10) : `${now.slice(0, 7)}-01`;
  return new Date(`${d}T00:00:00+09:00`).toISOString();
}

async function countSince(userId: string, action: string, sinceIso: string): Promise<number> {
  const { count, error } = await getSupabaseAdmin()
    .from("usage_log")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("app_key", UZ_APP)
    .eq("action", action)
    .gte("created_at", sinceIso);
  if (error) throw new Error(error.message);
  return count ?? 0;
}

/** 採点できるか（月・日の上限）。数えられないとき（Supabase 不通）は通す */
export async function checkGradeQuota(v: UzViewer): Promise<{ allowed: boolean; reason?: string }> {
  const lim = gradeLimit(v.plan);
  if (!v.userId || lim.month <= 0) return { allowed: false, reason: "guest" };
  try {
    if ((await countSince(v.userId, "grade", jstStartIso("month"))) >= lim.month)
      return { allowed: false, reason: `今月のAI採点の上限（${lim.month}回）に達しました。来月また使えます。` };
    if (lim.day && (await countSince(v.userId, "grade", jstStartIso("day"))) >= lim.day)
      return { allowed: false, reason: `今日のAI採点の上限（${lim.day}回）に達しました。明日また使えます。` };
  } catch (e) {
    console.warn("[unizeb] quota check skipped:", e instanceof Error ? e.message : e);
  }
  return { allowed: true };
}

/** 「AIに試しに頼む」枠：1人1日30回（登録なしは IP ごとに1日5回、同じインスタンスの中だけ） */
const AI_DAY = 30;
const GUEST_AI_DAY = 5;
const guestAi = new Map<string, { day: string; n: number }>();
export async function checkAiQuota(v: UzViewer, req: Request): Promise<boolean> {
  if (v.userId) {
    try {
      return (await countSince(v.userId, "ai", jstStartIso("day"))) < AI_DAY;
    } catch {
      return true;
    }
  }
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  const key = createHash("sha256").update(`uz:${ip}`).digest("hex").slice(0, 24);
  const day = jstStartIso("day");
  const c = guestAi.get(key);
  const n = c && c.day === day ? c.n : 0;
  if (n >= GUEST_AI_DAY) return false;
  guestAi.set(key, { day, n: n + 1 });
  return true;
}

export async function logUse(userId: string | null, action: "grade" | "ai", metadata: Record<string, unknown>) {
  if (!userId) return;
  try {
    await getSupabaseAdmin().from("usage_log").insert({ user_id: userId, app_key: UZ_APP, action, metadata });
  } catch {
    /* 記録の失敗で本体は止めない */
  }
}

// ---------- Claude ----------
/** 採点のモデル（校正したときの水準）。モデルを変えるときは、同じ回答例で校正し直す */
export const GRADE_MODEL = () => process.env.UNIZEB_GRADE_MODEL ?? "claude-opus-5-5";
/** 「AIに試しに頼む」枠のモデル */
export const AI_MODEL = () => process.env.UNIZEB_AI_MODEL ?? "claude-haiku-4-5";

export class UzError extends Error {
  constructor(public code: "not_configured" | "budget" | "api_error") {
    super(code);
  }
}

export async function callClaude(p: { model: string; prompt: string; system?: string; maxTokens: number; action: string; viewer: UzViewer }): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new UzError("not_configured");
  const b = await checkAiBudget(p.viewer.plan);
  if (!b.allowed) throw new UzError("budget");
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": apiKey, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({
      model: p.model,
      max_tokens: p.maxTokens,
      ...(p.system ? { system: p.system } : {}),
      messages: [{ role: "user", content: p.prompt }],
    }),
    signal: AbortSignal.timeout(55_000),
  });
  if (!res.ok) throw new UzError("api_error");
  const json = (await res.json()) as { content?: { type: string; text?: string }[]; usage?: Record<string, number> };
  void recordAiCost({ app: UZ_APP, action: p.action, model: p.model, usage: json.usage, userId: p.viewer.userId });
  return (json.content ?? []).map((c) => c.text ?? "").join("");
}

// ---------- 保存の暗号化 ----------
function stateKey(): Buffer | null {
  const k = process.env.UNIZEB_STATE_KEY;
  if (!k) return null;
  const buf = Buffer.from(k, "base64");
  return buf.length === 32 ? buf : createHash("sha256").update(k).digest();
}

export function sealState(json: string): string | null {
  const key = stateKey();
  if (!key) return null;
  const iv = randomBytes(12);
  const c = createCipheriv("aes-256-gcm", key, iv);
  const body = Buffer.concat([c.update(json, "utf8"), c.final()]);
  return [iv, c.getAuthTag(), body].map((b) => b.toString("base64")).join(".");
}

export function openState(sealed: string): string | null {
  const key = stateKey();
  if (!key) return null;
  try {
    const [iv, tag, body] = sealed.split(".").map((s) => Buffer.from(s, "base64"));
    const d = createDecipheriv("aes-256-gcm", key, iv);
    d.setAuthTag(tag);
    return Buffer.concat([d.update(body), d.final()]).toString("utf8");
  } catch {
    return null;
  }
}
