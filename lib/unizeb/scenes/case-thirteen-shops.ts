import type { Scene } from "../types";

// 場面イラスト（オリジナル）：case/thirteen-shops。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
// 架空の人物で状況を描く。会社のロゴ・実際の画面は描かない。創業者（実在）は描かない。
export const SC_CASE_THIRTEEN_SHOPS: Scene[] = [
  {
    at: 0,
    caption: "ネットの上の商店街に、出店してくれる店はまだ13。従業員6人、サーバー1台で、待つか始めるかを決める。",
    alt: "教室で、生徒がノートパソコンの画面の13店舗という字と、小さな3つの店の絵を見て考えている。",
    art: { bg: "class", cast: [{ who: "アオ", look: "boy", x: 275, face: "think", fx: "?" }] },
    extras: [
      { kind: "shop", x: 60, y: 70, s: 0.5 },
      { kind: "shop", x: 120, y: 70, s: 0.5 },
      { kind: "shop", x: 180, y: 70, s: 0.5 },
      { kind: "laptop", x: 120, y: 160, text: "13店舗" },
    ],
    labels: [{ x: 130, y: 200, text: "従業員6人 サーバー1台" }],
  },
  {
    at: 1,
    caption: "1997年5月、店がそろうのを待たずに、13店舗で楽天市場を始めた。少ない相手を1軒ずつ大事にできるのは、小さく始めたときならでは。",
    alt: "2人の生徒が、ノートパソコンとカレンダーを間にはさんで、始まったことを喜んでいる。",
    art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 55, face: "smile" }, { who: "アオ", look: "boy", x: 285, face: "smile", flip: true }] },
    extras: [
      { kind: "calendar", x: 170, y: 50, text: "97年5月" },
      { kind: "laptop", x: 170, y: 150, text: "開始" },
    ],
    labels: [{ x: 170, y: 200, text: "13店舗で始めた", tone: "blue" }],
  },
];
