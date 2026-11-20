import type { UnivExam } from "./types";
import type { ExamPoolSection } from "../pool/types";
import type { QuestionB, Skill, SolutionStep } from "@/lib/moshi/types";

// 神戸大学型 英語（国公立・2次試験）。前期日程の個別学力検査（学部共通の問題）の傾向を参考にした形式（英文・和文・設問はすべて書き下ろし）。
//   80分・大問4題（素点は 35/35/30/25 の125点とされる）。I・II は600語前後の論説の長文読解（空所補充・同意語句の選択、
//   下線部和訳、字数制限のある内容説明、内容一致）、III は大学の授業での討論など口語表現を含む会話文の読解
//   （発言の意図・和訳・内容説明に、40語程度で内容を英語でまとめる問い）、IV は自由英作文（短い説明と意見の2問）。
//   英文の題材・登場する人物・地名はすべて架空。実在の人物の発言は使っていない。
// 参考:
//   https://jyuke-labo.com/daigakujyukentaisaku/kobedaigaku/eigo/ （80分・大問4題・配点 35/35/30/25・各大問の設問形式・40語の英語の記述）
//   https://study-search.jp/columns/800 （長文3題＋自由英作文・各大問に字数制限のある記述）
//   https://www.office.kobe-u.ac.jp/stdnt-examinavi/wp-content/uploads/2021/08/08.z_eng_ito.pdf （神戸大学公表の出題意図：I・II 論説文、III 大学院の授業での議論、IV 英作文）

const U = {
  chobun: "h-eng-skill-chobun",
  wabun: "h-eng-skill-wabun",
  jiyu: "h-eng-skill-jiyu",
  vocab: "h-eng-vocab-2000",
  setsuzoku: "h-eng-gram-setsuzokushi",
  tokushu: "h-eng-gram-tokushu",
  hikaku: "h-eng-gram-hikaku",
  kankei: "h-eng-gram-kanfuku",
  bunshi: "h-eng-gram-bunshikobun",
  futeishi: "h-eng-gram-futeishi",
  kateiho: "h-eng-gram-kateiho",
  domeishi: "h-eng-gram-domeishi",
} as const;

type St = [string, string];
type Rb = [string, number, string[]][];
const steps = (s: St[]): SolutionStep[] => s.map(([title, body]) => ({ title, body }));
const K: Skill = "知識・技能";
const S: Skill = "思考・判断・表現";

/** 記述 (和訳・内容説明・英作文)。配点は採点基準の合計 */
function W(
  id: string,
  difficulty: 2 | 3,
  unit: string,
  prompt: string,
  model: string,
  rubric: Rb,
  point: string,
  st: St[],
  limit?: { min?: number; max?: number; unit: "語" | "字" },
  seconds = 420,
): QuestionB {
  const points = rubric.reduce((s, r) => s + r[1], 0);
  return {
    id,
    type: "B",
    difficulty,
    points,
    seconds,
    skill: S,
    unit,
    prompt,
    answer: { kind: "written", ...(limit ? { limit } : {}), model, rubric: rubric.map(([label, p, keywords]) => ({ label, points: p, keywords })) },
    point,
    steps: steps(st),
  };
}

/** 4択 (正解は先頭) */
function C(id: string, difficulty: 2 | 3, unit: string, prompt: string, options: string[], why: string[], point: string, st: St[], skill: Skill = S): QuestionB {
  return { id, type: "B", difficulty, points: 6, seconds: 120, skill, unit, prompt, answer: { kind: "choice", options, correct: 0, why }, point, steps: steps(st) };
}

/** 下線部和訳 */
const WY = (id: string, n: number, d: 2 | 3, unit: string, model: string, rb: Rb, point: string, st: St[]) =>
  W(id, d, unit, `下線部(${n})を和訳せよ。`, model, rb, point, st, undefined, 420);

/** 内容説明 (字数) */
const WS = (id: string, d: 2 | 3, prompt: string, max: number, model: string, rb: Rb, point: string, st: St[]) =>
  W(id, d, U.chobun, `${prompt}（${max}字以内の日本語で）`, model, rb, point, st, { max, unit: "字" }, 420);

/** 英語で内容をまとめる (40語程度) */
const WE = (id: string, prompt: string, model: string, rb: Rb, point: string, st: St[]) =>
  W(id, 3, U.jiyu, `${prompt}（35〜45語の英語で）`, model, rb, point, st, { min: 35, max: 45, unit: "語" }, 480);

const weRubric = (content: string[]): Rb => [
  ["本文に即した内容を過不足なく英語で表している", 5, content],
  ["本文をそのまま写さず、自分の英語で言いかえている", 2, []],
  ["文法・語法・つづりの誤りがない", 3, []],
];

const READ_LEAD = "次の英文を読み、下の設問に答えよ。";
const TALK_LEAD = "次の会話文は、大学の授業での教員と学生の議論である。これを読み、下の設問に答えよ。";

function reading(tag: number, id: string, title: string, lead: string, ptitle: string, body: string, questions: QuestionB[]): ExamPoolSection {
  return {
    unit: U.chobun,
    tag: `kobe-eigo:${tag}`,
    section: {
      id: `kobe-en-${id}`,
      title,
      lead,
      style: "reading",
      examOnly: true,
      material: [{ kind: "passage", lang: "en", title: ptitle, body }],
      pick: 5,
      questions,
    },
  };
}

// =====================================================================
// 第1問　長文読解（科学・社会の論説）
//   各節6問（空所・同意語・和訳・説明・説明・内容一致）。1回に5問。
// =====================================================================

