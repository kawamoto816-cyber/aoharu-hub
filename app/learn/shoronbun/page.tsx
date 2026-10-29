import type { Metadata } from "next";
import { TopicRegionPage } from "@/components/learn/TopicRegionPage";
import { SHORONBUN } from "@/lib/learn/shoronbun";

// /learn/shoronbun: 「書く：小論文」の20枚 (5章) と仕上げのクエスト。

const URL = "https://app.bluespring.co.jp/learn/shoronbun";
const TITLE = "小論文のコツ20｜カードで覚える書き方・構成・減点対策｜アオハルOS";
const DESC = "総合型選抜・推薦入試の小論文のコツを20枚のカードで。結論は最初に、800字の字数配分、課題文型・資料型の手順、減点されやすい書き方まで、図解と三択で身につけます。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL },
};

export default function ShoronbunRegion() {
  return (
    <TopicRegionPage
      topic={SHORONBUN}
      region="書く"
      heading="小論文のカード 20枚"
      lead="土台から本番の練習まで、5章で順に進みます。各章の終わりは、テンサクンで自分の文章に試してみましょう。"
    />
  );
}
