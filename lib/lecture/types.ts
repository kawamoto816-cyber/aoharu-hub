// 「図解レクチャー」(/learn/lecture/<単元id>) のデータの型。
// 塾の授業の「なぜそうなるか・しくみ」の部分。①覚える (カード)・②鍛える (ドリル) の前に読む。
// 図 (Figure) は絵ではなく「決まった型にデータを入れる」と components/lecture が描く。
// 文字列の中の {{ }} は強調 (黄色のマーカー)。formula では「変わった部分」の印になる。

/** 図の部品の色。サイトの色に対応 (navy 紺・blue 青・yellow 黄・red 赤・plain 白)。 */
export type Tone = "navy" | "blue" | "yellow" | "red" | "plain";

/** 箱ひとつ (流れ・循環・因果・木で共通)。 */
export interface FigNode {
  label: string;
  /** 箱の中の小さい説明 (1行くらい) */
  sub?: string;
  tone?: Tone;
}

interface FigureBase {
  /** 図の見出し (例「回路を水の流れにたとえる」) */
  title: string;
  /** 読み上げ用の説明。省くと、データから自動で文を作る。 */
  desc?: string;
  /** 図の下の注 (1〜2文) */
  note?: string;
}

/** 流れ・手順：箱と矢印。row=横並び (スマホ幅と、4つ以上のときは縦に積む)、col=縦並び。 */
export interface FlowFigure extends FigureBase {
  type: "flow";
  dir?: "row" | "col";
  steps: FigNode[];
  /** 矢印に添える言葉。arrows[i] は steps[i] → steps[i+1] の矢印。 */
  arrows?: (string | undefined)[];
}

/** くり返す循環：3〜6個の箱を輪にならべ、時計回りの矢印でつなぐ。 */
export interface CycleFigure extends FigureBase {
  type: "cycle";
  steps: FigNode[];
  /** 輪の真ん中の言葉 (例「御恩と奉公」) */
  center?: string;
}

/** 比較表：2〜4列。rows[i].label は行の見出し (省略可)。cells の数は columns と同じ。 */
export interface CompareFigure extends FigureBase {
  type: "compare";
  columns: { title: string; tone?: Tone }[];
  rows: { label?: string; cells: string[] }[];
}

/** 年表：年＋できごと。eras は時代の区切り (from〜to 年)。 */
export interface TimelineFigure extends FigureBase {
  type: "timeline";
  eras?: { label: string; from: number; to: number }[];
  events: {
    year: number;
    /** 年の表示を変えたいとき (例「1274・1281」) */
    yearLabel?: string;
    label: string;
    /** 大事なできごとは黄色 */
    key?: boolean;
  }[];
}

/** 原因→結果：いくつかの原因が1つの結果に集まり、そのあと chain で結果が続く。 */
export interface CauseFigure extends FigureBase {
  type: "cause";
  causes: FigNode[];
  effect: FigNode;
  /** 結果からさらに続く流れ (省略可) */
  chain?: FigNode[];
}

/** 数直線：min〜max の目もり、点・区間・移動の矢印。 */
export interface NumberLineFigure extends FigureBase {
  type: "numberline";
  min: number;
  max: number;
  /** 目もりの間隔 (既定 1) */
  tick?: number;
  /** 数字を書く間隔 (既定 tick) */
  labelEvery?: number;
  points?: { x: number; label?: string; tone?: Tone }[];
  /** 区間。open で端を白丸 (その数をふくまない) にする。 */
  ranges?: { from: number; to: number; label?: string; openFrom?: boolean; openTo?: boolean; tone?: Tone }[];
  /** 移動の矢印 (from → to)。上に弧で描く。row で段をずらす。 */
  moves?: { from: number; to: number; label?: string; tone?: Tone; row?: number }[];
}

