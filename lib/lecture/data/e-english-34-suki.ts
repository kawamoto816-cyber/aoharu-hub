import type { Lecture } from "../types";

const C = "/media/commons/e-english-34-suki";

export const E_ENGLISH_34_SUKI: Lecture = {
  unit: "e-english-34-suki",
  nameRuby: "好《す》きなものを伝《つた》える（I like 〜.）",
  title: "I like 〜. で好《す》きを伝《つた》え、Do you like 〜? でたずねる",
  hook: "新しいクラスで友だちと話すとき、「何が好《す》き？」はいちばん話しやすい話題です。英語《えいご》でも I like 〜. の形を1つ覚《おぼ》えるだけで、スポーツ、食べ物、動物など、自分の好《す》きなものをたくさん伝《つた》えられます。",
  mystery: "日本語なら、友だちに「犬、好《す》き！」と言うだけで通じます。それなのに英語《えいご》では、なぜ I like dogs. と、わざわざ I（わたし）を言うのでしょう？",
  mission: {
    from: "近所の大学生",
    request: "わたしは、町の国際《こくさい》交流の会で、外国から来た子どもたちと遊ぶボランティアをしています。日本の子に「英語《えいご》って、どうしていちいち I って言うの？ like dogs! だけでいいじゃん」と聞かれて、答えにこまってしまいました。名探偵《めいたんてい》のあなたに、英語《えいご》で I を言うわけを見つけてほしいのです。",
    thanks: "英語《えいご》は文の頭に「だれが」を言う言葉で、I と you で「わたし」と「あなた」をはっきり分けるのですね。次の会では、子どもたちと I like 〜. と Do you like 〜? で、好《す》きなものを言い合うゲームをしてみます！",
  },
  sections: [
    {
      heading: "I like の後ろに、好《す》きなものを入れる",
      body: "「わたしは〜が好《す》きです」は {{I like 〜.}} と言います。I like の後ろに入れる言葉をかえるだけで、いろいろな好《す》きを伝《つた》えられます。犬やりんごのように数えられる物は、{{dogs、apples のように s をつけて}}言うことが多いです。好《す》きではないときは {{I don't like 〜.}} と言います。",
      reading: [
        "英語《えいご》で「〜が好《す》き」を伝《つた》える言い方は、I like 〜. です。I は「わたし」、like は「好《す》き」。その後ろに、好《す》きなものの名前を入れます。I like soccer.（サッカーが好《す》き）、I like ramen.（ラーメンが好《す》き）。名前を入れかえるだけで、何十通りもの「好《す》き」が言えます。",
        "日本語とくらべてみましょう。日本語では「サッカー、好《す》き！」と言えば通じます。だれが好《す》きなのかは、言わなくても分かるからです。ところが英語《えいご》では、ふつう文のはじめに{{「だれが」}}を言います。自分のことなら I です。英語《えいご》には「だれが → どうする → 何を」という{{言葉の順番《じゅんばん》}}のきまりがあって、文の頭をあけたままにしないのです。",
        "犬やりんごのように、1つ、2つと数えられるものは、I like dogs. のように s をつけて言うことが多いです。「犬というもの、みんな」が好《す》き、という感じになるからです。好《す》きではないときは I don't like 〜. と言います。にがてなものも正直に言えると、話はもっと楽しくなります。",
      ],
      figure: {
        type: "formula",
        title: "I like の後ろをかえてみる",
        prose: true,
        steps: [
          { expr: "I like {{soccer}}.", note: "サッカーが好《す》き" },
          { expr: "I like {{dogs}}.", note: "犬が好《す》き（s がつく）" },
          { expr: "I like {{curry and rice}}.", note: "カレーライスが好《す》き" },
          { expr: "I {{don't}} like carrots.", note: "にんじんは好《す》きではない" },
        ],
      },
      cliff: "自分の「好《す》き」は言えました。では、相手の「好《す》き」はどう聞くのでしょう？",
    },
    {
      heading: "好《す》きかどうかをたずねる",
      body: "相手に「〜は好《す》き？」とたずねるときは {{Do you like 〜?}} と言います。文の最後《さいご》を少し上げて言うと、たずねている感じが伝《つた》わります。好《す》きなら {{Yes, I do.}}、好《す》きではないなら {{No, I don't.}} と答えます。",
      reading: [
        "相手に「〜は好《す》き？」とたずねるときは、Do you like 〜? と言います。you は「あなた」です。ここでも、文の中にちゃんと「だれ」が入っています。I like なら自分の話、Do you like なら相手の話。{{I と you}}を入れかえるだけで、話の向きががらりとかわります。",
        "たずねる文は、さいごを少し上げて言います。答えは Yes, I do.（うん、好《す》き）か、No, I don't.（ううん、好《す》きじゃない）です。答えの中にも I が入っていますね。英語《えいご》は、たずねる人も答える人も、いつも「だれが」を言う言葉なのです。",
        "No と答えるのは、少しどきどきするかもしれません。でも、好《す》きなものがちがっていても大丈夫《だいじょうぶ》。No, I don't. のあとに、I like rabbits. と自分の好《す》きをつけ足せば、会話はちゃんと続《つづ》きます。",
      ],
      figure: {
        type: "tree",
        title: "Do you like cats? への答え方",
        root: {
          label: "Do you like cats?",
          sub: "ねこは好《す》き？",
          children: [
            { label: "Yes, I do.", sub: "うん、好《す》き", tone: "blue" },
            { label: "No, I don't.", sub: "ううん、好《す》きではない", tone: "red" },
          ],
        },
      },
      cliff: "Yes か No かではなく、「何が好《す》き？」と聞きたいときは、どう言えばいいのでしょう？",
    },
    {
      heading: "「何が好《す》き？」は What 〜 do you like?",
      body: "何のスポーツが好《す》きかを聞くときは {{What sport do you like?}} です。What の後ろの言葉をかえると、食べ物、動物、色など、聞きたいことをかえられます。答えるときは、Yes や No ではなく {{I like 〜.}} で好《す》きなものを言います。",
      reading: [
        "「何のスポーツが好《す》き？」と聞くときは、What sport do you like? と言います。What は「何」。What のすぐ後ろに sport（スポーツ）、food（食べ物）、color（色）、song（歌）などを入れると、聞きたいことをえらべます。答えるときは Yes や No ではなく、I like 〜. で好《す》きなものの名前を言います。",
        "たとえば What song do you like?（何の歌が好《す》き？）と聞かれて、I like Twinkle, Twinkle, Little Star. と答えたとします。日本では「きらきら星」として知られている歌です。じつは、このメロディーは英語《えいご》の歌として生まれたのではありません。1700年代のフランスで、フランス語の歌として歌われていたものです。",
        "オーストリアの作曲家モーツァルトは、このメロディーをもとにピアノの曲を作りました。そして同じメロディーは、アルファベットを覚《おぼ》える「ABCの歌」にも使われています。きらきら星とABCの歌を、心の中で歌ってくらべてみてください。同じ節《ふし》だと気づくはずです。一つのメロディーが、国と言葉をこえて旅をしてきたのです。",
      ],
      photos: [
        {
          src: `${C}/ah-vous-dirai-je.webp`, width: 800, height: 1153,
          alt: "古い紙に手書きされた楽譜《がくふ》と、その下に書かれたフランス語の歌詞《かし》",
          caption: "1770〜1790年ごろのフランスで、手書きでまとめられた歌の本の1ページ。上の楽譜《がくふ》の歌「Ah! vous dirai-je, maman」は、きらきら星と同じメロディーです。",
          credit: { author: "作者不明", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Ah!_vous_dirai-je_maman.jpg" },
        },
      ],
      figure: {
        type: "compare",
        title: "What の後ろをかえてたずねる",
        columns: [{ title: "たずね方", tone: "blue" }, { title: "答え方（例《れい》）", tone: "yellow" }],
        rows: [
          { label: "スポーツ", cells: ["What sport …?", "I like tennis."] },
          { label: "食べ物", cells: ["What food …?", "I like pizza."] },
          { label: "動物", cells: ["What animal …?", "I like rabbits."] },
          { label: "色", cells: ["What color …?", "I like blue."] },
        ],
        note: "「…」の所は、どれも do you like? が入る。",
      },
      cliff: "このメロディーに英語《えいご》の言葉をつけたのは、イギリスの若《わか》い女の人でした。",
    },
    {
      heading: "会話はキャッチボール",
      body: "自分の好《す》きを言ったら、こんどは{{相手にもたずね返し}}ましょう。相手の答えをよく聞いて、Me, too.（わたしも）や Nice. と{{返事}}をすると、ボールが行ったり来たりするように会話が続《つづ》きます。",
      reading: [
        "会話は、キャッチボールににています。I like apples. と自分の好《す》きを投げたら、Do you like apples? と相手にもボールを投げます。相手が Yes, I do. と返してくれたら、Me, too!（わたしも！）。ボールが行ったり来たりするうちに、おたがいのことが分かっていきます。",
        "「きらきら星」の英語《えいご》の詞《し》を書いたのは、イギリスのジェーン・テイラーという女の人です。1806年、姉のアンといっしょに、子どものための詩の本『子ども部屋のための詩』を出しました。その中の「The Star（星）」という詩が、のちにフランスのメロディーと組み合わされ、世界中で歌われるようになりました。",
        "一番を声に出して読んでみましょう。2行目は How I wonder what you are!「あなたはいったい何なのかな」。よく見ると、ここにも I と you がいます。子どもが夜空を見上げて、星に「あなた」と話しかけているのです。好《す》きなものに話しかけたくなる気持ちは、200年前の子どもも、今のみなさんも同じです。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "Twinkle, twinkle, little star,\nHow I wonder what you are!\nUp above the world so high,\nLike a diamond in the sky.",
        ja: "きらきら、きらきら、小さな星。\nあなたはいったい何なのかな！\n世界のずっと上の、高い所で、\n空に光るダイヤモンドみたい。",
        cite: "Jane Taylor, \"The Star\" (Rhymes for the Nursery, 1806)",
        source: "https://archive.org/details/rhymesfornurser00taylgoog",
      }],
      photos: [
        {
          src: `${C}/taylor-family.webp`, width: 800, height: 1047,
          alt: "花のさく庭で、白いドレスにピンクの帯《おび》をした2人の女の子が手をつないで立っている油絵《あぶらえ》",
          caption: "画家の父アイザック・テイラーがえがいた、テイラー家の姉妹《しまい》の絵。手をつなぐ2人は、のちに子どもの詩を書く姉アンと妹ジェーンだといわれます。",
          credit: { author: "Isaac Taylor", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:The_Taylor_Family_(Martin_Taylor;_Ann_Taylor;_Jefferys_Taylor;_Isaac_Taylor;_Isaac_Taylor;_Jane_Taylor;_Ann_Taylor)_by_Isaac_Taylor.jpg" },
        },
        {
          src: `${C}/song-stories-1896.webp`, width: 800, height: 1102,
          alt: "TWINKLE, TWINKLE, LITTLE STAR. という題と、ピアノつきの楽譜《がくふ》。音符《おんぷ》の下に英語《えいご》の歌詞《かし》が3番まで書いてある",
          caption: "1896年にアメリカで出た、幼稚園《ようちえん》の歌の本の「きらきら星」。左上に作者 JANE TAYLOR（ジェーン・テイラー）の名前があります。",
          credit: { author: "Mildred J. Hill", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Song-stories-for-the-kindergarten_1896_twinkle-twinkle-little-star_sheet-music.gif" },
        },
      ],
      reveal: "英語《えいご》は「だれが → どうする → 何を」の順番《じゅんばん》で話す言葉で、文の頭に{{「だれが」}}を置《お》くのがきまりです。だから自分の好《す》きは I like 〜.、相手の好《す》きは Do you like 〜? と、{{I と you}}で「わたし」と「あなた」をはっきり分けます。星に話しかける「きらきら星」にも、I と you がちゃんと入っていました。I を言うのは、「これは、わたしの気持ちです」と相手にまっすぐ手わたすためなのです。",
      figure: {
        type: "cycle",
        title: "好《す》きなものの会話の進み方",
        center: "聞く・話す",
        steps: [
          { label: "自分の好《す》きを言う", sub: "I like apples.", tone: "yellow" },
          { label: "相手にたずねる", sub: "Do you like apples?", tone: "blue" },
          { label: "答えを聞く", sub: "Yes, I do." },
          { label: "返事をする", sub: "Me, too!", tone: "red" },
        ],
      },
    },
  ],
  story: {
    kind: "novel",
    title: "星の歌で、友だちになった日",
    paragraphs: [
      "九月のある朝、四年二組に、イギリスから転校生が来ました。金色のかみの女の子、エマです。先生がしょうかいすると、エマは小さな声で「Hello.」とだけ言って、すぐ下を向いてしまいました。",
      "休み時間。となりの席《せき》のひなたは、むねがどきどきしていました。話しかけたい。でも、英語《えいご》はほとんど知りません。そのとき、エマの筆箱についている、黄色い星のキーホルダーが目に入りました。",
      "ひなたは、外国語の時間に習ったばかりの言葉を、思い切って口にしました。「I like stars.」エマが顔を上げました。青い目がまるくなります。「Me, too!」",
      "ひなたはうれしくなって、続《つづ》けました。「Do you like……dogs?」「Yes, I do!」エマはノートを開くと、耳の長い茶色の犬の絵を、さらさらとかきました。そして絵を指さして言いました。「My dog. I like dogs. Do you like cats?」「No, I don't.」ひなたは首を横にふってから、あわてて言いたしました。「I like……rabbits!」",
      "エマがくすくすわらいました。ひなたもわらいました。言葉は少ししか分からないのに、{{キャッチボール}}みたいに、話がぽんぽん行ったり来たりします。",
      "そのとき、エマが星のキーホルダーをつまんで、小さな声で歌いはじめました。「Twinkle, twinkle, little star……」ひなたは、はっとしました。知っているメロディーです。「きらきら星だ！」ひなたが日本語で歌うと、エマは目をかがやかせて、英語《えいご》の歌を重ねてきました。ちがう言葉なのに、メロディーはぴったり同じです。",
      "歌い終わると、エマがたどたどしい日本語で言いました。「How I wonder what you are. ……星に、話しかける歌。」「星に？」「そう。I と、you。」ひなたは、なるほどと思いました。星にまで「あなた」と話しかけるなんて、英語《えいご》って、なんだかすてきです。",
      "帰りの会のあと、ひなたはもう一度、勇気《ゆうき》を出しました。「Emma, do you like……me?」少しはずかしい質問《しつもん》です。エマは、にっとわらって答えました。「Yes, I do! I like you, Hinata.」",
      "帰り道の空には、一番星が光っていました。ひなたは、心の中でそっと言いました。I like stars. それから、I like Emma.",
    ],
    sayFix: {
      "四年二組": "よねんにくみ",
      "一番星": "いちばんぼし",
      "Hello.": "ハロー。",
      "I like stars.": "アイ・ライク・スターズ。",
      "Me, too!": "ミー・トゥー！",
      "Do you like……dogs?": "ドゥー・ユー・ライク……ドッグズ？",
      "Yes, I do!": "イエス・アイ・ドゥー！",
      "My dog. I like dogs. Do you like cats?": "マイ・ドッグ。アイ・ライク・ドッグズ。ドゥー・ユー・ライク・キャッツ？",
      "No, I don't.": "ノー・アイ・ドント。",
      "I like……rabbits!": "アイ・ライク……ラビッツ！",
      "Twinkle, twinkle, little star……": "トゥインクル・トゥインクル・リトル・スター……",
      "How I wonder what you are.": "ハウ・アイ・ワンダー・ワット・ユー・アー。",
      "I と、you。": "アイと、ユー。",
      "Emma, do you like……me?": "エマ、ドゥー・ユー・ライク……ミー？",
      "I like you, Hinata.": "アイ・ライク・ユー、ひなた。",
      "I like Emma.": "アイ・ライク・エマ。",
    },
    note: "ひなたとエマは架空《かくう》の人物で、お話はすべて創作《そうさく》です。「きらきら星」の英語《えいご》の詞《し》がジェーン・テイラーの詩「The Star」（1806年）であることと、メロディーが1700年代のフランスの歌から来ていることは事実です。",
  },
  mistakes: [
    { wrong: "I am soccer.（サッカーが好《す》き、のつもり）", right: "I like soccer.", why: "「好《す》き」を表すのは like です。I am soccer. では「わたしはサッカーです」になってしまいます。" },
    { wrong: "Do you like dogs? — Yes, I like.", right: "Yes, I do.", why: "Do you 〜? とたずねられたら、do を使って Yes, I do. と答えます。" },
    { wrong: "What sport do you like? — Yes, I do.", right: "I like baseball.", why: "「何のスポーツ？」と聞かれているので、スポーツの名前で答えます。" },
  ],
  check: [
    { q: "「わたしはねこが好《す》きです」を英語《えいご》で言うと？", a: "I like cats.", why: "I like の後ろに cats を入れます。数えられる物なので s がつきます。" },
    { q: "Do you like milk? に「いいえ」と答えると？", a: "No, I don't.", why: "Do you 〜? への「いいえ」は No, I don't. です。" },
    { q: "「何の動物が好《す》き？」とたずねると？", a: "What animal do you like?", why: "What の後ろに animal（動物）を入れます。" },
  ],
  next: [
    { label: "カードとドリル「好《す》きなものを伝《つた》える」", href: "/learn/eigo-sho/e-english-34-suki" },
    { label: "図解《ずかい》レクチャー「色・形の言い方」", href: "/learn/lecture/e-english-34-iro-katachi" },
    { label: "関連《かんれん》する単元《たんげん》「ほしいものを伝《つた》える」", href: "/learn/eigo-sho/e-english-34-hoshii" },
  ],
};
