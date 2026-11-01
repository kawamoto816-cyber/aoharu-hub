import type { Lecture } from "../types";

export const H_MATH_3_BIBUN_OYO: Lecture = {
  unit: "h-math-3-bibun-oyo",
  title: "f′ で増減、f″ で曲がり方。接線・グラフ・不等式に使う",
  hook: "薬を飲んだあとの血中の濃さは、上がってから下がっていきます。y＝xe⁻ˣ のような式のグラフで「いつ最大になるか」「どこで曲がり方が変わるか」を求めるのが微分法の応用です。f′(x) と f″(x) の符号を調べるだけで、グラフの形がわかります。",
  sections: [
    {
      heading: "接線と法線",
      body: "x＝a の点の接線は {{y−f(a)＝f′(a)(x−a)}} で、数学Ⅱと同じ形です。y＝eˣ の x＝1 の点では、接点 (1, e)、傾き e なので接線は y＝ex になります。接点で接線に垂直な直線を{{法線}}といい、その傾きは {{−1/f′(a)}}（f′(a)≠0 のとき）です。",
      figure: {
        type: "flow",
        dir: "row",
        title: "y＝eˣ の x＝1 における接線",
        steps: [
          { label: "接点 (1, e)", sub: "f(1)＝e", tone: "plain" },
          { label: "傾き e", sub: "f′(x)＝eˣ", tone: "blue" },
          { label: "y＝ex", sub: "y−e＝e(x−1)", tone: "yellow" },
        ],
        arrows: ["微分して代入", "式に入れる"],
      },
    },
    {
      heading: "f′(x) の符号で増減と極値",
      body: "f(x)＝xe⁻ˣ を微分すると、積と合成のルールで {{f′(x)＝(1−x)e⁻ˣ}} です。e⁻ˣ はつねに正なので、f′ の符号は {{1−x の符号}}だけで決まります。x＜1 で増加、x＞1 で減少するので、x＝1 で{{極大値 1/e}} をとります。",
      figure: {
        type: "numberline",
        title: "f′(x)＝(1−x)e⁻ˣ の符号と増減",
        min: -1,
        max: 3,
        points: [{ x: 1, label: "極大 1/e", tone: "red" }],
        ranges: [
          { from: -1, to: 1, label: "＋ 増加", tone: "red", openTo: true },
          { from: 1, to: 3, label: "− 減少", tone: "blue", openFrom: true },
        ],
        desc: "x の数直線。x＜1 で f′＞0（増加）、x＞1 で f′＜0（減少）。x＝1 で極大値 1/e。",
        note: "目もりは x。e⁻ˣ＞0 なので、符号は 1−x だけを見ればよい。",
      },
    },
    {
      heading: "f″(x) の符号で凹凸と変曲点",
      body: "f′(x) をもう一度微分した{{第2次導関数 f″(x)}} は、接線の傾きの増え方を表します。f″＞0 の区間は{{下に凸}}、f″＜0 の区間は{{上に凸}}で、凹凸が入れかわる点を{{変曲点}}といいます。f(x)＝xe⁻ˣ では f″(x)＝(x−2)e⁻ˣ なので、変曲点は (2, 2/e²) です。",
      figure: {
        type: "compare",
        title: "f″(x) の符号とグラフの曲がり方",
        columns: [
          { title: "f″(x)＞0", tone: "blue" },
          { title: "f″(x)＜0", tone: "red" },
        ],
        rows: [
          { label: "曲がり方", cells: ["下に凸", "上に凸"] },
          { label: "接線の傾き", cells: ["だんだん増える", "だんだん減る"] },
          { label: "接線との位置", cells: ["グラフが接線の上", "グラフが接線の下"] },
          { label: "例", cells: ["y＝x²", "y＝−x²"] },
        ],
      },
    },
    {
      heading: "不等式は「差の関数」の最小値で示す",
      body: "A≧B を示すには、{{g(x)＝A−B}} とおき、g(x) の最小値が0以上であることを示します。eˣ≧1＋x なら g(x)＝eˣ−1−x、g′(x)＝eˣ−1 で、x＝0 を境に減少から増加に変わります。最小値は {{g(0)＝0}} なので、すべての x で g(x)≧0 です。方程式の実数解の個数も、同じようにグラフをかいて調べます。",
      figure: {
        type: "formula",
        title: "eˣ≧1＋x の証明",
        steps: [
          { expr: "g(x) ＝ eˣ − 1 − x", note: "差の関数をつくる" },
          { expr: "g′(x) ＝ {{eˣ − 1}}", note: "x＜0 で負、x＞0 で正" },
          { expr: "最小値 ＝ g(0) ＝ {{0}}", note: "x＝0 で減少→増加" },
          { label: "結論", expr: "g(x) ≧ 0 より {{eˣ ≧ 1 ＋ x}}", note: "等号は x＝0" },
        ],
      },
    },
    {
      heading: "速度と加速度",
      body: "数直線上を動く点の位置が x＝f(t) のとき、{{速度 v＝dx/dt}}、{{加速度 a＝dv/dt}} です。x＝t³−6t² なら v＝3t²−12t、a＝6t−12 となります。v＝3t(t−4) なので、t＞0 では 0＜t＜4 で負の向きに動き、v＝0 となる {{t＝4}} で向きを変えます。速さは |v| で表します。",
    },
  ],
  mistakes: [
    { wrong: "f″(a)＝0 なら、x＝a は必ず変曲点", right: "f″ の符号が変わるときだけ変曲点", why: "f(x)＝x⁴ は f″(x)＝12x² で f″(0)＝0 ですが、前後とも f″≧0 で下に凸のまま。変曲点ではありません。" },
    { wrong: "法線の傾きを −f′(a) とする", right: "法線の傾きは −1/f′(a)", why: "垂直な2直線の傾きの積は −1 です。符号を変えるだけでなく逆数にします。" },
    { wrong: "(xe⁻ˣ)′＝e⁻ˣ＋xe⁻ˣ＝(1＋x)e⁻ˣ", right: "(e⁻ˣ)′＝−e⁻ˣ なので (1−x)e⁻ˣ", why: "e⁻ˣ は合成関数で、中身 −x の微分 −1 がかかります。符号を落とすと増減が逆になります。" },
  ],
  check: [
    { q: "y＝√x の x＝4 における接線の方程式は？", a: "y＝x/4＋1", why: "接点 (4, 2)、y′＝1/(2√x) より傾き 1/4。y−2＝(1/4)(x−4)。" },
    { q: "f(x)＝x⁴−4x³ の変曲点は？", a: "(0, 0) と (2, −16)", why: "f″(x)＝12x²−24x＝12x(x−2)。x＝0, 2 の前後で符号が変わる。f(2)＝16−32＝−16。" },
    { q: "位置が x＝t³−6t² の点の、t＝1 での加速度は？", a: "−6", why: "v＝3t²−12t、a＝6t−12。t＝1 で a＝−6。" },
  ],
  next: [
    { label: "計算の段で「接線の方程式（いろいろな関数）」を練習する", href: "/learn/kousuu/77" },
    { label: "前の単元「微分法」（数学Ⅲ）のレクチャー", href: "/learn/lecture/h-math-3-bibun" },
    { label: "数学Ⅱ「微分法」をふり返る", href: "/learn/lecture/h-math-2-bibun" },
  ],
};
