/**
 * 受験シーズンパス（買い切り・自動更新なし）。
 *
 * 1回払うと、期限の日まで Max と同じ機能（全アプリ使い放題）が使える。月額のサブスクリプションではないので、
 * 期限が来たら自動で無料プランにもどる（請求は1回だけ）。保護者が払えるリンクも作れる。
 *
 * - 値段・期限は環境変数で変えられる（SEASON_PASS_PRICE_JPY・SEASON_PASS_ENDS_AT）。
 * - Stripe の Price ID（STRIPE_PRICE_SEASON_PASS）が無ければ、決済画面で値段をその場で指定する（price_data）。
 *   商品カタログに登録しておくと Stripe の売上レポートで見やすいので、登録したら環境変数に入れる。
 * - subscriptions テーブルには plan: "max"・stripe_subscription_id: null・current_period_end: 期限 で入る。
 *   期限が過ぎた行は expireSeasonPasses()（毎日の定時処理）と、読むとき（getOrCreateSubscription）に free にもどす。
 */

export const SEASON_PASS = {
  key: "season",
  /** 画面・計測に出す値段（税込）。Stripe に price_data で渡す値段もこれ */
  priceJpy: Number(process.env.SEASON_PASS_PRICE_JPY ?? 9800),
  /** 使える期限（この時刻まで）。既定は 2027年3月31日 23:59（日本時間） */
  endsAt: process.env.SEASON_PASS_ENDS_AT ?? "2027-03-31T23:59:59+09:00",
  /** 期限の表示（例「2027年3月31日」） */
  endsLabel: process.env.SEASON_PASS_ENDS_LABEL ?? "2027年3月31日",
  name: "受験シーズンパス",
  /** Stripe の決済画面に出す説明 */
  stripeDescription: "アオハルOSの全機能（志望理由書・小論文の添削、面接練習ほか）が期限まで使い放題。買い切り・自動更新なし。",
  /** Stripe の Checkout セッション・Webhook で見分ける印 */
  metadataKind: "season_pass",
} as const;

export function seasonPassPriceId(): string | undefined {
  return process.env.STRIPE_PRICE_SEASON_PASS || undefined;
}

/** シーズンパスで入った行か（サブスクリプションではなく、期限つき） */
export function isSeasonPassRow(row: { plan: string; stripe_subscription_id: string | null; current_period_end: string | null }): boolean {
  return row.plan !== "free" && !row.stripe_subscription_id && Boolean(row.current_period_end);
}

/** 期限切れのシーズンパスか */
export function isExpiredSeasonPass(row: { plan: string; stripe_subscription_id: string | null; current_period_end: string | null }, now = Date.now()): boolean {
  return isSeasonPassRow(row) && new Date(row.current_period_end as string).getTime() < now;
}
