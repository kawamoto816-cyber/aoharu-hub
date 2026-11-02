import type { Lecture } from "../types";

const C = "/media/commons/j-en-1-meishi";

export const J_EN_1_MEISHI: Lecture = {
  unit: "j-en-1-meishi",
  title: "英語は名詞の「数」を気にする。1つなら a / an、2つ以上なら -s",
  hook: "日本語では「ねこがいる」と言えば1ぴきでも3びきでも通じますが、英語では a cat か cats かを必ず言い分けます。英語は名詞の数をとても気にすることばです。数えられる名詞・数えられない名詞の区別と、複数形・冠詞のルールをまとめておさえましょう。",
  mystery: "『不思議の国のアリス』で帽子屋は、「きらきら星」の替え歌を Like a tea-tray in the sky.（空に浮かぶお盆みたい）と歌います。お盆も空も1つなのに、なぜ a tea-tray と the sky で、前につくことばがちがうのでしょう？",
  mission: {
    from: "市立科学館のプラネタリウム解説員",
    request: "冬の特別番組で、英語の歌「きらきら星」と、その替え歌が出てくる『不思議の国のアリス』を紹介します。ところがリハーサルを見た小学生に「お盆も空も1つなのに、どうして a と the がちがうの？」と聞かれ、答えにつまってしまいました。番組の台本を仕上げるために、名探偵のあなたに a と the のなぞを解いてほしいのです。",
    thanks: "a は「たくさんある中の、どれか1つ」、the は「だれもがどれのことか分かるもの」だったのですね。番組では、ドームいっぱいに広がる夜空を指して「これが世界に1つの the sky です」と、胸を張って紹介できます。",
  },
  sections: [
    {
      heading: "数えられる名詞と数えられない名詞",
      body: "名詞は、1つ・2つと{{数えられる名詞}}と、{{数えられない名詞}}に分かれます。dog や book のように形がはっきりしたものは数えられます。water や milk のような決まった形のないもの、music や love のような目に見えないもの、Japan や Ken のような1つしかない名前は数えられません。数えられない名詞には a / an をつけず、複数形にもしません。",
      figure: {
        type: "tree",
        title: "名詞を2つに分ける",
        root: {
          label: "名詞",
          tone: "navy",
          children: [
            {
              label: "数えられる",
              tone: "blue",
              children: [
                { label: "1つ", sub: "a dog / an apple" },
                { label: "2つ以上", sub: "dogs / apples", tone: "yellow" },
              ],
            },
            {
              label: "数えられない",
              tone: "red",
              children: [
                { label: "形がない", sub: "water / milk" },
                { label: "目に見えない", sub: "music / love" },
                { label: "名前", sub: "Japan / Ken" },
              ],
            },
          ],
        },
      },
      reading: [
        "名詞を数えられるかどうかは、「1つ、2つと区切れるか」で決まります。dog（犬）や book（本）には、1ぴき・1冊というはっきりした区切りがあります。ところが water（水）は、コップの水を半分に分けても、やっぱり水のままです。milk（牛乳）・rice（米）・paper（紙）なども同じで、区切りのないものは{{数えられない名詞}}になります。music（音楽）・love（愛）・information（情報）のような目に見えないもの、Japan や Ken のように1つしかない名前も、ふつう数えません。",
        "では、数えられない名詞の量はどう言うのでしょう。英語では、入れものや単位のほうを数えます。a glass of water（コップ1杯の水）、two cups of tea（カップ2杯の紅茶）、a piece of paper（紙1枚）のように、数が変わるのは glass や cup で、water や tea の形は変わりません。量をばくぜんと言うなら some water（いくらかの水）です。日本語の「1杯・1枚・1本」という数え方のことばと、よく似たしくみですね。",
        "この区別が胸にせまる名作があります。1798年、イギリスの詩人コールリッジが友人ワーズワースと出した詩集にのせた長い物語詩『老水夫の歌』です。航海の途中、ひとりの水夫が船についてきたアホウドリを射ち落としてしまいます。やがて風がぴたりとやみ、船は焼けつく太陽の下で何日も動けなくなりました。見わたすかぎり水なのに、塩からい海の水は飲めません。Water, water, every where（水、水、どこもかしこも水）の water は{{数えられない名詞}}で、どこまでも広がる水のかたまりです。一方 drop（しずく）は{{数えられる名詞}}で、Nor any drop to drink は「飲める水は一滴もない」。果てしない水と、たったひとしずくの対比が、のどの渇きを読む人に伝えるのです。every where は今の everywhere の古いつづりです。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "Water, water, every where,\nAnd all the boards did shrink;\nWater, water, every where,\nNor any drop to drink.",
        ja: "水、水、どこもかしこも水、\n船の板はみな、かわいてちぢんだ。\n水、水、どこもかしこも水、\nなのに、飲める水は一滴もない。",
        cite: "Samuel Taylor Coleridge, The Rime of the Ancient Mariner (1798)",
        source: "https://www.gutenberg.org/ebooks/151",
      }],
      photos: [
        {
          src: `${C}/mariner.webp`, width: 800, height: 1043,
          alt: "つららの下がった帆船の甲板で、厚着の水夫たちが船べりにとまった大きな白い鳥を囲んでいる版画",
          caption: "ドレが1876年の版のためにえがいた『老水夫の歌』の版画「アホウドリ」。このあと鳥を射ったことで、船は風のない海で動けなくなる。",
          credit: { author: "Gustave Doré", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Rime_of_the_Ancient_Mariner-Albatross-Dore.jpg" },
        },
      ],
      cliff: "では、数えられる名詞が2つ以上になると、形はどう変わるのでしょう？",
    },
    {
      heading: "複数形のつくり方",
      body: "数えられる名詞が2つ以上のときは{{複数形}}にします。ふつうは語尾に{{-s}}をつけますが、s・x・ch・sh で終わる語は{{-es}}、子音字＋y で終わる語は{{y を i にかえて -es}}です。man → men、child → children のように{{不規則に変わる}}語は1つずつ覚えます。",
      figure: {
        type: "compare",
        title: "語尾で決まる複数形のルール",
        columns: [{ title: "つけ方", tone: "yellow" }, { title: "例" }],
        rows: [
          { label: "ふつう", cells: ["-s", "book → books"] },
          { label: "s・x・ch・sh", cells: ["-es", "box → boxes"] },
          { label: "子音字＋y", cells: ["y → i ＋ -es", "city → cities"] },
          { label: "f・fe", cells: ["f(e) → v ＋ -es", "leaf → leaves"] },
          { label: "不規則", cells: ["形が変わる", "child → children"] },
        ],
        note: "母音字＋y は -s だけ（boy → boys）。fish・sheep は1つでも複数でも同じ形。",
      },
      reading: [
        "複数形の基本は、語尾に{{-s}}をつけることです。ただ、box（箱）に s だけをつけると「ボックスス」と音がつながって言いにくいので、間に e を入れて boxes（ボックスィズ）にします。s・x・ch・sh で終わる語が{{-es}}になるのはこのためです。city（町）のように子音字＋y で終わる語は cities、leaf（葉）は leaves となります。-s の音も3通りあり、books は「ス」、dogs は「ズ」、boxes は「イズ」と、前の音に合わせて言いやすい音に変わります。",
        "man → men、woman → women、foot → feet、tooth → teeth、mouse → mice、child → children のように{{不規則に変わる}}語もあります。でたらめに見えますが、じつは1000年以上前の英語のなごりです。昔の英語には、母音を変えて複数を表す語や、-en をつけて複数を表す語がたくさんありました。やがて -s 型が広まって多くは消えましたが、毎日使う身近なことばほど昔の形が残りました。ox（雄牛）→ oxen も同じ仲間です。fish・sheep・Japanese（日本人）は、1つでも複数でも形が変わりません。",
        "『宝島』（1883年）で知られるスコットランドの作家スティーヴンソンは、子どものころ体が弱く、ベッドで長い時間を過ごしました。その思い出をもとに1885年に出した詩集『子どもの詩の園』に、2行だけの詩「楽しい思い」があります。things（もの）と kings（王さま）は、どちらも{{複数形}}の -s で終わり、行の終わりの音がそろう韻をふんでいます。a number of things は「たくさんのもの」。世界にあふれるものも、幸せな王さまも、-s ひとつで「たくさん」になるのです。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "The world is so full of a number of things,\nI'm sure we should all be as happy as kings.",
        ja: "世界には、こんなにもたくさんのものがあふれている。\nだからきっと、わたしたちはみんな、王さまみたいに幸せになれるはず。",
        cite: "Robert Louis Stevenson, \"Happy Thought\", A Child's Garden of Verses (1885)",
        source: "https://www.gutenberg.org/ebooks/136",
      }],
      cliff: "1つのときにつける a。でも、an はどこから来たのでしょう？　じつは an のほうが古い形です。",
    },
    {
      heading: "a と an は「音」で選ぶ",
      body: "数えられる名詞が1つのときは前に{{a}}をつけます。ただし、次の語が{{母音の音}}で始まるときは{{an}}です。決め手は文字ではなく音なので、hour は h で始まっても「アワー」と母音で始まるので an hour、uniform は u で始まっても「ユー」と子音の音なので a uniform です。",
      figure: {
        type: "compare",
        title: "a か an か",
        columns: [{ title: "a（子音の音）", tone: "blue" }, { title: "an（母音の音）", tone: "yellow" }],
        rows: [
          { cells: ["a dog", "an apple"] },
          { cells: ["a uniform（ユー）", "an hour（アワー）"] },
          { cells: ["a big egg", "an egg"] },
        ],
        note: "a big egg のように形容詞が入ると、すぐ後ろの語（big）の音で決まる。",
      },
      reading: [
        "数えられる名詞が1つのときは、前に{{a}}をつけます。次の語が「ア・イ・ウ・エ・オ」に近い{{母音の音}}で始まるときは{{an}}にします。an apple、an egg、an orange です。決め手は文字ではなく音です。hour（1時間）や honest（正直な）は h で始まっても h を読まないので an hour、an honest boy。反対に uniform（制服）や university（大学）は u で始まっても「ユー」という子音の音で始まるので、a uniform、a university です。",
        "じつは an のほうが古い形です。1000年ほど前の英語では、an は one（1つ）と同じことばでした。それが子音の前では n が落ちて a になり、母音の前では言いやすいので an が残りました。a に「1つの」という意味があるのはこのためです。おもしろいことに、エプロン（apron）はもともと napron という語でした。a napron と an apron は耳で聞くと同じなので、区切りがずれて an apron になったのです。umpire（審判）も、もとは noumpere でした。",
        "物語の始まりにも a / an が活躍します。イギリスで200年以上歌いつがれてきた{{マザーグース}}の一つに、くつの家に住むおばあさんの唄があります。old の o は母音の音なので an old woman、shoe は子音の音なので a shoe。どちらも「ある1人の」「ある1つの」と、初めて話に登場するものを紹介しています。2行目の children は child の{{不規則に変わる}}複数形です。日本の昔話の「むかしむかし、あるところに、おじいさんが……」の「ある」と、よく似た働きですね。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "There was an old woman who lived in a shoe.\nShe had so many children she didn't know what to do.",
        ja: "むかし、くつの中に住むおばあさんがいた。\n子どもがあんまりたくさんいて、どうしたらいいのかわからなかった。",
        cite: "Mother Goose, \"There Was an Old Woman\" (The Real Mother Goose, 1916)",
        source: "https://www.gutenberg.org/ebooks/10607",
      }],
      photos: [
        {
          src: `${C}/old-woman-shoe.webp`, width: 800, height: 1130,
          alt: "森の中の大きな古いくつが家になっていて、入り口から子どもたちがぎっしり顔を出している色つきの絵",
          caption: "19世紀イギリスの子ども向け絵本にのった「くつに住むおばあさん」の絵。an old woman・a shoe と、初めて出てくるものに{{a / an}}がつく。",
          credit: { author: "Joseph Martin Kronheim", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Old_Woman_who_lived_in_a_shoe-Kronheim.jpg" },
        },
      ],
      cliff: "初めて出てきたら a。では2回目からは？　そして、空はなぜいつも the なのでしょう？",
    },
    {
      heading: "the は「どれのことか決まっている」とき",
      body: "{{the}}は、話し手と聞き手の両方が「どれのことか分かる」ときにつけます。一度話に出たものをもう一度言うとき、the sun のように{{1つしかないもの}}、play the piano のような楽器を演奏するときなどです。a は「ある1つ」、the は「その」という感じです。",
      figure: {
        type: "formula",
        title: "a から the へ",
        prose: true,
        steps: [
          { expr: "I have {{a}} dog.", note: "初めて話に出る：ある1ぴきの犬" },
          { expr: "{{The}} dog is white.", note: "2回目：さっきの「その」犬" },
          { expr: "Look at {{the}} sun.", note: "1つしかないもの" },
        ],
      },
      reading: [
        "{{the}}は、話し手と聞き手の両方が「どれのことか分かる」ものにつけます。I have a dog. で初めて話に出た犬は、2回目から The dog is white. になります。聞き手はもう「さっきの犬」と分かるからです。the sun（太陽）・the moon（月）・the world（世界）・the sky（空）・the sea（海）のように{{1つしかないもの}}も、言わなくてもどれか分かるので the です。the は、もともと that（あの・その）と同じ仲間のことばから生まれました。だから the には今も「その」という指さしの感じがあります。",
        "1865年、イギリスのオックスフォード大学で数学を教えていたルイス・キャロルは、知り合いの少女たちに川遊びのボートの上で語った即興のお話をもとに、『不思議の国のアリス』を出しました。第7章の「めちゃくちゃなお茶会」で、帽子屋は「きらきら星」の替え歌を歌います。もとの歌は1806年にジェーン・テイラーが書いた詩で、空の星をダイヤモンドにたとえていました。帽子屋はそれを、コウモリとお盆に変えてしまったのです。",
        "Like a tea-tray in the sky を見てみましょう。tea-tray（紅茶のお盆）は世の中にたくさんあり、どれか特定のお盆ではありません。だから「ある1つの」{{a}}。一方、sky（空）は見上げればだれにとっても同じ1つなので{{the}}。the world も同じです。冠詞は、聞き手の頭の中に「どれのことか、もう浮かんでいるか」を考えて選ぶことばです。日本語にはない、相手への心づかいが英語の文法に組みこまれているのです。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "Twinkle, twinkle, little bat!\nHow I wonder what you’re at!\n……\nUp above the world you fly,\nLike a tea-tray in the sky.\nTwinkle, twinkle—",
        ja: "きらきら光る、ちっちゃなコウモリ！\nいったい何をしているのかな！\n……\n世界の上を、高く飛ぶ、\n空に浮かんだお盆みたい。\nきらきら光る――",
        cite: "Lewis Carroll, Alice's Adventures in Wonderland, Chapter VII (1865)",
        source: "https://www.gutenberg.org/ebooks/11",
      }],
      photos: [
        {
          src: `${C}/tea-party.webp`, width: 800, height: 611,
          alt: "長いテーブルにティーカップが並び、少女と、ウサギと、大きな帽子の男がすわっているペン画",
          caption: "テニエルがえがいた『不思議の国のアリス』（1865年）の「めちゃくちゃなお茶会」。右の帽子屋が、Like a tea-tray in {{the}} sky と替え歌を歌う。",
          credit: { author: "John Tenniel", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Alice_par_John_Tenniel_25.png" },
        },
      ],
      reveal: "{{a}}は「たくさんある中の、どれか1つ」、{{the}}は「話し手も聞き手も、どれのことか分かるもの」につけます。お盆は世の中にいくらでもあるので a tea-tray。空は見上げればだれにとっても同じ1つなので the sky でした。数が1つかどうかではなく、聞き手が「どれか分かるか」で決まるのです。",
    },
  ],
  story: {
    kind: "manzai",
    title: "水を1つください",
    cast: ["リク", "ナナ"],
    lines: [
      { who: "リク", text: "どうもー、リクとナナです！　今日は英語の名詞をマスターしてきました！" },
      { who: "ナナ", text: "たのもしいね。じゃあ、のどがかわいたとき、英語でなんて言う？" },
      { who: "リク", text: "I want a water. 水を1つください！", say: "アイ・ウォント・ア・ウォーター。水をひとつください！" },
      { who: "ナナ", text: "水のどこで区切るの！　water は形が決まらない{{数えられない名詞}}。a はつけないで、a glass of water。", say: "水のどこで区切るの！ ウォーターは形が決まらない、数えられない名詞。アはつけないで、ア・グラス・オブ・ウォーター。" },
      { who: "リク", text: "コップを数えるのか。じゃあ海で遭難しても、Water, water, every where. 水だらけで安心だね。", say: "コップを数えるのか。じゃあ海で遭難しても、ウォーター、ウォーター、エブリ・ウェア。水だらけで安心だね。" },
      { who: "ナナ", text: "安心じゃない！　『老水夫の歌』では、海の水ばかりで、Nor any drop to drink。飲める水は一滴もないの。", say: "安心じゃない！ 老水夫の歌では、海の水ばかりで、ノア・エニー・ドロップ・トゥ・ドリンク。飲める水は一滴もないの。" },
      { who: "リク", text: "drop は数えられるんだね。じゃあ自己紹介。I have two dog.", say: "ドロップは数えられるんだね。じゃあ自己紹介。アイ・ハブ・トゥー・ドッグ。" },
      { who: "ナナ", text: "2ひきなら{{複数形}}！　two dogs。two があっても -s は省かない。", say: "2ひきなら複数形！ トゥー・ドッグズ。トゥーがあっても、エスは省かない。" },
      { who: "リク", text: "それと、two childs もいます。", say: "それと、トゥー・チャイルズもいます。" },
      { who: "ナナ", text: "子どもいるの!?　それに child は{{不規則に変わる}}語。children だよ。", say: "子どもいるの!? それにチャイルドは不規則に変わる語。チルドレンだよ。" },
      { who: "リク", text: "英語って気まぐれだなあ。" },
      { who: "ナナ", text: "気まぐれじゃなくて、昔の英語のなごり。man が men、foot が feet になるのも同じ仲間。", say: "気まぐれじゃなくて、昔の英語のなごり。マンがメン、フットがフィートになるのも同じ仲間。" },
      { who: "リク", text: "なるほど。じゃあ、待ち合わせは a hour 後で。", say: "なるほど。じゃあ、待ち合わせはア・アワー後で。" },
      { who: "ナナ", text: "an hour！　h は読まないから、{{母音の音}}で始まるの。a と an は文字じゃなくて音で選ぶ。", say: "アン・アワー！ エイチは読まないから、母音の音で始まるの。アとアンは文字じゃなくて音で選ぶ。" },
      { who: "リク", text: "じゃあ制服は an uniform だ。u は母音字だもん。", say: "じゃあ制服はアン・ユニフォームだ。ユーは母音字だもん。" },
      { who: "ナナ", text: "音を聞いて！　「ユー」は子音の音だから a uniform。", say: "音を聞いて！ ユーは子音の音だから、ア・ユニフォーム。" },
      { who: "リク", text: "よし、最後はアリスの替え歌で決める。Like the tea-tray in a sky!", say: "よし、最後はアリスの替え歌で決める。ライク・ザ・ティートレイ・イン・ア・スカイ！" },
      { who: "ナナ", text: "逆！　お盆はたくさんある中のどれか1つだから a tea-tray。空はだれにとっても1つだから{{the}} sky。", say: "逆！ お盆はたくさんある中のどれか1つだから、ア・ティートレイ。空はだれにとっても1つだから、ザ・スカイ。" },
      { who: "リク", text: "空ってたくさんあると思ってた。きのうの空、きょうの空、ナナと見た夕焼けの空……。" },
      { who: "ナナ", text: "詩人みたいなこと言わない！　だれもが「どれのことか分かる」ものに the をつけるの。" },
      { who: "リク", text: "わかった！　じゃあ最後に。The Nana is my best friend.", say: "わかった！ じゃあ最後に。ザ・ナナ・イズ・マイ・ベスト・フレンド。" },
      { who: "ナナ", text: "人の名前に the はつけない！　……親友はうれしいけど。もういいよ。" },
      { who: "リク", text: "どうも、ありがとうございました！" },
    ],
    note: "リクとナナは架空の人物で、会話はすべて創作です。『老水夫の歌』（コールリッジ、1798年）と『不思議の国のアリス』（ルイス・キャロル、1865年）の英文は原作にもとづいています。",
  },
  mistakes: [
    { wrong: "I have two dog.", right: "I have two dogs.", why: "2つ以上なら名詞を複数形にする。two があっても -s は省かない。" },
    { wrong: "a apple / a hour", right: "an apple / an hour", why: "次の語が母音の音で始まるときは an。hour の h は発音しない。" },
    { wrong: "I want a water.", right: "I want some water. / a glass of water", why: "water は数えられないので a をつけない。数えるときは容器を使う。" },
    { wrong: "citys / childs", right: "cities / children", why: "子音字＋y は y を i にかえて -es。child は不規則に変わる。" },
  ],
  check: [
    { q: "box の複数形は？", a: "boxes", why: "x で終わる語は -es をつける。" },
    { q: "___ orange の ___ に入るのは a と an のどちら？", a: "an", why: "orange は母音の音（オ）で始まる。" },
    { q: "I play ___ guitar. の ___ に入る語は？", a: "the", why: "楽器を演奏するときは the をつける。" },
  ],
  next: [
    { label: "4択ドリル「名詞の複数形と冠詞」に挑戦", href: "/learn/eibunpo-chu/j-en-1-meishi" },
    { label: "前の単元「一般動詞」のレクチャー", href: "/learn/lecture/j-en-1-ippan" },
    { label: "つぎに「代名詞」", href: "/learn/eibunpo-chu/j-en-1-daimeishi" },
  ],
};
