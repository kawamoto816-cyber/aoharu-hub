import type { Scene } from "../types";

// 場面イラスト（オリジナル）：ep/honda-hojo。at は 0＝場面、1＝決断とその後。
// 架空の人物で場面を描く。実在の創業者・経営者、会社のロゴ・商品のデザインは描かない。
export const SC_EP_HONDA_HOJO: Scene[] = [
  {
    at: 0,
    caption: "大きな工場も資金もない。手に入るのは、使い道のなくなった小さなエンジン。いきなりオートバイを作るか、自転車に足すことから始めるか。",
    alt: "作業着の人が、小さなエンジンの入った箱と、工場の絵を見くらべ、ひらめいた顔をしている。",
    art: { bg: "outdoor", cast: [{ who: "作る人", look: "teacher", x: 275, face: "smile", fx: "idea" }], props: [{ kind: "factory", x: 65, y: 95, s: 0.7 }] },
    extras: [
      { kind: "boxes", x: 180, y: 105, s: 0.8 },
      { kind: "bulbIdea", x: 120, y: 210, s: 0.8 },
    ],
    labels: [
      { x: 65, y: 150, text: "オートバイ？" },
      { x: 180, y: 165, text: "約500基" },
      { x: 120, y: 262, text: "自転車に足す", tone: "blue" },
    ],
  },
];
