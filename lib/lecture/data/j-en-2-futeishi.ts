import type { Lecture } from "../types";

export const J_EN_2_FUTEISHI: Lecture = {
  unit: "j-en-2-futeishi",
  title: "不定詞は to ＋ 原形。文の中の位置で「〜すること・〜するための・〜するために」",
  hook: "I want to be a doctor.（医者になりたい）、I have a lot of homework to do.（やるべき宿題がたくさんある）、I went to the station to meet him.（彼に会うために駅へ行った）。この3つの文の「to＋動詞」は、どれも不定詞です。形は同じでも文の中で役割が変わるので、どこに置かれているかを見て意味を決める力が大切です。",
  sections: [
    {
      heading: "不定詞の形は、いつも to ＋ 動詞の原形",
      body: "不定詞は{{to ＋ 動詞の原形}}の形です。主語が3人称単数でも、文が過去でも、to のあとの動詞は{{原形のまま}}です。He wants to play. の wants には -s がつきますが、to のあとの play には -s はつきません。",
      figure: {
        type: "formula",
        title: "主語や時がかわっても、to のあとは原形",
        prose: true,
        steps: [
          { expr: "I want {{to play}} tennis.", note: "原形 play" },
          { expr: "He {{wants}} {{to play}} tennis.", note: "-s がつくのは wants だけ" },
          { expr: "He {{wanted}} {{to play}} tennis.", note: "過去でも to play のまま" },
        ],
      },
    },
    {
      heading: "3つの使い方：名詞・形容詞・副詞のはたらき",
      body: "不定詞には3つの使い方があります。{{名詞的用法}}は「〜すること」で、want・like・start などの目的語になります。{{形容詞的用法}}は「〜するための・〜すべき」で、すぐ前の名詞を説明します。{{副詞的用法}}は「〜するために（目的）」「〜して（感情の原因）」で、動詞や形容詞に意味を足します。",
      figure: {
        type: "compare",
        title: "不定詞の3つの用法",
        columns: [{ title: "意味", tone: "yellow" }, { title: "例" }],
        rows: [
          { label: "名詞的", cells: ["〜すること", "I like {{to read}}."] },
          { label: "形容詞的", cells: ["〜するための・べき（前の名詞を説明）", "time {{to sleep}}"] },
          { label: "副詞的", cells: ["〜するために／〜して", "came {{to see}} you"] },
        ],
      },
    },
    {
      heading: "迷ったら「to の前に何があるか」を見る",
      body: "用法は to の{{すぐ前}}を見ると見分けやすくなります。前が want・like・hope など「何を？」と聞ける動詞なら名詞的。前が something や time などの{{名詞}}なら、その名詞を説明する形容詞的。前で文がもう完成していて「何のために？」に答えているなら副詞的です。happy・sad などの{{感情の形容詞}}のあとなら「〜して」と原因を表します。",
      figure: {
        type: "tree",
        title: "to の前を見て用法を決める",
        root: {
          label: "to ＋ 原形",
          children: [
            { label: "前が want / like", sub: "「何を？」の答え", children: [{ label: "名詞的", sub: "〜すること", tone: "blue" }] },
            { label: "前が名詞", sub: "something / time", children: [{ label: "形容詞的", sub: "〜するための", tone: "yellow" }] },
            { label: "文が完成済み", sub: "「なぜ？」の答え", children: [{ label: "副詞的", sub: "〜するために", tone: "red" }] },
          ],
        },
        note: "副詞的用法で happy / glad / sad などのあとにくると「〜して（うれしい）」。",
      },
    },
    {
      heading: "Why ～? に To ～. で答えられる",
      body: "副詞的用法の「〜するために」は{{目的}}を表すので、Why（なぜ）の疑問文に {{To ＋ 原形}}だけで答えることができます。Why did you go to the park? — To play soccer. のように使います。Because 〜. で理由を答えることもできます。",
    },
  ],
  mistakes: [
    { wrong: "She wants to plays the piano.", right: "She wants to play the piano.", why: "to のあとは、主語が3人称単数でも必ず原形です。" },
    { wrong: "I want something to drinking.", right: "I want something to drink.", why: "不定詞は to ＋ 原形。-ing の形にはしません。" },
    { wrong: "I went to the shop for buy milk.", right: "I went to the shop to buy milk.", why: "「〜するために」と目的を表すときは to ＋ 原形を使います。for のあとに動詞の原形は置けません。" },
  ],
  check: [
    { q: "I have a lot of books to read. の to read は何用法？", a: "形容詞的用法", why: "前の名詞 books を「読むための・読むべき」と説明している。" },
    { q: "I was happy to hear the news. の意味は？", a: "私はその知らせを聞いてうれしかった。", why: "感情の形容詞 happy のあとの不定詞は「〜して」と原因を表す（副詞的用法）。" },
    { q: "「彼は泳ぐことが好きです」を不定詞を使って英語に。", a: "He likes to swim.", why: "名詞的用法。likes には -s、to のあとは原形 swim。" },
  ],
  next: [
    { label: "4択ドリル「不定詞」に挑戦", href: "/learn/eibunpo-chu/j-en-2-futeishi" },
    { label: "「〜すること」のもう1つの形「動名詞」", href: "/learn/eibunpo-chu/j-en-2-domeishi" },
    { label: "中3「不定詞の発展（It is ~ for … to など）」", href: "/learn/eibunpo-chu/j-en-3-futeishi" },
  ],
};
