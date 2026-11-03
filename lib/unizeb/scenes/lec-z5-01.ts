import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z5-01。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z5_01: Scene[] = [
    {
      at: 1,
      caption: "会社員1年目のBさんの朝を時刻で追う。7時30分、駅へ早歩きでパン屋の前を通るのに、列に並ぶ2分がない。",
      alt: "朝の駅前で、スマートフォンの時刻を気にして早歩きする若い会社員が、パン屋の前を通りすぎようとしている。",
      art: { bg: "outdoor", cast: [{ who: "Bさん", look: "boy", x: 275, face: "sweat", fx: "sweat" }] },
      extras: [
        { kind: "shop", x: 100, y: 222, s: 1.1, text: "パン屋" },
        { kind: "phone", x: 240, y: 62, s: 1.4, text: "7:30" },
      ],
      labels: [
        { x: 90, y: 40, text: "7時30分・駅へ早歩き", tone: "blue" },
        { x: 90, y: 74, text: "並ぶ2分がない", tone: "red" },
      ],
    },
    {
      at: 3,
      caption: "痛む瞬間が「7時30分、並ぶ2分がない」と決まると、届け方も決まる。前の日に予約し、朝は店先の棚から袋を取るだけにする。予約の案内は、Bさんが家でひと休みする21時ごろに目に入る場所に出す。",
      alt: "パン屋の店先の受け取り棚に予約の袋が並び、店主が前日予約の案内を用意して笑っている。",
      art: { bg: "plain", cast: [{ who: "店主", look: "teacher", x: 280, face: "smile" }], props: [{ kind: "table", x: 0, y: 244 }] },
      extras: [
        { kind: "bag", x: 60, y: 214, s: 0.9 },
        { kind: "bag", x: 115, y: 214, s: 0.9 },
        { kind: "bag", x: 170, y: 214, s: 0.9 },
        { kind: "flyer", x: 190, y: 80, s: 1.2, text: "前日予約" },
        { kind: "phone", x: 70, y: 90, s: 1.3, text: "21時" },
      ],
      labels: [
        { x: 115, y: 160, text: "受け取り棚", tone: "blue" },
        { x: 120, y: 24, text: "並ばずに10秒", tone: "red" },
      ],
    },
];
