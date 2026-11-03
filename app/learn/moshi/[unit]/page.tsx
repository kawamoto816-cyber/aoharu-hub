import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LearnShell } from "@/components/learn/LearnShell";
import { MoshiPlay, type MoshiUnit } from "@/components/moshi/MoshiPlay";
import { MOSHI_HOME, moshiUnitInfo } from "@/lib/moshi";
import { buildUnitRound, getUnitMoshi, unitMoshiHref, unitMoshiOf, unitView } from "@/lib/moshi/unit";
import { freshSeed, parseSeed } from "@/lib/moshi/rng";

// /learn/moshi/<単元id>?seed=123: 単元模試。lib/moshi/data/<単元id>.ts の UnitMoshi (なければその単元の大問) から、
// シードで1回分を組んで解く。A (生成) は数値、B (プール) は出る問題と選択肢の順が seed で変わる。seed がなければ毎回あたらしく作る。

const SITE = "https://app.bluespring.co.jp";

export async function generateMetadata({ params }: { params: Promise<{ unit: string }> }): Promise<Metadata> {
  const { unit } = await params;
  if (!unitMoshiOf(unit)) return {};
  const info = moshiUnitInfo(unit);
  const name = info?.name ?? unit;
  const where = info ? `（${info.level}${info.subject}・${info.group}）` : "";
  const url = `${SITE}${unitMoshiHref(unit)}`;
  const title = `${name}の単元模試${where}｜本番形式で解いて採点｜アオハルラーン｜アオハルOS`;
  const description = `${name}の単元模試。本番と同じように最後まで解いてから採点し、まちがえた問題は解き方つきで復習できます。${getUnitMoshi(unit) ? "解くたびに新しい問題になります。" : ""}登録なし・無料。`;
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url } };
}

export default async function UnitMoshiPage({ params, searchParams }: { params: Promise<{ unit: string }>; searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const { unit } = await params;
  const seed = parseSeed((await searchParams).seed) ?? freshSeed();
  const round = buildUnitRound(unit, seed);
  if (!round) notFound();
  const view = unitView(unit);
  const units: Record<string, MoshiUnit> = { [unit]: view };
  for (const u of new Set(round.daimon.flatMap((d) => d.items.map((it) => it.unit).filter((x): x is string => !!x)))) units[u] = unitView(u);
  const base = unitMoshiHref(unit);
  return (
    <LearnShell narrow crumbs={[{ href: "/learn", label: "まなぶ" }, { href: MOSHI_HOME, label: "テスト模試" }, { label: view.name }]}>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">{view.kids ? "たんげん もし" : "単元模試"}</p>
      <h1 className="m-0 mt-1 text-[22px] font-black leading-snug">{round.exam.title}</h1>
      <p className="m-0 mb-4 mt-1 text-[13px] font-bold text-[#3A3D55]">
        {round.varies ? (view.kids ? "とく たびに あたらしい もんだいに なるよ。" : "解くたびに新しい問題になります。") : ""}
        {view.lecture && (
          <Link href={view.lecture} className="ml-1 font-black text-[#1533B8]">
            {view.kids ? "さきに レクチャーを よむ" : "先に図解レクチャーを読む"} →
          </Link>
        )}
      </p>
      <MoshiPlay
        key={round.exam.id}
        exam={round.exam}
        daimon={round.daimon}
        units={units}
        kids={view.kids}
        homeHref={MOSHI_HOME}
        unitPage={{ unit, name: view.name, lecture: view.lecture, regenBase: round.varies ? base : undefined, seed }}
      />
    </LearnShell>
  );
}
