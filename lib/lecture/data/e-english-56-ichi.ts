import type { Lecture } from "../types";

const C = "/media/commons/e-english-56-ichi";

export const E_ENGLISH_56_ICHI: Lecture = {
  unit: "e-english-56-ichi",
  title: "物の位置は in・on・under で、道は「進む・曲がる・見える」で伝える",
  hook: "「ぼくのぼうし、どこ？」「ベッドの上だよ」。物がある場所や、駅までの行き方を伝えられると、家でも町でも役に立ちます。英語では、場所の前に in・on・under などの短い言葉をおくだけで位置を表せます。道案内は、3つの言い方を組み合わせればできます。",
  mystery: "マザーグースの歌のハンプティ・ダンプティは、へいの「上」にすわって on a wall。ところが、教室のかべの「横」にかかった時計も、英語では on the wall です。上と横、まるでちがう場所なのに、なぜ同じ on なのでしょう？",
  mission: {
    from: "町の家具屋さん",
    request: "わたしの店では、外国のお客さんのために、英語の案内カードを作っています。「The lamp is on the table.」「The mirror is on the wall.」と書いたら、お店に来た子どもに聞かれました。「テーブルは上なのに、かべは横でしょ？ どうして同じ on なの？」。わたしは答えられませんでした。名探偵《めいたんてい》のあなたに、この on のなぞを解いてほしいのです。",
    thanks: "on は「ふれている」しるしだったのですね。カードのはしに「上でも横でも、くっついていれば on」と書きそえます。天井の電灯のカードも、自信をもって on the ceiling と書けます。",
  },
  sections: [
    {
      heading: "場所の前におく4つの言葉",
      body: "物の位置は、{{in（〜の中に）}}、{{on（〜の上に）}}、{{under（〜の下に）}}、{{by（〜のそばに）}}を場所の前において表します。The ball is in the box. は「ボールは箱の中にある」です。言葉の順番は、日本語と反対で {{in ＋ the box}} のように「中に」が先に来ます。",
      reading: [
        "日本語では「箱の中」「いすの下」のように、場所のあとに「の中」「の下」をつけます。英語はちょうど反対で、in the box、under the chair のように、位置を表す短い言葉が場所の前に来ます。この言葉を{{前置詞}}とよびます。「名前の前に置く言葉」という意味です。日本語と英語は、まるで鏡《かがみ》にうつしたように、順番が入れかわっているのです。",
        "まずは4つを覚えましょう。{{in}} は、まわりをかこまれた「中」です。箱の中も、部屋の中も、日本の中も in です（in Japan）。{{under}} は「下」、{{by}} は「すぐそば」です。The dog is by the door. なら、犬はドアのそばにいます。そして {{on}} は「上」と習いますが、じつはもっと広い意味をもっています。",
        "下の写真を見てください。ねこが段ボール箱に入って、目をつぶっています。英語では The cat is in the box. です。よく見ると、ねこは赤と白の布の上にすわっていますね。こちらは on the cloth です。1まいの写真の中に、in と on が両方かくれています。身の回りの物を見て「これは何の中？ 何の上？」と英語で言ってみると、前置詞はすぐに口になじみます。",
      ],
      figure: {
        type: "compare",
        title: "位置を表す言葉",
        columns: [{ title: "意味", tone: "yellow" }, { title: "例", tone: "plain" }],
        rows: [
          { label: "in", cells: ["〜の中に", "in the box"] },
          { label: "on", cells: ["〜の上に（ふれている）", "on the desk"] },
          { label: "under", cells: ["〜の下に", "under the chair"] },
          { label: "by", cells: ["〜のそばに", "by the door"] },
        ],
      },
      photos: [
        {
          src: `${C}/catbox.webp`, width: 800, height: 533,
          alt: "段ボール箱の中で、しまもようのねこが、赤と白のチェックの布の上にすわって目をつぶっている",
          caption: "段ボール箱でくつろぐねこ。ねこは箱の中（{{in the box}}）にいて、同時に布の上（{{on the cloth}}）にもいます。",
          credit: { author: "Michael Holloway", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:Cat_in_a_box_2.jpg" },
        },
      ],
      cliff: "on は「上に」と覚えていませんか？ じつは、上でないのに on を使う場所があります。",
    },
    {
      heading: "on は「ふれている」",
      body: "on は「上」と覚えがちですが、もとの意味は{{くっついている・ふれている}}ことです。だから、かべにかかった時計は {{on the wall}}、天井の電灯は on the ceiling と言います。上でも下でも、横でも、ふれていれば on です。",
      reading: [
        "on のもとの意味は「{{ふれている}}」「くっついている」です。机の上のりんごは、机にふれているので on the desk。かべにかけた時計は、かべにくっついているので {{on the wall}}。天井の電灯も、天井にくっついているので on the ceiling です。上でも、横でも、下向きでも、ふれていれば on なのです。",
        "イギリスで200年以上前から歌われているマザーグースに、「ハンプティ・ダンプティ」という歌があります。1行目は Humpty Dumpty sat on a wall. 英語の wall は家のかべだけでなく、庭や畑をかこむ石やれんがの「へい」のこともさします。ハンプティは、へいのてっぺんにおしりをつけてすわっているので on です。ところが2行目で、had a great fall（どしんと落ちた）。もう、へいにはふれていません。wall と fall、行の終わりの音がそろっていて、口に出すと楽しいリズムが生まれます。",
        "じつはこの歌には、ハンプティが卵だとは、どこにも書いてありません。もとは「これ、なあに？」となぞをかける歌で、答えが卵だったといわれます。王さまの馬と家来《けらい》がみんな集まっても、元どおりにできないもの。それは、われた卵です。いまでは卵のすがたでかかれるのがふつうですが、下の1877年の絵本では、ふつうの男の人としてかかれています。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "Humpty Dumpty sat on a wall,\nHumpty Dumpty had a great fall;\nAll the King's horses, and all the King's men\nCannot put Humpty Dumpty together again.",
        ja: "ハンプティ・ダンプティ へいにすわった\nハンプティ・ダンプティ どしんと落ちた\n王さまの馬が みんな来ても 王さまの家来《けらい》が みんな来ても\nハンプティ・ダンプティは 元どおりにならない",
        cite: "Mother Goose, \"Humpty Dumpty\" (The Real Mother Goose, 1916)",
        source: "https://www.gutenberg.org/ebooks/10607",
      }],
      figure: {
        type: "tree",
        title: "on が使える場所",
        root: {
          label: "on",
          sub: "ふれている",
          tone: "yellow",
          children: [
            { label: "上にのる", sub: "on the desk", tone: "blue" },
            { label: "横につく", sub: "on the wall", tone: "blue" },
            { label: "下につく", sub: "on the ceiling", tone: "blue" },
          ],
        },
      },
      photos: [
        {
          src: `${C}/gems.webp`, width: 800, height: 1236,
          alt: "卵の形の頭をした人が、しまもようの服を着て、れんがのへいの上に足をぶらさげてすわっている絵",
          caption: "1899年にアメリカで出た絵本のハンプティ・ダンプティ。れんがのへいにすわっています。へいにふれているので {{on a wall}} です。",
          credit: { author: "作者不明（Gems from Mother Goose, 1899）", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Humpty-Dumpty-Nursery-Rhyme-illustration.jpg" },
        },
        {
          src: `${C}/crane.webp`, width: 406, height: 600,
          alt: "ぼうしをかぶった太った男の人が、れんがのへいにすわっている絵と、その下の楽譜《がくふ》",
          caption: "1877年にイギリスで出たマザーグースの本のページ。ここではハンプティは卵ではなく、ふつうの男の人です。楽譜《がくふ》の歌詞の終わりは「Couldn't set Humpty Dumpty up again」で、本によって少しずつ言葉がちがいます。",
          credit: { author: "Walter Crane ほか（Mother Goose's Nursery Rhymes, 1877）", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:MotherGooseHumptyDumpty.jpg" },
        },
      ],
      reveal: "on は「上」ではなく「{{ふれている}}」しるしです。ハンプティはへいのてっぺんにふれて、時計はかべの横にくっついています。どちらも wall にふれているので、同じ {{on the wall}} になるのです。上か横かではなく、ふれているかどうか。それが on の正体です。",
      cliff: "位置の言葉が分かったら、次は「どこ？」とたずねて答える番です。",
    },
    {
      heading: "Where is 〜? とたずね、It's 〜. と答える",
      body: "物の場所をたずねるときは {{Where is 〜?}} と聞きます。答えるときは、物を {{it}} に置きかえて It's under the bed. のように言います。くつやペンなど2つ以上のものは、{{Where are 〜?}} と聞いて They're 〜. と答えます。",
      reading: [
        "朝、出かける前に「ぼうしがない！」。そんなときは {{Where is}} my cap? と聞きます。where は「どこ」です。答える人は、It's on the bed. と言います。my cap をもう一度言うかわりに、{{it}}（それ）でうけるのです。",
        "くつは、いつも2つで1組です。だから {{Where are}} my shoes? と are を使い、答えも {{They're}}（それらは）で始めます。They're by the door. のようにです。くつ下（socks）やめがね（glasses）も、いつも2つで1組なので are です。1つか、2つ以上か。これを考えるのが、英語らしさの一つです。",
        "見つけやすくするには、手がかりを2つ重ねると親切です。It's under the bed, by the window.（ベッドの下の、窓のそばだよ）。見つかったら Here it is!（あった！）と言いましょう。友だちと消しゴムをかくして、Where is my eraser? と聞き合うゲームをすると、in・on・under・by が自然に使えるようになります。",
      ],
      figure: {
        type: "formula",
        title: "場所をたずねる会話",
        prose: true,
        steps: [
          { label: "聞く", expr: "{{Where is}} my cap?", note: "ぼうしは1つ" },
          { label: "答える", expr: "{{It's}} {{on}} the bed.", note: "my cap を it でうける" },
          { label: "聞く", expr: "{{Where are}} my shoes?", note: "くつは2つ" },
          { label: "答える", expr: "{{They're}} {{by}} the door.", note: "2つ以上は they" },
        ],
      },
      cliff: "家の中の物の場所は言えました。では、町の中の行き方は、どう伝えるのでしょう？",
    },
    {
      heading: "道案内は3つの言い方で",
      body: "道案内は、{{Go straight.}}（まっすぐ進んで）、{{Turn right. / Turn left.}}（右／左に曲がって）、{{You can see it on your right.}}（右に見えます）の組み合わせです。曲がる場所は at the corner のように at で伝えます。右・左は、{{歩いている人から見た向き}}で言います。",
      reading: [
        "道案内は、3つの言い方の組み合わせです。進むは {{Go straight.}}（まっすぐ行って）、曲がるは {{Turn right.}} か Turn left.（右へ／左へ曲がって）、見えるは {{You can see it on your right.}}（右に見えます）。この3つを、道にそってならべるだけで、どこへでも案内できます。",
        "曲がる場所は、{{at the corner}}（角で）のように at で言います。「2つ目の角」なら at the second corner、「1つ目」なら first、「3つ目」なら third です。目じるしには、前の節の位置の言葉が活やくします。by the park（公園のそば）、on the corner（角に）。ここにも on が出てきましたね。目的地が道に面して見えるので、You can see it on your right. の on も、同じなかまです。",
        "たとえば、図書館までならこうです。Go straight. Turn left at the second corner. You can see it on your right. 長い1文にせず、短く区切って、1つ言ったら相手がうなずくのを待つのがこつです。右と左は、{{歩いている人から見た向き}}で言います。3つの言い方と位置の言葉があれば、こまっている人を目的地まで連れていけます。",
      ],
      figure: {
        type: "flow",
        dir: "col",
        title: "図書館までの道案内（例）",
        steps: [
          { label: "Go straight.", sub: "まっすぐ進む", tone: "blue" },
          { label: "Turn left.", sub: "2つ目の角で左へ", tone: "yellow" },
          { label: "見えます", sub: "on your right.", tone: "red" },
        ],
        arrows: ["2つ目の角まで", "少し進む"],
        note: "最後は You can see it on your right. と言う。",
      },
    },
  ],
  story: {
    kind: "manga4",
    title: "ねこのミケはどこ？",
    panels: [
      {
        scene: "家のリビング。リクとハナが、ねこのミケをさがしている。ゆかに大きなはこ。",
        lines: [
          { who: "リク", text: "ミケはどこ？" },
          { who: "ハナ", text: "はこの中にいるよ" },
          { who: "ハナ", text: "英語ならイン！" },
        ],
        art: {
          bg: "plain",
          cast: [
            { who: "リク", look: "boy", x: 254, face: "think", fx: "?" },
            { who: "ハナ", look: "girl", x: 86, face: "smile", hand: [150, 214] },
          ],
          props: [{ kind: "board", x: 170, y: 214, s: 0.85, text: "はこの中にねこ" }],
        },
      },
      {
        scene: "ミケがぴょんと、はこの上にとびのった。",
        lines: [
          { who: "ハナ", text: "こんどははこの上！" },
          { who: "ハナ", text: "オンだね" },
          { who: "リク", text: "動きがはやいなあ" },
        ],
        art: {
          bg: "plain",
          cast: [
            { who: "ハナ", look: "girl", x: 254, face: "surprise", fx: "!" },
            { who: "リク", look: "boy", x: 86, face: "sweat", fx: "sweat" },
          ],
          props: [{ kind: "board", x: 170, y: 214, s: 0.85, text: "はこの上にねこ" }],
        },
      },
      {
        scene: "ミケが、つくえの下にもぐりこんだ。",
        lines: [
          { who: "リク", text: "つくえの下に入った" },
          { who: "リク", text: "アンダー！" },
          { who: "ハナ", text: "三つとも言えたね" },
        ],
        art: {
          bg: "plain",
          cast: [
            { who: "リク", look: "boy", x: 254, face: "shout", fx: "!" },
            { who: "ハナ", look: "girl", x: 86, face: "smile" },
          ],
          props: [
            { kind: "table", x: 0, y: 240 },
            { kind: "board", x: 170, y: 214, s: 0.85, text: "つくえの下にねこ" },
          ],
        },
      },
      {
        scene: "ミケが、まどのカーテンにつかまって、ぶら下がっている。",
        lines: [
          { who: "ハナ", text: "カーテンにつかまってる" },
          { who: "ハナ", text: "上じゃないのに…" },
          { who: "リク", text: "ふれてるならオン！" },
        ],
        art: {
          bg: "plain",
          cast: [
            { who: "ハナ", look: "girl", x: 254, face: "think", fx: "?" },
            { who: "リク", look: "boy", x: 86, face: "smile", fx: "idea", hand: [150, 214] },
          ],
          props: [{ kind: "board", x: 170, y: 214, s: 0.85, text: "カーテンにねこ" }],
        },
      },
    ],
    note: "リクとハナ、ねこのミケは作り話です。on がもともと「ふれている・くっついている」ことを表すので、カーテンにつかまったねこを on the curtain と言えることは、ほんとうのことです。",
  },
  mistakes: [
    { wrong: "The clock is in the wall.", right: "The clock is on the wall.", why: "かべにくっついているので on。in はかべの中にうまっていることになります。" },
    { wrong: "Where is my shoes?", right: "Where are my shoes?", why: "くつは2つ以上なので are。答えも They're 〜. です。" },
    { wrong: "Go to straight.", right: "Go straight.", why: "straight の前に to はいりません。" },
  ],
  check: [
    { q: "The cat is ___ the box.（ねこは箱の中）の ___ は？", a: "in", why: "「〜の中に」は in。" },
    { q: "「右に曲がって」を英語で言いましょう。", a: "Turn right.", why: "曲がるは turn、右は right。" },
    { q: "Where is the ball?（いすの下）に答えましょう。", a: "It's under the chair.", why: "the ball は it でうけ、「〜の下」は under。" },
  ],
  next: [
    { label: "ポイントと練習問題「物の位置と道案内」", href: "/learn/eigo-sho/e-english-56-ichi" },
    { label: "小3・4「道案内」", href: "/learn/eigo-sho/e-english-34-michi" },
    { label: "中1「命令文」（Go straight. の形）", href: "/learn/eibunpo-chu/j-en-1-meirei" },
  ],
};
