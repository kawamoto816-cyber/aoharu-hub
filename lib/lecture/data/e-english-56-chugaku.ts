import type { Lecture } from "../types";

const C = "/media/commons/e-english-56-chugaku";

export const E_ENGLISH_56_CHUGAKU: Lecture = {
  unit: "e-english-56-chugaku",
  title: "中学校でしたいことは I want to 〜. 部活は join、行事は enjoy",
  hook: "もうすぐ中学生。部活や新しい教科、行事など、楽しみなことがたくさんありますね。英語で「中学校でしたいこと」を伝えるときは、I want to 〜. のあとの動作の言葉がポイントです。自分の目ひょうを英語で言ってみましょう。",
  mystery: "「サッカー部に入りたい」は I want to join the soccer team. です。want のあとには to がいるのに、join のあとに to をつけると、まちがいになります。同じ to なのに、どうして？",
  mission: {
    from: "近所の中学校の英語の先生",
    request: "毎年4月、新しい1年生に英語で「中学校でしたいこと」を発表してもらいます。すると毎年、I want to join to the soccer team. と、to を2つつける人がたくさんいるのです。ただ「まちがい」と言うだけでなく、なぜそうなるのかを、小学生にも分かる言葉で説明したいと考えています。名探偵《めいたんてい》のあなたに、want のあとの to と join のなぞを解いてほしいのです。",
    thanks: "to は「〜すること」の目印で、join には、もう「〜に入る」の「に」までふくまれていたのですね。4月の最初の授業で、さっそくこの話をします。",
  },
  sections: [
    {
      heading: "I want to のあとの言葉で、したいことが決まる",
      body: "「〜したい」は {{I want to 〜.}} で、to のあとに動作の言葉を置きます。部活に入るなら {{join}}、勉強するなら {{study}}、行事を楽しむなら {{enjoy}}、友だちを作るなら {{make}} です。何をしたいかに合わせて、動作の言葉をえらびます。",
      reading: [
        "「中学校でしたいこと」を英語で言うときに使うのが {{I want to 〜.}} です。I want は「わたしは〜がほしい」。そのあとに to と動作の言葉を続けると、「〜することがほしい」、つまり「〜したい」になります。I want to join the tennis team.（テニス部に入りたい）。to のあとの言葉を取りかえるだけで、いろいろな夢が言えます。",
        "to のあとに置くのは、動作を表す言葉です。部活に入るなら {{join}}、勉強するなら {{study}}、行事を楽しむなら {{enjoy}}、友だちを作るなら {{make}}。音声を聞いてまねしてみましょう。",
        "「大きくなったら」と未来を思いえがく気持ちは、140年前の子どもも同じでした。スコットランドの作家ロバート・ルイス・スティーヴンソンは、1885年に子どものための詩集『子どもの詩の園』（A Child's Garden of Verses）を出しました。その中の4行の詩「Looking Forward（楽しみだな）」では、子どもが「大人になったら、ぼくはうんとえらくなるんだ」と胸をはります。でも、えらくなってすることは、「ほかの子に、ぼくのおもちゃにさわるなと言う」こと。詩の中の I shall は、今の英語の I will（〜するつもりだ）にあたる、少し古い言い方です。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "When I am grown to man's estate\nI shall be very proud and great,\nAnd tell the other girls and boys\nNot to meddle with my toys.",
        ja: "ぼくが大人になったら、\nうんとえらくて、いばっているんだ。\nそして、ほかの女の子や男の子に言ってやる。\nぼくのおもちゃに、さわらないでって。",
        cite: "Robert Louis Stevenson, \"Looking Forward\", A Child's Garden of Verses (1885)",
        source: "https://www.gutenberg.org/ebooks/136",
      }],
      figure: {
        type: "formula",
        title: "中学校でしたいこと",
        prose: true,
        steps: [
          { expr: "I want to {{join}} the tennis team.", note: "部活に入る" },
          { expr: "I want to {{study}} English hard.", note: "勉強する" },
          { expr: "I want to {{enjoy}} the school festival.", note: "行事を楽しむ" },
          { expr: "I want to {{make}} many friends.", note: "友だちを作る" },
        ],
        note: "school festival は文化祭のことです。",
      },
      photos: [
        {
          src: `${C}/cover1906.webp`, width: 800, height: 926,
          alt: "緑の布の表紙に、金色で花と木と、まん中に立つ子どもがえがかれた古い本。背表紙にも子どもの絵がある",
          caption: "『子どもの詩の園』の1906年の本の表紙と背表紙。1885年に出たこの詩集は、今も英語の国々で子どもたちに読まれています。",
          credit: { author: "National Library NZ on The Commons", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:STEVENSON(1906)_A_child%27s_garden_of_verses_(15628995320).jpg" },
        },
      ],
      cliff: "したいことが部活なら、英語で部活の名前を言えないと始まりません。",
    },
    {
      heading: "部活の言い方：team と club",
      body: "運動の部活は {{team}} をつけて言うことが多く、文化の部活は {{club}} をつけて言います（運動の部活に club を使うこともあります）。brass band（吹奏楽部《すいそうがくぶ》）や chorus（合唱部）のように、それだけで部活を表す言葉もあります。",
      reading: [
        "中学校の大きな楽しみの一つが部活です。英語で部活を言うときは、運動の部活には {{team}}、文化の部活には {{club}} をつけることが多いです。soccer team、art club のようにです。運動の部活に club を使う人もいるので、どちらでも通じます。",
        "brass band（吹奏楽部《すいそうがくぶ》）や chorus（合唱部）のように、それだけで部活を表す言葉もあります。また、I want to join the soccer team. の {{the}} は、「その学校の、あのサッカー部」と、決まったものを指す言葉です。部活の名前の前には、the をつけて言いましょう。",
        "アメリカの学校では、季節ごとにちがうスポーツのチームに入る人もいます。国によって、部活のしくみも少しずつちがうのです。",
      ],
      figure: {
        type: "compare",
        title: "部活の名前の例",
        columns: [{ title: "運動の部活", tone: "blue" }, { title: "文化の部活", tone: "yellow" }],
        rows: [
          { cells: ["soccer team（サッカー部）", "art club（美術部）"] },
          { cells: ["tennis team（テニス部）", "science club（科学部）"] },
          { cells: ["track team（陸上部）", "brass band（吹奏楽部《すいそうがくぶ》）"] },
        ],
      },
      photos: [
        {
          src: `${C}/academy.webp`, width: 800, height: 398,
          alt: "石づくりの横に長い平屋の校舎。まん中に太い柱がならぶ入り口がある",
          caption: "スコットランドのエディンバラ・アカデミー。1824年に開校した学校で、スティーヴンソンも少年のころ、しばらく通いました。",
          credit: { author: "Macumba (English Wikipedia)", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Edinburgh_Academy_frontage.jpg" },
        },
      ],
      cliff: "「何部に入りたいか」は言えました。でも、聞く人はきっと「どうして？」と思います。",
    },
    {
      heading: "理由をつけたす",
      body: "したいことのあとに{{理由}}をつけると、話に中身が出ます。理由は {{I like 〜.}} や {{I want to be 〜.}} で言います。たとえば、音楽がすきで歌手になりたいなら、I want to join the chorus. とつながります。",
      reading: [
        "したいことだけを言うと、聞く人は「どうして？」と思います。そこで {{理由}} をつけたします。I want to join the chorus. I like music.（合唱部に入りたいです。音楽がすきです）のように {{I like 〜.}} を続けたり、{{I want to be 〜.}}（〜になりたい）で将来の夢を言ったりします。",
        "スティーヴンソンは1850年、スコットランドのエディンバラで生まれました。体が弱く、子どものころは、ベッドで長い時間を過ごしました。心の中で遠い国や海を旅した思い出が、のちに冒険《ぼうけん》小説『宝島』（1883年）や、『子どもの詩の園』になったといわれます。",
        "詩集の中の「Foreign Lands（遠い国々）」では、子どもがさくらんぼの木にのぼり、となりの庭や、きらきら光る川や、町へ続く道をながめます。そして、こう続けます。If I could find a higher tree / Farther and farther I should see（もっと高い木を見つけたら、もっともっと遠くまで見えるのに）。もっと高い木にのぼりたい。なぜなら、もっと遠くを見たいから。したいことと理由が、ぴったりつながっていますね。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "If I could find a higher tree\nFarther and farther I should see,\nTo where the grown-up river slips\nInto the sea among the ships,\n\nTo where the roads on either hand\nLead onward into fairy land,\nWhere all the children dine at five,\nAnd all the playthings come alive.",
        ja: "もっと高い木を見つけられたら、\nもっともっと遠くまで見えるだろう。\n大人になった川が、船のあいだを\nするりと海へ流れこむところまで。\n\n両側の道が、そのまま\nおとぎの国へと続いていくところまで。\nそこでは子どもたちがみんな5時に夕ごはんを食べ、\nおもちゃがみんな動きだすんだ。",
        cite: "Robert Louis Stevenson, \"Foreign Lands\" (stanzas 4-5), A Child's Garden of Verses (1885)",
        source: "https://www.gutenberg.org/ebooks/136",
      }],
      figure: {
        type: "cause",
        title: "理由から、したいことへ",
        causes: [
          { label: "音楽がすき", sub: "I like music.", tone: "plain" },
          { label: "歌手が夢", sub: "want to be 〜", tone: "plain" },
        ],
        effect: { label: "合唱部に入りたい", sub: "want to join", tone: "yellow" },
        chain: [{ label: "毎日練習する", sub: "practice hard", tone: "blue" }],
      },
      photos: [
        {
          src: `${C}/stevenson.webp`, width: 400, height: 605,
          alt: "口ひげをはやし、黒っぽい上着を着た男の人の、古い白黒写真",
          caption: "ロバート・ルイス・スティーヴンソン（1850〜1894年）。体の弱かった子どものころの思い出から、子どもの心をそのまま書いた詩を生みました。",
          credit: { author: "Henry Walter Barnett", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Robert_Louis_Stevenson_by_Henry_Walter_Barnett.jpg" },
        },
      ],
      cliff: "自分のことは言えるようになりました。では、友だちのしたいことは、どう聞けばよいのでしょう？",
    },
    {
      heading: "たずね方",
      body: "入りたい部活をたずねるときは {{What club do you want to join?}} と聞きます。中学校でしたいことは {{What do you want to do in junior high school?}} です。どちらも I want to 〜. で答えます。",
      reading: [
        "友だちに入りたい部活を聞くときは、{{What club do you want to join?}}（何部に入りたいの？）です。答えは I want to join the 〜. です。中学校でしたいことを広く聞くなら、{{What do you want to do in junior high school?}} と言います。junior high school は中学校のことです。",
        "答えたあとに And you?（あなたは？）と聞き返すと、会話が続きます。相手の答えには、Nice!（いいね）や Me, too.（わたしも）と返しましょう。英語の会話は、キャッチボールのように言葉を投げ返すことが大切です。",
      ],
      figure: {
        type: "formula",
        title: "want と join の、to のちがい",
        prose: true,
        steps: [
          { label: "want", expr: "I want {{to join}} …", note: "入ることがほしい＝入りたい" },
          { label: "join", expr: "join {{the soccer team}}", note: "サッカー部に入る（に は join の中）" },
          { label: "×", expr: "join {{to}} the soccer team", note: "「に」が2つ重なってしまう" },
        ],
      },
      reveal: "want は「〜がほしい」という言葉です。そのあとに to join と続けると、to が「〜すること」の目印になり、「入ることがほしい」、つまり「入りたい」になります。一方、join は1語で「〜に入る」という意味で、日本語の「に」にあたる部分まで、もうふくまれています。だから join のあとに to をつけると、「に」が2つ重なってしまうのです。",
      cliff: "言いたいことも、聞き方もそろいました。最後に、全部をつなげてスピーチにしてみましょう。",
    },
    {
      heading: "スピーチにまとめる",
      body: "中学校でしたいことのスピーチは、{{あいさつ}}→{{したいこと}}→{{理由}}→{{しめくくり}}の順にすると、聞く人に伝わりやすくなります。大事な言葉はゆっくり、はっきり言いましょう。",
      reading: [
        "中学校でしたいことのスピーチは、{{あいさつ}}→{{したいこと}}→{{理由}}→{{しめくくり}}の順にまとめると、聞く人に伝わりやすくなります。たとえば、Hello. I'm Sora. I want to join the brass band. I like music. I want to play the trumpet. Thank you. です。したいことを2つ言いたいときは、I want to enjoy the school festival, too.（文化祭も楽しみたいです）と、too をつけます。",
        "話すときは、聞く人の顔を見て、ゆっくり話しましょう。brass band のような、いちばん伝えたい言葉は、少し強く、はっきり言います。",
        "スティーヴンソンの詩が140年たっても読まれているのは、子どもの「こうしたい」という気持ちを、短く、まっすぐな言葉で書いたからかもしれません。みなさんのスピーチも、長くなくてかまいません。I want to 〜. の一文に、自分の本当の気持ちをこめてみましょう。",
      ],
      figure: {
        type: "flow",
        dir: "col",
        title: "スピーチの組み立て",
        steps: [
          { label: "あいさつ", sub: "Hello. I'm Sora.", tone: "plain" },
          { label: "したいこと", sub: "I want to join the brass band.", tone: "yellow" },
          { label: "理由", sub: "I like music.", tone: "blue" },
          { label: "しめくくり", sub: "Thank you.", tone: "plain" },
        ],
      },
    },
  ],
  story: {
    kind: "novel",
    title: "もっと高い木",
    paragraphs: [
      "卒業式まで、あと一か月。来週は、英語で「中学校でしたいこと」を発表する日です。",
      "放課後、あおいは原稿《げんこう》用紙を前に、えんぴつをくるくる回していました。書けたのは一行だけ。I want to join to the brass band.",
      "「それ、to が一つ多いよ」。となりの席のけんたが、のぞきこみました。「join だけで『入る』なんだって。先生が言ってた」",
      "「あ、そうか」。あおいは to を一つ消しました。でも、問題は次です。先生は「理由も言いましょう」と言っていました。",
      "「けんたは何て書いたの？」「I want to join the soccer team. I like soccer. それだけ」。けんたは、とくいそうに胸をはりました。",
      "あおいは、どうして吹奏楽部《すいそうがくぶ》に入りたいのか、自分でもうまく言えませんでした。音楽はすきです。でも、それだけではない気がします。",
      "そのとき、窓の外から、遠く高い音が聞こえてきました。坂の上の中学校から、トランペットの音が風に乗ってくるのです。",
      "あおいは、今日の英語の時間に聞いた詩を思い出しました。140年前のイギリスの詩です。If I could find a higher tree / Farther and farther I should see 「もっと高い木を見つけたら、もっと遠くまで見えるのに」。",
      "「わたし、あの音を、遠くまでとどけたいんだ」。あおいは、ぽつりと言いました。「運動会で中学生の演奏を聞いたとき、音が校庭のはしまで、まっすぐ飛んできたの」",
      "「それ、理由じゃん」とけんたが言いました。「英語で何て言うの？」",
      "あおいは考えて、ゆっくり書きました。I like music. I want to play the trumpet.",
      "「なんか、いいね」。けんたも、だまって一行を書き足しました。I want to be a soccer player.",
      "一週間後、あおいはみんなの顔を見て、ゆっくり、はっきり言いました。I want to join the brass band. 窓の外では、坂の上から、またトランペットの音がひびいていました。",
    ],
    note: "あおいとけんた、小学校と中学校は創作です。スティーヴンソンの詩「Foreign Lands」の英文と、それが1885年の詩集『子どもの詩の園』に入っていることは事実です。",
  },
  mistakes: [
    { wrong: "I want to join to the soccer team.", right: "I want to join the soccer team.", why: "join は「〜に入る」の意味なので、後ろに to はいりません。" },
    { wrong: "I want to make many friend.", right: "I want to make many friends.", why: "many（たくさんの）のあとは、s のついた形にします。" },
    { wrong: "I want to study hard English.", right: "I want to study English hard.", why: "hard（いっしょうけんめい）は、English のあとに置きます。" },
  ],
  check: [
    { q: "「美術部に入りたい」を英語で言うと？", a: "I want to join the art club.", why: "部活に入るは join。美術部は art club。" },
    { q: "入りたい部活をたずねる文は？", a: "What club do you want to join?", why: "「どの部活に」なので What club で始める。" },
    { q: "I want to ___ the sports festival.（体育祭を楽しみたい）の ___ に入るのは？", a: "enjoy", why: "行事を楽しむは enjoy。" },
  ],
  next: [
    { label: "「中学校でしたいこと」のドリル", href: "/learn/eigo-sho/e-english-56-chugaku" },
    { label: "ひとつ前の図解レクチャー「小学校の思い出」", href: "/learn/lecture/e-english-56-omoide" },
    { label: "中学の図解レクチャー「be動詞《どうし》」", href: "/learn/lecture/j-en-1-be" },
  ],
};
