import type { Lecture } from "../types";

const C = "/media/commons/e-english-34-hoshii";

export const E_ENGLISH_34_HOSHII: Lecture = {
  unit: "e-english-34-hoshii",
  nameRuby: "ほしいものを伝《つた》える（I want 〜.）",
  title: "I want 〜. で、ほしい物を伝《つた》える",
  hook: "お祭りの店で「わたあめがほしい」、たんじょう日に「新しいボールがほしい」。ほしい物を相手に伝《つた》えられると、買い物やプレゼント選《えら》びがうまくいきます。英語《えいご》では I want 〜. の形を覚《おぼ》えるだけで、いろいろな物を伝《つた》えられます。",
  mystery: "日本語なら、パン屋さんで「パンください」と言えば、ちゃんと通じます。ところが英語《えいご》で Bun, please. とだけ言うと、店の人に How many? と聞き返されてしまいます。どうして英語《えいご》では、数を聞かれるのでしょう？",
  mission: {
    from: "となり町のパン屋さん",
    request: "この春、うちの店で、イギリスの丸パン「ホットクロスバン」を売り出します。英語《えいご》で注文を受ける練習をしていたら、お客さん役の子が Bun, please. と言い、わたしはつい How many? と聞き返してしまいました。日本語なら「パンください」で通じるのに、なぜ英語《えいご》だと数が気になるのでしょう。店にはる「英語《えいご》の注文カード」を作るために、名探偵《めいたんてい》のあなたに、そのわけを調べてほしいのです。",
    thanks: "英語《えいご》は、a や an、数と s で、物の数まで言葉にのせて伝《つた》えるのですね。カードには A bun, please. と Two buns, please. を大きく書いて、レジのよこにはります。",
  },
  sections: [
    {
      heading: "ほしい物は I want のあとに言う",
      body: "「わたしは〜がほしい」は {{I want 〜.}} と言います。I が「わたしは」、{{want}} が「ほしい」で、そのあとにほしい物を言います。日本語とちがって、「ほしい」が物より{{先に来る}}ことに気をつけましょう。",
      reading: [
        "日本語では「わたしは りんごが ほしい」と、ほしい物を言ってから、さいごに「ほしい」と言います。英語《えいご》はぎゃくです。I want an apple. のように、I（わたしは）のすぐあとに {{want}}（ほしい）が来て、ほしい物はさいごに来ます。聞く人は、はじめの I want を聞いたところで、「あ、何かほしいんだな」と分かります。",
        "I want のあとは、ほしい物を入れかえるだけです。I want a dog.（犬がほしい）、I want a new bike.（新しい自転車がほしい）。毎日の生活には、「ほしい」を伝《つた》える場面がたくさんあります。{{I want 〜.}} は、そのどこでも使える、とても便利《べんり》な形なのです。",
      ],
      figure: {
        type: "formula",
        title: "I want のあとを入れかえる",
        prose: true,
        steps: [
          { expr: "I want {{a ball}}.", note: "ボールがほしい" },
          { expr: "I want {{a new bag}}.", note: "新しいかばんがほしい" },
          { expr: "I want {{juice}}.", note: "ジュースがほしい" },
        ],
        note: "I want までは同じ。うしろの物だけを入れかえれば、いろいろ言えます。",
      },
      cliff: "ほしい物の前についている、小さな a。これはいったい何のしるしでしょう？",
    },
    {
      heading: "1つの物には a か an をつける",
      body: "ボールやかばんのように1つ、2つと数えられる物が1つのときは、前に {{a}} をつけます。apple や egg や orange のように、はじめの音が日本語の{{ア・イ・ウ・エ・オに近い音}}の語には {{an}} をつけます。決めるのは文字ではなく、はじめの{{音}}です。",
      reading: [
        "ほしい物の前の小さな {{a}} は、「1つの」という意味のしるしです。I want a ball. は「ボールが1つほしい」。日本語では、わざわざ「1つ」と言わないことが多いですね。でも英語《えいご》では、1つ、2つと数えられる物が1つのとき、a をつけるのがきまりです。",
        "apple（りんご）や egg（たまご）、orange（オレンジ）のように、はじめの音が日本語のア・イ・ウ・エ・オに近い語には、a ではなく {{an}} をつけます。a apple と言うと、アの音が2つぶつかって、言いにくいですね。an apple なら、n の音で、つぎの語になめらかにつながります。",
        "反対に、juice（ジュース）や milk（牛乳《ぎゅうにゅう》）、water（水）のように、1つ、2つと数えにくい物には、a も an もつけません。I want juice. で正しい言い方です。",
      ],
      figure: {
        type: "compare",
        title: "a と an の使い分け",
        columns: [{ title: "a をつける", tone: "blue" }, { title: "an をつける", tone: "yellow" }],
        rows: [
          { label: "はじめの音", cells: ["ア・イ・ウ・エ・オ以外《いがい》", "ア・イ・ウ・エ・オに近い"] },
          { label: "語の例《れい》", cells: ["a ball / a cake", "an apple / an egg"] },
          { label: "語の例《れい》", cells: ["a pencil / a dog", "an orange"] },
        ],
        note: "juice や milk のように数えない物には、a も an もつけません。",
      },
      cliff: "1つなら a や an。では、2つ、3つほしいときは、どう言うのでしょう？",
    },
    {
      heading: "2つ以上《いじょう》なら s をつける",
      body: "ほしい物が2つ以上《いじょう》のときは、数のあとに物の名前を言い、{{語の終わりに s}} をつけます。two apples、three pencils のようになります。店でたのむときは、終わりに {{please}} をつけると、ていねいな言い方になります。",
      reading: [
        "2つ以上《いじょう》ほしいときは、数のことばのあとに物の名前を言い、語の終わりに {{s}} をつけます。two apples（りんご2つ）、three pencils（えんぴつ3本）。s がつくと、「1つではなく、2つより多い」という合図になります。",
        "英語《えいご》では、数えられる物を言うたびに、1つなら a・an、2つ以上《いじょう》なら{{数と s}}で、「いくつか」を言葉の形で表します。日本語の「りんご」は、1こでも10こでも同じ形ですね。英語《えいご》は、物の名前を言うだけで、数まで相手に伝《つた》わることばなのです。",
        "店でたのむときは、終わりに {{please}} をつけると、「〜をください」というていねいな言い方になります。Two apples, please.（りんごを2つください）。数と s と please。この3つがそろえば、英語《えいご》の店でも、きちんと注文できます。",
      ],
      figure: {
        type: "area",
        kind: "bar",
        title: "りんごの数と言い方",
        max: 3,
        bars: [
          { label: "1つ", parts: [{ value: 1, tone: "red" }], total: "an apple" },
          { label: "2つ", parts: [{ value: 1, tone: "red" }, { value: 1, tone: "red" }], total: "two apples" },
          { label: "3つ", parts: [{ value: 1, tone: "red" }, { value: 1, tone: "red" }, { value: 1, tone: "red" }], total: "three apples" },
        ],
        note: "2つからは a・an をつけず、数と s を使います。",
      },
      photos: [
        {
          src: `${C}/buns.webp`, width: 800, height: 533,
          alt: "お皿の上に山のようにのった、十字のもようがある茶色い丸パン",
          caption: "ホットクロスバン。1つなら {{a bun}}、こんなにたくさんあれば、終わりに s をつけて {{buns}} と言います。",
          credit: { author: "Lark Ascending", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Hot_cross_buns_(stacked).jpg" },
        },
      ],
      reveal: "英語《えいご》では、数えられる物を言うとき、1つなら {{a・an}}、2つ以上《いじょう》なら{{数と s}} をつけて、いくつかを言葉の形で伝《つた》えます。Bun, please. には、a も数も s もありません。だから店の人には「1つ？　それとも、もっと？」が分からず、How many? と聞き返したのです。A bun, please. や Two buns, please. と言えば、一度で伝《つた》わります。",
      cliff: "言い方が分かったら、つぎは店の人とのやりとりです。店の人は、何と聞いてくるでしょう？",
    },
    {
      heading: "たずねる・答える",
      body: "相手に何がほしいかを聞くときは {{What do you want?}} とたずね、I want 〜. で答えます。「〜はほしいですか」と聞くときは {{Do you want 〜?}} です。答えは、ほしいなら {{Yes, I do.}}、ほしくないなら {{No, I don't.}} と言います。",
      reading: [
        "店の人は、まず {{What do you want?}}（何がほしいですか）と聞いてくれます。答えは I want 〜. か、〜, please. です。数が分からないときは、店の人が {{How many?}}（いくつですか）と聞きます。Two, please. のように、数で答えましょう。",
        "「〜はほしいですか」と聞かれることもあります。Do you want a cookie?（クッキーはほしいですか）。ほしいなら Yes, I do.、ほしくないなら No, I don't. と答えます。物をわたすときは Here you are.（はい、どうぞ）、受け取ったら Thank you. と言いましょう。",
      ],
      figure: {
        type: "flow",
        dir: "col",
        title: "店でのやりとり",
        steps: [
          { label: "What do you want?", sub: "何がほしいですか", tone: "navy" },
          { label: "A cake, please.", sub: "ケーキをください", tone: "yellow" },
          { label: "Here you are.", sub: "はい、どうぞ", tone: "blue" },
          { label: "Thank you.", sub: "ありがとう" },
        ],
      },
      cliff: "200年以上《いじょう》前のロンドンでは、パン売りが「ほしい物」と「数」を歌にしていました。",
    },
    {
      heading: "ロンドンの売り声「Hot Cross Buns」",
      body: "イギリスには、{{マザーグース}}とよばれる、むかしから歌いつがれてきた子どもの歌がたくさんあります。「Hot Cross Buns」は、町でパンを売る人の{{売り声}}から生まれたといわれる歌です。物の名前と数とねだんだけで、「買ってね」が伝《つた》わります。",
      reading: [
        "200年以上《いじょう》前のロンドンの町には、物を売り歩く人がたくさんいました。人々は、決まった{{売り声}}を聞いて、「パン売りが来た」と気がつきました。下の絵は、1799年にロンドンで出された「ロンドンの売り声」という版画《はんが》の1まいです。かごいっぱいのパンを、子どもたちに売っています。",
        "売っていたのは{{ホットクロスバン}}。上に十字のもようがついた、スパイス入りの小さな丸パンです。イギリスでは、春のイースター（復活祭《ふっかつさい》）のころに食べる習わしがあります。歌の One a penny, two a penny は「1こ1ペニー、2こ1ペニー」。{{ペニー}}は、イギリスのお金の単位《たんい》です。",
        "この歌には、I want も please も出てきません。それでも、パンの名前と、数と、ねだんを聞けば、何がいくつ買えるかがすぐ分かります。Buns の終わりの s も「パンがたくさん」のしるしです。さいごの ye は、むかしの英語《えいご》で「あなたたち」のこと。3つの音だけでふけるので、英語《えいご》の国では、リコーダーで{{最初《さいしょ》}}に習う曲の一つとしても親しまれています。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "Hot-cross Buns!\nHot-cross Buns!\nOne a penny, two a penny,\nHot-cross Buns!\n\nHot-cross Buns!\nHot-cross Buns!\nIf ye have no daughters,\nGive them to your sons.",
        ja: "ホットクロスバン！\nホットクロスバン！\n1こ1ペニー、2こ1ペニー、\nホットクロスバン！\n\nホットクロスバン！\nホットクロスバン！\nむすめさんが いないなら、\nむすこさんに あげて。",
        cite: "Mother Goose, \"Hot-Cross Buns\" (The Real Mother Goose, 1916)",
        source: "https://www.gutenberg.org/ebooks/10607",
      }],
      photos: [
        {
          src: `${C}/cries.webp`, width: 800, height: 988,
          alt: "かごいっぱいの丸パンを持った女の人が、家の前で子どもたちにパンを売っている、色のついた古い版画《はんが》",
          caption: "「ロンドンの売り声」8番「ホットクロスバン」（1799年）。下の文字は Hot cross Bunns two a penny Bunns。むかしは buns を bunns とも書きました。",
          credit: { author: "Rudolph Ackermann / Thomas Rowlandson / Henri Merke", license: "CC0", licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en", source: "https://commons.wikimedia.org/wiki/File:Cries_of_London,_No._8-_Hot_Cross_Buns_MET_DP872202.jpg" },
        },
        {
          src: `${C}/rhymes.webp`, width: 800, height: 1308,
          alt: "赤いマントの女の人が、丸パンの入ったかごを持って歩いている絵。絵の下に英語《えいご》の歌が書いてある",
          caption: "イギリスの古い歌の絵本のページ。パンを売り歩く人の絵の下に、「Hot cross Buns!」の歌がのっています。",
          credit: { author: "F. Warne & Co.", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Nursery_rhymes_pg_16_(full).jpg" },
        },
        {
          src: `${C}/penny.webp`, width: 800, height: 405,
          alt: "茶色い大きなコインの表と裏《うら》。右の面に ONE PENNY と 1888 の文字",
          caption: "1888年のイギリスの1ペニー（{{one penny}}）。歌の One a penny は、このお金1まいでパンが1こ、ということです。",
          credit: { author: "Петров Эдуард", license: "CC0", licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en", source: "https://commons.wikimedia.org/wiki/File:Penny_Great_Britain,_1888,_Victoria.jpg" },
        },
      ],
    },
  ],
  story: {
    kind: "manzai",
    title: "指さすだけでは、パフェはできない",
    cast: ["コウタ", "ミオ"],
    lines: [
      { who: "コウタ", text: "どうも、コウタです！　今日はパフェ屋さんで、英語《えいご》のお客さんになります！" },
      { who: "ミオ", text: "ミオです。わたしは店の人ね。いらっしゃいませ。What do you want?", say: "ミオです。わたしは店の人ね。いらっしゃいませ。ワット・ドゥー・ユー・ウォント？" },
      { who: "コウタ", text: "（ケースを指さして）これ。あと、これと、これ。" },
      { who: "ミオ", text: "指さすだけじゃ伝《つた》わらないよ！　ほしい物は {{I want 〜.}} で言うの。", say: "指さすだけじゃ伝わらないよ！ ほしい物は、アイ・ウォント、で言うの。" },
      { who: "コウタ", text: "よし。わたしは、バナナが、ほしい。だから、I banana want!", say: "よし。わたしは、バナナが、ほしい。だから、アイ・バナナ・ウォント！" },
      { who: "ミオ", text: "日本語のならびのまま！　英語《えいご》は「ほしい」が先。I want a banana.", say: "日本語のならびのまま！ 英語は、ほしい、が先。アイ・ウォント・ア・バナナ。" },
      { who: "コウタ", text: "その a って何？　「あっ」て、何か落としたの？", say: "その、ア、って何？ あっ、て、何か落としたの？" },
      { who: "ミオ", text: "落としてない！　{{a}} は「1つ」のしるし。バナナ1本ってこと。", say: "落としてない！ ア、は、1つ、のしるし。バナナ1本ってこと。" },
      { who: "コウタ", text: "じゃあ、りんごも1つ。I want a apple.", say: "じゃあ、りんごも1つ。アイ・ウォント・ア・アップル。" },
      { who: "ミオ", text: "apple は、はじめの音がアに近いから {{an}}。I want an apple.", say: "アップルは、はじめの音がアに近いから、アン。アイ・ウォント・アン・アップル。" },
      { who: "コウタ", text: "いちごもほしい！　Strawberry, please.", say: "いちごもほしい！ ストロベリー・プリーズ。" },
      { who: "ミオ", text: "How many?", say: "ハウ・メニー？" },
      { who: "コウタ", text: "（だまって、にっこり指を3本立てる）", say: "……。" },
      { who: "ミオ", text: "また指だけ！　How many? は「いくつ？」。数は言葉で答えて。2つ以上《いじょう》なら、終わりに {{s}} もつけてね。", say: "また指だけ！ ハウ・メニー、は、いくつ？ 数は言葉で答えて。2つ以上なら、終わりにエスもつけてね。" },
      { who: "コウタ", text: "Three strawberries, please!", say: "スリー・ストロベリーズ・プリーズ！" },
      { who: "ミオ", text: "できたね。Here you are.", say: "できたね。ヒア・ユー・アー。" },
      { who: "コウタ", text: "Thank you! ……あれ？　アイスがない。アイスがいちばんほしかったのに！", say: "サンキュー！ ……あれ？ アイスがない。アイスがいちばんほしかったのに！" },
      { who: "ミオ", text: "アイスは、指さしただけでしょ！　もういいよ。" },
      { who: "コウタ", text: "どうも、ありがとうございました！" },
    ],
    note: "コウタとミオは作り話の人で、会話も作り話です。I want 〜. の語のならび、a と an の使い分け、2つ以上《いじょう》で s をつけること、How many? のやりとりは、ふつうの英語《えいご》のきまりにもとづいています。",
  },
  mistakes: [
    { wrong: "I'm want a ball.", right: "I want a ball.", why: "want の前に am はいりません。I のすぐあとに want を言います。" },
    { wrong: "I want a apple.", right: "I want an apple.", why: "apple はアに近い音で始まるので、a ではなく an をつけます。" },
    { wrong: "Three apple, please.", right: "Three apples, please.", why: "2つ以上《いじょう》のときは、物の名前の終わりに s をつけます。" },
    { wrong: "Do you want milk? — Yes, I want.", right: "Yes, I do.", why: "Do you 〜? と聞かれたら、Yes, I do. か No, I don't. で答えます。" },
  ],
  check: [
    { q: "I want ___ egg. の ___ に入るのは a と an のどちら？", a: "an", why: "egg はエに近い音で始まるので an。" },
    { q: "「えんぴつを2本ください」を英語《えいご》で言うと？", a: "Two pencils, please.", why: "2つ以上《いじょう》なので pencil に s をつけ、ていねいに please。" },
    { q: "Do you want a cookie? に「ほしくない」と答えると？", a: "No, I don't.", why: "Do you 〜? には do を使って答える。" },
  ],
  next: [
    { label: "ドリルで「ほしいものを伝《つた》える」を練習する", href: "/learn/eigo-sho/e-english-34-hoshii" },
    { label: "「好《す》きなものを伝《つた》える（I like 〜.）」（ドリル）", href: "/learn/eigo-sho/e-english-34-suki" },
    { label: "「数の言い方」（ドリル）", href: "/learn/eigo-sho/e-english-34-kazu" },
  ],
};
