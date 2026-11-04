import type { Scene } from "../types";

// 場面イラスト（オリジナル）：ep/japanet-radio。at は 0＝場面、1＝決断とその後。
// 架空の人物で場面を描く。実在の創業者・経営者、会社のロゴ・商品のデザインは描かない。
export const SC_EP_JAPANET_RADIO: Scene[] = [
  {
    at: 0,
    caption: "町のカメラ店に来てくれるのは、地元の人たち。店に来られない人にも商品のよさを届けるには、どんな方法があるか。",
    alt: "店の人が、小さな店の前で、拡声器と電話を手がかりに、遠くの人に届ける方法を考えている。",
    art: { bg: "outdoor", cast: [{ who: "店の人", look: "teacher", x: 275, face: "think", fx: "idea" }] },
    extras: [
      { kind: "shop", x: 68, y: 100, s: 0.85, text: "カメラ" },
      { kind: "megaphone", x: 168, y: 95, s: 0.9 },
      { kind: "phone", x: 125, y: 210, s: 0.8 },
    ],
    labels: [
      { x: 65, y: 160, text: "店に来る人" },
      { x: 165, y: 160, text: "声で届ける", tone: "blue" },
      { x: 125, y: 262, text: "電話で注文" },
    ],
  },
];
