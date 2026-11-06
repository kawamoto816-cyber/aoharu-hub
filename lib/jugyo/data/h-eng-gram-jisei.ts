import type { UnitBase } from "../types";

// 止まる授業：時制（高校・英文法）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/h-eng-gram-jisei.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 belongs →「ビロングズ」）。『タイム・マシン』の引用は lecture にある部分だけ。
// せりふはキャストごと：h-eng-gram-jisei.h-charisma.ts（カリスマ講師）・.h-kyoju.ts（名物教授）・.h-nekketsu.ts（熱血エンタメ講義）。

export const JISEI_BASE: UnitBase = {
  unitId: "h-eng-gram-jisei",
  pauses: {
    "check:1": {
      question: "「水は100℃で沸騰する」の動詞の時制は？",
      answer: "現在形（Water boils at 100°C.）",
      why: "いつでも成り立つ事実は現在形で表す。",
      say: {
        question: "水は、ひゃくどで沸騰する、の、動詞の時制は？",
        answer: "現在形。ウォーター ボイルズ アット ワンハンドレッド ディグリーズ",
        why: "いつでも成り立つ事実は、現在形で表す。",
      },
    },
    "mistake:1": {
      question: "{seito}の「This bag is belonging to me.」。正しいのはどちら？",
      choices: ["This bag is belonging to me.", "This bag belongs to me."],
      answer: "This bag belongs to me.",
      why: "belong は状態動詞なので、ふつう進行形にしません。",
      say: {
        question: "{seito}の、ディス バッグ イズ ビロンギング トゥ ミー。正しいのはどちら？",
        choices: ["ディス バッグ イズ ビロンギング トゥ ミー", "ディス バッグ ビロングズ トゥ ミー"],
        answer: "ディス バッグ ビロングズ トゥ ミー",
        why: "ビロングは状態動詞なので、ふつう、進行形にしません。",
      },
    },
    "mistake:0": {
      question: "{seito}の「If it will rain tomorrow, we will stay home.」。正しいのはどちら？",
      choices: ["If it will rain tomorrow, we will stay home.", "If it rains tomorrow, we will stay home."],
      answer: "If it rains tomorrow, we will stay home.",
      why: "if の条件の副詞節では、未来のことも現在形にします。",
      say: {
        question: "{seito}の、イフ イット ウィル レイン トゥモロー、ウィー ウィル ステイ ホーム。正しいのはどちら？",
        choices: ["イフ イット ウィル レイン トゥモロー、ウィー ウィル ステイ ホーム", "イフ イット レインズ トゥモロー、ウィー ウィル ステイ ホーム"],
        answer: "イフ イット レインズ トゥモロー、ウィー ウィル ステイ ホーム",
        why: "イフの、条件の副詞節では、未来のことも、現在形にします。",
      },
    },
    "mistake:2": {
      question: "{seito}の「I don't know if he comes tomorrow.」。正しいのはどちら？",
      choices: ["I don't know if he comes tomorrow.", "I don't know if he will come tomorrow."],
      answer: "I don't know if he will come tomorrow.",
      why: "know の目的語になる名詞節なので、未来のことは will で表します。",
      say: {
        question: "{seito}の、アイ ドント ノウ イフ ヒー カムズ トゥモロー。正しいのはどちら？",
        choices: ["アイ ドント ノウ イフ ヒー カムズ トゥモロー", "アイ ドント ノウ イフ ヒー ウィル カム トゥモロー"],
        answer: "アイ ドント ノウ イフ ヒー ウィル カム トゥモロー",
        why: "ノウの目的語になる、名詞節なので、未来のことは、ウィルで表します。",
      },
    },
  },
};
