import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z5-14。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z5_14: Scene[] = [
    {
      at: 2,
      caption: "2回とも小テストを受けた12人で、初めの日と2週間後の書けた語数を比べる。範囲・時間・採点をそろえると、平均8語から13語への変化が見える。",
      alt: "高校生が、初めの日と2週間後の2枚の小テストの記録を並べて見比べ、書けた語数の平均が8語から13語に増えたことに気づいている。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 285, face: "smile", fx: "!" }] },
      extras: [
        { kind: "sticky", x: 70, y: 70, s: 1.0, text: "初めの日" },
        { kind: "sticky", x: 180, y: 70, s: 1.0, text: "2週間後" },
      ],
      labels: [
        { x: 70, y: 135, text: "平均8語" },
        { x: 180, y: 135, text: "平均13語", tone: "blue" },
        { x: 125, y: 200, text: "同じ12人で比べる" },
        { x: 125, y: 235, text: "範囲と時間をそろえる" },
      ],
    },
    {
      at: 4,
      caption: "AIの週次レポートを、自分の表と1つずつ照合する。3週目の人数を4週目と取り違えていたので、7人を5人に直し、差の件数と原因を記録した。",
      alt: "高校生がノートパソコンに映ったAIのレポートと手元の表を見比べ、まちがいを見つけている。となりの友だちが表を指さしている。",
      art: {
        bg: "class",
        cast: [
          { who: "ハル", look: "girl", x: 270, face: "surprise", fx: "!" },
          { who: "アオ", look: "boy", x: 85, face: "normal" },
        ],
      },
      extras: [
        { kind: "laptop", x: 178, y: 95, s: 1.0, text: "AIの下書き" },
        { kind: "ledger", x: 178, y: 200, s: 0.8, text: "自分の表" },
      ],
      labels: [
        { x: 85, y: 30, text: "照合 差は1件", tone: "blue" },
        { x: 270, y: 30, text: "3週目 7→5人", tone: "red" },
      ],
    },
];
