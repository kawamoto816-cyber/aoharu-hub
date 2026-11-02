import type { Lecture } from "../types";

const C = "/media/commons/h-eng-gram-tokushu";

export const H_ENG_GRAM_TOKUSHU: Lecture = {
  unit: "h-eng-gram-tokushu",
  title: "否定・倒置・強調・省略は「ふつうの形からのずれ」に意味がある",
  hook: "Never have I seen such a beautiful sunset. は、ふつうの I have never seen … の語順をわざと変えて「一度も」を強めています。入試の長文や並べかえ問題では、こうした「型からのずれ」を元の形にもどして読めるかが問われます。ずれ方には決まった型があるので、型ごとに整理しましょう。",
  mystery: "『ロミオとジュリエット』の最後の2行は For never was a story of more woe / Than this of Juliet and her Romeo. です。There was never a sadder story … とふつうの語順でも書けるのに、シェイクスピアはなぜ、悲劇の幕を「ひっくり返した語順」で下ろしたのでしょう？",
  mission: {
    from: "高校英語劇コンテストで字幕を担当する英語部の部長",
    request: "今年の英語劇は『ロミオとジュリエット』。最後の2行の字幕を「これ以上悲しい物語はなかった」と訳したら、顧問の先生に「それでは語順の力が消える」と言われてしまいました。原文の語順にこめられた仕かけを、名探偵のあなたに解き明かしてほしいのです。",
    thanks: "never を先頭に出すから「決して」が最初に響き、そのうえ woe と Romeo が韻でぴたりと閉じる。字幕も「決してなかった」を先に出し、最後をロミオの名で結ぶ形にします。",
  },
  sections: [
    {
      heading: "部分否定と全体否定",
      body: "not が all・every・always・both などと組むと、「すべてが〜とは限らない」という{{部分否定}}になります。「1つも〜ない」という{{全体否定}}は、no・none・never・neither などで表します。Not all students like math. は「数学が好きでない生徒もいる」という意味で、No student likes math. とはちがいます。",
      reading: [
        "否定の文を読むときは、not が「どこまで」を打ち消しているかを考えます。Not all students like math. の not は all を打ち消すので、「全員が好き」というわけではない、つまり好きな生徒も好きでない生徒もいる、という意味になります。これが{{部分否定}}です。一方 No student likes math. や None of the students like math. は「1人も好きではない」で、例外のない{{全体否定}}です。always と never、both と neither も、同じように「とは限らない」と「決して・どちらも〜ない」に分かれます。",
        "部分否定のもっとも有名な例が、シェイクスピアの喜劇『ヴェニスの商人』（1596〜97年ごろ）に出てきます。富豪の娘ポーシャの亡き父は、金・銀・鉛の3つの小箱を用意し、正しい箱を選んだ者だけが娘と結婚できると遺言しました。モロッコの王子は「これほどの姫がいる箱は金に決まっている」と金の箱を開けます。ところが中にあったのは、どくろと、下の巻物でした。glisters は glitters（きらきら光る）の古い形です。",
        "All that glisters is not gold. を一語ずつ訳すと「光るものはすべて金ではない」となり、全体否定に見えます。しかし言いたいのは「光るものが、すべて金とは限らない」、つまり見かけのよいものの中にはにせものもある、という部分否定です。似たことわざは中世の詩人チョーサーのころからありましたが、この劇の一節で英語の決まり文句になりました。今では glitters を使い、Not all that glitters is gold. と not を前に出して、部分否定であることをはっきりさせる言い方も広く使われます。なお hardly・seldom などの{{準否定語}}は、それ自体に否定の意味があるので not とはいっしょに使いません。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "All that glisters is not gold,\nOften have you heard that told.\nMany a man his life hath sold\nBut my outside to behold.\nGilded tombs do worms infold.\nHad you been as wise as bold,\nYoung in limbs, in judgment old,\nYour answer had not been inscroll’d,\nFare you well, your suit is cold.",
        ja: "光るものが、すべて金とは限らない。\nそう言われるのを、何度も聞いてきたはず。\n多くの者が、わたしの外側を見たいばかりに\nその命を売ってきた。\n金ぴかの墓も、中には蛆虫を抱いている。\nもしあなたが、勇ましさに負けぬほど賢く、\n手足は若くとも、判断は老成していたなら、\nこの答えが巻物に書かれることはなかったろう。\nさようなら。あなたの求婚は、冷えきった。",
        cite: "William Shakespeare, The Merchant of Venice, Act 2, Scene 7 (c. 1597)",
        source: "https://www.gutenberg.org/cache/epub/1515/pg1515.txt",
      }],
      photos: [
        {
          src: `${C}/caskets.webp`, width: 800, height: 568,
          alt: "広間で、豪華な服の男女が寄りそう左手の棚の上に、小さな肖像画と箱が置かれている油絵",
          caption: "パオレッティ「ポーシャの心を射とめるバッサーニオ」（19世紀）。金・銀を選ばず{{鉛の箱}}を開けた若者が、中の肖像画（左の棚）で正解を知る場面。光る金の箱は不正解だった。",
          credit: { author: "Antonio Ermolao Paoletti", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Antonio_Ermolao_Paoletti_-_Bassanio_winning_the_heart_of_Portia,_The_Merchant_of_Venice.jpg" },
        },
      ],
      figure: {
        type: "compare",
        title: "部分否定と全体否定",
        columns: [{ title: "部分否定", tone: "yellow" }, { title: "全体否定", tone: "red" }],
        rows: [
          { label: "全部", cells: ["not all（全部とは限らない）", "none（1つも〜ない）"] },
          { label: "いつも", cells: ["not always（必ずしも〜ない）", "never（決して〜ない）"] },
          { label: "2つ", cells: ["not both（両方とは限らない）", "neither（どちらも〜ない）"] },
        ],
        note: "hardly・scarcely（ほとんど〜ない）、seldom・rarely（めったに〜ない）は準否定語。not はつけない。",
      },
      cliff: "巻物の2行目 Often have you heard … は、なぜ have が主語の前にいるのでしょう？",
    },
    {
      heading: "否定語が文頭に出ると、疑問文の語順になる",
      body: "never・little・hardly・rarely など{{否定の語句}}を強調して文頭に出すと、後ろは{{疑問文と同じ語順}}になります（{{倒置}}）。be動詞・助動詞・have は主語の前に出し、一般動詞なら do・does・did を主語の前に出して、動詞は原形にします。「〜もそうだ」の So do I. / Neither do I. や、仮定法で if を省いた Had I known, … も同じ倒置の型です。",
      reading: [
        "英語は語順で意味を決める言語なので、ふだん文の後ろにいる語が先頭に来ると、それだけで目立ちます。否定語を文頭に出すと、英語はさらに「ここは特別だ」という合図として、主語と動詞の順番をひっくり返し、疑問文と同じ形にします。これが{{倒置}}です。Never have I seen … は I have never seen … より「一度も」に力がこもり、改まった文や演説、物語の山場でよく使われます。一般動詞なら Rarely does she go out. のように do・does・did を前に出し、動詞は原形にもどします。",
        "『ロミオとジュリエット』（1595年ごろ）は、イタリアの町ヴェローナで、憎み合う2つの名家に生まれた若い恋人たちの悲劇です。劇の最後、2人は墓所で命を落とし、そこへかけつけた両家の父親が、ようやく手を取り合って和解します。幕を下ろすのは、町を治める大公の6行のせりふです。下の朗読の5行目が、問題の For never was a story of more woe です。for は「というのも」と理由をそえる接続詞で、ふつうの語順なら There was never a story of more woe … となるところです。",
        "では、なぜ倒置なのか。シェイクスピアの劇のせりふは、弱く強く、弱く強くと5回打つリズム（弱強五歩格）で書かれています。For NEV-er WAS a STO-ry OF more WOE と読むと、never の強い音が行の頭近くで鳴り、「後にも先にも決して」という重みが最初に響きます。さらに never was a story の語順にしたことで、1行目は woe（悲しみ）で終わり、2行目の Romeo と韻を踏みます。このように、行の終わりで韻を踏む2行（カプレット）で場面をしめくくるのは、シェイクスピアが得意とした手法でした。巻物の Often have you heard that told. も、often を前に出して told と gold の韻をそろえた倒置です。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "A glooming peace this morning with it brings;\nThe sun, for sorrow, will not show his head:\nGo hence, to have more talk of these sad things;\nSome shall be pardon'd, and some punished:\nFor never was a story of more woe\nThan this of Juliet and her Romeo.",
        ja: "陰うつな和解を、この朝は連れてきた。\n太陽も悲しみのあまり、顔を見せようとしない。\nここを去り、この悲しいできごとをさらに語り合おう。\n許される者もあれば、罰せられる者もあろう。\nというのも、これほど悲しい物語は、決してなかったのだから――\nこのジュリエットと、彼女のロミオの物語ほどには。",
        cite: "William Shakespeare, Romeo and Juliet, Act 5, Scene 3 (c. 1595)",
        source: "http://shakespeare.mit.edu/romeo_juliet/romeo_juliet.5.3.html",
      }],
      photos: [
        {
          src: `${C}/reconciliation.webp`, width: 800, height: 610,
          alt: "暗い墓所で、赤い服の老人と緑の服の老人が手をにぎり合い、その前に白い服の若い女性と男性が横たわっている油絵",
          caption: "レイトン「ロミオとジュリエットの亡きがらを前にしたモンタギュー家とキャピュレット家の和解」（1850年代）。大公の最後のせりふは、この{{和解}}の場面で語られる。",
          credit: { author: "Frederic Leighton", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Frederic_Leighton_-_The_Reconciliation_of_the_Montagues_and_the_Capulets_over_the_Dead_Bodies_of_Romeo_and_Juliet.jpg" },
        },
      ],
      figure: {
        type: "formula",
        title: "否定語を文頭に出す",
        prose: true,
        steps: [
          { expr: "I have {{never}} seen such a view.", note: "ふつうの語順" },
          { expr: "{{Never have I}} seen such a view.", note: "have を主語の前へ" },
          { expr: "She {{rarely}} goes out at night.", note: "一般動詞の文" },
          { expr: "{{Rarely does she}} {{go}} out at night.", note: "does を主語の前へ、動詞は原形" },
        ],
      },
      reveal: "For never was a story of more woe は、否定語 never を前に出した{{倒置}}です。never が行の頭近くの強い拍に来るので、「後にも先にも決して」という否定が最初に響きます。しかも was a story をその後ろに回したことで、1行目が woe で終わり、2行目の Romeo と韻を踏む2行（カプレット）ができました。強調と韻とリズムを一度にかなえ、劇の最後の語を主人公の名で結ぶ。それが、語順をひっくり返した理由です。",
      cliff: "ある1語だけに光を当てたいとき、英語は語順を変えずに「枠」ではさむこともできます。",
    },
    {
      heading: "It is 〜 that … の強調構文",
      body: "文の中の1つの要素を {{It is 〜 that …}} の「〜」にはさむと、「…なのは〜だ」と{{強調}}できます。強調できるのは主語・目的語・副詞（句・節）などで、動詞は入れられません。強調するのが人なら that のかわりに who も使えます。動詞を強めたいときは、{{do / does / did ＋原形}}を使います（I did call you.）。",
      reading: [
        "倒置は語順を動かして目立たせましたが、{{強調構文}}は、強めたい要素を It is と that の「枠」にはさんで目立たせます。It was Mika that found the key. は「鍵を見つけたのは（ほかでもない）ミカだ」。ほかの人ではない、という対比がふくまれます。見分け方は簡単で、It was と that を取りのぞいて、残りが元の文にもどれば強調構文です。It is strange that he is late. は、取りのぞくと strange he is late. となり文にならないので、形式主語の it の文だとわかります。",
        "動詞そのものを強めたいときは、{{do / does / did ＋原形}}を使います。I did call you. は「（かけていないと言われたけれど）本当に電話したんだ」。この do の使い方が、詩の中で大きな効果をあげている例が、イギリスの詩人コールリッジの「クーブラ・カーン」です。コールリッジは序文で、1797年の夏、体調をくずして薬を飲み、モンゴル帝国の皇帝フビライ（クーブラ・カーン）の宮殿について旅行記を読みながら眠りこみ、夢の中で200〜300行もの詩ができた、と書いています。目覚めて書き始めたところで来客にじゃまされ、残ったのは54行だけ。その詩が1816年に出版されました。ザナドゥは、フビライの夏の都、上都のことです。",
        "ふつうの語順なら Kubla Khan decreed a stately pleasure-dome in Xanadu. です。詩人はまず場所の In Xanadu を前に出して、映画のカメラのように遠い都を映し出します。次に did を置き、目的語の a stately pleasure-dome を動詞 decree の前に回しました。こうして1行目は Khan で終わって3・4行目の ran・man と韻を踏み、2行目は decree で終わって5行目の sea と韻を踏みます。巻物の Gilded tombs do worms infold.（金ぴかの墓も蛆虫を包む）も、do を使って目的語を動詞の前に置いた同じ型です。昔の詩では do がリズムを整える役もしましたが、今の英語で肯定文に do・did を入れれば「本当に」という強調になります。作文では、目的語を動詞の前に回す語順はまねせず、It is 〜 that や do で強調しましょう。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "In Xanadu did Kubla Khan\nA stately pleasure-dome decree:\nWhere Alph, the sacred river, ran\nThrough caverns measureless to man\nDown to a sunless sea.",
        ja: "ザナドゥに、クーブラ・カーンは\n壮麗な歓楽の宮殿を建てよと命じた。\nそこには聖なる川アルフが流れていた、\n人には測りしれない洞窟をいくつもくぐり、\n日のささない海へと下って。",
        cite: "Samuel Taylor Coleridge, Kubla Khan (1816)",
        source: "https://rpo.library.utoronto.ca/content/kubla-khan",
      }],
      photos: [
        {
          src: `${C}/kubla-title.webp`, width: 344, height: 445,
          alt: "白い紙の中央に、飾り文字で Kubla Khan: その下に OR A VISION IN A DREAM. と刷られたページ",
          caption: "「クーブラ・カーン」の扉（1816年、ロンドン）。副題は「夢の中の幻」。夢で生まれたという詩は、{{did ＋原形}}と語順の工夫で始まる。",
          credit: { author: "Samuel Taylor Coleridge", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Kubla_Khan_titlepage.jpg" },
        },
        {
          src: `${C}/coleridge.webp`, width: 644, height: 800,
          alt: "黒い上着に白い大きなネクタイをしめた、長い髪の若い男性の肖像画",
          caption: "サミュエル・テイラー・コールリッジ（1772〜1834年）。ピーター・ヴァンダイクが1795年に描いた肖像。この2年後に「クーブラ・カーン」を書いたとされる。",
          credit: { author: "Peter Vandyke", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Peter_Vandyke_(1729-1799)_-_Samuel_Taylor_Coleridge_-_NPG_192_-_National_Portrait_Gallery.jpg" },
        },
      ],
      figure: {
        type: "formula",
        title: "1つの文から3通りの強調",
        prose: true,
        steps: [
          { expr: "Mika found the key in the garden.", note: "もとの文" },
          { expr: "It was {{Mika}} that (who) found the key in the garden.", note: "主語を強調" },
          { expr: "It was {{the key}} that Mika found in the garden.", note: "目的語を強調" },
          { expr: "It was {{in the garden}} that Mika found the key.", note: "副詞句を強調" },
        ],
        note: "It was と that を取りのぞいて、元の文にもどれば強調構文。形式主語の it と見分けるときに使える。",
      },
      cliff: "最後は、書かれていない語を読む技術。名作の中には「消えた語」がかくれています。",
    },
    {
      heading: "省略：言わなくてもわかる語は省く",
      body: "英語では、くり返しになる語や{{言わなくてもわかる語}}がよく省略されます。when・while・though などの副詞節では、主の文と主語が同じなら{{主語＋be動詞}}をまとめて省けます（When young, he lived in Kyoto.）。また、I'd like to.（＝ I'd like to go.）のように、動詞を省いて to だけを残す{{代不定詞}}もあります。",
      reading: [
        "英語は、同じ語を2度言うことをきらいます。Ken can ski, and Mika can, too. の2つ目の can のあとには ski が省かれていますが、前を見ればすぐにわかります。when・while・though・if などの副詞節では、主語が主の文と同じなら{{主語＋be動詞}}をまとめて省けます。When young, …（若いころ）、If necessary, …（必要なら）、While in London, …（ロンドンにいる間に）は、どれもこの型です。Would you like to come? — I'd love to. の to は、come をくり返さずに残した{{代不定詞}}です。",
        "大公のせりふにも省略があります。Some shall be pardon'd, and some punished. の後半は、本来 some shall be punished で、前半と同じ shall be が省かれています。「許される者もあれば、罰せられる者もある」と、同じ形の2つを並べるとき、2つ目の共通部分を落とすのは英語の基本です。省略された語を補うには、{{並んでいる形}}を見つけて、前のほうからそっくり写してくればよいのです。",
        "巻物の Had you been as wise as bold, / Young in limbs, in judgment old, も見てみましょう。Had you been … は if を省いた仮定法の倒置（＝ If you had been …）で、2行目の前には had you been が省かれています。さらに young in limbs と in judgment old は、「形容詞＋前置詞句」と「前置詞句＋形容詞」が鏡のように逆向きに並び、old が bold・gold と韻を踏んでいます。省略は手ぬきではありません。言わずにすむ語を消すことで、残った語、つまり「若い／老いた」の対比がくっきり浮かび上がるのです。",
      ],
      figure: {
        type: "tree",
        title: "よく出る省略",
        root: {
          label: "省略",
          tone: "navy",
          children: [
            { label: "主語＋be動詞", sub: "When (I was) …", tone: "yellow" },
            { label: "くり返しの語句", sub: "Ken can (ski).", tone: "blue" },
            { label: "代不定詞", sub: "I'd like to.", tone: "red" },
          ],
        },
      },
    },
  ],
  story: {
    kind: "manga4",
    title: "光るものは全部ニセモノ？",
    panels: [
      {
        scene: "放課後の教室。ソウタが英語劇の小道具の巻物を読み、金色のコインをにらむ。",
        lines: [
          { who: "ソウタ", text: "光るものは全部金じゃない" },
          { who: "ソウタ", text: "この金貨もニセモノか！" },
          { who: "ユイ", text: "えっ、そう読むの？" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ソウタ", look: "boy", x: 256, face: "shout", fx: "!", hand: [214, 226] },
            { who: "ユイ", look: "girl", x: 84, face: "surprise", fx: "?" },
          ],
          props: [
            { kind: "table", x: 0, y: 244 },
            { kind: "scroll", x: 150, y: 226, s: 0.8 },
            { kind: "coin", x: 214, y: 226, s: 0.8 },
          ],
        },
      },
      {
        scene: "ユイが札に「not all」と書いて見せる。",
        lines: [
          { who: "ユイ", text: "allとnotの組み合わせは" },
          { who: "ユイ", text: "{{部分否定}}だよ" },
          { who: "ソウタ", text: "ぶぶん…ひてい？" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ユイ", look: "girl", x: 256, face: "smile", hand: [212, 226] },
            { who: "ソウタ", look: "boy", x: 84, face: "think", fx: "?" },
          ],
          props: [
            { kind: "table", x: 0, y: 244 },
            { kind: "board", x: 160, y: 238, text: "not all" },
          ],
        },
      },
      {
        scene: "先生が来て、札に「全部とは限らない」と書く。",
        lines: [
          { who: "先生", text: "光るものが全部金とは" },
          { who: "先生", text: "限らない、という意味よ" },
          { who: "ソウタ", text: "じゃあ本物もあるのか！" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "先生", look: "teacher", x: 250, face: "smile", hand: [200, 226] },
            { who: "ソウタ", look: "boy", x: 86, face: "surprise", fx: "idea" },
          ],
          props: [
            { kind: "table", x: 0, y: 244 },
            { kind: "board", x: 150, y: 238, text: "全部とは限らない" },
          ],
        },
      },
      {
        scene: "ソウタが返ってきた答案をかかげて胸をはる。ユイが札を出す。",
        lines: [
          { who: "ソウタ", text: "ぼくの答案も部分否定！" },
          { who: "ソウタ", text: "全部まちがいとは限らない" },
          { who: "ユイ", text: "ほとんどまちがい、ね" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ソウタ", look: "boy", x: 256, face: "smile", fx: "!", hand: [214, 220] },
            { who: "ユイ", look: "girl", x: 84, face: "sweat", fx: "sweat" },
          ],
          props: [
            { kind: "table", x: 0, y: 244 },
            { kind: "board", x: 150, y: 238, text: "hardly" },
          ],
        },
      },
    ],
    note: "ユイ・ソウタ・先生は架空の人物で、会話はすべて創作です。All that glisters is not gold. が『ヴェニスの商人』で金の箱を選んだ王子に示される巻物の言葉であり、「光るものがすべて金とは限らない」という部分否定の意味で使われることは事実にもとづいています。",
  },
  mistakes: [
    { wrong: "Never I have seen such a view.", right: "Never have I seen such a view.", why: "否定語が文頭に出たら、疑問文と同じ語順（have ＋主語）にします。" },
    { wrong: "Rarely he goes out at night.", right: "Rarely does he go out at night.", why: "一般動詞の文の倒置は does を主語の前に出し、動詞は原形にもどします。" },
    { wrong: "「生徒は1人も来なかった」を All the students didn't come. と書く。", right: "None of the students came.", why: "all と not の組み合わせは部分否定（全員が来たわけではない）と読まれます。全体否定は none です。" },
    { wrong: "It was in this town which I was born.", right: "It was in this town that I was born.", why: "強調構文の「つなぎ」は that（強調するのが人なら who も可）。in this town は副詞句なので、関係代名詞の which は使えません。" },
  ],
  check: [
    { q: "I like tennis. — ___ ___ my brother.（兄もそうだ）", a: "So does", why: "「〜もそうだ」は So ＋助動詞（does）＋主語の倒置。" },
    { q: "Hardly ___ I sleep last night.", a: "did", why: "否定語 hardly が文頭、一般動詞の過去の文なので did を主語の前に。" },
    { q: "Not every student has a phone. は部分否定・全体否定のどちら？", a: "部分否定", why: "not ＋ every で「全員が持っているとは限らない」。" },
  ],
  next: [
    { label: "4択ドリル「否定・倒置・強調・省略」に挑戦", href: "/learn/eibunpo-ko/h-eng-gram-tokushu" },
    { label: "ひとつ前「話法」", href: "/learn/eibunpo-ko/h-eng-gram-waho" },
    { label: "関連「仮定法」（if を省いた倒置）", href: "/learn/eibunpo-ko/h-eng-gram-kateiho" },
  ],
};
