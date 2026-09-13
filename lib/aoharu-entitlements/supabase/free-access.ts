import { getSupabaseAdmin } from "./client";
import type { AppKey } from "../config/plans";

interface FreeAccessGrantRow {
  apps: string[];
}

/**
 * 組織向け無料アクセス枠。
 *
 * 弊社が直接管理する生徒などに対して、Stripe課金や月間お試し枠を経由せず
 * 特定アプリを無制限に無料で使わせるための仕組み。
 * Supabaseの free_access_grants テーブルに、メールアドレス(完全一致)または
 * ドメイン("@example.jp"の形式)と、対象アプリの配列を登録しておく。
 *
 * 失敗しても本体機能を止めないよう、エラー時は空集合を返す
 * (=通常のプラン/お試し枠判定にフォールバックする)。
 */
export async function getFreeAccessApps(
  email: string | null
): Promise<Set<AppKey | string>> {
  if (!email) return new Set();

  const normalizedEmail = email.trim().toLowerCase();
  const domain = normalizedEmail.split("@")[1];
  const patterns = [normalizedEmail];
  if (domain) patterns.push(`@${domain}`);

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("free_access_grants")
      .select("apps")
      .in("email_pattern", patterns);

    if (error) {
      console.error("[aoharu-entitlements] getFreeAccessApps failed:", error.message);
      return new Set();
    }

    const apps = new Set<AppKey | string>();
    for (const row of (data ?? []) as FreeAccessGrantRow[]) {
      for (const app of row.apps ?? []) {
        apps.add(app);
      }
    }
    return apps;
  } catch (err) {
    console.error("[aoharu-entitlements] getFreeAccessApps failed:", err);
    return new Set();
  }
}
