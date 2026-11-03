// 学びのスフィア盤 (/learn/school?view=sphere) のデータの型。
// ノードは図解レクチャーのある単元 (unit = 単元id)。線 (line) は「同じ考え方・同じテーマ・同じ人物」のつながり。
// edge は from (先に学ぶ側) → to (あとで学ぶ側)。kind: "bridge" は教科や時代をこえる橋 (引用・名前の由来など)。

export type Axis = "a" | "b" | "c";

/** ラベルを置く側 (b=下・既定, t=上, l=左, r=右) */
export type LabelSide = "b" | "t" | "l" | "r";

export interface SphereEdge {
  from: string;
  to: string;
  /** 所属する線 (A: 系譜の線, B: テーマ, C: 人物の線) */
  line: string;
  kind: "line" | "bridge";
  /** つながる理由 (1行) */
  why: string;
}

export interface SphereLine {
  id: string;
  name: string;
  /** 列の見出し (A の ① など) */
  mark?: string;
}

// ---- A 概念の系譜：行＝学年、列＝線 ----

export interface ALine extends SphereLine {
  /** 列の位置 (0〜8) */
  col: number;
}

export interface ANode {
  unit: string;
  short: string;
  line: string;
  /** 線の列から横にずらすとき (0〜8) */
  col?: number;
  label?: LabelSide;
}

export interface AxisA {
  lines: ALine[];
  nodes: ANode[];
  edges: SphereEdge[];
}

// ---- B テーマ星座：扇＝テーマ、輪＝学校段階 ----

export type Ring = "小低" | "小高" | "中" | "高";

export interface BMember {
  unit: string;
  short: string;
  ring: Ring;
  /** 扇の中心からの角度 (度)。なければ同じ輪のノードで等分 */
  a?: number;
  label?: LabelSide;
}

export interface BTheme extends SphereLine {
  members: BMember[];
}

export interface AxisB {
  themes: BTheme[];
  edges: SphereEdge[];
}

// ---- C 時代の帯と人物の線：行＝時代、列＝小・中・高 ----

export type Stage = "小" | "中" | "高";

export interface CEra {
  id: string;
  name: string;
  /** 帯の見出し (2行まで) */
  label: string[];
}

export interface CNode {
  unit: string;
  short: string;
  era: string;
  stage: Stage;
  /** 所属する人物の線 (2本以上なら交差点) */
  lines: string[];
  /** 帯の上の境目に置く (2つの時代にまたがる作品) */
  straddle?: boolean;
  label?: LabelSide;
}

export interface AxisC {
  eras: CEra[];
  lines: SphereLine[];
  nodes: CNode[];
  edges: SphereEdge[];
}

/** 単元の表示用の情報 (サーバーで lib/school から引いて渡す) */
export interface UnitMeta {
  name: string;
  /** 例「中2・理科」「高・化学基礎・理科」 */
  where: string;
  /** 教科の色 */
  color: string;
  /** A の行 (0=小1 … 8=中3, 9=高・基礎, 10=高・発展) */
  row: number;
  /** B の輪 (lib/school から求めたもの) */
  ring: Ring;
  stage: Stage;
}
