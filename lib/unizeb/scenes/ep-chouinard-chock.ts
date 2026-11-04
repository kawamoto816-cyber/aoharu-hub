import type { Scene } from "../types";

// 場面イラスト（オリジナル）：ep/chouinard-chock。at は 0＝場面、1＝決断とその後。
// 架空の人物で場面を描く。実在の創業者・経営者、会社のロゴ・商品のデザインは描かない。
export const SC_EP_CHOUINARD_CHOCK: Scene[] = [
  {
    at: 0,
    caption: "岩の割れ目に打ちこむ金具は、外したあとも岩に傷あとを残す。創業のころから作ってきた商品を、どうするかを決める場面。",
    alt: "岩場で、会社の人が岩の傷あとを見つめ、手に持った金具を見て考えこんでいる。",
    art: {
      bg: "outdoor",
      cast: [{ who: "会社の人", look: "teacher", x: 275, face: "sweat", fx: "sweat" }],
      props: [{ kind: "cliff", x: 90, y: 160, s: 1 }],
    },
    labels: [
      { x: 110, y: 40, text: "岩に傷あと", tone: "red" },
      { x: 110, y: 250, text: "打ちこむか、はさむか" },
    ],
  },
];
