import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z7-12。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z7_12: Scene[] = [
    {
      at: 1,
      caption: "集めた声は、だれが言ったかを「保護者A」のように置きかえ、名前や連絡先ははじめから記録しない。名前を消した声だけをAIに読ませて、約束の案を作ってもらう。",
      alt: "「質問迷う」「保護者A」と書いたふせんが並び、その下にノートパソコン。右で高校生が考えている。",
      art: { bg: "plain", cast: [{ who: "ミオ", look: "girl", x: 280, face: "think" }] },
      extras: [
        { kind: "sticky", x: 70, y: 55, s: 1, text: "質問迷う" },
        { kind: "sticky", x: 170, y: 55, s: 1, text: "保護者A" },
        { kind: "laptop", x: 120, y: 165, s: 1, text: "約束の案" },
      ],
      labels: [
        { x: 120, y: 245, text: "名前は記録しない", tone: "red" },
      ],
    },
    {
      at: 4,
      caption: "初めての人の質問に、その日のうちに返事がつくと、安心して次の人も話す。返事が次の発言を呼ぶ循環で、発言した人は6人から10人に増えた（説明のための例）。",
      alt: "左の高校生と右の高校生のあいだに、「質問」と「返事」の吹き出しの形が上下に並び、チェックの印がついている。",
      art: {
        bg: "class",
        cast: [
          { who: "ハル", look: "girl", x: 270, face: "smile" },
          { who: "アオ", look: "boy", x: 75, face: "smile", fx: "!" },
        ],
      },
      extras: [
        { kind: "speech", x: 172, y: 50, s: 0.9, text: "質問" },
        { kind: "speech", x: 172, y: 125, s: 0.9, text: "返事" },
        { kind: "check", x: 172, y: 190 },
      ],
      labels: [
        { x: 172, y: 250, text: "その日のうちに", tone: "blue" },
      ],
    },
];
