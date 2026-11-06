import type { UnitBase } from "../types";

// 止まる授業：不定詞（中2・英語）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/j-en-2-futeishi.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 to play →「トゥ プレイ」）。実在の人物のせりふは作らない。
// せりふはキャストごと：j-en-2-futeishi.j-dark.ts（ダーク解説）・j-en-2-futeishi.j-kisaku.ts（気さくな兄・姉）。

export const FUTEISHI_BASE: UnitBase = {
  unitId: "j-en-2-futeishi",
  pauses: {
    "mistake:0": {
      question: "{seito}の「She wants to plays the piano.」。正しいのはどちら？",
      choices: ["She wants to plays the piano.", "She wants to play the piano."],
      answer: "She wants to play the piano.",
      why: "to のあとは、主語が3人称単数でも必ず原形です。",
      say: {
        question: "{seito}の、シー ウォンツ トゥ プレイズ ザ ピアノ。正しいのはどちら？",
        choices: ["シー ウォンツ トゥ プレイズ ザ ピアノ", "シー ウォンツ トゥ プレイ ザ ピアノ"],
        answer: "シー ウォンツ トゥ プレイ ザ ピアノ",
        why: "トゥのあとは、主語が3人称単数でも、必ず原形です。",
      },
    },
    "check:0": {
      question: "I have a lot of books to read. の to read は何用法？",
      choices: ["名詞的用法", "形容詞的用法", "副詞的用法"],
      answer: "形容詞的用法",
      why: "前の名詞 books を「読むための・読むべき」と説明している。",
      say: {
        question: "アイ ハヴ ア ロット オブ ブックス トゥ リード。の、トゥ リードは、なに用法？",
        why: "まえの名詞、ブックスを、読むための、読むべき、と説明している。",
      },
    },
    "mistake:2": {
      question: "{seito}の「I went to the shop for buy milk.」。正しいのはどちら？",
      choices: ["I went to the shop for buy milk.", "I went to the shop to buy milk."],
      answer: "I went to the shop to buy milk.",
      why: "「〜するために」と目的を表すときは to ＋ 原形を使います。for のあとに動詞の原形は置けません。",
      say: {
        question: "{seito}の、アイ ウェント トゥ ザ ショップ フォー バイ ミルク。正しいのはどちら？",
        choices: ["アイ ウェント トゥ ザ ショップ フォー バイ ミルク", "アイ ウェント トゥ ザ ショップ トゥ バイ ミルク"],
        answer: "アイ ウェント トゥ ザ ショップ トゥ バイ ミルク",
        why: "するために、と目的を表すときは、トゥたす原形を使います。フォーのあとに、動詞の原形は置けません。",
      },
    },
    "check:1": {
      question: "I was happy to hear the news. の意味は？",
      answer: "私はその知らせを聞いてうれしかった。",
      why: "感情の形容詞 happy のあとの不定詞は「〜して」と原因を表す（副詞的用法）。",
      say: {
        question: "アイ ワズ ハッピー トゥ ヒア ザ ニュース。の意味は？",
        answer: "わたしは、その知らせを聞いて、うれしかった。",
        why: "感情の形容詞、ハッピーのあとの不定詞は、して、と原因を表す。副詞的用法。",
      },
    },
  },
};
