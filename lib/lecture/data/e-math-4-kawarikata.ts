import type { Lecture } from "../types";

export const E_MATH_4_KAWARIKATA: Lecture = {
  unit: "e-math-4-kawarikata",
  title: "ともなって変わる2つの量は、表にしてきまりを見つける",
  hook: "正方形の1辺を長くすると、まわりの長さも長くなります。弟が1才大きくなると、兄も1才大きくなります。一方が変わると、もう一方も変わる2つの量には、かくれた「きまり」があります。きまりがわかれば、表にない数もすぐに求められます。",
  sections: [
    {
      heading: "まず表に整理する",
      body: "1辺が○cmの正方形のまわりの長さを△cmとします。○を1、2、3…と変えて{{表に書くと}}、△は4、8、12…と変わります。表を横に見ると「○が1ふえると△は4ふえる」、たてに見ると「△は○の4倍」というきまりが見えてきます。",
      figure: {
        type: "compare",
        title: "正方形の1辺とまわりの長さ",
        columns: [{ title: "1辺 ○（cm）", tone: "blue" }, { title: "まわり △（cm）", tone: "yellow" }],
        rows: [
          { cells: ["1", "4"] },
          { cells: ["2", "8"] },
          { cells: ["3", "12"] },
          { cells: ["4", "16"] },
        ],
        note: "どの行も △ は ○ の4倍。",
      },
    },
    {
      heading: "和がいつも同じになる",
      body: "まわりの長さが20cmの長方形を、たてと横の長さを変えて作ります。たてと横は2本ずつあるので、{{たて＋横はまわりの半分の10cm}}です。たてが長くなると、そのぶん横が短くなり、和はいつも10のままです。式に表すと ○＋△＝10 です。",
      figure: {
        type: "area",
        kind: "bar",
        title: "まわり20cmの長方形：たて＋横＝10cm",
        max: 10,
        bars: [
          { label: "たて1cm", parts: [{ value: 1, label: "1", tone: "blue" }, { value: 9, label: "横 9", tone: "yellow" }], total: "10cm" },
          { label: "たて3cm", parts: [{ value: 3, label: "3", tone: "blue" }, { value: 7, label: "横 7", tone: "yellow" }], total: "10cm" },
          { label: "たて6cm", parts: [{ value: 6, label: "6", tone: "blue" }, { value: 4, label: "横 4", tone: "yellow" }], total: "10cm" },
        ],
        scale: [
          { at: 0, label: "0" },
          { at: 10, label: "10cm" },
        ],
      },
    },
    {
      heading: "差がいつも同じになる",
      body: "兄が8才、弟が5才のとき、年れいの差は3才です。1年たつと2人とも1才ずつ大きくなるので、{{差は何年たっても3才}}のままです。弟を○才、兄を△才とすると、△−○＝3 と表せます。",
      figure: {
        type: "area",
        kind: "bar",
        title: "兄と弟の年れい",
        max: 10,
        bars: [
          { label: "弟（今）", parts: [{ value: 5, label: "5才", tone: "blue" }] },
          { label: "兄（今）", parts: [{ value: 5, label: "5才", tone: "blue" }, { value: 3, label: "差3", tone: "red" }], total: "8才" },
          { label: "弟（2年後）", parts: [{ value: 7, label: "7才", tone: "yellow" }] },
          { label: "兄（2年後）", parts: [{ value: 7, label: "7才", tone: "yellow" }, { value: 3, label: "差3", tone: "red" }], total: "10才" },
        ],
        note: "2人とも同じだけ大きくなるので、赤い差の部分は変わらない。",
      },
    },
    {
      heading: "きまりを式にすると、どんな数でも求められる",
      body: "正方形のまわりは、1辺の4つ分なので{{△＝○×4}}です。式があれば、1辺が7cmのときも表をのばさずに 7×4＝28cm と求められます。反対に△から○を求めるときは、{{×4をわり算でもどして}} ○＝△÷4 です。",
      figure: {
        type: "formula",
        title: "1辺○cm、まわり△cmの正方形",
        prose: true,
        steps: [
          { expr: "○が1ふえると、△は4ふえる", note: "表を横に見る" },
          { expr: "{{△＝○×4}}", note: "きまりを式に" },
          { expr: "○＝7 のとき △＝7×4＝{{28}}", note: "○から△を求める" },
          { expr: "△＝36 のとき ○＝36{{÷4}}＝{{9}}", note: "△から○を求める" },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "まわり20cmの長方形で「たて＋横＝20」とする", right: "たて＋横＝10", why: "長方形のまわりには、たてと横が2本ずつあります。たて＋横はまわりの半分です。" },
    { wrong: "年れいの差は、年がたつほど大きくなる", right: "差はいつも同じ", why: "2人とも1年に1才ずつ大きくなるので、ふえ方が同じ。差は変わりません。" },
    { wrong: "△＝○×4 で △が36のとき、○＝36×4", right: "○＝36÷4＝9", why: "○に4をかけたものが△。△から○にもどすには4でわります。" },
  ],
  check: [
    { q: "1辺が9cmの正方形のまわりの長さは何cmですか。", a: "36cm", why: "△＝○×4 なので 9×4＝36。" },
    { q: "まわりが20cmの長方形で、たてが3cmのとき、横は何cmですか。", a: "7cm", why: "たて＋横＝10 なので 10−3＝7。" },
    { q: "兄が12才、弟が8才です。弟が20才のとき、兄は何才ですか。", a: "24才", why: "差はいつも4才。20＋4＝24。" },
  ],
  next: [
    { label: "「変わり方」のドリル", href: "/learn/sansu-zukei/e-math-4-kawarikata" },
    { label: "「折れ線グラフ」（ドリル）", href: "/learn/sansu-zukei/e-math-4-oresen" },
    { label: "5年「ひれい」（ドリル）", href: "/learn/sansu-zukei/e-math-5-hirei" },
  ],
};
