"use client";

import dynamic from "next/dynamic";
import { Suspense, use } from "react";
import { loadTermSet } from "@/lib/terms/load";
import type { TermSet, TermSetKey } from "@/lib/terms/meta";

// 重要語句のトップ (今日の修行・グループごとの進み具合) と修行画面。ブラウザだけで描き、そのセットのデータだけ読む。

const cache = new Map<TermSetKey, Promise<TermSet>>();
const setPromise = (k: TermSetKey) => {
  let p = cache.get(k);
  if (!p) cache.set(k, (p = loadTermSet(k)));
  return p;
};
const loading = (text: string) => <p className="m-0 text-sm text-[#3A3D55]">{text}</p>;

const TodayInner = dynamic(
  () =>
    Promise.all([import("@/components/deck/DeckToday"), import("@/lib/terms/meta")]).then(([m, t]) => {
      function TermToday({ setKey }: { setKey: TermSetKey }) {
        const set = use(setPromise(setKey));
        return (
          <m.DeckToday
            deckKey={`terms-${setKey}`}
            kids={setKey === "rika" || setKey === "shakai"}
            unit="語"
            play={`/learn/${setKey}/play`}
            allIds={set.units.flatMap((u) => u.items.map((x) => t.termId(u.unit, x)))}
            groups={t.setGroups(set).map((g) => {
              const us = set.units.filter((u) => t.unitGroup(u.unit) === g);
              return { key: g, title: g, sub: `${us.length}単元`, ids: us.flatMap((u) => u.items.map((x) => t.termId(u.unit, x))), href: `/learn/${setKey}/play?g=${encodeURIComponent(g)}` };
            })}
          />
        );
      }
      return TermToday;
    }),
  { ssr: false, loading: () => loading("読み込んでいます…") },
);

const PlayInner = dynamic(
  () =>
    Promise.all([import("@/components/deck/DeckSession"), import("./termDeck")]).then(([m, d]) => {
      const decks = new Map<TermSetKey, ReturnType<typeof d.makeTermDeck>>();
      function TermPlay({ setKey }: { setKey: TermSetKey }) {
        const set = use(setPromise(setKey));
        let deck = decks.get(setKey);
        if (!deck) decks.set(setKey, (deck = d.makeTermDeck(set)));
        const q = new URLSearchParams(window.location.search);
        const g = q.get("g") ?? undefined;
        return <m.DeckSession deck={deck} group={g && g.length < 60 ? g : undefined} extra={q.get("extra") === "1"} />;
      }
      return TermPlay;
    }),
  { ssr: false, loading: () => loading("準備しています…") },
);

export function TermTodayLoader({ setKey }: { setKey: TermSetKey }) {
  return (
    <Suspense fallback={loading("読み込んでいます…")}>
      <TodayInner setKey={setKey} />
    </Suspense>
  );
}

export function TermPlayLoader({ setKey }: { setKey: TermSetKey }) {
  return (
    <Suspense fallback={loading("準備しています…")}>
      <PlayInner setKey={setKey} />
    </Suspense>
  );
}
