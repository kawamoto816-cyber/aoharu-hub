// 中学英単語のデータの型。
export interface ChuWord {
  no: number;
  /** 学年 (1〜3) */
  g: 1 | 2 | 3;
  word: string;
  pos: string;
  ja: string;
  ex: string;
  exJa: string;
}
