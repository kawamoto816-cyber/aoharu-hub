import type { Scene } from "../types";

// 場面イラスト（オリジナル）：den/madam-cj-walker。at は節の番号（0から）。
// 実在の人物・会社のロゴ・商品は描かない。列伝の考え方を、架空の高校生と先生の場面に置きかえて描く。
export const SC_DEN_MADAM_CJ_WALKER: Scene[] = [
    {
      at: 1,
      caption: "困りごとは、目に見える症状と、その奥の原因に分けて考える。ウォーカーの時代には、抜け毛の奥に、髪をめったに洗わず頭皮が傷むという原因があったと説明されている。",
      alt: "高校生が虫めがねを持って考えている。左に症状、矢印の先に原因と書いたふせんがある。",
      art: { bg: "class", cast: [{ who: "ミオ", look: "girl", x: 285, face: "think", fx: "idea", flip: true }], props: [{ kind: "arrow", x: 128, y: 120, s: 0.8 }, { kind: "loupe", x: 150, y: 225, s: 1.0 }] },
      extras: [
        { kind: "sticky", x: 65, y: 120, text: "症状" },
        { kind: "sticky", x: 195, y: 120, text: "原因" },
      ],
      labels: [
        { x: 65, y: 70, text: "見えている悩み", tone: "red" },
        { x: 195, y: 70, text: "奥にある原因", tone: "blue" },
      ],
    },
    {
      at: 2,
      caption: "自分のやり方を決まった手順にまとめて教えると、自分がいない場所でも同じやり方が広がる。ウォーカーは学校や通信講座で、手入れの方法を販売員に教えた。",
      alt: "教室で、先生が手順のファイルを見せ、高校生がうなずいて聞いている。あいだに手順の順番を書いたふせんがある。",
      art: { bg: "class", cast: [{ who: "アオ", look: "boy", x: 60, face: "smile" }, { who: "先生", look: "teacher", x: 282, face: "smile", flip: true }] },
      extras: [
        { kind: "folder", x: 170, y: 60, s: 1.0, text: "手入れ手順" },
        { kind: "sticky", x: 150, y: 200, text: "1 洗う" },
        { kind: "sticky", x: 192, y: 250, text: "2 整える" },
      ],
      labels: [
        { x: 170, y: 130, text: "手順にまとめて教える", tone: "navy" },
      ],
    },
];
