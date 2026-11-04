import type { Scene } from "../types";

// 場面イラスト（オリジナル）：ep/euglena-501。at は 0＝場面、1＝決断とその後。
// 架空の人物で場面を描く。実在の創業者・経営者、会社のロゴ・商品のデザインは描かない。
export const SC_EP_EUGLENA_501: Scene[] = [
  {
    at: 0,
    caption: "育てる技術はできたのに、使われた実績のない新しい素材は、なかなか取引してもらえない。何を変えて次の相手を探すかを考える場面。",
    alt: "会社の人が、緑の植物と、ばつ印のついた書類の山を前に考えこんでいる。",
    art: {
      bg: "outdoor",
      cast: [{ who: "会社の人", look: "teacher", x: 275, face: "sweat", fx: "sweat" }],
      props: [{ kind: "plant", x: 70, y: 200, s: 1.0 }],
    },
    extras: [
      { kind: "folder", x: 80, y: 80, s: 0.8, text: "提案" },
      { kind: "cross", x: 165, y: 75, s: 0.8 },
      { kind: "mail", x: 170, y: 195, s: 0.8 },
    ],
    labels: [
      { x: 120, y: 135, text: "実績がない", tone: "red" },
      { x: 120, y: 258, text: "次の1社へ？", tone: "blue" },
    ],
  },
];
