import type { Lecture } from "../types";

const C = "/media/commons/j-en-3-kansetsu";

export const J_EN_3_KANSETSU: Lecture = {
  unit: "j-en-3-kansetsu",
  title: "間接疑問文は、疑問詞のあとを「主語＋動詞」のふつうの語順に",
  hook: "道を聞くとき、Where is the station? よりも Do you know where the station is? のほうがていねいに聞こえます。このように、疑問文を{{文の一部}}として入れたものが間接疑問文です。会話でも長文でもよく出るので、語順のルールを1つ押さえましょう。",
  mystery: "名探偵ホームズに身の回りのことを言い当てられたワトスンは、I can’t imagine how you deduce it. と、ピリオドで終わる文を言っただけ。なのにホームズは、質問されたかのように種明かしを始めます。この文のどこが「質問」なのでしょう？　そして How do you deduce it? の do は、どこへ消えたのでしょう？",
  mission: {
    from: "ラジオドラマの演出家",
    request: "中学生向けのラジオドラマ『名探偵ホームズ』で、英語の原文のせりふを少しだけ入れることにしました。ところが、ワトスン役の声優の卵に「このせりふ、?がないのに質問みたい。問いつめる声で読むの？　ふつうの文として読むの？」と聞かれ、答えられませんでした。演技の方向を決めるために、名探偵のあなたに、このせりふのなぞを解いてほしいのです。",
    thanks: "質問を文の部品にして、そっと差し出す言い方だったのですね。これでワトスンのせりふは、問いつめる声ではなく「降参だ、説明してくれ」と相手の答えを待つ声で演じられます。",
  },
  sections: [
    {
      heading: "疑問文が文の中に入ると語順が変わる",
      body: "Where does he live? を I know のうしろに入れると、I know {{where he lives}}. になります。疑問詞のあとが{{主語＋動詞}}のふつうの語順にもどるのがポイントです。疑問詞から文の終わりまでが「どこに住んでいるか」という{{名詞のかたまり}}になり、know の目的語になっています。",
      reading: [
        "疑問文を、ほかの文の一部として入れたものを{{間接疑問文}}といいます。Where does he live?（彼はどこに住んでいますか）を I know のあとに入れると、I know where he lives.（彼がどこに住んでいるか、私は知っている）。where he lives は「どこに住んでいるか」という{{名詞のかたまり}}で、know の目的語です。日本語でも「どこに住んでいますか」が「どこに住んでいるかを知っている」と、文の部品に変わりますね。",
        "この形がとてもよく出てくるのが、イギリスの作家{{コナン・ドイル}}の名探偵シャーロック・ホームズの物語です。ドイルはエディンバラ大学で医学を学んだ医師で、患者を見ただけで職業や出身を言い当てた恩師ジョゼフ・ベルの観察力をヒントに、ホームズを生み出したといわれます。1891年、ロンドンの月刊誌『ストランド・マガジン』に短編「ボヘミアの醜聞」が載ると、ホームズは一気に国じゅうの人気者になりました。",
        "その冒頭、結婚して久しぶりにベーカー街の下宿をたずねたワトスン医師に、ホームズは「最近ずいぶんずぶぬれになったね。それに、とても不器用で不注意なお手伝いさんがいるね」と言い当てます。おどろいたワトスンの返事が下の一節です。I can’t imagine how you deduce it.（きみがどうやってそれを推理するのか、見当もつかない）。How do you deduce it? という疑問文が、imagine の目的語として文の中に入っています。I fail to see how you work it out.（どうやって答えを出すのかわからない）も同じ形です。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "“My dear Holmes,” said I, “this is too much. You would certainly have been burned, had you lived a few centuries ago. It is true that I had a country walk on Thursday and came home in a dreadful mess, but as I have changed my clothes I can’t imagine how you deduce it. As to Mary Jane, she is incorrigible, and my wife has given her notice, but there, again, I fail to see how you work it out.”",
        ja: "「ホームズ、いくらなんでもやりすぎだ」とわたしは言った。「何百年か前に生まれていたら、きみはまちがいなく火あぶりにされていたよ。たしかに木曜日にいなかを歩いて、ひどいどろだらけで帰ってきた。でも服は着がえたんだから、きみがどうやってそれを推理するのか、見当もつかない。メアリー・ジェーンについては、あの子はどうにも直らなくて、妻がひまを出したところだ。でも、これもまた、きみがどうやって見ぬいたのか、わからないよ」",
        cite: "Arthur Conan Doyle, \"A Scandal in Bohemia\" (The Adventures of Sherlock Holmes, 1891)",
        source: "https://www.gutenberg.org/cache/epub/1661/pg1661.txt",
      }],
      photos: [
        {
          src: `${C}/scandal-fire.webp`, width: 800, height: 1166,
          alt: "暖炉の前に立つやせた男性が、ひじかけいすにすわる口ひげの男性を見下ろしている白黒の挿絵",
          caption: "パジェットの挿絵（『ストランド・マガジン』1891年7月号「ボヘミアの醜聞」）。暖炉の前に立つホームズ（右）がワトスンを観察する場面。このあとワトスンは I can’t imagine how you deduce it. と言う。",
          credit: { author: "Sidney Paget", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:A_Scandal_in_Bohemia-01.jpg" },
        },
      ],
      figure: {
        type: "formula",
        title: "Where does he live? を I know に入れる",
        prose: true,
        steps: [
          { label: "疑問文", expr: "Where {{does}} he {{live}}?", note: "疑問文の語順" },
          { label: "つなぐ", expr: "I know where he {{live}}", note: "does を取る" },
          { label: "完成", expr: "I know where he {{lives}}.", note: "3単現の s をもどす" },
        ],
      },
      cliff: "では、How do you deduce it? の do は、いったいどこへ消えたのでしょう？",
    },
    {
      heading: "do・does・did は消え、動詞の形にもどる",
      body: "be動詞の疑問文は、be動詞を主語のうしろにもどします。一般動詞の疑問文では {{do・does・did が消え}}、その代わりに動詞の形で{{時（現在・過去）や3単現}}を表します。can・will などの助動詞は、主語のうしろにもどすだけです。",
      reading: [
        "一般動詞の疑問文につく do・does・did は、「今から質問しますよ」と知らせる合図のような語です。間接疑問は文の部品なので、この合図はいりません。だから {{do・does・did は消え}}、時（現在・過去）や3単現の s は動詞そのものが引きつぎます。What did she buy? → I know what she bought.（彼女が何を買ったか知っている）。did がもっていた「過去」が bought に移ったのです。be動詞は主語のうしろへ（what this is）、can・will などの助動詞も主語のうしろにもどるだけで、消えません。",
        "「ボヘミアの醜聞」で、ホームズはボヘミア国王から、かつての恋人アイリーン・アドラーが持つ写真を取りもどしてほしいと頼まれます。翌朝、ホームズは仕事をなくした馬丁（馬の世話係）に変装して出かけ、午後に帰ってくると、いすの上で笑いころげながら言います。I am sure you could never guess how I employed my morning, or what I ended by doing.（ぼくが午前中をどう使ったか、最後に何をするはめになったか、きみには絶対に当てられないよ）。",
        "もとの疑問文は How did I employ my morning? と What did I end by doing? です。間接疑問の中では did が消え、employ が employed、end が ended と過去形になっています。1つの guess のあとに how と what の2つの間接疑問がならび、読む人も「何があったの？」と身を乗り出します。ワトスンの I can’t imagine.（見当もつかない）は、imagine のあとの間接疑問を言わずにすませた形です。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "“It’s quite too funny. I am sure you could never guess how I employed my morning, or what I ended by doing.”\n“I can’t imagine. I suppose that you have been watching the habits, and perhaps the house, of Miss Irene Adler.”",
        ja: "「まったく、おかしくてたまらないよ。ぼくが午前中をどう使ったか、そして最後に何をするはめになったか、きみには絶対に当てられないだろうね」\n「見当もつかないね。たぶん、アイリーン・アドラーさんの暮らしぶりと、ひょっとすると家も、見張っていたんだろう」",
        cite: "Arthur Conan Doyle, \"A Scandal in Bohemia\" (The Adventures of Sherlock Holmes, 1891)",
        source: "https://www.gutenberg.org/cache/epub/1661/pg1661.txt",
      }],
      photos: [
        {
          src: `${C}/doyle-1890.webp`, width: 465, height: 540,
          alt: "ツイードの背広を着た口ひげの男性が、いすの背にうでをのせて横向きにすわる古い写真",
          caption: "コナン・ドイル（1890年ごろ）。医師として開業しながら小説を書き、1891年から{{ホームズ}}の短編を『ストランド・マガジン』に連載した。",
          credit: { author: "Herbert Rose Barraud", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Sir_Arthur_Conan_Doyle_1890.jpg" },
        },
      ],
      figure: {
        type: "compare",
        title: "ふつうの疑問文と間接疑問",
        columns: [{ title: "疑問文" }, { title: "間接疑問の部分", tone: "yellow" }],
        rows: [
          { label: "be動詞", cells: ["Who is she?", "who she is"] },
          { label: "一般動詞", cells: ["What does he like?", "what he likes"] },
          { label: "過去", cells: ["When did you come?", "when you came"] },
          { label: "助動詞", cells: ["Where can I buy it?", "where I can buy it"] },
        ],
      },
      cliff: "では、疑問詞そのものが「だれが」「何が」のときは、語順はどうなるのでしょう？",
    },
    {
      heading: "疑問詞が主語のときは語順そのまま",
      body: "Who made this cake? の who は「だれが」で、それ自体が{{主語}}です。主語のあとはもう動詞なので、間接疑問にしても{{語順は変わりません}}。I don't know who made this cake. となります。疑問詞のすぐあとに動詞が来ているかどうかで見分けましょう。",
      reading: [
        "Who made this cake?（だれがこのケーキを作ったの）の who は「だれが」で、それ自体が{{主語}}です。主語のすぐあとに動詞があり、もうふつうの語順になっているので、間接疑問にしても{{語順は変わりません}}。I don't know who made this cake. です。What happened?（何が起きたの）も同じで、Tell me what happened.（何が起きたか教えて）。疑問詞のすぐあとが動詞なら「そのまま」、主語が来ていたら「主語＋動詞に組みかえ」と見分けましょう。",
        "1891年8月号に載った「赤毛組合」は、ホームズ物語の中でもとくに人気の高い一編です。ロンドンで小さな質屋を営む赤毛のジェイベズ・ウィルソンは、店員スポールディングにすすめられ、「赤毛の男性を募集、週4ポンド」という奇妙な新聞広告に応募します。会場の前の通りは、ロンドンじゅうから集まった赤毛の男たちでうめつくされていました。",
        "ウィルソンはそのときの様子をホームズにこう語ります。When I saw how many were waiting（待っている人がどれほど多いかを見たとき）。もとの疑問文は How many were waiting? で、how many（何人が）が主語なので、語順はそのままです。続く How he did it I could not imagine（彼がどうやったのか、見当もつかなかった）は、How did he do it? の合図の did が消え、本来の動詞 do が過去形 did になった形で、強調のために文の先頭に出ています。この頼もしい店員スポールディングの正体は、物語の最後に明かされます。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "When I saw how many were waiting, I would have given it up in despair; but Spaulding would not hear of it. How he did it I could not imagine, but he pushed and pulled and butted until he got me through the crowd, and right up to the steps which led to the office.",
        ja: "待っている人がどれほど多いかを見たとき、わたしはがっかりして、あきらめるところでした。でもスポールディングは、聞き入れようとしないのです。どうやったのかは見当もつきませんが、彼は押したり引いたり頭でかき分けたりして、わたしを人ごみの中から通し、事務所へ続く階段のところまで連れていってくれました。",
        cite: "Arthur Conan Doyle, \"The Red-Headed League\" (The Adventures of Sherlock Holmes, 1891)",
        source: "https://www.gutenberg.org/cache/epub/1661/pg1661.txt",
      }],
      photos: [
        {
          src: `${C}/redh-mean.webp`, width: 800, height: 911,
          alt: "新聞を広げて立つ男性と、いすにくつろぐ若い男性、背を向けてすわる年配の男性をえがいた白黒の挿絵",
          caption: "パジェットの挿絵（「赤毛組合」1891年8月号）。右で新聞広告を読むのがワトスン、中央がホームズ、左が依頼人ウィルソン。原画の題はワトスンの直接の疑問文 What on earth does this mean?（いったいどういう意味だ）。",
          credit: { author: "Sidney Paget", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Redh-02.jpg" },
        },
      ],
      figure: {
        type: "tree",
        title: "疑問詞のあとの語順",
        root: {
          label: "疑問詞のすぐあと",
          children: [
            { label: "主語がある", sub: "where he lives", tone: "blue", children: [{ label: "主語＋動詞の順に" }] },
            { label: "すぐ動詞", sub: "who made it", tone: "yellow", children: [{ label: "疑問詞が主語", sub: "語順そのまま" }] },
          ],
        },
      },
      cliff: "間接疑問の文は、最後を「?」と「.」のどちらで終えるのでしょう？",
    },
    {
      heading: "文の最後の記号は全体で決める",
      body: "文の最後が「?」か「.」かは、{{文全体}}が疑問文かどうかで決まります。Do you know where she lives{{?}} は Do you know で始まる疑問文なので「?」。I don't know where she lives{{.}} はふつうの文なので「.」です。Do you know 〜? には Yes / No で答えます。",
      reading: [
        "文の最後を「?」にするか「.」にするかは、間接疑問の部分ではなく{{文全体}}で決まります。Do you know where she lives? は Do you know 〜 で始まる疑問文なので「?」、I don't know where she lives. はふつうの文なので「.」です。Do you know 〜? にはまず Yes / No で答え、Yes. She lives near the park.（はい。公園の近くに住んでいます）のように中身を続けます。",
        "道で Where is the station? と聞くより、Do you know where the station is? や Could you tell me where the station is? のほうがていねいに聞こえます。答えを直接求めず、「もし知っていたら」と相手に余地を残すからです。I wonder what he is doing now.（彼は今ごろ何をしているのかな）のように、ひとりごとの形で疑問を口にすることもできます。「.」で終わっていても、聞いた人は「答えてあげよう」と感じるのです。",
        "「赤毛組合」の最後、ホームズは、ウィルソンの店の地下から銀行の金庫へトンネルを掘っていた強盗をつかまえます。その場にいた銀行の重役メリーウェザー氏の言葉が下の一節です。I do not know how the bank can thank you or repay you. では、助動詞 can が主語 the bank のうしろにもどっています。ホームズの物語はその後、長編4・短編56の合わせて60編まで書きつがれ、のちの推理小説や映画、日本の推理漫画にまで大きな影響をあたえました。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "“Really, Mr. Holmes,” said Mr. Merryweather as we followed them from the cellar, “I do not know how the bank can thank you or repay you. There is no doubt that you have detected and defeated in the most complete manner one of the most determined attempts at bank robbery that have ever come within my experience.”",
        ja: "「いやはや、ホームズさん」と、地下室から彼らのあとについて上がりながら、メリーウェザー氏は言った。「銀行としてあなたにどうお礼をし、どうお返しをすればよいのか、わかりません。わたしがこれまでに出会った中でもとびきり大胆な銀行強盗のくわだてを、あなたが完ぺきに見やぶり、打ち負かしてくださったのは、まちがいありません」",
        cite: "Arthur Conan Doyle, \"The Red-Headed League\" (The Adventures of Sherlock Holmes, 1891)",
        source: "https://www.gutenberg.org/cache/epub/1661/pg1661.txt",
      }],
      photos: [
        {
          src: `${C}/strand-1891.webp`, width: 800, height: 1173,
          alt: "人と馬車でにぎわう街並みの絵の上に THE STRAND MAGAZINE と大きく書かれた、青みがかった雑誌の表紙",
          caption: "『ストランド・マガジン』1891年7月号の表紙。この号に「ボヘミアの醜聞」が載った。ロンドンのストランド通りをえがいた表紙で、値段は6ペンス。",
          credit: { author: "Special Collections Toronto Public Library", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:The_Strand_Magazine_(cover),_Vol._2,_No._7,_July_1891.jpg" },
        },
      ],
      reveal: "間接疑問は、疑問文を{{名詞のかたまり}}にして文の中に入れたものです。how you deduce it は「どうやって推理するのか（ということ）」で、imagine の目的語。文全体はふつうの文なので、語順は{{主語＋動詞}}にもどり、質問の合図だった do は消え、最後は「.」になります。それでも中身は「知りたいこと」なので、聞いた人は質問として受けとります。ワトスンは問いつめずに「降参だ」と言って、ホームズに説明をうながしたのです。",
    },
  ],
  story: {
    kind: "manga4",
    title: "主語は、すぐそこに",
    panels: [
      {
        scene: "放課後の教室。からっぽのプリンのカップを前に、カイトが虫めがねをかまえる。リンがあきれて見る。",
        lines: [
          { who: "カイト", text: "消えたプリンの謎は" },
          { who: "カイト", text: "名探偵カイトが解く！" },
          { who: "リン", text: "まずは英語で聞きこみね" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "カイト", look: "boy", x: 252, face: "shout", fx: "!", hand: [214, 214] },
            { who: "リン", look: "girl", x: 86, face: "sweat", fx: "sweat" },
          ],
          props: [
            { kind: "table", x: 0, y: 240 },
            { kind: "loupe", x: 200, y: 212, s: 0.9 },
            { kind: "board", x: 140, y: 222, text: "空のカップ" },
          ],
        },
      },
      {
        scene: "リンが札を立てて説明する。カイトが考えこむ。",
        lines: [
          { who: "リン", text: "疑問文を文の中に入れると" },
          { who: "リン", text: "ふつうの語順にもどるの" },
          { who: "カイト", text: "doもdidも消えるのか" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "リン", look: "girl", x: 254, face: "smile", fx: "idea", hand: [214, 214] },
            { who: "カイト", look: "boy", x: 84, face: "think", fx: "?" },
          ],
          props: [
            { kind: "table", x: 0, y: 240 },
            { kind: "board", x: 166, y: 214, text: "主語＋動詞" },
          ],
        },
      },
      {
        scene: "カイトがひらめく。リンが別の札を見せる。",
        lines: [
          { who: "カイト", text: "じゃあ「だれが食べたか」は？" },
          { who: "リン", text: "whoが主語だから" },
          { who: "リン", text: "語順はそのままでいいの" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "カイト", look: "boy", x: 252, face: "think", fx: "idea" },
            { who: "リン", look: "girl", x: 86, face: "smile", hand: [128, 214] },
          ],
          props: [
            { kind: "table", x: 0, y: 240 },
            { kind: "board", x: 150, y: 214, text: "who＝主語" },
          ],
        },
      },
      {
        scene: "通りかかった先生に、カイトが自信まんまんで聞きこみをする。先生は汗をかいている。",
        lines: [
          { who: "カイト", text: "先生、だれが食べたか" },
          { who: "カイト", text: "知ってますか？" },
          { who: "先生", text: "その主語は……私です" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "カイト", look: "boy", x: 252, face: "normal", hand: [214, 210] },
            { who: "先生", look: "teacher", x: 88, face: "sweat", fx: "sweat" },
          ],
          props: [
            { kind: "table", x: 0, y: 244 },
            { kind: "board", x: 166, y: 214, text: "主語＝私" },
          ],
        },
      },
    ],
    note: "カイト・リン・先生は架空の人物で、教室の場面と会話は創作です。本文で引用したホームズ物語の英文は、コナン・ドイル「ボヘミアの醜聞」「赤毛組合」（1891年）の原文にもとづいています。",
  },
  mistakes: [
    { wrong: "I know where does he live.", right: "I know where he lives.", why: "間接疑問では does を使わず、主語＋動詞の語順にして動詞に s をつけます。" },
    { wrong: "Do you know what is this?", right: "Do you know what this is?", why: "be動詞は主語 this のうしろにもどします。" },
    { wrong: "Tell me when did you get up.", right: "Tell me when you got up.", why: "did が消えるので、動詞を過去形 got にして時を表します。" },
  ],
  check: [
    { q: "What does she want? を I don't know に続けると？", a: "I don't know what she wants.", why: "does を取り、主語のあとの動詞に s をつける。" },
    { q: "Who broke the window? を Do you know に続けると？", a: "Do you know who broke the window?", why: "who が主語なので語順はそのまま。" },
    { q: "Where is the station? を Do you know に続けると？", a: "Do you know where the station is?", why: "be動詞 is を主語 the station のうしろへ。" },
  ],
  next: [
    { label: "4択ドリル「間接疑問文」に挑戦", href: "/learn/eibunpo-chu/j-en-3-kansetsu" },
    { label: "疑問詞の確認「疑問詞」（中1）", href: "/learn/lecture/j-en-1-gimonshi" },
    { label: "つぎの単元「仮定法」", href: "/learn/lecture/j-en-3-katei" },
  ],
};
