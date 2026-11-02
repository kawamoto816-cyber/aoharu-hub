import type { Lecture } from "../types";

const C = "/media/commons/j-en-3-tango";

export const J_EN_3_TANGO: Lecture = {
  unit: "j-en-3-tango",
  title: "中3の英単語は「語のパーツ」と「熟語」で増やし、知らない語は推測する",
  hook: "中3になると長文が長くなり、入試では教科書で見ていない単語にも出会います。中学で習う1600〜1800語を土台に、{{1つの語からなかまの語を広げる}}方法と、{{知らない語の意味を予想する}}方法を身につけると、覚える負担を減らしながら読める英文が増えます。",
  mystery: "300年前の小説『ロビンソン・クルーソー』で、少年ジューリーは Me kill! he eat me at one mouth! という、文法がばらばらの英語でさけびます。ところが主人公はすぐに意味をつかみ、one mouthful he meant（ひと口で、と言いたかったのだ）と書きそえました。辞書にもない言い方を、なぜ正しく読みとれたのでしょう？",
  mission: {
    from: "英語圏から来た留学生の先輩",
    request: "わたしは日本の高校に通う留学生です。今度、中学生向けの英語読書会で『ロビンソン・クルーソー』の冒険の場面を読むことになりました。ところが参加する中学生から「知らない単語が出たら、そこで読めなくなる」と心配の声が届いています。辞書なしでも読み進める方法を伝えるために、名探偵のあなたに、主人公がジューリーのばらばらな英語を読みとれたなぞを解いてほしいのです。",
    thanks: "品詞の場所、語のパーツ、前後の場面。この3つの手がかりがあれば、知らない言い方でも意味がしぼれるのですね。読書会では、まずライオンの場面で、みんなといっしょに推理してみます。",
  },
  sections: [
    {
      heading: "1語から「なかまの語」を広げる",
      body: "英単語は、{{もとになる語}}に頭（接頭辞）やおしり（接尾辞）がついてできていることがよくあります。happy を知っていれば、{{un-}}（〜でない）がついた unhappy、-ly がついた happily、-ness がついた happiness も意味が予想できます。新しい語は、もとの語といっしょに覚えましょう。",
      reading: [
        "英単語の多くは、レゴのブロックのように部品を組み合わせてできています。まん中の{{もとになる語}}に、前から{{接頭辞}}、うしろから{{接尾辞}}がつきます。happy（幸せな）に un-（〜でない）がつけば unhappy（不幸な）、-ness がつけば happiness（幸せ）。kind なら unkind・kindly・kindness と、1語を知るだけで3〜4語が「ほぼ読める語」に変わります。中3で出会う長い語も、部品に分ければ知っている語が顔を出すことが多いのです。",
        "1719年4月、ロンドンで1冊の本が出ました。作者はダニエル・デフォー。商人やジャーナリストとして働いてきた、当時50代末の書き手です。船が難破し、ただ1人無人島に流れついた男が、28年間を生きぬく話。これが『{{ロビンソン・クルーソー}}』で、イギリスの小説の始まりの1つに数えられます。本はよく売れ、その年のうちに何度も版を重ねました。",
        "初版の長い題名には、Who lived Eight and Twenty Years, all alone in an un-inhabited Island（たった1人で、人の住まない島に28年間暮らした）とあります。un-inhabited を分けると、un-（〜でない）＋ inhabit（住む）＋ -ed（〜された）。「人に住まれていない」、つまり無人の島です。ただし inhabit の in- は「〜でない」ではなく「中に」の意味。同じ形の部品でも意味がちがうことがあるので、最後は文の意味で確かめましょう。",
        "物語は、主人公が自分の名前の由来を語るところから始まります。父はドイツの港町ブレーメンから来た外国人で、本当の名字は Kreutznaer（クロイツナー）。それがイギリスで言いならわされるうちに形がくずれ、Crusoe になったというのです。単語は人に使われながら形を変えていく生きもの。部品の組み合わせも、その長い歴史の中で生まれてきました。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "I was born in the year 1632, in the city of York, of a good family, though not of that country, my father being a foreigner of Bremen, who settled first at Hull. He got a good estate by merchandise, and leaving off his trade, lived afterwards at York, from whence he had married my mother, whose relations were named Robinson, a very good family in that country, and from whom I was called Robinson Kreutznaer; but, by the usual corruption of words in England, we are now called—nay, we call ourselves and write our name—Crusoe; and so my companions always called me.",
        ja: "わたしは1632年、ヨーク市の良い家に生まれた。ただし、もとはこの国の家ではない。父はブレーメン生まれの外国人で、はじめはハルの町に住みついた。商売でひと財産をきずくと店をたたみ、のちにヨークで暮らした。そこで母と結婚したのだ。母の一族はロビンソンといって、その地方のたいへん良い家だった。そのためわたしはロビンソン・クロイツナーと名づけられた。けれどもイギリスではよくあるように言葉がなまって、今ではわが家はクルーソーと呼ばれている。いや、自分たちでもそう名のり、そう書いている。だから仲間たちも、いつもわたしをそう呼んだ。",
        cite: "Daniel Defoe, Robinson Crusoe, Chapter I (1719)",
        source: "https://www.gutenberg.org/ebooks/521",
      }],
      photos: [
        {
          src: `${C}/frontispiece.webp`, width: 618, height: 534,
          alt: "毛皮の服ととんがり帽子の男が銃を2本かついで立つ版画と、THE LIFE AND STRANGE SURPRIZING ADVENTURES OF ROBINSON CRUSOE と刷られた題名のページ",
          caption: "『ロビンソン・クルーソー』初版（1719年、ロンドン）の口絵と題名のページ。題名の中に un-inhabited Island（人の住まない島）とあり、{{接頭辞}} un- が使われている。",
          credit: { author: "Unknown author", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Robinson_Crusoe_1719_1st_edition.jpg" },
        },
      ],
      figure: {
        type: "tree",
        title: "happy から広がる語",
        root: {
          label: "happy",
          sub: "幸せな（形容詞）",
          children: [
            { label: "unhappy", sub: "不幸な", tone: "red" },
            { label: "happily", sub: "幸せに（副詞）", tone: "blue" },
            { label: "happiness", sub: "幸せ（名詞）", tone: "yellow" },
          ],
        },
      },
      cliff: "頭の部品が「意味」を変えるなら、おしりの部品は何を変えるのでしょう？",
    },
    {
      heading: "語のおしりで品詞がわかる",
      body: "接尾辞は、その語の{{品詞（名詞・形容詞・副詞など）}}を教えてくれます。-ful や -ous なら形容詞、-ly ならたいてい副詞、-tion や -ness なら名詞です。品詞がわかると、文の中のどこに置く語なのかもわかります。",
      reading: [
        "接尾辞は、語の意味よりも{{品詞}}を変えるはたらきが中心です。care（注意）に -ful がつくと careful（注意深い）という形容詞、さらに -ly がつくと carefully（注意深く）という副詞。inform（知らせる）に -ation がつくと information（情報）という名詞になります。おしりを見れば、その語が「もの」なのか「ようす」なのか「やり方」なのかが見当がつき、文の中でどこに置かれるかもわかります。",
        "-ful はもともと full（いっぱいの）から来た部品です。use＋ful で「使い道がいっぱい」＝役に立つ、help＋ful で「助けがいっぱい」＝助けになる。『ロビンソン・クルーソー』でも、主人公は砂浜のライオンを dreadful monster（おそろしい怪物）と呼びます。dread（おそれ）がいっぱいの怪物、というわけです。同じ場面の terrible（おそろしい）の -ible も形容詞をつくる部品です。",
        "ただし -ful には、名詞をつくる使い方もあります。hand（手）＋ful で handful（ひとにぎりの量）、spoon＋ful で spoonful（スプーン1杯の量）。「入れものがいっぱいになる量」を表すのです。このように、同じおしりでも品詞が2通りのことがあります。friendly（親しげな）が -ly なのに形容詞であるのと同じく、最後は{{文の中の位置}}で確かめるのが大切です。",
      ],
      figure: {
        type: "compare",
        title: "よく出る語のおしり",
        columns: [{ title: "おしり" }, { title: "品詞", tone: "yellow" }, { title: "例" }],
        rows: [
          { cells: ["-tion / -ness", "名詞", "information / kindness"] },
          { cells: ["-ful / -ous", "形容詞", "useful / famous"] },
          { cells: ["-ly", "副詞（多い）", "quickly / slowly"] },
          { cells: ["-er / -ist", "名詞（人）", "player / pianist"] },
        ],
        note: "friendly（親切な）のように、-ly でも形容詞の語があります。",
      },
      cliff: "では、1語ずつ訳すと意味がずれてしまう語のかたまりは、どう読めばいいのでしょう？",
    },
    {
      heading: "熟語は「かたまり」で覚える",
      body: "be famous for（〜で有名だ）や look forward to（〜を楽しみに待つ）のように、{{いくつかの語で1つの意味}}になる熟語は、1語ずつ訳すと意味がずれます。前置詞まで{{セットで}}覚え、短い例文で使い方も確かめましょう。look forward to の to は前置詞なので、あとには名詞か {{-ing 形}}が来ます。",
      reading: [
        "look forward to を1語ずつ訳すと「前方を見る、〜へ」。これでは「〜を楽しみに待つ」という意味にはたどり着けません。{{熟語}}は、いくつかの語がまとまって1つの意味を表す「かたまり」です。I'm looking forward to seeing you.（あなたに会えるのを楽しみにしています）のように、短い例文ごと覚えると、前置詞の to のあとに -ing 形が来ることもいっしょに身につきます。",
        "『ロビンソン・クルーソー』には、船乗りの物語らしいかたまりがよく出てきます。主人公は島に流れつく前、北アフリカでとらわれの身になり、少年ジューリーと小舟でにげ出しました。アフリカの海岸ぞいを進む2人は、水を手に入れるため何度も go on shore（上陸する）します。on shore は「岸の上に」。go と組んで「陸に上がる」という意味の{{かたまり}}です。ever after（それからずっと）、by-and-by（やがて）も、この本によく出てくる言い方です。",
        "次の場面では、ジューリーが自分だけで水をくみに行くと言い出します。少年の英語は If wild mans come, they eat me, you go wey.。man の複数形は men、eat は will eat、wey は away のことでしょう。文法はばらばらでも、「もし荒っぽい人たちが来たら、食べられるのはぼく。あなたはにげて」という気持ちははっきり伝わります。主人公はこの答えを聞いて、少年を一生いとしく思うようになったと書いています。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "Xury said, if I would let him go on shore with one of the jars, he would find if there was any water, and bring some to me. I asked him why he would go? why I should not go, and he stay in the boat? The boy answered with so much affection as made me love him ever after. Says he, “If wild mans come, they eat me, you go wey.”",
        ja: "ジューリーは、つぼを1つ持って上陸させてくれるなら、水があるかどうか探して、くんできますと言った。わたしはたずねた。なぜおまえが行くのか。なぜわたしが行って、おまえが舟に残らないのか。少年の答えにはあまりに深い思いやりがこもっていて、わたしはそれからずっと、この子をいとしく思うようになった。少年は言った。「もし、こわい人たち来る、ぼく食べられる。あなた、にげる」",
        cite: "Daniel Defoe, Robinson Crusoe, Chapter II (1719)",
        source: "https://www.gutenberg.org/ebooks/521",
      }],
      cliff: "そしてライオンの場面。少年のさけびは、さらになぞめいています。",
    },
    {
      heading: "知らない単語は前後から推測する",
      body: "長文で知らない単語が出ても、すぐに止まる必要はありません。まず{{文の中の位置から品詞}}を考え、次に語のパーツを見て、最後に{{前後の文}}から意味を予想します。例のあとの such as や、言いかえの or、反対を表す but は、意味のヒントになります。",
      reading: [
        "入試の長文には、知らない語が必ずまじっています。そこで止まらず、3つの手がかりで意味をしぼりましょう。1つめは{{文の中の位置}}。a や the のあとなら名詞、be動詞のあとなら形容詞かもしれません。2つめは{{語のパーツ}}。un- や -ful など、知っている部品をさがします。3つめは{{前後の文}}。such as のあとには例が、or のあとには言いかえが、but のあとには反対の内容が来ることが多く、意味のヒントになります。",
        "ライオンの場面で、主人公は少年に「上陸してしとめてこい」と命じます。おびえたジューリーの返事が Me kill! he eat me at one mouth!。主語の I が me になり、eats の s もありません。とくにふしぎなのが at one mouth（1つの口で）です。けれども主人公は、すぐに one mouthful he meant（ひと口で、と言いたかったのだ）と書きそえました。",
        "主人公の頭の中をたどってみましょう。まず位置。he eat me のあとの at one mouth は、「どのように食べるか」を説明するかたまりです。次に場面。相手はおそろしいライオンで、少年はおびえている。最後にパーツ。mouth に -ful をつければ mouthful、「口いっぱいの量」です。だから at one mouthful で「ひと口で」。品詞・パーツ・前後の3つがそろえば、辞書にない言い方でも意味はしぼりこめるのです。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "Xury, whose eyes were more about him than it seems mine were, calls softly to me, and tells me that we had best go farther off the shore; “For,” says he, “look, yonder lies a dreadful monster on the side of that hillock, fast asleep.” I looked where he pointed, and saw a dreadful monster indeed, for it was a terrible, great lion that lay on the side of the shore, under the shade of a piece of the hill that hung as it were a little over him. “Xury,” says I, “you shall go on shore and kill him.” Xury, looked frighted, and said, “Me kill! he eat me at one mouth!”—one mouthful he meant.",
        ja: "どうやらわたしよりずっと目ざといジューリーが、小声でわたしを呼び、岸からもっとはなれたほうがいいと言う。「だって」と少年は言った。「ほら、あそこの小山のわきに、おそろしい怪物がぐっすりねてる」。指さすほうを見ると、たしかにおそろしい怪物がいた。おそろしく大きなライオンが、岸のわきの、少しせり出した岩かげに横たわっていたのだ。「ジューリー」とわたしは言った。「上陸して、あいつをしとめてこい」。ジューリーはおびえた顔で言った。「ぼく、ころす！　あいつ、ぼく、ひと口で食べる！」――ひと口で、と言いたかったのだ。",
        cite: "Daniel Defoe, Robinson Crusoe, Chapter II (1719)",
        source: "https://www.gutenberg.org/ebooks/521",
      }],
      figure: {
        type: "flow",
        title: "知らない語に出会ったら",
        dir: "col",
        steps: [
          { label: "品詞を考える", sub: "名詞？動詞？形容詞？", tone: "navy" },
          { label: "パーツを見る", sub: "un- / -ful / -tion など", tone: "blue" },
          { label: "前後から予想", sub: "but・such as などがヒント", tone: "yellow" },
        ],
      },
      reveal: "主人公は、3つの手がかりを重ねて読みとっていました。{{文の中の位置}}から at one mouth は「どう食べるか」を表すかたまり、{{前後の場面}}からおびえた少年がライオンの大きな口を思いうかべていること、そして{{語のパーツ}}から mouth＋-ful＝mouthful（口いっぱいの量）。だから「ひと口で」と言いたいのだと、辞書なしでわかったのです。",
      cliff: "この小説は、英語そのものにも新しい言葉を残しました。",
    },
    {
      heading: "名作が英語に残した言葉",
      body: "物語の後半、主人公は島で助けた青年を{{フライデー}}と名づけ、身ぶりと場面を使って英語を教えます。このフライデーの名は、のちに「忠実な助手」を表す言葉として英語に定着しました。単語は、人の暮らしや物語からも生まれるのです。",
      reading: [
        "島に流れついて20年以上がたったころ、主人公は1人の青年を助けます。助けた日が金曜日だったので、青年を{{フライデー}}と名づけました。2人には共通の言葉がありません。主人公は指さしや身ぶりで、まず「フライデー」という名前、自分を呼ぶ「マスター（主人）」、そして yes と no とその意味を教えます。物や動作を見せながら、場面ごとに言葉を結びつけていく。これは、みなさんが文脈から単語を覚えるのと同じ道すじです。",
        "この物語は大評判になり、英語にも跡を残しました。man Friday（マン・フライデー）は「なんでもこなす、たよれる助手」を表す言葉として辞書にのり、20世紀には女性の助手を表す girl Friday という言い方も広まりました。一方で、白人の主人と従う側という2人の関係には、植民地を広げていった当時のヨーロッパの考え方が表れていると指摘され、今ではその点も考えながら読まれています。",
        "小説には、実際に起きた話が影響したといわれます。スコットランドの船乗りアレグザンダー・セルカークは、1704年に南米チリ沖の無人島に置きざりにされ、4年あまり1人で暮らしました。その島は1966年に「ロビンソン・クルーソー島」と名前を変えています（小説の島はカリブ海側に設定されています）。1つの物語が、島の名前にも、英語の辞書にも残る。単語を知ることは、その言葉を生んだ文化を知ることでもあるのです。",
      ],
      photos: [
        {
          src: `${C}/island.webp`, width: 800, height: 600,
          alt: "緑の山々に囲まれた入り江と、海ぞいの小さな町を、岩の上から見下ろした景色",
          caption: "チリ沖のロビンソン・クルーソー島。セルカークが1人で暮らした島で、1966年に小説にちなんだ名前になった。物語が地名に残った例。",
          credit: { author: "Serpentus", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0", source: "https://commons.wikimedia.org/wiki/File:Isla_Juan_Fernandez_(vista_hacia_Robinson_Crusoe_desde_Monta%C3%B1a).jpg" },
        },
      ],
    },
  ],
  story: {
    kind: "novel",
    title: "ひと口と、ひとにぎり",
    paragraphs: [
      "1719年の夏、ロンドン。テムズ川の船着き場に近いコーヒーハウスは、パイプのけむりと、こげた豆のにおいでむせかえっていた。給仕の少年ヨハンは、盆をかかえたまま、窓ぎわの大きな机に耳をすませていた。船乗りたちが、出たばかりの評判の本を回し読みしているのだ。題名は長すぎて、ヨハンには半分も読めなかった。",
      "ヨハンは、ドイツの港町から両親と移ってきて2年になる。名前はいつのまにか、店の主人に「ジョン」と呼ばれるようになった。言葉は形を変えてその土地になじむ。わかってはいても、自分の名前が少しずつ削られていくようで、ヨハンは英語の文字を見るのが少しこわかった。",
      "「上陸して、あいつをしとめてこい」。いちばん声の大きい年寄りの水夫が、ライオンの場面を読み上げていた。それから、おびえた少年のさけびを、わざと高い声でまねた。「ミー・キル！　ヒー・イート・ミー・アット・ワン・マウス！」。机じゅうがどっとわいた。若い水夫が首をひねった。「ワン・マウス？　口が1つ？　ライオンの口はもともと1つだろう」",
      "年寄りの水夫は、ページを指でたたいた。「あわてるな。すぐあとに、作者がちゃんと書いてる。ひと口で、と言いたかったのだ、とな」。それを聞いて、ヨハンの頭に故郷の言葉がうかんだ。ハント・フォル。手のいっぱい、ひとにぎり。ドイツ語では、手に「いっぱい」をつけると量になる。",
      "「……ハンドフル、みたいなものですか」。思わず声が出ていた。机の男たちがいっせいにふり向く。ヨハンは赤くなりながら、自分の手をにぎって見せた。「手いっぱいで、ひとにぎり。だから口いっぱいで、ひと口」。年寄りの水夫は目を丸くし、それから大声で笑った。「そうだ、マウスフルだ。{{語のパーツ}}が同じなんだな。坊主、おまえのほうが、こいつより英語がわかってるぞ」",
      "「船が出るまで貸してやる。続きを読んでみな」。年寄りの水夫は、コーヒーのしみがついた本をヨハンの盆にのせた。その晩、屋根裏のろうそくの下で、ヨハンは知らない語に出会うたびに指を止め、前後の場面と、語のおしりをたしかめた。un-inhabited。in は中、habit は住む。un が打ち消す。人が住んでいない島。ドイツ語と英語は、遠いところで同じ部品を分け合っている。",
      "知らない国の言葉は、まるごと知らないわけではなかった。ヨハンは、ジョンと呼ばれる自分の名前も、案外わるくないと思った。どちらの名前の中にも、同じ自分がいる。窓の外で、川を下る船の鐘が鳴った。",
    ],
    note: "ヨハン、水夫たち、コーヒーハウスの場面、会話や心情は創作です。『ロビンソン・クルーソー』が1719年にロンドンで出版されて評判になったこと、ジューリーのせりふと「one mouthful he meant」という書きそえ、題名の un-inhabited、主人公の名字がクロイツナーからクルーソーになったという設定は、原作・史実にもとづいています。ドイツ語の Handvoll（ひとにぎり）は実在の語です。",
  },
  mistakes: [
    { wrong: "I'm looking forward to see you.", right: "I'm looking forward to seeing you.", why: "look forward to の to は前置詞。あとは名詞か -ing 形です。" },
    { wrong: "She speaks English very good.", right: "She speaks English very well.", why: "動詞 speaks を説明するのは副詞の well。good は形容詞です。" },
    { wrong: "知らない単語が出るたびに読むのをやめる", right: "品詞・パーツ・前後から予想して読み進める", why: "入試の長文には知らない語が必ずあります。全体の意味をつかむほうが大切です。" },
  ],
  check: [
    { q: "careful に -ly をつけると、品詞は何になる？", a: "副詞（carefully：注意深く）", why: "-ly はおもに副詞をつくる。" },
    { q: "「京都は古いお寺で有名です」：Kyoto is ( ) ( ) its old temples.", a: "famous / for", why: "be famous for 〜 で「〜で有名だ」。" },
    { q: "possible に un- ではなく im- がついた語は？", a: "impossible（不可能な）", why: "im- も「〜でない」の意味。p の前ではふつう im- になる。" },
  ],
  next: [
    { label: "中学英単語1200で覚える", href: "/learn/chu-tango" },
    { label: "覚え方のきほん「英単語」（中1）", href: "/learn/lecture/j-en-1-tango" },
    { label: "単語を使って読む「長文読解」", href: "/learn/eigo-chu/j-en-3-chobun" },
  ],
};
