import type { Metadata } from "next";
import Link from "next/link";
import { LearnShell } from "@/components/learn/LearnShell";
import { UZ_HOME, uzCrumbs } from "@/components/unizeb/parts";
import { V3App } from "@/components/unizeb/V3App";
import { UZ_LECTURES } from "@/lib/unizeb";
import { currentPlan } from "@/lib/unizeb/access";

// /learn/unizeb/board：マイ事業ボード（ユニゼブ v3 のボードの画面から始める）。
export const metadata: Metadata = { title: "マイ事業ボード｜ゼロワンOSユース版｜アオハルOS", robots: { index: false } };

export default async function Page() {
  const plan = await currentPlan();
  const lectureIds = UZ_LECTURES.map((l) => l.unit.replace(/^unizeb-/, ""));
  return (
    <LearnShell crumbs={uzCrumbs("マイ事業ボード")}>
      <div className="mx-auto mt-4 max-w-[760px]">
        <V3App startBoard pro={plan === "max"} lectureIds={lectureIds} />
        <Link href={`${UZ_HOME}/assets`} className="mt-4 block rounded-[14px] border-[1.5px] border-[#15172B] bg-white p-3.5 text-[15px] font-black text-[#15172B] no-underline">
          合格した答案の一覧（スキルアセット）→
          <span className="mt-1 block text-[12.5px] font-bold text-[#3A3D55]">志望理由書・ガクチカ・ES に使える、合格した答えの記録</span>
        </Link>
      </div>
    </LearnShell>
  );
}
