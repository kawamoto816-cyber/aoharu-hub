import type { Lecture } from "../types";

const C = "/media/commons/j-en-1-gimonshi";

export const J_EN_1_GIMONSHI: Lecture = {
  unit: "j-en-1-gimonshi",
  title: "疑問詞は文の先頭。そのあとはふつうの疑問文の語順",
  hook: "「大阪に住んでいますか？」なら Yes か No で答えられますが、「どこに住んでいますか？」には場所で答えます。具体的な情報をたずねるときに使うのが疑問詞です。疑問詞の種類と、文のどこに置くかをおさえましょう。",
  mystery: "イギリスの作家キプリングは、ゾウの鼻がなぜ長いのかを語る物語のあとに、「わたしは正直な召し使いを6人かかえている。知っていることは、みんな彼らが教えてくれた」という詩をそえました。この6人はいったいだれで、なぜたった6人で「すべて」を教えられるのでしょう？",
  mission: {
    from: "子ども向け英語ラジオ番組のDJ",
    request: "番組に「英語で質問すると、すぐ会話が終わっちゃう」というお便りがたくさん届きます。そこで、キプリングの「6人の召し使い」の詩を紹介する新コーナーを始めたいのですが、6人の正体と、なぜ6人で何でもわかるのかを、リスナーにうまく説明できません。名探偵のあなたに、6人の召し使いの正体をつきとめてほしいのです。",
    thanks: "6人の正体は、6つの疑問詞だったのですね。Yes か No では終わらず、人・物・時・場所・理由・方法と、ちがう種類の中身を連れて帰ってくる。新コーナーの名前は「今週の召し使い」に決めました。",
  },
  sections: [
    {
      heading: "疑問詞は何をたずねるか",
      body: "疑問詞は、たずねたい中身によって使い分けます。物は{{What}}、人は{{Who}}、持ち主は{{Whose}}、選ぶときは{{Which}}、時は{{When}}、場所は{{Where}}、理由は{{Why}}、方法やようすは{{How}}です。多くが wh で始まるので、まとめて wh 疑問文ともいいます。",
      reading: [
        "Do you like dogs?（犬は好きですか）と聞かれたら、Yes か No で答えられます。でも、What animal do you like?（何の動物が好きですか）と聞かれたら、Yes では答えになりません。I like cats.（ネコが好きです）と、{{中身}}を答える必要があります。このように「何を知りたいのか」を示して、具体的な情報をたずねる言葉が{{疑問詞}}です。疑問詞は、相手に「この種類の答えを持ってきて」とたのむ札のようなものです。",
        "おもな疑問詞は8つです。物は What、人は Who、持ち主は Whose、選ぶときは Which、時は When、場所は Where、理由は Why、方法やようすは How。How 以外はみな wh で始まるので、疑問詞を使った文を{{wh 疑問文}}とよびます。How も、文字を見れば w と h が入っています。",
        "この疑問詞を物語の主役にした作家がいます。1865年にインドのボンベイ（今のムンバイ）で生まれたイギリスの作家、{{キプリング}}です。1902年に出した『なぜなに物語』（Just So Stories）は、「ヒョウにはなぜはん点があるの？」「ラクダにはなぜこぶがあるの？」といった問いに、ゆかいなうそ話で答える子ども向けの本です。挿絵もキプリング自身がかきました。",
        "その中の一編「ゾウの鼻が長いわけ」の主人公は、知りたがりのゾウの子どもです。昔のゾウは鼻が短く、この子は会う動物ごとに質問をして、そのたびに親せきからおしりをたたかれていました。ある日、彼は What does the Crocodile have for dinner?（ワニは夕ごはんに何を食べるの？）とたずねます。だれも答えてくれないので、ゾウの子は自分で確かめに大きな川まで出かけ、ワニに鼻をつかまれて引っぱられ、長い鼻になって帰ってきました。たった1つの What が、ゾウの鼻をのばしたのです。",
      ],
      photos: [
        {
          src: `${C}/elephant-child.webp`, width: 800, height: 642,
          alt: "川の中で、黒くぬられたゾウの子どもが、水面のワニに鼻をくわえられて引っぱられている白黒の挿絵",
          caption: "キプリング『なぜなに物語』の挿絵。ワニに鼻を引っぱられるゾウの子。What で始まる{{疑問詞}}の質問が、この大冒険のきっかけになった。",
          credit: { author: "Rudyard Kipling（Just So Stories, c1912年版）", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Illustration_at_p._73_in_Just_So_Stories_(c1912).png" },
        },
      ],
      cliff: "ところで、What のすぐあとに does が来るのはなぜでしょう？",
      figure: {
        type: "compare",
        title: "おもな疑問詞",
        columns: [{ title: "疑問詞", tone: "yellow" }, { title: "たずねること" }, { title: "例" }],
        rows: [
          { cells: ["What", "何", "What is this?"] },
          { cells: ["Who", "だれ", "Who is she?"] },
          { cells: ["Whose", "だれの", "Whose bag is this?"] },
          { cells: ["Which", "どちら", "Which is yours?"] },
          { cells: ["When", "いつ", "When is your birthday?"] },
          { cells: ["Where", "どこ", "Where do you live?"] },
          { cells: ["Why", "なぜ", "Why do you like it?"] },
          { cells: ["How", "どう・どうやって", "How do you go there?"] },
        ],
      },
    },
    {
      heading: "語順：疑問詞＋疑問文",
      body: "疑問詞は{{文の先頭}}に置き、そのあとに{{ふつうの疑問文}}（be動詞の疑問文や do / does の疑問文）を続けます。答えは Yes / No ではなく、たずねられた{{中身}}を答えます。Why の質問には、ふつう{{Because 〜}}で理由を答えます。",
      reading: [
        "疑問詞の文は、2つのステップで作れます。まず、ふつうの文を{{Yes / No でたずねる疑問文}}にします。You live in Osaka. なら Do you live in Osaka? です。次に、たずねたい部分（in Osaka）を疑問詞（Where）に変えて、{{文の先頭}}に出します。すると Where do you live? のできあがり。be動詞の文も同じで、This is a pen. → Is this a pen? → What is this? となります。先頭の疑問詞が「何を答えてほしいか」を最初に知らせ、そのあとは見なれた疑問文の形が続くのです。",
        "1865年に出た『{{ふしぎの国のアリス}}』には、英語でいちばん有名な疑問詞の質問の1つが出てきます。作者ルイス・キャロルは、オックスフォード大学で数学を教えていた人です。知り合いの少女たちとのボート遊びで即興で話した物語が、この本のもとです。うさぎの穴に落ちたアリスは、体が大きくなったり小さくなったりをくり返します。",
        "そんなアリスに、キノコの上のイモムシが聞きます。Who are you?（あなたはだれ？）。be動詞の疑問文の前に Who を置いた形で、Yes か No では答えられません。ところが、何度も体が変わったアリスは、うまく答えられないのです。イモムシはさらに What do you mean by that?（それはどういう意味だ）と、What＋do＋you＋mean の形で問いつめます。答えにくい疑問詞の質問が、「自分とは何か」という深い問いに変わる。だからこの場面は150年以上たっても読みつがれています。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "“Who are you?” said the Caterpillar.\nThis was not an encouraging opening for a conversation. Alice replied, rather shyly, “I—I hardly know, sir, just at present—at least I know who I was when I got up this morning, but I think I must have been changed several times since then.”\n“What do you mean by that?” said the Caterpillar sternly. “Explain yourself!”",
        ja: "「おまえはだれだ？」とイモムシが言った。\nおしゃべりの始まりとしては、あまり気の進むものではなかった。アリスは少しもじもじしながら答えた。「わ、わたし、今はよくわからないんです。少なくとも、けさ起きたときに自分がだれだったかはわかっています。でも、それから何回か入れかわってしまったみたいで」\n「それはどういう意味だ？」とイモムシはきびしく言った。「説明してみろ！」",
        cite: "Lewis Carroll, Alice's Adventures in Wonderland, Chapter V (1865)",
        source: "https://www.gutenberg.org/ebooks/11",
      }],
      photos: [
        {
          src: `${C}/caterpillar.webp`, width: 800, height: 1069,
          alt: "大きなキノコの上で水パイプをくわえたイモムシと、キノコのかさのふちから顔をのぞかせる少女の白黒の版画",
          caption: "テニエルがえがいた『ふしぎの国のアリス』初版（1865年）の挿絵。イモムシはこのあと{{Who}} are you? とアリスにたずねる。",
          credit: { author: "John Tenniel", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Alice_05a-1116x1492.jpg" },
        },
      ],
      cliff: "How や What は、後ろに1語つけるだけで、数や時刻までたずねられるようになります。",
      figure: {
        type: "formula",
        title: "ふつうの文から疑問詞の文へ",
        prose: true,
        steps: [
          { expr: "You live {{in Osaka}}.", note: "ふつうの文。たずねたいのは場所" },
          { expr: "{{Do}} you live in Osaka?", note: "まず疑問文にする" },
          { expr: "{{Where}} do you live?", note: "場所の部分を Where にして先頭へ" },
          { expr: "— I live {{in Osaka}}.", note: "Yes / No ではなく場所を答える" },
        ],
      },
    },
    {
      heading: "How と What は後ろの語で意味が広がる",
      body: "How は{{How ＋形容詞・副詞}}で、数や量、程度をたずねられます。What も{{What ＋名詞}}で「何の〜」「何時」などをたずねます。How many のあとの名詞は{{複数形}}にします。",
      reading: [
        "How だけなら「どうやって」「どんなようす」ですが、後ろに形容詞をつけると「どのくらい〜？」になります。How old are you?（何歳ですか）、How tall is the tower?（その塔はどのくらいの高さですか）、How much is this cap?（このぼうしはいくらですか）。数をたずねる{{How many}}は、後ろに数えられる名詞の{{複数形}}を続けて、How many cats do you have?（ネコを何びき飼っていますか）とします。答えが2以上かもしれないので、最初から複数形で聞くのです。",
        "What も、後ろに名詞をつけると「何の〜」になります。What time is it?（何時ですか）、What color do you like?（何色が好きですか）、What sport do you play?（何のスポーツをしますか）。{{What＋名詞}}をひとかたまりにして文の先頭に置き、そのあとはふつうの疑問文の語順です。",
        "How many を使った、200年以上前から伝わる{{マザーグース}}の唄があります。How many miles is it to Babylon?（バビロンまでは何マイル？）。miles は mile（マイル、約1.6キロメートル）の{{複数形}}です。How many＋複数形の名詞を先頭に置き、そのあとに is it to Babylon と疑問文の語順が続きます。答えは Threescore miles and ten.（70マイル）。score は20のことで、「20が3つと10」という古い数え方です。",
        "続けて Can I get there by candle-light?（ろうそくをともすころまでに着ける？）とたずね、Yes, and back again.（着けるとも、帰ってもこられる）と答えます。疑問詞の質問には数で、Can の質問には Yes で。2種類の疑問文と、それぞれにふさわしい答え方が、たった4行に並んでいるのです。バビロンは古代の遠い都の名前ですが、この唄では子どもを夜の寝床へさそう、夢の中の遠い町として歌われてきました。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "How many miles is it to Babylon?—\nThreescore miles and ten.\nCan I get there by candle-light?—\nYes, and back again.\nIf your heels are nimble and light,\nYou may get there by candle-light.",
        ja: "バビロンまでは何マイル？\n70マイルさ。\nろうそくをともすころまでに着けるかな？\n着けるとも、帰ってもこられるよ。\n足どりが軽くてすばやければ、\nろうそくのころには着けるだろう。",
        cite: "Mother Goose, \"To Babylon\" (The Real Mother Goose, 1916)",
        source: "https://www.gutenberg.org/ebooks/10607",
      }],
      cliff: "では「だれが〜したの？」と、疑問詞そのものが主語になると、文はどう変わるでしょう？",
      figure: {
        type: "tree",
        title: "How ＋ 〜 と What ＋ 〜",
        root: {
          label: "後ろに語をつける疑問詞",
          tone: "navy",
          children: [
            {
              label: "How ＋形容詞",
              tone: "blue",
              children: [
                { label: "How many", sub: "数：〜s を続ける" },
                { label: "How much", sub: "値段・量" },
                { label: "How old", sub: "年れい・古さ" },
                { label: "How tall", sub: "身長・高さ" },
              ],
            },
            {
              label: "What ＋名詞",
              tone: "yellow",
              children: [
                { label: "What time", sub: "時刻" },
                { label: "What sport", sub: "何のスポーツ" },
                { label: "What color", sub: "何色" },
              ],
            },
          ],
        },
      },
    },
    {
      heading: "Who が主語になるとき",
      body: "「だれが〜しますか」と、疑問詞そのものが{{主語}}になるときは、do / does を使わず、{{疑問詞＋動詞}}の語順になります。Who は3人称単数あつかいなので、Who {{plays}} the piano? のように動詞に -s をつけます。答えは Ken does. のように「主語＋do / does」で短く答えます。",
      reading: [
        "Who plays the piano?（だれがピアノをひきますか）では、Who がそのまま{{主語}}です。「だれが」がわからないから Who を主語の席に置き、あとはふつうの文と同じ{{疑問詞＋動詞}}の順に並べます。do や does を足す必要はありません。Who は3人称単数あつかいなので、現在の文なら plays のように -s がつきます。答えは Ken does.（ケンです）のように、主語と do / does で短く返します。",
        "主語の Who を、短い詩でみごとに使った人がいます。19世紀イギリスの詩人{{クリスティナ・ロセッティ}}です。1872年に出した子どものための詩集『シング・ソング』の中に、Who has seen the wind?（だれが風を見たことがあるの？）という詩があります。has seen は「見たことがある」という3年生で習う形ですが、Who がそのまま主語の席にすわり、do も does も使っていないことに注目しましょう。",
        "答えは Neither I nor you（わたしも、あなたも見たことはない）。風は目に見えないからです。けれど、木の葉がふるえているとき、木々が頭を下げるとき、風はそこを通っている。だれも見たことがないものを、Who の問いで呼び出し、目に見える木の葉で答える。2つの連が you と I を入れかえて同じ形をくり返すので、声に出すと歌のように覚えられます。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "Who has seen the wind?\nNeither I nor you:\nBut when the leaves hang trembling\nThe wind is passing thro'.\nWho has seen the wind?\nNeither you nor I:\nBut when the trees bow down their heads\nThe wind is passing by.",
        ja: "だれが風を見たことがあるの？\nわたしも、あなたも見たことはない。\nけれど木の葉がふるえているとき、\n風はそこを通りぬけている。\nだれが風を見たことがあるの？\nあなたも、わたしも見たことはない。\nけれど木々が頭を下げるとき、\n風はそこを通りすぎている。",
        cite: "Christina Rossetti, \"Who has seen the wind?\", Sing-Song (1872)",
        source: "https://www.gutenberg.org/ebooks/76703",
      }],
      photos: [
        {
          src: `${C}/rossetti.webp`, width: 469, height: 600,
          alt: "黒っぽい服を着て、少し目をふせた女性の上半身の肖像画",
          caption: "クリスティナ・ロセッティ（1830〜1894年）。画家の兄ダンテ・ゲイブリエルが1877年にえがいた。{{Who}} has seen the wind? の作者。",
          credit: { author: "Dante Gabriel Rossetti", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Dante_Gabriel_Rossetti_-_Christina_Rossetti_(1877).jpg" },
        },
      ],
      cliff: "疑問詞を6つそろえると、何が見えてくるのでしょう？　いよいよ「召し使い」の正体です。",
    },
    {
      heading: "6人の召し使い：疑問詞で世界をたずねる",
      body: "{{What・Where・When・How・Why・Who}}の6つの疑問詞は、それぞれちがう種類の情報を連れてきます。6つをそろえると、ある出来事の全体がわかります。新聞やニュースの記事で使われる「{{5W1H}}」も、この考え方です。",
      reading: [
        "キプリングは、「ゾウの鼻が長いわけ」のすぐあとに、短い詩をそえました。「わたしは正直な召し使いを6人かかえている。知っていることは、みんな彼らが教えてくれた」。その名前は What と Where と When、そして How と Why と Who。そう、召し使いの正体は{{疑問詞}}です。",
        "詩の後半で、キプリングは「わたしは9時から5時まで召し使いを休ませる」と言います。ところが、ある「小さな人」は1000万人の召し使いをかかえていて、少しも休ませない。その内わけは、How が100万人、Where が200万人、そして Why が700万人。目をさました瞬間から質問ばかりしている子どものすがたが、ゾウの子にそのまま重なります。",
        "6つの疑問詞をそろえると、出来事の全体が見えます。だれが（Who）、何を（What）、いつ（When）、どこで（Where）、なぜ（Why）、どのように（How）。日本でも「{{5W1H}}」とよばれ、新聞記事の書き方や、調べ学習・報告書の基本になっています。英語の疑問詞を覚えることは、世界の調べ方を身につけることでもあるのです。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "I keep six honest serving-men:\n(They taught me all I knew)\nTheir names are What and Where and When\nAnd How and Why and Who.\nI send them over land and sea,\nI send them east and west;\nBut after they have worked for me,\nI give them all a rest.",
        ja: "わたしは正直な召し使いを6人かかえている。\n（知っていることは、みんな彼らが教えてくれた）\nその名は「何」と「どこ」と「いつ」\nそれに「どうやって」と「なぜ」と「だれ」。\n陸をこえ、海をこえて、使いに出す。\n東へも西へも、使いに出す。\nけれど、わたしのために働いてくれたあとは、\nみんなに休みをあげるのだ。",
        cite: "Rudyard Kipling, \"I Keep Six Honest Serving-Men\", Just So Stories (1902)",
        source: "https://www.gutenberg.org/ebooks/2781",
      }],
      photos: [
        {
          src: `${C}/kipling.webp`, width: 800, height: 1065,
          alt: "丸めがねをかけ、口ひげをたくわえた男性の白黒の肖像写真",
          caption: "ラドヤード・{{キプリング}}（1865〜1936年）。『なぜなに物語』（1902年）で、疑問詞を「6人の召し使い」にたとえる詩を書いた。",
          credit: { author: "Elliott & Fry", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Rudyard_Kipling_(portrait).jpg" },
        },
      ],
      reveal: "6人の召し使いの正体は、{{What・Where・When・How・Why・Who}}の6つの疑問詞です。疑問詞の質問には Yes か No では答えられず、相手は必ず{{中身}}を答えます。しかも6人は、物・場所・時・方法・理由・人と、それぞれちがう種類の情報を取ってくる係です。だから6人を「陸にも海にも」使いに出せば、どんな出来事でも全体がわかる。ゾウの子が What 1つで世界を知ったように、疑問詞は知識を連れてくる召し使いなのです。",
    },
  ],
  story: {
    kind: "novel",
    title: "七百万人のなぜ",
    paragraphs: [
      "1902年の秋、イングランド南部の港町。十一歳のネリーは、学校でも家でも「なぜ」ばかり言う子だった。なぜ潮は引くの。なぜカモメは船を追いかけるの。母さんはいつも「ネリー、口を閉じて手を動かしなさい」と言った。",
      "誕生日に、おばあちゃんが一冊の新しい本をくれた。『なぜなに物語』。その夜、ネリーはランプの下で、知りたがりのゾウの子の話を読んだ。ワニは夕ごはんに何を食べるの、とたずねただけで、親せき中からおしりをたたかれるゾウの子。ネリーは思わず自分のおしりをさすった。けれどゾウの子は聞くのをやめず、大きな川まで答えを探しに行き、長い鼻を手に入れて帰ってくる。",
      "話のあとに、短い詩があった。六人の召し使い。名前は What と Where と When、How と Why と Who。そして、小さな人は一千万人の召し使いを休ませず、そのうち七百万人が Why だという。ネリーは声を出して笑った。「七百万人の Why。これ、わたしだ」",
      "次の土曜日、市場で、小さな男の子が魚の木箱の前で泣いていた。ネリーはしゃがんで聞いた。「迷子なの？」男の子はうなずいた。「おうちは近く？」首を横にふる。「お母さんと来たの？」また首をふる。それきり、話はちっとも進まない。{{Yes か No で答える質問}}では、答えも Yes か No しか返ってこないのだ。",
      "ネリーは、ゆうべの詩を思い出した。六人の召し使いを、一人ずつ使いに出してみよう。「What's your name?」「……トム」。「Who came here with you?」「おじいちゃん」。「Where is your grandpa now?」トムは港のほうを指さした。「青いボート」。名前、人、場所。{{疑問詞}}の質問をするたびに、トムの口から、新しい{{中身}}がひとつずつ出てきた。",
      "二人は手をつないで桟橋を歩き、青いボートの上で網をつくろっていた老人を見つけた。トムが走り出すと、老人は網を放り出して孫をだきあげた。何度もお礼を言われて、ネリーはほおを赤くした。",
      "帰り道、ネリーはエプロンのポケットから鉛筆を出し、紙切れに六つの言葉を書いた。What、Where、When、How、Why、Who。家に着くと、母さんが言った。「どこまで行ってたの、ネリー」。ネリーはにっこりした。「市場と、港。あとで全部話すね。だれが、どこで、なぜ、どうやって、ぜんぶ」",
    ],
    note: "ネリー、トム、おばあちゃんと母さん、市場と港の場面、会話や心情はすべて創作です。キプリングの『なぜなに物語』（Just So Stories）が1902年に出版されたこと、「ゾウの鼻が長いわけ」の筋書き、そのあとに「6人の正直な召し使い」の詩（1000万人の召し使いと700万の Why をふくむ）がそえられていることは事実・原作にもとづいています。作中の英語の質問は、この単元のために作った文です。",
  },
  mistakes: [
    { wrong: "Where you live?", right: "Where do you live?", why: "疑問詞のあとはふつうの疑問文の語順。一般動詞なら do / does が必要。" },
    { wrong: "Where do you live? — Yes, I do.", right: "I live in Osaka.", why: "疑問詞の質問には Yes / No で答えず、たずねられた中身を答える。" },
    { wrong: "How many book do you have?", right: "How many books do you have?", why: "How many のあとの数えられる名詞は複数形にする。" },
    { wrong: "Who does play the piano?", right: "Who plays the piano?", why: "Who が主語のときは does を使わず、動詞に -s をつける。" },
  ],
  check: [
    { q: "___ is your birthday? — It's May 5.", a: "When", why: "日付（時）を答えているので When。" },
    { q: "___ pens do you have? — I have three.", a: "How many", why: "数を答えているので How many。後ろの pens は複数形。" },
    { q: "He lives in Kyoto. の下線部 in Kyoto をたずねる文にしましょう。", a: "Where does he live?", why: "場所なので Where。主語が he なので does を使い、live は原形にもどす。" },
  ],
  next: [
    { label: "4択ドリル「疑問詞」に挑戦", href: "/learn/eibunpo-chu/j-en-1-gimonshi" },
    { label: "前の単元「代名詞」のレクチャー", href: "/learn/lecture/j-en-1-daimeishi" },
    { label: "つぎに「命令文」", href: "/learn/eibunpo-chu/j-en-1-meirei" },
  ],
};
