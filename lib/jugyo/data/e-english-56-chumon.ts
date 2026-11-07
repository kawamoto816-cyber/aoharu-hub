import type { UnitBase } from "../types";

// 止まる授業：注文と値段（What would you like?）（小5・6外国語）の共通の骨組み（問題）。事実・例文・数は lib/lecture/data/e-english-56-chumon.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 I'd like a hamburger. →「アイド ライク ア ハンバーガー」、pizza →「ピーツァ」、
// yen →「イェン」、s →「エス」、〜 →「なになに」）。マザーグースの歌は本文にあるが、歌そのものは読み上げない。
// せりふはキャストごと：e-english-56-chumon.e-pop.ts（ポップ掛け合い）・e-english-56-chumon.e-yasashi.ts（やさしい先生と生徒）。
// 読み：「音」は say で「おと」に開く。助詞の「は」が前の語にくっつく所は「わ」と書く。

export const CHUMON_BASE: UnitBase = {
  unitId: "e-english-56-chumon",
  pauses: {
    "mistake:0": {
      question: "{seito}の言《い》ったこと。ハンバーガーを注文《ちゅうもん》するときは？",
      choices: ["注文で I like a hamburger. と言う。", "I'd like a hamburger."],
      answer: "I'd like a hamburger.",
      why: "I like は「〜が好き」。注文の「〜をください」は I'd like です。",
      say: {
        choices: ["注文で、アイ ライク ア ハンバーガー。と言う", "アイド ライク ア ハンバーガー"],
        answer: "アイド ライク ア ハンバーガー",
        why: "アイ ライクわ、なになにが好き。注文の、なになにをください、わ、アイド ライクです。",
      },
    },
    "check:0": {
      question: "「ピザをください」をていねいに言《い》うと？",
      choices: ["I'd like pizza, please.", "I want pizza!"],
      answer: "I'd like pizza, please.",
      why: "注文は I'd like 〜, please.",
      say: {
        choices: ["アイド ライク ピーツァ、プリーズ", "アイ ウォント ピーツァ！"],
        answer: "アイド ライク ピーツァ、プリーズ",
        why: "注文わ、アイド ライク、なになに、プリーズ。",
      },
    },
    "mistake:1": {
      question: "{seito}の言《い》ったこと。値段《ねだん》をたずねる文《ぶん》は？",
      choices: ["How many is it?", "How much is it?"],
      answer: "How much is it?",
      why: "値段《ねだん》をたずねるときは How much。How many は数をたずねます。",
      say: {
        choices: ["ハウ メニー イズ イット？", "ハウ マッチ イズ イット？"],
        answer: "ハウ マッチ イズ イット？",
        why: "ねだんを、たずねるときは、ハウ マッチ。ハウ メニーわ、かずを、たずねます。",
      },
    },
    "check:2": {
      question: "｜300円《さんびゃくえん》を英語《えいご》で言《い》うと？",
      choices: ["three hundred yens", "three hundred yen"],
      answer: "three hundred yen",
      why: "yen には s をつけない。",
      say: {
        choices: ["スリー ハンドレッド イェンズ", "スリー ハンドレッド イェン"],
        answer: "スリー ハンドレッド イェン",
        why: "イェンには、エスを、つけない。",
      },
    },
    "mistake:2": {
      question: "{seito}の言《い》ったこと。オレンジジュースを注文《ちゅうもん》するときは？",
      choices: ["I'd like a orange juice.", "I'd like an orange juice."],
      answer: "I'd like an orange juice.",
      why: "orange のように a・i・u・e・o の音で始まる言葉の前は an です。",
      say: {
        choices: ["アイド ライク ア オレンジ ジュース", "アイド ライク アン オレンジ ジュース"],
        answer: "アイド ライク アン オレンジ ジュース",
        why: "オレンジのように、ア、イ、ウ、エ、オの、おとで始まる言葉の前わ、アンです。",
      },
    },
  },
};
