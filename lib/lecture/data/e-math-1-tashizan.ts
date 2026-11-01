import type { Lecture } from "../types";

export const E_MATH_1_TASHIZAN: Lecture = {
  unit: "e-math-1-tashizan",
  nameRuby: "たし算《ざん》",
  title: "たしざん：あわせる・ふえる",
  hook: "赤いあめが3こ、青いあめが2こ。あわせると、なんこかな。こんなときにつかうのが、たしざんです。",
  sections: [
    {
      heading: "あわせると、いくつ",
      body: "2つのものを{{あわせる}}ときは、たしざんです。3こと2こをあわせると、5こです。しきは {{3＋2＝5}} とかきます。",
      figure: {
        type: "area",
        kind: "bar",
        title: "3こと2こを あわせる",
        max: 5,
        bars: [
          { label: "赤いあめ", parts: [{ value: 3, label: "3", tone: "red" }], total: "3こ" },
          { label: "青いあめ", parts: [{ value: 2, label: "2", tone: "blue" }], total: "2こ" },
          { label: "あわせると", parts: [{ value: 3, label: "3", tone: "red" }, { value: 2, label: "2", tone: "blue" }], total: "5こ" },
        ],
      },
    },
    {
      heading: "ふえると、いくつ",
      body: "はじめにあったものが{{ふえる}}ときも、たしざんです。とりが4わいて、2わきました。4＋2＝6で、6わです。",
      figure: {
        type: "flow",
        title: "4わに 2わ ふえる",
        steps: [
          { label: "4わ", sub: "はじめ" },
          { label: "2わ", sub: "あとからきた" },
          { label: "6わ", sub: "ぜんぶで", tone: "yellow" },
        ],
        arrows: ["そこへ", "4＋2＝6"],
      },
    },
    {
      heading: "しきのよみかた",
      body: "「＋」は{{たす}}、「＝」は{{は}}とよみます。3＋2＝5は、「3たす2は5」です。こたえには、「こ」や「わ」をつけます。",
      figure: {
        type: "formula",
        title: "しきを よむ",
        prose: true,
        steps: [
          { label: "しき", expr: "3 ＋ 2 ＝ 5" },
          { label: "よむ", expr: "3 {{たす}} 2 {{は}} 5" },
          { label: "こたえ", expr: "{{5こ}}", note: "なにがいくつか" },
        ],
      },
    },
    {
      heading: "0のたしざんと、いれかえ",
      body: "なにもふえないときは、{{0をたす}}といいます。3＋0は3で、かずはかわりません。また、{{2＋3も3＋2も5}}です。",
      figure: {
        type: "compare",
        title: "かわらない たしざん",
        columns: [{ title: "しき", tone: "blue" }, { title: "こたえ", tone: "yellow" }, { title: "わけ" }],
        rows: [
          { cells: ["3＋0", "3", "ふえていない"] },
          { cells: ["0＋3", "3", "はじめが0"] },
          { cells: ["2＋3", "5", "3＋2とおなじ"] },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "3＋0＝0", right: "3＋0＝3", why: "0をたすのは、ふえないこと。3のままです。" },
    { wrong: "「のこりは」でも、たしざんにする", right: "「のこりは」はひきざん", why: "「あわせて」「ぜんぶで」「ふえると」がたしざんです。" },
    { wrong: "こたえを「5」だけかく", right: "「5こ」とかく", why: "なにがいくつかまで、かきます。" },
  ],
  check: [
    { q: "4＋3は、いくつですか。", a: "7", why: "4と3で7です。" },
    { q: "5＋0は、いくつですか。", a: "5", why: "0をたしても、かわりません。" },
    { q: "赤い花が2本、白い花が6本。あわせてなん本ですか。", a: "8本", why: "あわせるので、2＋6＝8です。" },
  ],
  next: [
    { label: "計算《けいさん》の段《だん》「たしざん」", href: "/learn/sansu/1" },
    { label: "つぎは「ひきざん」", href: "/learn/sansu/2" },
    { label: "「くりあがりのあるたしざん」", href: "/learn/sansu/4" },
  ],
};
