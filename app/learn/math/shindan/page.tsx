import type { Metadata } from "next";
import { LearnShell } from "@/components/learn/LearnShell";
import { ShindanLoader } from "@/components/math/ShindanLoader";

const URL = "https://app.bluespring.co.jp/learn/math/shindan";
const TITLE = "中学数学 計算の学力診断（約10分）｜どの段から始めるかを決める｜アオハルOS";
const DESC = "正負の数から二次方程式まで、各単元2問ずつのやさしい順の診断で、中学数学 計算50段のどこから始めるかを決めます。登録なし・無料。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL },
};

export default function ShindanPage() {
  return (
    <LearnShell narrow crumbs={[{ href: "/learn", label: "まなぶ" }, { href: "/learn/math", label: "数学" }, { label: "学力診断" }]}>
      <h1 className="m-0 text-[22px] font-black">学力診断</h1>
      <p className="mb-4 mt-1 text-[14px] leading-relaxed text-[#3A3D55]">各単元から2問ずつ、やさしい順に出します。2問とも正解なら次の単元へ。まちがえたところの単元の最初から始めます。紙と鉛筆を用意してください。</p>
      <ShindanLoader />
    </LearnShell>
  );
}
