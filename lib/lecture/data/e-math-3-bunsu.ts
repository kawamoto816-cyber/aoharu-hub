import type { Lecture } from "../types";

export const E_MATH_3_BUNSU: Lecture = {
  unit: "e-math-3-bunsu",
  title: "分数は「1を等しく分けた何こ分」",
  hook: "ピザ1まいを4人で同じ大きさに分けると、1人分は「4つに分けた1つ分」です。こうした1より小さいはしたを表すのが分数です。分数がわかると、テープの長さやジュースのかさのはしたも正しく表せます。",
  sections: [
    {
      heading: "1mを3等分した1こ分は1/3m",
      body: "1mのテープを{{3つに等しく分けた1こ分}}の長さを{{1/3m}}（3分の1メートル）といいます。1/3mの2こ分は2/3m、3こ分は3/3mです。{{3/3mは1mと同じ}}長さです。",
      figure: {
        type: "area",
        kind: "bar",
        title: "1mを3等分する",
        max: 3,
        bars: [
          {
            label: "1m",
            parts: [
              { value: 1, label: "1/3m", tone: "blue" },
              { value: 1, label: "1/3m", tone: "blue" },
              { value: 1, label: "1/3m", tone: "blue" },
            ],
            total: "3/3m＝1m",
          },
          {
            label: "2/3m",
            parts: [
              { value: 1, label: "1/3m", tone: "yellow" },
              { value: 1, label: "1/3m", tone: "yellow" },
            ],
            total: "1/3mが2こ",
          },
        ],
        scale: [
          { at: 0, label: "0" },
          { at: 1, label: "1/3" },
          { at: 2, label: "2/3" },
          { at: 3, label: "1m" },
        ],
      },
    },
    {
      heading: "分母と分子",
      body: "分数の線の下の数を{{分母}}、上の数を{{分子}}といいます。分母は「1をいくつに分けたか」、分子は「その何こ分か」を表します。分母と分子が同じ分数は、{{1と同じ大きさ}}です。",
      figure: {
        type: "compare",
        title: "分母と分子が表すこと",
        columns: [{ title: "分母（下）", tone: "blue" }, { title: "分子（上）", tone: "yellow" }],
        rows: [
          { label: "2/5", cells: ["5つに分ける", "その2こ分"] },
          { label: "3/4", cells: ["4つに分ける", "その3こ分"] },
          { label: "4/4", cells: ["4つに分ける", "4こ分で1"] },
        ],
      },
    },
    {
      heading: "1/10は0.1と同じ",
      body: "1を10こに等しく分けた1こ分は、分数では{{1/10}}、小数では{{0.1}}です。だから3/10と0.3は同じ大きさです。分数と小数は、同じはしたのべつの書き方です。",
      figure: {
        type: "area",
        kind: "bar",
        title: "3/10と0.3をくらべる",
        max: 10,
        bars: [
          {
            label: "分数で",
            parts: [
              { value: 3, label: "3/10", tone: "yellow" },
              { value: 7, tone: "plain" },
            ],
            total: "1/10が3こ",
          },
          {
            label: "小数で",
            parts: [
              { value: 3, label: "0.3", tone: "yellow" },
              { value: 7, tone: "plain" },
            ],
            total: "0.1が3こ",
          },
        ],
        scale: [
          { at: 0, label: "0" },
          { at: 3, label: "3/10＝0.3" },
          { at: 10, label: "1" },
        ],
      },
    },
    {
      heading: "分母が同じ分数のたし算・ひき算",
      body: "2/7＋3/7は、{{1/7が2こと3こで5こ}}なので5/7です。分母は「分け方」なので、たしても{{かわりません}}。1−2/5は、1を5/5と見てから分子どうしをひきます。",
      figure: {
        type: "formula",
        title: "1/7や1/5のいくつ分で計算する",
        steps: [
          { label: "たす", expr: "2/7 ＋ 3/7", note: "1/7が2こと3こ" },
          { expr: "＝ {{5}}/7", note: "分子だけたす。分母はそのまま" },
          { label: "ひく", expr: "1 − 2/5 ＝ {{5/5}} − 2/5", note: "1を5/5になおす" },
          { expr: "＝ {{3}}/5", note: "1/5が5こから2こをひく" },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "2/7＋3/7＝5/14", right: "2/7＋3/7＝5/7", why: "分母は1をいくつに分けたか。1/7がいくつ分かを数えるので、分母はかわりません。" },
    { wrong: "1/4のほうが1/3より大きいと思う", right: "1/3のほうが大きい", why: "分ける数が多いほど、1こ分は小さくなります。" },
    { wrong: "1−2/5 を 1/5 とする", right: "1−2/5＝5/5−2/5＝3/5", why: "1は1/5が5こ分。5こから2こをひくと3こです。" },
  ],
  check: [
    { q: "1mを5等分した3こ分の長さは何mですか。", a: "3/5m", why: "1/5mが3こ分なので3/5m。" },
    { q: "3/8＋4/8 を計算しましょう。", a: "7/8", why: "1/8が3こと4こで7こ。" },
    { q: "0.7を分数で表しましょう。", a: "7/10", why: "0.1は1/10。0.1が7こなので7/10。" },
  ],
  next: [
    { label: "計算のだんで「分数のたし算・ひき算」を練習する", href: "/learn/sansu/31" },
    { label: "3年「小数」の図かいレクチャー", href: "/learn/lecture/e-math-3-shosu" },
    { label: "2年「分数（2分の1・4分の1）」（ドリル）", href: "/learn/sansu-zukei/e-math-2-bunsu" },
  ],
};
