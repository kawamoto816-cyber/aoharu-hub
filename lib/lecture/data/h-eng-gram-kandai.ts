import type { Lecture } from "../types";

export const H_ENG_GRAM_KANDAI: Lecture = {
  unit: "h-eng-gram-kandai",
  title: "関係代名詞は「名詞を後ろから説明する」つなぎ。後ろの文の「穴」で選ぶ",
  hook: "日本語は「パリに住んでいる友だち」と説明を名詞の前に置きますが、英語は a friend who lives in Paris と後ろに置きます。長文の1文が長くなるのは、たいていこの後ろからの説明のせいです。関係代名詞のしくみが分かると、長い英文の切れ目が見えてきます。",
  sections: [
    {
      heading: "2つの文を、名詞のところでつなぐ",
      body: "関係代名詞は、2つの文に共通する名詞（{{先行詞}}）のところで文をつなぎます。2文目の代名詞を who や which に変えて、先行詞の{{すぐ後ろ}}に置くと、2文目がまるごと先行詞の説明になります。説明の部分（{{関係詞節}}）は、形容詞のように名詞を修飾しています。",
      figure: {
        type: "formula",
        title: "2つの文を1つにする",
        prose: true,
        steps: [
          { expr: "I have {{a friend}}. + {{He}} lives in Paris.", note: "a friend と He は同じ人" },
          { expr: "I have a friend {{who}} lives in Paris.", note: "He を who に変えて a friend の後ろへ" },
          { expr: "This is {{the book}} {{which}} I bought.", note: "目的語 it を which に。which は前へ出る" },
        ],
      },
    },
    {
      heading: "先行詞と「格」で、使う語が決まる",
      body: "先行詞が{{人}}なら who、{{人以外}}なら which、どちらにも that が使えます。さらに、関係代名詞が後ろの文で{{主語}}のかわりなら主格、{{目的語}}のかわりなら目的格、{{〜の}}にあたるなら所有格の whose です。whose は物にも使えます。",
      figure: {
        type: "compare",
        title: "関係代名詞の表",
        columns: [{ title: "格", tone: "navy" }, { title: "先行詞が人", tone: "yellow" }, { title: "人以外", tone: "blue" }],
        rows: [
          { cells: ["主格", "who / that", "which / that"] },
          { cells: ["所有格", "whose", "whose"] },
          { cells: ["目的格（省略可）", "who(m) / that", "which / that"] },
        ],
        note: "that は人にも物にも使えるが、所有格はない。目的格はよく省略される：the book (which) I bought。",
      },
    },
    {
      heading: "後ろの文の「穴」を見て格を決める",
      body: "関係代名詞の後ろは、名詞が1つ{{欠けた不完全な文}}になります。動詞の前の主語が欠けていれば主格、動詞や前置詞の後ろの目的語が欠けていれば目的格です。名詞の前に「〜の」が欠けていて、後ろが完全な文なら whose です。後ろが欠けのない{{完全な文}}なら、関係代名詞ではなく関係副詞（where, when など）を考えます。",
      figure: {
        type: "tree",
        title: "関係詞の後ろに何が欠けているか",
        root: {
          label: "関係詞の後ろの文",
          tone: "navy",
          children: [
            { label: "主語が欠ける", sub: "who lives …", children: [{ label: "主格 who / which", tone: "blue" }] },
            { label: "目的語が欠ける", sub: "which I bought ＿", children: [{ label: "目的格（省略可）", tone: "red" }] },
            { label: "「〜の」が欠ける", sub: "whose father is …", children: [{ label: "所有格 whose", tone: "yellow" }] },
            { label: "欠けがない", sub: "where I was born", children: [{ label: "関係副詞へ" }] },
          ],
        },
      },
    },
    {
      heading: "what と、コンマのある非制限用法",
      body: "{{what}} は先行詞をふくんだ関係代名詞で、the thing(s) which と同じく「〜すること・もの」の意味です。What he said is true. のように、what の前に先行詞は置きません。また、先行詞の後ろに{{コンマ}}を置いて , who 〜 / , which 〜 とすると、先行詞に「ちなみに」と情報をつけ足す{{非制限用法}}になります。非制限用法に that は使えません。",
      figure: {
        type: "compare",
        title: "コンマがあるかないか",
        columns: [{ title: "制限用法", tone: "blue" }, { title: "非制限用法", tone: "yellow" }],
        rows: [
          { label: "例", cells: ["a son who is a doctor", "a son{{,}} who is a doctor"] },
          { label: "意味", cells: ["医者の息子（他にも息子がいるかも）", "息子が1人いて、彼は医者"] },
          { label: "that", cells: ["使える", "使えない"] },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "This is the house which I live.", right: "This is the house which I live in.（in which I live / where I live）", why: "live は自動詞なので、目的語の穴を作るには前置詞 in が必要です。" },
    { wrong: "The thing what I want is a new bike.", right: "What I want is a new bike.（The thing which I want …）", why: "what は先行詞をふくむので、前に名詞（先行詞）を置きません。" },
    { wrong: "I met Ken, that is my cousin.", right: "I met Ken, who is my cousin.", why: "コンマのある非制限用法では that は使えません。" },
    { wrong: "the house in that he lives", right: "the house in which he lives", why: "前置詞のすぐ後ろに that は置けません。which か whom を使います。" },
  ],
  check: [
    { q: "I know a girl ___ mother is a pilot.", a: "whose", why: "後ろの mother is a pilot は完全な文で、「その少女の」母が欠けているので所有格。" },
    { q: "The bag ___ he bought was expensive. で、___ を省略できるか。", a: "できる（目的格の which / that）", why: "bought の目的語が欠けているので目的格。目的格は省略できる。" },
    { q: "___ she told me surprised everyone.（the thing which の意味）", a: "What", why: "先行詞をふくむ「〜すること」は what。" },
  ],
  next: [
    { label: "4択ドリル「関係代名詞」に挑戦", href: "/learn/eibunpo-ko/h-eng-gram-kandai" },
    { label: "つぎの単元「関係副詞」", href: "/learn/eibunpo-ko/h-eng-gram-kanfuku" },
    { label: "関連「分詞」（後ろから名詞を修飾）", href: "/learn/eibunpo-ko/h-eng-gram-bunshi" },
  ],
};
