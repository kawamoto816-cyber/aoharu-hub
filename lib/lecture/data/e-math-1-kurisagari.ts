import type { Lecture } from "../types";

export const E_MATH_1_KURISAGARI: Lecture = {
  unit: "e-math-1-kurisagari",
  title: "10から ひいて、のこりと あわせる",
  hook: "あめが 13こ あります。8こ たべると、のこりは いくつ でしょう。3から 8は ひけません。10の まとまりから ひけば、できます。",
  sections: [
    {
      heading: "ひけない ときは 10から",
      body: "13は {{10と 3}} です。3から 8は ひけません。だから {{10から 8を ひきます}}。10−8＝2 です。2と 3で 5 です。",
      figure: {
        type: "flow",
        dir: "row",
        title: "13−8 の じゅんばん",
        steps: [
          { label: "13を わける", sub: "10と 3" },
          { label: "10から ひく", sub: "10−8＝2" },
          { label: "あわせる", sub: "2と 3で 5", tone: "yellow" },
        ],
      },
    },
    {
      heading: "ずで 見ると",
      body: "10の かたまりから 8を とります。10の 中に {{2が のこります}}。ばらの 3と あわせて、のこりは 5 です。",
      figure: {
        type: "area",
        kind: "bar",
        title: "13こ から 8こ たべる",
        max: 13,
        bars: [
          {
            label: "13こ",
            parts: [
              { value: 10, label: "10", tone: "navy" },
              { value: 3, label: "3", tone: "blue" },
            ],
            total: "13こ",
          },
          {
            label: "10から 8を とる",
            parts: [
              { value: 8, label: "たべた 8", tone: "red" },
              { value: 2, label: "2", tone: "yellow" },
              { value: 3, label: "3", tone: "yellow" },
            ],
            total: "のこり 5こ",
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
      heading: "しきで かくと",
      body: "しきに すると こう なります。{{10−いくつ}} を すぐ いえると はやく できます。",
      figure: {
        type: "formula",
        title: "13−8 を しきで",
        steps: [
          { expr: "13 − 8" },
          { expr: "{{10}} − 8 ＋ {{3}}", note: "13を 10と 3に" },
          { expr: "{{2}} ＋ 3", note: "10−8＝2" },
          { expr: "{{5}}", note: "2と 3で 5" },
        ],
      },
    },
    {
      heading: "べつの やりかたも ある",
      body: "8を 3と 5に わけても できます。13−3＝10、10−5＝5 です。{{どちらでも こたえは おなじ}} です。やりやすい ほうで しましょう。",
      figure: {
        type: "compare",
        title: "13−8 の 2つの やりかた",
        columns: [{ title: "10から ひく", tone: "blue" }, { title: "じゅんに ひく", tone: "yellow" }],
        rows: [
          { label: "はじめ", cells: ["13を 10と 3", "8を 3と 5"] },
          { label: "つぎ", cells: ["10−8＝2", "13−3＝10"] },
          { label: "さいご", cells: ["2＋3＝5", "10−5＝5"] },
        ],
      },
    },
  ],
  mistakes: [
    {
      wrong: "14−6 で、4から 6は ひけないので 6−4＝2 と して 12",
      right: "10−6＝4、4と 4で 8",
      why: "ひく かずと ひかれる かずを ぎゃくに しては いけません。",
    },
    {
      wrong: "13−8 で 10−8＝2 の 2 を こたえに する",
      right: "2と のこりの 3で 5",
      why: "ばらの 3を あわせるのを わすれないように します。",
    },
  ],
  check: [
    { q: "12−9 は いくつ？", a: "3", why: "10−9＝1、1と 2で 3。" },
    { q: "15−7 は いくつ？", a: "8", why: "10−7＝3、3と 5で 8。" },
    { q: "11−3 は いくつ？", a: "8", why: "10−3＝7、7と 1で 8。" },
  ],
  next: [
    { label: "けいさんの だんで「くりさがり」を れんしゅう", href: "/learn/sansu/5" },
    { label: "くりあがりの ある たしざん（レクチャー）", href: "/learn/lecture/e-math-1-kuriagari" },
    { label: "いくつと いくつ（ドリル）", href: "/learn/sansu-zukei/e-math-1-ikutsu" },
  ],
};
