import type { Lecture } from "../types";

const C = "/media/commons/e-english-56-omoide";

export const E_ENGLISH_56_OMOIDE: Lecture = {
  unit: "e-english-56-omoide",
  title: "思い出は My best memory is 〜. したことは過去の形、気持ちは It was 〜.",
  hook: "6年間の小学校生活には、運動会や修学旅行など、たくさんの行事がありました。英語でいちばんの思い出を話すときは、行事の言葉と過去の形を組み合わせます。卒業の前に、自分の思い出を英語で伝えてみましょう。",
  mystery: "My best memory is our school trip. It was fun. 思い出は、もうすんだ昔のことのはずです。それなのに、1文目は is、2文目は was。同じ思い出の話なのに、どうして形がちがうの？",
  mission: {
    from: "町の写真館のおじさん",
    request: "毎年、小学校の卒業アルバムを作っています。今年は英語のページがあり、6年生に思い出を1文ずつ書いてもらいました。すると「is と was がまざっているのは、まちがいではありませんか？」と、何人もの子が直しに来たのです。印刷の前に、理由をそえて返事をしたいと考えています。名探偵《めいたんてい》のあなたに、is と was のなぞを解いてほしいのです。",
    thanks: "「今もいちばんの思い出」だから is、「旅行そのものはもう終わった」から was なのですね。どちらも正しいので、そのまま印刷しますと、みんなに伝えます。",
  },
  sections: [
    {
      heading: "6年間の行事をふり返る",
      body: "まず、どの行事がいちばんの思い出かを考えます。いちばんの思い出は {{My best memory is 〜.}} で言います。行事はみんなでしたことなので、したことは I だけでなく {{We}}（わたしたちは）で話すこともよくあります。",
      reading: [
        "卒業が近づくと、6年間の行事を思い出すことがふえます。入学式、遠足、運動会、修学旅行。その中から「いちばん」を一つえらんで英語で言うときは、{{My best memory is 〜.}} を使います。memory は「思い出」、best は「いちばんよい」という意味です。My best memory is our school trip.（わたしのいちばんの思い出は、修学旅行です）。",
        "行事は、クラスや学年のみんなでしたことです。だから、したことを話すときは、I（わたしは）だけでなく {{We}}（わたしたちは）もよく使います。We went to Nikko. と言えば、聞く人には「クラスのみんなで行ったんだな」と伝わります。",
        "友だちの思い出を聞きたいときは、What's your best memory?（あなたのいちばんの思い出は何？）とたずねます。同じ6年間でも、答えは人によってちがいます。聞いてみると、意外な思い出が出てくるかもしれません。",
      ],
      figure: {
        type: "timeline",
        title: "小学校の行事の例",
        events: [
          { year: 1, yearLabel: "1年生", label: "入学式" },
          { year: 2, yearLabel: "2年生", label: "遠足" },
          { year: 4, yearLabel: "4年生", label: "運動会" },
          { year: 5, yearLabel: "5年生", label: "林間学校" },
          { year: 6, yearLabel: "6年生", label: "修学旅行", key: true },
        ],
        note: "行事や学年は学校によってちがいます。",
      },
      cliff: "いちばんの思い出は決まりました。でも、その行事を英語で何と言えばよいのでしょう？",
    },
    {
      heading: "行事の言葉",
      body: "行事の名前は、決まった言い方を覚えておきます。sports day（運動会）や school trip（修学旅行）は、よく使う言葉です。My best memory is our sports day. のように、our（わたしたちの）や the をつけて言います。",
      reading: [
        "行事の名前には、決まった言い方があります。運動会は {{sports day}}、遠足は {{field trip}}、修学旅行は {{school trip}} です。英語の国の学校にも、遠足や運動会のような日があります。でも、学年みんなで何日も旅行する修学旅行は、日本の学校でとくに大切にされてきた行事です。外国の人に話すときは、「6年生がみんなで行く旅行だよ」と説明をそえると、よく伝わります。",
        "行事の言葉の前には、our（わたしたちの）や the をつけます。My best memory is our sports day. のようにです。our をつけると、「わたしたちの学校の、あの運動会」という気持ちが出ます。",
        "修学旅行の行き先として長く人気があるのが、栃木県の日光です。東照宮《とうしょうぐう》の陽明門《ようめいもん》は、細かいほりものがびっしりで、一日見ていてもあきないことから、「日暮《ひぐらし》の門」ともよばれます。",
      ],
      figure: {
        type: "compare",
        title: "行事の言い方",
        columns: [{ title: "日本語" }, { title: "英語", tone: "yellow" }],
        rows: [
          { cells: ["入学式", "entrance ceremony"] },
          { cells: ["遠足", "field trip"] },
          { cells: ["運動会", "sports day"] },
          { cells: ["音楽会", "music festival"] },
          { cells: ["修学旅行", "school trip"] },
          { cells: ["卒業式", "graduation ceremony"] },
        ],
      },
      photos: [
        {
          src: `${C}/yomeimon.webp`, width: 800, height: 515,
          alt: "屋根が重なったかざりの多い門と、両がわに続く長いへい。手前に石の階段と灯ろうがならぶ、古い白黒写真",
          caption: "日光東照宮《とうしょうぐう》の陽明門《ようめいもん》（1930年ごろの絵はがき）。日光は、今も修学旅行で人気の行き先の一つです。",
          credit: { author: "作者不明", license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0", source: "https://commons.wikimedia.org/wiki/File:KITLV_A955_-_Yomeimon,_Poort_van_het_Zonlicht,_in_het_complex_van_de_Toshogu-schrijn_te_Nikko_in_Japan,_KITLV_107941.tiff" },
        },
      ],
      cliff: "行事の名前が言えたら、次は思い出を、聞く人に伝わる話の形にまとめます。",
    },
    {
      heading: "思い出を伝える4つの文",
      body: "思い出は「{{思い出→したこと→見たもの・食べたもの→感想}}」の順に話すと、まとまります。したことはもうすんだことなので、went・saw・ate などの{{過去の形}}を使います。",
      reading: [
        "思い出は、「{{思い出→したこと→見たもの・食べたもの→感想}}」の順に話すと、聞く人の頭に場面がうかびます。My best memory is our school trip. We went to Nikko. We saw a big waterfall. It was beautiful. たった4文で、旅行の様子と気持ちが伝わりますね。",
        "2文目と3文目は、もうすんだことなので {{過去の形}} を使います。go（行く）は went、see（見る）は saw、eat（食べる）は ate のように、形が大きく変わる言葉があります。enjoy（楽しむ）は enjoyed、visit（たずねる）は visited のように、ed をつける言葉もあります。音声をよく聞いて、まねしてみましょう。",
        "ここで、1文目と4文目を見くらべてみます。My best memory {{is}} our school trip. と、It {{was}} beautiful.。同じ思い出の話なのに、is と was がまざっています。",
      ],
      figure: {
        type: "formula",
        title: "修学旅行の思い出を話す",
        prose: true,
        steps: [
          { expr: "My best memory is our {{school trip}}.", note: "いちばんの思い出" },
          { expr: "We {{went}} to Nikko.", note: "したこと（go → went）" },
          { expr: "We {{saw}} a big waterfall.", note: "見たもの（see → saw）" },
          { expr: "It {{was}} beautiful.", note: "感想（is → was）" },
        ],
        note: "waterfall は滝《たき》のことです。",
      },
      photos: [
        {
          src: `${C}/nikko-fall.webp`, width: 800, height: 1018,
          alt: "高いがけから太い一本の水が落ち、水しぶきがけむりのように広がる。右がわにも細いたきがいくつも流れる古い写真",
          caption: "1890年ごろの日光の滝《たき》（華厳《けごん》の滝《たき》と見られます）。We saw a big waterfall. と言いたくなる大きさです。",
          credit: { author: "Kusakabe Kimbei", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:KITLV_-_110638_-_Kusakabe,_Kimbei_-_Waterfall_at_Nikk%C5%8D,_Tochigi_(%E6%97%A5%E5%85%89%E5%B8%82),_Japan_-_circa_1890.tif" },
        },
      ],
      reveal: "1文目の主役は my best memory（わたしのいちばんの思い出）です。旅行は終わっても、それが「いちばんの思い出」であることは、今も変わりません。だから、今のことを表す is を使います。一方、It was beautiful. の It は、そのとき見た滝《たき》や旅行そのものを指します。それはもうすんだことなので、was になるのです。",
      cliff: "最後の感想の一言で、思い出の色が決まります。140年前の詩の中の子どもは、どんな言葉をえらんだのでしょう？",
    },
    {
      heading: "感想の言葉をえらぶ",
      body: "最後の感想で、話の気持ちが決まります。行事やものの感想は {{It was 〜.}}、自分の気持ちは {{I was 〜.}}（I was happy. など）で言います。思い出に合う言葉をえらびましょう。",
      reading: [
        "感想は、行事やものについてなら {{It was 〜.}}、自分の気持ちなら {{I was 〜.}} で言います。It was fun.（楽しかった）、It was exciting.（わくわくした）、I was happy.（うれしかった）。very をつけて It was very beautiful. と言えば、気持ちがもっと強く伝わります。",
        "楽しい気持ちを、すてきな言葉で書いた詩があります。スコットランドの作家スティーヴンソンが1885年に出した詩集『子どもの詩の園』の「The Swing（ぶらんこ）」です。ぶらんこで空高く上がると、庭のへいの向こうに、川や木や牛、広いいなかの景色が見えます。詩の子どもは、これを「子どもにできる、いちばん楽しいこと」（the pleasantest thing）だと言います。My best memory の best と同じ、「いちばん」の言葉ですね。",
        "おもしろいのは、この詩が I go flying（ぼくは飛んでいく）と、今のことの形で書かれていることです。だから読む人も、いっしょにぶらんこに乗っている気持ちになります。もし同じことを思い出として話すなら、I went up in a swing. It was fun! と、過去の形にします。今のことか、すんだことかで、形を使い分けるのです。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "How do you like to go up in a swing,\nUp in the air so blue?\nOh, I do think it the pleasantest thing\nEver a child can do!\n\nUp in the air and over the wall,\nTill I can see so wide,\nRiver and trees and cattle and all\nOver the countryside—\n\nTill I look down on the garden green,\nDown on the roof so brown—\nUp in the air I go flying again,\nUp in the air and down!",
        ja: "ぶらんこで空へ上がるのは、すき？\nこんなに青い空の中へ。\nああ、ぼくは思うんだ、これこそ\n子どもにできる、いちばん楽しいことだって！\n\n空へ上がって、へいをこえて、\nずっと遠くまで見わたせる。\n川も、木も、牛も、なにもかも、\nいなかの野原いっぱいに――\n\n緑の庭を見下ろして、\n茶色の屋根を見下ろして、\nまた空へと飛んでいく、\n空へ上がって、また下へ！",
        cite: "Robert Louis Stevenson, \"The Swing\", A Child's Garden of Verses (1885)",
        source: "https://www.gutenberg.org/ebooks/136",
      }],
      figure: {
        type: "tree",
        title: "It was のあとに入る言葉",
        root: {
          label: "It was 〜.",
          tone: "navy",
          children: [
            { label: "楽しかった", sub: "fun", tone: "yellow" },
            { label: "わくわくした", sub: "exciting", tone: "yellow" },
            { label: "美しかった", sub: "beautiful", tone: "blue" },
            { label: "おいしかった", sub: "delicious", tone: "blue" },
          ],
        },
      },
      photos: [
        {
          src: `${C}/swing.webp`, width: 800, height: 546,
          alt: "花のさく木につるしたぶらんこで、女の子が高くこぎ上がっている。下には畑と家々が広がる絵",
          caption: "1911年のアメリカの子ども向けの読本で、詩「The Swing」にそえられた絵（マギネル・ライト・エンライト画）。ぶらんこの上から、遠くの畑や家まで見えています。",
          credit: { author: "Maginel Wright Enright", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Young_girl_on_swing_-_Maginel_Wright_Enright_-_1911.jpg" },
        },
      ],
    },
  ],
  story: {
    kind: "novel",
    title: "一文ずつのアルバム",
    paragraphs: [
      "二月の教室に、大きな画用紙が一まい、はり出されました。いちばん上には英語で Our School Trip。修学旅行の写真のまわりに、一人一文ずつ、英語で思い出を書きこむのです。卒業アルバムの、最後のページになります。",
      "みおは、ペンを持ったまま、手が止まっていました。もう書いてある文をかぞえると、It was fun. が七つもあるのです。",
      "「みんな同じだね」。となりで、そうたが笑いました。そうたの文は We ate soba. です。日光で食べた、おそばのことです。",
      "「楽しかったのは本当だよ。でも、それだけじゃなかった気がするの」",
      "みおは目をとじました。華厳《けごん》の滝《たき》の前に立った日のことです。ごうごうという音。風に乗って飛んでくる、つめたい水のつぶ。みんなが「つめたい！」と声を上げて、それから、なぜか大笑いしたのでした。",
      "「あのとき、顔がびしょびしょになったよね」とそうた。「先生のめがねまで、まっ白だった」",
      "みおは、英語の時間に聞いた詩を思い出しました。ぶらんこで高く上がった子どもが、へいの向こうの川や木をながめる詩です。あの子は、今まさに空へ飛んでいくように話していました。でも、わたしたちの滝《たき》は、もう終わったことです。",
      "みおは、ゆっくり書きました。It was cold, but it was fun!",
      "「それ、いいな。ぼくも書き足す」。そうたは We ate soba. の横に、小さく It was hot! と書きました。おそばが熱くて、舌をやけどしたのです。",
      "画用紙の上には、fun のあいだに、cold や hot や beautiful が、少しずつふえていきました。同じ旅行なのに、一人一人の思い出の色は、ちがっていたのです。",
      "最後に、先生が題の下に、小さく書きたしました。My best memory is this class.",
      "「先生のだけ、is なんだね」とそうたが言いました。みおはうなずきました。旅行は終わっても、このクラスがいちばんの思い出なのは、今も、これからも変わらないからです。",
    ],
    note: "みお・そうた・先生と、教室の出来事は創作です。日光の華厳《けごん》の滝《たき》と東照宮《とうしょうぐう》の陽明門《ようめいもん》、スティーヴンソンの詩「The Swing」が1885年の詩集『子どもの詩の園』に入っていることは事実です。",
  },
  mistakes: [
    { wrong: "We go to Kyoto on our school trip.（思い出として）", right: "We went to Kyoto on our school trip.", why: "すんだことなので、go の過去の形 went を使います。" },
    { wrong: "We seed a big temple.", right: "We saw a big temple.", why: "see は ed をつけず、saw に形が変わります。" },
    { wrong: "（運動会の思い出で）It is exciting.", right: "It was exciting.", why: "すんだことの感想なので、is ではなく was を使います。" },
  ],
  check: [
    { q: "「運動会」を英語で言うと？", a: "sports day", why: "school trip は修学旅行、music festival は音楽会。" },
    { q: "What's your best memory? と聞かれたら、答えの文は何で始める？", a: "My best memory is 〜.", why: "「わたしのいちばんの思い出は〜です」の形で答える。" },
    { q: "We ___ a song.（歌った）の ___ に入るのは？", a: "sang", why: "sing（歌う）の過去の形は sang。" },
  ],
  next: [
    { label: "「小学校の思い出」のドリル", href: "/learn/eigo-sho/e-english-56-omoide" },
    { label: "ひとつ前の図解レクチャー「したことを伝える」", href: "/learn/lecture/e-english-56-kako" },
    { label: "つぎの図解レクチャー「中学校でしたいこと」", href: "/learn/lecture/e-english-56-chugaku" },
  ],
};
