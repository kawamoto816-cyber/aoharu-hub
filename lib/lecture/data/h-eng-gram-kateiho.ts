import type { Lecture } from "../types";

const C = "/media/commons/h-eng-gram-kateiho";

export const H_ENG_GRAM_KATEIHO: Lecture = {
  unit: "h-eng-gram-kateiho",
  title: "仮定法は「時制を1つ過去にずらして」現実とちがうことを言う",
  hook: "「もし私が鳥だったら、君のところへ飛んでいくのに」。現実にはありえないことを言うとき、英語は If I were a bird, I would fly to you. と、今の話なのに過去形を使います。この「時制を1つずらす」しくみさえつかめば、仮定法の形は全部同じ考え方で作れます。",
  mystery: "『嵐が丘』の少年ヒースクリフは、一度もなぐっていない相手について if I knocked him down と過去形で言い、詩人キーツは死を意識した手紙に if I had had time と had を2つ重ねました。英語はなぜ、現実とちがうことを言うとき、時制をわざわざ1つ昔へずらすのでしょう？",
  mission: {
    from: "市民劇場の朗読劇ディレクター",
    request: "冬の朗読会「荒野と手紙」で、『嵐が丘』とキーツの手紙を英語のまま読みます。ところが、出演する高校生が knocked を「昔なぐった思い出」のように読み、had had は「印刷ミスですか」と聞いてきました。声に出す前に、せりふにこめられた気持ちを正しくつかみたいのです。名探偵のあなたに、時制をずらす理由を解き明かしてほしいのです。",
    thanks: "過去形は「現実からの距離」、過去完了は「もう閉じてしまった扉」だったのですね。knocked はくやしい空想として、had had は取りもどせない時間への思いとして、客席に届くように読めます。",
  },
  sections: [
    {
      heading: "ふつうの if と仮定法のちがい",
      body: "If it rains tomorrow, 〜 は、雨が降るかどうか分からない、{{ありうる}}ことの条件です。これに対して仮定法は、{{事実とちがう}}・{{ありえない}}と話し手が思っていることを仮に言う形です。現実から距離をとるしるしとして、動詞を{{1つ過去の形}}にずらします。",
      reading: [
        "If he comes, I will tell him.（彼が来たら伝えます）と If he came, I would tell him.（もし彼が来たら伝えるのだけれど）は、どちらも文法的に正しい文です。ちがうのは、話し手が「彼が来る」ことをどう見ているかです。前者は来るかもしれないと思っている{{ふつうの条件}}、後者は来ないだろう、来るはずがないと思っている{{仮定法}}です。つまり仮定法が表すのは事実そのものではなく、{{話し手の判断}}です。同じ出来事でも、話し手しだいで形が変わるのです。",
        "この「手に入らないもの」をめぐる文法が、物語の芯になっている名作があります。イギリス北部ヨークシャーの荒野の村ハワースで、牧師の家に育ったエミリー・ブロンテ（1818〜1848）が書いた小説『嵐が丘』（Wuthering Heights）です。1847年、女性が小説を出すのがまだ珍しかった時代に、エミリーは男性とも女性ともとれる「エリス・ベル」という筆名で出版しました。姉シャーロットの『ジェイン・エア』、妹アンの『アグネス・グレイ』も同じ年に出ています。",
        "物語の舞台は、荒野に立つ屋敷「嵐が丘」。屋敷の主人がリヴァプールから連れ帰った身よりのない少年ヒースクリフは、屋敷の娘キャサリンと強く結ばれますが、身分と財産の差が2人を引き離していきます。発表当時は荒々しさにとまどう批評も多く、エミリーは翌1848年に30歳で亡くなりました。けれども今では、英文学を代表する小説の一つです。登場人物たちは、何度も「もし〜なら」「〜ならいいのに」と口にします。望むものに手が届かない物語だからです。",
      ],
      photos: [
        {
          src: `${C}/bronte-sisters.webp`, width: 800, height: 969,
          alt: "暗い背景の前に並ぶ、カールした髪の3人の若い女性の油絵。中央には塗りつぶされた人影がうすく見える",
          caption: "弟ブランウェルがえがいたブロンテ姉妹（1834年ごろ）。左からアン、エミリー、シャーロット。中央の柱のような部分には、画家が自分の姿を塗りつぶしたあとが残る。",
          credit: { author: "Branwell Brontë", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:The_Bront%C3%AB_Sisters_by_Patrick_Branwell_Bront%C3%AB_restored.jpg" },
        },
        {
          src: `${C}/top-withens.webp`, width: 800, height: 600,
          alt: "枯れ草色の荒野の斜面に、屋根の落ちた石造りの家の廃墟と2本の木が立っている",
          caption: "ハワース近くの荒野に残る農家の廃墟トップ・ウィゼンズ。『嵐が丘』の屋敷のモデルの一つといわれる。風の吹きすさぶこの景色が、物語の舞台になった。",
          credit: { author: "Dave.Dunford", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:TopWithens.jpg" },
        },
      ],
      figure: {
        type: "compare",
        title: "if の文の3つのタイプ",
        columns: [{ title: "タイプ", tone: "navy" }, { title: "if 節", tone: "yellow" }, { title: "主節" }],
        rows: [
          { cells: ["ふつうの if（今・未来）", "現在形", "will ＋原形"] },
          { cells: ["仮定法過去（今）", "{{過去形}}（be は were）", "would ＋原形"] },
          { cells: ["仮定法過去完了（過去）", "{{had ＋過去分詞}}", "would have ＋過去分詞"] },
        ],
        note: "主節の would は could・might になることもある。",
      },
      cliff: "では、手の届かない「今」を、ヒースクリフはどんな英語で語ったのでしょう？",
    },
    {
      heading: "仮定法過去：今の事実の反対",
      body: "今の事実とちがうことは、if 節を{{過去形}}、主節を{{would（could, might）＋原形}}にします。be動詞は主語にかかわらず{{were}}がふつうです（話しことばでは was もある）。形は過去でも、意味は「今」の話です。",
      reading: [
        "{{仮定法過去}}は、事実の文から作ると確実です。As I don't have time, I can't go.（ひまがないので行けない）の現在形を1つ過去にずらし、否定を肯定に入れかえると、If I had time, I could go.（ひまがあれば行けるのに）になります。主節は「〜だろう」なら would、「〜できるだろう」なら could、「〜かもしれない」なら might。形は過去でも、話しているのは{{今}}のことです。",
        "『嵐が丘』の第7章、クリスマスの場面。上品な隣家リントン家でしばらく過ごしたキャサリンが、きれいに着飾って帰ってきます。汚れた服のままのヒースクリフは、彼女のそばにいる色白で金髪のエドガー・リントンと自分を比べてしまいます。語り手の家政婦ネリーが「あなたなら彼をなぐり倒せるでしょう」とはげますと、ヒースクリフは下の英文のように答えます。",
        "if I knocked him down twenty times は、過去の出来事ではありません。なぐろうと思えばなぐれるかもしれないけれど、仮にそうしたとしても、という{{現実から一歩はなれた想像}}です。だから主節は wouldn't make。続く I wish I had light hair も、金髪でも色白でもない今の自分の裏返しです。ここで was dressed と、were ではなく was が使われているのは、主語が I のくだけた話しことばだから。そして最後の as rich as he will be だけは will のまま。エドガーが金持ちになるのは、くつがえらない{{現実}}だからです。仮定法と現実の will が一文の中でぶつかり、少年のくやしさがにじみます。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "But, Nelly, if I knocked him down twenty times, that wouldn't make him less handsome or me more so. I wish I had light hair and a fair skin, and was dressed and behaved as well, and had a chance of being as rich as he will be!",
        ja: "でもさ、ネリー、たとえあいつを20回なぐり倒したって、あいつがみっともなくなるわけでも、おれがましになるわけでもない。おれも明るい色の髪と白い肌だったらなあ。あいつみたいな服を着て、あいつみたいにふるまえて、あいつがなるくらいの金持ちになれる見こみがあったらなあ！",
        cite: "Emily Brontë, Wuthering Heights, Chapter VII (1847)",
        source: "https://www.gutenberg.org/ebooks/768",
      }],
      figure: {
        type: "formula",
        title: "事実の文を仮定法過去にする",
        prose: true,
        steps: [
          { expr: "As I {{don't have}} time, I {{can't}} go.", note: "事実：今ひまがないので行けない" },
          { expr: "If I {{had}} time, I {{could}} go.", note: "仮定法過去：現在形 → 過去形にずらし、否定は肯定に" },
          { expr: "If I {{were}} you, I {{would}} wait.", note: "be動詞は were" },
        ],
      },
      cliff: "今の反対を過去形で言うなら、もう過ぎた「あのとき」の反対はどう言えばいいのでしょう？",
    },
    {
      heading: "仮定法過去完了：過去の事実の反対。時がまたがる文も",
      body: "過去の事実とちがうことは、if 節を{{had ＋過去分詞}}、主節を{{would have ＋過去分詞}}にします。If I had studied harder, I would have passed. は「（実際は勉強しなかったので）受からなかった」という意味です。「あのときこうしていたら、今ごろは〜」のように、if 節が過去・主節が今のときは、主節だけ would ＋原形にします。",
      reading: [
        "過去の事実はすでに過去形で表されています。そこからさらに一歩「現実からはなれる」には、もう1つ昔の形、つまり過去完了まで下がるしかありません。これが{{仮定法過去完了}}です。If I had known, I would have helped you.（知っていたら手伝ったのに。実際は知らなかった）。have の過去完了は had had になるので、「時間があったなら」は if I had had time です。印刷ミスではありません。「あのとき〜していたら、今ごろ…」と過去と今がまたがるときは、主節だけ would ＋原形にします（{{混合型}}）。",
        "この形を、胸をしめつける場面で使ったのが、イギリスの詩人ジョン・キーツ（1795〜1821）です。ロンドンの貸し馬屋の家に生まれ、医学を学んだのち詩の道へ進み、1819年には「ナイチンゲールに寄せるオード」などの名作を次々に書きました。ロンドン北部ハムステッドの家で、隣に住むファニー・ブローンと恋をし、婚約します。ところが1820年2月、キーツは血をはき、母や弟の命もうばった結核にかかっていることを知ります。",
        "療養中、壁ひとつへだてた隣家のファニーへ書いた手紙の一節が下の英文です。if I had had time I would have made myself remember'd は、典型的な仮定法過去完了。まだ24歳なのに、キーツは自分の一生をもう閉じてしまった過去のように見つめています。翌1821年、彼は療養先のローマで25歳で亡くなり、墓石には名前を刻まず、「その名を水に書かれし者、ここに眠る」という意味の言葉が残されました。けれども今、キーツはイギリスを代表するロマン派の詩人です。仮定法が描いた「名を残せなかった自分」は、現実によってくつがえされたのです。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "\"If I should die,\" said I to myself, \"I have left no immortal work behind me—nothing to make my friends proud of my memory—but I have lov'd the principle of beauty in all things, and if I had had time I would have made myself remember'd.\"",
        say: "\"If I should die,\" said I to myself, \"I have left no immortal work behind me, nothing to make my friends proud of my memory, but I have loved the principle of beauty in all things, and if I had had time I would have made myself remembered.\"",
        ja: "「もし自分が死んだら」と、わたしは心の中でつぶやいた。「わたしは不朽の作品を何ひとつ残していない。友人たちがわたしの思い出を誇れるものは何もない。けれど、わたしはあらゆるものの中にある美の本質を愛してきた。時間さえあったなら、自分の名を人の記憶に残しただろうに」",
        cite: "John Keats, letter to Fanny Brawne (1820), Letters of John Keats to Fanny Brawne, Letter XVII",
        source: "https://www.gutenberg.org/ebooks/60433",
      }],
      photos: [
        {
          src: `${C}/keats-severn.webp`, width: 592, height: 800,
          alt: "開いた窓辺のいすにすわり、片手を頭に当ててひざの上の本を読む若い男性の油絵",
          caption: "友人の画家セヴァーンがえがいたキーツ（1821〜23年ごろ）。キーツの死後、ハムステッドの家で本を読む姿を思い出してえがいた。",
          credit: { author: "Joseph Severn", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Joseph_Severn_(1793-1879)_-_John_Keats_-_NPG_58_-_National_Portrait_Gallery.jpg" },
        },
        {
          src: `${C}/keats-house.webp`, width: 800, height: 615,
          alt: "芝生の庭の奥に建つ、白い2階建ての家。窓が規則正しく並び、煙突が立っている",
          caption: "ハムステッドのキーツ・ハウス。当時は2家族が住む建物で、キーツの隣にファニー・ブローンの一家が暮らした。仮定法過去完了の手紙はここで書かれた。",
          credit: { author: "Jim Osley", license: "CC BY-SA 2.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0", source: "https://commons.wikimedia.org/wiki/File:Keats_House,_Hampstead_-_geograph.org.uk_-_2287033.jpg" },
        },
      ],
      figure: {
        type: "numberline",
        title: "If I had studied harder, I would be a college student now.",
        min: -3,
        max: 1,
        points: [
          { x: -2, label: "had studied", tone: "red" },
          { x: 0, label: "would be", tone: "blue" },
        ],
        moves: [{ from: -2, to: 0, label: "過去の仮定 → 今の結果", tone: "navy" }],
        desc: "−3から1の数直線。−2（過去）に if 節の had studied、0（今）に主節の would be。過去から今へ矢印。",
        note: "if 節と主節の「時」を別々に考えて、それぞれ1つ過去にずらす。",
      },
      reveal: "英語の過去形は、時間の遠さだけでなく{{現実からの遠さ}}を表すしるしです。ヒースクリフの knocked は「やったとしても」という今の空想なので、現在形から1つずらして過去形。キーツの「時間があったなら」はすでに過ぎた過去の反対なので、過去形からさらに1つずらして{{過去完了}}の had had。時制を1つ昔へずらすのは、「これは現実ではない」と聞き手に伝えるための合図であり、had had は、もう取りもどせない時間への思いを形にしていたのです。",
      cliff: "if を使わずに、もっと短く、もっと格調高く「もし」を言う方法もあります。",
    },
    {
      heading: "I wish・as if・if の省略",
      body: "{{I wish}} や {{as if}} のあとも同じずらし方です。I wish I knew. は「今知っていればなあ」、I wish I had known. は「あのとき知っていればなあ」です。また、書きことばでは if を省いて{{主語と動詞を入れかえる}}ことがあり、If I had known は Had I known になります。If it were not for 〜（〜がなければ）は Without 〜 や But for 〜 でも言えます。",
      reading: [
        "{{I wish}} のあとは、今の願いなら過去形、過去への後悔なら過去完了です。He talks {{as if}} he knew everything.（何でも知っているかのように話す。実際は知らない）も同じずらし方で、as if he had seen a ghost なら「幽霊でも見たかのように」。If only I had more time!（時間がもっとありさえすれば）は I wish をさらに強めた言い方です。どれも、主語のあとの動詞を1つ過去へずらすという点では if の文と変わりません。",
        "キーツは、病気がわかる前の1819年7月、ワイト島から最初の手紙をファニーに送りました。その中に I almost wish we were butterflies という一節があります。チョウのように夏の3日だけ生きられたら、という、ありえない願いです。almost（ほとんど）をそえて願いを少しひかえめにし、three such days with you と目的語を文の頭に出して、「あなたと過ごすそんな3日間なら」を強く押し出しています。I could fill も、願いの世界の中で「満たせるだろう」と言う仮定法の could です。",
        "書きことばでは、if を省いて主語と動詞を入れかえる{{倒置}}が使われます。『嵐が丘』第7章で、ネリーは落ちこむヒースクリフに、あなたは皇帝と女王の子で、船乗りにさらわれてきたのかもしれないと空想を語り、Were I in your place と続けます。If I were in your place の if を消し、were を主語の前に出した形です。続く should give me courage の should は、昔のイギリス英語で I・we のあとに would のかわりに使われた形。生まれで見下される少年に、想像の物語で誇りを持たせようとする、ネリーなりのはげましです。",
      ],
      recite: [
        {
          lang: "en", voice: "male", accent: "gb",
          text: "I almost wish we were butterflies and liv'd but three summer days—three such days with you I could fill with more delight than fifty common years could ever contain.",
          say: "I almost wish we were butterflies and lived but three summer days, three such days with you I could fill with more delight than fifty common years could ever contain.",
          ja: "いっそ、ぼくたちがチョウになって、夏の3日間だけを生きられたらとさえ思う。あなたと過ごすそんな3日間なら、ありふれた50年がとうてい入れきれないほどの喜びで満たせるだろう。",
          cite: "John Keats, letter to Fanny Brawne (Shanklin, Isle of Wight, July 1819), Letters of John Keats to Fanny Brawne, Letter I",
          source: "https://www.gutenberg.org/ebooks/60433",
        },
        {
          lang: "en", voice: "female", accent: "gb",
          text: "Who knows but your father was Emperor of China, and your mother an Indian queen, each of them able to buy up, with one week's income, Wuthering Heights and Thrushcross Grange together? And you were kidnapped by wicked sailors and brought to England. Were I in your place, I would frame high notions of my birth; and the thoughts of what I was should give me courage and dignity to support the oppressions of a little farmer!",
          ja: "ひょっとしたら、お父さんは中国の皇帝で、お母さんはインドの女王さまかもしれないじゃない。どちらも、たった1週間の収入で、嵐が丘もスラッシュクロス屋敷もまとめて買い取れるくらいのね。そしてあなたは悪い船乗りにさらわれて、イギリスに連れてこられたのよ。わたしがあなたの立場なら、自分の生まれをうんと誇り高く思うわ。自分が本当は何者かを思えば、ちっぽけな農場主のいじめくらい、胸を張ってたえられるはずよ！",
          cite: "Emily Brontë, Wuthering Heights, Chapter VII (1847)",
          source: "https://www.gutenberg.org/ebooks/768",
        },
      ],
      photos: [
        {
          src: `${C}/wuthering-title.webp`, width: 800, height: 1368,
          alt: "古い紙に WUTHERING HEIGHTS A NOVEL BY ELLIS BELL, LONDON 1847 と印刷された本の扉",
          caption: "『嵐が丘』初版第1巻の扉（ロンドン、1847年）。作者名は筆名の「エリス・ベル」。本名のエミリー・ブロンテが知られたのは、彼女の死後だった。",
          credit: { author: "Emily Brontë (under the pseudonym Ellis Bell)", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Houghton_Lowell_1238.5_(A)_-_Wuthering_Heights,_1847.jpg" },
        },
      ],
      figure: {
        type: "formula",
        title: "if を省いて倒置する",
        prose: true,
        steps: [
          { expr: "{{If I had}} known, I would have helped you.", note: "仮定法過去完了" },
          { expr: "{{Had I}} known, I would have helped you.", note: "if を消し、had を主語の前へ" },
          { expr: "{{Were I}} you, I would wait.", note: "were・should でも同じように倒置できる" },
        ],
      },
      cliff: "キーツの手紙の書き出し If I should die の should には、まだ別の顔があります。",
    },
    {
      heading: "should・were to の仮定と、仮定法のやわらかさ",
      body: "未来について「万一〜なら」と言うときは{{If S should＋原形}}、「仮に〜するとしたら」と思いきった想像を言うときは{{If S were to＋原形}}を使います。It's time you went home. の{{It's time＋過去形}}や、Would you 〜? の{{ていねいな依頼}}も、過去形がもつ「距離」から生まれた言い方です。",
      reading: [
        "{{If S should＋原形}}は「万一〜なら」と、起こる見こみが低いと話し手が思っている未来を表します。If you should need help, call me.（万一助けが要ったら電話して）のように、主節に命令文や will が来てもかまいません。キーツの If I should die も、この形です。死は起こりうるけれど、考えたくはない。should がその心の距離を表しています。だから続く I have left no immortal work behind me は、仮定法ではなく現在完了の「現実」として語られます。",
        "{{If S were to＋原形}}は「仮に〜するとしたら」と、実現しそうにないことから、ありえないことまで仮定できます。If the sun were to rise in the west, I would not change my mind.（たとえ太陽が西から昇っても、私は考えを変えない）。It's time you went to bed.（もう寝る時間だよ）の It's time＋過去形は、「本当はもうしているはずなのに、まだしていない」という現実とのずれを過去形で表しています。",
        "過去形の距離は、人と人の距離にもなります。Will you open the window? より Would you open the window? のほうがていねいなのは、願いを現実から一歩引いて差し出すからです。I was wondering if you could help me.（手伝っていただけないかと思いまして）は、さらに遠慮した頼み方です。仮定法とは、現実からの距離を時制で測る文法です。ヒースクリフのくやしさ、キーツの願いと後悔、ネリーのはげまし。名作の人物たちは、この距離を使って、言葉にしにくい気持ちを伝えてきたのです。",
      ],
      figure: {
        type: "compare",
        title: "過去形の「距離」から生まれた言い方",
        columns: [{ title: "形", tone: "navy" }, { title: "意味", tone: "yellow" }, { title: "例" }],
        rows: [
          { cells: ["If S {{should}}＋原形", "万一〜なら", "If you should need help, call me."] },
          { cells: ["If S {{were to}}＋原形", "仮に〜するとしたら", "If the sun were to rise in the west, …"] },
          { cells: ["It's time S＋{{過去形}}", "もう〜してよいころ", "It's time you went to bed."] },
          { cells: ["{{Would}} you 〜?", "ていねいな依頼", "Would you open the window?"] },
        ],
        note: "should の文は主節に命令文や will も来る。were to は実現しそうにない想像に使う。",
      },
    },
  ],
  story: {
    kind: "novel",
    title: "荒野の少年と、エリス・ベルの本",
    paragraphs: [
      "1848年の春、ヨークシャーの荒野。十五歳の羊飼いウィルは、向かい風に背を丸めて丘を下り、村の学校の戸をたたいた。若いハートリー先生が、ロンドンから取り寄せた三冊組の本を差し出した。扉には Wuthering Heights、作者はエリス・ベル。「だれなんです、この人」「それがね、だれも知らないの。男か女かさえ」",
      "夜、ろうそく一本の光で、ウィルはページをめくった。拾われてきた少年ヒースクリフが、主人の息子にいじめられ、隣のお屋敷の色白の少年と比べられる。ウィルは、ひび割れた自分の手を見た。そしてある一文で指が止まった。I wish I had light hair and a fair skin……。ぼくのことだ、と思った。けれど少し前の if I knocked him down で首をかしげた。過去形だ。ヒースクリフは、いつなぐったのだろう。",
      "翌朝、先生は黒板にその文を書いた。「なぐってはいないのよ。もし二十回なぐったとしても、という想像。英語の過去形はね、時間だけじゃなく、{{現実から一歩はなれた場所}}も指すの」。「じゃあ I wish I had light hair も……」「金髪じゃないから had。{{仮定法}}よ」。ウィルは少し考えてから言った。「ぼくなら、I wish I had a horse」。先生は声をあげて笑った。",
      "先生は別のページを開いた。家政婦のネリーが、少年をはげます場面だ。Were I in your place, I would frame high notions of my birth。「if を消して、were を前に出した形。{{倒置}}というの。背すじののびた、書きことばの言い方ね」。「生まれを誇りに思え、ってことですか」「ええ。だれの子かなんて関係なく」。ウィルは口の中で、Were I in your place、とくり返した。",
      "帰り道、ヒースの茶色い斜面を風がわたっていた。遠くの尾根を、背の高い女の人が大きな犬を連れて歩いていくのが見えた。顔までは分からない。ウィルは立ち止まり、その姿が石垣の向こうに消えるまで見送った。",
      "本の中の少年は、想像の中でしか王子になれなかった。けれど、自分はどうだろう。ウィルは羊の群れのほうへ歩きながら、まだ形にならない「もし」を、胸の中で過去形にしてみた。それは、いつか現在形にしたい願いのように思えた。",
    ],
    sayFix: { "嵐が丘": "あらしがおか", "三冊組": "さんさつぐみ", "尾根": "おね" },
    note: "ウィル、ハートリー先生と学校の場面、会話や心情は創作です。『嵐が丘』が1847年に「エリス・ベル」の筆名で、妹アンの『アグネス・グレイ』とあわせた3巻本として出版され、作者の正体が当時知られていなかったこと、エミリー・ブロンテがハワースの荒野を大きな飼い犬と歩くのを好んだことは事実で、作中の英文は原作の第7章にもとづいています。尾根を歩く女性がだれかは書いていません。",
  },
  mistakes: [
    { wrong: "If I am you, I would wait.", right: "If I were you, I would wait.", why: "今の事実とちがう仮定なので、if 節は過去形。be動詞は were を使います。" },
    { wrong: "「あのとき知っていたら手伝ったのに」を If I had known, I would help you. とする", right: "If I had known, I would have helped you.", why: "主節も過去の話なので would have ＋過去分詞です。would help だと「（今）手伝うのに」になります。" },
    { wrong: "I wish I can swim.", right: "I wish I could swim.", why: "I wish のあとは仮定法。今の願望は can を過去形 could にします。" },
    { wrong: "if I had had time の had had を誤植だと思って had にする", right: "if I had had time（時間があったなら）", why: "have（持つ）の過去完了は had had。過去の事実の反対なので、仮定法過去完了で had が2つ並びます。" },
  ],
  check: [
    { q: "If I ___ (have) a car, I would drive you home.", a: "had", why: "今の事実（車がない）の反対なので仮定法過去。" },
    { q: "If you had left earlier, you ___ (catch) the train.", a: "would have caught", why: "if 節が had ＋過去分詞で過去の仮定。主節は would have ＋過去分詞。" },
    { q: "If it were not for water, ... を、if を使わず前置詞で始まる2通りの言い方に。", a: "Without water / But for water（Were it not for water も可）", why: "「〜がなければ」は Without・But for で言いかえられる。" },
  ],
  next: [
    { label: "4択ドリル「仮定法」に挑戦", href: "/learn/eibunpo-ko/h-eng-gram-kateiho" },
    { label: "ふりかえり「完了形」", href: "/learn/eibunpo-ko/h-eng-gram-kanryo" },
    { label: "関連「助動詞」（would・could・might）", href: "/learn/eibunpo-ko/h-eng-gram-jodoshi" },
  ],
};
