import type { UnitBase } from "../types";

// 止まる授業：数の言い方（1〜12・-teen・-ty・How many?）（小3・4外国語活動）の共通の骨組み（問題）。事実・例・数は lib/lecture/data/e-english-34-kazu.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 fifteen →「フィフティーン」、forty →「フォーティ」）。
// せりふはキャストごと：e-english-34-kazu.e-pop.ts（ポップ掛け合い）・e-english-34-kazu.e-yasashi.ts（やさしい先生と生徒）。
// マザーグースの歌は、歌詞を引かない（本文の説明だけを使う）。答えは lecture の文のまま、読みは say で直す。
// 読み：「数」は「かず」、「後ろ」は「うしろ」、「言い方」は「いいかた」、「所」は「ところ」と say で開く。助詞の「は」が数字・英語の後ろにくっつく所は say で「わ」。

export const E_KAZU_BASE: UnitBase = {
  unitId: "e-english-34-kazu",
  pauses: {
    "mistake:0": {
      question: "{seito}の言《い》い方《かた》。11と12を英語《えいご》で言《い》うと？",
      choices: ["11 を oneteen、12 を twoteen と言う", "11 は eleven、12 は twelve"],
      answer: "11 は eleven、12 は twelve",
      why: "11と12は、-teen のきまりを使わない特別《とくべつ》な言い方です。",
      say: {
        question: "{seito}の言いかた。じゅういちと、じゅうにを英語で言うと？",
        choices: ["じゅういちを、ワンティーン、じゅうにを、ツーティーン、と言う", "じゅういちわ、イレブン、じゅうにわ、トゥエルブ"],
        answer: "じゅういちわ、イレブン、じゅうにわ、トゥエルブ",
        why: "じゅういちと、じゅうにわ、ティーンのきまりを使わない、特別な言いかたです。",
      },
    },
    "check:0": {
      question: "「15」は英語《えいご》で何《なん》と言《い》う？",
      choices: ["fiveteen", "fifteen"],
      answer: "fifteen",
      why: "13〜19 は -teen がつきます。five ではなく fif になります。",
      say: {
        question: "じゅうごわ、英語でなんと言う？",
        choices: ["ファイブティーン", "フィフティーン"],
        answer: "フィフティーン",
        why: "じゅうさんから、じゅうきゅうわ、ティーンがつきます。ファイブでわなく、フィフになります。",
      },
    },
    "check:1": {
      question: "「40」は英語《えいご》で何《なん》と言《い》う？",
      choices: ["forty", "fourteen"],
      answer: "forty",
      why: "10のまとまりの数は -ty。four の u はつきません。",
      say: {
        question: "よんじゅうわ、英語でなんと言う？",
        choices: ["フォーティ", "フォーティーン"],
        answer: "フォーティ",
        why: "じゅうの、まとまりの、かずわ、ティ。フォーの、ユーわ、つきません。",
      },
    },
    "mistake:2": {
      question: "{seito}の言《い》い方《かた》。thirteen と thirty は、どう言《い》い分《わ》ける？",
      choices: ["thirteen と thirty を同じように言う", "-teen は後ろ、-ty は前を強く言う"],
      answer: "-teen は後ろ、-ty は前を強く言う",
      why: "強く言う所がちがうので、聞く人はそこで13か30かを聞き分けます。",
      say: {
        question: "{seito}の言いかた。サーティーンと、サーティわ、どう言いわける？",
        choices: ["サーティーンと、サーティを、同じように言う", "ティーンわ、うしろ、ティわ、まえを強く言う"],
        answer: "ティーンわ、うしろ、ティわ、まえを強く言う",
        why: "強く言うところが、ちがうので、聞くひとわ、そこで、じゅうさんか、さんじゅうかを、聞きわけます。",
      },
    },
    "check:2": {
      question: "How many apples? と聞《き》かれました。りんごが3こなら？",
      choices: ["Three.", "Thirteen."],
      answer: "Three.",
      why: "How many? には数で答えます。",
      say: {
        question: "ハウ メニー アップルズ？と聞かれました。りんごが、さんこなら？",
        choices: ["スリー", "サーティーン"],
        answer: "スリー",
        why: "ハウ メニー？にわ、かずで答えます。",
      },
    },
  },
};
