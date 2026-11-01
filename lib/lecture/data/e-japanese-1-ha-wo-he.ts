import type { Lecture } from "../types";

export const E_JAPANESE_1_HA_WO_HE: Lecture = {
  unit: "e-japanese-1-ha-wo-he",
  nameRuby: "「は」「を」「へ」の使《つか》い方《かた》",
  title: "「は」「を」「へ」：音と 字が ちがう とき",
  hook: "「わたしわ」と 書《か》いて しまった ことは ないかな。「は」「を」「へ」は、読《よ》む 音と 書《か》く 字が ちがいます。きまりが 分《わ》かれば、もう まよいません。",
  sections: [
    {
      heading: "音と 字が ちがう 3つの 字",
      body: "ことばの あとの {{「は」「を」「へ」}}は、音と 字が ちがいます。「わ」と 読《よ》んで「は」と 書《か》きます。「お」は「を」、「え」は「へ」です。",
      figure: {
        type: "compare",
        title: "読《よ》む 音と 書《か》く 字",
        columns: [{ title: "読《よ》む 音", tone: "blue" }, { title: "書《か》く 字", tone: "yellow" }, { title: "れい", tone: "plain" }],
        rows: [
          { cells: ["わ", "は", "ぼくは 一年生"] },
          { cells: ["お", "を", "ほんを よむ"] },
          { cells: ["え", "へ", "学校へ いく"] },
        ],
      },
    },
    {
      heading: "「は」は だれ・なにの あと",
      body: "「ねこは」の ように、{{だれ・なにの あと}}に「は」を 書《か》きます。音は「わ」です。あいさつの「こんにちは」も「は」です。",
      figure: {
        type: "flow",
        title: "「は」の つく ばしょ",
        steps: [
          { label: "ねこ", sub: "なにが" },
          { label: "は", sub: "「わ」と 読《よ》む", tone: "yellow" },
          { label: "ねて いる", sub: "どう する" },
        ],
      },
    },
    {
      heading: "「を」と「へ」",
      body: "「りんごを たべる」の「を」は、{{なにを}} するかを あらわします。「学校へ いく」の「へ」は、{{いく さき}}を あらわします。どちらも ことばの あとに つきます。",
      figure: {
        type: "formula",
        title: "文の 中で 見つけよう",
        prose: true,
        steps: [
          { label: "は", expr: "ぼく{{は}} 一年生です。", note: "「わ」と 読《よ》む" },
          { label: "を", expr: "りんご{{を}} たべる。", note: "「お」と 読《よ》む" },
          { label: "へ", expr: "学校{{へ}} いく。", note: "「え」と 読《よ》む" },
        ],
      },
    },
    {
      heading: "ことばの 中は「わ」「お」「え」",
      body: "ことばの {{中に ある 音}}は、音の とおりに 書《か》きます。にわとり、おにぎり、えき です。「は」「を」「へ」は、{{ことばの あとに つく}} ときだけです。",
      figure: {
        type: "tree",
        title: "「わ」の 音を どう 書《か》く？",
        root: {
          label: "「わ」の 音",
          children: [
            { label: "ことばの あと", sub: "「は」と 書《か》く", tone: "yellow", children: [{ label: "ぼくは" }, { label: "ねこは" }] },
            { label: "ことばの 中", sub: "「わ」と 書《か》く", tone: "blue", children: [{ label: "にわとり" }, { label: "かわ" }] },
          ],
        },
      },
    },
  ],
  mistakes: [
    { wrong: "わたしわ 一年生です。", right: "わたしは 一年生です。", why: "だれの あとに つく「わ」の 音は、「は」と 書《か》きます。" },
    { wrong: "ほんお よむ。", right: "ほんを よむ。", why: "なにを するかの「お」の 音は、「を」と 書《か》きます。" },
    { wrong: "こうえんえ いく。", right: "こうえんへ いく。", why: "いく さきの「え」の 音は、「へ」と 書《か》きます。" },
    { wrong: "にはとり", right: "にわとり", why: "ことばの 中の 音は、音の とおりに「わ」です。" },
  ],
  check: [
    { q: "「ぼく□ いえ□ かえる。」□に 入る 字は？", a: "は・へ", why: "だれの あとは「は」、いく さきは「へ」です。" },
    { q: "「みず□ のむ。」□に 入る 字は？", a: "を", why: "なにを のむかを あらわすので「を」です。" },
    { q: "「こんにち□」□に 入る 字は？", a: "は", why: "あいさつの「こんにちは」は、さいごが「は」です。" },
  ],
  next: [
    { label: "「は」「を」「へ」ドリル", href: "/learn/kokugo-sho/e-japanese-1-ha-wo-he" },
    { label: "句読点《くとうてん》と かぎ（図解《ずかい》レクチャー）", href: "/learn/lecture/e-japanese-1-kutoten" },
    { label: "のばす 音・ねじれた 音・つまる 音（図解《ずかい》レクチャー）", href: "/learn/lecture/e-japanese-1-kana-on" },
  ],
};
