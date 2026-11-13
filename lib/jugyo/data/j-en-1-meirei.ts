import type { UnitBase } from "../types";

// 止まる授業：命令文（中1・英語）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/j-en-1-meirei.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 Open the window. →「オープン ザ ウィンドウ」）。
// 劇・演説の英文は本文にある部分だけを引き、作中の人物や演説した人のせりふは作らない。歌の題名・歌詞は使わない。
// せりふはキャストごと：j-en-1-meirei.j-dark.ts（ダーク解説）・j-en-1-meirei.j-kisaku.ts（気さくな兄・姉）。

export const J_MEIREI1_BASE: UnitBase = {
  unitId: "j-en-1-meirei",
  pauses: {
    "mistake:0": {
      question: "{seito}の「Please opens the window.」。正しいのはどちら？",
      choices: ["Please opens the window.", "Please open the window."],
      answer: "Please open the window.",
      why: "命令文の動詞はいつも原形。主語がないので s はつきません。",
      say: {
        question: "{seito}の、プリーズ オープンズ ザ ウィンドウ。正しいのはどちら？",
        choices: ["プリーズ オープンズ ザ ウィンドウ", "プリーズ オープン ザ ウィンドウ"],
        answer: "プリーズ オープン ザ ウィンドウ",
        why: "命令文の動詞は、いつも原形。主語がないので、エスは、つきません。",
      },
    },
    "mistake:1": {
      question: "{seito}の「Are quiet.」。正しいのはどちら？",
      choices: ["Are quiet.", "Be quiet."],
      answer: "Be quiet.",
      why: "be動詞の命令文は原形の Be で始めます。am・are・is は使いません。",
      say: {
        question: "{seito}の、アー クワイエット。正しいのはどちら？",
        choices: ["アー クワイエット", "ビー クワイエット"],
        answer: "ビー クワイエット",
        why: "ビー動詞の命令文は、原形の、ビーで始めます。アム、アー、イズは、使いません。",
      },
    },
    "mistake:2": {
      question: "{seito}の「Not run here.」。正しいのはどちら？",
      choices: ["Not run here.", "Don't run here."],
      answer: "Don't run here.",
      why: "禁止の命令文は Don't で始めます。not だけでは文になりません。",
      say: {
        question: "{seito}の、ノット ラン ヒア。正しいのはどちら？",
        choices: ["ノット ラン ヒア", "ドント ラン ヒア"],
        answer: "ドント ラン ヒア",
        why: "禁止の命令文は、ドントで始めます。ノットだけでは、文になりません。",
      },
    },
    "check:2": {
      question: "Let's go to the park. にさんせいするときの答えは？",
      choices: ["Yes, I do.", "Yes, let's."],
      answer: "Yes, let's.",
      why: "Let's 〜. には Yes, let's. / No, let's not. で答える。",
      say: {
        question: "レッツ ゴー トゥー ザ パーク、に、さんせいするときの答えは？",
        choices: ["イエス、アイ ドゥー", "イエス、レッツ"],
        answer: "イエス、レッツ",
        why: "レッツ、なになに、には、イエス、レッツ。ノー、レッツ ノット、で答える。",
      },
    },
  },
};
