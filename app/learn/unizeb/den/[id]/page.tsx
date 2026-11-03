import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { plain } from "@/components/lecture/Rich";
import { DenPage } from "@/components/unizeb/DenPage";
import { UZ_DEN, getDen } from "@/lib/unizeb";

// /learn/unizeb/den/<id>：起業家列伝。中身は lib/unizeb/den（事実は出典つき）。
const SITE = "https://app.bluespring.co.jp";

export function generateStaticParams() {
  return UZ_DEN.map((d) => ({ id: d.id }));
}
export const dynamicParams = false;

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
  return <DenPage d={d} />;
}
