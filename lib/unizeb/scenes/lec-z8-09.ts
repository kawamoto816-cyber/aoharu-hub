import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z8-09。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z8_09: Scene[] = [
    {
      at: 1,
      caption: "これまでの3,000円に、これからの見込み月2,000円×残り2か月を足すと、着地見込みは7,000円。予算6,000円を1,000円超えるとわかる。",
      alt: "高校生が、これまでの支出を書いた帳面と、上がっていくグラフを見て考えこんでいる。",
      art: { bg: "plain", cast: [{ who: "ミオ", look: "girl", x: 270, face: "think", fx: "?" }] },
      extras: [
        { kind: "ledger", x: 75, y: 75, s: 1.1, text: "3,000円" },
        { kind: "chartUp", x: 175, y: 80, s: 1.1, text: "7,000円" },
      ],
      labels: [
        { x: 75, y: 140, text: "これまで", tone: "navy" },
        { x: 175, y: 140, text: "着地見込み", tone: "red" },
        { x: 120, y: 200, text: "予算6,000円", tone: "blue" },
        { x: 120, y: 240, text: "1,000円超える", tone: "red" },
      ],
    },
    {
      at: 4,
      caption: "ライトに払った800円は、作っても作らなくても戻らない（埋没費用）。決めるのは、これから払う1,000円と売れる見込みだけ。",
      alt: "2人の高校生が、レシートと天秤を見ながら、材料を買い足すかどうかを話し合っている。",
      art: { bg: "class", cast: [{ who: "アオ", look: "boy", x: 70, face: "think" }, { who: "ミオ", look: "girl", x: 270, face: "normal", flip: true }] },
      extras: [
        { kind: "scale", x: 170, y: 70, s: 1.1 },
        { kind: "receipt", x: 170, y: 190 },
      ],
      labels: [
        { x: 170, y: 130, text: "これからで比べる", tone: "blue" },
        { x: 170, y: 255, text: "800円は戻らない", tone: "red" },
      ],
    },
];
