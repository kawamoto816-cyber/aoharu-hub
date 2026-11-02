import type { Lecture } from "../types";

const C = "/media/commons/j-en-3-kanryo";

export const J_EN_3_KANRYO: Lecture = {
  unit: "j-en-3-kanryo",
  title: "現在完了は have ＋ 過去分詞。過去から「今」までのつながりを表す",
  hook: "「もう宿題を終えた（だから今は自由だ）」「3年間ずっとここに住んでいる」「京都に2回行ったことがある」。どれも過去のできごとを、今の自分とつなげて話しています。日本語にはない考え方なので、過去形とのちがいをつかむことが現在完了の一番のポイントです。",
  mystery: "1861年、故郷の町を去るリンカーンの別れの言葉は、本人が書き残した版では Here my children have been born、新聞にのった版では here my children were born です。子どもが生まれたのはどちらも過去のことなのに、なぜ本人の版は現在完了なのでしょう？",
  mission: {
    from: "FMラジオの英語番組のDJ",
    request: "3月の放送で「卒業と旅立ちの名スピーチ」特集を組み、リンカーンの別れの言葉を朗読します。ところが番組あてに「過去の話なのに、なぜ I lived ではなく I have lived なの？　訳も『住んでいた』でいいのでは？」というお便りが届きました。旅立つリスナーに言葉の重みを正しく届けるために、名探偵のあなたに現在完了のなぞを解いてほしいのです。",
    thanks: "現在完了は、過去を「今の自分」につなぎとめる形だったのですね。これで番組では「住んでいた」ではなく「ここで暮らしてきました」と訳し、旅立つみなさんに、思い出は今も自分の中にあると伝えられます。",
  },
  sections: [
    {
      heading: "形は have / has ＋ 過去分詞",
      body: "現在完了は{{have ＋ 過去分詞}}の形で、主語が3人称単数なら{{has}}を使います。過去分詞は、規則動詞なら過去形と同じ -ed の形（played）、不規則動詞は1つずつ覚えます（go - went - {{gone}}、see - saw - {{seen}}）。否定文は have のあとに not、疑問文は have を主語の前に出します。",
      reading: [
        "現在完了は、{{have ＋ 過去分詞}}の2語で1つの意味を作ります。I have finished my homework.（宿題をもう終えた）の have は「持っている」という意味ではなく、過去分詞と組んで「今の時点で〜した状態にある」ことを表す、助動詞のような働きをしています。主語が he・she・it や Ken のような{{3人称単数}}なら has を使い、My sister has finished her homework. となります。会話では I've・she's のように短く言うこともよくあります。",
        "過去分詞は、規則動詞なら過去形と同じ -ed の形です（play - played - played）。不規則動詞は形がばらばらなので、go - went - {{gone}}、see - saw - {{seen}}、eat - ate - eaten、write - wrote - written のように、3つをセットで声に出して覚えましょう。否定文は have のあとに not を置き（I {{haven't}} finished it yet.）、疑問文は have を主語の前に出します（{{Have}} you finished it?）。do や did は使いません。",
        "この形は400年以上前の英語にもすでにありました。シェイクスピアが1600年ごろに書いた悲劇『ハムレット』で、父を亡くし、母が叔父と再婚して心を閉ざした王子ハムレットは、昔の学友たちにこう打ち明けます。I have of late …… lost all my mirth（近ごろ、なぜかすっかり陽気さをなくしてしまった）。have と過去分詞 lost のあいだに、of late（近ごろ）と「なぜかはわからないが」という言葉がはさまっていますが、骨組みは I have lost です。なくしたのは過去でも、陽気さがないのは{{今}}。だから過去形ではなく現在完了なのです。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "I have of late, but wherefore I know not, lost all my mirth, forgone all custom of exercises;",
        ja: "近ごろ、なぜかはわからないが、すっかり陽気さをなくしてしまった。いつもの運動の習慣も、やめてしまった。",
        cite: "William Shakespeare, Hamlet, Act 2, Scene 2 (c. 1600)",
        source: "https://www.gutenberg.org/ebooks/1524",
      }],
      figure: {
        type: "formula",
        title: "I have finished my homework. を書きかえる",
        prose: true,
        steps: [
          { expr: "I {{have finished}} my homework.", note: "肯定文：have＋過去分詞" },
          { expr: "I {{have not finished}} my homework {{yet}}.", note: "否定文：have のあとに not（haven't）" },
          { expr: "{{Have}} you finished your homework {{yet}}?", note: "疑問文：Have を主語の前へ" },
          { expr: "— Yes, I {{have}}. / No, I {{haven't}}.", note: "答えも have で" },
        ],
        note: "do / does / did は使わない。have が be動詞や助動詞のようにはたらく。",
      },
      cliff: "同じ have ＋ 過去分詞の形が、実は3つの意味を使い分けています。",
    },
    {
      heading: "3つの意味：完了・経験・継続",
      body: "現在完了には3つの意味があります。{{完了}}は「（ちょうど・もう）〜したところだ」、{{経験}}は「〜したことがある」、{{継続}}は「（ずっと）〜している」です。どの意味かは、いっしょに使われる{{ことば}}が大きな手がかりになります。",
      reading: [
        "1つ目は{{完了}}です。I have just eaten lunch.（ちょうど昼ごはんを食べたところだ）と言えば、「だから今はおなかがいっぱい」という今の状態が伝わります。just（ちょうど）、already（もう）、否定文・疑問文の yet（まだ・もう）がよくいっしょに使われます。ハムレットの I have lost all my mirth も、陽気さをなくして「今は暗い気持ちのまま」という完了の文です。",
        "2つ目は{{経験}}で、「今までに〜したことがある」という、今の自分の中にたまった経験を表します。I have seen this movie three times.（この映画を3回見たことがある）、Have you ever been to Okinawa?（今までに沖縄へ行ったことはありますか）。ever（今までに）、never（一度も〜ない）、once（1回）、〜 times（〜回）が目じるしです。",
        "3つ目は{{継続}}で、「（ずっと）〜している」という、過去から今まで続いている状態を表します。I have lived in this town for ten years.（この町に10年間住んでいる）は、10年前に住み始めて、今も住んでいるという意味です。for（〜の間）・since（〜以来）や、How long have you lived here?（どのくらいここに住んでいますか）の how long が目じるしです。継続では live・know・be のように、もともと「状態」を表す動詞がよく使われます。",
      ],
      figure: {
        type: "compare",
        title: "現在完了の3つの意味と目じるし",
        columns: [{ title: "意味" }, { title: "目じるし", tone: "yellow" }],
        rows: [
          { label: "完了", cells: ["（ちょうど・もう）〜したところだ", "just / already / yet"] },
          { label: "経験", cells: ["〜したことがある", "ever / never / once / 〜 times"] },
          { label: "継続", cells: ["ずっと〜している", "for 〜 / since 〜 / how long"] },
        ],
        note: "how long（どのくらいの間）は継続、how many times（何回）は経験をたずねる。",
      },
      cliff: "では、ただの過去形とは、いったい何がちがうのでしょう？",
    },
    {
      heading: "過去形は「過去だけ」、現在完了は「過去から今まで」",
      body: "過去形は、過去のある時点のできごとだけを表し、今どうなのかは言いません。現在完了は、過去のできごとが{{今とつながっている}}ことを表します。だから現在完了は、yesterday・last week・〜 ago・when など{{はっきり過去を示すことば}}といっしょには使いません。",
      reading: [
        "I lost my key. と I have lost my key. は、どちらも「かぎをなくした」と訳せます。しかし過去形の I lost my key. は過去の1点のできごとを言うだけで、そのあと見つかったかどうかはわかりません。現在完了の I have lost my key. は「なくして、{{今も}}ない（だから家に入れなくて困っている）」という今の状態まで伝えます。過去形は過去の写真、現在完了は過去から今まで撮り続けた動画のようなもの、と考えるとわかりやすいでしょう。だから現在完了は、yesterday や two years ago のように{{過去の1点だけを示すことば}}とはいっしょに使えません。",
        "このちがいが心にひびく名文があります。1861年2月11日の朝、アメリカの第16代大統領に選ばれたエイブラハム・リンカーンは、首都ワシントンへ向かうため、イリノイ州スプリングフィールドの駅を発ちました。28歳でこの町に来て、弁護士として働き、結婚し、4人の息子にめぐまれ、そのうち1人を幼くして亡くした町です。冷たい雨の中、見送りに集まった人々に、リンカーンは列車の後ろのデッキから短い別れのあいさつをしました。国が南北に分かれようとしていた、大きな不安の時代でした。",
        "列車が動き出したあと、リンカーンは車内でこのあいさつを書きとめました。その中に Here I have lived a quarter of a century（ここで私は四半世紀を生きてきた）と、Here my children have been born, and one is buried（ここで子どもたちは生まれ、1人はここに眠っている）という文があります。一方、記者の記録をもとに新聞にのった版は here my children were born と過去形です。生まれたことを過去の記録として伝えるなら過去形で足ります。現在完了は、その25年間を、いま町を去ろうとしている自分につなぎとめる形です。リンカーンはこのあと二度と生きてこの町にもどることはなく、1865年、なきがらとなって帰り、この町に葬られました。",
      ],
      recite: [{
        lang: "en", voice: "male",
        text: "My friends—No one, not in my situation, can appreciate my feeling of sadness at this parting. To this place, and the kindness of these people, I owe every thing. Here I have lived a quarter of a century, and have passed from a young to an old man. Here my children have been born, and one is buried. I now leave, not knowing when, or whether ever, I may return, with a task before me greater than that which rested upon Washington.",
        ja: "友人のみなさん。私の立場にない人には、この別れの悲しみはわからないでしょう。この町と、この町の人々の親切に、私はすべてを負っています。ここで私は四半世紀を生き、若者から年寄りになりました。ここで子どもたちは生まれ、1人はここに眠っています。私はいま旅立ちます。いつもどれるのか、そもそももどれるのかもわからないまま。ワシントンが背負ったものよりも重い務めを前にして。",
        cite: "Abraham Lincoln, Farewell Address at Springfield (1861)",
        source: "https://www.abrahamlincolnonline.org/lincoln/speeches/farewell3.htm",
      }],
      photos: [
        {
          src: `${C}/depot.webp`, width: 800, height: 581,
          alt: "GREAT WESTERN RAILROAD と書かれた看板のある、れんが造りの2階建ての駅舎と、手前の歴史の案内板",
          caption: "スプリングフィールドの旧グレート・ウェスタン鉄道の駅舎（2004年）。1861年2月11日、リンカーンはこの駅から旅立ち、見送りの人々に別れのあいさつをした。",
          credit: { author: "Michael Barera", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:The_Lincoln_Depot_August_2004.jpg" },
        },
        {
          src: `${C}/farewell-print.webp`, width: 800, height: 1033,
          alt: "黒い枠で囲まれた古い印刷物。上に大きく PRESIDENT LINCOLN'S FAREWELL ADDRESS と書かれ、その下に本文が並ぶ",
          caption: "1861年に印刷された別れのあいさつ。記者の記録にもとづく版で、here my children {{were born}} と過去形になっている。本人の版の have been born と見くらべたい。",
          credit: { author: "The American News Company", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Abraham_Lincoln%27s_Farewell_Address,_The_American_News_Company,_1861.png" },
        },
      ],
      reveal: "過去形の were born は「子どもたちがここで生まれた」という過去の事実を、記録として伝える形です。現在完了の have been born は、そのできごとが{{今とつながっている}}ことを表します。町を去るその瞬間のリンカーンにとって、ここで暮らした25年も、子どもたちが生まれたことも、終わった昔話ではなく、今の自分をつくっているものでした。だから本人の版は I have lived・have been born と、過去を{{今の自分}}につなぎとめる現在完了で書かれていると読めるのです。",
      figure: {
        type: "compare",
        title: "過去形と現在完了のちがい",
        columns: [{ title: "過去形", tone: "plain" }, { title: "現在完了", tone: "yellow" }],
        rows: [
          { label: "表すこと", cells: ["過去の1点だけ", "過去から今までのつながり"] },
          { label: "例", cells: ["I lost my key.", "I have lost my key."] },
          { label: "今は？", cells: ["わからない", "今もない（困っている）"] },
          { label: "使える語", cells: ["yesterday / ago", "just / ever / for / since"] },
        ],
      },
      cliff: "旅立ったリンカーンを、町の人は has been と has gone のどちらで語ったでしょう？",
    },
    {
      heading: "for と since、been と gone",
      body: "継続の「〜の間」は{{for ＋ 期間}}（for two years）、「〜以来」は{{since ＋ 起点}}（since 2020、since last year）です。また、have {{been}} to 〜 は「〜へ行ったことがある（経験）」、have {{gone}} to 〜 は「〜へ行ってしまった（今はここにいない）」という意味で、区別して使います。",
      reading: [
        "継続の文では、「どのくらいの間か」を{{for}}で、「いつからか」を{{since}}で言います。for のあとには for two years・for a long time のような{{期間}}、since のあとには since 2020・since I was a child のような{{始まった時点}}を置きます。旅立つ朝のリンカーンの立場なら、I have lived here for twenty-four years. とも、I have lived here since 1837. とも言えます。別れのあいさつの have lived a quarter of a century は、for を省いて期間だけを置いた形です。",
        "{{have been to 〜}} と {{have gone to 〜}} は、日本語ではどちらも「〜へ行った」になりそうですが、意味が大きくちがいます。I have been to Washington. は「ワシントンへ行ったことがある」という経験で、話している本人は今ここにいます。一方 He has gone to Washington. は「ワシントンへ行ってしまった」で、彼は今ここにいません。だから gone の文の主語は、ふつう I や you ではなく、その場にいない he や she になります。",
        "1861年2月11日、列車を見送ったあと、スプリングフィールドの人々は Mr. Lincoln has gone to Washington.（リンカーンさんはワシントンへ行ってしまった）と言い合ったことでしょう。その4年後、なきがらとなって町へ帰ったとき、この has gone は、もう二度と取り消せない言葉になりました。現在完了は、過去を今につなげるからこそ、喜びも別れも、今の気持ちとして伝える形なのです。",
      ],
      photos: [
        {
          src: `${C}/lincoln-home.webp`, width: 638, height: 398,
          alt: "古い写真の台紙。木造2階建ての家と柵の前に、背の高い男性と小さな男の子が立っている",
          caption: "スプリングフィールドのリンカーンの家（1860年ごろの写真）。家の前に立つのはリンカーンと息子のウィリー。一家は1844年から旅立つ1861年までここに住んだ。",
          credit: { author: "John Adams Whipple", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Abraham_and_Willie_Lincoln_at_their_home_in_Springfield,_Illinois.jpg" },
        },
      ],
    },
  ],
  story: {
    kind: "novel",
    title: "雨の駅と、have lived",
    paragraphs: [
      "1861年2月11日の朝、スプリングフィールドの駅前は、細かい冷たい雨にぬれていた。十三歳のグレタは、パン屋の父の大きな傘の下で、つま先立ちをしていた。ドイツの港町からこの町に来て、ちょうど二年。英語はまだ、夜の学校で少しずつ習っているところだった。",
      "駅のまわりには、千人ほどの人が集まっていた。弁護士、店の主人、農家の人、黒いショールの女の人たち。だれもが知っている人を見送りに来た顔をしていた。列車の後ろのデッキに、背の高い人が現れると、ざわめきがすっと消えた。帽子をとったその人の声は、雨の音にまじって、とぎれとぎれにしか届かなかった。",
      "それでも、グレタの耳にはいくつかの言葉が残った。{{a quarter of a century}}。四半世紀、二十五年。そして、{{I have lived}}。グレタは傘の柄をにぎりしめた。夜の学校で、先生が黒板に書いた二つの文を思い出したのだ。I lived in Hamburg. と I have lived here. 「上の文は、もう終わったこと。下の文は、今もつながっていること」。",
      "でも、あの人はこれから町を出ていくのに。終わるのなら、lived のはずではないのか。汽笛が鳴り、列車がゆっくり動き出した。帽子をふる人、ハンカチを目に当てる人。列車が見えなくなっても、しばらくだれも帰ろうとしなかった。",
      "帰り道、弟のハンスが「リンカーンさんは、どこ？」と聞いた。グレタは少し考えて、習ったばかりの英語で答えた。「He has gone to Washington」。行ってしまって、もうここにはいない。言ってみると、胸が少し痛んだ。",
      "その夜、パンの粉のにおいがする台所で、グレタはノートを開いた。あの人は、雨の中に立って、町の人の顔を見ながら話していた。二十五年は、まだあの人の中で終わっていなかったのだ。だから have lived。今の自分につながっているから。グレタは、えんぴつで一行を書いた。{{I have lived in Springfield for two years.}} 書き終えると、窓の外の雨の町が、ほんの少しだけ、自分の町に見えた。",
    ],
    sayFix: { "四半世紀": "しはんせいき" },
    note: "グレタと弟のハンス、パン屋の一家、夜の学校の先生、会話や心情はすべて創作です。1861年2月11日の朝にリンカーンがスプリングフィールドの駅から旅立ち、雨の中で多くの人に見送られたこと、別れのあいさつで a quarter of a century・I have lived と語ったこと（どの記録の版にもある言葉）、のちになきがらとなって町に帰ったことは史実にもとづいています。リンカーンのせりふは創作していません。",
  },
  mistakes: [
    { wrong: "I have visited Kyoto last year.", right: "I visited Kyoto last year.", why: "last year のようにはっきり過去を示すことばがあるときは、現在完了ではなく過去形を使います。" },
    { wrong: "She have lived here since 2020.", right: "She has lived here since 2020.", why: "主語が3人称単数なので has を使います。" },
    { wrong: "I have lived here since three years.", right: "I have lived here for three years.", why: "three years は期間なので for。since のあとには始まった時点を置きます。" },
    { wrong: "Did you have finished it?", right: "Have you finished it?", why: "現在完了の疑問文は have を主語の前に出します。do / did は使いません。" },
  ],
  check: [
    { q: "I have ___ to Hokkaido twice.（2回行ったことがある）の ___ に入る語は？", a: "been", why: "経験の「行ったことがある」は have been to 〜。" },
    { q: "He came to Japan five years ago. He still lives here. を現在完了の1文に。", a: "He has lived in Japan for five years.", why: "5年前から今までの継続。期間なので for five years。" },
    { q: "Have you ever seen a koala? に No で答えましょう。", a: "No, I haven't. (No, I have never seen one.)", why: "Have でたずねられたら have で答える。" },
  ],
  next: [
    { label: "4択ドリル「現在完了」に挑戦", href: "/learn/eibunpo-chu/j-en-3-kanryo" },
    { label: "つぎに「現在完了進行形」", href: "/learn/eibunpo-chu/j-en-3-kanryo-shinko" },
    { label: "復習「過去形」のレクチャー", href: "/learn/lecture/j-en-1-kakokei" },
  ],
};
