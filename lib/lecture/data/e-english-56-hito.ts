import type { Lecture } from "../types";

const C = "/media/commons/e-english-56-hito";

export const E_ENGLISH_56_HITO: Lecture = {
  unit: "e-english-56-hito",
  nameRuby: "人を紹介《しょうかい》する（He is 〜. / She is 〜.）",
  title: "男の人は He、女の人は She。紹介《しょうかい》は「だれか→どんな人か→できること」の順に",
  hook: "新しく来た先生のことを、家の人に「この先生はね…」と話したことはありませんか。英語にも、人を紹介《しょうかい》するときの決まった形があります。He と She の使い分けを覚えると、家族や友だち、あこがれの人のことを英語で話せるようになります。",
  mystery: "日本語なら「こちらは祖母です。料理がとくいです。」と、2文目の「だれが」を言わなくても通じます。ところが英語では、This is my grandmother. のあとも She is good at cooking. と、毎回 She を入れます。英語は、どうしていちいち He や She を言うのでしょう？",
  mission: {
    from: "町の小さなラジオ局で、子ども番組を作っている人",
    request: "来月から、町の小学生が英語で「わたしのヒーロー」を紹介《しょうかい》するコーナーを始めます。届いた原稿《げんこう》を読むと、どの文にも He や She が入っていて、日本語の原稿《げんこう》よりずっと多いのです。ラジオでは、写真も顔も見えません。英語ではなぜ He や She を毎回言うのか、名探偵《めいたんてい》のあなたに、そのわけを解き明かしてほしいのです。",
    thanks: "英語の文には「だれが」がかならず要り、しかも He・She は男の人か女の人かまで伝えていたのですね。顔の見えないラジオでは、この1語が聞く人の道しるべになります。子どもたちには「名前のあとは He・She で」と伝えます！",
  },
  sections: [
    {
      heading: "This is 〜. で始め、2回目からは He・She",
      body: "写真や本人を指して紹介《しょうかい》するときは、まず {{This is 〜.}} で「こちらは〜です」と言います。This is Riku. のように名前を入れます。2回目からは名前をくり返さず、{{He}} か {{She}} にかえて話を続けます。",
      reading: [
        "人を紹介《しょうかい》するときは、まず {{This is 〜.}}（こちらは〜です）で、だれの話かを決めます。This is my grandmother.（こちらはわたしの祖母です）。次に、その人がどんな人かを言い、最後にできることを言います。「だれか→どんな人か→できること」の順にならべると、聞く人は、その人のすがたを少しずつ思いえがけます。",
        "2文目からは、名前や my grandmother をくり返さずに、{{He}} か {{She}} にかえます。She is kind. She can make delicious rice balls.（祖母はやさしいです。おいしいおにぎりを作れます）。この入れかえは、1830年にアメリカで出た子どものための詩集の「メアリーさんのひつじ」を聞いてみましょう。",
        "Mary（メアリー）という名前は、はじめの4行に2回出てきます。ところが5行目では He followed her to school と、メアリーは {{her}}（彼女《かのじょ》を）にかわっています。子ひつじのほうも、the lamb から He にかわりました。英語では、かわいがっている動物を、人と同じように he や she でよぶことがあります。この歌は、1877年に発明家のエジソンが、自分の作った蓄音機《ちくおんき》に録音した言葉としても知られています。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "us",
        text: "Mary had a little lamb,\nIts fleece was white as snow,\nAnd every where that Mary went\nThe lamb was sure to go;\nHe followed her to school one day—\nThat was against the rule,\nIt made the children laugh and play,\nTo see a lamb at school.",
        ja: "メアリーさんは、子ひつじを1ぴきかっていました。\nその毛は、雪のように真っ白。\nメアリーさんが行くところには、どこへでも\n子ひつじは、かならずついていきました。\nある日、子ひつじは彼女《かのじょ》について学校へ。\nそれは、きまりに反することでした。\n子どもたちは、笑ったりはしゃいだり。\n学校に子ひつじがいるのを見たからです。",
        cite: "Sarah Josepha Hale, \"Mary's Lamb\" (stanza 1), Poems for Our Children (1830)",
        source: "https://archive.org/details/poemsforourchild00hale",
      }],
      photos: [
        {
          src: `${C}/redstone.webp`, width: 800, height: 600,
          alt: "白いふちどりのある、赤い板ばりの小さな校舎。入り口の上に札がかかっている",
          caption: "1798年の札がかかった、アメリカの小さな赤い校舎「レッドストーン・スクール」。メアリーが子ひつじをつれて行った学校だといわれています。",
          credit: { author: "Dudesleeper at English Wikipedia", license: "CC BY 2.5", licenseUrl: "https://creativecommons.org/licenses/by/2.5", source: "https://commons.wikimedia.org/wiki/File:Redstone_School.jpg" },
        },
        {
          src: `${C}/phonograph.webp`, width: 800, height: 600,
          alt: "金色の部品と、細いみぞがたくさんついた金属の筒《つつ》がある古い機械",
          caption: "1878年ごろのエジソンの蓄音機《ちくおんき》（アメリカの博物館）。筒《つつ》にまいたうすい金属の板に、声のふるえをきざんで録音しました。",
          credit: { author: "Daderot", license: "CC0", licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en", source: "https://commons.wikimedia.org/wiki/File:Tinfoil_phonograph,_1878,_invented_by_Thomas_Alva_Edison_-_National_Museum_of_American_History_-_DSC06217.JPG" },
        },
      ],
      figure: {
        type: "flow",
        title: "紹介《しょうかい》の3つの文",
        steps: [
          { label: "① だれか", sub: "This is Riku.", tone: "navy" },
          { label: "② どんな人か", sub: "He is kind.", tone: "blue" },
          { label: "③ できること", sub: "He can swim.", tone: "yellow" },
        ],
        arrows: ["He にかえる", "つけたす"],
        note: "Riku は男の子なので、2文目から He になります。",
      },
      cliff: "では、He と She はどう使い分けるのでしょう？「友だち」はどっち？",
    },
    {
      heading: "He と She の使い分け",
      body: "男の人・男の子は {{He}}、女の人・女の子は {{She}} で表します。「その人の名前は」と言うときは、男の人なら {{His name is 〜.}}、女の人なら {{Her name is 〜.}} です。friend や teacher は男女どちらにも使う言葉なので、その人が男か女かを見て決めます。",
      reading: [
        "{{He}} は男の人や男の子、{{She}} は女の人や女の子に使います。お父さん（father）、お兄さん・弟（brother）、おじさん（uncle）は He。お母さん（mother）、お姉さん・妹（sister）、おばさん（aunt）は She。名前の前につける Mr. は男の人、Ms. は女の人なので、Mr. Ito なら He、Ms. Ito なら She です。",
        "「その人の」と言うときは、形がかわります。男の人なら {{his}}、女の人なら {{her}}。His name is Taro.／Her name is Hana.。メアリーさんの歌の her は「彼女《かのじょ》を」の意味でしたが、her name のように「彼女《かのじょ》の」の意味にもなります。friend（友だち）や teacher（先生）、doctor（医者）は、男女どちらにも使う言葉です。その人を思いうかべて選びます。",
        "日本語の会話では、「彼《かれ》は」「彼女《かのじょ》は」をあまり使いません。「お母さんがね、お母さんはね」と、よび名をくり返すほうが自然です。英語はその反対で、話の中に He と She が何度も出てきます。メアリーさんの歌を書いたのは、アメリカの作家セーラ・ジョセファ・ヘイルという女の人です。ヘイルは雑誌の編集長として活躍《かつやく》し、感謝祭をアメリカ全体の祝日にしようと、長い間よびかけ続けた人としても知られています。",
      ],
      photos: [
        {
          src: `${C}/hale.webp`, width: 800, height: 1067,
          alt: "黒いドレスを着て、両側の髪《かみ》をくるくると巻いた女の人の油絵",
          caption: "「メアリーさんのひつじ」を書いたセーラ・ジョセファ・ヘイル（1788〜1879年）の肖像画《しょうぞうが》。This is 〜. で紹介《しょうかい》したら、次からは She で続けます。",
          credit: { author: "James Reid Lambdin", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Sarah_Hale_portrait.jpg" },
        },
      ],
      figure: {
        type: "compare",
        title: "He と She をくらべる",
        columns: [{ title: "He", tone: "blue" }, { title: "She", tone: "red" }],
        rows: [
          { label: "使う人", cells: ["男の人・男の子", "女の人・女の子"] },
          { label: "家族の例", cells: ["father / brother", "mother / sister"] },
          { label: "名前の前", cells: ["Mr. Ito", "Ms. Ito"] },
          { label: "「その人の」", cells: ["his（His name is 〜.）", "her（Her name is 〜.）"] },
        ],
      },
      cliff: "He is・She is のあとには、どんな言葉を続けると、その人らしさが伝わるのでしょう？",
    },
    {
      heading: "He is・She is のあとに来る言葉",
      body: "He is・She is のあとには、その人が{{どんな人か}}を表す言葉を置きます。家族や友だちとの関係、仕事、人がらなどです。とくいなことは {{good at 〜}} で言えます。He is は {{He's}}、She is は {{She's}} とちぢめることもできます。",
      reading: [
        "He is・She is のあとには、その人が{{どんな人か}}を表す言葉を置きます。まず、自分との関係。He is my uncle.（ぼくのおじです）。次に、仕事。She is a nurse.（看護師です）。そして人がら。kind（やさしい）、funny（おもしろい）、brave（勇敢《ゆうかん》な）、cool（かっこいい）。人がらの言葉は、あなたがその人を選んだ理由そのものです。",
        "とくいなことは {{good at 〜}} で言います。She is good at cooking.（料理がとくいです）。そして紹介《しょうかい》の3つ目が、できることの文です。She can fix bikes.（自転車をなおせます）のように can を使います。is と can をいっしょにして She is can 〜 とは言いません。",
        "たとえば「わたしのヒーロー」として近所の人を紹介《しょうかい》するなら、This is Ms. Mori. She is my neighbor. She is a bus driver. She is kind. She can drive a big bus. となります。This is で1人を決め、She で話を続け、最後に can でできることを言う。この順なら、短い英語でも、聞く人に「すてきな人だな」と伝わります。",
      ],
      figure: {
        type: "tree",
        title: "He is / She is のあとに入るもの",
        root: {
          label: "He is / She is",
          tone: "navy",
          children: [
            { label: "関係", sub: "my uncle", tone: "plain" },
            { label: "仕事", sub: "a doctor", tone: "plain" },
            { label: "人がら", sub: "kind / funny", tone: "yellow" },
            { label: "とくいなこと", sub: "good at 〜", tone: "blue" },
          ],
        },
        note: "kind はやさしい、funny はおもしろい、brave は勇敢《ゆうかん》な、という意味です。",
      },
      cliff: "紹介《しょうかい》を聞いた人は、どうやってたずね返せばよいのでしょう？",
    },
    {
      heading: "「だれ？」とたずねる・答える",
      body: "写真の人がだれかをたずねるときは {{Who is this?}} と聞きます。答えは This is 〜. です。「その人は〜ですか」と聞くときは、is を前に出して {{Is he 〜?}}・{{Is she 〜?}} とし、答えも he・she で返します。",
      reading: [
        "写真の人がだれか分からないときは {{Who is this?}}（この人はだれ？）と聞きます。答えは This is my aunt. のように This is 〜. です。もっと知りたいときは、is を前に出して {{Is she 〜?}} とたずねます。Is she a teacher?（その人は先生なの？）。答えは Yes, she is. か No, she isn't. です。",
        "ここで、もう一度、紹介《しょうかい》の英語を見てみましょう。She is kind. She can swim. どの文も She から始まっています。英語の文には、「だれが」にあたる言葉がかならず入ります。日本語のように「やさしいです。泳げます。」と、だれがを言わずにすませることができないのです。だから英語では、名前を何度もくり返すかわりに、短い He や She を使います。",
        "He と She には、もう1つ大切な役目があります。その人が男の人か女の人かを、聞く人に知らせることです。ラジオや電話のように顔が見えないときも、Ken や Maki のように名前だけでは分からないときも、He か She の1語で、聞く人は「だれの話か」をまちがえずについていけます。",
      ],
      reveal: "英語の文には、「だれが」にあたる言葉がかならず必要です。名前を毎回くり返すと長くなるので、2文目からは短い {{He}}・{{She}} にかえます。メアリーさんの歌でも、2回目からは her になっていましたね。しかも He・She は、その人が男の人か女の人かも伝えるので、聞く人は「だれの話か」に迷わないのです。",
      figure: {
        type: "formula",
        title: "たずねる・答えるの流れ",
        prose: true,
        steps: [
          { expr: "{{Who}} is this?", note: "だれかをたずねる" },
          { expr: "{{This is}} my uncle.", note: "関係を答える" },
          { expr: "{{Is he}} a cook?", note: "is を he の前に出す" },
          { expr: "Yes, {{he is}}. / No, {{he isn't}}.", note: "he でたずねられたら he で答える" },
        ],
      },
    },
  ],
  story: {
    kind: "novel",
    title: "She is my hero.",
    paragraphs: [
      "五年生の英語の時間。今日は「My hero（わたしのヒーロー）」の発表の日です。リクは1枚の写真を手に持っていました。写っているのは、商店街の自転車屋さんの、マキさんの後ろすがたです。油で黒くなった手で、自転車のチェーンをなおしています。",
      "きのうの練習で、リクはこう言いました。「This is Maki-san. Maki-san is my neighbor. Maki-san is kind. Maki-san can fix bikes.」。アメリカから来たエマ先生は、にっこり笑いました。「Good! でも、Maki-san が4回。2回目からは、He か She にしてみて」",
      "「名前のほうが、ていねいなのに」。リクは小さくつぶやきました。",
      "いよいよリクの番です。リクは写真を黒板にはって、大きく息をすいました。「This is Maki-san.」。エマ先生が写真をじっと見て、たずねました。「Is he your uncle?」",
      "教室が、どっとわきました。写真のマキさんは、帽子《ぼうし》に作業服の後ろすがた。それに、マキという名前だけでは、エマ先生には男の人か女の人か分からないのです。",
      "「No! No, ……」。リクは、言いかけた he をのみこみました。「She! She is my neighbor.」",
      "「Oh, she!」。エマ先生が大きくうなずきました。たった1語で、みんなの頭の中のマキさんが、くるりとふり返ったようでした。",
      "リクは続けました。「She is kind. She is good at fixing bikes. She can fix my bike in five minutes!」。一年生のとき、通学路でパンクした自転車をおして泣いていたリクに、「貸してごらん」と声をかけてくれたのが、マキさんでした。",
      "「She is my hero.」。教室に拍手《はくしゅ》がひろがりました。",
      "放課後、リクは自転車屋に寄りました。「マキさんのこと、英語で発表したよ」「へえ、なんて？」。リクは胸をはりました。「She is my hero.」。マキさんは油だらけの手で、照れくさそうに帽子《ぼうし》のつばを下げました。",
    ],
    note: "リク、マキさん、エマ先生、発表の出来事はすべて作り話です。英語の文の形（2文目から He・She にかえる、Is he 〜? のたずね方）は、実際の英語のきまりどおりです。",
  },
  mistakes: [
    { wrong: "This is my brother. She is ten.", right: "This is my brother. He is ten.", why: "brother（兄・弟）は男の人なので He を使います。" },
    { wrong: "He is name is Kenta.", right: "His name is Kenta.", why: "「その人（男の人）の名前」は his name。He is は「その人は〜です」の意味です。" },
    { wrong: "She is play the piano.", right: "She can play the piano.", why: "できることは can で言います。is と can はいっしょに使いません。" },
  ],
  check: [
    { q: "This is Mr. Kato. ___ is our music teacher. の ___ に入るのは？", a: "He", why: "Mr. は男の人の名前の前につけるので He。" },
    { q: "This is my aunt. ___ name is Saki. の ___ に入るのは？", a: "Her", why: "aunt（おば）は女の人なので「その人の」は her。" },
    { q: "Is she your sister? に「いいえ」で答えると？", a: "No, she isn't.", why: "she でたずねられたので she で答え、is not をちぢめて isn't。" },
  ],
  next: [
    { label: "「人を紹介《しょうかい》する」のドリル", href: "/learn/eigo-sho/e-english-56-hito" },
    { label: "つぎの図解レクチャー「一日の生活と頻度《ひんど》」", href: "/learn/lecture/e-english-56-hindo" },
    { label: "中学の図解レクチャー「be動詞《どうし》」", href: "/learn/lecture/j-en-1-be" },
  ],
};
