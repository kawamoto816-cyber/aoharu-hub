import type { Lecture } from "../types";

const C = "/media/commons/h-eng-skill-jiyu";

export const H_ENG_SKILL_JIYU: Lecture = {
  unit: "h-eng-skill-jiyu",
  title: "自由英作文は「主張→理由→具体例→まとめ」の型。書きやすい立場を選んでよい",
  hook: "「高校生はアルバイトをするべきか。あなたの意見を80語程度で書きなさい」。こう聞かれて、何から書けばいいか迷う人は多いでしょう。自由英作文で見られるのは、立派な意見よりも、主張と理由がはっきりした読みやすい英文かどうかです。決まった型と、ミスの少ない書き方を覚えれば、どんなテーマでも組み立てられます。",
  mystery: "1918年、アメリカのコーネル大学で、ある英語教師が学生のために薄い文章読本を自費で印刷しました。その中心にある規則は、たった3語の「Omit needless words（不要な語を省け）」。80語を書かなければならない自由英作文で、なぜ「削れ」が高得点への近道になるのでしょう？",
  mission: {
    from: "高校生英作文コンテストの審査を担当する、大学の国際交流センターの職員",
    request: "今年のコンテストには、語数の条件を満たそうと、前置きや同じ言い回しでふくらんだ作文がたくさん届きました。どれも語数は足りているのに、読み終えても何が言いたいのか残りません。100年以上前の小さな文章読本が「削れ」と教える理由を、名探偵のあなたに解き明かしてほしいのです。",
    thanks: "「削った語数は、理由と具体例に回す」。この一言を応募要項に書き足しました。来年は、語数ではなく中身で勝負する作文が届くはずです。",
  },
  sections: [
    {
      heading: "型は「主張→理由→具体例→まとめ」",
      body: "最初の1文で{{賛成か反対か（主張）}}をはっきり書きます。次に{{理由}}を述べ、それを支える{{具体例}}や説明をつけます。最後に主張をもう一度、少し言いかえて{{まとめ}}ます。この順番なら、読む人は最初の1文で結論がわかり、そのあとを安心して読めます。",
      reading: [
        "日本語の作文では、出来事を順に語って、最後に「だから私はこう思う」と結ぶ書き方がよく見られます。ところが英語の論説文では、{{結論を最初に言う}}のが基本です。段落の最初に置いて、その段落で何を言うかを予告する1文を{{トピック・センテンス}}といいます。1918年にアメリカで書かれた文章読本『The Elements of Style（文章の要素）』も、「{{As a rule, begin each paragraph with a topic sentence}}」（原則として、段落はトピック・センテンスで始めよ）という規則を掲げました。読み手は最初の1文で地図を受け取り、あとの文をその地図に当てはめながら読めるからです。",
        "この型を、歴史の大舞台で使い切った文書があります。1776年7月4日、アメリカの13の植民地がイギリスからの独立を宣言した{{独立宣言}}です。起草の中心になったのは、33歳のトマス・ジェファソンでした。宣言はまず「すべての人は平等につくられ、生命・自由・幸福の追求という権利をもつ」という{{主張}}を掲げ、そうした権利をこわす政府は改めてよいと述べます。続いて「To prove this（これを証明するため）」と前置きして、イギリス国王が植民地に対して行ったことを、He has ... で始まる文で{{具体的な事実}}として20以上も並べました。そして最後に「We, therefore（それゆえに我々は）」と受けて、独立を{{まとめ}}として宣言します。",
        "主張から証拠へ、証拠から結論へ。その橋わたしをしているのが、To prove this や therefore のような{{つなぎの言葉}}です。みなさんの80語の作文でも、I think that ...（主張）→ First, ... / Second, ...（理由）→ For example, ...（具体例）→ To sum up, ...（まとめ）と目じるしを置けば、読む人は迷わずに最後までついてこられます。型は、自分のためというより、{{読む人のための道しるべ}}なのです。",
      ],
      recite: [{
        lang: "en", voice: "male",
        text: "We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness.\n…To prove this, let Facts be submitted to a candid world.",
        ja: "わたしたちは、次の真理を自明のものと考える。すべての人は平等につくられ、造物主によって、だれにもゆずりわたせない権利をあたえられている。その中には、生命、自由、そして幸福の追求がふくまれる。\n……これを証明するために、公正な世界に向けて事実を示そう。",
        cite: "Declaration of Independence (1776)",
        source: "https://www.archives.gov/founding-docs/declaration-transcript",
      }],
      photos: [
        {
          src: `${C}/declaration.webp`, width: 800, height: 949,
          alt: "上に大きな飾り文字の題があり、細かい手書きの英文がぎっしり続き、下に多くの署名が並ぶ文書",
          caption: "独立宣言（1823年のストーンによる複製）。前半に主張、中ほどに国王の行いを並べた事実の列、最後に「We, therefore」で始まる結論。1枚の紙に型がおさまっている。",
          credit: { author: "Second Continental Congress（複製：William Stone）", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:United_States_Declaration_of_Independence.jpg" },
        },
        {
          src: `${C}/trumbull.webp`, width: 800, height: 525,
          alt: "広間に大勢の男性が集まり、中央で5人が机の上に書類を差し出している油絵",
          caption: "トランブル『独立宣言』（1819年完成、合衆国議会議事堂）。起草委員会の5人が草案を議会に提出する場面を描く。実際の一場面ではなく、画家が理想化して構成した絵。",
          credit: { author: "John Trumbull", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Declaration_of_Independence_(1819),_by_John_Trumbull.jpg" },
        },
      ],
      figure: {
        type: "flow",
        dir: "col",
        title: "自由英作文の型",
        steps: [
          { label: "主張", sub: "I think 〜.", tone: "navy" },
          { label: "理由①", sub: "First, 〜.", tone: "blue" },
          { label: "具体例・説明", sub: "例：For example" },
          { label: "理由②", sub: "Second, 〜.", tone: "blue" },
          { label: "まとめ", sub: "To sum up, 〜.", tone: "yellow" },
        ],
      },
      cliff: "型はわかった。でも、自分の本当の意見が決まらないときはどうする？",
    },
    {
      heading: "立場は「本音」より「書きやすさ」で選ぶ",
      body: "自由英作文は、本当の意見を書かなくてもかまいません。{{理由と例を英語で書きやすいほう}}の立場を選びます。書く前に、日本語で理由を2つ、それぞれに例を1つずつメモしてから英語にすると、途中で話がずれません。理由は「お金」「時間」「健康」「経験」など、{{だれにでも伝わる観点}}から考えると見つけやすいです。",
      reading: [
        "自由英作文は、人生観をたずねる面接ではありません。採点者が見ているのは、{{主張がはっきりしているか}}、{{理由と具体例で支えられているか}}、{{英文が正しいか}}の3つです。ですから、本当の意見がどちらか決めきれないときは、{{理由と例を英語で書きやすいほう}}の立場を選んでかまいません。アルバイトの問題なら、賛成側は「経験」「お金の大切さ」、反対側は「勉強の時間」「健康」と、どちらにも書きやすい理由があります。自分が知っている単語で言える理由のほうを選びましょう。",
        "いちばん避けたいのは、どちらの立場か最後までわからない作文です。『The Elements of Style』は、この点もきっぱり言いきっています。「{{Make definite assertions.}}」（はっきり言いきれ。）あいまいで、ためらい、どちらにも転ばない言い方を避けよ、と。I agree and disagree.（賛成でもあり反対でもある）や It depends.（場合による）で書き始めると、そのあとの理由がどちらの立場を支えているのか、読む人にはわかりません。",
        "とはいえ、反対の意見を無視しろということではありません。高校の英作文では、{{譲歩}}の形を使うと、一段深い作文になります。Some people say that part-time jobs take time away from studying, but ...（アルバイトは勉強時間をうばうと言う人もいるが、…）と相手の言い分を一度認めてから、but のあとで自分の立場にもどるのです。大切なのは、最後に立っている場所が{{最初の主張と同じ}}であることです。書く前に、日本語で「立場→理由2つ→それぞれの例」をメモしておけば、途中で話がずれません。",
      ],
      recite: [{
        lang: "en", voice: "male",
        text: "Make definite assertions. Avoid tame, colorless, hesitating, non-committal language. Use the word not as a means of denial or in antithesis, never as a means of evasion.",
        ja: "はっきりと言いきりなさい。気の抜けた、色のない、ためらいがちな、どっちつかずの言葉は避けること。not という語は、打ち消すためか対比のために使い、言いのがれのためには決して使わないこと。",
        cite: "William Strunk Jr., The Elements of Style, Rule 11 (1918; 1920 edition)",
        source: "https://www.gutenberg.org/ebooks/37134",
      }],
      figure: {
        type: "tree",
        title: "書く前のメモ（アルバイトに賛成の場合）",
        root: {
          label: "賛成",
          sub: "バイトはするべき",
          tone: "navy",
          children: [
            { label: "理由① 経験", sub: "社会のしくみを学ぶ", tone: "blue", children: [{ label: "例", sub: "客への話し方を学ぶ" }] },
            { label: "理由② お金", sub: "お金の大切さを知る", tone: "blue", children: [{ label: "例", sub: "自分で買う喜び" }] },
          ],
        },
      },
      cliff: "立場とメモが決まったら、80語をどこにどれだけ使えばいい？",
    },
    {
      heading: "語数は、理由と具体例に多くふり分ける",
      body: "80語程度なら、主張とまとめはそれぞれ{{1文（10語前後）}}で十分です。残りの約60語を、{{2つの理由とその具体例}}に使います。語数が足りないときは、新しい理由を足すより、{{具体例をくわしくする}}ほうが話がまとまります。",
      reading: [
        "80語は、思ったより少ない量です。主張とまとめをそれぞれ1文（10語前後）にすると、残りは約60語。理由1つと具体例で30語ずつです。ここで多くの人がやってしまうのが、語数を「かせぐ」ための前置きです。I think that it is important for us to think about the fact that part-time jobs are good for high school students in many ways.（25語）この文が言っていることは、I think part-time jobs are good for high school students.（10語）とまったく同じです。前置きの15語は、何も伝えないまま貴重な語数を食べてしまいました。",
        "この落とし穴を100年以上前に見ぬいていたのが、コーネル大学の英語教授ウィリアム・ストランク（1869〜1946）です。1918年、彼は自分の授業の学生のために、規則を短く並べた小冊子『{{The Elements of Style}}』を自費で印刷しました。その13番目の規則が「{{Omit needless words.}}」（不要な語を省け）です。ストランクは、the fact that（〜という事実）のような言い回しは、出てくる文からすべて書き直して消せとまで言います。owing to the fact that は since に、in spite of the fact that は though に、he is a man who は he に。同じ意味が、ずっと少ない語で言えるのです。",
        "この小冊子を授業で手にした学生の一人が、のちに『シャーロットのおくりもの』を書く作家 E.B.ホワイトでした。ホワイトは1959年、恩師の本に手を加えて出版し直し、この本はアメリカの大学生や記者、作家が手元に置く文章の手引きとして、長く読みつがれています。ただし、ストランクの規則をよく読むと、「文を全部短くせよ」とは書いていません。求めているのは、{{一語一語に仕事をさせること（make every word tell）}}です。",
        "語数が足りないとき、新しい理由を3つ目、4つ目と足すと、どれも1文ずつの薄い作文になります。それより、{{具体例をくわしくする}}ほうが説得力が増します。For example, I work at a bakery on Saturdays. I learned to smile and say thank you to every customer.（たとえば、ぼくは毎週土曜にパン屋で働いている。どのお客さんにも笑顔でありがとうと言うことを覚えた。）こうした具体的な場面は、読む人の頭に絵をうかばせます。前置きを削って空いた語数は、こういう文のために使うのです。",
      ],
      recite: [{
        lang: "en", voice: "male",
        text: "Vigorous writing is concise. A sentence should contain no unnecessary words, a paragraph no unnecessary sentences, for the same reason that a drawing should have no unnecessary lines and a machine no unnecessary parts. This requires not that the writer make all his sentences short, or that he avoid all detail and treat his subjects only in outline, but that he make every word tell.",
        ja: "力強い文章は、簡潔である。1つの文には不要な語が、1つの段落には不要な文があってはならない。それは、絵に不要な線が、機械に不要な部品があってはならないのと同じ理由による。これは、書き手がすべての文を短くせよとか、細部をすべて省いて主題をあらすじだけでなぞれということではない。一語一語に仕事をさせよ、ということである。",
        cite: "William Strunk Jr., The Elements of Style, Rule 13 (1918; 1920 edition)",
        source: "https://www.gutenberg.org/ebooks/37134",
      }],
      photos: [
        {
          src: `${C}/cornell-1910s.webp`, width: 800, height: 511,
          alt: "とがった時計塔のある石造りの建物と芝生の小道を、帽子をかぶった学生たちが歩いている古い絵はがき",
          caption: "1910年代のコーネル大学（ニューヨーク州イサカ）の絵はがき。授業の合間の学生たち。ストランクはこのころこの大学で英語を教え、1918年に『The Elements of Style』を学生のために印刷した。",
          credit: { author: "Published for The Corner Bookstore, Ithaca by The Albertype Co.", license: "Public domain", source: "https://commons.wikimedia.org/wiki/File:Cornell_University_-_Between_classes_on_the_campus,_1910s.jpg" },
        },
      ],
      figure: {
        type: "area",
        kind: "bar",
        title: "80語の配分の目安",
        bars: [
          {
            label: "80語",
            parts: [
              { value: 10, label: "主張", tone: "navy" },
              { value: 30, label: "理由①＋例", tone: "blue" },
              { value: 30, label: "理由②＋例", tone: "blue" },
              { value: 10, label: "まとめ", tone: "yellow" },
            ],
            total: "80語",
          },
        ],
        scale: [
          { at: 0, label: "0" },
          { at: 40, label: "40" },
          { at: 80, label: "80" },
        ],
        scaleLabel: "語数",
      },
      reveal: "自由英作文の点数を決めるのは、語数そのものではなく、{{理由と具体例}}がどれだけ主張を支えているかです。the fact that のような{{不要な語}}は、何も伝えないまま限られた80語を食べてしまいます。だから「Omit needless words」は語数を減らせという意味ではなく、削って空いた語数を{{具体例に回し、一語一語に仕事をさせよ}}という教えなのです。前置きが短く、例がくわしい作文ほど、同じ80語でも中身が濃くなります。",
      cliff: "語数の使い方は決まった。最後に、減点されない英文の書き方を確かめましょう。",
    },
    {
      heading: "難しい表現より、まちがえない英文で書く",
      body: "採点では、内容のほかに{{文法・語法のミス}}が減点されます。自信のない難しい単語を使うより、{{中学レベルの確実な表現}}で書くほうが安全です。また、主張と理由がちぐはぐにならないように、書き終えたら最初の1文と最後の1文が同じ立場になっているか確かめます。",
      reading: [
        "英作文の採点では、内容と構成に加えて、{{文法・語法のミス}}が1つずつ減点されます。辞書で見つけたむずかしい単語や、自信のない構文を使うと、ミスの危険が一気に高まります。それより、{{中学レベルの確実な表現}}で正しく書くほうが、結果として高い点になります。とくに多いミスは、三単現の s の書き忘れ、時制のずれ、数えられる名詞の複数形や a / the の抜け、そして Because ... だけで終わる文です。",
        "かんたんな語で書くことは、守りの作戦というだけではありません。『The Elements of Style』の12番目の規則は、「{{具体的で、はっきりした、目に見える言葉を使え}}」というものです。ストランクは、A period of unfavorable weather set in.（好ましくない天候の期間が始まった。）という、もったいぶった文を、It rained every day for a week.（1週間、毎日雨が降った。）と書き直してみせます。後の文は中学で習う単語だけでできていますが、ずっとはっきりと場面が見えます。やさしい語は、{{安全で、しかも強い}}のです。",
        "書き終えたら、2つのことを確かめます。1つは、{{最初の1文と最後の1文が同じ立場}}になっているか。書いているうちに反対側の理由に引っぱられ、まとめで立場が変わってしまう作文は少なくありません。もう1つは、{{各理由に具体例がついているか}}。理由だけが並んでいたら、前置きを削って語数を作り、例を足します。主張で始まり、事実で支え、同じ主張で終わる。独立宣言からストランクの小冊子まで、英語の書き手たちが受けついできた型は、80語の作文でもそのまま使えます。",
      ],
      figure: {
        type: "formula",
        title: "理由①の部分を書く",
        prose: true,
        steps: [
          { expr: "{{I think that}} high school students should have part-time jobs.", note: "主張：立場を1文で" },
          { expr: "{{First,}} they can learn how society works.", note: "理由①" },
          { expr: "{{For example,}} working at a shop teaches them how to talk to customers.", note: "具体例：理由を支える" },
        ],
        note: "First / Second / For example などの目じるしをつけると、読む人が組み立てを追いやすい。",
      },
    },
  ],
  story: {
    kind: "manga4",
    title: "25語の前置き",
    panels: [
      {
        scene: "放課後の教室。ソウタが英作文の紙をかかげる。札に「80語！」。",
        lines: [
          { who: "ソウタ", text: "やった、80語書けた！" },
          { who: "ユイ", text: "1文目、長くない？" },
          { who: "ソウタ", text: "長いほど立派だろ" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ソウタ", look: "boy", x: 254, face: "smile", fx: "!", hand: [212, 222] },
            { who: "ユイ", look: "girl", x: 84, face: "think", fx: "?" },
          ],
          props: [
            { kind: "table", x: 0, y: 244 },
            { kind: "board", x: 150, y: 238, text: "80語！" },
          ],
        },
      },
      {
        scene: "ユイが1文目を数える。主張にたどり着くまでに25語かかっている。",
        lines: [
          { who: "ユイ", text: "主張まで25語もある" },
          { who: "ユイ", text: "ザ・ファクト・ザット…" },
          { who: "ソウタ", text: "つなぎに便利なんだよ" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ユイ", look: "girl", x: 254, face: "sweat", fx: "sweat", hand: [212, 226] },
            { who: "ソウタ", look: "boy", x: 84, face: "smile" },
          ],
          props: [
            { kind: "table", x: 0, y: 244 },
            { kind: "board", x: 160, y: 238, text: "前置き25語" },
          ],
        },
      },
      {
        scene: "先生がのぞきこむ。百年前の英語の規則を口にする。",
        lines: [
          { who: "先生", text: "オミット・ニードレス・ワーズ" },
          { who: "先生", text: "{{不要な語}}は削りなさい" },
          { who: "ソウタ", text: "80語に届かなくなる！" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "先生", look: "teacher", x: 250, face: "smile", hand: [204, 226] },
            { who: "ソウタ", look: "boy", x: 86, face: "surprise", fx: "!" },
          ],
          props: [
            { kind: "table", x: 0, y: 244 },
            { kind: "book", x: 170, y: 228, s: 0.85 },
          ],
        },
      },
      {
        scene: "ソウタが書き直す。1文目は10語に。札に「例に15語」。",
        lines: [
          { who: "ソウタ", text: "25語が10語になった" },
          { who: "ソウタ", text: "空いた15語で{{具体例}}だ" },
          { who: "先生", text: "一語一語を働かせてね" },
        ],
        art: {
          bg: "class",
          cast: [
            { who: "ソウタ", look: "boy", x: 254, face: "smile", fx: "idea", hand: [212, 222] },
            { who: "先生", look: "teacher", x: 86, face: "smile" },
          ],
          props: [
            { kind: "table", x: 0, y: 244 },
            { kind: "board", x: 150, y: 238, text: "例に15語" },
          ],
        },
      },
    ],
    note: "ソウタ・ユイ・先生は架空の人物で、会話はすべて創作です。Omit needless words. がストランク『The Elements of Style』（1918年）の13番目の規則であること、the fact that を書き直すよう説いていることは原著どおりです。25語と10語の例文は、この単元のためにつくったものです。",
  },
  mistakes: [
    { wrong: "I agree and disagree. のように、両方の立場を書く", right: "どちらか一方の立場をはっきり書く", why: "主張がはっきりしないと、理由とのつながりも弱くなります。設問が「賛成か反対か」なら一方を選びます。" },
    { wrong: "理由を3つも4つも並べて、どれも1文で終わる", right: "理由は2つにしぼり、それぞれに具体例をつける", why: "理由だけを並べると説得力が出ません。例や説明で支えるほうが評価されます。" },
    { wrong: "Because 〜. だけで1文にする", right: "This is because 〜. / 主節＋because 〜.", why: "Because 〜 は従属節なので、それだけでは文として完結しません。This is because 〜 か、主節とつないで書きます。" },
  ],
  check: [
    { q: "自由英作文の型を、4つの部分で順に言いましょう。", a: "主張 → 理由 → 具体例 → まとめ", why: "結論を先に言い、理由と例で支え、最後にもう一度まとめる。" },
    { q: "80語程度で書くとき、いちばん多く語数を使うのはどの部分？", a: "理由と具体例", why: "主張とまとめは1文ずつで十分。残りで理由を支える。" },
    { q: "立場は、本当の意見と書きやすさのどちらで選んでもよい？", a: "書きやすさで選んでよい", why: "評価されるのは意見の中身より、理由がはっきりした正しい英文かどうか。" },
  ],
  next: [
    { label: "ドリル「自由英作文」で鍛える", href: "/learn/eigo-ko/h-eng-skill-jiyu" },
    { label: "ひとつ前「和文英訳」", href: "/learn/lecture/h-eng-skill-wabun" },
    { label: "話して使う「スピーキング」", href: "/learn/lecture/h-eng-skill-speaking" },
  ],
};
