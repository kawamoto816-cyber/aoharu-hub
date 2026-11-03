import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z7-03。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z7_03: Scene[] = [
    {
      at: 2,
      caption: "雲の例えは、浮かぶ・形が変わる・雨で消えるといった部分が、クラウド保存の機能と対応しない。聞いた人は「雨の日は消えるの？」と心配してしまう。",
      alt: "雨雲の下で、スマートフォンを持った高校生が、写真が消えないかと驚いている。",
      art: {
        bg: "outdoor",
        cast: [{ who: "ハル", look: "girl", x: 270, face: "surprise", fx: "sweat" }],
        props: [{ kind: "cloud", x: 70, y: 60, s: 1.1 }, { kind: "rain", x: 160, y: 80, s: 1.2 }],
      },
      extras: [{ kind: "phone", x: 120, y: 200, s: 1.4, text: "写真" }],
      labels: [{ x: 120, y: 140, text: "消えるの？", tone: "red" }],
    },
    {
      at: 4,
      caption: "例えを話したあとは、うなずきではなく、相手が自分の言葉で言い直せたかで「伝わった」を数える。",
      alt: "高校生が年配の人にコインロッカーの例えを説明し、年配の人が笑顔で言い直している。間に丸の印と鍵つきの箱がある。",
      art: {
        bg: "class",
        cast: [
          { who: "祖母", look: "teacher", x: 260, face: "smile", fx: "idea", flip: true },
          { who: "ハル", look: "girl", x: 80, face: "smile" },
        ],
      },
      extras: [
        { kind: "folder", x: 170, y: 120, s: 1.2, text: "鍵" },
        { kind: "check", x: 170, y: 200 },
      ],
      labels: [
        { x: 170, y: 40, text: "言い直せた", tone: "blue" },
        { x: 170, y: 240, text: "1人目" },
      ],
    },
];
