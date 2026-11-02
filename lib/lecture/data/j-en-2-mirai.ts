import type { Lecture } from "../types";

const C = "/media/commons/j-en-2-mirai";

export const J_EN_2_MIRAI: Lecture = {
  unit: "j-en-2-mirai",
  title: "未来は will ＋ 原形と be going to ＋ 原形。どちらも後ろは原形",
  hook: "「明日は雨が降るだろう」「週末は祖母の家に行く予定だ」。英語では、これからのことを will や be going to を使って表します。予定や予想を話す場面は毎日のようにあるので、2つの形と、その使い分けのコツをおさえましょう。",
  mystery: "『ピーター・パン』で、ピーターがウェンディを窓の外へさそう場面。「わたし、飛べないもの」と言われた瞬間、ピーターは I'll teach you.（教えてあげる）と答えます。未来の話なのに、なぜここは be going to ではなく will なのでしょう？　そもそも英語には、なぜ未来の言い方が2つもあるのでしょう？",
  mission: {
    from: "中学生の英語劇クラブの顧問の先生",
    request: "文化祭で『ピーター・パン』の英語劇をします。台本を読んだ部員に「I'll teach you. も I'm going to teach you. も同じ『教えるつもり』でしょ？　どっちで言ってもいいよね」と聞かれ、すぐには答えられませんでした。せりふの気持ちを正しく演じるために、名探偵のあなたに will と be going to のちがいのなぞを解いてほしいのです。",
    thanks: "will は「その場で決めた意志」、be going to は「もう動き出している流れ」だったのですね。ピーターの I'll teach you. は、ウェンディの一言を聞いてぱっと決めた、はずむような声で演じてもらいます。",
  },
  sections: [
    {
      heading: "will ＋ 動詞の原形で「〜するだろう・〜します」",
      body: "will は動詞の前に置く助動詞で、あとの動詞は{{必ず原形}}です。主語が he や she でも {{will の形は変わらず}}、あとの動詞にも -s はつきません。I will は {{I'll}}、will not は {{won't}} と短くできます。",
      reading: [
        "英語で「これから」のことを言う、いちばん基本の形が {{will＋動詞の原形}} です。It will rain tomorrow.（明日は雨が降るだろう）は予想、I will call you tonight.（今夜電話します）は自分の意志を表します。will は can と同じ{{助動詞}}なので、主語が he でも she でも形は変わらず、あとの動詞は必ず原形です。He will plays …… のように -s をつけるのは、いちばん多いまちがいです。会話では I'll・you'll・it'll のように短くなり、否定の will not は {{won't}}（ウォウント）になります。want（ほしい）と発音が近いので、聞き取りでは注意しましょう。",
        "will という語は、もともと古い英語で「〜したいと思う」という意味の動詞でした。今でも名詞の will は「意志」で、Where there's a will, there's a way.（意志あるところに道は開ける）ということわざがあります。「〜したい、〜しよう」という心の向きが、しだいに「これから〜する」「〜だろう」という未来の意味に広がっていきました。will の文に、どこか話し手の気持ちや見通しがにじむのは、このためです。",
        "この will が物語の最初の一文を支えている名作があります。スコットランド生まれの作家 J・M・バリーの『{{ピーター・パン}}』です。1904年にロンドンで劇として初演され、1911年に小説『ピーターとウェンディ』になりました。小説の書き出しは、All children, except one, grow up.（子どもはみんな大きくなる。ひとりをのぞいて）。続けて、子どもたちは自分が大きくなることを、やがて知る（they will grow up）と書きます。will は、だれにも止められない確かな未来を表しています。だからこそ、たった一人「大きくならない」少年の物語が、ふしぎに光るのです。",
      ],
      photos: [
        {
          src: `${C}/front.webp`, width: 800, height: 1138,
          alt: "子ども部屋の窓が開き、葉の服を着た少年が飛びこんでくる。ベッドで3人の子どもが眠り、床で小さな光が輝くペン画",
          caption: "小説『ピーターとウェンディ』（1911年）の口絵「ピーターが飛んできた」。眠るダーリング家の子ども部屋に、{{ピーター・パン}}と光る妖精が窓から入ってくる。",
          credit: { author: "Francis Donkin Bedford", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Peter_and_Wendy_(1911),_frontispiece.jpg" },
        },
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "All children, except one, grow up. They soon know that they will grow up, and the way Wendy knew was this. One day when she was two years old she was playing in a garden, and she plucked another flower and ran with it to her mother. I suppose she must have looked rather delightful, for Mrs. Darling put her hand to her heart and cried, “Oh, why can’t you remain like this for ever!” This was all that passed between them on the subject, but henceforth Wendy knew that she must grow up. You always know after you are two. Two is the beginning of the end.",
        ja: "子どもはみんな大きくなる。ひとりをのぞいて。子どもたちは、自分が大きくなるのだと、すぐに知る。ウェンディの場合はこうだった。2歳のある日、庭で遊んでいたウェンディは、花をもう1本つんで、母親のところへかけていった。きっと、とてもかわいらしく見えたのだろう。ダーリング夫人は胸に手を当てて叫んだ。「ああ、どうしてずっとこのままでいてくれないの！」　このことについて2人が交わしたのはそれだけだった。けれどそれからというもの、ウェンディは、自分は大きくならなければならないのだと知っていた。2歳をすぎると、だれでもわかるのだ。2歳は、終わりの始まりなのである。",
        cite: "J. M. Barrie, Peter and Wendy, Chapter 1 (1911)",
        source: "https://www.gutenberg.org/ebooks/16",
      }],
      figure: {
        type: "formula",
        title: "will を入れると、あとの動詞は原形にもどる",
        prose: true,
        steps: [
          { expr: "He {{plays}} tennis.", note: "現在：三単現の -s" },
          { expr: "He {{will play}} tennis tomorrow.", note: "will のあとは原形 play" },
          { expr: "He {{won't}} play tennis tomorrow.", note: "否定：will not＝won't" },
          { expr: "{{Will}} he play tennis tomorrow?", note: "疑問：Will を主語の前へ" },
          { expr: "— Yes, he {{will}}. / No, he {{won't}}.", note: "答えも will で" },
        ],
      },
      cliff: "未来を言うのに、なぜ英語は「行く」の going まで持ち出すのでしょう？",
    },
    {
      heading: "be going to ＋ 動詞の原形で「〜するつもりだ・〜しそうだ」",
      body: "be going to は、be動詞の部分が{{主語によって am・is・are}}に変わります。to のあとの動詞は原形です。否定文は be動詞のあとに not、疑問文は be動詞を主語の前に出すので、{{be動詞の文と同じ}}作り方になります。",
      reading: [
        "もう1つの未来の形が {{be going to＋動詞の原形}} です。I am going to visit my grandmother this weekend.（今週末、祖母を訪ねるつもりです）のように使います。be動詞は主語に合わせて am・is・are と変わり、to のあとは原形です。否定文は I'm not going to ……、疑問文は Are you going to ……? と、be動詞の文と同じ作り方をします。答えも Yes, I am. / No, I'm not. と be動詞で答えます。会話では going to がつまって「ガナ」のように聞こえることもあります。",
        "going は「行く」の進行形ですね。be going to は、もともと「〜をしに行くところだ、〜に向かって進んでいる途中だ」という意味でした。人がすでに目的地に向かって歩き出している様子から、「もう動き出していること」「このまま進めばそうなること」を表すようになったのです。だから be going to は、{{前から決めていた予定}}や、目の前の様子から「〜しそうだ」と言う{{根拠のある予想}}にぴったりです。Look at those black clouds. It's going to rain.（あの黒い雲を見て。雨が降りそうだ）は、その典型です。",
        "『ピーター・パン』にも、この「しそうだ」が出てきます。ネバーランドに着いたウェンディは、眠ったまま。迷子の少年たちは、彼女のために木の枝やこけで小さな家を建てようとしますが、どんな家が好きかわかりません。そのとき1人が「口が開いた！」と叫びます。それを見たピーターは、Perhaps she is going to sing in her sleep.（もしかすると、眠ったまま歌いだすところかも）。開いた口という{{目の前の根拠}}から、すぐ先に起こりそうなことを言う be going to です。",
      ],
      photos: [
        {
          src: `${C}/p108.webp`, width: 800, height: 1144,
          alt: "森の中、木の枝とこけでできた小さな家の前で、少年が剣をひざに置いて座っている。足もとで小さな妖精たちがおどるペン画",
          caption: "『ピーターとウェンディ』（1911年）の挿絵「見張りをするピーター」。迷子の少年たちがウェンディのために建てた{{小さな家}}の前で、ピーターが番をしている。",
          credit: { author: "Francis Donkin Bedford", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Peter_and_Wendy_(1911),_facing_p._108.jpg" },
        },
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "“Peter,” shouted another, “she is moving in her sleep.”\n“Her mouth opens,” cried a third, looking respectfully into it. “Oh, lovely!”\n“Perhaps she is going to sing in her sleep,” said Peter. “Wendy, sing the kind of house you would like to have.”",
        ja: "「ピーター」と別の子が叫んだ。「この子、眠ったまま動いてる」\n「口が開くよ」と3人目が、うやうやしく口の中をのぞきこんで言った。「わあ、かわいい！」\n「もしかすると、眠ったまま歌いだすところかもしれない」とピーターは言った。「ウェンディ、住みたい家を歌ってごらん」",
        cite: "J. M. Barrie, Peter and Wendy, Chapter 6 (1911)",
        source: "https://www.gutenberg.org/ebooks/16",
      }],
      figure: {
        type: "compare",
        title: "will と be going to の形のちがい",
        columns: [{ title: "will", tone: "blue" }, { title: "be going to", tone: "yellow" }],
        rows: [
          { label: "肯定", cells: ["She will go.", "She is going to go."] },
          { label: "否定", cells: ["She won't go.", "She isn't going to go."] },
          { label: "疑問", cells: ["Will she go?", "Is she going to go?"] },
          { label: "主語で", cells: ["形は変わらない", "am / is / are が変わる"] },
        ],
      },
      cliff: "では「教えてあげる」と言うとき、ピーターはどちらを選んだのでしょう？",
    },
    {
      heading: "使い分け：前から決めていた予定なら be going to",
      body: "{{前から決めていた予定}}は be going to がよく使われます。話しているその場で{{今決めたこと（意志）}}は will です。「〜だろう」という{{予想}}はどちらでも表せますが、黒い雲が出ているなど目の前に根拠があるときは be going to がよく使われます。中学のテストでは、まずは「どちらも未来を表す」と押さえ、書きかえができることが大切です。",
      reading: [
        "2つの形のちがいは、「いつ決めたか」で考えるとすっきりします。友だちに「宿題、どうするの？」と聞かれて、I'm going to do it after dinner.（夕食のあとにやるつもり）と答えるのは、前から決めてあった予定です。一方、電話が鳴って「だれか出て！」と言われ、I'll get it!（ぼくが出る！）と答えるのは、その場で決めたこと。ここで I'm going to get it と言うと、「前から電話に出るつもりだった」ような、ちょっとふしぎな感じになります。",
        "『ピーター・パン』のこの場面は、そのちがいを鮮やかに見せてくれます。真夜中の子ども部屋。ピーターはウェンディに「いっしょにネバーランドへ来て、迷子の少年たちにお話をしてよ」とさそいます。ウェンディはうれしいけれど、「お母さんのことを考えて。それに、わたし飛べないもの」と断ります。ピーターの答えは、たった3語の I'll teach you.（教えてあげる）。断られた瞬間に、ぱっと決めた{{その場の意志}}です。だから will なのです。",
        "ピーターはさらに I'll teach you how to jump on the wind's back（風の背中に飛び乗る方法を教えてあげる）とたたみかけます。will は「〜したい」から生まれた語でした。今この瞬間の「よし、そうしよう」という気持ちの勢いが、will にはこもっています。英語を話す人は、こうした使い分けをほとんど意識せずに、相手との会話の流れの中で自然に選んでいるのです。",
      ],
      photos: [
        {
          src: `${C}/p62.webp`, width: 800, height: 1137,
          alt: "雲の上の空を、少年と少女と2人の男の子が、鳥の群れといっしょに飛んでいるペン画",
          caption: "『ピーターとウェンディ』（1911年）の挿絵。ピーターに{{飛び方を教わった}}ウェンディと弟たちが、鳥たちといっしょにネバーランドへ向かって空を飛ぶ。",
          credit: { author: "Francis Donkin Bedford", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Peter_and_Wendy_(1911),_facing_p._62.jpg" },
        },
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "“Wendy, do come with me and tell the other boys.”\nOf course she was very pleased to be asked, but she said, “Oh dear, I can’t. Think of mummy! Besides, I can’t fly.”\n“I’ll teach you.”\n“Oh, how lovely to fly.”\n“I’ll teach you how to jump on the wind’s back, and then away we go.”",
        ja: "「ウェンディ、ぼくといっしょに来て、ほかの子たちにお話をしてよ」\nもちろん、さそわれてウェンディはとてもうれしかった。でも、こう言った。「まあ、だめよ。お母さんのことを考えて！　それに、わたし飛べないもの」\n「教えてあげる」\n「まあ、飛べたらどんなにすてきかしら」\n「風の背中に飛び乗る方法を教えてあげる。そしたら、さあ出発だ」",
        cite: "J. M. Barrie, Peter and Wendy, Chapter 3 (1911)",
        source: "https://www.gutenberg.org/ebooks/16",
      }],
      figure: {
        type: "tree",
        title: "未来のことをどちらで言う？",
        root: {
          label: "これからのこと",
          children: [
            { label: "前からの予定", sub: "もう決めてある", children: [{ label: "be going to", tone: "yellow" }] },
            { label: "その場で決めた", sub: "「じゃあ私がやる」", children: [{ label: "will", tone: "blue" }] },
            { label: "予想", sub: "〜だろう", children: [{ label: "どちらも可", sub: "根拠が目の前なら going to", tone: "plain" }] },
          ],
        },
      },
      reveal: "will はもともと「〜したい」という意味の語で、名詞では今も「意志」です。だから will は、話しているその瞬間に決めた{{その場の意志}}にぴったりです。一方 be going to は「〜に向かって進んでいる途中」から生まれ、{{前から決めていた予定}}や目の前の根拠のある予想を表します。飛べないと言われてぱっと決めたピーターの I'll teach you. は、will でなければならなかったのです。",
      cliff: "will には、相手の意志をたずねる使い方もあります。",
    },
    {
      heading: "Will you 〜? は「〜してくれませんか」にもなる",
      body: "Will you open the window? は「窓を開けてくれませんか」という{{依頼}}の意味でよく使います。答えは Sure.（いいですよ）や All right. などです。また、未来を表す文には tomorrow・next week・this weekend など{{未来の時を表すことば}}がよくいっしょに出てきます。",
      reading: [
        "will が「意志」の語だとわかると、Will you ……? の意味も見えてきます。Will you open the window? は、文字どおりには「あなたは窓を開ける意志がありますか」。そこから「窓を開けてくれませんか」という{{依頼}}になりました。答えは Sure.（いいよ）、All right.（わかった）、Of course.（もちろん）など。Will you come to my party?（パーティーに来てくれる？）のように、さそうときにも使えます。もっとていねいに頼むときは Would you ……? を使います。",
        "未来の文には、時を表すことばがよくいっしょに出てきます。tomorrow（明日）、next week（来週）、this weekend（今週末）、in the future（将来）、someday（いつか）などです。I'm going to start a band next year.（来年バンドを始めるつもり）のように、文の最後に置くのがふつうです。これらの語があれば、文の内容が未来だとすぐにわかります。",
        "『ピーター・パン』で、will がいちばん心に残るのは、ピーターが海の岩に取り残され、潮が満ちてくる場面かもしれません。こわくて胸がふるえたあと、ピーターは「死ぬことは、とてつもなく大きな冒険になるだろう」と、will を使って言いきります。大人にならない少年が、まだ見ぬ未来を、おそれではなく冒険として語る一文です。作者バリーは1929年、この作品の著作権をロンドンの子ども病院に寄付しました。物語は、子どもたちの未来を支え続けたのです。",
      ],
      photos: [
        {
          src: `${C}/statue.webp`, width: 800, height: 1067,
          alt: "木々に囲まれた公園で、角笛をふく少年の銅像が、妖精やウサギがからみつく岩の上に立っている",
          caption: "ロンドンのケンジントン公園にある{{ピーター・パン}}の像（1912年設置）。物語でピーターが暮らしたとされる公園に、バリーが作らせた。",
          credit: { author: "Mrs. Gemstone from USA", license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0", source: "https://commons.wikimedia.org/wiki/File:Statue_of_Peter_Pan,_Kensington_Gardens_(October_2016).jpg" },
        },
        {
          src: `${C}/theatre2.webp`, width: 800, height: 549,
          alt: "金色の装飾がほどこされた、劇場の円いバルコニー席を下から見上げた様子",
          caption: "ロンドンのデューク・オブ・ヨーク劇場の客席。1892年に開場し、1904年12月に劇『{{ピーター・パン}}』がここで初演された。",
          credit: { author: "Anthony O'Neil", license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0", source: "https://commons.wikimedia.org/wiki/File:Duke_of_York%27s_Theatre_-_geograph.org.uk_-_5242211.jpg" },
        },
      ],
    },
  ],
  story: {
    kind: "novel",
    title: "天井桟敷の拍手",
    paragraphs: [
      "1904年12月27日、ロンドン。13歳のアルフは、妹のネリーの手を引いて、デューク・オブ・ヨーク劇場のいちばん上、天井桟敷へ続く急な階段をのぼっていた。いちばん安い席でも、アルフには大金だった。年が明けて春になれば、アルフは印刷屋に見習いに出ることが決まっている。父さんはもう親方と話をつけていて、このところ口ぐせのように言う。You are going to start work in the spring.（春から、おまえは働きに出るんだ）。もう決まって動き出していることを言う{{be going to}}は、アルフの耳には、坂を下りはじめた重い荷車の音のように聞こえた。",
      "幕が上がると、子ども部屋の窓から、葉っぱの服の少年が飛びこんできた。演じているのは女の俳優だと、となりのおじさんがささやいた。少年は大人にならないと言い、子どもたちに飛び方を教える。ぴんと張った見えないワイヤーで、俳優たちが本当に宙へ浮かんだとき、天井桟敷じゅうから「おお」と声がもれた。ネリーはアルフの袖をにぎりしめて、まばたきもしなかった。",
      "やがて、小さな光で表された妖精が、毒を飲んで弱っていく場面になった。光はだんだん暗くなる。舞台の少年は客席のほうへ向き直り、妖精を信じるなら手をたたいて、と呼びかけた。劇場がしんと静まった。大人が、子どもの芝居に手をたたくのか。アルフはひざの上で両手をかたくした。来年から大人になるのに、と思った。",
      "そのとき、ネリーが小さな手を打った。ぱち、ぱち。前の席の紳士がたたいた。下の平土間から、波のような音がせり上がってきた。アルフは考えるより先に、手を打っていた。今、この瞬間に決めた。よし、たたく。I will.　その場で決めた{{will}}は、荷車の音ではなく、自分で踏み出す足音だった。光はふたたび明るくなり、劇場じゅうが笑い声でゆれた。",
      "帰り道、ガス灯の下で、ネリーが言った。「お兄ちゃん、わたしも飛べるかな」。アルフは笑って、ネリーの手を高く持ち上げた。「教えてやるよ」。春になれば、見習いの日々が始まる。その予定は変わらない。けれど、その先の未来を決めるのは自分だ、とアルフは思った。冬の空では、右から2番目の星が、ひときわ明るく光っていた。",
    ],
    note: "アルフとネリー、その家族と見習いの話、会話と心情は創作です。劇『ピーター・パン』が1904年12月27日にロンドンのデューク・オブ・ヨーク劇場で初演されたこと、ピーター役を女性の俳優が演じたこと、ワイヤーで俳優が宙を飛んだこと、光で表された妖精を救うため客席に拍手を呼びかける場面があることは、事実・原作にもとづいています。",
  },
  mistakes: [
    { wrong: "She will plays the piano.", right: "She will play the piano.", why: "will のあとの動詞は主語に関係なく原形です。" },
    { wrong: "I going to visit Kyoto.", right: "I am going to visit Kyoto.", why: "be going to の be動詞（am・is・are）を落とさないようにします。" },
    { wrong: "He is going to studies tonight.", right: "He is going to study tonight.", why: "to のあとも原形です。-s はつきません。" },
    { wrong: "Will you go there? — Yes, I do.", right: "Yes, I will.", why: "will でたずねられたら will で答えます。" },
  ],
  check: [
    { q: "I will clean my room. を be going to の文に書きかえましょう。", a: "I am going to clean my room.", why: "主語 I なので be動詞は am。to のあとは原形 clean。" },
    { q: "It will rain tomorrow. を否定文に。", a: "It won't (will not) rain tomorrow.", why: "will のすぐあとに not。" },
    { q: "Are they going to swim? に Yes で答えましょう。", a: "Yes, they are.", why: "be going to の疑問文には be動詞で答える。" },
  ],
  next: [
    { label: "4択ドリル「未来の表現」に挑戦", href: "/learn/eibunpo-chu/j-en-2-mirai" },
    { label: "will のなかまを広げる「助動詞」", href: "/learn/eibunpo-chu/j-en-2-jodoshi" },
    { label: "前の単元「過去進行形」", href: "/learn/eibunpo-chu/j-en-2-kako-shinko" },
  ],
};
