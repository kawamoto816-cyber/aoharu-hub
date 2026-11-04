import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z7-15。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z7_15: Scene[] = [
    {
      at: 1,
      caption: "同じパン屋の中でも、店長は得と回収、パートの人は手間、常連のお客さんは電話で予約できるかを気にしている。立場ごとに答えを用意する。",
      alt: "パン屋の店先で、高校生が店長に提案している。間に「店長：得と回収」「パート：手間」「お客さん：電話」の注記と、「電話も残す」の注記と電話の絵がある。",
      art: {
        bg: "plain",
        cast: [
          { who: "店長", look: "teacher", x: 270, face: "think", flip: true },
          { who: "ハル", look: "girl", x: 80, face: "normal" },
        ],
      },
      extras: [{ kind: "phone", x: 175, y: 205, s: 1 }],
      labels: [
        { x: 175, y: 30, text: "店長：得と回収", tone: "navy" },
        { x: 175, y: 66, text: "パート：手間", tone: "blue" },
        { x: 175, y: 102, text: "お客さん：電話", tone: "blue" },
        { x: 175, y: 140, text: "電話も残す", tone: "red" },
      ],
    },
    {
      at: 3,
      caption: "はじめの費用9,000円を、月の効果6,000円から料金3,000円を引いた3,000円で割ると3か月。料金を引き忘れると1.5か月とまちがえる。",
      alt: "高校生がカレンダーを見てうなずいている。左に「3か月」と書かれたカレンダーと硬貨の山、上に「料金を引いて割る」「回収3か月」の注記がある。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 275, face: "smile", fx: "!" }] },
      extras: [
        { kind: "calendar", x: 80, y: 95, s: 1, text: "3か月" },
        { kind: "coins", x: 80, y: 215, s: 1 },
      ],
      labels: [
        { x: 165, y: 165, text: "料金を引いて割る", tone: "red" },
        { x: 165, y: 30, text: "回収3か月", tone: "blue" },
      ],
    },
];
