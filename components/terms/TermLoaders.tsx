"use client";

import dynamic from "next/dynamic";

// 理科・社会の重要語句のトップ (今日の修行・単元ごとの進み具合) と修行画面。ブラウザだけで描く。

export const TermTodayLoader = dynamic(
  () =>
    Promise.all([import("@/components/deck/DeckToday"), import("@/lib/terms")]).then(([m, t]) => {
      function TermToday({ setKey }: { setKey: "rika" | "shakai" }) {
        const set = t.TERM_SETS[setKey];
        const grades = [...new Set(set.units.map((u) => t.unitGrade(u.unit)))];
        return (
          <m.DeckToday
            deckKey={`terms-${setKey}`}
            unit="語"
            play={`/learn/${setKey}/play`}
            allIds={set.units.flatMap((u) => u.items.map((x) => t.termId(u.unit, x)))}
            groups={grades.map((g) => {
              const us = set.units.filter((u) => t.unitGrade(u.unit) === g);
              return { key: String(g), title: `${g}年生`, sub: `${us.length}単元`, ids: us.flatMap((u) => u.items.map((x) => t.termId(u.unit, x))), href: `/learn/${setKey}/play?g=${g}` };
            })}
          />
        );
      }
      return TermToday;
    }),
  { ssr: false, loading: () => <p className="m-0 text-sm text-[#3A3D55]">読み込んでいます…</p> },
);

export const TermPlayLoader = dynamic(
  () =>
    Promise.all([import("@/components/deck/DeckSession"), import("./termDeck")]).then(([m, d]) => {
      function TermPlay({ setKey }: { setKey: "rika" | "shakai" }) {
        const q = new URLSearchParams(window.location.search);
        const g = q.get("g") ?? undefined;
        return <m.DeckSession deck={d.makeTermDeck(setKey)} group={g && /^[\w-]+$/.test(g) ? g : undefined} extra={q.get("extra") === "1"} />;
      }
      return TermPlay;
    }),
  { ssr: false, loading: () => <p className="m-0 text-center text-sm text-[#3A3D55]">準備しています…</p> },
);
