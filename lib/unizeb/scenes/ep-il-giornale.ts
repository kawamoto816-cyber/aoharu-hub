import type { Scene } from "../types";

// 場面イラスト（オリジナル）：ep/il-giornale。at は 0＝場面、1＝決断とその後。
// 架空の人物で場面を描く。実在の創業者・経営者、会社のロゴ・商品のデザインは描かない。
export const SC_EP_IL_GIORNALE: Scene[] = [
  {
    at: 0,
    caption: "コーヒー豆を売る店で、その場で飲む店を試すと、結果は悪くなかった。それでも会社は広げないと決める。社内で粘るか、外で試すか。",
    alt: "店の人が、豆の袋が並ぶ店と、カップを手に過ごす店の絵を見くらべて考えている。",
    art: { bg: "outdoor", cast: [{ who: "店の人", look: "teacher", x: 275, face: "think", fx: "?" }] },
    extras: [
      { kind: "bag", x: 70, y: 110, s: 0.9 },
      { kind: "shop", x: 175, y: 105, s: 0.9, text: "飲む店" },
      { kind: "check", x: 120, y: 215, s: 0.7 },
    ],
    labels: [
      { x: 70, y: 165, text: "豆を売る" },
      { x: 175, y: 165, text: "店で飲む", tone: "blue" },
      { x: 120, y: 262, text: "試験は好結果" },
    ],
  },
];
