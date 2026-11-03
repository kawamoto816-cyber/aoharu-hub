import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z5-04。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z5_04: Scene[] = [
    {
      at: 2,
      caption: "去年の用紙は「安くて便利な英単語チェック会に参加したいですか？」。80%が「はい」と答えたのに、申し込みは2人だった。良さを先に言う誘導と、基準値のなさが原因。",
      alt: "実行委員の生徒が、「安くて便利」と書かれたアンケート用紙と、下がっていく申し込みのグラフを見比べて、汗をかいている。",
      art: { bg: "class", cast: [{ who: "実行委員長", look: "girl", x: 275, face: "sweat", fx: "sweat" }] },
      extras: [
        { kind: "flyer", x: 75, y: 85, s: 1.1 },
        { kind: "chartDown", x: 175, y: 92, s: 1.0, text: "申し込み" },
      ],
      labels: [
        { x: 80, y: 24, text: "安くて便利な会", tone: "navy" },
        { x: 70, y: 160, text: "「はい」80%", tone: "blue" },
        { x: 175, y: 160, text: "申し込み2人", tone: "red" },
        { x: 120, y: 210, text: "基準値なし", tone: "red" },
      ],
    },
    {
      at: 4,
      caption: "設問はAIで欠陥を点検し、先生（運営の大人）に設問と配る相手を見てもらってから、知っている人だけに配る。名前や連絡先の欄は作らない。",
      alt: "教室で、生徒がノートパソコンの点検結果を見せ、先生がアンケート用紙を確かめてうなずいている。",
      art: {
        bg: "class",
        cast: [
          { who: "先生", look: "teacher", x: 270, face: "smile" },
          { who: "実行委員長", look: "girl", x: 80, face: "think" },
        ],
      },
      extras: [
        { kind: "laptop", x: 175, y: 100, s: 1.1, text: "AIで点検" },
        { kind: "check", x: 175, y: 30 },
      ],
      labels: [
        { x: 175, y: 140, text: "名前は聞かない", tone: "red" },
        { x: 175, y: 170, text: "確認してから", tone: "blue" },
      ],
    },
];
