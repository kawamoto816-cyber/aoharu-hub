import type { Lecture } from "../types";

const C = "/media/commons/h-eng-vocab-hatsuon";

export const H_ENG_VOCAB_HATSUON: Lecture = {
  unit: "h-eng-vocab-hatsuon",
  title: "つづりと音はずれる。アクセントは「語の終わり」と「品詞」で決まることが多い",
  hook: "hotel をカタカナの「ホテル」のつもりで頭を強く言うと、英語では通じにくいことがあります。英語のアクセントは ho-TEL と後ろです。発音・アクセントは、まとめて覚えるための「きまり」があります。きまりを知ると、テストの問題だけでなく、リスニングで音を聞き取る力にもつながります。",
  mystery: "劇作家バーナード・ショーは、英語はつづりがひどすぎて、だれも独学では音がわからない、と書きました。それなのに英語を話す人は、初めて見る長い単語でも、どこを強く読むかをたいてい言い当てます。つづりがあてにならない言語で、なぜアクセントだけは見当がつくのでしょう？",
  mission: {
    from: "高校演劇部の顧問の先生",
    request: "文化祭で、ショーの英語劇『ピグマリオン』の一場面を原語で上演することになりました。ところが部員たちは、せりふのつづりを見ても読み方がわからず、強く読む場所もばらばらです。辞書を引きつくす時間はありません。つづりがあてにならない英語で、アクセントを見ぬく手がかりを、名探偵のあなたに見つけてほしいのです。",
    thanks: "母音のつづりは歴史の中で音とずれてしまったけれど、アクセントは語の終わりの形と品詞に結びついていた。部員には、まず語尾と文の中の働きを見るように伝えます。せりふが、ぐっと英語らしく聞こえるはずです。",
  },
  sections: [
    {
      heading: "同じつづりでも、音はいくつかに分かれる",
      body: "英語は{{つづりと発音が1対1ではない}}言語です。同じ ea でも、meat は /iː/、head は /e/、great は /eɪ/ と読みます。よく出る読み方を基本として覚え、{{例外になる語}}を少数だけ別にしておくのが効率的です。",
      reading: [
        "1913年にウィーンで初演され、翌1914年にロンドンで大評判をとった戯曲があります。アイルランド出身の劇作家{{バーナード・ショー}}（1856〜1950年）の『{{ピグマリオン}}』です。ロンドンの街角で花を売る娘イライザ・ドゥーリトルの話し方を、音声学者のヒギンズ教授が鍛えなおし、上流の令嬢として通用させようとする物語。題名は、自分が彫った像に恋をしたギリシャ神話の彫刻家の名から取られています。ショーはこの劇の序文で、英語について下のような痛烈な言葉を書きました。",
        "つづりと音のずれには、歴史の理由があります。1476年ごろ、ウィリアム・{{キャクストン}}がイングランドで初めて活版印刷を始め、本が大量に刷られるようになると、つづりはしだいに固まっていきました。ところがちょうど同じころ、15〜17世紀にかけて、英語の長い母音の音そのものが大きく移り変わります。これを{{大母音推移}}といいます。time はかつて「ティーム」、name は「ナーメ」に近く読まれていたと考えられています。つづりは昔の音の記録のまま止まり、音だけが先へ進んだ。これが、英語の{{つづりと発音が1対1ではない}}いちばん大きな理由です。",
        "ea の読み分けも、この歴史の名残です。meat の ea と meet の ee は、もとは別の音でしたが、のちに多くの語で同じ /iː/ に合流しました。合流せずに別の道をたどったのが great・break・steak で、head・bread のように早くに母音が短くなった語は /e/ になりました。「基本の読み＋少数の{{例外になる語}}」という覚え方は、歴史の地層をそのままなぞる、理にかなった方法なのです。ショーはつづりの改革を本気で考え、遺言で新しいアルファベットづくりのための財産を残しました。その遺志から、のちに「ショー・アルファベット」と呼ばれる文字が生まれています。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "The English have no respect for their language, and will not teach their children to speak it. They spell it so abominably that no man can teach himself what it sounds like. It is impossible for an Englishman to open his mouth without making some other Englishman hate or despise him. German and Spanish are accessible to foreigners: English is not accessible even to Englishmen.",
        ja: "イギリス人は自分たちの言語を少しも大切にせず、子どもに話し方を教えようともしない。つづりがあまりにひどいので、どんな人も、それがどんな音なのかを独学では知ることができない。イギリス人が口を開けば、かならず別のイギリス人に憎まれるか、さげすまれる。ドイツ語やスペイン語は外国人にも近づきやすい。だが英語は、イギリス人にさえ近づきにくいのだ。",
        cite: "Bernard Shaw, Pygmalion, Preface (1916)",
        source: "https://www.gutenberg.org/cache/epub/3825/pg3825.txt",
      }],
      figure: {
        type: "compare",
        title: "つづりと発音のずれ",
        columns: [{ title: "つづり" }, { title: "発音", tone: "yellow" }, { title: "例" }],
        rows: [
          { cells: ["ea", "/iː/（基本）", "meat, dream, teach"] },
          { cells: ["ea", "/e/", "head, bread, weather"] },
          { cells: ["ea", "/eɪ/（少数）", "great, break, steak"] },
          { cells: ["ow", "/aʊ/", "cow, town, flower"] },
          { cells: ["ow", "/oʊ/", "snow, know, window"] },
        ],
        note: "/oʊ/ はイギリス式の辞書では /əʊ/ と書くこともある。",
      },
      photos: [
        {
          src: `${C}/shaw-vf.webp`, width: 366, height: 600,
          alt: "つば広の帽子に赤いひげ、オレンジの格子もようの長いコートを着た男性の戯画",
          caption: "{{バーナード・ショー}}の戯画（イギリスの雑誌『ヴァニティ・フェア』1911年）。『ピグマリオン』を書く少し前の姿。つづりの改革を説き続けた。",
          credit: { author: "Ritchie（Alick P. F. Ritchie）", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:George_Bernard_Shaw,_Vanity_Fair,_1911-08-16a.jpg" },
        },
        {
          src: `${C}/caxton.webp`, width: 800, height: 483,
          alt: "木の印刷機のハンドルを引く職人の横で、黒い服の男が刷った紙を王と王妃たちに見せている版画",
          caption: "{{キャクストン}}が国王エドワード4世夫妻に刷り物を見せる場面（1877年の版画、想像図）。印刷でつづりが固まったあと、母音の音だけが動いた。",
          credit: { author: "William Small", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:The_Caxton_Celebration_-_William_Caxton_showing_specimens_of_his_printing_to_King_Edward_IV_and_his_Queen.jpg" },
        },
      ],
      cliff: "つづりがあてにならないなら、音は何で決まるのか。ヒギンズ教授は、のどに答えを見ます。",
    },
    {
      heading: "-ed の発音は、直前の音で3つに分かれる",
      body: "過去形の -ed は、いつも「イド」と読むわけではありません。直前が {{/t/・/d/}} なら /ɪd/、直前が /k/・/p/・/s/・/ʃ/ などの{{のどがふるえない音（無声音）}}なら /t/、それ以外の{{のどがふるえる音（有声音）}}なら /d/ です。のどに手を当てて、直前の音を出してみるとわかります。",
      reading: [
        "劇の幕が開くのは、夜の雨のコヴェント・ガーデン（ロンドンの青物市場）。柱のかげで、一人の男が人々の話し方を手帳に書きとめています。イライザが「ちゃんとした字じゃない」と文句を言うと、男は書いたものを、彼女の発音そっくりに読みあげてみせます。どうやっているのかとたずねられた男の答えが、下のせりふです。この男こそヒギンズ教授。音を記号で正確に書きとり、しくみを調べる学問、{{音声学}}の専門家です。ショーは序文で、実在の音声学者{{ヘンリー・スウィート}}を「最高の腕前」とたたえ、ヒギンズはスウィートの肖像ではないが、劇には「スウィートの面影」がある、と書いています。",
        "音声学の目で見ると、-ed の3つの読み分けには、はっきりした理由があります。のどをふるわせる{{有声音}}と、ふるわせない{{無声音}}は、続けて発音するとき、となりの音にそろう性質があるのです。looked の k は無声音なので、続く -ed も無声の /t/ になり、played の母音は有声なので /d/ になります。1語の途中で、のどのスイッチをわざわざ切りかえないほうが、楽に言えるからです。",
        "では、なぜ /t/・/d/ のあとだけ /ɪd/ になるのでしょう。wanted を /t/ だけで言おうとすると、want の t と重なって、過去形かどうか聞き分けられません。そこで母音 /ɪ/ をはさみ、1音節ふやして区別します。昔の英語では -ed はいつも独立した音節で読まれ、シェイクスピアの時代の詩には、beloved を3音節で読ませる例が見られます。その後、多くの語でこの母音が落ち、聞き分けにどうしても必要な /t/・/d/ のあとにだけ残りました。3人称単数の -s が buses・watches で /ɪz/ になるのも、同じ理屈です。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "Simply phonetics. The science of speech. That's my profession; also my hobby. Happy is the man who can make a living by his hobby! You can spot an Irishman or a Yorkshireman by his brogue. I can place any man within six miles. I can place him within two miles in London. Sometimes within two streets.",
        ja: "ただの音声学ですよ。話しことばの科学です。それがわたしの職業で、趣味でもある。趣味で食べていける男は幸せ者だ！　アイルランド人やヨークシャー人なら、なまりですぐ見分けがつくでしょう。わたしなら、だれでも出身地を6マイル以内まで言い当てられる。ロンドンなら2マイル以内。ときには、通り2本以内までね。",
        cite: "Bernard Shaw, Pygmalion, Act I (1913)",
        source: "https://www.gutenberg.org/cache/epub/3825/pg3825.txt",
      }],
      figure: {
        type: "tree",
        title: "-ed の読み方を決める",
        root: {
          label: "-ed の直前の音",
          children: [
            { label: "/t/・/d/", sub: "wanted, needed", children: [{ label: "/ɪd/", tone: "red" }] },
            { label: "無声音", sub: "looked, washed", children: [{ label: "/t/", tone: "blue" }] },
            { label: "有声音", sub: "played, called", children: [{ label: "/d/", tone: "yellow" }] },
          ],
        },
        note: "3人称単数の -s も同じ考え方：無声音の後は /s/、有声音の後は /z/、/s/ /z/ /ʃ/ などの後は /ɪz/。",
      },
      photos: [
        {
          src: `${C}/campbell-eliza.webp`, width: 394, height: 670,
          alt: "花かごを腕にかけ、すり切れたショールをまとって立つ女性の舞台写真がのった雑誌のページ",
          caption: "イライザを演じるパトリック・キャンベル夫人（ロンドン初演、雑誌『スケッチ』1914年4月22日号）。ショーはこの役を彼女のために書いた。",
          credit: { author: "Sketch Magazine", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Mrs._Patrick_Campbell_as_Eliza_Doolittle_1914.jpg" },
        },
        {
          src: `${C}/sweet.webp`, width: 800, height: 887,
          alt: "鼻めがねをかけ、口ひげをたくわえた背広の男性の白黒写真",
          caption: "{{ヘンリー・スウィート}}（1845〜1912年）。音を記号で正確に書きとる{{音声学}}を開いたイギリスの学者。ショーは劇に「彼の面影がある」と書いた。",
          credit: { author: "作者不明", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Sweet_Henry.jpg" },
        },
      ],
      cliff: "音の出し方が分かったら、次はどこを強く読むか。手がかりは、語のしっぽにあります。",
    },
    {
      heading: "語の終わり（接尾辞）がアクセントの位置を決める",
      body: "-tion・-sion・-ic・-ity などで終わる語は、{{その直前の音節}}にアクセントが来ます。そのため、もとの語に接尾辞がつくと{{アクセントが移る}}ことがあります。-ese・-ee などは、その部分そのものが強く読まれます（Japa-NESE、employ-EE）。",
      reading: [
        "英語の単語は、大きく2つの層でできています。father・water・happy のような古くからの英語（ゲルマン系）の語は、ふつう最初の音節を強く読みます。一方、中世以降にフランス語やラテン語から入ってきた語は、語の終わりの形がアクセントを決めることが多いのです。-tion・-sion・-ic・-ity で終わる語は{{その直前の音節}}が強く、-ese・-ee は語尾そのものが強い。hotel（ho-TEL）が後ろを強く読むのも、フランス語から入った語だからです。",
        "ヒギンズ教授は、イライザのなげき声に腹を立て、下のように言い放ちます。並んだ語でアクセントを確かめてみましょう。articulate は ar-TIC-u-late で、-ate で終わる長い語は後ろから3つ目の音節が強くなる型です。divine は di-VINE、language は LAN-guage。なお、ショーはここで Shakespeare を Shakespear とつづっています。つづりの改革を唱えたショーらしい、独自の書き方です。",
        "接尾辞がつくと、同じ仲間の語でも強い場所が動きます。PHO-to-graph（写真）→ pho-TOG-ra-pher（写真家）→ pho-to-GRAPH-ic（写真の）。動詞 pro-NOUNCE（発音する）も、名詞になると pro-nun-ci-A-tion で、-tion の直前が強くなります。強い音節からはずれた母音は、力のぬけたあいまいな /ə/ になりがちです。母語話者は、母音が少しずれても聞き取ってくれますが、強く読む場所がずれると別の語のように聞こえてしまいます。アクセントは、英語の発音でまっさきに合わせるべき場所なのです。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "Remember that you are a human being with a soul and the divine gift of articulate speech: that your native language is the language of Shakespear and Milton and The Bible; and don't sit there crooning like a bilious pigeon.",
        ja: "忘れるな、きみは魂をもち、はっきりと言葉を話すという神から授かった力をもつ人間なのだ。きみの母語は、シェイクスピアとミルトンと聖書のことばなのだ。そんなところにすわりこんで、おなかをこわしたハトみたいにクークー鳴くんじゃない。",
        cite: "Bernard Shaw, Pygmalion, Act I (1913)",
        source: "https://www.gutenberg.org/cache/epub/3825/pg3825.txt",
      }],
      figure: {
        type: "formula",
        title: "接尾辞でアクセントが動く（大文字が強い音節）",
        prose: true,
        steps: [
          { label: "-tion", expr: "ED-u-cate → ed-u-{{CA}}-tion", note: "-tion の直前が強い" },
          { label: "-ic", expr: "e-CON-o-my → ec-o-{{NOM}}-ic", note: "-ic の直前が強い" },
          { label: "-ity", expr: "POS-si-ble → pos-si-{{BIL}}-i-ty", note: "-ity の直前が強い" },
          { label: "-ese", expr: "Ja-PAN → Jap-a-{{NESE}}", note: "-ese そのものが強い" },
        ],
      },
      cliff: "同じつづりなのに、文の中の働きでアクセントが入れかわる語もあります。教授の研究室にその見本が。",
    },
    {
      heading: "名詞は前、動詞は後ろ（名前動後）",
      body: "同じつづりで名詞と動詞の両方に使う2音節の語には、{{名詞は前・動詞は後ろ}}にアクセントを置くものが多くあります。これを{{名前動後}}といいます。すべての語に当てはまるわけではない（answer, visit などは品詞が変わっても前）ので、代表的な語で覚えましょう。",
      reading: [
        "第2幕、ヒギンズ教授の研究室の舞台指定には、音叉や小さなオルガンのパイプとならんで、{{蓄音機}}（phonograph）と、録音用の蝋管の箱が置かれています。エジソンが音を記録して再生できる蓄音機を発明したのは1877年。話しことばを「記録」して何度も聞き返せるようになったのは、この劇のわずか30数年前のことでした。英語の record は、この研究室で2つの顔を見せます。「録音する」は動詞なので re-CORD、「録音したもの・記録」は名詞なので REC-ord です。",
        "このように、同じつづりの2音節語で{{名詞は前・動詞は後ろ}}を強く読む型を{{名前動後}}といいます。present（PRES-ent 贈り物／pre-SENT 贈る）、object（OB-ject 物／ob-JECT 反対する）、protest（PRO-test 抗議／pro-TEST 抗議する）など、例はたくさんあります。名詞は英語に古くからある「前を強く」の型に引きよせられ、動詞はラテン語・フランス語から入ったときの後ろの強さを残した、と説明されることがあります。形容詞の perfect（PER-fect 完ぺきな）と動詞の perfect（per-FECT 仕上げる）も同じ型です。",
        "名前動後を使いこなすには、まず文の中での{{品詞}}を見ぬくことです。Prices will increase. なら will のあとなので動詞、a sharp increase なら冠詞と形容詞のあとなので名詞。つまり英語のアクセントは、つづりの母音ではなく、語尾の形と文の中の働きという「形」に結びついているのです。ただし answer・visit・promise のように品詞が変わっても前を強く読む語もあるので、代表的な語は辞書で確かめておきましょう。",
      ],
      figure: {
        type: "compare",
        title: "名前動後の代表例",
        columns: [{ title: "語" }, { title: "名詞（前）", tone: "blue" }, { title: "動詞（後ろ）", tone: "yellow" }],
        rows: [
          { cells: ["record", "REC-ord 記録", "re-CORD 記録する"] },
          { cells: ["present", "PRES-ent 贈り物", "pre-SENT 贈る"] },
          { cells: ["increase", "IN-crease 増加", "in-CREASE 増える"] },
          { cells: ["export", "EX-port 輸出", "ex-PORT 輸出する"] },
        ],
      },
      photos: [
        {
          src: `${C}/phonograph.webp`, width: 552, height: 540,
          alt: "木の箱の上に金色の大きならっぱと、茶色の円筒をはめる機械がついた古い蓄音機",
          caption: "エジソン式の家庭用{{蓄音機}}。茶色の蝋管に音を刻んで録音・再生した。ヒギンズの研究室にも蓄音機と蝋管が置かれている。",
          credit: { author: "Norman Bruderhofer", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0", source: "https://commons.wikimedia.org/wiki/File:EdisonPhonograph.jpg" },
        },
      ],
      reveal: "英語の母音のつづりは、印刷で形が固まったあとに{{大母音推移}}で音が動いたため、あてにならなくなりました。けれどアクセントは、-tion・-ic・-ity などの{{語の終わりの形}}と、名詞か動詞かという{{品詞}}に結びついています。だから初めて見る長い単語でも、語尾を見れば強く読む場所の見当がつき、文の中の働きを見れば record や present の強さも決まるのです。",
    },
  ],
  story: {
    kind: "manga4",
    title: "ヒギンズ教授、録音する",
    panels: [
      {
        scene: "演劇部の練習。ヒギンズ役のソウタが蓄音機の小道具を前に胸をはる。札に「REC-ord」。",
        lines: [
          { who: "ソウタ", text: "わしはヒギンズ教授だ" },
          { who: "ソウタ", text: "君の声をREC-ordする！" },
          { who: "ミオ", text: "あれ、前が強い？" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ソウタ", look: "boy", x: 256, face: "shout", fx: "!", hand: [214, 226] },
            { who: "ミオ", look: "girl", x: 84, face: "think", fx: "?" },
          ],
          props: [
            { kind: "table", x: 0, y: 244 },
            { kind: "board", x: 150, y: 238, text: "REC-ord" },
          ],
        },
      },
      {
        scene: "イライザ役のミオが台本を指さす。札に「re-CORD」。",
        lines: [
          { who: "ミオ", text: "録音する、は動詞よ" },
          { who: "ミオ", text: "動詞は後ろでre-CORD" },
          { who: "ソウタ", text: "教授、いきなり減点…" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ミオ", look: "girl", x: 256, face: "smile", hand: [212, 228] },
            { who: "ソウタ", look: "boy", x: 84, face: "sweat", fx: "sweat" },
          ],
          props: [
            { kind: "table", x: 0, y: 244 },
            { kind: "book", x: 196, y: 228, s: 0.85 },
            { kind: "board", x: 120, y: 238, text: "re-CORD" },
          ],
        },
      },
      {
        scene: "顧問の先生が来て問題を出す。ソウタが札をひっくり返す。",
        lines: [
          { who: "先生", text: "では録音したものは？" },
          { who: "ソウタ", text: "名詞だからREC-ord！" },
          { who: "先生", text: "{{名前動後}}、正解！" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "先生", look: "teacher", x: 250, face: "smile", hand: [200, 226] },
            { who: "ソウタ", look: "boy", x: 86, face: "surprise", fx: "idea" },
          ],
          props: [
            { kind: "table", x: 0, y: 244 },
            { kind: "board", x: 160, y: 238, text: "REC-ord" },
          ],
        },
      },
      {
        scene: "ソウタが「PRES-ent」の札をミオに差し出す。ミオはあきれ顔。",
        lines: [
          { who: "ソウタ", text: "お礼にこのPRES-entを" },
          { who: "ソウタ", text: "君にpre-SENTする！" },
          { who: "ミオ", text: "名詞は前、動詞は後ろ！" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ソウタ", look: "boy", x: 256, face: "smile", fx: "!", hand: [214, 220] },
            { who: "ミオ", look: "girl", x: 84, face: "sweat", fx: "sweat" },
          ],
          props: [
            { kind: "table", x: 0, y: 244 },
            { kind: "board", x: 150, y: 238, text: "PRES-ent" },
          ],
        },
      },
    ],
    note: "ソウタ・ミオ・先生は架空の人物で、会話はすべて創作です。『ピグマリオン』のヒギンズ教授が音声学者で、第2幕の研究室に蓄音機が置かれていることは原作の戯曲どおりです。",
  },
  mistakes: [
    { wrong: "looked を「ルックイド」と読む", right: "/lʊkt/（ルックト）", why: "-ed の直前の /k/ は無声音なので、-ed は /t/ と読みます。/ɪd/ になるのは直前が /t/・/d/ のときだけです。" },
    { wrong: "event を EV-ent と前を強く読む", right: "e-VENT", why: "カタカナの「イベント」につられやすい語です。hotel（ho-TEL）や guitar（gui-TAR）も同じタイプです。" },
    { wrong: "名詞の record も re-CORD と読む", right: "名詞は REC-ord", why: "名前動後の語は、名詞なら前、動詞なら後ろにアクセントを置きます。" },
  ],
  check: [
    { q: "needed の -ed の発音は？", a: "/ɪd/", why: "直前が /d/ なので /ɪd/。" },
    { q: "economic で最も強く読む音節は？", a: "nom（ec-o-NOM-ic）", why: "-ic で終わる語は、その直前の音節にアクセントが来る。" },
    { q: "Prices will increase. の increase のアクセントは前と後ろのどちら？", a: "後ろ（in-CREASE）", why: "ここでは動詞（増える）なので、名前動後の「動詞は後ろ」。" },
  ],
  next: [
    { label: "発音・アクセントをカードで覚える", href: "/learn/eigo-ko/h-eng-vocab-hatsuon" },
    { label: "耳で鍛える「リスニング」", href: "/learn/eigo-ko/h-eng-skill-listening" },
    { label: "ふりかえり「アルファベットと発音」（中1）", href: "/learn/eigo-chu/j-en-1-onsei" },
  ],
};
