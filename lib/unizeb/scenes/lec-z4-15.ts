import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z4-15。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z4_15: Scene[] = [
    {
      at: 1,
      caption: "同じ「必ず点数アップ」でも、書いた人には元気な呼びかけ、保護者には返金の約束に読める。受け取られ方は読む人の{{文脈}}で決まる。",
      alt: "左で高校生がにこにこして告知のチラシを指し、右の大人が首をかしげている。チラシには「必ず点数アップ」と書かれ、高校生の上に「元気な呼びかけ」、大人の上に「返金の約束？」と注記がある。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 66, face: "smile", fx: "!" }, { who: "保護者", look: "teacher", x: 274, face: "think", fx: "?", flip: true }] },
      extras: [
        { kind: "flyer", x: 170, y: 96, s: 1.1, text: "必ず点数UP" },
      ],
      labels: [
        { x: 66, y: 30, text: "元気な呼びかけ", tone: "blue" },
        { x: 274, y: 30, text: "返金の約束？", tone: "red" },
        { x: 170, y: 240, text: "読む人で変わる", tone: "navy" },
      ],
    },
    {
      at: 4,
      caption: "批判に気づいたら、まず1時間以内に投稿と事実を確かめ、保護者と運営に知らせる。出す文は人が{{承認}}してから。",
      alt: "高校生が、時計とスマートフォンと紙の前で、記録の帳面に書きこんでいる。時計には「1時間」、スマートフォンには「事実」、紙には「承認後」と書かれている。",
      art: { bg: "class", cast: [{ who: "アオ", look: "boy", x: 282, face: "think", flip: true }], props: [{ kind: "table", x: 0, y: 240 }] },
      extras: [
        { kind: "clock", x: 56, y: 88, s: 1, text: "1時間" },
        { kind: "phone", x: 132, y: 88, s: 1, text: "事実" },
        { kind: "flyer", x: 208, y: 88, s: 0.9, text: "承認後" },
        { kind: "ledger", x: 120, y: 226, s: 1, text: "記録" },
      ],
      labels: [
        { x: 132, y: 22, text: "順番どおりに", tone: "blue" },
        { x: 120, y: 160, text: "消さずに訂正", tone: "red" },
      ],
    },
];
