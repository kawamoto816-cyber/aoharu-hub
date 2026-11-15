import type { Metadata } from "next";
import { SeriesPage } from "@/components/exam/SeriesPage";

// /learn/kyotsu-moshi: 共通テスト模試 (高校向け)。共通テスト型 (lib/exam) の6つの型を、第1回〜の回にして出す。

const URL = "https://app.bluespring.co.jp/learn/kyotsu-moshi";
const TITLE = "共通テスト模試（国語・数学・英語・情報Ⅰ）｜マーク式で時間を計って解く｜アオハルラーン｜アオハルOS";
const DESC = "国語（90分・200点）、数学Ⅰ・A、数学Ⅱ・B・C（各70分）、英語リーディング（80分）、英語リスニング（読み上げ音声つき・30分）、情報Ⅰ（60分）。マーク式の大問構成で、第1回〜第6回は同じ問題、おまかせは毎回ちがう問題。問題はすべてオリジナルの予想問題です。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL },
};

export default function KyotsuMoshiPage() {
  return (
    <SeriesPage
      id="kyotsu"
      lead="選択肢と数値で答えるマーク式の練習です。国語・数学・英語・情報Ⅰの6つの型を、時間を計って解きます。英語リスニングは、端末の読み上げ音声で放送が流れます（イヤホンがおすすめ）。"
      howto={["型と回をえらぶ（同じ回は、だれが解いても同じ問題）", "時間を計って解く。時間になると自動で提出", "大問別・単元別の得点を見て、弱い単元の解説と単元模試へ"]}
    />
  );
}
