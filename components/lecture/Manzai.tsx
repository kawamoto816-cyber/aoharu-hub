"use client";

import { useEffect, useRef } from "react";
import { MANZAI_GAP } from "@/lib/tts/manzai";
import { Rich } from "./Rich";
import { useAudioSequence } from "./useAudioSequence";

// 漫才パート：ふきだしで読む ＋「漫才で聞く」（1行ずつの音声をテンポよく続けて再生し、いま話している行を光らせる）。
// 音声ファイルがまだない漫才では、再生ボタンを出さない（読むだけ）。

type Line = { who: string; text: string; say?: string };

export function Bubble({ who, text, side, active = false }: { who: string; text: string; side: "left" | "right"; active?: boolean }) {
  return (
    <div className={`flex items-start gap-2 ${side === "right" ? "flex-row-reverse" : ""}`}>
      <span className={`mt-0.5 flex-none rounded-full px-2 py-0.5 text-[11px] font-black ${side === "right" ? "bg-[#1533B8] text-white" : "bg-[#15172B] text-white"}`}>{who}</span>
      <p
        className={`m-0 max-w-[85%] rounded-[14px] border-[1.5px] border-[#15172B] px-3 py-2 text-[14.5px] leading-relaxed transition-[background-color,box-shadow,transform] duration-150 ${
          active ? "-translate-y-0.5 bg-[#FFE45C] shadow-[3px_3px_0_#15172B]" : side === "right" ? "bg-[#E6EAFB]" : "bg-white"
        }`}
      >
        <Rich text={text} />
      </p>
    </div>
  );
}

/** 再生ボタン（漫才・朗読で共通） */
export function PlayButton({ playing, label, sub, onClick }: { playing: boolean; label: string; sub: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border-[1.5px] border-[#15172B] bg-[#15172B] px-4 py-2.5 text-[14px] font-black text-white shadow-[3px_3px_0_#B42318] active:translate-y-0.5"
    >
      <span aria-hidden>{playing ? "■" : "▶"}</span>
      {playing ? "とめる" : label}
      <span className="text-[11px] font-bold text-[#C9CEF2]">{sub}</span>
    </button>
  );
}

export function ManzaiView({ cast, lines, srcs, credit }: { cast: [string, string]; lines: Line[]; srcs: string[]; credit?: string }) {
  const seq = useAudioSequence(srcs, (i) => (lines[i + 1]?.who === cast[1] ? MANZAI_GAP.toTsukkomi : MANZAI_GAP.toBoke));
  const rows = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    if (seq.now >= 0) rows.current[seq.now]?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [seq.now]);
  return (
    <>
      {seq.ready && (
        <PlayButton
          playing={seq.playing}
          label="漫才で聞く"
          sub={seq.playing ? `${seq.now + 1} / ${lines.length}` : credit || `${cast[0]}・${cast[1]}`}
          onClick={() => (seq.playing ? seq.stop() : seq.play(0))}
        />
      )}
      <div className="mt-3 grid gap-2.5">
        {lines.map((l, k) => (
          <div key={k} ref={(el) => { rows.current[k] = el; }}>
            <Bubble who={l.who} text={l.text} side={l.who === cast[1] ? "right" : "left"} active={k === seq.now} />
          </div>
        ))}
      </div>
    </>
  );
}
