import type { UnitBase } from "../types";

// 止まる授業：比較（高校・英文法）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/h-eng-gram-hikaku.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 than →「ザン」）。引用は lecture にある部分だけ。
// せりふはキャストごと：h-eng-gram-hikaku.h-charisma.ts（カリスマ講師）・.h-kyoju.ts（名物教授）・.h-nekketsu.ts（熱血エンタメ講義）。

export const H_HIKAKU_BASE: UnitBase = {
  unitId: "h-eng-gram-hikaku",
  pauses: {
    "mistake:0": {
      question: "{seito}の「My brother is more taller than me.」。正しいのはどちら？",
      choices: ["My brother is more taller than me.", "My brother is taller than me."],
      answer: "My brother is taller than me.",
      why: "-er の比較級に more を重ねません。",
      say: {
        question: "{seito}の、マイ ブラザー イズ モア トーラー ザン ミー。正しいのはどちら？",
        choices: ["マイ ブラザー イズ モア トーラー ザン ミー", "マイ ブラザー イズ トーラー ザン ミー"],
        answer: "マイ ブラザー イズ トーラー ザン ミー",
        why: "イーアールの比較級に、モアを重ねません。",
      },
    },
    "check:0": {
      question: "This room is three times ___ ___ as mine.（広さ large）",
      answer: "as large",
      why: "倍数は as ＋原級＋ as の前に置く。",
      say: {
        question: "ディス ルーム イズ スリー タイムズ、くうらん、くうらん、アズ マイン。広さ、ラージ。",
        answer: "アズ ラージ",
        why: "倍数は、アズ、たす原級、たす、アズの、まえに置く。",
      },
    },
    "mistake:1": {
      question: "{seito}の「This question is very easier than that one.」。正しいのはどちら？",
      choices: ["This question is very easier than that one.", "This question is much easier than that one."],
      answer: "This question is much easier than that one.",
      why: "比較級を強めるのは much / far。very は原級を強めます。",
      say: {
        question: "{seito}の、ディス クエスチョン イズ ベリー イージアー ザン ザット ワン。正しいのはどちら？",
        choices: ["ディス クエスチョン イズ ベリー イージアー ザン ザット ワン", "ディス クエスチョン イズ マッチ イージアー ザン ザット ワン"],
        answer: "ディス クエスチョン イズ マッチ イージアー ザン ザット ワン",
        why: "比較級を強めるのは、マッチか、ファー。ベリーは、原級を強めます。",
      },
    },
    "check:1": {
      question: "Tom is the tallest ___ the five boys. の ___ は？",
      choices: ["of", "in"],
      answer: "of",
      why: "後ろが複数の仲間（the five boys）なので of。",
      say: {
        question: "トム イズ ザ トーレスト、くうらん、ザ ファイブ ボーイズ。くうらんに入るのは？",
        choices: ["オブ", "イン"],
        answer: "オブ",
        why: "うしろが、複数の仲間、ザ ファイブ ボーイズなので、オブ。",
      },
    },
  },
};
