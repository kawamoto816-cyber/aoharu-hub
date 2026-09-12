"use client";

// アオハルOS: LP(PricingTable)で「このプランで申し込む」を押した直後に
// 新規登録した人を、ログイン後ハブに戻ってきたタイミングで自動的に
// Stripe Checkoutへ送り込むための橋渡しコンポーネント。
// ログイン後ハブ(Hub)にマウントするだけで動作する。表示は何も持たない。

import { useEffect, useRef } from "react";
import { PENDING_PLAN_STORAGE_KEY, PENDING_PLAN_TTL_MS } from "@/lib/checkout-intent";

export function CheckoutIntentHandler() {
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    let raw: string | null = null;
    try {
      raw = sessionStorage.getItem(PENDING_PLAN_STORAGE_KEY);
      sessionStorage.removeItem(PENDING_PLAN_STORAGE_KEY);
    } catch {
      return;
    }
    if (!raw) return;

    let parsed: { plan?: string; ts?: number } = {};
    try {
      parsed = JSON.parse(raw);
    } catch {
      return;
    }

    const plan = parsed.plan;
    const ts = parsed.ts;
    if (plan !== "pro" && plan !== "max") return;
    if (typeof ts !== "number" || Date.now() - ts > PENDING_PLAN_TTL_MS) return;

    (async () => {
      try {
        const res = await fetch("/api/billing/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ plan }),
        });
        const data = await res.json().catch(() => ({}));
        if (res.ok && data?.url) {
          window.location.href = data.url;
        }
        // 失敗した場合は何もしない。通常のハブ画面の
        // 「プランにアップグレード」ボタンから改めて申し込める。
      } catch {
        // 同上: 静かに諦める
      }
    })();
  }, []);

  return null;
}
