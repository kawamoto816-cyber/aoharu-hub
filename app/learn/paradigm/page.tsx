import type { Metadata } from "next";
import { TopicRegionPage } from "@/components/learn/TopicRegionPage";
import { PARADIGM } from "@/lib/learn/paradigm";

// /learn/paradigm: 裏面 (難関校アドバンスト) の入口「知のパラダイム」の20枚 (5章) と仕上げのクエスト。

const URL = "https://app.bluespring.co.jp/learn/paradigm";
const TITLE = "知のパラダイム20｜「ものの見方」をカードで学ぶ｜知のアドバンス｜アオハルOS";
const DESC = "さらなる知の森への入口、知のパラダイム入門20枚。クーンのパラダイム論、隠れた前提の見つけ方、反証可能性、個人と構造のレンズ、学問ごとの方法のちがい、2つのレンズで論じる小論文と口頭試問での応じ方まで、図解と三択で身につけます。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL },
};

export default function ParadigmRegion() {
  return (
    <TopicRegionPage
      topic={PARADIGM}
      region="知のアドバンス"
      heading="知のパラダイムカード 20枚"
      lead="スキル盤の裏面「知のアドバンス」の入口です。ものの見方の枠組み（パラダイム）とは何かから、前提の疑い方、出来事をいくつものレンズで見る方法、学問ごとの確かめ方、小論文と口頭試問での使い方まで、5章で進みます。地政学や国際関係など裏面のほかの領域は、ここで学ぶ見方を土台にします。"
    />
  );
}
