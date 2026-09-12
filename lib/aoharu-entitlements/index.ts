// アオハルOS 共通ライブラリ: エントリーポイント
// Clerk(認証) + Stripe(課金) + Supabase(DB) を繋いで権限判定・利用ログを提供する

export {
  PLANS,
  APP_KEYS,
  ALL_APP_KEYS,
  PLAN_APPS,
  appsForPlan,
  planHasAppAccess,
  getPriceIdForPlan,
  planFromPriceId,
  getFreeMonthlyQuota,
} from "./config/plans";
export type { Plan, SubscriptionStatus, AppKey } from "./config/plans";

export { getCurrentUserId, requireUserId } from "./auth/session";

export {
  getEntitlement,
  checkAppAccess,
  checkAccessAndLogUsage,
  getMonthlyUsageCount,
} from "./entitlements";
export type { Entitlement } from "./entitlements";

export { logUsage } from "./supabase/usage";
export {
  getOrCreateSubscription,
  upsertSubscriptionFromStripe,
  findUserIdByStripeCustomerId,
  downgradeToFree,
} from "./supabase/subscriptions";
export type { SubscriptionRow } from "./supabase/subscriptions";

export { getStripe } from "./stripe/client";
export { createCheckoutSession, createBillingPortalSession } from "./stripe/checkout";
export { handleStripeWebhookEvent } from "./stripe/webhook";
