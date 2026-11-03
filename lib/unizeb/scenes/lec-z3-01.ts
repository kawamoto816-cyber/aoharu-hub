import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z3-01。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z3_01: Scene[] = [
    {
      at: 1,
      caption: "買う1人は、立場・困る場面・困りごとの3つで描く。たとえば「朝6時台の電車で通う運動部の2年生が、駅でパンを買えず、2時間目に空腹で集中できない」。",
      alt: "朝6時台の駅で、パンが買えずにかばんを置いて困った顔をしている高校生。上に立場・困る場面・困りごとの3つの札。",
      art: { bg: "outdoor", cast: [{ who: "ミオ", look: "girl", x: 260, face: "sweat", fx: "sweat" }] },
      extras: [
        { kind: "clock", x: 90, y: 150, s: 1, text: "朝6時台" },
        { kind: "bag", x: 170, y: 250, s: 1 },
        { kind: "cross", x: 120, y: 230, s: 0.8 },
      ],
      labels: [
        { x: 90, y: 26, text: "立場：運動部の2年", tone: "blue" },
        { x: 90, y: 60, text: "場面：駅でパンなし", tone: "blue" },
        { x: 90, y: 94, text: "困り：2時間目に空腹", tone: "red" },
      ],
    },
    {
      at: 5,
      caption: "推測の一言は、知っている人に過去の事実を聞いて確かめる。「買う？」ではなく「昨日の朝は何を食べた？」と聞く。",
      alt: "放課後の教室で、高校生が部活の仲間に昨日の朝ごはんをたずね、ふせんの印を推測から聞いたに付け替えている。",
      art: { bg: "class", cast: [{ who: "アオ", look: "boy", x: 90, face: "normal" }, { who: "ミオ", look: "girl", x: 260, face: "smile", flip: true }] },
      extras: [
        { kind: "sticky", x: 175, y: 80, s: 1.2, text: "推測→聞いた" },
        { kind: "check", x: 175, y: 140, s: 0.8 },
      ],
      labels: [
        { x: 175, y: 24, text: "昨日の朝は何を食べた？", tone: "blue" },
      ],
    },
];
