import type { Lecture } from "../types";

export const H_MATH_3_BIBUN: Lecture = {
  unit: "h-math-3-bibun",
  title: "積・商・合成の3つのルールで、どんな関数も微分できる",
  hook: "数学Ⅱでは多項式しか微分できませんでしたが、物の運動や人口の増え方には分数式や eˣ、sin x が出てきます。数学Ⅲの微分法は、積・商・合成関数のルールと、いくつかの基本の導関数を組み合わせて、ほぼすべての関数を微分できるようにする単元です。",
  sections: [
    {
      heading: "積の微分と商の微分",
      body: "積は {{(fg)′＝f′g＋fg′}}、商は {{(f/g)′＝(f′g−fg′)/g²}} で微分します。商の分子は「分子の微分×分母」が先で、{{引き算の順番}}に注意します。また (xⁿ)′＝nxⁿ⁻¹ は n が負の数や分数でも成り立ち、{{(√x)′＝1/(2√x)}}、(1/x)′＝−1/x² となります。",
      figure: {
        type: "formula",
        title: "f(x)＝x²/(x＋1) を微分する",
        steps: [
          { expr: "f(x) ＝ x²/(x＋1)", note: "商の形" },
          { expr: "f′(x) ＝ ({{2x}}(x＋1) − x²·{{1}})/(x＋1)²", note: "(f′g−fg′)/g²" },
          { label: "答え", expr: "＝ {{(x² ＋ 2x)/(x＋1)²}}", note: "分子を整理" },
        ],
      },
    },
    {
      heading: "合成関数は「外側の微分×中身の微分」",
      body: "y＝f(g(x)) は、u＝g(x) とおくと {{dy/dx＝(dy/du)×(du/dx)}} です。つまり、中身をひとかたまりと見て{{外側を微分し、最後に中身の微分をかける}}。(2x＋1)⁵ を展開せずに微分でき、√(x²＋1) のような式も同じやり方で微分できます。",
      figure: {
        type: "flow",
        dir: "row",
        title: "y＝(2x＋1)⁵ を微分する",
        steps: [
          { label: "外側を微分", sub: "5(2x＋1)⁴", tone: "blue" },
          { label: "中身を微分", sub: "(2x＋1)′＝2", tone: "plain" },
          { label: "10(2x＋1)⁴", sub: "5(2x＋1)⁴×2", tone: "yellow" },
        ],
        arrows: ["中身はそのまま", "かける"],
      },
    },
    {
      heading: "三角・指数・対数関数の導関数",
      body: "x を弧度法で測ると {{(sin x)′＝cos x}}、{{(cos x)′＝−sin x}}、(tan x)′＝1/cos²x です。前の単元の極限 sin x/x→1 と (eˣ−1)/x→1 から、{{(eˣ)′＝eˣ}}、{{(log x)′＝1/x}} が導かれます。log は底が e の自然対数で、底が a のときは log a が分母や係数に出ます。",
      figure: {
        type: "compare",
        title: "覚える導関数",
        columns: [
          { title: "f(x)", tone: "blue" },
          { title: "f′(x)", tone: "yellow" },
        ],
        rows: [
          { cells: ["sin x", "cos x"] },
          { cells: ["cos x", "−sin x"] },
          { cells: ["tan x", "1/cos²x"] },
          { cells: ["eˣ", "eˣ"] },
          { cells: ["log x", "1/x"] },
          { cells: ["aˣ", "aˣ log a"] },
        ],
        note: "(log|x|)′＝1/x も成り立つ。(log_a x)′＝1/(x log a)。",
      },
    },
    {
      heading: "ルールを組み合わせる",
      body: "実際の問題では、積・商・合成を組み合わせます。x sin x は積で sin x＋x cos x、xeˣ は積で {{(x＋1)eˣ}}、sin 3x は合成で {{3 cos 3x}} です。log の中に式がある場合は {{(log u)′＝u′/u}} の形を覚えておくと速く計算できます。",
      figure: {
        type: "formula",
        title: "y＝log(x²＋1) を微分する",
        steps: [
          { expr: "y ＝ log(x² ＋ 1)", note: "u＝x²＋1 とおく" },
          { expr: "y′ ＝ {{1/u}} × {{u′}}", note: "外側 (log u)′＝1/u" },
          { label: "答え", expr: "＝ {{2x/(x² ＋ 1)}}", note: "u′＝2x" },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "(f/g)′＝(fg′−f′g)/g² と順番を逆にする", right: "(f′g−fg′)/g²", why: "逆にすると答えの符号が反対になります。「分子の微分が先」と覚えます。" },
    { wrong: "(2x＋1)⁵ の微分を 5(2x＋1)⁴ で止める", right: "中身の微分2をかけて 10(2x＋1)⁴", why: "合成関数では最後に中身の微分をかけます。展開して確かめても x⁴ の係数は 80＝10×2⁴ です。" },
    { wrong: "(cos x)′＝sin x", right: "(cos x)′＝−sin x", why: "cos x は x＝0 から増やすと減っていくので、導関数は x＞0 の近くで負になります。" },
    { wrong: "(eˣ)′＝xeˣ⁻¹ とべき関数のように微分する", right: "(eˣ)′＝eˣ", why: "nxⁿ⁻¹ は x が底のとき（xⁿ）の公式です。eˣ は x が指数にあり、別の公式です。" },
  ],
  check: [
    { q: "(x³ cos x)′ は？", a: "3x² cos x − x³ sin x", why: "積の微分。(x³)′cos x＋x³(cos x)′＝3x² cos x＋x³(−sin x)。" },
    { q: "(√(x²＋1))′ は？", a: "x/√(x²＋1)", why: "合成関数。(√u)′＝u′/(2√u) で u′＝2x なので 2x/(2√(x²＋1))。" },
    { q: "((x−1)/(x＋1))′ は？", a: "2/(x＋1)²", why: "商の微分。(1·(x＋1)−(x−1)·1)/(x＋1)²＝2/(x＋1)²。" },
  ],
  next: [
    { label: "計算の段で「積・商の微分」を練習する", href: "/learn/kousuu/73" },
    { label: "計算の段で「三角関数の微分」を練習する", href: "/learn/kousuu/75" },
    { label: "次の単元「微分法の応用」のレクチャー", href: "/learn/lecture/h-math-3-bibun-oyo" },
  ],
};
