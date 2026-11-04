import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z7-11。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z7_11: Scene[] = [
    {
      at: 1,
      caption: "AIに読ませるのは、事業のフォルダ1つだけ。事業の数字や業務カードは入れ、家庭の情報・人の名前・パスワードは入れない。",
      alt: "左に「体験会」と書いたフォルダとチェックの印、真ん中に「家庭の情報」と書いた帳面とバツ印。右で高校生がうなずいている。",
      art: { bg: "plain", cast: [{ who: "アオ", look: "boy", x: 280, face: "smile" }] },
      extras: [
        { kind: "folder", x: 70, y: 120, s: 1, text: "体験会" },
        { kind: "check", x: 70, y: 40 },
        { kind: "ledger", x: 170, y: 120, s: 0.9, text: "家庭の情報" },
        { kind: "cross", x: 170, y: 40 },
      ],
      labels: [
        { x: 70, y: 225, text: "読ませる", tone: "blue" },
        { x: 170, y: 225, text: "入れない", tone: "red" },
      ],
    },
    {
      at: 4,
      caption: "検収で直した理由を指示書の決まりに足すと、手直し率は45%、25%、12.5%と下がっていく（説明のための例）。AIは同じで、変わったのは指示書と資料。",
      alt: "下がっていくグラフと、決まりを書き足したふせん。右で高校生が笑顔でいる。",
      art: { bg: "class", cast: [{ who: "リク", look: "boy", x: 280, face: "smile", fx: "!" }] },
      extras: [
        { kind: "chartDown", x: 90, y: 115, s: 1.1, text: "手直し率" },
        { kind: "sticky", x: 185, y: 70, s: 1, text: "決まり+3" },
      ],
      labels: [
        { x: 90, y: 210, text: "45%から12.5%", tone: "blue" },
        { x: 185, y: 112, text: "直した理由" },
      ],
    },
];
