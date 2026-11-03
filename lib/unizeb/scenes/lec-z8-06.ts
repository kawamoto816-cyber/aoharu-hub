import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z8-06。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z8_06: Scene[] = [
    {
      at: 1,
      caption: "小袋の不足は毎回のように起きるが、失うのは1,000円ほど。雨はときどきでも、30,000円の返金になる。備える順番は、確率×影響の点数で決める。",
      alt: "屋外の広場で、雨雲を見上げる高校生と、小さなふくろを持って考えこむ高校生が、点数を書いた札を見くらべている。",
      art: {
        bg: "outdoor",
        cast: [
          { who: "アオ", look: "boy", x: 60, face: "think" },
          { who: "ハル", look: "girl", x: 290, face: "surprise", fx: "!", flip: true },
        ],
        props: [
          { kind: "cloud", x: 175, y: 40, s: 1.1 },
          { kind: "rain", x: 175, y: 85, s: 0.9 },
        ],
      },
      extras: [
        { kind: "bag", x: 140, y: 225, s: 0.7 },
        { kind: "coins", x: 215, y: 225, s: 0.7 },
      ],
      labels: [
        { x: 175, y: 140, text: "雨 6点", tone: "red" },
        { x: 175, y: 168, text: "小袋 3点", tone: "blue" },
      ],
    },
    {
      at: 3,
      caption: "前日18時の予報で降水確率60%以上なら、集会所に切りかえる。入れない8人には日程の変更か返金を選んでもらい、返金は実行委員会の大人が行う。",
      alt: "実行委員会の大人が、カレンダーと時計を確かめ、高校生が机の配置図を持って立っている。",
      art: {
        bg: "class",
        cast: [
          { who: "実行委員長", look: "teacher", x: 70, face: "normal" },
          { who: "ミオ", look: "girl", x: 280, face: "smile", flip: true },
        ],
      },
      extras: [
        { kind: "clock", x: 175, y: 55, text: "前日18時" },
        { kind: "calendar", x: 175, y: 205, s: 0.9, text: "翌月の回" },
      ],
      labels: [
        { x: 175, y: 115, text: "60%以上で発動", tone: "red" },
        { x: 175, y: 142, text: "集会所 12人", tone: "blue" },
      ],
    },
];
