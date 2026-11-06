import type { UnitBase } from "../types";

// 止まる授業：受動態（高校・英文法）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/h-eng-gram-judo.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 broken →「ブロークン」）。『フランケンシュタイン』の引用は lecture にある部分だけ。
// せりふはキャストごと：h-eng-gram-judo.h-charisma.ts（カリスマ講師）・.h-kyoju.ts（名物教授）・.h-nekketsu.ts（熱血エンタメ講義）。

export const JUDO_BASE: UnitBase = {
  unitId: "h-eng-gram-judo",
  pauses: {
    "mistake:0": {
      question: "{seito}の「The window was broke by the wind.」。正しいのはどちら？",
      choices: ["The window was broke by the wind.", "The window was broken by the wind."],
      answer: "The window was broken by the wind.",
      why: "受動態は be ＋過去分詞。broke は過去形、過去分詞は broken です。",
      say: {
        question: "{seito}の、ザ ウィンドウ ワズ ブローク バイ ザ ウィンド。正しいのはどちら？",
        choices: ["ザ ウィンドウ ワズ ブローク バイ ザ ウィンド", "ザ ウィンドウ ワズ ブロークン バイ ザ ウィンド"],
        answer: "ザ ウィンドウ ワズ ブロークン バイ ザ ウィンド",
        why: "受動態は、ビー、たす、過去分詞。ブロークは過去形、過去分詞は、ブロークンです。",
      },
    },
    "check:0": {
      question: "They will hold the festival next week. を受動態に。",
      answer: "The festival will be held next week (by them).",
      why: "助動詞のあとは be ＋過去分詞。by them は省くのがふつう。",
      say: {
        question: "ゼイ ウィル ホールド ザ フェスティバル ネクスト ウィーク、を受動態に。",
        answer: "ザ フェスティバル ウィル ビー ヘルド ネクスト ウィーク、バイ ゼム",
        why: "助動詞のあとは、ビー、たす、過去分詞。バイ ゼムは、省くのがふつう。",
      },
    },
    "mistake:2": {
      question: "{seito}の「I am interesting in history.」。正しいのはどちら？",
      choices: ["I am interesting in history.", "I am interested in history."],
      answer: "I am interested in history.",
      why: "「興味をもたされている」側なので過去分詞 interested。interesting は「おもしろい」です。",
      say: {
        question: "{seito}の、アイ アム インタレスティング イン ヒストリー。正しいのはどちら？",
        choices: ["アイ アム インタレスティング イン ヒストリー", "アイ アム インタレスティッド イン ヒストリー"],
        answer: "アイ アム インタレスティッド イン ヒストリー",
        why: "興味をもたされている側なので、過去分詞、インタレスティッド。インタレスティングは、おもしろい、です。",
      },
    },
    "mistake:3": {
      question: "{seito}の「He was made clean the room.」。正しいのはどちら？",
      choices: ["He was made clean the room.", "He was made to clean the room."],
      answer: "He was made to clean the room.",
      why: "使役の make を受動態にすると、原形の前に to が必要です。",
      say: {
        question: "{seito}の、ヒー ワズ メイド クリーン ザ ルーム。正しいのはどちら？",
        choices: ["ヒー ワズ メイド クリーン ザ ルーム", "ヒー ワズ メイド トゥ クリーン ザ ルーム"],
        answer: "ヒー ワズ メイド トゥ クリーン ザ ルーム",
        why: "使役のメイクを、受動態にすると、原形のまえに、トゥが必要です。",
      },
    },
  },
};
