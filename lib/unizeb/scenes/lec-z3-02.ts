import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z3-02。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z3_02: Scene[] = [
    {
      at: 1,
      caption: "集合に遅れて注意される、気まずくなるのは表に出た{{症状}}。そのもとの{{原因}}は、前の晩に集合時刻を確かめていないこと。",
      alt: "あせった顔の高校生の横に、集合時刻が書かれたスマートフォンと時計。原因と症状の札が付いている。",
      art: { bg: "plain", cast: [{ who: "アオ", look: "boy", x: 255, face: "sweat", fx: "sweat" }] },
      extras: [
        { kind: "phone", x: 70, y: 170, s: 1.4, text: "8時" },
        { kind: "clock", x: 150, y: 190, text: "遅刻" },
      ],
      labels: [
        { x: 92, y: 36, text: "原因：前の晩に見ない", tone: "blue" },
        { x: 255, y: 76, text: "症状：注意される", tone: "red" },
        { x: 255, y: 112, text: "症状：気まずい", tone: "red" },
      ],
    },
    {
      at: 2,
      caption: "「当番を忘れる」から「それはなぜ起きる？」を重ねると、交代を個別に頼み合う決まりという、変えられる原因に行き着く。",
      alt: "保護者会の会長が、流れてしまった当番表のスマートフォン画面と、交代を頼むふせんを前に考えこんでいる。",
      art: { bg: "plain", cast: [{ who: "会長", look: "teacher", x: 268, face: "think", fx: "?" }] },
      extras: [
        { kind: "phone", x: 62, y: 118, s: 1.4, text: "当番" },
        { kind: "sticky", x: 152, y: 124, s: 1.1, text: "交代して" },
      ],
      labels: [
        { x: 100, y: 30, text: "当番を忘れる", tone: "red" },
        { x: 110, y: 200, text: "なぜ？を3回", tone: "blue" },
        { x: 110, y: 244, text: "決まりが原因" },
      ],
    },
];
