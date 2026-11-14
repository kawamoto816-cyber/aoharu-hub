import type { UnitBase } from "../types";

// 止まる授業：話法（高校・英文法）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/h-eng-gram-waho.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 said →「セッド」）。アンデルセン・オースティンの引用は lecture にある部分だけ。
// せりふはキャストごと：h-eng-gram-waho.h-charisma.ts（カリスマ講師）・.h-kyoju.ts（名物教授）・.h-nekketsu.ts（熱血エンタメ講義）。

export const H_WAHO_BASE: UnitBase = {
  unitId: "h-eng-gram-waho",
  pauses: {
    "check:0": {
      question: "Tom said, \"I am hungry.\" を間接話法に。",
      choices: ["Tom said (that) he is hungry.", "Tom said (that) he was hungry.", "Tom said (that) I was hungry."],
      answer: "Tom said (that) he was hungry.",
      why: "I → he、am → was（時制の一致）。",
      say: {
        question: "トム セッド、アイ アム ハングリー、を、間接話法に。",
        choices: ["トム セッド ザット ヒー イズ ハングリー", "トム セッド ザット ヒー ワズ ハングリー", "トム セッド ザット アイ ワズ ハングリー"],
        answer: "トム セッド ザット ヒー ワズ ハングリー",
        why: "アイは、ヒー。アムは、ワズ。時制の一致。",
      },
    },
    "mistake:0": {
      question: "{seito}の「He said me that he was busy.」。正しいのはどちら？",
      choices: ["He said me that he was busy.", "He told me that he was busy."],
      answer: "He told me that he was busy.",
      why: "say は「人」をすぐ後ろに置けません。人に伝えるなら tell 人 that 〜 です。",
      say: {
        question: "{seito}の、ヒー セッド ミー ザット ヒー ワズ ビズィー。正しいのはどちら？",
        choices: ["ヒー セッド ミー ザット ヒー ワズ ビズィー", "ヒー トールド ミー ザット ヒー ワズ ビズィー"],
        answer: "ヒー トールド ミー ザット ヒー ワズ ビズィー",
        why: "セイは、ひとを、すぐうしろに、置けません。ひとに伝えるなら、テル、ひと、ザット、です。",
      },
    },
    "mistake:3": {
      question: "{seito}の「She said that she will come the next day.」。正しいのはどちら？",
      choices: ["She said that she will come the next day.", "She said that she would come the next day."],
      answer: "She said that she would come the next day.",
      why: "said が過去なので、時制の一致で will は would になります。",
      say: {
        question: "{seito}の、シー セッド ザット シー ウィル カム ザ ネクスト デイ。正しいのはどちら？",
        choices: ["シー セッド ザット シー ウィル カム ザ ネクスト デイ", "シー セッド ザット シー ウッド カム ザ ネクスト デイ"],
        answer: "シー セッド ザット シー ウッド カム ザ ネクスト デイ",
        why: "セッドが、過去なので、時制の一致で、ウィルは、ウッドになります。",
      },
    },
    "mistake:1": {
      question: "{seito}の「She asked me where did I live.」。正しいのはどちら？",
      choices: ["She asked me where did I live.", "She asked me where I lived."],
      answer: "She asked me where I lived.",
      why: "間接話法の疑問文は、疑問詞のあとをふつうの語順（主語＋動詞）にします。",
      say: {
        question: "{seito}の、シー アスクト ミー ウェア ディッド アイ リヴ。正しいのはどちら？",
        choices: ["シー アスクト ミー ウェア ディッド アイ リヴ", "シー アスクト ミー ウェア アイ リヴド"],
        answer: "シー アスクト ミー ウェア アイ リヴド",
        why: "間接話法の疑問文は、疑問詞のあとを、ふつうの語順、主語、プラス、動詞にします。",
      },
    },
  },
};
