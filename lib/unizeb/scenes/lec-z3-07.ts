import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z3-07。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z3_07: Scene[] = [
    {
      at: 0,
      caption: "協力者が予約の画面を操作するあいだ、こちらは口を出さずに見て、迷った所とかかった時間を記録する。",
      alt: "教室で、男子の高校生がノートパソコンの予約画面を前に首をかしげ、となりの女子の高校生がストップウォッチを置いてメモを取りながら見守っている。",
      art: { bg: "class", cast: [{ who: "アオ", look: "boy", x: 252, face: "think", fx: "?" }, { who: "ハル", look: "girl", x: 86, face: "normal" }], props: [{ kind: "table", x: 0, y: 240 }] },
      extras: [
        { kind: "laptop", x: 172, y: 236, s: 0.8, text: "予約" },
        { kind: "stopwatch", x: 172, y: 92, s: 0.9 },
      ],
      labels: [
        { x: 86, y: 28, text: "手伝わずに見る", tone: "navy" },
        { x: 258, y: 28, text: "迷った所を記録", tone: "blue" },
      ],
    },
    {
      at: 5,
      caption: "テストの前に、目的と記録することを伝えて{{同意}}をもらう。18歳未満なら保護者の同意も取り、録画は許可があるときだけにする。",
      alt: "教室で、女子の高校生が同意の書類を見せながら説明し、先生がうなずいている。書類の横に確認の印がある。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 86, face: "smile" }, { who: "先生", look: "teacher", x: 256, face: "smile" }] },
      extras: [
        { kind: "folder", x: 172, y: 96, s: 1.1, text: "同意" },
        { kind: "check", x: 172, y: 168, s: 0.8 },
      ],
      labels: [
        { x: 86, y: 28, text: "名前は書かない", tone: "blue" },
        { x: 258, y: 28, text: "録画は許可制", tone: "navy" },
      ],
    },
];
