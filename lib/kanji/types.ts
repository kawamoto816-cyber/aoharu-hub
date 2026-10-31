// 小学校の漢字1026字のデータの型。
export interface KanjiEntry {
  /** 漢字 */
  k: string;
  /** 音読み (カタカナ) */
  on: string[];
  /** 訓読み (ひらがな、送りがなは ( ) の中) */
  kun: string[];
  /** その漢字を使う言葉と読み */
  words: { w: string; y: string }[];
  /** 例文と読み */
  ex: string;
  exY: string;
}
