import type { Lecture } from "../types";

export const E_MATH_2_M: Lecture = {
  unit: "e-math-2-m",
  title: "長い長さは「1m＝100cm」で考える",
  hook: "こくばんのよこの長さを、30cmのものさしではかると、何回もずらします。長いものは、mというたんいではかるとべんりです。cmとのかんけいがわかれば、計算もできます。",
  sections: [
    {
      heading: "1m は 100cm",
      body: "100cmを{{1m}}と書きます。「1メートル」と読みます。{{1m＝100cm}}です。30cmのものさしなら、3回と少しで1mです。",
      figure: {
        type: "area",
        kind: "bar",
        title: "1m と 30cmのものさし",
        max: 100,
        bars: [
          { label: "1mのものさし", parts: [{ value: 100, label: "1m", tone: "blue" }], total: "100cm" },
          {
            label: "30cmのものさし",
            parts: [
              { value: 30, label: "30cm", tone: "yellow" },
              { value: 30, label: "30cm", tone: "plain" },
              { value: 30, label: "30cm", tone: "yellow" },
            ],
            total: "90cm",
          },
        ],
        scale: [
          { at: 0, label: "0" },
          { at: 50, label: "50cm" },
          { at: 100, label: "1m" },
        ],
        note: "30cmを3回では90cm。1mにはあと10cm。",
      },
    },
    {
      heading: "1m20cm は 120cm",
      body: "りょう手を広げた長さが「1m20cm」の人がいます。1mは100cmなので、{{1m20cm＝120cm}}です。mとcmをつかうと、長い長さを読みやすくできます。",
      figure: {
        type: "area",
        kind: "bar",
        title: "1m20cm を cm だけであらわす",
        max: 120,
        bars: [
          {
            label: "りょう手",
            parts: [
              { value: 100, label: "1m", tone: "blue" },
              { value: 20, label: "20cm", tone: "yellow" },
            ],
            total: "120cm",
          },
        ],
        scale: [
          { at: 0, label: "0" },
          { at: 100, label: "100cm" },
        ],
      },
    },
    {
      heading: "ものに合うたんいをえらぶ",
      body: "長さのたんいは、mm・cm・mの3つです。小さいものはmmやcmではかります。こくばんやろうかは{{m}}がべんりです。",
      figure: {
        type: "compare",
        title: "何をはかるか と たんい",
        columns: [{ title: "はかるもの", tone: "navy" }, { title: "合うたんい", tone: "yellow" }],
        rows: [
          { cells: ["けしゴムのあつさ", "mm"] },
          { cells: ["ノートのよこ", "cm"] },
          { cells: ["こくばんのよこ", "m"] },
        ],
        note: "1cm＝10mm、1m＝100cm。",
      },
    },
    {
      heading: "たし算は、同じたんいどうし",
      body: "長さのたし算も、{{同じたんいどうし}}を計算します。cmが100をこえたら、{{100cmを1mに}}します。",
      figure: {
        type: "formula",
        title: "1m50cm ＋ 70cm",
        steps: [
          { expr: "cm：50 ＋ 70 ＝ {{120cm}}", note: "cm どうし" },
          { expr: "120cm ＝ {{1m20cm}}", note: "100cm で 1m" },
          { expr: "1m ＋ 1m20cm ＝ {{2m20cm}}", note: "m どうし" },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "1m＝10cm と思う", right: "1m＝100cm", why: "1cm＝10mm とまぜないようにします。1mは100cmです。" },
    { wrong: "1m5cm を 15cm とする", right: "105cm", why: "1mは100cmです。100cmと5cmで105cmです。" },
    { wrong: "1m50cm＋70cm を 1m120cm のままにする", right: "2m20cm", why: "120cmは1m20cmです。100cmを1mにします。" },
  ],
  check: [
    { q: "2m は何cmですか。", a: "200cm", why: "1m＝100cm なので、100cmが2つ分です。" },
    { q: "130cm は何m何cmですか。", a: "1m30cm", why: "100cmを1mにして、のこりが30cmです。" },
    { q: "1m40cm ＋ 30cm はいくつですか。", a: "1m70cm", why: "cmどうし 40＋30＝70。1mとあわせて1m70cmです。" },
  ],
  next: [
    { label: "「長い長さ（m）」のドリル", href: "/learn/sansu-zukei/e-math-2-m" },
    { label: "ふりかえり「長さ（cm・mm）」", href: "/learn/sansu-zukei/e-math-2-nagasa" },
    { label: "つづき「長さ（km）」（3年）", href: "/learn/sansu-zukei/e-math-3-km" },
  ],
};
