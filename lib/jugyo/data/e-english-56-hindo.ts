import type { UnitBase } from "../types";

// 止まる授業：一日の生活と頻度（always・usually・sometimes）（小5・6外国語）の共通の骨組み（問題）。事実・例文・数は lib/lecture/data/e-english-56-hindo.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 I always go to school. →「アイ オールウェイズ ゴー トゥ スクール」、6:30 →「シックス サーティ」、〜 →「なになに」）。
// せりふはキャストごと：e-english-56-hindo.e-pop.ts（ポップ掛け合い）・e-english-56-hindo.e-yasashi.ts（やさしい先生と生徒）。
// 読み：助詞の「は」「へ」が前の語にくっつく所は「わ」「え」と書く。

export const HINDO_BASE: UnitBase = {
  unitId: "e-english-56-hindo",
  pauses: {
    "mistake:1": {
      question: "{seito}の言《い》ったこと。「｜6時30分《ろくじさんじゅっぷん》に起《お》きます」は？",
      choices: ["I get up in 6:30.", "I get up at 6:30."],
      answer: "I get up at 6:30.",
      why: "時刻《じこく》の前は at です。in は in the morning（朝に）のように使います。",
      say: {
        question: "{seito}の言ったこと。ろくじさんじゅっぷんに、起きます、は？",
        choices: ["アイ ゲット アップ イン シックス サーティ", "アイ ゲット アップ アット シックス サーティ"],
        answer: "アイ ゲット アップ アット シックス サーティ",
        why: "じこくの前わ、アットです。インわ、イン ザ モーニング、あさに、のように使います。",
      },
    },
    "check:0": {
      question: "「ときどき」を英語《えいご》で言《い》うと？",
      choices: ["usually", "sometimes"],
      answer: "sometimes",
      why: "always＝いつも、usually＝たいてい、sometimes＝ときどき。",
      say: {
        choices: ["ユージュアリー", "サムタイムズ"],
        answer: "サムタイムズ",
        why: "オールウェイズわ、いつも。ユージュアリーわ、たいてい。サムタイムズわ、ときどき。",
      },
    },
    "mistake:0": {
      question: "{seito}の言《い》ったこと。「いつも学校《がっこう》へ行《い》く」は？",
      choices: ["I go always to school.", "I always go to school."],
      answer: "I always go to school.",
      why: "回数の言葉は動作の言葉（go）の前に置きます。",
      say: {
        question: "{seito}の言ったこと。いつも、学校え、いく、は？",
        choices: ["アイ ゴー オールウェイズ トゥ スクール", "アイ オールウェイズ ゴー トゥ スクール"],
        answer: "アイ オールウェイズ ゴー トゥ スクール",
        why: "かいすうの言葉わ、どうさの言葉、ゴーの、前に、おきます。",
      },
    },
    "check:2": {
      question: "I ___ play video games. を「決《けっ》してしない」の文《ぶん》にするには？",
      choices: ["never", "don't never"],
      answer: "never",
      why: "never だけで「決して〜ない」。don't はつけない。",
      say: {
        question: "アイ、なになに、プレイ ビデオ ゲームズ。を、けっして、しない、の文にするには？",
        choices: ["ネバー", "ドント ネバー"],
        answer: "ネバー",
        why: "ネバーだけで、けっして、なになに、ない。ドントわ、つけない。",
      },
    },
    "mistake:2": {
      question: "{seito}の言《い》ったこと。Do you usually walk your dog? と聞《き》かれたときの答《こた》えは？",
      choices: ["Do you usually walk your dog? — Yes, I usually.", "Yes, I do."],
      answer: "Yes, I do.",
      why: "Do you 〜? とたずねられたら、do を使って答えます。",
      say: {
        question: "{seito}の言ったこと。ドゥー ユー ユージュアリー ウォーク ユア ドッグ？と、聞かれたときの、答えは？",
        choices: ["ドゥー ユー ユージュアリー ウォーク ユア ドッグ？　イエス、アイ ユージュアリー", "イエス、アイ ドゥー"],
        answer: "イエス、アイ ドゥー",
        why: "ドゥー ユー、なになに？と、たずねられたら、ドゥーを使って、答えます。",
      },
    },
  },
};
