import type { Lecture } from "../types";

const C = "/media/commons/h-eng-gram-kanfuku";
const SG = "https://www.gutenberg.org/ebooks/113";

export const H_ENG_GRAM_KANFUKU: Lecture = {
  unit: "h-eng-gram-kanfuku",
  title: "関係副詞は「前置詞＋ which」の代わり。後ろには欠けのない文が続く",
  hook: "「ぼくが育った町」「初めて会った日」のように、場所や時を後ろから説明したい場面はよくあります。英語では where や when を使って the town where I grew up と言います。関係代名詞との見分け方を一度つかめば、長文で名詞のあとに続く説明がすっと読めるようになります。",
  mystery: "バーネットの『秘密の花園』は、閉ざされた庭を that garden where he lives と書く一方で、ムーアの小さな家を the moorland cottage which held fourteen people と書きます。庭も家も同じ「場所」なのに、なぜ where と which に分かれるのでしょう？",
  mission: {
    from: "英国式庭園を再現した植物園の英語ガイド",
    request: "来春、園内に『秘密の花園』をテーマにした小道をつくり、英語の案内板を立てます。ところが、ボランティアの高校生が書いた案内文が the garden where Mary opened と the garden which Mary opened のどちらかで割れてしまい、だれも理由を説明できません。海外からのお客さんに恥ずかしくない案内板にするため、名探偵のあなたに、where と which の分かれ目を解き明かしてほしいのです。",
    thanks: "決め手は「場所かどうか」ではなく、後ろの文に欠けがあるかどうかだったのですね。opened の目的語が欠けている the garden which Mary opened、欠けのない the garden where the robin lives。案内板は両方とも、自信をもって正しく書き分けられます。",
  },
  sections: [
    {
      heading: "4つの関係副詞と先行詞",
      body: "関係副詞は {{where}}（場所）・{{when}}（時）・{{why}}（理由）・{{how}}（方法）の4つです。先行詞の種類で使い分けます。why の先行詞はほぼ {{the reason}} だけです。how は {{the way と並べて使えず}}、the way か how のどちらか一方だけを書きます。",
      reading: [
        "{{関係副詞}}は、名詞（{{先行詞}}）のすぐ後ろに置いて、「それはどんな場所か・どんな時か」を後ろから説明する文をつなぐ言葉です。日本語では「ぼくが育った町」と説明が名詞の前に来ますが、英語では the town where I grew up と、まず名詞を言い切ってから説明を足します。英語の名詞は「まず指さしてから、くわしく言う」のです。先行詞が場所なら {{where}}、時なら {{when}}、理由（the reason）なら {{why}}、方法なら {{how}} を使います。",
        "この単元では、1911年に出たフランシス・ホジソン・バーネットの『{{秘密の花園}}』で関係副詞を味わいます。バーネットは1849年にイギリスのマンチェスターで生まれ、16歳のころ家族とアメリカに渡り、『小公子』（1886年）、『小公女』（1905年）で人気作家になりました。『秘密の花園』の主人公メアリーは、インドで両親を病気で亡くし、イギリス北部ヨークシャーの広い屋敷に住むおじに引き取られた、わがままで不機嫌な少女です。屋敷には、10年間だれも入れずに鍵をかけられた庭がありました。",
        "第4章で、メアリーは庭師のベンが話していた人なつこいコマドリを目で追います。鳥は果樹園の塀をこえ、さらに向こうの塀をこえて消えていきました。下の一節がそのときのメアリーの叫びです。the garden が先行詞、where there is no door が「ドアのない」という説明で、「ドアのない庭」になります。この1語の where で、読者もメアリーと同時に「入口のない庭がある」と気づくのです。",
        "when も同じしくみです。第6章には The time had come when Mary had forgotten to resent Martha's familiar talk.（メアリーが、メイドのマーサのなれなれしい話しぶりに腹を立てるのを忘れてしまう時が来ていた）という文があります。先行詞 the time と when のあいだに had come がはさまり、少し離れていますが、when 節は the time を説明しています。長文では、先行詞と関係副詞が離れることもあると覚えておきましょう。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "He has flown into the orchard—he has flown across the other wall—into the garden where there is no door!",
        ja: "あの子、果樹園の中へ飛んでいった。向こうの塀もこえて――ドアのない庭の中へ！",
        cite: "Frances Hodgson Burnett, The Secret Garden, Chapter IV (1911)",
        source: SG,
      }],
      photos: [
        {
          src: `${C}/burnett.webp`, width: 800, height: 1123,
          alt: "レースのついた長いドレスの女性が、いすにすわって机の上の本を読んでいる白黒の写真",
          caption: "フランシス・ホジソン・バーネット（1849〜1924年）。イギリスに生まれ、アメリカで作家として活躍した。『{{秘密の花園}}』は60歳をこえてから書いた作品。",
          credit: { author: "Virginia M. Prall", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Frances_Hodgson_Burnett,_full-length_portrait,_seated,_reading_at_a_table_LCCN2004681682.jpg" },
        },
        {
          src: `${C}/cover.webp`, width: 800, height: 1143,
          alt: "赤いコートの少女が、つたにおおわれた塀に身をかがめて鍵をさしこんでいる絵。枝に小鳥がとまっている本の表紙",
          caption: "『秘密の花園』初版（1911年、ニューヨーク）の表紙。M・L・カークの絵。つたの塀のかげに鍵穴を見つけたメアリーと、枝の上のコマドリ。",
          credit: { author: "Maria Louise Kirk", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Houghton_AC85_B9345_911s_-_Secret_Garden,_1911_-_cover.jpg" },
        },
      ],
      figure: {
        type: "compare",
        title: "関係副詞と先行詞",
        columns: [{ title: "先行詞", tone: "yellow" }, { title: "例" }],
        rows: [
          { label: "where", cells: ["場所（town など）", "a park where we play"] },
          { label: "when", cells: ["時（day など）", "the day when we met"] },
          { label: "why", cells: ["理由（the reason）", "the reason why I won"] },
          { label: "how", cells: ["方法（先行詞なし）", "how I solved it"] },
        ],
        note: "how の文は the way I solved it とも言える（the way how は ×）。",
      },
      cliff: "where という1語の中には、じつは2つの語がかくれています。",
    },
    {
      heading: "関係副詞＝前置詞＋ which",
      body: "関係副詞は、{{前置詞＋ which}} を1語にまとめたものです。2つの文をつなぐとき、後ろの文の in it・on that day などの{{副詞のまとまり}}が関係副詞に変わります。だから関係副詞の後ろには、主語も目的語もそろった{{完全な文}}が続きます。",
      reading: [
        "関係副詞の正体は、{{前置詞＋ which}} です。The robin lives in the garden.（コマドリはその庭に住んでいる）の in the garden は、「どこに」を表す{{副詞のまとまり}}です。この庭を先行詞にして文をつなぐと、まず the garden in which the robin lives となり、さらに in which を1語にまとめると the garden where the robin lives になります。where は「in which」「at which」「to which」の、場所の前置詞をまるごと引き受けた1語なのです。",
        "第7章、メアリーは庭の小道で、またあのコマドリに出会います。下の一節は、彼女が庭師のベンにたずねる言葉です。he はコマドリのこと。that garden where he lives は「あの子が住んでいる庭」で、where の後ろの he lives は、主語と動詞だけでもう完成した文です。live は「住む」という自動詞で目的語をとらないので、in which の in が where の中に入っていると考えると、形がすっきり分かります。ベンは「What garden?」（なんの庭だ）と不機嫌に返し、話をそらしてしまいました。",
        "時や理由も同じです。on the day が on which をへて when に、for the reason が for which をへて why になります。逆に言えば、where や when を見たら「前置詞＋ which だ」と戻して考えれば、後ろの文のどこに当てはまるかが分かります。物語の舞台ヨークシャーには、ヒースが一面に広がる荒れ野「{{ムーア}}」があり、メアリーはやがてマーサの弟ディコンと、ムーアの生き物や庭の土の中で動きだす命について語り合うようになります。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "“Are things stirring down below in the dark in that garden where he lives?” Mary inquired.",
        ja: "「あの子が住んでいる庭では、暗い土の下で、もういろいろなものが動きだしているの？」とメアリーはたずねた。",
        cite: "Frances Hodgson Burnett, The Secret Garden, Chapter VII (1911)",
        source: SG,
      }],
      photos: [
        {
          src: `${C}/moor.webp`, width: 640, height: 465,
          alt: "紫色の花が一面にさく、なだらかな丘の荒れ野と、その中をのびる細い道",
          caption: "ヨークシャーのノース・ヨーク・ムーアズ（2005年8月）。紫はヒースの花。『秘密の花園』の屋敷は、こうした{{ムーア}}（荒れ野）のはずれにあるという設定。",
          credit: { author: "Colin Grice", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Heather_moorland_on_the_North_York_Moors.jpg" },
        },
      ],
      figure: {
        type: "formula",
        title: "2つの文を1つにつなぐ",
        prose: true,
        steps: [
          { expr: "This is the house. I was born {{in it}}.", note: "in it は場所を表す副詞のまとまり" },
          { expr: "This is the house {{which}} I was born {{in}}.", note: "関係代名詞。前置詞が後ろに残る" },
          { expr: "This is the house {{in which}} I was born.", note: "前置詞を which の前に" },
          { expr: "This is the house {{where}} I was born.", note: "in which を where 1語に" },
        ],
      },
      cliff: "では、場所の名詞のあとなのに which が来るのは、どんなときでしょう？",
    },
    {
      heading: "which か where か：後ろの文が欠けているかで決める",
      body: "先行詞が場所だからといって、いつも where になるわけではありません。決め手は{{後ろの文の形}}です。動詞や前置詞の{{目的語が欠けている}}なら関係代名詞 which / that、{{何も欠けていない}}なら関係副詞 where です。the town which I visited は visit の目的語が欠けているので which になります。",
      reading: [
        "関係代名詞の which は、後ろの文の中で主語や目的語の「代わり」をしています。だから which の後ろの文には、必ず名詞が1つ{{欠けた}}穴があります。一方、関係副詞は前置詞ごと引き受けた「副詞の代わり」なので、後ろの文は{{欠けのない完全な文}}です。先行詞が場所かどうかではなく、後ろの文に穴があるかどうか。これが which と where を分ける、ただ一つの決め手です。",
        "第6章で、マーサはムーアの家族の話をメアリーに聞かせます。物語はそれを、the moorland cottage which held fourteen people who lived in four little rooms（14人が4つの小さな部屋に暮らす、ムーアの小屋）と書きます。cottage は場所ですが、which の後ろの held fourteen people には「何が」held したのか、主語がありません。その穴を which が埋めているので、where ではなく which なのです。続く who lived in four little rooms も、lived の主語が欠けた関係代名詞の節です。",
        "第7章、コマドリが跳ねまわる掘り返された土の中から、メアリーは何かを拾い上げます。下の一節の which looked as if 〜 も、looked の主語が欠けているので関係代名詞です。こうして並べると、作者が場所や物の名詞のあとで which と where を、後ろの文の形に合わせてきちんと使い分けていることが分かります。ちなみに、この古い鍵こそ10年間閉ざされた庭の鍵で、物語はここから大きく動きはじめます。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "It was more than a ring, however; it was an old key which looked as if it had been buried a long time.",
        ja: "けれど、それはただの輪ではなかった。ずいぶん長いあいだ土に埋もれていたように見える、古い鍵だったのだ。",
        cite: "Frances Hodgson Burnett, The Secret Garden, Chapter VII (1911)",
        source: SG,
      }],
      photos: [
        {
          src: `${C}/kirk173.webp`, width: 800, height: 1201,
          alt: "赤いカーテンのついた大きなベッドに少年が横たわり、ろうそくを手にした長い髪の少女が入口に立っている絵",
          caption: "M・L・カークの挿絵（1911年初版）。夜、泣き声をたどったメアリーが、屋敷の奥の部屋でいとこのコリンを見つける場面。屋敷には、庭のほかにも閉ざされた秘密があった。",
          credit: { author: "Frances Hodgson Burnett", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Secret_Garden-Kirk-173.jpg" },
        },
      ],
      figure: {
        type: "tree",
        title: "先行詞が場所のときの見分け方",
        root: {
          label: "後ろの文を見る",
          tone: "navy",
          children: [
            { label: "名詞が欠けている", sub: "I visited ___", children: [{ label: "which / that", sub: "関係代名詞", tone: "blue" }] },
            { label: "欠けていない", sub: "I live（完全）", children: [{ label: "where", sub: "関係副詞", tone: "yellow" }] },
          ],
        },
        note: "live は自動詞なので目的語は要らない。live in it の in it が where になる。",
      },
      reveal: "決め手は「場所かどうか」ではなく、{{後ろの文に欠けがあるか}}でした。that garden where he lives の he lives は、主語も動詞もそろった{{完全な文}}です。live in it の in it を where が引き受けているので関係副詞になります。一方、the moorland cottage which held fourteen people は、held の主語が{{欠けている}}ので、その穴を関係代名詞 which が埋めています。庭も小屋も同じ場所でも、後ろの文の形がちがうから、where と which に分かれたのです。",
      cliff: "コンマのついた where は、同じ1語なのに訳し方が変わります。",
    },
    {
      heading: "コンマのある用法と、先行詞の省略",
      body: "where と when は、コンマをつけて先行詞に{{補足の説明}}を加えることができます（{{非制限用法}}）。I went to Nara, where I saw many deer. は「奈良へ行き、そこで…」と前から順に訳します。why と how にはこの用法はありません。また、the place・the time・the reason のような分かりきった先行詞は{{省略}}されることがあり、This is why 〜（こういうわけで〜）のような形になります。",
      reading: [
        "where の前にコンマがあると、働きが変わります。コンマなしの where 節は「どの場所か」を{{しぼりこむ}}説明ですが、コンマつきの where 節は、先行詞が何かはもう分かったうえで「そしてそこでは」と情報を{{足す}}説明です。これを{{非制限用法}}といいます。訳すときは後ろから戻らず、, where を and there、, when を and then と置きかえて、前から順に読み進めます。",
        "下の一節は、第6章で屋敷の使用人たちの暮らしを描いた1文です。below stairs, where there was a huge kitchen は「階下で暮らしていた。そしてそこには大きな台所があった」と、コンマの where が情報を足しています。ところが同じ文の後半の a large servants' hall where there were 〜 にはコンマがなく、「4、5回の食事が出る食堂」と食堂をしぼりこむ説明です。1つの文の中で、2種類の where が自然に使い分けられているのです。途中の when their master was away の when は先行詞のない接続詞（〜するとき）で、関係副詞とは別物です。",
        "最後に、{{先行詞の省略}}です。第3章、屋敷に着いたメアリーに、家政婦長のメドロック夫人は「This room and the next are where you'll live」（この部屋と隣の部屋が、あなたの暮らす所です）と言いわたします。the place where の the place が省かれ、where 節そのものが「〜する所」という名詞の働きをしています。同じように This is why 〜（こういうわけで〜）、That is how 〜（そうやって〜）も、the reason・the way が省かれた形です。冷たく閉じこめられたメアリーが、やがて庭の世話を通して変わっていくこの物語は、20世紀を通じて読みつがれ、劇や映画にもなりました。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "In fact, there was no one to see but the servants, and when their master was away they lived a luxurious life below stairs, where there was a huge kitchen hung about with shining brass and pewter, and a large servants' hall where there were four or five abundant meals eaten every day, and where a great deal of lively romping went on when Mrs. Medlock was out of the way.",
        ja: "じっさい、顔を合わせるのは使用人たちだけだった。主人が留守のあいだ、彼らは階下でぜいたくに暮らしていた。そこには、ぴかぴかの真鍮やしろめの器がずらりとかかった大きな台所があり、毎日4、5回もたっぷりの食事が出る広い使用人の食堂があって、メドロック夫人がいないすきには、そこでにぎやかな大さわぎがくり広げられていた。",
        cite: "Frances Hodgson Burnett, The Secret Garden, Chapter VI (1911)",
        source: SG,
      }],
      photos: [
        {
          src: `${C}/frontispiece.webp`, width: 800, height: 1216,
          alt: "木の下の草の上に、青い服の少女と赤毛の少年がすわり、キツネやリス、枝の上のカラスがそばにいる絵",
          caption: "『秘密の花園』初版の口絵（M・L・カーク画、1911年）。よみがえった庭で、メアリーとディコンが動物たちとすごす場面。閉ざされた庭が、子どもたちの居場所に変わった。",
          credit: { author: "Maria Louise Kirk", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Houghton_AC85_B9345_911s_-_Secret_Garden,_1911_-_frontispiece.jpg" },
        },
      ],
      figure: {
        type: "flow",
        title: "非制限用法は前から順に訳す",
        steps: [
          { label: "奈良へ行った", sub: "went to Nara,", tone: "blue" },
          { label: "where", sub: "そしてそこで", tone: "yellow" },
          { label: "シカを見た", sub: "saw many deer.", tone: "blue" },
        ],
        note: ", where ＝ and there、, when ＝ and then と考える。",
      },
    },
  ],
  story: {
    kind: "manga4",
    title: "ドアのない庭、穴のない文",
    panels: [
      {
        scene: "放課後の教室。ハナが『秘密の花園』の原書を広げ、自信満々に「庭＝where」の札を立てる。",
        lines: [
          { who: "ハナ", text: "庭は場所でしょ？" },
          { who: "ハナ", text: "場所の後ろは" },
          { who: "ハナ", text: "ぜんぶウェア！" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ハナ", look: "girl", x: 254, face: "smile", fx: "!", hand: [210, 226] },
            { who: "リク", look: "boy", x: 86, face: "think" },
          ],
          props: [
            { kind: "table", x: 0, y: 244 },
            { kind: "book", x: 212, y: 226, s: 0.9 },
            { kind: "board", x: 140, y: 238, text: "庭＝where" },
          ],
        },
      },
      {
        scene: "リクが札を「opened＿」にかえて、下線のところを指さす。",
        lines: [
          { who: "リク", text: "メアリーが開けた庭" },
          { who: "リク", text: "開けたの目的語が" },
          { who: "リク", text: "{{欠けてる}}からウィッチ" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "リク", look: "boy", x: 254, face: "normal", hand: [190, 226] },
            { who: "ハナ", look: "girl", x: 86, face: "surprise", fx: "?" },
          ],
          props: [
            { kind: "table", x: 0, y: 244 },
            { kind: "board", x: 150, y: 238, text: "opened＿" },
          ],
        },
      },
      {
        scene: "ハナが本を指でなぞり、ドアのない庭の一節を読む。リクがうなずく。",
        lines: [
          { who: "ハナ", text: "ゼア・イズ・ノー・ドア" },
          { who: "ハナ", text: "これは欠けてない！" },
          { who: "リク", text: "{{完全な文}}だからウェア" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ハナ", look: "girl", x: 254, face: "surprise", fx: "idea", hand: [212, 228] },
            { who: "リク", look: "boy", x: 86, face: "smile" },
          ],
          props: [
            { kind: "table", x: 0, y: 244 },
            { kind: "book", x: 212, y: 226, s: 0.85 },
            { kind: "board", x: 150, y: 238, text: "欠けなし" },
          ],
        },
      },
      {
        scene: "ハナが「穴＝which」の札をかかげて胸を張る。リクが苦笑い。",
        lines: [
          { who: "ハナ", text: "穴のあいた文には" },
          { who: "ハナ", text: "ウィッチという鍵！" },
          { who: "リク", text: "鍵穴まで文法か" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ハナ", look: "girl", x: 254, face: "shout", fx: "!", hand: [214, 212] },
            { who: "リク", look: "boy", x: 86, face: "sweat", fx: "sweat" },
          ],
          props: [
            { kind: "table", x: 0, y: 244 },
            { kind: "board", x: 214, y: 236, text: "穴＝which" },
          ],
        },
      },
    ],
    note: "ハナとリクは架空の人物で、会話はすべて創作です。『秘密の花園』（バーネット、1911年）に the garden where there is no door や the moorland cottage which held fourteen people という表現があること、関係副詞と関係代名詞の見分け方は事実にもとづいています。",
  },
  mistakes: [
    { wrong: "This is the town where I visited last year.", right: "This is the town which (that) I visited last year.", why: "visit の目的語が欠けているので、関係代名詞を使います。" },
    { wrong: "Tell me the way how you made it.", right: "Tell me the way you made it. / Tell me how you made it.", why: "the way と how は並べて使いません。どちらか一方にします。" },
    { wrong: "Kyoto is the city which I was born.", right: "Kyoto is the city where (in which) I was born.", why: "I was born は欠けのない文なので、関係副詞か前置詞＋ which にします。" },
  ],
  check: [
    { q: "I remember the day ___ we first met.", a: "when", why: "先行詞が時（the day）で、後ろの文は欠けがない。" },
    { q: "This is the museum ___ I want to see.", a: "which (that)", why: "see の目的語が欠けているので関係代名詞。" },
    { q: "He was sick. That's ___ he was absent. の ___ は？", a: "why", why: "the reason が省略された That's why 〜（だから〜）。" },
  ],
  next: [
    { label: "4択ドリル「関係副詞」に挑戦", href: "/learn/eibunpo-ko/h-eng-gram-kanfuku" },
    { label: "ひとつ前「関係代名詞」", href: "/learn/eibunpo-ko/h-eng-gram-kandai" },
    { label: "関連「前置詞」", href: "/learn/eibunpo-ko/h-eng-gram-zenchishi" },
  ],
};
