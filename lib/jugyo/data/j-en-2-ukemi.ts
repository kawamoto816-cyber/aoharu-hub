import type { UnitBase } from "../types";

// 止まる授業：受け身（中2・英語）の共通の骨組み（問題）。事実・例文・人名・年は lib/lecture/data/j-en-2-ukemi.ts の本文だけ。
// 英文は日本語の声で読むので、say ではカタカナに開く（例 was written →「ワズ リトゥン」、be動詞 →「ビー動詞」）。
// 独立宣言・告別演説の英文は本文にある部分だけを引き、実在の人物のせりふは作らない。
// せりふはキャストごと：j-en-2-ukemi.j-dark.ts（ダーク解説）・j-en-2-ukemi.j-kisaku.ts（気さくな兄・姉）。

export const UKEMI_BASE: UnitBase = {
  unitId: "j-en-2-ukemi",
  pauses: {
    "mistake:0": {
      question: "{seito}の「This letter was write by Ken.」。正しいのはどちら？",
      choices: ["This letter was write by Ken.", "This letter was written by Ken."],
      answer: "This letter was written by Ken.",
      why: "be動詞のあとは過去分詞。write は write - wrote - written と変化します。",
      say: {
        question: "{seito}の、ディス レター ワズ ライト バイ ケン。正しいのはどちら？",
        choices: ["ディス レター ワズ ライト バイ ケン", "ディス レター ワズ リトゥン バイ ケン"],
        answer: "ディス レター ワズ リトゥン バイ ケン",
        why: "ビー動詞のあとは、過去分詞。ライトは、ライト、ロウト、リトゥンと変化します。",
      },
    },
    "check:1": {
      question: "These pictures ___ taken by my father.（過去の文）の ___ に入る語は？",
      choices: ["was", "were"],
      answer: "were",
      why: "主語が複数で過去なので were。",
      say: {
        question: "ジーズ ピクチャーズ、空らん、テイクン バイ マイ ファーザー。過去の文です。空らんに入るごは？",
        choices: ["ワズ", "ワー"],
        answer: "ワー",
        why: "主語が複数で、過去なので、ワー。",
      },
    },
    "mistake:2": {
      question: "{seito}の「Did this book written by him?」。正しいのはどちら？",
      choices: ["Did this book written by him?", "Was this book written by him?"],
      answer: "Was this book written by him?",
      why: "受け身の疑問文は be動詞を主語の前に出します。did は使いません。",
      say: {
        question: "{seito}の、ディド ディス ブック リトゥン バイ ヒム。正しいのはどちら？",
        choices: ["ディド ディス ブック リトゥン バイ ヒム", "ワズ ディス ブック リトゥン バイ ヒム"],
        answer: "ワズ ディス ブック リトゥン バイ ヒム",
        why: "受け身の疑問文は、ビー動詞を、主語のまえに出します。ディドは使いません。",
      },
    },
    "check:0": {
      question: "They built this bridge in 2010. を受け身にしましょう。",
      answer: "This bridge was built in 2010.",
      why: "過去なので was built。they は「人々」で言わなくてもわかるので by them は省く。",
      say: {
        question: "ゼイ ビルト ディス ブリッジ イン トゥエンティ テン。を、受け身にしましょう。",
        answer: "ディス ブリッジ ワズ ビルト イン トゥエンティ テン",
        why: "過去なので、ワズ ビルト。ゼイは、人々で、言わなくてもわかるので、バイ ゼムは省く。",
      },
    },
  },
};
