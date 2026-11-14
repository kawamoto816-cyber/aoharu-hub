import type { UnitBase } from "../types";

// 止まる授業：色と形の言い方（a red circle）（小3・4外国語活動）の共通の骨組み（問題）。事実・例文は lib/lecture/data/e-english-34-iro-katachi.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 a red circle →「ア レッド サークル」）。
// せりふはキャストごと：e-english-34-iro-katachi.e-pop.ts（ポップ掛け合い）・e-english-34-iro-katachi.e-yasashi.ts（やさしい先生と生徒）。
// マザーグースの歌は、歌詞を引かない（is をはさむ言い方は、reveal の The rose is red. の例だけを使う）。答えは lecture の文のまま、読みは say で直す。
// 読み：「形」「方」は say でひらがなに開く。形の「角」は「かど」と開く。助詞の「は」が前の語にくっつく所は say で「わ」。

export const E_IRO_KATACHI_BASE: UnitBase = {
  unitId: "e-english-34-iro-katachi",
  pauses: {
    "check:1": {
      question: "circle はどんな形《かたち》？",
      choices: ["三角", "丸"],
      answer: "丸",
      why: "まがった線だけでできた、角のない形です。",
      say: {
        question: "サークルわ、どんなかたち？",
        choices: ["さんかく", "まる"],
        answer: "まる",
        why: "まがった線だけでできた、かどのないかたちです。",
      },
    },
    "mistake:1": {
      question: "{seito}の言《い》ったこと。square と triangle、正《ただ》しいのはどちら？",
      choices: ["square と triangle を取りちがえる", "square は正方形、triangle は三角"],
      answer: "square は正方形、triangle は三角",
      why: "tri は「3」を表すので、角が3つの三角が triangle です。",
      say: {
        question: "{seito}の言ったこと。スクエアと、トライアングル、正しいのわ、どちら？",
        choices: ["スクエアと、トライアングルを、取りちがえる", "スクエアわ正方形、トライアングルわ、さんかく"],
        answer: "スクエアわ正方形、トライアングルわ、さんかく",
        why: "トライわ、「さん」を表すので、かどが、みっつの、さんかくが、トライアングルです。",
      },
    },
    "mistake:0": {
      question: "{seito}の言《い》い方《かた》。「赤《あか》い丸《まる》」を英語《えいご》で言《い》うと？",
      choices: ["「赤い丸」を a circle red と言う", "a red circle"],
      answer: "a red circle",
      why: "英語《えいご》でも、色の言葉は形の言葉の前に来ます。",
      say: {
        question: "{seito}の言いかた。「赤い丸」を英語で言うと？",
        choices: ["「赤い丸」を、ア サークル レッドと言う", "ア レッド サークル"],
        answer: "ア レッド サークル",
        why: "英語でも、色の言葉わ、かたちの言葉の前に来ます。",
      },
    },
    "check:0": {
      question: "「黄色《きいろ》い星《ほし》」を英語《えいご》で言《い》うと？",
      choices: ["a star yellow", "a yellow star"],
      answer: "a yellow star",
      why: "色（yellow）を形（star）の前に言います。",
      say: {
        question: "「きいろい星」を英語で言うと？",
        choices: ["ア スター イエロー", "ア イエロー スター"],
        answer: "ア イエロー スター",
        why: "色、イエローを、かたち、スターの前に言います。",
      },
    },
    "mistake:2": {
      question: "{seito}の答《こた》え方《かた》。What color do you like? と聞《き》かれたら？",
      choices: ["What color do you like? に Yes. と答える", "I like blue. のように色を答える"],
      answer: "I like blue. のように色を答える",
      why: "「何色？」と聞かれているので、Yes か No ではなく色の言葉で答えます。",
      say: {
        question: "{seito}の答えかた。ワット カラー ドゥー ユー ライク？と聞かれたら？",
        choices: ["ワット カラー ドゥー ユー ライク？に、イエス、と答える", "アイ ライク ブルー、のように、色を答える"],
        answer: "アイ ライク ブルー、のように、色を答える",
        why: "「なにいろ？」と聞かれているので、イエスか、ノーでわなく、色の言葉で答えます。",
      },
    },
  },
};
