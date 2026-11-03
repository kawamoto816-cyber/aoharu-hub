// 中3英語「間接疑問文」の単元模試 (B: 問題プールからシードで出題)。問題・英文はすべてオリジナル。
// 大問1 文法・語法: プール13問 (基本5・標準5・発展3) から4問 (基本2・標準1・発展1)。
// 大問2 並べかえ: プール5問 (基本2・標準3) から2問 (基本1・標準1)。
// 1回6問 (基本3・標準2・発展1)。配点 基本15・標準18・発展19 → 45+36+19＝100点。選択肢・語の順もシードで変わる。
// A (生成) は使っていないので検算式はない。英文の正誤はレクチャー (lib/lecture/data/j-en-3-kansetsu.ts) の要点・まちがいに合わせた。
import type { QuestionB, UnitMoshi } from "../types";

const U = "j-en-3-kansetsu";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "疑問文が文の中に入ると語順が変わる");
const S2 = L(2, "do・does・did は消え、動詞の形にもどる");
const S3 = L(3, "疑問詞が主語のときは語順そのまま");
const S4 = L(4, "文の最後の記号は全体で決める");

const P = { 1: 15, 2: 18, 3: 19 } as const;
const T = { 1: 45, 2: 75, 3: 90 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const GRAMMAR: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("be-food", 1),
    prompt: "（　）に入る語として正しいものはどれですか。\nPlease tell me what your favorite food (　　).",
    answer: {
      kind: "choice",
      options: ["is", "does", "are", "be"],
      correct: 0,
      why: ["正しい。What is your favorite food? を文の中に入れると、be動詞 is は主語 your favorite food のうしろにもどる。", "does は一般動詞の疑問文の合図。間接疑問では使わない。", "主語 your favorite food は単数なので are ではなく is。", "主語のあとには、主語と時に合わせた形の is を置く。"],
    },
    point: "be動詞は主語のうしろにもどす",
    steps: [{ title: "主語＋be動詞の順", body: "もとの疑問文は What is your favorite food?。文の中に入れると what ＋ 主語 ＋ {{is}} の順になります。", back: [S1, S2] }],
  },
  {
    ...base("buy-past", 1),
    prompt: "（　）内の語を、正しい形にかえて答えなさい。\nI know what Riko (buy) at the shop yesterday.",
    answer: { kind: "term", accept: ["bought"], near: [{ text: "buys", why: "yesterday（昨日）のことなので過去形にします。" }, { text: "buyed", why: "buy は不規則動詞。buy - bought - bought です。" }, { text: "did buy", why: "間接疑問では did を使わず、動詞を過去形 bought にします。" }] },
    point: "did が消え、動詞が過去形になる",
    steps: [{ title: "did のかわりに動詞で過去を表す", body: "もとは What did Riko buy 〜?。文の中では {{did が消え}}、過去は動詞が引きついで {{bought}} になります。", trap: "原形 buy のまま置いてしまう。", back: [S2] }],
  },
  {
    ...base("can-ticket", 1),
    prompt: "（　）に入る語句として正しいものはどれですか。\nCan you tell me (　　) a ticket?",
    answer: {
      kind: "choice",
      options: ["how I can get", "how can I get", "how I can getting", "how do I can get"],
      correct: 0,
      why: ["正しい。助動詞 can は主語 I のうしろにもどる。", "疑問文の語順のまま。文の中では主語＋助動詞＋動詞の順にする。", "can のあとは動詞の原形。", "do と can をいっしょには使わない。"],
    },
    point: "助動詞は主語のうしろにもどすだけ",
    steps: [{ title: "can は消えない", body: "How can I get a ticket? の can は、do とちがって消えません。主語のうしろにもどして {{how I can get}} です。", back: [S2] }],
  },
  {
    ...base("kotae-shop", 1),
    prompt: "次の問いへの答えとして、もっとも適切なものはどれですか。\nDo you know what time the shop opens?",
    answer: {
      kind: "choice",
      options: ["Yes, I do. It opens at ten.", "Yes, it does. At ten.", "It opens at ten?", "Yes, I am. It opens at ten."],
      correct: 0,
      why: ["正しい。Do you know 〜? には Yes / No と do で答え、そのあとに中身を続ける。", "たずねられているのは「あなた（you）は知っているか」。答えの主語は I。", "答えるときは「?」をつけない。また Yes / No で答えていない。", "Do でたずねられているので am ではなく do で答える。"],
    },
    point: "Do you know 〜? には Yes, I do. ＋ 中身",
    steps: [{ title: "文全体は Do you know の疑問文", body: "文全体は Do you know 〜? の疑問文なので、まず {{Yes, I do.}} / No, I don't. と答え、それから開く時刻を伝えます。", back: [S4] }],
  },
  {
    ...base("who-singing", 1),
    prompt: "（　）に入る語として正しいものはどれですか。\nDo you know (　　) is singing in the music room?",
    answer: {
      kind: "choice",
      options: ["who", "where", "when", "why"],
      correct: 0,
      why: ["正しい。「だれが歌っているか」。who が主語で、すぐあとに動詞 is singing が続く。", "where のあとには主語が必要。where she is singing のようになる。", "when のあとにも主語が必要。", "why のあとにも主語が必要。"],
    },
    point: "疑問詞のすぐあとが動詞なら、疑問詞が主語",
    steps: [{ title: "すぐあとに動詞", body: "空所のすぐあとは is singing（動詞）。主語がないので、空所には主語になる {{who}}（だれが）が入ります。", back: [S3] }],
  },
  // ---- 標準 ----
  {
    ...base("who-wrote", 2, "思考・判断・表現"),
    prompt: "Who wrote this letter? を I want to know に続けたものとして、正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["I want to know who wrote this letter.", "I want to know who did write this letter.", "I want to know who this letter wrote.", "I want to know who did this letter write."],
      correct: 0,
      why: ["正しい。who（だれが）が主語なので、語順はそのまま。", "did は使わない。もとの文にも did はない。", "主語は who。this letter を前に出すと「この手紙がだれを書いたか」になってしまう。", "疑問詞が主語の文に did は入らず、語順も変えない。"],
    },
    point: "疑問詞が主語なら、語順はそのまま",
    steps: [{ title: "who は主語", body: "Who wrote this letter? の who は「だれが」で{{主語}}。すでに主語＋動詞の順なので、{{語順は変えません}}。", trap: "いつものくせで主語を探して組みかえてしまう。", back: [S3] }],
  },
  {
    ...base("kigo-hatena", 2, "思考・判断・表現"),
    prompt: "次のうち、文の最後に「?」をつけるのが正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["Do you know what he wants", "I don't know what he wants", "Tell me what he wants", "I wonder what he wants"],
      correct: 0,
      why: ["正しい。文全体が Do you know で始まる疑問文なので「?」。", "文全体はふつうの否定文なので「.」。", "文全体は命令文なので「.」。", "文全体はふつうの文（〜かなと思う）なので「.」。"],
    },
    point: "「?」か「.」かは文全体で決まる",
    steps: [{ title: "文の始まりを見る", body: "最後の記号は、間接疑問の部分ではなく{{文全体}}で決まります。{{Do you know}} 〜 で始まる文だけが疑問文です。", back: [S4] }],
  },
  {
    ...base("will-meet", 2),
    prompt: "Where will they meet? を I don't know に続けるとき、（　）に入る語句として正しいものはどれですか。\nI don't know (　　).",
    answer: {
      kind: "choice",
      options: ["where they will meet", "where will they meet", "where they meet will", "where do they will meet"],
      correct: 0,
      why: ["正しい。助動詞 will は主語 they のうしろにもどる。", "疑問文の語順のまま。文の中では主語＋助動詞の順にする。", "will は動詞 meet の前に置く。", "do と will をいっしょには使わない。"],
    },
    point: "will も主語のうしろにもどす",
    steps: [{ title: "主語＋助動詞＋動詞", body: "where のあとを {{they will meet}} とふつうの文の語順にします。will は消えません。", back: [S2] }],
  },
  {
    ...base("has-cats", 2),
    prompt: "（　）に入る1語を答えなさい。\nHow many cats does she have? → I don't know how many cats she (　　).",
    answer: { kind: "term", accept: ["has"], near: [{ text: "have", why: "does が消えたので、3単現は動詞が引きつぎます。she なので has。" }, { text: "does", why: "間接疑問では does を使いません。動詞を has にします。" }] },
    point: "does が消え、動詞が3単現の形に",
    steps: [{ title: "3単現を動詞へ", body: "does がもっていた「3人称単数・現在」を動詞が引きつぎます。have は she に合わせて {{has}} です。", trap: "does を取ったあと、have のままにしてしまう。", back: [S2] }],
  },
  {
    ...base("word-means", 2),
    prompt: "「この単語が何を意味するのか、教えてください。」を表す英文として、正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["Please tell me what this word means.", "Please tell me what does this word mean.", "Please tell me what means this word.", "Please tell me what this word mean."],
      correct: 0,
      why: ["正しい。does を取り、主語 this word のあとに3単現の means を置く。", "does が残っている。間接疑問では do・does・did を使わない。", "主語 this word が動詞のあとに来ている。", "does を取ったら、主語に合わせて mean に s をつける。"],
    },
    point: "疑問詞＋主語＋動詞（3単現の s をもどす）",
    steps: [
      { title: "does を取る", body: "What does this word mean? の {{does}} を取り、主語＋動詞の順にします。", back: [S1, S2] },
      { title: "s をもどす", body: "主語 this word は3人称単数なので {{means}}。", back: [S2] },
    ],
  },
  // ---- 発展 ----
  {
    ...base("ayamari-why", 3, "思考・判断・表現"),
    prompt: "次の英文のうち、まちがいをふくむものはどれですか。",
    answer: {
      kind: "choice",
      options: ["I wonder why did she leave so early.", "Do you know how old this temple is?", "I don't know who opened the door.", "Tell me where you found it."],
      correct: 0,
      why: ["まちがい。間接疑問では did を使わない。I wonder why she left so early. とする。", "正しい。be動詞 is が主語 this temple のうしろにある。", "正しい。who が主語なので語順はそのまま。", "正しい。did が消え、動詞が過去形 found になっている。"],
    },
    point: "間接疑問の中に do・does・did は入らない",
    steps: [
      { title: "疑問詞のあとを見る", body: "それぞれ疑問詞のあとが{{主語＋動詞}}の順か、疑問詞が主語かを確かめます。", back: [S1, S3] },
      { title: "did を消して過去形に", body: "why did she leave は疑問文の語順。did を消し、{{left}} と過去形にします。", back: [S2] },
    ],
  },
  {
    ...base("kumiawase-box", 3, "思考・判断・表現"),
    prompt: "（A）（B）に入る語句の組み合わせとして正しいものはどれですか。\nI know what (A) in the box, but I don't know who (B) it here.\n（箱に何が入っているかは知っているが、だれがそれをここに持ってきたかは知らない）",
    answer: {
      kind: "choice",
      options: ["A: is　B: brought", "A: it is　B: brought", "A: is　B: bring", "A: is it　B: brought"],
      correct: 0,
      why: ["正しい。What is in the box? も Who brought it here? も、疑問詞が主語なので語順はそのまま。", "what が主語なので、it を入れる必要はない。what it is では「それが何か」になり、in the box と合わない。", "持ってきたのは過去のこと。who が主語なので did は使わず、動詞を過去形 brought にする。", "is it は疑問文の語順。また what が主語なので it は不要。"],
    },
    point: "what・who が主語なら、すぐあとに動詞",
    steps: [
      { title: "A：what が主語", body: "What is in the box?（何が箱に入っているか）の what は{{主語}}。語順はそのままで what {{is}} in the box。", back: [S3] },
      { title: "B：who が主語", body: "Who brought it here? の who も主語。did は使わず who {{brought}} it here。", back: [S3, S2] },
    ],
  },
  {
    ...base("how-long-lived", 3, "思考・判断・表現"),
    prompt: "How long has Ms. Brown lived in Japan? を Do you know に続けたものとして、正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["Do you know how long Ms. Brown has lived in Japan?", "Do you know how long has Ms. Brown lived in Japan?", "Do you know how long Ms. Brown lived has in Japan?", "Do you know how long does Ms. Brown live in Japan?"],
      correct: 0,
      why: ["正しい。has は do とちがって消えず、主語 Ms. Brown のうしろにもどる。", "疑問文の語順のまま。has を主語のうしろへもどす。", "has は過去分詞 lived の前に置く。", "もとの文の has を does にかえてはいけない。現在完了の意味がなくなる。"],
    },
    point: "現在完了の has も主語のうしろへ",
    steps: [
      { title: "疑問詞のかたまり", body: "how long（どのくらいの間）までを1つの疑問詞として、そのあとを主語＋動詞の順にします。", back: [S1] },
      { title: "has は残す", body: "has は can・will と同じように消えません。{{Ms. Brown has lived}} の順です。文全体は Do you know の疑問文なので最後は「?」。", back: [S2, S4] },
    ],
  },
];

