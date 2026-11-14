import type { UnitBase } from "../types";

// 止まる授業：英作文（中3・英語）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/j-en-3-eisakubun.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 I like summer →「アイ ライク サマー」）。
// 独立宣言・ヘレン・ケラーの自伝・フランクリンの自伝は lecture に引かれた部分だけを使い、人物のせりふは作らない。
// 助詞の「は」は say で「わ」にする。答え（answer）は lecture の文のまま、読みは say.answer で直す。
// せりふはキャストごと：j-en-3-eisakubun.j-dark.ts（ダーク解説）・j-en-3-eisakubun.j-kisaku.ts（気さくな兄・姉）。

export const J_EISAKUBUN3_BASE: UnitBase = {
  unitId: "j-en-3-eisakubun",
  pauses: {
    "check:0": {
      question: "意見文で、理由を2つ並べるときの書き出しの語は？",
      choices: ["I think … / So, …", "First, … / Second, …", "Because … / Because …"],
      answer: "First, … / Second, …",
      why: "番号をつけると理由の区切りがはっきりする。",
      say: {
        question: "意見文で、理由を、ふたつ並べるときの、書き出しの、ごわ？",
        choices: ["アイ シンク、なになに。ソー、なになに", "ファースト、なになに。セカンド、なになに", "ビコーズ、なになに。ビコーズ、なになに"],
        answer: "ファースト、なになに。セカンド、なになに",
        why: "番号をつけると、理由の、区切りが、はっきりする。",
      },
    },
    "mistake:3": {
      question: "{seito}の「It is important to studying English.」。正しいのはどちら？",
      choices: ["It is important to studying English.", "It is important to study English."],
      answer: "It is important to study English.",
      why: "It is 〜 to のあとは動詞の原形です。",
      say: {
        question: "{seito}の、イット イズ インポータント トゥー スタディイング イングリッシュ。正しいのはどちら？",
        choices: ["イット イズ インポータント トゥー スタディイング イングリッシュ", "イット イズ インポータント トゥー スタディ イングリッシュ"],
        answer: "イット イズ インポータント トゥー スタディ イングリッシュ",
        why: "イット イズ なになに トゥーの、あとわ、動詞の、げんけいです。",
      },
    },
    "mistake:0": {
      question: "{seito}の「I like summer. Because I can swim.」。正しいのはどちら？",
      choices: ["I like summer. Because I can swim.", "I like summer because I can swim."],
      answer: "I like summer because I can swim.",
      why: "because だけの文は不完全。前の文とつなげて1文にします。",
      say: {
        question: "{seito}の、アイ ライク サマー。ビコーズ アイ キャン スイム。正しいのはどちら？",
        choices: ["アイ ライク サマー。ビコーズ アイ キャン スイム", "アイ ライク サマー ビコーズ アイ キャン スイム"],
        answer: "アイ ライク サマー ビコーズ アイ キャン スイム",
        why: "ビコーズだけの文わ、ふかんぜん。まえの文と、つなげて、いちぶんにします。",
      },
    },
  },
};
