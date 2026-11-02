import type { Lecture } from "../types";

const C = "/media/commons/j-en-3-kanryo-shinko";
const RIP = "https://www.gutenberg.org/ebooks/2048";

export const J_EN_3_KANRYO_SHINKO: Lecture = {
  unit: "j-en-3-kanryo-shinko",
  title: "現在完了進行形は have been ＋ ing。「今までずっと〜し続けている」",
  hook: "「1時間ずっと待っている」「今朝からずっと雨が降っている」。過去に始まった動作が、今この瞬間まで{{続いている}}ことを言うのが現在完了進行形です。現在完了の「継続」とよくにているので、どの動詞でどちらを使うかを整理しましょう。",
  mystery: "山で20年眠りこけたリップ・ヴァン・ウィンクルが村に帰ると、老婆はこうたずねます。Where have you been these twenty long years?　20年も前のことを聞くのに、なぜ過去形の Where were you? ではないのでしょう？　しかも、ずっと続いていたのに、なぜ have been being のような進行形にならないのでしょう？",
  mission: {
    from: "英語劇部の脚本係の先輩",
    request: "文化祭で、英語劇「リップ・ヴァン・ウィンクル」を上演します。老婆役の後輩に「20年前のことなら Where were you? のほうが簡単では？」と聞かれ、原作のせりふを残すべきか迷っています。せりふを書きかえるかどうか決めるために、名探偵のあなたに have been のなぞを解いてほしいのです。",
    thanks: "have been は、20年前の出発から「今、目の前に立っている」までを丸ごとつつむ形だったのですね。be は状態の動詞だから進行形にしない。原作のせりふのまま、20年分の重みをこめて演じてもらいます。",
  },
  sections: [
    {
      heading: "過去に始まり、今も続いている動作",
      body: "I have been studying English since 2023. は「2023年に英語の勉強を始めて、{{今もしている}}」という意味です。過去のある時点から{{今まで}}、動作がずっと続いていることを表します。始まった時点は {{since}}、続いている長さは {{for}} で表します。",
      reading: [
        "I have been reading this book since lunch.（お昼からずっとこの本を読んでいる）。読み始めたのは過去ですが、今もまだ読んでいます。過去のある点から今この瞬間まで、動作が一本の線でつながっている。これが{{現在完了進行形}}の表す時間です。始まった時点を言うときは {{since}}（〜から）、続いてきた長さを言うときは {{for}}（〜の間）を使います。since lunch も for two hours も、線の「始まり」と「長さ」を別の角度から言っているだけです。",
        "「ずっと〜し続けて、気づけば今」という時間を、まるごと一つの物語にした作家がいます。アメリカのワシントン・アーヴィング（1783〜1859年）です。短編「{{リップ・ヴァン・ウィンクル}}」は、1819年に作品集『スケッチ・ブック』の最初の分冊で発表されました。独立して間もないアメリカには、まだ自分たちの文学がないと言われていた時代です。この作品集はイギリスでも評判になり、アーヴィングはアメリカの作家として早くから国際的に知られた一人になりました。",
        "舞台は、ニューヨーク州のハドソン川ぞい、キャッツキル山地のふもとにある、オランダ系の移民が開いた村です。人がよく、子どもや犬にはとても好かれるのに、自分の畑仕事はさっぱりのリップは、口うるさいおかみさんから逃げるように、犬と銃を連れて山へ入ります。そこで古風な服を着た男たちが、だまって九柱戯（ボウリングに似た遊び）をしているのに出会います。すすめられた酒を飲むうちに、リップはぐっすり眠りこんでしまうのです。",
      ],
      figure: {
        type: "timeline",
        title: "I have been studying English since 2023.",
        eras: [{ label: "ずっと勉強している", from: 2023, to: 2026 }],
        events: [
          { year: 2023, label: "英語の勉強を始める", key: true },
          { year: 2026, yearLabel: "今", label: "今も勉強している", key: true },
        ],
        note: "長さで言うと I have been studying English for three years.",
      },
      photos: [
        {
          src: `${C}/irving.webp`, width: 750, height: 750,
          alt: "ほおに手をあて、いすにもたれてこちらを見る中年の男性の肖像画。下半分は下描きのような筆づかい",
          caption: "ワシントン・アーヴィングの肖像（ダニエル・ハンティントン画）。1819年に「{{リップ・ヴァン・ウィンクル}}」を発表し、アメリカ文学を海外に知らせた。",
          credit: { author: "Daniel Huntington", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Daniel_Huntington_-_Washington_Irving_-_NPG.69.23_-_National_Portrait_Gallery.jpg" },
        },
        {
          src: `${C}/ninepins.webp`, width: 800, height: 550,
          alt: "雪の残る岩山で、とんがり帽子やひげの奇妙な男たちが、木の球を持って集まっている挿絵",
          caption: "アーサー・ラッカムの挿絵（1905年の版）。山の中で{{九柱戯}}をする、ふしぎな身なりの男たち。この酒を飲んだリップは長い眠りに落ちる。",
          credit: { author: "Arthur Rackham", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Rip_Van_Winkle-067.jpg" },
        },
      ],
      cliff: "目をさましたリップは、自分がどれだけ眠ったと思ったのでしょう？",
    },
    {
      heading: "形は have / has been ＋ 動詞の ing 形",
      body: "現在完了（have＋過去分詞）の過去分詞を、be の過去分詞 {{been}} にして、そのあとに{{動詞の ing 形}}を置きます。主語が3人称単数なら {{has been}} です。「どのくらいの間〜しているのか」は {{How long}} have you been 〜ing? でたずね、for や since を使って答えます。",
      reading: [
        "形は、2つの文法の合体だと考えると覚えやすくなります。「今〜している」の{{進行形}}（be＋ing）と、「過去から今まで」の{{現在完了}}（have＋過去分詞）。be を過去分詞の {{been}} にして have のあとに入れると、have been ＋ ing ができます。主語が he・she・it なら has been。たずねるときは How long have you been playing the piano?（どのくらいピアノをひいているの？）、答えは For five years. や Since I was six. です。否定なら I haven't been sleeping well lately.（最近よく眠れていない）となります。",
        "さて、山で眠ったリップです。目をさますと、そこは前の日に男と出会った、緑の小山の上でした。下の原文では、まず The birds were hopping（鳥たちが跳ねていた）、the eagle was wheeling（ワシが輪をえがいていた）と、{{過去進行形}}が続きます。目の前で「まさに今」動いている朝の景色を、映画のカメラのように映しているのです。",
        "そのあとリップは心の中でつぶやきます。I have not slept here all night.（ひと晩じゅうここで寝ていたわけじゃあるまい）。have slept は現在完了で、「ゆうべから今朝まで」という時間のかたまりを指します。リップは、ひと晩眠りこんだことさえ信じられません。けれど本当に眠っていたのは20年。もし事実を知っていたら、I have been sleeping here for twenty years!（ここで20年ずっと眠っていたんだ！）とさけんだことでしょう。",
      ],
      figure: {
        type: "formula",
        title: "「待っている」を広げる",
        prose: true,
        steps: [
          { label: "進行形", expr: "I {{am}} waiting for Ken.", note: "今、待っている" },
          { label: "完了進行形", expr: "I {{have been}} waiting {{for an hour}}.", note: "1時間ずっと待っている" },
          { label: "3人称単数", expr: "She {{has been}} waiting since ten.", note: "主語が she なので has" },
          { label: "疑問文", expr: "{{How long}} have you been waiting?", note: "— For an hour." },
        ],
      },
      recite: [{
        lang: "en", voice: "male",
        text: "On waking, he found himself on the green knoll whence he had first seen the old man of the glen. He rubbed his eyes—it was a bright sunny morning. The birds were hopping and twittering among the bushes, and the eagle was wheeling aloft, and breasting the pure mountain breeze. “Surely,” thought Rip, “I have not slept here all night.” He recalled the occurrences before he fell asleep.",
        ja: "目をさますと、彼は、谷間の老人をはじめて見かけたあの緑の小山の上にいた。目をこすった。明るく晴れた朝だった。鳥たちは茂みのあいだを跳ねまわってさえずり、ワシは空高く輪をえがきながら、山のすんだそよ風に胸を張っていた。「まさか」とリップは思った。「ひと晩じゅうここで寝ていたわけじゃあるまい」。彼は、眠りこむ前のできごとを思い返した。",
        cite: "Washington Irving, \"Rip Van Winkle\" (The Sketch-Book, 1819)",
        source: RIP,
      }],
      photos: [
        {
          src: `${C}/catskill-sunrise.webp`, width: 800, height: 572,
          alt: "朝日に照らされた山々と、谷にたなびく霧。手前には折れた木の幹が横たわる風景画",
          caption: "トマス・コール『キャッツキル山地の日の出』（1826年）。リップが眠り、目をさましたのは、この{{キャッツキル山地}}という設定。",
          credit: { author: "Thomas Cole", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Cole_Thomas_Sunrise_in_the_Catskill_Mountains_1826.jpg" },
        },
      ],
      cliff: "村に帰ったリップを待っていたのは、have been を使った問いかけでした。",
    },
    {
      heading: "動作の動詞は進行形、状態の動詞は現在完了",
      body: "study・play・wait・rain など{{動作}}を表す動詞の「ずっと〜している」は、現在完了進行形にします。一方、know・like・be・want など{{状態}}を表す動詞はふつう進行形にしないので、{{have＋過去分詞}}（現在完了の継続）を使います。",
      reading: [
        "「ずっと〜している」には2つの形があります。study・play・wait・run のように、始まりと終わりのある{{動作}}を表す動詞は have been ＋ ing。know（知っている）・like（好きだ）・want（ほしい）・be（〜である・いる）のように、ある{{状態}}がそのまま続く動詞は、もともと「続いている」意味をふくむので進行形にせず、have＋過去分詞を使います。I have known her for ten years.（彼女とは10年来の知り合いだ）が正しく、I have been knowing her とは言いません。",
        "ひげが30センチほどものびた姿で村に戻ったリップは、おどろきます。知った顔はなく、宿屋の看板の国王ジョージの顔は、ワシントン将軍に描きかえられていました。リップが眠っている間に{{アメリカ独立戦争}}が起こり、国王の臣民だった村人は、合衆国の市民になっていたのです。リップが若い母親に父親の名をたずねると、こう返ってきます。it's twenty years since he went away（出ていってから20年になる）、そして never has been heard of since（それ以来ずっと消息がない）。2つの since が、20年前の点と今をつないでいます。",
        "その母親こそリップの娘でした。名乗り出たリップの顔を、人ごみから出てきた老婆がのぞきこみ、言います。Where have you been these twenty long years?　be は「いる」という{{状態}}の動詞なので、have been ＋ being とはせず、現在完了の have been を使います。these twenty long years は「この長い20年間」。過去形の Where were you? なら、過去のある時点でどこにいたかを聞くだけです。have been は、出ていった日から、今ここに立つまでの時間を丸ごと問いかけています。",
      ],
      figure: {
        type: "tree",
        title: "「ずっと〜している」の形を選ぶ",
        root: {
          label: "ずっと〜している",
          children: [
            {
              label: "動作の動詞",
              sub: "study / play / wait",
              tone: "blue",
              children: [{ label: "have been ＋ ing", sub: "have been playing", tone: "yellow" }],
            },
            {
              label: "状態の動詞",
              sub: "know / like / be",
              tone: "red",
              children: [{ label: "have ＋ 過去分詞", sub: "have known" }],
            },
          ],
        },
        note: "live は have been living も使われるが、中学では have lived（継続）で表すのが基本。",
      },
      recite: [
        {
          lang: "en", voice: "female",
          text: "Ah, poor man, Rip Van Winkle was his name, but it’s twenty years since he went away from home with his gun, and never has been heard of since …",
          ja: "ああ、気の毒な人。リップ・ヴァン・ウィンクルという名前でした。でも、銃を持って家を出ていってから、もう20年になります。それっきり、何の便りもないんです……",
          cite: "Washington Irving, \"Rip Van Winkle\" (The Sketch-Book, 1819)",
          source: RIP,
        },
        {
          lang: "en", voice: "female",
          text: "“… it is Rip Van Winkle—it is himself. Welcome home again, old neighbor. Why, where have you been these twenty long years?”\nRip’s story was soon told, for the whole twenty years had been to him but as one night.",
          ja: "「……リップ・ヴァン・ウィンクルだよ、本人だよ。おかえり、お隣さん。まあ、この長い20年、いったいどこにいたんだい？」\nリップの話はすぐに終わった。まる20年は、彼にとってほんのひと晩にすぎなかったのだから。",
          cite: "Washington Irving, \"Rip Van Winkle\" (The Sketch-Book, 1819)",
          source: RIP,
        },
      ],
      photos: [
        {
          src: `${C}/rip-return.webp`, width: 800, height: 562,
          alt: "白いひげの老人が銃をかつぎ、ぼろぼろの服で村の道を歩く。子どもたちと犬がはやし立てながら追いかけている挿絵",
          caption: "ラッカムの挿絵（1905年の版）。白ひげになって村へ戻ったリップを、見知らぬ子どもたちが追いかける。{{20年}}の時間が姿に表れている。",
          credit: { author: "Arthur Rackham", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Rip_Van_Winkle-095.jpg" },
        },
      ],
      reveal: "have been は、過去の点から{{今}}までを一本の線でつなぐ形です。老婆の問いは「20年前のある日」ではなく、出ていった日から今ここに立つまでの20年を丸ごとたずねているので、Where were you? ではなく {{have been}} なのです。そして be は「いる」という{{状態}}の動詞なので、進行形にせず、have＋過去分詞の have been で「ずっといた」を表します。",
      cliff: "では「今〜している」と「ずっと〜している」は、何がちがうのでしょう？",
    },
    {
      heading: "現在進行形とのちがいは「長さ」",
      body: "It is raining now. は「今降っている」ことだけを伝えます。It has been raining since this morning. は「{{今朝からずっと}}降っている」と、続いてきた{{長さ}}も伝えます。for・since・How long があれば、現在完了進行形の目じるしです。",
      reading: [
        "It is raining now.（今、雨が降っている）は、窓の外の一コマを切り取る{{現在進行形}}です。It has been raining since this morning.（今朝からずっと降っている）は、その一コマに「今朝から」という{{長さ}}を足します。「ずっと降っていて、うんざり」「だから道がぬかるんでいる」のように、続いてきた時間の重みまで伝わるのです。for・since・How long が見えたら、完了進行形の出番だと考えましょう。",
        "物語の最後、リップは村の宿屋の前のベンチに座り、旅人が来るたびに自分の不思議な話を語って聞かせるようになります。英語では今も、世の中の変化に取り残された人を a Rip Van Winkle とたとえることがあります。日本では「西洋の浦島太郎」と紹介されることもあります。長い眠りから覚めて世界が変わっている、という筋は、時代や国をこえて人の心をつかむのです。",
        "19世紀後半には、俳優ジョゼフ・ジェファーソンがリップを演じる劇が大当たりし、彼は何十年もこの役を演じ続けました。そして今、この短編について、こう言えます。People have been reading this story for more than 200 years.（人々は200年以上ずっとこの物語を読み続けている）。1819年から今まで、一度も途切れずに続いてきた時間。それこそが、現在完了進行形が表す時間です。",
      ],
      figure: {
        type: "compare",
        title: "現在進行形と現在完了進行形",
        columns: [{ title: "現在進行形" }, { title: "現在完了進行形", tone: "yellow" }],
        rows: [
          { label: "形", cells: ["am / is / are ＋ ing", "have / has been ＋ ing"] },
          { label: "表すこと", cells: ["今している最中", "前から今までずっと"] },
          { label: "目じるし", cells: ["now", "for / since / How long"] },
        ],
      },
      photos: [
        {
          src: `${C}/rip-tells.webp`, width: 800, height: 1225,
          alt: "白いひげの老人がソファに腰かけ、両手を広げて語る。床に座った子どもたちが見上げ、壁に大きな影がうつる挿絵",
          caption: "ラッカムの挿絵（1905年の版）。年老いた男が子どもたちに身ぶりをまじえて語る場面。不思議な話は語りつがれ、{{200年以上}}読まれ続けている。",
          credit: { author: "Arthur Rackham", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Rip_Van_Winkle-125.jpg" },
        },
      ],
    },
  ],
  story: {
    kind: "manga4",
    title: "図書室のリップ",
    panels: [
      {
        scene: "放課後の図書室。机にふせて眠っていたタクが目をさます。ユイがうで組みで立っている。",
        lines: [
          { who: "ユイ", text: "やっと起きた！" },
          { who: "ユイ", text: "1時間ずっと待ってたよ" },
          { who: "タク", text: "えっ、今来たとこでしょ？" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ユイ", look: "girl", x: 256, face: "shout", fx: "steam" },
            { who: "タク", look: "boy", x: 84, face: "surprise", fx: "?" },
          ],
          props: [
            { kind: "table", x: 0, y: 240 },
            { kind: "book", x: 120, y: 258 },
          ],
        },
      },
      {
        scene: "ユイがボードに「been＋ing」と書いてみせる。",
        lines: [
          { who: "ユイ", text: "アイ・ハブ・ビーン・ウェイティング" },
          { who: "ユイ", text: "始まりから{{今まで}}ずっと" },
          { who: "タク", text: "ぼく、リップみたいだ…" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ユイ", look: "girl", x: 256, face: "normal", hand: [210, 214] },
            { who: "タク", look: "boy", x: 84, face: "sweat", fx: "sweat" },
          ],
          props: [
            { kind: "board", x: 170, y: 204, text: "been＋ing" },
          ],
        },
      },
      {
        scene: "タクがごまかすように胸をはる。ユイはあきれる。",
        lines: [
          { who: "タク", text: "ユイのことはずっと知ってた" },
          { who: "タク", text: "アイ・ハブ・ビーン・ノウイング！" },
          { who: "ユイ", text: "ノウは状態！ハブ・ノウン" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "タク", look: "boy", x: 252, face: "smile" },
            { who: "ユイ", look: "girl", x: 86, face: "shout", fx: "!" },
          ],
        },
      },
      {
        scene: "ユイがボードに2つ書き分ける。タクは得意げにうなずく。",
        lines: [
          { who: "ユイ", text: "動作は{{ハブ・ビーン＋ing}}" },
          { who: "ユイ", text: "状態は{{ハブ＋過去分詞}}" },
          { who: "タク", text: "寝るのは動作。得意です" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ユイ", look: "girl", x: 256, face: "sweat", fx: "sweat", hand: [210, 214] },
            { who: "タク", look: "boy", x: 84, face: "smile", fx: "idea" },
          ],
          props: [
            { kind: "board", x: 170, y: 204, text: "動作↔状態" },
          ],
        },
      },
    ],
    note: "ユイとタクは架空の人物で、会話はすべて創作です。「動作の動詞は have been ＋ ing、know・be などの状態の動詞は have＋過去分詞」という使い分けは英文法の事実で、アーヴィングの「リップ・ヴァン・ウィンクル」（1819年）で20年眠った主人公の話も原作どおりです。",
  },
  mistakes: [
    { wrong: "I have been knowing him for five years.", right: "I have known him for five years.", why: "know は状態を表す動詞なので進行形にせず、have＋過去分詞を使います。" },
    { wrong: "She have been playing the piano.", right: "She has been playing the piano.", why: "主語が3人称単数なので has を使います。" },
    { wrong: "I am waiting for an hour.", right: "I have been waiting for an hour.", why: "for an hour（1時間ずっと）と長さを言うときは、現在完了進行形にします。" },
    { wrong: "I have been study for two hours.", right: "I have been studying for two hours.", why: "been のあとは動詞の ing 形です。" },
  ],
  check: [
    { q: "It began to rain two hours ago. It is still raining. を1文にしましょう。", a: "It has been raining for two hours.", why: "2時間前から今までずっと降っている。長さなので for。" },
    { q: "「どのくらい（の間）テレビを見ているの？」を英語にしましょう。", a: "How long have you been watching TV?", why: "長さは How long。watch は動作の動詞なので have been ＋ ing。" },
    { q: "I ___ Mika since 2020.（know を使って）の ___ に入る語句は？", a: "have known", why: "know は状態の動詞なので、現在完了の継続にする。" },
  ],
  next: [
    { label: "4択ドリル「現在完了進行形」に挑戦", href: "/learn/eibunpo-chu/j-en-3-kanryo-shinko" },
    { label: "もとになる形「現在完了」のレクチャー", href: "/learn/lecture/j-en-3-kanryo" },
    { label: "復習「現在進行形」のレクチャー", href: "/learn/lecture/j-en-1-shinkokei" },
  ],
};
