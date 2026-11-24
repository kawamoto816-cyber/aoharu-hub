import type { KijutsuLesson } from "./types";

// 例文の英文は、アオハルが書いたオリジナル。

export const EIGO: KijutsuLesson[] = [
  {
    id: "e1",
    track: "eigo",
    no: 1,
    title: "下線部和訳①：骨組み（主語と動詞）を先に取る",
    lead: "単語は分かるのに、長い文になると訳がくずれる人へ。前から順に日本語にしていくと、かかり方をまちがえます。",
    kata: [
      "文の中心の動詞（述語動詞）に印をつける。to do・-ing・過去分詞だけのものは、中心の動詞ではない。",
      "その動詞の主語を、どこからどこまでか、かっこでくくる。主語が長いときほど、ここで決まる。",
      "のこりを、かざり（前置詞＋名詞、関係詞の節、分詞、挿入）としてかっこでくくり、どの語にかかるかを矢印でつなぐ。",
      "接続詞（that, if, as, while, although）と、組になる表現（not only A but also B / so 〜 that / just as A, so B）を見つけ、文と文の関係を決める。",
      "骨組みを訳してから、かざりを足す。最後に、日本語として読んで直す。",
    ],
    ex: {
      text: [
        "Just as a map shows only what its maker considered important, so a history book reflects the choices of the person who wrote it.",
      ],
      q: "この文を和訳せよ。",
      steps: [
        [
          "組になる表現",
          "Just as A, so B ＝「A であるのとちょうど同じように、B である」。",
        ],
        [
          "A の骨組み",
          "a map（主語） shows（動詞） only [what its maker considered important]（目的語）。",
        ],
        [
          "what の節",
          "what ＝「〜もの」。its maker（主語） considered（動詞） important（補語）。「作った人が重要だと考えたもの」。",
        ],
        [
          "B の骨組み",
          "a history book（主語） reflects（動詞） the choices（目的語）〔of the person [who wrote it]〕。「それを書いた人の選択」。",
        ],
      ],
      answer:
        "地図が、作った人が重要だと考えたものだけを示すのとちょうど同じように、歴史の本も、それを書いた人の選択を映している。",
      ng: {
        text: "ちょうど地図は作る人だけが重要と考えて見せるので、歴史の本は書いた人を選んで映す。",
        why: "Just as 〜, so … を理由（〜ので）と取り、only が what 以下にかかることと、the choices of the person の of のかかり方をまちがえています。骨組みを先に取れば防げます。",
      },
    },
    check: [
      "中心の動詞の数と、訳の述語の数が合っているか。",
      "主語の終わりを、動詞の直前で切ったか。",
      "関係詞・分詞のかざりが、正しい名詞にかかっているか。",
      "組になる表現（Just as 〜, so … など）を、決まった訳し方で訳したか。",
    ],
    drill: {
      text: [
        "The idea that people learn more from success than from failure, which many of us accept without question, is not supported by the evidence.",
      ],
      q: "この文を和訳せよ。",
      hint: "中心の動詞は is (not supported)。主語の中心は The idea で、that 〜 failure は idea の内容を言う「同格」。コンマではさまれた which 〜 question は、The idea（〜という考え）を先行詞とする付け足しの説明（非制限用法）です。",
      answer:
        "人は失敗からよりも成功からのほうが多くをまなぶという考えは、私たちの多くが疑うことなく受け入れているものだが、証拠によって裏づけられてはいない。",
      points: [
        "主語：The idea ＋ 同格の that 節（〜 failure まで）",
        "which 以下は、その考えへの付け足しの説明",
        "述語：証拠によって裏づけられていない（受け身＋否定）",
      ],
    },
  },
  {
    id: "e2",
    track: "eigo",
    no: 2,
    title: "下線部和訳②：日本語として通る文に直す",
    lead: "構文は取れているのに、「直訳すぎて意味が通じない」「代名詞をそのまま訳した」と減点される人へ。",
    kata: [
      "物や事が主語で、人に何かを「させる・あたえる・できなくする」文（無生物主語）は、主語を「〜によって」「〜のせいで」「〜すると」と副詞のように訳し、人を主語にする。",
      "名詞に動詞がかくれているとき（the discovery of 〜, his failure to 〜）は、「〜を発見すること」「彼が〜できなかったこと」と、文のようにほどく。",
      "代名詞（it, they, this, that）と、the＋名詞の言いかえは、何を指すか決めてから訳す。「内容を補って」とあれば、指す内容を言葉にして入れる。",
      "コロン（:）のあとは、前の言葉の具体的な説明や言いかえ。「つまり」「すなわち」でつなぐ。セミコロン（;）は、関係の深い2つの文をならべる印。前後の関係（そして・しかし・というのも）を文脈で決めて訳す。",
      "できた訳を、英語を見ずに声に出して読み、引っかかるところを直す。",
    ],
    ex: {
      text: [
        "For centuries, people looked at the night sky with nothing but their eyes. The invention of the telescope allowed them to see what had always been there: thousands of stars too faint to notice.",
      ],
      q: "2つ目の文（The invention 〜）を和訳せよ。",
      steps: [
        [
          "無生物主語",
          "The invention of the telescope allowed them to see 〜 →「望遠鏡が発明されたことで、人々は〜を見られるようになった」。",
        ],
        [
          "名詞をほどく",
          "the invention of the telescope →「望遠鏡が発明されたこと」。",
        ],
        ["代名詞", "them ＝ people。「人々」と訳す。"],
        [
          "コロン",
          "what had always been there（ずっとそこにあったもの）＝ コロンのあとの「あまりに暗くて気づかれなかった何千もの星」。「つまり」でつなぐ。",
        ],
      ],
      answer:
        "望遠鏡が発明されたことで、人々は、ずっとそこにあったもの、つまり、あまりに暗くて気づかれなかった何千もの星を見られるようになった。",
      ng: {
        text: "望遠鏡の発明は、彼らにいつもそこにあったものを見ることを許した。気づくにはあまりにかすかな何千の星。",
        why: "構文はまちがっていませんが、無生物主語と them をそのまま訳したので、日本語として読みにくくなっています。コロンの前後の関係（＝言いかえ）も訳に出ていません。",
      },
    },
    check: [
      "「〜は人に〜を許した／させた」のような訳が残っていないか。",
      "「彼ら」「それ」が、何を指すか分かる言葉になっているか。",
      "名詞のかたまりを、文のようにほどいたか。",
      "英語を見ずに読んで、意味が1回で通じるか。",
    ],
    drill: {
      text: [
        "Clay tablets were used for writing thousands of years ago. Today, a new project is printing an entire library on thin ceramic. In a sense, we are returning to them to make sure our records survive.",
      ],
      q: "3つ目の文（In a sense 〜）を、returning to them の内容を補って和訳せよ。",
      hint: "them は clay tablets。ただし今使っているのは ceramic（焼き物）の板なので、「粘土板のような焼き物の板に記録する方法」と補います。",
      answer:
        "ある意味で、私たちは、自分たちの記録が確実に残るようにするために、大昔の粘土板と同じような、焼き物の板に文字を記録するという方法にもどりつつある。",
      points: [
        "them の内容を補った（粘土板のような焼き物の板に記録すること）",
        "to make sure 〜 を目的として訳した",
        "In a sense ＝ ある意味で",
      ],
    },
  },
  {
    id: "e3",
    track: "eigo",
    no: 3,
    title: "内容説明：指す内容を本文から集めて、日本語でまとめる",
    lead: "「どういう意味か、本文に即して具体的に説明しなさい」で、下線部を訳しただけになる人へ。",
    kata: [
      "まず下線部を訳し、その中で「これだけでは何のことか分からない言葉」に印をつける（たとえ、to do so、this、such など）。",
      "印の言葉の中身を、下線部の前後（同じ段落が中心）から探して、英語のまま線を引く。2〜3か所になるのがふつう。",
      "線を引いたところを、日本語で短くまとめる。全訳はしない。数字や固有名詞は、説明に必要なものだけ入れる。",
      "答案は「〔具体的な事実〕。つまり〔下線部の言いたいこと〕、ということ。」の順にする。たとえは、何のたとえかを言葉にする。",
    ],
    ex: {
      text: [
        "When researchers examined a single spoonful of soil with a new genetic method, they found traces of several thousand kinds of living things. Most of them had never been named. The soil under our feet, it seemed, was an unread library.",
      ],
      q: "最後の文 “The soil under our feet, it seemed, was an unread library.” はどういう意味か、本文に即して具体的に説明せよ。",
      steps: [
        [
          "訳して印をつける",
          "「足もとの土は、読まれていない図書館のようだった。」印＝ unread library（たとえ）。",
        ],
        [
          "中身を探す",
          "library ＝ several thousand kinds of living things（数千種類の生き物）。unread ＝ Most of them had never been named（ほとんどは名前もついていない）。",
        ],
        [
          "事実をまとめる",
          "スプーン1杯の土を新しい遺伝子の方法で調べたら、数千種類の生き物のあとが見つかり、そのほとんどは名前がなかった。",
        ],
        [
          "たとえを言葉にする",
          "図書館＝たくさんの種類がおさまっている場所。読まれていない＝まだ知られていない。",
        ],
      ],
      answer:
        "スプーン1杯の土を新しい遺伝子の方法で調べたところ、数千種類もの生き物のあとが見つかり、そのほとんどは名前もついていなかった。つまり、足もとの土には、まだ人間に知られていない生き物が、本のならんだ図書館のように数多くふくまれている、ということ。",
      ng: {
        text: "私たちの足もとの土は、読まれていない図書館のように見えたという意味。",
        why: "訳しただけで、「図書館」「読まれていない」が何を指すかの説明がありません。「本文に即して具体的に」は、前後の事実を入れなさいという指示です。",
      },
    },
    check: [
      "たとえ・指示語が、何を指すか言葉になっているか。",
      "前後の本文から、事実が2つ以上入っているか。",
      "全訳になっていないか（必要なところだけをまとめたか）。",
      "終わりが、下線部の言いたいことになっているか。",
    ],
    drill: {
      text: [
        "The king buried records of his deeds for future rulers to find. We might imagine he would be amazed that we can still read them. But to think so is to forget how he saw time. He himself had dug up records more than a thousand years old, and he expected his own to last just as long.",
      ],
      q: "“to think so is to forget how he saw time” はどういう意味か、本文に即して具体的に説明せよ。",
      hint: "so の中身（何を考えることか）と、how he saw time の中身（王は時間をどう見ていたか）を、前後から取ります。",
      answer:
        "王自身が千年以上前の記録を掘り出しており、自分の記録も同じくらい長く残ると見こんでいた。つまり、今も記録が読めることに王は驚くだろうと考えるのは、記録は千年以上残って当然だという王の時間の見方を忘れた考えであり、王は驚きはしないはずだ、ということ。",
      points: [
        "so の中身：王は今も読まれていることに驚くだろう、と考えること",
        "王の時間の見方：自分も千年以上前の記録を掘り出していた",
        "だから自分の記録も長く残ると見こんでいた",
      ],
    },
  },
  {
    id: "e4",
    track: "eigo",
    no: 4,
    title: "和文英訳：日本語をかみくだいてから書く",
    lead: "「腹をくくる」「実りをもたらす」のような日本語で手が止まる人、むずかしい単語を探してまちがえる人へ。",
    kata: [
      "日本語を1文ずつに分け、それぞれの主語を決める。日本語に主語がなければ、you / we / people から選んで補う。",
      "むずかしい言い回しを、小学生にも分かる日本語に言いかえる（腹をくくる→覚悟を決める→決心する）。",
      "言いかえた日本語を、「だれが・どうする・何を」の順にならべる。知っている単語と、確実に書ける構文だけを使う。",
      "つなぎの言葉（however, so, when, even if）を足して、文と文の関係をはっきりさせる。",
      "書いたあと、主語と動詞の一致（三単現の s）、時制、冠詞（a / the）、単数・複数の4つだけを点検する。",
    ],
    ex: {
      text: [
        "何事も、やってみなければ向き不向きは分からない。だから、迷ったら、まず飛びこんでみるのも一つの手だ。",
      ],
      q: "この文を英訳せよ。",
      steps: [
        ["主語を決める", "1文目：一般の人→ you。2文目：you。"],
        [
          "かみくだく",
          "向き不向き→それが自分に合っているかどうか。飛びこんでみる→とにかく始めてみる。一つの手だ→一つのよい選択肢だ（one good option）。",
        ],
        [
          "ならべる",
          "あなたは・知ることができない・それが自分に合っているかどうかを・実際にやってみるまで。",
        ],
        ["つなぐ", "So, if you are not sure whether to do something, 〜."],
      ],
      answer:
        "You cannot know whether something suits you until you actually try it. So, if you are not sure whether to do something, one good option is simply to try it first.",
      ng: {
        text: "Anything is not understood suitable or not suitable if not do. So if lost, first diving is one hand.",
        why: "日本語を1語ずつ英語におきかえています。「一つの手」を one hand、「迷う」を lost としたのは、かみくだく手順をとばしたためです。",
      },
    },
    check: [
      "すべての文に、主語と動詞があるか。",
      "かみくだく前の日本語を、そのまま英単語におきかえていないか。",
      "三単現の s・時制・冠詞・単数複数を点検したか。",
      "自信のない単語を、知っている言葉の説明に言いかえたか。",
    ],
    drill: {
      text: [
        "進む道を決めるときは、だれでもよく考えて、いちばん納得のいく選択をしたいものだ。しかし、その道が自分に合うかどうかは、しばらく続けてみて、はじめて分かる。",
      ],
      q: "この文を英訳せよ。",
      hint: "「〜したいものだ」→ naturally want to 〜。「〜して、はじめて分かる」→ not 〜 until …。",
      answer:
        "When we decide which path to take in life, we all naturally want to think carefully and make the choice that satisfies us most. However, we cannot know whether that path suits us until we have followed it for some time.",
      points: [
        "主語を補っている（we / you）",
        "「納得のいく選択」をかみくだいて書いている",
        "「〜して、はじめて分かる」を not 〜 until などで表している",
      ],
    },
  },
  {
    id: "e5",
    track: "eigo",
    no: 5,
    title: "自由英作文：主張→理由2つ→まとめ",
    lead: "何を書けばよいか決まらずに時間がなくなる人、書いているうちに話がそれる人へ。",
    kata: [
      "まず3分で、日本語のメモを作る。主張（1つ）、理由①、理由②、それぞれの例（1つずつ）。英語で書けそうにない案は、ここで捨てる。",
      "1文目は、問いの言葉を使って主張を書く（問いが “one thing that could …” なら、そのまま主語にする）。",
      "理由は First, / Second, で始め、それぞれ「理由の文＋例か説明の文」の2文にする。",
      "最後の文は、In short, / Therefore, で始め、主張を別の言い方でくり返す。新しい話を足さない。",
      "語数を数える。足りなければ例を1文足し、多ければ例を削る。主張と理由は削らない。",
    ],
    ex: {
      text: [
        "In English, write a paragraph about one change that would make your town a better place. （60〜80語）",
      ],
      q: "メモを作ってから、段落を書け。",
      steps: [
        ["メモ（主張）", "バスの本数を増やす。"],
        [
          "メモ（理由①と例）",
          "お年よりが病院や店に行きやすい。車を運転しなくてよい。",
        ],
        ["メモ（理由②と例）", "車がへる。空気がきれいになり、道も安全になる。"],
        [
          "1文目",
          "One change that would make my town a better place is 〜（問いの言葉を使う）。",
        ],
      ],
      answer:
        "One change that would make my town a better place is running more buses. First, more buses would help elderly people. They could go to hospitals and shops without driving. Second, if more people took the bus, there would be fewer cars on the road. As a result, the air would be cleaner and the streets would be safer. In short, more buses would make life easier and healthier for everyone.（71語）",
      ng: {
        text: "My town is small and has a river. I like my town. There are not many buses, so I think it is not good. Also the park is old. I want a new park and many shops …",
        why: "主張が1つにしぼれていません（バス・公園・店）。1文目が問いに答えておらず、理由と例の組み合わせもありません。メモを作らずに書きはじめると、こうなります。",
      },
    },
    check: [
      "1文目だけを読んで、主張が分かるか。",
      "理由が2つあり、それぞれに例か説明がついているか。",
      "最後の文が、主張のくり返しになっているか（新しい話がないか）。",
      "語数が指定の中に入っているか。",
    ],
    drill: {
      text: [
        "In English, write a paragraph explaining one habit that students should have. （60〜80語）",
      ],
      q: "メモ（主張・理由①・理由②）を作ってから、段落を書け。",
      hint: "主張の例：毎日、その日にまなんだことを短く書きとめる。",
      answer:
        "One habit that students should have is writing a short note every day about what they have learned. First, writing helps them remember. When they put a lesson into their own words, they understand it more deeply. Second, the notes show their progress. Looking back at old notes, they can see how much they have grown, which gives them confidence. Therefore, a few minutes of writing each day is a simple but powerful habit.（74語）",
      points: [
        "1文目が主張（問いの言葉を使っている）",
        "理由2つ＋それぞれの説明",
        "まとめの文",
        "60〜80語",
      ],
    },
  },
];
