import type { Lecture } from "../types";

const C = "/media/commons/e-english-56-oto-moji";

export const E_ENGLISH_56_OTO_MOJI: Lecture = {
  unit: "e-english-56-oto-moji",
  title: "文字には「名前」と「音」がある。音を聞けば、つづりが見えてくる",
  hook: "アルファベットの歌で言う a と、apple のはじめで聞こえる音は、少しちがいます。英語の文字には「名前」と「音」の2つがあり、音を知ると、知らない単語でも読んだり書いたりしやすくなります。口の形にも注意しながら、音と文字をつなげていきましょう。",
  mystery: "アルファベットの歌のとおりに bag を読むと「ビー・エー・ジー」。でも英語を話す人は、だれも bag をそう読みません。文字は1つも変わっていないのに、なぜ読み方がまるで別のものになるのでしょう？",
  mission: {
    from: "児童館の先生",
    request: "児童館の本だなに、英語の絵本を置きました。ところが1年生の子が、かばんの絵の下の bag を指して「ビーエージー！」と大きな声で読み、「英語の絵本はへんな名前ばかり」と、本をとじてしまいました。ABCの歌はちゃんと歌えるのに、なぜ単語が読めないのでしょう。名探偵《めいたんてい》のあなたに、このなぞを解いてほしいのです。",
    thanks: "歌で覚えたのは文字の「名前」で、単語を読むには「音」がいるのですね。本だなの横に「b の音はブッ」のカードをはって、音をつなげる遊びを始めます。きっと絵本を自分で読める子がふえます。",
  },
  sections: [
    {
      heading: "文字の「名前」と「音」",
      body: "アルファベットの歌で言う読み方は、文字の{{名前}}です。単語の中で実際に聞こえるのは、文字の{{音}}です。たとえば a の名前と、apple や ant のはじめの音はちがいます。単語を読むときは、{{音}}のほうを使います。",
      reading: [
        "日本語のかなは、「か」と書けば、名前も音も「か」です。ところが英語の文字には、{{名前}}と{{音}}の2つがあります。名前は、ABCの歌で言う読み方です。b なら「ビー」。これは、クラスの友だちを名前でよぶのと同じで、文字をよぶための読み方です。いっぽう、単語の中で鳴るのは{{音}}です。b の音は、くちびるをとじてから、ぱっと開いて出す、短い「ブッ」です。",
        "では、名前は何のためにあるのでしょう。電話で自分の名前のつづりを伝える場面を思いうかべてください。Ken なら「ケイ・イー・エン」と、文字の名前で一つずつ言います。音だけだと短すぎて、聞きまちがえやすいからです。英語の国の子どもも、名前と音の両方を習います。音と文字のつながりを学ぶ方法は、{{フォニックス}}とよばれています。",
        "音を使って読む練習は、ずっと昔からありました。今から300年ほど前のイギリスやアメリカの子どもは、取っ手のついた小さな板で文字を習いました。板には、アルファベットの下に ab・eb・ib や ba・be・bi のように、2つの文字の音をつなげる練習がならんでいます。",
      ],
      figure: {
        type: "compare",
        title: "名前と音のちがい",
        columns: [{ title: "文字の名前", tone: "blue" }, { title: "文字の音", tone: "yellow" }],
        rows: [
          { label: "どこで使う", cells: ["歌や、つづりを言うとき", "単語を読むとき"] },
          { label: "a の場合", cells: ["歌で言う a", "apple・ant のはじめ"] },
          { label: "b の場合", cells: ["歌で言う b", "bag・bus のはじめ"] },
        ],
      },
      photos: [
        {
          src: `${C}/hornbook.webp`, width: 800, height: 1489,
          alt: "取っ手のついた木の板に、うすい紙がはられ、アルファベットの小文字と大文字、ab eb ib ob ub などの文字がならんでいる",
          caption: "300年ほど前に、子どもが文字を習うのに使った板（ホーンブック）。アルファベットの下に、ab・eb・ib や ba・be・bi など、{{音}}をつなげる練習が書かれています。",
          credit: { author: "作者不明", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Hornbook_containing_alphabet,_syllabary,_and_the_Lord%27s_prayer,_perhaps_1700-1750,_from_the_Digital_Commonwealth_-_commonwealth_1n79hc85g.jpg" },
        },
      ],
      cliff: "b の音は「ブッ」。では、その音がくり返し聞こえる、古い歌があります。",
    },
    {
      heading: "はじめの音から、はじめの文字が分かる",
      body: "単語の{{はじめの音}}をよく聞くと、はじめの文字が分かります。bag、bed、bus はどれも同じ音で始まるので、はじめの文字は {{b}} です。cat と cup のように、同じ音で始まる単語をなかまにして集めると、音と文字のつながりがつかみやすくなります。",
      reading: [
        "bag・bed・bus を、ゆっくり声に出してみましょう。どれも、くちびるをとじて「ブッ」とはじける音で始まります。耳で聞いた{{はじめの音}}が同じなら、はじめの文字も同じ {{b}} です。音を聞けば、つづりの1文字目が見えてくるのです。",
        "下の歌は、イギリスで280年ほど前の本にもうのっている、古いわらべ歌です。羊の鳴き声 Baa に始まり、black・bags・But・boy と、b の音が何度もはずみます。日本語では羊は「メエ」と鳴きますが、英語の羊は b の音で鳴くのです。b の音を見つけるたびに、手をたたきながら聞いてみましょう。",
        "単語は、音をつなげると読めます。bag なら、b の「ブッ」、a の「ア」、g の「グッ」。この3つを、だんだん速くつなげていくと、「バッグ」になります。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "Baa, baa, black sheep,\nHave you any wool?\nYes, marry, have I,\nThree bags full;\n\nOne for my master,\nOne for my dame,\nBut none for the little boy\nWho cries in the lane.",
        ja: "メエメエ、黒い羊さん、\n羊の毛はありますか？\nええ、ありますとも。\nふくろに3つ、いっぱいに。\n\n1つはご主人さまに、\n1つはおくさまに、\nでも、小道で泣いている\n小さな男の子には、1つもなし。",
        cite: "Mother Goose, \"Baa, Baa, Black Sheep\" (The Real Mother Goose, 1916)",
        source: "https://www.gutenberg.org/ebooks/10607",
      }],
      figure: {
        type: "tree",
        title: "はじめの音でなかま分け",
        root: {
          label: "はじめの文字",
          tone: "navy",
          children: [
            { label: "b", sub: "bag, bed, bus", tone: "blue" },
            { label: "m", sub: "milk / map", tone: "yellow" },
            { label: "s", sub: "sun / sock", tone: "red" },
          ],
        },
      },
      photos: [
        {
          src: `${C}/crane.webp`, width: 640, height: 637,
          alt: "2人の子どもと黒い羊の絵の下に、BAA! BAA! BLACK SHEEP. という題の楽譜《がくふ》がある",
          caption: "150年ほど前の、わらべ歌の楽譜《がくふ》の本（ウォルター・クレイン画）。最後の行が「小道に住む男の子」になっているなど、歌は本によって少しずつちがいます。",
          credit: { author: "Walter Crane (illustrator), Edmund Evans (printer/engraver)", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Baby-s-opera-1878-walter-crane-Baa-baa-black-sheep-sheet-music_orig.jpg" },
        },
        {
          src: `${C}/sheep.webp`, width: 640, height: 480,
          alt: "草の生えた丘《おか》の斜面《しゃめん》で、黒い毛の羊たちが草を食べている",
          caption: "イギリスの牧場の黒い羊。英語では羊の鳴き声を baa と書き、b の音で始めます。",
          credit: { author: "Ivan Hall", license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0", source: "https://commons.wikimedia.org/wiki/File:Flock_of_Black_Sheep,_Powerstock_-_geograph.org.uk_-_1425675.jpg" },
        },
      ],
      reveal: "「ビー・エー・ジー」は、b・a・g という文字の{{名前}}をならべただけでした。名前は文字をよぶための読み方で、単語の中では鳴りません。単語を読むときは、b の「ブッ」、a の「ア」、g の「グッ」という{{音}}をつなげます。だから bag は「バッグ」になるのです。",
      cliff: "歌の中の sheep と three。はじめの2文字は、どう読むのでしょう？",
    },
    {
      heading: "2文字で1つの音になる組み合わせ",
      body: "{{sh}}・{{ch}}・{{th}} は、2つの文字を別々に読まず、{{2文字で1つの音}}を表します。sh は ship や shoe のはじめの音、ch は chair や cheese のはじめの音です。th は three のはじめの音で、{{舌《した》の先を歯で軽くはさんで}}息を出します。",
      reading: [
        "さっきの歌の sheep を、s と h の音に分けて読むと、「ス・ハ…」となって、羊になりません。{{sh}} は、2つの文字で1つの音を表すチームです。人さし指を口の前に立てて「シーッ」と静かにさせるときの音に近く、ship や shoe のはじめでも聞こえます。",
        "Three bags full の {{three}} の {{th}} も、2文字で1つの音です。舌《した》の先を上と下の歯で軽くはさみ、そのすき間から息を出します。日本語にはない音なので、はじめは少しくすぐったく感じるかもしれません。{{ch}} は chair や cheese のはじめの「チ」に近い音です。文字を見たら、まず「2文字チームはいないかな」とさがしてみましょう。",
      ],
      cliff: "three の th のように、口の形が大切な音は、ほかにもあります。",
    },
    {
      heading: "口の形に気をつける音",
      body: "日本語にない音は、口の形を意識すると出しやすくなります。{{f と v}} は、{{上の歯を下くちびるに軽く当てて}}出します。{{l と r}} もちがう音で、light（明かり）と right（右）は、はじめの音で意味が変わります。",
      reading: [
        "歌の full や for のはじめの f は、日本語の「フ」とはちがいます。{{上の歯を下くちびるに軽く当てて}}、そのすき間から息を出します。のどをふるわせながら同じ形で出すと v の音です。かがみの前で、口の形をたしかめてみましょう。",
        "little や lane の l は、舌《した》の先を上の歯の裏《うら》にぴたっとつけて出します。r は、舌《した》をどこにもつけずに、おくに引くように出します。light（明かり）と right（右）のように、{{l と r}} がちがうだけで、意味がまったく変わる単語があります。",
      ],
      figure: {
        type: "compare",
        title: "口の使い方",
        columns: [{ title: "文字", tone: "yellow" }, { title: "口の使い方" }, { title: "単語の例", tone: "blue" }],
        rows: [
          { cells: ["f / v", "上の歯を下くちびるに", "fan / vest"] },
          { cells: ["th", "舌《した》の先を歯ではさむ", "three"] },
          { cells: ["l", "舌《した》の先を上の歯の裏《うら》に", "light"] },
          { cells: ["r", "舌《した》をどこにもつけない", "right"] },
        ],
      },
      cliff: "はじめの音を変えると、別の単語に。これを使った、楽しい遊びがあります。",
    },
    {
      heading: "終わりが同じ単語は、はじめだけ変える",
      body: "cat・hat・bat のように、{{終わりの音が同じ}}単語があります。終わりの部分はそのままで、{{はじめの文字だけ}}を変えると、別の単語になります。このしくみを使うと、新しい単語もリズムよく読めます。",
      reading: [
        "cat・hat・bat は、どれも終わりが at です。この at はそのままにして、{{はじめの文字だけ}}を入れかえると、ねこがぼうしに、ぼうしがバットに変わります。at の読み方を一度覚えれば、mat や rat も、はじめの音をつけるだけで読めます。",
        "わらべ歌は、英語で nursery rhyme（ナーサリー・ライム）といいます。rhyme は、行の終わりの音をそろえることです。さっきの歌でも、dame と lane は終わりの音がよくにていて、歌に心地よいリズムを生んでいます。終わりの音に耳をすませると、英語の歌がもっと楽しく聞こえてきます。",
      ],
      figure: {
        type: "formula",
        title: "はじめの文字を入れかえる",
        prose: true,
        steps: [
          { label: "ねこ", expr: "{{c}}at" },
          { label: "ぼうし", expr: "{{h}}at" },
          { label: "バット", expr: "{{b}}at" },
          { label: "ぶた", expr: "{{p}}ig", note: "pig と big も終わりが同じ" },
        ],
      },
    },
  ],
  story: {
    kind: "manga4",
    title: "ビーエージーって、だれ？",
    panels: [
      {
        scene: "教室。リクが、ABCの歌を得意そうに歌いきる。",
        lines: [
          { who: "リク", text: "ABCの歌なら" },
          { who: "リク", text: "ぜんぶ言えるよ！" },
          { who: "ハナ", text: "じゃあ読めるね" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "リク", look: "boy", x: 254, face: "smile", fx: "!" },
            { who: "ハナ", look: "girl", x: 86, face: "smile" },
          ],
          props: [
            { kind: "table", x: 0, y: 240 },
            { kind: "board", x: 170, y: 214, s: 0.8, text: "ABC" },
          ],
        },
      },
      {
        scene: "ハナが、かばんの絵と bag と書いたカードを見せる。",
        lines: [
          { who: "ハナ", text: "これ、なんて読む？" },
          { who: "リク", text: "ビー・エー・ジー！" },
          { who: "ハナ", text: "ロボットの名前？" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ハナ", look: "girl", x: 254, face: "normal", hand: [214, 226] },
            { who: "リク", look: "boy", x: 86, face: "shout", fx: "!" },
          ],
          props: [
            { kind: "table", x: 0, y: 240 },
            { kind: "board", x: 170, y: 214, s: 0.8, text: "bag" },
          ],
        },
      },
      {
        scene: "ハナが説明する。リクは口をとじて、音を出してみる。",
        lines: [
          { who: "ハナ", text: "ビーは文字の名前" },
          { who: "ハナ", text: "bの音は「ブッ」だよ" },
          { who: "リク", text: "ブッ・ア・グッ…" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ハナ", look: "girl", x: 254, face: "smile", fx: "idea", hand: [214, 226] },
            { who: "リク", look: "boy", x: 86, face: "think", fx: "?" },
          ],
          props: [
            { kind: "table", x: 0, y: 240 },
            { kind: "board", x: 170, y: 214, s: 0.8, text: "b＝ブッ" },
          ],
        },
      },
      {
        scene: "音をだんだん速くつなげたリクが、ぱっと顔をあげる。",
        lines: [
          { who: "リク", text: "バッグ！かばんだ！" },
          { who: "ハナ", text: "名前でよぶと" },
          { who: "ハナ", text: "かばんが変身しちゃう" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "リク", look: "boy", x: 254, face: "surprise", fx: "idea", hand: [214, 226] },
            { who: "ハナ", look: "girl", x: 86, face: "smile", fx: "!" },
          ],
          props: [
            { kind: "table", x: 0, y: 240 },
            { kind: "book", x: 120, y: 258, s: 0.7 },
            { kind: "board", x: 170, y: 214, s: 0.8, text: "bag" },
          ],
        },
      },
    ],
    note: "リクとハナは作り話の5年生です。文字に「名前」と「音」があり、b の名前は「ビー」、音はくちびるをはじく短い「ブッ」であること、bag は b・a・g の音をつなげて読むことは事実です。",
  },
  mistakes: [
    { wrong: "apple を、a の名前のとおりに読む", right: "単語の中では a の「音」で読む", why: "歌で言う読み方は文字の名前で、単語を読むときの音とはちがいます。" },
    { wrong: "ship の sh を、s と h の2つの音に分けて読む", right: "sh は2文字で1つの音", why: "sh・ch・th は、2つの文字が組になって1つの音を表します。" },
    { wrong: "「右」を light と書く", right: "「右」は right", why: "light は「明かり」です。l と r で意味が変わります。" },
  ],
  check: [
    { q: "dog・desk・duck のはじめの文字は？", a: "d", why: "どれも同じ音で始まり、はじめの文字は d。" },
    { q: "chair の ch のように、2文字で1つの音を表す組み合わせをもう1つ答えましょう。", a: "sh か th", why: "sh・ch・th は2文字で1つの音。" },
    { q: "f の音を出すとき、上の歯をどこに当てる？", a: "下くちびる", why: "f と v は、上の歯を下くちびるに軽く当てて出す。" },
  ],
  next: [
    { label: "ドリルで「音と文字」を練習する", href: "/learn/eigo-sho/e-english-56-oto-moji" },
    { label: "「アルファベットを書く」（ドリル）", href: "/learn/eigo-sho/e-english-56-alpha-kaku" },
    { label: "「自己紹介《じこしょうかい》」（ドリル）", href: "/learn/eigo-sho/e-english-56-jikoshokai" },
  ],
};
