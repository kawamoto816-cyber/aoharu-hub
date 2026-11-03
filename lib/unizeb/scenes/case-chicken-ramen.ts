import type { Scene } from "../types";

// 場面イラスト（オリジナル）：case/chicken-ramen。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
// 実在の商品・会社のロゴは描かない。人物は架空。
export const SC_CASE_CHICKEN_RAMEN: Scene[] = [
    {
      at: 0,
      caption: "35円は高いか安いか。電車の初乗りやうどん1玉とくらべるか、家でお湯をかけるだけで食べられる手間の差とくらべるかで、見え方が変わる。",
      alt: "台所で、生徒が天びんの絵を前に、35円と10円と約6円の値段をくらべて考えている。",
      art: { bg: "kitchen", cast: [{ who: "ハル", look: "girl", x: 262, face: "think", fx: "?" }], props: [{ kind: "soup", x: 150, y: 246 }] },
      extras: [{ kind: "scale", x: 160, y: 150 }],
      labels: [
        { x: 80, y: 30, text: "1袋 35円", tone: "red" },
        { x: 80, y: 62, text: "電車 10円", tone: "blue" },
        { x: 86, y: 94, text: "うどん 約6円" },
      ],
    },
    {
      at: 1,
      caption: "お湯をかけるだけで食べられる新しさが注目され、35円でも売り上げを伸ばした。値段は、買う人が何とくらべるかにも左右される。",
      alt: "食卓で、2人がお湯をかけたラーメンのどんぶりを前に、時計を見て笑っている。",
      art: { bg: "kitchen", cast: [{ who: "ハル", look: "girl", x: 60, face: "smile" }, { who: "アオ", look: "boy", x: 280, face: "smile", flip: true }], props: [{ kind: "table", x: 0, y: 236 }, { kind: "soup", x: 170, y: 234 }] },
      extras: [{ kind: "clock", x: 170, y: 70, text: "お湯だけ" }],
      labels: [{ x: 170, y: 150, text: "家ですぐ食べられる", tone: "blue" }],
    },
  
];
