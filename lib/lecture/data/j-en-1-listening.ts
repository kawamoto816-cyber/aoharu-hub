import type { Lecture } from "../types";

const M = "/media/commons/j-en-1-listening";
const RMG = "https://www.gutenberg.org/ebooks/10607";

export const J_EN_1_LISTENING: Lecture = {
  unit: "j-en-1-listening",
  title: "リスニングは「最初の1語」と「数字」をつかめば答えが絞れる",
  hook: "英語の放送は一度きりで、聞きのがした文はもどってきません。でも、すべての単語を聞き取る必要はなく、{{答えに関わる語}}さえつかめば正解できます。テストのリスニングは、どこを聞けばよいかを知っているだけで点数が大きく変わります。",
  mystery: "イギリスの古いなぞなぞ。7人の妻、7つの袋、7匹の猫、7匹の子猫……出てくる数をかけ合わせると2800をこえるのに、昔からの答えは「1」。なぜ、そんなに小さな数になるのでしょう？",
  mission: {
    from: "市立図書館で英語のおはなし会を開く司書",
    request: "先月のおはなし会でマザーグースのなぞなぞを英語で読んだら、子どもたちが紙いっぱいにかけ算をして「答えは2802！」と大さわぎになりました。答えが「1」だと言うと、みんな納得がいかない顔。次の会で、この答えを英語の聞き方からきちんと説明したいのです。名探偵のあなたに、このなぞなぞのわなを解き明かしてほしいのです。",
    thanks: "かけ算がまちがっていたのではなく、質問が聞いていない数を数えていたのですね。次のおはなし会では「最後の質問まで聞くと、なぞが解ける」と、英語を耳で聞く楽しさを伝えます。",
  },
  sections: [
    {
      heading: "放送の前・中・後にすること",
      body: "放送が始まる前に{{選択肢を読んで}}、何が聞かれそうか（時刻？場所？）を予想しておきます。聞いている間は、数字・曜日・人の名前を{{メモ}}します。会話の{{最後の質問}}をよく聞き、それに合う答えを選びましょう。",
      reading: [
        "1920年11月2日、アメリカのピッツバーグで、ラジオ局KDKAが大統領選挙の開票結果を放送しました。これは、毎日決まった時間に番組を流す{{ラジオ放送}}の始まりとして知られる出来事です。日本でも1925年にラジオ放送が始まり、人々は耳だけでニュースや音楽を受けとるようになりました。ラジオの声は、聞きのがしても巻きもどせません。テストのリスニングも、この「一度きり」と同じ勝負です。",
        "では、一度きりの英語をどう聞けばよいのでしょう。コツは、放送の前・中・後で、やることを分けることです。放送の前には、問題用紙の{{選択肢を読んで}}、何が聞かれそうかを予想します。選択肢に 7:00、7:30 のような時刻が並んでいれば「時刻を聞く問題だ」と分かり、耳をそこに集中させられます。何も考えずに待つより、聞く準備をしてから待つほうが、英語はずっと耳に入ってきます。",
        "放送の最中は、数字・曜日・人の名前を{{メモ}}します。英語で書かなくても、「7」「火」「ケン」のような短いメモで十分です。そして、いちばん大事なのが会話のあとに読まれる{{最後の質問}}です。会話の中にたくさんの情報が出てきても、答えになるのは、質問がたずねている1つだけ。質問を聞いてから、メモと選択肢を照らし合わせて選びましょう。",
      ],
      figure: {
        type: "flow",
        title: "リスニングの3ステップ",
        steps: [
          { label: "選択肢を読む", sub: "何が聞かれるか予想", tone: "blue" },
          { label: "メモをとる", sub: "数字・曜日・名前", tone: "yellow" },
          { label: "質問に合わせる", sub: "最後の文を聞く", tone: "red" },
        ],
      },
      photos: [
        {
          src: `${M}/radio-1922.webp`, width: 800, height: 583,
          alt: "つまみがたくさんついた横長の箱形のラジオ受信機2台と、右に立つラッパ形のスピーカー。受信機の上にヘッドホンが置かれた白黒の絵",
          caption: "1922年ごろのアメリカの家庭用ラジオ受信機と、ラッパ形のスピーカー（当時のラジオの本の挿絵）。{{ラジオ放送}}の声は、聞きのがしても巻きもどせなかった。",
          credit: { author: "Charles William Taussig", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Early_1920s_radio_and_horn_speaker.png" },
        },
      ],
      cliff: "答えは質問がたずねている1つだけ。では「答えの種類」は、質問のどこで分かるのでしょう？",
    },
    {
      heading: "疑問詞で、答えの種類が決まる",
      body: "疑問文の{{最初の1語}}を聞きのがさないことがいちばん大切です。What ならもの、Where なら場所、When なら時を答えます。How many は数、How は手段や調子です。最初の1語で、答えになる選択肢の{{種類}}がしぼれます。",
      reading: [
        "英語の疑問詞は、文の{{最初の1語}}にやってきます。日本語の「きのう、どこに行ってたの？」では「どこ」が文の真ん中にありますが、英語は Where have you been? と、いきなり「どこ」から始まります。つまり英語の質問は、最初の1語を聞いた瞬間に、答えの{{種類}}――場所なのか、時なのか、人なのか、数なのか――が決まるのです。日本語に慣れた耳は文の終わりを待ちがちですが、英語では最初が勝負です。",
        "イギリスで何百年も歌いつがれてきた童謡を、{{マザーグース}}とよびます。もともとは親から子へ、口伝えで耳から覚えられてきた歌で、18世紀になると本にもまとめられるようになりました。字が読めない小さな子でも、聞いただけで覚えて歌えたのです。その中に、ネコとの問答の唄があります。1つ目の質問は Where で始まり、ネコは London という「場所」で答えます。2つ目の質問は What で始まり、ネコは「何をしたか」を答えます。",
        "what did you there? は、今の英語なら what did you do there? と言うところで、昔の言い方が残っています。それでも、最初の What さえ聞きとれれば「したことを答えるんだな」と分かります。テストでも同じで、知らない語が混じっていても、最初の1語で答えの方向をつかめれば、選択肢を半分以下にしぼりこめます。",
      ],
      figure: {
        type: "compare",
        title: "最初の1語と答えの例",
        columns: [{ title: "疑問詞", tone: "yellow" }, { title: "答えること" }, { title: "答えの例" }],
        rows: [
          { cells: ["Where", "場所", "It's on the desk."] },
          { cells: ["When", "時・日付", "It's May 5."] },
          { cells: ["What time", "時刻", "It's ten thirty."] },
          { cells: ["Who", "人", "She is my cousin."] },
          { cells: ["How many", "数", "I have two."] },
        ],
      },
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "\"Pussy-cat, pussy-cat,\nWhere have you been?\"\n\"I've been to London\nTo look at the Queen.\"\n\"Pussy-cat, pussy-cat,\nWhat did you there?\"\n\"I frightened a little mouse\nUnder the chair.\"",
        ja: "「ネコちゃん、ネコちゃん、\nどこへ行ってたの？」\n「ロンドンへ行ってきたの、\n女王さまを見にね」\n「ネコちゃん、ネコちゃん、\nそこで何をしたの？」\n「小さなネズミをおどかしたの、\nいすの下でね」",
        cite: "Mother Goose, \"Pussy-Cat and Queen\" (The Real Mother Goose, 1916)",
        source: RMG,
      }],
      cliff: "では、Where や What のない質問には、どんな形で答えればよいのでしょう？",
    },
    {
      heading: "Yes / No の質問は、同じ動詞で答える",
      body: "Do・Are・Can など、疑問詞のない質問には{{Yes か No}}で答えます。そのとき、質問に使われた{{同じ語}}で返すのがルールです。Can you 〜? なら can、Are you 〜? なら am で答えるので、選択肢の Yes, I do. と Yes, I am. を見分けられます。",
      reading: [
        "Do you like music?（音楽は好き？）、Are you busy?（いそがしい？）、Can you swim?（泳げる？）のように、疑問詞を使わない質問は、{{Yes か No}}かをたずねています。答えるときは、質問の最初の語と{{同じ語}}を使って返すのがきまりです。Do you 〜? なら Yes, I do. / No, I don't.、Are you 〜? なら Yes, I am. / No, I'm not.、Can you 〜? なら Yes, I can. / No, I can't. です。",
        "この「質問の語を、答えでもう一度使う」感覚は、マザーグースの古い唄「だれがコック・ロビンを殺したの？」によく表れています。Who killed 〜? とたずねられたスズメは I killed 〜. と答え、Who saw 〜? とたずねられたハエは I saw 〜. と答えます。質問の動詞をそのまま使って返しているのです。しかも sparrow と arrow、fly と eye のように行の終わりの音がそろっていて、一度聞くと口がまねをしたくなります。この唄は18世紀の本にすでにのっていて、小鳥や虫たちが次々に名乗り出る形で長く続いていきます。",
        "テストでは、このきまりが大きな手がかりになります。選択肢に Yes, I do. と Yes, I am. と Yes, I can. が並んでいたら、質問の最初の語が Do か Are か Can かを聞けば、答えは1つに決まります。Can you swim? に Yes, I do. と答えると、「泳げる？」に「うん、するよ」と返すような、かみ合わない答えになってしまいます。",
      ],
      figure: {
        type: "tree",
        title: "最初の語から答えの形を決める",
        root: {
          label: "質問の最初の語",
          children: [
            { label: "Do / Does", tone: "blue", children: [{ label: "Yes, I do.", sub: "No, I don't." }] },
            { label: "Are / Is", tone: "yellow", children: [{ label: "Yes, I am.", sub: "No, it isn't." }] },
            { label: "Can", tone: "red", children: [{ label: "Yes, I can.", sub: "No, I can't." }] },
          ],
        },
      },
      recite: [{
        lang: "en", voice: "female", accent: "gb",
        text: "Who killed Cock Robin?\n\"I,\" said the sparrow,\n\"With my little bow and arrow,\nI killed Cock Robin.\"\nWho saw him die?\n\"I,\" said the fly,\n\"With my little eye,\nI saw him die.\"",
        ja: "だれがコック・ロビンを殺したの？\n「わたし」とスズメが言いました。\n「わたしの小さな弓と矢で、\nわたしがコック・ロビンを殺したの」\nだれがロビンの死ぬのを見たの？\n「わたし」とハエが言いました。\n「わたしの小さな目で、\nわたしがロビンの死ぬのを見たの」",
        cite: "Mother Goose, \"The Death and Burial of Poor Cock Robin\" (The Real Mother Goose, 1916)",
        source: RMG,
      }],
      photos: [
        {
          src: `${M}/cock-robin-lc.webp`, width: 800, height: 619,
          alt: "古く黄ばんだ小さな本の見開き。左上に木と2羽の鳥の版画があり、その下に英語の唄の行が並んでいる",
          caption: "「だれがコック・ロビンを殺したの」をのせた古い小冊子（アメリカ議会図書館蔵）。s が f に似た昔の字体で刷られている。問いと、質問の動詞をくり返す答えが交互に並ぶ。",
          credit: { author: "Library of Congress（作者不明）", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Who_kill%27d_Cock_Robin%3F_..._LCCN2006685853.jpg" },
        },
      ],
      cliff: "質問の形が分かっても、数字を聞きまちがえたら台なし。15と50は、どう聞き分ける？",
    },
    {
      heading: "似た音の数字と、決まった返し方",
      body: "fifteen（15）と fifty（50）のような数字は、{{強く読む位置}}で聞き分けます。-teen は後ろの teen を強く、-ty は前を強く読みます。また、Thank you. には You're welcome.、I'm sorry. には That's OK. のように、{{決まった返し方}}がある表現はセットで覚えておくと、聞いた瞬間に答えが選べます。",
      reading: [
        "数字は、リスニングでいちばんねらわれる情報です。とくに fifteen（15）と fifty（50）、thirteen（13）と thirty（30）は、カタカナで書くとよく似ています。聞き分けの手がかりは{{強く読む位置}}です。-teen の数は後ろの teen を強く長く読み、-ty の数は前を強く読んで、ty は短く軽く終わります。",
        "数字を耳で覚えるための唄もあります。「30日あるのは9月」で始まる、月の日数を覚える唄です。英語を話す子どもたちは何百年も前から、カレンダーを見るかわりにこの唄を口ずさんで日数を覚えてきました。thirty-one（31）、twenty-eight（28）、twenty-nine（29）と、-ty の数がリズムよく並びます。hath は has の古い形です。",
        "数字の問題でもう一つ大切なのは、出てきた数字を全部使わないことです。マザーグースには、数字のひっかけで有名ななぞなぞがあります。セント・アイヴスへ行くとちゅう、7人の妻をもつ男に会った。妻はそれぞれ7つの袋を、袋にはそれぞれ7匹の猫が、猫にはそれぞれ7匹の子猫が――。そして最後に How many were going to St. Ives? とたずねます。How many だから答えは数。でも、何の数でしょう？　18世紀の記録が残るこのなぞなぞは、かけ算の力ではなく、{{最後の質問}}を聞く力をためしているのです。",
        "数字のほかに、聞いた瞬間に答えが選べるのが、{{決まった返し方}}のある表現です。Thank you. には You're welcome.、I'm sorry. には That's OK.、How are you? には I'm fine. のように、セットで覚えておきましょう。会話の最後の一言がこうした表現なら、考えるより先に答えが選べます。",
      ],
      figure: {
        type: "compare",
        title: "聞き分けと決まった返し方",
        columns: [{ title: "聞こえた文" }, { title: "ポイント・返し方", tone: "yellow" }],
        rows: [
          { label: "数字", cells: ["fif-TEEN", "後ろが強い → 15"] },
          { label: "数字", cells: ["FIF-ty", "前が強い → 50"] },
          { label: "お礼", cells: ["Thank you.", "You're welcome."] },
          { label: "おわび", cells: ["I'm sorry.", "That's OK."] },
        ],
      },
      recite: [
        {
          lang: "en", voice: "female", accent: "gb",
          text: "Thirty days hath September,\nApril, June, and November;\nFebruary has twenty-eight alone,\nAll the rest have thirty-one,\nExcepting leap-year, that's the time\nWhen February's days are twenty-nine.",
          ja: "30日あるのは9月、\n4月、6月、それに11月。\n2月はひとりだけ28日、\nほかはみんな31日。\nただし、うるう年は別で、そのときだけは\n2月の日数は29日。",
          cite: "Mother Goose, \"Thirty Days Hath September\" (The Real Mother Goose, 1916)",
          source: RMG,
        },
        {
          lang: "en", voice: "male", accent: "gb",
          text: "As I was going to St. Ives,\nI met a man with seven wives.\nEvery wife had seven sacks,\nEvery sack had seven cats,\nEvery cat had seven kits.\nKits, cats, sacks, and wives,\nHow many were going to St. Ives?",
          ja: "セント・アイヴスへ行くとちゅう、\n7人の妻をもつ男に会った。\n妻はみんな7つの袋をもち、\n袋にはみんな7匹の猫、\n猫にはみんな7匹の子猫。\n子猫に、猫に、袋に、妻。\nセント・アイヴスへ向かっていたのは、いくつ？",
          cite: "Mother Goose, \"As I Was Going to St. Ives\" (The Real Mother Goose, 1916)",
          source: RMG,
        },
      ],
      photos: [
        {
          src: `${M}/st-ives.webp`, width: 800, height: 588,
          alt: "海ぞいの丘に石づくりの家が並び、線路が浜辺に沿ってカーブし、遠くの岬に港町が見える色つきの風景",
          caption: "イギリス南西部コーンウォールの港町セント・アイヴス（1890〜1900年代の写真に色をつけて刷ったもの）。なぞなぞの町はここだとよくいわれるが、同じ名前の町はほかにもある。",
          credit: { author: "Photochrom Print Collection（Library of Congress）", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:St._Ives,_Porthminster_Bay,_Cornwall,_England-LCCN2002696617.jpg" },
        },
      ],
      reveal: "最初の1語は How many なので、答えは「数」。でも質問がたずねているのは、出会った人や動物の数ではなく、セント・アイヴスへ{{向かっていた}}数です。男と妻たちは、「わたし」と出会った（met）だけ。だから昔からの答えは「わたし1人」で、7をかけ合わせた2801は、質問が聞いていない数字だったのです。最初の1語で答えの種類をつかみ、{{最後の質問}}が何をたずねているかまで聞く。それが、数字のひっかけに負けない聞き方です。",
    },
  ],
  story: {
    kind: "manga4",
    title: "最初の1語クイズ",
    panels: [
      {
        scene: "放課後の教室。ハナが「Where?」の札を持って英語クイズを出す。ケンは自信まんまん。",
        lines: [
          { who: "ハナ", text: "ウェア・イズ・マイ・キャット？" },
          { who: "ケン", text: "イエス、アイ・ドゥー！" },
          { who: "ハナ", text: "{{最初の1語}}を聞いて！" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ハナ", look: "girl", x: 256, face: "normal", hand: [216, 214] },
            { who: "ケン", look: "boy", x: 84, face: "smile", fx: "!" },
          ],
          props: [
            { kind: "board", x: 196, y: 204, text: "Where?" },
          ],
        },
      },
      {
        scene: "ハナが札を「Can?」に変える。ケンはまた同じ答え。",
        lines: [
          { who: "ハナ", text: "キャン・ユー・スイム？" },
          { who: "ケン", text: "ノー、アイ・ドーント！" },
          { who: "ハナ", text: "キャンには{{キャン}}で答える！" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ハナ", look: "girl", x: 258, face: "shout", fx: "steam", hand: [216, 214] },
            { who: "ケン", look: "boy", x: 82, face: "sweat", fx: "sweat" },
          ],
          props: [
            { kind: "board", x: 196, y: 204, text: "Can?" },
          ],
        },
      },
      {
        scene: "ハナが「15? 50?」の札を見せ、数字を後ろを強くして読む。ケンが耳をすます。",
        lines: [
          { who: "ハナ", text: "フィフ・ティーーン！" },
          { who: "ケン", text: "{{後ろが強い}}から、15だ！" },
          { who: "ハナ", text: "正解！" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ハナ", look: "girl", x: 256, face: "smile", hand: [216, 214] },
            { who: "ケン", look: "boy", x: 84, face: "think", fx: "idea" },
          ],
          props: [
            { kind: "board", x: 196, y: 204, text: "15?50?" },
          ],
        },
      },
      {
        scene: "ケンが自分で「Where?」の札を持つ。ハナがもう一度、最初の問題を出す。",
        lines: [
          { who: "ハナ", text: "ウェア・イズ・マイ・キャット？" },
          { who: "ケン", text: "イッツ・オン・ザ・チェア！" },
          { who: "ハナ", text: "{{最初の1語}}で答えが決まる！" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ハナ", look: "girl", x: 258, face: "smile" },
            { who: "ケン", look: "boy", x: 84, face: "shout", fx: "!", hand: [124, 214] },
          ],
          props: [
            { kind: "board", x: 136, y: 204, text: "Where?" },
          ],
        },
      },
    ],
    note: "ハナとケンは架空の中学生で、教室の場面と会話は創作です。英語の文は自作の例文で、疑問詞・Yes/No の答え方・-teen と -ty の強く読む位置は、中学校で学ぶ英語のきまりにもとづいています。",
  },
  mistakes: [
    { wrong: "Can you swim? — Yes, I do.", right: "Yes, I can.", why: "Can でたずねられたら can で答えます。" },
    { wrong: "1語でも聞きのがすとあきらめる", right: "答えに関わる語だけを拾う", why: "全部聞き取れなくても、疑問詞・数字・最後の質問がわかれば答えられます。" },
    { wrong: "会話の最初に出た時刻を答える", right: "質問が聞いている時刻を答える", why: "会話には「今の時刻」と「バスの時刻」など、数字が2つ以上出てくることがよくあります。" },
  ],
  check: [
    { q: "A: Where is my cap? の答えとして合うのは「It's blue.」と「It's on the chair.」のどっち？", a: "It's on the chair.", why: "Where は場所をたずねる。" },
    { q: "Are you busy? に「いいえ」で答えると？", a: "No, I'm not.", why: "Are you 〜? には I am を使って答える。" },
    { q: "「後ろを強く」読む数字は fourteen と forty のどっち？", a: "fourteen", why: "-teen は後ろの teen を強く読む。forty は前が強い。" },
  ],
  next: [
    { label: "4択ドリル「リスニング」に挑戦", href: "/learn/eigo-chu/j-en-1-listening" },
    { label: "疑問詞を確かめる「疑問詞」のドリル", href: "/learn/eibunpo-chu/j-en-1-gimonshi" },
    { label: "数字や曜日を覚える「英単語」", href: "/learn/lecture/j-en-1-tango" },
  ],
};
