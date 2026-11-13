import type { UnitBase } from "../types";

// 止まる授業：リスニング（中1・英語）の共通の骨組み（問題）。事実・例文・年は lib/lecture/data/j-en-1-listening.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 Can you swim? →「キャン ユー スイム」）。童謡（マザーグース）の英文は引かず、話のすじだけ日本語で言う。
// せりふはキャストごと：j-en-1-listening.j-dark.ts（ダーク解説）・j-en-1-listening.j-kisaku.ts（気さくな兄・姉）。

export const J_LISTENING1_BASE: UnitBase = {
  unitId: "j-en-1-listening",
  pauses: {
    "check:0": {
      question: "A: Where is my cap? の答えとして合うのは「It's blue.」と「It's on the chair.」のどっち？",
      choices: ["It's blue.", "It's on the chair."],
      answer: "It's on the chair.",
      why: "Where は場所をたずねる。",
      say: {
        question: "エー、ウェア イズ マイ キャップ？　の答えとして合うのは、イッツ ブルー、と、イッツ オン ザ チェア、の、どっち？",
        choices: ["イッツ ブルー", "イッツ オン ザ チェア"],
        answer: "イッツ オン ザ チェア",
        why: "ウェアは、場所を、たずねる。",
      },
    },
    "mistake:0": {
      question: "{seito}の「Can you swim? — Yes, I do.」。正しい答えはどちら？",
      choices: ["Can you swim? — Yes, I do.", "Yes, I can."],
      answer: "Yes, I can.",
      why: "Can でたずねられたら can で答えます。",
      say: {
        question: "{seito}の、キャン ユー スイム？　イエス、アイ ドゥー。正しい答えはどちら？",
        choices: ["キャン ユー スイム？　イエス、アイ ドゥー", "イエス、アイ キャン"],
        answer: "イエス、アイ キャン",
        why: "キャンで、たずねられたら、キャンで答えます。",
      },
    },
    "check:2": {
      question: "「後ろを強く」読む数字は fourteen と forty のどっち？",
      choices: ["fourteen", "forty"],
      answer: "fourteen",
      why: "-teen は後ろの teen を強く読む。forty は前が強い。",
      say: {
        question: "うしろを強く読む数字は、フォーティーンと、フォーティの、どっち？",
        choices: ["フォーティーン", "フォーティ"],
        answer: "フォーティーン",
        why: "ティーンで終わるかずは、うしろの、ティーンを、強く読む。フォーティは、まえが強い。",
      },
    },
    "mistake:2": {
      question: "{seito}の「会話の最初に出た時刻を答える」。正しいのはどちら？",
      choices: ["会話の最初に出た時刻を答える", "質問が聞いている時刻を答える"],
      answer: "質問が聞いている時刻を答える",
      why: "会話には「今の時刻」と「バスの時刻」など、数字が2つ以上出てくることがよくあります。",
      say: {
        why: "会話には、いまの時刻と、バスの時刻など、数字が、ふたつ以上、出てくることが、よくあります。",
      },
    },
  },
};
