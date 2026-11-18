import type { UnivExam } from "./types";
import type { ExamPoolSection } from "../pool/types";
import type { QuestionB, Skill, SolutionStep } from "@/lib/moshi/types";

// 大阪大学型 英語（国公立・2次試験）。文学部の個別学力検査の傾向を参考にした形式（英文・和文・設問はすべて書き下ろし）。
//   105分・150点・大問4題。I 英文和訳（下線部）、II 長文総合読解（空所・語の意味・下線部和訳・内容説明（日本語）・内容一致）、
//   III 自由英作文（70語程度）、IV 和文英訳（文学部向けの随筆調の日本文）。
//   英文の題材・登場する町や人物はすべて架空。実在の人物の発言は使っていない。
// 参考:
//   https://jyuke-labo.com/daigakujyukentaisaku/osakadaigaku/eigo/ （大問4題：英文和訳・長文読解・自由英作文70語程度・和文英訳。文学部は105分で和文英訳の一部が独自）
//   https://jyuke-labo.com/daigakujyukentaisaku/osakadaigaku/bungakubu/ （文学部の個別学力検査：外国語150点・105分）
//   https://www.osaka-u.ac.jp/ja/admissions/faculty/general/files/UOsaka_youkou2026.pdf/@@download/file （一般選抜 学生募集要項）

const U = {
  chobun: "h-eng-skill-chobun",
  wabun: "h-eng-skill-wabun",
  jiyu: "h-eng-skill-jiyu",
  vocab: "h-eng-vocab-2000",
  jukugo: "h-eng-vocab-jukugo",
  setsuzoku: "h-eng-gram-setsuzokushi",
  kandai: "h-eng-gram-kandai",
  zenchishi: "h-eng-gram-zenchishi",
  meishi: "h-eng-gram-meishi",
  bunshi: "h-eng-gram-bunshikobun",
  tokushu: "h-eng-gram-tokushu",
  hikaku: "h-eng-gram-hikaku",
} as const;

type St = [string, string];
type Rub = [string, number, string[]][];
const steps = (s: St[]): SolutionStep[] => s.map(([title, body]) => ({ title, body }));
const K: Skill = "知識・技能";
const S: Skill = "思考・判断・表現";

/** 4択 */
function C(id: string, difficulty: 1 | 2 | 3, unit: string, prompt: string, options: string[], correct: number, why: string[], point: string, st: St[], skill: Skill = S): QuestionB {
  return { id, type: "B", difficulty, points: 5, seconds: 60 + 30 * difficulty, skill, unit, prompt, answer: { kind: "choice", options, correct, why }, point, steps: steps(st) };
}

/** 記述 (和訳・内容説明・英訳・英作文) */
function Wr(id: string, difficulty: 1 | 2 | 3, unit: string, prompt: string, limit: { min?: number; max?: number; unit: "語" | "字" } | undefined, model: string, rubric: Rub, point: string, st: St[], seconds: number, also?: string[]): QuestionB {
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
    answer: {
      kind: "written",
      ...(limit ? { limit } : {}),
      model,
      rubric: rubric.map(([label, p, keywords]) => ({ label, points: p, keywords })),
      ...(also ? { alsoModels: also } : {}),
    },
    point,
    steps: steps(st),
  };
}

function sec(tag: number, id: string, unit: string, title: string, lead: string, material: { lang: "ja" | "en"; title?: string; body: string; notes?: { word: string; meaning: string }[] } | null, questions: QuestionB[], pick: number, style: "reading" | "writing"): ExamPoolSection {
  return {
    unit,
    tag: `handai-eigo:${tag}`,
    section: {
      id: `handai-en-${id}`,
      title,
      lead,
      style,
      examOnly: true,
      ...(material ? { material: [{ kind: "passage" as const, ...material }] } : {}),
      pick,
      questions,
    },
  };
}

// =====================================================================
// 第1問　英文和訳（人文・社会の短い論説の下線部を日本語に）
// =====================================================================

const JT_LEAD = "次の英文を読み、下線部を日本語に訳せ。";
/** 英文和訳の採点基準 (10点) */
const jtRubric = (frame: string, fk: string[], word: string, wk: string[]): Rub => [
  [`構文の把握：${frame}`, 4, fk],
  [`語句の訳：${word}`, 3, wk],
  ["日本語として自然で、訳しもれ・つけ足しがない", 3, []],
];
const JT = (id: string, d: 1 | 2 | 3, label: string, model: string, rub: Rub, point: string, st: St[], unit: string = U.chobun): QuestionB =>
  Wr(id, d, unit, `下線部${label}を日本語に訳せ。`, undefined, model, rub, point, st, 360);

