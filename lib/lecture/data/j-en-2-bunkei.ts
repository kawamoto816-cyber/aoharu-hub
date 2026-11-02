import type { Lecture } from "../types";

const C = "/media/commons/j-en-2-bunkei";

export const J_EN_2_BUNKEI: Lecture = {
  unit: "j-en-2-bunkei",
  title: "文型は動詞のあとを見る。SVOO は「人に物を」、SVOC は「O＝C」",
  hook: "誕生日に「友だちにプレゼントをあげた」、ペットを「ポチと呼んでいる」。こうした文は、動詞のあとに語が2つ並ぶのが特徴です。並び方で意味が決まるので、形を見分けられると長い英文も正しく読めるようになります。",
  mystery: "イソップ寓話の英訳で、神さまはみえっぱりなカラスを make him king しようとします。make her a cake なら「彼女にケーキを作る」なのに、make him king は「彼に王さまを作る」ではなく「彼を王にする」。同じ make で、同じ「人＋名詞」の並びなのに、なぜ意味が変わるのでしょう？",
  mission: {
    from: "市立図書館で英語のおはなし会を開く司書",
    request: "来月の子ども向け英語おはなし会で、イソップの『うぬぼれたコクマルガラス』を英語と日本語で読みます。ところが手伝いの高校生が make him king を「彼に王さまを作ってあげる」と訳してきて、「make her a cake と同じ形でしょう？」と言われ、うまく説明できませんでした。正しい訳をつけて子どもたちに読み聞かせたいので、名探偵のあなたに make him king のなぞを解いてほしいのです。",
    thanks: "動詞のあとの2つの語に「＝」が成り立つかを見ればよかったのですね。him＝king だから「彼を王にする」。これで、子どもたちにカラスの物語を正しく、しかも楽しく読み聞かせられます。",
  },
  sections: [
    {
      heading: "動詞のあとに何が来るかで文型が決まる",
      body: "英語の文は、主語（S）と動詞（V）のあとに何が来るかで型が分かれます。{{目的語（O）}}は「〜を・〜に」にあたる語、{{補語（C）}}は主語や目的語が「何か・どんなか」を説明する語です。中2では、動詞のあとに2つの語が並ぶ{{SVOO}}（人に物を〜する）と{{SVOC}}（OをCにする・と呼ぶ）を学びます。",
      reading: [
        "日本語は「ケンに本をあげた」でも「本をケンにあげた」でも意味が同じです。「に」「を」のような助詞が、語の役わりを教えてくれるからです。ところが英語には助詞がありません。そのかわりに{{語の順番}}が役わりを決めます。だから英語を読むときは、まず主語（S）と動詞（V）を見つけ、そのあとに何が並んでいるかを見ます。この並び方の型を{{文型}}といいます。",
        "中1で学んだ文を思い出しましょう。I like tea.（私はお茶が好き）の tea は「〜を」にあたる{{目的語（O）}}で、SVO の文です。You look happy.（あなたはうれしそうに見える）の happy は、主語の you が「どんなようすか」を説明する{{補語（C）}}で、SVC の文です。C のときは you＝happy のように、主語と C の間に「＝」が成り立ちます。中2では、動詞のあとに語が2つ並ぶ SVOO と SVOC を学びます。",
        "文型のお手本は、短いお話の中にたくさんあります。たとえば{{イソップ寓話}}。紀元前6世紀ごろの古代ギリシャで、アイソポス（イソップ）という語り手が話したと伝えられる、動物たちの教訓話です。1484年にはイギリスで最初の印刷業者キャクストンが英語版を出し、19世紀にはタウンゼンドの英訳（1867年）が広く読まれました。どのお話も数行で、「だれが・だれに・何をしたか」がはっきりした文でできています。この単元では、その英訳と、アメリカの名作童話を読みながら文型を見ていきます。",
      ],
      photos: [
        {
          src: `${C}/aesop.webp`, width: 800, height: 1573,
          alt: "茶色のぼろぼろの上着を着た白髪まじりの男性が、本をかかえて立っている油絵。右上に AESOPVS の文字",
          caption: "スペインの画家ベラスケスがえがいた『イソップ』（1638〜41年ごろ）。本当の姿は伝わっていないので、画家が想像した語り手の姿。{{イソップ寓話}}は2500年以上語りつがれている。",
          credit: { author: "Diego Velázquez", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Vel%C3%A1zquez_-_Esopo_(Museo_del_Prado,_1639-41).jpg" },
        },
      ],
      figure: {
        type: "tree",
        title: "動詞のあとから文型を見分ける",
        root: {
          label: "動詞のあと",
          children: [
            {
              label: "語が1つ",
              tone: "blue",
              children: [
                { label: "SVC", sub: "You look happy." },
                { label: "SVO", sub: "I like tea." },
              ],
            },
            {
              label: "語が2つ",
              tone: "yellow",
              children: [
                { label: "SVOO", sub: "人に＋物を", tone: "blue" },
                { label: "SVOC", sub: "O＝C", tone: "red" },
              ],
            },
          ],
        },
        note: "SVC の C は主語の説明（You＝happy）。SVO の O は「〜を」にあたる語。",
      },
      cliff: "では、動詞のあとに語が2つ並ぶ文は、どう読めばいいのでしょう？　勇気がほしいライオンがお手本です。",
    },
    {
      heading: "SVOO：「人に」が先、「物を」があと",
      body: "give・show・tell・teach・send・buy・make などは、あとに{{人＋物}}の2つを並べられます。I gave Ken a book. は「ケンに本をあげた」です。順番は必ず{{「人」が先、「物」があと}}で、人が代名詞なら me・him・her・us・them などの{{目的格}}にします。物を先に言いたいときは、人の前に to か for を置いて SVO の文にします。",
      reading: [
        "I gave Ken a book.（私はケンに本をあげた）では、gave のあとに Ken と a book の2つが並んでいます。1つ目が「だれに」、2つ目が「何を」。この{{SVOO}}では、順番は必ず{{「人」が先、「物」があと}}です。英語には「に」「を」がないので、順番を入れかえると意味がこわれてしまいます。人が代名詞のときは、She showed me her picture.（彼女は私に写真を見せた）のように、me・him・her・us・them などの{{目的格}}にします。",
        "1900年にアメリカのシカゴで出版された『オズの魔法使い』は、SVOO の宝庫です。作者のライマン・フランク・ボームは、アメリカの子どもがわくわくできる、アメリカ生まれのおとぎ話を書こうとしました。竜巻でふしぎな国に飛ばされた少女ドロシーは、家に帰るため、願いをかなえてくれる大魔法使いオズに会いに行きます。とちゅうで、脳みそがほしいかかし、心がほしいブリキのきこり、勇気がほしいおくびょうなライオンが仲間になります。",
        "仲間たちはそろって、give me ……（ぼくに……をくれる）と言います。Oz could give me courage（オズはぼくに勇気をくれる）のように、me が「人」、courage が「物」です。同じ型を4人がくり返すので、読む人は自然に願いを覚えてしまいます。ドロシーだけは send Toto and me back to Kansas（トトと私をカンザスへ帰す）と言いますが、これは「人＋物」ではなく「人＋場所」なので SVOO ではありません。1939年には映画にもなり、主題歌「虹の彼方に」とともに世界中で愛されています。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "us",
        text: "\"I am going to the Great Oz to ask him to give me some,\" remarked the Scarecrow, \"for my head is stuffed with straw.\"\n\"And I am going to ask him to give me a heart,\" said the Woodman.\n\"And I am going to ask him to send Toto and me back to Kansas,\" added Dorothy.\n\"Do you think Oz could give me courage?\" asked the Cowardly Lion.\n\"Just as easily as he could give me brains,\" said the Scarecrow.\n\"Or give me a heart,\" said the Tin Woodman.\n\"Or send me back to Kansas,\" said Dorothy.",
        ja: "「ぼくは偉大なオズのところへ行って、ぼくにも脳みそをくださいとたのむんだ」とかかしが言った。「なにしろ頭にわらがつまっているからね」\n「ぼくはオズに、ぼくに心をくださいとたのむつもりだよ」ときこりが言った。\n「わたしは、トトとわたしをカンザスへ帰してくださいとたのむの」とドロシーがつけ加えた。\n「オズは、おれに勇気をくれると思うかい？」とおくびょうなライオンがたずねた。\n「ぼくに脳みそをくれるのと同じくらい、かんたんにくれるさ」とかかしが言った。\n「ぼくに心をくれるのとも同じさ」とブリキのきこりが言った。\n「わたしをカンザスへ帰すのともね」とドロシーが言った。",
        cite: "L. Frank Baum, The Wonderful Wizard of Oz, Chapter 6 (1900)",
        source: "https://www.gutenberg.org/ebooks/55",
      }],
      photos: [
        {
          src: `${C}/oz-lion.webp`, width: 800, height: 1046,
          alt: "黄色いレンガの道で、青いチェックの服の少女が大きなライオンの鼻先をたたき、うしろにブリキの男、手前にたおれたかかしと小犬がいるカラーの挿絵",
          caption: "『オズの魔法使い』初版（1900年）のデンスローの挿絵。ドロシーがおくびょうなライオンをしかる場面。このあとライオンは give me courage と、{{SVOO}}で願いを言う。",
          credit: { author: "W. W. Denslow", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Cowardly_lion2.jpg" },
        },
        {
          src: `${C}/oz-cover.webp`, width: 800, height: 992,
          alt: "緑の布ばりの本の表紙。赤と緑の文字で The Wonderful Wizard of Oz、下に赤いたてがみのめがねをかけたライオンの絵",
          caption: "『オズの魔法使い』初版の表紙（シカゴ、1900年）。文はボーム、絵はデンスロー。エメラルドの都にちなむ緑色の本で、出版されるとすぐベストセラーになった。",
          credit: { author: "L. Frank Baum, W. W. Denslow", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:The_Wonderful_Wizard_of_Oz_-_W.W._Denslow_cover.jpg" },
        },
      ],
      figure: {
        type: "formula",
        title: "I gave Ken a book. を書きかえる",
        prose: true,
        steps: [
          { label: "SVOO", expr: "I gave {{Ken}} {{a book}}.", note: "人 → 物の順" },
          { label: "SVO", expr: "I gave {{a book to Ken}}.", note: "物を先にすると to ＋ 人" },
          { label: "代名詞", expr: "I gave {{him}} a book.", note: "人は目的格（he → him）" },
        ],
      },
      cliff: "物を先に言いたいとき、人の前に置くのは to？　それとも for？",
    },
    {
      heading: "to を使う動詞、for を使う動詞",
      body: "物を先に出すとき、人の前に置くのは{{to か for}}です。相手に{{届ける・伝える}}動詞（give・show・tell・teach・send）は {{to}}、相手の{{ために用意する}}動詞（buy・make・cook）は {{for}} を使います。「相手がいないとできない」なら to、「1人でもできて、相手のためにする」なら for と考えると区別しやすくなります。",
      reading: [
        "SVOO の文は、物を先にして SVO の文に書きかえられます。そのとき人の前に{{to か for}}を置きます。give・show・tell・teach・send のように、物や言葉を相手に{{届ける・伝える}}動詞は to。I sent a card to her.（彼女にカードを送った）。buy・make・cook・get・find のように、相手の{{ために用意する}}動詞は for。I made a cake for her.（彼女のためにケーキを作った）。見分け方は「相手がいないとできるか」です。ケーキは1人でも作れますが、カードを送るには相手が必要ですね。",
        "イソップの『クマと2人の旅人』は、give の文で落ちがつくお話です。山道でクマに出会ったとき、1人はさっさと木に登ってかくれ、もう1人は地面にふせて死んだふりをします。クマが去ったあと、木から下りてきた男が「クマは何をささやいたんだい？」とからかうと、相手はこう答えます。He gave me this advice.（クマはぼくにこんな忠告をくれたよ）。忠告は相手に伝えるものなので、書きかえると He gave this advice to me. です。",
        "『王さまをほしがったカエル』にも2つの型が出てきます。カエルたちに神ユピテルは gave them an Eel（彼らにウナギを与えた）。これは to の仲間で、an Eel to them と書きかえられます。一方、カエルたちは to choose for them still another King（自分たちのために、さらに別の王を選んでほしい）とたのみます。王を選ぶのは「相手のためにする」ことなので {{for}}。ここでは for them が前に出ていますが、ふつうの順にすると choose another King for them です。",
      ],
      recite: [
        {
          lang: "en", voice: "male", accent: "gb",
          text: "When he was quite gone, the other Traveler descended from the tree, and jocularly inquired of his friend what it was the Bear had whispered in his ear. \"He gave me this advice,\" his companion replied. \"Never travel with a friend who deserts you at the approach of danger.\"\nMisfortune tests the sincerity of friends.",
          ja: "クマがすっかり行ってしまうと、もう1人の旅人は木から下りてきて、クマが耳もとで何をささやいたのかと、ふざけた調子で友だちにたずねた。「クマはぼくにこんな忠告をくれたよ」と仲間は答えた。「危険が近づくと見すてて逃げる友だちとは、けっしていっしょに旅をするな、とね」\n災難は、友の真心をためす。",
          cite: "Aesop, \"The Bear and the Two Travelers\" (Three Hundred Aesop's Fables, tr. George Fyler Townsend, 1867)",
          source: "https://www.gutenberg.org/ebooks/21",
        },
        {
          lang: "en", voice: "female", accent: "gb",
          text: "After some time they began to think themselves ill-treated in the appointment of so inert a Ruler, and sent a second deputation to Jupiter to pray that he would set over them another sovereign. He then gave them an Eel to govern them. When the Frogs discovered his easy good nature, they sent yet a third time to Jupiter to beg him to choose for them still another King. Jupiter, displeased with all their complaints, sent a Heron, who preyed upon the Frogs day by day till there were none left to croak upon the lake.",
          ja: "しばらくすると、カエルたちは、こんなに動かない者を王にされて自分たちはひどいあつかいを受けていると思うようになり、二度目の使いをユピテルに送って、別の王を上に立ててくださいと願った。そこでユピテルは、彼らを治めさせるためにウナギを与えた。カエルたちはウナギがのんびりしたお人よしだとわかると、三度目の使いをユピテルに送り、さらに別の王を選んでくださいとたのんだ。ユピテルはカエルたちの不平にうんざりして、サギを送った。サギは来る日も来る日もカエルを食べ、とうとう池でケロケロ鳴くカエルは1匹もいなくなった。",
          cite: "Aesop, \"The Frogs Asking for a King\" (Three Hundred Aesop's Fables, tr. George Fyler Townsend, 1867)",
          source: "https://www.gutenberg.org/ebooks/21",
        },
      ],
      photos: [
        {
          src: `${C}/frogs-king.webp`, width: 800, height: 1216,
          alt: "雲の上から神が見下ろし、池には丸太の上にカエルたちが乗り、手前で大きな鳥がくちばしでカエルをくわえている銅版画",
          caption: "ホラーの銅版画『王さまをほしがったカエル』（17世紀）。左上の雲に神ユピテル、池に丸太の王、手前でカエルを食べる鳥。ユピテルは gave them an Eel と、{{SVOO}}で王を与えた。",
          credit: { author: "Wenceslaus Hollar", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Wenceslas_Hollar_-_The_frogs_who_wanted_a_king.jpg" },
        },
      ],
      figure: {
        type: "compare",
        title: "物を先にするときの to と for",
        columns: [{ title: "to を使う", tone: "blue" }, { title: "for を使う", tone: "yellow" }],
        rows: [
          { label: "動詞", cells: ["give / show / tell", "buy / make / cook"] },
          { label: "動詞", cells: ["teach / send", "get / find"] },
          { label: "意味", cells: ["相手に届ける・伝える", "相手のために用意する"] },
          { label: "例", cells: ["send a card to her", "make a cake for her"] },
        ],
      },
      cliff: "では make him king は、彼に「王さま」という物をあげる SVOO なのでしょうか？",
    },
    {
      heading: "SVOC：O と C の間に「＝」が成り立つ",
      body: "call・name・make は、あとに O と C を並べて「OをCと{{呼ぶ}}」「OをCと{{名づける}}」「OをCに{{する}}」を表します。We call the dog Pochi. では the dog＝Pochi、The news made me happy. では me＝happy の関係があります。動詞のあとの2つの語の間に{{「＝」が成り立てば SVOC}}、成り立たなければ SVOO と見分けられます。",
      reading: [
        "We call the dog Pochi.（私たちはその犬をポチと呼ぶ）では、call のあとに the dog と Pochi が並んでいます。SVOO と同じく2つの語ですが、こちらは the dog＝Pochi。このように、目的語（O）とそのあとの補語（C）の間に{{「＝」が成り立つ}}文を{{SVOC}}といいます。call（OをCと呼ぶ）、name（OをCと名づける）、make（OをCにする）がよく使われ、C には名詞のほか、The news made me happy.（その知らせは私を幸せにした）の happy のような形容詞も入ります。",
        "イソップの『うぬぼれたコクマルガラス』は、SVOC の物語です。神ユピテルが「いちばん美しい鳥を王にする」と決めると、黒くて地味なコクマルガラスは、仲間が落とした羽を拾って体じゅうにさし、to make himself the most beautiful of all（自分をいちばん美しくする）つもりでした。himself＝いちばん美しい、の SVOC です。かざりたてた姿を見たユピテルが make him king（彼を王にする）と言い出すと、鳥たちはおこって自分の羽を引きぬきます。最後に残ったのは nothing but a Jackdaw（ただのコクマルガラス）でした。",
        "make him king と make her a cake を、「＝」で比べてみましょう。him＝king（彼が王になる）は成り立つので SVOC、「彼を王にする」。her＝a cake（彼女がケーキになる）は成り立たないので SVOO、「彼女にケーキを作る」。さきほどのカエルの話の think themselves ill-treated（自分たちをひどいあつかいを受けていると思う）も themselves＝ill-treated の SVOC です。王という役目のように、ただ1人しかいない地位を表す名詞は、king のように a をつけないこともあります。「＝」のテストは、どんなに古い名作の文にも使える、たしかな物さしなのです。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "The Jackdaw, knowing his own ugliness, searched through the woods and fields, and collected the feathers which had fallen from the wings of his companions, and stuck them in all parts of his body, hoping thereby to make himself the most beautiful of all. When the appointed day arrived, and the birds had assembled before Jupiter, the Jackdaw also made his appearance in his many feathered finery. But when Jupiter proposed to make him king because of the beauty of his plumage, the birds indignantly protested, and each plucked from him his own feathers, leaving the Jackdaw nothing but a Jackdaw.",
        ja: "コクマルガラスは自分がみにくいと知っていたので、森や野原をさがし回り、仲間たちの翼から落ちた羽を集めて体じゅうにさした。そうすれば、自分をだれよりも美しくできると思ったのだ。約束の日が来て、鳥たちがユピテルの前に集まると、コクマルガラスも、たくさんの羽でかざりたてた姿で現れた。ところがユピテルが、羽の美しさを理由に彼を王にしようと言い出すと、鳥たちはいきどおって反対し、それぞれが自分の羽を彼から引きぬいた。コクマルガラスに残ったのは、ただのコクマルガラスだけだった。",
        cite: "Aesop, \"The Vain Jackdaw\" (Three Hundred Aesop's Fables, tr. George Fyler Townsend, 1867)",
        source: "https://www.gutenberg.org/ebooks/21",
      }],
      photos: [
        {
          src: `${C}/vain-jackdaw.webp`, width: 800, height: 826,
          alt: "塀の上で、孔雀の羽を背中にさした小さな黒い鳥が、3羽の孔雀と向き合っている挿絵。左下に THE VAIN JACKDAW の文字と短い詩",
          caption: "ウォルター・クレインの絵本『赤ちゃんのイソップ』の「うぬぼれたコクマルガラス」（19世紀後半）。ここでは孔雀の羽でかざる話になっている。羽の力で自分を美しく（{{SVOC}}）見せようとした。",
          credit: { author: "Walter Crane", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Walter_Crane,_The_vain_jackdaw.png" },
        },
      ],
      figure: {
        type: "compare",
        title: "同じ make でも文型がちがう",
        columns: [{ title: "SVOO" }, { title: "SVOC", tone: "yellow" }],
        rows: [
          { label: "例", cells: ["She made me a cake.", "She made me happy."] },
          { label: "意味", cells: ["私にケーキを作った", "私を幸せにした"] },
          { label: "2つの語", cells: ["me ≠ a cake", "me ＝ happy"] },
          { label: "あとの語", cells: ["人 ＋ 物", "O ＋ 名詞・形容詞"] },
        ],
      },
      reveal: "かぎは、動詞のあとの2つの語の間に{{「＝」が成り立つか}}です。make her a cake は her≠a cake なので SVOO の「彼女にケーキを作る」。make him king は him＝king（彼が王になる）が成り立つので{{SVOC}}、「彼を王にする」になります。並びが同じでも、2つの語の関係が意味を決めていたのです。",
    },
  ],
  story: {
    kind: "manga4",
    title: "王さまを焼く？",
    panels: [
      {
        scene: "放課後の教室。ミオがリクにケーキをねだる。机に「誕生日」の札。",
        lines: [
          { who: "ミオ", text: "明日は誕生日！" },
          { who: "ミオ", text: "メイク・ミー・ア・ケーキ！" },
          { who: "リク", text: "人に物を、だね。OK" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ミオ", look: "girl", x: 256, face: "smile", fx: "!", hand: [212, 226] },
            { who: "リク", look: "boy", x: 84, face: "smile" },
          ],
          props: [
            { kind: "table", x: 0, y: 244 },
            { kind: "board", x: 168, y: 238, text: "誕生日" },
          ],
        },
      },
      {
        scene: "リクがイソップの英語の本を開く。札に「make him king」。",
        lines: [
          { who: "リク", text: "じゃあこれも同じ形" },
          { who: "リク", text: "彼に王さまを作る？" },
          { who: "ミオ", text: "王さまを焼くの！？" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "リク", look: "boy", x: 256, face: "think", fx: "?", hand: [214, 232] },
            { who: "ミオ", look: "girl", x: 84, face: "surprise", fx: "!" },
          ],
          props: [
            { kind: "table", x: 0, y: 244 },
            { kind: "book", x: 214, y: 228, s: 0.85 },
            { kind: "board", x: 140, y: 238, s: 0.9, text: "him king" },
          ],
        },
      },
      {
        scene: "先生が来て、札に「him=king」と書きたす。",
        lines: [
          { who: "先生", text: "himとkingは＝よ" },
          { who: "先生", text: "{{SVOC}}で彼を王にする" },
          { who: "リク", text: "焼かなくていいのか" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "先生", look: "teacher", x: 250, face: "smile", hand: [200, 226] },
            { who: "リク", look: "boy", x: 86, face: "sweat", fx: "sweat" },
          ],
          props: [
            { kind: "table", x: 0, y: 244 },
            { kind: "board", x: 168, y: 238, text: "him=king" },
          ],
        },
      },
      {
        scene: "翌日。リクがケーキ（パンケーキ）を差し出す。ミオは大よろこび。",
        lines: [
          { who: "リク", text: "はい、ケーキ。これで" },
          { who: "リク", text: "ミオを王さまにする" },
          { who: "ミオ", text: "ミオ＝王さまの{{SVOC}}！" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "リク", look: "boy", x: 256, face: "smile", hand: [206, 228] },
            { who: "ミオ", look: "girl", x: 84, face: "shout", fx: "idea" },
          ],
          props: [
            { kind: "table", x: 0, y: 244 },
            { kind: "pancake", x: 170, y: 232 },
          ],
        },
      },
    ],
    note: "ミオ・リク・先生は架空の人物で、会話はすべて創作です。イソップ寓話『うぬぼれたコクマルガラス』の make him king は、タウンゼンドの英訳（1867年）にある表現です。",
  },
  mistakes: [
    { wrong: "I gave a book Ken.", right: "I gave Ken a book. / I gave a book to Ken.", why: "SVOO は「人 → 物」の順。物を先にするなら、人の前に to が必要です。" },
    { wrong: "She showed I her picture.", right: "She showed me her picture.", why: "動詞のあとの「人」は目的格（me・him・her）にします。" },
    { wrong: "My mother made a cake to me.", right: "My mother made a cake for me.", why: "make は「相手のために用意する」動詞なので for を使います。" },
    { wrong: "The song made me happily.", right: "The song made me happy.", why: "C には形容詞や名詞が入ります。happily は副詞なので C になれません。" },
  ],
  check: [
    { q: "My uncle bought me a bike. を for を使って書きかえましょう。", a: "My uncle bought a bike for me.", why: "buy は for を使う動詞。物（a bike）を先にして for me。" },
    { q: "We call him Taku. は SVOO と SVOC のどっち？", a: "SVOC", why: "him＝Taku の関係が成り立つ。" },
    { q: "「彼女は私たちに英語を教えています」を英語にしましょう。", a: "She teaches us English. (She teaches English to us.)", why: "teach は SVOO がとれる。人（us）→ 物（English）の順。" },
  ],
  next: [
    { label: "4択ドリル「文型（SVOO・SVOC）」に挑戦", href: "/learn/eibunpo-chu/j-en-2-bunkei" },
    { label: "目的格を確かめる「代名詞」のレクチャー", href: "/learn/lecture/j-en-1-daimeishi" },
    { label: "つぎに「比較」", href: "/learn/eibunpo-chu/j-en-2-hikaku" },
  ],
};
