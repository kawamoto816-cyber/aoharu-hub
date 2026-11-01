import type { Lecture } from "../types";

export const H_MATH_2_TAISU: Lecture = {
  unit: "h-math-2-taisu",
  title: "log は「何乗するか」を答える数。かけ算をたし算に変える",
  hook: "地震のマグニチュードは1大きいとエネルギーが約32倍、2大きいと1000倍になります。このように桁ちがいに変わる量は、そのままの数より「10の何乗か」で表した方が扱いやすくなります。その「何乗か」を表す道具が対数（log）です。",
  sections: [
    {
      heading: "logₐM は「a を何乗すると M か」",
      body: "a＞0、a≠1、M＞0 のとき、aᵖ＝M となる p を {{logₐM}} と書き、a を{{底}}、M を{{真数}}といいます。つまり {{logₐM＝p ⇔ aᵖ＝M}} で、対数は指数を言いかえたものです。aᵖ はいつも正なので、真数 M は正の数に限ります。",
      figure: {
        type: "flow",
        dir: "row",
        title: "log₂8 を求める",
        steps: [
          { label: "2 を何乗で 8？", sub: "底 2、真数 8", tone: "plain" },
          { label: "2³ ＝ 8", sub: "指数で考える", tone: "blue" },
          { label: "log₂8 ＝ 3", sub: "答えは指数", tone: "yellow" },
        ],
        arrows: ["指数に直す", "指数を読む"],
        note: "logₐ1＝0（a⁰＝1）、logₐa＝1（a¹＝a）もここから出る。",
      },
    },
    {
      heading: "積は和に、累乗は係数になる",
      body: "指数法則 aʳaˢ＝aʳ⁺ˢ を対数で言いかえると、{{logₐMN＝logₐM＋logₐN}} になります。同じように、商は差に、累乗 Mᵏ は k 倍になります。底がちがうときは、{{底の変換公式 logₐb＝(log_c b)/(log_c a)}}（c は1でない正の数）で底をそろえます。",
      figure: {
        type: "compare",
        title: "対数の性質（M＞0、N＞0）",
        columns: [{ title: "公式", tone: "navy" }, { title: "例", tone: "yellow" }],
        rows: [
          { label: "積", cells: ["logₐMN＝logₐM＋logₐN", "log₆4＋log₆9＝log₆36＝2"] },
          { label: "商", cells: ["logₐ(M/N)＝logₐM−logₐN", "log₃(54÷2)＝log₃27＝3"] },
          { label: "累乗", cells: ["logₐMᵏ＝k logₐM", "log₂4⁵＝5log₂4＝10"] },
          { label: "底の変換", cells: ["底をそろえて割る", "log₄8＝log₂8／log₂4＝3/2"] },
        ],
      },
    },
    {
      heading: "対数の方程式は、最後に真数の条件",
      body: "log₂(x−1)＋log₂(x＋1)＝3 を解きます。まず{{真数が正}}であることから x−1＞0 かつ x＋1＞0、つまり x＞1 です。左辺を1つの log にまとめ、logₐA＝p を A＝aᵖ に直すと二次方程式になります。出てきた解のうち、{{条件 x＞1 をみたすものだけ}}が答えです。",
      figure: {
        type: "formula",
        title: "log₂(x−1)＋log₂(x＋1)＝3",
        steps: [
          { label: "条件", expr: "x−1＞0、x＋1＞0 → {{x＞1}}", note: "真数は正" },
          { expr: "log₂{{(x−1)(x＋1)}} ＝ 3", note: "和は積の log に" },
          { expr: "x²−1 ＝ {{2³}} ＝ 8", note: "logₐA＝p ⇔ A＝aᵖ" },
          { expr: "x ＝ ±3", note: "x²＝9" },
          { label: "答え", expr: "x ＝ {{3}}", note: "x＝−3 は x＞1 に合わない" },
        ],
      },
    },
    {
      heading: "y＝logₐx は y＝aˣ を y＝x で折り返したグラフ",
      body: "y＝logₐx を{{対数関数}}といいます。x と y の役割が y＝aˣ と入れかわっているので、グラフは {{直線 y＝x について対称}}です。点 (1, 0) を通り、y 軸が漸近線で、a＞1 なら増加、0＜a＜1 なら減少します。a＞1 のとき {{0＜M＜N ⇔ logₐM＜logₐN}} なので、大小は真数でくらべられます。",
      figure: {
        type: "compare",
        title: "y＝2ˣ と y＝log₂x のくらべ",
        columns: [{ title: "y＝2ˣ", tone: "blue" }, { title: "y＝log₂x", tone: "red" }],
        rows: [
          { label: "通る点", cells: ["(0, 1)", "(1, 0)"] },
          { label: "x の範囲", cells: ["すべての実数", "x＞0（真数は正）"] },
          { label: "y の範囲", cells: ["y＞0", "すべての実数"] },
          { label: "漸近線", cells: ["x 軸", "y 軸"] },
        ],
        note: "どちらも底2＞1 なので増加関数。",
      },
    },
  ],
  mistakes: [
    { wrong: "log₂(4＋4) ＝ log₂4＋log₂4", right: "log₂(4×4) ＝ log₂4＋log₂4", why: "たし算に分けられるのは真数の「積」です。log₂(4＋4)＝log₂8＝3、log₂4＋log₂4＝4 で値もちがいます。" },
    { wrong: "log₂(x−1)＋log₂(x＋1)＝3 の解は x＝±3", right: "x＝3 だけ", why: "x＝−3 だと真数 x−1 が負になり、log が定義されません。最初に真数の条件を出しておきます。" },
    { wrong: "log₂8 ＝ 4（8÷2）", right: "log₂8 ＝ 3", why: "log は割り算ではなく「何乗か」。2³＝8 なので3です。" },
    { wrong: "logₐ1 ＝ 1", right: "logₐ1 ＝ 0", why: "a⁰＝1 だから。値が1になるのは logₐa の方です。" },
  ],
  check: [
    { q: "log₃81 の値は？", a: "4", why: "3⁴＝81 だから。" },
    { q: "log₂12−log₂3 の値は？", a: "2", why: "差は商の log に。log₂(12/3)＝log₂4＝2。" },
    { q: "log₁₀2＝0.3010 として、2⁵⁰ は何桁の整数？", a: "16桁", why: "log₁₀2⁵⁰＝50×0.3010＝15.05。10¹⁵≦2⁵⁰＜10¹⁶ なので16桁。" },
  ],
  next: [
    { label: "計算の段で「対数の値」を練習する", href: "/learn/kousuu/48" },
    { label: "計算の段で「対数の計算」を練習する", href: "/learn/kousuu/49" },
    { label: "計算の段で「指数・対数の方程式」を練習する", href: "/learn/kousuu/50" },
  ],
};
