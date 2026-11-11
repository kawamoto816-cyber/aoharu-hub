import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LearnShell } from "@/components/learn/LearnShell";
import { OshieruAiStage } from "@/components/oshieru/OshieruAiStage";
import { getOshieru, oshieruHref } from "@/lib/oshieru";
import { OSHIERU_AI_HOME } from "@/lib/oshieru/ai-lesson-home";
import { lessonBoards } from "@/lib/oshieru/lesson";
import { toMockScript, toPublic } from "@/lib/oshieru/public";
import { hasJugyo, jugyoHref } from "@/lib/jugyo";

// /learn/oshieru-ai/<単元id>: オシエルAI（声で教える授業・試作）。止まる授業の「黒板＋キャラ」の画面で、生徒が先生役になり、
// AIの生徒ハルに声で教える。中身（誤解セット・採点・回数）は文字のオシエル（/learn/oshieru/<単元id>）と同じ。
// 試作なので noindex・サイトマップに入れない。?mock=1 で台本モード（AIなし）。

export const metadata: Metadata = {
  title: "オシエルAI（試作）｜声でハルに教える授業｜アオハルラーン",
  robots: { index: false, follow: false },
};

export default async function Page({ params, searchParams }: { params: Promise<{ unit: string }>; searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const { unit } = await params;
  const sp = await searchParams;
  const u = getOshieru(unit);
  if (!u) notFound();
  const pub = toPublic(u);
  const mock = sp.mock === "1";
  return (
    <LearnShell narrow crumbs={[{ href: "/learn", label: "まなぶ" }, { href: OSHIERU_AI_HOME, label: "オシエルAI（試作）" }, { label: pub.name }]}>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">オシエルAI（試作）　声で教える授業{pub.label && `　${pub.label}`}</p>
      <h1 className="m-0 mt-1 text-[24px] font-black leading-tight">{pub.name}</h1>
      <p className="m-0 mb-4 mt-1.5 text-[14px] leading-relaxed text-[#3A3D55]">今日の先生は、あなた。AIの生徒ハルがつまずいています。黒板の図を見せながら、声で教えてあげよう。</p>
      <OshieruAiStage key={mock ? "mock" : "live"} unit={pub} boards={lessonBoards(u)} mock={mock} mockScript={mock ? toMockScript(u) : undefined} jugyoHref={hasJugyo(unit) ? jugyoHref(unit) : undefined} />
      <p className="m-0 mt-5 text-center text-[12.5px] text-[#3A3D55]">
        声が使えないときは
        <Link href={oshieruHref(unit)} className="font-bold text-[#1533B8]">
          文字のオシエル
        </Link>
        で。
      </p>
    </LearnShell>
  );
}
