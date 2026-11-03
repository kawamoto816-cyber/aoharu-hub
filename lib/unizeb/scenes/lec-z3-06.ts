import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z3-06。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z3_06: Scene[] = [
    {
      at: 1,
      caption: "両極端の2人。朝7時に来て出口近くに停める{{熱心に工夫する人}}と、出すのに5分かかってバスを逃し、歩くことにした{{あきらめた人}}。",
      alt: "朝の学校の外で、時計の横で得意げな先輩と、ストップウォッチの横で困った顔の同級生が並んでいる。",
      art: { bg: "outdoor", cast: [{ who: "先輩", look: "boy", x: 80, face: "smile" }, { who: "同級生", look: "girl", x: 262, face: "sweat", fx: "sweat" }] },
      extras: [
        { kind: "clock", x: 80, y: 72, s: 0.8, text: "朝7時" },
        { kind: "stopwatch", x: 262, y: 76, s: 0.8, text: "5分" },
      ],
      labels: [
        { x: 90, y: 24, text: "熱心：7時に来る", tone: "blue" },
        { x: 250, y: 22, text: "あきらめ：歩く", tone: "red" },
      ],
    },
    {
      at: 4,
      caption: "学年ごとの列を床に色で書く案。極端な先輩は早く来なくてよくなり、8時ごろに来る平均的な人も場所を探す時間が減る。両方への効き方が書ければ{{全員に効く改善}}。",
      alt: "生徒会の副会長が、学年ごとの列を色で書いたちらしを持って、笑顔で説明している。",
      art: { bg: "class", cast: [{ who: "副会長", look: "girl", x: 262, face: "smile", fx: "idea" }] },
      extras: [
        { kind: "flyer", x: 100, y: 150, s: 1.3, text: "学年の列" },
        { kind: "check", x: 170, y: 90, s: 0.8 },
      ],
      labels: [
        { x: 110, y: 24, text: "極端な人に効く", tone: "blue" },
        { x: 110, y: 56, text: "平均的な人にも", tone: "navy" },
        { x: 100, y: 250, text: "床に色で書く" },
      ],
    },
];
