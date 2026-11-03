import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z7-02。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z7_02: Scene[] = [
    {
      at: 1,
      caption: "公民館の掲示板に並んだ2枚の案内。値段から始まる案内はほかの教室と比べられ、困りごとから始まる案内は「自分のことだ」と読まれる。",
      alt: "掲示板に「500円」と「孫の写真」と書かれた2枚のチラシが並び、年配の人が見比べて考えている。",
      art: { bg: "plain", cast: [{ who: "お年寄り", look: "teacher", x: 280, face: "think", fx: "?" }] },
      extras: [
        { kind: "flyer", x: 70, y: 100, s: 1.2, text: "500円" },
        { kind: "flyer", x: 175, y: 100, s: 1.2, text: "孫の写真" },
        { kind: "scale", x: 70, y: 232 },
        { kind: "check", x: 175, y: 232 },
      ],
      labels: [
        { x: 70, y: 172, text: "値段で比べる", tone: "red" },
        { x: 175, y: 172, text: "自分のことだ", tone: "blue" },
      ],
    },
    {
      at: 3,
      caption: "Why・How・Whatを1枚ずつふせんに書き、Whyの困りごとを解くと言えない一言（機能を20個紹介）には印を付けて削る。",
      alt: "机に向かう高校生が、Why・How・Whatと書いたふせんを見て、ひらめいた顔をしている。手前に丸と罰の印がある。",
      art: { bg: "class", cast: [{ who: "ユウト", look: "boy", x: 270, face: "think", fx: "idea" }], props: [{ kind: "table", x: 0, y: 240 }] },
      extras: [
        { kind: "sticky", x: 105, y: 78, s: 1.4 },
        { kind: "check", x: 60, y: 160 },
        { kind: "cross", x: 160, y: 160 },
      ],
      labels: [
        { x: 60, y: 30, text: "Why", tone: "red" },
        { x: 106, y: 30, text: "How", tone: "blue" },
        { x: 156, y: 30, text: "What" },
        { x: 60, y: 200, text: "3回練習", tone: "blue" },
        { x: 168, y: 200, text: "機能20個", tone: "red" },
      ],
    },
];
