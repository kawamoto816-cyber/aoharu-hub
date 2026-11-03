import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z8-01。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z8_01: Scene[] = [
    {
      at: 0,
      caption: "「たくさん売る」ではなく、金額と期限を入れて「3か月後の月に、月の売上3万円」と決めると、追いかけられるゴール（KGI）になる。",
      alt: "高校生が、3か月後に印をつけたカレンダーと、月の売上3万円と書いたグラフを見上げている。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 270, face: "smile", fx: "idea" }] },
      extras: [
        { kind: "calendar", x: 70, y: 80, s: 1.2, text: "3か月後" },
        { kind: "chartUp", x: 170, y: 90, s: 1.1, text: "KGI" },
        { kind: "cross", x: 60, y: 200, s: 0.8 },
        { kind: "check", x: 60, y: 245, s: 0.8 },
      ],
      labels: [
        { x: 145, y: 200, text: "たくさん売る", tone: "red" },
        { x: 145, y: 245, text: "月の売上3万円", tone: "blue" },
      ],
    },
    {
      at: 3,
      caption: "KPIは、何で・いつ数えるかを決めて、毎週同じ方法で数える。目標との差を見れば、どの数が足りないかがすぐわかる。",
      alt: "教室で2人の高校生が、週ごとの数を書いた帳面とカレンダーを見比べて、足りない数に印をつけている。",
      art: { bg: "class", cast: [{ who: "アオ", look: "boy", x: 60, face: "think" }, { who: "ハル", look: "girl", x: 290, face: "normal", flip: true }], props: [{ kind: "table", x: 0, y: 240 }] },
      extras: [
        { kind: "ledger", x: 175, y: 70, s: 1.2, text: "毎週の数" },
        { kind: "calendar", x: 175, y: 226, s: 0.9, text: "日曜" },
      ],
      labels: [
        { x: 175, y: 132, text: "見込み客 12/20人", tone: "red" },
        { x: 175, y: 164, text: "成約 3/5件", tone: "blue" },
      ],
    },
];
