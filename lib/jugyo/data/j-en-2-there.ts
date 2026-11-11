import type { UnitBase } from "../types";

// 止まる授業：There is / are（中2・英語）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/j-en-2-there.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 There are →「ゼア アー」、Is there →「イズ ゼア」）。
// 名作の言葉は lecture にある英文だけを引き、登場人物のせりふは作らない。
// せりふはキャストごと：j-en-2-there.j-dark.ts（ダーク解説）・j-en-2-there.j-kisaku.ts（気さくな兄・姉）。

export const J_THERE_BASE: UnitBase = {
  unitId: "j-en-2-there",
  pauses: {
    "mistake:0": {
      question: "{seito}の「There is three books on the desk.」。正しいのはどちら？",
      choices: ["There is three books on the desk.", "There are three books on the desk."],
      answer: "There are three books on the desk.",
      why: "後ろの名詞 three books が複数なので are です。",
      say: {
        question: "{seito}の、ゼア イズ スリー ブックス オン ザ デスク。正しいのはどちら？",
        choices: ["ゼア イズ スリー ブックス オン ザ デスク", "ゼア アー スリー ブックス オン ザ デスク"],
        answer: "ゼア アー スリー ブックス オン ザ デスク",
        why: "うしろの名詞、スリー ブックスが、複数なので、アーです。",
      },
    },
    "check:0": {
      question: "There ___ some water in the glass. の ___ に入る語は？",
      choices: ["is", "are"],
      answer: "is",
      why: "water は数えられない名詞なので is。",
      say: {
        question: "ゼア、なになに、サム ウォーター イン ザ グラス。なになにに、入るごは？",
        choices: ["イズ", "アー"],
        answer: "イズ",
        why: "ウォーターは、かぞえられない名詞なので、イズ。",
      },
    },
    "mistake:2": {
      question: "{seito}の「Are there a library near here? — Yes, it is.」。正しいのはどちら？",
      choices: ["Are there a library near here? — Yes, it is.", "Is there a library near here? — Yes, there is."],
      answer: "Is there a library near here? — Yes, there is.",
      why: "a library は単数なので is。答えも there を使います。",
      say: {
        question: "{seito}の、アー ゼア ア ライブラリー ニア ヒア？　イエス、イット イズ。正しいのはどちら？",
        choices: ["アー ゼア ア ライブラリー ニア ヒア？　イエス、イット イズ", "イズ ゼア ア ライブラリー ニア ヒア？　イエス、ゼア イズ"],
        answer: "イズ ゼア ア ライブラリー ニア ヒア？　イエス、ゼア イズ",
        why: "ア ライブラリーは、単数なので、イズ。答えも、ゼアを使います。",
      },
    },
    "mistake:1": {
      question: "{seito}の「There is my pen on the table.」。正しいのはどちら？",
      choices: ["There is my pen on the table.", "My pen is on the table."],
      answer: "My pen is on the table.",
      why: "my のついた特定のものは、There 構文ではなく「主語 ＋ be動詞 ＋ 場所」で表します。",
      say: {
        question: "{seito}の、ゼア イズ マイ ペン オン ザ テーブル。正しいのはどちら？",
        choices: ["ゼア イズ マイ ペン オン ザ テーブル", "マイ ペン イズ オン ザ テーブル"],
        answer: "マイ ペン イズ オン ザ テーブル",
        why: "マイのついた、特定のものは、ゼア構文ではなく、主語、たす、ビー動詞、たす、ばしょ、で表します。",
      },
    },
  },
};
