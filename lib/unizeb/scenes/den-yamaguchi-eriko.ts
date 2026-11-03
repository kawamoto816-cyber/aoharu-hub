import type { Scene } from "../types";

// 場面イラスト（オリジナル）：den/yamaguchi-eriko。at は節の番号（0から）。
// 実在の人物は描かない。会社のロゴや実際の商品も描かない。考え方を架空の高校生で描く。
export const SC_DEN_YAMAGUCHI_ERIKO: Scene[] = [
    {
      at: 1,
      caption: "途上国を支えるには、寄付で届ける道と、現地でつくった品物を、ほしくなる商品として売る道がある。マザーハウスは後者を選び、ジュートのバッグから始めた（人物は架空）。",
      alt: "高校生2人の上に、寄付の箱とバッグが並んでいる。左下の箱の山には、つくる人の仕事と書かれている。",
      art: { bg: "plain", cast: [{ who: "アオ", look: "boy", x: 225, face: "think", fx: "?" }, { who: "ハル", look: "girl", x: 305, face: "smile", flip: true }] },
      extras: [
        { kind: "piggy", x: 70, y: 52, s: 1.1, text: "寄付" },
        { kind: "bag", x: 250, y: 48, s: 1.1 },
        { kind: "boxes", x: 90, y: 215, s: 0.8 },
      ],
      labels: [
        { x: 70, y: 100, text: "寄付で届ける", tone: "blue" },
        { x: 250, y: 98, text: "商品として売る", tone: "navy" },
        { x: 90, y: 262, text: "つくる人の仕事", tone: "red" },
      ],
    },
    {
      at: 2,
      caption: "2020年、国内の店がすべて休業し、店の売上が落ちこんだ。工場の人の雇用を守りながら、新しいバッグや、古いバッグの再生で立て直しを図った（人物は架空）。",
      alt: "休業の札がかかった店と下がるグラフの横で、店の人が、新しいバッグと修理の道具を前に考えている。",
      art: { bg: "plain", cast: [{ who: "店の人", look: "teacher", x: 285, face: "think", fx: "idea", flip: true }] },
      extras: [
        { kind: "shop", x: 75, y: 95, s: 1.0, text: "休業" },
        { kind: "chartDown", x: 190, y: 70, s: 0.9 },
        { kind: "bag", x: 55, y: 225, s: 0.9 },
        { kind: "bag", x: 180, y: 225, s: 0.9 },
      ],
      labels: [
        { x: 190, y: 115, text: "店の売上が減る", tone: "red" },
        { x: 55, y: 268, text: "新しいバッグ", tone: "blue" },
        { x: 180, y: 268, text: "古いバッグを再生", tone: "navy" },
      ],
    },
];
