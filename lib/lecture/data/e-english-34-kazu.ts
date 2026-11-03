import type { Lecture } from "../types";

const C = "/media/commons/e-english-34-kazu";

export const E_ENGLISH_34_KAZU: Lecture = {
  unit: "e-english-34-kazu",
  title: "数は 1〜12 を覚《おぼ》えれば、あとは -teen と -ty で作れる",
  hook: "ゲームの点数、クラスの人数、ボールの数。数は毎日のくらしの中にたくさんあります。英語《えいご》の数は、はじめの12こを覚《おぼ》えると、あとはきまりで作れます。聞いて、まねして、声に出して数えてみましょう。",
  mystery: "英語《えいご》の数は、10までではなく、12まで一つずつ覚《おぼ》える言葉です。13からは -teen のきまりで作れるのに、11と12だけは、なぜ eleven、twelve というとくべつな形なのでしょう？",
  mission: {
    from: "商店街《しょうてんがい》の八百屋さん",
    request: "うちの八百屋に、外国から来たお客さんがふえてきました。「りんごは何こ？」と英語《えいご》で答えたいのですが、100まで全部覚《おぼ》えるのはたいへんそうです。人に聞いたら「12まで覚《おぼ》えれば、あとは作れる」と言われました。でも、どうして10ではなく12なのでしょう。名探偵《めいたんてい》のあなたに、11と12のひみつをといてほしいのです。",
    thanks: "11と12は、「10と1のこり」「10と2のこり」から生まれた古い言葉だったのですね。12まで覚《おぼ》えたら、あとは -teen と -ty のブロックを組み立てるだけ。これで店先で Fifteen apples? OK! と元気に言えます。",
  },
  sections: [
    {
      heading: "1〜10 は、そのまま覚《おぼ》える",
      body: "1から10は、一つずつ {{そのまま覚《おぼ》える}} 言葉です。指をおりながら、声に出して数えると覚《おぼ》えやすくなります。{{three}}（3）は口の形、{{five}}（5）と {{seven}}（7）は「v」の音に気をつけて聞きましょう。",
      figure: {
        type: "compare",
        title: "1〜10 の言い方",
        columns: [{ title: "1〜5", tone: "blue" }, { title: "6〜10", tone: "yellow" }],
        rows: [
          { cells: ["1 one", "6 six"] },
          { cells: ["2 two", "7 seven"] },
          { cells: ["3 three", "8 eight"] },
          { cells: ["4 four", "9 nine"] },
          { cells: ["5 five", "10 ten"] },
        ],
      },
      reading: [
        "数は、時計・カレンダー・お金・ゲームの点数と、くらしのどこにでも出てきます。英語《えいご》の1から10は、{{one}}、{{two}}、{{three}}……と、一つずつ{{そのまま覚《おぼ》える}}言葉です。日本語の「いち、に、さん」と同じで、きまりはありません。指をおりながら、先生や音声の英語《えいご》をまねして、何度も声に出してみましょう。",
        "イギリスやアメリカの子どもたちは、数を{{歌}}で覚《おぼ》えてきました。その一つが、200年より前から歌いつがれてきた{{マザーグース}}の「One, Two, Buckle My Shoe」です。下の歌を聞くと、two と shoe、four と door、ten と hen のように、数とそのあとの言葉の{{終わりの音がそろって}}います。これを{{韻《いん》}}といいます。音がそろうと、リズムにのって、数が口から自然《しぜん》に出てくるのです。",
        "歌の場面も楽しいです。1、2でくつの金具をとめ、3、4でドアをノック、5、6でぼうを拾い、9、10で太っためんどり。数を言うたびに、ちがう絵が頭にうかびます。数と絵をいっしょに覚《おぼ》えると、わすれにくくなります。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "One, two,\nBuckle my shoe;\nThree, four,\nKnock at the door;\nFive, six,\nPick up sticks;\nSeven, eight,\nLay them straight;\nNine, ten,\nA good, fat hen;\nEleven, twelve,\nDig and delve;\nThirteen, fourteen,\nMaids a-courting;\nFifteen, sixteen,\nMaids in the kitchen;\nSeventeen, eighteen,\nMaids a-waiting;\nNineteen, twenty,\nMy plate's empty.",
        ja: "いち、に、\nくつの金具をとめて\nさん、し、\nドアをノック\nご、ろく、\nぼうを拾って\nしち、はち、\nまっすぐならべて\nく、じゅう、\nまるまる太っためんどり\nじゅういち、じゅうに、\n土をほって、またほって\nじゅうさん、じゅうし、\nむすめさんたちは、こいのまっさいちゅう\nじゅうご、じゅうろく、\nむすめさんたちは台所\nじゅうしち、じゅうはち、\nむすめさんたちは待っている\nじゅうく、にじゅう、\nわたしのお皿は、からっぽ",
        cite: "Mother Goose, \"One, Two, Buckle My Shoe\" (The Real Mother Goose, 1916)",
        source: "https://www.gutenberg.org/ebooks/10607",
      }],
      photos: [
        {
          src: `${C}/hoppin.webp`, width: 374, height: 444,
          alt: "ONE TWO BUCKLE MY SHOE という題の下で、男の子が、金具のついた大きなくつをけり上げている白黒の絵",
          caption: "アメリカでかかれた「One, Two, Buckle My Shoe」の絵（1870年ごろ）。くつの金具をとめる歌を、大きなくつで、ゆかいにえがいています。",
          credit: { author: "Augustus Hoppin", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:1-2_buckle_my_shoe.jpg" },
        },
      ],
      cliff: "歌は11、12と続《つづ》きます。ところが、11と12にはふしぎなひみつがあるのです。",
    },
    {
      heading: "11〜19 は -teen がつく",
      body: "11は {{eleven}}、12は {{twelve}} で、これだけは {{特別《とくべつ》}} な言い方です。13から19は、終わりに {{-teen}} がつきます。fourteen（14）や sixteen（16）のように、4や6の言葉に -teen をつけるものが多いです。",
      figure: {
        type: "tree",
        title: "11〜19 の言い方",
        root: {
          label: "11〜19",
          tone: "navy",
          children: [
            { label: "11・12", sub: "eleven / twelve", tone: "red" },
            { label: "13〜19", sub: "終わりに -teen", tone: "yellow", children: [
              { label: "thirteen", sub: "13" },
              { label: "fourteen", sub: "14" },
              { label: "fifteen", sub: "15" },
            ] },
          ],
        },
        note: "13 thirteen と 15 fifteen は、3・5 の言葉と少し形が変《か》わる。",
      },
      reading: [
        "11は{{eleven}}、12は{{twelve}}です。どちらも one や two とは形がちがい、-teen もつきません。そして13からは、thirteen、fourteen……と、終わりに{{-teen}}がつきます。この -teen は、もとは{{ten}}（10）が形をかえたものです。fourteen は「4と10」、sixteen は「6と10」。日本語の「十四」と、ならべ方が逆《ぎゃく》なだけなのです。",
        "では、11と12は、どうして oneteen、twoteen にならないのでしょう。ずっと昔の英語《えいご》をさかのぼると、eleven は「（10を数えて）{{1のこり}}」、twelve は「{{2のこり}}」という意味の言葉だったと考えられています。11と12は、-teen の形が広まるより前から使われてきた、とても古い言葉なのです。となりの国のドイツ語でも、11は elf、12は zwölf と、英語《えいご》によくにています。",
        "12は、英語《えいご》を話す国のくらしでも大事な数です。1年は12か月、時計の文字ばんは12まで。12こをひとまとまりにして{{a dozen}}（ダース）とよび、たまごやえんぴつを今も1ダース、2ダースと数えます。",
      ],
      photos: [
        {
          src: `${C}/bigben.webp`, width: 640, height: 480,
          alt: "夜の空に光る時計台の上の方。白い文字ばんに、1から12までのローマ数字がならんでいる",
          caption: "ロンドン（イギリス）の時計台「ビッグ・ベン」の文字ばん。1から{{12}}までの数が、ローマ数字でならんでいます。",
          credit: { author: "Colin Smith", license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0", source: "https://commons.wikimedia.org/wiki/File:Big_Ben_Clock_Face_-_geograph.org.uk_-_305185.jpg" },
        },
      ],
      reveal: "11と12がとくべつなのは、-teen の形が広まるより前から使われてきた、古い言葉だからです。eleven は「{{1のこり}}」、twelve は「{{2のこり}}」。10を数えたあとの「あまり」を表す言葉から生まれたと考えられています。だから英語《えいご》の数は、1〜12を覚《おぼ》えれば、13からは {{-teen}} のきまりで作れるのです。",
      cliff: "13〜19は -teen のブロック。では20、30……には、どんなブロックがあるのでしょう？",
    },
    {
      heading: "20、30、40… は -ty がつく",
      body: "10のまとまりの数は、終わりに {{-ty}} がつきます。20は {{twenty}}、30は {{thirty}}、50は {{fifty}} です。40は {{forty}} で、four の u がなくなるので気をつけましょう。100は {{one hundred}} です。",
      figure: {
        type: "numberline",
        title: "10 とびの数",
        min: 0,
        max: 100,
        tick: 10,
        points: [
          { x: 20, label: "twenty", tone: "blue" },
          { x: 50, label: "fifty", tone: "yellow" },
          { x: 80, label: "eighty", tone: "red" },
        ],
      },
      reading: [
        "20、30、40のような{{10のまとまりの数}}は、終わりに{{-ty}}がつきます。-ty も、昔の英語《えいご》で「10のまとまり」を表す言葉から来ています。sixty は「6つの10」、つまり60です。-teen が「10を足す」なら、-ty は「10が何こ」と考えると分かりやすいですね。",
        "ただし、twenty（20）、thirty（30）、fifty（50）は、two・three・five と少し形がかわります。thirteen・fifteen のときと同じですね。forty（40）は、four から u がなくなるので、書くときに気をつけましょう。そして100は{{one hundred}}です。",
      ],
      cliff: "thirteen と thirty。にている二つを、耳でどう聞き分ければいいのでしょう？",
    },
    {
      heading: "-teen と -ty を聞き分ける",
      body: "thirteen（13）と thirty（30）は、音がよくにています。{{-teen}} は {{後ろを強く長め}} に、{{-ty}} は {{前を強く}} 言います。聞くときは、どこが強いかに耳をすませると、聞き分けられます。",
      figure: {
        type: "compare",
        title: "にている数のペア",
        columns: [{ title: "-teen（後ろが強い）", tone: "yellow" }, { title: "-ty（前が強い）", tone: "blue" }],
        rows: [
          { cells: ["13 thirteen", "30 thirty"] },
          { cells: ["14 fourteen", "40 forty"] },
          { cells: ["15 fifteen", "50 fifty"] },
        ],
      },
      reading: [
        "thirteen（13）と thirty（30）は、とてもよくにた音です。お店で聞きまちがえたら、ねだんが大きくかわってしまいます。聞き分けるかぎは、{{強く言う所}}です。-teen は{{後ろを強く長め}}に、-ty は{{前を強く}}言います。",
        "手びょうしで練習してみましょう。thir-TEEN は2回目で大きく手をたたき、THIR-ty は1回目で大きくたたきます。英語《えいご》を話す人どうしでも聞きまちがえることがあるので、fifteen, one-five（15、1と5）のように、数字を一つずつ言ってたしかめることもあります。",
      ],
      cliff: "あとは、ブロックを組み立てるだけ。21から99まで、いっきに作ってみましょう。",
    },
    {
      heading: "21〜99 と How many?",
      body: "21から99は、{{10のまとまりの数}} と {{1〜9}} をつなげて言います。twenty と one で {{twenty-one}}（21）です。数をたずねるときは {{How many 〜?}} と聞き、答えは数だけで言えます。",
      figure: {
        type: "formula",
        title: "数をつなげる・数をたずねる",
        prose: true,
        steps: [
          { label: "21", expr: "twenty ＋ one → {{twenty-one}}" },
          { label: "35", expr: "thirty ＋ five → {{thirty-five}}" },
          { label: "聞く", expr: "{{How many}} pencils?" },
          { label: "答える", expr: "{{Seven.}}", note: "えんぴつが7本" },
        ],
      },
      reading: [
        "21から99は、ブロックを組み立てるように作れます。{{10のまとまりの数}}に{{1〜9}}をつなげるだけです。twenty と one で{{twenty-one}}（21）、forty と seven で forty-seven（47）。書くときは、間に「-」（ハイフン）を入れます。日本語の「二十一」と同じ順番《じゅんばん》なので、まよいません。",
        "数をたずねるときは{{How many 〜?}}と聞きます。How many apples?（りんごはいくつ？）と聞かれたら、Twelve.（12こ）のように数だけで答えればだいじょうぶです。1〜12を覚《おぼ》えて、-teen と -ty と組み立てを使えば、1から99まで、どの数でも言えるのです。",
      ],
    },
  ],
  story: {
    kind: "manga4",
    title: "数はブロックで組み立てる",
    panels: [
      {
        scene: "教室。ソウタが「1〜100」と書かれた紙を見て頭をかかえる。ミオが声をかける。",
        lines: [
          { who: "ソウタ", text: "100まで全部" },
          { who: "ソウタ", text: "おぼえるなんてむり！" },
          { who: "ミオ", text: "ブロックで作れるよ" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ソウタ", look: "boy", x: 254, face: "sweat", fx: "sweat" },
            { who: "ミオ", look: "girl", x: 86, face: "smile" },
          ],
          props: [
            { kind: "table", x: 0, y: 240 },
            { kind: "board", x: 168, y: 220, s: 0.85, text: "1〜100" },
          ],
        },
      },
      {
        scene: "ミオが「six＋teen」のカードをならべる。",
        lines: [
          { who: "ミオ", text: "シックスにティーンを" },
          { who: "ミオ", text: "くっつけて16！" },
          { who: "ソウタ", text: "シックスティーン！" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ミオ", look: "girl", x: 254, face: "smile", hand: [214, 222] },
            { who: "ソウタ", look: "boy", x: 86, face: "surprise", fx: "!" },
          ],
          props: [
            { kind: "table", x: 0, y: 240 },
            { kind: "board", x: 168, y: 220, s: 0.85, text: "six+teen" },
          ],
        },
      },
      {
        scene: "ソウタがはりきって「1＋teen」のカードを作る。ミオがあわてて止める。",
        lines: [
          { who: "ソウタ", text: "じゃあ11は" },
          { who: "ソウタ", text: "ワンティーンだ！" },
          { who: "ミオ", text: "11と12はとくべつ！" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ソウタ", look: "boy", x: 254, face: "shout", fx: "idea", hand: [212, 222] },
            { who: "ミオ", look: "girl", x: 86, face: "sweat", fx: "sweat" },
          ],
          props: [
            { kind: "table", x: 0, y: 240 },
            { kind: "board", x: 168, y: 220, s: 0.85, text: "1+teen?" },
          ],
        },
      },
      {
        scene: "ミオが「20＋1」のカードを指さす。ソウタはにっこり。",
        lines: [
          { who: "ミオ", text: "20からはトゥエンティに" },
          { who: "ミオ", text: "ワンをつなげて21" },
          { who: "ソウタ", text: "あとは組み立てだ！" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ミオ", look: "girl", x: 254, face: "smile", hand: [214, 222] },
            { who: "ソウタ", look: "boy", x: 86, face: "smile", fx: "idea" },
          ],
          props: [
            { kind: "table", x: 0, y: 240 },
            { kind: "board", x: 168, y: 220, s: 0.85, text: "20+1" },
          ],
        },
      },
    ],
    note: "ソウタとミオは架空《かくう》の小学生で、会話はすべて創作《そうさく》です。-teen がもとは ten（10）だったこと、eleven・twelve が「1のこり」「2のこり」という意味の古い言葉から生まれたと考えられていることは、英語《えいご》の歴史《れきし》の研究にもとづいています。",
  },
  mistakes: [
    {
      wrong: "11 を oneteen、12 を twoteen と言う",
      right: "11 は eleven、12 は twelve",
      why: "11と12は、-teen のきまりを使わない特別《とくべつ》な言い方です。",
    },
    {
      wrong: "40 を fourty と書く",
      right: "40 は forty",
      why: "four（4）とちがって、40 には u が入りません。",
    },
    {
      wrong: "thirteen と thirty を同じように言う",
      right: "-teen は後ろ、-ty は前を強く言う",
      why: "強く言う所がちがうので、聞く人はそこで13か30かを聞き分けます。",
    },
  ],
  check: [
    { q: "「15」は英語《えいご》で何と言う？", a: "fifteen", why: "13〜19 は -teen がつきます。five ではなく fif になります。" },
    { q: "「40」は英語《えいご》で何と言う？", a: "forty", why: "10のまとまりの数は -ty。four の u はつきません。" },
    { q: "How many apples? と聞かれました。りんごが3こなら？", a: "Three.", why: "How many? には数で答えます。" },
  ],
  next: [
    { label: "「数の言い方」のカード", href: "/learn/eigo-sho/e-english-34-kazu" },
    { label: "図解《ずかい》レクチャー「あいさつと気持ち」", href: "/learn/lecture/e-english-34-aisatsu" },
    { label: "「色・形の言い方」のカード", href: "/learn/eigo-sho/e-english-34-iro-katachi" },
  ],
};
