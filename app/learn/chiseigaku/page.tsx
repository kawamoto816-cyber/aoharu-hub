import type { Metadata } from "next";
import { TopicRegionPage } from "@/components/learn/TopicRegionPage";
import { CHISEIGAKU } from "@/lib/learn/chiseigaku";

// /learn/chiseigaku: 裏面 (難関校アドバンスト) の「地政学」20枚 (5章)。第1章は無料、第2章からは Pro。

const URL = "https://app.bluespring.co.jp/learn/chiseigaku";
const TITLE = "地政学20｜シーパワー・ハートランド・チョークポイントをカードで｜知のアドバンス｜アオハルOS";
const DESC = "ものの見方を深める地政学入門20枚。地理が政治の条件になるしくみ、地政学の悪用の歴史と地理決定論の落とし穴、マハン・マッキンダー・スパイクマンの古典理論、チョークポイントと資源、日本の条件まで、図解と三択で身につけます。第1章は無料。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL },
};

export default function ChiseigakuRegion() {
  return (
    <TopicRegionPage
      topic={CHISEIGAKU}
      region="知のアドバンス"
      heading="地政学カード 20枚"
      lead="地政学とは何か、その歴史と落とし穴から、古典理論、地理の要素、地域の読み方、時事を地政学で読む手順まで、5章で進みます。地図だけで決めつけず、ほかのレンズと組み合わせて考える力をつけます。第1章は無料、第2章からはProです。"
    />
  );
}
