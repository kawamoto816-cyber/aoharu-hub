import type { Lecture } from "../types";

const C = "/media/commons/j-en-1-ippan";

export const J_EN_1_IPPAN: Lecture = {
  unit: "j-en-1-ippan",
  title: "一般動詞は動作を表す。主語が3人称単数なら -s、否定と疑問は do / does",
  hook: "I play soccer. や She likes music. のように、「する・好きだ」など動作や気持ちを表す動詞を一般動詞といいます。英語の文のほとんどは一般動詞の文なので、ここで「-s がつくとき」と「do / does の使い方」をつかむことが、この先の文法すべての土台になります。",
  mystery: "1611年の英語の聖書には He maketh me ……（主はわたしを〜させる）と、動詞のしっぽが -eth の文があります。同じころのシェイクスピアは one man plays many parts と -s。英語は I play / you play / they play と形を変えないのに、なぜ he / she / it のときだけ、動詞にしっぽがつくのでしょう？",
  mission: {
    from: "市立図書館の司書（英語の名作朗読会の担当）",
    request: "来月、図書館で英語の名作を声に出して読む朗読会を開きます。予習に来た中学1年生に「聖書は maketh、シェイクスピアは plays。なんで he のときだけしっぽがつくの？」と聞かれ、答えにつまってしまいました。朗読会の始めに、このなぞの答えを紹介したいのです。名探偵のあなたに、三単現の s のなぞを解いてほしいのです。",
    thanks: "-s は、昔の英語がもっていたたくさんの語尾の、ただ1つの生き残りだったのですね。朗読会では maketh と makes を読みくらべて、英語の千年の旅を紹介します。",
  },
  sections: [
    {
      heading: "be動詞の文と一般動詞の文",
      body: "英語の文の動詞は、{{be動詞}}か{{一般動詞}}のどちらかです。be動詞は「＝・いる」、一般動詞は play・like・have など「する・思う・持つ」といった動作や状態を表します。1つの文に動詞は基本1つなので、{{I am play}} のように be動詞と一般動詞を並べることはできません。",
      reading: [
        "英語の文には、かならず動詞が1つあります。動詞は大きく2つに分かれます。am・are・is の{{be動詞}}は「〜である・〜にいる」と、主語と説明をイコールでつなぐ動詞です。それ以外の play（する）・like（好きだ）・have（持っている）・see（見る）などはまとめて{{一般動詞}}とよばれ、動作や気持ち・状態を表します。am も play も、文の中心にある「動詞の席」にすわります。席は1つなので、I am play tennis. のように2つを並べることはできません。",
        "2種類の動詞の使い分けを、詩の中で味わってみましょう。『宝島』や『ジキル博士とハイド氏』で知られるスコットランドの作家スティーヴンソンは、1885年に子どものための詩集『子どもの詩の園』を出しました。その中の「ぼくの影」は、どこへでもついてくる自分の影をふしぎがる子どもの詩です。He is very, very like me from the heels up to the head; / And I see him jump before me, when I jump into my bed.（あいつは、かかとから頭のてっぺんまで、ぼくにそっくり。ぼくがベッドにとびこむと、あいつがぼくの前でとびはねるのが見える）",
        "1行目は is を使い、「あいつ＝ぼくにそっくり」と{{be動詞}}で説明しています。2行目は see（見る）・jump（とぶ）という{{一般動詞}}で、目の前で起きる動きをえがいています。説明の文と、動きの文。2種類の動詞を交互に使うことで、影は遊び相棒のように動き出します。英語の文のほとんどは、こうした一般動詞の文です。",
      ],
      photos: [
        {
          src: `${C}/stevenson.webp`, width: 800, height: 1068,
          alt: "口ひげをたくわえ、髪を横に分けた細身の男性が、少し身を乗り出してほほえむ白黒の肖像写真",
          caption: "ロバート・ルイス・スティーヴンソン（1850〜1894年）。『宝島』の作者で、詩集『子どもの詩の園』（1885年）では、{{be動詞}}と{{一般動詞}}を使い分けて子どもの目に映る世界をえがいた。",
          credit: { author: "Henry Walter Barnett", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Robert_Louis_Stevenson_by_Henry_Walter_Barnett_bw.jpg" },
        },
      ],
      figure: {
        type: "compare",
        title: "be動詞の文と一般動詞の文",
        columns: [{ title: "be動詞の文", tone: "blue" }, { title: "一般動詞の文", tone: "yellow" }],
        rows: [
          { label: "肯定", cells: ["I am a student.", "I play tennis."] },
          { label: "否定", cells: ["I am not ～.", "I do not play ～."] },
          { label: "疑問", cells: ["Are you ～?", "Do you play ～?"] },
          { label: "答え", cells: ["Yes, I am.", "Yes, I do."] },
        ],
      },
      cliff: "では、同じ play が plays に変わるのは、どんなときでしょう？",
    },
    {
      heading: "主語が「3人称単数」なら動詞に -s",
      body: "主語が I・you 以外の{{1人・1つ}}（he・she・it・Ken・my dog など）を{{3人称単数}}といいます。現在の文で主語が3人称単数のとき、一般動詞の終わりに {{-s か -es}} をつけます。これを「三単現の s」といいます。they や Ken and Mari は複数なので -s はつけません。",
      reading: [
        "一般動詞の現在の文では、主語によって動詞の形が変わることがあります。話し手の I を1人称、聞き手の you を2人称、それ以外の人や物を3人称といいます。3人称のうち、1人・1つのものが{{3人称単数}}です。he・she・it はもちろん、Ken・my sister・the cat・this book もすべて3人称単数です。このとき動詞の終わりに -s をつけ、Ken plays soccer.（ケンはサッカーをする）のようにします。これが「{{三単現の s}}」（3人称・単数・現在の s）です。",
        "注意したいのは「単数」のところです。we・they・Ken and Mari は、3人称でも2人以上なので複数です。だから They play soccer. と、-s はつけません。動詞の小さな s は、主語が1人なのか、何人もいるのかを教えてくれるしるしなのです。",
        "このちがいが1つの文の中に並ぶ名ぜりふがあります。シェイクスピアが1599年ごろに書いた喜劇『お気に召すまま』で、森にくらす皮肉屋のジェイクイズが語る All the world’s a stage（世界はすべて舞台）です。They have their exits and their entrances（人はみな退場し、登場する）の主語は複数の they なので have。続く one man in his time plays many parts（ひとりの人間は一生のうちに多くの役を演じる）の主語は one man なので plays です。人の一生を7つの幕の芝居にたとえたこのせりふは、今も演説や本の題名に引用されています。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "All the world’s a stage,\nAnd all the men and women merely players;\nThey have their exits and their entrances,\nAnd one man in his time plays many parts,\nHis acts being seven ages.",
        ja: "世界はすべて、ひとつの舞台。\n男も女も、みな役者にすぎない。\nだれもが退場し、また登場する。\nそしてひとりの人間は、一生のうちに多くの役を演じる。\nその芝居は、7つの年代の幕からなる。",
        cite: "William Shakespeare, As You Like It, Act 2, Scene 7 (c. 1599)",
        source: "https://www.gutenberg.org/ebooks/1523",
      }],
      photos: [
        {
          src: `${C}/first-folio.webp`, width: 780, height: 958,
          alt: "広い額に大きな白いえりの服を着た男性の、細い線で彫られた版画の肖像",
          caption: "シェイクスピアの肖像。死後の1623年に仲間の俳優たちがまとめた劇の全集（ファースト・フォリオ）の表紙にのった版画。『お気に召すまま』もこの全集で初めて出版された。",
          credit: { author: "Martin Droeshout", license: "CC0", licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en", source: "https://commons.wikimedia.org/wiki/File:Title_Page_-_Shakespeare_First_Folio_(1623),_title_page_-_BL_(cropped).jpg" },
        },
      ],
      figure: {
        type: "tree",
        title: "動詞に -s をつけるか決める",
        root: {
          label: "主語",
          children: [
            { label: "I / you", sub: "1人称・2人称", children: [{ label: "play", tone: "blue" }] },
            {
              label: "それ以外",
              children: [
                { label: "1人・1つ", sub: "he / she / it / Ken", children: [{ label: "plays", tone: "yellow" }] },
                { label: "2人・2つ以上", sub: "we / they / Ken and I", children: [{ label: "play", tone: "blue" }] },
              ],
            },
          ],
        },
      },
      cliff: "-s のつけ方は1つではありません。watchs と書くと、なぜだめなのでしょう？",
    },
    {
      heading: "-s のつけ方には3つのきまりがある",
      body: "ふつうは{{そのまま -s}}（play → plays）です。s・x・sh・ch・o で終わる語は{{-es}}（watch → watches、go → goes）。「子音字＋y」で終わる語は{{y を i にかえて -es}}（study → studies）です。have だけは形が変わって{{has}} になります。",
      reading: [
        "-s のつけ方は、発音のしやすさから決まっています。ふつうは like → likes のように{{そのまま -s}}です。s・x・sh・ch・o で終わる語は、watch → watches、wash → washes、go → goes のように{{-es}}をつけます。watchs では「チ」と「ス」がぶつかって言いにくいので、あいだに母音をはさんで「ウォッチズ」と読むのです。「子音字＋y」で終わる study は{{y を i にかえて -es}}、studies になります。play のように「母音字＋y」ならそのまま plays。そして have だけは特別で、{{has}}に形が変わります。",
        "-s のついた動詞が続けて出てくる詩を読んでみましょう。アメリカの詩人エミリー・ディキンソン（1830〜1886年）は、マサチューセッツ州アマーストの家でほとんどの時を過ごしながら、およそ1800編の詩を書きました。生きているあいだに発表されたのは10編ほどで、多くは亡くなったあと、1890年代に詩集として出版されて評判になりました。1891年の詩集に収められた「希望」は、目に見えない希望を、心にすむ小鳥にたとえた短い詩です。",
        "主語は Hope（希望）。1つなので3人称単数です。だから動詞は perches（とまる）・sings（歌う）・stops（やむ）と、すべてに -s がつきます。perch は ch で終わるので{{-es}}、sing と stop はそのまま -s。声に出すと「パーチズ」「スィングズ」「スタップス」と、-s の音もそれぞれちがいます。3つの -s が、小鳥が休まず歌い続けるようすを、今まさに起きていることとしてえがいているのです。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "us",
        text: "Hope is the thing with feathers\nThat perches in the soul,\nAnd sings the tune without the words,\nAnd never stops at all,",
        ja: "希望とは、羽をもつもの。\n魂にとまって、\nことばのない歌をうたい、\nけっして、やむことがない。",
        cite: "Emily Dickinson, \"Hope\" (Poems, Second Series, 1891)",
        source: "https://www.gutenberg.org/ebooks/12242",
      }],
      photos: [
        {
          src: `${C}/dickinson.webp`, width: 617, height: 765,
          alt: "髪を真ん中で分けた若い女性が、白いえりの黒っぽい服でいすにすわり、手に小さな花を持っている古い写真",
          caption: "17歳ごろのエミリー・ディキンソン（1848年ごろの銀板写真）。詩「希望」では、主語の Hope に合わせて perches・sings・stops と{{三単現の s}}が続く。",
          credit: { author: "作者不明", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Emily_Dickinson_daguerreotype_(Restored).jpg" },
        },
      ],
      figure: {
        type: "compare",
        title: "三単現の -s のつけ方",
        columns: [{ title: "語の終わり" }, { title: "つけ方", tone: "yellow" }, { title: "例" }],
        rows: [
          { cells: ["ふつうの語", "-s", "like → likes"] },
          { cells: ["s・x・sh・ch・o", "-es", "watch → watches"] },
          { cells: ["子音字＋y", "y→i＋es", "study → studies"] },
          { cells: ["母音字＋y", "-s", "play → plays"] },
          { cells: ["have", "形が変わる", "have → has"] },
        ],
      },
      cliff: "では「〜しない」「〜しますか？」と言うとき、その -s はどこへ行くのでしょう？",
    },
    {
      heading: "否定文・疑問文は do / does を使う",
      body: "一般動詞の否定文は動詞の前に{{do not（don't）}}、疑問文は文の頭に{{Do}} を置きます。主語が3人称単数なら do のかわりに {{does}} を使います。このとき -s は does が引き受けるので、あとの動詞は{{もとの形（原形）}}にもどします。",
      reading: [
        "一般動詞の否定文は、動詞の前に{{do not（don't）}}を置きます。I like cats. → I do not like cats.（私はネコが好きではありません）。疑問文は文の頭に{{Do}}を出して Do you like cats?（ネコは好きですか）とし、答えは Yes, I do. / No, I don't. です。be動詞の文のように、主語と動詞の順番を入れかえるのではありません。do は「手伝い役」として前に出てくるのです。",
        "主語が3人称単数なら、do のかわりに{{does}}を使います。does は do に -es がついた形です。つまり三単現の s は does のほうに移ったので、あとの動詞は{{原形}}にもどります。Ken plays tennis. → Ken does not play tennis. / Does Ken play tennis? 「-s は1つの文に1回だけ」と覚えておきましょう。",
        "イギリスの伝承童謡マザーグースに、I do not like thee, Doctor Fell; で始まる4行の唄があります。thee は昔の英語で「あなたを」。理屈ぬきの「なんとなく苦手」を歌った唄で、17世紀のオックスフォードの学生が、学寮長のフェル博士について即興で作ったと伝えられます。シェイクスピアのころは I know not（私は知らない）のように do を使わない否定もよく使われましたが、やがて do not＋原形 の形がふつうになりました。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "I do not like thee, Doctor Fell;\nThe reason why I cannot tell;\nBut this I know, and know full well,\nI do not like thee, Doctor Fell!",
        ja: "きらいなんだ、フェル先生。\nそのわけは、うまく言えない。\nでも、これだけはわかる、よくわかってる。\nきらいなんだ、フェル先生！",
        cite: "Mother Goose, \"Doctor Fell\" (The Real Mother Goose, 1916)",
        source: "https://www.gutenberg.org/ebooks/10607",
      }],
      figure: {
        type: "formula",
        title: "Ken plays tennis. を書きかえる",
        prose: true,
        steps: [
          { expr: "Ken {{plays}} tennis.", note: "肯定文：3人称単数なので -s" },
          { expr: "Ken {{does not play}} tennis.", note: "否定文：does not＋原形（doesn't）" },
          { expr: "{{Does}} Ken {{play}} tennis?", note: "疑問文：Does を文の頭へ、動詞は原形" },
          { expr: "— Yes, he {{does}}. / No, he {{doesn't}}.", note: "答えも does で" },
        ],
        note: "-s は1つの文に1回だけ。does を使ったら動詞の -s は消える。",
      },
      cliff: "それにしても、なぜ he / she / it のときだけ、動詞に s がつくのでしょう？",
    },
    {
      heading: "三単現の s は、昔の英語の「生き残り」",
      body: "昔の英語では、動詞は主語ごとにちがう語尾をもっていました（thou lovest、he {{loveth}} など）。やがて3人称単数の語尾は北部のことばの {{-s}} におきかわり、ほかの語尾はすり減って消えました。三単現の s は、その{{ただ1つの生き残り}}です。",
      reading: [
        "英語は I play、you play、they play と、主語がだれでもほとんど形が変わりません。なのに、なぜ he・she・it のときだけ -s がつくのでしょう。答えは英語の長い歴史の中にあります。",
        "千年ほど前の古い英語では、動詞は主語によって何種類もの語尾をもっていました。シェイクスピアのころにもその名ごりがあり、I love（私は愛する）、thou lovest（おまえは愛する）、he {{loveth}}（彼は愛する）のように、主語ごとに語尾がちがいました。thou は、今の you にあたる親しい呼びかけの語です。1611年、国王ジェームズ1世の命令で完成した英訳聖書、いわゆる{{欽定訳聖書}}は、このあらたまった -eth の形で書かれています。He maketh me to lie down in green pastures の maketh は、今の英語なら makes です。",
        "一方、イングランド北部の話しことばでは、3人称単数の語尾は早くから -s でした。この -s が少しずつ南へ広がり、シェイクスピアの劇には plays のような -s の形と、hath（has の古い形）のような -th の形が両方出てきます。17世紀のうちに、ふだんのことばでは -s がふつうになりました。そのあいだに thou は使われなくなり、ほかの人称の語尾もすり減って消えていきました。does も同じ仲間で、古い形は doth です。",
        "欽定訳聖書の英語は、その後300年以上読みつがれ、英語を話す人々の耳に深く残りました。he loveth と he loves を読みくらべると、三単現の小さな s の向こうに、千年分の英語の旅が見えてきます。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "The LORD is my shepherd; I shall not want.\nHe maketh me to lie down in green pastures: he leadeth me beside the still waters.",
        ja: "主はわたしの羊かい。わたしには、足りないものがない。\n主はわたしを緑の牧草地に休ませ、静かな水のほとりへと連れていく。",
        cite: "The Holy Bible, King James Version, Psalm 23:1–2 (1611)",
        source: "https://www.gutenberg.org/ebooks/8019",
      }],
      photos: [
        {
          src: `${C}/kjv-1611.webp`, width: 800, height: 1251,
          alt: "中央の白い枠に THE HOLY BIBLE の大きな文字、そのまわりに聖書の人物がたくさん彫られた古い本の扉",
          caption: "{{欽定訳聖書}}の初版（1611年）の扉。下に ANNO DOM. 1611 とある。本文は he maketh・he leadeth のように、3人称単数の動詞を -eth で書いている。",
          credit: { author: "Church of England", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:KJV-King-James-Version-Bible-first-edition-title-page-1611.jpg" },
        },
      ],
      figure: {
        type: "compare",
        title: "動詞の語尾は、どう変わった？",
        columns: [{ title: "1600年ごろ", tone: "blue" }, { title: "今の英語", tone: "yellow" }],
        rows: [
          { label: "私", cells: ["I love", "I love"] },
          { label: "あなた", cells: ["thou lovest", "you love"] },
          { label: "彼・彼女", cells: ["he loveth / loves", "he loves"] },
          { label: "do", cells: ["he doth / does", "he does"] },
        ],
      },
      reveal: "昔の英語の動詞は、主語ごとに thou lovest・he loveth のような語尾をもっていました。3人称単数の語尾は、1611年の聖書では -eth でしたが、北部のことばの -s がしだいに広がって maketh は makes に、doth は does になりました。ほかの語尾は消え、最後に残ったのが3人称単数の -s です。he のときだけしっぽがつくのは、それが英語の豊かな語尾の{{ただ1つの生き残り}}だからなのです。",
    },
  ],
  story: {
    kind: "manzai",
    title: "希望はいくつ？",
    cast: ["タクミ", "ユイ"],
    lines: [
      { who: "タクミ", text: "どうもー、タクミとユイです！　今日は英語の詩を朗読してきました！" },
      { who: "ユイ", text: "いいね。どんな詩？" },
      { who: "タクミ", text: "Hope is the thing with feathers / That perches in the soul. ……でもこの詩、まちがいだらけだよ。", say: "ホープ・イズ・ザ・シング・ウィズ・フェザーズ、ザット・パーチズ・イン・ザ・ソウル。……でもこの詩、まちがいだらけだよ。" },
      { who: "ユイ", text: "どこが！　ディキンソンの名作だよ。" },
      { who: "タクミ", text: "perches、sings、stops。ぜんぶ -s がついてる。希望が何こもあるってことでしょ？", say: "パーチズ、スィングズ、スタップス。ぜんぶエスがついてる。希望がなんこもあるってことでしょ？" },
      { who: "ユイ", text: "逆！　主語の Hope は1つ。主語が{{3人称単数}}だから、動詞に -s がつくの。これが{{三単現の s}}。", say: "ぎゃく！ 主語のホープはひとつ。主語が三人称単数だから、動詞にエスがつくの。これが三単現のエス。" },
      { who: "タクミ", text: "名詞の「たくさん」の s とは別物なんだ。じゃあ I plays tennis. は？", say: "名詞の、たくさんのエスとは別物なんだ。じゃあ、アイ・プレイズ・テニスは？" },
      { who: "ユイ", text: "I は1人称！　-s がつくのは、I と you 以外の{{1人・1つ}}のときだけ。", say: "アイは一人称！ エスがつくのは、アイとユー以外の、ひとり・ひとつのときだけ。" },
      { who: "タクミ", text: "じゃあ Ken and Mari plays soccer. 2人とも I じゃないし。", say: "じゃあ、ケン・アンド・マリ・プレイズ・サッカー。ふたりともアイじゃないし。" },
      { who: "ユイ", text: "2人いたら複数！　they と同じで play のまま。", say: "ふたりいたら複数！ ゼイと同じで、プレイのまま。" },
      { who: "タクミ", text: "わかった。作文も書いたよ。My brother studys English. つづりは s・y・s でかんぺき！", say: "わかった。作文も書いたよ。マイ・ブラザー・スタディーズ・イングリッシュ。つづりは、エス、ワイ、エスでかんぺき！" },
      { who: "ユイ", text: "かんぺきじゃない！　「子音字＋y」は{{y を i にかえて -es}}。studies だよ。", say: "かんぺきじゃない！ 子音字プラスワイは、ワイをアイにかえてイーエス。スタディーズだよ。" },
      { who: "タクミ", text: "じゃあ疑問文。Does he likes cats? 念のため、s を2つにしといた。", say: "じゃあ疑問文。ダズ・ヒー・ライクス・キャッツ？ ねんのため、エスをふたつにしといた。" },
      { who: "ユイ", text: "念を入れなくていい！　does の中に -s が入ってるから、あとの動詞は{{原形}}。Does he like cats? だよ。", say: "ねんを入れなくていい！ ダズの中にエスが入ってるから、あとの動詞は原形。ダズ・ヒー・ライク・キャッツ？ だよ。" },
      { who: "タクミ", text: "s は1つの文に1回だけ、か。じゃあ聖書の He maketh は？　s がなくて eth って書いてある。印刷ミス？", say: "エスは、ひとつの文に一回だけ、か。じゃあ聖書のヒー・メイケスは？ エスがなくて、イーティーエイチって書いてある。いんさつミス？" },
      { who: "ユイ", text: "ミスじゃない！　1611年の英語では、3人称単数の語尾は -eth。北のほうの -s が広まって、今の makes になったの。", say: "ミスじゃない！ せんろっぴゃくじゅういちねんの英語では、三人称単数の語尾はイーティーエイチ。北のほうのエスが広まって、今のメイクスになったの。" },
      { who: "タクミ", text: "昔は thou lovest みたいに、主語ごとにしっぽがあったんだっけ。", say: "むかしは、ザウ・ラヴェストみたいに、主語ごとにしっぽがあったんだっけ。" },
      { who: "ユイ", text: "そう。ほかのしっぽは消えて、ただ1つ生き残ったのが三単現の s。" , say: "そう。ほかのしっぽは消えて、ただひとつ生き残ったのが、三単現のエス。" },
      { who: "タクミ", text: "なるほど。じゃあ最後に、ユイにひとこと。I do not like thee, Doctor Fell.", say: "なるほど。じゃあ最後に、ユイにひとこと。アイ・ドゥ・ノット・ライク・ジー、ドクター・フェル。" },
      { who: "ユイ", text: "{{do not＋原形}}の否定文、形はかんぺき。……って、だれがフェル先生よ！", say: "ドゥ・ノット、プラス原形の否定文、形はかんぺき。……って、だれがフェル先生よ！" },
      { who: "タクミ", text: "わけは言えないけど、なんとなく。" },
      { who: "ユイ", text: "マザーグースのとおりにしなくていいの！　もういいよ。" },
      { who: "タクミ", text: "どうも、ありがとうございました！" },
    ],
    note: "タクミとユイは架空の人物で、会話はすべて創作です。英文はディキンソンの詩「希望」（1891年の詩集）、欽定訳聖書（1611年）、マザーグース「フェル先生」の原文にもとづいています。",
  },
  mistakes: [
    { wrong: "She doesn't likes cats.", right: "She doesn't like cats.", why: "does を使ったら、あとの動詞は原形にもどします。-s は does が引き受けています。" },
    { wrong: "I am play the piano.", right: "I play the piano.", why: "be動詞と一般動詞は並べません。一般動詞の文に am は入りません。" },
    { wrong: "Ken and Mari plays soccer.", right: "Ken and Mari play soccer.", why: "主語は2人（複数）なので -s はつけません。" },
    { wrong: "My brother studys English.", right: "My brother studies English.", why: "「子音字＋y」で終わる語は y を i にかえて -es をつけます。" },
  ],
  check: [
    { q: "My mother (have) a car. の（ ）を正しい形に。", a: "has", why: "主語は3人称単数。have は has になる。" },
    { q: "Tom watches TV. を否定文にしましょう。", a: "Tom doesn't (does not) watch TV.", why: "does not＋原形。watches は watch にもどす。" },
    { q: "Does your sister play the guitar? に No で答えましょう。", a: "No, she doesn't.", why: "does でたずねられたら does で答える。your sister は she にかえる。" },
  ],
  next: [
    { label: "4択ドリル「一般動詞」に挑戦", href: "/learn/eibunpo-chu/j-en-1-ippan" },
    { label: "前の単元「be動詞」のレクチャー", href: "/learn/lecture/j-en-1-be" },
    { label: "つぎに「過去形」", href: "/learn/eibunpo-chu/j-en-1-kakokei" },
  ],
};
