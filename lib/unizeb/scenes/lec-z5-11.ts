import type { Scene } from "../types";

// 場面イラスト（オリジナル）：lec/z5-11。at は節の番号（0から。ケースは 0＝状況・1＝結果）。
export const SC_LEC_Z5_11: Scene[] = [
    {
      at: 0,
      caption: "これまでに承認した業務カード10枚を、目的の近いものどうしで4つの仕事のまとまりに束ねる。束ねたまとまりと決まりを指示書に書くと、部門AI v1になる。",
      alt: "高校生が、10枚のふせんを4つのフォルダに分けて、どのまとまりに入れるかを考えている。",
      art: { bg: "plain", cast: [{ who: "ハル", look: "girl", x: 285, face: "think", fx: "idea" }] },
      extras: [
        { kind: "sticky", x: 120, y: 40, s: 1.1, text: "カード10" },
        { kind: "folder", x: 60, y: 130, s: 0.9, text: "相手" },
        { kind: "folder", x: 170, y: 130, s: 0.9, text: "市場" },
        { kind: "folder", x: 60, y: 215, s: 0.9, text: "数" },
        { kind: "folder", x: 170, y: 215, s: 0.9, text: "声かけ" },
      ],
      labels: [
        { x: 120, y: 88, text: "4つに束ねる", tone: "blue" },
      ],
    },
    {
      at: 3,
      caption: "レポートの主張を1件ずつ、出典を自分で開いて確かめる。市の統計と合えば合格、ちがえば数を直して手直し、出典が見つからなければ未確認として根拠から外す。",
      alt: "高校生が、ノートパソコンのAIのレポートと、統計の表が入ったフォルダを見比べ、主張ごとに印をつけている。",
      art: { bg: "class", cast: [{ who: "ハル", look: "girl", x: 285, face: "normal", fx: "!" }] },
      extras: [
        { kind: "laptop", x: 75, y: 75, s: 1.0, text: "レポート" },
        { kind: "folder", x: 185, y: 75, s: 0.9, text: "市の統計" },
      ],
      labels: [
        { x: 105, y: 140, text: "主張1 手直し", tone: "blue" },
        { x: 105, y: 175, text: "主張2 合格" },
        { x: 105, y: 210, text: "主張3 未確認", tone: "red" },
        { x: 105, y: 245, text: "聞き直しはだめ", tone: "red" },
      ],
    },
];
