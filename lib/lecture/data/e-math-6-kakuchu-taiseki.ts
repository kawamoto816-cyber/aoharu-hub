import type { Lecture } from "../types";

export const E_MATH_6_KAKUCHU_TAISEKI: Lecture = {
  unit: "e-math-6-kakuchu-taiseki",
  title: "角柱・円柱の体積＝底面積×高さ。底面を高さの分だけ積み重ねる",
  hook: "ジュースのかんや三角形のチョコの箱には、どれだけ入るでしょう。直方体なら「たて×横×高さ」でしたが、底が三角形や円だとたて・横がありません。「底面を積み重ねる」と考えれば、どの柱の形も同じ式で求められます。",
  sections: [
    {
      heading: "直方体の体積を、底面積×高さと見る",
      body: "たて3cm・横4cmの底面は、1cm³の立方体が{{12こ}}ならびます。高さ1cmの板の体積は 12cm³ で、これが{{高さの分だけ積み重なって}}います。高さ5cmなら 12×5＝60cm³。たて×横は底面の面積なので、{{体積＝底面積×高さ}}と言いかえられます。",
      figure: {
        type: "flow",
        title: "たて3cm・横4cm・高さ5cmの直方体",
        steps: [
          { label: "底面積 12cm²", sub: "3×4", tone: "blue" },
          { label: "高さ1cmで12cm³", sub: "1cm³が12こ" },
          { label: "5だん分 60cm³", sub: "12×5", tone: "yellow" },
        ],
        arrows: ["1cm分の高さ", "5cm積む"],
      },
    },
    {
      heading: "体積は、高さに比例する",
      body: "底面積が同じなら、高さが2倍、3倍になると、体積も{{2倍、3倍}}になります。同じ板を何まい積むかだけがちがうからです。だから底面がどんな形の{{角柱・円柱}}でも、体積は底面積×高さで求められます。",
      figure: {
        type: "area",
        kind: "bar",
        title: "底面積20cm²の角柱の高さと体積",
        max: 60,
        bars: [
          { label: "高さ1cm", parts: [{ value: 20, label: "20", tone: "blue" }], total: "20cm³" },
          { label: "高さ2cm", parts: [{ value: 20, tone: "blue" }, { value: 20, tone: "blue" }], total: "40cm³" },
          {
            label: "高さ3cm",
            parts: [{ value: 20, tone: "yellow" }, { value: 20, tone: "yellow" }, { value: 20, tone: "yellow" }],
            total: "60cm³",
          },
        ],
        scale: [
          { at: 0, label: "0" },
          { at: 20, label: "20" },
          { at: 40, label: "40" },
          { at: 60, label: "60" },
        ],
        scaleLabel: "体積（cm³）",
      },
    },
    {
      heading: "三角柱は、底面の三角形の面積から",
      body: "三角柱の底面は三角形なので、{{底辺×高さ÷2}}で底面積を出します。それに{{角柱の高さ}}をかけます。三角形の「高さ」と角柱の「高さ」は別のものなので、どちらの高さかを見分けましょう。",
      figure: {
        type: "formula",
        title: "底面が底辺4cm・高さ3cmの三角形、高さ10cmの三角柱",
        prose: true,
        steps: [
          { expr: "底面積 ＝ 4 × 3 {{÷ 2}} ＝ 6", note: "三角形の面積（cm²）" },
          { expr: "体積 ＝ 6 × {{10}}", note: "底面積×角柱の高さ" },
          { expr: "＝ {{60}}", note: "答え 60cm³" },
        ],
      },
    },
    {
      heading: "円柱は、底面の円の面積から",
      body: "円柱の底面は円なので、{{半径×半径×3.14}}で底面積を出し、高さをかけます。半径2cm・高さ5cmの円柱なら、2×2×3.14＝12.56cm²、12.56×5＝62.8cm³ です。{{2×2×5 を先に計算}}してから3.14をかけると、計算が楽になります。",
      figure: {
        type: "formula",
        title: "半径2cm・高さ5cmの円柱の体積",
        steps: [
          { expr: "2 × 2 × 3.14 × 5", note: "底面積×高さ" },
          { expr: "{{(2 × 2 × 5)}} × 3.14", note: "整数どうしを先に" },
          { expr: "20 × 3.14 ＝ {{62.8}}", note: "答え 62.8cm³" },
        ],
      },
    },
    {
      heading: "3つの柱をくらべる",
      body: "どれも{{体積＝底面積×高さ}}で、ちがうのは底面積の出し方だけです。体積と底面積がわかっていれば、{{高さ＝体積÷底面積}}で高さも求められます。",
      figure: {
        type: "compare",
        title: "底面の形と底面積の式",
        columns: [{ title: "立体" }, { title: "底面積の式", tone: "blue" }, { title: "体積", tone: "yellow" }],
        rows: [
          { cells: ["直方体・四角柱", "たて×横", "底面積×高さ"] },
          { cells: ["三角柱", "底辺×高さ÷2", "底面積×高さ"] },
          { cells: ["円柱", "半径×半径×3.14", "底面積×高さ"] },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "三角柱の体積を 底辺×高さ×角柱の高さ で出す", right: "底辺×高さ÷2 で底面積を出してから、角柱の高さをかける", why: "底面は三角形なので、÷2をわすれると2倍の体積になります。" },
    { wrong: "円柱の底面積を 直径×直径×3.14 とする", right: "半径×半径×3.14", why: "円の面積の公式は半径を使います。直径なら2でわってから。" },
    { wrong: "体積の単位を cm² と書く", right: "体積は cm³", why: "底面積（cm²）に高さ（cm）をかけるので、単位は cm³ になります。" },
  ],
  check: [
    { q: "底面積15cm²、高さ8cmの角柱の体積は何cm³ですか。", a: "120cm³", why: "15×8＝120。" },
    { q: "底面の半径3cm、高さ10cmの円柱の体積は何cm³ですか。", a: "282.6cm³", why: "3×3×3.14＝28.26。28.26×10＝282.6。" },
    { q: "体積90cm³、底面積15cm²の角柱の高さは何cmですか。", a: "6cm", why: "高さ＝体積÷底面積＝90÷15＝6。" },
  ],
  next: [
    { label: "「角柱と円柱の体積」（ドリル）", href: "/learn/sansu-zukei/e-math-6-kakuchu-taiseki" },
    { label: "ふりかえり「円の面積」（図解）", href: "/learn/lecture/e-math-6-en-menseki" },
    { label: "5年「角柱と円柱」（ドリル）", href: "/learn/sansu-zukei/e-math-5-kakuchu" },
  ],
};
