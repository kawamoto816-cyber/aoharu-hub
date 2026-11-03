import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z6-01。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z6_01: Scene[] = [
    {
      at: 0,
      caption: "PLは、ある期間（たとえば文化祭の2日間や1か月）の売上と費用と利益をまとめた成績表。",
      alt: "模擬店の屋台の前で、生徒が売上の上がるグラフを見上げている。",
      art: { bg: "outdoor", cast: [{ who: "ハル", look: "girl", x: 270, face: "smile" }] },
      extras: [
        { kind: "stall", x: 110, y: 150, s: 1, text: "模擬店" },
        { kind: "chartUp", x: 250, y: 66, s: 1, text: "期間の成績" },
      ],
      labels: [{ x: 110, y: 240, text: "売上−費用＝利益", tone: "blue" }],
    },
    {
      at: 1,
      caption: "BSは、ある1日の時点で、お金・材料・道具などの持ち物と、借りている分を並べたリスト。",
      alt: "先生と生徒が、現金・材料の箱・帳面を並べて、ある日の持ち物を確かめている。",
      art: { bg: "class", cast: [{ who: "先生", look: "teacher", x: 280, face: "normal" }, { who: "アオ", look: "boy", x: 60, face: "think" }], props: [{ kind: "table", x: 0, y: 236 }] },
      extras: [
        { kind: "cashbox", x: 130, y: 226 },
        { kind: "boxes", x: 200, y: 232, s: 0.8 },
        { kind: "ledger", x: 170, y: 80, s: 1.2, text: "ある日の持ち物" },
      ],
      labels: [{ x: 130, y: 182, text: "現金" }, { x: 206, y: 166, text: "材料" }],
    },
    {
      at: 2,
      caption: "売った日とお金が入る日はずれることがある。カレンダーに「売った日」と「入金の日」を分けて書く。",
      alt: "スマートフォンの注文画面と、入金日に印がついたカレンダー。",
      art: { bg: "plain", cast: [{ who: "ハル", look: "girl", x: 280, face: "surprise", fx: "!" }] },
      extras: [
        { kind: "phone", x: 70, y: 120, s: 1.6, text: "注文" },
        { kind: "calendar", x: 170, y: 110, s: 1.2, text: "25日" },
        { kind: "coins", x: 170, y: 220, text: "入金" },
      ],
      labels: [{ x: 90, y: 30, text: "売った日" }, { x: 190, y: 30, text: "入金の日", tone: "red" }],
    },
  
];
