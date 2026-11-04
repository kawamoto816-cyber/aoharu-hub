import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z5-13。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z5_13: Scene[] = [
    {
      at: 0,
      caption: "目の前の困りごと「宿題が終わらない」から、「なぜ」をくり返して下へたどる。いちばん下の「学べる場所が少ない」が、地域の環境にある根本原因。",
      alt: "高校生が、付せんに書いた「なぜ？」の下に、宿題が終わらないから学べる場所が少ないまでの5つのつながりを縦に並べ、考えている。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 285, face: "think", fx: "?" }] },
      extras: [{ kind: "sticky", x: 100, y: 50, s: 1.1, text: "なぜ？" }],
      labels: [
        { x: 105, y: 110, text: "宿題が終わらない", tone: "red" },
        { x: 105, y: 145, text: "わからない所が残る" },
        { x: 105, y: 180, text: "聞ける人がいない" },
        { x: 105, y: 215, text: "大人の時間が少ない" },
        { x: 105, y: 250, text: "学べる場所が少ない", tone: "navy" },
      ],
    },
    {
      at: 4,
      caption: "悪循環の輪の中で、学習会が動かせるのは「家で勉強しない」の所。家庭の事情は変えられないので、学習会の最初の15分を、宿題を始める時間にする。",
      alt: "学習会の部屋で、高校生が時計を指さしながら、学習会の代表に、最初の15分を宿題を始める時間にする案を説明している。代表はうなずいている。",
      art: {
        bg: "class",
        cast: [
          { who: "ハル", look: "girl", x: 270, face: "smile", fx: "idea" },
          { who: "代表", look: "teacher", x: 85, face: "smile" },
        ],
      },
      extras: [{ kind: "clock", x: 178, y: 85, s: 1.0, text: "最初15分" }],
      labels: [
        { x: 85, y: 30, text: "家庭は動かせない", tone: "red" },
        { x: 270, y: 30, text: "介入点", tone: "blue" },
      ],
    },
];
