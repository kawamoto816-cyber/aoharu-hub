import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LecturePage } from "@/components/lecture/LecturePage";
import { plain } from "@/components/lecture/Rich";
import { LECTURES, getLecture, lectureUnitInfo } from "@/lib/lecture";

// /learn/lecture/<単元id>: 図解レクチャー (なぜそうなるか・しくみを図で)。中身は lib/lecture/data。

const SITE = "https://app.bluespring.co.jp";

export function generateStaticParams() {
  return LECTURES.map((l) => ({ unit: l.unit }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ unit: string }> }): Promise<Metadata> {
  const { unit } = await params;
  const lec = getLecture(unit);
  if (!lec) return {};
  const info = lectureUnitInfo(unit);
  const name = info?.name ?? unit;
  const url = `${SITE}/learn/lecture/${unit}`;
  const where = info ? `（${info.level}${info.subject}・${info.group}）` : "";
  const title = `${name}を図解で理解する${where}｜図解レクチャー｜アオハルラーン｜アオハルOS`;
  const description = `${plain(lec.title)}。${plain(lec.hook).slice(0, 70)}…図解・よくあるまちがい・確認問題つき。登録なし・無料。`;
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url } };
}

export default async function Page({ params }: { params: Promise<{ unit: string }> }) {
  const lec = getLecture((await params).unit);
  if (!lec) notFound();
  return <LecturePage lec={lec} />;
}
