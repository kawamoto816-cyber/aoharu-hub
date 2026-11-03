// 高校英語（文法）「形容詞・副詞」の単元模試 (B: 問題プールからシードで選ぶ)。問題・例文はすべてオリジナル (教科書・過去問・市販教材の文は使っていない)。
// 節1 語法 (プール12問: 基本4・標準4・発展4) から5問 (基本2・標準2・発展1)、
// 節2 並べかえ (プール4問: 基本2・標準2) から2問 (基本1・標準1)。1回7問・100点 (13×3＋15×3＋16＝100)。
// A (生成) は使っていないので数値の検算はなし。choice・term・order の正答は check-moshi が採点器で満点になるか確かめる。
import type { QuestionB, UnitMoshi } from "../types";

const U = "h-eng-gram-keiyoshi";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "形容詞の2つの使い方");
const S2 = L(2, "数えられるかどうかで「多い・少ない」を選ぶ");
const S3 = L(3, "副詞は名詞以外を説明する");
const S4 = L(4, "頻度の副詞は「どのくらいよく」と置き場所");
const S5 = L(5, "-ly がつくと意味が変わる副詞");
const S6 = L(6, "of＋抽象名詞は、後ろから名詞を説明する形容詞のかたまり");

const P = { 1: 13, 2: 15, 3: 16 } as const;
const T = { 1: 45, 2: 60, 3: 90 } as const;
const TO = { 1: 60, 2: 75, 3: 90 } as const;
type Sk = QuestionB["skill"];
const base = (id: string, difficulty: 1 | 2 | 3, skill: Sk = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });
const ord = (id: string, difficulty: 1 | 2 | 3) => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: TO[difficulty], skill: "知識・技能" as Sk });
const ASK = "空所に入る最も適切なものはどれですか。";
const NARABE = "日本語に合うように語句を並べかえなさい。使わない語が1つあります。";

