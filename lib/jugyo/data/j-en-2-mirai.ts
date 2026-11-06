import type { UnitBase } from "../types";

// 止まる授業：未来の表し方（中2・英語）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/j-en-2-mirai.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 will play →「ウィル プレイ」、be動詞 →「ビー動詞」）。
// 『ピーター・パン』の英文は本文にある部分だけを引き、登場人物のせりふは作らない。
// せりふはキャストごと：j-en-2-mirai.j-dark.ts（ダーク解説）・j-en-2-mirai.j-kisaku.ts（気さくな兄・姉）。

export const MIRAI_BASE: UnitBase = {
  unitId: "j-en-2-mirai",
  pauses: {
    "mistake:0": {
      question: "{seito}の「She will plays the piano.」。正しいのはどちら？",
      choices: ["She will plays the piano.", "She will play the piano."],
      answer: "She will play the piano.",
      why: "will のあとの動詞は主語に関係なく原形です。",
      say: {
        question: "{seito}の、シー ウィル プレイズ ザ ピアノ。正しいのはどちら？",
        choices: ["シー ウィル プレイズ ザ ピアノ", "シー ウィル プレイ ザ ピアノ"],
        answer: "シー ウィル プレイ ザ ピアノ",
        why: "ウィルのあとの動詞は、主語に関係なく、原形です。",
      },
    },
    "mistake:1": {
      question: "{seito}の「I going to visit Kyoto.」。正しいのはどちら？",
      choices: ["I going to visit Kyoto.", "I am going to visit Kyoto."],
      answer: "I am going to visit Kyoto.",
      why: "be going to の be動詞（am・is・are）を落とさないようにします。",
      say: {
        question: "{seito}の、アイ ゴーイング トゥ ビジット キョウト。正しいのはどちら？",
        choices: ["アイ ゴーイング トゥ ビジット キョウト", "アイ アム ゴーイング トゥ ビジット キョウト"],
        answer: "アイ アム ゴーイング トゥ ビジット キョウト",
        why: "ビー ゴーイング トゥの、ビー動詞、アム、イズ、アーを、落とさないようにします。",
      },
    },
    "check:2": {
      question: "Are they going to swim? に Yes で答えましょう。",
      answer: "Yes, they are.",
      why: "be going to の疑問文には be動詞で答える。",
      say: {
        question: "アー ゼイ ゴーイング トゥ スイム。に、イエスで答えましょう。",
        answer: "イエス、ゼイ アー",
        why: "ビー ゴーイング トゥの疑問文には、ビー動詞で答える。",
      },
    },
    "check:0": {
      question: "I will clean my room. を be going to の文に書きかえましょう。",
      answer: "I am going to clean my room.",
      why: "主語 I なので be動詞は am。to のあとは原形 clean。",
      say: {
        question: "アイ ウィル クリーン マイ ルーム。を、ビー ゴーイング トゥの文に、書きかえましょう。",
        answer: "アイ アム ゴーイング トゥ クリーン マイ ルーム",
        why: "主語がアイなので、ビー動詞は、アム。トゥのあとは、原形の、クリーン。",
      },
    },
  },
};
