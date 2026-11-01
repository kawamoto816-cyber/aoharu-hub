"use client";

import dynamic from "next/dynamic";

export const PrefTodayLoader = dynamic(
  () =>
    Promise.all([import("@/components/deck/DeckToday"), import("@/lib/todofuken/data")]).then(([m, d]) => {
      function PrefToday() {
        return (
          <m.DeckToday
            deckKey="todofuken"
            kids
            unit="県"
            play="/learn/todofuken/play"
            allIds={d.PREFS.map((p) => p.name)}
            groups={d.REGIONS.map((r) => {
              const ps = d.PREFS.filter((p) => p.region === r);
              return { key: r, title: r, sub: ps.map((p) => p.name.replace(/(都|道|府|県)$/, "")).join("・"), ids: ps.map((p) => p.name), href: `/learn/todofuken/play?g=${encodeURIComponent(r)}` };
            })}
          />
        );
      }
      return PrefToday;
    }),
  { ssr: false, loading: () => <p className="m-0 text-sm text-[#3A3D55]">読み込んでいます…</p> },
);

export const PrefPlayLoader = dynamic(
  () =>
    Promise.all([import("@/components/deck/DeckSession"), import("./prefDeck"), import("@/lib/todofuken/data")]).then(([m, d, data]) => {
      function PrefPlay() {
        const q = new URLSearchParams(window.location.search);
        const g = q.get("g") ?? undefined;
        return <m.DeckSession deck={d.prefDeck} group={g && (data.REGIONS as readonly string[]).includes(g) ? g : undefined} extra={q.get("extra") === "1"} />;
      }
      return PrefPlay;
    }),
  { ssr: false, loading: () => <p className="m-0 text-center text-sm text-[#3A3D55]">準備しています…</p> },
);
