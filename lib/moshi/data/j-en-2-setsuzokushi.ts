// 中2英語「接続詞」の単元模試 (B: 問題プールからシードで選ぶ)。問題・例文はすべてオリジナル (lib/drill の文は使っていない)。
// 節1 使い分け・語法 (プール13問: 基本4・標準5・発展4) から5問 (基本2・標準2・発展1)、
// 節2 並べかえ (プール5問: 基本2・標準3) から2問 (基本1・標準1)。1回7問・100点。
// 配点は難易度で決める (基本13・標準15・発展16 → 13×3＋15×3＋16＝100)。A (生成) はないので数値の検算はなし。
// choice・term・order の正答は check-moshi が採点器で満点になるか確かめる。
import type { QuestionB, UnitMoshi } from "../types";

const U = "j-en-2-setsuzokushi";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "接続詞は2つのグループに分けられる");
const S2 = L(2, "when・if・because のまとまりは前にも後ろにも");
const S3 = L(3, "because は原因の前、so は結果の前");
const S4 = L(4, "if・when のまとまりの中は、未来でも現在形");

const P = { 1: 13, 2: 15, 3: 16 } as const;
const T = { 1: 45, 2: 60, 3: 90 } as const;
const TO = { 1: 60, 2: 75, 3: 90 } as const;
type Sk = QuestionB["skill"];
const base = (id: string, difficulty: 1 | 2 | 3, skill: Sk = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });
const ord = (id: string, difficulty: 1 | 2 | 3) => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: TO[difficulty], skill: "知識・技能" as Sk });

