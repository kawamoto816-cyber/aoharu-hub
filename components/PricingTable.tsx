"use client";

// アオハルOS: LP(未ログイン)の料金プランセクション。
// Free/Pro/Maxの各カードから、そのままお申し込み(Stripe Checkout)まで進めるようにする。
//
// - 未ログインでPro/Maxをクリック → 選んだプランをsessionStorageに一時保存してから
//   Clerkの新規登録モーダルを開く(既存のClerkProvider設定どおり、登録完了後は"/"に戻る)。
// - "/"に戻ってきた後は、ログイン後ハブ側の <CheckoutIntentHandler /> が
//   保存しておいたプランを読み取り、自動でCheckoutセッションへ遷移する。
// - 万一すでにログイン中の状態でこのセクションが表示された場合(通常はHome()の
//   分岐によりあり得ないが念のため)も、直接Checkoutを呼び出せるようにしている。

import { useCallback, useState } from "react";
import { useClerk, useUser } from "@clerk/nextjs";
import { PENDING_PLAN_STORAGE_KEY } from "@/lib/checkout-intent";
import { openSignUpWithRecovery } from "@/lib/authReloadGuard";
import { trackEvent } from "@/lib/analytics";

type TierKey = "free" | "pro" | "max";

const PRICING: {
  key: TierKey;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlight: boolean;
}[] = [
  {
    key: "free",
    name: "Free",
    price: "¥0",
    period: "",
    description: "まずは無料でお試し",
    features: ["添削レポート 月2本", "面接の評価レポート・志望理由書の構成案 各月1回", "クレジットカード不要"],
    highlight: false,
  },
  {
    key: "pro",
    name: "Pro",
    price: "¥980",
    period: "/月",
    description: "受験・就活・転職の本格対策に",
    features: ["テンサクン・しぼりゆ・メンサツ 使い放題", "回数制限なし", "いつでも解約可能"],
    highlight: true,
  },
  {
    key: "max",
    name: "Max",
    price: "¥2,980",
    period: "/月",
    description: "アオハルOSの全アプリを使い倒す",
    features: ["今後追加されるアプリも含め全アプリ使い放題", "回数制限なし", "いつでも解約可能"],
    highlight: false,
  },
];

const PLAN_VALUE_JPY: Record<"pro" | "max", number> = {
  pro: 980,
  max: 2980,
};

export function PricingTable() {
  const { isLoaded, isSignedIn } = useUser();
  const clerk = useClerk();
  const [loading, setLoading] = useState<TierKey | null>(null);

  const startCheckout = useCallback(
    async (plan: "pro" | "max") => {
      setLoading(plan);
      try {
        const res = await fetch("/api/billing/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ plan }),
        });
        const data = await res.json().catch(() => ({}));

        // クライアント側では"ログイン済み"に見えても、Clerkのセッション同期のタイミング等により
        // サーバー側でセッションが確認できず401が返ることがある。その場合はエラーにせず、
        // 通常の未ログイン導線(新規登録モーダル→登録後に自動でCheckoutへ)にフォールバックする。
        if (res.status === 401 || data?.reason === "auth_required") {
          try {
            sessionStorage.setItem(
              PENDING_PLAN_STORAGE_KEY,
              JSON.stringify({ plan, ts: Date.now() })
            );
          } catch {
            // sessionStorageが使えない環境でも、登録自体は続行できるようにする
          }
          openSignUpWithRecovery(clerk);
          return;
        }

        if (!res.ok || !data?.url) {
          throw new Error(data?.error || `リクエストに失敗しました (HTTP ${res.status})`);
        }
        trackEvent("begin_checkout", {
          currency: "JPY",
          value: PLAN_VALUE_JPY[plan],
          plan,
        });
        window.location.href = data.url;
      } catch (err: any) {
        alert(`お申し込み手続きの開始に失敗しました。\n詳細: ${err.message}`);
      } finally {
        setLoading(null);
      }
    },
    [clerk]
  );

  const handleUpgradeClick = useCallback(
    (plan: "pro" | "max") => {
      if (!isLoaded || loading !== null) return;

      if (isSignedIn) {
        startCheckout(plan);
        return;
      }

      // 未ログイン: 選択したプランを一時保存してから新規登録モーダルを開く。
      // 登録完了後にハブ側(CheckoutIntentHandler)がこれを読み取って自動でCheckoutへ進む。
      trackEvent("sign_up_click", { location: `pricing_${plan}` });
      try {
        sessionStorage.setItem(
          PENDING_PLAN_STORAGE_KEY,
          JSON.stringify({ plan, ts: Date.now() })
        );
      } catch {
        // sessionStorageが使えない環境でも、登録自体は続行できるようにする
      }
      setLoading(plan);
      openSignUpWithRecovery(clerk);
      // モーダルが閉じられてチェックアウトに進まなかった場合に備え、
      // ボタンが操作不能なままにならないよう少し待ってから解除する。
      setTimeout(() => setLoading(null), 1500);
    },
    [isLoaded, isSignedIn, loading, startCheckout, clerk]
  );

  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-3">
      {PRICING.map((tier) => (
        <div
          key={tier.key}
          className={`relative flex flex-col rounded-[18px] bg-white p-7 text-[#15172B] ${
            tier.highlight ? "border-[3px] border-[#1533B8]" : "border-[1.5px] border-[#15172B]"
          }`}
        >
          {tier.highlight && (
            <span className="absolute -top-3.5 left-6 rounded-full border-[1.5px] border-[#15172B] bg-[#FFE45C] px-3 py-1 text-xs font-bold">
              出願シーズンにおすすめ
            </span>
          )}
          <p className="text-base font-bold">{tier.name}</p>
          <p className="mt-2 text-4xl font-black">
            {tier.price}
            <span className="text-[15px] font-medium text-[#5A5D73]">{tier.period}</span>
          </p>
          <p className="mt-1 text-sm text-[#3A3D55]">{tier.description}</p>
          <ul className="mt-4 flex-1 space-y-2 text-sm leading-relaxed text-[#3A3D55]">
            {tier.features.map((f) => (
              <li key={f} className="flex items-start gap-1.5">
                <span className="mt-0.5 font-black text-[#1533B8]">✓</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          {tier.key === "free" ? (
            <button
              onClick={() => {
                trackEvent("sign_up_click", { location: "pricing_free" });
                openSignUpWithRecovery(clerk);
              }}
              className="mt-6 min-h-[48px] rounded-xl border-2 border-[#15172B] px-4 py-3 text-sm font-bold text-[#15172B] transition-colors hover:bg-[#FFF6C4]"
            >
              無料ではじめる
            </button>
          ) : (
            <button
              onClick={() => handleUpgradeClick(tier.key as "pro" | "max")}
              disabled={loading !== null}
              className={`mt-6 min-h-[48px] rounded-xl px-4 py-3 text-sm font-bold transition-colors disabled:opacity-50 ${
                tier.highlight
                  ? "bg-[#1533B8] text-white shadow-[0_4px_0_#0B1F7A] hover:bg-[#1A3BD0]"
                  : "border-2 border-[#15172B] text-[#15172B] hover:bg-[#FFF6C4]"
              }`}
            >
              {loading === tier.key ? "お申し込み手続き中…" : "このプランで申し込む"}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
