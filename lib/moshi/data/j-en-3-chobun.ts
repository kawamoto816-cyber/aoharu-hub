// 中3英語「長文読解」の単元模試 (C: 書き下ろしの長文・固定)。本文・問題はすべてオリジナル (この模試のために書いたもの。教科書・過去問の文は使っていない)。
// 1回 6問・満点100 (基本15×2・標準17×2・発展18×2)。記述1問は模範解答と採点観点で自己採点。A (生成) は使っていないので検算式はなし。
import type { QuestionC, UnitMoshi } from "../types";

const U = "j-en-3-chobun";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "設問を先に見て、段落ごとに要点を1行でつかむ");
const S2 = L(2, "it・they・this が指すものは、前から探す");
const S3 = L(3, "つなぎの語が、文と文の関係を教えてくれる");
const S4 = L(4, "内容に合う文は、本文の該当する場所にもどって選ぶ");

const PASSAGE = `①　Sora is a junior high school student in a small town. Every morning, she takes a bus to school. Last spring, she noticed that many people at the bus stop were just looking at their phones or standing quietly. "We wait about ten minutes here. People could read something during that time," she thought.

②　Sora talked with her friends in the volunteer club, and they decided to make a small bookshelf for the bus stop. They asked their families and neighbors for old books, and in two weeks they collected about sixty books. Then they put them on the shelf with a sign: "Take one, read it, and bring it back."

③　At first, only a few people used the shelf. Some books did not come back, and Sora felt sad. However, one day she found a note inside a book. It said, "Thank you. I read this on the bus every day. I brought two of my books for the shelf." After that, more people began to bring books, too.

④　Now the shelf has more than one hundred books. Sora says, "I wanted to give something to the people in my town. But they gave something back to us. A small idea can grow when people share it."`;

const NOTES = [
  { word: "notice(d)", meaning: "気づく" },
  { word: "volunteer club", meaning: "ボランティア部" },
  { word: "bookshelf / shelf", meaning: "本だな" },
  { word: "neighbor(s)", meaning: "近所の人" },
  { word: "collect(ed)", meaning: "集める" },
  { word: "sign", meaning: "看板・はり紙" },
  { word: "note", meaning: "短い手紙・メモ" },
  { word: "share", meaning: "分かち合う" },
];