/** 線分図：同じものさしで横の帯をならべる (割合・倍・和差など)。 */
export interface BarArea extends FigureBase {
  type: "area";
  kind: "bar";
  /** ものさしの最大 (既定は帯の合計の最大) */
  max?: number;
  bars: {
    /** 帯の左の名前 (例「もとにする量」) */
    label: string;
    parts: { value: number; label?: string; tone?: Tone }[];
    /** 帯の右に書く量 (例「200円」) */
    total?: string;
  }[];
  /** 帯の下の共通の目もり (例 割合の 0・0.5・1) */
  scale?: { at: number; label: string }[];
  /** 目もりの名前 (例「割合」) */
  scaleLabel?: string;
}

/** 面積図：横 (w)×たて (h) の長方形を、下をそろえて左から並べる (つるかめ算・速さ・割合)。 */
export interface RectArea extends FigureBase {
  type: "area";
  kind: "rect";
  rects: {
    w: number;
    h: number;
    /** 中に書く言葉 (例「比べる量 60」) */
    label?: string;
    wLabel?: string;
    hLabel?: string;
    tone?: Tone;
  }[];
}

export type AreaFigure = BarArea | RectArea;

/** 分類の木：根から枝分かれ。 */
export interface TreeNode extends FigNode {
  children?: TreeNode[];
}
export interface TreeFigure extends FigureBase {
  type: "tree";
  root: TreeNode;
}

/** 式 (文) の変形をステップで。expr の {{ }} が「変わった部分」。note は右の説明。 */
export interface FormulaFigure extends FigureBase {
  type: "formula";
  /** label は式の前の小さな札 (例「mRNA」)。 */
  steps: { label?: string; expr: string; note?: string }[];
  /** 英文など、等幅でなく本文の字体で見せたいとき */
  prose?: boolean;
}

export type Figure =
  | FlowFigure
  | CycleFigure
  | CompareFigure
  | TimelineFigure
  | CauseFigure
  | NumberLineFigure
  | AreaFigure
  | TreeFigure
  | FormulaFigure;

export type FigureType = Figure["type"];

/** 資料の写真・図版（Wikimedia Commons などの自由に使える画像。public/media/ に保存したもの） */
export interface LecturePhoto {
  /** public からのパス（例 /media/commons/j-sci-1-kazan/showa-shinzan.jpg） */
  src: string;
  width: number;
  height: number;
  /** 画像の内容を言葉で（読み上げ用） */
  alt: string;
  /** 資料の説明（何が写っていて、本文のどこと関係するか） */
  caption: string;
  credit: {
    /** 作者（Commons の Artist。不明なら「作者不明」） */
    author: string;
    /** ライセンス名（Public domain / CC0 / CC BY 4.0 / CC BY-SA 4.0 など） */
    license: string;
    licenseUrl?: string;
    /** Commons のファイルページの URL */
    source: string;
  };
}

export interface LectureSection {
  heading: string;
  /** 2〜5文。{{ }} で強調。節の要点。 */
  body: string;
  /** 教科書本文にあたる説明（段落ごと）。理科・社会で、教科書を読まなくても学べるように。{{ }} は重要語。 */
  reading?: string[];
  figure?: Figure;
  /** 資料（写真・図版） */
  photos?: LecturePhoto[];
}

export interface Lecture {
  /** 学校の地図 (lib/school) の単元 id */
  unit: string;
  /** 小学校の単元名をルビつきで（例：垂直《すいちょく》・平行と四角形）。ページの見出しに使う。なければ地図の単元名。 */
  nameRuby?: string;
  title: string;
  /** 導入：なぜ学ぶか・身近な例 (2〜3文) */
  hook: string;
  sections: LectureSection[];
  /** よくあるまちがい 2〜4個 */
  mistakes: { wrong: string; right: string; why: string }[];
  /** 確認の問い 2〜3個 (答えは開いて見る) */
  check: { q: string; a: string; why: string }[];
  /** 続けてやる教材 */
  next: { label: string; href: string }[];
}
