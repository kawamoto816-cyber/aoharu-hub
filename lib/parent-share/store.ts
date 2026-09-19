import crypto from "node:crypto";
import { getSupabaseAdmin } from "@/lib/aoharu-entitlements/supabase/client";

// 保護者ビュー用の共有リンク。ログイン不要でURLだけを鍵にする方式なので、
// トークンは十分に長い乱数にし、テーブルには本人以外の個人情報を持たせない。
// 「作り直す」は同じ行を上書きするだけで、古いトークンはその瞬間に無効になる。

function newToken(): string {
  return crypto.randomBytes(24).toString("base64url");
}

/** 今の共有トークン。まだ作っていなければ null */
export async function getShareToken(userId: string): Promise<string | null> {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("parent_shares")
      .select("token")
      .eq("user_id", userId)
      .limit(1);
    if (error || !data?.length) return null;
    return (data[0] as { token: string }).token;
  } catch {
    return null;
  }
}

/** 新しいトークンを発行して置き換える（既存のリンクは使えなくなる） */
export async function regenerateShareToken(userId: string): Promise<string> {
  const token = newToken();
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("parent_shares")
    .upsert({ user_id: userId, token, created_at: new Date().toISOString() }, { onConflict: "user_id" });
  if (error) throw new Error(`parent_shares upsert: ${error.message}`);
  return token;
}

/** まだ無ければ作り、あればそれをそのまま返す */
export async function ensureShareToken(userId: string): Promise<string> {
  const existing = await getShareToken(userId);
  if (existing) return existing;
  return regenerateShareToken(userId);
}

/** トークンから持ち主のuserIdを引く。見つからなければ null（無効なリンク） */
export async function resolveShareToken(token: string): Promise<string | null> {
  if (!token) return null;
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("parent_shares")
      .select("user_id")
      .eq("token", token)
      .limit(1);
    if (error || !data?.length) return null;
    return (data[0] as { user_id: string }).user_id;
  } catch {
    return null;
  }
}