const QS: QuestionC[] = [
  {
    id: "them-books",
    type: "C",
    difficulty: 1,
    points: 15,
    seconds: 60,
    skill: "知識・技能",
    prompt: "②段落の they put them on the shelf の them が指すものとして正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["集めた古い本", "家族や近所の人", "ボランティア部の友達", "バス停で待つ人々"],
      correct: 0,
      why: ["直前の文で集めた about sixty books（古い本）を本だなに置いた。", "家族や近所の人は本をたのんだ相手。たなに置くものではない。", "友達は they（置いた人）のほう。them ではない。", "バス停の人々は①段落の話。②段落の them ではない。"],
    },
    point: "them は前の文の複数の名詞をさがす",
    steps: [
      { title: "前からさがす", body: "them の前の文に出てくる複数のものは families・neighbors・{{old books / sixty books}}。", back: [S2] },
      { title: "入れて確かめる", body: "「{{本}}を本だなに置いた」なら意味が通ります。「近所の人をたなに置いた」では通じません。", back: [S2] },
    ],
  },
  {
    id: "sixty",
    type: "C",
    difficulty: 1,
    points: 15,
    seconds: 60,
    skill: "知識・技能",
    prompt: "ソラたちが2週間で集めた本は、およそ何冊ですか。",
    answer: {
      kind: "choice",
      options: ["約60冊", "約100冊", "約10冊", "2冊"],
      correct: 0,
      why: ["②段落に in two weeks they collected about sixty books とある。", "100冊以上は④段落の「今」の数。", "ten は①段落の待ち時間（約10分）。", "two は②段落の「2週間」と、③段落のメモの人が持ってきた本の数。"],
    },
    point: "数は「何の数か」を本文で確かめる",
    steps: [{ title: "数字の場所にもどる", body: "②段落 in two weeks they collected {{about sixty books}}。本文には ten・two・one hundred など数がいくつも出るので、{{何の数か}}を確かめます。", back: [S4] }],
  },
  {
    id: "however",
    type: "C",
    difficulty: 2,
    points: 17,
    seconds: 90,
    skill: "思考・判断・表現",
    prompt: "③段落の However のあとに書かれている内容として、もっとも適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["本にはさまれたメモを見つけ、そのあと本を持ってくる人が増えた", "本が返ってこなくなり、本だながからっぽになった", "ソラが本だなをやめることにした", "バス停で待つ時間が長くなった"],
      correct: 0,
      why: ["However のあと、メモを見つけ、After that, more people began to bring books と続く。", "本が返ってこなかったのは However の前の内容。からっぽになったとは書いていない。", "やめたとは書いていない。", "待ち時間が長くなったとは書いていない。"],
    },
    point: "However のあとは、前と反対の内容",
    steps: [
      { title: "前の内容", body: "However の前は「使う人が少なく、本が返ってこず、ソラは{{悲しかった}}」。", back: [S1] },
      { title: "反対の内容", body: "{{However}} のあとは話が良い方へ変わり、メモを見つけて{{本を持ってくる人が増えた}}。", back: [S3] },
    ],
  },
  {
    id: "it-note",
    type: "C",
    difficulty: 2,
    points: 17,
    seconds: 75,
    skill: "知識・技能",
    prompt: "③段落の It said, \"Thank you. …\" の It が指すものとして正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["a note（メモ）", "a book（本）", "the shelf（本だな）", "the bus（バス）"],
      correct: 0,
      why: ["「それには『ありがとう…』と書いてあった」。書いてあったのは本の中のメモ。", "すぐ前の a book にひかれやすいが、メッセージが書いてあったのはメモ。", "本だなに書いてあったのは②段落の sign。", "バスには何も書いていない。"],
    },
    point: "近くの語ではなく、意味が通るものを選ぶ",
    steps: [{ title: "入れて確かめる", body: "直前は she found {{a note}} inside a book。「{{メモ}}には『ありがとう…』と書いてあった」が意味の通る読み方です。", trap: "いちばん近い a book にとびつかない。", back: [S2] }],
  },
  {
    id: "naiyo",
    type: "C",
    difficulty: 3,
    points: 18,
    seconds: 120,
    skill: "思考・判断・表現",
    prompt: "本文の内容に合うものはどれですか。",
    answer: {
      kind: "choice",
      options: [
        "ソラは、バス停で待つ時間に人々が何かを読めればよいと考えた。",
        "ソラは一人で本を集め、2週間で100冊以上を本だなに置いた。",
        "本だなは、はじめから多くの人に使われた。",
        "メモを書いた人は、本だなに自分の本を3冊持ってきた。",
      ],
      correct: 0,
      why: [
        "①段落 People could read something during that time と考えている。",
        "ボランティア部の友達といっしょに集め、2週間で約60冊。100冊以上は今の数。",
        "③段落 At first, only a few people used the shelf. とある。",
        "メモには I brought two of my books とある。2冊。",
      ],
    },
    point: "数・人・時を本文で1つずつ照らす",
    steps: [
      { title: "キーワードで本文にもどる", body: "選択肢の「一人で」「100冊」「はじめから」「3冊」を、本文の該当する場所と照らします。", back: [S4] },
      { title: "少しだけちがうところ", body: "まちがいの選択肢は、{{人}}（友達と）・{{数}}（60冊・2冊）・{{時}}（at first）がずらしてあります。", back: [S4] },
    ],
  },
  {
    id: "grow",
    type: "C",
    difficulty: 3,
    points: 18,
    seconds: 240,
    skill: "思考・判断・表現",
    prompt: "④段落でソラは A small idea can grow と言っています。ソラがこう言えるのは、どのようなことがあったからですか。本文の内容にそって、日本語で50字以内で書きなさい。",
    answer: {
      kind: "written",
      limit: { max: 50, unit: "字" },
      model: "メモをきっかけに町の人々も自分の本を持ってくるようになり、本だなの本が百冊以上に増えたから。",
      rubric: [
        { label: "町の人々が自分の本を持ってくるようになったことを書いている", points: 10, keywords: ["持って", "本をくれ", "本を持ち寄"] },
        { label: "本が増えた（今は百冊以上ある）ことを書いている", points: 8, keywords: ["増え", "百冊", "100冊"] },
      ],
    },
    point: "③の変化と④の今をつないでまとめる",
    steps: [
      { title: "段落の要点をつなぐ", body: "③「メモのあと、{{本を持ってくる人が増えた}}」、④「今は{{100冊以上}}」。この変化が「小さな考えが育った」の中身です。", back: [S1] },
      { title: "But のあとに注目", body: "④の {{But}} they gave something back to us.（町の人がお返しをくれた）が、ソラの言いたいことです。", back: [S3] },
    ],
  },
];

