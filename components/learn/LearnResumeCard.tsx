"use client";

import Link from "next/link";
import { SHORONBUN } from "@/lib/learn/shoronbun";
import { trackEvent } from "@/lib/analytics";
import { useProgress } from "./useProgress";

// マイページ (ログイン後のトップ) に置く「まなぶ」の入口。
// この端末で進めたカードがあれば、その続きから開けるようにする。
export function LearnResumeCard() {
  const progress = useProgress();
  const cards = SHORONBUN.cards;
  const learned = cards.filter((c) => progress[c.id]).length;
  const done = cards.filter((c) => progress[c.id] === "done").length;
  const next = cards.find((c) => !progress[c.id]);
  const started = learned > 0;
  const href = next ? `/learn/shoronbun/${next.no}` : "/learn/shoronbun";

  return (
    <section className="mt-8 rounded-2xl border-[1.5px] border-[#15172B] bg-[#FFFBE6] p-5 shadow-[4px_4px_0_#15172B] sm:p-6">
      <div className="flex flex-wrap items-center gap-4">
        <span aria-hidden="true" className="flex h-14 w-12 flex-none items-center justify-center rounded-lg border-[1.5px] border-[#15172B] bg-[#1533B8] text-xs font-black text-white">
          まなぶ
        </span>
        <div className="min-w-0 flex-1">
          <p className="m-0 text-xs font-bold text-slate-600">まなぶ：書く・小論文</p>
          <p className="m-0 mt-1 text-base font-black text-slate-900">
            {started ? (next ? `続きから：No.${next.no} ${next.title}` : "20枚すべて覚えました") : "小論文のコツを20枚のカードで学ぶ"}
          </p>
          <p className="m-0 mt-1 text-xs text-slate-600">
            {started ? `覚えた ${learned} / ${cards.length}　習得 ${done}` : "めくって図解・三択で確認。章の終わりにテンサクンで試せます。"}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href={href}
            onClick={() => trackEvent("learn_entry_click", { location: "mypage" })}
            className="inline-flex min-h-[44px] items-center rounded-xl border-[1.5px] border-[#15172B] bg-[#1533B8] px-4 text-sm font-black text-white no-underline"
          >
            {started ? "続きをめくる" : "1枚目からめくる"}
          </Link>
          <Link href="/learn" className="inline-flex min-h-[44px] items-center rounded-xl border-[1.5px] border-[#15172B] bg-white px-4 text-sm font-bold text-slate-900 no-underline">
            スキル盤を見る
          </Link>
        </div>
      </div>
    </section>
  );
}
