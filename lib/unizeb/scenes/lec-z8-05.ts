import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z8-05。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z8_05: Scene[] = [
    {
      at: 1,
      caption: "編集の前には、編集を待つ仕事の箱が積み上がり、後ろの確認の係は手が空いている。ボトルネックの前には仕事がたまり、後ろでは手が空く。",
      alt: "ノートパソコンで編集する高校生の横に、待っている仕事の箱が積まれ、もう1人の高校生は手持ちぶさたにしている。",
      art: {
        bg: "class",
        cast: [
          { who: "アオ", look: "boy", x: 60, face: "sweat", fx: "sweat" },
          { who: "ハル", look: "girl", x: 290, face: "think", fx: "?", flip: true },
        ],
        props: [{ kind: "table", x: 0, y: 240 }],
      },
      extras: [
        { kind: "boxes", x: 170, y: 72, s: 1.1 },
        { kind: "laptop", x: 120, y: 210, s: 0.8 },
        { kind: "check", x: 220, y: 215, s: 0.7 },
      ],
      labels: [
        { x: 170, y: 96, text: "編集待ち", tone: "navy" },
        { x: 170, y: 126, text: "編集 週2件", tone: "red" },
        { x: 170, y: 154, text: "確認 週5件", tone: "blue" },
      ],
    },
    {
      at: 4,
      caption: "編集の型を作って1件3時間を2時間にすると、編集は週3件、月12件になる。手を打ったら上限を測り直し、次の制約を探す。",
      alt: "高校生が、ストップウォッチで編集の時間を計り、上向きのグラフを見て喜んでいる。",
      art: { bg: "plain", cast: [{ who: "ハル", look: "girl", x: 270, face: "smile", fx: "idea" }] },
      extras: [
        { kind: "stopwatch", x: 80, y: 70, text: "3時間" },
        { kind: "stopwatch", x: 180, y: 70, text: "2時間" },
        { kind: "chartUp", x: 110, y: 238, s: 0.8, text: "月12件" },
      ],
      labels: [
        { x: 130, y: 128, text: "編集の型を作る", tone: "blue" },
        { x: 130, y: 155, text: "週2件から週3件", tone: "red" },
      ],
    },
];
