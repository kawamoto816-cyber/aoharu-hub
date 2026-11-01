import type { Lecture } from "../types";

export const H_MATH_C_BAIKAI: Lecture = {
  unit: "h-math-c-baikai",
  title: "点の動きは「時刻 t」で、位置は「距離と向き」でも表せる",
  hook: "ボールの動きを記録するとき、「t 秒後に x がいくつ、y がいくつ」と時刻ごとに書くと、曲線をたどる順番まで表せます。レーダーは、目標までの距離と向きで位置を示します。曲線を x, y の式以外で表す2つの方法、媒介変数表示と極座標を学びます。",
  sections: [
    {
      heading: "媒介変数表示：x と y を t で表し、t を消す",
      body: "x＝f(t)、y＝g(t) のように、x, y を別の変数 t（{{媒介変数}}）の式で表したものを{{媒介変数表示}}といいます。どんな曲線かを知るには、片方の式を t について解き、もう片方に代入して{{t を消去}}します。t のとる範囲に制限があれば、x, y の範囲にも気をつけます。",
      figure: {
        type: "formula",
        title: "x＝t−2、y＝t²＋1 の表す曲線",
        steps: [
          { expr: "{{t ＝ x ＋ 2}}", note: "x の式を t について解く" },
          { expr: "y ＝ ({{x ＋ 2}})² ＋ 1", note: "y の式に代入" },
          { expr: "{{y ＝ x² ＋ 4x ＋ 5}}", note: "頂点 (−2, 1) の放物線" },
        ],
      },
    },
    {
      heading: "円と楕円は cos θ, sin θ で表す",
      body: "cos²θ＋sin²θ＝1 を使うと、円 x²＋y²＝r² は {{x＝r cos θ, y＝r sin θ}}、楕円 x²/a²＋y²/b²＝1 は {{x＝a cos θ, y＝b sin θ}} と表せます。θ を 0 から 2π まで動かすと、点は曲線を1周します。円が直線上をすべらずに転がるとき、円周上の点がえがく曲線が{{サイクロイド}} x＝a(θ−sin θ)、y＝a(1−cos θ) です。",
      figure: {
        type: "flow",
        dir: "col",
        title: "x＝3cos θ、y＝3sin θ で θ をふやす",
        steps: [
          { label: "θ＝0", sub: "点 (3, 0)", tone: "navy" },
          { label: "θ＝π/2", sub: "点 (0, 3)", tone: "blue" },
          { label: "θ＝π", sub: "点 (−3, 0)", tone: "blue" },
          { label: "θ＝3π/2", sub: "点 (0, −3)", tone: "blue" },
          { label: "θ＝2π", sub: "(3, 0) にもどる", tone: "yellow" },
        ],
        note: "点は半径 3 の円 x²＋y²＝9 を反時計回りに1周する。",
      },
    },
    {
      heading: "極座標：原点からの距離 r と角 θ",
      body: "原点 O を{{極}}、x 軸の正の部分を{{始線}}とし、点 P を OP の長さ r と、始線から測った角 θ で (r, θ) と表したものを{{極座標}}といいます。直交座標とは {{x＝r cos θ、y＝r sin θ、r²＝x²＋y²}} で行き来できます。同じ点でも θ に 2π をたしたものは同じ点を表します。",
      figure: {
        type: "compare",
        title: "直交座標と極座標",
        columns: [{ title: "直交座標", tone: "blue" }, { title: "極座標", tone: "yellow" }],
        rows: [
          { label: "表し方", cells: ["(x, y)：横と縦", "(r, θ)：距離と角"] },
          { label: "例1", cells: ["(1, √3)", "(2, π/3)"] },
          { label: "例2", cells: ["(−1, 1)", "(√2, 3π/4)"] },
          { label: "変換", cells: ["x＝r cos θ, y＝r sin θ", "r＝√(x²＋y²)"] },
        ],
      },
    },
    {
      heading: "極方程式を x, y の式に直す",
      body: "r と θ の関係式を{{極方程式}}といいます。r＝a は原点中心・半径 a の円、θ＝α は原点を通る直線です。r＝2cos θ のような式は、{{両辺に r をかけて}} r²＝x²＋y²、r cos θ＝x を使うと、x, y の式に直せます。",
      figure: {
        type: "formula",
        title: "r＝2cos θ はどんな曲線か",
        steps: [
          { expr: "{{r²}} ＝ 2{{r}} cos θ", note: "両辺に r をかける" },
          { expr: "{{x² ＋ y²}} ＝ 2{{x}}", note: "r²＝x²＋y²、r cos θ＝x" },
          { expr: "{{(x − 1)² ＋ y² ＝ 1}}", note: "中心 (1, 0)、半径 1 の円" },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "x＝3cos θ, y＝3sin θ を x²＋y²＝3 とする", right: "x²＋y²＝9", why: "(x/3)²＋(y/3)²＝1 なので、両辺に 9 をかけます。" },
    { wrong: "極座標 (2, π/3) を直交座標 (2cos π/3, 2) とする", right: "(2cos π/3, 2sin π/3)＝(1, √3)", why: "x にも y にも r をかけます。x＝r cos θ、y＝r sin θ です。" },
    { wrong: "(−1, 1) の偏角を tan θ＝−1 から −π/4 とする", right: "点は第2象限なので θ＝3π/4", why: "tan の値だけでは象限が決まりません。点の位置を図で確かめます。" },
  ],
  check: [
    { q: "x＝t＋1、y＝2t の表す図形の方程式は？", a: "y＝2x−2", why: "t＝x−1 を代入して y＝2(x−1)。" },
    { q: "極座標 (4, π/6) を直交座標で表すと？", a: "(2√3, 2)", why: "x＝4cos π/6＝2√3、y＝4sin π/6＝2。" },
    { q: "極方程式 r＝4sin θ を x, y の式で表すと？", a: "x²＋(y−2)²＝4", why: "r²＝4r sin θ より x²＋y²＝4y。中心 (0, 2)、半径 2 の円。" },
  ],
  next: [
    { label: "ドリル「媒介変数表示と極座標」で練習する", href: "/learn/sugaku-ko/h-math-c-baikai" },
    { label: "ひとつ前「二次曲線」（図解）", href: "/learn/lecture/h-math-c-nijikyokusen" },
    { label: "ふりかえり「三角関数」（図解）", href: "/learn/lecture/h-math-2-sankaku" },
  ],
};
