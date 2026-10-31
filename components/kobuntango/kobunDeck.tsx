"use client";

import type { DeckDef } from "@/lib/deck/types";
import { KOBUN_GROUPS, KOBUN_WORDS } from "@/lib/kobuntango";
import type { KobunWord } from "@/lib/kobuntango/types";

// 古文単語300 の「カードの束」。easy: 単語→意味の4択、hard: 意味→単語の4択 (同じ品詞を優先)。

const BY = new Map(KOBUN_WORDS.map((w) => [String(w.no), w]));
function sample<T>(xs: T[], n: number): T[] {
  const pool = [...xs];
  const out: T[] = [];
  while (out.length < n && pool.length) out.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
  return out;
}
const shuffle = <T,>(xs: T[]) => sample(xs, xs.length);
const first = (m: string) => m.split("、")[0];

export function KobunCard({ w }: { w: KobunWord }) {
  return (
    <div className="rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-5 shadow-[4px_4px_0_#15172B]">
      <div className="flex items-baseline gap-2">
        <span className="text-[11.5px] font-bold text-[#5A5D73]">No.{w.no}</span>
        <span className="rounded-full border border-[#15172B] px-2 text-[11px] font-black">{w.hin}</span>
      </div>
      <p className="m-0 mt-1 font-serif text-[34px] font-bold">{w.w}</p>
      <p className="m-0 mt-2 text-[18px] font-black">{w.m}</p>
      <div className="mt-3 rounded-xl bg-[#F7F6F1] p-3">
        <p className="m-0 font-serif text-[16px] leading-relaxed">{w.ex}</p>
        <p className="m-0 mt-1 text-[13.5px] text-[#3A3D55]">{w.exm}</p>
      </div>
    </div>
  );
}

export const kobunDeck: DeckDef = {
  key: "kobun-tango",
  title: "古文単語300",
  home: "/learn/kobun-tango",
  play: "/learn/kobun-tango/play",
  unit: "語",
  ids: (g) => {
    const gr = KOBUN_GROUPS.find((x) => x.key === g);
    return KOBUN_WORDS.filter((w) => !gr || (w.no >= gr.from && w.no <= gr.to)).map((w) => String(w.no));
  },
  card: (id) => <KobunCard w={BY.get(id)!} />,
  quiz: (id, level) => {
    const w = BY.get(id)!;
    const same = KOBUN_WORDS.filter((x) => x.no !== w.no && x.hin === w.hin);
    const wrong = [...sample(same, 3), ...sample(KOBUN_WORDS.filter((x) => x.no !== w.no), 3)].filter((x, i, a) => a.findIndex((y) => y.no === x.no) === i && first(x.m) !== first(w.m)).slice(0, 3);
    if (level === "easy") return { ask: "意味は？", prompt: <p className="m-0 font-serif text-[32px] font-bold">{w.w}</p>, options: shuffle([first(w.m), ...wrong.map((x) => first(x.m))]), answer: first(w.m) };
    return { ask: "この意味の古文単語は？", prompt: <p className="m-0 text-[20px] font-black">{w.m}</p>, options: shuffle([w.w, ...wrong.map((x) => x.w)]), answer: w.w };
  },
};
