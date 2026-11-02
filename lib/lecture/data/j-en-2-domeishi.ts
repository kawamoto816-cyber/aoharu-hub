import type { Lecture } from "../types";

const C = "/media/commons/j-en-2-domeishi";

export const J_EN_2_DOMEISHI: Lecture = {
  unit: "j-en-2-domeishi",
  title: "動名詞は -ing で「〜すること」。enjoy や前置詞のあとは -ing",
  hook: "「サッカーをするのが好き」「ピアノをひき終えた」「来てくれてありがとう」。英語では、動詞に -ing をつけて「〜すること」という名詞のかたまりにできます。これが動名詞です。不定詞と同じ「〜すること」でも、動詞によってどちらを使うかが決まっているので、そこが大きなポイントです。",
  mystery: "アメリカの作家ソローのエッセイ『散歩』は、題名が WALKING（動名詞）なのに、最初の一文は I wish to speak ……（不定詞）で始まります。どちらも「〜すること」なのに、なぜ同じ1ページの中で形がちがうのでしょう？",
  mission: {
    from: "市立図書館の司書（英米文学の読書会の係）",
    request: "来月の読書会で、ソローの『散歩』を原文で少しずつ読みます。下見に来た中学生に「題名は Walking なのに、1行目は wish to speak。同じ『〜すること』なら、どっちでもいいんじゃないの？」と聞かれ、答えにつまってしまいました。参加者に配る手引きにきちんと説明を書くために、名探偵のあなたに -ing と to のなぞを解いてほしいのです。",
    thanks: "形を決めていたのは作家の気分ではなく、すぐ前にある語（wish か、前置詞の of か）だったのですね。手引きに「-ing か to かは、前の語を見て決まる」と大きく書いておきます。",
  },
  sections: [
    {
      heading: "動詞の -ing 形が「〜すること」になる",
      body: "動名詞は{{動詞の -ing 形}}で、「〜すること」という{{名詞のはたらき}}をします。名詞と同じように、文の主語、動詞の目的語、be動詞のあと（補語）、前置詞のあとに置けます。形は進行形の -ing と同じですが、be動詞といっしょに「〜している」となっているかどうかで見分けます。",
      reading: [
        "swim（泳ぐ）は動作を表す動詞ですが、-ing をつけた swimming は「泳ぐこと」という、ものごとの名前になります。これが{{動名詞}}です。名前になったので、名詞と同じ場所に入れます。Swimming is fun.（泳ぐことは楽しい）なら{{主語}}、I like swimming.（泳ぐことが好き）なら目的語、My hobby is swimming.（私の趣味は泳ぐことです）なら補語です。swimming in the sea（海で泳ぐこと）のように、うしろに語がついて長いかたまりになっても、全体で1つの名詞として働きます。",
        "動名詞が主語になった英文の名品を1つ見てみましょう。書いたのは、19世紀アメリカの思想家エマソン（1803〜1882年）です。ボストン近くの小さな町コンコードに住み、各地で講演をして「人は世間のまねをせず、自分の内なる声を信じよ」と説きました。1841年の本『エッセイ集』に収められた「自己信頼」は、アメリカ人の生き方に大きな影響を与え、今も卒業式のスピーチなどでよく引用されます。",
        "その中に Travelling is a fool's paradise.（旅することは、愚か者の楽園だ）という一文があります。主語の Travelling が動名詞です。「旅に出さえすれば、別の自分になれる」と夢見ても、どこへ行っても自分自身はついてくる、とエマソンは言います。わずか5語。動名詞を主語にすると、「旅すること」というものごと全体を1つの名前でとらえ、ずばりと言い切れるのです。主語の動名詞は1つのことなので、be動詞は{{is}}になる点にも注目しましょう。",
      ],
      photos: [
        {
          src: `${C}/emerson.webp`, width: 452, height: 723,
          alt: "黒い上着に蝶ネクタイをつけ、横を向いて遠くを見る、やせた中年の男性の白黒写真",
          caption: "エマソン（1857年ごろ）。講演と文章で「自分を信じよ」と説いた。「自己信頼」には、動名詞 Travelling を主語にした一文がある。",
          credit: { author: "User:Scewing (derivative work)", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Ralph_Waldo_Emerson_ca1857_retouched.jpg" },
        },
      ],
      recite: [{
        lang: "en", voice: "male", accent: "us",
        text: "Travelling is a fool’s paradise. Our first journeys discover to us the indifference of places.",
        ja: "旅することは、愚か者の楽園だ。はじめての旅で、わたしたちは思い知る。場所がどこであろうと、たいしたちがいはないのだと。",
        cite: "Ralph Waldo Emerson, \"Self-Reliance\", Essays: First Series (1841)",
        source: "https://www.gutenberg.org/ebooks/2944",
      }],
      figure: {
        type: "compare",
        title: "動名詞が入る場所",
        columns: [{ title: "例文", tone: "yellow" }, { title: "意味" }],
        rows: [
          { label: "主語", cells: ["{{Swimming}} is fun.", "泳ぐことは楽しい"] },
          { label: "目的語", cells: ["I like {{reading}}.", "読むことが好き"] },
          { label: "補語", cells: ["My hobby is {{cooking}}.", "趣味は料理すること"] },
          { label: "前置詞の後", cells: ["Thank you for {{coming}}.", "来てくれてありがとう"] },
        ],
        note: "主語の動名詞は1つのことなので、be動詞は is（Swimming is ...）。",
      },
      cliff: "「〜すること」を表す形は、もう1つあります。どちらを使うかは、だれが決めるのでしょう？",
    },
    {
      heading: "動名詞だけをとる動詞、不定詞だけをとる動詞",
      body: "{{enjoy・finish・stop}} などは、あとに{{動名詞だけ}}をとります。反対に {{want・hope・decide}} などは{{不定詞（to ＋ 原形）だけ}}です。{{like・start・begin}} などは、どちらをとってもほぼ同じ意味になります。enjoy は「楽しむこと」、finish は「終えること」のように、すでにしている・したことに目を向ける動詞は動名詞、これからのことに向かう動詞は不定詞、と考えると覚えやすくなります。",
      reading: [
        "「〜すること」は、不定詞（to ＋ 原形）でも表せます。ただし、目的語にするときは、前の動詞によって使える形が決まっています。I enjoyed talking with her.（彼女と話すのを楽しんだ）、I finished writing the report.（レポートを書き終えた）のように、{{enjoy・finish・stop}}のあとは動名詞だけ。I want to go to Hokkaido.（北海道に行きたい）、I hope to see you again.（また会えるといいな）のように、{{want・hope・decide・wish}}のあとは不定詞だけです。like・start・begin は、どちらでもほぼ同じ意味になります。",
        "見分けのこつは「時の向き」です。楽しむ・終える・やめるのは、実際にしている、またはしていたことです。だから「している最中」を感じさせる -ing と相性がよいのです。一方、望む・願う・決めるのは、まだしていない、これからのこと。to には「〜のほうへ向かう」という感じがあり、未来に向かう動詞と結びつきます。stop talking（話すのをやめる）と stop to talk（話すために立ち止まる）で意味が変わるのも、この向きのちがいです。",
        "エマソンの年下の友人に、同じコンコードで生まれた作家ソロー（1817〜1862年）がいます。ソローは毎日、何時間も森や野原を歩くことを何よりの楽しみにしていました。その考えを講演で語り、のちにエッセイ『散歩』（WALKING）にまとめます。最初の一文は I wish to speak a word for Nature ……（私は自然のために、ひとこと話したいのです）。{{wish}}は「これから」に向かう動詞なので、あとは to speak です。続く to regard（〜とみなすこと）も不定詞で、これから語る主張を力強く掲げています。",
      ],
      photos: [
        {
          src: `${C}/thoreau.webp`, width: 800, height: 1072,
          alt: "あごの下にひげをたくわえ、黒い上着を着た男性の古い肖像写真",
          caption: "ソロー（1856年、ダゲレオタイプ写真）。エッセイ『散歩』の1行目は、これからの思いを I {{wish to}} speak と不定詞で語る。",
          credit: { author: "Benjamin D. Maxham", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Benjamin_D._Maxham_-_Henry_David_Thoreau_-_Restored.jpg" },
        },
      ],
      recite: [{
        lang: "en", voice: "male", accent: "us",
        text: "I wish to speak a word for Nature, for absolute Freedom and Wildness, as contrasted with a freedom and culture merely civil,—to regard man as an inhabitant, or a part and parcel of Nature, rather than a member of society.",
        ja: "私は自然のために、ひとこと話したいのです。町の暮らしだけの自由や文化に対して、まったくの自由と野生のために。人間を社会の一員としてではなく、自然に住むもの、自然の一部としてとらえるために。",
        cite: "Henry David Thoreau, \"Walking\" (1862)",
        source: "https://www.gutenberg.org/ebooks/1022",
      }],
      figure: {
        type: "tree",
        title: "あとに続く形で動詞を分ける",
        root: {
          label: "「〜すること」が続く動詞",
          children: [
            { label: "動名詞だけ", sub: "-ing", tone: "yellow", children: [{ label: "enjoy / finish", sub: "stop など" }] },
            { label: "不定詞だけ", sub: "to ＋ 原形", tone: "blue", children: [{ label: "want / hope", sub: "decide など" }] },
            { label: "どちらも", sub: "意味はほぼ同じ", tone: "plain", children: [{ label: "like / start", sub: "begin など" }] },
          ],
        },
        note: "stop ～ing は「〜するのをやめる」。stop to ～ は「〜するために立ち止まる」で意味が変わる。",
      },
      cliff: "では、題名の WALKING のほうは？　実は、その少しあとに答えの手がかりがあります。",
    },
    {
      heading: "前置詞のあとの動詞は必ず -ing",
      body: "at・for・about・of・in などの{{前置詞のあと}}に動詞を置くときは、必ず{{動名詞}}にします。不定詞（to ＋ 原形）や原形はおけません。be good at 〜ing（〜するのが得意）、Thank you for 〜ing（〜してくれてありがとう）、How about 〜ing?（〜するのはどうですか）は決まった言い方として覚えましょう。",
      reading: [
        "前置詞は、名詞の前に置いて場所や時や関係を表す語です。だから前置詞のあとに動詞を置きたいときは、動詞を名詞の形、つまり{{動名詞}}にしなければなりません。I am good at swimming.（泳ぐのが得意です）、Thank you for helping me.（手伝ってくれてありがとう）、How about going to the park?（公園に行くのはどう？）。at swim や for to help とは言えません。to ＋ 原形は、前置詞のあとには置けないのです。",
        "ソローは1845年の夏から約2年間、コンコードの{{ウォールデン池}}のほとりに自分で小屋を建てて、ひとりで暮らしました。土地はエマソンのものでした。豆を育て、池の深さを測り、本を読み、森を歩く。その記録が1854年の『ウォールデン　森の生活』です。この本は、自然を守る運動や「シンプルに暮らす」という考え方に、今も影響を与え続けています。",
        "『森の生活』には、As if you could kill time without injuring eternity.（まるで、永遠を傷つけずに時間を殺せるかのように）という一文があります。kill time は「ひまをつぶす」。時間をむだにすれば、もっと大きなものを傷つけているのだ、とソローは皮肉ります。前置詞 {{without（〜せずに）}}のあとなので injuring。そして『散歩』には the art of Walking, that is, of taking walks（歩くことのわざ、つまり散歩をすることのわざ）とあります。前置詞 {{of}} のあとだから Walking・taking。ソローにとって歩くことは、毎日の営みそのものにつけた名前でした。",
      ],
      photos: [
        {
          src: `${C}/walden-title.webp`, width: 738, height: 1536,
          alt: "WALDEN; OR, LIFE IN THE WOODS と大きく印刷され、木々に囲まれた小さな小屋の版画がある古い本の扉",
          caption: "『ウォールデン　森の生活』初版（1854年）の扉。版画はソローが{{ウォールデン池}}のほとりに建てた小屋。",
          credit: { author: "Library of Congress", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Title_page_of_Henry_D._Thoreau,_Walden;_or_life_in_the_woods,_1854,_showing_Thoreau%27s_hut_at_Walden_Pond,_Massachusetts_LCCN96517797.jpg" },
        },
        {
          src: `${C}/walden-pond.webp`, width: 800, height: 600,
          alt: "木の枝ごしに見える、森に囲まれた静かな池",
          caption: "今のウォールデン池（アメリカ・マサチューセッツ州コンコード）。ソローはこのあたりの森を、毎日のように歩いた。",
          credit: { author: "Erik Granlund", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:Walden_Pond_outlook.jpg" },
        },
      ],
      recite: [
        {
          lang: "en", voice: "male", accent: "us",
          text: "As if you could kill time without injuring eternity.",
          ja: "まるで、永遠を傷つけずに、時間だけを殺せるとでもいうように。",
          cite: "Henry David Thoreau, Walden, \"Economy\" (1854)",
          source: "https://www.gutenberg.org/ebooks/205",
        },
        {
          lang: "en", voice: "male", accent: "us",
          text: "I have met with but one or two persons in the course of my life who understood the art of Walking, that is, of taking walks—who had a genius, so to speak, for sauntering …",
          ja: "これまでの人生で、歩くことのわざ、つまり散歩をすることのわざを分かっている人には、ひとりか二人しか出会ったことがない。いわば、ぶらぶら歩くことの天才を……",
          cite: "Henry David Thoreau, \"Walking\" (1862)",
          source: "https://www.gutenberg.org/ebooks/1022",
        },
      ],
      figure: {
        type: "formula",
        title: "前置詞のあとを -ing にする",
        prose: true,
        steps: [
          { expr: "I am good at {{swim}}.", note: "× at のあとに原形" },
          { expr: "I am good at {{swimming}}.", note: "○ swim → swimming" },
          { expr: "How about {{going}} to the park?", note: "○ 〜するのはどう？" },
          { expr: "Thank you for {{helping}} me.", note: "○ 〜してくれてありがとう" },
        ],
        note: "-ing のつけ方：make → making（e をとる）、run → running（重ねる）。",
      },
      reveal: "『散歩』の1行目の wish は「これから」に向かう動詞なので、あとは to speak でなければなりません。一方、the art of Walking の Walking は、前置詞 of のあとなので -ing しか置けません。題名の WALKING も、ソローが毎日実際にしていた営みに名前をつけた{{動名詞}}です。形を使い分けていたのは気分ではなく、すぐ前の語でした。",
      cliff: "ところで、-ing は進行形にも出てきます。「〜すること」と「〜している」は、どう見分けるのでしょう？",
    },
    {
      heading: "動名詞と進行形の -ing を見分ける",
      body: "-ing 形は、{{進行形}}（be動詞＋-ing で「〜している」）にも使われます。見分けるには、-ing が文の中でどの場所にあるかを見ます。be動詞のあとで「〜している」と訳せれば進行形、主語・目的語・前置詞のあとで「〜すること」と訳せれば{{動名詞}}です。",
      reading: [
        "My sister is reading.（姉は読書をしている）と My hobby is reading.（私の趣味は読書することです）。どちらも is reading ですが、意味はちがいます。前の文は、姉が今まさに読んでいる最中の{{進行形}}です。あとの文は、My hobby ＝ reading という関係で、reading は「読むこと」という{{動名詞}}です。主語と be動詞のあとの -ing がイコールで結べるかどうかが、見分ける手がかりになります。",
        "動名詞は名詞なので、my や his などをつけることもできます。『森の生活』の書き出しで、ソローは小屋で暮らした日々をこう語ります。…… and earned my living by the labor of my hands only.（そして、自分の手で働くことだけで暮らしを立てていた）。living は live に -ing がついた形ですが、ここでは「生計、暮らし」という名詞です。earn a living（生計を立てる）は今でも使われる言い方です。",
        "-ing の名詞は、題名でも活躍します。イギリスの作家オスカー・ワイルドが1895年に発表した喜劇『まじめが肝心』の原題は The Importance of Being Earnest。前置詞 of のあとなので Being です。しかも earnest（まじめな）は、劇に出てくる男性の名前アーネスト（Ernest）と同じ発音で、題名そのものがしゃれになっています。ふだん何気なく使う -ing ひとつで、作家たちは考え方を言い切り、生き方を語り、観客を笑わせてきたのです。",
      ],
      figure: {
        type: "compare",
        title: "-ing の2つの顔",
        columns: [{ title: "進行形", tone: "blue" }, { title: "動名詞", tone: "yellow" }],
        rows: [
          { label: "意味", cells: ["〜している", "〜すること"] },
          { label: "例", cells: ["She is {{reading}}.", "My hobby is {{reading}}."] },
          { label: "見分け", cells: ["主語がその動作をしている最中", "主語 ＝ -ing（イコール）"] },
        ],
      },
    },
  ],
  story: {
    kind: "novel",
    title: "ウォールデンの散歩する人",
    sayFix: {
      "Walking is good for you.": "ウォーキング・イズ・グッド・フォー・ユー。",
      "WALKING": "ウォーキング",
      "I wish to speak": "アイ・ウィッシュ・トゥ・スピーク",
      "the art of Walking": "ジ・アート・オブ・ウォーキング",
      "walking": "ウォーキング",
    },
    paragraphs: [
      "1845年の初夏、アメリカ・マサチューセッツ州の小さな町コンコード。十二歳のイーライは、村の学校の英文法の時間がいちばん苦手だった。先生が黒板に Walking is good for you. と書き、「walking は何のはたらき？」と聞く。イーライは胸をはって答えた。「動詞です。だって、歩いているんだから」。教室じゅうがどっと笑った。",
      "先生も笑いながら首をふった。「この文のどこに、歩いている人がいるの？　これは『歩くこと』というものごとの名前。だから文の主語になれるのよ。-ing は、{{名詞のはたらき}}をすることもあるの」。イーライは顔を赤くして、石板に「歩くこと」と書きつけた。",
      "その帰り道、ウォールデン池のほとりで、イーライは見なれない男を見かけた。背の高いやせた男が、ひとりで丸太をけずり、小さな小屋の骨組みを立てている。夕食のとき父が言った。「エマソンさんの池のそばの土地に、町の若いのが住むんだとさ。変わり者だよ」",
      "それから二年あまり、イーライは何度もその男を見た。朝は豆畑をたがやし、冬には凍った池に穴をあけて、ひもをたらして深さを測っていた。そして午後になると、決まって森へ歩いていく。雨の日も、雪の日も。町の人がなんと言おうと、男は歩くことを{{やめなかった}}。イーライには、それが仕事なのか遊びなのか、どうしてもわからなかった。",
      "やがて男は小屋を出て、町へもどった。イーライは大人になり、店をつぎ、毎日の帳簿づけに追われるようになった。森を歩くことなど、いつのまにか忘れていた。",
      "1862年の初夏、町の本屋にボストンの月刊誌がとどいた。ひらいたページに、ひと月前に亡くなったあの男の名前があった。題は、大きな活字で WALKING。イーライは思わず声をあげて笑った。あの日の黒板の文が、目の前によみがえったのだ。これは「歩いている」ではない。「歩くこと」。あの人が毎日していた営みに、そのままつけた名前だ。",
      "最初の一文は I wish to speak で始まっていた。これから語りたいことには、to。少し読み進めると、the art of Walking という言葉が出てくる。歩くことのわざ。of のあとだから、ここは -ing でなければならない。先生がいつか教えてくれた{{前置詞のあと}}の決まりが、生きた文の中で静かに働いていた。",
      "イーライは雑誌を閉じ、店に「すぐもどる」と札をかけた。ウォールデン池への道は、昔より少し広くなっていた。足を一歩ずつ前に出しながら、彼は思った。歩くことは、あの人にとって、ただの動作ではなかった。毎日を生きることそのものの、名前だったのだと。",
    ],
    note: "イーライ、先生、父は架空の人物で、会話や心情は創作です。ソローが1845年からエマソンの土地のウォールデン池のほとりに小屋を建てて約2年暮らしたこと、豆を育て池の深さを測ったこと、毎日長い散歩をしたこと、1862年5月に亡くなり、その翌月に『散歩』が雑誌（アトランティック・マンスリー）に載ったことは史実です。英文はソローの原文どおりです。",
  },
  mistakes: [
    { wrong: "I enjoyed to talk with her.", right: "I enjoyed talking with her.", why: "enjoy のあとは動名詞だけです。不定詞はとりません。" },
    { wrong: "I want going to Hokkaido.", right: "I want to go to Hokkaido.", why: "want のあとは不定詞だけです。" },
    { wrong: "He is good at play the guitar.", right: "He is good at playing the guitar.", why: "前置詞 at のあとの動詞は動名詞にします。" },
    { wrong: "Reading books are fun.", right: "Reading books is fun.", why: "主語は「本を読むこと」という1つのことなので is。books につられて are にしないようにします。" },
  ],
  check: [
    { q: "She finished ___ (write) the letter. の ( ) の語を正しい形に。", a: "writing", why: "finish のあとは動名詞。write は e をとって writing。" },
    { q: "「写真をとるのはどうですか」を How about を使って英語に。", a: "How about taking pictures?", why: "前置詞 about のあとは動名詞 taking。" },
    { q: "I like to sing. を動名詞を使って書きかえましょう。", a: "I like singing.", why: "like は不定詞・動名詞のどちらもとり、意味はほぼ同じ。" },
  ],
  next: [
    { label: "4択ドリル「動名詞」に挑戦", href: "/learn/eibunpo-chu/j-en-2-domeishi" },
    { label: "もう1つの「〜すること」＝「不定詞」", href: "/learn/eibunpo-chu/j-en-2-futeishi" },
    { label: "つぎに「文型（SVOO・SVOC）」", href: "/learn/eibunpo-chu/j-en-2-bunkei" },
  ],
};
