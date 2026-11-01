import type { Lecture } from "../types";

export const E_MATH_5_BUNSU_TASHIHIKI: Lecture = {
  unit: "e-math-5-bunsu-tashihiki",
  title: "分母がちがう分数は、通分してからたす",
  hook: "ピザを1/2まい食べて、そのあと1/3まい食べました。全部でどれだけ？ 1/2と1/3は、1つ分の大きさがちがうので、このままではたせません。分母をそろえて「同じ大きさのいくつ分」にすれば、たし算もひき算もできます。",
  sections: [
    {
      heading: "大きさの等しい分数",
      body: "1/2、2/4、3/6は、書き方はちがっても{{同じ大きさ}}です。分母と分子に{{同じ数をかけても、同じ数でわっても}}、分数の大きさは変わりません。この性質を使って、分母をそろえたり、かんたんにしたりします。",
      figure: {
        type: "area",
        kind: "bar",
        title: "1/2＝2/4＝3/6",
        max: 6,
        bars: [
          { label: "1/2", parts: [{ value: 3, label: "1/2", tone: "blue" }, { value: 3, tone: "plain" }] },
          {
            label: "2/4",
            parts: [
              { value: 1.5, label: "1/4", tone: "blue" },
              { value: 1.5, label: "1/4", tone: "blue" },
              { value: 1.5, tone: "plain" },
              { value: 1.5, tone: "plain" },
            ],
          },
          {
            label: "3/6",
            parts: [
              { value: 1, tone: "blue" },
              { value: 1, tone: "blue" },
              { value: 1, tone: "blue" },
              { value: 1, tone: "plain" },
              { value: 1, tone: "plain" },
              { value: 1, tone: "plain" },
            ],
          },
        ],
        note: "青い部分の長さはどれも同じ。",
      },
    },
    {
      heading: "約分：分母と分子を同じ数でわる",
      body: "分母と分子を、その{{公約数でわって}}かんたんな分数にすることを{{約分}}といいます。{{最大公約数でわる}}と、1回で約分できます。答えが約分できるときは、約分してから答えます。",
      figure: {
        type: "formula",
        title: "12/18を約分する",
        prose: true,
        steps: [
          { expr: "12/18", note: "12と18の最大公約数は6" },
          { expr: "(12÷{{6}}) / (18÷{{6}})", note: "分母と分子を同じ数でわる" },
          { expr: "{{2/3}}", note: "これ以上われない" },
        ],
      },
    },
    {
      heading: "通分：分母を公倍数にそろえる",
      body: "分母がちがう分数を、分母が同じ分数に直すことを{{通分}}といいます。分母を{{2つの分母の公倍数}}（ふつうは最小公倍数）にそろえます。1/2と1/3なら、分母を6にして3/6と2/6。1/6のいくつ分かがそろうので、たせるようになります。",
      figure: {
        type: "area",
        kind: "bar",
        title: "1/2＋1/3 を1/6の数でたす",
        max: 6,
        bars: [
          { label: "1/2", parts: [{ value: 3, label: "3/6", tone: "blue" }, { value: 3, tone: "plain" }] },
          { label: "1/3", parts: [{ value: 2, label: "2/6", tone: "yellow" }, { value: 4, tone: "plain" }] },
          {
            label: "あわせて",
            parts: [
              { value: 3, label: "3/6", tone: "blue" },
              { value: 2, label: "2/6", tone: "yellow" },
              { value: 1, tone: "plain" },
            ],
            total: "5/6",
          },
        ],
        scale: [
          { at: 0, label: "0" },
          { at: 6, label: "1" },
        ],
      },
    },
    {
      heading: "たし算・ひき算は3つの手順",
      body: "分母がちがう分数の計算は、{{通分する→分子どうしを計算する→約分する}}の順に進めます。分母は1つ分の大きさを表すので、{{分母どうしはたしたりひいたりしません}}。",
      figure: {
        type: "flow",
        title: "5/6 − 1/3 の手順",
        steps: [
          { label: "通分する", sub: "5/6 − 2/6", tone: "blue" },
          { label: "分子をひく", sub: "＝ 3/6" },
          { label: "約分する", sub: "＝ 1/2", tone: "yellow" },
        ],
      },
    },
    {
      heading: "帯分数は、整数と分数に分けて",
      body: "帯分数のたし算は、{{整数どうし、分数どうし}}を計算します。分数の部分が1をこえたら、整数に1くり上げます。ひき算で分数の部分がひけないときは、整数から1くり下げます。",
      figure: {
        type: "formula",
        title: "1と1/2 ＋ 2/3",
        prose: true,
        steps: [
          { expr: "1と1/2 ＋ 2/3 ＝ 1と{{3/6}} ＋ {{4/6}}", note: "分数の部分を通分" },
          { expr: "＝ 1と{{7/6}}", note: "分子をたす（7/6は1より大きい）" },
          { expr: "＝ {{2と1/6}}", note: "7/6＝1と1/6 をくり上げる" },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "1/2＋1/3＝2/5（分母どうしもたす）", right: "3/6＋2/6＝5/6", why: "分母は「何等分したか」なので、たしません。通分して、分子だけをたします。" },
    { wrong: "通分で 1/2＝1/6 とする（分子にかけわすれる）", right: "1/2＝3/6", why: "分母に3をかけたら、分子にも3をかけます。そうしないと大きさが変わってしまいます。" },
    { wrong: "5/6−1/3＝3/6 で答えを終える", right: "3/6＝1/2 と約分して答える", why: "答えが約分できるときは、いちばんかんたんな分数にします。" },
  ],
  check: [
    { q: "1/4＋1/6 を計算しましょう。", a: "5/12", why: "4と6の最小公倍数12で通分。3/12＋2/12＝5/12。" },
    { q: "3/4−1/6 を計算しましょう。", a: "7/12", why: "9/12−2/12＝7/12。" },
    { q: "1/6＋1/2 を計算しましょう。", a: "2/3", why: "1/6＋3/6＝4/6。4と6を2でわって約分すると2/3。" },
  ],
  next: [
    { label: "計算の段《だん》で「分母がちがう分数のたし算」を練習する", href: "/learn/sansu/49" },
    { label: "公倍数・公約数の「倍数と約数」（図解）", href: "/learn/lecture/e-math-5-baisu-yakusu" },
    { label: "6年「分数のかけ算」（図解）", href: "/learn/lecture/e-math-6-bunsu-kake" },
  ],
};
