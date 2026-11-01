"use client";

import { useEffect, useRef, useState } from "react";
import { MANZAI_GAP, manzaiKey, manzaiSrc } from "@/lib/tts/manzai";
import { Rich } from "./Rich";

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

export function ManzaiView({ cast, lines }: { cast: [string, string]; lines: Line[] }) {
  const [ready, setReady] = useState(false);
  const [now, setNow] = useState(-1);
  const audio = useRef<HTMLAudioElement | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rows = useRef<(HTMLDivElement | null)[]>([]);
  const srcs = lines.map((l) => manzaiSrc(manzaiKey(cast, l)));

  useEffect(() => {
    let alive = true;
    fetch(srcs[0], { method: "HEAD" })
      .then((r) => alive && setReady(r.ok))
      .catch(() => {});
    return () => {
      alive = false;
      stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function stop() {
    if (timer.current) clearTimeout(timer.current);
    audio.current?.pause();
    audio.current = null;
    setNow(-1);
  }

  function play(i: number) {
    if (i >= lines.length) return stop();
    setNow(i);
    rows.current[i]?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    const a = new Audio(srcs[i]);
    audio.current = a;
    // 次の行を先に読みこんでおく（間があかないように）
    if (i + 1 < lines.length) new Audio(srcs[i + 1]).preload = "auto";
    a.onended = () => {
      if (audio.current !== a) return;
      const gap = lines[i + 1]?.who === cast[1] ? MANZAI_GAP.toTsukkomi : MANZAI_GAP.toBoke;
      timer.current = setTimeout(() => play(i + 1), gap);
    };
    a.onerror = () => audio.current === a && stop();
    a.play().catch(() => stop());
  }

  const playing = now >= 0;
  return (
    <>
      {ready && (
        <button
          type="button"
          onClick={() => (playing ? stop() : play(0))}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border-[1.5px] border-[#15172B] bg-[#15172B] px-4 py-2.5 text-[14px] font-black text-white shadow-[3px_3px_0_#B42318] active:translate-y-0.5"
        >
          <span aria-hidden>{playing ? "■" : "▶"}</span>
          {playing ? "とめる" : "漫才で聞く"}
          <span className="text-[11px] font-bold text-[#C9CEF2]">{playing ? `${now + 1} / ${lines.length}` : `${cast[0]}・${cast[1]}`}</span>
        </button>
      )}
      <div className="mt-3 grid gap-2.5">
        {lines.map((l, k) => (
          <div key={k} ref={(el) => { rows.current[k] = el; }}>
            <Bubble who={l.who} text={l.text} side={l.who === cast[1] ? "right" : "left"} active={k === now} />
          </div>
        ))}
      </div>
    </>
  );
}
