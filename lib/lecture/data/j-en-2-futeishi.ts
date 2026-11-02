import type { Lecture } from "../types";

const C = "/media/commons/j-en-2-futeishi";

export const J_EN_2_FUTEISHI: Lecture = {
  unit: "j-en-2-futeishi",
  title: "不定詞は to ＋ 原形。文の中の位置で「〜すること・〜するための・〜するために」",
  hook: "I want to be a doctor.（医者になりたい）、I have a lot of homework to do.（やるべき宿題がたくさんある）、I went to the station to meet him.（彼に会うために駅へ行った）。この3つの文の「to＋動詞」は、どれも不定詞です。形は同じでも文の中で役割が変わるので、どこに置かれているかを見て意味を決める力が大切です。",
  mystery: "南極の氷の海を見下ろす丘に、100年以上前の木の十字架が立っています。刻まれた英語は To strive, to seek, to find, and not to yield. の一行だけ。主語も、文の動詞もなく、to＋動詞が4つ並ぶだけです。これは「〜すること」？「〜するために」？　そして、なぜこんな一行が、今も人の心をふるい立たせるのでしょう？",
  mission: {
    from: "科学館で南極展を準備している学芸員",
    request: "来年の南極展で、この十字架の写真を大きく展示します。刻まれた一行の日本語訳をパネルに入れたいのですが、「努めること……」と「努めるために……」で案が割れ、主語のない英文をどう訳せばよいのか決められません。名探偵のあなたに、この4つの to の正体をつきとめてほしいのです。",
    thanks: "4つの to は、刻まれなかった前の行の will（意志）を説明していたのですね。パネルには「努め、求め、見いだし、決して屈しない意志」と訳し、主語がないからこそ、見る人それぞれの誓いになる一行だと書きそえます。",
  },
  sections: [
    {
      heading: "不定詞の形は、いつも to ＋ 動詞の原形",
      body: "不定詞は{{to ＋ 動詞の原形}}の形です。主語が3人称単数でも、文が過去でも、to のあとの動詞は{{原形のまま}}です。He wants to play. の wants には -s がつきますが、to のあとの play には -s はつきません。",
      reading: [
        "{{不定詞}}は、to のあとに{{動詞の原形}}を置いた形です。I want to play tennis.（テニスがしたい）の主語を he に変えると He wants to play tennis.、過去にすると He wanted to play tennis.。-s や -ed がつくのは文の動詞 want だけで、to のあとの play はずっと同じ形です。不定詞（infinitive）という名前は「定まらない」という意味から来ています。だれが主語か、いつの話かによって形が決まらない、つまり{{原形のまま}}変わらないのです。「〜しない」と打ち消すときは、not を to の前に置いて{{not to ＋ 原形}}にします。",
        "この「変わらない形」を、最後の一行で鮮やかに使った詩があります。イギリスの詩人テニスン（1809〜1892）の「ユリシーズ」です。テニスンは大学時代の親友ハラムを1833年に22歳の若さで亡くし、その悲しみの中でこの詩を書き上げ、1842年の詩集で発表しました。ユリシーズは、ギリシャ神話の英雄オデュッセウスの英語名です。トロイア戦争のあと10年も海をさまよって故郷の王にもどった英雄が、年老いてなお、仲間とふたたび未知の海へこぎ出そうと語る、という詩です。",
        "詩の結びは To strive, to seek, to find, and not to yield.（努め、求め、見いだし、そして屈しない）。strive・seek・find・yield は、どれも{{原形}}です。最後だけ not to yield と、not が to の前に置かれています。原形には「だれが」「いつ」の印がありません。だからこの一行は、老いた王の言葉であると同時に、読む人みんなの、どの時代の言葉にもなれます。2012年のロンドン・オリンピックでは、選手村の壁にもこの一行が掲げられました。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "Tho' much is taken, much abides; and tho'\nWe are not now that strength which in old days\nMoved earth and heaven, that which we are, we are;\nOne equal temper of heroic hearts,\nMade weak by time and fate, but strong in will\nTo strive, to seek, to find, and not to yield.",
        ja: "多くが失われても、多くは残る。そして、\nかつて大地と天を動かした、あの力は\nもう今のわれらにはない。それでも、われらはわれらだ。\n英雄の心がそろった、ひとつの気質。\n時と運命に弱らされても、意志は強い。\n努め、求め、見いだし、そして決して屈しない意志は。",
        cite: "Alfred Tennyson, \"Ulysses\" (Poems, 1842)",
        source: "https://rpo.library.utoronto.ca/poems/ulysses",
        say: "Though much is taken, much abides; and though\nWe are not now that strength which in old days\nMoved earth and heaven, that which we are, we are;\nOne equal temper of heroic hearts,\nMade weak by time and fate, but strong in will\nTo strive, to seek, to find, and not to yield.",
      }],
      photos: [
        {
          src: `${C}/tennyson.webp`, width: 612, height: 790,
          alt: "長い髪とあごひげの男性が、少しうつむいて前を見ている、茶色がかった肖像画",
          caption: "詩人テニスンの肖像。親友の死の悲しみの中で「ユリシーズ」を書いた。結びの一行は、{{原形}}の動詞を to で4つ重ねている。",
          credit: { author: "Francis Job Short", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Portrait_of_Alfred_Tennyson_(4674610).jpg" },
        },
      ],
      figure: {
        type: "formula",
        title: "主語や時がかわっても、to のあとは原形",
        prose: true,
        steps: [
          { expr: "I want {{to play}} tennis.", note: "原形 play" },
          { expr: "He {{wants}} {{to play}} tennis.", note: "-s がつくのは wants だけ" },
          { expr: "He {{wanted}} {{to play}} tennis.", note: "過去でも to play のまま" },
        ],
      },
      cliff: "形はいつも同じなのに、意味は3通り。to＋原形は、文の中でどんな役を演じ分けるのでしょう？",
    },
    {
      heading: "3つの使い方：名詞・形容詞・副詞のはたらき",
      body: "不定詞には3つの使い方があります。{{名詞的用法}}は「〜すること」で、want・like・start などの目的語になります。{{形容詞的用法}}は「〜するための・〜すべき」で、すぐ前の名詞を説明します。{{副詞的用法}}は「〜するために（目的）」「〜して（感情の原因）」で、動詞や形容詞に意味を足します。",
      reading: [
        "1つめは{{名詞的用法}}です。I like to read.（読むことが好きだ）の to read は「読むこと」という名詞のかたまりになり、like の目的語として「何が好き？」に答えます。want to 〜（〜したい）、hope to 〜（〜することを望む）、start to 〜（〜し始める）、try to 〜（〜しようとする）など、よく使う組み合わせは、そのまま覚えてしまうと便利です。My dream is to travel around the world.（私の夢は世界を旅することだ）のように、be動詞のあとに置くこともできます。",
        "2つめは{{形容詞的用法}}で、すぐ前の名詞を後ろから説明します。something to drink（飲むための何か＝何か飲み物）、time to sleep（眠る時間）、homework to do（やるべき宿題）。日本語では「飲む物」と説明が前に来ますが、英語では名詞のあとに to を続けます。3つめは{{副詞的用法}}です。I went to the library to study.（勉強するために図書館へ行った）は「何のために」という{{目的}}を、I was glad to see you.（あなたに会えてうれしかった）は、うれしくなった{{原因}}を表します。",
        "「ユリシーズ」には、名詞的用法が続けて出てくる行もあります。年老いた王は、故郷の島で何もせずに暮らす毎日をこう嘆きます。How dull it is to pause, to make an end,（立ち止まること、終わりにしてしまうことの、なんと退屈なことか）。文の最初の it は、後ろの to pause 以下の「〜すること」を指しています（この形は中3でくわしく学びます）。シェイクスピアの『ハムレット』の有名なせりふ To be, or not to be も、「生きること」か「生きないこと」かという名詞的用法です。英語の名ぜりふには、不定詞がよく顔を出します。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "How dull it is to pause, to make an end,\nTo rust unburnish'd, not to shine in use!",
        ja: "立ち止まること、終わりにしてしまうこと、\nみがかれぬままさびつき、使われて輝かないことの、なんと味気ないことか！",
        cite: "Alfred Tennyson, \"Ulysses\" (Poems, 1842)",
        source: "https://rpo.library.utoronto.ca/poems/ulysses",
        say: "How dull it is to pause, to make an end,\nTo rust unburnished, not to shine in use!",
      }],
      figure: {
        type: "compare",
        title: "不定詞の3つの用法",
        columns: [{ title: "意味", tone: "yellow" }, { title: "例" }],
        rows: [
          { label: "名詞的", cells: ["〜すること", "I like {{to read}}."] },
          { label: "形容詞的", cells: ["〜するための・べき（前の名詞を説明）", "time {{to sleep}}"] },
          { label: "副詞的", cells: ["〜するために／〜して", "came {{to see}} you"] },
        ],
      },
      cliff: "では、目の前の to＋原形が3つのうちどれなのか、どこを見れば見分けられるのでしょう？",
    },
    {
      heading: "迷ったら「to の前に何があるか」を見る",
      body: "用法は to の{{すぐ前}}を見ると見分けやすくなります。前が want・like・hope など「何を？」と聞ける動詞なら名詞的。前が something や time などの{{名詞}}なら、その名詞を説明する形容詞的。前で文がもう完成していて「何のために？」に答えているなら副詞的です。happy・sad などの{{感情の形容詞}}のあとなら「〜して」と原因を表します。",
      reading: [
        "用法を見分けるコツは、to の{{すぐ前}}を見ることです。前が want・like・hope のような「何を？」と聞ける動詞なら名詞的。前が something・time・book などの{{名詞}}なら、その名詞を説明する形容詞的。I got up early to catch the first train.（始発に乗るために早起きした）のように、to の前で文がすでに完成していて、to 以下が「何のために？」に答えているなら副詞的です。glad・happy・sad など{{感情の形容詞}}のすぐあとなら、「〜して」と原因を表します。",
        "もう1つ大事なのは、to の{{後ろ}}も見ることです。to のあとが動詞の原形なら不定詞ですが、名詞なら「〜へ」を表す{{前置詞}}の to です。go to school の to は前置詞です。1776年のアメリカ独立宣言の書き出しの1文には、to が5回も出てきます。to dissolve（断ち切ること）と to assume（占めること）は不定詞。to which・to the opinions・to the separation は、後ろが名詞のなかまなので前置詞です。to を見たら、前と後ろの両方を確かめましょう。",
        "最初の謎にもどりましょう。十字架の一行は、実は詩の途中から切り出されたもので、すぐ前の行は but strong in will（それでも意志は強い）で終わっています。will は助動詞ではなく、「意志」という{{名詞}}です。名詞のすぐ後ろの to なので、4つの to は{{形容詞的用法}}で、どんな意志なのかを説明しています。同じ詩の my purpose holds / To sail beyond the sunset（日の沈むかなたへ船を出すという決意は変わらない）も、名詞 purpose（決意）を to sail が説明する形です。",
        "この一行が刻まれたのは、南極のロス島にあるオブザベーション・ヒルです。1912年1月、イギリスのスコット隊の5人は南極点にたどり着きましたが、ノルウェーのアムンセン隊がおよそ1か月早く到達していました。5人は帰り道で全員が亡くなります。1913年1月、隊の仲間たちは丘の上に木の十字架を立て、5人の名前と、この詩の一行を刻みました。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "us",
        text: "When in the Course of human events, it becomes necessary for one people to dissolve the political bands which have connected them with another, and to assume among the powers of the earth, the separate and equal station to which the Laws of Nature and of Nature's God entitle them, a decent respect to the opinions of mankind requires that they should declare the causes which impel them to the separation.",
        ja: "人類の歴史の流れのなかで、ある人民が、自分たちを別の人民と結びつけてきた政治のきずなを断ち切り、自然の法と自然の神があたえる、独立した対等な地位を世界の国々の中で占めることが必要になったとき、人類の意見にふさわしい敬意をはらうならば、その人民は、自分たちを分離へとかりたてた理由を、はっきり示すべきである。",
        cite: "Declaration of Independence (1776)",
        source: "https://www.archives.gov/founding-docs/declaration-transcript",
      }],
      photos: [
        {
          src: `${C}/scott-cross.webp`, width: 800, height: 1178,
          alt: "雪と黒い岩の丘の頂上に立つ、大きな木の十字架。後ろに白い氷の海と遠い山なみが広がる",
          caption: "南極ロス島のオブザベーション・ヒルに立つ十字架。1913年、スコット隊の5人をしのんで仲間が立てた。「ユリシーズ」の結びの一行が刻まれている。",
          credit: { author: "Michael Van Woert, NOAA NESDIS, ORA", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Cross_on_Observation_Hill_-_Scott_memorial.jpg" },
        },
        {
          src: `${C}/cross-closeup.webp`, width: 800, height: 603,
          alt: "古びた木の十字架の横木を下から見上げた写真。木の表面に人の名前が彫られている",
          caption: "十字架を近くから見上げたところ。横木には5人の名前が彫られ、縦の柱に IN MEMORIAM（追悼）の文字が見える。一行の4つの to は、前の行の{{名詞}} will を説明する。",
          credit: { author: "Tsy1980", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:Observation_Hill_Cross_Close-up.jpg" },
        },
      ],
      figure: {
        type: "tree",
        title: "to の前を見て用法を決める",
        root: {
          label: "to ＋ 原形",
          children: [
            { label: "前が want / like", sub: "「何を？」の答え", children: [{ label: "名詞的", sub: "〜すること", tone: "blue" }] },
            { label: "前が名詞", sub: "something / time", children: [{ label: "形容詞的", sub: "〜するための", tone: "yellow" }] },
            { label: "文が完成済み", sub: "「なぜ？」の答え", children: [{ label: "副詞的", sub: "〜するために", tone: "red" }] },
          ],
        },
        note: "副詞的用法で happy / glad / sad などのあとにくると「〜して（うれしい）」。",
      },
      reveal: "十字架の一行は、詩の文の後半だけを切り出したものでした。すぐ前の行は strong in will で終わり、will は「意志」という{{名詞}}です。名詞のすぐ後ろの to なので、4つの to は{{形容詞的用法}}で、「努め、求め、見いだし、屈しない（ための）意志」と、どんな意志かを説明しています。そして to のあとはすべて{{原形}}なので、「だれが」「いつ」の印がありません。主語が切り落とされたからこそ、この一行は5人の誓いにも、読む人自身の誓いにもなるのです。",
      cliff: "「何のために？」と聞かれたら、to＋原形だけで答えることもできます。",
    },
    {
      heading: "Why ～? に To ～. で答えられる",
      body: "副詞的用法の「〜するために」は{{目的}}を表すので、Why（なぜ）の疑問文に {{To ＋ 原形}}だけで答えることができます。Why did you go to the park? — To play soccer. のように使います。Because 〜. で理由を答えることもできます。",
      reading: [
        "Why did you go to the park?（なぜ公園に行ったの？）と聞かれたら、To play soccer.（サッカーをするためだよ）と、{{To ＋ 原形}}だけで答えられます。I went to the park to play soccer. の、副詞的用法の部分だけを言った形です。Because I wanted to play soccer.（サッカーをしたかったから）と Because で答えることもできます。To 〜 は「何のために」という{{目的}}、Because 〜 は「なぜなら」という理由や事情を言うときに使う、と考えると使い分けやすくなります。",
        "目的の不定詞を、文の先頭に置いて力強く使った例が、さきほどの独立宣言です。1776年7月4日、北アメリカの13の植民地の代表が集まる大陸会議は、フィラデルフィアのペンシルベニア植民地議事堂（今の独立記念館）で、イギリスからの独立を宣言する文書を採択しました。起草の中心になったのは、のちに第3代大統領となるトマス・ジェファーソンです。宣言は、なぜ独立するのかを世界に向けて説明しようとしました。",
        "宣言は、すべての人には生命・自由・幸福を追い求める権利がある、と述べたあと、イギリス国王の政治はその権利をおかしてきたと主張します。そして To prove this, let Facts be submitted to a candid world.（これを証明するために、事実を公正な世界に示そう）と書き、国王への不満を20以上も並べていきます。「なぜこんなに長い一覧を並べるのか？」という問いに、文書みずから To prove this と目的を答えているのです。後ろの to a candid world の to は、名詞の前なので前置詞です。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "us",
        text: "To prove this, let Facts be submitted to a candid world.",
        ja: "これを証明するために、事実を、公正な世界の前に示そう。",
        cite: "Declaration of Independence (1776)",
        source: "https://www.archives.gov/founding-docs/declaration-transcript",
      }],
      photos: [
        {
          src: `${C}/declaration.webp`, width: 800, height: 973,
          alt: "古い羊皮紙に、細かい手書きの文字がびっしり並び、下の方に多くの署名がある文書",
          caption: "羊皮紙に清書された独立宣言（アメリカ国立公文書館）。いちばん上に IN CONGRESS, JULY 4, 1776 とある。本文の途中に To prove this の1文がある。",
          credit: { author: "Second Continental Congress", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Engrossed_Declaration_of_Independence,_front.jpg" },
        },
        {
          src: `${C}/independence-hall.webp`, width: 800, height: 533,
          alt: "芝生の向こうに、赤れんがの建物と、時計のついた白い塔が立っている。後ろに高層ビルが見える",
          caption: "フィラデルフィアの独立記念館（2019年）。1776年、ここに集まった大陸会議が独立宣言を採択した。",
          credit: { author: "Mys 721tx", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0", source: "https://commons.wikimedia.org/wiki/File:Exterior_of_the_Independence_Hall,_Aug_2019.jpg" },
        },
      ],
    },
  ],
  story: {
    kind: "novel",
    title: "主語のない一行",
    paragraphs: [
      "1913年1月、南極のマクマード湾。十六歳の見習い水夫ジョーは、氷のあいだを進む船の甲板から、岸の小屋を見つめていた。一年ぶりに迎えに来た船だった。けれど、浜に並んだ男たちは手をふらなかった。その夜、ジョーは知った。南極点をめざした五人は、点にはたどり着いたものの、ほかの国の旗が先に立っていたこと。そして帰り道で、五人とも戻らなかったことを。",
      "数日後、小屋の裏で、大きな木の十字架が作られていた。木には五人の名前が一字ずつ彫りこまれていく。最後に、英語の一行が加わった。学校を十二でやめたジョーは、指でなぞりながら声に出した。「To strive, to seek, to find, and not to yield」",
      "「意味、わかるか」と、となりで木くずを払っていた古参の水夫ビルが聞いた。「strive は、うんとがんばる。seek はさがす。find は見つける。yield は……負けて、ゆずること？」「そうだ。not to yield で、屈しない、だ」。ジョーは首をかしげた。「でも、だれが？　I も he もない。ただ to が四つ並んでるだけだ。これ、文になってないよ」",
      "ビルは答えるかわりに、上着のポケットから、角のすり切れた小さな詩集を出した。「この一行は、詩の終わりのところだ。前を読んでみな」。その晩、ジョーは寝台でランプを引き寄せた。年老いた王が、もう一度、仲間と海へこぎ出そうと語る詩だった。力はもう昔ほどない。それでも――。最後の一行のすぐ上に、こうあった。but strong in will。",
      "「will……」。ジョーは、昼間の十字架の文字を思い出した。will は「〜するつもり」の will じゃない。名詞の「意志」だ。その意志が、どんな意志なのか。努める意志、求める意志、見つける意志、そして屈しない意志。四つの to は、will を後ろから説明していたのだ。",
      "十字架を丘の上へ運び上げる日は、風が強かった。男たちはロープを肩にかけ、雪と岩の斜面を、一歩ずつ登った。頂上に立てて石で根元を固めると、目の下に、五人が歩いていった白い氷の原が広がっていた。",
      "ジョーはもう一度、刻まれた一行を見上げた。前の行が刻まれていないから、主語もない。だれの意志とも書いていない。だから、これは五人の意志で、それを運び上げたビルたちの意志で、たぶん、ぼくの意志にもなれる。to のあとの動詞は、だれが読んでも、いつ読んでも、形を変えない。ジョーは、風に負けない声で、四つの to をくり返した。",
    ],
    note: "見習い水夫ジョーと古参の水夫ビル、2人の会話と心情は創作です。スコット隊の5人が1912年1月に南極点に着いたときノルウェーのアムンセン隊が先に到達していたこと、5人が帰路で亡くなったこと、1913年1月に迎えの船が着き、隊の仲間がオブザベーション・ヒルに木の十字架を立てて5人の名前とテニスン「ユリシーズ」の一行を刻んだことは史実にもとづきます。十字架を作った人やだれがこの一行を選んだかは物語では描かず、実在の人物のせりふはつくっていません。",
  },
  mistakes: [
    { wrong: "She wants to plays the piano.", right: "She wants to play the piano.", why: "to のあとは、主語が3人称単数でも必ず原形です。" },
    { wrong: "I want something to drinking.", right: "I want something to drink.", why: "不定詞は to ＋ 原形。-ing の形にはしません。" },
    { wrong: "I went to the shop for buy milk.", right: "I went to the shop to buy milk.", why: "「〜するために」と目的を表すときは to ＋ 原形を使います。for のあとに動詞の原形は置けません。" },
  ],
  check: [
    { q: "I have a lot of books to read. の to read は何用法？", a: "形容詞的用法", why: "前の名詞 books を「読むための・読むべき」と説明している。" },
    { q: "I was happy to hear the news. の意味は？", a: "私はその知らせを聞いてうれしかった。", why: "感情の形容詞 happy のあとの不定詞は「〜して」と原因を表す（副詞的用法）。" },
    { q: "「彼は泳ぐことが好きです」を不定詞を使って英語に。", a: "He likes to swim.", why: "名詞的用法。likes には -s、to のあとは原形 swim。" },
  ],
  next: [
    { label: "4択ドリル「不定詞」に挑戦", href: "/learn/eibunpo-chu/j-en-2-futeishi" },
    { label: "「〜すること」のもう1つの形「動名詞」", href: "/learn/eibunpo-chu/j-en-2-domeishi" },
    { label: "中3「不定詞の発展（It is ~ for … to など）」", href: "/learn/eibunpo-chu/j-en-3-futeishi" },
  ],
};
