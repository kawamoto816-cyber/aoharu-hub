import type { Lecture } from "../types";

const C = "/media/commons/j-en-3-chobun";

export const J_EN_3_CHOBUN: Lecture = {
  unit: "j-en-3-chobun",
  title: "長文は「段落の要点」と「つなぎの語」で読み、答えは本文にもどって確かめる",
  hook: "長文を見ると、知らない単語があるだけで手が止まってしまうことがあります。でも、テストの長文問題は、一語一語を訳すより{{段落ごとの要点}}と{{文と文のつながり}}をつかむほうが速く正確に解けます。ここでは短い文章を例に、読み方の型を身につけます。",
  mystery: "オー・ヘンリーの短編「賢者の贈り物」の最後の段落で、語り手は主人公の夫婦を「おろかな2人の子ども」とよんだすぐあとに、「この2人こそいちばん賢い」と言い切ります。正反対のことを言っているのに、なぜ読者は「そのとおりだ」と納得してしまうのでしょう？",
  mission: {
    from: "FMラジオの英語番組のDJ",
    request: "クリスマスの特別番組で、「賢者の贈り物」の英語の原文を少しずつ朗読します。ところが中学生のリスナーから「最後で foolish（おろか）と言ったのに wisest（いちばん賢い）とも言っている。作者のまちがいでは？」というおたよりが届きました。放送で胸を張って答えるために、名探偵のあなたに、この矛盾に見える結末のなぞを解いてほしいのです。",
    thanks: "But のあとが作者の本当の答えで、2人の宝物は物語のはじめから示されていたのですね。番組では、最後の段落を読む前に宝物の段落をもう一度流して、リスナーにも自分で気づいてもらいます。",
  },
  sections: [
    {
      heading: "設問を先に見て、段落ごとに要点を1行でつかむ",
      body: "本文を読む前に{{設問}}にざっと目を通すと、何に注意して読めばよいかがわかります。読みながら、段落ごとに「{{だれが・何をして・どうなったか}}」を日本語1行でまとめます。下の3段落の文章では、始まり → 変化 → 今、という流れになっています。",
      reading: [
        "長文を前から1語ずつ訳していくと、最後の段落に着くころには最初の内容を忘れてしまいがちです。そこで、まず{{設問}}に目を通して「何を探して読むのか」を決めます。そのうえで段落を1つ読むごとに、「{{だれが・何をして・どうなったか}}」を日本語1行でメモします。下の畑の話なら「5人で畑を始めた → トマトが育って給食に → 今は30人以上」。3行のメモだけで、文章全体の流れが見わたせます。",
        "この読み方は、名作の短編小説でも力を発揮します。アメリカの作家{{オー・ヘンリー}}（本名ウィリアム・シドニー・ポーター、1862〜1910年）は、ニューヨークの新聞に毎週のように短い物語を書いた人です。1905年12月10日、日曜版の新聞『ニューヨーク・サンデー・ワールド』に載ったのが「賢者の贈り物」でした。翌1906年、短編集『四百万』に収められます。四百万とは当時のニューヨークの人口のこと。ひとにぎりのお金持ちではなく、町でふつうに暮らす人々を書く、という思いがこめられた題だといわれます。",
        "物語はこう始まります。One dollar and eighty-seven cents. That was all.（1ドル87セント。それで全部だった。）若い妻デラは、夫ジムへのクリスマスの贈り物を買うために、何か月もかけて小銭をためてきました。段落の終わりには Three times Della counted it.（デラは3回それを数えた）とあり、And the next day would be Christmas.（そして、明日はクリスマスだった）と結ばれます。この第1段落を1行にすると「クリスマスの前日なのに、デラのお金は1ドル87セントしかない」。短い文を重ねて、お金の少なさと、あせる気持ちを読者に焼きつけています。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "us",
        text: "One dollar and eighty-seven cents. That was all. And sixty cents of it was in pennies.",
        ja: "1ドル87セント。それで全部だった。しかもそのうち60セントは、1セント玉だった。",
        cite: "O. Henry, \"The Gift of the Magi\" (1905)",
        source: "https://www.gutenberg.org/ebooks/7256",
      }],
      photos: [
        {
          src: `${C}/o-henry.webp`, width: 373, height: 521,
          alt: "スーツにネクタイ姿の、がっしりした中年の男性の白黒の肖像写真",
          caption: "{{オー・ヘンリー}}（1910年の肖像）。新聞や雑誌に短編を次々と書き、最後のどんでん返しで読者をおどろかせる作風で人気を集めた。",
          credit: { author: "Unknown author", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:William_Sydney_Porter,_1910.jpg" },
        },
        {
          src: `${C}/park-row.webp`, width: 800, height: 597,
          alt: "金色のドームをのせた高いビルと、時計塔のある赤れんがのビルなどが並ぶ、色つきの古い街の写真",
          caption: "ニューヨークの新聞社街パーク・ロウ（1900年ごろの色つき写真）。左の金色のドームが新聞『ワールド』の本社ビル。この新聞の日曜版に「賢者の贈り物」が載った。",
          credit: { author: "Detroit Publishing Co.", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Newspaper_Row,_New_York_City,_1900.jpg" },
        },
      ],
      figure: {
        type: "formula",
        title: "例文（3段落）と、段落ごとの要点",
        prose: true,
        steps: [
          { expr: "Last April, Mika and four classmates {{started a small vegetable garden}} behind their school. At first, few students were interested in it.", note: "始まり：5人で畑を始めた" },
          { expr: "In July, {{however}}, the tomatoes grew big and red. The students gave some of {{them}} to the school cafeteria, and lunch became more popular.", note: "変化：トマトが育ち、給食に" },
          { expr: "Now {{more than thirty students}} work in the garden. Mika says, “Growing vegetables taught us how to work together.”", note: "今：30人以上。協力を学んだ" },
        ],
      },
      cliff: "物語の2つ目の大事な段落では、they・one・the other が何を指すかがカギになります。",
    },
    {
      heading: "it・they・this が指すものは、前から探す",
      body: "代名詞や this・that などの{{指示語}}は、ふつう{{それより前}}に出た語や内容を指します。第2段落の them は、直前の文の the tomatoes です。見つけたら、その語を代わりに入れて読んでみて、{{意味が通るか}}を確かめましょう。this は語ではなく、前の文全体の内容を指すこともあります。",
      reading: [
        "英語は、同じ語を何度もくり返すのをきらう言葉です。そのため、一度出た名詞は it・they・them などの代名詞に、前の文の内容は this・that に置きかえられます。こうした{{指示語}}が出たら、{{それより前}}を探し、数（1つか複数か）が合う語を見つけます。見つけた語を指示語の場所に入れて読み、{{意味が通るか}}を確かめれば完了です。畑の話の them を the students と読むと「生徒の一部を給食室にあげた」となって意味が通らないので、the tomatoes だとわかります。",
        "「賢者の贈り物」の前半で、作者は夫婦の貧しい暮らしをえがいたあと、こう書きます。Now, there were two possessions of the James Dillingham Youngs in which they both took a mighty pride.（さて、ジェイムズ・ディリンガム・ヤング家には、2人ともがとても誇りにしている持ち物が2つあった。）ここの they は、前に出た the James Dillingham Youngs、つまりジムとデラの夫婦を指します。the＋名字s で「〜家の人たち」という意味です。",
        "続く2文は One was …. The other was ….（1つは……。もう1つは……。）の形です。one と the other は、前の文の two possessions を受けて「2つのうちの1つ」「残りのもう1つ」と分けて示す言葉です。1つ目は、祖父から父、父からジムへと受けつがれた金の懐中時計。2つ目は、デラの長く美しい髪。指示語をていねいにたどると、この物語の大事な情報「夫婦の宝物は2つ」がはっきり浮かび上がります。この2つが、結末で大きな意味をもつことになります。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "us",
        text: "Now, there were two possessions of the James Dillingham Youngs in which they both took a mighty pride. One was Jim's gold watch that had been his father's and his grandfather's. The other was Della's hair.",
        ja: "さて、ジェイムズ・ディリンガム・ヤング家には、2人ともがたいそう誇りにしている持ち物が2つあった。1つはジムの金時計で、それは父のもの、そして祖父のものだった。もう1つはデラの髪だった。",
        cite: "O. Henry, \"The Gift of the Magi\" (1905)",
        source: "https://www.gutenberg.org/ebooks/7256",
      }],
      photos: [
        {
          src: `${C}/pocket-watch.webp`, width: 800, height: 533,
          alt: "布の上に置かれた、ふたのない古い懐中時計。ガラスごしに金色の機械と飾りの彫刻が見える",
          caption: "博物館に展示された古い懐中時計（デンマーク国立博物館）。ジムの金時計のように、懐中時計は親から子へ受けつがれる宝物だった。本文の One が指す1つ目の宝物。",
          credit: { author: "Thomas Quine", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0", source: "https://commons.wikimedia.org/wiki/File:Nationalmuseet_-_Antique_pocket_watch_with_gold_interior.jpg" },
        },
      ],
      figure: {
        type: "flow",
        title: "指示語の指すものを見つける",
        steps: [
          { label: "指示語に印", sub: "them / it / this", tone: "yellow" },
          { label: "前の文を探す", sub: "数が合う名詞・内容" },
          { label: "入れかえて確認", sub: "the tomatoes で通る", tone: "blue" },
        ],
      },
      cliff: "物語の最後、たった1語の But が、結末の意味をひっくり返します。",
    },
    {
      heading: "つなぎの語が、文と文の関係を教えてくれる",
      body: "however や so などの{{つなぎの語}}は、前後の文がどんな関係かを示す道しるべです。特に however・but のあとは、前と{{反対の内容}}が来て、筆者が言いたいことになりやすい部分です。例文でも however のあとで「関心が少ない → トマトが育った」と話が変わっています。",
      reading: [
        "{{つなぎの語}}は、次にどんな内容が来るかを先に教えてくれる予告です。but・however は「前と{{反対の内容}}が来る」、so は「前の結果が来る」、for example は「例が来る」、first・then は「順番に話が進む」。予告がわかれば、知らない単語が多い文でも、その文が段落の中でどんな役目をしているかは判断できます。特に but・however のあとは、筆者が本当に言いたいことが来やすいので、ていねいに読みましょう。",
        "物語の続きです。お金が足りないデラは、自分の自慢の髪を切って売り、20ドルを手に入れます。そしてジムの金時計にぴったりの、プラチナの時計の鎖を買いました。ところが夜、帰ってきたジムは、短くなったデラの髪を見て立ちつくします。ジムがデラのために買ってきたのは、デラが店のショーウインドーで見て、ずっとあこがれていた、べっこうの美しい櫛のセットでした。髪を飾る櫛なのに、飾る髪がもうないのです。",
        "そして最後の段落で、語り手は読者に直接語りかけます。前半では、2人を two foolish children（おろかな2人の子ども）とよび、most unwisely（いかにも賢くないやり方で）家の宝物を犠牲にしたと言います。ところが次の文は But で始まり、these two were the wisest（この2人こそ、いちばん賢かった）と正反対のことを言い切ります。題名の magi（マギ）は、聖書の物語で、生まれたばかりのイエスに贈り物を届けたと伝えられる東方の賢者たちのことです。語り手は But のあとで、物語を題名の「賢者」に結びつけているのです。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "us",
        text: "And here I have lamely related to you the uneventful chronicle of two foolish children in a flat who most unwisely sacrificed for each other the greatest treasures of their house. But in a last word to the wise of these days let it be said that of all who give gifts these two were the wisest.",
        ja: "さて、わたしはここまで、アパートに住むおろかな2人の子どもの、なんということもない話を、つたない言葉で語ってきた。2人はいかにも賢くないやり方で、家のいちばんの宝物を、おたがいのために犠牲にしたのだった。けれども最後に、今の世の賢い人たちにひとこと言っておこう。贈り物をするすべての人のうちで、この2人こそがいちばん賢かったのだと。",
        cite: "O. Henry, \"The Gift of the Magi\" (1905)",
        source: "https://www.gutenberg.org/ebooks/7256",
      }],
      photos: [
        {
          src: `${C}/comb.webp`, width: 800, height: 758,
          alt: "べっこうの長い歯の上に、金色の板と赤いさんごの玉がたくさん飾られた髪かざりの櫛",
          caption: "19世紀半ばのイタリアのべっこうの櫛（さんごの飾りつき）。ジムがデラに贈ったのも、宝石で縁どったべっこうの櫛だった。長い髪に挿して飾るもの。",
          credit: { author: "Unknown artist", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Comb_(Italy),_mid-19th_century_(CH_18603615).jpg" },
        },
      ],
      figure: {
        type: "compare",
        title: "つなぎの語と、そのあとに来る内容",
        columns: [{ title: "はたらき" }, { title: "あとに来る内容", tone: "yellow" }],
        rows: [
          { label: "However / But", cells: ["逆接（しかし）", "前と反対の内容・大事な点"] },
          { label: "So", cells: ["結果（だから）", "前の文の結果"] },
          { label: "For example", cells: ["例を挙げる", "前の内容の具体例"] },
          { label: "First / Then", cells: ["順序", "できごと・手順の順番"] },
        ],
      },
      cliff: "But のあとの「いちばん賢い」は本当に本文から言えるのか、本文にもどって確かめます。",
    },
    {
      heading: "内容に合う文は、本文の該当する場所にもどって選ぶ",
      body: "「本文の内容に合うもの」を選ぶ問題では、選択肢のキーワードを手がかりに{{本文の該当する場所}}にもどり、1文ずつ照らし合わせます。まちがいの選択肢は、{{数・人・時}}が少しだけちがっていたり、{{本文に書いていないこと}}が入っていたりします。記憶にたよらず、必ず本文で確かめましょう。",
      reading: [
        "内容一致の問題では、選択肢のキーワード（人名・数・時を表す語）に印をつけ、{{本文の該当する場所}}にもどって1文ずつ照らし合わせます。まちがいの選択肢は、{{数・人・時}}のどれかが少しだけずれているか、{{本文に書いていないこと}}がまぎれこんでいるかのどちらかが多いのです。畑の話で「30人で畑を始めた」とあれば、始めたのは5人、30人以上は今の人数なので×。記憶だけで選ぶと、こうしたずれを見落とします。",
        "「賢者の贈り物」で試してみましょう。「デラは時計を売って、櫛を買った」という選択肢があったとします。本文にもどると、I sold the watch to get the money to buy your combs.（きみの櫛を買うお金を手に入れるために、時計を売ったんだ）と言っているのはジムです。時計を売ったのはジム、髪を売ったのはデラ。人が入れかわった、典型的なひっかけです。2人はそれぞれ、相手の宝物を引き立てる贈り物のために、自分の宝物を手放していたのでした。",
        "では「語り手は、2人をおろかだと考えている」はどうでしょう。本文に foolish とあるから○、と飛びつくのは危険です。but のあとの文で、語り手は2人を the wisest とよんでいるからです。さらに、最後の段落の the greatest treasures of their house（家のいちばんの宝物）は、第2段落の two possessions … in which they both took a mighty pride（2人がとても誇りにしていた2つの持ち物）を言いかえたものです。結末の材料は、物語のはじめから本文に置かれていたのです。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "us",
        text: "\"Dell,\" said he, \"let's put our Christmas presents away and keep 'em a while. They're too nice to use just at present. I sold the watch to get the money to buy your combs. And now suppose you put the chops on.\"",
        ja: "「デル」とジムは言った。「おたがいのクリスマスの贈り物は、しばらくしまっておこうよ。今すぐ使うには、すてきすぎるからね。ぼくは、きみの櫛を買うお金をつくるために、時計を売ったんだ。さあ、そろそろ肉を焼いてくれないか」",
        cite: "O. Henry, \"The Gift of the Magi\" (1905)",
        source: "https://www.gutenberg.org/ebooks/7256",
      }],
      reveal: "語り手が foolish（おろか）とよんだのは、贈り物が使えなくなったという「物」の面から見た話です。But のあとに来る本当の主張は、相手のために自分のいちばんの宝物を差し出した2人こそ、贈り物をする人の中でいちばん賢い、ということ。そしてその宝物は、第2段落の two possessions として最初から示されていました。{{つなぎの語}}が主張の場所を教え、{{本文の該当する場所}}が根拠を見せてくれるので、どんでん返しでも読者は「そのとおりだ」と納得できるのです。",
      figure: {
        type: "tree",
        title: "選択肢を本文と照らし合わせる",
        root: {
          label: "選択肢の文",
          children: [
            { label: "本文と一致", sub: "言いかえも OK", tone: "blue", children: [{ label: "○ 正解" }] },
            { label: "一部がちがう", sub: "数・人・時", tone: "red", children: [{ label: "× 30人で始めた" }] },
            { label: "本文にない", sub: "ありそうでも ×", tone: "red", children: [{ label: "× 先生が提案した" }] },
          ],
        },
        note: "例文では畑を始めたのは5人（Mika＋4人）。30人以上は「今」の人数。",
      },
    },
  ],
  story: {
    kind: "novel",
    title: "階段のガス灯と、1ドル87セント",
    paragraphs: [
      "1905年12月10日、日曜日の夜。ニューヨークの下町の古いアパートの階段で、十四歳のアンナはガス灯の下に新聞を広げた。新聞売りの弟ピートが、売れ残りの『サンデー・ワールド』を一部、持ち帰ってくれたのだ。昼は紙箱の工場で働き、夜学で英語を習いはじめて一年。新聞の物語を一つ、自分の力で最後まで読み通すのが、アンナのひそかな目標だった。",
      "物語の最初の行は、拍子ぬけするほど短かった。One dollar and eighty-seven cents. That was all. 「1ドル87セント……それで全部」。アンナはえんぴつを取り出し、新聞の余白に母国の言葉で小さく書いた。「お金が少ない。明日はクリスマス」。わからない単語は、とばした。先生が言っていたのだ。段落ごとに、だれが何をしてどうなったかを1行でつかめばいい、と。",
      "「they って、だれ？」と、となりで足をぶらぶらさせていたピートが新聞をのぞきこんだ。アンナは指で前の行へもどった。「前に the James Dillingham Youngs ってある。この夫婦のこと。それで One は1つ目、The other はもう1つ。宝物が2つあるの。時計と、髪」。アンナは余白に書き足した。「宝物は2つ」。",
      "読み進めるうちに、アンナの指が止まった。デラが自分の髪を切って売ってしまったのだ。ピートが「えっ」と声をあげた。そして帰ってきたジムが差し出したのは、髪に挿す美しい櫛だった。「じゃあ、時計を売ったのは奥さん？」とピートがきく。「待って。本文にもどる」。アンナはジムのせりふを一語ずつたどった。I sold the watch……。「売ったのはジム。2人とも、自分の宝物を売ったんだ」",
      "最後の段落には foolish という語があった。「ほら、やっぱりばかだったって」と笑うピートに、アンナは首をふった。「次が But で始まってる。but のあとは、言いたいことが来るの」。そこには、these two were the wisest とあった。いちばん賢い。アンナは余白の最初のメモを見返した。宝物は2つ。答えは、はじめから書いてあったのだ。",
      "その夜、アンナはベッドの下からブリキの缶を出し、ためてきた小銭を3回数えた。1ドルにも届かない。ピートがほしがっていた手袋には、まだ足りないかもしれない。それでも、缶をにぎるアンナの胸は、ガス灯よりも少しだけあたたかかった。",
    ],
    note: "アンナとピート、アパートの場面、会話や心情はすべて創作です。「賢者の贈り物」が1905年12月10日に新聞『ニューヨーク・サンデー・ワールド』に載ったこと、物語の筋書き、作中の英文は事実・原作にもとづいています（英文は1906年の短編集に収められた形で、新聞に載ったときの題は Gifts of the Magi でした）。",
  },
  mistakes: [
    { wrong: "知らない単語が出るたびに止まって、全部訳そうとする", right: "前後の文から意味を推測して読み進める", why: "1語わからなくても、段落の要点はつかめることがほとんどです。設問に関わる語だけ、ていねいに考えます。" },
    { wrong: "them を、すぐ近くの the students だと考える", right: "them ＝ the tomatoes", why: "「生徒たちは them の一部を給食室にあげた」なので、生徒ではなく、前の文のトマトを指します。意味が通るかで確かめます。" },
    { wrong: "記憶だけで内容一致の選択肢を選ぶ", right: "本文の該当する場所にもどって確かめる", why: "数や時が少しだけちがう選択肢は、記憶だけだと見分けにくいからです。" },
  ],
  check: [
    { q: "例文で、畑を始めたのは何人？", a: "5人", why: "Mika and four classmates なので、Mika ＋ 4人 ＝ 5人。" },
    { q: "例文の第2段落の them は何を指す？", a: "the tomatoes（トマト）", why: "直前の文の the tomatoes を入れると「トマトの一部を給食室にあげた」と意味が通る。" },
    { q: "However のあとには、ふつうどんな内容が来る？", a: "前と反対の内容", why: "however は逆接のつなぎの語。話の流れが変わり、大事な内容が来やすい。" },
  ],
  next: [
    { label: "4択ドリル「長文読解」に挑戦", href: "/learn/eigo-chu/j-en-3-chobun" },
    { label: "長い文を読みとく「関係代名詞」", href: "/learn/lecture/j-en-3-kankei" },
    { label: "語いをふやす「英単語」", href: "/learn/chu-tango" },
  ],
};
