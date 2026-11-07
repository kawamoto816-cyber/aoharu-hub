import type { UnitBase } from "../types";

// 止まる授業：一般動詞（中1・英語）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/j-en-1-ippan.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 Ken plays soccer. →「ケン プレイズ サッカー」）。詩・聖書・劇の英文は本文にある部分だけを引き、作中の人物や作者のせりふは作らない。
// せりふはキャストごと：j-en-1-ippan.j-dark.ts（ダーク解説）・j-en-1-ippan.j-kisaku.ts（気さくな兄・姉）。

export const IPPAN_BASE: UnitBase = {
  unitId: "j-en-1-ippan",
  pauses: {
    "mistake:1": {
      question: "{seito}の「I am play the piano.」。正しいのはどちら？",
      choices: ["I am play the piano.", "I play the piano."],
      answer: "I play the piano.",
      why: "be動詞と一般動詞は並べません。一般動詞の文に am は入りません。",
      say: {
        question: "{seito}の、アイ アム プレイ ザ ピアノ。正しいのはどちら？",
        choices: ["アイ アム プレイ ザ ピアノ", "アイ プレイ ザ ピアノ"],
        answer: "アイ プレイ ザ ピアノ",
        why: "ビー動詞と、一般動詞は、並べません。一般動詞の文に、アムは入りません。",
      },
    },
    "mistake:2": {
      question: "{seito}の「Ken and Mari plays soccer.」。正しいのはどちら？",
      choices: ["Ken and Mari plays soccer.", "Ken and Mari play soccer."],
      answer: "Ken and Mari play soccer.",
      why: "主語は2人（複数）なので -s はつけません。",
      say: {
        question: "{seito}の、ケン アンド マリ プレイズ サッカー。正しいのはどちら？",
        choices: ["ケン アンド マリ プレイズ サッカー", "ケン アンド マリ プレイ サッカー"],
        answer: "ケン アンド マリ プレイ サッカー",
        why: "主語は、ふたり、つまり複数なので、エスは、つけません。",
      },
    },
    "check:0": {
      question: "My mother (have) a car. の（ ）を正しい形にすると？",
      choices: ["have", "has"],
      answer: "has",
      why: "主語は3人称単数。have は has になる。",
      say: {
        question: "マイ マザー、かっこ、ハブ、ア カー。かっこのなかを、正しいかたちにすると？",
        choices: ["ハブ", "ハズ"],
        answer: "ハズ",
        why: "主語は、さんにんしょう単数。ハブは、ハズになる。",
      },
    },
    "mistake:0": {
      question: "{seito}の「She doesn't likes cats.」。正しいのはどちら？",
      choices: ["She doesn't likes cats.", "She doesn't like cats."],
      answer: "She doesn't like cats.",
      why: "does を使ったら、あとの動詞は原形にもどします。-s は does が引き受けています。",
      say: {
        question: "{seito}の、シー ダズント ライクス キャッツ。正しいのはどちら？",
        choices: ["シー ダズント ライクス キャッツ", "シー ダズント ライク キャッツ"],
        answer: "シー ダズント ライク キャッツ",
        why: "ダズを使ったら、あとの動詞は、原形にもどします。エスは、ダズが、引き受けています。",
      },
    },
  },
};
