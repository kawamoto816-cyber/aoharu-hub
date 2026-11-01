import type { Lecture } from "../types";

export const E_JAPANESE_1_HIRAGANA: Lecture = {
  unit: "e-japanese-1-hiragana",
  title: "ひらがなは 1つの 字で 1つの 音",
  hook: "「あめ」は、「あ」と 「め」の 2つの 字です。ひらがなが かけると、なんでも 字で つたえられます。",
  sections: [
    {
      heading: "1つの 字で 1つの 音",
      body: "ひらがなは、{{1つの 字で 1つの 音}}を あらわします。「さくら」は、さ・く・らの 3つの 音です。手を たたいて かぞえて みましょう。",
      figure: {
        type: "area",
        kind: "bar",
        title: "ことばを 音に わける",
        max: 5,
        bars: [
          { label: "あめ", parts: [{ value: 1, label: "あ", tone: "blue" }, { value: 1, label: "め", tone: "yellow" }], total: "2つ" },
          {
            label: "さくら",
            parts: [{ value: 1, label: "さ", tone: "blue" }, { value: 1, label: "く", tone: "yellow" }, { value: 1, label: "ら", tone: "blue" }],
            total: "3つ",
          },
          {
            label: "かたつむり",
            parts: [
              { value: 1, label: "か", tone: "blue" },
              { value: 1, label: "た", tone: "yellow" },
              { value: 1, label: "つ", tone: "blue" },
              { value: 1, label: "む", tone: "yellow" },
              { value: 1, label: "り", tone: "blue" },
            ],
            total: "5つ",
          },
        ],
        note: "字の かずと、手を たたく かずが おなじです。",
      },
    },
    {
      heading: "あいうえおの ならび",
      body: "ひらがなは、{{「あいうえお」}}の じゅんに ならべます。たてに 5つずつ、よこに 10の ならびです。これを {{五十音}}と いいます。",
      figure: {
        type: "compare",
        title: "五十音の はじめの ほう",
        columns: [{ title: "あの ならび", tone: "blue" }, { title: "かの ならび" }, { title: "さの ならび" }],
        rows: [
          { cells: ["あ", "か", "さ"] },
          { cells: ["い", "き", "し"] },
          { cells: ["う", "く", "す"] },
          { cells: ["え", "け", "せ"] },
          { cells: ["お", "こ", "そ"] },
        ],
        note: "よこに よむと、「あかさ」「いきし」と ならびます。",
      },
    },
    {
      heading: "にて いる 字に 気を つけよう",
      body: "{{「ね」「れ」「わ」}}は、かたちが にて います。ちがうのは、さいごの ところです。「ぬ」と 「め」は、まるが あるか ないかです。「る」と 「ろ」も おなじです。",
      figure: {
        type: "compare",
        title: "「ね」「れ」「わ」の ちがい",
        columns: [{ title: "ね", tone: "blue" }, { title: "れ", tone: "yellow" }, { title: "わ", tone: "red" }],
        rows: [
          { cells: ["さいごに わを つくる", "さいごは 上に はねる", "さいごは まるく おりる"] },
          { cells: ["ねこの ね", "れもんの れ", "わにの わ"] },
        ],
      },
    },
    {
      heading: "てんてんと まる",
      body: "「か」に {{てんてん（゛）}}を つけると、「が」に なります。にごった 音に なります。{{まる（゜）}}が つくのは、「は・ひ・ふ・へ・ほ」だけです。",
      figure: {
        type: "formula",
        title: "てんてんと まるで かわる 字",
        prose: true,
        steps: [
          { label: "てんてん", expr: "か ＋ ゛ → {{が}}", note: "がっこうの が" },
          { label: "てんてん", expr: "た ＋ ゛ → {{だ}}", note: "だんごの だ" },
          { label: "てんてん", expr: "は ＋ ゛ → {{ば}}", note: "ばななの ば" },
          { label: "まる", expr: "は ＋ ゜ → {{ぱ}}", note: "ぱんだの ぱ" },
        ],
      },
    },
    {
      heading: "ていねいに かこう",
      body: "字は、ます目の まん中に かきます。かきじゅんを まもって、ゆっくり かきましょう。とめ・はね・はらいも 大事《だいじ》です。",
    },
  ],
  mistakes: [
    { wrong: "「ぬ」と 「め」を まちがえる", right: "ぬは さいごに まるが ある", why: "まるが ないのが 「め」です。" },
    { wrong: "「か」に まるを つける", right: "まるは 「は」の ならびだけ", why: "「か」には てんてんを つけます。" },
    { wrong: "「ほ」の よこぼうを 1本に する", right: "ほは よこぼうが 2本", why: "1本だと 「は」に なります。" },
  ],
  check: [
    { q: "「かたつむり」は いくつの 音？", a: "5つ", why: "か・た・つ・む・りの 5つです。" },
    { q: "「た」に てんてんを つけると？", a: "だ", why: "にごった 音に なります。" },
    { q: "まるが つくのは、どの ならび？", a: "はの ならび", why: "は・ひ・ふ・へ・ほだけです。" },
  ],
  next: [
    { label: "「ひらがな」ドリル", href: "/learn/kokugo-sho/e-japanese-1-hiragana" },
    { label: "つぎは 「かたかな」", href: "/learn/kokugo-sho/e-japanese-1-katakana" },
    { label: "のばす音・ねじれた音・つまる音", href: "/learn/kokugo-sho/e-japanese-1-kana-on" },
  ],
};
