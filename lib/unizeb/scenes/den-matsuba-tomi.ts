import type { Scene } from "../types";

// 場面イラスト（オリジナル）：den/matsuba-tomi。at は節の番号（0から）。
// 実在の人物・会社のロゴ・商品は描かない。架空の高校生で、節の考え方を身近な場面にして描く。
export const SC_DEN_MATSUBA_TOMI: Scene[] = [
    {
      at: 1,
      caption: "捨てられるはずの布の切れ端も、縫い合わせれば布小物になる。町の近くにある材料と、町の人の手で、小さな商いを始めた。",
      alt: "ふせんに書かれた布の切れ端から矢印がのび、その先に布の袋がある。横で高校生がひらめいている。",
      art: {
        bg: "plain",
        cast: [{ who: "ハル", look: "girl", x: 288, face: "smile", fx: "idea" }],
        props: [{ kind: "arrow", x: 125, y: 200, s: 0.7 }],
      },
      extras: [
        { kind: "sticky", x: 60, y: 200, text: "布の切れ端" },
        { kind: "bag", x: 185, y: 205, s: 1.0 },
      ],
      labels: [
        { x: 60, y: 140, text: "捨てるはずの物", tone: "red" },
        { x: 180, y: 140, text: "布小物に", tone: "blue" },
        { x: 130, y: 50, text: "町にある物と人で", tone: "navy" },
      ],
    },
    {
      at: 2,
      caption: "人が減った町の古い建物を、壊さずに直して、店や宿として使う。品物を売るだけでなく、その町での暮らしそのものを体験してもらう。",
      alt: "町の通りで、古い家と書いたふせんから矢印が店の絵へのび、下に泊まると書いた予定表がある。横で高校生が笑っている。",
      art: {
        bg: "outdoor",
        cast: [{ who: "アオ", look: "boy", x: 285, face: "smile" }],
        props: [
          { kind: "arrow", x: 125, y: 120, s: 0.5 },
        ],
      },
      extras: [
        { kind: "sticky", x: 60, y: 120, text: "古い家" },
        { kind: "shop", x: 195, y: 120, s: 0.6 },
        { kind: "calendar", x: 195, y: 230, s: 0.8, text: "泊まる" },
      ],
      labels: [
        { x: 60, y: 30, text: "古い家を直す", tone: "navy" },
        { x: 195, y: 30, text: "店や宿にする", tone: "blue" },
        { x: 90, y: 250, text: "暮らしを体験", tone: "blue" },
      ],
    },
];
