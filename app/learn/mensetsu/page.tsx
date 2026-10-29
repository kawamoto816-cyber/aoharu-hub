import type { Metadata } from "next";
import { TopicRegionPage } from "@/components/learn/TopicRegionPage";
import { MENSETSU } from "@/lib/learn/mensetsu";

// /learn/mensetsu: 「話す：面接」の20枚 (5章) と仕上げのクエスト。
// メンサツで試して戻ってきたとき (?done=<カードid>) は、そのカードを習得にする。

const URL = "https://app.bluespring.co.jp/learn/mensetsu";
const TITLE = "面接のコツ20｜カードで覚える答え方・深掘り対策｜総合型選抜・推薦入試｜アオハルOS";
const DESC = "総合型選抜・推薦入試の面接のコツを20枚のカードで。面接官が見る3つのこと、結論から1分で答える型、「なぜこの大学？」の答え方、深掘り質問への備えまで、図解と三択で身につけます。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL },
};

export default function MensetsuRegion() {
  return (
    <TopicRegionPage
      topic={MENSETSU}
      region="話す"
      heading="面接のカード 20枚"
      lead="面接の正体から本番前の確認まで、5章で順に進みます。各章の終わりは、メンサツのAI面接官に答えて試してみましょう。"
    />
  );
}
