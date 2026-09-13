import { getOrCreateSubscription, type SubscriptionRow } from "./supabase/subscriptions";
import { getMonthlyUsageCount, logUsage } from "./supabase/usage";
import { planHasAppAccess, getFreeMonthlyQuota, type AppKey, type Plan } from "./config/plans";
import { getUserEmail } from "./auth/session";
import { getFreeAccessApps } from "./supabase/free-access";

export interface Entitlement {
  plan: Plan;
  status: SubscriptionRow["status"];
  /** 有料プランだが支払いが滞っているなど、実質アクセスさせるべきでない状態か */
  isBlocked: boolean;
  cancelAtPeriodEnd: boolean;
  currentPeriodEnd: string | null;
  /**
   * プラン契約に基づく「無制限アクセス」があるかどうか。
   * Freeプランは常にfalse (Freeの無料枠チェックは checkAppAccess() 側で別途行う)。
   */
  hasAccess(appKey: AppKey | string): boolean;
}

const BLOCKING_STATUSES: SubscriptionRow["status"][] = [
  "past_due",
  "canceled",
  "incomplete_expired",
  "unpaid",
];

/**
 * ユーザーの現在の権限情報を取得する。
 * サーバーコンポーネント/Route Handler/Server Actionから呼ぶ。
 *
 * 例:
 *   const entitlement = await getEntitlement(userId);
 *   if (!entitlement.hasAccess(APP_KEYS.TENSAKUN)) redirect("/upgrade");
 */
export async function getEntitlement(userId: string): Promise<Entitlement> {
  const row = await getOrCreateSubscription(userId);
  const isBlocked = BLOCKING_STATUSES.includes(row.status) && row.plan !== "free";

  return {
    plan: row.plan,
    status: row.status,
    isBlocked,
    cancelAtPeriodEnd: row.cancel_at_period_end,
    currentPeriodEnd: row.current_period_end,
    hasAccess(appKey: AppKey | string) {
      if (isBlocked) return false;
      return planHasAppAccess(row.plan, appKey);
    },
  };
}

type AccessResult =
  | { allowed: true; remaining?: number }
  | { allowed: false; reason: "no_plan" | "payment_issue" | "quota_exceeded"; remaining?: number };

/**
 * アプリ側のガード用ヘルパー。アクセス不可なら理由を返す (呼び出し側でredirect等する)。
 * Next.jsのredirect()はここでは呼ばない (ライブラリをNext.js非依存に保つため)。
 *
 * Freeプランのユーザーは PLAN_APPS.free の対象外でも、
 * 月間 getFreeMonthlyQuota() 回までは「お試し」として生成系APIを呼べる
 * (アプリを問わず共通の回数枠)。超えると reason: "quota_exceeded"。
 *
 * 使用例 (Server Component / Route Handler):
 *   const result = await checkAppAccess(userId, APP_KEYS.TENSAKUN);
 *   if (!result.allowed) redirect(`/upgrade?reason=${result.reason}`);
 */
export async function checkAppAccess(
  userId: string,
  appKey: AppKey | string
): Promise<AccessResult> {
  const entitlement = await getEntitlement(userId);
  if (entitlement.isBlocked) return { allowed: false, reason: "payment_issue" };

  // Pro/Maxなど、契約プランでそのアプリの無制限アクセスが含まれる場合はそのまま許可
  if (entitlement.hasAccess(appKey)) return { allowed: true };

  // 組織向け無料アクセス枠 (Stripe課金なしで特定アプリを無制限に使える生徒など)。
  // 既存の有料プラン判定を通らなかった場合のみメールアドレスを引くので、
  // Pro/Max契約者への追加コストはゼロ。
  const freeAccessEmail = await getUserEmail(userId);
  const freeAccessApps = await getFreeAccessApps(freeAccessEmail);
  if (freeAccessApps.has(appKey)) return { allowed: true };

  // Freeプラン (または契約プランの対象外アプリ) は、月間お試し枠の消費状況で判定する
  if (entitlement.plan === "free") {
    const quota = getFreeMonthlyQuota();
    const used = await getMonthlyUsageCount(userId, appKey);
    if (used >= quota) {
      return { allowed: false, reason: "quota_exceeded", remaining: 0 };
    }
    return { allowed: true, remaining: quota - used - 1 };
  }

  return { allowed: false, reason: "no_plan" };
}

/** アクセス可否チェック + 利用ログ記録をまとめて行うユーティリティ */
export async function checkAccessAndLogUsage(params: {
  userId: string;
  appKey: AppKey | string;
  action: string;
  metadata?: Record<string, unknown>;
}): Promise<AccessResult> {
  const result = await checkAppAccess(params.userId, params.appKey);
  if (!result.allowed) return result;

  await logUsage({
    userId: params.userId,
    appKey: params.appKey,
    action: params.action,
    metadata: params.metadata,
  });

  return result;
}

export { getMonthlyUsageCount };
