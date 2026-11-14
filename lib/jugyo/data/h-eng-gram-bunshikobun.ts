import type { UnitBase } from "../types";

// 止まる授業：分詞構文（高校・英文法）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/h-eng-gram-bunshikobun.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 Walking →「ウォーキング」）。『野性の呼び声』『闇の奥』の引用は lecture にある部分だけ。
// せりふはキャストごと：h-eng-gram-bunshikobun.h-charisma.ts（カリスマ講師）・.h-kyoju.ts（名物教授）・.h-nekketsu.ts（熱血エンタメ講義）。

export const H_BUNSHIKOBUN_BASE: UnitBase = {
  unitId: "h-eng-gram-bunshikobun",
  pauses: {
    "check:0": {
      question: "Because I was tired, I went to bed early. を分詞構文にすると？",
      answer: "(Being) Tired, I went to bed early.",
      why: "接続詞と主語を消し、was を Being に。Being は省略できる。",
      say: {
        question: "ビコーズ アイ ワズ タイアード、アイ ウェント トゥ ベッド アーリー。を、分詞構文にすると？",
        answer: "ビーイング、タイアード、アイ ウェント トゥ ベッド アーリー",
        why: "接続詞と主語を消し、ワズを、ビーイングに。ビーイングは、省略できる。",
      },
    },
    "mistake:0": {
      question: "{seito}の「Seeing from the hill, the town looks small.」。正しいのはどちら？",
      choices: ["Seeing from the hill, the town looks small.", "Seen from the hill, the town looks small."],
      answer: "Seen from the hill, the town looks small.",
      why: "主語の town は「見られる」側なので過去分詞で始めます。",
      say: {
        question: "{seito}の、シーイング フロム ザ ヒル、ザ タウン ルックス スモール。正しいのはどちら？",
        choices: ["シーイング フロム ザ ヒル、ザ タウン ルックス スモール", "シーン フロム ザ ヒル、ザ タウン ルックス スモール"],
        answer: "シーン フロム ザ ヒル、ザ タウン ルックス スモール",
        why: "主語のタウンは、見られる側なので、過去分詞で始めます。",
      },
    },
    "mistake:2": {
      question: "{seito}の「Being fine, we went on a picnic.」。正しいのはどちら？",
      choices: ["Being fine, we went on a picnic.", "It being fine, we went on a picnic."],
      answer: "It being fine, we went on a picnic.",
      why: "天気の主語 it と主節の we がちがうので、主語 it を残します（独立分詞構文）。",
      say: {
        question: "{seito}の、ビーイング ファイン、ウィー ウェント オン ア ピクニック。正しいのはどちら？",
        choices: ["ビーイング ファイン、ウィー ウェント オン ア ピクニック", "イット ビーイング ファイン、ウィー ウェント オン ア ピクニック"],
        answer: "イット ビーイング ファイン、ウィー ウェント オン ア ピクニック",
        why: "天気の主語、イットと、主節のウィーが、ちがうので、主語、イットを残します。独立分詞構文。",
      },
    },
    "check:2": {
      question: "___ (lose) my key, I couldn't get into the house. の ___ に入る形は？",
      choices: ["Losing", "Having lost"],
      answer: "Having lost",
      why: "かぎをなくしたのは、入れなかったより前なので Having ＋過去分詞。",
      say: {
        question: "くうらん、ルーズ、マイ キー、アイ クドゥント ゲット イントゥ ザ ハウス。くうらんに入る、かたちは？",
        choices: ["ルージング", "ハヴィング ロスト"],
        answer: "ハヴィング ロスト",
        why: "かぎをなくしたのは、入れなかったより前なので、ハヴィング、過去分詞。",
      },
    },
  },
};
