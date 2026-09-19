import { getSupabaseAdmin } from "@/lib/aoharu-entitlements/supabase/client";
import type { AppKey } from "@bluespring/aoharu-entitlements";

// 保護者ビューの「各アプリの最終利用日」用。
// usage_log.metadata は現状どのアプリも空で送ってきていないため、点数は出せない。
// なので「点数（ないしは実施日）」の実施日側だけを、既にある利用ログから作る。

/** そのユーザーの、アプリごとの最終利用日時（ISO文字列）。使ったことが無いアプリは含まれない */
export async function lastActivityByApp(userId: string): Promise<Partial<Record<AppKey, string>>> {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("usage_log")
      .select("app_key,created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: true });
    if (error || !data) return {};

    const result: Partial<Record<AppKey, string>> = {};
    for (const row of data as { app_key: string; created_at: string }[]) {
      // 昇順で舐めているので、同じ app_key は後に来るほど新しい = 最後に残った値が最終利用日
      result[row.app_key as AppKey] = row.created_at;
    }
    return result;
  } catch {
    return {};
  }
}
