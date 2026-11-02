import type { Lecture } from "../types";

const C = "/media/commons/j-en-3-futeishi";

export const J_EN_3_FUTEISHI: Lecture = {
  unit: "j-en-3-futeishi",
  title: "不定詞の発展は「It is ～ to」「疑問詞＋to」「人＋to」の3つの型",
  hook: "「英語を話すのは楽しい」「料理のしかたを知りたい」「母は私に早く寝てほしいと思っている」。どれも中2で習った to＋動詞の原形を使えば言えますが、置く場所や組み合わせに決まった{{型}}があります。型を知ると、言いたいことをぐっと自然な英語にできます。",
  mystery: "1876年の小説『トム・ソーヤーの冒険』で、罰として塀ぬりを言いつけられたトム少年は、通りがかった友だちに「ぼくにもぬらせてよ」と頼ませ、りんごまで差し出させます。トムがしたのは、塀ぬりの話を英語の「ある型」で言いかえただけ。いったい何を、どう言いかえたのでしょう？",
  mission: {
    from: "中学校の英語劇クラブの顧問",
    request: "文化祭で、『トム・ソーヤーの冒険』の塀ぬりの場面を英語劇にします。ところが部員から「トムはただずるいだけ？　英語のせりふのどこに、友だちをその気にさせるしかけがあるの？」と聞かれ、演出が決まりません。どの言葉を強く言わせればよいかを決めるために、名探偵のあなたにトムの言いかえの秘密を解いてほしいのです。",
    thanks: "「言いつけ」の told me to を、「許されない特権」の wouldn't let him に言いかえていたのですね。本番では let him と let Sid をはっきり強く言わせて、客席にも魔法がかかる瞬間を見せます。",
  },
  sections: [
    {
      heading: "長い主語は It で先に置く",
      body: "To speak English is fun. は正しい文ですが、英語は{{頭が長い文}}をきらいます。そこで仮の主語 {{It}} を先に置き、本当の主語 to speak English をうしろに回して It is fun to speak English. とします。この It は「それ」と訳しません。「だれにとって」を言いたいときは、to の前に {{for＋人}} を入れます。",
      reading: [
        "中2で、to＋動詞の原形が「〜すること」という意味で主語になれると学びました。To read old novels is interesting.（古い小説を読むことはおもしろい）も正しい文です。けれども英語は、主語が長くて動詞がなかなか出てこない文を好みません。そこで文の頭に{{仮の主語 It}}を置き、It is interesting to read old novels. とします。この It は中身をうしろに預けた目印なので、「それは」とは訳しません。",
        "「だれにとって」をつけたいときは、to の直前に{{for＋人}}を入れます。It is easy for me to swim.（泳ぐのは私にとってかんたんだ）。for のあとは me・him・her・us・them のような目的格です。It is necessary to 〜（〜することが必要だ）は、このあと名作の中にも登場します。",
        "この単元では、アメリカの作家マーク・トウェインが1876年に出した小説『{{トム・ソーヤーの冒険}}』を読みながら、不定詞の型を味わいます。トウェインの本名はサミュエル・クレメンズ。1835年に生まれ、ミシシッピ川ぞいの町ハンニバルで少年時代を過ごし、のちに蒸気船の水先案内人として川を行き来しました。ペンネームの mark twain は、水深が「2尋（約3.7メートル）」あることを知らせる船乗りの呼び声だといわれます。物語の舞台セント・ピーターズバーグは、このハンニバルがモデルです。",
      ],
      photos: [
        {
          src: `${C}/title1876.webp`, width: 800, height: 546,
          alt: "開いた古い本。左のページに木の根もとにすわるはだしの少年の版画、右のページに題名 THE ADVENTURES OF TOM SAWYER BY MARK TWAIN",
          caption: "『トム・ソーヤーの冒険』アメリカ初版（1876年）の口絵と扉。絵は挿絵画家トゥルー・ウィリアムズ。川の町の少年の毎日を、生き生きとした話し言葉の英語でえがいた。",
          credit: { author: "True Williams", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:The_Adventures_of_Tom_Sawyer._Mark_Twain._1876.jpg" },
        },
      ],
      figure: {
        type: "formula",
        title: "「英語を話すことは私にとって楽しい」",
        prose: true,
        steps: [
          { expr: "{{To speak English}} is fun.", note: "主語が長い" },
          { expr: "{{It}} is fun {{to speak English}}.", note: "It を先に、to 以下をうしろへ" },
          { expr: "It is fun {{for me}} to speak English.", note: "「私にとって」は to の前に" },
        ],
        note: "for のあとの代名詞は me・him・her・us・them の形（目的格）にします。",
      },
      cliff: "土曜の朝、トムは長い塀と、ペンキのバケツを前にして途方にくれていました。",
    },
    {
      heading: "疑問詞＋to で「何を〜すべきか」",
      body: "how・what・where・when などの疑問詞のうしろに to＋動詞の原形を続けると、{{ひとまとまりの名詞}}になり、know や tell の目的語として使えます。とくに {{how to 〜（〜のしかた）}} はよく出ます。what to do は「何をすべきか」、where to go は「どこへ行けばよいか」です。",
      reading: [
        "{{疑問詞＋to＋動詞の原形}}は、「何を〜すべきか」「どう〜すればよいか」をひとかたまりの名詞にする形です。I don't know what to do.（何をすればいいかわからない）、Do you know how to use this machine?（この機械の使い方を知っていますか）。know・tell・learn などの目的語になります。{{how to}} は「しかた・方法」、what to は「何を」、where to は「どこで・どこへ」、when to は「いつ」です。",
        "物語の第2章。いたずらの罰として、トムはポリーおばさんに、土曜日に家の前の板塀を白くぬるよう言いつけられます。ほかの子どもたちは遊びに行く日です。塀は長く、バケツの白いしっくいは重い。Tom didn't know what to do.（トムは、どうしたらいいかわからなかった：ここは自作の例文）。そこへ、りんごをかじりながら、蒸気船のまねをして友だちのベンがやってきます。ベンは「働かされてるのか」とからかいます。",
        "ここでトムが返したのが、下のせりふです。Like it?（好きかって？）と相手の言葉をくり返し、「好きになっちゃいけない理由なんてないだろ」と開き直ります。そして決めのひとこと、Does a boy get a chance to whitewash a fence every day?（男の子が塀をぬるチャンスなんて、毎日あるかい？）。a chance to whitewash は中2で学んだ「〜する（ための）」の不定詞です。トムは「何と言えばよいか」を見つけたのです。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "us",
        text: "\"Oh come, now, you don't mean to let on that you like it?\"\nThe brush continued to move.\n\"Like it? Well, I don't see why I oughtn't to like it. Does a boy get a chance to whitewash a fence every day?\"",
        ja: "「おいおい、まさか、それが好きだなんて言うつもりじゃないだろうな？」\nはけは、止まらずに動きつづけた。\n「好きかって？　そうだな、好きになっちゃいけない理由なんて、ぼくには見あたらないね。男の子が塀をぬるチャンスなんて、毎日あるかい？」",
        cite: "Mark Twain, The Adventures of Tom Sawyer, Chapter II (1876)",
        source: "https://www.gutenberg.org/ebooks/74",
      }],
      figure: {
        type: "compare",
        title: "疑問詞＋to の意味",
        columns: [{ title: "意味", tone: "yellow" }, { title: "例" }],
        rows: [
          { label: "how to", cells: ["〜のしかた", "how to cook"] },
          { label: "what to", cells: ["何を〜すべきか", "what to buy"] },
          { label: "where to", cells: ["どこへ〜すべきか", "where to go"] },
          { label: "when to", cells: ["いつ〜すべきか", "when to start"] },
        ],
        note: "例：I don't know what to say.（何と言えばよいかわからない）",
      },
      cliff: "からかっていたベンは、やがてトムに「あること」を頼みはじめます。",
    },
    {
      heading: "want・tell・ask＋人＋to",
      body: "「（人）に〜してほしい」「（人）に〜するように言う」のように、{{動作をするのが主語ではなく別の人}}のときは、動詞のあとに人を置いてから to＋動詞の原形を続けます。I want {{you to come}}. では、来るのは I ではなく you です。人の部分は me・him・her などの目的格にします。",
      reading: [
        "I want to go. と I want {{you to go}}. をくらべてみましょう。前の文で行くのは I、うしろの文で行くのは you です。動詞と to のあいだに「人」をはさむと、その人が to 以下の動作をする人になります。{{want＋人＋to}} は「人に〜してほしい」、{{tell＋人＋to}} は「人に〜するように言う」、{{ask＋人＋to}} は「人に〜するように頼む」。人の部分は目的格です。My teacher told us to read this book.（先生は私たちにこの本を読むように言った）。",
        "この型で、塀ぬりの場面を整理してみます（ここからの英文は自作です）。Aunt Polly told Tom to whitewash the fence.（ポリーおばさんはトムに塀をぬるよう言いつけた）。ぬるのはおばさんではなくトムです。そしてトムの返事を聞いたベンは、やがて態度を変えます。Ben asked Tom to let him whitewash.（ベンはトムに、自分にもぬらせてくれと頼んだ）。さっきまで笑っていたベンが、今度は頼む側に回ったのです。",
        "命じられた仕事は、だれにとってもあまり楽しくありません。トムはこの「言いつけられた仕事」を、別の型を使って、まったくちがう姿に見せかけます。そのしかけが、次の節の let です。",
      ],
      photos: [
        {
          src: `${C}/aunt-polly.webp`, width: 800, height: 1735,
          alt: "高い板塀を乗りこえようとする、はだしの少年。手前でスカートをつまんだ年配の女性がおどろいてふり返っている版画",
          caption: "初版（1876年）の挿絵。板塀を乗りこえてにげるトムと、ポリーおばさん。こうしたいたずらの罰として、トムは塀ぬりを{{言いつけられる}}（tell＋人＋to）。",
          credit: { author: "True Williams", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Adventure_of_Tom_Sawyer-pg028.png" },
        },
      ],
      figure: {
        type: "compare",
        title: "動詞＋人＋to の3つ",
        columns: [{ title: "want", tone: "blue" }, { title: "tell", tone: "yellow" }, { title: "ask", tone: "red" }],
        rows: [
          { cells: ["人に〜してほしい", "人に〜するよう言う", "人に〜するよう頼む"] },
          { cells: ["I want you to help.", "He told me to wait.", "I asked her to sing."] },
        ],
      },
      cliff: "ベンの頼みの英語には、to がありません。そこにトムの作戦のかぎがあります。",
    },
    {
      heading: "let・make・help は to をつけない",
      body: "同じ「動詞＋人＋動作」の形でも、let（〜させてあげる）・make（〜させる）・help（〜するのを手伝う）のあとは、{{to のない動詞の原形}}を置きます。Let me {{try}}.（私にやらせて）、My mother made me {{clean}} my room.（母は私に部屋をそうじさせた）のようになります。",
      reading: [
        "{{let＋人＋原形}}は「（人が望むことを）させてあげる・許す」、{{make＋人＋原形}}は「（いやでも）させる」、{{help＋人＋原形}}は「〜するのを手伝う」です。どれも人のあとに to をつけません。Let me introduce myself.（自己紹介させてください）、The movie made me cry.（その映画は私を泣かせた）、I helped my father wash the car.（父が車を洗うのを手伝った）。とくに let と make は、同じ「させる」でも、本人が望んでいるか、望んでいないかで正反対です。",
        "下の場面で、ベンは Say, Tom, let me whitewash a little.（なあトム、ちょっとぬらせてよ）と言いだします。トムは一度ことわり、ポリーおばさんはこの通りに面した塀にとてもうるさいのだと説明します。ベンが lemme just try（ちょっとだけやらせて。lemme は let me のくだけた発音）とねばると、トムは「ジムもやりたがったけど、おばさんは let him しなかった。シドもやりたがったけど let Sid しなかった」と答えます。ベンの I'd let you, if you was me（ぼくが君なら、君にやらせてあげるのに）は、仮定法の were を was と言ってしまう、子どもらしい話し言葉です。",
        "結局ベンはりんごを差し出して塀をぬらせてもらい、そのあとも通りかかる少年たちが、たこやビー玉など自分の宝物を払って順番を待ちました。トムの言葉が変えたのは、塀ぬりそのものではありません。同じ作業を、「言いつけ」の型から「許可」の型へ言いかえたことで、見る人の心の中の値打ちが入れかわったのです。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "us",
        text: "\"Say, Tom, let me whitewash a little.\"\n……\n\"Oh come, now—lemme just try. Only just a little—I'd let you, if you was me, Tom.\"\n\"Ben, I'd like to, honest injun; but Aunt Polly—well, Jim wanted to do it, but she wouldn't let him; Sid wanted to do it, and she wouldn't let Sid.\"",
        ja: "「なあ、トム、ちょっとぬらせてよ」\n……\n「いいだろ、ちょっとやらせてみてよ。ほんの少しだけ。ぼくが君だったら、君にやらせてあげるのにさ、トム」\n「ベン、そうしてあげたいのは山々なんだ、うそじゃない。でもポリーおばさんがね……ジムもやりたがったけど、おばさんはやらせなかった。シドもやりたがったけど、シドにもやらせなかったんだ」",
        cite: "Mark Twain, The Adventures of Tom Sawyer, Chapter II (1876)",
        source: "https://www.gutenberg.org/ebooks/74",
      }],
      figure: {
        type: "tree",
        title: "人のあとの動詞の形",
        root: {
          label: "動詞＋人＋動作",
          children: [
            { label: "to＋原形", sub: "want / tell / ask", tone: "blue", children: [{ label: "tell him to go" }] },
            { label: "原形だけ", sub: "let / make / help", tone: "yellow", children: [{ label: "let him go" }] },
          ],
        },
        note: "help は to をつけた help him to carry も使われますが、中学では原形の形で覚えます。",
      },
      reveal: "おばさんの側から見れば、塀ぬりは Aunt Polly told Tom to whitewash の、{{tell＋人＋to}}で言いつけられた仕事でした。ところがトムは、それを she wouldn't let him（おばさんはジムにやらせなかった）と、{{let＋人＋原形}}の「許可」の型で語りなおしました。言いつけられた義務が、だれもが許されるわけではない特権に見えたとたん、ベンのほうから let me と頼んだのです。",
      cliff: "トウェインは、この場面の「教訓」を、It is ～ to の1文にまとめています。",
    },
    {
      heading: "仕事を遊びに変えた1文",
      body: "トウェインは塀ぬりの場面のあと、トムが知らずに見つけた「人間の行動の大きな法則」を、{{It is only necessary to 〜}}（〜しさえすればよい）の形でまとめました。不定詞の型は、物語の教訓をひと息で言い切る道具にもなります。",
      reading: [
        "塀ぬりが終わったとき、トムの手もとには、りんご、たこ、ビー玉、ガラスのかけらなど、子どもの宝物が山のように集まっていました。語り手はそこで、トムが発見した法則を下の1文にまとめます。in order to make a man or a boy covet a thing（大人でも子どもでも、人にあるものをほしがらせるには）、it is only necessary to make the thing difficult to attain（それを手に入れにくくしさえすればよい）。in order to は「〜するために」という目的、covet は「強くほしがる」、attain は「手に入れる」という意味です。",
        "後半の it is only necessary to make …… は、この単元の{{仮の主語 It}}の形そのものです。It is only necessary（必要なのはたったこれだけ）と先に言い切るから、読者は「何が？」と身を乗り出し、うしろの答えにうなずけるのです。make the thing difficult（それをむずかしくする）は「make＋もの＋形容詞」で、前の節の「make＋人＋原形」とはちがう形です。",
        "トウェインはさらに、仕事とは「しなければならないこと」、遊びとは「しなくてもよいこと」だ、と続けます。同じ塀ぬりでも、言いつけられれば仕事、許されれば遊びになるというわけです。『トム・ソーヤーの冒険』は今も世界中で読まれ、1884〜85年には、トムの友だちハックを語り手にした『ハックルベリー・フィンの冒険』も出版されました。ハンニバルには少年時代の家が博物館として残り、塀ぬりの場面にちなむ白い板塀が立っています。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "us",
        text: "Tom said to himself that it was not such a hollow world, after all. He had discovered a great law of human action, without knowing it—namely, that in order to make a man or a boy covet a thing, it is only necessary to make the thing difficult to attain.",
        ja: "結局のところ、世の中はそれほどつまらないものでもないな、とトムは心の中で思った。トムは自分でも気づかないうちに、人間の行動の大きな法則を見つけていたのだ。すなわち、大人でも子どもでも、人にあるものを強くほしがらせるには、それを手に入れにくくしさえすればよい、ということである。",
        cite: "Mark Twain, The Adventures of Tom Sawyer, Chapter II (1876)",
        source: "https://www.gutenberg.org/ebooks/74",
      }],
      photos: [
        {
          src: `${C}/boyhood-home.webp`, width: 800, height: 540,
          alt: "白い板張りの2階建ての家と、その前の歩道ぞいに続く白い板塀",
          caption: "ミズーリ州ハンニバルに残る、トウェインの少年時代の家（博物館）。家の前の白い板塀は、{{塀ぬりの場面}}にちなむもの。",
          credit: { author: "Cindy Lovell Oliver", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Boyhood_home_and_fence.jpg" },
        },
        {
          src: `${C}/twain1902.webp`, width: 800, height: 600,
          alt: "古い白黒写真。板張りの家の戸口に白い服の男性が立ち、手前でカメラをかまえた人々が集まっている",
          caption: "1902年5月、ハンニバルの少年時代の家の戸口に立つトウェイン（中央、白い服）。66歳で故郷を訪れ、写真をとる人々に囲まれた。",
          credit: { author: "Anna M. Schnitzlein", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Samuel_Clemens_(Mark_Twain)_in_doorway_of_his_Hannibal,_Missouri_home,_May_12,_1902.jpg" },
        },
      ],
    },
  ],
  story: {
    kind: "novel",
    title: "薪の山と、Let me",
    paragraphs: [
      "1877年の春、ミズーリ州の川ぞいの小さな町。十二歳のエディの家に、予約販売の外交員が一冊の本を届けた。表紙には『トム・ソーヤーの冒険』。ミシシッピ川の町の男の子の話だと聞いて、エディはその夜、ランプの油が切れるまでページをめくった。",
      "翌朝、台所から母さんの声がした。「エディ、お昼までに裏の薪を全部、小屋に積んでおきなさい」。エディは思わずため息をついた。英語で言えば Mother told me to stack the wood. 積むのは母さんじゃない、ぼくだ。窓の外では、幼なじみのジョーとルーシーが釣りざおをかついで川へ向かっている。",
      "薪の山の前で、エディはしばらく立ちつくした。I didn't know what to do. そのとき、ゆうべ読んだ第2章を思い出した。塀ぬりを言いつけられたトムが、友だちにりんごまで払わせた、あの場面だ。エディは背すじをのばし、一本一本、切り口の向きをそろえて、口笛まじりに積みはじめた。",
      "「土曜に薪積み？　かわいそうに」とジョーが笑った。エディはふり返りもせずに答えた。「かわいそう？　まっすぐ積むのは、だれにでもできることじゃないんだ。It isn't easy to stack wood straight. 去年、弟もやりたがったけど、母さんはやらせなかった」。ジョーの目つきが変わった。「……なあ、エディ。Let me try. ちょっとだけ」。ルーシーまで「How to をわたしにも教えて」と言いだし、二人はビー玉と釣り針を差し出した。",
      "お昼前、薪はみごとに積み上がっていた。ところが、手の中のビー玉を見ているうちに、エディの胸はなぜか重くなってきた。トムは得意げだったけれど、ジョーは本気で楽しそうに汗をかいていたのだ。エディはビー玉を返し、「午後は三人で川へ行こう」と言った。二人は「もう少し積みたかったのに」と口をとがらせた。",
      "その夜、エディはもう一度、第2章を開いた。仕事とは、しなければならないこと。遊びとは、しなくてもいいこと。同じ薪積みでも、told me to と言えば仕事になり、let me と言えば遊びになる。エディはくすっと笑って、本を閉じた。明日は、自分から言ってみよう。Let me help you, Mother.",
    ],
    note: "エディ、ジョー、ルーシーと町の場面、会話や心情はすべて創作です。『トム・ソーヤーの冒険』が1876年に出版され、アメリカでは予約販売で売られたこと、第2章の塀ぬりの筋と「仕事と遊び」の教訓は事実・原作にもとづいています。",
  },
  mistakes: [
    { wrong: "It is difficult for I to swim.", right: "It is difficult for me to swim.", why: "for のあとは目的格。I ではなく me にします。" },
    { wrong: "I want that you come.", right: "I want you to come.", why: "「人に〜してほしい」は want＋人＋to＋原形。that の文は使いません。" },
    { wrong: "Let me to try.", right: "Let me try.", why: "let・make のあとは to をつけない原形です。" },
    { wrong: "I don't know how cook it.", right: "I don't know how to cook it.", why: "「〜のしかた」は how to＋原形。to を落とさないこと。" },
  ],
  check: [
    { q: "To play the piano is easy for her. を It で始めて書きかえると？", a: "It is easy for her to play the piano.", why: "仮の主語 It を先に置き、to 以下をうしろへ回す。" },
    { q: "「先生は私たちに静かにするように言った」の ( )：The teacher told ( ) ( ) be quiet.", a: "us / to", why: "tell＋人（目的格）＋to＋原形。" },
    { q: "「どこで電車に乗ればいいか」を英語にしましょう。", a: "where to take the train", why: "疑問詞 where＋to＋動詞の原形。" },
  ],
  next: [
    { label: "4択ドリル「不定詞の発展」に挑戦", href: "/learn/eibunpo-chu/j-en-3-futeishi" },
    { label: "ふりかえり「不定詞」（中2）のレクチャー", href: "/learn/lecture/j-en-2-futeishi" },
    { label: "つぎの単元「分詞の後置修飾」", href: "/learn/lecture/j-en-3-bunshi" },
  ],
};
