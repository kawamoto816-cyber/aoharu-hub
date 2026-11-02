// 「ツッコミ学習法」(/learn/tsukkomi) のデータの型。②鍛えるの新しい学び方。
// ボケ役が「わざとまちがいを1か所ふくむ文」を言い、学ぶ人がツッコミ役になって、制限時間内に
//   ①どこ？（まちがっている語句をタップ）→ ②正しくは？（4択）→ ③なんでやねん（上級だけ。理由の3択）
// の順に訂正する。ときどき、まちがいのない正しい文（スルー問題）も混ぜる。そのときは「スルー」が正解。
// 中身は lib/lecture/data/<単元>.ts の本文・mistakes・check に書いてあることだけを使って、手で書く。

/** 問題の難しさ。1＝基本（用語・定義）、2＝発展（計算・しくみ・ひっかけ）。得点の倍率に使う。 */
export type BokeLevel = 1 | 2;

export interface Boke {
  /** 問題の id（単元の中で一意。まちがいの記録（localStorage）のキーにも使うので、出したあとは変えない） */
  id: string;
  /** 学校の地図 (lib/school) の単元 id。図解レクチャーと同じ */
  unit: string;
  level: BokeLevel;
  /** ボケの文を語句に区切ったもの。つなげると1文になる。タップできる単位 */
  tokens: string[];
  /** まちがいの語句の位置（tokens の番号）。スルー問題（正しい文）は null */
  wrongIndex: number | null;
  /** ②正しくは？の4択。answer が正解の位置。まちがいの語句そのものは入れない。スルー問題にはない */
  options?: { choices: [string, string, string, string]; answer: number };
  /** ③なんでやねん（上級モード）の3択。answer が正解の位置。スルー問題にはない */
  reasons?: { choices: [string, string, string]; answer: number };
  /** 正解のあとに見せる・読む解説。right は正しい文（tokens のまちがいを正解に置きかえた文。スルーなら tokens そのまま） */
  explain: { right: string; why: string };
  /**
   * 読み上げ用の文（VOICEVOX）。boke = ボケ役がボケの文を読む、tsukkomi = ツッコミ役が正解後に言い直す。
   * 記号・数式・読み違えやすい語はひらがな・カタカナにする（例「−5」→「マイナス5」）。
   */
  say: { boke: string; tsukkomi: string };
}

/** 遊び方。normal＝①②（1問15秒）、advanced＝①②③（1問20秒） */
export type TsukkomiMode = "normal" | "advanced";

/** 1問の結果の種類 */
export type TsukkomiKind =
  /** ボケを最後まで正しく訂正できた */
  | "hit"
  /** まちがいの場所は当てたが、正しい語句（または理由）でまちがえた */
  | "partial"
  /** 場所をまちがえた・ボケをスルーした */
  | "miss"
  /** 正しい文を正しくスルーした */
  | "through"
  /** 正しい文にツッコんでしまった（減点） */
  | "overkill"
  /** 時間切れ */
  | "timeout";

/** 画面に渡す1問ぶん（データ＋音声ファイルの場所） */
export interface BokeWithAudio extends Boke {
  audio: { boke: string; tsukkomi: string };
}
