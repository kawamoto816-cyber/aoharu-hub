import type { UnitBase } from "../types";

// 止まる授業：関係代名詞（高校・英文法）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/h-eng-gram-kandai.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 who →「フー」）。『宝島』の引用は lecture にある部分だけ。
// せりふはキャストごと：h-eng-gram-kandai.h-charisma.ts（カリスマ講師）・.h-kyoju.ts（名物教授）・.h-nekketsu.ts（熱血エンタメ講義）。

export const KANDAI_BASE: UnitBase = {
  unitId: "h-eng-gram-kandai",
  pauses: {
    "check:0": {
      question: "I know a girl ___ mother is a pilot. の ___ に入るのは？",
      choices: ["who", "which", "whose"],
      answer: "whose",
      why: "後ろの mother is a pilot は完全な文で、「その少女の」母が欠けているので所有格。",
      say: {
        question: "アイ ノウ ア ガール、くうらん、マザー イズ ア パイロット。くうらんに入るのは？",
        choices: ["フー", "ウィッチ", "フーズ"],
        answer: "フーズ",
        why: "うしろの、マザー イズ ア パイロットは完全な文で、その少女の、母が欠けているので、所有格。",
      },
    },
    "mistake:0": {
      question: "{seito}の「This is the house which I live.」。正しいのはどちら？",
      choices: ["This is the house which I live.", "This is the house which I live in.（in which I live / where I live）"],
      answer: "This is the house which I live in.（in which I live / where I live）",
      why: "live は自動詞なので、目的語の穴を作るには前置詞 in が必要です。",
      say: {
        question: "{seito}の、ディス イズ ザ ハウス ウィッチ アイ リヴ。正しいのはどちら？",
        choices: ["ディス イズ ザ ハウス ウィッチ アイ リヴ", "ディス イズ ザ ハウス ウィッチ アイ リヴ イン。イン ウィッチ アイ リヴ、ウェア アイ リヴ、とも言える"],
        answer: "ディス イズ ザ ハウス ウィッチ アイ リヴ イン。イン ウィッチ アイ リヴ、ウェア アイ リヴ、とも言える",
        why: "リヴは自動詞なので、目的語の穴を作るには、前置詞のインが必要です。",
      },
    },
    "check:2": {
      question: "___ she told me surprised everyone.（the thing which の意味）の ___ に入るのは？",
      answer: "What",
      why: "先行詞をふくむ「〜すること」は what。",
      say: {
        question: "くうらん、シー トールド ミー サプライズド エヴリワン。ザ シング ウィッチ、の意味で、くうらんに入るのは？",
        answer: "ワット",
        why: "先行詞をふくむ、すること、は、ワット。",
      },
    },
    "mistake:2": {
      question: "{seito}の「I met Ken, that is my cousin.」。正しいのはどちら？",
      choices: ["I met Ken, that is my cousin.", "I met Ken, who is my cousin."],
      answer: "I met Ken, who is my cousin.",
      why: "コンマのある非制限用法では that は使えません。",
      say: {
        question: "{seito}の、アイ メット ケン、ザット イズ マイ カズン。正しいのはどちら？",
        choices: ["アイ メット ケン、ザット イズ マイ カズン", "アイ メット ケン、フー イズ マイ カズン"],
        answer: "アイ メット ケン、フー イズ マイ カズン",
        why: "コンマのある非制限用法では、ザットは使えません。",
      },
    },
  },
};
