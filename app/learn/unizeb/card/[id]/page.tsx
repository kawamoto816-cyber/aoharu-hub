import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LearnShell } from "@/components/learn/LearnShell";
import { Kicker, UZ_HOME, uzCrumbs } from "@/components/unizeb/parts";
import { V3App } from "@/components/unizeb/V3App";
import { UZ_CARDS, UZ_LECTURES, cardInfo, deptLabel, getUzLecture } from "@/lib/unizeb";
import { canReadLecture, canUseCard } from "@/lib/unizeb/access";
import { serverPlan } from "@/lib/unizeb/server";

// /learn/unizeb/card/<id>：スキルカード（ユニゼブ v3 の4段・AI採点・マイ事業ボード）。そのカードを開いた状態で始める。
// Lv4 以降は access.ts で判定し、Max でなければ案内だけ（カードの中身は出さない）。
export function generateStaticParams() {
  return UZ_CARDS.map((c) => ({ id: c.id }));
}
export const dynamicParams = false;
// プラン（ログイン）で見せる中身が変わるので、毎回サーバーで組み立てる
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const c = cardInfo((await params).id);
  return c ? { title: `${c.name}（Lv${c.lv}）｜スキルカード｜ゼロワンOSユース版｜アオハルOS`, robots: { index: false } } : {};
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = cardInfo(id);
  if (!c) notFound();
  const plan = await serverPlan();
  const lec = getUzLecture(id);
  const crumbs = uzCrumbs(c.name, { href: `${UZ_HOME}#lec`, label: "スキルカード" });
  if (!canUseCard(plan, c.lv)) {
    return (
      <LearnShell narrow crumbs={crumbs}>
        <Kicker>スキルカード　Lv{c.lv}・{deptLabel(c.dept)}・{id.toUpperCase()}</Kicker>
        <h1 className="m-0 mt-1 text-[26px] font-black leading-tight">{c.name}</h1>
        <p className="m-0 mt-5 rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-3.5 text-[15px] font-black leading-relaxed">このカードは Max で使えます。</p>
        <p className="m-0 mt-3 text-[14px] leading-relaxed">
          Lv4〜15 のスキルカード（4段とAI採点）は Max のプランで開きます。Lv1〜3 の24枚は、登録しなくても使えます。
        </p>
        {lec && (
          <Link href={`${UZ_HOME}/lec/${id}`} className="mt-4 block rounded-[14px] border-[1.5px] border-[#15172B] bg-[#FFFBE6] p-3.5 text-[15px] font-black text-[#15172B] no-underline">
            図解レクチャーを読む →{!canReadLecture(plan, c.lv) && <span className="mt-1 block text-[12.5px] font-bold text-[#3A3D55]">Lv4 以降のレクチャーは Pro・Max で読めます</span>}
          </Link>
        )}
        <Link href={`${UZ_HOME}/card/z1-01`} className="mt-3 inline-block text-[14px] font-bold text-[#1533B8]">
          Lv1 のカードから始める →
        </Link>
      </LearnShell>
    );
  }
  const lectureIds = UZ_LECTURES.map((l) => l.unit.replace(/^unizeb-/, ""));
  return (
    <LearnShell crumbs={crumbs}>
      <div className="mx-auto mt-4 max-w-[760px]">
        <V3App startId={id} pro={c.lv > 3 || plan === "max"} lectureIds={lectureIds} />
        <p className="m-0 mt-4 text-[13px] font-bold">
          <Link href={`${UZ_HOME}/board`} className="text-[#1533B8]">マイ事業ボード</Link>
          <span className="mx-2 text-[#3A3D55]">/</span>
          <Link href={`${UZ_HOME}/assets`} className="text-[#1533B8]">合格した答案の一覧</Link>
        </p>
      </div>
    </LearnShell>
  );
}
