// 文法などの「ポイント＋4択ドリル」のデータの型。
export interface DrillQ {
  /** 問題文 (空所は ___) */
  q: string;
  /** 選択肢 4つ */
  c: [string, string, string, string];
  /** 正解の番号 (0〜3) */
  a: 0 | 1 | 2 | 3;
  /** 解説 */
  ex: string;
}

export interface DrillUnit {
  /** 学校の教科の地図の単元 id */
  unit: string;
  /** ①覚える: その単元のポイント (3〜6行) */
  points: string[];
  /** ②鍛える: 4択の問題 (20問) */
  qs: DrillQ[];
}
