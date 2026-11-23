import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LearnShell } from "@/components/learn/LearnShell";
import { Challenge } from "@/components/kakomon/Challenge";
import { examPlayHref } from "@/lib/exam";
import { DNC_LINK_OK, getKakomon, KAKOMON } from "@/lib/kakomon/data";

// /learn/kakomon/<id>: 過去問チャレンジ。問題は載せず、マークシートの入力と採点だけをする。

export function generateStaticParams() {
  return KAKOMON.map((e) => ({ id: e.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const e = getKakomon((await params).id);
  if (!e) return {};
  return {
    title: `共通テスト ${e.year} ${e.kind} ${e.subject}｜過去問チャレンジ（マークシートで採点）｜アオハルラーン｜アオハルOS`,
    description: `共通テスト ${e.year} ${e.kind}「${e.subject}」を、手元の過去問を見ながら${e.minutes}分で解き、マークシートに答えを入れると、公式の配点で採点します。問題文はこのページには載せていません。`,
    robots: { index: false, follow: false },
  };
}

export default async function KakomonPlayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const e = getKakomon((await params).id);
  if (!e) notFound();
  return (
    <LearnShell
      narrow
      crumbs={[
        { href: "/learn", label: "まなぶ" },
        { href: "/learn/kakomon", label: "過去問チャレンジ" },
        { label: `${e.year} ${e.subject}` },
      ]}
    >
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">
        過去問チャレンジ・共通テスト
      </p>
      <h1 className="m-0 mt-1 text-[22px] font-black leading-snug">
        {e.year} {e.kind}　{e.subject}
      </h1>
      <p className="m-0 mb-4 mt-1 text-[13px] font-bold text-[#3A3D55]">
        {e.minutes}分・{e.total}点・大問{e.daimon.length}題
      </p>
      <Challenge
        exam={e}
        moshiHref={examPlayHref("kyotsu", { subject: e.moshi })}
        sourceLinkOk={DNC_LINK_OK}
      />
    </LearnShell>
  );
}
