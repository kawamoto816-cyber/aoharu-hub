"use client";

import type { DeckDef } from "@/lib/deck/types";
import { TERM_SETS, findTerm, termId, unitGrade, unitName, type TermSet } from "@/lib/terms";

// 理科・社会の重要語句の「カードの束」。
//   easy: 説明を読んで、語句を4択で (同じ単元の語句から)
//   hard: 語句を見て、説明を4択で

function sample<T>(xs: T[], n: number): T[] {
  const pool = [...xs];
  const out: T[] = [];
  while (out.length < n && pool.length) out.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
  return out;
}
const shuffle = <T,>(xs: T[]) => sample(xs, xs.length);

function TermCard({ set, id }: { set: TermSet; id: string }) {
  const f = findTerm(set, id)!;
  return (
    <div className="rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-5 shadow-[4px_4px_0_#15172B]">
      <p className="m-0 text-[12px] font-black text-[#1533B8]">
        {unitGrade(f.unit)}年・{unitName(f.unit)}
      </p>
      <p className="m-0 mt-1">
        <ruby className="text-[30px] font-black">
          {f.item.t}
          <rt className="text-[11px] font-bold">{f.item.y}</rt>
        </ruby>
      </p>
      <p className="m-0 mt-3 rounded-xl bg-[#F7F6F1] p-3 text-[16px] leading-relaxed">{f.item.d}</p>
    </div>
  );
}

export function makeTermDeck(key: "rika" | "shakai"): DeckDef {
  const set = TERM_SETS[key];
  const all = set.units.flatMap((u) => u.items.map((t) => ({ unit: u.unit, t })));
  return {
    key: `terms-${key}`,
    title: `${set.name}の重要語句`,
    home: `/learn/${key}`,
    play: `/learn/${key}/play`,
    unit: "語",
    ids: (g) => set.units.filter((u) => !g || u.unit === g || String(unitGrade(u.unit)) === g).flatMap((u) => u.items.map((t) => termId(u.unit, t))),
    card: (id) => <TermCard set={set} id={id} />,
    quiz: (id, level) => {
      const f = findTerm(set, id)!;
      const same = all.filter((x) => x.unit === f.unit && x.t.t !== f.item.t);
      const near = all.filter((x) => x.unit !== f.unit && unitGrade(x.unit) === unitGrade(f.unit));
      const wrong = [...sample(same, 3), ...sample(near, 3)].filter((x, i, a) => a.findIndex((y) => y.t.t === x.t.t) === i).slice(0, 3);
      if (level === "easy")
        return {
          ask: "この説明にあう言葉は？",
          prompt: <p className="m-0 text-[18px] font-bold leading-relaxed">{f.item.d}</p>,
          options: shuffle([f.item.t, ...wrong.map((x) => x.t.t)]),
          answer: f.item.t,
        };
      return {
        ask: "この言葉の説明は？",
        prompt: <p className="m-0 text-[28px] font-black">{f.item.t}</p>,
        options: shuffle([f.item.d, ...wrong.map((x) => x.t.d)]),
        answer: f.item.d,
      };
    },
  };
}
