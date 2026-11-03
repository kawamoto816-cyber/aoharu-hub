import type { Scene } from "../types";

// 場面イラスト（オリジナル）：case/ikitai-ninzu。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
// 登場するのは18歳以上の大学生。
export const SC_CASE_IKITAI_NINZU: Scene[] = [
    {
      at: 0,
      caption: "アンケートの「行きたい」は120人。でも去年の記録では、「行きたい」90人のうち来たのは27人だった。",
      alt: "大学生が、スマートフォンのアンケート結果と、去年の記録の帳面を見くらべておどろいている。",
      art: { bg: "class", cast: [{ who: "アオ", look: "boy", x: 270, face: "surprise", fx: "!" }] },
      extras: [
        { kind: "phone", x: 70, y: 96, s: 1.5 },
        { kind: "ledger", x: 165, y: 104, text: "去年の記録" },
      ],
      labels: [
        { x: 72, y: 160, text: "行きたい120人" },
        { x: 160, y: 200, text: "来たのは27人", tone: "red" },
      ],
    },
    {
      at: 1,
      caption: "去年の比率の3割で見こみ、40人用の会場にした。当日は38人。参加費は会計の担当が受け取り、2人で確かめた。",
      alt: "新歓の会場で、大学生2人が笑顔で立ち、会計の箱と40人用と書いたカレンダーがある。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 70, face: "smile" }, { who: "アオ", look: "boy", x: 160, face: "smile" }], props: [{ kind: "table", x: 0, y: 236 }] },
      extras: [
        { kind: "calendar", x: 272, y: 108, text: "40人用" },
        { kind: "cashbox", x: 272, y: 226 },
      ],
      labels: [
        { x: 255, y: 40, text: "見こみ36人→38人", tone: "blue" },
        { x: 272, y: 172, text: "2人で確かめる" },
      ],
    },
  
];
