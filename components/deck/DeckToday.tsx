"use client";

import Link from "next/link";
import { deckStore, dueIn, LEARNED_BOX, MASTER_BOX } from "@/lib/deck/store";

// 「今日の修行」パネルと、グループ (学年・地方など) ごとの進み具合。

export interface DeckGroup {
  key: string;
  title: string;
  sub?: string;
  ids: string[];
  href: string;
}

export function DeckToday({ deckKey, unit, play, allIds, groups }: { deckKey: string; unit: string; play: string; allIds: string[]; groups: DeckGroup[] }) {
  const store = deckStore(deckKey);
  const p = store.use();
  const due = dueIn(p, allIds);
  const unseen = allIds.filter((id) => !p.w[id]).length;
  const newToday = Math.min(Math.max(0, p.perDay - p.newToday), unseen);
  const learned = allIds.filter((id) => (p.w[id]?.b ?? 0) >= LEARNED_BOX).length;
  const mastered = allIds.filter((id) => (p.w[id]?.b ?? 0) >= MASTER_BOX).length;
  const any = due + newToday > 0;
  return (
    <div>
      <section className="rounded-[20px] border-[1.5px] border-[#15172B] bg-[#FFFBE6] p-5 shadow-[5px_5px_0_#15172B]">
        <p className="m-0 text-[12px] font-black tracking-wider text-[#1533B8]">TODAY　今日の修行</p>
        <div className="mt-2 flex flex-wrap items-baseline gap-x-5 gap-y-1">
          <p className="m-0 text-[15px] font-bold">
            復習 <span className="text-[28px] font-black">{due}</span> {unit}
          </p>
          <p className="m-0 text-[15px] font-bold">
            新しく <span className="text-[28px] font-black">{newToday}</span> {unit}
          </p>
        </div>
        <Link href={any ? play : `${play}?extra=1`} className="mt-4 flex min-h-[56px] items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] bg-[#1533B8] text-[17px] font-black text-white no-underline shadow-[0_4px_0_#0B1F7A]">
          {any ? "今日の修行をはじめる" : `あと10${unit}、新しく覚える`}
        </Link>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-[13px] font-bold text-[#3A3D55]">1日に新しく</span>
          {[5, 10, 20].map((n) => (
            <button key={n} type="button" aria-pressed={p.perDay === n} onClick={() => store.setPerDay(n)} className={`min-h-[36px] rounded-full border-[1.5px] border-[#15172B] px-3 text-[13px] font-black ${p.perDay === n ? "bg-[#15172B] text-white" : "bg-white text-[#15172B]"}`}>
              {n}
              {unit}
            </button>
          ))}
        </div>
        <p className="m-0 mt-3 text-[12.5px] text-[#3A3D55]">
          覚えた {learned}・マスター {mastered} / 全{allIds.length}
          {unit}
        </p>
      </section>
      <ul className="m-0 mt-6 grid list-none grid-cols-2 gap-2.5 p-0 sm:grid-cols-3">
        {groups.map((g) => {
          const got = g.ids.filter((id) => (p.w[id]?.b ?? 0) >= LEARNED_BOX).length;
          const seen = g.ids.filter((id) => p.w[id]).length;
          return (
            <li key={g.key}>
              <Link href={g.href} className="block rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-3 text-[#15172B] no-underline shadow-[3px_3px_0_#15172B]">
                <span className="block text-[17px] font-black">{g.title}</span>
                {g.sub && <span className="block text-[11.5px] text-[#3A3D55]">{g.sub}</span>}
                <span className="mt-2 block h-2 overflow-hidden rounded-full bg-[#E6E4DA]">
                  <span className="block h-full bg-[#1533B8]" style={{ width: `${(got / g.ids.length) * 100}%` }} />
                </span>
                <span className="mt-1 block text-[11.5px] font-bold text-[#3A3D55]">
                  覚えた {got} / {g.ids.length}・見た {seen}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