const P1: ExamPoolSection[] = [
  sec(1, "jt-photo", U.chobun, "英文和訳（写真と記憶）", JT_LEAD, {
    lang: "en",
    title: "Pictures and Memory",
    body: `We often assume that taking a photograph is a way of protecting a memory. {{(A) The moment we press the button, it seems, the scene is safely stored, ready to be recalled whenever we wish.}} Yet some psychologists have suggested that the opposite may sometimes be true. In one kind of experiment, visitors to a museum are asked either to look carefully at certain objects or to photograph them. Later, those who took pictures tend to remember fewer details than those who simply looked. {{(B) It is as if handing the task of remembering over to the camera allows the mind to stop paying attention.}}

This does not mean that we should leave our phones at home. {{(C) What matters is not whether we take pictures but how much attention we give to what is in front of us while we do so.}} A photographer who chooses a subject with care, studying the light and the angle, may notice far more than someone who merely glances at a view. {{(D) The danger lies less in the camera itself than in the habit of treating it as a substitute for looking.}}`,
  }, [
    JT("a", 2, "(A)", "ボタンを押した瞬間に、その光景は安全に保存され、望むときにいつでも思い出せる状態になるように思われる。",
      jtRubric("The moment SV「～した瞬間に」・ready to … は付帯的な説明", ["瞬間", "とたん"], "stored・recalled・whenever we wish", ["保存", "思い出", "いつでも"]),
      "the moment SV は接続詞「～するとすぐに」", [
        ["接続詞", "{{The moment we press the button}}＝「ボタンを押した瞬間に」。it seems は挿入で「～と思われる」。"],
        ["後半", "ready to be recalled は scene を説明する形容詞句。「{{いつでも思い出せる状態で}}」と訳す。"],
      ], U.setsuzoku),
    JT("b", 2, "(B)", "まるで、記憶するという仕事をカメラに任せることで、心が注意を払うのをやめられるようになるかのようだ。",
      jtRubric("It is as if SV「まるで～かのようだ」・動名詞の主語 handing … allows O to do", ["まるで", "かのよう"], "hand over A to B・stop paying attention", ["任せ", "注意"]),
      "無生物主語＋allow O to do は「～で…できる」", [
        ["骨組み", "It is {{as if}} ＋［handing … to the camera］{{allows}} the mind {{to stop}} …。"],
        ["訳し方", "無生物主語は「{{～することで}}、心は…をやめてしまう」と副詞的に訳すと自然。"],
      ]),
    JT("c", 2, "(C)", "大切なのは、写真を撮るかどうかではなく、撮っている間に目の前にあるものにどれだけ注意を向けるかである。",
      jtRubric("What matters is not A but B「大切なのはAではなくB」", ["大切なのは", "ではなく"], "whether・how much attention・while we do so", ["かどうか", "どれだけ", "撮っている間"]),
      "not A but B の A・B は同じ形（名詞節）", [
        ["骨組み", "{{What matters is not}} [whether …] {{but}} [how much attention …]。"],
        ["代動詞", "do so＝{{take pictures}}。「写真を撮っている間に」と具体的に。"],
      ], U.kandai),
    JT("d", 3, "(D)", "危険は、カメラそのものにあるというより、カメラを見ることの代わりとして扱う習慣にある。",
      jtRubric("lies less in A than in B「AよりむしろBにある」", ["というより", "むしろ"], "substitute for・itself", ["代わり", "そのもの"]),
      "less A than B は「AというよりむしろB」", [
        ["比較の形", "lie {{less in A than in B}}：危険がある場所はAよりB。"],
        ["語句", "treat it as a {{substitute for}} looking＝カメラを「{{見ることの代わり}}」として扱う。"],
      ], U.hikaku),
  ], 2, "reading"),

  sec(1, "jt-translation", U.chobun, "英文和訳（翻訳できない語）", JT_LEAD, {
    lang: "en",
    title: "The Myth of the Untranslatable Word",
    body: `Lists of so-called untranslatable words are popular on the internet. They usually include a term from some language that seems to capture, in a single word, a feeling for which English needs a whole sentence. {{(A) Such lists are entertaining, but they can leave the misleading impression that speakers of other languages experience the world in ways that outsiders could never understand.}}

In fact, almost anything that can be said in one language can be expressed in another, though perhaps less neatly. What is lost in translation is often not the meaning itself but the ease with which it is expressed. {{(B) A word that a child picks up without effort in one culture may require a careful explanation in another.}} {{(C) This difference matters, because the ideas for which a language has ready-made words are likely to be the ones its speakers notice and talk about most often.}} {{(D) A translator, then, is not someone who looks for perfect equivalents, which rarely exist, but someone who decides what can be sacrificed and what must be kept.}}`,
    notes: [{ word: "equivalent", meaning: "同等のもの・相当する語" }],
  }, [
    JT("a", 3, "(A)", "そのような一覧はおもしろいが、ほかの言語の話し手は、外部の人には決して理解できないようなしかたで世界を経験しているという、誤った印象を残しかねない。",
      jtRubric("the impression that SV（同格の that）・ways that outsiders could never understand（関係詞）", ["という", "印象"], "misleading・outsiders・could never", ["誤", "外部の人", "決して"]),
      "impression that SV は同格の that「～という印象」", [
        ["同格", "the misleading impression {{that}} speakers … experience …：「～という誤った印象」。"],
        ["関係詞", "in ways {{that outsiders could never understand}}：that は目的格の関係代名詞。"],
      ], U.kandai),
    JT("b", 1, "(B)", "ある文化では子どもが苦もなく身につける語が、別の文化では丁寧な説明を必要とすることがある。",
      jtRubric("A word that … in one culture may require … in another「ある～では…、別の～では」", ["ある文化", "別の文化"], "pick up・without effort・careful explanation", ["身につけ", "苦もなく", "説明"]),
      "in one … in another は「ある～では…別の～では」", [
        ["主語", "{{A word that a child picks up without effort in one culture}} までが主語。"],
        ["対比", "in one culture ↔ in {{another}} (culture)。may は「～することがある」。"],
      ]),
    JT("c", 3, "(C)", "この違いは重要である。なぜなら、ある言語に出来合いの語がある考えこそ、その言語の話し手が最もよく気づき、話題にするものである可能性が高いからだ。",
      jtRubric("the ideas for which a language has … words（前置詞＋関係代名詞）・be likely to be the ones …", ["考え", "可能性が高い"], "ready-made・notice and talk about most often", ["出来合い", "既成", "最もよく"]),
      "前置詞＋関係代名詞は元の文に戻して読む", [
        ["関係詞", "the ideas {{for which}} a language has ready-made words＝その言語に「それを表す出来合いの語がある」考え。"],
        ["補語", "are likely to be {{the ones}} (= the ideas) its speakers notice …。"],
      ], U.kandai),
    JT("d", 2, "(D)", "したがって翻訳者とは、めったに存在しない完全な等価語を探す人ではなく、何を犠牲にしてよく、何を残さねばならないかを決める人なのである。",
      jtRubric("is not A but B・非制限の which rarely exist", ["ではなく"], "then・perfect equivalents・sacrificed", ["したがって", "等価", "犠牲"]),
      "コンマつき which は「そしてそれは～」と補う", [
        ["骨組み", "A translator is {{not}} someone who … {{but}} someone who …。"],
        ["非制限用法", ", {{which rarely exist}}：完全な等価語は「めったに存在しない」と補足。"],
      ]),
  ], 2, "reading"),

  sec(1, "jt-boredom", U.chobun, "英文和訳（退屈の効用）", JT_LEAD, {
    lang: "en",
    title: "In Defence of Boredom",
    body: `Boredom has a bad reputation. We tend to see it as a sign that something has gone wrong, a gap to be filled as quickly as possible. {{(A) Today, with a phone almost always within reach, few of us have to put up with it for more than a few seconds.}}

But boredom may serve a purpose. It is an uncomfortable signal that our current activity is not satisfying us, and {{(B) it is precisely this discomfort that pushes us to look for something more meaningful to do.}} Some researchers have even argued that a mind left without stimulation begins to wander in productive ways, making connections it would not make while busy. {{(C) If we escape from boredom the moment it appears, we may never discover where it might have led us.}} {{(D) None of this is to say that boredom is pleasant, only that it deserves to be tolerated a little longer than we are used to.}}`,
  }, [
    JT("a", 2, "(A)", "今日では、ほとんどいつも手の届くところにスマートフォンがあるので、数秒より長く退屈を我慢しなければならない人はほとんどいない。",
      jtRubric("付帯状況の with O＋前置詞句・few of us「ほとんどいない」", ["ので", "ほとんどいない"], "within reach・put up with", ["手の届く", "我慢"]),
      "few は否定的に「ほとんど～ない」と訳す", [
        ["付帯状況", "{{with a phone almost always within reach}}：「スマホがほとんどいつも手の届くところにあるので」。"],
        ["主語", "{{few of us}} have to …＝「～しなければならない人はほとんどいない」。it は boredom。"],
      ], U.zenchishi),
    JT("b", 2, "(B)", "まさにこの不快さこそが、もっと意味のあることを探すよう私たちを駆り立てるのである。",
      jtRubric("強調構文 it is … that ～", ["こそ"], "precisely・push O to do・something more meaningful to do", ["まさに", "駆り立て", "意味のある"]),
      "it is A that ～ の強調構文は「～なのはAだ」", [
        ["強調構文", "it is {{precisely this discomfort}} that pushes …：強調されているのは「まさにこの不快さ」。"],
        ["語法", "push O to do＝「Oを～するよう{{駆り立てる}}」。"],
      ], U.tokushu),
    JT("c", 3, "(C)", "退屈が現れたとたんにそこから逃げ出してしまえば、退屈が私たちをどこへ導いてくれたかもしれないのかを、決して知ることはないかもしれない。",
      jtRubric("the moment SV「～するとすぐに」・where it might have led us（間接疑問・助動詞＋完了形）", ["とたん", "すぐ"], "escape from・never discover", ["逃げ", "決して"]),
      "might have done は「～したかもしれない」", [
        ["接続詞", "{{the moment it appears}}：「退屈が現れたとたんに」。"],
        ["間接疑問", "{{where it might have led us}}：「それがどこへ私たちを導いたかもしれないか」。"],
      ]),
    JT("d", 3, "(D)", "以上のことは、退屈が快いと言っているのではなく、ただ、退屈は私たちが慣れているよりも少し長く我慢する価値がある、と言っているにすぎない。",
      jtRubric("None of this is to say that A, only that B「AということではなくBというだけだ」", ["ではなく", "にすぎない", "だけ"], "deserve to be tolerated・a little longer than we are used to", ["価値", "慣れている"]),
      "only that の前に is to say が省略", [
        ["省略を補う", "None of this is to say that A, (this is) {{only (to say) that}} B。"],
        ["語法", "deserves {{to be tolerated}}＝「我慢される価値がある」。比較は than we are used to (tolerating it)。"],
      ]),
  ], 2, "reading"),

  sec(1, "jt-objects", U.chobun, "英文和訳（物が語る歴史）", JT_LEAD, {
    lang: "en",
    title: "What Ordinary Things Remember",
    body: `For a long time, historians concentrated almost entirely on kings, wars and treaties. {{(A) The lives of ordinary people, who left few written records, were thought to be either impossible to study or not worth the effort.}} That attitude has changed considerably. A cooking pot, a child's shoe or a worn-out coin can tell us a great deal about how people lived, what they valued and whom they traded with.

{{(B) Unlike a letter or a diary, an object was rarely made with the intention of being read by later generations, and for that reason it can be surprisingly honest.}} Of course, objects do not speak for themselves. {{(C) The same broken bowl may suggest poverty to one researcher and careful saving to another, depending on what each of them expects to find.}} {{(D) The task of the historian is to make an object answer questions that its makers would never have thought of asking.}}`,
    notes: [{ word: "treaty", meaning: "条約" }],
  }, [
    JT("a", 2, "(A)", "書かれた記録をほとんど残さなかった庶民の暮らしは、研究することが不可能であるか、労力に値しないかのどちらかだと考えられていた。",
      jtRubric("非制限の who（ordinary people の補足）・either A or B", ["どちらか", "か"], "ordinary people・few written records・worth the effort", ["庶民", "ほとんど", "値しない"]),
      "either A or B は「AかBのどちらか」", [
        ["補足", "ordinary people, {{who left few written records}}：「書かれた記録をほとんど残さなかった」。"],
        ["骨組み", "The lives … were thought to be {{either}} impossible to study {{or}} not worth the effort。"],
      ]),
    JT("b", 3, "(B)", "手紙や日記と違って、物は後の世代に読まれることを意図して作られることはめったになく、そのために驚くほど正直でありうる。",
      jtRubric("Unlike A, B …・rarely「めったに～ない」・for that reason", ["違って", "めったに", "そのため"], "with the intention of being read・surprisingly honest", ["意図", "読まれる", "驚くほど"]),
      "rarely は頻度の否定「めったに～ない」", [
        ["対比", "{{Unlike}} a letter or a diary：手紙・日記は読まれるために書かれるが、物はちがう。"],
        ["動名詞の受け身", "with the intention of {{being read}} by later generations＝「後の世代に読まれることを意図して」。"],
      ], "h-eng-gram-domeishi"),
    JT("c", 2, "(C)", "同じ割れた鉢が、それぞれの研究者が何を見つけると予想しているかによって、ある研究者には貧しさを、別の研究者には注意深い節約を示すことがある。",
      jtRubric("suggest A to one … and B to another・depending on 間接疑問", ["ある研究者", "別の研究者", "によって"], "suggest・careful saving・expects to find", ["示", "節約", "予想"]),
      "depending on は「～によって・～しだいで」", [
        ["対比", "suggest poverty {{to one researcher}} and careful saving {{to another}}。"],
        ["条件", "{{depending on what each of them expects to find}}＝「何を見つけると予想しているかによって」。"],
      ]),
    JT("d", 3, "(D)", "歴史家の仕事は、物の作り手が問おうとは決して思わなかったであろう問いに、その物を答えさせることである。",
      jtRubric("make O do（使役）・would never have thought of（仮定の気持ち）", ["させる"], "its makers・think of doing", ["作り手", "思わ"]),
      "make O 原形は「Oに～させる」", [
        ["使役", "to {{make an object answer}} questions：「物に問いに答えさせる」。"],
        ["関係詞節", "questions that its makers {{would never have thought of asking}}：「作り手なら問おうと思いもしなかったであろう」。"],
      ]),
  ], 2, "reading"),
];

// =====================================================================
// 第2問　長文総合読解（エッセイ・論説：空所・語の意味・和訳・内容説明・内容一致）
// =====================================================================

