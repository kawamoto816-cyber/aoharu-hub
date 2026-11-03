import type { Scene } from "../types";

// 場面イラスト（オリジナル）：case/ishigaki-culture。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
// 架空の人物で状況を描く。会社のロゴ・商品・実際の工場は描かない。創業者（実在）は描かない。
export const SC_CASE_ISHIGAKI_CULTURE: Scene[] = [
  {
    at: 0,
    caption: "研究室の中なら少しずつ育てられる。けれども事業にするには、屋外でけたちがいの量を育てられるかが、いちばん危ない問いになる。",
    alt: "教室で、生徒がフラスコと虫めがねを前に、屋外でも育つだろうかと考えている。",
    art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 272, face: "think", fx: "?" }], props: [{ kind: "flask", x: 150, y: 120 }, { kind: "loupe", x: 70, y: 120 }] },
    labels: [
      { x: 125, y: 32, text: "研究室では少しずつ", tone: "blue" },
      { x: 120, y: 190, text: "屋外で育つ？", tone: "red" },
    ],
  },
  {
    at: 1,
    caption: "2005年、石垣島で屋外での大量培養に成功し、その後も島に生産の拠点と研究所を置いている。事業の成否を分ける問いに答えを出したことが土台になった。",
    alt: "日の当たる屋外で、2人の生徒が育った藻の入った容器と上向きのグラフを見て笑っている。",
    art: {
      bg: "outdoor",
      cast: [{ who: "ハル", look: "girl", x: 50, face: "smile" }, { who: "アオ", look: "boy", x: 290, face: "smile", flip: true }],
      props: [{ kind: "sun", x: 170, y: 36 }, { kind: "plant", x: 140, y: 250 }, { kind: "plant", x: 200, y: 250 }],
    },
    extras: [{ kind: "chartUp", x: 170, y: 125 }],
    labels: [{ x: 170, y: 185, text: "2005 屋外で培養", tone: "red" }],
  },
];
