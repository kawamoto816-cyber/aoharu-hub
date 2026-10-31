import type { Metadata } from "next";
import { TopicRegionPage } from "@/components/learn/TopicRegionPage";
import { DAIGAKU } from "@/lib/learn/daigaku";

// /learn/daigaku: 「志望校を知る」の20枚 (5章) と仕上げのクエスト。

const URL = "https://app.bluespring.co.jp/learn/daigaku";
const TITLE = "志望校の調べ方20｜カードで覚える入試方式・募集要項・シラバスの読み方｜推薦入試（総合型・学校推薦型）｜アオハルOS";
const DESC = "推薦入試（総合型選抜・学校推薦型選抜）の志望校の調べ方を20枚のカードで。3つのポリシー、総合型と学校推薦型（指定校・公募）のちがい、募集要項で見る5か所、シラバスと先生の研究の調べ方まで、図解と三択で身につけます。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL },
};

export default function DaigakuRegion() {
  return (
    <TopicRegionPage
      topic={DAIGAKU}
      region="志望校を知る"
      heading="志望校を知るカード 20枚"
      lead="大学選びの軸から、入試方式・募集要項・授業の調べ方、志望校の決め方まで、5章で順に進みます。各章の終わりは、調べたことを文章にしてテンサクンで試してみましょう。"
    />
  );
}
