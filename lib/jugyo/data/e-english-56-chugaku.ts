import type { UnitBase } from "../types";

// 止まる授業：中学校でしたいこと（I want to 〜.）（小5・6外国語）の共通の骨組み（問題）。事実・例文・年は lib/lecture/data/e-english-56-chugaku.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 I want to join the soccer team. →「アイ ウォント トゥー ジョイン ザ サッカー チーム」、
// the は母音の前で「ジ」、s →「エス」）。スティーヴンソンの詩は本文にあるが、英語の詩そのものは読み上げず、本文の日本語の説明だけを使う。
// せりふはキャストごと：e-english-56-chugaku.e-pop.ts（ポップ掛け合い）・e-english-56-chugaku.e-yasashi.ts（やさしい先生と生徒）。
// 読み：「形」「後ろ」は say でひらがなに開く（かたち・うしろ）。助詞の「は」が前の語にくっつく所は「わ」と書く。

export const CHUGAKU_BASE: UnitBase = {
  unitId: "e-english-56-chugaku",
  pauses: {
    "check:2": {
      question: "I want to ___ the sports festival.（体育祭《たいいくさい》を楽《たの》しみたい）の ___ に入《はい》るのは？",
      choices: ["enjoy", "join"],
      answer: "enjoy",
      why: "行事を楽しむは enjoy。",
      say: {
        question: "アイ ウォント トゥー、なになに、ザ スポーツ フェスティバル。体育祭を楽しみたい。の、なになにに、入るのは？",
        choices: ["エンジョイ", "ジョイン"],
        answer: "エンジョイ",
        why: "行事を楽しむわ、エンジョイ。",
      },
    },
    "mistake:1": {
      question: "{seito}の言《い》ったこと。「友《とも》だちをたくさん作《つく》りたい」は、どちら？",
      choices: ["I want to make many friend.", "I want to make many friends."],
      answer: "I want to make many friends.",
      why: "many（たくさんの）のあとは、s のついた形にします。",
      say: {
        question: "{seito}の言ったこと。友だちを、たくさん作りたい、は、どちら？",
        choices: ["アイ ウォント トゥー メイク メニー フレンド", "アイ ウォント トゥー メイク メニー フレンズ"],
        answer: "アイ ウォント トゥー メイク メニー フレンズ",
        why: "メニー、たくさんの、のあとは、エスのついた、かたちにします。",
      },
    },
    "check:0": {
      question: "「美術部《びじゅつぶ》に入《はい》りたい」を英語《えいご》で言《い》うと？",
      choices: ["I want to join the art club.", "I want to join to the art club."],
      answer: "I want to join the art club.",
      why: "部活に入るは join。美術部は art club。",
      say: {
        question: "美術部に、入りたい、を、英語で言うと？",
        choices: ["アイ ウォント トゥー ジョイン ジ アート クラブ", "アイ ウォント トゥー ジョイン トゥー ジ アート クラブ"],
        answer: "アイ ウォント トゥー ジョイン ジ アート クラブ",
        why: "部活に入るわ、ジョイン。美術部わ、アート クラブ。",
      },
    },
    "check:1": {
      question: "入《はい》りたい部活《ぶかつ》をたずねる文《ぶん》は？",
      choices: ["What club do you want to join?", "What do you want to do in junior high school?"],
      answer: "What club do you want to join?",
      why: "「どの部活に」なので What club で始める。",
      say: {
        choices: ["ワット クラブ ドゥー ユー ウォント トゥー ジョイン？", "ワット ドゥー ユー ウォント トゥー ドゥー イン ジュニア ハイ スクール？"],
        answer: "ワット クラブ ドゥー ユー ウォント トゥー ジョイン？",
        why: "どの部活に、なので、ワット クラブで始める。",
      },
    },
    "mistake:0": {
      question: "{seito}の言《い》ったこと。「サッカー部《ぶ》に入《はい》りたい」は、どちら？",
      choices: ["I want to join to the soccer team.", "I want to join the soccer team."],
      answer: "I want to join the soccer team.",
      why: "join は「〜に入る」の意味なので、後ろに to はいりません。",
      say: {
        question: "{seito}の言ったこと。サッカー部に、入りたい、は、どちら？",
        choices: ["アイ ウォント トゥー ジョイン トゥー ザ サッカー チーム", "アイ ウォント トゥー ジョイン ザ サッカー チーム"],
        answer: "アイ ウォント トゥー ジョイン ザ サッカー チーム",
        why: "ジョインは、に、入る、の意味なので、うしろに、トゥーは、いりません。",
      },
    },
  },
};
