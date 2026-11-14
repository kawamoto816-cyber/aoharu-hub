import type { UnitBase } from "../types";

// 止まる授業：ほしいものを伝える（I want 〜.）（小3・4外国語活動）の共通の骨組み（問題）。事実・例文・年は lib/lecture/data/e-english-34-hoshii.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 I want an apple. →「アイ ウォント アン アップル」）。
// せりふはキャストごと：e-english-34-hoshii.e-pop.ts（ポップ掛け合い）・e-english-34-hoshii.e-yasashi.ts（やさしい先生と生徒）。
// マザーグースの「Hot Cross Buns」は、本文の説明だけを使う（歌の英文は引かない）。答えは lecture の文のまま、読みは say で直す。
// 読み：「物」「数」「人」「上」などの要注意語は say でひらがなに開く。助詞の「は」が前の語にくっつく所は say で「わ」。

export const E_HOSHII_BASE: UnitBase = {
  unitId: "e-english-34-hoshii",
  pauses: {
    "mistake:0": {
      question: "{seito}の言《い》い方《かた》。「ボールがほしい」を英語《えいご》で言《い》うと？",
      choices: ["I'm want a ball.", "I want a ball."],
      answer: "I want a ball.",
      why: "want の前に am はいりません。I のすぐあとに want を言います。",
      say: {
        question: "{seito}の言いかた。「ボールがほしい」を英語で言うと？",
        choices: ["アイム ウォント ア ボール", "アイ ウォント ア ボール"],
        answer: "アイ ウォント ア ボール",
        why: "ウォントの前に、アムわ、いりません。アイの、すぐあとに、ウォントを言います。",
      },
    },
    "check:0": {
      question: "I want ___ egg. の ___ に入《はい》るのは a と an のどちら？",
      choices: ["a", "an"],
      answer: "an",
      why: "egg はエに近い音で始まるので an。",
      say: {
        question: "アイ ウォント、なになに、エッグ。なになにに入るのわ、アと、アンの、どちら？",
        choices: ["ア", "アン"],
        answer: "アン",
        why: "エッグわ、エに近い音で始まるので、アン。",
      },
    },
    "mistake:2": {
      question: "{seito}の注文《ちゅうもん》。りんごを3つたのむときは？",
      choices: ["Three apple, please.", "Three apples, please."],
      answer: "Three apples, please.",
      why: "2つ以上《いじょう》のときは、物の名前の終わりに s をつけます。",
      say: {
        question: "{seito}の注文。りんごを3つたのむときは？",
        choices: ["スリー アップル、プリーズ", "スリー アップルズ、プリーズ"],
        answer: "スリー アップルズ、プリーズ",
        why: "2つ以上のときわ、ものの名前の終わりに、エスをつけます。",
      },
    },
    "check:1": {
      question: "「えんぴつを｜2本《にほん》ください」を英語《えいご》で言《い》うと？",
      choices: ["Two pencil, please.", "Two pencils, please."],
      answer: "Two pencils, please.",
      why: "2つ以上《いじょう》なので pencil に s をつけ、ていねいに please。",
      say: {
        question: "「えんぴつを2本ください」を英語で言うと？",
        choices: ["トゥー ペンシル、プリーズ", "トゥー ペンシルズ、プリーズ"],
        answer: "トゥー ペンシルズ、プリーズ",
        why: "2つ以上なので、ペンシルに、エスをつけ、ていねいに、プリーズ。",
      },
    },
    "mistake:3": {
      question: "{seito}の答《こた》え方《かた》。Do you want milk? に「ほしい」と答《こた》えるときは？",
      choices: ["Do you want milk? — Yes, I want.", "Yes, I do."],
      answer: "Yes, I do.",
      why: "Do you 〜? と聞かれたら、Yes, I do. か No, I don't. で答えます。",
      say: {
        question: "{seito}の答えかた。ドゥー ユー ウォント ミルク？ に「ほしい」と答えるときは？",
        choices: ["ドゥー ユー ウォント ミルク？　イエス、アイ ウォント", "イエス、アイ ドゥー"],
        answer: "イエス、アイ ドゥー",
        why: "ドゥー ユー、なになに？と聞かれたら、イエス、アイ ドゥー。か、ノー、アイ ドント。で答えます。",
      },
    },
  },
};
