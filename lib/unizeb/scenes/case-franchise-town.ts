import type { Scene } from "../types";

// 場面イラスト（オリジナル）：case/franchise-town。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
// 架空の人物で状況を描く。会社のロゴ・看板・実際の店のデザインは描かない。1号店の店主（実在）は描かない。
export const SC_CASE_FRANCHISE_TOWN: Scene[] = [
  {
    at: 0,
    caption: "アメリカで育った店の仕組みを、ライセンス契約で借りた。日本の町で、だれがどうやって店を増やしていくかが最初の決断になる。",
    alt: "地球儀と町の小さな店の絵を前に、大人が腕を組んで、店をどう増やすか考えている。",
    art: { bg: "plain", cast: [{ who: "考える人", look: "teacher", x: 280, face: "think", fx: "?" }], props: [{ kind: "globe", x: 46, y: 70 }] },
    extras: [{ kind: "shop", x: 150, y: 110, text: "町の店" }],
    labels: [
      { x: 120, y: 160, text: "1973 ライセンス契約", tone: "blue" },
      { x: 110, y: 200, text: "朝7時から夜11時" },
    ],
  },
  {
    at: 1,
    caption: "ヨークセブンはフランチャイズで広げる形をとった。1974年に豊洲で開いた1号店は、もともと町の酒店で、その店主が応募して開いた店だった。",
    alt: "町の店の前で、店主の大人が契約の帳面をそばに置いて、にこやかに立っている。",
    art: { bg: "plain", cast: [{ who: "町の店主", look: "teacher", x: 280, face: "smile" }] },
    extras: [
      { kind: "shop", x: 100, y: 100, text: "1号店" },
      { kind: "ledger", x: 205, y: 70, text: "契約" },
    ],
    labels: [
      { x: 110, y: 150, text: "1974 豊洲に1号店", tone: "red" },
      { x: 110, y: 190, text: "元は町の酒店" },
    ],
  },
];
