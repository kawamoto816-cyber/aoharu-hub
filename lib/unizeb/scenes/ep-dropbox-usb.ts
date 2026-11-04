import type { Scene } from "../types";

// 場面イラスト（オリジナル）：ep/dropbox-usb。at は 0＝場面、1＝決断とその後。
// 架空の人物で場面を描く。実在の創業者・経営者、会社のロゴ・商品のデザインは描かない。
export const SC_EP_DROPBOX_USB: Scene[] = [
  {
    at: 0,
    caption: "移動中に仕事をしようとして、ファイルの入ったメモリを家に忘れたことに気づく。毎週のように起きる小さな困りごとが、事業の出発点になる。",
    alt: "生徒が、パソコンを開いたまま、空っぽのかばんを見て困った顔をしている。",
    art: { bg: "outdoor", cast: [{ who: "ハル", look: "boy", x: 275, face: "sweat", fx: "sweat" }] },
    extras: [
      { kind: "laptop", x: 100, y: 95, s: 1, text: "ファイル?" },
      { kind: "bag", x: 70, y: 205, s: 0.8 },
      { kind: "mail", x: 170, y: 210, s: 0.7 },
    ],
    labels: [
      { x: 100, y: 160, text: "メモリを忘れた", tone: "red" },
      { x: 170, y: 262, text: "自分あてに送る" },
    ],
  },
];
