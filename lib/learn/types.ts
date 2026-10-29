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
  /** ほかの領域へのつながり (例: 教養・時事) */
  link?: { label: string; regionKey: string };
}

export interface LearnChapter {
  no: number;
  title: string;
  summary: string;
  /** 章の終わりにテンサクンで試すこと */
  tryText: string;
}

export interface LearnRegionTopic {
  key: string;
  label: string;
  chapters: LearnChapter[];
  cards: LearnCard[];
  /** 仕上げのクエスト */
  quest: string;
}

export const SUPERVISION = "監修：川本 潤（『総合型選抜のすすめ』『シン・学問のすすめ』著者）";
