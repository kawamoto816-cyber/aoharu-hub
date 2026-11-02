import type { Lecture } from "../types";

const C = "/media/commons/j-en-1-daimeishi";

export const J_EN_1_DAIMEISHI: Lecture = {
  unit: "j-en-1-daimeishi",
  title: "代名詞は「文の中の場所」で形が変わる。I・my・me・mine",
  hook: "「ケンはサッカーが好きです。ケンのお兄さんもケンとよくサッカーをします」と、同じ名前をくり返すのは少しくどいですね。英語では2回目から he・his・him などの代名詞にかえます。どの形を使うかは、文の中のどこに置くかで決まります。",
  mystery: "シェイクスピアの有名な恋の詩では、同じ「あなた」が1行目では thee、2行目では thou、9行目では thy と、形をくるくる変えます。指しているのは同じ1人なのに、なぜでしょう？",
  mission: {
    from: "市立図書館で英詩の朗読会を開く司書",
    request: "来月の朗読会で、シェイクスピアのソネット18番を英語で読みます。予習した中学生から「thee と thou と thy、同じ人なのにどうして3つもあるの？　印刷のまちがい？」と聞かれ、答えに困ってしまいました。会の最初にわかりやすく説明したいので、名探偵のあなたに「あなた」の変身のなぞを解いてほしいのです。",
    thanks: "thee・thou・thy は、文の中の場所で決まる目的格・主格・所有格だったのですね。今の me・I・my と同じしくみだと話せば、中学生は400年前の詩を、自分の知っている英語として聞いてくれるはずです。",
  },
  sections: [
    {
      heading: "名詞のかわりをする語",
      body: "{{代名詞}}は、一度出た名詞のかわりに使う語です。男性1人なら{{he}}、女性1人なら{{she}}、物や動物1つなら{{it}}、2人・2つ以上なら人でも物でも{{they}}になります。自分をふくむときは we です。",
      reading: [
        "Ken has a sister. Ken's sister likes Ken's dog.（ケンには姉がいます。ケンの姉はケンの犬が好きです）。意味は通じますが、Ken が3回も出てきて読みにくいですね。英語ではふつう、Ken has a sister. She likes his dog. と書きます。一度出てきた名詞のかわりをする語を{{代名詞}}といいます。男性1人なら he、女性1人なら she、物や動物1つなら it、2人・2つ以上なら人でも物でも they、自分をふくむ「わたしたち」なら we です。日本語では「彼」「彼女」をあまり使いませんが、英語では2回目からほぼ必ず代名詞にかえます。",
        "代名詞がどれほど自然に使われるかは、英語圏の子どもが最初に出会う詩、{{マザーグース}}を見るとよくわかります。マザーグースはイギリスで何百年も口から口へ歌いつがれてきた伝承の童謡で、作者はわかりません。18世紀には本にまとめられ、アメリカにも広まりました。短くて調子がよいので、今も英語を話す家庭で子守唄や遊び歌として親しまれています。",
        "羊飼いの少女ボー・ピープの歌を下で聞いてみましょう。少女の名前は最初の1回だけで、すぐに her sheep（彼女の羊）になります。羊は them（それらを）、they（それらは）、their tails（それらのしっぽ）と、ずっと代名詞で語られます。sheep は1匹でも2匹以上でも同じ形ですが、them や their を見れば、羊がたくさんいることがわかります。Jack fell down, and broke his crown.（ジャックはころんで、頭をわった）と歌う「ジャックとジル」も同じで、名前は1回、あとは his です。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "Little Bo-Peep has lost her sheep,\nAnd can't tell where to find them;\nLeave them alone, and they'll come home,\nAnd bring their tails behind them.",
        ja: "小さなボー・ピープは羊をなくして、\nどこをさがせばいいのかわからない。\nほうっておけば、羊たちは帰ってくるよ、\nしっぽを後ろにつれてね。",
        cite: "Mother Goose, \"Little Bo-Peep\" (The Real Mother Goose, 1916)",
        source: "https://www.gutenberg.org/ebooks/10607",
      }],
      photos: [
        {
          src: `${C}/mothergoose.webp`, width: 800, height: 1091,
          alt: "青い地に、ほうきに乗った少女とガチョウの絵。まわりを羊飼いの少女や子どもたちの黒いシルエットが囲む楽譜の表紙",
          caption: "マザーグースの人物をシルエットで囲んだ楽譜の表紙（1900年代はじめ、ニューヨーク）。左上が Bo-Peep、右に Jack and Jill。どの歌も名前は1回、あとは{{代名詞}}で語られる。",
          credit: { author: "Scan by NYPL", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Bo-peep,_or,_Tales_of_Mother_Goose_(NYPL_Hades-464392-1165447).jpg" },
        },
      ],
      figure: {
        type: "formula",
        title: "名詞を代名詞にかえる",
        prose: true,
        steps: [
          { expr: "Ken likes Yumi.", note: "名前をそのまま使う" },
          { expr: "{{He}} likes {{her}}.", note: "主語の Ken → He、動詞のあとの Yumi → her" },
          { expr: "{{His}} sister knows {{them}}.", note: "Ken の → His、2人 → them" },
        ],
      },
      cliff: "ボー・ピープの歌では、羊が they になったり them になったりしました。形が変わるのはなぜ？",
    },
    {
      heading: "場所で決まる3つの形",
      body: "人称代名詞は、文の中の場所によって形が変わります。主語の位置では{{主格}}（I・he）、名詞の前で「〜の」を表すときは{{所有格}}（my・his）、動詞や前置詞のあとでは{{目的格}}（me・him）です。it と you は主格と目的格が同じ形です。",
      reading: [
        "I love my dog. My dog loves me.（わたしは自分の犬が大好き。わたしの犬もわたしが大好き）。同じ「わたし」が I・my・me と3つの形で出てきます。主語の位置では{{主格}}の I、dog という名詞の前で「〜の」を表すときは{{所有格}}の my、loves という動詞のあとでは{{目的格}}の me です。日本語なら「わたしは」「わたしの」「わたしを」と、後ろにつける「は・の・を」で役わりを表しますが、英語は単語そのものの形を変えて表します。だから英語では、形を見るだけで、その人が文の中で何をしているかがわかるのです。",
        "この3つの形を短い詩の中で見事に使いこなしたのが、アメリカの詩人{{エミリー・ディキンソン}}（1830〜1886年）です。マサチューセッツ州の小さな町アマーストに生まれ、後半生はほとんど家から出ずに、1800編近い詩を書きました。生きているあいだに発表されたのは10編ほどで、亡くなったあとの1890年代に家族や友人が詩集を出すと評判になりました。今ではアメリカを代表する詩人の1人です。",
        "下の詩は、I'm nobody!（わたしは、名もない人）で始まります。主語の I、Who are you? の you は主格。a pair of us の us は、前置詞 of のあとなので we の目的格です。They'd banish us の they は主格、動詞 banish（追い出す）のあとの us は目的格。最後の your name の your は、名詞の前の所有格です。有名になりたがる人をカエルにたとえ、「目立たないわたしたち」の仲間になろうと読者に呼びかける詩。I と you が us になる瞬間に、ひそひそ話のような親しさが生まれます。",
      ],
      recite: [{
        lang: "en", voice: "female",
        text: "I'm nobody! Who are you?\nAre you nobody, too?\nThen there's a pair of us — don't tell!\nThey'd banish us, you know.\n\nHow dreary to be somebody!\nHow public, like a frog\nTo tell your name the livelong day\nTo an admiring bog!",
        ja: "わたしは、名もない人。あなたはだあれ？\nあなたも、名もない人？\nなら、わたしたちはふたり組。ないしょだよ！\nばれたら追い出されちゃう。\n\nひとかどの人になるなんて、つまらない！\nみんなに見られて、まるでカエル。\n一日じゅう自分の名前を言いつづけるの、\nほめてくれる沼に向かって！",
        cite: "Emily Dickinson, \"I'm nobody! Who are you?\" (Poems, Series Two, 1891)",
        source: "https://www.gutenberg.org/ebooks/2679",
      }],
      photos: [
        {
          src: `${C}/dickinson.webp`, width: 617, height: 765,
          alt: "黒っぽいドレスに白いえりの若い女性が、いすにすわって小さな花を持っている古い白黒写真",
          caption: "エミリー・ディキンソン（1848年ごろの銀板写真）。本人の写真として確かなものは数少ない。I・you・us・they・your を、わずか8行の詩で使い分けた。",
          credit: { author: "Unknown author", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Emily_Dickinson_daguerreotype_(Restored).jpg" },
        },
      ],
      figure: {
        type: "compare",
        title: "人称代名詞の変化（主格・所有格・目的格）",
        columns: [{ title: "主格 〜は", tone: "blue" }, { title: "所有格 〜の", tone: "yellow" }, { title: "目的格 〜を・に", tone: "red" }],
        rows: [
          { cells: ["I", "my", "me"] },
          { cells: ["you", "your", "you"] },
          { cells: ["he", "his", "him"] },
          { cells: ["she", "her", "her"] },
          { cells: ["it", "its", "it"] },
          { cells: ["we", "our", "us"] },
          { cells: ["they", "their", "them"] },
        ],
        note: "her は所有格と目的格が同じ形。his は所有格と所有代名詞が同じ形。",
      },
      cliff: "400年前のシェイクスピアの「あなた」は、今の you よりずっと着がえが多かったのです。",
    },
    {
      heading: "迷ったら、置く場所を見る",
      body: "空らんに入る形は、その空らんが文のどこにあるかで決まります。動詞の前で主語になるなら主格、すぐ後ろに名詞が続くなら所有格、動詞や with・for などの{{前置詞のあと}}なら目的格です。「〜のもの」と名詞なしで使う{{所有代名詞}}（mine・yours・his・hers・ours・theirs）もあります。",
      reading: [
        "（　）に入る代名詞に迷ったら、意味より先に{{置く場所}}を見ます。（　）plays tennis. なら動詞の前の主語なので he。（　）bag なら名詞の前なので his。with（　）なら{{前置詞のあと}}なので him。もう1つ、This bag is mine.（このかばんはわたしのものです）のように、後ろに名詞を置かずに「〜のもの」を表す{{所有代名詞}}があります。mine・yours・his・hers・ours・theirs の6つで、Is this yours?（これはあなたのですか）のようにも使います。",
        "この「場所で形が変わる」しくみは、400年前の英語ではもっとはっきりしていました。イギリスの劇作家{{シェイクスピア}}（1564〜1616年）は劇のほかに、14行でできた恋の詩{{ソネット}}を154編書き、1609年にロンドンで詩集が出ました。いちばん有名なのが18番で、愛する人を夏の日とくらべ、「夏はいつか終わるが、あなたの美しさはこの詩の中で永遠に生きる」とうたいます。",
        "当時の英語には、親しい1人の相手を呼ぶ「あなた」に、主格の{{thou}}、目的格の{{thee}}、所有格の{{thy}}、所有代名詞の thine という4つの形がありました。今の you・you・your・yours にあたります。thou はやがて日常の英語からすがたを消し、今は you がその役わりを引き受けています。you だけ主格と目的格が同じ形なのは、昔の英語ではもともと別の形だった「あなたがたは」と「あなたがたを」が、1つの you にまとまったなごりです。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "Shall I compare thee to a summer's day?\nThou art more lovely and more temperate:\nRough winds do shake the darling buds of May,\nAnd summer's lease hath all too short a date:\nSometime too hot the eye of heaven shines,\nAnd often is his gold complexion dimm'd,\nAnd every fair from fair sometime declines,\nBy chance, or nature's changing course untrimm'd:\nBut thy eternal summer shall not fade,\nNor lose possession of that fair thou ow'st,\nNor shall death brag thou wander'st in his shade,\nWhen in eternal lines to time thou grow'st,\nSo long as men can breathe, or eyes can see,\nSo long lives this, and this gives life to thee.",
        say: "Shall I compare thee to a summer's day?\nThou art more lovely and more temperate:\nRough winds do shake the darling buds of May,\nAnd summer's lease hath all too short a date:\nSometime too hot the eye of heaven shines,\nAnd often is his gold complexion dimmed,\nAnd every fair from fair sometime declines,\nBy chance, or nature's changing course untrimmed:\nBut thy eternal summer shall not fade,\nNor lose possession of that fair thou owest,\nNor shall death brag thou wanderest in his shade,\nWhen in eternal lines to time thou growest,\nSo long as men can breathe, or eyes can see,\nSo long lives this, and this gives life to thee.",
        ja: "きみを夏の一日にたとえようか。\nきみのほうがもっと美しく、もっとおだやかだ。\n荒い風は五月のかわいいつぼみをゆさぶり、\n夏に貸し出された日々は、あまりにも短い。\nときに天の目（太陽）は暑くかがやきすぎ、\nその金色の顔も、しばしば雲にかげる。\n美しいものはみな、いつか美しさをうしなう、\n偶然に、あるいは自然のうつろいに、かざりをはがされて。\nけれど、きみの永遠の夏はあせることがない。\nきみの持つその美しさも、うしなわれはしない。\n死が「きみはわが影をさまよう」とほこることもない、\n永遠の詩の行の中で、きみが時とともに育つかぎり。\n人が息をし、目がものを見るかぎり、\nこの詩は生き、この詩がきみに命をあたえる。",
        cite: "William Shakespeare, Sonnet 18 (Shake-speares Sonnets, 1609)",
        source: "https://www.gutenberg.org/ebooks/1041",
      }],
      photos: [
        {
          src: `${C}/sonnets-1609.webp`, width: 800, height: 1154,
          alt: "古い紙に SHAKE-SPEARES SONNETS と大きく印刷され、下に AT LONDON 1609 とある本のとびら",
          caption: "1609年にロンドンで出た『シェイクスピアのソネット集』のとびら。この本の18番で、同じ「あなた」が{{thee}}・{{thou}}・{{thy}}と形を変える。",
          credit: { author: "William Shakespeare", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Sonnets1609titlepage.jpg" },
        },
      ],
      reveal: "答えは「置く場所」です。1行目の Shall I compare thee は、動詞 compare のあとなので目的格の{{thee}}（今の you を）。2行目の Thou art は主語なので主格の{{thou}}（今の you は）。9行目の thy eternal summer は名詞の前なので所有格の{{thy}}（今の your）。シェイクスピアは同じ1人を、文の中の場所に合わせて、今の I・my・me と同じしくみで正しく着がえさせていたのです。",
      figure: {
        type: "tree",
        title: "空らんの場所から形を選ぶ",
        root: {
          label: "（ ）に入る代名詞",
          tone: "navy",
          children: [
            { label: "主語の位置", sub: "（ ）plays tennis.", children: [{ label: "主格 he", tone: "blue" }] },
            { label: "名詞の前", sub: "（ ）bag", children: [{ label: "所有格 his", tone: "yellow" }] },
            { label: "動詞・前置詞の後", sub: "with（ ）", children: [{ label: "目的格 him", tone: "red" }] },
            { label: "名詞なしで「〜のもの」", sub: "This is（ ）.", children: [{ label: "所有代名詞 his" }] },
          ],
        },
      },
      cliff: "ソネットの最後の行には this が2回。この this は、いったい何を指しているのでしょう？",
    },
    {
      heading: "this・that・these・those",
      body: "近くのものは{{this}}、遠くのものは{{that}}で指します。2つ以上なら、this は{{these}}、that は{{those}}になり、be動詞も are にかわります。名前を表す名詞には 's をつけて Ken's（ケンの）のように「〜の」を表せます。",
      reading: [
        "手もとにあるものは{{this}}（これ）、はなれたところにあるものは{{that}}（あれ）で指します。2つ以上なら this は{{these}}、that は{{those}}にかわり、These are my books.（これらはわたしの本です）のように be動詞も are になります。this や that は物を指すだけでなく、前やすぐあとに出てくる「話の内容」を指すこともできます。人の名前には {{'s}} をつけて Ken's bag（ケンのかばん）のように「〜の」を表します。",
        "ソネット18番の最後の2行を見てみましょう。So long as men can breathe, or eyes can see, / So long lives this, and this gives life to thee.（人が息をし、目がものを見るかぎり、この詩は生き、この詩がきみに命をあたえる）。2つの this が指しているのは、読者がいま手にしている「この詩」そのものです。人はいつか年をとるけれど、この詩が読まれるかぎり、きみの美しさは生きつづける。実際にこの詩は400年以上読まれ、詩の予言は今もかなっています。ちなみに、とびらの SHAKE-SPEARES に 's がないのは、当時はまだアポストロフィをつけるきまりが定まっていなかったからです。",
        "these が歴史を動かした一文もあります。1776年7月4日、北アメリカの13の植民地がイギリスからの独立を宣言した{{独立宣言}}です。主にトマス・ジェファソンが起草し、We hold these truths to be self-evident（われわれは、これらの真理を自明のものと考える）と始まる一文で、すべての人は平等につくられていると述べました。these は、すぐあとに並べる考えをまとめて指しています。当時は奴隷制度が残り、この理念がすべての人にあてはめられたわけではありません。それでも後の時代、多くの人がこの一文を引いて、平等を求めました。",
      ],
      recite: [{
        lang: "en", voice: "male",
        text: "We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness.",
        ja: "われわれは、これらの真理を自明のものと考える。すべての人は平等につくられていること、人はみな創造主から、ゆずりわたすことのできない権利をあたえられていること、その中には、生命、自由、そして幸福を追い求める権利がふくまれていることを。",
        cite: "Declaration of Independence (1776)",
        source: "https://www.archives.gov/founding-docs/declaration-transcript",
      }],
      photos: [
        {
          src: `${C}/trumbull.webp`, width: 800, height: 525,
          alt: "広い議場で、机の前に立つ5人の男性が書類を差し出し、まわりに大勢の男性がすわっている油絵",
          caption: "トランブル『独立宣言』（1819年、アメリカ連邦議会議事堂）。起草委員が宣言案を議会に出す場面を想像してえがいた絵。宣言の these と they が、平等の理念を指し示す。",
          credit: { author: "John Trumbull", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Declaration_of_Independence_(1819),_by_John_Trumbull.jpg" },
        },
      ],
      figure: {
        type: "compare",
        title: "近い・遠いと数で4つ",
        columns: [{ title: "近く", tone: "blue" }, { title: "遠く", tone: "yellow" }],
        rows: [
          { label: "1つ", cells: ["this（これ）", "that（あれ）"] },
          { label: "2つ以上", cells: ["these（これら）", "those（あれら）"] },
        ],
        note: "These are my books. のように、these・those の文では be動詞は are。",
      },
    },
  ],
  story: {
    kind: "manzai",
    title: "400年前のあなたは着がえ上手",
    cast: ["コハル", "レン"],
    lines: [
      { who: "コハル", text: "どうもー、コハルとレンです！　今日は図書館で、英語の詩の朗読会を聞いてきました！" },
      { who: "レン", text: "いいね。どんな詩だった？" },
      { who: "コハル", text: "ディキンソンの I'm nobody! Who are you? 作者はノーバディさんっていうんだね。", say: "ディキンソンの、アイム・ノーバディ！ フー・アー・ユー？ 作者はノーバディさんっていうんだね。" },
      { who: "レン", text: "名前じゃない！　nobody は「名もない人」。I は主語の位置だから{{主格}}。「わたしは名もない人。あなたはだれ？」って聞いてるの。", say: "名前じゃない！ ノーバディは、名もない人。アイは主語の位置だから主格。わたしは名もない人。あなたはだれ？って聞いてるの。" },
      { who: "コハル", text: "続きが a pair of us。us って、アメリカのこと？", say: "続きが、ア・ペア・オブ・アス。アスって、アメリカのこと？" },
      { who: "レン", text: "U.S. じゃない！　us は we の{{目的格}}。前置詞 of のあとだから us。「わたしたち、ふたり組だね」ってこと。", say: "ユーエスじゃない！ アスはウィーの目的格。前置詞オブのあとだからアス。わたしたち、ふたり組だね、ってこと。" },
      { who: "コハル", text: "次はシェイクスピア。Shall I compare thee …… 夏の日とお茶をくらべる詩！", say: "つぎはシェイクスピア。シャル・アイ・コンペア・ティー…… 夏の日とお茶をくらべる詩！" },
      { who: "レン", text: "お茶じゃない！　thee は昔の「あなたを」。compare という動詞のあとだから{{目的格}}。今なら you だよ。", say: "お茶じゃない！ ズィーは昔の、あなたを。コンペアという動詞のあとだから目的格。今ならユーだよ。" },
      { who: "コハル", text: "でも次の行は Thou art more lovely. あなたがもう変身してる！", say: "でも次の行は、ザウ・アート・モア・ラブリー。あなたがもう変身してる！" },
      { who: "レン", text: "主語の位置に来たから{{主格}}の thou。名詞の前なら所有格の thy。場所で形が変わるのは、今の I・my・me と同じしくみ。", say: "主語の位置に来たから主格のザウ。名詞の前なら所有格のザイ。場所で形が変わるのは、今のアイ・マイ・ミーと同じしくみ。" },
      { who: "コハル", text: "400年前のあなた、着がえが多いね。ファッションショーかな。" },
      { who: "レン", text: "おしゃれで着がえてるんじゃないの。文の中での役わりに合わせて、服をかえてるの。" },
      { who: "コハル", text: "あと、詩集の表紙に SHAKE-SPEARES って書いてあった。アポストロフィ、入れ忘れてるよ。", say: "あと、詩集の表紙にシェイクスピアズって書いてあった。アポストロフィ、入れ忘れてるよ。" },
      { who: "レン", text: "1609年は、まだつけるきまりが定まってなかったの。意味は「シェイクスピアの」。今なら Shakespeare's Sonnets。", say: "1609年は、まだつけるきまりが定まってなかったの。意味は、シェイクスピアの。今ならシェイクスピアズ・ソネッツ。" },
      { who: "コハル", text: "最後は独立宣言。We hold these truths. 「これらの真理」って、どれ？　机の上には見当たらないけど。", say: "最後は独立宣言。ウィー・ホールド・ジーズ・トゥルース。これらの真理って、どれ？ 机の上には見当たらないけど。" },
      { who: "レン", text: "机の上をさがさない！　{{these}} は、すぐあとに並べる「すべての人は平等」などの考えを指してるの。" },
      { who: "コハル", text: "よし、全部わかった。この詩集を指さして、This book is my.", say: "よし、全部わかった。この詩集を指さして、ディス・ブック・イズ・マイ。" },
      { who: "レン", text: "後ろに名詞がないなら、{{所有代名詞}}の mine でしょ。", say: "後ろに名詞がないなら、所有代名詞のマインでしょ。" },
      { who: "コハル", text: "マインって、鉱山のこと？" },
      { who: "レン", text: "「わたしのもの」！　This book is mine.", say: "わたしのもの！ ディス・ブック・イズ・マイン。" },
      { who: "コハル", text: "じゃあ、この詩集も mine。レンのおやつも mine。", say: "じゃあ、この詩集もマイン。レンのおやつもマイン。" },
      { who: "レン", text: "それは yours じゃなくて mine。わたしのでしょ！　もういいよ。", say: "それはユアーズじゃなくてマイン。わたしのでしょ！ もういいよ。" },
      { who: "コハル", text: "どうも、ありがとうございました！" },
    ],
    note: "コハルとレンは架空の人物で、会話はすべて創作です。マザーグース「Little Bo-Peep」、ディキンソンの詩（1891年刊）、シェイクスピアのソネット18番（1609年刊）、独立宣言（1776年）の英文は原文にもとづいています。",
  },
  mistakes: [
    { wrong: "I like he.", right: "I like him.", why: "動詞のあとは目的格。主語でない位置に he は置けない。" },
    { wrong: "This is me bag.", right: "This is my bag.", why: "名詞（bag）の前で「〜の」を表すのは所有格の my。" },
    { wrong: "This bag is my.", right: "This bag is mine.", why: "後ろに名詞がないときは所有代名詞 mine を使う。" },
    { wrong: "These is my pens.", right: "These are my pens.", why: "these は2つ以上なので be動詞は are。" },
  ],
  check: [
    { q: "I often play with ___ .（彼ら）", a: "them", why: "前置詞 with のあとは目的格。" },
    { q: "___ name is Emi.（彼女の）", a: "Her", why: "名詞 name の前なので所有格。文の最初なので大文字で書く。" },
    { q: "That is your pen. の that を those にかえて全文を書きましょう。", a: "Those are your pens.", why: "those は複数なので are、pen も pens にする。" },
  ],
  next: [
    { label: "4択ドリル「代名詞」に挑戦", href: "/learn/eibunpo-chu/j-en-1-daimeishi" },
    { label: "前の単元「名詞の複数形と冠詞」のレクチャー", href: "/learn/lecture/j-en-1-meishi" },
    { label: "つぎに「疑問詞」", href: "/learn/eibunpo-chu/j-en-1-gimonshi" },
  ],
};
