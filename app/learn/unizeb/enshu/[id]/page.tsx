import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LearnShell } from "@/components/learn/LearnShell";
import { EnshuPage } from "@/components/unizeb/EnshuPage";
import { UZ_HOME, uzCrumbs } from "@/components/unizeb/parts";
import { UZ_CARDS, UZ_ENSHU, getEnshu } from "@/lib/unizeb";
import { enshuSkills } from "@/lib/unizeb/enshuKit";

// /learn/unizeb/enshu/<id>：演習（実務のワークブック）。Lv ごとの演習 "lv1"〜 と、修了演習 "shuryo-1"〜。中身は lib/unizeb/enshu。
const SITE = "https://app.bluespring.co.jp";

export function generateStaticParams() {
  return UZ_ENSHU.map((e) => ({ id: e.id }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const e = getEnshu((await params).id);
  if (!e) return {};
  const url = `${SITE}/learn/unizeb/enshu/${e.id}`;
  const label = e.kind === "shuryo" ? "修了演習" : `Lv${e.lv}の演習`;
  const title = `${e.title}｜${label}｜ゼロワンOSユース版｜アオハルOS`;
  const description = `架空の事業の資料を読み、${e.kind === "shuryo" ? `Lv1〜${e.lv}` : `Lv${e.lv}`}のスキルを組み合わせて課題に取り組む実務のワークブック。課題${e.tasks.length}問・合格${e.pass}点。合格した答案はスキルアセットとして残る。`;
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url } };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const e = getEnshu((await params).id);
  if (!e) notFound();
  const names = Object.fromEntries(
    enshuSkills(e).map((id) => {
      const c = UZ_CARDS.find((x) => x.id === id);
      return [id, { name: c?.name ?? id, lv: c?.lv ?? 0 }];
    }),
  );
  return (
    <LearnShell narrow crumbs={uzCrumbs(e.kind === "shuryo" ? "修了演習" : `Lv${e.lv}の演習`, { href: `${UZ_HOME}#enshu`, label: "演習" })}>
      <EnshuPage e={e} skillNames={names} />
    </LearnShell>
  );
}
