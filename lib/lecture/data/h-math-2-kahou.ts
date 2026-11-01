import type { Lecture } from "../types";

export const H_MATH_2_KAHOU: Lecture = {
  unit: "h-math-2-kahou",
  title: "加法定理は三角関数の「たし算の公式」。2倍角も合成もここから",
  hook: "sin75° は三角定規の角ではありませんが、75°＝45°+30° と分ければ正確な値が出ます。それを可能にするのが加法定理です。2倍角・半角の公式や、sin と cos をまとめる三角関数の合成も、すべて加法定理から導けます。",
  sections: [
    {
      heading: "加法定理の3つの式",
      body: "2つの角の和・差の三角関数は、それぞれの角の sin と cos で表せます。{{sin(α±β)＝sinαcosβ±cosαsinβ}}、{{cos(α±β)＝cosαcosβ∓sinαsinβ}}、tan(α±β)＝(tanα±tanβ)/(1∓tanαtanβ) です。cos の式は {{符号が逆（∓）}} になることに注意します。sin(α+β) は sinα+sinβ ではありません。",
      figure: {
        type: "formula",
        title: "加法定理",
        steps: [
          { label: "sin", expr: "sin(α±β) ＝ sinαcosβ {{±}} cosαsinβ", note: "sin・cos の順を交互に" },
          { label: "cos", expr: "cos(α±β) ＝ cosαcosβ {{∓}} sinαsinβ", note: "符号が逆" },
          { label: "tan", expr: "tan(α±β) ＝ (tanα{{±}}tanβ)/(1{{∓}}tanαtanβ)" },
        ],
      },
    },
    {
      heading: "なぜ成り立つか：単位円の2点の距離",
      body: "単位円上の2点 P(cosα, sinα)、Q(cosβ, sinβ) の距離 PQ を2通りに表します。座標から計算すると PQ²＝2−2(cosαcosβ+sinαsinβ)、∠POQ＝α−β として余弦定理を使うと PQ²＝2−2cos(α−β) です。くらべて {{cos(α−β)＝cosαcosβ+sinαsinβ}} が出ます。残りの式は、この1つから導けます。",
      figure: {
        type: "tree",
        title: "cos(α−β) から全部の式へ",
        root: {
          label: "cos(α−β)",
          sub: "単位円で証明",
          tone: "navy",
          children: [
            { label: "cos(α+β)", sub: "β を −β に", tone: "blue" },
            { label: "sin(α+β)", sub: "cos(π/2−θ) を使う", tone: "yellow" },
            { label: "tan(α+β)", sub: "sin÷cos", tone: "plain" },
          ],
        },
      },
    },
    {
      heading: "例：sin75° と tan75°",
      body: "75°＝45°+30° と、値を知っている角の和に分けます。{{sin75°＝sin45°cos30°+cos45°sin30°}} に値を入れると (√6+√2)/4 です。tan75° は tan の加法定理で (1+1/√3)/(1−1/√3) となり、分母を有理化して {{2+√3}} になります。",
      figure: {
        type: "formula",
        title: "sin75°＝sin(45°+30°)",
        steps: [
          { expr: "sin45°cos30° + cos45°sin30°", note: "加法定理" },
          { expr: "＝ (√2/2)(√3/2) + (√2/2)(1/2)", note: "値を入れる" },
          { expr: "＝ {{(√6+√2)/4}}" },
        ],
        note: "cos15°＝cos(45°−30°) も同じ (√6+√2)/4 になる。",
      },
    },
    {
      heading: "2倍角・半角の公式",
      body: "加法定理で {{β＝α}} とおくと2倍角の公式になります。{{sin2α＝2sinαcosα}}、cos2α＝cos²α−sin²α で、sin²α+cos²α＝1 を使うと {{cos2α＝1−2sin²α＝2cos²α−1}} とも書けます。これを sin²α、cos²α について解いたものが半角の公式です。sinα＝3/5（0＜α＜π/2）なら cosα＝4/5 で、sin2α＝24/25、cos2α＝7/25 です。",
      figure: {
        type: "flow",
        dir: "row",
        title: "加法定理から公式が生まれる",
        steps: [
          { label: "加法定理", sub: "α＋β", tone: "navy" },
          { label: "2倍角の公式", sub: "β＝α とおく", tone: "blue" },
          { label: "半角の公式", sub: "cos2α を変形", tone: "yellow" },
        ],
        note: "半角：sin²(α/2)＝(1−cosα)/2、cos²(α/2)＝(1+cosα)/2。",
      },
    },
    {
      heading: "三角関数の合成",
      body: "a sinθ + b cosθ は、加法定理を逆向きに使って {{r sin(θ+α)}} の形にまとめられます。r＝√(a²+b²)、α は {{cosα＝a/r、sinα＝b/r}} となる角です。点 (a, b) を座標平面にとり、原点からの距離が r、x 軸からの角が α と考えると覚えやすくなります。sin の1つの式になるので、最大値 r・最小値 −r がすぐわかります。",
      figure: {
        type: "formula",
        title: "sinθ+√3cosθ を合成する",
        steps: [
          { expr: "r ＝ √(1²+(√3)²) ＝ {{2}}", note: "点 (1, √3) の距離" },
          { expr: "＝ 2(sinθ·{{1/2}} + cosθ·{{√3/2}})", note: "2 でくくる" },
          { expr: "＝ 2(sinθcos(π/3) + cosθsin(π/3))", note: "cosα＝1/2、sinα＝√3/2" },
          { expr: "＝ {{2sin(θ+π/3)}}", note: "最大値 2、最小値 −2" },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "sin(α+β)＝sinα+sinβ", right: "sin(α+β)＝sinαcosβ+cosαsinβ", why: "三角関数は分配できません。α＝β＝45° なら左辺は sin90°＝1、右辺は √2 で合いません。" },
    { wrong: "cos(α+β)＝cosαcosβ+sinαsinβ", right: "cos(α+β)＝cosαcosβ−sinαsinβ", why: "cos の加法定理は、和なら −、差なら + と符号が逆になります。" },
    { wrong: "a sinθ+b cosθ の合成で cosα＝b/r とする", right: "cosα＝a/r、sinα＝b/r", why: "sin の係数 a が点の x 座標、cos の係数 b が y 座標です。r sin(θ+α) を展開して確かめられます。" },
  ],
  check: [
    { q: "cos75° の値は？", a: "(√6−√2)/4", why: "cos(45°+30°)＝(√2/2)(√3/2)−(√2/2)(1/2)。" },
    { q: "sinα＝4/5（π/2＜α＜π）のとき sin2α は？", a: "−24/25", why: "cosα＝−3/5。sin2α＝2×4/5×(−3/5)。" },
    { q: "sinθ+cosθ の最大値は？", a: "√2", why: "√2 sin(θ+π/4) と合成できる。" },
  ],
  next: [
    { label: "計算の段で「加法定理」を練習する", href: "/learn/kousuu/52" },
    { label: "つぎの段「2倍角の公式」", href: "/learn/kousuu/53" },
    { label: "ふりかえり「三角関数」の計算の段", href: "/learn/kousuu/51" },
  ],
};
