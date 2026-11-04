import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z2-11。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z2_11: Scene[] = [
    {
      at: 2,
      caption: "エージェントが読めるのは、報告表のコピーを入れた集計用のフォルダだけ。名前と連絡先の表は許さず、案内を送るのも人がする。",
      alt: "高校生が、チェックの印のついた集計用のフォルダを指さしている。となりの名簿のフォルダにはばつ印がある。",
      art: { bg: "plain", cast: [{ who: "ミオ", look: "girl", x: 60, face: "smile", hand: [130, 120] }] },
      extras: [
        { kind: "folder", x: 175, y: 100, text: "集計用" },
        { kind: "folder", x: 285, y: 100, text: "名簿" },
        { kind: "check", x: 175, y: 44 },
        { kind: "cross", x: 285, y: 44 },
        { kind: "mail", x: 300, y: 225 },
      ],
      labels: [
        { x: 175, y: 160, text: "ここだけ読む", tone: "blue" },
        { x: 285, y: 160, text: "許さない", tone: "red" },
        { x: 200, y: 228, text: "送るのは人", tone: "navy" },
      ],
    },
    {
      at: 3,
      caption: "1回目と2回目は合格、3回目は空欄の行を飛ばして手直し。原因を指示書とテストに足し、直したあと3回とも合格してから任せる。",
      alt: "高校生が検収の記録を見ている。チェックの印が2つと、ばつ印が1つ並んでいる。",
      art: { bg: "class", cast: [{ who: "ミオ", look: "girl", x: 280, face: "think", fx: "!" }], props: [{ kind: "table", x: 0, y: 238 }] },
      extras: [
        { kind: "ledger", x: 110, y: 222, text: "検収" },
        { kind: "check", x: 50, y: 82 },
        { kind: "check", x: 110, y: 82 },
        { kind: "cross", x: 170, y: 82 },
      ],
      labels: [
        { x: 110, y: 30, text: "空欄の行で手直し", tone: "red" },
        { x: 110, y: 128, text: "直して3回とも合格", tone: "blue" },
      ],
    },
];
