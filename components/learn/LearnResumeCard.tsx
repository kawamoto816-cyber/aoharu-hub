"use client";

import Link from "next/link";
import { TOPICS } from "@/lib/learn/topics";
import { trackEvent } from "@/lib/analytics";
import { useProgress } from "./useProgress";
import { LearnSync } from "./LearnSync";

// マイページ (ログイン後のトップ) に置く「まなぶ」の入口。
// 領域ごと (自分を知る・志望校を知る・志望理由書・小論文・面接) に1行ずつ、進めたカードがあればその続きから開けるようにする。
const REGION: Record<string, string> = { jibun: "自分を知る", daigaku: "志望校を知る", shiboriyusho: "書く", shoronbun: "書く", mensetsu: "話す" };

export function LearnResumeCard() {
  const progress = useProgress();

  return (
    <section className="mt-8 rounded-2xl border-[1.5px] border-[#15172B] bg-[#FFFBE6] p-5 shadow-[4px_4px_0_#15172B] sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="m-0 text-base font-black text-slate-900">まなぶ：カードで合格に必要な力を集める</p>
        <Link href="/learn" className="text-sm font-bold text-[#1533B8]">
          スキル盤を見る
        </Link>
      </div>
      <ul className="m-0 mt-4 flex list-none flex-col gap-3 p-0">
        {TOPICS.map((t) => {
          const cards = t.cards;
          const learned = cards.filter((c) => progress[c.id]).length;
          const done = cards.filter((c) => progress[c.id] === "done").length;
          const next = cards.find((c) => !progress[c.id]);
          const started = learned > 0;
          const href = next ? `${t.basePath}/${next.no}` : t.basePath;
          return (
            <li key={t.key} className="flex flex-wrap items-center gap-3 rounded-xl border-[1.5px] border-[#15172B] bg-white px-4 py-3">
              <div className="min-w-0 flex-1">
                <p className="m-0 text-xs font-bold text-slate-600">
                  {REGION[t.key] ?? "まなぶ"}：{t.label}
                </p>
                <p className="m-0 mt-0.5 text-[15px] font-black text-slate-900">
                  {started ? (next ? `続きから：No.${next.no} ${next.title}` : `${cards.length}枚すべて覚えました`) : `${t.label}のコツを${cards.length}枚のカードで学ぶ`}
                </p>
                <p className="m-0 mt-0.5 text-xs text-slate-600">{started ? `覚えた ${learned} / ${cards.length}　習得 ${done}` : `めくって図解・三択で確認。章の終わりに${t.tryApp.name}で試せます。`}</p>
              </div>
              <Link
                href={href}
                onClick={() => trackEvent("learn_entry_click", { location: "mypage", topic: t.key })}
                className="inline-flex min-h-[44px] items-center rounded-xl border-[1.5px] border-[#15172B] bg-[#1533B8] px-4 text-sm font-black text-white no-underline"
              >
                {started ? "続きをめくる" : "1枚目からめくる"}
              </Link>
            </li>
          );
        })}
      </ul>
      <LearnSync />
    </section>
  );
}
