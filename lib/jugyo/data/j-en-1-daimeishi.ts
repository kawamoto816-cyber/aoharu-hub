import type { UnitBase } from "../types";

// 止まる授業：代名詞（中1・英語）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/j-en-1-daimeishi.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 I like him. →「アイ ライク ヒム」）。詩の英文は本文にある部分だけを引き、作中の人物や作者のせりふは作らない。
// せりふはキャストごと：j-en-1-daimeishi.j-dark.ts（ダーク解説）・j-en-1-daimeishi.j-kisaku.ts（気さくな兄・姉）。

export const DAIMEISHI_BASE: UnitBase = {
  unitId: "j-en-1-daimeishi",
  pauses: {
    "mistake:0": {
      question: "{seito}の「I like he.」。正しいのはどちら？",
      choices: ["I like he.", "I like him."],
      answer: "I like him.",
      why: "動詞のあとは目的格。主語でない位置に he は置けない。",
      say: {
        question: "{seito}の、アイ ライク ヒー。正しいのはどちら？",
        choices: ["アイ ライク ヒー", "アイ ライク ヒム"],
        answer: "アイ ライク ヒム",
        why: "動詞のあとは、目的格。主語でない位置に、ヒーは、置けない。",
      },
    },
    "check:1": {
      question: "___ name is Emi.（彼女の）　空らんに入るのは？",
      choices: ["She", "Her", "Hers"],
      answer: "Her",
      why: "名詞 name の前なので所有格。文の最初なので大文字で書く。",
      say: {
        question: "くうらん、ネーム イズ エミ。かのじょの。空らんに入るのは？",
        choices: ["シー", "ハー", "ハーズ"],
        answer: "ハー",
        why: "名詞、ネームの、まえなので、所有格。文の最初なので、大文字で書く。",
      },
    },
    "mistake:2": {
      question: "{seito}の「This bag is my.」。正しいのはどちら？",
      choices: ["This bag is my.", "This bag is mine."],
      answer: "This bag is mine.",
      why: "後ろに名詞がないときは所有代名詞 mine を使う。",
      say: {
        question: "{seito}の、ディス バッグ イズ マイ。正しいのはどちら？",
        choices: ["ディス バッグ イズ マイ", "ディス バッグ イズ マイン"],
        answer: "ディス バッグ イズ マイン",
        why: "うしろに、名詞がないときは、所有代名詞、マインを使う。",
      },
    },
    "mistake:3": {
      question: "{seito}の「These is my pens.」。正しいのはどちら？",
      choices: ["These is my pens.", "These are my pens."],
      answer: "These are my pens.",
      why: "these は2つ以上なので be動詞は are。",
      say: {
        question: "{seito}の、ジーズ イズ マイ ペンズ。正しいのはどちら？",
        choices: ["ジーズ イズ マイ ペンズ", "ジーズ アー マイ ペンズ"],
        answer: "ジーズ アー マイ ペンズ",
        why: "ジーズは、ふたつ以上なので、ビー動詞は、アー。",
      },
    },
  },
};
