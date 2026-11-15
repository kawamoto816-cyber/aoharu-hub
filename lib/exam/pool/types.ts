import type { MoshiSection } from "@/lib/moshi/types";

// 試験モードだけで使う問題 (単元模試には出さない)。共通テスト型の長文・リスニングのように、
// 単元模試の1回分には大きすぎる・音声で聞く形の大問をここに書く。
//   unit … 地図の単元 (範囲のしぼりこみ・結果の単元別の集計に使う)
//   tag  … 大問の仕様 (DaimonSpec.poolTag) と結びつける。tag のある大問は、同じ tag の問題だけから組む
// 放送文は問題文・資料の中で 〔放送〕…〔/放送〕 (2回まで再生) か 〔放送1回〕…〔/放送〕 でかこむ。
// 解いている間は文字を出さず、ブラウザの読み上げ (英語) で流す。採点のあとの解説では文字も出す (components/moshi/Listen.tsx)。
export interface ExamPoolSection {
  unit: string;
  tag: string;
  section: MoshiSection;
}
