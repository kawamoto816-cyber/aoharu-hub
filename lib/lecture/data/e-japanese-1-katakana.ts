import type { Lecture } from "../types";

export const E_JAPANESE_1_KATAKANA: Lecture = {
  unit: "e-japanese-1-katakana",
  title: "かたかな：おなじ 音の、べつの 字",
  hook: "おみせで「パン」や「ジュース」の 字を 見た ことが あるかな。あれが かたかなです。かたかなが 読《よ》めると、まちの 字が もっと 読《よ》めます。",
  sections: [
    {
      heading: "ひらがなと かたかなは なかま",
      body: "かたかなは、ひらがなと {{おなじ 音}}を あらわす 字です。「あ」は「ア」、「か」は「カ」と 書《か》きます。ちがうのは、字の {{形《かたち》}}だけです。",
      figure: {
        type: "compare",
        title: "おなじ 音の 2つの 字",
        columns: [{ title: "ひらがな", tone: "blue" }, { title: "かたかな", tone: "yellow" }],
        rows: [
          { cells: ["あ", "ア"] },
          { cells: ["か", "カ"] },
          { cells: ["く", "ク"] },
          { cells: ["ね", "ネ"] },
        ],
        note: "「く」と「ク」の ように、にて いる 字も あります。",
      },
    },
    {
      heading: "にて いる かたかなに 気を つける",
      body: "「シ」と「ツ」、「ソ」と「ン」は よく にて います。見分《みわ》ける かぎは、{{点《てん》の ならび}}です。もう 1つは、{{さいごの 線《せん》の むき}}です。",
      figure: {
        type: "compare",
        title: "シ・ツ・ソ・ンの 見分《みわ》け方《かた》",
        columns: [{ title: "点《てん》", tone: "blue" }, { title: "さいごの 線《せん》", tone: "yellow" }],
        rows: [
          { label: "シ", cells: ["2つ たてに", "下から 上へ"] },
          { label: "ツ", cells: ["2つ よこに", "上から 下へ"] },
          { label: "ソ", cells: ["1つ", "上から 下へ"] },
          { label: "ン", cells: ["1つ", "下から 上へ"] },
        ],
        note: "「シ」と「ン」は、下から 上へ はらいます。",
      },
    },
    {
      heading: "のばす 音と 小さい 字",
      body: "かたかなで のばす 音は、{{「ー」}}で 書《か》きます。ケーキ、ボールの ように です。つまる 音は 小さい{{「ッ」}}で 書《か》きます。ねじれた 音は 小さい{{「ャ」「ュ」「ョ」}}です。",
      figure: {
        type: "formula",
        title: "かたかなで 書《か》いて みよう",
        prose: true,
        steps: [
          { label: "のばす", expr: "けえき → ケ{{ー}}キ", note: "「ー」で のばす" },
          { label: "つまる", expr: "ろけっと → ロケ{{ッ}}ト", note: "小さい「ッ」" },
          { label: "ねじれた", expr: "しゃつ → シ{{ャ}}ツ", note: "小さい「ャ」" },
        ],
      },
    },
    {
      heading: "かたかなで 書《か》く ことば",
      body: "{{がいこくから きた ことば}}は、かたかなで 書《か》きます。パン、テレビ、バスなどです。もとから ある ことばは、ひらがなや 漢字《かんじ》で 書《か》きます。",
      figure: {
        type: "tree",
        title: "どちらで 書《か》く？",
        root: {
          label: "ことば",
          children: [
            { label: "かたかな", sub: "がいこくから きた", tone: "yellow", children: [{ label: "パン" }, { label: "テレビ" }] },
            { label: "ひらがな", sub: "もとから ある", tone: "blue", children: [{ label: "いぬ" }, { label: "つくえ" }] },
          ],
        },
      },
    },
  ],
  mistakes: [
    { wrong: "「キリン」を「キリソ」と 書《か》く", right: "キリン", why: "「ン」は 下から 上へ はらいます。「ソ」は 上から 下へ です。" },
    { wrong: "「シャツ」を「ツャツ」と 書《か》く", right: "シャツ", why: "「シ」は 点《てん》が たて、「ツ」は 点《てん》が よこです。" },
    { wrong: "「ケーキ」を「ケエキ」と 書《か》く", right: "ケーキ", why: "かたかなの のばす 音は「ー」で 書《か》きます。" },
    { wrong: "「ロケット」を「ロケツト」と 書《か》く", right: "ロケット", why: "つまる 音は、小さい「ッ」で 書《か》きます。" },
  ],
  check: [
    { q: "「ね」を かたかなで 書《か》くと？", a: "ネ", why: "「ね」と「ネ」は おなじ 音です。" },
    { q: "「こっぷ」を かたかなで 書《か》くと？", a: "コップ", why: "つまる 音は 小さい「ッ」。「ぷ」は「プ」です。" },
    { q: "「いぬ」「バス」「やま」。かたかなで 書《か》く ことばは？", a: "バス", why: "バスは、がいこくから きた ことばです。" },
  ],
  next: [
    { label: "「かたかな」ドリル", href: "/learn/kokugo-sho/e-japanese-1-katakana" },
    { label: "のばす 音・ねじれた 音・つまる 音（図解《ずかい》レクチャー）", href: "/learn/lecture/e-japanese-1-kana-on" },
    { label: "2年「かたかなで 書《か》く 言葉《ことば》」", href: "/learn/kokugo-sho/e-japanese-2-katakana" },
  ],
};
