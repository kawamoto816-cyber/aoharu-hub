"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

const VALUE = { team5: 14800, team10: 24800 } as const;

export function TeamBuyButtons({ plan }: { plan: "team5" | "team10" }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  async function go() {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/team-pass/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ plan }) });
      const j = (await res.json().catch(() => ({}))) as { url?: string };
      if (!j.url) throw new Error("no url");
      trackEvent("begin_checkout", { currency: "JPY", value: VALUE[plan], plan, location: "juku" });
      window.location.href = j.url;
    } catch {
      setError(true);
      setLoading(false);
    }
  }
  return (
    <>
      <button type="button" onClick={go} disabled={loading} className="mt-4 min-h-[48px] w-full rounded-xl bg-[#15172B] text-sm font-bold text-white disabled:opacity-60">
        {loading ? "支払い画面を開いています…" : "このプランを申し込む"}
      </button>
      {error && <p className="mb-0 mt-2 text-xs font-bold text-[#B42318]">支払い画面を開けませんでした。少し時間をおいてお試しください。</p>}
    </>
  );
}
