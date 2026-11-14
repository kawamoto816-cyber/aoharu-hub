import type { UnitBase } from "../types";

// 止まる授業：自己紹介（名前・出身・好きなもの）（小5・6外国語）の共通の骨組み（問題）。事実・例文は lib/lecture/data/e-english-56-jikoshokai.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 I'm from Nagoya. →「アイム フロム ナゴヤ」）。
// osaka と Osaka は声では同じなので、選択肢の say は「オーが小文字・大文字」で言い分ける。
// せりふはキャストごと：e-english-56-jikoshokai.e-pop.ts（ポップ掛け合い）・e-english-56-jikoshokai.e-yasashi.ts（やさしい先生と生徒）。
// 読み：助詞の「は」が前の語にくっつく所は「わ」と書く。要注意語は say でひらがなに開く。

export const E_JIKOSHOKAI_BASE: UnitBase = {
  unitId: "e-english-56-jikoshokai",
  pauses: {
    "mistake:0": {
      question: "{seito}の言《い》ったこと。「わたしの名前《なまえ》はハルトです」は？",
      choices: ["I'm name is Haruto.", "My name is Haruto."],
      answer: "My name is Haruto.",
      why: "「わたしの名前は」は My name is 〜.。I'm を使うなら I'm Haruto. です。",
      say: {
        question: "{seito}の言ったこと。わたしの名前わ、ハルトです、わ？",
        choices: ["アイム ネーム イズ ハルト", "マイ ネーム イズ ハルト"],
        answer: "マイ ネーム イズ ハルト",
        why: "わたしの名前わ、と言うときわ、マイ ネーム イズ なになに。アイムを使うなら、アイム ハルト、です。",
      },
    },
    "mistake:1": {
      question: "{seito}の言《い》ったこと。Nice to meet you. と言《い》われたら？",
      choices: ["Nice to meet you. — Nice to meet you.", "Nice to meet you, too."],
      answer: "Nice to meet you, too.",
      why: "返すときは too（〜も）をつけて「こちらこそ」の気持ちを表します。",
      say: {
        question: "{seito}の言ったこと。ナイス トゥー ミート ユー、と言われたら？",
        choices: ["ナイス トゥー ミート ユー、と、おなじ文で返す", "ナイス トゥー ミート ユー、トゥー"],
        answer: "ナイス トゥー ミート ユー、トゥー",
        why: "返すときわ、なになにも、の、トゥーをつけて、こちらこそ、の気持ちを、表します。",
      },
    },
    "mistake:2": {
      question: "{seito}の言《い》ったこと。Do you like soccer? の答《こた》えは？",
      choices: ["Do you like soccer? — Yes, I like.", "Yes, I do."],
      answer: "Yes, I do.",
      why: "Do you 〜? には do を使って答えます。",
      say: {
        question: "{seito}の言ったこと。ドゥー ユー ライク サッカー？の、答えわ？",
        choices: ["イエス、アイ ライク", "イエス、アイ ドゥー"],
        answer: "イエス、アイ ドゥー",
        why: "ドゥー ユー なになに？にわ、ドゥーを使って、答えます。",
      },
    },
    "check:0": {
      question: "「わたしは京都《きょうと》の出身《しゅっしん》です」を英語《えいご》で言《い》うと？",
      choices: ["I'm Kyoto.", "I'm from Kyoto."],
      answer: "I'm from Kyoto.",
      why: "出身は I'm from 〜.、町の名前は大文字で始める。",
      say: {
        question: "わたしわ、京都の、出身です、を、英語で言うと？",
        choices: ["アイム キョウト", "アイム フロム キョウト"],
        answer: "アイム フロム キョウト",
        why: "出身わ、アイム フロム なになに。町の名前わ、大文字で始める。",
      },
    },
    "mistake:3": {
      question: "{seito}の言《い》ったこと。カードに書《か》くなら、どっち？",
      choices: ["I'm from osaka.", "I'm from Osaka."],
      answer: "I'm from Osaka.",
      why: "町や国の名前は、はじめの文字を大文字にします。",
      say: {
        question: "{seito}の言ったこと。カードに書くなら、どっち？",
        choices: ["アイム フロム オオサカ。オオサカの、オーが、小文字", "アイム フロム オオサカ。オオサカの、オーが、大文字"],
        answer: "アイム フロム オオサカ。オオサカの、オーが、大文字",
        why: "町や、国の名前わ、はじめの文字を、大文字にします。",
      },
    },
  },
};
