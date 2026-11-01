import type { Lecture } from "../types";

export const J_EN_3_KANKEI: Lecture = {
  unit: "j-en-3-kankei",
  title: "関係代名詞は、名詞のうしろに「説明の文」をつなぐ接着剤",
  hook: "「メガネをかけている男の人」「私がきのう買った本」。日本語では説明を名詞の前に置きますが、英語では名詞のうしろに置きます。そのつなぎ役が関係代名詞の who・which・that です。長文読解では、どこからどこまでが名詞の説明かを見ぬく力が欠かせません。",
  sections: [
    {
      heading: "説明は名詞のうしろにつく",
      body: "関係代名詞は、2つの文を1つにして、名詞を{{うしろから説明}}するときに使います。説明される名詞を{{先行詞}}といいます。I have a friend. と He lives in Canada. を合わせると、I have a friend {{who}} lives in Canada.（私にはカナダに住んでいる友だちがいる）になります。he が who にかわり、先行詞 a friend のすぐあとに来ます。",
      figure: {
        type: "formula",
        title: "2つの文を who でつなぐ",
        prose: true,
        steps: [
          { label: "文1", expr: "I have {{a friend}}.", note: "a friend が先行詞になる" },
          { label: "文2", expr: "{{He}} lives in Canada.", note: "He ＝ a friend" },
          { label: "1文に", expr: "I have a friend {{who}} lives in Canada.", note: "He を who にかえて、a friend のうしろへ" },
        ],
      },
    },
    {
      heading: "先行詞が「人」か「もの」かで選ぶ",
      body: "先行詞が{{人}}なら who、{{もの・動物}}なら which を使います。{{that}} は人にももの・動物にも使えます。さらに、関係代名詞のあとに動詞が続くか（主格）、主語＋動詞が続くか（目的格）で、使える語が少し変わります。人が先行詞の目的格は、中学では that を使うのが基本です（会話では who も使われます）。",
      figure: {
        type: "compare",
        title: "関係代名詞の使い分け",
        columns: [{ title: "先行詞" }, { title: "主格（＋動詞）", tone: "blue" }, { title: "目的格（＋主語＋動詞）", tone: "yellow" }],
        rows: [
          { cells: ["人", "who / that", "that（省略できる）"] },
          { cells: ["もの・動物", "which / that", "which / that（省略できる）"] },
        ],
        note: "目的格の関係代名詞は省略できる：the book (that) I bought。",
      },
    },
    {
      heading: "主格か目的格かは、すぐあとを見る",
      body: "関係代名詞の{{すぐあと}}を見ます。動詞が来ていれば関係代名詞が説明の文の主語になっている{{主格}}です。主語＋動詞が来ていれば、関係代名詞が目的語の役をしている{{目的格}}で、省略することもできます。The girl who is singing（歌っている少女）は主格、the picture which I took（私がとった写真）は目的格です。",
      figure: {
        type: "tree",
        title: "who / which / that を選ぶ",
        root: {
          label: "先行詞",
          children: [
            {
              label: "人",
              tone: "blue",
              children: [
                { label: "＋動詞", sub: "主格", children: [{ label: "who / that" }] },
                { label: "＋主語＋動詞", sub: "目的格", children: [{ label: "that", sub: "省略できる" }] },
              ],
            },
            {
              label: "もの・動物",
              tone: "yellow",
              children: [
                { label: "＋動詞", sub: "主格", children: [{ label: "which / that" }] },
                { label: "＋主語＋動詞", sub: "目的格", children: [{ label: "which / that", sub: "省略できる" }] },
              ],
            },
          ],
        },
      },
    },
    {
      heading: "長い主語に気をつける",
      body: "先行詞が文の主語のとき、説明の部分が終わったところに{{文全体の動詞}}が来ます。The boy who is talking with Ms. Sato {{is}} my brother. では、who 〜 Sato までが The boy の説明で、文の動詞は is です。説明の部分をカッコでくくると、文の骨組みが見えます。",
    },
  ],
  mistakes: [
    { wrong: "I have a dog who runs fast.", right: "I have a dog which (that) runs fast.", why: "先行詞が動物（もの）のときは which か that を使います。" },
    { wrong: "This is the book which I bought it yesterday.", right: "This is the book which I bought yesterday.", why: "which が bought の目的語の役をしているので、it は重ねて書きません。" },
    { wrong: "The girl who live next door is kind.", right: "The girl who lives next door is kind.", why: "主格の関係代名詞のあとの動詞は先行詞（the girl＝3人称単数）に合わせて -s がつきます。" },
  ],
  check: [
    { q: "This is the cake (who / which) my mother made. の正しい方は？", a: "which", why: "先行詞 the cake はもの。" },
    { q: "the man who is standing there の意味は？", a: "そこに立っている男の人", why: "who is standing there が the man をうしろから説明している。" },
    { q: "The movie that I saw yesterday was interesting. で省略できる語は？", a: "that", why: "that のあとが主語＋動詞（I saw）なので目的格。目的格は省略できる。" },
  ],
  next: [
    { label: "4択ドリル「関係代名詞」に挑戦", href: "/learn/eibunpo-chu/j-en-3-kankei" },
    { label: "うしろから説明するなかま「分詞の後置修飾」", href: "/learn/eibunpo-chu/j-en-3-bunshi" },
    { label: "つぎに「間接疑問文」", href: "/learn/eibunpo-chu/j-en-3-kansetsu" },
  ],
};
