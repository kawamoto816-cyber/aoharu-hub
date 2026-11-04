import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z4-13。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z4_13: Scene[] = [
    {
      at: 2,
      caption: "ふせんに{{項目名}}だけを書いて並べると、使い道のない「住所」や、AIに送ってはいけない「相談の中身」が見えてくる。中身や名前は書かない。",
      alt: "高校生が机の前で、「学年」「住所」「相談内容」と書かれた3枚のふせんを見比べている。住所と相談内容のふせんの下にはばつ印があり、手前のノートパソコンには「AI」と書かれている。",
      art: { bg: "class", cast: [{ who: "ミオ", look: "girl", x: 282, face: "think", fx: "?", flip: true }], props: [{ kind: "table", x: 0, y: 240 }] },
      extras: [
        { kind: "sticky", x: 50, y: 92, s: 1, text: "学年" },
        { kind: "sticky", x: 120, y: 92, s: 1, text: "住所" },
        { kind: "sticky", x: 190, y: 92, s: 1, text: "相談内容" },
        { kind: "cross", x: 120, y: 146 },
        { kind: "cross", x: 190, y: 146 },
        { kind: "laptop", x: 110, y: 226, s: 1.1, text: "AI" },
      ],
      labels: [
        { x: 120, y: 22, text: "項目名だけで描く", tone: "blue" },
        { x: 50, y: 150, text: "残す", tone: "navy" },
      ],
    },
    {
      at: 3,
      caption: "十二あった欄を、使い道のある六つにしぼる。{{取らない設計}}では、持っていない情報はもれず、守る手間もかからない。",
      alt: "高校生と職員の大人が向かい合っている。間の上の方に「12の欄」と「6の欄」の2枚の紙があり、12の欄にはばつ印、6の欄にはまる印がついている。",
      art: { bg: "class", cast: [{ who: "ミオ", look: "girl", x: 66, face: "smile", fx: "idea" }, { who: "職員", look: "teacher", x: 274, face: "normal", flip: true }] },
      extras: [
        { kind: "flyer", x: 124, y: 82, s: 0.9, text: "12の欄" },
        { kind: "flyer", x: 214, y: 82, s: 0.9, text: "6の欄" },
        { kind: "cross", x: 124, y: 146 },
        { kind: "check", x: 214, y: 146 },
      ],
      labels: [
        { x: 170, y: 22, text: "欄を半分に", tone: "navy" },
        { x: 170, y: 240, text: "持たない＝もれない", tone: "red" },
      ],
    },
];
