import type { Lecture } from "../types";

export const H_MATH_1_SANKAKUHI: Lecture = {
  unit: "h-math-1-sankakuhi",
  title: "三角比は直角三角形の辺の比。0°〜180° は半径1の半円で考える",
  hook: "坂道の標識の「勾配 10%」や、木を見上げる角度から木の高さを出す計算には、三角比が使われています。角の大きさがわかれば、辺の長さの比が決まるからです。この単元で、角と長さをむすぶ道具を手に入れます。",
  sections: [
    {
      heading: "3つの三角比は、直角三角形の辺の比",
      body: "直角三角形で、直角でない角 θ に注目します。{{斜辺}}、θ の向かいの{{高さ}}（対辺）、θ をはさむ{{底辺}}の3つの辺の比を三角比といいます。三角形の大きさが変わっても、θ が同じなら比は同じです。",
      figure: {
        type: "tree",
        title: "角 θ の三角比",
        root: {
          label: "角 θ の直角三角形",
          sub: "θ が同じなら比も同じ",
          tone: "navy",
          children: [
            { label: "sinθ（正弦）", sub: "高さ ÷ 斜辺", tone: "red" },
            { label: "cosθ（余弦）", sub: "底辺 ÷ 斜辺", tone: "blue" },
            { label: "tanθ（正接）", sub: "高さ ÷ 底辺", tone: "yellow" },
          ],
        },
        note: "辺の比 3：4：5 の直角三角形で、3 の辺の向かいの角を θ とすると、sinθ＝3/5、cosθ＝4/5、tanθ＝3/4。",
      },
    },
    {
      heading: "30°・45°・60° の値は、2つの三角定規から",
      body: "辺の比が{{1：1：√2}}の直角二等辺三角形から 45°、{{1：2：√3}}の三角形から 30° と 60° の値が出ます。sin30° と cos60° が等しいように、{{θ と 90°−θ では sin と cos が入れかわります}}（sin(90°−θ)＝cosθ）。",
      figure: {
        type: "compare",
        title: "有名な角の sin と cos",
        columns: [{ title: "sinθ", tone: "red" }, { title: "cosθ", tone: "blue" }],
        rows: [
          { label: "30°", cells: ["1/2", "√3/2"] },
          { label: "45°", cells: ["1/√2（＝√2/2）", "1/√2（＝√2/2）"] },
          { label: "60°", cells: ["√3/2", "1/2"] },
        ],
        note: "tan30°＝1/√3、tan45°＝1、tan60°＝√3。",
      },
    },
    {
      heading: "0°〜180° は、半径1の半円上の点の座標",
      body: "原点を中心とする{{半径1の半円}}の上に、x 軸の正の向きから角 θ の点 P をとります。P の座標を (x, y) とすると、{{cosθ＝x、sinθ＝y}}、tanθ＝y/x と決めます。こうすると 90° より大きい角でも三角比が使え、90°＜θ＜180° では {{cos と tan が負}}、sin は正になります。",
      figure: {
        type: "numberline",
        title: "cosθ は点 P の x 座標",
        min: -1,
        max: 1,
        tick: 0.5,
        points: [
          { x: 1, label: "0°", tone: "red" },
          { x: 0.5, label: "60°", tone: "red" },
          { x: 0, label: "90°", tone: "yellow" },
          { x: -0.5, label: "120°", tone: "blue" },
          { x: -1, label: "180°", tone: "blue" },
        ],
        desc: "−1 から 1 の数直線に、cos0°＝1、cos60°＝0.5、cos90°＝0、cos120°＝−0.5、cos180°＝−1 の位置を示した図。",
        note: "θ が大きくなるほど P は左へ進み、cosθ は 1 から −1 へ小さくなる。",
      },
    },
    {
      heading: "180°−θ と相互関係で、値を求める",
      body: "点 P を y 軸について折り返すと角は 180°−θ になるので、{{sin(180°−θ)＝sinθ、cos(180°−θ)＝−cosθ}}、tan(180°−θ)＝−tanθ です。また、半径1から {{sin²θ＋cos²θ＝1}}、tanθ＝sinθ/cosθ、1＋tan²θ＝1/cos²θ が成り立ちます。1つの値から残りを出すとき、θ の範囲で{{符号}}を決めます。",
      figure: {
        type: "formula",
        title: "sinθ＝3/5（90°＜θ＜180°）のとき cosθ, tanθ",
        steps: [
          { expr: "cos²θ ＝ 1−(3/5)² ＝ {{16/25}}", note: "sin²θ＋cos²θ＝1" },
          { expr: "cosθ ＝ {{−4/5}}", note: "90°＜θ＜180° なので cosθ＜0" },
          { expr: "tanθ ＝ (3/5)÷(−4/5) ＝ {{−3/4}}", note: "tanθ＝sinθ/cosθ" },
        ],
      },
    },
  ],
  mistakes: [
    {
      wrong: "sinθ＝底辺/斜辺",
      right: "sinθ＝高さ/斜辺、cosθ＝底辺/斜辺",
      why: "sin は θ の向かいの辺（高さ）、cos は θ をはさむ辺（底辺）を使います。",
    },
    {
      wrong: "cos120°＝1/2",
      right: "cos120°＝−1/2",
      why: "120° の点は y 軸の左にあり x 座標が負です。cos120°＝cos(180°−60°)＝−cos60°。",
    },
    {
      wrong: "sinθ＝3/5（90°＜θ＜180°）のとき cosθ＝4/5",
      right: "cosθ＝−4/5",
      why: "cos²θ＝16/25 からは ±4/5 の2つが出ます。鈍角では cos が負なので、マイナスを選びます。",
    },
  ],
  check: [
    { q: "sin150° の値は？", a: "1/2", why: "sin150°＝sin(180°−30°)＝sin30°＝1/2。" },
    { q: "tan135° の値は？", a: "−1", why: "tan135°＝tan(180°−45°)＝−tan45°＝−1。" },
    {
      q: "cosθ＝1/3（0°＜θ＜90°）のとき、sinθ の値は？",
      a: "2√2/3",
      why: "sin²θ＝1−1/9＝8/9。0°＜θ＜90° なので sinθ＞0 で、sinθ＝√8/3＝2√2/3。",
    },
  ],
  next: [
    { label: "計算の段で「三角比の値（0°〜180°）」を練習する", href: "/learn/kousuu/25" },
    { label: "計算の段で「三角比の相互関係」に進む", href: "/learn/kousuu/26" },
    { label: "中学のふりかえり「三平方の定理」", href: "/learn/sugaku-chu/j-math-3-sanheiho" },
  ],
};
