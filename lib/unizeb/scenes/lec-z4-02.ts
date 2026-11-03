import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z4-02。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z4_02: Scene[] = [
    {
      at: 0,
      caption: "「売れる」と思うと、「かわいい」「いいね」のような合う話ばかりが目に入り、売れ残りの話は流してしまう。これが{{確証バイアス}}。",
      alt: "スマートフォンと「かわいい」と書かれたふせんを見て笑う高校生。足もとの売れ残りの箱には気づいていない。",
      art: { bg: "plain", cast: [{ who: "ミオ", look: "girl", x: 272, face: "smile" }] },
      extras: [
        { kind: "phone", x: 84, y: 108, s: 1.5 },
        { kind: "sticky", x: 178, y: 96, s: 1.1, text: "かわいい" },
        { kind: "boxes", x: 84, y: 266, s: 0.8 },
      ],
      labels: [
        { x: 178, y: 30, text: "合う話だけ集める", tone: "blue" },
        { x: 84, y: 192, text: "売れ残り", tone: "red" },
      ],
    },
    {
      at: 3,
      caption: "口で「買う」と言うだけなら、だれも何も失わない。日付と数を決めた予約という{{行動}}で答えてもらうと、反対の証拠も出うる。",
      alt: "考えこむ高校生の横に、予約の日付が書かれたカレンダーと、予約の数を記録する帳面。",
      art: { bg: "plain", cast: [{ who: "ミオ", look: "girl", x: 88, face: "think", fx: "idea" }] },
      extras: [
        { kind: "cross", x: 92, y: 84 },
        { kind: "calendar", x: 232, y: 82, s: 1.2, text: "予約" },
        { kind: "check", x: 304, y: 70 },
        { kind: "ledger", x: 232, y: 196, text: "予約の数" },
      ],
      labels: [
        { x: 92, y: 36, text: "口で言うだけ", tone: "red" },
        { x: 232, y: 254, text: "行動で答える", tone: "blue" },
      ],
    },
];
