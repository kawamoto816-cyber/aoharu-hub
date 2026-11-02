import type { Lecture } from "../types";

const C = "/media/commons/j-en-2-setsuzokushi";

export const J_EN_2_SETSUZOKUSHI: Lecture = {
  unit: "j-en-2-setsuzokushi",
  title: "接続詞は文と文をつなぐ。when・if・because のまとまりは前にも後ろにも置ける",
  hook: "「家に帰ったとき、母は料理をしていた」「もし明日晴れたら、海に行く」「つかれていたので、早く寝た」。こうした長めの文は、接続詞で2つの文をつないで作ります。接続詞が使えると、短い文を並べるだけの英語から、理由や条件まで伝えられる英語に変わります。",
  mystery: "アメリカ独立宣言の最初の一文は When で始まり、文の主語が出てくるのは、なんと51語目です。どこまでが前置きで、なぜこんなに長い前置きを先に置いたのでしょう？",
  mission: {
    from: "市民ホールの英語朗読会の司会者",
    request: "来月の朗読会で、アメリカ独立宣言の書き出しを英語で読みます。ところが最初の一文がとても長く、どこで息をつぎ、どこから力をこめて読めばよいのかわかりません。聞く人に意味が伝わる読み方を決めるために、名探偵のあなたに、この長い一文のしくみを解き明かしてほしいのです。",
    thanks: "When のまとまりが終わるコンマで一息おき、そこから a decent respect … requires と本題を力強く読めばいいのですね。これで聞く人にも、宣言の組み立てがまっすぐ伝わります。",
  },
  sections: [
    {
      heading: "接続詞は2つのグループに分けられる",
      body: "{{and・but・or・so}} は、前と後ろを{{対等に}}つなぎます。{{when・if・because・that}} は、「〜とき」「もし〜なら」「〜なので」「〜ということ」という{{まとまり}}を作り、もう一方の文にくっつけます。まずはそれぞれの意味を正しく覚えましょう。",
      reading: [
        "接続詞は、語と語、文と文をつなぐ「のり」の役目をする言葉です。大きく2つのグループがあります。1つは{{and・but・or・so}}のように、前と後ろを{{対等に}}つなぐもの。I like dogs, and my brother likes cats.（私は犬が好きで、弟はねこが好きです）では、2つの文が同じ重さで並んでいます。もう1つは{{when・if・because・that}}のように、「〜とき」「もし〜なら」「〜なので」「〜ということ」という{{まとまり}}を作って、もう一方の文にくっつくもの。I was cooking when you called.（あなたが電話したとき、私は料理をしていた）の when you called は、それだけでは文として独り立ちできません。",
        "対等につなぐ and の力がよくわかる詩があります。アメリカの詩人ロバート・フロストが1916年の詩集 Mountain Interval に収めた「選ばれなかった道」（The Road Not Taken）です。黄色く色づいた秋の森で、道が2つに分かれている。旅人は両方を歩くことはできないので、長いあいだ立ちつくし、片方の道を見えるかぎり先まで見つめます。最初の5行は、and を3回使って動作を次々につないだ、ひと続きの文です。立ち止まり、見つめ、迷う時間が、and のリズムでゆっくりと伸びていきます。",
        "詩の最後で旅人は、ずっと先の未来にため息まじりにこう語るだろう、と想像します。Two roads diverged in a wood, and I— / I took the one less traveled by（森で道が2つに分かれていて、そして私は——私は、人の通らないほうを選んだ）。and は「そして」と話を先へ進める言葉なので、そのすぐあとでダッシュ（—）を置いて言葉につまると、聞き手は「それで？」と息をのみます。そして最後の行も And で始まります。この詩はアメリカでいちばん広く知られた詩の1つで、卒業式のスピーチなどでもよく引用されます。",
      ],
      figure: {
        type: "tree",
        title: "接続詞の2つのグループ",
        root: {
          label: "接続詞",
          children: [
            {
              label: "対等につなぐ",
              tone: "blue",
              children: [
                { label: "and", sub: "そして" },
                { label: "but", sub: "しかし" },
                { label: "or", sub: "または" },
                { label: "so", sub: "だから" },
              ],
            },
            {
              label: "まとまりを作る",
              tone: "yellow",
              children: [
                { label: "when", sub: "〜とき" },
                { label: "if", sub: "もし〜なら" },
                { label: "because", sub: "〜なので" },
                { label: "that", sub: "〜ということ" },
              ],
            },
          ],
        },
      },
      photos: [
        {
          src: `${C}/frost.webp`, width: 800, height: 1120,
          alt: "スーツにネクタイ姿で、正面を見つめる若い男性の白黒写真",
          caption: "ロバート・フロスト（1910年代）。アメリカの農村の風景を、話しことばに近い英語で詠んだ詩人。「選ばれなかった道」で{{and}}を印象的に使った。",
          credit: { author: "作者不明（米国議会図書館）", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Robert_Frost,_1910s.jpg" },
        },
      ],
      recite: [
        {
          lang: "en", voice: "male",
          text: "Two roads diverged in a yellow wood,\nAnd sorry I could not travel both\nAnd be one traveler, long I stood\nAnd looked down one as far as I could\nTo where it bent in the undergrowth;",
          ja: "黄色く色づいた森で、道が2つに分かれていた。\n両方の道を行けないのが残念で、\nひとりの旅人である私は、長いあいだ立ちつくし、\n片方の道を、見えるかぎり遠くまで見つめた。\n道が下草のしげみへと曲がって消えるところまで。",
          cite: "Robert Frost, \"The Road Not Taken\" (Mountain Interval, 1916)",
          source: "https://www.gutenberg.org/ebooks/29345",
        },
        {
          lang: "en", voice: "male",
          text: "I shall be telling this with a sigh\nSomewhere ages and ages hence:\nTwo roads diverged in a wood, and I—\nI took the one less traveled by,\nAnd that has made all the difference.",
          ja: "私はこのことを、ため息まじりに語るだろう。\nいつか、ずっとずっと先のどこかで。\n森で道が2つに分かれていて、そして私は——\n私は、人のあまり通らないほうの道を選んだ。\nそしてそれが、すべてを変えたのだ、と。",
          cite: "Robert Frost, \"The Road Not Taken\" (Mountain Interval, 1916)",
          source: "https://www.gutenberg.org/ebooks/29345",
        },
      ],
      cliff: "when や if のまとまりは、文の前と後ろ、どちらに置けばよいのでしょう？",
    },
    {
      heading: "when・if・because のまとまりは前にも後ろにも",
      body: "When I got home, my mother was cooking. と My mother was cooking when I got home. は同じ意味です。まとまりを{{文の前に置くとき}}は、区切りに{{コンマ（,）}}を入れます。後ろに置くときはふつうコンマはいりません。日本語に訳すときは、接続詞のまとまりから先に訳すと自然になります。",
      reading: [
        "when・if・because のまとまりは、文の後ろにも前にも置けます。My mother was cooking when I got home. を When I got home, my mother was cooking. としても、意味は同じです。前に置いたときは、まとまりの終わりに{{コンマ（,）}}を打って、「ここまでが前置き、ここから本題」と区切ります。前に置くと「どんなときの話か」が先にわかり、後ろに置くと「何が起きたか」が先に伝わります。どちらを先に言うかで、聞き手の受けとり方が少し変わるのです。",
        "この「前置き」を堂々と使った歴史的な一文が、{{独立宣言}}の書き出しです。1776年7月4日、北アメリカの13の植民地は、イギリスから独立することを宣言しました。文章は主にトマス・ジェファソンが起草しました。冒頭は When in the Course of human events（人類の歴史の流れの中で〜とき）と始まり、「ある人民が、他の人民と結んできた政治のつながりを断ち切り、世界の国々の中で対等な地位につく必要が生じたとき」という、50語もの when のまとまりが続きます。",
        "コンマのあと、51語目でようやく主語 a decent respect to the opinions of mankind（人類の意見へのしかるべき敬意）と、動詞 requires（求める）が現れます。何を求めるのかは that 以下、「独立する理由を宣言すること」です。つまり宣言は、いきなり「独立する」とは言わず、まず「こういうときには」と状況を示し、世界の人々に向けて「だから理由を説明します」と続けたのです。このあと、イギリス国王への不満が長く並べられていきます。",
      ],
      figure: {
        type: "formula",
        title: "まとまりの位置を入れかえる",
        prose: true,
        steps: [
          { expr: "{{When I got home}}{{,}} my mother was cooking.", note: "前に置く → コンマ" },
          { expr: "My mother was cooking {{when I got home}}.", note: "後ろに置く → コンマなし" },
          { expr: "{{If you are busy}}{{,}} I will help you.", note: "if も同じ" },
          { expr: "I will help you {{if you are busy}}.", note: "意味は変わらない" },
        ],
      },
      photos: [
        {
          src: `${C}/declaration.webp`, width: 800, height: 957,
          alt: "古い羊皮紙に細かい手書きの文字がびっしり並び、下に多くの署名がある文書",
          caption: "独立宣言の写し（1823年、ウィリアム・ストーンが原本を銅版に写して印刷したもの）。本文1行目の大きな When から、50語の{{when のまとまり}}が始まる。",
          credit: { author: "William J. Stone", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:US_Declaration_of_Independence_1823_Stone_Printing.jpg" },
        },
      ],
      recite: [{
        lang: "en", voice: "male",
        text: "When in the Course of human events, it becomes necessary for one people to dissolve the political bands which have connected them with another, and to assume among the powers of the earth, the separate and equal station to which the Laws of Nature and of Nature's God entitle them, a decent respect to the opinions of mankind requires that they should declare the causes which impel them to the separation.",
        ja: "人類の歴史の流れの中で、ある人民が、他の人民と結んできた政治のつながりを断ち切り、自然の法と自然の神の法によってあたえられた、独立した対等な地位を世界の国々の中で占める必要が生じたとき、人類の意見にしかるべき敬意をはらうならば、その人民は、自分たちを分離へとかりたてた理由を宣言しなければならない。",
        cite: "Declaration of Independence (1776)",
        source: "https://www.archives.gov/founding-docs/declaration-transcript",
      }],
      reveal: "独立宣言の最初の50語は、When で始まる1つの大きな{{まとまり}}でした。when のまとまりは前にも後ろにも置けますが、前に置くと「どんなときの話か」が先に伝わります。ジェファソンたちは、まず「人民がつながりを断ち切るとき」という状況を示し、{{コンマ}}で区切ってから、主語 a decent respect と動詞 requires で「だから理由を宣言する」という本題を述べました。いきなり結論を言わず、前置きで世界の人々の理解を求めてから本題に入る。それが、長い when のまとまりを前に置いた理由です。",
      cliff: "「〜なので」の because と「だから」の so。置く場所はどうちがうのでしょう？",
    },
    {
      heading: "because は原因の前、so は結果の前",
      body: "{{because}} は「〜なので」と{{原因・理由}}の前に置きます。{{so}} は「だから」と{{結果}}の前に置きます。同じ内容でも、どちらを使うかで接続詞を置く場所が変わります。Why 〜? の質問には Because 〜. で答えることもできます。",
      reading: [
        "{{because}}は「〜なので」と{{原因・理由}}の前に、{{so}}は「だから」と{{結果}}の前に置きます。I stayed home because it was raining.（雨が降っていたので、家にいた）と It was raining, so I stayed home.（雨が降っていた。だから家にいた）は同じ内容です。because のまとまりも前に出せて、Because it was raining, I stayed home. とできますが、because と so を1つの文でいっしょに使うことはできません。Why 〜?（なぜ〜？）と聞かれたら、Because 〜. と理由だけで答えることもできます。",
        "because のまとまりを前に置いて、読む人をはっとさせた詩があります。アメリカの詩人エミリー・ディキンソンは、マサチューセッツ州アマストの家で、生涯に1800編ほどの詩を書きましたが、生きているあいだに発表されたのはほんのわずかでした。亡くなって4年後の1890年に詩集が出版されると、短く鋭いことばが多くの人をおどろかせます。その中の1編は、Because I could not stop for Death, / He kindly stopped for me;（私が死のために立ち止まれなかったので、死のほうが親切にも、私のために止まってくれた）と始まります。",
        "忙しくて立ち止まれない「私」のもとへ、死が馬車に乗って、紳士のように迎えに来る。because が先に理由を言うので、読む人は「立ち止まれなかったから……どうなるの？」と引きこまれ、後半の意外な結果におどろきます。so で書きかえると I could not stop for Death, so he kindly stopped for me. ですが、理由から始まる because の形だからこそ、静かなおどろきが生まれます。なお、3行目の but just ourselves の but は「しかし」ではなく「ただ〜だけ」という意味です。but には接続詞以外の顔もあります。",
      ],
      figure: {
        type: "cause",
        title: "同じ内容を because と so で",
        causes: [{ label: "つかれていた", sub: "I was tired", tone: "blue" }],
        effect: { label: "早く寝た", sub: "I went to bed early", tone: "yellow" },
        note: "I went to bed early because I was tired. ＝ I was tired, so I went to bed early.",
      },
      photos: [
        {
          src: `${C}/dickinson.webp`, width: 582, height: 685,
          alt: "髪を中央で分け、首にリボンを結んだ若い女性が、本ののった机のそばにすわる古い白黒写真",
          caption: "エミリー・ディキンソン（1848年ごろの銀板写真）。生前はほとんど詩を発表せず、死後の1890年に詩集が出た。詩の書き出しに{{because}}のまとまりを置いた。",
          credit: { author: "作者不明", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Emily_Dickinson_daguerreotype_(cropped).jpg" },
        },
      ],
      recite: [{
        lang: "en", voice: "female",
        text: "Because I could not stop for Death,\nHe kindly stopped for me;\nThe carriage held but just ourselves\nAnd Immortality.",
        ja: "私が死のために立ち止まれなかったので、\n死のほうが親切に、私のために止まってくれた。\n馬車に乗っていたのは、ただ私たちふたりと、\nそして「永遠」だけ。",
        cite: "Emily Dickinson, \"The Chariot\" (Poems, First Series, 1890)",
        source: "https://www.gutenberg.org/ebooks/12242",
      }],
      cliff: "「もし明日雨が降ったら」。未来の話なのに、if のあとは現在形。なぜでしょう？",
    },
    {
      heading: "if・when のまとまりの中は、未来でも現在形",
      body: "「もし明日雨が降ったら」は未来のことですが、{{if や when のまとまりの中では現在形}}を使います。If it rains tomorrow, I will stay home. の rains がその例で、will rain にはしません。一方、まとまりの外の「家にいる」は未来なので will を使います。",
      reading: [
        "If it rains tomorrow, I will stay home.（もし明日雨が降ったら、家にいます）。降るのは明日なのに、if のまとまりの中は rains と{{現在形}}です。if や when が「もし〜なら」「〜とき」という{{条件}}を表すとき、その中では未来のことも現在形で言うきまりがあります。When I grow up, I will be a doctor.（大人になったら、医者になります）も同じです。条件の部分は「その場面が来たとしよう」と場面を置くだけで、「〜だろう」と予想するのは、まとまりの外の will の役目だ、と考えるとわかりやすいでしょう。",
        "if のまとまりを積み重ねて有名になった詩が、イギリスの作家ラドヤード・キプリングの「もしも」（If—）です。『ジャングル・ブック』の作者として知られるキプリングは、1910年の物語集『ごほうびと妖精』（Rewards and Fairies）にこの詩を収めました。父が息子に語りかける形で、「まわりが冷静さを失っても、きみが落ち着いていられるなら」「勝利と失敗を同じように受け止められるなら」と、If you can 〜（もしきみが〜できるなら）で始まる条件を次々に並べていきます。",
        "if のまとまりは詩の終わり近くまで続き、最後にようやく「そうすれば、きみは一人前の大人になれる」という結果が来ます。条件を重ねるほど、最後の結果は重みを増すのです。この詩はイギリスで特に愛され、テニスのウィンブルドン選手権では、センターコートへ選手が入る出入口の上に、勝利と失敗について語った2行がかかげられています。なお、think や know のあとの{{that}}（〜ということ）のまとまりは、I think (that) you are right. のように that を省略できます。",
      ],
      figure: {
        type: "formula",
        title: "if の中は現在形、外は will",
        prose: true,
        steps: [
          { expr: "If it {{will rain}} tomorrow, ...", note: "× if の中に will は使わない" },
          { expr: "If it {{rains}} tomorrow, I {{will stay}} home.", note: "○ 中は現在形、外は will" },
        ],
        note: "think・know のあとの that（〜ということ）は省略できる：I think (that) he is right.",
      },
      photos: [
        {
          src: `${C}/kipling.webp`, width: 800, height: 1065,
          alt: "丸い眼鏡をかけ、濃い口ひげをたくわえた男性の白黒の肖像写真",
          caption: "ラドヤード・キプリング（1865〜1936年）。1907年、英語で書く作家として初めてノーベル文学賞を受けた。詩「If—」で{{if のまとまり}}を重ねた。",
          credit: { author: "Elliott & Fry", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Rudyard_Kipling_(portrait).jpg" },
        },
      ],
    },
  ],
  story: {
    kind: "manga4",
    title: "両方の道は行けない",
    panels: [
      {
        scene: "昼休みの教室。机につっぷしているユウタに、ハナが声をかける。",
        lines: [
          { who: "ハナ", text: "ユウタ、なんで寝てるの？" },
          { who: "ユウタ", text: "ビコーズねむい、ソー寝る…" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ハナ", look: "girl", x: 252, face: "normal", fx: "?" },
            { who: "ユウタ", look: "boy", x: 86, face: "sweat", fx: "sweat" },
          ],
          props: [
            { kind: "table", x: 0, y: 240 },
          ],
        },
      },
      {
        scene: "ハナがボードに because と書いて、指でさす。",
        lines: [
          { who: "ハナ", text: "ビコーズは{{理由}}の前、" },
          { who: "ハナ", text: "ソーは{{結果}}の前。両方は×" },
          { who: "ユウタ", text: "えー、両方つけたい！" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ハナ", look: "girl", x: 256, face: "smile", fx: "idea", hand: [208, 214] },
            { who: "ユウタ", look: "boy", x: 84, face: "surprise", fx: "!" },
          ],
          props: [
            { kind: "board", x: 168, y: 200, text: "because" },
          ],
        },
      },
      {
        scene: "ハナが詩集を開いてみせる。ユウタが考えこむ。",
        lines: [
          { who: "ハナ", text: "フロストの詩の旅人も" },
          { who: "ハナ", text: "{{両方の道}}は行けなかった" },
          { who: "ユウタ", text: "接続詞も道も一つか…" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ハナ", look: "girl", x: 250, face: "normal", hand: [196, 228] },
            { who: "ユウタ", look: "boy", x: 88, face: "think", fx: "?" },
          ],
          props: [
            { kind: "table", x: 0, y: 240 },
            { kind: "book", x: 160, y: 222, s: 0.9 },
          ],
        },
      },
      {
        scene: "ユウタが胸を張って言い直し、また机につっぷす。ハナがツッコむ。",
        lines: [
          { who: "ハナ", text: "で、どうするの？" },
          { who: "ユウタ", text: "アイム・スリーピー、ソー寝る！" },
          { who: "ハナ", text: "英文は正解。寝るのは不正解！" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ハナ", look: "girl", x: 254, face: "shout", fx: "steam" },
            { who: "ユウタ", look: "boy", x: 86, face: "smile" },
          ],
          props: [
            { kind: "table", x: 0, y: 240 },
          ],
        },
      },
    ],
    note: "ハナとユウタは架空の人物で、会話はすべて創作です。フロストの詩「The Road Not Taken」（1916年）で、旅人が2つの道の両方は進めないと語る内容は原作にもとづいています。",
  },
  mistakes: [
    { wrong: "If it will be sunny tomorrow, we will go to the sea.", right: "If it is sunny tomorrow, we will go to the sea.", why: "if のまとまりの中は、未来のことでも現在形にします。" },
    { wrong: "Because I was hungry, so I ate a sandwich.", right: "Because I was hungry, I ate a sandwich.（または I was hungry, so I ate a sandwich.）", why: "because と so は1つの文でどちらか一方だけを使います。" },
    { wrong: "I was sick so I went to school.", right: "I was sick, but I went to school.", why: "「病気だった、それでも学校へ行った」は逆の内容なので but。so は「だから」で、自然な結果が続くときに使います。" },
  ],
  check: [
    { q: "I like dogs, ___ my sister likes cats. の ___ に入る接続詞は？", a: "but", why: "「私は犬が好き、しかし姉はねこが好き」と対比している。" },
    { q: "「もし時間があれば、私の家に来てください」を if を使って英語に。", a: "If you have time, please come to my house.", why: "if のまとまりを前に置くのでコンマを入れる。" },
    { q: "He was busy, so he didn't come. を because を使って書きかえましょう。", a: "He didn't come because he was busy.", why: "because は原因（he was busy）の前に置く。" },
  ],
  next: [
    { label: "4択ドリル「接続詞」に挑戦", href: "/learn/eibunpo-chu/j-en-2-setsuzokushi" },
    { label: "when と相性のよい「過去進行形」", href: "/learn/eibunpo-chu/j-en-2-kako-shinko" },
    { label: "つぎに「There is / There are」", href: "/learn/eibunpo-chu/j-en-2-there" },
  ],
};
