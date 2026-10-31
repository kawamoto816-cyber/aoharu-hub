import type { Metadata } from "next";
import { LearnShell } from "@/components/learn/LearnShell";
import { KousuuHome } from "@/components/kousuu/KousuuHome";
import { STEP_COUNT } from "@/lib/kousuu/steps";

// /learn/kousuu: AOHARU MATH 高校「高校数学 計算○段」。中学数学 計算50段 (/learn/math)・小学算数 (/learn/sansu) と同じしくみ。
// 問題はプログラムで毎回作り、その場で採点する (AI は使わない)。登録なし・無料。進み具合はこの端末に保存。

const URL = "https://app.bluespring.co.jp/learn/kousuu";
const TITLE = `高校数学 計算${STEP_COUNT}段｜数学Ⅰ・A・Ⅱの計算ドリル・その場で採点｜AOHARU MATH｜アオハルOS`;
const DESC = `展開・因数分解・根号・不等式・二次関数・三角比 (数学Ⅰ)、場合の数・確率・整数 (数学A)、複素数・指数・対数・三角関数・微分・積分 (数学Ⅱ) まで、高校数学の計算を${STEP_COUNT}段に分けた無料ドリル。10問ごとにその場で採点し、満点になるまで解き直し。目標時間内に満点なら次の段へ。登録なしで使えます。`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL },
};

export default function KousuuTop() {
  return (
    <LearnShell crumbs={[{ href: "/learn", label: "まなぶ" }, { href: "/learn/school", label: "学校の教科" }, { label: "高校数学" }]}>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">AOHARU MATH　高校の数学</p>
      <h1 className="m-0 mt-1 text-[28px] font-black sm:text-[34px]">高校数学 計算{STEP_COUNT}段</h1>
      <p className="mb-0 mt-2 max-w-[720px] text-[16px] leading-relaxed text-[#3A3D55]">
        数学Ⅰ・数学A・数学Ⅱの計算を、やさしい段から順に。10問ずつ、その場で採点。まちがえた問題は、満点になるまで解き直します。解き直しなしで満点、しかも目標の時間内なら合格。2セット続けて合格すると、次の段へ進めます。問題は毎回ちがう数で作られるので、何度でも練習できます。登録なし・無料。
      </p>
      <div className="mt-6">
        <KousuuHome />
      </div>
    </LearnShell>
  );
}
