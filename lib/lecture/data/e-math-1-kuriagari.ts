import type { Lecture } from "../types";

export const E_MATH_1_KURIAGARI: Lecture = {
  unit: "e-math-1-kuriagari",
  title: "10の まとまりを つくって たす",
  hook: "おはじきが 9こ と 4こ あります。ゆびでは たりません。でも 10の まとまりを つくると、すぐに わかります。",
  sections: [
    {
      heading: "10を つくると かんたん",
      body: "9＋4 を かんがえます。9は {{あと 1で 10}} です。4を 1と 3に わけます。9と 1で 10、10と 3で {{13}} です。",
      figure: {
        type: "area",
        kind: "bar",
        title: "9＋4 は 10と 3",
        max: 13,
        bars: [
          {
            label: "9 と 4",
            parts: [
              { value: 9, label: "9", tone: "blue" },
              { value: 4, label: "4", tone: "yellow" },
            ],
          },
          {
            label: "4を 1と 3に",
            parts: [
              { value: 9, label: "9", tone: "blue" },
              { value: 1, label: "1", tone: "yellow" },
              { value: 3, label: "3", tone: "red" },
            ],
          },
          {
            label: "10 と 3",
            parts: [
              { value: 10, label: "10", tone: "navy" },
              { value: 3, label: "3", tone: "red" },
            ],
            total: "13",
          },
        ],
        scale: [
          { at: 0, label: "0" },
          { at: 10, label: "10" },
          { at: 13, label: "13" },
        ],
      },
    },
    {
      heading: "やりかたは 3つの じゅんばん",
      body: "{{①あと いくつで 10か}} を 見ます。②たす かずを わけます。③10と のこりを あわせます。どの もんだいも この じゅんです。",
      figure: {
        type: "flow",
        dir: "row",
        title: "9＋4 の じゅんばん",
        steps: [
          { label: "あと いくつ？", sub: "9は あと 1で 10" },
          { label: "わける", sub: "4を 1と 3に" },
          { label: "10と のこり", sub: "10と 3で 13", tone: "yellow" },
        ],
      },
    },
    {
      heading: "しきで かくと",
      body: "わけた ところを しきに かくと こう なります。{{10が できたら}}、あとは 10いくつ です。",
      figure: {
        type: "formula",
        title: "9＋4 を しきで",
        steps: [
          { expr: "9 ＋ 4" },
          { expr: "9 ＋ {{1}} ＋ {{3}}", note: "4を 1と 3に" },
          { expr: "{{10}} ＋ 3", note: "9＋1＝10" },
          { expr: "{{13}}", note: "10と 3で 13" },
        ],
      },
    },
    {
      heading: "まえの かずを わけても よい",
      body: "3＋9 なら、3を 1と 2に わけます。9と 1で 10、10と 2で 12 です。{{10に ちかい ほうに}} あわせると らくです。",
      figure: {
        type: "compare",
        title: "どちらを わける？",
        columns: [{ title: "しき" }, { title: "わける", tone: "yellow" }, { title: "こたえ", tone: "blue" }],
        rows: [
          { cells: ["9＋4", "4を 1と 3", "10＋3＝13"] },
          { cells: ["8＋5", "5を 2と 3", "10＋3＝13"] },
          { cells: ["3＋9", "3を 1と 2", "10＋2＝12"] },
        ],
      },
    },
  ],
  mistakes: [
    {
      wrong: "8＋5 で 5を 1と 4に わける",
      right: "8は あと 2で 10。5を 2と 3に",
      why: "まず 「あと いくつで 10か」を たしかめます。",
    },
    {
      wrong: "10が できたら、こたえを 10に する",
      right: "10と のこりの 3で 13",
      why: "のこりを たすのを わすれないように します。",
    },
    {
      wrong: "9＋4 を 12 と する",
      right: "9＋4＝13",
      why: "4を 1と 3に わけるので、のこりは 3 です。",
    },
  ],
  check: [
    { q: "8＋6 は いくつ？", a: "14", why: "8は あと 2で 10。6を 2と 4に。10と 4で 14。" },
    { q: "7＋5 は いくつ？", a: "12", why: "7は あと 3で 10。5を 3と 2に。10と 2で 12。" },
    { q: "9＋9 は いくつ？", a: "18", why: "9を 1と 8に。9と 1で 10、10と 8で 18。" },
  ],
  next: [
    { label: "けいさんの だんで「くりあがり」を れんしゅう", href: "/learn/sansu/4" },
    { label: "いくつと いくつ（ドリル）", href: "/learn/sansu-zukei/e-math-1-ikutsu" },
    { label: "くりさがりの ある ひきざん（レクチャー）", href: "/learn/lecture/e-math-1-kurisagari" },
  ],
};
