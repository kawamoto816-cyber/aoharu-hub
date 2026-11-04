import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z5-12。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z5_12: Scene[] = [
    {
      at: 2,
      caption: "全国の高校生の数は、文部科学省の学校基本調査で確かめる。令和7年度（2025年5月1日現在）の高等学校（全日制・定時制）の在学者は、確定値で287万3,619人。資料の名前・年・表・URLを出典に書く。",
      alt: "高校生が、統計のページを映したノートパソコンと、表の入ったフォルダを見ながら、ノートに出典を書いている。",
      art: { bg: "plain", cast: [{ who: "アオ", look: "boy", x: 285, face: "think" }] },
      extras: [
        { kind: "laptop", x: 80, y: 80, s: 1.1, text: "e-Stat" },
        { kind: "folder", x: 190, y: 80, s: 0.9, text: "統計表" },
      ],
      labels: [
        { x: 120, y: 140, text: "287万3,619人", tone: "blue" },
        { x: 120, y: 175, text: "令和7年度" },
        { x: 120, y: 210, text: "5月1日現在" },
        { x: 120, y: 245, text: "確定値" },
      ],
    },
    {
      at: 3,
      caption: "SOMは「全体の1%」ではなく、体験会の数から積み上げる。月2回の体験会に10人ずつ、入会は2割で月4人。12倍して1年で48人。",
      alt: "貸し会議室の前で、高校生2人がカレンダーと伸びるグラフを見ながら、1か月の獲得人数を数えている。",
      art: {
        bg: "class",
        cast: [
          { who: "ハル", look: "girl", x: 270, face: "smile" },
          { who: "アオ", look: "boy", x: 80, face: "normal" },
        ],
      },
      extras: [
        { kind: "calendar", x: 175, y: 42, s: 0.8, text: "体験会" },
        { kind: "chartUp", x: 175, y: 118, s: 0.8, text: "入会" },
      ],
      labels: [
        { x: 80, y: 30, text: "月20人", tone: "blue" },
        { x: 270, y: 30, text: "入会2割" },
        { x: 175, y: 165, text: "月4人", tone: "blue" },
        { x: 175, y: 250, text: "1年で48人", tone: "red" },
      ],
    },
];
