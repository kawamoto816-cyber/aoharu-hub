import type { Lecture } from "../types";

const C = "/media/commons/j-en-1-kakokei";

export const J_EN_1_KAKOKEI: Lecture = {
  unit: "j-en-1-kakokei",
  title: "過去形は動詞の形で「時」を示す。否定・疑問は did、be動詞は was / were",
  hook: "「きのうサッカーをした」「去年は京都にいた」。日本語は「〜した」と語尾で過去を表しますが、英語は動詞そのものの形を変えます。日記や思い出話、テストの長文の多くは過去の話なので、過去形を正しく作れることがとても大切です。",
  mystery: "イギリスの古い童謡に Jack and Jill went up the hill（ジャックとジルは丘をのぼった）という一節があります。go の過去形は、なぜ goed ではなく went なのでしょう？　しかも go・come・see・have のように、いちばんよく使う動詞ほど形がばらばらなのはなぜでしょう？",
  mission: {
    from: "地域FM局で英語の童謡番組を担当するラジオDJ",
    request: "番組に小学生からはがきが届きました。「Jack and Jill went up the hill の went は、go の過去形なのに、なんで goed じゃないの？　英語っていじわる？」。来週の放送で、英語を習いはじめた子どもたちが「なるほど」と思える答えを届けたいのです。名探偵のあなたに、不規則動詞のなぞを解いてほしいのです。",
    thanks: "よく使うことばほど、昔の形が口から口へ伝わって残った。不規則動詞は英語の「古い化石」だったのですね。放送では「goed とまちがえたのは、-ed の規則をちゃんと身につけた証拠だよ」と、はがきの子に伝えます。",
  },
  sections: [
    {
      heading: "一般動詞の過去形：-ed をつける動詞と、形が変わる動詞",
      body: "多くの動詞は終わりに{{-ed}}をつけて過去形にします（play → played）。e で終わる語は -d だけ、「子音字＋y」は y を i にかえて -ed（study → studied）です。一方、go → went、see → saw のように{{形がまったく変わる不規則動詞}}もあり、これは1つずつ覚えます。過去形は主語に関係なく{{同じ形}}で、三単現の -s のような区別はありません。",
      reading: [
        "英語で「〜した」と言うときは、動詞の形を変えます。いちばん多いのは、終わりに{{-ed}}をつける{{規則動詞}}です。I play soccer.（サッカーをする）が I played soccer yesterday.（きのうサッカーをした）になります。live のように e で終わる語は -d だけ（lived）、study のように「子音字＋y」で終わる語は y を i にかえて studied、stop のように「短い母音＋子音字」で終わる語は最後の字を重ねて stopped。現在形の三単現の -s とちがい、過去形は主語が I でも he でも{{同じ形}}です。",
        "-ed は、つづりは同じでも読み方が3通りあります。jumped・looked・laughed のように、息だけで出す音（p・k・f など）のあとでは「ト」に近い /t/。played・lived のように、のどがふるえる音のあとでは /d/。wanted・needed のように t・d で終わる語では「イド」/ɪd/ と1音節ふえます。どれも、直前の音から自然に口を動かした結果です。声に出して読むと、すぐに体で覚えられます。",
        "このちがいを耳で楽しめるのが、イギリスで何百年も歌われてきた{{マザーグース}}（伝承童謡）の「ヘイ・ディドル・ディドル」です。ネコがバイオリンをひき、ウシが月をとびこえ、お皿がスプーンと走り去る、ナンセンスな歌です。jumped と laughed は規則動詞で、どちらも -ed を「ト」と読みます。ところが最後の ran（run の過去形）だけは -ed がつきません。形がまったく変わる、これが{{不規則動詞}}です。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "Hey, diddle, diddle!\nThe cat and the fiddle,\nThe cow jumped over the moon;\nThe little dog laughed\nTo see such sport,\nAnd the dish ran away with the spoon.",
        ja: "ヘイ・ディドル・ディドル！\nネコがバイオリンをひいて、\nウシが月をとびこえた。\n小イヌは笑った、\nそんなおふざけを見て。\nそしてお皿は、スプーンといっしょに走って逃げた。",
        cite: "Mother Goose, \"The Cat and the Fiddle\" (The Real Mother Goose, 1916)",
        source: "https://www.gutenberg.org/ebooks/10607",
      }],
      photos: [
        {
          src: `${C}/hey-diddle.webp`, width: 345, height: 300,
          alt: "塀の上でバイオリンをひくネコ、三日月の下で高くとび上がるウシ、塀の前で踊るブタと小イヌの絵",
          caption: "コールデコットの絵本『ヘイ・ディドル・ディドル』（1882年）。ウシが月に向かってとび上がる。jumped・laughed は{{規則動詞}}、ran は{{不規則動詞}}。",
          credit: { author: "Randolph Caldecott", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Hey_diddle_diddle_and_Baby_bunting_pg_8.jpg" },
        },
      ],
      figure: {
        type: "tree",
        title: "一般動詞の過去形の作り方",
        root: {
          label: "一般動詞",
          children: [
            {
              label: "規則動詞",
              sub: "-ed をつける",
              tone: "blue",
              children: [
                { label: "played", sub: "ふつうは -ed" },
                { label: "liked", sub: "e で終わる → -d" },
                { label: "studied", sub: "子音字＋y → ied" },
                { label: "stopped", sub: "短母音＋子音字 → 重ねる" },
              ],
            },
            {
              label: "不規則動詞",
              sub: "形が変わる",
              tone: "red",
              children: [
                { label: "go → went" },
                { label: "have → had" },
                { label: "come → came" },
              ],
            },
          ],
        },
      },
      cliff: "では「〜しなかった」「〜した？」は、どう言うのでしょう？　ran のままでいいの？",
    },
    {
      heading: "否定文・疑問文は did ＋ 原形",
      body: "一般動詞の過去の否定文は動詞の前に{{did not（didn't）}}、疑問文は文の頭に{{Did}}を置きます。主語が何でも did です。過去であることは did が示すので、あとの動詞は{{原形}}にもどします。played も went も、did のあとでは play・go です。",
      reading: [
        "現在の文で don't・doesn't を使ったように、過去の文では{{did}}を使います。I watched TV.（テレビを見た）の否定は I didn't watch TV.（見なかった）、疑問は Did you watch TV?（見た？）。答えは Yes, I did. / No, I didn't. です。do と does の使い分けが、過去では did の1つにまとまるので、主語が he でも they でも迷いません。",
        "大事なのは、did のあとの動詞を{{原形}}にもどすことです。「過去」というしるしは、1つの文に1回つければ十分です。did がすでに「過去だよ」と知らせているので、動詞まで過去形にすると、しるしが二重になってしまいます。だから Did you went? ではなく Did you go?、He didn't came. ではなく He didn't come. です。",
        "マザーグースの「靴に住むおばあさん」は、そのお手本です。大きな靴の家に住むおばあさんには子どもが多すぎて、どうしたらいいかわからない――という出だしで、was・lived・had の過去形が続いたあと、didn't know（わからなかった）が出てきます。know の過去形は knew ですが、didn't のあとでは原形の know。子どもが口ずさむ唄の中で、文法がきちんと働いています。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "There was an old woman who lived in a shoe.\nShe had so many children she didn't know what to do.",
        ja: "靴の中に住むおばあさんがいました。\n子どもがあまりに多くて、どうしたらいいかわかりませんでした。",
        cite: "Mother Goose, \"There Was an Old Woman\" (The Real Mother Goose, 1916)",
        source: "https://www.gutenberg.org/ebooks/10607",
      }],
      photos: [
        {
          src: `${C}/old-woman-shoe.webp`, width: 385, height: 487,
          alt: "夕日を背に、頭巾をかぶり、かごとかさを持って立つ、赤い服のおばあさんの絵",
          caption: "デンスロウの絵本『マザーグース』（1901年）の「靴に住むおばあさん」。デンスロウは『オズの魔法使い』の初版の絵も描いた。唄には{{didn't know}}が出てくる。",
          credit: { author: "W. W. Denslow", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:There_Was_An_Old_Woman_Who_Lived_In_A_Shoe_-_WW_Denslow_-_Project_Gutenberg_etext_18546.jpg" },
        },
      ],
      figure: {
        type: "formula",
        title: "She went to the library. を書きかえる",
        prose: true,
        steps: [
          { expr: "She {{went}} to the library.", note: "肯定文：go の過去形 went" },
          { expr: "She {{didn't go}} to the library.", note: "否定文：didn't＋原形" },
          { expr: "{{Did}} she {{go}} to the library?", note: "疑問文：Did を文の頭へ" },
          { expr: "— Yes, she {{did}}. / No, she {{didn't}}.", note: "答えも did で" },
        ],
        note: "現在の do / does が、過去では主語に関係なく did になる。",
      },
      cliff: "唄の出だしの There was の was。be動詞の過去形には、もう1つの形があります。",
    },
    {
      heading: "be動詞の過去形は was と were の2つ",
      body: "be動詞の過去形は、am・is が{{was}}、are が{{were}}になります。否定文・疑問文は現在と同じく、be動詞のあとに not、be動詞を主語の前へ出して作ります。be動詞の文では did は使いません。",
      reading: [
        "be動詞の過去形は2つだけです。am と is は{{was}}、are は{{were}}。I was tired.（つかれていた）、They were in the gym.（体育館にいた）のように使います。否定は wasn't・weren't、疑問は Was he at home?（家にいた？）のように be動詞を前へ出します。be動詞の文には did を使いません。I didn't busy. ではなく I wasn't busy. です。",
        "was のくり返しが世界でいちばん有名な小説の書き出しの一つが、イギリスの作家{{ディケンズ}}が1859年に発表した『二都物語』です。舞台はフランス革命のころのロンドンとパリ。2つの町を行き来する人々の運命を描き、今も世界じゅうで読まれ、劇や映画にもなっています。その1行目は、It was で始まる短い文を、反対の意味の語と組み合わせて次々に重ねていきます。",
        "best（いちばんよい）と worst（いちばん悪い）、wisdom（知恵）と foolishness（おろかさ）、belief（信じること）と incredulity（疑うこと）。「よい時代だった。でも悪い時代でもあった」と、was が鐘のように鳴るたびに、読者は希望と不安が入りまじった時代へ引きこまれます。むずかしい単語はわからなくても、It was … を声に出すだけで、物語の幕が上がる感じがつかめるはずです。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, …",
        ja: "それは最良の時代であり、最悪の時代でもあった。知恵の時代であり、おろかさの時代でもあった。信じる時代であり、疑う時代でもあった……",
        cite: "Charles Dickens, A Tale of Two Cities, Book the First, Chapter I (1859)",
        source: "https://www.gutenberg.org/ebooks/98",
      }],
      photos: [
        {
          src: `${C}/two-cities.webp`, width: 365, height: 576,
          alt: "中央に「A TALE OF TWO CITIES」の題字、上にロンドンの町並み、まわりに人々の場面が細かく描かれた白黒の表紙",
          caption: "『二都物語』が1859年に月ごとの分冊で売られたときの表紙（絵はフィズ）。上はロンドンの町。この小説は{{It was}}のくり返しで始まる。",
          credit: { author: "Hablot Knight Browne (Phiz)", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Cover_for_A_Tale_of_Two_Cities,_by_Phiz.jpeg" },
        },
      ],
      figure: {
        type: "compare",
        title: "現在と過去の be動詞",
        columns: [{ title: "主語" }, { title: "現在" }, { title: "過去", tone: "yellow" }],
        rows: [
          { cells: ["I", "am", "was"] },
          { cells: ["he / she / it / 1人・1つ", "is", "was"] },
          { cells: ["you / we / they / 複数", "are", "were"] },
        ],
        note: "例：I was busy yesterday. / Were you at home? — Yes, I was.",
      },
      cliff: "物語はなぜ過去形で語られるのか。「時」を示すことばに、その手がかりがあります。",
    },
    {
      heading: "過去を示すことばといっしょに使う",
      body: "過去形の文には、{{yesterday}}（きのう）、{{last 〜}}（この前の〜）、{{〜 ago}}（〜前に）などのことばがよくいっしょに出てきます。文の中にこうしたことばを見つけたら、動詞を過去形にする合図です。last week、two days ago、then（そのとき）なども覚えておきましょう。",
      reading: [
        "過去形の文には、「いつ」を示すことばがよくついてきます。{{yesterday}}（きのう）、yesterday morning（きのうの朝）、{{last}} night（昨夜）、last year（去年）、three days {{ago}}（3日前に）、then（そのとき）、one day（ある日）。last は「この前の」なので、last Sunday は「この前の日曜日」です。ago は数字のうしろに置き、two hours ago（2時間前）のように使います。こうしたことばを見つけたら、動詞を過去形にする合図です。",
        "英語の昔話は、たいてい Once upon a time, there was ……（むかしむかし、……がいました）で始まります。日本の「むかしむかし、あるところに」と同じ役目です。最初に「これは過去の話」と合図を出せば、あとは過去形で語りつづけられます。物語の多くが過去形で書かれるのは、語り手が「もう起きたこと」として、聞き手に順に伝えていくからです。",
        "1830年、アメリカの作家セアラ・ジョセファ・ヘイルは、少女メアリーの子羊が、ある日（one day）学校までついてきてしまう詩を発表しました。Mary had a little lamb（メアリーは小さな子羊を飼っていた）で始まる、この過去形の詩は歌になって広まります。1877年の暮れ、発明家{{エジソン}}は、声を記録して再生する機械「蓄音機」を試すとき、この唄を吹きこんだと後に語っています。録音した人の声を機械で再生できた、最初期の瞬間の一つです。",
      ],
      photos: [
        {
          src: `${C}/edison-phonograph.webp`, width: 800, height: 1008,
          alt: "いすに座ったスーツ姿の若い男性が、テーブルの上の、円筒とハンドルのついた機械に手をそえている白黒写真",
          caption: "1878年ごろ、ワシントンの写真館で撮影されたエジソンと、すず箔の蓄音機。ハンドルを回して円筒に音を刻んだ。試しに吹きこんだのは、過去形の唄だった。",
          credit: { author: "Levin C. Handy (Brady-Handy Collection)", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Edison_and_phonograph_edit2.jpg" },
        },
      ],
      cliff: "最後に、いよいよなぞの核心へ。go の過去形は、なぜ goed ではないのでしょう？",
    },
    {
      heading: "不規則動詞はなぜある？　――よく使うことばに残った古い形",
      body: "英語の不規則動詞は、昔の英語の過去形の作り方が残ったものです。多くの動詞はやがて{{-ed}}の形にそろいましたが、{{毎日のように使う動詞}}は古い形のまま覚えられ、受けつがれました。新しくできた動詞は、すべて -ed の規則動詞になります。",
      reading: [
        "千年ほど前の英語（{{古英語}}）には、過去形の作り方が大きく2つありました。1つは語の終わりに音を足すやり方で、これが今の -ed になりました。もう1つは、語の中の母音を変えるやり方です。sing → sang、drink → drank、ride → rode、come → came などは、その名残です。昔はこの「母音を変える動詞」がもっとたくさんありました。",
        "ところが何百年もたつうちに、多くの動詞が -ed の側へ移っていきました。たとえば help の過去形は、昔は holp のような形でしたが、今は helped です。規則に合わせたほうが覚えやすいからです。それでも、go・come・see・have・make・take・say のように{{毎日何度も使う動詞}}は、古い形が口から口へ伝わり、そのまま残りました。よく使うことばは、規則で組み立てるより「まるごと」覚えてしまうからです。英語でいちばんよく使われる動詞（be・have・do・say・go など）が、そろって不規則動詞なのはそのためです。",
        "went には、さらに変わった歴史があります。went は、もともと wend（行く・進む）という別の動詞の過去形でした。go にも昔は独自の過去形がありましたが、使われなくなり、500年ほど前までに went が go の過去形の座におさまったのです。一方、今生まれる新しい動詞は、text → texted のように必ず -ed になります。小さな子どもが goed や runned と言うのは、-ed の規則をちゃんと身につけた証拠なのです。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "Jack and Jill went up the hill,\nTo fetch a pail of water;\nJack fell down, and broke his crown,\nAnd Jill came tumbling after.",
        ja: "ジャックとジルは丘をのぼった、\nバケツに水をくみに。\nジャックはころんで頭をぶつけ、\nジルもころころ転がり落ちた。",
        cite: "Mother Goose, \"Jack and Jill\" (The Real Mother Goose, 1916)",
        source: "https://www.gutenberg.org/ebooks/10607",
      }],
      figure: {
        type: "compare",
        title: "不規則動詞の3つのタイプ",
        columns: [{ title: "タイプ" }, { title: "例", tone: "yellow" }],
        rows: [
          { label: "母音が変わる", cells: ["古英語の作り方の名残", "sing → sang / come → came / ride → rode"] },
          { label: "別の語が入った", cells: ["もとは別の動詞の過去形", "go → went（wend の過去形から）"] },
          { label: "形が同じ", cells: ["現在と過去が同じつづり", "put → put / cut → cut / read → read"] },
        ],
        note: "read の過去形はつづりは同じでも「レッド」と読む。",
      },
      reveal: "went は、go の「いじわる」ではなく、英語の歴史が残した化石です。昔の英語には母音を変えて過去形を作る動詞がたくさんあり、多くはやがて{{-ed}}にそろいましたが、毎日何度も使う go・come・see・have などは、古い形がまるごと覚えられて生き残りました。しかも went は、別の動詞 wend の過去形が go の過去形の座に入ったもの。いちばんよく使う動詞ほど不規則なのは、よく使うからこそ、昔の形が忘れられなかったからなのです。",
    },
  ],
  story: {
    kind: "novel",
    title: "声が過去形になった夜",
    paragraphs: [
      "1877年の暮れ、ニュージャージー州メンロパーク。十二歳のハリーは、丘の上の木造の研究所に、毎日の夕方、町の店からランプの油を届けていた。二階の長い部屋はいつも、機械油と、焼けた電線のにおいがした。その日、部屋の真ん中の机には、見たことのない機械が置かれていた。真ちゅうの円筒にハンドルがつき、円筒にはうすい{{すず箔}}が巻いてある。",
      "職人たちが机のまわりに集まり、だれも口をきかない。ハリーは油の缶をかかえたまま、戸口で足を止めた。やせた若い男の人――ここの主の{{エジソン}}さんが、円筒の前の小さな口に顔を近づけ、ハンドルを回しながら、大きな声で童謡を歌うように読みあげた。ハリーも妹に何度も歌ってやった、メアリーと子羊の唄だった。",
      "エジソンさんは手を止め、針を円筒の始めにもどした。そして、もう一度ハンドルを回す。かすかな、かすれた、けれどまちがいなく人の声が、機械の中から聞こえてきた。「{{Mary had a little lamb}}……」。部屋じゅうの大人が息をのんだ。だれかの手から、ねじまわしが床に落ちた。ハリーは背中がぞくっとした。機械がしゃべった。いや、ちがう。さっきの声が、もう一度やってきたのだ。",
      "帰り道、ハリーは何度もその声を思い返した。メアリーは子羊を飼っていた。子羊はどこへでもついていった。唄はぜんぶ、もう起きたことを語っている。そして、あの機械から聞こえた声も、ほんの一分前に言われた、もう過ぎた声だった。過ぎていった時間を、すず箔が閉じこめていた。",
      "家に帰ると、八歳の妹のアニーが、待ちきれないように聞いた。「{{Did it really talk?}}（ほんとうにしゃべったの？）」。ハリーは胸をはって答えた。「{{Yes, it did.}}」。アニーは目を丸くして、子羊の唄を小さな声で歌いはじめた。ハリーは、明日の朝、この唄の声も、あの円筒に閉じこめられたら、と思った。",
      "その夜、ハリーは日記帳を開き、ゆっくり書いた。{{Today I went to the laboratory. A machine talked. The men were quiet. I was very surprised.}}　書き終えて読み返すと、どの文も過去形だった。今日のできごとは、もう全部「きのう」に向かって進みはじめている。でも、紙に書いた文は、すず箔の声と同じように、何度でも読み返せる。ハリーはランプを消し、暗い天井を見上げて、もう一度つぶやいた。「Mary had a little lamb」。",
    ],
    sayFix: { "真ちゅう": "しんちゅう", "主": "あるじ", "円筒": "えんとう" },
    note: "ハリーと妹のアニー、その会話・日記・心情は創作です。1877年の暮れ、ニュージャージー州メンロパークの研究所で、エジソンがすず箔を巻いた円筒式の蓄音機を試し、「メアリーの子羊」の唄を吹きこんで再生したことは、エジソン本人の回想などにもとづく史実です（正確な日付ははっきりしていません）。作中でエジソンが話すのはこの唄の言葉だけで、それ以外のせりふはつくっていません。",
  },
  mistakes: [
    { wrong: "Did you went to the park?", right: "Did you go to the park?", why: "did を使ったら、あとの動詞は原形にもどします。" },
    { wrong: "I didn't busy yesterday.", right: "I wasn't busy yesterday.", why: "busy は形容詞で、この文の動詞は be動詞。be動詞の否定は was not（wasn't）です。" },
    { wrong: "We was happy.", right: "We were happy.", why: "are の過去形は were。we・you・they・複数の主語には were を使います。" },
    { wrong: "He goed to school.", right: "He went to school.", why: "go は不規則動詞で、過去形は went です。" },
  ],
  check: [
    { q: "I (study) math last night. の（ ）を正しい形に。", a: "studied", why: "last night があるので過去形。子音字＋y は y を i にかえて -ed。" },
    { q: "Ken watched TV. を疑問文にしましょう。", a: "Did Ken watch TV?", why: "Did を文の頭へ出し、watched は原形 watch にもどす。" },
    { q: "They ___ in Osaka two years ago. の ___ に入る be動詞は？", a: "were", why: "two years ago で過去。主語 they は複数なので were。" },
  ],
  next: [
    { label: "4択ドリル「過去形」に挑戦", href: "/learn/eibunpo-chu/j-en-1-kakokei" },
    { label: "前の単元「一般動詞」のレクチャー", href: "/learn/lecture/j-en-1-ippan" },
    { label: "つぎに「過去進行形」", href: "/learn/eibunpo-chu/j-en-2-kako-shinko" },
  ],
};
