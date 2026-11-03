import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z1-05。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z1_05: Scene[] = [
    {
      at: 0,
      caption: "やることの見積もり時間を足すと9.5時間、今週使える時間は7時間。はみ出しの2.5時間が、任せる・やめる必要のある時間になる。",
      alt: "やることを書いた付せんの山を前に、高校生が時計を見て汗をかいている。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 262, face: "sweat", fx: "sweat" }] },
      extras: [
        { kind: "sticky", x: 110, y: 74, s: 1.3, text: "やること6件" },
        { kind: "stopwatch", x: 110, y: 200, s: 0.9 },
      ],
      labels: [
        { x: 110, y: 134, text: "合計9.5時間", tone: "red" },
        { x: 110, y: 256, text: "使える7時間", tone: "blue" },
      ],
    },
    {
      at: 4,
      caption: "名簿の入力は後輩に任せ、凝った効果はやめる。急がないけれど大事な案内文は、土曜の10時からと先に予定に入れる。",
      alt: "高校生がカレンダーに予定を書きこみ、任せる作業にはチェック、やめる作業にはばつの印をつけて、すっきりした顔をしている。",
      art: { bg: "class", cast: [{ who: "アオ", look: "boy", x: 88, face: "smile" }] },
      extras: [
        { kind: "calendar", x: 236, y: 92, s: 1.1, text: "土10時" },
        { kind: "check", x: 196, y: 226 },
        { kind: "cross", x: 286, y: 226 },
      ],
      labels: [
        { x: 236, y: 26, text: "大事は先に予定へ", tone: "blue" },
        { x: 240, y: 170, text: "任せる・やめる", tone: "red" },
      ],
    },
];
