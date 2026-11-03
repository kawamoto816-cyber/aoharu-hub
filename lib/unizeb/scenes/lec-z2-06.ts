import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z2-06。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z2_06: Scene[] = [
    {
      at: 3,
      caption: "主張ごとに一次情報を自分で開き、どこに何と書いてあるかを見る。探しても数字が見つからなければ、判定は根拠不明。",
      alt: "高校生が、統計の表を虫めがねでのぞきこんで考えている。表の横に「8割？」と書かれている。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 96, face: "think", hand: [170, 214] }], props: [{ kind: "table", x: 0, y: 236 }, { kind: "loupe", x: 178, y: 206 }] },
      extras: [
        { kind: "ledger", x: 230, y: 90, s: 1.2, text: "統計の表" },
        { kind: "speech", x: 120, y: 50, s: 0.8, text: "8割？" },
      ],
      labels: [
        { x: 270, y: 166, text: "見つからない", tone: "red" },
        { x: 270, y: 196, text: "根拠不明", tone: "red" },
      ],
    },
    {
      at: 4,
      caption: "確かめた一次情報は、URLと確認日をいっしょに残す。誤りは直し、根拠不明は削ってから使う。",
      alt: "高校生が、カレンダーに確認日を書きこみ、チェックの印をつけた記録を見て笑っている。",
      art: { bg: "class", cast: [{ who: "アオ", look: "boy", x: 262, face: "smile" }], props: [{ kind: "table", x: 0, y: 238 }] },
      extras: [
        { kind: "calendar", x: 70, y: 70, s: 1.1, text: "11/4" },
        { kind: "folder", x: 150, y: 210, s: 1.2, text: "記録" },
        { kind: "check", x: 150, y: 70 },
      ],
      labels: [
        { x: 92, y: 140, text: "URLと確認日", tone: "blue" },
        { x: 200, y: 30, text: "根拠不明は削る", tone: "red" },
      ],
    },
];
