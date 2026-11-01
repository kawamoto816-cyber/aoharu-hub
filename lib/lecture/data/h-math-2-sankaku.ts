import type { Lecture } from "../types";

export const H_MATH_2_SANKAKU: Lecture = {
  unit: "h-math-2-sankaku",
  title: "単位円をまわる点の座標が cosθ と sinθ。角は弧度法で測る",
  hook: "観覧車のゴンドラの高さ、時計の針の先、音や電気の波。くり返す動きは、円の上をまわる点の座標で表せます。三角比を 0°〜180° から、何回転でもまわれる「一般角」へ広げたものが三角関数です。",
  sections: [
    {
      heading: "弧度法：角を「弧の長さ」で測る",
      body: "半径1の円で、長さ1の弧に対する中心角を {{1ラジアン}} とします。半円の弧の長さは π なので {{180°＝π}} です。この角の測り方を{{弧度法}}といい、ふつう単位は書きません。弧度法を使うと、半径 r、中心角 θ のおうぎ形の弧の長さは rθ、面積は r²θ/2 と簡単に書けます。",
      figure: {
        type: "compare",
        title: "度数法と弧度法",
        columns: [{ title: "度数法", tone: "blue" }, { title: "弧度法", tone: "yellow" }],
        rows: [
          { cells: ["30°", "π/6"] },
          { cells: ["45°", "π/4"] },
          { cells: ["60°", "π/3"] },
          { cells: ["90°", "π/2"] },
          { cells: ["180°", "π"] },
          { cells: ["360°", "2π"] },
        ],
        note: "度 → 弧度は ×π/180、弧度 → 度は ×180/π。",
      },
    },
    {
      heading: "単位円の上の点 (cosθ, sinθ)",
      body: "x 軸の正の向きから、反時計回りを正、時計回りを負として回した角を{{一般角}}といいます。角 θ の動径と単位円（半径1）の交点を P とすると、{{P の座標が (cosθ, sinθ)}}、tanθ＝sinθ/cosθ は直線 OP の傾きです。θ と θ+2nπ（n は整数）は同じ位置なので、三角関数の値も同じです。符号は P がどの象限にあるかで決まります。",
      figure: {
        type: "flow",
        dir: "col",
        title: "P の象限と、値が正になるもの",
        steps: [
          { label: "第1象限", sub: "sin・cos・tan が正", tone: "yellow" },
          { label: "第2象限", sub: "sin だけ正", tone: "blue" },
          { label: "第3象限", sub: "tan だけ正", tone: "plain" },
          { label: "第4象限", sub: "cos だけ正", tone: "navy" },
        ],
        arrows: ["π/2 をこえる", "π をこえる", "3π/2 をこえる"],
        note: "0＜θ＜2π で、θ が大きくなる順。",
      },
    },
    {
      heading: "値は単位円の点の座標を読む",
      body: "たとえば cos(4π/3) は、4π/3＝240° なので、P は第3象限の (−1/2, −√3/2) です。x 座標を読んで {{cos(4π/3)＝−1/2}} です。30°・45°・60° の直角三角形の辺の比を使って、どの象限でも座標を求められます。",
      figure: {
        type: "formula",
        title: "cos(4π/3) と sin(4π/3)",
        steps: [
          { expr: "4π/3 ＝ {{240°}}", note: "×180/π" },
          { expr: "P(−1/2, −√3/2)", note: "第3象限、x 軸と 60°" },
          { expr: "cos(4π/3) ＝ {{−1/2}}、sin(4π/3) ＝ {{−√3/2}}", note: "x 座標と y 座標" },
        ],
      },
    },
    {
      heading: "相互関係で残りの値を出す",
      body: "P は単位円の上にあるので {{sin²θ+cos²θ＝1}} が成り立ちます。ほかに tanθ＝sinθ/cosθ、{{1+tan²θ＝1/cos²θ}} があります。1つの値から残りを求めるときは、θ の範囲から{{符号}}を決めるのを忘れないようにします。また、sin(−θ)＝−sinθ、cos(−θ)＝cosθ のように、角を変えたときの関係も単位円で確かめられます。",
      figure: {
        type: "formula",
        title: "sinθ＝3/5（π/2＜θ＜π）のとき",
        steps: [
          { expr: "cos²θ ＝ 1−(3/5)² ＝ 16/25", note: "sin²θ+cos²θ＝1" },
          { expr: "cosθ ＝ {{−}}4/5", note: "第2象限なので cos は負" },
          { expr: "tanθ ＝ (3/5)÷(−4/5) ＝ {{−3/4}}", note: "sin÷cos" },
        ],
      },
    },
    {
      heading: "グラフは波。周期に注目",
      body: "y＝sinθ のグラフは −1 から 1 の間をくり返す波で、{{周期は 2π}} です。y＝cosθ は y＝sinθ を θ 軸方向に −π/2 だけ平行移動したものです。y＝tanθ は {{周期 π}} で、θ＝π/2+nπ では値がなく、そこに漸近線があります。y＝sin2θ の周期は 2π/2＝π、y＝2sinθ は値の範囲が −2 から 2 になります。",
      figure: {
        type: "compare",
        title: "グラフの特徴",
        columns: [{ title: "y＝sinθ・cosθ", tone: "blue" }, { title: "y＝tanθ", tone: "yellow" }],
        rows: [
          { label: "周期", cells: ["2π", "π"] },
          { label: "値の範囲", cells: ["−1 以上 1 以下", "実数全体"] },
          { label: "値がない θ", cells: ["なし", "π/2+nπ"] },
        ],
        note: "y＝sin kθ（k＞0）の周期は 2π/k。",
      },
    },
  ],
  mistakes: [
    { wrong: "sinθ＝3/5（π/2＜θ＜π）のとき cosθ＝4/5", right: "cosθ＝−4/5", why: "第2象限では P の x 座標が負なので、cos は負です。" },
    { wrong: "sin(−θ)＝sinθ", right: "sin(−θ)＝−sinθ、cos(−θ)＝cosθ", why: "−θ の点は θ の点を x 軸で折り返した位置なので、y 座標だけ符号が変わります。" },
    { wrong: "y＝sin2θ の周期を 4π とする", right: "周期は π", why: "2θ が 2π 進むのは θ が π 進むとき。θ の係数が大きいほど波は細かくなります。" },
  ],
  check: [
    { q: "sin(7π/6) の値は？", a: "−1/2", why: "7π/6＝210°。P は第3象限の (−√3/2, −1/2)。" },
    { q: "cos(−π/3) の値は？", a: "1/2", why: "cos(−θ)＝cosθ より cos(π/3)＝1/2。" },
    { q: "y＝sin3θ の周期は？", a: "2π/3", why: "y＝sin kθ の周期は 2π/k。" },
  ],
  next: [
    { label: "計算の段で「三角関数の値（弧度法）」を練習する", href: "/learn/kousuu/51" },
    { label: "ふりかえり「三角比」の計算の段", href: "/learn/kousuu/25" },
    { label: "つぎの単元「加法定理」", href: "/learn/kousuu/52" },
  ],
};
