import type { UnitBase } from "../types";

// 止まる授業：助動詞（高校・英文法）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/h-eng-gram-jodoshi.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 can't →「キャント」、should have →「シュッド ハブ」）。演説・聖書・『マクベス』の英文は lecture にある部分だけ。
// せりふはキャストごと：h-eng-gram-jodoshi.h-charisma.ts（カリスマ講師）・.h-kyoju.ts（名物教授）・.h-nekketsu.ts（熱血エンタメ講義）。

export const HE_JODOSHI_BASE: UnitBase = {
  unitId: "h-eng-gram-jodoshi",
  pauses: {
    "mistake:3": {
      question: "{seito}の訳「She can't be in the office. →『彼女は事務所にいることができない』」。正しい訳はどちら？",
      choices: ["She can't be in the office. →「彼女は事務所にいることができない」", "「彼女が事務所にいるはずがない」"],
      answer: "「彼女が事務所にいるはずがない」",
      why: "can't ＋ be は推量の否定「〜のはずがない」になることが多いです。",
      say: {
        question: "{seito}のやく、シー キャント ビー イン ザ オフィス、彼女は、事務所にいることができない。ただしいやくはどちら？",
        choices: ["シー キャント ビー イン ザ オフィス、彼女は、事務所にいることができない", "彼女が、事務所にいる、はずがない"],
        answer: "彼女が、事務所にいる、はずがない",
        why: "キャント、たす、ビーは、推量の否定、のはずがない、に、なることが多いです。",
      },
    },
    "check:0": {
      question: "「彼がそんなことを言ったはずがない」を英語にしましょう。",
      answer: "He can't (cannot) have said such a thing.",
      why: "過去のことを強く打ち消す推量は can't have＋過去分詞。",
      say: {
        answer: "ヒー キャント、キャンノット、ハブ セッド サッチ ア シング",
        why: "過去のことを、強く打ち消す推量は、キャント ハブ、たす、過去分詞。",
      },
    },
    "mistake:1": {
      question: "{seito}の「I should study harder last week.」。正しいのはどちら？",
      choices: ["I should study harder last week.", "I should have studied harder last week."],
      answer: "I should have studied harder last week.",
      why: "過去にしなかったことへの後悔は should have＋過去分詞で表します。",
      say: {
        question: "{seito}の、アイ シュッド スタディ ハーダー ラスト ウィーク。正しいのはどちら？",
        choices: ["アイ シュッド スタディ ハーダー ラスト ウィーク", "アイ シュッド ハブ スタディド ハーダー ラスト ウィーク"],
        answer: "アイ シュッド ハブ スタディド ハーダー ラスト ウィーク",
        why: "過去に、しなかったことへの後悔は、シュッド ハブ、たす、過去分詞で表します。",
      },
    },
    "mistake:0": {
      question: "撮影禁止を伝えたい。{seito}の「You don't have to take photos here.」。正しいのはどちら？",
      choices: ["You don't have to take photos here.（撮影禁止、のつもり）", "You must not take photos here."],
      answer: "You must not take photos here.",
      why: "don't have to は「〜する必要はない」。禁止は must not です。",
      say: {
        question: "撮影禁止を伝えたい。{seito}の、ユー ドント ハフ トゥ テイク フォトズ ヒア。正しいのはどちら？",
        choices: ["ユー ドント ハフ トゥ テイク フォトズ ヒア", "ユー マスト ノット テイク フォトズ ヒア"],
        answer: "ユー マスト ノット テイク フォトズ ヒア",
        why: "ドント ハフ トゥは、する必要はない。禁止は、マスト ノットです。",
      },
    },
  },
};
