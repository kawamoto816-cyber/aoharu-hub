import type { Lecture } from "../types";

export const H_SCI_CHEMB_SAN: Lecture = {
  unit: "h-sci-chemb-san",
  title: "酸は H⁺ を出す、塩基は H⁺ を受けとる。強さは「電離のしやすさ」",
  hook: "レモンや酢がすっぱいのも、胃液が食べ物を分解できるのも、水溶液中の水素イオン H⁺ のはたらきです。せっけん水がぬるぬるするのは、その反対の性質をもつ塩基のためです。酸と塩基を H⁺ のやりとりで見ると、中和や pH の計算までひと続きで理解できます。",
  sections: [
    {
      heading: "酸と塩基の2つの定義",
      body: "{{アレニウスの定義}}では、水にとけて H⁺ を出す物質が酸、OH⁻ を出す物質が塩基です。もっと広い{{ブレンステッド・ローリーの定義}}では、H⁺ を与える物質が酸、H⁺ を受けとる物質が塩基です。水溶液中の H⁺ は、実際には水分子と結びついた{{オキソニウムイオン H₃O⁺}}として存在します。",
      figure: {
        type: "compare",
        title: "酸と塩基のくらべ",
        columns: [{ title: "酸", tone: "red" }, { title: "塩基", tone: "blue" }],
        rows: [
          { label: "アレニウス", cells: ["水中で H⁺ を出す", "水中で OH⁻ を出す"] },
          { label: "ブレンステッド", cells: ["H⁺ を与える", "H⁺ を受けとる"] },
          { label: "リトマス紙", cells: ["青 → 赤", "赤 → 青"] },
          { label: "例", cells: ["HCl・H₂SO₄・CH₃COOH", "NaOH・Ca(OH)₂・NH₃"] },
        ],
      },
    },
    {
      heading: "H⁺ のやりとりで見る",
      body: "塩化水素が水にとけると、HCl が水に H⁺ を与えるので {{HCl は酸、H₂O は塩基}}としてはたらきます。アンモニアは OH⁻ をもちませんが、水から H⁺ を受けとって OH⁻ を生じるので塩基です。このとき {{H₂O は酸}}としてはたらきます。水は相手によって酸にも塩基にもなります。",
      figure: {
        type: "formula",
        title: "水は相手しだいで酸にも塩基にもなる",
        steps: [
          { label: "塩化水素", expr: "HCl ＋ H₂O → {{H₃O⁺}} ＋ Cl⁻", note: "HCl が H⁺ を与える（HCl が酸、H₂O が塩基）" },
          { label: "アンモニア", expr: "NH₃ ＋ H₂O ⇄ {{NH₄⁺}} ＋ OH⁻", note: "NH₃ が H⁺ を受けとる（H₂O が酸、NH₃ が塩基）" },
        ],
      },
    },
    {
      heading: "価数と強弱は別のもの",
      body: "酸1分子が出せる H⁺ の数を{{酸の価数}}、塩基が受けとれる H⁺ の数（出せる OH⁻ の数）を{{塩基の価数}}といいます。強弱は価数ではなく、水中で電離する割合（{{電離度 α}}）で決まります。ほぼ完全に電離するものが強酸・強塩基、一部しか電離しないものが弱酸・弱塩基です。たとえば酢酸 CH₃COOH は H を4個もちますが、1価の弱酸です。",
      figure: {
        type: "tree",
        title: "おもな酸と塩基（電離度による分類）",
        root: {
          label: "酸・塩基",
          sub: "強弱は電離度で決まる",
          tone: "navy",
          children: [
            { label: "強酸", sub: "HCl・HNO₃・H₂SO₄", tone: "red" },
            { label: "弱酸", sub: "CH₃COOH・H₂CO₃", tone: "yellow" },
            { label: "強塩基", sub: "NaOH・Ca(OH)₂", tone: "blue" },
            { label: "弱塩基", sub: "NH₃・Cu(OH)₂", tone: "plain" },
          ],
        },
        note: "価数の例：HCl・CH₃COOH・NaOH・NH₃ は1価、H₂SO₄・Ca(OH)₂ は2価。",
      },
    },
    {
      heading: "pH は H⁺ の濃さを表す目もり",
      body: "水溶液の酸性・塩基性の強さは、水素イオン濃度 [H⁺] で表します。[H⁺]＝1.0×10⁻ⁿ mol/L のとき {{pH＝n}} です。25℃ では pH7 が中性、7より小さいと酸性、大きいと塩基性です。{{pH が1小さいと [H⁺] は10倍}}になります。1価の酸では [H⁺]＝濃度×電離度 で、0.010 mol/L の塩酸は pH2、電離度0.010の 0.10 mol/L 酢酸は pH3 です。",
      figure: {
        type: "numberline",
        title: "pH の目もり（25℃）",
        min: 0,
        max: 14,
        tick: 1,
        labelEvery: 1,
        ranges: [
          { from: 0, to: 7, label: "酸性", openTo: true, tone: "red" },
          { from: 7, to: 14, label: "塩基性", openFrom: true, tone: "blue" },
        ],
        points: [{ x: 7, label: "中性", tone: "yellow" }],
        note: "酸を水でうすめても pH は7に近づくだけで、7をこえて塩基性にはならない。",
      },
    },
  ],
  mistakes: [
    { wrong: "H₂SO₄ は2価だから、HCl より強い酸", right: "価数と強弱は無関係。強弱は電離度で決まる", why: "価数は出せる H⁺ の数、強弱は電離する割合です。リン酸 H₃PO₄ は3価ですが弱い酸です。" },
    { wrong: "0.10 mol/L の酢酸の [H⁺] は 0.10 mol/L", right: "[H⁺]＝濃度×電離度。α＝0.010 なら 1.0×10⁻³ mol/L", why: "弱酸は一部しか電離しないので、電離度をかける必要があります。" },
    { wrong: "OH をもたない NH₃ は塩基ではない", right: "NH₃ は水から H⁺ を受けとって OH⁻ を生じる塩基", why: "NH₃＋H₂O ⇄ NH₄⁺＋OH⁻。分子の中に OH がなくても塩基になります。" },
    { wrong: "pH3 の塩酸を水で1000倍にうすめると pH6、さらに10倍で pH7、もっとうすめると塩基性", right: "うすめても pH は7に近づくだけで、7をこえない", why: "水そのものも電離して H⁺ を出すので、酸の水溶液が塩基性になることはありません。" },
  ],
  check: [
    { q: "0.010 mol/L の塩酸の pH は？（HCl は完全に電離する）", a: "2", why: "[H⁺]＝0.010＝1.0×10⁻² mol/L なので pH＝2。" },
    { q: "0.10 mol/L の酢酸（電離度 0.010）の pH は？", a: "3", why: "[H⁺]＝0.10×0.010＝1.0×10⁻³ mol/L なので pH＝3。" },
    { q: "NH₃＋H₂O ⇄ NH₄⁺＋OH⁻ で、ブレンステッドの定義で酸としてはたらいているのは？", a: "H₂O", why: "H₂O が NH₃ に H⁺ を与えているので、H₂O が酸。" },
  ],
  next: [
    { label: "用語カード「酸と塩基」で覚える", href: "/learn/ko-rika#h-sci-chemb-san" },
    { label: "つぎの単元「中和反応と塩」", href: "/learn/rika-keisan/h-sci-chemb-chuwa" },
    { label: "中学のふりかえり「水溶液とイオン」", href: "/learn/chu-rika#j-sci-3-ion" },
  ],
};
