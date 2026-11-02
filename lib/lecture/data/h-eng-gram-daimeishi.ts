import type { Lecture } from "../types";

const C = "/media/commons/h-eng-gram-daimeishi";

export const H_ENG_GRAM_DAIMEISHI: Lecture = {
  unit: "h-eng-gram-daimeishi",
  title: "代名詞は「名詞の身代わり」。it・one・other は何を指すかで選ぶ",
  hook: "Ken lost his umbrella, so he bought a new one. の his・he・one は、どれも名詞の身代わりです。代名詞が何を指すかを取りちがえると、長文の意味が逆になることもあります。「何を指しているか」で語を選ぶしくみを整理しましょう。",
  mystery: "アメリカの詩人フロストの名詩「選ばれなかった道」には、森の中で分かれる2本の道が出てきます。詩人は道に名前をつけず、one・it・the other という小さな代名詞だけで呼び分けます。それなのに、100年以上、世界中の読者が「どっちの道の話か」を取りちがえないのはなぜでしょう？",
  mission: {
    from: "海外映画の字幕翻訳者",
    request: "新人の翻訳者が、せりふの it と one を取りちがえ、「新しい傘を買う」場面に「なくした傘を買う」という字幕をつけてしまいました。字幕は一瞬で消えるので、観客は読み返せません。代名詞が「どれ」を指すのかを決めているしくみを、名探偵のあなたに名作の詩から見つけ出してほしいのです。",
    thanks: "「同じ物なら it、同じ種類の別の物なら one、残りが決まっていれば the がつく」。この3つを字幕チェックの表にしたら、新人の訳のまちがいがぴたりと止まりました。代名詞は、名前のかわりに「指し方」を運んでいたのですね。",
  },
  sections: [
    {
      heading: "人称代名詞は、文の中の役割で形が変わる",
      body: "人称代名詞は、文の中で{{主語}}になるか、{{目的語}}になるか、「〜の」になるかで形が変わります。前置詞の後ろも目的格です（with him）。「〜のもの」は{{所有代名詞}}（mine, hers）で表し、主語と目的語が同じ人や物のときは{{再帰代名詞}}（myself, herself）を使います。",
      reading: [
        "英語は、同じ名詞を何度もくり返すのをきらう言葉です。そこで、一度出た名詞は{{代名詞}}に置きかえて話を進めます。ただし日本語の「彼」「それ」とちがい、英語の人称代名詞は文の中の役割によって形を変えます。She gave me her old guitar, and I play it every day.（彼女は私に古いギターをくれて、私はそれを毎日ひいている）では、主語の she と I は{{主格}}、「私に」の me は{{目的格}}、「彼女の」の her は{{所有格}}です。with him、for them のように{{前置詞の後ろも目的格}}になります。日本語は「は・に・の」という助詞で役割を示しますが、英語は語の形そのものに役割を刻みこんでいるのです。",
        "この「形で役割を示す」しくみを、だれよりも大胆に使った詩人がいます。1855年、ニューヨークのブルックリンで、元植字工で新聞記者だった{{ウォルト・ホイットマン}}（1819〜1892）が、詩集『{{草の葉}}（Leaves of Grass）』を自分で費用を出して出版しました。表紙には作者名がなく、かわりに作業着姿の彼の肖像が口絵に置かれました。韻も決まったリズムも使わず、話し言葉のように長く伸びる行で書かれた詩は、のちに{{自由詩}}とよばれ、アメリカの詩を大きく変えました。ホイットマンは生涯この詩集に手を入れ続け、最後の版は亡くなる直前の1891〜92年に出ています。",
        "詩集の最初に置かれた長い詩は、のちに「{{ぼく自身の歌}}（Song of Myself）」と名づけられました。その1行目 I celebrate myself, and sing myself では、たたえる人（主語 I）とたたえられる人が同じなので、目的語は me ではなく{{再帰代名詞 myself}} になります。ところが2行目では、もう you が主語として現れ、3行目では belonging to me（ぼくに属する）と belongs to you（きみに属する）が、前置詞 to の後ろの目的格として向かい合います。「ぼく」を歌うと言いながら、わずか3行で「ぼく」と「きみ」は同じ原子でできていると言いきる。代名詞を入れかえるだけで、詩人と読者の境目が消えていくのです。",
        "再帰代名詞は enjoy oneself（楽しむ）、by oneself（ひとりで）のような決まった言い方でも使います。「私の友人の一人」は、a と所有格を並べられないので {{a friend of mine}} と言います。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "us",
        text: "I celebrate myself, and sing myself,\nAnd what I assume you shall assume,\nFor every atom belonging to me as good belongs to you.\nI loafe and invite my soul,\nI lean and loafe at my ease observing a spear of summer grass.",
        ja: "ぼくはぼく自身をたたえ、ぼく自身を歌う。\nぼくが思うことを、きみもまた思うだろう。\nぼくのものである原子は、ひとつ残らず、そのままきみのものでもあるのだから。\nぼくはぶらぶらと時を過ごし、自分の魂をまねき入れる。\n身をもたせかけ、のんびりとくつろいで、夏草の葉先を一本ながめている。",
        cite: "Walt Whitman, \"Song of Myself\", Section 1, Leaves of Grass (1891–92)",
        source: "https://www.gutenberg.org/ebooks/1322",
      }],
      photos: [
        {
          src: `${C}/whitman-1854.webp`, width: 800, height: 1048,
          alt: "つば広の帽子をかぶり、えりを開けたシャツ姿で片手を腰に当てて立つ、ひげの男性の版画",
          caption: "35歳のホイットマン。1855年の『草の葉』初版の口絵の銅版画。作者名を表紙に出さず、労働者の姿の「ぼく」をこの絵で示した。",
          credit: { author: "Samuel Hollyer（Gabriel Harrison の銀板写真から）", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Walt_Whitman,_steel_engraving,_July_1854.jpg" },
        },
        {
          src: `${C}/leaves-1855.webp`, width: 800, height: 1113,
          alt: "こげ茶色の布の表紙の中央に、草や根がからみつくような金色の飾り文字で Leaves of Grass と書かれた本",
          caption: "『草の葉』初版（1855年）の表紙。題名の文字から根や葉が伸びている。表紙のどこにも作者の名前はない。",
          credit: { author: "Walt Whitman", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Leaves_of_Grass_(1855)_cover.jpg" },
        },
      ],
      cliff: "では、It is raining. の it は、いったい何を指しているのでしょう？",
      figure: {
        type: "compare",
        title: "I と she の形の変化",
        columns: [{ title: "はたらき", tone: "navy" }, { title: "I", tone: "yellow" }, { title: "she", tone: "blue" }],
        rows: [
          { cells: ["主格（〜は）", "I", "she"] },
          { cells: ["所有格（〜の）", "my", "her"] },
          { cells: ["目的格（〜を・に）", "me", "her"] },
          { cells: ["所有代名詞（〜のもの）", "mine", "hers"] },
          { cells: ["再帰代名詞（〜自身）", "myself", "herself"] },
        ],
        note: "her は所有格と目的格が同じ形。a・this などと所有格は並べられないので、a friend of mine の形にする。",
      },
    },
    {
      heading: "it は「前に出たそれ」と「仮の主語」",
      body: "it は前に出た{{そのもの}}を指すほか、天気・時間・距離・明暗を表す文の主語にもなります（It is raining.）。また、不定詞や that 節が主語で長くなるときは、it を{{形式主語}}として文の初めに置き、本当の主語を後ろへ回します。SVOC の目的語が長いときも、{{形式目的語}}の it を置いて後ろへ回します。",
      reading: [
        "it のいちばん基本の使い方は、前に出た物や事柄を指す「それ」です。I bought a book yesterday. It was very interesting. の It は、きのう買ったその本です。ところが、It is raining.（雨が降っている）の it は、何か特定の物を指してはいません。英語の文には{{必ず主語が要る}}という強い決まりがあるため、天気・{{時間}}・{{距離}}・明暗・寒暖など、主語にあたる物がない文でも、it を主語の席に座らせるのです。It's ten o'clock.（10時だ）、It's two kilometers to the station.（駅まで2キロある）、It's getting dark.（暗くなってきた）。日本語に訳すときは「それは」と訳しません。",
        "it のもう一つの大きな仕事は、長い主語を後ろへ回すことです。To swim in this river is dangerous. は文法的には正しい文ですが、英語の話し手には頭が重く感じられます。英語には、すでにわかっている短い情報を前に、新しく重い情報を{{文の後ろ}}に置こうとする傾向があるからです。そこで主語の席に{{形式主語 it}} を置き、It is dangerous to swim in this river. とします。聞き手は「危険だ」という結論を先に受け取り、そのあとで「何が？」の答えを聞くことになります。that 節も同じで、It is surprising that he won the race.（彼がレースに勝ったのはおどろきだ）のように言います。",
        "目的語が長いときにも it が働きます。find・make・think などを使った {{SVOC}} の文では、目的語の位置に to 不定詞や that 節をそのまま置くことができません。そこで I found it easy to solve the puzzle.（そのパズルを解くのはやさしいとわかった）のように、目的語の席に{{形式目的語 it}} を置き、本当の目的語を文の後ろへ回します。I make it a rule to walk to school.（歩いて登校することにしている）も同じ形です。it は意味をほとんど持たないぶん、文の骨組みをととのえる「仮置きの札」として働いているのです。",
      ],
      cliff: "同じ「それ」なのに、it を使うと大まちがいになる場面があります。",
      figure: {
        type: "formula",
        title: "長い主語・目的語を後ろへ回す",
        prose: true,
        steps: [
          { expr: "{{To swim in this river}} is dangerous.", note: "主語が長く、頭でっかち" },
          { expr: "{{It}} is dangerous {{to swim in this river}}.", note: "形式主語 It を置き、本当の主語を後ろへ" },
          { expr: "I found {{it}} easy {{to solve the puzzle}}.", note: "形式目的語 it（found it easy）" },
        ],
      },
    },
    {
      heading: "it と one：同じ物か、同じ種類か",
      body: "前に出た名詞と{{まったく同じ物}}を指すのは it、{{同じ種類の別の物}}を指すのは one です。I lost my pen, and I can't find it. はなくしたペンそのもの、I lost my pen, so I bought a new one. は新しく買った別のペンです。one は数えられる名詞のかわりにだけ使い、複数なら ones になります。",
      reading: [
        "「ペン持ってる？」と聞かれて「うん、持ってるよ」と答えるとき、英語では Yes, I have {{one}}. と言います。ここで Yes, I have it. と言うと、「（あなたの言っている）そのペンを私が持っている」という意味になってしまいます。相手は特定のペンを指していないので、「ペンというものを1本」と言える one を使うのです。一方、Where's my pen? – I put {{it}} on your desk.（私のペンはどこ？―きみの机の上に置いたよ）では、話題になっているペンそのものなので it です。it は{{the ＋名詞}}、one は{{a ＋名詞}}のかわり、と考えるとわかりやすくなります。",
        "one は a のかわりなので、形容詞をつけて a red one（赤いの）、the one on the left（左のそれ）と言えます。複数のときは ones です（I like the blue ones.）。ただし one が代わりになれるのは{{数えられる名詞}}だけで、I prefer hot tea to cold. のように、数えられない名詞では one を使わず形容詞だけで済ませます。また、比べる文で「〜のそれ」と言うときは that を使います。The climate of Japan is milder than {{that}} of Canada.（日本の気候はカナダのそれより温和だ）の that は the climate のかわりで、複数なら those になります。",
        "代名詞が「同じ物」か「同じ種類の別の物」かを取りちがえると、話がまるで変わってしまいます。I lost my umbrella, so I bought it. と書けば「なくした傘を買った」というおかしな話になり、正しくは I bought a new {{one}}. です。英語の名作は、この区別を使って読者を迷わせずに物語を運びます。森で2本に分かれた道を前に立つフロストの旅人は、片方の道を looked down {{one}}（1本を見つめた）と言い、続けて To where {{it}} bent（それが曲がるところまで）と言います。one で「2本のうちの1本」を取り出し、it で「いま見つめているその道」を指し直しているのです。",
      ],
      cliff: "では、旅人が選んだ「もう1本の道」は、英語でどう呼ぶのでしょう？",
      figure: {
        type: "compare",
        title: "it と one のちがい",
        columns: [{ title: "it", tone: "blue" }, { title: "one", tone: "yellow" }],
        rows: [
          { label: "指すもの", cells: ["前に出たそのもの", "同じ種類の別の1つ"] },
          { label: "例", cells: ["I can't find it.", "I bought a new one."] },
          { label: "a・形容詞", cells: ["つけられない", "a new one とできる"] },
        ],
      },
    },
    {
      heading: "another・the other・the others は「残り」で決まる",
      body: "「1つは〜、もう1つは…」の言い方は、{{全部でいくつあるか}}と、{{残りが特定できるか}}で決まります。2つのうちの残り1つは決まっているので the other です。3つ以上の中で「別のもう1つ」は another、残り全部なら the others です。範囲を決めずに「〜する人もいれば、…する人もいる」は some 〜, others … です。",
      reading: [
        "「1つは〜、もう1つは…」という言い方は、{{全部でいくつあるか}}で決まります。2つしかなければ、1つを取り出したとたんに残りは1つに決まるので、{{the other}} です（I have two cats. One is black, and the other is white.）。3つ以上あるときに「別のもう1つ」と言うなら、まだほかにも残っているので {{another}}（an ＋ other）です。残りを全部まとめて言うなら {{the others}}、範囲を決めずに「〜する人もいれば、…する人もいる」と言うなら Some students walk to school, and {{others}} come by bus. です。the がつくのは、残りが「それで全部」と特定できるときだけ、と覚えておきましょう。",
        "この区別がみごとに生きている詩が、アメリカの詩人{{ロバート・フロスト}}（1874〜1963）の「{{選ばれなかった道}}（The Road Not Taken）」です。1916年の詩集『山の合間（Mountain Interval）』に収められました。フロストはイギリスで暮らしていたころ、散歩のたびに「どちらの道を行くか」で迷う友人の詩人エドワード・トマスと森を歩いており、その思い出がこの詩のもとになったと伝えられています。黄色く色づいた秋の森で、道が2本に分かれている。旅人は1本を見えるかぎり遠くまで見つめ、それから Then took {{the other}}（それから、もう1本のほうを選んだ）と語ります。",
        "ここで注目したいのは、詩人が2本の道に一度も名前をつけていないことです。それでも読者は迷いません。最初の行で「2本の道（Two roads）」と数が示されているので、1本を one で取り出し it で指したあと、残りは自動的に1本に決まり、the other と言えば「最初に見つめたのとは別の、もう1本」だと誰にでもわかります。もしここが another なら、読者は「3本目の道があったのか」と思ってしまうでしょう。詩の最後の連で旅人は、自分は人の通らないほうの道（the one less traveled by）を選んだ、と語ります。ここでも道の名前のかわりに、the と one が「どの道か」をぴたりと指しているのです。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "us",
        text: "Two roads diverged in a yellow wood,\nAnd sorry I could not travel both\nAnd be one traveler, long I stood\nAnd looked down one as far as I could\nTo where it bent in the undergrowth;\nThen took the other, as just as fair,\nAnd having perhaps the better claim,\nBecause it was grassy and wanted wear;",
        ja: "黄色く色づいた森の中で、道が二つに分かれていた。\n両方を行くことはできず、それが残念で、\nひとりの旅人である私は、長いこと立ちどまって、\n一方の道を、見とおせるかぎり先まで目で追った。\nその道が、下草のしげみへと曲がって見えなくなるところまで。\nそれから、もう一方の道を選んだ。こちらも同じくらい美しく、\nむしろ選ばれるべき理由があるように思えた。\n草がしげっていて、人に踏まれるのを待っているようだったから。",
        cite: "Robert Frost, \"The Road Not Taken\", lines 1–8 (Mountain Interval, 1916)",
        source: "https://www.gutenberg.org/ebooks/29345",
      }],
      photos: [
        {
          src: `${C}/two-paths-nh.webp`, width: 800, height: 600,
          alt: "落ち葉におおわれた秋の森で、太い木の幹の手前から小道が左右の2本に分かれている",
          caption: "10月のニューハンプシャー州の森で、左右に分かれる小道。フロストが長く暮らした地方の秋の森。2本しかないから、1本を選べば残りは the other に決まる。",
          credit: { author: "Nathan Wert", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0", source: "https://commons.wikimedia.org/wiki/File:Two_Paths_Diverged_in_a_wood.JPG" },
        },
      ],
      reveal: "フロストは最初の行で Two roads と{{数を示し}}、one で2本のうちの1本を取り出し、it で「いま見つめているその道」を指し直しました。2本しかないので、残りは1本に{{特定できる}}。だから the other と言うだけで、読者は「もう1本の道」だとわかるのです。代名詞は名前のかわりに、{{同じ物か別の物か・残りが決まっているか}}という「指し方」を運んでいるので、名前がなくても迷わないのです。",
      figure: {
        type: "tree",
        title: "残りをどう指すか",
        root: {
          label: "1つは one",
          tone: "navy",
          children: [
            { label: "全部で2つ", sub: "残りは1つに決まる", children: [{ label: "the other", tone: "yellow" }] },
            {
              label: "全部で3つ以上",
              children: [
                { label: "別のもう1つ", sub: "どれか1つ", children: [{ label: "another", tone: "blue" }] },
                { label: "残りの全部", sub: "特定できる", children: [{ label: "the others", tone: "red" }] },
              ],
            },
            { label: "範囲を決めない", sub: "some 〜, …", children: [{ label: "others" }] },
          ],
        },
        note: "the がつくのは、残りが「それで全部」と特定できるとき。",
      },
    },
  ],
  story: {
    kind: "manga4",
    title: "その傘は、イット？ワン？",
    panels: [
      {
        scene: "雨の放課後、昇降口。傘立ての前で立ちつくすリクと、それを見つけたナナ。",
        lines: [
          { who: "リク", text: "傘、なくした……" },
          { who: "ナナ", text: "新しいのを買えば？" },
          { who: "リク", text: "よし、イットを買う！" },
        ],
        art: {
          bg: "outdoor",
          cast: [
            { who: "リク", look: "boy", x: 256, face: "sweat", fx: "sweat" },
            { who: "ナナ", look: "girl", x: 84, face: "normal" },
          ],
          props: [
            { kind: "rain", x: 170, y: 200 },
          ],
        },
      },
      {
        scene: "ナナが「it」と書いた札を見せて、首をふる。",
        lines: [
          { who: "ナナ", text: "{{イット}}は、なくしたその傘" },
          { who: "ナナ", text: "それは売ってないよ" },
          { who: "リク", text: "えっ、そうなの!?" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ナナ", look: "girl", x: 256, face: "think", hand: [214, 222] },
            { who: "リク", look: "boy", x: 84, face: "surprise", fx: "!" },
          ],
          props: [
            { kind: "board", x: 170, y: 222, text: "it＝あの傘" },
          ],
        },
      },
      {
        scene: "ナナが札を書きかえる。リクがひらめく。",
        lines: [
          { who: "ナナ", text: "同じ種類の別の1本は{{ワン}}" },
          { who: "ナナ", text: "ア・ニュー・ワンだね" },
          { who: "リク", text: "なるほど！" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ナナ", look: "girl", x: 256, face: "smile", hand: [214, 222] },
            { who: "リク", look: "boy", x: 84, face: "smile", fx: "idea" },
          ],
          props: [
            { kind: "board", x: 170, y: 222, text: "new one" },
          ],
        },
      },
      {
        scene: "翌日。傘を2本買ってきたリク。かばんの中から、なくしたはずの傘が出てくる。",
        lines: [
          { who: "リク", text: "ワンは青、アナザーは赤！" },
          { who: "ナナ", text: "2本なら残りは{{ジ・アザー}}" },
          { who: "リク", text: "あ、かばんに{{イット}}が……" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "リク", look: "boy", x: 256, face: "surprise", fx: "!" },
            { who: "ナナ", look: "girl", x: 84, face: "sweat", fx: "sweat" },
          ],
          props: [
            { kind: "table", x: 0, y: 238 },
            { kind: "board", x: 170, y: 252, text: "残り→the" },
          ],
        },
      },
    ],
    note: "リクとナナは架空の高校生で、場面と会話は創作です。前に出たその物を指す it、同じ種類の別の物を指す one、2つのうちの残り1つを指す the other、3つ以上のうちの別の1つを指す another の使い分けは、英文法の事実にもとづいています。",
  },
  mistakes: [
    { wrong: "This bag is my.", right: "This bag is mine.", why: "「私のもの」は所有代名詞 mine。my は後ろに名詞が必要です。" },
    { wrong: "I lost my umbrella, so I have to buy it.", right: "I lost my umbrella, so I have to buy one.", why: "なくした傘そのものは買えません。同じ種類の別の物なので one です。" },
    { wrong: "I have two sisters. One is a nurse, and another is a cook.", right: "One is a nurse, and the other is a cook.", why: "2人のうち残りの1人は決まっているので the other を使います。" },
    { wrong: "We enjoyed at the party.", right: "We enjoyed ourselves at the party.", why: "enjoy は目的語が必要な動詞。「楽しむ」は enjoy oneself と再帰代名詞を置きます。" },
  ],
  check: [
    { q: "This isn't my notebook. It's ___.（彼女のもの）", a: "hers", why: "「〜のもの」は所有代名詞。she → hers。" },
    { q: "___ is important to sleep well.", a: "It", why: "本当の主語は to sleep well。形式主語 It を文頭に置く。" },
    { q: "There are three cups. One is white, and ___ are blue.（残り全部）", a: "the others", why: "3つ以上のうち、残り全部（特定できる）なので the others。" },
  ],
  next: [
    { label: "4択ドリル「代名詞」に挑戦", href: "/learn/eibunpo-ko/h-eng-gram-daimeishi" },
    { label: "つぎの単元「形容詞・副詞」", href: "/learn/eibunpo-ko/h-eng-gram-keiyoshi" },
    { label: "ひとつ前「名詞・冠詞」", href: "/learn/eibunpo-ko/h-eng-gram-meishi" },
  ],
};
