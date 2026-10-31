"use client";

import type { DeckDef } from "@/lib/deck/types";
import { PHRASES } from "@/lib/kotowaza/data";
import type { Phrase } from "@/lib/kotowaza/types";

// ことわざ・慣用句・故事成語・四字熟語の「カードの束」。id は言葉そのもの。
//   easy: 言葉を見て、意味を4択で (同じ種類から)
//   hard: 意味を読んで、言葉を4択で

const BY = new Map(PHRASES.map((p) => [p.p, p]));
function sample<T>(xs: T[], n: number): T[] {
  const pool = [...xs];
  const out: T[] = [];
  while (out.length < n && pool.length) out.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
  return out;
}
const shuffle = <T,>(xs: T[]) => sample(xs, xs.length);

export function PhraseCard({ p }: { p: Phrase }) {
  return (
    <div className="rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-5 shadow-[4px_4px_0_#15172B]">
      <p className="m-0 text-[12px] font-black text-[#1533B8]">{p.kind}</p>
      <p className="m-0 mt-1 text-[26px] font-black leading-snug">{p.p}</p>
      <p className="m-0 text-[13px] text-[#3A3D55]">{p.y}</p>
      <p className="m-0 mt-3 text-[16px] font-bold leading-relaxed">{p.m}</p>
      <p className="m-0 mt-3 rounded-xl bg-[#F7F6F1] p-3 text-[15px] leading-relaxed">{p.ex}</p>
    </div>
  );
}

export const phraseDeck: DeckDef = {
  key: "kotowaza",
  title: "ことわざ・慣用句",
  home: "/learn/kotowaza",
  play: "/learn/kotowaza/play",
  unit: "こ",
  ids: (g) => PHRASES.filter((p) => !g || p.kind === g).map((p) => p.p),
  card: (id) => <PhraseCard p={BY.get(id)!} />,
  quiz: (id, level) => {
    const p = BY.get(id)!;
    const wrong = sample(
      PHRASES.filter((x) => x.kind === p.kind && x.p !== p.p),
      3,
    );
    if (level === "easy")
      return { ask: "意味はどれ？", prompt: <p className="m-0 text-[24px] font-black leading-snug">{p.p}</p>, options: shuffle([p.m, ...wrong.map((x) => x.m)]), answer: p.m };
    return { ask: `この意味の${p.kind}は？`, prompt: <p className="m-0 text-[18px] font-bold leading-relaxed">{p.m}</p>, options: shuffle([p.p, ...wrong.map((x) => x.p)]), answer: p.p };
  },
};