const FORMS: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("old-but-runs", 1),
    prompt: "（　）に入る語として正しいものはどれですか。\nMy bike is old, (　) it still runs well.",
    answer: {
      kind: "choice",
      options: ["but", "so", "or", "because"],
      correct: 0,
      why: ["正しい。「古い、しかしまだよく走る」と逆の内容をつなぐので but。", "so は「だから」。古いからよく走る、では意味が通らない。", "or は「または」。どちらかを選ぶ文ではない。", "because は「〜なので」。よく走ることは古いことの理由ではない。"],
      mistakeOf: [null, 2, null, null],
    },
    point: "逆の内容をつなぐのは but",
    steps: [{ title: "前と後ろの関係を見る", body: "「自転車は古い」と「まだよく走る」は{{予想と逆}}の内容。対等につなぐ接続詞のうち {{but}}（しかし）を使います。", back: [S1] }],
  },
  {
    ...base("home-or-restaurant", 1),
    prompt: "（　）に入る語として正しいものはどれですか。\nShall we eat at home (　) go to a restaurant tonight?",
    answer: {
      kind: "choice",
      options: ["or", "but", "so", "when"],
      correct: 0,
      why: ["正しい。「家で食べる」か「レストランに行く」かを選ぶので or（または）。", "but は「しかし」。2つの案のどちらかをたずねる文には合わない。", "so は「だから」。前が理由になっていない。", "when は「〜とき」。go to a restaurant には主語もなく、まとまりにならない。"],
    },
    point: "どちらかを選ぶときは or",
    steps: [{ title: "2つの案を並べる", body: "eat at home と go to a restaurant の{{どちらにするか}}をたずねているので {{or}}（または）でつなぎます。", back: [S1] }],
  },
  {
    ...base("when-young-imi", 1),
    prompt: "次の英文の意味として正しいものはどれですか。\nWhen my father was young, he played rugby.",
    answer: {
      kind: "choice",
      options: ["父は若いころ、ラグビーをしていた。", "父は若いので、ラグビーをしていた。", "もし父が若ければ、ラグビーをするだろう。", "父は若かったが、ラグビーをしていた。"],
      correct: 0,
      why: ["正しい。When 〜, は「〜とき」。まとまりから先に訳すと自然。", "「〜なので」は because の意味。", "「もし〜なら」は if の意味。played と過去の文でもある。", "「〜が（しかし）」は but の意味。"],
    },
    point: "When 〜, ＝「〜とき」。まとまりから先に訳す",
    steps: [
      { title: "when の意味", body: "{{when}} は「〜とき」。When my father was young は「父が若かったとき（若いころ）」です。", back: [S1] },
      { title: "コンマまでがまとまり", body: "コンマまでが when のまとまり、そのあとの {{he played rugby}} が本題です。まとまりから訳すと自然な日本語になります。", back: [S2] },
    ],
  },
  {
    ...base("umbrella-because", 1),
    prompt: "（　）に入る語として正しいものはどれですか。\nAoi took an umbrella (　) the sky was very dark.",
    answer: {
      kind: "choice",
      options: ["because", "so", "but", "or"],
      correct: 0,
      why: ["正しい。空が暗かったことが、かさを持っていった理由。理由の前には because。", "so は結果の前に置く。ここは後ろが理由なので合わない。", "but は逆の内容をつなぐ。暗いからかさを持つのは自然な流れ。", "or は「または」。どちらかを選ぶ文ではない。"],
    },
    point: "because は原因・理由の前に置く",
    steps: [{ title: "後ろは理由", body: "the sky was very dark（空がとても暗かった）は、かさを持っていった{{理由}}。理由の前には {{because}} を置きます。", trap: "「だから」の so を選ばない。so は結果の前。", back: [S3] }],
  },
  // ---- 標準 ----
  {
    ...base("if-doesnt-come", 2),
    prompt: "（　）に入る語句として正しいものはどれですか。\nIf Ken (　) here by noon, we will start lunch without him.",
    answer: {
      kind: "choice",
      options: ["doesn't come", "won't come", "didn't come", "not come"],
      correct: 0,
      why: ["正しい。if のまとまりの中は、未来のことでも現在形。", "if のまとまりの中に will（won't）は使わない。", "正午はこれから来る時間なので、過去形にはしない。", "一般動詞の否定には doesn't などが必要。"],
      mistakeOf: [null, 0, null, null],
    },
    point: "if の中は未来でも現在形（否定なら doesn't）",
    steps: [
      { title: "if の中は現在形", body: "正午までに来るかどうかは未来のことですが、{{if のまとまりの中}}は現在形にします。", back: [S4] },
      { title: "否定の形", body: "主語 Ken は3人称単数なので、現在形の否定は {{doesn't come}}。外の we will start は未来なので will のままです。", back: [S4] },
    ],
  },
  {
    ...base("library-so", 2),
    prompt: "（　）に入る語として正しいものはどれですか。\nThe library was closed, (　) we studied at a café.",
    answer: {
      kind: "choice",
      options: ["so", "because", "but", "if"],
      correct: 0,
      why: ["正しい。図書館が閉まっていた → だからカフェで勉強した。結果の前に so。", "because なら後ろが理由になる。カフェで勉強したことは閉館の理由ではない。", "but は逆の内容。閉館していたのでほかの場所で勉強するのは自然な流れ。", "if は「もし〜なら」。過去の事実を述べている文には合わない。"],
    },
    point: "so は結果の前に置く",
    steps: [{ title: "前が原因、後ろが結果", body: "「図書館が閉まっていた」が原因、「カフェで勉強した」が{{結果}}。結果の前には {{so}}（だから）を置きます。", back: [S3] }],
  },
  {
    ...base("so-to-because", 2, "思考・判断・表現"),
    prompt: "2つの文がほぼ同じ意味になるように、（　）に入る1語を書きなさい。\nYuki was sleepy, so she went to bed at nine.\n＝ Yuki went to bed at nine (　) she was sleepy.",
    answer: {
      kind: "term",
      accept: ["because"],
      near: [
        { text: "so", why: "so は結果の前に置きます。ここは後ろが理由（she was sleepy）なので because。" },
        { text: "when", why: "「ねむかったとき」ではなく「ねむかったので」と理由を表すので because。" },
      ],
    },
    point: "so の文 → 理由の前に because を置いて書きかえ",
    steps: [{ title: "原因はどれか", body: "原因は she was sleepy（ねむかった）。2つめの文では原因が後ろにあるので、その前に {{because}} を置きます。", back: [S3] }],
  },
  {
    ...base("hope-you-like", 2),
    prompt: "次の英文の意味として正しいものはどれですか。\nI hope you will like my present.",
    answer: {
      kind: "choice",
      options: ["あなたが私のプレゼントを気に入ってくれるといいなと思う。", "もしあなたがプレゼントを気に入れば、私はうれしい。", "あなたは私のプレゼントを気に入るので、私は希望をもっている。", "私は、あなたのプレゼントを気に入ると思う。"],
      correct: 0,
      why: ["正しい。hope のあとに that（〜ということ）が省略されている。", "if（もし〜なら）の文ではない。", "because（〜なので）の文ではない。", "my present は「私のプレゼント」。気に入るのは you。"],
    },
    point: "hope・think のあとの that は省略できる",
    steps: [{ title: "省略された that", body: "I hope {{(that)}} you will like 〜 で「あなたが〜を気に入ってくれる{{ということ}}を望む」。think・know・hope のあとの that は省略されることがよくあります。", back: [S4, S1] }],
  },
  {
    ...base("practice-but-lost", 2),
    prompt: "（　）に入る語として正しいものはどれですか。\nRiku practiced very hard, (　) he lost the game.",
    answer: {
      kind: "choice",
      options: ["but", "so", "because", "or"],
      correct: 0,
      why: ["正しい。一生けんめい練習した「のに」負けた。予想と逆なので but。", "so は「だから」。練習したから負けた、では自然な結果にならない。", "because なら「負けたので練習した」の意味になり、合わない。", "or は「または」。どちらかを選ぶ文ではない。"],
      mistakeOf: [null, 2, null, null],
    },
    point: "so は自然な結果、but は予想と逆の内容",
    steps: [{ title: "自然な結果か、逆か", body: "練習した → 勝つ、なら自然な結果で so。ここは{{負けた}}ので、予想と逆の内容をつなぐ {{but}} です。", trap: "「〜して、…した」と日本語で考えて so を選ばない。", back: [S1, S3] }],
  },
  // ---- 発展 ----
  {
    ...base("fix-because-so", 3, "思考・判断・表現"),
    prompt: "次の英文には誤りが1か所あります。正しく直したものはどれですか。\nBecause the train was late, so I ran to school.",
    answer: {
      kind: "choice",
      options: ["so を取る", "Because を When にする", "was を is にする", "ran を run にする"],
      correct: 0,
      why: ["正しい。because と so は1つの文でどちらか一方だけ。Because 〜, I ran to school. とする。", "when でも意味は通るが、so が残ったままで誤りが直らない。", "電車がおくれたのは過去のこと。was で正しい。", "走ったのは過去のこと。ran で正しい。"],
    },
    point: "because と so はいっしょに使わない",
    steps: [
      { title: "接続詞が2つ", body: "Because 〜（〜なので）と so（だから）は、どちらも原因と結果をつなぐ語。{{1つの文にはどちらか一方}}だけです。", back: [S3] },
      { title: "直し方", body: "{{so を取って}} Because the train was late, I ran to school. とします。The train was late, so I ran to school. でも正しい文になります。", back: [S3, S2] },
    ],
  },
  {
    ...base("fix-when-will", 3, "思考・判断・表現"),
    prompt: "次の英文には誤りが1か所あります。正しく直したものはどれですか。\nWhen my sister will come back from Canada, we will have a party.",
    answer: {
      kind: "choice",
      options: ["will come → comes", "we will have → we have", "from → to", "When → Because"],
      correct: 0,
      why: ["正しい。「〜とき」の when のまとまりの中は、未来のことでも現在形。", "まとまりの外のパーティーは未来のことなので will のままでよい。", "カナダから帰ってくるので from で正しい。", "理由ではなく「帰ってきたとき」という時を表すので when のまま。"],
    },
    point: "when のまとまりの中も、未来のことは現在形",
    steps: [
      { title: "中と外を分ける", body: "コンマまでが when のまとまり。中は「帰ってくるとき」という場面を置くだけなので{{現在形}}にします。", back: [S4] },
      { title: "外は will", body: "主語 my sister は3人称単数なので {{comes}}。まとまりの外の we will have a party は未来の予定なので will を残します。", back: [S4] },
    ],
  },
  {
    ...base("same-meaning-bus", 3, "思考・判断・表現"),
    prompt: "次の英文とほぼ同じ意味の文はどれですか。\nKaito missed the bus, so he walked to the station.",
    answer: {
      kind: "choice",
      options: ["Kaito walked to the station because he missed the bus.", "Kaito missed the bus because he walked to the station.", "Kaito walked to the station, but he missed the bus.", "If Kaito misses the bus, he walks to the station."],
      correct: 0,
      why: ["正しい。原因（バスに乗りおくれた）の前に because を置いている。", "原因と結果が逆。「駅まで歩いたので、バスに乗りおくれた」の意味になる。", "but は逆の内容をつなぐ。もとの文は「だから」の関係。", "「もし〜なら」の条件の文になり、過去の出来事ではなくなる。"],
    },
    point: "so の後ろ＝結果、because の後ろ＝原因",
    steps: [
      { title: "原因と結果を見分ける", body: "もとの文で so の前の Kaito missed the bus が{{原因}}、後ろの he walked to the station が{{結果}}です。", back: [S3] },
      { title: "because は原因の前", body: "because で書きかえるときは、原因の前に because を置きます：〜 {{because he missed the bus}}。", back: [S3] },
    ],
  },
  {
    ...base("if-sunny-saturday", 3, "思考・判断・表現"),
    prompt: "次の日本文に合う英文として正しいものはどれですか。\n「もし来週の土曜日に晴れたら、私たちは山に登るつもりです。」",
    answer: {
      kind: "choice",
      options: ["If it is sunny next Saturday, we will climb the mountain.", "If it will be sunny next Saturday, we will climb the mountain.", "Because it is sunny next Saturday, we will climb the mountain.", "If it is sunny next Saturday, so we will climb the mountain."],
      correct: 0,
      why: ["正しい。if の中は現在形 is、外は未来の will。前に置いたまとまりの後ろにコンマ。", "if の中に will は使わない。", "because は「〜なので」と理由を表す。「もし〜なら」は if。", "if のまとまりのあとに so は置かない。コンマで区切るだけでよい。"],
      mistakeOf: [null, 0, null, 1],
    },
    point: "If ＋ 現在形, ＋ will 〜.",
    steps: [
      { title: "条件は if、中は現在形", body: "「もし晴れたら」は条件なので {{if}}。来週のことでも中は {{it is sunny}} と現在形です。", back: [S4] },
      { title: "前に置いたらコンマ", body: "if のまとまりを文の前に置いたので、区切りに{{コンマ}}。そのあとに本題 we will climb 〜 を続けます。", back: [S2] },
    ],
  },
];

