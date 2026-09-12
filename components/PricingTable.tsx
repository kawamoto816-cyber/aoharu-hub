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
    features: ["各アプリ 月3回まで無料", "会員登録のみでOK"],
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

export function PricingTable() {
  const { isLoaded, isSignedIn } = useUser();
  const clerk = useClerk();
  const [loading, setLoading] = useState<TierKey | null>(null);

  const startCheckout = useCallback(async (plan: "pro" | "max") => {
    setLoading(plan);
    try {
      const res = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.url) {
        throw new Error(data?.error || `リクエストに失敗しました (HTTP ${res.status})`);
      }
      window.location.href = data.url;
    } catch (err: any) {
      alert(`お申し込み手続きの開始に失敗しました。\n詳細: ${err.message}`);
      setLoading(null);
    }
  }, []);

  const handleUpgradeClick = useCallback(
    (plan: "pro" | "max") => {
      if (!isLoaded || loading !== null) return;

      if (isSignedIn) {
        startCheckout(plan);
        return;
      }

      // 未ログイン: 選択したプランを一時保存してから新規登録モーダルを開く。
      // 登録完了後にハブ側(CheckoutIntentHandler)がこれを読み取って自動でCheckoutへ進む。
      try {
        sessionStorage.setItem(
          PENDING_PLAN_STORAGE_KEY,
          JSON.stringify({ plan, ts: Date.now() })
        );
      } catch {
        // sessionStorageが使えない環境でも、登録自体は続行できるようにする
      }
      setLoading(plan);
      clerk.openSignUp();
      // モーダルが閉じられてチェックアウトに進まなかった場合に備え、
      // ボタンが操作不能なままにならないよう少し待ってから解除する。
      setTimeout(() => setLoading(null), 1500);
    },
    [isLoaded, isSignedIn, loading, startCheckout, clerk]
  );

  return (
    <div className="mt-8 grid gap-5 sm:grid-cols-3">
      {PRICING.map((tier) => (
        <div
          key={tier.key}
          className={`flex flex-col rounded-2xl border p-6 ${
            tier.highlight
              ? "border-indigo-600 bg-white shadow-md shadow-indigo-600/10"
              : "border-slate-200 bg-white"
          }`}
        >
          {tier.highlight && (
            <span className="mb-3 w-fit rounded-full bg-indigo-600 px-2.5 py-1 text-[10px] font-bold text-white">
              人気プラン
            </span>
          )}
          <p className="text-sm font-bold text-slate-900">{tier.name}</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            {tier.price}
            <span className="text-sm font-bold text-slate-400">{tier.period}</span>
          </p>
          <p className="mt-1 text-xs text-slate-500">{tier.description}</p>
          <ul className="mt-4 flex-1 space-y-2 text-xs text-slate-600">
            {tier.features.map((f) => (
              <li key={f} className="flex items-start gap-1.5">
                <span className="mt-0.5 text-indigo-600">✓</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          {tier.key === "free" ? (
            <button
              onClick={() => clerk.openSignUp()}
              className="mt-5 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-50"
            >
              無料ではじめる
            </button>
          ) : (
            <button
              onClick={() => handleUpgradeClick(tier.key as "pro" | "max")}
              disabled={loading !== null}
              className={`mt-5 rounded-xl px-4 py-2.5 text-xs font-bold transition-colors disabled:opacity-50 ${
                tier.highlight
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/20 hover:bg-indigo-500"
                  : "border border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
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
