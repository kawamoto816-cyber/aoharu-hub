import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { plain } from "@/components/lecture/Rich";
import { UzLecturePage } from "@/components/unizeb/UzLecturePage";
import { UzLocked } from "@/components/unizeb/Locked";
import { UZ_LECTURES, cardInfo, getUzLecture } from "@/lib/unizeb";
import { canReadLecture } from "@/lib/unizeb/access";
import { serverPlan } from "@/lib/unizeb/server";

// /learn/unizeb/lec/<カードid>：ゼロワンOSユース版の図解レクチャー（起業の教科書）。中身は lib/unizeb/lectures。
const SITE = "https://app.bluespring.co.jp";

export function generateStaticParams() {
  return UZ_LECTURES.map((l) => ({ id: l.unit.replace(/^unizeb-/, "") }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const lec = getUzLecture(id);
  const c = cardInfo(id);
  if (!lec || !c) return {};
  const url = `${SITE}/learn/unizeb/lec/${id}`;
  const title = `${c.name}を図解で学ぶ（Lv${c.lv}）｜起業の教科書｜ゼロワンOSユース版｜アオハルOS`;
  const description = `${plain(lec.title)}。${plain(lec.hook).slice(0, 70)}…図解・よくあるまちがい・確認問題つき。`;
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url } };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lec = getUzLecture(id);
  if (!lec) notFound();
  // Lv1〜3 はだれでも（ログインを見ないので静的なページのまま）、Lv4 以降は Pro・Max（2026-11-04 承認の料金）
  const c = cardInfo(id);
  if (c && c.lv > 3 && !canReadLecture(await serverPlan(), c.lv))
    return <UzLocked kicker={`図解レクチャー　Lv${c.lv}`} title={plain(lec.title)} lead={plain(lec.hook)} mid={{ href: "/learn/unizeb#lec", label: "図解レクチャー" }} plan="pro" />;
  return <UzLecturePage lec={lec} id={id} />;
}
