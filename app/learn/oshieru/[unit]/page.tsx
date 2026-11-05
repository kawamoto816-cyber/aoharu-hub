import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LearnShell } from "@/components/learn/LearnShell";
import { OshieruPlay } from "@/components/oshieru/OshieruPlay";
import { OSHIERU_HOME, getOshieru } from "@/lib/oshieru";
import { toMockScript, toPublic } from "@/lib/oshieru/public";

// /learn/oshieru/<単元id>: オシエル（AIの生徒ハルに教える）の1回分。入口は図解レクチャーのページの「ハルに教える」。
// 代表の公開OKが出るまで noindex・サイトマップに入れない。
// ?mock=1 で台本モード（AIなし）。誤解セットのうち、言い直しのまちがいの有無と採点の条件はクライアントに渡さない（台本モードのときだけ台本を渡す）。

export const metadata: Metadata = {
  title: "オシエル｜AIの生徒ハルに教える｜アオハルラーン",
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
    <LearnShell narrow crumbs={[{ href: "/learn", label: "まなぶ" }, { href: OSHIERU_HOME, label: "オシエル" }, { label: pub.name }]}>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">オシエル　教えてマスター{pub.label && `　${pub.label}`}</p>
      <h1 className="m-0 mt-1 text-[24px] font-black leading-tight">{pub.name}</h1>
      <p className="m-0 mb-4 mt-1.5 text-[14px] leading-relaxed text-[#3A3D55]">AIの生徒ハルが、この単元でつまずいています。あなたが先生になって、わかるまで教えてあげよう。</p>
      <OshieruPlay key={mock ? "mock" : "live"} unit={pub} mock={mock} mockScript={mock ? toMockScript(u) : undefined} />
    </LearnShell>
  );
}
