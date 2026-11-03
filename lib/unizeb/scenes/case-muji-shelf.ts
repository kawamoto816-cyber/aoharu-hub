import type { Scene } from "../types";

// 場面イラスト（オリジナル）：case/muji-shelf。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
// 架空の人物で状況を描く。会社のロゴや実際の商品は描かない。
export const SC_CASE_MUJI_SHELF: Scene[] = [
    {
      at: 0,
      caption: "1980年、新しいブランドは40品目で、スーパーの棚の一角から始まった。ほかの商品が並ぶ売り場で、考え方を伝えられるかが問題になる。",
      alt: "スーパーの売り場で、店の人が、たくさんの箱が並ぶ棚の一角に置かれた少しの品物を見て考えている。",
      art: { bg: "plain", cast: [{ who: "店の人", look: "teacher", x: 280, face: "think", fx: "?" }] },
      extras: [
        { kind: "shop", x: 110, y: 120, s: 1.3, text: "スーパー" },
        { kind: "boxes", x: 60, y: 260, s: 0.8 },
        { kind: "boxes", x: 175, y: 260, s: 0.8 },
        { kind: "bag", x: 118, y: 250, s: 0.7 },
      ],
      labels: [
        { x: 118, y: 196, text: "棚の一角に40品目", tone: "red" },
      ],
    },
    {
      at: 1,
      caption: "実際には1つの案にしぼらず、品目を増やし、ほかの店に卸し、単独の店を出し、もとの売り場も広げた。順番と組み合わせで広げた形。",
      alt: "単独の店と、運ばれていく箱と、増えた品物の棚が並び、店の人がそれを見てうなずいている。",
      art: { bg: "plain", cast: [{ who: "店の人", look: "teacher", x: 285, face: "smile" }] },
      extras: [
        { kind: "shop", x: 90, y: 110, s: 1, text: "単独の店" },
        { kind: "boxes", x: 195, y: 96, s: 0.8 },
        { kind: "bag", x: 60, y: 240, s: 0.7 },
        { kind: "bag", x: 110, y: 240, s: 0.7 },
        { kind: "bag", x: 160, y: 240, s: 0.7 },
      ],
      labels: [
        { x: 90, y: 142, text: "1983 直営店", tone: "blue" },
        { x: 195, y: 118, text: "1982 卸売", tone: "blue" },
        { x: 110, y: 188, text: "1981 衣料品を追加", tone: "red" },
      ],
    },
];
