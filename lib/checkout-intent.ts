// LPの料金プラン(PricingTable)で選んだプランを、新規登録モーダルをまたいで
// ログイン後ハブ(CheckoutIntentHandler)に橋渡しするための共通キー。
// 値は JSON.stringify({ plan: "pro" | "max", ts: number }) の形で保存する。
export const PENDING_PLAN_STORAGE_KEY = "aoharu_pending_plan";

// 保存から一定時間が経った古い意図は無視する(タブを開きっぱなしで
// 後日ふつうにログインした場合などに、意図しないCheckoutへ飛ばさないため)。
export const PENDING_PLAN_TTL_MS = 10 * 60 * 1000; // 10分
