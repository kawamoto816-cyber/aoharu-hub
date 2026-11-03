import type { Lecture } from "../types";

const C = "/media/commons/e-english-34-jikoku";

export const E_ENGLISH_34_JIKOKU: Lecture = {
  unit: "e-english-34-jikoku",
  nameRuby: "時刻《じこく》と一日の生活",
  title: "時刻《じこく》は「時→分」の順《じゅん》。「〜時に」は at",
  hook: "朝は何時に起きて、何時に学校へ行きますか。一日の生活は、時刻《じこく》といっしょに話すことが多いです。英語《えいご》で時刻《じこく》と生活の言葉を言えると、自分の一日を友だちに伝《つた》えたり、相手の一日を聞いたりできます。",
  mystery: "英語《えいご》で7時30分は seven thirty。「時」も「分」も言わずに、数を二つならべただけです。それなのに、どうして聞いた人には7時30分だと分かるのでしょう？",
  mission: {
    from: "商店街《しょうてんがい》の時計屋さん",
    request: "わたしの店に、外国から来たお客さんが、うで時計を直してほしいとたのみに来ました。「何時に取りに来ますか」と聞くと、お客さんは seven thirty とだけ言って帰っていきました。時も分も言わないのに、本当に7時30分のことなのか、わたしには自信《じしん》がありません。名探偵《めいたんてい》のあなたに、数を二つならべるだけで時刻《じこく》が伝《つた》わるわけを、見つけてほしいのです。",
    thanks: "はじめの数が時、後の数が分という順番《じゅんばん》のやくそくがあるのですね。これで安心して、7時30分に時計をぴかぴかにして待っていられます。",
  },
  sections: [
    {
      heading: "時刻《じこく》は It's の後ろに「時→分」",
      body: "時刻《じこく》を言うときは {{It's 〜.}} を使います。7時なら It's seven.、7時30分なら {{It's seven thirty.}} のように、{{時の数を先、分の数を後}}に言います。ちょうど7時は It's seven o'clock. とも言えます。数の言い方をそのまま使えます。",
      reading: [
        "英語《えいご》で時刻《じこく》を言うのは、じつはとてもかんたんです。数を二つならべるだけだからです。7時30分なら seven thirty、2時15分なら two fifteen。日本語の「時」や「分」にあたる言葉は、どこにも出てきません。そのかわり、{{はじめの数が時、後の数が分}}という順番《じゅんばん》が決まっています。日本語の「7時30分」と同じ順番《じゅんばん》なので、わたしたちにはおぼえやすい言い方です。",
        "ちょうどの時刻《じこく》には、seven {{o'clock}} のように o'clock をつけることもあります。o'clock は、もともと of the clock（時計の）を短くした言葉です。イギリスで三百年近く前の本にものっている{{マザーグース}}の歌「ヒッコリー・ディッコリー・ドック」にも、大きな時計が出てきます。ねずみがかけ上がると、時計がボーンと鳴って one を打ちます。時計が鳴る数が、そのまま「何時」を知らせていたのです。",
      ],
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "Hickory, dickory, dock!\nThe mouse ran up the clock;\nThe clock struck one,\nAnd down he run,\nHickory, dickory, dock!",
        ja: "ヒッコリー、ディッコリー、ドック！\nねずみが時計をかけ上がる。\n時計がボーンと1時を打つと、\nねずみはあわててかけおりた。\nヒッコリー、ディッコリー、ドック！",
        cite: "Mother Goose, \"The Mouse and the Clock\" (The Real Mother Goose, 1916)",
        source: "https://www.gutenberg.org/ebooks/10607",
      }],
      photos: [
        {
          src: `${C}/denslow.webp`, width: 385, height: 502,
          alt: "顔のついた、背《せ》の高い古い時計と、その下で時計を見上げる黒いねずみの絵。右に英語《えいご》の歌の文字",
          caption: "1901年にアメリカで出た絵本『デンスロウのマザーグース』の一ページ。ねずみが見上げる時計が one（1時）を打ちます。この本では Hickety, dickety, dock と書かれています。",
          credit: { author: "W. W. Denslow", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Hickety_Dickety_Dock_1_-_WW_Denslow_-_Project_Gutenberg_etext_18546.jpg" },
        },
      ],
      figure: {
        type: "formula",
        title: "数をならべて時刻《じこく》を言う",
        prose: true,
        steps: [
          { expr: "It's {{seven}}.", note: "7時" },
          { expr: "It's seven {{o'clock}}.", note: "7時ちょうど" },
          { expr: "It's seven {{thirty}}.", note: "7時30分（時→分の順《じゅん》）" },
          { expr: "It's {{two fifteen}}.", note: "2時15分" },
        ],
      },
      cliff: "時も分も言わないのに、聞いた人はなぜ7時30分だと分かるのでしょう？",
    },
    {
      heading: "時刻《じこく》をたずねて、答える",
      body: "「今、何時？」は {{What time is it?}} とたずねます。答えは It's の後ろに時刻《じこく》を入れます。相手の答えを聞いたら、Thank you. とお礼を言いましょう。",
      reading: [
        "時刻《じこく》をたずねるときは What time is it? と言います。what time が「何時」にあたります。答えは It's の後ろに、数を二つならべるだけです。聞く人も「はじめが時、次が分」というやくそくを知っているので、seven thirty と聞けば、すぐに7時30分だと分かります。反対に thirty seven と言うと、相手は「37時？」とこまってしまいます。",
        "時計を読むときも、まず短い針《はり》で「何時」、次に長い針《はり》で「何分」を読みますね。英語《えいご》の言い方は、この読む順番《じゅんばん》と同じです。三百年ほど前のイギリスには、時を指す短い針《はり》が一本しかない時計もありました。まず「何時か」が分かれば、くらしにはこまらなかったのです。",
      ],
      photos: [
        {
          src: `${C}/longcase.webp`, width: 800, height: 791,
          alt: "金色のかざりがついた四角い文字ばん。ローマ数字がならび、針《はり》は一本だけ",
          caption: "1750年ごろイギリスで作られた時計の文字ばん（イギリスの時計の博物館《はくぶつかん》）。針《はり》は時を指す一本だけで、分は目もりを見て、だいたいで読みました。",
          credit: { author: "andrewrabbott", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0", source: "https://commons.wikimedia.org/wiki/File:Longcase_clock_by_Stephen_Wilmshurst,_Odiham,_Hampshire_ca._1750.jpg" },
        },
      ],
      reveal: "英語《えいご》の時刻《じこく》は、「{{時→分}}」の順番《じゅんばん》で言うことが決まっています。だから seven thirty と数を二つならべるだけで、聞いた人は、はじめの seven が時、後の thirty が分だと分かるのです。「時」や「分」という言葉がなくても、ならべる順番《じゅんばん》そのものが目じるしになっています。",
      figure: {
        type: "flow",
        dir: "col",
        title: "時刻《じこく》をたずねる会話",
        steps: [
          { label: "What time is it?", sub: "今、何時？", tone: "blue" },
          { label: "It's three thirty.", sub: "3時30分だよ", tone: "yellow" },
          { label: "Thank you.", sub: "ありがとう" },
        ],
        arrows: ["たずねる", "聞いてお礼"],
      },
      cliff: "時刻《じこく》が言えたら、次は「その時刻《じこく》に何をするか」を言ってみましょう。",
    },
    {
      heading: "一日の生活を表す言葉",
      body: "起きてからねるまでの{{一日の生活}}にも、決まった言い方があります。{{get up}}（起きる）、{{go to school}}（学校へ行く）、{{go to bed}}（ねる）などです。自分の一日を思い出しながら、時刻《じこく》の順《じゅん》に言ってみましょう。",
      reading: [
        "一日の生活は、get up（起きる）、eat breakfast（朝ごはんを食べる）、go to school（学校へ行く）のように、動きを表す言葉で言います。前に I をつけて I get up. I go to school. と言うと、「わたしは〜します」になります。自分の朝を、起きてから家を出るまで、順番《じゅんばん》に言ってみましょう。",
        "外国にいる人と話すときは、相手の国の時刻《じこく》も考えます。日本が夜の7時のとき、イギリスのロンドンは同じ日の朝10時です（冬のとき。日本より9時間おくれています）。日本の子どもが夕ごはんを食べるころ、ロンドンの子どもは学校で勉強しています。同じときに、地球の上では、ちがう時刻《じこく》の一日が進んでいるのです。",
      ],
      figure: {
        type: "timeline",
        title: "ある子の一日（例《れい》）",
        events: [
          { year: 6, yearLabel: "午前6時", label: "get up（起きる）", key: true },
          { year: 7, yearLabel: "午前7時", label: "eat breakfast（朝ごはんを食べる）" },
          { year: 8, yearLabel: "午前8時", label: "go to school（学校へ行く）" },
          { year: 16, yearLabel: "午後4時", label: "go home（家に帰る）" },
          { year: 17, yearLabel: "午後5時", label: "do my homework（宿題をする）" },
          { year: 20, yearLabel: "午後8時", label: "take a bath（おふろに入る）" },
          { year: 21, yearLabel: "午後9時", label: "go to bed（ねる）", key: true },
        ],
      },
      cliff: "「6時に起きる」の「〜に」は、英語《えいご》ではどう言うのでしょう？",
    },
    {
      heading: "「〜時に」は at、午前は a.m.・午後は p.m.",
      body: "「6時に起きる」のように{{何時にするか}}を言うときは、時刻《じこく》の前に {{at}} をつけて I get up at six. と言います。午前と午後を分けたいときは、数の後ろに {{a.m.}}（午前）か {{p.m.}}（午後）をつけます。",
      reading: [
        "「わたしは6時に起きます」は I get up at six. です。{{at}} は「その時刻《じこく》に」という目じるしで、時刻《じこく》のすぐ前に置《お》きます。I go to bed at nine.（9時にねます）のように、生活の言葉の後ろに at と時刻《じこく》をつなげると、自分の一日を友だちに話せます。",
        "午前と午後を分けるときは、数の後ろに a.m.（午前）や p.m.（午後）をつけます。外国の人とオンラインで話す約束《やくそく》をするときは、とくに大切です。at 7 p.m. と言えば、夜の7時だとはっきり伝《つた》わります。ロンドンのグリニッジ天文台には、0時から23時まで、24時間で針《はり》が一回りする時計があります。グリニッジは、世界の時刻《じこく》のもとになる場所として知られています。",
      ],
      photos: [
        {
          src: `${C}/greenwich.webp`, width: 800, height: 1491,
          alt: "れんがのかべにうめこまれた、白い大きな丸い時計。上に Royal Observatory Greenwich の看板《かんばん》",
          caption: "グリニッジ天文台（ロンドン）の門の時計。1852年からある時計で、いちばん上が0時。24時間で針《はり》が一回りするので、午前と午後の区別《くべつ》がいりません。",
          credit: { author: "Alvesgaspar", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0", source: "https://commons.wikimedia.org/wiki/File:Greenwich_clock.jpg" },
        },
      ],
      figure: {
        type: "compare",
        title: "a.m. と p.m.",
        columns: [{ title: "a.m.", tone: "blue" }, { title: "p.m.", tone: "red" }],
        rows: [
          { label: "意味", cells: ["午前", "午後"] },
          { label: "例《れい》", cells: ["7 a.m.＝午前7時", "7 p.m.＝午後7時"] },
          { label: "生活の例《れい》", cells: ["get up at 7 a.m.", "eat dinner at 7 p.m."] },
        ],
        note: "a.m.・p.m. は数の後ろにつける。",
      },
    },
  ],
  story: {
    kind: "novel",
    title: "ロンドンまで、seven thirty",
    paragraphs: [
      "土曜日の夕方、三年生のさきは、パソコンの前でそわそわしていました。いとこのれんくんは、お父さんの仕事で、イギリスのロンドンに住んでいます。今日は、はじめてのオンラインのおしゃべりです。",
      "画面の中のれんくんのとなりに、女の子がひょっこり顔を出しました。「クラスの友だちのエマだよ。来週もいっしょに話したいって。」エマは、にこっとわらって言いました。「Hello! What time can we talk next Saturday?」",
      "日本の夜7時30分なら、宿題も夕ごはんも終わっています。さきは指で数えながら、大きな声で言いました。「Thirty seven!」",
      "エマは目をまるくしました。「Thirty seven?」れんくんが、ぷっとふき出しました。「さき、それじゃ『37時』みたいだよ。英語《えいご》の時刻《じこく》は、時が先で、分が後なんだ。」",
      "「あっ、そうか。」さきは、日本語の「7時30分」と同じ順番《じゅんばん》で、言いなおしました。「Seven thirty! At seven thirty p.m.!」夜だと分かるように、p.m. もつけました。",
      "エマは「OK!」と親指を立てました。れんくんが言いました。「日本の夜7時30分は、ロンドンでは朝10時30分だよ。冬は9時間おくれてるから。」「えっ、そっちは朝なの？」",
      "エマが、かべの背《せ》の高い古い時計を指さして、手びょうしをしながら歌いはじめました。「Hickory, dickory, dock! The mouse ran up the clock……」「時計が one を打つと、ねずみがかけおりる歌なんだって。」とれんくん。",
      "さきは、むこうの時計と自分の家の時計を見くらべました。こっちの短い針《はり》は夕方の5、むこうは朝の8。同じときなのに、ちがう時刻《じこく》です。それでも、数を二つならべるだけで、海のむこうと約束《やくそく》ができるのです。",
      "「See you at seven thirty!」さきが手をふると、エマもわらって手をふりました。「See you at ten thirty!」二人とも、ちゃんと正しいのでした。",
    ],
    note: "さき・れん・エマと、この会話は創作《そうさく》です。「ヒッコリー・ディッコリー・ドック」がイギリスに古くから伝《つた》わる歌であること、冬のロンドンの時刻《じこく》が日本より9時間おくれていること（夏は8時間）は事実です。",
  },
  mistakes: [
    { wrong: "7時30分を It's thirty seven. と言う", right: "It's seven thirty.", why: "英語《えいご》の時刻《じこく》は、時の数を先、分の数を後に言います。" },
    { wrong: "I get up six.", right: "I get up at six.", why: "「〜時に」と言うときは、時刻《じこく》の前に at をつけます。" },
    { wrong: "午前9時を p.m. 9 と言う", right: "9 a.m.", why: "午前は a.m.、午後は p.m. で、数の後ろにつけます。" },
  ],
  check: [
    { q: "What time is it? に「8時」と答えると？", a: "It's eight.", why: "It's の後ろに時刻《じこく》を入れます。It's eight o'clock. でもよいです。" },
    { q: "「わたしは9時にねます」を英語《えいご》で言うと？", a: "I go to bed at nine.", why: "ねるは go to bed、「9時に」は at nine です。" },
    { q: "It's four fifteen. は何時何分？", a: "4時15分", why: "four が時、fifteen が分です。" },
  ],
  next: [
    { label: "カードとドリル「時刻《じこく》と一日の生活」", href: "/learn/eigo-sho/e-english-34-jikoku" },
    { label: "算数3年「時刻《じこく》と時間」のレクチャー", href: "/learn/lecture/e-math-3-jikoku" },
    { label: "図解《ずかい》レクチャー「曜日と天気」", href: "/learn/lecture/e-english-34-youbi-tenki" },
  ],
};
