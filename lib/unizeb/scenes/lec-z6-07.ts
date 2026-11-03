import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z6-07。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z6_07: Scene[] = [
    {
      at: 0,
      caption: "自己資金・借入・出資・補助金。教室を開くのに要る45万円を、どこから集めるかで、失うものとお金が入る時期が変わる。",
      alt: "大学生が、貯金箱・借用の帳面・持分と書いたフォルダー・補助金の封筒を前に、どれを使うか考えている。",
      art: { bg: "plain", cast: [{ who: "ミオ", look: "girl", x: 282, face: "think", fx: "?" }] },
      extras: [
        { kind: "piggy", x: 60, y: 70 },
        { kind: "ledger", x: 170, y: 78 },
        { kind: "folder", x: 60, y: 185, text: "持分" },
        { kind: "mail", x: 170, y: 185 },
      ],
      labels: [
        { x: 60, y: 122, text: "自己資金" },
        { x: 170, y: 122, text: "借入", tone: "blue" },
        { x: 60, y: 232, text: "出資" },
        { x: 170, y: 232, text: "補助金", tone: "red" },
      ],
    },
    {
      at: 3,
      caption: "補助金は後払い。7月に45万円を立て替えて使い、報告と検査のあとの12月に、補助率の分の30万円が入る。",
      alt: "7月と12月のカレンダー、領収書、硬貨の山を前に、大学生が立て替えの大きさに汗をかいている。",
      art: { bg: "class", cast: [{ who: "ミオ", look: "girl", x: 282, face: "sweat", fx: "sweat" }] },
      extras: [
        { kind: "calendar", x: 70, y: 80, text: "7月" },
        { kind: "calendar", x: 185, y: 80, text: "12月" },
        { kind: "receipt", x: 70, y: 200 },
        { kind: "coins", x: 185, y: 215 },
      ],
      labels: [
        { x: 70, y: 130, text: "先に45万円", tone: "red" },
        { x: 185, y: 130, text: "あとで30万円", tone: "blue" },
        { x: 70, y: 252, text: "立て替え" },
        { x: 185, y: 252, text: "補助金" },
      ],
    },
];
