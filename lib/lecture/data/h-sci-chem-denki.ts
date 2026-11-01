import type { Lecture } from "../types";

export const H_SCI_CHEM_DENKI: Lecture = {
  unit: "h-sci-chem-denki",
  title: "電気分解は電池の逆。陰極で還元、陽極で酸化、量は電子の数で決まる",
  hook: "アルミニウムや銅、水酸化ナトリウムや塩素は、電気分解を使って工業的につくられています。電池が反応から電気を取り出すのに対し、電気分解は電気の力で、自然には起こらない酸化還元反応を起こします。どの極で何ができ、どれだけできるかを、電子のやりとりで考えます。",
  sections: [
    {
      heading: "陰極では還元、陽極では酸化",
      body: "電解質の水溶液や融解液に2本の電極を入れて直流を流すと、酸化還元反応が起こります（{{電気分解}}）。電源の負極につないだ電極が{{陰極}}で、電子が流れこむので{{還元}}が起こります。正極につないだ電極が{{陽極}}で、電子がうばわれるので{{酸化}}が起こります。",
      figure: {
        type: "compare",
        title: "陰極と陽極",
        columns: [{ title: "陰極", tone: "blue" }, { title: "陽極", tone: "red" }],
        rows: [
          { label: "つなぐ極", cells: ["電源の負極", "電源の正極"] },
          { label: "電子", cells: ["電極から受け取る", "電極にわたす"] },
          { label: "起こる変化", cells: ["還元", "酸化"] },
          { label: "集まるイオン", cells: ["陽イオン", "陰イオン"] },
        ],
        note: "電池の「負極・正極」と、電気分解の「陰極・陽極」は名前を区別する。",
      },
    },
    {
      heading: "どの物質が反応するかを見分ける",
      body: "陰極では、{{Cu²⁺ や Ag⁺}} のようにイオン化傾向の小さい金属のイオンは還元されて金属が析出します。K⁺・Na⁺・Al³⁺ などは還元されにくいので、かわりに{{水が還元されて H₂}} が出ます。陽極（白金・炭素電極）では Cl⁻ があれば Cl₂ が出て、SO₄²⁻ や NO₃⁻ のときは{{水が酸化されて O₂}} が出ます。陽極が Cu や Ag なら、電極そのものが溶け出します。",
      figure: {
        type: "tree",
        title: "水溶液の電気分解で生じるもの",
        root: {
          label: "電気分解",
          tone: "navy",
          children: [
            {
              label: "陰極（還元）",
              tone: "blue",
              children: [
                { label: "Cu²⁺・Ag⁺", sub: "金属が析出", tone: "plain" },
                { label: "K⁺・Na⁺など", sub: "水が還元→H₂", tone: "plain" },
              ],
            },
            {
              label: "陽極（酸化）",
              tone: "red",
              children: [
                { label: "Cl⁻", sub: "Cl₂ が発生", tone: "plain" },
                { label: "SO₄²⁻・NO₃⁻", sub: "水が酸化→O₂", tone: "plain" },
                { label: "Cu・Ag 電極", sub: "電極が溶ける", tone: "plain" },
              ],
            },
          ],
        },
        note: "酸性の水溶液では、陰極で H⁺ が還元されて H₂ が出る。",
      },
    },
    {
      heading: "電極での反応式を書く",
      body: "電極での反応は、電子 e⁻ をふくむ{{イオン反応式}}で書きます。水が反応するときは、陰極では {{H₂ と OH⁻}}、陽極では {{O₂ と H⁺}} ができるので、電極のまわりの液性が変わります。両極の式は電子の数をそろえると、流れた電子の量でつながります。",
      figure: {
        type: "formula",
        title: "白金電極での電気分解",
        steps: [
          { label: "CuSO₄ 陰極", expr: "Cu²⁺ ＋ 2e⁻ → {{Cu}}", note: "銅が析出" },
          { label: "CuSO₄ 陽極", expr: "2H₂O → {{O₂}} ＋ 4H⁺ ＋ 4e⁻", note: "水が酸化される" },
          { label: "NaCl 陰極", expr: "2H₂O ＋ 2e⁻ → {{H₂}} ＋ 2OH⁻", note: "Na⁺ は還元されない" },
          { label: "NaCl 陽極", expr: "2Cl⁻ → {{Cl₂}} ＋ 2e⁻", note: "塩素が発生" },
        ],
      },
    },
    {
      heading: "ファラデーの法則：量は流れた電子で決まる",
      body: "電気分解で変化する物質の量は、{{流れた電気量に比例}}します（{{ファラデーの法則}}）。電気量は Q〔C〕＝電流 I〔A〕×時間 t〔s〕で、電子 1 mol の電気量が{{ファラデー定数 F＝9.65×10⁴ C/mol}}です。電子の物質量を出してから、反応式の係数で生成物の物質量に直します。",
      figure: {
        type: "flow",
        dir: "col",
        title: "1.0 A を 9650 秒流して、CuSO₄ 水溶液から析出する銅",
        steps: [
          { label: "電気量 9650 C", sub: "1.0 A×9650 s", tone: "plain" },
          { label: "電子 0.100 mol", sub: "÷F（9.65×10⁴）", tone: "blue" },
          { label: "Cu 0.050 mol", sub: "電子2個で Cu 1個", tone: "blue" },
          { label: "Cu 3.2 g", sub: "×64 g/mol", tone: "yellow" },
        ],
        arrows: ["÷F", "×1/2", "×64"],
        note: "このとき陽極では O₂ が 0.100÷4＝0.025 mol 発生する。",
      },
    },
  ],
  mistakes: [
    { wrong: "陽極で還元、陰極で酸化が起こる", right: "陰極で還元、陽極で酸化", why: "陰極は電源の負極につながり、電子が流れこむので還元です。名前で覚えずに、電子がどちらへ動くかで考えます。" },
    { wrong: "NaCl 水溶液の電気分解で、陰極に Na が析出する", right: "陰極では水が還元されて H₂ が発生する", why: "Na⁺ はイオン化傾向が大きく還元されにくいので、水のほうが先に還元されます。Na を得るには NaCl を融解して電気分解します。" },
    { wrong: "電子 0.10 mol が流れたので、Cu も 0.10 mol 析出する", right: "Cu²⁺＋2e⁻→Cu なので Cu は 0.050 mol", why: "電子の物質量と生成物の物質量は、反応式の係数の比でつながります。" },
    { wrong: "Q＝It の t に「分」の数をそのまま入れる", right: "t は秒〔s〕に直して入れる", why: "1 C＝1 A×1 s です。10分なら 600 s です。" },
  ],
  check: [
    { q: "白金電極で NaCl 水溶液を電気分解したとき、陰極で発生する気体は？", a: "水素 H₂", why: "Na⁺ は還元されにくく、2H₂O＋2e⁻→H₂＋2OH⁻ が起こる。" },
    { q: "AgNO₃ 水溶液に 2.0 A の電流を 965 秒流すと、陰極に析出する銀は何 g？（Ag＝108、F＝9.65×10⁴ C/mol）", a: "2.16 g（約 2.2 g）", why: "2.0×965＝1930 C、電子 0.0200 mol。Ag⁺＋e⁻→Ag で Ag も 0.0200 mol、×108＝2.16 g。" },
    { q: "白金電極で CuSO₄ 水溶液を電気分解したとき、陽極で発生する気体は？", a: "酸素 O₂", why: "SO₄²⁻ は酸化されにくく、水が酸化されて 2H₂O→O₂＋4H⁺＋4e⁻。" },
  ],
  next: [
    { label: "計算ドリル「電気分解」で練習する", href: "/learn/rika-keisan/h-sci-chem-denki" },
    { label: "ひとつ前「電池」", href: "/learn/ko-rika#h-sci-chem-denchi" },
    { label: "ふりかえり「酸化と還元」", href: "/learn/ko-rika#h-sci-chemb-sanka" },
  ],
};
