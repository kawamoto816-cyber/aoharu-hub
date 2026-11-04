import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z1-13。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z1_13: Scene[] = [
    {
      at: 0,
      caption: "後輩の「単語が全然覚えられない」という言葉と、その奥のあせりを受け取って、「覚えられなくて、あせっているんですね」と言い換えて返す。アドバイスはそのあと。",
      alt: "放課後の教室で、後輩が困った顔で話し、高校生がうなずきながら聞いている。二人の上に、言葉と気持ちの札が浮かんでいる。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 256, face: "normal" }, { who: "後輩", look: "boy", x: 84, face: "sweat", fx: "sweat" }] },
      extras: [
        { kind: "speech", x: 92, y: 62, s: 1, text: "覚えられない" },
        { kind: "speech", x: 246, y: 62, s: 1, text: "あせってる？" },
      ],
      labels: [
        { x: 92, y: 118, text: "言葉＋気持ち", tone: "blue" },
        { x: 246, y: 118, text: "言い換えて返す", tone: "red" },
      ],
    },
    {
      at: 3,
      caption: "15分の面談で、自分が話したのは4分30秒。発話比率は30%で、目安の3割ちょうど。数字で確かめると、話しすぎに気づける。",
      alt: "高校生が、ストップウォッチと発話比率のメモを見比べて考えている。",
      art: { bg: "class", cast: [{ who: "アオ", look: "boy", x: 270, face: "think", fx: "?" }], props: [{ kind: "table", x: 0, y: 240 }] },
      extras: [
        { kind: "stopwatch", x: 66, y: 92, s: 1, text: "15分" },
        { kind: "sticky", x: 168, y: 92, s: 1.1, text: "自分30%" },
        { kind: "laptop", x: 118, y: 222, s: 0.9, text: "集計" },
      ],
      labels: [
        { x: 66, y: 160, text: "面談全体" },
        { x: 168, y: 150, text: "3割以下に", tone: "red" },
        { x: 120, y: 24, text: "聞く7割・話す3割", tone: "blue" },
      ],
    },
];