// ---- 入試モード用の長文 (examOnly: 単元模試の1回分には出さない。公立入試型の「対話文・資料の読み取り」「長文読解」で使う) ----
// 本文3本 (学校行事のブログ・メールのやりとり・スピーチ) と問題はすべてこのために書いたオリジナル。

const BLOG = `①　Last Saturday, our school had its school festival. My class, 3-B, decided to open a café in our classroom. We wanted to serve tea and cookies, but we also wanted to show something special about our town. So we decided to use tea leaves and honey from local farms.

②　Preparing for the café was not easy. First, we had to choose a name. Some students wanted an English name, and others wanted a Japanese one. After a long discussion, we chose "Café Hidamari." Hidamari means a warm and sunny place. Next, we visited a tea farm near our school. The farmer, Mr. Ueda, showed us how to make good green tea. He said, "Don't use water that is too hot. Then the tea will taste sweet." We practiced it many times after school.

③　On the day of the festival, a lot of people came to our café. At first, we were very busy, and we made some mistakes. One student brought the wrong drink to a customer, and another dropped a plate of cookies. I was worried, but our teacher said, "Don't be afraid of mistakes. Smile and try again." After that, we worked together better. Some of us made tea, some served it, and others explained where the tea and honey came from.

④　In the afternoon, an elderly woman said to me, "This tea reminds me of my childhood. I didn't know that such good tea was grown in our town." Her words made me very happy. We sold more than two hundred cups of tea that day, and we gave some of the money to the tea farm to say thank you.

⑤　Through this experience, I learned two things. One is that working as a team is more important than doing everything perfectly. The other is that our town has many good things that we don't know about yet. I want to find more of them and share them with other people.`;

const BLOG_NOTES = [
  { word: "serve", meaning: "（飲食物を）出す" },
  { word: "local", meaning: "地元の" },
  { word: "discussion", meaning: "話し合い" },
  { word: "customer", meaning: "客" },
  { word: "elderly", meaning: "年配の" },
  { word: "remind(s) A of B", meaning: "A に B を思い出させる" },
  { word: "childhood", meaning: "子どものころ" },
];

