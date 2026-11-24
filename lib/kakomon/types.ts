// 過去問チャレンジ (/learn/kakomon)。問題は当サイトに載せない。
// 生徒は大学入試センターのサイトで公開されている問題 (または市販の過去問集) を見て解き、ここでは答えのマークと採点だけをする。
// 持つのは、解答番号 (解答記号)・正解・配点 (大学入試センターが公表している数値の表) と、大問の区切りだけ。問題文は入れない。

/** 解答欄のまとまり。labels は解答番号 ("12") か解答記号 ("ア")。answers は labels と同じ順の正解 */
export interface KakomonPart {
  labels: string[];
  answers: string[];
  /** 答えの順を問わない (ハイフンでつながれた正解・「解答の順序は問わない」) */
  anyOrder?: boolean;
  /** labels のうち、この記号どうしだけ順を問わない (「ケ，コの解答の順序は問わない」) */
  anyOrderOf?: string[];
  /** 正解の組がいくつかある (「1又は2」と、それに応じて決まる次の答え) */
  alts?: string[][];
  /** 正解が別の解答欄の答えで決まる (「解答番号13が2の場合は1」)。labels は1つ */
  dep?: { label: string; map: Record<string, string> };
}

export interface KakomonItem {
  points: number;
  parts: KakomonPart[];
  /** 各○点 (当たった解答欄の数だけ点が入る)。省略＝全部そろって正解のときだけ点が入る */
  each?: number;
  /** 正解でなくても、この答えなら部分点 (「2，3のいずれかを解答した場合は1点」) */
  partial?: { answers: string[]; points: number }[];
  /** 解答欄のどれか1つだけ正解のときの点 (「いずれか一方のみ正解の場合は2点」) */
  one?: number;
  /** この解答記号がすべて正解のときだけ点が入る (同じ大問の中) */
  requires?: string[];
}

export interface KakomonDaimon {
  no: number;
  points: number;
  items: KakomonItem[];
  /** 選択問題 (exam.select の対象) */
  select?: boolean;
}

export interface KakomonExam {
  /** r8-hon-eng-r など */
  id: string;
  /** 令和8年度 */
  year: string;
  /** 本試験／追・再試験 */
  kind: string;
  subject: string;
  minutes: number;
  total: number;
  /** num＝解答番号 (1, 2, 3…)、kana＝解答記号 (ア, イ, ウ…。数学・情報) */
  type: "num" | "kana";
  /** 類題のある共通テスト型 (lib/exam の KYOTSU のキー) */
  moshi: string;
  daimon: KakomonDaimon[];
  /** 選択問題: from の大問のうち count 問を解く。count をこえてマークしたときは、得点の高い count 問を数える */
  select?: { from: number[]; count: number };
  /** 問題の PDF (大学入試センター) */
  pdf: string;
  /** 音声 (英語リスニング) */
  audio?: string;
  /** 問題のページ・正解のページ (大学入試センター) */
  page: string;
  source: string;
}

/** マーク。キーは cellKey (num は解答番号、kana は「大問-記号」) */
export type Marks = Record<string, string | undefined>;

export interface CellResult {
  key: string;
  label: string;
  mine?: string;
  correct: string;
  ok: boolean;
}

export interface ItemResult {
  got: number;
  points: number;
  cells: CellResult[];
}

export interface KakomonResult {
  score: number;
  total: number;
  right: number;
  cells: number;
  daimon: {
    no: number;
    got: number;
    points: number;
    items: ItemResult[];
    select?: boolean;
    counted: boolean;
  }[];
}
