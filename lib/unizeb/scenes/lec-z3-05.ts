import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z3-05。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z3_05: Scene[] = [
    {
      at: 1,
      caption: "申込、選ぶ、終わるの3画面を紙に描いて並べ、指でたどる。どの画面にも次へ進むボタンか文言があれば、{{行き止まり}}はない。",
      alt: "図書委員の高校生が、紙に描いた3枚の画面を机に並べ、指でたどりながら考えている。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 274, face: "think", fx: "?" }], props: [{ kind: "table", x: 0, y: 244 }] },
      extras: [
        { kind: "sticky", x: 46, y: 118, s: 0.9 },
        { kind: "sticky", x: 122, y: 118, s: 0.9 },
        { kind: "sticky", x: 198, y: 118, s: 0.9 },
        { kind: "check", x: 120, y: 200, s: 0.8 },
      ],
      labels: [
        { x: 120, y: 30, text: "申込・選ぶ・終わる", tone: "blue" },
        { x: 46, y: 76, text: "画面1" },
        { x: 122, y: 76, text: "画面2" },
        { x: 198, y: 76, text: "画面3" },
        { x: 120, y: 250, text: "行き止まりなし", tone: "navy" },
      ],
    },
    {
      at: 2,
      caption: "試してもらう間は説明せず、{{黙って見る}}。同級生Aが画面2で「日付ってどれ押すの？」と10秒止まったことを、そのまま書き取る。",
      alt: "放課後の図書室で、同級生が紙の画面を前に首をかしげ、図書委員がストップウォッチを置いて黙ってノートに書いている。",
      art: { bg: "class", cast: [{ who: "同級生A", look: "boy", x: 86, face: "think", fx: "?" }, { who: "ハル", look: "girl", x: 262, face: "normal", flip: true }], props: [{ kind: "table", x: 0, y: 244 }] },
      extras: [
        { kind: "sticky", x: 172, y: 120, s: 1.1, text: "画面2" },
        { kind: "stopwatch", x: 172, y: 210, s: 0.8, text: "10秒" },
        { kind: "ledger", x: 300, y: 70, s: 0.7 },
      ],
      labels: [
        { x: 120, y: 26, text: "説明しない", tone: "red" },
        { x: 210, y: 60, text: "言葉をそのまま", tone: "blue" },
      ],
    },
];
