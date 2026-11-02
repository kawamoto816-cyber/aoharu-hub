import type { Lecture } from "../types";

const C = "/media/commons/h-eng-vocab-jukugo";

export const H_ENG_VOCAB_JUKUGO: Lecture = {
  unit: "h-eng-vocab-jukugo",
  title: "熟語は「動詞＋前置詞・副詞」の組み合わせ。小さな語のイメージで意味をつかむ",
  hook: "look は「見る」なのに、look after は「世話をする」、look up は「（辞書で）調べる」になります。熟語は丸暗記するものと思われがちですが、up・out・off のような小さな語にはそれぞれイメージがあり、それが意味を決めています。しくみがわかると、覚える量がぐっと減り、文の中でも見つけやすくなります。",
  mystery: "初対面の気まずさをほぐすことを、英語では break the ice（氷を割る）と言います。どこにも氷はないのに、なぜ「氷を割る」なのでしょう？ しかもこの言い方は、400年以上前のシェイクスピアの喜劇にも出てきて、いまも毎日のように使われています。",
  mission: {
    from: "洋画・海外ドラマの字幕翻訳者",
    request: "新人の翻訳者が、パーティーの場面の break the ice を「氷を割ろう」と訳してしまい、試写室が静まりかえりました。熟語を一つずつ丸暗記させても、新しい言い回しが出てくるたびに同じことが起きます。熟語の意味がどこから生まれるのか、そのしくみを、名探偵のあなたに解き明かしてほしいのです。",
    thanks: "熟語は、小さな語やものの「絵」が意味を運んでいるのですね。これからは新人に「単語を訳すな、絵を見ろ」と教えます。字幕の一行一行が、ぐっと生き生きしそうです。",
  },
  sections: [
    {
      heading: "同じ動詞でも、後ろの語で意味が変わる",
      body: "熟語の多くは、{{基本動詞}}（look, take, put, get など）に{{前置詞や副詞}}がついてできています。動詞の意味に、後ろの語の向き・イメージが加わると考えましょう。look for は「〜のほうへ目を向ける」から「探す」、look into は「中をのぞく」から「調べる」になります。",
      reading: [
        "英語には、look・take・put・get・give・come・go・make のように、短くてよく使われる{{基本動詞}}があります。これらは意味がとても広く、それだけでは「何をするのか」がぼんやりしています。そこに at・for・into・up・out のような小さな語が組み合わさると、動きの向きが決まり、意味がくっきりします。こうしてできた「動詞＋前置詞・副詞」のまとまりを、{{句動詞}}（群動詞）とよびます。",
        "look を例にとると、look の中心にあるのは「目を向ける」という動作です。目を向ける先が一点なら look at（〜を見る）、目当てのものを求めて目を向ければ look for（〜を探す）、中へ目を入れれば look into（〜を調べる）、去っていく人の後ろから目を向け続ければ look after（〜の世話をする）になります。after には「〜のあとを追って」という意味があり、子どもや病人のあとを目で追い続ける姿が、「世話をする」につながるのです。",
        "このしくみを知ると、熟語を一つずつ別の単語として覚える必要がなくなります。新しい熟語に出会ったら、動詞の中心の動作と、後ろの語の向きを重ねて、頭の中に絵をかいてみましょう。絵がかければ、文の中で意味を推測できます。英語を話す人たちも、句動詞を習うとき、こうした絵の感覚で身につけてきました。シェイクスピアの時代の劇のせりふにも、句動詞はたくさん出てきます。英語は昔から、小さな語の組み合わせで新しい意味を作るのが得意な言葉なのです。",
      ],
      photos: [
        {
          src: `${C}/first-folio.webp`, width: 800, height: 1274,
          alt: "上に大きく SHAKESPEARES COMEDIES, HISTORIES, & TRAGEDIES と印刷され、ひだ襟の男性の銅版画の肖像がある本の扉",
          caption: "シェイクスピアの戯曲をまとめた「ファースト・フォリオ」の扉（1623年、ロンドン）。肖像はマーティン・ドルーシャウトの銅版画。この本に収められた劇のせりふから、いまも使われる熟語がたくさん広まった。",
          credit: { author: "Martin Droeshout", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Title_page_William_Shakespeare%27s_First_Folio_1623.jpg" },
        },
      ],
      figure: {
        type: "tree",
        title: "look ＋ 小さな語",
        root: {
          label: "look",
          sub: "目を向ける",
          tone: "yellow",
          children: [
            { label: "look at", sub: "〜を見る", tone: "blue" },
            { label: "look for", sub: "〜を探す", tone: "blue" },
            { label: "look after", sub: "〜の世話をする", tone: "blue" },
            { label: "look into", sub: "〜を調べる", tone: "blue" },
          ],
        },
      },
      cliff: "では、up や out そのものには、どんな「絵」がかくれているのでしょう？",
    },
    {
      heading: "前置詞・副詞のコアイメージ",
      body: "up・out・off・on などは、場所の向きだけでなく{{「完全に」「なくなる」「続ける」}}のような意味も表します。eat up が「全部食べる」なのは、up に{{「すっかり・最後まで」}}のイメージがあるからです。新しい熟語に出会ったら、小さな語のコアに当てはめて考えてみましょう。",
      reading: [
        "小さな語の中心にある意味を{{コアイメージ}}といいます。up のコアは「上へ」です。コップに水を注ぐと水面が上がり、最後にいっぱいになります。そこから up には「すっかり・最後まで」の意味が生まれました。eat up（食べつくす）、use up（使い切る）、clean up（すっかり片づける）、fill up（満タンにする）は、どれも「いっぱいまで」「終わりまで」の絵です。",
        "out のコアは「外へ」です。中にあったものが外へ出ていくと、中は空になります。だから run out of（〜を切らす）、sell out（売り切れる）のように「なくなる」の意味をもちます。一方で、隠れていたものが外へ出てくれば find out（見つけ出す）、figure out（理解する）のように「はっきりさせる」の意味にもなります。off は「くっついていたものが離れる」で、take off（脱ぐ・離陸する）や put off（予定を先へ離す＝延期する）。on は「くっつく」で、くっついたまま進むことから go on（続ける）、keep on（〜し続ける）になります。",
        "シェイクスピアの歴史劇『ヘンリー四世 第2部』（1590年代後半）には、out のコアがあざやかに働く一節があります。ロンドンの居酒屋のおかみが、つけを払わない大食いの騎士フォルスタッフを訴える場面で、「この人はあたしを家からも住まいからも食べ出してしまった」と言うのです。eat me out of house and home は、食べることで相手を家の外へ追い出す、つまり「食べつくして財産をなくさせる」という絵です。続く put … into（〜の中へ入れる）も、into の「中へ」の向きそのままです。おかみは「いくら（sum）の借金か」と聞かれて、some（いくらか）どころか all（全部）だと言い返し、しゃれでも笑わせます。この eat … out of house and home は、いまも「（大食いで）家計を食いつぶす」という意味で使われています。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "It is more than for some, my lord; it is for all—all I have. He hath eaten me out of house and home; he hath put all my substance into that fat belly of his.",
        ja: "いくらかどころじゃありませんよ、閣下。全部なんです――あたしの持ち物の全部。この人は、あたしを食べつくして家も住まいもなくさせたんです。あたしの財産をそっくり、あの太った腹の中に入れちまったんですよ。",
        cite: "William Shakespeare, King Henry IV, Part 2, Act 2, Scene 1 (c. 1597)",
        source: "https://www.gutenberg.org/ebooks/1782",
      }],
      photos: [
        {
          src: `${C}/falstaff.webp`, width: 800, height: 1077,
          alt: "いすにどっかりすわる太った男と、その前で指さしながら何かを訴えるエプロン姿の女性、そのあいだに立つ男性をえがいた絵",
          caption: "ロバート・スマークがえがいた、太った騎士フォルスタッフ（左）と居酒屋のおかみクイックリー（右）、バードルフ。おかみの「食べつくされた」という訴えに、out の{{コアイメージ}}が生きている。",
          credit: { author: "Robert Smirke", license: "CC0", licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en", source: "https://commons.wikimedia.org/wiki/File:Robert_Smirke_-_Falstaff_with_Mistress_Quickly_and_Bardolph_-_B1977.14.3458_-_Yale_Center_for_British_Art.jpg" },
        },
      ],
      figure: {
        type: "compare",
        title: "小さな語のコアと熟語",
        columns: [{ title: "語" }, { title: "コア", tone: "yellow" }, { title: "熟語の例" }],
        rows: [
          { cells: ["up", "上へ・すっかり", "use up 使い切る"] },
          { cells: ["out", "外へ・なくなる", "run out of 切らす"] },
          { cells: ["off", "離れる・切れる", "put off 延期する"] },
          { cells: ["on", "くっつく・続く", "go on 続ける"] },
        ],
      },
      cliff: "意味がわかっても、it をどこに置くかで、文はまちがいになってしまいます。",
    },
    {
      heading: "目的語の位置：代名詞は「動詞と副詞のあいだ」",
      body: "pick up（拾う）の up は{{副詞}}なので、目的語は up の前にも後ろにも置けます。ところが目的語が it・them などの{{代名詞}}だと、{{必ず動詞と副詞のあいだ}}に入れます。look for の for は前置詞なので、目的語はいつも for の後ろです。",
      reading: [
        "句動詞には、大きく分けて2つの種類があります。1つは「動詞＋{{前置詞}}」の型です。前置詞は、名詞の前に置かれてその名詞とセットになる語なので、目的語はかならず前置詞の後ろに来ます。I'm looking for my key.（かぎを探しています）も、I'm looking for it. も、for の後ろです。もう1つは「動詞＋{{副詞}}」の型です。副詞の up や down は、名詞とセットではなく、動詞にくっついて動きの向きを足しています。",
        "副詞の型では、目的語が名詞なら、pick up the cup とも pick the cup up とも言えます。ところが目的語が it・them・him などの{{代名詞}}のときは、pick it up のように{{動詞と副詞のあいだ}}にしか置けません。英語には、すでに話に出てきた古い情報（代名詞が指すもの）は軽く前に置き、新しい情報や大事な語は文の後ろに置く、という傾向があります。代名詞は軽い古い情報なので動詞のすぐ後ろに、向きを表す副詞は文の終わりに来て、動きを強く印象づけるのです。",
        "同じ up でも、前置詞のことも副詞のこともあります。He ran up the hill.（彼は坂をかけ上がった）の up は前置詞で、the hill とセットです。だから He ran it up. とは言いません。迷ったら、目的語を it にかえて、動詞と小さな語のあいだに入れられるか試してみましょう。辞書では、あいだに入れられる熟語を put O off、pick O up のように、目的語の位置を示して書いていることが多いので、確かめる習慣をつけると安心です。",
      ],
      figure: {
        type: "formula",
        title: "目的語をどこに置くか",
        prose: true,
        steps: [
          { expr: "Pick up {{the cup}}.", note: "◯ 名詞は副詞の後ろでもよい" },
          { expr: "Pick {{the cup}} up.", note: "◯ 名詞は動詞と副詞のあいだでもよい" },
          { expr: "Pick {{it}} up.", note: "◯ 代名詞はあいだに入れる" },
          { expr: "Pick up {{it}}.", note: "✕ 代名詞を副詞の後ろに置けない" },
          { expr: "I'm looking for {{it}}.", note: "◯ for は前置詞。目的語はいつも後ろ" },
        ],
      },
      cliff: "ところで、同じ「延期する」に、なぜ put off と postpone の2つの言い方があるのでしょう？",
    },
    {
      heading: "1語の動詞で言いかえて覚える",
      body: "熟語は、同じ意味の{{1語の動詞}}と組で覚えると、読むときも書くときも役に立ちます。会話では熟語、かたい文章では1語の動詞がよく使われます。言いかえ問題でもよく問われるので、意味と合わせてセットにしておきましょう。",
      reading: [
        "put off と postpone は、どちらも「延期する」です。同じ意味の言い方が2つあるのには、英語の歴史が関係しています。put・off のような短い語の多くは、古くからイギリスで話されてきた古英語の時代から続く語です。一方、postpone（後ろに置く）、perform（成しとげる）、respect（ふり返って見る）のような長めの1語は、ラテン語やフランス語から入ってきました。1066年にフランス語を話す人々がイングランドを治めるようになってから、政治や法律、学問の言葉としてフランス語やラテン語の語が大量に入ったのです。",
        "その結果、英語には「昔からの短い語の組み合わせ」と「外から来た長い1語」が同じ意味で並ぶことになりました。家族や友だちとの会話では、口になじんだ{{句動詞}}が好まれます。We put off the game because of the rain.（雨で試合を延期した）。新聞・報告書・論文のようなかたい文章では、{{1語の動詞}}が好まれます。The match was postponed due to heavy rain.（大雨のため試合は延期された）。どちらが正しいかではなく、場面によって使い分けるのです。",
        "1語の言いかえと組で覚えておくと、長文で postpone を見たときにも put off の絵がすぐ浮かび、作文ではかたさに合わせて選べます。look up to（尊敬する）は「下から見上げる」絵、come up with（思いつく）は「考えが下から上がってきて自分に追いつく」絵です。1語の動詞の意味と、句動詞の絵を重ねると、どちらもぐっと忘れにくくなります。",
      ],
      figure: {
        type: "compare",
        title: "熟語と1語の言いかえ",
        columns: [{ title: "熟語", tone: "blue" }, { title: "1語", tone: "yellow" }, { title: "意味" }],
        rows: [
          { cells: ["put off", "postpone", "延期する"] },
          { cells: ["carry out", "perform", "実行する"] },
          { cells: ["look up to", "respect", "尊敬する"] },
          { cells: ["come up with", "think of", "思いつく"] },
        ],
        note: "think of も熟語だが、come up with の言いかえとしてよく使う。",
      },
      cliff: "小さな語だけではありません。氷やガチョウの「絵」が、そのまま熟語になったものもあります。",
    },
    {
      heading: "たとえから生まれた熟語：シェイクスピアの舞台から",
      body: "break the ice や wild-goose chase のように、{{たとえ（比ゆ）}}がそのまま決まった言い方になった熟語を{{イディオム}}といいます。1語ずつ訳しても意味は出ませんが、言葉がえがく{{絵}}を思いうかべると、意味の筋道が見えてきます。シェイクスピアの劇は、こうした言い回しを世に広めた舞台の一つです。",
      reading: [
        "シェイクスピア（1564〜1616年）は、ロンドンの劇場のために、喜劇・悲劇・歴史劇あわせて40ほどの戯曲を書きました。せりふは、王や貴族だけでなく、立ち見の庶民の客にも届くように書かれていて、生き生きとしたたとえがあふれています。劇場で耳にした言い回しは、観客の口から口へと広まり、やがて辞書にのる{{イディオム}}になっていきました。シェイクスピアが自分で作った言い方もあれば、すでにあった言い方を劇で使って有名にしたものもあります。",
        "喜劇『じゃじゃ馬ならし』（1590年代前半）では、気が強くて求婚者がよりつかない姉と、求婚者がおおぜいいる妹の姉妹が出てきます。父親は「姉が結婚するまで、妹は嫁にやらない」と言いはります。そこで、妹に求婚したい若者たちは、姉に求婚すると言い出した男に向かって、あなたが{{break the ice}}してくれれば、と頼みます。凍った川や港では、だれかが最初に氷を割らなければ、船は一そうも進めません。ここでの break the ice は「最初の一歩をふみ出して、あとの人の道を開く」という意味です。",
        "この絵は、いまの意味にもそのままつながっています。初対面の人たちのあいだには、まるで氷が張ったような、冷たく固い空気があります。だれかが最初にひと言かけてその氷を割れば、会話という船が動き出します。だから現代の break the ice は「（初対面の）緊張をほぐす・話のきっかけを作る」です。シェイクスピアの時代のイギリスは寒い冬が多く、ロンドンのテムズ川が凍ることもありました。氷を割る絵は、当時の観客にとって身近なものだったのです。",
        "悲劇『ロミオとジュリエット』（1590年代半ば）では、ロミオと友人マキューシオが、しゃれの言い合いで勝負する場面に{{wild-goose chase}}が出てきます。これは、先頭の馬のあとを、ほかの馬が決まった間隔でついて走る乗馬の競走のことだったと考えられています。ガン（wild goose）の群れが、先頭の一羽についてV字で飛ぶ姿にたとえた名前です。マキューシオは、相手のしゃれについて行けずに「降参だ」と言い、goose（ガチョウ）に「まぬけ」の意味もあることを使ってやり返します。その後、この言葉は「どこへ行くかわからないものを追いかける」ことから、いまの「見込みのない追跡・むだ骨」という意味に変わりました。",
      ],
      recite: [
        {
          lang: "en", voice: "male", accent: "gb",
          text: "If it be so, sir, that you are the man\nMust stead us all, and me amongst the rest;\nAnd if you break the ice, and do this feat,\nAchieve the elder, set the younger free\nFor our access, whose hap shall be to have her\nWill not so graceless be to be ingrate.",
          ja: "もしもあなたこそが、わたしたちみんなを――このわたしも含めて――助けてくださるお方だというのなら。\nもしあなたが氷を割って、この大仕事をやってのけ、\n姉君を手に入れて、妹君をわたしたちが近づけるよう自由にしてくださるなら、\n妹君を射止める幸運な者は、\n恩知らずなまねなどけっしていたしません。",
          cite: "William Shakespeare, The Taming of the Shrew, Act 1, Scene 2 (c. 1592)",
          source: "https://www.gutenberg.org/ebooks/1508",
        },
        {
          lang: "en", voice: "male", accent: "gb",
          text: "Nay, if thy wits run the wild-goose chase, I am done. For thou hast more of the wild-goose in one of thy wits, than I am sure, I have in my whole five. Was I with you there for the goose?",
          ja: "いや、きみの知恵がワイルド・グース・チェイスを走るなら、ぼくはおしまいだ。きみの知恵ひとつに入っている野のガチョウは、ぼくの知恵を五つ全部合わせたよりも多いんだからね。どうだい、いまのガチョウの話には、ついて行けたかな？",
          cite: "William Shakespeare, Romeo and Juliet, Act 2, Scene 4 (c. 1595)",
          source: "https://www.gutenberg.org/ebooks/1513",
        },
      ],
      photos: [
        {
          src: `${C}/frozen-thames.webp`, width: 800, height: 494,
          alt: "夕暮れの空の下、凍った川の上に割れた氷のかたまりが並び、人々が歩いている絵。奥に多くのアーチのある橋が見える",
          caption: "アブラハム・ホンディウス『凍ったテムズ川』（1677年）。奥はロンドン橋。割れて積み重なった氷の上を人々が歩く。{{break the ice}}の「最初に氷を割って道を開く」という絵が、当時の人には身近だった。",
          credit: { author: "Abraham Hondius", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:The_Frozen_Thames_1677_by_Abraham_Hondius.jpg" },
        },
        {
          src: `${C}/geese-v.webp`, width: 800, height: 600,
          alt: "白い空を、たくさんの鳥がV字の形にならんで飛んでいる写真",
          caption: "V字になって飛ぶガン（コザクラバシガン、イギリス・ランカシャー）。先頭の一羽にみんながついて行く姿が、{{wild-goose chase}}という乗馬の競走の名前のもとになったと考えられている。",
          credit: { author: "Apricaria", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:Skein_of_pink-footed_geese_in_%27V%27.jpg" },
        },
      ],
      figure: {
        type: "flow",
        title: "イディオムは「絵」から意味が生まれる",
        steps: [
          { label: "絵", sub: "凍った川の氷を割る", tone: "blue" },
          { label: "たとえ", sub: "最初の一歩で道を開く" },
          { label: "いまの意味", sub: "緊張をほぐす・きっかけを作る", tone: "yellow" },
        ],
        note: "wild-goose chase も「ガンの群れのように先頭を追う競走」→「行き先のわからない追跡」→「むだ骨」と変わった。",
      },
      reveal: "break the ice の「氷」は、初対面の人のあいだに張った、冷たく固い空気のたとえです。シェイクスピアの時代には、凍った川で最初に氷を割り、あとの船の道を開くことから「最初の一歩をふみ出す」意味で使われ、その絵がいまの「緊張をほぐす」につながりました。up の「すっかり」や out の「なくなる」と同じく、熟語の意味は、ことばがえがく{{絵（イメージ）}}が運んでいます。だから、1語ずつ訳すのではなく絵を思いうかべれば、400年前のせりふも、いまの字幕も読みとけるのです。",
    },
  ],
  story: {
    kind: "novel",
    title: "凍った川と、最初のひと言",
    paragraphs: [
      "1590年代のある冬、ロンドン。テムズ川のふちに薄い氷が張った朝、十三歳のネッドは劇場の裏口の前に立っていた。田舎から出てきて三日目。今日から劇団の小道具係の見習いだ。楽屋では、少年役者たちが女性の衣装を着たまま笑い合っている。舞台に女性が立てない時代、女性の役は声変わり前の少年が演じていた。ネッドは柱のかげで、だれにも話しかけられずにいた。",
      "「新入りか。そこにいると風邪をひくぞ」。台本を抱えた白髪の男が言った。舞台のそでで、せりふを忘れた役者にそっと続きを教えるプロンプターのジャイルズさんだ。「今日は新しい喜劇だ。そでで、よく聞いておけ」",
      "芝居が始まると、立ち見の客たちが押し合いながら舞台を見上げた。気の強い姉と、求婚者だらけの妹。妹に求婚したい若者たちが、姉に求婚すると言い出した男に頼みこむ。And if you break the ice, and do this feat. 客席がどっとわいた。ネッドは首をかしげた。「氷を、割る？ 舞台に氷なんてないのに」",
      "幕のあいだに、ジャイルズさんは窓の外の川を指さした。「見ろ。川が凍ると、船は一そうも出られない。だれかが最初に氷を割れば、そのあとを次々に船が通れる。あの若者たちは、姉さんの結婚という氷を、あの男に割ってもらいたいのさ。ことばを一つずつ訳すな。ことばがえがく{{絵}}を見るんだ」",
      "ネッドは、楽屋の言葉にも耳をすました。片づけろ、は clear up。すっかり、の up だ。ろうそくを切らした、は run out。中身が外へ出て、なくなる。小さな語の一つ一つに、向きと形がある。ジャイルズさんの言う{{コアイメージ}}が、だんだん見えてきた。",
      "夕方、衣装の山の前で、同じ年ごろの少年役者がひとり、ほどけたリボンと格闘していた。ネッドは息を吸った。氷を割るのは、だれかが最初にやらなければならない。「手伝おうか。そこ、ぼくが押さえてる」。少年は目を丸くし、それから笑った。「助かった。きみ、新入り？ ぼくはキット。さっき、いちばん前で口をあけて見てたろ」",
      "帰り道、凍った川のふちで、子どもたちが棒で氷をつついていた。割れた氷のすき間に、黒い水が光る。ネッドは小さくつぶやいた。break the ice。今朝はただの外国のような言葉だったのに、いまは自分の一日の絵になっていた。",
    ],
    note: "ネッド、ジャイルズさん、キットと劇場の場面、会話や心情は創作です。『じゃじゃ馬ならし』が1590年代前半ごろに書かれたこと、当時の劇場で女性の役を少年が演じたこと、プロンプター（台本係）がいたこと、立ち見の客がいたこと、作中の英文（第1幕第2場のせりふ）は史実・原作にもとづいています。初演の日や劇場は特定していません。",
  },
  mistakes: [
    { wrong: "I found your key. I'll pick up it.", right: "I'll pick it up.", why: "pick up の up は副詞。目的語が代名詞のときは、動詞と副詞のあいだに入れます。" },
    { wrong: "I'm looking forward to see you.", right: "I'm looking forward to seeing you.", why: "look forward to の to は前置詞なので、後ろは動詞の -ing 形（動名詞）にします。" },
    { wrong: "She takes after her little brother.（世話をする、のつもり）", right: "She looks after her little brother.", why: "take after は「（親など）に似ている」。「世話をする」は look after です。" },
    { wrong: "He told a joke to break the ice. を「氷を割るために冗談を言った」と訳す", right: "「場をなごませるために冗談を言った」と訳す", why: "break the ice はたとえから生まれたイディオム。氷は「初対面の冷たく固い空気」の絵です。" },
  ],
  check: [
    { q: "We have run ___ of milk. Let's buy some. の ___ は？", a: "out", why: "run out of 〜 で「〜を切らす・使い果たす」。out の「なくなる」イメージ。" },
    { q: "put off を1語の動詞で言いかえると？", a: "postpone", why: "どちらも「延期する」。off の「離れる」イメージで、予定を先へ離す。" },
    { q: "「それを書き留めなさい」を write ___ ___ で表すと？", a: "Write it down.", why: "write down の down は副詞。代名詞 it は動詞と副詞のあいだに入れる。" },
  ],
  next: [
    { label: "英熟語で覚える", href: "/learn/jukugo" },
    { label: "ひとつ前「英単語2000」", href: "/learn/eitango" },
    { label: "関連「前置詞」", href: "/learn/eibunpo-ko/h-eng-gram-zenchishi" },
  ],
};
