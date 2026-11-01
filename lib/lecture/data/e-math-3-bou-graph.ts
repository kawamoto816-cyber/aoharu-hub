import type { Lecture } from "../types";

export const E_MATH_3_BOU_GRAPH: Lecture = {
  unit: "e-math-3-bou-graph",
  title: "ぼうグラフは「ぼうの長さ」で多い少ないをくらべる",
  hook: "クラスで、すきなきゅう食をしらべたとします。数をならべただけでは見くらべにくいことも、表やぼうグラフにすると、どれが一番多いかが一目でわかります。",
  sections: [
    {
      heading: "しらべて、正の字で数える",
      body: "1人ずつ聞きながら{{正の字}}を書いていくと、数えまちがいがへります。正の字は1つで5です。数え終わったら、数字の表にまとめます。",
      figure: {
        type: "flow",
        title: "しらべてから表にするまで",
        steps: [
          { label: "しらべる", sub: "1人ずつ聞く", tone: "blue" },
          { label: "正の字", sub: "1つで5", tone: "yellow" },
          { label: "表にする", sub: "数字と合計", tone: "navy" },
        ],
      },
    },
    {
      heading: "表のつくり方",
      body: "表には、何をしらべたかがわかる{{表題}}をつけます。しゅるいは数の多いじゅんにならべ、数の少ないものは{{「その他」}}にまとめて一番下におきます。合計も書くと、数えもれがないかをたしかめられます。",
      figure: {
        type: "compare",
        title: "すきなきゅう食（3年1組）",
        columns: [{ title: "しゅるい" }, { title: "人数（人）", tone: "blue" }],
        rows: [
          { cells: ["カレー", "9"] },
          { cells: ["からあげ", "7"] },
          { cells: ["ラーメン", "5"] },
          { cells: ["あげパン", "3"] },
          { cells: ["その他", "4"] },
          { cells: ["合計", "28"] },
        ],
        note: "「その他」は数が多くても一番下におく。",
      },
    },
    {
      heading: "ぼうの長さで数を表す",
      body: "表をぼうグラフにすると、{{ぼうの長さ}}で多い少ないが見えます。カレーのぼうはあげパンの3つ分の長さです。ぼうの太さと間はそろえて、長さだけでくらべられるようにします。",
      figure: {
        type: "area",
        kind: "bar",
        title: "すきなきゅう食（3年1組）",
        max: 10,
        bars: [
          { label: "カレー", parts: [{ value: 9, tone: "blue" }], total: "9人" },
          { label: "からあげ", parts: [{ value: 7, tone: "blue" }], total: "7人" },
          { label: "ラーメン", parts: [{ value: 5, tone: "blue" }], total: "5人" },
          { label: "あげパン", parts: [{ value: 3, tone: "blue" }], total: "3人" },
          { label: "その他", parts: [{ value: 4, tone: "plain" }], total: "4人" },
        ],
        scale: [
          { at: 0, label: "0" },
          { at: 5, label: "5" },
          { at: 10, label: "10" },
        ],
        scaleLabel: "人",
      },
    },
    {
      heading: "1目もりがいくつかを先に見る",
      body: "グラフの1目もりは、1人とはかぎりません。0から10までが5目もりなら、{{1目もりは2人}}です。ぼうが7目もりなら 2×7＝14人 と読みます。グラフをかくときも、一番多い数が入るように1目もりの大きさを決めます。",
      figure: {
        type: "area",
        kind: "bar",
        title: "1目もり2人のグラフを読む",
        max: 20,
        bars: [{ label: "図書室", parts: [{ value: 14, label: "7目もり", tone: "yellow" }], total: "14人" }],
        scale: [
          { at: 0, label: "0" },
          { at: 10, label: "10" },
          { at: 14, label: "14" },
          { at: 20, label: "20" },
        ],
        scaleLabel: "人",
        note: "0から10まで5目もり → 1目もりは 10÷5＝2人。",
      },
    },
  ],
  mistakes: [
    { wrong: "1目もりを、いつも1人として読む", right: "はじめに1目もりの大きさをしらべる", why: "1目もりが2人や5人のグラフもあります。目もりの数字から見つけます。" },
    { wrong: "「その他」を数のじゅんにまぜてならべる", right: "「その他」は一番さいごにかく", why: "その他はいろいろなしゅるいのまとまりなので、ほかとはべつにします。" },
    { wrong: "ぼうの太さや間をばらばらにかく", right: "太さと間はそろえる", why: "ぼうグラフは長さだけでくらべるグラフだからです。" },
  ],
  check: [
    { q: "1目もりが5人のグラフで、ぼうが4目もりです。何人ですか。", a: "20人", why: "5×4＝20。" },
    { q: "上の表で、カレーはあげパンより何人多いですか。", a: "6人", why: "9−3＝6。" },
    { q: "0から10までが10目もりのグラフの、1目もりは何人ですか。", a: "1人", why: "10÷10＝1。" },
  ],
  next: [
    { label: "ドリル：表とぼうグラフ", href: "/learn/sansu-zukei/e-math-3-bou-graph" },
    { label: "小2 表とグラフ", href: "/learn/sansu-zukei/e-math-2-hyo-graph" },
    { label: "小4 おれ線グラフ", href: "/learn/sansu-zukei/e-math-4-oresen" },
  ],
};
