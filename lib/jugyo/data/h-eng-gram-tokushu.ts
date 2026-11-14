import type { UnitBase } from "../types";

// 止まる授業：否定・倒置・強調・省略（高校・英文法）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/h-eng-gram-tokushu.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 never →「ネヴァー」）。シェイクスピア・コールリッジの引用は lecture にある部分だけ。
// せりふはキャストごと：h-eng-gram-tokushu.h-charisma.ts（カリスマ講師）・.h-kyoju.ts（名物教授）・.h-nekketsu.ts（熱血エンタメ講義）。

export const H_TOKUSHU_BASE: UnitBase = {
  unitId: "h-eng-gram-tokushu",
  pauses: {
    "check:2": {
      question: "Not every student has a phone. は部分否定・全体否定のどちら？",
      choices: ["部分否定", "全体否定"],
      answer: "部分否定",
      why: "not ＋ every で「全員が持っているとは限らない」。",
      say: {
        question: "ノット エヴリ スチューデント ハズ ア フォウン、は、部分否定、全体否定の、どちら？",
        why: "ノット、プラス、エヴリで、全員が、持っているとは、限らない。",
      },
    },
    "mistake:0": {
      question: "{seito}の「Never I have seen such a view.」。正しいのはどちら？",
      choices: ["Never I have seen such a view.", "Never have I seen such a view."],
      answer: "Never have I seen such a view.",
      why: "否定語が文頭に出たら、疑問文と同じ語順（have ＋主語）にします。",
      say: {
        question: "{seito}の、ネヴァー アイ ハヴ スィーン サッチ ア ヴュー。正しいのはどちら？",
        choices: ["ネヴァー アイ ハヴ スィーン サッチ ア ヴュー", "ネヴァー ハヴ アイ スィーン サッチ ア ヴュー"],
        answer: "ネヴァー ハヴ アイ スィーン サッチ ア ヴュー",
        why: "否定語が、文頭に出たら、疑問文と同じ語順、ハヴ、プラス、主語にします。",
      },
    },
    "check:0": {
      question: "I like tennis. — ___ ___ my brother.（兄もそうだ）",
      choices: ["So does", "Neither does"],
      answer: "So does",
      why: "「〜もそうだ」は So ＋助動詞（does）＋主語の倒置。",
      say: {
        question: "アイ ライク テニス。くうらん、くうらん、マイ ブラザー。あにも、そうだ。",
        choices: ["ソウ ダズ", "ニーザー ダズ"],
        answer: "ソウ ダズ",
        why: "もそうだ、は、ソウ、プラス、助動詞、ダズ、プラス、主語の倒置。",
      },
    },
    "mistake:3": {
      question: "{seito}の「It was in this town which I was born.」。正しいのはどちら？",
      choices: ["It was in this town which I was born.", "It was in this town that I was born."],
      answer: "It was in this town that I was born.",
      why: "強調構文の「つなぎ」は that（強調するのが人なら who も可）。in this town は副詞句なので、関係代名詞の which は使えません。",
      say: {
        question: "{seito}の、イット ワズ イン ディス タウン ウィッチ アイ ワズ ボーン。正しいのはどちら？",
        choices: ["イット ワズ イン ディス タウン ウィッチ アイ ワズ ボーン", "イット ワズ イン ディス タウン ザット アイ ワズ ボーン"],
        answer: "イット ワズ イン ディス タウン ザット アイ ワズ ボーン",
        why: "強調構文の、つなぎは、ザット。強調するのが、ひとなら、フーも可。イン ディス タウンは、ふくしくなので、関係代名詞の、ウィッチは、使えません。",
      },
    },
  },
};
