"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import type { LearnCard } from "@/lib/learn/types";
import { trackEvent } from "@/lib/analytics";
import { markQuiz } from "@/lib/learn/progress";
import { useProgress } from "./useProgress";

// カード1枚：めくる → 図解 → 三択 → 自分の文章で試す。
// 三択は正解の位置が偏らないよう、カード番号で選択肢の並びを回す。
const KEYS = ["A", "B", "C"] as const;
const tryPrimary =
  "flex min-h-[52px] items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] bg-[#FFE45C] px-1.5 text-center text-[13px] font-black leading-snug text-[#15172B] no-underline shadow-[0_3px_0_#15172B]";
const nextPrimary =
  "flex min-h-[52px] items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] bg-[#1533B8] px-1.5 text-center text-[15px] font-black text-white no-underline shadow-[0_3px_0_#0B1F7A]";

export function CardPlayer({
  card,
  total,
  diagram,
  handFont,
  regionPath,
  tryHref,
  nextHref,
  nextLabel,
  chapterEnd,
}: {
  card: LearnCard;
  total: number;
  diagram: ReactNode;
  handFont: string;
  regionPath: string;
  tryHref: string;
  /** 三択のあとに進む先 (最後のカードは一覧の仕上げのクエスト) */
  nextHref: string;
  nextLabel: string;
  /** 章の最後のカード。ここだけ「自分の文章で試す」を一番目立たせる */
  chapterEnd: boolean;
}) {
  const [flipped, setFlipped] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);
  const progress = useProgress();
  const status = progress[card.id];

  const shift = card.no % 3;
  const order = [0, 1, 2].map((i) => (i + shift) % 3); // 表示位置 → 元の選択肢
  const correctPos = order.indexOf(card.quiz.answer);
  const answered = picked !== null;
  const ok = picked === correctPos;

  function flip() {
    if (!flipped) trackEvent("learn_card_flip", { card: card.id });
    setFlipped((f) => !f);
  }

  function pick(pos: number) {
    if (answered) return;
    setPicked(pos);
    const correct = pos === correctPos;
    trackEvent("learn_quiz_answer", { card: card.id, correct });
    if (correct) markQuiz(card.id);
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="[perspective:1400px]">
        <button
          type="button"
          onClick={flip}
          aria-label={flipped ? "カードの表にもどす" : "カードをめくって図解を見る"}
          className="block w-full cursor-pointer border-0 bg-transparent p-0 text-left text-inherit"
        >
          <span className={`grid transition-transform duration-[600ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : ""}`}>
            <span className="flex min-h-[300px] flex-col gap-3.5 rounded-[20px] border-[1.5px] border-[#15172B] bg-[#1533B8] p-6 text-white shadow-[6px_6px_0_#15172B] [backface-visibility:hidden] [grid-area:1/1]">
              <span className="flex items-center justify-between">
                <span className="rounded-full bg-[#FFE45C] px-2.5 py-0.5 text-xs font-black text-[#15172B]">小論文</span>
                <span className="text-xs font-bold">
                  No.{card.no} / {total}
                </span>
              </span>
              <span className="mt-4 text-[28px] font-black leading-[1.4] sm:text-[32px]">{card.title}</span>
              <span className="text-[15px] leading-relaxed">{card.front}</span>
              <span className="mt-auto flex items-center gap-1.5 text-[13px] font-bold">
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
                  <path d="M21 3v5h-5" />
                </svg>
                タップしてめくる
              </span>
            </span>

            <span className="flex min-h-[300px] flex-col gap-3 rounded-[20px] border-[1.5px] border-[#15172B] bg-white p-5 shadow-[6px_6px_0_#15172B] [backface-visibility:hidden] [grid-area:1/1] [transform:rotateY(180deg)]">
              {diagram}
              <span className={`${handFont} text-[15px] leading-[1.8] text-[#B42318]`}>{card.back}</span>
            </span>
          </span>
        </button>
      </div>

      {!flipped && (
        <div className="flex flex-col gap-2">
          <button type="button" onClick={flip} className="min-h-[56px] rounded-[14px] border-[1.5px] border-[#15172B] bg-[#1533B8] text-[17px] font-black text-white shadow-[0_4px_0_#0B1F7A]">
            めくって図解を見る
          </button>
          <p className="m-0 text-center text-xs text-[#3A3D55]">めくる → 三択 → 自分の文章で試す で、スキル盤のマスが光ります</p>
        </div>
      )}

      {flipped && (
        <section aria-labelledby={`quiz-${card.id}`} className="flex flex-col gap-2">
          <p className="m-0 text-xs font-black text-[#B42318]">三択に挑戦</p>
          <h2 id={`quiz-${card.id}`} className="m-0 mb-1 text-base font-black leading-relaxed">
            {card.quiz.question}
          </h2>
          {order.map((orig, pos) => {
            const isRight = pos === correctPos;
            const isPicked = picked === pos;
            const tone = !answered
              ? "border-[#15172B] bg-white"
              : isRight
                ? "border-[#1533B8] bg-[#E6EAFB]"
                : isPicked
                  ? "border-[#D9341F] bg-[#FFF1EE]"
                  : "border-[#C9C7BC] bg-white text-[#4A4D63]";
            const badge = !answered ? "bg-[#F7F6F1] text-[#15172B]" : isRight ? "bg-[#1533B8] text-white" : isPicked ? "bg-[#D9341F] text-white" : "bg-[#F7F6F1] text-[#4A4D63]";
            return (
              <button
                key={orig}
                type="button"
                onClick={() => pick(pos)}
                aria-pressed={isPicked}
                disabled={answered && !isPicked}
                className={`flex min-h-[48px] items-center gap-2.5 rounded-xl border-[1.5px] px-3 py-2 text-left text-[14px] font-bold leading-snug ${tone}`}
              >
                <span className={`flex h-[26px] w-[26px] flex-none items-center justify-center rounded-full text-[13px] font-black ${badge}`}>{KEYS[pos]}</span>
                <span>{card.quiz.options[orig]}</span>
              </button>
            );
          })}

          {answered && (
            <div className="mt-1 flex flex-col gap-3" aria-live="polite">
              <p className={`m-0 rounded-xl px-3 py-2.5 text-[13px] font-bold leading-relaxed ${ok ? "bg-[#FFF6C4]" : "bg-[#FFF1EE] text-[#B42318]"}`}>
                {ok ? "正解！ マスがひとつ黄色に光りました。" : `惜しい！ 答えは ${KEYS[correctPos]}。`}
                {card.quiz.explanation}
                {ok && status !== "done" ? " 自分の小論文で試すと、青く「習得」になります。" : ""}
              </p>
              {/* ふだんは次のカードへ進むのが主役。章の最後のカードだけ、アプリで試すのを主役にする */}
              {chapterEnd && <p className="m-0 text-[13px] font-black text-[#1533B8]">この章のカードはここまで。章で学んだことを、自分の小論文で試してみましょう。</p>}
              <div className="grid grid-cols-2 gap-2.5">
                {chapterEnd ? (
                  <>
                    <Link href={nextHref} className="flex min-h-[52px] items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] bg-white px-1.5 text-center text-sm font-black text-[#15172B] no-underline">
                      {nextLabel}
                    </Link>
                    <a href={tryHref} onClick={() => trackEvent("learn_try_click", { card: card.id, place: "chapter_end" })} className={tryPrimary}>
                      自分の小論文で試す
                      <br />
                      （テンサクン）
                    </a>
                  </>
                ) : (
                  <>
                    <a href={tryHref} onClick={() => trackEvent("learn_try_click", { card: card.id, place: "card" })} className="flex min-h-[52px] items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] bg-white px-1.5 text-center text-[13px] font-black leading-snug text-[#15172B] no-underline">
                      自分の文章で試す
                      <br />
                      （テンサクン）
                    </a>
                    <Link href={nextHref} onClick={() => trackEvent("learn_next_click", { card: card.id })} className={nextPrimary}>
                      {nextLabel}
                    </Link>
                  </>
                )}
              </div>
              <Link href={regionPath} className="self-center text-sm font-bold text-[#1533B8]">
                カード一覧を見る
              </Link>
              {!ok && (
                <button type="button" onClick={() => setPicked(null)} className="min-h-[44px] rounded-xl border-0 bg-transparent text-sm font-bold text-[#1533B8] underline">
                  もう一度答える
                </button>
              )}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
