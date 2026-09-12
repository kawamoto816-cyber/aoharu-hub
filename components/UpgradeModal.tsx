"use client";

// アオハルOS: 「無料枠の上限に達した/ログインが必要/プラン契約が必要/
// お支払いに問題がある」等のアクセス不可を、生のエラーメッセージや
// alert()ではなく、ちゃんとしたモーダルでユーザーに伝えるための共通コンポーネント。
// Pro/Maxへのアップグレード(Stripe Checkout)、お支払い管理(Stripeカスタマー
// ポータル)への導線もここに実装している。テンサクンのデザイントークン
// (indigo-600 / slate系、rounded-xl、font-black見出し)に合わせている。
//
// 使い方:
//   1. app/layout.tsx で <UpgradeModalProvider> を(ClerkProviderの内側で)childrenをラップする
//   2. 各画面のコンポーネントで const { showUpgradeModal } = useUpgradeModal();
//   3. API呼び出しのcatchで、ApiAccessErrorだったら showUpgradeModal(error.reason) を呼ぶ

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useClerk } from "@clerk/nextjs";
import type { UpgradeReason } from "@/lib/api-error";

interface UpgradeModalContextValue {
  showUpgradeModal: (reason: UpgradeReason) => void;
}

const UpgradeModalContext = createContext<UpgradeModalContextValue | null>(null);

const COPY: Record<UpgradeReason, { title: string; body: string }> = {
  auth_required: {
    title: "ログインが必要です",
    body: "この機能を使うには登録(ログイン)が必要です。登録は無料で、そのまま月3回まで無料プランとしてお試しいただけます。",
  },
  quota_exceeded: {
    title: "今月の無料ご利用回数の上限に達しました",
    body: "無料プランでは月3回まで生成機能をご利用いただけます。上限は毎月リセットされます。プランをアップグレードすると回数無制限でご利用いただけます。",
  },
  no_plan: {
    title: "現在のプランではご利用いただけません",
    body: "この機能をご利用いただくには、プランのアップグレードが必要です。",
  },
  payment_issue: {
    title: "お支払いの確認が必要です",
    body: "ご契約プランのお支払いに問題が発生しているため、現在ご利用いただけません。お支払い方法をご確認ください。",
  },
};

type LoadingAction = "pro" | "max" | "portal" | null;

async function postJson(url: string, body?: unknown) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data?.url) {
    throw new Error(data?.error || `リクエストに失敗しました (HTTP ${res.status})`);
  }
  return data as { url: string };
}

export function UpgradeModalProvider({ children }: { children: React.ReactNode }) {
  const [reason, setReason] = useState<UpgradeReason | null>(null);
  const [loadingAction, setLoadingAction] = useState<LoadingAction>(null);
  const clerk = useClerk();

  const showUpgradeModal = useCallback((r: UpgradeReason) => setReason(r), []);
  const close = useCallback(() => {
    setReason(null);
    setLoadingAction(null);
  }, []);

  // Stripe Checkout/ポータルへ遷移した後、ユーザーがブラウザの「戻る」で
  // このページに戻ってきた場合、ブラウザがページを再読み込みせず
  // bfcache(back-forward cache)から遷移直前の状態を復元することがある。
  // すると「Checkoutへ移動しています…」等のloadingAction状態が凍結されたまま
  // 復元され、モーダルの全ボタンがdisabledのまま操作不能になってしまう。
  // pageshowイベントで復元を検知し、その都度リセットする。
  useEffect(() => {
    const handlePageShow = () => setLoadingAction(null);
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  const goToCheckout = useCallback(async (plan: "pro" | "max") => {
    setLoadingAction(plan);
    try {
      const { url } = await postJson("/api/billing/checkout", { plan });
      window.location.href = url;
    } catch (err: any) {
      alert(`アップグレード手続きの開始に失敗しました。\n詳細: ${err.message}`);
      setLoadingAction(null);
    }
  }, []);

  const goToPortal = useCallback(async () => {
    setLoadingAction("portal");
    try {
      const { url } = await postJson("/api/billing/portal");
      window.location.href = url;
    } catch (err: any) {
      alert(`お支払い管理ページを開けませんでした。\n詳細: ${err.message}`);
      setLoadingAction(null);
    }
  }, []);

  return (
    <UpgradeModalContext.Provider value={{ showUpgradeModal }}>
      {children}
      {reason && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-900/50 p-4 animate-in fade-in duration-150"
          onClick={close}
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-2 text-base font-black tracking-tight text-slate-800">
              {COPY[reason].title}
            </h2>
            <p className="mb-6 text-[13px] leading-relaxed font-medium text-slate-500">
              {COPY[reason].body}
            </p>
            <div className="flex flex-col gap-2">
              {reason === "auth_required" && (
                <button
                  onClick={() => {
                    close();
                    clerk.openSignIn();
                  }}
                  className="rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm shadow-indigo-600/20 transition-colors hover:bg-indigo-500"
                >
                  無料登録してログインする
                </button>
              )}

              {reason === "payment_issue" && (
                <button
                  onClick={goToPortal}
                  disabled={loadingAction === "portal"}
                  className="rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm shadow-indigo-600/20 transition-colors hover:bg-indigo-500 disabled:opacity-50"
                >
                  {loadingAction === "portal" ? "お支払い管理ページを開いています…" : "お支払い方法を確認する"}
                </button>
              )}

              {(reason === "quota_exceeded" || reason === "no_plan") && (
                <>
                  <button
                    onClick={() => goToCheckout("pro")}
                    disabled={loadingAction !== null}
                    className="rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm shadow-indigo-600/20 transition-colors hover:bg-indigo-500 disabled:opacity-50"
                  >
                    {loadingAction === "pro" ? "Checkoutへ移動しています…" : "Proプランにアップグレード (¥980/月)"}
                  </button>
                  <button
                    onClick={() => goToCheckout("max")}
                    disabled={loadingAction !== null}
                    className="rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2.5 text-xs font-bold text-indigo-700 transition-colors hover:bg-indigo-100 disabled:opacity-50"
                  >
                    {loadingAction === "max" ? "Checkoutへ移動しています…" : "Maxプランにアップグレード (¥2,980/月)"}
                  </button>
                </>
              )}

              <button
                onClick={close}
                disabled={loadingAction !== null}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-500 transition-colors hover:bg-slate-50 disabled:opacity-50"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </UpgradeModalContext.Provider>
  );
}

export function useUpgradeModal(): UpgradeModalContextValue {
  const ctx = useContext(UpgradeModalContext);
  if (!ctx) {
    throw new Error("useUpgradeModal must be used within UpgradeModalProvider");
  }
  return ctx;
}
