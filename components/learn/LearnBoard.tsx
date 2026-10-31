"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { SkillMap, type SkillRegion } from "./SkillMap";
import { trackEvent } from "@/lib/analytics";

// /learn のスキル盤。表は推薦入試全般の「合格力」(5領域・120枚)、
// 裏は難関校 (旧帝大などの難関国公立・早慶・国際教養大・APU・海外トップ校) 向けの「知の力」。
// 「裏面を見る」でカードのようにめくる。/learn#ura で来たときは最初から裏を見せる。

export interface BoardIds {
  self: string[];
  school: string[];
  write: string[];
  talk: string[];
  kyoyo: string[];
  paradigm: string[];
  kindai: string[];
  chiseigaku: string[];
  kokusai: string[];
  gendai: string[];
}

function subscribeHash(cb: () => void) {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
}

export function LearnBoard({ ids }: { ids: BoardIds }) {
  // #ura で来たら裏から。ボタンでめくったあとはボタンの向きを優先する
  const hashUra = useSyncExternalStore(subscribeHash, () => window.location.hash === "#ura", () => false);
  const [chosen, setChosen] = useState<boolean | null>(null);
  const back = chosen ?? hashUra;

  const front: SkillRegion[] = [
    { key: "jibun", name: "自分を\n知る", aria: "自分を知る", fill: "#FFE45C", ink: "#15172B", ang: -90, href: "/learn/jibun", ids: ids.self },
    { key: "shibo", name: "志望校を\n知る", aria: "志望校を知る", fill: "#BFE3D0", ink: "#15172B", ang: -18, href: "/learn/daigaku", ids: ids.school },
    { key: "hanasu", name: "話す", aria: "話す：面接", fill: "#D9341F", ink: "#FFFFFF", ang: 54, href: "/learn/mensetsu", ids: ids.talk },
    { key: "kyoyo", name: "教養・\n時事", aria: "教養・時事", fill: "#D8D2F5", ink: "#15172B", ang: 126, href: "/learn/kyoyo", ids: ids.kyoyo },
    { key: "kaku", name: "書く", aria: "書く：志望理由書・小論文", fill: "#1533B8", ink: "#FFFFFF", ang: 198, href: "/learn#topics", ids: ids.write },
  ];
  const ura: SkillRegion[] = [
    { key: "paradigm", name: "知の\nパラダイム", aria: "知のパラダイム", fill: "#F4B860", ink: "#15172B", ang: -90, href: "/learn/paradigm", ids: ids.paradigm },
    { key: "kindai", name: "近代の\n知", aria: "近代の知", fill: "#9AD1F5", ink: "#15172B", ang: -18, href: "/learn/kindai", ids: ids.kindai },
    { key: "chiseigaku", name: "地政学", aria: "地政学", fill: "#7FC8A9", ink: "#15172B", ang: 54, href: "/learn/chiseigaku", ids: ids.chiseigaku },
    { key: "kokusai", name: "国際\n関係", aria: "国際関係のレンズ", fill: "#F59E9E", ink: "#15172B", ang: 126, href: "/learn/kokusai", ids: ids.kokusai },
    { key: "gendai", name: "現代の\n論点", aria: "現代の論点", fill: "#C9B6F2", ink: "#15172B", ang: 198, href: "/learn/gendai", ids: ids.gendai },
  ];

  function flip() {
    const next = !back;
    setChosen(next);
    trackEvent("learn_board_flip", { side: next ? "ura" : "omote" });
  }

  return (
    <section id="ura" aria-label={back ? "スキル盤（裏面：難関校向け）" : "スキル盤"} className="scroll-mt-6">
      <div className="[perspective:1600px]">
        <div className={`relative transition-transform duration-700 [transform-style:preserve-3d] ${back ? "[transform:rotateY(180deg)]" : ""}`}>
          <div aria-hidden={back} className={`rounded-[20px] border-[1.5px] border-[#15172B] bg-white/70 p-3 shadow-[6px_6px_0_#15172B] [backface-visibility:hidden] ${back ? "invisible" : ""}`}>
            <SkillMap regions={front} centerTop="推薦入試" centerName="合格力" />
          </div>
          <div aria-hidden={!back} className={`absolute inset-0 rounded-[20px] border-[1.5px] border-[#15172B] bg-[#FFF4DE] p-3 shadow-[6px_6px_0_#15172B] [backface-visibility:hidden] [transform:rotateY(180deg)] ${back ? "" : "invisible"}`}>
            <p className="m-0 text-center text-[12px] font-black text-[#15172B]">裏面：難関校アドバンスト</p>
            <SkillMap regions={ura} centerTop="難関校" centerName="知の力" />
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-col items-center gap-1.5">
        <button
          type="button"
          onClick={flip}
          className="min-h-[48px] rounded-[14px] border-[1.5px] border-[#15172B] bg-[#15172B] px-6 text-sm font-black text-white shadow-[0_3px_0_#F4B860]"
        >
          {back ? "表面にもどる" : "裏面を見る（難関校アドバンスト）"}
        </button>
        <p className="m-0 text-center text-[12px] text-[#3A3D55]">
          {back ? "旧帝大・早慶・国際教養大・APU・海外トップ校を目指す人へ。入口の「知のパラダイム」と各領域の第1章は無料、その先はProです。" : "めくると、難関校向けの「知のパラダイム」「地政学」などが待っています。"}
        </p>
        {back && (
          <Link
            href="/learn/library"
            className="mt-2 inline-flex min-h-[48px] items-center rounded-[14px] border-[1.5px] border-[#15172B] bg-[#FFF4DE] px-6 text-sm font-black text-[#15172B] no-underline shadow-[0_3px_0_#15172B]"
          >
            知の図書館へ（名著30冊を図解で）
          </Link>
        )}
      </div>
    </section>
  );
}
