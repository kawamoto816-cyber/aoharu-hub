import type { Scene } from "../types";

// 場面イラスト（オリジナル）：ep/instagram-burbn。at は 0＝場面、1＝決断とその後。
// 架空の人物で場面を描く。実在の創業者・経営者、会社のロゴ・商品のデザインは描かない。
export const SC_EP_INSTAGRAM_BURBN: Scene[] = [
  {
    at: 0,
    caption: "場所のチェックインと写真の投稿。2つの機能を持つアプリを、そのまま育てるか、どちらかに絞るかを決める場面。",
    alt: "生徒がスマートフォンを手に、地図とカメラの機能を見くらべて、どちらを残すか考えている。",
    art: {
      bg: "outdoor",
      cast: [{ who: "アオ", look: "boy", x: 275, face: "think", fx: "?" }],
      props: [{ kind: "map", x: 70, y: 90, s: 0.7 }],
    },
    extras: [
      { kind: "phone", x: 175, y: 100, s: 1 },
      { kind: "check", x: 175, y: 190, s: 0.7 },
    ],
    labels: [
      { x: 70, y: 160, text: "チェックイン" },
      { x: 150, y: 245, text: "写真だけ残す？", tone: "blue" },
    ],
  },
];
