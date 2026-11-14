import type { UnitBase } from "../types";

// 止まる授業：曜日と天気（7つの曜日・What day is it today? — It's 〜.・sun → sunny のように y がつく天気の言葉・How's the weather?）（小3・4外国語活動）の共通の骨組み（問題）。事実・例は lib/lecture/data/e-english-34-youbi-tenki.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 What day is it today? →「ワット・デイ・イズ・イット・トゥデイ？」。読み方は lecture の漫才の say にそろえる）。
// せりふはキャストごと：e-english-34-youbi-tenki.e-pop.ts（ポップ掛け合い）・e-english-34-youbi-tenki.e-yasashi.ts（やさしい先生と生徒）。
// 答えは lecture の文のまま、読みは say で直す。英語やかぎかっこの後ろの助詞「は」は say で「わ」。日（ひ）・順（じゅん）は say で開く。

export const E_YOUBI_TENKI_BASE: UnitBase = {
  unitId: "e-english-34-youbi-tenki",
  pauses: {
    "mistake:0": {
      question: "{seito}は、火曜日《かようび》と木曜日《もくようび》の英語《えいご》を取《と》りちがえた。Tuesday と Thursday、それぞれ何曜日《なんようび》？",
      answer: "Tuesday は火曜日、Thursday は木曜日",
      why: "どちらも T で始まり、音もにています。曜日の順《じゅん》では火→水→木です。",
      say: {
        question: "{seito}は、かようびともくようびの英語を取りちがえた。チューズデーとサーズデー、それぞれ何曜日？",
        answer: "チューズデーわ、かようび。サーズデーわ、もくようび",
        why: "どちらも、ティーで始まり、音も、にています。曜日の、じゅんでわ、[火、水、木|か、すい、もく]です。",
      },
    },
    "mistake:1": {
      question: "{seito}は、月曜日《げつようび》を monday と書《か》いた。正《ただ》しいのはどっち？",
      choices: ["曜日を monday と小文字で始める", "Monday"],
      answer: "Monday",
      why: "曜日の言葉は、はじめの文字をいつも大文字で書きます。",
      say: {
        question: "{seito}は、月曜日を、小文字で始めて、マンデー、と書いた。正しいのはどっち？",
        choices: ["曜日を、マンデーと、小文字で始める", "大文字のエムで始める、マンデー"],
        answer: "大文字のエムで始める、マンデー",
        why: "曜日の言葉わ、はじめの文字を、いつも大文字で書きます。",
      },
    },
    "check:1": {
      question: "What day is it today? に「金曜日《きんようび》」と答《こた》えると？",
      choices: ["It's sunny.", "It's Friday.", "I like Fridays!"],
      answer: "It's Friday.",
      why: "It's の後ろに曜日を入れます。",
      say: {
        question: "ワット・デイ・イズ・イット・トゥデイ？に「金曜日」と答えると？",
        choices: ["イッツ・サニー", "イッツ・フライデー", "アイ・ライク・フライデーズ！"],
        answer: "イッツ・フライデー",
        why: "イッツの、うしろに、曜日を入れます。",
      },
    },
    "mistake:2": {
      question: "{seito}の言《い》ったこと。晴《は》れの日《ひ》に How's the weather? と聞《き》かれたら？",
      choices: ["How's the weather? に It's Sunday. と答える", "It's sunny."],
      answer: "It's sunny.",
      why: "Sunday は日曜日、sunny は晴れです。天気を聞かれたら天気の言葉で答えます。",
      say: {
        question: "{seito}の言ったこと。晴れのひにハウズ・ザ・ウェザー？と聞かれたら？",
        choices: ["ハウズ・ザ・ウェザー？に、イッツ・サンデー、と答える", "イッツ・サニー"],
        answer: "イッツ・サニー",
        why: "サンデーわ、日曜日、サニーわ、晴れです。天気を聞かれたら、天気の言葉で答えます。",
      },
    },
    "check:2": {
      question: "雨《あめ》の日《ひ》に How's the weather? と聞《き》かれたら？",
      choices: ["It's Monday.", "It's rainy.", "It's sunny."],
      answer: "It's rainy.",
      why: "rain（雨）に y がついた rainy を使います。",
      say: {
        question: "雨のひにハウズ・ザ・ウェザー？と聞かれたら？",
        choices: ["イッツ・マンデー", "イッツ・レイニー", "イッツ・サニー"],
        answer: "イッツ・レイニー",
        why: "レイン、あめ、に、ワイがついた、レイニーを使います。",
      },
    },
  },
};
