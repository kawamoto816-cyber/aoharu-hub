import type { Lecture } from "../types";

export const H_MATH_C_ZUKEI: Lecture = {
  unit: "h-math-c-zukei",
  title: "点を「位置ベクトル」で表すと、図形の性質が式で証明できる",
  hook: "地図アプリは、建物の場所を「基準の地点からどちらへどれだけ」で覚えています。図形でも、基準の点 O から各点へのベクトルで位置を表すと、内分点・重心・交点の位置を計算で求められます。補助線のひらめきがなくても、式を立てて解けば図形の問題が解けるのがベクトルの強みです。",
  sections: [
    {
      heading: "内分と外分：どこで分けるかを線分で見る",
      body: "線分 AB 上の点 P が AP:PB＝m:n となるとき、P は AB を {{m:n に内分}}するといいます。点 Q が AB の延長上にあって AQ:QB＝m:n となるとき、Q は AB を {{m:n に外分}}するといいます。2:1 の外分点は B をこえた先にあり、AQ は AB の2倍の長さです。",
      figure: {
        type: "area",
        kind: "bar",
        title: "AB＝3 のとき、2:1 の内分点と外分点",
        max: 6,
        bars: [
          { label: "内分 2:1", parts: [{ value: 2, label: "AP 2", tone: "blue" }, { value: 1, label: "PB 1", tone: "yellow" }], total: "AB＝3" },
          { label: "外分 2:1", parts: [{ value: 3, label: "AB 3", tone: "blue" }, { value: 3, label: "BQ 3", tone: "yellow" }], total: "AQ＝6" },
        ],
        note: "外分では AQ:QB＝6:3＝2:1。Q は B の外側にある。",
      },
    },
    {
      heading: "内分点・重心の位置ベクトルは公式で",
      body: "A(↑a)、B(↑b) のとき、AB を m:n に内分する点は {{(n↑a＋m↑b)/(m＋n)}} です。↑a には PB 側の比 n、↑b には AP 側の比 m がかかる（{{比はたすきにかかる}}）ので、P に近い方の点に大きい係数がつきます。外分は n を −n にかえ、△ABC の重心は {{(↑a＋↑b＋↑c)/3}} です。",
      figure: {
        type: "formula",
        title: "内分点の公式と重心",
        steps: [
          { label: "内分", expr: "↑p ＝ ({{n}}↑a ＋ {{m}}↑b) / (m ＋ n)", note: "AP:PB＝m:n" },
          { label: "中点", expr: "↑p ＝ (↑a ＋ ↑b) / 2", note: "m＝n＝1 のとき" },
          { label: "外分", expr: "↑q ＝ ({{−n}}↑a ＋ m↑b) / (m − n)", note: "n を −n にかえる" },
          { label: "重心", expr: "↑g ＝ (↑a ＋ ↑b ＋ ↑c) / {{3}}", note: "3点の平均" },
        ],
      },
    },
    {
      heading: "交点は「2通りに表して係数を比べる」",
      body: "2直線の交点 P は、それぞれの直線上の点として {{2通りの式}}で表せます。↑a と ↑b が {{1次独立}}（↑0 でなく平行でもない）なら、s↑a＋t↑b＝s′↑a＋t′↑b のとき s＝s′、t＝t′ なので、係数を比べて連立方程式を解きます。3点が一直線上にあるかは ↑AC＝k↑AB となる k があるかで判定します。",
      figure: {
        type: "formula",
        title: "△OAB で OA の中点 C、OB を 2:1 に内分する点 D。AD と BC の交点 P",
        steps: [
          { label: "AD 上", expr: "↑OP ＝ (1−s)↑a ＋ {{(2/3)s}}↑b", note: "AP:PD＝s:(1−s)" },
          { label: "BC 上", expr: "↑OP ＝ {{(1/2)t}}↑a ＋ (1−t)↑b", note: "BP:PC＝t:(1−t)" },
          { label: "比べる", expr: "1−s ＝ t/2、(2/3)s ＝ 1−t", note: "↑a, ↑b は1次独立" },
          { expr: "s ＝ 3/4、t ＝ 1/2", note: "連立方程式を解く" },
          { expr: "↑OP ＝ {{(1/4)↑a ＋ (1/2)↑b}}", note: "AP:PD＝3:1 もわかる" },
        ],
      },
    },
    {
      heading: "直線や円も、ベクトルの式（ベクトル方程式）で表せる",
      body: "点 A(↑a) を通り ↑d に平行な直線上の点 P(↑p) は、{{↑p＝↑a＋t↑d}}（t は実数）と表せます。↑d を{{方向ベクトル}}といいます。直線に垂直なベクトル ↑n（{{法線ベクトル}}）を使えば ↑n·(↑p−↑a)＝0、中心 C(↑c)、半径 r の円は |↑p−↑c|＝r です。",
      figure: {
        type: "compare",
        title: "図形とベクトル方程式",
        columns: [{ title: "ベクトル方程式", tone: "blue" }, { title: "成分にすると（例）", tone: "yellow" }],
        rows: [
          { label: "直線（方向）", cells: ["↑p ＝ ↑a ＋ t↑d", "x＝1＋2t, y＝3＋t"] },
          { label: "直線（法線）", cells: ["↑n·(↑p − ↑a) ＝ 0", "2x＋3y＝5"] },
          { label: "円", cells: ["|↑p − ↑c| ＝ r", "(x−1)²＋(y−2)²＝9"] },
        ],
        note: "例は、方向が A(1, 3)・↑d＝(2, 1)、法線が A(1, 1)・↑n＝(2, 3)、円が中心 (1, 2)・半径 3。",
      },
    },
  ],
  mistakes: [
    { wrong: "AB を 2:1 に内分する点を (2↑a＋↑b)/3 とする", right: "(↑a＋2↑b)/3", why: "比の 2 は AP の長さなので、P は B に近い。B 側の ↑b に 2 がかかります。" },
    { wrong: "交点を求めるとき、同じ文字 t を2本の直線の両方に使う", right: "AD 上は s、BC 上は t のように別の文字を使う", why: "2本の直線上では、交点までの割合は一般にちがいます。同じ文字だと式が立ちません。" },
    { wrong: "↑a, ↑b が平行でも係数を比べてよい", right: "係数を比べられるのは ↑a, ↑b が1次独立のときだけ", why: "平行だと ↑b＝k↑a となり、同じベクトルを別の係数で表せてしまいます。" },
  ],
  check: [
    { q: "A(1, 2)、B(5, 4) で、AB を 3:1 に内分する点の座標は？", a: "(4, 7/2)", why: "(1·↑a＋3·↑b)/4＝((1＋15)/4, (2＋12)/4)＝(4, 7/2)。" },
    { q: "O(0, 0)、A(6, 0)、B(0, 3) の △OAB の重心の座標は？", a: "(2, 1)", why: "3点の座標の平均で ((0＋6＋0)/3, (0＋0＋3)/3)。" },
    { q: "A(1, 1)、B(3, 2)、C(7, 4) は一直線上にありますか。", a: "ある（↑AC＝3↑AB）", why: "↑AB＝(2, 1)、↑AC＝(6, 3)＝3↑AB。" },
  ],
  next: [
    { label: "ドリル「ベクトルと図形」で練習する", href: "/learn/sugaku-ko/h-math-c-zukei" },
    { label: "ふりかえり：平面上のベクトル（図解）", href: "/learn/lecture/h-math-c-heimen" },
    { label: "次の単元：空間のベクトル（図解）", href: "/learn/lecture/h-math-c-kukan" },
  ],
};
