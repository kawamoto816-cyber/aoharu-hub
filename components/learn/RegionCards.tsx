"use client";

import Link from "next/link";
import type { LearnRegionTopic } from "@/lib/learn/types";
import { useProgress } from "./useProgress";

// 領域のカード一覧。章ごとに並べ、各カードの状態 (習得・覚えた・つぎ・まだ) を色で見せる。

const LOOK = {
  done: { box: "border-[#15172B] bg-[#1533B8] text-white shadow-[3px_3px_0_#15172B]", chip: "bg-white text-[#1533B8]", label: "習得" },
  quiz: { box: "border-[#15172B] bg-[#FFF6C4] text-[#15172B] shadow-[3px_3px_0_#15172B]", chip: "bg-[#FFE45C] text-[#15172B]", label: "覚えた" },
  next: { box: "border-[#D9341F] bg-white text-[#15172B] shadow-[3px_3px_0_#D9341F]", chip: "bg-[#D9341F] text-white", label: "つぎ" },
  none: { box: "border-[#9A9CB0] bg-white text-[#3A3D55]", chip: "bg-[#EEEDE7] text-[#3A3D55]", label: "まだ" },
} as const;

export function RegionCards({ topic }: { topic: LearnRegionTopic }) {
  const progress = useProgress();
  const nextNo = topic.cards.find((c) => !progress[c.id])?.no ?? null;
  const done = topic.cards.filter((c) => progress[c.id] === "done").length;
  const learned = topic.cards.filter((c) => progress[c.id]).length;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 rounded-2xl border-[1.5px] border-[#15172B] bg-white px-4 py-3">
        <p className="m-0 text-sm font-black">
          習得 {done} / {topic.cards.length}　覚えた {learned - done}
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-bold text-[#3A3D55]">
          <span className="flex items-center gap-1"><span aria-hidden="true" className="h-3 w-3 rounded-full border-[1.5px] border-[#15172B] bg-[#1533B8]" />習得（アプリで試した）</span>
          <span className="flex items-center gap-1"><span aria-hidden="true" className="h-3 w-3 rounded-full border-[1.5px] border-[#15172B] bg-[#FFE45C]" />覚えた（三択に正解）</span>
          <span className="flex items-center gap-1"><span aria-hidden="true" className="h-3 w-3 rounded-full border-[1.5px] border-[#9A9CB0] bg-white" />まだ</span>
        </div>
      </div>

      {topic.chapters.map((ch) => (
        <section key={ch.no} aria-labelledby={`ch-${ch.no}`}>
          <h2 id={`ch-${ch.no}`} className="m-0 text-lg font-black">
            第{ch.no}章　{ch.title}
          </h2>
          <p className="m-0 mt-1 text-[13px] text-[#3A3D55]">{ch.summary}</p>
          <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {topic.cards
              .filter((c) => c.chapter === ch.no)
              .map((c) => {
                const st = progress[c.id] ?? (c.no === nextNo ? "next" : "none");
                const look = LOOK[st];
                return (
                  <Link key={c.id} href={`${topic.basePath}/${c.no}`} className={`flex min-h-[96px] flex-col gap-2 rounded-[14px] border-[1.5px] px-3 py-2.5 no-underline ${look.box}`}>
                    <span className="flex items-center justify-between">
                      <span className="text-[11px] font-black">No.{c.no}</span>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-black ${look.chip}`}>{look.label}</span>
                    </span>
                    <span className="text-[14px] font-black leading-snug">{c.title}</span>
                  </Link>
                );
              })}
          </div>
          <p className="m-0 mt-2.5 text-[12.5px] font-bold text-[#1533B8]">章の仕上げ：{topic.tryApp.name}で「{ch.tryText}」</p>
        </section>
      ))}
    </div>
  );
}
