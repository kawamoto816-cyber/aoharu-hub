import type { UnitBase } from "../types";

// 止まる授業：現在完了（中3・英語）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/j-en-3-kanryo.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 have lived →「ハブ リブド」、since 2020 →「シンス トゥエンティ トゥエンティ」）。
// リンカーンの別れのあいさつ・『ハムレット』の英文は本文にある部分だけを引き、実在の人物や登場人物のせりふは作らない。
// せりふはキャストごと：j-en-3-kanryo.j-dark.ts（ダーク解説）・j-en-3-kanryo.j-kisaku.ts（気さくな兄・姉）。

export const KANRYO_BASE: UnitBase = {
  unitId: "j-en-3-kanryo",
  pauses: {
    "mistake:1": {
      question: "{seito}の「She have lived here since 2020.」。正しいのはどちら？",
      choices: ["She have lived here since 2020.", "She has lived here since 2020."],
      answer: "She has lived here since 2020.",
      why: "主語が3人称単数なので has を使います。",
      say: {
        question: "{seito}の、シー ハブ リブド ヒア シンス トゥエンティ トゥエンティ。正しいのはどちら？",
        choices: ["シー ハブ リブド ヒア シンス トゥエンティ トゥエンティ", "シー ハズ リブド ヒア シンス トゥエンティ トゥエンティ"],
        answer: "シー ハズ リブド ヒア シンス トゥエンティ トゥエンティ",
        why: "主語が、3人称単数なので、ハズを使います。",
      },
    },
    "mistake:0": {
      question: "{seito}の「I have visited Kyoto last year.」。正しいのはどちら？",
      choices: ["I have visited Kyoto last year.", "I visited Kyoto last year."],
      answer: "I visited Kyoto last year.",
      why: "last year のようにはっきり過去を示すことばがあるときは、現在完了ではなく過去形を使います。",
      say: {
        question: "{seito}の、アイ ハブ ビジテッド キョウト ラスト イヤー。正しいのはどちら？",
        choices: ["アイ ハブ ビジテッド キョウト ラスト イヤー", "アイ ビジテッド キョウト ラスト イヤー"],
        answer: "アイ ビジテッド キョウト ラスト イヤー",
        why: "ラスト イヤーのように、はっきり過去を示すことばがあるときは、現在完了ではなく、過去形を使います。",
      },
    },
    "mistake:2": {
      question: "{seito}の「I have lived here since three years.」。正しいのはどちら？",
      choices: ["I have lived here since three years.", "I have lived here for three years."],
      answer: "I have lived here for three years.",
      why: "three years は期間なので for。since のあとには始まった時点を置きます。",
      say: {
        question: "{seito}の、アイ ハブ リブド ヒア シンス スリー イヤーズ。正しいのはどちら？",
        choices: ["アイ ハブ リブド ヒア シンス スリー イヤーズ", "アイ ハブ リブド ヒア フォー スリー イヤーズ"],
        answer: "アイ ハブ リブド ヒア フォー スリー イヤーズ",
        why: "スリー イヤーズは、期間なので、フォー。シンスのあとには、始まった時点を置きます。",
      },
    },
    "check:0": {
      question: "I have ___ to Hokkaido twice.（2回行ったことがある）の ___ に入る語は？",
      choices: ["been", "gone"],
      answer: "been",
      why: "経験の「行ったことがある」は have been to 〜。",
      say: {
        question: "アイ ハブ、くうしょ、トゥ ホッカイドウ トワイス。2回、いったことがある、の、くうしょに入るごわ？",
        choices: ["ビーン", "ゴーン"],
        answer: "ビーン",
        why: "経験の、いったことがある、は、ハブ ビーン トゥ。",
      },
    },
  },
};
