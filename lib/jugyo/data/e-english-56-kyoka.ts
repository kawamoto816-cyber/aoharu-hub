import type { UnitBase } from "../types";

// 止まる授業：曜日と教科・時間割（I have ＋教科＋on ＋曜日.）（小5・6外国語）の共通の骨組み（問題）。事実・例文は lib/lecture/data/e-english-56-kyoka.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 I have math. →「アイ ハヴ マス」）。つづりの問題は、say で1文字ずつ読む。
// せりふはキャストごと：e-english-56-kyoka.e-pop.ts（ポップ掛け合い）・e-english-56-kyoka.e-yasashi.ts（やさしい先生と生徒）。
// 読み：助詞の「は」が前の語にくっつく所は「わ」と書く。マザーグースの歌は、本文の説明だけを使う（歌詞は引かない）。

export const E_KYOKA_BASE: UnitBase = {
  unitId: "e-english-56-kyoka",
  pauses: {
    "mistake:1": {
      question: "{seito}の言《い》ったこと。木曜日《もくようび》を英語《えいご》で書《か》くと？",
      choices: ["木曜日を Tuesday と書く。", "木曜日は Thursday、火曜日は Tuesday。"],
      answer: "木曜日は Thursday、火曜日は Tuesday。",
      why: "Tu で始まるのが火曜日、Th で始まるのが木曜日です。",
      say: {
        question: "{seito}の言ったこと。もくようびを、英語で書くと？",
        choices: ["もくようびを、チューズデーと書く", "もくようびわ、サーズデー。かようびわ、チューズデー"],
        answer: "もくようびわ、サーズデー。かようびわ、チューズデー",
        why: "ティー ユーで始まるのが、かようび。ティー エイチで始まるのが、もくようびです。",
      },
    },
    "check:0": {
      question: "水曜日《すいようび》を英語《えいご》で書《か》きましょう。",
      choices: ["Wensday", "Wednesday"],
      answer: "Wednesday",
      why: "d をわすれやすいので、つづりを確かめる。",
      say: {
        question: "すいようびを、英語で書きましょう。",
        choices: ["ダブリュー、イー、エヌ、エス、ディー、エー、ワイ", "ダブリュー、イー、ディー、エヌ、イー、エス、ディー、エー、ワイ"],
        answer: "ダブリュー、イー、ディー、エヌ、イー、エス、ディー、エー、ワイ",
        why: "ディーを、わすれやすいので、つづりを確かめる。",
      },
    },
    "mistake:2": {
      question: "{seito}の言《い》ったこと。「国語《こくご》が好《す》き」を書《か》くと？",
      choices: ["I like japanese.", "I like Japanese."],
      answer: "I like Japanese.",
      why: "Japanese（国語・日本語）は、ことばの名前なので大文字で始めます。",
      say: {
        question: "{seito}の言ったこと。こくごが好き、を書くと？",
        choices: ["アイ ライク ジャパニーズ。ジャパニーズの、ジェイが小文字", "アイ ライク ジャパニーズ。ジャパニーズの、ジェイが大文字"],
        answer: "アイ ライク ジャパニーズ。ジャパニーズの、ジェイが大文字",
        why: "ジャパニーズ、こくご、にほんごわ、ことばの名前なので、大文字で始めます。",
      },
    },
    "check:2": {
      question: "「何《なん》の教科《きょうか》が好《す》きですか」を英語《えいご》で言《い》うと？",
      choices: ["What subject do you like?", "What day is it today?"],
      answer: "What subject do you like?",
      why: "subject は「教科」。",
      say: {
        question: "なんの教科が好きですか、を、英語で言うと？",
        choices: ["ワット サブジェクト ドゥ ユー ライク？", "ワット デイ イズ イット トゥデイ？"],
        answer: "ワット サブジェクト ドゥ ユー ライク？",
        why: "サブジェクトわ、教科。",
      },
    },
    "mistake:0": {
      question: "{seito}の言《い》ったこと。「月曜日《げつようび》に算数《さんすう》がある」は？",
      choices: ["I have math in Monday.", "I have math on Monday."],
      answer: "I have math on Monday.",
      why: "曜日の前には on を使います。",
      say: {
        question: "{seito}の言ったこと。げつようびに、さんすうがある、わ？",
        choices: ["アイ ハヴ マス イン マンデー", "アイ ハヴ マス オン マンデー"],
        answer: "アイ ハヴ マス オン マンデー",
        why: "ようびの前にわ、オンを使います。",
      },
    },
  },
};
