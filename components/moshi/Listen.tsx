"use client";

import { useEffect, useRef, useState } from "react";
import { Rich } from "@/components/lecture/Rich";

// リスニングの放送文。問題文・資料の中の 〔放送〕…〔/放送〕 (2回まで) と 〔放送1回〕…〔/放送〕 (1回だけ) を、
// 解いている間は「再生」ボタンにして文字を隠し、ブラウザの読み上げ (英語) で流す。解説 (reveal) では文字も出す。
// 行頭の「Kenta: 」のような話し手の名前は読まず、話し手ごとに声 (なければ高さ) を変える。
// 読み上げが使えない端末では、文字で読んで答えられるように放送文を出す。

const MARK = /〔放送(1回)?〕([\s\S]*?)〔\/放送〕/g;

export const hasListen = (s: string | undefined) => !!s && /〔放送(1回)?〕/.test(s);

/** メモ・コピー用: 印を外して放送文を「（放送）…」に */
export const listenPlain = (s: string) => s.replace(MARK, (_, __, body: string) => `（放送）${body.trim()}`);

type Part = { kind: "text"; body: string } | { kind: "listen"; body: string; max: number };

function parts(s: string): Part[] {
  const out: Part[] = [];
  let last = 0;
  for (const m of s.matchAll(MARK)) {
    if (m.index! > last) out.push({ kind: "text", body: s.slice(last, m.index) });
    out.push({ kind: "listen", body: m[2].trim(), max: m[1] ? 1 : 2 });
    last = m.index! + m[0].length;
  }
  if (last < s.length) out.push({ kind: "text", body: s.slice(last) });
  return out;
}

/** 放送文を話し手ごとの行に (「Name: 」は読まない) */
function lines(body: string): { who: string | null; text: string }[] {
  return body
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => {
      const m = l.match(/^([A-Z][A-Za-z.' ]{0,24}):\s*(.+)$/);
      return m ? { who: m[1], text: m[2] } : { who: null, text: l };
    });
}

const canSpeak = () => typeof window !== "undefined" && "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined";

function englishVoices(): SpeechSynthesisVoice[] {
  const vs = window.speechSynthesis.getVoices().filter((v) => /^en[-_]/i.test(v.lang));
  const us = vs.filter((v) => /en[-_]US/i.test(v.lang));
  return us.length >= 2 ? us : vs;
}

function ListenButton({ body, max }: { body: string; max: number }) {
  const [ok, setOk] = useState<boolean | null>(null);
  const [played, setPlayed] = useState(0);
  const [playing, setPlaying] = useState(false);
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;
    const v = canSpeak();
    // 判定はマウントのあと (サーバーの描画と食いちがわないように)
    const t = window.setTimeout(() => setOk(v), 0);
    if (v) window.speechSynthesis.getVoices();
    return () => {
      alive.current = false;
      window.clearTimeout(t);
      if (v) window.speechSynthesis.cancel();
    };
  }, []);

  function play() {
    if (!canSpeak() || playing || played >= max) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    const voices = englishVoices();
    const speakers = new Map<string, number>();
    const ls = lines(body);
    setPlaying(true);
    setPlayed((n) => n + 1);
    ls.forEach((l, i) => {
      const u = new SpeechSynthesisUtterance(l.text);
      u.lang = "en-US";
      u.rate = 0.92;
      if (l.who) {
        if (!speakers.has(l.who)) speakers.set(l.who, speakers.size);
        const k = speakers.get(l.who)!;
        if (voices.length > 1) u.voice = voices[k % voices.length];
        else if (voices[0]) u.voice = voices[0];
        u.pitch = voices.length > 1 ? 1 : k % 2 === 0 ? 1 : 1.35;
      } else if (voices[0]) u.voice = voices[0];
      if (i === ls.length - 1) {
        u.onend = () => alive.current && setPlaying(false);
        u.onerror = () => alive.current && setPlaying(false);
      }
      synth.speak(u);
    });
  }

  if (ok === false)
    return (
      <span className="my-2 block rounded-[12px] border-[1.5px] border-dashed border-[#15172B] bg-white p-3 text-[14.5px] leading-relaxed">
        <span className="block text-[12px] font-black text-[#B54708]">この端末では読み上げが使えないため、放送文を文字で出しています</span>
        <span className="mt-1 block whitespace-pre-line font-sans">{body}</span>
      </span>
    );
  const left = max - played;
  return (
    <span className="my-2 flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={play}
        disabled={ok !== true || playing || left <= 0}
        className="inline-flex min-h-[48px] items-center gap-2 rounded-[12px] border-[1.5px] border-[#15172B] bg-[#FFE45C] px-4 text-[15px] font-black text-[#15172B] shadow-[0_3px_0_#15172B] disabled:bg-[#EDEBE1] disabled:text-[#5A5D73] disabled:shadow-none"
      >
        <span aria-hidden="true">{playing ? "♪" : "▶"}</span>
        {playing ? "放送中…" : left <= 0 ? "放送は終わりました" : played === 0 ? "放送を聞く" : "もう一度聞く"}
      </button>
      <span className="text-[12px] font-bold text-[#5A5D73]">{max === 1 ? "1回だけ流れます" : `あと${Math.max(0, left)}回`}</span>
    </span>
  );
}

/** 文字列を描く。放送の印があれば、解いている間はボタン、reveal なら放送文も出す */
export function ListenRich({ text, reveal = false }: { text: string; reveal?: boolean }) {
  if (!hasListen(text)) return <Rich text={text} />;
  return (
    <>
      {parts(text).map((p, i) =>
        p.kind === "text" ? (
          <Rich key={i} text={p.body} />
        ) : reveal ? (
          <span key={i} className="my-2 block rounded-[12px] border-[1.5px] border-[#15172B] bg-[#F7F6F1] p-3 text-[14px] leading-relaxed">
            <span className="block text-[12px] font-black text-[#1533B8]">放送文</span>
            <span className="mt-1 block whitespace-pre-line font-sans">{p.body}</span>
          </span>
        ) : (
          <ListenButton key={i} body={p.body} max={p.max} />
        ),
      )}
    </>
  );
}
