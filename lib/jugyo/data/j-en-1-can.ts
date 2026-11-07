import type { UnitBase } from "../types";

// 止まる授業：助動詞 can（中1・英語）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/j-en-1-can.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 She can speak →「シー キャン スピーク」）。詩・物語の英文は本文にある部分だけを引き、作中の人物や作者のせりふは作らない。
// せりふはキャストごと：j-en-1-can.j-dark.ts（ダーク解説）・j-en-1-can.j-kisaku.ts（気さくな兄・姉）。

export const EN_CAN_BASE: UnitBase = {
  unitId: "j-en-1-can",
  pauses: {
    "mistake:0": {
      question: "{seito}の「She can speaks English.」。正しいのはどちら？",
      choices: ["She can speaks English.", "She can speak English."],
      answer: "She can speak English.",
      why: "can のあとの動詞は、主語が3人称単数でも原形です。",
      say: {
        question: "{seito}の、シー キャン スピークス イングリッシュ。正しいのはどちら？",
        choices: ["シー キャン スピークス イングリッシュ", "シー キャン スピーク イングリッシュ"],
        answer: "シー キャン スピーク イングリッシュ",
        why: "キャンのあとの動詞は、主語が、3人称単数でも、原形です。",
      },
    },
    "mistake:1": {
      question: "{seito}の「Do you can swim?」。正しいのはどちら？",
      choices: ["Do you can swim?", "Can you swim?"],
      answer: "Can you swim?",
      why: "can の疑問文は Can を主語の前に出します。do は使いません。",
      say: {
        question: "{seito}の、ドゥー ユー キャン スイム。正しいのはどちら？",
        choices: ["ドゥー ユー キャン スイム", "キャン ユー スイム"],
        answer: "キャン ユー スイム",
        why: "キャンの疑問文は、キャンを、主語のまえに出します。ドゥーは、使いません。",
      },
    },
    "check:2": {
      question: "「窓を開けてくれますか」と頼むとき、文の最初の2語は？",
      choices: ["Can I", "Can you"],
      answer: "Can you",
      why: "依頼は Can you 〜?（Can you open the window?）。",
      say: {
        question: "まどを、あけてくれますか、と、たのむとき、文の、最初の2語は？",
        choices: ["キャン アイ", "キャン ユー"],
        answer: "キャン ユー",
        why: "依頼は、キャン ユー。キャン ユー オープン ザ ウィンドウ。",
      },
    },
    "mistake:2": {
      question: "{seito}の「Ken cans play tennis.」。正しいのはどちら？",
      choices: ["Ken cans play tennis.", "Ken can play tennis."],
      answer: "Ken can play tennis.",
      why: "can 自体に s はつきません。",
      say: {
        question: "{seito}の、ケン キャンズ プレイ テニス。正しいのはどちら？",
        choices: ["ケン キャンズ プレイ テニス", "ケン キャン プレイ テニス"],
        answer: "ケン キャン プレイ テニス",
        why: "キャン自体に、エスは、つきません。",
      },
    },
  },
};
