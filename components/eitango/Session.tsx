"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { SpeakButton, speak } from "./Speak";
import { wordAudio, exAudio } from "@/lib/eitango/audio";
import { buildSession, distractors, type Mode, type SessionItem } from "@/lib/eitango/session";
import { findWord } from "@/lib/eitango/stages";
import { recordAnswer, readWords } from "@/lib/eitango/progress";
import { trackEvent } from "@/lib/analytics";
import type { WordEntry } from "@/lib/eitango/types";

// 1回の修行。新しい単語はカードで覚えてから4択、復習は4択か、日本語を見て英単語を打つ。
// その日の最初の答えだけ記録する。まちがえた単語は最後にもう一度 (4択で) 出す。

type Phase = { kind: "card" } | { kind: "quiz" } | { kind: "feedback"; ok: boolean; given?: string };

function shuffle<T>(xs: T[]): T[] {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function Card({ w }: { w: WordEntry }) {
  return (
    <div className="rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-5 shadow-[4px_4px_0_#15172B]">
      <div className="flex items-center gap-3">
        <p className="m-0 font-serif text-[34px] font-bold leading-none">{w.word}</p>
        <SpeakButton text={w.word} audio={wordAudio(w.no)} />
        <span className="ml-auto rounded-full border-[1.5px] border-[#15172B] px-2 py-0.5 text-[12px] font-black">{w.pos}</span>
      </div>
      <p className="m-0 mt-3 text-[20px] font-black">{w.ja}</p>
      <div className="mt-4 rounded-xl bg-[#F7F6F1] p-3">
        <p className="m-0 flex items-start gap-2 font-serif text-[16px] leading-relaxed">
          <span className="min-w-0 flex-1">{w.ex}</span>
          <SpeakButton text={w.ex} audio={exAudio(w.no)} label="例文を聞く" size={30} />
        </p>
        <p className="m-0 mt-1 text-[13.5px] text-[#3A3D55]">{w.exJa}</p>
      </div>
      {w.note && <p className="m-0 mt-3 text-[13px] leading-relaxed text-[#3A3D55]">{w.note}</p>}
    </div>
  );
}

export function Session({ stage, extra }: { stage?: number; extra?: boolean }) {
  const initial = useMemo(() => buildSession(readWords(), { stage, extra }), [stage, extra]);
  const [queue, setQueue] = useState<SessionItem[]>(initial);
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>(() => ({ kind: initial[0]?.mode === "learn" ? "card" : "quiz" }));
  const [typed, setTyped] = useState("");
  const [score, setScore] = useState({ ok: 0, miss: 0 });
  const recorded = useRef(new Set<number>());
  const item = queue[idx];
  const w = item ? findWord(item.no) : undefined;
  const mode: Mode = item?.mode === "learn" ? "choice" : (item?.mode ?? "choice");
  const options = useMemo(() => (w ? shuffle([w.ja, ...distractors(w)]) : []), [w, idx]); // eslint-disable-line react-hooks/exhaustive-deps

  if (initial.length === 0) {
    return (
      <div className="rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-5 shadow-[4px_4px_0_#15172B]">
        <p className="m-0 text-[18px] font-black">今日の修行はおしまいです</p>
        <p className="m-0 mt-2 text-[14px] leading-relaxed text-[#3A3D55]">復習の単語も、今日の新しい単語も済んでいます。明日また、忘れかけた単語が出てきます。</p>
        <div className="mt-4 grid gap-2.5">
          <a href={`/learn/eitango/play?${stage ? `stage=${stage}&` : ""}extra=1`} className="flex min-h-[52px] items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] bg-[#FFE45C] text-[15px] font-black text-[#15172B] no-underline shadow-[0_3px_0_#15172B]">
            あと10語、新しい単語を覚える
          </a>
          <Link href="/learn/eitango" className="flex min-h-[48px] items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] bg-white text-[14px] font-bold text-[#15172B] no-underline">
            英単語2000のトップへ
          </Link>
        </div>
      </div>
    );
  }

  if (!item || !w) {
    return (
      <div className="rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-5 shadow-[4px_4px_0_#15172B]">
        <p className="m-0 text-[22px] font-black text-[#1533B8]">修行完了！</p>
        <p className="m-0 mt-2 text-[14px]">
          一発で正解 {score.ok}語・まちがえて覚え直し {score.miss}語
        </p>
        <p className="m-0 mt-1 text-[13px] text-[#3A3D55]">まちがえた単語は、明日また出てきます。続けて正解すると、出てくる間隔がのびていきます。</p>
        <div className="mt-4 grid gap-2.5">
          <a href={`/learn/eitango/play?${stage ? `stage=${stage}&` : ""}extra=1`} className="flex min-h-[52px] items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] bg-[#FFE45C] text-[15px] font-black text-[#15172B] no-underline shadow-[0_3px_0_#15172B]">
            あと10語、新しい単語を覚える
          </a>
          <Link href="/learn/eitango" className="flex min-h-[48px] items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] bg-white text-[14px] font-bold text-[#15172B] no-underline">
            英単語2000のトップへ
          </Link>
        </div>
      </div>
    );
  }

  function answer(ok: boolean, given?: string) {
    if (!w || !item) return;
    if (!recorded.current.has(w.no)) {
      recorded.current.add(w.no);
      recordAnswer(w.no, ok);
      setScore((s) => (ok ? { ...s, ok: s.ok + 1 } : { ...s, miss: s.miss + 1 }));
      trackEvent("words_answer", { stage: Math.ceil(w.no / 100), mode: item.mode, ok });
    }
    if (!ok) setQueue((q) => [...q, { no: w.no, mode: "choice" }]);
    setPhase({ kind: "feedback", ok, given });
    if (ok) speak(w.word, wordAudio(w.no));
  }

  function next() {
    const n = idx + 1;
    setIdx(n);
    setTyped("");
    const it = queue[n];
    setPhase({ kind: it?.mode === "learn" ? "card" : "quiz" });
    if (n >= queue.length) trackEvent("words_session_finish", { stage: stage ?? 0, ok: score.ok, miss: score.miss });
  }

  const remaining = queue.length - idx;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-[13px] font-bold text-[#3A3D55]">
        <span>のこり {remaining}語</span>
        <span>
          正解 {score.ok}・覚え直し {score.miss}
        </span>
      </div>

      {phase.kind === "card" && (
        <>
          <p className="m-0 mb-2 text-[12px] font-black text-[#1533B8]">新しい単語</p>
          <Card w={w} />
          <button type="button" onClick={() => setPhase({ kind: "quiz" })} className="mt-4 flex min-h-[56px] w-full items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] bg-[#1533B8] text-[17px] font-black text-white shadow-[0_4px_0_#0B1F7A]">
            覚えた！確かめる
          </button>
        </>
      )}

      {phase.kind === "quiz" && mode === "choice" && (
        <div className="rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-5 shadow-[4px_4px_0_#15172B]">
          <p className="m-0 text-[12px] font-black text-[#1533B8]">意味はどれ？</p>
          <div className="mt-2 flex items-center gap-3">
            <p className="m-0 font-serif text-[32px] font-bold">{w.word}</p>
            <SpeakButton text={w.word} audio={wordAudio(w.no)} />
          </div>
          <div className="mt-4 grid gap-2">
            {options.map((o, i) => (
              <button key={o} type="button" onClick={() => answer(o === w.ja, o)} className="flex min-h-[52px] items-center gap-3 rounded-[12px] border-[1.5px] border-[#15172B] bg-white px-4 text-left text-[15px] font-bold text-[#15172B]">
                <span className="text-[12px] font-black text-[#1533B8]">{"ABCD"[i]}</span>
                {o}
              </button>
            ))}
          </div>
          <button type="button" onClick={() => answer(false)} className="mt-3 text-[13px] font-bold text-[#3A3D55] underline">
            わからない
          </button>
        </div>
      )}

      {phase.kind === "quiz" && mode === "type" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            answer(typed.trim().toLowerCase() === w.word.toLowerCase(), typed.trim());
          }}
          className="rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-5 shadow-[4px_4px_0_#15172B]"
        >
          <p className="m-0 text-[12px] font-black text-[#1533B8]">英語でいうと？（覚えた単語の仕上げ）</p>
          <p className="m-0 mt-2 text-[22px] font-black">{w.ja}</p>
          <p className="m-0 mt-1 text-[13px] text-[#3A3D55]">
            {w.pos}・{w.word[0]}で始まる{w.word.length}文字
          </p>
          <input
            id="word-input"
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            autoFocus
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            spellCheck={false}
            aria-label="英単語を入力"
            className="mt-3 min-h-[48px] w-full rounded-lg border-[1.5px] border-[#9A9CB0] px-3 font-serif text-[22px]"
          />
          <div className="mt-3 flex gap-2">
            <button type="submit" className="flex min-h-[48px] flex-1 items-center justify-center rounded-[12px] border-[1.5px] border-[#15172B] bg-[#1533B8] text-[15px] font-black text-white">
              答える
            </button>
            <button type="button" onClick={() => answer(false)} className="min-h-[48px] rounded-[12px] border-[1.5px] border-[#15172B] bg-white px-4 text-[13px] font-bold text-[#15172B]">
              わからない
            </button>
          </div>
        </form>
      )}

      {phase.kind === "feedback" && (
        <>
          <p className={`m-0 mb-2 text-[20px] font-black ${phase.ok ? "text-[#1533B8]" : "text-[#D9341F]"}`}>{phase.ok ? "正解！" : "覚え直そう"}</p>
          {!phase.ok && phase.given && <p className="m-0 mb-2 text-[13px] text-[#3A3D55]">あなたの答え：{phase.given}</p>}
          <Card w={w} />
          <button type="button" onClick={next} autoFocus className="mt-4 flex min-h-[56px] w-full items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] bg-[#FFE45C] text-[17px] font-black text-[#15172B] shadow-[0_4px_0_#15172B]">
            次へ
          </button>
        </>
      )}
    </div>
  );
}
