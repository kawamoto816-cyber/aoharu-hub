"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

// テンサクンの結果の画面の「ひとこと送る」。書き直して2回目以上の添削をした人に出す。
// 名前・学校名は聞かない（学年と点数の変化だけ）。載せてよいかは本人が選ぶ。
const GRADES = ["高1", "高2", "高3", "既卒", "その他"] as const;

export function VoiceForm({ kind, before, after }: { kind: string; before: number | null; after: number }) {
  const [open, setOpen] = useState(false);
  const [grade, setGrade] = useState<string>("");
  const [comment, setComment] = useState("");
  const [consent, setConsent] = useState(true);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function send() {
    if (!grade || comment.trim().length < 5) return;
    setState("sending");
    try {
      const res = await fetch("/api/voices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, grade, before, after, comment, consent }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("done");
      trackEvent("voice_submit", { kind, consent: consent ? 1 : 0 });
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return <p className="mb-0 mt-5 rounded-xl bg-[#E7F6EC] px-4 py-3 text-sm font-bold text-[#1B7F3B]">ありがとうございます。いただいたひとことは、アオハルOSをよくするために読ませていただきます。</p>;
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          trackEvent("voice_open", { kind });
        }}
        className="mt-5 w-full rounded-xl border-[1.5px] border-dashed border-[#15172B]/40 px-4 py-3 text-sm font-bold text-[#3A3D55]"
      >
        使ってみてどうでしたか？ ひとこと送る（30秒）
      </button>
    );
  }

  return (
    <div className="mt-5 rounded-xl border-[1.5px] border-[#15172B]/30 bg-white p-4">
      <p className="m-0 text-sm font-bold">使ってみてどうでしたか？</p>
      <p className="mb-0 mt-1 text-xs text-[#5A5D73]">名前や学校名は書かないでください。</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {GRADES.map((g) => (
          <button
            key={g}
            type="button"
            aria-pressed={grade === g}
            onClick={() => setGrade(g)}
            className={`min-h-[36px] rounded-full border-[1.5px] border-[#15172B] px-3 text-xs font-bold ${grade === g ? "bg-[#15172B] text-white" : "bg-white"}`}
          >
            {g}
          </button>
        ))}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value.slice(0, 200))}
        rows={3}
        placeholder="例: 具体例が足りないと言われて直したら、点が上がった。何を直せばいいかが分かるのがよかった。"
        className="mt-3 w-full rounded-lg border border-[#C9C7BC] p-2 text-sm leading-relaxed"
      />
      <label className="mt-2 flex items-start gap-2 text-xs leading-relaxed text-[#3A3D55]">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5" />
        名前を出さずに（学年と点数の変化だけで）、アオハルOSのサイトに載せてもよい
      </label>
      <button
        type="button"
        onClick={send}
        disabled={!grade || comment.trim().length < 5 || state === "sending"}
        className="mt-3 min-h-[44px] w-full rounded-xl bg-[#15172B] text-sm font-bold text-white disabled:opacity-50"
      >
        {state === "sending" ? "送っています…" : "送る"}
      </button>
      {state === "error" && <p className="mb-0 mt-2 text-xs font-bold text-[#B42318]">送れませんでした。少し時間をおいてもう一度お試しください。</p>}
    </div>
  );
}
