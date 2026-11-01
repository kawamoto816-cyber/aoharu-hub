import type { ReactNode } from "react";

// カードの束の定義 (ブラウザ側で使う)。漢字・都道府県などはこれを作って DeckSession にわたす。

export interface DeckQuiz {
  /** 問題 (例: 言葉、□入りの言葉) */
  prompt: ReactNode;
  /** 問題の上に出す指示 (例: 読みは？) */
  ask: string;
  options: string[];
  answer: string;
  /** 選択肢を大きく見せる (漢字1字など) */
  big?: boolean;
}

export interface DeckDef {
  key: string;
  title: string;
  /** トップの URL (修行が終わったら戻る) */
  home: string;
  /** プレイ画面の URL (「あと10枚」のリンクに使う。? 以降は自動) */
  play: string;
  /** カードの単位 (字・県 など) */
  unit: string;
  ids: (group?: string) => string[];
  card: (id: string) => ReactNode;
  /** 小学生向けの束 (固定の言葉をひらがな多めにする) */
  kids?: boolean;
  /** easy = 新しいカード・まだ覚えきっていない、hard = 覚えたカードの仕上げ */
  quiz: (id: string, level: "easy" | "hard") => DeckQuiz;
}
