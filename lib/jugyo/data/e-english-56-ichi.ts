import type { UnitBase } from "../types";

// 止まる授業：物の位置と道案内（in・on・under・by／Where is 〜?／Go straight.）（小5・6外国語）の共通の骨組み（問題）。事実・例文は lib/lecture/data/e-english-56-ichi.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 The clock is on the wall. →「ザ クロック イズ オン ザ ウォール」、___ →「なになに」）。
// せりふはキャストごと：e-english-56-ichi.e-pop.ts（ポップ掛け合い）・e-english-56-ichi.e-yasashi.ts（やさしい先生と生徒）。
// 読み：助詞の「は」が前の語にくっつく所は「わ」と書く。「中」「上」「下」などは say でひらがなに開く。

export const E_ICHI_BASE: UnitBase = {
  unitId: "e-english-56-ichi",
  pauses: {
    "check:0": {
      question: "The cat is ___ the box.（ねこは箱《はこ》の中《なか》）の ___ に入《はい》るのは？",
      choices: ["in", "on", "under"],
      answer: "in",
      why: "「〜の中に」は in。",
      say: {
        question: "ザ キャット イズ なになに ザ ボックス。ねこわ、箱の、なか。の、なになにに、はいるのは？",
        choices: ["イン", "オン", "アンダー"],
        answer: "イン",
        why: "なになにの、なかに、わ、イン。",
      },
    },
    "mistake:0": {
      question: "{seito}の言《い》ったこと。かべにかかった時計《とけい》は？",
      choices: ["The clock is in the wall.", "The clock is on the wall."],
      answer: "The clock is on the wall.",
      why: "かべにくっついているので on。in はかべの中にうまっていることになります。",
      say: {
        question: "{seito}の言ったこと。かべに、かかった、とけいわ？",
        choices: ["ザ クロック イズ イン ザ ウォール", "ザ クロック イズ オン ザ ウォール"],
        answer: "ザ クロック イズ オン ザ ウォール",
        why: "かべに、くっついているので、オン。インわ、かべの、なかに、うまっている、ことになります。",
      },
    },
    "mistake:1": {
      question: "{seito}の言《い》ったこと。「ぼくのくつ、どこ？」は？",
      choices: ["Where is my shoes?", "Where are my shoes?"],
      answer: "Where are my shoes?",
      why: "くつは2つ以上なので are。答えも They're 〜. です。",
      say: {
        question: "{seito}の言ったこと。ぼくの、くつ、どこ？　は？",
        choices: ["ウェア イズ マイ シューズ？", "ウェア アー マイ シューズ？"],
        answer: "ウェア アー マイ シューズ？",
        why: "くつわ、ふたつ以上なので、アー。こたえも、ゼア、なになに、です。",
      },
    },
    "check:1": {
      question: "「右《みぎ》に曲《ま》がって」を英語《えいご》で言《い》いましょう。",
      choices: ["Turn left.", "Turn right.", "Go straight."],
      answer: "Turn right.",
      why: "曲がるは turn、右は right。",
      say: {
        question: "みぎに、まがって、を、えいごで、言いましょう。",
        choices: ["ターン レフト", "ターン ライト", "ゴー ストレート"],
        answer: "ターン ライト",
        why: "まがるわ、ターン。みぎわ、ライト。",
      },
    },
    "mistake:2": {
      question: "{seito}の言《い》ったこと。「まっすぐ進《すす》んで」は？",
      choices: ["Go to straight.", "Go straight."],
      answer: "Go straight.",
      why: "straight の前に to はいりません。",
      say: {
        question: "{seito}の言ったこと。まっすぐ、すすんで、は？",
        choices: ["ゴー トゥ ストレート", "ゴー ストレート"],
        answer: "ゴー ストレート",
        why: "ストレートの、まえに、トゥわ、いりません。",
      },
    },
  },
};
