// ことわざ・慣用句・故事成語・四字熟語のデータの型。
export type PhraseKind = "ことわざ" | "慣用句" | "故事成語" | "四字熟語";
export interface Phrase {
  kind: PhraseKind;
  /** 言葉 */
  p: string;
  /** 読み (ひらがな) */
  y: string;
  /** 意味 */
  m: string;
  /** 例文 */
  ex: string;
}
