import type { Metadata } from "next";
import { TopicRegionPage } from "@/components/learn/TopicRegionPage";
import { JIBUN } from "@/lib/learn/jibun";

// /learn/jibun: 「自分を知る」の20枚 (5章) と仕上げのクエスト。

const URL = "https://app.bluespring.co.jp/learn/jibun";
const TITLE = "自己分析のコツ20｜カードで覚えるふり返り方・強みの言い方・テーマの見つけ方｜推薦入試（総合型・学校推薦型）｜アオハルOS";
const DESC = "推薦入試（総合型選抜・学校推薦型選抜）に向けた自己分析のコツを20枚のカードで。材料の出し方、経験のふり返り方、強みを行動で言う方法、自分の関心を社会と大学の学びにつなぐ方法まで、図解と三択で身につけます。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL },
};

export default function JibunRegion() {
  return (
    <TopicRegionPage
      topic={JIBUN}
      region="自分を知る"
      heading="自分を知るカード 20枚"
      lead="自己分析の正体から、書類と面接に使うところまで、5章で順に進みます。各章の終わりは、自分の経験を書いてテンサクンで試してみましょう。"
    />
  );
}
