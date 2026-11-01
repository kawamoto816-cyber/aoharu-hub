// 漢字の字源（成り立ち）。小学生が「なぜその形でその意味か」をつかむための短い説明。
export type JigenKind = "象形" | "指事" | "会意" | "形声";

export interface Jigen {
  /** 成り立ちの種類 */
  kind: JigenKind;
  /** 説明（その学年までの漢字＋ひらがな。40字前後）。説が分かれるものは「〜と言われる」 */
  text: string;
}
