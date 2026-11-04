import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z7-10。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z7_10: Scene[] = [
    {
      at: 2,
      caption: "「エラーです」だけでは、どこを直せばよいかわからない。「参加する日が選ばれていません。第1土曜か第3土曜を選んでください」のように、原因と直し方を1文ずつ書く。",
      alt: "左のパソコン画面に「エラーです」とバツ印、真ん中のパソコン画面に「日を選んで」とチェックの印。右で高校生がひらめいた顔をしている。",
      art: { bg: "plain", cast: [{ who: "ハル", look: "girl", x: 280, face: "smile", fx: "idea" }] },
      extras: [
        { kind: "laptop", x: 70, y: 125, s: 1, text: "エラーです" },
        { kind: "cross", x: 70, y: 40 },
        { kind: "laptop", x: 175, y: 125, s: 1, text: "日を選んで" },
        { kind: "check", x: 175, y: 40 },
      ],
      labels: [
        { x: 70, y: 225, text: "どこを直す？", tone: "red" },
        { x: 175, y: 225, text: "原因と直し方", tone: "blue" },
      ],
    },
    {
      at: 4,
      caption: "席が空いているのに「残りわずか！」とあせらせるのはダークパターン。正直に「定員20人（残り17席）」と書き、取り消しの案内も申込みと同じ大きさで出す。",
      alt: "左にメガホンと「残りわずか」の文字にバツ印、真ん中に「残り17席」と書いたチラシにチェックの印。右で高校生が考えている。",
      art: { bg: "class", cast: [{ who: "アオ", look: "boy", x: 280, face: "think" }] },
      extras: [
        { kind: "megaphone", x: 70, y: 120, s: 1, text: "残りわずか" },
        { kind: "cross", x: 70, y: 40 },
        { kind: "flyer", x: 170, y: 120, s: 1, text: "残り17席" },
        { kind: "check", x: 170, y: 40 },
      ],
      labels: [
        { x: 70, y: 225, text: "あせらせない", tone: "red" },
        { x: 170, y: 225, text: "正直な言葉", tone: "blue" },
      ],
    },
];
