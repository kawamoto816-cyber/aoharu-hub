import type { Lecture } from "../types";

export const E_ENGLISH_56_YUME: Lecture = {
  unit: "e-english-56-yume",
  nameRuby: "将来《しょうらい》の夢（I want to be 〜.）",
  title: "「なりたい」は want to be。仕事の言葉に a・an をつけ、理由をつけたす",
  hook: "卒業文集などで「将来《しょうらい》の夢」を書くことがありますね。英語で夢を伝えるときは、I want to be 〜. という決まった形を使います。理由までつけたせると、自分のことをもっとよく分かってもらえます。",
  sections: [
    {
      heading: "want・want to・want to be のちがい",
      body: "{{I want 〜.}} は「〜がほしい」、{{I want to 〜.}} は「〜したい」です。そこに be を入れた {{I want to be 〜.}} が「〜になりたい」です。be は「〜になる」の意味なので、後ろに仕事の言葉を置きます。",
      figure: {
        type: "formula",
        title: "want のあとで意味が変わる",
        prose: true,
        steps: [
          { expr: "I want {{a ball}}.", note: "ほしい（もの）" },
          { expr: "I want {{to play}} soccer.", note: "したい（動作）" },
          { expr: "I want {{to be}} a soccer player.", note: "なりたい（仕事）" },
        ],
      },
    },
    {
      heading: "仕事の言葉の前は a か an",
      body: "仕事の言葉の前には、{{a}} をつけます。ただし、artist や astronaut のように{{母音の音（ア・イ・ウ・エ・オに近い音）で始まる言葉}}には {{an}} をつけます。a をわすれて I want to be teacher. とすると、まちがいになります。",
      figure: {
        type: "tree",
        title: "a と an の使い分け",
        root: {
          label: "仕事の言葉の前",
          tone: "navy",
          children: [
            {
              label: "a",
              sub: "ふつうはこちら",
              tone: "blue",
              children: [{ label: "a doctor" }, { label: "a pilot" }],
            },
            {
              label: "an",
              sub: "母音の音で始まる",
              tone: "yellow",
              children: [{ label: "an artist" }, { label: "an astronaut" }],
            },
          ],
        },
        note: "astronaut は宇宙飛行士《うちゅうひこうし》のことです。",
      },
    },
    {
      heading: "仕事の言葉と理由",
      body: "夢のあとに{{理由}}をつけたすと、話が伝わりやすくなります。理由は I like 〜.（〜がすき）や I can 〜.（〜できる）で言います。仕事の言葉と、それに合う理由をセットで覚えましょう。",
      figure: {
        type: "compare",
        title: "仕事の言葉と理由の例",
        columns: [{ title: "英語", tone: "yellow" }, { title: "日本語" }, { title: "理由の例" }],
        rows: [
          { cells: ["vet", "獣医《じゅうい》", "I like animals."] },
          { cells: ["cook", "料理人", "I like cooking."] },
          { cells: ["farmer", "農家", "I like vegetables."] },
          { cells: ["nurse", "看護師《かんごし》", "I want to help."] },
          { cells: ["singer", "歌手", "I like singing."] },
        ],
      },
    },
    {
      heading: "夢を伝える・たずねる",
      body: "相手の夢をたずねるときは {{What do you want to be?}} と聞きます。答えは I want to be a vet. I like animals. のように、「夢→理由」の順に言います。{{My dream is to be 〜.}}（わたしの夢は〜になることです）という言い方もあります。",
    },
  ],
  mistakes: [
    { wrong: "I want to be teacher.", right: "I want to be a teacher.", why: "仕事の言葉の前には a をつけます。" },
    { wrong: "I want to be a artist.", right: "I want to be an artist.", why: "artist は母音の音で始まるので an をつけます。" },
    { wrong: "I want be a pilot.", right: "I want to be a pilot.", why: "「〜になりたい」は want to be。to をわすれないようにします。" },
  ],
  check: [
    { q: "I want to be ___ astronaut. の ___ に入るのは？", a: "an", why: "astronaut は母音の音で始まるので an。" },
    { q: "「料理人になりたい」を英語で言うと？", a: "I want to be a cook.", why: "なりたいは want to be。cook の前に a。" },
    { q: "相手の夢をたずねる文は？", a: "What do you want to be?", why: "「何になりたいですか」なので What で始める。" },
  ],
  next: [
    { label: "「将来《しょうらい》の夢」のドリル", href: "/learn/eigo-sho/e-english-56-yume" },
    { label: "つぎの図解レクチャー「小学校の思い出」", href: "/learn/lecture/e-english-56-omoide" },
    { label: "中学の図解レクチャー「不定詞《ふていし》」", href: "/learn/lecture/j-en-2-futeishi" },
  ],
};
