import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LearnShell } from "@/components/learn/LearnShell";
import { TsukkomiPlay } from "@/components/tsukkomi/TsukkomiPlay";
import { lectureHref, lectureUnitInfo } from "@/lib/lecture";
import { MOSHI_HOME, hasMoshi, moshiHref } from "@/lib/moshi";
import { TSUKKOMI_HOME, TSUKKOMI_UNITS, getTsukkomi } from "@/lib/tsukkomi";
import { withAudio } from "@/lib/tsukkomi/audio";

// /learn/tsukkomi/<単元id>: ツッコミ学習法の1回分（10問）。データ (lib/tsukkomi) と音声ファイルの場所はサーバーで組み、遊ぶ・採点はクライアント。

const SITE = "https://app.bluespring.co.jp";

export function generateStaticParams() {
  return TSUKKOMI_UNITS.map((unit) => ({ unit }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ unit: string }> }): Promise<Metadata> {
  const { unit } = await params;
  if (!getTsukkomi(unit)) return {};
  const info = lectureUnitInfo(unit);
  const name = info?.name ?? unit;
  const url = `${SITE}${TSUKKOMI_HOME}/${unit}`;
  const title = `${name}のボケにツッコめ｜ツッコミ学習法｜アオハルラーン｜アオハルOS`;
  const description = `${info ? `${info.group}${info.subject}「${name}」` : name}の、わざとまちがえた文（ボケ）を制限時間内に訂正する。速く正確なほど高得点。正しい文は見抜いてスルー。登録なし・無料。`;
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url } };
}

export default async function Page({ params }: { params: Promise<{ unit: string }> }) {
  const { unit } = await params;
  const list = getTsukkomi(unit);
  if (!list) notFound();
  const info = lectureUnitInfo(unit);
  const name = info?.name ?? unit;
  const label = info ? `${info.group}${info.subject}` : "";
  return (
    <LearnShell narrow crumbs={[{ href: "/learn", label: "まなぶ" }, { href: TSUKKOMI_HOME, label: "ツッコミ学習法" }, { label: name }]}>
      <p className="m-0 text-xs font-black tracking-wider text-[#B42318]">ツッコミ学習法{label && `　${label}`}</p>
      <h1 className="m-0 mt-1 text-[24px] font-black leading-tight">{name}</h1>
      <p className="m-0 mb-4 mt-1.5 text-[14px] leading-relaxed text-[#3A3D55]">ボケ役が、わざとまちがえて言います。すかさずツッコんで、正しく言い直そう。</p>
      <TsukkomiPlay
        unit={unit}
        items={list.map(withAudio)}
        lectureHref={lectureHref(unit)}
        moshiHref={hasMoshi(unit) ? moshiHref([unit]) : undefined}
        moshiHome={MOSHI_HOME}
        homeHref={TSUKKOMI_HOME}
      />
    </LearnShell>
  );
}
