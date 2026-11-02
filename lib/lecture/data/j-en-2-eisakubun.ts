import type { Lecture } from "../types";

const C = "/media/commons/j-en-2-eisakubun";

export const J_EN_2_EISAKUBUN: Lecture = {
  unit: "j-en-2-eisakubun",
  title: "英作文は短い文に分けてつなぐ。意見は「理由」とセットで書く",
  hook: "中2になると「〜したとき」「もし〜なら」「〜するために」など、長めの内容を英語にする問題がふえます。テストでは「あなたの意見と理由を書きなさい」という{{自由英作文}}もよく出ます。長い日本語も、決まった手順で短い文に分ければ、習った文法で書けます。",
  mystery: "1860年、アメリカの11歳の少女が、大統領選挙に立候補していたリンカーンに数文の手紙を送りました。そのあとリンカーンはひげをのばし始め、翌年には少女の町で汽車を降りて、彼女に会いに行きます。子どもの短い英作文に、なぜ大人の政治家の心を動かす力があったのでしょう？",
  mission: {
    from: "市の国際交流員（姉妹都市の担当）",
    request: "毎年、町の中学生に、海外の姉妹都市の中学生へ英語の手紙を書いてもらっています。ところが去年は Our town is good. のように一言で終わる手紙が多く、返事はほとんど来ませんでした。11歳の少女の手紙がリンカーンを動かしたわけがわかれば、中学生に「心を動かす英作文」の書き方を伝えられます。名探偵のあなたに、このなぞを解いてほしいのです。",
    thanks: "意見を最初に言い切り、中身のちがう理由を2つ、しかも読む人の得になる形で書く。これを手紙の書き方ガイドの1ページ目にのせます。今年はきっと、返事がたくさん届くはずです。",
  },
  sections: [
    {
      heading: "長い文は2つに分けて、接続詞でつなぐ",
      body: "「明日雨が降ったら、家にいます」は、「雨が降る」と「家にいる」の{{2つの文}}に分けて考えます。それぞれを英語にしてから、{{if・when・because}} などの接続詞でつなぎます。if や when のあとでは、未来のことでも{{現在形}}を使うのがルールです。",
      reading: [
        "長い日本語をいきなり英語にしようとすると、どこから手をつけてよいかわからなくなります。そこで、まず「だれが・どうする」のまとまりを探して、文を{{2つに分け}}ます。「駅に着いたら、電話してね」なら、「あなたが駅に着く」と「（私に）電話して」の2つです。それぞれを you get to the station と call me にしてから、{{when}} でつなげば When you get to the station, call me. の完成です。接続詞のあとには、かならず「主語＋動詞」がそろっていることを確かめましょう。",
        "when や if の中は、未来のことでも{{現在形}}にします。「着いたら」はこれから先のことですが、when のまとまりは「その時点」を決める役目なので、will を入れません。日本語でも「明日駅に着く時」と言い、「着くだろう時」とは言いませんね。理由を言うなら {{because}}、「〜だけれど」なら though を使います。接続詞は、短い文どうしの関係を読む人に知らせる道しるべなのです。",
        "短い文を組み合わせる名人が、アメリカの作家{{マーク・トウェイン}}（1835〜1910年）です。若いころミシシッピ川の蒸気船の水先案内人をしていて、ペンネームは川の深さを知らせる船乗りのかけ声からとったといわれます。『トム・ソーヤーの冒険』（1876年）などで、人々がふだん話すアメリカの英語をそのまま小説に生かしました。1894年の小説『まぬけのウィルソン』では、各章の頭に、登場人物の作った「暦」の格言がおかれています。下の一行もその1つで、When angry は When you are angry の主語と be動詞を省いた形です。「怒ったら10数えよ」という昔からの教えを、わざと4に減らしてからかっているのです。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "us",
        text: "When angry, count four; when very angry, swear.",
        ja: "腹が立ったら、4つ数えよ。ものすごく腹が立ったら、悪態をつけ。",
        cite: "Mark Twain, Pudd'nhead Wilson, Chapter X (1894)",
        source: "https://www.gutenberg.org/ebooks/102",
      }],
      figure: {
        type: "formula",
        title: "「明日雨が降ったら、家にいます」",
        prose: true,
        steps: [
          { label: "分ける", expr: "雨が降る ／ 家にいる", note: "2つの文にする" },
          { label: "英語に", expr: "it rains ／ I will stay home", note: "1つずつ英語に" },
          { label: "つなぐ", expr: "{{If}} it {{rains}} tomorrow, I will stay home.", note: "if のあとは現在形" },
        ],
      },
      cliff: "「彼らは救うために死んだ」――2語の to＋原形が、ある手紙で大きな重みをもちました。",
    },
    {
      heading: "「〜するために」「〜すること」は to＋動詞の原形",
      body: "「英語を勉強するために図書館へ行った」の「〜するために」は、{{不定詞（to＋動詞の原形）}}で表します。「〜すること」「〜するための」も同じ形です。to のあとは、主語や時に関係なく{{いつも原形}}にします。",
      reading: [
        "日本語の中に「〜するために」「〜すること」「〜するための」を見つけたら、{{不定詞}}の出番です。「本を借りるために図書館へ行った」は I went to the library to borrow a book.、「絵をかくことが好き」は I like to draw pictures.、「宿題をする時間がない」は I have no time to do my homework. です。文の前半で言いたいことを言い切り、to＋原形で「何のために」「何を」を後ろからつけ足す。これで長い日本語も、1つの文にすっきり収まります。to のあとは、過去の話でも、主語が he でも{{いつも原形}}です。",
        "この短い形が、深い意味を運んだ手紙があります。アメリカが南と北に分かれて戦った{{南北戦争}}（1861〜65年）のさなか、1864年11月に、リンカーン大統領の名でボストンに住むビクスビー夫人へ送られた手紙です。陸軍の記録で、夫人の5人の息子が戦死したと伝えられたためでした。手紙は新聞にのって広く知られ、今も英語で書かれたもっとも美しい手紙の1つといわれます。ただし、のちの調べで戦死した息子は2人だったことがわかり、また文章は秘書のジョン・ヘイが書いたという説もあって、くわしいことはまだ議論が続いています。",
        "下の2文に、to＋原形が2回出てきます。attempt to beguile（気をまぎらわせようとする）は「〜すること」の使い方、the Republic they died to save（彼らが救うために命をささげた共和国）は「〜するために」の使い方です。refrain（ひかえる）、tendering（さし出すこと）、consolation（なぐさめ）など難しい語もありますが、骨組みは中学で習う形です。とくに最後の died to save は、わずか3語で、息子たちの死に「国を救う」という目的と意味をあたえています。目的を表す to の力が、いちばん深く生きた例といえるでしょう。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "us",
        text: "I feel how weak and fruitless must be any words of mine which should attempt to beguile you from the grief of a loss so overwhelming. But I cannot refrain from tendering to you the consolation that may be found in the thanks of the Republic they died to save.",
        ja: "これほど大きな喪失の悲しみから、あなたの心をそらそうとする私のことばが、どれほど弱く、むなしいものになるか、よくわかっています。それでも、ご子息たちが救うために命をささげた共和国からの感謝の中に見いだせるなぐさめを、お伝えせずにはいられません。",
        cite: "Abraham Lincoln, Letter to Mrs. Bixby (1864)",
        source: "https://en.wikisource.org/wiki/Letter_to_Mrs._Bixby",
      }],
      photos: [
        {
          src: `${C}/white-house.webp`, width: 800, height: 537,
          alt: "広い芝生の奥に、白い柱が並ぶ大きな建物。手前の石垣に男性が腰かけている古いガラス写真",
          caption: "南北戦争のころ（1861〜65年）のホワイトハウス。当時は「大統領官邸」と呼ばれ、ビクスビー夫人への手紙もここから送られた。",
          credit: { author: "Mathew Benjamin Brady", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:White_House,_Washington_D.C._1861-_1865_-_NARA_-_528200.jpg" },
        },
      ],
      figure: {
        type: "compare",
        title: "日本語から不定詞を見つける",
        columns: [{ title: "日本語" }, { title: "英語", tone: "yellow" }],
        rows: [
          { label: "〜するために", cells: ["会うために", "to see him"] },
          { label: "〜すること", cells: ["読むことが好き", "like to read"] },
          { label: "〜するための", cells: ["寝るための時間", "time to sleep"] },
        ],
      },
      cliff: "次は、11歳の少女が大統領候補に送った「意見と理由」の手紙です。",
    },
    {
      heading: "意見文は「意見 → 理由2つ → まとめ」の型",
      body: "「あなたは〜に賛成ですか」などと聞かれたら、まず {{I think 〜.}} で意見を言い切ります。次に First, 〜. Second, 〜. で{{理由を2つ}}書き、最後に So, 〜. などでまとめます。型が決まっていれば、中身を考えることに集中できます。",
      reading: [
        "英語の意見文は、結論を先に言うのが基本です。「夏と冬、どちらが好き？」なら、まず I like summer better than winter. と{{意見}}を言い切ります。次に First, I can swim in the sea. Second, summer vacation is long. と{{理由を2つ}}、最後に So, summer is my favorite season. とまとめます。理由は「なぜ？」に答えていること、2つの中身がちがうことが大切です。「楽しいから」「おもしろいから」では、ほとんど同じ理由になってしまいます。",
        "この型の力を見せてくれるのが、1860年10月、ニューヨーク州ウェストフィールドに住む11歳の少女{{グレース・ベデル}}が書いた手紙です。父親が町の祭り（フェア）から持ち帰ったリンカーンの肖像を見た彼女は、大統領選挙に出ていた彼に手紙を送りました。まず「あなたに大統領になってほしい」と自分の立場を示し、次に「ひげをのばしたら」と提案します。理由は2つ。顔がとてもやせているので、ひげがあればずっとよく見えること。そして女の人はひげが好きなので、夫たちに彼に投票するようすすめるだろうということ。さらに、4人の兄のうちまだ決めていない兄たちにも投票をすすめる、と約束しています。",
        "4日後、リンカーンは返事を書きました。自分に娘はいないこと、そして今さらひげをのばしたら、人々にわざとらしいと思われないだろうか、と。ところが11月の選挙に勝ったあと、彼はひげをのばし始めます。翌1861年2月、首都ワシントンへ向かう汽車がウェストフィールドに止まったとき、リンカーンは集まった人々の前でグレースを呼び、言葉をかわしました。ひげをのばした理由はほかにもあったかもしれません。それでも、この短い手紙が心に残っていたことはたしかです。",
      ],
      photos: [
        {
          src: `${C}/lincoln-1860.webp`, width: 800, height: 1021,
          alt: "ひげのない、ほおのこけた男性の横顔の白黒写真。黒い上着に蝶ネクタイ",
          caption: "1860年、選挙の前のリンカーン（アレクサンダー・ヘスラー撮影）。グレースが「顔がやせている」と書いたころの、ひげのない顔。",
          credit: { author: "Alexander Hesler", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Abraham_Lincoln_O-26_by_Hesler,_1860.jpg" },
        },
        {
          src: `${C}/lincoln-1861.webp`, width: 379, height: 580,
          alt: "あごひげをたくわえた男性が、小さな机の横のいすに座っている白黒写真。机の上にシルクハット",
          caption: "1861年2月24日、ワシントンに着いた直後のリンカーン（アレクサンダー・ガードナー撮影）。ウェストフィールドでグレースに会ったのは、この少し前。",
          credit: { author: "Alexander Gardner", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Full_length_portrait_of_Lincoln_seated_next_to_a_small_table,_24_Feb._1861.jpg" },
        },
      ],
      figure: {
        type: "flow",
        title: "意見文の組み立て",
        dir: "col",
        steps: [
          { label: "意見", sub: "I think (that) 〜.", tone: "navy" },
          { label: "理由 1", sub: "First, 〜." },
          { label: "理由 2", sub: "Second, 〜." },
          { label: "まとめ", sub: "So, 〜.", tone: "yellow" },
        ],
        note: "例：I like summer better than winter. First, I can swim in the sea. Second, summer vacation is long.",
      },
      reveal: "グレースの手紙は、{{意見→理由2つ}}の型そのものでした。まず「大統領になってほしい」「ひげをのばしたら」と意見を言い切り、「顔がやせているから見ばえがよくなる」「女の人がひげを好むから票がふえる」と、中身のちがう理由を2つ並べています。しかも2つめの理由は、選挙に勝ちたいリンカーンにとっての{{得}}になっていました。短くても、意見がはっきりして、理由が具体的で、読む人のためになる文章は、大人の心も動かすのです。",
      cliff: "書きたい語が英語で浮かばないとき、文豪トウェインならどうすすめるでしょう？",
    },
    {
      heading: "書けない語は、やさしい日本語に言いかえる",
      body: "「満喫した」「感動した」のように英語が浮かばない語は、まず{{やさしい日本語}}に言いかえてから英語にします。むずかしい単語に挑戦するより、{{確実に書ける表現}}でミスなく書くほうが点になります。最後に、主語と動詞の形・時・つづりを見直しましょう。",
      reading: [
        "英作文で手が止まるのは、たいてい「この日本語、英語で何て言うの？」という1語のせいです。そんなときは、まず{{やさしい日本語}}に言いかえます。「夏休みを満喫した」は「とても楽しんだ」で I enjoyed my summer vacation very much.、「映画に感動した」は「心を動かされた」で The movie moved me.、「道に迷った」は「道がわからなかった」で I couldn't find the way. です。小学生に説明するつもりで言いかえると、中学で習った単語で書けるようになります。",
        "マーク・トウェインは1895年、雑誌に「フェニモア・クーパーの文学上の罪」という評論を書きました。クーパーは、アメリカ開拓時代の森を舞台にした冒険小説で知られる、トウェインより前の時代の人気作家です。トウェインは「小説には守るべき規則が19ある」と言い、クーパーの『鹿殺し』はそのうち18を破っている、と大まじめにからかいました。下は、その「小さな規則」の部分です。",
        "13番目の Use the right word, not its second cousin. は、「正しい語を使え。その〈はとこ〉ではなく」。似ているけれど少しちがう語を、遠い親せきにたとえたのです。14番目の Eschew surplusage.（よけいなものを避けよ）は、わざと難しい語で「むだな言葉を使うな」と言うしゃれになっています。そして最後は Employ a simple and straightforward style.（簡単でまっすぐな文体を使え）。中学生の英作文にとって「正しい語」とは、意味がずれず、つづりも確実に書ける語のことです。17番目の Use good grammar.（正しい文法を使え）のとおり、書き終えたら主語と動詞の形、時、つづりを見直しましょう。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "us",
        text: "In addition to these large rules there are some little ones. These require that the author shall:\n12. Say what he is proposing to say, not merely come near it.\n13. Use the right word, not its second cousin.\n14. Eschew surplusage.\n15. Not omit necessary details.\n16. Avoid slovenliness of form.\n17. Use good grammar.\n18. Employ a simple and straightforward style.",
        ja: "これらの大きな規則のほかに、小さな規則もいくつかある。作者は次のことを守らねばならない。\n12. 言おうとしていることを言うこと。近くまで来るだけではだめだ。\n13. 正しい語を使うこと。そのはとこではなく。\n14. よけいなものは避けること。\n15. 必要なことは省かないこと。\n16. だらしない形にしないこと。\n17. 正しい文法を使うこと。\n18. 簡単でまっすぐな文体を使うこと。",
        cite: "Mark Twain, Fenimore Cooper's Literary Offences (1895)",
        source: "https://www.gutenberg.org/ebooks/3172",
      }],
      photos: [
        {
          src: `${C}/twain.webp`, width: 756, height: 1061,
          alt: "白い豊かな髪と口ひげの年配の男性が、白い上着を着てこちらを見ている白黒写真",
          caption: "1907年、70歳をこえたマーク・トウェイン（A・F・ブラッドリー撮影）。話し言葉のアメリカ英語で書き、「簡単でまっすぐな文体」を説いた。",
          credit: { author: "A.F. Bradley, New York", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Mark_Twain_by_AF_Bradley.jpg" },
        },
      ],
      figure: {
        type: "flow",
        title: "言いかえてから英語にする",
        steps: [
          { label: "夏休みを満喫した", tone: "plain" },
          { label: "とても楽しんだ", tone: "blue" },
          { label: "I enjoyed it", sub: "very much", tone: "yellow" },
        ],
        arrows: ["言いかえ", "英語に"],
      },
    },
  ],
  story: {
    kind: "manga4",
    title: "理由は「かわいい」が2つ",
    panels: [
      {
        scene: "夜の台所。ミオが英語で書いた手紙を、兄のソウタに見せる。",
        lines: [
          { who: "ミオ", text: "父さんに英語でお願い！" },
          { who: "ソウタ", text: "アイウォントアキャット？" },
          { who: "ミオ", text: "ネコを飼いたいの！" },
        ],
        art: {
          bg: "kitchen",
          cast: [
            { who: "ミオ", look: "girl", x: 252, face: "smile", hand: [212, 214] },
            { who: "ソウタ", look: "boy", x: 86, face: "normal" },
          ],
          props: [
            { kind: "table", x: 0, y: 240 },
            { kind: "board", x: 170, y: 214, text: "ネコ飼いたい" },
          ],
        },
      },
      {
        scene: "ソウタが理由をたずねる。ミオは自信まんまんで読み上げる。",
        lines: [
          { who: "ソウタ", text: "{{理由}}は書いたの？" },
          { who: "ミオ", text: "First,かわいい。" },
          { who: "ミオ", text: "Second,すごくかわいい。" },
        ],
        art: {
          bg: "kitchen",
          cast: [
            { who: "ソウタ", look: "boy", x: 252, face: "think", fx: "?" },
            { who: "ミオ", look: "girl", x: 84, face: "smile", hand: [128, 214] },
          ],
          props: [
            { kind: "table", x: 0, y: 240 },
            { kind: "book", x: 172, y: 224, s: 0.9 },
          ],
        },
      },
      {
        scene: "ソウタがずっこける。ミオは首をかしげてから、ひらめく。",
        lines: [
          { who: "ソウタ", text: "それ、同じ理由だよ！" },
          { who: "ソウタ", text: "{{ちがう中身}}で2つ、" },
          { who: "ソウタ", text: "父さんの{{得}}になる理由も！" },
        ],
        art: {
          bg: "kitchen",
          cast: [
            { who: "ソウタ", look: "boy", x: 254, face: "shout", fx: "!" },
            { who: "ミオ", look: "girl", x: 82, face: "think", fx: "idea" },
          ],
          props: [
            { kind: "table", x: 0, y: 240 },
            { kind: "board", x: 170, y: 214, text: "理由は2つ" },
          ],
        },
      },
      {
        scene: "書き直した手紙を、父が読む。ミオはどきどきしながら見守る。",
        lines: [
          { who: "父", text: "理由が2つ、しかも具体的" },
          { who: "父", text: "これは断れないな" },
          { who: "ミオ", text: "リンカーンも動いた型！" },
        ],
        art: {
          bg: "kitchen",
          cast: [
            { who: "父", look: "teacher", x: 252, face: "smile", hand: [212, 212] },
            { who: "ミオ", look: "girl", x: 84, face: "smile", fx: "!" },
          ],
          props: [
            { kind: "table", x: 0, y: 240 },
            { kind: "book", x: 172, y: 224, s: 0.9 },
          ],
        },
      },
    ],
    note: "ミオ・ソウタ・父は架空の人物で、場面と会話は創作です。1860年に11歳のグレース・ベデルがリンカーンにひげをすすめる手紙を書き、リンカーンが返事を書いたこと、1861年2月にウェストフィールドで彼女に会ったことは史実です。",
  },
  mistakes: [
    { wrong: "If it will rain tomorrow, I will stay home.", right: "If it rains tomorrow, I will stay home.", why: "if（もし〜なら）のあとは、未来のことでも現在形を使います。" },
    { wrong: "I went to the library to studied.", right: "I went to the library to study.", why: "to のあとはいつも動詞の原形です。" },
    { wrong: "I like summer. Because I can swim.", right: "I like summer because I can swim.", why: "because は文と文をつなぐ語。英作文では because だけの文にしません。" },
  ],
  check: [
    { q: "「私が家に帰ったとき、母は料理をしていました」を英語にしましょう。", a: "When I came home, my mother was cooking.", why: "when で2つの文をつなぐ。「していた」は過去進行形。" },
    { q: "「私は写真をとるために京都へ行きました」を英語にしましょう。", a: "I went to Kyoto to take pictures.", why: "「〜するために」は to＋原形。" },
    { q: "意見文で理由を2つ並べるとき、それぞれの文の最初に置くことばは？", a: "First, 〜. / Second, 〜.", why: "順番を示すことばで、読む人に理由の数が伝わる。" },
  ],
  next: [
    { label: "4択ドリル「英作文」に挑戦", href: "/learn/eigo-chu/j-en-2-eisakubun" },
    { label: "文をつなぐ「接続詞」のレクチャー", href: "/learn/lecture/j-en-2-setsuzokushi" },
    { label: "「〜するために」の「不定詞」のレクチャー", href: "/learn/lecture/j-en-2-futeishi" },
  ],
};
