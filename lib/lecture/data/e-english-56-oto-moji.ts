import type { Lecture } from "../types";

export const E_ENGLISH_56_OTO_MOJI: Lecture = {
  unit: "e-english-56-oto-moji",
  title: "文字には「名前」と「音」がある。音を聞けば、つづりが見えてくる",
  hook: "アルファベットの歌で言う a と、apple のはじめで聞こえる音は、少しちがいます。英語の文字には「名前」と「音」の2つがあり、音を知ると、知らない単語でも読んだり書いたりしやすくなります。口の形にも注意しながら、音と文字をつなげていきましょう。",
  sections: [
    {
      heading: "文字の「名前」と「音」",
      body: "アルファベットの歌で言う読み方は、文字の{{名前}}です。単語の中で実際に聞こえるのは、文字の{{音}}です。たとえば a の名前と、apple や ant のはじめの音はちがいます。単語を読むときは、{{音}}のほうを使います。",
      figure: {
        type: "compare",
        title: "名前と音のちがい",
        columns: [{ title: "文字の名前", tone: "blue" }, { title: "文字の音", tone: "yellow" }],
        rows: [
          { label: "どこで使う", cells: ["歌や、つづりを言うとき", "単語を読むとき"] },
          { label: "a の場合", cells: ["歌で言う a", "apple・ant のはじめ"] },
          { label: "b の場合", cells: ["歌で言う b", "bag・bus のはじめ"] },
        ],
      },
    },
    {
      heading: "はじめの音から、はじめの文字が分かる",
      body: "単語の{{はじめの音}}をよく聞くと、はじめの文字が分かります。bag、bed、bus はどれも同じ音で始まるので、はじめの文字は {{b}} です。cat と cup のように、同じ音で始まる単語をなかまにして集めると、音と文字のつながりがつかみやすくなります。",
      figure: {
        type: "tree",
        title: "はじめの音でなかま分け",
        root: {
          label: "はじめの文字",
          tone: "navy",
          children: [
            { label: "b", sub: "bag, bed, bus", tone: "blue" },
            { label: "m", sub: "milk / map", tone: "yellow" },
            { label: "s", sub: "sun / sock", tone: "red" },
          ],
        },
      },
    },
    {
      heading: "2文字で1つの音になる組み合わせ",
      body: "{{sh}}・{{ch}}・{{th}} は、2つの文字を別々に読まず、{{2文字で1つの音}}を表します。sh は ship や shoe のはじめの音、ch は chair や cheese のはじめの音です。th は three のはじめの音で、{{舌《した》の先を歯で軽くはさんで}}息を出します。",
    },
    {
      heading: "口の形に気をつける音",
      body: "日本語にない音は、口の形を意識すると出しやすくなります。{{f と v}} は、{{上の歯を下くちびるに軽く当てて}}出します。{{l と r}} もちがう音で、light（明かり）と right（右）は、はじめの音で意味が変わります。",
      figure: {
        type: "compare",
        title: "口の使い方",
        columns: [{ title: "文字", tone: "yellow" }, { title: "口の使い方" }, { title: "単語の例", tone: "blue" }],
        rows: [
          { cells: ["f / v", "上の歯を下くちびるに", "fan / vest"] },
          { cells: ["th", "舌《した》の先を歯ではさむ", "three"] },
          { cells: ["l", "舌《した》の先を上の歯の裏《うら》に", "light"] },
          { cells: ["r", "舌《した》をどこにもつけない", "right"] },
        ],
      },
    },
    {
      heading: "終わりが同じ単語は、はじめだけ変える",
      body: "cat・hat・bat のように、{{終わりの音が同じ}}単語があります。終わりの部分はそのままで、{{はじめの文字だけ}}を変えると、別の単語になります。このしくみを使うと、新しい単語もリズムよく読めます。",
      figure: {
        type: "formula",
        title: "はじめの文字を入れかえる",
        prose: true,
        steps: [
          { label: "ねこ", expr: "{{c}}at" },
          { label: "ぼうし", expr: "{{h}}at" },
          { label: "バット", expr: "{{b}}at" },
          { label: "ぶた", expr: "{{p}}ig", note: "pig と big も終わりが同じ" },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "apple を、a の名前のとおりに読む", right: "単語の中では a の「音」で読む", why: "歌で言う読み方は文字の名前で、単語を読むときの音とはちがいます。" },
    { wrong: "ship の sh を、s と h の2つの音に分けて読む", right: "sh は2文字で1つの音", why: "sh・ch・th は、2つの文字が組になって1つの音を表します。" },
    { wrong: "「右」を light と書く", right: "「右」は right", why: "light は「明かり」です。l と r で意味が変わります。" },
  ],
  check: [
    { q: "dog・desk・duck のはじめの文字は？", a: "d", why: "どれも同じ音で始まり、はじめの文字は d。" },
    { q: "chair の ch のように、2文字で1つの音を表す組み合わせをもう1つ答えましょう。", a: "sh か th", why: "sh・ch・th は2文字で1つの音。" },
    { q: "f の音を出すとき、上の歯をどこに当てる？", a: "下くちびる", why: "f と v は、上の歯を下くちびるに軽く当てて出す。" },
  ],
  next: [
    { label: "ドリルで「音と文字」を練習する", href: "/learn/eigo-sho/e-english-56-oto-moji" },
    { label: "「アルファベットを書く」（ドリル）", href: "/learn/eigo-sho/e-english-56-alpha-kaku" },
    { label: "「自己紹介《じこしょうかい》」（ドリル）", href: "/learn/eigo-sho/e-english-56-jikoshokai" },
  ],
};
