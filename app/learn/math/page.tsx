import type { Metadata } from "next";
import { LearnShell } from "@/components/learn/LearnShell";
import { MathHome } from "@/components/math/MathHome";

// /learn/math: AOHARU MATH 数学「中学数学 計算50段」。鍛えるエンジンの最初の教科。
// 問題はプログラムで毎回作り、その場で採点する (AI は使わない)。登録なし・無料。進み具合はこの端末に保存。

const URL = "https://app.bluespring.co.jp/learn/math";
const TITLE = "中学数学 計算50段｜無料の計算ドリル・その場で採点・満点まで解き直し｜AOHARU MATH｜アオハルOS";
const DESC = "正負の数から文字式、一次方程式、連立方程式、展開・因数分解、平方根、二次方程式まで、中学数学の計算を50段に分けた無料ドリル。10問ごとにその場で採点し、満点になるまで解き直し。目標時間内に満点なら次の段へ。登録なしで使えます。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL },
};

export default function MathTop() {
  return (
    <LearnShell crumbs={[{ href: "/", label: "アオハルOS" }, { href: "/learn", label: "まなぶ" }, { label: "数学" }]}>
      <p className="m-0 text-xs font-black tracking-wider text-[#1533B8]">AOHARU MATH　数学</p>
      <h1 className="m-0 mt-1 text-[26px] font-black sm:text-[32px]">中学数学 計算50段</h1>
      <p className="mb-0 mt-2 max-w-[720px] text-[15px] leading-relaxed text-[#3A3D55]">
        覚える・鍛える・教えるのうち「鍛える」。10問ずつ、その場で採点して、まちがえた問題は満点になるまで解き直します。解き直しなしで満点、しかも目標時間内なら合格。2セット続けて合格すると次の段へ進めます。問題は毎回ちがう数で作られるので、何度でも修行できます。登録なし・無料。
      </p>
      <div className="mt-6">
        <MathHome />
      </div>
    </LearnShell>
  );
}
