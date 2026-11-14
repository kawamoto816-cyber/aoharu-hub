import type { UnitBase } from "../types";

// 止まる授業：時刻と一日の生活（It's seven thirty. / at six）（小3・4外国語活動）の共通の骨組み（問題）。事実・例文・時刻は lib/lecture/data/e-english-34-jikoku.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 It's seven thirty. →「イッツ セブン サーティ」）。
// せりふはキャストごと：e-english-34-jikoku.e-pop.ts（ポップ掛け合い）・e-english-34-jikoku.e-yasashi.ts（やさしい先生と生徒）。
// マザーグースの歌は、歌詞を引かない（本文の説明だけを使う）。答えは lecture の文のまま、読みは say で直す。
// 読み：「分」は「ふん・ぷん」、「数」は「かず」、「後」は「あと・うしろ」と say で開く。助詞の「は」が英語の後ろにくっつく所は say で「わ」。

export const E_JIKOKU_BASE: UnitBase = {
  unitId: "e-english-34-jikoku",
  pauses: {
    "mistake:0": {
      question: "{seito}の言《い》い方《かた》。｜7時《しちじ》｜30分《さんじゅっぷん》を英語《えいご》で言《い》うと？",
      choices: ["7時30分を It's thirty seven. と言う", "It's seven thirty."],
      answer: "It's seven thirty.",
      why: "英語《えいご》の時刻《じこく》は、時の数を先、分の数を後に言います。",
      say: {
        question: "{seito}の言いかた。しちじ、さんじゅっぷんを英語で言うと？",
        choices: ["しちじ、さんじゅっぷんを、イッツ サーティ セブン、と言う", "イッツ セブン サーティ"],
        answer: "イッツ セブン サーティ",
        why: "英語の時刻わ、じの、かずを先、ふんの、かずを、あとに言います。",
      },
    },
    "check:2": {
      question: "It's four fifteen. は何時《なんじ》何分《なんぷん》？",
      choices: ["15時4分", "4時15分"],
      answer: "4時15分",
      why: "four が時、fifteen が分です。",
      say: {
        question: "イッツ フォー フィフティーン、わ、なんじ、なんぷん？",
        choices: ["じゅうごじ、よんぷん", "よじ、じゅうごふん"],
        answer: "よじ、じゅうごふん",
        why: "フォーが、じ、フィフティーンが、ふんです。",
      },
    },
    "check:0": {
      question: "What time is it? に「｜8時《はちじ》」と答《こた》えると？",
      choices: ["It's eight.", "It's eight thirty."],
      answer: "It's eight.",
      why: "It's の後ろに時刻《じこく》を入れます。It's eight o'clock. でもよいです。",
      say: {
        question: "ワット タイム イズ イット？に、はちじ、と答えると？",
        choices: ["イッツ エイト", "イッツ エイト サーティ"],
        answer: "イッツ エイト",
        why: "イッツの、うしろに時刻を入れます。イッツ エイト オクロック、でもよいです。",
      },
    },
    "mistake:1": {
      question: "{seito}の言《い》い方《かた》。「｜6時《ろくじ》に起《お》きる」を英語《えいご》で言《い》うと？",
      choices: ["I get up six.", "I get up at six."],
      answer: "I get up at six.",
      why: "「〜時に」と言うときは、時刻《じこく》の前に at をつけます。",
      say: {
        question: "{seito}の言いかた。ろくじに起きる、を英語で言うと？",
        choices: ["アイ ゲット アップ シックス", "アイ ゲット アップ アット シックス"],
        answer: "アイ ゲット アップ アット シックス",
        why: "なんじに、と言うときわ、時刻の前に、アットをつけます。",
      },
    },
    "mistake:2": {
      question: "{seito}の言《い》い方《かた》。「午前《ごぜん》｜9時《くじ》」を英語《えいご》で言《い》うと？",
      choices: ["午前9時を p.m. 9 と言う", "9 a.m."],
      answer: "9 a.m.",
      why: "午前は a.m.、午後は p.m. で、数の後ろにつけます。",
      say: {
        question: "{seito}の言いかた。ごぜん、くじを英語で言うと？",
        choices: ["ごぜん、くじを、ピーエム ナイン、と言う", "ナイン エーエム"],
        answer: "ナイン エーエム",
        why: "ごぜんわ、エーエム、ごごわ、ピーエムで、かずの、うしろにつけます。",
      },
    },
  },
};
