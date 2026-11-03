import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z6-08。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z6_08: Scene[] = [
    {
      at: 2,
      caption: "材料や送料は経費にできる。ふだん着る服は私的な支出で、経費にしない。スマホのように私用と共用する物は、記録で事業の分を区分して按分する。",
      alt: "材料の箱には青い丸の印、服には赤いばつの印、スマートフォンは要確認。生徒が仕分けを考えている。",
      art: { bg: "plain", cast: [{ who: "ハル", look: "girl", x: 285, face: "think" }], props: [{ kind: "tshirt", x: 130, y: 112, s: 0.8 }] },
      extras: [
        { kind: "check", x: 45, y: 30 },
        { kind: "boxes", x: 45, y: 125, s: 0.6 },
        { kind: "cross", x: 130, y: 30 },
        { kind: "phone", x: 210, y: 105 },
      ],
      labels: [
        { x: 45, y: 160, text: "材料・送料", tone: "blue" },
        { x: 130, y: 160, text: "私服", tone: "red" },
        { x: 210, y: 160, text: "要確認" },
        { x: 125, y: 215, text: "事業の分を記録で", tone: "blue" },
      ],
    },
    {
      at: 4,
      caption: "Bさんは、イラストの所得9万円とアルバイトの給与所得56万円で、合計所得65万円。令和8年分の扶養親族の線62万円を超えるので、親と相談する。",
      alt: "イラストのノートパソコンと給与の帳面を前に、大学生が合計所得が線を超えたことに気づいて驚いている。",
      art: { bg: "class", cast: [{ who: "Bさん", look: "girl", x: 282, face: "surprise", fx: "!" }] },
      extras: [
        { kind: "laptop", x: 70, y: 90, text: "イラスト" },
        { kind: "ledger", x: 180, y: 90, text: "給与" },
      ],
      labels: [
        { x: 70, y: 130, text: "9万円" },
        { x: 180, y: 140, text: "56万円" },
        { x: 125, y: 190, text: "合計所得65万円", tone: "red" },
        { x: 125, y: 225, text: "扶養の線62万円" },
      ],
    },
];
