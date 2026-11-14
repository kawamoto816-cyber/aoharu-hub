import type { UnitBase } from "../types";

// 止まる授業：文型（SVOO・SVOC）（中2・英語）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/j-en-2-bunkei.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 I gave Ken a book. →「アイ ゲイブ ケン ア ブック」、SVOO →「エス ブイ オー オー」）。
// 名作の言葉は lecture にある英文だけを引き、登場人物のせりふは作らない。
// せりふはキャストごと：j-en-2-bunkei.j-dark.ts（ダーク解説）・j-en-2-bunkei.j-kisaku.ts（気さくな兄・姉）。

export const J_BUNKEI_BASE: UnitBase = {
  unitId: "j-en-2-bunkei",
  pauses: {
    "mistake:0": {
      question: "{seito}の「I gave a book Ken.」。正しいのはどちら？",
      choices: ["I gave a book Ken.", "I gave Ken a book. / I gave a book to Ken."],
      answer: "I gave Ken a book. / I gave a book to Ken.",
      why: "SVOO は「人 → 物」の順。物を先にするなら、人の前に to が必要です。",
      say: {
        question: "{seito}の、アイ ゲイブ ア ブック ケン。正しいのはどちら？",
        choices: ["アイ ゲイブ ア ブック ケン", "アイ ゲイブ ケン ア ブック。または、アイ ゲイブ ア ブック トゥー ケン"],
        answer: "アイ ゲイブ ケン ア ブック。または、アイ ゲイブ ア ブック トゥー ケン",
        why: "エス ブイ オー オーは、ひと、から、もの、の順。ものを先にするなら、ひとの前に、トゥーが必要です。",
      },
    },
    "mistake:2": {
      question: "{seito}の「My mother made a cake to me.」。正しいのはどちら？",
      choices: ["My mother made a cake to me.", "My mother made a cake for me."],
      answer: "My mother made a cake for me.",
      why: "make は「相手のために用意する」動詞なので for を使います。",
      say: {
        question: "{seito}の、マイ マザー メイド ア ケーキ トゥー ミー。正しいのはどちら？",
        choices: ["マイ マザー メイド ア ケーキ トゥー ミー", "マイ マザー メイド ア ケーキ フォー ミー"],
        answer: "マイ マザー メイド ア ケーキ フォー ミー",
        why: "メイクは、相手のために用意する、動詞なので、フォーを使います。",
      },
    },
    "check:1": {
      question: "We call him Taku. は SVOO と SVOC のどっち？",
      choices: ["SVOO", "SVOC"],
      answer: "SVOC",
      why: "him＝Taku の関係が成り立つ。",
      say: {
        question: "ウィー コール ヒム タク。は、エス ブイ オー オーと、エス ブイ オー シーの、どっち？",
        choices: ["エス ブイ オー オー", "エス ブイ オー シー"],
        answer: "エス ブイ オー シー",
        why: "ヒム、イコール、タクの、関係が成り立つ。",
      },
    },
    "mistake:3": {
      question: "{seito}の「The song made me happily.」。正しいのはどちら？",
      choices: ["The song made me happily.", "The song made me happy."],
      answer: "The song made me happy.",
      why: "C には形容詞や名詞が入ります。happily は副詞なので C になれません。",
      say: {
        question: "{seito}の、ザ ソング メイド ミー ハッピリー。正しいのはどちら？",
        choices: ["ザ ソング メイド ミー ハッピリー", "ザ ソング メイド ミー ハッピー"],
        answer: "ザ ソング メイド ミー ハッピー",
        why: "シーには、形容詞や、名詞が入ります。ハッピリーは、副詞なので、シーになれません。",
      },
    },
  },
};
