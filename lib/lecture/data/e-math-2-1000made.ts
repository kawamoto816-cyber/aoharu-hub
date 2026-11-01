import type { Lecture } from "../types";

const hundreds = (n: number, tone: "blue" | "yellow") => Array.from({ length: n }, () => ({ value: 100, label: "100", tone }));

export const E_MATH_2_1000MADE: Lecture = {
  unit: "e-math-2-1000made",
  title: "1000までの 数は「100の まとまり」で 見る",
  hook: "おはじきが 347こ あります。1こずつ 数えると たいへんです。100や 10の まとまりを 作ると、すぐに 数が わかります。",
  sections: [
    {
      heading: "百のくらいが ふえる",
      body: "{{10が 10こで 100（百）}}です。100が 3こ、10が 4こ、1が 7こで 347です。3は {{百のくらい}}、4は 十のくらい、7は 一のくらいの 数字です。",
      figure: {
        type: "compare",
        title: "347 の くらい",
        columns: [
          { title: "百のくらい", tone: "navy" },
          { title: "十のくらい", tone: "blue" },
          { title: "一のくらい", tone: "yellow" },
        ],
        rows: [{ cells: ["3", "4", "7"] }, { cells: ["100が 3こ", "10が 4こ", "1が 7こ"] }],
      },
    },
    {
      heading: "ない くらいには 0を 書く",
      body: "100が 4こと 1が 5こ なら 405です。十のくらいに 何も ない ときは {{0を 書きます}}。0を わすれると 45に なって しまいます。",
      figure: {
        type: "formula",
        title: "100が 4こと 1が 5こ",
        prose: true,
        steps: [
          { label: "百のくらい", expr: "100が 4こ → 4", note: "400" },
          { label: "十のくらい", expr: "10は ない → {{0}}", note: "あけずに 0" },
          { label: "一のくらい", expr: "1が 5こ → 5", note: "5" },
          { label: "数", expr: "4{{0}}5", note: "四百五" },
        ],
      },
    },
    {
      heading: "1000は 100が 10こ",
      body: "999より 1 大きい 数が {{1000（千）}}です。1000は {{100を 10こ}} あつめた 数です。700は 100が 7こなので、あと 3こで 1000に なります。",
      figure: {
        type: "area",
        kind: "bar",
        title: "100の まとまりで 見る 1000",
        max: 1000,
        bars: [
          { label: "1000", parts: hundreds(10, "blue"), total: "100が 10こ" },
          { label: "700", parts: hundreds(7, "yellow"), total: "100が 7こ" },
        ],
        scale: [
          { at: 0, label: "0" },
          { at: 500, label: "500" },
          { at: 700, label: "700" },
          { at: 1000, label: "1000" },
        ],
      },
    },
    {
      heading: "大きい くらいから くらべる",
      body: "数の 大きさは、{{百のくらいから じゅんに}} くらべます。528と 582は、百のくらいが どちらも 5です。そこで 十のくらいを くらべます。2より 8が 大きいので、528＜582 です。",
      figure: {
        type: "flow",
        dir: "row",
        title: "528 と 582 を くらべる",
        steps: [
          { label: "百のくらい", sub: "5と 5で 同じ", tone: "blue" },
          { label: "十のくらい", sub: "2より 8が 大きい", tone: "yellow" },
          { label: "582が 大きい", sub: "528＜582", tone: "navy" },
        ],
      },
    },
    {
      heading: "何百の 計算は 100の 数で",
      body: "500＋300 は、{{100が 5こと 3こ}}で 8こです。だから 800 です。ひき算も 同じで、800−500 は 100が 3こで 300 です。",
    },
  ],
  mistakes: [
    {
      wrong: "四百五を 45 や 4005 と 書く",
      right: "405 と 書く",
      why: "十のくらいは 0。くらいは 3つ だけです。",
    },
    {
      wrong: "100が 10こを 10000 と 思う",
      right: "100が 10こで 1000",
      why: "1000は 100を 10こ あつめた 数です。",
    },
    {
      wrong: "396と 412 で、一のくらいの 6と 2を くらべる",
      right: "百のくらいの 3と 4を くらべる",
      why: "大きい くらいから くらべます。412の ほうが 大きいです。",
    },
  ],
  check: [
    { q: "100が 6こ、10が 2こ、1が 9こで いくつ？", a: "629", why: "百のくらい 6、十のくらい 2、一のくらい 9。" },
    { q: "100が 7こ、1が 3こで いくつ？", a: "703", why: "10が ないので 十のくらいは 0。" },
    { q: "1000は 100が 何こ？", a: "10こ", why: "100を 10こ あつめると 1000です。" },
  ],
  next: [
    { label: "計算の だんで「何百の たし算・ひき算」", href: "/learn/sansu/18" },
    { label: "10000までの 数（ドリル）", href: "/learn/sansu-zukei/e-math-2-10000made" },
    { label: "1年の「100までの 数」（レクチャー）", href: "/learn/lecture/e-math-1-100made" },
  ],
};
