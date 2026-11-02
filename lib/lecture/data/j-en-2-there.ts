import type { Lecture } from "../types";

const C = "/media/commons/j-en-2-there";

export const J_EN_2_THERE: Lecture = {
  unit: "j-en-2-there",
  title: "There is / are は「〜がある・いる」。be動詞は後ろの名詞の数で決まる",
  hook: "「机の上にねこがいる」「この町には図書館が2つある」。何かが「ある・いる」と新しく伝えるとき、英語では There is / There are で文を始めます。道案内や部屋の説明、町の紹介でよく使う、とても便利な形です。",
  mystery: "『オズの魔法使い』のドロシーは「やっぱり家がいちばん」と言うとき、Home is the best place. ではなく There is no place like home. と言いました。there は「そこに」のはずなのに、どこも指さない there で始めたのは、なぜでしょう？",
  mission: {
    from: "深夜ラジオ番組のDJ",
    request: "わたしの番組では毎晩、最後に英語の名作の一言を紹介しています。先週ドロシーの言葉を流したら、中学生のリスナーから「Home is the best place. じゃだめなの？　そもそも there って、どこ？」とメッセージが届きました。来週の放送で答えたいので、名探偵のあなたに、この there の正体を解き明かしてほしいのです。",
    thanks: "there は場所ではなく「存在」を知らせる合図だったのですね。There is no 〜 は「世界じゅう探しても存在しない」という言い切り。来週の放送で、この一言の重みをリスナーに伝えられます。",
  },
  sections: [
    {
      heading: "There is ＋ もの ＋ 場所 の順に並べる",
      body: "There is a cat on the desk. は「机の上にねこがいる」です。there は「そこに」と訳さず、{{There is / are ＋ 主語（あるもの）＋ 場所}}の順でひとまとまりと考えます。文の本当の主語は be動詞の{{後ろにある名詞}}です。場所は on the desk・in the box・near the station のように前置詞で表します。",
      reading: [
        "There is a cat on the desk.（机の上にねこがいる）。この文の there を「そこに」と訳すと、「そこに、机の上に、ねこがいる」と場所が2つになってしまいます。この there は場所を指す言葉ではありません。「これから、何かが{{ある・いる}}という話をしますよ」と知らせる合図です。だから日本語には訳さず、{{There is / are}} をひとまとまりで「〜がある・いる」と考えます。",
        "ふつうの there と比べてみましょう。Look! Your cat is over there.（見て！　あなたのねこ、あそこにいるよ）の there は、本当に場所を指す「そこに・あそこに」で、指をさしながら強く言います。一方、There is a cat …… の there は、軽く短く「ゼァ」と読みます。同じつづりでも、はたらきがまったく違うのです。",
        "語順は「There is ＋ {{あるもの}} ＋ {{場所}}」。場所は on the desk（机の上に）、under the bed（ベッドの下に）、near the station（駅の近くに）のように前置詞で表します。道をたずねる Is there a convenience store near here?（この近くにコンビニはありますか）は、旅先でそのまま使える一文です。",
      ],
      figure: {
        type: "flow",
        title: "There 構文の語順",
        dir: "row",
        steps: [
          { label: "There is", sub: "〜がある・いる", tone: "navy" },
          { label: "a cat", sub: "あるもの（主語）", tone: "yellow" },
          { label: "on the desk", sub: "場所", tone: "blue" },
        ],
      },
      cliff: "では、ねこが2ひきなら？　is のままでいいのでしょうか。",
    },
    {
      heading: "is か are かは、後ろの名詞で決まる",
      body: "後ろの名詞が{{1つ（単数）}}や water のような{{数えられない名詞}}なら is、{{2つ以上（複数）}}なら are です。過去の文では is が {{was}}、are が {{were}} になります。There の形は変わらないので、必ず後ろの名詞を見て選びます。",
      reading: [
        "There 構文の主語は、be動詞の{{後ろの名詞}}です。だから be動詞は、後ろを見て決めます。There is a park in my town.（町に公園が1つある）、There are two parks in my town.（公園が2つある）。water や milk のような{{数えられない名詞}}は単数あつかいで、There is some milk in the bottle.（びんに牛乳が少しある）となります。過去の話なら、is は {{was}}、are は {{were}} に変わります。",
        "この are が堂々と響く名ぜりふがあります。シェイクスピアが1600年ごろに書いた悲劇『ハムレット』の1幕5場です。デンマークの王子ハムレットは、亡くなった父王の亡霊に出会い、おそろしい秘密を告げられます。いっしょにいた親友ホレイショーは、大学で学問を修めた理性の人。「なんと奇妙な」とうろたえる友に、ハムレットはこう言い返します。",
        "There are more things in heaven and earth（天と地のあいだには、もっと多くのものがある）。more things が複数なので are です。「きみの学問ではとらえきれないものが、この世にはまだまだ存在する」。存在を告げる There are で始めることで、世界の広さそのものを相手につきつけているのです。この一行は400年後の今も、ふしぎな出来事を語るときに、英語圏で決まり文句のように引用されています。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "And therefore as a stranger give it welcome.\nThere are more things in heaven and earth, Horatio,\nThan are dreamt of in your philosophy.",
        ja: "だからこそ、見知らぬ客として迎えてやれ。\n天と地のあいだにはな、ホレイショー、\nきみの学問が夢にも思わないものが、まだまだあるのだ。",
        cite: "William Shakespeare, Hamlet, Act 1, Scene 5 (c. 1600)",
        source: "https://www.gutenberg.org/files/1524/1524-h/1524-h.htm",
      }],
      photos: [
        {
          src: `${C}/hamlet-ghost.webp`, width: 800, height: 645,
          alt: "暗い城壁の上で、2人の若者がもみ合い、右側に光に包まれたよろい姿の亡霊が立っている版画",
          caption: "フュースリの絵をもとにした版画『ハムレット』1幕4場。亡霊に向かおうとするハムレットを、仲間が引き止める。次の5場で There {{are}} more things …… の名ぜりふが出る。",
          credit: { author: "Robert Thew / After Henry Fuseli", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:File-Hamlet,_Prince_of_Denmark_Act_I_Scene_IV.png" },
        },
      ],
      figure: {
        type: "compare",
        title: "時と数で be動詞を選ぶ",
        columns: [{ title: "1つ・数えられない", tone: "blue" }, { title: "2つ以上", tone: "yellow" }],
        rows: [
          { label: "現在", cells: ["There is a park.", "There are two parks."] },
          { label: "過去", cells: ["There was a park.", "There were two parks."] },
        ],
        note: "some のあとでも、名詞が複数なら are（There are some apples.）、数えられない名詞なら is（There is some milk.）。",
      },
      cliff: "「ある」の反対、「ない」はどう言う？　そこに名作の一言が待っています。",
    },
    {
      heading: "否定文・疑問文と How many 〜 are there?",
      body: "否定文は be動詞のあとに {{not}}、疑問文は be動詞を {{there の前}}に出します。答えるときも {{there}} を使って Yes, there is. のように答えます。数をたずねるときは {{How many ＋ 複数名詞 ＋ are there 〜?}} の形にします。",
      reading: [
        "否定文は be動詞のあとに {{not}} を置き、There isn't a bank near here.（この近くに銀行はない）とします。疑問文は be動詞を there の前に出して Is there a bank near here?、答えも there を使って Yes, there is. / No, there isn't. です。数をたずねるなら How many students are there in your class?（クラスに生徒は何人いますか）。How many のあとは必ず複数形です。",
        "「1つもない」は、名詞の前に {{no}} を置いても言えます。There are no clouds in the sky.（空には雲ひとつない）。not よりも「ゼロだ」と言い切る強さがあります。この no を使った、英語でいちばん有名な There 構文のひとつが、アメリカの作家ライマン・フランク・ボームが1900年に出した童話『オズの魔法使い』の一言です。",
        "カンザスの灰色の大草原で暮らす少女ドロシーは、竜巻で家ごと美しい魔法の国オズへ運ばれます。道で出会ったかかしは「こんなにきれいな国から、なぜあの乾いた灰色の土地へ帰りたいの？」と首をかしげます。脳みそのないかかしには分からない、とドロシーが答える場面です。最後の There is no place like home. の like は「〜のような」。「家のような場所は、ひとつも存在しない」と言っているのです。",
        "この本は大ヒットし、1939年にはジュディ・ガーランド主演でミュージカル映画になりました。映画では、ドロシーが靴のかかとを3回打ち鳴らし、この言葉をくり返して家に帰る場面が名高く、今ではアメリカ人がだれでも知る一言です。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "us",
        text: "\"No matter how dreary and gray our homes are, we people of flesh and blood would rather live there than in any other country, be it ever so beautiful. There is no place like home.\"",
        ja: "「わたしたちの家がどんなにさびしくて灰色でも、血と肉でできた人間は、ほかのどの国よりも、そこに住みたいの。その国がどれほど美しくてもね。家ほどいい場所なんて、どこにもないのよ」",
        cite: "L. Frank Baum, The Wonderful Wizard of Oz, Chapter IV (1900)",
        source: "https://www.gutenberg.org/files/55/55-h/55-h.htm",
      }],
      photos: [
        {
          src: `${C}/oz-scarecrow.webp`, width: 800, height: 1110,
          alt: "黄色い背景の挿絵。さくに腰かけたおさげ髪の少女が、棒につるされたかかしを見上げ、足もとで小さな犬が見ている",
          caption: "『オズの魔法使い』初版（1900年）のデンスローの挿絵。ドロシーがかかしを見つめる。この2人の会話で There is {{no}} place like home. が語られる。",
          credit: { author: "W. W. Denslow", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:The_Wonderful_Wizard_of_Oz,_Dorothy_gazed_thoughtfully_at_the_Scarecrow.jpg" },
        },
      ],
      figure: {
        type: "formula",
        title: "There is a dog in the park. を書きかえる",
        prose: true,
        steps: [
          { expr: "There {{is}} a dog in the park.", note: "肯定文" },
          { expr: "There {{isn't}} a dog in the park.", note: "否定文：is not" },
          { expr: "{{Is there}} a dog in the park?", note: "疑問文：is を there の前へ" },
          { expr: "— Yes, {{there is}}. / No, {{there isn't}}.", note: "答えも there で" },
          { expr: "{{How many}} dogs {{are there}} in the park?", note: "数をたずねる" },
        ],
        note: "「1つもない」は There are no 〜. や There aren't any 〜. でも表せる。",
      },
      cliff: "ところで、My bag is on the desk. を There 構文で言えないのは、なぜ？",
    },
    {
      heading: "the や my がつく「特定のもの」には使わない",
      body: "There is / are は、相手がまだ知らない{{新しいもの}}の存在を伝える形です。そのため、my bag や the book のように{{どれのことか決まっているもの}}には、ふつう使いません。「私のかばんは机の上にある」は My bag is on the desk. と、ふつうの be動詞の文で言います。",
      reading: [
        "There is a bag on the desk.（机の上にかばんがある）は自然ですが、There is my bag on the desk. はふつう言いません。英語には「相手がまだ知らない{{新しい情報}}は、文の後ろに置く」という好みがあります。There 構文は、文の頭を軽い there でうめて、新しいもの（a bag）を後ろに登場させるための形なのです。",
        "my bag や the book は、相手も「どれのことか」分かっている{{特定のもの}}です。分かっているものは主語にして、My bag is on the desk.（私のかばんは机の上にある）と言います。つまり「何かがある」と初めて知らせるなら There is、「あれはどこにある」と場所を伝えるならふつうの be動詞の文。日本語ではどちらも「ある」ですが、英語は使い分けます。",
        "ここでドロシーの一言にもどりましょう。Home is the best place. と言えば、「家」について「いちばんよい」と評価する文になります。ところが There is no place like home. は、話を世界全体に広げ、「家のような場所は、どこにも{{存在しない}}」と言い切る文です。there はどこも指していないからこそ、世界のすべての場所を見わたせるのです。",
      ],
      reveal: "There 構文の there は「そこに」ではなく、「何かが存在する」と知らせる合図でした。Home is the best place. は家を評価するだけの文ですが、There is {{no}} place like home. は、どこも指さない there で世界じゅうを見わたし、「家のような場所は、どこにも存在しない」と言い切ります。存在そのものを打ち消すからこそ、この一言は強く、だれの胸にも残るのです。",
      cliff: "新しいものを登場させる there。実は、物語の始まりにもよく使われます。",
    },
    {
      heading: "物語は There で始まる",
      body: "英語の昔話は Once upon a time, there was ……（むかしむかし、〜がいました）で始まることがよくあります。聞き手がまだ知らない{{登場人物}}を紹介するのに、There 構文がぴったりだからです。過去の物語なので {{was / were}} を使います。",
      reading: [
        "英語の昔話の決まった始まり方は、Once upon a time, there was a little girl in a small village.（むかしむかし、小さな村に1人の女の子がいました）です。聞き手はまだその女の子を知りません。だから、新しいものを登場させる There 構文がぴったりなのです。2人以上なら there were を使い、There were three little pigs.（3びきの子ぶたがいました）となります。",
        "英語でもっとも多くの人に読まれてきた本の冒頭にも、there was があります。1611年、イングランド国王ジェームズ1世の命令で、学者たちが何年もかけて訳した『{{欽定訳聖書}}』です。世界のはじまりを語る「創世記」の第1章で、光が生まれる場面は、Let there be light: and there was light. と、たった11語で語られます。",
        "Let there be は「〜があれ」、and there was は「すると〜があった」。同じ there の形をくり返すことで、言葉が出たとたんに光が存在した、という一瞬が目に浮かびます。欽定訳聖書の英語は、シェイクスピアと並んで英語そのものを形づくったといわれ、Let there be light は、今も新しい発見や始まりを語るときに引用されます。There 構文は、何かがこの世に「現れる」瞬間をえがく、英語の大切な道具なのです。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "And God said, Let there be light: and there was light.",
        ja: "神は言った。「光あれ」。すると、光があった。",
        cite: "The Holy Bible, King James Version, Genesis 1:3 (1611)",
        source: "https://www.gutenberg.org/ebooks/10",
      }],
      photos: [
        {
          src: `${C}/kjv-1611.webp`, width: 800, height: 1251,
          alt: "細かな銅版画で、人物の像に囲まれた中央に THE HOLY BIBLE と大きく書かれた本のとびら",
          caption: "{{欽定訳聖書}}の初版（1611年）のとびら。下に ANNO DOM. 1611 とある。冒頭の創世記で there was light と光の誕生が語られる。",
          credit: { author: "Church of England", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:KJV-King-James-Version-Bible-first-edition-title-page-1611.jpg" },
        },
      ],
    },
  ],
  story: {
    kind: "manga4",
    title: "そこってどこ？",
    panels: [
      {
        scene: "放課後の教室。ハルが英語の教科書を読みあげ、アオが机の向こうからのぞきこむ。机に「There is」の札。",
        lines: [
          { who: "ハル", text: "ゼア・イズ・ア・キャット" },
          { who: "ハル", text: "「そこに」ねこがいる！" },
          { who: "アオ", text: "そこって、どこ？" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ハル", look: "girl", x: 256, face: "smile", hand: [214, 230] },
            { who: "アオ", look: "boy", x: 84, face: "think", fx: "?" },
          ],
          props: [
            { kind: "table", x: 0, y: 244 },
            { kind: "book", x: 214, y: 226, s: 0.85 },
            { kind: "board", x: 130, y: 238, s: 0.9, text: "There is" },
          ],
        },
      },
      {
        scene: "英語の先生が入ってきて、札を指さしながら説明する。",
        lines: [
          { who: "先生", text: "このゼアは指さないの" },
          { who: "先生", text: "{{〜がいる}}の合図よ" },
          { who: "ハル", text: "そこじゃなかった！" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "先生", look: "teacher", x: 250, face: "smile", hand: [196, 230] },
            { who: "ハル", look: "girl", x: 86, face: "surprise", fx: "!" },
          ],
          props: [
            { kind: "table", x: 0, y: 244 },
            { kind: "board", x: 166, y: 238, text: "There is" },
          ],
        },
      },
      {
        scene: "アオが指を2本立てる。先生が札を「There are」にかえる。",
        lines: [
          { who: "アオ", text: "ねこが2ひきなら？" },
          { who: "先生", text: "{{後ろの数}}で決めて" },
          { who: "先生", text: "ゼア・アーにするの" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "アオ", look: "boy", x: 258, face: "think", fx: "?", hand: [222, 214] },
            { who: "先生", look: "teacher", x: 84, face: "normal", hand: [132, 228] },
          ],
          props: [
            { kind: "table", x: 0, y: 244 },
            { kind: "board", x: 170, y: 238, text: "There are" },
          ],
        },
      },
      {
        scene: "ハルが『オズの魔法使い』を開いて読む。アオは涙ぐみ、ハルがあわてて止める。",
        lines: [
          { who: "アオ", text: "ノー・プレイス…家がない？" },
          { who: "アオ", text: "ドロシーかわいそう" },
          { who: "ハル", text: "家ほどいい所は{{どこにもない}}！" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "アオ", look: "boy", x: 256, face: "sweat", fx: "sweat" },
            { who: "ハル", look: "girl", x: 84, face: "shout", fx: "!", hand: [132, 226] },
          ],
          props: [
            { kind: "table", x: 0, y: 244 },
            { kind: "book", x: 130, y: 226, s: 0.9 },
            { kind: "board", x: 220, y: 238, s: 0.9, text: "no place" },
          ],
        },
      },
    ],
    note: "ハル・アオ・先生は架空の人物で、会話はすべて創作です。『オズの魔法使い』（ボーム、1900年）でドロシーが There is no place like home. と語る場面と、There 構文のきまりは事実にもとづいています。",
  },
  mistakes: [
    { wrong: "There is three books on the desk.", right: "There are three books on the desk.", why: "後ろの名詞 three books が複数なので are です。" },
    { wrong: "There is my pen on the table.", right: "My pen is on the table.", why: "my のついた特定のものは、There 構文ではなく「主語 ＋ be動詞 ＋ 場所」で表します。" },
    { wrong: "Are there a library near here? — Yes, it is.", right: "Is there a library near here? — Yes, there is.", why: "a library は単数なので is。答えも there を使います。" },
    { wrong: "How many student are there in your class?", right: "How many students are there in your class?", why: "How many のあとの名詞は複数形にします。" },
  ],
  check: [
    { q: "There ___ some water in the glass. の ___ に入る語は？", a: "is", why: "water は数えられない名詞なので is。" },
    { q: "There were many people in the park. を疑問文にしましょう。", a: "Were there many people in the park?", why: "were を there の前に出す。" },
    { q: "「あなたの町には公園がいくつありますか」を英語に。", a: "How many parks are there in your town?", why: "How many ＋ 複数名詞 ＋ are there 〜?" },
  ],
  next: [
    { label: "4択ドリル「There is / There are」に挑戦", href: "/learn/eibunpo-chu/j-en-2-there" },
    { label: "be動詞のしくみをふり返る", href: "/learn/eibunpo-chu/j-en-1-be" },
    { label: "つぎに「不定詞」", href: "/learn/eibunpo-chu/j-en-2-futeishi" },
  ],
};
