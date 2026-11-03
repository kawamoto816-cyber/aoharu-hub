import type { Lecture } from "../types";

const C = "/media/commons/e-english-34-aisatsu";

export const E_ENGLISH_34_AISATSU: Lecture = {
  unit: "e-english-34-aisatsu",
  title: "あいさつは時刻《じこく》で選《えら》び、気持ちは I'm 〜. で伝《つた》える",
  hook: "朝、友だちに「おはよう」と言うと、一日が気持ちよく始まりますね。英語《えいご》でも、あいさつは人となかよくなる第一歩です。まずは耳で聞いて、まねして、声に出して言ってみましょう。",
  mystery: "児童館《じどうかん》で、アメリカの子どもとテレビ電話をしました。日本は土曜日の朝10時。こちらが Good morning! と言うと、画面の向こうの子は Good evening! と返してきました。でも、どちらもまちがいではありません。同じときに話しているのに、なぜあいさつがちがうのでしょう？",
  mission: {
    from: "児童館《じどうかん》の先生",
    request: "来月、児童館《じどうかん》で、アメリカのニューヨークの子どもたちとテレビ電話の交流会を開きます。練習のとき、こちらの Good morning! に Good evening! と返されて、子どもたちが「向こうがまちがえてるよ」とざわざわしてしまいました。本番の前に、みんなにきちんと説明《せつめい》したいのです。名探偵《めいたんてい》のあなたに、あいさつがちがったわけを見つけてほしいのです。",
    thanks: "あいさつは、それぞれがいる場所の時刻《じこく》で選《えら》ぶのですね。本番では、時計を2つならべて、日本の朝とニューヨークの夜を見せながら説明《せつめい》します。最後《さいご》に向こうの子が Good night! と言ったら、こちらは See you! と笑顔《えがお》で返します。",
  },
  sections: [
    {
      heading: "時刻《じこく》で変《か》わるあいさつ",
      body: "英語《えいご》のあいさつは、時刻《じこく》によって言葉が変《か》わります。朝は {{Good morning.}}、昼すぎは {{Good afternoon.}}、夜ねる前は {{Good night.}} です。{{Hello.}} は、いつでも使える {{便利《べんり》}} なあいさつです。",
      reading: [
        "朝、近所の人に「おはようございます」。夜、家族に「おやすみなさい」。日本語でも、あいさつは時刻《じこく》で変《か》わりますね。英語《えいご》も同じです。{{Good morning.}} は朝から昼の12時ごろまで、{{Good afternoon.}} は昼すぎから夕方まで、{{Good evening.}} は夕方から夜に人と会ったときに使います。Good morning. は「よい朝を」という意味です。もとは「あなたによい朝がありますように」と願《ねが》う言葉だったといわれます。あいさつは、相手におくる小さなプレゼントなのです。",
        "気をつけたいのは {{Good night.}} です。夜のあいさつに見えますが、意味は「おやすみなさい」。夜に別《わか》れるときや、ねる前に言う言葉で、人と会ったときには使いません。イギリスのスコットランドで、子どもたちがねる前に言っていた短い歌が、1901年の本に書きとめられています。sleep tight は「ぐっすりねむってね」、bugs は小さな虫のことです。night・tight・bite と、終わりの音が「アイト」でそろっているので、口に出すと楽しく、すぐに覚《おぼ》えられます。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "Good night, sleep tight;\nDon't let the bugs bite.",
        ja: "おやすみ、ぐっすりねむってね。\n虫にかまれないようにね。",
        cite: "Traditional rhyme, \"On Going to Bed\" (R. C. Maclagan, The Games & Diversions of Argyleshire, 1901)",
        source: "https://archive.org/details/gamesdiversionso00macluoft",
      }],
      photos: [
        {
          src: `${C}/bigben.webp`, width: 800, height: 1198,
          alt: "川ぞいの古いたてものの中に立つ、大きな丸い時計がついた高い時計台",
          caption: "イギリスのロンドンにある時計台（ビッグ・ベン）。英語《えいご》の国でも、人々は時計を見ながら、Good morning. や Good afternoon. を使い分けています。",
          credit: { author: "Colin", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:Elizabeth_Tower_2014-09-21_205MP.jpg" },
        },
      ],
      figure: {
        type: "flow",
        dir: "row",
        title: "朝・昼・夜のあいさつ",
        steps: [
          { label: "Good morning.", sub: "朝", tone: "yellow" },
          { label: "Good afternoon.", sub: "昼すぎ", tone: "blue" },
          { label: "Good night.", sub: "夜ねる前", tone: "navy" },
        ],
        note: "夜に人と会ったときは Good evening.。Good night. は「おやすみなさい」です。",
      },
      cliff: "では、はじめて会う人には、どんなあいさつをするのでしょう？",
    },
    {
      heading: "はじめて会ったとき",
      body: "はじめて会った人には、自分の名前を {{I'm 〜.}} で言い、{{Nice to meet you.}} と言います。言われた人は、最後《さいご》に {{too}} をつけて返します。相手の目を見て、にっこり言うのがコツです。",
      reading: [
        "はじめて会った人には、まず Hello. と言い、{{I'm 〜.}} で名前を伝《つた》えます。そして {{Nice to meet you.}}（会えてうれしいです）。言われた人は、同じ言葉の最後《さいご》に {{too}} をつけて、Nice to meet you, too.（こちらこそ）と返します。英語《えいご》を話す国では、このとき相手の目を見て、笑顔《えがお》で言うことが大切にされます。日本のおじぎのかわりに、手と手をにぎるあく手をすることもあります。",
      ],
      figure: {
        type: "formula",
        title: "はじめましての会話",
        prose: true,
        steps: [
          { label: "A", expr: "Hello. {{I'm}} Hana." },
          { label: "B", expr: "Hi, Hana. {{I'm}} Leo." },
          { label: "A", expr: "{{Nice to meet you.}}" },
          { label: "B", expr: "Nice to meet you, {{too}}.", note: "「こちらこそ」" },
        ],
      },
      cliff: "なかよくなったら、つぎは相手の様子を聞いてみましょう。",
    },
    {
      heading: "How are you? と気持ちの言葉",
      body: "相手の様子を聞くときは {{How are you?}} と言います。答えるときは {{I'm 〜.}} のあとに、今の気持ちの言葉を入れます。聞くときは、言葉だけでなく、顔や声の様子にも注目すると、意味が分かりやすくなります。",
      reading: [
        "{{How are you?}} は「元気？」と様子をたずねる言葉です。答えるときは {{I'm 〜.}} のあとに、今の気持ちや体の様子を入れます。元気なら I'm fine. や I'm great.、おなかがすいていたら I'm hungry.。正直に答えてよいのです。答えたあとに And you?（あなたは？）と聞き返すと、会話がぐんと長くなります。聞く人は、言葉だけでなく、相手の顔つきや声の調子にも気をつけると、気持ちがよく分かります。",
      ],
      figure: {
        type: "compare",
        title: "I'm 〜. で言える気持ち",
        columns: [{ title: "英語《えいご》", tone: "blue" }, { title: "意味", tone: "yellow" }],
        rows: [
          { cells: ["I'm fine.", "元気です"] },
          { cells: ["I'm great.", "とても元気です"] },
          { cells: ["I'm happy.", "うれしいです"] },
          { cells: ["I'm hungry.", "おなかがすいています"] },
          { cells: ["I'm sleepy.", "ねむいです"] },
          { cells: ["I'm tired.", "つかれています"] },
          { cells: ["I'm sad.", "悲しいです"] },
        ],
      },
      cliff: "あいさつと気持ちの言葉をつなげると、何ができるでしょう？",
    },
    {
      heading: "会話をつなげてみよう",
      body: "あいさつ、様子を聞く、答える、お別《わか》れ、とつなげると、短い会話ができます。お別《わか》れは {{See you.}} や {{Goodbye.}} です。お礼の {{Thank you.}} には {{You're welcome.}}（どういたしまして）と返します。",
      reading: [
        "あいさつ、様子を聞く、答える、お別《わか》れ。この4つをつなげると、それだけで立派《りっぱ》な会話になります。お別《わか》れは {{See you.}}（またね）や {{Goodbye.}}。夜に別《わか》れるときや、ねる前なら Good night. も使えます。何かしてもらったら {{Thank you.}}、言われたら {{You're welcome.}}（どういたしまして）。短い言葉でも、時刻《じこく》と場面に合わせて選《えら》べば、相手に気持ちがまっすぐ届《とど》きます。",
      ],
      figure: {
        type: "flow",
        dir: "col",
        title: "友だちとの会話の流れ",
        steps: [
          { label: "Hello, Mio.", sub: "あいさつ", tone: "blue" },
          { label: "How are you?", sub: "様子を聞く", tone: "plain" },
          { label: "I'm happy.", sub: "気持ちを答える", tone: "yellow" },
          { label: "See you.", sub: "またね", tone: "navy" },
        ],
      },
      cliff: "では、海の向こうの友だちと話すときも、あいさつは同じでよいのでしょうか？",
    },
    {
      heading: "地球の反対側《はんたいがわ》とあいさつ",
      body: "あいさつは、{{自分がいる場所の時刻《じこく》}}で選《えら》びます。地球は1日に1回まわっているので、日本が朝のとき、地球の反対側《はんたいがわ》は夜です。同じときに話していても、場所によってあいさつが変《か》わります。",
      reading: [
        "地球は、こまのように1日に1回まわっています。太陽の光が当たっている側《がわ》が昼、当たっていない側《がわ》が夜です。そのため、日本が朝のとき、海の向こうのアメリカのニューヨークは、前の日の夜です。夏なら、日本の土曜日の朝10時は、ニューヨークでは金曜日の夜9時。時計の数字だけでなく、曜日までちがうのです。",
        "インターネットを使えば、遠い国の人と顔を見ながら話せます。そんなとき、日本の子が Good morning!、ニューヨークの子が Good evening! と言ったら、どちらも正解《せいかい》です。それぞれが、自分のいる場所の時刻《じこく》であいさつを選《えら》んでいるからです。話が終わったら、ニューヨークの子はもうすぐねる時間なので Good night!。日本の子は See you! と返せばいいですね。",
      ],
      figure: {
        type: "compare",
        title: "同じときの日本とニューヨーク（夏）",
        columns: [{ title: "日本", tone: "yellow" }, { title: "ニューヨーク", tone: "navy" }],
        rows: [
          { label: "時刻《じこく》", cells: ["土曜日の朝10時", "金曜日の夜9時"] },
          { label: "会ったとき", cells: ["Good morning!", "Good evening!"] },
          { label: "別《わか》れるとき", cells: ["See you!", "Good night!"] },
        ],
        note: "冬は1時間ずれて、ニューヨークは夜8時になります。",
      },
      photos: [
        {
          src: `${C}/day-night.webp`, width: 800, height: 533,
          alt: "うちゅうから見た地球。左がわは暗く、右がわは明るく光っている。右はしにうちゅうステーションのパネル",
          caption: "宇宙《うちゅう》ステーションから見た地球。左の暗いところは夜、右の明るいところは昼です。地球の半分はいつも夜なので、同じときでも国によってあいさつがちがいます。",
          credit: { author: "Christina Koch / NASA", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:From_Day_Into_Night.jpg" },
        },
      ],
      reveal: "日本の土曜日の朝10時は、ニューヨークでは金曜日の夜9時です。地球がまわっているので、場所によって時刻《じこく》がちがいます。日本の子は自分の朝に合わせて {{Good morning!}}、アメリカの子は自分の夜に合わせて {{Good evening!}} と言ったのです。あいさつは{{自分がいる場所の時刻《じこく》}}で選《えら》ぶので、2つともまちがいではありません。夜に会ったので、Good night. ではなく Good evening. を選《えら》んだのも、かんぺきです。",
    },
  ],
  story: {
    kind: "manzai",
    title: "夜のおはよう、朝のおやすみ",
    cast: ["コウタ", "リン"],
    lines: [
      { who: "コウタ", text: "どうもー、コウタです！　ぼく、英語《えいご》のあいさつを全部覚《おぼ》えました！" },
      { who: "リン", text: "リンです。じゃあテスト。今は夜の7時。友だちに会いました。" },
      { who: "コウタ", text: "Good morning!", say: "グッド・モーニング！" },
      { who: "リン", text: "朝のあいさつ！　夜の7時に「おはよう」は、おかしいでしょ。" },
      { who: "コウタ", text: "だって、さっき昼ねから起きたばかりなんだもん。" },
      { who: "リン", text: "起きた時間じゃなくて、今の{{時刻《じこく》}}で選《えら》ぶの！　朝は Good morning、昼すぎは Good afternoon。", say: "起きた時間じゃなくて、今の時刻で選ぶの！ 朝はグッド・モーニング、昼すぎはグッド・アフタヌーン。" },
      { who: "コウタ", text: "じゃあ夜だから、Good night!", say: "じゃあ夜だから、グッド・ナイト！" },
      { who: "リン", text: "会ったとたんに「おやすみなさい」？　友だち、すぐ帰っちゃうよ。" },
      { who: "コウタ", text: "えっ、Good night って「こんばんは」じゃないの？", say: "えっ、グッド・ナイトって、こんばんは、じゃないの？" },
      { who: "リン", text: "Good night は、{{別《わか》れるときやねる前}}の言葉。夜に会ったときは {{Good evening}}。", say: "グッド・ナイトは、別れるときやねる前の言葉。夜に会ったときは、グッド・イブニング。" },
      { who: "コウタ", text: "なるほど。じゃあ朝、学校で先生に会ったら、Good night!", say: "なるほど。じゃあ朝、学校で先生に会ったら、グッド・ナイト！" },
      { who: "リン", text: "朝からねないで！　先生にも Good morning でしょ。", say: "朝からねないで！ 先生にもグッド・モーニングでしょ。" },
      { who: "コウタ", text: "こんがらがってきた。いつでも使えるあいさつはないの？" },
      { who: "リン", text: "あるよ。{{Hello}} なら、朝でも昼でも夜でもだいじょうぶ。", say: "あるよ。ハローなら、朝でも昼でも夜でもだいじょうぶ。" },
      { who: "コウタ", text: "分かった！　夜、会ったら Good evening、帰るときは Good night。", say: "分かった！ 夜、会ったらグッド・イブニング、帰るときはグッド・ナイト。" },
      { who: "リン", text: "そう。それで、かんぺき。" },
      { who: "コウタ", text: "じゃあ、お客さんにも。Good night, sleep tight!", say: "じゃあ、お客さんにも。グッド・ナイト、スリープ・タイト！" },
      { who: "リン", text: "お客さんをねかせないで！　もういいよ。" },
      { who: "コウタ", text: "どうも、ありがとうございました！" },
    ],
    note: "コウタとリンは作り話の人で、会話も作り話です。あいさつの使い分けは、ふだんの英語《えいご》の使い方にもとづいています。Good night, sleep tight は、イギリスで昔から子どもがねる前に言ってきた言葉です。",
  },
  mistakes: [
    {
      wrong: "夜に会った人へ Good night. と言う",
      right: "会ったときは Hello. や Good evening.",
      why: "Good night. は、別《わか》れるときやねる前の「おやすみなさい」です。",
    },
    {
      wrong: "Nice to meet you. に Nice to meet you. と同じように返す",
      right: "Nice to meet you, too.",
      why: "最後《さいご》に too をつけると「こちらこそ」の意味になります。",
    },
    {
      wrong: "How are you? に Yes. と答える",
      right: "I'm fine. のように気持ちを答える",
      why: "How are you? は「元気？」と様子を聞く言葉なので、はい・いいえでは答えません。",
    },
  ],
  check: [
    { q: "朝、先生に会いました。英語《えいご》で何と言う？", a: "Good morning.", why: "朝のあいさつは Good morning. です。" },
    { q: "How are you? と聞かれて、ねむいとき何と答える？", a: "I'm sleepy.", why: "sleepy は「ねむい」です。" },
    { q: "Thank you. と言われたら、何と返す？", a: "You're welcome.", why: "「どういたしまして」の意味です。" },
  ],
  next: [
    { label: "「あいさつと気持ち」のカード", href: "/learn/eigo-sho/e-english-34-aisatsu" },
    { label: "図解《ずかい》レクチャー「数の言い方」", href: "/learn/lecture/e-english-34-kazu" },
    { label: "「好《す》きなものを伝《つた》える」のカード", href: "/learn/eigo-sho/e-english-34-suki" },
  ],
};
