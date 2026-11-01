import type { Lecture } from "../types";

export const E_MATH_5_TAISEKI: Lecture = {
  unit: "e-math-5-taiseki",
  title: "体積は「1cm³の立方体がいくつ分」",
  hook: "ジュースのパックや水そうには、どれだけ入るでしょう。長さや面積と同じように、かさ（体積）も「もとになる大きさがいくつ分」で表します。しくみがわかれば、たて×横×高さの公式がなぜ使えるのかもわかります。",
  sections: [
    {
      heading: "1cm³の立方体がいくつ分",
      body: "1辺が1cmの立方体の体積を{{1cm³（1立方センチメートル）}}といいます。たて3cm、横4cm、高さ2cmの直方体には、この立方体が、1だん目に 3×4＝12こ、それが2だんで{{24こ}}入ります。だから体積は24cm³です。",
      figure: {
        type: "area",
        kind: "bar",
        title: "たて3cm・横4cm・高さ2cm の直方体",
        max: 24,
        bars: [
          {
            label: "1cm³の立方体の数",
            parts: [
              { value: 12, label: "1だん目 3×4＝12こ", tone: "blue" },
              { value: 12, label: "2だん目 12こ", tone: "yellow" },
            ],
            total: "24cm³",
          },
        ],
        scale: [
          { at: 0, label: "0" },
          { at: 12, label: "12" },
          { at: 24, label: "24こ" },
        ],
      },
    },
    {
      heading: "公式は「1だんの数×だんの数」",
      body: "たて×横で1だんにならぶ数がわかり、それに高さ（だんの数）をかけると全部の数になります。これが{{直方体の体積＝たて×横×高さ}}です。立方体は3つの辺がみな等しいので、{{1辺×1辺×1辺}}で求めます。",
      figure: {
        type: "flow",
        title: "直方体の体積の求め方",
        steps: [
          { label: "たて×横", sub: "1だんの数", tone: "blue" },
          { label: "×高さ", sub: "だんの数" },
          { label: "体積", sub: "全部の数", tone: "yellow" },
        ],
        arrows: ["だんを重ねる", "cm³をつける"],
      },
    },
    {
      heading: "大きな体積の単位",
      body: "1辺が1mの立方体の体積を{{1m³}}といいます。1mは100cmなので、1m³は 100×100×100＝{{1000000cm³}}です。また、1辺10cmの立方体に入る水が1Lなので、{{1L＝1000cm³}}、1mL＝1cm³ になります。",
      figure: {
        type: "compare",
        title: "体積の単位",
        columns: [{ title: "どんな立方体か", tone: "blue" }, { title: "cm³で表すと", tone: "yellow" }],
        rows: [
          { label: "1cm³", cells: ["1辺1cm", "1cm³（＝1mL）"] },
          { label: "1L", cells: ["1辺10cm", "1000cm³"] },
          { label: "1m³", cells: ["1辺1m", "1000000cm³"] },
        ],
      },
    },
    {
      heading: "形を分けて、たして求める",
      body: "前から見てL字の形をした立体は、{{2つの直方体に分けて}}考えます。おく行きが2cmなら、左は 4×6×2＝48cm³、右は 5×3×2＝30cm³ で、合わせて{{78cm³}}です。大きな直方体から、かけた部分をひいて求めることもできます。",
      figure: {
        type: "area",
        kind: "rect",
        title: "L字の立体を2つに分ける（おく行き2cm）",
        rects: [
          { w: 4, h: 6, label: "4×6×2＝48", wLabel: "4cm", hLabel: "6cm", tone: "blue" },
          { w: 5, h: 3, label: "5×3×2＝30", wLabel: "5cm", hLabel: "3cm", tone: "yellow" },
        ],
        note: "48＋30＝78cm³。入れ物の中に入る体積（容積）は、内のりの長さで求めます。",
      },
    },
  ],
  mistakes: [
    { wrong: "体積を たて＋横＋高さ で求める", right: "たて×横×高さ", why: "1だんにならぶ数（たて×横）に、だんの数（高さ）をかけるからです。" },
    { wrong: "1m³＝100cm³ とする", right: "1m³＝1000000cm³", why: "たて・横・高さの3つが、それぞれ100倍になります。100×100×100です。" },
    { wrong: "入れ物の容積を、外側の長さで求める", right: "内のりの長さで求める", why: "板の厚さの分は、中に入りません。内側の長さを使います。" },
  ],
  check: [
    { q: "たて3cm、横4cm、高さ5cmの直方体の体積は何cm³ですか。", a: "60cm³", why: "3×4×5＝60。" },
    { q: "1辺6cmの立方体の体積は何cm³ですか。", a: "216cm³", why: "6×6×6＝216。" },
    { q: "2Lは何cm³ですか。", a: "2000cm³", why: "1L＝1000cm³ なので、その2倍です。" },
  ],
  next: [
    { label: "練習する：体積", href: "/learn/sansu-zukei/e-math-5-taiseki" },
    { label: "ふりかえり：直方体と立方体（図解）", href: "/learn/lecture/e-math-4-chokuhotai" },
    { label: "6年：角柱と円柱の体積", href: "/learn/sansu-zukei/e-math-6-kakuchu-taiseki" },
  ],
};
