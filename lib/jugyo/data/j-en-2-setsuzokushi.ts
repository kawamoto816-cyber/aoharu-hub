import type { UnitBase } from "../types";

// 止まる授業：接続詞（中2・英語）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/j-en-2-setsuzokushi.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 If it rains tomorrow →「イフ イット レインズ トゥモロー」）。
// 詩・独立宣言は lecture にある短い句だけを引き、作者・起草者のせりふは作らない。
// せりふはキャストごと：j-en-2-setsuzokushi.j-dark.ts（ダーク解説）・j-en-2-setsuzokushi.j-kisaku.ts（気さくな兄・姉）。

export const J_SETSUZOKUSHI_BASE: UnitBase = {
  unitId: "j-en-2-setsuzokushi",
  pauses: {
    "check:0": {
      question: "I like dogs, ___ my sister likes cats. の ___ に入る接続詞は？",
      choices: ["so", "but"],
      answer: "but",
      why: "「私は犬が好き、しかし姉はねこが好き」と対比している。",
      say: {
        question: "アイ ライク ドッグズ、くうらん、マイ シスター ライクス キャッツ。くうらんに入る、接続詞は？",
        choices: ["ソー", "バット"],
        answer: "バット",
        why: "わたしは、いぬが好き、しかし、姉は、ねこが好き、と、対比している。",
      },
    },
    "check:1": {
      question: "「もし時間があれば、私の家に来てください」を if を使って英語に。",
      choices: ["If you have time please come to my house.", "If you have time, please come to my house."],
      answer: "If you have time, please come to my house.",
      why: "if のまとまりを前に置くのでコンマを入れる。",
      say: {
        question: "もし、時間があれば、わたしのいえに、来てください、を、イフを使って、英語に。",
        choices: ["イフ ユー ハブ タイム、コンマなしで、プリーズ カム トゥ マイ ハウス", "イフ ユー ハブ タイム、コンマ、プリーズ カム トゥ マイ ハウス"],
        answer: "イフ ユー ハブ タイム、コンマ、プリーズ カム トゥ マイ ハウス",
        why: "イフの、まとまりを、まえに置くので、コンマを入れる。",
      },
    },
    "mistake:1": {
      question: "{seito}の「Because I was hungry, so I ate a sandwich.」。正しいのはどちら？",
      choices: ["Because I was hungry, so I ate a sandwich.", "Because I was hungry, I ate a sandwich.（または I was hungry, so I ate a sandwich.）"],
      answer: "Because I was hungry, I ate a sandwich.（または I was hungry, so I ate a sandwich.）",
      why: "because と so は1つの文でどちらか一方だけを使います。",
      say: {
        question: "{seito}の、ビコーズ アイ ワズ ハングリー、ソー アイ エイト ア サンドイッチ。正しいのはどちら？",
        choices: ["ビコーズ アイ ワズ ハングリー、ソー アイ エイト ア サンドイッチ", "ビコーズ アイ ワズ ハングリー、アイ エイト ア サンドイッチ。または、アイ ワズ ハングリー、ソー アイ エイト ア サンドイッチ"],
        answer: "ビコーズ アイ ワズ ハングリー、アイ エイト ア サンドイッチ。または、アイ ワズ ハングリー、ソー アイ エイト ア サンドイッチ",
        why: "ビコーズと、ソーは、ひとつの文で、どちらか一方だけを使います。",
      },
    },
    "mistake:0": {
      question: "{seito}の「If it will be sunny tomorrow, we will go to the sea.」。正しいのはどちら？",
      choices: ["If it will be sunny tomorrow, we will go to the sea.", "If it is sunny tomorrow, we will go to the sea."],
      answer: "If it is sunny tomorrow, we will go to the sea.",
      why: "if のまとまりの中は、未来のことでも現在形にします。",
      say: {
        question: "{seito}の、イフ イット ウィル ビー サニー トゥモロー、ウィー ウィル ゴー トゥ ザ シー。正しいのはどちら？",
        choices: ["イフ イット ウィル ビー サニー トゥモロー、ウィー ウィル ゴー トゥ ザ シー", "イフ イット イズ サニー トゥモロー、ウィー ウィル ゴー トゥ ザ シー"],
        answer: "イフ イット イズ サニー トゥモロー、ウィー ウィル ゴー トゥ ザ シー",
        why: "イフの、まとまりの、なかは、未来のことでも、げんざいけいにします。",
      },
    },
  },
};
