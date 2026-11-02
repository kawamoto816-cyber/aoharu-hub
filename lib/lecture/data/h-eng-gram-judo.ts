import type { Lecture } from "../types";

const C = "/media/commons/h-eng-gram-judo";

export const H_ENG_GRAM_JUDO: Lecture = {
  unit: "h-eng-gram-judo",
  title: "受動態は「される側」を主語にした文。be ＋過去分詞で、時制は be が表す",
  hook: "駅の掲示の Smoking is not allowed here. や、ニュースの The bridge was built in 1970. のように、だれがしたかより「何がどうされたか」を伝えたい場面はたくさんあります。そんなときに使うのが受動態です。能動態からの作りかえを手順で押さえると、時制・助動詞・文型が変わっても迷いません。",
  mystery: "1818年に出た『フランケンシュタイン』の序文は、だれがそう考えたのか分かっているのに、The event … has been supposed, by Dr. Darwin … と、考えた人をわざわざ文の後ろに回しています。Dr. Darwin has supposed … と能動態で書けば短くすむのに、なぜ受動態を選んだのでしょう？",
  mission: {
    from: "古典ホラー映画祭で字幕を担当する翻訳者",
    request: "今度の映画祭で、上映の前に『フランケンシュタイン』の原作の序文をスクリーンに映し、字幕をつけることになりました。ところが受動態を「〜された」「〜されてきた」と直訳すると、どうにもぎこちないのです。作者があえて受動態を選んだ理由がわかれば、訳し方も決まります。名探偵のあなたに、その理由を解き明かしてほしいのです。",
    thanks: "受動態は、話の主役を文の頭に置き、いちばん聞かせたい名前を文の最後に回すための形だったのですね。字幕でも「この物語のもとになった出来事は――ダーウィン博士たちも、ありうると考えていた」と、名前が最後にひびくように訳します。",
  },
  sections: [
    {
      heading: "作り方：目的語を主語にして、be ＋過去分詞",
      body: "受動態は、能動態の{{目的語を主語}}にして、動詞を{{be ＋過去分詞}}にした形です。もとの主語は {{by ＋目的格}}で後ろに回します。be動詞は新しい主語と{{時制}}に合わせて選びます。目的語のない文（自動詞の文）は受動態にできません。",
      reading: [
        "英語の文は「だれが・どうする・何を」の順に並ぶのが基本です。これを{{能動態}}といいます。それに対して、「何が・どうされる」の順に言いかえた文が{{受動態}}です。作り方は3つの手順で考えます。①能動態の{{目的語を主語}}にする。②動詞を{{be ＋過去分詞}}にする。③もとの主語を {{by ＋目的格}}にして後ろに回す（言わなくてよければ省く）。動詞の形が変わるのは、主語が「する側」から「される側」に入れかわったことを示すためです。",
        "1818年1月、ロンドンで匿名の3巻本の小説が出版されました。メアリー・シェリーの『フランケンシュタイン』です。若い科学者ヴィクター・フランケンシュタインが、死んだ体の部分を集めて一体の生き物を造り、命を吹きこみます。下の朗読は、その生き物が初めて目を開ける、物語でいちばん有名な場面です。ヴィクター自身が語り手なので、文の主語はほとんど I、つまり「造った側」です。",
        "最後の a convulsive motion agitated its limbs（けいれんするような動きが、その手足をふるわせた）を受動態にしてみましょう。目的語 its limbs を主語にし、主語は複数・時制は過去なので were agitated、もとの主語は by a convulsive motion で後ろへ。Its limbs were agitated by a convulsive motion. となります。意味は同じですが、主語が「動き」から「手足」に入れかわり、読者の目が生き物の体そのものに向きます。原文にも受動態が1か所あります。my candle was nearly burnt out（ろうそくはほとんど燃えつきていた）。ろうそくを燃やした人は問題ではないので、by 〜はありません。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "It was on a dreary night of November, that I beheld the accomplishment of my toils. With an anxiety that almost amounted to agony, I collected the instruments of life around me, that I might infuse a spark of being into the lifeless thing that lay at my feet. It was already one in the morning; the rain pattered dismally against the panes, and my candle was nearly burnt out, when, by the glimmer of the half-extinguished light, I saw the dull yellow eye of the creature open; it breathed hard, and a convulsive motion agitated its limbs.",
        ja: "それは11月の、わびしい夜のことだった。わたしは、苦労の末にできあがったものを目の前にした。苦しみに近いほどの不安をかかえながら、わたしは命を与える道具を身のまわりに集めた。足もとに横たわる命のないものに、存在の火花を注ぎこむために。すでに午前1時だった。雨がもの悲しく窓ガラスを打ち、ろうそくはほとんど燃えつきていた。そのとき、消えかけた明かりのかすかな光の中で、わたしは見た。その生き物の、どんよりとした黄色い目が開くのを。それは荒く息をし、けいれんするような動きが、その手足をふるわせた。",
        cite: "Mary Shelley, Frankenstein (1818), Vol. I, Chapter IV",
        source: "https://www.gutenberg.org/ebooks/41445",
      }],
      photos: [
        {
          src: `${C}/frontispiece.webp`, width: 800, height: 1033,
          alt: "床に横たわった大きな裸の男が目を開け、奥の戸口からマントの若い男がおびえた顔で逃げ出そうとしている銅版画",
          caption: "1831年の改訂版の口絵（テオドール・フォン・ホルスト画）。命を得て起き上がろうとする生き物（左）と、恐ろしさに逃げ出すヴィクター（右）。朗読の場面のすぐあとにあたる。",
          credit: { author: "Theodor von Holst", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Frontispiece_to_Frankenstein_1831.jpg" },
        },
      ],
      figure: {
        type: "formula",
        title: "Many students use this room. を受動態に",
        prose: true,
        steps: [
          { expr: "Many students use {{this room}}.", note: "能動態。目的語は this room" },
          { expr: "{{This room}} … by many students.", note: "目的語を主語に、主語を by の後ろへ" },
          { expr: "This room {{is used}} by many students.", note: "主語は単数・現在なので is ＋ used" },
        ],
        note: "by の後ろの代名詞は目的格（by him・by them）。",
      },
      cliff: "この小説の序文には、完了形と助動詞の受動態が、2文続けて現れます。",
    },
    {
      heading: "時制や助動詞がついても、変わるのは be の部分だけ",
      body: "受動態の時制は {{be の形}}で表し、過去分詞はいつも同じです。過去なら was / were、助動詞があれば{{助動詞＋be}}、進行形は {{be being}}、完了形は {{have been}} ＋過去分詞になります。否定は be（または助動詞・have）の後ろに not、疑問文はそれを主語の前に出します。",
      reading: [
        "受動態の「時」を表すのは、be動詞の部分だけです。過去分詞はどんな時制でも同じ形のまま、be のほうが is → was → will be → has been と姿を変えます。だから、能動態の動詞の時制をまず確かめ、それを be に写せば、どんな受動態も作れます。He has written the letter.（完了形）なら The letter {{has been written}}. 、They are building a bridge.（進行形）なら A bridge {{is being built}}. です。助動詞は be の前に置き、{{助動詞＋be＋過去分詞}}の順になります。",
        "この小説は、1816年の夏、スイスのジュネーヴ湖のほとりの別荘で生まれました。前の年にインドネシアのタンボラ山が大噴火した影響で、ヨーロッパは「夏のない年」とよばれる寒さと長雨に見舞われていました。屋敷にこもった詩人バイロンの提案で、仲間たちはそれぞれ怪奇な物語を書くことになり、当時18歳のメアリーが書き始めたのが『フランケンシュタイン』です。初版の序文は、のちに夫となった詩人パーシー・シェリーが書いたとされています。",
        "その序文の書き出しが、下の朗読です。has been supposed は{{完了形の受動態}}で、「（昔から今まで）考えられてきた」という時の幅を表します。続く I shall not be supposed … は{{助動詞＋be}}の受動態で、「わたしが〜と思われることはないだろう」。ダーウィン博士とは、のちに進化論で知られるチャールズ・ダーウィンの祖父、エラズマス・ダーウィンのことです。死んだものに命がもどるという考えが、当時の学者の間でまじめに論じられていたことを、この1文が伝えています。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "The event on which this fiction is founded has been supposed, by Dr. Darwin, and some of the physiological writers of Germany, as not of impossible occurrence. I shall not be supposed as according the remotest degree of serious faith to such an imagination; yet, in assuming it as the basis of a work of fancy, I have not considered myself as merely weaving a series of supernatural terrors.",
        ja: "この物語のもとになっている出来事は、ダーウィン博士や、ドイツの生理学者たちによって、起こりえないことではないと考えられてきた。もちろん、わたしがそのような空想をほんの少しでも本気で信じている、と思われることはないだろう。けれども、それを空想の作品の土台にするにあたって、わたしは、ただ超自然の恐怖を次々に織りあげているのだとは考えなかった。",
        cite: "Mary Shelley, Frankenstein (1818), Preface（序文はパーシー・シェリーが書いたとされる）",
        source: "https://www.gutenberg.org/ebooks/41445",
      }],
      photos: [
        {
          src: `${C}/diodati.webp`, width: 800, height: 600,
          alt: "木々に囲まれた斜面に建つ、よろい戸のついた3階建ての白い屋敷の白黒写真",
          caption: "ジュネーヴ湖のほとりのディオダティ荘（2008年）。1816年の夏、バイロンが借りていたこの屋敷で、怪奇な物語を書き合う約束が交わされた。",
          credit: { author: "Robertgrassi", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Villa_Diodati.jpg" },
        },
      ],
      figure: {
        type: "compare",
        title: "受動態の形のバリエーション",
        columns: [{ title: "形", tone: "yellow" }, { title: "例" }],
        rows: [
          { label: "過去", cells: ["was / were ＋過去分詞", "It was made here."] },
          { label: "助動詞", cells: ["will be ＋過去分詞", "It will be sent."] },
          { label: "進行形", cells: ["be being ＋過去分詞", "It is being fixed."] },
          { label: "完了形", cells: ["have been ＋過去分詞", "It has been sold."] },
        ],
      },
      cliff: "では、序文はなぜ「ダーウィン博士」を、文の頭ではなく後ろに置いたのでしょう？",
    },
    {
      heading: "by を使わないとき、by 以外の前置詞のとき",
      body: "する人が{{分からない・言う必要がない}}ときは、by 〜を省きます（English is spoken in Australia.）。また、気持ちや状態を表す受動態には{{決まった前置詞}}がつくものがあり、これは熟語として覚えます。be made of（材料）と be made from（原料）は、元の形が見えるかどうかで使い分けます。",
      reading: [
        "実際の英文では、受動態の8割ほどは by 〜をつけないといわれます。する人が{{分からない}}とき、{{言う必要がない}}とき（だれでもそうする・文脈で明らか）、そして{{わざと伏せたい}}ときです。序文の結びにも、その例があります。ディオダティ荘の仲間たちは物語を書く約束をしたのに、天気が晴れると山へ出かけ、幽霊の話など忘れてしまいました。そして The following tale is the only one which has been completed.（これから始まる物語は、書き上げられたただ一つのものである）。だれが書き上げたのかは、言わずに伏せています。",
        "伏せられていたのは、序文の中だけではありません。1818年の初版の扉には、作者の名前がどこにもありませんでした。読者は This novel was written. としか言えず、評者の中には、序文を書いたパーシーが作者だと思いこんだ人もいました。表紙にメアリー・シェリーの名前が載ったのは、1823年の第2版からです。by 〜がない受動態は、「する人がいない」のではなく、「する人を言わないことを選んだ」文なのです。",
        "受動態には、by 以外の前置詞と結びつく決まった言い方もあります。気持ちを表す {{be surprised at}}・{{be interested in}} などは、「おどろかされる」「興味をもたされる」という受け身の形で、人の気持ちを表します。ヴィクターは、生命の秘密を自分が発見したときのことをこう語ります。I was surprised that among so many men of genius, who had directed their inquiries towards the same science, that I alone should be reserved to discover so astonishing a secret.（同じ学問を探究してきた天才はあれほど多いのに、こんなにおどろくべき秘密を発見する役目が、わたし一人に取っておかれていたことに、わたしはおどろいた。）be surprised that 〜は「〜ということにおどろく」。should be reserved も、だれが取っておいたのかを言わない受動態です。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "Two other friends (a tale from the pen of one of whom would be far more acceptable to the public than any thing I can ever hope to produce) and myself agreed to write each a story, founded on some supernatural occurrence. The weather, however, suddenly became serene; and my two friends left me on a journey among the Alps, and lost, in the magnificent scenes which they present, all memory of their ghostly visions. The following tale is the only one which has been completed.",
        ja: "わたしとほかの二人の友人は、何か超自然の出来事をもとにした物語を、一人一つずつ書くことに決めた（そのうち一人の筆による物語なら、わたしがどれほど願っても書けないほど、世の人々に喜ばれるだろう）。ところが天気が急に晴れわたり、二人の友はわたしを残してアルプスへの旅に出た。そして、山々が見せるすばらしい景色の中で、幽霊の空想のことなどすっかり忘れてしまった。これから始まる物語は、書き上げられたただ一つのものである。",
        cite: "Mary Shelley, Frankenstein (1818), Preface（序文はパーシー・シェリーが書いたとされる）",
        source: "https://www.gutenberg.org/ebooks/41445",
      }],
      photos: [
        {
          src: `${C}/title-1818.webp`, width: 800, height: 1423,
          alt: "古い紙に FRANKENSTEIN; OR, THE MODERN PROMETHEUS と印刷され、詩の引用と VOL. I.、1818. の年が入った本の扉",
          caption: "1818年の初版第1巻の扉。題名、ミルトン『失楽園』の詩句、出版社と年はあるが、{{作者の名前はない}}。by 〜を伏せた受動態のように、書いた人が隠されていた。",
          credit: { author: "Mary Shelley（出版：Lackington, Hughes, Harding, Mavor & Jones）", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Frankenstein_1818_edition_title_page.jpg" },
        },
      ],
      figure: {
        type: "tree",
        title: "by 以外の前置詞をとる受動態",
        root: {
          label: "be ＋過去分詞＋前置詞",
          tone: "navy",
          children: [
            { label: "気持ち", children: [{ label: "interested in", sub: "〜に興味がある", tone: "yellow" }, { label: "surprised at", sub: "〜に驚く", tone: "yellow" }] },
            { label: "状態", children: [{ label: "covered with", sub: "〜でおおわれる", tone: "blue" }, { label: "known to", sub: "〜に知られている", tone: "blue" }] },
            { label: "材料・原料", children: [{ label: "made of", sub: "見た目で分かる材料", tone: "red" }, { label: "made from", sub: "形が変わった原料", tone: "red" }] },
          ],
        },
      },
      reveal: "英語の文は、すでに話題になっているもの（旧情報）を文の頭に、新しく伝えたいこと（新情報）を文の終わりに置くと、すっと頭に入ります。序文が語りたい主役は「この物語のもとになった出来事」なので、それを主語にして文の頭に置き、聞かせたい権威の名前 Dr. Darwin を by で文の終わりに回しました。だから{{受動態}}を選んだのです。そして by を省けば、する人を伏せることもできる。作者の名前さえ伏せたこの本は、受動態の2つの力を、序文の中で使い分けていました。",
      cliff: "最後に、名前をもらえなかった「生き物」の呼ばれ方を、受動態で考えます。",
    },
    {
      heading: "目的語が2つの文、補語のある文の受動態",
      body: "SVOO の文は目的語が2つあるので、{{どちらを主語にしても}}受動態が作れます。物を主語にしたときは、人の前に to や for を置くのがふつうです。SVOC の文では O が主語になり、{{C はそのまま}}後ろに残ります。使役の make や知覚動詞の see は、受動態にすると原形の前に {{to}} が入ります（He was made to wait.）。",
      reading: [
        "SVOO の文には目的語が2つあるので、受動態も2通り作れます。Victor gave the creature life.（ヴィクターは生き物に命を与えた）なら、人（生き物）を主語にして The creature {{was given}} life by Victor. 、物を主語にして Life {{was given to}} the creature by Victor. です。物を主語にしたときは、受け取る相手の前に to（buy・make などは for）を置きます。どちらを主語にするかは、その文で何を話題にしたいかで決まります。",
        "SVOC の文では、O が主語になり、C はそのまま動詞の後ろに残ります。小説の中で、ヴィクターは自分の造った生き物を、wretch（あわれなやつ）、daemon（魔物）、fiend（悪鬼）など、さまざまな語で呼びますが、名前は最後まで一度も与えません。ところが今、世界中の多くの人が、この生き物を「フランケンシュタイン」と呼んでいます。People often call the creature Frankenstein. を受動態にすると、The creature {{is often called}} Frankenstein. 。C の Frankenstein は動かずに残ります。本当は造った科学者の名前なのに、です。",
        "この取りちがえが広まったきっかけの一つは、1931年のアメリカ映画でした。四角い頭の怪物の姿が有名になり、題名の名前が怪物の名前だと思われるようになったのです。使役の make の受動態も、この物語によく似合います。He {{was made to}} feel lonely.（彼は孤独を感じさせられた）。能動態の make 人＋原形が、受動態では to ＋原形になることに注意しましょう。造られ、名前もなく、孤独に置かれた生き物の物語は、受動態そのものだともいえます。",
      ],
      photos: [
        {
          src: `${C}/mary-shelley.webp`, width: 655, height: 800,
          alt: "肩を出した黒いドレスに茶色の肩かけをはおり、こちらを見ている女性の油絵の肖像",
          caption: "メアリー・シェリーの肖像（リチャード・ロスウェル画、1840年ごろ）。18歳で物語を書き始め、1831年の改訂版の前書きで、物語が生まれた夏のことを自ら語った。",
          credit: { author: "Richard Rothwell", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Richard_Rothwell_(1800-1868)_-_Mary_Wollstonecraft_Shelley_-_NPG_1235_-_National_Portrait_Gallery.jpg" },
        },
      ],
      figure: {
        type: "formula",
        title: "SVOO・SVOC を受動態に",
        prose: true,
        steps: [
          { label: "SVOO", expr: "My aunt gave {{me}} {{this watch}}.", note: "目的語が2つ" },
          { label: "人が主語", expr: "{{I}} was given this watch by my aunt.", note: "this watch は残る" },
          { label: "物が主語", expr: "{{This watch}} was given {{to}} me by my aunt.", note: "人の前に to" },
          { label: "SVOC", expr: "{{The dog}} is called {{Pochi}}.", note: "We call the dog Pochi. から。C は残る" },
        ],
      },
    },
  ],
  story: {
    kind: "novel",
    title: "名前のない扉",
    sayFix: {
      "has been supposed": "ハズ・ビーン・サポーズド",
      "by Dr. Darwin": "バイ・ドクター・ダーウィン",
      "Dr. Darwin has supposed": "ドクター・ダーウィン・ハズ・サポーズド",
      "It was written.": "イット・ワズ・リトゥン。",
      "my candle was nearly burnt out": "マイ・キャンドル・ワズ・ニアリー・バーント・アウト",
      "It was written by her.": "イット・ワズ・リトゥン・バイ・ハー。",
      "活字": "かつじ",
      "植字台": "しょくじだい",
    },
    paragraphs: [
      "1817年の暮れ、ロンドン。霧の底に沈んだ路地の印刷所で、十五歳の見習いネッドは、木の箱から鉛の{{活字}}を一つずつ拾っていた。左手の小さな金具に、一字ずつ、さかさまに並べていく。今日の原稿は、作者の名前の書かれていない3巻本の小説だった。",
      "序文の1行目で、ネッドの指が止まった。has been supposed, by Dr. Darwin。「親方、どうしてこんな回り道をするんです。Dr. Darwin has supposed って書けば、すむのに」。白髪の親方は、インクで黒くなった指で原稿をたたいた。「この文の主役はだれだ」。「……ダーウィン博士？」。「ちがう。この物語のもとになった出来事さ。だからそいつを頭に置く。博士の名前は、いちばん効くところ、文の終わりに取っておくんだ。それが{{受動態}}だよ」",
      "ネッドは扉のページを組みながら、もう一度首をかしげた。題名と、詩の引用と、出版社と、年。それだけだ。「書いた人の名前、入れ忘れてませんか」。親方は首を横にふった。「入れないんだよ。だから俺たちに言えるのは、It was written. ここまでだ。{{by 〜}}は、言わないこともできる」",
      "その夜、ネッドは一人残って、第4章を組んだ。11月の雨の夜、若い科学者が、自分の造ったものに命を吹きこむ場面だった。my candle was nearly burnt out。そこまで拾ったとき、自分の手もとのろうそくも、ちょうど燃えつきかけているのに気づいた。窓を打つ雨の音。ネッドは思わず、暗い部屋のすみをふり返った。さかさまの鉛の文字が、ほんの少し、ふるえて見えた。",
      "年が明けて、3冊組の新しい本が店に並んだ。コーヒーハウスでは客たちが、だれが書いたのかを言い合った。有名な詩人だという人も、序文を書いた男だという人もいた。けれど、扉は何も答えなかった。ネッドは、自分が組んだあの序文の最後の1文を思い出した。書き上げられた、ただ一つの物語。書き上げたのがだれなのかは、どこにも書かれていない。",
      "それから五年がたち、一人前の職人になったネッドは、新しく刷られた同じ物語の扉を見つけた。そこには、一人の女性の名前があった。ネッドは小さく笑って、声に出さずに言いなおした。It was written by her.",
    ],
    note: "ネッドと親方、印刷所の場面、会話や心情は創作です（実際の印刷所の名前や様子は描いていません）。『フランケンシュタイン』の初版が1818年1月にロンドンで作者名なしの3巻本として出たこと、扉に題名・ミルトンの詩句・出版社・年があったこと、序文と第4章の英文、作者がだれかが話題になったこと、1823年の第2版でメアリー・シェリーの名前が載ったことは史実・原作にもとづいています。実在の人物にはせりふを言わせていません。",
  },
  mistakes: [
    { wrong: "The window was broke by the wind.", right: "The window was broken by the wind.", why: "受動態は be ＋過去分詞。broke は過去形、過去分詞は broken です。" },
    { wrong: "This song was written by she.", right: "This song was written by her.", why: "by は前置詞なので、後ろの代名詞は目的格にします。" },
    { wrong: "I am interesting in history.", right: "I am interested in history.", why: "「興味をもたされている」側なので過去分詞 interested。interesting は「おもしろい」です。" },
    { wrong: "He was made clean the room.", right: "He was made to clean the room.", why: "使役の make を受動態にすると、原形の前に to が必要です。" },
  ],
  check: [
    { q: "They will hold the festival next week. を受動態に。", a: "The festival will be held next week (by them).", why: "助動詞のあとは be ＋過去分詞。by them は省くのがふつう。" },
    { q: "The roof is covered ___ snow. の ___ は？", a: "with", why: "be covered with 〜で「〜でおおわれている」。" },
    { q: "Ken is painting the wall. を受動態に。", a: "The wall is being painted by Ken.", why: "進行形の受動態は be being ＋過去分詞。" },
  ],
  next: [
    { label: "4択ドリル「受動態」に挑戦", href: "/learn/eibunpo-ko/h-eng-gram-judo" },
    { label: "ふりかえり「文型」（目的語と補語）", href: "/learn/eibunpo-ko/h-eng-gram-bunkei" },
    { label: "関連「分詞」（過去分詞の形容詞用法）", href: "/learn/eibunpo-ko/h-eng-gram-bunshi" },
  ],
};
