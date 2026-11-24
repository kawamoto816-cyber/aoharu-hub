"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// 逆転勉強法の途中で、さかのぼりのページへ来たとき、過去問の作戦表へもどる道を出す。
// 作戦表 (components/kakomon/Challenge.tsx の GyakutenPlan) で「どこまでさかのぼるか探す」を押すと、
// sessionStorage に「どの過去問の、どの単元から来たか」を残す。さかのぼりのページの中を何度行き来しても消えない (同じタブのあいだ)。

export const RETURN_KEY = "kakomon:return";

export interface KakomonReturnInfo {
  examId: string;
  title: string;
  unit: string;
  unitName: string;
  /** もどり先。2次試験の過去問チャレンジ (/learn/niji) から来たときは "niji" */
  base?: "kakomon" | "niji" | "koko";
}

export function setKakomonReturn(v: KakomonReturnInfo) {
  try {
    window.sessionStorage.setItem(RETURN_KEY, JSON.stringify(v));
  } catch {
    /* 保存できなくても、さかのぼりは使える */
  }
}

export function KakomonReturn({ where }: { where: "top" | "bottom" }) {
  const [info, setInfo] = useState<KakomonReturnInfo | null>(null);
  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(RETURN_KEY);
      const v = raw ? (JSON.parse(raw) as KakomonReturnInfo) : null;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- 初回だけ、このタブに残した戻り先を読む
      if (v && /^[a-z0-9-]{3,40}$/.test(v.examId)) setInfo(v);
    } catch {
      /* 何も出さない */
    }
  }, []);
  if (!info) return null;
  const href = `/learn/${info.base === "niji" ? "niji" : info.base === "koko" ? "koko-nyushi" : "kakomon"}/${info.examId}#gyakuten`;
  if (where === "top")
    return (
      <p className="m-0 mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-[12px] bg-[#FFF6D6] px-3 py-2 text-[13px] font-bold leading-snug">
        <span>
          逆転勉強法の途中です（{info.title}・{info.unitName}）。
        </span>
        <Link href={href} className="font-black text-[#1533B8]">
          作戦表にもどる →
        </Link>
      </p>
    );
  return (
    <section className="mt-5 rounded-[14px] border-[1.5px] border-[#15172B] bg-[#FFF6D6] p-4">
      <p className="m-0 text-[12px] font-black tracking-wider text-[#1533B8]">
        逆転勉強法
      </p>
      <p className="m-0 mt-0.5 text-[15px] font-black leading-snug">
        {info.unit
          ? `根っこから学びなおしたら、作戦表で「${info.unitName}」に印をつけて、次の単元へ。`
          : "根っこから学びなおしたら、作戦表で、つぶした単元に印をつけます。"}
      </p>
      <p className="m-0 mt-1 text-[12.5px] leading-relaxed text-[#3A3D55]">
        全部の単元をつぶしたら、もう一度ラスボス（{info.title}）に挑みます。
      </p>
      <Link
        href={href}
        className="mt-3 flex min-h-[52px] w-full items-center justify-center rounded-[12px] border-[1.5px] border-[#15172B] bg-[#1533B8] px-4 text-[15px] font-black text-white no-underline shadow-[0_3px_0_#0B1F7A]"
      >
        過去問の作戦表にもどる
      </Link>
    </section>
  );
}
