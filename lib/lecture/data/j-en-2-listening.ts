import type { Lecture } from "../types";

const M = "/media/commons/j-en-2-listening";

export const J_EN_2_LISTENING: Lecture = {
  unit: "j-en-2-listening",
  title: "リスニングは「さそい・お願い」の返事と、話の「変更」を聞きのがさない",
  hook: "中2のリスニングでは会話が少し長くなり、予定が途中で変わったり、時刻を計算したりする問題がふえます。聞こえた数字をそのまま選ぶと引っかかることも多いです。どこで答えが決まるのか、{{合図になることば}}を知っておきましょう。",
  mystery: "1933年、アメリカでは銀行がつぎつぎに閉まり、人々はお金を引き出そうと押し寄せていました。ルーズベルト大統領は、顔も図も見えないラジオで、銀行のしくみというむずかしい話を十数分語っただけ。それなのに、多くの人が落ち着きを取りもどしたといわれます。耳だけで聞く英語が、なぜそんなに伝わったのでしょう？",
  mission: {
    from: "英語の校内放送を始める、中学校の放送部の顧問の先生",
    request: "来月から、昼の校内放送で英語のコーナーを始めます。ところが試しに流してみると、「長くて、何の話か分からなかった」という声ばかり。耳だけで聞く英語を、どうすれば最後まで聞いてもらえるのか。90年以上前、ラジオで国じゅうに語りかけた大統領の話が伝わったわけを、名探偵のあなたに解き明かしてほしいのです。",
    thanks: "聞き手のために合図を置けば、耳だけでも話は届く。予告する、区切る、身近な物と比べる、短く締める。放送部の原稿にも、さっそく取り入れてみます。",
  },
  sections: [
    {
      heading: "さそい・お願いには決まった返し方がある",
      body: "会話の最後が Shall we 〜? や Will you 〜? のときは、それに合う{{返事}}を選ぶ問題がよく出ます。さそいには Yes, let's. や That's a good idea.、お願いには Sure. や All right. のように、{{決まった返し方}}をセットで覚えておくと、聞いた瞬間に答えが選べます。",
      figure: {
        type: "compare",
        title: "言われた文と返事の例",
        columns: [{ title: "言われた文" }, { title: "返事の例", tone: "yellow" }],
        rows: [
          { label: "さそい", cells: ["Shall we 〜?", "Yes, let's."] },
          { label: "さそい", cells: ["Why don't we 〜?", "That's a good idea."] },
          { label: "お願い", cells: ["Will you 〜?", "Sure. / All right."] },
          { label: "申し出", cells: ["Shall I 〜?", "Yes, please."] },
          { label: "許可", cells: ["May I 〜?", "Sure. / Of course."] },
        ],
        note: "ことわるときは Sorry, I can't. のあとに理由が続くことが多い。",
      },
      reading: [
        "1930年代のアメリカでは、ラジオが家庭の中心にありました。テレビはまだなく、夕食のあと家族が大きなラジオの前に集まり、ニュースや音楽、ドラマを耳だけで楽しんだのです。リスニングのテストも、この時代の聞き手と同じく、絵も字幕もない音だけの勝負です。そこで役に立つのが、会話には「型」があるという知識です。",
        "英語の会話では、言われた文と返事が{{決まった返し方}}のセットになっていることがよくあります。Shall we go to the library?（図書館に行きましょうか）は{{さそい}}なので、Yes, let's.（ええ、そうしましょう）や That's a good idea.（いい考えだね）と返します。Will you open the window?（窓を開けてくれますか）は{{お願い}}なので、Sure.（いいよ）や All right.（わかった）。Shall I carry your bag?（かばんを持ちましょうか）は申し出で、Yes, please.（お願いします）です。",
        "大切なのは、文の最初の2〜3語で場面を見分けることです。Shall we 〜? に Yes, I do. と答えるのは、形が合いません。最初の数語で「さそい・お願い・申し出」が分かれば、選択肢を聞く前に答えの形が予想できます。ちなみに Let's は Let us を縮めた形です。演説では Let us 〜（〜しようではありませんか）と、聞き手みんなをさそう言い方として使われます。この単元の最後に、ある大統領の Let us が登場します。",
      ],
      photos: [
        {
          src: `${M}/radio-listener.webp`, width: 800, height: 871,
          alt: "壁ぎわの木の大きなラジオのそばで、作業着と長ぐつのまま、パイプをくわえてすわる男性",
          caption: "1938年、ウェストバージニア州の家でラジオを聞く男性（議会図書館の記録写真）。テレビのない1930年代、ラジオは家庭に声とニュースを届ける中心だった。",
          credit: { author: "Marion Post Wolcott", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:1938_radio_listener_in_Westover,_West_Virginia_Library_of_Congress_fsa2000030730.jpg" },
        },
      ],
      cliff: "ある夜、国じゅうの人がラジオで聞いた大統領の話。そこにも「話が変わる合図」がありました。",
    },
    {
      heading: "But や Actually のあとに答えがある",
      body: "会話の中で But・Actually・Sorry などが聞こえたら、{{予定や考えが変わる合図}}です。最初に出た予定ではなく、{{変わったあとの内容}}が答えになることがよくあります。合図のことばのあとは、とくに集中して聞きましょう。",
      figure: {
        type: "cause",
        title: "話が変わる合図",
        causes: [
          { label: "But …", sub: "でも" },
          { label: "Actually …", sub: "実は" },
          { label: "Sorry, I can't.", sub: "ことわり" },
        ],
        effect: { label: "話が変わる", tone: "yellow" },
        chain: [{ label: "変わったあとが答え", tone: "red" }],
      },
      reading: [
        "1929年にニューヨークで株価が大暴落したあと、アメリカは{{大恐慌}}とよばれる深刻な不景気におちいりました。「銀行がつぶれるかもしれない」といううわさが広がると、人々は預金を引き出そうと銀行に押し寄せます。銀行は預かったお金を全部は手元に置いていないので、引き出しが重なると本当に払えなくなり、つぎつぎに閉まっていきました。1933年3月、就任したばかりのフランクリン・ルーズベルト大統領は、全国の銀行をいったん休ませる決定をします。",
        "そして3月12日の日曜の夜、ルーズベルトはラジオで国民に直接語りかけました。のちに{{炉辺談話}}（ファイアサイド・チャット）とよばれる放送の第1回です。彼はまず、人々の思いこみを打ち消しました。銀行はお金を金庫にしまっておくのではない（does not）、それを（It）さまざまな貸し付けに回しているのだ、と。否定のあとに、本当のことが続く形です。",
        "リスニングの会話も同じつくりです。But・Actually・Sorry が聞こえたら、{{予定や考えが変わる合図}}。A: Let's play tennis on Saturday. B: Sounds good. But actually, it will rain on Saturday. How about Sunday?（土曜にテニスしよう／いいね。でも実は土曜は雨なんだ。日曜はどう？）なら、答えは日曜です。最初に出た情報は、あとで打ち消される情報かもしれません。合図のあとの{{変わったあとの内容}}をつかみましょう。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "us",
        text: "First of all, let me state the simple fact that when you deposit money in a bank the bank does not put the money into a safe deposit vault. It invests your money in many different forms of credit—bonds, commercial paper, mortgages and many other kinds of loans.",
        ja: "まず最初に、かんたんな事実を申し上げましょう。みなさんが銀行にお金を預けても、銀行はそのお金を金庫にしまっておくわけではありません。銀行はみなさんのお金を、さまざまな形の貸し付けに回しているのです。債券、手形、住宅ローン、そのほか多くの種類の貸し出しに。",
        cite: "Franklin D. Roosevelt, Fireside Chat on Banking (March 12, 1933)",
        source: "https://www.presidency.ucsb.edu/documents/fireside-chat-banking",
      }],
      photos: [
        {
          src: `${M}/bank-run.webp`, width: 587, height: 477,
          alt: "帽子とコート姿の大勢の人が、石づくりの銀行の入り口の前の歩道を埋めつくしている白黒写真",
          caption: "1933年2月28日、アメリカの銀行の前に集まった預金者たち（米国国立公文書館）。引き出しを制限すると発表され、人々が押し寄せた。{{大恐慌}}のさなかの光景。",
          credit: { author: "撮影者不明", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Bank_Run_in_Michigan,_USA,_February_1933.jpg" },
        },
      ],
      cliff: "うわさで動いた人々に、大統領は「どっちが安全か」を比べてみせます。聞き方のコツは数字と同じです。",
    },
    {
      heading: "時刻や金額は、計算してから答える",
      body: "「映画は3時に始まる。{{30分前}}に会おう」なら、答えは2時30分です。before・after・〜 minutes later などは{{計算の合図}}なので、聞こえた数字をメモし、計算してから選びます。選択肢には、計算前の数字がわざと入っていることがあります。",
      figure: {
        type: "formula",
        title: "待ち合わせの時刻を求める",
        prose: true,
        steps: [
          { label: "聞こえた", expr: "The movie starts at {{three}}.", note: "始まるのは3時" },
          { label: "合図", expr: "Let's meet {{thirty minutes before}} it.", note: "30分前に会う" },
          { label: "計算", expr: "3:00 − 30分 ＝ {{2:30}}", note: "答えは 2時30分" },
        ],
      },
      reading: [
        "ルーズベルトは放送の後半で、再開した銀行にお金を預けるほうが、マットレスの下にしまっておくより安全だ、と言い切りました。家にお金をかくす人が多かったので、だれもが思いうかべられる「マットレスの下」と比べたのです。safer（より安全な）〜 than …（…より）のような比較では、{{何と何を比べて、どっちが上か}}を聞きのがすと、意味が正反対になってしまいます。",
        "時刻や金額も、聞こえた数字がそのまま答えとはかぎりません。The movie starts at three. Let's meet thirty minutes before it.（映画は3時に始まる。その30分前に会おう）なら、会うのは2時30分。before・after・〜 minutes later・half（半分）・twice（2倍）などは{{計算の合図}}です。The ticket is ten dollars, but it's half price for students.（チケットは10ドル、でも学生は半額）なら、学生が払うのは5ドルです。",
        "アメリカは国土が広く、東海岸と西海岸では時刻が3時間ずれています。全国に同時に流れるラジオ放送も、東部で夜10時なら、西海岸ではまだ夜7時です。聞こえた数字に「どこの時刻か」「何分前か」を足し引きする習慣は、テストだけでなく、英語で実際に予定を立てるときにも役立ちます。メモには数字と合図のことばを並べて書き、計算してから選びましょう。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "us",
        text: "I can assure you that it is safer to keep your money in a reopened bank than under the mattress.",
        ja: "はっきり申し上げます。お金は、マットレスの下にしまっておくより、再開した銀行に預けておくほうが安全なのです。",
        cite: "Franklin D. Roosevelt, Fireside Chat on Banking (March 12, 1933)",
        source: "https://www.presidency.ucsb.edu/documents/fireside-chat-banking",
      }],
      cliff: "十数分の放送を最後まで聞いて要点をつかむには？　大統領は最初の一文でヒントを出していました。",
    },
    {
      heading: "長い英文は「だれ・いつ・どこ・何」をメモする",
      body: "スピーチや案内などの長い英文では、{{だれが・いつ・どこで・何を・なぜ}}を短くメモします。全部を書き取ろうとせず、{{キーワード}}だけを日本語や数字で書きましょう。質問が英文のあとに読まれる問題では、メモを見ながら答えを選びます。",
      reading: [
        "炉辺談話の第1回で、ルーズベルトは話の初めに、これから何をどんな順に話すのかを予告しました。この数日で何がなされたか（what）、なぜなされたか（why）、次の段階は何か（what the next steps are）。聞き手は、この3つの「箱」を頭に用意してから中身を聞けたのです。紙に書いた文書なら読み返せますが、ラジオの声は一度きり。だからこそ、最初に地図をわたしたのです。",
        "長い英文のリスニングでも、最初の1〜2文に話題や順序の予告があることがよくあります。そこで{{だれが・いつ・どこで・何を・なぜ}}の欄を作るつもりで、{{キーワード}}だけをメモしましょう。全部を書き取ろうとすると、書いているあいだに次の文が流れていきます。数字はそのまま、人や場所はカタカナや頭文字、理由は because のあとの一語で十分です。",
        "First・Second・Finally（最初に・2番目に・最後に）、for example（たとえば）、so（だから）なども、話の組み立てを知らせる合図です。メモに番号や矢印を使っておけば、あとで質問が読まれたとき、どこを見ればよいかがすぐに分かります。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "us",
        text: "I want to tell you what has been done in the last few days, why it was done, and what the next steps are going to be.",
        ja: "この数日のあいだに何がなされたのか、それはなぜなのか、そして次の段階は何になるのかを、みなさんにお話ししたいと思います。",
        cite: "Franklin D. Roosevelt, Fireside Chat on Banking (March 12, 1933)",
        source: "https://www.presidency.ucsb.edu/documents/fireside-chat-banking",
      }],
      cliff: "語り終える前に、大統領は聞き手一人ひとりに何を呼びかけたのでしょう？",
    },
    {
      heading: "名演説を耳で味わう：ラジオの声が「わたしへの話」になった",
      body: "炉辺談話は、大統領が国民一人ひとりに you と語りかける、会話のような放送でした。話の予告、区切りのことば、身近な物との比較、短い結び。耳で聞く人のための工夫は、リスニングで答えを決める{{合図になることば}}と同じものです。",
      reading: [
        "第1回の炉辺談話の結びで、ルーズベルトは、うわさやあて推量に流されないでほしいと語り、Let us unite in banishing fear.（恐れを追いはらうために、力を合わせよう）と呼びかけました。さそいの Let's と同じ形です。続けて、これは私の問題であるのと同じくらい、あなたがたの問題なのだと言い、最後を Together we cannot fail.（ともにあれば、失敗するはずがない）という、わずか4語の文で結びます。",
        "この語りが心に残るのは、耳で聞く人のための工夫が重なっているからです。最初に話の順序を予告し、First of all で区切り、does not で思いこみを打ち消してから本当のことを言い、than でマットレスという身近な物と比べ、最後は短い文で終える。ルーズベルトはラジオで国民によく My friends と呼びかけ、むずかしい語より日常のやさしい語を選んだといわれます。",
        "銀行は翌日から順に営業を再開し、引き出しに押し寄せる騒ぎはおさまっていったと伝えられています。「炉辺談話」というよび名は、暖炉のそばで家族に話すような語り口から放送局の人がつけたもので、ルーズベルトは1944年までにおよそ30回、ラジオで国民に語りかけました。話し手が聞き手のために置いた合図に気づけば、英語のリスニングは「ただ聞こえる音」から「わたしに話しかけてくる声」に変わります。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "us",
        text: "You people must have faith; you must not be stampeded by rumors or guesses. Let us unite in banishing fear. We have provided the machinery to restore our financial system; it is up to you to support and make it work.\nIt is your problem no less than it is mine. Together we cannot fail.",
        ja: "みなさん、信じてください。うわさやあて推量にあわてて流されてはいけません。恐れを追いはらうために、力を合わせようではありませんか。わたしたちは金融のしくみを立て直すための仕組みを用意しました。それを支え、動かしていくのは、みなさんです。\nこれはわたしの問題であるのと同じくらい、みなさんの問題なのです。ともにあれば、失敗するはずがありません。",
        cite: "Franklin D. Roosevelt, Fireside Chat on Banking (March 12, 1933)",
        source: "https://www.presidency.ucsb.edu/documents/fireside-chat-banking",
      }],
      photos: [
        {
          src: `${M}/first-fireside.webp`, width: 800, height: 1017,
          alt: "厚いカーテンの前の机に向かってすわる背広の男性。机の上に古い形のマイクが何本も並んでいる",
          caption: "1933年3月12日、ホワイトハウスから第1回の{{炉辺談話}}を放送するルーズベルト大統領（米国国立公文書館）。机の上に放送局のマイクが並ぶ。",
          credit: { author: "米国国立公文書館（フランクリン・D・ルーズベルト図書館）", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:President_Franklin_D._Roosevelt_Broadcasting_his_First_Fireside_Chat_Regarding_the_Banking_Crisis,_from_the_White_House,_Washington,_DC_-_DPLA_-_eaf235889aa202a7a7546265511148c4.jpg" },
        },
      ],
      reveal: "ルーズベルトは、耳だけで聞く人のために話を組み立てていました。最初に「何を・なぜ・次は」と予告し、First of all で区切り、does not で思いこみを打ち消してから本当のことを言い、than で身近なマットレスと比べ、最後は Let us のさそいと短い一文で結ぶ。これはどれも、リスニングで答えを決める{{合図になることば}}です。合図があったから、聞き手は迷わずに要点をつかめたのです。",
    },
  ],
  story: {
    kind: "manzai",
    title: "炉辺でたき火はしないでください",
    cast: ["コタ", "ユイ"],
    lines: [
      { who: "コタ", text: "どうもー、コタとユイです！　ぼく、英語のラジオ番組を始めることにしました！" },
      { who: "ユイ", text: "いきなりだね。番組の名前は？" },
      { who: "コタ", text: "「炉辺談話」。ルーズベルト大統領のまね。暖炉の前で、たき火をしながらしゃべるんでしょ？" },
      { who: "ユイ", text: "部屋で火をたかないで！　{{炉辺談話}}は、暖炉のそばで家族に話すような、うちとけた語り口だったからついたよび名。第1回は、ホワイトハウスの机でマイクに向かって話したの。" },
      { who: "コタ", text: "じゃあ相方をさそうよ。Shall we start?", say: "じゃあ相方をさそうよ。シャル・ウィー・スタート？" },
      { who: "ユイ", text: "Yes, let's.", say: "イエス、レッツ。" },
      { who: "コタ", text: "あれ？　そこは Yes, I do. じゃないの？", say: "あれ？ そこはイエス・アイ・ドゥーじゃないの？" },
      { who: "ユイ", text: "ちがう！　Shall we 〜? は{{さそい}}だから Yes, let's.。Will you 〜? の{{お願い}}なら Sure.。返し方はセットで覚えるの。", say: "ちがう！ シャル・ウィーは、さそいだからイエス・レッツ。ウィル・ユーのお願いならシュア。返し方はセットで覚えるの。" },
      { who: "コタ", text: "最初のコーナーはお便り。「Let's meet on Saturday. Actually, I have a test. How about Sunday?」……よし、土曜に集合！", say: "最初のコーナーはおたより。レッツ・ミート・オン・サタデー。アクチュアリー、アイ・ハブ・ア・テスト。ハウ・アバウト・サンデー？……よし、土曜に集合！" },
      { who: "ユイ", text: "Actually のあとで{{予定が変わってる}}！　会うのは日曜。", say: "アクチュアリーのあとで予定が変わってる！ 会うのは日曜。" },
      { who: "コタ", text: "次のお便り。「The show starts at seven. Let's meet thirty minutes before.」7時集合だね！", say: "次のおたより。ザ・ショー・スターツ・アット・セブン。レッツ・ミート・サーティ・ミニッツ・ビフォー。しちじ集合だね！" },
      { who: "ユイ", text: "before は{{計算の合図}}！　7時の30分前だから、6時30分。", say: "ビフォーは計算の合図！ しちじの、さんじゅっぷん前だから、ろくじさんじゅっぷん。" },
      { who: "コタ", text: "大統領の名ぜりふも言いたい。It is safer to keep your money in a reopened bank than under the mattress. つまり、マットレスはお金のかくし場所としておすすめ！", say: "大統領の名ぜりふも言いたい。イット・イズ・セイファー・トゥ・キープ・ユア・マネー・イン・ア・リオープンド・バンク・ザン・アンダー・ザ・マットレス。つまり、マットレスはお金のかくし場所としておすすめ！" },
      { who: "ユイ", text: "逆！　than で比べて、再開した銀行のほうがマットレスの下より安全って言ってるの。{{どっちが上か}}を聞きのがさない！", say: "逆！ ザンで比べて、再開した銀行のほうがマットレスの下より安全って言ってるの。どっちが上かを聞きのがさない！" },
      { who: "コタ", text: "でもさ、英語の放送って長いと、最初のほうを忘れちゃう。" },
      { who: "ユイ", text: "全部書き取らなくていい。{{だれが・いつ・どこで・何を・なぜ}}を{{キーワード}}でメモ。大統領も最初に「何をしたか・なぜか・次は何か」って予告してたでしょ。" },
      { who: "コタ", text: "よし、最後は大統領の決めぜりふで締めよう。Together we cannot fail. 「いっしょだと失敗できない」……プレッシャーがすごいね。", say: "よし、最後は大統領の決めぜりふで締めよう。トゥギャザー・ウィー・キャンノット・フェイル。いっしょだと失敗できない……プレッシャーがすごいね。" },
      { who: "ユイ", text: "「ともにあれば、失敗するはずがない」！　みんなで力を合わせようっていう、はげましの言葉だよ。" },
      { who: "コタ", text: "じゃあユイ、ぼくといっしょに番組を……Shall we?", say: "じゃあユイ、ぼくといっしょに番組を……シャル・ウィー？" },
      { who: "ユイ", text: "Sorry, I can't.", say: "ソーリー、アイ・キャント。" },
      { who: "コタ", text: "Sorry のあとで話が変わった！", say: "ソーリーのあとで話が変わった！" },
      { who: "ユイ", text: "そこだけはちゃんと聞けてる！　もういいよ。" },
      { who: "コタ", text: "どうも、ありがとうございました！" },
    ],
    note: "コタとユイは架空の人物で、会話はすべて創作です。1933年3月12日の第1回炉辺談話、その英文（米国政府の著作物）と放送の背景は史実にもとづいています。お便りの英文は自作です。",
  },
  mistakes: [
    { wrong: "Shall we play tennis? — Yes, I do.", right: "Yes, let's.", why: "Shall we 〜?（〜しましょうか）はさそい。Yes, let's. で答えます。" },
    { wrong: "会話の最初に出た予定を答える", right: "But や Actually のあとの予定を答える", why: "合図のことばのあとで予定が変わることが多いからです。" },
    { wrong: "「3時に始まる」と聞いて 3:00 を選ぶ", right: "before・after を聞いて計算する", why: "質問が聞いているのは「会う時刻」など、計算したあとの数字のことがあります。" },
  ],
  check: [
    { q: "Will you help me? への返事として合うのは「Sure.」と「Yes, let's.」のどっち？", a: "Sure.", why: "Will you 〜? はお願い。Yes, let's. はさそいへの返事。" },
    { q: "A: Let's meet at ten. B: Sorry, I can't. How about eleven? A: OK. 2人が会うのは何時？", a: "11時", why: "Sorry のあとで予定が変わり、A が OK と言っている。" },
    { q: "The bus leaves at 4:15. Let's be there ten minutes before. 何時にバス停に行く？", a: "4時5分", why: "4:15 の10分前（before）。" },
  ],
  next: [
    { label: "4択ドリル「リスニング」に挑戦", href: "/learn/eigo-chu/j-en-2-listening" },
    { label: "復習「リスニング（中1）」のレクチャー", href: "/learn/lecture/j-en-1-listening" },
    { label: "Shall I 〜? などの「助動詞」のレクチャー", href: "/learn/lecture/j-en-2-jodoshi" },
  ],
};
