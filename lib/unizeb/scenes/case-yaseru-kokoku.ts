import type { Scene } from "../types";

// 場面イラスト（オリジナル）：case/yaseru-kokoku。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
// 実在の商品やロゴは描かない。夜の場面にしない（気づいたのは翌朝）。お金は店主が管理する設定。
export const SC_CASE_YASERU_KOKOKU: Scene[] = [
  {
    at: 0,
    caption: "確かめを待たずに出した「必ずやせる」の投稿に、1日で2万回の表示と300件の批判がついた。翌朝、先生と生徒が画面を見て青くなる。",
    alt: "朝の教室で、生徒が困った顔でスマホの通知を見ていて、となりで先生が驚いている。",
    art: {
      bg: "class",
      cast: [
        { who: "ハル", look: "girl", x: 215, face: "sweat", fx: "sweat" },
        { who: "先生", look: "teacher", x: 298, face: "surprise", flip: true },
      ],
    },
    extras: [
      { kind: "phone", x: 110, y: 80, text: "2万回" },
      { kind: "speech", x: 215, y: 45, text: "根拠は？" },
    ],
    labels: [
      { x: 95, y: 170, text: "「必ずやせる」", tone: "navy" },
      { x: 95, y: 205, text: "批判300件", tone: "red" },
    ],
  },
  {
    at: 1,
    caption: "条文と消費者庁の説明を確かめ、24時間以内に、まちがいと直し方を出した。広告の文は2人で読み、先生と店主が確かめてから公開する。",
    alt: "生徒と店主が、条文のファイルと直した文の紙を前にうなずき合っている。",
    art: {
      bg: "plain",
      cast: [
        { who: "ハル", look: "girl", x: 60, face: "normal" },
        { who: "店主", look: "teacher", x: 280, face: "smile", flip: true },
      ],
    },
    extras: [
      { kind: "folder", x: 125, y: 55, text: "条文" },
      { kind: "flyer", x: 215, y: 55, text: "直した文" },
      { kind: "check", x: 170, y: 235, s: 0.8 },
    ],
    labels: [
      { x: 170, y: 150, text: "24時間以内に説明", tone: "blue" },
      { x: 170, y: 195, text: "2人で読んでから", tone: "red" },
    ],
  },
];
