import type { Lecture } from "../types";

export const J_EN_1_MEIREI: Lecture = {
  unit: "j-en-1-meirei",
  title: "命令文は動詞の原形から。禁止は Don't、さそうときは Let's",
  hook: "先生の Stand up. や Open your textbooks.、図書館の Don't run. の張り紙。相手に何かをしてもらう・やめてもらう・いっしょにしようとさそう言い方は、毎日の会話にたくさん出てきます。形はとても短いので、作り方のルールさえつかめばすぐに使えます。",
  sections: [
    {
      heading: "命令文は主語をとって、動詞の原形で始める",
      body: "「〜しなさい」は、目の前の相手（you）に言うので、{{主語を省いて}}文を始めます。文の最初に来るのは{{動詞の原形}}です。主語が you の文から you をとると命令文になる、と考えるとわかりやすいでしょう。",
      figure: {
        type: "formula",
        title: "ふつうの文から命令文を作る",
        prose: true,
        steps: [
          { expr: "You open the window.", note: "ふつうの文：あなたは窓を開ける" },
          { expr: "{{Open}} the window.", note: "命令文：you をとって原形で始める" },
          { expr: "{{Please}} open the window.", note: "ていねい：Please を前に" },
          { expr: "Open the window{{, please}}.", note: "後ろに , please でもよい" },
        ],
      },
    },
    {
      heading: "be動詞の命令文は Be で始める",
      body: "quiet（静かな）や careful（注意深い）は形容詞なので、命令文にするときは be動詞が必要です。am・are・is の原形は{{be}}なので、「静かにしなさい」は{{Be quiet.}}になります。You are quiet. の you をとり、are を原形の be にかえた形です。",
    },
    {
      heading: "命令・禁止・さそいの3つの形",
      body: "「〜してはいけない」という{{禁止}}は、命令文の前に{{Don't}}を置きます。be動詞の文でも Don't be 〜 です。「〜しよう」と{{さそう}}ときは、{{Let's}}＋動詞の原形で始めます。どれも動詞は原形のままです。",
      figure: {
        type: "compare",
        title: "文の最初の語で意味が決まる",
        columns: [{ title: "命令", tone: "blue" }, { title: "禁止", tone: "red" }, { title: "さそい", tone: "yellow" }],
        rows: [
          { cells: ["〜しなさい", "〜してはいけない", "〜しよう"] },
          { cells: ["動詞の原形 〜.", "Don't＋原形 〜.", "Let's＋原形 〜."] },
          { cells: ["Wash your hands.", "Don't run here.", "Let's play tennis."] },
          { cells: ["Be careful.", "Don't be late.", "Let's go home."] },
        ],
      },
    },
    {
      heading: "言われたときの返し方",
      body: "命令文や Please 〜. には{{OK.}}や{{All right.}}（わかりました）と返します。Let's 〜. にさんせいするときは{{Yes, let's.}}、ことわるときは{{No, let's not.}}や Sorry, I can't. です。Yes, I do. のように do で答えないように注意しましょう。",
      figure: {
        type: "tree",
        title: "言われた文から返し方を選ぶ",
        root: {
          label: "言われた文",
          children: [
            {
              label: "命令・お願い",
              sub: "Open 〜. / Please 〜.",
              tone: "blue",
              children: [{ label: "OK.", sub: "All right. / Sure." }],
            },
            {
              label: "さそい",
              sub: "Let's 〜.",
              tone: "yellow",
              children: [
                { label: "Yes, let's.", sub: "さんせい" },
                { label: "No, let's not.", sub: "Sorry, I can't. も" },
              ],
            },
          ],
        },
      },
    },
  ],
  mistakes: [
    { wrong: "Please opens the window.", right: "Please open the window.", why: "命令文の動詞はいつも原形。主語がないので s はつきません。" },
    { wrong: "Are quiet.", right: "Be quiet.", why: "be動詞の命令文は原形の Be で始めます。am・are・is は使いません。" },
    { wrong: "Not run here.", right: "Don't run here.", why: "禁止の命令文は Don't で始めます。not だけでは文になりません。" },
    { wrong: "Let's playing soccer.", right: "Let's play soccer.", why: "Let's のあとも動詞は原形です。" },
  ],
  check: [
    { q: "You are kind to old people. を「〜しなさい」の命令文に。", a: "Be kind to old people.", why: "you をとり、are を原形の be にかえる。" },
    { q: "「ここで写真をとってはいけません。」（take pictures を使って）", a: "Don't take pictures here.", why: "禁止は Don't＋動詞の原形。" },
    { q: "Let's go to the park. にさんせいするときの答えは？", a: "Yes, let's.", why: "Let's 〜. には Yes, let's. / No, let's not. で答える。" },
  ],
  next: [
    { label: "4択ドリル「命令文」に挑戦", href: "/learn/eibunpo-chu/j-en-1-meirei" },
    { label: "復習「be動詞」のレクチャー", href: "/learn/lecture/j-en-1-be" },
    { label: "つぎに「助動詞 can」", href: "/learn/eibunpo-chu/j-en-1-can" },
  ],
};
