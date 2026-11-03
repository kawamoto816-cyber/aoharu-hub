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
  ],
};
