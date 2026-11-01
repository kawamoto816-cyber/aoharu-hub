"use client";

import dynamic from "next/dynamic";

// 中学英単語1200・英熟語500 のトップ (今日の修行) と修行画面。ブラウザだけで描く。

export const ChuTodayLoader = dynamic(
  () =>
    Promise.all([import("@/components/deck/DeckToday"), import("@/lib/chutango")]).then(([m, d]) => {
      function ChuToday() {
        return (
          <m.DeckToday
            deckKey="chu-tango"
            unit="語"
            play="/learn/chu-tango/play"
            allIds={d.CHU_WORDS.map((w) => String(w.no))}
            groups={[1, 2, 3].map((g) => ({ key: String(g), title: `中${g}`, sub: "400語", ids: d.CHU_WORDS.filter((w) => w.g === g).map((w) => String(w.no)), href: `/learn/chu-tango/play?g=${g}` }))}
          />
        );
      }
      return ChuToday;
    }),
  { ssr: false, loading: () => <p className="m-0 text-sm text-[#3A3D55]">読み込んでいます…</p> },
);

export const JukugoTodayLoader = dynamic(
  () =>
    Promise.all([import("@/components/deck/DeckToday"), import("@/lib/jukugo")]).then(([m, d]) => {
      function JukugoToday() {
        return (
          <m.DeckToday
            deckKey="jukugo"
            unit="こ"
            play="/learn/jukugo/play"
            allIds={d.JUKUGO.map((w) => String(w.no))}
            groups={[
              { key: "1", title: "No.1〜250", sub: "最頻出", ids: d.JUKUGO.filter((w) => w.no <= 250).map((w) => String(w.no)), href: "/learn/jukugo/play?g=1" },
              { key: "2", title: "No.251〜500", sub: "頻出", ids: d.JUKUGO.filter((w) => w.no > 250).map((w) => String(w.no)), href: "/learn/jukugo/play?g=2" },
            ]}
          />
        );
      }
      return JukugoToday;
    }),
  { ssr: false, loading: () => <p className="m-0 text-sm text-[#3A3D55]">読み込んでいます…</p> },
);

export const VocabPlayLoader = dynamic(
  () =>
    Promise.all([import("@/components/deck/DeckSession"), import("./vocabDecks")]).then(([m, d]) => {
      function VocabPlay({ which }: { which: "chu" | "jukugo" }) {
        const q = new URLSearchParams(window.location.search);
        const g = q.get("g") ?? undefined;
        return <m.DeckSession deck={which === "chu" ? d.chuDeck : d.jukugoDeck} group={g && /^[123]$/.test(g) ? g : undefined} extra={q.get("extra") === "1"} />;
      }
      return VocabPlay;
    }),
  { ssr: false, loading: () => <p className="m-0 text-center text-sm text-[#3A3D55]">準備しています…</p> },
);
