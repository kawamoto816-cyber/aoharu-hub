import type { Lecture } from "../types";

export const H_SCI_BIOB_BUNRETSU: Lecture = {
  unit: "h-sci-biob-bunretsu",
  title: "DNAを正確に2倍にしてから、半分ずつ分ける",
  hook: "すりむいた傷が治るのは、まわりの細胞が分裂してふえるからです。ふえた細胞も、もとの細胞とまったく同じ遺伝情報をもっています。そのしくみは「分裂の前にDNAをまるごとコピーし、2つの細胞に等しく分ける」ことにあります。",
  sections: [
    {
      heading: "細胞周期：間期と分裂期のくり返し",
      body: "分裂でふえる細胞は、{{間期}}と{{分裂期（M期）}}をくり返します。これを{{細胞周期}}といいます。間期はさらに、{{G1期}}（DNA合成の準備）、{{S期}}（DNAの複製）、{{G2期}}（分裂の準備）に分けられます。顕微鏡で見ると、ほとんどの細胞は間期にあります。",
      figure: {
        type: "cycle",
        title: "細胞周期",
        center: "細胞周期",
        steps: [
          { label: "G1期", sub: "DNA合成の準備", tone: "plain" },
          { label: "S期", sub: "DNAを複製する", tone: "yellow" },
          { label: "G2期", sub: "分裂の準備", tone: "plain" },
          { label: "分裂期（M期）", sub: "染色体を分ける", tone: "navy" },
        ],
        note: "G1期・S期・G2期をまとめて間期という。",
      },
    },
    {
      heading: "複製：それぞれの鎖が鋳型になる",
      body: "S期には、DNAの2本鎖がほどけ、それぞれの鎖を{{鋳型}}にして相補的な塩基をもつヌクレオチドがつながり、新しい鎖ができます。こうしてもとと同じDNAが2つできます。新しいDNAは、もとの鎖1本と新しい鎖1本からなるので、この複製のしかたを{{半保存的複製}}といいます。",
      figure: {
        type: "flow",
        dir: "col",
        title: "半保存的複製の流れ",
        steps: [
          { label: "2本鎖がほどける", sub: "塩基どうしの結合が切れる", tone: "navy" },
          { label: "鎖が鋳型になる", sub: "相補的な塩基がつく", tone: "blue" },
          { label: "同じDNAが2つ", sub: "もとの鎖＋新しい鎖", tone: "yellow" },
        ],
      },
    },
    {
      heading: "メセルソンとスタールの実験",
      body: "{{メセルソンとスタール}}は、重い窒素（{{¹⁵N}}）だけで育てた大腸菌を、ふつうの窒素（{{¹⁴N}}）の培地に移して分裂させ、DNAの重さを調べました。1回分裂後は{{中間の重さ}}のDNAだけ、2回後は{{中間：軽い＝1：1}}になりました。これは半保存的複製の予想どおりの結果です。もとの重い鎖2本は、何回分裂しても2本のまま残り続けます。",
      figure: {
        type: "area",
        kind: "bar",
        title: "分裂の回数とDNAの重さの割合",
        max: 4,
        bars: [
          { label: "移す前", parts: [{ value: 4, label: "重い", tone: "navy" }] },
          { label: "1回後", parts: [{ value: 4, label: "中間", tone: "blue" }] },
          { label: "2回後", parts: [{ value: 2, label: "中間", tone: "blue" }, { value: 2, label: "軽い", tone: "plain" }], total: "1：1" },
          { label: "3回後", parts: [{ value: 1, label: "中間", tone: "blue" }, { value: 3, label: "軽い", tone: "plain" }], total: "1：3" },
        ],
        note: "中間のDNAは¹⁵Nの鎖と¹⁴Nの鎖が1本ずつ。軽いDNAは2本とも¹⁴N。",
      },
    },
    {
      heading: "DNA量の変化と分裂期の流れ",
      body: "細胞1個あたりのDNA量は、S期で{{2倍}}になり、分裂期の終わりに2つの細胞に分かれて{{もとの量}}にもどります。分裂期は、染色体が太く短くなる{{前期}}、赤道面に並ぶ{{中期}}、両極へ分かれる{{後期}}、細胞質が分かれる{{終期}}の順に進みます。こうして2つの娘細胞は、もとの細胞と同じ遺伝情報を受けつぎます。",
      figure: {
        type: "compare",
        title: "細胞周期とDNA量（G1期を1とする）",
        columns: [{ title: "DNA量", tone: "yellow" }, { title: "起こること", tone: "blue" }],
        rows: [
          { label: "G1期", cells: ["1", "細胞が成長する"] },
          { label: "S期", cells: ["1 → 2", "DNAを複製する"] },
          { label: "G2期", cells: ["2", "分裂の準備をする"] },
          { label: "分裂期", cells: ["2 → 1（終期）", "染色体が2つに分かれる"] },
        ],
      },
    },
    {
      heading: "各期の長さを細胞の数から求める",
      body: "細胞周期がそろっていない細胞の集まりでは、ある時期にいる細胞の数の割合は、その時期の{{長さの割合}}に等しいと考えられます。そこで「{{その時期の長さ＝細胞周期の長さ×その時期の細胞の割合}}」で求められます。",
      figure: {
        type: "formula",
        title: "細胞周期20時間、1000個中50個が分裂期のとき",
        steps: [
          { label: "式", expr: "分裂期の長さ ＝ 20時間 × {{50/1000}}", note: "分裂期の細胞の割合をかける" },
          { label: "計算", expr: "＝ 20 × {{0.05}}", note: "50÷1000＝0.05" },
          { label: "答え", expr: "＝ {{1時間}}" },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "DNAは分裂期に複製される", right: "DNAは間期のS期に複製される", why: "分裂期は、すでに2倍になったDNA（染色体）を分ける時期です。" },
    { wrong: "複製で、もとの2本鎖とまったく新しい2本鎖ができる", right: "どちらのDNAも、もとの鎖1本と新しい鎖1本からなる", why: "それぞれの鎖が鋳型になる半保存的複製だからです。" },
    { wrong: "メセルソンらの実験で、2回分裂後に重いDNAが残る", right: "2回分裂後は中間と軽いDNAが1：1で、重いDNAはない", why: "1回目ですべてのDNAが¹⁵N鎖と¹⁴N鎖の組になり、重いDNAはなくなります。" },
  ],
  check: [
    { q: "G1期の細胞のDNA量を2とすると、G2期の細胞のDNA量は？", a: "4", why: "S期で複製されて2倍になる。" },
    { q: "メセルソンとスタールの実験で、3回分裂させたときの中間：軽いの比は？", a: "1：3", why: "DNAは8本分。¹⁵Nの鎖2本をふくむ中間が2、残り6が軽い。" },
    { q: "細胞周期24時間、観察した細胞400個のうち間期が360個のとき、分裂期の長さは？", a: "2.4時間", why: "分裂期は40個で割合0.1。24×0.1＝2.4。" },
  ],
  next: [
    { label: "用語カード「DNAの複製と細胞分裂」で覚える", href: "/learn/ko-rika#h-sci-biob-bunretsu" },
    { label: "ひとつ前「遺伝子とDNA」", href: "/learn/lecture/h-sci-biob-dna" },
    { label: "つぎ「遺伝情報の発現」", href: "/learn/lecture/h-sci-biob-hatsugen" },
  ],
};
