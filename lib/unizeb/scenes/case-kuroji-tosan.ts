import type { Scene } from "../types";

// 場面イラスト（オリジナル）：case/kuroji-tosan。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
// 人物は18歳以上の大学生（架空）。会社の口座と支払いは大学生が管理し、確定は代表の社員が人の手でする設定。昼の場面にする。
export const SC_CASE_KUROJI_TOSAN: Scene[] = [
  {
    at: 0,
    caption: "利益は月10万円の黒字。でも代金が入るのはイベントの60日後で、資金繰り表では来月の月末の残高がマイナス30万円になる。",
    alt: "調理場で、大学生が資金繰り表の帳面と下がるグラフ、60日後と書かれたカレンダーを見て、汗をかいている。",
    art: { bg: "kitchen", cast: [{ who: "アオ", look: "boy", x: 275, face: "sweat", fx: "sweat" }] },
    extras: [
      { kind: "ledger", x: 75, y: 55, text: "資金繰り" },
      { kind: "calendar", x: 175, y: 55, text: "60日後" },
      { kind: "chartDown", x: 115, y: 150, text: "残高" },
    ],
    labels: [{ x: 115, y: 222, text: "利益は黒字なのに", tone: "red" }],
  },
  {
    at: 1,
    caption: "代金の半分を着手金で先に受け取り、少額の融資も受けた。利益は月10万円のままでも、お金が入る時期を変えて、谷を越えた。",
    alt: "2人の大学生が、着手金と書かれた帳面とチェックの印を間にして、ほっとした笑顔を見せている。",
    art: {
      bg: "kitchen",
      cast: [{ who: "ミオ", look: "girl", x: 60, face: "smile" }, { who: "アオ", look: "boy", x: 280, face: "smile", flip: true }],
    },
    extras: [
      { kind: "ledger", x: 170, y: 62, text: "着手金50%" },
      { kind: "check", x: 170, y: 135, s: 0.7 },
    ],
    labels: [
      { x: 170, y: 185, text: "警報ライン70万円", tone: "blue" },
      { x: 170, y: 212, text: "利益は月10万円のまま" },
    ],
  },
];
