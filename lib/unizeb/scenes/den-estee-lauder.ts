import type { Scene } from "../types";

// 場面イラスト（オリジナル）：den/estee-lauder。at は節の番号（0から）。
// 実在の人物・会社のロゴ・商品は描かない。列伝の考え方を、架空の高校生と先生の場面に置きかえて描く。
export const SC_DEN_ESTEE_LAUDER: Scene[] = [
    {
      at: 1,
      caption: "説明を重ねるより、相手自身に試してもらって結果を見せる。クラスの友だちに試作品を試してもらう場面に置きかえた絵。エスティも、美容院で女性の肌に製品を塗って見せることから始めた。",
      alt: "教室で、高校生がクラスの友だちにお試しの品を手渡し、友だちが驚いて喜んでいる。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 65, face: "smile" }, { who: "アオ", look: "boy", x: 275, face: "surprise", fx: "!", flip: true }] },
      extras: [
        { kind: "bag", x: 170, y: 215, s: 0.9 },
        { kind: "sticky", x: 170, y: 60, text: "お試し" },
      ],
      labels: [
        { x: 165, y: 125, text: "まず試してもらう", tone: "blue" },
      ],
    },
    {
      at: 2,
      caption: "大きな売り場に置いてほしいときは、人が集まったという事実を根拠として見せて頼む。エスティは、ホテルでの実演に人が集まったことを示して、高級百貨店の仕入れ担当を説得した。",
      alt: "教室で、高校生が来てくれた人の数が伸びたグラフを先生に見せ、先生が考えている。",
      art: { bg: "class", cast: [{ who: "ミオ", look: "girl", x: 60, face: "smile" }, { who: "先生", look: "teacher", x: 282, face: "think", flip: true }] },
      extras: [
        { kind: "chartUp", x: 170, y: 75, s: 1.0, text: "来た人" },
        { kind: "check", x: 170, y: 215, s: 0.9 },
      ],
      labels: [
        { x: 170, y: 150, text: "事実で示して頼む", tone: "navy" },
      ],
    },
];
