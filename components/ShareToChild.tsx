"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

// 保護者向けLPの「お子さんに送る」導線。
// 高校生本人はSNS、財布は保護者、という構造なので、保護者が見たページから
// 本人へ /try のリンクを渡せるようにする (LINEで送る / リンクをコピー)。
const CHILD_URL = "https://app.bluespring.co.jp/try?for=highschool";
const MESSAGE = `志望理由書と小論文、AIが無料で添削してくれるサービスがあるみたい。試してみて → ${CHILD_URL}`;

export function ShareToChild() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(MESSAGE);
      setCopied(true);
      trackEvent("share_to_child", { method: "copy" });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // クリップボードが使えない環境では何もしない (文面は画面に表示している)
    }
  };

  const lineUrl = `https://line.me/R/share?text=${encodeURIComponent(MESSAGE)}`;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-sm font-bold text-slate-900">お子さんに、このまま送れます</p>
      <p className="mt-2 rounded-lg bg-slate-50 p-3 text-xs leading-relaxed text-slate-600">{MESSAGE}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <a
          href={lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("share_to_child", { method: "line" })}
          className="rounded-xl bg-[#06C755] px-4 py-2 text-xs font-bold text-white transition-opacity hover:opacity-90"
        >
          LINEで送る
        </a>
        <button
          type="button"
          onClick={copy}
          className="rounded-xl border border-slate-300 px-4 py-2 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-50"
        >
          {copied ? "コピーしました" : "文面をコピー"}
        </button>
      </div>
    </div>
  );
}
