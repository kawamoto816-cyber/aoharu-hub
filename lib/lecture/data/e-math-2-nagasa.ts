import type { Lecture } from "../types";

const unit = (n: number, label: string, tone: "blue" | "yellow") => Array.from({ length: n }, () => ({ value: 1, label, tone }));

export const E_MATH_2_NAGASA: Lecture = {
  unit: "e-math-2-nagasa",
  title: "長さは「1cmの いくつ分」で あらわす",
  hook: "えんぴつの 長さを 手の はばで はかると、人に よって ちがいます。そこで、みんなで 同じ「cm」や「mm」を つかいます。どこで はかっても 同じ 数に なります。",
  sections: [
    {
      heading: "1cmの いくつ分",
      body: "長さは {{1cm（センチメートル）の いくつ分}}かで あらわします。1cmが 6つ分なら 6cmです。ものさしは、はしを {{0の 目もり}}に あわせて はかります。",
      figure: {
        type: "area",
        kind: "bar",
        title: "けしゴムは 1cmの 6つ分",
        max: 6,
        bars: [{ label: "けしゴム", parts: unit(6, "1cm", "blue"), total: "6cm" }],
        scale: [
          { at: 0, label: "0" },
          { at: 3, label: "3" },
          { at: 6, label: "6" },
        ],
        scaleLabel: "cm",
      },
    },
    {
      heading: "1cmより みじかい 長さは mm",
      body: "1cmを 同じ 長さに 10こに 分けます。その 1つ分が {{1mm（ミリメートル）}}です。だから {{1cm＝10mm}}です。ものさしの 小さい 目もりが 1mmです。",
      figure: {
        type: "area",
        kind: "bar",
        title: "1cmを 10こに 分けると 1mm",
        max: 10,
        bars: [
          { label: "1cm", parts: [{ value: 10, label: "1cm", tone: "yellow" }], total: "1cm" },
          { label: "1mmが 10こ", parts: unit(10, "", "blue"), total: "10mm" },
        ],
        scale: [
          { at: 0, label: "0" },
          { at: 5, label: "5mm" },
          { at: 10, label: "10mm" },
        ],
      },
    },
    {
      heading: "cmと mmを まとめて あらわす",
      body: "えんぴつが 7cmと あと 3mm なら、{{7cm3mm}} と 書きます。mmだけで あらわす ことも できます。7cmは 70mm なので、70mmと 3mmで 73mmです。",
      figure: {
        type: "formula",
        title: "7cm3mm を mmだけで",
        prose: true,
        steps: [
          { expr: "7cm3mm", note: "えんぴつの 長さ" },
          { expr: "7cm ＝ {{70mm}}", note: "1cm＝10mm が 7つ" },
          { expr: "70mm ＋ 3mm ＝ {{73mm}}", note: "mmで あらわせた" },
        ],
      },
    },
    {
      heading: "長さの 計算は たんいを そろえる",
      body: "長さの たし算は、{{cmどうし、mmどうし}} を 計算します。5cm3mm＋2cm4mm は、5＋2＝7 と 3＋4＝7 で 7cm7mm です。mmが 10を こえたら、10mmを 1cmに します。",
      figure: {
        type: "compare",
        title: "5cm3mm＋2cm4mm",
        columns: [{ title: "cm", tone: "blue" }, { title: "mm", tone: "yellow" }],
        rows: [
          { label: "5cm3mm", cells: ["5", "3"] },
          { label: "2cm4mm", cells: ["2", "4"] },
          { label: "あわせて", cells: ["7", "7"] },
        ],
        note: "こたえは 7cm7mm です。",
      },
    },
  ],
  mistakes: [
    {
      wrong: "1cm＝100mm と おぼえる",
      right: "1cm＝10mm",
      why: "1cmを 10こに 分けた 1つが 1mmです。",
    },
    {
      wrong: "ものさしの はしから はかる",
      right: "0の 目もりに はしを あわせる",
      why: "ものさしの はしと 0が ずれて いる ことが あります。",
    },
    {
      wrong: "3cm8mm＋4mm＝3cm12mm",
      right: "3cm12mm は 4cm2mm に なおす",
      why: "12mmは 10mmと 2mm。10mmで 1cmに なります。",
    },
  ],
  check: [
    { q: "4cm6mmは 何mm？", a: "46mm", why: "4cmは 40mm。40＋6＝46。" },
    { q: "52mmは 何cm何mm？", a: "5cm2mm", why: "50mmで 5cm、のこりが 2mm。" },
    { q: "3cm5mm＋1cm2mm は？", a: "4cm7mm", why: "cmどうし 3＋1＝4、mmどうし 5＋2＝7。" },
  ],
  next: [
    { label: "長さ（cm・mm）（ドリル）", href: "/learn/sansu-zukei/e-math-2-nagasa" },
    { label: "長い 長さ（m）（ドリル）", href: "/learn/sansu-zukei/e-math-2-m" },
    { label: "1年の「長さくらべ」（ドリル）", href: "/learn/sansu-zukei/e-math-1-kurabe" },
  ],
};
