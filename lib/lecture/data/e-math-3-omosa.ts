import type { Lecture } from "../types";

export const E_MATH_3_OMOSA: Lecture = {
  unit: "e-math-3-omosa",
  title: "重さは「1gのいくつ分」で表す",
  hook: "ランドセルと教科書では、どちらがどれだけ重いでしょう。手で持つだけではくらべにくい重さも、gやkgというたんいを使えば数で表せます。長さやかさと同じように、たし算やひき算もできます。",
  sections: [
    {
      heading: "重さのたんい g・kg・t",
      body: "重さは{{はかり}}ではかります。1円玉1この重さが、ちょうど{{1g}}（1グラム）です。重いものは{{kg}}（キログラム）を使い、{{1kg＝1000g}}です。とても重いものには t（トン）を使い、1t＝1000kgです。",
      figure: {
        type: "compare",
        title: "3つのたんいと、はかるもの",
        columns: [{ title: "たんい", tone: "navy" }, { title: "大きさ", tone: "yellow" }, { title: "はかるもの" }],
        rows: [
          { cells: ["g", "1円玉1こで1g", "えんぴつ・消しゴム"] },
          { cells: ["kg", "1kg＝1000g", "ランドセル・体重"] },
          { cells: ["t", "1t＝1000kg", "車・ゾウ"] },
        ],
      },
    },
    {
      heading: "はかりの目もりを読む",
      body: "はかりは、何ものせないときに{{はりが0をさしているか}}をはじめにたしかめます。それから{{1目もりが何gか}}を見て、はりの所の数を読みます。はかりによって1目もりが5gや10gとちがうので、ここが大事です。",
      figure: {
        type: "flow",
        dir: "col",
        title: "はかりの読み方",
        steps: [
          { label: "はりが0か見る", sub: "何ものせないで", tone: "blue" },
          { label: "1目もりを知る", sub: "5g？ 10g？", tone: "yellow" },
          { label: "数を読む", sub: "大きい目もり→小さい目もり" },
          { label: "たんいをつける", sub: "g か kg か", tone: "navy" },
        ],
      },
    },
    {
      heading: "1kg300gは何g？",
      body: "1kg300gは、1kg（1000g）と300gを合わせた重さなので{{1300g}}です。反対に、2050gは2000gと50gなので{{2kg50g}}です。0をわすれて2kg5gとしないように気をつけます。",
      figure: {
        type: "area",
        kind: "bar",
        title: "1kg300gを g で表す",
        bars: [
          {
            label: "1kg300g",
            parts: [
              { value: 1000, label: "1kg＝1000g", tone: "blue" },
              { value: 300, label: "300g", tone: "yellow" },
            ],
            total: "1300g",
          },
        ],
        scale: [
          { at: 0, label: "0g" },
          { at: 1000, label: "1000g" },
          { at: 1300, label: "1300g" },
        ],
      },
    },
    {
      heading: "重さのたし算・ひき算",
      body: "重さも、長さやかさと同じように{{たし算・ひき算}}ができます。たんいがまざっているときは、{{gにそろえてから}}計算するとまちがいが少なくなります。かごに入れた品物の重さは、ぜんぶの重さからかごの重さをひけばわかります。",
      figure: {
        type: "formula",
        title: "1kg200g＋900g",
        steps: [
          { expr: "1kg200g ＋ 900g", note: "たんいがまざっている" },
          { expr: "{{1200g}} ＋ 900g", note: "gにそろえる" },
          { expr: "＝ {{2100g}}", note: "整数と同じにたす" },
          { expr: "＝ {{2kg100g}}", note: "1000gを1kgにする" },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "1kg＝100g と思う", right: "1kg＝1000g", why: "k は「1000倍」の意味です。1km＝1000m と同じです。" },
    { wrong: "2kg50g を 250g と書く", right: "2kg50g＝2050g", why: "2kgは2000g。それに50gをたして2050gです。" },
    { wrong: "はかりの1目もりを、いつも1gと読む", right: "はじめに1目もりが何gかをたしかめる", why: "はかりによって、1目もりが5g、10g、20gなどとちがいます。" },
  ],
  check: [
    { q: "3kg400gは何gですか。", a: "3400g", why: "3kgは3000g。それに400gをたして3400g。" },
    { q: "1kg−300g は何gですか。", a: "700g", why: "1kgを1000gにして、1000−300＝700。" },
    { q: "1tは何kgですか。", a: "1000kg", why: "1t＝1000kg です。" },
  ],
  next: [
    { label: "ドリルで「重さ（g・kg）」を練習する", href: "/learn/sansu-zukei/e-math-3-omosa" },
    { label: "3年「長さ（km）」（ドリル）", href: "/learn/sansu-zukei/e-math-3-km" },
    { label: "2年「水のかさ」（ドリル）", href: "/learn/sansu-zukei/e-math-2-kasa" },
  ],
};
