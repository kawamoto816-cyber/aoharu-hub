import type { Lecture } from "../types";

export const E_ENGLISH_56_HINDO: Lecture = {
  unit: "e-english-56-hindo",
  nameRuby: "一日の生活と頻度《ひんど》（always・usually・sometimes）",
  title: "「どのくらいするか」は always・usually・sometimes・never。置く場所は動作の言葉の前",
  hook: "毎朝ごはんを食べる人もいれば、ときどき食べない人もいますね。英語では「いつも」「たいてい」「ときどき」を1語で言い分けられます。一日の生活といっしょに使えるようになると、自分のくらしをくわしく伝えられます。",
  sections: [
    {
      heading: "一日の生活を順に言う",
      body: "一日の生活は「I＋動作の言葉」で言います。起きるは {{get up}}、ねるは {{go to bed}} です。時刻《じこく》をつけるときは {{at}} を使い、I get up at 6:30. のように言います。",
      figure: {
        type: "flow",
        dir: "col",
        title: "ある子の一日",
        steps: [
          { label: "6:30 起きる", sub: "get up", tone: "yellow" },
          { label: "7:00 朝ごはん", sub: "eat breakfast" },
          { label: "7:50 学校へ", sub: "go to school" },
          { label: "5:00 宿題", sub: "do my homework" },
          { label: "9:00 ねる", sub: "go to bed", tone: "navy" },
        ],
      },
    },
    {
      heading: "回数の言葉を、ものさしで見る",
      body: "どのくらいするかは、{{always}}（いつも）、{{usually}}（たいてい）、{{sometimes}}（ときどき）、{{never}}（決して〜ない）で表します。always がいちばん多く、never は「1回もしない」です。never だけで「しない」の意味になるので、don't はつけません。",
      figure: {
        type: "area",
        kind: "bar",
        title: "する回数のめやす",
        max: 100,
        bars: [
          { label: "always", parts: [{ value: 100, tone: "navy" }], total: "いつも" },
          { label: "usually", parts: [{ value: 80, tone: "blue" }, { value: 20, tone: "plain" }], total: "たいてい" },
          { label: "sometimes", parts: [{ value: 40, tone: "yellow" }, { value: 60, tone: "plain" }], total: "ときどき" },
          { label: "never", parts: [{ value: 100, tone: "plain" }], total: "しない" },
        ],
        scale: [
          { at: 0, label: "0" },
          { at: 50, label: "半分" },
          { at: 100, label: "毎回" },
        ],
        scaleLabel: "する回数",
        note: "数字はおよそのめやすです。色のついた部分が「する」回数です。",
      },
    },
    {
      heading: "回数の言葉は、動作の言葉の前に置く",
      body: "回数の言葉は、{{動作の言葉のすぐ前}}に置きます。I walk my dog. なら、I usually walk my dog. です。文の終わりにつけたり、動作の言葉の後ろに置いたりはしません。",
      figure: {
        type: "formula",
        title: "回数の言葉を入れる",
        prose: true,
        steps: [
          { expr: "I walk my dog.", note: "もとの文" },
          { expr: "I {{usually}} walk my dog.", note: "walk の前に入れる" },
          { expr: "I {{never}} eat natto.", note: "never だけで「食べない」" },
        ],
        note: "am・is・are の文では、その後ろに置きます（I am always happy.）。",
      },
    },
    {
      heading: "家の手伝いと、たずね方",
      body: "家の手伝いも、同じ形で言えます。時刻《じこく》は {{What time do you 〜?}}、放課後のことは {{What do you do after school?}} とたずねます。Do you always 〜? と聞かれたら、{{Yes, I do.}} か {{No, I don't.}} で答えます。",
      figure: {
        type: "compare",
        title: "家の手伝いの言い方",
        columns: [{ title: "日本語" }, { title: "英語", tone: "yellow" }],
        rows: [
          { cells: ["皿をあらう", "wash the dishes"] },
          { cells: ["部屋をそうじする", "clean my room"] },
          { cells: ["犬を散歩させる", "walk my dog"] },
          { cells: ["ごみを出す", "take out the garbage"] },
        ],
      },
    },
  ],
  mistakes: [
    { wrong: "I go always to school.", right: "I always go to school.", why: "回数の言葉は動作の言葉（go）の前に置きます。" },
    { wrong: "I get up in 6:30.", right: "I get up at 6:30.", why: "時刻《じこく》の前は at です。in は in the morning（朝に）のように使います。" },
    { wrong: "Do you usually walk your dog? — Yes, I usually.", right: "Yes, I do.", why: "Do you 〜? とたずねられたら、do を使って答えます。" },
  ],
  check: [
    { q: "「ときどき」を英語で言うと？", a: "sometimes", why: "always＝いつも、usually＝たいてい、sometimes＝ときどき。" },
    { q: "I eat breakfast at seven. に usually を入れると？", a: "I usually eat breakfast at seven.", why: "動作の言葉 eat の前に置く。" },
    { q: "I ___ play video games. を「決してしない」の文にするには？", a: "never", why: "never だけで「決して〜ない」。don't はつけない。" },
  ],
  next: [
    { label: "「一日の生活と頻度《ひんど》」のドリル", href: "/learn/eigo-sho/e-english-56-hindo" },
    { label: "ひとつ前の図解レクチャー「人を紹介《しょうかい》する」", href: "/learn/lecture/e-english-56-hito" },
    { label: "つぎの図解レクチャー「したことを伝える」", href: "/learn/lecture/e-english-56-kako" },
  ],
};