const LR_LEAD = "次の英文を読み、下の問いに答えよ。";
/** 内容説明 (日本語) の採点基準 */
const exRubric = (a: [string, string[]], b: [string, string[]], c: [string, string[]] = ["字数の条件を守り、日本語として筋が通っている", []]): Rub => [
  [a[0], 4, a[1]],
  [b[0], 3, b[1]],
  [c[0], 2, c[1]],
];
const EX = (id: string, d: 2 | 3, prompt: string, max: number, model: string, rub: Rub, point: string, st: St[]): QuestionB =>
  Wr(id, d, U.chobun, `${prompt}（${max}字以内の日本語で）`, { max, unit: "字" }, model, rub, point, st, 300);

const P2: ExamPoolSection[] = [
  sec(2, "lr-quiet", U.chobun, "長文読解（静けさと集中）", LR_LEAD, {
    lang: "en",
    title: "The Value of Quiet",
    body: `Not long ago, a friend of mine moved from a busy apartment in the center of a large city to a small house at the edge of a forest. For the first few weeks, she told me, she could hardly sleep. The silence at night was so complete that every small sound, such as a branch moving in the wind or a bird landing on the roof, woke her up. It took her nearly a month to get used to the very quiet that she had moved there to enjoy. Her experience is a reminder that our sense of what is normal depends heavily on [ 1 ] we are used to.

Modern life is noisy in ways that earlier generations would find hard to imagine. Traffic, air conditioners, construction work and the constant background music of shops and restaurants mean that many city dwellers are rarely, if ever, in a truly quiet place. {{(A) Because this noise is always present, we stop noticing it, but that does not mean it has no effect on us.}} Studies of people living near airports and busy roads have linked long-term exposure to noise with poor sleep, higher stress and difficulty concentrating.

The effect on concentration is perhaps the most interesting. When we try to focus on a demanding task, such as reading a difficult text, part of our attention is always [ 2 ] aside to monitor our surroundings. This is a useful habit inherited from our distant ancestors, for whom an unexpected sound might have meant danger. In a quiet room, this monitoring system has little to do. In a noisy one, it is kept constantly busy, and the mental resources left for the task itself are reduced. {{(B) We may not feel tired, yet we finish the day having accomplished less than we hoped.}}

Interestingly, not all sound is harmful to thinking. Many people say they work better in a café than in a silent library, and there is some evidence that a moderate level of background noise can encourage creative thinking. The key difference seems to be predictability. The steady murmur of conversation in a café contains no single voice that demands attention, so it fades into the background. By contrast, a single conversation at the next desk, or a phone that rings without warning, draws the mind away from its work. {{(C) It is not loudness alone but meaning and surprise that make a sound difficult to ignore.}}

If this is true, then the solution is not necessarily to get rid of all sound, which would be impossible in any case. Rather, we might pay more attention to the kinds of sound we allow into the places where people need to think. Some schools have begun to [ 3 ] quiet areas where students can read without interruption, and some offices now divide their space into zones for conversation and zones for concentration. Such changes cost little, but they recognize something that is easy to forget: attention is a limited resource, and silence is one of the conditions that allow it to be used well.

My friend, by the way, now says that she cannot imagine going back to the city. {{(D) What once kept her awake has become the thing she would miss most.}}`,
    notes: [{ word: "dweller", meaning: "住人" }, { word: "monitor", meaning: "監視する" }],
  }, [
    C("blank1", 2, U.kandai, "空所［ 1 ］に入る最も適切なものを選べ。", ["what", "which", "that", "how"], 0, [
      "正解。depends on の目的語になる名詞節で、used to の目的語が欠けている。先行詞を含む what（～するもの）が入る。",
      "which の前には先行詞が必要。ここには先行詞がない。",
      "that は前置詞 on の直後に名詞節として置けない（関係代名詞なら先行詞が必要）。",
      "how は副詞なので、used to の後ろに欠けている目的語を補えない。",
    ], "前置詞の後ろで目的語が欠けた節は what", [
      ["欠けているもの", "we are used to ＿＿：to の{{目的語}}が欠けている。"],
      ["先行詞の有無", "on の直後で先行詞がない → {{what}}（～するもの）。"],
    ], K),
    C("blank2", 2, U.jukugo, "空所［ 2 ］に入る最も適切なものを選べ。", ["set", "carried", "given", "made"], 0, [
      "正解。set aside は「（ある目的のために）取っておく」。注意の一部が周囲の監視のために取っておかれる、という意味。",
      "carry aside という決まった言い方はなく、意味が通らない。",
      "give aside という言い方はない（give away・give up などとの混同）。",
      "make aside という言い方はない。",
    ], "set aside＝（ある目的のために）取っておく", [
      ["熟語", "{{set aside}}：お金や時間・注意を、ある目的のために取っておく。"],
      ["文脈", "to monitor our surroundings（周囲を監視するために）注意の一部が{{取り分けられている}}。"],
    ], K),
    C("blank3", 1, U.vocab, "空所［ 3 ］に入る最も適切なものを選べ。", ["create", "prevent", "forbid", "reduce"], 0, [
      "正解。生徒がじゃまされずに読める静かな場所を「つくる」。次の「会社は空間を区分けしている」とも並ぶ。",
      "静かな場所を「防ぐ」では、段落の主張（考える場所の音に気を配る）と逆になる。",
      "静かな場所を「禁止する」では、文脈と逆。",
      "静かな場所を「減らす」では、文脈と逆。",
    ], "前後の具体例が同じ方向かを確かめる", [
      ["段落の主張", "考える場所に入れる音の種類に{{気を配る}}べきだ。"],
      ["語を選ぶ", "静かな場所を{{つくる}}（create）が、その具体例になる。"],
    ], K),
    Wr("tr-a", 2, U.chobun, "下線部(A)を日本語に訳せ。", undefined,
      "この騒音はいつもあるので、私たちはそれに気づかなくなるが、だからといって、それが私たちに何の影響も与えていないということにはならない。",
      jtRubric("Because SV, we stop doing・that does not mean (that) SV", ["ので", "ということにはならない", "わけではない"], "stop noticing・have no effect on", ["気づかなく", "影響"]),
      "that does not mean は「だからといって～ではない」", [
        ["前半", "stop {{noticing}} it＝「それに気づくのをやめる→気づかなくなる」。"],
        ["後半", "{{that does not mean}} it has no effect：that は前半の内容。「だからといって影響がないわけではない」。"],
      ], 360),
    EX("ex-b", 3, "下線部(B)のようなことが起こるのはなぜか。本文に即して説明せよ。", 60,
      "騒がしい場所では周囲を監視する注意が絶えず働き、作業そのものに使える心の余力が減ってしまうから。",
      exRubric(["周囲を監視する注意が（騒音で）絶えず働いていることを書いている", ["監視", "周囲", "絶えず"]], ["作業に使える心の余力（注意）が減ることを書いている", ["余力", "減"]]),
      "理由は直前の文にある", [
        ["根拠をさがす", "直前：In a noisy one, it is {{kept constantly busy}}, and the mental resources left for the task are {{reduced}}。"],
        ["まとめる", "「周囲の監視に注意がとられる → {{作業に使える余力が減る}} → 疲れを感じなくても成果が少ない」。"],
      ]),
    Wr("tr-c", 3, U.tokushu, "下線部(C)を日本語に訳せ。", undefined,
      "音を無視しにくくするのは、音の大きさだけではなく、意味と意外性なのである。",
      jtRubric("強調構文 It is not A but B that ～・make O C", ["のは", "ではなく"], "loudness alone・meaning and surprise・difficult to ignore", ["大きさ", "だけ", "意外", "無視"]),
      "強調構文の中に not A but B が入っている", [
        ["強調構文", "It is {{not loudness alone but meaning and surprise}} that …：「～のは、Aだけではなく B だ」。"],
        ["使役の make", "make a sound {{difficult to ignore}}＝「音を無視しにくくする」。"],
      ], 300),
    C("cafe", 2, U.chobun, "第4段落で、カフェのほうが作業しやすいと言う人がいる理由として本文の内容に合うものを選べ。", [
      "カフェの話し声は一定で、注意を引く一つの声を含まないので、背景にとけこむから。",
      "カフェは図書館よりも音が小さく、周囲を監視する必要がないから。",
      "カフェでは、隣の席の会話が創造的な考えのきっかけになるから。",
      "カフェでは電話が鳴らないように決められているから。",
    ], 0, [
      "正解。contains no single voice that demands attention, so it fades into the background に一致。",
      "カフェが図書館より静かだとは書いていない。図書館は silent とある。",
      "隣の席の一つの会話は、むしろ心を作業から引き離すものとして挙げられている。",
      "電話を禁止するという記述はない。鳴る電話は注意をそらす例。",
    ], "鍵は predictability（予測できること）", [
      ["キーワード", "The key difference seems to be {{predictability}}。"],
      ["根拠", "カフェのざわめきは {{no single voice that demands attention}} → 背景にとけこむ。"],
    ]),
    C("murmur", 2, U.vocab, "本文中の murmur の意味として最も適切なものを選べ。", [
      "a low, continuous sound of voices",
      "a sudden, loud noise",
      "a complete absence of sound",
      "a single, clear voice",
    ], 0, [
      "正解。steady（一定の）murmur of conversation で、ざわざわと続く低い話し声。",
      "突然の大きな音は、直後の a phone that rings without warning の側。",
      "まったく音がないのは silence で、カフェの説明ではない。",
      "一つのはっきりした声は、本文では「含まない」とされている。",
    ], "形容詞 steady と後ろの説明から推す", [
      ["前後", "{{steady}} murmur of conversation … contains {{no single voice}}。"],
      ["意味", "一定に続く、低いざわめき → {{a low, continuous sound of voices}}。"],
    ], K),
    C("what-once", 2, U.chobun, "下線部(D)の What once kept her awake が指すものとして最も適切なものを選べ。", [
      "the deep silence of the forest at night",
      "the traffic in the center of the city",
      "the conversations of her neighbors",
      "a phone that rang without warning",
    ], 0, [
      "正解。第1段落で、森の夜の静けさが完全で、小さな音で目が覚め、眠れなかったとある。",
      "都会の交通は、彼女が今住んでいる場所の話ではない。",
      "隣人の会話は本文に出てこない。",
      "鳴る電話は第4段落の一般的な例で、彼女の話ではない。",
    ], "最終段落は第1段落と呼応する", [
      ["呼応", "第1段落：{{could hardly sleep}}、The silence at night was so complete…。"],
      ["指すもの", "眠れなくさせたもの＝{{夜の静けさ}}。それが今はいちばん恋しくなるものに。"],
    ]),
    C("agree", 3, U.chobun, "本文の内容と一致するものを選べ。", [
      "The writer suggests that the places where people think should be planned with the type of sound in mind.",
      "The writer believes that all background sound should be removed from schools and offices.",
      "According to the passage, people who live near airports soon become unaffected by noise.",
      "The writer's friend moved to the forest because she could not sleep in the city.",
    ], 0, [
      "正解。第5段落 we might pay more attention to the kinds of sound we allow into the places where people need to think に一致。",
      "第5段落で、すべての音をなくすことは解決策とは限らず、そもそも不可能だと述べている。",
      "第2段落では、空港近くの住人について睡眠不足やストレスとの関連が述べられている。",
      "彼女は静けさを楽しむために引っ越した（the very quiet that she had moved there to enjoy）。都会で眠れなかったとは書いていない。",
    ], "極端な言い方（all など）の選択肢に注意", [
      ["正解の根拠", "the {{kinds of sound}} we allow into the places where people need to think。"],
      ["誤りの根拠", "{{not necessarily to get rid of all sound}}：すべての音をなくすことではない。"],
    ]),
  ], 7, "reading"),

  sec(2, "lr-goed", U.chobun, "長文読解（子どもの言いまちがい）", LR_LEAD, {
    lang: "en",
    title: "Why Children Say 'Goed'",
    body: `Anyone who has spent time with a small child learning English will have heard sentences such as "I goed to the park" or "Look at those mouses." Parents sometimes worry about these mistakes, and some try to correct them [ 1 ] once. Yet linguists who study how children acquire language regard such errors as some of the most revealing evidence we have about how the mind works.

Consider the word "goed." A child who says it has almost certainly never heard an adult use it. Adults say "went." {{(A) The error therefore cannot be explained as simple imitation, which is how many people imagine children learn to speak.}} Instead, the child appears to have noticed a pattern, namely that past actions are often expressed by adding "-ed" to a verb, and to have applied it to a new case. In other words, the child has discovered a rule and is using it with more confidence than the language actually allows.

What makes this especially striking is the order in which such errors appear. Many children first use "went" correctly, apparently because they have memorized it as a single word. Only later, after they have learned the general rule, do they begin to say "goed." For a while, their speech seems to get worse. Eventually, as they hear "went" again and again, they learn that this verb is an exception, and the correct form returns. {{(B) Researchers sometimes describe this pattern as a U-shaped curve, since accuracy first rises, then falls, and finally rises again.}}

The temporary decline is not a failure but a sign of progress. A child who only memorizes words can repeat what she has heard, but she cannot produce anything new. A child who has grasped a rule can talk about events she has never heard described, using verbs she may have learned only that morning. {{(C) The mistakes are the price she pays for this new ability, and it is a price well worth paying.}}

This raises the question of whether parents should correct their children at all. Interestingly, direct correction seems to have [ 2 ] effect. In many cases, a child who is told that she has made a mistake simply repeats the same form. What seems to help more is hearing the correct form used naturally. When a child says, "My teacher holded the rabbit," a parent who replies, "Oh, did she hold it gently?" is not correcting anyone, yet the child hears the right word in a meaningful context. {{(D) Over many such conversations, the exception gradually wins out over the rule.}}

The lesson extends beyond childhood. Learners of a second language also make errors that come from applying rules too widely, and teachers often treat these errors as signs of carelessness. It might be more accurate to see them as evidence that the learner is actively building a system rather than passively copying what she hears. [ 3 ] such mistakes should not be ignored, they deserve to be understood before they are corrected.`,
    notes: [{ word: "linguist", meaning: "言語学者" }, { word: "acquire", meaning: "習得する" }],
  }, [
    C("blank1", 1, U.zenchishi, "空所［ 1 ］に入る最も適切なものを選べ。", ["at", "for", "in", "by"], 0, [
      "正解。at once で「すぐに」。まちがいをすぐに直そうとする、という意味。",
      "for once は「今回だけは」で、親が直そうとする場面に合わない。",
      "in once という言い方はない。",
      "by once という言い方はない。",
    ], "at once＝すぐに", [
      ["熟語", "{{at once}}：すぐに（＝immediately）。for once は「今回だけは」。"],
      ["文脈", "心配した親が、まちがいを{{すぐに}}直そうとする。"],
    ], K),
    C("blank2", 2, U.meishi, "空所［ 2 ］に入る最も適切なものを選べ。", ["little", "much", "a lot", "plenty"], 0, [
      "正解。直後に「まちがいを指摘された子どもは同じ形をくり返すだけ」とあり、直接の訂正は効果が「ほとんどない」。",
      "much effect では、直後の「同じ形をくり返すだけ」と食いちがう。",
      "a lot は名詞の前に置くとき a lot of が必要。意味も文脈と逆。",
      "plenty も名詞の前では plenty of が必要。意味も文脈と逆。",
    ], "直後の具体例が効果の有無を示す", [
      ["文脈", "In many cases, a child … {{simply repeats the same form}}：訂正しても変わらない。"],
      ["語を選ぶ", "効果は{{ほとんどない}} → little effect。"],
    ], K),
    C("blank3", 2, U.setsuzoku, "空所［ 3 ］に入る最も適切なものを選べ。", ["While", "Because", "Unless", "Until"], 0, [
      "正解。「無視すべきではないが、直す前に理解されるべきだ」という譲歩の関係。While は「～だけれども」。",
      "「無視すべきでないから理解されるべきだ」では、前後が理由と結果の関係にならない。",
      "「無視すべきでない場合を除いて」では意味が通らない。",
      "「無視すべきでないときまで」では意味が通らない。",
    ], "譲歩の while「～だけれども」", [
      ["前後の関係", "前：無視してはいけない。後：{{直す前に理解すべき}}。"],
      ["接続詞", "前を認めつつ後を主張する → 譲歩の {{While}}。"],
    ], K),
    Wr("tr-a", 2, U.kandai, "下線部(A)を日本語に訳せ。", undefined,
      "したがって、その誤りは単なる模倣としては説明できない。単なる模倣とは、子どもが話すことを覚える方法だと多くの人が思っているものである。",
      jtRubric("非制限の which（simple imitation を受ける）・how many people imagine …", ["模倣", "方法", "しかた"], "therefore・be explained as", ["したがって", "として説明"]),
      "コンマ＋which は前の名詞を補足する", [
        ["骨組み", "The error therefore {{cannot be explained as}} simple imitation：「単なる模倣としては説明できない」。"],
        ["補足", ", {{which is how}} many people imagine children learn to speak：「それは多くの人が子どもの言語習得のしかただと思っているものだ」。"],
      ], 360),
    EX("ex-b", 3, "下線部(B)の U-shaped curve とはどのような変化か。go の過去形の例に即して説明せよ。", 80,
      "子どもははじめ went を丸暗記して正しく使うが、規則を覚えると goed と誤るようになり、やがて went が例外だと学んで再び正しく使うようになる変化。",
      exRubric(["はじめは went を（丸暗記して）正しく使うことを書いている", ["went", "暗記", "正しく"]], ["規則を覚えて goed と誤り、例外と学んで再び正しくなることを書いている", ["goed", "規則", "例外", "再び"]]),
      "上がる→下がる→上がるの3段階を本文で対応させる", [
        ["3段階", "① went を{{丸暗記}}して正しく ② 規則（-ed）を覚え {{goed}} ③ went が{{例外}}と学び正しく戻る。"],
        ["表現", "正確さが{{上がって下がってまた上がる}}ので U 字。"],
      ]),
    EX("ex-c", 2, "下線部(C)の this new ability とはどのような能力か。説明せよ。", 50,
      "規則をつかんだことで、聞いたことのない出来事を、覚えたばかりの動詞も使って新しく言い表す能力。",
      exRubric(["聞いたことのない出来事を（新しく）言い表せることを書いている", ["聞いたことのない", "新しく"]], ["覚えたばかりの動詞も使える／規則をつかんだことによることを書いている", ["覚えたばかり", "規則"]]),
      "this は直前の文の内容を指す", [
        ["指す内容", "直前：A child who has grasped a rule {{can talk about events she has never heard described}}…。"],
        ["対比", "丸暗記の子は{{くり返すだけ}}、規則をつかんだ子は{{新しいことを言える}}。"],
      ]),
    Wr("tr-d", 2, U.chobun, "下線部(D)を日本語に訳せ。", undefined,
      "そうした会話を何度も重ねるうちに、例外がしだいに規則に打ち勝つのである。",
      jtRubric("Over many such conversations「多くの会話を通じて」", ["重ねる", "通じて", "うちに"], "gradually・win out over", ["しだいに", "徐々に", "勝"]),
      "win out over は「～に打ち勝つ」", [
        ["前置詞", "{{Over}} many such conversations：期間を表す over「～のあいだに・～を重ねて」。"],
        ["内容", "例外（went）が規則（-ed）に{{打ち勝つ}}＝正しい形が定着する。"],
      ], 240),
    C("imitation", 2, U.chobun, "goed という誤りが模倣では説明できない理由として、本文の内容に合うものを選べ。", [
      "子どもは大人が goed と言うのをまず聞いたことがないから。",
      "子どもは大人のことばをまねすることが苦手だから。",
      "大人も子どもと話すときには goed と言うことがあるから。",
      "子どもは went という語を一度も聞いたことがないから。",
    ], 0, [
      "正解。A child who says it has almost certainly never heard an adult use it. Adults say \"went.\" に一致。",
      "まねが苦手だという記述はない。",
      "本文は Adults say \"went.\" で、大人は goed と言わない。",
      "子どもははじめ went を正しく使っている（第3段落）。",
    ], "模倣なら聞いた形を言うはず", [
      ["根拠", "has almost certainly {{never heard an adult use it}}。"],
      ["推論", "聞いていない形を言う → {{まねではなく規則の適用}}。"],
    ]),
    C("parents", 3, U.chobun, "第5段落の内容と一致するものを選べ。", [
      "Children seem to learn correct forms better when they hear them used naturally than when they are told they are wrong.",
      "Parents should never talk to their children about grammar.",
      "A parent who replies \"Did she hold it gently?\" is directly correcting the child.",
      "Children who are corrected directly immediately stop making the same error.",
    ], 0, [
      "正解。What seems to help more is hearing the correct form used naturally に一致。",
      "「決して話すべきでない」とまでは述べていない。言いすぎ。",
      "本文は is not correcting anyone（だれも直していない）。",
      "本文は simply repeats the same form（同じ形をくり返す）で逆。",
    ], "比較の向き（help more）を正確に", [
      ["根拠", "What seems to {{help more}} is hearing the correct form {{used naturally}}。"],
      ["誤りの根拠", "直接直された子は {{simply repeats the same form}}。"],
    ]),
    C("teachers", 3, U.chobun, "最終段落で、筆者が第二言語学習者の誤りについて述べていることとして最も適切なものを選べ。", [
      "誤りは、学習者が自分で言語の体系を組み立てている証拠と見るほうが正確かもしれない。",
      "誤りは不注意の表れなので、すぐに直すべきである。",
      "誤りは子どもの言いまちがいとは関係がないので、別に扱うべきである。",
      "誤りはいずれ自然になくなるので、気にする必要はない。",
    ], 0, [
      "正解。It might be more accurate to see them as evidence that the learner is actively building a system に一致。",
      "不注意の表れと見るのは「教師がしがちなこと」として挙げられ、筆者はそれに異を唱えている。",
      "The lesson extends beyond childhood で、子どもの例と結びつけている。",
      "should not be ignored（無視すべきでない）とあり、気にしなくてよいとは言っていない。",
    ], "筆者の意見は might be more accurate の後ろ", [
      ["筆者の見方", "{{actively building a system}} rather than passively copying。"],
      ["他の見方", "教師は {{signs of carelessness}} と見がち → 筆者はそれを改めたい。"],
    ]),
  ], 7, "reading"),

  sec(2, "lr-repair", U.chobun, "長文読解（修理の集まり）", LR_LEAD, {
    lang: "en",
    title: "Fixing Things Together",
    body: `In a community hall in the small town of Elmfield, a group of volunteers meets on the first Saturday of every month. People arrive carrying broken toasters, torn jackets, lamps that no longer light and bicycles with flat tyres. For a few hours, the volunteers, among them retired engineers, a former tailor and a few students who are good with electronics, try to fix whatever is brought in. They charge nothing. The only rule is that the owner must stay and watch, and, if possible, help.

Such "repair cafés" have spread to many countries over the past fifteen years or so, and it is easy to see why. Most of us own a great many objects that we do not know how to maintain. When something stops working, our first thought is not to open it up but to replace it. {{(A) In many cases, buying a new product is actually cheaper than paying a professional to repair the old one, so the decision seems perfectly sensible.}}

Yet the habit of replacing rather than repairing has costs that do not appear on the price tag. Every discarded machine contains materials that were dug out of the ground, processed and transported, often across great distances. {{(B) Throwing it away after a few years means that most of that effort has been wasted, even if the machine itself was cheap.}} Electronic waste in particular is growing rapidly, and only a [ 1 ] of it is properly recycled.

The volunteers at Elmfield would probably say, however, that saving resources is only part of the point. One of them, a former bus mechanic, says that what he enjoys most is the moment when an owner realizes that a machine is not a mysterious box but a collection of parts, each with a purpose. {{(C) Once people see how something works, they treat it differently; they are less likely to break it and more likely to try fixing it themselves next time.}}

There is a further benefit that is harder to measure. In a society where most services are bought and sold, the repair café is a place where strangers help one another without expecting [ 2 ] in return. People who come with a broken kettle often stay for coffee and conversation long after it has been fixed. For some elderly visitors who live alone, the monthly meeting is one of the few occasions on which they talk at length with their neighbours.

Of course, a handful of volunteers cannot solve the problem of waste on their own. Many products are designed in ways that make repair difficult: parts are glued rather than screwed together, and spare parts are hard to find. Some governments have begun to [ 3 ] manufacturers to make repair easier and to supply spare parts for a number of years. {{(D) Such rules may achieve more than any number of community events, but they are unlikely to succeed unless people want to repair things in the first place.}} Repair cafés, in their modest way, help to create that desire.`,
    notes: [{ word: "discard", meaning: "捨てる" }, { word: "manufacturer", meaning: "製造業者・メーカー" }],
  }, [
    C("blank1", 2, U.meishi, "空所［ 1 ］に入る最も適切なものを選べ。", ["fraction", "majority", "variety", "number"], 0, [
      "正解。only a fraction of ～ で「～のごく一部だけ」。電子ごみが急増しているのに、きちんと再利用されるのは一部だけ、という流れ。",
      "only a majority（ただの大部分）は不自然で、「急増しているのに」という問題提起とも合わない。",
      "a variety of は「さまざまな～」で、量の割合を表さない。",
      "a number of は数えられる名詞の複数形に使い、waste（数えられない）には合わない。",
    ], "a fraction of＝ごく一部", [
      ["文脈", "電子ごみは{{急増}}している、そして only … が適切に再利用される → 少ない。"],
      ["語法", "数えられない名詞の一部 → {{a fraction of}} it。"],
    ], K),
    C("blank2", 1, "h-eng-gram-daimeishi", "空所［ 2 ］に入る最も適切なものを選べ。", ["anything", "nothing", "something", "everything"], 0, [
      "正解。without expecting anything in return で「見返りを何も期待せずに」。without がすでに否定を含む。",
      "without と nothing で否定が二重になり、意味が逆になる。",
      "否定の without の後では、ふつう something ではなく anything を使う。",
      "「すべてを期待せずに」では、無償で助け合う場の説明にならない。",
    ], "without のあとは any- を使う", [
      ["否定の語", "{{without}} は否定を含むので、後ろは {{anything}}。"],
      ["熟語", "in return＝{{見返りに}}。お金のやりとりがない場だという対比。"],
    ], K),
    C("blank3", 2, U.vocab, "空所［ 3 ］に入る最も適切なものを選べ。", ["require", "prevent", "prohibit", "excuse"], 0, [
      "正解。require O to do で「Oに～するよう求める（義務づける）」。修理しやすくし、部品を供給するよう求める。",
      "prevent は prevent O from doing の形で「～させない」。to do をとらず、意味も逆。",
      "prohibit も prohibit O from doing で「禁じる」。意味が逆。",
      "excuse O from doing は「免除する」で、意味が逆。",
    ], "後ろが O to do なら require・ask など", [
      ["語法", "{{require O to do}}：Oに～することを求める。prevent・prohibit は from doing。"],
      ["文脈", "修理しにくい製品が問題 → 政府はメーカーに{{修理しやすくするよう求める}}。"],
    ], K),
    Wr("tr-a", 2, U.hikaku, "下線部(A)を日本語に訳せ。", undefined,
      "多くの場合、新しい製品を買うほうが、専門家にお金を払って古いものを修理してもらうよりも実際には安いので、その判断はまったく理にかなっているように思える。",
      jtRubric("動名詞の主語の比較 buying A is cheaper than paying …・so", ["ほうが", "よりも", "ので"], "pay O to do・perfectly sensible", ["お金を払", "修理", "理にかなって", "賢明"]),
      "動名詞どうしを than でくらべている", [
        ["比較", "{{buying a new product}} is cheaper than {{paying a professional to repair}} the old one。"],
        ["語法", "pay O to do＝「Oにお金を払って～してもらう」。the old one は the old product。"],
      ], 360),
    EX("ex-b", 2, "下線部(B)の that effort とはどのようなことを指すか。説明せよ。", 50,
      "機械の材料を地中から掘り出し、加工し、しばしば遠くまで運ぶという手間。",
      exRubric(["材料を掘り出すこと・加工することを書いている", ["掘り出", "加工"]], ["遠くまで運ぶこと（輸送）を書いている", ["運", "輸送"]]),
      "that は直前の文の内容を指す", [
        ["指す内容", "直前：materials that were {{dug out of the ground, processed and transported}}。"],
        ["まとめる", "「{{掘り出す・加工する・運ぶ}}」の3つを入れる。"],
      ]),
    Wr("tr-c", 3, U.hikaku, "下線部(C)を日本語に訳せ。", undefined,
      "いったん物のしくみがわかると、人はそれを違ったふうに扱うようになる。つまり、それを壊すことが少なくなり、次のときには自分で直してみようとすることが多くなるのだ。",
      jtRubric("Once SV「いったん～すると」・less likely to A and more likely to B", ["いったん", "少なく", "多く"], "how something works・try doing・themselves", ["しくみ", "自分で", "してみ"]),
      "be likely to do の比較は「～する可能性が低い／高い」", [
        ["接続詞", "{{Once}} people see how something works：「いったんしくみがわかると」。"],
        ["対比", "{{less likely to break it}} ／ {{more likely to try fixing it}}：「壊しにくく」「直してみようとしやすく」。"],
      ], 360),
    EX("ex-d", 3, "下線部(D)で、筆者が「そうした規則」だけでは十分でないと考えるのはなぜか。説明せよ。", 60,
      "人々がそもそも物を修理したいと思わなければ、修理しやすい製品が作られても修理は広まらないから。",
      exRubric(["人々がそもそも修理したいと思う必要があることを書いている", ["そもそも", "修理したい", "思わなければ"]], ["規則で修理しやすくなっても（それだけでは）成功しないことを書いている", ["規則", "広まらない", "成功しない"]]),
      "unless 以下が理由の中心", [
        ["根拠", "they are unlikely to succeed {{unless people want to repair things in the first place}}。"],
        ["まとめる", "規則＝修理の{{条件}}を整える。でも人の{{気持ち}}がなければ使われない。"],
      ]),
    C("rule", 1, U.chobun, "Elmfield の集まりの「唯一の規則」として本文に合うものを選べ。", [
      "持ち主はその場に残って作業を見て、できれば手伝わなければならない。",
      "持ち主は修理の費用を払わなければならない。",
      "修理できるのは電気製品だけである。",
      "持ち主はボランティアに修理を任せて帰らなければならない。",
    ], 0, [
      "正解。The only rule is that the owner must stay and watch, and, if possible, help. に一致。",
      "They charge nothing.（料金は取らない）とある。",
      "上着や自転車も持ちこまれている。",
      "残って見ることが規則で、任せて帰るのは逆。",
    ], "The only rule の後ろをそのまま読む", [
      ["根拠", "the owner must {{stay and watch}}, and, if possible, {{help}}。"],
      ["誤りの根拠", "{{charge nothing}}・上着や自転車も持ちこまれる。"],
    ]),
    C("agree", 3, U.chobun, "本文の内容と一致するものを選べ。", [
      "For some elderly people, the repair café offers a rare chance to talk at length with their neighbours.",
      "The writer believes that repair cafés alone can solve the problem of electronic waste.",
      "Most products today are designed so that their parts can easily be replaced.",
      "The former bus mechanic says that saving resources is the only reason for repairing things.",
    ], 0, [
      "正解。the monthly meeting is one of the few occasions on which they talk at length with their neighbours に一致。",
      "a handful of volunteers cannot solve the problem of waste on their own とあり、逆。",
      "部品が接着され、予備の部品も手に入りにくい、と修理しにくい設計が述べられている。",
      "元整備士が最も楽しいのは、持ち主が機械のしくみに気づく瞬間で、資源の節約だけが目的とは言っていない。",
    ], "one of the few は「数少ない～の一つ」", [
      ["根拠", "{{one of the few occasions}} on which they talk at length。"],
      ["誤りの根拠", "{{cannot solve the problem … on their own}}・{{glued rather than screwed}}。"],
    ]),
    C("title", 3, U.chobun, "本文の内容を最もよく表す題を選べ。", [
      "Repairing Together: Saving Resources and Building Community",
      "How to Fix a Broken Toaster at Home",
      "Why New Products Are Always Better Than Old Ones",
      "The History of Electronic Waste",
    ], 0, [
      "正解。資源の節約に加え、物のしくみを知ること・人のつながりという利点まで述べており、全体をまとめている。",
      "トースターは持ちこまれる物の一例にすぎず、修理の方法は書かれていない。",
      "新しい物を買う習慣のコストを問題にしており、逆。",
      "電子ごみは第3段落の一部で、歴史は書かれていない。",
    ], "題は全段落をおおうものを選ぶ", [
      ["段落の流れ", "集まりの紹介 → {{資源}} → {{しくみを知る}} → {{人のつながり}} → 規則と気持ち。"],
      ["選ぶ", "一部だけの話題（トースター・電子ごみ）は狭すぎる。"],
    ]),
  ], 7, "reading"),
];

