import type { Lecture } from "../types";

export const H_ENG_GRAM_KANFUKU: Lecture = {
  unit: "h-eng-gram-kanfuku",
  title: "関係副詞は「前置詞＋ which」の代わり。後ろには欠けのない文が続く",
  hook: "「ぼくが育った町」「初めて会った日」のように、場所や時を後ろから説明したい場面はよくあります。英語では where や when を使って the town where I grew up と言います。関係代名詞との見分け方を一度つかめば、長文で名詞のあとに続く説明がすっと読めるようになります。",
  sections: [
    {
      heading: "4つの関係副詞と先行詞",
      body: "関係副詞は {{where}}（場所）・{{when}}（時）・{{why}}（理由）・{{how}}（方法）の4つです。先行詞の種類で使い分けます。why の先行詞はほぼ {{the reason}} だけです。how は {{the way と並べて使えず}}、the way か how のどちらか一方だけを書きます。",
      figure: {
        type: "compare",
        title: "関係副詞と先行詞",
        columns: [{ title: "先行詞", tone: "yellow" }, { title: "例" }],
        rows: [
          { label: "where", cells: ["場所（town など）", "a park where we play"] },
          { label: "when", cells: ["時（day など）", "the day when we met"] },
          { label: "why", cells: ["理由（the reason）", "the reason why I won"] },
          { label: "how", cells: ["方法（先行詞なし）", "how I solved it"] },
        ],
        note: "how の文は the way I solved it とも言える（the way how は ×）。",
      },
    },
    {
      heading: "関係副詞＝前置詞＋ which",
      body: "関係副詞は、{{前置詞＋ which}} を1語にまとめたものです。2つの文をつなぐとき、後ろの文の in it・on that day などの{{副詞のまとまり}}が関係副詞に変わります。だから関係副詞の後ろには、主語も目的語もそろった{{完全な文}}が続きます。",
      figure: {
        type: "formula",
        title: "2つの文を1つにつなぐ",
        prose: true,
        steps: [
          { expr: "This is the house. I was born {{in it}}.", note: "in it は場所を表す副詞のまとまり" },
          { expr: "This is the house {{which}} I was born {{in}}.", note: "関係代名詞。前置詞が後ろに残る" },
          { expr: "This is the house {{in which}} I was born.", note: "前置詞を which の前に" },
          { expr: "This is the house {{where}} I was born.", note: "in which を where 1語に" },
        ],
      },
    },
    {
      heading: "which か where か：後ろの文が欠けているかで決める",
      body: "先行詞が場所だからといって、いつも where になるわけではありません。決め手は{{後ろの文の形}}です。動詞や前置詞の{{目的語が欠けている}}なら関係代名詞 which / that、{{何も欠けていない}}なら関係副詞 where です。the town which I visited は visit の目的語が欠けているので which になります。",
      figure: {
        type: "tree",
        title: "先行詞が場所のときの見分け方",
        root: {
          label: "後ろの文を見る",
          tone: "navy",
          children: [
            { label: "名詞が欠けている", sub: "I visited ___", children: [{ label: "which / that", sub: "関係代名詞", tone: "blue" }] },
            { label: "欠けていない", sub: "I live（完全）", children: [{ label: "where", sub: "関係副詞", tone: "yellow" }] },
          ],
        },
        note: "live は自動詞なので目的語は要らない。live in it の in it が where になる。",
      },
    },
    {
      heading: "コンマのある用法と、先行詞の省略",
      body: "where と when は、コンマをつけて先行詞に{{補足の説明}}を加えることができます（{{非制限用法}}）。I went to Nara, where I saw many deer. は「奈良へ行き、そこで…」と前から順に訳します。why と how にはこの用法はありません。また、the place・the time・the reason のような分かりきった先行詞は{{省略}}されることがあり、This is why 〜（こういうわけで〜）のような形になります。",
      figure: {
        type: "flow",
        title: "非制限用法は前から順に訳す",
        steps: [
          { label: "奈良へ行った", sub: "went to Nara,", tone: "blue" },
          { label: "where", sub: "そしてそこで", tone: "yellow" },
          { label: "シカを見た", sub: "saw many deer.", tone: "blue" },
        ],
        note: ", where ＝ and there、, when ＝ and then と考える。",
      },
    },
  ],
  mistakes: [
    { wrong: "This is the town where I visited last year.", right: "This is the town which (that) I visited last year.", why: "visit の目的語が欠けているので、関係代名詞を使います。" },
    { wrong: "Tell me the way how you made it.", right: "Tell me the way you made it. / Tell me how you made it.", why: "the way と how は並べて使いません。どちらか一方にします。" },
    { wrong: "Kyoto is the city which I was born.", right: "Kyoto is the city where (in which) I was born.", why: "I was born は欠けのない文なので、関係副詞か前置詞＋ which にします。" },
  ],
  check: [
    { q: "I remember the day ___ we first met.", a: "when", why: "先行詞が時（the day）で、後ろの文は欠けがない。" },
    { q: "This is the museum ___ I want to see.", a: "which (that)", why: "see の目的語が欠けているので関係代名詞。" },
    { q: "He was sick. That's ___ he was absent. の ___ は？", a: "why", why: "the reason が省略された That's why 〜（だから〜）。" },
  ],
  next: [
    { label: "4択ドリル「関係副詞」に挑戦", href: "/learn/eibunpo-ko/h-eng-gram-kanfuku" },
    { label: "ひとつ前「関係代名詞」", href: "/learn/eibunpo-ko/h-eng-gram-kandai" },
    { label: "関連「前置詞」", href: "/learn/eibunpo-ko/h-eng-gram-zenchishi" },
  ],
};
