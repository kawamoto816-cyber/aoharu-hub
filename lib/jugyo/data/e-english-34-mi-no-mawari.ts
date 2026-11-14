import type { UnitBase } from "../types";

// 止まる授業：身の回りの物の言い方（なかま分け・にている語・What's this? / It's 〜.・Do you have 〜?・my と your）（小3・4外国語活動）の共通の骨組み（問題）。事実・例・年は lib/lecture/data/e-english-34-mi-no-mawari.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 eraser →「イレイサー」、What's this? →「ワッツ・ディス？」）。語としての a は「エー」。
// せりふはキャストごと：e-english-34-mi-no-mawari.e-pop.ts（ポップ掛け合い）・e-english-34-mi-no-mawari.e-yasashi.ts（やさしい先生と生徒）。
// 答えは lecture の文のまま、読みは say で直す。「物」は「もの」と say で開く。「〜」は読まないので「なになに」にする。助詞の「は」が英語の後ろにくっつく所は say で「わ」。

export const E_MI_NO_MAWARI_BASE: UnitBase = {
  unitId: "e-english-34-mi-no-mawari",
  pauses: {
    "check:0": {
      question: "eraser の意味《いみ》は？",
      choices: ["定規《じょうぎ》", "消しゴム"],
      answer: "消しゴム",
      why: "字を消す物が eraser。",
      say: {
        question: "イレイサーの意味わ？",
        choices: ["じょうぎ", "消しゴム"],
        answer: "消しゴム",
        why: "字を消すものが、イレイサー。",
      },
    },
    "mistake:0": {
      question: "{seito}の言《い》ったこと。cap と cup、正《ただ》しいのはどちら？",
      choices: ["cap を「カップ」の意味で使う", "カップは cup、ぼうしは cap"],
      answer: "カップは cup、ぼうしは cap",
      why: "まん中の文字が a か u かで、別《べつ》の物になります。",
      say: {
        question: "{seito}の言ったこと。キャップと、カップ、正しいのわ、どちら？",
        choices: ["キャップを、カップの意味で使う", "カップわ、カップ。ぼうしわ、キャップ"],
        answer: "カップわ、カップ。ぼうしわ、キャップ",
        why: "まんなかの文字が、エーか、ユーかで、別のものになります。",
      },
    },
    "mistake:1": {
      question: "{seito}の答《こた》え。What's this? と聞《き》かれて、えんぴつのことを答《こた》えるなら？",
      choices: ["What's this? — I'm a pencil.", "It's a pencil."],
      answer: "It's a pencil.",
      why: "I'm は自分のことを言うときの形です。物のことは It's 〜. で答えます。",
      say: {
        question: "{seito}の答え。ワッツ・ディス？と聞かれて、えんぴつのことを答えるなら？",
        choices: ["ワッツ・ディス？　アイム・ア・ペンシル", "イッツ・ア・ペンシル"],
        answer: "イッツ・ア・ペンシル",
        why: "アイムわ、自分のことを言うときの、かたちです。もののことわ、イッツ・なになに、で答えます。",
      },
    },
    "check:1": {
      question: "「あなたはのりを持《も》っていますか」を英語《えいご》で言《い》うと？",
      choices: ["Is this your glue?", "Do you have glue?"],
      answer: "Do you have glue?",
      why: "持っているかは Do you have 〜? で聞く。",
      say: {
        question: "「あなたわ、のりを持っていますか」を、英語で言うと？",
        choices: ["イズ・ディス・ユア・グルー？", "ドゥー・ユー・ハブ・グルー？"],
        answer: "ドゥー・ユー・ハブ・グルー？",
        why: "持っているかわ、ドゥー・ユー・ハブ・なになに？で聞く。",
      },
    },
    "mistake:2": {
      question: "{seito}の言《い》ったこと。「これはぼくのかばんです」と言《い》うなら？",
      choices: ["This is a my bag.", "This is my bag."],
      answer: "This is my bag.",
      why: "my や your をつけたら、a はつけません。",
      say: {
        question: "{seito}の言ったこと。「これわ、ぼくのかばんです」と言うなら？",
        choices: ["ディス・イズ・ア・マイ・バッグ", "ディス・イズ・マイ・バッグ"],
        answer: "ディス・イズ・マイ・バッグ",
        why: "マイや、ユアを、つけたら、エーわ、つけません。",
      },
    },
  },
};
