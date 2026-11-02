import type { Lecture } from "../types";

const M = "/media/commons/j-en-3-listening";

export const J_EN_3_LISTENING: Lecture = {
  unit: "j-en-3-listening",
  title: "長い放送は「質問を先に読む」「but のあとを聞く」「言いかえに気づく」",
  hook: "中3のリスニングでは、会話が長くなり、スピーチや校内アナウンスも出てきます。聞こえた語がそのまま選択肢にあるとは限らず、予定が途中で変わることもあります。どこに答えがかくれやすいかを知っておけば、長い放送でも落ち着いて聞けます。",
  mystery: "1876年3月、電話を発明したベルと助手のワトソンは、実験で役割を入れかえました。ワトソンが本を読み上げても、ベルには意味がつかめません。ところが、そのあとワトソンが言った Do you understand what I say? は、はっきり聞きとれたのです。同じ線、同じ声なのに、なぜ片方だけ聞きとれたのでしょう？",
  mission: {
    from: "科学館で「電話の150年」展を準備する学芸員",
    request: "電話の発明から150年を記念して、ベルの実験ノートを紹介する展示をつくっています。来館する中学生に「発明の話」だけでなく、「聞きとるとはどういうことか」まで持ち帰ってほしいのです。同じ電話なのに、本の朗読は聞きとれず、ひとつの質問だけは聞きとれたわけを、名探偵のあなたに解き明かしてほしいのです。",
    thanks: "聞きとれるかどうかは、耳の良さより「何が来るかを予想できるか」で決まる。ベル本人がノートに書いていた答えを、展示の最後のパネルにして、中学生のリスニングの合言葉にします。",
  },
  sections: [
    {
      heading: "放送の前に、質問と選択肢を読んでおく",
      body: "放送が始まる前の時間に、{{質問文と選択肢}}を読みます。選択肢どうしの{{ちがう部分}}（時刻・場所・人など）に印をつけておくと、聞くべき情報がはっきりします。2回放送されるときは、1回目で全体の流れとキーワードをつかみ、{{2回目で答えを確かめる}}と考えると、あせらずにすみます。",
      reading: [
        "2026年は、電話の発明から150年にあたります。1876年3月10日、アメリカのボストンで、スコットランド生まれの発明家アレクサンダー・グラハム・ベルは、助手のトーマス・ワトソンと新しい装置を試していました。ワトソンは受話器のある部屋で待ち、片方の耳を受話器に強くおし当て、もう片方の耳を手でふさぎました。送話器は別の部屋に置かれ、両方の部屋のドアは閉められていました。ベルがその夜の実験ノートに書きとめた様子です。",
        "ベルが送話器に向かって叫んだのが、下に引用した一文です。ワトソンはそれを聞きとり、ベルの部屋へやって来ました。電線を通った人の声が、意味の通じる言葉として伝わったことを記した、有名な場面です。このときワトソンが聞きとれたのは、耳がよかったからだけではありません。何か聞こえてくるはずだと、全身で{{待ちかまえていた}}からでもあります。",
        "リスニングのテストも同じです。放送が始まる前の時間に{{質問文と選択肢}}を読み、選択肢どうしの{{ちがう部分}}に印をつけます。選択肢が At 3:00／At 3:15／At 3:45 なら、聞くのは時刻、とくに「何分か」です。設問が What will Ken do next?（ケンは次に何をしますか）なら、会話の終わりのケンの言葉が勝負どころ。2回放送されるときは、1回目で流れと数字・名前をつかみ、{{2回目で答えを確かめる}}と決めておくと、落ち着いて聞けます。",
      ],
      recite: [{
        lang: "en", voice: "male", accent: "gb",
        text: "I then shouted into M the following sentence: \"Mr. Watson—Come here—I want to see you\". To my delight he came and declared that he had heard and understood what I said.\nI asked him to repeat the words—He answered \"You said 'Mr. Watson—come here—I want to see you.'\"",
        ja: "それから私は、M（送話器）に向かって次の文を叫んだ。「ワトソン君、来てくれ。きみに会いたい」。うれしいことに彼はやって来て、私の言ったことが聞こえたし、意味もわかったと言った。\n私は彼に、その言葉をくり返してくれとたのんだ。彼は答えた。「あなたはこう言いました。『ワトソン君、来てくれ。きみに会いたい』」",
        cite: "Alexander Graham Bell, Laboratory Notebook, March 10, 1876",
        source: "https://www.loc.gov/item/magbell.25300201/",
      }],
      figure: {
        type: "flow",
        dir: "col",
        title: "長い放送を聞く手順",
        steps: [
          { label: "質問と選択肢を読む", sub: "何がたずねられるかを知る", tone: "blue" },
          { label: "ちがう部分に印", sub: "時刻？場所？人？", tone: "yellow" },
          { label: "1回目：流れをつかむ", sub: "数字・名前をメモ" },
          { label: "2回目：答えを確かめる", sub: "迷った所だけ集中して聞く", tone: "red" },
        ],
      },
      photos: [
        {
          src: `${M}/bell-notebook.webp`, width: 800, height: 485,
          alt: "罫線のノートの見開き。左ページに容器と管の装置の図、両ページに手書きの英文がびっしり書かれている",
          caption: "ベルの実験ノート（1876年3月10日、40〜41ページ、米国議会図書館）。左ページの下に Mr. Watson—Come here—I want to see you. の一文、右ページに役割を入れかえた実験の結果が書かれている。",
          credit: { author: "Alexander Graham Bell", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:AGBell_Notebook.jpg" },
        },
      ],
      cliff: "聞こえた語が、選択肢にそのまま書いてあるとは限りません。じつはベルのノートにもヒントが。",
    },
    {
      heading: "聞こえた語と、選択肢の語はちがうことが多い",
      body: "選択肢では、放送の内容が{{別の言い方}}に言いかえられていることがよくあります。a quarter past three（3時15分）が 3:15 と書かれていたり、年れいの差から答えを{{計算}}させたりします。聞こえた単語と同じ語をさがすのではなく、{{意味が同じもの}}を選びましょう。",
      reading: [
        "ベルのノートをよく読むと、おもしろいことに気づきます。ワトソンは、聞こえた文をそのままくり返しました（You said ……）。一方ベルは、ワトソンの返事を he had heard and understood what I said（私の言ったことが聞こえ、理解できた）と、{{別の言い方}}にまとめて書いています。ワトソンが実際にどんな言葉で答えたかは、ノートには残っていません。人は聞いたことをだれかに伝えるとき、自然に言いかえるのです。",
        "リスニングの選択肢も、この「まとめ直し」でできています。放送が Mr. Watson, come here. I want to see you. なら、正解は Bell asked Watson to come to his room.（ベルはワトソンに、部屋へ来るようたのんだ）のような形になるでしょう。come here も want も入っていませんが、{{意味が同じもの}}です。反対に、放送と同じ単語をちりばめた選択肢は、ひっかけのことがよくあります。",
        "時刻や数の言いかえは定番です。a quarter past three は「3時を15分過ぎた」で 3:15、a quarter to eight は「8時の15分前」で 7:45。I'm fifteen. My brother is two years older than me. と聞こえたら、選択肢には seventeen と、{{計算}}した答えが書かれます。ちなみに、ベルの第一声としてよく知られているのは Mr. Watson, come here, I want you. という形で、ノートの文とは少しちがいます。名言も、語りつがれるうちに言いかえられていくのです。",
      ],
      figure: {
        type: "formula",
        title: "放送 → 選択肢の言いかえ",
        prose: true,
        steps: [
          { label: "放送", expr: "Let's meet at {{a quarter past three}}.", note: "a quarter = 15分" },
          { label: "選択肢", expr: "At {{3:15}}.", note: "数字に言いかえ" },
          { label: "放送", expr: "I'm fifteen. My brother is {{two years older}} than me.", note: "差を聞く" },
          { label: "選択肢", expr: "He is {{seventeen}}.", note: "15＋2を計算" },
          { label: "放送", expr: "Oh no, I {{left my umbrella}} at home.", note: "家に置いてきた" },
          { label: "選択肢", expr: "She {{doesn't have}} an umbrella now.", note: "今は持っていない" },
        ],
      },
      photos: [
        {
          src: `${M}/bell-telephone.webp`, width: 800, height: 464,
          alt: "白い背景に置かれた、黒っぽい円すい形の小さな器具と、つりがね形の器具の2つ",
          caption: "1876年にベルがつくった、初期の実験用の送話器と受話器（土台の板を外したもの）。この年の夏、フィラデルフィアの独立100周年記念博覧会に出品されたものの試作品ともいわれる。",
          credit: { author: "Elmer Ellsworth Burns", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Bell_Centennial_telephone_receiver_%26_transmitter_1876.png" },
        },
      ],
      cliff: "選択肢のわなはもう一つ。一度決まった話が、ある小さな語のあとでひっくり返ります。",
    },
    {
      heading: "予定の変更は but・Sorry・actually のあとに来る",
      body: "会話では、一度決まりかけた予定が{{途中で変わる}}ことがあります。but、Sorry, I can't.、Actually, …、How about …? が聞こえたら、そのあとの情報が答えになりやすいので注意します。最初に出た数字にとびつかず、{{最後に決まった内容}}を答えましょう。",
      reading: [
        "会話では、予定が{{途中で変わる}}ことがよくあります。A: Let's meet at six.（6時に会おう）B: Sorry, I have a lesson. Can we make it seven?（ごめん、レッスンがあるんだ。7時にできる？）A: Sure.（いいよ）なら、待ち合わせは7時です。but、Sorry、Actually（じつは）、How about ～?（～はどう？）が聞こえたら、メモを書き直すつもりで聞きます。答えは{{最後に決まった内容}}です。",
        "「but のあとが本題」という形は、歴史に残る演説でも使われています。1961年1月17日、8年の任期を終えるアイゼンハワー大統領は、テレビとラジオで国民に別れのあいさつをしました。第二次世界大戦でヨーロッパの連合国軍を率いた、軍人出身の大統領です。演説の中ほどで、彼はまず「かつてアメリカには軍需産業がなかった」と過去を語り、But now …… と続けて、今は巨大な軍需産業を常に持たざるをえなくなった、と話の向きを変えました。",
        "そのうえで、強大な軍と巨大な軍需産業の結びつき、military-industrial complex（軍産複合体）が、政府の中で不当な影響力をもたないよう警戒しなければならない、と訴えました。この言葉は今も、政治や経済を語るときに使われています。過去を認めてから but で今に切りかえ、言いたいことをそのあとに置く。聞き手は but を合図に、耳をそばだてればよいのです。引用の plowshares（すき）と swords（剣）は、聖書の「剣を打ち直してすきとする」という平和のことばをふまえた言い方です。",
      ],
      recite: [{
        lang: "en", voice: "male",
        text: "Until the latest of our world conflicts, the United States had no armaments industry. American makers of plowshares could, with time and as required, make swords as well. But now we can no longer risk emergency improvisation of national defense; we have been compelled to create a permanent armaments industry of vast proportions.",
        ja: "このあいだの世界大戦までは、アメリカ合衆国に軍需産業はありませんでした。アメリカで農具のすきを作る人々は、時間をかけ、必要に応じて、剣も作ることができたのです。しかし今では、国の守りを、いざというときの間に合わせで用意する危険は、もうおかせません。わたしたちは、とてつもなく大きな、常にある軍需産業をつくらざるをえなくなったのです。",
        cite: "Dwight D. Eisenhower, Farewell Address (January 17, 1961)",
        source: "https://www.archives.gov/milestone-documents/president-dwight-d-eisenhowers-farewell-address",
      }],
      figure: {
        type: "compare",
        title: "最初の情報と、最後に決まった情報",
        columns: [{ title: "最初に出た情報" }, { title: "変更のあと（答え）", tone: "yellow" }],
        rows: [
          { label: "時刻", cells: ["Let's meet at six.", "Can we make it seven? → 7時"] },
          { label: "場所", cells: ["at the library", "How about the park? → 公園"] },
          { label: "曜日", cells: ["It opens on Monday.", "Actually, it's Tuesday. → 火曜"] },
        ],
        note: "変更の合図のあとは、メモを書き直すつもりで聞く。",
      },
      cliff: "話の向きが変わる場所はわかった。では、長いスピーチ全体の「地図」は？",
    },
    {
      heading: "スピーチやアナウンスは、組み立てを知って聞く",
      body: "スピーチやアナウンスは、ふつう{{最初に話題}}、{{中ほどに理由や具体例}}、{{最後にまとめや呼びかけ}}という順に話されます。「何について話しているか」は最初、「聞き手に何をしてほしいか」は最後に注意して聞きます。First, … Second, … のような{{順序を表す語}}も、内容を整理する手がかりです。",
      reading: [
        "スピーチやアナウンスは、ふつう{{最初に話題}}、{{中ほどに理由や具体例}}、{{最後にまとめや呼びかけ}}の順に進みます。アイゼンハワーの離任演説も、はじめの2文で「3日後に職を退く」「今夜は別れのあいさつと、最後の考えを伝えに来た」と、話の目的をはっきり言っています。資料写真は、大統領が本番で読んだ原稿の1ページ目です。上の手書きは放送局へのお礼の書き足しで、語に引かれた下線は、強調して読む場所の印とみられます。",
        "組み立てを知っていると、「何について話すか」は最初、「聞き手に何をしてほしいか」は最後、と待ちかまえて聞けます。First, … Second, … Finally, … のような{{順序を表す語}}や、For example（たとえば）も、今どこを聞いているかを教えてくれる道しるべです。校内アナウンスなら、Please … で始まる最後の文に、持ち物や集合場所がまとめて出てくることがよくあります。",
        "最後に、もう一度ベルのノートにもどりましょう。最初の成功のあと、2人は場所を入れかえ、今度はワトソンが本の一節を送話器に読み上げ、ベルが受話器で聞きました。ベルが書きとめた結果は、意外なものでした。声は大きいのに、意味がつかめなかったのです。",
      ],
      recite: [
        {
          lang: "en", voice: "male",
          text: "Three days from now, after half a century in the service of our country, I shall lay down the responsibilities of office as, in traditional and solemn ceremony, the authority of the Presidency is vested in my successor.\nThis evening I come to you with a message of leave-taking and farewell, and to share a few final thoughts with you, my countrymen.",
          ja: "3日後、半世紀にわたって国に仕えたのち、私はこの職の責任を下ろします。伝統あるおごそかな式典で、大統領の権限が後継者にゆだねられるのです。\n今夜は、いとまごいと別れのことばをたずさえて、そして、わが国民のみなさんと最後の考えをいくつか分かち合うために、ここに来ました。",
          cite: "Dwight D. Eisenhower, Farewell Address (January 17, 1961)",
          source: "https://www.archives.gov/milestone-documents/president-dwight-d-eisenhowers-farewell-address",
        },
        {
          lang: "en", voice: "male", accent: "gb",
          text: "The effect was loud but indistinct and muffled. If I had read beforehand the passage given by Mr. Watson I should have recognized every word. As it was I could not make out the sense—but an occasional word here and there was quite distinct. I made out \"to\" and \"out\" and \"further\"; and finally the sentence \"Mr. Bell Do you understand what I say? Do-You-un-der-stand-what-I-say\" came quite clearly and intelligibly.",
          ja: "聞こえ方は、音は大きいが、はっきりせず、こもっていた。ワトソン君が読んだ一節を前もって読んでいたら、私は一語残らずわかったはずだ。実際には意味をつかめなかったが、ときどき、あちこちの語はとてもはっきり聞こえた。私は「to」と「out」と「further」を聞きとった。そしてついに「ベルさん、私の言うことがわかりますか？　わ・か・り・ま・す・か」という文が、とてもはっきりと、意味のわかる形で届いた。",
          cite: "Alexander Graham Bell, Laboratory Notebook, March 10, 1876",
          source: "https://www.loc.gov/item/magbell.25300201/",
        },
      ],
      figure: {
        type: "tree",
        title: "スピーチ・アナウンスの組み立て",
        root: {
          label: "スピーチ・アナウンス",
          children: [
            { label: "最初", sub: "話題・目的", tone: "blue", children: [{ label: "Today I'll talk about …" }] },
            { label: "中ほど", sub: "理由・例", tone: "yellow", children: [{ label: "First, … / For example, …" }] },
            { label: "最後", sub: "まとめ・呼びかけ", tone: "red", children: [{ label: "Please …" }] },
          ],
        },
      },
      photos: [
        {
          src: `${M}/ike-farewell.webp`, width: 500, height: 627,
          alt: "タイプで打たれた英文の原稿。MY FELLOW AMERICANS で始まり、上の余白に手書きの文、行の下に太い下線がある",
          caption: "アイゼンハワー大統領の離任演説（1961年1月17日）の朗読用原稿の1ページ目（米国国立公文書館）。はじめの2文で{{最初に話題}}と目的を示している。",
          credit: { author: "The U.S. National Archives", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Farewell_address_by_President_Dwight_D._Eisenhower,_01-17-1961_(5285428635).jpg" },
        },
      ],
      reveal: "答えは、ベル自身がノートに書いていました。「前もってその一節を読んでいたら、一語残らずわかったはずだ」。本の一節は、次に何が来るか予想できません。一方「わかりますか？」は、実験中の聞き手がまさに待っていた問いで、ノートでは1音ずつ区切ってくり返されたように書かれています。聞きとる力は耳の良さだけでなく、{{何が来るかを予想できるか}}で大きく変わる。だからリスニングでは、{{質問と選択肢の先読み}}と{{話の組み立て}}を知ることが武器になるのです。",
    },
  ],
  story: {
    kind: "manzai",
    title: "ワトソン君、ちょっと来て",
    cast: ["ケイ", "ミオ"],
    lines: [
      { who: "ケイ", text: "どうもー、ケイとミオです！　ぼく、電話を発明したベルの大ファンなんです。" },
      { who: "ミオ", text: "1876年、電話で初めて言葉をはっきり伝えた人だね。", say: "せんはっぴゃくななじゅうろくねん、電話で初めて言葉をはっきり伝えた人だね。" },
      { who: "ケイ", text: "第一声も知ってる。Mr. Watson, come here.「ワトソン、ここに来い」。つまり電話は、人を呼びつける機械！", say: "第一声も知ってる。ミスター・ワトソン、カム・ヒア。ワトソン、ここに来い。つまり電話は、人を呼びつける機械！" },
      { who: "ミオ", text: "呼びつけるための機械じゃない！　となりの部屋のワトソンが、声だけで意味を聞きとって、ちゃんと来た。それが大発見なの。" },
      { who: "ケイ", text: "よし、ぼくもテストで聞きとるぞ。放送が始まるまで、目をつぶって集中！" },
      { who: "ミオ", text: "目を開けて！　放送の前は{{質問文と選択肢}}を読む時間。何を聞けばいいか、先に決めておくの。" },
      { who: "ケイ", text: "1問目。Let's meet at a quarter past three. クォーターは4分の1だから、3時4分の1分！", say: "いちもんめ。レッツ・ミート・アット・ア・クォーター・パスト・スリー。クォーターはよんぶんのいちだから、さんじ、よんぶんのいっぷん！" },
      { who: "ミオ", text: "そんな時刻はない！　1時間の4分の1で15分。3時15分だよ。", say: "そんな時刻はない！ いちじかんのよんぶんのいちで、じゅうごふん。さんじじゅうごふんだよ。" },
      { who: "ケイ", text: "でも選択肢に quarter って書いてなかったから、ちがうと思ってた。", say: "でも選択肢にクォーターって書いてなかったから、ちがうと思ってた。" },
      { who: "ミオ", text: "選択肢は 3:15 って{{言いかえ}}てあるの。同じ単語より、{{意味が同じもの}}を選ぶ！", say: "選択肢はさんじじゅうごふんって言いかえてあるの。同じ単語より、意味が同じものを選ぶ！" },
      { who: "ケイ", text: "2問目。Let's go to the library. Actually, the park is better. 図書館で決まり！　最初に言ったもん。", say: "にもんめ。レッツ・ゴー・トゥ・ザ・ライブラリー。アクチュアリー、ザ・パーク・イズ・ベター。図書館で決まり！ 最初に言ったもん。" },
      { who: "ミオ", text: "Actually のあとで{{予定が変わってる}}！　行くのは公園。変更の合図のあとが答えになりやすいの。", say: "アクチュアリーのあとで予定が変わってる！ 行くのは公園。変更の合図のあとが答えになりやすいの。" },
      { who: "ケイ", text: "3問目は大統領の演説。アイゼンハワーの離任演説で、But now って聞こえた。バットって、野球のバット？", say: "さんもんめは大統領の演説。アイゼンハワーの離任演説で、バット・ナウって聞こえた。バットって、野球のバット？" },
      { who: "ミオ", text: "but は「しかし」！　「昔は軍需産業がなかった。しかし今は」と、話の向きが変わる合図。大事な話はそのあとに来るの。", say: "バットは、しかし！ 昔は軍需産業がなかった。しかし今は、と、話の向きが変わる合図。大事な話はそのあとに来るの。" },
      { who: "ケイ", text: "スピーチって長いから、最初で寝て、最後に起きればいい？" },
      { who: "ミオ", text: "寝ていいところはない！　{{最初に話題}}、中ほどに理由や例、{{最後に呼びかけ}}。組み立てを知っていれば、どこで何を聞くかわかるでしょ。" },
      { who: "ケイ", text: "そういえばベルも、ワトソンに本を読んでもらったら、ほとんど聞きとれなかったんだって。ベルの耳が悪かったのかな。" },
      { who: "ミオ", text: "ちがう。ベルはノートに「前もってその文を読んでいたら、全部わかったのに」って書いてる。予想できると、聞きとれるの。それが{{先読み}}の力。" },
      { who: "ケイ", text: "なるほど！　じゃあミオ、ぼくが次に言うことを先読みしてみて。" },
      { who: "ミオ", text: "どうせ「ミオ、ちょっと来て。話がある」でしょ。" },
      { who: "ケイ", text: "大正解！　Mio, come here. I want to see you.", say: "大正解！ ミオ、カム・ヒア。アイ・ウォント・トゥ・シー・ユー。" },
      { who: "ミオ", text: "となりに立ってるでしょ！　もういいよ。" },
      { who: "ケイ", text: "どうも、ありがとうございました！" },
    ],
    note: "ケイとミオは架空の人物で、会話はすべて創作です。1876年3月10日のベルとワトソンの実験の内容と、ベルがノートに書いた言葉（本を読み上げてもらうと意味がつかめず、前もって読んでいたらわかったはず、という記述）は、米国議会図書館が所蔵するベルの実験ノートにもとづく史実です。アイゼンハワーの離任演説（1961年）の but now の部分も実際の演説の内容です。テストの英文は自作です。",
  },
  mistakes: [
    { wrong: "最初に聞こえた時刻を答える", right: "変更のあとに決まった時刻を答える", why: "but や Can we make it …? のあとで予定が変わることがあります。最後に決まった内容が答えです。" },
    { wrong: "放送と同じ単語が入っている選択肢を選ぶ", right: "意味が同じ選択肢を選ぶ", why: "同じ単語をわざと入れた、まちがいの選択肢がよく作られます。言いかえに気づくことが大切です。" },
    { wrong: "What will Ken do next? で、会話の中で今していることを答える", right: "最後の I'll … や Let's … の内容を答える", why: "「次にすること」は、会話の終わりの未来を表す言い方に出てきます。" },
  ],
  check: [
    { q: "A: Let's go shopping at ten. B: Sorry, I have a lesson. How about eleven? A: OK. ── 2人は何時に出かける？", a: "11時", why: "Sorry のあとで How about eleven? と提案し、A が OK と答えている。" },
    { q: "a quarter to eight は何時何分？", a: "7時45分", why: "to は「〜の前」。8時の15分前なので7時45分。" },
    { q: "アナウンスで「聞き手にしてほしいこと」は、ふつうどこで話される？", a: "最後", why: "まとめや Please … の呼びかけは、話の終わりに来ることが多い。" },
  ],
  next: [
    { label: "4択ドリル「リスニング（中3）」に挑戦", href: "/learn/eigo-chu/j-en-3-listening" },
    { label: "基本をふり返る「リスニング（中1）」", href: "/learn/lecture/j-en-1-listening" },
    { label: "読む力もきたえる「長文読解」", href: "/learn/lecture/j-en-3-chobun" },
  ],
};
