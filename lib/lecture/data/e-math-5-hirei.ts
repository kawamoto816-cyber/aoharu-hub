import type { Lecture } from "../types";

export const E_MATH_5_HIREI: Lecture = {
  unit: "e-math-5-hirei",
  title: "比例は「一方が2倍、3倍になると、もう一方も2倍、3倍」",
  hook: "1m80円のリボンを2m買うと160円、3m買うと240円。長さがふえると代金もふえますが、その「ふえ方」にはきまりがあります。比例がわかると、表にない長さの代金も、すぐに求められます。",
  sections: [
    {
      heading: "2倍、3倍になると、もう一方も2倍、3倍",
      body: "2つの量□と○があって、□が2倍、3倍…になると、○も{{2倍、3倍…}}になるとき、「○は□に{{比例する}}」といいます。リボンの長さが2倍になると、代金も2倍です。線分図にすると、1m分の80円が、長さの数だけならびます。",
      figure: {
        type: "area",
        kind: "bar",
        title: "1m80円のリボンの長さと代金",
        max: 240,
        bars: [
          { label: "1m", parts: [{ value: 80, label: "80円", tone: "blue" }], total: "80円" },
          {
            label: "2m（2倍）",
            parts: [
              { value: 80, label: "80円", tone: "blue" },
              { value: 80, label: "80円", tone: "yellow" },
            ],
            total: "160円",
          },
          {
            label: "3m（3倍）",
            parts: [
              { value: 80, label: "80円", tone: "blue" },
              { value: 80, label: "80円", tone: "yellow" },
              { value: 80, label: "80円", tone: "blue" },
            ],
            total: "240円",
          },
        ],
      },
    },
    {
      heading: "表で、きまりをたしかめる",
      body: "長さと代金を表にすると、どの行も{{代金÷長さ＝80}}で同じ数になります。この80は「1mあたりの代金」です。比例する2つの量では、○÷□がいつも同じになります。",
      figure: {
        type: "compare",
        title: "長さと代金の表",
        columns: [{ title: "長さ □m", tone: "blue" }, { title: "代金 ○円", tone: "yellow" }, { title: "○÷□" }],
        rows: [
          { cells: ["1", "80", "80"] },
          { cells: ["2", "160", "80"] },
          { cells: ["3", "240", "80"] },
          { cells: ["4", "320", "80"] },
        ],
      },
    },
    {
      heading: "式に表すと、どんな長さでも求められる",
      body: "代金はいつも長さの80倍なので、{{○＝80×□}}という式に表せます。式があれば、表にない7mの代金も、□に7を入れるだけで求められます。",
      figure: {
        type: "formula",
        title: "式を使って7mの代金を求める",
        prose: true,
        steps: [
          { expr: "○ ＝ 80 × □", note: "1mあたり80円" },
          { expr: "○ ＝ 80 × {{7}}", note: "□に7を入れる" },
          { expr: "○ ＝ {{560}}", note: "7mで560円" },
        ],
      },
    },
    {
      heading: "ふえるだけでは、比例とはいえない",
      body: "一方がふえるともう一方もふえる、というだけでは比例ではありません。正方形の1辺が2倍になると、{{面積は4倍}}になるので比例しません。○＝□＋3のように、□が1ふえると○も1ふえる関係も、2倍にはならないので比例ではありません。",
      figure: {
        type: "compare",
        title: "比例するかどうか（□を2倍にしてみる）",
        columns: [{ title: "○はどうなる？", tone: "blue" }, { title: "比例？", tone: "yellow" }],
        rows: [
          { label: "正方形の1辺と周り", cells: ["2倍になる", "する"] },
          { label: "正方形の1辺と面積", cells: ["4倍になる", "しない"] },
          { label: "○＝□＋3", cells: ["2倍にならない", "しない"] },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "□がふえると○もふえるので、比例している", right: "□が2倍のとき○も2倍か、たしかめる", why: "正方形の1辺と面積のように、ふえても2倍にならない関係があります。" },
    { wrong: "表で、○が同じ数ずつふえるから比例", right: "○÷□がいつも同じか見る", why: "○＝□＋3も同じ数ずつふえますが、比例ではありません。" },
  ],
  check: [
    { q: "1こ30gのおはじきがあります。12こでは何gですか。", a: "360g", why: "重さはこ数に比例します。30×12＝360。" },
    { q: "1本60円のえんぴつ□本の代金を○円とします。○を□の式で表しましょう。", a: "○＝60×□", why: "代金は本数の60倍です。" },
    { q: "正方形の1辺の長さと周りの長さは、比例しますか。", a: "比例する", why: "周りはいつも1辺の4倍なので、1辺が2倍になると周りも2倍です。" },
  ],
  next: [
    { label: "練習する：比例", href: "/learn/sansu-zukei/e-math-5-hirei" },
    { label: "ふりかえり：ともなって変わる量（図解）", href: "/learn/lecture/e-math-4-kawarikata" },
    { label: "6年：比例と反比例", href: "/learn/sansu-zukei/e-math-6-hirei-hanpirei" },
  ],
};
