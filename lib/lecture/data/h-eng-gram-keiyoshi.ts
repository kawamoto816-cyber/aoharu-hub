import type { Lecture } from "../types";

const C = "/media/commons/h-eng-gram-keiyoshi";

export const H_ENG_GRAM_KEIYOSHI: Lecture = {
  unit: "h-eng-gram-keiyoshi",
  title: "形容詞は名詞を、副詞はそれ以外を説明する。置く場所にも決まりがある",
  hook: "a happy girl の happy は girl を、She sang happily. の happily は sang を説明しています。形容詞と副詞は「何を説明するか」がちがい、取りちがえると文法問題でも英作文でも減点されます。数や量の言い方、置く位置もあわせて整理しましょう。",
  mystery: "キーツの長い詩『エンディミオン』の第1行 A thing of beauty is a joy for ever は、200年たった今も英語圏でことわざのように引用されます。a beautiful thing と言えば短くすむのに、なぜキーツは形容詞 beautiful を使わず、わざわざ名詞 beauty を後ろに置いたのでしょう？",
  mission: {
    from: "グリーティングカード会社の文案係",
    request: "来春の新しいカードに、英語のひと言を入れることになりました。「美しいものは永遠の喜び」を a beautiful thing で書いて出したら、先輩に「キーツはそう書かなかった。そこに理由がある」と返されてしまったのです。名詞にかかることばの置き方ひとつで何が変わるのか、名探偵のあなたに解き明かしてほしいのです。",
    thanks: "形容詞を名詞のかたちで後ろに回すと、「美」そのものが主役になるのですね。カードのひと言も、何をいちばん重く見せたいかを考えて、ことばを置く場所から選びます。",
  },
  sections: [
    {
      heading: "形容詞の2つの使い方",
      body: "形容詞には、名詞の前に置いて直接説明する{{限定用法}}（a sleeping baby）と、be動詞などの後ろで{{補語}}になる{{叙述用法}}（The baby is asleep.）があります。asleep・alive・afraid など a- で始まる語の多くは叙述用法だけ、main・only・elder などは限定用法だけで使います。something や anyone を説明する形容詞は{{後ろ}}に置きます（something cold）。",
      reading: [
        "形容詞の仕事は、名詞に「どんな？」の情報を足すことです。a tall tree のように名詞の前に置いて直接くっつける使い方を{{限定用法}}、The tree is tall. のように be動詞や become・look などの後ろに置いて、主語の様子を述べる使い方を{{叙述用法}}といいます。叙述用法の形容詞は文の{{補語}}になります。asleep（眠っている）や alive（生きている）のように a- で始まる語は、もともと on sleep のような「前置詞＋名詞」から生まれた語で、名詞の前には置けず、叙述用法だけで使います。",
        "形容詞は名詞の前、が基本ですが、{{後ろ}}に置く場合もあります。something cold のように -thing・-one・-body の語を説明するとき、そして形容詞に別の語句がついて長くなったときです。a box full of toys（おもちゃでいっぱいの箱）は、full of toys がひとかたまりなので、box の後ろに回ります。英語は、重く長いかたまりを後ろに置くことを好む言葉なのです。",
        "この「後ろに回る形容詞」を、詩の中であざやかに使ったのが、イギリスの詩人ジョン・キーツです。ロンドンの貸し馬屋の家に生まれ、外科医の見習いとして病院で学んだあと、医師の道を捨てて詩人になりました。22歳で書き上げた長い詩『エンディミオン』（1818年）は、次の行で始まります。4行目の A bower quiet for us（わたしたちのための静かな木陰）では quiet for us が、5行目の a sleep Full of sweet dreams（甘い夢に満ちた眠り）では Full of sweet dreams が、名詞の後ろに回っています。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "A thing of beauty is a joy for ever:\nIts loveliness increases; it will never\nPass into nothingness; but still will keep\nA bower quiet for us, and a sleep\nFull of sweet dreams, and health, and quiet breathing.",
        ja: "美しいものは、とこしえの喜び。\nその愛らしさは増すばかりで、決して\n無へと消えはしない。いつまでも守ってくれる、\nわたしたちのための静かな木陰を。そして眠りを――\n甘い夢と、すこやかさと、静かな寝息に満ちた眠りを。",
        cite: "John Keats, Endymion, Book I (1818)",
        source: "https://www.gutenberg.org/cache/epub/24280/pg24280.txt",
      }],
      photos: [
        {
          src: `${C}/keats-severn.webp`, width: 592, height: 800,
          alt: "窓辺の椅子にすわり、片手で頭をささえながらひざの上の本を読む若い男性を描いた油絵",
          caption: "友人の画家ジョゼフ・セヴァーンが描いたキーツ。ロンドン北部ハムステッドの家で本を読む姿で、キーツの死後に描かれた。25歳で亡くなった詩人の、もっとも知られた肖像の一つ。",
          credit: { author: "Joseph Severn", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Joseph_Severn_(1793-1879)_-_John_Keats_-_NPG_58_-_National_Portrait_Gallery.jpg" },
        },
      ],
      figure: {
        type: "compare",
        title: "限定用法と叙述用法",
        columns: [{ title: "限定用法", tone: "blue" }, { title: "叙述用法", tone: "yellow" }],
        rows: [
          { label: "置く所", cells: ["名詞の前", "be動詞などの後ろ"] },
          { label: "例", cells: ["a sleeping baby", "The baby is asleep."] },
          { label: "こちら専用", cells: ["main, only, elder", "asleep, alive など"] },
        ],
      },
      cliff: "「たくさん」と「少し」の言い方は、名詞の種類で選ぶ語が変わります。",
    },
    {
      heading: "数えられるかどうかで「多い・少ない」を選ぶ",
      body: "「たくさん」「少し」は、名詞が{{数えられる}}かどうかで語が変わります。many・a few・few は数えられる名詞の複数形に、much・a little・little は数えられない名詞に使います。a がつくと「{{少しある}}」と肯定的、a がないと「{{ほとんどない}}」と否定的な意味になります。",
      reading: [
        "英語の名詞は、1つ・2つと{{数えられる}}もの（book, friend, idea）と、決まった形がなく数えられないもの（water, money, information, advice）に分かれます。数や量を表す形容詞は、この区別に合わせて選びます。many friends は言えても much friends とは言えず、much advice は言えても many advices とは言えません。日本語の「たくさん」は1つですが、英語では名詞の種類が語を決めるのです。",
        "a few と few、a little と little のちがいは、量の大小より話し手の気持ちにあります。I have a few friends here.（ここには友だちが何人かいる）は「いるよ」という前向きな言い方、I have few friends here.（ここには友だちがほとんどいない）は「さびしい」という否定の言い方です。同じ2〜3人でも、どちらの面を見るかで a の有無が変わります。few・little は not を使わずに否定の意味を出せるので、書きことばでよく使われます。",
      ],
      figure: {
        type: "compare",
        title: "数・量を表す形容詞",
        columns: [{ title: "数えられる名詞", tone: "blue" }, { title: "数えられない名詞", tone: "yellow" }],
        rows: [
          { label: "たくさん", cells: ["many books", "much water"] },
          { label: "少しある", cells: ["a few books", "a little water"] },
          { label: "ほとんどない", cells: ["few books", "little water"] },
        ],
        note: "a lot of / lots of はどちらの名詞にも使える。",
      },
      cliff: "では、名詞以外を説明する仕事は、だれが引き受けているのでしょう？",
    },
    {
      heading: "副詞は名詞以外を説明する",
      body: "副詞は{{動詞}}・{{形容詞}}・{{ほかの副詞}}、さらに{{文全体}}を説明します。形容詞に -ly をつけた形が多いですが（careful → carefully）、friendly や lovely は -ly で終わっても形容詞です。名詞を説明できるのは形容詞だけなので、「注意深い運転手」は a careful driver、「注意深く運転する」は drive carefully です。",
      reading: [
        "形容詞が名詞の係なら、{{副詞}}はそれ以外ぜんぶの係です。She runs fast. の fast は動詞を、very tall の very は形容詞を、too quickly の too はほかの副詞を説明します。Luckily, nobody was hurt.（幸い、だれもけがをしなかった）の Luckily は、文全体に「幸いなことに」という話し手の見方を加えています。見分けるコツは、「その語を取ったら、何の情報が消えるか」を考えることです。",
        "-ly がつけば副詞、とは限りません。lovely（愛らしい）、friendly（親しみやすい）、lonely（さびしい）は、名詞に -ly がついてできた{{形容詞}}です。キーツの第2行の loveliness（愛らしさ）は、形容詞 lovely に -ness をつけた名詞でした。副詞にしたいときは in a friendly way のように言いかえます。",
        "『エンディミオン』は、このあと次のように続きます。文頭の Therefore（それだから）は、前の5行と次の内容を結ぶ副詞です。flowery（花の）、inhuman（むごい）、noble（気高い）、gloomy（陰うつな）、dark（暗い）と形容詞が次々に名詞にかかり、つらい世の中を描いたうえで、最後に moves away the pall の away（取りのけて）という副詞が、暗い幕が動いていく向きを示します。形容詞が「景色」を、副詞が「動き」を受け持っているのです。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "Therefore, on every morrow, are we wreathing\nA flowery band to bind us to the earth,\nSpite of despondence, of the inhuman dearth\nOf noble natures, of the gloomy days,\nOf all the unhealthy and o'er-darkened ways\nMade for our searching: yes, in spite of all,\nSome shape of beauty moves away the pall\nFrom our dark spirits.",
        ja: "だからこそ、来る朝ごとに、わたしたちは編んでいる。\n自分を大地につなぎとめる、花の帯を。\nどれほど気がふさいでも、気高い心がむごいほどに\n乏しくても、陰うつな日々が続いても、\nわたしたちがさまよい探すために用意された、\n不健全で暗く閉ざされた道ばかりでも。そう、何があろうと、\n何かしら美しい姿が、わたしたちの暗い心から\n黒いとばりを取りのけてくれる。",
        cite: "John Keats, Endymion, Book I (1818)",
        source: "https://www.gutenberg.org/cache/epub/24280/pg24280.txt",
        say: "Therefore, on every morrow, are we wreathing a flowery band to bind us to the earth, spite of despondence, of the inhuman dearth of noble natures, of the gloomy days, of all the unhealthy and ore-darkened ways made for our searching: yes, in spite of all, some shape of beauty moves away the pall from our dark spirits.",
      }],
      figure: {
        type: "tree",
        title: "副詞が説明するもの",
        root: {
          label: "副詞",
          tone: "navy",
          children: [
            { label: "動詞", sub: "run fast", tone: "yellow" },
            { label: "形容詞", sub: "very tall", tone: "blue" },
            { label: "ほかの副詞", sub: "too quickly", tone: "blue" },
            { label: "文全体", sub: "Luckily, …", tone: "red" },
          ],
        },
        note: "名詞を説明するのは形容詞の仕事。副詞は名詞を説明しない。",
      },
      cliff: "「決して〜ない」の never は、文のどこに置けばよいのでしょう？",
    },
    {
      heading: "頻度の副詞は「どのくらいよく」と置き場所",
      body: "always・usually・often・sometimes・rarely などの{{頻度の副詞}}は、ふつう{{一般動詞の前}}、{{be動詞・助動詞の後ろ}}に置きます（I often walk to school. / She is always busy.）。頻度の高さは、おおよそ下の順です。rarely・seldom・never は否定の意味をふくむので、not といっしょには使いません。",
      reading: [
        "「どのくらいよく」を表す{{頻度の副詞}}は、置き場所がほぼ決まっています。一般動詞なら{{その前}}（I usually get up at six.）、be動詞なら{{その後ろ}}（He is often late.）、助動詞があれば{{助動詞の後ろ}}です（You can always ask me.）。「動詞の部分の、いちばん最初の語のあたり」と覚えると迷いません。",
        "キーツの第2〜3行 it will never Pass into nothingness（決して無へと消えはしない）は、この規則どおりです。never は助動詞 will の後ろ、動詞 pass の前に置かれています。その次の but still will keep（それでもなお守ってくれる）の still は「今も変わらず」を表す副詞で、こちらは will の前に出ています。詩では語順をくずすことも多いのですが、ここでは「決して消えない」「なお守る」という2つの副詞が、美しいものの喜びがいつまでも続くことを支えています。",
        "キーツはこの詩を出した1818年の暮れから、ロンドン北部ハムステッドの家に住み、翌1819年に「ナイチンゲールに寄せる頌歌」「ギリシアの壺に寄せる頌歌」など、英文学に残る名作を続けて書きました。「ギリシアの壺」の書き出しの still は、「まだ（一度も汚されていない）」の副詞とも、「静かな」の形容詞とも読めることで知られています。1語の品詞の読み方が、詩の味わいまで変えるのです。",
      ],
      photos: [
        {
          src: `${C}/keats-house.webp`, width: 800, height: 379,
          alt: "緑の木々にかこまれた、白い2階建ての家と、その右に続く淡い緑色の建物",
          caption: "ロンドン北部ハムステッドのキーツ・ハウス（左の白い家）。キーツが1818〜20年に暮らし、1819年に頌歌の名作を書いた家で、今は記念館になっている。",
          credit: { author: "Cj1340", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Keats_House.jpg" },
        },
      ],
      figure: {
        type: "area",
        kind: "bar",
        title: "頻度の副詞（高い順・目安）",
        max: 100,
        bars: [
          { label: "always", parts: [{ value: 100, tone: "navy" }], total: "いつも" },
          { label: "usually", parts: [{ value: 80, tone: "blue" }], total: "たいてい" },
          { label: "often", parts: [{ value: 60, tone: "blue" }], total: "よく" },
          { label: "sometimes", parts: [{ value: 40, tone: "yellow" }], total: "ときどき" },
          { label: "rarely", parts: [{ value: 10, tone: "red" }], total: "めったに〜ない" },
        ],
        note: "帯の長さはおおよその目安。never は「一度も〜ない」で0にあたる。",
      },
      cliff: "たった2文字の -ly で、意味が正反対になる副詞があります。",
    },
    {
      heading: "-ly がつくと意味が変わる副詞",
      body: "hard（熱心に）と hardly（{{ほとんど〜ない}}）のように、-ly がつくと意味が大きく変わる副詞があります。late（遅く）と lately（{{最近}}）、near（近くに）と nearly（{{ほとんど・もう少しで}}）も同じです。He works hard. と He hardly works. は正反対の意味になります。",
      reading: [
        "hard・late・near・high などは、形容詞と同じ形のまま副詞としても使えます。He works hard.（彼は熱心に働く）の hard は副詞です。ところが -ly をつけた hardly は「熱心に」ではなく「{{ほとんど〜ない}}」という否定の副詞になり、He hardly works.（彼はほとんど働かない）と正反対の意味になります。I have been busy lately.（{{最近}}忙しい）、I nearly missed the bus.（もう少しでバスに乗り遅れるところだった）も、もとの語とは別の意味です。",
        "hardly は never や rarely と同じく、それ自体に否定の意味をふくむので、not といっしょには使いません。また、頻度の副詞と同じく、一般動詞の前、be動詞・助動詞の後ろに置きます（I can hardly believe it.）。-ly がついたら「どの意味になったか」を辞書で一度確かめる習慣が、英作文での思わぬ取りちがえを防ぎます。",
      ],
      cliff: "最後に、キーツがなぜ beautiful を使わなかったのか、その理由に迫ります。",
    },
    {
      heading: "of＋抽象名詞は、後ろから名詞を説明する形容詞のかたまり",
      body: "{{of＋抽象名詞}}は、形容詞と同じはたらきをします（of importance＝important、of use＝useful）。名詞の後ろに置いて、a man of courage（勇気のある人）のように使います。形容詞1語より改まった言い方で、性質そのものを名詞として目立たせる効果があります。",
      reading: [
        "This is a matter of importance.（これは重要な問題だ）の of importance は、important と同じ意味の形容詞のかたまりです。このように、{{of＋抽象名詞}}は名詞の後ろから「どんな？」を説明します。of value（価値のある）、of help（役に立つ）、of no use（役に立たない）のように、叙述用法で The book is of great value. と言うこともできます。",
        "では、a beautiful thing と a thing of beauty は何がちがうのでしょう。a beautiful thing では主役は thing で、beautiful はその性質の1つにすぎません。a thing of beauty では、{{beauty（美）という名詞}}が文の最後にどっしりと立ち、物は美を宿す「入れもの」のように見えてきます。同じ下宿にいた医学生の後年の回想によれば、キーツははじめ A thing of beauty is a constant joy と書き、「何か足りない」と言われて joy for ever に直したといいます。constant という形容詞を、joy の後ろの for ever に変えたのです。",
        "キーツは1821年、結核のため25歳でローマに没しました。自分の名を墓に刻ませず、「その名を水に書かれし者、ここに眠る」という意味のことばだけを残したといわれます。けれど、名詞の後ろに置かれた「美」と「とこしえ」は、詩人の名より長く人々の記憶に残りました。詩の中の形容詞・副詞の置き場所を味わうと、文法は「正しさの規則」から「伝え方の技」に変わります。",
      ],
      photos: [
        {
          src: `${C}/keats-urn.webp`, width: 335, height: 500,
          alt: "取っ手のついた古代の壺に、衣をまとった人々が並ぶ様子をペンで写した素描。下に By John Keats と書かれている",
          caption: "キーツ自身がペンで写した古代ギリシアの壺（ソシビオスの壺）の素描。こうした壺の絵が、1819年の「ギリシアの壺に寄せる頌歌」につながったと考えられている。",
          credit: { author: "John Keats", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Keats_urn.jpg" },
        },
        {
          src: `${C}/keats-grave.webp`, width: 800, height: 1091,
          alt: "木かげに立つ白い墓石。上に竪琴の浮き彫りがあり、下に英語の碑文と Feb 24th 1821 の文字が刻まれている",
          caption: "ローマのプロテスタント墓地にあるキーツの墓。名前はなく「若い英国の詩人」とだけ記され、最後に「その名を水に書かれし者、ここに眠る」の意味の一文が刻まれている。",
          credit: { author: "Piero Montesacro", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0", source: "https://commons.wikimedia.org/wiki/File:John_Keats_Tombstone_in_Rome_01.jpg" },
        },
      ],
      figure: {
        type: "formula",
        title: "形容詞1語と、of＋抽象名詞",
        prose: true,
        steps: [
          { label: "1語", expr: "a {{beautiful}} thing", note: "主役は thing。beautiful は性質の1つ" },
          { label: "かたまり", expr: "a thing {{of beauty}}", note: "名詞の後ろから説明。beauty が目立つ" },
          { label: "同じ型", expr: "a matter {{of importance}} ＝ an important matter", note: "of＋抽象名詞＝形容詞" },
        ],
        note: "a THING of BEAU-ty IS a JOY for EV-er と、弱い音と強い音が交互に並ぶリズムにもなっている。",
      },
      reveal: "a thing of beauty の of beauty は、beautiful と同じはたらきをする{{of＋抽象名詞}}です。ただし形容詞1語とちがって名詞の後ろに置かれるので、物ではなく「美」そのものが主役として立ちます。物はいつか朽ちても、美は「決して無へと消えない」という次の行の内容と、この語順がぴったり重なるのです。さらに、弱い音と強い音が交互に並ぶ英詩のリズムにも乗り、口ずさみやすい1行になりました。",
    },
  ],
  story: {
    kind: "manga4",
    title: "ハードリー勉強した！",
    panels: [
      {
        scene: "テスト明けの教室。ソウタが胸をはってユイに報告する。",
        lines: [
          { who: "ソウタ", text: "英語のテスト勉強" },
          { who: "ソウタ", text: "ハードリーやった！" },
          { who: "ユイ", text: "えらいね…ん？" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ソウタ", look: "boy", x: 256, face: "smile", fx: "!", hand: [214, 222] },
            { who: "ユイ", look: "girl", x: 84, face: "think", fx: "?" },
          ],
          props: [
            { kind: "table", x: 0, y: 244 },
            { kind: "book", x: 190, y: 228, s: 0.85 },
          ],
        },
      },
      {
        scene: "ユイが札を出す。札に「ほとんど〜ない」。ソウタがあせる。",
        lines: [
          { who: "ユイ", text: "ハードリーは" },
          { who: "ユイ", text: "ほとんど〜ないだよ" },
          { who: "ソウタ", text: "やってない宣言！？" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ユイ", look: "girl", x: 256, face: "normal", hand: [214, 226] },
            { who: "ソウタ", look: "boy", x: 84, face: "sweat", fx: "sweat" },
          ],
          props: [
            { kind: "table", x: 0, y: 244 },
            { kind: "board", x: 150, y: 238, text: "ほとんど〜ない" },
          ],
        },
      },
      {
        scene: "先生が来て、札に「lately」と書く。",
        lines: [
          { who: "先生", text: "熱心には{{hard}}" },
          { who: "先生", text: "-lyで意味が変わる" },
          { who: "ソウタ", text: "レイトリーもか！" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "先生", look: "teacher", x: 250, face: "smile", hand: [200, 226] },
            { who: "ソウタ", look: "boy", x: 86, face: "surprise", fx: "idea" },
          ],
          props: [
            { kind: "table", x: 0, y: 244 },
            { kind: "board", x: 160, y: 238, text: "lately" },
          ],
        },
      },
      {
        scene: "答案が返ってくる。ソウタが答案をかかげ、ユイが苦笑いする。",
        lines: [
          { who: "ソウタ", text: "点数はニアリー満点！" },
          { who: "ユイ", text: "使い方は正しいけど" },
          { who: "ユイ", text: "満点じゃないのね" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ソウタ", look: "boy", x: 256, face: "shout", fx: "!", hand: [214, 220] },
            { who: "ユイ", look: "girl", x: 84, face: "smile", fx: "sweat" },
          ],
          props: [
            { kind: "table", x: 0, y: 244 },
            { kind: "board", x: 150, y: 238, text: "nearly" },
          ],
        },
      },
    ],
    note: "ソウタ・ユイ・先生は架空の人物で、会話はすべて創作です。hard（熱心に）と hardly（ほとんど〜ない）、late と lately（最近）、nearly（もう少しで）の意味のちがいは英語の事実です。",
  },
  mistakes: [
    { wrong: "She speaks English very good.", right: "She speaks English very well.", why: "動詞 speaks を説明するのは副詞。good は形容詞なので well にします。" },
    { wrong: "I have a little friends in Osaka.", right: "I have a few friends in Osaka.", why: "friends は数えられる名詞の複数形なので a few を使います。" },
    { wrong: "I want cold something to drink.", right: "I want something cold to drink.", why: "-thing の語を説明する形容詞は後ろに置きます。" },
    { wrong: "I studied hardly for the test.", right: "I studied hard for the test.", why: "hardly は「ほとんど〜ない」。「熱心に」は hard です。" },
  ],
  check: [
    { q: "There is ___ milk in the bottle. Let's buy some.（ほとんどない）", a: "little", why: "milk は数えられない名詞で、「ほとんどない」なので a のない little。" },
    { q: "He is late for school. に always を入れると？", a: "He is always late for school.", why: "頻度の副詞は be動詞の後ろに置く。" },
    { q: "「眠っている赤ちゃん」a(n) ___ baby に入るのは sleeping / asleep のどちら？", a: "sleeping", why: "asleep は叙述用法だけで、名詞の前に置けない。" },
  ],
  next: [
    { label: "4択ドリル「形容詞・副詞」に挑戦", href: "/learn/eibunpo-ko/h-eng-gram-keiyoshi" },
    { label: "つぎの単元「前置詞」", href: "/learn/eibunpo-ko/h-eng-gram-zenchishi" },
    { label: "関連「比較」（形容詞・副詞の比較級）", href: "/learn/eibunpo-ko/h-eng-gram-hikaku" },
  ],
};
