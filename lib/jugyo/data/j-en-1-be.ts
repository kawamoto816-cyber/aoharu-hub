import type { UnitBase } from "../types";

// 止まる授業：be動詞（中1・英語）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/j-en-1-be.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 You are →「ユー アー」）。劇・詩の英文は本文にある部分だけを引き、作中の人物や作者のせりふは作らない。
// せりふはキャストごと：j-en-1-be.j-dark.ts（ダーク解説）・j-en-1-be.j-kisaku.ts（気さくな兄・姉）。

export const EN_BE_BASE: UnitBase = {
  unitId: "j-en-1-be",
  pauses: {
    "mistake:0": {
      question: "{seito}の「You is my friend.」。正しいのはどちら？",
      choices: ["You is my friend.", "You are my friend."],
      answer: "You are my friend.",
      why: "you は1人に話しかけるときでも are を使います。",
      say: {
        question: "{seito}の、ユー イズ マイ フレンド。正しいのはどちら？",
        choices: ["ユー イズ マイ フレンド", "ユー アー マイ フレンド"],
        answer: "ユー アー マイ フレンド",
        why: "ユーは、ひとりに話しかけるときでも、アーを使います。",
      },
    },
    "mistake:1": {
      question: "{seito}の「Ken and I am classmates.」。正しいのはどちら？",
      choices: ["Ken and I am classmates.", "Ken and I are classmates."],
      answer: "Ken and I are classmates.",
      why: "主語は Ken and I の2人なので are。I の近くにあっても am にはなりません。",
      say: {
        question: "{seito}の、ケン アンド アイ アム クラスメイツ。正しいのはどちら？",
        choices: ["ケン アンド アイ アム クラスメイツ", "ケン アンド アイ アー クラスメイツ"],
        answer: "ケン アンド アイ アー クラスメイツ",
        why: "主語は、ケン アンド アイの、ふたりなので、アー。アイの近くにあっても、アムには、なりません。",
      },
    },
    "check:2": {
      question: "You are hungry. を疑問文にし、Yes で答えましょう。",
      answer: "Are you hungry? — Yes, I am.",
      why: "are を主語の前へ。you でたずねられたら I で答えるので am。",
      say: {
        question: "ユー アー ハングリー。を、疑問文にし、イエスで答えましょう。",
        answer: "アー ユー ハングリー？　イエス、アイ アム",
        why: "アーを、主語のまえへ。ユーで、たずねられたら、アイで答えるので、アム。",
      },
    },
  },
};
