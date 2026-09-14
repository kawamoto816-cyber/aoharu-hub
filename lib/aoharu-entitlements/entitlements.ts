import { getOrCreateSubscription, type SubscriptionRow } from "./supabase/subscriptions";
import { getMonthlyUsageCount, logUsage } from "./supabase/usage";
import {
  planHasAppAccess,
  getFreeMonthlyQuota,
  getFreeTierPolicy,
  type AppKey,
  type Plan,
} from "./config/plans";
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

export type AccessDeniedReason = "no_plan" | "payment_issue" | "quota_exceeded";

export type AccessResult =
  | { allowed: true; remaining?: number }
  | { allowed: false; reason: AccessDeniedReason; remaining?: number };

/**
 * 無料枠の消費状況 (画面で「今月の無料添削 残り1本」等を出すためのサマリ)。
 * 有料プラン / 組織向け無料アクセスのユーザーは unlimited: true になる。
 */
export interface FreeTierStatus {
  plan: Plan;
  unlimited: boolean;
  /** 完了単位の月間枠と残り (ポリシー未定義アプリでは従来の共通枠) */
  quota: number;
  used: number;
  remaining: number;
  /** 補助アクションの月間上限と残り (ポリシー未定義アプリでは quota と同じ値) */
  supportCap: number;
  supportUsed: number;
  supportRemaining: number;
  /** 無料枠では使えないアクション名 */
  proOnlyActions: readonly string[];
}

/** 契約プラン or 組織向け無料アクセスで、そのアプリを無制限に使えるか */
async function hasUnlimitedAccess(
  userId: string,
  appKey: AppKey | string,
  entitlement: Entitlement
): Promise<boolean> {
  // Pro/Maxなど、契約プランでそのアプリの無制限アクセスが含まれる場合はそのまま許可
  if (entitlement.hasAccess(appKey)) return true;

  // 組織向け無料アクセス枠 (Stripe課金なしで特定アプリを無制限に使える生徒など)。
  // 既存の有料プラン判定を通らなかった場合のみメールアドレスを引くので、
  // Pro/Max契約者への追加コストはゼロ。
  const freeAccessEmail = await getUserEmail(userId);
  const freeAccessApps = await getFreeAccessApps(freeAccessEmail);
  return freeAccessApps.has(appKey);
}

/**
 * アプリ側のガード用ヘルパー。アクセス不可なら理由を返す (呼び出し側でredirect等する)。
 * Next.jsのredirect()はここでは呼ばない (ライブラリをNext.js非依存に保つため)。
 *
 * 契約プランでそのアプリの無制限アクセスが無いユーザー (Freeプラン、および
 * Pro/Maxの対象外アプリ) は「お試し枠」として使える。
 * 枠の数え方はアプリごとの FREE_TIER_POLICY (config/plans.ts) に従う:
 *   - meteredActions (採点・レポート・骨子など「結果を出す」処理) は月 monthlyQuota 回
 *   - それ以外の補助アクション (対話ターン・ヒント等) は月 supportMonthlyCap 回まで
 *   - proOnlyActions は無料枠では使えず reason: "no_plan"
 * ポリシー未定義のアプリは従来どおり全アクション共通で月 getFreeMonthlyQuota() 回。
 *
 * 使用例 (Server Component / Route Handler):
 *   const result = await checkAppAccess(userId, APP_KEYS.TENSAKUN, "score");
 *   if (!result.allowed) redirect(`/upgrade?reason=${result.reason}`);
 */
