import type { Lecture } from "../types";

export const E_MATH_4_MENSEKI: Lecture = {
  unit: "e-math-4-menseki",
  title: "面積は「1cm²の正方形がいくつ分あるか」",
  hook: "形のちがう2つの花だん、どちらが広いでしょう。たてと横の長さがちがうと、見ただけではわかりません。広さを「1辺1cmの正方形のいくつ分」と数で表せば、くらべたり計算したりできます。",
  sections: [
    {
      heading: "広さを「1cm²のいくつ分」で表す",
      body: "広さのことを{{面積}}といいます。1辺が1cmの正方形の面積を{{1平方センチメートル}}といい、{{1cm²}}と書きます。面積は、この1cm²の正方形がいくつ分あるかで表します。",
    },
    {
      heading: "長方形の面積＝たて×横",
      body: "たて3cm、横4cm の長方形には、1cm²の正方形が{{横に4こずつ、3列}}ならびます。だから面積は 3×4＝12 で 12cm² です。数えなくても、{{長方形の面積＝たて×横}}、{{正方形の面積＝1辺×1辺}} で求められます。",
      figure: {
        type: "area",
        kind: "rect",
        title: "たて3cm・横4cm の長方形",
        rects: [{ w: 4, h: 3, label: "1cm²が12こ → 12cm²", wLabel: "横 4cm", hLabel: "たて 3cm", tone: "yellow" }],
        note: "1cm²が4こずつ3列。たて×横＝3×4＝12。",
      },
    },
    {
      heading: "形を分けるか、大きな長方形からひく",
      body: "L字のような形は、{{2つの長方形に分けて}}、それぞれの面積をたします。また、{{大きな長方形から、ない部分をひく}}考え方でも求められます。どちらで求めても同じ答えになります。",
      figure: {
        type: "area",
        kind: "rect",
        title: "L字の形を2つの長方形に分ける",
        rects: [
          { w: 4, h: 5, label: "4×5＝20", wLabel: "4cm", hLabel: "5cm", tone: "blue" },
          { w: 3, h: 2, label: "3×2＝6", wLabel: "3cm", hLabel: "2cm", tone: "yellow" },
        ],
        note: "分けると 20＋6＝26cm²。大きな長方形からひくと 7×5−3×3＝26cm²。",
      },
    },
    {
      heading: "大きな面積の単位：m²・a・ha・km²",
      body: "教室や校庭のような広いところは、1辺1mの正方形の面積{{1m²}}を使います。1m＝100cm なので、1m²＝100×100＝{{10000cm²}}です。もっと広い畑や町の面積には、{{a（アール）}}・{{ha（ヘクタール）}}・{{km²}}を使います。",
      figure: {
        type: "compare",
        title: "面積の単位と正方形の1辺",
        columns: [{ title: "単位", tone: "blue" }, { title: "正方形の1辺" }, { title: "大きさ", tone: "yellow" }],
        rows: [
          { cells: ["1cm²", "1cm", "いちばん小さい"] },
          { cells: ["1m²", "1m", "10000cm²"] },
          { cells: ["1a", "10m", "100m²"] },
          { cells: ["1ha", "100m", "100a（10000m²）"] },
          { cells: ["1km²", "1km", "100ha"] },
        ],
        note: "1辺が10倍になると、面積は100倍になります。",
      },
    },
    {
      heading: "長さの単位をそろえてから計算",
      body: "たて2m、横50cm の長方形の面積を 2×50＝100 としてはいけません。{{長さの単位をそろえてから}}かけ算をします。cmにそろえると 200×50＝10000cm² で、これは{{1m²}}と同じ広さです。",
      figure: {
        type: "formula",
        title: "たて2m・横50cm の長方形の面積",
        prose: true,
        steps: [
          { expr: "2m ＝ {{200cm}}", note: "cmにそろえる" },
          { expr: "200 × 50 ＝ {{10000}}", note: "たて×横" },
          { expr: "10000cm² ＝ {{1m²}}", note: "1m²＝10000cm²" },
        ],
      },
    },
  ],
  mistakes: [
    {
      wrong: "面積の答えの単位を cm と書く",
      right: "cm²（平方センチメートル）",
      why: "面積は1cm²の正方形のいくつ分です。長さの単位 cm とはちがいます。",
    },
    {
      wrong: "たて2m・横50cm の面積を 2×50＝100 とする",
      right: "200×50＝10000cm²（＝1m²）",
      why: "mとcmがまじったままかけています。長さの単位をそろえてから計算します。",
    },
    {
      wrong: "1m²＝100cm² と考える",
      right: "1m²＝10000cm²",
      why: "1m²は1辺100cmの正方形なので、100×100＝10000cm² です。",
    },
  ],
  check: [
    { q: "たて6cm、横8cm の長方形の面積は何cm²ですか。", a: "48cm²", why: "たて×横＝6×8＝48。" },
    { q: "1辺9mの正方形の面積は何m²ですか。", a: "81m²", why: "1辺×1辺＝9×9＝81。" },
    { q: "1haは何m²ですか。", a: "10000m²", why: "1haは1辺100mの正方形の面積。100×100＝10000。" },
  ],
  next: [
    { label: "練習する：面積", href: "/learn/sansu-zukei/e-math-4-menseki" },
    { label: "ふりかえり：すい直・平行と四角形（図解）", href: "/learn/lecture/e-math-4-suichoku" },
    { label: "5年：四角形と三角形の面積", href: "/learn/sansu-zukei/e-math-5-menseki" },
  ],
};
