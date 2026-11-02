import type { Lecture } from "../types";

const C = "/media/commons/j-en-1-can";

export const J_EN_1_CAN: Lecture = {
  unit: "j-en-1-can",
  title: "can は動詞の前に置いて「できる」。あとの動詞はいつも原形",
  hook: "「泳げる」「ピアノがひける」「この部屋を使ってもいい？」。できること・してもよいかを伝える言い方は、自己紹介にも頼みごとにも使います。can は動詞に意味をそえる{{助動詞}}の最初の1つで、ここでのルールは中2で習う will や must にもそのまま通じます。",
  mystery: "英語の動詞は、主語が he なら plays のように s がつきます。ところが400年前のシェイクスピアの詩でも、150年前のアリスの物語でも、can だけは決して cans になりません。しかも can のあとの動詞は、なぜいつも原形なのでしょう？",
  mission: {
    from: "英語の名作朗読ラジオ番組のパーソナリティ",
    request: "来週の放送で、シェイクスピアの詩と『不思議の国のアリス』の一節を朗読します。ところが中学1年生のリスナーから「He cans swim. と書いたらバツになった。plays には s がつくのに、なぜ can はだめなの？」というおたよりが届き、番組でどう答えればいいか迷っています。400年前の詩にも出てくる can のなぞを、名探偵のあなたに解き明かしてほしいのです。",
    thanks: "can はもともと「知っている」という意味の、過去形の形をした特別な動詞だったのですね。過去形に s がつかないのと同じで can にも s がつかず、あとには昔から to のない動詞が続く。これで放送で、リスナーに胸を張って答えられます。",
  },
  sections: [
    {
      heading: "can は動詞の前。動詞は原形にもどす",
      body: "「〜できる」は、動詞の前に{{can}}を置きます。can のあとの動詞は、主語が何であっても{{原形}}です。He plays → He can play のように、三単現の s はとれます。can 自体の形も変わらず、cans とはなりません。",
      reading: [
        "「〜できる」と言いたいとき、英語では動詞の前に{{can}}を置きます。I swim.（私は泳ぎます）が I can swim.（私は泳げます）になるように、can は動詞に「できる」という意味をそえる係です。このように動詞を助ける語を{{助動詞}}といいます。大切なのは、can のあとの動詞がいつも{{原形}}になることです。He plays the piano. に can を入れると He can play the piano.。plays の s は消え、can 自身も cans にはなりません。主語が I でも she でも my parents でも、形は「can＋原形」のひとつだけです。",
        "この形が400年以上前から変わっていないことを、シェイクスピアの詩で確かめてみましょう。『ハムレット』や『ロミオとジュリエット』で知られるシェイクスピアは、14行の恋の詩{{ソネット}}も154編書き、1609年にロンドンで1冊の本として出版されました。その18番は Shall I compare thee to a summer's day?（君を夏の日にたとえようか）と始まり、夏はすぐに過ぎ去るけれど、君の美しさはこの詩の中で永遠に生き続ける、と歌います。",
        "最後の2行を見てください。So long as men can breathe, or eyes can see（人が息をし、目がものを見られるかぎり）。men can breathe、eyes can see と、{{can＋原形}}が2回くり返されます。続く So long lives this では、主語の this（この詩）に合わせて lives と s がついていますが、can のほうは形が変わりません。人間に「できる」ことが続くかぎり、詩も生き続ける。実際、400年後の私たちが今この詩を読んでいるのですから、この約束は守られているのです。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "So long as men can breathe, or eyes can see,\nSo long lives this, and this gives life to thee.",
        ja: "人が息をし、目がものを見ることができるかぎり、\nこの詩は生き続け、そしてこの詩が君に命を与え続ける。",
        cite: "William Shakespeare, Sonnet 18 (1609)",
        source: "https://www.gutenberg.org/ebooks/1041",
      }],
      figure: {
        type: "formula",
        title: "He plays the guitar. に can を入れる",
        prose: true,
        steps: [
          { expr: "He {{plays}} the guitar.", note: "ふつうの文：三単現の s" },
          { expr: "He {{can play}} the guitar.", note: "can＋原形（s はとる）" },
          { expr: "He {{can't}} play the guitar.", note: "否定文：cannot / can't" },
          { expr: "{{Can}} he play the guitar?", note: "疑問文：Can を主語の前へ" },
          { expr: "— Yes, he {{can}}. / No, he {{can't}}.", note: "答えも can で" },
        ],
        note: "否定はふつう cannot と1語で書く。短縮形は can't。",
      },
      photos: [
        {
          src: `${C}/sonnets-1609.webp`, width: 800, height: 1154,
          alt: "古びた紙に、飾り模様の下で SHAKE-SPEARES SONNETS と大きく印刷された本の表紙。下に AT LONDON と 1609 の文字",
          caption: "1609年にロンドンで出た『シェイクスピアのソネット集』の表紙。Neuer（Never）のように当時は v の代わりに u を使った。18番の{{can＋原形}}もこの本にのる。",
          credit: { author: "William Shakespeare", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Sonnets1609titlepage.jpg" },
        },
        {
          src: `${C}/printer-1568.webp`, width: 754, height: 972,
          alt: "木の印刷機のそばで、男たちが刷り上がった紙を取り出し、インクをつけている白黒の版画。奥では職人が活字を拾っている",
          caption: "1568年にドイツで出た本の木版画にえがかれた印刷所。奥で職人が活字を1字ずつ拾い、手前で紙を刷る。シェイクスピアのソネット集もこうした手作業で刷られた。",
          credit: { author: "Jost Amman", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Printer_in_1568-ce.png" },
        },
      ],
      cliff: "では「〜できない」「〜できる？」と言うとき、can はどう動くのでしょう？",
    },
    {
      heading: "否定文・疑問文で do / does は使わない",
      body: "can の文の否定文・疑問文は、be動詞の文と同じように{{can そのものを動かします}}。否定は can のあとに not（cannot / can't）、疑問は Can を主語の前に出します。do や does はいっしょに使いません。疑問詞を使うときは、{{What can you 〜?}}のように疑問詞を文の最初に置きます。",
      reading: [
        "can の文を否定文にするときは、can のあとに not を置きます。ふつうは2語に分けず{{cannot}}と1語で書き、話すときは短縮形の{{can't}}をよく使います。疑問文は、{{Can を主語の前}}に出すだけです。You can swim. → Can you swim?。答えるときも Yes, I can. / No, I can't. と can を使います。一般動詞の文のような do や does は出てきません。can 自身が「動く係」を引き受けているので、do の出番がないのです。be動詞の文と同じ動き方だと考えると覚えやすいでしょう。",
        "can't が名場面を作っている作品が、ルイス・キャロルの『{{不思議の国のアリス}}』（1865年）です。作者の本名はチャールズ・ドジソン。イギリスのオックスフォード大学で数学を教える先生でした。1862年の夏、知り合いの少女たちとボートで川をのぼったとき、せがまれてその場で語ったお話がもとになっています。子どもの本といえば教訓を教えるものだった時代に、言葉遊びとさかさまの理屈で、ただ「おもしろい」ための物語を書いたことで、児童文学の歴史を変えたといわれます。",
        "体が大きくなったり小さくなったりしたアリスは、キノコの上のイモムシに「おまえはだれだ」と聞かれ、こう答えます。I can't explain myself（自分のことを説明できないんです）、because I'm not myself（だって私、私じゃないんですもの）。イモムシに「わからん」と言われると、I can't put it more clearly（これ以上はっきり言えません）、I can't understand it myself（自分でもわからないんです）と、{{can't＋原形}}が3回も続きます。「できない」を重ねるほど、アリスのとまどいが伝わってくるのです。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "\"I can't explain myself, I'm afraid, sir,\" said Alice, \"because I'm not myself, you see.\"\n\"I don't see,\" said the Caterpillar.\n\"I'm afraid I can't put it more clearly,\" Alice replied very politely, \"for I can't understand it myself to begin with …\"",
        ja: "「すみません、自分のことを説明できないんです」とアリスは言った。「だって、私、私じゃないんですもの」\n「わからんな」とイモムシは言った。\n「これ以上はっきりとは言えないんです」とアリスはとてもていねいに答えた。「そもそも、自分でもわからないんですもの……」",
        cite: "Lewis Carroll, Alice's Adventures in Wonderland, Chapter V (1865)",
        source: "https://www.gutenberg.org/ebooks/11",
      }],
      photos: [
        {
          src: `${C}/caterpillar.webp`, width: 800, height: 1069,
          alt: "大きなキノコの上で水パイプをくわえたイモムシを、キノコのふちからのぞきこむ少女の白黒の挿絵",
          caption: "『不思議の国のアリス』初版（1865年）のテニエルの挿絵。キノコの上のイモムシとアリス。この場面でアリスは{{can't}}を3回くり返す。",
          credit: { author: "Sir John Tenniel", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Alice_05a-1116x1492.jpg" },
        },
      ],
      cliff: "ところで can の意味は「できる」だけではありません。主語しだいで、意味ががらりと変わります。",
    },
    {
      heading: "can の3つの意味",
      body: "can の中心は{{能力}}の「〜できる」です。ほかに、{{Can I 〜?}}で「〜してもいいですか」と{{許可}}を求め、{{Can you 〜?}}で「〜してくれますか」と{{依頼}}する言い方もあります。主語が I か you かで意味が分かれる、と覚えましょう。",
      reading: [
        "can の中心の意味は{{能力}}の「〜できる」ですが、使う場面によって意味が広がります。{{Can I 〜?}}は「私は〜できますか」から「〜してもいいですか」と{{許可}}を求める言い方に、{{Can you 〜?}}は「あなたは〜できますか」から「〜してくれますか」と{{依頼}}する言い方になります。Can I use your pen?（ペンを使ってもいい？）、Can you open the window?（窓を開けてくれる？）。教室でもお店でも、毎日のように使われる表現です。",
        "じつは昔の英語の先生は、Can I go out? と聞いた生徒に「行く力はあるでしょう。許可なら May I? と言いなさい」と言い返すことがよくあったといいます。許可の may のほうがていねいだとされていたからです。けれど今の会話では、Can I 〜? はごく自然な言い方として広く使われています。言葉の使い方も、時代とともに少しずつ変わっていくのです。",
        "能力の can を、とびきりゆかいに使った場面が、続編『{{鏡の国のアリス}}』（1871年）にあります。白の女王に「わたくしは101歳と5か月と1日」と言われたアリスは、とても信じられません。女王に「もう一度やってごらん」とすすめられると、アリスは笑って one can't believe impossible things（ありえないことは信じられません）と答えます。one は「人はだれでも」という意味です。すると女王は、それは練習が足りないだけ、と言い返します。「できない」は練習すれば「できる」になる。女王のへりくつは、can の{{能力}}の意味をさかさまから照らしています。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "Alice laughed. \"There's no use trying,\" she said: \"one can't believe impossible things.\"\n\"I daresay you haven't had much practice,\" said the Queen. \"When I was your age, I always did it for half-an-hour a day. Why, sometimes I've believed as many as six impossible things before breakfast.\"",
        ja: "アリスは笑った。「やってもむだです」とアリスは言った。「ありえないことなんて、信じられませんもの」\n「練習が足りないのでしょう」と女王は言った。「わたくしがあなたの年のころは、毎日30分は練習したものよ。そうね、朝ごはんの前に、ありえないことを6つも信じたことだってあるわ」",
        cite: "Lewis Carroll, Through the Looking-Glass, Chapter V (1871)",
        source: "https://www.gutenberg.org/ebooks/12",
      }],
      figure: {
        type: "tree",
        title: "can の意味の分かれ方",
        root: {
          label: "can",
          children: [
            { label: "能力", sub: "〜できる", tone: "blue", children: [{ label: "I can swim." }] },
            { label: "許可", sub: "Can I 〜?", tone: "yellow", children: [{ label: "Can I sit here?" }] },
            { label: "依頼", sub: "Can you 〜?", tone: "red", children: [{ label: "Can you help me?" }] },
          ],
        },
      },
      photos: [
        {
          src: `${C}/white-queen.webp`, width: 800, height: 1200,
          alt: "王冠をかぶり白い布をまとった、髪のみだれた女王の髪を、青い服にエプロン姿の少女が整えている色つきの挿絵",
          caption: "『鏡の国のアリス』のテニエルの挿絵（のちに色をつけたもの）。白の女王の髪をアリスが整える場面。このあと2人は、何が信じ{{られる}}かで言い合う。",
          credit: { author: "Sir John Tenniel", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Alice_with_White_Queen_(Illustration_by_John_Tenniel).png" },
        },
      ],
      cliff: "では Can you 〜? と頼まれたら、Yes, I can. と答えればよいのでしょうか？",
    },
    {
      heading: "Can I 〜? / Can you 〜? への答え方",
      body: "許可や依頼の質問には、Yes, you can. よりも{{Sure.}}（いいですよ）や{{OK.}}がよく使われます。ことわるときは{{Sorry, 〜.}}と理由をそえるとていねいです。「できるか」をたずねる質問には Yes, I can. / No, I can't. と can で答えます。",
      reading: [
        "「できますか」という能力の質問には、Yes, I can. / No, I can't. と can で答えます。ところが、Can you help me?（手伝ってくれる？）という依頼に Yes, I can. と返すと、「はい、私には手伝う能力があります」と少しずれた答えに聞こえます。依頼や許可には{{Sure.}}（いいよ）、{{OK.}}、No problem.（問題ないよ）などがよく使われます。ことわるときは{{Sorry,}}のあとに I'm busy now.（今いそがしいの）のように理由をそえると、相手をがっかりさせすぎません。",
        "can't は歌の題名にもよく登場します。1964年にビートルズが発表した Can't Buy Me Love は「お金で愛は買えない」という意味の題名で、主語を省いて can't から始まる、話し言葉そのままの形です。1961年にエルビス・プレスリーが歌った Can't Help Falling in Love（好きにならずにいられない）も、can't help 〜ing で「〜せずにいられない」という表現です。「can't＋動詞」の短い形はリズムに乗せやすく、気持ちをはっきり言い切れるので、20世紀のポップスで好まれました。",
      ],
      figure: {
        type: "compare",
        title: "質問の種類と返し方",
        columns: [{ title: "能力の質問" }, { title: "許可・依頼", tone: "yellow" }],
        rows: [
          { label: "例", cells: ["Can you swim?", "Can I use this pen?"] },
          { label: "はい", cells: ["Yes, I can.", "Sure. / OK."] },
          { label: "いいえ", cells: ["No, I can't.", "Sorry, I'm using it."] },
        ],
      },
      cliff: "それにしても、なぜ can だけは s がつかないのでしょう。答えは1000年前の英語にあります。",
    },
    {
      heading: "can のふるさとは「知っている」",
      body: "can は、1000年ほど前の英語で「{{知っている}}」を意味した動詞から生まれました。もとは{{過去形の形}}をした特別な動詞だったので、過去形と同じく主語が he でも s がつきません。あとに続く動詞も、昔から to のない形で、それが今の{{原形}}です。",
      reading: [
        "can のふしぎを解くかぎは、1000年ほど前の英語（{{古英語}}）にあります。当時の can は cunnan という動詞の形のひとつで、「{{知っている}}」「やり方を知っている」という意味でした。泳ぎ方を知っている人は泳げる。そこから「〜できる」の意味が育ちました。know（知っている）とは遠い親せきの語で、ドイツ語でも können（できる）と kennen（知っている）が兄弟のような関係です。",
        "しかも cunnan は、ふつうの動詞とつくりがちがっていました。もとは「知るようになった」という{{過去形の形}}を、「今、知っている」という意味で使う、少し変わった動詞だったのです。英語の過去形には、もともと he のときの語尾がつきません。今でも He played. や He sang. に s がつかないのと同じです。そのため can も、1000年前から he can のままでした。",
        "また、can のような語のあとには、昔から to のつかない動詞の形が続く決まりでした。その形の語尾はやがて消え、今の{{原形}}になりました。シェイクスピアの時代には、親しい相手を指す thou（君）には thou canst と語尾がつきましたが、he cans という形は生まれませんでした。ちなみに can の過去形 could の l は、would や should に形をそろえて15〜16世紀ごろに書き加えられた文字で、発音はしません。",
      ],
      figure: {
        type: "flow",
        title: "can の意味の移り変わり",
        steps: [
          { label: "cunnan", sub: "知っている（約1000年前）", tone: "plain" },
          { label: "やり方を知っている", sub: "泳ぎ方を知っている", tone: "blue" },
          { label: "can", sub: "〜できる（今）", tone: "yellow" },
        ],
        note: "過去形の形をした動詞だったので、主語が he でも s がつかない。",
      },
      reveal: "can の正体は、1000年前の「知っている」という動詞でした。もとが{{過去形の形}}をした特別な動詞なので、He played. に s がつかないのと同じく、主語が he でも cans にはなりません。そしてあとには昔から to のない動詞が続く決まりで、その形が今の{{原形}}です。シェイクスピアの men can breathe も、アリスの I can't explain も、1000年続くこのルールの上にあるのです。",
    },
  ],
  story: {
    kind: "novel",
    title: "息をするかぎり",
    sayFix: { "植字": "しょくじ", "活字": "かつじ", "鉛": "なまり" },
    paragraphs: [
      "1609年の初夏、ロンドン。印刷所の見習いハリーは、十三歳になったばかりだった。朝から晩まで、木の箱に仕分けられた鉛の活字を指でつまんでは、手のひらほどの金属の枠に一字ずつ並べていく。並べる字は上下さかさまで、そのうえ鏡に映したように左右も逆だ。最初のひと月は、b と d、p と q の見分けだけで泣きそうになった。",
      "「今日はおまえにも、ひとつ組ませてやる」。職人のネッドが、原稿の束から一枚をぬき出した。「芝居書きの詩人の、恋の詩だ。疫病で芝居小屋が閉まってるあいだに、こういう本が出るのさ」。紙には、細い字で十四行の詩が書かれていた。",
      "ハリーは一行ずつ小声で読みながら、活字を拾った。Shall I compare thee to a summer's day? 君を夏の日にたとえようか。夏の日はすぐに終わる。風はつぼみをゆらし、太陽はかげる。けれど君の夏は終わらない――。最後の二行にさしかかったところで、ハリーの指が止まった。",
      "「So long as men can breathe, or eyes can see……ネッド、ここ、おかしくない？　次の行は this lives で、ちゃんと s がついてる。でも、もし主語が a man だったら、a man cans breathes になるの？」",
      "ネッドは鼻で笑った。「ならん。can はだれが主語でも can だ。あとの breathe も、そのまんまだ」。「なんで？」。「うちのじいさまは、字の読めるやつのことを『あいつは字を can しとる』と言った。字を知ってる、って意味さ。can は昔は『知ってる』だったんだ。泳ぎ方を知ってるやつは泳げる。それで『できる』になった。……なんで s がつかんのかまでは、おれも知らん。昔からそういうもんだ」",
      "ハリーは、次の行の lives を組むために u の活字をつまんだ。この店では、言葉のまんなかの v は u で組む。So long liues this。人が息をできるかぎり、目が見えるかぎり、この詩は生きる。「ずいぶん大きく出たもんだ」とネッドが言った。「紙なんぞ、百年もすりゃぼろぼろだ」",
      "ハリーは組み上がった行を指でなぞった。さかさまの鏡文字の can が二つ、ろうそくの光をにぶく返している。紙がぼろぼろになっても、だれかがこの二行を声に出して読むかぎり――。「ネッド。この詩、まちがってないと思う」。それから四百年あまり。人は今も、息をしながらこの二行を読み、目で見ている。",
    ],
    note: "見習いのハリーと職人のネッド、2人の会話と心情は創作です。1609年にロンドンでシェイクスピアのソネット集（154編）が刷られて出版されたこと、当時は活字を手で1字ずつ組んだこと、言葉のなかの v を u で表す綴り（liues）、そのころ疫病でたびたび劇場が閉じられたこと、can が古くは「知っている」の意味だったことは事実にもとづきます。作中の英文は18番の実際の詩句（パブリックドメイン）です。",
  },
  mistakes: [
    { wrong: "She can speaks English.", right: "She can speak English.", why: "can のあとの動詞は、主語が3人称単数でも原形です。" },
    { wrong: "Do you can swim?", right: "Can you swim?", why: "can の疑問文は Can を主語の前に出します。do は使いません。" },
    { wrong: "Ken cans play tennis.", right: "Ken can play tennis.", why: "can 自体に s はつきません。" },
    { wrong: "I can't not ski.", right: "I can't ski.", why: "can't の中に not が入っているので、not は1回だけです。" },
  ],
  check: [
    { q: "My brother cooks curry. を「〜できる」の文に。", a: "My brother can cook curry.", why: "can を入れ、cooks を原形 cook にもどす。" },
    { q: "Can your sister ride a bike? に「いいえ」で答えると？", a: "No, she can't.", why: "your sister は she にかえ、can で答える。" },
    { q: "「窓を開けてくれますか」と頼むとき、文の最初の2語は？", a: "Can you", why: "依頼は Can you 〜?（Can you open the window?）。" },
  ],
  next: [
    { label: "4択ドリル「助動詞 can」に挑戦", href: "/learn/eibunpo-chu/j-en-1-can" },
    { label: "前の単元「命令文」のレクチャー", href: "/learn/lecture/j-en-1-meirei" },
    { label: "中2「助動詞」（must・may・should など）", href: "/learn/eibunpo-chu/j-en-2-jodoshi" },
  ],
};
