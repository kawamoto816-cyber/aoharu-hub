import type { Lecture } from "../types";

const C = "/media/commons/j-en-3-bunshi";

export const J_EN_3_BUNSHI: Lecture = {
  unit: "j-en-3-bunshi",
  title: "分詞は名詞を説明する。「している」は -ing、「された」は過去分詞",
  hook: "「ベンチで寝ているねこ」「日本で作られた車」。こうした説明つきの名詞は、英語では {{-ing 形}}や{{過去分詞}}を使って表せます。説明が2語以上になると名詞のうしろに回るので、長文を読むときに「どこまでが名詞のかたまりか」を見ぬく力にもなります。",
  mystery: "ワーズワースの名詩「水仙」で、詩人は a host of dancing Daffodils と、dancing を花の前に置きました。ところが2行あとでは Ten thousand dancing in the breeze と、同じ dancing をうしろに回しています。同じ単語なのに、なぜ置き場所が変わるのでしょう？",
  mission: {
    from: "湖のほとりの植物園の英語ガイド担当",
    request: "春の「水仙まつり」で、ワーズワースの詩を英語と日本語で紹介する案内板を作ります。手伝いの学生に「詩人は dancing を花の前にもうしろにも置いている。案内板に dancing daffodils in the breeze と書いてもいいですか？」と聞かれ、答えに困りました。外国からのお客さまにも恥ずかしくない案内板にするために、名探偵のあなたに dancing の置き場所のなぞを解いてほしいのです。",
    thanks: "1語なら名詞の前、語句がついたら名詞のうしろ。案内板は daffodils dancing in the breeze と書けばよいのですね。詩人が花を先に見せ、それから風に踊る姿を見せた順番も、案内で話してみます。",
  },
  sections: [
    {
      heading: "分詞は形容詞のように名詞を説明する",
      body: "動詞の -ing 形（{{現在分詞}}）と{{過去分詞}}は、形容詞のように名詞を説明できます。現在分詞は「{{〜している}}」、過去分詞は「{{〜された・〜されている}}」という意味です。進行形の -ing、受け身の過去分詞と同じ形なので、意味もそのまま覚えられます。",
      reading: [
        "The cat is sleeping.（ねこが寝ている）の sleeping を名詞の前に出すと、a sleeping cat（寝ているねこ）になります。The window was broken.（窓が割られた）の broken を前に出せば、a broken window（割れた窓）です。このように、動詞の形のまま名詞を説明する語を{{分詞}}といいます。-ing 形を{{現在分詞}}、played や written などを{{過去分詞}}とよびます。進行形と受け身ですでに知っている形なので、意味も「〜している」「〜された」とそのまま考えれば大丈夫です。",
        "分詞を使うと、名詞に「動き」がつきます。a cat（ねこ）は止まった絵ですが、a sleeping cat には寝息が、a running dog（走っている犬）には足音が聞こえてきます。この力を生かした詩人が、イギリスの{{ワーズワース}}です。1802年4月、彼は妹のドロシーと湖水地方のアルズウォーター湖のほとりを歩き、林の下で風にゆれる水仙の大群に出会いました。その日の様子はドロシーの日記にも書き残されています。",
        "この体験から生まれたのが、1807年の『二巻の詩集』に収められた「水仙」（I wandered lonely as a Cloud）です。産業革命で町が大きく変わっていく時代に、自然の美しさと心の結びつきを歌ったこの詩は、のちにイギリスで最も愛される詩の1つになりました。詩の中には、dancing Daffodills（踊っている水仙）、sparkling waves（きらめく波）、laughing company（笑いさざめく仲間たち）と、{{現在分詞}}が次々に出てきます。花も波も、まるで生きているように動き出すのです。",
      ],
      photos: [
        {
          src: `${C}/daffodils-lake.webp`, width: 640, height: 480,
          alt: "池のほとりの芝生に、黄色い水仙の株がいくつも咲いている。奥に木立と家が見える",
          caption: "湖のほとりに咲く水仙（イギリス、グロスターシャー州のニューエント湖）。ワーズワースが見たのも、こうした水辺の林の下で{{風にゆれる}}水仙の群れだった。",
          credit: { author: "Pauline Eccles", license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0", source: "https://commons.wikimedia.org/wiki/File:Beside_the_lake,_beneath_the_trees_-_geograph.org.uk_-_704978.jpg" },
        },
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "I wandered lonely as a Cloud\nThat floats on high o'er Vales and Hills,\nWhen all at once I saw a crowd\nA host of dancing Daffodills;\nAlong the Lake, beneath the trees,\nTen thousand dancing in the breeze.\n\nThe waves beside them danced, but they\nOutdid the sparkling waves in glee:—\nA Poet could not but be gay\nIn such a laughing company:",
        ja: "わたしはひとりさまよっていた、谷や丘の上を\n高く流れていく雲のように。\nそのとき、ふいに目に入った、群れが、\n踊っている水仙の大群が。\n湖にそって、木々の下で、\n一万の花が、そよ風の中で踊っている。\n\nそばの波も踊っていた。けれど花たちは\nきらめく波よりも、もっと楽しげだった。\n詩人なら、心がはずまずにはいられない、\nこんなに笑いさざめく仲間の中では。",
        cite: "William Wordsworth, \"I wandered lonely as a Cloud\" (Poems in Two Volumes, 1807)",
        source: "https://www.gutenberg.org/ebooks/8824",
      }],
      figure: {
        type: "compare",
        title: "2つの分詞",
        columns: [{ title: "現在分詞", tone: "blue" }, { title: "過去分詞", tone: "yellow" }],
        rows: [
          { label: "形", cells: ["動詞の -ing 形", "played / written など"] },
          { label: "意味", cells: ["〜している", "〜された・されている"] },
          { label: "例", cells: ["a running boy", "a broken window"] },
        ],
      },
      cliff: "同じ dancing が、花の前にもうしろにも。置き場所を決めるルールとは？",
    },
    {
      heading: "1語なら前、2語以上ならうしろ",
      body: "分詞が{{1語だけ}}のときは、ふつうの形容詞と同じく名詞の{{前}}に置きます。分詞に「どこで」「だれによって」などの語句がついて{{2語以上}}になると、名詞の{{うしろ}}に置きます。これを{{後置修飾}}といいます。日本語にするときは、うしろから前へもどって訳します。",
      reading: [
        "a sleeping cat の sleeping は1語なので、名詞の{{前}}に置きます。ところが「ベンチで寝ている」と on the bench がつくと、a cat sleeping on the bench と名詞の{{うしろ}}に回ります。これが{{後置修飾}}です。日本語は「ベンチで寝ている」と説明がどんなに長くても名詞の前に置けますが、英語は長い説明を前に置くと、何の話なのかがなかなか出てきません。そこで、まず名詞を言い、そのあとで説明を足していくのです。",
        "ワーズワースの詩を見直してみましょう。4行目の a host of dancing Daffodills では、dancing は1語なので花の前。6行目の Ten thousand dancing in the breeze では、in the breeze（そよ風の中で）がついているので、dancing は ten thousand（一万の花）のうしろです。読者はまず「一万」という数におどろき、それから風に踊る姿を目にします。映画のカメラが、花畑の全体を映してから、ゆれる花にぐっと近づくような順番です。詩人はのちの1815年版で、前の dancing を golden（金色の）に変え、6行目は分詞を2つ重ねて「はためき、踊る」と書き直しました。それでも「1語は前、語句つきはうしろ」の形は変わりません。",
        "同じころ、ロンドンの詩人で版画家の{{ブレイク}}は、1794年に『経験の歌』を出しました。詩と絵を自分で銅版に彫って刷り、1枚ずつ手で色をぬった、世界に数少ない手作りの詩集です。その中の「虎」は Tyger, tyger, burning bright と始まります。burning bright（明るく燃えている）が、うしろから虎を説明しています。夜の森で、燃えるように光る目やしま模様。名前を2度呼んでから説明を足すことで、暗やみから虎がぬっと姿を現すような迫力が生まれています。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "Tyger, tyger, burning bright,\nIn the forests of the night,\nWhat immortal hand or eye\nCould frame thy fearful symmetry?",
        ja: "虎よ、虎よ、明るく燃えている虎よ、\n夜の森の中で。\nどんな不滅の手が、どんな目が、\nおまえのおそろしいほど整った姿を形づくれたのか？",
        cite: "William Blake, \"The Tyger\" (Songs of Experience, 1794)",
        source: "https://www.gutenberg.org/ebooks/574",
      }],
      photos: [
        {
          src: `${C}/tyger.webp`, width: 800, height: 1320,
          alt: "空色と黄土色で彩色されたページに、手書きの文字で詩が書かれ、下に1頭の虎がえがかれている",
          caption: "ブレイクが自分で刷って色をつけた「虎」のページ（『無垢と経験の歌』、1826年ごろ刷り）。1行目に Tyger Tyger, burning bright。{{burning bright}}がうしろから虎を説明する。",
          credit: { author: "William Blake", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Songs_of_Innocence_and_of_Experience,_copy_Z,_1826_(Library_of_Congress)_object_42_The_Tyger.jpg" },
        },
      ],
      figure: {
        type: "formula",
        title: "名詞のうしろに回るとき",
        prose: true,
        steps: [
          { expr: "a {{sleeping}} cat", note: "1語：名詞の前（寝ているねこ）" },
          { expr: "a cat {{sleeping on the bench}}", note: "語句がつくとうしろへ（ベンチで寝ているねこ）" },
          { expr: "Look at {{the cat sleeping on the bench}}.", note: "文の中では1つの名詞のかたまり" },
        ],
      },
      reveal: "置き場所を決めたのは、分詞が何語かです。a host of dancing Daffodills の dancing は1語なので名詞の前。Ten thousand dancing in the breeze は in the breeze がついて2語以上なので、名詞のうしろに回る{{後置修飾}}になりました。だから案内板も daffodils dancing in the breeze が正しい形です。名詞を先に見せ、説明をあとから足す英語の順番が、花の群れから風に踊る姿へと近づく、カメラのような効果を生んでいたのです。",
      cliff: "-ing と過去分詞、どちらを選ぶ？　歴史に残る演説がヒントになります。",
    },
    {
      heading: "-ing か過去分詞かは「する側・される側」",
      body: "どちらを使うか迷ったら、説明される名詞が{{その動作をする側}}か、{{される側}}かを考えます。the boy と play なら、少年はプレーする側なので the boy {{playing}} soccer。a language と speak なら、言語は話される側なので a language {{spoken}} in many countries です。",
      reading: [
        "水仙は自分で踊る側なので dancing、虎は自分で燃える（光る）側なので burning でした。では、a letter と write ならどうでしょう。手紙は自分では書きません。「書かれる側」なので a letter {{written}} in English（英語で書かれた手紙）です。a crying baby（泣いている赤ちゃん）と a broken heart（傷ついた心）を比べると、赤ちゃんは自分で泣く側、心はこわされる側だとわかります。名詞と動詞を主語と動詞の関係に置きかえて、The baby cries. か The heart is broken. かを考えると、迷いません。",
        "{{過去分詞}}の後置修飾を、歴史に残る形で使ったのが、1961年1月20日のアメリカ大統領就任演説です。前の晩に雪が降った寒い朝、ワシントンの連邦議会議事堂の前で、43歳の{{ケネディ}}は、20世紀に生まれた初めての大統領として演説しました。彼は「たいまつは新しい世代のアメリカ人に引きつがれた」と語り、その世代を born in this century（この世紀に生まれ）、tempered by war（戦争できたえられ）、disciplined by a hard and bitter peace（きびしく苦い平和にしつけられ）と、過去分詞のかたまりで次々に説明しました。",
        "世代は、自分で生まれたり、自分をきたえたりしたのではありません。時代に「生まれさせられ」「きたえられ」てきた{{される側}}です。だから過去分詞が選ばれています。第二次世界大戦を戦い、その後も東西の対立の中で育った人々の経験が、by war、by a hard and bitter peace という「何によって」の語句とともに、名詞のうしろにたたみかけられます。聞く人は、自分たちが何を経てここに立っているのかを、1語ごとに思い出したことでしょう。",
      ],
      recite: [{
        lang: "en", voice: "male",
        text: "Let the word go forth from this time and place, to friend and foe alike, that the torch has been passed to a new generation of Americans—born in this century, tempered by war, disciplined by a hard and bitter peace, proud of our ancient heritage—and unwilling to witness or permit the slow undoing of those human rights to which this nation has always been committed, and to which we are committed today at home and around the world.",
        ja: "この時、この場所から、味方にも敵にも同じように伝えよう。たいまつは、新しい世代のアメリカ人に引きつがれたのだと。この世紀に生まれ、戦争できたえられ、きびしく苦い平和にしつけられ、わたしたちの古くからの伝統を誇りとする世代に。そして、この国がつねに守ると誓い、今日わたしたちが国の内でも世界じゅうでも守ると誓う人権が、少しずつそこなわれていくのを、見すごすことも許すこともしない世代に。",
        cite: "John F. Kennedy, Inaugural Address (1961)",
        source: "https://www.presidency.ucsb.edu/documents/inaugural-address-2",
      }],
      photos: [
        {
          src: `${C}/inauguration.webp`, width: 800, height: 771,
          alt: "白い丸屋根の大きな建物の前に演壇がつくられ、手前を大勢の人がうめつくしている白黒写真",
          caption: "1961年1月20日、ワシントンの連邦議会議事堂前で行われたケネディ大統領の就任式。この演説で、新しい世代を{{過去分詞}}のかたまりで説明した。",
          credit: { author: "Abbie Rowe", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:John_F._Kennedy_is_sworn_in_as_35th_President_of_the_United_States._United_States_Capitol,_Washington,_D.C._-_NARA_-_194170.jpg" },
        },
      ],
      figure: {
        type: "tree",
        title: "名詞と動作の関係で選ぶ",
        root: {
          label: "名詞は動作を…",
          children: [
            { label: "する側", sub: "現在分詞 -ing", tone: "blue", children: [{ label: "the boy playing soccer", sub: "サッカーをしている少年" }] },
            { label: "される側", sub: "過去分詞", tone: "yellow", children: [{ label: "a car made in Japan", sub: "日本で作られた車" }] },
          ],
        },
      },
      cliff: "説明が長くなると、文の本当の動詞が見えにくくなります。どう探す？",
    },
    {
      heading: "文の中では主語のかたまりに注意",
      body: "分詞のかたまりが主語の名詞についていると、文の{{本当の動詞}}がずっとうしろに来ます。The girl talking with Ken {{is}} my sister. の動詞は talking ではなく is です。主語のかたまりがどこで終わるかを見つけると、文の意味がすっきりわかります。",
      reading: [
        "The flowers growing by the lake are daffodils.（湖のそばに生えている花は水仙です）という文では、growing by the lake が The flowers をうしろから説明しています。主語のかたまりは The flowers growing by the lake まで。文の{{本当の動詞}}は are です。growing を動詞だと思って「花が湖のそばで育っている」と訳してしまうと、うしろの are daffodils が宙に浮いてしまいます。名詞のすぐあとに -ing 形や過去分詞が来たら、「ここから説明のかたまりが始まる」と心の中でカッコをつけましょう。",
        "過去分詞は、過去形と同じ形のものが多いので注意が必要です。The cake made by my mother was delicious.（母が作ったケーキはおいしかった）の made は、すぐあとに by my mother（母によって）が続いているので、ケーキが「作られた」という過去分詞です。本当の動詞は was。The poem written by Wordsworth is loved all over the world.（ワーズワースが書いた詩は世界じゅうで愛されている）も、主語のかたまりは Wordsworth まで、動詞は is です。主語が単数か複数かも、かたまりの先頭の名詞で決まります。",
        "「水仙」は今もイギリスの学校で暗唱され、湖水地方には詩人の住んだ家を訪ねる人が世界じゅうから集まります。ワーズワースは1843年、国を代表する詩人「桂冠詩人」に選ばれました。名詞を先に見せて、あとから動きや経験を足していく分詞は、英語の文章をいきいきとさせるカメラのような道具です。長い英文で迷ったときこそ、名詞のかたまりと本当の動詞を見つけてみてください。",
      ],
      photos: [
        {
          src: `${C}/wordsworth.webp`, width: 800, height: 1001,
          alt: "黒い服の白髪の老人が、腕を組んでうつむき、暗い山の岩場に立っている油絵",
          caption: "ヘイドン『ヘルヴェリン山のワーズワース』（1842年）。湖水地方の山に立つ、72歳ごろの{{ワーズワース}}。翌1843年に桂冠詩人に選ばれた。",
          credit: { author: "Benjamin Haydon", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Benjamin_Robert_Haydon_-_Wordsworth_on_Helvellyn_-_WGA11208.jpg" },
        },
      ],
      figure: {
        type: "flow",
        title: "主語のかたまりを見つける",
        steps: [
          { label: "The girl", sub: "名詞", tone: "navy" },
          { label: "talking with Ken", sub: "うしろから説明", tone: "blue" },
          { label: "is my sister.", sub: "本当の動詞", tone: "yellow" },
        ],
        note: "ケンと話している少女は私の姉（妹）です。",
      },
    },
  ],
  story: {
    kind: "manzai",
    title: "燃える虎と、ダンス部の水仙",
    cast: ["ハヤト", "シオリ"],
    lines: [
      { who: "ハヤト", text: "どうもー、ハヤトとシオリです！　今日は英語の詩で、春を感じたいと思います！" },
      { who: "シオリ", text: "いいね。どんな詩？" },
      { who: "ハヤト", text: "ワーズワースの水仙の詩。a host of dancing daffodils。水仙って、ダンス部に入ってるんだって。", say: "ワーズワースの水仙の詩。ア・ホスト・オブ・ダンシング・ダファディルズ。水仙って、ダンス部に入ってるんだって。" },
      { who: "シオリ", text: "部活じゃない！　dancing は{{現在分詞}}で「踊っている」。風にゆれる花が、踊っているように見えるってこと。", say: "部活じゃない！ ダンシングは現在分詞で、踊っている。風にゆれる花が、踊っているように見えるってこと。" },
      { who: "ハヤト", text: "じゃあ、ぼくも水仙を説明してみる。the dancing in the breeze daffodils！", say: "じゃあ、ぼくも水仙を説明してみる。ザ・ダンシング・イン・ザ・ブリーズ・ダファディルズ！" },
      { who: "シオリ", text: "前が渋滞してる！　説明が{{2語以上}}になったら、名詞の{{うしろ}}。daffodils dancing in the breeze だよ。", say: "前が渋滞してる！ 説明が二語以上になったら、名詞のうしろ。ダファディルズ・ダンシング・イン・ザ・ブリーズだよ。" },
      { who: "ハヤト", text: "なんでうしろに回すの？　前にまとめたほうが、すっきりするのに。" },
      { who: "シオリ", text: "名詞を先に言えば、何の話かすぐわかるでしょ。詩人も、まず花の群れを見せてから、風に踊る姿を見せてるの。" },
      { who: "ハヤト", text: "カメラが近づいていく感じか。じゃあ次はブレイク。Tyger, tyger, burning bright. 大変だ、虎が燃えてる！　消防車を呼んで！", say: "カメラが近づいていく感じか。じゃあ次はブレイク。タイガー、タイガー、バーニング・ブライト。大変だ、とらが燃えてる！ 消防車を呼んで！" },
      { who: "シオリ", text: "呼ばなくていい！　burning bright がうしろから虎を説明して「明るく燃えるような虎」。夜の森で光る目や、しま模様のたとえだよ。", say: "呼ばなくていい！ バーニング・ブライトがうしろからとらを説明して、明るく燃えるようなとら。夜の森で光る目や、しま模様のたとえだよ。" },
      { who: "ハヤト", text: "たとえか、ほっとした。じゃあ、これは？　This is a book writing by Soseki.", say: "たとえか、ほっとした。じゃあ、これは？ ディス・イズ・ア・ブック・ライティング・バイ・ソウセキ。" },
      { who: "シオリ", text: "本がペンを持って書いてるの？　本は{{書かれる側}}だから{{過去分詞}}の written。", say: "本がペンを持って書いてるの？ 本は書かれる側だから過去分詞のリトゥン。" },
      { who: "ハヤト", text: "する側なら -ing、される側なら過去分詞か。ケネディの演説の born in this century も、されるほう？", say: "する側ならイング形、される側なら過去分詞か。ケネディの演説のボーン・イン・ディス・センチュリーも、されるほう？" },
      { who: "シオリ", text: "そう。世代は「この世紀に生まれた」側。tempered by war は「戦争できたえられた」。過去分詞をたたみかけて、新しい世代を紹介したの。", say: "そう。世代は、この世紀に生まれた側。テンパード・バイ・ウォーは、戦争できたえられた。過去分詞をたたみかけて、新しい世代を紹介したの。" },
      { who: "ハヤト", text: "よし、兄の紹介もこれでいく。The boy playing tennis are my brother.", say: "よし、兄の紹介もこれでいく。ザ・ボーイ・プレイング・テニス・アー・マイ・ブラザー。" },
      { who: "シオリ", text: "主語は the boy で1人！　playing tennis は説明のかたまり。{{本当の動詞}}は is だよ。", say: "主語はザ・ボーイでひとり！ プレイング・テニスは説明のかたまり。本当の動詞はイズだよ。" },
      { who: "ハヤト", text: "テニスが主語じゃないの？　ボールをたくさん打つから、複数かと思った。" },
      { who: "シオリ", text: "テニスは関係ない！　主語のかたまりがどこで終わるかを見つけるのがコツ。" },
      { who: "ハヤト", text: "わかった。じゃあ最後に、ぼくのことを英語で。a boy loved by everyone.", say: "わかった。じゃあ最後に、ぼくのことを英語で。ア・ボーイ・ラブド・バイ・エブリワン。" },
      { who: "シオリ", text: "形はかんぺき。「みんなに愛されている少年」。……それ、自分で言う？" },
      { who: "ハヤト", text: "ちゃんと by everyone がついて2語以上だから、うしろに回しておいたよ。", say: "ちゃんとバイ・エブリワンがついて二語以上だから、うしろに回しておいたよ。" },
      { who: "シオリ", text: "置き場所の問題じゃない！　もういいよ。" },
      { who: "ハヤト", text: "どうも、ありがとうございました！" },
    ],
    note: "ハヤトとシオリは架空の人物で、会話はすべて創作です。ワーズワース「水仙」（1807年）、ブレイク「虎」（1794年）、ケネディ大統領の就任演説（1961年）の英文と背景は、原文と史実にもとづいています。",
  },
  mistakes: [
    { wrong: "Look at the sleeping on the bench cat.", right: "Look at the cat sleeping on the bench.", why: "語句がついて2語以上になった分詞は、名詞のうしろに置きます。" },
    { wrong: "This is a book writing by Soseki.", right: "This is a book written by Soseki.", why: "本は「書かれる側」なので過去分詞 written を使います。" },
    { wrong: "The boy playing tennis are my brother.", right: "The boy playing tennis is my brother.", why: "主語は the boy（1人）。tennis につられて動詞の形をまちがえないこと。" },
  ],
  check: [
    { q: "「英語で書かれた手紙」：a letter ( ) in English。( ) に write の正しい形を。", a: "written", why: "手紙は書かれる側なので過去分詞。" },
    { q: "the man standing by the door の意味は？", a: "ドアのそばに立っている男の人", why: "standing by the door が the man をうしろから説明している。" },
    { q: "a (crying) baby と a baby (crying) in the room、正しいのはどちら？", a: "両方とも正しい", why: "1語なら名詞の前、in the room がつくと名詞のうしろ。" },
  ],
  next: [
    { label: "4択ドリル「分詞の後置修飾」に挑戦", href: "/learn/eibunpo-chu/j-en-3-bunshi" },
    { label: "うしろから説明するなかま「関係代名詞」", href: "/learn/lecture/j-en-3-kankei" },
    { label: "ふりかえり「不定詞の発展」", href: "/learn/lecture/j-en-3-futeishi" },
  ],
};
