import type { Lecture } from "../types";

export const H_MATH_1_KEIRYO: Lecture = {
  unit: "h-math-1-keiryo",
  title: "面積は S＝½bc sinA。空間図形も三角形を取り出して計算する",
  hook: "土地の面積をはかるとき、測量では土地を三角形に分け、辺の長さと角から面積を出します。高さを直接はからなくても、三角比を使えば面積や長さが求められます。正弦定理・余弦定理と組み合わせて、平面や空間の図形を計算しましょう。",
  sections: [
    {
      heading: "2辺とその間の角から面積",
      body: "△ABC で、辺 AC＝b を底辺とすると、B から AC に下ろした{{高さは c sinA}} です。だから面積は {{S＝½bc sinA}}。使うのは「2辺と、その{{間の角}}」の組です。A が鈍角でも、sinA＞0 なので同じ式が使えます。",
      figure: {
        type: "formula",
        title: "b＝4, c＝5, A＝60° の三角形の面積",
        steps: [
          { expr: "高さ ＝ c sinA", note: "底辺を b にとる" },
          { expr: "S ＝ ½ × b × {{c sinA}}", note: "½ × 底辺 × 高さ" },
          { expr: "S ＝ ½ × 4 × 5 × {{√3/2}}", note: "sin60°＝√3/2" },
          { expr: "S ＝ {{5√3}}", note: "" },
        ],
      },
    },
    {
      heading: "3辺だけなら、cos → sin → 面積の順",
      body: "3辺しかわからないときは、まず{{余弦定理}}で1つの角の cos を出します。次に {{sin²A＋cos²A＝1}} で sin を求め、面積の公式に入れます。0°＜A＜180° では sinA＞0 なので、sin はいつも正の方をとります。",
      figure: {
        type: "flow",
        dir: "col",
        title: "3辺 a＝7, b＝5, c＝8 の三角形の面積",
        steps: [
          { label: "3辺 7・5・8", sub: "a＝7, b＝5, c＝8", tone: "plain" },
          { label: "cosA＝1/2", sub: "(25＋64−49)/80", tone: "blue" },
          { label: "sinA＝√3/2", sub: "sin²A＝1−1/4", tone: "blue" },
          { label: "S＝10√3", sub: "½×5×8×√3/2", tone: "yellow" },
        ],
        arrows: ["余弦定理", "相互関係", "S＝½bc sinA"],
      },
    },
    {
      heading: "内接円の半径は、面積を3つに分けて",
      body: "三角形の3つの辺に接する円を{{内接円}}、その中心を I とします。I と3つの頂点をむすぶと、高さがどれも半径 r の三角形3つに分かれます。だから {{S＝½r(a＋b＋c)}} で、面積がわかれば r が出ます。上の三角形なら 10√3＝½r×20 から r＝√3 です。",
      figure: {
        type: "tree",
        title: "△ABC（S＝10√3）を I で3つに分ける",
        root: {
          label: "△ABC",
          sub: "S＝10√3",
          tone: "navy",
          children: [
            { label: "△IBC", sub: "½×r×7", tone: "blue" },
            { label: "△ICA", sub: "½×r×5", tone: "blue" },
            { label: "△IAB", sub: "½×r×8", tone: "blue" },
          ],
        },
        note: "3つをたすと ½r×(7＋5＋8)＝10r＝10√3 なので r＝√3。",
      },
    },
    {
      heading: "空間図形は、平面の三角形を取り出す",
      body: "空間図形の長さや角は、{{求めたいものがのっている三角形}}を1つ取り出して、平面の問題にします。1辺 6 の正四面体 ABCD で、辺 CD の中点を M とすると、AM と BM は正三角形の高さで {{3√3}} です。△ABM の3辺がわかるので、余弦定理と面積の公式が使えます。",
      figure: {
        type: "formula",
        title: "1辺 6 の正四面体、CD の中点 M。△ABM の面積",
        steps: [
          { expr: "AM ＝ BM ＝ {{3√3}}, AB ＝ 6", note: "1辺6の正三角形の高さ" },
          { expr: "cos∠AMB ＝ (27＋27−36)/(2·27) ＝ {{1/3}}", note: "余弦定理" },
          { expr: "sin∠AMB ＝ √(1−1/9) ＝ {{2√2/3}}", note: "sin は正" },
          { expr: "△ABM ＝ ½·3√3·3√3·(2√2/3) ＝ {{9√2}}", note: "S＝½bc sinA" },
        ],
      },
    },
  ],
  mistakes: [
    {
      wrong: "b, c と角 B で S＝½bc sinB とする",
      right: "S＝½bc sinA（b と c の間の角は A）",
      why: "面積の公式に入れる角は、2辺に「はさまれた角」です。",
    },
    {
      wrong: "S＝½bc cosA",
      right: "S＝½bc sinA",
      why: "高さは c sinA なので、使うのは sin です。cos は余弦定理で使います。",
    },
    {
      wrong: "内接円で S＝r(a＋b＋c) として r を求める",
      right: "S＝½r(a＋b＋c)",
      why: "3つの三角形の面積はどれも ½×底辺×r です。½ を忘れると r が半分になります。",
    },
  ],
  check: [
    {
      q: "b＝6, c＝4, A＝150° の三角形の面積は？",
      a: "6",
      why: "S＝½×6×4×sin150°＝12×½＝6。",
    },
    {
      q: "3辺が 3, 5, 7 の三角形の面積は？",
      a: "15√3/4",
      why: "辺 7 の向かいの角を θ とすると cosθ＝−1/2、sinθ＝√3/2。S＝½×3×5×√3/2＝15√3/4。",
    },
    {
      q: "上の三角形（3辺 3, 5, 7）の内接円の半径は？",
      a: "√3/2",
      why: "15√3/4＝½r×15 から r＝√3/2。",
    },
  ],
  next: [
    { label: "計算の段で「三角形の面積」を練習する", href: "/learn/kousuu/29" },
    { label: "ふりかえり「余弦定理」", href: "/learn/kousuu/28" },
    { label: "関連「三角形の性質」（内心・外心）", href: "/learn/sugaku-ko/h-math-a-sankakukei" },
  ],
};
