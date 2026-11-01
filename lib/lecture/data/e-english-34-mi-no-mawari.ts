import type { Lecture } from "../types";

export const E_ENGLISH_34_MI_NO_MAWARI: Lecture = {
  unit: "e-english-34-mi-no-mawari",
  title: "教室や筆箱の中の物を、英語《えいご》で言ってみよう",
  hook: "筆箱を開けると、えんぴつ、消しゴム、定規《じょうぎ》が入っています。毎日さわる物を英語《えいご》で言えると、友だちに「これは何？」「定規《じょうぎ》を持ってる？」と聞けるようになります。物の名前と、聞き方・答え方をいっしょにおぼえましょう。",
  sections: [
    {
      heading: "物をなかま分けしておぼえる",
      body: "物の名前は、ばらばらにおぼえるより、{{使う場所や使い方でなかま分け}}するとおぼえやすくなります。筆箱に入る物、教室にある物、自分が身につける物の3つに分けてみましょう。",
      figure: {
        type: "tree",
        title: "身の回りの物のなかま",
        root: {
          label: "身の回りの物",
          tone: "navy",
          children: [
            { label: "筆箱の中", sub: "pencil, eraser", tone: "blue", children: [{ label: "ruler / glue", sub: "定規《じょうぎ》 / のり" }] },
            { label: "教室にある", sub: "desk / chair", tone: "yellow", children: [{ label: "clock", sub: "時計" }] },
            { label: "持ち歩く", sub: "bag / cap", tone: "plain", children: [{ label: "notebook", sub: "ノート" }] },
          ],
        },
      },
    },
    {
      heading: "にている語に気をつける",
      body: "英語《えいご》には、音やつづりがにている語があります。{{cap}} はぼうし、{{cup}} はカップで、まん中の文字が1つちがうだけです。{{pen}} と {{pencil}} も別《べつ》の物です。絵と語を{{セットで}}おぼえると、まちがえにくくなります。",
      figure: {
        type: "compare",
        title: "まちがえやすい組",
        columns: [{ title: "語", tone: "blue" }, { title: "意味" }, { title: "見分けるヒント", tone: "yellow" }],
        rows: [
          { cells: ["cap / cup", "ぼうし / カップ", "まん中が a か u か"] },
          { cells: ["pen / pencil", "ペン / えんぴつ", "長いほうがえんぴつ"] },
          { cells: ["desk / chair", "つくえ / いす", "すわるのは chair"] },
        ],
      },
    },
    {
      heading: "「これは何？」と聞く・答える",
      body: "物の名前を聞くときは、その物を指して {{What's this?}} とたずねます。答えるときは {{It's 〜.}} を使い、It's a ruler. のように言います。1つの物には a をつけ、eraser のようにイに近い音で始まる語には an をつけます。",
      figure: {
        type: "flow",
        dir: "col",
        title: "物の名前をたずねる",
        steps: [
          { label: "What's this?", sub: "これは何ですか", tone: "navy" },
          { label: "It's a ruler.", sub: "それは定規《じょうぎ》です", tone: "yellow" },
          { label: "Oh, I see.", sub: "なるほど" },
        ],
      },
    },
    {
      heading: "持っているか聞く・だれの物か言う",
      body: "「〜を持っていますか」は {{Do you have 〜?}} と聞き、{{Yes, I do.}} か {{No, I don't.}} で答えます。だれの物かを言うときは、物の前に {{my}}（わたしの）や {{your}}（あなたの）をつけます。my や your をつけたときは、a はつけません。",
      figure: {
        type: "formula",
        title: "物の前につけることば",
        prose: true,
        steps: [
          { expr: "This is {{a}} pen.", note: "1本のペン" },
          { expr: "This is {{my}} pen.", note: "わたしのペン" },
          { expr: "This is {{your}} pen.", note: "あなたのペン" },
        ],
        note: "a my pen のように、a と my をいっしょには使いません。",
      },
    },
  ],
  mistakes: [
    { wrong: "cap を「カップ」の意味で使う", right: "カップは cup、ぼうしは cap", why: "まん中の文字が a か u かで、別《べつ》の物になります。" },
    { wrong: "What's this? — I'm a pencil.", right: "It's a pencil.", why: "I'm は自分のことを言うときの形です。物のことは It's 〜. で答えます。" },
    { wrong: "This is a my bag.", right: "This is my bag.", why: "my や your をつけたら、a はつけません。" },
  ],
  check: [
    { q: "eraser の意味は？", a: "消しゴム", why: "字を消す物が eraser。" },
    { q: "「あなたはのりを持っていますか」を英語《えいご》で言うと？", a: "Do you have glue?", why: "持っているかは Do you have 〜? で聞く。" },
    { q: "What's this? に「それは時計です」と答えると？", a: "It's a clock.", why: "物のことは It's 〜.、時計は clock。" },
  ],
  next: [
    { label: "ドリルで「身の回りの物の言い方」を練習する", href: "/learn/eigo-sho/e-english-34-mi-no-mawari" },
    { label: "「ほしいものを伝《つた》える（I want 〜.）」（ドリル）", href: "/learn/eigo-sho/e-english-34-hoshii" },
    { label: "「色・形の言い方」（ドリル）", href: "/learn/eigo-sho/e-english-34-iro-katachi" },
  ],
};
