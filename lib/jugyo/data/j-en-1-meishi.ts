import type { UnitBase } from "../types";

// 止まる授業：名詞の数と冠詞（中1・英語）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/j-en-1-meishi.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 an hour →「アン アワー」）。
// 詩は本文に引かれた部分だけを使い、作者や作中の人物のせりふは作らない。歌（替え歌・唄）の歌詞は a tea-tray・the sky など語句だけにする。
// せりふはキャストごと：j-en-1-meishi.j-dark.ts（ダーク解説）・j-en-1-meishi.j-kisaku.ts（気さくな兄・姉）。

export const J_MEISHI1_BASE: UnitBase = {
  unitId: "j-en-1-meishi",
  pauses: {
    "mistake:2": {
      question: "{seito}の「I want a water.」。正しいのはどちら？",
      choices: ["I want a water.", "I want some water. / a glass of water"],
      answer: "I want some water. / a glass of water",
      why: "water は数えられないので a をつけない。数えるときは容器を使う。",
      say: {
        question: "{seito}の、アイ ウォント ア ウォーター。正しいのはどちら？",
        choices: ["アイ ウォント ア ウォーター", "アイ ウォント サム ウォーター。または、ア グラス オブ ウォーター"],
        answer: "アイ ウォント サム ウォーター。または、ア グラス オブ ウォーター",
        why: "ウォーターは、数えられないので、アを、つけない。数えるときは、容器を使う。",
      },
    },
    "mistake:0": {
      question: "{seito}の「I have two dog.」。正しいのはどちら？",
      choices: ["I have two dog.", "I have two dogs."],
      answer: "I have two dogs.",
      why: "2つ以上なら名詞を複数形にする。two があっても -s は省かない。",
      say: {
        question: "{seito}の、アイ ハブ トゥー ドッグ。正しいのはどちら？",
        choices: ["アイ ハブ トゥー ドッグ", "アイ ハブ トゥー ドッグズ"],
        answer: "アイ ハブ トゥー ドッグズ",
        why: "ふたつ以上なら、名詞を、ふくすうけいにする。トゥーがあっても、エスは、省かない。",
      },
    },
    "mistake:1": {
      question: "{seito}の「a apple / a hour」。正しいのはどちら？",
      choices: ["a apple / a hour", "an apple / an hour"],
      answer: "an apple / an hour",
      why: "次の語が母音の音で始まるときは an。hour の h は発音しない。",
      say: {
        question: "{seito}の、ア アップル、ア アワー。正しいのはどちら？",
        choices: ["ア アップル、ア アワー", "アン アップル、アン アワー"],
        answer: "アン アップル、アン アワー",
        why: "次の、ごが、母音の音で、始まるときは、アン。アワーの、エイチは、発音しない。",
      },
    },
    "check:2": {
      question: "I play ___ guitar. の ___ に入る語は？",
      choices: ["a", "the"],
      answer: "the",
      why: "楽器を演奏するときは the をつける。",
      say: {
        question: "アイ プレイ、なになに、ギター。の、なになにに、はいる、ごは？",
        choices: ["ア", "ザ"],
        answer: "ザ",
        why: "楽器を、演奏するときは、ザを、つける。",
      },
    },
  },
};
