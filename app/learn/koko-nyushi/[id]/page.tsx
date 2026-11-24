import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LearnShell } from "@/components/learn/LearnShell";
import type { UnitLink } from "@/components/kakomon/Challenge";
import { NijiChallenge } from "@/components/niji/NijiChallenge";
import { hasLecture, lectureHref, lectureUnitInfo } from "@/lib/lecture";
import { hasUnitMoshi, unitMoshiHref } from "@/lib/moshi/unit";
import { hasPrereq } from "@/lib/sakanobori";
import { plain } from "@/components/lecture/Rich";
import { getKijutsu, kijutsuHref, trackName } from "@/lib/kijutsu";
import { getKoko, KOKO } from "@/lib/koko";
import { daimonPoints } from "@/lib/niji/types";

// /learn/koko-nyushi/<id>: 公立高校入試の過去問チャレンジ。問題は載せず、時間・自己採点・作戦表だけ（画面は 2次試験の過去問チャレンジと同じ）。
// 試しの公開なので、検索には出さない (robots: noindex)。

export function generateStaticParams() {
  return KOKO.map((e) => ({ id: e.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const e = getKoko((await params).id);
  if (!e) return {};
  return {
    title: `${e.univ} ${e.year} ${e.subject}｜公立高校入試の過去問チャレンジ｜アオハルラーン｜アオハルOS`,
    description: `${e.univ} ${e.year} ${e.kind}「${e.subject}」を解き、設問ごとに自己採点して、落とした点を単元に分ける作戦表を出します。問題は教育委員会の公開ページで開きます。`,
    robots: { index: false, follow: false },
  };
}

export default async function KokoPlayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const e = getKoko((await params).id);
  if (!e) notFound();
  const unitLinks: Record<string, UnitLink> = {};
  const lessonLinks: Record<
    string,
    { name: string; where: string; href: string }
  > = {};
  for (const d of e.daimon)
    for (const b of d.blocks)
      for (const it of b.items) {
        const les = it.lesson ? getKijutsu(it.lesson) : undefined;
        if (les && !lessonLinks[les.id])
          lessonLinks[les.id] = {
            name: les.title,
            where: `記述の階段 ${trackName(les.track)} 第${les.no}段`,
            href: kijutsuHref(les.id),
          };
        if (unitLinks[it.unit]) continue;
        const info = lectureUnitInfo(it.unit);
        if (!info) continue;
        unitLinks[it.unit] = {
          name: plain(info.name),
          where: `${info.level === "高校" ? "高校" : info.level} ${info.group}`,
          ...(hasLecture(it.unit) ? { lecture: lectureHref(it.unit) } : {}),
          ...(hasUnitMoshi(it.unit) ? { moshi: unitMoshiHref(it.unit) } : {}),
          sakanobori: hasPrereq(it.unit),
        };
      }
  const total = e.daimon.reduce((a, d) => a + daimonPoints(d), 0);
  return (
    <LearnShell
      narrow
      crumbs={[
        { href: "/learn", label: "まなぶ" },
        { href: "/learn/koko-nyushi", label: "公立高校入試の過去問チャレンジ" },
        { label: `${e.univ} ${e.subject}` },
      ]}
    >
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">
        過去問チャレンジ・公立高校入試
      </p>
      <h1 className="m-0 mt-1 text-[22px] font-black leading-snug">
        {e.univ} {e.year}　{e.subject}
      </h1>
      <p className="m-0 mb-4 mt-1 text-[13px] font-bold text-[#3A3D55]">
        {e.kind}・{e.minutes}分・{total}点・大問{e.daimon.length}題
      </p>
      <NijiChallenge exam={e} unitLinks={unitLinks} lessonLinks={lessonLinks} />
    </LearnShell>
  );
}
