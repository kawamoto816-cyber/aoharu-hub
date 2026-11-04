import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z8-14。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z8_14: Scene[] = [
    {
      at: 1,
      caption: "覚書の下書きに、必須の7項目がそろっているかを1つずつ確かめる。費用負担・成果物の権利・終了条件は「別途相談」にしない。",
      alt: "高校生が、覚書の下書きのファイルを見ながら、項目ごとに印をつけている。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 270, face: "think" }] },
      extras: [
        { kind: "folder", x: 70, y: 65, s: 1.1, text: "覚書案" },
        { kind: "check", x: 170, y: 65, s: 1.0 },
      ],
      labels: [
        { x: 110, y: 135, text: "目的・役割・期間", tone: "navy" },
        { x: 110, y: 180, text: "費用・成果物", tone: "blue" },
        { x: 110, y: 225, text: "秘密・終了条件", tone: "red" },
      ],
    },
    {
      at: 4,
      caption: "18歳未満は本人だけで署名しない。運営のスタッフと保護者に下書きを確かめてもらい、署名・締結は大人が行う。お金は運営会社の決済代行を通す。",
      alt: "高校生が、運営のスタッフに覚書の下書きを見せ、確認を受けている。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 75, face: "normal" }, { who: "運営のスタッフ", look: "teacher", x: 265, face: "smile", flip: true }] },
      extras: [
        { kind: "folder", x: 120, y: 55, s: 1.0, text: "覚書案" },
        { kind: "check", x: 220, y: 55, s: 1.0 },
      ],
      labels: [
        { x: 170, y: 118, text: "署名は大人が", tone: "red" },
        { x: 170, y: 250, text: "決済代行", tone: "blue" },
      ],
    },
];
