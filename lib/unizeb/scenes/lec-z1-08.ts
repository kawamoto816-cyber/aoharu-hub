import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z1-08。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z1_08: Scene[] = [
    {
      at: 2,
      caption: "過去3件は見積もり合計100分で、実際は140分。倍率は1.4倍なので、明日の見積もり30分の作業は42分の箱にする。",
      alt: "高校生がストップウォッチを手に、見積もり30分と箱42分のメモを見て、うなずいている。",
      art: { bg: "class", cast: [{ who: "アオ", look: "boy", x: 272, face: "smile" }] },
      extras: [
        { kind: "sticky", x: 70, y: 84, s: 1.1, text: "30分" },
        { kind: "stopwatch", x: 164, y: 90, s: 1.1, text: "42分" },
      ],
      labels: [
        { x: 70, y: 160, text: "見積もり" },
        { x: 160, y: 160, text: "1.4倍の箱", tone: "blue" },
        { x: 110, y: 214, text: "割らずにかける", tone: "red" },
      ],
    },
    {
      at: 5,
      caption: "平日は放課後1〜2時間の範囲に、倍率をかけた箱を開始と終了の時刻つきで並べる。18歳未満は22時以降に箱を作らない。",
      alt: "高校生がカレンダーと時計を見ながら、夕方の予定に時間の箱を並べている。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 270, face: "smile" }] },
      extras: [
        { kind: "calendar", x: 70, y: 92, s: 1.1, text: "明日" },
        { kind: "clock", x: 168, y: 86, s: 1, text: "22時" },
        { kind: "cross", x: 196, y: 120, s: 0.7 },
      ],
      labels: [
        { x: 70, y: 168, text: "合計84分", tone: "blue" },
        { x: 168, y: 168, text: "22時以降なし", tone: "red" },
      ],
    },
];
