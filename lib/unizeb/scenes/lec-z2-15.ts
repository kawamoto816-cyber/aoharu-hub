import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z2-15。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z2_15: Scene[] = [
    {
      at: 1,
      caption: "同じ成約5人でも、接触42人で割れば11.9%、面談11人で割れば45.5%。転換率は「どこからどこへ」を決めて、はじめて1つに決まる。",
      alt: "教室の社長と高校生が、段階ごとに減っていく棒グラフを見ている。グラフの下に、2つの割り算の注記がある。",
      art: {
        bg: "class",
        cast: [
          { who: "社長", look: "teacher", x: 50, face: "surprise", fx: "!" },
          { who: "ハル", look: "girl", x: 290, face: "smile" },
        ],
        props: [{ kind: "table", x: 0, y: 238 }],
      },
      extras: [{ kind: "chartDown", x: 170, y: 50 }],
      labels: [
        { x: 170, y: 96, text: "5÷42で11.9%", tone: "red" },
        { x: 170, y: 128, text: "5÷11で45.5%", tone: "blue" },
      ],
    },
    {
      at: 3,
      caption: "AIに読ませるのは分析用のフォルダ1つだけ。元の表を自分で数えると面談は11人で、AIの12人は同じ家庭を2回数えた重なりだった。",
      alt: "高校生が、ノートパソコンに出たAIの数と、元の表のノートを見比べている。左上に分析用のフォルダ、パソコンの横にばつ印がある。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 280, face: "think", fx: "!" }], props: [{ kind: "table", x: 0, y: 238 }] },
      extras: [
        { kind: "folder", x: 56, y: 62, text: "分析用" },
        { kind: "ledger", x: 160, y: 90, text: "元の表11" },
        { kind: "laptop", x: 130, y: 226, s: 1.2, text: "面談12人" },
        { kind: "cross", x: 205, y: 196 },
      ],
      labels: [
        { x: 56, y: 110, text: "読むだけ", tone: "blue" },
        { x: 262, y: 40, text: "重なり", tone: "red" },
      ],
    },
];
