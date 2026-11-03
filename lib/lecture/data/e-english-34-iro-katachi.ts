import type { Lecture } from "../types";

const C = "/media/commons/e-english-34-iro-katachi";

export const E_ENGLISH_34_IRO_KATACHI: Lecture = {
  unit: "e-english-34-iro-katachi",
  title: "色を先に、形を後に。a red circle のように言う",
  hook: "クレヨンの箱や、交通安全のマーク、トランプのマークなど、身の回りは色と形であふれています。色と形の言葉を英語《えいご》で言えると、「赤い丸をかいて」「青い星はどこ？」のように、友だちと遊びながら話せるようになります。",
  mystery: "英語《えいご》では「りんごが好《す》き」を I like apples. と言い、日本語と言葉の順番《じゅんばん》が逆《ぎゃく》になることがよくあります。それなのに、「赤い丸」はなぜ、日本語と同じ順番《じゅんばん》の a red circle なのでしょう？",
  mission: {
    from: "駅前の交番のおまわりさん",
    request: "来週、交番の前で、英語《えいご》を話す子どもたちに交通安全のお話をします。「止まれの標識《ひょうしき》は、赤い三角だよ」と英語《えいご》で言いたいのですが、英語《えいご》は日本語と順番《じゅんばん》が逆《ぎゃく》だと聞いて、red triangle と triangle red のどちらか、まよっています。名探偵《めいたんてい》のあなたに、色と形を言う順番《じゅんばん》のなぞをといてほしいのです。",
    thanks: "色は「どんな形か」を表す、ようすの言葉だから、形の前に来るのですね。これで子どもたちに、標識《ひょうしき》を指さしながら This is a red triangle. Stop! と、自信《じしん》をもって教えられます。",
  },
  sections: [
    {
      heading: "色の言葉は、身の回りの物と結《むす》びつけて覚《おぼ》える",
      body: "色の言葉は、聞いたらすぐにその色が思いうかぶようにしておくことが大切です。先生の言う{{red}}を聞いたら、赤い物を指さしてみましょう。りんごやトマトを見たら red、空を見たら blue のように、{{物と色を結《むす》びつけて}}声に出すと覚《おぼ》えやすくなります。",
      reading: [
        "学校へ行くとちゅうの信号《しんごう》を思いうかべてください。赤は「止まれ」、黄色は「注意」、青は「進め」。色は、字を読まなくても、一目で意味が分かるふしぎな力をもっています。だから世界中の道路で、色が合図に使われているのです。",
        "英語《えいご》では、赤は{{red}}、黄色は{{yellow}}です。では、日本で「青信号《しんごう》」とよぶ色は、英語《えいご》で何と言うでしょう。答えは{{green}}（緑）で、a green light とよびます。下の写真の信号《しんごう》をよく見ると、「青」は青と緑の間のような色ですね。色の名前の分け方は、国の言葉によって少しずつちがうのです。",
        "色の言葉を覚《おぼ》えるこつは、物と結《むす》びつけることです。トマトを見たら red、バナナを見たら yellow、木の葉を見たら green と、心の中で言ってみましょう。先生や音声の英語《えいご》をよく聞いて、そのとおりにまねをすると、口が先に覚《おぼ》えてくれます。",
      ],
      photos: [
        {
          src: `${C}/shingo.webp`, width: 800, height: 450,
          alt: "マンションの前の交差点《こうさてん》に、横向きの信号《しんごう》がついている。左から緑っぽい青、黄色、赤のランプがならぶ",
          caption: "日本の信号《しんごう》（千葉県）。左のランプが「青」ですが、英語《えいご》ではこの色を{{green}}とよびます。",
          credit: { author: "Red Whale", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:Traffic_Light_in_Chiba,_Japan_in_Aug_2016.png" },
        },
      ],
      cliff: "色が言えたら、次は形。「止まれ」の標識《ひょうしき》は、どんな形でしょう？",
      figure: {
        type: "compare",
        title: "色の言葉と、その色の物",
        columns: [{ title: "英語《えいご》", tone: "blue" }, { title: "その色の物（例《れい》）" }],
        rows: [
          { label: "赤", cells: ["red", "りんご・トマト"] },
          { label: "青", cells: ["blue", "晴れた日の空"] },
          { label: "黄色", cells: ["yellow", "バナナ・ひよこ"] },
          { label: "緑", cells: ["green", "木の葉・ピーマン"] },
          { label: "白", cells: ["white", "雪・牛乳《ぎゅうにゅう》"] },
          { label: "黒", cells: ["black", "夜の空・黒板消し"] },
        ],
        note: "ほかにも purple（むらさき）、pink（ピンク）、orange（オレンジ色）、brown（茶色）がある。",
      },
    },
    {
      heading: "形の言葉は、角と線で見分ける",
      body: "形を表す言葉も覚《おぼ》えましょう。{{circle}}は丸、{{triangle}}は三角、{{square}}は正方形です。角がいくつあるか、まがった線があるかを見ると、どの言葉か考えやすくなります。triangle の tri は「3」を表すので、角が3つの形です。",
      reading: [
        "次は形です。丸は{{circle}}、三角は{{triangle}}、正方形は{{square}}、星は{{star}}、ハートは{{heart}}と言います。トランプの♦のマークは、英語《えいご》で{{diamond}}（ダイヤモンド）です。形の言葉は、指で空中に形をかきながら言うと、覚《おぼ》えやすくなります。",
        "通学路の「止まれ」の標識《ひょうしき》を思い出してください。日本では、赤い{{逆《さか》さまの三角}}の形をしています。運転する人が遠くからでも形で気づけるように、ほかの標識《ひょうしき》とはちがう形にしてあるのです。色と形は、二つそろうと、もっとよく伝《つた》わります。",
        "triangle の tri は、「3つ」という意味の古い言葉から来ています。三輪車《さんりんしゃ》は英語《えいご》で tricycle と言い、これも「3」のなかまです。形の言葉の中には、数のひみつがかくれていることがあるのです。",
      ],
      photos: [
        {
          src: `${C}/tomare.webp`, width: 800, height: 1067,
          alt: "電柱に、白い字で「止まれ」と書かれた赤い逆《さか》さまの三角の標識《ひょうしき》と、その下に、歩く人がかかれた青い標識《ひょうしき》がついている",
          caption: "沖縄《おきなわ》県の道路の標識《ひょうしき》。上の「止まれ」は赤い三角、英語《えいご》で言えば{{a red triangle}}です。",
          credit: { author: "Mokkie", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0", source: "https://commons.wikimedia.org/wiki/File:Stop_sign_in_Japan.jpg" },
        },
      ],
      cliff: "では「赤い三角」と言うとき、red と triangle は、どちらが先でしょう？",
      figure: {
        type: "tree",
        title: "形の言葉を分けてみる",
        root: {
          label: "形",
          children: [
            {
              label: "角がある",
              children: [
                { label: "triangle", sub: "三角・角が3つ", tone: "yellow" },
                { label: "square", sub: "正方形・角が4つ", tone: "yellow" },
                { label: "diamond", sub: "ひし形" },
                { label: "star", sub: "星・とがった先5つ" },
              ],
            },
            {
              label: "まがった線",
              children: [
                { label: "circle", sub: "丸", tone: "blue" },
                { label: "heart", sub: "ハート", tone: "blue" },
              ],
            },
          ],
        },
      },
    },
    {
      heading: "色と形をいっしょに言うときは、色が先",
      body: "「赤い丸」は英語《えいご》で{{a red circle}}です。日本語と同じで、{{色の言葉を形の言葉の前}}に言います。「青い星」なら a blue star です。形の言葉の前の a は「1つの」という気持ちで、最後《さいご》まではっきり言いましょう。",
      reading: [
        "では、「赤い三角」を英語《えいご》で言ってみましょう。答えは{{a red triangle}}です。英語《えいご》は、日本語と言葉の順番《じゅんばん》がちがうことがよくあります。たとえば「りんごが好《す》き」は I like apples. で、「好《す》き」にあたる like が先に来ます。それなのに、色と形は日本語と同じ順番《じゅんばん》なのです。",
        "それは、色の言葉が「どんな〇〇か」を表す、{{ようすの言葉}}だからです。英語《えいご》でも日本語でも、ようすの言葉は、物の名前のすぐ前に来ます。a big red circle（大きな赤い丸）のように、ようすの言葉が二つになっても、物の名前はいちばん後ろです。",
        "ところが、色を後ろに言う言い方もあります。今から240年ほど前の1784年、イギリスで子どものための歌の本『ガマー・ガートンの花輪《はなわ》』が出ました。その中に、好《す》きな人にささげる「バレンタイン」という歌があります。歌い出しの The rose is red は「バラは赤い」。rose（バラ）と red（赤い）の間に is をはさむと、色を後ろに置《お》いて「〜は赤い」と言えるのです。",
        "この歌は、のちに Roses are red, violets are blue という形でも広まり、今もカードや遊び歌に使われています。おもしろいことに、violet（スミレ）の花は、写真のように、むらさきに近い色です。昔の人には、青に見えたのかもしれませんね。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "The rose is red, the violet's blue,\nThe honey's sweet, and so are you.\nThou art my love, and I am thine;\nI drew thee to my Valentine:\nThe lot was cast, and then I drew,\nAnd fortune said it should be you.",
        ja: "バラは赤くて、スミレは青い。\nはちみつはあまい、そしてきみも。\nきみはぼくの大切な人、ぼくはきみのもの。\nくじで、きみをバレンタインの相手にえらんだ。\nくじがふられ、ぼくが引いた。\nすると運命が言った、それはきみだと。",
        cite: "\"The Valentine\", Gammer Gurton's Garland (1784; 1810 edition)",
        source: "https://www.gutenberg.org/ebooks/34601",
      }],
      photos: [
        {
          src: `${C}/garland.webp`, width: 800, height: 1049,
          alt: "古い小さな本の黄ばんだページに、英語《えいご》の短い歌がいくつか印刷《いんさつ》されている",
          caption: "『ガマー・ガートンの花輪《はなわ》』の古い本のページ（このページは子もり歌）。イギリスの子どもたちに歌われてきた{{マザーグース}}を集めた本です。",
          credit: { author: "Joseph Ritson", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Gammer_Gurton%27s_Garland.jpg" },
        },
        {
          src: `${C}/violet.webp`, width: 800, height: 600,
          alt: "緑の葉の上に、むらさき色の花びらが5まいある小さな花がさいている",
          caption: "スミレ（violet）の花。歌では blue（青）ですが、見た目はむらさきに近い色です。",
          credit: { author: "Uoaei1", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:Viola_odorata_20210226.jpg" },
        },
      ],
      reveal: "英語《えいご》は日本語と順番《じゅんばん》が逆《ぎゃく》になることが多いのに、色と形が同じ順番《じゅんばん》なのは、色の言葉が「どんな形か」を表す{{ようすの言葉}}だからです。ようすの言葉は、英語《えいご》でも物の名前のすぐ前に来ます。だから「止まれ」の標識《ひょうしき》は{{a red triangle}}。色を後ろに言いたいときは、The rose is red. のように is をはさみます。",
      cliff: "色と形が言えたら、友だちに好《す》きな色を聞いてみましょう。",
      figure: {
        type: "formula",
        title: "形の前に色をつける",
        prose: true,
        steps: [
          { expr: "a circle", note: "丸（1つ）" },
          { expr: "a {{red}} circle", note: "色を形の前に入れる" },
          { expr: "I see a {{red}} circle.", note: "赤い丸が見えます" },
          { expr: "a {{blue}} star / a {{green}} heart", note: "色をかえても同じ順《じゅん》" },
        ],
      },
    },
    {
      heading: "好《す》きな色をたずねて、答える",
      body: "好《す》きな色をたずねるときは {{What color do you like?}} と言います。答えるときは {{I like 〜.}} の後ろに色の言葉を入れます。相手の答えを聞いたら、Me, too.（わたしも）や Nice. と返事をすると、会話が続《つづ》きます。",
      reading: [
        "色と形が言えたら、友だちと話してみましょう。好《す》きな色をたずねるときは{{What color do you like?}}です。答えるときは、I like blue. のように、I like の後ろに色の言葉を入れます。同じ色が好《す》きなら Me, too! と返すと、会話がはずみます。",
        "色と形を組み合わせると、遊びも作れます。一人が I see a yellow star.（黄色い星が見えるよ）と言い、みんなで教室の中から黄色い星をさがします。国旗《こっき》を見るのもおもしろいです。日本の国旗《こっき》は、白に{{a red circle}}。世界の国旗《こっき》には、星や三角、正方形もあります。色と形の言葉で、どの国旗《こっき》か当てっこをしてみましょう。",
      ],
      figure: {
        type: "flow",
        dir: "col",
        title: "好《す》きな色の会話",
        steps: [
          { label: "What color do you like?", sub: "何色が好《す》き？", tone: "blue" },
          { label: "I like green.", sub: "緑が好《す》きだよ", tone: "yellow" },
          { label: "Me, too!", sub: "わたしも！" },
        ],
        arrows: ["たずねる", "聞いて返事"],
      },
    },
  ],
  story: {
    kind: "manga4",
    title: "ようすの言葉は前！",
    panels: [
      {
        scene: "通学路。赤い三角の「止まれ」の前。",
        lines: [
          { who: "ミオ", text: "あのひょうしき、" },
          { who: "ミオ", text: "えいごで言ってみて！" },
          { who: "ケン", text: "トライアングル・レッド！" },
        ],
        art: {
          bg: "outdoor",
          cast: [
            { who: "ミオ", look: "girl", x: 254, face: "smile", hand: [214, 214] },
            { who: "ケン", look: "boy", x: 86, face: "shout", fx: "!" },
          ],
          props: [{ kind: "board", x: 170, y: 214, s: 0.85, text: "止まれ" }],
        },
      },
      {
        scene: "ケンがむねをはる。",
        lines: [
          { who: "ケン", text: "えいごは日本語と" },
          { who: "ケン", text: "じゅんばんがぎゃく" },
          { who: "ケン", text: "って聞いたもん！" },
        ],
        art: {
          bg: "outdoor",
          cast: [
            { who: "ケン", look: "boy", x: 254, face: "smile", hand: [214, 220] },
            { who: "ミオ", look: "girl", x: 86, face: "think", fx: "?" },
          ],
          props: [{ kind: "board", x: 170, y: 214, s: 0.85, text: "ぎゃく？" }],
        },
      },
      {
        scene: "ミオがボードに書いて見せる。",
        lines: [
          { who: "ミオ", text: "色はようすの言葉。" },
          { who: "ミオ", text: "形の前に言うんだよ" },
          { who: "ミオ", text: "ア・レッド・トライアングル" },
        ],
        art: {
          bg: "outdoor",
          cast: [
            { who: "ミオ", look: "girl", x: 254, face: "normal", hand: [214, 214] },
            { who: "ケン", look: "boy", x: 86, face: "surprise", fx: "idea" },
          ],
          props: [{ kind: "board", x: 170, y: 214, s: 0.85, text: "a red △" }],
        },
      },
      {
        scene: "ケンのおなかが、ぐうと鳴る。",
        lines: [
          { who: "ケン", text: "じゃあ、ぼくは今" },
          { who: "ケン", text: "ボーイ・ハングリー！" },
          { who: "ミオ", text: "ア・ハングリー・ボーイ！" },
        ],
        art: {
          bg: "outdoor",
          cast: [
            { who: "ケン", look: "boy", x: 254, face: "sweat", fx: "sweat" },
            { who: "ミオ", look: "girl", x: 86, face: "shout", fx: "!", hand: [126, 214] },
          ],
          props: [{ kind: "board", x: 170, y: 214, s: 0.85, text: "ようすは前" }],
        },
      },
    ],
    note: "「止まれ」の標識《ひょうしき》が赤い三角であること、英語《えいご》で a red triangle・a hungry boy のように、ようすの言葉を物の名前の前に言うことは、ほんとうのことです。ケンとミオの話は作り話です。",
  },
  mistakes: [
    { wrong: "「赤い丸」を a circle red と言う", right: "a red circle", why: "英語《えいご》でも、色の言葉は形の言葉の前に来ます。" },
    { wrong: "square と triangle を取りちがえる", right: "square は正方形、triangle は三角", why: "tri は「3」を表すので、角が3つの三角が triangle です。" },
    { wrong: "What color do you like? に Yes. と答える", right: "I like blue. のように色を答える", why: "「何色？」と聞かれているので、Yes か No ではなく色の言葉で答えます。" },
  ],
  check: [
    { q: "「黄色い星」を英語《えいご》で言うと？", a: "a yellow star", why: "色（yellow）を形（star）の前に言います。" },
    { q: "circle はどんな形？", a: "丸", why: "まがった線だけでできた、角のない形です。" },
    { q: "What color do you like? に「緑が好《す》き」と答えると？", a: "I like green.", why: "I like の後ろに色の言葉を入れます。" },
  ],
  next: [
    { label: "カードとドリル「色・形の言い方」", href: "/learn/eigo-sho/e-english-34-iro-katachi" },
    { label: "図解《ずかい》レクチャー「好《す》きなものを伝《つた》える」", href: "/learn/lecture/e-english-34-suki" },
    { label: "前の単元《たんげん》「数の言い方」", href: "/learn/eigo-sho/e-english-34-kazu" },
  ],
};
