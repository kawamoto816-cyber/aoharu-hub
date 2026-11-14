import type { UnitBase } from "../types";

// 止まる授業：前置詞（高校・英文法）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/h-eng-gram-zenchishi.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 at →「アット」）。ヴェルヌの引用は lecture にある部分だけ。
// せりふはキャストごと：h-eng-gram-zenchishi.h-charisma.ts（カリスマ講師）・.h-kyoju.ts（名物教授）・.h-nekketsu.ts（熱血エンタメ講義）。

export const H_ZENCHISHI_BASE: UnitBase = {
  unitId: "h-eng-gram-zenchishi",
  pauses: {
    "mistake:0": {
      question: "{seito}の「I was born in May 5.」。正しいのはどちら？",
      choices: ["I was born in May 5.", "I was born on May 5."],
      answer: "I was born on May 5.",
      why: "日付は「その日」なので on。月だけなら in May です。",
      say: {
        question: "{seito}の、アイ ワズ ボーン イン メイ フィフス。正しいのはどちら？",
        choices: ["アイ ワズ ボーン イン メイ フィフス", "アイ ワズ ボーン オン メイ フィフス"],
        answer: "アイ ワズ ボーン オン メイ フィフス",
        why: "日付は、そのひ、なので、オン。つきだけなら、イン メイ です。",
      },
    },
    "mistake:1": {
      question: "{seito}の「Please return the book until Friday.」。正しいのはどちら？",
      choices: ["Please return the book until Friday.", "Please return the book by Friday."],
      answer: "Please return the book by Friday.",
      why: "金曜までに1回返す「期限」なので by。until は「ずっと続く」ときに使います。",
      say: {
        question: "{seito}の、プリーズ リターン ザ ブック アンティル フライデー。正しいのはどちら？",
        choices: ["プリーズ リターン ザ ブック アンティル フライデー", "プリーズ リターン ザ ブック バイ フライデー"],
        answer: "プリーズ リターン ザ ブック バイ フライデー",
        why: "金曜までに、いっかい返す、期限なので、バイ。アンティルは、ずっと続く、ときに使います。",
      },
    },
    "check:2": {
      question: "The game was put off ___ ___ the heavy snow.（大雪のために）",
      choices: ["because", "because of", "in spite of"],
      answer: "because of",
      why: "後ろが名詞 the heavy snow なので群前置詞 because of。",
      say: {
        question: "ザ ゲーム ワズ プット オフ、空欄、空欄、ザ ヘヴィ スノウ。おおゆきのために。",
        choices: ["ビコーズ", "ビコーズ オヴ", "イン スパイト オヴ"],
        answer: "ビコーズ オヴ",
        why: "うしろが、名詞、ザ ヘヴィ スノウ なので、群前置詞、ビコーズ オヴ。",
      },
    },
  },
};
