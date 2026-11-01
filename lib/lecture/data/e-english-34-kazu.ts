import type { Lecture } from "../types";

export const E_ENGLISH_34_KAZU: Lecture = {
  unit: "e-english-34-kazu",
  title: "数は 1〜12 を覚《おぼ》えれば、あとは -teen と -ty で作れる",
  hook: "ゲームの点数、クラスの人数、ボールの数。数は毎日のくらしの中にたくさんあります。英語《えいご》の数は、はじめの12こを覚《おぼ》えると、あとはきまりで作れます。聞いて、まねして、声に出して数えてみましょう。",
  sections: [
    {
      heading: "1〜10 は、そのまま覚《おぼ》える",
      body: "1から10は、一つずつ {{そのまま覚《おぼ》える}} 言葉です。指をおりながら、声に出して数えると覚《おぼ》えやすくなります。{{three}}（3）は口の形、{{five}}（5）と {{seven}}（7）は「v」の音に気をつけて聞きましょう。",
      figure: {
        type: "compare",
        title: "1〜10 の言い方",
        columns: [{ title: "1〜5", tone: "blue" }, { title: "6〜10", tone: "yellow" }],
        rows: [
          { cells: ["1 one", "6 six"] },
          { cells: ["2 two", "7 seven"] },
          { cells: ["3 three", "8 eight"] },
          { cells: ["4 four", "9 nine"] },
          { cells: ["5 five", "10 ten"] },
        ],
      },
    },
    {
      heading: "11〜19 は -teen がつく",
      body: "11は {{eleven}}、12は {{twelve}} で、これだけは {{特別《とくべつ》}} な言い方です。13から19は、終わりに {{-teen}} がつきます。fourteen（14）や sixteen（16）のように、4や6の言葉に -teen をつけるものが多いです。",
      figure: {
        type: "tree",
        title: "11〜19 の言い方",
        root: {
          label: "11〜19",
          tone: "navy",
          children: [
            { label: "11・12", sub: "eleven / twelve", tone: "red" },
            { label: "13〜19", sub: "終わりに -teen", tone: "yellow", children: [
              { label: "thirteen", sub: "13" },
              { label: "fourteen", sub: "14" },
              { label: "fifteen", sub: "15" },
            ] },
          ],
        },
        note: "13 thirteen と 15 fifteen は、3・5 の言葉と少し形が変《か》わる。",
      },
    },
    {
      heading: "20、30、40… は -ty がつく",
      body: "10のまとまりの数は、終わりに {{-ty}} がつきます。20は {{twenty}}、30は {{thirty}}、50は {{fifty}} です。40は {{forty}} で、four の u がなくなるので気をつけましょう。100は {{one hundred}} です。",
      figure: {
        type: "numberline",
        title: "10 とびの数",
        min: 0,
        max: 100,
        tick: 10,
        points: [
          { x: 20, label: "twenty", tone: "blue" },
          { x: 50, label: "fifty", tone: "yellow" },
          { x: 80, label: "eighty", tone: "red" },
        ],
      },
    },
    {
      heading: "-teen と -ty を聞き分ける",
      body: "thirteen（13）と thirty（30）は、音がよくにています。{{-teen}} は {{後ろを強く長め}} に、{{-ty}} は {{前を強く}} 言います。聞くときは、どこが強いかに耳をすませると、聞き分けられます。",
      figure: {
        type: "compare",
        title: "にている数のペア",
        columns: [{ title: "-teen（後ろが強い）", tone: "yellow" }, { title: "-ty（前が強い）", tone: "blue" }],
        rows: [
          { cells: ["13 thirteen", "30 thirty"] },
          { cells: ["14 fourteen", "40 forty"] },
          { cells: ["15 fifteen", "50 fifty"] },
        ],
      },
    },
    {
      heading: "21〜99 と How many?",
      body: "21から99は、{{10のまとまりの数}} と {{1〜9}} をつなげて言います。twenty と one で {{twenty-one}}（21）です。数をたずねるときは {{How many 〜?}} と聞き、答えは数だけで言えます。",
      figure: {
        type: "formula",
        title: "数をつなげる・数をたずねる",
        prose: true,
        steps: [
          { label: "21", expr: "twenty ＋ one → {{twenty-one}}" },
          { label: "35", expr: "thirty ＋ five → {{thirty-five}}" },
          { label: "聞く", expr: "{{How many}} pencils?" },
          { label: "答える", expr: "{{Seven.}}", note: "えんぴつが7本" },
        ],
      },
    },
  ],
  mistakes: [
    {
      wrong: "11 を oneteen、12 を twoteen と言う",
      right: "11 は eleven、12 は twelve",
      why: "11と12は、-teen のきまりを使わない特別《とくべつ》な言い方です。",
    },
    {
      wrong: "40 を fourty と書く",
      right: "40 は forty",
      why: "four（4）とちがって、40 には u が入りません。",
    },
    {
      wrong: "thirteen と thirty を同じように言う",
      right: "-teen は後ろ、-ty は前を強く言う",
      why: "強く言う所がちがうので、聞く人はそこで13か30かを聞き分けます。",
    },
  ],
  check: [
    { q: "「15」は英語《えいご》で何と言う？", a: "fifteen", why: "13〜19 は -teen がつきます。five ではなく fif になります。" },
    { q: "「40」は英語《えいご》で何と言う？", a: "forty", why: "10のまとまりの数は -ty。four の u はつきません。" },
    { q: "How many apples? と聞かれました。りんごが3こなら？", a: "Three.", why: "How many? には数で答えます。" },
  ],
  next: [
    { label: "「数の言い方」のカード", href: "/learn/eigo-sho/e-english-34-kazu" },
    { label: "図解《ずかい》レクチャー「あいさつと気持ち」", href: "/learn/lecture/e-english-34-aisatsu" },
    { label: "「色・形の言い方」のカード", href: "/learn/eigo-sho/e-english-34-iro-katachi" },
  ],
};
