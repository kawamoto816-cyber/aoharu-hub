import type { Lecture } from "../types";

const M = "/media/commons/h-eng-gram-meishi";

const OWL_SOURCE = "https://www.gutenberg.org/cache/epub/13650/pg13650.txt";

export const H_ENG_GRAM_MEISHI: Lecture = {
  unit: "h-eng-gram-meishi",
  title: "名詞は「数えられるか」、冠詞は「どれのことか相手に伝わるか」で決まる",
  hook: "日本語では「本を買った」「水を飲んだ」と、数を気にせずに言えます。ところが英語では、a book・books・water のように、名詞を使うたびに「数えられるか」「1つか2つ以上か」「どれのことか分かるか」を決めなければなりません。この判断の筋道をつかむと、英作文での小さなミスがぐっと減ります。",
  mystery: "イギリスで150年以上愛されてきた詩「フクロウと子ネコ」は、The Owl and the Pussy-Cat went to sea / In a beautiful pea-green boat と始まります。フクロウもネコもボートも、ここで初めて出てくるのに、なぜ動物には the、ボートには a がつくのでしょう？",
  mission: {
    from: "外国の絵本を訳している翻訳家",
    request: "いま、エドワード・リアの「フクロウと子ネコ」を日本語の絵本にしています。最初の1行を「あるフクロウとあるネコが」と訳すか、「フクロウとネコは」と訳すかで、物語の始まり方がまるで変わってしまうのです。訳を決めるために、名探偵のあなたに、初登場の動物に the がつくわけを解き明かしてほしいのです。",
    thanks: "the は「聞き手がどれか分かる」しるし。題名で紹介ずみの、名前のような二人だから the なのですね。これで最初の1行は「フクロウと子ネコは」と、おなじみの主人公として訳せます。",
  },
  sections: [
    {
      heading: "数えられる名詞・数えられない名詞",
      body: "英語の名詞は、{{数えられる名詞（可算名詞）}}と{{数えられない名詞（不可算名詞）}}に分かれます。決まった形や区切りがあるものは数えられ、液体や素材、形のない考えなどは数えられません。information・advice・furniture・homework・news は、日本語の感覚では数えられそうでも{{不可算名詞}}なので要注意です。",
      reading: [
        "エドワード・リア（1812〜1888年）は、ロンドン近郊で21人きょうだいの20番目として生まれたといわれる画家です。10代のころから鳥の絵で身を立て、20歳ごろにはオウムの仲間を描いた大型の図譜を出版しました。貴族の屋敷で動物を描く仕事をしていたとき、その家の子どもたちのために、おかしな人物が出てくる5行の詩と挿絵を作りました。これをまとめたのが1846年の『ナンセンスの本』で、AABBA と韻をふむ5行詩{{リメリック}}を世に広めました。1871年の詩集に入った「フクロウと子ネコ」は、いまもイギリスの子どもが最初に覚える詩の一つです。",
        "その第1連（下の朗読）に出てくる名詞を、数えられるかどうかで分けてみましょう。boat（ボート）、note（紙幣）、guitar（ギター）、star（星）は、1つ2つと区切れるので{{可算名詞}}です。だから a boat、the stars のように a や複数形の -s がつきます。一方、honey（はちみつ）は液体のように形が決まらない{{物質名詞}}、money（お金）は「金額」という中身を表すので{{不可算名詞}}です。おもしろいのは、同じお金でも note（紙幣）や coin（硬貨）は数えられること。数えられるかどうかは「物そのもの」ではなく、英語がそれを「区切りのある1個」と見るか、「ひとまとまりの量」と見るかで決まります。",
        "この見方を知ると、日本人がまちがえやすい語の理由が分かります。furniture（家具）は、いす・机・たんすをひとまとめにした呼び名なので数えられません。数えられるのは a chair・two desks のほうです。同じように baggage（手荷物）と bags、information（情報）・advice（助言）・news（知らせ）・homework（宿題）も、中身のまとまりを指す{{不可算名詞}}です。1つ、2つと言いたいときは a piece of advice、two pieces of information のように「かけら」を表す語を使います。反対に、ふだん数えない語でも、区切りのある1回分を指すと数えられることがあります。experience（経験）は「経験そのもの」なら不可算、「ある1つのできごと」なら an exciting experience のように可算になります。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "The Owl and the Pussy-Cat went to sea\nIn a beautiful pea-green boat:\nThey took some honey, and plenty of money\nWrapped up in a five-pound note.\nThe Owl looked up to the stars above,\nAnd sang to a small guitar,\n\"O lovely Pussy, O Pussy, my love,\nWhat a beautiful Pussy you are,\nYou are,\nYou are!\nWhat a beautiful Pussy you are!\"",
        ja: "フクロウと子ネコは海へ出た\nきれいな豆みどりのボートに乗って。\nはちみつを少しと、お金をたっぷり\n5ポンド札にくるんで持っていった。\nフクロウは空の星を見上げ\n小さなギターに合わせて歌った。\n「すてきなネコさん、ああ、いとしいネコさん\nなんてきれいなネコさんなんだ、きみは\nきみは\nきみは！\nなんてきれいなネコさんなんだ、きみは！」",
        cite: "Edward Lear, \"The Owl and the Pussy-Cat\", Nonsense Songs, Stories, Botany, and Alphabets (1871), stanza 1",
        source: OWL_SOURCE,
      }],
      figure: {
        type: "tree",
        title: "名詞の分類",
        root: {
          label: "名詞",
          tone: "navy",
          children: [
            {
              label: "数えられる",
              tone: "blue",
              children: [
                { label: "普通名詞", sub: "book / apple" },
                { label: "集合名詞", sub: "family / class" },
              ],
            },
            {
              label: "数えられない",
              tone: "red",
              children: [
                { label: "物質名詞", sub: "water / paper" },
                { label: "抽象名詞", sub: "advice / news" },
                { label: "固有名詞", sub: "Japan / Ken" },
              ],
            },
          ],
        },
      },
      photos: [
        {
          src: `${M}/lear.webp`, width: 724, height: 992,
          alt: "丸い眼鏡をかけ、豊かなあごひげをたくわえた中年の男性の肖像写真",
          caption: "1867年のエドワード・リア。鳥の絵で名を上げた画家で、{{リメリック}}やナンセンス詩で英語の言葉遊びを広めた。「フクロウと子ネコ」はこのころの作。",
          credit: { author: "作者不明", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Edward_Lear_1867.jpg" },
        },
        {
          src: `${M}/nonsense54.webp`, width: 800, height: 482,
          alt: "木の幹にしがみつき、両手を広げる大きな頭の人物と、あわてて逃げ出す人々を描いたペン画",
          caption: "リア『ナンセンスの本』（1846年）の挿絵の一つ。おかしな人物の5行詩{{リメリック}}に、リア自身がこうした絵をそえた。",
          credit: { author: "Edward Lear", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Edward_Lear_A_Book_of_Nonsense_54.jpg" },
        },
      ],
      cliff: "はちみつは some、お金は plenty of。数えられない名詞の「量」は、どう言い分けるのでしょう？",
    },
    {
      heading: "量の言い方は、数えられるかで変わる",
      body: "「たくさんの」「少しの」を表す語は、名詞が数えられるかどうかで使い分けます。数えられる名詞には {{many・a few・few}}、数えられない名詞には {{much・a little・little}} です。a のつく a few / a little は「{{少しある}}」、a のない few / little は「{{ほとんどない}}」という意味になります。不可算名詞を数えるときは、a cup of tea のように{{単位の語}}を使います。",
      reading: [
        "フクロウとネコは、some honey と plenty of money を持って船出しました。some（いくらかの）と plenty of（たっぷりの）、それに a lot of（たくさんの）は、可算名詞にも不可算名詞にも使える便利な語です。これに対して many は可算名詞の複数形にだけ、much は不可算名詞にだけ使います。many friends とは言えても many money とは言えません。なお、会話の肯定文では much より a lot of が好まれ、much はおもに否定文や疑問文（I don't have much money.／お金はあまりない）で使われます。",
        "「少し」を表す語では、a があるかないかで気持ちが反対になります。I have a few friends here, so I'm not lonely.（ここには友だちが少しいるので、さびしくない）の {{a few}} は「少しある」と、あるほうに目を向けた言い方です。He has few friends here, so he feels lonely.（彼はここに友だちがほとんどいないので、さびしい）の {{few}} は「ほとんどない」と、ないほうに目を向けています。不可算名詞なら a little と little で、There is a little milk.（牛乳が少しある）と There is little milk.（牛乳がほとんどない）が対になります。量は同じでも、話し手がその量を「ある」と見るか「足りない」と見るかで a がつくのです。",
        "不可算名詞を数えたいときは、入れ物や形を表す{{単位の語}}を前に置き、その単位のほうを数えます。a cup of tea（紅茶1杯）、two glasses of water（水2杯）、a loaf of bread（パン1かたまり）、a slice of cake（ケーキ1切れ）、a piece of furniture（家具1点）などです。詩の最後の連にも slices of quince（マルメロの薄切り）が出てきます。また five-pound note（5ポンド札）は、pound が「単位」として数えられる語なので five pounds と言えますが、ハイフンでつないで名詞の前に置くと形容詞のようなはたらきになり、-s がつきません。a ten-year-old boy（10歳の少年）と同じしくみです。",
      ],
      figure: {
        type: "compare",
        title: "量を表す語の使い分け",
        columns: [{ title: "数えられる", tone: "blue" }, { title: "数えられない", tone: "red" }],
        rows: [
          { label: "たくさん", cells: ["many books", "much water"] },
          { label: "少しある", cells: ["a few books", "a little water"] },
          { label: "ほとんどない", cells: ["few books", "little water"] },
          { label: "数える", cells: ["two books", "two glasses of water"] },
        ],
        note: "a lot of はどちらにも使える。",
      },
      photos: [
        {
          src: `${M}/owl-boat.webp`, width: 800, height: 420,
          alt: "小さなボートの上で、楽器をかき鳴らすフクロウと、HONEY と書かれたつぼに手をかけて座るネコのペン画",
          caption: "リア自身が描いた「フクロウと子ネコ」の挿絵。つぼには HONEY の文字。はちみつは{{物質名詞}}なので a をつけず、some honey と言う。",
          credit: { author: "Edward Lear", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Edward_Lear_The_Owl_and_the_Pussy_Cat_1.jpg" },
        },
      ],
      cliff: "いよいよ謎の核心へ。初めて出てくるフクロウに、なぜ a ではなく the なのでしょう？",
    },
    {
      heading: "a と the：相手が「どれか」分かるかどうか",
      body: "{{a / an}} は「（いくつかあるうちの）ある1つ」で、聞き手が{{どれか特定できない}}ときに使います。{{the}} は、すでに話に出た、状況で分かる、ひとつしかないなど、聞き手が{{どれのことか分かる}}ときに使います。a か an かはつづりではなく{{発音}}で決まり、an hour・a university となります。",
      reading: [
        "冠詞の判断は、話し手ではなく{{聞き手}}の側に立つとすっきりします。a / an は「いくつもある中の、ある1つ。あなたはまだどれか知らない」という合図で、the は「どれのことか、あなたにも分かるはず」という合図です。I saw a dog in the park. The dog was very big.（公園で犬を見た。その犬はとても大きかった）では、1回目は聞き手が知らない犬なので a、2回目はさっきの犬だと分かるので the になります。the moon・the sun のように一つしかないもの、Close the window.（窓を閉めて）のようにその場でどれか分かるものにも the を使います。",
        "では、詩の1行目を見てみましょう。ボートは、この詩で初めて出てくる「ある1そうのボート」なので a beautiful pea-green boat です。フクロウが見上げる the stars above（頭上の星々）は、だれにとっても同じ空の星なので the。小さなギターは「あるギター」なので a small guitar。第2連では、旅の先の森に a Piggy-wig（子ブタ）が、a ring at the end of his nose（鼻の先に指輪をつけて）現れます。指輪は初登場なので a、鼻の先は「そのブタの鼻の先」と決まっているので the です。最後の連の the Turkey who lives on the hill（丘に住む七面鳥）のように、うしろに説明がついて「どの七面鳥か」がしぼられるときも the を使います。",
        "a と an の使い分けは、つづりではなく{{発音}}で決まります。hour は h を読まず「アワ」と母音で始まるので an hour、university は「ユー」という子音の音で始まるので a university です。また、冠詞を決める順番は「数えられるか」→「1つか2つ以上か」→「聞き手に分かるか」と考えると迷いにくくなります。数えられない名詞や複数形には a がつかないので、初めて出るときは何もつけないか some を使い、聞き手に分かるときだけ the をつけます。",
      ],
      figure: {
        type: "formula",
        title: "話の流れで a が the に変わる",
        prose: true,
        steps: [
          { expr: "I saw {{a}} dog in the park.", note: "初めて出る。相手はどの犬か知らない" },
          { expr: "{{The}} dog was very big.", note: "さっきの犬だと分かる" },
          { expr: "Look at {{the}} moon.", note: "ひとつしかないもの" },
          { expr: "Please close {{the}} window.", note: "状況でどの窓か分かる" },
        ],
      },
      reveal: "フクロウとネコは、本文では初登場でも、聞き手にとっては初対面ではありません。詩の題名 The Owl and the Pussy-Cat ですでに紹介され、Owl・Pussy-Cat と大文字で書かれて、ほとんど名前のように扱われています。聞き手が「この二人のお話だね」と{{どれのことか分かる}}ので the。いっぽうボートは、ここで初めて出てくる「ある1そう」で、聞き手は{{どれか特定できない}}ので a です。冠詞は「初めてかどうか」ではなく、「聞き手に分かるかどうか」で決まるのです。",
      cliff: "最後の連の hand in hand や next day には、冠詞がひとつもありません。なぜでしょう？",
    },
    {
      heading: "冠詞をつけない決まった言い方",
      body: "建物や物を本来の{{目的}}で使うときは、冠詞をつけないのがふつうです。go to school（勉強しに）、go to bed（寝るために）がその例で、建物そのものを指すなら the を使います。{{by ＋交通手段}}（by bus・by train）、{{食事}}（have lunch）、{{スポーツ}}（play tennis）にも冠詞をつけません。一方、楽器を演奏するときは play the piano のように the をつけるのが基本です。",
      reading: [
        "冠詞をつけないのは、名詞が「1つの物」ではなく「はたらき・目的」を表すときです。go to school は「勉強しに学校へ行く」、go to bed は「寝る」、be in hospital（イギリス英語）は「入院している」という意味で、建物やベッドという物そのものは問題にしていません。だから、保護者が学校の建物へ用事で行くなら go to the school と the をつけます。by bus・by train・by car（バスで・電車で・車で）も、特定の1台ではなく「交通の手段」を言うので冠詞をつけません。ただし on the bus・in my car のように、乗り物そのものを指すと冠詞や所有格が必要になります。",
        "食事（have breakfast・have lunch）、スポーツ（play tennis・play soccer）にも、ふつう冠詞はつけません。一方で、楽器は play the piano・play the guitar と the をつけるのが基本です。食事やスポーツは「その活動」を言うのに対し、楽器は「その種類の楽器」という道具をひとまとまりで指す、と考えると整理できます。このほか、hand in hand（手に手をとって）、day by day（日ごとに）、side by side（並んで）のように、同じ名詞や対になる名詞を前置詞でつなぐ決まった言い方にも冠詞はつきません。",
        "「フクロウと子ネコ」の最後の連（下の朗読）では、二人はマルメロの薄切りと mince（細かくきざんだ肉）を食べ、hand in hand で浜辺をおどります。mince は{{不可算名詞}}なので冠詞なし、hand in hand は決まった言い方なので冠詞なし、月はひとつしかないので the moon。なお、ふつうの説明文なら were married the next day（次の日に結婚した）と the を入れるところを、詩は next day とリズムよく縮めています。runcible（ランシブル）はリアが作った意味の決まらない語ですが、a runcible spoon と a がつくだけで、読者は「スプーンの一種だな」と受けとります。ナンセンス詩が楽しめるのは、でたらめな中身を、正確な文法のうつわが支えているからなのです。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "They dined on mince and slices of quince,\nWhich they ate with a runcible spoon;\nAnd hand in hand, on the edge of the sand,\nThey danced by the light of the moon,\nThe moon,\nThe moon,\nThey danced by the light of the moon.",
        ja: "二人はきざみ肉と、マルメロの薄切りを\nランシブル・スプーンでいただいた。\nそして手に手をとって、砂浜のふちで\n月の光の下でおどった、\n月の、\n月の、\n月の光の下でおどった。",
        cite: "Edward Lear, \"The Owl and the Pussy-Cat\", Nonsense Songs, Stories, Botany, and Alphabets (1871), stanza 3",
        source: OWL_SOURCE,
      }],
      photos: [
        {
          src: `${M}/owl-dance.webp`, width: 800, height: 486,
          alt: "羽を大きく広げた七面鳥の前で、おじぎをするフクロウと、身をかがめるネコのペン画",
          caption: "リアによる「フクロウと子ネコ」最後の連の挿絵。丘に住む七面鳥が二人を結婚させる場面。{{the}} Turkey who lives on the hill と、説明で「どの七面鳥か」がしぼられる。",
          credit: { author: "Edward Lear", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Edward_Lear_The_Owl_and_the_Pussy_Cat_3.jpg" },
        },
      ],
    },
  ],
  story: {
    kind: "manzai",
    title: "ナンセンス詩コンテスト",
    cast: ["ユズ", "カナタ"],
    lines: [
      { who: "ユズ", text: "どうもー、ユズとカナタです！　わたし、英語の詩のコンテストに出ることにしました！" },
      { who: "カナタ", text: "いきなりだね。どんな詩を書くの？" },
      { who: "ユズ", text: "リアみたいなナンセンス詩。1行目はもうできてる。I bought many furnitures for my cat.", say: "リアみたいなナンセンスし。いちぎょうめはもうできてる。アイ・ボート・メニー・ファーニチャーズ・フォー・マイ・キャット。" },
      { who: "カナタ", text: "そこがもうナンセンス！　furniture は、いすや机をひとまとめにした呼び名だから{{不可算名詞}}。-s はつかないし、many も使えない。", say: "そこがもうナンセンス！ ファーニチャーは、いすや机をひとまとめにした呼び名だから、不可算名詞。エスはつかないし、メニーも使えない。" },
      { who: "ユズ", text: "じゃあ a lot of furniture。いすを3きゃく買ったことにする。" },
      { who: "カナタ", text: "いすなら数えられるから three chairs でいい。家具1点なら a piece of furniture。", say: "いすなら数えられるから、スリー・チェアーズでいい。家具1点なら、ア・ピース・オブ・ファーニチャー。" },
      { who: "ユズ", text: "2行目。ネコがわたしに、たくさんの advices をくれた。", say: "にぎょうめ。ネコがわたしに、たくさんのアドバイシズをくれた。" },
      { who: "カナタ", text: "advice も{{不可算名詞}}！　助言を数えるなら two pieces of advice。", say: "アドバイスも不可算名詞！ 助言を数えるなら、トゥー・ピーシズ・オブ・アドバイス。" },
      { who: "ユズ", text: "3行目。I have a few money, so I'm poor.", say: "さんぎょうめ。アイ・ハブ・ア・フュー・マニー、ソー・アイム・プア。" },
      { who: "カナタ", text: "money は数えられないから few じゃなくて little。しかも「少しある」の a little だと、貧しいって話とかみ合わない。", say: "マニーは数えられないから、フューじゃなくてリトル。しかも少しあるの、ア・リトルだと、まずしいって話とかみ合わない。" },
      { who: "ユズ", text: "じゃあ I have little money。……リアの詩だと、plenty of money を5ポンド札にくるんでたのに。", say: "じゃあ、アイ・ハブ・リトル・マニー。……リアの詩だと、プレンティ・オブ・マニーを5ポンドさつにくるんでたのに。" },
      { who: "カナタ", text: "お金は数えられないけど、札は a five-pound note って数えられる。量と1枚の区別だね。", say: "おかねは数えられないけど、さつは、ア・ファイブパウンド・ノートって数えられる。りょうと、いちまいの区別だね。" },
      { who: "ユズ", text: "4行目。I go to the school by a bus every day.", say: "よんぎょうめ。アイ・ゴー・トゥー・ザ・スクール・バイ・ア・バス・エブリデイ。" },
      { who: "カナタ", text: "勉強しに行くなら{{冠詞なし}}で go to school。交通手段も by bus。the school だと、建物に用事があるだけの人になる。", say: "勉強しに行くなら、冠詞なしで、ゴー・トゥー・スクール。交通手段も、バイ・バス。ザ・スクールだと、建物に用事があるだけの人になる。" },
      { who: "ユズ", text: "そして5行目は、ネコといっしょに音楽。I play the tennis and piano.", say: "そしてごぎょうめは、ネコといっしょに音楽。アイ・プレイ・ザ・テニス・アンド・ピアノ。" },
      { who: "カナタ", text: "逆！　スポーツは冠詞なしで play tennis、楽器は play the piano。", say: "逆！ スポーツは冠詞なしで、プレイ・テニス。楽器は、プレイ・ザ・ピアノ。" },
      { who: "ユズ", text: "最後の決めの行。An Owl and a Cat went to the sea in the boat.", say: "最後のきめのぎょう。アン・アウル・アンド・ア・キャット・ウェント・トゥー・ザ・シー・イン・ザ・ボート。" },
      { who: "カナタ", text: "リアと冠詞が全部ずれてる！　題名で紹介ずみの主人公だから{{the}} Owl、初めて出るボートは{{a}} boat。go to sea も「船出する」って決まった言い方で冠詞なし。", say: "リアと冠詞が全部ずれてる！ 題名で紹介ずみの主人公だから、ジ・アウル。初めて出るボートは、ア・ボート。ゴー・トゥー・シーも、船出するって決まった言い方で冠詞なし。" },
      { who: "ユズ", text: "ナンセンス詩なのに、文法はこんなにきっちりなんだ。" },
      { who: "カナタ", text: "そう。中身がでたらめでも、冠詞や数が正しいから、読む人は安心してふしぎな世界に入れるの。" },
      { who: "ユズ", text: "よし、題名も決めた。「The Yuzu and the Kanata」！", say: "よし、だいめいも決めた。ザ・ユズ・アンド・ザ・カナタ！" },
      { who: "カナタ", text: "人の名前に the はつけない！　もういいよ。" },
      { who: "ユズ", text: "どうも、ありがとうございました！" },
    ],
    note: "ユズとカナタは架空の人物で、会話はすべて創作です。リアの詩から引いた語句（plenty of money、a five-pound note、The Owl、a boat）は Project Gutenberg 所収の本文で照合したもので、それ以外の英文はこの漫才のために作った文です。リアの生涯と作品の年代は、一般に知られている事実にもとづいています。",
  },
  mistakes: [
    { wrong: "She gave me many advices.", right: "She gave me a lot of advice (much advice).", why: "advice は不可算名詞なので複数形にせず、many も使いません。" },
    { wrong: "I have a good news.", right: "I have (some) good news. / a piece of good news", why: "news は -s で終わりますが不可算名詞。a はつけません。" },
    { wrong: "I'll go to the school by a bus.", right: "I'll go to school by bus.", why: "勉強しに行く school と、by ＋交通手段には冠詞をつけません。" },
    { wrong: "It takes a hour.", right: "It takes an hour.", why: "hour の h は発音しないので、母音で始まる音として an を使います。" },
  ],
  check: [
    { q: "There is ___ milk in the bottle.（少しある）", a: "a little", why: "milk は不可算名詞なので little。「少しある」なので a をつける。" },
    { q: "He has ___ friends here, so he feels lonely.", a: "few", why: "friends は可算名詞の複数。「ほとんどいない」なので a をつけない。" },
    { q: "My mother bought ___ new bag. ___ bag is red.", a: "a / The", why: "初めて出るときは a、2回目は相手に分かるので the。" },
  ],
  next: [
    { label: "4択ドリル「名詞・冠詞」に挑戦", href: "/learn/eibunpo-ko/h-eng-gram-meishi" },
    { label: "つぎの単元「代名詞」", href: "/learn/eibunpo-ko/h-eng-gram-daimeishi" },
    { label: "関連「形容詞・副詞」（many・much など）", href: "/learn/eibunpo-ko/h-eng-gram-keiyoshi" },
  ],
};
