import type { Lecture } from "../types";

export const E_ENGLISH_56_OMOIDE: Lecture = {
  unit: "e-english-56-omoide",
  title: "思い出は My best memory is 〜. したことは過去の形、気持ちは It was 〜.",
  hook: "6年間の小学校生活には、運動会や修学旅行など、たくさんの行事がありました。英語でいちばんの思い出を話すときは、行事の言葉と過去の形を組み合わせます。卒業の前に、自分の思い出を英語で伝えてみましょう。",
  sections: [
    {
      heading: "6年間の行事をふり返る",
      body: "まず、どの行事がいちばんの思い出かを考えます。いちばんの思い出は {{My best memory is 〜.}} で言います。行事はみんなでしたことなので、したことは I だけでなく {{We}}（わたしたちは）で話すこともよくあります。",
      figure: {
        type: "timeline",
        title: "小学校の行事の例",
        events: [
          { year: 1, yearLabel: "1年生", label: "入学式" },
          { year: 2, yearLabel: "2年生", label: "遠足" },
          { year: 4, yearLabel: "4年生", label: "運動会" },
          { year: 5, yearLabel: "5年生", label: "林間学校" },
          { year: 6, yearLabel: "6年生", label: "修学旅行", key: true },
        ],
        note: "行事や学年は学校によってちがいます。",
      },
    },
    {
      heading: "行事の言葉",
      body: "行事の名前は、決まった言い方を覚えておきます。sports day（運動会）や school trip（修学旅行）は、よく使う言葉です。My best memory is our sports day. のように、our（わたしたちの）や the をつけて言います。",
      figure: {
        type: "compare",
        title: "行事の言い方",
        columns: [{ title: "日本語" }, { title: "英語", tone: "yellow" }],
        rows: [
          { cells: ["入学式", "entrance ceremony"] },
          { cells: ["遠足", "field trip"] },
          { cells: ["運動会", "sports day"] },
          { cells: ["音楽会", "music festival"] },
          { cells: ["修学旅行", "school trip"] },
          { cells: ["卒業式", "graduation ceremony"] },
        ],
      },
    },
    {
      heading: "思い出を伝える4つの文",
      body: "思い出は「{{思い出→したこと→見たもの・食べたもの→感想}}」の順に話すと、まとまります。したことはもうすんだことなので、went・saw・ate などの{{過去の形}}を使います。",
      figure: {
        type: "formula",
        title: "修学旅行の思い出を話す",
        prose: true,
        steps: [
          { expr: "My best memory is our {{school trip}}.", note: "いちばんの思い出" },
          { expr: "We {{went}} to Nikko.", note: "したこと（go → went）" },
          { expr: "We {{saw}} a big waterfall.", note: "見たもの（see → saw）" },
          { expr: "It {{was}} beautiful.", note: "感想（is → was）" },
        ],
        note: "waterfall は滝《たき》のことです。",
      },
    },
    {
      heading: "感想の言葉をえらぶ",
      body: "最後の感想で、話の気持ちが決まります。行事やものの感想は {{It was 〜.}}、自分の気持ちは {{I was 〜.}}（I was happy. など）で言います。思い出に合う言葉をえらびましょう。",
      figure: {
        type: "tree",
        title: "It was のあとに入る言葉",
        root: {
          label: "It was 〜.",
          tone: "navy",
          children: [
            { label: "楽しかった", sub: "fun", tone: "yellow" },
            { label: "わくわくした", sub: "exciting", tone: "yellow" },
            { label: "美しかった", sub: "beautiful", tone: "blue" },
            { label: "おいしかった", sub: "delicious", tone: "blue" },
          ],
        },
      },
    },
  ],
  mistakes: [
    { wrong: "We go to Kyoto on our school trip.（思い出として）", right: "We went to Kyoto on our school trip.", why: "すんだことなので、go の過去の形 went を使います。" },
    { wrong: "We seed a big temple.", right: "We saw a big temple.", why: "see は ed をつけず、saw に形が変わります。" },
    { wrong: "（運動会の思い出で）It is exciting.", right: "It was exciting.", why: "すんだことの感想なので、is ではなく was を使います。" },
  ],
  check: [
    { q: "「運動会」を英語で言うと？", a: "sports day", why: "school trip は修学旅行、music festival は音楽会。" },
    { q: "What's your best memory? と聞かれたら、答えの文は何で始める？", a: "My best memory is 〜.", why: "「わたしのいちばんの思い出は〜です」の形で答える。" },
    { q: "We ___ a song.（歌った）の ___ に入るのは？", a: "sang", why: "sing（歌う）の過去の形は sang。" },
  ],
  next: [
    { label: "「小学校の思い出」のドリル", href: "/learn/eigo-sho/e-english-56-omoide" },
    { label: "ひとつ前の図解レクチャー「したことを伝える」", href: "/learn/lecture/e-english-56-kako" },
    { label: "つぎの図解レクチャー「中学校でしたいこと」", href: "/learn/lecture/e-english-56-chugaku" },
  ],
};
