import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z7-14。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z7_14: Scene[] = [
    {
      at: 2,
      caption: "教室の記録を開くと「体験18人のうち続いたのは7人」。この場面と数字から分かったことが、志望先で学びたいことの理由になる。",
      alt: "高校生が、記録のノートを見てひらめいている。左に「18人中7人」と書かれたノート、その上に「場面」「数字」「分かったこと」「学びたいこと」の4つの注記が上から順に並ぶ。",
      art: { bg: "class", cast: [{ who: "ナナ", look: "girl", x: 275, face: "think", fx: "idea" }] },
      extras: [{ kind: "ledger", x: 80, y: 200, s: 1, text: "18人中7人" }],
      labels: [
        { x: 120, y: 28, text: "1 場面", tone: "navy" },
        { x: 120, y: 60, text: "2 数字", tone: "navy" },
        { x: 120, y: 92, text: "3 分かったこと", tone: "navy" },
        { x: 120, y: 124, text: "4 学びたいこと", tone: "blue" },
      ],
    },
    {
      at: 4,
      caption: "面接の練習で「なぜ」を3回重ねられても、答えは記録にある場面と数字から出てくる。記録にない数字や自己評価は、ここで崩れる。",
      alt: "進路相談室で、相談員の先生が質問し、高校生が記録のノートを手もとに答えている。間に「なぜ1回目」「なぜ2回目」「なぜ3回目」の注記がある。",
      art: {
        bg: "class",
        cast: [
          { who: "相談員", look: "teacher", x: 270, face: "think", flip: true },
          { who: "ナナ", look: "girl", x: 80, face: "smile" },
        ],
      },
      extras: [{ kind: "ledger", x: 175, y: 205, s: 0.9, text: "記録から答える" }],
      labels: [
        { x: 175, y: 30, text: "なぜ1回目" },
        { x: 175, y: 66, text: "なぜ2回目" },
        { x: 175, y: 102, text: "なぜ3回目", tone: "blue" },
      ],
    },
];