// =====================================================================
// 第3問　自由英作文（70語程度で意見を述べる）
// =====================================================================

const ES_LEAD = "次の問いについて、あなたの考えを70語程度の英語で書け。";
const esRubric = (stance: string[]): Rub => [
  ["問いに正面から答え、立場・主張がはっきりしている", 4, stance],
  ["理由・具体例で主張を支え、論理がつながっている", 5, ["because", "For example", "However"]],
  ["文法・語法・つづりの誤りが少ない", 4, []],
  ["語数（70語程度）を守り、まとまりがある", 2, []],
];
const ES = (id: string, d: 2 | 3, q: string, model: string, stance: string[], point: string, st: St[]): QuestionB =>
  Wr(id, d, U.jiyu, `${ES_LEAD}\n問い：${q}`, { min: 60, max: 80, unit: "語" }, model, esRubric(stance), point, st, 900);

const P3: ExamPoolSection[] = [
  sec(3, "es-study", U.jiyu, "自由英作文（学ぶこと）", ES_LEAD, null, [
    ES("alone", 2, "Is it better for students to study alone or with friends? Explain your opinion with reasons.",
      "I think it is better to study alone most of the time. When I study by myself, I can focus on the topics I find difficult and move at my own pace. With friends, it is easy to start chatting and waste time. However, studying with friends is useful just before a test, because we can quiz each other and explain ideas, which helps us remember them.",
      ["I think", "better to study alone"], "立場→理由→反対側の利点で締める", [
        ["構成", "① 立場 ② 理由（{{自分のペース}}） ③ 反対側の欠点 ④ 条件つきの利点。"],
        ["語数", "70語程度は{{4〜5文}}。理由は1〜2つにしぼる。"],
      ]),
    ES("parttime", 2, "Should high school students be allowed to have part-time jobs? Explain your opinion.",
      "I believe high school students should be allowed to have part-time jobs, as long as the work does not interfere with their studies. Working in a shop or restaurant teaches young people how to communicate with customers and take responsibility. They also learn the value of money, because they realize how hard it is to earn. Schools could set a limit of, for example, ten hours a week.",
      ["I believe", "should be allowed"], "条件（as long as）で主張に幅をもたせる", [
        ["条件", "{{as long as}} the work does not interfere with their studies：条件つき賛成。"],
        ["具体化", "{{ten hours a week}} のように具体的な提案で締めると説得力が増す。"],
      ]),
    ES("outside", 3, "What is one important thing you have learned outside the classroom? Describe it and explain why it matters to you.",
      "One important thing I learned outside the classroom is how to work with people who are different from me. Last summer I volunteered at a local festival, and my team included elderly residents and young children. At first we disagreed about almost everything, but by listening carefully we found a way to cooperate. This experience taught me that patience is just as important as knowledge.",
      ["One important thing I learned"], "経験型は「何を→いつどこで→どう変わった」", [
        ["構成", "① 学んだこと ② {{具体的な経験}} ③ どう乗りこえたか ④ {{学び}}の一般化。"],
        ["時制", "経験は{{過去形}}、学びは現在形（patience {{is}} …）。"],
      ]),
  ], 1, "writing"),

  sec(3, "es-tech", U.jiyu, "自由英作文（技術と暮らし）", ES_LEAD, null, [
    ES("translate", 3, "Now that machine translation is improving rapidly, is it still necessary to learn foreign languages? Explain your opinion.",
      "I think it is still necessary to learn foreign languages. Machine translation is convenient for reading signs or simple messages, but it cannot replace the experience of talking directly with someone. When we learn a language, we also learn how its speakers think and what they value. Moreover, a translation app may make mistakes that we cannot notice unless we understand the language ourselves.",
      ["I think", "still necessary"], "相手の利点を認めてから反論する", [
        ["譲歩", "Machine translation is {{convenient}} …, {{but}} it cannot replace …。"],
        ["理由を2つ", "① 話し手の{{考え方}}を学べる ② 訳の{{誤りに気づける}}。Moreover でつなぐ。"],
      ]),
    ES("ebooks", 2, "Do you prefer reading paper books or electronic books? Explain why.",
      "I prefer reading paper books. When I hold a printed book, I can easily see how much I have read and turn back to a page I want to check. I also find it easier to concentrate, because a paper book does not show notifications or tempt me to open other apps. Electronic books are light and convenient for travel, but for serious reading I choose paper.",
      ["I prefer"], "比較の問いは「選ぶ側の利点＋相手の利点」", [
        ["理由", "① {{ページを行き来しやすい}} ② {{集中しやすい}}。"],
        ["締め", "相手の利点（{{light and convenient}}）を認め、but で自分の選択にもどる。"],
      ]),
    ES("phone-age", 3, "At what age should children be given their own smartphones? Explain your opinion.",
      "In my opinion, children should not have their own smartphones until they are about thirteen. Younger children may find it difficult to control how much time they spend on games and videos, which can affect their sleep and studies. In addition, they may not understand the risks of sharing personal information online. Until then, parents can give them a simple phone that can only make calls and send messages.",
      ["In my opinion", "until they are"], "年齢など数で答える問いは、数を最初に示す", [
        ["答え", "not … {{until they are about thirteen}}：問いに数で正面から答える。"],
        ["代案", "それまでは{{通話とメッセージだけの電話}}、と現実的な代案で締める。"],
      ]),
  ], 1, "writing"),

  sec(3, "es-life", U.jiyu, "自由英作文（社会と暮らし）", ES_LEAD, null, [
    ES("city", 2, "Would you rather live in a big city or in the countryside in the future? Explain why.",
      "I would rather live in the countryside in the future. In a big city, people are always busy, and housing is expensive and small. In the countryside, I could live in a larger house, grow my own vegetables and enjoy clean air. Thanks to the internet, many jobs can now be done from anywhere, so living far from the city no longer means giving up a good career.",
      ["I would rather"], "予想される反論（仕事）に先回りして答える", [
        ["対比", "都会の欠点（{{busy・expensive}}）と田舎の利点（{{larger house・clean air}}）。"],
        ["先回り", "「田舎では仕事がない」という反論に {{Thanks to the internet}} で答える。"],
      ]),
    ES("transport", 3, "Should public transport be free for everyone? Explain your opinion.",
      "I do not think public transport should be completely free for everyone. Running trains and buses costs a great deal of money, and if passengers paid nothing, taxes would have to rise sharply. However, I believe fares should be free or much cheaper for children, students and elderly people, who often cannot drive. This would help those who need transport most without placing too heavy a burden on public finances.",
      ["I do not think"], "全面賛成・反対でなく「一部なら」という立場も可", [
        ["立場", "{{completely free for everyone}} には反対、しかし一部の人には賛成。"],
        ["仮定法", "if passengers {{paid}} nothing, taxes {{would have to}} rise：仮定法過去で結果を示す。"],
      ]),
    ES("company", 2, "Would you rather work for a large company or start your own business? Explain why.",
      "I would rather work for a large company, at least at the beginning of my career. A large company can offer training, a stable income and the chance to work with experienced colleagues. These things would help me build skills and confidence. Starting a business is exciting, but it is risky for someone with little experience. After learning from others for some years, I might consider starting my own.",
      ["I would rather"], "時間の幅（at first / later）で立場を整理する", [
        ["立場", "{{at least at the beginning of my career}}：時期をしぼった立場。"],
        ["締め", "起業の魅力を認めつつ、{{経験を積んでから}}と将来の展望で締める。"],
      ]),
  ], 1, "writing"),

  sec(3, "es-values", U.jiyu, "自由英作文（ものの考え方）", ES_LEAD, null, [
    ES("friend", 2, "What makes a good friend? Explain your idea with an example.",
      "In my view, a good friend is someone who tells you the truth even when it is hard to hear. Anyone can praise you when things go well, but a true friend will point out your mistakes kindly because they care about you. For example, when I was about to quit my club, a friend honestly told me that I would regret it. Her advice helped me stay and grow.",
      ["In my view", "a good friend is"], "定義の問いは「AとはBだ」を1文目で", [
        ["定義", "a good friend is {{someone who tells you the truth}}：関係詞で定義を1文に。"],
        ["例", "{{For example}}, when I was about to quit my club …：自分の経験で裏づける。"],
      ]),
    ES("failure", 3, "Do you agree that failure is necessary for success? Explain your opinion with an example.",
      "I agree that failure is often necessary for success. When we fail, we are forced to think about what went wrong, and this reflection helps us improve. For instance, when I did badly in my first English speech, I realized that I had not practiced enough in front of others. The next time, I rehearsed with my family and spoke much more confidently. Without that failure, I would not have changed.",
      ["I agree"], "Without ～, S would not have done で締める", [
        ["一般論→例", "失敗 → {{振り返り}} → 改善、を自分の{{スピーチの例}}で示す。"],
        ["締め", "{{Without that failure, I would not have changed}}：仮定法過去完了で効果を強調。"],
      ]),
    ES("tradition", 3, "Which do you think is more important for a local community: keeping its traditions or accepting change? Explain your opinion.",
      "I think a community needs to accept change while keeping its most meaningful traditions. If a town refuses all change, young people may leave because it cannot offer them modern jobs or services. On the other hand, traditions such as local festivals give residents a shared identity and bring different generations together. The best approach is to keep traditions alive by adapting them, for example by inviting newcomers to take part.",
      ["I think", "more important"], "二者択一でも、両立の道を具体的に示す", [
        ["両面", "変化を拒むと{{若者が出ていく}}／伝統は{{世代をつなぐ}}。On the other hand で対比。"],
        ["結論", "{{adapting them}}：伝統を変えながら残す、と具体例（新しい住民を招く）で示す。"],
      ]),
  ], 1, "writing"),
];

