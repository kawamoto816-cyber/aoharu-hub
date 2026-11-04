import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z1-12。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z1_12: Scene[] = [
    {
      at: 0,
      caption: "睡眠の平均は7.2・7.0・6.4・6.0時間と、4週で1.2時間減った。締切を守れなかった5週目より前に、崩れは数字に出ていた。",
      alt: "大学生が、右下がりのグラフとカレンダーを見て、驚いている。",
      art: { bg: "class", cast: [{ who: "ミオ", look: "girl", x: 270, face: "surprise", fx: "!" }] },
      extras: [
        { kind: "chartDown", x: 76, y: 92, s: 1.1, text: "睡眠" },
        { kind: "calendar", x: 176, y: 92, s: 1, text: "4週" },
      ],
      labels: [
        { x: 72, y: 168, text: "1.2時間減" },
        { x: 180, y: 168, text: "閾値6.5", tone: "red" },
        { x: 120, y: 222, text: "崩れは先に数字に", tone: "blue" },
      ],
    },
    {
      at: 4,
      caption: "睡眠の知らせが出たら、その週の水曜までに作業の予定を1つ外し、締切が近い注文はお客さんに相談する。外れが出ても、知らせは止めずに閾値を直す。",
      alt: "大学生が、カレンダーとふせんを前に、知らせが出たときの最初の一手を決めて、にっこりしている。",
      art: { bg: "class", cast: [{ who: "ミオ", look: "girl", x: 270, face: "smile", fx: "idea" }] },
      extras: [
        { kind: "calendar", x: 70, y: 92, s: 1.1, text: "水曜まで" },
        { kind: "sticky", x: 172, y: 88, s: 1.1, text: "予定を外す" },
      ],
      labels: [
        { x: 70, y: 168, text: "知らせが出たら" },
        { x: 172, y: 168, text: "最初の一手", tone: "red" },
        { x: 120, y: 222, text: "知らせは止めない", tone: "blue" },
      ],
    },
];
