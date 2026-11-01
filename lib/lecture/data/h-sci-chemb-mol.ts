import type { Lecture } from "../types";

export const H_SCI_CHEMB_MOL: Lecture = {
  unit: "h-sci-chemb-mol",
  title: "mol は 6.0×10²³ 個のまとまり。質量も個数も体積も mol を通る",
  hook: "鉛筆を12本で「1ダース」と数えるように、化学では原子や分子を 6.0×10²³ 個で「1 mol」と数えます。粒は小さすぎて1個ずつ数えられないからです。mol を使えば、はかりで量った質量から、粒の数や気体の体積がわかります。",
  sections: [
    {
      heading: "1 mol ＝ 6.0×10²³ 個の集まり",
      body: "6.0×10²³ 個の粒子の集まりを{{1 mol（モル）}}といい、mol で表した量を{{物質量}}といいます。1 mol あたりの粒子の数 6.0×10²³/mol を{{アボガドロ定数}}といいます。水分子でも鉄原子でも、1 mol にふくまれる粒子の数は同じです。",
      figure: {
        type: "compare",
        title: "1 mol の物質の例",
        columns: [{ title: "物質" }, { title: "粒子の数", tone: "blue" }, { title: "質量", tone: "yellow" }],
        rows: [
          { cells: ["H₂O（分子量18）", "6.0×10²³個", "18 g"] },
          { cells: ["CO₂（分子量44）", "6.0×10²³個", "44 g"] },
          { cells: ["Fe（原子量56）", "6.0×10²³個", "56 g"] },
          { cells: ["NaCl（式量58.5）", "Na⁺・Cl⁻ 各6.0×10²³個", "58.5 g"] },
        ],
        note: "原子量・分子量・式量に g をつけた値が 1 mol の質量（モル質量 g/mol）になる。",
      },
    },
    {
      heading: "換算の中心は、いつも mol",
      body: "質量と個数、質量と体積を直接むすぶ式は覚えなくてかまいません。{{まず mol に直し}}、そこから求めたい量へ進みます。質量はモル質量〔g/mol〕、個数はアボガドロ定数、気体の体積は{{標準状態（0℃、1.013×10⁵Pa）で 22.4 L/mol}} を使います。",
      figure: {
        type: "tree",
        title: "物質量 n〔mol〕から3つの量へ",
        root: {
          label: "物質量 n〔mol〕",
          sub: "ここを通って行き来する",
          tone: "navy",
          children: [
            { label: "質量〔g〕", sub: "n × モル質量", tone: "yellow" },
            { label: "粒子の数", sub: "n × 6.0×10²³", tone: "blue" },
            { label: "気体の体積〔L〕", sub: "n × 22.4（標準状態）", tone: "plain" },
          ],
        },
        note: "逆向き（mol を求める）は、それぞれでわる。",
      },
    },
    {
      heading: "質量から個数を求める",
      body: "9.0 g の水にふくまれる水分子の数を求めます。まず水のモル質量 18 g/mol でわって{{物質量}}を出し、それにアボガドロ定数をかけます。単位をつけたまま計算すると、どこでわり、どこでかけるかをまちがえにくくなります。",
      figure: {
        type: "formula",
        title: "9.0 g の水 H₂O の分子の数",
        steps: [
          { expr: "n ＝ 9.0 g ÷ 18 g/mol ＝ {{0.50 mol}}", note: "質量 → mol" },
          { expr: "0.50 mol × 6.0×10²³/mol ＝ {{3.0×10²³ 個}}", note: "mol → 個数" },
        ],
      },
    },
    {
      heading: "気体の体積から質量を求める",
      body: "標準状態の気体は、種類によらず 1 mol が{{22.4 L}}をしめます。11.2 L の二酸化炭素なら 0.50 mol で、質量は 0.50×44＝22 g です。22.4 L/mol が使えるのは{{標準状態の気体}}だけで、液体や固体には使えません。",
      figure: {
        type: "formula",
        title: "標準状態で 11.2 L の CO₂ の質量",
        steps: [
          { expr: "n ＝ 11.2 L ÷ 22.4 L/mol ＝ {{0.50 mol}}", note: "体積 → mol" },
          { expr: "0.50 mol × 44 g/mol ＝ {{22 g}}", note: "mol → 質量" },
        ],
      },
    },
    {
      heading: "モル濃度：溶液 1 L にとけている mol",
      body: "溶液 1 L 中にとけている溶質の物質量を{{モル濃度〔mol/L〕}}といいます。水酸化ナトリウム NaOH（式量40）4.0 g を水にとかして{{溶液全体を 500 mL}} にすると、0.10 mol ÷ 0.500 L ＝ 0.20 mol/L です。mL は L に直してからわります。",
      figure: {
        type: "formula",
        title: "NaOH 4.0 g をとかした 500 mL の溶液のモル濃度",
        steps: [
          { expr: "n ＝ 4.0 g ÷ 40 g/mol ＝ {{0.10 mol}}", note: "溶質の物質量" },
          { expr: "500 mL ＝ {{0.500 L}}", note: "体積を L に直す" },
          { expr: "0.10 mol ÷ 0.500 L ＝ {{0.20 mol/L}}", note: "溶質の mol ÷ 溶液の L" },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "水 1 mol は 18 個の分子", right: "水 1 mol は 6.0×10²³ 個の分子で、質量が 18 g", why: "18 は分子量で、1 mol の質量 18 g を表します。個数はどの物質でも 6.0×10²³ 個です。" },
    { wrong: "水 18 g の体積は 22.4 L", right: "22.4 L/mol は標準状態の気体だけに使う", why: "液体の水 18 g は約 18 mL です。気体どうしなら種類によらず 1 mol が 22.4 L になります。" },
    { wrong: "水 1 L に溶質 0.20 mol をとかすと 0.20 mol/L", right: "溶液全体を 1 L にしたとき 0.20 mol/L", why: "モル濃度は溶液の体積でわります。水 1 L にとかすと、溶液は 1 L からずれます。" },
  ],
  check: [
    { q: "二酸化炭素 CO₂（分子量44）0.25 mol の質量は何 g ですか。", a: "11 g", why: "0.25 mol × 44 g/mol ＝ 11 g。" },
    { q: "酸素分子 3.0×10²³ 個は何 mol ですか。", a: "0.50 mol", why: "3.0×10²³ ÷ 6.0×10²³/mol ＝ 0.50 mol。" },
    { q: "0.20 mol/L の塩化ナトリウム水溶液 250 mL にふくまれる NaCl は何 mol ですか。", a: "0.050 mol", why: "0.20 mol/L × 0.250 L ＝ 0.050 mol。" },
  ],
  next: [
    { label: "計算ドリル「物質量（mol）」で練習する", href: "/learn/rika-keisan/h-sci-chemb-mol" },
    { label: "つぎの単元「化学反応式と量的関係」", href: "/learn/rika-keisan/h-sci-chemb-hannoshiki" },
    { label: "ふりかえり「原子の構造と周期表」", href: "/learn/ko-rika#h-sci-chemb-genshi" },
  ],
};
