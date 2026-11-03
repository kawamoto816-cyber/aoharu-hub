import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z1-01。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z1_01: Scene[] = [
    {
      at: 1,
      caption: "頭の中の「やばい」を、ふせん1枚に1つずつ書き出して、気持ちの名前をつける。",
      alt: "机に向かう高校生が、あせり・不安・疲れと書いたふせんを見て、考えている。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 230, face: "think", fx: "?" }], props: [{ kind: "table", x: 0, y: 236 }] },
      extras: [
        { kind: "sticky", x: 110, y: 70, s: 1.3 },
        { kind: "speech", x: 112, y: 140, s: 0.9, text: "名前をつける" },
      ],
      labels: [
        { x: 72, y: 26, text: "あせり", tone: "red" },
        { x: 150, y: 26, text: "不安", tone: "blue" },
        { x: 210, y: 48, text: "疲れ" },
      ],
    },
    {
      at: 4,
      caption: "変えられる側から、今日やる「小さな一歩」を1つだけ決める。時間を区切ると始めやすい。",
      alt: "高校生がストップウォッチを手に、15分だけ看板の下書きをすると決めて笑っている。",
      art: { bg: "class", cast: [{ who: "アオ", look: "boy", x: 110, face: "smile", hand: [176, 214] }], props: [{ kind: "table", x: 0, y: 242 }] },
      extras: [
        { kind: "stopwatch", x: 190, y: 192, s: 0.9, text: "" },
        { kind: "flyer", x: 270, y: 80, s: 1.1, text: "看板" },
        { kind: "check", x: 300, y: 140 },
      ],
      labels: [{ x: 200, y: 30, text: "今日は15分だけ", tone: "blue" }],
    },
  
];
