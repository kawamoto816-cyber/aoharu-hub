import type { UnitBase } from "../types";

// 止まる授業：疑問詞（中1・英語）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/j-en-1-gimonshi.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 Where do you live? →「ウェア ドゥー ユー リブ」）。詩・物語の英文は本文にある部分だけを引き、作中の人物や作者のせりふは作らない。
// せりふはキャストごと：j-en-1-gimonshi.j-dark.ts（ダーク解説）・j-en-1-gimonshi.j-kisaku.ts（気さくな兄・姉）。

export const GIMONSHI_BASE: UnitBase = {
  unitId: "j-en-1-gimonshi",
  pauses: {
    "check:0": {
      question: "___ is your birthday? — It's May 5.　空らんに入るのは？",
      choices: ["Where", "When"],
      answer: "When",
      why: "日付（時）を答えているので When。",
      say: {
        question: "くうらん、イズ ユア バースデイ？　イッツ メイ ファイブ。空らんに入るのは？",
        choices: ["ウェア", "ウェン"],
        answer: "ウェン",
        why: "日付、つまり、ときを答えているので、ウェン。",
      },
    },
    "mistake:0": {
      question: "{seito}の「Where you live?」。正しいのはどちら？",
      choices: ["Where you live?", "Where do you live?"],
      answer: "Where do you live?",
      why: "疑問詞のあとはふつうの疑問文の語順。一般動詞なら do / does が必要。",
      say: {
        question: "{seito}の、ウェア ユー リブ。正しいのはどちら？",
        choices: ["ウェア ユー リブ", "ウェア ドゥー ユー リブ"],
        answer: "ウェア ドゥー ユー リブ",
        why: "疑問詞のあとは、ふつうの疑問文の語順。一般動詞なら、ドゥーか、ダズが必要。",
      },
    },
    "check:1": {
      question: "___ pens do you have? — I have three.　空らんに入るのは？",
      choices: ["How many", "How much"],
      answer: "How many",
      why: "数を答えているので How many。後ろの pens は複数形。",
      say: {
        question: "くうらん、ペンズ ドゥー ユー ハブ？　アイ ハブ スリー。空らんに入るのは？",
        choices: ["ハウ メニー", "ハウ マッチ"],
        answer: "ハウ メニー",
        why: "かずを答えているので、ハウ メニー。うしろの、ペンズは、複数形。",
      },
    },
    "mistake:3": {
      question: "{seito}の「Who does play the piano?」。正しいのはどちら？",
      choices: ["Who does play the piano?", "Who plays the piano?"],
      answer: "Who plays the piano?",
      why: "Who が主語のときは does を使わず、動詞に -s をつける。",
      say: {
        question: "{seito}の、フー ダズ プレイ ザ ピアノ。正しいのはどちら？",
        choices: ["フー ダズ プレイ ザ ピアノ", "フー プレイズ ザ ピアノ"],
        answer: "フー プレイズ ザ ピアノ",
        why: "フーが主語のときは、ダズを使わず、動詞に、エスをつける。",
      },
    },
  },
};
