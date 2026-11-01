import type { Lecture } from "../types";

export const E_MATH_6_HIREI_HANPIREI: Lecture = {
  unit: "e-math-6-hirei-hanpirei",
  title: "比例は「y÷x がいつも同じ」、反比例は「x×y がいつも同じ」",
  hook: "リボンを長く買うほど代金は高くなり、あめを分ける人数が増えるほど1人分は減ります。2つの量がいっしょに変わるとき、その変わり方にはきまりがあります。きまりを式で表せると、表にない場合の値もすぐに求められます。",
  sections: [
    {
      heading: "比例：x が2倍、3倍…なら y も2倍、3倍…",
      body: "1mで80円のリボンを x m 買うときの代金を y 円とします。x が2倍、3倍…になると、y も{{2倍、3倍…}}になります。このとき「y は x に{{比例する}}」といいます。比例では、{{y÷x がいつも同じ数}}（ここでは80）になります。",
      figure: {
        type: "compare",
        title: "リボンの長さと代金",
        columns: [{ title: "x 長さ（m）", tone: "blue" }, { title: "y 代金（円）", tone: "yellow" }],
        rows: [
          { label: "1倍", cells: ["1", "80"] },
          { label: "2倍", cells: ["2", "160"] },
          { label: "3倍", cells: ["3", "240"] },
          { label: "4倍", cells: ["4", "320"] },
        ],
        note: "どの行でも y÷x＝80。",
      },
    },
    {
      heading: "比例の式とグラフ",
      body: "y÷x が決まった数になるので、比例は{{y＝決まった数×x}}と表せます。リボンなら y＝80×x です。x の値ごとに y の大きさを並べると、上のはしが{{一直線}}に並びます。グラフにすると、比例は{{0の点を通る直線}}になります。",
      figure: {
        type: "area",
        kind: "bar",
        title: "y＝80×x の y の大きさ",
        max: 320,
        bars: [
          { label: "x＝1", parts: [{ value: 80, label: "80", tone: "blue" }], total: "80円" },
          { label: "x＝2", parts: [{ value: 160, label: "160", tone: "blue" }], total: "160円" },
          { label: "x＝3", parts: [{ value: 240, label: "240", tone: "blue" }], total: "240円" },
          { label: "x＝4", parts: [{ value: 320, label: "320", tone: "yellow" }], total: "320円" },
        ],
        scale: [
          { at: 0, label: "0" },
          { at: 160, label: "160" },
          { at: 320, label: "320" },
        ],
        note: "x が1増えるごとに、y は同じ80ずつ増える。",
      },
    },
    {
      heading: "反比例：x が2倍、3倍…なら y は1/2、1/3…",
      body: "面積12cm²の長方形で、たてを x cm、横を y cm とします。x が2倍、3倍…になると、y は{{1/2、1/3…}}になります。このとき「y は x に{{反比例する}}」といいます。下の長方形はどれも面積12で、{{x×y がいつも同じ数}}です。",
      figure: {
        type: "area",
        kind: "rect",
        title: "面積12cm²の長方形（たて x・横 y）",
        rects: [
          { w: 1, h: 12, label: "12", wLabel: "x＝1", hLabel: "y＝12", tone: "blue" },
          { w: 2, h: 6, label: "12", wLabel: "x＝2", hLabel: "y＝6", tone: "blue" },
          { w: 3, h: 4, label: "12", wLabel: "x＝3", hLabel: "y＝4", tone: "yellow" },
          { w: 6, h: 2, label: "12", wLabel: "x＝6", hLabel: "y＝2", tone: "yellow" },
        ],
        note: "どれも x×y＝12。x が2倍なら y は半分。",
      },
    },
    {
      heading: "式から、表にない値を求める",
      body: "比例は{{y÷x}}、反比例は{{x×y}}で決まった数を出し、式にします。比例なら y＝決まった数×x、反比例なら {{y＝決まった数÷x}}です。反比例のグラフは0の点を通らず、なめらかな曲線になります。",
      figure: {
        type: "formula",
        title: "x＝2 のとき y＝10。x＝5 のときの y は？",
        prose: true,
        steps: [
          { label: "比例", expr: "決まった数 ＝ 10 ÷ 2 ＝ {{5}}", note: "y÷x" },
          { label: "比例", expr: "y ＝ 5 × 5 ＝ {{25}}", note: "y＝5×x" },
          { label: "反比例", expr: "決まった数 ＝ 2 × 10 ＝ {{20}}", note: "x×y" },
          { label: "反比例", expr: "y ＝ 20 ÷ 5 ＝ {{4}}", note: "y＝20÷x" },
        ],
      },
    },
    {
      heading: "比例と反比例を見分ける",
      body: "「一方が増えると、もう一方も増える」だけでは比例とはいえません。{{2倍、3倍になるか}}を表で確かめます。年齢《ねんれい》と身長のように、どちらでもない関係もあります。",
      figure: {
        type: "compare",
        title: "比例と反比例",
        columns: [{ title: "比例", tone: "blue" }, { title: "反比例", tone: "yellow" }],
        rows: [
          { label: "x が2倍", cells: ["y も2倍", "y は1/2"] },
          { label: "決まった数", cells: ["y÷x", "x×y"] },
          { label: "式", cells: ["y＝決まった数×x", "y＝決まった数÷x"] },
          { label: "グラフ", cells: ["0を通る直線", "なめらかな曲線"] },
          { label: "例", cells: ["ノートの数と代金", "人数と1人分"] },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "一方が増えるともう一方も増えるので、年齢《ねんれい》と身長は比例", right: "2倍、3倍になるとは限らないので、比例ではない", why: "比例は、x が2倍なら y もちょうど2倍になる関係です。" },
    { wrong: "反比例で x が3倍になると、y は3減る", right: "y は1/3になる", why: "反比例は「ひく」ではなく、「何分の1」になる関係です。" },
    { wrong: "反比例の決まった数を y÷x で求める", right: "反比例の決まった数は x×y", why: "反比例では x×y がいつも同じです。y÷x は比例のときです。" },
  ],
  check: [
    { q: "y は x に比例し、x＝4 のとき y＝28 です。式を答えましょう。", a: "y＝7×x", why: "決まった数＝28÷4＝7。" },
    { q: "y は x に反比例し、x×y＝18 です。x＝6 のときの y は？", a: "3", why: "y＝18÷x なので 18÷6＝3。" },
    { q: "時速 x km で120km進むときの時間 y 時間。y は x に比例・反比例のどちら？", a: "反比例", why: "x×y＝120 がいつも同じなので反比例。" },
  ],
  next: [
    { label: "「比例と反比例」（ドリル）", href: "/learn/sansu-zukei/e-math-6-hirei-hanpirei" },
    { label: "5年「比例」（ドリル）", href: "/learn/sansu-zukei/e-math-5-hirei" },
    { label: "中1「比例と反比例」（図解）", href: "/learn/lecture/j-math-1-hirei" },
  ],
};
