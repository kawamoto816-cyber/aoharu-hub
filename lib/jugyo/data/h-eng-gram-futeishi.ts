import type { UnitBase } from "../types";

// 止まる授業：不定詞（高校・英文法）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/h-eng-gram-futeishi.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（to →「トゥー」、enjoyed talking →「エンジョイド トーキング」）。
// パトリック・ヘンリーの演説の引用は lecture にある部分だけ。
// せりふはキャストごと：h-eng-gram-futeishi.h-charisma.ts（カリスマ講師）・.h-kyoju.ts（名物教授）・.h-nekketsu.ts（熱血エンタメ講義）。

export const H_FUTEISHI_BASE: UnitBase = {
  unitId: "h-eng-gram-futeishi",
  pauses: {
    "mistake:1": {
      question: "{seito}の「It is kind for you to help me.」。正しいのはどちら？",
      choices: ["It is kind for you to help me.", "It is kind of you to help me."],
      answer: "It is kind of you to help me.",
      why: "kind は人の性質を表す形容詞なので、意味上の主語は of 人 です。",
      say: {
        question: "{seito}の、イット イズ カインド フォー ユー トゥー ヘルプ ミー。正しいのはどちら？",
        choices: ["イット イズ カインド フォー ユー トゥー ヘルプ ミー", "イット イズ カインド オブ ユー トゥー ヘルプ ミー"],
        answer: "イット イズ カインド オブ ユー トゥー ヘルプ ミー",
        why: "カインドは、ひとの性質を表す形容詞なので、意味上の主語は、オブ、ひと、です。",
      },
    },
    "mistake:0": {
      question: "{seito}の「I enjoyed to talk with my friends.」。正しいのはどちら？",
      choices: ["I enjoyed to talk with my friends.", "I enjoyed talking with my friends."],
      answer: "I enjoyed talking with my friends.",
      why: "enjoy は動名詞を目的語にとります。不定詞はとりません。",
      say: {
        question: "{seito}の、アイ エンジョイド トゥー トーク ウィズ マイ フレンズ。正しいのはどちら？",
        choices: ["アイ エンジョイド トゥー トーク ウィズ マイ フレンズ", "アイ エンジョイド トーキング ウィズ マイ フレンズ"],
        answer: "アイ エンジョイド トーキング ウィズ マイ フレンズ",
        why: "エンジョイは、動名詞を目的語にとります。不定詞は、とりません。",
      },
    },
    "check:1": {
      question: "I remember ___ (see) her at the party last year.",
      answer: "seeing",
      why: "last year と過去にしたことを覚えているので remember -ing。",
      say: {
        question: "アイ リメンバー、空らん、シー、ハー アット ザ パーティー ラスト イヤー。",
        answer: "シーイング",
        why: "ラスト イヤーと、過去にしたことを覚えているので、リメンバー イング。",
      },
    },
    "mistake:2": {
      question: "{seito}の「Don't forget mailing this letter.」。正しいのはどちら？",
      choices: ["Don't forget mailing this letter.", "Don't forget to mail this letter."],
      answer: "Don't forget to mail this letter.",
      why: "これからすること（手紙を出す）を忘れないで、なので forget to 〜。",
      say: {
        question: "{seito}の、ドント フォゲット メイリング ディス レター。正しいのはどちら？",
        choices: ["ドント フォゲット メイリング ディス レター", "ドント フォゲット トゥー メイル ディス レター"],
        answer: "ドント フォゲット トゥー メイル ディス レター",
        why: "これからすること、手紙を出す、を忘れないで、なので、フォゲット トゥー。",
      },
    },
  },
};
