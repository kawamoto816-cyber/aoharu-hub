"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

// 添削の結果のすぐ下に出す「まず1か月だけ」のボタン（Pro・月980円）。
// 2026-11 の実績：結果の画面で見せていたのはシーズンパス（7,800円）だけで、案内を見た378回に対して
// 支払い画面へ進んだのは11回。実際に買われたのは 300円の1通分と Pro（月980円）だった。
// 小さく始められる2つを、パスより先に並べる。ログインしている人だけに出す。
export function ProQuickButton({ location, className }: { location: string; className?: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function buy() {
    setBusy(true);
    setError(null);
    trackEvent("begin_checkout", { currency: "JPY", value: 980, plan: "pro", location, payer: "self" });
    try {
      const res = await fetch("/api/billing/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ plan: "pro" }) });
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
        className="flex min-h-[52px] w-full items-center justify-center rounded-[14px] border-2 border-[#15172B] bg-[#15172B] px-4 text-center text-[15px] font-black text-white disabled:opacity-60"
      >
        {busy ? "支払い画面を開いています…" : "今月は何度でも添削する（Pro・月980円）"}
      </button>
      <p className="mb-0 mt-1 text-center text-xs text-[#5A5D73]">いつでも解約できます。出願が終わったら解約すれば、それ以上の請求はありません。</p>
      {error && <p className="mb-0 mt-1 text-center text-xs font-bold text-[#B42318]">{error}</p>}
    </div>
  );
}
