import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z1-10。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z1_10: Scene[] = [
    {
      at: 0,
      caption: "3か月（12週）の目標、見込み客30件を、2週間ごと6回の到達点に刻む。累計の最後が30件になり、目標との差は0。",
      alt: "高校生がカレンダーと、右上がりのグラフを見ながら、にっこりしている。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 270, face: "smile" }] },
      extras: [
        { kind: "calendar", x: 70, y: 92, s: 1.1, text: "12週" },
        { kind: "chartUp", x: 170, y: 92, s: 1.1, text: "累計30件" },
      ],
      labels: [
        { x: 70, y: 168, text: "2週間ごと" },
        { x: 170, y: 168, text: "目標との差0", tone: "blue" },
        { x: 120, y: 220, text: "6回に刻む", tone: "red" },
      ],
    },
    {
      at: 4,
      caption: "AIの週次レポートは見込み客6件、自分の記録は5件。同じ家を2回数えていたので、記録の値に直してから使う。",
      alt: "高校生がノートの記録と、ノートパソコンに出たレポートを見比べて考えている。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 270, face: "think", fx: "?" }], props: [{ kind: "table", x: 0, y: 240 }] },
      extras: [
        { kind: "ledger", x: 70, y: 84, s: 1, text: "記録5件" },
        { kind: "laptop", x: 100, y: 196, s: 1.1, text: "AIは6件" },
        { kind: "cross", x: 186, y: 150, s: 0.7 },
      ],
      labels: [
        { x: 150, y: 26, text: "記録と照らす", tone: "red" },
      ],
    },
];
