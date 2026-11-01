import type { Lecture } from "../types";

export const E_MATH_2_TASHI_HISSAN: Lecture = {
  unit: "e-math-2-tashi-hissan",
  nameRuby: "たし算の筆算《ひっさん》",
  title: "たし算の 筆算《ひっさん》は「くらいを そろえて 一のくらいから」",
  hook: "36円の えんぴつと 27円の けしゴムを 買います。あわせて いくらでしょう。筆算《ひっさん》なら、大きな 数も 1けたずつ 計算できます。",
  sections: [
    {
      heading: "10の たばと ばらで 考える",
      body: "36は {{10の たば 3つと ばら 6こ}}です。27は たば 2つと ばら 7こ。たばは たば、ばらは ばらで あわせます。ばらが 10こ できたら、たばに します。",
      figure: {
        type: "area",
        kind: "bar",
        title: "36＋27 を たばと ばらで",
        max: 63,
        bars: [
          {
            label: "36",
            parts: [
              { value: 10, label: "10" },
              { value: 10, label: "10" },
              { value: 10, label: "10" },
              { value: 6, label: "6", tone: "yellow" },
            ],
            total: "36",
          },
          {
            label: "27",
            parts: [
              { value: 10, label: "10" },
              { value: 10, label: "10" },
              { value: 7, label: "7", tone: "yellow" },
            ],
            total: "27",
          },
          {
            label: "あわせて",
            parts: [
              { value: 10, label: "10" },
              { value: 10, label: "10" },
              { value: 10, label: "10" },
              { value: 10, label: "10" },
              { value: 10, label: "10" },
              { value: 10, label: "10", tone: "red" },
              { value: 3, label: "3", tone: "yellow" },
            ],
            total: "63",
          },
        ],
        note: "赤い たばは、ばら 6＋7＝13 から できた 10です。",
      },
    },
    {
      heading: "くらいを そろえて 書く",
      body: "筆算《ひっさん》は {{一のくらいと 十のくらいを たてに そろえて}} 書きます。右の はしを そろえれば、くらいが そろいます。計算は {{一のくらいから}} はじめます。",
      figure: {
        type: "flow",
        dir: "row",
        title: "筆算《ひっさん》の じゅんばん",
        steps: [
          { label: "そろえて 書く", sub: "右はしを そろえる", tone: "blue" },
          { label: "一のくらい", sub: "6＋7", tone: "yellow" },
          { label: "十のくらい", sub: "1＋3＋2", tone: "navy" },
        ],
      },
    },
    {
      heading: "くり上がりの しかた",
      body: "一のくらいは 6＋7＝13 です。一のくらいに 3を 書きます。のこりの 10は、十のくらいへ 1と して うつします。これが {{くり上がり}}です。十のくらいは 1＋3＋2＝6 です。",
      figure: {
        type: "formula",
        title: "36＋27 を 1けたずつ",
        steps: [
          { label: "書く", expr: "36 ＋ 27", note: "くらいを そろえる" },
          { label: "一のくらい", expr: "6 ＋ 7 ＝ 1{{3}}", note: "3を 書く。1は 十のくらいへ" },
          { label: "十のくらい", expr: "{{1}} ＋ 3 ＋ 2 ＝ {{6}}", note: "くり上げた 1も たす" },
          { label: "こたえ", expr: "{{63}}", note: "63円" },
        ],
      },
    },
    {
      heading: "入れかえて たしかめる",
      body: "たす じゅんを 入れかえても、こたえは 同じです。{{27＋36 も 63}} に なれば、あって います。",
    },
  ],
  mistakes: [
    {
      wrong: "36＋27＝53（くり上げた 1を わすれる）",
      right: "36＋27＝63",
      why: "6＋7＝13 の 10は、十のくらいに 1と して たします。",
    },
    {
      wrong: "36＋27＝513（13を そのまま 書く）",
      right: "一のくらいには 3だけ 書く",
      why: "1つの くらいに 書ける 数字は 1つです。10は 十のくらいへ。",
    },
    {
      wrong: "36＋7 の 7を 十のくらいに 書く",
      right: "7は 6の 下に 書く",
      why: "7は ばらが 7こです。右はしを そろえます。",
    },
  ],
  check: [
    { q: "45＋38 は？", a: "83", why: "5＋8＝13 で 3を 書き 1くり上げ。1＋4＋3＝8。" },
    { q: "28＋14 は？", a: "42", why: "8＋4＝12 で 2を 書き 1くり上げ。1＋2＋1＝4。" },
    { q: "52＋34 は くり上がりが ある？", a: "ない（86）", why: "2＋4＝6 で 10を こえません。" },
  ],
  next: [
    { label: "計算の 段《だん》で「2けたの たし算」", href: "/learn/sansu/8" },
    { label: "こたえが 3けたに なる たし算", href: "/learn/sansu/10" },
    { label: "ひき算の 筆算《ひっさん》（レクチャー）", href: "/learn/lecture/e-math-2-hiki-hissan" },
  ],
};
