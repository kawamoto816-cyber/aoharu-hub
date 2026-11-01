import type { Lecture } from "../types";

export const E_MATH_3_EN_KYU: Lecture = {
  unit: "e-math-3-en-kyu",
  title: "円は「中心から同じ長さ」の形。球はどこで切っても切り口が円",
  hook: "玉入れの玉、ボール、まるいお皿。まるい形は、みのまわりにたくさんあります。円と球のきまりがわかると、コンパスできれいな円をかいたり、箱に入るボールの大きさを考えたりできます。",
  sections: [
    {
      heading: "円の中心・半けい・直けい",
      body: "1つの点から{{同じ長さ}}になるようにかいたまるい形を{{円}}といいます。真ん中の点を{{中心}}、中心から円のまわりまでひいた直線を{{半けい}}、中心を通って、まわりからまわりまでひいた直線を{{直けい}}といいます。1つの円では、半けいはどれも同じ長さです。",
      figure: {
        type: "tree",
        title: "円のことば",
        root: {
          label: "円",
          tone: "navy",
          children: [
            { label: "中心", sub: "真ん中の点", tone: "yellow" },
            { label: "半けい", sub: "中心→まわり", tone: "blue" },
            { label: "直けい", sub: "中心を通る線", tone: "blue" },
          ],
        },
      },
    },
    {
      heading: "直けいは半けいの2つ分",
      body: "直けいの中には、半けいが2つ入っています。だから{{直けい＝半けい×2}}です。半けいが4cmの円なら、直けいは8cmです。直けいは、円の中にひける直線の中で{{一番長い}}線です。",
      figure: {
        type: "area",
        kind: "bar",
        title: "半けい4cmの円の直けい",
        max: 8,
        bars: [
          {
            label: "直けい",
            parts: [
              { value: 4, label: "半けい4cm", tone: "blue" },
              { value: 4, label: "半けい4cm", tone: "yellow" },
            ],
            total: "8cm",
          },
        ],
      },
    },
    {
      heading: "コンパスで円をかく",
      body: "コンパスは、はりとえんぴつの間を{{半けいの長さ}}に開いて使います。はりをさしたところが円の中心になります。コンパスは、長さをほかの場所にうつしたり、同じ長さを見くらべたりするのにも使えます。",
      figure: {
        type: "flow",
        title: "半けい3cmの円をかく",
        steps: [
          { label: "3cmに開く", sub: "ものさしに合わせる", tone: "blue" },
          { label: "はりをさす", sub: "ここが中心", tone: "yellow" },
          { label: "くるりと回す", sub: "少しかたむける", tone: "navy" },
        ],
      },
    },
    {
      heading: "球はどこで切っても切り口が円",
      body: "ボールのように、どこから見ても円に見える形を{{球}}といいます。球を平らに切ると、切り口はいつも円になり、{{真ん中で切ったとき一番大きい}}円になります。その円の中心・半けい・直けいが、球の中心・半けい・直けいです。",
      figure: {
        type: "compare",
        title: "円と球",
        columns: [{ title: "円", tone: "blue" }, { title: "球", tone: "yellow" }],
        rows: [
          { label: "形", cells: ["平らなまるい形", "ボールの形"] },
          { label: "半けい", cells: ["中心→まわり", "中心→表面"] },
          { label: "切り口", cells: ["ー", "いつも円"] },
        ],
      },
    },
    {
      heading: "箱に入ったボールで考える",
      body: "直けい6cmのボールが3こ、一列にぴったり箱に入っているとき、箱の長さは 6×3＝18cm です。ボールがならぶ長さは{{直けいの分}}なので、半けいではなく直けいをたします。",
      figure: {
        type: "area",
        kind: "bar",
        title: "直けい6cmのボール3こ",
        max: 18,
        bars: [
          {
            label: "箱の長さ",
            parts: [
              { value: 6, label: "6cm", tone: "blue" },
              { value: 6, label: "6cm", tone: "yellow" },
              { value: 6, label: "6cm", tone: "blue" },
            ],
            total: "18cm",
          },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "半けい5cmの円の直けいは5cm", right: "直けいは10cm", why: "直けいは半けい2つ分。5×2＝10cmです。" },
    { wrong: "直けい10cmのボール3こがならぶ長さを 5×3＝15cm とする", right: "10×3＝30cm", why: "ボールがならぶ長さは、1こにつき直けいの分です。" },
    { wrong: "球はどこで切っても同じ大きさの円になる", right: "真ん中で切ると一番大きく、はしに近いほど小さい円", why: "切り口はいつも円ですが、大きさは切る場所でかわります。" },
  ],
  check: [
    { q: "直けい12cmの円の半けいは何cmですか。", a: "6cm", why: "半けいは直けいの半分。12÷2＝6。" },
    { q: "半けい3cmのボールを4こ一列にならべると、何cmになりますか。", a: "24cm", why: "直けいは6cm。6×4＝24。" },
    { q: "円の中にひける直線で、一番長いのは何ですか。", a: "直けい", why: "中心を通る直線が一番長くなります。" },
  ],
  next: [
    { label: "ドリル：円と球", href: "/learn/sansu-zukei/e-math-3-en-kyu" },
    { label: "つぎ：コンパスで三角形をかく", href: "/learn/sansu-zukei/e-math-3-nitouhen" },
    { label: "小2 はこの形", href: "/learn/sansu-zukei/e-math-2-hako" },
  ],
};
