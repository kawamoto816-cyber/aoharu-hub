import type { Lecture } from "../types";

const C = "/media/commons/e-english-34-mi-no-mawari";

export const E_ENGLISH_34_MI_NO_MAWARI: Lecture = {
  unit: "e-english-34-mi-no-mawari",
  title: "教室や筆箱の中の物を、英語《えいご》で言ってみよう",
  hook: "筆箱を開けると、えんぴつ、消しゴム、定規《じょうぎ》が入っています。毎日さわる物を英語《えいご》で言えると、友だちに「これは何？」「定規《じょうぎ》を持ってる？」と聞けるようになります。物の名前と、聞き方・答え方をいっしょに覚《おぼ》えましょう。",
  mystery: "「シャープペンシル」も「ホッチキス」も、カタカナで書くと英語《えいご》のような名前です。ところが、英語《えいご》の国で「シャープペンシルを持ってる？」と聞くと、相手はとがったえんぴつを出してくれるかもしれません。英語《えいご》みたいな名前なのに、どうして通じないのでしょう？",
  mission: {
    from: "駅前の文房具《ぶんぼうぐ》屋さん",
    request: "このごろ、外国から来たお客さんがよく店に来てくれます。そこで、たなに英語《えいご》の名前の札《ふだ》をつけることにしました。ところが「シャープペンシル」と書いた札《ふだ》を見たお客さんが、首をかしげたのです。お客さんに伝《つた》わる札《ふだ》を作るために、名探偵《めいたんてい》のあなたに、この名前のなぞを解《と》いてほしいのです。",
    thanks: "シャープペンシルもホッチキスも、日本で生まれた呼《よ》び名だったのですね。これで札《ふだ》は「mechanical pencil」「stapler」と正しく書けます。分からない物は「What's this?」と聞けばいい、というのも、お客さんとの会話に使えそうです。",
  },
  sections: [
    {
      heading: "物をなかま分けして覚《おぼ》える",
      body: "物の名前は、ばらばらに覚《おぼ》えるより、{{使う場所や使い方でなかま分け}}すると覚《おぼ》えやすくなります。筆箱に入る物、教室にある物、自分が身につける物の3つに分けてみましょう。",
      figure: {
        type: "tree",
        title: "身の回りの物のなかま",
        root: {
          label: "身の回りの物",
          tone: "navy",
          children: [
            { label: "筆箱の中", sub: "pencil, eraser", tone: "blue", children: [{ label: "ruler / glue", sub: "定規《じょうぎ》 / のり" }] },
            { label: "教室にある", sub: "desk / chair", tone: "yellow", children: [{ label: "clock", sub: "時計" }] },
            { label: "持ち歩く", sub: "bag / cap", tone: "plain", children: [{ label: "notebook", sub: "ノート" }] },
          ],
        },
      },
      reading: [
        "筆箱を開けてみましょう。えんぴつは {{pencil}}、消しゴムは {{eraser}}、定規《じょうぎ》は {{ruler}}、のりは {{glue}}、はさみは {{scissors}} です。教室を見回すと、つくえは {{desk}}、いすは {{chair}}、時計は {{clock}}。自分が持ち歩く物には、かばんの {{bag}}、ぼうしの {{cap}}、ノートの {{notebook}} があります。",
        "ばらばらに覚《おぼ》えようとすると、すぐにわすれてしまいます。でも「筆箱の中」「教室」「持ち歩く物」と{{なかま分け}}すると、場所を思いうかべるだけで、言葉がつぎつぎに出てきます。台所の引き出しに、おはしとスプーンをまとめてしまうのと同じです。",
        "pencil という言葉には、長い物語があります。むかしのヨーロッパでは、細い筆で字を書いていて、その筆の名前が、もとは「小さなしっぽ」という意味の言葉でした。そこから pencil という名前が生まれたといわれます。1500年代にイギリスの山で、黒くてやわらかい石が見つかり、その石で書く今のえんぴつが広まりました。",
      ],
      photos: [
        {
          src: `${C}/borrowdale.webp`, width: 800, height: 1067,
          alt: "緑の山にはさまれた谷と、手前につまれた石のあと",
          caption: "イギリスのボローデールの谷。この山で1500年代に、えんぴつのしんになる黒い石（黒鉛《こくえん》）が見つかりました。手前は、その石をほったあとです。",
          credit: { author: "Matthew Hatton", license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0", source: "https://commons.wikimedia.org/wiki/File:Ruins_of_Borrowdale_Graphite_Mine_-_geograph.org.uk_-_5652968.jpg" },
        },
      ],
      cliff: "ところで、pen と pencil、cap と cup。にている言葉は、どう見分ければいいのでしょう？",
    },
    {
      heading: "にている語に気をつける",
      body: "英語《えいご》には、音やつづりがにている語があります。{{cap}} はぼうし、{{cup}} はカップで、まん中の文字が1つちがうだけです。{{pen}} と {{pencil}} も別《べつ》の物です。絵と語を{{セットで}}覚《おぼ》えると、まちがえにくくなります。",
      figure: {
        type: "compare",
        title: "まちがえやすい組",
        columns: [{ title: "語", tone: "blue" }, { title: "意味" }, { title: "見分けるヒント", tone: "yellow" }],
        rows: [
          { cells: ["cap / cup", "ぼうし / カップ", "まん中が a か u か"] },
          { cells: ["pen / pencil", "ペン / えんぴつ", "長いほうがえんぴつ"] },
          { cells: ["desk / chair", "つくえ / いす", "すわるのは chair"] },
        ],
      },
      reading: [
        "英語《えいご》には、音がよくにた言葉があります。{{cap}} はぼうし、{{cup}} はカップ。まん中の音が「ア」に近いか、口を小さくした「ア」かのちがいです。先生や音声の英語《えいご》をよく聞いて、まねして言ってみましょう。{{pen}} はペン、{{pencil}} はえんぴつ。pencil のほうが長い言葉です。",
        "同じ物でも、国によって呼《よ》び名がちがうことがあります。消しゴムは、アメリカでは {{eraser}} ですが、イギリスでは {{rubber}} ともいいます。rub は「こする」という意味です。1770年、イギリスの学者プリーストリーが「この物は、えんぴつの字を紙からふき取るのにとてもよい」と書きのこしました。ゴムでこすって消すので、rubber と呼《よ》ばれるようになったのです。",
        "名前のわけを知ると、言葉は絵のように頭に残《のこ》ります。「eraser は消す物、rubber はこする物」と思いうかべると、もうわすれません。",
      ],
      photos: [
        {
          src: `${C}/priestley.webp`, width: 800, height: 971,
          alt: "黒い服に白いえりの、白っぽいかみの男の人の肖像画《しょうぞうが》",
          caption: "イギリスの学者プリーストリー。1770年に、ゴムでえんぴつの字が消せることを書きのこしました。消しゴムが {{rubber}} と呼《よ》ばれるきっかけの一つです。",
          credit: { author: "Ellen Sharples", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Priestley.jpg" },
        },
      ],
      cliff: "では、名前を知らない物を見つけたら、英語《えいご》でどう聞けばいいのでしょう？",
    },
    {
      heading: "「これは何？」と聞く・答える",
      body: "物の名前を聞くときは、その物を指して {{What's this?}} とたずねます。答えるときは {{It's 〜.}} を使い、It's a ruler. のように言います。1つの物には a をつけ、eraser のようにイに近い音で始まる語には an をつけます。",
      figure: {
        type: "flow",
        dir: "col",
        title: "物の名前をたずねる",
        steps: [
          { label: "What's this?", sub: "これは何ですか", tone: "navy" },
          { label: "It's a ruler.", sub: "それは定規《じょうぎ》です", tone: "yellow" },
          { label: "Oh, I see.", sub: "なるほど" },
        ],
      },
      reading: [
        "名前の分からない物を見つけたら、指さして {{What's this?}}（これは何ですか）と聞きます。答える人は {{It's a 〜.}}（それは〜です）と言います。It's a ruler. It's a clock. のように、1つの物には a をつけます。eraser のように、「ア・イ・ウ・エ・オ」に近い音で始まる言葉には an をつけて、It's an eraser. と言います。",
        "この聞き方は、日本で生まれた「英語《えいご》のような言葉」を見分けるのにも役立ちます。シャープペンシルは、1915年に日本の早川徳次《はやかわとくじ》さんが作った「エバー・レディ・シャープ・ペンシル」という名前から広まった呼《よ》び名です。英語《えいご》の国では {{mechanical pencil}} と言います。sharp は「先がとがった」という意味なので、sharp pencil は「よくけずったえんぴつ」に聞こえます。",
        "ホッチキスも、1903年ごろアメリカから入ってきた機械《きかい》の会社の名前がもとになった呼《よ》び名で、英語《えいご》では {{stapler}} です。このように日本で生まれた英語《えいご》のような言葉を{{和製英語《わせいえいご》}}といいます。もし通じなかったら、物を見せて What's this? と聞けば、本当の名前を教えてもらえます。",
      ],
      photos: [
        {
          src: `${C}/sharp-pencil.webp`, width: 800, height: 600,
          alt: "ねじれたもようのある、銀色の細いシャープペンシル",
          caption: "むかしの「エバー・レディ・シャープ・ペンシル」。この名前から、日本では「シャープペンシル」という呼《よ》び名が広まりました。英語《えいご》では {{mechanical pencil}} です。",
          credit: { author: "軍事用懐中電灯", license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0", source: "https://commons.wikimedia.org/wiki/File:Ever_Ready_Sharp_Pencil.jpg" },
        },
      ],
      reveal: "シャープペンシルもホッチキスも、商品《しょうひん》や会社の名前から日本で生まれた呼《よ》び名、{{和製英語《わせいえいご》}}でした。英語《えいご》ではシャープペンシルは {{mechanical pencil}}、ホッチキスは {{stapler}} です。しかも sharp pencil は「とがったえんぴつ」という意味になるので、えんぴつを出されてしまうのです。",
      cliff: "物の名前が言えたら、次は友だちに「持ってる？」と聞いてみましょう。",
    },
    {
      heading: "持っているか聞く・だれの物か言う",
      body: "「〜を持っていますか」は {{Do you have 〜?}} と聞き、{{Yes, I do.}} か {{No, I don't.}} で答えます。だれの物かを言うときは、物の前に {{my}}（わたしの）や {{your}}（あなたの）をつけます。my や your をつけたときは、a はつけません。",
      figure: {
        type: "formula",
        title: "物の前につけることば",
        prose: true,
        steps: [
          { expr: "This is {{a}} pen.", note: "1本のペン" },
          { expr: "This is {{my}} pen.", note: "わたしのペン" },
          { expr: "This is {{your}} pen.", note: "あなたのペン" },
        ],
        note: "a my pen のように、a と my をいっしょには使いません。",
      },
      reading: [
        "図工の時間に、のりをわすれてしまいました。そんなときは、となりの友だちに {{Do you have glue?}}（のりを持っていますか）と聞きます。持っていれば {{Yes, I do.}}、持っていなければ {{No, I don't.}} と答えます。Here you are.（はい、どうぞ）とわたしてもらったら、Thank you. と言いましょう。",
        "だれの物かを言うときは、物の前に {{my}}（わたしの）や {{your}}（あなたの）をつけます。This is my pencil.（これはわたしのえんぴつです）、Is this your cap?（これはあなたのぼうしですか）。my や your をつけたら、a はつけません。「わたしの1本のえんぴつ」と、二つも説明《せつめい》しなくてよいからです。",
      ],
    },
  ],
  story: {
    kind: "manzai",
    title: "シャープなえんぴつ、ください",
    cast: ["ユウ", "ハナ"],
    lines: [
      { who: "ユウ", text: "どうもー、ユウとハナです！　ぼく、文房具《ぶんぼうぐ》を英語《えいご》で言えるようになったんだ。" },
      { who: "ハナ", text: "すごいね。じゃあ、これは？　What's this?", say: "すごいね。じゃあ、これは？ ワッツ・ディス？" },
      { who: "ユウ", text: "It's a シャープペンシル！", say: "イッツ・ア・シャープペンシル！" },
      { who: "ハナ", text: "半分日本語でしょ！　シャープペンシルは日本で生まれた呼《よ》び名。英語《えいご》では {{mechanical pencil}} だよ。", say: "半分日本語でしょ！ シャープペンシルは日本で生まれた呼び名。英語ではメカニカル・ペンシルだよ。" },
      { who: "ユウ", text: "でも、sharp pencil って言えば通じるでしょ？", say: "でも、シャープ・ペンシルって言えば通じるでしょ？" },
      { who: "ハナ", text: "sharp は「先がとがった」っていう意味。英語《えいご》の国でたのんだら、よくけずったえんぴつを出されちゃうよ。", say: "シャープは、先がとがった、っていう意味。英語の国でたのんだら、よくけずったえんぴつを出されちゃうよ。" },
      { who: "ユウ", text: "とがってるなら、それでいいや。よく書けそうだし。" },
      { who: "ハナ", text: "いいの！？" },
      { who: "ユウ", text: "じゃあ、これは分かるよ。紙をパチンととめる、ホッチキス！　Do you have a ホッチキス?", say: "じゃあ、これは分かるよ。紙をパチンととめる、ホッチキス！ ドゥー・ユー・ハブ・ア・ホッチキス？" },
      { who: "ハナ", text: "それも通じにくいの。ホッチキスは、むかしアメリカから入ってきた機械《きかい》の会社の名前がもと。英語《えいご》では {{stapler}}。", say: "それも通じにくいの。ホッチキスは、むかしアメリカから入ってきた機械の会社の名前がもと。英語ではステープラー。" },
      { who: "ユウ", text: "会社の名前？　じゃあ、ぼくの消しゴムも、そのうち「ユウ」って呼《よ》ばれるかも。" },
      { who: "ハナ", text: "呼《よ》ばれない！　消しゴムは {{eraser}}。イギリスでは {{rubber}} とも言うよ。rub は「こする」。ゴムでこすって消すからなんだって。", say: "呼ばれない！ 消しゴムはイレイサー。イギリスではラバーとも言うよ。ラブは、こする。ゴムでこすって消すからなんだって。" },
      { who: "ユウ", text: "よし、まとめて言うね。This is a my mechanical pencil!", say: "よし、まとめて言うね。ディス・イズ・ア・マイ・メカニカル・ペンシル！" },
      { who: "ハナ", text: "a と my はいっしょに使わないの！　This is my mechanical pencil. だよ。", say: "エーとマイは、いっしょに使わないの！ ディス・イズ・マイ・メカニカル・ペンシル、だよ。" },
      { who: "ユウ", text: "OK！　じゃあハナに聞くね。Do you have a stapler?", say: "オーケー！ じゃあハナに聞くね。ドゥー・ユー・ハブ・ア・ステープラー？" },
      { who: "ハナ", text: "Yes, I do. はい、どうぞ。……あれ、これ、ユウの名前が書いてある。", say: "イエス・アイ・ドゥー。はい、どうぞ。……あれ、これ、ユウの名前が書いてある。" },
      { who: "ユウ", text: "Oh! This is my stapler!", say: "オー！ ディス・イズ・マイ・ステープラー！" },
      { who: "ハナ", text: "自分のを持ってるじゃない！　もういいよ。" },
      { who: "ユウ", text: "どうも、ありがとうございました！" },
    ],
    note: "ユウとハナは作り話の人で、会話も作り話です。シャープペンシル（英語《えいご》では mechanical pencil）とホッチキス（stapler）が日本で生まれた呼《よ》び名であること、イギリスで消しゴムを rubber とも呼《よ》ぶことは本当のことです。",
  },
  mistakes: [
    { wrong: "cap を「カップ」の意味で使う", right: "カップは cup、ぼうしは cap", why: "まん中の文字が a か u かで、別《べつ》の物になります。" },
    { wrong: "What's this? — I'm a pencil.", right: "It's a pencil.", why: "I'm は自分のことを言うときの形です。物のことは It's 〜. で答えます。" },
    { wrong: "This is a my bag.", right: "This is my bag.", why: "my や your をつけたら、a はつけません。" },
  ],
  check: [
    { q: "eraser の意味は？", a: "消しゴム", why: "字を消す物が eraser。" },
    { q: "「あなたはのりを持っていますか」を英語《えいご》で言うと？", a: "Do you have glue?", why: "持っているかは Do you have 〜? で聞く。" },
    { q: "What's this? に「それは時計です」と答えると？", a: "It's a clock.", why: "物のことは It's 〜.、時計は clock。" },
  ],
  next: [
    { label: "ドリルで「身の回りの物の言い方」を練習する", href: "/learn/eigo-sho/e-english-34-mi-no-mawari" },
    { label: "「ほしいものを伝《つた》える（I want 〜.）」（ドリル）", href: "/learn/eigo-sho/e-english-34-hoshii" },
    { label: "「色・形の言い方」（ドリル）", href: "/learn/eigo-sho/e-english-34-iro-katachi" },
  ],
};