const P1: ExamPoolSection[] = [
  reading(
    1,
    "old-songs",
    "音楽と記憶の結びつきを論じた文章",
    READ_LEAD,
    "Why Old Songs Stay With Us",
    `Most people can name a song that instantly carries them back to a particular summer, a particular friend or a particular kitchen. The effect is so familiar that we rarely stop to ask why music, more than almost any other kind of experience, should hold on to the past so firmly. Researchers who study memory have offered several answers, and taken together they suggest that a song is less a recording of a moment than a key that opens many doors at once.

The first answer concerns timing. When people are asked to list the songs that mean the most to them, they tend to choose music they heard between the ages of about ten and twenty-five. This is the period in which many people form close friendships, fall in love for the first time and make decisions about who they want to become. {{(1) Because so much of what we later regard as our identity takes shape in these years, the songs that happened to be playing at the time become attached to memories that we return to again and again.}} Each return strengthens the connection, so that the song and the memory grow harder and harder to separate.

The second answer concerns emotion. Music has a remarkable power to change how we feel, often before we have noticed that it has done so. Experiences that arouse strong feelings are generally remembered better than calm ones, and a song heard at an emotional moment is stored together with that feeling. Years later, hearing the song may [ A ] not only the facts of the event but also something of the mood, so that a person may suddenly feel nervous or hopeful without at first knowing why.

A third answer concerns structure. A song is organized in time: one phrase leads to the next, and a chorus returns at regular intervals. This predictable order makes music easier to hold in memory than, say, a list of unrelated words. It may also explain an observation that has surprised many people who care for patients with severe memory loss. Patients who can no longer recognize members of their own family are sometimes able to sing every word of a song they learned in childhood. {{(a) Remarkably}}, singing may even help them recall, for a short time, other memories connected with the song.

None of this means that music can cure diseases of memory, and researchers are careful not to claim so. What it suggests is that memories are not stored in one place, like files in a single drawer, but are spread across many connections, some of which survive when others are lost. A song touches several of these connections at the same time: the sound itself, the feeling it once produced, and the people and places that surrounded it.

There is a lesson here for anyone who wishes to remember something well. We tend to remember not what we try hardest to store but what is woven into our lives through feeling and repetition. A song we heard once in a shop fades quickly; a song we sang with friends on long journeys may stay with us for the rest of our lives.`,
    [
      C("blank-a", 2, U.vocab, "空所［ A ］に入る最も適切なものを選べ。", ["bring back", "put off", "give up", "make out"], [
        "正解。bring back（よみがえらせる）。出来事の事実だけでなく当時の気分もよみがえる、という流れ。",
        "put off は「延期する」。記憶と気分の話につながらない。",
        "give up は「あきらめる・手放す」。曲を聞くと記憶を手放す、では逆になる。",
        "make out は「見分ける・理解する」。mood を目的語にすると意味が通らない。",
      ], "not only A but also B の両方を目的語にとる動詞", [
        ["前後の流れ", "曲は{{感情とともに}}蓄えられる → 何年も後に曲を聞くと、事実だけでなく{{気分も}}…。"],
        ["語を選ぶ", "「よみがえらせる」＝ {{bring back}}。直後の so that 以下（突然不安や希望を感じる）とも合う。"],
      ], K),
      C("syn-a", 2, U.vocab, "下線部(a) Remarkably に最も意味が近いものを選べ。", ["Surprisingly", "Fortunately", "Gradually", "Naturally"], [
        "正解。remarkably は「驚くべきことに」。家族もわからない患者が歌で他の記憶まで思い出す、という意外さを表す。",
        "fortunately は「幸運にも」。意外さではなく、よしあしの判断になる。",
        "gradually は「しだいに」。時間の経過を表し、文の副詞として合わない。",
        "naturally は「当然ながら」。予想どおりの意味になり、直前の surprised と食いちがう。",
      ], "文頭の副詞は話し手の評価を表す", [
        ["文脈", "直前に an observation that has {{surprised}} many people。その驚きの続き。"],
        ["語義", "remarkable＝注目に値する・驚くべき。文副詞 {{Remarkably}}＝「驚くべきことに」。"],
      ], K),
      WY("tr1", 1, 3, U.kankei, "私たちが後に自分らしさ（アイデンティティ）とみなすものの多くがこの数年のあいだに形づくられるので、そのときたまたま流れていた曲は、私たちが何度も立ち返る記憶と結びつくようになる。", [
        ["Because 節の so much of what we later regard as our identity を「後にアイデンティティとみなすものの多く」と訳す", 4, ["みなす", "多く"]],
        ["the songs that happened to be playing を「たまたま流れていた曲」と訳す", 3, ["たまたま"]],
        ["become attached to memories that we return to again and again を正しく訳す", 3, ["結びつ", "何度も"]],
      ], "what we regard as A は「Aとみなすもの」", [
        ["Because 節", "so much of {{what we later regard as our identity}} takes shape：regard A as B の A が what になった形。"],
        ["主節", "the songs {{that happened to be playing}} … become attached to memories {{that we return to}} again and again。"],
      ]),
      WS("structure", 3, "第4段落で、音楽が無関係な単語の一覧よりも記憶にとどめやすいとされるのはなぜか。説明せよ。", 50,
        "曲は時間の中で組み立てられ、一つの旋律が次へつながり、サビが規則的にもどってくるという予測しやすい順序をもつから。", [
          ["曲が時間の中で組み立てられ、旋律が次へつながる", 5, ["時間", "つなが"]],
          ["サビが規則的にもどる、予測しやすい順序がある", 5, ["予測", "規則的", "順序"]],
        ], "This predictable order の This が指す内容", [
          ["根拠", "A song is {{organized in time}}: one phrase leads to the next, and a chorus {{returns at regular intervals}}。"],
          ["まとめる", "This {{predictable order}} makes music easier to hold in memory。コロンの後ろの具体を入れる。"],
        ]),
      WS("connections", 3, "第5段落で、筆者は記憶がどのように蓄えられていると述べ、そのことから曲が記憶を呼び起こしやすい理由をどう説明しているか。", 90,
        "記憶は一か所ではなく多くのつながりに分散して蓄えられており、曲は音そのもの、かつて生んだ感情、周囲にいた人や場所という複数のつながりに同時にふれるから。", [
          ["記憶は一か所でなく多くのつながりに分散している", 4, ["一か所", "分散", "つながり"]],
          ["曲は複数のつながりに同時にふれる", 3, ["同時"]],
          ["音・感情・人や場所の三つを挙げる", 3, ["音", "感情", "場所"]],
        ], "not A but B と、コロン以下の三つの具体", [
          ["記憶の蓄え方", "memories are {{not stored in one place}} … {{but are spread across many connections}}。"],
          ["曲の働き", "A song touches several of these connections {{at the same time}}: the sound, the feeling, the people and places。"],
        ]),
      C("match", 2, U.chobun, "本文の内容と一致するものを選べ。", [
        "People tend to choose songs from roughly their teens and early twenties as the ones that mean the most to them.",
        "Researchers have shown that music can cure diseases that destroy memory.",
        "Calm experiences are generally remembered better than emotional ones.",
        "A song heard only once in a shop is likely to be remembered for life.",
      ], [
        "正解。第2段落：they tend to choose music they heard between the ages of about ten and twenty-five。",
        "第5段落 None of this means that music can cure diseases of memory と食いちがう。",
        "第3段落：強い感情を伴う経験のほうが calm ones より記憶に残る、とあり逆。",
        "最終段落 A song we heard once in a shop fades quickly と食いちがう。",
      ], "比較の向き（better than）と否定を確かめる", [
        ["根拠", "第2段落：between the ages of about {{ten and twenty-five}}。"],
        ["誤りの確認", "「治せる」は第5段落の {{None of this means}}、「店で一度」は最終段落の {{fades quickly}} と逆。"],
      ]),
    ],
  ),
  reading(
    1,
    "ratings",
    "オンラインの評価と信頼を論じた文章",
    READ_LEAD,
    "Trusting Strangers Online",
    `A century ago, most people bought goods from shopkeepers they knew personally, and a dishonest trader soon lost customers because word spread through the neighborhood. Today we routinely send money to sellers we will never meet, stay in the homes of strangers and climb into cars driven by people whose names we learned a few minutes earlier. What makes this possible is not that people have become more honest, but that the internet has found a new way of spreading the word: the online rating.

The idea is simple. After each transaction, buyers and sellers rate one another, and the ratings are made public. A seller who cheats will collect poor ratings, and future customers will avoid him. {{(1) In this way, a system of stars and short comments performs the function once performed by gossip in a village, allowing people who have no other means of judging one another to decide whom to trust.}}

Yet the system has a curious weakness. On many platforms, the average rating is extremely high; it is not unusual for almost every seller to have four and a half stars or more out of five. One might conclude that nearly everyone online is excellent, but a more likely explanation is that the ratings have lost much of their meaning. Several forces push them upward. Many users feel that giving a low score is unkind, especially when the other person is an individual rather than a large company. Others fear that a poor rating will be answered with a poor rating in return. And because a score of four stars now looks like a warning, people who were merely satisfied give five so as not to [ A ] the seller.

When almost everyone receives the top score, the score no longer tells customers what they want to know. {{(a) Paradoxically}}, a system designed to make strangers more trustworthy can end up making it harder to tell the trustworthy from the rest. Customers respond by looking for other signs: they read the written comments, count how many reviews a seller has, or pay particular attention to the rare complaint.

Some platforms have tried to repair the system. One method is to keep each side's rating hidden until both have been submitted, so that neither can punish the other. Another is to ask users to compare a seller with others they have used, rather than to give a score in isolation. Such changes help, but they cannot remove the basic difficulty. A rating is only as useful as the honesty of the people who give it, and honesty is easiest when it costs nothing.

Perhaps the deeper lesson is that trust cannot be fully turned into numbers. A village could rely on gossip because its people would meet again and again, and the cost of a bad reputation was real. Online systems try to reproduce that pressure, but they work best when users remember that behind every star there is a human judgment, with all the kindness, fear and carelessness that human judgments contain.`,
    [
      C("blank-a", 2, U.vocab, "空所［ A ］に入る最も適切な語を選べ。", ["hurt", "praise", "contact", "replace"], [
        "正解。so as not to hurt the seller＝「売り手を傷つけ（損をさせ）ないように」。四つ星が警告に見えるので、満足程度でも五つ星をつける。",
        "praise（ほめる）では「ほめないように五つ星」となり矛盾する。",
        "contact（連絡する）は評価をつける理由と関係がない。",
        "replace（取りかえる）では意味が通らない。",
      ], "so as not to do は「〜しないように」", [
        ["前後の流れ", "四つ星は今や{{警告}}に見える → 満足しただけの人も五つ星をつける。その目的。"],
        ["語を選ぶ", "四つ星で売り手が不利にならないよう＝ so as not to {{hurt}} the seller。"],
      ], K),
      C("syn-a", 2, U.vocab, "下線部(a) Paradoxically に最も意味が近いものを選べ。", ["Contrary to what one might expect", "As everyone predicted", "For practical reasons", "In most cases"], [
        "正解。paradoxically は「逆説的に」。信頼を高めるための仕組みが、かえって信頼できる人を見分けにくくする、という予想に反する結果。",
        "「皆が予想したとおり」は逆の意味。",
        "「実用上の理由で」は逆説の意味を含まない。",
        "「たいていの場合」は頻度を表し、意味が異なる。",
      ], "目的と結果が逆になる＝逆説", [
        ["文の中身", "a system designed to make strangers {{more trustworthy}} → {{harder to tell}} the trustworthy from the rest。"],
        ["語義", "目的とは逆の結果になること＝{{paradox}}。"],
      ], K),
      WY("tr1", 1, 3, U.bunshi, "このようにして、星の数と短いコメントからなる仕組みが、かつて村のうわさ話が果たしていた役割を果たし、互いを判断するほかの手段をもたない人々が、だれを信頼するかを決められるようにしている。", [
        ["performs the function once performed by gossip を「かつてうわさ話が果たしていた役割を果たす」と訳す", 4, ["うわさ", "役割"]],
        ["allowing … to decide を分詞構文（〜できるようにする）として訳す", 3, ["できる"]],
        ["people who have no other means of judging one another と whom to trust を訳す", 3, ["手段", "だれを"]],
      ], "once performed は過去分詞の後置修飾", [
        ["修飾", "the function {{once performed by gossip}} in a village：「かつて村のうわさ話によって果たされていた役割」。"],
        ["分詞構文", "{{allowing people … to decide whom to trust}}：allow A to do（Aが〜できるようにする）。"],
      ]),
      WS("upward", 3, "第3段落で、評価を押し上げる要因として挙げられているものを三つ、説明せよ。", 90,
        "低い点をつけるのは不親切だと感じること、低い評価には低い評価で仕返しされると恐れること、四つ星が警告に見えるため満足しただけの人も五つ星をつけること。", [
          ["低い点は不親切だと感じる", 3, ["不親切"]],
          ["仕返しの低評価を恐れる", 3, ["仕返し", "報復", "恐れ"]],
          ["四つ星が警告に見えるので五つ星をつける", 4, ["四つ星", "警告"]],
        ], "Many users / Others / And because の三つ", [
          ["一つ目・二つ目", "Many users feel that giving a low score is {{unkind}}。Others {{fear}} that a poor rating will be answered with a poor rating。"],
          ["三つ目", "because a score of four stars now {{looks like a warning}}, people who were merely satisfied give five。"],
        ]),
      WS("repair", 3, "第5段落で紹介されている、評価の仕組みを改善する二つの方法を説明せよ。", 80,
        "双方の評価が出そろうまで互いの評価を隠し、仕返しできなくする方法と、点数を単独でつけさせず、利用したほかの売り手と比べさせる方法。", [
          ["双方が出すまで評価を隠し、仕返しを防ぐ", 5, ["隠", "仕返し", "罰"]],
          ["単独でなく、ほかの売り手と比べさせる", 5, ["比べ"]],
        ], "One method / Another の二点", [
          ["一つ目", "keep each side's rating {{hidden until both have been submitted}}, so that neither can punish the other。"],
          ["二つ目", "ask users to {{compare a seller with others}} they have used, rather than to give a score in isolation。"],
        ]),
      C("match", 2, U.chobun, "本文の内容と一致するものを選べ。", [
        "Online customers often pay special attention to the few complaints a seller has received.",
        "The author believes that people have become more honest thanks to the internet.",
        "Most sellers online receive average ratings of around three stars.",
        "Hiding ratings until both sides have submitted them completely solves the problem.",
      ], [
        "正解。第4段落：pay particular attention to the rare complaint。",
        "第1段落 not that people have become more honest と食いちがう。",
        "第3段落：ほとんどの売り手が4.5以上とあり、食いちがう。",
        "第5段落 Such changes help, but they cannot remove the basic difficulty と食いちがう。",
      ], "not that A but that B の A を選ばない", [
        ["根拠", "第4段落：Customers … pay particular attention to {{the rare complaint}}。"],
        ["誤りの確認", "「正直になった」は第1段落で {{not that}} と否定、「完全に解決」は第5段落の {{cannot remove}} と逆。"],
      ]),
    ],
  ),
  reading(
    1,
    "rebuilding",
    "震災後の復興とまちづくりを論じた文章",
    READ_LEAD,
    "Rebuilding More Than Buildings",
    `When an earthquake destroys a town, the first task seems obvious: provide shelter as quickly as possible. Roads must be cleared, water and electricity restored, and families who have lost their homes must be given somewhere to sleep. No one would argue against speed in these early days. Yet the experience of many communities suggests that decisions made in the rush of the first months can shape the life of a town for decades, and that some of them are hard to undo.

Consider temporary housing. After several large disasters, temporary homes were assigned by lottery, a method that seemed fair because it treated every family equally. But older residents who had lived next to the same neighbors for forty years found themselves surrounded by strangers. {{(1) What the lottery could not take into account was that, for many of these people, the neighbors who checked on them each morning mattered as much as the roof over their heads.}} Some fell into isolation, and in the worst cases people died alone in their new rooms without anyone noticing for days. Later, planners began to move whole neighborhoods together, keeping familiar faces close even when this took longer to arrange.

A similar tension appears when towns are rebuilt. Planners with modern ideas often see a disaster as an opportunity: narrow lanes can be replaced by wide roads along which fire engines can pass, and crowded wooden houses by stronger buildings. These improvements may save lives in the next disaster. But residents sometimes return to find that the town they knew has vanished. The small shops where people used to stop and talk have been replaced by a large shopping center, and the lanes where children played have become roads for cars. The town is safer, yet many people feel that something essential has been [ A ].

The lesson that many planners now draw is that a town is not only a collection of buildings but also a web of relationships, and that rebuilding the first without the second is a kind of incomplete recovery. This has led to a growing emphasis on residents' {{(a) participation}}. In some towns, meetings were held in school gyms and temporary halls, where people looked at maps together and argued about where the new market or park should go. Such meetings are slow, and they rarely produce perfect agreement. But residents who have helped to shape a plan are more likely to feel that the new town belongs to them, and more likely to stay in it.

There is no simple formula for balancing speed and participation. A family living in a cold temporary room cannot wait years for discussions to finish, and an elderly person may not live to see a plan that takes a decade to agree on. Still, the experience of past disasters suggests that the question "How fast can we rebuild?" should always be accompanied by another: "What kind of community are we rebuilding, and who decides?"`,
    [
      C("blank-a", 2, U.vocab, "空所［ A ］に入る最も適切な語を選べ。", ["lost", "gained", "repaired", "protected"], [
        "正解。町は安全になったが（yet）、何か本質的なものが失われた、という対比。",
        "gained（得た）では yet の逆接にならない。",
        "repaired（修復された）では、町が消えてしまったという前の内容と合わない。",
        "protected（守られた）では、小さな店や路地がなくなったことと矛盾する。",
      ], "yet の前後は逆の向き", [
        ["前後の流れ", "The town is {{safer}}, {{yet}} many people feel that something essential has been …。"],
        ["語を選ぶ", "店や路地が消えた内容を受けて「失われた」＝ {{lost}}。"],
      ], K),
      C("syn-a", 2, U.vocab, "下線部(a) participation に最も意味が近いものを選べ。", ["taking part", "staying away", "paying money", "moving out"], [
        "正解。participation は「参加」。直後の、住民が地図を囲んで議論した会合の例と合う。",
        "staying away（近づかない）は逆の意味。",
        "paying money（お金を払う）は会合の内容と関係がない。",
        "moving out（引っ越して出ていく）は逆に近い。",
      ], "participate in ＝ take part in", [
        ["文脈", "直後：住民が {{looked at maps together and argued}}＝計画づくりに加わった。"],
        ["語義", "participation＝{{taking part}}（参加）。"],
      ], K),
      WY("tr1", 1, 3, U.kankei, "くじ引きが考慮に入れられなかったのは、こうした人々の多くにとって、毎朝様子を見に来てくれる隣人が、頭の上の屋根と同じくらい大切だったということである。", [
        ["What the lottery could not take into account was that … を「くじ引きが考慮できなかったのは…ということだ」と訳す", 4, ["考慮", "くじ"]],
        ["the neighbors who checked on them each morning を「毎朝様子を見てくれる隣人」と訳す", 3, ["様子", "隣人"]],
        ["mattered as much as the roof over their heads を「屋根と同じくらい大切だった」と訳す", 3, ["同じくらい", "大切"]],
      ], "take A into account は「Aを考慮に入れる」", [
        ["主語", "{{What the lottery could not take into account}}：what 節が主語。"],
        ["比較", "the neighbors … {{mattered as much as}} the roof over their heads：matter＝重要である。"],
      ]),
      WS("lottery", 3, "第2段落で、くじ引きによる仮設住宅の割り当てはなぜ公平に見えたのか、またどのような問題を生んだのかを説明せよ。", 90,
        "すべての家族を平等に扱うので公平に見えたが、長年の隣人と引き離された高齢者が見知らぬ人に囲まれて孤立し、だれにも気づかれず亡くなる例まで生んだ。", [
          ["すべての家族を平等に扱うので公平に見えた", 4, ["平等"]],
          ["長年の隣人と離され、見知らぬ人に囲まれて孤立した", 4, ["孤立", "隣人"]],
          ["だれにも気づかれず亡くなる例もあった", 2, ["亡くな"]],
        ], "理由（because）と結果（Some fell into isolation）", [
          ["公平に見えた理由", "a method that seemed fair {{because it treated every family equally}}。"],
          ["問題", "surrounded by strangers → {{fell into isolation}} → died alone {{without anyone noticing}}。"],
        ]),
      WS("incomplete", 3, "第4段落で筆者のいう a kind of incomplete recovery とは、どのような復興か。説明せよ。", 60,
        "町を建物の集まりとしてだけ再建し、住民どうしの人間関係のつながりを再建しないままにする復興。", [
          ["建物（の集まり）だけを再建する", 5, ["建物"]],
          ["人間関係のつながりを再建しない", 5, ["人間関係", "つながり"]],
        ], "the first / the second が指すもの", [
          ["指示語", "a town is not only {{a collection of buildings}} (the first) but also {{a web of relationships}} (the second)。"],
          ["まとめる", "rebuilding the first {{without the second}}：建物だけ直して関係を直さない。"],
        ]),
      C("match", 2, U.chobun, "本文の内容と一致するものを選べ。", [
        "Planners later began to move entire neighborhoods together into temporary housing.",
        "The author argues that wide roads should never be built after an earthquake.",
        "Meetings held in school gyms usually produced complete agreement quickly.",
        "The author believes families in temporary housing should wait until every discussion is finished.",
      ], [
        "正解。第2段落：Later, planners began to move whole neighborhoods together。",
        "第3段落で広い道路は次の災害で命を救うかもしれないと認めており、never とは言っていない。",
        "第4段落 Such meetings are slow, and they rarely produce perfect agreement と食いちがう。",
        "最終段落 A family … cannot wait years for discussions to finish と食いちがう。",
      ], "never・complete など言いすぎの選択肢に注意", [
        ["根拠", "第2段落：planners began to {{move whole neighborhoods together}}。"],
        ["誤りの確認", "会合は {{slow}} で {{rarely produce perfect agreement}}（第4段落）。"],
      ]),
    ],
  ),
];

