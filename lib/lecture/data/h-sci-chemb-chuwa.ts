import type { Lecture } from "../types";

export const H_SCI_CHEMB_CHUWA: Lecture = {
  unit: "h-sci-chemb-chuwa",
  title: "中和は H⁺ と OH⁻ の数合わせ。価数×濃度×体積をそろえる",
  hook: "胃薬は、出すぎた胃酸を塩基で打ち消します。酸性になった土に石灰をまくのも同じ考えです。どれだけ加えればちょうど打ち消せるかは、H⁺ と OH⁻ の物質量をくらべれば計算でき、濃さのわからない酸の濃度も実験で求められます。",
  sections: [
    {
      heading: "中和は H⁺ ＋ OH⁻ → H₂O",
      body: "酸と塩基が反応して、たがいの性質を打ち消し合う反応を{{中和}}といいます。中心は {{H⁺＋OH⁻→H₂O}} で、酸の陰イオンと塩基の陽イオンからは{{塩（えん）}}ができます。2価の硫酸なら、1価の水酸化ナトリウムが2倍の物質量必要です。",
      figure: {
        type: "formula",
        title: "中和の化学反応式",
        steps: [
          { label: "1価＋1価", expr: "HCl ＋ NaOH → {{NaCl}} ＋ H₂O", note: "塩は NaCl" },
          { label: "2価＋1価", expr: "H₂SO₄ ＋ {{2}}NaOH → Na₂SO₄ ＋ {{2}}H₂O", note: "H⁺ 2個に OH⁻ 2個" },
          { label: "弱酸＋強塩基", expr: "CH₃COOH ＋ NaOH → {{CH₃COONa}} ＋ H₂O", note: "弱酸でも1:1で反応する" },
        ],
      },
    },
    {
      heading: "ちょうど中和：H⁺ の mol ＝ OH⁻ の mol",
      body: "ちょうど中和するのは、酸が出す {{H⁺ の物質量}}と塩基が出す {{OH⁻ の物質量}}が等しいときです。物質量は 価数×濃度〔mol/L〕×体積〔L〕なので、{{a×c×V＝b×c′×V′}} が成り立ちます。0.10 mol/L の硫酸 10 mL には H⁺ が 2×0.10×0.010＝2.0×10⁻³ mol あり、0.20 mol/L の NaOH 水溶液なら 10 mL でちょうど中和します。この式は弱酸・弱塩基でも同じです。",
      figure: {
        type: "area",
        kind: "bar",
        title: "0.10 mol/L 硫酸 10 mL と 0.20 mol/L NaOH 10 mL",
        bars: [
          { label: "H₂SO₄ の H⁺", parts: [{ value: 1.0, label: "1つ目の H⁺", tone: "red" }, { value: 1.0, label: "2つ目の H⁺", tone: "red" }], total: "2.0×10⁻³ mol" },
          { label: "NaOH の OH⁻", parts: [{ value: 2.0, label: "OH⁻", tone: "blue" }], total: "2.0×10⁻³ mol" },
        ],
        scale: [{ at: 0, label: "0" }, { at: 1, label: "1.0" }, { at: 2, label: "2.0" }],
        scaleLabel: "×10⁻³ mol",
        note: "硫酸は2価なので、濃度は半分でも H⁺ の量は NaOH の OH⁻ と等しい。",
      },
    },
    {
      heading: "中和滴定と指示薬の選び方",
      body: "濃度のわからない酸を{{ホールピペット}}で正確にとり、{{ビュレット}}から濃度のわかった塩基を少しずつ加えて、中和に必要な体積を測ります。これが{{中和滴定}}です。中和点の pH は塩の性質で7からずれるので、変色域が中和点の pH にふくまれる指示薬を選びます。弱酸＋強塩基は{{フェノールフタレイン}}、強酸＋弱塩基は{{メチルオレンジ}}です。",
      figure: {
        type: "numberline",
        title: "指示薬の変色域（pH）",
        min: 0,
        max: 14,
        tick: 1,
        labelEvery: 1,
        ranges: [
          { from: 3.1, to: 4.4, label: "メチルオレンジ", tone: "red" },
          { from: 8.0, to: 9.8, label: "フェノールフタレイン", tone: "blue" },
        ],
        note: "強酸＋強塩基は中和点付近で pH が大きくとぶので、どちらも使える。",
      },
    },
    {
      heading: "塩の水溶液は中性とはかぎらない",
      body: "塩の水溶液の性質は、もとの酸と塩基の{{強いほうの性質}}が現れます。CH₃COONa の水溶液では CH₃COO⁻ が水と反応して OH⁻ を生じ（{{加水分解}}）、塩基性になります。なお、NaHSO₄ のように酸の H が残る塩を{{酸性塩}}といいますが、この名前は水溶液の性質とは関係ありません。NaHCO₃ は酸性塩ですが、水溶液は弱い塩基性です。",
      figure: {
        type: "compare",
        title: "塩の水溶液の性質",
        columns: [{ title: "塩の例" }, { title: "水溶液", tone: "yellow" }],
        rows: [
          { label: "強酸＋強塩基", cells: ["NaCl・Na₂SO₄", "中性"] },
          { label: "強酸＋弱塩基", cells: ["NH₄Cl・CuSO₄", "酸性"] },
          { label: "弱酸＋強塩基", cells: ["CH₃COONa・Na₂CO₃", "塩基性"] },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "0.10 mol/L 硫酸 10 mL は 0.10 mol/L NaOH 10 mL で中和する", right: "硫酸は2価なので NaOH は 20 mL 必要", why: "H⁺ の物質量は 価数×濃度×体積。価数をかけ忘れると半分の量になります。" },
    { wrong: "弱酸は電離が少ないので、少しの塩基で中和する", right: "同じ濃度・体積なら、弱酸も強酸も必要な塩基の量は同じ", why: "中和が進むと残りの酸が次々と電離するので、最終的にすべての H⁺ が反応します。" },
    { wrong: "中和点ではいつも pH7", right: "中和点の pH は、できた塩の性質で決まる", why: "酢酸と NaOH の中和点は CH₃COONa の加水分解で塩基性になります。" },
    { wrong: "NaHCO₃ は酸性塩なので水溶液は酸性", right: "酸性塩・正塩は組成による名前で、液性とは別", why: "NaHCO₃ は弱酸と強塩基からなる塩なので、水溶液は弱い塩基性です。" },
  ],
  check: [
    { q: "酢酸水溶液 10 mL を 0.10 mol/L NaOH 水溶液で滴定すると、8.0 mL で中和した。酢酸の濃度は？", a: "0.080 mol/L", why: "1×c×10＝1×0.10×8.0 より c＝0.080 mol/L。" },
    { q: "0.050 mol/L の Ca(OH)₂ 水溶液 20 mL をちょうど中和する 0.10 mol/L 塩酸は何 mL？", a: "20 mL", why: "Ca(OH)₂ は2価。2×0.050×20＝1×0.10×V より V＝20 mL。" },
    { q: "NH₄Cl の水溶液は酸性・中性・塩基性のどれ？", a: "酸性", why: "強酸（HCl）と弱塩基（NH₃）の塩。NH₄⁺ が加水分解して H₃O⁺ を生じる。" },
  ],
  next: [
    { label: "計算ドリル「中和反応と塩」で鍛える", href: "/learn/rika-keisan/h-sci-chemb-chuwa" },
    { label: "ふりかえり「酸と塩基」", href: "/learn/ko-rika#h-sci-chemb-san" },
    { label: "つぎの単元「酸化と還元」", href: "/learn/ko-rika#h-sci-chemb-sanka" },
  ],
};
