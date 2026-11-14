import type { UnitBase } from "../types";

// 止まる授業：名詞・冠詞（高校・英文法）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/h-eng-gram-meishi.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 advice →「アドバイス」）。リアの詩の引用は lecture の本文にある語句だけ。
// せりふはキャストごと：h-eng-gram-meishi.h-charisma.ts（カリスマ講師）・.h-kyoju.ts（名物教授）・.h-nekketsu.ts（熱血エンタメ講義）。

export const H_MEISHI_BASE: UnitBase = {
  unitId: "h-eng-gram-meishi",
  pauses: {
    "mistake:0": {
      question: "{seito}の「She gave me many advices.」。正しいのはどちら？",
      choices: ["She gave me many advices.", "She gave me a lot of advice (much advice)."],
      answer: "She gave me a lot of advice (much advice).",
      why: "advice は不可算名詞なので複数形にせず、many も使いません。",
      say: {
        question: "{seito}の、シー ゲイブ ミー メニー アドバイシズ。正しいのはどちら？",
        choices: ["シー ゲイブ ミー メニー アドバイシズ", "シー ゲイブ ミー ア ロット オブ アドバイス。マッチ アドバイス"],
        answer: "シー ゲイブ ミー ア ロット オブ アドバイス。マッチ アドバイス",
        why: "アドバイスは、不可算名詞なので、複数形にせず、メニーも、使いません。",
      },
    },
    "check:1": {
      question: "He has ___ friends here, so he feels lonely.",
      choices: ["a few", "few"],
      answer: "few",
      why: "friends は可算名詞の複数。「ほとんどいない」なので a をつけない。",
      say: {
        question: "ヒー ハズ、くうらん、フレンズ ヒア、ソー ヒー フィールズ ロンリー。くうらんに入るのは？",
        choices: ["ア フュー", "フュー"],
        answer: "フュー",
        why: "フレンズは、可算名詞の、複数。ほとんど、いない、なので、エーを、つけない。",
      },
    },
    "check:2": {
      question: "My mother bought ___ new bag. ___ bag is red.",
      choices: ["a / The", "the / A", "the / The"],
      answer: "a / The",
      why: "初めて出るときは a、2回目は相手に分かるので the。",
      say: {
        question: "マイ マザー ボート、くうらん、ニュー バッグ。くうらん、バッグ イズ レッド。くうらんに入るのは？",
        choices: ["ア、と、ザ", "ザ、と、ア", "ザ、と、ザ"],
        answer: "ア、と、ザ",
        why: "初めて出るときは、ア。にかいめは、相手に、わかるので、ザ。",
      },
    },
    "mistake:2": {
      question: "{seito}の「I'll go to the school by a bus.」（勉強しに行く）。正しいのはどちら？",
      choices: ["I'll go to the school by a bus.", "I'll go to school by bus."],
      answer: "I'll go to school by bus.",
      why: "勉強しに行く school と、by ＋交通手段には冠詞をつけません。",
      say: {
        question: "{seito}の、アイル ゴー トゥー ザ スクール バイ ア バス。勉強しに、いく。正しいのはどちら？",
        choices: ["アイル ゴー トゥー ザ スクール バイ ア バス", "アイル ゴー トゥー スクール バイ バス"],
        answer: "アイル ゴー トゥー スクール バイ バス",
        why: "勉強しに、いく、スクールと、バイ、たす、交通手段には、冠詞を、つけません。",
      },
    },
  },
};
