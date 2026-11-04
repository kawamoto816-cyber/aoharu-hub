import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z7-13。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z7_13: Scene[] = [
    {
      at: 2,
      caption: "記者役に「一番うれしかったことは」と聞かれたら、まず「48冊売れたこと」と短く答え、つなぎの一言のあとに「半分で花だんの苗を買えた」と要点に戻る。",
      alt: "取材の練習。記者役の大人がメモ帳を持って質問し、高校生が答えている。間に「1 短く答える」「2 つなぎの一言」「3 要点に戻る」の札と、「花だん」と書かれたふせんがある。",
      art: {
        bg: "class",
        cast: [
          { who: "記者役", look: "teacher", x: 270, face: "think", flip: true },
          { who: "ハル", look: "girl", x: 80, face: "smile" },
        ],
      },
      extras: [{ kind: "sticky", x: 175, y: 205, s: 1, text: "花だん" }],
      labels: [
        { x: 175, y: 30, text: "1 短く答える", tone: "blue" },
        { x: 175, y: 66, text: "2 つなぎの一言" },
        { x: 175, y: 102, text: "3 要点に戻る", tone: "blue" },
      ],
    },
    {
      at: 5,
      caption: "取材の申し込みは、保護者と運営の確認のあとにする。18歳未満は顔写真・学校名・住所を出さない設定にして、取材の最初に記者に伝える。",
      alt: "教室で、高校生が取材の申し込みの書類を運営の大人に見せ、大人が確かめている。上に「顔写真なし」「学校名なし」「住所なし」の注記、間にチェックの印。",
      art: {
        bg: "class",
        cast: [
          { who: "運営の人", look: "teacher", x: 270, face: "think", flip: true },
          { who: "ハル", look: "girl", x: 80, face: "normal" },
        ],
      },
      extras: [
        { kind: "folder", x: 175, y: 150, s: 0.9, text: "申し込み" },
        { kind: "check", x: 175, y: 225 },
      ],
      labels: [
        { x: 175, y: 28, text: "顔写真なし", tone: "red" },
        { x: 175, y: 62, text: "学校名なし", tone: "red" },
        { x: 175, y: 96, text: "住所なし", tone: "red" },
      ],
    },
];
