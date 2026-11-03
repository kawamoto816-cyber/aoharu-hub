import type { Scene } from "../types";

// 場面イラスト（オリジナル）：case/tshirt-ensei。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_CASE_TSHIRT_ENSEI: Scene[] = [
    {
      at: 0,
      caption: "1枚売ると1,000円が部に残る。6万円には60枚。注文の締切までの3週間で、何をどんな順番で進めるかを決める。",
      alt: "教室で、部員がTシャツとカレンダーとふせんを前に、3週間の進め方を考えている。",
      art: { bg: "class", cast: [{ who: "アオ", look: "boy", x: 262, face: "think", fx: "?" }], props: [{ kind: "table", x: 0, y: 242 }, { kind: "tshirt", x: 100, y: 240, s: 1.2 }] },
      extras: [
        { kind: "calendar", x: 70, y: 66, text: "3週間" },
        { kind: "sticky", x: 170, y: 80, text: "60枚" },
      ],
      labels: [{ x: 120, y: 150, text: "1枚で1,000円残る", tone: "blue" }],
    },
    {
      at: 1,
      caption: "作業を4つに分けて担当と期日を決め、注文は60枚に届いた。代金は顧問の先生が管理する部の口座で受け取り、入金を確かめてから先生が発注した。",
      alt: "顧問の先生が注文の表を確かめ、生徒がうなずいている。机の上に注文60枚と書いた帳面がある。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 60, face: "smile" }, { who: "先生", look: "teacher", x: 275, face: "normal", flip: true }], props: [{ kind: "table", x: 0, y: 236 }] },
      extras: [
        { kind: "ledger", x: 168, y: 200, text: "注文60枚" },
        { kind: "check", x: 168, y: 100 },
      ],
      labels: [{ x: 168, y: 36, text: "代金は先生の口座", tone: "blue" }],
    },
  
];
