import type { Scene } from "../types";

// 場面イラスト（オリジナル）：den/mikimoto-kokichi。at は節の番号（0から）。
// 実在の人物は描かない。架空の生徒が、列伝の内容を確かめている場面。
export const SC_DEN_MIKIMOTO_KOKICHI: Scene[] = [
    {
      at: 1,
      caption: "貝に手を加えてから真珠がとれるまで、今の養殖でも1〜2年かかる。試してから結果がわかるまでが長い実験は、何をしたかを書き残しながら待つことになる。",
      alt: "教室で、生徒が机の上の貝を虫めがねで見ている。上には1〜2年と書いたカレンダーと実験の記録の帳面がある。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 275, face: "think", fx: "?" }], props: [{ kind: "table", x: 0, y: 236 }, { kind: "shell", x: 80, y: 222 }, { kind: "loupe", x: 160, y: 214 }] },
      extras: [
        { kind: "calendar", x: 70, y: 80, s: 1.1, text: "1〜2年" },
        { kind: "ledger", x: 175, y: 80, s: 1, text: "実験の記録" },
      ],
      labels: [{ x: 110, y: 160, text: "結果はすぐ出ない", tone: "red" }],
    },
    {
      at: 2,
      caption: "貝を2か所で育てていたので、1892年の赤潮で英虞湾の貝の大半を失っても、相島の貝が残った。置き場所を分けておくことは、事故への備えになる。",
      alt: "海辺で、2つの貝の育て場の絵が並び、左には赤いばつ、右には丸の印がついている。生徒がそれを見て驚いている。",
      art: { bg: "outdoor", cast: [{ who: "アオ", look: "boy", x: 285, face: "surprise", fx: "!" }], props: [{ kind: "shell", x: 70, y: 230 }, { kind: "shell", x: 180, y: 230 }] },
      extras: [
        { kind: "cross", x: 70, y: 150 },
        { kind: "check", x: 180, y: 150 },
      ],
      labels: [
        { x: 70, y: 40, text: "英虞湾", tone: "red" },
        { x: 70, y: 70, text: "赤潮で大半が死ぬ", tone: "red" },
        { x: 190, y: 40, text: "相島", tone: "blue" },
        { x: 190, y: 100, text: "少し残る", tone: "blue" },
      ],
    },
];
