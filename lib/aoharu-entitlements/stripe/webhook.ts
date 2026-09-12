import type Stripe from "stripe";
import { getStripe } from "./client";
import { planFromPriceId, type Plan } from "../config/plans";
import {
  findUserIdByStripeCustomerId,
  upsertSubscriptionFromStripe,
  downgradeToFree,
} from "../supabase/subscriptions";

/**
 * Stripe Webhookのイベントを受け取り、subscriptionsテーブルに同期する。
 *
 * Webhookエンドポイントは11アプリ全部に設定するのではなく、
 * ハブアプリ (app.bluespring.co.jp) 1箇所だけに設定すること。
 * DB(Supabase)は共有しているので、同期処理は1箇所で十分。
 *
 * Stripeダッシュボードで登録するイベント:
 *   - checkout.session.completed
 *   - customer.subscription.updated
 *   - customer.subscription.deleted
 */
export async function handleStripeWebhookEvent(event: Stripe.Event): Promise<void> {
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      await handleCheckoutCompleted(session);
      break;
    }
    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      await handleSubscriptionUpdated(subscription);
      break;
    }
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      await handleSubscriptionDeleted(subscription);
      break;
    }
    default:
      // 未対応イベントは無視 (ログだけ残す)
      console.log(`[aoharu-entitlements] Unhandled Stripe event: ${event.type}`);
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const userId = session.client_reference_id ?? session.metadata?.clerk_user_id;
  const customerId = session.customer as string | null;
  const subscriptionId = session.subscription as string | null;

  if (!userId || !customerId || !subscriptionId) {
    console.error(
      "[aoharu-entitlements] checkout.session.completed: userId/customerId/subscriptionIdが不足",
      { userId, customerId, subscriptionId }
    );
    return;
  }

  const stripe = getStripe();
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  await syncSubscriptionRow(userId, customerId, subscription);
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  const userId =
    subscription.metadata?.clerk_user_id ??
    (await findUserIdByStripeCustomerId(customerId));

  if (!userId) {
    console.error(
      "[aoharu-entitlements] customer.subscription.updated: userIdが特定できません",
      { customerId }
    );
    return;
  }

  await syncSubscriptionRow(userId, customerId, subscription);
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string;
  const userId =
    subscription.metadata?.clerk_user_id ??
    (await findUserIdByStripeCustomerId(customerId));

  if (!userId) {
    console.error(
      "[aoharu-entitlements] customer.subscription.deleted: userIdが特定できません",
      { customerId }
    );
    return;
  }

  await downgradeToFree(userId);
}

async function syncSubscriptionRow(
  userId: string,
  customerId: string,
  subscription: Stripe.Subscription
) {
  const priceId = subscription.items.data[0]?.price.id ?? null;
  const plan: Plan = priceId ? planFromPriceId(priceId) ?? "free" : "free";

  // 注意: client.tsで固定しているAPIバージョン ("2025-02-24.acacia", Acacia系列)
  // では current_period_end はまだ subscription 本体にある。
  // Stripeの "2025-03-31.basil" 以降 (Basil系列) にバージョンを上げると
  // この項目は subscription 本体から削除され、
  // subscription.items.data[0].current_period_end 側に移動するので、
  // 将来バージョンアップする際はここを書き換えること
  // (型定義上 subscription 本体からは無くなるため npm run typecheck で検知できる)。
  // 参考: https://docs.stripe.com/changelog/basil/2025-03-31/deprecate-subscription-current-period-start-and-end
  const currentPeriodEndUnix = (subscription as any).current_period_end as
    | number
    | undefined;
  const currentPeriodEnd = currentPeriodEndUnix
    ? new Date(currentPeriodEndUnix * 1000).toISOString()
    : null;

  await upsertSubscriptionFromStripe({
    userId,
    plan,
    status: subscription.status as any,
    stripeCustomerId: customerId,
    stripeSubscriptionId: subscription.id,
    stripePriceId: priceId,
    currentPeriodEnd,
    cancelAtPeriodEnd: subscription.cancel_at_period_end,
  });
}
