import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z2-03。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z2_03: Scene[] = [
    {
      at: 3,
      caption: "手元の資料を「渡す」「消してから渡す」「渡さない」の3つに分ける。連絡先の一覧のように、消すと何も残らない物は渡さない。",
      alt: "3つのフォルダーに資料を分けながら、高校生が考えている。右のフォルダーにはばつ印がついている。",
      art: { bg: "plain", cast: [{ who: "アオ", look: "boy", x: 170, face: "think" }] },
      extras: [
        { kind: "folder", x: 60, y: 92, text: "渡す" },
        { kind: "folder", x: 170, y: 92, text: "消して渡す" },
        { kind: "folder", x: 280, y: 92, text: "渡さない" },
        { kind: "check", x: 60, y: 44 },
        { kind: "check", x: 170, y: 44 },
        { kind: "cross", x: 280, y: 44 },
      ],
      labels: [
        { x: 62, y: 196, text: "事業シート", tone: "blue" },
        { x: 280, y: 196, text: "連絡先の一覧", tone: "red" },
      ],
    },
];
