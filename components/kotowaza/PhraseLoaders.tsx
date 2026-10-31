"use client";

import dynamic from "next/dynamic";

export const PhraseTodayLoader = dynamic(
  () =>
    Promise.all([import("@/components/deck/DeckToday"), import("@/lib/kotowaza/data")]).then(([m, d]) => {
      const KINDS = ["ことわざ", "慣用句", "故事成語", "四字熟語"] as const;
      function PhraseToday() {
        return (
          <m.DeckToday
            deckKey="kotowaza"
            unit="こ"
            play="/learn/kotowaza/play"
            allIds={d.PHRASES.map((p) => p.p)}
            groups={KINDS.map((k) => {
              const ps = d.PHRASES.filter((p) => p.kind === k);
              return { key: k, title: k, sub: `${ps.length}こ`, ids: ps.map((p) => p.p), href: `/learn/kotowaza/play?g=${encodeURIComponent(k)}` };
            })}
          />
        );
      }
      return PhraseToday;
    }),
  { ssr: false, loading: () => <p className="m-0 text-sm text-[#3A3D55]">読み込んでいます…</p> },
);

export const PhrasePlayLoader = dynamic(
  () =>
    Promise.all([import("@/components/deck/DeckSession"), import("./phraseDeck")]).then(([m, d]) => {
      function PhrasePlay() {
        const q = new URLSearchParams(window.location.search);
        const g = q.get("g") ?? undefined;
        return <m.DeckSession deck={d.phraseDeck} group={g && ["ことわざ", "慣用句", "故事成語", "四字熟語"].includes(g) ? g : undefined} extra={q.get("extra") === "1"} />;
      }
      return PhrasePlay;
    }),
  { ssr: false, loading: () => <p className="m-0 text-center text-sm text-[#3A3D55]">準備しています…</p> },
);
