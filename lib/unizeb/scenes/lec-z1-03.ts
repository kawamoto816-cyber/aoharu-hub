import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z1-03。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z1_03: Scene[] = [
    {
      at: 1,
      caption: "「休日の9時から60分、チラシの文を考えたら、下書きが2枚できた」。いつ・何をしたら・どれだけはかどったかが、集中の波の根拠になる。",
      alt: "朝日の中で、高校生が時計とチラシの下書きを前に、にっこりしている。",
      art: { bg: "outdoor", cast: [{ who: "ミオ", look: "girl", x: 256, face: "smile" }], props: [{ kind: "sun", x: 44, y: 46 }] },
      extras: [
        { kind: "clock", x: 128, y: 74, text: "9時" },
        { kind: "flyer", x: 196, y: 92, s: 0.8, text: "下書き" },
      ],
      labels: [
        { x: 96, y: 178, text: "休日の朝9時", tone: "blue" },
        { x: 96, y: 214, text: "下書きが2枚" },
      ],
    },
    {
      at: 4,
      caption: "予定表には、作業より先に起床・就寝の時刻と休息を置く。休息は「作業50分ごとに10分」のように、いつ入れるかまで決める。",
      alt: "高校生がカレンダーとストップウォッチを見ながら、予定の順番を考えている。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 262, face: "think", fx: "?" }] },
      extras: [
        { kind: "calendar", x: 150, y: 84, s: 1.2, text: "予定" },
        { kind: "stopwatch", x: 104, y: 204, s: 0.8, text: "50分" },
      ],
      labels: [
        { x: 120, y: 26, text: "先に睡眠と休息", tone: "red" },
        { x: 150, y: 146, text: "睡眠・休息・作業の順" },
      ],
    },
];
