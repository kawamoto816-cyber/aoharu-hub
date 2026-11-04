import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z3-15。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z3_15: Scene[] = [
    {
      at: 1,
      caption: "お知らせメールの同意欄は、最初は空にしておき、ほしい人が自分で印を付ける。これがオプトイン。",
      alt: "事務所で、女子の高校生がノートパソコンの申込画面の同意欄を指さし、社長の大人が見ている。画面の上に、空の欄を示す印がある。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 86, face: "normal", hand: [134, 200] }, { who: "社長", look: "teacher", x: 262, face: "think" }], props: [{ kind: "table", x: 0, y: 240 }] },
      extras: [
        { kind: "laptop", x: 174, y: 236, s: 0.8, text: "同意欄" },
        { kind: "mail", x: 174, y: 96, s: 0.9 },
      ],
      labels: [
        { x: 86, y: 28, text: "最初は空に", tone: "navy" },
        { x: 262, y: 28, text: "ほしい人だけ", tone: "blue" },
        { x: 174, y: 150, text: "オプトイン", tone: "red" },
      ],
    },
    {
      at: 3,
      caption: "最初から入ったチェックは、短い間は登録の数を上げても、気づいた人の不満が問い合わせや解約として返ってくる。",
      alt: "社長の大人が、下がるグラフと問い合わせのふきだしの絵を前に考えこみ、女子の高校生が「不利益」と書いた紙を見せている。",
      art: { bg: "plain", cast: [{ who: "社長", look: "teacher", x: 262, face: "sweat", fx: "sweat" }, { who: "ハル", look: "girl", x: 78, face: "normal" }] },
      extras: [
        { kind: "chartDown", x: 170, y: 86, s: 0.9, text: "信頼" },
        { kind: "speech", x: 170, y: 172, s: 0.9, text: "問い合わせ" },
        { kind: "flyer", x: 78, y: 96, s: 0.8, text: "不利益" },
      ],
      labels: [
        { x: 262, y: 28, text: "不満が返る", tone: "red" },
      ],
    },
];
