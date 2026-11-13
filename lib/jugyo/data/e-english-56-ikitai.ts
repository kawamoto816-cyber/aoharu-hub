import type { UnitBase } from "../types";

// 止まる授業：行きたい国・場所（I want to go to 〜. ＋そこでしたいこと）（小5・6外国語）の共通の骨組み（問題）。事実・例文は lib/lecture/data/e-english-56-ikitai.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 I want to go to Italy. →「アイ ウォント トゥー ゴー トゥー イタリー」）。
// china と China は声では同じなので、選択肢の say は「シーが小文字・大文字」で言い分ける。
// せりふはキャストごと：e-english-56-ikitai.e-pop.ts（ポップ掛け合い）・e-english-56-ikitai.e-yasashi.ts（やさしい先生と生徒）。
// 読み：助詞の「は」が前の語にくっつく所は「わ」と書く。要注意語（上・中・所・人など）は say でひらがなに開く。

export const E_IKITAI_BASE: UnitBase = {
  unitId: "e-english-56-ikitai",
  pauses: {
    "mistake:0": {
      question: "{seito}の言《い》ったこと。「フランスへ行《い》きたい」は？",
      choices: ["I want go to France.", "I want to go to France."],
      answer: "I want to go to France.",
      why: "「〜したい」は want to ＋動作の言葉。to をわすれやすいです。",
      say: {
        question: "{seito}の言ったこと。フランスへ、いきたい、は？",
        choices: ["アイ ウォント ゴー トゥー フランス", "アイ ウォント トゥー ゴー トゥー フランス"],
        answer: "アイ ウォント トゥー ゴー トゥー フランス",
        why: "なになにしたい、わ、ウォント トゥー、たす、動作の言葉。トゥーを、わすれやすいです。",
      },
    },
    "check:1": {
      question: "相手《あいて》の行《い》きたい場所《ばしょ》をたずねる文《ぶん》は？",
      choices: ["I want to go to Italy.", "Where do you want to go?"],
      answer: "Where do you want to go?",
      why: "「どこへ」は Where。",
      say: {
        question: "あいての、いきたい場所を、たずねる文わ？",
        choices: ["アイ ウォント トゥー ゴー トゥー イタリー", "ウェア ドゥー ユー ウォント トゥー ゴー？"],
        answer: "ウェア ドゥー ユー ウォント トゥー ゴー？",
        why: "どこへ、わ、ウェア。",
      },
    },
    "mistake:2": {
      question: "{seito}の言《い》ったこと。「中国《ちゅうごく》へ行《い》きたい」のカードは？",
      choices: ["I want to go to china.", "I want to go to China."],
      answer: "I want to go to China.",
      why: "国の名前は大文字で始めます。",
      say: {
        question: "{seito}の言ったこと。中国へ、いきたい、のカードわ？",
        choices: ["アイ ウォント トゥー ゴー トゥー チャイナ。チャイナの、シーが、小文字", "アイ ウォント トゥー ゴー トゥー チャイナ。チャイナの、シーが、大文字"],
        answer: "アイ ウォント トゥー ゴー トゥー チャイナ。チャイナの、シーが、大文字",
        why: "国のなまえわ、大文字で、はじめます。",
      },
    },
    "check:2": {
      question: "I want to go to Italy. I want to ___ pizza. の ___ に入《はい》るのは？",
      choices: ["see", "eat", "ski"],
      answer: "eat",
      why: "ピザは食べるものなので eat。",
      say: {
        question: "アイ ウォント トゥー ゴー トゥー イタリー。アイ ウォント トゥー、なになに、ピザ。の、なになにに、はいるのわ？",
        choices: ["シー", "イート", "スキー"],
        answer: "イート",
        why: "ピザわ、食べるものなので、イート。",
      },
    },
    "check:0": {
      question: "「カナダへ行《い》きたい」を英語《えいご》で言《い》いましょう。",
      choices: ["I want to go to the Canada.", "I want to go to Canada."],
      answer: "I want to go to Canada.",
      why: "want to go to ＋場所。",
      say: {
        question: "カナダへ、いきたい、を、えいごで、言いましょう。",
        choices: ["アイ ウォント トゥー ゴー トゥー ザ カナダ", "アイ ウォント トゥー ゴー トゥー カナダ"],
        answer: "アイ ウォント トゥー ゴー トゥー カナダ",
        why: "ウォント トゥー ゴー トゥー、たす、ばしょ。",
      },
    },
  },
};
