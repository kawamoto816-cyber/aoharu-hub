import type { Lecture } from "../types";

export const E_ENGLISH_34_ALPHA_OOMOJI: Lecture = {
  unit: "e-english-34-alpha-oomoji",
  title: "大文字は26文字。順番《じゅんばん》と、にている形をおさえる",
  hook: "テレビの TV、くつのサイズの S・M・L、駅の案内《あんない》の「B1」など、町の中には英語《えいご》の大文字がたくさんあります。アルファベットの大文字の名前と形が分かると、見つけた文字を声に出して読めるようになります。",
  sections: [
    {
      heading: "大文字は26文字。4つのまとまりで覚《おぼ》える",
      body: "アルファベットは{{全部で26文字}}です。A から Z まで、ならぶ順番《じゅんばん》が決まっています。一度に覚《おぼ》えるのはたいへんなので、{{歌のように4つのまとまりに区切って}}、先生や音声のあとについて声に出してみましょう。",
      figure: {
        type: "area",
        kind: "bar",
        title: "26文字を4つのまとまりに区切る",
        max: 26,
        bars: [
          {
            label: "大文字",
            parts: [
              { value: 7, label: "A〜G", tone: "blue" },
              { value: 9, label: "H〜P", tone: "yellow" },
              { value: 6, label: "Q〜V", tone: "red" },
              { value: 4, label: "W〜Z", tone: "navy" },
            ],
            total: "26文字",
          },
        ],
        note: "7文字・9文字・6文字・4文字で、合わせて26文字。",
      },
    },
    {
      heading: "文字には「名前」がある",
      body: "1つ1つの文字には、{{文字の名前}}があります。A から Z まで、名前を言いながら指でさしていく練習をしましょう。先生が言った名前を{{聞いて、その文字を指さす}}ゲームも、耳と目の両方で覚《おぼ》えられるのでおすすめです。M と N のように音がにている文字は、口の形をよく見て聞き分けます。",
      figure: {
        type: "flow",
        title: "聞いて、見つけて、言う",
        steps: [
          { label: "聞く", sub: "先生が名前を言う", tone: "blue" },
          { label: "指さす", sub: "その文字をさがす", tone: "yellow" },
          { label: "言う", sub: "自分でも名前を言う", tone: "red" },
        ],
      },
    },
    {
      heading: "まっすぐな線だけの文字と、まがった線のある文字",
      body: "大文字を形で分けると、{{まっすぐな線だけでできた文字}}と、{{まがった線がある文字}}があります。E・H・T などはまっすぐな線だけ、C・O・S などはまがった線があります。形の分け方を知っておくと、にている文字を見分けるときに役に立ちます。",
      figure: {
        type: "tree",
        title: "大文字を形で分ける",
        root: {
          label: "大文字 26",
          children: [
            { label: "まっすぐな線だけ", sub: "A E F H I K L M N", tone: "blue", children: [{ label: "ほかにも", sub: "T V W X Y Z" }] },
            { label: "まがった線がある", sub: "B C D G J O P", tone: "yellow", children: [{ label: "ほかにも", sub: "Q R S U" }] },
          ],
        },
      },
    },
    {
      heading: "にている文字は、ちがう所をさがす",
      body: "大文字には、形がよくにているものがあります。{{E と F}} は横線の数、{{O と Q}} は小さな線があるかどうか、{{P と R}} はななめの線があるかどうかがちがいます。M をさかさまにすると W ににているので、上が開いているのはどちらかを見ましょう。",
      figure: {
        type: "compare",
        title: "にている大文字のちがい",
        columns: [{ title: "1つ目", tone: "blue" }, { title: "2つ目", tone: "yellow" }],
        rows: [
          { label: "E と F", cells: ["E：横線が3本", "F：横線が2本"] },
          { label: "O と Q", cells: ["O：丸だけ", "Q：右下に小さな線"] },
          { label: "P と R", cells: ["P：ななめ線なし", "R：右下にななめ線"] },
          { label: "M と W", cells: ["M：下が開く", "W：上が開く"] },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "アルファベットは24文字だと思う", right: "26文字", why: "A から Z まで、全部で26文字あります。歌のまとまりで数えてたしかめましょう。" },
    { wrong: "E と F を見まちがえる", right: "横線が3本なら E、2本なら F", why: "E には一番下にも横線があります。" },
    { wrong: "M と N の名前を聞きまちがえる", right: "口の形をよく見て聞き分ける", why: "2つの名前は音がよくにているので、口がとじるかどうかにも気をつけて聞きます。" },
  ],
  check: [
    { q: "アルファベットの大文字は全部で何文字？", a: "26文字", why: "A から Z までで26文字です。" },
    { q: "K、L、□、N の□に入る文字は？", a: "M", why: "K・L・M・N の順《じゅん》にならびます。" },
    { q: "O の右下に小さな線をつけた文字は？", a: "Q", why: "O は丸だけ、Q は右下に小さな線があります。" },
  ],
  next: [
    { label: "カードとドリル「アルファベット（大文字）」", href: "/learn/eigo-sho/e-english-34-alpha-oomoji" },
    { label: "図解《ずかい》レクチャー「アルファベット（小文字）」", href: "/learn/lecture/e-english-34-alpha-komoji" },
    { label: "5・6年「アルファベットを書く」", href: "/learn/eigo-sho/e-english-56-alpha-kaku" },
  ],
};
