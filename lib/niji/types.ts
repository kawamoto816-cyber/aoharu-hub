// 国公立2次試験の過去問チャレンジ。問題文は載せない (大学の公開ページへリンクする)。
// 記述式なので、設問ごとに自己採点する：空欄は答えを見て ○×、記述は「書けた項目」のチェックで部分点。
// 解答例は、アオハルが問題から自分で解いて書いたもの。大学は設問ごとの配点を公表していないので、点はアオハルの目安。

/** 空欄：答えを見て ○×。記述：steps のチェックで部分点。 */
export interface NijiItem {
  /** 設問の記号 (大問の中で重ならない)。ア・問1 など */
  id: string;
  /** 何を問う設問か (問題文の写しではなく、内容を短く言いかえたもの) */
  name: string;
  /** 目安の点 */
  pt: number;
  /** 学校の地図の単元 id */
  unit: string;
  /** 空欄の答えと、考え方の1行 */
  ans?: string;
  /** 記述のチェック表：[書けた項目, 点] */
  steps?: [string, number][];
  /** 記述の解答例 (行ごと) */
  ex?: string[];
  /** 「記述の階段」(lib/kijutsu) の段の id。あると、作戦表はその段ごとにまとめ、授業へ案内する */
  lesson?: string;
  /**
   * 自動採点：えらぶ欄の並び。全部が ok と合えば正解。ans には、まちがえたときに見せる正答を書く。
   * 例：記号1つ [{opts:["ア","イ","ウ","エ"], ok:"ウ"}]、組み合わせ [{label:"①",…},{label:"②",…}]、数字のマーク [{label:"あ", opts:["0",…,"9"], ok:"2"}]
   */
  sel?: { label?: string; opts: string[]; ok: string }[];
  /** 単元の中の、問われ方（例：気持ちの読みとり）。あると、作戦表はこの単位でも分ける */
  skill?: string;
  /** 「解答例を見る」ボタンの名前を変えるとき (例：解答例をまだ載せていない設問) */
  exLabel?: string;
}

export interface NijiBlock {
  title: string;
  items: NijiItem[];
}

export interface NijiRuidai {
  title: string;
  lead: string;
  /** 問題文 (アオハルの書き下ろし)。行ごと */
  body: string[];
  /** 解答例。行ごと */
  answer: string[];
}

export interface NijiDaimon {
  /** Ⅰ・Ⅱ など */
  no: string;
  theme: string;
  /** 目安の時間 (分) */
  minutes: number;
  blocks: NijiBlock[];
  ruidai?: NijiRuidai;
}

export interface NijiExam {
  id: string;
  univ: string;
  year: string;
  kind: string;
  subject: string;
  minutes: number;
  /** 時間についての注 (理科2科目で180分 など) */
  timeNote?: string;
  /** どの入口のものか。koko ＝ 公立高校入試の過去問チャレンジ (/learn/koko-nyushi)。省くと 2次試験 (/learn/niji) */
  base?: "niji" | "koko";
  /** 問題のページを出している所（例：東京都教育委員会）。省くと univ */
  pageOwner?: string;
  /** 配点についての注記。省くと「大学は設問ごとの配点を公表していません…」 */
  pointsNote?: string;
  /** 記述が中心の科目。「式」「計算」の言い方を、記述向けの言い方に変える */
  style?: "kijutsu";
  total: number;
  /** 大学の公開ページ (問題と出題意図) */
  page: string;
  pageLabel: string;
  /** 解答例を外の資料と照らしたか */
  checked: string;
  daimon: NijiDaimon[];
}

export const itemKey = (d: NijiDaimon, it: NijiItem) => `${d.no}-${it.id}`;
export const daimonPoints = (d: NijiDaimon) =>
  d.blocks.reduce((a, b) => a + b.items.reduce((x, it) => x + it.pt, 0), 0);
