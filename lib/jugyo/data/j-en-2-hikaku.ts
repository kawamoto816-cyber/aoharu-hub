import type { UnitBase } from "../types";

// 止まる授業：比較（中2・英語）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/j-en-2-hikaku.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 taller than →「トーラー ザン」）。詩・小説の英文は本文にある部分だけを引き、作中の人物や作者のせりふは作らない。
// せりふはキャストごと：j-en-2-hikaku.j-dark.ts（ダーク解説）・j-en-2-hikaku.j-kisaku.ts（気さくな兄・姉）。

export const HIKAKU_BASE: UnitBase = {
  unitId: "j-en-2-hikaku",
  pauses: {
    "mistake:2": {
      question: "{seito}の「He is as taller as my father.」。正しいのはどちら？",
      choices: ["He is as taller as my father.", "He is as tall as my father."],
      answer: "He is as tall as my father.",
      why: "as と as の間は原級（もとの形）です。",
      say: {
        question: "{seito}の、ヒー イズ アズ トーラー アズ マイ ファーザー。正しいのはどちら？",
        choices: ["ヒー イズ アズ トーラー アズ マイ ファーザー", "ヒー イズ アズ トール アズ マイ ファーザー"],
        answer: "ヒー イズ アズ トール アズ マイ ファーザー",
        why: "アズとアズのあいだは、原級、もとのかたちです。",
      },
    },
    "mistake:1": {
      question: "{seito}の「She is the tallest of her class.」。正しいのはどちら？",
      choices: ["She is the tallest of her class.", "She is the tallest in her class."],
      answer: "She is the tallest in her class.",
      why: "class のような集団・場所には in。of は of the three、of all のように複数や数に使います。",
      say: {
        question: "{seito}の、シー イズ ザ トーレスト オブ ハー クラス。正しいのはどちら？",
        choices: ["シー イズ ザ トーレスト オブ ハー クラス", "シー イズ ザ トーレスト イン ハー クラス"],
        answer: "シー イズ ザ トーレスト イン ハー クラス",
        why: "クラスのような、集団、場所には、イン。オブは、オブ ザ スリー、オブ オールのように、複数や、かずに使います。",
      },
    },
    "mistake:0": {
      question: "{seito}の「This book is interestinger than that one.」。正しいのはどちら？",
      choices: ["This book is interestinger than that one.", "This book is more interesting than that one."],
      answer: "This book is more interesting than that one.",
      why: "interesting は長い語なので -er をつけず、前に more を置きます。",
      say: {
        question: "{seito}の、ディス ブック イズ インタレスティンガー ザン ザット ワン。正しいのはどちら？",
        choices: ["ディス ブック イズ インタレスティンガー ザン ザット ワン", "ディス ブック イズ モア インタレスティング ザン ザット ワン"],
        answer: "ディス ブック イズ モア インタレスティング ザン ザット ワン",
        why: "インタレスティングは、長い語なので、イーアールをつけず、まえに、モアを置きます。",
      },
    },
    "check:2": {
      question: "「私の犬はあなたの犬ほど大きくない」を英語に。",
      answer: "My dog is not as big as yours (your dog).",
      why: "「〜ほど…ない」は not as 原級 as。",
      say: {
        question: "わたしの犬は、あなたの犬ほど大きくない、を英語に。",
        answer: "マイ ドッグ イズ ノット アズ ビッグ アズ ユアーズ。ユア ドッグ",
        why: "ほど、ない、は、ノット アズ、原級、アズ。",
      },
    },
  },
};
