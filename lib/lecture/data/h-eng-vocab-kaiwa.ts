import type { Lecture } from "../types";

const M = "/media/commons/h-eng-vocab-kaiwa";

export const H_ENG_VOCAB_KAIWA: Lecture = {
  unit: "h-eng-vocab-kaiwa",
  title: "会話表現は「場面」と「相手との距離」で選ぶ。答えは前の発話にかみ合わせる",
  hook: "先生に「窓を開けて」と頼むとき、友だちと同じ言い方でいいでしょうか。英語にも、相手や場面に合わせたていねいさの段階があります。会話表現は文法問題よりも「どんな場面で、何のために言うか」が大事です。決まり文句をはたらきごとに整理すると、会話文の問題もリスニングも解きやすくなります。",
  mystery: "オスカー・ワイルドの喜劇『真面目が肝心』（1895年）では、上流階級の人々が、この上なく礼儀正しい英語で会話を続けます。悪口も下品な言葉もほとんど出てこないのに、130年たった今も観客は笑いころげます。ていねいな英語の会話が、なぜこんなにおかしいのでしょう？",
  mission: {
    from: "大学の英語劇サークルで演出を担当する先輩",
    request: "秋の公演で『真面目が肝心』を原語で上演します。ところが練習では、せりふは正しく言えているのに、客席役の仲間がまったく笑いません。この劇の笑いがどこから生まれるのかを、名探偵のあなたに解き明かしてほしいのです。",
    thanks: "笑いは言葉そのものではなく、「この場面ならこう返すはず」という会話の型と、実際の返事のずれから生まれていた。型をはっきり見せる間のとり方を練習すれば、客席はきっと笑ってくれます。",
  },
  sections: [
    {
      heading: "頼み方には、ていねいさの段階がある",
      body: "同じ「窓を開けて」でも、言い方で{{ていねいさ}}が変わります。命令文は親しい相手でも強く聞こえることがあり、Can you 〜? は気軽、{{Could you 〜?}} はていねい、{{Would you mind 〜ing?}} はさらにひかえめです。目上の人や初めて会う人には、ていねいな形を選びましょう。",
      reading: [
        "英語には日本語のような敬語の体系はありません。そのかわり、{{ていねいさ}}は「どれだけ遠回しに言うか」で表します。Open the window.（窓を開けて）は命令文で、言われた側に断る余地がありません。Can you open the window? は「開けられる？」と相手の都合をたずねる形になり、少しやわらぎます。Could you 〜? と過去形にすると、さらにていねいになります。過去形は、時間だけでなく「心の距離」も表します。仮定法と同じで、「もしできるなら」と一歩引いた言い方になるのです。",
        "いちばんひかえめな {{Would you mind 〜ing?}} は、直訳すると「〜することを、あなたはいやだと思うでしょうか」です。頼みごとそのものを口にせず、相手の気持ちだけをたずねています。please をつけてもていねいにはなりますが、命令文に please をつけただけの Please open the window. は、目上の人には指図のように聞こえることがあります。英語のていねいさは、単語を足すことよりも、文の形を「質問」にし、さらに「過去形」にして、相手が断れる余地を残すことで生まれます。",
        "この「ていねいな形」を、笑いの道具にしたのが、アイルランド出身の作家{{オスカー・ワイルド}}（1854〜1900年）です。1895年2月にロンドンで初演された喜劇『真面目が肝心』は、上流階級の人々の会話のしきたりを、ほんの少しずらして見せる{{風習喜劇}}です。幕が開くと、遊び好きの青年アルジャノンが、執事のレーンにたずねます。「ぼくのピアノ、聞いてた？」。レーンの答えは、礼儀作法の手本のように完璧で、しかも主人をみごとにかわしています。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "Algernon: Did you hear what I was playing, Lane?\nLane: I didn’t think it polite to listen, sir.\nAlgernon: I’m sorry for that, for your sake. I don’t play accurately—any one can play accurately—but I play with wonderful expression.",
        ja: "アルジャノン：ぼくがひいていた曲、聞いていたかい、レーン？\nレーン：聞くのは失礼かと存じまして、だんなさま。\nアルジャノン：それは残念だ、きみのためにね。ぼくは正確にはひかない――正確になら、だれにだってひける――だが、表現力はすばらしいのさ。",
        cite: "Oscar Wilde, The Importance of Being Earnest, Act I (1895)",
        source: "https://www.gutenberg.org/ebooks/844",
      }],
      figure: {
        type: "formula",
        title: "「窓を開けて」のていねいさ",
        prose: true,
        steps: [
          { expr: "{{Open}} the window.", note: "命令文：強く聞こえることがある" },
          { expr: "{{Can you}} open the window?", note: "気軽な頼み方" },
          { expr: "{{Could you}} open the window?", note: "ていねいな頼み方" },
          { expr: "{{Would you mind opening}} the window?", note: "さらにひかえめ（〜していただけますか）" },
        ],
        note: "please をつけてもていねいになるが、命令文に please だけでは目上の人には足りないこともある。",
      },
      photos: [
        {
          src: `${M}/algernon-lane.webp`, width: 514, height: 684,
          alt: "胸に花をさした燕尾服の男性が手を上げて立ち、その横に黒い服の男性が手をそろえて控えている古い舞台写真",
          caption: "1895年の初演の第1幕。左がアルジャノン、右が執事のレーン（雑誌『ザ・スケッチ』掲載）。主人には{{ていねいさ}}を崩さない執事が、言葉たくみに主人をかわすのが笑いどころ。",
          credit: { author: "Alfred Ellis", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Aynesworth-and-Peile-Importance-of-Being-Earnest-1895.jpg" },
        },
        {
          src: `${M}/wilde.webp`, width: 800, height: 1326,
          alt: "毛皮のえりのコートを着た長髪の男性が、ほおづえをついていすにすわり、つえを持っている写真",
          caption: "{{オスカー・ワイルド}}（1882年、ニューヨークで撮影）。アメリカ各地を講演して回った年の写真。会話の名手として知られ、気のきいた言い回しで社交界の人気者になった。",
          credit: { author: "Napoleon Sarony", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Oscar_Wilde_by_Napoleon_Sarony._Three-quarter-length_photograph,_seated.jpg" },
        },
      ],
      cliff: "ていねいにたずねられたら、Yes で答えるのが礼儀？　じつは、そう答えると大変なことになる質問があります。",
    },
    {
      heading: "Do you mind 〜? には No で「いいですよ」",
      body: "mind は{{「いやだと思う」}}という意味です。Do you mind if I 〜? は「私が〜したら、あなたはいやですか」とたずねているので、OK するときは{{No（いやではない）}}と答えます。Yes と答えると「いやです」という意味になってしまいます。",
      reading: [
        "日本語で「〜してもいいですか」と聞かれたら、「はい、どうぞ」と答えます。ところが英語の Do you mind if I sit here? は、「ここに座ったら、あなたは{{いやだと思い}}ますか」という質問です。答えの Yes と No は、日本語のように「相手の言ったことに賛成かどうか」ではなく、「いやだと思う気持ちがあるかどうか」という{{事実}}に向けられます。いやでなければ {{No}}、つまり No, not at all.（いいえ、ちっとも）や Of course not.（もちろん、かまいません）が「どうぞ」の意味になります。",
        "反対に Yes と答えると「はい、いやです」になり、相手はびっくりして立ち上がるかもしれません。これは否定疑問文の答え方と同じ考え方です。Don't you like coffee?（コーヒーは好きじゃないの？）に「好きです」と答えるなら Yes, I do. で、日本語の「いいえ」とは逆になります。英語の Yes と No は、いつも「中身がそうかどうか」を基準に選ぶのです。",
        "断るときは、ただ Yes とだけ言うと冷たく聞こえます。Sorry, someone is sitting here.（すみません、人が来ます）のように、おわびと{{理由}}をそえるのがふつうです。なお実際の会話では、Sure. や Go ahead.（どうぞ）と答える人もいます。これは質問の形よりも「OK したい」という気持ちが先に出た返事です。ただ、試験ではまぎれのない No, not at all. を選びましょう。",
      ],
      figure: {
        type: "formula",
        title: "mind の質問への答え方",
        prose: true,
        steps: [
          { expr: "Do you {{mind}} if I sit here?", note: "ここに座ったら、いやですか？" },
          { expr: "— {{No}}, not at all. / Of course not.", note: "◯ いやではない＝どうぞ" },
          { expr: "— Sorry, {{someone is sitting here}}.", note: "◯ 断るときは理由をそえる" },
          { expr: "— {{Yes}}, of course.", note: "✕「いいですよ」のつもりでも「いやです」になる" },
        ],
      },
      photos: [
        {
          src: `${M}/theatre.webp`, width: 591, height: 591,
          alt: "円柱の並ぶ白い3階建ての劇場の正面と、前の通りを行く馬車や馬に乗った人を描いた銅版画",
          caption: "ロンドンのセント・ジェームズ劇場（1836年の版画）。1835年に開場し、1895年に『真面目が肝心』が初演された。建物は1957年に取りこわされた。",
          credit: { author: "作者不明", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:St-Jamess-theatre-1836(Crop).jpg" },
        },
      ],
      cliff: "頼む・断る以外にも、会話には決まった「型」があります。言い方と返し方は、どう組になっているのでしょう？",
    },
    {
      heading: "はたらきごとに「言い方」と「返し方」を組にする",
      body: "会話表現は、{{提案・誘い・許可・お礼}}のようなはたらきで分けて、{{言い方と返し方をセット}}で覚えます。Why don't we 〜? は「なぜ〜しないの」ではなく「〜しませんか」という提案です。返し方まで覚えておくと、会話文の空所問題で選択肢をすばやくしぼれます。",
      reading: [
        "会話表現は、単語の意味を足し算しても分かりません。{{Why don't we 〜?}} は、文字どおりなら「なぜ私たちは〜しないのか」ですが、実際には「〜しませんか」という{{提案}}です。Would you like to 〜? は「〜したいですか」ではなく、ていねいな{{誘い}}。Shall I 〜? は「私が〜しましょうか」という{{申し出}}です。どれも「何のために言うか」というはたらきで覚えると、迷いません。",
        "そして、はたらきが決まると、返し方もほぼ決まります。誘いを喜んで受けるなら I'd love to.、断るなら I'd love to, but I have to 〜.（行きたいのですが、〜しなければならないので）と理由をそえます。お礼の Thanks a lot. には You're welcome. や {{My pleasure.}}（どういたしまして。お役に立ててうれしいです）。言い方と返し方を{{セット}}で覚えると、相手の言葉を聞いた瞬間に、返事の候補が頭にうかぶようになります。",
        "あいさつも同じです。How are you? は体調の検査ではなく、「こんにちは」に近いあいさつで、Fine, thanks. And you? のように軽く返して相手にも聞き返すのが型です。『真面目が肝心』では、町にやってきたジャックを、アルジャノンが2つの質問でむかえます。What brings you up to town? は「何があなたを町に連れてきたのか」、つまり「何の用で町へ？」という意味です。Why did you come? と理由を問いつめるより、ずっとやわらかい聞き方です。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "Lane: Mr. Ernest Worthing.\nAlgernon: How are you, my dear Ernest? What brings you up to town?\nJack: Oh, pleasure, pleasure! What else should bring one anywhere? Eating as usual, I see, Algy!\nAlgernon: I believe it is customary in good society to take some slight refreshment at five o’clock.",
        ja: "レーン：アーネスト・ワージングさまです。\nアルジャノン：やあ、アーネスト。元気かい？　何の用で町へ？\nジャック：楽しみさ、楽しみ！　ほかに何が人をどこかへ連れていくっていうんだい？　相変わらず食べてるね、アルジー！\nアルジャノン：上流の社交界では、5時に軽く何かいただくのがならわしだと思うがね。",
        cite: "Oscar Wilde, The Importance of Being Earnest, Act I (1895)",
        source: "https://www.gutenberg.org/ebooks/844",
      }],
      figure: {
        type: "compare",
        title: "場面ごとの言い方と返し方",
        columns: [{ title: "言い方", tone: "blue" }, { title: "返し方", tone: "yellow" }],
        rows: [
          { label: "提案", cells: ["Why don't we 〜?", "That sounds good."] },
          { label: "誘い", cells: ["Would you like to 〜?", "I'd love to."] },
          { label: "許可", cells: ["May I 〜?", "Sure, go ahead."] },
          { label: "申し出", cells: ["Shall I 〜?", "Yes, please."] },
          { label: "お礼", cells: ["Thanks a lot.", "My pleasure."] },
        ],
      },
      photos: [
        {
          src: `${M}/playbill.webp`, width: 800, height: 473,
          alt: "ST. JAMES'S THEATRE の見出しと、劇の題名、配役の名前、上演する音楽の曲目がならぶ見開きのプログラム",
          caption: "初演のプログラム（1895年）。左に「1895年2月14日初演」「毎晩9時開演」とあり、副題は「まじめな人々のための、つまらない喜劇」。ジャック、アルジャノン、執事レーンらの配役が並ぶ。",
          credit: { author: "作者不明", license: "CC0", licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en", source: "https://commons.wikimedia.org/wiki/File:The_Importance_of_Being_Earnest_Playbill_1895.jpg" },
        },
      ],
      cliff: "型を覚えれば、次に来る返事が予想できる。では、その予想がわざと裏切られたら？",
    },
    {
      heading: "会話文の空所は「前と後ろ」の両方から決める",
      body: "会話文の問題では、空所の{{直前の発話が何をしているか}}（質問・提案・お礼など）をまず見ます。次に、{{空所の後ろの発話}}がその答えに続くかを確かめます。前だけで選ぶと、意味は通っても後ろとかみ合わない選択肢にひっかかります。",
      reading: [
        "会話文の空所問題では、まず{{直前の発話が何をしているか}}を見ます。質問なのか、提案なのか、お礼なのか。それが分かれば、前の節で整理した「返し方」の候補がしぼれます。次に、{{空所の後ろの発話}}を読んで、話がつながるかを確かめます。たとえば A: Shall I carry your bag? B: (　) A: OK. Here you are. なら、空所には申し出を受ける Yes, please. が入ります。No, thank you. も申し出への返事としては自然ですが、後ろの「はい、どうぞ」とかみ合いません。",
        "つまり会話は、前の発話が後ろの返事を「予約」し、後ろの返事が前の発話を「確定」させる、くさりのようなものです。ネイティブの話し手どうしも、このくさりを頭の中で先回りしながら聞いています。だからこそ、くさりがわざと外されたとき、人は思わず笑ってしまいます。",
        "『真面目が肝心』でいちばん有名なのが、ジャックが結婚の許しを求めて、恋人の母ブラックネル夫人に面接される場面です。夫人はメモ帳を手に「たばこは吸いますか？」とたずねます。ジャックは、しかられるのを覚悟して「ええ、正直に言うと吸います」と答えます。観客もみな、次は「それはいけません」が来ると予想します。ところが夫人の返事は「それはよかった」。会話の型はそのままに、中身だけが180度ずれる。この{{型と中身のずれ}}が、ワイルドの笑いの正体です。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "Lady Bracknell: … Do you smoke?\nJack: Well, yes, I must admit I smoke.\nLady Bracknell: I am glad to hear it. A man should always have an occupation of some kind. There are far too many idle men in London as it is. How old are you?\nJack: Twenty-nine.\nLady Bracknell: A very good age to be married at. I have always been of opinion that a man who desires to get married should know either everything or nothing. Which do you know?\nJack: I know nothing, Lady Bracknell.",
        ja: "ブラックネル夫人：……たばこは吸いますか？\nジャック：ええ、その、正直に申しますと、吸います。\nブラックネル夫人：それを聞いて安心しました。殿方たるもの、いつも何かしら仕事を持っているべきです。ロンドンには、ただでさえ、ぶらぶらしている男が多すぎますからね。おいくつ？\nジャック：29です。\nブラックネル夫人：結婚するにはとてもよいお年ね。わたくしは前々から、結婚を望む殿方は、何もかも知っているか、何も知らないかのどちらかであるべきだと考えております。あなたはどちら？\nジャック：何も知りません、ブラックネル夫人。",
        cite: "Oscar Wilde, The Importance of Being Earnest, Act I (1895)",
        source: "https://www.gutenberg.org/ebooks/844",
      }],
      figure: {
        type: "flow",
        title: "空所の答えを決める手順",
        steps: [
          { label: "直前を見る", sub: "質問？提案？お礼？", tone: "blue" },
          { label: "候補をしぼる", sub: "はたらきの合う返事" },
          { label: "直後で確かめる", sub: "話がつながるか", tone: "yellow" },
        ],
      },
      reveal: "会話表現は、場面と相手との距離に合わせて選ぶ{{型}}で、言い方が決まれば{{返し方}}もほぼ決まります。だから観客は、たばこを吸うと白状した若者には「おやめなさい」が返ってくると、無意識に予想します。ワイルドは、{{ていねいさ}}も言い方と返し方の組も完璧に守ったまま、返事の中身だけを裏切りました。笑いは、前後のかみ合わせを知っている観客の頭の中で起こっていたのです。",
    },
  ],
  story: {
    kind: "manzai",
    title: "真面目が肝心、返事も肝心",
    cast: ["コハル", "リク"],
    lines: [
      { who: "コハル", text: "どうもー、コハルとリクです！　わたし、英語劇サークルに入りました。来月、イギリスの喜劇に出るんです！" },
      { who: "リク", text: "すごいね。会話表現はばっちり？" },
      { who: "コハル", text: "もちろん。きのう留学生に「窓を開けて」って頼むとき、Open the window! って大声で言った。", say: "もちろん。きのう留学生に、まどをあけてって頼むとき、オープン・ザ・ウィンドウ！って大声で言った。" },
      { who: "リク", text: "命令文！　知らない人には Could you open the window? くらいの{{ていねいさ}}がいいよ。", say: "命令文！ 知らない人には、クッジュー・オープン・ザ・ウィンドウ？くらいのていねいさがいいよ。" },
      { who: "コハル", text: "please をつけたのに？" },
      { who: "リク", text: "命令文に please だけだと、目上の人には指図に聞こえることもあるの。過去形の Could で一歩引くのがコツ。", say: "命令文にプリーズだけだと、目上の人には指図に聞こえることもあるの。過去形のクッドで、いっぽ引くのがコツ。" },
      { who: "コハル", text: "そのあと留学生に Do you mind if I sit here? って聞かれたから、笑顔で Yes! って答えた。", say: "そのあと留学生に、ドゥー・ユー・マインド・イフ・アイ・シット・ヒア？って聞かれたから、笑顔でイエス！って答えた。" },
      { who: "リク", text: "それ「いやです」って言ってる！　mind は{{いやだと思う}}。OK なら No, not at all.", say: "それ、いやですって言ってる！ マインドは、いやだと思う。オーケーなら、ノー・ノット・アット・オール。" },
      { who: "コハル", text: "だから留学生、立ったまま悲しそうだったのか……。" },
      { who: "リク", text: "気づいて！" },
      { who: "コハル", text: "でも先輩もひどいんだよ。練習のあと Why don't we go for lunch? って責められた。", say: "でも先輩もひどいんだよ。練習のあと、ホワイ・ドント・ウィー・ゴー・フォー・ランチ？って責められた。" },
      { who: "リク", text: "責めてない！　「なぜ行かないの」じゃなくて「お昼に行かない？」っていう{{提案}}だよ。", say: "責めてない！ なぜ行かないのじゃなくて、お昼に行かない？っていう提案だよ。" },
      { who: "コハル", text: "じゃあ Thanks a lot. って言われたときの返事は My pleasure. で合ってる？", say: "じゃあ、サンクス・ア・ロットって言われたときの返事は、マイ・プレジャーで合ってる？" },
      { who: "リク", text: "合ってる。言い方と返し方を{{セット}}で覚えると、会話文の空所問題もすぐ解ける。" },
      { who: "コハル", text: "そういえば劇の題名、『真面目が肝心』の「真面目」は earnest で、主人公の名前のアーネストとかけてるんだって。", say: "そういえば劇の題名、まじめがかんじんの、まじめは、アーネストで、主人公の名前のアーネストとかけてるんだって。" },
      { who: "リク", text: "そう、ワイルドの言葉遊び。登場人物はみんな礼儀正しいのに、返事の中身だけが予想を裏切るのがおかしいんだ。" },
      { who: "コハル", text: "たばこを吸うと白状したら「それはよかった」って返されるところ、最高だよね。" },
      { who: "リク", text: "会話の{{型}}を知ってるから、ずれで笑えるんだよ。" },
      { who: "コハル", text: "よし、わたしも型どおりに、本番前は真面目に練習します！" },
      { who: "リク", text: "えらい！" },
      { who: "コハル", text: "……と見せかけて、昼寝します。" },
      { who: "リク", text: "返事の中身だけ裏切るな！　もういいよ。" },
      { who: "コハル", text: "どうも、ありがとうございました！" },
    ],
    note: "コハルとリクは架空の人物で、会話はすべて創作です。漫才に出てくる英語は自作の例文で、作品のせりふではありません。『真面目が肝心』の初演（1895年）、題名の earnest と Ernest の言葉遊び、ブラックネル夫人がたばこを「よかった」と言う場面は、作品の事実にもとづいています。",
  },
  mistakes: [
    { wrong: "How do you think about this plan?", right: "What do you think about this plan?", why: "「どう思う？」は、思う内容（what）をたずねるので What を使います。How はやり方・様子をたずねる語です。" },
    { wrong: "Do you mind if I open the window? — Yes, sure.（どうぞ、のつもり）", right: "No, not at all.", why: "mind は「いやだと思う」。OK するときは No（いやではない）と答えます。" },
    { wrong: "Why don't you join us? →「なぜ参加しないの？」と責められていると思う", right: "「いっしょにやりませんか」という誘い", why: "Why don't you 〜? は相手への提案・誘いの決まった言い方です。" },
  ],
  check: [
    { q: "「（私が）荷物を持ちましょうか」を Shall で始めて言いましょう。", a: "Shall I carry your bag?", why: "Shall I 〜? は「私が〜しましょうか」という申し出。" },
    { q: "Would you like to come to the party? に「ぜひ行きたい」と答えるときの決まった言い方は？", a: "I'd love to.", why: "誘いを喜んで受けるときの言い方。to の後ろの come は省く。" },
    { q: "Would you mind closing the door? に「いいですよ」と答えるとき、Yes と No のどちらで始める？", a: "No（No, not at all. など）", why: "mind は「いやだと思う」。いやではないので No。" },
  ],
  next: [
    { label: "会話表現をカードで覚える", href: "/learn/eigo-ko/h-eng-vocab-kaiwa" },
    { label: "使って鍛える「スピーキング」", href: "/learn/eigo-ko/h-eng-skill-speaking" },
    { label: "関連「助動詞」（could・would・shall）", href: "/learn/eibunpo-ko/h-eng-gram-jodoshi" },
  ],
};
