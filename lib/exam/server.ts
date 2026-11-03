import "server-only";
import { getCurrentUserId, getEntitlement } from "@/lib/aoharu-entitlements";
import { getSupabaseAdmin } from "@/lib/aoharu-entitlements/supabase/client";
import { EXAM_APP, EXAM_START_ACTION, examLimit, type ExamPlan, type ExamQuota } from "./access";

// 入試モード・共通テストモードのサーバー側 (プランの判定と、無料登録の月2回の数え方)。
// 回数の決まりは lib/exam/access.ts。

export interface ExamViewer {
  plan: ExamPlan;
  userId: string | null;
}

export async function examViewer(): Promise<ExamViewer> {
  // ここは try で包まない（「動的な処理」の合図を飲みこむと、全員に guest の扱いが配られてしまう。lib/unizeb/server.ts と同じ）
  const userId = await getCurrentUserId();
  if (!userId) return { plan: "guest", userId: null };
  try {
    const ent = await getEntitlement(userId);
    if (!ent.isBlocked && (ent.plan === "pro" || ent.plan === "max")) return { plan: ent.plan, userId };
    return { plan: "free", userId };
  } catch (e) {
    console.warn("[exam] entitlement failed:", e instanceof Error ? e.message : e);
    return { plan: "free", userId };
  }
}

/** 日本時間の今月1日 0時 (ISO) */
function jstMonthStartIso(): string {
  const ym = new Date(Date.now() + 9 * 3600_000).toISOString().slice(0, 7);
  return new Date(`${ym}-01T00:00:00+09:00`).toISOString();
}

/** 今月、始めた回数 (usage_log app_key "exam"・action "start") */
export async function countMonthlyStarts(userId: string): Promise<number> {
  const { count, error } = await getSupabaseAdmin()
    .from("usage_log")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("app_key", EXAM_APP)
    .eq("action", EXAM_START_ACTION)
    .gte("created_at", jstMonthStartIso());
  if (error) throw new Error(error.message);
  return count ?? 0;
}

export async function logStart(userId: string, metadata: Record<string, unknown>): Promise<void> {
  const { error } = await getSupabaseAdmin().from("usage_log").insert({ user_id: userId, app_key: EXAM_APP, action: EXAM_START_ACTION, metadata });
  if (error) throw new Error(error.message);
}

/** いまの残り回数。free で数えられないとき (Supabase 不通) は used・remaining を null にする (画面は止めない) */
export async function examQuota(v: ExamViewer): Promise<ExamQuota> {
  const limit = examLimit(v.plan);
  if (v.plan !== "free" || !v.userId || limit === null) return { plan: v.plan, limit, used: null, remaining: null };
  try {
    const used = await countMonthlyStarts(v.userId);
    return { plan: v.plan, limit, used, remaining: Math.max(0, limit - used) };
  } catch (e) {
    console.warn("[exam] count failed:", e instanceof Error ? e.message : e);
    return { plan: v.plan, limit, used: null, remaining: null };
  }
}
