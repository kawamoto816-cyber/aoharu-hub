import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z3-12。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z3_12: Scene[] = [
    {
      at: 3,
      caption: "読み上げ機能をオンにして、画面を見ずに予約ページを操作する。画像の予約ボタンは「ボタン」としか読まれなかったので、「くるみパンを予約する」と名前を付けた。",
      alt: "高校生が画面を見ずに、スマホの読み上げの音声を聞いて考えている。スマホの画面には「ボタン」と表示され、横のふせんに「名前を付ける」と書かれている。",
      art: { bg: "class", cast: [{ who: "アオ", look: "boy", x: 84, face: "think" }] },
      extras: [
        { kind: "phone", x: 210, y: 110, s: 1.3, text: "ボタン" },
        { kind: "sticky", x: 290, y: 200, s: 0.9, text: "名前を付ける" },
        { kind: "cross", x: 264, y: 60, s: 0.6 },
      ],
      labels: [
        { x: 210, y: 24, text: "画面を見ずに操作", tone: "navy" },
        { x: 200, y: 220, text: "読み上げ", tone: "blue" },
      ],
    },
    {
      at: 4,
      caption: "日なたで、片手に荷物を持って予約する。見えにくい・押しにくいという不便はだれにでも起きるので、障害のある人に効く直しが全員の申込率を上げる。",
      alt: "晴れた商店街で、高校生が片手に買い物袋を持ち、もう片方の手でスマホの予約ページを見ている。そばのパン屋の店先に店主が立っている。",
      art: { bg: "outdoor", cast: [{ who: "ハル", look: "girl", x: 70, face: "smile" }, { who: "店主", look: "teacher", x: 290, face: "smile" }], props: [{ kind: "sun", x: 40, y: 40 }] },
      extras: [
        { kind: "phone", x: 180, y: 112, s: 1.1, text: "予約" },
        { kind: "bag", x: 26, y: 236, s: 0.8 },
        { kind: "shop", x: 290, y: 56, s: 0.8 },
      ],
      labels: [
        { x: 160, y: 24, text: "日なた・片手", tone: "red" },
        { x: 180, y: 206, text: "申込率3.8%", tone: "navy" },
      ],
    },
];
