import type { UnitBase } from "../types";

// 止まる授業：アルファベットを書く（小5・6外国語）の共通の骨組み（問題）。事実・例の語・年は lib/lecture/data/e-english-56-alpha-kaku.ts の本文だけ。
// 英文・アルファベットは日本語の声で読むので、say ではカタカナに開く（例 hand →「ハンド」、g →「ジー」、I like dogs. →「アイ ライク ドッグズ」）。
// 大文字と小文字・ピリオドのちがいは耳では分からないので、選択肢の読みは「小文字のアイで始める」のように、ちがいをことばで言う。
// せりふはキャストごと：e-english-56-alpha-kaku.e-pop.ts（ポップ掛け合い）・e-english-56-alpha-kaku.e-yasashi.ts（やさしい先生と生徒）。
// 読み：「上」「下」「中」「分」は say でひらがなに開く（うえのへや・したのへや・まんなかのへや・ひとつぶん）。

export const ALPHA_KAKU_BASE: UnitBase = {
  unitId: "e-english-56-alpha-kaku",
  pauses: {
    "check:2": {
      question: "大文字《おおもじ》は、どの線《せん》からどの線《せん》の間《あいだ》に書《か》く？",
      choices: ["1本目から3本目の間", "1本目から4本目の間"],
      answer: "1本目から3本目の間",
      why: "大文字は上の部屋と真ん中の部屋を使う。",
      say: {
        choices: ["いっぽんめから、さんぼんめの、あいだ", "いっぽんめから、よんほんめの、あいだ"],
        answer: "いっぽんめから、さんぼんめの、あいだ",
        why: "大文字は、うえのへやと、まんなかのへやを使う。",
      },
    },
    "mistake:0": {
      question: "{seito}の言《い》ったこと。y や g は、どう書《か》く？",
      choices: ["y や g を真ん中の部屋の中に小さく書く", "下の部屋までのばして書く"],
      answer: "下の部屋までのばして書く",
      why: "のびる部分がないと、v や a などと見分けにくくなります。",
      say: {
        question: "{seito}の言ったこと。ワイや、ジーは、どう書く？",
        choices: ["ワイや、ジーを、まんなかのへやのなかに、小さく書く", "したのへやまで、のばして書く"],
        answer: "したのへやまで、のばして書く",
        why: "のびる部分がないと、ブイや、エーなどと、見分けにくくなります。",
      },
    },
    "mistake:2": {
      question: "{seito}の「i am from Japan.」。正《ただ》しいのはどちら？",
      choices: ["i am from Japan.", "I am from Japan."],
      answer: "I am from Japan.",
      why: "I は文のはじめでなくても、いつも大文字です。",
      say: {
        question: "{seito}の、小文字のアイで始めた、アイ アム フロム ジャパン。正しいのはどちら？",
        choices: ["小文字のアイで始める、アイ アム フロム ジャパン", "大文字のアイで始める、アイ アム フロム ジャパン"],
        answer: "大文字のアイで始める、アイ アム フロム ジャパン",
        why: "アイは、文のはじめでなくても、いつも大文字です。",
      },
    },
    "mistake:3": {
      question: "{seito}の「Ilikedogs.」。正《ただ》しいのはどちら？",
      choices: ["Ilikedogs.", "I like dogs."],
      answer: "I like dogs.",
      why: "単語と単語の間は、小文字1つ分くらいあけます。",
      say: {
        question: "{seito}の、すきまなしの、アイライクドッグズ。正しいのはどちら？",
        choices: ["すきまなしの、アイライクドッグズ", "単語のあいだをあけた、アイ ライク ドッグズ"],
        answer: "単語のあいだをあけた、アイ ライク ドッグズ",
        why: "単語と単語のあいだは、こもじ、ひとつぶんくらい、あけます。",
      },
    },
    "check:1": {
      question: "do you like music を正《ただ》しく書《か》き直《なお》すと？",
      choices: ["Do you like music?", "do you like music."],
      answer: "Do you like music?",
      why: "文のはじめは大文字、たずねる文なので ? をつける。",
      say: {
        question: "小文字だけで、記号もない、ドゥー ユー ライク ミュージック。正しく書き直すと？",
        choices: ["大文字のディーで始めて、クエスチョンマークで終わる", "小文字のディーで始めて、ピリオドで終わる"],
        answer: "大文字のディーで始めて、クエスチョンマークで終わる",
        why: "文のはじめは大文字、たずねる文なので、クエスチョンマークをつける。",
      },
    },
  },
};
