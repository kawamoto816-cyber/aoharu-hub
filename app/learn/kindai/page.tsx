import type { Metadata } from "next";
import { TopicRegionPage } from "@/components/learn/TopicRegionPage";
import { KINDAI } from "@/lib/learn/kindai";

// /learn/kindai: 裏面 (難関校アドバンスト) の「近代の知」20枚 (5章)。第1章は無料、第2章からは Pro。

const URL = "https://app.bluespring.co.jp/learn/kindai";
const TITLE = "近代の知20｜科学・社会契約・市場・正義の考え方をカードで｜知のアドバンス｜アオハルOS";
const DESC = "ものの見方を深める「近代の知」20枚。帰納と演繹、ホッブズ・ロック・ルソーの社会契約、スミス・ケインズ・マルクスの経済、ミル・カント・ロールズの正義論、ダーウィンとウェーバーまで、図解と三択で身につけます。第1章は無料。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL },
};

export default function KindaiRegion() {
  return (
    <TopicRegionPage
      topic={KINDAI}
      region="知のアドバンス"
      heading="近代の知カード 20枚"
      lead="科学的に考える方法から、国家と社会契約、市場と経済、自由と正義、近代を問い直す見方まで、5章で進みます。どれも小論文で使える「レンズ」として学びます。第1章は無料、第2章からはProです。"
    />
  );
}
