"use client";

import { useState } from "react";
import { ActionForm, SubmitButton } from "@/components/ActionForm";
import { createParentShareLinkAction, regenerateParentShareLinkAction } from "@/app/actions/parent-share";

// マイページの「保護者と共有」欄。書いた文章そのものではなく、進み具合だけが
// 見えるリンクを発行する。ログイン不要のリンクなので、渡す相手には注意を促す。

export function ParentShareCard({ shareUrl }: { shareUrl: string | null }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // クリップボードが使えない環境では何もしない（URLは画面に表示している）
    }
  };

  return (
    <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <p className="text-xs font-bold text-slate-500">保護者と共有</p>
      <h2 className="mt-1 text-sm font-bold text-slate-900">進み具合だけを見せるリンク</h2>
      <p className="mt-2 text-xs leading-relaxed text-slate-500">
        このリンクを開くと、書いた文章や面接の回答内容そのものは見えず、対策の進み具合（何を対策中か・どれくらい進んだか）と各アプリの最終利用日だけが見えます。ログインは不要です。
      </p>

      {!shareUrl ? (
        <ActionForm action={createParentShareLinkAction} className="mt-4">
          <SubmitButton
            pendingLabel="作成中…"
            className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-indigo-500"
          >
            共有リンクを作る
          </SubmitButton>
        </ActionForm>
      ) : (
        <div className="mt-4">
          <div className="flex flex-col gap-2 rounded-lg bg-slate-50 p-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="break-all text-xs text-slate-600">{shareUrl}</p>
            <button
              type="button"
              onClick={copy}
              className="shrink-0 rounded-xl border border-slate-300 px-4 py-2 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-50"
            >
              {copied ? "コピーしました" : "リンクをコピー"}
            </button>
          </div>
          <ActionForm action={regenerateParentShareLinkAction} className="mt-3">
            <SubmitButton
              pendingLabel="作り直し中…"
              className="text-xs font-bold text-slate-500 underline underline-offset-2 hover:text-slate-700"
            >
              リンクを作り直す（前のリンクは使えなくなります）
            </SubmitButton>
          </ActionForm>
        </div>
      )}
    </section>
  );
}