const BLOG_QS: QuestionC[] = [
  {
    id: "blog-it",
    type: "C",
    difficulty: 1,
    points: 4,
    seconds: 60,
    skill: "知識・技能",
    prompt: "②段落の We practiced it many times の it が指す内容として、もっとも適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["熱すぎないお湯で、おいしい緑茶をいれること", "カフェの名前を決めること", "茶畑までの道を歩くこと", "クッキーを焼くこと"],
      correct: 0,
      why: [
        "直前でウエダさんが「熱すぎるお湯を使わないで」と、おいしい緑茶のいれ方を教えている。それを何度も練習した。",
        "名前は②段落の前半で、話し合いで決めたこと。練習するものではない。",
        "茶畑を訪ねたことは書いてあるが、道を歩く練習ではない。",
        "クッキーを焼く練習の話は本文にない。",
      ],
    },
    point: "it は直前の文の内容をさがす",
    steps: [
      { title: "前の文にもどる", body: "直前はウエダさんの言葉 Don't use water that is too hot.（{{熱すぎるお湯を使わないで}}）。", back: [S2] },
      { title: "入れて確かめる", body: "「{{熱すぎないお湯でお茶をいれること}}を何度も練習した」なら意味が通ります。", back: [S2] },
    ],
  },
  {
    id: "blog-after-that",
    type: "C",
    difficulty: 2,
    points: 5,
    seconds: 75,
    skill: "思考・判断・表現",
    prompt: "③段落の After that, we worked together better. の that が指すこととして、もっとも適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["先生が「失敗をこわがらないで。笑顔でもう一度やってみて」と言ったこと", "生徒がちがう飲み物を運んだこと", "たくさんの人がカフェに来たこと", "年配の女性が話しかけてくれたこと"],
      correct: 0,
      why: [
        "直前の文は先生の言葉。その言葉のあと、みんなでうまく協力できるようになった。",
        "失敗は先生の言葉より前の出来事。そのあとでうまくいったのではない。",
        "人が来て忙しくなったのは「失敗した」原因のほう。",
        "年配の女性の話は④段落の午後の出来事。",
      ],
    },
    point: "After that の that は、すぐ前の出来事",
    steps: [{ title: "流れで読む", body: "失敗した → 先生が {{Don't be afraid of mistakes.}} と言った → {{After that}}（そのあと）うまく協力できた、という流れです。", back: [S2, S3] }],
  },
  {
    id: "blog-why-local",
    type: "C",
    difficulty: 2,
    points: 6,
    seconds: 120,
    skill: "思考・判断・表現",
    prompt: "次の質問に、本文の内容にそって英語で答えなさい。\nWhy did Haruto's class decide to use tea leaves and honey from local farms?",
    answer: {
      kind: "written",
      limit: { max: 20, unit: "語" },
      model: "Because they wanted to show something special about their town.",
      alsoModels: ["They wanted to show something special about their town."],
      rubric: [
        { label: "「町について特別なものを見せたかったから」という内容を答えている", points: 4, keywords: ["show", "town"] },
        { label: "主語を they にし、wanted（過去形）で正しい英文にしている", points: 2, keywords: ["they wanted"] },
      ],
    },
    point: "Why の答えは so の前にある理由をさがす",
    steps: [
      { title: "理由の場所", body: "①段落 we also wanted to show something special about our town. {{So}} we decided to use …。So の前が理由です。", back: [S3] },
      { title: "主語を言いかえる", body: "質問は Haruto's class についてなので、we → {{they}}、our town → {{their town}} にします。", back: [S4] },
    ],
  },
  {
    id: "blog-naiyo",
    type: "C",
    difficulty: 2,
    points: 5,
    seconds: 120,
    skill: "思考・判断・表現",
    prompt: "本文の内容に合うものはどれですか。",
    answer: {
      kind: "choice",
      options: [
        "ハルトたちは、売上の一部を茶畑にお礼として渡した。",
        "カフェの名前は、すぐに全員一致で決まった。",
        "ハルトのクラスは、カフェで一度も失敗しなかった。",
        "年配の女性は、この町でよいお茶がとれることを前から知っていた。",
      ],
      correct: 0,
      why: [
        "④段落 we gave some of the money to the tea farm to say thank you とある。",
        "②段落 After a long discussion（長い話し合いのあと）に決まった。",
        "③段落に、飲み物をまちがえたり、皿を落としたりした失敗が書いてある。",
        "女性は I didn't know that such good tea was grown in our town. と言っている。",
      ],
    },
    point: "選択肢の語句で本文にもどって照らす",
    steps: [{ title: "1つずつ照らす", body: "「すぐに」「一度も」「前から知っていた」は、本文の {{long discussion}}・{{mistakes}}・{{I didn't know}} と食いちがいます。", back: [S4] }],
  },
  {
    id: "blog-main",
    type: "C",
    difficulty: 3,
    points: 6,
    seconds: 120,
    skill: "思考・判断・表現",
    prompt: "このブログでハルトがもっとも伝えたいこととして、適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: [
        "Working as a team was important, and he found good things in his own town.",
        "Green tea tastes better when we use very hot water.",
        "A school café should have an English name.",
        "It is easy to sell more than two hundred cups of tea.",
      ],
      correct: 0,
      why: [
        "⑤段落で学んだこととして「チームで働くこと」と「町のよいもの」の2つをまとめている。",
        "ウエダさんは熱すぎるお湯を使わないようにと言った。逆の内容。",
        "名前の話は②段落の一部で、ブログの中心ではない。",
        "200杯以上売れたことは書いてあるが、「簡単だ」とは書いていない。",
      ],
    },
    point: "要旨は最後の段落のまとめから",
    steps: [{ title: "まとめの段落を見る", body: "⑤段落 I learned two things. のあとに、{{working as a team}} と {{our town has many good things}} の2つが書かれています。", back: [S1] }],
  },
];

