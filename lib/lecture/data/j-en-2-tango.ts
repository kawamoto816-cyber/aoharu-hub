import type { Lecture } from "../types";

const C = "/media/commons/j-en-2-tango";

export const J_EN_2_TANGO: Lecture = {
  unit: "j-en-2-tango",
  title: "中2の英単語は「変化形」と「語の家族」でまとめて増やす",
  hook: "中2では、過去形・過去分詞（受け身や現在完了で使う形）、比較の -er・-est など、{{1つの単語のいろいろな形}}が出てきます。1語ずつばらばらに覚えるより、決まった型や「なかま」でまとめると、覚える量がぐっと減ります。",
  mystery: "『鏡の国のアリス』のハンプティ・ダンプティは、辞書にない un-birthday という単語を作ってみせ、その言葉は150年たった今も英語圏で楽しまれています。ところが同じ彼が glory（栄光）を「言い負かす議論」の意味だと言い張ったときは、アリスにまったく通じませんでした。2つの言葉の運命を分けたのは、何だったのでしょう？",
  mission: {
    from: "中学校の英語劇部の顧問",
    request: "文化祭で『鏡の国のアリス』を英語で上演することになりました。ところが部員たちは「台本の知らない単語が多すぎて、覚えきれない」と頭をかかえています。ハンプティ・ダンプティの場面には、作者が作った言葉まで出てきます。単語を楽に増やすコツを部員に伝えるために、名探偵のあなたに、2つの言葉の運命を分けたなぞを解いてほしいのです。",
    thanks: "通じる新語は、みんなが知っている「部品」と「家族のきまり」でできていたのですね。部員には、知らない単語は部品に分けて推測しよう、と伝えます。台本を読むスピードがきっと上がります。",
  },
  sections: [
    {
      heading: "不規則動詞は4つの型に分ける",
      body: "不規則動詞の「原形 - 過去形 - 過去分詞」は、{{同じ形がどこに出るか}}で4つの型に分けられます。buy - bought - bought は{{過去形と過去分詞が同じ}}型、go - went - gone は{{3つともちがう}}型です。型ごとにまとめて、リズムよく声に出して覚えましょう。",
      reading: [
        "英語の動詞の多くは、play - played - played のように -ed をつけるだけで過去形と過去分詞ができます。ところが、go や see、buy のように、よく使う動詞ほど形が変わる{{不規則動詞}}です。これは、英語の祖先にあたる古い言葉で、母音を入れかえて過去を表していた名残です。毎日のように口にする語は、言いなれた古い形のまま残り、あまり使わない語は、しだいに -ed のきまりにそろえられていきました。",
        "だから不規則動詞は、ばらばらに覚えるより{{同じ形がどこに出るか}}で分けると楽になります。3つともちがう A-B-C 型（go - went - gone）、過去形と過去分詞が同じ A-B-B 型（buy - bought - bought）、原形と過去分詞が同じ A-B-A 型（come - came - come）、3つとも同じ A-A-A 型（put - put - put）。中2で過去分詞を使う受け身や現在完了を学ぶと、3つめの形が急に大事になります。",
        "この型を、名作の中で確かめてみましょう。イギリスの数学者ルイス・キャロルが1871年に出した『鏡の国のアリス』には、卵の姿をしたハンプティ・ダンプティが登場します。アリスは塀の上の彼を見て、昔から伝わる童謡をそっと口ずさみます。sat は sit - sat - sat（A-B-B 型）、had は have - had - had（A-B-B 型）、put は put - put - put（A-A-A 型）。わずか4行に、不規則動詞が3つも入っています。なお a great fall の fall は「落下」という名詞で、動詞なら fall - fell - fallen（A-B-C 型）です。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "Humpty Dumpty sat on a wall:\nHumpty Dumpty had a great fall.\nAll the King's horses and all the King's men\nCouldn't put Humpty Dumpty in his place again.",
        ja: "ハンプティ・ダンプティ、塀にすわった。\nハンプティ・ダンプティ、どすんと落ちた。\n王さまの馬がみんな来ても、王さまの家来がみんな来ても、\nハンプティ・ダンプティを、もとの場所にはもどせなかった。",
        cite: "Lewis Carroll, Through the Looking-Glass, Chapter VI (1871)",
        source: "https://www.gutenberg.org/ebooks/12",
      }],
      photos: [
        {
          src: `${C}/humpty.webp`, width: 800, height: 951,
          alt: "塀の上にすわった卵の形の人物が、下から手をのばす長い髪の少女と握手している版画",
          caption: "テニエルがえがいたハンプティ・ダンプティとアリス（『鏡の国のアリス』1871年の挿絵）。童謡では、彼は塀に sat（すわった）あと、a great fall（落下）をする。",
          credit: { author: "John Tenniel", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Alice_Humpty_Dumpty.jpg" },
        },
      ],
      figure: {
        type: "compare",
        title: "原形 - 過去形 - 過去分詞の4つの型",
        columns: [{ title: "例 1" }, { title: "例 2", tone: "yellow" }],
        rows: [
          { label: "A-B-C", cells: ["go - went - gone", "see - saw - seen"] },
          { label: "A-B-B", cells: ["buy - bought - bought", "make - made - made"] },
          { label: "A-B-A", cells: ["come - came - come", "run - ran - run"] },
          { label: "A-A-A", cells: ["cut - cut - cut", "put - put - put"] },
        ],
        note: "規則動詞も過去形と過去分詞が同じ（play - played - played）。",
      },
      cliff: "ハンプティ・ダンプティは、このあと辞書にない単語を作ってみせます。",
    },
    {
      heading: "語の終わりで品詞が変わる",
      body: "単語の終わりに決まった形（{{接尾辞}}）をつけると、ちがう品詞の語になります。-ful は形容詞、-ly は副詞、-er は「〜する人」、-ness や -tion は名詞になることが多いです。もとの語を知っていれば、初めて見る単語の意味も{{推測}}できます。",
      reading: [
        "英単語の多くは、もとの語に部品をつけて作られています。語の終わりにつく部品を{{接尾辞}}といい、品詞を変えるはたらきがあります。use（使う）に -ful をつけると useful（役に立つ）という形容詞、さらに -ly をつけると usefully（役に立つように）という副詞になります。teach（教える）に -er で teacher（教える人）、kind（親切な）に -ness で kindness（親切）、invent（発明する）に -ion で invention（発明）。もとの語が同じ単語は、意味もつながった「語の家族」です。",
        "語の前につく部品は{{接頭辞}}といいます。代表は「〜でない」を表す un- で、happy（幸せな）は unhappy（不幸な）、kind は unkind（不親切な）になります。キャロルはこのしくみで遊びました。ハンプティ・ダンプティは自分のネクタイを、王さまと女王さまからもらった un-birthday present（誕生日ではない日のプレゼント）だと自慢します。そんな単語は辞書にありません。それでもアリスはすぐに意味をのみこみ、二人は「1年のうち364日が非誕生日」という計算まで始めます。",
        "この場面には、もう1つしゃれがかくれています。I beg your pardon? は「すみません、もう一度言ってください」という聞き返しの決まり文句ですが、文字どおりには「あなたの許しを請います」です。ハンプティはわざと文字どおりに受けとって、I'm not offended.（怒ってなんかいないよ）と返します。キャロルの本名はチャールズ・ドジソンといい、オックスフォード大学で数学を教えていました。言葉を部品に分け、組み立て直す遊びは、論理を愛した彼の得意わざだったのです。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "\"They gave it me,\" Humpty Dumpty continued thoughtfully, as he crossed one knee over the other and clasped his hands round it, \"they gave it me—for an un-birthday present.\"\n\"I beg your pardon?\" Alice said with a puzzled air.\n\"I'm not offended,\" said Humpty Dumpty.\n\"I mean, what is an un-birthday present?\"\n\"A present given when it isn't your birthday, of course.\"",
        ja: "「もらったんだよ」とハンプティ・ダンプティは、片ひざをもう一方のひざに組み、両手でかかえこみながら、考えぶかげに続けた。「もらったんだ、非誕生日のプレゼントとしてね」\n「すみません、もう一度？」とアリスはきょとんとして言った。\n「べつに怒ってなんかいないよ」とハンプティ・ダンプティは言った。\n「いえ、その、非誕生日のプレゼントって、何ですか？」\n「誕生日じゃないときにもらうプレゼントさ。決まってるだろう」",
        cite: "Lewis Carroll, Through the Looking-Glass, Chapter VI (1871)",
        source: "https://www.gutenberg.org/ebooks/12",
      }],
      photos: [
        {
          src: `${C}/carroll.webp`, width: 800, height: 1218,
          alt: "黒い上着に白いネクタイの男性が、ひざに帽子をかかえて横を向いてすわっている古い白黒写真",
          caption: "ルイス・キャロル（本名チャールズ・ドジソン）。1863年撮影。数学の先生でありながら、{{接頭辞}}や{{接尾辞}}を組み合わせて新しい言葉を作る遊びを物語に書いた。",
          credit: { author: "Oscar Gustave Rejlander", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Lewis_Carroll_1863.jpg" },
        },
      ],
      figure: {
        type: "tree",
        title: "もとの語から広がる「語の家族」",
        root: {
          label: "もとの語",
          children: [
            { label: "use", sub: "使う", tone: "blue", children: [{ label: "useful", sub: "役に立つ" }] },
            { label: "teach", sub: "教える", tone: "yellow", children: [{ label: "teacher", sub: "教える人" }] },
            {
              label: "happy",
              sub: "幸せな",
              tone: "red",
              children: [
                { label: "happily", sub: "幸せに" },
                { label: "happiness", sub: "幸せ" },
              ],
            },
          ],
        },
        note: "happy → happily のように、y で終わる語は y を i にかえてからつける。",
      },
      cliff: "部品を足すのは語の前後だけではありません。後ろに小さな語を置く方法もあります。",
    },
    {
      heading: "熟語は「動詞＋小さな語」で意味が変わる",
      body: "look at（〜を見る）、look for（〜を{{さがす}}）、look after（〜の{{世話をする}}）のように、同じ動詞でも後ろの前置詞などで意味が大きく変わります。熟語は{{ひとかたまり}}で覚え、例文の中で使えるようにしましょう。",
      reading: [
        "英語には、動詞のあとに at・for・after などの小さな語を置いて、新しい意味を作る言い方がたくさんあります。これを{{熟語}}といいます。look at は「〜に目を向ける」、look for は「〜をさがす」、look after は「〜の世話をする」。同じ look なのに、後ろの語しだいで意味が変わります。熟語は2語以上で1つの単語のようにはたらくので、{{ひとかたまり}}で覚えるのが基本です。",
        "ただし、丸暗記だけに頼る必要はありません。小さな語にはそれぞれ「芯のイメージ」があります。at は1つの点をねらう感じ、for は何かを求めて向かう感じ、after は「あとを追う」感じです。look for は、ないものを求めて目を向けるので「さがす」。look after は、相手のあとを目で追いかけて見守るので「世話をする」。こう考えると、なぜその意味になるのかが見えてきます。",
        "自分で作った例文で確かめましょう。Alice is looking for the way out of the garden.（アリスは庭の出口をさがしています）。The White Knight looked after Alice in the forest.（白の騎士は森でアリスの世話をしました）。take care of 〜（〜の世話をする・大事にする）、get to 〜（〜に着く）、be good at 〜（〜が得意だ）も、文の中で声に出すと、まとまりの感覚が身につきます。",
      ],
      photos: [
        {
          src: `${C}/christ-church.webp`, width: 800, height: 445,
          alt: "雪の積もった広い中庭を、石づくりの建物が囲み、正面に時計のある塔が立っている",
          caption: "オックスフォード大学クライスト・チャーチの中庭。キャロルはこの学寮で数学を教え、学寮長の娘アリス・リデルたちに、のちの『アリス』となるお話を語って聞かせた。",
          credit: { author: "Toby Ord", license: "CC BY-SA 2.5", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.5", source: "https://commons.wikimedia.org/wiki/File:Tom_Quad,_Christ_Church_2004-01-21.jpg" },
        },
      ],
      figure: {
        type: "compare",
        title: "中2でよく使う熟語",
        columns: [{ title: "熟語", tone: "yellow" }, { title: "意味" }],
        rows: [
          { cells: ["look for 〜", "〜をさがす"] },
          { cells: ["look after 〜", "〜の世話をする"] },
          { cells: ["take care of 〜", "〜の世話をする・大事にする"] },
          { cells: ["get to 〜", "〜に着く"] },
          { cells: ["be good at 〜", "〜が得意だ"] },
        ],
      },
      cliff: "アリスは、おどろきのあまり比較の形をまちがえたことがあります。",
    },
    {
      heading: "形容詞は「反対語」と「比較の形」をセットで",
      body: "形容詞は{{反対の意味の語とペア}}で覚えると、一度に2語おぼえられます。比較の文で使うので、{{-er・-est の形}}もいっしょに確かめましょう。good - better - best のように不規則に変わる語もあります。",
      reading: [
        "形容詞は{{反対の意味の語とペア}}で覚えると、一度に2語が手に入ります。long と short、old と new（old と young）、easy と difficult。反対語は un- をつけて作れることもあり、happy と unhappy、kind と unkind はその例です。",
        "比較の文で使うために、{{-er・-est の形}}もセットにしましょう。短い語は long - longer - longest のように -er・-est をつけます。いっぽう、beautiful や difficult、curious（ふしぎな）のように長めの語は、more curious・most curious と more・most を前に置きます。good - better - best、bad - worse - worst のように、まったく形の変わる不規則なものもあります。",
        "1865年の『ふしぎの国のアリス』で、アリスはケーキを食べて体がぐんぐんのび、思わず Curiouser and curiouser! とさけびます。正しくは more and more curious（ますますふしぎ）です。キャロルは地の文でわざわざ「アリスはおどろきのあまり、正しい英語の話し方をすっかり忘れていた」と書きそえています。まちがいだと読者が気づくからこそ、アリスのあわてぶりが伝わるのです。この言葉は今では、ふしぎなことが続くときのしゃれた決まり文句として使われています。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "\"Curiouser and curiouser!\" cried Alice (she was so much surprised, that for the moment she quite forgot how to speak good English); \"now I'm opening out like the largest telescope that ever was! Good-bye, feet!\"",
        ja: "「ふしぎっくて、ふしぎっくて！」とアリスはさけんだ（あまりにおどろいたので、そのときは正しい英語の話し方をすっかり忘れていたのだ）。「わたし、今まででいちばん大きな望遠鏡みたいに、のびていく！　さよなら、足さん！」",
        cite: "Lewis Carroll, Alice's Adventures in Wonderland, Chapter II (1865)",
        source: "https://www.gutenberg.org/ebooks/11",
      }],
      photos: [
        {
          src: `${C}/alice-neck.webp`, width: 559, height: 1256,
          alt: "首がとても長くのびて、頭が高い位置にある少女の版画",
          caption: "首がぐんとのびたアリス（テニエル画、『ふしぎの国のアリス』1865年）。このとき Curiouser and curiouser! とさけんだ。正しい{{比較の形}}は more curious。",
          credit: { author: "John Tenniel", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Alice_de_pesco%C3%A7o_longo.jpg" },
        },
      ],
      figure: {
        type: "flow",
        title: "1つの形容詞から3つ覚える",
        steps: [
          { label: "long", sub: "長い", tone: "blue" },
          { label: "short", sub: "短い", tone: "yellow" },
          { label: "比較の形", sub: "shorter / shortest", tone: "red" },
        ],
        arrows: ["反対語", "比べる形"],
      },
      cliff: "まちがいの言葉も、作った言葉も通じる。では、言葉の意味はだれが決めるのでしょう？",
    },
    {
      heading: "言葉の意味は「みんなのきまり」で決まる",
      body: "新しい単語でも、{{みんなが知っている部品}}と{{語の家族のきまり}}で作られていれば、初めて聞く人にも意味が通じます。反対に、自分だけの意味をつけた言葉は通じません。知らない単語に出会ったら、部品に分けて{{推測}}しましょう。",
      reading: [
        "un-birthday の話のあと、ハンプティ・ダンプティは得意げに There's glory for you!（どうだ、栄光だろう！）と言います。アリスが首をかしげると、彼は「ぼくが言ったのは、きみを言い負かす見事な議論だ、という意味さ」と答えます。そして、「ぼくが言葉を使うとき、その意味はぼくが選んだとおりになる」と言い放つのです。アリスは「言葉にそんなにいろいろな意味を持たせられるのかしら」と疑います。",
        "このやりとりは、言葉とは何かを考える名場面として、哲学や法律の本、イギリスの裁判の判決文にまで引用されてきました。言葉は、使う人どうしが同じ意味だと約束しているから通じます。glory は「栄光」という、みんなが共有する意味をもつ語です。それを1人で勝手に言いかえても、相手には何も伝わりません。",
        "では新しい言葉はどう生まれるのでしょう。同じ章でハンプティは、詩「ジャバウォックの詩」の slithy を lithe（しなやかな）と slimy（ぬるぬるした）を1語につめた言葉だと説明し、two meanings packed up into one word（2つの意味を1語につめこんだもの）を、旅行かばん portmanteau にたとえました。キャロルが作った chortle（chuckle くすくす笑う＋snort 鼻を鳴らす）は、今では辞書にのる英単語です。brunch（breakfast＋lunch）、smog（smoke＋fog）も同じ作り方です。新しい言葉も、知っている部品からできていれば、ちゃんと通じて広まるのです。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "\"I don't know what you mean by 'glory,'\" Alice said.\nHumpty Dumpty smiled contemptuously. \"Of course you don't—till I tell you. I meant 'there's a nice knock-down argument for you!'\"\n\"But 'glory' doesn't mean 'a nice knock-down argument,'\" Alice objected.\n\"When I use a word,\" Humpty Dumpty said in rather a scornful tone, \"it means just what I choose it to mean—neither more nor less.\"\n\"The question is,\" said Alice, \"whether you can make words mean so many different things.\"\n\"The question is,\" said Humpty Dumpty, \"which is to be master—that's all.\"",
        ja: "「その『栄光』って、どういう意味なのかしら」とアリスは言った。\nハンプティ・ダンプティは、ばかにしたようににやりと笑った。「わかるもんか、ぼくが教えるまではね。ぼくが言ったのは『どうだ、ぐうの音も出ない議論だろう！』ってことさ」\n「でも『栄光』は『ぐうの音も出ない議論』という意味じゃないわ」とアリスは言い返した。\n「ぼくが言葉を使うときは」とハンプティ・ダンプティは、かなり見下した調子で言った。「その言葉は、ぼくが選んだとおりの意味になる。それ以上でも、それ以下でもない」\n「問題は」とアリスは言った。「言葉に、そんなにいろいろな意味を持たせられるかどうかよ」\n「問題は」とハンプティ・ダンプティは言った。「どっちが主人か、ってことだけさ」",
        cite: "Lewis Carroll, Through the Looking-Glass, Chapter VI (1871)",
        source: "https://www.gutenberg.org/ebooks/12",
      }],
      reveal: "un-birthday は、だれもが知っている birthday に、「〜でない」を表す{{接頭辞}} un- をつけた言葉です。{{語の家族のきまり}}どおりに作られていたので、辞書になくてもアリスはすぐ意味をつかみ、今も楽しまれています。いっぽう glory の新しい意味は、ハンプティが1人で決めたもので、部品にも約束にも手がかりがありません。言葉の意味を決めるのは、言い張る人ではなく、{{みんなが共有する部品ときまり}}だったのです。",
      figure: {
        type: "compare",
        title: "通じる新語・通じない新語",
        columns: [{ title: "通じる", tone: "blue" }, { title: "通じない", tone: "yellow" }],
        rows: [
          { label: "例", cells: ["un-birthday", "glory＝言い負かす議論"] },
          { label: "作り方", cells: ["un-＋birthday（部品の組み合わせ）", "1人で意味を決めた"] },
          { label: "手がかり", cells: ["みんなが知る部品ときまり", "なし"] },
        ],
        note: "かばん語：slithy（lithe＋slimy）、brunch（breakfast＋lunch）、smog（smoke＋fog）。",
      },
    },
  ],
  story: {
    kind: "manzai",
    title: "非誕生日の単語帳",
    cast: ["コタ", "リン"],
    lines: [
      { who: "コタ", text: "どうもー、コタとリンです！　ぼく、英単語を一気に増やす方法を発明しました！" },
      { who: "リン", text: "へえ、どんな方法？" },
      { who: "コタ", text: "全部に -ed をつける！　昨日バッグを buyed しました。", say: "全部にイーディーをつける！ きのうバッグをバイドしました。" },
      { who: "リン", text: "買えてないよ！　buy は{{不規則動詞}}。buy - bought - bought の A-B-B 型。", say: "買えてないよ！ バイは不規則動詞。バイ、ボート、ボートの、エー・ビー・ビー型。" },
      { who: "コタ", text: "じゃあ put は putted？", say: "じゃあプットはプッテッド？" },
      { who: "リン", text: "put は put - put - put。3つとも同じ A-A-A 型。よく使う動詞ほど、古い形が残ってるんだよ。", say: "プットは、プット、プット、プット。3つとも同じ、エー・エー・エー型。よく使う動詞ほど、古い形が残ってるんだよ。" },
      { who: "コタ", text: "ふむ。じゃあ次。先生に Please walk careful! って言われました。", say: "ふむ。じゃあ次。先生にプリーズ・ウォーク・ケアフル！って言われました。" },
      { who: "リン", text: "それ、先生は carefully って言ったはず。動詞を説明するのは副詞だから、-ly をつけるの。", say: "それ、先生はケアフリーって言ったはず。動詞を説明するのは副詞だから、エル・ワイをつけるの。" },
      { who: "コタ", text: "use に -ful で useful。うしろに部品をつけると品詞が変わるんだね。", say: "ユーズにフルでユースフル。うしろに部品をつけると品詞が変わるんだね。" },
      { who: "リン", text: "そう、それが{{接尾辞}}。語の家族で覚えると楽だよ。" },
      { who: "コタ", text: "それで、さっきからずっと鍵を looking at してるんだけど、見つからないの。", say: "それで、さっきからずっと鍵をルッキング・アットしてるんだけど、見つからないの。" },
      { who: "リン", text: "見つめてるだけでしょ！　さがすなら look for。熟語は{{ひとかたまり}}で覚えて。", say: "見つめてるだけでしょ！ さがすならルック・フォー。熟語はひとかたまりで覚えて。" },
      { who: "コタ", text: "ところでリン、今日は誕生日じゃないよね。はい、un-birthday present！", say: "ところでリン、きょうは誕生日じゃないよね。はい、アンバースデー・プレゼント！" },
      { who: "リン", text: "『鏡の国のアリス』のハンプティ・ダンプティだ。un- は「〜でない」の{{接頭辞}}だから、誕生日じゃない日のプレゼント。", say: "鏡の国のアリスのハンプティ・ダンプティだ。アンは、〜でない、の接頭辞だから、誕生日じゃない日のプレゼント。" },
      { who: "コタ", text: "1年に364回もらえるんだよ。あ、中身は消しゴムです。" },
      { who: "リン", text: "ありがとう……。でも364回はいらないかな。" },
      { who: "コタ", text: "このプレゼント、ぼくのより gooder だね！", say: "このプレゼント、ぼくのよりグッダーだね！" },
      { who: "リン", text: "better！　good - better - best は不規則に変わるの。", say: "ベター！ グッド、ベター、ベストは不規則に変わるの。" },
      { who: "コタ", text: "アリスだって Curiouser って言ってたもん。", say: "アリスだってキュリオサーって言ってたもん。" },
      { who: "リン", text: "あれは、おどろいてまちがえたって原作に書いてあるの。正しくは more curious。", say: "あれは、おどろいてまちがえたって原作に書いてあるの。正しくはモア・キュリアス。" },
      { who: "コタ", text: "いいの。ぼくが言葉を使うとき、その意味はぼくが決める！" },
      { who: "リン", text: "ハンプティのまねしても、みんなのきまりで作らないと通じないの！　もういいよ。" },
      { who: "コタ", text: "どうも、ありがとうございました！" },
    ],
    note: "コタとリンは架空の人物で、会話はすべて創作です。un-birthday、Curiouser and curiouser!、「言葉の意味はぼくが決める」は、ルイス・キャロル『ふしぎの国のアリス』（1865年）・『鏡の国のアリス』（1871年）の原作にもとづいています。",
  },
  mistakes: [
    { wrong: "I buyed a new bag.", right: "I bought a new bag.", why: "buy は不規則動詞（buy - bought - bought）。-ed はつけません。" },
    { wrong: "Please walk careful.", right: "Please walk carefully.", why: "動詞（walk）を説明するのは副詞。careful に -ly をつけます。" },
    { wrong: "（さがしている）I'm looking at my key.", right: "I'm looking for my key.", why: "look at は「見る」、look for は「さがす」。熟語はかたまりで意味が決まります。" },
    { wrong: "This is gooder than that.", right: "This is better than that.", why: "good は good - better - best と不規則に変わります。" },
  ],
  check: [
    { q: "see の過去分詞は？", a: "seen", why: "see - saw - seen（A-B-C 型）。" },
    { q: "useful の意味と、もとの語は？", a: "役に立つ／use", why: "use（使う）＋ -ful で形容詞になる。" },
    { q: "「〜の世話をする」を look を使った熟語で言うと？", a: "look after 〜", why: "take care of 〜 もほぼ同じ意味。" },
  ],
  next: [
    { label: "中学英単語1200で覚える", href: "/learn/chu-tango" },
    { label: "過去分詞を使う「受け身」のレクチャー", href: "/learn/lecture/j-en-2-ukemi" },
    { label: "-er・-est を使う「比較」のレクチャー", href: "/learn/lecture/j-en-2-hikaku" },
  ],
};
