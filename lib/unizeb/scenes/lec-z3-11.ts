import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z3-11。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z3_11: Scene[] = [
    {
      at: 3,
      caption: "AIの下書きを、聞き取りのメモと照らして直すのが検収。出どころのない数字は聞いた事実に直し、手直し6か所・35分を記録する。",
      alt: "高校生がノートパソコンの下書きと聞き取りのメモを見くらべている。画面の横に「要確認」のふせんが貼られている。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 278, face: "think", fx: "?" }], props: [{ kind: "table", x: 0, y: 244 }] },
      extras: [
        { kind: "laptop", x: 150, y: 236, s: 0.8, text: "v1下書き" },
        { kind: "ledger", x: 50, y: 228, s: 0.7 },
        { kind: "sticky", x: 150, y: 110, s: 1.0, text: "要確認" },
        { kind: "stopwatch", x: 96, y: 112, s: 0.8, text: "35分" },
      ],
      labels: [
        { x: 120, y: 30, text: "手直し6か所", tone: "red" },
        { x: 50, y: 172, text: "聞き取りメモ", tone: "blue" },
      ],
    },
    {
      at: 4,
      caption: "値段を伝えて聞いた12人のうち「申し込む」は5人。最初の10人まであと5人。案内は公民館の掲示板と運営の告知で出し、料金は職員が受け取る。",
      alt: "公民館で、職員が「土曜の回」と書かれた案内を掲示板に貼り、高校生が横で記録の帳面を持っている。",
      art: { bg: "class", cast: [{ who: "職員", look: "teacher", x: 266, face: "smile" }, { who: "ハル", look: "girl", x: 74, face: "smile" }] },
      extras: [
        { kind: "flyer", x: 170, y: 100, s: 1.1, text: "土曜の回" },
        { kind: "ledger", x: 170, y: 220, s: 0.7 },
      ],
      labels: [
        { x: 74, y: 22, text: "申し込む5人", tone: "blue" },
        { x: 266, y: 22, text: "あと5人で10人", tone: "navy" },
      ],
    },
];
