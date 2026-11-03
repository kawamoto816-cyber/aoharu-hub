import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z5-05。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z5_05: Scene[] = [
    {
      at: 2,
      caption: "「最後に英単語を覚えようとしたのはいつ？」から聞くと、「先週金曜の放課後、単語カード30枚に1時間、2束で約200円」という事実が返ってくる。",
      alt: "放課後の部室で、先輩が思い出しながら話し、後輩がノートに事実を書きとめている。",
      art: {
        bg: "class",
        cast: [
          { who: "先輩", look: "boy", x: 270, face: "think", fx: "?" },
          { who: "わたし", look: "girl", x: 75, face: "normal" },
        ],
      },
      extras: [{ kind: "ledger", x: 172, y: 120, s: 1.0, text: "事実メモ" }],
      labels: [
        { x: 172, y: 30, text: "最後はいつ？", tone: "blue" },
        { x: 172, y: 168, text: "カード30枚", tone: "navy" },
        { x: 172, y: 196, text: "1時間・約200円", tone: "red" },
      ],
    },
    {
      at: 4,
      caption: "聞く前に、目的を伝え、録音してよいかをたずねる。断られたら録音せず、メモだけにする。名前や連絡先は記録しない。",
      alt: "後輩がスマートフォンを手に録音してよいかをたずね、先輩が手でことわる。机の上にはメモ用のノートがある。",
      art: {
        bg: "class",
        cast: [
          { who: "先輩", look: "boy", x: 275, face: "smile" },
          { who: "わたし", look: "girl", x: 75, face: "normal", fx: "idea" },
        ],
      },
      extras: [
        { kind: "phone", x: 150, y: 84, s: 1.6, text: "録音？" },
        { kind: "cross", x: 204, y: 66, s: 0.8 },
        { kind: "ledger", x: 172, y: 210, s: 0.9, text: "メモだけ" },
      ],
      labels: [
        { x: 172, y: 20, text: "目的を伝える", tone: "blue" },
        { x: 172, y: 150, text: "名前は書かない", tone: "red" },
      ],
    },
];
