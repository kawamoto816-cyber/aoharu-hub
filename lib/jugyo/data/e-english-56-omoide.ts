import type { UnitBase } from "../types";

// 止まる授業：小学校の思い出（My best memory is 〜. と過去の形）（小5・6外国語）の共通の骨組み（問題）。事実・例文は lib/lecture/data/e-english-56-omoide.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 It was fun. →「イット ワズ ファン」）。
// せりふはキャストごと：e-english-56-omoide.e-pop.ts（ポップ掛け合い）・e-english-56-omoide.e-yasashi.ts（やさしい先生と生徒）。
// 読み：助詞の「は」が前の語にくっつく所は「わ」と書く。スティーヴンソンの詩は、本文の説明だけを使う（詩の英文は引かない）。

export const E_OMOIDE_BASE: UnitBase = {
  unitId: "e-english-56-omoide",
  pauses: {
    "check:1": {
      question: "What's your best memory? と聞《き》かれたら、答《こた》えの文《ぶん》は何《なに》で始《はじ》める？",
      choices: ["My best memory is 〜.", "It was 〜."],
      answer: "My best memory is 〜.",
      why: "「わたしのいちばんの思い出は〜です」の形で答える。",
      say: {
        question: "ワッツ ユア ベスト メモリー？と聞かれたら、答えの文わ、なにで始める？",
        choices: ["マイ ベスト メモリー イズ、なになに", "イット ワズ、なになに"],
        answer: "マイ ベスト メモリー イズ、なになに",
        why: "わたしの、いちばんの思い出わ、なになにです、のかたちで答える。",
      },
    },
    "check:0": {
      question: "「運動会《うんどうかい》」を英語《えいご》で言《い》うと？",
      choices: ["school trip", "sports day", "music festival"],
      answer: "sports day",
      why: "school trip は修学旅行、music festival は音楽会。",
      say: {
        question: "うんどうかいを、英語で言うと？",
        choices: ["スクール トリップ", "スポーツ デイ", "ミュージック フェスティバル"],
        answer: "スポーツ デイ",
        why: "スクール トリップわ、しゅうがくりょこう。ミュージック フェスティバルわ、おんがくかい。",
      },
    },
    "mistake:0": {
      question: "{seito}の言《い》ったこと。修学旅行《しゅうがくりょこう》の思《おも》い出《で》で「京都《きょうと》に行《い》った」は？",
      choices: ["We go to Kyoto on our school trip.（思い出として）", "We went to Kyoto on our school trip."],
      answer: "We went to Kyoto on our school trip.",
      why: "すんだことなので、go の過去の形 went を使います。",
      say: {
        question: "{seito}の言ったこと。しゅうがくりょこうの思い出で、きょうとにいった、わ？",
        choices: ["ウィー ゴー トゥ キョウト オン アワ スクール トリップ", "ウィー ウェント トゥ キョウト オン アワ スクール トリップ"],
        answer: "ウィー ウェント トゥ キョウト オン アワ スクール トリップ",
        why: "すんだことなので、ゴーの、過去のかたち、ウェントを使います。",
      },
    },
    "mistake:1": {
      question: "{seito}の言《い》ったこと。「大《おお》きなお寺《てら》を見《み》た」は？",
      choices: ["We seed a big temple.", "We saw a big temple."],
      answer: "We saw a big temple.",
      why: "see は ed をつけず、saw に形が変わります。",
      say: {
        question: "{seito}の言ったこと。大きな、おてらを見た、わ？",
        choices: ["ウィー シード ア ビッグ テンプル", "ウィー ソー ア ビッグ テンプル"],
        answer: "ウィー ソー ア ビッグ テンプル",
        why: "シーわ、イー ディーをつけず、ソーに、かたちが変わります。",
      },
    },
    "mistake:2": {
      question: "{seito}の言《い》ったこと。運動会《うんどうかい》の思《おも》い出《で》で「わくわくした」は？",
      choices: ["（運動会の思い出で）It is exciting.", "It was exciting."],
      answer: "It was exciting.",
      why: "すんだことの感想なので、is ではなく was を使います。",
      say: {
        question: "{seito}の言ったこと。うんどうかいの思い出で、わくわくした、わ？",
        choices: ["イット イズ エキサイティング", "イット ワズ エキサイティング"],
        answer: "イット ワズ エキサイティング",
        why: "すんだことの感想なので、イズでわなく、ワズを使います。",
      },
    },
  },
};
