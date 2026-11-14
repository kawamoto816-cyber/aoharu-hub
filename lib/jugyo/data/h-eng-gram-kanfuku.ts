import type { UnitBase } from "../types";

// 止まる授業：関係副詞（高校・英文法）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/h-eng-gram-kanfuku.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 where →「ウェア」）。『秘密の花園』の引用は lecture にある部分だけ。
// せりふはキャストごと：h-eng-gram-kanfuku.h-charisma.ts（カリスマ講師）・.h-kyoju.ts（名物教授）・.h-nekketsu.ts（熱血エンタメ講義）。

export const H_KANFUKU_BASE: UnitBase = {
  unitId: "h-eng-gram-kanfuku",
  pauses: {
    "check:0": {
      question: "I remember the day ___ we first met. の ___ に入るのは？",
      choices: ["where", "when", "which"],
      answer: "when",
      why: "先行詞が時（the day）で、後ろの文は欠けがない。",
      say: {
        question: "アイ リメンバー ザ デイ、くうらん、ウィー ファースト メット。くうらんに入るのは？",
        choices: ["ウェア", "ウェン", "ウィッチ"],
        answer: "ウェン",
        why: "先行詞が、とき、ザ デイで、うしろの文は、欠けがない。",
      },
    },
    "mistake:1": {
      question: "{seito}の「Tell me the way how you made it.」。正しいのはどちら？",
      choices: ["Tell me the way how you made it.", "Tell me the way you made it. / Tell me how you made it."],
      answer: "Tell me the way you made it. / Tell me how you made it.",
      why: "the way と how は並べて使いません。どちらか一方にします。",
      say: {
        question: "{seito}の、テル ミー ザ ウェイ ハウ ユー メイド イット。正しいのはどちら？",
        choices: ["テル ミー ザ ウェイ ハウ ユー メイド イット", "テル ミー ザ ウェイ ユー メイド イット。または、テル ミー ハウ ユー メイド イット"],
        answer: "テル ミー ザ ウェイ ユー メイド イット。または、テル ミー ハウ ユー メイド イット",
        why: "ザ ウェイと、ハウは、ならべて使いません。どちらか一方にします。",
      },
    },
    "mistake:0": {
      question: "{seito}の「This is the town where I visited last year.」。正しいのはどちら？",
      choices: ["This is the town where I visited last year.", "This is the town which (that) I visited last year."],
      answer: "This is the town which (that) I visited last year.",
      why: "visit の目的語が欠けているので、関係代名詞を使います。",
      say: {
        question: "{seito}の、ディス イズ ザ タウン ウェア アイ ヴィジテッド ラスト イヤー。正しいのはどちら？",
        choices: ["ディス イズ ザ タウン ウェア アイ ヴィジテッド ラスト イヤー", "ディス イズ ザ タウン ウィッチ、または、ザット、アイ ヴィジテッド ラスト イヤー"],
        answer: "ディス イズ ザ タウン ウィッチ、または、ザット、アイ ヴィジテッド ラスト イヤー",
        why: "ヴィジットの目的語が欠けているので、関係代名詞を使います。",
      },
    },
    "check:2": {
      question: "He was sick. That's ___ he was absent. の ___ は？",
      choices: ["why", "how", "where"],
      answer: "why",
      why: "the reason が省略された That's why 〜（だから〜）。",
      say: {
        question: "ヒー ワズ シック。ザッツ、くうらん、ヒー ワズ アブセント。くうらんに入るのは？",
        choices: ["ワイ", "ハウ", "ウェア"],
        answer: "ワイ",
        why: "ザ リーズンが省略された、ザッツ ワイ。だから、という意味。",
      },
    },
  },
};
