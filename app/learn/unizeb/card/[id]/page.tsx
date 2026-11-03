import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LearnShell } from "@/components/learn/LearnShell";
import { Kicker, UZ_HOME, uzCrumbs } from "@/components/unizeb/parts";
import { UZ_CARDS, cardInfo, deptLabel, getUzLecture } from "@/lib/unizeb";

// /learn/unizeb/card/<id>：スキルカード（4段とAI採点）。
// フェーズ1（お手本）では入口だけ。カード本体（v3 の4段・採点・マイ事業ボード）はフェーズ2のパッチで入る。
export function generateStaticParams() {
  return UZ_CARDS.map((c) => ({ id: c.id }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const c = cardInfo((await params).id);
  return c ? { title: `${c.name}（Lv${c.lv}）｜スキルカード｜ゼロワンOSユース版｜アオハルOS`, robots: { index: false } } : {};
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = cardInfo(id);
  if (!c) notFound();
  const lec = getUzLecture(id);
  return (
    <LearnShell narrow crumbs={uzCrumbs(c.name, { href: `${UZ_HOME}#lec`, label: "スキルカード" })}>
      <Kicker>スキルカード　Lv{c.lv}・{deptLabel(c.dept)}・{id.toUpperCase()}</Kicker>
      <h1 className="m-0 mt-1 text-[26px] font-black leading-tight">{c.name}</h1>
      {lec && (
        <Link href={`${UZ_HOME}/lec/${id}`} className="mt-5 block rounded-[14px] border-[1.5px] border-[#15172B] bg-[#FFFBE6] p-3.5 text-[15px] font-black text-[#15172B] no-underline">
          図解レクチャーを読む →
        </Link>
      )}
      <p className="m-0 mt-5 rounded-[14px] border-[1.5px] border-dashed border-[#15172B] bg-white p-3.5 text-[14px] leading-relaxed">
        このカードの4段（つかむ・ためす・やってみる・できる）とAI採点は、準備ができしだいここに入ります。
      </p>
    </LearnShell>
  );
}
