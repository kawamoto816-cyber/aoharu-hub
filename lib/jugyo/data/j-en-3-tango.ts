import type { UnitBase } from "../types";

// 止まる授業：中3の英単語（中3・英語）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/j-en-3-tango.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 She speaks English very well. →「シー スピークス イングリッシュ ベリー ウェル」）。
// 『ロビンソン・クルーソー』の原文は lecture にある短い句だけを引き、作者・登場人物のせりふは作らない。
// せりふはキャストごと：j-en-3-tango.j-dark.ts（ダーク解説）・j-en-3-tango.j-kisaku.ts（気さくな兄・姉）。

export const J_TANGO3_BASE: UnitBase = {
  unitId: "j-en-3-tango",
  pauses: {
    "check:2": {
      question: "possible に un- ではなく im- がついた語は？",
      answer: "impossible（不可能な）",
      why: "im- も「〜でない」の意味。p の前ではふつう im- になる。",
      say: {
        question: "ポッシブルに、アンではなく、イムがついた、ごは？",
        answer: "インポッシブル、不可能な",
        why: "イムも、なになにでない、の意味。ピーのまえでは、ふつう、イムになる。",
      },
    },
    "mistake:1": {
      question: "{seito}の「She speaks English very good.」。正しいのはどちら？",
      choices: ["She speaks English very good.", "She speaks English very well."],
      answer: "She speaks English very well.",
      why: "動詞 speaks を説明するのは副詞の well。good は形容詞です。",
      say: {
        question: "{seito}の、シー スピークス イングリッシュ ベリー グッド。正しいのはどちら？",
        choices: ["シー スピークス イングリッシュ ベリー グッド", "シー スピークス イングリッシュ ベリー ウェル"],
        answer: "シー スピークス イングリッシュ ベリー ウェル",
        why: "動詞の、スピークスを、説明するのは、副詞のウェル。グッドは、形容詞です。",
      },
    },
    "mistake:0": {
      question: "{seito}の「I'm looking forward to see you.」。正しいのはどちら？",
      choices: ["I'm looking forward to see you.", "I'm looking forward to seeing you."],
      answer: "I'm looking forward to seeing you.",
      why: "look forward to の to は前置詞。あとは名詞か -ing 形です。",
      say: {
        question: "{seito}の、アイム ルッキング フォワード トゥー シー ユー。正しいのはどちら？",
        choices: ["アイム ルッキング フォワード トゥー シー ユー", "アイム ルッキング フォワード トゥー シーイング ユー"],
        answer: "アイム ルッキング フォワード トゥー シーイング ユー",
        why: "ルック フォワード トゥーの、トゥーは、前置詞。あとは、名詞か、アイエヌジーけいです。",
      },
    },
    "mistake:2": {
      question: "{seito}の「知らない単語が出るたびに読むのをやめる」。正しいのはどちら？",
      choices: ["知らない単語が出るたびに読むのをやめる", "品詞・パーツ・前後から予想して読み進める"],
      answer: "品詞・パーツ・前後から予想して読み進める",
      why: "入試の長文には知らない語が必ずあります。全体の意味をつかむほうが大切です。",
      say: {
        question: "{seito}の、知らない単語が、出るたびに、読むのをやめる。正しいのはどちら？",
        choices: ["知らない単語が、出るたびに、読むのをやめる", "品詞、パーツ、前後から、予想して、読み進める"],
        answer: "品詞、パーツ、前後から、予想して、読み進める",
        why: "入試の長文には、知らないごが、必ずあります。全体の意味を、つかむほうが、大切です。",
      },
    },
  },
};