const MAILS = `【メール1】
From: Yui
To: Olivia
Subject: Your visit in April

Hi Olivia,

Thank you for your last email. I was very happy to hear that your class will visit our school next April. Our teacher asked us to plan a one-day program for your class. We have three ideas, but we can choose only two because the visit is short.

The first idea is a calligraphy lesson. You can write a kanji with a brush. The second idea is a cooking class. We can make onigiri together. The third idea is a walk around our town. There is an old shrine and a shopping street near our school.

Which two do you want to try? Please ask your classmates and tell me.

Best wishes,
Yui

【メール2】
From: Olivia
To: Yui
Subject: Re: Your visit in April

Hi Yui,

Thanks for the great ideas! I asked my classmates yesterday. Most of them chose the cooking class because they love Japanese food. Some of them have never eaten onigiri, so they are really excited. For the other activity, the votes for calligraphy and the town walk were almost the same. In the end, we chose the town walk. We will stay in Japan for only ten days, and we want to see how people live in a Japanese town.

By the way, one of my classmates, Ben, cannot eat eggs. Could you check the food for the cooking class? Also, it may rain in April. If it rains, what can we do instead of the walk?

See you soon,
Olivia

【メール3】
From: Yui
To: Olivia
Subject: Re: Re: Your visit in April

Hi Olivia,

Thank you for telling me about Ben. We are going to make onigiri with salmon and umeboshi, so there are no eggs in them. If it rains, we will have the calligraphy lesson in the art room instead. Then you can try calligraphy, too!

Yui`;

const MAILS_NOTES = [
  { word: "program", meaning: "（行事の）予定・内容" },
  { word: "calligraphy", meaning: "書道" },
  { word: "brush", meaning: "筆" },
  { word: "shrine", meaning: "神社" },
  { word: "vote(s)", meaning: "票" },
  { word: "in the end", meaning: "最終的に" },
  { word: "instead of 〜", meaning: "〜の代わりに" },
  { word: "salmon", meaning: "さけ" },
];

