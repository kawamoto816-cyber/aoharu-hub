import type { Lecture } from "../types";

const C = "/media/commons/e-english-56-can";

export const E_ENGLISH_56_CAN: Lecture = {
  unit: "e-english-56-can",
  title: "can は「できる」を足す言葉。後ろの動作の言葉は形をかえない",
  hook: "「ぼくは一輪車に乗れるよ」「わたしは歌が得意」など、自分のできることを伝えると、友だちに自分のことを知ってもらえます。英語では、動作の言葉の前に can を1つおくだけで「〜できる」の文になります。中学校でもそのまま使う大切な形です。",
  mystery: "日本語では「とぶ」が「とべる」、「作る」が「作れる」と、「できる」を言うたびに言葉のおしりが変わります。ところが英語は、jump も cook も形がそのまま。英語はどうやって、言葉を変えずに「できる」を言っているのでしょう？",
  mission: {
    from: "町の公民館で、外国の小学校とのオンライン交流会を手伝う近所の大学生",
    request: "来月、町の小学生と外国の小学生が、画面ごしに「自分のできること」を紹介《しょうかい》し合います。ところが参加する子から「とべる、走れる、作れる……動作ごとに英語の形を覚えるなんて、むりだよ」と言われてしまいました。英語の「できる」のしくみを、名探偵《めいたんてい》のあなたに見つけてほしいのです。",
    thanks: "英語の「できる」は、動作の言葉はそのままで、前に can を1つ足すだけだったのですね。それなら知っている動作の言葉の数だけ「できること」が言えます。交流会の前に、みんなでブロック遊びのように文を作る練習をします！",
  },
  sections: [
    {
      heading: "can を動作の言葉の前におく",
      body: "I jump.（わたしはとぶ）の jump の前に {{can}} をおくと、I can jump.「わたしはとべる」になります。できないときは {{can't}}（cannot）を使います。たずねるときは {{can を文の始めに出して}} Can you jump? と聞き、Yes, I can. か No, I can't. で答えます。",
      reading: [
        "日本語で「できる」と言うときのことを思い出してみましょう。「とぶ」は「とべる」、「作る」は「作れる」、「食べる」は「食べられる」。動作の言葉のおしりが、そのたびに少しずつ変わります。日本語を話すみなさんは、知らないうちに、この変え方を使い分けているのです。",
        "英語はちがいます。jump（とぶ）の前に{{can}}を1つおくだけで、I can jump high.（わたしは高くとべます）。cook（料理する）でも、I can cook.。jump も cook も、形はそのままです。can は「できる」という意味を足す、部品のような言葉です。おもちゃのブロックを1つ足すように、動作の言葉の前にくっつけるだけでよいのです。",
        "できないときは、can のかわりに{{can't}}を使います。I can't jump high.（高くはとべません）。相手にたずねるときは、can を文のいちばん前に出して Can you jump high? と聞きます。答えも can を使って、Yes, I can. か No, I can't.。会話では can't の t が小さく聞こえることがあるので、相手の顔や身ぶりもよく見て聞き取りましょう。",
      ],
      figure: {
        type: "formula",
        title: "I jump. から4つの文へ",
        prose: true,
        steps: [
          { expr: "I jump.", note: "わたしはとぶ" },
          { expr: "I {{can}} jump.", note: "とべる：jump の前に can" },
          { expr: "I {{can't}} jump.", note: "とべない：can't（cannot）" },
          { expr: "{{Can}} you jump? — Yes, I {{can}}. / No, I {{can't}}.", note: "たずねる：Can を前へ" },
        ],
      },
      cliff: "では、主語が「ジャック」や「わたしの妹」になったら、can の文はどう変わるのでしょう？",
    },
    {
      heading: "だれが主語でも、can も動作の言葉もそのまま",
      body: "he や she のときも、{{can の形はかわりません}}。また、can の後ろの動作の言葉にも s をつけず、{{もとの形}}のまま使います。She can play the piano. が正しく、She can plays 〜 とは言いません。人や動物、だれのことでも同じ形なので、覚えやすいですね。",
      reading: [
        "英語の国で、昔から子どもたちが歌ってきた歌や言葉遊びを、まとめて{{マザーグース}}とよびます。その中に、ジャックという男の子がとびはねる、たった2行の歌があります。200年ほど前にはもう書き留められていて、今も赤ちゃんをひざの上でぽんとはねさせたり、なわとびをしたりしながら、くり返し口ずさまれています。",
        "nimble は「身軽な」、quick は「すばやい」、candlestick は「ろうそく立て」。歌の意味は「ジャック、身軽に、ジャック、すばやく。ジャック、ろうそく立てをとびこえろ」です。イギリスには、昔、火のついたろうそくをとびこえる遊びがあったともいわれます。短くてリズムがよいので、声に出すと自然に体がはずみます。",
        "この歌に can を足してみましょう。Jack can jump over the candlestick.（ジャックはろうそく立てをとびこえられる）。ジャックは1人の男の子、つまり he ですが、{{can の形はかわらず}}、jump にも s はつきません。My sister can jump rope.（妹はなわとびができる）も、Our dog can catch a ball.（うちの犬はボールをキャッチできる）も同じです。だれが主語でも「can＋{{もとの形}}」の1つの形だけなので、とても使いやすいのです。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "Jack be nimble, Jack be quick,\nJack jump over the candlestick.",
        ja: "ジャック、身軽に、ジャック、すばやく。\nジャック、ろうそく立てを、とびこえろ。",
        cite: "Mother Goose, \"Jack\" (The Real Mother Goose, 1916)",
        source: "https://www.gutenberg.org/ebooks/10607",
      }],
      photos: [
        {
          src: `${C}/jack1.webp`, width: 385, height: 494,
          alt: "ぼうしをかぶったセーラー服の男の子が、両手を前に出してとぼうとしている絵。右に Jack be nimble の歌の文字",
          caption: "1901年のアメリカのマザーグースの本の絵。今にもとびそうなジャック。この本では「And Jack jump over the candle stick」と、少しちがう歌い方で書かれています。",
          credit: { author: "W. W. Denslow", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Jack_Be_Nimble_1_-_WW_Denslow_-_Project_Gutenberg_etext_18546.jpg" },
        },
        {
          src: `${C}/candle.webp`, width: 800, height: 1421,
          alt: "金色の受け皿と取っ手のついた台に、白いろうそくが1本立っている",
          caption: "持ち手のついたろうそく立て。英語で candlestick。歌のジャックは、こんな台をとびこえたのかもしれません。",
          credit: { author: "Fmw.kvlt", license: "CC0", licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/", source: "https://commons.wikimedia.org/wiki/File:Bougeoir.jpg" },
        },
      ],
      figure: {
        type: "compare",
        title: "主語がかわっても同じ形",
        columns: [{ title: "だれが" }, { title: "できる", tone: "blue" }, { title: "できない", tone: "red" }],
        rows: [
          { cells: ["I", "I can skate.", "I can't skate."] },
          { cells: ["you", "You can cook.", "You can't cook."] },
          { cells: ["he / she", "She can sing.", "He can't sing."] },
          { cells: ["動物", "Birds can fly.", "Fish can't fly."] },
        ],
      },
      cliff: "ところで「サッカーができる」と言うとき、can のあとには何をおけばよいのでしょう？",
    },
    {
      heading: "play のあとに the をつける？つけない？",
      body: "「〜をする・ひく」の {{play}} は、後ろの言葉で the がいるかどうかが決まります。ピアノやギターなどの{{楽器には the をつけ}}、サッカーやテニスなどの{{スポーツには the をつけません}}。自転車に乗るは ride a bike、けん玉をするは do kendama のように、play 以外の言葉を使うものもあります。",
      reading: [
        "I can soccer. と言いたくなりますが、これでは「サッカーできる」と、かんじんの動作が足りません。can は動作の言葉にくっつく言葉なので、すぐ後ろには「する」にあたる言葉が必要です。サッカーなら{{play}}を使って、I can play soccer.。テニスや野球も、I can play tennis. / I can play baseball. です。",
        "楽器をひくときも play を使いますが、こちらは前に{{the}}をつけて、I can play the recorder.（リコーダーがふけます）、I can play the drums.（ドラムがたたけます）と言います。スポーツには the をつけず、楽器にはつける。「楽器には the」と、セットにして覚えておきましょう。",
        "play を使わないものもあります。自転車や一輪車には ride を使って I can ride a unicycle.。けん玉は do kendama、料理は cook、絵は draw です。kendama のように、日本の遊びの名前はそのまま英語の中で使えます。自分の得意なことを、どの動作の言葉で言えばよいか、さがしてみましょう。",
      ],
      figure: {
        type: "tree",
        title: "play の後ろ",
        root: {
          label: "play ＋ ？",
          children: [
            {
              label: "楽器",
              sub: "the をつける",
              tone: "yellow",
              children: [{ label: "the piano" }, { label: "the recorder" }],
            },
            {
              label: "スポーツ",
              sub: "the をつけない",
              tone: "blue",
              children: [{ label: "soccer" }, { label: "basketball" }],
            },
          ],
        },
      },
      photos: [
        {
          src: `${C}/kendama.webp`, width: 800, height: 1533,
          alt: "木の台に赤い玉がのった、日本のけん玉",
          caption: "日本の遊び道具、けん玉。英語でも kendama で通じます。「する」は play ではなく do を使って I can do kendama.",
          credit: { author: "Gloria Populorum", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Kendama_frontal.JPG" },
        },
      ],
      cliff: "自分のことが言えたら、次は相手の「できること」を聞いてみましょう。",
    },
    {
      heading: "何ができるかをたずねる",
      body: "相手のできることを広く聞くときは {{What can you do?}} と聞きます。答えは I can cook curry. のように {{I can ＋動作.}} です。He や She のことなら What can he do? と聞きます。答えを聞いたら That's great! と返すと、会話が楽しく続きます。",
      reading: [
        "Can you 〜? は「〜できる？」と1つずつたずねる聞き方です。相手のできることを広く知りたいときは、{{What can you do?}}（何ができるの？）と聞きます。答えは I can draw cats.（ネコの絵がかけます）のように「I can＋動作」で言います。友だちのことなら What can he do? / What can she do? です。",
        "外国の友だちと画面ごしに話すときは、言葉だけでなく、見せることも大切です。I can do kendama. と言いながら、けん玉を画面にうつしてみせれば、kendama を知らない相手にもすぐ伝わります。聞いた人は That's great!（すごいね！）や Cool!（かっこいい！）と返すと、会話がはずみます。",
        "できないことを言うのも、はずかしいことではありません。I can't cook, but I can wash the dishes.（料理はできないけど、お皿はあらえるよ）のように、can't と can を but でつなぐと、自分らしい紹介《しょうかい》になります。can は「できる」を足す、だれにでも使える言葉。知っている動作の言葉の数だけ、自分のことを伝えられるのです。",
      ],
      reveal: "英語の「できる」は、動作の言葉を変えるのではなく、前に {{can}} を1つ足して作ります。jump は can jump、cook は can cook。主語がジャックでも妹でも、can も動作の言葉も{{もとの形}}のまま。だから英語は、言葉を変えずに「できる」が言えるのです。",
    },
  ],
  story: {
    kind: "novel",
    title: "画面のむこうの That's great!",
    paragraphs: [
      "土曜日の朝。公民館の小さな部屋で、五年生のユイはパソコンの前にすわっていました。画面には、海のむこうの小学校の子どもたちが四角くならんでいます。今日は、自分のできることを英語で紹介《しょうかい》し合う、オンライン交流会です。",
      "ユイのノートには、きのうの夜に書いた文がありました。I can kendama.。「ユイさん、どうぞ」。手伝いの大学生のお兄さんに名前をよばれ、ユイは大きく息をすいました。「I can kendama!」",
      "画面の中で、くるくるのかみの男の子が首をかしげました。名札にはリアムと書いてあります。「Kendama?」。ユイの顔があつくなりました。通じていない。そのとき、お兄さんがノートのはしに小さく書きました。can のあとには動作の言葉。",
      "そうだ、と思い出しました。can はブロックみたいに、動作の言葉の前に足すんだった。けん玉は do kendama。ユイはかばんから赤いけん玉を取り出して、画面の前にかまえました。「I can do kendama!」。玉がふわりとうき上がり、けんの先に、カチンとささりました。",
      "「Wow! That's great!」。リアムが手をたたきました。ほかの子も「Cool!」と声を上げています。ユイの胸《むね》の中で、何かがぽんとはずみました。",
      "次はリアムの番です。リアムは、テーブルの上に古いろうそく立てをおきました。「I can jump over the candlestick!」。そう言うと、ぴょんととびこえてみせます。むこうの先生が、歌うように言いました。「Jack be nimble, Jack be quick!」。子どもたちがいっせいに笑いました。",
      "「Can you do kendama?」とユイが聞くと、リアムは首を横にふりました。「No, I can't. But I can try!」。ユイはけん玉を画面にぐっと近づけて、ゆっくり、もう一度やってみせました。",
      "交流会が終わったあと、ユイはノートの文に線を一本引いて、do を書き足しました。たった一語で、画面のむこうに自分のことが届いたのです。来週は I can ride a unicycle. にしようかな。ユイのノートに、新しい「できる」がふえていきました。",
    ],
    note: "ユイ、リアム、大学生のお兄さん、交流会の出来事はすべて作り話です。「Jack be nimble, Jack be quick」は、昔から英語の国で歌われてきたマザーグースの歌（パブリックドメイン）です。",
  },
  mistakes: [
    { wrong: "She can plays tennis.", right: "She can play tennis.", why: "can の後ろの動作の言葉は、主語が she でももとの形のままです。" },
    { wrong: "I can soccer.", right: "I can play soccer.", why: "can のすぐ後ろには「する」にあたる動作の言葉が必要です。" },
    { wrong: "I can play the baseball.", right: "I can play baseball.", why: "スポーツには the をつけません。the をつけるのは楽器です。" },
    { wrong: "Can you jump high? — Yes, I do.", right: "Yes, I can.", why: "Can でたずねられたら can で答えます。" },
  ],
  check: [
    { q: "I can ride a unicycle. を「できない」の文にしましょう。", a: "I can't ride a unicycle.", why: "can を can't（cannot）にかえる。" },
    { q: "My brother can ___ fast. の ___ に入るのは run と runs のどちら？", a: "run", why: "can の後ろはもとの形。" },
    { q: "Can you play the guitar? に「いいえ」で答えましょう。", a: "No, I can't.", why: "Can の文には can で答える。" },
  ],
  next: [
    { label: "ポイントと練習問題「できること（can）」", href: "/learn/eigo-sho/e-english-56-can" },
    { label: "中1「助動詞《じょどうし》 can」", href: "/learn/eibunpo-chu/j-en-1-can" },
    { label: "つぎの単元「物の位置と道案内」", href: "/learn/eigo-sho/e-english-56-ichi" },
  ],
};
