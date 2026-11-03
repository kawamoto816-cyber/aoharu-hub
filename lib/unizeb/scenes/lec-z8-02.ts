import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z8-02。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z8_02: Scene[] = [
    {
      at: 2,
      caption: "放課後の図書室で、1枚のふせんに作業を1つずつ書く。「宣伝する」は終わりがわからないので、1時間ずつの作業に分け直す。",
      alt: "図書室の机で、高校生がふせんを並べ、時計を見ながら作業を書き出している。",
      art: { bg: "class", cast: [{ who: "ミオ", look: "girl", x: 270, face: "think", fx: "?" }], props: [{ kind: "table", x: 0, y: 240 }, { kind: "book", x: 190, y: 200, s: 0.5 }] },
      extras: [
        { kind: "sticky", x: 90, y: 80, s: 1.4 },
        { kind: "cross", x: 60, y: 180 },
        { kind: "clock", x: 180, y: 70, text: "1〜2時間" },
      ],
      labels: [
        { x: 90, y: 30, text: "1枚に1つ", tone: "blue" },
        { x: 70, y: 220, text: "宣伝する", tone: "red" },
      ],
    },
    {
      at: 3,
      caption: "工数の合計（14時間）を、週に使える時間×週数（4時間×3週＝12時間）と比べる。超えたら作業を減らすか、期間を見直す。",
      alt: "カレンダーとストップウォッチの横で、高校生が見積もりの合計が多すぎることに気づいて汗をかいている。",
      art: { bg: "plain", cast: [{ who: "ミオ", look: "girl", x: 270, face: "sweat", fx: "sweat" }] },
      extras: [
        { kind: "calendar", x: 70, y: 90, s: 1.2, text: "3週" },
        { kind: "stopwatch", x: 170, y: 90, text: "週4時間" },
        { kind: "chartDown", x: 110, y: 222, s: 0.9 },
      ],
      labels: [
        { x: 110, y: 160, text: "14時間＞12時間", tone: "red" },
      ],
    },
];
