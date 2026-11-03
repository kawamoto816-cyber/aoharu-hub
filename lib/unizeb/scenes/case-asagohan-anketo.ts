import type { Scene } from "../types";

// 場面イラスト（オリジナル）：case/asagohan-anketo。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
// 登場するのは18歳以上の大学生。前払いの代金は会計の担当が受け取り、2人で確かめる。
export const SC_CASE_ASAGOHAN_ANKETO: Scene[] = [
    {
      at: 0,
      caption: "アンケートでは70％が「使いたい」。でも設問は「便利だと思いませんか？」で、値段も回数も聞いていなかった。",
      alt: "大学生が、スマートフォンのアンケート結果とふせんを見ながら首をかしげている。",
      art: { bg: "class", cast: [{ who: "アオ", look: "boy", x: 272, face: "think", fx: "?" }] },
      extras: [
        { kind: "phone", x: 75, y: 100, s: 1.5 },
        { kind: "sticky", x: 175, y: 80, text: "使いたい70％" },
      ],
      labels: [
        { x: 75, y: 165, text: "便利だと思う？" },
        { x: 130, y: 205, text: "誘導の設問かも", tone: "red" },
      ],
    },
    {
      at: 1,
      caption: "前払いで予約したのは寮生の12％、24人。まず週3日・25食から始め、代金は会計の担当が受け取って2人で確かめる。",
      alt: "朝の寮の台所で、大学生2人が朝ごはんの袋とお金の箱、予約の帳面を前に笑顔で立っている。",
      art: { bg: "kitchen", cast: [{ who: "ハル", look: "girl", x: 65, face: "smile" }, { who: "アオ", look: "boy", x: 275, face: "smile", flip: true }], props: [{ kind: "table", x: 0, y: 236 }] },
      extras: [
        { kind: "ledger", x: 170, y: 105, s: 1, text: "予約24人" },
        { kind: "bag", x: 135, y: 228, s: 0.9 },
        { kind: "cashbox", x: 205, y: 228, s: 0.9 },
      ],
      labels: [
        { x: 170, y: 30, text: "週3日・25食", tone: "blue" },
        { x: 170, y: 160, text: "2人で確かめる" },
      ],
    },
];
