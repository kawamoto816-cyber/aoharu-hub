import type { Lecture } from "../types";

export const J_MATH_2_ICHIJI_KANSU: Lecture = {
  unit: "j-math-2-ichiji-kansu",
  title: "一次関数 y＝ax+b は「スタートが b、x が1ふえるごとに a ずつ」",
  hook: "水そうに最初から5Lの水が入っていて、毎分2Lずつ水を入れると、x 分後の水の量は y＝2x+5。タクシーの料金や、ろうそくが燃えて短くなる長さも同じ形です。「はじめの量」と「一定の増え方」に分けて見ると、式もグラフもすっきり読めます。",
  sections: [
    {
      heading: "y＝ax+b は「はじめの量」と「増える分」",
      body: "y が x の一次式 y＝ax+b で表されるとき、y は x の{{一次関数}}であるといいます。b は x＝0 のときの y、つまり{{はじめの量}}で、x が1増えるごとに y は{{a ずつ}}増えます。比例 y＝ax は、b＝0 の特別な一次関数です。",
      figure: {
        type: "area",
        kind: "bar",
        title: "y＝2x+5：はじめ5Lに、毎分2Lずつ足される",
        max: 11,
        bars: [
          { label: "x＝0", parts: [{ value: 5, label: "b＝5", tone: "blue" }], total: "y＝5" },
          { label: "x＝1", parts: [{ value: 5, label: "5", tone: "blue" }, { value: 2, label: "+2", tone: "yellow" }], total: "y＝7" },
          { label: "x＝2", parts: [{ value: 5, label: "5", tone: "blue" }, { value: 2, label: "+2", tone: "yellow" }, { value: 2, label: "+2", tone: "yellow" }], total: "y＝9" },
          { label: "x＝3", parts: [{ value: 5, label: "5", tone: "blue" }, { value: 2, label: "+2", tone: "yellow" }, { value: 2, label: "+2", tone: "yellow" }, { value: 2, label: "+2", tone: "yellow" }], total: "y＝11" },
        ],
      },
    },
    {
      heading: "変化の割合はいつも a",
      body: "x の増加量に対する y の増加量の割合を{{変化の割合}}といい、{{（y の増加量）÷（x の増加量）}}で求めます。一次関数 y＝ax+b では、どこからどこまでをとっても変化の割合は一定で、a に等しくなります。比例とちがい、y÷x ではないことに注意します。",
      figure: {
        type: "formula",
        title: "y＝2x+5 で、x が 1 から 3 まで増えるとき",
        steps: [
          { expr: "x：1 → 3、y：7 → 11", note: "表から読みとる" },
          { expr: "変化の割合 = {{(11 − 7)}} ÷ {{(3 − 1)}}", note: "y の増加量 ÷ x の増加量" },
          { expr: "= 4 ÷ 2 = {{2}}", note: "式の a と同じ" },
        ],
      },
    },
    {
      heading: "グラフ：傾きは a、切片は b",
      body: "一次関数のグラフは{{直線}}です。y 軸と交わる点の y 座標 b を{{切片}}、右へ1進むと上へ a 進むことを表す a を{{傾き}}といいます。a＞0 なら右上がり、a＜0 なら右下がりです。グラフをかくときは、切片 (0, b) をとり、そこから「右へ1・上へ a」進んだ点と結びます。",
      figure: {
        type: "compare",
        title: "傾き a の符号とグラフ",
        columns: [{ title: "a＞0", tone: "red" }, { title: "a＜0", tone: "blue" }],
        rows: [
          { label: "グラフ", cells: ["右上がりの直線", "右下がりの直線"] },
          { label: "x が1増えると", cells: ["y は a 増える", "y は a の絶対値だけ減る"] },
          { label: "例", cells: ["y＝2x+1（切片1）", "y＝−3x+4（切片4）"] },
        ],
      },
    },
    {
      heading: "式は「傾き」と「1点」で決まる",
      body: "直線の式を求めるには、まず{{傾き a}}を決め、通る1点の座標を代入して{{切片 b}}を求めます。2点だけがわかっているときは、2点から変化の割合を計算すれば、それが傾きです。",
      figure: {
        type: "flow",
        dir: "col",
        title: "2点 (−1, 5)、(2, −1) を通る直線の式",
        steps: [
          { label: "傾き a を求める", sub: "(−1−5)÷(2−(−1))＝−2", tone: "blue" },
          { label: "1点を代入して b", sub: "5＝−2×(−1)+b → b＝3" },
          { label: "式を書く", sub: "y＝−2x+3", tone: "yellow" },
        ],
      },
    },
    {
      heading: "2直線の交点は、連立方程式の解",
      body: "2つの一次関数のグラフの{{交点の座標}}は、2つの式を両方満たす x、y の組なので、{{連立方程式の解}}と同じです。グラフで見当をつけ、計算で正確な値を求めると確かです。",
    },
  ],
  mistakes: [
    { wrong: "変化の割合 ＝ (x の増加量)÷(y の増加量)", right: "(y の増加量)÷(x の増加量)", why: "「x が1増えたら y はいくつ増えるか」なので、y の増加量を x の増加量でわります。" },
    { wrong: "y＝2x+5 で x＝1 のとき y＝7 だから、変化の割合は 7", right: "変化の割合は 2", why: "y÷x は比例のときの比例定数の求め方です。一次関数では増加量どうしでわります。" },
    { wrong: "y＝−2x+3 の傾きは 2、切片は −3", right: "傾きは −2、切片は 3", why: "符号もふくめて、x の係数が傾き、定数項が切片です。" },
  ],
  check: [
    { q: "y＝3x−2 の傾きと切片を答えましょう。", a: "傾き 3、切片 −2", why: "y＝ax+b の a が傾き、b が切片。" },
    { q: "y＝−2x+1 で、x が 2 から 5 まで増えるときの y の増加量は？", a: "−6", why: "変化の割合 −2 に x の増加量 3 をかける。" },
    { q: "傾きが 2 で、点 (1, 5) を通る直線の式は？", a: "y＝2x+3", why: "5＝2×1+b から b＝3。" },
  ],
  next: [
    { label: "計算の段で「一次関数」を練習する", href: "/learn/math/34" },
    { label: "ふりかえり「比例と反比例」（ドリル）", href: "/learn/sugaku-chu/j-math-1-hirei" },
    { label: "ふりかえり「連立方程式」の計算の段", href: "/learn/math/29" },
  ],
};
