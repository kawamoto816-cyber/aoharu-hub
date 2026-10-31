import type { Metadata } from "next";
import { TopicRegionPage } from "@/components/learn/TopicRegionPage";
import { KYOYO } from "@/lib/learn/kyoyo";

// /learn/kyoyo: 「教養・時事」の20枚 (5章) と仕上げのクエスト。

const URL = "https://app.bluespring.co.jp/learn/kyoyo";
const TITLE = "時事・教養の対策20｜カードで覚えるニュースの読み方・まとめ方・小論文と面接での使い方｜推薦入試（総合型・学校推薦型）｜アオハルOS";
const DESC = "推薦入試（総合型選抜・学校推薦型選抜）の時事・教養対策を20枚のカードで。毎日のニュースの追い方、事実と意見の分け方、3行ニュースノート、人口減少・AI・環境・共生の論点の立て方、小論文と面接での使い方まで、図解と三択で身につけます。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL },
};

export default function KyoyoRegion() {
  return (
    <TopicRegionPage
      topic={KYOYO}
      region="教養・時事"
      heading="教養・時事カード 20枚"
      lead="教養とは何かから、ニュースの追い方・ノートのまとめ方、よく出るテーマの考え方、小論文と面接での使い方まで、5章で順に進みます。各章の終わりは、時事テーマで小論文を書いてテンサクンで試してみましょう。"
    />
  );
}
