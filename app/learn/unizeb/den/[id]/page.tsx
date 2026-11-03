import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { plain } from "@/components/lecture/Rich";
import { DenPage } from "@/components/unizeb/DenPage";
import { UzLocked } from "@/components/unizeb/Locked";
import { UZ_DEN, getDen } from "@/lib/unizeb";
import { canReadDen } from "@/lib/unizeb/access";
import { serverPlan } from "@/lib/unizeb/server";

// /learn/unizeb/den/<id>：起業家列伝。中身は lib/unizeb/den（事実は出典つき）。
const SITE = "https://app.bluespring.co.jp";

export function generateStaticParams() {
  return UZ_DEN.map((d) => ({ id: d.id }));
}
export const dynamicParams = false;
// プラン（ログイン）で見せる中身が変わるので、毎回サーバーで組み立てる
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const d = getDen((await params).id);
  if (!d) return {};
  const url = `${SITE}/learn/unizeb/den/${d.id}`;
  const title = `${d.name}｜起業家列伝｜ゼロワンOSユース版｜アオハルOS`;
  const description = `${plain(d.title)}。年表・0→1の場面・使ったスキル・出典つき。`;
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url } };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const d = getDen((await params).id);
  if (!d) notFound();
  // 見本の3人はだれでも、ほかは Pro・Max（2026-11-04 承認の料金）
  if (!canReadDen(await serverPlan(), d.id))
    return <UzLocked kicker="起業家列伝" title={d.name} lead={plain(d.title)} mid={{ href: "/learn/unizeb#den", label: "起業家列伝" }} plan="pro" />;
  return <DenPage d={d} />;
}