const ORDER: QuestionB[] = [
  // ---- 基本 ----
  {
    ...ord("narabe-when-sister", 1),
    prompt: "日本語に合うように語句を並べかえなさい。使わない語が1つあります。\n「姉が帰ってきたとき、私は宿題をしていました。」",
    answer: { kind: "order", tokens: ["When", "my sister", "came", "home,", "I", "was", "doing", "my homework."], distractor: "so" },
    point: "When 〜, のあとに本題を続ける",
    steps: [{ title: "まとまりを前に", body: "{{When my sister came home,}}（姉が帰ってきたとき）を前に置き、コンマのあとに本題 I was doing my homework を続けます。", back: [S2] }],
  },
  {
    ...ord("narabe-because-sleepy", 1),
    prompt: "日本語に合うように語を並べかえなさい。使わない語が1つあります。\n「ねむかったので、私はテレビを消しました。」",
    answer: { kind: "order", tokens: ["I", "turned", "off", "the", "TV", "because", "I", "was", "sleepy."], alsoOk: [[0, 1, 3, 4, 2, 5, 6, 7, 8]], distractor: "so" },
    point: "結果 ＋ because ＋ 原因",
    steps: [{ title: "理由を後ろに", body: "まず結果 I turned off the TV（テレビを消した）。そのあとに {{because I was sleepy}}（ねむかったので）を続けます。because と so はいっしょに使わないので so は不要です。", back: [S3] }],
  },
  // ---- 標準 ----
  {
    ...ord("narabe-if-rains-gym", 2),
    prompt: "日本語に合うように語を並べかえなさい。使わない語が1つあります。\n「もし明日雨が降れば、私たちは体育館で練習します。」",
    answer: { kind: "order", tokens: ["If", "it", "rains", "tomorrow,", "we", "will", "practice", "in", "the", "gym."], distractor: "rained" },
    point: "if の中は現在形 rains、外は will",
    steps: [{ title: "中と外で形を分ける", body: "If it {{rains}} tomorrow, と if の中は現在形。外の「練習します」は未来なので {{we will practice}} とします。", back: [S4, S2] }],
  },
  {
    ...ord("narabe-know-that", 2),
    prompt: "日本語に合うように語を並べかえなさい。使わない語が1つあります。\n「ケンが明日来ることを、私は知っています。」",
    answer: { kind: "order", tokens: ["I", "know", "that", "Ken", "will", "come", "tomorrow."], distractor: "if" },
    point: "know that 〜 ＝「〜ということを知っている」",
    steps: [{ title: "that のまとまり", body: "I know のあとに {{that Ken will come tomorrow}}（ケンが明日来るということ）を続けます。この that のまとまりは条件ではないので、未来のことは will で表します。", back: [S1, S4] }],
  },
  {
    ...ord("narabe-heavy-but", 2),
    prompt: "日本語に合うように語を並べかえなさい。使わない語が1つあります。\n「この箱は重かったが、私はひとりでそれを運びました。」",
    answer: { kind: "order", tokens: ["This", "box", "was", "heavy,", "but", "I", "carried", "it", "alone."], distractor: "so" },
    point: "予想と逆の内容は but でつなぐ",
    steps: [{ title: "「〜が」は but", body: "「重かった」と「ひとりで運んだ」は予想と逆の内容なので {{but}}。This box was heavy, のあとに but I carried it alone を続けます。", back: [S1] }],
  },
];

export const J_EN_2_SETSUZOKUSHI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "中2",
  minutes: 10,
  review: { status: "draft" },
  sections: [
    { title: "接続詞の意味と使い方", lead: "次の問いに答えなさい。", style: "word", pick: 5, questions: FORMS },
    { title: "並べかえ", lead: "日本語に合うように、語（語句）を並べかえなさい。文の最初の語は大文字で始めてあります。", style: "word", pick: 2, questions: ORDER },
  ],
};
