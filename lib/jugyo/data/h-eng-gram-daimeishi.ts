import type { UnitBase } from "../types";

// 止まる授業：代名詞（高校・英文法）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/h-eng-gram-daimeishi.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 mine →「マイン」）。ホイットマン・フロストの詩の引用は lecture にある部分だけ。
// せりふはキャストごと：h-eng-gram-daimeishi.h-charisma.ts（カリスマ講師）・.h-kyoju.ts（名物教授）・.h-nekketsu.ts（熱血エンタメ講義）。

export const H_DAIMEISHI_BASE: UnitBase = {
  unitId: "h-eng-gram-daimeishi",
  pauses: {
    "mistake:0": {
      question: "{seito}の「This bag is my.」。正しいのはどちら？",
      choices: ["This bag is my.", "This bag is mine."],
      answer: "This bag is mine.",
      why: "「私のもの」は所有代名詞 mine。my は後ろに名詞が必要です。",
      say: {
        question: "{seito}の、ディス バッグ イズ マイ。正しいのはどちら？",
        choices: ["ディス バッグ イズ マイ", "ディス バッグ イズ マイン"],
        answer: "ディス バッグ イズ マイン",
        why: "わたしのもの、は、所有代名詞の、マイン。マイは、うしろに、名詞が必要です。",
      },
    },
    "check:1": {
      question: "___ is important to sleep well. の ___ に入る語は？",
      choices: ["It", "There"],
      answer: "It",
      why: "本当の主語は to sleep well。形式主語 It を文頭に置く。",
      say: {
        question: "くうらん、イズ インポータント トゥ スリープ ウェル。くうらんに入る単語は？",
        choices: ["イット", "ゼア"],
        answer: "イット",
        why: "本当の主語は、トゥ スリープ ウェル。形式主語の、イットを、文頭に置く。",
      },
    },
    "mistake:1": {
      question: "{seito}の「I lost my umbrella, so I have to buy it.」。正しいのはどちら？",
      choices: ["I lost my umbrella, so I have to buy it.", "I lost my umbrella, so I have to buy one."],
      answer: "I lost my umbrella, so I have to buy one.",
      why: "なくした傘そのものは買えません。同じ種類の別の物なので one です。",
      say: {
        question: "{seito}の、アイ ロスト マイ アンブレラ、ソー アイ ハフ トゥ バイ イット。正しいのはどちら？",
        choices: ["アイ ロスト マイ アンブレラ、ソー アイ ハフ トゥ バイ イット", "アイ ロスト マイ アンブレラ、ソー アイ ハフ トゥ バイ ワン"],
        answer: "アイ ロスト マイ アンブレラ、ソー アイ ハフ トゥ バイ ワン",
        why: "なくした傘、そのものは、買えません。同じ種類の、べつのものなので、ワンです。",
      },
    },
    "mistake:2": {
      question: "{seito}の「I have two sisters. One is a nurse, and another is a cook.」。正しいのはどちら？",
      choices: ["I have two sisters. One is a nurse, and another is a cook.", "One is a nurse, and the other is a cook."],
      answer: "One is a nurse, and the other is a cook.",
      why: "2人のうち残りの1人は決まっているので the other を使います。",
      say: {
        question: "{seito}の、アイ ハヴ トゥー シスターズ。ワン イズ ア ナース、アンド アナザー イズ ア クック。正しいのはどちら？",
        choices: ["アイ ハヴ トゥー シスターズ。ワン イズ ア ナース、アンド アナザー イズ ア クック", "ワン イズ ア ナース、アンド ジ アザー イズ ア クック"],
        answer: "ワン イズ ア ナース、アンド ジ アザー イズ ア クック",
        why: "ふたりのうち、残りの、ひとりは、決まっているので、ジ アザーを使います。",
      },
    },
  },
};
