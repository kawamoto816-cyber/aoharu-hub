"use client";

import { useEffect, useRef } from "react";
import { NOVEL_GAP } from "@/lib/tts/manzai";
import { Rich } from "./Rich";
import { PlayButton } from "./Manzai";
import { useAudioSequence } from "./useAudioSequence";

// 小説パート：本文 ＋「朗読を聞く」（語り手の声で1段落ずつ続けて読み、いま読んでいる段落にしるしをつける）。
// 音声ファイルがまだない小説では、再生ボタンを出さない。

export function NovelView({ paragraphs, srcs }: { paragraphs: string[]; srcs: string[] }) {
  const seq = useAudioSequence(srcs, () => NOVEL_GAP);
  const rows = useRef<(HTMLParagraphElement | null)[]>([]);
  useEffect(() => {
    if (seq.now >= 0) rows.current[seq.now]?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [seq.now]);
  return (
    <>
      {seq.ready && (
        <PlayButton
          playing={seq.playing}
          label="朗読を聞く"
          sub={seq.playing ? `${seq.now + 1} / ${paragraphs.length}` : "語り手の声で"}
          onClick={() => (seq.playing ? seq.stop() : seq.play(0))}
        />
      )}
      <div className="mt-3">
        {paragraphs.map((p, i) => (
          <p
            key={i}
            ref={(el) => { rows.current[i] = el; }}
            className={`m-0 mt-2.5 rounded-[6px] font-serif text-[15.5px] leading-[2] transition-colors duration-300 [text-indent:1em] ${
              i === seq.now ? "bg-[#FFF1B8] shadow-[-6px_0_0_#FFE45C]" : ""
            }`}
          >
            <Rich text={p} />
          </p>
        ))}
      </div>
    </>
  );
}
