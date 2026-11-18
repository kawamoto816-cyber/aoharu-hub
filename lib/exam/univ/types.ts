import type { DaimonSpec } from "../types";
import type { ExamPoolSection } from "../pool/types";

// 大学別型 (試験モード daigaku) の1つ分 = 大学 × 科目。
// 形式 (大問の数・時間・問い方) は、各大学の一般選抜で公表・報道されている出題の傾向を参考にした「〜大学型」。
// 問題はすべてオリジナル (過去問の文・設問は使わない。史料は原典 (著作権の切れた古文書・条文など) から短く引くか、自分で書いた要約)。
// sections の各大問は poolTag `${key}:<番号>` で、同じ tag の pool の節だけから組む。tag ごとに節を2つ以上・B の問題を多めに書き、
// pick で毎回ちがう組み合わせになるようにする (同じ回は同じ問題・おまかせは毎回ちがう)。

export type UnivTier = "早慶上智" | "MARCH" | "国公立";

export interface UnivExam {
  /** "waseda-nihonshi" */
  key: string;
  /** "早稲田大学" */
  univ: string;
  kamoku: "日本史" | "世界史";
  tier: UnivTier;
  /** 一覧の並び (小さいほど先。偏差値の高い順) */
  order: number;
  /** どの学部・方式の傾向を参考にしたか (「文学部・文化構想学部の傾向を参考」) */
  basis: string;
  /** 形式のひとこと (画面に出す。60字くらい) */
  format: string;
  minutes: number;
  /** 範囲 (高校 地理歴史の見出し: "歴史総合" "日本史探究" "世界史探究") */
  groups: string[];
  sections: DaimonSpec[];
  pool: ExamPoolSection[];
}
