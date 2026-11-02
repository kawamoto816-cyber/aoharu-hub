import type { Lecture } from "../types";

const C = "/media/commons/j-en-3-eisakubun";

export const J_EN_3_EISAKUBUN: Lecture = {
  unit: "j-en-3-eisakubun",
  title: "中3の英作文は「意見→理由→まとめ」の型で、書ける英語に言いかえる",
  hook: "高校入試では「あなたは〜に賛成ですか。理由を2つ書きなさい」のような{{意見を書く英作文}}がよく出ます。思いついた日本語をそのまま訳そうとすると手が止まりますが、{{決まった型}}と、知っている英語への{{言いかえ}}を使えば、まとまった文章が書けるようになります。",
  mystery: "18世紀のアメリカで、学校に2年ほどしか通えなかった印刷屋の少年ベンジャミン・フランクリンは、のちに独立宣言の文案を見直す委員に選ばれるほどの書き手になりました。教えてくれる先生もいないのに、彼はどうやって英作文の腕をみがいたのでしょう？",
  mission: {
    from: "市民センター「英語で書こう」講座の講師",
    request: "中学生向けの英作文講座を開いていますが、受講生の多くが「英作文は才能のある人だけのもの」とあきらめかけています。初回の授業で、独学で名文家になったフランクリンの話をしたいのに、彼が実際にどんな練習をしたのかがわかりません。だれでもまねできる方法として伝えるために、名探偵のあなたに、フランクリンの練習法のなぞを解いてほしいのです。",
    thanks: "お手本の要点だけをメモし、日をおいて自分の言葉で書き直し、お手本と比べて直す。才能ではなく、型・言いかえ・見直しのくり返しだったのですね。これで初回の授業で「今日からまねできる練習法」として紹介できます。",
  },
  sections: [
    {
      heading: "意見文は「意見→理由→まとめ」の順",
      body: "意見を書くときは、まず{{自分の立場}}をはっきり書き、次に{{理由}}を挙げ、最後にもう一度意見を{{まとめ}}ます。理由が2つなら First, 〜. Second, 〜. と番号をつけると、読む人に伝わりやすくなります。この順番を決めておけば、何を書くかだけを考えればよくなります。",
      reading: [
        "「中学生は毎日日記を書くべきだと思いますか」と聞かれたとします。英語の意見文では、最初の1文で{{立場}}を言いきります。I think students should keep a diary.（生徒は日記をつけるべきだと思います）。次に理由です。First, it helps us remember our days.（第一に、毎日のことを覚えておくのに役立ちます）。Second, we can practice writing every day.（第二に、毎日書く練習ができます）。最後に So, I think keeping a diary is a good idea.（だから、日記をつけるのはよい考えだと思います）と{{まとめ}}ます。日本語の作文は理由から話し始めて最後に結論を言うことが多いのですが、英語では{{結論が先}}です。",
        "この型で書かれた歴史上の文書があります。1776年7月4日、イギリスの植民地だったアメリカの13の地域が、独立を宣言した{{独立宣言}}です。下書きを書いたのは33歳のトマス・ジェファソンで、それをフランクリンやジョン・アダムズらの委員が見直しました。宣言はまず「すべての人は平等につくられている」という考えを示し、イギリスからの独立という立場をはっきりさせます。次に To prove this（これを証明するために）と言って、イギリス国王がしたことへの不満を27ほども並べます。これが理由です。そして最後に We, therefore（だから私たちは）で始まる文で、植民地は自由で独立した国だと結論をまとめます。",
        "なぜこの順番が強いのでしょう。最初に結論を知った読み手は「本当にそう言えるの？」と思いながら、理由を1つずつ確かめて読み進められます。最後の therefore（だから）は、作文の So, I think 〜. と同じ役目です。当時の人々に読み上げられ、新聞にも刷られたこの文書は、のちの時代の多くの国の宣言にも影響を与えたといわれます。入試の100語足らずの英作文も、骨組みは独立宣言と同じなのです。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "us",
        text: "We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness.\n……\nTo prove this, let Facts be submitted to a candid world.\n……\nWe, therefore, the Representatives of the united States of America, in General Congress, Assembled, …… That these United Colonies are, and of Right ought to be Free and Independent States;",
        ja: "私たちは、次のことを自明の真理と考える。すべての人は平等につくられ、創造主によって、だれにもうばえない権利をあたえられている。その中には、生命、自由、そして幸福を追い求める権利がふくまれている。\n……\nこれを証明するために、公正な世界に事実を示そう。\n……\nだから私たち、アメリカ連合諸邦の代表は、全体会議に集まり、……これらの連合した植民地は、自由で独立した国であり、当然そうあるべきだと。",
        cite: "The Declaration of Independence (1776)",
        source: "https://www.archives.gov/founding-docs/declaration-transcript",
      }],
      photos: [
        {
          src: `${C}/declaration.webp`, width: 800, height: 525,
          alt: "広い会議室で、机の前に立つ5人の男性が文書を差し出し、まわりに大勢の男性がすわっている油絵",
          caption: "トランブル『独立宣言』（1819年）。中央の5人が文案の委員で、右はしがフランクリン（場面は画家の想像）。宣言は{{意見→理由→まとめ}}の順で書かれた。",
          credit: { author: "John Trumbull", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Declaration_of_Independence_(1819),_by_John_Trumbull.jpg" },
        },
      ],
      figure: {
        type: "flow",
        title: "意見文の組み立て",
        dir: "col",
        steps: [
          { label: "意見", sub: "I think (that) 〜.", tone: "navy" },
          { label: "理由1", sub: "First, 〜.", tone: "blue" },
          { label: "理由2", sub: "Second, 〜.", tone: "blue" },
          { label: "まとめ", sub: "So, I think 〜.", tone: "yellow" },
        ],
        note: "賛成・反対なら I agree (with 〜). / I don't agree (with 〜). で始めてもよい。",
      },
      cliff: "型は決まった。でも、言いたい単語を知らないときは、どうすればいいのでしょう？",
    },
    {
      heading: "むずかしい日本語は、やさしい日本語にしてから英語に",
      body: "「人見知りだ」「充実している」のような日本語は、そのままの英単語が思いつかないことがあります。そんなときは、{{小学生にもわかる日本語}}に言いかえてから英語にします。知っている単語と文法だけで書くほうが、{{まちがいも少なく}}なります。",
      reading: [
        "「私は人見知りです」を英語にしようとして、辞書で「人見知り」を探す必要はありません。まず、{{小学生にもわかる日本語}}にします。「初めて会う人と話すと、緊張する」。これなら I get nervous when I talk with new people.（初めての人と話すと緊張します）と、中2までの英語で書けます。英作文で手が止まるのは、英語の力が足りないからではなく、日本語がむずかしすぎることが多いのです。{{言いかえ}}は、自分の知っている英語へ橋をかける作業です。",
        "言葉を知らないまま、何かを伝えようとした人がいます。1880年にアメリカ南部のアラバマ州で生まれた{{ヘレン・ケラー}}は、1歳7か月のとき病気で目と耳の自由を失いました。1887年3月、家庭教師のアン・サリヴァンがやって来て、ヘレンの手のひらに指で文字をつづり、言葉を教え始めます。けれどもヘレンには、指の動きが物の名前だとはなかなかわかりませんでした。",
        "4月のある日、井戸のポンプから流れる水がヘレンの片手にかかり、サリヴァンはもう片方の手に w-a-t-e-r とつづりました。その瞬間、ヘレンは物には名前があることを知ります。のちに大学生になったヘレンは、1903年の自伝『わたしの生涯』でこの場面を書きました。そこで水を、the wonderful cool something（すてきな、冷たい何か）と表しています。当時のヘレンには water という言葉がまだなかった。だから、知っている感覚の言葉を組み合わせて、名前のないものを伝えたのです。英作文でも、単語がわからないときは something や a person、a place に説明を足せば、言いたいことにたどり着けます。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "us",
        text: "As the cool stream gushed over one hand she spelled into the other the word water, first slowly, then rapidly. I stood still, my whole attention fixed upon the motions of her fingers. Suddenly I felt a misty consciousness as of something forgotten—a thrill of returning thought; and somehow the mystery of language was revealed to me. I knew then that \"w-a-t-e-r\" meant the wonderful cool something that was flowing over my hand. That living word awakened my soul, gave it light, hope, joy, set it free!",
        ja: "冷たい水が片方の手にほとばしると、先生はもう片方の手に water という言葉をつづった。はじめはゆっくりと、それから速く。わたしはじっと立ちつくし、先生の指の動きに全身の注意を集めた。ふいに、忘れていた何かを思い出すような、ぼんやりとした感覚がわき上がった。考えがよみがえってくる胸のふるえ。そしてなぜか、言葉のなぞがわたしの前に明かされた。そのときわたしは知った。「w-a-t-e-r」とは、わたしの手の上を流れている、あのすてきな冷たい何かのことなのだと。その生きた言葉が、わたしのたましいを目覚めさせ、光と希望と喜びをあたえ、自由にしてくれた！",
        cite: "Helen Keller, The Story of My Life, Chapter IV (1903)",
        source: "https://www.gutenberg.org/ebooks/2397",
      }],
      photos: [
        {
          src: `${C}/pump.webp`, width: 800, height: 1199,
          alt: "木の屋根の下に立つ、黒い鉄の手押しポンプ。足もとに英語が刻まれた石の板がある",
          caption: "ヘレン・ケラーの生家（アラバマ州）に残る井戸のポンプ。ここで手に水を受けながら water を知った。ヘレンは水を「すてきな冷たい何か」と{{言いかえ}}て書いた。",
          credit: { author: "Sheila Scarborough", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0", source: "https://commons.wikimedia.org/wiki/File:Water_Pump_at_Ivy_Green.jpg" },
        },
      ],
      figure: {
        type: "formula",
        title: "「休日は充実していた」を英語に",
        prose: true,
        steps: [
          { label: "もと", expr: "休日は{{充実していた}}。", note: "英語が思いつかない" },
          { label: "言いかえ", expr: "休日に{{たくさんのことをして楽しかった}}。", note: "やさしい日本語に" },
          { label: "英語", expr: "{{I did many things and had a good time}} on my holiday.", note: "知っている英語で書く" },
        ],
      },
      cliff: "ヘレンの「冷たい何か」のうしろには、中3で習う文法がかくれています。",
    },
    {
      heading: "中3の文法で、理由をくわしくする",
      body: "理由が「楽しいから」だけでは説得力が弱くなります。中3で習った{{It is 〜 to …}}、{{関係代名詞}}、{{分詞}}などを使うと、1文に情報をたくさん入れられます。ただし、自信のない形を無理に使うより、正しく書ける文を選ぶことが大切です。",
      reading: [
        "「留学したい。楽しそうだから」。これを I want to study abroad because it looks fun. とすると、文法は正しくても理由が少しぼんやりします。中3の文法を足してみましょう。{{It is 〜 for 人 to …}}を使えば It is exciting for me to talk with people from other countries.（外国の人と話すのは、私にとってわくわくすることです）。{{関係代名詞}}を使えば I want to make friends who speak different languages.（ちがう言葉を話す友だちを作りたい）。「何が」「どんな」が加わって、読み手の頭に場面がうかぶ理由になります。",
        "ヘレンの一文をもう一度見てみましょう。the wonderful cool something / that was flowing over my hand。前半の something に、後半の that 〜 が「わたしの手の上を流れていた」と説明を足しています。この that は、中3で習う{{関係代名詞}}です。そのうえ was flowing は過去進行形で、水が今まさに流れ続けていた感じまで伝えます。名前を知らない「何か」でも、うしろから説明をつなげば、ほかのどんな言葉より生き生きと伝わる。言いかえと関係代名詞は、最高の組み合わせなのです。",
        "長い文が書けなくても心配はいりません。まず短い2文で書き、あとでつなげばよいのです。I have a friend. She lives in Canada. は、I have a friend who lives in Canada.（カナダに住んでいる友だちがいます）と1文にできます。反対に、関係代名詞や{{分詞}}に自信がなければ、2文のままで十分です。入試の英作文では、むずかしい形よりも、まちがいのない文のほうが点になります。",
      ],
      photos: [
        {
          src: `${C}/keller-sullivan.webp`, width: 500, height: 633,
          alt: "いすにすわり人形をひざにだく少女と、その横で白い服を着てすわる若い女性の白黒写真",
          caption: "8歳のヘレン・ケラー（左）と先生のアン・サリヴァン（1888年7月）。water を知った翌年。指でつづる言葉で、ヘレンは文を組み立てられるようになっていった。",
          credit: { author: "Family member of Thaxter P. Spencer", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Helen_Keller_with_Anne_Sullivan_in_July_1888.jpg" },
        },
      ],
      figure: {
        type: "compare",
        title: "理由をくわしくする形",
        columns: [{ title: "使える形", tone: "yellow" }, { title: "例" }],
        rows: [
          { label: "不定詞", cells: ["It is 〜 for 人 to …", "It is fun to travel."] },
          { label: "関係代名詞", cells: ["名詞＋who / that 〜", "a friend who helps me"] },
          { label: "分詞", cells: ["名詞＋-ing / 過去分詞", "a book written in English"] },
        ],
      },
      cliff: "書けたら終わり、ではありません。ある少年は「見直し」で名文家になりました。",
    },
    {
      heading: "書いたら必ず見直す",
      body: "書き終えたら、{{主語と動詞があるか}}、{{時制}}（現在・過去）、主語が3人称単数のときの s、名詞の{{複数形}}をチェックします。Because 〜. だけで文を終えていないかも確かめましょう。because は「〜なので」と前の文につなぐ語なので、I like dogs because they are cute. のように1文にします。",
      reading: [
        "{{ベンジャミン・フランクリン}}は1706年、ボストンのろうそく職人の家に生まれました。学校に通えたのは10歳ごろまでの2年ほどで、12歳からは兄の印刷所で見習いとして働きます。10代の半ばごろ、彼はロンドンの新聞『{{スペクテイター}}』の古い1冊を手に入れました。1711年からアディソンとスティールが出していた、わかりやすく品のある文章で人気の随筆の新聞です。フランクリンは「この文章をまねしたい」と考え、独自の練習を始めました。",
        "やり方はこうです。記事を選び、それぞれの文の言いたいことを短い{{メモ}}にする。数日おいてから、本を見ずに、メモをもとに自分の言葉で元の文章と同じくらいくわしく書き直す。そして書いたものを{{元の文章と比べて}}、自分のまちがいを見つけて直す。メモをわざとばらばらにして、何週間かあとに正しい順に並べ直す練習もしました。文章の{{組み立て}}を身につけるためです。言葉の数を増やそうと、散文を詩に書きかえ、また散文にもどすこともしたと、自伝に書いています。",
        "この練習は実を結びます。16歳のフランクリンは、名前をかくして兄の新聞に投書し、人気を集めました。やがて自分の印刷所を持ち、暦『貧しいリチャードの暦』に気のきいた言葉をのせて評判となり、のちに政治家・外交官となって独立宣言の委員にも選ばれます。みなさんの見直しも同じです。書いた英文を教科書の例文と比べ、主語と動詞、時制、3単現の s、複数形を1つずつ確かめる。比べて直すことこそ、書く力がのびるいちばんの近道です。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "us",
        text: "I thought the writing excellent, and wished, if possible, to imitate it. With this view I took some of the papers, and, making short hints of the sentiment in each sentence, laid them by a few days, and then, without looking at the book, try'd to compleat the papers again, by expressing each hinted sentiment at length, and as fully as it had been expressed before, in any suitable words that should come to hand. Then I compared my Spectator with the original, discovered some of my faults, and corrected them.",
        ja: "わたしはその文章をすばらしいと思い、できることならまねしたいと願った。そこで記事をいくつか選び、それぞれの文の言いたいことを短いメモにして、数日わきに置いた。それから本を見ずに、メモにした考えを1つずつ、もとの文章と同じくらいくわしく、思いついたふさわしい言葉で書き表して、記事をもう一度完成させようとした。そして自分の『スペクテイター』を元の文章と比べ、自分のまちがいをいくつか見つけて、直した。",
        cite: "Benjamin Franklin, Autobiography (written 1771–1790)",
        source: "https://www.gutenberg.org/ebooks/20203",
        say: "I thought the writing excellent, and wished, if possible, to imitate it. With this view I took some of the papers, and, making short hints of the sentiment in each sentence, laid them by a few days, and then, without looking at the book, tried to complete the papers again, by expressing each hinted sentiment at length, and as fully as it had been expressed before, in any suitable words that should come to hand. Then I compared my Spectator with the original, discovered some of my faults, and corrected them.",
      }],
      photos: [
        {
          src: `${C}/spectator.webp`, width: 800, height: 1493,
          alt: "飾り模様の下に THE SPECTATOR と大きく刷られた、古い英語の新聞の1ページ目",
          caption: "『スペクテイター』第81号（1711年6月2日）。s を f に似た形（ſ）で刷るのが当時の習わし。フランクリンはこの新聞の随筆をお手本に、{{書き直しと見直し}}をくり返した。",
          credit: { author: "Library of Congress", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Page_1_of_The_Spectator,_(London,_1712-17),_no._81;_Sat.,_June_2,_1711_LCCN2003654665.jpg" },
        },
        {
          src: `${C}/franklin.webp`, width: 800, height: 985,
          alt: "灰色の上着を着た、白髪まじりの長い髪の年配の男性の肖像画",
          caption: "デュプレシ『ベンジャミン・フランクリン』（1785年ごろ）。学校教育は2年ほどだったが、お手本と自分の文を{{比べて直す}}練習で、アメリカを代表する書き手になった。",
          credit: { author: "Joseph-Siffred Duplessis", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Joseph_Siffrein_Duplessis_-_Benjamin_Franklin_-_Google_Art_Project.jpg" },
        },
      ],
      reveal: "フランクリンの先生は、お手本の文章と、自分自身の{{見直し}}でした。記事の言いたいことだけをメモし、日をおいて{{自分の言葉で書き直す}}のは、この単元の「言いかえ」そのもの。ばらばらのメモを並べ直すのは「意見→理由→まとめ」の{{組み立て}}の練習。そして元の文章と比べてまちがいを見つけ、直す。才能ではなく、型・言いかえ・見直しのくり返しが、印刷屋の少年を独立宣言の委員にまで押し上げたのです。",
    },
  ],
  story: {
    kind: "manga4",
    title: "宿題をたくさん出す人",
    panels: [
      {
        scene: "放課後の教室。ハルトが辞書を何冊も広げて頭をかかえる。ナナがのぞきこむ。",
        lines: [
          { who: "ハルト", text: "「人見知り」って英語で何？" },
          { who: "ナナ", text: "辞書に出てないの？" },
          { who: "ハルト", text: "むずかしい単語しかない…" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ハルト", look: "boy", x: 252, face: "sweat", fx: "sweat" },
            { who: "ナナ", look: "girl", x: 86, face: "think", fx: "?" },
          ],
          props: [
            { kind: "table", x: 0, y: 240 },
            { kind: "book", x: 150, y: 222, s: 0.9 },
            { kind: "book", x: 190, y: 226, s: 0.8 },
          ],
        },
      },
      {
        scene: "ナナが札を立てて説明する。ハルトの顔が明るくなる。",
        lines: [
          { who: "ナナ", text: "やさしい日本語に{{言いかえ}}よう" },
          { who: "ナナ", text: "「初めての人と話すと緊張」" },
          { who: "ハルト", text: "それなら知ってる英語で書ける！" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ナナ", look: "girl", x: 254, face: "smile", fx: "idea", hand: [214, 214] },
            { who: "ハルト", look: "boy", x: 84, face: "surprise", fx: "!" },
          ],
          props: [
            { kind: "table", x: 0, y: 240 },
            { kind: "board", x: 170, y: 214, text: "やさしい日本語" },
          ],
        },
      },
      {
        scene: "ナナが本を開いてヘレン・ケラーの一文を見せる。",
        lines: [
          { who: "ナナ", text: "ヘレンは水を「すてきな" },
          { who: "ナナ", text: "冷たい何か」って書いたの" },
          { who: "ハルト", text: "{{関係代名詞}}で説明を足すのか" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ナナ", look: "girl", x: 252, face: "normal", hand: [212, 216] },
            { who: "ハルト", look: "boy", x: 84, face: "think", fx: "idea" },
          ],
          props: [
            { kind: "table", x: 0, y: 240 },
            { kind: "board", x: 166, y: 214, text: "何か＋that" },
          ],
        },
      },
      {
        scene: "得意になったハルトが「先生」を言いかえる。うしろに先生が立っている。",
        lines: [
          { who: "ハルト", text: "先生は「宿題をたくさん" },
          { who: "ハルト", text: "出す人」！" },
          { who: "先生", text: "よし、明日は倍出す人になろう" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ハルト", look: "boy", x: 252, face: "smile", hand: [216, 210] },
            { who: "先生", look: "teacher", x: 88, face: "smile", fx: "steam" },
          ],
          props: [
            { kind: "table", x: 0, y: 244 },
            { kind: "board", x: 168, y: 214, text: "人＋who" },
          ],
        },
      },
    ],
    note: "ハルト・ナナ・先生は架空の人物で、教室の場面と会話は創作です。ヘレン・ケラーが水を the wonderful cool something と書いたことは、自伝『わたしの生涯』（1903年）の本文にもとづいています。",
  },
  mistakes: [
    { wrong: "I like summer. Because I can swim.", right: "I like summer because I can swim.", why: "because だけの文は不完全。前の文とつなげて1文にします。" },
    { wrong: "I agree this opinion.", right: "I agree with this opinion.", why: "「（意見）に賛成する」は agree with 〜。with を落としやすい。" },
    { wrong: "I want to go to there.", right: "I want to go there.", why: "there（そこへ）は副詞なので、to はつけません。" },
    { wrong: "It is important to studying English.", right: "It is important to study English.", why: "It is 〜 to のあとは動詞の原形です。" },
  ],
  check: [
    { q: "意見文で、理由を2つ並べるときの書き出しの語は？", a: "First, … / Second, …", why: "番号をつけると理由の区切りがはっきりする。" },
    { q: "「私は犬が好きです。なぜならかわいいからです。」を1文の英語に。", a: "I like dogs because they are cute.", why: "because で前の文とつなぐ。dogs は they で受ける。" },
    { q: "「本を読むことは大切だ」を It で始めて英語に。", a: "It is important to read books.", why: "仮の主語 It＋is 〜＋to＋原形。" },
  ],
  next: [
    { label: "4択ドリル「英作文」に挑戦", href: "/learn/eigo-chu/j-en-3-eisakubun" },
    { label: "ふりかえり「英作文」（中1）", href: "/learn/lecture/j-en-1-eisakubun" },
    { label: "使える形をふやす「不定詞の発展」", href: "/learn/lecture/j-en-3-futeishi" },
  ],
};
