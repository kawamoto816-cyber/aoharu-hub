import type { Lecture } from "../types";

export const J_EN_2_HIKAKU: Lecture = {
  unit: "j-en-2-hikaku",
  title: "比較は「2つなら -er than」「3つ以上なら the -est」「同じなら as ～ as」",
  hook: "「兄は私より背が高い」「富士山は日本でいちばん高い山だ」「この本はあの本と同じくらいおもしろい」。ものや人をくらべる言い方は、毎日の会話でもテストでもよく使います。くらべる数と、形容詞の長さによって形が決まるので、そのしくみをつかみましょう。",
  sections: [
    {
      heading: "くらべる数で、3つの形を使い分ける",
      body: "2つをくらべて「〜より…だ」は{{比較級 ＋ than}}、3つ以上の中で「いちばん…だ」は{{the ＋ 最上級}}、2つが「同じくらい…だ」は{{as ＋ 原級 ＋ as}}を使います。原級とは、形容詞・副詞のもとの形のことです。",
      figure: {
        type: "compare",
        title: "比較の3つの形（tall を使って）",
        columns: [{ title: "形", tone: "yellow" }, { title: "意味（くらべる数）" }],
        rows: [
          { label: "原級", cells: ["as tall as", "同じくらい高い（2つ）"] },
          { label: "比較級", cells: ["taller than", "〜より高い（2つ）"] },
          { label: "最上級", cells: ["the tallest", "いちばん高い（3つ以上）"] },
        ],
      },
    },
    {
      heading: "文の形の変化を見る",
      body: "同じ形容詞 tall を使っても、くらべ方によって形がかわります。最上級の文では、くらべる範囲を{{in ＋ 場所・集団}}（in my class）か{{of ＋ 複数・数}}（of the three）で表します。「〜ほど…ない」は as 〜 as の否定 {{not as 〜 as}}です。",
      figure: {
        type: "formula",
        title: "Ken を中心にくらべる",
        prose: true,
        steps: [
          { expr: "Ken is {{as tall as}} Tom.", note: "Ken と Tom は同じくらいの背" },
          { expr: "Ken is {{taller than}} Tom.", note: "2人をくらべる：-er ＋ than" },
          { expr: "Ken is {{the tallest}} {{in}} his class.", note: "集団の中で：in ＋ 集団" },
          { expr: "Ken is {{the tallest}} {{of}} the three.", note: "数の中で：of ＋ 複数・数" },
          { expr: "Mike is {{not as tall as}} Ken.", note: "Mike は Ken ほど高くない" },
        ],
        note: "1行ずつ別の場面の例。tall の形がどう変わるかを見る。",
      },
    },
    {
      heading: "-er / -est か、more / most か",
      body: "短い語は{{-er・-est}}をつけます（e で終わる語は -r・-st、big は big-ger のように子音字を重ねる、easy は y を i にかえる）。beautiful・interesting・popular などの長い語は、前に{{more・most}}を置きます。good・well は{{better・best}}、many・much は more・most と形が変わります。",
      figure: {
        type: "tree",
        title: "比較級・最上級の作り方",
        root: {
          label: "形容詞・副詞",
          children: [
            { label: "短い語", sub: "tall / big / easy", tone: "blue", children: [{ label: "-er / -est", sub: "taller / tallest" }] },
            { label: "長い語", sub: "beautiful / popular", tone: "yellow", children: [{ label: "more / most", sub: "more popular" }] },
            { label: "形が変わる", sub: "good / well / many", tone: "red", children: [{ label: "better / best", sub: "more / most" }] },
          ],
        },
      },
    },
    {
      heading: "「どちらが〜？」の疑問文",
      body: "2つのうちどちらかをたずねるときは{{Which is 比較級, A or B?}}の形を使います。Which is longer, this river or that one? のように聞き、This river is. と答えます。好きなものをくらべるときは like 〜 better than …、いちばん好きなら {{like 〜 the best}} です。",
    },
  ],
  mistakes: [
    { wrong: "This book is interestinger than that one.", right: "This book is more interesting than that one.", why: "interesting は長い語なので -er をつけず、前に more を置きます。" },
    { wrong: "She is the tallest of her class.", right: "She is the tallest in her class.", why: "class のような集団・場所には in。of は of the three、of all のように複数や数に使います。" },
    { wrong: "He is as taller as my father.", right: "He is as tall as my father.", why: "as と as の間は原級（もとの形）です。" },
    { wrong: "This is gooder than that.", right: "This is better than that.", why: "good の比較級は better、最上級は best。形が変わる語です。" },
  ],
  check: [
    { q: "This bag is (big) than mine. の（ ）を正しい形に。", a: "bigger", why: "than があるので比較級。big は g を重ねて -er。" },
    { q: "Kyoto is one of the (popular) cities in Japan. の（ ）を正しい形に。", a: "most popular", why: "「最も〜な…の1つ」で最上級。popular は長い語なので most。" },
    { q: "「私の犬はあなたの犬ほど大きくない」を英語に。", a: "My dog is not as big as yours (your dog).", why: "「〜ほど…ない」は not as 原級 as。" },
  ],
  next: [
    { label: "4択ドリル「比較」に挑戦", href: "/learn/eibunpo-chu/j-en-2-hikaku" },
    { label: "つぎに「受け身」", href: "/learn/eibunpo-chu/j-en-2-ukemi" },
  ],
};
