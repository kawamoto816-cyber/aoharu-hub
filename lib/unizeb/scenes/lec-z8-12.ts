import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z8-12。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z8_12: Scene[] = [
    {
      at: 0,
      caption: "作る係は不具合を、売る係は宣伝の時期を、お金と安全を見る係は支払いと保護者の同意を心配している。立場が違えば懸念も違う。",
      alt: "3人の高校生が並び、それぞれ、パソコン、メガホン、硬貨のそばで、違うことを心配している。",
      art: {
        bg: "class",
        cast: [
          { who: "アオ", look: "boy", x: 55, face: "sweat" },
          { who: "ハル", look: "girl", x: 170, face: "shout" },
          { who: "ミオ", look: "girl", x: 285, face: "think" },
        ],
      },
      extras: [
        { kind: "laptop", x: 55, y: 55, s: 0.9 },
        { kind: "megaphone", x: 170, y: 55, s: 0.9 },
        { kind: "coins", x: 285, y: 55, s: 0.9 },
      ],
      labels: [
        { x: 55, y: 110, text: "不具合", tone: "blue" },
        { x: 170, y: 110, text: "宣伝の時期", tone: "red" },
        { x: 285, y: 110, text: "支払い・同意", tone: "navy" },
      ],
    },
    {
      at: 2,
      caption: "AIには共有の許可を取れた意見だけを、名前を消して渡す。できた論点表は聞いた意見と照らし、抜けた懸念を足し、だれも言っていない論点を消す。",
      alt: "高校生が、パソコンの論点表とふせんのメモを見比べ、抜けているものに丸を、余計なものにばつをつけている。",
      art: { bg: "plain", cast: [{ who: "ミオ", look: "girl", x: 275, face: "think", fx: "idea" }] },
      extras: [
        { kind: "laptop", x: 110, y: 60, s: 1.1, text: "論点表" },
        { kind: "sticky", x: 60, y: 190, s: 0.9 },
        { kind: "check", x: 140, y: 180, s: 0.8 },
        { kind: "cross", x: 200, y: 180, s: 0.8 },
      ],
      labels: [
        { x: 60, y: 245, text: "共有OKだけ", tone: "navy" },
        { x: 140, y: 225, text: "抜けを足す", tone: "blue" },
        { x: 200, y: 255, text: "言ってない", tone: "red" },
      ],
    },
];
