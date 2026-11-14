import type { UnitBase } from "../types";

// 止まる授業：英熟語（句動詞とイディオム）（高校・英語）の共通の骨組み（問題）。事実・例・人名・年は lib/lecture/data/h-eng-vocab-jukugo.ts の本文だけ。
// 英語は日本語の声で読むので、say ではカタカナに開く（look after →「ルックアフター」、break the ice →「ブレイク・ジ・アイス」、it →「イット」）。
// シェイクスピアのせりふは lecture にある英文・訳だけを使い、新しいせりふは作らない。作品の筋は、今の基準で気になる言い方（「じゃじゃ馬」など）を避けて言いかえる。
// せりふはキャストごと：h-eng-vocab-jukugo.h-charisma.ts（カリスマ講師）・.h-kyoju.ts（名物教授）・.h-nekketsu.ts（熱血エンタメ講義）。
// 「1語」は「いちご」、「年」は「ねん」に開く。答え（answer）は lecture の文のまま、読みは say.answer で直す。

export const H_VOCAB_JUKUGO_BASE: UnitBase = {
  unitId: "h-eng-vocab-jukugo",
  pauses: {
    "mistake:2": {
      question: "{seito}の「She takes after her little brother.（世話をする、のつもり）」。正しいのはどちら？",
      choices: ["She takes after her little brother.（世話をする、のつもり）", "She looks after her little brother."],
      answer: "She looks after her little brother.",
      why: "take after は「（親など）に似ている」。「世話をする」は look after です。",
      say: {
        question: "{seito}の、世話をする、のつもりで、しー、テイクス、アフター、ハー、リトル、ブラザー。正しいのはどちら？",
        choices: ["世話をする、のつもりで、しー、テイクス、アフター、ハー、リトル、ブラザー", "しー、ルックス、アフター、ハー、リトル、ブラザー"],
        answer: "しー、ルックス、アフター、ハー、リトル、ブラザー",
        why: "テイク、アフターは、親などに、似ている。世話をする、は、ルック、アフターです。",
      },
    },
    "check:0": {
      question: "We have run ___ of milk. Let's buy some. の ___ は？",
      choices: ["up", "out", "off"],
      answer: "out",
      why: "run out of 〜 で「〜を切らす・使い果たす」。out の「なくなる」イメージ。",
      say: {
        question: "ウィー、ハヴ、ラン、なになに、オブ、ミルク。レッツ、バイ、サム。の、なになに、に入るごは？",
        choices: ["アップ", "アウト", "オフ"],
        answer: "アウト",
        why: "ラン、アウト、オブで、切らす、使い果たす。アウトの、なくなる、イメージ。",
      },
    },
    "mistake:0": {
      question: "{seito}の「I found your key. I'll pick up it.」。正しいのはどちら？",
      choices: ["I found your key. I'll pick up it.", "I'll pick it up."],
      answer: "I'll pick it up.",
      why: "pick up の up は副詞。目的語が代名詞のときは、動詞と副詞のあいだに入れます。",
      say: {
        question: "{seito}の、アイ、ファウンド、ユア、キー。アイル、ピック、アップ、イット。正しいのはどちら？",
        choices: ["アイ、ファウンド、ユア、キー。アイル、ピック、アップ、イット", "アイル、ピック、イット、アップ"],
        answer: "アイル、ピック、イット、アップ",
        why: "ピック、アップの、アップは、副詞。目的語が、代名詞のときは、動詞と副詞の、あいだに入れます。",
      },
    },
    "mistake:3": {
      question: "{seito}の「He told a joke to break the ice. を「氷を割るために冗談を言った」と訳す」。正しいのはどちら？",
      choices: ["He told a joke to break the ice. を「氷を割るために冗談を言った」と訳す", "「場をなごませるために冗談を言った」と訳す"],
      answer: "「場をなごませるために冗談を言った」と訳す",
      why: "break the ice はたとえから生まれたイディオム。氷は「初対面の冷たく固い空気」の絵です。",
      say: {
        question: "{seito}の、ヒー、トールド、ア、ジョーク、トゥ、ブレイク、ジ、アイスを、氷を割るために、冗談を言った、と訳す。正しいのはどちら？",
        choices: ["ヒー、トールド、ア、ジョーク、トゥ、ブレイク、ジ、アイスを、氷を割るために、冗談を言った、と訳す", "場を、なごませるために、冗談を言った、と訳す"],
        answer: "場を、なごませるために、冗談を言った、と訳す",
        why: "ブレイク、ジ、アイスは、たとえから生まれた、イディオム。氷は、初対面の、冷たく、固い空気の、絵です。",
      },
    },
  },
};
