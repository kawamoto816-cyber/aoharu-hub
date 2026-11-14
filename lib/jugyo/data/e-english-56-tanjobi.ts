import type { UnitBase } from "../types";

// 止まる授業：月と誕生日（小5・6外国語）の共通の骨組み（問題）。事実・例文は lib/lecture/data/e-english-56-tanjobi.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 May 5th →「メイ フィフス」）。
// せりふはキャストごと：e-english-56-tanjobi.e-pop.ts（ポップ掛け合い）・e-english-56-tanjobi.e-yasashi.ts（やさしい先生と生徒）。
// 読み：大文字・小文字だけがちがう選択肢は、声では区別がつかないので say で「小文字の a」「大文字の A」をそえる。
// マザーグースの歌は、本文の説明だけを使う（歌の英文は引かない）。答えは lecture の文のまま、読みは say で直す。

export const E_TANJOBI_BASE: UnitBase = {
  unitId: "e-english-56-tanjobi",
  pauses: {
    "mistake:1": {
      question: "{seito}の書《か》いた文《ぶん》。正《ただ》しいのはどっち？",
      choices: ["My birthday is august 3rd.", "My birthday is August 3rd."],
      answer: "My birthday is August 3rd.",
      why: "月の名前は、文のと中でも大文字で始めます。",
      say: {
        question: "{seito}の書いた文。正しいのわ、どっち？",
        choices: ["マイ バースデイ イズ オーガスト サード。オーガストが、小文字のエーで始まる文", "マイ バースデイ イズ オーガスト サード。オーガストが、大文字のエーで始まる文"],
        answer: "マイ バースデイ イズ オーガスト サード。オーガストが、大文字のエーで始まる文",
        why: "つきの名前わ、文のとちゅうでも、大文字で始めます。",
      },
    },
    "mistake:3": {
      question: "{seito}の言《い》ったこと。正《ただ》しいのはどっち？",
      choices: ["June を7月だと思う。", "June は6月、July は7月。"],
      answer: "June は6月、July は7月。",
      why: "つづりがにているので、Ju のあとの n（6月）と l（7月）で見分けます。",
      say: {
        question: "{seito}の言ったこと。正しいのわ、どっち？",
        choices: ["ジューンを、しちがつだと思う", "ジューンわ、ろくがつ。ジュライわ、しちがつ"],
        answer: "ジューンわ、ろくがつ。ジュライわ、しちがつ",
        why: "つづりがにているので、ジェー ユーのあとの、エヌ、ろくがつ、と、エル、しちがつ、で見分けます。",
      },
    },
    "mistake:0": {
      question: "{seito}の言《い》った文《ぶん》。「わたしの誕生日《たんじょうび》は｜5月《ごがつ》｜5日《いつか》です」は？",
      choices: ["My birthday is May five.", "My birthday is May 5th (fifth)."],
      answer: "My birthday is May 5th (fifth).",
      why: "日にちは数の言い方ではなく、順番の言い方を使います。",
      say: {
        question: "{seito}の言った文。わたしの誕生日わ、ごがついつかです、わ？",
        choices: ["マイ バースデイ イズ メイ ファイブ", "マイ バースデイ イズ メイ フィフス"],
        answer: "マイ バースデイ イズ メイ フィフス",
        why: "ひにちわ、かずの言いかたでわなく、順番の言いかたを使います。",
      },
    },
    "check:1": {
      question: "｜22日《にじゅうににち》を数字《すうじ》＋｜2文字《にもじ》で書《か》きましょう。",
      choices: ["22th", "22nd"],
      answer: "22nd",
      why: "22日は second と同じなかまなので nd。",
      say: {
        question: "にじゅうににちを、数字と、にもじで書きましょう。",
        choices: ["にじゅうにと、ティー エイチ", "にじゅうにと、エヌ ディー"],
        answer: "にじゅうにと、エヌ ディー",
        why: "にじゅうににちわ、セカンドと同じなかまなので、エヌ ディー。",
      },
    },
    "check:0": {
      question: "｜7月《しちがつ》｜4日《よっか》を英語《えいご》で言《い》いましょう。",
      choices: ["July four", "July 4th（fourth）"],
      answer: "July 4th（fourth）",
      why: "月の名前が先、日にちは順番の言い方。",
      say: {
        question: "しちがつよっかを、英語で言いましょう。",
        choices: ["ジュライ フォー", "ジュライ フォース"],
        answer: "ジュライ フォース",
        why: "つきの名前が先、ひにちわ、順番の言いかた。",
      },
    },
  },
};
