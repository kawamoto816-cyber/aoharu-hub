import type { Metadata } from "next";
import { TopicRegionPage } from "@/components/learn/TopicRegionPage";
import { GENDAI } from "@/lib/learn/gendai";

// /learn/gendai: 裏面 (難関校アドバンスト) の「現代の論点」20枚 (5章)。第1章は無料、第2章からは Pro。

const URL = "https://app.bluespring.co.jp/learn/gendai";
const TITLE = "現代の論点20｜経済安全保障・AI・気候変動・格差をカードで｜難関校の小論文・口頭試問｜アオハルOS";
const DESC = "難関校の小論文・口頭試問のための「現代の論点」20枚。トレードオフ・スケール・時間軸・分配の視点から、経済安全保障、AIとデータ、気候変動とパリ協定、人口減少と移民、格差、ポピュリズムまで、図解と三択で身につけます。第1章は無料。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL },
};

export default function GendaiRegion() {
  return (
    <TopicRegionPage
      topic={GENDAI}
      region="裏面・難関校"
      heading="現代の論点カード 20枚"
      lead="現代の論点を考えるための4つの視点（トレードオフ・スケール・時間軸・分配）から始めて、経済安全保障、テクノロジーと社会、地球規模の課題、社会のゆらぎまで、5章で進みます。最新の数字は白書や公式発表で確かめる前提で、論点の立て方を学びます。第1章は無料、第2章からはProです。"
    />
  );
}
