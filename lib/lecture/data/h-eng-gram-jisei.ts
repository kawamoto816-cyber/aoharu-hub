import type { Lecture } from "../types";

const C = "/media/commons/h-eng-gram-jisei";

export const H_ENG_GRAM_JISEI: Lecture = {
  unit: "h-eng-gram-jisei",
  title: "時制は「いつのことか」を動詞の形で示す。現在形は「いつもそうだ」",
  hook: "「明日彼が来たら電話するね」を英語にすると、来るのは明日なのに I'll call you when he comes. と現在形を使います。日本語の「〜た・〜る」と英語の時制は、ぴったり重なりません。入試の時制問題はこの「ずれ」をつくものが多いので、時の線の上で形を整理しておきましょう。",
  mystery: "H・G・ウェルズの『タイム・マシン』で、主人公は未来へ向かう旅を Tomorrow night came black（明日の夜が黒くやってきた）と語ります。「明日」のことなのに、なぜ過去形の came なのでしょう？",
  mission: {
    from: "SF映画の字幕翻訳者",
    request: "来月、古典SFの特集上映で、時間旅行の映画の字幕を作ります。見習いの若者に「未来の話なのに過去形で語っている。字幕は『明日の夜が来る』に直すべきでは？」と聞かれ、うまく答えられませんでした。時間を行き来する物語の字幕を正しく作るために、名探偵のあなたに英語の時制のしくみを解き明かしてほしいのです。",
    thanks: "時制の基準は、世界の暦ではなく「話している今」だったのですね。旅から帰った人が語るなら、80万年後の世界も過去形。字幕も「明日の夜が来た」のまま、自信をもって出せます。",
  },
  sections: [
    {
      heading: "時制は「今」を基準に、動詞の形で時を示す",
      body: "英語では、できごとが{{今より前か・今か・今より後か}}を動詞の形で示します。過去は played のような過去形、未来は will play や be going to play で表します。日本語は「昨日行く予定だった」のように言い方がゆれますが、英語は{{動詞の形がそのまま時を決める}}と考えると整理できます。",
      reading: [
        "{{時制}}とは、動詞の形を変えることで「そのできごとはいつのことか」を示すしくみです。英語の動詞は、play・plays（現在形）と played（過去形）のように、形そのものが時を背負っています。未来には専用の語尾がないので、will や be going to といった助けを借ります。大事なのは、ここでいう「現在・過去・未来」が、カレンダーの日付ではなく、{{話している今}}を基準にした「前か後か」だということです。",
        "日本語の「た」は、英語の過去形とぴったりは重なりません。「明日、駅に着いたら電話して」の「着いた」は未来のことですし、「あ、ここにあった！」の「あった」は今のことです。日本語の「た」は「終わった・気づいた」という感じを表すことも多いのです。一方、英語の過去形は「今よりも前」というものさしで、かなり機械的に決まります。日本語の感覚で「た」→過去形と置きかえると、ずれが生まれます。",
        "この「今」という基準に、真正面から挑んだ小説があります。1895年、28歳のH・G・ウェルズがロンドンで出した『{{タイム・マシン}}』です。名前の明かされない主人公「時間旅行者」が、自作の機械で80万年以上も先の未来へ旅をします。ウェルズは若いころ、奨学金を得て科学の学校で生物学を学び、教師や科学記者として暮らしを立てていました。科学の考え方で時間そのものを物語にしたこの作品は大評判となり、「タイム・マシン」という言葉はその後、世界中に広まりました。",
      ],
      photos: [
        {
          src: `${C}/wells.webp`, width: 573, height: 800,
          alt: "口ひげをたくわえ、背広にネクタイ姿で正面を見る中年の男性の白黒の肖像写真",
          caption: "H・G・ウェルズ（1866〜1946年）。G・C・ベレスフォードが撮影した肖像写真。28歳で出した『{{タイム・マシン}}』で、時間を旅する物語を広めた。",
          credit: { author: "George Charles Beresford", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:H.G._Wells_by_Beresford.jpg" },
        },
      ],
      figure: {
        type: "numberline",
        title: "0 が「今」。左が過去、右が未来",
        min: -3,
        max: 3,
        points: [
          { x: -2, label: "played", tone: "blue" },
          { x: 0, label: "play(s)", tone: "yellow" },
          { x: 2, label: "will play", tone: "red" },
        ],
        desc: "−3から3の数直線。0を今として、−2に過去形 played、0に現在形 play(s)、2に未来 will play を置いた図。",
        note: "目もりの数字は「今からどれだけ前・後か」の目安。",
      },
      cliff: "では、まん中の「今」にある現在形は、本当に「今この瞬間」のことなのでしょうか？",
    },
    {
      heading: "現在形は「今この瞬間」ではなく「いつも」",
      body: "現在形が表すのは、{{習慣}}・{{変わらない事実}}・{{時刻表で決まった予定}}です。He plays tennis. は「（ふだん）テニスをする」で、今まさにしている最中なら He is playing tennis. と{{進行形}}にします。また know, like, belong, resemble のような{{状態動詞}}は、もともと「続いている状態」を表すので、ふつう進行形にしません。",
      reading: [
        "名前に反して、{{現在形}}は「今この瞬間」をあまり表しません。I walk to school. は「（いつも）歩いて通っている」という{{習慣}}で、昨日も明日もふくむ、幅のある「今」です。今まさに歩いている最中なら I'm walking to school. と進行形にします。現在形は、時の線の上で「今」をはさんで左右にのびる、長い帯のようなものだと考えるとわかりやすいでしょう。",
        "帯がいちばん長くなるのが、{{変わらない事実}}や真理です。『タイム・マシン』の第1章で、時間旅行者は客たちを前に、時間とは何かを説きます。下の一節の are や moves は、話している夜だけでなく、いつでも成り立つと彼が考える法則を述べるための現在形です。地の文は過去形で進むのに、彼の理屈だけは現在形。この切りかえが、「これは物語の中の一場面ではなく、世界のしくみの話だ」という迫力を生んでいます。",
        "現在形はさらに、{{時刻表で決まった予定}}にも使います。The train leaves at nine tomorrow. は明日のことですが、時刻表は「いつもそう決まっている」ものなので現在形です。一方、know・like・belong・resemble のような{{状態動詞}}は、意味そのものがすでに「続いている」ので、ふつう進行形にしません。I know him. を I am knowing him. とは言わないのです。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "There are really four dimensions, three which we call the three planes of Space, and a fourth, Time. There is, however, a tendency to draw an unreal distinction between the former three dimensions and the latter, because it happens that our consciousness moves intermittently in one direction along the latter from the beginning to the end of our lives.",
        ja: "次元は、じつは四つあるのです。三つは、わたしたちが空間の三つの平面とよぶもの。そして四つめが、時間です。ところが人は、はじめの三つの次元と最後の一つとのあいだに、ありもしない区別をつけたがります。それは、わたしたちの意識が、生まれてから死ぬまで、時間の軸にそって、とぎれとぎれに一つの向きへだけ進んでいくからなのです。",
        cite: "H. G. Wells, The Time Machine, Chapter I (1895)",
        source: "https://www.gutenberg.org/ebooks/35",
      }],
      photos: [
        {
          src: `${C}/greenwich-clock.webp`, width: 800, height: 1491,
          alt: "れんがの壁にはめこまれた、0から23までの目もりがある大きな白い文字盤の時計。下に長さの基準の金具が並ぶ",
          caption: "ロンドンのグリニッジ天文台の門の24時間時計（1852年設置）。ここで決めた時刻が鉄道の{{時刻表}}の基準になった。「何時に出る」は今も現在形で言う。",
          credit: { author: "Alvesgaspar", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0", source: "https://commons.wikimedia.org/wiki/File:Greenwich_clock.jpg" },
        },
      ],
      figure: {
        type: "compare",
        title: "現在形と現在進行形のくらべ",
        columns: [{ title: "現在形", tone: "blue" }, { title: "現在進行形", tone: "yellow" }],
        rows: [
          { label: "表すこと", cells: ["習慣・事実・時刻表", "今まさに進行中の動作"] },
          { label: "例", cells: ["Water {{boils}} at 100°C.", "The water {{is boiling}}."] },
          { label: "状態動詞", cells: ["I {{know}} him.", "✕ I am knowing him."] },
        ],
      },
      cliff: "未来のことなのに、will をつけると逆にまちがいになる場所があります。",
    },
    {
      heading: "時・条件の副詞節では、未来のことも現在形",
      body: "when, if, until, as soon as, before などが作る{{時・条件の副詞節}}の中では、未来のことでも{{現在形}}を使います。「彼が来る」ことは未来でも、when he comes とします。ただし know if 〜（〜かどうか知っている）のように、節が動詞の目的語になる{{名詞節}}なら、未来のことは will を使います。",
      reading: [
        "『タイム・マシン』の客たちは、夕食の時刻になっても姿を見せない時間旅行者を待っていました。その気分を英語にすると、We will hear his story when he comes back.（彼が戻ってきたら、話を聞こう）。戻るのは未来なのに、when の中は comes と{{現在形}}です。if・until・as soon as・before・after などが作る{{時・条件の副詞節}}では、未来のことも現在形で表す、というきまりがあります。",
        "なぜでしょう。一つの考え方はこうです。この文で「未来の予定」を言っているのは主節の will hear のほうで、when 節は「彼が戻る」という場面を、すでに起こったものとして設定する役目をしています。「戻ったとしたら、その時点で」と場面を固めているので、そこにさらに will（〜だろう）という予測を重ねる必要がないのです。未来の気分は主節の will が一手に引き受けている、と考えると覚えやすくなります。",
        "ただし、同じ if や when でも、文の中で{{名詞節}}として働くときは別です。I don't know if he will come back.（彼が戻ってくるかどうか、わからない）の if 節は know の目的語で、「戻るだろうか」という予測そのものが話題です。だから will を使います。見分けるには、その節を取り去ってみます。残りの文が成り立てば副詞節、目的語がなくなって文が崩れれば名詞節です。",
      ],
      figure: {
        type: "formula",
        title: "「彼が来たら電話するね」を書く",
        prose: true,
        steps: [
          { expr: "I'll call you when he {{will come}}.", note: "✕ 副詞節の中で will を使っている" },
          { expr: "I'll call you when he {{comes}}.", note: "◯ 時の副詞節は現在形。主節は will のまま" },
          { expr: "I don't know if he {{will come}}.", note: "◯ know の目的語（名詞節）なら will を使う" },
        ],
        note: "見分け方：when・if 節を取り去っても文が成り立つなら副詞節。",
      },
      cliff: "未来を言う方法は、じつは will のほかにもいくつもあります。",
    },
    {
      heading: "未来の言い方は1つではない",
      body: "未来は will だけでなく、{{be going to}}（前から決めていた予定・兆候）や{{現在進行形}}（手配ずみの確定した予定）でも表します。I'm leaving for Osaka tomorrow. は、切符などがもう決まっている感じです。その場で決めたことは I'll answer it. のように will がふつうです。",
      reading: [
        "英語には未来の専用の形がないぶん、未来の言い方がいくつもあり、それぞれに気分のちがいがあります。電話が鳴って「ぼくが出る」と言うなら、その場で決めたので I'll answer it. と{{will}}。「来年留学するつもりだ」と前から決めていたなら I'm going to study abroad next year. と{{be going to}}。黒い雲を見て「雨になりそうだ」なら It's going to rain. で、今見えている兆候からの予測です。",
        "航空券も宿も手配ずみなら I'm leaving for London tomorrow. と{{現在進行形}}にします。予定がすでに動きはじめている感じが出るのです。時刻表どおりの予定は前の節で見たように現在形です。さらに、intend to や plan to のように「〜するつもりだ」という動詞を現在形で使っても、未来の意志を表せます。",
        "『タイム・マシン』の第2章で、時間旅行者は客たちを実験室に案内し、完成間近の機械を見せて、下の一節のように宣言します。I intend は「今そう決めている」という現在形で、内容は未来の冒険です。そのあとの I was never more serious in my life. は、「これまでの人生で、今以上に本気だったことは一度もない」という、過去形を使った強い言い方です。時制を自在に組み合わせると、決意の熱さまで伝わります。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "“Upon that machine,” said the Time Traveller, holding the lamp aloft, “I intend to explore time. Is that plain? I was never more serious in my life.”",
        ja: "「あの機械に乗って」と、時間旅行者はランプを高くかかげて言った。「わたしは時間を探検するつもりです。おわかりですか。生まれてこのかた、これほど本気だったことはありません」",
        cite: "H. G. Wells, The Time Machine, Chapter II (1895)",
        source: "https://www.gutenberg.org/ebooks/35",
      }],
      figure: {
        type: "compare",
        title: "未来を表す形",
        columns: [{ title: "形" }, { title: "ニュアンス", tone: "yellow" }],
        rows: [
          { cells: ["will ＋原形", "その場で決めた意志・予測"] },
          { cells: ["be going to ＋原形", "前からの予定・今の兆候"] },
          { cells: ["現在進行形", "手配ずみの確定した予定"] },
          { cells: ["現在形", "時刻表・行事の予定"] },
        ],
      },
      cliff: "では、未来へ旅した男は、その旅をどの時制で語ったのでしょう？",
    },
    {
      heading: "物語の時制は「語っている今」から決まる",
      body: "小説や体験談では、語り手が{{語っている今}}が基準になります。語り手にとってすでに終わったことなら、それが暦の上で未来のことでも{{過去形}}で語ります。時制は「世界の年表のどこか」ではなく、「話し手から見て前か後か」を表すしるしです。",
      reading: [
        "時間旅行者は、未来から戻った晩、客たちの前によろよろと姿を現します。服は汚れ、顔は青ざめていました。夕食をむさぼったあと、彼は I've had a most amazing time.（なんとも驚くべき時を過ごしてきたよ）と言い、旅の話を始めます。have had は{{現在完了}}で、「その体験は、話している今の自分にまでつながっている」という形です。ここから先の長い冒険は、すべて彼が「語る今」から振り返る話になります。",
        "そして下の一節が、機械が初めて全速力で走り出す場面です。夜が来て、明日が来て、明日の夜が来る。中身は彼が出発した日から見て未来のことばかりですが、動詞は pressed・came・grew と{{過去形}}がならびます。旅はすでに終わり、彼は暖炉の前でそれを思い出しながら話しているからです。基準の「今」は語り手の口もとにあり、そこから見れば80万年後の世界でさえ過去なのです。",
        "ふだんの英語でも同じことが起こります。帰国した人が I saw the future of the city.（その街の未来を見てきた）と言うとき、見たものは未来でも、見たという体験は過去です。逆に、物語の中の人物が語る未来の計画は、その人の「今」から見て未来なので will を使います。英文を読むときは、「この文の今は、だれのどの時点か」を確かめましょう。時制は、時計ではなく{{視点}}を表しているのです。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "I pressed the lever over to its extreme position. The night came like the turning out of a lamp, and in another moment came tomorrow. The laboratory grew faint and hazy, then fainter and ever fainter. Tomorrow night came black, then day again, night again, day again, faster and faster still.",
        ja: "わたしはレバーをいちばん奥まで押しこんだ。夜はランプを吹き消したようにやってきて、次の瞬間にはもう明日が来ていた。実験室はかすみ、ぼやけ、さらに薄く、どこまでも薄くなっていった。明日の夜が黒くやってきて、また昼、また夜、また昼と、それはどんどん速くなっていった。",
        cite: "H. G. Wells, The Time Machine, Chapter IV (1895)",
        source: "https://www.gutenberg.org/ebooks/35",
      }],
      photos: [
        {
          src: `${C}/title-page.webp`, width: 800, height: 1372,
          alt: "黄ばんだ紙に The Time Machine、An Invention、By H. G. Wells、London William Heinemann MDCCCXCV と印刷された本の扉",
          caption: "『タイム・マシン』初版の扉（ロンドン、ハイネマン社、1895年）。副題は「ある発明」。物語のほとんどは、旅から帰った主人公が{{語っている今}}から振り返る形で書かれている。",
          credit: { author: "Herbert George Wells", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:The_Time_Machine_(H._G._Wells,_William_Heinemann,_1895)_title_page.jpg" },
        },
      ],
      figure: {
        type: "numberline",
        title: "基準は「語っている今」。旅の中身は暦では未来でも、語り手には過去",
        min: -3,
        max: 3,
        points: [
          { x: -2, label: "出発・旅（came）", tone: "blue" },
          { x: 0, label: "帰って語る今", tone: "yellow" },
          { x: 2, label: "これからの予定（will）", tone: "red" },
        ],
        desc: "−3から3の数直線。0を語り手が語っている今とし、−2に未来への旅（過去形 came で語る）、2にこれからの予定（will）を置いた図。",
        note: "旅の行き先が80万年後でも、語る今より前に体験したことなので過去形になる。",
      },
      reveal: "時制の基準は、暦の上の日付ではなく{{話している今}}です。『タイム・マシン』の旅の場面は、未来から戻った時間旅行者が、客たちの前で振り返って語っている話です。彼にとって「明日の夜」は、すでに体験を終えた{{過去}}のできごとなので、Tomorrow night came black と過去形になるのです。英語の時制は「いつの世界か」ではなく「語り手から見て前か後か」を示している。だから字幕も「明日の夜が来た」で正しいのです。",
    },
  ],
  story: {
    kind: "manga4",
    title: "明日の夜は、過去形",
    panels: [
      {
        scene: "放課後の図書室。ソウタが『タイム・マシン』の原書を読み、首をかしげる。机に「came」の札。",
        lines: [
          { who: "ソウタ", text: "トゥモロー・ナイト・ケイム" },
          { who: "ソウタ", text: "明日なのに過去形？" },
          { who: "ソウタ", text: "これ、誤植だ！" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ソウタ", look: "boy", x: 254, face: "surprise", fx: "?", hand: [212, 228] },
            { who: "ミナ", look: "girl", x: 86, face: "normal" },
          ],
          props: [
            { kind: "table", x: 0, y: 244 },
            { kind: "book", x: 212, y: 226, s: 0.9 },
            { kind: "board", x: 140, y: 238, s: 0.9, text: "came" },
          ],
        },
      },
      {
        scene: "ミナが本をのぞきこみ、札を「語る今」にかえる。",
        lines: [
          { who: "ミナ", text: "帰ってきてから話してるの" },
          { who: "ミナ", text: "{{語る今}}から見れば" },
          { who: "ミナ", text: "明日の夜も{{過去}}なのよ" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ミナ", look: "girl", x: 254, face: "smile", hand: [206, 228] },
            { who: "ソウタ", look: "boy", x: 86, face: "think", fx: "?" },
          ],
          props: [
            { kind: "table", x: 0, y: 244 },
            { kind: "book", x: 206, y: 226, s: 0.85 },
            { kind: "board", x: 150, y: 238, text: "語る今" },
          ],
        },
      },
      {
        scene: "ソウタがひらめいて英作文をする。ミナがすかさず止める。",
        lines: [
          { who: "ソウタ", text: "帰ってきたら、なら" },
          { who: "ソウタ", text: "ウェン・ヒー・ウィル・カム" },
          { who: "ミナ", text: "副詞節は{{現在形}}！" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ソウタ", look: "boy", x: 256, face: "smile", fx: "idea" },
            { who: "ミナ", look: "girl", x: 84, face: "shout", fx: "!", hand: [132, 228] },
          ],
          props: [
            { kind: "table", x: 0, y: 244 },
            { kind: "board", x: 176, y: 238, text: "when節" },
          ],
        },
      },
      {
        scene: "ソウタが「時間旅行」の札をかかげて出かけようとする。ミナが手をふる。",
        lines: [
          { who: "ソウタ", text: "よし、未来へ行ってくる！" },
          { who: "ミナ", text: "帰ったら話してね" },
          { who: "ミナ", text: "もちろん{{過去形}}で" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ソウタ", look: "boy", x: 256, face: "shout", fx: "!", hand: [214, 214] },
            { who: "ミナ", look: "girl", x: 86, face: "smile", hand: [130, 214] },
          ],
          props: [
            { kind: "table", x: 0, y: 244 },
            { kind: "board", x: 214, y: 236, text: "時間旅行" },
          ],
        },
      },
    ],
    note: "ソウタとミナは架空の人物で、会話はすべて創作です。『タイム・マシン』（H・G・ウェルズ、1895年）で主人公が未来への旅を Tomorrow night came black と過去形で語ること、時制と副詞節のきまりは事実にもとづいています。",
  },
  mistakes: [
    { wrong: "If it will rain tomorrow, we will stay home.", right: "If it rains tomorrow, we will stay home.", why: "if の条件の副詞節では、未来のことも現在形にします。" },
    { wrong: "This bag is belonging to me.", right: "This bag belongs to me.", why: "belong は状態動詞なので、ふつう進行形にしません。" },
    { wrong: "I don't know if he comes tomorrow.", right: "I don't know if he will come tomorrow.", why: "know の目的語になる名詞節なので、未来のことは will で表します。" },
  ],
  check: [
    { q: "Let's wait until the rain ___.（stop を適切な形に）", a: "stops", why: "until が作る時の副詞節なので、未来のことでも現在形。" },
    { q: "「水は100℃で沸騰する」の動詞の時制は？", a: "現在形（Water boils at 100°C.）", why: "いつでも成り立つ事実は現在形で表す。" },
    { q: "I ___ (resemble) my mother. の ___ は resemble か am resembling か。", a: "resemble", why: "resemble は状態動詞なので進行形にしない。" },
  ],
  next: [
    { label: "4択ドリル「時制」に挑戦", href: "/learn/eibunpo-ko/h-eng-gram-jisei" },
    { label: "つぎの単元「完了形」", href: "/learn/eibunpo-ko/h-eng-gram-kanryo" },
    { label: "ふりかえり「文型」", href: "/learn/eibunpo-ko/h-eng-gram-bunkei" },
  ],
};
