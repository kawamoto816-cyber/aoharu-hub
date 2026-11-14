import type { UnitBase } from "../types";

// 止まる授業：夏休みにしたこと（過去の形・It was 〜.）（小5・6外国語）の共通の骨組み（問題）。事実・例文は lib/lecture/data/e-english-56-kako.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 I went to the park. →「アイ ウェント トゥー ザ パーク」）。ed は「イーディー」。
// せりふはキャストごと：e-english-56-kako.e-pop.ts（ポップ掛け合い）・e-english-56-kako.e-yasashi.ts（やさしい先生と生徒）。
// 読み：「形」は「かたち」と開く。助詞の「は」が前の語にくっつく所は「わ」と書く。最後の問題（check:2）は記述（自分で言ってみる）。

export const E_KAKO_BASE: UnitBase = {
  unitId: "e-english-56-kako",
  pauses: {
    "mistake:0": {
      question: "{seito}の言《い》ったこと。「きのう公園《こうえん》に行《い》った」は？",
      choices: ["I goed to the park yesterday.", "I went to the park yesterday."],
      answer: "I went to the park yesterday.",
      why: "go は ed をつけず、went に形が変わります。",
      say: {
        question: "{seito}の言ったこと。きのう、公園にいった、わ？",
        choices: ["アイ ゴード トゥー ザ パーク イエスタデイ", "アイ ウェント トゥー ザ パーク イエスタデイ"],
        answer: "アイ ウェント トゥー ザ パーク イエスタデイ",
        why: "ゴーわ、イーディーをつけず、ウェントに、かたちが変わります。",
      },
    },
    "mistake:2": {
      question: "{seito}の言《い》ったこと。「この前《まえ》の日曜日《にちようび》、つりを楽《たの》しんだ」は？",
      choices: ["I enjoy fishing last Sunday.", "I enjoyed fishing last Sunday."],
      answer: "I enjoyed fishing last Sunday.",
      why: "last Sunday（この前の日曜日）のことなので、enjoy に ed をつけます。",
      say: {
        question: "{seito}の言ったこと。このまえの、にちようび、つりを楽しんだ、わ？",
        choices: ["アイ エンジョイ フィッシング ラスト サンデー", "アイ エンジョイド フィッシング ラスト サンデー"],
        answer: "アイ エンジョイド フィッシング ラスト サンデー",
        why: "ラスト サンデー、このまえの、にちようびの、ことなので、エンジョイに、イーディーをつけます。",
      },
    },
    "check:0": {
      question: "see の過去《かこ》の形《かたち》は？",
      choices: ["seed", "saw"],
      answer: "saw",
      why: "see は形が変わる言葉。seed とは言わない。",
      say: {
        question: "シーの、かこの、かたちわ？",
        choices: ["シード", "ソー"],
        answer: "ソー",
        why: "シーわ、かたちが変わる言葉。シードとわ、言わない。",
      },
    },
    "mistake:1": {
      question: "{seito}の言《い》ったこと。きのうの話《はなし》で「楽《たの》しかった」と言《い》うなら？",
      choices: ["（きのうの話で）It is fun.", "It was fun."],
      answer: "It was fun.",
      why: "すんだことの感想なので、is ではなく was を使います。",
      say: {
        question: "{seito}の言ったこと。きのうの話で、楽しかった、と言うなら？",
        choices: ["イット イズ ファン", "イット ワズ ファン"],
        answer: "イット ワズ ファン",
        why: "すんだことの、かんそうなので、イズでわなく、ワズを使います。",
      },
    },
    "check:2": {
      question: "How was the festival? に「楽《たの》しかった」と答《こた》えると？",
      answer: "It was fun.",
      why: "すんだことの感想は It was 〜. で言う。",
      say: {
        question: "ハウ ワズ ザ フェスティバル？に、楽しかった、と、答えると？",
        answer: "イット ワズ ファン",
        why: "すんだことの、かんそうわ、イット ワズ なになに、で言う。",
      },
    },
  },
};
