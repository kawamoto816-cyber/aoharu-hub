// 高校英語（技能）「和文英訳」の単元模試。問題・英文はすべてオリジナル (教科書・過去問・市販教材の文は使っていない)。
// 大問1 (B プール8問→4問)「英訳を選ぶ・並べる」1回に基本2・標準1・発展1 (15＋15＋17＋18＝65点)
// 大問2 (C 固定)「日本語を英語にする」標準17・発展18 (模範解答と採点観点で自己採点)。1回 6問・満点100。A (生成) は使っていないので検算式はなし。
import type { QuestionB, QuestionC, UnitMoshi } from "../types";

const U = "h-eng-skill-wabun";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "日本語→日本語→英語の3段階で考える");
const S2 = L(2, "主語のない日本語には、主語を補う");
const S3 = L(3, "知らない単語は、知っている表現に言いかえる");
const S4 = L(4, "日本にしかない言葉は、説明を添えて書く");
const S5 = L(5, "書いたら、ミスの出やすい点を見直す");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 50, 2: 75, 3: 90 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("subject-tired", 1),
    prompt: "「疲れていたので、昨夜は早く寝た」の英訳として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: [
        "I was tired, so I went to bed early last night.",
        "Was tired, so went to bed early last night.",
        "I am tired, so I go to bed early last night.",
        "I was tired, so I went to bed fast last night.",
      ],
      correct: 0,
      why: [
        "主語 I を補い、過去の話なので was・went と過去形にしている。",
        "英語の文には主語が必要。日本語のまま主語を省いている。",
        "last night の話なのに現在形（am・go）になっている。",
        "「早く寝る」の早くは時刻が早い early。fast は速さ。",
      ],
    },
    point: "主語を補い、時制をそろえる",
    steps: [
      { title: "主語を補う", body: "だれが疲れていたのかを考えて「{{私は}}疲れていたので、昨夜早く寝た」と直します。", back: [S2] },
      { title: "時制", body: "last night なので {{was}}・{{went}} の過去形。", back: [S5] },
    ],
  },
  {
    ...base("third-person", 1),
    prompt: "「姉は毎朝、犬の散歩をする」の英訳として、文法のまちがいがないものはどれですか。",
    answer: {
      kind: "choice",
      options: [
        "My sister walks our dog every morning.",
        "My sister walk our dog every morning.",
        "My sister walks our dog every mornings.",
        "My sister is walk our dog every morning.",
      ],
      correct: 0,
      why: [
        "主語 My sister は3人称単数なので walks。every のあとは単数の morning。",
        "3人称単数・現在なので walk に s が必要。",
        "every のあとは単数形。mornings は誤り。",
        "is と walk の動詞が2つ並んでいる。",
      ],
    },
    point: "主語が3人称単数なら動詞に s",
    steps: [{ title: "見直しの順番", body: "{{時制}}→主語に合わせた{{三単現の s}}→名詞の{{単数・複数}}の順に確かめます。every＋単数形。", back: [S5] }],
  },
  {
    ...base("dekita-library", 1),
    prompt: "「駅の近くに新しいスーパーができた」の英訳として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: [
        "A new supermarket was built near the station.",
        "A new supermarket could near the station.",
        "A new supermarket made near the station.",
        "The station made a new supermarket.",
      ],
      correct: 0,
      why: [
        "「できた」を「建てられた」と言いかえ、受動態 was built で書いている。",
        "「できる」を can（could）にしたまちがい。動詞もない。",
        "made では「スーパーが（何かを）作った」になり、意味が通らない。",
        "駅がスーパーを作ったのではない。",
      ],
    },
    point: "「できた」は「建てられた」と言いかえる",
    steps: [{ title: "言いかえる", body: "「できる」は make や can ではなく「{{建てられた}}」（was built）や「{{ある}}」（There is 〜）と言いかえます。", back: [S3] }],
  },
  // ---- 標準 ----
  {
    ...base("yukata", 2),
    prompt: "「夏祭りでは、浴衣を着る人が多い」を英語にするとき、浴衣の書き方として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: [
        "Many people wear yukata, light cotton kimono, at summer festivals.",
        "Many people wear yukata at summer festivals.",
        "Many people wear summer clothes at summer festivals.",
        "Many people wear kimono at summer festivals.",
      ],
      correct: 0,
      why: [
        "ローマ字の yukata のすぐあとに、コンマで説明（夏用の木綿の着物）を添えている。",
        "日本の言葉を知らない読み手には yukata が何かわからない。",
        "説明が広すぎて、浴衣だと伝わらない。",
        "浴衣はふつうの着物とちがうので、意味がずれる。",
      ],
    },
    point: "日本特有の語はローマ字＋説明",
    steps: [{ title: "説明を添える", body: "日本にしかないものは{{ローマ字}}で書き、{{コンマ}}や or で説明を続けます。2回目からはローマ字だけでよい。", back: [S4] }],
  },
  {
    ...base("order-woman", 2),
    prompt: "「私が昨日図書館で会った女性は、医者だ」を英語にします。語句を正しい順に並べなさい。",
    answer: {
      kind: "order",
      tokens: ["The woman", "I", "met", "at the library", "yesterday", "is", "a doctor."],
      alsoOk: [[0, 1, 2, 4, 3, 5, 6]],
    },
    point: "主語と動詞を先に決め、修飾は後ろから",
    steps: [
      { title: "骨組み", body: "文の骨組みは「女性は医者だ」＝ {{The woman is a doctor.}}", back: [S1] },
      { title: "後ろから説明", body: "「私が昨日図書館で会った」は The woman のすぐ後ろに {{I met at the library yesterday}} と置きます（関係代名詞の省略）。", back: [S1] },
    ],
  },
  {
    ...base("good-at", 2),
    prompt: "「弟は料理が上手だ」の英訳として、文法のまちがいがないものはどれですか。",
    answer: {
      kind: "choice",
      options: [
        "My brother is good at cooking.",
        "My brother is good at cook.",
        "My brother good at cooking.",
        "My brother is good in cooking.",
      ],
      correct: 0,
      why: [
        "be good at のあとは名詞か動名詞。cooking で正しい。",
        "前置詞 at のあとに動詞の原形 cook は置けない。",
        "be 動詞 is がない。",
        "「〜が上手だ」は good at。",
      ],
    },
    point: "前置詞のあとの動詞は〜ing",
    steps: [{ title: "和文和訳", body: "「料理が上手」＝「料理することが得意」と直し、{{be good at 〜ing}} を使います。", back: [S1, S5] }],
  },
  // ---- 発展 ----
  {
    ...base("whenever", 3, "思考・判断・表現"),
    prompt: "「この写真を見ると、いつも祖母のことを思い出す」の英訳として、{{意味がずれている}}ものはどれですか。",
    answer: {
      kind: "choice",
      options: [
        "I remembered my grandmother when I took this picture.",
        "Whenever I look at this picture, I remember my grandmother.",
        "This picture always reminds me of my grandmother.",
        "Every time I see this picture, I think of my grandmother.",
      ],
      correct: 0,
      why: [
        "「写真を撮ったときに思い出した」と1回の過去の話になり、「見るといつも」の意味がない。",
        "whenever（〜するときはいつも）で正しく表している。",
        "remind A of B（A に B を思い出させる）で、写真を主語にした言いかえ。",
        "every time（〜するたびに）で正しく表している。",
      ],
    },
    point: "「いつも」「〜するたびに」を落とさない",
    steps: [
      { title: "意味の中心", body: "「見ると{{いつも}}」はくり返しの習慣。現在形と {{whenever / every time / always}} で表します。", back: [S1] },
      { title: "主語を変える手", body: "{{This picture reminds me of 〜.}} のように、物を主語にしても同じ意味を書けます。", back: [S3] },
    ],
  },
  {
    ...base("if-had", 3),
    prompt: "「もっと早く家を出ていれば、電車に間に合ったのに」の英訳として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: [
        "If I had left home earlier, I could have caught the train.",
        "If I left home earlier, I could catch the train.",
        "If I leave home earlier, I can catch the train.",
        "When I had left home earlier, I could have caught the train.",
      ],
      correct: 0,
      why: [
        "過去の事実の反対を言う仮定法過去完了（If＋had 過去分詞, could have 過去分詞）。",
        "仮定法過去で「今」の反対の意味になる。過去の話にならない。",
        "現在の条件で「早く出れば間に合う」。後悔の意味にならない。",
        "仮定の if を when にしているので、事実の話になってしまう。",
      ],
    },
    point: "過去の後悔は If＋had 過去分詞",
    steps: [
      { title: "主語を補う", body: "「（私が）もっと早く家を出ていれば、（私は）電車に間に合ったのに」。", back: [S2] },
      { title: "時制の形", body: "過去の事実と反対なので {{If I had left …, I could have caught …}}。", back: [S5] },
    ],
  },
];

