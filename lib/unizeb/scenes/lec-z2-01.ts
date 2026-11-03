import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z2-01。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z2_01: Scene[] = [
    {
      at: 0,
      caption: "「いい感じに」とだけ頼むと、AIは書かれていない部分をよくある答えで埋める。返ってくるのは、だれ向けかわからない平凡な文。",
      alt: "ノートパソコンに「いい感じに」と打ちこんだ高校生が、返ってきた長い告知文を見て首をかしげている。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 260, face: "think", fx: "?" }], props: [{ kind: "table", x: 0, y: 238 }] },
      extras: [
        { kind: "laptop", x: 110, y: 226, s: 1.2, text: "いい感じに" },
        { kind: "flyer", x: 110, y: 70, s: 1.1, text: "告知文" },
      ],
      labels: [
        { x: 200, y: 36, text: "よくある文が返る", tone: "red" },
        { x: 200, y: 110, text: "だれ向け？" },
      ],
    },
    {
      at: 1,
      caption: "目的・読む人・出す場所・文字数・完了条件の5つを書きこむと、AIが推測で埋める部分が減る。",
      alt: "高校生が、目的・読む人・出す場所・文字数・完了条件の5つの札を入れた依頼文をノートパソコンで送り、笑っている。",
      art: { bg: "class", cast: [{ who: "アオ", look: "boy", x: 270, face: "smile" }], props: [{ kind: "table", x: 0, y: 238 }] },
      extras: [
        { kind: "laptop", x: 110, y: 226, s: 1.2, text: "5つ入り" },
        { kind: "check", x: 290, y: 60 },
      ],
      labels: [
        { x: 60, y: 28, text: "目的", tone: "blue" },
        { x: 150, y: 28, text: "読む人", tone: "blue" },
        { x: 60, y: 62, text: "出す場所", tone: "blue" },
        { x: 150, y: 62, text: "文字数", tone: "blue" },
        { x: 105, y: 96, text: "完了条件", tone: "red" },
      ],
    },
];
