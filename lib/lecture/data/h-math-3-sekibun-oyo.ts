import type { Lecture } from "../types";

export const H_MATH_3_SEKIBUN_OYO: Lecture = {
  unit: "h-math-3-sekibun-oyo",
  title: "細かく切って足し合わせる。面積・体積・長さはみな積分で求まる",
  hook: "ハムを薄く切ると、1枚1枚はほぼ平らな板です。その板の体積を全部足せば、もとのハムの体積になります。積分は「細かく切って、足し合わせる」計算なので、面積だけでなく体積や曲線の長さ、動いた道のりまで同じ考え方で求められます。",
  sections: [
    {
      heading: "面積は「上の式 − 下の式」を積分する",
      body: "区間 a≦x≦b で f(x)≧g(x) のとき、2曲線の間の面積は {{S＝∫ₐᵇ{f(x)−g(x)}dx}} です。グラフが x 軸の下にあっても、「上−下」で考えれば符号を気にしなくてすみます。まず{{交点を求めて区間を決め}}、どちらが上かを確かめてから式を立てます。",
      figure: {
        type: "formula",
        title: "y＝sin x と y＝cos x で囲まれた部分（π/4≦x≦5π/4）",
        steps: [
          { label: "交点", expr: "sin x ＝ cos x → x ＝ π/4, 5π/4", note: "この間は sin x が上" },
          { label: "面積", expr: "S ＝ ∫ {{(sin x − cos x)}} dx", note: "上 − 下、区間 π/4→5π/4" },
          { expr: "＝ [−cos x − sin x]", note: "不定積分" },
          { expr: "＝ (√2/2＋√2/2) − (−√2/2−√2/2)", note: "F(5π/4) − F(π/4)" },
          { expr: "＝ {{2√2}}", note: "面積は正になる" },
        ],
      },
    },
    {
      heading: "区分求積法：長方形の和の極限が定積分",
      body: "0≦x≦1 を n 等分し、高さ f(k/n)、幅 1/n の長方形を並べると、面積の近似は (1/n)Σf(k/n) です。n を大きくすると長方形のでこぼこが小さくなり、{{lim(1/n)Σf(k/n)＝∫₀¹f(x)dx}} が成り立ちます。これを{{区分求積法}}といい、和の極限を定積分で計算するときに使います。",
      figure: {
        type: "area",
        kind: "rect",
        title: "y＝x² の下を4つの長方形で近似（高さは16倍で表示）",
        rects: [
          { w: 1, h: 1, hLabel: "1/16", tone: "blue" },
          { w: 1, h: 4, hLabel: "4/16", tone: "blue" },
          { w: 1, h: 9, hLabel: "9/16", tone: "blue" },
          { w: 1, h: 16, hLabel: "16/16", wLabel: "幅 1/4", tone: "yellow" },
        ],
        note: "4本の和は (1/4)(1＋4＋9＋16)/16＝15/32≒0.47。n→∞ で ∫₀¹x²dx＝1/3≒0.33 に近づく。",
      },
    },
    {
      heading: "体積は「断面積」を積分する",
      body: "x 軸に垂直な平面で切った切り口の面積が S(x) のとき、立体の体積は {{V＝∫ₐᵇS(x)dx}} です。曲線 y＝f(x) を x 軸のまわりに回転させた立体では、切り口が半径 |f(x)| の円なので {{V＝π∫ₐᵇ{f(x)}²dx}} になります。半径 r の球の体積 4πr³/3 も、この式から導けます。",
      figure: {
        type: "formula",
        title: "半円 y＝√(r²−x²) を x 軸のまわりに回転（球）",
        steps: [
          { label: "断面", expr: "S(x) ＝ π{{(r² − x²)}}", note: "半径 √(r²−x²) の円" },
          { label: "体積", expr: "V ＝ π∫₋ᵣʳ (r² − x²) dx", note: "−r から r まで" },
          { expr: "＝ π[r²x − x³/3]₋ᵣʳ", note: "不定積分" },
          { expr: "＝ π(2r³ − 2r³/3) ＝ {{4πr³/3}}", note: "球の体積の公式" },
        ],
      },
    },
    {
      heading: "曲線の長さと道のりも、微小な部分の和",
      body: "曲線を細かく区切ると、各部分はほぼ線分で、長さは √(dx²＋dy²) です。これを足して {{L＝∫ₐᵇ√(1＋{f′(x)}²)dx}}、媒介変数表示なら {{L＝∫√((dx/dt)²＋(dy/dt)²)dt}} となります。数直線上を速度 v(t) で動く点では、位置の変化は ∫v dt、{{道のりは ∫|v|dt}} で、後もどりした分も足します。",
      figure: {
        type: "compare",
        title: "量ごとの積分の式と例",
        columns: [{ title: "積分する式", tone: "blue" }, { title: "例と答え", tone: "yellow" }],
        rows: [
          { label: "面積", cells: ["∫(上 − 下)dx", "y＝sin x, 0〜π → 2"] },
          { label: "回転体", cells: ["π∫y² dx", "y＝√x, 0〜1 → π/2"] },
          { label: "曲線の長さ", cells: ["∫√(1＋(y′)²)dx", "単位円 1周 → 2π"] },
          { label: "道のり", cells: ["∫|v(t)|dt", "v＝t−2, 0〜4 → 4"] },
        ],
        note: "単位円は x＝cos t, y＝sin t（0≦t≦2π）。v＝t−2 では位置の変化 ∫₀⁴(t−2)dt＝0 だが、道のりは 4。",
      },
    },
  ],
  mistakes: [
    { wrong: "回転体の体積を π∫ y dx とする", right: "V＝π∫ y² dx", why: "切り口は半径 y の円なので、断面積は πy²。y を2乗します。" },
    { wrong: "x 軸をまたぐ部分の面積を ∫f(x)dx でいっきに計算する", right: "交点で区間を分け、「上−下」で積分する", why: "x 軸の下の部分の積分は負になり、上の部分と打ち消し合ってしまいます。" },
    { wrong: "道のりを ∫v(t)dt で求める", right: "道のりは ∫|v(t)|dt", why: "∫v dt は位置の変化。向きが変わると打ち消し合うので、道のりは絶対値をつけて足します。" },
  ],
  check: [
    { q: "y＝x² と y＝x で囲まれた部分の面積は？", a: "1/6", why: "交点 x＝0, 1。この間は x が上なので ∫₀¹(x−x²)dx＝1/2−1/3＝1/6。" },
    { q: "lim[n→∞] (1/n)Σ[k＝1〜n] (k/n) の値は？", a: "1/2", why: "区分求積法で ∫₀¹ x dx＝1/2。" },
    { q: "y＝sin x（0≦x≦π）を x 軸のまわりに回転してできる立体の体積は？", a: "π²/2", why: "π∫₀^π sin²x dx＝π∫₀^π (1−cos 2x)/2 dx＝π·π/2＝π²/2。" },
  ],
  next: [
    { label: "計算の段で「面積・体積」を練習する", href: "/learn/kousuu/82" },
    { label: "ふりかえり：積分法（図解）", href: "/learn/lecture/h-math-3-sekibun" },
    { label: "ふりかえり：数学Ⅱの積分法（図解）", href: "/learn/lecture/h-math-2-sekibun" },
  ],
};
