import type { Scene } from "../types";

// 場面イラスト（オリジナル）：den/namba-tomoko。at は節の番号（0から）。
// 実在の人物は描かない。列伝の出来事を、架空の高校生の事業に置きかえて描く。
export const SC_DEN_NAMBA_TOMOKO: Scene[] = [
    {
      at: 2,
      caption: "列伝の出来事を、架空の高校生の事業に置きかえた場面。アプリづくりを外に任せきりにしたまま、テストの日になって中身ができていないとわかる。任せる中身と進み具合は、途中で確かめておく。",
      alt: "教室で、高校生2人がノートパソコンの画面に何も書かれていないのを見て驚き、カレンダーにはテストの日の印がある。",
      art: { bg: "plain", cast: [{ who: "ハル", look: "girl", x: 220, face: "surprise", fx: "!" }, { who: "アオ", look: "boy", x: 300, face: "sweat", fx: "sweat", flip: true }] },
      extras: [
        { kind: "laptop", x: 85, y: 95, s: 1.3, text: "0行" },
        { kind: "calendar", x: 85, y: 215, s: 0.9, text: "テスト日" },
        { kind: "sticky", x: 262, y: 55, text: "外に任せた" },
      ],
      labels: [
        { x: 85, y: 128, text: "プログラムがない", tone: "red" },
      ],
    },
    {
      at: 3,
      caption: "パソコンのオークションでは1位に届かず、通信料の定額制が登場した携帯電話という別の場で、初めて1位をとった。場を移す判断を、図のように描いた絵（人物は架空）。",
      alt: "左にノートパソコン、右に携帯電話と右上がりのグラフがあり、高校生が見比べて考えている。",
      art: { bg: "plain", cast: [{ who: "ハル", look: "girl", x: 285, face: "think", fx: "idea", flip: true }] },
      extras: [
        { kind: "laptop", x: 70, y: 70, s: 1.1, text: "PC" },
        { kind: "phone", x: 180, y: 60, s: 1.2, text: "携帯" },
        { kind: "chartUp", x: 180, y: 190, s: 0.9 },
      ],
      labels: [
        { x: 70, y: 130, text: "1位に届かず", tone: "blue" },
        { x: 180, y: 245, text: "初めて1位", tone: "red" },
      ],
    },
];
