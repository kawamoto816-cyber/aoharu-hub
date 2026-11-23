// 過去問チャレンジ (/learn/kakomon)。問題は当サイトに載せない。
// 生徒が手元の過去問 (大学入試センターのサイト・市販の過去問集) を見て解き、ここでは答えのマークと採点だけをする。
// 持つのは、解答番号・正解の番号・配点 (数値の表) と、大問の区切りだけ。問題文・選択肢の文・本文は入れない。

/** ひとまとまりで採点する解答欄。1つの解答番号だけのもの／いくつかを合わせて採点するもの */
export interface KakomonItem {
  /** 設問の番号 (問1・問2…) */
  toi: number;
  /** この設問の配点 */
  points: number;
  /** 解答欄。order: "any" は、並んだ解答番号の答えの順を問わない (ハイフンでつながれた正解) */
  parts: { nos: number[]; answers: number[]; order?: "any" }[];
  /** 各○点 (順を問わない組で、当たった数だけ点が入る)。省略＝全部そろって正解のときだけ点が入る */
  each?: number;
}

export interface KakomonDaimon {
  no: number;
  points: number;
  items: KakomonItem[];
  /** 落としたときに案内する類題 (当サイトで書いた問題) */
  next?: { label: string; note: string };
}

export interface KakomonExam {
  id: string;
  /** 令和8年度 */
  year: string;
  /** 本試験／追・再試験 */
  kind: string;
  subject: string;
  minutes: number;
  total: number;
  /** マークの選択肢の数 (1〜max) */
  max: number;
  daimon: KakomonDaimon[];
  /** 正解・配点の出典 (大学入試センターウェブサイトのページ) */
  source: string;
  /** 正解・配点を確かめた日 */
  checked: string;
  /** 類題のある共通テスト型 (lib/exam の KYOTSU のキー) */
  moshi: string;
}

export type Marks = Record<number, number | undefined>;

export interface ItemResult {
  toi: number;
  got: number;
  points: number;
  /** 解答番号ごとの、自分の答え・正解・当たりか (順を問わない組は、組の中のどれかと合えば当たり) */
  cells: { no: number; mine?: number; correct: string; ok: boolean }[];
}

export interface KakomonResult {
  score: number;
  total: number;
  right: number;
  cells: number;
  daimon: { no: number; got: number; points: number; items: ItemResult[] }[];
}
