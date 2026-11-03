import type { Metadata } from "next";
import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import { MoshiPlay, type MoshiUnit } from "@/components/moshi/MoshiPlay";
import { buildExam, getDaimon, MOSHI_HOME, moshiUnitInfo, resolveDaimon } from "@/lib/moshi";
import { hasLecture, lectureHref } from "@/lib/lecture";
import type { Daimon } from "@/lib/moshi/types";

// /learn/moshi/play?units=a,b,c: 範囲 (単元id) から1回分を組んで解く。組むのと図の参照をほどくのはサーバー側、解く・採点はクライアント。

export const metadata: Metadata = {
  title: "定期テスト模試を解く｜アオハルラーン｜アオハルOS",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://app.bluespring.co.jp/learn/moshi" },
};

export default async function MoshiPlayPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const raw = (await searchParams).units;
  const ids = (Array.isArray(raw) ? raw.join(",") : (raw ?? "")).split(",").map((s) => s.trim()).filter(Boolean).slice(0, 12);
  const exam = buildExam(ids);
  const crumbs = [{ href: "/learn", label: "まなぶ" }, { href: MOSHI_HOME, label: "定期テスト模試" }, { label: "解く" }];
  if (!exam)
    return (
      <LearnShell narrow crumbs={crumbs}>
        <h1 className="m-0 text-[22px] font-black">この範囲の模試はまだありません</h1>
        <p className="m-0 mt-2 text-[14px] text-[#3A3D55]">単元をえらび直してください。</p>
        <Link href={MOSHI_HOME} className="mt-4 flex min-h-[56px] items-center justify-center rounded-[14px] border-[1.5px] border-[#15172B] bg-[#1533B8] text-[17px] font-black text-white no-underline">
          範囲をえらぶ →
        </Link>
      </LearnShell>
    );
  const daimon = exam.daimon.map((id) => getDaimon(id)).filter((d): d is Daimon => !!d).map(resolveDaimon);
  const units: Record<string, MoshiUnit> = {};
  for (const u of new Set(daimon.flatMap((d) => [...d.units, ...d.items.map((it) => it.unit).filter((x): x is string => !!x)]))) {
    const info = moshiUnitInfo(u);
    units[u] = { name: info?.name ?? u, href: info?.href ?? "", lecture: hasLecture(u) ? lectureHref(u) : undefined, subject: info ? `${info.level}${info.subject}` : "", kids: info?.kids ?? false };
  }
  const kids = exam.units.every((u) => units[u]?.kids);
  return (
    <LearnShell narrow crumbs={crumbs}>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">{kids ? "テストもし" : "定期テスト模試"}</p>
      <h1 className="m-0 mt-1 text-[22px] font-black leading-snug">{exam.title}</h1>
      <p className="m-0 mb-4 mt-1 text-[13px] font-bold text-[#3A3D55]">範囲：{exam.units.map((u) => units[u]?.name ?? u).join("・")}</p>
      <MoshiPlay key={exam.id} exam={exam} daimon={daimon} units={units} kids={kids} homeHref={MOSHI_HOME} saveUnit={exam.kind === "tangen" ? exam.id.replace(/^auto:/, "") : undefined} />
    </LearnShell>
  );
}
