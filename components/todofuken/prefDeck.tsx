"use client";

import type { DeckDef } from "@/lib/deck/types";
import { PREFS, REGIONS, type Pref } from "@/lib/todofuken/data";

// 47都道府県の「カードの束」。id は都道府県名。
//   カード: 名前と読み・地方・都道府県庁所在地・特徴
//   easy: 「県庁所在地は？」(名前とちがう所在地の県) か「何地方？」
//   hard: 特徴から都道府県を選ぶ (同じ地方の中から)

const BY = new Map(PREFS.map((p) => [p.name, p]));
function sample<T>(xs: T[], n: number): T[] {
  const pool = [...xs];
  const out: T[] = [];
  while (out.length < n && pool.length) out.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
  return out;
}
const shuffle = <T,>(xs: T[]) => sample(xs, xs.length);
const stem = (p: Pref) => p.name.replace(/(都|道|府|県)$/, "");
const sameName = (p: Pref) => p.capital.startsWith(stem(p)) || p.code === 13;

export function PrefCard({ p }: { p: Pref }) {
  return (
    <div className="rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-5 shadow-[4px_4px_0_#15172B]">
      <p className="m-0 text-[12px] font-black text-[#1533B8]">{p.region}</p>
      <p className="m-0 mt-1">
        <ruby className="text-[36px] font-black">
          {p.name}
          <rt className="text-[12px] font-bold">{p.yomi}</rt>
        </ruby>
      </p>
      <p className="m-0 mt-3 text-[15px]">
        <span className="mr-2 rounded bg-[#15172B] px-1.5 py-0.5 text-[11px] font-black text-white">{p.code === 13 ? "都庁" : p.code === 1 ? "道庁" : p.code === 26 || p.code === 27 ? "府庁" : "県庁"}所在地</span>
        <ruby className="text-[20px] font-bold">
          {p.capital}
          <rt className="text-[10px]">{p.capitalYomi}</rt>
        </ruby>
      </p>
      <p className="m-0 mt-3 rounded-xl bg-[#F7F6F1] p-3 text-[15px] leading-relaxed">{p.feature}</p>
    </div>
  );
}

export const prefDeck: DeckDef = {
  key: "todofuken",
  title: "47都道府県",
  home: "/learn/todofuken",
  play: "/learn/todofuken/play",
  unit: "県",
  kids: true,
  ids: (g) => PREFS.filter((p) => !g || p.region === g).map((p) => p.name),
  card: (id) => <PrefCard p={BY.get(id)!} />,
  quiz: (id, level) => {
    const p = BY.get(id)!;
    if (level === "easy") {
      if (!sameName(p) && Math.random() < 0.7) {
        const wrong = sample(
          PREFS.filter((x) => x.code !== p.code && !sameName(x)),
          3,
        ).map((x) => x.capital);
        return { ask: "都道府県庁所在地は？", prompt: <p className="m-0 text-[32px] font-black">{p.name}</p>, options: shuffle([p.capital, ...wrong]), answer: p.capital };
      }
      const wrong = sample(
        REGIONS.filter((r) => r !== p.region),
        3,
      );
      return { ask: "何地方？", prompt: <p className="m-0 text-[32px] font-black">{p.name}</p>, options: shuffle([p.region, ...wrong]), answer: p.region };
    }
    const near = PREFS.filter((x) => x.code !== p.code && x.region === p.region);
    const far = PREFS.filter((x) => x.code !== p.code && x.region !== p.region);
    const wrong = [...sample(near, 3), ...sample(far, 3)].slice(0, 3).map((x) => x.name);
    return { ask: "これはどこ？", prompt: <p className="m-0 text-[18px] font-bold leading-relaxed">{p.feature}</p>, options: shuffle([p.name, ...wrong]), answer: p.name };
  },
};
