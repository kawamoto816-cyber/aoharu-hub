import type { Scene } from "../types";

// 場面イラスト（オリジナル）：ep/slack-glitch。at は 0＝場面、1＝決断とその後。
// 架空の人物で場面を描く。実在の創業者・経営者、会社のロゴ・商品のデザインは描かない。
export const SC_EP_SLACK_GLITCH: Scene[] = [
  {
    at: 0,
    caption: "本命のゲームをやめることが決まった。手もとには、チームが自分たちのために作った連絡の道具が残っていた。",
    alt: "生徒が、ばつ印のついたゲームの画面と、メッセージが出ているスマートフォンを見くらべて考えている。",
    art: { bg: "plain", cast: [{ who: "ハル", look: "girl", x: 275, face: "think", fx: "?" }] },
    extras: [
      { kind: "laptop", x: 75, y: 110, s: 0.9, text: "ゲーム" },
      { kind: "cross", x: 75, y: 60, s: 0.7 },
      { kind: "phone", x: 180, y: 110, s: 0.9 },
      { kind: "speech", x: 180, y: 50, s: 0.7 },
    ],
    labels: [
      { x: 75, y: 170, text: "やめる", tone: "red" },
      { x: 180, y: 170, text: "社内の道具", tone: "blue" },
    ],
  },
];
