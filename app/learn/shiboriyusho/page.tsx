import type { Metadata } from "next";
import { TopicRegionPage } from "@/components/learn/TopicRegionPage";
import { SHIBORIYUSHO } from "@/lib/learn/shiboriyusho";

// /learn/shiboriyusho: 「書く：志望理由書」の20枚 (5章) と仕上げのクエスト。

const URL = "https://app.bluespring.co.jp/learn/shiboriyusho";
const TITLE = "志望理由書のコツ20｜カードで覚える構成・書き方・「なぜこの大学か」｜推薦入試（総合型・学校推薦型）｜アオハルOS";
const DESC = "推薦入試（総合型選抜・学校推薦型選抜）の志望理由書のコツを20枚のカードで。4つの要素の構成、きっかけと問いの書き方、「なぜこの大学か」の調べ方、字数配分まで、図解と三択で身につけます。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL },
};

export default function ShiboriyushoRegion() {
  return (
    <TopicRegionPage
      topic={SHIBORIYUSHO}
      region="書く"
      heading="志望理由書のカード 20枚"
      lead="志望理由書の正体から提出まで、5章で順に進みます。総合型選抜・学校推薦型選抜（公募・指定校）のどちらにも使えます。各章の終わりは、テンサクンで自分の文章に試してみましょう。"
    />
  );
}
