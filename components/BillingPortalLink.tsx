"use client";

// アオハルOS: ログイン中のユーザーが、いつでも契約プランの変更・支払い方法の
// 更新・解約ができるように、Stripeカスタマーポータルへのリンクを出す
// ちいさなコンポーネント。まだ一度も課金していないユーザーが押した場合は、
// /api/billing/portal が reason: "no_plan" を返すので、その旨を案内する。

import { useState } from "react";

/** Stripe のお支払い管理ページを開く (スマホのヘッダーのアバターのメニューからも使う) */
export async function openBillingPortal() {
  try {
    const res = await fetch("/api/billing/portal", { method: "POST" });
    const data = await res.json().catch(() => ({}));

    if (!res.ok || !data?.url) {
      if (data?.reason === "no_plan") {
        alert("現在ご契約中の有料プランはありません(無料プランでご利用中です)。");
      } else {
        alert(`お支払い管理ページを開けませんでした。\n詳細: ${data?.error || res.status}`);
      }
      return;
    }

    window.location.href = data.url;
  } catch (err) {
    alert(`お支払い管理ページを開けませんでした。\n詳細: ${err instanceof Error ? err.message : String(err)}`);
  }
}

export function BillingPortalLink() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await openBillingPortal();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="whitespace-nowrap px-2 text-[10px] font-bold text-slate-400 transition-colors hover:text-indigo-600 disabled:opacity-50"
    >
      {loading ? "読み込み中…" : "プラン管理"}
    </button>
  );
}