const FORMS: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("much-juice", 1),
    prompt: `There isn't (　　) orange juice left in the bottle.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["much", "many", "a few", "few"],
      correct: 0,
      why: [
        "juice は数えられない名詞。量が「多い」は much。",
        "many は数えられる名詞の複数形に使う。",
        "a few は数えられる名詞に使う。",
        "few も数えられる名詞に使う。",
      ],
    },
    point: "数えられない名詞 → much・little",
    steps: [{ title: "数えられるか", body: "juice は{{数えられない}}名詞。「多くない」は not {{much}}。", back: [S2] }],
  },
  {
    ...base("well-sings", 1),
    prompt: `My brother sings very (　　).\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["well", "good", "nice", "best"],
      correct: 0,
      why: [
        "動詞 sings を説明するのは副詞。good の副詞は well。",
        "good は形容詞。動詞を説明できない。",
        "nice も形容詞。",
        "best は最上級で、very のあとに置けない。",
      ],
    },
    point: "動詞を説明 → 副詞 well",
    steps: [{ title: "何を説明するか", body: "説明しているのは動詞 sings。動詞を説明するのは{{副詞}}なので {{well}}。", back: [S3] }],
  },
  {
    ...base("rarely-coffee", 1, "思考・判断・表現"),
    prompt: `My father (　　) drinks coffee. He usually has green tea instead.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["rarely", "always", "usually", "often"],
      correct: 0,
      why: [
        "ふだんは緑茶を飲むので、コーヒーは「めったに飲まない」。rarely。",
        "always（いつも）だと、後ろの文と合わない。",
        "usually（たいてい）だと、緑茶を飲む文と合わない。",
        "often（よく）も、後ろの文と合わない。",
      ],
    },
    point: "rarely ＝めったに〜ない",
    steps: [{ title: "頻度", body: "後ろの文から、コーヒーは{{ほとんど飲まない}}。頻度の副詞 {{rarely}} を一般動詞の前に置きます。", back: [S4] }],
  },
  {
    ...base("a-few-friends", 1),
    prompt: `I have (　　) friends in Australia, so I sometimes write to them.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["a few", "a little", "much", "little"],
      correct: 0,
      why: [
        "friends は数えられる名詞の複数形。「少しいる」は a few。",
        "a little は数えられない名詞に使う。",
        "much は数えられない名詞に使う。",
        "little も数えられない名詞に使う。",
      ],
    },
    point: "数えられる名詞 → a few・few",
    steps: [{ title: "数えられるか", body: "friends は{{数えられる}}名詞。「少しある」は {{a few}}。", back: [S2] }],
  },
  // ---- 標準 ----
  {
    ...base("sleeping-baby", 2),
    prompt: `Please be quiet. Don't wake the (　　) baby.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["sleeping", "asleep", "awake", "alone"],
      correct: 0,
      why: [
        "名詞の前に置いて説明できる（限定用法）のは sleeping。",
        "asleep は叙述用法だけ（The baby is asleep.）で、名詞の前には置かない。",
        "awake も叙述用法がふつうで、意味も「起きている」で合わない。",
        "alone も名詞の前には置かない。",
      ],
    },
    point: "asleep は名詞の前に置けない",
    steps: [{ title: "限定と叙述", body: "名詞の前（{{限定用法}}）に置けるのは sleeping。{{asleep}} は be動詞のあと（叙述用法）だけで使います。", back: [S1] }],
  },
  {
    ...base("few-people", 2, "思考・判断・表現"),
    prompt: `It was a rainy day, so there were (　　) people on the beach. It looked empty.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["few", "a few", "little", "a little"],
      correct: 0,
      why: [
        "people は数えられる名詞。「がらんとしていた」ので否定的な「ほとんどいない」の few。",
        "a few は「少しはいる」と肯定的。empty と合わない。",
        "little は数えられない名詞に使う。",
        "a little は数えられない名詞に使う。",
      ],
    },
    point: "few ＝ほとんどない／a few ＝少しある",
    steps: [
      { title: "数えられるか", body: "people は数えられるので few か a few。", back: [S2] },
      { title: "否定か肯定か", body: "「がらんとしていた」ので否定的な {{few}}（ほとんどいない）。", back: [S2] },
    ],
  },
  {
    ...base("hard-worked", 2),
    prompt: `Mika studied (　　) for months and passed the exam.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["hard", "hardly", "lately", "nearly"],
      correct: 0,
      why: [
        "「熱心に勉強した」。hard は形容詞と同じ形のまま副詞として使える。",
        "hardly は「ほとんど〜ない」。合格した文と合わない。",
        "lately は「最近」。for months と合わない。",
        "nearly は「ほとんど・もう少しで」。",
      ],
    },
    point: "hard 熱心に／hardly ほとんど〜ない",
    steps: [{ title: "-ly で意味が変わる", body: "{{hard}} は副詞でも「熱心に」。-ly をつけた {{hardly}} は「ほとんど〜ない」と正反対になります。", back: [S5] }],
  },
  {
    ...base("of-use", 2),
    prompt: "2つの文がほぼ同じ意味になるように、空所に入る英語1語を書きなさい。\nThis map will be of great use on your trip.\nThis map will be very (　　) on your trip.",
    answer: { kind: "term", accept: ["useful"], near: [{ text: "use", why: "use は名詞です。of use と同じ意味の形容詞 useful にします。" }, { text: "used", why: "used は「使われた」。of use ＝ useful（役に立つ）です。" }] },
    point: "of use ＝ useful",
    steps: [{ title: "of ＋抽象名詞", body: "{{of ＋抽象名詞}}は形容詞のかたまり。of use ＝ {{useful}}、of great use ＝ very useful。", back: [S6] }],
  },
  // ---- 発展 ----
  {
    ...base("hardly-believe", 3),
    prompt: `The ending of the movie was so surprising that I could (　　) believe it.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["hardly", "hard", "near", "late"],
      correct: 0,
      why: [
        "「ほとんど信じられなかった」。hardly は否定の意味をふくみ、助動詞の後ろに置く。",
        "hard は「熱心に」で意味が合わない。",
        "near は「近くに」で意味が合わない。",
        "late は「遅く」で意味が合わない。",
      ],
    },
    point: "can hardly 〜 ＝ほとんど〜できない",
    steps: [{ title: "否定の副詞", body: "驚きで「{{ほとんど}}信じられない」。{{hardly}} は not なしで否定の意味になります。", back: [S5] }],
  },
  {
    ...base("lately-seen", 3),
    prompt: `Have you heard from Takashi (　　)? He hasn't come to practice.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["lately", "late", "latest", "later"],
      correct: 0,
      why: [
        "「最近」は lately。現在完了とよくいっしょに使う。",
        "late は「遅く」。「遅く連絡があったか」では意味が通らない。",
        "latest は形容詞の最上級（最新の）。",
        "later は「あとで」。現在完了の疑問文と合わない。",
      ],
    },
    point: "late 遅く／lately 最近",
    steps: [{ title: "-ly で意味が変わる", body: "late に -ly がつくと {{lately}}（最近）。「遅く」の意味ではなくなります。", back: [S5] }],
  },
  {
    ...base("man-of-courage", 3, "思考・判断・表現"),
    prompt: "She is a woman of great kindness.\nこの文の意味として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["彼女はとても親切な女性だ", "彼女は親切にされた女性だ", "彼女は親切について研究している女性だ", "彼女は親切な人を好む女性だ"],
      correct: 0,
      why: [
        "of great kindness は very kind と同じ形容詞のかたまりで、a woman を後ろから説明する。",
        "受け身の意味はない。",
        "of ＋抽象名詞は性質を表し、研究の対象を表すのではない。",
        "好みを表す形ではない。",
      ],
    },
    point: "of ＋抽象名詞＝性質を表す形容詞",
    steps: [{ title: "形容詞にもどす", body: "{{of great kindness}} ＝ very kind。a very kind woman と同じ意味です。", back: [S6] }],
  },
  {
    ...base("something-hot", 3),
    prompt: "次の英文のうち、文法的に正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["I'd like to eat something sweet.", "I'd like to eat sweet something.", "I'd like to eat a sweet something to.", "I'd like to eat something to sweet."],
      correct: 0,
      why: [
        "-thing の語を説明する形容詞は後ろに置く。something sweet。",
        "形容詞を -thing の前に置くことはできない。",
        "a や余分な to がついて文にならない。",
        "to の後ろに形容詞は置かない。",
      ],
    },
    point: "something ＋形容詞",
    steps: [{ title: "後ろに回る形容詞", body: "something・anyone などを説明する形容詞は{{後ろ}}に置きます。{{something sweet}}（何か甘いもの）。", back: [S1] }],
  },
];

const ORDER: QuestionB[] = [
  // ---- 基本 ----
  {
    ...ord("narabe-usually-breakfast", 1),
    prompt: `${NARABE}\n「私はたいてい6時半に朝食を食べます。」`,
    answer: { kind: "order", tokens: ["I", "usually", "eat", "breakfast", "at six thirty."], distractor: "am" },
    point: "頻度の副詞は一般動詞の前",
    steps: [{ title: "置き場所", body: "{{usually}} は一般動詞 eat の前に置きます。", back: [S4] }],
  },
  {
    ...ord("narabe-a-little-water", 1),
    prompt: `${NARABE}\n「その水そうには水が少し入っています。」`,
    answer: { kind: "order", tokens: ["There", "is", "a little", "water", "in", "the tank."], distractor: "a few" },
    point: "数えられない名詞 → a little",
    steps: [{ title: "数えられるか", body: "water は数えられないので {{a little}}。a few は数えられる名詞に使います。", back: [S2] }],
  },
  // ---- 標準 ----
  {
    ...ord("narabe-seldom-late", 2),
    prompt: `${NARABE}\n「彼女はめったに約束に遅れません。」`,
    answer: { kind: "order", tokens: ["She", "is", "seldom", "late", "for", "appointments."], distractor: "does" },
    point: "頻度の副詞は be動詞の後ろ",
    steps: [{ title: "置き場所", body: "be動詞があるときは、頻度の副詞 {{seldom}} を be動詞の{{後ろ}}に置きます。", back: [S4] }],
  },
  {
    ...ord("narabe-something-warm", 2),
    prompt: `${NARABE}\n「何か温かい飲み物がほしいです。」`,
    answer: { kind: "order", tokens: ["I", "want", "something", "warm", "to drink."], distractor: "some" },
    point: "something ＋形容詞＋ to 〜",
    steps: [{ title: "語順", body: "{{something warm}}（何か温かいもの）のあとに to drink（飲むための）を続けます。", back: [S1] }],
  },
];

export const H_ENG_GRAM_KEIYOSHI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "文法",
  minutes: 10,
  review: { status: "draft" },
  sections: [
    { title: "形容詞・副詞の使い分け", lead: "次の問いに答えなさい。", style: "word", pick: 5, questions: FORMS },
    { title: "並べかえ", lead: "日本語に合うように、語（語句）を並べかえなさい。文の最初の語は大文字で始めてあります。", style: "word", pick: 2, questions: ORDER },
  ],
};
