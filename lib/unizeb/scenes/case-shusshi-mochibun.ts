import type { Scene } from "../types";

// 場面イラスト（オリジナル）：case/shusshi-mochibun。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
// 出資の当事者は18歳以上の大学生が作った会社と大人の事業者。お金の受け渡しの場面は描かない。
export const SC_CASE_SHUSSHI_MOCHIBUN: Scene[] = [
  {
    at: 0,
    caption: "100万円の出資と引きかえに、持分30%と、大事なことすべてへの拒否権。大学生の2人は、返事を待ってもらって数字を検算することにした。",
    alt: "大学生2人が、条件の書かれたファイルとノートパソコンの数字を見ながら考えこんでいる。",
    art: {
      bg: "plain",
      cast: [
        { who: "アオ", look: "boy", x: 215, face: "think", fx: "?" },
        { who: "ミオ", look: "girl", x: 298, face: "normal", flip: true },
      ],
    },
    extras: [
      { kind: "folder", x: 85, y: 55, text: "条件" },
      { kind: "laptop", x: 85, y: 150, text: "持分30%" },
    ],
    labels: [{ x: 85, y: 205, text: "出資100万円", tone: "red" }],
  },
  {
    at: 1,
    caption: "持分表で次の資金調達のあとまで計算し、持分20%、拒否権は解散と事業の売却だけ、という条件で合意した。2人の持分は3分の2を保てる。",
    alt: "大学生と地元の会社の担当者が、持分表と天びんの絵を前に、笑顔でうなずき合っている。",
    art: {
      bg: "plain",
      cast: [
        { who: "ミオ", look: "girl", x: 60, face: "smile" },
        { who: "担当者", look: "teacher", x: 280, face: "smile", flip: true },
      ],
    },
    extras: [
      { kind: "ledger", x: 85, y: 55, text: "持分表" },
      { kind: "scale", x: 250, y: 55 },
      { kind: "check", x: 170, y: 235, s: 0.8 },
    ],
    labels: [
      { x: 170, y: 150, text: "持分20%で合意", tone: "blue" },
      { x: 170, y: 195, text: "拒否権は2つだけ", tone: "red" },
    ],
  },
];
