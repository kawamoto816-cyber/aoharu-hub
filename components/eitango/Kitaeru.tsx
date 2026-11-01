"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { SpeakButton, speak } from "./Speak";
import { wordAudio } from "@/lib/eitango/audio";
import { STAGE_DATA } from "@/lib/eitango/data";
import { distractors } from "@/lib/eitango/session";
import { CTX_COUNT, CTX_PASS, SHUN_MAX_MISS, SHUN_PASS, SHUN_SECONDS, ctxChoices, ctxSet, recordKitaeru, shuffle } from "@/lib/eitango/kitaeru";
import { trackEvent } from "@/lib/analytics";
import type { WordEntry } from "@/lib/eitango/types";

// 英単語2000「②鍛える」のプレイ画面。瞬発 (60秒) と 文脈 (空所補充10問)。

const clock = () => Date.now();
const card = "rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-5 shadow-[4px_4px_0_#15172B]";
const bigBtn = "flex min-h-[56px] w-full items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] text-[17px] font-black no-underline";

function MissList({ items }: { items: WordEntry[] }) {
  if (items.length === 0) return null;
  return (
    <div className="mt-4">
      <p className="m-0 text-[13px] font-black text-[#D9341F]">まちがえた単語</p>
      <ul className="m-0 mt-1 grid list-none gap-1.5 p-0">
        {items.map((w) => (
          <li key={w.no} className="flex items-center gap-2 rounded-lg bg-[#F7F6F1] px-3 py-2">
            <span className="font-serif text-[17px] font-bold">{w.word}</span>
            <SpeakButton text={w.word} audio={wordAudio(w.no)} size={26} />
            <span className="min-w-0 flex-1 text-[13.5px]">{w.ja}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Finish({ stage, mode, passed, children }: { stage: number; mode: string; passed: boolean; children: React.ReactNode }) {
  return (
    <div className={card}>
      <p className={`m-0 text-[24px] font-black ${passed ? "text-[#1533B8]" : "text-[#15172B]"}`}>{passed ? "合格！" : "もう一回！"}</p>
      {children}
      <div className="mt-5 grid gap-2.5">
        <a href={`/learn/eitango/kitaeru/play?mode=${mode}&stage=${stage}`} className={`${bigBtn} bg-[#FFE45C] text-[#15172B] shadow-[0_3px_0_#15172B]`}>
          もう一度挑戦する
        </a>
        <Link href="/learn/eitango/kitaeru" className={`${bigBtn} min-h-[48px] bg-white text-[15px] text-[#15172B]`}>
          鍛えるのトップへ
        </Link>
      </div>
    </div>
  );
}

export function Shunpatsu({ stage }: { stage: number }) {
  const words = STAGE_DATA[stage];
  const order = useMemo(() => shuffle(words), [words]);
  const [phase, setPhase] = useState<"ready" | "play" | "done">("ready");
  const [i, setI] = useState(0);
  const [left, setLeft] = useState(SHUN_SECONDS);
  const [ok, setOk] = useState(0);
  const [miss, setMiss] = useState<WordEntry[]>([]);
  // まちがえた回数 (同じ単語を2回まちがえたら2)。合否の記録と表示はこの数でそろえる
  const [missN, setMissN] = useState(0);
  const [flash, setFlash] = useState<{ right: string; picked: string } | null>(null);
  const endAt = useRef(0);
  const w = order[i % order.length];
  const options = useMemo(() => shuffle([w.ja, ...distractors(w)]), [w]);
  const [prevBest, setPrevBest] = useState(0);
  const tally = useRef({ ok: 0, miss: 0 });

  useEffect(() => {
    if (phase !== "play") return;
    const t = setInterval(() => {
      const s = Math.max(0, Math.ceil((endAt.current - clock()) / 1000));
      setLeft(s);
      if (s === 0) {
        clearInterval(t);
        const { ok: n, miss: m } = tally.current;
        const passed = n >= SHUN_PASS && m <= SHUN_MAX_MISS;
        setPrevBest(recordKitaeru("shun", stage, n, passed).prev.best);
        trackEvent("words_kitaeru", { mode: "shun", stage, ok: n, miss: m, passed });
        setPhase("done");
      }
    }, 200);
    return () => clearInterval(t);
  }, [phase, stage]);

  function pick(o: string) {
    if (flash || phase !== "play") return;
    if (o === w.ja) {
      tally.current.ok++;
      setOk((n) => n + 1);
      setI((n) => n + 1);
    } else {
      tally.current.miss++;
      setMissN((n) => n + 1);
      setMiss((m) => (m.some((x) => x.no === w.no) ? m : [...m, w]));
      setFlash({ right: w.ja, picked: o });
      setTimeout(() => {
        setFlash(null);
        setI((n) => n + 1);
      }, 900);
    }
  }

  if (phase === "ready")
    return (
      <div className={card}>
        <p className="m-0 text-[12px] font-black text-[#1533B8]">瞬発・STAGE {stage}</p>
        <p className="m-0 mt-1 text-[20px] font-black">60秒で、何語わかる？</p>
        <ul className="m-0 mt-2 list-disc pl-5 text-[14.5px] leading-relaxed text-[#3A3D55]">
          <li>英単語の意味を4択で、どんどん答えます。</li>
          <li>
            {SHUN_PASS}語以上・まちがい{SHUN_MAX_MISS}つ以下で合格。考えこまずに、見た瞬間に答えよう。
          </li>
        </ul>
        <button
          type="button"
          onClick={() => {
            endAt.current = clock() + SHUN_SECONDS * 1000;
            setPhase("play");
          }}
          className={`${bigBtn} mt-4 bg-[#1533B8] text-white shadow-[0_4px_0_#0B1F7A]`}
        >
          スタート
        </button>
      </div>
    );

  if (phase === "done") {
    const passed = ok >= SHUN_PASS && missN <= SHUN_MAX_MISS;
    return (
      <Finish stage={stage} mode="shun" passed={passed}>
        <p className="m-0 mt-2 text-[16px] font-bold">
          60秒で <span className="text-[30px] font-black">{ok}</span> 語・まちがい {missN}
        </p>
        {prevBest > 0 && <p className="m-0 mt-1 text-[13px] text-[#3A3D55]">これまでのベスト {prevBest}語</p>}
        {!passed && (
          <p className="m-0 mt-1 text-[13px] text-[#3A3D55]">
            合格は{SHUN_PASS}語以上・まちがい{SHUN_MAX_MISS}つ以下。まちがえた単語は「覚える」で復習してから、もう一度。
          </p>
        )}
        <MissList items={miss} />
      </Finish>
    );
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-[14px] font-black">
        <span className={left <= 10 ? "text-[#D9341F]" : ""}>のこり {left}秒</span>
        <span>
          正解 {ok}・まちがい {missN}
        </span>
      </div>
      <div className="mb-3 h-2 overflow-hidden rounded-full bg-[#E6E4DA]">
        <div className="h-full bg-[#1533B8] transition-[width]" style={{ width: `${(left / SHUN_SECONDS) * 100}%` }} />
      </div>
      <div className={card}>
        <p className="m-0 font-serif text-[34px] font-bold">{w.word}</p>
        <div className="mt-4 grid gap-2">
          {options.map((o) => {
            const state = flash ? (o === flash.right ? "right" : o === flash.picked ? "wrong" : "") : "";
            return (
              <button
                key={o}
                type="button"
                onClick={() => pick(o)}
                className={`flex min-h-[52px] items-center rounded-[12px] border-[1.5px] px-4 text-left text-[15px] font-bold ${state === "right" ? "border-[#1533B8] bg-[#E3E8FF]" : state === "wrong" ? "border-[#D9341F] bg-[#FFE6E1]" : "border-[#15172B] bg-white"} text-[#15172B]`}
              >
                {state === "right" && (
                  <span aria-hidden="true" className="mr-2 shrink-0 font-sans text-[18px] font-black text-[#1533B8]">
                    ○
                  </span>
                )}
                {state === "wrong" && (
                  <span aria-hidden="true" className="mr-2 shrink-0 font-sans text-[18px] font-black text-[#D9341F]">
                    ✕
                  </span>
                )}
                <span>{o}</span>
                {state && <span className="sr-only">{state === "right" ? "（正解）" : "（選んだ答え・まちがい）"}</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function Bunmyaku({ stage }: { stage: number }) {
  const set = useMemo(() => ctxSet(stage), [stage]);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [ok, setOk] = useState(0);
  const [miss, setMiss] = useState<WordEntry[]>([]);
  const q = set[i];
  const options = useMemo(() => (q ? ctxChoices(q.w, q.c) : []), [q]);

  if (!q) {
    const passed = ok >= CTX_PASS;
    return (
      <Finish stage={stage} mode="ctx" passed={passed}>
        <p className="m-0 mt-2 text-[16px] font-bold">
          {CTX_COUNT}問中 <span className="text-[30px] font-black">{ok}</span> 問正解
        </p>
        {!passed && <p className="m-0 mt-1 text-[13px] text-[#3A3D55]">合格は{CTX_PASS}問以上。問題は毎回入れかわります。</p>}
        <MissList items={miss} />
      </Finish>
    );
  }

  const [before, after] = q.c.ctx.split("___");
  const correct = picked === q.w.word;
  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-[13px] font-bold text-[#3A3D55]">
        <span>
          {i + 1} / {CTX_COUNT}
        </span>
        <span>正解 {ok}</span>
      </div>
      <div className={card}>
        <p className="m-0 text-[12px] font-black text-[#1533B8]">空所に入る語は？</p>
        <p className="m-0 mt-2 font-serif text-[19px] leading-relaxed">
          {before}
          <span className={`mx-0.5 inline-block min-w-[80px] border-b-2 px-1 text-center font-bold ${picked ? (correct ? "border-[#1533B8] text-[#1533B8]" : "border-[#D9341F] text-[#D9341F]") : "border-[#15172B]"}`}>
            {picked ? q.w.word : " "}
          </span>
          {after}
        </p>
        {picked && <p className="m-0 mt-2 text-[14px] text-[#3A3D55]">{q.c.ja}</p>}
        <div className="mt-4 grid grid-cols-2 gap-2">
          {options.map((o) => {
            const state = picked ? (o === q.w.word ? "right" : o === picked ? "wrong" : "") : "";
            return (
              <button
                key={o}
                type="button"
                disabled={Boolean(picked)}
                onClick={() => {
                  setPicked(o);
                  if (o === q.w.word) {
                    setOk((n) => n + 1);
                    speak(q.w.word, wordAudio(q.w.no));
                  } else setMiss((m) => [...m, q.w]);
                }}
                className={`flex min-h-[52px] items-center justify-center rounded-[12px] border-[1.5px] px-2 font-serif text-[17px] font-bold ${state === "right" ? "border-[#1533B8] bg-[#E3E8FF]" : state === "wrong" ? "border-[#D9341F] bg-[#FFE6E1]" : "border-[#15172B] bg-white"} text-[#15172B]`}
              >
                {state === "right" && (
                  <span aria-hidden="true" className="mr-2 shrink-0 font-sans text-[18px] font-black text-[#1533B8]">
                    ○
                  </span>
                )}
                {state === "wrong" && (
                  <span aria-hidden="true" className="mr-2 shrink-0 font-sans text-[18px] font-black text-[#D9341F]">
                    ✕
                  </span>
                )}
                <span>{o}</span>
                {state && <span className="sr-only">{state === "right" ? "（正解）" : "（選んだ答え・まちがい）"}</span>}
              </button>
            );
          })}
        </div>
        {picked && (
          <>
            <p role="status" aria-live="polite" className={`m-0 mt-3 text-[15px] font-black ${correct ? "text-[#1533B8]" : "text-[#D9341F]"}`}>
              {correct ? "正解！" : "ざんねん"}　{q.w.word}：{q.w.ja}
            </p>
            <button
              type="button"
              autoFocus
              onClick={() => {
                if (i + 1 >= CTX_COUNT) {
                  recordKitaeru("ctx", stage, ok, ok >= CTX_PASS);
                  trackEvent("words_kitaeru", { mode: "ctx", stage, ok, passed: ok >= CTX_PASS });
                }
                setPicked(null);
                setI((n) => n + 1);
              }}
              className={`${bigBtn} mt-3 bg-[#FFE45C] text-[#15172B] shadow-[0_3px_0_#15172B]`}
            >
              {i + 1 < CTX_COUNT ? "次へ" : "結果を見る"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
