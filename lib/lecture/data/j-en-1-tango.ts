import type { Lecture } from "../types";

export const J_EN_1_TANGO: Lecture = {
  unit: "j-en-1-tango",
  title: "英単語は「音・つづり・意味」をセットで、忘れかけたころにくり返す",
  hook: "文法がわかっても、単語を知らなければ英文は読めず、書けません。中学の3年間で習う英単語は{{1600〜1800語}}ほどあり（小学校の600〜700語に上乗せ）、一度に覚えきるのは無理です。だからこそ、むだなく覚えて忘れない「覚え方」を先に身につけましょう。",
  sections: [
    {
      heading: "1語を「音・つづり・意味」の3点で覚える",
      body: "単語は、{{音}}（どう読むか）・{{つづり}}（どう書くか）・{{意味}}（何を表すか）の3つがそろって初めて使えます。見て意味がわかるだけでは、書く問題やリスニングで点になりません。発音を聞いて声に出し、つづりを書き、意味を言う、の3つを1セットにしましょう。",
      figure: {
        type: "flow",
        title: "1語を覚える3ステップ",
        steps: [
          { label: "聞いて言う", sub: "音", tone: "blue" },
          { label: "書いてみる", sub: "つづり", tone: "yellow" },
          { label: "意味を言う", sub: "意味", tone: "red" },
        ],
      },
    },
    {
      heading: "忘れかけたころにもう一度",
      body: "人は覚えたことを、{{次の日にはかなり忘れて}}しまいます。でも、忘れかけたところで思い出すと、前より長く覚えていられます。一度に長時間やるより、{{間をあけて何回もくり返す}}ほうが効果的です。答えを見る前に、まず自分で思い出そうとすることも大切です。",
      figure: {
        type: "cycle",
        title: "単語を定着させる輪",
        center: "間をあけてくり返す",
        steps: [
          { label: "覚える", sub: "カードで見る" },
          { label: "思い出す", sub: "答えを見ずに", tone: "yellow" },
          { label: "確かめる", sub: "○×をつける" },
          { label: "間をあける", sub: "1日後・数日後", tone: "blue" },
        ],
      },
    },
    {
      heading: "単語は「なかま」と「例文」で覚える",
      body: "曜日・月・数・教科など、{{テーマごとにまとめる}}と思い出しやすくなります。また、play tennis、get up のように{{よくいっしょに使う語}}と組で覚えると、そのまま英作文に使えます。1語だけより短い例文で覚えるほうが、使い方まで身につきます。",
      figure: {
        type: "tree",
        title: "テーマでまとめる例",
        root: {
          label: "中1の単語",
          children: [
            { label: "曜日・月", sub: "大文字で書く", tone: "blue", children: [{ label: "Sunday" }, { label: "April" }] },
            { label: "数", sub: "-teen と -ty", tone: "yellow", children: [{ label: "thirteen" }, { label: "thirty" }] },
            { label: "動詞の組", sub: "語句で覚える", tone: "red", children: [{ label: "get up" }, { label: "play tennis" }] },
          ],
        },
      },
    },
    {
      heading: "つづりや音がにている語に注意",
      body: "英語には、{{音が同じでつづりと意味がちがう語}}や、つづりが1字ちがいの語がたくさんあります。こうした語は、2つを並べて{{ちがいを意識して}}覚えると、まちがえにくくなります。",
      figure: {
        type: "compare",
        title: "まちがえやすい組",
        columns: [{ title: "語 1" }, { title: "語 2", tone: "yellow" }],
        rows: [
          { label: "同じ音", cells: ["here（ここに）", "hear（聞こえる）"] },
          { label: "同じ音", cells: ["write（書く）", "right（右・正しい）"] },
          { label: "にた音", cells: ["fifteen（15）", "fifty（50）"] },
          { label: "1字ちがい", cells: ["three（3）", "tree（木）"] },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "monday / april と小文字で書く", right: "Monday / April", why: "曜日と月の名前は、文の途中でもいつも大文字で始めます。" },
    { wrong: "英語→日本語だけを練習する", right: "日本語→英語でつづりも書く", why: "意味がわかるだけでは、英作文や書きとりで使えません。" },
    { wrong: "1日に100語を1回だけ見る", right: "少しずつ、間をあけて何回も", why: "1回だけでは次の日にかなり忘れます。くり返す回数が定着を決めます。" },
  ],
  check: [
    { q: "「水曜日」を英語で書くと？", a: "Wednesday", why: "d を書き忘れやすい。大文字の W で始める。" },
    { q: "「音楽が聞こえますか」の「聞こえる」は here と hear のどっち？", a: "hear", why: "here は「ここに」。Can you hear the music?" },
    { q: "fifteen と fifty、「50」はどちら？", a: "fifty", why: "-ty は10の倍数（20, 30 …）、-teen は13〜19。" },
  ],
  next: [
    { label: "中学英単語1200で覚える", href: "/learn/chu-tango" },
    { label: "数字や曜日を聞き取る「リスニング」", href: "/learn/lecture/j-en-1-listening" },
    { label: "覚えた単語で「英作文」", href: "/learn/eigo-chu/j-en-1-eisakubun" },
  ],
};
