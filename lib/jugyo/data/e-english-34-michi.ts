import type { UnitBase } from "../types";

// 止まる授業：道案内（Excuse me. / Where is 〜?・Go straight. / Turn right. / Turn left.・角を数える・建物の名前）（小3・4外国語活動）の共通の骨組み（問題）。事実・例・年は lib/lecture/data/e-english-34-michi.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 Turn right. →「ターン・ライト」）。「〜」は読まないので「なになに」にする。
// せりふはキャストごと：e-english-34-michi.e-pop.ts（ポップ掛け合い）・e-english-34-michi.e-yasashi.ts（やさしい先生と生徒）。
// 答えは lecture の文のまま、読みは say で直す。「角」は「かど」、「相手」は「あいて」、「2つ目」は「ふたつめ」と say で開く。助詞の「は」が英語やかぎかっこの後ろにくっつく所は say で「わ」。

export const E_MICHI_BASE: UnitBase = {
  unitId: "e-english-34-michi",
  pauses: {
    "mistake:2": {
      question: "{seito}の言《い》ったこと。「駅《えき》はどこですか」と英語《えいご》でたずねるなら？",
      choices: ["What is the station?", "Where is the station?"],
      answer: "Where is the station?",
      why: "場所をたずねるときは Where（どこ）を使います。",
      say: {
        question: "{seito}の言ったこと。「駅わ、どこですか」と、英語でたずねるなら？",
        choices: ["ワット・イズ・ザ・ステーション？", "ウェア・イズ・ザ・ステーション？"],
        answer: "ウェア・イズ・ザ・ステーション？",
        why: "場所をたずねるときわ、ウェア、どこ、を使います。",
      },
    },
    "check:0": {
      question: "「右《みぎ》に曲《ま》がって」を英語《えいご》で言《い》うと？",
      choices: ["Turn left.", "Turn right.", "Go straight."],
      answer: "Turn right.",
      why: "曲がるは turn、右は right。",
      say: {
        question: "「右に曲がって」を、英語で言うと？",
        choices: ["ターン・レフト", "ターン・ライト", "ゴー・ストレート"],
        answer: "ターン・ライト",
        why: "曲がるわ、ターン。右わ、ライト。",
      },
    },
    "mistake:1": {
      question: "{seito}の言《い》ったこと。道《みち》を教《おし》えるときの立《た》ち方《かた》で、正《ただ》しいのは？",
      choices: ["向かい合ったまま、自分の右を指さして Turn right. と言う", "相手のとなりに立ち、同じ向きを向いてから言う"],
      answer: "相手のとなりに立ち、同じ向きを向いてから言う",
      why: "向かい合うと、わたしの右は相手の左になります。",
      say: {
        question: "{seito}の言ったこと。道を教えるときの、立ちかたで、正しいのわ？",
        choices: ["向かい合ったまま、自分の右を指さして、ターン・ライトと言う", "あいてのとなりに立ち、同じ向きを向いてから言う"],
        answer: "あいてのとなりに立ち、同じ向きを向いてから言う",
        why: "向かい合うと、わたしの右わ、あいての左になります。",
      },
    },
    "mistake:3": {
      question: "{seito}の言《い》ったこと。「2つ目《め》の角《かど》で」を英語《えいご》で言《い》うと？",
      choices: ["at the two corner", "at the second corner"],
      answer: "at the second corner",
      why: "「2つ目の」は second、「1つ目の」は first です。two は数の「2」です。",
      say: {
        question: "{seito}の言ったこと。「ふたつめのかどで」を、英語で言うと？",
        choices: ["アット・ザ・ツー・コーナー", "アット・ザ・セカンド・コーナー"],
        answer: "アット・ザ・セカンド・コーナー",
        why: "「ふたつめの」わ、セカンド。「ひとつめの」わ、ファーストです。ツーわ、かずの「に」です。",
      },
    },
    "check:1": {
      question: "You can see it on your left. の意味《いみ》は？",
      choices: ["右《みぎ》に見《み》えます", "左に見えます"],
      answer: "左に見えます",
      why: "on your left は「あなたの左に」。",
      say: {
        question: "ユー・キャン・シー・イット・オン・ユア・レフト。の意味わ？",
        why: "オン・ユア・レフトわ、「あなたの左に」。",
      },
    },
  },
};
