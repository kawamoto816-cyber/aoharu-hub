import type { Metadata } from "next";
import { LearnShell } from "@/components/learn/LearnShell";
import { TeacherDemo, type DemoUnit } from "@/components/kyoshitsu/TeacherDemo";
import { getLecture, lectureUnitInfo } from "@/lib/lecture";
import { plain } from "@/lib/oshieru";

// /learn/kyoshitsu/demo: 教室プランの先生用管理画面（試作）。見本の生徒と記録で動く。サーバーには何も保存しない。
// 仕様は Claude Docs「教室プラン 先生用管理画面 最小仕様（v0.1）」。導入パートナーに見せて意見をもらうための画面。

export const metadata: Metadata = {
  title: "先生用管理画面（試作・見本データ）｜教室プラン｜アオハルラーン",
  robots: { index: false, follow: false },
};

const DEMO_UNITS = ["j-math-1-seifu", "j-math-1-moji", "j-math-1-hoteishiki", "j-math-1-hirei", "j-math-1-heimen", "j-math-1-kukan", "j-math-1-data"];

export default function Page() {
  const units: DemoUnit[] = DEMO_UNITS.flatMap((id) => {
    const info = lectureUnitInfo(id);
    const lec = getLecture(id);
    if (!info || !lec) return [];
    return [{ id, name: plain(info.name), mistakes: lec.mistakes.slice(0, 2).map((m) => ({ wrong: plain(m.wrong), right: plain(m.right) })) }];
  });
  return (
    <LearnShell crumbs={[{ href: "/learn", label: "まなぶ" }, { label: "教室プラン 先生用管理画面（試作）" }]}>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">教室プラン（試作・見本データ）</p>
      <h1 className="m-0 mt-0.5 text-[24px] font-black leading-tight">先生用管理画面</h1>
      <p className="m-0 mb-4 mt-2 text-[13px] leading-relaxed text-[#3A3D55]">
        見本の教室（中学1年・数学、生徒8人）で動きを見る画面です。生徒の名前と記録はすべて架空で、操作しても保存されません。
      </p>
      <TeacherDemo units={units} />
    </LearnShell>
  );
}
