import type { Lecture } from "../types";

export const E_MATH_1_IKUTSU: Lecture = {
  unit: "e-math-1-ikutsu",
  title: "いくつといくつ：かずを2つにわける",
  hook: "あめが5こあります。2人でわけると、どうなるかな。かずを2つにわけると、けいさんがらくになります。",
  sections: [
    {
      heading: "5をわけてみる",
      body: "5こを2つにわけると、{{1と4、2と3}}などになります。わけかたは、1つではありません。どれも、あわせると5です。",
      figure: {
        type: "area",
        kind: "bar",
        title: "5は いくつと いくつ",
        max: 5,
        bars: [
          { label: "1と4", parts: [{ value: 1, label: "1", tone: "yellow" }, { value: 4, label: "4", tone: "blue" }], total: "5" },
          { label: "2と3", parts: [{ value: 2, label: "2", tone: "yellow" }, { value: 3, label: "3", tone: "blue" }], total: "5" },
          { label: "3と2", parts: [{ value: 3, label: "3", tone: "yellow" }, { value: 2, label: "2", tone: "blue" }], total: "5" },
          { label: "4と1", parts: [{ value: 4, label: "4", tone: "yellow" }, { value: 1, label: "1", tone: "blue" }], total: "5" },
        ],
        note: "おびのながさは、どれもおなじ5です。",
      },
    },
    {
      heading: "わけかたは、じゅんばんに",
      body: "{{1つずつずらす}}と、わけかたがもれなく見つかります。左が1ふえると、右は1へります。",
      figure: {
        type: "formula",
        title: "6を じゅんばんに わける",
        prose: true,
        steps: [
          { expr: "6は 1と 5" },
          { expr: "6は {{2}}と {{4}}", note: "左が1ふえる" },
          { expr: "6は {{3}}と {{3}}", note: "右は1へる" },
          { expr: "6は {{4}}と {{2}}" },
          { expr: "6は {{5}}と {{1}}" },
        ],
      },
    },
    {
      heading: "10は いくつと いくつ",
      body: "{{10をつくる}}くみあわせは、とくにだいじです。1と9、2と8、3と7、4と6、5と5です。くりあがりのけいさんで、よくつかいます。",
      figure: {
        type: "compare",
        title: "あと いくつで 10",
        columns: [{ title: "かず", tone: "blue" }, { title: "あといくつで10", tone: "yellow" }],
        rows: [
          { cells: ["1", "9"] },
          { cells: ["2", "8"] },
          { cells: ["3", "7"] },
          { cells: ["4", "6"] },
          { cells: ["5", "5"] },
        ],
        note: "6と4、7と3は、左右をいれかえたものです。",
      },
    },
    {
      heading: "かくれたかずを見つける",
      body: "8こあって、3こは見えています。{{8は3と5}}だから、かくれているのは5こです。わけかたをおぼえると、すぐにわかります。",
      figure: {
        type: "area",
        kind: "bar",
        title: "8こ のうち 3こ が見える",
        max: 8,
        bars: [
          { label: "ぜんぶ", parts: [{ value: 8, label: "8", tone: "blue" }], total: "8こ" },
          { label: "わけると", parts: [{ value: 3, label: "見える 3", tone: "plain" }, { value: 5, label: "かくれた 5", tone: "yellow" }], total: "8こ" },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "10は 3と 6", right: "10は 3と 7", why: "3と6は9です。おはじきでたしかめます。" },
    { wrong: "5のわけかたは、1つだけ", right: "1と4、2と3、3と2、4と1", why: "1つずつずらすと、いくつも見つかります。" },
  ],
  check: [
    { q: "9は、4といくつですか。", a: "5", why: "4と5をあわせると9です。" },
    { q: "10は、7といくつですか。", a: "3", why: "7と3で10です。" },
    { q: "6のわけかたは、いくつありますか。0はつかいません。", a: "5とおり", why: "1と5から5と1まで、5つです。" },
  ],
  next: [
    { label: "「いくつといくつ」ドリル", href: "/learn/sansu-zukei/e-math-1-ikutsu" },
    { label: "つぎは「たしざん」", href: "/learn/sansu/1" },
    { label: "「くりあがりのあるたしざん」", href: "/learn/sansu/4" },
  ],
};
