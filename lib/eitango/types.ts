// AOHARU WORDS「英単語2000」の型。見出し語の選定・訳語・例文はすべて独自 (市販の単語帳とは無関係)。

export interface WordEntry {
  /** 通し番号 1〜2000 */
  no: number;
  word: string;
  /** 主な品詞 (動・名・形・副・前・接) */
  pos: string;
  /** 主な訳 (1〜3個を「、」で区切る。動詞の目的語は「〜を」) */
  ja: string;
  /** 書き下ろしの例文 (見出し語をそのまま、または活用形で含む) */
  ex: string;
  exJa: string;
  /** 派生語・語法のひとこと (任意) */
  note?: string;
}
