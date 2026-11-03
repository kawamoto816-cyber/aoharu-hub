import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CasePage } from "@/components/unizeb/CasePage";
import { UZ_CASES, getCase } from "@/lib/unizeb";

// /learn/unizeb/case/<id>：ケーススタディー（状況→問い→選択肢→実際→学び）。中身は lib/unizeb/case。
const SITE = "https://app.bluespring.co.jp";

export function generateStaticParams() {
  return UZ_CASES.map((c) => ({ id: c.id }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const c = getCase((await params).id);
  if (!c) return {};
  const url = `${SITE}/learn/unizeb/case/${c.id}`;
  const title = `${c.title}｜ケーススタディー｜ゼロワンOSユース版｜アオハルOS`;
  const description = `${c.real ? "実在の企業の" : "架空の"}ケースで、あなたならどうするかを考える。状況・選択肢・${c.real ? "実際の判断" : "結末"}・学びつき。`;
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url } };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const c = getCase((await params).id);
  if (!c) notFound();
  return <CasePage c={c} />;
}
