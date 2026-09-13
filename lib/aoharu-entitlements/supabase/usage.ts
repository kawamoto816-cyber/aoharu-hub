import { getSupabaseAdmin } from "./client";
import type { AppKey } from "../config/plans";

/** 利用イベントを1件記録する (追記専用) */
export async function logUsage(params: {
  userId: string;
  appKey: AppKey | string;
  action: string;
  metadata?: Record<string, unknown>;
}): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("usage_log").insert({
    user_id: params.userId,
    app_key: params.appKey,
    action: params.action,
    metadata: params.metadata ?? null,
  });

  if (error) {
    // 利用ログの失敗でアプリ本体の処理を止めたくないので投げずに警告のみ
    console.error("[aoharu-entitlements] logUsage failed:", error.message);
  }
}

/**
 * 当月(UTC基準)のユーザー×アプリの利用回数を数える (無料枠の回数制限などに使用)。
 * actions を渡すと、そのアクション名の利用だけを数える
 * (無料枠の「完了単位」と「補助アクション」を分けて数えるために使う)。
 */
export async function getMonthlyUsageCount(
  userId: string,
  appKey: AppKey | string,
  actions?: readonly string[]
): Promise<number> {
  const supabase = getSupabaseAdmin();
  const firstOfMonth = new Date();
  firstOfMonth.setUTCDate(1);
  firstOfMonth.setUTCHours(0, 0, 0, 0);

  let query = supabase
    .from("usage_log")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("app_key", appKey)
    .gte("created_at", firstOfMonth.toISOString());

  if (actions && actions.length > 0) {
    query = query.in("action", [...actions]);
  }

  const { count, error } = await query;

  if (error) {
    throw new Error(`利用回数の取得に失敗: ${error.message}`);
  }
  return count ?? 0;
}
