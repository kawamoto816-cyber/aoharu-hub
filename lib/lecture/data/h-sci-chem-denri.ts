import type { Lecture } from "../types";

export const H_SCI_CHEM_DENRI: Lecture = {
  unit: "h-sci-chem-denri",
  title: "弱酸は少しだけ電離する。pH は [H⁺] の「けた」で決まる",
  hook: "同じ濃度でも、塩酸と酢酸では酸の強さが大きくちがいます。また、血液の pH は約7.4に保たれていて、少しの酸や塩基が入ってもほとんど変わりません。こうしたことは、水や弱酸の中で成り立つ「電離平衡」で説明できます。",
  sections: [
    {
      heading: "水のイオン積と pH",
      body: "水もごくわずかに電離していて、H₂O ⇄ H⁺ ＋ OH⁻ の平衡にあります。25℃ では {{[H⁺][OH⁻] ＝ 1.0×10⁻¹⁴ (mol/L)²}} となり、これを{{水のイオン積 Kw}} といいます。酸性・塩基性の強さは {{pH ＝ −log₁₀[H⁺]}} で表し、[H⁺] が10倍になるごとに pH は1小さくなります。塩基の水溶液では、まず [OH⁻] を求め、Kw から [H⁺] を出します。",
      figure: {
        type: "numberline",
        title: "pH の目もりと水溶液の例（25℃）",
        min: 0,
        max: 14,
        points: [
          { x: 2, label: "0.010 mol/L 塩酸", tone: "red" },
          { x: 7, label: "純水", tone: "yellow" },
          { x: 11, label: "0.0010 mol/L NaOH", tone: "blue" },
        ],
        ranges: [
          { from: 0, to: 7, label: "酸性", openTo: true, tone: "red" },
          { from: 7, to: 14, label: "塩基性", openFrom: true, tone: "blue" },
        ],
        desc: "0から14までの pH の数直線。0.010 mol/L 塩酸は pH 2、純水は pH 7、0.0010 mol/L 水酸化ナトリウム水溶液は pH 11。7より小さいと酸性、大きいと塩基性。",
        note: "NaOH 水溶液は [OH⁻]＝1.0×10⁻³ より [H⁺]＝1.0×10⁻¹¹ mol/L で、pH 11。",
      },
    },
    {
      heading: "弱酸の電離定数 Ka",
      body: "酢酸のような弱酸は、水溶液中で一部だけが電離して {{CH₃COOH ⇄ CH₃COO⁻ ＋ H⁺}} の平衡になります。この平衡定数を{{電離定数 Ka}} といいます。濃度 c、電離度 α で各濃度を表し、α が1よりずっと小さいときは 1 − α ≒ 1 と近似すると、{{Ka ≒ cα²}}、{{[H⁺] ＝ √(cKa)}} が得られます。",
      figure: {
        type: "formula",
        title: "0.040 mol/L の弱酸（Ka＝2.5×10⁻⁵ mol/L）の pH",
        steps: [
          { expr: "Ka ＝ cα·cα ／ c(1 − α) {{≒ cα²}}", note: "1 − α ≒ 1 と近似" },
          { expr: "α ＝ √(Ka／c) ＝ √(2.5×10⁻⁵ ／ 0.040) ＝ {{0.025}}", note: "電離するのは2.5%だけ" },
          { expr: "[H⁺] ＝ cα ＝ 0.040 × 0.025 ＝ {{1.0×10⁻³}} mol/L", note: "√(cKa) と同じ値" },
          { expr: "pH ＝ −log₁₀(1.0×10⁻³) ＝ {{3}}", note: "同じ濃度の塩酸なら約1.4" },
        ],
      },
    },
    {
      heading: "強酸と弱酸は、うすめたときの変わり方もちがう",
      body: "塩酸のような強酸は{{ほぼ完全に電離}}するので、[H⁺] は酸の濃度と同じです。弱酸は濃度が同じでも [H⁺] がずっと小さく、pH は大きくなります。また弱酸は {{[H⁺] ＝ √(cKa)}} なので、10倍にうすめても [H⁺] は 1/10 ではなく約 1/3 にしかならず、pH は約0.5しか上がりません。うすめると{{電離度は大きくなる}}からです。",
      figure: {
        type: "compare",
        title: "0.10 mol/L の塩酸と酢酸（Ka＝2.7×10⁻⁵ mol/L）",
        columns: [{ title: "塩酸（強酸）", tone: "red" }, { title: "酢酸（弱酸）", tone: "blue" }],
        rows: [
          { label: "電離度", cells: ["ほぼ1", "約0.016"] },
          { label: "[H⁺]", cells: ["0.10 mol/L", "約1.6×10⁻³ mol/L"] },
          { label: "pH", cells: ["1", "約2.8"] },
          { label: "10倍にうすめる", cells: ["pH 2（1上がる）", "約3.3（約0.5上がる）"] },
        ],
        note: "酢酸の値は [H⁺]＝√(cKa) の近似で計算したもの。",
      },
    },
    {
      heading: "緩衝液：少量の酸や塩基を打ち消す",
      body: "酢酸と酢酸ナトリウムの混合水溶液のように、{{弱酸とその塩}}をふくむ水溶液を{{緩衝液}}といいます。酢酸ナトリウムは完全に電離するので、この液には CH₃COOH と CH₃COO⁻ がどちらも多くあります。酸を加えると CH₃COO⁻ が H⁺ を受けとり、塩基を加えると CH₃COOH が OH⁻ と中和するので、{{pH がほとんど変わりません}}。[H⁺] は {{Ka × [CH₃COOH] ／ [CH₃COO⁻]}} で求められます。",
      figure: {
        type: "flow",
        dir: "col",
        title: "酢酸の緩衝液に少量の塩酸を加えると",
        steps: [
          { label: "緩衝液", sub: "弱酸と塩がどちらも多い", tone: "navy" },
          { label: "H⁺ が入る", sub: "少量の塩酸を加える", tone: "red" },
          { label: "CH₃COO⁻ が反応", sub: "CH₃COOH にもどる", tone: "blue" },
          { label: "pH はほぼ一定", sub: "[H⁺] がほぼ変わらない", tone: "yellow" },
        ],
        note: "塩基を加えたときは CH₃COOH ＋ OH⁻ → CH₃COO⁻ ＋ H₂O で OH⁻ が消費される。",
      },
    },
    {
      heading: "共通イオン効果と溶解度積",
      body: "電離平衡にある液に、そこにふくまれるイオンを加えると、そのイオンが減る向きに平衡が移動します。これを{{共通イオン効果}}といいます。水に溶けにくい塩でも、AgCl ⇄ Ag⁺ ＋ Cl⁻ の平衡では {{[Ag⁺][Cl⁻] ＝ Ksp（溶解度積）}} が一定になり、イオン濃度の積が Ksp をこえると沈殿が生じます。NaCl 水溶液中では [Cl⁻] が大きいので、AgCl は純水中より溶けにくくなります。",
    },
  ],
  mistakes: [
    { wrong: "0.10 mol/L 酢酸の pH は −log 0.10 ＝ 1", right: "弱酸は一部しか電離しないので、[H⁺] は cα で求める", why: "pH ＝ −log c が使えるのは、ほぼ完全に電離する1価の強酸だけです。" },
    { wrong: "pH 5 の塩酸を水で1000倍にうすめると pH 8 になる", right: "酸をいくらうすめても pH は7に近づくだけで、7をこえない", why: "とてもうすい酸では、水の電離による H⁺ を無視できなくなります。" },
    { wrong: "0.050 mol/L 硫酸の [H⁺] は 0.050 mol/L", right: "2価の酸なので [H⁺] ＝ 2 × 0.050 ＝ 0.10 mol/L（pH 1）", why: "2段とも完全に電離するとみなすと、H₂SO₄ 1つから H⁺ が2つ出ます。" },
    { wrong: "緩衝液は、強酸とその塩を混ぜてつくる", right: "弱酸とその塩（または弱塩基とその塩）を混ぜてつくる", why: "加えた H⁺ を受けとる CH₃COO⁻ と、OH⁻ と反応する CH₃COOH の両方が多くあることが必要です。" },
  ],
  check: [
    { q: "0.0010 mol/L の水酸化ナトリウム水溶液の pH はいくつですか（25℃）。", a: "11", why: "[OH⁻]＝1.0×10⁻³ mol/L なので [H⁺]＝Kw／[OH⁻]＝1.0×10⁻¹¹ mol/L。" },
    { q: "0.10 mol/L の酢酸の電離度が 0.010 のとき、pH はいくつですか。", a: "3", why: "[H⁺]＝cα＝0.10×0.010＝1.0×10⁻³ mol/L。" },
    { q: "0.050 mol/L の弱酸（Ka＝2.0×10⁻⁵ mol/L）の [H⁺] は何 mol/L ですか。", a: "1.0×10⁻³ mol/L", why: "[H⁺]＝√(cKa)＝√(0.050×2.0×10⁻⁵)＝√(1.0×10⁻⁶)。" },
  ],
  next: [
    { label: "計算ドリル「電離平衡」で鍛える", href: "/learn/rika-keisan/h-sci-chem-denri" },
    { label: "ひとつ前「化学平衡」", href: "/learn/rika-keisan/h-sci-chem-heiko" },
    { label: "ふりかえり「中和反応と塩」", href: "/learn/rika-keisan/h-sci-chemb-chuwa" },
  ],
};
