import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z7-04。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z7_04: Scene[] = [
    {
      at: 2,
      caption: "形容詞だけの題は読み飛ばされ、新しさと数字が入った題は目を止めてもらえる。題には「すごい」ではなく「子ども服だけ」「月1回」を書く。",
      alt: "掲示板に「すごい！」と「子ども服」と書かれた2枚のお知らせが並び、高校生が見比べてひらめいている。左のお知らせの下に罰、右の下に丸の印がある。",
      art: { bg: "plain", cast: [{ who: "サキ", look: "girl", x: 280, face: "think", fx: "idea" }] },
      extras: [
        { kind: "flyer", x: 70, y: 100, s: 1.2, text: "すごい！" },
        { kind: "flyer", x: 175, y: 100, s: 1.2, text: "子ども服" },
        { kind: "cross", x: 70, y: 232 },
        { kind: "check", x: 175, y: 232 },
      ],
      labels: [
        { x: 70, y: 172, text: "形容詞だけ", tone: "red" },
        { x: 175, y: 172, text: "新しさと数字", tone: "blue" },
      ],
    },
    {
      at: 4,
      caption: "下書きの数字を記録と照らし、実名と学校名を消したら、保護者と運営に確認してもらう。配信するのは、確認を終えた運営会社。",
      alt: "教室で、高校生がノートパソコンのお知らせ文を大人に見せ、大人が考えながら確かめている。間に丸の印がある。",
      art: {
        bg: "class",
        cast: [
          { who: "サキ", look: "girl", x: 80, face: "normal" },
          { who: "運営の人", look: "teacher", x: 270, face: "think", flip: true },
        ],
      },
      extras: [
        { kind: "laptop", x: 175, y: 80, s: 1, text: "お知らせ" },
        { kind: "check", x: 175, y: 230 },
      ],
      labels: [
        { x: 175, y: 118, text: "数字を照らす", tone: "navy" },
        { x: 175, y: 152, text: "大人が確認", tone: "blue" },
        { x: 175, y: 186, text: "配信は運営会社", tone: "red" },
      ],
    },
];
