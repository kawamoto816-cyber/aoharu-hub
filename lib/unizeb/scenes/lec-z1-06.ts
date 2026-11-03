import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z1-06。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z1_06: Scene[] = [
    {
      at: 3,
      caption: "ノートの左に浮かんだ考え、右に記録の数字。並べると「この先も」「全部」が、数字のどこにも書かれていないことがわかる。",
      alt: "高校生がノートを開き、考えと記録の数字を左右に書き分けて、考えこんでいる。",
      art: { bg: "class", cast: [{ who: "ミオ", look: "girl", x: 262, face: "think", fx: "?" }] },
      extras: [
        { kind: "ledger", x: 112, y: 86, s: 1.3, text: "考え｜事実" },
      ],
      labels: [
        { x: 112, y: 160, text: "送信10・既読4" },
        { x: 112, y: 198, text: "返信0件" },
        { x: 112, y: 240, text: "今のところ", tone: "red" },
      ],
    },
    {
      at: 4,
      caption: "言い直して行動すると、新しい数字が記録にふえる。送り直した6人のうち2人から返信が来て、「返信0件」が「返信2件」に変わった。",
      alt: "高校生が、届いたメッセージの印を見て、ひらめいたように笑っている。",
      art: { bg: "class", cast: [{ who: "ミオ", look: "girl", x: 90, face: "smile", fx: "idea" }] },
      extras: [
        { kind: "mail", x: 230, y: 90, s: 1.3 },
        { kind: "check", x: 290, y: 60 },
      ],
      labels: [
        { x: 236, y: 170, text: "返信0件が2件に", tone: "blue" },
        { x: 236, y: 210, text: "新しい数字を記録" },
      ],
    },
];
