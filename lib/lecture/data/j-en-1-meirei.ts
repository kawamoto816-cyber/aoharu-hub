import type { Lecture } from "../types";

const C = "/media/commons/j-en-1-meirei";

export const J_EN_1_MEIREI: Lecture = {
  unit: "j-en-1-meirei",
  title: "命令文は動詞の原形から。禁止は Don't、さそうときは Let's",
  hook: "先生の Stand up. や Open your textbooks.、図書館の Don't run. の張り紙。相手に何かをしてもらう・やめてもらう・いっしょにしようとさそう言い方は、毎日の会話にたくさん出てきます。形はとても短いので、作り方のルールさえつかめばすぐに使えます。",
  mystery: "1865年、4年続いた南北戦争の終わりが見えてきたころ、リンカーン大統領は2度目の就任演説を let us strive on（努力し続けよう）ということばで結びました。国でいちばん大きな権限をもつ人が、なぜ「〜しなさい」という命令文ではなく、「〜しよう」を選んだのでしょう？",
  mission: {
    from: "町の国際交流センターの職員",
    request: "来月、留学生と地元の中学生がいっしょに川をそうじするイベントを開きます。英語のポスターに Clean the river. と書いたら、留学生に「ちょっとえらそうに聞こえるかも」と言われてしまいました。みんなが参加したくなる呼びかけ方を決めるために、名探偵のあなたに、歴史に残る名演説の「〜しよう」の秘密を解いてほしいのです。",
    thanks: "命令文は相手だけに向けたことば、Let's は自分もふくめた「わたしたち」のことばだったのですね。ポスターは Let's clean our river together! にします。わたしたちも、いっしょにごみ袋を持って川に入ります。",
  },
  sections: [
    {
      heading: "命令文は主語をとって、動詞の原形で始める",
      body: "「〜しなさい」は、目の前の相手（you）に言うので、{{主語を省いて}}文を始めます。文の最初に来るのは{{動詞の原形}}です。主語が you の文から you をとると命令文になる、と考えるとわかりやすいでしょう。",
      reading: [
        "You open the window.（あなたは窓を開ける）から you をとると、Open the window.（窓を開けなさい）になります。命令はいつも目の前の相手に言うので、「だれが」を言わなくても伝わるのです。主語がないので、動詞に s はつかず、いつも{{動詞の原形}}です。相手の名前を言いたいときは、Ken, open the window.（ケン、窓を開けて）のように、名前のあとにコンマを打って呼びかけます。ていねいにしたいときは、{{Please}} open the window. か Open the window, please. とします。",
        "命令文は、最初の1語で「何をしてほしいか」がすぐに伝わる、短くて力強い形です。その力をみごとに使ったのが、イギリスの劇作家{{シェイクスピア}}が1599年ごろに書いた劇『ジュリアス・シーザー』です。古代ローマで、権力者シーザーが暗殺されたあと、広場には興奮した市民が集まっていました。シーザーの部下だったアントニーは、ざわめく群衆の前に立つと、まず3つの呼びかけを重ね、lend（貸す）の原形で始まる命令文で語りかけます。Friends, Romans, countrymen, lend me your ears.（友よ、ローマ人よ、同胞よ、耳を貸してくれ）。",
        "「耳を貸して」は「わたしの話を聞いて」ということです。さわがしい広場では、長い前置きより、命令文の短いひと言のほうが人の注意をつかみます。この一行はいまも英語圏で、おどけて注目を集めるときに使われるほどです。命令文は、子どもの遊び歌にもあふれています。手をたたき合う遊び歌「パタケーキ」では、パン屋さんに Pat it（たたいて）、prick it（穴をあけて）、mark it with T（Tの字をつけて）と、原形で始まる命令が次々に並びます。",
      ],
      figure: {
        type: "formula",
        title: "ふつうの文から命令文を作る",
        prose: true,
        steps: [
          { expr: "You open the window.", note: "ふつうの文：あなたは窓を開ける" },
          { expr: "{{Open}} the window.", note: "命令文：you をとって原形で始める" },
          { expr: "{{Please}} open the window.", note: "ていねい：Please を前に" },
          { expr: "Open the window{{, please}}.", note: "後ろに , please でもよい" },
        ],
      },
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "Friends, Romans, countrymen, lend me your ears;\nI come to bury Caesar, not to praise him.",
        ja: "友よ、ローマの人々よ、同胞たちよ、耳を貸してくれ。\nわたしはシーザーをほうむりに来たのだ、ほめたたえるためではない。",
        cite: "William Shakespeare, Julius Caesar, Act 3, Scene 2 (1599)",
        source: "https://www.gutenberg.org/ebooks/1522",
      }],
      photos: [
        {
          src: `${C}/patacake.webp`, width: 385, height: 504,
          alt: "コック帽のパン屋が長いへらでパイを運ぶ絵と、Pat-a-cake で始まる英語の歌詞が書かれたページ",
          caption: "デンスロウの絵本『マザーグース』（1901年）の「パタケーキ」。Pat it, and prick it, and mark it with T と、{{動詞の原形}}で始まる命令が歌になっている。",
          credit: { author: "W. W. Denslow", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Pat-a-cake,_pat-a-cake,_baker%27s_man_1_-_WW_Denslow_-_Project_Gutenberg_etext_18546.jpg" },
        },
      ],
      cliff: "では、quiet（静かな）のような「動詞ではない語」で命令するときは、どうするのでしょう？",
    },
    {
      heading: "be動詞の命令文は Be で始める",
      body: "quiet（静かな）や careful（注意深い）は形容詞なので、命令文にするときは be動詞が必要です。am・are・is の原形は{{be}}なので、「静かにしなさい」は{{Be quiet.}}になります。You are quiet. の you をとり、are を原形の be にかえた形です。",
      reading: [
        "quiet（静かな）、careful（注意深い）、kind（親切な）は、ようすを表す{{形容詞}}です。形容詞だけでは文の最初に置けないので、命令文にするときは be動詞の力を借ります。You are quiet.（あなたは静かだ）から you をとり、are を原形の{{be}}にかえると、Be quiet.（静かにしなさい）。am・are・is はどれも原形が be なので、命令文では必ず Be で始まります。Be careful.（気をつけて）、Be kind to your friends.（友だちに親切にしなさい）のように、注意や心がまえを伝えるときによく使います。",
        "Be で始まる命令文が、物語を大きく動かす名場面があります。シェイクスピアが1601年ごろに書いた喜劇『十二夜』です。伯爵家の令嬢オリヴィアに仕える執事マルヴォーリオは、まじめすぎて威張ってばかりいるため、屋敷の人たちにきらわれていました。そこで侍女のマライアが、お嬢さまの筆跡をまねた、にせの恋文を道に落としておきます。手紙を拾ったマルヴォーリオは、自分あてだと思いこんで読み上げます。そこには、be not afraid of greatness（偉大さをおそれるな）と書かれていました。",
        "be not afraid は、いまの英語なら{{Don't be afraid}}（おそれるな）です。シェイクスピアの時代は、動詞のすぐあとに not を置いて禁止を表すことができました。手紙はさらに、親せきにはさからえ、召使いにはそっけなくせよ、わたしの前ではいつもほほえめ、と命令を重ね、黄色い靴下とひもを十字に結んだ姿をほめた人を思い出せ、と書きます。すっかりその気になったマルヴォーリオは、黄色い靴下に十字のひもという奇妙なかっこうで、にやにや笑いながらお嬢さまの前に現れ、大笑いを生みます。手紙の命令文が、人をまるごと動かしてしまったのです。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "If this fall into thy hand, revolve. In my stars I am above thee, but be not afraid of greatness. Some are born great, some achieve greatness, and some have greatness thrust upon ’em.",
        ja: "もしこの手紙が君の手にわたったら、よく考えよ。運命の星のめぐりでは、わたしは君より上にいる。だが、偉大さをおそれるな。生まれながらに偉大な者もいれば、努力して偉大さを手にする者もいる。そして、偉大さを押しつけられる者もいるのだ。",
        cite: "William Shakespeare, Twelfth Night, Act 2, Scene 5 (c. 1601)",
        source: "https://www.gutenberg.org/ebooks/1526",
      }],
      photos: [
        {
          src: `${C}/malvolio.webp`, width: 800, height: 516,
          alt: "庭園で、黄色い靴下に十字のひもを結んだ男が胸をはって歩き、左で男たちと娘がそのようすを見て笑いをこらえている絵",
          caption: "ギルバート「十字ひもで登場するマルヴォーリオ」（19世紀）。右がマルヴォーリオ。にせの手紙の{{命令文}}を信じこみ、黄色い靴下にひもを十字に結んで現れた場面。",
          credit: { author: "John Gilbert", license: "CC0", licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en", source: "https://commons.wikimedia.org/wiki/File:John_Gilbert_-_Enter_Malvolio,_Crossgartered_-_B1976.1.52_-_Yale_Center_for_British_Art.jpg" },
        },
      ],
      cliff: "be not afraid が、なぜいまは Don't be afraid になったのでしょう？",
    },
    {
      heading: "命令・禁止・さそいの3つの形",
      body: "「〜してはいけない」という{{禁止}}は、命令文の前に{{Don't}}を置きます。be動詞の文でも Don't be 〜 です。「〜しよう」と{{さそう}}ときは、{{Let's}}＋動詞の原形で始めます。どれも動詞は原形のままです。",
      reading: [
        "「〜してはいけない」という{{禁止}}は、命令文の前に{{Don't}}（do not を短くした形）を置きます。Don't run in the hallway.（廊下を走ってはいけません）、Don't touch.（さわらないで）。be動詞の命令文も同じで、Don't be late.（遅れないで）、Don't be shy.（はずかしがらないで）となります。ていねいにするなら Please don't 〜. です。",
        "シェイクスピアや、1611年に出た英訳聖書の時代には、Fear not.（おそれるな）や Judge not.（人をさばくな）のように、動詞のあとに not を置く禁止がふつうでした。その後、否定の文には do を使うしくみが広まり、だんだん {{Don't fear.}} や Don't judge. の形に落ち着いていきます。be not afraid が Don't be afraid になったのも、この大きな変化の一部です。1988年にボビー・マクファーリンが発表した歌 Don't Worry, Be Happy（くよくよしないで、ごきげんでいよう）は、題名の中に禁止と Be の命令文が並んでいます。声だけで録音したこの曲は、全米チャートの1位になりました。",
        "「〜しよう」と相手を{{さそう}}ときは、{{Let's}}＋動詞の原形です。Let's play tennis.（テニスをしよう）、Let's go home.（家に帰ろう）。Let's は {{Let us}} を短くした形で、let は「〜させる」という動詞です。つまり Let's 〜 は、もとは「わたしたちに〜させて」という命令文でした。1970年に発表されたビートルズの曲 Let It Be は、題名が「それをそのままにさせておこう」という let の命令文で、「あるがままに」という意味で世界中に知られています。",
      ],
      figure: {
        type: "compare",
        title: "文の最初の語で意味が決まる",
        columns: [{ title: "命令", tone: "blue" }, { title: "禁止", tone: "red" }, { title: "さそい", tone: "yellow" }],
        rows: [
          { cells: ["〜しなさい", "〜してはいけない", "〜しよう"] },
          { cells: ["動詞の原形 〜.", "Don't＋原形 〜.", "Let's＋原形 〜."] },
          { cells: ["Wash your hands.", "Don't run here.", "Let's play tennis."] },
          { cells: ["Be careful.", "Don't be late.", "Let's go home."] },
        ],
      },
      cliff: "命令や「〜しよう」と言われたら、英語ではどう返せばいいのでしょう？",
    },
    {
      heading: "言われたときの返し方",
      body: "命令文や Please 〜. には{{OK.}}や{{All right.}}（わかりました）と返します。Let's 〜. にさんせいするときは{{Yes, let's.}}、ことわるときは{{No, let's not.}}や Sorry, I can't. です。Yes, I do. のように do で答えないように注意しましょう。",
      reading: [
        "命令文やお願いは質問ではないので、Yes, I do. のような答え方はしません。Please close the door.（ドアを閉めてください）と言われたら、{{OK.}}、{{All right.}}（わかりました）、Sure.（もちろん）と返して、すぐに動けば十分です。",
        "Let's 〜. と{{さそわれた}}ときは、Let's の形をそのまま使って返します。さんせいなら{{Yes, let's.}}（うん、そうしよう）、反対なら{{No, let's not.}}（いや、やめておこう）。都合が悪くて参加できないときは、Sorry, I can't. I have to do my homework.（ごめん、できないんだ。宿題をしなくちゃ）のように、理由を1つ足すとやわらかく伝わります。",
      ],
      figure: {
        type: "tree",
        title: "言われた文から返し方を選ぶ",
        root: {
          label: "言われた文",
          children: [
            {
              label: "命令・お願い",
              sub: "Open 〜. / Please 〜.",
              tone: "blue",
              children: [{ label: "OK.", sub: "All right. / Sure." }],
            },
            {
              label: "さそい",
              sub: "Let's 〜.",
              tone: "yellow",
              children: [
                { label: "Yes, let's.", sub: "さんせい" },
                { label: "No, let's not.", sub: "Sorry, I can't. も" },
              ],
            },
          ],
        },
      },
      cliff: "この「わたしたち」の Let us が、アメリカの歴史を変えた演説の結びになりました。",
    },
    {
      heading: "Let us ―― 大統領が選んだ「〜しよう」",
      body: "Let's のもとの形 {{Let us}} は、演説などのあらたまった場面で今も使われます。命令文が相手（you）だけに向けたことばなのに対し、Let us は{{話す人自身もふくめた}}「わたしたち」への呼びかけです。",
      reading: [
        "1861年、アメリカは北部と南部に分かれて戦う{{南北戦争}}に入りました。奴隷制度をめぐる対立が大きな原因で、4年のあいだに60万人をこえる兵士が命を落としたといわれます。1865年3月4日、戦争の終わりが見えてきたころ、首都ワシントンの議事堂の前で、{{リンカーン}}大統領は2期目の就任演説をしました。長さはわずか700語ほどで、歴代の就任演説の中でもとても短いものです。",
        "勝利が近い側の大統領なら、喜びを語ってもおかしくない場面です。けれどもリンカーンは、北も南も同じ聖書を読み、同じ神に祈っていると語り、but let us judge not, that we be not judged.（しかし、わたしたちはさばくまい。自分がさばかれないために）と続けました。昔の英語の禁止 Judge not（さばくな）を、Let us の形に変えて使っているのです。そして演説の最後の段落で、let us strive on to finish the work we are in, to bind up the nation's wounds（わたしたちが取り組んでいる仕事をやりとげるため、国の傷を包み手当てするため、努力し続けよう）と結びました。",
        "もしこれが命令文の Bind up the nation's wounds.（国の傷を手当てせよ）だったら、話し手は「命じる側」に立ち、聞く人だけに仕事を言いつけることになります。Let us は「わたしたちに〜させよう」なので、話し手の大統領自身も仕事をする側に入ります。演説から41日後、リンカーンは銃撃されて亡くなりました。1922年に完成したワシントンのリンカーン記念堂には、この演説の全文が北の壁に、ゲティスバーグ演説が南の壁にきざまれています。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "us",
        text: "With malice toward none, with charity for all, with firmness in the right as God gives us to see the right, let us strive on to finish the work we are in, to bind up the nation's wounds, to care for him who shall have borne the battle and for his widow and his orphan, to do all which may achieve and cherish a just and lasting peace among ourselves and with all nations.",
        ja: "だれにも悪意をいだかず、すべての人に思いやりをもち、神がわたしたちに正しさを示してくださるかぎりその正しさを固く守り、わたしたちが取り組んでいる仕事をやりとげるために、努力し続けようではありませんか。国の傷を包み手当てし、戦いをになった人と、その妻と子どもたちの世話をし、わたしたちのあいだに、そしてすべての国とのあいだに、正しく長く続く平和を実現し、大切に守るために、できることのすべてをするために。",
        cite: "Abraham Lincoln, Second Inaugural Address (1865)",
        source: "https://avalon.law.yale.edu/19th_century/lincoln2.asp",
      }],
      photos: [
        {
          src: `${C}/inaugural-1865.webp`, width: 800, height: 632,
          alt: "白い柱の大きな建物の前に設けられた演壇と、その上下を埋めつくす帽子姿の大勢の人々。右に星条旗",
          caption: "1865年3月4日、議事堂の東側で行われた2期目の就任式（ガードナー撮影）。中央の小さな机の前に立つのがリンカーン。この場で{{Let us}}の結びが語られた。",
          credit: { author: "Alexander Gardner", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Abraham_Lincoln_giving_his_second_Inaugural_Address_(4_March_1865).jpg" },
        },
        {
          src: `${C}/memorial-north.webp`, width: 800, height: 568,
          alt: "白い大理石の壁いっぱいに、3つの区画に分けて英文がきざまれている記念堂の内部",
          caption: "リンカーン記念堂の北の壁（1991年撮影）。第2次就任演説の全文がきざまれ、右の区画の下のほうに WITH MALICE TOWARD NONE で始まる結びが読める。",
          credit: { author: "Jet Lowe（HABS）", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Interior_north_wall_(Second_Inaugural_Address)._4_June_1991._-_Lincoln_Memorial,_West_Potomac_Park,_Washington,_District_of_Columbia,_DC_HABS_DC,WASH,462-39.tif" },
        },
      ],
      reveal: "命令文は目の前の相手（you）に向けたことばで、話す人は「命じる側」に立ちます。ところが Let's のもとの形 {{Let us}} は「わたしたちに〜させよう」で、話す人自身も仕事をする側に入ります。戦いのあと、北も南もいっしょに国の傷を手当てしなければならないとき、リンカーンは自分もふくめた「わたしたち」に呼びかける形を選んだのです。",
    },
  ],
  story: {
    kind: "novel",
    title: "活字の中の let us",
    paragraphs: [
      "1865年3月4日の朝、ワシントンの通りは、夜まで降り続いた雨でひどいぬかるみだった。十四歳のジェイコブは、印刷所の親方に言いつけられて議事堂へ走った。「大統領の言葉を、ひとつでも多く聞いてこい。あしたの新聞を、町じゅうが待っているんだ」。となりには兄のウィルがいた。去年の夏、南の戦場で左腕をなくして帰ってきた兄は、からっぽの袖をコートのポケットにおしこんでいた。",
      "議事堂の前は、人で埋まっていた。シルクハットの紳士、婦人たちの傘、松葉づえの兵士、行進してきた黒人の兵士たち。完成に近づいた白い丸屋根を見上げてから、ジェイコブは前の人たちの背中のすきまに、演壇の背の高い人影をさがした。",
      "大統領が立ち上がり、紙を広げた。そのとき、雲の切れ間から日がさした。ジェイコブは帳面と鉛筆をにぎりしめた。けれど、話は思っていたものとちがった。勝ったぞ、とは言わない。南をこらしめろ、とも言わない。北も南も、同じ聖書を読み、同じ神に祈っている、と大統領は静かに語った。そして、「{{but let us judge not, that we be not judged.}}」",
      "人をさばくな。教会で何度も聞いたことばだ。でも大統領は、「さばくな」と命じたのではなかった。let us――わたしたちは、と言ったのだ。ジェイコブは帳面のすみに、小さく「let us」と書いた。",
      "最後の段落になると、大統領の声は少しゆっくりになった。「{{With malice toward none, with charity for all,}}」だれにも悪意をいだかず、すべての人に思いやりを。続いて、「{{let us strive on to finish the work we are in, to bind up the nation's wounds,}}」国の傷を包み、手当てしよう。戦いをになった人と、その妻と子どもたちの世話をしよう。ジェイコブがふと横を見ると、ウィルが、からっぽの袖のあたりを、残った右手でそっとおさえていた。",
      "演説は、あっけないほど早く終わった。帰り道、ぬかるみをよけながら、ウィルがぽつりと言った。「命令されたんじゃないんだな。あの人も、いっしょにやるって言ったんだ」。ジェイコブはうなずいて帳面をめくった。let us が、二つあった。",
      "その夜、ランプの下の印刷所で、ジェイコブは活字をひとつずつ拾った。L、e、t、空白、u、s。たった五つの文字が、壇上の大統領を、ぬかるみに立っていた自分たちと同じ側に立たせていた。インクのにおいの中で、ジェイコブは、いつかこの新聞を読むかもしれない南の町の子どものことを、はじめて思った。",
    ],
    note: "ジェイコブと兄のウィル、その会話と心情は創作です。1865年3月4日に議事堂の前でリンカーンの2期目の就任式が行われたこと、前日までの雨で地面がぬかるんでいたこと、黒人の兵士が式の行進に加わったこと、演説の内容（北も南も同じ聖書を読み同じ神に祈ること、結びの let us strive on など）は史実にもとづいています。演説が始まるころに日がさしたことは、その場にいた人々の記録によります。作中の英文は演説の実際のことばで、それ以外にリンカーンのせりふはつくっていません。",
  },
  mistakes: [
    { wrong: "Please opens the window.", right: "Please open the window.", why: "命令文の動詞はいつも原形。主語がないので s はつきません。" },
    { wrong: "Are quiet.", right: "Be quiet.", why: "be動詞の命令文は原形の Be で始めます。am・are・is は使いません。" },
    { wrong: "Not run here.", right: "Don't run here.", why: "禁止の命令文は Don't で始めます。not だけでは文になりません。" },
    { wrong: "Let's playing soccer.", right: "Let's play soccer.", why: "Let's のあとも動詞は原形です。" },
  ],
  check: [
    { q: "You are kind to old people. を「〜しなさい」の命令文に。", a: "Be kind to old people.", why: "you をとり、are を原形の be にかえる。" },
    { q: "「ここで写真をとってはいけません。」（take pictures を使って）", a: "Don't take pictures here.", why: "禁止は Don't＋動詞の原形。" },
    { q: "Let's go to the park. にさんせいするときの答えは？", a: "Yes, let's.", why: "Let's 〜. には Yes, let's. / No, let's not. で答える。" },
  ],
  next: [
    { label: "4択ドリル「命令文」に挑戦", href: "/learn/eibunpo-chu/j-en-1-meirei" },
    { label: "復習「be動詞」のレクチャー", href: "/learn/lecture/j-en-1-be" },
    { label: "つぎに「助動詞 can」", href: "/learn/eibunpo-chu/j-en-1-can" },
  ],
};
