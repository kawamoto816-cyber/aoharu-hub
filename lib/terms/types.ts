// 理科・社会などの「重要語句カード」のデータの型。
export interface TermItem {
  /** 語句 */
  t: string;
  /** 読み (ひらがな) */
  y: string;
  /** 説明 (25〜70字) */
  d: string;
}

export interface TermUnit {
  /** 学校の教科の地図の単元 id */
  unit: string;
  items: TermItem[];
}
