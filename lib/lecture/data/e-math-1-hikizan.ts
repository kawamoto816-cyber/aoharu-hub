import type { Lecture } from "../types";

export const E_MATH_1_HIKIZAN: Lecture = {
  unit: "e-math-1-hikizan",
  nameRuby: "ひき算《ざん》",
  title: "ひきざん：のこり・ちがい",
  hook: "クッキーが5こ。2こたべると、のこりはなんこかな。へったり、くらべたりするときは、ひきざんです。",
  sections: [
    {
      heading: "のこりは、いくつ",
      body: "5こから2こたべると、{{のこりは3こ}}です。しきは {{5−2＝3}} とかきます。「−」は、「ひく」とよみます。",
      figure: {
        type: "area",
        kind: "bar",
        title: "5こから 2こ たべる",
        max: 5,
        bars: [
          { label: "はじめ", parts: [{ value: 5, label: "5", tone: "blue" }], total: "5こ" },
          { label: "たべたあと", parts: [{ value: 3, label: "のこり 3", tone: "yellow" }, { value: 2, label: "たべた 2", tone: "red" }], total: "5こ" },
        ],
      },
    },
    {
      heading: "ちがいは、いくつ",
      body: "犬が6ぴき、ねこが4ひきいます。1ぴきずつならべると、{{ちがい}}が見えます。6−4＝2で、犬が2ひきおおいです。",
      figure: {
        type: "area",
        kind: "bar",
        title: "ならべて くらべる",
        max: 6,
        bars: [
          { label: "犬", parts: [{ value: 4, label: "4", tone: "blue" }, { value: 2, label: "ちがい 2", tone: "yellow" }], total: "6ぴき" },
          { label: "ねこ", parts: [{ value: 4, label: "4", tone: "blue" }], total: "4ひき" },
        ],
        note: "あまったところが、ちがいです。",
      },
    },
    {
      heading: "ひきざんは、いくつといくつ",
      body: "5−2は、「{{5は2といくつ}}」とおなじです。いくつといくつをおぼえていると、すぐわかります。たしざんで、たしかめられます。",
      figure: {
        type: "formula",
        title: "5−2を いくつといくつで",
        prose: true,
        steps: [
          { label: "しき", expr: "5 − 2 ＝ □" },
          { label: "かんがえ", expr: "5は 2と {{3}}" },
          { label: "こたえ", expr: "5 − 2 ＝ {{3}}" },
          { label: "たしかめ", expr: "2 ＋ 3 ＝ 5", note: "もとにもどる" },
        ],
      },
    },
    {
      heading: "0のひきざん",
      body: "3−3は、ぜんぶなくなるので{{0}}です。3−0は、なにもへらないので3です。",
      figure: {
        type: "compare",
        title: "0が出てくる ひきざん",
        columns: [{ title: "しき", tone: "blue" }, { title: "ようす" }, { title: "こたえ", tone: "yellow" }],
        rows: [
          { cells: ["3−3", "ぜんぶへる", "0"] },
          { cells: ["3−0", "へらない", "3"] },
          { cells: ["0−0", "なにもない", "0"] },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "5こから2こで「2−5」とかく", right: "5−2", why: "はじめのかずを、先にかきます。" },
    { wrong: "ちがいを「6＋4＝10」とする", right: "6−4＝2", why: "「ちがいは」「なんこおおい」は、ひきざんです。" },
    { wrong: "3−0＝0", right: "3−0＝3", why: "0をひくのは、へらないこと。3のままです。" },
  ],
  check: [
    { q: "7−3は、いくつですか。", a: "4", why: "7は3と4です。" },
    { q: "8−8は、いくつですか。", a: "0", why: "ぜんぶなくなるので0です。" },
    { q: "赤いふうせんが9こ、青いふうせんが5こ。どちらがなんこおおいですか。", a: "赤が4こおおい", why: "ちがいなので、9−5＝4です。" },
  ],
  next: [
    { label: "計算《けいさん》の段《だん》「ひきざん」", href: "/learn/sansu/2" },
    { label: "ふりかえり「いくつといくつ」", href: "/learn/sansu-zukei/e-math-1-ikutsu" },
    { label: "「くりさがりのあるひきざん」", href: "/learn/sansu/5" },
  ],
};
