import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { plain } from "@/components/lecture/Rich";
import { AplLecturePage } from "@/components/apply-lec/AplLecturePage";
import { APL_LECTURES, aplField, aplUnit, getAplLecture } from "@/lib/apply-lec";

// /learn/apply/lec/<単元id>：「選ばれる力」の図解の教科書（小論文・面接・総合型選抜）の1単元。中身は lib/apply-lec/data。
const SITE = "https://app.bluespring.co.jp";

export function generateStaticParams() {
  return APL_LECTURES.map((l) => ({ id: l.unit }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const lec = getAplLecture(id);
  const u = aplUnit(id);
  const f = aplField(id);
  if (!lec || !u || !f) return {};
  const url = `${SITE}/learn/apply/lec/${id}`;
  const title = `${u.title}｜${f.name}の図解の教科書｜選ばれる力｜アオハルOS`;
  const description = `${plain(lec.title)}。${plain(lec.hook).slice(0, 70)}…図解・よくあるまちがい・確認問題つき。`;
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url } };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lec = getAplLecture(id);
  if (!lec) notFound();
  return <AplLecturePage lec={lec} />;
}
