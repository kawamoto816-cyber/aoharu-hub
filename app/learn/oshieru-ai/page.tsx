import type { Metadata } from "next";
import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import { Haru } from "@/components/oshieru/Haru";
import { hasOshieru, OSHIERU_HOME, plain } from "@/lib/oshieru";
import { oshieruAiHref } from "@/lib/oshieru/ai-lesson-home";
import { UNITS as JUGYO_UNITS } from "@/lib/jugyo";
import { lectureUnitInfo } from "@/lib/lecture";

// /learn/oshieru-ai: オシエルAI（声で教える授業）の入口。ちょっと待った授業がある単元を先に並べる（授業で聞く → 声で教える の順にためせる）。
// 2026-11-23 代表の公開OKで公開（サイトマップに入れる）。ほかの単元も /learn/oshieru-ai/<単元id> で開ける（全848単元）。

export const metadata: Metadata = {
  title: "オシエルAI｜声でハルに教える授業｜アオハルラーン",
  description: "AIの生徒ハルに、声で説明して教える授業。ちょっと待った授業の黒板を使って、先生役になって教えます。小学校から高校まで全848単元。",
};

export default function Page() {
  const units = JUGYO_UNITS.filter(hasOshieru).map((u) => ({ unit: u, info: lectureUnitInfo(u) }));
  return (
    <LearnShell narrow crumbs={[{ href: "/learn", label: "まなぶ" }, { label: "オシエルAI" }]}>
      <div className="flex items-center gap-3">
        <Haru face="happy" size={56} />
        <div>
          <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">学び方 3　教える</p>
          <h1 className="m-0 mt-0.5 text-[24px] font-black leading-tight">オシエルAI</h1>
        </div>
      </div>
      <p className="m-0 mb-4 mt-2 text-[14px] leading-relaxed text-[#3A3D55]">
        ちょっと待った授業の教室で、こんどはあなたが先生。AIの生徒ハルが声で「わからない」を持ってきます。黒板の図を見せながら、声で教えて、ハルを「わかった！」にしよう。
      </p>
      <ul className="m-0 grid list-none gap-1.5 p-0">
        {units.map(({ unit, info }) => (
          <li key={unit}>
            <Link href={oshieruAiHref(unit)} className="flex min-h-[52px] items-center justify-between gap-2 rounded-[12px] border-[1.5px] border-[#15172B] bg-white px-3 py-2 text-[#15172B] no-underline hover:bg-[#E6EAFB]">
              <span>
                <span className="block text-[11px] font-bold text-[#5A5D73]">{info ? `${info.level}・${info.subject}・${info.group}` : ""}</span>
                <span className="block text-[15px] font-black">{plain(info?.name ?? unit)}</span>
              </span>
              <span aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="m-0 mt-4 text-[12px] leading-relaxed text-[#5A5D73]">
        文字で教えるときは<Link href={OSHIERU_HOME} className="font-bold text-[#1533B8]">オシエル</Link>へ。AIにつながっていないときは、各単元の画面から台本モード（AIなし）でためせます。
      </p>
    </LearnShell>
  );
}
