import type { Scene } from "../types";

// 場面イラスト（オリジナル）：case/shotengai-sns。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
// 店主は大人の姿（teacher の絵）で描く。投稿（公開）は店主がする。
export const SC_CASE_SHOTENGAI_SNS: Scene[] = [
    {
      at: 0,
      caption: "「いい感じに」とだけ頼んだ下書きは、6本のうち5本が店主に書き直された。投稿して公開するのは店主。",
      alt: "机の上のノートパソコンとスマートフォンの下書きを前に、生徒があせり、店主が考えこんでいる。",
      art: { bg: "plain", cast: [{ who: "ハル", look: "girl", x: 60, face: "sweat" }, { who: "店主", look: "teacher", x: 280, face: "think", flip: true }], props: [{ kind: "table", x: 0, y: 236 }] },
      extras: [
        { kind: "laptop", x: 170, y: 228, text: "AI" },
        { kind: "phone", x: 160, y: 110, s: 1.4, text: "下書き" },
        { kind: "cross", x: 205, y: 82 },
      ],
      labels: [{ x: 170, y: 30, text: "6本中5本を直す", tone: "red" }],
    },
    {
      at: 1,
      caption: "目的・読む人・出す場所・文字数・完了条件と、載せてはいけないことを書いた頼み方の型で、手直しは6本中1本になった。",
      alt: "頼み方の型を書いた紙を前に、生徒と店主が笑っている。紙のとなりに確認の印がある。",
      art: { bg: "plain", cast: [{ who: "ハル", look: "girl", x: 60, face: "smile" }, { who: "店主", look: "teacher", x: 280, face: "smile", flip: true }], props: [{ kind: "table", x: 0, y: 236 }] },
      extras: [
        { kind: "flyer", x: 160, y: 100, s: 1.3, text: "頼み方の型" },
        { kind: "check", x: 215, y: 62 },
        { kind: "laptop", x: 170, y: 228, text: "AI" },
      ],
      labels: [{ x: 170, y: 160, text: "5つを書く", tone: "blue" }],
    },
  
];
