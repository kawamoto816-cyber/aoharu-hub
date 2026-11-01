import type { Lecture } from "../types";

export const H_SCI_CHEMB_HANNOSHIKI: Lecture = {
  unit: "h-sci-chemb-hannoshiki",
  title: "係数の比は mol の比。化学反応式は「量のレシピ」",
  hook: "ホットケーキのレシピに「粉2カップに卵1個」とあれば、粉を4カップにすると卵は2個いります。化学反応式も同じで、係数を見れば、どの物質がどれだけ反応し、どれだけできるかがわかります。ガスコンロの燃料がどれだけの酸素を使うかも、反応式から計算できます。",
  sections: [
    {
      heading: "係数は原子の数をそろえてつける",
      body: "化学反応では原子の組み合わせが変わるだけで、{{原子の種類と数は変わりません}}。そこで、左辺と右辺で各原子の数が等しくなるように{{係数}}をつけます。係数は最も簡単な整数の比にし、1は書きません。化学式の右下の小さい数字は物質そのものを表すので、変えてはいけません。",
      figure: {
        type: "formula",
        title: "プロパン C₃H₈ の燃焼の係数をつける",
        steps: [
          { expr: "C₃H₈ ＋ □O₂ → □CO₂ ＋ □H₂O", note: "いちばん複雑な C₃H₈ の係数を1とする" },
          { expr: "C₃H₈ ＋ □O₂ → {{3}}CO₂ ＋ □H₂O", note: "C が3個 → CO₂ は3" },
          { expr: "C₃H₈ ＋ □O₂ → 3CO₂ ＋ {{4}}H₂O", note: "H が8個 → H₂O は4" },
          { expr: "C₃H₈ ＋ {{5}}O₂ → 3CO₂ ＋ 4H₂O", note: "右辺の O は 3×2＋4＝10個 → O₂ は5" },
        ],
      },
    },
    {
      heading: "係数の比 ＝ 物質量の比",
      body: "化学反応式の係数は、反応する粒子の{{数の比}}、つまり{{物質量（mol）の比}}を表します。N₂＋3H₂→2NH₃ なら、N₂ 1 mol と H₂ 3 mol から NH₃ 2 mol ができます。同温・同圧の気体どうしなら{{体積の比}}も係数の比になります。ただし、質量の比は係数の比になりません。",
      figure: {
        type: "compare",
        title: "N₂ ＋ 3H₂ → 2NH₃ の量の関係",
        columns: [{ title: "N₂", tone: "blue" }, { title: "3H₂", tone: "blue" }, { title: "2NH₃", tone: "yellow" }],
        rows: [
          { cells: ["係数 1", "係数 3", "係数 2"] },
          { cells: ["1 mol", "3 mol", "2 mol"] },
          { cells: ["28 g", "6.0 g", "34 g"] },
          { cells: ["22.4 L", "67.2 L", "44.8 L"] },
        ],
        note: "上から 係数・物質量・質量・体積（標準状態）。質量は前後で 28＋6.0＝34 g と保存される。",
      },
    },
    {
      heading: "量の計算は「mol に直して係数比」",
      body: "反応式を使う計算は、いつも同じ順で進めます。与えられた質量や体積を{{まず mol に直し}}、{{係数の比}}で求めたい物質の mol を出し、最後に質量や体積にもどします。メタン CH₄（分子量16）8.0 g を燃やすと、CH₄＋2O₂→CO₂＋2H₂O より CO₂ が 22 g できます。",
      figure: {
        type: "flow",
        dir: "col",
        title: "CH₄ 8.0 g から生じる CO₂ の質量",
        steps: [
          { label: "CH₄ 8.0 g", sub: "与えられた量", tone: "plain" },
          { label: "CH₄ 0.50 mol", sub: "8.0 ÷ 16 g/mol", tone: "blue" },
          { label: "CO₂ 0.50 mol", sub: "CH₄：CO₂＝1：1", tone: "navy" },
          { label: "CO₂ 22 g", sub: "0.50×44 g/mol", tone: "yellow" },
        ],
        arrows: ["÷ モル質量", "係数の比", "× モル質量"],
      },
    },
    {
      heading: "片方が余るときは、足りないほうで決まる",
      body: "2種類の物質を混ぜても、係数の比どおりにしか反応しません。H₂ 3.0 mol と O₂ 2.0 mol なら、2H₂＋O₂→2H₂O より H₂ 3.0 mol と反応する O₂ は 1.5 mol で、{{O₂ が 0.50 mol 余ります}}。できる H₂O は、すべて反応した{{H₂（不足するほう）}}をもとに 3.0 mol と求めます。",
      figure: {
        type: "area",
        kind: "bar",
        title: "H₂ 3.0 mol と O₂ 2.0 mol を反応させる",
        bars: [
          { label: "H₂", parts: [{ value: 3.0, label: "すべて反応", tone: "blue" }], total: "3.0 mol" },
          { label: "O₂", parts: [{ value: 1.5, label: "反応", tone: "blue" }, { value: 0.5, label: "余る", tone: "red" }], total: "2.0 mol" },
          { label: "H₂O", parts: [{ value: 3.0, label: "できる", tone: "yellow" }], total: "3.0 mol" },
        ],
        scale: [{ at: 0, label: "0" }, { at: 1, label: "1" }, { at: 2, label: "2" }, { at: 3, label: "3" }],
        scaleLabel: "mol",
        note: "H₂：O₂：H₂O ＝ 2：1：2 ＝ 3.0：1.5：3.0。",
      },
    },
  ],
  mistakes: [
    { wrong: "H₂O の O をそろえるため H₂O₂ と書きかえる", right: "化学式は変えず、前の係数だけを変える", why: "H₂O₂ は過酸化水素という別の物質です。右下の数字を変えると物質が変わってしまいます。" },
    { wrong: "2H₂＋O₂→2H₂O だから、H₂ 2 g と O₂ 1 g が反応する", right: "H₂ 2 mol（4.0 g）と O₂ 1 mol（32 g）が反応する", why: "係数の比は物質量（mol）の比で、質量の比ではありません。" },
    { wrong: "余る物質の量をもとに、生成物の量を計算する", right: "すべて反応する（不足する）物質の量をもとに計算する", why: "余った分は反応していないので、生成物の量には関係しません。" },
  ],
  check: [
    { q: "2C₂H₆ ＋ a O₂ → 4CO₂ ＋ 6H₂O の係数 a は？", a: "7", why: "右辺の O 原子は 4×2＋6＝14個なので、O₂ は 14÷2＝7。" },
    { q: "マグネシウム 2.4 g を完全に燃焼させると、酸化マグネシウム MgO は何 g できますか。（Mg＝24、O＝16）", a: "4.0 g", why: "2Mg＋O₂→2MgO。Mg 0.10 mol から MgO 0.10 mol、0.10×40＝4.0 g。" },
    { q: "2CO ＋ O₂ → 2CO₂ で、CO 10 L を完全燃焼させるのに必要な O₂ は何 L ですか。（同温・同圧）", a: "5.0 L", why: "同温・同圧の気体では体積の比＝係数の比。CO：O₂＝2：1。" },
  ],
  next: [
    { label: "計算ドリル「化学反応式と量的関係」で鍛える", href: "/learn/rika-keisan/h-sci-chemb-hannoshiki" },
    { label: "ふりかえり「物質量（mol）」", href: "/learn/rika-keisan/h-sci-chemb-mol" },
    { label: "つぎの単元「酸と塩基」", href: "/learn/ko-rika#h-sci-chemb-san" },
  ],
};
