import type { Metadata } from "next";
import { LearnShell } from "@/components/learn/LearnShell";
import { SansuHome } from "@/components/sansu/SansuHome";
import { STEP_COUNT } from "@/lib/sansu/steps";

// /learn/sansu: AOHARU MATH 小学校「小学算数 計算○段」。中学数学 計算50段 (/learn/math) と同じしくみ。
// 問題はプログラムで毎回作り、その場で採点する (AI は使わない)。登録なし・無料。進み具合はこの端末に保存。

const URL = "https://app.bluespring.co.jp/learn/sansu";
const TITLE = `小学算数 計算${STEP_COUNT}段｜無料の計算ドリル・その場で採点｜AOHARU MATH｜アオハルOS`;
const DESC = `1年生のたし算・ひき算から、九九、わり算の筆算、小数・分数の計算、割合・速さ、6年生の分数のわり算・比・円の面積まで、小学校の算数の計算を${STEP_COUNT}段に分けた無料ドリル。10問ごとにその場で採点し、満点になるまで解き直し。目標時間内に満点なら次の段へ。登録なしで使えます。`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL },
};

export default function SansuTop() {
  return (
    <LearnShell crumbs={[{ href: "/learn", label: "まなぶ" }, { href: "/learn/school", label: "学校の教科" }, { label: "算数" }]}>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">AOHARU MATH　小学校の算数</p>
      <h1 className="m-0 mt-1 text-[28px] font-black sm:text-[34px]">小学算数 計算{STEP_COUNT}段</h1>
      <p className="mb-0 mt-2 max-w-[720px] text-[16px] leading-relaxed text-[#3A3D55]">
        10問ずつ、その場で まるつけ。まちがえた問題は、満点になるまで 解き直します。解き直しなしで満点、しかも目標の時間内なら合格。2セット続けて合格すると、次の段へ進めます。問題は毎回ちがう数で作られるので、何度でも練習できます。登録なし・無料。
      </p>
      <div className="mt-6">
        <SansuHome />
      </div>
    </LearnShell>
  );
}
