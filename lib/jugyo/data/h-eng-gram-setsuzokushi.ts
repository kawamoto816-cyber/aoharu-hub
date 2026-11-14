import type { UnitBase } from "../types";

// 止まる授業：接続詞（高校・英文法）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/h-eng-gram-setsuzokushi.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 because →「ビコーズ」）。『高慢と偏見』の引用は lecture にある部分だけ。
// せりふはキャストごと：h-eng-gram-setsuzokushi.h-charisma.ts（カリスマ講師）・.h-kyoju.ts（名物教授）・.h-nekketsu.ts（熱血エンタメ講義）。

export const H_SETSUZOKUSHI_BASE: UnitBase = {
  unitId: "h-eng-gram-setsuzokushi",
  pauses: {
    "check:0": {
      question: "Hurry up, ___ you'll be late. の ___ に入るのは？",
      choices: ["and", "or"],
      answer: "or",
      why: "「急ぎなさい、さもないと遅れる」なので 命令文, or。",
      say: {
        question: "ハリー アップ、くうらん、ユール ビー レイト。くうらんに入るのは？",
        choices: ["アンド", "オア"],
        answer: "オア",
        why: "急ぎなさい、さもないと遅れる、なので、命令文、オア。",
      },
    },
    "mistake:1": {
      question: "{seito}の「Both Ken and Mary is from Kobe.」。正しいのはどちら？",
      choices: ["Both Ken and Mary is from Kobe.", "Both Ken and Mary are from Kobe."],
      answer: "Both Ken and Mary are from Kobe.",
      why: "both A and B は2人なので複数扱いです。",
      say: {
        question: "{seito}の、ボウス ケン アンド メアリー イズ フロム コウベ。正しいのはどちら？",
        choices: ["ボウス ケン アンド メアリー イズ フロム コウベ", "ボウス ケン アンド メアリー アー フロム コウベ"],
        answer: "ボウス ケン アンド メアリー アー フロム コウベ",
        why: "ボウス エー アンド ビーは、ふたりなので、複数扱いです。",
      },
    },
    "mistake:0": {
      question: "{seito}の「Though it was cold, but we went swimming.」。正しいのはどちら？",
      choices: ["Though it was cold, but we went swimming.", "Though it was cold, we went swimming."],
      answer: "Though it was cold, we went swimming.",
      why: "though と but は両方とも「けれども」の役。1つの文で両方は使いません。",
      say: {
        question: "{seito}の、ゾウ イット ワズ コウルド、バット ウィー ウェント スイミング。正しいのはどちら？",
        choices: ["ゾウ イット ワズ コウルド、バット ウィー ウェント スイミング", "ゾウ イット ワズ コウルド、ウィー ウェント スイミング"],
        answer: "ゾウ イット ワズ コウルド、ウィー ウェント スイミング",
        why: "ゾウと、バットは、両方とも、けれども、の役。ひとつの文で、両方は使いません。",
      },
    },
    "mistake:2": {
      question: "{seito}の「Let's start when he will come.」。正しいのはどちら？",
      choices: ["Let's start when he will come.", "Let's start when he comes."],
      answer: "Let's start when he comes.",
      why: "時を表す副詞節の中は、未来のことでも現在形です。",
      say: {
        question: "{seito}の、レッツ スタート ウェン ヒー ウィル カム。正しいのはどちら？",
        choices: ["レッツ スタート ウェン ヒー ウィル カム", "レッツ スタート ウェン ヒー カムズ"],
        answer: "レッツ スタート ウェン ヒー カムズ",
        why: "ときを表す、副詞節のなかは、未来のことでも、現在形です。",
      },
    },
  },
};
