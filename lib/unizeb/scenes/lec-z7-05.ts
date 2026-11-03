import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z7-05。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z7_05: Scene[] = [
    {
      at: 3,
      caption: "壁も変化も、同じ「時間」のものさしで描く。想定の話のAさんは、宿題にかかる時間が90分から40分になった。",
      alt: "台所で小学生がひらめいた顔をしている。左に「90分」と「40分」の2つの時計が並び、文章題に線と丸をつけるふせんがある。",
      art: { bg: "kitchen", cast: [{ who: "Aさん", look: "boy", x: 275, face: "smile", fx: "idea", flip: true }] },
      extras: [
        { kind: "clock", x: 65, y: 70, s: 1, text: "90分" },
        { kind: "clock", x: 170, y: 70, s: 1, text: "40分" },
        { kind: "sticky", x: 118, y: 215, s: 1.2, text: "線と丸" },
      ],
      labels: [
        { x: 65, y: 140, text: "助けの前", tone: "red" },
        { x: 170, y: 140, text: "助けのあと", tone: "blue" },
      ],
    },
    {
      at: 4,
      caption: "名前を消しても、学校名や学年と部活を組み合わせると、だれのことかわかる。物語では「小学生のAさん」とぼかし、話に必要ない情報は消す。",
      alt: "教室で高校生がノートパソコンの物語を読み直している。下に「名前はAさんに」「学校名は消す」という注記がある。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 275, face: "think", fx: "?", flip: true }] },
      extras: [
        { kind: "laptop", x: 105, y: 90, s: 1.1, text: "物語" },
      ],
      labels: [
        { x: 105, y: 140, text: "名前はAさんに", tone: "blue" },
        { x: 105, y: 175, text: "学校名は消す", tone: "red" },
      ],
    },
];
