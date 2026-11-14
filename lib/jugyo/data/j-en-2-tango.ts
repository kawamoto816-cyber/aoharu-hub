import type { UnitBase } from "../types";

// 止まる授業：中2の英単語（中2・英語）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/j-en-2-tango.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 I bought a new bag. →「アイ ボート ア ニュー バッグ」）。
// 『アリス』の原文は lecture にある短い句だけを引き、作者・登場人物のせりふは作らない。
// せりふはキャストごと：j-en-2-tango.j-dark.ts（ダーク解説）・j-en-2-tango.j-kisaku.ts（気さくな兄・姉）。

export const J_TANGO2_BASE: UnitBase = {
  unitId: "j-en-2-tango",
  pauses: {
    "mistake:0": {
      question: "{seito}の「I buyed a new bag.」。正しいのはどちら？",
      choices: ["I buyed a new bag.", "I bought a new bag."],
      answer: "I bought a new bag.",
      why: "buy は不規則動詞（buy - bought - bought）。-ed はつけません。",
      say: {
        question: "{seito}の、アイ バイド ア ニュー バッグ。正しいのはどちら？",
        choices: ["アイ バイド ア ニュー バッグ", "アイ ボート ア ニュー バッグ"],
        answer: "アイ ボート ア ニュー バッグ",
        why: "バイは、不規則動詞。バイ、ボート、ボート。イーディーは、つけません。",
      },
    },
    "check:1": {
      question: "useful の意味と、もとの語は？",
      answer: "役に立つ／use",
      why: "use（使う）＋ -ful で形容詞になる。",
      say: {
        question: "ユースフルの、意味と、もとのごは？",
        answer: "役に立つ、ユーズ",
        why: "ユーズ、使う、に、フルをつけて、形容詞になる。",
      },
    },
    "mistake:2": {
      question: "{seito}の「（さがしている）I'm looking at my key.」。正しいのはどちら？",
      choices: ["（さがしている）I'm looking at my key.", "I'm looking for my key."],
      answer: "I'm looking for my key.",
      why: "look at は「見る」、look for は「さがす」。熟語はかたまりで意味が決まります。",
      say: {
        question: "{seito}の、さがしているときの、アイム ルッキング アット マイ キー。正しいのはどちら？",
        choices: ["さがしているときの、アイム ルッキング アット マイ キー", "アイム ルッキング フォー マイ キー"],
        answer: "アイム ルッキング フォー マイ キー",
        why: "ルック アットは、見る。ルック フォーは、さがす。熟語は、かたまりで、意味が決まります。",
      },
    },
    "mistake:3": {
      question: "{seito}の「This is gooder than that.」。正しいのはどちら？",
      choices: ["This is gooder than that.", "This is better than that."],
      answer: "This is better than that.",
      why: "good は good - better - best と不規則に変わります。",
      say: {
        question: "{seito}の、ディス イズ グッダー ザン ザット。正しいのはどちら？",
        choices: ["ディス イズ グッダー ザン ザット", "ディス イズ ベター ザン ザット"],
        answer: "ディス イズ ベター ザン ザット",
        why: "グッドは、グッド、ベター、ベストと、不規則に変わります。",
      },
    },
  },
};
