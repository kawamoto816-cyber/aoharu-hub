"use client";

import { useState } from "react";

// 文面を見せて、ボタンでクリップボードに写す（社内の出席表・週報で、LINEに貼る文面に使う）。
// 写せない環境（権限がないなど）では、文面を選んだ状態にして手で写せるようにする。
export function CopyText({ text, label = "コピー" }: { text: string; label?: string }) {
  const [state, setState] = useState<"idle" | "done" | "failed">("idle");

  async function copy(el: HTMLElement | null) {
    try {
      await navigator.clipboard.writeText(text);
      setState("done");
    } catch {
      if (el) window.getSelection()?.selectAllChildren(el);
      setState("failed");
    }
    window.setTimeout(() => setState("idle"), 2500);
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <pre className="whitespace-pre-wrap break-words font-sans text-xs leading-relaxed text-slate-800">{text}</pre>
      <button
        type="button"
        onClick={(e) => void copy(e.currentTarget.previousElementSibling as HTMLElement | null)}
        className="mt-2 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-indigo-500"
      >
        {state === "done" ? "コピーしました" : state === "failed" ? "選択しました（手でコピーしてください）" : label}
      </button>
    </div>
  );
}
