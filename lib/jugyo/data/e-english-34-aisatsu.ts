import type { UnitBase } from "../types";

// 止まる授業：あいさつと気持ち（小3・4外国語活動）の共通の骨組み（問題）。事実・例文は lib/lecture/data/e-english-34-aisatsu.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 Good morning. →「グッド モーニング」）。
// せりふはキャストごと：e-english-34-aisatsu.e-pop.ts（ポップ掛け合い）・e-english-34-aisatsu.e-yasashi.ts（やさしい先生と生徒）。
// スコットランドの古い歌は、本文の説明だけを使う（歌の英文は引かない）。答えは lecture の文のまま、読みは say で直す。
// 助詞の「は」が前の語にくっつく所は say で「わ」と書く。

export const E_AISATSU_BASE: UnitBase = {
  unitId: "e-english-34-aisatsu",
  pauses: {
    "check:0": {
      question: "朝《あさ》、先生《せんせい》に会《あ》いました。英語《えいご》で何《なん》と言《い》う？",
      choices: ["Good night.", "Good morning."],
      answer: "Good morning.",
      why: "朝のあいさつは Good morning. です。",
      say: {
        question: "あさ、先生に会いました。英語で、なんと言う？",
        choices: ["グッド ナイト", "グッド モーニング"],
        answer: "グッド モーニング",
        why: "あさの、あいさつわ、グッド モーニングです。",
      },
    },
    "mistake:0": {
      question: "{seito}の言《い》ったこと。夜《よる》、友《とも》だちに会《あ》ったときは？",
      choices: ["夜に会った人へ Good night. と言う", "会ったときは Hello. や Good evening."],
      answer: "会ったときは Hello. や Good evening.",
      why: "Good night. は、別《わか》れるときやねる前の「おやすみなさい」です。",
      say: {
        question: "{seito}の言ったこと。よる、友だちに会ったときわ？",
        choices: ["よるに会ったひとへ、グッド ナイトと言う", "会ったときわ、ハローや、グッド イブニング"],
        answer: "会ったときわ、ハローや、グッド イブニング",
        why: "グッド ナイトわ、別れるときや、ねるまえの、おやすみなさい、です。",
      },
    },
    "mistake:1": {
      question: "{seito}の返《かえ》し方《かた》。Nice to meet you. と言《い》われたら？",
      choices: ["Nice to meet you. に Nice to meet you. と同じように返す", "Nice to meet you, too."],
      answer: "Nice to meet you, too.",
      why: "最後《さいご》に too をつけると「こちらこそ」の意味になります。",
      say: {
        question: "{seito}の、かえしかた。ナイス トゥー ミート ユー、と言われたら？",
        choices: ["ナイス トゥー ミート ユーに、ナイス トゥー ミート ユーと、同じように返す", "ナイス トゥー ミート ユー、トゥー"],
        answer: "ナイス トゥー ミート ユー、トゥー",
        why: "最後に、トゥーをつけると、こちらこそ、の意味になります。",
      },
    },
    "mistake:2": {
      question: "{seito}の答《こた》え方《かた》。How are you? と聞《き》かれたら？",
      choices: ["How are you? に Yes. と答える", "I'm fine. のように気持ちを答える"],
      answer: "I'm fine. のように気持ちを答える",
      why: "How are you? は「元気？」と様子を聞く言葉なので、はい・いいえでは答えません。",
      say: {
        question: "{seito}の、こたえかた。ハウ アー ユー？と聞かれたら？",
        choices: ["ハウ アー ユー？に、イエスと答える", "アイム ファイン、のように、気持ちを答える"],
        answer: "アイム ファイン、のように、気持ちを答える",
        why: "ハウ アー ユー？わ、元気？と、ようすを聞く言葉なので、はい、いいえ、でわ答えません。",
      },
    },
    "check:2": {
      question: "Thank you. と言《い》われたら、何《なん》と返《かえ》す？",
      choices: ["You're welcome.", "Nice to meet you, too."],
      answer: "You're welcome.",
      why: "「どういたしまして」の意味です。",
      say: {
        question: "サンキュー、と言われたら、なんと返す？",
        choices: ["ユア ウェルカム", "ナイス トゥー ミート ユー、トゥー"],
        answer: "ユア ウェルカム",
        why: "どういたしまして、の意味です。",
      },
    },
  },
};
