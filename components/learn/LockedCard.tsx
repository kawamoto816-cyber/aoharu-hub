"use client";

import { useEffect, useState } from "react";
import { CardPlayer } from "./CardPlayer";
import { Diagram } from "./Diagram";
import { ProGate } from "./ProGate";
import { trackEvent } from "@/lib/analytics";
import type { LearnCard, LearnTryApp } from "@/lib/learn/types";

// 裏面の Pro のカード。本文はページに入れず、開いたときに /api/learn/card から受けとる。
// Pro なら通常のカードと同じように遊べる。そうでなければ表の一文と Pro の案内を出す。

type State = { kind: "loading" } | { kind: "ok"; card: LearnCard } | { kind: "signed_out" } | { kind: "pro_only" } | { kind: "error" };

export function LockedCard({
  topicKey,
  stub,
  badge,
  tryApp,
  total,
  handFont,
  regionPath,
  tryHref,
  nextHref,
  nextLabel,
  chapterEnd,
}: {
  topicKey: string;
  stub: LearnCard;
  badge: string;
  tryApp: LearnTryApp;
  total: number;
  handFont: string;
  regionPath: string;
  tryHref: string;
  nextHref: string;
  nextLabel: string;
  chapterEnd: boolean;
}) {
  const [state, setState] = useState<State>({ kind: "loading" });

  useEffect(() => {
    let alive = true;
    fetch(`/api/learn/card?topic=${encodeURIComponent(topicKey)}&no=${stub.no}`, { cache: "no-store" })
      .then(async (res) => {
        if (!alive) return;
        if (res.status === 401) return setState({ kind: "signed_out" });
        if (res.status === 402) return setState({ kind: "pro_only" });
        if (!res.ok) return setState({ kind: "error" });
        const data = (await res.json()) as { card: LearnCard };
        if (alive) setState({ kind: "ok", card: data.card });
      })
      .catch(() => alive && setState({ kind: "error" }));
    return () => {
      alive = false;
    };
  }, [topicKey, stub.no]);

  useEffect(() => {
    if (state.kind === "signed_out" || state.kind === "pro_only") trackEvent("learn_pro_gate_view", { topic: topicKey, card: stub.id, state: state.kind });
  }, [state.kind, topicKey, stub.id]);

  if (state.kind === "ok") {
    const card = state.card;
    return (
      <CardPlayer
        card={card}
        badge={badge}
        tryApp={tryApp}
        total={total}
        handFont={handFont}
        regionPath={regionPath}
        tryHref={tryHref}
        nextHref={nextHref}
        nextLabel={nextLabel}
        chapterEnd={chapterEnd}
        diagram={<Diagram data={card.diagram} title={card.diagramTitle} />}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-[20px] border-[1.5px] border-[#15172B] bg-white p-5 shadow-[6px_6px_0_#15172B]">
        <p className="m-0 flex items-center justify-between text-[11px] font-black text-[#3A3D55]">
          <span>{badge}　No.{stub.no} / {total}</span>
          <span className="rounded-full bg-[#15172B] px-2 py-0.5 text-[#FFE45C]">Pro</span>
        </p>
        <p className="m-0 mt-3 text-[13px] font-bold text-[#3A3D55]">{stub.title}</p>
        <p className={`${handFont} m-0 mt-2 text-[24px] leading-snug`}>{stub.front}</p>
      </div>
      {state.kind === "loading" && <p className="m-0 text-center text-sm text-[#3A3D55]">カードを開いています…</p>}
      {state.kind === "error" && <p className="m-0 text-center text-sm font-bold text-[#B42318]">カードを開けませんでした。少し時間をおいてもう一度お試しください。</p>}
      {(state.kind === "signed_out" || state.kind === "pro_only") && <ProGate state={state.kind} returnUrl={`${regionPath}/${stub.no}`} location="learn_card_pro" what="カード" />}
    </div>
  );
}
