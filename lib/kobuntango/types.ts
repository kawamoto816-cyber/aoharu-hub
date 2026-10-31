// 古文単語のデータの型。
export interface KobunWord {
  no: number;
  /** 見出し語 (歴史的仮名遣い。漢字があれば「をかし」「あはれなり」のように辞書の見出しの形) */
  w: string;
  /** 品詞 (動・形・形動・副・名・連体・感・助動 など) */
  hin: string;
  /** 主な意味 (入試で問われる意味を先頭に、1〜3個を「、」区切り) */
  m: string;
  /** 古文の短い例文 */
  ex: string;
  /** 例文の現代語訳 */
  exm: string;
}