const MAILS_QS: QuestionC[] = [
  {
    id: "mail-chose",
    type: "C",
    difficulty: 1,
    points: 4,
    seconds: 60,
    skill: "知識・技能",
    prompt: "オリビアのクラスが最終的に選んだ2つの活動はどれですか。",
    answer: {
      kind: "choice",
      options: ["料理教室と町歩き", "書道と料理教室", "書道と町歩き", "料理教室と神社の掃除"],
      correct: 0,
      why: [
        "メール2で、ほとんどの人が料理教室を選び、もう1つは In the end, we chose the town walk. とある。",
        "書道は町歩きとほぼ同じ票だったが、選ばれなかった。",
        "料理教室は多くの人が選んでいる。",
        "神社の掃除は提案されていない。神社は町歩きで見る場所。",
      ],
    },
    point: "In the end のあとが最終的な答え",
    steps: [{ title: "2つの答えをさがす", body: "Most of them chose {{the cooking class}} と、In the end, we chose {{the town walk}} の2か所です。", back: [S3, S4] }],
  },
  {
    id: "mail-them",
    type: "C",
    difficulty: 1,
    points: 4,
    seconds: 60,
    skill: "知識・技能",
    prompt: "メール3の there are no eggs in them の them が指すものはどれですか。",
    answer: {
      kind: "choice",
      options: ["料理教室で作るおにぎり", "オリビアのクラスメート", "美術室", "ほかの2つの案"],
      correct: 0,
      why: [
        "直前は We are going to make onigiri with salmon and umeboshi。「それら（おにぎり）には卵が入っていない」。",
        "人の中に卵が入っているでは意味が通らない。",
        "美術室は次の文に出てくる語で、them より後ろ。",
        "ほかの2つの案は最後の文の話。",
      ],
    },
    point: "代名詞は前から、意味が通るものを",
    steps: [{ title: "入れて確かめる", body: "「{{おにぎり}}には卵が入っていない」。ベンが卵を食べられないことへの返事なので、意味が通ります。", back: [S2] }],
  },
  {
    id: "mail-why-walk",
    type: "C",
    difficulty: 2,
    points: 6,
    seconds: 120,
    skill: "思考・判断・表現",
    prompt: "次の質問に、本文の内容にそって英語で答えなさい。\nWhy did Olivia's class choose the town walk?",
    answer: {
      kind: "written",
      limit: { max: 20, unit: "語" },
      model: "Because they want to see how people live in a Japanese town.",
      alsoModels: ["They want to see how people live in a Japanese town."],
      rubric: [
        { label: "「日本の町で人々がどう暮らしているかを見たいから」という内容を答えている", points: 4, keywords: ["live", "town"] },
        { label: "主語を they にし、how people live の語順で正しい英文にしている", points: 2, keywords: ["how people live"] },
      ],
    },
    point: "Why には Because 〜. で、理由の文を答える",
    steps: [
      { title: "理由の文", body: "In the end, we chose the town walk. のすぐあとの {{we want to see how people live in a Japanese town}} が理由です。", back: [S3] },
      { title: "主語を言いかえる", body: "we → {{they}} にして、Because they want to see … と答えます。", back: [S4] },
    ],
  },
  {
    id: "mail-naiyo",
    type: "C",
    difficulty: 2,
    points: 5,
    seconds: 120,
    skill: "思考・判断・表現",
    prompt: "メールの内容に合うものはどれですか。",
    answer: {
      kind: "choice",
      options: [
        "雨がふった場合、オリビアのクラスは料理教室と書道を体験することになる。",
        "オリビアのクラスは、日本に1か月滞在する。",
        "ベンは、おにぎりを食べたことがある。",
        "ユイは、活動を3つとも行うつもりで計画を立てていた。",
      ],
      correct: 0,
      why: [
        "メール3 If it rains, we will have the calligraphy lesson … instead. とある。料理教室はそのまま行うので、料理と書道になる。",
        "for only ten days（10日間だけ）とある。",
        "おにぎりを食べたことがないのは Some of them。ベンについては卵が食べられないことしか書いていない。",
        "メール1で we can choose only two（2つしか選べない）と書いている。",
      ],
    },
    point: "数・期間・条件（if）に気をつける",
    steps: [{ title: "if の文を読む", body: "{{If it rains}}, 町歩きの代わりに書道。晴れなら料理＋町歩き、雨なら料理＋書道です。", trap: "雨でも料理教室は行う。町歩きだけが書道に変わる。", back: [S4] }],
  },
  {
    id: "mail-purpose",
    type: "C",
    difficulty: 3,
    points: 6,
    seconds: 120,
    skill: "思考・判断・表現",
    prompt: "メール2で、オリビアが伝えていることとして、もっとも適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: [
        "クラスで選んだ活動とその理由を伝え、食べ物と雨の日について確認をたのんでいる。",
        "日本に行けなくなったことを伝え、計画を取りやめるようにたのんでいる。",
        "書道を必ず入れてほしいとたのんでいる。",
        "ユイの案はどれもつまらないので、別の案を出してほしいとたのんでいる。",
      ],
      correct: 0,
      why: [
        "前半で選んだ活動と理由、By the way のあとでベンの卵と雨の日のことをたずねている。",
        "See you soon と書いており、行けなくなったとは書いていない。",
        "書道は選ばれなかった。",
        "Thanks for the great ideas! と、案をほめている。",
      ],
    },
    point: "By the way の前後で、話題が変わる",
    steps: [{ title: "メールを2つに分ける", body: "前半は「{{選んだ活動と理由}}」、{{By the way}} のあとは「{{たのみごと・質問}}」です。", back: [S1, S3] }],
  },
];

const SPEECH = `Hello, everyone. Today I want to talk about something that changed me this year.

①　Until last year, I was very shy. When teachers asked questions in class, I often knew the answers, but I could not raise my hand. I was afraid that my voice would shake and everyone would laugh at me.

②　Last April, my homeroom teacher asked me to read the morning announcements once a week. I wanted to say no, but I could not say that, either. So I said, "I'll try." On my first day, my voice was very small, and I read too fast. After that, a first-year student came to me and said, "I couldn't hear you well, but I liked the news about the library." I was surprised. Someone was really listening to me.

③　From that day, I started to practice. Every evening, I read the newspaper aloud to my family. My brother checked the time with a watch, and my mother told me which words were hard to hear. Little by little, I learned to speak slowly and clearly. I also began to write my own short comments about school news, such as a club's game or a new book in the library.

④　Now, many students tell me what they want me to say in the announcements. Last month, a student asked me to tell everyone about her lost umbrella, and it came back to her the next day. I learned that my voice can help people.

⑤　I am still a little shy. But now I know that I don't have to change everything at once. If you have something you want to try, please take one small step. Your small step may help someone you don't know yet. Thank you for listening.`;

