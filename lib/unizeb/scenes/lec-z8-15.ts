import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z8-15。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z8_15: Scene[] = [
    {
      at: 1,
      caption: "売上の30,000円を時間で分けると、材料などを立て替えた農家の手元には5,000円しか残らない。経費3,920円と手数料1,080円が、農家の分から消えていた。",
      alt: "材料のレシートを持った大人の農家が、汗をかいて困った顔をしている。",
      art: { bg: "plain", cast: [{ who: "農家", look: "teacher", x: 270, face: "sweat", fx: "sweat" }] },
      extras: [
        { kind: "receipt", x: 70, y: 70, s: 1.0, text: "3,920円" },
        { kind: "coins", x: 170, y: 75, s: 1.0, text: "5,000円" },
      ],
      labels: [
        { x: 75, y: 140, text: "立て替え3,920円", tone: "navy" },
        { x: 110, y: 190, text: "売上で分けると", tone: "navy" },
        { x: 110, y: 240, text: "残りは時給1,000円", tone: "red" },
      ],
    },
    {
      at: 3,
      caption: "AIの分配案を検算すると、時間の割合の案は合計30,000円で、売上から分けていた。正しくは手残りの25,000円から分ける。",
      alt: "高校生が、ノートパソコンに出たAIの分配案を見て、合計を確かめている。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 270, face: "think", fx: "?" }] },
      extras: [
        { kind: "laptop", x: 75, y: 65, s: 1.1, text: "AIの案" },
        { kind: "cross", x: 180, y: 55, s: 0.9 },
      ],
      labels: [
        { x: 110, y: 145, text: "合計＝手残りか", tone: "navy" },
        { x: 110, y: 195, text: "案1は30,000円", tone: "red" },
        { x: 110, y: 240, text: "正しくは25,000円", tone: "blue" },
      ],
    },
];
