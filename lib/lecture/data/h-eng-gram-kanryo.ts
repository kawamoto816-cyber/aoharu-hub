import type { Lecture } from "../types";

const C = "/media/commons/h-eng-gram-kanryo";

export const H_ENG_GRAM_KANRYO: Lecture = {
  unit: "h-eng-gram-kanryo",
  title: "完了形は「ある時点まで」をひとまとめに見る形。基準点はどこか",
  hook: "「京都に3年住んでいる」は、3年前に始まって今も続いていることです。過去形 lived だと「昔住んでいた（今はちがう）」に聞こえてしまいます。完了形は、過去から基準の時点までを線でとらえる形で、入試では過去形との区別や過去完了の「時のずれ」がよくねらわれます。",
  mystery: "1912年3月29日、南極のテントの中で書かれたスコット隊長の最後の日誌には、Since the 21st we have had a continuous gale（21日から強風が続いている）と書いたすぐあとに、We had fuel … on the 20th（20日には燃料があった）とあります。どちらも have の過去分詞 had を使った「あった」なのに、凍える手で、なぜ have had と had を書き分けたのでしょう？",
  mission: {
    from: "科学館で「極地探検の歴史展」を準備している学芸員",
    request: "展示の目玉は、スコット隊長の最後の日誌の複製です。ところがパネル用の日本語訳では、have had も had も同じ「〜があった」になっていて、日誌を読んだ英語の先生に「これでは、隊員たちがテントで過ごした時間が消えてしまう」と言われました。2つの形が何を書き分けているのかを、名探偵のあなたに解き明かしてほしいのです。",
    thanks: "since で始まる have had は「今もやまない嵐」、on the 20th の had は「もう過ぎた一日」。訳を「21日からずっと強風がやまない」「20日の時点では燃料があった」に直したら、パネルの前で足を止める人がぐっと増えました。",
  },
  sections: [
    {
      heading: "現在完了は「過去から今まで」を線で見る",
      body: "現在完了 {{have ＋過去分詞}} は、過去に起きたことが{{今とつながっている}}ことを表します。I have lived in Kyoto for three years. は、3年前から今までの線全体が見えています。過去形 I lived in Kyoto. は、過去の点（または区間）だけを見て、今とは切りはなしています。",
      reading: [
        "1910年6月、イギリスの探検船{{テラ・ノヴァ号}}がロンドンを出発しました。率いるのは海軍士官ロバート・ファルコン・スコット。目標は、まだだれも立ったことのない{{南極点}}に人類で最初に着くことでした。同じころ、ノルウェーのアムンセンも南極点をめざしていました。翌1911年11月、スコットたちは海岸の基地（ロス島のエヴァンズ岬）を出発し、最後は5人で、重いそりを自分たちの体で引きながら、氷の高原を進みました。スコットはこの旅のあいだ、ほとんど毎日、日誌を書き続けています。",
        "1912年1月16日、極点まであと1日ほどの地点で、スコットは日誌にこう書きました。{{The worst has happened, or nearly the worst.}}（最悪のことが起きてしまった。いや、ほとんど最悪のことが。）続く文を見ると、時制のちがいがよくわかります。We marched on（進んだ）、found（見つけた）、This told us the whole story（それがすべてを物語った）。その日の出来事は、{{過去形}}で一つずつ「点」として並べられています。ところが、最後の結論だけは {{The Norwegians have forestalled us}}（ノルウェー隊が先を越してしまった）と、{{現在完了}}です。",
        "なぜ結論だけ現在完了なのでしょう。旗や足あとを見つけたのは、その日の午後の出来事です。けれど「先を越された」という事実は、日誌を書いているテントの中の「今」も、そしてこれから先も、もう取り消せません。現在完了は、過去の出来事を{{今の状態とつないで}}言う形です。I lost my key yesterday.（昨日かぎをなくした）は昨日の点の話ですが、I have lost my key.（かぎをなくしてしまった）なら、今も見つかっていないことが伝わります。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "The worst has happened, or nearly the worst.\n…We marched on, found that it was a black flag tied to a sledge bearer; near by the remains of a camp; sledge tracks and ski tracks going and coming and the clear trace of dogs' paws—many dogs. This told us the whole story. The Norwegians have forestalled us and are first at the Pole. It is a terrible disappointment, and I am very sorry for my loyal companions.",
        ja: "最悪のことが起きてしまった。いや、ほとんど最悪のことが。\n……進んでいくと、それはそりの部品に結びつけられた黒い旗だった。近くには野営のあと。行き来するそりとスキーの跡、そして犬の足あとがくっきりと――それも、たくさんの犬の。それで、すべてがわかった。ノルウェー隊がわれわれの先を越し、極点に一番乗りしているのだ。ひどい落胆だ。忠実な仲間たちに、本当にすまなく思う。",
        cite: "Robert Falcon Scott, journal, 16 January 1912 (Scott's Last Expedition, 1913)",
        source: "https://archive.org/details/scottslastexpedi01scotuoft",
      }],
      photos: [
        {
          src: `${C}/terra-nova.webp`, width: 800, height: 500,
          alt: "帆をたたみかけた3本マストの帆船が、氷のかたまりにかこまれて進んでいる古い写真",
          caption: "流氷の中を進むテラ・ノヴァ号（隊の写真家ポンティング撮影）。スコット隊はこの船で南極へ向かい、海岸に基地をつくってから極点をめざした。",
          credit: { author: "Herbert Ponting", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Herbert_Ponting_Scott%27s_ship_Terra_Nova_1910.jpg" },
        },
        {
          src: `${C}/pole-party.webp`, width: 800, height: 566,
          alt: "雪原で、毛皮の手袋をした防寒着の男たち5人が、旗のそばで立ったりすわったりしている白黒写真",
          caption: "1912年1月、南極点のスコット隊の5人。後列中央がスコット。バワーズがひもでシャッターを切って撮った。すでにアムンセン隊が先に到達していた。",
          credit: { author: "Henry Bowers", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Scott%27s_party_at_the_South_Pole.jpg" },
        },
      ],
      figure: {
        type: "numberline",
        title: "I have lived in Kyoto for three years.",
        min: -4,
        max: 1,
        points: [
          { x: -3, label: "住み始め", tone: "blue" },
          { x: 0, label: "今", tone: "yellow" },
        ],
        ranges: [{ from: -3, to: 0, label: "have lived（3年間）", tone: "blue" }],
        desc: "−4から1の数直線。−3（3年前）から0（今）までの区間に have lived と書いた図。",
        note: "目もりは年。0 が今。線が「今」にとどいているのが現在完了。",
      },
      cliff: "「今とつながる」といっても、つながり方は1つではありません。",
    },
    {
      heading: "用法は3つ：完了・経験・継続",
      body: "現在完了の意味は、いっしょに使う語で見分けやすくなります。{{完了}}は just, already, yet、{{経験}}は ever, never, before, 〜 times、{{継続}}は for, since, How long 〜? と相性がよい語です。have been to 〜 は「行ったことがある（経験）・行ってきたところだ（完了）」、have gone to 〜 は「行ってしまって今ここにいない」です。",
      reading: [
        "現在完了の「今とのつながり方」は、大きく3つに分かれます。1つ目は{{完了・結果}}で、「〜したところだ」「〜してしまった（その結果、今こうだ）」を表します。スコットは、帰り道のテントの中で、日誌とは別に国民にあてた文章を書き残しました。のちに「{{国民へのメッセージ}}」とよばれる文章です。その中に、We took risks, we knew we took them; things have come out against us（われわれは危険をおかした。承知のうえでおかした。事は不利に運んでしまった）という一節があります。危険をおかすと決めたのは、出発のときの過去の判断なので過去形。それが裏目に出て、今こうしてテントに閉じこめられている、という結果だけが現在完了です。",
        "2つ目は{{経験}}で、「（今までに）〜したことがある」です。スコットは、1901〜04年にも探検船ディスカバリー号で南極を調査していました。1910年の出発のときなら、He has been to the Antarctic before.（彼は以前、南極に行ったことがある）と言えます。3つ目は{{継続}}で、「（今まで）ずっと〜している」です。know, live, be のような{{状態}}を表す動詞は、I have known him for ten years. のように現在完了でそのまま継続を表します。run, write のような{{動作}}の動詞で「ずっと〜し続けている」と言いたいときは、I have been writing this diary since November.（11月からずっとこの日誌を書いている）のように、{{現在完了進行形}} have been ＋〜ing を使うのが自然です。",
        "have been to と have gone to のちがいも、探検の場面で考えるとはっきりします。1911年の終わりから翌年にかけて、基地に残った隊員にとって、5人は They have gone to the Pole.（極点へ行ってしまって、今ここにいない）でした。もし5人が無事に帰っていたら、They have been to the Pole.（極点に行ってきた）と言えたはずです。3つの用法は形が同じなので、just, ever, for, since のような目じるしの語と、文脈から見分けます。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "We took risks, we knew we took them; things have come out against us, and therefore we have no cause for complaint, but bow to the will of Providence, determined still to do our best to the last.",
        ja: "われわれは危険をおかした。危険だと承知のうえでおかしたのだ。事は不利に運んでしまった。だから、不平を言ういわれはない。ただ天の意志に頭を垂れ、それでもなお、最後まで最善をつくす覚悟でいる。",
        cite: "Robert Falcon Scott, Message to the Public (1912; Scott's Last Expedition, 1913)",
        source: "https://archive.org/details/scottslastexpedi01scotuoft",
      }],
      figure: {
        type: "compare",
        title: "現在完了の3つの用法",
        columns: [{ title: "用法と意味", tone: "navy" }, { title: "目じるし", tone: "yellow" }, { title: "例" }],
        rows: [
          { cells: ["完了：〜したところだ", "just / already / yet", "I've {{just}} eaten."] },
          { cells: ["経験：〜したことがある", "ever / never / 〜 times", "I've {{never}} seen it."] },
          { cells: ["継続：ずっと〜している", "for / since", "I've lived here {{since}} 2020."] },
        ],
      },
      cliff: "では、最後の日誌の have had と had は、何を書き分けていたのでしょう？",
    },
    {
      heading: "はっきりした過去の語とはいっしょに使えない",
      body: "現在完了は「今」に視点があるので、{{yesterday, 〜 ago, last week, in 2020}} のように、過去の時点をはっきり示す語とは使いません。When 〜? の疑問文も時点をたずねるので、過去形でたずねます。since 2020（2020年から今まで）は使えますが、in 2020（2020年に）は過去形です。",
      reading: [
        "現在完了は、視点が「今」にある形です。そのため、{{yesterday}}, {{〜 ago}}, {{last week}}, {{in 2020}}, {{on the 20th}} のように、過去の一点をはっきり指す語とはいっしょに使えません。「今」に立って過去をふり返る形に、「昨日の時点で」という別の視点をまぜると、どこに立って話しているのかが分からなくなるからです。同じ理由で、時点をたずねる {{When 〜?}} にも過去形を使います。一方、{{since}} は「〜から今まで」と線の始まりを示す語なので、現在完了と相性がよいのです。",
        "極点から引き返した5人は、帰り道でつぎつぎに力つきていきました。2月に1人が亡くなり、3月半ばにもう1人が、仲間の足手まといになるまいと吹雪の中へ出ていきました。残る3人は、食料と燃料を置いた補給所まで約11マイル（約18km）の地点でテントを張りましたが、そこで激しいブリザードに閉じこめられます。そして3月29日、スコットは最後の日誌を書きました。",
        "その最初の2文が、この単元の核心です。{{Since the 21st we have had a continuous gale}}（21日から、強風がずっと続いている）。since があるので、21日から日誌を書いている「今」までの線を、現在完了で表しています。すぐあとの {{We had fuel … on the 20th}}（20日には燃料があった）は、on the 20th という過去の一点なので、過去形です。さらに Every day we have been ready to start（毎日、出発の用意はできていた）は、be ready という状態が今日まで続いている継続、outside the door of the tent it remains a scene of whirling drift（テントの外は雪が渦を巻いたままだ）は、今この瞬間の現在形です。死を目の前にした短い記録の中で、時制が少しも乱れていないのです。",
        "この日誌は、およそ8か月後の1912年11月、テントを見つけた捜索隊によって持ち帰られ、翌1913年に『スコットの最後の探検』として出版されました。日誌の最後の行には Last Entry（最後の記入）と書きそえられ、その下に For God's sake look after our people.（どうか、われわれの家族のことを頼む）と記されていました。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "Since the 21st we have had a continuous gale from W.S.W. and S.W. We had fuel to make two cups of tea apiece and bare food for two days on the 20th. Every day we have been ready to start for our depot 11 miles away, but outside the door of the tent it remains a scene of whirling drift. I do not think we can hope for any better things now. We shall stick it out to the end, but we are getting weaker, of course, and the end cannot be far.\nIt seems a pity, but I do not think I can write more.\nFor God's sake look after our people.",
        ja: "21日から、西南西と南西の強風がずっと続いている。20日には、一人お茶2杯ぶんの燃料と、2日分のぎりぎりの食料があった。毎日、11マイル先の補給所へ出発する用意はできていたが、テントの戸口の外は、雪が渦を巻いて吹き荒れたままだ。もう、これ以上よいことは望めないと思う。最後まで耐えぬくつもりだが、もちろん、われわれは弱ってきている。終わりは遠くないだろう。\n残念だが、もうこれ以上は書けないと思う。\nどうか、われわれの家族のことを頼む。",
        cite: "Robert Falcon Scott, journal, 29 March 1912 (Scott's Last Expedition, 1913)",
        source: "https://archive.org/details/scottslastexpedi01scotuoft",
        say: "Since the twenty-first we have had a continuous gale from west-south-west and south-west. We had fuel to make two cups of tea apiece and bare food for two days on the twentieth. Every day we have been ready to start for our depot eleven miles away, but outside the door of the tent it remains a scene of whirling drift. I do not think we can hope for any better things now. We shall stick it out to the end, but we are getting weaker, of course, and the end cannot be far. It seems a pity, but I do not think I can write more. For God's sake look after our people.",
      }],
      photos: [
        {
          src: `${C}/last-entry.webp`, width: 800, height: 1149,
          alt: "印刷された本のページの上に、ペンの手書きの英文が大きく重ねて写された図版",
          caption: "スコットの日誌の最後のページ（1913年の本にのった複製）。the end cannot be far、Last Entry、For God's sake look after our people の文字が読める。",
          credit: { author: "Robert Falcon Scott", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Scott%27s_last_entry_(Scott%27s_Last_Expedition).jpg" },
        },
      ],
      figure: {
        type: "formula",
        title: "「昨日彼に会った」を書く",
        prose: true,
        steps: [
          { expr: "I {{have seen}} him yesterday.", note: "✕ yesterday は過去の時点。現在完了と合わない" },
          { expr: "I {{saw}} him yesterday.", note: "◯ 過去の時点は過去形" },
          { expr: "I {{have seen}} him {{twice}}.", note: "◯ 時点を言わない「経験」なら現在完了" },
        ],
      },
      reveal: "{{since the 21st}} は「21日から、日誌を書いている今まで」という線なので、{{現在完了 have had}}。嵐は書いている今もやんでいません。{{on the 20th}} は過去の一点なので、{{過去形 had}}。その燃料は20日の時点の話で、今はもうないのです。スコットは2つの形を書き分けることで、8日間やまない嵐と、尽きてしまった燃料を、2つの文だけで伝えました。",
      cliff: "基準点を「今」から過去へずらすと、had ＋過去分詞が現れます。",
    },
    {
      heading: "過去完了・未来完了は「基準点」をずらすだけ",
      body: "{{過去完了 had ＋過去分詞}} は、過去のある時点を基準にして、それより前のこと（大過去）や、その時点までの完了・経験・継続を表します。The train had left when I arrived. は「私が着いた（過去）」より前に列車が出ていた、ということです。{{未来完了 will have ＋過去分詞}} は、基準点を未来に置いた完了形です。",
      reading: [
        "完了形の3つの仲間は、{{基準点}}がどこにあるかだけがちがいます。現在完了の基準点は今。{{過去完了}}は、基準点を過去のある時点に置き、それより前のことや、その時点までの完了・経験・継続を表します。たとえば When Scott's party reached the Pole, Amundsen had already left it.（スコット隊が極点に着いたとき、アムンセンはすでにそこを去っていた）。アムンセン隊が極点に着いたのは1911年12月14日、スコット隊は1912年1月17日。「着いた」という過去の基準点より、さらに前の出来事なので had left です。",
        "過去完了は、文章の中で{{時間の順番を入れかえる}}ときにも働きます。Before they started, Scott had led another expedition to the Antarctic.（出発の前に、スコットは別の南極探検を率いたことがあった）のように had を使えば、話の途中で、さらに昔へさっと時間をさかのぼれます。{{未来完了}}は基準点を未来に置きます。南極のエヴァンズ岬には、スコット隊が1911年に建てた小屋が今も残っています。By 2031, the hut will have stood there for 120 years.（2031年までに、その小屋は120年間そこに建っていることになる）。",
        "had ＋過去分詞は、もう1つ、大切な場面で使われます。スコットの「国民へのメッセージ」は、{{Had we lived}}, I should have had a tale to tell（もしわれわれが生きていたなら、語るべき物語があっただろうに）と続きます。Had we lived は If we had lived の if を省いて had を前に出した形で、{{仮定法過去完了}}です。過去完了の形を借りて、「生きて帰れなかった」という過去の事実とは反対のことを想像しています。should have had は、当時のイギリス英語で I や we のときに使われた、would have had と同じ意味の形です。",
        "メッセージは、残された家族を国が支えてほしいという願いで結ばれていました。1913年に5人の死が伝わると、イギリスじゅうから募金が集まり、遺族の支えに使われました。その一部をもとに、1920年、ケンブリッジ大学に極地を研究する{{スコット極地研究所}}がつくられています。テントの中の had と have had は、今も読む人に「時間」を手わたし続けています。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "Had we lived, I should have had a tale to tell of the hardihood, endurance, and courage of my companions which would have stirred the heart of every Englishman. These rough notes and our dead bodies must tell the tale, but surely, surely, a great rich country like ours will see that those who are dependent on us are properly provided for.",
        ja: "もしわれわれが生きていたなら、仲間たちの不屈さと忍耐と勇気について語る物語があっただろう。それはイギリスの人々ひとりひとりの心をゆさぶったはずだ。いまは、この走り書きと、われわれのなきがらが、その物語を語るしかない。だが、きっと、きっと、われわれの国のような偉大で豊かな国は、われわれを頼りにしてきた者たちが、十分に養われるようにしてくれるだろう。",
        cite: "Robert Falcon Scott, Message to the Public (1912; Scott's Last Expedition, 1913)",
        source: "https://archive.org/details/scottslastexpedi01scotuoft",
      }],
      photos: [
        {
          src: `${C}/cape-evans-hut.webp`, width: 800, height: 527,
          alt: "黒っぽい岩の海岸に立つ木造の小屋。青い海に白い船が停まり、奥に白い氷の崖が続く",
          caption: "南極ロス島のエヴァンズ岬に残るスコット隊の小屋（近年の写真）。1911年に建てられ、スコットたちはここから極点へ出発した。いまも保存されている。",
          credit: { author: "Anne of Eastbourne", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/", source: "https://commons.wikimedia.org/wiki/File:Looking_down_on_Scott%27s_Hut_at_Cape_Evans,_Antarctica.jpg" },
        },
      ],
      figure: {
        type: "numberline",
        title: "The train had left when I arrived.",
        min: -4,
        max: 1,
        points: [
          { x: -3, label: "had left", tone: "red" },
          { x: -1, label: "arrived", tone: "blue" },
          { x: 0, label: "今", tone: "yellow" },
        ],
        moves: [{ from: -1, to: -3, label: "基準点より前", tone: "red" }],
        desc: "−4から1の数直線。−3に had left、−1に arrived、0に今。arrived から had left へ左向きの矢印。",
        note: "基準点が今なら have、過去なら had、未来なら will have。",
      },
    },
  ],
  story: {
    kind: "novel",
    title: "読み役のネッドと、二つの have",
    paragraphs: [
      "1913年2月の夜、ロンドンの新聞社の校正室は、インクと紙のにおいでむっとしていた。十五歳のネッドの仕事は「読み役」だ。原稿を一語ずつ声に出して読み、それに合わせて、校正係のハリスさんが刷りたての細長いゲラに鉛筆を走らせる。一語でも読みとばせば、まちがいがそのまま朝の新聞にのってしまう。",
      "その夜の原稿は、いつもとちがっていた。南極から戻った船が伝えた知らせ――南極点をめざしたスコット隊長たち五人が、帰り道で全員亡くなっていた。原稿には、テントの中で見つかった日誌の写しが添えられていた。ハリスさんは眼鏡をはずして、しばらく黙っていた。それから、かすれた声で言った。「読んでくれ、ネッド。いつもどおり、一語ずつだ」",
      "ネッドは息を吸った。「{{Since the 21st we have had a continuous gale from W.S.W. and S.W.}}」。次の文はこうだった。「{{We had fuel to make two cups of tea apiece and bare food for two days on the 20th.}}」。ネッドはそこで止まった。「ハリスさん、have had のすぐあとに、ただの had です。どっちかが写しまちがいじゃないですか」",
      "ハリスさんは原稿をのぞきこみ、ゆっくり首を横にふった。「まちがいじゃない。since the 21st は、二十一日から、これを書いている『今』までだ。嵐は、書いているあいだもやんでいない。だから have had だ。on the 20th は、二十日という一日だけ。お茶二杯ぶんの燃料は、その日にはあった。……今は、もうないんだよ」",
      "ネッドは原稿の日付を見た。三月二十九日。二十一日からなら、八日間。テントの外で風が鳴り続け、燃料の缶が日ごとに軽くなっていく。その八日間が、have という小さな一語の中に、ぎっしり詰まっていた。「{{Every day we have been ready to start for our depot 11 miles away}}」。毎日、出発の用意はできていた。今日も、きっと。声がふるえたが、ネッドは最後まで読みとおした。",
      "次の紙は、国民にあてたメッセージだった。「{{Had we lived, I should have had a tale to tell of the hardihood, endurance, and courage of my companions}}」。ここにも had がある。ネッドが顔を上げると、ハリスさんは静かに言った。「それは、起きなかったことを言う had だ。生きて帰れなかったという事実の、反対側の話さ」",
      "明け方、地下で輪転機が回りはじめ、刷り上がった新聞が束になって運ばれていった。ネッドは一枚を手にとった。活字の have と had は、どれも同じ黒さで並んでいる。けれどネッドには、その一つひとつが別々の時間を指さしているように見えた。もう過ぎた二十日という一日。二十一日から今日まで続く八日間。そして、来なかった帰り道。",
    ],
    note: "読み役のネッドと校正係のハリスさん、校正室の場面と二人の会話・心情は創作です。スコット隊の5人が1912年に南極点からの帰り道で亡くなったこと、1913年2月にその知らせがイギリスに届いたこと、日誌の3月29日の記録と「国民へのメッセージ」の英文（作中の英文はすべて原文どおり）は史実にもとづきます。どの新聞がいつどの部分をのせたかは描いておらず、スコットら実在の人物のせりふはつくっていません。",
  },
  mistakes: [
    { wrong: "When have you finished your homework?", right: "When did you finish your homework?", why: "When は時点をたずねるので、現在完了ではなく過去形を使います。" },
    { wrong: "He has gone to Hawaii twice.", right: "He has been to Hawaii twice.", why: "「行ったことがある」は have been to。have gone to は「行ってしまって今いない」です。" },
    { wrong: "I have lived here since three years.", right: "I have lived here for three years.", why: "期間の長さは for、始まった時点は since（since 2023 など）で表します。" },
  ],
  check: [
    { q: "I ___ (know) him for ten years. の ___ を適切な形に。", a: "have known", why: "for ten years で「ずっと」の継続。know は状態動詞なので現在完了で継続を表す。" },
    { q: "When I got to the station, the bus ___ already ___ (leave).", a: "had, left", why: "駅に着いた（過去）より前のことなので過去完了。" },
    { q: "I ___ (finish) this book by next Monday. を未来完了で。", a: "will have finished", why: "未来の時点（次の月曜）までの完了なので will have ＋過去分詞。" },
  ],
  next: [
    { label: "4択ドリル「完了形」に挑戦", href: "/learn/eibunpo-ko/h-eng-gram-kanryo" },
    { label: "ひとつ前「時制」", href: "/learn/eibunpo-ko/h-eng-gram-jisei" },
    { label: "関連「仮定法」（had ＋過去分詞を使う）", href: "/learn/eibunpo-ko/h-eng-gram-kateiho" },
  ],
};
