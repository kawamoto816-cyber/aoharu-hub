import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z4-05。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z4_05: Scene[] = [
    {
      at: 1,
      caption: "テスト前に質問が集中する質問サービスと、昼どきに注文が集中する弁当店。業界の言葉を外すと「ある時間に集中し、対応する人は増やせない」という{{同じ構造}}が見える。",
      alt: "真ん中で講師が考えこみ、ひらめいている。左にスマートフォンと「質問が集中」、右に昼12時の時計と弁当の袋と「注文が集中」の注記。",
      art: { bg: "plain", cast: [{ who: "講師", look: "boy", x: 170, face: "think", fx: "idea" }] },
      extras: [
        { kind: "phone", x: 54, y: 92, s: 1.2, text: "質問" },
        { kind: "clock", x: 286, y: 88, text: "昼12時" },
        { kind: "boxes", x: 54, y: 240, s: 0.7 },
        { kind: "bag", x: 286, y: 236, s: 0.9 },
      ],
      labels: [
        { x: 60, y: 26, text: "質問が集中" },
        { x: 280, y: 26, text: "注文が集中" },
        { x: 170, y: 60, text: "同じ構造", tone: "blue" },
        { x: 54, y: 180, text: "テスト前", tone: "red" },
        { x: 286, y: 180, text: "昼どき", tone: "red" },
      ],
    },
    {
      at: 3,
      caption: "AIが出した例は、出典の記事を自分で開き、名前・時期・しくみが本当に書かれているかを確かめる。書かれていない例には「確かめられない」と印を付けて使わない。",
      alt: "高校生がノートパソコンで出典を開いて考えている。左上に記事のフォルダーと青い丸印、その横に赤いばつ印と「書かれていない」の注記。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 276, face: "think", fx: "?" }], props: [{ kind: "table", x: 0, y: 244 }] },
      extras: [
        { kind: "folder", x: 56, y: 96, text: "記事" },
        { kind: "check", x: 56, y: 150 },
        { kind: "cross", x: 164, y: 96 },
        { kind: "laptop", x: 116, y: 236, s: 1.1, text: "出典" },
      ],
      labels: [
        { x: 112, y: 26, text: "名前・時期・しくみ", tone: "blue" },
        { x: 164, y: 140, text: "書かれていない", tone: "red" },
      ],
    },
];
