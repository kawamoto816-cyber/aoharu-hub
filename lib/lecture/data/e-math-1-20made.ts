import type { Lecture } from "../types";

export const E_MATH_1_20MADE: Lecture = {
  unit: "e-math-1-20made",
  nameRuby: "20までの数《かず》",
  title: "20までのかず：10のまとまりと、ばら",
  hook: "きょうしつのいすは、なんこあるかな。10より大きいかずは、まとめるとかぞえやすくなります。",
  sections: [
    {
      heading: "10のまとまりをつくる",
      body: "おはじきを{{10こずつ}}まとめると、かぞえやすくなります。13は、10と3です。20は、10と10です。",
      figure: {
        type: "area",
        kind: "bar",
        title: "10と いくつ",
        max: 20,
        bars: [
          { label: "13", parts: [{ value: 10, label: "10", tone: "blue" }, { value: 3, label: "3", tone: "yellow" }], total: "13こ" },
          { label: "17", parts: [{ value: 10, label: "10", tone: "blue" }, { value: 7, label: "7", tone: "yellow" }], total: "17こ" },
          { label: "20", parts: [{ value: 10, label: "10", tone: "blue" }, { value: 10, label: "10", tone: "blue" }], total: "20こ" },
        ],
        note: "あおが10のまとまり、きいろがばらです。",
      },
    },
    {
      heading: "十のくらいと一のくらい",
      body: "13の1は、{{10が1つ}}あることです。3は、{{ばらが3こ}}あることです。左が十のくらい、右が一のくらいです。",
      figure: {
        type: "compare",
        title: "くらいに わけて見る",
        columns: [{ title: "かず" }, { title: "十のくらい", tone: "blue" }, { title: "一のくらい", tone: "yellow" }],
        rows: [
          { cells: ["13", "1（10が1つ）", "3（ばら3こ）"] },
          { cells: ["17", "1（10が1つ）", "7（ばら7こ）"] },
          { cells: ["20", "2（10が2つ）", "0（ばらなし）"] },
        ],
      },
    },
    {
      heading: "じゅんばんと、とびとび",
      body: "かずは、{{1つずつ大きく}}なっていきます。12のつぎは13、19のつぎは20です。2とびや5とびでも、かぞえられます。",
      figure: {
        type: "formula",
        title: "いろいろな かぞえかた",
        prose: true,
        steps: [
          { label: "1ずつ", expr: "11、12、13、14、15" },
          { label: "2とび", expr: "2、4、6、8、{{10}}、12" },
          { label: "5とび", expr: "5、{{10}}、15、{{20}}" },
        ],
      },
    },
    {
      heading: "10といくつの けいさん",
      body: "10＋4は、10と4で{{14}}です。14−4は、ばらの4をとって{{10}}です。10のまとまりを見ると、すぐにわかります。",
      figure: {
        type: "area",
        kind: "bar",
        title: "10のまとまりは そのまま",
        max: 14,
        bars: [
          { label: "10＋4", parts: [{ value: 10, label: "10", tone: "blue" }, { value: 4, label: "＋4", tone: "yellow" }], total: "14" },
          { label: "14−4", parts: [{ value: 10, label: "のこり 10", tone: "blue" }, { value: 4, label: "とる 4", tone: "red" }], total: "10" },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "13を「103」とかく", right: "13", why: "10が1つで1、ばら3こで3。ならべて13です。" },
    { wrong: "19のつぎを「110」とする", right: "20", why: "ばらが10こになると、10のまとまりが2つになります。" },
    { wrong: "14−4を「4」とする", right: "14−4＝10", why: "とるのは、ばらの4こだけです。10はのこります。" },
  ],
  check: [
    { q: "10と6で、いくつですか。", a: "16", why: "10のまとまり1つと、ばら6こです。" },
    { q: "18は、10といくつですか。", a: "8", why: "一のくらいが8です。" },
    { q: "15−5は、いくつですか。", a: "10", why: "ばらの5をとると、10がのこります。" },
  ],
  next: [
    { label: "計算《けいさん》の段《だん》「20までのかず」", href: "/learn/sansu/3" },
    { label: "ふりかえり「10までのかず」", href: "/learn/sansu-zukei/e-math-1-10made" },
    { label: "「100までのかず」", href: "/learn/sansu/7" },
  ],
};
