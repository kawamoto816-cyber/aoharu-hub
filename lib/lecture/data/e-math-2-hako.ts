import type { Lecture } from "../types";

export const E_MATH_2_HAKO: Lecture = {
  unit: "e-math-2-hako",
  title: "はこの形は「めん・へん・頂点《ちょうてん》」で見る",
  hook: "おかしのはこや、さいころ。どれも「はこの形」です。めん・へん・頂点《ちょうてん》の数を見てみましょう。どのはこにも同じひみつがあります。",
  sections: [
    {
      heading: "はこの形の3つのところ",
      body: "たいらなところを{{めん}}といいます。めんのまわりの線が{{へん}}です。へんが3本あつまるかどが{{頂点《ちょうてん》}}です。",
      figure: {
        type: "tree",
        title: "はこの形を3つに分けて見る",
        root: {
          label: "はこの形",
          tone: "navy",
          children: [
            { label: "めん", sub: "たいらなところ", tone: "blue" },
            { label: "へん", sub: "まっすぐな線", tone: "yellow" },
            { label: "頂点《ちょうてん》", sub: "とがったかど", tone: "red" },
          ],
        },
      },
    },
    {
      heading: "数をかぞえてみよう",
      body: "めんは{{6つ}}、へんは{{12本}}、頂点《ちょうてん》は{{8つ}}です。うらや下もわすれずに数えます。どのはこの形でも、この数は同じです。",
      figure: {
        type: "compare",
        title: "はこの形の数",
        columns: [
          { title: "めん", tone: "blue" },
          { title: "へん", tone: "yellow" },
          { title: "頂点《ちょうてん》", tone: "red" },
        ],
        rows: [
          { cells: ["6つ", "12本", "8つ"] },
          { cells: ["上下・前うしろ・左右", "同じ長さが4本ずつ", "上に4つ・下に4つ"] },
        ],
      },
    },
    {
      heading: "めんの形をしらべる",
      body: "めんを紙にうつすと、{{長方形}}や{{正方形}}になります。むかい合うめんは、同じ形で同じ大きさです。さいころの形は、6つのめんがぜんぶ正方形です。",
      figure: {
        type: "compare",
        title: "はことさいころをくらべる",
        columns: [{ title: "はこ", tone: "blue" }, { title: "さいころの形", tone: "yellow" }],
        rows: [
          { label: "めんの形", cells: ["長方形（正方形も）", "ぜんぶ正方形"] },
          { label: "同じめん", cells: ["2つずつ3組", "6つぜんぶ"] },
          { label: "へんの長さ", cells: ["4本ずつ3つの長さ", "12本ぜんぶ同じ"] },
        ],
      },
    },
    {
      heading: "ひごと粘土玉《ねんどだま》で作る",
      body: "へんはひご、頂点《ちょうてん》は粘土玉《ねんどだま》で作れます。ひごは{{12本}}、粘土玉《ねんどだま》は{{8こ}}いります。ひごは、同じ長さを4本ずつよういします。",
      figure: {
        type: "flow",
        title: "はこの形を作る",
        steps: [
          { label: "粘土玉《ねんどだま》 8こ", sub: "頂点《ちょうてん》になる", tone: "red" },
          { label: "ひご 12本", sub: "へんになる", tone: "yellow" },
          { label: "はこの形", sub: "めんは6つ", tone: "blue" },
        ],
        arrows: ["つなぐ", "くみ立てる"],
      },
    },
  ],
  mistakes: [
    {
      wrong: "頂点《ちょうてん》は4つ（見えるかどだけ数えた）",
      right: "頂点《ちょうてん》は8つ",
      why: "下にもかどがあります。上に4つ、下に4つです。",
    },
    {
      wrong: "めんは5つ（下のめんをわすれた）",
      right: "めんは6つ",
      why: "上下・前うしろ・左右で、6つあります。",
    },
    {
      wrong: "はこのひごは、12本ぜんぶ同じ長さ",
      right: "4本ずつ、3つの長さがいる",
      why: "むかい合うへんが同じ長さです。さいころの形だけ、ぜんぶ同じです。",
    },
  ],
  check: [
    { q: "はこの形の頂点《ちょうてん》はいくつ？", a: "8つ", why: "上に4つ、下に4つあります。" },
    { q: "さいころの形のめんは、どんな形？", a: "正方形", why: "6つのめんが、ぜんぶ同じ大きさの正方形です。" },
    { q: "はこの形を作るのに、ひごは何本いる？", a: "12本", why: "へんの数と同じです。" },
  ],
  next: [
    { label: "はこの形のドリル", href: "/learn/sansu-zukei/e-math-2-hako" },
    { label: "三角形と四角形", href: "/learn/sansu-zukei/e-math-2-sankaku-shikaku" },
    { label: "4年：直方体と立方体", href: "/learn/sansu-zukei/e-math-4-chokuhotai" },
  ],
};
