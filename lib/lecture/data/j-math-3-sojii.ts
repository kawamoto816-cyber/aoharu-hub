import type { Lecture } from "../types";

export const J_MATH_3_SOJII: Lecture = {
  unit: "j-math-3-sojii",
  title: "相似は「形が同じで大きさがちがう」。比で長さ・面積・体積がわかる",
  hook: "地図は実際の土地を同じ形のまま小さくしたもの、コピー機の拡大は同じ形のまま大きくしたものです。形が同じなら、長さの比を使って、測れない木の高さや実際の距離を計算できます。この「同じ形」を数学では相似といいます。",
  sections: [
    {
      heading: "相似な図形は、辺の比と角が等しい",
      body: "一方を拡大・縮小すると他方にぴったり重なる2つの図形は{{相似}}であるといい、記号 ∽ で表します。相似な図形では、{{対応する線分の比はすべて等しく、対応する角はそれぞれ等しい}}です。この比を{{相似比}}といい、1組の辺の長さがわかれば、ほかの辺も比で求められます。",
      figure: {
        type: "formula",
        title: "△ABC∽△DEF、相似比 2:3、AB＝6cm のとき DE は？",
        steps: [
          { expr: "AB : DE ＝ 2 : 3", note: "対応する辺の比＝相似比" },
          { expr: "{{6}} : DE ＝ 2 : 3", note: "AB＝6 を入れる" },
          { expr: "2 × DE ＝ 18 → DE ＝ {{9}}cm", note: "比の外側の積＝内側の積" },
        ],
      },
    },
    {
      heading: "三角形の相似条件は3つ",
      body: "2つの三角形は、次のどれかが成り立てば相似です。合同条件の「辺が等しい」を{{「辺の比が等しい」}}に変えた形になっています。とくに{{2組の角がそれぞれ等しい}}は、平行線や円の問題でいちばんよく使います。2組の角が等しければ、残りの角も 180° から自動的に等しくなるからです。",
      figure: {
        type: "compare",
        title: "合同条件と相似条件をならべる",
        columns: [{ title: "合同条件" }, { title: "相似条件", tone: "yellow" }],
        rows: [
          { label: "辺", cells: ["3組の辺が等しい", "3組の辺の比が等しい"] },
          { label: "辺と角", cells: ["2辺とその間の角", "2組の辺の比とその間の角"] },
          { label: "角", cells: ["1辺とその両端の角", "2組の角がそれぞれ等しい"] },
        ],
      },
    },
    {
      heading: "平行線は、辺を同じ比に分ける",
      body: "△ABC で辺 AB 上の点 D、AC 上の点 E について DE∥BC なら、{{AD:DB＝AE:EC}} になります。また △ADE∽△ABC なので AD:AB＝AE:AC＝DE:BC です。とくに D・E が中点のときは、DE は BC に平行で長さは半分になります（{{中点連結定理}}）。",
      figure: {
        type: "area",
        kind: "bar",
        title: "DE∥BC のとき、2辺は同じ比 2:1 に分かれる",
        bars: [
          {
            label: "辺 AB",
            parts: [
              { value: 4, label: "AD 4", tone: "blue" },
              { value: 2, label: "DB 2", tone: "yellow" },
            ],
            total: "4:2＝2:1",
          },
          {
            label: "辺 AC",
            parts: [
              { value: 6, label: "AE 6", tone: "blue" },
              { value: 3, label: "EC 3", tone: "yellow" },
            ],
            total: "6:3＝2:1",
          },
        ],
        note: "長さはちがっても、分かれ方の比は同じ。",
      },
    },
    {
      heading: "面積比は2乗、体積比は3乗",
      body: "相似比が m:n なら、面積は「たて×横」で比を2回かけるので {{面積比は m²:n²}}、体積は3回かけるので {{体積比は m³:n³}} になります。相似比 2:3 の三角形なら面積比は 4:9、相似比 2:3 の立体なら体積比は 8:27 です。",
      figure: {
        type: "flow",
        dir: "row",
        title: "相似比 2:3 から面積比・体積比へ",
        steps: [
          { label: "相似比 2:3", sub: "長さの比", tone: "blue" },
          { label: "面積比 4:9", sub: "2乗する", tone: "yellow" },
          { label: "体積比 8:27", sub: "3乗する", tone: "red" },
        ],
        arrows: ["2乗", "3乗"],
      },
    },
  ],
  mistakes: [
    { wrong: "相似比 3:5 の図形の面積比も 3:5", right: "面積比は 3²:5²＝9:25", why: "面積は長さを2回かけた量なので、比も2乗になります。体積なら3乗です。" },
    { wrong: "DE∥BC なので DE:BC＝AD:DB", right: "DE:BC＝AD:AB", why: "DE と BC は △ADE と △ABC の対応する辺。DB ではなく辺全体の AB とくらべます。" },
    { wrong: "△ABC∽△DEF のとき、AB と EF を対応させる", right: "AB と DE、BC と EF、CA と FD が対応する", why: "∽ の記号では、対応する頂点を同じ順番に書きます。" },
  ],
  check: [
    { q: "相似比が 3:5 の2つの図形の面積比は？", a: "9:25", why: "面積比は相似比の2乗。3²:5²。" },
    { q: "高さ1.5mの棒の影が2mのとき、同じ時刻に影が8mの木の高さは？", a: "6m", why: "棒と木はその影と相似な直角三角形をつくる。影が4倍なので高さも 1.5×4＝6m。" },
    { q: "△ABC の辺 AB、AC の中点を M、N とします。BC＝14cm のとき MN は？", a: "7cm", why: "中点連結定理より MN＝BC÷2。" },
  ],
  next: [
    { label: "ドリル「相似な図形」に挑戦", href: "/learn/sugaku-chu/j-math-3-sojii" },
    { label: "ふりかえり「平行と合同」（中2）", href: "/learn/sugaku-chu/j-math-2-heiko-godo" },
    { label: "つぎの単元「円」", href: "/learn/sugaku-chu/j-math-3-en" },
  ],
};
