import type { Lecture } from "../types";

export const E_MATH_1_KURABE: Lecture = {
  unit: "e-math-1-kurabe",
  nameRuby: "長《なが》さ・かさ・広《ひろ》さくらべ",
  title: "ながさ・かさ・ひろさは「いくつぶん」で くらべる",
  hook: "どちらの えんぴつが ながい？ どちらの コップに 水が おおく 入る？ くらべかたが わかると、はなれた ものでも くらべられます。",
  sections: [
    {
      heading: "ながさは はしを そろえる",
      body: "2本の えんぴつを くらべます。まず {{かたほうの はしを そろえます}}。つぎに はんたいの はしを 見ます。でて いる ほうが ながいです。",
      figure: {
        type: "flow",
        dir: "row",
        title: "ながさの くらべかた",
        steps: [
          { label: "はしを そろえる", sub: "つくえの はしに" },
          { label: "はんたいを 見る", sub: "どちらが でて いる？" },
          { label: "でて いる ほう", sub: "そちらが ながい", tone: "yellow" },
        ],
      },
    },
    {
      heading: "おなじ ものの「いくつぶん」",
      body: "うごかせない ものは、{{クリップ いくつぶん}}で くらべます。えんぴつは クリップ 6こぶん です。クレヨンは 4こぶん です。えんぴつが {{2こぶん ながい}} です。",
      figure: {
        type: "area",
        kind: "bar",
        title: "クリップ いくつぶん？",
        max: 6,
        bars: [
          {
            label: "えんぴつ",
            parts: Array.from({ length: 6 }, (_, i) => ({ value: 1, label: String(i + 1), tone: "blue" as const })),
            total: "6こぶん",
          },
          {
            label: "クレヨン",
            parts: Array.from({ length: 4 }, (_, i) => ({ value: 1, label: String(i + 1), tone: "yellow" as const })),
            total: "4こぶん",
          },
        ],
        note: "いつも おなじ クリップで はかります。",
      },
    },
    {
      heading: "かさ と ひろさ",
      body: "水の かさは、{{おなじ コップ なんばいぶん}}で くらべます。ひろさは、かさねるか、{{ます いくつぶん}}で くらべます。下の ずは、ます 6つぶん と 8つぶん です。",
      figure: {
        type: "area",
        kind: "rect",
        title: "ます いくつぶん？",
        rects: [
          { w: 3, h: 2, label: "6ます", wLabel: "よこ 3", hLabel: "たて 2", tone: "blue" },
          { w: 4, h: 2, label: "8ます", wLabel: "よこ 4", hLabel: "たて 2", tone: "yellow" },
        ],
        note: "8ますの ほうが ひろいです。",
      },
    },
    {
      heading: "3つの くらべかた",
      body: "ながさ・かさ・ひろさは、くらべかたが にて います。{{じかに くらべる}}か、{{おなじ ものの いくつぶん}}で くらべます。",
      figure: {
        type: "compare",
        title: "ながさ・かさ・ひろさ",
        columns: [{ title: "ながさ", tone: "blue" }, { title: "かさ", tone: "yellow" }, { title: "ひろさ" }],
        rows: [
          { cells: ["はしを そろえる", "おなじ 入れものに うつす", "かさねる"] },
          { cells: ["クリップ いくつぶん", "コップ なんばいぶん", "ます いくつぶん"] },
        ],
      },
    },
  ],
  mistakes: [
    {
      wrong: "はしを そろえずに、ながさを きめる",
      right: "かたほうの はしを そろえて くらべる",
      why: "はしが ずれると、みじかい ほうが ながく 見えます。",
    },
    {
      wrong: "水の たかさ だけで、かさを きめる",
      right: "おなじ 入れものに うつして くらべる",
      why: "コップの ふとさが ちがうと、たかさでは わかりません。",
    },
    {
      wrong: "えんぴつは クリップで、クレヨンは けしゴムで はかって くらべる",
      right: "おなじ ものの いくつぶんで くらべる",
      why: "はかる ものの 大きさが ちがうと、くらべられません。",
    },
  ],
  check: [
    { q: "えんぴつは クリップ 5こぶん、ペンは 7こぶん。どちらが ながい？", a: "ペン", why: "7こぶんの ほうが ながい。" },
    { q: "上の もんだいで、いくつぶん ちがう？", a: "2こぶん", why: "7−5＝2。" },
    { q: "ます 8つぶん と 6つぶん。どちらが ひろい？", a: "8つぶん", why: "ますが おおい ほうが ひろい。" },
  ],
  next: [
    { label: "ながさ・かさ・ひろさくらべ（ドリル）", href: "/learn/sansu-zukei/e-math-1-kurabe" },
    { label: "ながさ cm・mm（2年）", href: "/learn/sansu-zukei/e-math-2-nagasa" },
    { label: "水の かさ L・dL・mL（2年）", href: "/learn/sansu-zukei/e-math-2-kasa" },
  ],
};
