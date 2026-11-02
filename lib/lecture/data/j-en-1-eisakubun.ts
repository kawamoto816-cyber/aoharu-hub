import type { Lecture } from "../types";

const C = "/media/commons/j-en-1-eisakubun";

export const J_EN_1_EISAKUBUN: Lecture = {
  unit: "j-en-1-eisakubun",
  title: "英作文は「主語と動詞」を先に決め、英語の語順で並べる",
  hook: "「毎朝7時に起きます」を英語にしようとして、単語は知っているのに手が止まった経験はありませんか。日本語と英語は{{語順}}も、{{主語の扱い}}もちがいます。決まった手順で組み立てれば、中1で習った文法だけでも多くのことが書けるようになります。",
  mystery: "「メリーさんのひつじ」の英語の歌詞には、He followed her to school one day. という一行があります。日本語なら「ある日、学校についてきた」で済むのに、英語はなぜわざわざ He（ひつじのこと）を入れ、「ある日」を文のいちばん最後に回すのでしょう？",
  mission: {
    from: "英語の童謡絵本の翻訳家",
    request: "英語の童謡を、原詞と日本語訳を並べた絵本にしています。読者の小学生から「英語の歌には、どうしてひつじのことまで He って書いてあるの？　one day が最後なのはなぜ？」という手紙が届きました。次の巻の「英語のしくみ」のページに書くために、名探偵のあなたに英語の並べ方のなぞを解いてほしいのです。",
    thanks: "英語は助詞のかわりに「順番」で役目を決めるから、主語の席を空けられず、時の言葉はあとから足すのですね。これで絵本に「英語は主語→動詞の順で話す言葉」と、子どもにもわかる一行が書けます。",
  },
  sections: [
    {
      heading: "日本語にない主語を、まず決める",
      body: "日本語は「サッカーが好きです」のように主語をよく省きますが、英語の文には{{かならず主語}}が必要です。「だれが」の話なのかを考えて、I・you・Ken などの主語を補いましょう。「〜は」「〜が」がついていても、それが主語とは限りません。「私はサッカーが好き」の主語は I で、soccer は好きな{{相手}}です。",
      reading: [
        "「毎朝7時に起きます」「サッカーが好き」。日本語では、だれの話かがわかっていれば主語を言わないのがふつうです。ところが英語の文には、命令文などをのぞいて{{かならず主語}}が入ります。I get up at seven every morning.（私は毎朝7時に起きます）、I like soccer.（私はサッカーが好きです）。英作文の第一歩は、日本語にかくれている「だれが」を見つけ出し、I・you・he・she・we・they や人の名前を補うことです。",
        "気をつけたいのは「〜は」「〜が」です。「私はサッカーが好きです」には「は」と「が」が両方ありますが、主語は「私」＝ I で、サッカーは好きな{{相手}}です。英語にするときは「この文の動作や状態の持ち主はだれか」と考えると、主語を正しく選べます。天気や時刻のように持ち主がいない文でさえ、英語は It is rainy today.（今日は雨です）と、it を主語の席に置きます。英語にとって、主語の席はけっして空けられない場所なのです。",
        "主語を大切にする英語の感覚は、昔話の英訳にもよく表れています。2500年ほど前の古代ギリシャで語られたと伝えられる{{イソップ物語}}は、19世紀のイギリスでジョージ・タウンゼンドが英語に訳し、子どもたちに広く読まれました。「ウサギとカメ」の後半を見てみましょう。The Tortoise never for a moment stopped（カメは一瞬も止まらなかった）、The Hare … fell fast asleep（ウサギはぐっすり眠りこんだ）。文ごとに「だれが」が先頭に立ちます。目を覚ましたウサギの場面でも、he saw …（彼は見た）と he が入ります。日本語なら「目を覚まして、見ると……」と主語を言わずに進むところです。英語では、カメにもウサギにも、文ごとに主語の席が用意されているのです。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "The Tortoise never for a moment stopped, but went on with a slow but steady pace straight to the end of the course. The Hare, lying down by the wayside, fell fast asleep. At last waking up, and moving as fast as he could, he saw the Tortoise had reached the goal, and was comfortably dozing after her fatigue. Slow but steady wins the race.",
        ja: "カメは一瞬も止まらず、ゆっくりだが着実な足どりで、コースの終わりまでまっすぐ進んだ。ウサギは道ばたに寝そべって、ぐっすり眠りこんだ。ようやく目を覚まし、全速力で走ったが、見ればカメはもうゴールに着いて、疲れをいやしながら気持ちよさそうにうとうとしていた。ゆっくりでも着実な者が、競走に勝つ。",
        cite: "Aesop, \"The Hare and the Tortoise\" (Three Hundred Aesop's Fables, tr. George Fyler Townsend, 1867)",
        source: "https://www.gutenberg.org/ebooks/21",
      }],
      photos: [
        {
          src: `${C}/hare-tortoise.webp`, width: 800, height: 1038,
          alt: "上着を着たウサギが、首をのばして笑うカメを指さし、キツネや鳥たちがそれを見ている挿絵",
          caption: "ラッカムがえがいた「ウサギとカメ」（1912年）。英訳では The Tortoise / The Hare と、文ごとに{{主語}}が先頭に立って話が進む。",
          credit: { author: "Arthur Rackham", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Tortoise_and_hare_rackham.jpg" },
        },
      ],
      cliff: "主語が決まったら、次は単語をどんな順番で並べればいいのでしょう？",
    },
    {
      heading: "英語の語順は「だれが→どうする」が先",
      body: "日本語は動詞が最後に来ますが、英語は{{主語のすぐあとに動詞}}を置きます。そのあとに「何を」「どこで」「いつ」が続きます。「どこで」と「いつ」の両方があるときは、ふつう{{場所が先、時があと}}です。",
      reading: [
        "日本語は「私は　日曜日に　公園で　テニスを　します」と、動詞が{{最後}}に来ます。英語は反対に、I play tennis in the park on Sundays. と、{{主語のすぐあとに動詞}}を置き、そのあとに「何を」「どこで」「いつ」を続けます。「どこで」と「いつ」の両方があるときは、ふつう{{場所が先、時があと}}です。「だれが・どうする」という骨組みを先に言いきり、くわしい情報をうしろへ足していく並べ方だと考えると覚えやすいでしょう。",
        "なぜ英語は順番にこだわるのでしょう。日本語には「は・が・を・に」のような{{助詞}}があり、言葉の役目を助詞が教えてくれます。「ネコを犬が追いかけた」と順番を変えても、意味は変わりません。英語には助詞がないので、{{語順}}が役目を決めます。The dog chased the cat.（犬がネコを追いかけた）の dog と cat を入れかえると、The cat chased the dog.（ネコが犬を追いかけた）と、話がまるで逆になります。動詞の前が「だれが」、動詞のすぐあとが「何を・だれを」の席なのです。",
        "この並びがそのまま歌になったのが、アメリカの童謡「{{メリーさんのひつじ}}」です。1830年に作家セアラ・ジョセファ・ヘイルが子ども向けの詩集で発表したもので、ひつじが少女について学校へ来てしまった実際の出来事がもとになったとも伝えられます（最初の部分の作者には別の説もあります）。1877年、発明家エジソンは、自分で作った録音機（蓄音機）にこの歌を吹きこみ、再生してみせたといわれます。中1で習う単語ばかりの短い文が、人の声を記録する歴史の始まりにも選ばれたのです。",
        "He followed her to school one day; の一行を分解してみましょう。He（主語：ひつじのこと）→ followed（動詞：ついて行った）→ her（だれに：少女に）→ to school（どこへ：学校へ）→ one day（いつ：ある日）。日本語なら「ある日、学校についてきた」と主語を言わずに済むところを、英語はひつじにまで主語の席を用意し、場所→時の順に情報を足しています。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "us",
        text: "Mary had a little lamb,\nIts fleece was white as snow;\nAnd everywhere that Mary went,\nThe lamb was sure to go.\nHe followed her to school one day;\nThat was against the rule;\nIt made the children laugh and play\nTo see a lamb at school.",
        ja: "メリーは小さなひつじを飼っていた。\nその毛は雪のように白かった。\nメリーが行くところなら、どこへでも\nひつじはきっとついて行った。\nある日、ひつじは彼女について学校へ来た。\nそれは決まりに反することだった。\n学校にひつじがいるのを見て、\n子どもたちは笑ってはしゃいだ。",
        cite: "\"Mary Had a Little Lamb\" (Denslow's Mother Goose, 1901)",
        source: "https://www.gutenberg.org/ebooks/18546",
      }],
      photos: [
        {
          src: `${C}/mary-denslow1.webp`, width: 385, height: 506,
          alt: "黒板にチョークで少女とひつじの絵をかく男の子と、そのわきに印刷された英語の歌詞",
          caption: "『デンスロウのマザーグース』（1901年）の「メリーさんのひつじ」のページ。He followed her to school one day; は{{主語→動詞→だれに→どこへ→いつ}}の順。",
          credit: { author: "W. W. Denslow", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Mary_had_a_little_lamb_1_-_WW_Denslow_-_Project_Gutenberg_etext_18546.jpg" },
        },
        {
          src: `${C}/edison-phonograph.webp`, width: 800, height: 1008,
          alt: "テーブルの上の、筒とハンドルのついた機械に手をそえていすにすわる男性の白黒写真",
          caption: "エジソンと初期の蓄音機（1878年ごろ）。筒に巻いたすずはくに声のふるえを刻んで録音した。最初に吹きこんだのが「メリーさんのひつじ」だったといわれる。",
          credit: { author: "Levin C. Handy", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Edison_and_phonograph_edit2.jpg" },
        },
      ],
      figure: {
        type: "flow",
        title: "英文の基本の並び",
        dir: "col",
        steps: [
          { label: "だれが", sub: "主語　I", tone: "navy" },
          { label: "どうする", sub: "動詞　play", tone: "yellow" },
          { label: "何を", sub: "tennis" },
          { label: "どこで", sub: "in the park" },
          { label: "いつ", sub: "on Sundays", tone: "blue" },
        ],
        note: "I play tennis in the park on Sundays.（私は日曜日に公園でテニスをします）",
      },
      reveal: "英語には「は・が・を」のような助詞がなく、{{語順}}で「だれが」「何を」が決まります。だから主語の席は空けておけず、ひつじにも He という主語を置くのです。そして「主語→動詞→だれに・何を」で骨組みを先に言いきり、「どこへ」「いつ」はあとから足していくので、one day は文の最後に来ます。童謡の一行は、英語の設計図どおりに並んでいたのです。",
      cliff: "並べ方がわかったら、次は文の心臓、動詞の選び方です。",
    },
    {
      heading: "動詞を決めるときは2つを見分ける",
      body: "「〜です」「〜にいる」なら{{be動詞}}、「する・好きだ・持っている」など動作や気持ちなら{{一般動詞}}です。1つの文に be動詞と一般動詞を{{いっしょに使わない}}のが基本です。どちらかで、否定文・疑問文の作り方も変わります。",
      reading: [
        "主語のすぐあとに置く動詞は、大きく2種類あります。「〜です」「〜にいる・ある」は{{be動詞}}（am・are・is）、「する・好きだ・持っている」など動作や気持ちを表すのは{{一般動詞}}（play・like・have など）です。日本語の述語を見て、まずどちらの仲間かを決めましょう。I am a student.（私は生徒です）と I play the piano.（私はピアノをひきます）のように、ふつう1つの文の動詞は1つで、be動詞と一般動詞を{{いっしょに使わない}}のが基本です。I am play …… は、よくあるまちがいです。",
        "「メリーさんのひつじ」の最初の2行は、この2種類のお手本です。Mary had a little lamb.（メリーは小さなひつじを飼っていた）の had は have の過去形で一般動詞。Its fleece was white as snow.（その毛は雪のように白かった）の was は be動詞の過去形です。be動詞は「主語＝ようす」をつなぐイコールのような役目なので、was のあとに white（白い）というようすが来ます。「白かった」を英語にするとき、be動詞を忘れて Its fleece white. としないように気をつけましょう。",
        "動詞の種類によって、否定文と疑問文の作り方も変わります。be動詞なら is not ／ Is 〜?、一般動詞なら don't ／ Do 〜? を使います。英作文では「動詞の種類を決める→形を決める」の順で考えると、まちがいがぐっと減ります。",
      ],
      photos: [
        {
          src: `${C}/little-mary.webp`, width: 800, height: 1036,
          alt: "ひざの上に子ひつじをだいてすわる、巻き毛の小さな女の子の石版画。下に英語の歌詞が刷られている",
          caption: "石版画「小さなメリーとひつじ」（ニューヨーク、1877年）。下に刷られた Mary had は{{一般動詞}}、Its fleece was は{{be動詞}}の文。",
          credit: { author: "Currier & Ives", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Little_Mary_and_her_lamb_LCCN2002708573.jpg" },
        },
      ],
      figure: {
        type: "tree",
        title: "日本語から動詞の種類を決める",
        root: {
          label: "日本語の述語",
          children: [
            {
              label: "〜です・〜にいる",
              sub: "be動詞",
              tone: "blue",
              children: [{ label: "否定は is not", sub: "疑問は Is 〜?" }],
            },
            {
              label: "〜する・好き など",
              sub: "一般動詞",
              tone: "yellow",
              children: [{ label: "否定は don't", sub: "疑問は Do 〜?" }],
            },
          ],
        },
      },
      cliff: "動詞が決まったら最後の仕上げ。「いつ」と「だれが」で形が変わります。",
    },
    {
      heading: "最後に「時」と「主語」で動詞の形を整える",
      body: "並べ終わったら、動詞の形をチェックします。{{主語が3人称単数で現在}}なら s・es、{{今している}}なら be動詞＋ing、{{過去}}なら過去形です。最後に、文の最初が大文字か、ピリオドや「?」があるかも確かめましょう。",
      reading: [
        "並べ終えたら、動詞の形をチェックします。{{主語が3人称単数で現在}}の文なら、動詞に s・es をつけます（Ken plays tennis.）。{{今まさにしている}}ことなら be動詞＋ing（Ken is playing tennis now.）、{{過去}}のことなら過去形です（Ken played tennis yesterday.）。最後に、文の最初が大文字か、終わりにピリオドや「?」があるかも確かめましょう。",
        "過去の出来事を語るとき、英語は動詞を次々に過去形にして話を進めます。18世紀にはすでに本に印刷されていたマザーグースの「{{ジャックとジル}}」は、たった4行に went（行った）、fell（転んだ）、broke（割った）、came（来た）と、4つの過去形が並びます。どれも ed をつけない{{不規則動詞}}です。「丘をのぼった→転んだ→頭を打った→ジルも転がり落ちてきた」と、主語と動詞の組が、紙芝居をめくるように場面を動かしています。To fetch a pail of water は「水をおけにくむために」という意味です。",
        "名作の短い文は、英作文の最高のお手本です。だれが、どうした、何を、どこで、いつ。この順で並べ、最後に時と主語で動詞の形を整える。中1で習った文法だけで、200年以上前の子どもたちが口ずさんだ歌と同じ形の英文が書けるのです。まずは昨日の自分の出来事を、I で始まる短い文で3つ書いてみましょう。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "Jack and Jill went up the hill,\nTo fetch a pail of water;\nJack fell down, and broke his crown,\nAnd Jill came tumbling after.",
        ja: "ジャックとジルは丘をのぼった、\nおけに水をくみに。\nジャックは転んで、頭をぶつけ、\nジルもあとから転がり落ちた。",
        cite: "Mother Goose, \"Jack and Jill\" (The Real Mother Goose, 1916)",
        source: "https://www.gutenberg.org/ebooks/10607",
      }],
      figure: {
        type: "formula",
        title: "「ケンは昨日、公園でテニスをしました」",
        prose: true,
        steps: [
          { label: "主語", expr: "{{Ken}}", note: "だれが：ケン" },
          { label: "動詞", expr: "Ken {{play}} tennis", note: "どうする・何を" },
          { label: "語句", expr: "Ken play tennis {{in the park yesterday}}", note: "場所→時の順" },
          { label: "形", expr: "Ken {{played}} tennis in the park yesterday{{.}}", note: "昨日なので過去形に" },
        ],
      },
    },
  ],
  story: {
    kind: "manga4",
    title: "ひつじがメリーを飼っている",
    panels: [
      {
        scene: "放課後の教室。タクミが英語の日記を見せる。ユイがのぞきこんで首をかしげる。",
        lines: [
          { who: "タクミ", text: "英語の日記、できた！" },
          { who: "ユイ", text: "プレイドテニス…だれが？" },
          { who: "タクミ", text: "ぼくに決まってるじゃん" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "タクミ", look: "boy", x: 250, face: "smile", hand: [212, 222] },
            { who: "ユイ", look: "girl", x: 86, face: "think", fx: "?" },
          ],
          props: [
            { kind: "table", x: 0, y: 240 },
            { kind: "book", x: 172, y: 224, s: 0.9 },
          ],
        },
      },
      {
        scene: "ユイが札を立てて説明する。タクミはおどろく。",
        lines: [
          { who: "ユイ", text: "英語は{{主語}}を省けないの" },
          { who: "ユイ", text: "メリーのひつじもHeって呼ぶ" },
          { who: "タクミ", text: "ひつじまで主語！？" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ユイ", look: "girl", x: 254, face: "normal", hand: [214, 214] },
            { who: "タクミ", look: "boy", x: 84, face: "surprise", fx: "!" },
          ],
          props: [
            { kind: "table", x: 0, y: 240 },
            { kind: "board", x: 170, y: 214, text: "主語は必ず" },
          ],
        },
      },
      {
        scene: "タクミが首をひねる。ユイが札の「だれが→する」を指さす。",
        lines: [
          { who: "タクミ", text: "は・が・をは、どこに書くの？" },
          { who: "ユイ", text: "英語は{{順番}}が役目を決めるの" },
          { who: "ユイ", text: "主語のすぐあとに{{動詞}}！" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "タクミ", look: "boy", x: 252, face: "think", fx: "?" },
            { who: "ユイ", look: "girl", x: 84, face: "smile", fx: "idea", hand: [130, 214] },
          ],
          props: [
            { kind: "table", x: 0, y: 240 },
            { kind: "board", x: 170, y: 214, text: "だれが→する" },
          ],
        },
      },
      {
        scene: "タクミが歌詞の Mary と lamb を入れかえて読み、青ざめる。",
        lines: [
          { who: "タクミ", text: "順番くらい入れかえても…" },
          { who: "ユイ", text: "メリーとひつじを入れかえたら？" },
          { who: "タクミ", text: "ひつじがメリーを飼ってる！" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "タクミ", look: "boy", x: 254, face: "sweat", fx: "sweat" },
            { who: "ユイ", look: "girl", x: 82, face: "smile" },
          ],
          props: [
            { kind: "table", x: 0, y: 240 },
            { kind: "board", x: 170, y: 214, text: "羊がメリーを" },
          ],
        },
      },
    ],
    note: "タクミとユイは架空の中学生で、教室の場面と会話は創作です。「メリーさんのひつじ」の英語の歌詞（Mary had a little lamb / He followed her to school one day など）は、1901年の『デンスロウのマザーグース』に載っている本文にもとづいています。",
  },
  mistakes: [
    { wrong: "I am play tennis.", right: "I play tennis.", why: "「する」は一般動詞。be動詞といっしょには使いません。" },
    { wrong: "Ken like music.", right: "Ken likes music.", why: "主語が3人称単数で現在の文なので、動詞に s をつけます。" },
    { wrong: "I tennis play.", right: "I play tennis.", why: "日本語の順のまま並べています。英語は主語のすぐあとに動詞です。" },
    { wrong: "I very like dogs.", right: "I like dogs very much.", why: "「とても好き」は like 〜 very much。very は動詞の前に置けません。" },
  ],
  check: [
    { q: "「私の母は毎朝コーヒーを飲みます。」を英語に。", a: "My mother drinks coffee every morning.", why: "主語 my mother は3人称単数なので drinks。" },
    { q: "「私たちは今、教室にいます。」を英語に。", a: "We are in the classroom now.", why: "「いる」は be動詞。主語 we なので are。" },
    { q: "in the library と after school、文の最後に置くのはどっち？", a: "after school", why: "場所が先、時があと（I study in the library after school.）。" },
  ],
  next: [
    { label: "4択ドリル「英作文」に挑戦", href: "/learn/eigo-chu/j-en-1-eisakubun" },
    { label: "復習「一般動詞」のレクチャー", href: "/learn/lecture/j-en-1-ippan" },
    { label: "書ける単語をふやす「英単語」", href: "/learn/lecture/j-en-1-tango" },
  ],
};