// =====================================================================
// 第2問　長文読解（文化・教育の論説）
//   各節6問（空所・同意語・和訳・説明・説明・内容一致）。1回に5問。
// =====================================================================

const P2: ExamPoolSection[] = [
  reading(
    2,
    "restaurant",
    "移民の料理店と食文化を論じた文章",
    READ_LEAD,
    "The Restaurant as a Bridge",
    `In many cities, the first place where long-time residents meet the culture of newcomers is not a school, a museum or a festival, but a small restaurant. A family arrives from abroad, finds that the skills they brought with them are not recognized, and opens a modest kitchen serving the food of home. Neighbors who would never have attended a lecture on another country's history come in out of curiosity, order something they cannot pronounce, and return the following week. {{(1) It is hard to think of another setting in which people with so little in common come into such regular and friendly contact without either side having to make a special effort.}}

The food served in these restaurants, however, is rarely exactly what the cooks ate at home. Ingredients may be unavailable or too expensive, and local customers may find certain flavors too strong. Over time, dishes are adjusted: a spice is reduced, a vegetable is replaced, a sweet sauce is added to please children. Visitors from the cooks' home country sometimes complain that such dishes are not "authentic," and the cooks themselves may feel uneasy about the changes they have made.

But the idea of authenticity deserves a closer look. The cuisine of any country is itself the product of centuries of borrowing. Many of the ingredients now regarded as central to one national cooking or another first arrived from distant continents, often within the last few hundred years. {{(a) In this light}}, the adjustments made by immigrant cooks are not a betrayal of tradition but a continuation of the very process by which traditions were formed in the first place. A dish that changes as it travels is behaving exactly as dishes always have.

This does not mean that every change is welcome. When dishes are simplified only to fit a stereotype of what "foreign food" should taste like, something genuinely valuable may be lost. Some cooks of the second generation, raised in their new country but familiar with their parents' kitchens, have responded by doing two things at once. They serve the dishes their customers expect, but they also add a few that are closer to what their grandparents cooked, explaining on the menu where each one comes from. [ A ], they treat the restaurant not only as a business but also as a place of learning.

What these restaurants show is that culture moves not only through grand institutions but through ordinary daily acts, such as cooking, ordering and eating together. A neighborhood that has learned to enjoy the food of newcomers has not yet understood everything about their lives. Yet it has taken a first step, and that step was taken at a table.`,
    [
      C("blank-a", 2, U.setsuzoku, "空所［ A ］に入る最も適切なものを選べ。", ["In doing so", "Otherwise", "On the contrary", "Even so"], [
        "正解。「祖父母の料理に近い品を加え、由来をメニューで説明する」ことで、店を学びの場としても扱っている、とまとめる。",
        "otherwise（さもなければ）では、前の行動をしない場合の話になってしまう。",
        "on the contrary（それどころか）は前の内容を否定するときに使う。",
        "even so（それでも）は逆接で、前後は対立していない。",
      ], "前の行動をまとめて意味づけるつなぎ", [
        ["前後の関係", "前：メニューで{{由来を説明}}する。後：店を{{学びの場}}としても扱う。"],
        ["選ぶ", "前の行為を受けて「そうすることで」＝ {{In doing so}}。"],
      ], K),
      C("syn-a", 2, U.vocab, "下線部(a) In this light に最も意味が近いものを選べ。", ["Seen from this point of view", "Under bright lamps", "Despite this fact", "For the first time"], [
        "正解。in this light は「この観点から見ると」。直前の「どの国の料理も借用の産物だ」という見方を受けている。",
        "light を文字どおり「明かり」ととった誤り。",
        "despite（〜にもかかわらず）は逆接で、前の内容を根拠にする流れと合わない。",
        "「初めて」は意味が異なる。",
      ], "in the light of ～ ＝ ～を考慮すると", [
        ["前の内容", "The cuisine of any country is itself {{the product of centuries of borrowing}}。"],
        ["語義", "その見方に照らすと＝{{Seen from this point of view}}。"],
      ], K),
      WY("tr1", 1, 3, U.domeishi, "共通点がこれほど少ない人々が、どちらの側も特別な努力をする必要なしに、これほど定期的で友好的な接触をもつ場は、ほかにはなかなか考えられない。", [
        ["It is hard to think of another setting in which … を「…ような場はほかに考えにくい」と訳す", 4, ["ほか", "考え"]],
        ["people with so little in common / such regular and friendly contact を訳す", 3, ["共通点", "友好的"]],
        ["without either side having to make a special effort（動名詞の意味上の主語）を訳す", 3, ["どちら", "努力"]],
      ], "without A doing は「Aが〜することなしに」", [
        ["骨組み", "It is hard to think of another setting {{in which}} S V：前置詞＋関係代名詞。"],
        ["動名詞", "without {{either side}} having to make a special effort：either side が having の意味上の主語。"],
      ]),
      WS("adjust", 3, "第2段落によれば、移民の料理店の料理が故郷の料理と同じでなくなるのはなぜか。説明せよ。", 60,
        "材料が手に入らなかったり高すぎたりすることに加え、地元の客にとってある種の味が強すぎることがあるから。", [
          ["材料が手に入らない・高すぎる", 5, ["材料", "高"]],
          ["地元の客には味が強すぎる", 5, ["強すぎ", "客"]],
        ], "直後の二つの理由（材料・客の好み）", [
          ["一点目", "Ingredients may be {{unavailable or too expensive}}。"],
          ["二点目", "local customers may find certain flavors {{too strong}}。"],
        ]),
      WS("tradition", 3, "第3段落で、筆者が移民の料理人による料理の変更を「伝統への裏切りではない」とするのはなぜか。説明せよ。", 90,
        "どの国の料理もそれ自体が何世紀にもわたる借用の産物であり、旅先で料理を変えることは、伝統がそもそも形づくられた過程そのものを引き継ぐことだから。", [
          ["どの国の料理も借用の産物である", 4, ["借用"]],
          ["多くの食材が遠い大陸から比較的最近伝わった", 2, ["大陸", "食材"]],
          ["変更は伝統が形づくられた過程の継続である", 4, ["過程", "引き継", "継続"]],
        ], "not A but B の B が理由の核", [
          ["根拠1", "The cuisine of any country is itself {{the product of centuries of borrowing}}。"],
          ["根拠2", "{{a continuation of the very process}} by which traditions were formed in the first place。"],
        ]),
      C("match", 2, U.chobun, "本文の内容と一致するものを選べ。", [
        "Some second-generation cooks add dishes closer to their grandparents' cooking and explain where they come from.",
        "The author thinks that every change made to a dish should be welcomed.",
        "Most national cuisines have remained unchanged for thousands of years.",
        "According to the author, neighbors who enjoy immigrant food understand everything about the newcomers' lives.",
      ], [
        "正解。第4段落：add a few that are closer to what their grandparents cooked, explaining on the menu where each one comes from。",
        "第4段落 This does not mean that every change is welcome と食いちがう。",
        "第3段落：料理は何世紀もの借用の産物で、多くの食材はここ数百年で伝わったとある。",
        "最終段落 has not yet understood everything about their lives と食いちがう。",
      ], "every・everything の言いすぎに注意", [
        ["根拠", "第4段落：closer to {{what their grandparents cooked}}, explaining … {{where each one comes from}}。"],
        ["誤りの確認", "第4段落 {{does not mean that every change is welcome}}、最終段落 {{has not yet understood everything}}。"],
      ]),
    ],
  ),
  reading(
    2,
    "work-songs",
    "地域の歌と記憶の継承を論じた文章",
    READ_LEAD,
    "Songs a Village Remembers",
    `On the coast of a northern island lies a fishing village where, until about sixty years ago, the men who pulled the nets sang as they worked. The songs had no written form. Each one set a rhythm for the pulling, and its words, which changed a little from boat to boat, recorded storms, good catches and the names of people who had been lost at sea. When engines replaced human muscle, the songs were no longer needed, and within a generation most of them had fallen silent.

Stories like this are common, and they raise a question that is easy to overlook: what exactly is lost when such songs disappear? The obvious answer is a piece of music. But work songs like these were also a way of storing knowledge. {{(1) A young fisherman who learned the songs learned at the same time which winds were dangerous, which rocks lay hidden below the surface, and whose families had suffered from the sea, so that the songs worked as a kind of history that could be carried in the body.}}

In recent years, several villages of this kind have tried to bring their songs back. The first step is usually to record the few elderly people who still remember them. This is valuable work, since a recording can preserve sounds that would otherwise vanish. Yet those involved have often found that a recording alone does little to keep a song alive. A song stored in an archive is heard mostly by researchers; it is rarely sung. {{(a) Accordingly}}, some villages have asked local schools to teach the songs to children, and once a year the whole community gathers by the harbor to sing them together.

Critics point out that songs sung at a festival are not the same as songs sung in a boat. The children are not pulling nets, and the dangers described in the words are no longer part of their lives. In this sense, the revived songs are something new, a performance of the past rather than the past itself. This is a fair point, but it may [ A ] what singing together can still do. When children sing the names of people lost at sea, they come to know that those people existed, and the village's history becomes something they share rather than something they merely read about.

Perhaps the most important difference between a recording and a living song is that a recording does not change. A living song is altered slightly by each singer, and new verses can be added to it. In one village, children have written a verse about a storm that damaged the harbor a few years ago. The song, in other words, has begun to remember again.`,
    [
      C("blank-a", 2, U.vocab, "空所［ A ］に入る最も適切な語を選べ。", ["underestimate", "explain", "increase", "guarantee"], [
        "正解。批判はもっともだが、いっしょに歌うことが今もなしうることを過小評価しているかもしれない、という譲歩→反論。",
        "explain（説明する）では、批判に対する but の反論にならない。",
        "increase（増やす）は what singing together can still do を目的語にとると意味が通らない。",
        "guarantee（保証する）では批判が歌の力を認めていることになり、but と合わない。",
      ], "This is a fair point, but … は譲歩のあとの反論", [
        ["流れ", "批判を {{a fair point}} と認めたうえで、{{but}} で反論。後ろで歌の力を具体的に述べる。"],
        ["語を選ぶ", "批判は歌の力を見くびっている＝ {{underestimate}}。"],
      ], K),
      C("syn-a", 2, U.setsuzoku, "下線部(a) Accordingly に最も意味が近いものを選べ。", ["For that reason", "In spite of that", "Before long", "By chance"], [
        "正解。accordingly は「それゆえ・それに応じて」。録音だけでは歌われないので、学校で教えるようにした。",
        "in spite of that（それにもかかわらず）は逆接で、前後の因果と合わない。",
        "before long（まもなく）は時間を表す。",
        "by chance（偶然に）は意味が異なる。",
      ], "前の事情を受けて結果を述べる副詞", [
        ["前の内容", "A song stored in an archive is {{rarely sung}}。"],
        ["後の内容", "だから学校で教え、皆で歌う＝因果。{{Accordingly}}＝For that reason。"],
      ], K),
      WY("tr1", 1, 3, U.kankei, "その歌を覚えた若い漁師は、同時に、どの風が危険か、どの岩が水面下に隠れているか、どの家族が海で苦しんできたかを学んだので、歌は体に入れて持ち運ぶことのできる一種の歴史として働いたのである。", [
        ["learned at the same time の目的語となる三つの疑問詞節（which winds / which rocks / whose families）を訳す", 4, ["どの風", "どの岩", "どの家族"]],
        ["so that を結果（〜ので…）として訳す", 3, ["ので"]],
        ["a kind of history that could be carried in the body を訳す", 3, ["体", "歴史"]],
      ], "疑問詞節が三つ並んで learned の目的語", [
        ["目的語", "learned {{which winds were dangerous}}, {{which rocks lay hidden}}, and {{whose families had suffered}}。"],
        ["結果", "{{so that}} the songs worked as a kind of history：コンマのあとの so that は結果。"],
      ]),
      WS("archive", 3, "第3段落で、録音だけでは歌を生かし続けられないとされるのはなぜか。また、それに対して村はどのような取り組みをしたか。説明せよ。", 90,
        "保存庫に収めた録音は主に研究者に聞かれるだけで、歌われることがほとんどないから。そこで学校で子どもに歌を教え、年に一度住民が港に集まって一緒に歌うようにした。", [
          ["録音は研究者が聞くだけで、歌われない", 4, ["研究者", "歌われ"]],
          ["学校で子どもに教える", 3, ["学校", "子ども"]],
          ["年に一度、港に集まって皆で歌う", 3, ["年に一度", "港"]],
        ], "理由と対応を分けて書く", [
          ["理由", "A song stored in an archive is heard {{mostly by researchers}}; it is {{rarely sung}}。"],
          ["対応", "asked local schools to {{teach the songs to children}}, and {{once a year}} … gathers by the harbor to sing。"],
        ]),
      WS("remember", 3, "最終段落の The song, in other words, has begun to remember again とはどういうことか。説明せよ。", 70,
        "歌い手ごとに変わり新しい節も加えられる生きた歌として、数年前の嵐という新しい出来事を再び記録し始めたということ。", [
          ["生きた歌は変わり、新しい節が加えられる", 5, ["変わ", "節"]],
          ["子どもが最近の嵐の節を作り、新しい出来事を記録し始めた", 5, ["嵐", "記録"]],
        ], "in other words は直前の例の言いかえ", [
          ["対比", "a recording {{does not change}} ↔ a living song is altered … and {{new verses can be added}}。"],
          ["例", "children have written a verse about {{a storm}} … a few years ago＝歌がまた出来事を記録する。"],
        ]),
      C("match", 2, U.chobun, "本文の内容と一致するものを選べ。", [
        "The work songs gave the fishermen a rhythm for pulling the nets.",
        "The songs were carefully written down so that their words would never change.",
        "The author rejects the critics' view as completely mistaken.",
        "Most residents now listen to recordings of the songs every day.",
      ], [
        "正解。第1段落：Each one set a rhythm for the pulling。",
        "第1段落 The songs had no written form、言葉は船ごとに少しずつ違ったとある。",
        "第4段落で批判を This is a fair point と認めている。",
        "そのような記述はない。録音は主に研究者が聞くとある（第3段落）。",
      ], "筆者の譲歩（fair point）を見落とさない", [
        ["根拠", "第1段落：Each one {{set a rhythm for the pulling}}。"],
        ["誤りの確認", "{{no written form}}（第1段落）、{{This is a fair point}}（第4段落）。"],
      ]),
    ],
  ),
  reading(
    2,
    "ruins",
    "災害の記憶をどう受け継ぐかを論じた文章",
    READ_LEAD,
    "Keeping the Memory of Disaster",
    `After a great disaster, towns face a painful decision about the buildings it has left damaged. Some residents want every trace removed as soon as possible. For a mother whose child died in a school that collapsed, the sight of the broken walls may bring back the worst day of her life each time she passes. Others argue that at least a few ruined buildings should be kept, so that future generations can see with their own eyes what happened. Both positions are understandable, and in many places the argument has continued for years.

Those who wish to preserve damaged buildings often point out that written records alone are not enough. People may read that a wave reached a certain height, but the number means little until they stand beneath a mark on a wall far above their heads. {{(1) A preserved building speaks in a way that a page cannot, because it allows visitors to measure the disaster against their own bodies rather than merely to imagine it.}} History also offers a warning: in some places, stones carved with messages about past floods were ignored by later generations, who built their houses below the line the stones were meant to mark.

Yet buildings, too, can fail to pass on memory. A ruin without explanation may become merely a strange sight, photographed by tourists and then forgotten. What gives a preserved building its meaning is the stories attached to it, and stories need tellers. In several towns, survivors have become volunteer guides who walk visitors through the damaged sites and describe what they saw and what they did on that day. Many of them say that speaking is painful but that silence would be worse; they fear that if no one speaks, the lessons will {{(a) fade}} along with the people who learned them.

As the generation that experienced the disaster grows old, a new problem appears. Children born afterwards have no memories of their own, and they may hear the guides' stories as something from a distant past. Some schools have responded by asking students not only to listen to the stories but to [ A ] those stories themselves: to interview survivors, write down their accounts and present them to younger children. In doing so, the students become a link in the chain rather than its end.

There is no single right answer to whether a damaged building should stand or fall. But the debates themselves suggest something important. A community that argues seriously about how to remember is a community that has not yet forgotten, and the work of remembering, like the work of rebuilding, must be shared by those who come later.`,
    [
      C("blank-a", 2, U.vocab, "空所［ A ］に入る最も適切なものを選べ。", ["pass on", "look up to", "put off", "turn down"], [
        "正解。話を聞くだけでなく、自分たちで伝える（聞き取り・記録・年下への発表）。後ろのコロン以下と合う。",
        "look up to（尊敬する）は stories を目的語にとるには不自然で、コロン以下の具体とも合わない。",
        "put off（延期する）では意味が通らない。",
        "turn down（断る）は逆の意味になる。",
      ], "not only A but B と、コロン以下の具体", [
        ["前後の流れ", "not only to {{listen to}} the stories but to … those stories themselves：聞く側から{{伝える側}}へ。"],
        ["語を選ぶ", "コロン以下（聞き取る・書く・年下に発表する）＝ {{pass on}}（伝える）。"],
      ], K),
      C("syn-a", 2, U.vocab, "下線部(a) fade に最も意味が近いものを選べ。", ["gradually disappear", "suddenly appear", "become clearer", "be written down"], [
        "正解。fade は「しだいに薄れて消える」。語る人がいなくなると教訓も消えていく、という不安。",
        "「突然現れる」は逆の意味。",
        "「よりはっきりする」は逆の意味。",
        "「書きとめられる」は意味が異なる。",
      ], "fade ＝ 色・音・記憶がしだいに薄れる", [
        ["文脈", "if no one speaks, the lessons will … {{along with the people who learned them}}＝人とともに消える。"],
        ["語義", "fade＝{{gradually disappear}}。"],
      ], K),
      WY("tr1", 1, 3, U.futeishi, "保存された建物は、紙面にはできない仕方で語りかける。というのも、それによって訪れる人は、災害をただ想像するのではなく、自分自身の体と比べて測ることができるからである。", [
        ["speaks in a way that a page cannot を「紙面にはできない仕方で語る」と訳す", 3, ["紙", "語"]],
        ["allows visitors to measure the disaster against their own bodies を訳す", 4, ["体", "測"]],
        ["rather than merely to imagine it を「ただ想像するのではなく」と訳す", 3, ["想像", "ではなく"]],
      ], "a page cannot (speak) の省略を補う", [
        ["省略", "in a way that a page cannot {{(speak)}}：同じ動詞の省略。"],
        ["語法", "allow A {{to measure}} … {{rather than merely to imagine}}：不定詞どうしの対比。"],
      ]),
      WS("records", 3, "第2段落で、文書の記録だけでは不十分だとされるのはなぜか。本文の例に即して説明せよ。", 60,
        "波の高さを数字で読んでも、自分の頭よりはるか上にある壁の印の下に立つまでは、その数字はほとんど意味をもたないから。", [
          ["数字で読んでも実感がない（意味をもたない）", 5, ["数字", "意味", "実感"]],
          ["頭上はるかの壁の印の下に立って初めてわかる", 5, ["壁", "頭"]],
        ], "the number means little until … の構文", [
          ["根拠", "People may read that a wave reached a certain height, but {{the number means little}}。"],
          ["条件", "{{until they stand beneath a mark on a wall far above their heads}}。"],
        ]),
      WS("chain", 3, "第4段落で紹介されている学校の取り組みはどのようなもので、それによって生徒はどうなると筆者は述べているか。説明せよ。", 80,
        "生徒が話を聞くだけでなく、被災者に聞き取りをして記録し年下の子どもに発表する取り組みで、生徒は記憶を受け継ぐ鎖の終わりではなく、その一つの輪になる。", [
          ["聞くだけでなく、聞き取り・記録・年下への発表をする", 5, ["聞き取り", "記録", "発表"]],
          ["鎖の終わりではなく一つの輪（つなぎ手）になる", 5, ["輪", "鎖", "つなぎ"]],
        ], "a link in the chain の比喩を開く", [
          ["取り組み", "to {{interview survivors, write down their accounts and present them to younger children}}。"],
          ["結果", "the students become {{a link in the chain}} rather than its end：受けとるだけでなく伝える側になる。"],
        ]),
      C("match", 2, U.chobun, "本文の内容と一致するものを選べ。", [
        "Some survivors guide visitors around damaged sites and describe what they saw and did.",
        "The author concludes that every damaged building should be preserved.",
        "Messages carved on stones have always been respected by later generations.",
        "Children born after the disaster have strong memories of it.",
      ], [
        "正解。第3段落：survivors have become volunteer guides who walk visitors through the damaged sites and describe what they saw and what they did。",
        "最終段落 There is no single right answer と食いちがう。",
        "第2段落：石の警告が後の世代に無視された例がある、とあり逆。",
        "第4段落 Children born afterwards have no memories of their own と食いちがう。",
      ], "結論部の no single right answer に注意", [
        ["根拠", "第3段落：survivors have become {{volunteer guides}}。"],
        ["誤りの確認", "最終段落 {{no single right answer}}、第2段落 stones … {{were ignored}}。"],
      ]),
    ],
  ),
];

