import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EpPage } from "@/components/unizeb/EpPage";
import { plain } from "@/components/lecture/Rich";
import { UzLocked } from "@/components/unizeb/Locked";
import { UZ_EP, getEp } from "@/lib/unizeb";
import { canReadCase } from "@/lib/unizeb/access";
import { serverPlan } from "@/lib/unizeb/server";

// /learn/unizeb/ep/<id>：ゼロイチ・エピソード（実在の会社の0→1の決断の場面）。中身は lib/unizeb/ep。
const SITE = "https://app.bluespring.co.jp";

export function generateStaticParams() {
  return UZ_EP.map((e) => ({ id: e.id }));
}
export const dynamicParams = false;
// プラン（ログイン）で見せる中身が変わるので、毎回サーバーで組み立てる
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const e = getEp((await params).id);
  if (!e) return {};
  const url = `${SITE}/learn/unizeb/ep/${e.id}`;
  const title = `${e.title}｜ゼロイチ・エピソード｜ゼロワンOSユース版｜アオハルOS`;
  const description = `${e.company}（${e.year}）の0→1の決断の場面。あなたならどうするかを考えてから、実際の決断とその後を出典つきで読む。`;
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url } };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const e = getEp((await params).id);
  if (!e) notFound();
  // 判定はケースと同じ canReadCase。エピソードは見本がないので Pro・Max だけ（2026-11-04 承認の料金）
  if (!canReadCase(await serverPlan(), e.id))
    return <UzLocked kicker="ゼロイチ・エピソード" title={e.title} lead={plain(e.question)} mid={{ href: "/learn/unizeb#ep", label: "ゼロイチ・エピソード" }} plan="pro" />;
  return <EpPage e={e} />;
}
