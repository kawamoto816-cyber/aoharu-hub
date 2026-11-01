"use client";

import dynamic from "next/dynamic";

// 漢字のトップと修行画面は、この端末の進み具合から作るのでブラウザだけで描く。

export const KanjiTodayLoader = dynamic(
  () =>
    Promise.all([import("@/components/deck/DeckToday"), import("@/lib/kanji")]).then(([m, k]) => {
      function KanjiToday() {
        return (
          <m.DeckToday
            deckKey="kanji-e"
            kids
            unit="字"
            play="/learn/kanji/play"
            allIds={k.ALL_KANJI.map((e) => e.k)}
            groups={k.GRADES.map((x) => ({ key: String(x.g), title: `${x.g}年生`, sub: `${x.list.length}字`, ids: x.list.map((e) => e.k), href: `/learn/kanji/${x.g}` }))}
          />
        );
      }
      return KanjiToday;
    }),
  { ssr: false, loading: () => <p className="m-0 text-sm text-[#3A3D55]">読み込んでいます…</p> },
);

export const KanjiPlayLoader = dynamic(
  () =>
    Promise.all([import("@/components/deck/DeckSession"), import("./kanjiDeck")]).then(([m, d]) => {
      function KanjiPlay() {
        const q = new URLSearchParams(window.location.search);
        const g = q.get("g") ?? undefined;
        return <m.DeckSession deck={d.kanjiDeck} group={g && /^[1-6]$/.test(g) ? g : undefined} extra={q.get("extra") === "1"} />;
      }
      return KanjiPlay;
    }),
  { ssr: false, loading: () => <p className="m-0 text-center text-sm text-[#3A3D55]">準備しています…</p> },
);
