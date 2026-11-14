import type { UnitBase } from "../types";

// 止まる授業：分詞（高校・英文法）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/h-eng-gram-bunshi.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 broken →「ブロークン」）。『大いなる遺産』の引用は lecture にある部分だけ。
// せりふはキャストごと：h-eng-gram-bunshi.h-charisma.ts（カリスマ講師）・.h-kyoju.ts（名物教授）・.h-nekketsu.ts（熱血エンタメ講義）。

export const H_BUNSHI_BASE: UnitBase = {
  unitId: "h-eng-gram-bunshi",
  pauses: {
    "mistake:1": {
      question: "{seito}の「Look at the sleeping on the sofa cat.」。正しいのはどちら？",
      choices: ["Look at the sleeping on the sofa cat.", "Look at the cat sleeping on the sofa."],
      answer: "Look at the cat sleeping on the sofa.",
      why: "語句のついた分詞は名詞の後ろに置きます。",
      say: {
        question: "{seito}の、ルック アット ザ スリーピング オン ザ ソファ キャット。正しいのはどちら？",
        choices: ["ルック アット ザ スリーピング オン ザ ソファ キャット", "ルック アット ザ キャット スリーピング オン ザ ソファ"],
        answer: "ルック アット ザ キャット スリーピング オン ザ ソファ",
        why: "語句のついた分詞は、名詞のうしろに置きます。",
      },
    },
    "check:0": {
      question: "The language ___ (speak) in Brazil is Portuguese. の ___ に入る形は？",
      choices: ["speaking", "spoken"],
      answer: "spoken",
      why: "言語は「話される」側なので過去分詞で、後ろから修飾。",
      say: {
        question: "ザ ラングウィッジ、くうらん、スピーク、イン ブラジル イズ ポーチュギーズ。くうらんに入る、かたちは？",
        choices: ["スピーキング", "スポークン"],
        answer: "スポークン",
        why: "言語は、話される側なので、過去分詞で、うしろから修飾。",
      },
    },
    "mistake:2": {
      question: "{seito}の「I had my bike repair yesterday.」。正しいのはどちら？",
      choices: ["I had my bike repair yesterday.", "I had my bike repaired yesterday."],
      answer: "I had my bike repaired yesterday.",
      why: "自転車は「修理される」側なので過去分詞にします。",
      say: {
        question: "{seito}の、アイ ハッド マイ バイク リペア イエスタデイ。正しいのはどちら？",
        choices: ["アイ ハッド マイ バイク リペア イエスタデイ", "アイ ハッド マイ バイク リペアード イエスタデイ"],
        answer: "アイ ハッド マイ バイク リペアード イエスタデイ",
        why: "自転車は、修理される側なので、過去分詞にします。",
      },
    },
    "mistake:0": {
      question: "{seito}の「I was very exciting at the concert.」。正しいのはどちら？",
      choices: ["I was very exciting at the concert.", "I was very excited at the concert."],
      answer: "I was very excited at the concert.",
      why: "わくわく「させられた」のは自分なので過去分詞。exciting だと「私が人をわくわくさせる」になります。",
      say: {
        question: "{seito}の、アイ ワズ ヴェリー エキサイティング アット ザ コンサート。正しいのはどちら？",
        choices: ["アイ ワズ ヴェリー エキサイティング アット ザ コンサート", "アイ ワズ ヴェリー エキサイテッド アット ザ コンサート"],
        answer: "アイ ワズ ヴェリー エキサイテッド アット ザ コンサート",
        why: "わくわく、させられたのは自分なので、過去分詞。エキサイティングだと、わたしが、ひとをわくわくさせる、になります。",
      },
    },
  },
};
