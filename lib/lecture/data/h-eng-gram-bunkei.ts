import type { Lecture } from "../types";

const C = "/media/commons/h-eng-gram-bunkei";

export const H_ENG_GRAM_BUNKEI: Lecture = {
  unit: "h-eng-gram-bunkei",
  title: "文型は動詞の後ろに「何が何個」来るかで決まる。C は S か O と「＝」になる",
  hook: "He made her a doll. と He made her happy. は、どちらも made her のあとに1語あるだけなのに、意味は「人形を作ってあげた」と「彼女を幸せにした」でまったくちがいます。この差を説明するのが文型です。文型がわかると、長い文でも骨組みが見え、訳をまちがえにくくなります。",
  mystery: "アメリカ文学の名作、メルヴィルの『白鯨』は Call me Ishmael. のたった3語で始まります。My name is Ishmael.（わたしの名はイシュメール）と書けば済むのに、作者はなぜ、命令文の、しかも第5文型を書き出しに選んだのでしょう？",
  mission: {
    from: "文庫の新訳を準備している翻訳者",
    request: "『白鯨』の新しい翻訳をまかされましたが、最初の3語で手が止まっています。「わたしの名はイシュメール」と訳すか、「イシュメールと呼んでくれ」と訳すか。20万語をこえる長い物語の入口になる3語の文型に何がこめられているのか、名探偵のあなたに解き明かしてほしいのです。",
    thanks: "名のる文ではなく、読者に「そう呼んでくれ」と頼む文だったのですね。本名かどうかもぼかしたまま、読者を語り手のとなりにすわらせる。冒頭は、その呼びかけが聞こえる訳にします。",
  },
  sections: [
    {
      heading: "まず修飾語（M）を外して、骨組みを見る",
      body: "文の要素は、{{S（主語）・V（動詞）・O（目的語）・C（補語）}}の4つです。時・場所・様子を表す副詞や「前置詞＋名詞」は{{M（修飾語）}}といい、文型には数えません。長い文はまず M をかっこでくくり、残った骨組みで文型を考えます。",
      reading: [
        "英文の骨組みは、動詞を中心に組み立てられています。だれが（S）、どうする（V）、何を（O）、どんなだ（C）。この4つが文の柱で、それ以外の「いつ・どこで・どのように」は柱にかざる飾り、つまり{{M（修飾語）}}です。飾りは情報として大切ですが、取り外しても家は倒れません。だから文型を考えるときは、まず M をかっこでくくって外し、残った柱だけを見ます。",
        "1611年に出た{{欽定訳聖書}}（King James Version）は、イングランド王ジェームズ1世の命令で、およそ50人の学者が7年ほどかけて訳した英語の聖書です。400年以上読みつがれ、その言い回しは英語のことわざや文学に数えきれないほど入りこみました。その最初の1文が下の文です。先頭の In the beginning は「前置詞＋名詞」なので M。外すと God created the heaven and the earth が残り、S（God）＋V（created）＋O（the heaven and the earth）の{{第3文型}}だとわかります。",
        "M は文のどこにでも置けて、いくつ重ねてもかまいません。英語では、場面を先に示したいとき、この文のように M を文頭に出します。けれど M が先頭に来ても、主語は M ではありません。「前置詞のついた名詞は主語にも目的語にもならない」。これを知っていれば、どんなに長い前置きがついた文でも、最初に出てくる「前置詞のつかない名詞」と動詞を探すことで、骨組みにたどりつけます。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "In the beginning God created the heaven and the earth.",
        ja: "はじめに、神は天と地を造った。",
        cite: "King James Version, Genesis 1:1 (1611)",
        source: "https://www.gutenberg.org/cache/epub/10/pg10.txt",
      }],
      photos: [
        {
          src: `${C}/kjv-title.webp`, width: 800, height: 1251,
          alt: "人物の彫刻にかこまれた中央の白い枠に THE HOLY BIBLE と大きく刷られた、銅版画の扉",
          caption: "{{欽定訳聖書}}初版（1611年、ロンドン）の扉。枠の中に「新たに原語から訳された」とある。ここから広まった英文は、骨組みの短い力強い文が多い。",
          credit: { author: "Church of England", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:KJV-King-James-Version-Bible-first-edition-title-page-1611.jpg" },
        },
      ],
      figure: {
        type: "formula",
        title: "M をくくって骨組みを取り出す",
        prose: true,
        steps: [
          { expr: "My uncle walks {{in the park}} {{every morning}}.", note: "もとの文" },
          { expr: "My uncle walks (in the park) (every morning).", note: "前置詞＋名詞・時を表す語は M" },
          { expr: "{{My uncle}} {{walks}}.", note: "残るのは S＋V → 第1文型" },
        ],
      },
      cliff: "柱だけ残したとき、動詞の後ろに来るものの数は、たった3通りしかありません。",
    },
    {
      heading: "5つの文型",
      body: "動詞の後ろに{{何も来ない（M だけ）}}なら第1文型、{{1つ}}なら第2か第3、{{2つ}}なら第4か第5です。それぞれの文型は、とる動詞にも傾向があります。第2文型は become・look・seem・taste、第4文型は give・send・show・buy、第5文型は make・call・keep・find などがよく使われます。",
      reading: [
        "文型とは、「その動詞が、後ろに何を何個ほしがるか」の分類です。動詞の後ろに0個なら{{第1文型}}（SV）、1個なら{{第2文型}}（SVC）か{{第3文型}}（SVO）、2個なら{{第4文型}}（SVOO）か{{第5文型}}（SVOC）。数えるのは M を外したあとの柱だけです。",
        "後ろに何もいらない第1文型の極みが、欽定訳聖書の「ヨハネによる福音書」11章35節、Jesus wept.（イエスは涙を流した）です。英語の聖書でもっとも短い節として知られる2語の文で、weep（泣く）は後ろに O をとらない{{自動詞}}です。友の死を前にした場面で、理由も様子も M で説明しない。骨組みだけの文が、かえって深い悲しみを伝えます。文型は短いほど弱いのではなく、柱がむき出しになるぶん、ひびきが強くなることがあるのです。",
        "どの文型になるかは、動詞の意味からある程度わかります。「〜になる・〜に見える」のように主語の状態を言う become・look・seem は C をとって第2文型。「人に物を渡す」give・send・show は O を2つとって第4文型。「O を〜にする・〜と呼ぶ・〜だとわかる」make・call・find は O と C をとって第5文型です。辞書の自（自動詞）・他（他動詞）の記号や、〔＋O＋C〕のような表示は、この「後ろにいくつ」を教えてくれる地図なのです。",
      ],
      figure: {
        type: "compare",
        title: "5つの文型と例",
        columns: [{ title: "文型" }, { title: "形", tone: "yellow" }, { title: "例" }],
        rows: [
          { cells: ["第1文型", "S V", "The baby smiled."] },
          { cells: ["第2文型", "S V C", "Mika became a nurse."] },
          { cells: ["第3文型", "S V O", "I lost my key."] },
          { cells: ["第4文型", "S V O O", "He sent me a card."] },
          { cells: ["第5文型", "S V O C", "We call him Ben."] },
        ],
      },
      cliff: "後ろに2つ並んだとき、O O なのか O C なのか。名作の書き出しで確かめましょう。",
    },
    {
      heading: "O か C か、O O か O C かは「＝」で見分ける",
      body: "後ろが1つのとき、それが{{主語とイコール}}（Mika＝a nurse）なら C で第2文型、イコールでなければ O で第3文型です。後ろが2つのとき、{{2つ目が1つ目とイコール}}（him＝Ben）なら O C の第5文型、イコールでなければ「人に物を」の O O で第4文型です。C には名詞か{{形容詞}}が入り、副詞は入りません。",
      reading: [
        "見分けの決め手は「＝」です。We call him Ben. では him＝Ben が成り立つので、Ben は O を説明する C、第5文型です。一方 He sent me a card. では me と a card はイコールではありません（わたしはカードではない）。この2つは「人に」「物を」という別々の O で、第4文型です。後ろが1つのときも同じで、Mika became a nurse. は Mika＝a nurse なので C です。",
        "1851年、ニューヨークとロンドンで出版されたハーマン・メルヴィルの『{{白鯨}}』（Moby-Dick）は、この第5文型で始まります。Call me Ishmael. は命令文なので主語の you が省かれていて、call（V）＋me（O）＋Ishmael（C）。me＝Ishmael の関係があるので{{SVOC}}、「わたしをイシュメールと呼べ」です。メルヴィル自身、21歳で捕鯨船に乗り組んだ経験があり、物語は語り手イシュメールが捕鯨船ピークオッド号に乗り、エイハブ船長が白い大鯨モービィ・ディックを追う航海を描きます。出版当時はあまり売れず、作者の死後、1920年代ごろから再評価されて、アメリカ文学を代表する作品になりました。",
        "では、My name is Ishmael.（SVC）と何がちがうのでしょう。SVC の文は、my name＝Ishmael という「事実」を報告するだけです。ところが SVOC の命令文では、＝の関係をつくるのは読み手のほうです。「呼ぶ」のはあなた。しかも、それが本名だとは一言も言っていません。イシュメールは旧約聖書の「創世記」に出てくる、家を出されて荒野で生きる人物の名で、「さすらう者」の響きをもちます。続く2文目は、Some years ago から on shore までが長い M で、柱は I thought（〜と思った）。ここでも第1節の「M を外す」読み方が生きます。",
      ],
      recite: [{
        lang: "en", voice: "male",
        text: "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
        ja: "わたしのことは、イシュメールと呼んでくれ。何年か前のこと――正確に何年前かは、どうでもいい――財布にはほとんど金がなく、陸には心をひかれるものも特になかったので、しばらく船に乗って、世界の水の部分を見てまわろうと思ったのだ。",
        cite: "Herman Melville, Moby-Dick; or, The Whale, Chapter 1 (1851)",
        source: "https://www.gutenberg.org/cache/epub/2701/pg2701.txt",
      }],
      photos: [
        {
          src: `${C}/moby-title.webp`, width: 800, height: 1314,
          alt: "MOBY-DICK; OR, THE WHALE. BY HERMAN MELVILLE と活字で刷られた、白い紙の扉",
          caption: "『{{白鯨}}』米国初版（1851年、ニューヨーク）の扉。イギリス版は少し先に「The Whale」の題で出た。本文の第1文が Call me Ishmael.",
          credit: { author: "Chick Bowen (en.wikipedia)", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Moby-Dick_FE_title_page.jpg" },
        },
        {
          src: `${C}/melville.webp`, width: 800, height: 986,
          alt: "黒い服を着た、豊かなひげの男性の肖像画",
          caption: "ハーマン・メルヴィル（1819〜1891年）。ジョセフ・O・イートンが描いた肖像。若いころ捕鯨船で南太平洋へ渡った経験が『白鯨』に生きている。",
          credit: { author: "Joseph Oriel Eaton", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Herman_Melville_by_Joseph_O_Eaton.jpg" },
        },
      ],
      figure: {
        type: "tree",
        title: "動詞の後ろで文型を決める",
        root: {
          label: "動詞の後ろ",
          children: [
            { label: "なし（M だけ）", children: [{ label: "SV", tone: "plain" }] },
            {
              label: "1つ",
              children: [
                { label: "S＝それ", children: [{ label: "SVC", tone: "yellow" }] },
                { label: "S≠それ", children: [{ label: "SVO", tone: "blue" }] },
              ],
            },
            {
              label: "2つ",
              children: [
                { label: "1つ目＝2つ目", children: [{ label: "SVOC", tone: "red" }] },
                { label: "1つ目≠2つ目", children: [{ label: "SVOO", tone: "blue" }] },
              ],
            },
          ],
        },
      },
      reveal: "Call me Ishmael. は、命令文の{{第5文型}}で、O の me と C の Ishmael が「＝」で結ばれます。My name is Ishmael. の SVC なら「名前は〜だ」という事実の報告ですが、SVOC の命令文では、その「＝」をつくるのは「呼ぶ」読者の側です。読者は最初の3語で語り手に話しかけられ、彼をそう呼ぶ約束をさせられる。しかも本名かどうかは明かさず、さすらう者の名だけを手わたす。3語の文型が、語り手と読者の近さと、語り手の謎とを、同時に生み出しているのです。",
      cliff: "では、＝にならない O O のほうは、名文の中でどんな働きをしているのでしょう？",
    },
    {
      heading: "第4文型は「to / for ＋人」で第3文型に書きかえられる",
      body: "第4文型の「人に物を」は、物を先に出して{{「物＋to / for＋人」}}の第3文型にできます。相手に届けば成り立つ give・send・show・teach などは{{to}}、相手のためにわざわざする buy・make・cook・find などは{{for}}を使います。",
      reading: [
        "欽定訳聖書の「マタイによる福音書」6章には、キリスト教で広く唱えられる「主の祈り」があり、その中に下の1文があります。命令文なので主語はなく、Give（V）＋us（O）＋our daily bread（O）。this day（今日）は時を表す M です。us と our daily bread はイコールではないので、「人に」「物を」の{{第4文型}}です。",
        "これを第3文型に書きかえると、Give our daily bread to us this day. のようになります。give は「相手に届けば成り立つ」動作なので{{to}}。buy や cook のように「相手のためにわざわざする」動作なら{{for}}を使います。意味はほぼ同じですが、英語には「新しい情報・大事な情報を文の最後に置く」という傾向（{{文末焦点}}）があります。第4文型では「何を」が文末に来て、祈りの文では our daily bread、つまり「日々の糧」に重みが置かれます。第3文型にすると「だれに」が文末に来ます。",
        "この使い分けは日常でも働きます。Who did you give the ticket to? と聞かれたら、答えの中心は「だれに」なので I gave it to Ken. と人を最後にします。また、物が it や them のような代名詞のときは、第4文型にはせず、Give it to me. の形にするのがふつうです。2つの形は自由に入れかえる「言いかえの公式」ではなく、どちらに光を当てるかを選ぶ道具なのです。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "Give us this day our daily bread.",
        ja: "わたしたちに、今日も、日々の糧をお与えください。",
        cite: "King James Version, Matthew 6:11 (1611)",
        source: "https://www.gutenberg.org/cache/epub/8040/pg8040.txt",
      }],
      figure: {
        type: "formula",
        title: "SVOO → SVO ＋ to / for",
        prose: true,
        steps: [
          { label: "to", expr: "I showed her the photo.", note: "第4文型" },
          { label: "to", expr: "I showed the photo {{to}} her.", note: "show は相手に届く動作 → to" },
          { label: "for", expr: "Dad cooked us dinner.", note: "第4文型" },
          { label: "for", expr: "Dad cooked dinner {{for}} us.", note: "cook は相手のためにする動作 → for" },
        ],
      },
      cliff: "同じ動詞が、文型を変えると別の意味になることがあります。『白鯨』の続きがその見本です。",
    },
    {
      heading: "同じ動詞でも、文型が変わると意味が変わる",
      body: "find・make・get・keep などは、いくつもの文型をとり、文型ごとに意味が変わります。find は SVO なら「見つける」、SVOO なら「（人に物を）見つけてあげる」、{{SVOC}}なら「O が C だとわかる・気づく」です。訳に迷ったら、まず後ろの要素の数と「＝」を確かめましょう。",
      reading: [
        "find を例にとると、I found the key.（SVO：鍵を見つけた）、She found me a seat.（SVOO：わたしに席を見つけてくれた）、I found the book easy.（SVOC：その本はやさしいとわかった）と、文型ごとに意味が変わります。the book＝easy の関係があるので、3つ目は「やさしい本を見つけた」ではありません。動詞の訳を決めるのは、単語帳の1つ目の意味ではなく、{{文型}}です。",
        "『白鯨』の第1章は、Call me Ishmael. のすぐあとで、語り手がなぜ海に出るのかを語ります。下の1文で、find myself growing grim は「自分が（口もとを）けわしくしていくのに気づく」。myself＝growing grim の関係があり、C に分詞が入った{{SVOC}}です。次の it is a damp, drizzly November in my soul は SVC で、「心の中が、じめじめと霧雨の降る11月だ」という大胆な比喩になっています。",
        "この長い文の柱はどこでしょう。whenever で始まるかたまりは、すべて「〜するときはいつでも」という M です。それを全部外すと、残るのは I account it high time だけ。account は「考える」、it は後ろの to get to sea を指す{{形式目的語}}で、it＝high time の第5文型です。気分がふさいで人の帽子をたたき落としたくなったら、海に出る潮時だと考える。暗い気分をユーモアで包んだこの一節は、長い M と短い柱の組み合わせでできています。",
      ],
      recite: [{
        lang: "en", voice: "male",
        text: "Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to sea as soon as I can.",
        ja: "口もとがけわしくなってきたと気づくとき。心の中が、じめじめと霧雨の降る11月になるとき。棺おけ屋の前で思わず足を止め、出会う葬列のしんがりにくっついて歩いている自分に気づくとき。そしてとりわけ、ふさぎの虫にすっかり負けて、わざと通りに出て人々の帽子を片っぱしからたたき落とすのを、よほどしっかりした道徳心でおさえねばならなくなるとき――そんなときはいつも、できるだけ早く海に出るべき潮時だと考えることにしている。",
        cite: "Herman Melville, Moby-Dick; or, The Whale, Chapter 1 (1851)",
        source: "https://www.gutenberg.org/cache/epub/2701/pg2701.txt",
      }],
      photos: [
        {
          src: `${C}/whale-fishing.webp`, width: 800, height: 550,
          alt: "星条旗をかかげた帆船が何隻も浮かぶ海で、小舟に乗った男たちが鯨を追っている油絵",
          caption: "ロバート・サルモン「南洋の捕鯨」（19世紀前半）。母船から小舟をおろして鯨を追う。メルヴィルが乗り、イシュメールが「海に出る」のも、こうした捕鯨船だった。",
          credit: { author: "Robert Salmon", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Robert_Salmon_-_South_Sea_Whale_Fishing_I.jpg" },
        },
      ],
      figure: {
        type: "compare",
        title: "find は文型で意味が変わる",
        columns: [{ title: "文型" }, { title: "例", tone: "yellow" }, { title: "意味" }],
        rows: [
          { cells: ["S V O", "I found the key.", "鍵を見つけた"] },
          { cells: ["S V O O", "She found me a seat.", "わたしに席を見つけてくれた"] },
          { cells: ["S V O C", "I found the book easy.", "その本はやさしいとわかった"] },
        ],
      },
    },
  ],
  story: {
    kind: "manga4",
    title: "イシュメールに電話しろ？",
    panels: [
      {
        scene: "放課後の図書室。ユイが英語の『白鯨』を開いてソウタに読んでみせる。",
        lines: [
          { who: "ユイ", text: "白鯨の一文目、読むね" },
          { who: "ユイ", text: "コール・ミー・イシュメール" },
          { who: "ソウタ", text: "イシュメールに電話しろ？" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ユイ", look: "girl", x: 256, face: "smile", hand: [212, 226] },
            { who: "ソウタ", look: "boy", x: 84, face: "think", fx: "?" },
          ],
          props: [
            { kind: "table", x: 0, y: 244 },
            { kind: "book", x: 196, y: 228, s: 0.85 },
          ],
        },
      },
      {
        scene: "ソウタがスマホを出しかける。札に「番号？」。ユイがあわてて止める。",
        lines: [
          { who: "ソウタ", text: "番号を知らないぞ" },
          { who: "ソウタ", text: "船に乗ってる人かな" },
          { who: "ユイ", text: "かけなくていいの！" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ソウタ", look: "boy", x: 256, face: "sweat", fx: "sweat", hand: [214, 230] },
            { who: "ユイ", look: "girl", x: 84, face: "shout", fx: "!" },
          ],
          props: [
            { kind: "table", x: 0, y: 244 },
            { kind: "board", x: 150, y: 238, text: "番号？" },
            { kind: "ship", x: 200, y: 200, s: 0.6 },
          ],
        },
      },
      {
        scene: "先生が来て、札に「me＝名前」と書く。",
        lines: [
          { who: "先生", text: "meとIshmaelは＝" },
          { who: "先生", text: "{{SVOC}}で「呼べ」よ" },
          { who: "ソウタ", text: "電話のコールじゃない！" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "先生", look: "teacher", x: 250, face: "smile", hand: [200, 226] },
            { who: "ソウタ", look: "boy", x: 86, face: "surprise", fx: "idea" },
          ],
          props: [
            { kind: "table", x: 0, y: 244 },
            { kind: "board", x: 160, y: 238, text: "me＝名前" },
          ],
        },
      },
      {
        scene: "ソウタが胸をはる。ユイは札の「＝」に大きく×をつける。",
        lines: [
          { who: "ソウタ", text: "コール・ミー・キャプテン！" },
          { who: "ユイ", text: "ソウタ＝船長？" },
          { who: "ユイ", text: "＝が成り立たないから却下" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ソウタ", look: "boy", x: 256, face: "shout", fx: "!", hand: [214, 220] },
            { who: "ユイ", look: "girl", x: 84, face: "smile", fx: "sweat" },
          ],
          props: [
            { kind: "table", x: 0, y: 244 },
            { kind: "board", x: 150, y: 238, text: "me≠船長" },
          ],
        },
      },
    ],
    note: "ユイ・ソウタ・先生は架空の人物で、会話はすべて創作です。『白鯨』が Call me Ishmael. で始まり、語り手が捕鯨船に乗る物語であることは原作どおりです。",
  },
  mistakes: [
    { wrong: "She looks happily.", right: "She looks happy.", why: "look（〜に見える）は第2文型をつくり、C には形容詞が入ります。副詞は C になれません。" },
    { wrong: "I went to the station. を第3文型と考える", right: "第1文型（to the station は M）", why: "「前置詞＋名詞」は修飾語で、目的語ではありません。go の後ろに O はありません。" },
    { wrong: "I bought a present to my sister.", right: "I bought a present for my sister.", why: "buy は「相手のために買ってあげる」動作なので for を使います。" },
    { wrong: "We discussed about the plan.", right: "We discussed the plan.", why: "discuss は他動詞で、すぐ後ろに目的語をとります（第3文型）。about は不要です。" },
  ],
  check: [
    { q: "Kenji painted the fence white. の文型は？", a: "第5文型（SVOC）", why: "the fence＝white の関係があるので、white は C。" },
    { q: "My aunt teaches us English. の文型は？", a: "第4文型（SVOO）", why: "us と English はイコールではない。「人に物を」の O O。" },
    { q: "This soup tastes ___. に入るのは sour と sourly のどちら？", a: "sour", why: "taste（〜の味がする）は第2文型。C には形容詞が入る。" },
  ],
  next: [
    { label: "4択ドリル「文型」に挑戦", href: "/learn/eibunpo-ko/h-eng-gram-bunkei" },
    { label: "つぎの単元「時制」", href: "/learn/eibunpo-ko/h-eng-gram-jisei" },
    { label: "ふりかえり「文型」（中2）のレクチャー", href: "/learn/lecture/j-en-2-bunkei" },
  ],
};
