import type { UnitBase } from "../types";

// 止まる授業：英作文（中1・英語）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/j-en-1-eisakubun.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 I play tennis. →「アイ プレイ テニス」）。童謡・物語の英文は本文にある部分だけを引き、作中の人物や作者のせりふは作らない。
// せりふはキャストごと：j-en-1-eisakubun.j-dark.ts（ダーク解説）・j-en-1-eisakubun.j-kisaku.ts（気さくな兄・姉）。

export const EISAKUBUN_BASE: UnitBase = {
  unitId: "j-en-1-eisakubun",
  pauses: {
    "mistake:2": {
      question: "{seito}の「I tennis play.」。正しいのはどちら？",
      choices: ["I tennis play.", "I play tennis."],
      answer: "I play tennis.",
      why: "日本語の順のまま並べています。英語は主語のすぐあとに動詞です。",
      say: {
        question: "{seito}の、アイ テニス プレイ。正しいのはどちら？",
        choices: ["アイ テニス プレイ", "アイ プレイ テニス"],
        answer: "アイ プレイ テニス",
        why: "日本語の順のまま、並べています。英語は、主語のすぐあとに、動詞です。",
      },
    },
    "check:2": {
      question: "in the library と after school、文の最後に置くのはどっち？",
      choices: ["in the library", "after school"],
      answer: "after school",
      why: "場所が先、時があと（I study in the library after school.）。",
      say: {
        question: "イン ザ ライブラリーと、アフター スクール。文の最後に置くのは、どっち？",
        choices: ["イン ザ ライブラリー", "アフター スクール"],
        answer: "アフター スクール",
        why: "場所が先、時があと。アイ スタディ イン ザ ライブラリー アフター スクール。",
      },
    },
    "mistake:0": {
      question: "{seito}の「I am play tennis.」。正しいのはどちら？",
      choices: ["I am play tennis.", "I play tennis."],
      answer: "I play tennis.",
      why: "「する」は一般動詞。be動詞といっしょには使いません。",
      say: {
        question: "{seito}の、アイ アム プレイ テニス。正しいのはどちら？",
        choices: ["アイ アム プレイ テニス", "アイ プレイ テニス"],
        answer: "アイ プレイ テニス",
        why: "する、は、一般動詞。ビー動詞と、いっしょには使いません。",
      },
    },
    "mistake:1": {
      question: "{seito}の「Ken like music.」。正しいのはどちら？",
      choices: ["Ken like music.", "Ken likes music."],
      answer: "Ken likes music.",
      why: "主語が3人称単数で現在の文なので、動詞に s をつけます。",
      say: {
        question: "{seito}の、ケン ライク ミュージック。正しいのはどちら？",
        choices: ["ケン ライク ミュージック", "ケン ライクス ミュージック"],
        answer: "ケン ライクス ミュージック",
        why: "主語が、さんにんしょう単数で、現在の文なので、動詞に、エスをつけます。",
      },
    },
  },
};
