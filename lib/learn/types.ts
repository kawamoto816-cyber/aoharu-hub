// 「まなぶ」(/learn) のカードの型。カードは表・裏・図解・三択でできている。
// 中身は lib/learn/<領域>.ts に置く (監修: 川本 潤『総合型選抜のすすめ』『シン・学問のすすめ』)。

export type Diagram =
  | { type: "compare"; left: { title: string; items: string[] }; right: { title: string; items: string[] } }
  | { type: "flow"; steps: string[]; highlight?: number }
  | { type: "bar"; segments: { label: string; sub?: string; weight: number; accent?: boolean }[] }
  | { type: "checklist"; items: string[] }
  | { type: "rewrite"; pairs: [string, string][] };

export interface LearnCard {
  no: number;
  /** URLや進み具合の保存に使う (例: shoronbun-4) */
  id: string;
  chapter: number;
  title: string;
  /** 表: ひとことで覚える一文 */
  front: string;
  /** 裏: 2〜3文の解説 */
  back: string;
  diagram: Diagram;
  /** 図解の見出し */
  diagramTitle: string;
  quiz: {
    question: string;
    options: [string, string, string];
    /** 正解の位置 (0=A, 1=B, 2=C) */
    answer: 0 | 1 | 2;
    explanation: string;
  };
  /** ほかの領域へのつながり。regionKey は /learn/ のあとのパス (例: kyoyo, shoronbun/19) */
  link?: { label: string; regionKey: string };
}

export interface LearnChapter {
  no: number;
  title: string;
  summary: string;
  /** 章の終わりにテンサクンで試すこと */
  tryText: string;
}

/** カードで学んだことを試すアプリ (小論文 → テンサクン、面接 → メンサツ) */
export interface LearnTryApp {
  name: string;
  /** これにカードid を足すとアプリを開くURLになる (例: /tensaku?kind=shoronbun&learn=) */
  hrefBase: string;
  /** 各カードの三択のあとのボタン */
  cardLabel: string;
  /** 章の最後のカードで主役にするボタン */
  chapterLabel: string;
  /** 三択に正解したあとの「習得」への案内 */
  doneHint: string;
}

export interface LearnRegionTopic {
  key: string;
  label: string;
  /** 一覧ページのパス (例: /learn/shoronbun) */
  basePath: string;
  tryApp: LearnTryApp;
  chapters: LearnChapter[];
  cards: LearnCard[];
  /** 仕上げのクエスト */
  quest: string;
  /** パンくずの「まなぶ」の行き先 (裏面の領域は /learn#ura) */
  homeHref?: string;
}

export const SUPERVISION = "監修：川本 潤（『総合型選抜のすすめ』『シン・学問のすすめ』著者）";
