import type { Lecture } from "../types";

const C = "/media/commons/h-eng-gram-zenchishi";

export const H_ENG_GRAM_ZENCHISHI: Lecture = {
  unit: "h-eng-gram-zenchishi",
  title: "前置詞は名詞の前に置く目じるし。at は点、on は接触、in は中",
  hook: "at seven、on Sunday、in July。日本語ではどれも「〜に」ですが、英語では3つを使い分けます。前置詞ごとの基本のイメージをつかむと、丸暗記にたよらず、初めて見る組み合わせでも見当がつくようになります。",
  mystery: "ヴェルヌの冒険小説『八十日間世界一周』の主人公は、毎日 at the club, in the same room, at the same table で食事をします。日本語ならどれも「〜で」なのに、英語はなぜ、数語ごとに at と in を言い分けるのでしょう？",
  mission: {
    from: "海外旅行ガイドブックの編集者（英語の道案内ページ担当）",
    request: "若い旅行者向けに「英語で道をたずね、待ち合わせをする」ページを作っています。ところが読者アンケートでは「駅で待ち合わせたら、相手は改札の中、自分は駅前にいた」「at と in のちがいが、いくら覚えてもわからない」という声ばかり。世界一周の名作にかくれた前置詞の使い分けの理由を、名探偵のあなたに解き明かしてほしいのです。",
    thanks: "前置詞は、場所そのものではなく「話し手がその場所をどう見ているか」を表すのですね。待ち合わせのページに「点なら at、建物の中なら in」と地図つきで書けば、もう駅ですれちがう旅人は出ません。",
  },
  sections: [
    {
      heading: "前置詞＋名詞は、ひとまとまりで形容詞か副詞になる",
      body: "前置詞は名詞や代名詞の{{前}}に置き、「前置詞＋名詞」の{{まとまり（句）}}をつくります。このまとまりは、名詞を説明する{{形容詞}}のはたらき（the book on the desk）か、動詞などを説明する{{副詞}}のはたらき（I studied in the library.）をします。前置詞の後ろの代名詞は{{目的格}}、動詞を続けるなら{{動名詞}}（-ing）にします。",
      reading: [
        "前置詞は英語で preposition といいます。pre は「前に」、position は「置くこと」。名前のとおり、名詞の{{前}}に置く語です。日本語の「駅で」「机の上に」は、名詞のあとに「で」「に」がつくので、英語と順番がちょうど逆になります。英語を読むときは、at・on・in などが見えたら「ここから場所や時の説明が始まる」と身がまえ、後ろの名詞までを1つの{{まとまり（句）}}として読みます。",
        "このまとまりの役割は2つです。The book on the desk is mine. の on the desk は直前の名詞 book を説明する{{形容詞}}のはたらき。I put the book on the desk. の on the desk は動詞 put を説明する{{副詞}}のはたらきです。同じ形でも、何を説明しているかで役割が変わります。前置詞が名詞の前に立つ「旅のことば」であることは、1844年に詩人リディア・マリア・チャイルドが書いた感謝祭の詩の、今も歌われる題名 Over the River and Through the Wood（川をこえ、森をぬけて）によく表れています。over も through も前置詞で、題名だけでそりの道のりが目に浮かびます。",
        "下のスティーヴンソンの詩「ボートはどこへ行くの？」（1885年）は、川に浮かべたおもちゃのボートの行方を想像する子どもの歌です。with trees on either hand（両岸に木々をしたがえて）、down the valley（谷をくだって）と前置詞句が次々に重なり、ボートが遠くへ運ばれていく距離を感じさせます。おもしろいのは It flows along for ever. の along や On goes the river の on です。後ろに名詞がないので、ここでは前置詞ではなく{{副詞}}です。後ろに名詞があれば前置詞、なければ副詞。形で見分けましょう。",
        "前置詞の後ろは「名詞の席」です。だから代名詞は with him・between you and me のように{{目的格}}になり、動詞を置くなら without saying のように{{動名詞}}にします。主語＋動詞の文をそのまま置くことはできません。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "Dark brown is the river,\nGolden is the sand.\nIt flows along for ever,\nWith trees on either hand.\n\nGreen leaves a-floating,\nCastles of the foam,\nBoats of mine a-boating—\nWhere will all come home?\n\nOn goes the river\nAnd out past the mill,\nAway down the valley,\nAway down the hill.\n\nAway down the river,\nA hundred miles or more,\nOther little children\nShall bring my boats ashore.",
        ja: "こげ茶色の川、\n金色の砂。\n川はいつまでも流れてゆく、\n両岸に木々をしたがえて。\n\n浮かんでゆく緑の葉、\n泡でできたお城、\n舟あそびするぼくのボート——\nみんな、どこに流れつくのだろう？\n\n川は先へ先へと流れ、\n水車小屋を通りすぎ、\nずっと谷をくだり、\nずっと丘をくだってゆく。\n\nずっと下流の、\n百マイルかそれより先で、\nよその小さな子どもたちが\nぼくのボートを岸に引きあげるだろう。",
        cite: "Robert Louis Stevenson, \"Where Go the Boats?\", A Child's Garden of Verses (1885)",
        source: "https://www.gutenberg.org/cache/epub/136/pg136.txt",
      }],
      photos: [
        {
          src: `${C}/road-winter.webp`, width: 800, height: 646,
          alt: "雪の野原を、2頭の馬が引くそりが走っている。そりには毛皮をかけた男女が乗り、奥に雪をかぶった家と木々が見える版画",
          caption: "「冬の道」（N・カリアー社のリトグラフ、1853年）。チャイルドの詩の家族も、こうした馬のそりで川をこえ（{{over}}）、森をぬけて（{{through}}）祖父の家へ向かう。",
          credit: { author: "Currier & Ives", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:The_road,_winter_-_O._Knirsch,_lith._LCCN93511164.jpg" },
        },
        {
          src: `${C}/child.webp`, width: 502, height: 450,
          alt: "黒い服の女性が、ポーチの手すりのそばで小さな本を読んでいる古い白黒写真",
          caption: "リディア・マリア・チャイルド（1802〜1880）。奴隷制の廃止や先住民の権利をうったえた作家。1844年、子ども向けの本に感謝祭の詩を発表した。",
          credit: { author: "作者不明", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Lydia_Maria_Child.jpg" },
        },
      ],
      figure: {
        type: "tree",
        title: "前置詞の後ろに来るもの",
        root: {
          label: "前置詞",
          tone: "navy",
          children: [
            { label: "名詞", sub: "on the desk", tone: "blue" },
            { label: "代名詞の目的格", sub: "with him", tone: "yellow" },
            { label: "動名詞", sub: "without saying", tone: "red" },
          ],
        },
        note: "前置詞の後ろに、主語＋動詞の文はそのまま続けられない。",
      },
      cliff: "では、几帳面な紳士の1日の1文に、なぜ at と in がまざるのでしょう？",
    },
    {
      heading: "at・on・in のイメージは、時にも場所にも使える",
      body: "{{at}} は「ここ」と指でさす{{点}}、{{on}} は表面に{{くっついている}}こと、{{in}} は広がりの{{中}}にあることを表します。時でも同じで、時刻は点なので at、日付や曜日は「その日の上」で on、月・年・季節は幅のある期間の中なので in です。in the morning でも、特定の日の朝なら on Monday morning になります。",
      reading: [
        "{{at}} は地図にピンを刺すように、場所を広さのない{{点}}としてとらえます。{{on}} は何かの表面に{{くっついている}}ことで、机の上だけでなく on the wall（かべに）、on the ceiling（天井に）のように横や下の面にも使います。{{in}} は囲まれた空間や広がりの{{中}}です。この3つのイメージは、時間にもそのまま使えます。時刻は時計の上の1点なので at seven、1日は暦の上に乗ったマスなので on Sunday、月や年は幅のある期間なので in July です。",
        "フランスの作家ジュール・ヴェルヌが1872年に新聞に連載し、翌年本になった『八十日間世界一周』は、すぐに英語にも訳されました。主人公フィリアス・フォッグは、ロンドンの紳士クラブ（リフォーム・クラブ）の会員で、時計のように正確な暮らしをする男です。下の1文を見てください。at the club、at hours mathematically fixed、in the same room、at the same table、at exactly midnight。1文の中に at と in が交互に現れます。",
        "クラブは、フォッグにとって毎日家から通う地図の上の1点なので at。部屋は四方を壁に囲まれた空間なので in。テーブルは「食卓につく」場所の1点なので at。真夜中12時ちょうどは時計の上の点なので at です。同じ「〜で」でも、英語は{{話し手がその場所をどう見ているか}}を前置詞で言い分けます。そしてこの1文は、時刻と場所を寸分もずらさない男の性格まで描いています。",
        "同じ駅でも、at the station は地図の上の「駅という地点」、in the station は「駅の建物の中」です。乗り物では、立って歩けるバスや電車は床の上に乗る感覚で on the bus、かがんで乗りこむ車は中に入る感覚で in the car と言います。形の大きさではなく、乗る人の感じ方で決まるのです。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "He breakfasted and dined at the club, at hours mathematically fixed, in the same room, at the same table, never taking his meals with other members, much less bringing a guest with him; and went home at exactly midnight, only to retire at once to bed.",
        ja: "彼は朝食も夕食もクラブでとった。時刻は数学のようにきっちり決まっていて、いつも同じ部屋の、同じテーブルだった。ほかの会員と食事をともにすることはなく、まして客を連れてくることなどなかった。そして真夜中の12時ちょうどに家に帰ると、すぐに寝床に入るのだった。",
        cite: "Jules Verne, Around the World in Eighty Days, Chapter I (1873; tr. George M. Towle)",
        source: "https://www.gutenberg.org/cache/epub/103/pg103.txt",
      }],
      photos: [
        {
          src: `${C}/verne.webp`, width: 800, height: 1120,
          alt: "白髪まじりの巻き毛と、あごひげの年配の男性の、胸から上の白黒の肖像写真",
          caption: "ジュール・ヴェルヌ（1828〜1905）。写真家ナダールが1878年ごろに撮影。鉄道と汽船で世界が「小さく」なった時代を、冒険小説にえがいた。",
          credit: { author: "Nadar", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:F%C3%A9lix_Nadar_1820-1910_portraits_Jules_Verne_(restoration).jpg" },
        },
      ],
      figure: {
        type: "compare",
        title: "at・on・in のちがい",
        columns: [{ title: "at", tone: "red" }, { title: "on", tone: "yellow" }, { title: "in", tone: "blue" }],
        rows: [
          { cells: ["点", "接触・上", "中・範囲"] },
          { cells: ["at 7:30", "on Friday", "in April"] },
          { cells: ["at noon", "on May 3", "in 2030"] },
          { cells: ["at the bus stop", "on the wall", "in the box"] },
        ],
        note: "at the station は「駅で（地点）」、in the station は「駅の建物の中で」。",
      },
      reveal: "英語の前置詞は、場所そのものではなく、話し手がその場所を{{点}}として見ているか、囲まれた{{中}}として見ているかを表します。フォッグにとってクラブとテーブルは毎日たどる地図の上の点なので at、部屋は壁に囲まれた空間なので in。日本語の「で」が1つで済ませるところを、英語は見方ごとに言い分けているのです。点から点へ時刻どおりに動く男だからこそ、その1日は at だらけになりました。",
      cliff: "その几帳面な男が、ある晩クラブで「80日」を賭けます。そこで使われた前置詞は？",
    },
    {
      heading: "by と until、for と during",
      body: "by は「〜{{までに}}」で、その時までに1回すませる{{期限}}を表します。until（till）は「〜{{までずっと}}」で、その時まで続く{{継続}}を表します。また、for は three days のような{{期間の長さ}}、during は the summer vacation のような{{特定の期間}}につけます。",
      reading: [
        "時の前置詞でまちがえやすいのが by と until です。Finish it by six. は「6時{{までに}}終わらせて」で、6時より前のどこかで1回すめばよい{{期限}}です。Wait here until six. は「6時{{までずっと}}ここで待って」で、6時まで同じ状態が続く{{継続}}です。合う動詞もちがい、by は finish・return・arrive のような「1回で終わる動作」、until は stay・wait・keep のような「続く動作」と組みます。",
        "期間を表す for と during も対になります。for three days のように for は「どれだけの長さか」を数字で言い、during the summer vacation のように during は「どの期間か」を名前で言います。during three days とは言いません。また in には「〜かけて」「〜で」と所要時間を表す使い方があります。in eighty days は「80日という期間の中で」、つまり80日以内にやりとげることです。",
        "『八十日間世界一周』の物語は、まさにこの in から動き出します。クラブでカードをしながら、会員たちは「世界は小さくなった」と言い合います。そこでフォッグは、下のように2万ポンドを賭けると宣言するのです。in eighty days or less と言ったあとで、in nineteen hundred and twenty hours（1920時間で）と時間に、さらに分に言い直すところに、点から点へ時刻どおりに生きる男の性格が出ています。賭けの条件は、12月21日の夜8時45分までに、この同じクラブの部屋にもどること。これは by で表す{{期限}}です。旅の終わりには、この期限をめぐる大どんでん返しが待っています。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "“I will bet twenty thousand pounds against anyone who wishes that I will make the tour of the world in eighty days or less; in nineteen hundred and twenty hours, or a hundred and fifteen thousand two hundred minutes. Do you accept?”",
        ja: "「どなたでも、望む方を相手に2万ポンド賭けましょう。わたしは80日以内に世界を一周してみせます。1920時間、つまり11万5200分以内に、です。お受けになりますか？」",
        cite: "Jules Verne, Around the World in Eighty Days, Chapter III (1873; tr. George M. Towle)",
        source: "https://www.gutenberg.org/cache/epub/103/pg103.txt",
      }],
      photos: [
        {
          src: `${C}/reform-club.webp`, width: 800, height: 1157,
          alt: "豪華な部屋で、小さなテーブルを囲んでカードをする紳士たちと、そばに立って見守る男性たちの白黒の挿絵",
          caption: "1873年の初版の挿絵（ヌヴィルとブネット画）。リフォーム・クラブでカードのテーブルを囲む会員たち。この席の会話から「80日以内」の賭けが始まる。",
          credit: { author: "Alphonse de Neuville, Léon Benett", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:%27Around_the_World_in_Eighty_Days%27_by_Neuville_and_Benett_06.jpg" },
        },
      ],
      figure: {
        type: "compare",
        title: "by と until",
        columns: [{ title: "by", tone: "red" }, { title: "until", tone: "blue" }],
        rows: [
          { label: "意味", cells: ["〜までに（期限）", "〜までずっと（継続）"] },
          { label: "例", cells: ["Finish it by six.", "Wait here until six."] },
          { label: "合う動詞", cells: ["finish, return など", "stay, wait など"] },
        ],
      },
      cliff: "賭けの前、会員たちは because を使って言い争っていました。because と because of は何がちがう？",
    },
    {
      heading: "2語以上で1つの前置詞：群前置詞",
      body: "because of（〜のために）、in spite of（〜にもかかわらず）、instead of（〜のかわりに）のように、2語以上で1つの前置詞のようにはたらくものを{{群前置詞}}といいます。後ろには名詞が来るので、同じ意味の接続詞 because・though とちがい、{{主語＋動詞}}の文は続けられません。",
      reading: [
        "because of（〜のために）、in spite of（〜にもかかわらず）、instead of（〜のかわりに）、according to（〜によれば）、in front of（〜の前に）、thanks to（〜のおかげで）のように、2語以上が組んで1つの前置詞としてはたらくものを{{群前置詞}}といいます。1語の前置詞と同じく、後ろには名詞か動名詞が来ます。",
        "意味が似ていても、品詞がちがえば後ろに来るものが変わります。because は{{接続詞}}なので後ろに{{主語＋動詞}}の文が来ますが、because of は前置詞なので名詞が来ます。下の場面で、会員のスチュアートは because you can go round it と、because のあとに文を続けています。同じ文には a strange way of proving のように、前置詞 of のあとに動名詞を置く形も入っています。そして彼が three months（3か月）と言いかけたところで、フォッグが In eighty days と、前置詞句だけでさえぎるのです。",
        "この小説がもっともらしく読めたのは、当時の交通が本当に変わったからです。1869年にスエズ運河が開通し、同じ年にアメリカ大陸横断鉄道がつながり、翌1870年にはインドを横断する鉄道も結ばれました。作中の新聞が示す旅程は、From Suez to Bombay, by steamer（スエズからボンベイまで、汽船で）、From Bombay to Calcutta, by rail（ボンベイからカルカッタまで、鉄道で）のように、from・to・by だけで書かれています。手段の by のあとの名詞に a や the がつかないことにも注目しましょう。前置詞だけで、世界一周の地図が描けるのです。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "“You have a strange way, Ralph, of proving that the world has grown smaller. So, because you can go round it in three months—”\n“In eighty days,” interrupted Phileas Fogg.",
        ja: "「ラルフ、きみは世界が小さくなったことを、ずいぶん妙なやり方で証明するんだね。つまり、3か月で一周できるからといって——」\n「80日で、です」と、フィリアス・フォッグがさえぎった。",
        cite: "Jules Verne, Around the World in Eighty Days, Chapter III (1873; tr. George M. Towle)",
        source: "https://www.gutenberg.org/cache/epub/103/pg103.txt",
      }],
      figure: {
        type: "formula",
        title: "接続詞と群前置詞の書きかえ",
        prose: true,
        steps: [
          { expr: "We stayed home {{because}} it rained.", note: "接続詞：後ろは文" },
          { expr: "We stayed home {{because of}} the rain.", note: "群前置詞：後ろは名詞" },
          { expr: "{{In spite of}} the rain, we went out.", note: "＝ Though it rained, we went out." },
        ],
      },
    },
  ],
  story: {
    kind: "novel",
    title: "川をこえ、森をぬけて——そりの上の at と in",
    paragraphs: [
      "1873年11月の終わり、ボストン。モントリオールから叔父の家に来て半年になる十二歳のアデルは、暖炉の前で、英語に訳されたばかりの『八十日間世界一周』を開いていた。フランス語の新聞で夢中になった話を、英語で読みなおしたかったのだ。けれど一文目から指が止まった。He breakfasted and dined at the club, ... in the same room, at the same table. 「フランス語なら à ひとつで済むところに、英語は at を使ったり in を使ったり。どうしてなの？」",
      "翌朝は感謝祭だった。アデルは、いとこのネッドの一家といっしょに、馬のそりで郊外の農場へ向かった。毛皮のひざかけの下で、叔母さんが小さな声で古い詩を口ずさんだ。子どものころ本で覚えたという、川をこえ、森をぬけて、おじいさんの家へ行く歌だ。ネッドが笑った。「over the river、through the wood、to grandfather's house。前置詞の行進だね」",
      "凍った川にかかる橋をわたるとき、叔父さんが手袋の手で空に弧をかいた。「{{over}} は、上をこえて向こう側へ」。やがて、そりは雪をかぶった枝のトンネルに入った。「{{through}} は、中に入って、反対側から出る」。アデルは目をみはった。前置詞は、ただの小さな単語じゃない。動きの絵なのだ。",
      "農場に着くと、白いひげのおじいさんが、アデルの本をのぞきこんだ。そして古い地図を広げ、ロンドンにピンを1本刺した。「{{at}} は、このピンだ。毎日通うクラブは、この男にとって地図の上の1点だから at the club。だが部屋は四方を壁に囲まれている。箱の中だから {{in}} the same room。食卓は、腰をおろす場所の1点だから at the same table。真夜中12時ちょうども、時計の上の点だから at exactly midnight さ」",
      "アデルはページをめくった。From London to Suez ... by rail and steamboats。「じゃあ、この本は、ピンからピンへわたっていく話なのね」。おじいさんはうなずいた。「そうとも。そして in eighty days。旅のぜんぶを、80日という箱の中におさめてみせようという賭けだ」",
      "夕方、台所の大きなテーブルに七面鳥が運ばれてきた。アデルはノートを開いて、ゆっくり書いた。at grandfather's house、in the kitchen、on the table。家はピン、台所は箱、七面鳥はテーブルの上。書き終えて顔を上げると、窓の外では、雪の森の上に、まるい月がのぼりはじめていた。",
    ],
    note: "アデル、ネッドの一家、おじいさんと、その会話・心情は創作です。チャイルドが1844年に子ども向けの本で感謝祭の詩（祖父の家へそりで向かう内容）を発表したこと、感謝祭が1863年から全国の祝日になったこと、ヴェルヌの小説が1872年に新聞に連載され1873年に本になり同じころ英訳が出たこと、作中の英文（Towle の英訳）は事実・原作にもとづいています。",
  },
  mistakes: [
    { wrong: "I was born in May 5.", right: "I was born on May 5.", why: "日付は「その日」なので on。月だけなら in May です。" },
    { wrong: "Please return the book until Friday.", right: "Please return the book by Friday.", why: "金曜までに1回返す「期限」なので by。until は「ずっと続く」ときに使います。" },
    { wrong: "Thank you for help me.", right: "Thank you for helping me.", why: "前置詞 for の後ろに動詞を置くときは動名詞にします。" },
    { wrong: "In spite of it rained, we went out.", right: "In spite of the rain, we went out.（Though it rained, …）", why: "in spite of は前置詞なので、後ろに文は続けられません。" },
  ],
  check: [
    { q: "I usually get up ___ six.", a: "at", why: "時刻は「点」なので at。" },
    { q: "We stayed in Nara ___ three days.", a: "for", why: "three days は期間の長さ。特定の期間なら during。" },
    { q: "The game was put off ___ ___ the heavy snow.（大雪のために）", a: "because of", why: "後ろが名詞 the heavy snow なので群前置詞 because of。" },
  ],
  next: [
    { label: "4択ドリル「前置詞」に挑戦", href: "/learn/eibunpo-ko/h-eng-gram-zenchishi" },
    { label: "つぎの単元「接続詞」", href: "/learn/eibunpo-ko/h-eng-gram-setsuzokushi" },
    { label: "関連「動名詞」（前置詞の後ろの -ing）", href: "/learn/eibunpo-ko/h-eng-gram-domeishi" },
  ],
};
