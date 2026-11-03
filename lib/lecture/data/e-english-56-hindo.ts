import type { Lecture } from "../types";

const C = "/media/commons/e-english-56-hindo";

export const E_ENGLISH_56_HINDO: Lecture = {
  unit: "e-english-56-hindo",
  nameRuby: "一日の生活と頻度《ひんど》（always・usually・sometimes）",
  title: "「どのくらいするか」は always・usually・sometimes・never。置く場所は動作の言葉の前",
  hook: "毎朝ごはんを食べる人もいれば、ときどき食べない人もいますね。英語では「いつも」「たいてい」「ときどき」を1語で言い分けられます。一日の生活といっしょに使えるようになると、自分のくらしをくわしく伝えられます。",
  mystery: "英語は I eat breakfast.（わたしは食べる、朝ごはんを）のように、日本語とならび方が逆になることが多い言葉です。ところが「いつも」の always だけは、I always eat breakfast. と、日本語の「わたしはいつも朝ごはんを食べる」と同じく、動作の言葉の前にすわります。ならび方がちがう英語の中で、なぜここだけ日本語とそっくりなのでしょう？",
  mission: {
    from: "町の歯医者さん",
    request: "うちの歯医者には、外国から引っこしてきた家族も来てくれます。そこで、待合室に英語の歯みがきポスターをはろうと思いました。「英語は日本語と順番が逆」と聞いたので、I brush always my teeth. と書いたら、あるお母さんに「always の場所がちがいますよ」と言われてしまったのです。名探偵《めいたんてい》のあなたに、always がすわる席のなぞを解いてほしいのです。",
    thanks: "always は、動作の言葉 brush にぴたりと寄りそう言葉だったのですね。ポスターを I always brush my teeth. に直し、下に「あなたは always？ usually？ sometimes？」と書きました。子どもたちが、自分の回数を英語で言いながら笑ってくれます。",
  },
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
      reading: [
        "英語で一日の生活を言うときは、「I＋動作の言葉」が基本の形です。起きるは {{get up}}、朝ごはんを食べるは eat breakfast、学校へ行くは go to school、ねるは {{go to bed}} です。時刻《じこく》をつけたいときは、後ろに {{at}} と時刻《じこく》を続けます。I get up at 6:30. で「わたしは6時30分に起きます」。朝から夜まで、この形を順につなげれば、自分の一日を英語で話せます。",
        "一日の予定を英語で書いた、有名な人がいます。今からおよそ300年前のアメリカで、印刷の仕事をしていたベンジャミン・フランクリンです。のちに、雷《かみなり》が電気であることを凧《たこ》で確かめた人として、またアメリカの独立にかかわった人として知られるようになりました。フランクリンは若いころ、朝5時に起き、夜10時にねるという一日の計画を表にして、のちに自分の伝記に書き残しました。",
        "その表の朝のらんには、What good shall I do this day?（今日は、どんなよいことをしようか）という問いが書かれています。夜のらんには、What good have I done today?（今日は、どんなよいことをしたか）。一日の生活を言葉にすると、自分のくらしをふり返るきっかけにもなるのです。",
      ],
      photos: [
        {
          src: `${C}/franklin.webp`, width: 491, height: 815,
          alt: "古い本の1ページ。左に朝と夜の問い、真ん中に5から4までの時刻の数字、右に Rise、Work、Sleep などの英語がならぶ表",
          caption: "フランクリンの伝記にのっている「一日の計画表」。朝5時の Rise（起きる）から、夜10時からの Sleep（ねる）まで、一日の生活が英語で書かれています。",
          credit: { author: "The Atlantic（Commons の表記）", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Benjamin_Franklin%27s_Schedule.jpg" },
        },
        {
          src: `${C}/clock2.webp`, width: 800, height: 600,
          alt: "上に2つのベルがついた、銅色の目覚まし時計",
          caption: "ベルが2つついた目覚まし時計。朝の get up（起きる）は、多くの人にとって一日の始まりの合図です。",
          credit: { author: "Lankyrider", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:Mechanical_Alarm_Clock.jpg" },
        },
      ],
      cliff: "一日の動作は言えました。では「毎日」と「たまに」は、英語でどう言い分けるのでしょう？",
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
      reading: [
        "「どのくらいするか」を表す言葉は、{{always}}（いつも）、{{usually}}（たいてい）、{{sometimes}}（ときどき）、{{never}}（決して〜ない）の4つです。ばらばらに覚えると、usually と sometimes のどちらが多いのか、こんがらがりますね。そこで、1本の{{ものさし}}にならべてみましょう。いちばん上の100が always、80くらいが usually、半分より少ないあたりが sometimes、0が never です。",
        "このような目もりの考え方は、温度計とよく似ています。今からおよそ300年前、ファーレンハイトという人が、オランダのアムステルダムで、当時いちばん正確といわれた、数字の目もりつきの温度計を作りました。それまでは「暑い」「寒い」と人によって感じ方がばらばらでしたが、同じ目もりを使えば、だれとでも同じ「暑さ」を伝え合えます。アメリカでは今も、この人の名前がついた目もり（カ氏）で気温を言います。",
        "回数の言葉も、英語を話す人たちが共通に使う「心の目もり」です。数字はおよそのめやすで、きっちり決まっているわけではありません。それでも always と言えば「毎回」、never と言えば「1回もしない」と、だれにでも同じように伝わります。never には「しない」の意味がもう入っているので、don't はつけません。",
      ],
      photos: [
        {
          src: `${C}/fahrenheit.webp`, width: 800, height: 1067,
          alt: "金色の板に細い管がたて向きに取りつけられ、両わきに数字の目もりがきざまれた古い温度計",
          caption: "ファーレンハイトが1718年に作った温度計（オランダの博物館）。管の両わきに数字の目もりがあります。回数の言葉も、0から100の目もりにならべると整理できます。",
          credit: { author: "tacowitte", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0", source: "https://commons.wikimedia.org/wiki/File:Thermometer_by_D.G._Fahrenheit_(5192214397).jpg" },
        },
      ],
      cliff: "目もりは分かりました。では、この4つの言葉は、文のどこにすわるのでしょう？",
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
      reading: [
        "回数の言葉には、すわる席が決まっています。それは、{{動作の言葉のすぐ前}}です。I walk my dog.（わたしは犬を散歩させます）に usually を入れると、I usually walk my dog. になります。I walk usually my dog. のように動作の言葉の後ろに入れたり、文の終わりにつけたりはしません。",
        "英語は、I eat breakfast.（わたしは食べる、朝ごはんを）のように、日本語と逆のならび方になることがよくあります。ところが「わたしは{{いつも}}朝ごはんを食べる」と I {{always}} eat breakfast. を比べると、「いつも」も always も、動作の前にいます。回数の言葉は「その動作を、どのくらいするか」を伝える言葉です。だから、くわしくしたい動作の言葉に、ぴたりと寄りそうのです。",
        "ただし、am・is・are の文はちがいます。am・is・are は動作ではなく、「〜です」と人と様子をつなぐ言葉です。そのため、回数の言葉はその後ろに置き、I am always happy.（わたしはいつも元気です）のように言います。",
      ],
      reveal: "always などの回数の言葉は、「その動作を、どのくらいするか」をくわしくする言葉です。だから、くわしくする相手である{{動作の言葉のすぐ前}}に、ぴたりと寄りそってすわります。日本語の「いつも食べる」も同じで、「いつも」は「食べる」のすぐ前にいます。ならび方がちがう英語と日本語でも、この寄りそい方だけは同じなので、そっくりに見えるのです。",
      cliff: "回数の言葉が使えたら、次は友だちに「いつもするの？」とたずねてみましょう。",
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
      reading: [
        "家の手伝いも、同じ形で言えます。皿をあらうは wash the dishes、部屋をそうじするは clean my room、ごみを出すは take out the garbage です。回数の言葉を入れて、I sometimes wash the dishes.（ときどき皿をあらいます）のように言えば、家での自分の役わりまで伝わります。",
        "相手にたずねるときは、時刻《じこく》なら {{What time do you 〜?}}、放課後のことなら {{What do you do after school?}} と聞きます。「いつもするの？」と聞きたいときは、Do you always 〜? です。答えは、{{Yes, I do.}} か {{No, I don't.}} で返します。No, I don't. のあとに、I sometimes 〜. と回数を足すと、会話がはずみます。",
      ],
    },
  ],
  story: {
    kind: "manga4",
    title: "回数はジュースで量る",
    panels: [
      {
        scene: "台所。リクが英語のプリントを見て首をかしげ、ユイがジュースのコップを持ってくる。",
        lines: [
          { who: "リク", text: "usuallyとsometimes" },
          { who: "リク", text: "どっちが多いの？" },
          { who: "ユイ", text: "コップで考えよう" },
        ],
        art: {
          bg: "kitchen",
          cast: [
            { who: "リク", look: "boy", x: 254, face: "think", fx: "?" },
            { who: "ユイ", look: "girl", x: 86, face: "smile", hand: [126, 226] },
          ],
          props: [
            { kind: "table", x: 0, y: 240 },
            { kind: "book", x: 220, y: 258, s: 0.7 },
          ],
        },
      },
      {
        scene: "ユイが、コップの量を指でさしながら説明する。",
        lines: [
          { who: "ユイ", text: "まんたんがalways" },
          { who: "ユイ", text: "8分目がusually" },
          { who: "ユイ", text: "半分より下はsometimes" },
        ],
        art: {
          bg: "kitchen",
          cast: [
            { who: "ユイ", look: "girl", x: 254, face: "smile", fx: "idea", hand: [214, 226] },
            { who: "リク", look: "boy", x: 86, face: "surprise", fx: "!" },
          ],
          props: [
            { kind: "table", x: 0, y: 240 },
            { kind: "board", x: 170, y: 214, s: 0.8, text: "コップの目もり" },
          ],
        },
      },
      {
        scene: "リクがユイのコップを取り、ごくごくと全部飲んでしまう。",
        lines: [
          { who: "リク", text: "neverはからっぽ" },
          { who: "リク", text: "つまり、こう！" },
          { who: "ユイ", text: "それ、わたしの！" },
        ],
        art: {
          bg: "kitchen",
          cast: [
            { who: "リク", look: "boy", x: 254, face: "smile", hand: [214, 226] },
            { who: "ユイ", look: "girl", x: 86, face: "shout", fx: "steam" },
          ],
          props: [
            { kind: "table", x: 0, y: 240 },
            { kind: "straw", x: 214, y: 214, s: 0.8 },
          ],
        },
      },
      {
        scene: "からのコップの前で、ユイがうでを組む。リクはしょんぼり。",
        lines: [
          { who: "ユイ", text: "リクはalways" },
          { who: "ユイ", text: "人のジュースを飲む" },
          { who: "リク", text: "これからはneverです" },
        ],
        art: {
          bg: "kitchen",
          cast: [
            { who: "ユイ", look: "girl", x: 254, face: "shout", fx: "!" },
            { who: "リク", look: "boy", x: 86, face: "sweat", fx: "sweat" },
          ],
          props: [
            { kind: "table", x: 0, y: 240 },
            { kind: "board", x: 170, y: 214, s: 0.8, text: "0%=never" },
          ],
        },
      },
    ],
    note: "リクとユイは作り話の小学5年生です。回数の言葉をコップのジュースの量にたとえたのは、覚えるための工夫です。数字はおよそのめやすで、always がいちばん多く、never が「1回もしない」であることは事実です。",
  },
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
