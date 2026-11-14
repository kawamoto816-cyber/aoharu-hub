import type { UnitBase } from "../types";

// 止まる授業：英作文（中2・英語）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/j-en-2-eisakubun.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 If it rains tomorrow →「イフ イット レインズ トゥモロー」）。
// 手紙・小説・評論の英文は lecture にある部分だけを引き、リンカーン・グレース・トウェインらのせりふは作らない。
// グレースの手紙の2つめの理由は、性別で好みを決めつけない言い方（「ひげのほうが好まれて票がふえる」）にする。
// せりふはキャストごと：j-en-2-eisakubun.j-dark.ts（ダーク解説）・j-en-2-eisakubun.j-kisaku.ts（気さくな兄・姉）。

export const J_EISAKUBUN2_BASE: UnitBase = {
  unitId: "j-en-2-eisakubun",
  pauses: {
    "mistake:0": {
      question: "{seito}の「If it will rain tomorrow, I will stay home.」。正しいのはどちら？",
      choices: ["If it will rain tomorrow, I will stay home.", "If it rains tomorrow, I will stay home."],
      answer: "If it rains tomorrow, I will stay home.",
      why: "if（もし〜なら）のあとは、未来のことでも現在形を使います。",
      say: {
        question: "{seito}の、イフ イット ウィル レイン トゥモロー、アイ ウィル ステイ ホーム。正しいのはどちら？",
        choices: ["イフ イット ウィル レイン トゥモロー、アイ ウィル ステイ ホーム", "イフ イット レインズ トゥモロー、アイ ウィル ステイ ホーム"],
        answer: "イフ イット レインズ トゥモロー、アイ ウィル ステイ ホーム",
        why: "イフ、もし、なになになら、のあとは、未来のことでも、げんざいけいを使います。",
      },
    },
    "mistake:1": {
      question: "{seito}の「I went to the library to studied.」。正しいのはどちら？",
      choices: ["I went to the library to studied.", "I went to the library to study."],
      answer: "I went to the library to study.",
      why: "to のあとはいつも動詞の原形です。",
      say: {
        question: "{seito}の、アイ ウェント トゥー ザ ライブラリー トゥー スタディード。正しいのはどちら？",
        choices: ["アイ ウェント トゥー ザ ライブラリー トゥー スタディード", "アイ ウェント トゥー ザ ライブラリー トゥー スタディ"],
        answer: "アイ ウェント トゥー ザ ライブラリー トゥー スタディ",
        why: "トゥーのあとは、いつも、動詞の、げんけいです。",
      },
    },
    "check:2": {
      question: "意見文で理由を2つ並べるとき、それぞれの文の最初に置くことばは？",
      choices: ["I think 〜. / So, 〜.", "First, 〜. / Second, 〜."],
      answer: "First, 〜. / Second, 〜.",
      why: "順番を示すことばで、読む人に理由の数が伝わる。",
      say: {
        question: "意見文で、理由を、ふたつ並べるとき、それぞれの文の、最初に置く、ことばは？",
        choices: ["アイ シンク、なになに。ソー、なになに", "ファースト、なになに。セカンド、なになに"],
        answer: "ファースト、なになに。セカンド、なになに",
        why: "順番を示すことばで、読むひとに、理由のかずが、つたわる。",
      },
    },
    "mistake:2": {
      question: "{seito}の「I like summer. Because I can swim.」。正しいのはどちら？",
      choices: ["I like summer. Because I can swim.", "I like summer because I can swim."],
      answer: "I like summer because I can swim.",
      why: "because は文と文をつなぐ語。英作文では because だけの文にしません。",
      say: {
        question: "{seito}の、アイ ライク サマー。ビコーズ アイ キャン スイム。正しいのはどちら？",
        choices: ["アイ ライク サマー。ビコーズ アイ キャン スイム", "アイ ライク サマー ビコーズ アイ キャン スイム"],
        answer: "アイ ライク サマー ビコーズ アイ キャン スイム",
        why: "ビコーズは、文と文を、つなぐご。英作文では、ビコーズだけの文に、しません。",
      },
    },
  },
};
