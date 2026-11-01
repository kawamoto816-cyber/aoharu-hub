import type { Lecture } from "@/lib/lecture/types";
import { Rich } from "./Rich";

// 謎解きミッション：読者は「名探偵」。依頼人から、もっと大きな目的のために謎解きを託される。
// 導入に「依頼」のカード、謎が解ける節に「ミッション完了」のカード（依頼人からのお礼つき）。

const T = {
  kids: {
    chip: "MISSION",
    head: "名探偵《めいたんてい》のあなたへ、依頼《いらい》です",
    from: "依頼人《いらいにん》",
    q: "解《と》いてほしい謎《なぞ》",
    clue: (n: number) => `手《て》がかりは、この先《さき》の${n}つの節《せつ》にある。読《よ》みながら推理《すいり》しよう。`,
    done: "謎解《なぞと》き成功《せいこう》！",
    thanks: "依頼人《いらいにん》から",
    plainQ: "なぞ　読《よ》み進《すす》めるとわかる",
  },
  std: {
    chip: "MISSION",
    head: "名探偵のあなたへ、依頼です",
    from: "依頼人",
    q: "解いてほしい謎",
    clue: (n: number) => `手がかりは、この先の${n}つの節にある。読みながら推理しよう。`,
    done: "謎解き成功",
    thanks: "依頼人から",
    plainQ: "ミステリー　読み進めるとわかる",
  },
};

export function MissionCard({ lec, kids }: { lec: Lecture; kids: boolean }) {
  const t = kids ? T.kids : T.std;
  const m = lec.mission;
  if (!m) {
    return (
      <div className="mt-3 rounded-[12px] border-[1.5px] border-dashed border-[#B42318] bg-white px-3 py-2.5">
        <p className="m-0 text-[12px] font-black text-[#B42318]"><Rich text={t.plainQ} /></p>
        <p className="m-0 mt-1 text-[15px] font-black leading-relaxed"><Rich text={lec.mystery!} /></p>
      </div>
    );
  }
  return (
    <div className="mt-4 overflow-hidden rounded-[14px] border-[1.5px] border-[#15172B] bg-[#15172B] text-white shadow-[4px_4px_0_#B42318]">
      <div className="flex items-center gap-2 border-b border-dashed border-white/25 px-3.5 py-2">
        <span className="rounded bg-[#B42318] px-1.5 py-0.5 text-[11px] font-black tracking-[0.15em]">{t.chip}</span>
        <span className="text-[12.5px] font-black text-[#FFE45C]"><Rich text={t.head} /></span>
      </div>
      <div className="px-3.5 pb-3.5 pt-2.5">
        <p className="m-0 text-[12px] font-bold text-[#C9CEF2]">
          <Rich text={t.from} />：<Rich text={m.from} />
        </p>
        <p className="m-0 mt-1.5 text-[14.5px] leading-relaxed">
          <Rich text={m.request} />
        </p>
        <div className="mt-3 rounded-[10px] border-[1.5px] border-[#FFE45C] bg-white px-3 py-2.5 text-[#15172B]">
          <p className="m-0 text-[11.5px] font-black text-[#B42318]"><Rich text={t.q} /></p>
          <p className="m-0 mt-1 text-[15.5px] font-black leading-relaxed"><Rich text={lec.mystery!} /></p>
        </div>
        <p className="m-0 mt-2.5 text-[12px] font-bold text-[#C9CEF2]"><Rich text={t.clue(lec.sections.length)} /></p>
      </div>
    </div>
  );
}

export function MissionComplete({ lec, kids, answer }: { lec: Lecture; kids: boolean; answer: string }) {
  const t = kids ? T.kids : T.std;
  const m = lec.mission;
  return (
    <div className="mt-5 overflow-hidden rounded-[14px] border-[1.5px] border-[#15172B] bg-[#FFF1EE] shadow-[4px_4px_0_#15172B]">
      <div className="flex items-center gap-2 bg-[#B42318] px-3.5 py-2 text-white">
        <span className="rounded bg-white px-1.5 py-0.5 text-[11px] font-black tracking-[0.1em] text-[#B42318]">{m ? "MISSION COMPLETE" : "SOLVED"}</span>
        <span className="text-[13px] font-black"><Rich text={t.done} /></span>
      </div>
      <div className="px-3.5 pb-3.5 pt-2.5">
        {lec.mystery && (
          <p className="m-0 text-[12.5px] font-bold text-[#5A5D73]">
            <Rich text={lec.mystery} />
          </p>
        )}
        <p className="m-0 mt-1.5 text-[15px] font-bold leading-relaxed">
          <Rich text={answer} />
        </p>
        {m && (
          <div className="mt-3 rounded-[10px] border border-dashed border-[#15172B] bg-white px-3 py-2">
            <p className="m-0 text-[11.5px] font-black text-[#1533B8]">
              <Rich text={t.thanks} />（<Rich text={m.from} />）
            </p>
            <p className="m-0 mt-1 text-[14px] leading-relaxed">
              <Rich text={m.thanks} />
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
