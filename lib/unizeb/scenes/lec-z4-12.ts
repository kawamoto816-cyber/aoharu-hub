import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z4-12。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z4_12: Scene[] = [
    {
      at: 1,
      caption: "ネットで売る広告には、値段・支払い・提供の時期・キャンセルの条件などを表示し、申込みの最終確認画面にも分量などを表示する（特定商取引法第11条・第12条の6）。",
      alt: "高校生がノートパソコンで申込みの確認画面を作っている。上に「値段」「取消条件」と書いたチラシが2枚。",
      art: { bg: "class", cast: [{ who: "ケン", look: "boy", x: 276, face: "think", fx: "?" }], props: [{ kind: "table", x: 0, y: 244 }] },
      extras: [
        { kind: "flyer", x: 60, y: 92, s: 1.1, text: "値段" },
        { kind: "flyer", x: 160, y: 92, s: 1.1, text: "取消条件" },
        { kind: "laptop", x: 110, y: 230, s: 1.1, text: "確認画面" },
      ],
      labels: [
        { x: 110, y: 22, text: "表示は運営の情報", tone: "blue" },
        { x: 110, y: 156, text: "第12条の6", tone: "red" },
      ],
    },
    {
      at: 4,
      caption: "AIが出した条番号は、e-Gov法令検索で原文を開いて照らす。一致・違う・見つからないを記録し、開いた日を確認日として残す。",
      alt: "高校生がノートパソコンで条文を開き、カレンダーに確認日を書きこんでいる。左上に条文のフォルダーと丸印。",
      art: { bg: "class", cast: [{ who: "ケン", look: "boy", x: 276, face: "smile", fx: "idea" }], props: [{ kind: "table", x: 0, y: 244 }] },
      extras: [
        { kind: "folder", x: 50, y: 92, text: "原文" },
        { kind: "check", x: 130, y: 92 },
        { kind: "calendar", x: 200, y: 92, s: 0.9, text: "確認日" },
        { kind: "laptop", x: 110, y: 230, s: 1.1, text: "e-Gov" },
      ],
      labels: [
        { x: 120, y: 22, text: "原文を開いて照らす", tone: "blue" },
        { x: 110, y: 156, text: "見つからないは使わない", tone: "red" },
      ],
    },
];
