import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z8-11。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z8_11: Scene[] = [
    {
      at: 2,
      caption: "権限表で、AIに触らせる範囲を決める。案件フォルダは読む・書く、外への送信は人の承認のあと、パスワードと支払いは渡さない。",
      alt: "高校生が、パソコンの横に並べたフォルダと手紙と硬貨を見ながら、AIに渡すかどうかを1つずつ決めている。",
      art: { bg: "plain", cast: [{ who: "アオ", look: "boy", x: 275, face: "think", fx: "idea" }] },
      extras: [
        { kind: "laptop", x: 110, y: 60, s: 1.1, text: "AI v1" },
        { kind: "folder", x: 45, y: 175, s: 0.9 },
        { kind: "mail", x: 110, y: 175, s: 0.9 },
        { kind: "coins", x: 175, y: 175, s: 0.9 },
      ],
      labels: [
        { x: 45, y: 225, text: "読む・書く", tone: "blue" },
        { x: 110, y: 252, text: "承認のあと", tone: "navy" },
        { x: 180, y: 225, text: "渡さない", tone: "red" },
      ],
    },
    {
      at: 3,
      caption: "AIの週次集計は12件、手集計は10件。記録の行を1つずつ照らすと、同じ家庭の重なりと前の週の行が見つかった。数え方を指示書に書き足す。",
      alt: "机をはさんで2人の学生が、パソコンの集計と手で数えた帳面を見比べ、ずれの原因を探している。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 60, face: "think", fx: "?" }, { who: "アオ", look: "boy", x: 290, face: "normal", flip: true }], props: [{ kind: "table", x: 0, y: 240 }] },
      extras: [
        { kind: "laptop", x: 175, y: 60, text: "AI 12件" },
        { kind: "ledger", x: 175, y: 222, s: 0.8, text: "手 10件" },
      ],
      labels: [
        { x: 175, y: 120, text: "行を照らす", tone: "blue" },
        { x: 175, y: 146, text: "重なり1・前週1", tone: "red" },
      ],
    },
];
