"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { seasonPrice, yen, SEASON_ENDS_LABEL } from "@/lib/aoharu-entitlements/config/season-price";

// 保護者ビュー（/parent-view/<トークン>）に出す受験シーズンパスの案内。お子さんが無料プランのときだけ出す。
// 保護者はログインしていないので、共有トークンでお子さんのアカウントの支払い画面を開く。
export function ParentViewSeasonOffer({ shareToken }: { shareToken: string }) {
  const sp = seasonPrice();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) {
        trackEvent("season_offer_view", { location: "parent_view" });
        io.disconnect();
      }
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  async function pay() {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/billing/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ plan: "season", shareToken }) });
      const j = (await res.json().catch(() => ({}))) as { url?: string };
      if (!j.url) throw new Error("no url");
      trackEvent("begin_checkout", { currency: "JPY", value: sp.jpy, plan: "season", location: "parent_view", payer: "parent" });
      window.location.href = j.url;
    } catch {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <section ref={ref} className="mt-10 rounded-2xl border border-amber-200 bg-amber-50/70 p-5">
      <p className="text-xs font-bold text-amber-700">{sp.early ? `早割 ${sp.earlyLabel}まで（あと${sp.earlyDaysLeft}日）` : "出願・面接が終わるまで"}</p>
      <h2 className="mt-1 text-base font-bold text-slate-900">
        受験シーズンパス {sp.early && <s className="mr-1 text-sm font-normal text-slate-500">{yen(sp.regularJpy)}円</s>}
        {yen(sp.jpy)}円（1回払い）
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        いまは無料プラン（添削は月2本まで）です。パスにすると、{SEASON_ENDS_LABEL}まで志望理由書・小論文の添削や面接練習を回数の制限なく使えます。自動更新はなく、追加の請求はありません。
      </p>
      <button type="button" onClick={pay} disabled={loading} className="mt-4 min-h-[48px] w-full rounded-xl bg-slate-900 px-4 text-sm font-bold text-white disabled:opacity-60">
        {loading ? "支払い画面を開いています…" : `このまま保護者が支払う（${yen(sp.jpy)}円）`}
      </button>
      <p className="mt-2 text-xs text-slate-500">
        カード・PayPay などが使えます。お支払いはお子さんのアカウントに反映されます。<Link href="/parents#season" className="underline">くわしい説明</Link>
      </p>
      {error && <p className="mt-2 text-xs font-bold text-rose-600">支払い画面を開けませんでした。少し時間をおいてお試しください。</p>}
    </section>
  );
}
