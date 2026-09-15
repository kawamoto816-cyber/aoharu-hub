import { createHash } from "node:crypto";
import { getSupabaseAdmin } from "@/lib/aoharu-entitlements/supabase/client";

// SNS自動投稿の記録 (Supabase)。
//   social_posts : 投稿ログ。同じ本文の二重投稿を防ぐ (48時間以内の同一 channel+text_hash は拒否)。
//   app_settings : key/value。Threads の長期トークン (自動更新後の値) を保持する。
// テーブル定義は docs/social-posts.sql を参照。

export type SocialChannel = "x" | "threads" | "instagram";

export function textHash(text: string): string {
  return createHash("sha256").update(text.trim()).digest("hex");
}

export async function findRecentDuplicate(channel: SocialChannel, hash: string): Promise<{ external_id: string | null; created_at: string } | null> {
  const supabase = getSupabaseAdmin();
  const since = new Date(Date.now() - 48 * 3600 * 1000).toISOString();
  const { data, error } = await supabase
    .from("social_posts")
    .select("external_id,created_at")
    .eq("channel", channel)
    .eq("text_hash", hash)
    .eq("status", "posted")
    .gte("created_at", since)
    .limit(1);
  if (error) throw new Error(`social_posts select: ${error.message}`);
  return data?.[0] ?? null;
}

export async function recordPost(row: {
  channel: SocialChannel;
  text: string;
  status: "posted" | "failed";
  external_id?: string | null;
  error?: string | null;
  source?: string | null;
}): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("social_posts").insert({
    channel: row.channel,
    text: row.text,
    text_hash: textHash(row.text),
    status: row.status,
    external_id: row.external_id ?? null,
    error: row.error ?? null,
    source: row.source ?? null,
  });
  if (error) throw new Error(`social_posts insert: ${error.message}`);
}

export async function listRecentPosts(limit = 30) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("social_posts")
    .select("channel,status,external_id,error,source,created_at,text")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(`social_posts list: ${error.message}`);
  return data ?? [];
}

export async function getSetting(key: string): Promise<string | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("app_settings").select("value").eq("key", key).maybeSingle();
  if (error) throw new Error(`app_settings select: ${error.message}`);
  return data?.value ?? null;
}

export async function setSetting(key: string, value: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("app_settings")
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });
  if (error) throw new Error(`app_settings upsert: ${error.message}`);
}
