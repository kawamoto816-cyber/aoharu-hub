"use client";

// アオハルOS: Stripe Checkout完了後、`/?checkout=success&plan=...&value=...&session_id=...`
// に戻ってきたタイミングでGA4へpurchaseイベントを送る橋渡しコンポーネント。
// CheckoutIntentHandlerと同様、ページにマウントするだけで動作する表示を持たないコンポーネント。
//
// - session_id(Stripe Checkout Session ID)をトランザクションIDとして使い、
//   リロードや戻る操作による二重計測を防ぐ(同じsession_idは1回しか計測しない)。
// - 計測後はURLからクエリパラメータを取り除き、以後のリロードでも再送されないようにする。

import { useEffect, useRef } from "react";

const TRACKED_SESSION_KEY = "aoharu_ga4_purchase_tracked_session_id";

export function CheckoutSuccessTracker() {
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const url = new URL(window.location.href);
    const params = url.searchParams;
    if (params.get("checkout") !== "success") return;

    const plan = params.get("plan");
    const valueRaw = params.get("value");
    const sessionId = params.get("session_id");
    const value = valueRaw ? Number(valueRaw) : undefined;

    // 二重計測防止: 同じsession_idは1回しか送らない
    let alreadyTracked = false;
    try {
      alreadyTracked =
        !!sessionId && sessionStorage.getItem(TRACKED_SESSION_KEY) === sessionId;
    } catch {
      // sessionStorageが使えない環境では二重計測防止をスキップ(致命的ではない)
    }

    if (!alreadyTracked && typeof window.gtag === "function") {
      window.gtag("event", "purchase", {
        transaction_id: sessionId || `no-session-${Date.now()}`,
        currency: "JPY",
        value: Number.isFinite(value) ? value : undefined,
        items: plan
          ? [{ item_id: plan, item_name: `アオハルOS ${plan}`, price: value }]
          : undefined,
      });
      try {
        if (sessionId) sessionStorage.setItem(TRACKED_SESSION_KEY, sessionId);
      } catch {
        // 無視
      }
    }

    // 計測後はURLからクエリパラメータを除去し、リロード等での再送を防ぐ
    url.search = "";
    window.history.replaceState({}, "", url.toString());
  }, []);

  return null;
}
