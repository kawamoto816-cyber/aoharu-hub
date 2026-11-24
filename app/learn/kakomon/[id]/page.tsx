import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LearnShell } from "@/components/learn/LearnShell";
import { Challenge, type UnitLink } from "@/components/kakomon/Challenge";
import { hasLecture, lectureHref, lectureUnitInfo } from "@/lib/lecture";
import { hasUnitMoshi, unitMoshiHref } from "@/lib/moshi/unit";
import { hasPrereq } from "@/lib/sakanobori";
import { plain } from "@/components/lecture/Rich";
import { unitsOfExam } from "@/lib/kakomon/units";
import { examPlayHref } from "@/lib/exam";
import { getKakomon, KAKOMON } from "@/lib/kakomon/data";

// /learn/kakomon/<id>: 過去問チャレンジのマークシート。問題は載せず、入力と採点だけをする。?start=1 で開くとすぐに時計が動く。

const SITE = "https://app.bluespring.co.jp";

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
  const title = `共通テスト ${e.year} ${e.kind} ${e.subject}｜過去問マークシートで採点｜アオハルラーン｜アオハルOS`;
  const description = `大学入学共通テスト ${e.year} ${e.kind}「${e.subject}」を、大学入試センターの問題を見ながら${e.minutes}分で解き、マークシートに答えを入れると、公式の正解と配点で採点します。大問ごとの得点も出ます。`;
  const url = `${SITE}/learn/kakomon/${e.id}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
  };
}

export default async function KakomonPlayPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const e = getKakomon((await params).id);
  if (!e) notFound();
  const autoStart = (await searchParams).start === "1";
  // 解答欄 → 単元の対応表があれば、結果の画面で、まちがえた単元からさかのぼりへつなぐ
  const units = unitsOfExam(e.id);
  const unitLinks: Record<string, UnitLink> = {};
  for (const u of new Set(Object.values(units ?? {}))) {
    const info = lectureUnitInfo(u);
    if (!info) continue;
    unitLinks[u] = {
      name: plain(info.name),
      where: /^[小中高]\d/.test(info.group)
        ? info.group
        : `${info.level === "高校" ? "高校" : info.level} ${info.group}`,
      ...(hasLecture(u) ? { lecture: lectureHref(u) } : {}),
      ...(hasUnitMoshi(u) ? { moshi: unitMoshiHref(u) } : {}),
      sakanobori: hasPrereq(u),
    };
  }
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
        autoStart={autoStart}
        {...(units ? { units, unitLinks } : {})}
      />
    </LearnShell>
  );
}
