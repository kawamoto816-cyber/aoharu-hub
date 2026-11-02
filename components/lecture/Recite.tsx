"use client";

import type { Recitation } from "@/lib/lecture/types";
import { Rich } from "./Rich";
import { PlayButton } from "./Manzai";
import { useAudioSequence } from "./useAudioSequence";

// 名作の引用カード：本文（行分けそのまま）＋作者・作品＋出典リンク＋（英語なら）日本語訳＋「朗読を聞く」。
// 音声ファイルがまだないときは、再生ボタンを出さない。

export function ReciteCard({ r, src }: { r: Recitation; src: string }) {
  const seq = useAudioSequence([src], () => 0);
  return (
    <figure className="m-0 mt-5 rounded-[16px] border-[1.5px] border-[#15172B] bg-[#FBF7EE] p-4 shadow-[3px_3px_0_#15172B] sm:p-5">
      <p className="m-0 text-[11px] font-black tracking-wider text-[#8A5A00]">{r.lang === "en" ? "名作を味わう　English" : "名作を味わう"}</p>
      <blockquote
        lang={r.lang}
        className={`m-0 mt-2 whitespace-pre-line border-l-4 border-[#C9A24A] pl-3 font-serif leading-[1.95] ${r.lang === "en" ? "text-[16px] italic" : "text-[16.5px]"} ${seq.playing ? "bg-[#FFF1B8]" : ""}`}
      >
        <Rich text={r.text} />
      </blockquote>
      {r.ja && (
        <p className="m-0 mt-2 whitespace-pre-line pl-4 text-[13.5px] leading-relaxed text-[#3A3D55]">
          <Rich text={r.ja} />
        </p>
      )}
      <figcaption className="m-0 mt-2 text-right text-[12.5px] font-bold text-[#3A3D55]">
        —— {r.cite}
        <a href={r.source} target="_blank" rel="noopener noreferrer" className="ml-2 text-[11.5px] font-bold text-[#1533B8]">
          出典
        </a>
      </figcaption>
      {seq.ready && (
        <PlayButton
          playing={seq.playing}
          label="朗読を聞く"
          sub={r.lang === "en" ? (r.accent === "gb" ? "British English" : "American English") : "名作の朗読"}
          onClick={() => (seq.playing ? seq.stop() : seq.play(0))}
        />
      )}
    </figure>
  );
}
