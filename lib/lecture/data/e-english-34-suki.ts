import type { Lecture } from "../types";

export const E_ENGLISH_34_SUKI: Lecture = {
  unit: "e-english-34-suki",
  nameRuby: "好《す》きなものを伝《つた》える（I like 〜.）",
  title: "I like 〜. で好《す》きを伝《つた》え、Do you like 〜? でたずねる",
  hook: "新しいクラスで友だちと話すとき、「何が好《す》き？」はいちばん話しやすい話題です。英語《えいご》でも I like 〜. の形を1つ覚《おぼ》えるだけで、スポーツ、食べ物、動物など、自分の好《す》きなものをたくさん伝《つた》えられます。",
  sections: [
    {
      heading: "I like の後ろに、好《す》きなものを入れる",
      body: "「わたしは〜が好《す》きです」は {{I like 〜.}} と言います。I like の後ろに入れる言葉をかえるだけで、いろいろな好《す》きを伝《つた》えられます。犬やりんごのように数えられる物は、{{dogs、apples のように s をつけて}}言うことが多いです。好《す》きではないときは {{I don't like 〜.}} と言います。",
      figure: {
        type: "formula",
        title: "I like の後ろをかえてみる",
        prose: true,
        steps: [
          { expr: "I like {{soccer}}.", note: "サッカーが好《す》き" },
          { expr: "I like {{dogs}}.", note: "犬が好《す》き（s がつく）" },
          { expr: "I like {{curry and rice}}.", note: "カレーライスが好《す》き" },
          { expr: "I {{don't}} like carrots.", note: "にんじんは好《す》きではない" },
        ],
      },
    },
    {
      heading: "好《す》きかどうかをたずねる",
      body: "相手に「〜は好《す》き？」とたずねるときは {{Do you like 〜?}} と言います。文のさいごを少し上げて言うと、たずねている感じが伝《つた》わります。好《す》きなら {{Yes, I do.}}、好《す》きではないなら {{No, I don't.}} と答えます。",
      figure: {
        type: "tree",
        title: "Do you like cats? への答え方",
        root: {
          label: "Do you like cats?",
          sub: "ねこは好《す》き？",
          children: [
            { label: "Yes, I do.", sub: "うん、好《す》き", tone: "blue" },
            { label: "No, I don't.", sub: "ううん、好《す》きではない", tone: "red" },
          ],
        },
      },
    },
    {
      heading: "「何が好《す》き？」は What 〜 do you like?",
      body: "何のスポーツが好《す》きかを聞くときは {{What sport do you like?}} です。What の後ろの言葉をかえると、食べ物、動物、色など、聞きたいことをかえられます。答えるときは、Yes や No ではなく {{I like 〜.}} で好《す》きなものを言います。",
      figure: {
        type: "compare",
        title: "What の後ろをかえてたずねる",
        columns: [{ title: "たずね方", tone: "blue" }, { title: "答え方（例《れい》）", tone: "yellow" }],
        rows: [
          { label: "スポーツ", cells: ["What sport …?", "I like tennis."] },
          { label: "食べ物", cells: ["What food …?", "I like pizza."] },
          { label: "動物", cells: ["What animal …?", "I like rabbits."] },
          { label: "色", cells: ["What color …?", "I like blue."] },
        ],
        note: "「…」の所は、どれも do you like? が入る。",
      },
    },
    {
      heading: "会話はキャッチボール",
      body: "自分の好《す》きを言ったら、こんどは{{相手にもたずね返し}}ましょう。相手の答えをよく聞いて、Me, too.（わたしも）や Nice. と{{返事}}をすると、ボールが行ったり来たりするように会話が続《つづ》きます。",
      figure: {
        type: "cycle",
        title: "好《す》きなものの会話の進み方",
        center: "聞く・話す",
        steps: [
          { label: "自分の好《す》きを言う", sub: "I like apples.", tone: "yellow" },
          { label: "相手にたずねる", sub: "Do you like apples?", tone: "blue" },
          { label: "答えを聞く", sub: "Yes, I do." },
          { label: "返事をする", sub: "Me, too!", tone: "red" },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "I am soccer.（サッカーが好《す》き、のつもり）", right: "I like soccer.", why: "「好《す》き」を表すのは like です。I am soccer. では「わたしはサッカーです」になってしまいます。" },
    { wrong: "Do you like dogs? — Yes, I like.", right: "Yes, I do.", why: "Do you 〜? とたずねられたら、do を使って Yes, I do. と答えます。" },
    { wrong: "What sport do you like? — Yes, I do.", right: "I like baseball.", why: "「何のスポーツ？」と聞かれているので、スポーツの名前で答えます。" },
  ],
  check: [
    { q: "「わたしはねこが好《す》きです」を英語《えいご》で言うと？", a: "I like cats.", why: "I like の後ろに cats を入れます。数えられる物なので s がつきます。" },
    { q: "Do you like milk? に「いいえ」と答えると？", a: "No, I don't.", why: "Do you 〜? への「いいえ」は No, I don't. です。" },
    { q: "「何の動物が好《す》き？」とたずねると？", a: "What animal do you like?", why: "What の後ろに animal（動物）を入れます。" },
  ],
  next: [
    { label: "カードとドリル「好《す》きなものを伝《つた》える」", href: "/learn/eigo-sho/e-english-34-suki" },
    { label: "図解《ずかい》レクチャー「色・形の言い方」", href: "/learn/lecture/e-english-34-iro-katachi" },
    { label: "関連《かんれん》する単元《たんげん》「ほしいものを伝《つた》える」", href: "/learn/eigo-sho/e-english-34-hoshii" },
  ],
};
