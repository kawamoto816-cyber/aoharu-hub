import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z4-08。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z4_08: Scene[] = [
    {
      at: 2,
      caption: "絵や文章は作った時点で{{著作権}}が生まれる。名前やロゴは特許庁に登録してはじめて{{商標}}として守られる。",
      alt: "2人の高校生の間で、左に絵の描かれたチラシ、右に登録の書類を入れたフォルダーが並んでいる。",
      art: { bg: "class", cast: [{ who: "アオ", look: "boy", x: 52, face: "normal" }, { who: "ハル", look: "girl", x: 294, face: "surprise", fx: "!", flip: true }] },
      extras: [
        { kind: "flyer", x: 122, y: 100, s: 1.2, text: "絵" },
        { kind: "folder", x: 218, y: 100, s: 1.1, text: "登録" },
      ],
      labels: [
        { x: 122, y: 26, text: "著作権：作った時", tone: "blue" },
        { x: 178, y: 166, text: "商標：登録した時", tone: "red" },
      ],
    },
    {
      at: 3,
      caption: "決めた名前は、使い始める前にJ-PlatPatの商標検索で調べる。教育のサービスなら、第41類に似た登録がないかを見る。",
      alt: "ノートパソコンの画面で商標を検索する高校生。横に、検索した日と件数を書いた帳面がある。",
      art: { bg: "class", cast: [{ who: "アオ", look: "boy", x: 280, face: "think", fx: "?" }], props: [{ kind: "table", x: 0, y: 238 }] },
      extras: [
        { kind: "laptop", x: 110, y: 222, s: 1.3, text: "商標検索" },
        { kind: "ledger", x: 100, y: 92, s: 1, text: "第41類" },
        { kind: "calendar", x: 196, y: 70, s: 0.9, text: "調べた日" },
      ],
      labels: [
        { x: 120, y: 24, text: "使う前に調べる", tone: "blue" },
      ],
    },
];
