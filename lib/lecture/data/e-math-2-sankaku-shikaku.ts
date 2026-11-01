import type { Lecture } from "../types";

export const E_MATH_2_SANKAKU_SHIKAKU: Lecture = {
  unit: "e-math-2-sankaku-shikaku",
  title: "三角形・四角形は「何本の直線でかこまれているか」で見分ける",
  hook: "おにぎり、ノート、まど。まわりには三角や四角の形がたくさんあります。算数では、形を見分けるきまりを、ことばではっきりさせます。きまりがわかると、どんな形でも見分けられます。",
  sections: [
    {
      heading: "直線のかずで見分ける",
      body: "3本の直線でかこまれた形を{{三角形}}といいます。4本の直線でかこまれた形を{{四角形}}といいます。まるい線があると、どちらでもありません。すきまがあいていても、ちがいます。",
      figure: {
        type: "tree",
        title: "形のなかま分け",
        root: {
          label: "直線でかこまれた形",
          tone: "navy",
          children: [
            { label: "三角形", sub: "直線が3本", tone: "blue", children: [{ label: "直角三角形", sub: "直角が1つ" }] },
            {
              label: "四角形",
              sub: "直線が4本",
              tone: "yellow",
              children: [
                { label: "長方形", sub: "かどが4つとも直角" },
                { label: "正方形", sub: "へんの長さも同じ" },
              ],
            },
          ],
        },
      },
    },
    {
      heading: "へんと ちょう点",
      body: "まわりの直線を{{へん}}といいます。かどの点を{{ちょう点}}といいます。三角形は、へんも ちょう点も3つです。四角形は、どちらも4つです。",
      figure: {
        type: "compare",
        title: "へんと ちょう点の数",
        columns: [{ title: "三角形", tone: "blue" }, { title: "四角形", tone: "yellow" }],
        rows: [
          { label: "へん", cells: ["3つ", "4つ"] },
          { label: "ちょう点", cells: ["3つ", "4つ"] },
        ],
      },
    },
    {
      heading: "直角は、紙をおって作れる",
      body: "紙を2回おると、ぴったりのかどができます。この形のかどを{{直角}}といいます。三角じょうぎにも直角があります。かどに当てると、直角かどうかわかります。",
      figure: {
        type: "flow",
        title: "おり紙で直角を作る",
        steps: [
          { label: "紙を半分におる", sub: "まっすぐな線ができる" },
          { label: "線を合わせてもう1回", sub: "線と線をかさねる", tone: "blue" },
          { label: "かどが直角", sub: "これで直角をたしかめる", tone: "yellow" },
        ],
        arrows: ["おる", "おる"],
      },
    },
    {
      heading: "長方形と正方形",
      body: "かどが4つとも直角の四角形を{{長方形}}といいます。長方形は、むかい合うへんの長さが同じです。4つのへんの長さも同じなら{{正方形}}です。",
      figure: {
        type: "compare",
        title: "長方形と正方形をくらべる",
        columns: [{ title: "長方形", tone: "blue" }, { title: "正方形", tone: "yellow" }],
        rows: [
          { label: "かど", cells: ["4つとも直角", "4つとも直角"] },
          { label: "へん", cells: ["むかい合うへんが同じ", "4つとも同じ"] },
        ],
        note: "正方形も、長方形のきまりに合っている。",
      },
    },
  ],
  mistakes: [
    { wrong: "かどがまるい三角も三角形とする", right: "三角形ではない", why: "三角形は、3本の直線だけでかこまれた形です。" },
    { wrong: "線がとちゅうで切れていても四角形とする", right: "四角形ではない", why: "すきまがあると、かこまれていません。" },
    { wrong: "ななめにおいた正方形は正方形ではない", right: "正方形のまま", why: "おき方をかえても、へんの長さとかどは同じです。" },
  ],
  check: [
    { q: "四角形の ちょう点はいくつですか。", a: "4つ", why: "四角形は、へんも ちょう点も4つです。" },
    { q: "4つのかどが直角で、へんの長さが4つとも同じ四角形を何といいますか。", a: "正方形", why: "かどが直角でへんが4つとも同じなので正方形です。" },
    { q: "直角が1つある三角形を何といいますか。", a: "直角三角形", why: "直角のかどがある三角形です。" },
  ],
  next: [
    { label: "「三角形と四角形」のドリル", href: "/learn/sansu-zukei/e-math-2-sankaku-shikaku" },
    { label: "「はこの形」のドリル", href: "/learn/sansu-zukei/e-math-2-hako" },
    { label: "つづき「二とうへん三角形と正三角形」（3年）", href: "/learn/sansu-zukei/e-math-3-nitouhen" },
  ],
};
