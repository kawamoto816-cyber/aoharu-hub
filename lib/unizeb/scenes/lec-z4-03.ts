import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z4-03。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z4_03: Scene[] = [
    {
      at: 1,
      caption: "白紙からではなく、今の「英単語テスト会」を出発点に、S・C・A・M・P・E・Rの7つの視点で1案ずつ変えていく。",
      alt: "教室で、高校生が紙の単語テストとスマートフォンを見比べている。上に7つの頭文字の札が並ぶ。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 262, face: "think", fx: "idea" }] },
      extras: [
        { kind: "flyer", x: 92, y: 112, s: 1.3, text: "テスト" },
        { kind: "phone", x: 176, y: 116, s: 1.2 },
      ],
      labels: [
        { x: 40, y: 26, text: "S" },
        { x: 80, y: 26, text: "C", tone: "blue" },
        { x: 120, y: 26, text: "A" },
        { x: 160, y: 26, text: "M" },
        { x: 200, y: 26, text: "P" },
        { x: 240, y: 26, text: "E" },
        { x: 280, y: 26, text: "R" },
        { x: 112, y: 198, text: "今の形から変える", tone: "blue" },
      ],
    },
    {
      at: 3,
      caption: "パン屋の夕方の売れ残りに、Cで組み合わせた「夕ごはんセット」。仕事帰りの客の役に立ち、単価も上がるので、{{売上も価値も高い}}案になる。",
      alt: "商店街のパン屋の前で、店主が夕方5時を指す時計の下に立ち、セットを入れた袋を用意している。",
      art: { bg: "outdoor", cast: [{ who: "店主", look: "teacher", x: 266, face: "smile" }] },
      extras: [
        { kind: "shop", x: 100, y: 176, text: "パン" },
        { kind: "clock", x: 202, y: 60, text: "夕方5時" },
        { kind: "bag", x: 186, y: 236, s: 0.9 },
      ],
      labels: [
        { x: 110, y: 36, text: "夕ごはんセット", tone: "blue" },
        { x: 100, y: 222, text: "売上も価値も高い" },
      ],
    },
];
