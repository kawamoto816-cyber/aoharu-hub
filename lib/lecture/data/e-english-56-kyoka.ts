import type { Lecture } from "../types";

export const E_ENGLISH_56_KYOKA: Lecture = {
  unit: "e-english-56-kyoka",
  nameRuby: "曜日と教科・時間割《じかんわり》",
  title: "時間割《じかんわり》は「I have ＋教科＋on ＋曜日.」で伝える",
  hook: "「月曜日は算数と体育があるよ」と、毎日の時間割《じかんわり》の話はよくしますね。英語では、曜日・教科の言葉と、I have 〜. の形を組み合わせると時間割《じかんわり》を伝えられます。曜日の前の on、時刻《じこく》の前の at という小さな言葉も、ここでいっしょに覚えましょう。",
  sections: [
    {
      heading: "曜日は7つとも day で終わる",
      body: "曜日の言葉は、{{どれも day で終わり}}、{{大文字で始めます}}。Tuesday（火曜日）と Thursday（木曜日）は、始まりがにているのでまちがえやすい組です。Tu は火曜日、Th は木曜日と覚えましょう。今日の曜日は What day is it today? と聞き、It's Friday. のように答えます。",
      figure: {
        type: "compare",
        title: "曜日の言い方",
        columns: [{ title: "英語", tone: "yellow" }, { title: "短い書き方", tone: "plain" }],
        rows: [
          { label: "日曜日", cells: ["Sunday", "Sun."] },
          { label: "月曜日", cells: ["Monday", "Mon."] },
          { label: "火曜日", cells: ["Tuesday", "Tue."] },
          { label: "水曜日", cells: ["Wednesday", "Wed."] },
          { label: "木曜日", cells: ["Thursday", "Thu."] },
          { label: "金曜日", cells: ["Friday", "Fri."] },
          { label: "土曜日", cells: ["Saturday", "Sat."] },
        ],
        note: "Wednesday の d は読まないが、書くときはわすれずに。",
      },
    },
    {
      heading: "教科の言葉：大文字で始めるのは2つだけ",
      body: "教科の言葉は、算数 {{math}}、理科 {{science}}、社会 {{social studies}}、体育 {{P.E.}} などです。このうち国語の {{Japanese}} と英語の {{English}} は、「日本語」「英語」という{{ことばの名前なので大文字}}で始めます。ほかの教科は小文字で書きます。好きな教科は What subject do you like? と聞きます。",
      figure: {
        type: "tree",
        title: "教科の書き始め",
        root: {
          label: "教科",
          children: [
            {
              label: "大文字で始める",
              sub: "ことばの名前",
              tone: "yellow",
              children: [{ label: "Japanese", sub: "国語" }, { label: "English", sub: "英語" }],
            },
            {
              label: "小文字で始める",
              sub: "ほかの教科",
              tone: "blue",
              children: [
                { label: "math", sub: "算数" },
                { label: "science", sub: "理科" },
                { label: "music", sub: "音楽" },
                { label: "P.E.", sub: "体育（短い形）" },
              ],
            },
          ],
        },
        note: "社会 social studies、図工 arts and crafts、家庭科 home economics も小文字。",
      },
    },
    {
      heading: "時間割《じかんわり》は I have 〜 on 〜.",
      body: "「〜の授業があります」は {{I have ＋教科.}} で言います。曜日をつけるときは、曜日の前に {{on}} をおきます。たずねるときは What do you have on Monday? と聞き、I have math and music. のように答えます。2つ以上の教科は and でつなぎます。",
      figure: {
        type: "formula",
        title: "時間割《じかんわり》の文を組み立てる",
        prose: true,
        steps: [
          { expr: "I have {{science}}.", note: "理科の授業がある" },
          { expr: "I have science {{and P.E.}}", note: "and で教科をふやす" },
          { expr: "I have science and P.E. {{on Wednesday}}.", note: "曜日の前は on" },
          { expr: "What do you have {{on Wednesday}}?", note: "たずねる文" },
        ],
      },
    },
    {
      heading: "曜日の前は on、時刻《じこく》の前は at",
      body: "「〜曜日に」は {{on}}、「〜時に」は {{at}} を使います。I get up at seven. は「7時に起きる」、I have P.E. on Friday. は「金曜日に体育がある」です。時刻《じこく》は What time is it? と聞き、It's eight thirty. のように答えます。",
      figure: {
        type: "compare",
        title: "on と at の使い分け",
        columns: [{ title: "on", tone: "blue" }, { title: "at", tone: "red" }],
        rows: [
          { label: "前におく言葉", cells: ["曜日", "時刻《じこく》"] },
          { label: "例", cells: ["on Monday", "at 8:30"] },
          { label: "文の例", cells: ["I swim on Sunday.", "I get up at 6:30."] },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "I have math in Monday.", right: "I have math on Monday.", why: "曜日の前には on を使います。" },
    { wrong: "木曜日を Tuesday と書く。", right: "木曜日は Thursday、火曜日は Tuesday。", why: "Tu で始まるのが火曜日、Th で始まるのが木曜日です。" },
    { wrong: "I like japanese.", right: "I like Japanese.", why: "Japanese（国語・日本語）は、ことばの名前なので大文字で始めます。" },
  ],
  check: [
    { q: "水曜日を英語で書きましょう。", a: "Wednesday", why: "d をわすれやすいので、つづりを確かめる。" },
    { q: "I have P.E. ___ Friday. の ___ に入る言葉は？", a: "on", why: "曜日の前は on。" },
    { q: "「何の教科が好きですか」を英語で言いましょう。", a: "What subject do you like?", why: "subject は「教科」。" },
  ],
  next: [
    { label: "ポイントと練習問題「曜日と教科・時間割《じかんわり》」", href: "/learn/eigo-sho/e-english-56-kyoka" },
    { label: "小3・4「曜日と天気」", href: "/learn/eigo-sho/e-english-34-youbi-tenki" },
    { label: "つぎの単元「できること（can）」", href: "/learn/eigo-sho/e-english-56-can" },
  ],
};
