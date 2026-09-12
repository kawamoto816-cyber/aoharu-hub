import { getStripe } from "./client";
import { getPriceIdForPlan, type Plan } from "../config/plans";
import { getOrCreateSubscription } from "../supabase/subscriptions";

/**
 * Pro/Maxへのアップグレード用Checkoutセッションを作成する。
 * すでにStripe顧客がいればそれを使い回し、いなければStripe側に新規作成させる。
 *
 * 使用例 (Route Handler):
 *   const session = await createCheckoutSession({
 *     userId, plan: "pro",
 *     successUrl: `${origin}/billing/success`,
 *     cancelUrl: `${origin}/billing`,
 *   });
 *   return Response.json({ url: session.url });
 */
export async function createCheckoutSession(params: {
  userId: string;
  plan: Exclude<Plan, "free">;
  successUrl: string;
  cancelUrl: string;
  userEmail?: string;
}) {
  const stripe = getStripe();
  const priceId = getPriceIdForPlan(params.plan);
  const existing = await getOrCreateSubscription(params.userId);

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    // Webhookでこのユーザーに紐付けるための鍵 (checkout.session.completedで参照)
    client_reference_id: params.userId,
    customer: existing.stripe_customer_id ?? undefined,
    customer_email: existing.stripe_customer_id ? undefined : params.userEmail,
    metadata: { clerk_user_id: params.userId, plan: params.plan },
    subscription_data: {
      metadata: { clerk_user_id: params.userId, plan: params.plan },
    },
  });

  return session;
}

/**
 * 契約変更・解約用のカスタマーポータルセッションを作成する。
 * まだStripe顧客が存在しない(=一度も課金していない)ユーザーは呼び出し側でエラー処理すること。
 */
export async function createBillingPortalSession(params: {
  userId: string;
  returnUrl: string;
}) {
  const stripe = getStripe();
  const existing = await getOrCreateSubscription(params.userId);

  if (!existing.stripe_customer_id) {
    throw new Error("NO_STRIPE_CUSTOMER");
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: existing.stripe_customer_id,
    return_url: params.returnUrl,
  });

  return session;
}
