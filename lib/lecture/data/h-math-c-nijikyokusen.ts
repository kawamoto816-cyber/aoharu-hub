import type { Lecture } from "../types";

export const H_MATH_C_NIJIKYOKUSEN: Lecture = {
  unit: "h-math-c-nijikyokusen",
  title: "放物線・楕円・双曲線は「距離の条件」で決まる曲線",
  hook: "パラボラアンテナは、放物線の形の面で受けた電波を1点（焦点）に集めます。惑星は太陽を焦点の1つとする楕円の軌道を回ります。これらの曲線は、点からの距離についての簡単な条件から生まれ、標準形の式から焦点や形がすぐ読みとれます。",
  sections: [
    {
      heading: "放物線：焦点と準線から等しい距離",
      body: "定点 F（{{焦点}}）と、F を通らない定直線 ℓ（{{準線}}）からの距離が等しい点の軌跡が{{放物線}}です。焦点 F(p, 0)、準線 x＝−p とすると、距離の式を2乗して整理するだけで {{y²＝4px}} が出てきます。逆に式から 4p を読みとれば、焦点と準線がわかります。",
      figure: {
        type: "formula",
        title: "焦点 F(p, 0)・準線 x＝−p から式をつくる",
        steps: [
          { expr: "√((x−p)²＋y²) ＝ |x＋p|", note: "PF＝P から準線までの距離" },
          { expr: "x²−2px＋p²＋y² ＝ x²＋2px＋p²", note: "両辺を2乗" },
          { expr: "{{y² ＝ 4px}}", note: "x² と p² が消える" },
          { label: "例", expr: "y²＝8x → 4p＝8 → p＝{{2}}", note: "焦点 (2, 0)、準線 x＝−2" },
        ],
      },
    },
    {
      heading: "楕円：2つの焦点からの距離の和が一定",
      body: "2定点 F, F′ からの{{距離の和が一定}}の点の軌跡が{{楕円}}です。標準形 {{x²/a²＋y²/b²＝1}}（a＞b＞0）では、距離の和は 2a（長軸の長さ）、焦点は (±√(a²−b²), 0) です。x²/25＋y²/9＝1 なら a＝5、b＝3 で、焦点は (±4, 0) です。",
      figure: {
        type: "numberline",
        title: "x²/25＋y²/9＝1 の x 軸上の点",
        min: -6,
        max: 6,
        points: [
          { x: -5, label: "A′", tone: "navy" },
          { x: -4, label: "F′", tone: "red" },
          { x: 4, label: "F", tone: "red" },
          { x: 5, label: "A", tone: "navy" },
        ],
        ranges: [{ from: -5, to: 5, label: "長軸 2a＝10", tone: "blue" }],
        note: "頂点 A(5, 0) では AF′＋AF＝9＋1＝10＝2a。y 軸上の点 (0, 3) でも 5＋5＝10。",
      },
    },
    {
      heading: "双曲線：距離の差が一定。漸近線をもつ",
      body: "2定点 F, F′ からの{{距離の差が一定}}の点の軌跡が{{双曲線}}です。標準形 {{x²/a²−y²/b²＝1}} では、差は 2a、焦点は (±√(a²＋b²), 0) で、楕円と根号の中の符号が逆です。遠くでは直線 {{y＝±(b/a)x}}（{{漸近線}}）に近づきます。",
      figure: {
        type: "compare",
        title: "楕円と双曲線のくらべ",
        columns: [{ title: "楕円", tone: "blue" }, { title: "双曲線", tone: "red" }],
        rows: [
          { label: "条件", cells: ["PF＋PF′＝2a", "|PF−PF′|＝2a"] },
          { label: "標準形", cells: ["x²/a²＋y²/b²＝1", "x²/a²−y²/b²＝1"] },
          { label: "焦点 (±c, 0)", cells: ["c＝√(a²−b²)", "c＝√(a²＋b²)"] },
          { label: "例 a＝4, b＝3", cells: ["c＝√7", "c＝5、漸近線 y＝±¾x"] },
        ],
      },
    },
    {
      heading: "式の形で曲線を見分ける",
      body: "x², y² の項に注目します。{{片方だけ}}2乗なら放物線、{{同じ符号}}なら楕円（係数が等しければ円）、{{ちがう符号}}なら双曲線です。4x²＋9y²＝36 のように右辺が 1 でないときは、両辺を 36 でわって x²/9＋y²/4＝1 と標準形にしてから a, b を読みます。焦点が x 軸上か y 軸上かは、分母の大きいほうで決まります。",
      figure: {
        type: "tree",
        title: "2次の項で見分ける",
        root: {
          label: "二次曲線",
          tone: "navy",
          children: [
            { label: "放物線", sub: "x², y² の片方だけ", tone: "yellow" },
            { label: "楕円", sub: "x², y² が同符号", tone: "blue" },
            { label: "双曲線", sub: "x², y² が異符号", tone: "red" },
          ],
        },
        note: "楕円で a＝b のときが円 x²＋y²＝a²。",
      },
    },
  ],
  mistakes: [
    { wrong: "y²＝8x の焦点を (8, 0) とする", right: "4p＝8 より p＝2、焦点 (2, 0)", why: "標準形は y²＝4px なので、x の係数は焦点の x 座標の4倍です。" },
    { wrong: "双曲線 x²/16−y²/9＝1 の焦点を (±√7, 0) とする", right: "c＝√(16＋9)＝5 で、焦点 (±5, 0)", why: "双曲線は c²＝a²＋b²、楕円は c²＝a²−b²。符号を取りちがえやすい所です。" },
    { wrong: "4x²＋9y²＝36 を見て a＝4, b＝9 とする", right: "x²/9＋y²/4＝1 に直して a＝3, b＝2", why: "a², b² は右辺を 1 にしたときの分母です。" },
  ],
  check: [
    { q: "放物線 x²＝12y の焦点と準線は？", a: "焦点 (0, 3)、準線 y＝−3", why: "x²＝4py の形で 4p＝12、p＝3。" },
    { q: "楕円 x²/9＋y²/4＝1 の焦点は？", a: "(±√5, 0)", why: "c＝√(9−4)＝√5。分母の大きい x 側に焦点がある。" },
    { q: "双曲線 x²/9−y²/16＝1 の漸近線は？", a: "y＝±(4/3)x", why: "a＝3、b＝4 で y＝±(b/a)x。" },
  ],
  next: [
    { label: "計算の段で「二次曲線」を練習する", href: "/learn/kousuu/88" },
    { label: "つぎの単元「媒介変数表示と極座標」（図解）", href: "/learn/lecture/h-math-c-baikai" },
    { label: "ふりかえり「円の方程式」（図解）", href: "/learn/lecture/h-math-2-en" },
  ],
};
