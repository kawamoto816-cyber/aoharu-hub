import type { UnitBase } from "../types";

// 止まる授業：不定詞の発展（中3・英語）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/j-en-3-futeishi.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 Let me try →「レット ミー トライ」）。
// 『トム・ソーヤーの冒険』は lecture に引かれた部分だけを使い、人物のせりふは作らない（今の基準で偏見につながる言い回しは引かない）。
// 答え（answer）は lecture の文のまま、読みは say.answer で直す。
// せりふはキャストごと：j-en-3-futeishi.j-dark.ts（ダーク解説）・j-en-3-futeishi.j-kisaku.ts（気さくな兄・姉）。

export const J_FUTEISHI3_BASE: UnitBase = {
  unitId: "j-en-3-futeishi",
  pauses: {
    "check:0": {
      question: "To play the piano is easy for her. を It で始めて書きかえると？",
      choices: ["It is easy for she to play the piano.", "It is easy for her to play the piano.", "It is easy her to play the piano."],
      answer: "It is easy for her to play the piano.",
      why: "仮の主語 It を先に置き、to 以下をうしろへ回す。",
      say: {
        question: "トゥー プレイ ザ ピアノ イズ イージー フォー ハー、を、イットで始めて、書きかえると？",
        choices: ["イット イズ イージー フォー シー トゥー プレイ ザ ピアノ", "イット イズ イージー フォー ハー トゥー プレイ ザ ピアノ", "イット イズ イージー ハー トゥー プレイ ザ ピアノ"],
        answer: "イット イズ イージー フォー ハー トゥー プレイ ザ ピアノ",
        why: "かりの主語、イットを、さきに置き、トゥー以下を、うしろへ回す。",
      },
    },
    "check:2": {
      question: "「どこで電車に乗ればいいか」を英語にしましょう。",
      choices: ["where take the train", "where to take the train", "to where take the train"],
      answer: "where to take the train",
      why: "疑問詞 where＋to＋動詞の原形。",
      say: {
        question: "どこで、電車に、乗ればいいか、を、英語にしましょう。",
        choices: ["ホエア テイク ザ トレイン", "ホエア トゥー テイク ザ トレイン", "トゥー ホエア テイク ザ トレイン"],
        answer: "ホエア トゥー テイク ザ トレイン",
        why: "疑問詞、ホエア、たす、トゥー、たす、動詞の、げんけい。",
      },
    },
    "mistake:1": {
      question: "{seito}の「I want that you come.」。正しいのはどちら？",
      choices: ["I want that you come.", "I want you to come."],
      answer: "I want you to come.",
      why: "「人に〜してほしい」は want＋人＋to＋原形。that の文は使いません。",
      say: {
        question: "{seito}の、アイ ウォント ザット ユー カム。正しいのはどちら？",
        choices: ["アイ ウォント ザット ユー カム", "アイ ウォント ユー トゥー カム"],
        answer: "アイ ウォント ユー トゥー カム",
        why: "ひとに、なになにしてほしい、わ、ウォント、ひと、トゥー、げんけい。ザットの文わ、使いません。",
      },
    },
    "mistake:2": {
      question: "{seito}の「Let me to try.」。正しいのはどちら？",
      choices: ["Let me to try.", "Let me try."],
      answer: "Let me try.",
      why: "let・make のあとは to をつけない原形です。",
      say: {
        question: "{seito}の、レット ミー トゥー トライ。正しいのはどちら？",
        choices: ["レット ミー トゥー トライ", "レット ミー トライ"],
        answer: "レット ミー トライ",
        why: "レット、メイクの、あとわ、トゥーを、つけない、げんけいです。",
      },
    },
  },
};
