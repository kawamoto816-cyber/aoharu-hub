"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

// 無料枠を使い切ったときなどに出す「Proにする」の2つの道。
//   1. 自分で手続きする → そのまま Stripe の支払い画面へ
//   2. 保護者にお願いする → このアカウント用の支払いリンク (24時間有効) を作り、
//      LINE・メールなどで保護者に送る。保護者が開いて支払うと、このアカウントが Pro になる。
// 高校生の多くは自分では払えないので、2 を同じくらい目立たせる。

const PRO_VALUE = 980;

async function createCheckout(payer: "self" | "parent"): Promise<string> {
  const res = await fetch("/api/billing/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ plan: "pro", payer }),
  });
  const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
  if (!res.ok || !data.url) throw new Error(data.error || `HTTP ${res.status}`);
  return data.url;
}

function parentMessage(url: string): string {
  return [
    "受験の志望理由書・小論文の添削や面接練習に「アオハルOS」というAIのサービスを使っています。",
    "無料プランは月2本までなので、Pro（月980円・いつでも解約できます）にしてもらえませんか。",
    "下のリンクから支払いの手続きができます（24時間有効）。",
    url,
    "",
    "サービスの説明（保護者の方向け）: https://app.bluespring.co.jp/parents",
  ].join("\n");
}

export function UpgradeActions({ location }: { location: string }) {
  const [loading, setLoading] = useState<"self" | "parent" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function goSelf() {
    setLoading("self");
    setError(null);
    try {
      const url = await createCheckout("self");
      trackEvent("begin_checkout", { currency: "JPY", value: PRO_VALUE, plan: "pro", location, payer: "self" });
      window.location.href = url;
    } catch {
      setError("支払い画面を開けませんでした。少し時間をおいてもう一度お試しください。");
      setLoading(null);
    }
  }

  async function askParent() {
    setLoading("parent");
    setError(null);
    try {
      const url = await createCheckout("parent");
      const text = parentMessage(url);
      trackEvent("ask_parent_link", { location });
      setMessage(text);
      // スマホなら共有メニュー (LINE など) をそのまま開く
      if (typeof navigator.share === "function") {
        try {
          await navigator.share({ text });
          trackEvent("ask_parent_shared", { location, via: "share" });
        } catch {
          /* 共有を閉じただけなら、下のコピー欄から送れる */
        }
      }
    } catch {
      setError("リンクを作れませんでした。少し時間をおいてもう一度お試しください。");
    } finally {
      setLoading(null);
    }
  }

  async function copy() {
    if (!message) return;
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      trackEvent("ask_parent_shared", { location, via: "copy" });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* コピーできない環境では、下の文章を長押しで選んでもらう */
    }
  }

  return (
    <div className="mt-3 flex flex-col gap-2">
      <div className="grid gap-2 sm:grid-cols-2">
        <button
          type="button"
          onClick={goSelf}
          disabled={loading !== null}
          className="min-h-[48px] rounded-xl bg-[#15172B] px-4 text-sm font-bold text-white disabled:opacity-60"
        >
          {loading === "self" ? "支払い画面を開いています…" : "Proにする（月980円）"}
        </button>
        <button
          type="button"
          onClick={askParent}
          disabled={loading !== null}
          className="min-h-[48px] rounded-xl border-[1.5px] border-[#15172B] bg-white px-4 text-sm font-bold text-[#15172B] disabled:opacity-60"
        >
          {loading === "parent" ? "リンクを作っています…" : "保護者にお願いする"}
        </button>
      </div>
      <p className="m-0 text-xs text-[#5A5D73]">いつでも解約できます。「保護者にお願いする」は、保護者の方が支払えるリンクを作ってLINEやメールで送れます。</p>
      {message && (
        <div className="rounded-xl border border-[#15172B]/30 bg-white p-3">
          <p className="m-0 text-xs font-bold">この文章を保護者に送ってください（リンクは24時間有効）</p>
          <textarea readOnly value={message} rows={6} className="mt-2 w-full resize-none rounded-lg border border-slate-300 p-2 text-xs leading-relaxed" />
          <button type="button" onClick={copy} className="mt-2 min-h-[40px] rounded-lg bg-[#1533B8] px-4 text-xs font-bold text-white">
            {copied ? "コピーしました" : "文章をコピーする"}
          </button>
        </div>
      )}
      {error && (
        <p role="alert" className="m-0 text-xs font-bold text-[#B42318]">
          {error}
        </p>
      )}
    </div>
  );
}
