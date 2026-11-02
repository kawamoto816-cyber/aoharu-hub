import type { Lecture } from "../types";

const C = "/media/commons/h-eng-gram-setsuzokushi";
const PP = "https://www.gutenberg.org/ebooks/42671";

export const H_ENG_GRAM_SETSUZOKUSHI: Lecture = {
  unit: "h-eng-gram-setsuzokushi",
  title: "接続詞は「対等につなぐ」か「主の文にくっつける」か。節の中の時制にも注意",
  hook: "I was tired, but I finished my homework. の but は2つの文を対等につなぎ、I stayed home because it was raining. の because は「理由」の部分を主の文にくっつけています。つなぎ方の2つの型がわかると、長い英文の中でどれが主役の文かが見えてきます。",
  mystery: "英文学でいちばん有名な書き出し、オースティン『高慢と偏見』の It is a truth universally acknowledged, that ……（〜は世間でひろく認められた真理である）。どこにも「これはうそです」とは書いていないのに、英語の読者はすぐ「皮肉だ」と気づきます。文のどこが、その合図なのでしょう？",
  mission: {
    from: "ラジオの朗読番組のディレクター",
    request: "冬の特番で、『高慢と偏見』の書き出しを原文のまま朗読します。ところが下読みで、ベテランの朗読家が「この2文は、どこで息をついで、どこを強く読めばいいのか」と首をかしげました。皮肉に聞こえるかどうかは、読み方ひとつで決まります。名探偵のあなたに、書き出しのどこに皮肉の合図がかくれているのかを解き明かしてほしいのです。",
    thanks: "合図は that や however、so … that といった接続詞だったのですね。「真理」がだれの頭の中にあるのかを見せる that の前で一拍おけば、皮肉がそのまま聞き手の耳に届きます。",
  },
  sections: [
    {
      heading: "等位接続詞は、対等につなぐ",
      body: "and・but・or・so などの{{等位接続詞}}は、語と語・句と句・文と文を{{対等}}につなぎます。命令文のあとに続けると、{{命令文, and 〜}}は「そうすれば〜」、{{命令文, or 〜}}は「さもないと〜」の意味になります。どちらも if を使った文に言いかえられます。",
      reading: [
        "{{等位接続詞}}の and・but・or・so・for は、左右に同じ重さのものを置く「天びん」です。She sings and dances.（彼女は歌って踊る）なら動詞と動詞、in the morning or in the evening（朝か夕方に）なら句と句。つなぐ両側は、品詞や形をそろえるのが原則です。長い英文で and や or に出会ったら、「右側と同じ形をしたものは、左側のどこにあるか」を探しましょう。それが、何と何が{{対等}}に並んでいるかを見つけるいちばん確かな方法です。",
        "1813年に出たジェイン・オースティンの小説『高慢と偏見』の第1章は、ほとんどが夫婦の会話です。近くの大きな屋敷ネザーフィールドに、新しい借り手が来るといううわさ。夫のベネット氏はまず名前を聞き、次に Is he married or single?（結婚しているのか、独身なのか）とたずねます。この or は「AかBか」を選ばせる疑問文をつくるので、答えは yes でも no でもなく、どちらかを選んで言います。夫人の答えは、待ってましたとばかりの single でした。続く four or five thousand a year の or は「4千か5千」、つまり「4〜5千ポンドくらい」というおおよその幅を示します。",
        "命令文のあとの and と or は、天びんの片方に「命令」、もう片方に「その先」をのせる形です。Leave now, and you will catch the train. は「今出れば、その先に間に合う未来がある」、Leave now, or you will miss the train. は「出ないなら、別の道として乗りおくれる未来がある」。or が「さもないと」になるのは、「命令に従う道か、従わない道か」の二択を示しているからです。なお for は「というのは〜だから」と理由を後から添える等位接続詞で、because とちがって文の先頭には置けません。",
      ],
      figure: {
        type: "formula",
        title: "命令文, and / or",
        prose: true,
        steps: [
          { expr: "Leave now, {{and}} you will catch the train.", note: "そうすれば〜" },
          { expr: "Leave now, {{or}} you will miss the train.", note: "さもないと〜" },
          { expr: "{{If}} you leave now, you will catch the train.", note: "and の文を if で言いかえる" },
        ],
      },
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "\"What is his name?\"\n\"Bingley.\"\n\"Is he married or single?\"\n\"Oh! single, my dear, to be sure! A single man of large fortune; four or five thousand a year. What a fine thing for our girls!\"\n\"How so? how can it affect them?\"",
        ja: "「その人の名前は？」\n「ビングリーさんよ」\n「結婚しているのか、それとも独身か？」\n「まあ！ 独身ですとも、あなた！ 大金持ちの独身の方よ。年に4千か5千ポンド。うちの娘たちにとって、なんてすてきなことでしょう！」\n「どうしてだね？ それが娘たちにどう関係するんだ？」",
        cite: "Jane Austen, Pride and Prejudice, Chapter 1 (1813)",
        source: PP,
      }],
      photos: [
        {
          src: `${C}/bennets.webp`, width: 800, height: 1128,
          alt: "いすに座って本を読む男性と、その横で背を向けて座る羽根飾りの帽子の女性。足もとのクッションで猫が眠っている白黒の挿絵",
          caption: "ヒュー・トムソンの挿絵「ベネット夫妻」（1894年版）。本から目を離さない夫（左）と、うわさを話したくてたまらない夫人（右）。第1章はこの2人の会話で進む。",
          credit: { author: "Hugh Thomson", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Thomson-PP03_(recadrage).jpg" },
        },
      ],
      cliff: "and や or が2つの語とペアを組むと、動詞の形まで変わります。",
    },
    {
      heading: "2つで1組の接続詞と、動詞の数",
      body: "both A and B（AもBも）、either A or B（AかBのどちらか）、neither A nor B（AもBも〜ない）、not only A but also B（AだけでなくBも）は、{{2つで1組}}の接続詞です。これらが主語になったとき、both A and B は{{複数扱い}}、ほかの3つは動詞を{{Bに合わせる}}のが原則です。",
      reading: [
        "both・either・neither・not only は、「これから2つ並べますよ」という予告の札です。札が先に出るので、聞き手は A を聞いた時点で B が来るのを待ちかまえます。Both Ken and Mary are from Kobe. は2人とも、Neither Ken nor Mary is from Kobe. はどちらも〜ない。{{2つで1組}}の接続詞も等位接続詞の仲間なので、A と B の形をそろえるのが原則です。She is not only kind but also funny.（優しいだけでなく面白い）なら形容詞どうし、not only to read but also to write なら to 不定詞どうしです。",
        "主語になったときの動詞は、「足し算か、選択か」で考えます。both A and B は A と B を足すので{{複数扱い}}。either A or B と neither A nor B は「どちらか一方（またはどちらも〜ない）」の選択なので、動詞は近いほうの B に合わせます。not only A but also B は「B こそ言いたいこと」なので、やはり{{Bに合わせる}}。ただし同じ意味の B as well as A（AだけでなくBも）は、主役の B が文の先頭に来るので、動詞は B に合わせると考えます。My sisters as well as I like cats. の like は my sisters に合わせた形です。",
      ],
      figure: {
        type: "compare",
        title: "2つで1組の接続詞",
        columns: [{ title: "意味", tone: "blue" }, { title: "主語のときの動詞", tone: "yellow" }],
        rows: [
          { label: "both A and B", cells: ["AもBも", "複数扱い"] },
          { label: "either A or B", cells: ["AかBのどちらか", "Bに合わせる"] },
          { label: "neither A nor B", cells: ["AもBも〜ない", "Bに合わせる"] },
          { label: "not only A but also B", cells: ["AだけでなくBも", "Bに合わせる"] },
        ],
        note: "例：Either you or Ken has the key. / Not only I but also my sisters like cats.",
      },
      cliff: "では、文をまるごと「1つの名詞」に変えてしまう接続詞とは？",
    },
    {
      heading: "従属接続詞は、主の文に節をくっつける",
      body: "that・whether・when・because・though・if などの{{従属接続詞}}は、後ろの「主語＋動詞」を{{節}}にして、主の文にくっつけます。that・whether（if）の節は「〜ということ」「〜かどうか」という{{名詞節}}になり、主語や目的語になります。when・because・though などの節は、時・理由・譲歩・条件を表す{{副詞節}}になります。",
      reading: [
        "{{従属接続詞}}は天びんではなく「留め金」です。後ろの「主語＋動詞」をひとかたまりの{{節}}にまとめ、主の文にとめつけます。that と whether（if）がつくる{{名詞節}}は、文の中で名詞の席にすわります。I know that he is honest. の that 節は know の目的語、Whether he comes or not doesn't matter. の whether 節は主語です。一方、when・because・though・if・until などがつくる{{副詞節}}は、主の文に「いつ・なぜ・〜なのに・もし」を添えるつけ足しで、取り去っても主の文は成り立ちます。",
        "『高慢と偏見』の夫人は、名詞節の名人です。夫への第一声からして have you heard that Netherfield Park is let at last?（ネザーフィールドがやっと貸されたって、お聞きになった？）。そして下の長いせりふでは、Mrs. Long says（ロングさんが言うには）のあとに、that ……; that ……; that …… と、says の目的語になる that 節を3つも重ねます。うわさの中身を次々に名詞節につめこんでいく形が、そのまま「話が止まらない人」の口ぶりになっているのです。",
        "同じせりふの中には、so much delighted with it that he agreed ……（とても気に入ったので、すぐに話をまとめた）という{{so … that}}もあります。こちらの that は「〜ということ」ではなく、「とても〜なので…」という結果を表す副詞節です。同じ that でも、目的語の席にすわっているのか、so と組んで結果を添えているのかで、働きがまったくちがいます。Michaelmas（ミカエル祭）は9月29日で、家賃や契約の区切りの日でした。",
      ],
      figure: {
        type: "tree",
        title: "従属接続詞がつくる節",
        root: {
          label: "従属接続詞",
          tone: "navy",
          children: [
            {
              label: "名詞節",
              sub: "主語・目的語になる",
              tone: "blue",
              children: [
                { label: "that", sub: "〜ということ" },
                { label: "whether / if", sub: "〜かどうか" },
              ],
            },
            {
              label: "副詞節",
              sub: "主の文につけ足す",
              tone: "yellow",
              children: [
                { label: "時", sub: "when, until" },
                { label: "理由", sub: "because, since" },
                { label: "譲歩", sub: "though" },
                { label: "条件", sub: "if, unless" },
              ],
            },
          ],
        },
      },
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "\"Why, my dear, you must know, Mrs. Long says that Netherfield is taken by a young man of large fortune from the north of England; that he came down on Monday in a chaise and four to see the place, and was so much delighted with it that he agreed with Mr. Morris immediately; that he is to take possession before Michaelmas, and some of his servants are to be in the house by the end of next week.\"",
        ja: "「あら、あなた、ぜひ知っておいて。ロングさんの話ではね、ネザーフィールドを借りたのは、イングランド北部から来た大金持ちの若い方なんですって。月曜日に4頭立ての馬車で下見にいらして、すっかり気に入ったものだから、その場でモリスさんと話をまとめたんですって。ミカエル祭までには移ってこられて、来週の終わりには召し使いが何人か屋敷に入るんですって」",
        cite: "Jane Austen, Pride and Prejudice, Chapter 1 (1813)",
        source: PP,
      }],
      cliff: "夫人が夫にせがむひと言には、未来の話なのに will がありません。",
    },
    {
      heading: "時・条件の副詞節では、未来のことも現在形",
      body: "when・until・as soon as・if など、{{時}}や{{条件}}を表す副詞節の中では、未来のことでも{{現在形}}を使います。ただし、if や when が「〜かどうか」「いつ〜か」という{{名詞節}}をつくるときは、未来のことなら will を使います。節が文の中で目的語になっているか、つけ足しかで見分けます。",
      reading: [
        "ベネット夫人は、ビングリー氏が娘のだれかを好きになるかもしれないと期待して、夫にこうせがみます。you must visit him as soon as he comes.（あの方が来たらすぐに、訪ねてくださらなくちゃ）。来るのはこれから先なのに、as soon as he comes と{{現在形}}です。当時の上流の家では、新しく越してきた紳士のもとへ、まず一家の主人が訪問してあいさつしなければ、妻や娘たちが知り合いになるのは難しいとされていました。夫の訪問は、娘たちの将来への入口だったのです。",
        "なぜ will を使わないのでしょう。{{時}}や{{条件}}の副詞節は、主の文の出来事が起こるための「前提」を示します。「彼が来る」は、訪問という未来の行動の前提として、すでに起こったものとして扱われます。未来であることは主の文の must visit や will がもう示しているので、節の中でくり返す必要はないのです。I'll call you when he arrives. も、If it rains tomorrow, I'll stay home. も同じ考え方です。",
        "ところが、同じ when や if でも、{{名詞節}}をつくると話が変わります。I don't know when he will come.（彼がいつ来るのか知らない）の when 節は know の目的語で、「いつ来るか」そのものが話題です。前提ではなく、知りたい中身そのものなので、未来のことは will で表します。節を取り去っても主の文が成り立てば副詞節、成り立たなければ名詞節。この見分けが、時制のまちがいを防ぎます。",
      ],
      figure: {
        type: "formula",
        title: "副詞節と名詞節の時制",
        prose: true,
        steps: [
          { expr: "I'll call you when he {{arrives}}.", note: "時の副詞節：未来でも現在形" },
          { expr: "I'll stay home if it {{rains}} tomorrow.", note: "条件の副詞節：現在形" },
          { expr: "I don't know if it {{will rain}} tomorrow.", note: "know の目的語（名詞節）：will を使う" },
        ],
      },
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "\"Is that his design in settling here?\"\n\"Design! nonsense, how can you talk so! But it is very likely that he may fall in love with one of them, and therefore you must visit him as soon as he comes.\"",
        ja: "「それが目当てで、その人はここに住むのかね？」\n「目当てですって！ ばかばかしい、なんてことをおっしゃるの！ でも、あの方が娘のだれかを好きになることは、大いにありうるわ。だから、あの方がいらしたらすぐに、訪ねていってくださらなくちゃ」",
        cite: "Jane Austen, Pride and Prejudice, Chapter 1 (1813)",
        source: PP,
      }],
      photos: [
        {
          src: `${C}/dancing.webp`, width: 800, height: 931,
          alt: "舞踏会の広間で、すました顔の若い紳士に、年配の紳士が身をかがめて話しかけている白黒の挿絵。まわりにドレスの女性たち",
          caption: "ヒュー・トムソンの原画「これほど見事な踊りはめったに見られません」（1894年）。物語の舞踏会の場面。近所の家々が集まる舞踏会は、新しく来た紳士と知り合う大事な場だった。",
          credit: { author: "Hugh Thomson", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Houghton_Typ_805.94.8320_-_Pride_and_Prejudice,_1894,_Hugh_Thomson_-_superior_dancing.jpg" },
        },
      ],
      cliff: "いよいよ、あの有名な書き出しの2文を、接続詞を手がかりに分解します。",
    },
    {
      heading: "名作の書き出しを、接続詞で読みとく",
      body: "『高慢と偏見』の第1文は、{{形式主語 It}}を先に置き、言いたい中身を that の{{名詞節}}で後ろに回しています。第2文は、{{however＋形容詞}}の譲歩の副詞節と、{{so … that}}の結果の副詞節でできています。接続詞の働きを見分けると、文の主役と、作者の皮肉が見えてきます。",
      reading: [
        "ジェイン・オースティン（1775〜1817年）は、イングランド南部ハンプシャーの牧師の家に生まれました。20代のはじめに『第一印象』という題で書いた原稿は出版社に断られ、のちに大きく書き直されて、1813年1月、『高慢と偏見』として3巻本で出版されます。表紙に作者の名はなく、「『分別と多感』の作者による」とあるだけでした。財産を継ぐ男子がいないベネット家の5人姉妹と、裕福な独身男性たちをめぐるこの物語は、200年以上たった今も世界で読みつがれています。",
        "第1文 It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. の It は{{形式主語}}で、本当の主語は that 以下の{{名詞節}}です。長い中身を後ろに回し、先に「これは世間の真理である」という額縁を見せる形です。that の前のコンマは、当時の書き方の習慣です。注目したいのは、「財産のある独身男性は妻を必要としている」という主張が、作者自身の意見としてではなく、「世間でみとめられている」ことの中身として、名詞節の中に入れられていることです。",
        "第2文で、その額縁の正体が明かされます。However little known the feelings or views of such a man may be（そのような男性の気持ちや考えが、どれほど知られていなくても）は、{{however＋形容詞}}で「どれほど〜でも」を表す譲歩の副詞節。主の文は this truth is so well fixed in the minds of the surrounding families（この真理は、まわりの家々の頭にしっかり根づいている）、そして{{so … that}}の that 以下が結果です。本人の気持ちはだれも知らないのに、彼は近所の娘たちの「正当な財産」とみなされる。妻を求めているのは男性ではなく、まわりの家族のほうでした。その直後に、まさにそういう家族の一人、ベネット夫人が登場するのです。",
      ],
      figure: {
        type: "formula",
        title: "第2文を接続詞で分解する",
        prose: true,
        steps: [
          { label: "譲歩", expr: "{{However little known}} the feelings or views of such a man may be …,", note: "どれほど知られていなくても" },
          { label: "主の文", expr: "this truth is {{so}} well fixed in the minds of the surrounding families,", note: "真理があるのは家々の頭の中" },
          { label: "結果", expr: "{{that}} he is considered as the rightful property of some one or other of their daughters.", note: "だから娘たちの財産とみなされる" },
        ],
        note: "主の文の主語 this truth は、第1文の that 節の中身を指している。",
      },
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.\nHowever little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered as the rightful property of some one or other of their daughters.",
        ja: "財産のある独身の男性は、きっと妻を必要としているにちがいない。これは世間でひろく認められた真理である。\nそのような男性がはじめてある土地にやってきたとき、本人の気持ちや考えがどれほど知られていなくても、この真理はまわりの家々の頭にしっかりと根づいているので、彼はたちまち、その家々の娘のだれかが手に入れて当然の財産とみなされるのである。",
        cite: "Jane Austen, Pride and Prejudice, Chapter 1 (1813)",
        source: PP,
      }],
      photos: [
        {
          src: `${C}/incipit.webp`, width: 800, height: 1200,
          alt: "PRIDE AND PREJUDICE の飾り文字と、長い尾羽を広げたクジャクの絵。右に Chapter I と書き出しの英文が印刷されたページ",
          caption: "1894年版（ヒュー・トムソン挿絵）の第1章の最初のページ。クジャクは「高慢」の象徴。右に書き出しの2文が並び、that と however、so … that の流れが目で追える。",
          credit: { author: "Hugh Thomson", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:Thomson-P%26P-Incipit.jpg" },
        },
        {
          src: `${C}/chawton.webp`, width: 800, height: 600,
          alt: "青空の下、道路の角に建つ2階建てのれんが造りの家。白い窓枠と煙突が並ぶ",
          caption: "ハンプシャー州チョートンのオースティンの家（現在は記念館）。1809年から晩年まで暮らし、『高慢と偏見』の改稿や出版の準備もここで進めた。",
          credit: { author: "Simon Burchell", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:Jane_Austen%27s_House_Museum,_Chawton.jpg" },
        },
      ],
      reveal: "第1文で、オースティンは「財産のある独身男性は妻を必要としている」という主張を、自分の意見ではなく「世間の真理」の中身として、that の{{名詞節}}に入れました。第2文では、{{however＋形容詞}}の譲歩で「本人の気持ちはだれも知らない」と言い、{{so … that}}で、その真理が根づいているのは「まわりの家々の頭の中」であり、その結果、彼が娘たちの財産とみなされると明かします。妻をほしがっているのは男性ではなく近所の家族。接続詞が「だれの考えか」を示したことが、皮肉の合図だったのです。",
    },
  ],
  story: {
    kind: "novel",
    title: "貸本屋の三巻本と、that の前の一拍",
    paragraphs: [
      "1813年2月、イングランド南部の小さな町。十五歳のウィルは、雨のせいで外へ出られず、居間の暖炉の前でひざを抱えていた。そこへ姉のエレンが、町の貸本屋から借りてきた小さな本をかかえて帰ってきた。「新しい小説よ。3巻あって、これは第1巻。作者の名前はどこにもないの。『分別と多感』の作者による、ですって」",
      "「どうせ結婚の話だろ」。ウィルが言うと、エレンは笑って最初のページを開き、声に出して読みはじめた。It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. 「ほらね」とウィルは鼻を鳴らした。「金持ちの独身の男は妻がほしい。それが真理だって、作者が言ってる」",
      "「よく聞いて」。エレンは指で行をたどった。「It is a truth の It は前置きで、本当の主語は that から後ろ。that がつくる{{名詞節}}は、『世間がそう言っている中身』として入れられているだけ。作者が自分でそう言っているとは書いていないの」。そして2文目を、ゆっくり読んだ。However little known the feelings or views of such a man may be……。",
      "「however little known は、どれほど知られていなくても。本人の気持ちなんて、だれも知らないってこと。それなのに、this truth is so well fixed in the minds of the surrounding families」。エレンはそこで一拍おいた。「that……」。ウィルは身を乗り出した。「{{so … that}}だ。とても〜なので。……その真理が根づいてるのは、男の頭じゃなくて、まわりの家族の頭の中？」「そう。だから彼は、近所の娘たちの財産みたいに見られちゃうの」",
      "ウィルは思わず吹き出した。「じゃあ、妻をほしがってるのは男じゃなくて、近所のおばさんたちのほうじゃないか」。エレンもくすくす笑った。「接続詞ひとつで、話がひっくり返るでしょう。and や or は対等に並べる{{等位接続詞}}、that や however は文を主の文に留める{{従属接続詞}}。留め金を見れば、だれの考えかがわかるのよ」",
      "そのとき、廊下をばたばたと走る音がして、母親が居間に飛びこんできた。帽子のリボンもほどけたままだ。「聞いた？ 丘の上のお屋敷に、新しい借り手がつくんですって。北のほうから来た、お金持ちの若い独身の方だそうよ。いらしたらすぐに、お父さまに訪ねていただかなくちゃ」",
      "ウィルとエレンは顔を見合わせ、同時に本のページに目を落とした。母親がけげんな顔で「何がおかしいの」と聞くころには、ウィルはもう姉の手から第1巻を取り上げていた。「次、ぼくが読む。that の前で、ちゃんと一拍おくから」",
    ],
    note: "ウィル、エレン、母親と町の場面、会話や心情は創作です。『高慢と偏見』が1813年1月に3巻本で、作者名をふせて「『分別と多感』の作者による」として出版されたこと、当時、貸本屋で小説を借りて読むことが広く行われていたこと、作中の英文（第1章の書き出し）は事実・原作（初版にもとづく本文）によります。",
  },
  mistakes: [
    { wrong: "Though it was cold, but we went swimming.", right: "Though it was cold, we went swimming.", why: "though と but は両方とも「けれども」の役。1つの文で両方は使いません。" },
    { wrong: "Both Ken and Mary is from Kobe.", right: "Both Ken and Mary are from Kobe.", why: "both A and B は2人なので複数扱いです。" },
    { wrong: "Let's start when he will come.", right: "Let's start when he comes.", why: "時を表す副詞節の中は、未来のことでも現在形です。" },
    { wrong: "During I was in Hawaii, I swam every day.", right: "While I was in Hawaii, I swam every day.", why: "during は前置詞で後ろは名詞。文を続けるなら接続詞 while です。" },
  ],
  check: [
    { q: "Hurry up, ___ you'll be late.", a: "or", why: "「急ぎなさい、さもないと遅れる」なので 命令文, or。" },
    { q: "Not only Tom but also his parents ___ (like / likes) soccer.", a: "like", why: "動詞は B の his parents（複数）に合わせる。" },
    { q: "Please wait here until I ___ (come / will come) back.", a: "come", why: "until の節は時の副詞節なので、未来でも現在形。" },
  ],
  next: [
    { label: "4択ドリル「接続詞」に挑戦", href: "/learn/eibunpo-ko/h-eng-gram-setsuzokushi" },
    { label: "つぎの単元「話法」", href: "/learn/eibunpo-ko/h-eng-gram-waho" },
    { label: "ひとつ前「前置詞」", href: "/learn/eibunpo-ko/h-eng-gram-zenchishi" },
  ],
};