// =====================================================================
// 第4問　和文英訳（文学部向けの随筆調の日本文）
// =====================================================================

const TR_LEAD = "次の文章の下線部を英語に訳せ。";
/** 和文英訳の採点基準 (10点) */
const trRubric = (frame: string[], words: string[], content: string[]): Rub => [
  ["文の骨組み（構文・時制・語順）が正しい", 4, frame],
  ["語句の選び方・語法が適切", 3, words],
  ["内容にぬけ・つけ足しがない", 3, content],
];
const TR = (id: string, d: 1 | 2 | 3, label: string, model: string, also: string[], rub: Rub, point: string, st: St[]): QuestionB =>
  Wr(id, d, U.wabun, `下線部${label}を英語に訳せ。`, undefined, model, rub, point, st, 420, also);

const P4: ExamPoolSection[] = [
  sec(4, "tr-reading", U.wabun, "和文英訳（読書について）", TR_LEAD, {
    lang: "ja",
    body: `本を読むことは、他人の頭で考えることだと言われることがある。{{ア　確かに、読んでばかりいて自分で考えることを怠れば、知識は増えても判断する力は育たないだろう。}}しかし、私の経験では、本は考えることの邪魔をするよりも、むしろそのきっかけを与えてくれることのほうが多かった。{{イ　ある一行に心を動かされて、本を閉じたまましばらく窓の外を眺めていたことが何度もある。}}{{ウ　そういうとき、私は書かれていることに同意しているというより、それまで気づかなかった問いに出会っているのだ。}}{{エ　読書の価値は、読み終えた本の数ではなく、そうして立ち止まる時間の長さで測られるのかもしれない。}}`,
  }, [
    TR("a", 2, "ア", "It is true that if you only read and fail to think for yourself, your knowledge may increase, but your ability to judge will not develop.",
      ["Certainly, if you do nothing but read and neglect to think on your own, you may gain knowledge, but you will not develop the power to make judgments."],
      trRubric(["It is true that", "if", "but"], ["think for yourself", "neglect", "ability to judge"], ["読んでばかり", "怠れば", "知識は増えても"]),
      "「確かに～だが」は It is true that … but", [
        ["骨組み", "{{It is true that}} if …, A may …, {{but}} B will not …：譲歩の形。"],
        ["語句", "「自分で考える」＝ {{think for yourself}}、「怠る」＝ fail to / neglect to。"],
      ]),
    TR("i", 3, "イ", "I have often been so moved by a single line that I sat looking out of the window for a while with the book closed.",
      ["Many times, a single line has moved me so much that I have closed the book and gazed out of the window for some time."],
      trRubric(["so … that", "have often been"], ["be moved by", "with the book closed", "for a while"], ["一行", "本を閉じたまま", "何度も"]),
      "「～したまま」は with O＋過去分詞", [
        ["骨組み", "「心を動かされて…眺めていた」を {{so moved … that}} で因果に。「何度もある」は {{have often}}。"],
        ["付帯状況", "本を閉じたまま＝ {{with the book closed}}。"],
      ]),
    TR("u", 3, "ウ", "At such times, I am not so much agreeing with what is written as encountering a question that I had never noticed before.",
      ["In those moments, rather than agreeing with what the author says, I am coming across a question I had not been aware of until then."],
      trRubric(["not so much A as B", "rather than"], ["what is written", "encounter", "come across"], ["同意", "それまで気づかなかった"]),
      "「AというよりB」は not so much A as B", [
        ["構文", "I am {{not so much}} agreeing … {{as}} encountering …：A・B は同じ形（-ing）。"],
        ["時制", "「それまで気づかなかった」＝ 出会う時点より前 → {{had never noticed}}。"],
      ]),
    TR("e", 2, "エ", "The value of reading may be measured not by the number of books you have finished but by how long you spend pausing like that.",
      ["What makes reading valuable may be not how many books you have read but how much time you spend stopping to think in that way."],
      trRubric(["may be measured", "not by A but by B"], ["the number of", "how long", "pause"], ["読み終えた本の数", "立ち止まる時間"]),
      "not A but B は前置詞もそろえる", [
        ["受け身", "測られる＝ {{may be measured}} by …。"],
        ["対比", "{{not by}} the number of books {{but by}} how long …：by を両方に。"],
      ]),
  ], 2, "writing"),

  sec(4, "tr-travel", U.wabun, "和文英訳（旅と目）", TR_LEAD, {
    lang: "ja",
    body: `旅の楽しみは、見知らぬ土地の風景そのものよりも、それを見る自分の目が変わることにあるのではないだろうか。{{ア　ふだん通い慣れた道では、私たちは周りのものをほとんど見ていない。}}{{イ　ところが、初めて訪れる町では、看板の文字や窓辺の花のような小さなものにまで目がとまる。}}{{ウ　旅から帰ってきたとき、見慣れているはずの自分の町が少し違って見えるのは、そのためだろう。}}{{エ　遠くへ出かけなくても、そういう目で身の回りを眺めることができれば、毎日が小さな旅になるはずだ。}}`,
  }, [
    TR("a", 1, "ア", "On the roads we take every day, we hardly look at the things around us.",
      ["When we walk along a street we are used to, we scarcely notice what is around us."],
      trRubric(["we hardly look at"], ["hardly", "the roads we take every day", "be used to"], ["通い慣れた", "ほとんど見ていない"]),
      "「ほとんど～ない」は hardly / scarcely", [
        ["否定", "ほとんど見ていない＝ {{hardly look at}}（not を重ねない）。"],
        ["名詞句", "通い慣れた道＝ {{the roads we take every day}}／a street we are used to。"],
      ]),
    TR("i", 2, "イ", "In a town we are visiting for the first time, however, even small things such as the letters on signs and the flowers on windowsills catch our eye.",
      ["When we visit a town for the first time, on the other hand, we notice even little things like the words on signboards and the flowers by the windows."],
      trRubric(["however", "even … catch our eye"], ["for the first time", "such as", "catch one's eye"], ["看板の文字", "窓辺の花", "小さなもの"]),
      "「目がとまる」は catch one's eye / notice", [
        ["主語", "小さなものを主語に {{even small things … catch our eye}}、または we notice even …。"],
        ["例示", "「AやBのような」＝ {{such as}} A and B。"],
      ]),
    TR("u", 3, "ウ", "That is probably why our own town, which should be familiar to us, looks a little different when we come home from a trip.",
      ["This is probably the reason our hometown, which we should know well, seems slightly different when we return from a journey."],
      trRubric(["That is why", "looks different", "when"], ["familiar", "come home from a trip", "should"], ["見慣れているはず", "少し違って", "そのため"]),
      "「～のはそのためだ」は That is why SV", [
        ["構文", "{{That is (probably) why}} ＋ 結果の文。日本語の語順と逆に、結果を why の後ろに。"],
        ["補足", "見慣れているはずの＝ {{, which should be familiar to us,}} を非制限で挿入。"],
      ]),
    TR("e", 2, "エ", "Even if we do not go far, if we can look at our surroundings in that way, every day should become a small journey.",
      ["If we could see the things around us with such eyes, every day would be a little trip, even without traveling far."],
      trRubric(["Even if", "if we can", "should become"], ["surroundings", "in that way", "journey"], ["遠くへ出かけなくても", "毎日", "小さな旅"]),
      "「～しなくても」は even if / even without", [
        ["譲歩", "遠くへ出かけなくても＝ {{even if we do not go far}}／even without traveling far。"],
        ["推量", "～になるはずだ＝ {{should become}}（仮定法なら would be）。"],
      ]),
  ], 2, "writing"),

  sec(4, "tr-silence", U.wabun, "和文英訳（ことばと沈黙）", TR_LEAD, {
    lang: "ja",
    body: `親しい友人と一緒にいると、何も話さなくても気まずくないことがある。{{ア　沈黙が苦にならないのは、相手を信頼している証拠なのかもしれない。}}{{イ　反対に、よく知らない人と二人きりになると、私たちは何か言わなければと焦ってしまう。}}{{ウ　そういうときに口にする天気の話は、中身よりも、自分に敵意がないことを相手に伝える点に意味がある。}}{{エ　ことばは考えを伝える道具であるだけでなく、人と人との距離を測るものさしでもあるのだ。}}`,
  }, [
    TR("a", 2, "ア", "The fact that silence does not bother us may be a sign that we trust the other person.",
      ["Perhaps we do not mind silence because we trust the person we are with."],
      trRubric(["The fact that", "may be a sign that"], ["bother", "the other person", "trust"], ["苦にならない", "信頼", "証拠"]),
      "「～のは…の証拠だ」は The fact that … is a sign", [
        ["主語", "沈黙が苦にならないこと＝ {{The fact that silence does not bother us}}（同格の that）。"],
        ["語句", "証拠＝ a {{sign}} that …。「かもしれない」は may。"],
      ]),
    TR("i", 2, "イ", "On the other hand, when we are left alone with someone we do not know well, we feel anxious that we have to say something.",
      ["In contrast, when we find ourselves alone with a person we hardly know, we become nervous and feel we must say something."],
      trRubric(["On the other hand", "when", "feel"], ["be left alone with", "someone we do not know well", "anxious"], ["二人きり", "よく知らない", "焦って"]),
      "「二人きりになる」は be left alone with", [
        ["語句", "二人きりになる＝ {{be left alone with}} someone。"],
        ["気持ち", "何か言わなければと焦る＝ {{feel anxious that we have to say something}}。"],
      ]),
    TR("u", 3, "ウ", "What matters about talking about the weather on such occasions is not its content but the fact that it shows the other person that we are not hostile.",
      ["When we talk about the weather at such times, the point is not what we say but letting the other person know that we mean no harm."],
      trRubric(["What matters is not A but B", "shows O that"], ["on such occasions", "hostile", "mean no harm"], ["天気の話", "中身よりも", "敵意がない"]),
      "「AよりもBに意味がある」は not A but B で整理", [
        ["整理", "「意味があるのは中身ではなく、敵意がないと伝えること」と言いかえる。"],
        ["構文", "{{What matters … is not}} its content {{but}} …。"],
      ]),
    TR("e", 2, "エ", "Language is not only a tool for conveying ideas but also a measure of the distance between people.",
      ["Words are not merely a means of expressing our thoughts; they also serve as a ruler for measuring how close people are."],
      trRubric(["not only A but also B"], ["tool", "convey", "measure", "distance between people"], ["考えを伝える道具", "距離を測るものさし"]),
      "「AだけでなくBでもある」は not only A but also B", [
        ["構文", "Language is {{not only}} a tool … {{but also}} a measure …。"],
        ["比喩", "ものさし＝ a {{measure}}／a ruler。「距離を測る」は of the distance between people。"],
      ]),
  ], 2, "writing"),

  sec(4, "tr-desk", U.wabun, "和文英訳（古いものを使い続ける）", TR_LEAD, {
    lang: "ja",
    body: `祖母の家には、何十年も使われてきた木の机がある。{{ア　表面には傷やしみがたくさんあるが、祖母はそれを新しいものに替えようとはしない。}}{{イ　その傷の一つ一つに家族の思い出が刻まれているからだ、と祖母は言う。}}{{ウ　新しい製品が次々と売り出される今日、物を長く使い続けることは、かえって難しくなっているように思える。}}{{エ　しかし、古い物を大切にすることは、それとともに過ごした時間を大切にすることでもあるのではないだろうか。}}`,
  }, [
    TR("a", 1, "ア", "Its surface has a lot of scratches and stains, but my grandmother will not replace it with a new one.",
      ["There are many scratches and marks on its surface, but my grandmother has no intention of changing it for a new desk."],
      trRubric(["has", "but", "will not"], ["scratch", "stain", "replace A with B"], ["傷やしみ", "新しいもの", "替えようとはしない"]),
      "「どうしても～しようとしない」は will not", [
        ["意志", "替えようとしない＝ {{will not replace}}（拒絶の will not）。"],
        ["語法", "AをBに替える＝ {{replace A with B}}。"],
      ]),
    TR("i", 2, "イ", "She says that this is because each of those scratches holds a memory of our family.",
      ["According to her, it is because every one of the scratches carries memories of the family."],
      trRubric(["She says that", "this is because"], ["each of", "hold", "memory"], ["一つ一つ", "家族の思い出", "刻まれている"]),
      "「一つ一つ」は each of＋複数名詞（動詞は単数）", [
        ["構文", "～だからだ＝ {{this is because}} SV。"],
        ["一致", "{{each of those scratches holds}}：each が主語なので3単現。"],
      ]),
    TR("u", 3, "ウ", "Today, when new products are put on the market one after another, it seems to have become harder to keep using things for a long time.",
      ["Nowadays, with new goods appearing in stores one after another, using things for many years seems to have become, if anything, more difficult."],
      trRubric(["when …", "it seems to have become", "to keep using"], ["one after another", "be put on the market", "keep doing"], ["次々と", "かえって", "長く使い続ける"]),
      "「～になっているように思える」は seem to have p.p.", [
        ["完了不定詞", "（今までに）難しくなった＝ {{seems to have become}} harder。"],
        ["語句", "次々と＝ {{one after another}}、使い続ける＝ {{keep using}}。"],
      ]),
    TR("e", 3, "エ", "However, isn't taking good care of old things also a way of valuing the time we have spent with them?",
      ["But I wonder if caring for old things also means treasuring the time we have shared with them."],
      trRubric(["isn't … ?", "I wonder if"], ["take good care of", "value", "the time we have spent with them"], ["古い物", "ともに過ごした時間", "大切に"]),
      "「～ではないだろうか」は否定疑問か I wonder if", [
        ["問いかけ", "{{isn't}} taking good care of … also …?／{{I wonder if}} …。"],
        ["関係詞", "ともに過ごした時間＝ the time {{we have spent with them}}。"],
      ]),
  ], 2, "writing"),
];

