import type { Scene } from "../types";

// 場面イラスト（オリジナル）：ep/blue-ribbon。at は 0＝場面、1＝決断とその後。
// 架空の人物で場面を描く。実在の創業者・経営者、会社のロゴ・商品のデザインは描かない。
export const SC_EP_BLUE_RIBBON: Scene[] = [
  {
    at: 0,
    caption: "自分の靴も工場もまだない。手もとにあるのは、工場で見た運動靴と、陸上の世界で知り合った人たち。",
    alt: "陸上の競技場の近くで、若い人が運動靴の入った箱を見て、ひらめいた顔をしている。",
    art: { bg: "outdoor", cast: [{ who: "アオ", look: "boy", x: 275, face: "smile", fx: "idea" }] },
    extras: [
      { kind: "boxes", x: 90, y: 150, s: 0.9 },
      { kind: "stopwatch", x: 180, y: 70, s: 0.8 },
    ],
    labels: [
      { x: 90, y: 215, text: "日本の運動靴", tone: "blue" },
      { x: 120, y: 30, text: "まず売ってみる？" },
    ],
  },
];
