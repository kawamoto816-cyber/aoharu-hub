import type { UnitBase } from "../types";

// 止まる授業：将来の夢（I want to be 〜.・小5・6外国語）の共通の骨組み（問題）。事実・例文は lib/lecture/data/e-english-56-yume.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 I want to be a teacher. →「アイ ウォント トゥー ビー ア ティーチャー」）。
// せりふはキャストごと：e-english-56-yume.e-pop.ts（ポップ掛け合い）・e-english-56-yume.e-yasashi.ts（やさしい先生と生徒）。
// 数え歌「Tinker, Tailor」は、本文の説明と仕事の言葉だけを使う（歌の英文は引かない）。答えは lecture の文のまま、読みは say で直す。

export const E_YUME_BASE: UnitBase = {
  unitId: "e-english-56-yume",
  pauses: {
    "mistake:2": {
      question: "{seito}の言《い》った文《ぶん》。「パイロットになりたい」は？",
      choices: ["I want be a pilot.", "I want to be a pilot."],
      answer: "I want to be a pilot.",
      why: "「〜になりたい」は want to be。to をわすれないようにします。",
      say: {
        question: "{seito}の言った文。パイロットに、なりたい、わ？",
        choices: ["アイ ウォント ビー ア パイロット", "アイ ウォント トゥー ビー ア パイロット"],
        answer: "アイ ウォント トゥー ビー ア パイロット",
        why: "なになにに、なりたい、わ、ウォント トゥー ビー。トゥーを、わすれないようにします。",
      },
    },
    "mistake:0": {
      question: "{seito}の書《か》いたカード。正《ただ》しいのはどっち？",
      choices: ["I want to be teacher.", "I want to be a teacher."],
      answer: "I want to be a teacher.",
      why: "仕事の言葉の前には a をつけます。",
      say: {
        question: "{seito}の書いたカード。正しいのわ、どっち？",
        choices: ["アイ ウォント トゥー ビー ティーチャー", "アイ ウォント トゥー ビー ア ティーチャー"],
        answer: "アイ ウォント トゥー ビー ア ティーチャー",
        why: "仕事の言葉の前にわ、アをつけます。",
      },
    },
    "mistake:1": {
      question: "{seito}の言《い》った文《ぶん》。「芸術家《げいじゅつか》になりたい」は？",
      choices: ["I want to be a artist.", "I want to be an artist."],
      answer: "I want to be an artist.",
      why: "artist は母音の音で始まるので an をつけます。",
      say: {
        question: "{seito}の言った文。げいじゅつかに、なりたい、わ？",
        choices: ["アイ ウォント トゥー ビー ア アーティスト", "アイ ウォント トゥー ビー アン アーティスト"],
        answer: "アイ ウォント トゥー ビー アン アーティスト",
        why: "アーティストわ、母音の音で始まるので、アンをつけます。",
      },
    },
    "check:1": {
      question: "「料理人《りょうりにん》になりたい」を英語《えいご》で言《い》うと？",
      choices: ["I want a cook.", "I want to be a cook."],
      answer: "I want to be a cook.",
      why: "なりたいは want to be。cook の前に a。",
      say: {
        question: "りょうりにんに、なりたい、を、英語で言うと？",
        choices: ["アイ ウォント ア クック", "アイ ウォント トゥー ビー ア クック"],
        answer: "アイ ウォント トゥー ビー ア クック",
        why: "なりたいわ、ウォント トゥー ビー。クックの前に、ア。",
      },
    },
    "check:2": {
      question: "相手《あいて》の夢《ゆめ》をたずねる文《ぶん》は？",
      choices: ["What do you want?", "What do you want to be?"],
      answer: "What do you want to be?",
      why: "「何になりたいですか」なので What で始める。",
      say: {
        question: "あいての、ゆめを、たずねる文わ？",
        choices: ["ワット ドゥー ユー ウォント", "ワット ドゥー ユー ウォント トゥー ビー"],
        answer: "ワット ドゥー ユー ウォント トゥー ビー",
        why: "なにに、なりたいですか、なので、ワットで始める。",
      },
    },
  },
};
