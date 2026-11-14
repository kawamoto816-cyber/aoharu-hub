import type { UnitBase } from "../types";

// 止まる授業：動名詞（中2・英語）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/j-en-2-domeishi.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 I enjoyed talking with her. →「アイ エンジョイド トーキング ウィズ ハー」、-ing →「イング」）。
// 名作の言葉は lecture にある英文だけを引き、作家のせりふは作らない。
// せりふはキャストごと：j-en-2-domeishi.j-dark.ts（ダーク解説）・j-en-2-domeishi.j-kisaku.ts（気さくな兄・姉）。

export const J_DOMEISHI_BASE: UnitBase = {
  unitId: "j-en-2-domeishi",
  pauses: {
    "mistake:3": {
      question: "{seito}の「Reading books are fun.」。正しいのはどちら？",
      choices: ["Reading books are fun.", "Reading books is fun."],
      answer: "Reading books is fun.",
      why: "主語は「本を読むこと」という1つのことなので is。books につられて are にしないようにします。",
      say: {
        question: "{seito}の、リーディング ブックス アー ファン。正しいのはどちら？",
        choices: ["リーディング ブックス アー ファン", "リーディング ブックス イズ ファン"],
        answer: "リーディング ブックス イズ ファン",
        why: "主語は、本を読むこと、という、ひとつのことなので、イズ。ブックスに、つられて、アーに、しないようにします。",
      },
    },
    "mistake:0": {
      question: "{seito}の「I enjoyed to talk with her.」。正しいのはどちら？",
      choices: ["I enjoyed to talk with her.", "I enjoyed talking with her."],
      answer: "I enjoyed talking with her.",
      why: "enjoy のあとは動名詞だけです。不定詞はとりません。",
      say: {
        question: "{seito}の、アイ エンジョイド トゥー トーク ウィズ ハー。正しいのはどちら？",
        choices: ["アイ エンジョイド トゥー トーク ウィズ ハー", "アイ エンジョイド トーキング ウィズ ハー"],
        answer: "アイ エンジョイド トーキング ウィズ ハー",
        why: "エンジョイの、あとは、動名詞だけです。不定詞は、とりません。",
      },
    },
    "mistake:2": {
      question: "{seito}の「He is good at play the guitar.」。正しいのはどちら？",
      choices: ["He is good at play the guitar.", "He is good at playing the guitar."],
      answer: "He is good at playing the guitar.",
      why: "前置詞 at のあとの動詞は動名詞にします。",
      say: {
        question: "{seito}の、ヒー イズ グッド アット プレイ ザ ギター。正しいのはどちら？",
        choices: ["ヒー イズ グッド アット プレイ ザ ギター", "ヒー イズ グッド アット プレイング ザ ギター"],
        answer: "ヒー イズ グッド アット プレイング ザ ギター",
        why: "前置詞、アットの、あとの動詞は、動名詞にします。",
      },
    },
    "check:1": {
      question: "「写真をとるのはどうですか」を How about を使って英語に。",
      choices: ["How about take pictures?", "How about to take pictures?", "How about taking pictures?"],
      answer: "How about taking pictures?",
      why: "前置詞 about のあとは動名詞 taking。",
      say: {
        question: "写真をとるのは、どうですか、を、ハウ アバウトを使って、英語に。",
        choices: ["ハウ アバウト テイク ピクチャーズ", "ハウ アバウト トゥー テイク ピクチャーズ", "ハウ アバウト テイキング ピクチャーズ"],
        answer: "ハウ アバウト テイキング ピクチャーズ",
        why: "前置詞、アバウトの、あとは、動名詞、テイキング。",
      },
    },
  },
};
