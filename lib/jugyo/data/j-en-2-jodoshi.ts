import type { UnitBase } from "../types";

// 止まる授業：助動詞（中2・英語）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/j-en-2-jodoshi.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 must not →「マスト ノット」、have to →「ハフ トゥ」）。
// ルーズベルト大統領の言葉は lecture にある演説の英文だけを引き、せりふは作らない。
// せりふはキャストごと：j-en-2-jodoshi.j-dark.ts（ダーク解説）・j-en-2-jodoshi.j-kisaku.ts（気さくな兄・姉）。

export const JODOSHI_BASE: UnitBase = {
  unitId: "j-en-2-jodoshi",
  pauses: {
    "mistake:0": {
      question: "{seito}の「He musts go home.」。正しいのはどちら？",
      choices: ["He musts go home.", "He must go home."],
      answer: "He must go home.",
      why: "助動詞には -s をつけません。あとの動詞も原形です。",
      say: {
        question: "{seito}の、ヒー マスツ ゴー ホーム。正しいのはどちら？",
        choices: ["ヒー マスツ ゴー ホーム", "ヒー マスト ゴー ホーム"],
        answer: "ヒー マスト ゴー ホーム",
        why: "助動詞には、エスをつけません。あとの動詞も、原形です。",
      },
    },
    "mistake:1": {
      question: "「明日は来なくていい」と言いたいとき、{seito}の「You must not come tomorrow.」。正しいのはどちら？",
      choices: ["You must not come tomorrow.", "You don't have to come tomorrow."],
      answer: "You don't have to come tomorrow.",
      why: "「明日は来なくていい」と言いたいとき。must not は「来てはいけない」という禁止で、「必要はない」は don't have to です。",
      say: {
        question: "あしたは来なくていい、と言いたいとき、{seito}の、ユー マスト ノット カム トゥモロー。正しいのはどちら？",
        choices: ["ユー マスト ノット カム トゥモロー", "ユー ドント ハフ トゥ カム トゥモロー"],
        answer: "ユー ドント ハフ トゥ カム トゥモロー",
        why: "あしたは来なくていい、と言いたいとき。マスト ノットは、来てはいけない、という禁止で、必要はない、は、ドント ハフ トゥです。",
      },
    },
    "mistake:3": {
      question: "{seito}の「I musted finish my homework yesterday.」。正しいのはどちら？",
      choices: ["I musted finish my homework yesterday.", "I had to finish my homework yesterday."],
      answer: "I had to finish my homework yesterday.",
      why: "must には過去形がないので、過去は had to で表します。",
      say: {
        question: "{seito}の、アイ マステッド フィニッシュ マイ ホームワーク イエスタデイ。正しいのはどちら？",
        choices: ["アイ マステッド フィニッシュ マイ ホームワーク イエスタデイ", "アイ ハッド トゥ フィニッシュ マイ ホームワーク イエスタデイ"],
        answer: "アイ ハッド トゥ フィニッシュ マイ ホームワーク イエスタデイ",
        why: "マストには、過去形がないので、過去は、ハッド トゥで表します。",
      },
    },
    "check:2": {
      question: "You ___ go to bed early.（早く寝たほうがいい）の ___ に入る助動詞は？",
      choices: ["should", "must"],
      answer: "should",
      why: "「〜したほうがよい」というアドバイスは should。",
      say: {
        question: "ユー、なになに、ゴー トゥ ベッド アーリー。早く寝たほうがいい、の、なになにに、入る助動詞は？",
        choices: ["シュッド", "マスト"],
        answer: "シュッド",
        why: "したほうがよい、というアドバイスは、シュッド。",
      },
    },
  },
};
