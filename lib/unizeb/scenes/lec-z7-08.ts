import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z7-08。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z7_08: Scene[] = [
    {
      at: 1,
      caption: "「高い」と言われて、すぐに「高くないです」と言い返すと、相手は不安を否定されたと感じ、断る理由をかえって固めてしまう。",
      alt: "体験会で、高校生が大きな声で言い返し、保護者がむっとして腕を組んでいる。間に赤いバツ印。",
      art: {
        bg: "class",
        cast: [
          { who: "保護者", look: "teacher", x: 270, face: "think", fx: "steam", flip: true },
          { who: "ハル", look: "girl", x: 80, face: "shout" },
        ],
      },
      extras: [{ kind: "cross", x: 175, y: 200 }],
      labels: [
        { x: 175, y: 40, text: "「高くないです！」", tone: "red" },
        { x: 175, y: 80, text: "気持ちの否定", tone: "red" },
        { x: 175, y: 120, text: "断りが強まる" },
      ],
    },
    {
      at: 2,
      caption: "返しは、受け止め・根拠・提案の3段。最後は、見本の動画を見るなど、断ってもよい小さな一歩を出す。",
      alt: "高校生が保護者に話している。上に「1 受け止め」「2 根拠」「3 小さな一歩」の3つの札、間に見本のチラシ。",
      art: {
        bg: "class",
        cast: [
          { who: "保護者", look: "teacher", x: 270, face: "smile", flip: true },
          { who: "ハル", look: "girl", x: 80, face: "smile" },
        ],
      },
      extras: [{ kind: "flyer", x: 175, y: 200, s: 1.1, text: "見本" }],
      labels: [
        { x: 175, y: 28, text: "1 受け止め", tone: "blue" },
        { x: 175, y: 64, text: "2 根拠", tone: "blue" },
        { x: 175, y: 100, text: "3 小さな一歩", tone: "blue" },
      ],
    },
];
