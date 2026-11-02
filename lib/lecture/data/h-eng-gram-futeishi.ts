import type { Lecture } from "../types";

const M = "/media/commons/h-eng-gram-futeishi";

export const H_ENG_GRAM_FUTEISHI: Lecture = {
  unit: "h-eng-gram-futeishi",
  title: "不定詞 to ＋原形は3つの役割。「これから」の to と「すでに」の -ing",
  hook: "I want to go. の to go と、I enjoy going. の going。どちらも「行くこと」なのに、動詞によって使える形がちがいます。不定詞は文の中で名詞・形容詞・副詞の3役をこなす便利な形で、動名詞とのちがいは入試の定番です。役割と「時の向き」で整理しましょう。",
  mystery: "1775年、パトリック・ヘンリーの演説は、to indulge、to desire、to retire と、to ＋原形を重ねて進みます。ところが、歴史に残った最後の一文 give me liberty or give me death には、to がひとつもありません。不定詞を使いこなした演説が、なぜ最後に to を手放したのでしょう？",
  mission: {
    from: "高校の英語スピーチ大会を指導する先生",
    request: "うちの生徒の原稿は、I want to 〜、I hope to 〜 ばかりで、まじめなのに、なぜか心に届きません。今年は名演説から「言いきる力」を学ばせたいのです。to を重ねた演説が最後に to を捨てたわけを、名探偵のあなたに解き明かしてほしいのです。",
    thanks: "to は「まだ起きていない先」へ向かう矢印で、原形で始まる命令文は、いまここで答えを迫る形。生徒たちには、考えを並べるところは to で、決めの一文は原形で言いきるよう伝えます。",
  },
  sections: [
    {
      heading: "to ＋原形の3つの用法",
      body: "不定詞は、文の中での{{はたらき}}で3つに分けます。{{名詞的用法}}は「〜すること」で主語・目的語・補語になります。{{形容詞的用法}}は「〜するための・〜すべき」で、名詞を後ろから修飾します。{{副詞的用法}}は動詞や形容詞を説明し、目的（〜するために）・感情の原因（〜して）・結果（〜して…になる）などを表します。",
      reading: [
        "1775年3月23日、北アメリカのイギリス植民地ヴァージニア。リッチモンドの丘に建つ木造の教会に、植民地の代表たちが集まっていました。{{第2回ヴァージニア協議会}}です。本国イギリスとの対立が深まるなか、議題は「植民地の民兵を整え、守りを固めるかどうか」。まだ話し合いで和解できると考える代表も少なくありませんでした。そこで立ち上がったのが、弁護士出身の議員{{パトリック・ヘンリー}}です。聞き手の中には、のちに初代大統領となるワシントンや、翌年に独立宣言を起草するジェファソンもいたと伝えられます。",
        "この演説は、不定詞の見本帳のようです。不定詞は to ＋動詞の原形で、文の中で名詞・形容詞・副詞のどれかの働きをします。I want to win.（勝ちたい）の to win は want の目的語なので{{名詞的用法}}、a reason to fight（戦うための理由）の to fight は名詞 reason を後ろから説明するので{{形容詞的用法}}、He came to warn us.（彼はわたしたちに警告するために来た）の to warn は動詞 came を説明するので{{副詞的用法}}です。見分けるときは、to の前の語との関係を見ます。",
        "副詞的用法には、目的のほか、感情の原因（I'm glad to hear that. それを聞いてうれしい）、結果（He grew up to be a lawyer. 成長して弁護士になった）、そして程度があります。下のヘンリーの一文には、enough to と too ... to が並びます。base enough to desire it は「それを望むほど卑しい」、too late to retire は「退くにはおそすぎる」。どちらの to も、前の形容詞が「どのくらい」なのかを示す副詞的用法です。If we were は仮定法で、「仮にそうだとしても」と、ありえない前提を置いて相手の逃げ道をふさいでいます。",
      ],
      recite: [{
        lang: "en", voice: "male",
        text: "If we were base enough to desire it, it is now too late to retire from the contest. There is no retreat but in submission and slavery!",
        ja: "たとえわたしたちが、それを望むほど卑しいとしても、いまや争いから身を引くにはおそすぎるのです。退く道は、屈服と隷属のなかにしかありません！",
        cite: "Patrick Henry, Speech to the Second Virginia Convention (1775)（William Wirt, 1817 による再構成）",
        source: "https://avalon.law.yale.edu/18th_century/patrick.asp",
      }],
      figure: {
        type: "tree",
        title: "不定詞の用法",
        root: {
          label: "to ＋動詞の原形",
          tone: "navy",
          children: [
            { label: "名詞的", sub: "〜すること：I want to go.", tone: "blue" },
            { label: "形容詞的", sub: "〜するための：something to drink", tone: "yellow" },
            {
              label: "副詞的",
              tone: "red",
              children: [
                { label: "目的", sub: "went to buy milk" },
                { label: "感情の原因", sub: "glad to see you" },
                { label: "結果", sub: "grew up to be a doctor" },
              ],
            },
          ],
        },
      },
      photos: [
        {
          src: `${M}/currier-ives.webp`, width: 800, height: 622,
          alt: "議場の中央で、茶色の上着の男性が片手を高く上げて演説し、まわりの男性たちが腕を上げたり身を乗り出したりしている色つきの版画",
          caption: "カリアー＆アイヴズの石版画「Give me liberty, or give me death!」（1876年）。独立100周年の年に、1775年の{{パトリック・ヘンリー}}の演説の場面を想像して描いたもの。",
          credit: { author: "Currier and Ives", license: "CC0", licenseUrl: "http://creativecommons.org/publicdomain/zero/1.0/deed.en", source: "https://commons.wikimedia.org/wiki/File:Patrick_Henry_MET_DT9295.jpg" },
        },
      ],
      cliff: "「〜すること」を主語にすると文が重くなる。ヘンリーは最初の一文でどう解決した？",
    },
    {
      heading: "長い主語は It で置きかえる",
      body: "To understand this book is difficult. のように不定詞が主語だと、頭が重くなります。そこで主語の位置に{{形式主語 It}} を置き、不定詞を後ろへ回します。不定詞の動作をする人（{{意味上の主語}}）は for 人 で示しますが、kind・nice・careless のように{{人の性質}}を言う形容詞なら of 人 にします。",
      reading: [
        "不定詞は主語にもなれます。けれども To understand this book is difficult. のように長い不定詞を文頭に置くと、述語にたどり着くまでが遠く、英語の感覚では頭でっかちです。英語には、重くて新しい情報を文の後ろに回すという好みがあります。そこで主語の位置に、それ自体は意味をもたない{{形式主語 It}} を置き、本当の主語である不定詞を後ろへ送ります。It is difficult to understand this book. とすれば、「難しい」という結論が先に届きます。",
        "ヘンリーが本論の最初に置いた一文が、まさにこの形です（下の朗読）。it is natural のあとの to man は「人間にとって」という前置詞の to で、本当の主語は to indulge in the illusions of hope（希望という幻想にひたること）です。聞き手は「それは自然なことだ」と先に聞かされて「何が？」と待たされ、文の最後で答えを受けとります。しかも「人間にとって自然なこと」と言うことで、和解に期待する議員たちを直接責めずに、「その期待は幻想ではないか」と問いかけています。",
        "不定詞の動作をする人（{{意味上の主語}}）は、It is natural for us to hope.（わたしたちが希望をもつのは自然だ）のように for 人 で表します。ただし kind・nice・careless・wise など、{{人の性質}}をほめたり責めたりする形容詞では、It is wise of you to wait.（待つとは賢明ですね）のように of 人 にします。なお、この演説の英文は、当時の記録ではありません。ヘンリーの死後の1817年、伝記作家{{ウィリアム・ワート}}が、その場にいた人々の記憶をもとにまとめたものです。どこまでがヘンリー本人のことばなのか、歴史家の意見は分かれています。",
      ],
      recite: [{
        lang: "en", voice: "male",
        text: "Mr. President, it is natural to man to indulge in the illusions of hope.",
        ja: "議長、希望という幻想にひたるのは、人間にとって自然なことです。",
        cite: "Patrick Henry, Speech to the Second Virginia Convention (1775)（William Wirt, 1817 による再構成）",
        source: "https://avalon.law.yale.edu/18th_century/patrick.asp",
      }],
      figure: {
        type: "formula",
        title: "形式主語 It を使う",
        prose: true,
        steps: [
          { expr: "{{To understand this book}} is difficult for me.", note: "主語が長い" },
          { expr: "{{It}} is difficult for me {{to understand this book}}.", note: "It を主語にし、不定詞を後ろへ" },
          { expr: "It is kind {{of}} you to help me.", note: "人の性質（kind）なら of 人" },
        ],
      },
      photos: [
        {
          src: `${M}/wirt-frontis.webp`, width: 800, height: 997,
          alt: "眼鏡を額の上にのせ、厚い上着をはおった年配の男性の胸から上を描いた白黒の版画",
          caption: "パトリック・ヘンリーの肖像（トマス・サリーの絵をもとにした版画）。{{ウィリアム・ワート}}が1817年に出したヘンリーの伝記の口絵で、演説の英文もこの本で初めて世に出た。",
          credit: { author: "William Wirt", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Sketches_of_the_life_and_character_of_Patrick_Henry_-_Frontispiece.png" },
        },
      ],
      cliff: "目的語に置くとき、to か -ing かは動詞しだい。その選び分けに、手がかりはある？",
    },
    {
      heading: "目的語は to か -ing か：動詞で決まる",
      body: "動詞の目的語に不定詞をとるか動名詞をとるかは、動詞ごとに決まっています。大まかには、want, hope, decide のように{{これから先のこと}}に向かう動詞は to、enjoy, finish, mind, avoid, give up のように{{している最中・すでにしたこと}}を表す動詞は -ing です。begin, start, like のようにどちらもとれる動詞もあります。",
      reading: [
        "I want to go. とは言えても、I enjoy to go. とは言えません。目的語に不定詞をとるか動名詞をとるかは動詞ごとに決まっていますが、丸暗記の前に手がかりがあります。want（したい）、hope（望む）、decide（決める）、plan（計画する）、promise（約束する）、refuse（断る）は、どれも気持ちが{{これから先のこと}}、つまりまだ起きていない動作に向かう動詞です。これらは to をとります。",
        "一方、enjoy（楽しむ）、finish（終える）、avoid（避ける）、give up（やめる）、practice（練習する）は、{{している最中・すでにしたこと}}、つまり実際に行われている動作を相手にする動詞で、-ing をとります。不定詞の to は、もとは「〜へ」を表す前置詞の to と同じ語で、「向かう先」の感覚が残っていると説明されます。I decided to fight. と決めた時点で、戦いはまだ始まっていません。I finished writing. の書くことは、すでに行われています。",
        "ただし、これは目安です。mind（いやがる）や consider（検討する）は、まだしていない動作でも -ing をとります。最後は動詞ごとに確かめて覚えましょう。また、look forward to（楽しみにする）の to は前置詞なので、後ろは seeing のような動名詞です。ヘンリーの演説の日、協議会は民兵を整える提案を、わずかな票差で可決しました。they decided to prepare（準備することを決めた）と言えば、その to は、まだ起きていない戦いへ向かっています。",
      ],
      figure: {
        type: "compare",
        title: "目的語の形で分ける動詞",
        columns: [{ title: "to ＋原形だけ", tone: "red" }, { title: "-ing だけ", tone: "blue" }],
        rows: [
          { cells: ["want / hope / wish", "enjoy / finish / mind"] },
          { cells: ["decide / plan / expect", "avoid / give up / put off"] },
          { cells: ["promise / refuse", "practice / consider"] },
        ],
        note: "どちらも可：begin / start / like / love。意味が変わる：remember / forget / stop / try。",
      },
      photos: [
        {
          src: `${M}/st-johns.webp`, width: 800, height: 630,
          alt: "木々と墓石に囲まれた、白い板張りの壁と四角い塔をもつ小さな教会の色つき写真",
          caption: "リッチモンドのセント・ジョン教会（1901年の着色写真）。1775年の{{第2回ヴァージニア協議会}}はこの教会で開かれ、ヘンリーの演説の舞台になった。",
          credit: { author: "作者不明", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:St._John%27s_Church,_Richmond,_Virginia-LCCN2008679545.jpg" },
        },
      ],
      cliff: "同じ remember でも、to と -ing で指す時がまるで逆に。決め手は「時の向き」です。",
    },
    {
      heading: "remember・forget は「時の向き」で意味が変わる",
      body: "remember・forget などは、to と -ing の両方をとり、意味が変わります。{{remember -ing}} は「（過去に）〜したことを覚えている」、{{remember to 〜}} は「（これから）忘れずに〜する」です。不定詞は{{未来向き}}、動名詞は{{過去向き}}と考えると区別できます。stop -ing は「〜するのをやめる」、stop to 〜 は「〜するために立ち止まる（副詞的用法）」です。",
      reading: [
        "to と -ing の両方をとり、意味が変わる動詞では、「時の向き」がはっきり出ます。I remember meeting him.（彼に会ったのを覚えている）は過去の出来事をふり返り、Remember to call him.（忘れずに彼に電話して）はこれからの動作を指します。forget も同じで、I'll never forget visiting Kyoto. は「京都を訪れたことを忘れない」、Don't forget to lock the door. は「忘れずにかぎをかけて」です。try to 〜 は「〜しようと努める（できるかは未定）」、try -ing は「試しに〜してみる」。不定詞は{{未来向き}}、動名詞は{{過去向き}}という感覚で区別できます。",
        "ヘンリーの演説の結び（下の朗読）は、問いの連打です。Why stand we here idle? は今なら Why do we stand here idle? と言うところで、I know not も I don't know の古い形です。Is life so dear, or peace so sweet, as to be purchased ... は so ... as to 〜（〜するほど…）の形で、to be purchased は「買い取られる」という受け身の不定詞です。命や平和を、鎖と隷属と引きかえに買い取ってよいのか、と聞き手に迫ります。",
        "そして最後の give me liberty or give me death。ここには to がありません。動詞の原形で始まる{{命令文}}です。演説から1か月足らずの1775年4月19日、マサチューセッツのレキシントンとコンコードで戦闘が起こり、独立戦争が始まりました。この一文は独立派の合言葉として広まり、ヘンリーは翌年、独立したヴァージニアの最初の知事になります。一方で、本国への忠誠を守るべきだと考えた植民地の人々も多くいました。また、自由を訴えたヘンリー自身が奴隷を所有していたことも、今日よく指摘されています。",
      ],
      recite: [{
        lang: "en", voice: "male",
        text: "Why stand we here idle? What is it that gentlemen wish? What would they have? Is life so dear, or peace so sweet, as to be purchased at the price of chains and slavery? Forbid it, Almighty God! I know not what course others may take; but as for me, give me liberty or give me death!",
        ja: "なぜわたしたちは、何もせずにここに立っているのですか？　諸君はいったい何を望むのか？　何を手に入れたいのか？　命はそれほど尊く、平和はそれほど甘いのでしょうか――鎖と隷属を代価に買い取られるほどに？　全能の神よ、そんなことをお許しにならぬよう！　ほかの人々がどの道をとるのか、わたしは知りません。しかし、わたしについて言えば――わたしに自由を与えよ。さもなくば死を！",
        cite: "Patrick Henry, Speech to the Second Virginia Convention (1775)（William Wirt, 1817 による再構成）",
        source: "https://avalon.law.yale.edu/18th_century/patrick.asp",
      }],
      figure: {
        type: "numberline",
        title: "remember を「今」に置いて考える",
        min: -2,
        max: 2,
        points: [
          { x: -1.5, label: "meeting", tone: "blue" },
          { x: 0, label: "remember", tone: "yellow" },
          { x: 1.5, label: "to call", tone: "red" },
        ],
        moves: [
          { from: 0, to: -1.5, label: "過去：〜したこと", tone: "blue" },
          { from: 0, to: 1.5, label: "未来：〜すること", tone: "red" },
        ],
        desc: "−2から2の数直線。0に remember、−1.5に meeting（過去にしたこと）、1.5に to call（これからすること）。0から左右へ矢印。",
        note: "I remember meeting him.（会ったのを覚えている）／Remember to call him.（忘れずに電話して）",
      },
      photos: [
        {
          src: `${M}/pew.webp`, width: 800, height: 628,
          alt: "四角い木の仕切りの座席が並び、奥に説教壇とパイプオルガンが見える教会の内部の色つき写真",
          caption: "セント・ジョン教会の内部。「パトリック・ヘンリーの席」から見た眺め（1901年の着色写真）。箱形の座席が並ぶこの堂内で、演説の結びの{{命令文}}が響いたとされる。",
          credit: { author: "作者不明", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:St._John%27s_Church_from_Patrick_Henry%27s_pew,_Richmond,_Virginia-LCCN2008679546.jpg" },
        },
      ],
      reveal: "to ＋原形は「これから向かう先」、つまりまだ実現していない動作を表す{{未来向き}}の形です。ヘンリーは前半で、to indulge（希望にひたること）や to retire（退くこと）と、聞き手が頭の中で考えている選択肢を to の形で並べ、ひとつずつ閉じていきました。最後の give me ... は、動詞の原形で始まる{{命令文}}です。I want to have liberty なら「これからの願い」にとどまりますが、命令文は、いまこの場で答えを迫ります。to を手放したことで、選択肢の話が決断の叫びに変わったのです。",
    },
  ],
  story: {
    kind: "manzai",
    title: "スピーチ大会の決めぜりふ",
    cast: ["コタロウ", "ミオ"],
    lines: [
      { who: "コタロウ", text: "どうもー、コタロウとミオです！　ぼく、英語スピーチ大会に出ることにしました！" },
      { who: "ミオ", text: "いいね。原稿はできたの？" },
      { who: "コタロウ", text: "最初の一文は I want to go to the top!　訳は「行くへ、ほしい」！", say: "最初の一文は、アイ・ウォント・トゥー・ゴー・トゥー・ザ・トップ！ 訳は、いくへ、ほしい！" },
      { who: "ミオ", text: "to を全部「へ」にするな！　to go は「行くこと」。want の目的語になる{{名詞的用法}}で、「トップに行きたい」。", say: "トゥーを全部、へにするな！ トゥー・ゴーは、いくこと。ウォントの目的語になる名詞的用法で、トップに行きたい。" },
      { who: "コタロウ", text: "じゃあ something to drink は「飲むへ、何か」。", say: "じゃあ、サムシング・トゥー・ドリンクは、のむへ、なにか。" },
      { who: "ミオ", text: "「へ」から離れて！　something を後ろから説明する{{形容詞的用法}}。「飲むための何か」、つまり飲み物。", say: "へから離れて！ サムシングを後ろから説明する形容詞的用法。のむためのなにか、つまり飲み物。" },
      { who: "コタロウ", text: "最後は審査員に It is kind of you to listen. と言います。意味は「聞いてくれて、ちょっとあなたです」。", say: "最後は審査員に、イット・イズ・カインド・オブ・ユー・トゥー・リッスン、と言います。意味は、きいてくれて、ちょっとあなたです。" },
      { who: "ミオ", text: "kind of を「ちょっと」と読むな！　kind は「親切な」。人の性質を言う形容詞だから、{{意味上の主語}}が of you になるの。", say: "カインド・オブを、ちょっと、と読むな！ カインドは親切な。人の性質を言う形容詞だから、意味上の主語がオブ・ユーになるの。" },
      { who: "コタロウ", text: "なるほど。じゃあ for you でもいいよね。", say: "なるほど。じゃあ、フォー・ユーでもいいよね。" },
      { who: "ミオ", text: "よくない！　for になるのは difficult みたいに性質じゃない形容詞。It is difficult for me to speak. で「わたしには話すのが難しい」。", say: "よくない！ フォーになるのは、ディフィカルトみたいに性質じゃない形容詞。イット・イズ・ディフィカルト・フォー・ミー・トゥー・スピーク、で、わたしには話すのが難しい。" },
      { who: "コタロウ", text: "練習が楽しくて、毎日 I enjoy to practice!", say: "練習が楽しくて、毎日、アイ・エンジョイ・トゥー・プラクティス！" },
      { who: "ミオ", text: "enjoy は -ing！　I enjoy practicing. enjoy や finish は、{{している最中・すでにしたこと}}に向く動詞なの。", say: "エンジョイはイング！ アイ・エンジョイ・プラクティシング。エンジョイやフィニッシュは、している最中、すでにしたことに向く動詞なの。" },
      { who: "コタロウ", text: "じゃあ want はなんで to なの？", say: "じゃあ、ウォントはなんでトゥーなの？" },
      { who: "ミオ", text: "want や decide は、まだ起きていない{{これから先のこと}}に向くから。to は「向かう先」を指す矢印だと思えばいい。", say: "ウォントやディサイドは、まだ起きていない、これから先のことに向くから。トゥーは、向かう先を指す矢印だと思えばいい。" },
      { who: "コタロウ", text: "よし、本番の朝のメモに Remember calling Mom! と書いておこう。", say: "よし、本番の朝のメモに、リメンバー・コーリング・マム！と書いておこう。" },
      { who: "ミオ", text: "それだと「お母さんに電話したのを覚えておけ」！　これからするなら Remember to call Mom. {{remember to}} は未来向き、{{remember -ing}} は過去向き。", say: "それだと、お母さんに電話したのを覚えておけ！ これからするなら、リメンバー・トゥー・コール・マム。リメンバー・トゥーは未来向き、リメンバー・イングは過去向き。" },
      { who: "コタロウ", text: "決めぜりふは名演説から借ります。パトリック・ヘンリーの「ギブ・ミー・リバティ、オア・ギブ・ミー・デス」！" },
      { who: "ミオ", text: "1775年、アメリカ独立戦争の直前に伝えられる演説ね。" },
      { who: "コタロウ", text: "でもぼくは不定詞の使い手なので、I want to have liberty, or I want to have death! に直しました。", say: "でもぼくは不定詞の使い手なので、アイ・ウォント・トゥー・ハブ・リバティ、オア、アイ・ウォント・トゥー・ハブ・デス！に直しました。" },
      { who: "ミオ", text: "迫力が消えた！　want to だと「これからの願い」で終わる。原形で始まる{{命令文}}だから、いまここで迫る力が出るの。", say: "迫力が消えた！ ウォント・トゥーだと、これからの願いで終わる。原形で始まる命令文だから、いまここで迫る力が出るの。" },
      { who: "コタロウ", text: "わかった、命令文でいきます。Give me the first prize!", say: "わかった、命令文でいきます。ギブ・ミー・ザ・ファースト・プライズ！" },
      { who: "ミオ", text: "審査員に命令するな！　もういいよ。" },
      { who: "コタロウ", text: "どうも、ありがとうございました！" },
    ],
    note: "コタロウとミオは架空の人物で、会話はすべて創作です。パトリック・ヘンリーの演説（1775年3月23日、第2回ヴァージニア協議会）は史実ですが、その英文は1817年にウィリアム・ワートが関係者の記憶をもとにまとめたもので、本人のことばどおりかどうかは確かめられていません。漫才の英文は、決めぜりふ以外はすべて自作の文です。",
  },
  mistakes: [
    { wrong: "I enjoyed to talk with my friends.", right: "I enjoyed talking with my friends.", why: "enjoy は動名詞を目的語にとります。不定詞はとりません。" },
    { wrong: "It is kind for you to help me.", right: "It is kind of you to help me.", why: "kind は人の性質を表す形容詞なので、意味上の主語は of 人 です。" },
    { wrong: "Don't forget mailing this letter.", right: "Don't forget to mail this letter.", why: "これからすること（手紙を出す）を忘れないで、なので forget to 〜。" },
    { wrong: "I'm looking forward to see you.", right: "I'm looking forward to seeing you.", why: "look forward to の to は前置詞なので、後ろは動名詞です。" },
  ],
  check: [
    { q: "She decided ___ (study) abroad.", a: "to study", why: "decide はこれから先のことを決めるので不定詞をとる。" },
    { q: "I remember ___ (see) her at the party last year.", a: "seeing", why: "last year と過去にしたことを覚えているので remember -ing。" },
    { q: "It is careless ___ you to leave the door open. の ___ は for か of か。", a: "of", why: "careless は人の性質を表すので of 人。" },
  ],
  next: [
    { label: "4択ドリル「不定詞」に挑戦", href: "/learn/eibunpo-ko/h-eng-gram-futeishi" },
    { label: "つぎの単元「動名詞」", href: "/learn/eibunpo-ko/h-eng-gram-domeishi" },
    { label: "関連「分詞構文」", href: "/learn/eibunpo-ko/h-eng-gram-bunshikobun" },
  ],
};
