"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

// 1通分の添削（300円・書き直したあとの再添削1回つき）を、その場で買うボタン。
// 無料の枠（月2本）を使い切ったときと、添削の結果の画面に出す。ログインしている人だけ。
export const TICKET_PRICE_JPY = 300;

export function TicketBuyButton({ location, className }: { location: string; className?: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function buy() {
    setBusy(true);
    setError(null);
    trackEvent("begin_checkout", { currency: "JPY", value: TICKET_PRICE_JPY, plan: "ticket", location, payer: "self" });
    try {
      const res = await fetch("/api/billing/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ plan: "ticket" }) });
      const json = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
      if (!res.ok || !json.url) throw new Error(json.error ?? String(res.status));
      window.location.href = json.url;
    } catch {
      setError("支払い画面を開けませんでした。少し時間をおいて、もう一度お試しください。");
      setBusy(false);
    }
  }

  return (
    <div className={className}>
      <button
        type="button"
        onClick={buy}
        disabled={busy}
        className="flex min-h-[52px] w-full items-center justify-center rounded-[14px] border-2 border-[#15172B] bg-white px-4 text-center text-[15px] font-black text-[#15172B] disabled:opacity-60"
      >
        {busy ? "支払い画面を開いています…" : `この1通だけ添削する（${TICKET_PRICE_JPY}円・書き直しの再添削1回つき）`}
      </button>
      <p className="mb-0 mt-1 text-center text-xs text-[#5A5D73]">1回払い・自動更新なし・期限なし。PayPay・カードで払えます。何通も直すなら Pro（月980円）のほうが得です。</p>
      {error && <p className="mb-0 mt-1 text-center text-xs font-bold text-[#B42318]">{error}</p>}
    </div>
  );
}
