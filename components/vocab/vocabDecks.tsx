"use client";

import type { DeckDef } from "@/lib/deck/types";
import { SpeakButton } from "@/components/eitango/Speak";
import { speakableHead } from "@/lib/tts/en";
import { CHU_WORDS } from "@/lib/chutango";
import { JUKUGO } from "@/lib/jukugo";

// 中学英単語1200・英熟語500 の「カードの束」。発音は前もって作ったネイティブの音声 (なければブラウザの読み上げ)。
//   easy: 英語→意味の4択、hard: 意味→英語の4択

function sample<T>(xs: T[], n: number): T[] {
  const pool = [...xs];
  const out: T[] = [];
  while (out.length < n && pool.length) out.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
  return out;
}
const shuffle = <T,>(xs: T[]) => sample(xs, xs.length);
const first = (s: string) => s.split("、")[0];

function Card({ no, head, tag, ja, ex, exJa }: { no: number; head: string; tag: string; ja: string; ex: string; exJa: string }) {
  return (
    <div className="rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-5 shadow-[4px_4px_0_#15172B]">
      <div className="flex items-baseline gap-2">
        <span className="text-[11.5px] font-bold text-[#5A5D73]">No.{no}</span>
        <span className="rounded-full border border-[#15172B] px-2 text-[11px] font-black">{tag}</span>
      </div>
      <div className="mt-1 flex items-center gap-3">
        <p className="m-0 font-serif text-[30px] font-bold leading-tight">{head}</p>
        <SpeakButton text={speakableHead(head)} />
      </div>
      <p className="m-0 mt-2 text-[19px] font-black">{ja}</p>
      <div className="mt-3 rounded-xl bg-[#F7F6F1] p-3">
        <p className="m-0 flex items-start gap-2 font-serif text-[16px] leading-relaxed">
          <span className="min-w-0 flex-1">{ex}</span>
          <SpeakButton text={ex} label="例文を聞く" size={30} />
        </p>
        <p className="m-0 mt-1 text-[13.5px] text-[#3A3D55]">{exJa}</p>
      </div>
    </div>
  );
}

const CHU = new Map(CHU_WORDS.map((w) => [String(w.no), w]));
export const chuDeck: DeckDef = {
  key: "chu-tango",
  title: "中学英単語1200",
  home: "/learn/chu-tango",
  play: "/learn/chu-tango/play",
  unit: "語",
  ids: (g) => CHU_WORDS.filter((w) => !g || String(w.g) === g).map((w) => String(w.no)),
  card: (id) => {
    const w = CHU.get(id)!;
    return <Card no={w.no} head={w.word} tag={`中${w.g}・${w.pos}`} ja={w.ja} ex={w.ex} exJa={w.exJa} />;
  },
  quiz: (id, level) => {
    const w = CHU.get(id)!;
    const near = CHU_WORDS.filter((x) => x.no !== w.no && x.pos === w.pos && Math.abs(x.g - w.g) <= 1 && first(x.ja) !== first(w.ja));
    const wrong = sample(near, 3);
    if (level === "easy") return { ask: "意味は？", prompt: <p className="m-0 font-serif text-[32px] font-bold">{w.word}</p>, options: shuffle([first(w.ja), ...wrong.map((x) => first(x.ja))]), answer: first(w.ja) };
    return { ask: "英語でいうと？", prompt: <p className="m-0 text-[24px] font-black">{w.ja}</p>, options: shuffle([w.word, ...wrong.map((x) => x.word)]), answer: w.word };
  },
};

const JK = new Map(JUKUGO.map((w) => [String(w.no), w]));
export const jukugoDeck: DeckDef = {
  key: "jukugo",
  title: "英熟語500",
  home: "/learn/jukugo",
  play: "/learn/jukugo/play",
  unit: "こ",
  ids: (g) => JUKUGO.filter((w) => !g || (g === "1" ? w.no <= 250 : w.no > 250)).map((w) => String(w.no)),
  card: (id) => {
    const w = JK.get(id)!;
    return <Card no={w.no} head={w.p} tag={w.no <= 250 ? "最頻出" : "頻出"} ja={w.ja} ex={w.ex} exJa={w.exJa} />;
  },
  quiz: (id, level) => {
    const w = JK.get(id)!;
    const wrong = sample(
      JUKUGO.filter((x) => x.no !== w.no && first(x.ja) !== first(w.ja)),
      3,
    );
    if (level === "easy") return { ask: "意味は？", prompt: <p className="m-0 font-serif text-[26px] font-bold">{w.p}</p>, options: shuffle([first(w.ja), ...wrong.map((x) => first(x.ja))]), answer: first(w.ja) };
    return { ask: "この意味の熟語は？", prompt: <p className="m-0 text-[22px] font-black">{w.ja}</p>, options: shuffle([w.p, ...wrong.map((x) => x.p)]), answer: w.p };
  },
};