// =====================================================================
// 第3問　会話文（大学の授業での議論）
//   各節6問（空所・発言の意図・和訳・説明・英語でまとめる・内容一致）。1回に5問。
// =====================================================================

const P3: ExamPoolSection[] = [
  reading(
    3,
    "real-names",
    "口コミサイトの実名制をめぐる議論",
    TALK_LEAD,
    "Seminar: Should Reviewers Use Their Real Names?",
    `Professor Hale: Today's question is simple to state but hard to answer. Should review sites require reviewers to use their real names? Mina, you look as if you already have an opinion.
Mina: I do. I think they should. When people can hide behind a nickname, they write things they would never say to someone's face. My aunt runs a small café, and last year someone left a review saying the food had made him ill. She's sure he had never even been there, but she had no way of finding out who he was.
Professor Hale: That must have been hard for her. Daniel?
Daniel: I see the problem, but I'm not convinced real names are the answer. {{(1) If I had to put my name on every review, I'd probably only write the nice ones, because I wouldn't want the owner to recognize me the next time I walked in.}} So we'd end up with even more five-star reviews than we have now.
Mina: Hmm, I hadn't thought of that.
Sofia: And there's another side to it. For some people, staying anonymous is a kind of protection. Imagine a patient writing about a clinic that treated her badly. She might have very good reasons not to want her name connected with her health problems.
Professor Hale: So, if I understand you both, the worry is that real names would silence exactly the reviews we most need, the honest negative ones.
Daniel: [ A ] Though I'd still like to do something about fake reviews like the one Mina's aunt got.
Sofia: Maybe the site doesn't need to know a reviewer's name, only that they really bought something. Some sites already show a mark next to reviews from people who can show a receipt.
Mina: That would have helped my aunt. Whoever wrote that review couldn't have shown a receipt. But it wouldn't stop a real customer from being unfair.
Professor Hale: True. No system can force people to be fair. Perhaps what we're really discussing is what kind of responsibility a reviewer should carry. Mina wants it to be personal and public; Sofia and Daniel want it to be checked, but privately.
Sofia: I'd put it a little differently. I don't think reviewers should be invisible. I just think the people who need to know who they are, like the site, aren't the same as the people who read the reviews.
Professor Hale: That's a useful distinction. For next week, I'd like each of you to find one review site and describe how it handles this problem. Then we can see which approach works better in practice.`,
    [
      C("blank-a", 2, U.vocab, "空所［ A ］に入る最も適切なものを選べ。", ["That's exactly it.", "I couldn't care less.", "You've lost me.", "Not in the slightest."], [
        "正解。教授のまとめに「まさにそのとおり」と同意し、Though で一点だけ付け加えている。",
        "「まったくどうでもいい」では議論への関心がないことになり、後ろの発言と合わない。",
        "「話がわからなくなった」では、直後に要点をふまえた発言ができない。",
        "「少しもそうではない」は強い否定で、Daniel 自身の先の主張と食いちがう。",
      ], "同意→Though で補足、の流れ", [
        ["前の発言", "教授は Daniel と Sofia の主張を{{正しくまとめて}}いる。"],
        ["後ろ", "{{Though}} I'd still like to …：同意したうえでの付け足し。よって「まさにそれです」。"],
      ], K),
      C("intent", 2, U.chobun, "Mina の発言 Hmm, I hadn't thought of that. の意図として最も適切なものを選べ。", [
        "She admits that Daniel has raised a point she had not considered.",
        "She thinks that Daniel's example is untrue.",
        "She wants the class to change the topic.",
        "She did not hear what Daniel said.",
      ], [
        "正解。実名だと好意的な口コミばかりになる、という Daniel の指摘を、考えていなかった点として認めている。",
        "疑う言葉ではない。後の発言でも Daniel の指摘を否定していない。",
        "話題を変える表現ではなく、直後も同じ話題が続く。",
        "聞こえなかったなら that（Daniel の指摘）を受けた言い方にならない。",
      ], "I hadn't thought of that ＝ 相手の指摘を認める", [
        ["直前", "Daniel：実名だと{{好意的な口コミしか書かなくなる}}→五つ星がさらにふえる。"],
        ["意図", "that＝Daniel の指摘。「それは考えていなかった」＝{{新しい論点として認める}}。"],
      ]),
      WY("tr1", 1, 3, U.kateiho, "もしすべての口コミに自分の名前を出さなければならないとしたら、私はたぶん好意的なものしか書かないだろう。次に店に入ったとき、店主に自分だと気づかれたくないからだ。", [
        ["If I had to …, I'd … を仮定法（〜としたら…だろう）として訳す", 4, ["としたら", "だろう"]],
        ["only write the nice ones を「好意的なものしか書かない」と訳す", 3, ["しか"]],
        ["I wouldn't want the owner to recognize me the next time I walked in を訳す", 3, ["気づ", "次に"]],
      ], "仮定法過去：If S 過去形, S would 原形", [
        ["仮定", "{{If I had to}} put my name …, {{I'd}} (= I would) probably only write …。"],
        ["語法", "want A {{to recognize}} me（Aに気づいてほしい）の否定。{{the next time}} S V＝次に〜するとき。"],
      ]),
      WS("receipt", 3, "Sofia が提案した方法とはどのようなものか。また、それに対して Mina はどのように評価しているか。説明せよ。", 90,
        "サイトが投稿者の名前ではなく実際に購入したことだけを確かめ、領収書のある口コミに印をつける方法。叔母が受けたような偽の口コミは防げるが、実際の客の不公平な口コミは防げないと評価した。", [
          ["名前ではなく購入の事実だけを確かめる（領収書のある口コミに印）", 4, ["購入", "領収書"]],
          ["偽の口コミ（叔母の例）は防げる", 3, ["偽", "叔母"]],
          ["実際の客の不公平さは防げない", 3, ["不公平", "実際の客"]],
        ], "Mina の評価は肯定と限界の二面", [
          ["提案", "the site doesn't need to know a reviewer's name, {{only that they really bought something}}。"],
          ["評価", "{{That would have helped my aunt}} … {{But it wouldn't stop a real customer from being unfair}}。"],
        ]),
      WE("summary", "Daniel と Sofia が実名制に反対する理由を、それぞれ本文に即して英語でまとめよ。",
        "Daniel thinks that reviewers who had to use their real names would only write positive reviews, because they would not want owners to recognize them. Sofia adds that anonymity protects people, such as patients, who have good reasons to keep their identity private.",
        weRubric(["Daniel", "positive", "recognize", "Sofia", "protect", "private"]), "二人の理由を一つずつ、主語を立てて書く", [
          ["Daniel", "実名だと{{好意的な口コミしか書かない}}（店主に気づかれたくない）。"],
          ["Sofia", "匿名は{{保護}}になる（患者が健康の問題と名前を結びつけたくない）。{{adds that}} でつなぐ。"],
        ]),
      C("match", 2, U.chobun, "本文の内容と一致するものを選べ。", [
        "Sofia believes that the site and the readers of reviews do not need the same information about a reviewer.",
        "Mina's aunt eventually found out who had written the false review.",
        "The professor concludes that real names should be required.",
        "Daniel thinks that fake reviews are not a serious problem.",
      ], [
        "正解。Sofia の最後の発言：the people who need to know who they are, like the site, aren't the same as the people who read the reviews。",
        "Mina：she had no way of finding out who he was と食いちがう。",
        "教授は結論を出さず、次週の課題を出している。",
        "Daniel は I'd still like to do something about fake reviews と述べている。",
      ], "教員が結論を出したかどうかに注意", [
        ["根拠", "Sofia：the site と {{the people who read the reviews}} は同じではない。"],
        ["誤りの確認", "教授は {{For next week}} と課題を出すだけ。Daniel は偽の口コミに{{対処したい}}。"],
      ]),
    ],
  ),
  reading(
    3,
    "authentic-label",
    "外国料理の「本場」認定をめぐる議論",
    TALK_LEAD,
    "Seminar: Labeling Food as \"Authentic\"",
    `Professor Ortiz: Last week we read about a city council that wants to give an "authentic" label to restaurants that cook foreign dishes in the traditional way. What did you make of the idea?
Leila: Honestly, I found it a bit strange. My grandparents came here from abroad and opened a restaurant. They changed their recipes many times because some ingredients were impossible to get here. Does that mean their food is fake?
Kenji: I don't think anyone would call it fake. But I can understand why the council likes the idea. When I travel, I want to eat what local people really eat, not something made for tourists. A label would help visitors like me.
Tom: The trouble is, who decides what "the traditional way" is? Recipes differ from region to region, even from family to family. {{(1) Any committee that tried to define the authentic version of a dish would have to pick one family's cooking and treat everyone else's as a mistake.}}
Professor Ortiz: That's a serious objection. Kenji, how would you answer it?
Kenji: Well, [ A ] Maybe the label wouldn't need to define one correct recipe. It could just say that the restaurant uses certain ingredients or methods from the region, and leave the rest to the cook.
Leila: But even that could hurt places like my grandparents'. Customers might start to think that a restaurant without a label is somehow second-rate, even if the food is wonderful.
Professor Ortiz: So the label might not only describe restaurants but also change how customers judge them.
Leila: Exactly. And the restaurants that can't afford to import expensive ingredients are usually the small family ones.
Tom: Couldn't the restaurants tell their own stories instead? Leila, your grandparents' menu could explain why a dish changed. I'd find that more interesting than a label.
Kenji: I like that, actually. It still tells me what I want to know, where the food comes from, but it doesn't divide restaurants into real and fake.
Professor Ortiz: Interesting. So we've moved from asking whether food is authentic to asking how it's described. For next time, let's consider whether a council has any role to play at all, or whether this is something best left to the restaurants themselves.`,
    [
      C("blank-a", 2, U.vocab, "空所［ A ］に入る最も適切なものを選べ。", ["that's a fair point.", "I've never heard of it.", "it's none of your business.", "let's not go there."], [
        "正解。Tom の反論を「もっともだ」と認めたうえで、Maybe 以下で案を修正している。",
        "「聞いたことがない」では、直前の Tom の反論を受けた答えにならない。",
        "「あなたには関係ない」は失礼で、議論の場にふさわしくない。",
        "「その話はやめよう」では、直後に反論に答えて案を修正する流れと合わない。",
      ], "反論を認めて案を修正する前置き", [
        ["前", "教授：Tom の {{serious objection}} にどう答えるか。"],
        ["後", "Maybe the label {{wouldn't need to define one correct recipe}}：反論を受け入れて修正。"],
      ], K),
      C("intent", 2, U.chobun, "教員の発言 So the label might not only describe restaurants but also change how customers judge them. の意図として最も適切なものを選べ。", [
        "He restates Leila's concern in more general terms.",
        "He disagrees with Leila and supports the council's plan.",
        "He asks Leila to give a different example.",
        "He changes the topic to the price of ingredients.",
      ], [
        "正解。「ラベルのない店が二流と思われる」という Leila の懸念を、ラベルが客の判断を変える、という一般的な形で言いかえている。Leila も Exactly と答えている。",
        "So で始めて相手の発言をまとめており、反対ではない。",
        "例を求める疑問文ではない。",
        "食材の値段の話を出したのは、この後の Leila である。",
      ], "So, … は相手の発言のまとめ", [
        ["直前", "Leila：ラベルがないと {{second-rate}} だと思われるかもしれない。"],
        ["意図", "教授はそれを {{change how customers judge them}} と一般化。Leila の {{Exactly}} が確認。"],
      ]),
      WY("tr1", 1, 3, U.kateiho, "ある料理の本場の型を定めようとする委員会は、どんなものであれ、一つの家族の料理を選び、ほかのすべての人の料理を誤りとして扱わなければならなくなるだろう。", [
        ["Any committee that tried to … would have to … の仮定の意味を訳す", 4, ["委員会", "だろう"]],
        ["define the authentic version of a dish を「料理の本場の型を定める」と訳す", 3, ["本場", "定め"]],
        ["pick one family's cooking and treat everyone else's as a mistake を訳す", 3, ["誤り", "ほか"]],
      ], "主語に仮定の意味をこめた would", [
        ["仮定", "Any committee {{that tried to}} …：過去形 tried と would で「〜しようとする委員会があれば」。"],
        ["語法", "treat A {{as}} B（AをBとして扱う）。everyone else's = everyone else's {{cooking}}。"],
      ]),
      WS("leila", 3, "Leila が、特定の食材や調理法を示すだけのラベルにも反対するのはなぜか。説明せよ。", 80,
        "ラベルのない店は料理がすばらしくても二流だと客に思われるおそれがあり、高価な食材を輸入できない小さな家族経営の店が不利になるから。", [
          ["ラベルのない店が二流だと思われる", 5, ["二流", "ラベル"]],
          ["高価な食材を輸入できない小さな家族の店が不利になる", 5, ["輸入", "家族"]],
        ], "But even that … と And … の二つの発言をまとめる", [
          ["一点目", "a restaurant without a label is {{somehow second-rate}}, even if the food is wonderful。"],
          ["二点目", "the restaurants that {{can't afford to import expensive ingredients}} are usually the small family ones。"],
        ]),
      WE("summary", "Tom がラベルの代わりに提案したことと、Kenji がそれを支持する理由を英語でまとめよ。",
        "Tom suggests that restaurants should tell their own stories, for example by explaining on the menu why a dish has changed. Kenji supports this because it still shows him where the food comes from without dividing restaurants into real and fake ones.",
        weRubric(["Tom", "stories", "menu", "Kenji", "comes from", "fake"]), "提案と支持の理由を because でつなぐ", [
          ["Tom", "店が{{自分たちの物語}}を伝える（メニューで料理が変わった理由を説明）。"],
          ["Kenji", "{{どこの料理か}}はわかるのに、{{本物と偽物に分けない}}から。"],
        ]),
      C("match", 2, U.chobun, "本文の内容と一致するものを選べ。", [
        "Leila's grandparents changed their recipes because some ingredients could not be obtained.",
        "Kenji believes that food cooked by immigrants is fake.",
        "Tom wants a committee to decide the correct recipe for each dish.",
        "The professor says that the council should make the final decision.",
      ], [
        "正解。Leila：They changed their recipes many times because some ingredients were impossible to get here。",
        "Kenji：I don't think anyone would call it fake と食いちがう。",
        "Tom は委員会が一つの型を決めることに反対している。",
        "教授は、議会に役割があるかどうかを次回考えようと言っている。",
      ], "賛成・反対の向きを人物ごとに確かめる", [
        ["根拠", "Leila：because some ingredients were {{impossible to get here}}。"],
        ["誤りの確認", "Tom は委員会に{{反対}}、教授は {{whether a council has any role}} を次回の問いにしている。"],
      ]),
    ],
  ),
  reading(
    3,
    "higher-ground",
    "津波の後の高台移転をめぐる議論",
    TALK_LEAD,
    "Seminar: Moving a Town to Higher Ground",
    `Professor Wren: Today we're looking at the case of a fishing town that lost most of its homes in a tsunami. The plan is to move the whole residential area to a hill about two kilometers inland. Haruto, you've been reading the residents' comments. What do they say?
Haruto: They're divided. Younger families with children mostly support the move. They say they couldn't sleep at night if they lived near the sea again. But many of the fishermen want to stay close to the harbor. For them, walking up and down the hill every day before dawn would be a real burden.
Grace: I'm sorry, but isn't safety the most important thing here? If another tsunami comes, the people near the harbor could die. I don't see how convenience can outweigh that.
Omar: I don't think it's just convenience, though. {{(1) A fisherman who cannot see the sea from his window loses more than a view; he loses the habit of reading the weather each morning, which is part of how he keeps himself safe at work.}}
Grace: Hmm. [ A ] I was thinking of safety only in terms of where people sleep.
Professor Wren: That's an important point. Safety has more than one dimension. Are there any compromises in the comments, Haruto?
Haruto: Some people have suggested building homes on the hill but keeping workshops and storage sheds by the harbor, with a strong building nearby that people could run to if a warning sounded.
Omar: That might work for the fishermen. But what about the shops? If everyone lives on the hill, the old shopping street near the harbor will probably die.
Grace: Couldn't new shops open on the hill?
Omar: They could, but the old ones were run by families who'd been there for generations. Starting again somewhere else isn't easy at their age.
Professor Wren: So we have three groups with different needs: families worried about the next tsunami, fishermen whose work ties them to the sea, and shopkeepers whose living depends on a particular street. Is there a single plan that satisfies all three?
Haruto: Probably not completely. But the town might at least make sure all three groups are present when the plan is decided, rather than just presenting them with the result.
Professor Wren: That's where I'd like to start next time. I'll bring the record of the first public meeting, and we'll see who actually spoke there.`,
    [
      C("blank-a", 2, U.vocab, "空所［ A ］に入る最も適切なものを選べ。", ["I hadn't looked at it that way.", "That's beside the point.", "Don't mention it.", "It's up to you."], [
        "正解。Omar の指摘を受けて「そういう見方はしていなかった」と認め、続けて自分の考えの狭さを述べている。",
        "「それは本題から外れている」では、直後に自分の見方の狭さを認める発言と合わない。",
        "お礼に対する返事で、文脈に合わない。",
        "「あなたしだい」は判断を相手にゆだねる表現で、合わない。",
      ], "直後の発言（安全の見方の狭さ）が手がかり", [
        ["直前", "Omar：海が見えないと{{天気を読む習慣}}を失う＝仕事中の安全の一部。"],
        ["直後", "I was thinking of safety {{only in terms of where people sleep}}：自分の見方が狭かったと認める。"],
      ], K),
      C("intent", 2, U.chobun, "Grace の発言 I'm sorry, but isn't safety the most important thing here? の意図として最も適切なものを選べ。", [
        "She politely challenges the fishermen's wish to stay, arguing that safety should come first.",
        "She apologizes for not having read the residents' comments.",
        "She agrees that the fishermen should stay near the harbor.",
        "She asks Haruto to repeat what he has just said.",
      ], [
        "正解。I'm sorry, but … は丁寧に反論する前置き。安全こそ最優先だと主張している。",
        "I'm sorry は謝罪ではなく、反対意見の前置き。",
        "直後に convenience can outweigh that（便利さが安全にまさるとは思えない）と反対している。",
        "聞き返しではなく、修辞的な疑問文で自分の主張を述べている。",
      ], "I'm sorry, but … ＝ 丁寧な反論の前置き", [
        ["形", "{{I'm sorry, but}} isn't …?：否定疑問で「…ではないか」と主張する。"],
        ["中身", "I don't see how {{convenience can outweigh that}}：漁師の希望は便利さの問題だ、という反論。"],
      ]),
      WY("tr1", 1, 3, U.kankei, "窓から海が見えない漁師が失うのは景色だけではない。毎朝天気を読む習慣を失うのであり、それは仕事中に彼が自分の身の安全を守るやり方の一部なのである。", [
        ["loses more than a view を「景色以上のもの（景色だけではない）を失う」と訳す", 3, ["景色"]],
        ["the habit of reading the weather each morning を訳す", 3, ["習慣", "天気"]],
        ["which is part of how he keeps himself safe at work（非制限用法の関係詞）を訳す", 4, ["一部", "安全"]],
      ], ", which は前の内容を補足説明する", [
        ["前半", "loses {{more than a view}}：「景色以上のもの＝景色だけではないもの」を失う。"],
        ["後半", "the habit …, {{which is part of how he keeps himself safe}}：how 節＝「身を守るやり方」。"],
      ]),
      WS("compromise", 3, "住民の意見の中で出された妥協案とはどのようなものか。また、それに対して Omar はどのような懸念を示しているか。説明せよ。", 90,
        "住まいは高台に建て、作業場や倉庫は港のそばに残し、警報のとき逃げこめる頑丈な建物を近くに置く案。漁師には合うが、皆が高台に住むと港近くの古い商店街がすたれると懸念した。", [
          ["住まいは高台、作業場・倉庫は港のそば", 4, ["高台", "作業場", "倉庫"]],
          ["近くに逃げこめる頑丈な建物を置く", 2, ["頑丈", "逃げ"]],
          ["港近くの古い商店街がすたれる懸念", 4, ["商店街", "すたれ"]],
        ], "Haruto の案と Omar の懸念を分ける", [
          ["妥協案", "building homes {{on the hill}} but keeping workshops and storage sheds {{by the harbor}}, with {{a strong building nearby}}。"],
          ["懸念", "the old shopping street near the harbor will {{probably die}}。"],
        ]),
      WE("summary", "議論の最後に Haruto は町が何をすべきだと提案しているか。その理由も含めて英語でまとめよ。",
        "Haruto admits that no single plan can completely satisfy the families, the fishermen and the shopkeepers. Therefore, he suggests that the town should at least include all three groups when the plan is decided, instead of simply presenting them with the final result.",
        weRubric(["no single plan", "satisfy", "three groups", "decided", "result"]), "理由（完全に満たす案はない）→提案の順に", [
          ["理由", "教授の問いに {{Probably not completely}}：三者すべてを満たす案はない。"],
          ["提案", "{{make sure all three groups are present}} when the plan is decided, rather than just presenting the result。"],
        ]),
      C("match", 2, U.chobun, "本文の内容と一致するものを選べ。", [
        "Many fishermen do not want to walk up and down the hill before dawn every day.",
        "Younger families mostly want to live near the sea again.",
        "Grace finally concludes that safety is not important.",
        "The professor says that one plan can satisfy all three groups.",
      ], [
        "正解。Haruto：For them, walking up and down the hill every day before dawn would be a real burden。",
        "若い家族は移転に賛成で、海の近くでは眠れないと言っている。",
        "Grace は安全の見方が狭かったと認めただけで、安全が重要でないとは言っていない。",
        "教授は Is there a single plan that satisfies all three? と問いかけただけである。",
      ], "考えを改めた範囲を言いすぎない", [
        ["根拠", "Haruto：walking up and down the hill {{before dawn}} would be {{a real burden}}。"],
        ["誤りの確認", "Grace は安全を{{狭くとらえていた}}と認めただけ。教授の発言は{{疑問文}}。"],
      ]),
    ],
  ),
];

