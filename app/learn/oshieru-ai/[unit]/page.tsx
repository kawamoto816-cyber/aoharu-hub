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

// /learn/oshieru-ai/<単元id>: オシエルAI（声で教える授業）。ちょっと待った授業の「黒板＋キャラ」の画面で、生徒が先生役になり、
// AIの生徒ハルに声で教える。中身（誤解セット・採点・回数）は文字のオシエル（/learn/oshieru/<単元id>）と同じ。
// 2026-11-23 代表の公開OKで公開。単元ページは文字のオシエル（/learn/oshieru/<単元id>）と中身が同じなので、canonical をそちらに向けて検索の重複を避ける（入口 /learn/oshieru-ai はサイトマップに入れる）。?mock=1 で台本モード（AIなし）。

export async function generateMetadata({ params }: { params: Promise<{ unit: string }> }): Promise<Metadata> {
  const { unit } = await params;
  const name = getOshieru(unit)?.set.topic ?? "オシエルAI";
  return {
    title: `${name}を声でハルに教える｜オシエルAI｜アオハルラーン`,
    description: `「${name}」でまちがえているAIの生徒ハルに、声で説明して教える授業です。黒板の図を使って、先生役になって教えます。`,
    alternates: { canonical: oshieruHref(unit) },
  };
}

export default async function Page({ params, searchParams }: { params: Promise<{ unit: string }>; searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const { unit } = await params;
  const sp = await searchParams;
  const u = getOshieru(unit);
  if (!u) notFound();
  const pub = toPublic(u);
  const mock = sp.mock === "1";
  return (
    <LearnShell narrow crumbs={[{ href: "/learn", label: "まなぶ" }, { href: OSHIERU_AI_HOME, label: "オシエルAI" }, { label: pub.name }]}>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">オシエルAI　声で教える授業{pub.label && `　${pub.label}`}</p>
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
