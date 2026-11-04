import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z5-15。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z5_15: Scene[] = [
    {
      at: 0,
      caption: "4週間の全件記録を、段階の順に並べる。声かけ40件、返信14件、面談7人、成約4人。いちばん大きく減るのは、声かけから返信の所。",
      alt: "高校生が、仮名だけを書いた記録帳を見ながら、声かけ・返信・面談・成約の4つの数を並べ、どこで人が減っているかを考えている。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 285, face: "think", fx: "?" }] },
      extras: [{ kind: "ledger", x: 100, y: 55, s: 1.0, text: "全件記録" }],
      labels: [
        { x: 105, y: 120, text: "声かけ 40件" },
        { x: 105, y: 155, text: "返信 14件", tone: "red" },
        { x: 105, y: 190, text: "面談 7人" },
        { x: 105, y: 225, text: "成約 4人", tone: "blue" },
      ],
    },
    {
      at: 4,
      caption: "申込みと代金は、運営の会社が用意した決済代行で受け取り、入金を確かめるのも運営。18歳未満のハルはお金を預からず、仮名の記録と人数を照らし合わせる。",
      alt: "高校生が、ノートパソコンの決済代行の画面と自分の記録帳を見比べている。そのそばで、運営の先生が入金の記録を確かめている。",
      art: {
        bg: "class",
        cast: [
          { who: "ハル", look: "girl", x: 270, face: "normal" },
          { who: "先生", look: "teacher", x: 85, face: "smile" },
        ],
      },
      extras: [
        { kind: "laptop", x: 178, y: 95, s: 1.0, text: "決済代行" },
        { kind: "ledger", x: 178, y: 200, s: 0.8, text: "仮名で記録" },
      ],
      labels: [
        { x: 85, y: 30, text: "入金は運営が確認", tone: "blue" },
        { x: 270, y: 30, text: "現金は預からない", tone: "red" },
      ],
    },
];