// =====================================================================
// 第4問　自由英作文（短い説明 30〜40語と意見 60〜80語の2問）
// =====================================================================

const ES_LEAD = "次の文を読み、問いに英語で答えよ。";
const esShort = (content: string[]): Rb => [
  ["問いに合った内容を具体的に書いている", 4, content],
  ["文法・語法・つづりの誤りが少ない", 4, []],
  ["語数の条件を守り、自然な英語になっている", 2, []],
];
const esLong = (content: string[], logic: string[]): Rb => [
  ["立場が明確で、問いに合った内容になっている", 5, content],
  ["理由・具体例が論理的につながっている", 4, logic],
  ["文法・語法・つづりの誤りが少ない", 4, []],
  ["語数の条件を守り、自然な英語になっている", 2, []],
];
const ESS = (id: string, prompt: string, model: string, rb: Rb, point: string, st: St[]): QuestionB =>
  W(id, 2, U.jiyu, `${prompt}（30〜40語）`, model, rb, point, st, { min: 30, max: 40, unit: "語" }, 600);
const ESL = (id: string, prompt: string, model: string, rb: Rb, point: string, st: St[]): QuestionB =>
  W(id, 3, U.jiyu, `${prompt}（60〜80語）`, model, rb, point, st, { min: 60, max: 80, unit: "語" }, 1080);

