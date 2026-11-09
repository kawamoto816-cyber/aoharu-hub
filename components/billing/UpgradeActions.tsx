"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

// 有料にする2つの道（無料枠を使い切ったとき・添削の結果のあとなどに出す）。
//   1. 自分で手続きする → そのまま Stripe の支払い画面へ
//   2. 保護者にお願いする → このアカウント用の支払いリンク (24時間有効) を作り、
//      LINE・メールなどで保護者に送る。保護者が開いて支払うと、このアカウントが有料になる。
// 高校生の多くは自分では払えないので、2 を同じくらい目立たせる。
// product: "pro"（月額980円）か "season"（受験シーズンパス：買い切り・自動更新なし）。

export type UpgradeProduct = "pro" | "season";

const PRODUCT = {
  pro: { value: 980, plan: "pro", button: "Proにする（月980円）", note: "いつでも解約できます。" },
  season: { value: 9800, plan: "season", button: "シーズンパスにする（9,800円）", note: "1回払うだけ・自動更新なし。" },
} as const;

async function createCheckout(product: UpgradeProduct, payer: "self" | "parent"): Promise<string> {
  const res = await fetch("/api/billing/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ plan: PRODUCT[product].plan, payer }),
  });
  const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
  if (!res.ok || !data.url) throw new Error(data.error || `HTTP ${res.status}`);
  return data.url;
}

function parentMessage(product: UpgradeProduct, url: string, endsLabel: string): string {
  const ask =
    product === "season"
      ? `出願と面接が終わるまで使い放題になる「受験シーズンパス」（${endsLabel}まで・9,800円の1回払い・自動更新なし）にしてもらえませんか。`
      : "無料プランは月2本までなので、Pro（月980円・いつでも解約できます）にしてもらえませんか。";
  return [
    "受験の志望理由書・小論文の添削や面接練習に「アオハルOS」というAIのサービスを使っています。",
    ask,
    "下のリンクから支払いの手続きができます（24時間有効）。",
    url,
    "",
    "サービスの説明（保護者の方向け）: https://app.bluespring.co.jp/parents",
  ].join("\n");
}

export function UpgradeActions({ location, product = "pro", endsLabel = "2027年3月31日" }: { location: string; product?: UpgradeProduct; endsLabel?: string }) {
  const p = PRODUCT[product];
  const [loading, setLoading] = useState<"self" | "parent" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function goSelf() {
    setLoading("self");
    setError(null);
    try {
      const url = await createCheckout(product, "self");
      trackEvent("begin_checkout", { currency: "JPY", value: p.value, plan: p.plan, location, payer: "self" });
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
      const url = await createCheckout(product, "parent");
      const text = parentMessage(product, url, endsLabel);
      trackEvent("ask_parent_link", { location, plan: p.plan });
      setMessage(text);
      // スマホなら共有メニュー (LINE など) をそのまま開く
      if (typeof navigator.share === "function") {
        try {
          await navigator.share({ text });
          trackEvent("ask_parent_shared", { location, via: "share", plan: p.plan });
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
      trackEvent("ask_parent_shared", { location, via: "copy", plan: p.plan });
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
          {loading === "self" ? "支払い画面を開いています…" : p.button}
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
      <p className="m-0 text-xs text-[#5A5D73]">{p.note}「保護者にお願いする」は、保護者の方が支払えるリンクを作ってLINEやメールで送れます。</p>
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
