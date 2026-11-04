import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z6-11。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z6_11: Scene[] = [
    {
      at: 3,
      caption: "AIの表とアプリの計算を並べて、月と項目を指して見比べる。3か月目の顧客数は、AIが9人、アプリが7.32人だった。",
      alt: "ノートパソコンのAIの表と、帳面のアプリの計算を見比べて、生徒がずれを見つけて驚いている。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 282, face: "surprise", fx: "!" }] },
      extras: [
        { kind: "laptop", x: 70, y: 90, text: "AIの表" },
        { kind: "ledger", x: 185, y: 90, text: "アプリ" },
        { kind: "cross", x: 70, y: 215 },
        { kind: "check", x: 185, y: 215 },
      ],
      labels: [
        { x: 70, y: 160, text: "3か月目 9人", tone: "red" },
        { x: 185, y: 160, text: "7.32人", tone: "blue" },
      ],
    },
    {
      at: 4,
      caption: "直した数字ではなく、原因の「前の月の顧客数×継続率」を指示書に書き足して再実行する。アプリと同じになったかを確かめるまでが検収。",
      alt: "指示書のフォルダーに書き足し、ノートパソコンで計画を作り直して、生徒がうなずいている。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 282, face: "smile", fx: "idea" }] },
      extras: [
        { kind: "folder", x: 70, y: 90, text: "指示書" },
        { kind: "laptop", x: 185, y: 90, text: "再実行" },
        { kind: "check", x: 128, y: 225 },
      ],
      labels: [
        { x: 70, y: 150, text: "原因を書き足す", tone: "navy" },
        { x: 175, y: 150, text: "7.32人", tone: "blue" },
      ],
    },
];
