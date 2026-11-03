// 中2英語「過去進行形」の単元模試 (B: 問題プールからシードで6問)。問題はすべてオリジナル。
// プール15問 (基本5・標準6・発展4)。1回に基本2・標準2・発展2 が出る (lib/moshi/unit.ts の pickQuestions)。選択肢の順もシードで変わる。
// A (生成) は使っていないので検算式はなし。choice・term・order の正答は check-moshi が採点器で満点になるか確かめる。
import type { QuestionB, UnitMoshi } from "../types";

const U = "j-en-2-kako-shinko";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "形は was / were ＋ 動詞の -ing 形");
const S2 = L(2, "過去形は「した」、過去進行形は「している最中だった」");
const S3 = L(3, "when と組み合わせて「〜していると、…した」");
const S4 = L(4, "否定文と疑問文は be動詞の文と同じ作り方");
const S5 = L(5, "while と名作の幕開け");

// 配点は難易度で決める (基本15・標準17・発展18。2問ずつ出るので満点100)
const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("were-planting", 1),
    prompt: "（ ）に入る語として正しいものはどれですか。\nMs. Sato and her son (　　) planting tulips in the yard at four yesterday.",
    answer: {
      kind: "choice",
      options: ["were", "was", "are", "did"],
      correct: 0,
      why: ["正しい。主語 Ms. Sato and her son は2人で、yesterday は過去なので were。", "was は主語が1人・1つのとき。ここは2人。", "are は現在の文。at four yesterday は過去。", "進行形は be動詞＋-ing 形。did は使わない。"],
      mistakeOf: [null, 1, null, null],
    },
    point: "主語が2人以上なら were ＋ -ing",
    steps: [{ title: "主語の数と時を見る", body: "主語は「佐藤さんと息子さん」の {{2人}}、時は yesterday で過去。だから {{were}} planting。", back: [S1] }],
  },
  {
    ...base("shopping", 1),
    prompt: "（ ）内の語を、正しい形にかえて答えなさい。\nMy aunt was ( shop ) at the mall then.",
    answer: { kind: "term", accept: ["shopping"], near: [{ text: "shoping", why: "shop は「短い母音＋子音字」で終わるので、p を重ねて shopping。" }, { text: "shop", why: "was のあとの動詞は -ing 形にします。" }] },
    point: "短い母音＋子音字は最後の字を重ねて -ing",
    steps: [
      { title: "was のあとは -ing 形", body: "過去進行形は {{was / were ＋ -ing 形}}。原形のままでは文になりません。", back: [S1] },
      { title: "つづり", body: "shop は短い母音 o ＋子音字 p で終わるので、{{p を重ねて}} shopping。", back: [S1] },
    ],
  },
  {
    ...base("cat-playing", 1),
    prompt: "「私がドアを開けたとき、うちのねこはボールで遊んでいました。」を表す英文になるように、（ ）に入る語句を選びなさい。\nOur cat (　　) with a ball when I opened the door.",
    answer: {
      kind: "choice",
      options: ["was playing", "were playing", "is playing", "playing"],
      correct: 0,
      why: ["正しい。主語 Our cat は1ぴきなので was＋-ing 形。", "were は主語が複数や you のとき。ねこは1ぴき。", "is playing は現在進行形。opened の過去の場面に合わない。", "be動詞がないので文にならない。"],
    },
    point: "1人・1つの主語は was ＋ -ing",
    steps: [{ title: "be動詞を決める", body: "主語 Our cat は {{1ぴき}}、opened で過去の話。だから {{was playing}}。", back: [S1] }],
  },
  {
    ...base("wasnt-crying", 1),
    prompt: "日本語に合うように、（ ）内の語を使って、過去進行形の否定文になる語句を答えなさい。\nその赤ちゃんは、そのとき泣いていませんでした。\nThe baby ( not / cry ) at that time.",
    answer: { kind: "term", accept: ["wasn't crying", "was not crying"], near: [{ text: "didn't cry", why: "「〜していなかった」は過去進行形の否定。was not＋-ing 形にします。" }, { text: "wasn't cry", why: "was not のあとの動詞は -ing 形にします。" }] },
    point: "否定文は was / were のすぐ後ろに not",
    steps: [{ title: "not の位置", body: "否定文は {{was のすぐ後ろに not}} を置き、動詞は -ing 形のまま。The baby {{wasn't crying}}.", back: [S4] }],
  },
  {
    ...base("yes-he-was", 1),
    prompt: "（ ）に入る語句として正しいものはどれですか。\nWas Mr. Ito driving to the station? — Yes, (　　).",
    answer: {
      kind: "choice",
      options: ["he was", "he did", "he is", "he were"],
      correct: 0,
      why: ["正しい。Was でたずねられたので was で答える。", "過去進行形の疑問文は be動詞の文。did では答えない。", "is は現在。たずねた文は過去。", "主語 he には was。were は使わない。"],
    },
    point: "Was 〜? には was / wasn't で答える",
    steps: [{ title: "たずねた形で答える", body: "Was でたずねられたら {{Yes, he was.}} / {{No, he wasn't.}}。", back: [S4] }],
  },
  // ---- 標準 ----
  {
    ...base("what-gym", 2),
    prompt: "日本語に合うように、語を並べかえなさい（使わない語が1つあります）。\nあなたたちはそのとき、体育館で何をしていましたか。",
    answer: { kind: "order", tokens: ["What", "were", "you", "doing", "in", "the", "gym", "then?"], distractor: "did" },
    point: "What ＋ were ＋ 主語 ＋ doing 〜?",
    steps: [{ title: "疑問詞のあとは疑問文の語順", body: "What を先頭に置き、{{were you doing}} と続けます。did は使わない語です。", trap: "Did you doing の形はない。", back: [S4] }],
  },
  {
    ...base("bell-test", 2),
    prompt: "「ベルが鳴ったとき、生徒たちはテストを受けている最中でした。」を表す英文になるように、（ ）に入る語句を選びなさい。\nWhen the bell rang, the students (　　) a test.",
    answer: {
      kind: "choice",
      options: ["were taking", "took", "are taking", "was taking"],
      correct: 0,
      why: ["正しい。ベルが鳴った一瞬に、続いていた動作（テスト）は過去進行形。students は複数なので were。", "過去形だと「ベルが鳴ってから、テストを受けた」という順番の話に近くなる。", "are taking は現在の文。rang は過去。", "students は複数なので was ではなく were。"],
      mistakeOf: [null, 3, null, 1],
    },
    point: "長く続く動作は過去進行形、一瞬の出来事は過去形",
    steps: [
      { title: "長さを比べる", body: "テストは {{続いていた長い動作}}、ベルは {{一瞬の出来事}}。長いほうを過去進行形にします。", back: [S3] },
      { title: "be動詞", body: "the students は複数なので {{were taking}}。", back: [S1] },
    ],
  },
  {
    ...base("wrote-vs-writing", 2, "思考・判断・表現"),
    prompt: "次の2つの文の意味のちがいを、正しく説明しているものはどれですか。\n(1) I wrote a letter last night.\n(2) I was writing a letter at ten last night.",
    answer: {
      kind: "choice",
      options: [
        "(1)は手紙を書いたことをひとまとまりの出来事として伝え、(2)は10時の時点で書いているとちゅうだったことを伝える",
        "(1)は書いているとちゅうだったことを伝え、(2)は書き終えたことを伝える",
        "(1)も(2)も意味は同じで、(2)はていねいな言い方である",
        "(2)は、これから手紙を書く予定を表している",
      ],
      correct: 0,
      why: ["正しい。過去形は出来事を「点」でまるごと、過去進行形はある時点での「とちゅう」を表す。", "説明が逆になっている。", "形がちがえば見え方がちがう。進行形はていねいな言い方ではない。", "was writing は過去のことで、予定ではない。"],
    },
    point: "過去形＝出来事まるごと、過去進行形＝とちゅうの一場面",
    steps: [{ title: "点か、とちゅうか", body: "過去形は {{ひとまとまりの出来事}}。過去進行形は {{ある時点}}（at ten last night）で動作が {{とちゅう}} だったことを表します。", back: [S2] }],
  },
  {
    ...base("were-you-sleeping", 2),
    prompt: "「あなたは6時に眠っていましたか。」を表す英文として、正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["Were you sleeping at six?", "Did you sleeping at six?", "Were you sleep at six?", "Was you sleeping at six?"],
      correct: 0,
      why: ["正しい。were を主語 you の前に出し、-ing 形はそのまま。", "進行形の疑問文に did は使わない。", "were のあとの動詞は -ing 形にする。", "主語 you には were を使う。"],
      mistakeOf: [null, 2, 0, 1],
    },
    point: "疑問文は was / were を主語の前へ",
    steps: [{ title: "疑問文の作り方", body: "be動詞 {{Were を主語の前に}} 出し、sleeping はそのまま残します。did は使いません。", back: [S4] }],
  },
  {
    ...base("while-photo", 2),
    prompt: "「部屋をそうじしている間に、私は古い写真を見つけました。」を表す英文になるように、（ ）に入る語を選びなさい。\n(　　) I was cleaning my room, I found an old photo.",
    answer: {
      kind: "choice",
      options: ["While", "Because", "If", "But"],
      correct: 0,
      why: ["正しい。while は「〜している間に」。続いている動作（そうじ）の間に出来事（見つけた）が起きた。", "because は「〜なので」で理由を表す。「〜している間に」の意味に合わない。", "if は「もし〜なら」。", "but は「しかし」で、文の頭で2つの文をこの形ではつながない。"],
    },
    point: "while ＝「〜している間に」。後ろは過去進行形が合う",
    steps: [{ title: "つなぐ語の意味", body: "{{while}} は「〜している間に」。続いている動作 was cleaning の中に、一瞬の出来事 found がはさまります。", back: [S5] }],
  },
  {
    ...base("was-washing", 2),
    prompt: "（ ）内の語を使って、答えの文を完成させなさい（2語で答えること）。\nWhat was your father doing when you called him? — He ( wash ) his car.",
    answer: { kind: "term", accept: ["was washing"], near: [{ text: "washed", why: "「何をしていたの？」には、そのとき続いていた動作を過去進行形で答えます。" }, { text: "is washing", why: "たずねた文は過去（was doing）。答えも was＋-ing 形です。" }] },
    point: "What was 〜 doing? には was ＋ -ing で答える",
    steps: [{ title: "たずねた形に合わせる", body: "「そのとき何をしていたか」には、{{was ＋ -ing}} で具体的に答えます。He {{was washing}} his car.", back: [S4] }],
  },
  // ---- 発展 ----
  {
    ...base("knowing", 3, "思考・判断・表現"),
    prompt: "英文として{{まちがっている}}ものはどれですか。",
    answer: {
      kind: "choice",
      options: ["Tom was knowing the way to the museum.", "Tom was having breakfast at seven.", "The wind was blowing hard last night.", "I was writing an e-mail when you came."],
      correct: 0,
      why: ["まちがい。know（知っている）は状態を表す動詞なので、ふつう進行形にしない。Tom knew the way to the museum. が正しい。", "正しい。have が「食べる」の意味なら動作なので進行形にできる。", "正しい。昨夜、風が強く吹いていた様子を表す。", "正しい。続いていた動作は過去進行形、来たという一瞬は過去形。"],
    },
    point: "know・like・have（持っている）は進行形にしない",
    steps: [
      { title: "動作か状態か", body: "{{know}}（知っている）は状態を表す動詞。過去なら knew を使います。", back: [S4] },
      { title: "have は意味で決まる", body: "have が「食べる」なら動作なので {{was having}} にできます。", back: [S4] },
    ],
  },
  {
    ...base("raining-station", 3),
    prompt: "日本語に合うように、語を並べかえなさい（使わない語が1つあります）。文は It で始めること。\n私が駅に着いたとき、雨が降っていました。",
    answer: { kind: "order", tokens: ["It", "was", "raining", "when", "I", "arrived", "at", "the", "station."], distractor: "were" },
    point: "続いていた様子＋when＋一瞬の出来事",
    steps: [
      { title: "長いほうと一瞬のほう", body: "降り続いていた雨は {{It was raining}}、駅に着いたのは一瞬の {{arrived}}（過去形）。", back: [S3] },
      { title: "語順", body: "It was raining のあとに {{when I arrived at the station}} を続けます。天気の it は単数なので were は使わない語です。", back: [S1, S3] },
    ],
  },
  {
    ...base("mom-came", 3, "思考・判断・表現"),
    prompt: "When Mom came home, I cooked dinner. の意味として、もっとも適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: [
        "母が帰ってきて、それから私は夕食を作った。",
        "母が帰ってきたとき、私は夕食を作っている最中だった。",
        "母が帰ってくるまで、私はずっと夕食を作っていた。",
        "母が帰ってきたら、私は夕食を作るつもりだ。",
      ],
      correct: 0,
      why: ["正しい。両方とも過去形なので、「帰ってきた」→「作った」という出来事の順番を表す。", "「作っている最中だった」なら I was cooking dinner. と過去進行形にする。", "「ずっと〜していた」という意味は、この文にはない。", "came・cooked は過去の文。これからの予定ではない。"],
    },
    point: "両方過去形なら「〜して、それから…した」",
    steps: [{ title: "形から場面を読む", body: "cooked は過去形なので、帰ってきた {{あとで}} 作った、という順番。最中なら {{was cooking}} です。", trap: "when があっても、過去形なら「とちゅう」の意味にはならない。", back: [S3] }],
  },
  {
    ...base("birds-flying", 3, "思考・判断・表現"),
    prompt: "物語の場面です。「鳥たちが巣へ帰っていくところだった」という背景を表すように、（ ）に入る語句を選びなさい。\nIt was getting dark. Some birds (　　) back to their nests. Then someone knocked on the door.",
    answer: {
      kind: "choice",
      options: ["were flying", "was flying", "are flying", "fly"],
      correct: 0,
      why: ["正しい。続いていた背景の様子は過去進行形。Some birds は複数なので were。", "主語 Some birds は複数。was は使わない。", "are flying は現在の文。物語は過去（was getting・knocked）で書かれている。", "fly は現在形で、過去の場面に合わない。"],
    },
    point: "背景は過去進行形、事件は過去形",
    steps: [
      { title: "背景と事件", body: "was getting dark・{{were flying}} が背景の舞台。そこへ過去形 {{knocked}} の一瞬の出来事が割りこみます。", back: [S2, S5] },
      { title: "be動詞", body: "Some birds は複数なので {{were}}。", back: [S1] },
    ],
  },
];

export const J_EN_2_KAKO_SHINKO_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "中2",
  minutes: 10,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [{ title: "過去進行形の文", lead: "次の問いに答えなさい。", style: "word", pick: 6, questions: POOL }],
};