function wsec(id: string, title: string, material: { lang: "ja" | "en"; body: string }, questions: QuestionB[]): ExamPoolSection {
  return {
    unit: U.jiyu,
    tag: "kobe-eigo:4",
    section: {
      id: `kobe-en-${id}`,
      title,
      lead: ES_LEAD,
      style: "writing",
      examOnly: true,
      material: [{ kind: "passage", ...material }],
      questions,
    },
  };
}

const P4: ExamPoolSection[] = [
  wsec("es-reviews", "自由英作文（インターネットの口コミ）", {
    lang: "ja",
    body: "インターネット上の口コミ（レビュー）は、店や商品を選ぶときに広く参考にされている。一方で、口コミの中には事実と異なるものや、極端にかたよったものも含まれている。",
  }, [
    ESS("q1", "口コミが信頼できるかどうかを判断するために、あなたならどのような点に注意するか。一つ挙げて英語で述べよ。",
      `I would check whether a review gives specific details, such as what the writer ordered and when they visited. A review that only says "terrible" or "perfect" without giving any reasons is less likely to be reliable.`,
      esShort(["specific", "details", "reliable"]), "注意する点を一つにしぼり、具体的に", [
        ["構成", "① 注意する点（{{I would check whether}} …）② なぜそれで判断できるか。"],
        ["語数", "30〜40語なら二文で足りる。{{such as}} で具体を添える。"],
      ]),
    ESL("q2", "店や商品を選ぶとき、あなたはインターネットの口コミと、家族や友人の意見のどちらを重視するか。理由を含めて英語で述べよ。",
      `I value the opinions of my family and friends more than online reviews. First, I know the people who give me advice, so I can understand why they like or dislike something. For example, my sister and I have similar tastes in food, so her recommendations are usually right for me. In contrast, I know nothing about the people who write online reviews, and some reviews may even be fake. Therefore, I trust the people I know.`,
      esLong(["family", "friends", "online reviews"], ["First", "For example", "In contrast", "Therefore"]), "立場→理由→具体例→対比→結論", [
        ["立場", "冒頭で {{I value A more than B}} と立場をはっきり示す。"],
        ["展開", "理由（{{知っている人だから判断の背景がわかる}}）→ {{For example}} → {{In contrast}} で口コミの弱点。"],
      ]),
  ]),
  wsec("es-disaster", "自由英作文（災害の記憶を伝える）", {
    lang: "ja",
    body: "大きな災害から年月がたつにつれて、その経験を直接知らない世代がふえていく。災害の経験をどのように次の世代へ伝えていくかは、多くの地域にとって大きな課題となっている。",
  }, [
    ESS("q1", "災害の経験を若い世代に伝えることが大切だと考える理由を一つ、英語で述べよ。",
      `It is important because people who know what happened in a past disaster are more likely to act quickly when the next one comes. For example, they will know how high water can rise and where to escape.`,
      esShort(["important", "next", "escape"]), "理由を一つ、具体例で支える", [
        ["構成", "① 理由（{{It is important because}} …）② {{For example}} で一例。"],
        ["注意", "「大切だ」と繰り返すだけにせず、{{伝えると何ができるようになるか}}を書く。"],
      ]),
    ESL("q2", "災害の記憶を若い世代に伝えるために、学校や地域でどのような取り組みをするとよいと考えるか。具体例を挙げて英語で述べよ。",
      `I think schools should ask students to interview people who experienced a disaster in their area. Listening to someone face to face is much more powerful than reading a textbook, because students can ask questions and hear real feelings. After the interviews, the students could make short videos or posters and show them at a local event. In this way, young people would not only learn about the disaster but also help pass on its lessons to others.`,
      esLong(["interview", "students", "disaster"], ["because", "After", "In this way"]), "取り組み→効果の理由→発展→まとめ", [
        ["提案", "取り組みを一つ具体的に（{{interview people who experienced a disaster}}）。"],
        ["理由と発展", "なぜ効果的か（{{because}}）、さらに{{発表して伝える側に}}なる、でまとめる。"],
      ]),
  ]),
  wsec("es-food", "自由英作文（外国の料理と日本）", {
    lang: "ja",
    body: "外国の料理が日本で広まるとき、日本の人々の好みに合わせて、味や材料が変えられることが多い。同じように、日本の料理も海外では現地の人々の好みに合わせて変えられている。",
  }, [
    ESS("q1", "外国から来た友人に紹介したい日本の家庭料理を一つ挙げ、その理由を英語で述べよ。",
      `I would like to introduce miso soup to my friend. It is eaten in most Japanese homes almost every day, and each family uses different ingredients, so it shows how ordinary Japanese people really live and eat.`,
      esShort(["introduce", "every day", "family"]), "料理名＋理由を一つ", [
        ["構成", "① {{I would like to introduce}} A ② 理由（毎日の家庭の食事・家ごとの違い）。"],
        ["注意", "料理名は英語で説明しにくければ短く補う（{{a soup made from}} … など）。"],
      ]),
    ESL("q2", "外国の料理は、本来の味をできるだけ守るべきか、それとも訪れた国の人々の好みに合わせて変えてよいか。あなたの考えを理由とともに英語で述べよ。",
      `I believe it is acceptable to change foreign dishes to suit local tastes. If a dish is too spicy or uses ingredients that are hard to find, few people will try it, and it will not spread. Changing it a little allows more people to enjoy it. In fact, many dishes that we now think of as Japanese, such as ramen, were adapted from foreign food. However, restaurants should explain how their dishes differ from the original.`,
      esLong(["acceptable", "change", "local tastes"], ["If", "In fact", "However"]), "立場→理由→具体例→留保", [
        ["立場と理由", "{{I believe it is acceptable to}} …。変えないと{{広まらない}}、を理由に。"],
        ["深める", "{{In fact}} で身近な例（ラーメン）、{{However}} で条件を添えると説得力が増す。"],
      ]),
  ]),
  wsec("es-music", "自由英作文（学校の音楽の授業）", {
    lang: "en",
    body: "In some schools, the number of music classes has been reduced in order to make more time for subjects such as mathematics and English. Some people say this is a sensible change, while others argue that music is too important to cut.",
  }, [
    ESS("q1", "あなたにとって思い出に残っている曲や音楽の経験を一つ挙げ、それがなぜ印象に残っているのかを英語で述べよ。",
      `I clearly remember a song my class sang together at our junior high school chorus contest. We practiced it every day after school for a month, so whenever I hear it now, I remember my classmates' faces.`,
      esShort(["song", "remember", "practiced"]), "経験を一つ、なぜ残っているかを具体的に", [
        ["構成", "① どの曲・経験か ② なぜ印象に残るか（{{練習の日々}}・{{仲間}}など）。"],
        ["表現", "「〜を聞くたびに」＝ {{whenever I hear it}}。"],
      ]),
    ESL("q2", "上の英文について、音楽の授業を減らすことに賛成か反対か、あなたの考えを理由とともに英語で述べよ。",
      `I disagree with reducing music classes. It is true that mathematics and English are important for entrance exams and future jobs. However, music classes give students a rare chance to create something together. When a class practices a song for a chorus contest, students must listen to one another and cooperate, which is a skill that is valuable in any job. Moreover, music helps many students relax during a busy school day.`,
      esLong(["disagree", "music classes"], ["It is true that", "However", "Moreover"]), "譲歩→反論→理由二つ", [
        ["譲歩", "{{It is true that}} 数学や英語も大切だ、と相手の立場を認める。"],
        ["理由", "{{However}} で一つ目（協力する力）、{{Moreover}} で二つ目（気分転換）。"],
      ]),
  ]),
];

