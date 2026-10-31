import type { Metadata } from "next";
import { TopicRegionPage } from "@/components/learn/TopicRegionPage";
import { KOKUSAI } from "@/lib/learn/kokusai";

// /learn/kokusai: 裏面 (難関校アドバンスト) の「国際関係のレンズ」20枚 (5章)。第1章は無料、第2章からは Pro。

const URL = "https://app.bluespring.co.jp/learn/kokusai";
const TITLE = "国際関係のレンズ20｜リアリズム・リベラリズム・コンストラクティビズムをカードで｜難関校の小論文・口頭試問｜アオハルOS";
const DESC = "難関校の小論文・口頭試問のための国際関係論入門20枚。主権国家体制とアナーキー、国際法と国連、リアリズム・リベラリズム・コンストラクティビズムの考え方と限界、人間の安全保障、同じ出来事を3つのレンズで読む方法まで、図解と三択で身につけます。第1章は無料。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL },
};

export default function KokusaiRegion() {
  return (
    <TopicRegionPage
      topic={KOKUSAI}
      region="裏面・難関校"
      heading="国際関係のレンズカード 20枚"
      lead="国際社会のしくみから、リアリズム、リベラリズム、コンストラクティビズムと新しい見方、3つのレンズで論じる方法まで、5章で進みます。どの理論も正解とせず、比べて使う力をつけます。第1章は無料、第2章からはProです。"
    />
  );
}
