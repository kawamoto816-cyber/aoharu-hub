"use client";

import type { DeckDef } from "@/lib/deck/types";
import { ALL_KANJI, findKanji, gradeOf, kanjiOfGrade } from "@/lib/kanji";
import type { KanjiEntry } from "@/lib/kanji/types";
import { jigenOf } from "@/lib/kanji/jigen";

// 小学校の漢字の「カードの束」。
//   カード: 大きな漢字・音読み・訓読み・言葉・例文
//   easy (読み): 言葉を見て、読みを4択で
//   hard (書き): 言葉の中の漢字が □ になっていて、入る漢字を4択で (同じ学年の字から)

function pick<T>(xs: T[], n: number, not: (x: T) => boolean): T[] {
  const pool = xs.filter((x) => !not(x));
  const out: T[] = [];
  while (out.length < n && pool.length) out.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
  return out;
}
const shuffle = <T,>(xs: T[]) => pick(xs, xs.length, () => false);

// 成り立ちの種類を、小学生にも分かる言葉で
const KIND_LABEL = { 象形: "ものの形から", 指事: "しるしで表す", 会意: "字を組み合わせる", 形声: "意味＋音" } as const;
// 小1・小2 はひらがなで
const KIND_LABEL_KIDS = { 象形: "ものの かたちから", 指事: "しるしで あらわす", 会意: "字を くみあわせる", 形声: "いみ＋おと" } as const;

export function KanjiCard({ e }: { e: KanjiEntry }) {
  const jg = jigenOf(e.k);
  return (
    <div className="rounded-[18px] border-[1.5px] border-[#15172B] bg-white p-5 shadow-[4px_4px_0_#15172B]">
      <div className="flex items-start gap-4">
        <span className="flex h-[112px] w-[112px] flex-none items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] bg-[#FFFBE6] font-serif text-[80px] leading-none">{e.k}</span>
        <div className="min-w-0 flex-1 text-[15px]">
          <p className="m-0 text-[11px] font-black text-[#1533B8]">{gradeOf(e.k)}年で習う</p>
          {e.on.length > 0 && (
            <p className="m-0 mt-1">
              <span className="mr-1 rounded bg-[#15172B] px-1.5 text-[11px] font-black text-white">音</span>
              {e.on.join("・")}
            </p>
          )}
          {e.kun.length > 0 && (
            <p className="m-0 mt-1">
              <span className="mr-1 rounded border border-[#15172B] px-1.5 text-[11px] font-black">訓</span>
              {e.kun.join("・")}
            </p>
          )}
          {jg && (
            <div className="mt-2 rounded-[10px] border border-dashed border-[#C9C6B4] bg-[#FFFBE6] px-2.5 py-1.5">
              <p className="m-0 flex items-center gap-1.5 text-[11px] font-black text-[#1533B8]">
                {gradeOf(e.k) <= 2 ? "なりたち" : "字源"}
                <span className="rounded bg-[#1533B8] px-1.5 text-white">{(gradeOf(e.k) <= 2 ? KIND_LABEL_KIDS : KIND_LABEL)[jg.kind]}</span>
              </p>
              <p className="m-0 mt-0.5 text-[12.5px] leading-snug text-[#15172B]">{jg.text}</p>
            </div>
          )}
        </div>
      </div>
      <ul className="m-0 mt-4 flex list-none flex-wrap gap-2 p-0">
        {e.words.map((w) => (
          <li key={w.w} className="rounded-[10px] bg-[#F7F6F1] px-3 py-1.5 text-center">
            <ruby className="text-[20px] font-bold">
              {w.w}
              <rt className="text-[11px] font-normal">{w.y}</rt>
            </ruby>
          </li>
        ))}
      </ul>
      <div className="mt-3 rounded-xl bg-[#F7F6F1] p-3">
        <p className="m-0 text-[16px] leading-relaxed">{e.ex}</p>
        <p className="m-0 mt-0.5 text-[12.5px] text-[#3A3D55]">{e.exY}</p>
      </div>
    </div>
  );
}

function Word({ text, mark }: { text: string; mark: string }) {
  const i = text.indexOf(mark);
  return (
    <p className="m-0 font-serif text-[40px] font-bold leading-tight">
      {text.slice(0, i)}
      <span className="bg-[linear-gradient(transparent_62%,#FFE45C_62%)]">{mark}</span>
      {text.slice(i + mark.length)}
    </p>
  );
}

export const kanjiDeck: DeckDef = {
  key: "kanji-e",
  title: "小学校の漢字",
  home: "/learn/kanji",
  play: "/learn/kanji/play",
  unit: "字",
  kids: true,
  ids: (g) => (g ? kanjiOfGrade(Number(g)) : ALL_KANJI).map((e) => e.k),
  card: (id) => <KanjiCard e={findKanji(id)!} />,
  quiz: (id, level) => {
    const e = findKanji(id)!;
    const g = gradeOf(id);
    const w = e.words[Math.floor(Math.random() * e.words.length)];
    if (level === "easy") {
      const others = ALL_KANJI.filter((x) => Math.abs(gradeOf(x.k) - g) <= 1 && x.k !== e.k)
        .flatMap((x) => x.words)
        .filter((x) => x.y !== w.y && Math.abs(x.y.length - w.y.length) <= 1);
      const wrong = pick([...new Set(others.map((x) => x.y))], 3, () => false);
      return { ask: "読みは？", prompt: <Word text={w.w} mark={e.k} />, options: shuffle([w.y, ...wrong]), answer: w.y };
    }
    const same = kanjiOfGrade(g).filter((x) => x.k !== e.k && !w.w.includes(x.k));
    const wrong = pick(same, 3, () => false).map((x) => x.k);
    const blank = w.w.replace(e.k, "□");
    return {
      ask: "□に入る漢字は？",
      prompt: (
        <div>
          <p className="m-0 font-serif text-[40px] font-bold leading-tight">{blank}</p>
          <p className="m-0 mt-1 text-[16px] text-[#3A3D55]">（{w.y}）</p>
        </div>
      ),
      options: shuffle([e.k, ...wrong]),
      answer: e.k,
      big: true,
    };
  },
};
