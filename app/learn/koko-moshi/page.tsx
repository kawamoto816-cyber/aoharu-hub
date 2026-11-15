import type { Metadata } from "next";
import { SeriesPage } from "@/components/exam/SeriesPage";

// /learn/koko-moshi: 公立高校入試模試 (中3向け)。公立高校入試型 (lib/exam) の5教科を、第1回〜の回にして出す。

const URL = "https://app.bluespring.co.jp/learn/koko-moshi";
const TITLE = "公立高校入試模試（中3・5教科）｜本番と同じ50分で解いて、大問別・単元別に弱点がわかる｜アオハルラーン｜アオハルOS";
const DESC = "国語・数学・英語・理科・社会の5教科を、各50分・100点の公立高校入試の形で。第1回〜第6回は同じ問題なので友だちや先生と点数をくらべられ、おまかせは毎回ちがう問題。時間切れで自動提出、大問別・単元別の得点と、弱い単元の解説へ。問題はすべてオリジナルの予想問題です。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL },
};

export default function KokoMoshiPage() {
  return (
    <SeriesPage
      id="koko"
      lead="中1〜中3の全範囲から、公立高校入試によく出る分野で5教科を組みました。各50分・100点。時間になると自動で提出し、大問ごと・単元ごとの得点と、時間の使い方がわかります。"
      howto={["教科と回をえらぶ（同じ回は、だれが解いても同じ問題）", "50分で解く。時間になると自動で提出", "大問別・単元別の得点を見て、弱い単元の解説と単元模試へ"]}
      sumLabel="5教科"
    />
  );
}
