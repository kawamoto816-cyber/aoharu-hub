import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z3-09。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z3_09: Scene[] = [
    {
      at: 0,
      caption: "意見箱で声を受け取り、基準で決めて直したら、箱の横の掲示板で「直したこと」を知らせる。ここまでで一回り。",
      alt: "商店街の入口で、商店会の会長が意見箱の横の掲示板にお知らせを貼り、高校生が見ている。",
      art: { bg: "outdoor", cast: [{ who: "会長", look: "teacher", x: 262, face: "smile" }, { who: "ハル", look: "girl", x: 78, face: "smile" }] },
      extras: [
        { kind: "mail", x: 170, y: 206, s: 1.0 },
        { kind: "flyer", x: 170, y: 100, s: 1.1, text: "お知らせ" },
      ],
      labels: [
        { x: 78, y: 18, text: "受付・判断", tone: "blue" },
        { x: 262, y: 18, text: "反映・通知", tone: "navy" },
        { x: 170, y: 256, text: "意見箱", tone: "navy" },
      ],
    },
    {
      at: 4,
      caption: "受付から通知まで11日の工程で、2週間に収める。通知文はAIが下書きし、会長が読んで確かめてから貼り出す。",
      alt: "商店会の会長がノートパソコンの下書きを読み、横のカレンダーに11日と書いてある。確認の印が付いている。",
      art: { bg: "plain", cast: [{ who: "会長", look: "teacher", x: 262, face: "think" }], props: [{ kind: "table", x: 0, y: 240 }] },
      extras: [
        { kind: "laptop", x: 150, y: 236, s: 0.8, text: "下書き" },
        { kind: "calendar", x: 92, y: 96, s: 1.1, text: "11日" },
        { kind: "check", x: 190, y: 92, s: 0.8 },
      ],
      labels: [
        { x: 100, y: 28, text: "AIは下書きまで", tone: "blue" },
        { x: 120, y: 160, text: "送るのは人", tone: "red" },
      ],
    },
];