// =====================================================================

export const U_KOBE_EIGO: UnivExam = {
  key: "kobe-eigo",
  univ: "神戸大学",
  kamoku: "英語",
  tier: "国公立",
  order: 118,
  basis: "前期日程の個別学力検査（学部共通の英語）の傾向を参考",
  format: "大問4題・80分。論説の長文2題と授業での討論の会話文1題は和訳・字数つき説明が中心で、最後に自由英作文。",
  minutes: 80,
  groups: ["語彙", "文法", "技能"],
  sections: [
    { title: "第1問　長文読解（科学・社会の論説）", lead: READ_LEAD, count: [5, 5], mix: [0, 0.4, 0.6], points: 35, prefer: "material", poolTag: "kobe-eigo:1" },
    { title: "第2問　長文読解（文化・教育の論説）", lead: READ_LEAD, count: [5, 5], mix: [0, 0.4, 0.6], points: 35, prefer: "material", poolTag: "kobe-eigo:2" },
    { title: "第3問　会話文（授業での議論）", lead: TALK_LEAD, count: [5, 5], mix: [0, 0.4, 0.6], points: 30, prefer: "material", poolTag: "kobe-eigo:3" },
    { title: "第4問　自由英作文", lead: ES_LEAD, count: [2, 2], mix: [0, 0.5, 0.5], points: 25, prefer: "material", poolTag: "kobe-eigo:4" },
  ],
  pool: [...P1, ...P2, ...P3, ...P4],
};
