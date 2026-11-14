import type { UnitBase } from "../types";

// 止まる授業：形容詞・副詞（高校・英文法）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/h-eng-gram-keiyoshi.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 asleep →「アスリープ」）。キーツの詩の引用は lecture にある部分だけ。
// せりふはキャストごと：h-eng-gram-keiyoshi.h-charisma.ts（カリスマ講師）・.h-kyoju.ts（名物教授）・.h-nekketsu.ts（熱血エンタメ講義）。

export const H_KEIYOSHI_BASE: UnitBase = {
  unitId: "h-eng-gram-keiyoshi",
  pauses: {
    "check:2": {
      question: "「眠っている赤ちゃん」a(n) ___ baby に入るのは sleeping / asleep のどちら？",
      choices: ["sleeping", "asleep"],
      answer: "sleeping",
      why: "asleep は叙述用法だけで、名詞の前に置けない。",
      say: {
        question: "ねむっている赤ちゃん。ア、くうらん、ベイビー。くうらんに入るのは、スリーピングと、アスリープの、どちら？",
        choices: ["スリーピング", "アスリープ"],
        answer: "スリーピング",
        why: "アスリープは、叙述用法だけで、名詞の、まえに置けない。",
      },
    },
    "mistake:1": {
      question: "{seito}の「I have a little friends in Osaka.」。正しいのはどちら？",
      choices: ["I have a little friends in Osaka.", "I have a few friends in Osaka."],
      answer: "I have a few friends in Osaka.",
      why: "friends は数えられる名詞の複数形なので a few を使います。",
      say: {
        question: "{seito}の、アイ ハヴ ア リトル フレンズ イン オーサカ。正しいのはどちら？",
        choices: ["アイ ハヴ ア リトル フレンズ イン オーサカ", "アイ ハヴ ア フュー フレンズ イン オーサカ"],
        answer: "アイ ハヴ ア フュー フレンズ イン オーサカ",
        why: "フレンズは、かぞえられる名詞の、ふくすうけいなので、ア フューを使います。",
      },
    },
    "check:1": {
      question: "He is late for school. に always を入れると？",
      answer: "He is always late for school.",
      why: "頻度の副詞は be動詞の後ろに置く。",
      say: {
        question: "ヒー イズ レイト フォー スクール。に、オールウェイズを入れると？",
        answer: "ヒー イズ オールウェイズ レイト フォー スクール",
        why: "頻度の副詞は、ビー動詞の、うしろに置く。",
      },
    },
    "mistake:3": {
      question: "{seito}の「I studied hardly for the test.」（熱心に勉強した）。正しいのはどちら？",
      choices: ["I studied hardly for the test.", "I studied hard for the test."],
      answer: "I studied hard for the test.",
      why: "hardly は「ほとんど〜ない」。「熱心に」は hard です。",
      say: {
        question: "{seito}の、アイ スタディード ハードリー フォー ザ テスト。ねっしんに、勉強した。正しいのはどちら？",
        choices: ["アイ スタディード ハードリー フォー ザ テスト", "アイ スタディード ハード フォー ザ テスト"],
        answer: "アイ スタディード ハード フォー ザ テスト",
        why: "ハードリーは、ほとんど、ない。ねっしんに、は、ハードです。",
      },
    },
  },
};
