import type { Lecture } from "../types";

const C = "/media/commons/j-en-2-ukemi";

export const J_EN_2_UKEMI: Lecture = {
  unit: "j-en-2-ukemi",
  title: "受け身は be動詞＋過去分詞。「される側」を主語にして作る",
  hook: "「このお寺は約600年前に建てられた」「英語は多くの国で話されている」。だれがしたかより、{{されたもの}}を話の中心にしたいときに使うのが受け身です。説明文や案内によく出てくる形で、ここで覚える過去分詞は中3の現在完了でも使います。",
  mystery: "アメリカ独立宣言の有名な一文は、all men are created equal（すべての人は平等につくられている）と受け身で書き、「だれがつくったか」を by で言いません。ところがすぐあとでは、they are endowed by their Creator と、わざわざ by をつけています。同じ文の中で、なぜ by を書かなかったり、書いたりしたのでしょう？",
  mission: {
    from: "英語暗唱コンテストを指導する中学校の先生",
    request: "今年のコンテストで、生徒が独立宣言の一節を暗唱することになりました。練習中に「created のあとには by がないのに、endowed のあとには by がある。どっちが正しい英語なの？」と聞かれ、うまく答えられませんでした。どこを強く読むかを決めるためにも、名探偵のあなたに by のなぞを解いてほしいのです。",
    thanks: "by を書かないのは「人」に光を当てるため、書くのは「だれが」こそが主張の芯だから。これで生徒に、by their Creator をはっきり、力をこめて読むよう伝えられます。",
  },
  sections: [
    {
      heading: "受け身は「される側」が主語",
      body: "ふつうの文（{{能動態}}）は「する側」が主語ですが、受け身（{{受動態}}）は「される側」を主語にします。形は {{be動詞＋過去分詞}} で、「〜される・〜された」という意味です。だれがしたかを言うときは、後ろに {{by＋人}} を置きます。",
      reading: [
        "Ken painted this picture.（ケンがこの絵をかいた）と This picture was painted by Ken.（この絵はケンによってかかれた）は、同じできごとを言っています。ちがうのは、文の先頭に立つもの、つまり話の中心です。前の文は「ケンが何をしたか」、後ろの文は「この絵がどうされたか」を語っています。英語は主語から話が始まるので、何を主語にするかで、聞き手が最初に目を向けるものが決まります。「される側」を主語にしたいときに使うのが{{受け身}}（{{受動態}}）です。",
        "受け身が歴史を動かした例があります。1776年、北アメリカの東岸にあった13のイギリス植民地は、本国イギリスとの戦争のさなかにありました。植民地の代表はフィラデルフィアに集まって大陸会議を開き、7月4日、イギリスからの独立を宣言する文書を採択します。これが{{アメリカ独立宣言}}です。宣言は国王への不満を並べる前に、まず「人間とはどういうものか」という考えから語り始めました。",
        "その中心が下の一文です。all men are created equal（すべての人は平等につくられている）、they are endowed by their Creator with certain unalienable Rights（創造主によって、ゆずりわたせない権利をあたえられている）。are created、are endowed と、be動詞＋過去分詞が続きます。主語は men（人々）と they で、どちらも「される側」の人間です。受け身にしたことで、文の主役はずっと「人」のままなのです。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "us",
        text: "We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness.",
        ja: "われわれは、次のことを、証明するまでもない真理だと考える。すべての人は平等につくられていること。人はみな、創造主によって、だれにもゆずりわたせない権利をあたえられていること。その権利の中には、生きること、自由であること、そして幸せを追い求めることがふくまれていること。",
        cite: "Declaration of Independence (1776)",
        source: "https://www.archives.gov/founding-docs/declaration-transcript",
      }],
      photos: [
        {
          src: `${C}/independence-hall.webp`, width: 800, height: 533,
          alt: "芝生の広場の奥に建つ、白い時計塔のある赤れんがの建物。後ろに現代の高層ビルが見える",
          caption: "フィラデルフィアの{{独立記念館}}（当時のペンシルベニア植民地議会の議事堂）。1776年、大陸会議はこの建物で独立宣言を採択した。",
          credit: { author: "Foolish Productions Photography", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:Independence_Hall_008.jpg" },
        },
      ],
      cliff: "ふつうの文を受け身にするには、どの順番で語を動かせばよいのでしょう？",
      figure: {
        type: "compare",
        title: "能動態と受け身",
        columns: [{ title: "能動態" }, { title: "受け身", tone: "yellow" }],
        rows: [
          { label: "主語", cells: ["する側（Tom）", "される側（it）"] },
          { label: "動詞", cells: ["made", "was made"] },
          { label: "例", cells: ["Tom made it.", "It was made by Tom."] },
          { label: "意味", cells: ["トムがそれを作った", "それはトムに作られた"] },
        ],
      },
    },
    {
      heading: "能動態を受け身に書きかえる3ステップ",
      body: "①もとの文の{{目的語を主語}}にする、②動詞を{{be動詞＋過去分詞}}にする、③もとの主語を {{by のあと}}に置く、の順で書きかえます。by のあとが代名詞なら、him・her・them などの{{目的格}}にします。",
      reading: [
        "独立宣言の最初の原稿を書いたのは、当時33歳のトマス・ジェファソンでした。Thomas Jefferson wrote the first draft.（ジェファソンが最初の原稿を書いた）を受け身にしてみましょう。①目的語の the first draft を主語にする。②過去の文なので wrote を was written にする。③もとの主語を by のあとへ。The first draft was written by Thomas Jefferson.（最初の原稿はジェファソンによって書かれた）のできあがりです。",
        "原稿はそのまま通ったわけではありません。大陸会議は議論を重ね、表現を直したり、一部をけずったりしました。Congress changed some parts. を受け身にすると、Some parts were changed by Congress.（いくつかの部分は議会によって変えられた）。主語が複数なので were です。けずられた中には、奴隷貿易について国王を責める一節もありました。宣言の文は、一人の作品ではなく、多くの人の手で仕上げられたのです。",
        "by のあとが代名詞なら目的格にします。He wrote it. → It was written by {{him}}. です。「by he」とは言いません。by は前置詞なので、with him、for her と同じように、後ろの代名詞は目的格になるのです。",
      ],
      photos: [
        {
          src: `${C}/trumbull.webp`, width: 800, height: 525,
          alt: "旗のかざられた広間で、机の前に立つ5人の男性が書類を差し出し、まわりに大勢の男性が座っている油絵",
          caption: "トランブル『独立宣言』（1819年）。原稿を作った5人の委員が議会に提出する場面。中央の背の高い赤いベストの人物がジェファソン。全員が一度に集まった実際の場面ではない。",
          credit: { author: "John Trumbull", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Declaration_of_Independence_(1819),_by_John_Trumbull.jpg" },
        },
      ],
      cliff: "採択された宣言はその夜のうちに刷られました。そのとき be動詞は is？　was？",
      figure: {
        type: "formula",
        title: "Many people love this song. を受け身に",
        prose: true,
        steps: [
          { label: "もと", expr: "Many people love {{this song}}.", note: "目的語を見つける" },
          { label: "①", expr: "{{This song}} …", note: "目的語を主語に" },
          { label: "②", expr: "This song {{is loved}} …", note: "主語と時に合う be動詞＋過去分詞" },
          { label: "③", expr: "This song is loved {{by many people}}.", note: "もとの主語を by のあとへ" },
        ],
      },
    },
    {
      heading: "be動詞で「時」と「数」を表す",
      body: "受け身の時（現在か過去か）は{{be動詞で表し}}、過去分詞の形は変わりません。今のことなら is・am・are、過去のことなら {{was・were}} を、主語の数に合わせて選びます。These pictures were taken in Kyoto. は、主語が複数で過去なので were です。",
      reading: [
        "受け身の「時」を決めるのは be動詞です。過去分詞の written や made は、今の話でも昔の話でも形が変わりません。The Declaration was adopted on July 4, 1776.（宣言は1776年7月4日に採択された）は過去で、主語が1つなので was。その夜、印刷屋のジョン・ダンラップのもとで、宣言は大きな1枚の紙に刷られました。Copies were printed that night.（写しがその夜、印刷された）は、主語が複数なので were です。",
        "刷られた紙は馬で各地の植民地や軍隊へ運ばれ、広場で読み上げられました。7月8日にはフィラデルフィアの議事堂の中庭で、町の人々の前で初めて公に読み上げられています。The Declaration was read to the people.（宣言は人々に読み上げられた）。だれが読んだかより、宣言が人々に届いたことが大切なので、by は省いています。",
        "今の話なら is / are です。July 4 is celebrated as Independence Day.（7月4日は独立記念日として祝われている）。署名された宣言の本書は、今は首都ワシントンの国立公文書館で展示されています。The Declaration is kept in the National Archives. 時がちがっても、過去分詞の kept はそのまま。be動詞だけが「いつ」と「いくつ」を引き受けているのです。",
      ],
      photos: [
        {
          src: `${C}/dunlap.webp`, width: 800, height: 986,
          alt: "大きな見出し IN CONGRESS, JULY 4, 1776. A DECLARATION の下に、小さな活字がびっしり並ぶ古い印刷物",
          caption: "ダンラップが刷った独立宣言（ダンラップ版、1776年）。採択の夜に刷られ各地へ送られた。2段落目の冒頭に all Men are created equal の文が見える（米国議会図書館所蔵）。",
          credit: { author: "John Dunlap; text by Thomas Jefferson et al.", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Dunlap_broadside_copy_of_the_United_States_Declaration_of_Independence,_LOC.jpg" },
        },
      ],
      cliff: "「演説」と呼ばれるのに、一度も話されなかった名文があります。疑問文で確かめましょう。",
      figure: {
        type: "tree",
        title: "受け身の be動詞を選ぶ",
        root: {
          label: "主語と時",
          children: [
            {
              label: "現在",
              sub: "今のこと",
              tone: "blue",
              children: [
                { label: "is / am", sub: "1つ・1人（I は am）" },
                { label: "are", sub: "2つ以上・you" },
              ],
            },
            {
              label: "過去",
              sub: "前のこと",
              tone: "yellow",
              children: [
                { label: "was", sub: "1つ・1人" },
                { label: "were", sub: "2つ以上・you" },
              ],
            },
          ],
        },
      },
    },
    {
      heading: "否定文・疑問文は be動詞の文と同じ",
      body: "受け身には be動詞が入っているので、否定文は be動詞の{{後ろに not}}、疑問文は be動詞を{{主語の前}}に出します。{{do・does・did は使いません}}。答えるときも be動詞を使います。",
      reading: [
        "独立から20年後の1796年、初代大統領ジョージ・ワシントンは、2期8年でしりぞくことを決め、国民へのお別れの言葉を発表しました。これが{{ワシントン告別演説}}です。では、問題。Was the Farewell Address given as a speech?（告別演説は、演説として話されたのですか）—— No, it wasn't. It was printed in a newspaper.（いいえ。新聞に印刷されたのです）。1796年9月19日、フィラデルフィアの新聞に載り、各地の新聞が次々と転載しました。",
        "疑問文は was を主語の前に出し、答えも was / wasn't で返します。did は使いません。Did the Farewell Address given …… は誤りです。告別演説は、だれかが壇上で読み上げたものではなく、国じゅうの人が紙で読んだ「書かれた演説」でした。それでも名文として受けつがれ、今もアメリカ上院では毎年、ワシントンの誕生日のころに全文が読み上げられています。It is read aloud in the Senate every year.",
        "下の一節で、ワシントンは国の土台を語ります。人民には憲法をつくり、改める権利がある。しかし今ある憲法は、till changed by an explicit and authentic act of the whole people（人民全体のはっきりとした正式の行為によって変えられるまでは）、すべての人が守るべきものだ、と。changed by は it is changed by の it is を省いた形で、受け身の一部です。ここでは by が欠かせません。憲法を変えられるのは「だれか」ではなく、人民全体だけだからです。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "us",
        text: "The basis of our political systems is the right of the people to make and to alter their constitutions of government. But the Constitution which at any time exists, till changed by an explicit and authentic act of the whole people, is sacredly obligatory upon all.",
        ja: "わたしたちの政治のしくみの土台は、人民が自分たちの政府の憲法をつくり、また改める権利にあります。けれども、そのときどきにある憲法は、人民全体のはっきりとした正式の行いによって改められるまでは、すべての人がおごそかに守らなければならないものなのです。",
        cite: "George Washington, Farewell Address (1796)",
        source: "https://avalon.law.yale.edu/18th_century/washing.asp",
      }],
      photos: [
        {
          src: `${C}/washington.webp`, width: 800, height: 1285,
          alt: "黒い服を着た白髪の男性が、右手を前に差し出して立つ全身の肖像画。横の机に羽ペンと本がある",
          caption: "ギルバート・スチュアートが1796年にえがいたワシントンの肖像（ランズダウン・ポートレート）。この年、ワシントンは告別演説を新聞で発表した。",
          credit: { author: "Gilbert Stuart", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Gilbert_Stuart,_George_Washington_(Lansdowne_portrait,_1796).jpg" },
        },
      ],
      cliff: "ワシントンは by をはっきり書きました。では、by を書かないのはどんなときでしょう？",
      figure: {
        type: "formula",
        title: "This bag was made in Italy. を書きかえる",
        prose: true,
        steps: [
          { expr: "This bag {{was made}} in Italy.", note: "肯定文" },
          { expr: "This bag was {{not}} made in Italy.", note: "否定文：was のあとに not（wasn't）" },
          { expr: "{{Was}} this bag made in Italy{{?}}", note: "疑問文：was を主語の前へ" },
          { expr: "— Yes, it {{was}}. / No, it {{wasn't}}.", note: "答えも be動詞で" },
        ],
      },
    },
    {
      heading: "by を使わないとき",
      body: "したのがだれか{{わからない}}とき、{{言わなくてもわかる}}ときは by 〜 を省きます。English is spoken in Canada. の「話す人」はカナダの人々だとわかるので、by は書きません。また、be known {{to}} 〜（〜に知られている）、be covered {{with}} 〜（〜でおおわれている）、be interested {{in}} 〜（〜に興味がある）のように、by 以外を使う決まった言い方もあります。",
      reading: [
        "English is spoken in Canada.（カナダでは英語が話されている）に by Canadians をつけないのは、言わなくてもわかるからです。This temple was built about 600 years ago.（この寺は約600年前に建てられた）のように、だれがしたかわからないときも省きます。受け身の文の多くは、実は by がありません。受け身は「だれが」を言うための形ではなく、「される側」に光を当てるための形だからです。",
        "独立宣言は、権利の話のすぐあとにこう続けます。Governments are instituted among Men（政府は人々のあいだにつくられる）。ここにも by はありません。かわりに、政府の正しい力は the consent of the governed（治められる人々の同意）から来る、と言います。the governed は「the＋過去分詞」で「治められる人々」。ここでも主役は、される側の人々です。",
        "宣言がうたった「すべての人」には、当時、奴隷とされた人々や女性はふくまれていないという大きな矛盾がありました。けれどもこの一文は、のちに奴隷制の廃止や公民権を求めた人々が何度も引用し、「平等を本当にすべての人に」と訴える根拠になりました。The Declaration is known {{to}} people all over the world.（宣言は世界じゅうの人々に知られている）。be known のあとは by ではなく to です。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "us",
        text: "That to secure these rights, Governments are instituted among Men, deriving their just powers from the consent of the governed",
        ja: "これらの権利を守るために、人々のあいだに政府がつくられる。そして政府の正しい力は、治められる人々の同意から生まれる。",
        cite: "Declaration of Independence (1776)",
        source: "https://www.archives.gov/founding-docs/declaration-transcript",
      }],
      reveal: "受け身は「される側」を主語にして、人に光を当てる形です。all men are created equal では、だれがつくったかより「人はみな平等に生まれた」ことが大事で、言わなくてもわかるので by を省きました。一方、権利の話では「だれがあたえたか」こそが主張の芯でした。国王や政府ではなく創造主からあたえられた権利なら、国王にも取り上げられない。だから {{by their Creator}} をはっきり書いたのです。by を書くかどうかは、何を伝えたいかで決まります。",
    },
  ],
  story: {
    kind: "novel",
    title: "七月八日の中庭",
    paragraphs: [
      "1776年7月8日の昼、フィラデルフィアの議事堂の中庭は、人でうまっていた。十三歳のナットは、町の印刷所の見習いだ。インクのしみた指をエプロンでぬぐいながら、大人たちの肩のすきまから前をのぞいた。四日前、この建物で大陸会議の代表たちが、ある文書を認めたという。その夜、町の印刷所は夜どおし刷り続け、紙は馬で各地へ運ばれていった。今日はそれが、町の人々の前で初めて読み上げられるのだ。",
      "演壇に男が上がり、大きな紙を広げた。よく通る声が中庭に響く。むずかしい言葉が続き、ナットにはところどころしか聞きとれない。それでも、ある一節だけは、はっきり耳に飛びこんできた。「{{all men are created equal}}」",
      "すべての人は、平等につくられている。ナットは首をかしげた。親方に教わった活字の組み方を思い出す。are と created。文の頭にいるのは men、人間のほうだ。人が、つくられている。だれが人をつくったのかは、その言葉の中には書かれていない。王さまでも議会でもなく、ただ「すべての人」が、文のいちばん前に立っている。",
      "読み上げは続いた。「{{they are endowed by their Creator with certain unalienable Rights}}」今度は by がある。創造主によって、権利をあたえられている。ナットは思わず指を折った。さっきは「だれが」を言わなかったのに、ここではわざわざ言っている。権利をくれたのは王さまじゃない。だから王さまにも取り上げられない。そういうことか。となりにいた靴屋のおかみさんが、ナットの肩をぎゅっとつかんだ。",
      "読み上げが終わると、中庭はどっとわいた。帽子が宙に投げられ、町の鐘が鳴りはじめた。その音のなかで、ナットは人ごみの端に立つ一人の黒人の男に気づいた。男は拍手をせず、じっと演壇を見つめていた。「すべての人」の中に、あの人は入っているのだろうか。ナットには、まだ答えがわからなかった。",
      "その夜、印刷所にもどったナットは、活字の箱から a、r、e と c、r、e、a、t、e、d を一つずつ拾い、そっと並べてみた。だれがしたかより、だれがされたか。この文の先頭に立っているのは、いつも「人」だった。「何を組んでる」と親方がのぞきこんだ。「人を、文のいちばん前に置く形です」とナットは答えた。そして、昼間の男の顔を思い出しながら、活字をもう一度、強く押さえた。",
    ],
    note: "ナット、親方、靴屋のおかみさん、黒人の男性と、その会話・心情は創作です。1776年7月4日の採択、その夜に印刷された写しが各地へ送られたこと、7月8日にフィラデルフィアの議事堂の中庭で初めて公に読み上げられ、鐘が鳴らされたことは史実にもとづいています。作中の英文は宣言の実際の文で、読み上げ役（史実ではジョン・ニクソン）のせりふはつくっていません。",
  },
  mistakes: [
    { wrong: "This letter was write by Ken.", right: "This letter was written by Ken.", why: "be動詞のあとは過去分詞。write は write - wrote - written と変化します。" },
    { wrong: "This room is cleaned by she.", right: "This room is cleaned by her.", why: "by のあとの代名詞は目的格にします。" },
    { wrong: "Did this book written by him?", right: "Was this book written by him?", why: "受け身の疑問文は be動詞を主語の前に出します。did は使いません。" },
    { wrong: "English is speaked in Australia.", right: "English is spoken in Australia.", why: "speak は不規則動詞（speak - spoke - spoken）です。" },
  ],
  check: [
    { q: "They built this bridge in 2010. を受け身にしましょう。", a: "This bridge was built in 2010.", why: "過去なので was built。they は「人々」で言わなくてもわかるので by them は省く。" },
    { q: "These pictures ___ taken by my father.（過去の文）の ___ に入る語は？", a: "were", why: "主語が複数で過去なので were。" },
    { q: "Was this cake made by your mother? に Yes で答えましょう。", a: "Yes, it was.", why: "be動詞（was）でたずねられたら be動詞で答える。this cake は it に。" },
  ],
  next: [
    { label: "4択ドリル「受け身」に挑戦", href: "/learn/eibunpo-chu/j-en-2-ukemi" },
    { label: "過去分詞の型をまとめる「英単語（中2）」", href: "/learn/lecture/j-en-2-tango" },
    { label: "過去分詞をもう一度使う中3「現在完了」", href: "/learn/eibunpo-chu/j-en-3-kanryo" },
  ],
};
