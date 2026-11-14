import type { UnitBase } from "../types";

// 止まる授業：完了形（高校・英文法）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/h-eng-gram-kanryo.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 known →「ノウン」）。スコットの日誌・メッセージの引用は lecture にある部分だけ。
// せりふはキャストごと：h-eng-gram-kanryo.h-charisma.ts（カリスマ講師）・.h-kyoju.ts（名物教授）・.h-nekketsu.ts（熱血エンタメ講義）。

export const H_KANRYO_BASE: UnitBase = {
  unitId: "h-eng-gram-kanryo",
  pauses: {
    "check:0": {
      question: "I ___ (know) him for ten years. の ___ に入る形は？",
      answer: "have known",
      why: "for ten years で「ずっと」の継続。know は状態動詞なので現在完了で継続を表す。",
      say: {
        question: "アイ、空所、ヒム フォー テン イヤーズ。空所に、ノウを、正しいかたちにして入れると？",
        answer: "ハヴ ノウン",
        why: "フォー テン イヤーズで、ずっと、の継続。ノウは状態動詞なので、現在完了で、継続を表す。",
      },
    },
    "mistake:1": {
      question: "{seito}の「He has gone to Hawaii twice.」（ハワイに行ったことがある）。正しいのはどちら？",
      choices: ["He has gone to Hawaii twice.", "He has been to Hawaii twice."],
      answer: "He has been to Hawaii twice.",
      why: "「行ったことがある」は have been to。have gone to は「行ってしまって今いない」です。",
      say: {
        question: "{seito}の、ヒー ハズ ゴーン トゥ ハワイ トゥワイス。ハワイに、いったことがある。正しいのはどちら？",
        choices: ["ヒー ハズ ゴーン トゥ ハワイ トゥワイス", "ヒー ハズ ビーン トゥ ハワイ トゥワイス"],
        answer: "ヒー ハズ ビーン トゥ ハワイ トゥワイス",
        why: "いったことがある、は、ハヴ ビーン トゥ。ハヴ ゴーン トゥは、いってしまって、今いない、です。",
      },
    },
    "mistake:0": {
      question: "{seito}の「When have you finished your homework?」。正しいのはどちら？",
      choices: ["When have you finished your homework?", "When did you finish your homework?"],
      answer: "When did you finish your homework?",
      why: "When は時点をたずねるので、現在完了ではなく過去形を使います。",
      say: {
        question: "{seito}の、ウェン ハヴ ユー フィニッシュト ユア ホームワーク？　正しいのはどちら？",
        choices: ["ウェン ハヴ ユー フィニッシュト ユア ホームワーク", "ウェン ディッド ユー フィニッシュ ユア ホームワーク"],
        answer: "ウェン ディッド ユー フィニッシュ ユア ホームワーク",
        why: "ウェンは、時点をたずねるので、現在完了ではなく、過去形を使います。",
      },
    },
    "check:1": {
      question: "When I got to the station, the bus ___ already ___ (leave). の2つの ___ に入る語は？",
      answer: "had, left",
      why: "駅に着いた（過去）より前のことなので過去完了。",
      say: {
        question: "ウェン アイ ガット トゥ ザ ステーション、ザ バス、空所、オールレディ、空所。2つの空所に、リーヴを、正しいかたちにして入れると？",
        answer: "ハッド、レフト",
        why: "駅に着いた、過去より、まえのことなので、過去完了。",
      },
    },
  },
};
