import type { Lecture } from "../types";

export const E_MATH_4_WARIAI: Lecture = {
  unit: "e-math-4-wariai",
  title: "かんたんなわり合は「何倍か」でくらべる",
  hook: "20cmのゴムが60cmに、60cmのゴムが120cmにのびました。よくのびたのはどちらでしょう。のびた長さで見るか、何倍にのびたかで見るかで、答えが変わります。「何倍か」でくらべる考え方は、5年で学ぶわり合のもとになります。",
  sections: [
    {
      heading: "差でくらべるか、倍でくらべるか",
      body: "ゴムCは20cmから60cmに、ゴムDは60cmから120cmにのびました。のびた長さ（差）では、40cmのCより60cmのDのほうが大きいです。でも{{もとの長さがちがう}}ので、もとの長さの何倍になったかでくらべると、Cは3倍、Dは2倍で、{{Cのほうがよくのびた}}といえます。",
      figure: {
        type: "compare",
        title: "ゴムCとゴムD",
        columns: [{ title: "ゴムC", tone: "blue" }, { title: "ゴムD", tone: "yellow" }],
        rows: [
          { label: "のびる前", cells: ["20cm", "60cm"] },
          { label: "のびたあと", cells: ["60cm", "120cm"] },
          { label: "差", cells: ["40cm", "60cm（Dが大きい）"] },
          { label: "何倍", cells: ["60÷20＝3倍（Cが大きい）", "120÷60＝2倍"] },
        ],
      },
    },
    {
      heading: "何倍かは、わり算で求める",
      body: "20cmを{{1と見たとき}}、60cmは20cmの3つ分です。だから60cmは20cmの3倍で、式は 60÷20＝3 です。このように、もとにする量を1と見て、くらべる量がいくつにあたるかを表した数を{{わり合}}といいます。",
      figure: {
        type: "area",
        kind: "bar",
        title: "20cmを1と見ると、60cmは3",
        max: 60,
        bars: [
          { label: "もとにする量", parts: [{ value: 20, label: "20cm", tone: "blue" }], total: "1" },
          {
            label: "くらべる量",
            parts: [
              { value: 20, label: "20cm", tone: "yellow" },
              { value: 20, label: "20cm", tone: "yellow" },
              { value: 20, label: "20cm", tone: "yellow" },
            ],
            total: "3",
          },
        ],
        scale: [
          { at: 0, label: "0" },
          { at: 20, label: "1" },
          { at: 40, label: "2" },
          { at: 60, label: "3" },
        ],
        scaleLabel: "倍",
      },
    },
    {
      heading: "どれが「もとにする量」かを見つける",
      body: "「AはBの何倍」というとき、{{「〜の」の前のBがもとにする量}}です。もとにする量が「1」、くらべる量が「何倍か」にあたる量です。わからない量が□になっても、どちらがもとかを先に決めておけば、まよわずに式が立てられます。",
      figure: {
        type: "compare",
        title: "文から2つの量を見つける",
        columns: [{ title: "問題の文" }, { title: "もとにする量", tone: "blue" }, { title: "くらべる量", tone: "yellow" }],
        rows: [
          { cells: ["60cmは20cmの何倍？", "20cm", "60cm"] },
          { cells: ["15mの4倍は何m？", "15m", "□m"] },
          { cells: ["□mの3倍が27m", "□m", "27m"] },
        ],
      },
    },
    {
      heading: "3つの式は1つのかけ算から",
      body: "もとにする量を何倍かすると、くらべる量になります。つまり{{もとにする量×倍＝くらべる量}}です。何倍かを求めるときはくらべる量÷もとにする量、もとにする量を求めるときはくらべる量÷倍と、{{かけ算をわり算でもどす}}だけです。",
      figure: {
        type: "formula",
        title: "もとにする量×倍＝くらべる量",
        prose: true,
        steps: [
          { expr: "もとにする量 × 倍 ＝ くらべる量", note: "もとになる式" },
          { expr: "15 × 4 ＝ {{60}}", note: "15mの4倍は60m" },
          { expr: "{{倍}} ＝ 60 ÷ 15 ＝ {{4}}", note: "何倍かを求める" },
          { expr: "{{もとにする量}} ＝ 27 ÷ 3 ＝ {{9}}", note: "□mの3倍が27m" },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "60cmは20cmの何倍かを 20÷60 で求める", right: "60÷20＝3（倍）", why: "何倍かは、くらべる量÷もとにする量。「〜の」の前の20cmでわります。" },
    { wrong: "のびた長さが大きいDのほうが、いつもよくのびたといえる", right: "何倍でくらべると、3倍のCのほうがよくのびた", why: "もとの長さがちがうときは、差ではなく何倍かでくらべるとくらべやすくなります。" },
    { wrong: "□mの3倍が27mのとき、□＝27×3", right: "□＝27÷3＝9", why: "□に3をかけて27。□を求めるには、かけ算をわり算でもどします。" },
  ],
  check: [
    { q: "30cmのゴムが90cmにのびました。もとの長さの何倍になりましたか。", a: "3倍", why: "90÷30＝3。" },
    { q: "12mの5倍は何mですか。", a: "60m", why: "もとにする量×倍＝12×5＝60。" },
    { q: "ある長さの4倍が32cmです。ある長さは何cmですか。", a: "8cm", why: "もとにする量＝くらべる量÷倍＝32÷4＝8。" },
  ],
  next: [
    { label: "「かんたんなわり合」のドリル", href: "/learn/sansu-zukei/e-math-4-wariai" },
    { label: "5年「わり合」の図解レクチャー", href: "/learn/lecture/e-math-5-wariai" },
    { label: "「変わり方」の図解レクチャー", href: "/learn/lecture/e-math-4-kawarikata" },
  ],
};
