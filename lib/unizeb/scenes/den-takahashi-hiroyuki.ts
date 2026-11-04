import type { Scene } from "../types";

// 場面イラスト（オリジナル）：den/takahashi-hiroyuki。at は節の番号（0から）。
// 実在の人物・商品は描かない。架空の生徒が、食べものと作り手の物語が一緒に届いた場面を描く。
export const SC_DEN_TAKAHASHI_HIROYUKI: Scene[] = [
  {
    at: 1,
    caption: "届いた箱には、食べものと一緒に、つくった人を特集した冊子が入っている。だれがどうつくったかを知ってから食べると、作り手に質問やお礼を伝えたくなる。",
    alt: "台所で、生徒が届いた箱と冊子を見てうれしそうにしている。冊子には作り手の話、スマートフォンにはお礼と書かれている。",
    art: { bg: "kitchen", cast: [{ who: "アオ", look: "boy", x: 285, face: "smile", flip: true }] },
    extras: [
      { kind: "flyer", x: 75, y: 60, s: 1.1, text: "作り手の話" },
      { kind: "boxes", x: 80, y: 205, s: 1, text: "食べもの" },
      { kind: "phone", x: 185, y: 55, s: 1.1, text: "お礼" },
    ],
    labels: [
      { x: 70, y: 125, text: "冊子＋食べもの", tone: "blue" },
      { x: 200, y: 108, text: "作り手とつながる", tone: "red" },
    ],
  },
];
