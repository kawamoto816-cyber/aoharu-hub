import { getSupabaseAdmin } from "@/lib/aoharu-entitlements/supabase/client";
import type { CardStatus } from "./progress";

// 「まなぶ」の進み具合をアカウントに保存する (Supabase: learn_progress、定義は docs/learn-progress.sql)。
// テーブルがまだ無いなど読めないときは空として扱い、ブラウザ側の保存だけで動き続ける。

export type ProgressMap = Record<string, CardStatus>;

const RANK: Record<CardStatus, number> = { quiz: 1, done: 2 };

/** 2つの進み具合を合わせる。同じカードは進んでいる方 (done > quiz) を残す */
export function mergeProgress(a: ProgressMap, b: ProgressMap): ProgressMap {
  const out: ProgressMap = { ...a };
  for (const [id, st] of Object.entries(b)) {
    if (!out[id] || RANK[st] > RANK[out[id]]) out[id] = st;
  }
  return out;
}

export async function loadProgress(userId: string): Promise<ProgressMap | null> {
  try {
    const { data, error } = await getSupabaseAdmin().from("learn_progress").select("card_id,status").eq("user_id", userId).limit(1000);
    if (error) return null;
    const out: ProgressMap = {};
    for (const row of (data ?? []) as { card_id: string; status: CardStatus }[]) out[row.card_id] = row.status;
    return out;
  } catch {
    return null;
  }
}

/** 受け取った進み具合を保存し、合わせた結果を返す。保存できなければ null */
export async function saveProgress(userId: string, incoming: ProgressMap): Promise<ProgressMap | null> {
  const current = await loadProgress(userId);
  if (current === null) return null;
  const merged = mergeProgress(current, incoming);
  const changed = Object.entries(merged).filter(([id, st]) => current[id] !== st);
  if (changed.length === 0) return merged;
  const now = new Date().toISOString();
  const { error } = await getSupabaseAdmin()
    .from("learn_progress")
    .upsert(changed.map(([card_id, status]) => ({ user_id: userId, card_id, status, updated_at: now })), { onConflict: "user_id,card_id" });
  return error ? null : merged;
}
