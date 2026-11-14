import type { UnitBase } from "../types";

// 止まる授業：好きなものを伝える（I like 〜. / I don't like 〜.・Do you like 〜? — Yes, I do. / No, I don't.・What 〜 do you like?・会話のキャッチボール）（小3・4外国語活動）の共通の骨組み（問題）。事実・例・年は lib/lecture/data/e-english-34-suki.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 I like cats. →「アイ・ライク・キャッツ」）。「〜」は読まないので「なになに」にする。
// せりふはキャストごと：e-english-34-suki.e-pop.ts（ポップ掛け合い）・e-english-34-suki.e-yasashi.ts（やさしい先生と生徒）。
// 答えは lecture の文のまま、読みは say で直す。「後ろ」は「うしろ」、「数えられる物」は「かぞえられるもの」と say で開く。助詞の「は」が英語やかぎかっこの後ろにくっつく所は say で「わ」。

export const E_SUKI_BASE: UnitBase = {
  unitId: "e-english-34-suki",
  pauses: {
    "mistake:0": {
      question: "{seito}の言《い》ったこと。「サッカーが好《す》き」を英語《えいご》で言《い》うなら？",
      choices: ["I am soccer.（サッカーが好《す》き、のつもり）", "I like soccer."],
      answer: "I like soccer.",
      why: "「好《す》き」を表すのは like です。I am soccer. では「わたしはサッカーです」になってしまいます。",
      say: {
        question: "{seito}の言ったこと。「サッカーが好き」を、英語で言うなら？",
        choices: ["アイ・アム・サッカー。サッカーが好き、のつもり", "アイ・ライク・サッカー"],
        answer: "アイ・ライク・サッカー",
        why: "「好き」を表すのわ、ライクです。アイ・アム・サッカーでわ、「わたしわ、サッカーです」になってしまいます。",
      },
    },
    "check:0": {
      question: "「わたしはねこが好《す》きです」を英語《えいご》で言《い》うと？",
      choices: ["I am cats.", "I like cats.", "Do you like cats?"],
      answer: "I like cats.",
      why: "I like の後ろに cats を入れます。数えられる物なので s がつきます。",
      say: {
        question: "「わたしわ、ねこが好きです」を、英語で言うと？",
        choices: ["アイ・アム・キャッツ", "アイ・ライク・キャッツ", "ドゥー・ユー・ライク・キャッツ？"],
        answer: "アイ・ライク・キャッツ",
        why: "アイ・ライクの、うしろに、キャッツを入れます。かぞえられるものなので、エスがつきます。",
      },
    },
    "mistake:1": {
      question: "{seito}の言《い》ったこと。Do you like dogs? と聞《き》かれて「うん、好《す》き」と答《こた》えるなら？",
      choices: ["Do you like dogs? — Yes, I like.", "Yes, I do."],
      answer: "Yes, I do.",
      why: "Do you 〜? とたずねられたら、do を使って Yes, I do. と答えます。",
      say: {
        question: "{seito}の言ったこと。ドゥー・ユー・ライク・ドッグズ？と聞かれて、「うん、好き」と答えるなら？",
        choices: ["ドゥー・ユー・ライク・ドッグズ？　イエス・アイ・ライク", "イエス・アイ・ドゥー"],
        answer: "イエス・アイ・ドゥー",
        why: "ドゥー・ユー・なになに？と、たずねられたら、ドゥーを使って、イエス・アイ・ドゥー、と答えます。",
      },
    },
    "mistake:2": {
      question: "{seito}の言《い》ったこと。What sport do you like? への答《こた》えとして正《ただ》しいのは？",
      choices: ["What sport do you like? — Yes, I do.", "I like baseball."],
      answer: "I like baseball.",
      why: "「何のスポーツ？」と聞かれているので、スポーツの名前で答えます。",
      say: {
        question: "{seito}の言ったこと。ワット・スポーツ・ドゥー・ユー・ライク？への、答えとして、正しいのわ？",
        choices: ["ワット・スポーツ・ドゥー・ユー・ライク？　イエス・アイ・ドゥー", "アイ・ライク・ベースボール"],
        answer: "アイ・ライク・ベースボール",
        why: "「なんのスポーツ？」と聞かれているので、スポーツの名前で答えます。",
      },
    },
    "check:2": {
      question: "「何《なん》の動物《どうぶつ》が好《す》き？」とたずねると？",
      choices: ["Do you like animals?", "What animal do you like?"],
      answer: "What animal do you like?",
      why: "What の後ろに animal（動物）を入れます。",
      say: {
        question: "「なんの動物が好き？」と、たずねると？",
        choices: ["ドゥー・ユー・ライク・アニマルズ？", "ワット・アニマル・ドゥー・ユー・ライク？"],
        answer: "ワット・アニマル・ドゥー・ユー・ライク？",
        why: "ワットの、うしろに、アニマル、どうぶつ、を入れます。",
      },
    },
  },
};
