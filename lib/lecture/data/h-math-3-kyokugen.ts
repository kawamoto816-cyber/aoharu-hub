import type { Lecture } from "../types";

export const H_MATH_3_KYOKUGEN: Lecture = {
  unit: "h-math-3-kyokugen",
  title: "0/0 は形を変えて読む。sin x/x→1 と e が数学Ⅲの微分の土台",
  hook: "x＝2 を代入すると 0/0 になってしまう式でも、x を2に「限りなく近づける」と、ちゃんとした値に近づくことがあります。この「近づいた先」を調べるのが関数の極限です。sin x や eˣ を微分するための公式は、すべてこの単元の極限から生まれます。",
  sections: [
    {
      heading: "0/0 の形は約分してから代入する",
      body: "x→a で分母も分子も0になる{{0/0 の形}}は、そのまま代入しても値が決まりません。{{因数分解して約分}}し、0 になる因数を消してから x＝a を代入します。約分してよいのは、極限では x は a に近づくだけで {{x≠a}} だからです。",
      figure: {
        type: "formula",
        title: "lim[x→2] (x²−4)/(x−2)",
        steps: [
          { expr: "(x² − 4)/(x − 2)", note: "x＝2 で 0/0" },
          { expr: "＝ {{(x＋2)(x−2)}}/(x − 2)", note: "分子を因数分解" },
          { expr: "＝ {{x ＋ 2}}", note: "x≠2 なので約分" },
          { label: "x→2", expr: "→ 2 ＋ 2 ＝ {{4}}", note: "ここで代入する" },
        ],
      },
    },
    {
      heading: "右から・左からの極限がそろって、はじめて極限がある",
      body: "x を a より大きい側から近づけるのを{{右側極限}} x→a＋0、小さい側からを{{左側極限}} x→a−0 と書きます。lim[x→a] f(x) が存在するのは、{{両方が同じ値になるとき}}だけです。1/x や |x|/x は x→0 で左右の行き先がちがうので、極限はありません。",
      figure: {
        type: "compare",
        title: "x→0 の右側極限と左側極限",
        columns: [
          { title: "x→＋0", tone: "blue" },
          { title: "x→−0", tone: "red" },
        ],
        rows: [
          { label: "1/x", cells: ["∞", "−∞"] },
          { label: "|x|/x", cells: ["1", "−1"] },
          { label: "x²", cells: ["0", "0"] },
        ],
        note: "1/x と |x|/x は左右が合わないので x→0 の極限なし。x² は両方0なので極限は0。",
      },
    },
    {
      heading: "lim[x→0] sin x/x＝1 を使える形にする",
      body: "x を{{弧度法（ラジアン）}}で測ると、{{lim[x→0] sin x/x＝1}} が成り立ちます。sin 3x/x のように中身がちがうときは、{{分母も 3x にそろえる}}ように変形して使います。cos をふくむ式は 1−cos x＝sin²x/(1＋cos x) と変形し、lim[x→0] (1−cos x)/x²＝1/2 が得られます。",
      figure: {
        type: "formula",
        title: "lim[x→0] sin 3x/x",
        steps: [
          { expr: "sin 3x / x", note: "このままでは公式が使えない" },
          { expr: "＝ {{3}} × sin 3x / {{3x}}", note: "分母を 3x にそろえる" },
          { label: "x→0", expr: "→ 3 × {{1}} ＝ {{3}}", note: "3x→0 なので sin 3x/(3x)→1" },
        ],
      },
    },
    {
      heading: "(1＋1/n)ⁿ が近づく数が e",
      body: "(1＋1/n)ⁿ は n を大きくすると、ある値に近づきます。この値を {{e＝2.71828…}} と書き、これを底とする対数を{{自然対数 log x}} といいます。同じ e は lim[x→0] (1＋x)^(1/x) としても表せ、ここから {{lim[x→0] (eˣ−1)/x＝1}} が導かれます。",
      figure: {
        type: "area",
        kind: "bar",
        title: "(1＋1/n)ⁿ の値",
        max: 3,
        bars: [
          { label: "n＝1", parts: [{ value: 2, tone: "plain" }], total: "2" },
          { label: "n＝10", parts: [{ value: 2.5937, tone: "blue" }], total: "2.5937…" },
          { label: "n＝100", parts: [{ value: 2.7048, tone: "blue" }], total: "2.7048…" },
          { label: "n＝1000", parts: [{ value: 2.7169, tone: "yellow" }], total: "2.7169…" },
        ],
        scale: [
          { at: 0, label: "0" },
          { at: 1, label: "1" },
          { at: 2, label: "2" },
          { at: 3, label: "3" },
        ],
        note: "どこまでも大きくはならず、e＝2.71828… に近づく。",
      },
    },
    {
      heading: "連続と中間値の定理",
      body: "lim[x→a] f(x)＝f(a) のとき、f(x) は x＝a で{{連続}}といいます。閉区間 a≦x≦b で連続な関数で f(a) と f(b) の符号が異なれば、a＜c＜b で f(c)＝0 となる c が少なくとも1つあります（{{中間値の定理}}）。f(x)＝x³＋x−1 は f(0)＝−1、f(1)＝1 なので、方程式 f(x)＝0 は 0＜x＜1 に解をもちます。",
    },
  ],
  mistakes: [
    { wrong: "lim[x→2] (x²−4)/(x−2) は 0/0 だから 0（または極限なし）", right: "約分して x＋2、極限は4", why: "0/0 は「まだ決まらない形」です。0 になる因数を約分してから代入します。" },
    { wrong: "lim[x→0] sin 3x/x＝1", right: "3×sin 3x/(3x) と変形して3", why: "公式は sin の中身と分母が同じときだけ使えます。分母を 3x にそろえて3倍します。" },
    { wrong: "lim[x→0] 1/x＝∞", right: "右から ∞、左から −∞ なので極限なし", why: "左右の行き先が一致しないと、x→0 の極限は存在しません。x→＋0 とすれば ∞ です。" },
  ],
  check: [
    { q: "lim[x→2] (x²＋x−6)/(x−2) は？", a: "5", why: "(x＋3)(x−2)/(x−2)＝x＋3。x→2 で5。" },
    { q: "lim[x→0] sin 2x/sin 5x は？", a: "2/5", why: "(sin 2x/2x)×(5x/sin 5x)×(2/5) → 1×1×2/5。" },
    { q: "lim[x→∞] (√(x²＋x)−x) は？", a: "1/2", why: "有理化して x/(√(x²＋x)＋x)。x で割って 1/(√(1＋1/x)＋1) → 1/2。" },
  ],
  next: [
    { label: "計算の段で「関数の極限」を練習する", href: "/learn/kousuu/72" },
    { label: "次の単元「微分法」のレクチャー", href: "/learn/lecture/h-math-3-bibun" },
    { label: "前の単元「数列の極限」のレクチャー", href: "/learn/lecture/h-math-3-suretsu" },
  ],
};
