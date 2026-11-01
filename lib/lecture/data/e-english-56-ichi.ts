import type { Lecture } from "../types";

export const E_ENGLISH_56_ICHI: Lecture = {
  unit: "e-english-56-ichi",
  title: "物の位置は in・on・under で、道は「進む・曲がる・見える」で伝える",
  hook: "「ぼくのぼうし、どこ？」「ベッドの上だよ」。物がある場所や、駅までの行き方を伝えられると、家でも町でも役に立ちます。英語では、場所の前に in・on・under などの短い言葉をおくだけで位置を表せます。道案内は、3つの言い方を組み合わせればできます。",
  sections: [
    {
      heading: "場所の前におく4つの言葉",
      body: "物の位置は、{{in（〜の中に）}}、{{on（〜の上に）}}、{{under（〜の下に）}}、{{by（〜のそばに）}}を場所の前において表します。The ball is in the box. は「ボールは箱の中にある」です。言葉の順番は、日本語と反対で {{in ＋ the box}} のように「中に」が先に来ます。",
      figure: {
        type: "compare",
        title: "位置を表す言葉",
        columns: [{ title: "意味", tone: "yellow" }, { title: "例", tone: "plain" }],
        rows: [
          { label: "in", cells: ["〜の中に", "in the box"] },
          { label: "on", cells: ["〜の上に（ふれている）", "on the desk"] },
          { label: "under", cells: ["〜の下に", "under the chair"] },
          { label: "by", cells: ["〜のそばに", "by the door"] },
        ],
      },
    },
    {
      heading: "on は「ふれている」",
      body: "on は「上」と覚えがちですが、もとの意味は{{くっついている・ふれている}}ことです。だから、かべにかかった時計は {{on the wall}}、天井の電灯は on the ceiling と言います。上でも下でも、横でも、ふれていれば on です。",
      figure: {
        type: "tree",
        title: "on が使える場所",
        root: {
          label: "on",
          sub: "ふれている",
          tone: "yellow",
          children: [
            { label: "上にのる", sub: "on the desk", tone: "blue" },
            { label: "横につく", sub: "on the wall", tone: "blue" },
            { label: "下につく", sub: "on the ceiling", tone: "blue" },
          ],
        },
      },
    },
    {
      heading: "Where is 〜? とたずね、It's 〜. と答える",
      body: "物の場所をたずねるときは {{Where is 〜?}} と聞きます。答えるときは、物を {{it}} に置きかえて It's under the bed. のように言います。くつやペンなど2つ以上のものは、{{Where are 〜?}} と聞いて They're 〜. と答えます。",
      figure: {
        type: "formula",
        title: "場所をたずねる会話",
        prose: true,
        steps: [
          { label: "聞く", expr: "{{Where is}} my cap?", note: "ぼうしは1つ" },
          { label: "答える", expr: "{{It's}} {{on}} the bed.", note: "my cap を it でうける" },
          { label: "聞く", expr: "{{Where are}} my shoes?", note: "くつは2つ" },
          { label: "答える", expr: "{{They're}} {{by}} the door.", note: "2つ以上は they" },
        ],
      },
    },
    {
      heading: "道案内は3つの言い方で",
      body: "道案内は、{{Go straight.}}（まっすぐ進んで）、{{Turn right. / Turn left.}}（右／左に曲がって）、{{You can see it on your right.}}（右に見えます）の組み合わせです。曲がる場所は at the corner のように at で伝えます。右・左は、{{歩いている人から見た向き}}で言います。",
      figure: {
        type: "flow",
        dir: "col",
        title: "図書館までの道案内（例）",
        steps: [
          { label: "Go straight.", sub: "まっすぐ進む", tone: "blue" },
          { label: "Turn left.", sub: "2つ目の角で左へ", tone: "yellow" },
          { label: "見えます", sub: "on your right.", tone: "red" },
        ],
        arrows: ["2つ目の角まで", "少し進む"],
        note: "最後は You can see it on your right. と言う。",
      },
    },
  ],
  mistakes: [
    { wrong: "The clock is in the wall.", right: "The clock is on the wall.", why: "かべにくっついているので on。in はかべの中にうまっていることになります。" },
    { wrong: "Where is my shoes?", right: "Where are my shoes?", why: "くつは2つ以上なので are。答えも They're 〜. です。" },
    { wrong: "Go to straight.", right: "Go straight.", why: "straight の前に to はいりません。" },
  ],
  check: [
    { q: "The cat is ___ the box.（ねこは箱の中）の ___ は？", a: "in", why: "「〜の中に」は in。" },
    { q: "「右に曲がって」を英語で言いましょう。", a: "Turn right.", why: "曲がるは turn、右は right。" },
    { q: "Where is the ball?（いすの下）に答えましょう。", a: "It's under the chair.", why: "the ball は it でうけ、「〜の下」は under。" },
  ],
  next: [
    { label: "ポイントと練習問題「物の位置と道案内」", href: "/learn/eigo-sho/e-english-56-ichi" },
    { label: "小3・4「道案内」", href: "/learn/eigo-sho/e-english-34-michi" },
    { label: "中1「命令文」（Go straight. の形）", href: "/learn/eibunpo-chu/j-en-1-meirei" },
  ],
};
