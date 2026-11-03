import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z2-05。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z2_05: Scene[] = [
    {
      at: 3,
      caption: "条件を1つ足すごとに、当てはまる人は減っていく。学校名がなくても、1人まで減れば、だれのことかわかってしまう（再識別）。",
      alt: "高校生が、1,200人・400人・12人・1人と減っていく人数のメモを見上げて考えている。最後の1人の横にばつ印がある。",
      art: { bg: "plain", cast: [{ who: "アオ", look: "boy", x: 266, face: "think", fx: "?" }] },
      extras: [
        { kind: "cross", x: 200, y: 214 },
      ],
      labels: [
        { x: 90, y: 30, text: "高校生 1,200人", tone: "blue" },
        { x: 90, y: 90, text: "＋2年 400人", tone: "blue" },
        { x: 90, y: 150, text: "＋陸上部 12人" },
        { x: 90, y: 214, text: "＋留学生 1人", tone: "red" },
      ],
    },
    {
      at: 4,
      caption: "消すのは手元のメモアプリで。AIには消した後の文だけを渡し、だれかわかる所が残っていないかを点検してもらう。",
      alt: "高校生が、スマートフォンのメモアプリで名前を消し、消した後の文だけをノートパソコンのAIに渡している。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 86, face: "smile", hand: [146, 210] }], props: [{ kind: "table", x: 0, y: 240 }] },
      extras: [
        { kind: "phone", x: 160, y: 206, s: 1.1, text: "メモ" },
        { kind: "laptop", x: 262, y: 228, s: 1.1, text: "点検" },
        { kind: "check", x: 262, y: 150 },
      ],
      labels: [
        { x: 200, y: 36, text: "元のメモは貼らない", tone: "red" },
        { x: 230, y: 80, text: "残り0件まで", tone: "blue" },
        { x: 150, y: 124, text: "手元で消す", tone: "navy" },
      ],
    },
];