const SPEECH_NOTES = [
  { word: "shy", meaning: "はずかしがりの・内気な" },
  { word: "shake", meaning: "ふるえる" },
  { word: "announcement(s)", meaning: "放送・お知らせ" },
  { word: "aloud", meaning: "声に出して" },
  { word: "little by little", meaning: "少しずつ" },
  { word: "at once", meaning: "一度に" },
];

const SPEECH_QS: QuestionC[] = [
  {
    id: "speech-that",
    type: "C",
    difficulty: 1,
    points: 4,
    seconds: 60,
    skill: "知識・技能",
    prompt: "②段落の I could not say that, either の that が指す内容として、もっとも適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["「いやです（no）」と断ること", "「やってみます」と答えること", "放送でお知らせを読むこと", "図書館のニュース"],
      correct: 0,
      why: [
        "直前に I wanted to say no とある。「no と言いたかったが、それも言えなかった」。",
        "「やってみます」は、そのあとに実際に言った言葉。",
        "放送を読むことは先生にたのまれた内容で、say that の that ではない。",
        "図書館のニュースは、1年生の言葉に出てくる別の話。",
      ],
    },
    point: "that は直前の語句・内容を指す",
    steps: [{ title: "直前を見る", body: "I wanted to {{say no}}, but I could not {{say that}}。同じ say のあとにある no を、that で受けています。", back: [S2] }],
  },
  {
    id: "speech-surprised",
    type: "C",
    difficulty: 2,
    points: 5,
    seconds: 90,
    skill: "思考・判断・表現",
    prompt: "②段落で、話し手（アオイ）がおどろいたのはなぜですか。もっとも適切なものを選びなさい。",
    answer: {
      kind: "choice",
      options: [
        "声が小さく早口だったのに、自分の放送を本当に聞いてくれている人がいたから。",
        "1年生から、声が大きすぎると注意されたから。",
        "先生が、毎日放送を読むようにと言ったから。",
        "図書館に新しい本がたくさん入ったから。",
      ],
      correct: 0,
      why: [
        "I was surprised. のすぐあとに Someone was really listening to me. と理由が書いてある。",
        "1年生は「よく聞こえなかった」と言っており、大きすぎるとは言っていない。",
        "先生がたのんだのは once a week（週に1回）。",
        "図書館の本が入ったことは、おどろいた理由ではない。",
      ],
    },
    point: "気持ちの文のすぐあとに、理由がある",
    steps: [{ title: "気持ち→理由", body: "I was surprised. → {{Someone was really listening to me.}} 気持ちを表す文の前後に理由が書かれています。", back: [S4] }],
  },
  {
    id: "speech-practice",
    type: "C",
    difficulty: 2,
    points: 6,
    seconds: 120,
    skill: "思考・判断・表現",
    prompt: "次の質問に、本文の内容にそって英語で答えなさい。\nWhat did Aoi do every evening to practice?",
    answer: {
      kind: "written",
      limit: { max: 15, unit: "語" },
      model: "She read the newspaper aloud to her family.",
      alsoModels: ["She read the newspaper aloud."],
      rubric: [
        { label: "「新聞を声に出して読んだ」という内容を答えている", points: 4, keywords: ["newspaper", "aloud"] },
        { label: "主語を She にし、read（過去形）で正しい英文にしている", points: 2, keywords: ["She read"] },
      ],
    },
    point: "What did 〜 do? には、過去形の動詞で答える",
    steps: [
      { title: "答えの場所", body: "③段落 {{Every evening}}, I read the newspaper aloud to my family. が答えの文です。", back: [S4] },
      { title: "主語を言いかえる", body: "I → {{She}}、my family → {{her family}} にします。read は過去形も read です。", back: [S4] },
    ],
  },
  {
    id: "speech-naiyo",
    type: "C",
    difficulty: 2,
    points: 5,
    seconds: 120,
    skill: "思考・判断・表現",
    prompt: "スピーチの内容に合うものはどれですか。",
    answer: {
      kind: "choice",
      options: [
        "アオイの放送をきっかけに、なくなったかさが持ち主のもとにもどった。",
        "アオイの母は、時計で読む時間をはかった。",
        "アオイは、もうまったくはずかしがらなくなった。",
        "アオイは、自分から放送係をやりたいと先生にたのんだ。",
      ],
      correct: 0,
      why: [
        "④段落 it came back to her the next day とある。",
        "時間をはかったのは brother（兄・弟）。母は聞き取りにくい語を教えた。",
        "⑤段落 I am still a little shy. とある。",
        "先生にたのまれ、本当は断りたかった。",
      ],
    },
    point: "だれが何をしたかを取りちがえない",
    steps: [{ title: "人と行動を照らす", body: "③段落は {{brother}}＝時間をはかる、{{mother}}＝聞き取りにくい語を教える。人と行動の組み合わせをずらした選択肢に注意。", back: [S4] }],
  },
  {
    id: "speech-message",
    type: "C",
    difficulty: 3,
    points: 6,
    seconds: 120,
    skill: "思考・判断・表現",
    prompt: "このスピーチでアオイがもっとも伝えたいこととして、適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: [
        "We don't have to change all at once; one small step can help others.",
        "Shy people should not read announcements.",
        "We should read the newspaper every evening.",
        "It is important to speak as fast as we can.",
      ],
      correct: 0,
      why: [
        "⑤段落 I don't have to change everything at once … please take one small step. Your small step may help someone … とまとめている。",
        "アオイ自身がはずかしがりでも放送を続け、人の役に立った。逆の内容。",
        "新聞を読むのはアオイの練習方法で、聞き手へのいちばんのメッセージではない。",
        "アオイは slowly and clearly（ゆっくり、はっきり）話せるようになった。",
      ],
    },
    point: "スピーチの主張は最後の呼びかけに",
    steps: [{ title: "呼びかけの文", body: "⑤段落の {{please take one small step}} が聞き手への呼びかけです。スピーチでは、最後に言いたいことをまとめることが多い。", back: [S1] }],
  },
];

