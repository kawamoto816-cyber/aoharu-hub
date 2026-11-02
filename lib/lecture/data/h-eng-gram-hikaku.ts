import type { Lecture } from "../types";

const C = "/media/commons/h-eng-gram-hikaku";

export const H_ENG_GRAM_HIKAKU: Lecture = {
  unit: "h-eng-gram-hikaku",
  title: "比較は「同じ・より上・いちばん」の3段。そろえるのは比べる相手",
  hook: "「このスマホは前のより軽い」「クラスでいちばん足が速い」のように、私たちは毎日何かを比べています。英語の比較は、原級・比較級・最上級の3つの形と、それぞれの決まった型でできています。型と書きかえを押さえれば、長文の数字の比較も読み取れるようになります。",
  mystery: "ディケンズの『二都物語』は「最良の時代であり、最悪の時代でもあった」と、正反対の最上級を並べて始まり、「その時代は最上級でしか比べられなかった」と結ばれます。「いちばん」が2つ同時にあるなんて反則では？　しかもディケンズは、同じ物語の最後の一文を、最上級ではなく比較級で締めくくりました。なぜでしょう？",
  mission: {
    from: "高校演劇部の顧問（英語朗読劇の演出担当）",
    request: "文化祭で『二都物語』の英語朗読劇をやります。ところが部員から「最良で最悪って矛盾してませんか？」「最後のせりふは、なぜ『いちばん』じゃないんですか？」と聞かれ、演出の方針が決められずにいます。名探偵のあなたに、最上級と比較級にこめられたディケンズのたくらみを解き明かしてほしいのです。",
    thanks: "最上級は「どの範囲で」が命で、比較級は「だれと比べるか」が命なのですね。冒頭は大声の時代を皮肉る調子で、結びは自分の過去とだけ比べる静かな声で読む。演出が決まりました。",
  },
  sections: [
    {
      heading: "形容詞・副詞の3つの形",
      body: "比較の文では、形容詞・副詞を{{原級}}・{{比較級}}・{{最上級}}に変えます。短い語は {{-er / -est}}、長い語（多くの2音節語と3音節以上）は {{more / most}} を前に置きます。good・bad・many などは形が大きく変わる{{不規則変化}}なので、そのまま覚えます。",
      reading: [
        "英語の形容詞・副詞には、もとの形の{{原級}}、「より〜」の{{比較級}}、「いちばん〜」の{{最上級}}があります。tall → taller → tallest のように、短い語は語尾に -er / -est をつけます。beautiful のような長い語に -er をつけると beautifuller となり、言いにくく聞き取りにくいので、more beautiful / most beautiful と前に語を置きます。目安は音節の数で、1音節は -er、3音節以上は more。2音節は、happy → happier のように -y で終わる語は -er、useful・careful のような語は more になるのがふつうです。",
        "この境目を、わざと踏みこえてみせた名作があります。数学者でもあったルイス・キャロルが1865年に出した『不思議の国のアリス』です。体がぐんぐんのびてしまったアリスは、思わず Curiouser and curiouser!（ますますへんてこ！）とさけびます。curious は3音節なので、正しくは more and more curious。作者はすぐあとに、アリスは{{あまりにおどろいて、正しい英語の話し方を忘れてしまった}}と書き添えています。読者は「まちがい」に気づくからこそ笑えるわけで、このせりふはいまも英語圏で「奇妙さが増していく」ときの決まり文句として使われています。",
        "同じ場面でアリスは、自分の体を the largest telescope that ever was（これまでにあったいちばん大きな望遠鏡）にたとえます。最上級のあとに that ever was（今まで存在した中で）を添えると「史上最大」の意味になります。今の英語なら the largest telescope ever です。good → better → best、bad → worse → worst、many / much → more → most のような{{不規則変化}}は、古い英語から使われ続けてきた、よく使う語ほど形が変わりやすいというしるしでもあります。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "“Curiouser and curiouser!” cried Alice (she was so much surprised, that for the moment she quite forgot how to speak good English); “now I’m opening out like the largest telescope that ever was! Good-bye, feet!”",
        ja: "「ますます、へんてこりんの、こりんこりん！」とアリスはさけびました（あまりにおどろいたので、そのときばかりは正しい英語の話し方をすっかり忘れてしまったのです）。「今度は、これまでにあったどんな望遠鏡よりも長くのびていくみたい！　さようなら、足さん！」",
        cite: "Lewis Carroll, Alice's Adventures in Wonderland, Chapter II (1865)",
        source: "https://www.gutenberg.org/cache/epub/11/pg11.txt",
      }],
      photos: [
        {
          src: `${C}/alice-neck.webp`, width: 559, height: 1256,
          alt: "首が長くのびて、体が細長くなった少女が、目を丸くして立っている白黒の挿絵",
          caption: "テニエルの挿絵（『不思議の国のアリス』初版、1865年）。首がのびたアリス。この直前に Curiouser and curiouser! と、{{比較級}}の作り方をまちがえてさけぶ。",
          credit: { author: "John Tenniel", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Alice_par_John_Tenniel_05.png" },
        },
      ],
      figure: {
        type: "compare",
        title: "比較変化の例",
        columns: [{ title: "原級" }, { title: "比較級", tone: "blue" }, { title: "最上級", tone: "yellow" }],
        rows: [
          { cells: ["fast", "faster", "fastest"] },
          { cells: ["big", "bigger", "biggest"] },
          { cells: ["easy", "easier", "easiest"] },
          { cells: ["useful", "more useful", "most useful"] },
          { cells: ["good / well", "better", "best"] },
          { cells: ["many / much", "more", "most"] },
        ],
        note: "big は子音字を重ね、easy は y を i にかえる。",
      },
      cliff: "形がわかったら、次は「同じくらい」をどう言うか。実は倍数もこの型に入ります。",
    },
    {
      heading: "原級：as ... as で「同じくらい」、倍数もこの型",
      body: "{{as ＋原級＋ as}} は「〜と同じくらい…」です。否定の {{not as ... as}} は「〜ほど…でない」で、相手のほうが上になります。「〜の2倍…」は {{twice as ... as}}、3倍以上は three times as ... as のように、as の前に倍数を置きます。",
      reading: [
        "My bag is as heavy as yours.（私のかばんは、あなたのと同じくらい重い）のように、{{as ＋原級＋ as}} は2つのものが同じ程度であることを表します。前の as は「同じくらい」、後ろの as は「〜と比べて」の働きです。前の as は古い英語の「まったくそのように」という語が短くなったものといわれ、もともと強調の言葉でした。",
        "注意したいのは否定です。My bag is not as heavy as yours. は「私のかばんは、あなたのかばんほど重くない」で、重いのは相手のほうです。「同じではない」とだけ訳すと、どちらが上かがぬけ落ちます。長文で数字の比較が出たら、どちらが大きいのかを必ず確かめましょう。",
        "倍数は as の前に置きます。This tower is twice as tall as that one.（この塔はあの塔の2倍の高さだ）、half as much as（〜の半分）、three times as many as（〜の3倍の数）。英語には as busy as a bee（ハチのように忙しい）、as cool as a cucumber（キュウリのように落ち着きはらって）のように、as ... as を使った昔からのたとえも多く、頭韻（busy と bee の b）をふむものもあります。比べることは、ものを生き生きと描く道具でもあるのです。",
      ],
      figure: {
        type: "area",
        kind: "bar",
        title: "B is twice as heavy as A.",
        bars: [
          { label: "箱 A", parts: [{ value: 3, label: "3 kg", tone: "blue" }], total: "3 kg" },
          { label: "箱 B", parts: [{ value: 3, label: "3 kg", tone: "blue" }, { value: 3, label: "3 kg", tone: "yellow" }], total: "6 kg" },
        ],
        note: "A is not as heavy as B.（A は B ほど重くない）とも言える。",
      },
      cliff: "では「より上」を言う比較級は、演説の中でどんな力を発揮するのでしょう？",
    },
    {
      heading: "比較級：than で相手を示し、差は前に置く",
      body: "比較級は {{than}} で比べる相手を示します。「ずっと〜」と強めるときは {{much / far}} を比較級の前に置き、very は使いません。差の大きさは比較級の前に置きます（three years older than 〜）。{{The ＋比較級 〜, the ＋比較級 …}} は「〜すればするほど…」です。",
      reading: [
        "比較級の文で大事なのは、{{than}} のあとに何を置くか、つまり「だれと比べるか」です。This bag is lighter than that one. では、this bag と that one をそろえて比べています。差を強めるときは much / far を前に置き（much lighter）、差の大きさを数字で言うときも比較級の前に置きます（200 grams lighter）。",
        "比較級を武器にした演説として有名なのが、シェイクスピアが1599年ごろに書いた『ジュリアス・シーザー』のブルータスの演説です。ローマの英雄シーザーを暗殺したブルータスは、怒る市民の前に立ち、こう語ります。自分のシーザーへの愛は、だれにも no less than（〜に劣らない）。それでも立ち上がったのは、Not that I loved Caesar less, but that I loved Rome more.（シーザーを愛する心が小さかったからではない。ローマを愛する心が、それより大きかったからだ）。less と more を左右に置いた{{対句}}です。",
        "ブルータスは続けて Had you rather ... than ...?（〜と…と、どちらがよいか）と問いかけます。had rather は今の would rather にあたる古い形で、比較の than と組んで「どちらを選ぶか」を聴衆につきつけます。2つを並べて比べさせると、聞き手は「より大きいほう」を自分で選んだ気になるのです。けれどもこのすぐあと、アントニーが別の語り方で市民の心をひっくり返します。比較で人を動かす演説の力と危うさを、劇はまるごと見せてくれます。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "If there be any in this assembly, any dear friend of Caesar’s, to him I say that Brutus’ love to Caesar was no less than his. If then that friend demand why Brutus rose against Caesar, this is my answer: Not that I loved Caesar less, but that I loved Rome more. Had you rather Caesar were living, and die all slaves, than that Caesar were dead, to live all free men?",
        ja: "この集まりの中に、シーザーの親しい友がひとりでもいるなら、その人に言おう。ブルータスのシーザーへの愛は、あなたの愛に少しも劣らなかったと。では、なぜブルータスはシーザーにはむかったのかと、その友が問うなら、これがわたしの答えだ。シーザーを愛する心が小さかったからではない。ローマを愛する心が、それにまさっていたからだ。シーザーが生きていて、みなが奴隷として死ぬほうがよいのか。シーザーが死んで、みなが自由な人として生きるほうがよいのか。",
        cite: "William Shakespeare, Julius Caesar, Act 3, Scene 2 (1599)",
        source: "https://www.gutenberg.org/cache/epub/1522/pg1522.txt",
      }],
      figure: {
        type: "formula",
        title: "比較級の文を組み立てる",
        prose: true,
        steps: [
          { expr: "This bag is {{lighter than}} that one.", note: "基本の形" },
          { expr: "This bag is {{much}} lighter than that one.", note: "強めるのは much（very は ×）" },
          { expr: "This bag is {{200 grams}} lighter than that one.", note: "差は比較級の前" },
          { expr: "{{The more}} you practice, {{the better}} you play.", note: "〜すればするほど…" },
        ],
      },
      cliff: "比較級の上には最上級。ところが「いちばん」を2つ並べた、とんでもない書き出しがあります。",
    },
    {
      heading: "最上級と、その書きかえ",
      body: "最上級は {{the ＋最上級}}で「いちばん〜」です。範囲を示すとき、後ろが{{複数の仲間}}なら of（of the three）、{{場所や集団}}なら in（in my class）を使います。最上級の意味は、比較級や原級を使っても表せます。any other や No other の後ろの名詞は{{単数形}}にします。",
      reading: [
        "最上級は「ある範囲の中で1位」を言う形です。だから the tallest には、ふつう{{範囲}}がつきます。of the three（3人の中で）のように仲間の集まりなら of、in my class（クラスで）のように場所や集団なら in。範囲がなければ、「いちばん」は何の中の1位なのかわからなくなります。また Lake Biwa is the largest lake in Japan. は、larger than any other lake（ほかのどの湖よりも大きい）や No other lake is as large as ...（どの湖も…ほど大きくない）と書きかえられます。",
        "1859年、ディケンズは自分が始めた週刊誌『オール・ザ・イヤー・ラウンド』の創刊号から、『二都物語』の連載を始めました。ロンドンとパリ、2つの都を舞台に、フランス革命（1789年〜）の前後を生きた人々を描く物語です。その書き出しが It was the best of times, it was the worst of times（最良の時代であり、最悪の時代でもあった）。最上級の対が、知恵と愚かさ、光と闇、希望と絶望と、次々に重ねられていきます。",
        "そして段落の最後には、in the superlative degree of comparison only という言葉が置かれます。superlative degree of comparison は、文法用語そのままの「比較の最上級」。当時の声の大きい論者たちは、その時代を良くも悪くも「最上級でしか」語らせなかった、というのです。しかもディケンズは、その時代は the present period（いまの時代）とよく似ていたと書きそえます。物語の時代と、読者が生きる1859年とを重ねた、皮肉のきいた一文です。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way—in short, the period was so far like the present period, that some of its noisiest authorities insisted on its being received, for good or for evil, in the superlative degree of comparison only.",
        ja: "それは最良の時代であり、最悪の時代でもあった。知恵の時代であり、愚かさの時代でもあった。信じる時代であり、疑う時代でもあった。光の季節であり、闇の季節でもあった。希望の春であり、絶望の冬でもあった。わたしたちの前にはすべてがあり、何もなかった。みながまっすぐ天国へ向かい、みながまっすぐ反対の方へ向かっていた。つまりその時代は今の時代にとてもよく似ていて、いちばん声の大きな論者たちは、良きにつけ悪しきにつけ、この時代を最上級でしか語ってはならないと言いはったのだ。",
        cite: "Charles Dickens, A Tale of Two Cities, Book the First, Chapter I (1859)",
        source: "https://www.gutenberg.org/cache/epub/98/pg98.txt",
      }],
      photos: [
        {
          src: `${C}/two-cities-1859.webp`, width: 800, height: 691,
          alt: "左に木の下でテーブルを囲む人々の挿絵、右に A TALE OF TWO CITIES の題字と、牢の中で背を丸めてすわる男の小さな絵がある本の見開き",
          caption: "『二都物語』初版（1859年、ロンドン）の口絵と扉。挿絵はフィズ（H・K・ブラウン）。週刊誌の連載と並行して、月ごとの分冊でも売られた。",
          credit: { author: "Hablot Knight Browne (Phiz)", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Charles_Dickens-_A_Tale_of_Two_Cities-With_Illustrations_by_H_K_Browne,_1859.jpg" },
        },
        {
          src: `${C}/sea-rises.webp`, width: 800, height: 492,
          alt: "剣や斧、太鼓を手にした大勢の男女が、城の塔の見える通りへなだれこんでいく白黒の挿絵",
          caption: "フィズの挿絵「海が立ち上がる」。パリの民衆がバスティーユ牢獄へ押しよせる場面。冒頭の「{{最良}}で{{最悪}}の時代」は、この革命へ向かう時代のこと。",
          credit: { author: "Hablot Knight Browne (Phiz)", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:T2C_The_Sea_Rises,_by_Phiz.jpeg" },
        },
      ],
      figure: {
        type: "formula",
        title: "同じ意味を3つの形で",
        prose: true,
        steps: [
          { label: "最上級", expr: "Lake Biwa is {{the largest}} lake in Japan.", note: "いちばん大きい" },
          { label: "比較級", expr: "Lake Biwa is larger than {{any other lake}} in Japan.", note: "ほかのどの湖よりも" },
          { label: "比較級", expr: "{{No other lake}} in Japan is larger than Lake Biwa.", note: "どの湖も〜より大きくない" },
          { label: "原級", expr: "{{No other lake}} in Japan is {{as large as}} Lake Biwa.", note: "どの湖も〜ほど大きくない" },
        ],
      },
      cliff: "最上級で始まった物語は、なぜ比較級で終わるのか。結びの一文に答えがあります。",
    },
    {
      heading: "比べる相手を選ぶ：名作の結びは比較級",
      body: "比較級は than のあとに{{比べる相手}}を置く形なので、だれと比べるかで文の意味が決まります。{{比較級＋ than ＋主語＋ have ever 〜}} は「これまでに〜したどんなことよりも」で、最上級と同じくらい強い意味になります。相手を自分の過去にすると、他人との順位ではなく、自分の変化を語る文になります。",
      reading: [
        "比較級に than I have ever done（これまでに私がしたことより）や than I have ever seen（これまでに見たものより）をつなぐと、「今までのどれよりも」という意味になります。This is better than anything I have ever eaten. は、This is the best thing I have ever eaten. とほぼ同じ内容です。比較級でも、比べる相手を「これまでのすべて」にすれば、最上級と肩を並べる強さが出ます。",
        "『二都物語』の主人公の一人シドニー・カートンは、才能がありながら投げやりに生きてきた弁護士の助手です。彼は愛する女性ルーシーの家族を救うため、自分とそっくりな彼女の夫の身代わりとなって、パリでギロチンの台へ向かいます。物語の最後の一文は、カートンが心の中で語ったかもしれない言葉として書かれ、「これから自分がすることは、これまでにしてきたどんなことよりも、はるかによいことだ」という意味の、{{far で強めた比較級}}と than I have ever done の組み合わせで結ばれます。",
        "ここで比べる相手は、ほかの人でも時代でもなく、{{かつての自分}}です。冒頭の声の大きい人々は、時代を「最良」「最悪」と最上級で決めつけました。結びのカートンは、だれかと順位を争うのではなく、昔の自分より一歩よい自分を選びます。最上級で始まり比較級で終わるこの組み立てが、160年以上たった今も、英語圏で最も有名な書き出しと結びの一つとして読みつがれている理由の一つでしょう。",
      ],
      photos: [
        {
          src: `${C}/third-tumbril.webp`, width: 444, height: 576,
          alt: "荷車の上で、長い髪の男性が若い女性の両手を包むようににぎっている。下では群衆がこぶしを上げ、奥にギロチンが見える白黒の挿絵",
          caption: "フレッド・バーナードの挿絵「3台目の荷車」。カートン（左）が、おびえる若いお針子の手をにぎって処刑場へ向かう。物語はこのあと{{比較級}}の一文で結ばれる。",
          credit: { author: "Fred Barnard", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:T2C,_Fred_Barnard,_(III,_15)_The_Third_Tumbril,_Carton_with_another_blameless_victim.jpeg" },
        },
      ],
      figure: {
        type: "compare",
        title: "『二都物語』の書き出しと結び",
        columns: [{ title: "書き出し", tone: "blue" }, { title: "結び", tone: "yellow" }],
        rows: [
          { label: "形", cells: ["最上級（best / worst）", "比較級（far ＋比較級＋ than）"] },
          { label: "比べる相手", cells: ["範囲が言われない（時代全体）", "これまでの自分"] },
          { label: "声", cells: ["声の大きい人々の決めつけ", "ひとりの静かな決意"] },
        ],
      },
      reveal: "最上級は「ある範囲の中の1位」なので、範囲が変われば1位も変わります。豊かな人と貧しい人、ロンドンとパリでは、同じ時代が{{最良}}にも{{最悪}}にもなりえました。それでも声の大きい人々は範囲を言わずに最上級で決めつけた。ディケンズは文法用語 superlative degree of comparison を使って、その大げささを皮肉ったのです。そして結びでは、カートンが比べる相手を{{かつての自分}}に選びました。than のあとに自分の過去を置く比較級だからこそ、他人との順位ではない、ひとりの人間の変化が伝わるのです。",
    },
  ],
  story: {
    kind: "novel",
    title: "植字台の「いちばん」",
    paragraphs: [
      "1859年4月、ロンドン。印刷所の二階は、インクと油と、湿った紙のにおいでいっぱいだった。十四歳の植字見習いネッドは、左手に持った{{植字ステッキ}}に、鉛の活字を一本ずつ並べていく。その週、職人たちは新しい週刊誌の創刊号にかかりきりだった。値段は2ペンス。看板は、あの人気作家の新しい連載小説だという。",
      "ネッドに回ってきたのは、その連載の最初のページだった。原稿の文字は細くて、線で消したり上に書き足したりした跡だらけだ。It was the best of times, it was the worst of times. ネッドは同じ形の文をいくつも組み、ついに手を止めた。「親方、これ、まちがってません？　いちばんいい時代で、いちばん悪い時代って。いちばんは一つでしょう」",
      "親方のハリスさんは、眼鏡をおでこに押し上げて笑った。「学校で習ったろう。{{最上級}}は、どの中の一番かが言えて、はじめて意味が決まるんだ。おまえの家にとっていちばん悪い年が、どこかのお屋敷にとってはいちばんいい年かもしれん」。それから段落の最後を指でたたいた。「ほら、ここだ。in the superlative degree of comparison only。最上級でしか比べられない。何でも『史上最高』『史上最悪』と言いたがる連中への、皮肉さ」",
      "ネッドは思い当たった。通りの角では毎朝、新聞売りが「史上最大の事件！」と声をはりあげている。先週も、その前の週も、史上最大だった。「じゃあ、この作家は、むかしのフランスの話を書きながら、今のロンドンのことも言ってるんですね」。ハリスさんは返事のかわりに、活字のケースをネッドのほうへ押しやった。",
      "連載は毎週続いた。パリの民衆が牢獄へなだれこみ、2つの都の人々の運命がからみあっていく。ネッドは組みながら先を知ってしまう自分を、少しだけ得意に思った。",
      "11月の終わり、最後の回の原稿が届いた。身代わりになってギロチンへ向かう男、カートンの最後の言葉を組みながら、ネッドの指は何度も止まった。「これまでにしてきたどんなことよりも、はるかによいこと」。最上級ではない。than のあとに置かれているのは、ほかのだれでもない、昔の自分だった。",
      "「親方。最後は、いちばんじゃないんですね」。ハリスさんは、組み上がった版をしばらく黙って見ていた。「いちばんかどうかは、他人が決める。より良いかどうかは、自分で決められる」。窓の外では、新聞売りが今日も「史上最大！」とさけんでいた。ネッドは最後の行のピリオドを、そっと活字の列に置いた。",
    ],
    sayFix: { "植字": "しょくじ", "活字": "かつじ", "二階": "にかい", "親方": "おやかた" },
    note: "ネッド、ハリスさん、印刷所の場面、会話や心情は創作です。ディケンズの週刊誌『オール・ザ・イヤー・ラウンド』が1859年4月に2ペンスで創刊され、『二都物語』がその創刊号から11月末まで連載されたこと、書き出しの英文（照合済み）と物語の筋は事実・原作にもとづいています。結びの一文は英文を引用せず、意味を日本語で紹介しています。",
  },
  mistakes: [
    { wrong: "My brother is more taller than me.", right: "My brother is taller than me.", why: "-er の比較級に more を重ねません。" },
    { wrong: "This question is very easier than that one.", right: "This question is much easier than that one.", why: "比較級を強めるのは much / far。very は原級を強めます。" },
    { wrong: "She is the fastest runner of our school.", right: "She is the fastest runner in our school.", why: "学校・クラスのような範囲（集団）には in を使います。" },
    { wrong: "He is taller than any other students.", right: "He is taller than any other student.", why: "any other の後ろの名詞は単数形です。" },
  ],
  check: [
    { q: "This room is three times ___ ___ as mine.（広さ large）", a: "as large", why: "倍数は as ＋原級＋ as の前に置く。" },
    { q: "Tom is the tallest ___ the five boys. の ___ は？", a: "of", why: "後ろが複数の仲間（the five boys）なので of。" },
    { q: "「早く出発すればするほど、早く着く」を英語に。（leave / arrive）", a: "The earlier you leave, the earlier you (will) arrive.", why: "The ＋比較級 〜, the ＋比較級 … の型。" },
  ],
  next: [
    { label: "4択ドリル「比較」に挑戦", href: "/learn/eibunpo-ko/h-eng-gram-hikaku" },
    { label: "関連「形容詞・副詞」", href: "/learn/eibunpo-ko/h-eng-gram-keiyoshi" },
    { label: "関連「否定・倒置・強調・省略」", href: "/learn/eibunpo-ko/h-eng-gram-tokushu" },
  ],
};