export async function checkAppAccess(
  userId: string,
  appKey: AppKey | string,
  action?: string
): Promise<AccessResult> {
  const entitlement = await getEntitlement(userId);
  if (entitlement.isBlocked) return { allowed: false, reason: "payment_issue" };

  if (await hasUnlimitedAccess(userId, appKey, entitlement)) return { allowed: true };

  // ここまで来たのは「無制限アクセスの契約が無い」ユーザー:
  //   - Freeプラン
  //   - Pro/Maxなど有料プランだが、そのアプリがプラン対象外 (例: Proでジココーテー)
  // どちらも同じ月間お試し枠で判定する。有料契約者が対象外アプリを一切試せない
  // (無料プランより不利になる) 状態を避けるため、プランで分岐しない。
  {
    const policy = getFreeTierPolicy(appKey);

    // ポリシー未定義: 従来どおり全アクション共通の回数枠
    if (!policy) {
      const quota = getFreeMonthlyQuota();
      const used = await getMonthlyUsageCount(userId, appKey);
      if (used >= quota) {
        return { allowed: false, reason: "quota_exceeded", remaining: 0 };
      }
      return { allowed: true, remaining: quota - used - 1 };
    }

    const actionName = action ?? "";
    if (policy.proOnlyActions.includes(actionName)) {
      return { allowed: false, reason: "no_plan" };
    }

    if (policy.meteredActions.includes(actionName)) {
      const used = await getMonthlyUsageCount(userId, appKey, policy.meteredActions);
      if (used >= policy.monthlyQuota) {
        return { allowed: false, reason: "quota_exceeded", remaining: 0 };
      }
      return { allowed: true, remaining: policy.monthlyQuota - used - 1 };
    }

    // 補助アクション: 回数枠には数えないが、乱用防止の上限だけ見る
    const supportUsed = await getMonthlyUsageCount(userId, appKey, undefined);
    const meteredUsed = await getMonthlyUsageCount(userId, appKey, policy.meteredActions);
    const supportOnly = Math.max(0, supportUsed - meteredUsed);
    if (supportOnly >= policy.supportMonthlyCap) {
      return { allowed: false, reason: "quota_exceeded", remaining: 0 };
    }
    return { allowed: true, remaining: policy.supportMonthlyCap - supportOnly - 1 };
  }
}

/**
 * アクセス可否チェック + 利用ログ記録をまとめて行うユーティリティ。
 *
 * 注意: ログはAI生成の「前」に記録される。完了単位 (meteredActions) のように
 * 1回の失敗が無料枠を丸ごと消費してしまう処理では、代わりに
 *   const access = await checkAppAccess(userId, appKey, action);
 *   ...AI生成...
 *   await logUsage({ userId, appKey, action });   // 成功後に記録
 * の順で呼ぶこと (タイムアウトやリトライで枠が燃えるのを防ぐ)。
 */
export async function checkAccessAndLogUsage(params: {
  userId: string;
  appKey: AppKey | string;
  action: string;
  metadata?: Record<string, unknown>;
}): Promise<AccessResult> {
  const result = await checkAppAccess(params.userId, params.appKey, params.action);
  if (!result.allowed) return result;

  await logUsage({
    userId: params.userId,
    appKey: params.appKey,
    action: params.action,
    metadata: params.metadata,
  });

  return result;
}

/**
 * 無料枠の消費状況を返す (画面表示用)。
 * 例: 「今月の無料添削 残り1本」「初稿生成はProで」などの表示に使う。
 */
export async function getFreeTierStatus(
  userId: string,
  appKey: AppKey | string
): Promise<FreeTierStatus> {
  const entitlement = await getEntitlement(userId);
  const policy = getFreeTierPolicy(appKey);
  const quota = policy ? policy.monthlyQuota : getFreeMonthlyQuota();
  const supportCap = policy ? policy.supportMonthlyCap : quota;
  const proOnlyActions = policy ? policy.proOnlyActions : [];

  const unlimited =
    !entitlement.isBlocked && (await hasUnlimitedAccess(userId, appKey, entitlement));

  // 無制限アクセス (契約プラン対象 or 組織向け無料枠) は残回数の概念がない。
  // 支払いトラブル中 (isBlocked) は何も使えないので残り0で返す。
  if (unlimited || entitlement.isBlocked) {
    return {
      plan: entitlement.plan,
      unlimited,
      quota,
      used: 0,
      remaining: unlimited ? quota : 0,
      supportCap,
      supportUsed: 0,
      supportRemaining: unlimited ? supportCap : 0,
      proOnlyActions: unlimited ? [] : proOnlyActions,
    };
  }

  // Freeプラン、または有料プランの対象外アプリ: お試し枠の消費状況を返す

  const total = await getMonthlyUsageCount(userId, appKey);
  const used = policy ? await getMonthlyUsageCount(userId, appKey, policy.meteredActions) : total;
  const supportUsed = policy ? Math.max(0, total - used) : total;

  return {
    plan: entitlement.plan,
    unlimited: false,
    quota,
    used,
    remaining: Math.max(0, quota - used),
    supportCap,
    supportUsed,
    supportRemaining: Math.max(0, supportCap - supportUsed),
    proOnlyActions,
  };
}

export { getMonthlyUsageCount };
