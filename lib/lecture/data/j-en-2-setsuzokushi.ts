import type { Lecture } from "../types";

export const J_EN_2_SETSUZOKUSHI: Lecture = {
  unit: "j-en-2-setsuzokushi",
  title: "接続詞は文と文をつなぐ。when・if・because のまとまりは前にも後ろにも置ける",
  hook: "「家に帰ったとき、母は料理をしていた」「もし明日晴れたら、海に行く」「つかれていたので、早く寝た」。こうした長めの文は、接続詞で2つの文をつないで作ります。接続詞が使えると、短い文を並べるだけの英語から、理由や条件まで伝えられる英語に変わります。",
  sections: [
    {
      heading: "接続詞は2つのグループに分けられる",
      body: "{{and・but・or・so}} は、前と後ろを{{対等に}}つなぎます。{{when・if・because・that}} は、「〜とき」「もし〜なら」「〜なので」「〜ということ」という{{まとまり}}を作り、もう一方の文にくっつけます。まずはそれぞれの意味を正しく覚えましょう。",
      figure: {
        type: "tree",
        title: "接続詞の2つのグループ",
        root: {
          label: "接続詞",
          children: [
            {
              label: "対等につなぐ",
              tone: "blue",
              children: [
                { label: "and", sub: "そして" },
                { label: "but", sub: "しかし" },
                { label: "or", sub: "または" },
                { label: "so", sub: "だから" },
              ],
            },
            {
              label: "まとまりを作る",
              tone: "yellow",
              children: [
                { label: "when", sub: "〜とき" },
                { label: "if", sub: "もし〜なら" },
                { label: "because", sub: "〜なので" },
                { label: "that", sub: "〜ということ" },
              ],
            },
          ],
        },
      },
    },
    {
      heading: "when・if・because のまとまりは前にも後ろにも",
      body: "When I got home, my mother was cooking. と My mother was cooking when I got home. は同じ意味です。まとまりを{{文の前に置くとき}}は、区切りに{{コンマ（,）}}を入れます。後ろに置くときはふつうコンマはいりません。日本語に訳すときは、接続詞のまとまりから先に訳すと自然になります。",
      figure: {
        type: "formula",
        title: "まとまりの位置を入れかえる",
        prose: true,
        steps: [
          { expr: "{{When I got home}}{{,}} my mother was cooking.", note: "前に置く → コンマ" },
          { expr: "My mother was cooking {{when I got home}}.", note: "後ろに置く → コンマなし" },
          { expr: "{{If you are busy}}{{,}} I will help you.", note: "if も同じ" },
          { expr: "I will help you {{if you are busy}}.", note: "意味は変わらない" },
        ],
      },
    },
    {
      heading: "because は原因の前、so は結果の前",
      body: "{{because}} は「〜なので」と{{原因・理由}}の前に置きます。{{so}} は「だから」と{{結果}}の前に置きます。同じ内容でも、どちらを使うかで接続詞を置く場所が変わります。Why 〜? の質問には Because 〜. で答えることもできます。",
      figure: {
        type: "cause",
        title: "同じ内容を because と so で",
        causes: [{ label: "つかれていた", sub: "I was tired", tone: "blue" }],
        effect: { label: "早く寝た", sub: "I went to bed early", tone: "yellow" },
        note: "I went to bed early because I was tired. ＝ I was tired, so I went to bed early.",
      },
    },
    {
      heading: "if・when のまとまりの中は、未来でも現在形",
      body: "「もし明日雨が降ったら」は未来のことですが、{{if や when のまとまりの中では現在形}}を使います。If it rains tomorrow, I will stay home. の rains がその例で、will rain にはしません。一方、まとまりの外の「家にいる」は未来なので will を使います。",
      figure: {
        type: "formula",
        title: "if の中は現在形、外は will",
        prose: true,
        steps: [
          { expr: "If it {{will rain}} tomorrow, ...", note: "× if の中に will は使わない" },
          { expr: "If it {{rains}} tomorrow, I {{will stay}} home.", note: "○ 中は現在形、外は will" },
        ],
        note: "think・know のあとの that（〜ということ）は省略できる：I think (that) he is right.",
      },
    },
  ],
  mistakes: [
    { wrong: "If it will be sunny tomorrow, we will go to the sea.", right: "If it is sunny tomorrow, we will go to the sea.", why: "if のまとまりの中は、未来のことでも現在形にします。" },
    { wrong: "Because I was hungry, so I ate a sandwich.", right: "Because I was hungry, I ate a sandwich.（または I was hungry, so I ate a sandwich.）", why: "because と so は1つの文でどちらか一方だけを使います。" },
    { wrong: "I was sick so I went to school.", right: "I was sick, but I went to school.", why: "「病気だった、それでも学校へ行った」は逆の内容なので but。so は「だから」で、自然な結果が続くときに使います。" },
  ],
  check: [
    { q: "I like dogs, ___ my sister likes cats. の ___ に入る接続詞は？", a: "but", why: "「私は犬が好き、しかし姉はねこが好き」と対比している。" },
    { q: "「もし時間があれば、私の家に来てください」を if を使って英語に。", a: "If you have time, please come to my house.", why: "if のまとまりを前に置くのでコンマを入れる。" },
    { q: "He was busy, so he didn't come. を because を使って書きかえましょう。", a: "He didn't come because he was busy.", why: "because は原因（he was busy）の前に置く。" },
  ],
  next: [
    { label: "4択ドリル「接続詞」に挑戦", href: "/learn/eibunpo-chu/j-en-2-setsuzokushi" },
    { label: "when と相性のよい「過去進行形」", href: "/learn/eibunpo-chu/j-en-2-kako-shinko" },
    { label: "つぎに「There is / There are」", href: "/learn/eibunpo-chu/j-en-2-there" },
  ],
};
