import type { Lecture } from "../types";

export const E_MATH_2_KASA: Lecture = {
  unit: "e-math-2-kasa",
  title: "水のかさは「1dLのいくつ分」でくらべる",
  hook: "牛にゅうパックやペットボトルに「1L」と書いてあります。水とうに入るお茶は、どちらが多いでしょう。かさのたんいをつかうと、だれでも同じに数でくらべられます。",
  sections: [
    {
      heading: "1dLますで、いくつ分かを数える",
      body: "水のかさは、{{1dL}}ますのいくつ分かで数えます。1dLは「1デシリットル」と読みます。1dLますで10ぱい分が{{1L}}です。だから {{1L＝10dL}} です。",
      figure: {
        type: "area",
        kind: "bar",
        title: "1Lは 1dLの10ぱい分",
        max: 10,
        bars: [
          { label: "1Lます", parts: [{ value: 10, label: "1L", tone: "blue" }], total: "1L" },
          {
            label: "1dLます",
            parts: Array.from({ length: 10 }, () => ({ value: 1, tone: "yellow" as const })),
            total: "10dL",
          },
        ],
        note: "黄色の1こが1dL。10こで1Lと同じかさ。",
      },
    },
    {
      heading: "L・dL・mL の3つのたんい",
      body: "かさのたんいは {{L}}・{{dL}}・{{mL}} の3つです。mLは「ミリリットル」と読みます。{{1L＝1000mL}}、{{1dL＝100mL}} です。小さいかさは mL であらわします。",
      figure: {
        type: "compare",
        title: "同じかさを、3つのたんいで",
        columns: [{ title: "L", tone: "navy" }, { title: "dL", tone: "blue" }, { title: "mL", tone: "yellow" }],
        rows: [
          { cells: ["1L", "10dL", "1000mL"] },
          { cells: ["（なし）", "1dL", "100mL"] },
        ],
        note: "右へいくほど、たんいが小さい。",
      },
    },
    {
      heading: "2L3dL は 23dL",
      body: "やかんの水は「2L3dL」のようにあらわせます。2Lは20dLなので、{{2L3dL＝23dL}}です。dLだけにすると、くらべやすくなります。",
      figure: {
        type: "area",
        kind: "bar",
        title: "2L3dL を dL だけであらわす",
        max: 23,
        bars: [
          {
            label: "やかん",
            parts: [
              { value: 10, label: "1L", tone: "blue" },
              { value: 10, label: "1L", tone: "blue" },
              { value: 3, label: "3dL", tone: "yellow" },
            ],
            total: "23dL",
          },
        ],
        scale: [
          { at: 0, label: "0" },
          { at: 10, label: "10dL" },
          { at: 20, label: "20dL" },
        ],
      },
    },
    {
      heading: "たし算は、同じたんいどうし",
      body: "かさのたし算は、{{同じたんいどうし}}を計算します。Lは L と、dLは dL とたします。dLが10をこえたら、{{10dLを1Lに}}します。",
      figure: {
        type: "formula",
        title: "1L5dL ＋ 2L8dL",
        steps: [
          { expr: "1L5dL ＋ 2L8dL", note: "L と dL に分ける" },
          { expr: "L：1 ＋ 2 ＝ {{3L}}", note: "L どうし" },
          { expr: "dL：5 ＋ 8 ＝ {{13dL}}", note: "dL どうし" },
          { expr: "13dL ＝ {{1L3dL}}", note: "10dL で 1L" },
          { expr: "3L ＋ 1L3dL ＝ {{4L3dL}}", note: "合わせる" },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "1L＝100dL と思う", right: "1L＝10dL", why: "1dLますで10ぱい分が1Lです。1L＝1000mL とまぜないようにします。" },
    { wrong: "1L5dL＋8dL＝1L13dL のままにする", right: "2L3dL", why: "13dLは1Lと3dLです。10dLを1Lにします。" },
    { wrong: "2L と 15dL で、15のほうが大きいから15dLが多い", right: "2L（20dL）のほうが多い", why: "たんいがちがうと、数だけではくらべられません。dLにそろえます。" },
  ],
  check: [
    { q: "3L は何dLですか。", a: "30dL", why: "1L＝10dL なので、3Lは10dLが3つ分です。" },
    { q: "1dL は何mLですか。", a: "100mL", why: "1L＝1000mL、1L＝10dL なので、1dLは100mLです。" },
    { q: "2L4dL ＋ 7dL はいくつですか。", a: "3L1dL", why: "4dL＋7dL＝11dL＝1L1dL。2L とたして 3L1dL です。" },
  ],
  next: [
    { label: "「水のかさ」のドリル", href: "/learn/sansu-zukei/e-math-2-kasa" },
    { label: "長さ（cm・mm）のドリル", href: "/learn/sansu-zukei/e-math-2-nagasa" },
    { label: "図かいレクチャー「長い長さ（m）」", href: "/learn/lecture/e-math-2-m" },
  ],
};
