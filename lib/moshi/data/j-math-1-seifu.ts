// 中1数学「正の数・負の数」の大問。答えは python で検算し、scripts/check-moshi.ts でも確かめる。
import type { Daimon } from "../types";

export const J_MATH_1_SEIFU: Daimon[] = [
  {
    id: "j-math-1-seifu/1",
    subject: "math",
    grade: "中1",
    units: ["j-math-1-seifu"],
    title: "正の数・負の数",
    lead: "次の問いに答えなさい。",
    style: "mix",
    level: 2,
    points: 20,
    minutes: 10,
    review: { status: "draft" },
    material: [
      {
        kind: "table",
        caption: "(6) 5人のテストの得点（70点を基準にした差）",
        head: ["Aさん", "Bさん", "Cさん", "Dさん", "Eさん"],
        rows: [["+8", "−5", "+3", "−12", "+1"]],
      },
    ],
    items: [
      {
        id: "1",
        no: "(1)",
        prompt: "次の計算をしなさい。\n(−7) + (+3) − (−5)",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "ひき算は、ひく数の符号を変えてたし算に直す。",
        answer: { kind: "num", answerKind: "num", answer: ["1"], calc: "(-7)+(+3)-(-5)" },
        steps: [
          {
            title: "ひき算をたし算に直す",
            body: "−(−5) は {{＋(＋5)}} と同じです。式は (−7)＋(＋3)＋(＋5) になります。",
            figure: { ref: { unit: "j-math-1-seifu", section: 3 } },
            trap: "−(−5) を −5 のまま計算して −9 にしてしまう。",
          },
          {
            title: "正の項・負の項をまとめる",
            body: "正の項は 3＋5＝8、負の項は −7。8−7 で {{1}} です。",
            back: [{ label: "計算の段「たし算・ひき算の混じった式」", href: "/learn/math/3" }],
          },
        ],
      },
      {
        id: "2",
        no: "(2)",
        prompt: "次の計算をしなさい。\n(−2)³ × 3 − 12 ÷ (−4)",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "累乗 → かけ算・わり算 → たし算・ひき算の順。",
        answer: { kind: "num", answerKind: "num", answer: ["-21"], calc: "(-2)^3*3-12÷(-4)" },
        steps: [
          {
            title: "累乗を先に計算する",
            body: "(−2)³ ＝ (−2)×(−2)×(−2) ＝ {{−8}}。負の数を3回かけるので答えは負です。",
            trap: "(−2)³ を −6 にする（3をかけてしまう）。",
          },
          {
            title: "かけ算・わり算、それからひき算",
            body: "計算の順番どおりに進めます。",
            figure: {
              type: "formula",
              title: "計算の順序",
              steps: [
                { expr: "(−2)³ × 3 − 12 ÷ (−4)" },
                { expr: "{{−8}} × 3 − 12 ÷ (−4)", note: "累乗" },
                { expr: "{{−24}} − {{(−3)}}", note: "かけ算・わり算" },
                { expr: "−24 + 3 = {{−21}}", note: "ひく数の符号を変える" },
              ],
            },
          },
        ],
      },
      {
        id: "3",
        no: "(3)",
        prompt: "次の計算をしなさい。\n(−3/4) ÷ 9/8",
        points: 4,
        skill: "知識・技能",
        level: 2,
        point: "わり算は逆数のかけ算。符号を先に決める。",
        answer: { kind: "num", answerKind: "num", answer: ["-2/3"], calc: "(-3/4)÷(9/8)" },
        steps: [
          {
            title: "逆数をかける",
            body: "÷9/8 は {{×8/9}} に直します。負の数が1つなので、答えの符号は −。",
          },
          {
            title: "約分してから計算する",
            body: "3/4 × 8/9 で、3 と 9、4 と 8 を約分すると 1×2 / 1×3。答えは {{−2/3}} です。",
            trap: "約分しないで −24/36 のまま答える（約分まで書いて正解）。",
          },
        ],
      },
      {
        id: "4",
        no: "(4)",
        prompt: "次の4つの数を、小さい順に並べなさい。\n−2.5　1/3　−3　0",
        points: 3,
        skill: "知識・技能",
        level: 1,
        point: "負の数は、絶対値が大きいほど小さい。",
        answer: { kind: "order", tokens: ["−3", "−2.5", "0", "1/3"] },
        steps: [
          {
            title: "数直線に置いて考える",
            body: "負の数は0の左側。{{0から遠いほど小さい}}ので、−3 は −2.5 より小さい。",
            figure: {
              type: "numberline",
              title: "4つの数の位置",
              min: -4,
              max: 2,
              tick: 0.5,
              labelEvery: 1,
              points: [
                { x: -3, label: "−3", tone: "red" },
                { x: -2.5, label: "−2.5", tone: "red" },
                { x: 0, label: "0" },
                { x: 1 / 3, label: "1/3", tone: "blue" },
              ],
            },
            trap: "−2.5 の方が −3 より小さいと考える（2.5 と 3 の大小で決めてしまう）。",
          },
        ],
      },
      {
        id: "5",
        no: "(5)",
        prompt: "数直線上で、ある数に対応する点と 0（原点）とのきょりのことを、その数の何といいますか。",
        points: 2,
        skill: "知識・技能",
        level: 1,
        point: "0からのきょり＝絶対値。符号をとった数。",
        answer: {
          kind: "term",
          accept: ["絶対値"],
          script: "kanji",
          near: [{ text: "ぜったいち", why: "読みは合っています。漢字で「絶対値」と書きましょう。" }],
        },
        steps: [
          {
            title: "絶対値は0からのきょり",
            body: "+3 も −3 も、0からのきょりは3。これを {{絶対値}} といいます。",
            figure: { ref: { unit: "j-math-1-seifu", section: 1 } },
          },
        ],
      },
      {
        id: "6",
        no: "(6)",
        prompt: "上の表は、5人のテストの得点を、70点を基準にして、それより高い場合を正の数、低い場合を負の数で表したものです。5人の得点の平均は何点ですか。",
        points: 4,
        skill: "思考・判断・表現",
        level: 2,
        point: "基準との差の平均を出し、基準にたす。",
        answer: { kind: "num", answerKind: "num", answer: ["69"], unit: "点", calc: "70+((8)+(-5)+(3)+(-12)+(1))/5" },
        steps: [
          {
            title: "差の合計を出す",
            body: "(+8)＋(−5)＋(+3)＋(−12)＋(+1)＝{{−5}}。正の数どうし、負の数どうしをまとめると計算しやすい。",
          },
          {
            title: "差の平均を基準にたす",
            body: "差の平均は −5÷5＝−1。基準の70点に −1 をたして {{69点}}。5人の点数を全部たす必要はありません。",
            trap: "差の平均 −1 をそのまま答える（基準にたすのを忘れる）。",
          },
        ],
      },
    ],
  },
];
