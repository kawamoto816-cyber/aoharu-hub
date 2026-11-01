import type { Lecture } from "../types";

export const E_JAPANESE_1_NAKAMA: Lecture = {
  unit: "e-japanese-1-nakama",
  nameRuby: "なかまの言葉《ことば》",
  title: "なかまの ことば：まとめて よぶ 名まえ",
  hook: "りんご、みかん、バナナ。まとめて なんと よぶかな。そう、「くだもの」です。なかまの ことばを しると、ものを わけやすく なります。",
  sections: [
    {
      heading: "まとめて よぶ ことば",
      body: "りんごや みかんは、まとめて {{くだもの}}と よびます。「くだもの」は、なかまを {{まとめる ことば}}です。りんごは、くだものの なかまの 1つです。",
      figure: {
        type: "tree",
        title: "くだものの なかま",
        root: {
          label: "くだもの",
          tone: "yellow",
          children: [{ label: "りんご" }, { label: "みかん" }, { label: "バナナ" }, { label: "ぶどう" }],
        },
      },
    },
    {
      heading: "いろいろな なかま",
      body: "いぬや ねこは {{どうぶつ}}です。でんしゃや バスは {{のりもの}}です。えんぴつや けしゴムは {{ぶんぼうぐ}}です。",
      figure: {
        type: "compare",
        title: "なかまの 名まえと 入る もの",
        columns: [{ title: "なかまの 名まえ", tone: "yellow" }, { title: "入る もの", tone: "blue" }],
        rows: [
          { cells: ["どうぶつ", "いぬ・ねこ・うさぎ"] },
          { cells: ["のりもの", "でんしゃ・バス・ふね"] },
          { cells: ["ぶんぼうぐ", "えんぴつ・けしゴム"] },
          { cells: ["いろ", "あか・あお・きいろ"] },
          { cells: ["きせつ", "はる・なつ・あき・ふゆ"] },
        ],
      },
    },
    {
      heading: "大きい なかま、小さい なかま",
      body: "なかまの 中に、もっと 小さい なかまが あります。りんごも にんじんも {{たべもの}}です。たべものは、{{くだもの}}と {{やさい}}に わけられます。",
      figure: {
        type: "tree",
        title: "たべものを わける",
        root: {
          label: "たべもの",
          tone: "navy",
          children: [
            { label: "くだもの", tone: "yellow", children: [{ label: "りんご" }, { label: "みかん" }] },
            { label: "やさい", tone: "blue", children: [{ label: "にんじん" }, { label: "キャベツ" }] },
          ],
        },
      },
    },
    {
      heading: "なかまはずれを さがす",
      body: "ことばを ならべて、{{なかまで ない もの}}を さがして みましょう。「いぬ・ねこ・バス・うさぎ」なら、バスです。バスは、{{のりもの}}の なかまだからです。",
      figure: {
        type: "flow",
        dir: "col",
        title: "なかまはずれの 見つけ方《かた》",
        steps: [
          { label: "4つの ことば", sub: "いぬ・ねこ・バス・うさぎ" },
          { label: "なかまを 考《かんが》える", sub: "3つは どうぶつ" },
          { label: "なかまはずれ", sub: "バス（のりもの）", tone: "yellow" },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "「くだもの」と いう くだものが ある", right: "「くだもの」は まとめる ことば", why: "りんごや みかんを、まとめて よぶ 名まえです。" },
    { wrong: "にんじんは くだもの", right: "にんじんは やさい", why: "くだものと やさいは、べつの なかまです。" },
    { wrong: "けしゴムは のりもの", right: "けしゴムは ぶんぼうぐ", why: "学校で 字を 書《か》く ときに 使《つか》う ものの なかまです。" },
  ],
  check: [
    { q: "「あか・あお・きいろ」を まとめて よぶと？", a: "いろ", why: "どれも いろの 名まえです。" },
    { q: "「はる・なつ・あき・ふゆ」を まとめて よぶと？", a: "きせつ", why: "1年の 中の 4つの きせつです。" },
    { q: "「すずめ・からす・ねこ・はと」の なかまはずれは？", a: "ねこ", why: "ほかの 3つは とりの なかまです。" },
  ],
  next: [
    { label: "「なかまの 言葉《ことば》」カード", href: "/learn/kokugo-sho/e-japanese-1-nakama" },
    { label: "2年「なかまの 言葉《ことば》」", href: "/learn/kokugo-sho/e-japanese-2-nakama" },
    { label: "かたかな（図解《ずかい》レクチャー）", href: "/learn/lecture/e-japanese-1-katakana" },
  ],
};