const WRITE: QuestionC[] = [
  {
    id: "write-young-people",
    type: "C",
    difficulty: 2,
    points: 17,
    seconds: 180,
    skill: "思考・判断・表現",
    prompt: "次の日本語を英語にしなさい。\n「この町には、若い人が楽しめる場所があまりない」",
    answer: {
      kind: "written",
      model: "There are not many places where young people can have fun in this town.",
      alsoModels: [
        "This town doesn't have many places for young people to enjoy.",
        "There aren't many places that young people can enjoy in this town.",
      ],
      rubric: [
        { label: "「あまりない」を not many（There are not many 〜 など）で書いている", points: 6, keywords: ["not many"] },
        { label: "「若い人が楽しめる」で places を後ろから説明している（where・that・for 〜 to など）", points: 6, keywords: ["where", "that", "for young people"] },
        { label: "enjoy の目的語・複数形・be 動詞の形にまちがいがない", points: 5 },
      ],
    },
    point: "「あまりない」は not many、説明は後ろから",
    steps: [
      { title: "和文和訳", body: "「この町には、若い人が楽しめる場所が{{多くはない}}」と直すと、{{There are not many places}} が骨組みになります。", back: [S1] },
      { title: "後ろから説明", body: "places のあとに {{where young people can have fun}} を続けます。enjoy を使うなら目的語が要る（enjoy themselves）。", trap: "where のあとに enjoy だけを置くと、enjoy の目的語が足りない。", back: [S1, S5] },
    ],
  },
  {
    id: "write-toshikoshi",
    type: "C",
    difficulty: 3,
    points: 18,
    seconds: 240,
    skill: "思考・判断・表現",
    prompt: "次の日本語を英語にしなさい。\n「日本では、大みそかに年越しそばを食べる人が多い」",
    answer: {
      kind: "written",
      model: "In Japan, many people eat toshikoshi soba, or buckwheat noodles, on New Year's Eve.",
      alsoModels: ["In Japan, a lot of people eat toshikoshi soba, buckwheat noodles eaten at the end of the year, on New Year's Eve."],
      rubric: [
        { label: "「〜する人が多い」を many people を主語にして書いている", points: 6, keywords: ["many people", "a lot of people"] },
        { label: "年越しそばをローマ字で書き、説明（or buckwheat noodles など）を添えている", points: 6, keywords: ["soba", "noodles"] },
        { label: "「大みそかに」を on New Year's Eve で書き、時制（現在形）にまちがいがない", points: 6, keywords: ["New Year's Eve"] },
      ],
    },
    point: "「〜する人が多い」は many people を主語に",
    steps: [
      { title: "主語を決める", body: "「〜する人が多い」は「{{多くの人が〜する}}」と直し、{{many people}} を主語にします。", back: [S1, S2] },
      { title: "日本の言葉", body: "{{toshikoshi soba, or buckwheat noodles}} のように、ローマ字に説明を添えます。", back: [S4] },
      { title: "見直し", body: "毎年の習慣なので{{現在形}}。「大みそかに」は on New Year's Eve。", back: [S5] },
    ],
  },
];

export const H_ENG_SKILL_WABUN_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "技能",
  minutes: 12,
  review: { status: "draft" },
  sections: [
    { title: "英訳を選ぶ・並べる", lead: "次の日本語の英訳について、問いに答えなさい。", style: "word", pick: 4, questions: POOL },
    { title: "日本語を英語にする", lead: "次の日本語を英語にしなさい。", style: "writing", questions: WRITE },
  ],
};
