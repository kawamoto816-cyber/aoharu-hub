import type { UnitBase } from "../types";

// 止まる授業：リスニング（中3・英語）の共通の骨組み（問題）。事実・例文・年は lib/lecture/data/j-en-3-listening.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 a quarter to eight →「ア クォーター トゥ エイト」）。時刻は say でひらがなに開く。
// ベルのノートとアイゼンハワーの演説は lecture に引用された文だけを使い、2人のせりふは作らない。漫才（ケイとミオ）の英文は使わない。
// せりふはキャストごと：j-en-3-listening.j-dark.ts（ダーク解説）・j-en-3-listening.j-kisaku.ts（気さくな兄・姉）。

export const J_LISTENING3_BASE: UnitBase = {
  unitId: "j-en-3-listening",
  pauses: {
    "mistake:2": {
      question: "{seito}の「What will Ken do next? で、会話の中で今していることを答える」。正しいのはどちら？",
      choices: ["What will Ken do next? で、会話の中で今していることを答える", "最後の I'll … や Let's … の内容を答える"],
      answer: "最後の I'll … や Let's … の内容を答える",
      why: "「次にすること」は、会話の終わりの未来を表す言い方に出てきます。",
      say: {
        question: "{seito}の、ホワット ウィル ケン ドゥー ネクスト？　で、会話のなかで、いま、していることを答える。正しいのはどちら？",
        choices: ["ホワット ウィル ケン ドゥー ネクスト？　で、会話のなかで、いま、していることを答える", "最後の、アイル、や、レッツの、内容を答える"],
        answer: "最後の、アイル、や、レッツの、内容を答える",
        why: "次にすること、は、会話の終わりの、未来を表す、いいかたに、出てきます。",
      },
    },
    "check:1": {
      question: "a quarter to eight は何時何分？",
      choices: ["8時15分", "7時45分"],
      answer: "7時45分",
      why: "to は「〜の前」。8時の15分前なので7時45分。",
      say: {
        question: "ア クォーター トゥ エイト、は、なんじ、なんぷん？",
        choices: ["はちじ、じゅうごふん", "しちじ、よんじゅうごふん"],
        answer: "しちじ、よんじゅうごふん",
        why: "トゥーは、のまえ。はちじの、じゅうごふんまえなので、しちじ、よんじゅうごふん。",
      },
    },
    "check:0": {
      question: "A: Let's go shopping at ten. B: Sorry, I have a lesson. How about eleven? A: OK. ── 2人は何時に出かける？",
      choices: ["10時", "11時"],
      answer: "11時",
      why: "Sorry のあとで How about eleven? と提案し、A が OK と答えている。",
      say: {
        question: "エー、レッツ ゴー ショッピング アット テン。ビー、ソーリー、アイ ハブ ア レッスン。ハウ アバウト イレブン？　エー、オーケー。ふたりは、なんじに、出かける？",
        choices: ["じゅうじ", "じゅういちじ"],
        answer: "じゅういちじ",
        why: "ソーリーの、あとで、ハウ アバウト イレブン？　と提案し、エーが、オーケーと答えている。",
      },
    },
    "check:2": {
      question: "アナウンスで「聞き手にしてほしいこと」は、ふつうどこで話される？",
      choices: ["最初", "中ほど", "最後"],
      answer: "最後",
      why: "まとめや Please … の呼びかけは、話の終わりに来ることが多い。",
      say: {
        question: "アナウンスで、ききてに、してほしいこと、は、ふつう、どこで話される？",
        choices: ["最初", "なかほど", "最後"],
        why: "まとめや、プリーズの呼びかけは、話の終わりに、来ることが多い。",
      },
    },
  },
};
