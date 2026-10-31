"use client";

import dynamic from "next/dynamic";

export const KobunTodayLoader = dynamic(
  () =>
    Promise.all([import("@/components/deck/DeckToday"), import("@/lib/kobuntango")]).then(([m, d]) => {
      function KobunToday() {
        return (
          <m.DeckToday
            deckKey="kobun-tango"
            unit="語"
            play="/learn/kobun-tango/play"
            allIds={d.KOBUN_WORDS.map((w) => String(w.no))}
            groups={d.KOBUN_GROUPS.map((g) => ({ key: g.key, title: g.title, sub: g.key === "1" ? "最重要" : g.key === "2" ? "最重要〜重要" : "重要", ids: d.KOBUN_WORDS.filter((w) => w.no >= g.from && w.no <= g.to).map((w) => String(w.no)), href: `/learn/kobun-tango/play?g=${g.key}` }))}
          />
        );
      }
      return KobunToday;
    }),
  { ssr: false, loading: () => <p className="m-0 text-sm text-[#3A3D55]">読み込んでいます…</p> },
);

export const KobunPlayLoader = dynamic(
  () =>
    Promise.all([import("@/components/deck/DeckSession"), import("./kobunDeck")]).then(([m, d]) => {
      function KobunPlay() {
        const q = new URLSearchParams(window.location.search);
        const g = q.get("g") ?? undefined;
        return <m.DeckSession deck={d.kobunDeck} group={g && /^[123]$/.test(g) ? g : undefined} extra={q.get("extra") === "1"} />;
      }
      return KobunPlay;
    }),
  { ssr: false, loading: () => <p className="m-0 text-center text-sm text-[#3A3D55]">準備しています…</p> },
);
