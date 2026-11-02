import type { Lecture } from "../types";

const C = "/media/commons/j-en-1-shinkokei";

export const J_EN_1_SHINKOKEI: Lecture = {
  unit: "j-en-1-shinkokei",
  title: "現在進行形は be動詞＋ing。「今まさにしている」動作を表す",
  hook: "電話で「今なにしてるの？」と聞かれて「テレビを見てるよ」と答える。そんな「今この瞬間」の動作を伝えるのが現在進行形です。I watch TV.（ふだん見る）との使い分けがわかると、英語の「時」の感覚がつかめてきます。",
  mystery: "『宝島』の作者スティーヴンソンが子どものために書いた4行の詩「雨」は、The rain is falling（雨が降っている）と進行形で始まります。ところが2行目では同じ雨を It falls と現在形で言いかえます。同じ雨なのに、なぜ形を変えたのでしょう？",
  mission: {
    from: "市立図書館で英語の詩の朗読会を開く司書",
    request: "来月、中学生向けに「英語の詩を声に出して読む会」を開きます。リハーサルで、ある生徒に「1行目は is falling なのに、2行目は falls。詩人のまちがいですか？」と聞かれ、うまく答えられませんでした。どんな気持ちで読めばいいかを伝えるために、名探偵のあなたに、この書き分けのなぞを解いてほしいのです。",
    thanks: "進行形は「目の前で今まさに起きている場面」、現在形は「雨というものがいつもすること」。これで生徒たちに、1行目は窓の外を見つめるように、2行目からは遠くの海まで思いえがくように読もう、と伝えられます。",
  },
  sections: [
    {
      heading: "形は「be動詞＋動詞の ing 形」",
      body: "現在進行形は{{am / are / is＋動詞の ing 形}}で「（今）〜している」を表します。be動詞は be動詞の文と同じく{{主語で決まり}}ます。be動詞と ing は2つでセットなので、どちらかを落とすと文になりません。",
      reading: [
        "現在進行形は、{{be動詞＋動詞の ing 形}}で「今〜している」を表します。She reads a book. は「彼女は（ふだん）本を読む」ですが、She is reading a book. にすると「彼女は今、本を読んでいる」になります。be動詞は、主語が I なら am、you や複数なら are、he・she・it や1人・1つなら is。be動詞の文と同じく{{主語で決まり}}ます。否定文は be動詞のあとに not、疑問文は be動詞を主語の前に出すだけで、do や does は使いません。",
        "進行形は、カメラで「今」を切りとるような形です。この力をみごとに使ったのが、イギリスの詩人ワーズワース（1770〜1850年）です。1802年4月、イングランド北西部の{{湖水地方}}を歩いていた彼は、ブラザーズ・ウォーターという湖のほとりの橋で休みながら、目の前の春の景色を短い詩に書きとめました。詩は「おんどりが鳴いている」で始まり、The stream is flowing（小川が流れている）、The cattle are grazing（牛たちが草を食べている）と、進行形が次々に出てきます。",
        "よく見ると、stream（小川）は1つなので is、cattle（牛たち）は複数なので are。主語に合わせて be動詞を選ぶきまりが、200年以上前の詩でもそのまま生きています。flowing と glitter、grazing と raising のように行の終わりの音をそろえる{{韻}}もふまれ、読むと春の景色が生中継のように目の前に広がります。なお doth glitter は今の英語の glitters（きらめく）にあたる古い言い方です。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "The stream is flowing,\nThe small birds twitter,\nThe lake doth glitter,\nThe green field sleeps in the sun;\nThe oldest and youngest\nAre at work with the strongest;\nThe cattle are grazing,\nTheir heads never raising;\nThere are forty feeding like one!",
        ja: "小川が流れている、\n小鳥がさえずり、\n湖がきらめき、\n緑の野は日ざしの中で眠る。\nいちばんの年寄りも、いちばんの若者も\n力じまんにまじって働いている。\n牛たちが草を食べている、\n頭を一度も上げないで。\n四十頭が、まるで一頭のように食べている！",
        cite: "William Wordsworth, \"Written in March, While resting on the Bridge at the Foot of Brother's Water\" (Poems in Two Volumes, 1807)",
        source: "https://www.gutenberg.org/ebooks/8824",
      }],
      photos: [
        {
          src: `${C}/brothers-water.webp`, width: 600, height: 450,
          alt: "緑の木々にかこまれた、石を積んだアーチ形の古い橋と、その下を流れる澄んだ川。奥に牧草地の山",
          caption: "イングランドの{{湖水地方}}、ブラザーズ・ウォーター近くの石橋（カウ橋）。ワーズワースはこの湖のほとりの橋で休みながら、進行形の多い春の詩を書いたと伝えられる。",
          credit: { author: "mauldy", license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0", source: "https://commons.wikimedia.org/wiki/File:Cow_Bridge_near_Brothers_Water_-_geograph.org.uk_-_1321549.jpg" },
        },
        {
          src: `${C}/wordsworth.webp`, width: 800, height: 981,
          alt: "黒い上着を着た白髪の老人が、腕を組んでうつむき、雲のたれこめた山の上に立つ油絵",
          caption: "ヘイドン『ヘルヴェリン山のワーズワース』（1842年）。自然の中を歩き、見たものをそのまま言葉にした詩人。晩年の姿をえがいた肖像。",
          credit: { author: "Benjamin Haydon", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Wordsworth_on_Helvellyn_by_Benjamin_Robert_Haydon.jpg" },
        },
      ],
      figure: {
        type: "formula",
        title: "She reads a book. を進行形にする",
        prose: true,
        steps: [
          { expr: "She {{reads}} a book.", note: "現在形：ふだん読む" },
          { expr: "She {{is reading}} a book.", note: "進行形：今読んでいる" },
          { expr: "She is {{not}} reading a book.", note: "否定文：be動詞のあとに not" },
          { expr: "{{Is}} she reading a book?", note: "疑問文：be動詞を主語の前へ" },
          { expr: "— Yes, she {{is}}. / No, she {{isn't}}.", note: "答えも be動詞で" },
        ],
        note: "否定文・疑問文は be動詞の文とまったく同じ作り方。do / does は使わない。",
      },
      cliff: "flowing・grazing……。ing のつけ方には、じつは3つのパターンがあります。",
    },
    {
      heading: "ing 形の作り方は3パターン",
      body: "ふつうは原形に{{ing}}をつけます。{{e で終わる語}}は e をとって ing（make → making）。{{短い母音＋子音字}}で終わる語は、最後の字を重ねて ing（run → running）です。play → playing のように y はそのまま残ります。",
      reading: [
        "ing 形の作り方は3つです。①ふつうは原形にそのまま{{ing}}をつけます（play → playing、read → reading、study → studying）。y で終わる語も y はそのまま残ります。②{{e で終わる語}}は、e をとって ing をつけます（make → making、write → writing、come → coming）。③「短い母音＋子音字」で終わる語は、最後の字を重ねて ing です（run → running、swim → swimming、sit → sitting、get → getting）。",
        "③で字を重ねるのは、読み方を守るためです。もし run にそのまま ing をつけて runing と書くと、英語のつづりのきまりでは「ルーニング」のように u を長く読まれやすくなります。子音字を2つ重ねると、前の母音は短いまま「ラニング」と読めるのです。②の e をとるのも、ing の i が e の代わりをしてくれるからです。つづりのきまりは、音を正しく伝えるための工夫なのです。",
        "イギリスで古くから歌われてきた{{マザーグース}}に、クリスマス前の町の様子を歌った4行の唄があります。Christmas is coming, the geese are getting fat（クリスマスがやって来る、ガチョウはまるまる太っていく）。coming は②（e をとる）、getting は③（t を重ねる）の形です。むかしのイギリスでは、ガチョウはクリスマスのごちそうでした。is coming は「今まさに近づいている」、are getting fat は「どんどん太っていく途中」。進行形が、待ちどおしい気持ちまで運んでいます。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "Christmas is coming, the geese are getting fat,\nPlease to put a penny in an old man's hat;\nIf you haven't got a penny a ha'penny will do,\nIf you haven't got a ha'penny, God bless you.",
        ja: "クリスマスがやって来る、ガチョウはまるまる太っていく、\nどうか、おじいさんの帽子に1ペニーを。\n1ペニーがなければ、半ペニーでけっこう。\n半ペニーもなければ、あなたに神さまのお恵みを。",
        cite: "Mother Goose, \"Christmas\" (The Real Mother Goose, 1916)",
        source: "https://www.gutenberg.org/ebooks/10607",
      }],
      figure: {
        type: "tree",
        title: "動詞の ing 形",
        root: {
          label: "動詞の原形",
          children: [
            { label: "そのまま ing", tone: "blue", children: [{ label: "playing" }, { label: "reading" }] },
            { label: "e をとって ing", tone: "yellow", children: [{ label: "making" }, { label: "writing" }] },
            { label: "字を重ねて ing", tone: "red", children: [{ label: "running" }, { label: "swimming" }] },
          ],
        },
      },
      cliff: "では、ing を使わない現在形とは、何がちがうのでしょう？",
    },
    {
      heading: "現在形と現在進行形のちがい",
      body: "現在形は{{ふだん・いつも}}くり返していること、現在進行形は{{今その場で}}している動作です。now や Look! があれば進行形の合図です。every day や usually があれば現在形を使います。",
      reading: [
        "I watch TV every day.（私は毎日テレビを見る）は、{{ふだん・いつも}}くり返している習慣です。今この瞬間にテレビを見ているとはかぎりません。I'm watching TV now.（私は今テレビを見ている）は、{{今その場で}}している途中の動作です。now（今）、Look!（見て）、Listen!（聞いて）は進行形の合図、every day、usually（たいてい）、often（よく）は現在形の合図になります。The sun rises in the east.（太陽は東からのぼる）のように、いつも変わらない事実も現在形で言います。",
        "この2つを、たった4行で使い分けた詩があります。『宝島』（1883年）で知られるスコットランドの作家{{スティーヴンソン}}（1850〜1894年）が、1885年に出した子どものための詩集『子どもの詩の園』の中の「雨」です。体が弱く、子どものころ病気でベッドの中ですごす日が多かった彼は、窓の外や心の中の世界を、子どもの目で短い詩にしました。",
        "詩は The rain is falling all around（雨があたり一面に降っている）と始まります。今、窓の外で降っている雨を、進行形で切りとった一場面です。ところが2行目からは It falls on field and tree（雨は野にも木にも降る）、It rains on the umbrellas here, / And on the ships at sea.（ここではかさの上に、そして海の船の上にも降る）と現在形になります。見えるはずのない遠い海の船にまで、思いが広がっていくところに注目しましょう。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "The rain is falling all around,\nIt falls on field and tree,\nIt rains on the umbrellas here,\nAnd on the ships at sea.",
        ja: "雨があたり一面に降っている。\n雨は野にも、木にも降る。\nここでは、かさの上に降り、\n海をゆく船の上にも降る。",
        cite: "Robert Louis Stevenson, \"Rain\" (A Child's Garden of Verses, 1885)",
        source: "https://www.gutenberg.org/ebooks/136",
      }],
      photos: [
        {
          src: `${C}/stevenson.webp`, width: 800, height: 663,
          alt: "黒い上着の細身の男性が、籐のいすに足を組んでゆったりと腰かけ、こちらを見ている油絵",
          caption: "サージェントがえがいた{{スティーヴンソン}}（1887年）。『宝島』の作者で、子どもの目で書いた詩集『子どもの詩の園』でも愛された。",
          credit: { author: "John Singer Sargent", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Robert_Louis_Stevenson_by_Sargent.jpg" },
        },
      ],
      figure: {
        type: "compare",
        title: "同じ「見る」でも意味がちがう",
        columns: [{ title: "現在形" }, { title: "現在進行形", tone: "yellow" }],
        rows: [
          { label: "表すこと", cells: ["ふだん・習慣", "今している最中"] },
          { label: "例文", cells: ["I watch TV every day.", "I'm watching TV now."] },
          { label: "合図の語", cells: ["every day / usually", "now / Look! / Listen!"] },
        ],
      },
      reveal: "詩人のまちがいではありません。1行目の is falling は、窓の外で{{今まさに}}降っている途中の雨をとらえる進行形です。2行目からの falls・rains は、雨というものが{{いつも}}野にも木にもかさにも降る、という姿を語る現在形と読めます。目の前の「今」から始まり、現在形に切りかえることで、見えないはずの遠い海の船まで心が広がっていく。2つの形の役割のちがいを、詩人は4行の中で使い分けていたのです。",
      cliff: "ところで、「今」好きでも I'm liking とは言いません。なぜでしょう？",
    },
    {
      heading: "進行形にしない動詞がある",
      body: "like（好きだ）、know（知っている）、want（ほしい）のように{{状態}}を表す動詞は、ふつう進行形にしません。「今好きだ」も I like it. です。ただし have は「持っている」なら進行形にしませんが、「食べる」の意味なら{{I'm having lunch.}}のように進行形にできます。",
      reading: [
        "進行形は「始まりと終わりがある動作の途中」を表す形です。ところが like（好きだ）、love（大好きだ）、know（知っている）、want（ほしい）、have（持っている）のような{{状態}}を表す動詞は、もともと「ずっとそうである」という意味をふくんでいます。そのため、わざわざ「途中」を表す進行形にする必要がなく、ふつうは I like this song.（私はこの歌が好きだ）、I know him.（私は彼を知っている）と現在形で言います。",
        "同じ動詞でも、意味によって変わるものがあります。have は「持っている」なら状態なので I have a dog. ですが、「食べる」の意味なら動作なので I'm having lunch.（私は今、昼ごはんを食べている）と進行形にできます。見分け方は、「今だけ始めて、もうすぐ終わる動作か」を考えることです。",
        "ただ、ことばのきまりは、わざと破ると目立ちます。2003年に始まった、大手ハンバーガーチェーンの世界共通の広告コピー I'm lovin' it は、ふつう進行形にしない love をあえて進行形にし、「今まさに、おいしさを味わっている最中！」という生き生きした気持ちを伝えました。lovin' は loving の g を落とした話しことばのつづりです。きまりを知っているからこそ、こうした工夫のおもしろさがわかります。",
      ],
      cliff: "lovin' のように g を落とした ing は、名曲や名画の題名にもたくさん登場します。",
    },
    {
      heading: "歌と映画の題名に生きる ing",
      body: "進行形や ing 形は、歌や映画の題名によく使われます。{{今まさに}}動いている場面が目にうかび、聞く人をその場に連れていくからです。話しことばでは ing の g を落として {{-in'}} と書くこともあります。",
      reading: [
        "1952年のアメリカ映画『雨に唄えば』（原題 Singin' in the Rain）では、主演のジーン・ケリーが土砂降りの中、かさを閉じて水たまりをはね上げながら歌いおどります。主題歌はもともと1929年に作られた歌で、題名の Singin' は singing の g を落とした話しことばの形です。「雨の中で歌っている」という{{今まさに}}の場面が、題名だけで目にうかびます。",
        "1960年代には、フォーク歌手ボブ・ディランが作った Blowin' in the Wind（風に吹かれて）が、世界中で歌われました。平和や自由を問いかけるこの歌の題名も、blowing の g を落とした形です。「答えは風の中で吹いている」という形の題名は、答えがつかめそうでつかめない、ゆれ動く気持ちを感じさせます。",
        "進行形は「今」を切りとる形でした。だからこそ詩人は春の景色を、歌は雨の中の喜びを、ing で書きとめてきたのです。ふだんの会話で I'm watching TV. と言うときも、あなたは同じように「今」を相手に中継しています。",
      ],
    },
  ],
  story: {
    kind: "manga4",
    title: "進行形は正直もの",
    panels: [
      {
        scene: "雨の放課後、教室。リコが、机で本を広げているユウタに声をかける。",
        lines: [
          { who: "リコ", text: "ユウタ、今なにしてる？" },
          { who: "ユウタ", text: "アイ・スタディ・イングリッシュ！" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "リコ", look: "girl", x: 256, face: "normal" },
            { who: "ユウタ", look: "boy", x: 84, face: "smile", hand: [130, 236] },
          ],
          props: [
            { kind: "table", x: 0, y: 240 },
            { kind: "book", x: 150, y: 222, s: 0.9 },
          ],
        },
      },
      {
        scene: "リコが黒板に「am＋ing」と書いてみせる。",
        lines: [
          { who: "リコ", text: "それは「ふだん勉強する」" },
          { who: "リコ", text: "今なら{{be動詞＋ing}}だよ" },
          { who: "ユウタ", text: "アイム・スタディイング！" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "リコ", look: "girl", x: 256, face: "smile", fx: "idea", hand: [210, 214] },
            { who: "ユウタ", look: "boy", x: 84, face: "surprise", fx: "!" },
          ],
          props: [
            { kind: "board", x: 170, y: 200, text: "am＋ing" },
          ],
        },
      },
      {
        scene: "リコがユウタの本をのぞきこむ。表紙はマンガだ。",
        lines: [
          { who: "リコ", text: "その本、なに？" },
          { who: "ユウタ", text: "アイム・ライキング・マンガ！" },
          { who: "リコ", text: "ライクは{{状態}}。進行形にしない" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "リコ", look: "girl", x: 250, face: "think", fx: "?" },
            { who: "ユウタ", look: "boy", x: 88, face: "sweat", fx: "sweat", hand: [134, 232] },
          ],
          props: [
            { kind: "table", x: 0, y: 240 },
            { kind: "book", x: 156, y: 222, s: 0.9 },
          ],
        },
      },
      {
        scene: "リコが腕を組んでにっこり。ユウタは小さくなって白状する。",
        lines: [
          { who: "リコ", text: "で、今ほんとは？" },
          { who: "ユウタ", text: "アイム・リーディング…マンガ" },
          { who: "リコ", text: "{{進行形}}は正直だね" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "リコ", look: "girl", x: 256, face: "smile" },
            { who: "ユウタ", look: "boy", x: 84, face: "sweat", fx: "sweat" },
          ],
          props: [
            { kind: "table", x: 0, y: 240 },
            { kind: "board", x: 170, y: 206, text: "reading" },
          ],
        },
      },
    ],
    note: "リコとユウタは架空の人物で、会話はすべて創作です。現在形は「ふだんのこと」、現在進行形は「今している最中」という使い分けと、like が状態を表す動詞であることは、英文法の事実にもとづいています。",
  },
  mistakes: [
    { wrong: "I playing soccer now.", right: "I am playing soccer now.", why: "進行形には be動詞が必要です。ing だけでは文になりません。" },
    { wrong: "He is play the piano.", right: "He is playing the piano.", why: "be動詞のあとの動詞は ing 形にします。" },
    { wrong: "Are you study now? / Do you studying now?", right: "Are you studying now?", why: "疑問文は be動詞を前に出し、動詞は ing 形のまま。do は使いません。" },
    { wrong: "I am knowing her.", right: "I know her.", why: "know は状態を表す動詞なので、ふつう進行形にしません。" },
  ],
  check: [
    { q: "swim の ing 形は？", a: "swimming", why: "短い母音＋子音字で終わるので m を重ねる。" },
    { q: "They eat lunch. を「今〜している」の文に。", a: "They are eating lunch (now).", why: "主語 they なので are、eat を eating に。" },
    { q: "Ken is running in the park. を疑問文にすると？", a: "Is Ken running in the park?", why: "be動詞 is を主語の前に出す。" },
  ],
  next: [
    { label: "4択ドリル「現在進行形」に挑戦", href: "/learn/eibunpo-chu/j-en-1-shinkokei" },
    { label: "復習「一般動詞」のレクチャー", href: "/learn/lecture/j-en-1-ippan" },
    { label: "中2「過去進行形」（was / were＋ing）", href: "/learn/eibunpo-chu/j-en-2-kako-shinko" },
  ],
};
