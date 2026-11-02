import type { Lecture } from "../types";

const C = "/media/commons/j-en-1-be";

export const J_EN_1_BE: Lecture = {
  unit: "j-en-1-be",
  title: "be動詞は主語で決まる。否定は後ろに not、疑問は前に出す",
  hook: "自己紹介の I am Ken. も、場所を伝える My bag is on the desk. も、be動詞の文です。英語の文の土台になる形なので、ここでしくみをつかむと、このあとの一般動詞や進行形もぐっと楽になります。",
  mystery: "I am、He is のように、主語が1人なら am か is を使います。ところが目の前の相手が1人でも、You are と「2人以上」と同じ are を使います。なぜ you だけ特別なのでしょう？　ヒントは、シェイクスピアの劇に出てくる thou art です。",
  mission: {
    from: "中学校の英語劇クラブの顧問の先生",
    request: "文化祭で『不思議の国のアリス』とシェイクスピアの名ぜりふ集を英語で上演します。ところが1年生の部員に「相手は1人なのに、どうして You is じゃないんですか？」と聞かれ、「そういう決まりだから」としか答えられませんでした。せりふを納得して言えるように、名探偵のあなたに you と are のなぞを解いてほしいのです。",
    thanks: "you はもともと「あなたたち」と、ていねいな「あなた」の言葉だったのですね。部員に話したら、「You are は相手を大切にする言い方なんだ」と、せりふの声まで変わりました。",
  },
  sections: [
    {
      heading: "be動詞は「＝（イコール）」と「いる・ある」",
      body: "be動詞は、主語とあとの語を{{イコールでつなぐ}}はたらきをします。I am a student. は「私＝生徒」、This is my pen. は「これ＝私のペン」です。また、あとに場所を表すことばが来ると「（〜に）{{いる・ある}}」の意味になります。The cat is under the table. は「ねこはテーブルの下にいる」です。",
      reading: [
        "英語の文には、かならず動詞が1つあります。その中でいちばんよく使われるのが{{be動詞}}（am・are・is）です。I am a student.（私は生徒です）は「私＝生徒」、This is my pen.（これは私のペンです）は「これ＝私のペン」。be動詞は、主語とあとのことばを{{イコールでつなぐ}}はたらきをします。あとに来るのは名詞だけではありません。I am hungry.（私はおなかがすいている）、She is kind.（彼女はやさしい）のように、ようすを表すことばも来ます。",
        "be動詞にはもう1つ、「{{いる・ある}}」の意味があります。The cat is under the table.（ねこはテーブルの下にいる）、My bag is on the desk.（私のかばんは机の上にある）のように、あとに場所を表すことばが来たときです。日本語では「です」「いる」「ある」と言い分けますが、英語ではどれも be動詞1つで表せます。「主語が、どんなものか・どこにあるか」を伝える、英語でいちばん基本の文なのです。",
        "イコールの be動詞は、名ぜりふも生みました。シェイクスピアが1599年ごろに書いた喜劇『お気に召すまま』で、森にくらす皮肉屋のジェイクイズはこう語ります。All the world's a stage（この世はすべて舞台）。world's は world is の短縮形です。「世界＝舞台」と言い切り、人はみな役者で、一生のうちにいくつもの役を演じる、と続けます。たった5語の is の文が、400年以上たった今も、世界中で引用されています。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "All the world’s a stage,\nAnd all the men and women merely players;\nThey have their exits and their entrances,\nAnd one man in his time plays many parts,",
        ja: "この世はすべて舞台。\n男も女も、みなただの役者にすぎない。\nそれぞれに退場があり、登場がある。\nひとりの人間は、生きているあいだに多くの役を演じるのだ。",
        cite: "William Shakespeare, As You Like It, Act 2, Scene 7 (c. 1599)",
        source: "https://www.gutenberg.org/ebooks/1523",
      }],
      photos: [
        {
          src: `${C}/first-folio.webp`, width: 800, height: 1274,
          alt: "古い本の扉。上に SHAKESPEARES の大きな文字、中央にえりの大きな服を着た男性の銅版画の肖像",
          caption: "シェイクスピアの死後、1623年に仲間の俳優たちが出した作品集（ファースト・フォリオ）の扉。『お気に召すまま』はこの本で初めて印刷された。",
          credit: { author: "Martin Droeshout", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Title_page_William_Shakespeare%27s_First_Folio_1623.jpg" },
        },
      ],
      cliff: "同じ「＝」の役目なのに、なぜ am・are・is と形が3つもあるのでしょう？",
    },
    {
      heading: "主語で am・are・is が決まる",
      body: "be動詞は、主語によって形が変わります。{{I には am}}、{{you と2人・2つ以上には are}}、{{それ以外の1人・1つには is}} を使います。he, she, it のほか、Ken や my mother、this のような1人・1つの主語も is です。",
      reading: [
        "be動詞は、前に来る主語によって形を変えます。I のときは am、you のときは are、he・she・it のときは is です。人の名前や my mother、this・that のように「1人・1つ」を指す主語も is になります。主語が we・they や my friends のように「2人・2つ以上」なら are です。つまり be動詞を見れば、主語が自分なのか、相手なのか、それ以外の何人なのかがわかるようになっています。",
        "会話では、主語と be動詞をくっつけた{{短縮形}}がよく使われます。I'm（I am）、you're（you are）、he's（he is）、it's（it is）、we're（we are）、they're（they are）。'（アポストロフィ）は、文字をはぶいたしるしです。ふだんの会話ではほとんどが短縮形なので、聞き取るときは I'm の「ム」や you're の「ア」のような小さな音に耳をすませましょう。",
        "短縮形のテンポのよさが光るのが、1865年にイギリスで出版された『不思議の国のアリス』です。作者ルイス・キャロルは数学者で、知り合いの少女アリスのために、川でのボート遊びの日に話して聞かせた物語がもとになりました。にやにや笑うチェシャ猫は、アリスに we're all mad here. I'm mad. You're mad.（ここではみんなどうかしてる。おれもどうかしてる。きみもどうかしてる）と言います。主語が we・I・you と変わるたびに、are・am・are と be動詞も入れかわり、短い文がリズムよく重なります。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "“But I don’t want to go among mad people,” Alice remarked.\n“Oh, you can’t help that,” said the Cat: “we’re all mad here. I’m mad. You’re mad.”\n“How do you know I’m mad?” said Alice.\n“You must be,” said the Cat, “or you wouldn’t have come here.”",
        ja: "「でも、どうかしてる人たちの中には行きたくないわ」とアリスは言った。\n「ああ、それはしかたがない」と猫は言った。「ここではみんなどうかしてるのさ。おれもどうかしてる。きみもどうかしてる」\n「どうして私がどうかしてるってわかるの？」とアリスは言った。\n「そうに決まってる」と猫は言った。「でなきゃ、こんなところに来やしない」",
        cite: "Lewis Carroll, Alice’s Adventures in Wonderland, Chapter 6 (1865)",
        source: "https://www.gutenberg.org/ebooks/11",
      }],
      photos: [
        {
          src: `${C}/cheshire-cat.webp`, width: 427, height: 427,
          alt: "木の枝の上に寝そべり、口を大きく横に広げてにやりと笑うしまもようの猫のペン画",
          caption: "テニエルがえがいた『不思議の国のアリス』のチェシャ猫。木の上からアリスに we're・I'm・You're と、{{短縮形}}を重ねて話しかける。",
          credit: { author: "John Tenniel", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Cheshire_Cat_Tenniel.png" },
        },
      ],
      figure: {
        type: "compare",
        title: "主語と be動詞の組み合わせ",
        columns: [{ title: "主語" }, { title: "be動詞", tone: "yellow" }, { title: "例文" }],
        rows: [
          { cells: ["I", "am", "I am a student."] },
          { cells: ["you", "are", "You are kind."] },
          { cells: ["we / they / 2人・2つ以上", "are", "They are my friends."] },
          { cells: ["he / she / it / 1人・1つ", "is", "She is from Kyoto."] },
        ],
      },
      cliff: "ところで、相手が1人でも You are。1人なのに、なぜ「2人以上」の are なのでしょう？",
    },
    {
      heading: "迷ったら、主語を分けて考える",
      body: "主語が「自分」か「相手」か「それ以外」かで分け、それ以外なら{{数}}を見ます。you は1人に話しかけるときも are です。Ken and I のように and でつながった主語は2人なので are になります。",
      reading: [
        "be動詞で迷ったら、主語を順番に分けて考えます。まず「自分（I）」なら am、「相手（you）」なら are。それ以外なら{{数}}を見て、1人・1つなら is、2人・2つ以上なら are です。気をつけたいのは and でつながった主語です。Ken and I are classmates.（ケンと私は同級生です）は、I がすぐ前にあっても主語は2人なので are。My father and mother are busy. も、2人なので are になります。",
        "ふしぎなのは you です。I も he も1人なら am・is なのに、相手が1人でも You are kind. と、複数と同じ are を使います。そのなぞを解くかぎが、シェイクスピアが1606年ごろに書いた悲劇『マクベス』にあります。スコットランドの武将マクベスは、魔女に「王になる」と予言され、王を殺そうと決心します。その夜、目の前に短剣のまぼろしが浮かび、マクベスはつぶやきます。Is this a dagger which I see before me?（目の前に見えるのは短剣か？）。そして Art thou not, fatal vision ……? と、まぼろしに問いかけます。",
        "thou は「おまえ・きみ」、art は芸術ではなく be動詞です。Art thou not ……? は、今の Are you not ……?（おまえは……ではないのか？）にあたり、be動詞を主語の前に出した疑問文になっています。シェイクスピアの時代、1人の親しい相手には {{thou art}}、2人以上の相手や、1人でも目上の人には {{you are}} を使うのがふつうでした。やがて、だれにでもていねいな you を使うようになり、thou はふだんの英語から姿を消していきます。こうして you は、相手が1人でも2人でも are のまま残りました。今でも thou は、古い劇や詩、祈りのことばの中で出会えます。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "Is this a dagger which I see before me,\nThe handle toward my hand? Come, let me clutch thee:—\nI have thee not, and yet I see thee still.\nArt thou not, fatal vision, sensible\nTo feeling as to sight? or art thou but\nA dagger of the mind, a false creation,\nProceeding from the heat-oppressed brain?",
        ja: "目の前に見えるのは短剣か。\nつかがこちらの手に向いている。さあ、つかんでやろう。\nつかめない。それなのに、まだ見える。\n不吉なまぼろしよ、おまえは目に見えるのと同じように、\n手でさわれるものではないのか。それとも、おまえはただの\n心の中の短剣、にせものにすぎないのか。\n熱にうかされた頭が生み出したものなのか。",
        cite: "William Shakespeare, Macbeth, Act 2, Scene 1 (c. 1606)",
        source: "https://www.gutenberg.org/ebooks/1533",
      }],
      photos: [
        {
          src: `${C}/macbeth-garrick.webp`, width: 800, height: 640,
          alt: "石づくりの城の広間で、短剣を手にした白いドレスの女性が指さし、金のししゅうの上着の男性がおびえたように身を引いている油絵",
          caption: "18世紀の名優ギャリックとプリチャード夫人が演じた『マクベス』（ゾファニー画、1768年ごろ）。この劇では、短剣のまぼろしに Art thou not ……? と問いかける。",
          credit: { author: "Johann Zoffany", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Zoffany-Garrick_and_Pritchard_in_Macbeth.jpg" },
        },
      ],
      figure: {
        type: "tree",
        title: "主語から be動詞を選ぶ",
        root: {
          label: "主語",
          children: [
            { label: "自分 1人", sub: "I", children: [{ label: "am", tone: "yellow" }] },
            { label: "相手", sub: "you（1人でも複数でも）", children: [{ label: "are", tone: "blue" }] },
            {
              label: "それ以外",
              children: [
                { label: "1人・1つ", sub: "he / she / it / Ken / this", children: [{ label: "is", tone: "red" }] },
                { label: "2人・2つ以上", sub: "we / they / Ken and I", children: [{ label: "are", tone: "blue" }] },
              ],
            },
          ],
        },
      },
      reveal: "be動詞は主語で形を変えます。シェイクスピアの時代、1人の親しい相手には thou art、2人以上の相手やていねいに話す相手には you are を使っていました。やがてだれにでも you を使うようになり、thou が消えたので、you は相手が1人でも{{are}}のまま残ったのです。You are は、もともと相手を立てる、ていねいな言い方でした。",
      cliff: "形が選べたら、次は「〜ではない」「〜ですか？」。be動詞はどう動くのでしょう？",
    },
    {
      heading: "肯定文 → 否定文 → 疑問文",
      body: "否定文は be動詞の{{すぐ後ろに not}} を置きます。疑問文は be動詞を{{主語の前に出し}}、文の終わりを「?」にします。答えるときも be動詞を使い、主語は he・she・it・they などの代名詞にかえます。",
      reading: [
        "「〜ではない」という{{否定文}}は、be動詞のすぐ後ろに not を置くだけです。She is a teacher. → She is not a teacher.（彼女は先生ではありません）。is not は isn't、are not は aren't と短くできます。I am not は、I'm not とします。not の位置は、いつも be動詞の直後。She not is …… のように前に置くことはありません。",
        "「〜ですか？」という{{疑問文}}は、be動詞を主語の前に出し、最後に「?」をつけます。You are hungry. → Are you hungry?（おなかがすいていますか）。答えるときも be動詞を使い、Yes, I am. / No, I'm not. のように言います。主語の Ken や your sister は、答えでは he・she などに言いかえます。Who are you?（あなたはだれ？）のように、疑問詞のあとに be動詞と主語を続ける形もあります。",
        "be動詞の疑問文で、読む人にいきなり話しかける詩があります。アメリカの詩人エミリー・ディキンソン（1830〜1886年）の I'm nobody! Who are you?（わたしは名もない人。あなたはだれ？）です。彼女は生涯に1800編近い詩を書きましたが、生きているうちに発表されたのはほんのわずかで、この詩も死後の1891年に出版されました。I'm で自分を名のり、Who are you? で問いかけ、Are you nobody, too?（あなたも名もない人？）とたずねる。be動詞の文だけで、読む人とひそひそ話をしているような親しさが生まれます。2行目の Are you ……? は、今日学んだ疑問文の形そのものです。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "us",
        text: "I'm nobody! Who are you?\nAre you nobody, too?\nThen there's a pair of us — don't tell!\nThey'd banish us, you know.\nHow dreary to be somebody!\nHow public, like a frog\nTo tell your name the livelong day\nTo an admiring bog!",
        ja: "わたしは名もない人！　あなたはだれ？\nあなたも、名もない人？\nなら、わたしたちはふたり組――ないしょよ！\n知られたら追い出されちゃう。\n名のある人になるなんて、なんてつまらない！\nなんて人目にさらされること、カエルみたいに\n一日じゅう自分の名前を言いつづけるなんて\nうっとり聞いてくれる沼に向かって！",
        cite: "Emily Dickinson, \"I'm nobody! Who are you?\" (Poems, Second Series, 1891)",
        source: "https://www.gutenberg.org/ebooks/2679",
      }],
      photos: [
        {
          src: `${C}/dickinson.webp`, width: 617, height: 765,
          alt: "黒っぽい服に白いえりの若い女性が、本ののったテーブルのそばにすわり、手に小さな花を持っている古い写真",
          caption: "1848年ごろのエミリー・ディキンソン（ダゲレオタイプ写真）。I'm nobody! Who are you? のように、be動詞の{{疑問文}}で読む人に語りかける詩を残した。",
          credit: { author: "作者不明", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Emily_Dickinson_daguerreotype_(Restored).jpg" },
        },
      ],
      figure: {
        type: "formula",
        title: "She is a teacher. を書きかえる",
        prose: true,
        steps: [
          { expr: "She {{is}} a teacher.", note: "肯定文" },
          { expr: "She is {{not}} a teacher.", note: "否定文：is のあとに not（isn't でもよい）" },
          { expr: "{{Is}} she a teacher{{?}}", note: "疑問文：is を主語の前へ" },
          { expr: "— Yes, she {{is}}. / No, she {{isn't}}.", note: "答えも be動詞で" },
        ],
        note: "短縮形：I'm / you're / he's / isn't / aren't。am not はふつう短縮しない。",
      },
    },
  ],
  story: {
    kind: "manga4",
    title: "アートは芸術？",
    panels: [
      {
        scene: "英語劇クラブの部室。ハルが劇の台本を読み、アオがのぞきこむ。机に「Thou art」の札。",
        lines: [
          { who: "ハル", text: "台本に「ザウ・アート」" },
          { who: "ハル", text: "アートって芸術？" },
          { who: "アオ", text: "「きみは芸術」すてき！" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ハル", look: "girl", x: 256, face: "think", fx: "?", hand: [214, 232] },
            { who: "アオ", look: "boy", x: 84, face: "smile" },
          ],
          props: [
            { kind: "table", x: 0, y: 244 },
            { kind: "book", x: 214, y: 228, s: 0.85 },
            { kind: "board", x: 128, y: 238, s: 0.9, text: "Thou art" },
          ],
        },
      },
      {
        scene: "顧問の先生が入ってきて、札に「art=are」と書きたす。",
        lines: [
          { who: "先生", text: "ザウは昔の1人の「きみ」" },
          { who: "先生", text: "アートは{{be動詞}}よ" },
          { who: "ハル", text: "芸術じゃなかった！" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "先生", look: "teacher", x: 250, face: "smile", hand: [200, 226] },
            { who: "ハル", look: "girl", x: 86, face: "surprise", fx: "!" },
          ],
          props: [
            { kind: "table", x: 0, y: 244 },
            { kind: "board", x: 168, y: 238, text: "art=are" },
          ],
        },
      },
      {
        scene: "ハルが首をかしげる。先生が「You are」の札を指さす。",
        lines: [
          { who: "ハル", text: "じゃあ相手が1人でも" },
          { who: "ハル", text: "ユー・アーなのは？" },
          { who: "先生", text: "{{you}}はていねい語！" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ハル", look: "girl", x: 258, face: "think", fx: "?" },
            { who: "先生", look: "teacher", x: 84, face: "normal", hand: [132, 228] },
          ],
          props: [
            { kind: "table", x: 0, y: 244 },
            { kind: "board", x: 170, y: 238, text: "You are" },
          ],
        },
      },
      {
        scene: "アオが張りきって指さす。ハルはあきれ顔。",
        lines: [
          { who: "アオ", text: "ハルは1人だから" },
          { who: "アオ", text: "ユー・イズ芸術！" },
          { who: "ハル", text: "1人でも{{ユー・アー}}！" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "アオ", look: "boy", x: 256, face: "shout", fx: "idea", hand: [210, 220] },
            { who: "ハル", look: "girl", x: 84, face: "sweat", fx: "sweat" },
          ],
          props: [
            { kind: "table", x: 0, y: 244 },
            { kind: "board", x: 168, y: 238, text: "You are" },
          ],
        },
      },
    ],
    note: "ハル・アオ・先生は架空の人物で、会話はすべて創作です。シェイクスピアの『マクベス』（1606年ごろ）の Art thou、昔の英語で1人の親しい相手に thou art、複数やていねいな相手に you are を使い分けていたことは事実にもとづいています。",
  },
  mistakes: [
    { wrong: "You is my friend.", right: "You are my friend.", why: "you は1人に話しかけるときでも are を使います。" },
    { wrong: "Ken and I am classmates.", right: "Ken and I are classmates.", why: "主語は Ken and I の2人なので are。I の近くにあっても am にはなりません。" },
    { wrong: "Is she a teacher? — Yes, she does.", right: "Yes, she is.", why: "be動詞でたずねられたら be動詞で答えます。do / does は一般動詞の文で使います。" },
    { wrong: "She not is a teacher.", right: "She is not a teacher.", why: "not は be動詞の後ろに置きます。" },
  ],
  check: [
    { q: "My sisters ___ in the park. の ___ に入る be動詞は？", a: "are", why: "my sisters は2人以上（複数）なので are。" },
    { q: "This is my bag. を否定文にしましょう。", a: "This is not (isn't) my bag.", why: "is のすぐ後ろに not を置く。" },
    { q: "You are hungry. を疑問文にし、Yes で答えましょう。", a: "Are you hungry? — Yes, I am.", why: "are を主語の前へ。you でたずねられたら I で答えるので am。" },
  ],
  next: [
    { label: "4択ドリル「be動詞」に挑戦", href: "/learn/eibunpo-chu/j-en-1-be" },
    { label: "つぎの単元「一般動詞」", href: "/learn/eibunpo-chu/j-en-1-ippan" },
  ],
};
