import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z6-09。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z6_09: Scene[] = [
    {
      at: 2,
      caption: "最初の内訳は、ツール費6万円とパソコン5万円で11万円。パソコンは対象経費に入らず、上限の10万円も超えていた。",
      alt: "ばつの印がついたノートパソコンと、要項のフォルダーを前に、生徒が汗をかいている。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 282, face: "sweat", fx: "sweat" }] },
      extras: [
        { kind: "cross", x: 70, y: 22 },
        { kind: "laptop", x: 70, y: 95, text: "パソコン" },
        { kind: "folder", x: 185, y: 85, text: "要項" },
      ],
      labels: [
        { x: 70, y: 130, text: "対象外", tone: "red" },
        { x: 185, y: 130, text: "上限10万円" },
        { x: 125, y: 195, text: "合計11万円", tone: "red" },
      ],
    },
    {
      at: 3,
      caption: "成果指標は、何を・目標の数・測り方の3つ。アプリで記録したごみ拾いを、3か月で60回。アプリの記録の件数で数える。",
      alt: "ごみ拾いの記録アプリのスマートフォンと、3か月のカレンダーを前に、生徒が目標を決めてうなずいている。",
      art: { bg: "outdoor", cast: [{ who: "アオ", look: "boy", x: 282, face: "smile" }] },
      extras: [
        { kind: "phone", x: 65, y: 90, s: 1.3, text: "記録" },
        { kind: "calendar", x: 172, y: 90, text: "3か月" },
        { kind: "check", x: 125, y: 230 },
      ],
      labels: [
        { x: 65, y: 145, text: "何を" },
        { x: 172, y: 145, text: "目標60回", tone: "blue" },
        { x: 125, y: 190, text: "記録の件数で数える", tone: "blue" },
      ],
    },
];
