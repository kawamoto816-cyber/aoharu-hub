import { getSupabaseAdmin } from "./client";
import type { Plan, SubscriptionStatus } from "../config/plans";
import { SEASON_PASS, isExpiredSeasonPass } from "../config/season-pass";

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

  if (existing) {
    const row = existing as SubscriptionRow;
    // 期限の過ぎた受験シーズンパスは、読んだ時点で無料プランにもどす（毎日の定時処理より先に気づいた場合）
    if (isExpiredSeasonPass(row)) {
      await expireSeasonPassRow(row.user_id);
      return { ...row, plan: "free", status: "canceled", current_period_end: null, stripe_price_id: null, cancel_at_period_end: false };
    }
    return row;
  }

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

/**
 * 受験シーズンパス（買い切り）の支払いが済んだとき、Webhook から呼ぶ。
 * plan: max・期限つき（current_period_end）・サブスクリプションなし で入れる。
 */
export async function grantSeasonPass(params: {
  userId: string;
  /** 塾向けプランの招待コードで入った人は Stripe の顧客ではないので省略する（既存の値を消さない） */
  stripeCustomerId?: string | null;
  stripePriceId: string | null;
  endsAt?: string;
}): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("subscriptions").upsert(
    {
      user_id: params.userId,
      plan: "max",
      status: "active",
      ...(params.stripeCustomerId ? { stripe_customer_id: params.stripeCustomerId } : {}),
      stripe_subscription_id: null,
      stripe_price_id: params.stripePriceId ?? SEASON_PASS.metadataKind,
      current_period_end: new Date(params.endsAt ?? SEASON_PASS.endsAt).toISOString(),
      // 自動更新しない（期限で終わる）ことを、ほかのアプリの「プラン管理」の表示にも伝える
      cancel_at_period_end: true,
    },
    { onConflict: "user_id" }
  );
  if (error) throw new Error(`シーズンパスの付与に失敗: ${error.message}`);
}

async function expireSeasonPassRow(userId: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("subscriptions")
    .update({ plan: "free", status: "canceled", stripe_price_id: null, current_period_end: null, cancel_at_period_end: false })
    .eq("user_id", userId)
    .is("stripe_subscription_id", null);
  if (error) throw new Error(`シーズンパスの期限切れ処理に失敗: ${error.message}`);
}

/** 期限の過ぎた受験シーズンパスをまとめて無料プランにもどす（毎日の定時処理から呼ぶ）。もどした件数を返す */
export async function expireSeasonPasses(now = new Date()): Promise<number> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("subscriptions")
    .update({ plan: "free", status: "canceled", stripe_price_id: null, current_period_end: null, cancel_at_period_end: false })
    .is("stripe_subscription_id", null)
    .neq("plan", "free")
    .not("current_period_end", "is", null)
    .lt("current_period_end", now.toISOString())
    .select("user_id");
  if (error) throw new Error(`シーズンパスの期限切れ処理に失敗: ${error.message}`);
  return data?.length ?? 0;
}
