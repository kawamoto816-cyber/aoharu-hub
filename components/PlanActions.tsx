"use client";

import { useCallback, useState } from "react";

type LoadingAction = "pro" | "max" | "portal" | null;

export function PlanActions({ plan }: { plan: "free" | "pro" | "max" }) {
  const [loading, setLoading] = useState<LoadingAction>(null);

  const goToCheckout = useCallback(async (target: "pro" | "max") => {
    setLoading(target);
    try {
      const res = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: target }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.url) {
        throw new Error(data?.error || `リクエストに失敗しました (HTTP ${res.status})`);
      }
      window.location.href = data.url;
    } catch (err: any) {
      alert(`手続きの開始に失敗しました。\n詳細: ${err.message}`);
      setLoading(null);
    }
  }, []);

  const goToPortal = useCallback(async () => {
    setLoading("portal");
    try {
      const res = await fetch("/api/billing/portal", { method: "POST" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.url) {
        throw new Error(data?.error || `リクエストに失敗しました (HTTP ${res.status})`);
      }
      window.location.href = data.url;
    } catch (err: any) {
      alert(`お支払い管理ページを開けませんでした。\n詳細: ${err.message}`);
      setLoading(null);
    }
  }, []);

  return (
    <div className="flex flex-wrap gap-2">
      {plan !== "max" && (
        <button
          onClick={() => goToCheckout(plan === "free" ? "pro" : "max")}
          disabled={loading !== null}
          className="rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm shadow-indigo-600/20 transition-colors hover:bg-indigo-500 disabled:opacity-50"
        >
          {loading === "pro" || loading === "max"
            ? "Checkoutへ移動しています…"
            : plan === "free"
            ? "Proプランにアップグレード (¥980/月)"
            : "Maxプランにアップグレード (¥2,980/月)"}
        </button>
      )}
      {plan !== "free" && (
        <button
          onClick={goToPortal}
          disabled={loading !== null}
          className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-50"
        >
          {loading === "portal" ? "開いています…" : "プラン管理・解約"}
        </button>
      )}
    </div>
  );
}
