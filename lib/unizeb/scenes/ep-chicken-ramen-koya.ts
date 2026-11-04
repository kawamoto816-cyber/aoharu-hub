import type { Scene } from "../types";

// 場面イラスト（オリジナル）：ep/chicken-ramen-koya。at は 0＝場面、1＝決断とその後。
// 架空の人物で場面を描く。実在の創業者・経営者、会社のロゴ・商品のデザインは描かない。
export const SC_EP_CHICKEN_RAMEN_KOYA: Scene[] = [
  {
    at: 0,
    caption: "いくつもの事業に手を広げるか、まだ世の中にない一つの商品に時間を注ぐか。特別な設備がない中で、何にしぼるかを考える場面。",
    alt: "生徒が、魚介・繊維・出版と書いたフォルダーと、湯気の立つどんぶりを見くらべて考えている。",
    art: {
      bg: "plain",
      cast: [{ who: "ハル", look: "boy", x: 275, face: "think", fx: "?" }],
      props: [{ kind: "soup", x: 170, y: 205, s: 0.9 }],
    },
    extras: [
      { kind: "folder", x: 50, y: 75, s: 0.7, text: "魚介" },
      { kind: "folder", x: 120, y: 75, s: 0.7, text: "繊維" },
      { kind: "folder", x: 190, y: 75, s: 0.7, text: "出版" },
    ],
    labels: [
      { x: 115, y: 135, text: "いくつもの事業" },
      { x: 120, y: 258, text: "一つにしぼる？", tone: "red" },
    ],
  },
];
