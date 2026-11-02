import type { Lecture } from "../types";

const C = "/media/commons/h-eng-skill-wabun";

export const H_ENG_SKILL_WABUN: Lecture = {
  unit: "h-eng-skill-wabun",
  title: "和文英訳は、まず「英語にしやすい日本語」に直す。主語と動詞を先に決める",
  hook: "「駅前に新しい図書館ができた」を英語にしようとして、「できた」にあたる単語で止まったことはありませんか。日本語をそのまま1語ずつ置きかえようとすると、知らない単語や主語のない文でつまずきます。和文英訳は単語の暗記量よりも、日本語の意味をつかんで、自分の知っている英語で書ける形に組み立て直す力で決まります。",
  mystery: "「武士道」や「茶道」にぴったり重なる英単語はありません。それなのに、1900年に新渡戸稲造が英語で書いた『Bushido』は、欧米で広く読まれました。辞書に答えのない日本のことばを、彼らはどうやって英語にしたのでしょう？",
  mission: {
    from: "城下町の観光案内所の職員（英語パンフレット担当）",
    request: "来年の春、海外からの旅行者向けに、町の英語パンフレットを作り直します。前の版は「おもてなし」「わび・さび」「いただきます」に辞書の訳語を当てはめただけで、旅行者から「意味がよくわからない」と言われてしまいました。100年以上前に日本を英語で世界に伝えた名著の工夫を、名探偵のあなたに解き明かしてほしいのです。",
    thanks: "1語で置きかえようとせず、まず意味を日本語でほどき、読む人が知っている言葉に重ね、日本語のまま使う言葉には説明を添える。この手順で、パンフレットの「Itadakimasu」にも、きちんと説明をつけてみます。",
  },
  sections: [
    {
      heading: "日本語→日本語→英語の3段階で考える",
      body: "いきなり英語にせず、まず日本語の文を{{英語にしやすい日本語}}に直します（{{和文和訳}}）。主語を補い、遠回しな言い方をはっきりさせ、だれが何をするのかがわかる形にします。そのうえで、{{主語と動詞}}を決めてから英語にすると、文の骨組みがくずれません。",
      reading: [
        "和文英訳でつまずく人の多くは、日本語の単語を一つずつ英単語に置きかえようとします。けれども日本語と英語は、語順も、主語の扱いも、ものの言い方もちがいます。「駅前に新しい図書館ができた」の「できた」を辞書で引くと、make、can、be formed などいろいろ出てきますが、どれを入れても不自然な文になりがちです。そこで、英語にする前に一度、日本語の中で考え直します。これを{{和文和訳}}とよびます。",
        "手順は3段階です。まず、その文が何を言いたいのかをつかみます。次に、主語を補い、あいまいな言い方をはっきりさせて、{{英語にしやすい日本語}}に直します。「図書館ができた」は「新しい図書館が建てられた」や「今は新しい図書館がある」に直せます。最後に、文の骨組みである{{主語と動詞}}を決めてから英語にします。骨組みが先に決まれば、場所や時を表す語はあとから足すだけです。",
        "この手順を、100年以上前に一冊の本でやってのけた日本人がいます。新渡戸稲造です。若いころにアメリカとドイツで学んだ新渡戸は、ベルギーの法学者に「学校で宗教を教えないのなら、どうやって道徳を教えるのか」と問われて答えに詰まり、アメリカ人の妻からも日本の習慣の理由をたびたびたずねられました。その答えを英語で書いたのが、1900年にアメリカのフィラデルフィアで出版された『Bushido: The Soul of Japan（武士道）』です。",
        "新渡戸は「武士道」を、いきなり1語の英語にはしませんでした。まず Bu-shi-do と字をほどき、文字どおりの意味を Military-Knight-Ways（武・士・道）と示します。次に、それが「戦う貴族が日々の暮らしでも務めの中でも守るべき道」だと説明し、最後に欧米の読者がよく知っている言葉で「ひと言で言えば」とまとめました。意味をつかむ→ほどいて言い直す→英語にする。和文和訳の3段階が、そのまま名著の書き出しになっているのです。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "us",
        text: "Bu-shi-do means literally Military-Knight-Ways—the ways which fighting nobles should observe in their daily life as well as in their vocation; in a word, the “Precepts of Knighthood,” the noblesse oblige of the warrior class.",
        ja: "ブ・シ・ドウとは、文字どおりには「武・士・道」、つまり戦う貴族たちが、務めのうえでも日々の暮らしの中でも守るべき道のことである。ひと言で言えば「騎士の心得」、武人の階級にとってのノブレス・オブリージュ（高い身分にともなう義務）である。",
        cite: "Inazo Nitobe, Bushido: The Soul of Japan, Chapter I (1900; revised edition 1908)",
        source: "https://www.gutenberg.org/ebooks/12096",
      }],
      photos: [
        {
          src: `${C}/bushido-title.webp`, width: 800, height: 1248,
          alt: "BUSHIDO THE SOUL OF JAPAN と大きく印刷され、下に INAZO NITOBE、PHILADELPHIA 1900 とある本の扉",
          caption: "『Bushido: The Soul of Japan』初版の扉（1900年、フィラデルフィア）。日本人が{{英語で}}書き、欧米の読者に向けて日本の考え方を説明した本。",
          credit: { author: "Inazō Nitobe", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Houghton_Hearn_92.40.10_-_Bushido_title.jpg" },
        },
        {
          src: `${C}/nitobe.webp`, width: 699, height: 954,
          alt: "丸い眼鏡をかけ、蝶ネクタイをしめた白髪の男性の白黒写真。左に毛筆の署名がある",
          caption: "新渡戸稲造（1862〜1933）。教育者・農学者で、のちに国際連盟の事務次長も務めた。『Bushido』は、彼が英語で書いた代表作。",
          credit: { author: "作者不明（国立国会図書館）", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Nitobe_Inazo.jpg" },
        },
      ],
      figure: {
        type: "flow",
        dir: "col",
        title: "和文英訳の手順",
        steps: [
          { label: "意味をつかむ", sub: "何が言いたい文か", tone: "navy" },
          { label: "和文和訳", sub: "主語を補い単純にする", tone: "blue" },
          { label: "主語と動詞を決める", sub: "文の骨組み（S＋V）" },
          { label: "英語にする", sub: "知っている表現で", tone: "yellow" },
          { label: "見直す", sub: "時制・数・冠詞" },
        ],
      },
      cliff: "では、日本語でいちばんよく消えている「主語」は、どう補えばよいのでしょう？",
    },
    {
      heading: "主語のない日本語には、主語を補う",
      body: "日本語は主語を省くことが多いですが、英語の文には{{主語が必要}}です。「昨日は忙しくて、宿題ができなかった」は、だれのことかを考えて「{{私は}}昨日忙しかったので、宿題をすることができなかった」と直します。こうすると、I was busy と I couldn't do の2つの文をつなぐだけになります。",
      reading: [
        "日本語では、話の流れでわかる主語はふつう言いません。「昨日は忙しくて、宿題ができなかった」と言えば、だれでも話し手自身のことだとわかります。ところが英語は、命令文などを除いて、文には必ず{{主語}}と{{動詞}}がそろいます。だから和文英訳では、まず「この文の主語はだれ（何）か」を自分で決めなければなりません。「私は」を補えば、I was busy と I couldn't do my homework の2つの骨組みができ、あとは so や because でつなぐだけです。",
        "主語は人とはかぎりません。天気や時間は It、一般の人は you や we、ものごとが主語になることもあります。「この町は住みやすい」なら It is easy to live in this town.、「駅前に図書館がある」なら There is a library in front of the station. です。主語が見つからないときは、「何が、どうした」の「何が」にあたるものを日本語の中で探すと、英語の文の形が決まります。",
        "主語をはっきり立てる英語の書き方は、名著にもよく表れています。1906年にニューヨークで出版された岡倉天心（覚三）の『The Book of Tea（茶の本）』です。ボストン美術館で東洋美術の仕事をしていた岡倉は、茶の湯の心を英語で説明しようとしました。その第1章は、Tea began as a medicine and grew into a beverage.（茶は薬として始まり、やがて飲み物になった）と、「茶は」を主語にした短い文で始まります。",
        "注目したいのは2文目です。日本語なら「中国では8世紀に、詩の世界に入った」と、主語を言わずに続けるところです。岡倉は、ここに it（＝茶）をきちんと置きました。主語を補った2つの短い文で、茶の歴史が「薬→飲み物→詩」と一気に進みます。主語と動詞が先に決まっているので、in China や in the eighth century といった場所や時の言葉を、文の前に気持ちよく並べられるのです。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "us",
        text: "Tea began as a medicine and grew into a beverage. In China, in the eighth century, it entered the realm of poetry as one of the polite amusements.",
        ja: "茶は薬として始まり、やがて飲み物になった。中国では8世紀に、茶は上品な楽しみの一つとして、詩の世界に入った。",
        cite: "Kakuzo Okakura, The Book of Tea, Chapter I, “The Cup of Humanity” (1906)",
        source: "https://www.gutenberg.org/ebooks/769",
      }],
      photos: [
        {
          src: `${C}/tea-title.webp`, width: 800, height: 1427,
          alt: "THE BOOK OF TEA BY OKAKURA-KAKUZO と印刷され、中央に小さな紋章、下に NEW YORK DUFFIELD & COMPANY 1906 とある本の扉",
          caption: "『The Book of Tea（茶の本）』の扉（1906年、ニューヨーク）。岡倉天心が茶の湯の考え方を{{英語で}}説明した本で、のちに日本語にも訳された。",
          credit: { author: "Kakuzō Okakura", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Title_page_of_The_Book_of_Tea.jpg" },
        },
      ],
      figure: {
        type: "formula",
        title: "「昨日は忙しくて、宿題ができなかった」",
        prose: true,
        steps: [
          { label: "元の文", expr: "昨日は忙しくて、宿題ができなかった。", note: "主語がない" },
          { label: "和文和訳", expr: "{{私は}}昨日忙しかった{{ので}}、宿題をすることができなかった。", note: "主語と因果をはっきり" },
          { label: "英語", expr: "{{I was}} busy yesterday, {{so I couldn't}} do my homework.", note: "S＋V を2つ、so でつなぐ" },
        ],
        note: "Because I was busy yesterday, I couldn't do my homework. でもよい。",
      },
      cliff: "主語は決まった。でも、ぴったりの単語がそもそも英語にないときは？",
    },
    {
      heading: "知らない単語は、知っている表現に言いかえる",
      body: "「図書館ができた」の「できる」は、make や can ではうまくいきません。こういうときは、意味は同じで{{自分が確実に書ける表現}}に言いかえます。「新しい図書館が建てられた」なら受動態、「新しい図書館がある」なら There is 〜 で書けます。{{難しい単語より、まちがえない文}}を選ぶのがコツです。",
      reading: [
        "試験の和文英訳では、知らない単語が必ず出てきます。そこで和英辞典の訳語をそのまま書くと、使い方（語法）がずれて減点されることがよくあります。大事なのは、日本語の単語ではなく{{意味}}を英語にすることです。「図書館ができた」は「建てられた」（was built）、「開いた」（opened）、「今はある」（There is 〜）と、自分が{{確実に書ける表現}}に言いかえれば、まちがいのない文になります。",
        "言いかえは、読む人がすでに知っている言葉に重ねることでもあります。新渡戸は『Bushido』の本文を、Chivalry is a flower no less indigenous to the soil of Japan than its emblem, the cherry blossom（騎士道は、その象徴である桜の花に劣らず、日本の土にもとから根づいた花である）と書き始めました。主語は Bushido ではなく、欧米の読者が中世の騎士の物語でよく知っている {{chivalry（騎士道）}}です。なじみのない日本語のかわりに、相手の文化にある近い言葉を主語にすえたことで、読者は最初の1文から「ああ、あのことか」と入っていけました。",
        "ただし、近い言葉はぴったり同じではありません。新渡戸もそれを承知で、この「騎士道」がどこから来て、どんな徳（義・勇・仁・礼・誠・名誉・忠義など）を大切にしたかを、章を重ねて説明しています。岡倉も茶道を一語で訳さず、tea に -ism をつけた Teaism という言葉で紹介し、その中身を本の全体で語りました。言いかえで入口をつくり、説明で中身を伝えるのです。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "us",
        text: "Chivalry is a flower no less indigenous to the soil of Japan than its emblem, the cherry blossom; nor is it a dried-up specimen of an antique virtue preserved in the herbarium of our history.",
        ja: "騎士道は、その象徴である桜の花に劣らず、日本の土にもとから根づいた花である。しかもそれは、わたしたちの歴史という植物標本集にしまわれた、昔の徳のひからびた押し花でもない。",
        cite: "Inazo Nitobe, Bushido: The Soul of Japan, Chapter I (1900; revised edition 1908)",
        source: "https://www.gutenberg.org/ebooks/12096",
      }],
      figure: {
        type: "compare",
        title: "「駅前に新しい図書館ができた」の言いかえ",
        columns: [{ title: "直した日本語", tone: "blue" }, { title: "英語", tone: "yellow" }],
        rows: [
          { label: "受動態", cells: ["新しい図書館が建てられた", "〜 was built."] },
          { label: "There is", cells: ["今は新しい図書館がある", "There is 〜."] },
          { label: "open", cells: ["新しい図書館が開いた", "〜 opened."] },
        ],
        note: "〜 には a new library が入り、最後に in front of the station をつける（例 There is a new library in front of the station.）。",
      },
      cliff: "それでも「浴衣」や「盆踊り」のように、日本語のまま書くしかない言葉があります。",
    },
    {
      heading: "日本にしかない言葉は、説明を添えて書く",
      body: "{{日本にしかないもの}}（食べ物・行事・道具など）は、ローマ字のまま書いて、すぐあとに{{説明を添えます}}。onigiri, or rice balls のように {{or}} で言いかえを並べるか、Bon-odori, a traditional dance のように{{コンマで説明}}を続けます。一度説明すれば、そのあとはローマ字だけで書いてかまいません。",
      reading: [
        "「浴衣」「盆踊り」「おにぎり」のように、英語の世界にそのものがない言葉は、言いかえだけでは中身が伝わりません。こういうときは、{{ローマ字のまま書き}}、すぐあとに{{説明を添えます}}。よく使う形は2つです。1つは or を使って onigiri, or rice balls（おにぎり、つまりお米のボール）のように言いかえを並べる形。もう1つはコンマのあとに Bon-odori, a traditional summer dance のように、名詞で説明を続ける形（同格）です。",
        "この書き方の名人が、ラフカディオ・ハーン（小泉八雲）です。ギリシャに生まれ、アイルランドで育ち、アメリカで記者をしていたハーンは、1890年に日本へ来て松江で英語を教え、小泉セツと結婚して、のちに日本国籍をとりました。日本語の本をすらすら読めたわけではありません。セツの回想によると、ハーンはセツに、本を読み上げるのではなく、自分の言葉で話を語ってほしいと求めたといいます。日本語の物語を、まず意味の通る話として受け取り、それから英語で書き直したのです。",
        "1904年に出た『Kwaidan（怪談）』の「耳なし芳一」は、壇ノ浦の戦いの説明から始まります。Heiké と Genji という日本語の名前には、or Taira clan（つまり平氏）、or Minamoto clan（つまり源氏）と説明が添えられています。少しあとには、漁師たちが Oni-bi, or demon-fires（鬼火、つまり鬼の火）とよぶ青白い光も出てきます。読者は日本語の響きを味わいながら、意味でも迷わない。ローマ字と説明のセットが、異国の怪談をそのまま英語の名作にしました。",
        "新渡戸も同じ手を使っています。Bu-shi-do の意味を説明した直後に、Having thus given its literal significance, I may be allowed henceforth to use the word in the original.（こうして文字どおりの意味を示したので、ここからはこの言葉を原語のまま使わせていただきたい）と断ってから、本の全体で Bushido と書き続けました。一度説明すれば、あとは原語でよい。英作文でも、最初の1回だけ説明を添えれば十分です。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "us",
        text: "More than seven hundred years ago, at Dan-no-ura, in the Straits of Shimonoséki, was fought the last battle of the long contest between the Heiké, or Taira clan, and the Genji, or Minamoto clan.",
        ja: "七百年あまり前、下関海峡の壇ノ浦で、長く続いた争いの最後の戦いがおこなわれた。平家、つまりタイラの一族と、源氏、つまりミナモトの一族との戦いである。",
        cite: "Lafcadio Hearn, “The Story of Mimi-Nashi-Hōïchi”, Kwaidan (1904)",
        source: "https://www.gutenberg.org/ebooks/1210",
        say: "More than seven hundred years ago, at Dan-no-ura, in the Straits of Shimonoseki, was fought the last battle of the long contest between the Heike, or Taira clan, and the Genji, or Minamoto clan.",
      }],
      photos: [
        {
          src: `${C}/dannoura.webp`, width: 800, height: 518,
          alt: "金色の雲と緑の島々を背景に、海の上で多くの小舟と大きな帆船が入り乱れて戦う日本画",
          caption: "壇ノ浦の戦い（1185年）を描いた『安徳天皇縁起絵図』の一部（赤間神宮蔵、土佐派の作と伝わる）。ハーンの「耳なし芳一」はこの戦いの説明から始まる。",
          credit: { author: "Tosa Mitsunobu（伝）", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:AntokuTennou_Engi.7%268_Dannoura_Kassen.jpg" },
        },
        {
          src: `${C}/hearn.webp`, width: 712, height: 1024,
          alt: "口ひげのある男性が目をふせて、顔を少し右に向けている白黒の肖像写真",
          caption: "ラフカディオ・ハーン（小泉八雲、1850〜1904）。日本の物語を英語で書き直し、Heiké, or Taira clan のように{{ローマ字に説明を添えて}}世界に伝えた。",
          credit: { author: "Frederick Gutekunst", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Lafcadio_Hearn_portrait.jpg" },
        },
      ],
      figure: {
        type: "formula",
        title: "「夏祭りでは、浴衣を着て盆踊りをします」",
        prose: true,
        steps: [
          { label: "元の文", expr: "夏祭りでは、浴衣を着て盆踊りをします。", note: "英語にない物が2つ" },
          { label: "和文和訳", expr: "夏祭りでは、{{私たちは}}浴衣（夏の木綿の着物）を着て、盆踊り（輪になって踊る伝統の踊り）を踊ります。", note: "主語と説明を補う" },
          { label: "英語", expr: "At summer festivals, we wear {{yukata, or light cotton kimonos,}} and dance {{Bon-odori, a traditional circle dance}}.", note: "or とコンマで説明を添える" },
        ],
        note: "2回目からは yukata、Bon-odori だけでよい。",
      },
      reveal: "新渡戸は「武士道」を1語に置きかえず、まず Bu-shi-do と字をほどいて文字どおりの意味を示し（{{和文和訳}}）、次に欧米の読者が知っている chivalry や noblesse oblige に{{言いかえ}}ました。ハーンも Heiké に or Taira clan と{{説明を添え}}ています。意味をほどく→知っている言葉に重ねる→原語には説明を添える。辞書に答えがなくても伝わったのは、この和文英訳の手順そのものを使ったからなのです。",
      cliff: "最後に、書き終えた英文のどこを見直せばよいのかを確かめましょう。",
    },
    {
      heading: "書いたら、ミスの出やすい点を見直す",
      body: "和文英訳の減点は、意味よりも{{文法の小さなミス}}で起こることがほとんどです。書き終えたら、{{時制}}、主語に合わせた{{三単現の s}}、名詞の{{単数・複数と冠詞}}を順に確かめます。見直す点を決めておくと、短い時間でもれなくチェックできます。",
      reading: [
        "和文英訳の採点では、意味が通っていても、{{時制}}・{{三単現の s}}・{{単数と複数}}・{{冠詞}}（a / the）のミスが一つずつ減点されます。これらは日本語にはっきりした形がないので、日本語から考えていると見落としやすいのです。「犬を飼っている」の「犬」は、日本語では1匹か2匹かを言いませんが、英語では I have a dog. か I have two dogs. のどちらかに決めなければなりません。",
        "このちがいがよくわかるのが、俳句の英訳です。松尾芭蕉の「古池や蛙飛こむ水のおと」（1686年）には、蛙が何匹か、いつのことかが書かれていません。英語にするには、An old pond— / a frog jumps in,（古い池／1匹の蛙が飛びこむ）とするか、Old pond— / frogs jumped in,（古い池／蛙たちが飛びこんだ）とするか、数と時制を訳す人が選ぶことになります。1匹が今まさに飛びこむのか、何匹もが次々に飛びこんだのか。英語の文法が、日本語では言わずにすんだことを、はっきり決めさせるのです。",
        "だから見直しは、「文法の確認」であると同時に「意味の確認」でもあります。書き終えたら、①時制は場面に合っているか（yesterday があれば過去形）、②主語が he・she・it なら動詞に s がついているか、③数えられる名詞に a や複数の s がついているか、の順にチェックしましょう。",
      ],
      figure: {
        type: "compare",
        title: "見直しのチェック表",
        columns: [{ title: "確かめること", tone: "blue" }, { title: "ミスの例 → 直し", tone: "red" }],
        rows: [
          { label: "時制", cells: ["過去のことは過去形", "go → went（yesterday）"] },
          { label: "三単現", cells: ["he・she・it には s", "She play → plays"] },
          { label: "数・冠詞", cells: ["数えられる名詞の形", "I have dog → a dog"] },
        ],
      },
    },
  ],
  story: {
    kind: "novel",
    title: "マーケット通りの「いただきます」",
    paragraphs: [
      "1900年の秋、アメリカのフィラデルフィア。十七歳の留学生、春木健は、下宿先のモリス家の夕食の席で、いつものように手を合わせて小さく言った。「いただきます」。向かいにすわった同い年のルースが、フォークを止めた。「ケン、それ、毎晩言ってるわよね。どういう意味？」",
      "健は口を開きかけて、詰まった。いただく、は receive だ。辞書でそう覚えた。「I receive.」と言うと、ルースは首をかしげた。「何を？ だれから？」。健は答えられなかった。主語も目的語も、日本語のときには考えたこともなかったのだ。テーブルの向こうで、モリス夫人がやさしく笑った。「急がなくていいのよ。言葉は、ゆっくり探せばいいんだから」",
      "次の土曜日、健はマーケット通りの印刷所兼本屋の前で足を止めた。ショーウインドウに、新しい本が一冊立てかけてある。表紙の文字は、BUSHIDO。日本の言葉が、英語の本の題名になっている。健はなけなしの小づかいをはたいて、その本を買った。",
      "下宿の部屋で開くと、最初のほうに、こんな一行があった。Bu-shi-do means literally Military-Knight-Ways。健は思わず声に出して読んだ。武・士・道。字をほどいて、意味をそのまま英語にしている。そのあとで、chivalry、knighthood と、アメリカ人がよく知っている言葉に重ねている。一語で置きかえようとして、詰まっていたのは自分のほうだった。",
      "健はノートを開き、まず日本語で書いた。「いただきます」。その下に、英語にしやすい日本語で書き直した。「私は、この食べ物を、ありがたく受け取ります」。主語は I。動詞は receive。いや、それだけでは足りない。だれに感謝しているのか。米を作った人、料理をした人、そして食べ物そのもの。日本語では言わずにすませていたことを、一つずつ{{和文和訳}}で表に出していった。",
      "日曜の夕食。健は手を合わせてから、ルースに向き直った。「It means, I humbly receive this food. We say it to thank the farmers, the cook, and the food itself」。ルースはしばらく黙ってから、ぱっと顔を明るくした。「じゃあ、私たちの食前のお祈りと、少し似てるのね」。健はうなずいた。似ているけれど、同じではない。その「少し」を伝えるために、言葉を足していけばいいのだ。",
      "ルースは自分の両手を合わせて、たどたどしく言った。「Itadakimasu」。モリス夫人も、モリス氏も、それにならった。窓の外では、街灯が一つずつともりはじめていた。健はノートのすみに、小さく書き足した。Itadakimasu, or I humbly receive。辞書のどこにもない、自分で見つけた訳だった。",
    ],
    sayFix: { "春木健": "はるきけん", "健": "けん" },
    note: "春木健、ルース、モリス家の人々と、その会話・心情はすべて創作です。新渡戸稲造の『Bushido: The Soul of Japan』が1900年にフィラデルフィアのマーケット通りにあった出版社（The Leeds & Biddle Co.）から出たこと、作中の英文（Bu-shi-do means literally Military-Knight-Ways）と、本文で chivalry や knighthood に重ねて説明していることは事実・原文にもとづいています。",
  },
  mistakes: [
    { wrong: "「私は寿司です」（注文の場面）→ I am sushi.", right: "I'll have sushi. / I'd like sushi.", why: "日本語の「〜は…です」が、いつも be動詞のイコールになるとは限りません。何を言いたいのか（注文したい）を考えて英語にします。" },
    { wrong: "「昨日は雨だった」→ Yesterday was rain.", right: "It rained yesterday. / It was rainy yesterday.", why: "天気は It を主語にするのが基本です。rain は名詞なら「雨」そのものなので、Yesterday とイコールにはなりません。" },
    { wrong: "知らない単語を和英辞典の訳語でそのまま使う", right: "意味が同じで、使い方を知っている表現に言いかえる", why: "辞書の訳語は使い方（語法）がずれていることがあります。自信のある表現で正確に書くほうが点になります。" },
    { wrong: "日本にしかない物をローマ字だけで書く（I ate onigiri.）", right: "最初の1回は説明を添える（I ate onigiri, or rice balls.）", why: "ローマ字だけでは、日本語を知らない読み手には何のことかわかりません。or やコンマで説明を添えれば、2回目からはローマ字だけで通じます。" },
  ],
  check: [
    { q: "「この町は住みやすい」を、It で始めて英語にしましょう。", a: "It is easy to live in this town.", why: "It is easy to 〜 の形。live in の in を落とさない。" },
    { q: "「彼女は毎朝走っている」を英語にするとき、動詞の形で気をつけることは？", a: "三単現の s をつけて runs にする（She runs every morning.）", why: "主語が she で、毎朝の習慣なので現在形。" },
    { q: "和文英訳で、英語にする前に日本語を直す作業を何という？", a: "和文和訳", why: "主語を補い、英語にしやすい日本語に直す。" },
  ],
  next: [
    { label: "ドリル「和文英訳」で鍛える", href: "/learn/eigo-ko/h-eng-skill-wabun" },
    { label: "つぎの単元「自由英作文」", href: "/learn/lecture/h-eng-skill-jiyu" },
    { label: "ふりかえり「時制」", href: "/learn/eibunpo-ko/h-eng-gram-jisei" },
  ],
};