// =====================================================================

export const U_HANDAI_EIGO: UnivExam = {
  key: "handai-eigo",
  univ: "大阪大学",
  kamoku: "英語",
  tier: "国公立",
  order: 112,
  basis: "文学部の傾向を参考",
  format: "大問4題・105分・150点。英文和訳、長文総合読解（和訳・内容説明）、70語程度の自由英作文、随筆の和文英訳。",
  minutes: 105,
  groups: ["語彙", "文法", "技能"],
  sections: [
    { title: "第1問　英文和訳", lead: JT_LEAD, count: [2, 2], mix: [0, 0.4, 0.6], points: 40, prefer: "material", poolTag: "handai-eigo:1" },
    { title: "第2問　長文総合読解", lead: LR_LEAD, count: [7, 7], mix: [0, 0.4, 0.6], points: 50, prefer: "material", poolTag: "handai-eigo:2" },
    { title: "第3問　自由英作文", lead: ES_LEAD, count: [1, 1], mix: [0, 0.4, 0.6], points: 25, prefer: "material", poolTag: "handai-eigo:3" },
    { title: "第4問　和文英訳", lead: TR_LEAD, count: [2, 2], mix: [0, 0.4, 0.6], points: 35, prefer: "material", poolTag: "handai-eigo:4" },
  ],
  pool: [...P1, ...P2, ...P3, ...P4],
};
