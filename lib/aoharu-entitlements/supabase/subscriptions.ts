import { getSupabaseAdmin } from "./client";
import type { Plan, SubscriptionStatus } from "../config/plans";

export interface SubscriptionRow {
  id: string;
  user_id: string;
  plan: Plan;
  status: SubscriptionStatus;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  stripe_price_id: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * user_idのsubscription行を取得する。まだ無ければ free/active の行を
 * 作成してから返す (初回アクセス時に自動でレコードができる)。
 */
export async function getOrCreateSubscription(
  userId: string
): Promise<SubscriptionRow> {
  const supabase = getSupabaseAdmin();

  const { data: existing, error: selectError } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (selectError) {
    throw new Error(`subscriptions取得に失敗: ${selectError.message}`);
  }

  if (existing) return existing as SubscriptionRow;

  const { data: created, error: insertError } = await supabase
    .from("subscriptions")
    .insert({ user_id: userId, plan: "free", status: "active" })
    .select("*")
    .single();

  if (insertError) {
    // 並行リクエストでの重複作成 (unique制約違反) は取り直せば良い
    const { data: retried } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();
    if (retried) return retried as SubscriptionRow;
    throw new Error(`subscriptions作成に失敗: ${insertError.message}`);
  }

  return created as SubscriptionRow;
}

/** Stripe Webhookから呼ぶ: プラン・契約状態をまとめて更新する (upsert) */
export async function upsertSubscriptionFromStripe(params: {
  userId: string;
  plan: Plan;
  status: SubscriptionStatus;
  stripeCustomerId: string;
  stripeSubscriptionId: string | null;
  stripePriceId: string | null;
  currentPeriodEnd: string | null; // ISO文字列
  cancelAtPeriodEnd: boolean;
}): Promise<void> {
  const supabase = getSupabaseAdmin();

  const { error } = await supabase.from("subscriptions").upsert(
    {
      user_id: params.userId,
      plan: params.plan,
      status: params.status,
      stripe_customer_id: params.stripeCustomerId,
      stripe_subscription_id: params.stripeSubscriptionId,
      stripe_price_id: params.stripePriceId,
      current_period_end: params.currentPeriodEnd,
      cancel_at_period_end: params.cancelAtPeriodEnd,
    },
    { onConflict: "user_id" }
  );

  if (error) {
    throw new Error(`subscriptions更新に失敗: ${error.message}`);
  }
}

/** stripe_customer_id からuser_idを逆引きする (subscription.updated/deleted等で使用) */
export async function findUserIdByStripeCustomerId(
  stripeCustomerId: string
): Promise<string | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("subscriptions")
    .select("user_id")
    .eq("stripe_customer_id", stripeCustomerId)
    .maybeSingle();

  if (error) {
    throw new Error(`user_id逆引きに失敗: ${error.message}`);
  }
  return data?.user_id ?? null;
}

/** 解約完了などでfreeプランに戻す */
export async function downgradeToFree(userId: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("subscriptions")
    .update({
      plan: "free",
      status: "canceled",
      stripe_subscription_id: null,
      stripe_price_id: null,
      current_period_end: null,
      cancel_at_period_end: false,
    })
    .eq("user_id", userId);

  if (error) {
    throw new Error(`freeプランへのダウングレードに失敗: ${error.message}`);
  }
}
