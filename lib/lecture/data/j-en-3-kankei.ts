import type { Lecture } from "../types";

const C = "/media/commons/j-en-3-kankei";

export const J_EN_3_KANKEI: Lecture = {
  unit: "j-en-3-kankei",
  title: "関係代名詞は、名詞のうしろに「説明の文」をつなぐ接着剤",
  hook: "「メガネをかけている男の人」「私がきのう買った本」。日本語では説明を名詞の前に置きますが、英語では名詞のうしろに置きます。そのつなぎ役が関係代名詞の who・which・that です。長文読解では、どこからどこまでが名詞の説明かを見ぬく力が欠かせません。",
  mystery: "ワイルドの童話『幸福な王子』で、王子はツバメに my eyes are all that I have left と言います。日本語なら「残っているのは目だけ」で済むのに、英語の王子はまず all（すべて）と言い切り、あとから that I have left と説明を足しました。なぜ英語は説明をうしろに回すのか、そしてこの語順が、なぜ物語の山場で胸を打つのでしょう？",
  mission: {
    from: "中学校の英語劇部の顧問",
    request: "文化祭で、英語劇『幸福な王子』を上演します。王子役の生徒に「my eyes are all that I have left は、どこで区切って、どこを強く言えばいいの？」と聞かれ、うまく答えられませんでした。せりふの区切り方と気持ちの込め方を決めるために、名探偵のあなたに、この that のなぞを解いてほしいのです。",
    thanks: "all を言い切ってから、that I have left で「私に残された」と説明を足す。区切りは all のあと、強く言うのは all ですね。王子が何もかも与えてきたことが、語順そのものから伝わるように演じてもらいます。",
  },
  sections: [
    {
      heading: "説明は名詞のうしろにつく",
      body: "関係代名詞は、2つの文を1つにして、名詞を{{うしろから説明}}するときに使います。説明される名詞を{{先行詞}}といいます。I have a friend. と He lives in Canada. を合わせると、I have a friend {{who}} lives in Canada.（私にはカナダに住んでいる友だちがいる）になります。he が who にかわり、先行詞 a friend のすぐあとに来ます。",
      reading: [
        "日本語では「カナダに住んでいる友だち」のように、説明を名詞の前に置きます。英語は逆で、まず a friend（友だち）と言い切り、そのうしろに who lives in Canada（カナダに住んでいる）と説明をつなげます。このつなぎ役が{{関係代名詞}}、説明される名詞が{{先行詞}}です。英語は「大事なものを先に、くわしい説明はあとから」という順番が好きな言葉なのです。",
        "この語順が美しく生きている名作が、アイルランドのダブリン生まれの作家{{オスカー・ワイルド}}が1888年にロンドンで出した童話集『幸福な王子』です。ワイルドは機知に富んだ会話と服装で社交界の人気者でしたが、この表題作では、豊かな人と貧しい人の差が大きかった19世紀の都会を、金でおおわれた王子の像の目から見つめました。自分の幼い息子たちのために書いたとも伝えられ、日本でも長く読みつがれています。",
        "物語は High above the city, on a tall column, stood the statue of the Happy Prince.（町の上の高い柱の上に、幸福な王子の像が立っていた）と始まります。すぐあとに、泣く子をしかる母親が出てきます。her little boy who was crying for the moon は「月をほしがって泣いている小さな息子」。英語は little boy と言い切ってから、who 以下で「どんな子か」を足しています。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "“Why can’t you be like the Happy Prince?” asked a sensible mother of her little boy who was crying for the moon. “The Happy Prince never dreams of crying for anything.”\n“I am glad there is some one in the world who is quite happy,” muttered a disappointed man as he gazed at the wonderful statue.",
        ja: "「どうして幸福な王子さまみたいにできないの？」と、しっかり者の母親が、月がほしいと泣いている小さな息子に言った。「幸福な王子さまは、何かがほしくて泣くなんて、夢にも思わないのよ」\n「世の中に、すっかり幸せな人がひとりはいるとわかって、うれしいよ」と、がっかりした男が、そのすばらしい像を見つめながらつぶやいた。",
        cite: "Oscar Wilde, \"The Happy Prince\" (The Happy Prince and Other Tales, 1888)",
        source: "https://www.gutenberg.org/cache/epub/902/pg902.txt",
      }],
      photos: [
        {
          src: `${C}/wilde.webp`, width: 800, height: 1330,
          alt: "毛皮のえりのコートを着て、ほおづえをつき、つえを持っていすに座る長い髪の若い男性の古い写真",
          caption: "{{オスカー・ワイルド}}（1854〜1900年）。ナポレオン・サロニーが撮影した肖像。アメリカ各地で講演していた1882年ごろのもので、6年後に『幸福な王子』を出した。",
          credit: { author: "Napoleon Sarony", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Oscar_Wilde_portrait_by_Napoleon_Sarony_-_albumen.jpg" },
        },
      ],
      figure: {
        type: "formula",
        title: "2つの文を who でつなぐ",
        prose: true,
        steps: [
          { label: "文1", expr: "I have {{a friend}}.", note: "a friend が先行詞になる" },
          { label: "文2", expr: "{{He}} lives in Canada.", note: "He ＝ a friend" },
          { label: "1文に", expr: "I have a friend {{who}} lives in Canada.", note: "He を who にかえて、a friend のうしろへ" },
        ],
      },
      cliff: "王子の物語には、人だけでなく、ヘビも小人も出てきます。つなぎ役は同じ？",
    },
    {
      heading: "先行詞が「人」か「もの」かで選ぶ",
      body: "先行詞が{{人}}なら who、{{もの・動物}}なら which を使います。{{that}} は人にももの・動物にも使えます。さらに、関係代名詞のあとに動詞が続くか（主格）、主語＋動詞が続くか（目的格）で、使える語が少し変わります。人が先行詞の目的格は、中学では that を使うのが基本です（会話では who も使われます）。",
      reading: [
        "関係代名詞は、先行詞が何かで選びます。先行詞が{{人}}なら who、{{もの・動物}}なら which、{{that}} はどちらにも使えます。a girl who sings well（歌がうまい少女）、a bag which is very light（とても軽いかばん）、a dog that has long ears（耳の長い犬）のように使います。疑問詞の who（だれ）や which（どれ）と形は同じですが、名詞のすぐあとに来たら「説明のつなぎ役」だと考えましょう。",
        "『幸福な王子』の主人公の1人は、仲間に遅れてエジプトへ渡りそびれた1羽の{{ツバメ}}です。王子は町の貧しい人々を見つけるたびに、剣のルビーや目のサファイアを届けてほしいとツバメにたのみます。両目をあげて見えなくなった王子のそばに残ったツバメは、遠い国のふしぎな話を聞かせます。そこに関係代名詞がずらりと並びます。",
        "ヤシの木で眠る大きなヘビは the great green snake that sleeps in a palm-tree。ヘビは動物なので that です。一方、葉っぱに乗って湖を渡る小人たちは the pygmies who sail over a big lake で、人なので who。どちらも関係代名詞のすぐあとに動詞（sleeps・sail）が来ています。ツバメは「どんなヘビか」「どんな小人か」をうしろから次々に足し、見えない王子の心に絵をかいていったのです。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "He told him … of the great green snake that sleeps in a palm-tree, and has twenty priests to feed it with honey-cakes; and of the pygmies who sail over a big lake on large flat leaves, and are always at war with the butterflies.",
        ja: "ツバメは王子に話して聞かせた。……ヤシの木で眠る、大きな緑のヘビのこと。そのヘビには、はちみつのお菓子を食べさせる20人の神官がついていること。それから、大きな平たい葉っぱに乗って広い湖を渡り、いつもチョウとけんかをしている小人たちのことを。",
        cite: "Oscar Wilde, \"The Happy Prince\" (The Happy Prince and Other Tales, 1888)",
        source: "https://www.gutenberg.org/cache/epub/902/pg902.txt",
      }],
      photos: [
        {
          src: `${C}/page03.webp`, width: 800, height: 338,
          alt: "丸いガラスの窓辺に羽を広げた鳥がとまり、家の中の老女と子どもたちがそれを見つめている白黒の版画",
          caption: "『幸福な王子』初版（1888年）の挿絵（ジャコム＝フッド画）。窓辺に来た{{ツバメ}}を、家の中の人々が見つめる。ツバメは王子のつかいとして町をとび回った。",
          credit: { author: "George Percy Jacomb-Hood", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Page_03_illustration_of_The_Happy_Prince_and_Other_Tales_(1888).png" },
        },
      ],
      figure: {
        type: "compare",
        title: "関係代名詞の使い分け",
        columns: [{ title: "先行詞" }, { title: "主格（＋動詞）", tone: "blue" }, { title: "目的格（＋主語＋動詞）", tone: "yellow" }],
        rows: [
          { cells: ["人", "who / that", "that（省略できる）"] },
          { cells: ["もの・動物", "which / that", "which / that（省略できる）"] },
        ],
        note: "目的格の関係代名詞は省略できる：the book (that) I bought。",
      },
      cliff: "関係代名詞のあとに、動詞ではなく「主語＋動詞」が来ることもあります。",
    },
    {
      heading: "主格か目的格かは、すぐあとを見る",
      body: "関係代名詞の{{すぐあと}}を見ます。動詞が来ていれば関係代名詞が説明の文の主語になっている{{主格}}です。主語＋動詞が来ていれば、関係代名詞が目的語の役をしている{{目的格}}で、省略することもできます。The girl who is singing（歌っている少女）は主格、the picture which I took（私がとった写真）は目的格です。",
      reading: [
        "the picture which I took（私がとった写真）では、which のあとに I took（主語＋動詞）が続きます。もとの文 I took the picture. で the picture は took の目的語でした。それが which になって前に出たので、この which を{{目的格}}といいます。一方、the girl who is singing では、who のあとにすぐ動詞 is singing が来ます。who が「歌っている」の主語の役をしているので{{主格}}です。見分けるには、関係代名詞の{{すぐあと}}を見ればよいのです。",
        "王子はすでに、病気の息子を看病するお針子のために、剣のルビーを手放していました。次に王子は、屋根裏部屋で凍えながら劇を書く若者を助けたいと言い、ツバメはもう1晩とどまると約束します。けれど王子にルビーはもう残っていません。そこで王子は Alas! I have no ruby now ……my eyes are all that I have left.（ああ、もうルビーはない。私に残っているのは、この目だけだ）と言います。",
        "all that I have left を分解してみましょう。もとの文は I have left all.（私はすべてを残している）。all が have left の目的語なので、that は{{目的格}}です。目的格は省略して all I have left とも言えますが、that があると、all でひと息おいてから「私に残された」と説明が続きます。持っていたものを人に与え続け、最後に残ったのが両目だった。その重さが、この語順にこもっています。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "“Alas! I have no ruby now,” said the Prince; “my eyes are all that I have left. They are made of rare sapphires, which were brought out of India a thousand years ago. Pluck out one of them and take it to him. He will sell it to the jeweller, and buy food and firewood, and finish his play.”\n“Dear Prince,” said the Swallow, “I cannot do that”; and he began to weep.",
        ja: "「ああ、もうルビーはない」と王子は言った。「私に残っているのは、この目だけだ。めずらしいサファイアでできていて、千年前にインドから運ばれてきたものだ。片方をぬきとって、あの若者に届けておくれ。彼はそれを宝石屋に売って、食べ物とたきぎを買い、劇を書き上げるだろう」\n「王子さま」とツバメは言った。「そんなこと、ぼくにはできません」。そして泣きだした。",
        cite: "Oscar Wilde, \"The Happy Prince\" (The Happy Prince and Other Tales, 1888)",
        source: "https://www.gutenberg.org/cache/epub/902/pg902.txt",
      }],
      photos: [
        {
          src: `${C}/plate1.webp`, width: 800, height: 942,
          alt: "よろいを着て剣と盾を持つ若い王子の像。肩に1羽のツバメがとまり、うしろに塔の立ち並ぶ町が広がる白黒の版画",
          caption: "初版の口絵（ウォルター・クレイン画）。町を見下ろす王子の像と、肩にとまる{{ツバメ}}。この像が、目のサファイアまで人々に与えていく。",
          credit: { author: "Walter Crane", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Plate_1_of_The_Happy_Prince_and_Other_Tales_(1888).png" },
        },
      ],
      figure: {
        type: "tree",
        title: "who / which / that を選ぶ",
        root: {
          label: "先行詞",
          children: [
            {
              label: "人",
              tone: "blue",
              children: [
                { label: "＋動詞", sub: "主格", children: [{ label: "who / that" }] },
                { label: "＋主語＋動詞", sub: "目的格", children: [{ label: "that", sub: "省略できる" }] },
              ],
            },
            {
              label: "もの・動物",
              tone: "yellow",
              children: [
                { label: "＋動詞", sub: "主格", children: [{ label: "which / that" }] },
                { label: "＋主語＋動詞", sub: "目的格", children: [{ label: "which / that", sub: "省略できる" }] },
              ],
            },
          ],
        },
      },
      reveal: "英語は、大事な名詞を先に言い切り、くわしい説明を関係代名詞でうしろにつなぐ言葉です。王子はまず all（すべて）と言い、そのあと {{目的格}}の that で「私に残された」と説明を足しました。ルビーも手放し、残った「すべて」がこの目だけ。だから all を強く言い、ひと息おいて that I have left と続けると、何もかも与えてきた王子の覚悟がそのまま伝わるのです。",
      cliff: "説明が長くなると、文の本当の動詞が見えにくくなります。どう見ぬく？",
    },
    {
      heading: "長い主語に気をつける",
      body: "先行詞が文の主語のとき、説明の部分が終わったところに{{文全体の動詞}}が来ます。The boy who is talking with Ms. Sato {{is}} my brother. では、who 〜 Sato までが The boy の説明で、文の動詞は is です。説明の部分をカッコでくくると、文の骨組みが見えます。",
      reading: [
        "The boy who is talking with Ms. Sato is my brother.（佐藤先生と話している男の子は私の弟です）では、動詞が is talking と is の2つあります。どちらが文全体の動詞でしょう。who から Sato までを（　）でくくると、The boy（……）is my brother. と骨組みが見えます。説明の中の動詞と、{{文全体の動詞}}を区別することが、長文を読むときのコツです。",
        "ワイルドは、町のえらい人たちを、この長い説明でからかいました。像をほめる one of the Town Councillors who wished to gain a reputation for having artistic tastes は「芸術がわかる人だと評判を得たがっている市会議員の1人」。who 以下の説明がとても長く、そこに議員の見栄っぱりな気持ちがそっくり入っています。関係代名詞は、人がらをひとことで描く道具にもなるのです。",
        "物語の終わり、ツバメは冬の寒さで力つき、王子の鉛の心臓も割れます。みすぼらしくなった像は溶かされますが、割れた心臓だけは溶けず、ツバメといっしょにごみの山に捨てられました。そこへ神が天使に「町でいちばん尊いものを2つ持ってきなさい」と命じます。the two most precious things in the city も、in the city がうしろから things を説明する形です。天使が何を持ち帰ったのか、下の原文で確かめてください。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "“Bring me the two most precious things in the city,” said God to one of His Angels; and the Angel brought Him the leaden heart and the dead bird.\n“You have rightly chosen,” said God, “for in my garden of Paradise this little bird shall sing for evermore, and in my city of gold the Happy Prince shall praise me.”",
        ja: "「町でいちばん尊いものを2つ、持ってきなさい」と、神は天使の1人に言った。天使が持ってきたのは、鉛の心臓と、死んだ鳥だった。\n「よく選んだ」と神は言った。「私の楽園の庭で、この小さな鳥はいつまでも歌い、私の黄金の町で、幸福な王子は私をたたえるだろう」",
        cite: "Oscar Wilde, \"The Happy Prince\" (The Happy Prince and Other Tales, 1888)",
        source: "https://www.gutenberg.org/cache/epub/902/pg902.txt",
      }],
    },
  ],
  story: {
    kind: "manzai",
    title: "王子の目はぜんぶ左",
    cast: ["ダイチ", "メイ"],
    lines: [
      { who: "ダイチ", text: "どうもー、ダイチとメイです！　今日は『幸福な王子』を英語で読んできました！" },
      { who: "メイ", text: "ワイルドの童話だね。どこが気に入った？" },
      { who: "ダイチ", text: "her little boy who was crying for the moon. 息子が「だれー？」って月に向かって泣いてるところ。", say: "ハー・リトル・ボーイ・フー・ワズ・クライング・フォー・ザ・ムーン。息子が、だれー？って月に向かって泣いてるところ。" },
      { who: "メイ", text: "質問してない！　この who は「だれ」じゃなくて{{関係代名詞}}。月をほしがって泣いている、と little boy をうしろから説明してるの。", say: "質問してない！ このフーは、だれ、じゃなくて関係代名詞。月をほしがって泣いている、とリトル・ボーイをうしろから説明してるの。" },
      { who: "ダイチ", text: "who って疑問詞じゃないの？", say: "フーって疑問詞じゃないの？" },
      { who: "メイ", text: "名詞のすぐあとに来たら、説明のつなぎ役。説明される名詞を{{先行詞}}っていうの。" },
      { who: "ダイチ", text: "じゃあ the great green snake that sleeps in a palm-tree は、「あれ」を指さしながら、ヤシの木で寝るヘビ。", say: "じゃあ、ザ・グレート・グリーン・スネーク・ザット・スリープス・イン・ア・パームツリーは、あれ、を指さしながら、ヤシの木で寝るヘビ。" },
      { who: "メイ", text: "that を「あれ」って読まない！　snake のあとの that も関係代名詞。ヘビは動物だから who じゃなくて which か that。", say: "ザットを、あれ、って読まない！ スネークのあとのザットも関係代名詞。ヘビは動物だから、フーじゃなくてウィッチかザット。" },
      { who: "ダイチ", text: "ヘビに who を使ったら？", say: "ヘビにフーを使ったら？" },
      { who: "メイ", text: "人あつかいされて、ヘビが照れちゃうよ。{{人}}なら who、{{もの・動物}}なら which、that はどっちにも使えるの。", say: "人あつかいされて、ヘビが照れちゃうよ。人ならフー、もの・動物ならウィッチ、ザットはどっちにも使えるの。" },
      { who: "ダイチ", text: "the pygmies who sail over a big lake は、小人たちが「フー」って息で帆をふくらませて進むんだね。", say: "ザ・ピグミーズ・フー・セイル・オーバー・ア・ビッグ・レイクは、小人たちが、フーって息で帆をふくらませて進むんだね。" },
      { who: "メイ", text: "息で船は動かない！　小人は人だから who。すぐあとに動詞の sail が来るから、who が主語の役をする{{主格}}。", say: "息で船は動かない！ 小人は人だからフー。すぐあとに動詞のセイルが来るから、フーが主語の役をする主格。" },
      { who: "ダイチ", text: "次は王子の名ぜりふ。my eyes are all that I have left. 王子の目は、ぜんぶ左にある！", say: "つぎは王子の名ぜりふ。マイ・アイズ・アー・オール・ザット・アイ・ハブ・レフト。王子の目は、ぜんぶ左にある！" },
      { who: "メイ", text: "left は「左」じゃない！　leave（残す）の過去分詞。have left で「残している」。", say: "レフトは、左じゃない！ リーブ、残す、の過去分詞。ハブ・レフトで、残している。" },
      { who: "ダイチ", text: "それで that のあとは I have left。主語と動詞が来てる。", say: "それでザットのあとは、アイ・ハブ・レフト。主語と動詞が来てる。" },
      { who: "メイ", text: "だから{{目的格}}。that が have left の目的語になって、「私に残っているすべて」。省略して all I have left とも言えるよ。", say: "だから目的格。ザットがハブ・レフトの目的語になって、私に残っているすべて。省略してオール・アイ・ハブ・レフトとも言えるよ。" },
      { who: "ダイチ", text: "よし、長い文も読めるぞ。The Prince who gave away his eyes was happy. 文の動詞は gave！", say: "よし、長い文も読めるぞ。ザ・プリンス・フー・ゲイブ・アウェイ・ヒズ・アイズ・ワズ・ハッピー。文の動詞はゲイブ！" },
      { who: "メイ", text: "gave は説明の中の動詞。who から eyes までをカッコでくくると、{{文全体の動詞}}は was。「目を与えた王子は幸せだった」。", say: "ゲイブは説明の中の動詞。フーからアイズまでをカッコでくくると、文全体の動詞はワズ。目を与えた王子は幸せだった。" },
      { who: "ダイチ", text: "感動した。ぼくも王子みたいに、持っているものをぜんぶ人にあげたい！" },
      { who: "メイ", text: "いい心がけだね。" },
      { who: "ダイチ", text: "じゃあメイに、ぼくの宿題をぜんぶあげる。The homework that I have left is all yours.", say: "じゃあメイに、ぼくの宿題をぜんぶあげる。ザ・ホームワーク・ザット・アイ・ハブ・レフト・イズ・オール・ユアーズ。" },
      { who: "メイ", text: "残ってるのを押しつけないで！　もういいよ。" },
      { who: "ダイチ", text: "どうも、ありがとうございました！" },
    ],
    note: "ダイチとメイは架空の人物で、会話はすべて創作です。作中の英文のうち、her little boy who was crying for the moon・the great green snake that sleeps in a palm-tree・the pygmies who sail over a big lake・my eyes are all that I have left はワイルド『幸福な王子』（1888年）の原文、ほかの英文は説明のために作った例文です。",
  },
  mistakes: [
    { wrong: "I have a dog who runs fast.", right: "I have a dog which (that) runs fast.", why: "先行詞が動物（もの）のときは which か that を使います。" },
    { wrong: "This is the book which I bought it yesterday.", right: "This is the book which I bought yesterday.", why: "which が bought の目的語の役をしているので、it は重ねて書きません。" },
    { wrong: "The girl who live next door is kind.", right: "The girl who lives next door is kind.", why: "主格の関係代名詞のあとの動詞は先行詞（the girl＝3人称単数）に合わせて -s がつきます。" },
  ],
  check: [
    { q: "This is the cake (who / which) my mother made. の正しい方は？", a: "which", why: "先行詞 the cake はもの。" },
    { q: "the man who is standing there の意味は？", a: "そこに立っている男の人", why: "who is standing there が the man をうしろから説明している。" },
    { q: "The movie that I saw yesterday was interesting. で省略できる語は？", a: "that", why: "that のあとが主語＋動詞（I saw）なので目的格。目的格は省略できる。" },
  ],
  next: [
    { label: "4択ドリル「関係代名詞」に挑戦", href: "/learn/eibunpo-chu/j-en-3-kankei" },
    { label: "うしろから説明するなかま「分詞の後置修飾」", href: "/learn/eibunpo-chu/j-en-3-bunshi" },
    { label: "つぎに「間接疑問文」", href: "/learn/eibunpo-chu/j-en-3-kansetsu" },
  ],
};