const ORDER: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("narabe-how-old", 1),
    seconds: 60,
    prompt: "日本文に合うように、語句を並べかえなさい。\nあなたは彼のお兄さんが何歳か知っていますか。",
    answer: { kind: "order", tokens: ["Do", "you", "know", "how old", "his brother", "is"], distractor: "does" },
    point: "how old ＋ 主語 ＋ is",
    steps: [{ title: "be動詞は主語のうしろ", body: "How old is his brother? を Do you know に続けると、how old {{his brother is}} の順になります。", back: [S1, S4] }],
  },
  {
    ...base("narabe-angry", 1),
    seconds: 60,
    prompt: "日本文に合うように、語を並べかえなさい。\n私は、彼女がなぜ怒っているのかわかりません。",
    answer: { kind: "order", tokens: ["I", "don't", "know", "why", "she", "is", "angry"], distractor: "does" },
    point: "why ＋ 主語 ＋ 動詞",
    steps: [{ title: "ふつうの語順に", body: "Why is she angry? の is を主語のうしろへもどし、why {{she is}} angry とします。", back: [S1] }],
  },
  // ---- 標準 ----
  {
    ...base("narabe-went", 2),
    seconds: 90,
    prompt: "日本文に合うように、語を並べかえなさい。\nあなたが昨日どこへ行ったのか、教えてください。",
    answer: { kind: "order", tokens: ["Please", "tell", "me", "where", "you", "went", "yesterday"], distractor: "did" },
    point: "did を使わず、動詞を過去形に",
    steps: [{ title: "did が消える", body: "Where did you go? の did が消え、過去は動詞が引きついで where you {{went}} になります。", trap: "did を入れて where did you go の語順にしてしまう。", back: [S2] }],
  },
  {
    ...base("narabe-baked", 2),
    seconds: 90,
    prompt: "日本文に合うように、語句を並べかえなさい。\n私は、だれがこのクッキーを焼いたのか知りたいです。",
    answer: { kind: "order", tokens: ["I", "want", "to know", "who", "baked", "these cookies"], distractor: "did" },
    point: "who が主語 → who ＋ 動詞",
    steps: [{ title: "語順はそのまま", body: "Who baked these cookies? の who は主語なので、{{who baked}} these cookies をそのまま続けます。", back: [S3] }],
  },
  {
    ...base("narabe-museum", 2),
    seconds: 90,
    prompt: "日本文に合うように、語句を並べかえなさい。\nどうすればその博物館に行けるのか、教えてくれませんか。",
    answer: { kind: "order", tokens: ["Could", "you", "tell", "me", "how", "I", "can", "get to", "the museum"], distractor: "do" },
    point: "how ＋ 主語 ＋ can ＋ 動詞",
    steps: [{ title: "can は主語のうしろへ", body: "How can I get to the museum? の can を主語のうしろへもどして {{how I can get to}} the museum。文全体は Could you 〜? の疑問文です。", back: [S2, S4] }],
  },
];

export const J_EN_3_KANSETSU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "中3",
  minutes: 10,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    { title: "間接疑問文の文法・語法", lead: "次の問いに答えなさい。", style: "mix", pick: 4, questions: GRAMMAR },
    { title: "語の並べかえ", lead: "日本文に合うように並べかえなさい。使わない語が1つふくまれています。", style: "word", pick: 2, questions: ORDER },
  ],
};
