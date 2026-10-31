"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { buildDeckSession, deckStore, type DeckItem } from "@/lib/deck/store";
import type { DeckDef } from "@/lib/deck/types";
import { trackEvent } from "@/lib/analytics";

// 「①覚える」の共通の修行画面。新しいカードは見て覚えてから4択、復習は4択 (覚えたカードは仕上げの問題)。
// その日の最初の答えだけ記録し、まちがえたカードは最後にもう一度出す。

type Phase = { kind: "card" } | { kind: "quiz" } | { kind: "feedback"; ok: boolean; picked?: string };

const box = "rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-5 shadow-[4px_4px_0_#15172B]";
const bigBtn = "flex min-h-[56px] w-full items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] text-[17px] font-black no-underline";

export function DeckSession({ deck, group, extra }: { deck: DeckDef; group?: string; extra?: boolean }) {
  const store = deckStore(deck.key);
  const initial = useMemo(() => buildDeckSession(store.read(), deck.ids(group), { extra }), [store, deck, group, extra]);
  const [queue, setQueue] = useState<DeckItem[]>(initial);
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>(() => ({ kind: initial[0]?.mode === "learn" ? "card" : "quiz" }));
  const [score, setScore] = useState({ ok: 0, miss: 0 });
  const recorded = useRef(new Set<string>());
  const item = queue[idx];
  const quiz = useMemo(() => (item ? deck.quiz(item.id, item.mode === "hard" ? "hard" : "easy") : null), [deck, item, idx]); // eslint-disable-line react-hooks/exhaustive-deps
  const moreHref = `${deck.play}?${group ? `g=${group}&` : ""}extra=1`;

  const doneButtons = (
    <div className="mt-4 grid gap-2.5">
      <a href={moreHref} className={`${bigBtn} bg-[#FFE45C] text-[#15172B] shadow-[0_3px_0_#15172B]`}>
        あと10{deck.unit}、新しく覚える
      </a>
      <Link href={deck.home} className={`${bigBtn} min-h-[48px] bg-white text-[15px] text-[#15172B]`}>
        {deck.title}のトップへ
      </Link>
    </div>
  );

  if (initial.length === 0)
    return (
      <div className={box}>
        <p className="m-0 text-[18px] font-black">今日の修行はおしまいです</p>
        <p className="m-0 mt-2 text-[14px] leading-relaxed text-[#3A3D55]">復習も、今日の新しいカードも済んでいます。明日また、忘れかけたものが出てきます。</p>
        {doneButtons}
      </div>
    );

  if (!item || !quiz)
    return (
      <div className={box}>
        <p className="m-0 text-[22px] font-black text-[#1533B8]">修行完了！</p>
        <p className="m-0 mt-2 text-[14px]">
          一発で正解 {score.ok}・まちがえて覚え直し {score.miss}
        </p>
        <p className="m-0 mt-1 text-[13px] text-[#3A3D55]">まちがえたものは、明日また出てきます。続けて正解すると、出てくる間隔がのびていきます。</p>
        {doneButtons}
      </div>
    );

  function answer(ok: boolean, picked?: string) {
    if (!item) return;
    if (!recorded.current.has(item.id)) {
      recorded.current.add(item.id);
      store.record(item.id, ok);
      setScore((s) => (ok ? { ...s, ok: s.ok + 1 } : { ...s, miss: s.miss + 1 }));
      trackEvent("deck_answer", { deck: deck.key, mode: item.mode, ok });
    }
    if (!ok) setQueue((q) => [...q, { id: item.id, mode: "easy" }]);
    setPhase({ kind: "feedback", ok, picked });
  }

  function next() {
    const n = idx + 1;
    setIdx(n);
    setPhase({ kind: queue[n]?.mode === "learn" ? "card" : "quiz" });
    if (n >= queue.length) trackEvent("deck_session_finish", { deck: deck.key, ok: score.ok, miss: score.miss });
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-[13px] font-bold text-[#3A3D55]">
        <span>
          のこり {queue.length - idx}
          {deck.unit}
        </span>
        <span>
          正解 {score.ok}・覚え直し {score.miss}
        </span>
      </div>

      {phase.kind === "card" && (
        <>
          <p className="m-0 mb-2 text-[12px] font-black text-[#1533B8]">新しく覚える</p>
          {deck.card(item.id)}
          <button type="button" onClick={() => setPhase({ kind: "quiz" })} className={`${bigBtn} mt-4 bg-[#1533B8] text-white shadow-[0_4px_0_#0B1F7A]`}>
            覚えた！確かめる
          </button>
        </>
      )}

      {phase.kind === "quiz" && (
        <div className={box}>
          <p className="m-0 text-[12px] font-black text-[#1533B8]">{quiz.ask}</p>
          <div className="mt-2">{quiz.prompt}</div>
          <div className={`mt-4 grid gap-2 ${quiz.big ? "grid-cols-2" : ""}`}>
            {quiz.options.map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => answer(o === quiz.answer, o)}
                className={`flex items-center justify-center rounded-[12px] border-[1.5px] border-[#15172B] bg-white px-3 font-bold text-[#15172B] ${quiz.big ? "min-h-[76px] font-serif text-[36px]" : "min-h-[52px] text-[17px]"}`}
              >
                {o}
              </button>
            ))}
          </div>
          <button type="button" onClick={() => answer(false)} className="mt-3 text-[13px] font-bold text-[#3A3D55] underline">
            わからない
          </button>
        </div>
      )}

      {phase.kind === "feedback" && (
        <>
          <p className={`m-0 mb-2 text-[20px] font-black ${phase.ok ? "text-[#1533B8]" : "text-[#D9341F]"}`}>{phase.ok ? "正解！" : `覚え直そう（答え：${quiz.answer}）`}</p>
          {deck.card(item.id)}
          <button type="button" onClick={next} autoFocus className={`${bigBtn} mt-4 bg-[#FFE45C] text-[#15172B] shadow-[0_4px_0_#15172B]`}>
            次へ
          </button>
        </>
      )}
    </div>
  );
}
