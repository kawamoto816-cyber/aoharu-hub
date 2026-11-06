import type { UnitBase } from "../types";

// 止まる授業：関係代名詞（中3・英語）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/j-en-3-kankei.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 who →「フー」、which →「ウィッチ」、that →「ザット」）。
// 『幸福な王子』の英文は本文にある部分だけを引き、実在の人物のせりふは作らない。
// せりふはキャストごと：j-en-3-kankei.j-dark.ts（ダーク解説）・j-en-3-kankei.j-kisaku.ts（気さくな兄・姉）。

export const KANKEI_BASE: UnitBase = {
  unitId: "j-en-3-kankei",
  pauses: {
    "mistake:0": {
      question: "{seito}の「I have a dog who runs fast.」。正しいのはどちら？",
      choices: ["I have a dog who runs fast.", "I have a dog which (that) runs fast."],
      answer: "I have a dog which (that) runs fast.",
      why: "先行詞が動物（もの）のときは which か that を使います。",
      say: {
        question: "{seito}の、アイ ハブ ア ドッグ フー ランズ ファスト。正しいのはどちら？",
        choices: ["アイ ハブ ア ドッグ フー ランズ ファスト", "アイ ハブ ア ドッグ ウィッチ、または ザット、ランズ ファスト"],
        answer: "アイ ハブ ア ドッグ ウィッチ、または ザット、ランズ ファスト",
        why: "先行詞が、動物、つまり、もののときは、ウィッチか、ザットを使います。",
      },
    },
    "check:2": {
      question: "The movie that I saw yesterday was interesting. で省略できる語は？",
      choices: ["that", "was"],
      answer: "that",
      why: "that のあとが主語＋動詞（I saw）なので目的格。目的格は省略できる。",
      say: {
        question: "ザ ムービー ザット アイ ソー イエスタデイ ワズ インタレスティング。で、省略できるごは？",
        choices: ["ザット", "ワズ"],
        answer: "ザット",
        why: "ザットのあとが、主語たす動詞、アイ ソー、なので、目的格。目的格は、省略できる。",
      },
    },
    "mistake:2": {
      question: "{seito}の「The girl who live next door is kind.」。正しいのはどちら？",
      choices: ["The girl who live next door is kind.", "The girl who lives next door is kind."],
      answer: "The girl who lives next door is kind.",
      why: "主格の関係代名詞のあとの動詞は先行詞（the girl＝3人称単数）に合わせて -s がつきます。",
      say: {
        question: "{seito}の、ザ ガール フー リブ ネクスト ドア イズ カインド。正しいのはどちら？",
        choices: ["ザ ガール フー リブ ネクスト ドア イズ カインド", "ザ ガール フー リブズ ネクスト ドア イズ カインド"],
        answer: "ザ ガール フー リブズ ネクスト ドア イズ カインド",
        why: "主格の関係代名詞のあとの動詞は、先行詞、ザ ガール、さんにんしょう単数、に合わせて、エスがつきます。",
      },
    },
    "check:1": {
      question: "the man who is standing there の意味は？",
      choices: ["そこに立っている男の人", "そこに立っているのはだれ？"],
      answer: "そこに立っている男の人",
      why: "who is standing there が the man をうしろから説明している。",
      say: {
        question: "ザ マン フー イズ スタンディング ゼア。の意味は？",
        choices: ["そこに立っている、おとこのひと", "そこに立っているのは、だれ？"],
        answer: "そこに立っている、おとこのひと",
        why: "フー イズ スタンディング ゼアが、ザ マンを、うしろから説明している。",
      },
    },
  },
};
