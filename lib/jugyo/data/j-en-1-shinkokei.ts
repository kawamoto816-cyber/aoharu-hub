import type { UnitBase } from "../types";

// 止まる授業：現在進行形（中1・英語）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/j-en-1-shinkokei.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 She is reading a book. →「シー イズ リーディング ア ブック」）。
// 詩は lecture にある短い句だけを引き、歌詞・映画の題やせりふ・広告のコピーは使わない。作者のせりふは作らない。
// せりふはキャストごと：j-en-1-shinkokei.j-dark.ts（ダーク解説）・j-en-1-shinkokei.j-kisaku.ts（気さくな兄・姉）。

export const J_SHINKOKEI_BASE: UnitBase = {
  unitId: "j-en-1-shinkokei",
  pauses: {
    "mistake:0": {
      question: "{seito}の「I playing soccer now.」。正しいのはどちら？",
      choices: ["I playing soccer now.", "I am playing soccer now."],
      answer: "I am playing soccer now.",
      why: "進行形には be動詞が必要です。ing だけでは文になりません。",
      say: {
        question: "{seito}の、アイ プレイイング サッカー ナウ。正しいのはどちら？",
        choices: ["アイ プレイイング サッカー ナウ", "アイ アム プレイイング サッカー ナウ"],
        answer: "アイ アム プレイイング サッカー ナウ",
        why: "しんこうけいには、ビー動詞が必要です。イングだけでは、文になりません。",
      },
    },
    "mistake:2": {
      question: "{seito}の「Are you study now? / Do you studying now?」。正しいのはどちら？",
      choices: ["Are you study now? / Do you studying now?", "Are you studying now?"],
      answer: "Are you studying now?",
      why: "疑問文は be動詞を前に出し、動詞は ing 形のまま。do は使いません。",
      say: {
        question: "{seito}の、アー ユー スタディ ナウ？ または、ドゥー ユー スタディイング ナウ？ 正しいのはどちら？",
        choices: ["アー ユー スタディ ナウ？ または、ドゥー ユー スタディイング ナウ？", "アー ユー スタディイング ナウ？"],
        answer: "アー ユー スタディイング ナウ？",
        why: "疑問文は、ビー動詞を、まえに出し、動詞は、イングけいの、まま。ドゥーは、使いません。",
      },
    },
    "check:0": {
      question: "swim の ing 形は？",
      choices: ["swiming", "swimming"],
      answer: "swimming",
      why: "短い母音＋子音字で終わるので m を重ねる。",
      say: {
        question: "スイムの、イングけいは？",
        choices: ["エス、ダブリュー、アイ、エム、アイ、エヌ、ジー", "エス、ダブリュー、アイ、エム、エム、アイ、エヌ、ジー"],
        answer: "スイミング。エス、ダブリュー、アイ、エム、エム、アイ、エヌ、ジー",
        why: "短い母音たす子音字で、終わるので、エムを重ねる。",
      },
    },
    "mistake:3": {
      question: "{seito}の「I am knowing her.」。正しいのはどちら？",
      choices: ["I am knowing her.", "I know her."],
      answer: "I know her.",
      why: "know は状態を表す動詞なので、ふつう進行形にしません。",
      say: {
        question: "{seito}の、アイ アム ノウイング ハー。正しいのはどちら？",
        choices: ["アイ アム ノウイング ハー", "アイ ノウ ハー"],
        answer: "アイ ノウ ハー",
        why: "ノウは、状態を表す動詞なので、ふつう、しんこうけいにしません。",
      },
    },
  },
};
