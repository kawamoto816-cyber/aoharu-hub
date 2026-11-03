import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z7-09。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z7_09: Scene[] = [
    {
      at: 3,
      caption: "元の数字は月曜8人と水曜10人なのに、縦軸を7人から始めると水曜が3倍に見える。実際は1.25倍なので、縦軸は0から描く。",
      alt: "「7人から」と書かれた棒グラフにバツ印、その横に元の数字の記録帳。高校生が驚いている。",
      art: { bg: "class", cast: [{ who: "ミオ", look: "girl", x: 275, face: "surprise", fx: "!" }] },
      extras: [
        { kind: "chartUp", x: 75, y: 110, s: 1.1, text: "7人から" },
        { kind: "cross", x: 130, y: 60 },
        { kind: "ledger", x: 180, y: 115, s: 0.9, text: "元の数字" },
      ],
      labels: [
        { x: 75, y: 170, text: "3倍に見える", tone: "red" },
        { x: 175, y: 170, text: "8人と10人", tone: "blue" },
      ],
    },
    {
      at: 4,
      caption: "グラフの数値を、入口で数えた記録の表と1つずつ照らす。出典をグラフの下に書き、数えていない数字には「見積もり」と書き添える。",
      alt: "会議室で、高校生が記録の帳面とグラフを見比べ、協議会の大人がうなずいている。間にチェックの印。",
      art: {
        bg: "class",
        cast: [
          { who: "委員", look: "teacher", x: 270, face: "smile", flip: true },
          { who: "ミオ", look: "girl", x: 80, face: "think" },
        ],
      },
      extras: [
        { kind: "ledger", x: 175, y: 110, s: 1, text: "入口の記録" },
        { kind: "check", x: 175, y: 200 },
      ],
      labels: [
        { x: 175, y: 30, text: "表と1つずつ照らす", tone: "blue" },
        { x: 175, y: 240, text: "出典を書く" },
      ],
    },
];
