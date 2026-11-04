import type { Scene } from "../types";

// 場面イラスト（オリジナル）：den/komazaki-hiroki。at は節の番号（0から）。
// 実在の人物・団体のロゴは描かない。共済型のしくみを、架空の高校生の部活の積み立てにたとえて描く。
export const SC_DEN_KOMAZAKI_HIROKI: Scene[] = [
    {
      at: 2,
      caption: "会員が毎月少しずつ出し合って積み立てておけば、依頼が一度に重なる時期にも応えられる。共済型の考え方を、部活の備品のための積み立てにたとえた絵（お金は先生が預かる。人物は架空）。",
      alt: "教室で、先生が貯金箱を預かり、そのそばで高校生がカレンダーを見て考えている。カレンダーには、はやる時期の印がある。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 180, face: "think" }, { who: "先生", look: "teacher", x: 280, face: "smile", flip: true }] },
      extras: [
        { kind: "calendar", x: 62, y: 70, s: 0.9, text: "はやる時期" },
        { kind: "piggy", x: 62, y: 175, s: 1.0, text: "積み立て" },
        { kind: "coins", x: 62, y: 245, s: 0.8 },
      ],
      labels: [
        { x: 175, y: 36, text: "毎月少しずつ出す", tone: "navy" },
        { x: 62, y: 128, text: "重なる時に使う", tone: "red" },
      ],
    },
];
