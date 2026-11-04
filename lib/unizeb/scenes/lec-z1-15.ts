import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z1-15。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z1_15: Scene[] = [
    {
      at: 3,
      caption: "アンケートは1問に1つのことを1〜5点で聞く。名前や担当の欄は作らず、答えた人が3人未満なら集計しない。AIに渡すのは平均点だけ。",
      alt: "高校生が、名前の欄に大きなバツをつけたアンケート用紙を見ながら、匿名を守る決まりを確かめている。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 268, face: "think" }], props: [{ kind: "table", x: 0, y: 240 }] },
      extras: [
        { kind: "flyer", x: 64, y: 84, s: 0.9, text: "1〜5点" },
        { kind: "cross", x: 150, y: 62 },
        { kind: "check", x: 150, y: 112 },
        { kind: "laptop", x: 120, y: 214, s: 0.9, text: "平均点" },
      ],
      labels: [
        { x: 200, y: 62, text: "名前の欄", tone: "red" },
        { x: 200, y: 112, text: "3人以上", tone: "blue" },
        { x: 120, y: 18, text: "匿名を守る", tone: "navy" },
      ],
    },
    {
      at: 5,
      caption: "2週間後、同じ5問で取り直すと、全体の平均は2.6点から3.1点に上がり、対応の漏れは6件から2件に減った。2つの数字がそろって動いたかを見る。",
      alt: "高校生二人が、上向きのグラフと漏れの件数のメモを見て、うれしそうにしている。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 258, face: "smile" }, { who: "アオ", look: "boy", x: 84, face: "smile" }] },
      extras: [
        { kind: "chartUp", x: 120, y: 58, s: 1, text: "2.6→3.1" },
        { kind: "sticky", x: 236, y: 56, s: 1, text: "漏れ6→2" },
      ],
      labels: [
        { x: 120, y: 106, text: "平均点", tone: "blue" },
        { x: 236, y: 100, text: "対応の漏れ", tone: "red" },
      ],
    },
];