export const J_EN_3_CHOBUN_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "中3",
  minutes: 18,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "長文読解「バス停の小さな図書館」",
      lead: "次の英文を読んで、あとの問いに答えなさい。（①〜④は段落の番号です）",
      style: "reading",
      material: [{ kind: "passage", lang: "en", title: "The Little Library at the Bus Stop", body: PASSAGE, notes: NOTES }],
      questions: QS,
    },
    {
      id: `${U}/n1`,
      title: "長文読解「文化祭のクラスカフェ」（ブログ）",
      lead: "次の英文は、中学3年生のハルトが学校のブログに書いた記事です。読んで、あとの問いに答えなさい。（①〜⑤は段落の番号です）",
      style: "reading",
      examOnly: true,
      material: [{ kind: "passage", lang: "en", title: "Our Class Café at the School Festival", body: BLOG, notes: BLOG_NOTES }],
      questions: BLOG_QS,
    },
    {
      id: `${U}/n2`,
      title: "メールの読み取り「交流校の訪問の計画」",
      lead: "次の英文は、中学生のユイと、来年4月にユイの学校を訪れる交流校の生徒オリビアとのメールのやりとりです。読んで、あとの問いに答えなさい。",
      style: "reading",
      examOnly: true,
      material: [{ kind: "passage", lang: "en", title: "Emails between Yui and Olivia", body: MAILS, notes: MAILS_NOTES }],
      questions: MAILS_QS,
    },
    {
      id: `${U}/n3`,
      title: "長文読解「小さな一歩」（スピーチ）",
      lead: "次の英文は、中学3年生のアオイが英語の授業で行ったスピーチです。読んで、あとの問いに答えなさい。（①〜⑤は段落の番号です）",
      style: "reading",
      examOnly: true,
      material: [{ kind: "passage", lang: "en", title: "One Small Step", body: SPEECH, notes: SPEECH_NOTES }],
      questions: SPEECH_QS,
    },
  ],
};
