import type { Lecture } from "../types";

const C = "/media/commons/h-eng-gram-domeishi";

export const H_ENG_GRAM_DOMEISHI: Lecture = {
  unit: "h-eng-gram-domeishi",
  title: "動名詞は「〜すること」を名詞として使う形。to 不定詞との使い分けがカギ",
  hook: "趣味を聞かれて I like playing the guitar. と答えるとき、playing は「ひくこと」という名詞のはたらきをしています。動名詞は、不定詞とよく似ているのに、動詞によっては片方しか使えなかったり、意味が変わったりします。そのちがいの理由をつかむと、入試の4択がぐっと解きやすくなります。",
  mystery: "ダーウィン『種の起源』（1859年）の結びの段落には、singing、crawling、conceiving、cycling と -ing の語がいくつも並びます。ところが、その中で「名詞の席」に座っている動名詞は、じつはたった1つ。見た目がまったく同じ -ing を、どうやって見分ければよいのでしょう？",
  mission: {
    from: "自然史博物館の展示翻訳スタッフ",
    request: "来春のダーウィン展で、『種の起源』の結びの段落を英語のまま大きなパネルにし、日本語訳をそえる予定です。ところが -ing の語があまりに多く、どれを「〜すること」と訳すべきかで、翻訳チームの意見が割れてしまいました。名探偵のあなたに、同じ形の -ing を見分ける決め手を見つけてほしいのです。",
    thanks: "決め手は「名詞の席にいるかどうか」だったのですね。of のあとの conceiving だけを「思いえがくこと」と訳し、ほかは「さえずる鳥」のように訳し直したら、パネルの日本語がぐっと自然になりました。",
  },
  sections: [
    {
      heading: "動名詞は名詞の席ならどこにでも座れる",
      body: "動名詞は動詞の {{-ing 形}}で「{{〜すること}}」を表し、文の中で名詞と同じ働きをします。主語・目的語・補語になれるほか、不定詞とちがって{{前置詞の後ろ}}にも置けます。動詞の性質も残っているので、後ろに目的語や副詞をつなげられます。",
      reading: [
        "英語の文には、名詞しか座れない「席」があります。文の頭の主語、動詞のあとの目的語、be 動詞のあとの補語、そして前置詞のあとです。動詞をそのままこの席に座らせることはできないので、英語は動詞に -ing をつけて名詞の顔をさせます。これが{{動名詞}}です。Reading novels is my favorite way to relax.（小説を読むことが、いちばんのくつろぎ方だ）では、Reading が主語の席に座っています。",
        "ただし、動名詞は名詞になりきったわけではありません。reading novels のように目的語をとり、reading quietly のように副詞もつけられます。名詞の席に座りながら、動詞としての手足も残している。この「半分名詞、半分動詞」という性質が、動名詞のいちばんの特徴です。to 不定詞も「〜すること」を表せますが、{{前置詞の後ろ}}には置けません。前置詞のあとに動作を入れたいときは、動名詞しか選べないのです。",
        "1813年に出たジェーン・オースティンの『高慢と偏見』に、この使い分けが一文にまとまった見本があります。田舎町に、独身の資産家ビングリーが引っ越してきて、町の舞踏会に現れた場面です。下の一文は To be fond of という to 不定詞の主語で始まり、前置詞 of と towards のあとには dancing と falling という動名詞が座っています。「ダンス好きなら恋は目前」という町の人たちの早合点を、作者は少し皮肉な目で書いています。前置詞のあとに次々と -ing が続くリズムが、うわさが一足飛びに広がっていく速さそのものです。",
      ],
      photos: [
        {
          src: `${C}/thomson-dancing.webp`, width: 800, height: 931,
          alt: "舞踏会で、すらりとした若い男女の前で、年配の男性が身をかがめて愛想よく話しかけているペン画",
          caption: "ヒュー・トムソンが1894年版『高慢と偏見』に描いた舞踏会の挿絵。下の文字 Such very superior {{dancing}} is not often seen（あれほど見事なダンスはめったに見られない）では、dancing が主語の席に座る動名詞。",
          credit: { author: "Hugh Thomson", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Houghton_Typ_805.94.8320_-_Pride_and_Prejudice,_1894,_Hugh_Thomson_-_superior_dancing.jpg" },
        },
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "To be fond of dancing was a certain step towards falling in love; and very lively hopes of Mr. Bingley’s heart were entertained.",
        ja: "ダンスが好きだということは、恋に落ちる確かな一歩である。そこで、ビングリー氏の心をつかめるのではないかという、たいへん生き生きとした期待がいだかれたのだった。",
        cite: "Jane Austen, Pride and Prejudice, Chapter 3 (1813)",
        source: "https://www.gutenberg.org/cache/epub/1342/pg1342.txt",
      }],
      figure: {
        type: "tree",
        title: "動名詞の働き",
        root: {
          label: "動名詞 -ing",
          sub: "〜すること",
          tone: "navy",
          children: [
            { label: "主語", sub: "Reading is fun", tone: "blue" },
            { label: "動詞の目的語", sub: "enjoy cooking", tone: "blue" },
            { label: "補語", sub: "is teaching", tone: "blue" },
            { label: "前置詞の目的語", sub: "good at -ing", tone: "yellow" },
          ],
        },
        note: "前置詞の後ろに to 不定詞は置けない。動詞の形を置くなら動名詞。",
      },
      cliff: "では、動詞のあとの目的語の席には、-ing と to のどちらを座らせればよいのでしょう？",
    },
    {
      heading: "動名詞だけをとる動詞、不定詞だけをとる動詞",
      body: "動名詞は「{{すでにしていること・実際のこと}}」、to 不定詞は「{{これから先のこと}}」に向きやすい、と考えると整理できます。そのため、楽しむ・終える・やめる・避けるなどの動詞は{{動名詞}}、望む・決める・計画する・約束するなどの動詞は{{不定詞}}を目的語にとります。",
      reading: [
        "目的語の席には、-ing も to 不定詞も座れます。ところが動詞によって、どちらか一方しか受けつけないものがあります。手がかりは、to がもともと「〜へ向かって」という方向を表す語だったことです。そのため to 不定詞は、まだ起きていない{{これから先のこと}}を指しやすい。一方の動名詞は、すでにしていること、実際に起きている動作をそのまま名詞にした形です。",
        "enjoy（楽しむ）や finish（終える）は、実際にしている動作が相手なので動名詞をとります。楽しむには、まずその動作をしていなければなりません。avoid（避ける）、mind（いやがる）、put off（延ばす）、give up（やめる）も、頭の中にある具体的な動作を相手にするので動名詞です。逆に want、hope、decide、plan、promise は、どれもこれから先に目を向ける動詞なので to 不定詞をとります。",
        "ダーウィンの人生で言うと、こうなります。Darwin put off publishing his theory for about twenty years.（ダーウィンは自分の理論を発表するのを、およそ20年延ばした）。1830年代の終わりには自然選択の考えをノートに書きつけていたのに、彼は観察と実験を重ね、本にまとめるのを先へ延ばし続けました。put off のあとは動名詞。もし He decided to publish ……と書けば、「これから発表する」と決めた場面になります。",
      ],
      photos: [
        {
          src: `${C}/darwin.webp`, width: 398, height: 487,
          alt: "フロックコートを着て椅子にすわり、横を向いた、額の広い中年の男性の白黒写真",
          caption: "チャールズ・ダーウィン（1809〜1882年）。息子のフランシスは1854年ごろの撮影と考えたが、はっきりしない。この時期も、自然選択の理論の発表は{{延ばし}}続けていた。",
          credit: { author: "Messrs. Maull and Fox", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Charles_Darwin_aged_51.jpg" },
        },
      ],
      figure: {
        type: "compare",
        title: "目的語の形が決まっている動詞",
        columns: [{ title: "動名詞だけ（実際のこと）", tone: "blue" }, { title: "不定詞だけ（これから）", tone: "yellow" }],
        rows: [
          { cells: ["enjoy（楽しむ）", "want（したい）"] },
          { cells: ["finish（終える）", "hope（望む）"] },
          { cells: ["mind（いやがる）", "decide（決める）"] },
          { cells: ["avoid（避ける）", "plan（計画する）"] },
          { cells: ["give up（やめる）", "promise（約束する）"] },
        ],
        note: "この考え方は目安。例外もあるので、よく出る動詞は組で覚える。",
      },
      cliff: "20年延ばした発表を、ある1通の手紙が止めさせます。その stop のあとは、-ing か to か？",
    },
    {
      heading: "どちらもとれるが、意味が変わる動詞",
      body: "remember・forget・regret・try は、どちらも目的語にとれますが意味が変わります。ここでも、{{-ing は「したこと（過去）」}}、{{to do は「これからすること」}}です。stop は目的語に動名詞だけをとり、stop to do の to do は「〜するために」という副詞的用法なので注意しましょう。",
      reading: [
        "1858年の初夏、ダーウィンのもとに、東南アジアで生き物を調べていたアルフレッド・ラッセル・ウォレスから手紙と論文が届きました。そこには、ダーウィンが長年あたためてきたものとよく似た、自然選択の考えが書かれていたのです。2人の考えはその年のうちにロンドンのリンネ学会で一緒に発表され、ダーウィンは大急ぎで本をまとめ、翌1859年に『種の起源』を出しました。The letter made Darwin stop putting off his book.（その手紙が、ダーウィンに本を先延ばしにするのをやめさせた）。",
        "この stop putting off の putting は動名詞で、「先延ばしにすること」をやめた、という意味です。では Darwin stopped to write his book. はどうでしょう。stop は目的語に to 不定詞をとらないので、この to write は「書くために」という{{副詞的用法}}です。「ほかのことの手を止めて、本を書くことにした」という意味になります。stop のあとの形で、やめたのが何なのかが正反対に変わるのです。",
        "remember、forget、regret、try も、-ing と to で意味が変わります。I remember reading this book.（この本を読んだのを覚えている）は過去のこと、Remember to return this book.（忘れずにこの本を返してね）はこれからのことです。regret telling は「話してしまったのを後悔する」、regret to tell は「残念ながらお伝えします」。ここでも、-ing は「実際にしたこと」、to は「これから向かうこと」という、前の節の目安がそのまま使えます。",
      ],
      figure: {
        type: "compare",
        title: "-ing と to do で意味が変わる",
        columns: [{ title: "＋ -ing（したこと）", tone: "blue" }, { title: "＋ to do（これから）", tone: "yellow" }],
        rows: [
          { label: "remember", cells: ["〜したのを覚えている", "忘れずに〜する"] },
          { label: "forget", cells: ["〜したのを忘れる", "〜するのを忘れる"] },
          { label: "regret", cells: ["〜したのを後悔する", "残念ながら〜する"] },
          { label: "try", cells: ["ためしに〜してみる", "〜しようと努める"] },
        ],
      },
      cliff: "動名詞の動作を「だれが」するのか、「いつ」したのかは、どうやって示すのでしょう？",
    },
    {
      heading: "意味上の主語・否定・完了形",
      body: "動名詞の動作をする人が文の主語とちがうときは、-ing の前に{{所有格か目的格}}を置きます（{{意味上の主語}}）。否定は {{not を -ing の前}}に置きます。述語動詞より{{前のこと}}を表すときは having ＋過去分詞（完了動名詞）を使います。",
      reading: [
        "動名詞は名詞の席に座りますが、動作であることに変わりはありません。すると「だれがその動作をするのか」が問題になります。I'm proud of winning. なら、勝ったのは主語の I です。ところが、勝ったのが息子なら、I'm proud of my son's winning. や I'm proud of my son winning. のように、-ing の前に{{意味上の主語}}を置きます。書きことばでは所有格、話しことばでは目的格がよく使われます。",
        "否定するときは、{{not を -ing の直前}}に置きます。Thank you for not giving up.（あきらめないでいてくれて、ありがとう）。I'm sorry for not calling you.（電話しなくてごめんね）。not の位置を動詞の前に置いてしまうと、「感謝しない」「申しわけなく思わない」という、まったく別の意味の文になってしまいます。",
        "時間のずれも表せます。He is proud of having won the prize.（彼はその賞をとったことを誇りにしている）では、誇りに思っているのは今、賞をとったのは過去です。このように、述語動詞より前のことを示すのが {{having ＋過去分詞}}の完了動名詞です。ただし、having ＋過去分詞という形は、分詞として名詞を説明することもあります。形が同じなら、何で見分けるのか。それを、ダーウィンの名文で確かめましょう。",
      ],
      figure: {
        type: "formula",
        title: "that 節を動名詞で書きかえる",
        prose: true,
        steps: [
          { expr: "I'm sure {{that he will win}}.", note: "勝つのは he" },
          { expr: "I'm sure of {{his}} winning.", note: "意味上の主語 his を -ing の前に" },
          { expr: "She is proud {{that she was}} a nurse.", note: "看護師だったのは過去" },
          { expr: "She is proud of {{having been}} a nurse.", note: "前のことは having ＋過去分詞" },
        ],
      },
      cliff: "-ing だらけの『種の起源』の結びで、名詞の席にいるのはどの1語でしょう？",
    },
    {
      heading: "-ing を見分ける：名詞の席か、説明の役か",
      body: "-ing の形には、名詞として働く{{動名詞}}と、名詞を説明したり進行形をつくったりする{{現在分詞}}があります。見分ける決め手は、その -ing が{{名詞の席}}（主語・目的語・補語・前置詞のあと）に座っているかどうかです。訳すときも、動名詞は「〜すること」、分詞は「〜している…」になります。",
      reading: [
        "1859年11月、ロンドンのジョン・マレー社から『種の起源』が出ました。ビーグル号の航海から帰って20年あまり。ダーウィンは、生き物が長い時間をかけて{{自然選択}}によって変わってきたという考えを、およそ500ページの本にまとめました。その最後の段落は、英語で書かれた科学書の中でも、とりわけ名文として知られています。最初の一文は、こうです。",
        "この文には -ing が4つあります。birds singing on the bushes は「やぶでさえずる鳥」、worms crawling through the damp earth は「湿った土をはうミミズ」。どれも前の名詞を後ろから説明する{{現在分詞}}で、「〜すること」とは訳せません。laws acting around us も「身のまわりではたらく法則」です。ダーウィンは分詞を重ねて、土手の草むらで生き物たちがいっせいに動いている、にぎやかな一瞬を映し出しました。一方、文の骨組みは It is interesting to contemplate …… and to reflect …… で、「ながめること、そして考えること」は to 不定詞が担っています。",
        "続く二文にも -ing が並びます。cycling on は go ＋ -ing の決まった言い方で、地球が「回り続けてきた」こと、according to は「〜にしたがって」というひとまとまりの表現、having been breathed は powers を説明する分詞です。そして、ただ1つ名詞の席に座っているのが、前置詞 of のあとの conceiving。which we are capable of conceiving は「わたしたちが思いえがくことのできる」で、関係代名詞 which は conceiving の目的語にあたります。名詞の席にいながら目的語をとる、まさに「半分名詞、半分動詞」の動名詞です。最後の一語 evolved（進化させられた）は、この初版の中で evolve という語が使われたただ一か所だといわれます。have been, and are being, evolved と、過去から今も続く進化を、受け身の完了形と進行形を重ねて言い切ったのです。",
      ],
      photos: [
        {
          src: `${C}/origin-title.webp`, width: 800, height: 1284,
          alt: "古い紙に ON THE ORIGIN OF SPECIES BY MEANS OF NATURAL SELECTION と印刷され、下に LONDON: JOHN MURRAY 1859 とある本の扉",
          caption: "『種の起源』初版（1859年、ロンドンのジョン・マレー社）の扉。副題の in the Struggle for Life（生存のための闘いで）には、前置詞のあとの名詞が並ぶ。",
          credit: { author: "John Murray, Publisher", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Origin_of_Species_title_page.jpg" },
        },
        {
          src: `${C}/sandwalk.webp`, width: 640, height: 480,
          alt: "両側を生け垣と木々にはさまれた、木もれ日の差す細い土の小道",
          caption: "ダーウィンが暮らしたダウン・ハウス（ロンドン南東）の散歩道「サンドウォーク」。毎日ここを歩いて考えた。草木と生き物が{{からみあう}}土手の情景は、こうした身近な自然から生まれた。",
          credit: { author: "Mike Faherty", license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0", source: "https://commons.wikimedia.org/wiki/File:Down_House,_sandwalk_-_geograph.org.uk_-_1399185.jpg" },
        },
      ],
      recite: [
        {
          lang: "en", voice: "male", accent: "gb",
          text: "It is interesting to contemplate an entangled bank, clothed with many plants of many kinds, with birds singing on the bushes, with various insects flitting about, and with worms crawling through the damp earth, and to reflect that these elaborately constructed forms, so different from each other, and dependent on each other in so complex a manner, have all been produced by laws acting around us.",
          ja: "たくさんの種類の植物におおわれ、やぶでは鳥がさえずり、さまざまな虫が飛びまわり、湿った土の中をミミズがはっている、草木のからみあう土手をながめるのは、おもしろい。そして考えてみるのも。これほど精巧につくられ、たがいにこれほどちがい、しかもこれほど複雑に支えあっている生き物の形が、どれもみな、わたしたちのまわりではたらいている法則によって生み出されてきたのだと。",
          cite: "Charles Darwin, On the Origin of Species, Chapter XIV (1859, first edition)",
          source: "https://www.talkorigins.org/faqs/origin/chapter14.html",
        },
        {
          lang: "en", voice: "male", accent: "gb",
          text: "Thus, from the war of nature, from famine and death, the most exalted object which we are capable of conceiving, namely, the production of the higher animals, directly follows. There is grandeur in this view of life, with its several powers, having been originally breathed into a few forms or into one; and that, whilst this planet has gone cycling on according to the fixed law of gravity, from so simple a beginning endless forms most beautiful and most wonderful have been, and are being, evolved.",
          ja: "こうして、自然の中の闘いから、飢えと死から、わたしたちが思いえがくことのできるもっとも気高いもの、すなわち高等な動物の誕生が、じかに生まれてくる。この生命の見方には、壮大さがある。いくつかの力をそなえた生命は、はじめ、わずかな形に、あるいはただ1つの形に吹きこまれた。そして、この惑星が重力という変わらない法則にしたがって回り続けてきたあいだに、これほど単純な始まりから、限りない、このうえなく美しく、このうえなくすばらしい形が進化してきたし、今も進化し続けているのだ。",
          cite: "Charles Darwin, On the Origin of Species, Chapter XIV (1859, first edition)",
          source: "https://www.talkorigins.org/faqs/origin/chapter14.html",
        },
      ],
      figure: {
        type: "compare",
        title: "ダーウィンの結びの -ing を見分ける",
        columns: [{ title: "名詞の席（動名詞）", tone: "blue" }, { title: "説明・決まった言い方（分詞など）", tone: "yellow" }],
        rows: [
          { label: "例", cells: ["capable of conceiving", "birds singing / worms crawling"] },
          { label: "訳", cells: ["思いえがくこと", "さえずる鳥 / はうミミズ"] },
          { label: "手がかり", cells: ["前置詞 of のあと", "前の名詞を説明"] },
          { label: "ほか", cells: ["fond of dancing（オースティン）", "having been breathed / cycling on"] },
        ],
        note: "-ing を見たら、まず「どの席に座っているか」を確かめる。",
      },
      reveal: "決め手は、-ing が{{名詞の席}}に座っているかどうかです。singing・crawling・acting は前の名詞を説明する{{現在分詞}}、cycling や according は決まった言い方、having been breathed も powers を説明する分詞でした。前置詞 of のあとという名詞の席に座り、しかも which を目的語にとっているのは conceiving ただ1つ。だから「〜すること」と訳せる{{動名詞}}は、この1語だけなのです。",
    },
  ],
  story: {
    kind: "novel",
    title: "植字見習いと、最後の一語",
    paragraphs: [
      "1859年の秋、ロンドン。インクと油のにおいがこもる印刷所の二階で、十五歳の見習いネッドは、木の活字ケースの前に立っていた。左手には植字用の小さな金属の枠。右手で鉛の活字を一本ずつつまみ、文字を逆向きのまま並べていく。紙に刷れば、左右がひっくり返って正しく読めるのだ。いま組んでいるのは、ある博物学者の分厚い本の、いちばん最後のページだった。",
      "「アッシュさん、i と n と g の箱がもう空っぽです」。ネッドが声をあげると、となりのケースの年寄りの植字工が、眼鏡の上から目を上げた。「最後の段落か。そりゃ -ing がたくさん出てくるからな」。ネッドは原稿を指でたどった。singing、flitting、crawling、acting。「どれも、何かを『すること』ですよね」",
      "アッシュさんは首をふり、原稿をのぞきこんだ。「よく見てごらん。birds singing は、鳥が『歌うこと』じゃない。『歌っている鳥』だ。前の鳥を説明しているだけさ。-ing を見たら、まず{{席}}を見るんだ。主語の席か、目的語の席か、前置詞のうしろか。名詞の席に座っていたら、それが{{動名詞}}。そうでなけりゃ、たいていは分詞だよ」",
      "ネッドは段落を最後まで追った。cycling、according、having、being。そして、そのなかに一つだけ、of のすぐうしろに座る -ing を見つけた。capable of conceiving。「これだけ、名詞の席です」。「そうだ。前置詞のあとには to 不定詞は座れない。だから -ing が来る。しかも、前の which を目的語にしている。名詞の顔をしていても、動詞の手足はちゃんと残っているのさ」",
      "その日の校正刷りは、書きこみで赤く染まって戻ってきた。著者はひどく手を入れる人で、一度組んだ行がまるごと直されることもめずらしくなかった。ネッドが「また組み直しか」とため息をつくと、アッシュさんは笑った。「I remember setting this page last week, だな。先週組んだのを、ちゃんと覚えているだろう。なら早いさ」",
      "夕方、ネッドはようやく最後の行にたどりついた。e、v、o、l、v、e、d。最後の一語の活字を枠に収めたとき、ふしぎと指がふるえた。There is grandeur in this view of life. 壮大さがある、と書いた人は、どんな景色を見ていたのだろう。「ネッド、帰る前に組版をしめるのを忘れるなよ」。「Don't forget to lock it、ですね。これからやることだから、to です」。アッシュさんは目を細めた。",
      "十一月の終わり、印刷所に知らせが届いた。あの本は、店に並ぶ前に、書店からの注文だけで初版がすべてはけたという。ネッドはその夜、刷り損じの最後のページをそっと持ち帰った。ろうそくの明かりの下で、彼はあの一語をもう一度指でなぞった。capable of conceiving。思いえがくことのできる。窓の外では、変わらない法則にしたがって、星がゆっくりと回っていた。",
    ],
    note: "ネッド、アッシュさん、印刷所の場面、会話や心情は創作です。『種の起源』が1859年11月にロンドンのジョン・マレー社から出版されたこと、ダーウィンが校正刷りに多くの直しを入れたこと、初版が発売時までに書店の注文で売り切れたこと、作中の英文（結びの段落）は事実・原文にもとづいています。ダーウィン本人は登場させていません。",
  },
  mistakes: [
    { wrong: "I enjoyed to talk with her.", right: "I enjoyed talking with her.", why: "enjoy は動名詞だけを目的語にとります。" },
    { wrong: "I'm looking forward to see you.", right: "I'm looking forward to seeing you.", why: "look forward to の to は前置詞なので、後ろは動名詞です。" },
    { wrong: "Thank you for invite me.", right: "Thank you for inviting me.", why: "前置詞 for の後ろに動詞を置くときは動名詞にします。" },
    { wrong: "I remember to visit this temple as a child.", right: "I remember visiting this temple as a child.", why: "子どものころに「訪れたこと」は過去なので -ing。to do は「忘れずに〜する」になります。" },
  ],
  check: [
    { q: "Would you mind ___ (open) the door?", a: "opening", why: "mind は動名詞だけを目的語にとる。" },
    { q: "Don't forget ___ (lock) the door when you leave.", a: "to lock", why: "これから「かぎをかけること」なので to 不定詞。" },
    { q: "He is ashamed of ___ (be) lazy last year. の空所を2語で。", a: "having been", why: "去年のことで、述語の is より前なので完了動名詞。" },
  ],
  next: [
    { label: "4択ドリル「動名詞」に挑戦", href: "/learn/eibunpo-ko/h-eng-gram-domeishi" },
    { label: "ひとつ前「不定詞」", href: "/learn/eibunpo-ko/h-eng-gram-futeishi" },
    { label: "つぎの単元「分詞」", href: "/learn/eibunpo-ko/h-eng-gram-bunshi" },
  ],
};
