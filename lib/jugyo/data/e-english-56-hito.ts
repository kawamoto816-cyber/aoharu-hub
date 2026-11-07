import type { UnitBase } from "../types";

// 止まる授業：人を紹介する（He is 〜. / She is 〜.）（小5・6外国語）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/e-english-56-hito.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 This is my brother. →「ディス イズ マイ ブラザー」、〜 →「なになに」、Mr. →「ミスター」、Ms. →「ミズ」）。
// せりふはキャストごと：e-english-56-hito.e-pop.ts（ポップ掛け合い）・e-english-56-hito.e-yasashi.ts（やさしい先生と生徒）。
// 読み：助詞の「は」が前の語にくっつく所は「わ」と書く。「人」は「ひと」と開く。

export const HITO_BASE: UnitBase = {
  unitId: "e-english-56-hito",
  pauses: {
    "mistake:0": {
      question: "{seito}の言《い》ったこと。弟《おとうと》（brother）を紹介《しょうかい》する｜2文《にぶん》は？",
      choices: ["This is my brother. She is ten.", "This is my brother. He is ten."],
      answer: "This is my brother. He is ten.",
      why: "brother（兄・弟）は男の人なので He を使います。",
      say: {
        question: "{seito}の言ったこと。おとうと、ブラザーを、しょうかいする、にぶんわ？",
        choices: ["ディス イズ マイ ブラザー。シー イズ テン", "ディス イズ マイ ブラザー。ヒー イズ テン"],
        answer: "ディス イズ マイ ブラザー。ヒー イズ テン",
        why: "ブラザー、あに、おとうとわ、おとこのひとなので、ヒーを使います。",
      },
    },
    "check:0": {
      question: "This is Mr. Kato. ___ is our music teacher. の ___ に入《はい》るのは？",
      choices: ["He", "She"],
      answer: "He",
      why: "Mr. は男の人の名前の前につけるので He。",
      say: {
        question: "ディス イズ ミスター カトウ。なになに イズ アワ ミュージック ティーチャー。の、なになにに、はいるのは？",
        choices: ["ヒー", "シー"],
        answer: "ヒー",
        why: "ミスターわ、おとこのひとの、なまえの、まえに、つけるので、ヒー。",
      },
    },
    "mistake:1": {
      question: "{seito}の言《い》ったこと。「その人《ひと》（男《おとこ》の人《ひと》）の名前《なまえ》はケンタです」は？",
      choices: ["He is name is Kenta.", "His name is Kenta."],
      answer: "His name is Kenta.",
      why: "「その人（男の人）の名前」は his name。He is は「その人は〜です」の意味です。",
      say: {
        question: "{seito}の言ったこと。そのひと、おとこのひとの、なまえわ、ケンタです、は？",
        choices: ["ヒー イズ ネーム イズ ケンタ", "ヒズ ネーム イズ ケンタ"],
        answer: "ヒズ ネーム イズ ケンタ",
        why: "そのひと、おとこのひとの、なまえわ、ヒズ ネーム。ヒー イズわ、そのひとわ、なになにです、の、いみです。",
      },
    },
    "mistake:2": {
      question: "{seito}の言《い》ったこと。「その人《ひと》はピアノがひけます」は？",
      choices: ["She is play the piano.", "She can play the piano."],
      answer: "She can play the piano.",
      why: "できることは can で言います。is と can はいっしょに使いません。",
      say: {
        question: "{seito}の言ったこと。そのひとわ、ピアノが、ひけます、は？",
        choices: ["シー イズ プレイ ザ ピアノ", "シー キャン プレイ ザ ピアノ"],
        answer: "シー キャン プレイ ザ ピアノ",
        why: "できることわ、キャンで言います。イズと、キャンわ、いっしょに使いません。",
      },
    },
    "check:2": {
      question: "Is she your sister? に「いいえ」で答《こた》えると？",
      choices: ["No, he isn't.", "No, she isn't."],
      answer: "No, she isn't.",
      why: "she でたずねられたので she で答え、is not をちぢめて isn't。",
      say: {
        question: "イズ シー ユア シスター？に、いいえ、で、答えると？",
        choices: ["ノー、ヒー イズント", "ノー、シー イズント"],
        answer: "ノー、シー イズント",
        why: "シーで、たずねられたので、シーで答え、イズ ノットを、ちぢめて、イズント。",
      },
    },
  },
};
