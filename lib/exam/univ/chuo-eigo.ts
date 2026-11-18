import type { UnivExam } from "./types";
import type { ExamPoolSection } from "../pool/types";
import type { Question } from "@/lib/moshi/types";

// 中央大学型 英語（MARCH）。法学部の学部別選抜（一般方式）の傾向を参考にした練習用の形式（英文・設問はすべて書き下ろし）。
// 参考にした形式の情報（問題文・設問文・英文は使っていない）:
//   https://jyuke-labo.com/daigakujyukentaisaku/chuoudaigaku/hougakubu/  （法学部：90分・150点、大問8題。英文和訳・和文英訳・同綴り語の空所補充・整序・空所補充・誤り指摘・長文2題）
//   https://jyuke-labo.com/daigakujyukentaisaku/chuoudaigaku/kamokubetsu/  （学部別の試験時間・配点・形式の一覧）
//   https://search.keinet.ne.jp/2242/topics/33  （河合塾 Kei-Net：法学部は記述とマークの併用。正誤指摘・英文和訳・指定語つきの和文英訳・多義語の空所補充）
// 法学部: 90分・150点。Ⅰ英文和訳、Ⅱ和文英訳（書き出しと使う語の指定）、Ⅲ同じ綴りの語の空所補充、Ⅳ整序、
// Ⅴ文法・語法の空所補充、Ⅵ誤り指摘、Ⅶ長文の空所補充、Ⅷ長文の総合読解 の8題。

const K = "chuo-eigo";
type St = [string, string][];

const CHOBUN = "h-eng-skill-chobun";
const WABUN = "h-eng-skill-wabun";
const VOCAB = "h-eng-vocab-2000";
const JUKUGO = "h-eng-vocab-jukugo";
const G = (s: string) => `h-eng-gram-${s}`;

const steps = (s: St) => s.map(([title, body]) => ({ title, body }));
const sec = (d: 1 | 2 | 3) => (d === 1 ? 40 : d === 2 ? 60 : 80);
const pts = (d: 1 | 2 | 3) => (d === 1 ? 3 : d === 2 ? 4 : 5);

/** 4択 */
function ch(id: string, d: 1 | 2 | 3, unit: string, prompt: string, options: string[], correct: number, why: string[], point: string, st: St): Question {
  return {
    id,
    type: "B",
    difficulty: d,
    points: pts(d),
    seconds: sec(d),
    skill: d === 1 ? "知識・技能" : "思考・判断・表現",
    unit,
    prompt,
    answer: { kind: "choice", options, correct, why },
    point,
    steps: steps(st),
  };
}

/** 並べかえ (tokens は正しい順) */
function od(id: string, d: 1 | 2 | 3, unit: string, prompt: string, tokens: string[], point: string, st: St, distractor?: string): Question {
  return {
    id,
    type: "B",
    difficulty: d,
    points: pts(d),
    seconds: 90,
    skill: "思考・判断・表現",
    unit,
    prompt,
    answer: { kind: "order", tokens, ...(distractor ? { distractor } : {}) },
    point,
    steps: steps(st),
  };
}

/** 和訳・英訳 (rubric の合計が配点) */
function wr(id: string, d: 1 | 2 | 3, unit: string, prompt: string, model: string, rubric: [string, number, string[]][], point: string, st: St, limit?: { max?: number; min?: number; unit: "語" | "字" }): Question {
  return {
    id,
    type: "B",
    difficulty: d,
    points: rubric.reduce((s, r) => s + r[1], 0),
    seconds: 360,
    skill: "思考・判断・表現",
    unit,
    prompt,
    answer: { kind: "written", ...(limit ? { limit } : {}), model, rubric: rubric.map(([label, p, keywords]) => ({ label, points: p, keywords })) },
    point,
    steps: steps(st),
  };
}

/** 英文の本文つきの節 */
function R(n: number, id: string, unit: string, title: string, lead: string, ptitle: string | undefined, body: string, pick: number | undefined, questions: Question[]): ExamPoolSection {
  return {
    unit,
    tag: `${K}:${n}`,
    section: {
      id: `ch-${id}`,
      title,
      lead,
      style: "reading",
      examOnly: true,
      ...(pick ? { pick } : {}),
      material: [{ kind: "passage", lang: "en", title: ptitle, body }],
      questions,
    },
  };
}

/** 独立した小問の節 (本文は注意書き) */
function X(n: number, id: string, unit: string, title: string, lead: string, body: string, pick: number | undefined, questions: Question[]): ExamPoolSection {
  return {
    unit,
    tag: `${K}:${n}`,
    section: {
      id: `ch-${id}`,
      title,
      lead,
      style: "reading",
      examOnly: true,
      ...(pick ? { pick } : {}),
      material: [{ kind: "text", body }],
      questions,
    },
  };
}

// =====================================================================
// 第1問　英文和訳
// =====================================================================

const L1 = "次の英文を読み、下線部(A)(B)を日本語に訳せ。";
const WA = (x: string) => `下線部(${x})を日本語に訳せ。`;

const T1: ExamPoolSection[] = [
  R(
    1,
    "wa-memory",
    CHOBUN,
    "記憶と忘れること",
    L1,
    "The Use of Forgetting",
    `We usually think of forgetting as a failure of memory, something to be fought against with notes and reminders. Yet a mind that kept every detail would be overwhelmed. {{(A) If we remembered every face we passed on the street, we would find it harder, not easier, to recognize the people who matter to us.}} Forgetting clears away what is unimportant so that patterns can stand out. Researchers who study memory increasingly describe it as an active process of selection rather than a simple storehouse. {{(B) What we lose, in other words, is often the price we pay for being able to think clearly about what remains.}}`,
    undefined,
    [
      wr("a", 2, CHOBUN, WA("A"), "もし通りですれちがう顔をすべて覚えていたとしたら、私たちにとって大切な人々を見分けることは、より簡単になるどころか、より難しくなるだろう。",
        [["If … would の仮定法（もし～したら…だろう）を訳せている", 3, ["もし", "だろう"]], ["harder, not easier（簡単になるのではなく難しくなる）を訳し分けている", 4, ["難しく", "どころか"]], ["the people who matter to us（私たちにとって大切な人々）", 3, ["大切な人"]]],
        "find it 形 to do の it は to 以下を指す",
        [["構文", "If S 過去形, S would ～ → {{仮定法過去}}。find {{it}} harder … {{to recognize}} ～ の it は形式目的語。"], ["訳し方", "harder, not easier は「{{簡単になるどころか難しくなる}}」とまとめる。matter＝{{重要である}}。"]]),
      wr("b", 3, CHOBUN, WA("B"), "言いかえれば、私たちが失うものは、残ったものについて明晰に考えられることに対して支払う代償であることが多い。",
        [["What we lose（私たちが失うもの）を主語として訳せている", 3, ["失うもの"]], ["the price we pay for ～（～のために払う代償）", 4, ["代償"]], ["being able to think clearly about what remains（残ったものについてはっきり考えられること）", 3, ["残った", "考え"]]],
        "the price (that) we pay for ～＝～の代償",
        [["主語と補語", "{{What we lose}} is … the price。関係代名詞 what＝「～するもの」。"], ["修飾", "the price {{(that) we pay for}} being able to …。for の目的語が動名詞句。what remains＝{{残ったもの}}。"]]),
    ],
  ),
  R(
    1,
    "wa-law",
    CHOBUN,
    "法と慣習",
    L1,
    "Rules We Never Wrote",
    `Laws are often imagined as commands handed down from above, but most rules that shape daily life were never written by any legislature. People form lines, return borrowed tools, and keep promises largely because they expect others to do the same. {{(A) Written law works best when it builds on such shared expectations rather than trying to replace them.}} A rule that most citizens regard as reasonable needs little enforcement, while one that strikes them as arbitrary may be ignored no matter how severe the penalty. {{(B) It is not so much the fear of punishment as the sense that a rule is fair that keeps most of us obeying it.}}`,
    undefined,
    [
      wr("a", 2, CHOBUN, WA("A"), "成文法は、そうした共有された期待に取ってかわろうとするよりも、それを土台にするときに最もうまく機能する。",
        [["works best when ～（～するときに最もよく機能する）", 3, ["最も", "機能"]], ["builds on ～（～を土台にする・～に基づいて築く）", 4, ["土台", "基づ"]], ["rather than trying to replace them（それに取ってかわろうとするよりも）", 3, ["取ってかわ", "代わ"]]],
        "build on ～＝～を土台にして築く",
        [["骨組み", "Written law {{works best}} when it {{builds on}} … rather than {{trying to replace}} them。"], ["指示語", "them＝{{such shared expectations}}（人々が共有する期待）。"]]),
      wr("b", 3, CHOBUN, WA("B"), "私たちの大半に規則を守らせ続けているのは、罰への恐れというよりも、むしろその規則が公正だという感覚である。",
        [["not so much A as B（AというよりむしろB）", 4, ["というより"]], ["It is … that の強調構文として訳せている", 3, ["のは"]], ["keeps most of us obeying it（私たちの大半に規則を守らせ続ける）", 3, ["守ら", "従わ"]]],
        "It is … that の強調構文と not so much A as B",
        [["構文を見ぬく", "{{It is}} not so much A as B {{that}} keeps … → 強調構文。「…しているのは B だ」。"], ["中身", "{{not so much}} the fear of punishment {{as}} the sense that a rule is fair。keep O ～ing＝O に～させ続ける。"]]),
    ],
  ),
  R(
    1,
    "wa-translate",
    CHOBUN,
    "翻訳のむずかしさ",
    L1,
    "What Translators Keep",
    `Anyone who has tried to translate a joke knows that words do not travel alone. They carry with them sounds, associations, and memories that belong to a particular community. A translator must therefore decide again and again what to keep and what to let go. {{(A) A version that is faithful to every word may turn out to be unfaithful to the spirit of the original.}} Good translators accept that something will be lost, and they look for ways to make up for it elsewhere. {{(B) The question they ask is not whether a sentence has been copied exactly, but whether a reader in another language will respond to it as the first readers did.}}`,
    undefined,
    [
      wr("a", 2, CHOBUN, WA("A"), "一語一語に忠実な訳が、原文の精神には忠実でないとわかることもある。",
        [["faithful to every word（一語一語に忠実な）が version を修飾している", 3, ["忠実"]], ["may turn out to be ～（～だとわかることもある）", 4, ["わかる", "判明"]], ["unfaithful to the spirit of the original（原文の精神に忠実でない）", 3, ["精神", "原文"]]],
        "turn out to be ～＝～だとわかる",
        [["主語", "A version {{that is faithful to every word}}：関係詞節が主語を修飾。"], ["述語", "{{may turn out to be}} unfaithful to the spirit of {{the original}}（原文）。faithful と unfaithful の対比を生かす。"]]),
      wr("b", 3, CHOBUN, WA("B"), "彼らが問うのは、ある文が正確に写されたかどうかではなく、別の言語の読者が、最初の読者がしたのと同じようにそれに反応するかどうかである。",
        [["not A but B（AではなくB）", 3, ["ではなく"]], ["whether を2つとも「～かどうか」と訳せている", 3, ["かどうか"]], ["as the first readers did（最初の読者が反応したように）。did＝responded", 4, ["最初の読者"]]],
        "did は前の動詞（respond）の代わり",
        [["骨組み", "The question they ask is {{not whether}} … {{but whether}} …。"], ["代動詞", "as the first readers {{did}}＝as the first readers {{responded to it}}。"]]),
    ],
  ),
  R(
    1,
    "wa-trees",
    CHOBUN,
    "都市の木",
    L1,
    "Trees as Infrastructure",
    `Trees in cities are often treated as decoration, something pleasant to look at but easy to remove when a road needs widening. This view is changing as researchers measure what trees actually do. A single large tree can cool the air around it, absorb heavy rain, and provide shelter for birds and insects. {{(A) The older a tree grows, the more it tends to contribute, which means that cutting down one old tree cannot be made up for simply by planting a young one.}} Some cities now keep records of individual trees, much as they keep records of bridges and pipes. {{(B) Treating trees as part of the city's infrastructure, rather than as ornaments, changes the kind of questions planners have to ask.}}`,
    undefined,
    [
      wr("a", 3, CHOBUN, WA("A"), "木は年を経るほど多くの役に立つ傾向があり、それはつまり、古い木を1本切り倒すことは、若い木を1本植えるだけでは埋め合わせられないということである。",
        [["The 比較級 …, the 比較級 …（～すればするほど…）", 4, ["ほど"]], ["which が前の内容全体を受けている（それはつまり～ということだ）", 3, ["それは", "つまり"]], ["cannot be made up for simply by ～（～するだけでは埋め合わせられない）", 3, ["埋め合わせ", "だけでは"]]],
        "the 比較級, the 比較級／make up for＝埋め合わせる",
        [["前半", "{{The older}} a tree grows, {{the more}} it tends to contribute → 年を経るほど役立つ。"], ["後半", ", {{which}} means that … は前の文の内容を受ける。make up for の受け身＝{{be made up for}}。"]]),
      wr("b", 2, CHOBUN, WA("B"), "木を装飾品としてではなく都市の基盤設備の一部として扱うことで、計画を立てる人が問わなければならない問いの種類が変わる。",
        [["動名詞の主語 Treating trees as ～（木を～として扱うこと）", 3, ["扱う"]], ["rather than as ornaments（装飾品としてではなく）", 3, ["装飾"]], ["the kind of questions planners have to ask（計画者が問わねばならない問いの種類）", 4, ["問い", "種類"]]],
        "主語は動名詞句、動詞は changes",
        [["主語", "{{Treating trees as part of …}}, rather than as ornaments,（ここまで主語）"], ["述語", "{{changes}} the kind of questions (that) planners {{have to ask}}。無生物主語は「～することで…が変わる」と訳すと自然。"]]),
    ],
  ),
];

// =====================================================================
// 第2問　和文英訳（書き出しと使う語の指定つき）
// =====================================================================

const L2 = "次の日本文を英語に訳せ。ただし、指定された書き出しで始め、（　）内の語をすべてそのままの形で用いること。";

const T2: ExamPoolSection[] = [
  X(2, "ei-depend", WABUN, "和文英訳（計画と参加者）", L2, "その計画がうまくいくかどうかは、どれだけ多くの人が参加してくれるかにかかっている。", undefined, [
    wr("e", 2, WABUN, "上の日本文を英語に訳せ。\n書き出し：Whether\n使う語：（depends, how, many）", "Whether the plan will succeed depends on how many people take part in it.",
      [["Whether 節を主語にしている（Whether the plan will succeed / succeeds）", 5, ["Whether the plan"]], ["depends on ～（～にかかっている）", 5, ["depends on"]], ["how many people take part (in it) / join（どれだけ多くの人が参加するか）", 5, ["how many people"]]],
      "名詞節 whether ～ が主語。動詞は depends（単数）",
      [["主語", "「うまくいくかどうか」＝{{Whether the plan will succeed}}（名詞節は単数扱い）。"], ["述語", "「～にかかっている」＝{{depends on}}、そのあとに疑問詞節 {{how many people take part in it}}。"]]),
  ]),
  X(2, "ei-without", WABUN, "和文英訳（先生の助言）", L2, "もし先生の助言がなかったら、私はこの本を最後まで読み通すことはけっしてなかっただろう。", undefined, [
    wr("e", 2, WABUN, "上の日本文を英語に訳せ。\n書き出し：Without\n使う語：（advice, have, through）", "Without my teacher's advice, I would never have read this book through.",
      [["Without ～（～がなかったら）で条件を表している", 5, ["Without my teacher's advice"]], ["would never have 過去分詞（～することはけっしてなかっただろう）", 5, ["would never have"]], ["read this book through（最後まで読み通す）", 5, ["read", "through"]]],
      "Without ～, S would have p.p.（仮定法過去完了）",
      [["条件", "「～がなかったら」は名詞だけで {{Without my teacher's advice}}。過去のことなので主節は {{would have p.p.}}。"], ["語句", "「最後まで読み通す」＝{{read … through}}。never は would のあと。"]]),
  ]),
  X(2, "ei-internet", WABUN, "和文英訳（インターネット）", L2, "インターネットのおかげで、世界のどこにいても情報を手に入れることが以前よりずっと容易になった。", undefined, [
    wr("e", 3, WABUN, "上の日本文を英語に訳せ。\n書き出し：The Internet\n使う語：（made, much, wherever）", "The Internet has made it much easier than before to get information wherever we are in the world.",
      [["make it 形容詞 to do（無生物主語＋形式目的語）", 5, ["made it", "to get"]], ["much easier than before（以前よりずっと容易に）", 5, ["much easier"]], ["wherever we are (in the world)（どこにいても）", 5, ["wherever"]]],
      "無生物主語＋make it 形 to do",
      [["発想", "「～のおかげで…が容易になった」→「インターネットが…を容易にした」＝{{The Internet has made it easier to …}}。"], ["仕上げ", "比較級の強調は {{much}}。「どこにいても」＝{{wherever we are}}。"]]),
  ]),
  X(2, "ei-nomatter", WABUN, "和文英訳（毎日の英語）", L2, "どんなに忙しくても、毎日少しずつ英語に触れることが大切だ。", undefined, [
    wr("e", 2, WABUN, "上の日本文を英語に訳せ。\n書き出し：No matter\n使う語：（busy, it, little）", "No matter how busy you are, it is important to spend a little time with English every day.",
      [["No matter how busy you are（どんなに忙しくても）。how のすぐあとに busy", 5, ["No matter how busy"]], ["it is important to ～（～することが大切だ）", 5, ["it is important to"]], ["a little … every day（毎日少しずつ）で英語に触れる内容を表している", 5, ["a little", "every day"]]],
      "No matter how 形容詞 S V＝どんなに～でも",
      [["譲歩", "{{No matter how busy you are}}：how と形容詞を離さない。"], ["主節", "{{it is important to}} spend a little time with English / be exposed to English {{a little every day}}。"]]),
  ]),
  X(2, "ei-since", WABUN, "和文英訳（事故の記憶）", L2, "その事故が起きてから10年がたつが、多くの人々はいまだにそれを忘れていない。", undefined, [
    wr("e", 2, WABUN, "上の日本文を英語に訳せ。\n書き出し：It\n使う語：（since, still, forgotten）", "It has been ten years since the accident happened, but many people still have not forgotten it.",
      [["It has been (is) ten years since ～（～してから10年になる）", 5, ["It has been ten years since"]], ["the accident happened / took place を過去形で書いている", 5, ["happened"]], ["still have not forgotten it（いまだに忘れていない）", 5, ["still", "forgotten"]]],
      "It has been 期間 since S 過去形",
      [["時の表現", "「～してから10年」＝{{It has been ten years since}} the accident {{happened}}（since 節は過去形）。"], ["否定", "「いまだに～ない」は {{still}} を否定の前に置き、still have not forgotten とする。"]]),
  ]),
];

// =====================================================================
// 第3問　同じ綴りの語の空所補充（多義語）
// =====================================================================

const L3 = "次の各組の(a)(b)の空所に共通して入る語を、それぞれ選べ。";
const N3 = "各組の(a)(b)には、同じ綴りの語が入る（意味や品詞はちがってよい）。";
const P3 = (a: string, b: string) => `(a) ${a}\n(b) ${b}`;

const T3: ExamPoolSection[] = [
  X(3, "tazi-a", VOCAB, "多義語の空所補充（1）", L3, N3, 4, [
    ch("fine", 1, VOCAB, P3("You will have to pay a (　) if you park here.", "I feel (　) now, thank you."), ["fine", "penalty", "well", "good"], 0,
      ["正解。(a) 罰金、(b) 元気な。", "penalty は (a) には入るが、(b) I feel penalty とは言えない。", "well は (b) には入るが、(a) pay a well は誤り。", "good は (b) には入るが、(a) pay a good は誤り。"],
      "fine＝罰金（名詞）／元気な（形容詞）",
      [["(a)", "pay a (　)：お金を払う対象 → 罰金 {{fine}}。"], ["(b)", "I feel (　)：体調 → 元気な {{fine}}。両方に入るのは fine だけ。"]]),
    ch("kind", 1, VOCAB, P3("It was very (　) of you to help me.", "What (　) of music do you like?"), ["kind", "nice", "sort", "type"], 0,
      ["正解。(a) 親切な、(b) 種類。", "nice は (a) だけ。", "sort は (b) だけ。It was very sort of you は誤り。", "type は (b) だけ。"],
      "kind＝親切な／種類",
      [["(a)", "It is 形 {{of}} 人 to do → 人の性質。{{kind}}（親切な）。"], ["(b)", "What kind of ～＝どんな種類の～。"]]),
    ch("mean", 2, VOCAB, P3("What do you (　) by that?", "It was (　) of him to laugh at her."), ["mean", "intend", "cruel", "imply"], 0,
      ["正解。(a) 意味する、(b) 意地の悪い。", "intend は (b) に入らない。", "cruel は (b) だけ。(a) do you cruel は誤り。", "imply は (b) に入らない。"],
      "mean＝意味する／意地の悪い",
      [["(a)", "What do you {{mean}} by ～?＝～はどういう意味か。"], ["(b)", "形容詞の mean＝{{意地の悪い}}。笑いものにする行為と合う。"]]),
    ch("last", 2, VOCAB, P3("The meeting will (　) about two hours.", "He was the (　) person to leave the office."), ["last", "continue", "take", "final"], 0,
      ["正解。(a) 続く、(b) 最後の。", "continue は (a) だけ。", "take は (a) だけ（時間がかかる）。the take person は誤り。", "final は (b) だけ。"],
      "last＝続く（動詞）／最後の（形容詞）",
      [["(a)", "動詞の {{last}}＝（時間が）続く。"], ["(b)", "the last person to do＝最後に～した人。"]]),
    ch("present", 1, VOCAB, P3("All the members were (　) at the meeting.", "She bought a birthday (　) for her son."), ["present", "gift", "there", "absent"], 0,
      ["正解。(a) 出席している、(b) 贈り物。", "gift は (b) だけ。", "there は (b) に入らない。", "absent は (a) には入るが、(b) には入らない。"],
      "present＝出席している／贈り物",
      [["(a)", "be {{present}} at ～＝～に出席している。"], ["(b)", "a birthday {{present}}＝誕生日の贈り物。"]]),
    ch("save", 1, VOCAB, P3("We need to (　) money for our trip.", "The doctor managed to (　) the boy's life."), ["save", "spend", "keep", "rescue"], 0,
      ["正解。(a) たくわえる、(b) 救う。", "spend は (a) には入るが、the boy's life には合わない。", "keep は (a) には入るが、keep the boy's life とは言わない。", "rescue は人を目的語にとる（rescue the boy）。life には save を使う。"],
      "save＝たくわえる／救う",
      [["(a)", "{{save}} money＝お金をためる。"], ["(b)", "{{save}} 人's life＝命を救う。rescue は人が目的語。"]]),
    ch("close", 2, VOCAB, P3("She is a (　) friend of mine.", "Please (　) the door behind you."), ["close", "shut", "good", "near"], 0,
      ["正解。(a) 親しい、(b) 閉める。", "shut は (b) だけ。", "good は (a) だけ。", "「親しい友人」は close friend。near friend とはふつう言わない。"],
      "close＝親しい（形）／閉める（動）",
      [["(a)", "a {{close}} friend＝親友。near はこの意味で使わない。"], ["(b)", "{{close}} the door＝ドアを閉める。"]]),
  ]),
  X(3, "tazi-b", VOCAB, "多義語の空所補充（2）", L3, N3, 4, [
    ch("light", 1, VOCAB, P3("This bag is very (　); I can carry it easily.", "Turn on the (　), please."), ["light", "heavy", "lamp", "small"], 0,
      ["正解。(a) 軽い、(b) 明かり。", "heavy では「簡単に運べる」と合わない。", "lamp は (b) だけ。", "small は (a) には入るが、(b) Turn on the small は誤り。"],
      "light＝軽い／明かり",
      [["(a)", "簡単に運べる → 軽い {{light}}。"], ["(b)", "Turn on the {{light}}＝明かりをつける。"]]),
    ch("rest", 1, VOCAB, P3("You look tired. You should take a (　).", "I'll do the (　) of the work tomorrow."), ["rest", "break", "remainder", "nap"], 0,
      ["正解。(a) 休息、(b) 残り。", "break は (a) だけ。", "remainder は (b) だけ。", "nap は (a) だけ。"],
      "rest＝休息／残り（the rest of ～）",
      [["(a)", "take a {{rest}}＝ひと休みする。"], ["(b)", "the {{rest}} of ～＝～の残り。"]]),
    ch("change", 2, VOCAB, P3("Here is your (　), sir. Thank you for shopping with us.", "The weather is going to (　) this afternoon."), ["change", "receipt", "turn", "shift"], 0,
      ["正解。(a) おつり、(b) 変わる。", "receipt は (a) だけ。", "turn は (b) に近いが、(a) には入らない。", "shift は (a) に入らない。"],
      "change＝おつり（名）／変わる（動）",
      [["(a)", "店員の言葉 → おつり {{change}}。"], ["(b)", "天気が {{change}}（変わる）。"]]),
    ch("free", 1, VOCAB, P3("Admission to the museum is (　) on Sundays.", "Are you (　) this evening?"), ["free", "cheap", "busy", "costly"], 0,
      ["正解。(a) 無料の、(b) ひまな。", "cheap は (a) だけ。", "busy は (b) だけ。", "costly は (a) に入るが意味が通りにくく、(b) には入らない。"],
      "free＝無料の／ひまな",
      [["(a)", "入場料が {{free}}＝無料。"], ["(b)", "Are you {{free}}?＝ひまですか。"]]),
    ch("train", 1, VOCAB, P3("We took the early (　) to Osaka.", "Her job is to (　) new staff."), ["train", "bus", "teach", "plane"], 0,
      ["正解。(a) 列車、(b) 訓練する。", "bus は (a) だけ。", "teach は (b) だけ。", "plane は (a) だけ。"],
      "train＝列車／訓練する",
      [["(a)", "take the {{train}}＝列車に乗る。"], ["(b)", "{{train}} new staff＝新人を研修する。"]]),
    ch("subject", 2, VOCAB, P3("Math is my favorite (　) at school.", "The plan is (　) to change without notice."), ["subject", "course", "likely", "topic"], 0,
      ["正解。(a) 科目、(b) be subject to ～＝～を受けやすい・～することがある。", "course は (a) だけ。", "likely は (b) だけ（be likely to do）。", "topic は (a) に近いが、(b) には入らない。"],
      "be subject to ～＝～を受けることがある",
      [["(a)", "学校の {{subject}}＝科目。"], ["(b)", "be {{subject to}} change＝変更されることがある（to は前置詞）。"]]),
    ch("address", 2, VOCAB, P3("Please write your name and (　) on this form.", "The president will (　) the nation on television tonight."), ["address", "speak", "phone", "number"], 0,
      ["正解。(a) 住所、(b) ～に向けて演説する。", "speak は自動詞で、speak the nation とは言わない。", "phone は (a) で単独では使わない。", "number は (a) だけ。"],
      "address＝住所／演説する（他動詞）",
      [["(a)", "name and {{address}}＝氏名と住所。"], ["(b)", "{{address}} the nation＝国民に向けて演説する（他動詞）。"]]),
  ]),
  X(3, "tazi-c", VOCAB, "多義語の空所補充（3）", L3, N3, 4, [
    ch("run", 1, VOCAB, P3("It is not easy to (　) a small business.", "Dogs can (　) much faster than humans."), ["run", "manage", "rush", "start"], 0,
      ["正解。(a) 経営する、(b) 走る。", "manage は (a) だけ。", "rush は (a) に入らない。", "start は (a) だけ。"],
      "run＝経営する／走る",
      [["(a)", "{{run}} a business＝店・会社を経営する。"], ["(b)", "{{run}} faster＝速く走る。"]]),
    ch("bear", 2, VOCAB, P3("I can't (　) this noise any longer.", "A (　) was seen near the village last night."), ["bear", "stand", "wolf", "accept"], 0,
      ["正解。(a) がまんする、(b) クマ。", "stand は (a) だけ。", "wolf は (b) だけ。", "accept は (b) に入らない。"],
      "bear＝がまんする（＝stand）／クマ",
      [["(a)", "can't {{bear}} ～＝～にがまんできない（stand と同じ）。"], ["(b)", "村の近くで見られた動物 → {{bear}}。"]]),
    ch("match", 1, VOCAB, P3("Do you have a (　)? I want to light a candle.", "That tie doesn't (　) your shirt."), ["match", "lighter", "fit", "suit"], 0,
      ["正解。(a) マッチ、(b) ～と調和する。", "lighter は (a) だけ。", "fit は (b) だけ。", "suit は (b) だけ。"],
      "match＝マッチ／似合う・調和する",
      [["(a)", "ろうそくに火をつける → {{match}}。"], ["(b)", "A doesn't {{match}} B＝AはBと合わない。"]]),
    ch("spell", 2, VOCAB, P3("How do you (　) your name?", "We had a long dry (　) last summer."), ["spell", "write", "period", "season"], 0,
      ["正解。(a) 綴る、(b) ひと続きの期間。", "write は (a) だけ。", "period は (b) だけ。", "season は (b) だけ。"],
      "spell＝綴る／（天候の）ひと続き",
      [["(a)", "How do you {{spell}} ～?＝どう綴るのか。"], ["(b)", "a dry {{spell}}＝日照りが続く期間。"]]),
    ch("miss", 1, VOCAB, P3("Hurry up, or you'll (　) the bus.", "I will (　) you when you move to Canada."), ["miss", "catch", "lose", "visit"], 0,
      ["正解。(a) 乗りそこなう、(b) いなくてさびしく思う。", "catch は (a) だけ。", "lose は (a) の「乗り遅れる」の意味にならない。", "visit は (b) だけ。"],
      "miss＝乗りそこなう／さびしく思う",
      [["(a)", "Hurry up, or … → 乗り遅れる {{miss}}。"], ["(b)", "I will {{miss}} you＝いなくなるとさびしい。"]]),
    ch("fair", 2, VOCAB, P3("It isn't (　) that only he got a prize.", "She has (　) hair and blue eyes."), ["fair", "right", "blond", "just"], 0,
      ["正解。(a) 公平な、(b) （髪が）金色の。", "right は (a) だけ。", "blond は (b) だけ。", "just は (b) に入らない。"],
      "fair＝公平な／（髪・肌が）明るい色の",
      [["(a)", "It isn't {{fair}} that ～＝～は不公平だ。"], ["(b)", "{{fair}} hair＝金髪。"]]),
    ch("stick", 2, JUKUGO, P3("He walked with the help of a (　).", "Let's (　) to the original plan."), ["stick", "cane", "keep", "hold"], 0,
      ["正解。(a) つえ、(b) stick to ～＝～をつらぬく。", "cane は (a) だけ。", "keep (to) は (b) に入るが、(a) には入らない。", "hold は (a) に入らない。"],
      "stick to ～＝～を守りとおす",
      [["(a)", "歩くのを助ける → つえ {{stick}}。"], ["(b)", "{{stick to}} the plan＝計画をつらぬく。"]]),
  ]),
];

// =====================================================================
// 第4問　整序英作文
// =====================================================================

const L4 = "次の各日本文に合うように、与えられた語句を並べかえて英文を完成させよ（不要な語が1つ含まれている問いもある）。";
const N4 = "文頭に来る語も小文字にはしていない。語句はそのままの形で用いる。";

const T4: ExamPoolSection[] = [
  X(4, "seijo-a", G("futeishi"), "整序英作文（1）", L4, N4, 4, [
    od("last", 2, G("futeishi"), "「彼女は約束を破るような人ではない。」", ["She", "is", "the last", "person", "to", "break", "her promise"],
      "the last 名詞 to do＝最も～しそうにない",
      [["発想", "「～するような人ではない」＝{{the last person to do}}（最も～しそうにない人）。"], ["組み立て", "She is the last person {{to break}} her promise。"]]),
    od("too", 2, G("futeishi"), "「その知らせに彼は驚きのあまり一言も言えなかった。」", ["He", "was", "too", "surprised", "at the news", "to", "say", "a word"],
      "too 形 to do＝～すぎて…できない",
      [["構文", "「～のあまり…できない」＝{{too 形 to do}}。"], ["位置", "be surprised {{at}} ～ の at the news は形容詞のすぐあと。"]]),
    od("idea", 2, G("bunkei"), "「この本を読めば、その国の歴史がよくわかるだろう。」", ["This book", "will", "give", "you", "a good idea", "of", "the country's history"],
      "無生物主語＋give 人 a good idea of ～",
      [["発想", "「この本があなたに～の考えを与える」と考える。"], ["形", "give {{you}} {{a good idea of}} ～（SVOO）。"]]),
    od("incase", 1, G("setsuzokushi"), "「雨が降るといけないので傘を持っていきなさい。」", ["Take", "an umbrella", "with you", "in case", "it", "rains"],
      "in case S V＝～するといけないから",
      [["接続詞", "「～するといけないので」＝{{in case}}。"], ["時制", "in case 節の中は現在形 {{rains}}。"]]),
    od("matter", 2, G("setsuzokushi"), "「彼がその会議に出席するかどうかは問題ではない。」", ["It", "doesn't", "matter", "whether", "he", "attends", "the meeting"],
      "It doesn't matter whether ～",
      [["形式主語", "{{It}} doesn't matter ＋ whether 節。"], ["語法", "attend は他動詞。attend {{the meeting}}（to は不要）。"]]),
    od("had", 2, G("futeishi"), "「彼女は夫に車を洗ってもらった。」", ["She", "had", "her husband", "wash", "the car"],
      "have 人 原形＝人に～してもらう",
      [["使役", "{{have}} 人 ＋ {{原形}}＝人に～してもらう。"], ["不要な語", "to は使わない（get 人 to do なら to が要る）。"]], "to"),
    od("older", 3, G("hikaku"), "「年をとればとるほど、時がたつのが速く感じられる。」", ["The older", "we", "get,", "the faster", "time", "seems", "to pass"],
      "the 比較級 S V, the 比較級 S V",
      [["構文", "{{The older}} we get, {{the faster}} …。"], ["後半", "time {{seems to pass}}＝時がたつように思われる。"]]),
  ]),
  X(4, "seijo-b", G("domeishi"), "整序英作文（2）", L4, N4, 4, [
    od("without", 2, G("domeishi"), "「言うまでもなく、健康は富よりも大切だ。」", ["It", "goes", "without", "saying", "that", "health", "is more important", "than wealth"],
      "It goes without saying that ～",
      [["慣用表現", "「言うまでもなく」＝{{It goes without saying that}} ～。"], ["比較", "health {{is more important than}} wealth。"]]),
    od("supposed", 3, G("kandai"), "「私たちが乗るはずだった電車は、事故のため遅れた。」", ["The train", "we", "were supposed", "to take", "was delayed", "because of", "an accident"],
      "関係代名詞の省略＋be supposed to do",
      [["主語", "The train {{(that) we were supposed to take}}：目的格の関係代名詞を省いた形。"], ["述語", "{{was delayed}} because of an accident。"]]),
    od("worth", 2, G("domeishi"), "「その映画は十分見る価値がある。」", ["The movie", "is", "well", "worth", "seeing"],
      "be worth ～ing／強めは well",
      [["形", "be {{worth}} ～ing＝～する価値がある。"], ["強調", "worth を強めるのは {{well}}（very は使わない）。"]], "very"),
    od("which", 1, G("futeishi"), "「どちらの道を行けばいいか、彼女にたずねてみよう。」", ["Let's", "ask", "her", "which", "way", "to", "go"],
      "疑問詞＋to do",
      [["形", "ask 人 ＋ {{which way to go}}（疑問詞＋to do）。"], ["語順", "which のすぐあとに名詞 way。"]]),
    od("found", 2, G("bunkei"), "「この川で泳ぐのは危険だとわかった。」", ["I", "found", "it", "dangerous", "to", "swim", "in this river"],
      "find it 形 to do（形式目的語）",
      [["文型", "find O C の O に形式目的語 {{it}}。"], ["真の目的語", "{{to swim in this river}} を最後に置く。"]]),
    od("clear", 3, G("judo"), "「その事故の原因はまだ明らかにされていない。」", ["The cause", "of the accident", "has not", "been", "made", "clear", "yet"],
      "make O C の受け身＝be made C",
      [["もとの形", "make the cause clear（SVOC）。"], ["受け身", "The cause {{has not been made clear}} yet（現在完了の受け身）。"]]),
    od("hadi", 3, G("kateiho"), "「もう少し早く出発していたら、私は終電に間に合っただろうに。」", ["Had", "I", "left", "a little earlier,", "I'd", "have caught", "the last train"],
      "if の省略で倒置：Had S p.p.",
      [["倒置", "If I had left → {{Had I left}}（if を省いて倒置）。"], ["主節", "{{I'd (I would) have caught}} the last train。"]]),
  ]),
  X(4, "seijo-c", G("kandai"), "整序英作文（3）", L4, N4, 4, [
    od("through", 3, JUKUGO, "「彼女は何ごとも最後までやり遂げる人だ。」", ["She", "is", "the kind of person", "who", "always", "sees", "things", "through"],
      "see ～ through＝～をやり遂げる",
      [["骨組み", "She is the kind of person {{who}} …。"], ["熟語", "{{see things through}}：目的語を see と through ではさむ。always は一般動詞の前。"]]),
    od("walk", 2, G("meishi"), "「そのホテルは駅から歩いて5分のところにある。」", ["The hotel", "is", "a", "five-minute", "walk", "from", "the station"],
      "a five-minute walk（ハイフンでつなぐと単数）",
      [["表現", "「歩いて5分」＝{{a five-minute walk}}。"], ["注意", "ハイフンでつないだ形容詞の中の名詞は単数（minute）。"]]),
    od("what", 1, G("kandai"), "「彼の言ったことがまったく理解できなかった。」", ["I", "couldn't", "understand", "what", "he", "said", "at all"],
      "what S V＝S が V すること",
      [["目的語", "「彼が言ったこと」＝{{what he said}}。"], ["否定の強調", "not … {{at all}}＝まったく～ない（文末）。"]]),
    od("medicine", 2, G("bunkei"), "「この薬を飲めば、すぐに気分がよくなるでしょう。」", ["This medicine", "will", "make", "you", "feel", "better", "soon"],
      "無生物主語＋make 人 原形",
      [["発想", "「この薬があなたを気分よくさせる」。"], ["形", "{{make you feel better}}（make O 原形）。"]]),
    od("took", 2, G("futeishi"), "「彼は新しい環境に慣れるのに長い時間がかかった。」", ["It", "took", "him", "a long time", "to get used", "to", "the new environment"],
      "It takes 人 時間 to do",
      [["構文", "{{It took him a long time to}} do ～。"], ["熟語", "get used {{to}} 名詞（to は前置詞）。"]]),
    od("forced", 2, G("futeishi"), "「雨のせいで、私たちは試合を延期せざるを得なかった。」", ["The rain", "forced", "us", "to", "put off", "the game"],
      "force O to do＝O に～させる",
      [["発想", "「雨が私たちに延期させた」＝無生物主語。"], ["形", "{{force O to do}}、延期する＝{{put off}}。"]]),
    od("kinder", 2, G("hikaku"), "「私は彼女ほど親切な人に会ったことがない。」", ["I", "have never met", "a", "kinder", "person", "than", "her"],
      "never ～ a 比較級 名詞 than …＝最上級の意味",
      [["発想", "「彼女より親切な人に会ったことがない」と言いかえる。"], ["形", "have never met {{a kinder person than}} her。"]], "as"),
  ]),
];

// =====================================================================
// 第5問　文法・語法の空所補充
// =====================================================================

const L5 = "次の各英文の空所に入る最も適切なものを、それぞれ選べ。";
const N5 = "各問いは独立している。英文の空所は（　）で示す。";

const T5: ExamPoolSection[] = [
  X(5, "kuusho-a", G("kateiho"), "文法・語法（1）", L5, N5, 5, [
    ch("willhave", 2, G("kanryo"), "By the time you get there, the meeting (　).", ["will have ended", "ends", "has ended", "ended"], 0,
      ["正解。未来のある時点までの完了 → 未来完了。", "現在形では「着くまでに終わっている」の意味にならない。", "現在完了は未来の時点を基準にできない。", "過去形は未来の内容と合わない。"],
      "未来の時点までに完了 → will have p.p.",
      [["基準", "{{By the time you get there}}（あなたが着くころまでに）＝未来の時点。"], ["時制", "その時点までの完了 → {{will have ended}}。"]]),
    ch("rather", 3, G("kateiho"), "I'd rather you (　) smoke in this room.", ["didn't", "don't", "won't", "not"], 0,
      ["正解。would rather S 過去形＝S に～してほしい（仮定法）。", "would rather のあとの節は過去形にする。", "will は使わない。", "主語のあとに not だけを置くことはできない。"],
      "would rather S＋過去形（仮定法）",
      [["形", "{{I'd rather}} you ＋ {{過去形}}＝あなたに～してほしい。"], ["当てはめ", "「吸わないでほしい」→ you {{didn't}} smoke。"]]),
    ch("notuntil", 3, G("tokushu"), "Not until he lost his job (　) the value of money.", ["did he realize", "he realized", "he did realize", "realized he"], 0,
      ["正解。否定語句が文頭 → 疑問文の語順（倒置）。", "倒置していない。", "do の位置が誤り。", "一般動詞は主語の前に出さない。"],
      "否定語句が文頭 → 倒置",
      [["手がかり", "文頭の {{Not until}} ～。"], ["語順", "{{did he realize}}（助動詞＋主語＋原形）。"]]),
    ch("likely", 2, G("keiyoshi"), "She is (　) to pass the exam because she studies so hard.", ["likely", "probable", "possible", "certainly"], 0,
      ["正解。be likely to do＝～しそうだ。", "probable は It is probable that ～ の形で使い、人を主語にしない。", "possible も人を主語に to do をとらない。", "certainly は副詞で、be の補語にならない。"],
      "人が主語なら be likely to do",
      [["語法", "人 is {{likely to}} do は可。probable・possible は {{It is ～ that}} の形。"], ["品詞", "certainly は副詞なので不可。"]]),
    ch("number", 2, G("meishi"), "The number of tourists visiting the city (　) increasing every year.", ["is", "are", "have", "were"], 0,
      ["正解。主語は The number（数）で単数。", "are は複数の主語に使う。主語は tourists ではない。", "have では increasing と組み合わない。", "were は複数で、every year の現在の習慣とも合わない。"],
      "the number of ～は単数、a number of ～は複数",
      [["主語", "{{The number}} of tourists → 中心は number（単数）。"], ["区別", "{{A number of}} ～（たくさんの～）なら複数扱い。"]]),
    ch("hadit", 2, G("kateiho"), "(　) it not been for your help, I would have failed.", ["Had", "If", "Were", "Should"], 0,
      ["正解。If it had not been for ～ の if を省いた倒置。", "If なら If it had not been for となり、had が必要。", "Were it not for ～ は現在の仮定で、been と合わない。", "Should は未来の仮定で、been と合わない。"],
      "Had it not been for ～＝もし～がなかったら",
      [["手がかり", "主節 {{would have failed}}・空所のあと it not {{been}}。"], ["倒置", "If it had not been for → {{Had}} it not been for。"]]),
    ch("suggest", 2, G("kateiho"), "The doctor suggested that he (　) more exercise.", ["get", "got", "will get", "getting"], 0,
      ["正解。suggest that S (should) 原形。", "提案の内容には過去形を使わない。", "will は使わない。", "that 節に述語動詞が必要。"],
      "提案・要求の that 節は (should) 原形",
      [["動詞", "{{suggest}}・insist・demand などの that 節。"], ["形", "S ＋ {{(should) 原形}} → he get。"]]),
    ch("chain", 3, G("kandai"), "This is the house (　) I think was built a hundred years ago.", ["which", "where", "what", "whom"], 0,
      ["正解。which が was built の主語。I think はさしこまれた節。", "where のあとは完全な文が必要。was built の主語が欠けている。", "what は先行詞をとらない。", "whom は目的格で、主語の位置に入らない。"],
      "関係詞のあとの I think はかっこに入れる",
      [["見ぬく", "the house which (I think) {{was built}} ～：I think を外す。"], ["格", "was built の主語 → 主格 {{which}}。"]]),
  ]),
  X(5, "kuusho-b", G("domeishi"), "文法・語法（2）", L5, N5, 5, [
    ch("theother", 1, G("daimeishi"), "I have two brothers; one lives in Tokyo, and (　) lives in Osaka.", ["the other", "another", "other", "others"], 0,
      ["正解。2人のうちの残りの1人は the other。", "another は不特定の「もう1つ」で、2人のうちの残りには使わない。", "other は単独で主語にならない。", "others は複数。"],
      "2つのうち one … the other …",
      [["数", "{{two}} brothers → 残りは決まった1人。"], ["形", "one … {{the other}} …。"]]),
    ch("hightime", 2, G("kateiho"), "It is high time you (　) to bed.", ["went", "go", "will go", "have gone"], 0,
      ["正解。It is (high) time S 過去形＝もう～してよいころだ。", "この構文では過去形を使う。", "will は使わない。", "現在完了は使わない。"],
      "It is high time S＋過去形",
      [["構文", "{{It is high time}} ＋ S ＋ {{過去形}}。"], ["当てはめ", "you {{went}} to bed＝もう寝る時間だ。"]]),
    ch("usedto", 2, G("domeishi"), "He is used to (　) up early.", ["getting", "get", "be got", "have got"], 0,
      ["正解。be used to ～ing＝～に慣れている（to は前置詞）。", "used to 原形は「以前は～した」で、be の後ろには来ない。", "受け身の意味にならない。", "完了形は合わない。"],
      "be used to ～ing／used to 原形",
      [["見分け", "{{be}} used to の to は前置詞 → {{～ing}}。"], ["区別", "be のない used to ＋原形＝以前は～したものだ。"]]),
    ch("tag", 2, G("tokushu"), "Hardly anyone came to the party, (　)?", ["did they", "didn't they", "came they", "doesn't he"], 0,
      ["正解。hardly は否定語なので、付加疑問は肯定。anyone は they で受ける。", "本文が否定の意味なので、付加疑問は肯定。", "一般動詞は付加疑問に使わない。", "時制・主語が合わない。"],
      "否定の文には肯定の付加疑問",
      [["否定語", "{{Hardly}} anyone came → 否定文。"], ["付加疑問", "肯定の {{did they}}（anyone は they で受ける）。"]]),
    ch("better", 1, G("hikaku"), "The more you practice, (　) you will become.", ["the better", "better", "the best", "more better"], 0,
      ["正解。the 比較級 …, the 比較級 …。", "the が足りない。", "最上級は使わない。", "more better は二重の比較級で誤り。"],
      "the 比較級, the 比較級",
      [["前半", "{{The more}} you practice。"], ["後半", "{{the better}} you will become。"]]),
    ch("asif", 1, G("kateiho"), "She speaks English (　) she were a native speaker.", ["as if", "even if", "only if", "if only"], 0,
      ["正解。as if S were ～＝まるで～であるかのように。", "even if は「たとえ～でも」で意味が合わない。", "only if は「～の場合に限り」。", "if only は「～でありさえすれば」で文頭で使う。"],
      "as if＋仮定法＝まるで～のように",
      [["手がかり", "{{were}}（仮定法）。"], ["意味", "「まるでネイティブのように話す」→ {{as if}}。"]]),
    ch("spokento", 2, G("judo"), "I'm not used to being spoken (　) like that.", ["to", "at", "for", "with"], 0,
      ["正解。speak to 人 の受け身 → be spoken to。", "speak at は「～で話す」で受け身にならない。", "speak for は「代弁する」。", "speak with は「話し合う」で、ここでは合わない。"],
      "群動詞の受け身は前置詞を残す",
      [["もとの形", "people {{speak to}} me like that。"], ["受け身", "I am {{spoken to}}。前置詞 to を残す。"]]),
    ch("seen", 2, G("bunshikobun"), "(　) from the hill, the town looks like a toy.", ["Seen", "Seeing", "To see", "Having seen"], 0,
      ["正解。町は「見られる」側なので過去分詞の分詞構文。", "Seeing だと町が「見る」ことになる。", "不定詞では「見るために」となり意味が通らない。", "Having seen も町が見る側になる。"],
      "分詞構文の意味上の主語は文の主語",
      [["主語", "文の主語は {{the town}}。"], ["関係", "町は丘から「見られる」→ 過去分詞 {{Seen}}。"]]),
  ]),
  X(5, "kuusho-c", G("tokushu"), "文法・語法（3）", L5, N5, 5, [
    ch("itwas", 2, G("tokushu"), "It was not until yesterday (　) I heard the news.", ["that", "when", "which", "then"], 0,
      ["正解。It is not until ～ that …＝～になってはじめて…。", "強調構文の that の位置に when は使わない。", "which は関係代名詞で合わない。", "then は接続詞ではない。"],
      "It is not until ～ that …（強調構文）",
      [["構文", "{{It was not until}} yesterday {{that}} …。"], ["意味", "昨日になってはじめて知らせを聞いた。"]]),
    ch("canthave", 2, G("jodoshi"), "You (　) have seen her yesterday; she was in London then.", ["can't", "mustn't", "shouldn't", "needn't"], 0,
      ["正解。can't have p.p.＝～したはずがない。", "mustn't have p.p. は過去の推量に使わない。", "shouldn't have p.p. は「～すべきではなかった」。", "needn't have p.p. は「～する必要はなかったのに」。"],
      "can't have p.p.＝～したはずがない",
      [["根拠", "{{she was in London then}}＝その時ロンドンにいた。"], ["推量", "見たはずがない → {{can't have seen}}。"]]),
    ch("mind", 1, G("domeishi"), "Would you mind (　) the window?", ["opening", "to open", "open", "opened"], 0,
      ["正解。mind は動名詞を目的語にとる。", "mind は不定詞をとらない。", "原形は置けない。", "過去分詞は置けない。"],
      "mind・enjoy・finish は ～ing",
      [["語法", "{{mind}} のあとは {{動名詞}}。"], ["意味", "Would you mind opening ～?＝～を開けていただけませんか。"]]),
    ch("much", 1, G("hikaku"), "He is (　) taller than his brother.", ["much", "very", "more", "so"], 0,
      ["正解。比較級の強調は much（far・even なども）。", "very は比較級を強めない。", "more taller は誤り。", "so は比較級を強めない。"],
      "比較級の強調は much・far・even",
      [["形", "{{much}} ＋比較級。"], ["注意", "{{very}} は原級・最上級（the very best）に使う。"]]),
    ch("beingbuilt", 3, G("bunshi"), "The bridge (　) now will be completed next year.", ["being built", "building", "built", "to build"], 0,
      ["正解。今「建設されている最中の」→ 受け身の進行。", "building だと橋が何かを建てることになる。", "built は「建てられた」で now・will be completed と合わない。", "to build は「建てるべき」で受け身にならない。"],
      "being p.p.＝～されている最中の",
      [["関係", "橋は「建てられる」側。"], ["時", "{{now}}・来年完成 → 建設中 {{being built}}。"]]),
    ch("despite", 1, G("zenchishi"), "(　) all his efforts, he failed the exam.", ["Despite", "Although", "However", "Because"], 0,
      ["正解。despite＋名詞＝～にもかかわらず。", "Although は接続詞で、あとに S V が必要。", "However は副詞で、名詞を直接とらない。", "Because は接続詞で意味も合わない。"],
      "前置詞 despite＋名詞／接続詞 although＋S V",
      [["後ろ", "{{all his efforts}}（名詞句）。"], ["品詞", "名詞をとるのは前置詞 {{Despite}}。"]]),
    ch("withoutsay", 1, G("domeishi"), "She left the room without (　) a word.", ["saying", "say", "said", "to say"], 0,
      ["正解。前置詞 without のあとは動名詞。", "原形は置けない。", "過去形は置けない。", "前置詞のあとに不定詞は置けない。"],
      "前置詞のあとは動名詞",
      [["品詞", "without は {{前置詞}}。"], ["形", "without {{saying}} a word＝一言も言わずに。"]]),
    ch("nonrestr", 2, G("kandai"), "Tom, (　) is a good cook, often makes dinner for us.", ["who", "that", "which", "whom"], 0,
      ["正解。コンマのある非制限用法で、人の主格 → who。", "that は非制限用法（コンマのあと）に使えない。", "which は人以外。", "whom は目的格。"],
      "コンマのあとに that は使えない",
      [["用法", "Tom, (　) … → {{非制限用法}}。"], ["格", "is の主語・人 → {{who}}。that は不可。"]]),
  ]),
];

// =====================================================================
// 第6問　誤り指摘
// =====================================================================

const L6 = "次の各英文の下線部①〜④のうち、文法・語法上の誤りを含むものを1つずつ選べ。";
const N6 = "下線部は ①〜④ の番号のあとの語句。各問いは独立している。";
const E6 = "下線部①〜④のうち、誤りを含むものを選べ。\n";

const T6: ExamPoolSection[] = [
  X(6, "ayamari-a", G("meishi"), "誤り指摘（1）", L6, N6, 4, [
    ch("info", 1, G("meishi"), E6 + "The information ①which you gave me ②were very ③useful ④for my research.", ["① which you gave me", "② were", "③ useful", "④ for my research"], 1,
      ["目的格の関係代名詞 which で正しい。", "正解。information は数えられない名詞で単数扱い → was。", "be useful で正しい。", "for my research で正しい。"],
      "information・advice は単数扱い",
      [["主語", "The {{information}} … が主語。which you gave me は修飾。"], ["一致", "不可算名詞は単数 → {{was}}。"]]),
    ch("since", 1, G("kanryo"), E6 + "She ①has lived in this town ②since ten years, and she ③knows ④almost everyone here.", ["① has lived", "② since ten years", "③ knows", "④ almost everyone"], 1,
      ["継続の現在完了で正しい。", "正解。期間には for → for ten years。", "know は状態動詞で現在形でよい。", "almost everyone で正しい（almost all people も可）。"],
      "since＋起点、for＋期間",
      [["見分け", "ten years は {{期間}}。"], ["訂正", "since → {{for}} ten years。"]]),
    ch("although", 1, G("setsuzokushi"), E6 + "①Although he was tired, ②but he ③kept working until he ④finished the report.", ["① Although", "② but", "③ kept working", "④ finished"], 1,
      ["正しい。", "正解。although と but は同時に使わない。but を消す。", "keep ～ing で正しい。", "until 節の過去形で正しい。"],
      "although と but は重ねない",
      [["接続詞", "{{Although}} S V, S V。"], ["誤り", "接続詞が2つ → {{but}} が不要。"]]),
    ch("forward", 1, G("domeishi"), E6 + "I ①look forward to ②hear from you ③as soon as ④possible.", ["① look forward to", "② hear", "③ as soon as", "④ possible"], 1,
      ["正しい。", "正解。look forward to の to は前置詞 → hearing。", "as soon as possible で正しい。", "正しい。"],
      "look forward to ～ing",
      [["to の正体", "look forward {{to}} の to は前置詞。"], ["訂正", "hear → {{hearing}}。"]]),
    ch("enough", 2, G("keiyoshi"), E6 + "The children ①were enough excited ②to stay up late ③on the night ④before the trip.", ["① were enough excited", "② to stay up", "③ on the night", "④ before the trip"], 0,
      ["正解。enough は形容詞のうしろ → excited enough。", "enough … to do の to で正しい。", "特定の夜は on で正しい。", "正しい。"],
      "形容詞＋enough to do",
      [["語順", "副詞の enough は {{形容詞・副詞のうしろ}}。"], ["訂正", "{{excited enough}} to stay up late。"]]),
    ch("every", 1, G("meishi"), E6 + "①Every student ②in this class ③have to submit ④an essay by Friday.", ["① Every student", "② in this class", "③ have to", "④ an essay"], 2,
      ["every＋単数名詞で正しい。", "正しい。", "正解。every は単数扱い → has to。", "正しい。"],
      "every・each＋単数名詞は単数扱い",
      [["主語", "{{Every student}} → 単数。"], ["訂正", "have → {{has}} to submit。"]]),
    ch("suggestme", 2, G("waho"), E6 + "He ①suggested me ②that we ③should take ④a taxi.", ["① suggested me", "② that", "③ should take", "④ a taxi"], 0,
      ["正解。suggest は「人に」を直接目的語にしない → suggested (to me) that ～。", "that 節で正しい。", "提案の that 節の should で正しい。", "正しい。"],
      "suggest 人 that ～ は誤り",
      [["語法", "suggest は {{SVOO をとらない}}。"], ["訂正", "He suggested {{(to me)}} that we should ～。"]]),
  ]),
  X(6, "ayamari-b", G("waho"), "誤り指摘（2）", L6, N6, 4, [
    ch("ifwill", 1, G("jisei"), E6 + "①If it will rain tomorrow, we ②will have to ③put off the picnic ④until next week.", ["① If it will rain", "② will have to", "③ put off", "④ until next week"], 0,
      ["正解。条件の副詞節は未来でも現在形 → If it rains。", "主節の未来で正しい。", "put off＝延期するで正しい。", "正しい。"],
      "条件の if 節は未来でも現在形",
      [["節の種類", "If ～ は {{条件の副詞節}}。"], ["訂正", "will rain → {{rains}}。"]]),
    ch("gone", 2, G("kanryo"), E6 + "My father ①has gone to Hokkaido ②three times, and he ③wants to ④go there again.", ["① has gone", "② three times", "③ wants to", "④ go there"], 0,
      ["正解。経験は have been to。have gone to は「行ってしまって今いない」。", "回数で正しい。", "正しい。", "go there（there に to は不要）で正しい。"],
      "経験は have been to",
      [["手がかり", "{{three times}}（回数）→ 経験。"], ["訂正", "has gone → {{has been}}。"]]),
    ch("most", 1, G("meishi"), E6 + "①Most of the students ②in the class ③was absent ④because of the flu.", ["① Most of the students", "② in the class", "③ was absent", "④ because of"], 2,
      ["正しい。", "正しい。", "正解。most of ＋複数名詞は複数扱い → were。", "because of＋名詞で正しい。"],
      "most of ～ の数は of のあとの名詞で決まる",
      [["主語", "Most of {{the students}}（複数）。"], ["訂正", "was → {{were}}。"]]),
    ch("married", 2, G("zenchishi"), E6 + "She ①is married with ②a doctor who ③works at ④a hospital in Kobe.", ["① is married with", "② a doctor", "③ works at", "④ a hospital"], 0,
      ["正解。「～と結婚している」は be married to ～。", "正しい。", "正しい。", "正しい。"],
      "be married to 人＝人と結婚している",
      [["前置詞", "be married {{to}} 人。"], ["関連", "marry 人（前置詞なし）＝人と結婚する。"]]),
    ch("interested", 1, G("bunshi"), E6 + "The book ①was so ②interested that I ③read it ④in one night.", ["① was so", "② interested", "③ read it", "④ in one night"], 1,
      ["so … that で正しい。", "正解。本が「興味をおこさせる」→ interesting。", "過去形の read で正しい。", "正しい。"],
      "物は interesting、人は interested",
      [["主語", "The {{book}}（物）。"], ["訂正", "interested → {{interesting}}。"]]),
    ch("discuss", 1, G("waho"), E6 + "We ①discussed about ②the problem ③for two hours ④without reaching a conclusion.", ["① discussed about", "② the problem", "③ for two hours", "④ without reaching"], 0,
      ["正解。discuss は他動詞 → discussed the problem。", "正しい。", "正しい。", "without ～ing で正しい。"],
      "discuss・enter・reach は他動詞",
      [["語法", "{{discuss}} は他動詞。"], ["訂正", "about を消す。"]]),
    ch("reached", 2, G("waho"), E6 + "He ①reached to ②the station ③just as the train ④was leaving.", ["① reached to", "② the station", "③ just as", "④ was leaving"], 0,
      ["正解。reach は他動詞 → reached the station。", "正しい。", "just as＝ちょうど～するときで正しい。", "過去進行形で正しい。"],
      "reach＝arrive at／get to",
      [["語法", "{{reach}} は他動詞（前置詞なし）。"], ["言いかえ", "arrive {{at}}／get {{to}} the station なら前置詞が要る。"]]),
  ]),
  X(6, "ayamari-c", G("bunshikobun"), "誤り指摘（3）", L6, N6, 4, [
    ch("having", 2, G("bunshikobun"), E6 + "①Having been finished the work, she ②went home ③and ④took a long bath.", ["① Having been finished", "② went home", "③ and", "④ took a long bath"], 0,
      ["正解。彼女が仕事を「終えた」→ 能動の Having finished。", "正しい。", "正しい。", "take a bath で正しい。"],
      "分詞構文の能動・受動は主語との関係で決める",
      [["関係", "she が the work を {{終えた}}（能動）。"], ["訂正", "{{Having finished}} the work。"]]),
    ch("furniture", 1, G("meishi"), E6 + "There ①is too much ②furnitures in ③this small room, so it ④looks crowded.", ["① is too much", "② furnitures", "③ this small room", "④ looks crowded"], 1,
      ["数えられない名詞に much・is を使っていて正しい。", "正解。furniture は数えられない名詞で、複数形にしない → furniture。", "正しい。", "look＋形容詞で正しい。"],
      "furniture・baggage は不可算",
      [["名詞", "{{furniture}} は数えられない（much・is と合う）。"], ["訂正", "furnitures → {{furniture}}。"]]),
    ch("sincewere", 2, G("kanryo"), E6 + "I ①have known him ②since we ③have been children, and he ④has never lied to me.", ["① have known", "② since", "③ have been", "④ has never lied"], 2,
      ["継続の現在完了で正しい。", "since＋起点で正しい。", "正解。since 節は過去の時点 → were children。", "経験の現在完了で正しい。"],
      "since 節の中は過去形",
      [["since 節", "起点を表すので {{過去形}}。"], ["訂正", "have been → {{were}}。"]]),
    ch("madeto", 1, G("futeishi"), E6 + "The teacher ①made us ②to rewrite ③our essays ④before the deadline.", ["① made us", "② to rewrite", "③ our essays", "④ before the deadline"], 1,
      ["正しい。", "正解。使役の make O 原形 → rewrite。", "正しい。", "正しい。"],
      "make O 原形（能動態では to なし）",
      [["使役", "{{make}} O {{原形}}。"], ["訂正", "to を消して rewrite。"]]),
    ch("good", 1, G("keiyoshi"), E6 + "①Although the weather was bad, the game ②was not cancelled ③and the players ④played very good.", ["① Although", "② was not cancelled", "③ and", "④ played very good"], 3,
      ["正しい。", "受け身で正しい。", "正しい。", "正解。動詞 played を修飾するのは副詞 → very well。"],
      "動詞を修飾するのは副詞",
      [["修飾先", "{{played}}（動詞）。"], ["訂正", "good（形容詞）→ {{well}}（副詞）。"]]),
    ch("readed", 1, G("kanryo"), E6 + "This is ①the most interesting book ②that I ③have ever ④readed.", ["① the most interesting", "② that", "③ have ever", "④ readed"], 3,
      ["最上級で正しい。", "最上級の先行詞には that がよく使われる。", "経験の ever で正しい。", "正解。read の過去分詞は read（readed という形はない）。"],
      "read-read-read（不規則変化）",
      [["形", "read は {{不規則動詞}}。"], ["訂正", "readed → {{read}}。"]]),
    ch("indirect", 2, G("tokushu"), E6 + "She ①asked me ②where ③did I live and ④what I did.", ["① asked me", "② where", "③ did I live", "④ what I did"], 2,
      ["ask 人 ＋疑問詞節で正しい。", "正しい。", "正解。間接疑問は平叙文の語順 → where I lived。", "平叙文の語順で正しい。"],
      "間接疑問は S V の語順",
      [["見分け", "文の中の疑問詞節＝{{間接疑問}}。"], ["訂正", "did I live → {{I lived}}。"]]),
  ]),
];

// =====================================================================
// 第7問　長文の空所補充
// =====================================================================

const L7 = "次の英文を読み、空所( 1 )〜( 9 )に入る最も適切なものを、それぞれ選べ。";
const B = (n: number) => `空所( ${n} )に入る最も適切なものを選べ。`;

const T7: ExamPoolSection[] = [
  R(
    7,
    "fill-sleep",
    CHOBUN,
    "睡眠と学習",
    L7,
    "Why Sleep Matters for Learning",
    `For a long time, sleep was regarded as a period of rest in which the brain simply switched off. Students preparing for exams often ( 1 ) sleep in order to study longer, believing that every extra hour at the desk would improve their results. Research over the past few decades, however, suggests that this strategy may do more harm than good.

When we learn something new, the memory is at first fragile. It can easily be ( 2 ) by new information, or it may simply fade away. During sleep, the brain appears to replay the experiences of the day and to strengthen the connections that hold important memories together. In one type of experiment, volunteers learn a list of words or a simple skill, and then some of them sleep while others stay awake for the same length of time. When both groups are tested later, those who slept usually perform ( 3 ).

Sleep does not only protect memories; it also seems to help organize them. People who have slept after learning are sometimes better at noticing hidden patterns in the material, ( 4 ) they were not aware of these patterns before going to bed. This suggests that the sleeping brain is not merely storing information but also working on it.

( 5 ), losing sleep has clear costs. After a night with little or no sleep, people find it harder to concentrate, and their ability to take in new information drops. A student who stays up all night may arrive at the exam with knowledge that is poorly ( 6 ) and a mind that is too tired to use it well.

None of this means that sleep can replace study. Memories cannot be strengthened if they were never formed ( 7 ). The point is that learning and sleep work together. Regular study spread over several days, ( 8 ) by enough sleep each night, tends to produce better results than the same amount of study crammed into a single night.

For schools and families, the lesson is a practical one. Instead of treating sleep as time taken away from learning, we might ( 9 ) it as part of the learning process itself.`,
    6,
    [
      ch("b1", 1, VOCAB, B(1), ["sacrifice", "enjoy", "prefer", "extend"], 0,
        ["正解。長く勉強するために睡眠を「犠牲にする」。in order to study longer と合う。", "睡眠を楽しむのでは、勉強時間を長くすることにならない。", "睡眠を好むのでは、勉強時間を延ばす目的と合わない。", "睡眠を延ばすと勉強時間は短くなり、目的と逆。"],
        "in order to 以下の目的と合う動詞",
        [["目的", "{{in order to study longer}}（もっと長く勉強するために）。"], ["結論", "そのためには睡眠を {{sacrifice}}（削る）。"]]),
      ch("b2", 2, VOCAB, B(2), ["disturbed", "improved", "repeated", "recorded"], 0,
        ["正解。できたての記憶は弱く、新しい情報に「かき乱される」。fragile と合う。", "改善されるのでは fragile（もろい）の説明にならない。", "新しい情報によって「くり返される」は意味が通らない。", "新しい情報によって「記録される」は意味が通らない。"],
        "fragile（もろい）の具体的な説明",
        [["前の文", "the memory is at first {{fragile}}（もろい）。"], ["並び", "… or it may simply {{fade away}} と並ぶ悪い変化 → {{disturbed}}。"]]),
      ch("b3", 1, CHOBUN, B(3), ["better", "worse", "later", "less"], 0,
        ["正解。睡眠が記憶を強めるという段落の内容と合う。", "眠った人のほうが悪いのでは、段落の主張と逆。", "テストの出来の比較にならない。", "perform less は「実行する量が少ない」で、成績の比較として不自然。"],
        "段落の主張（睡眠が記憶を強める）を結果に当てはめる",
        [["主張", "睡眠中に脳は {{strengthen the connections}}。"], ["結果", "眠ったグループの成績は {{better}}。"]]),
      ch("b4", 2, G("setsuzokushi"), B(4), ["even though", "because", "so that", "unless"], 0,
        ["正解。寝る前には気づいていなかった「にもかかわらず」、眠ったあとに気づく。", "気づいていなかったことは、気づく理由にならない。", "目的の意味にならない。", "「気づいていない限り」では意味が通らない。"],
        "予想に反する内容をつなぐのは譲歩",
        [["内容", "眠ったあと隠れたパターンに気づく ⇔ 寝る前は {{気づいていなかった}}。"], ["接続", "逆の内容 → {{even though}}。"]]),
      ch("b5", 2, CHOBUN, B(5), ["By contrast", "For instance", "Similarly", "Otherwise"], 0,
        ["正解。睡眠の利点（前の段落）から、睡眠不足の害へと対比している。", "前の内容の例ではない。", "睡眠の利点と睡眠不足の害は「同様」ではない。", "「さもなければ」では文がつながらない。"],
        "利点 ⇔ 害の対比",
        [["前の段落", "睡眠は記憶を守り、整理する（{{利点}}）。"], ["この段落", "losing sleep has clear {{costs}} → 対比の {{By contrast}}。"]]),
      ch("b6", 2, CHOBUN, B(6), ["organized", "avoided", "shared", "tested"], 0,
        ["正解。第3段落の help organize them を受け、眠らないと知識が「整理されない」。", "知識が「避けられる」は意味が通らない。", "知識が「共有される」は文脈と関係がない。", "知識が「試される」は試験の前の状態の説明にならない。"],
        "前の段落のキーワードを受ける",
        [["手がかり", "第3段落 sleep … seems to help {{organize}} them。"], ["当てはめ", "徹夜の学生の知識は poorly {{organized}}。"]]),
      ch("b7", 2, JUKUGO, B(7), ["in the first place", "at last", "by chance", "for good"], 0,
        ["正解。in the first place＝そもそも。そもそも記憶ができていなければ強められない。", "「ついに」では意味が通らない。", "「偶然に」では意味が通らない。", "for good＝永久に。意味が通らない。"],
        "in the first place＝そもそも",
        [["文の意味", "強めるには、まず記憶が {{形成されていなければならない}}。"], ["熟語", "「そもそも」＝{{in the first place}}。"]]),
      ch("b8", 3, G("bunshikobun"), B(8), ["supported", "prevented", "replaced", "interrupted"], 0,
        ["正解。十分な睡眠に「支えられた」数日間の学習。learning and sleep work together と合う。", "睡眠に「妨げられた」では主張と逆。", "睡眠に「取ってかわられた」では sleep can't replace study と矛盾する。", "睡眠に「中断された」では主張と合わない。"],
        "過去分詞の句が study を修飾",
        [["形", "Regular study …, ({{過去分詞}}) by enough sleep, tends to …。"], ["意味", "睡眠と学習は {{work together}} → {{supported}}。"]]),
      ch("b9", 2, G("waho"), B(9), ["regard", "ignore", "spend", "avoid"], 0,
        ["正解。regard A as B＝AをBとみなす。", "ignore A as B という形はない。", "spend は時間・お金を使う。as B とは結ばない。", "avoid A as B という形はない。"],
        "regard A as B＝AをBとみなす",
        [["形", "( 9 ) it {{as}} part of …。"], ["語法", "目的語のあとに as をとる → {{regard}}。treating A as B と対になる。"]]),
    ],
  ),
  R(
    7,
    "fill-library",
    CHOBUN,
    "公共図書館の役割",
    L7,
    "Do We Still Need Libraries?",
    `In an age when almost any book can be ordered online and much information can be found with a few clicks, some people ask whether public libraries are still necessary. The question is understandable, but it ( 1 ) what libraries actually do.

Libraries have always been more than places that store books. They are among the few indoor public spaces where anyone may enter and stay without being expected to buy anything. For a student whose home is crowded and noisy, a library may be the only quiet place to study. For an elderly person living alone, a regular visit may be one of the few ( 2 ) for conversation in the week.

In recent years, many libraries have also taken on new roles. They help people fill out official forms online, offer classes in using computers, and provide free internet access to those who cannot ( 3 ) it at home. In this sense, the spread of digital technology has not made libraries less important. ( 4 ), it has created new needs that libraries are well placed to meet.

Of course, libraries face real difficulties. Budgets have been cut in many places, and some branches have had to shorten their opening hours or close altogether. When a library closes, the people who ( 5 ) it most are often those with the fewest alternatives: children, older people, and families with low incomes.

Some communities have responded creatively. In one town, volunteers keep a small branch open in the evenings; in another, the library shares a building with a health center, ( 6 ) visitors can borrow a book and see a nurse on the same trip. Such arrangements show that a library's value depends ( 7 ) on the size of its collection than on its connection to the people around it.

The library of the future may contain fewer printed books than the libraries of the past. ( 8 ) it remains a place that is open to all, free of charge, and welcoming to those who have nowhere else to go, it will continue to ( 9 ) a purpose that no website can fully replace.`,
    6,
    [
      ch("b1", 2, VOCAB, B(1), ["overlooks", "answers", "explains", "repeats"], 0,
        ["正解。その疑問は図書館が実際にしていることを「見落としている」。but のあとの批判と合う。", "疑問が図書館の役割に「答える」では but と合わない。", "疑問が図書館の役割を「説明する」では but と合わない。", "「くり返す」では意味が通らない。"],
        "but のあとは前の内容への批判",
        [["接続", "understandable, {{but}} … → 疑問への批判。"], ["本文全体", "このあと図書館の多くの役割が述べられる → 疑問はそれを {{overlooks}}。"]]),
      ch("b2", 1, VOCAB, B(2), ["opportunities", "obstacles", "costs", "rules"], 0,
        ["正解。一人暮らしの高齢者にとって、会話の数少ない「機会」。", "会話の「障害」では、図書館の利点にならない。", "会話の「費用」では意味が通らない。", "会話の「規則」では意味が通らない。"],
        "図書館の利点を述べる段落",
        [["段落", "図書館は {{store books}} 以上の場所 → 利点の列挙。"], ["当てはめ", "one of the few {{opportunities}} for conversation。"]]),
      ch("b3", 1, VOCAB, B(3), ["afford", "allow", "refuse", "lend"], 0,
        ["正解。家でインターネットを使う余裕がない人へ、無料で提供する。free と合う。", "allow it at home では「何を許すか」が通らない。", "「拒む人」に提供するのでは意味が通らない。", "lend it at home では意味が通らない。"],
        "cannot afford ～＝～の余裕がない",
        [["手がかり", "{{free}} internet access。"], ["語法", "cannot {{afford}} ～＝（お金の面で）～をもつ余裕がない。"]]),
      ch("b4", 2, CHOBUN, B(4), ["On the contrary", "As a result", "For example", "In short"], 0,
        ["正解。「重要でなくなったのではない。それどころか新たな必要を生んだ」。否定のあとを強める。", "前の文の結果ではない。", "具体例ではない。", "要約ではない。"],
        "否定文のあとの On the contrary＝それどころか",
        [["前の文", "has {{not}} made libraries less important（否定）。"], ["つなぎ", "否定を受けて逆を強める → {{On the contrary}}。"]]),
      ch("b5", 1, JUKUGO, B(5), ["depend on", "give up", "look down on", "take after"], 0,
        ["正解。図書館に最も「頼っている」人が、ほかの選択肢が最も少ない人。", "図書館を「あきらめる」人では文意が通らない。", "「見下す」では意味が通らない。", "take after は「似ている」。"],
        "depend on ～＝～に頼る",
        [["手がかり", "those with the {{fewest alternatives}}（ほかに選択肢が少ない人）。"], ["熟語", "図書館に最も {{depend on}} する人。"]]),
      ch("b6", 2, G("setsuzokushi"), B(6), ["so that", "unless", "even if", "as though"], 0,
        ["正解。同じ建物にあるので、一度の外出で本も借りられ看護師にも会える（結果）。", "「～しない限り」では意味が通らない。", "「たとえ～でも」では意味が通らない。", "「まるで～のように」では意味が通らない。"],
        "so that ～＝その結果～できる・～できるように",
        [["前半", "図書館が健康センターと {{同じ建物}}。"], ["後半", "一度の外出で両方 → {{so that}}（～できるように）。"]]),
      ch("b7", 3, G("hikaku"), B(7), ["less", "more", "much", "little"], 0,
        ["正解。価値は蔵書の量よりも、人とのつながりによる。ボランティア・健康センターの例と合う。", "more だと「蔵書の量によるほうが大きい」となり、例と逆。", "much は than と組まない。", "little は than と組まない。"],
        "depend less on A than on B＝AよりもBによる",
        [["形", "空所のあとに {{than}} → 比較級。"], ["意味", "例はどれも人とのつながり → 蔵書の量には {{less}}。"]]),
      ch("b8", 2, G("setsuzokushi"), B(8), ["As long as", "Unless", "Before", "Until"], 0,
        ["正解。だれにでも開かれた場所であり続ける「かぎり」、役割を果たし続ける。", "「～でない限り」では意味が逆。", "「～する前に」では意味が通らない。", "「～するまで」では continue と合わない。"],
        "as long as ～＝～するかぎりは（条件）",
        [["条件", "{{remains}} a place that is open to all（あり続ける）。"], ["結論", "it will {{continue}} … → 条件の {{As long as}}。"]]),
      ch("b9", 1, JUKUGO, B(9), ["serve", "make", "take", "pay"], 0,
        ["正解。serve a purpose＝役目を果たす。", "make a purpose とは言わない。", "take a purpose とは言わない。", "pay a purpose とは言わない。"],
        "serve a purpose＝役目を果たす",
        [["連語", "{{serve a purpose}}。"], ["意味", "どのウェブサイトも完全には代われない役目を果たし続ける。"]]),
    ],
  ),
  R(
    7,
    "fill-boredom",
    CHOBUN,
    "退屈の効用",
    L7,
    "The Value of Boredom",
    `Few people enjoy being bored. When we have nothing to do, we quickly ( 1 ) for our phones, check our messages, or look for something to watch. Modern technology has made it possible to avoid boredom almost completely. Yet some psychologists argue that this may not be entirely a good thing.

Boredom is an uncomfortable feeling, but discomfort often has a purpose. Just as hunger tells us to eat, boredom may tell us that our current activity is not ( 2 ) our attention and that we should look for something more meaningful. In this sense, boredom can push us to change our situation, to set new goals, or to try something we have never done before.

There is also evidence that a wandering mind can be ( 3 ). In some studies, people who first performed a dull task, such as copying numbers from a list, later came up with more ideas in a creative test than people who had not been bored. One explanation is that when the mind is not ( 4 ) by outside stimulation, it begins to make connections of its own.

If this is true, the habit of filling every spare moment with a screen may have a hidden cost. Waiting for a bus or standing in line used to give people a few minutes ( 5 ) their thoughts could drift. Now those minutes are quickly filled with news, games, and short videos. We are ( 6 ) bored, but we may also be giving our minds fewer chances to wander.

This does not mean that we should seek out boredom for ( 7 ) own sake, or that all dull moments are secretly valuable. Long periods of boredom, especially at work or school, can lower motivation and even lead to unhealthy behavior. The point is simply ( 8 ) occasional moments without stimulation are not necessarily wasted.

Perhaps the next time we feel bored, we might wait a little before reaching for a screen. What ( 9 ) in those quiet minutes may surprise us.`,
    6,
    [
      ch("b1", 1, JUKUGO, B(1), ["reach", "call", "care", "stand"], 0,
        ["正解。reach for ～＝～に手を伸ばす。最終段落の reaching for a screen とも合う。", "call for は「要求する」で意味が合わない。", "care for は「世話をする・好む」で、quickly と合わない。", "stand for は「表す」。"],
        "reach for ～＝～に手を伸ばす",
        [["熟語", "{{reach for}} our phones＝スマホに手を伸ばす。"], ["確認", "最終段落の before {{reaching for}} a screen と同じ表現。"]]),
      ch("b2", 2, G("keiyoshi"), B(2), ["worth", "worthy", "valuable", "important"], 0,
        ["正解。be worth ～＝～の価値がある（名詞を直接とる）。", "worthy は worthy of ～ の形で、of が必要。", "valuable は名詞を直接とらない。", "important は名詞を直接とらない。"],
        "worth は前置詞のように名詞をとる",
        [["形", "is not ( 2 ) {{our attention}}：形容詞のあとに名詞が直接続く。"], ["語法", "名詞を直接とるのは {{worth}}。worthy は {{of}} が要る。"]]),
      ch("b3", 2, CHOBUN, B(3), ["useful", "dangerous", "harmful", "empty"], 0,
        ["正解。退屈したあとのほうが多くのアイデアを出した、という研究と合う。", "研究の結果（創造性が高まる）と逆。", "研究の結果と逆。", "「空っぽ」では、続く研究の説明にならない。"],
        "続く研究（具体例）から判断する",
        [["研究", "退屈した人は {{came up with more ideas}}。"], ["結論", "さまよう心は {{useful}} になりうる。"]]),
      ch("b4", 2, VOCAB, B(4), ["occupied", "bored", "surprised", "damaged"], 0,
        ["正解。心が外からの刺激で「ふさがれて」いないとき、自分でつながりを作りはじめる。", "「外からの刺激で退屈させられていない」は意味が通らない。", "「刺激に驚かされていない」は説明にならない。", "「刺激で傷ついていない」は説明にならない。"],
        "be occupied by ～＝～でふさがっている",
        [["対比", "外からの刺激 ⇔ {{connections of its own}}（自分自身のつながり）。"], ["当てはめ", "刺激で {{occupied}} されていないとき。"]]),
      ch("b5", 3, G("kandai"), B(5), ["during which", "which", "what", "that"], 0,
        ["正解。a few minutes を先行詞にして「その間に考えがさまよう」。後ろは完全な文。", "which だけでは、後ろの完全な文とつながらない。", "what は先行詞をとらない。", "that だけでは、後ろの完全な文とつながらない（関係副詞の働きをしない）。"],
        "後ろが完全な文 → 前置詞＋関係代名詞",
        [["後ろ", "their thoughts could drift は {{欠けのない文}}。"], ["形", "a few minutes {{during which}} …（その数分の間に）。"]]),
      ch("b6", 2, CHOBUN, B(6), ["rarely", "often", "easily", "very"], 0,
        ["正解。すきま時間がすぐに埋まるので、退屈することは「めったにない」。but 以下と対になる。", "スマホで埋めているので、退屈することが多いのは逆。", "「すぐ退屈する」は逆。", "very bored では but 以下と対にならない。"],
        "but の前後で「よい面⇔隠れた損」",
        [["前の文", "すきま時間は {{quickly filled}}。"], ["対比", "{{rarely}} bored, {{but}} … fewer chances to wander。"]]),
      ch("b7", 1, G("daimeishi"), B(7), ["its", "their", "our", "his"], 0,
        ["正解。for its own sake＝それ自体のために。its は boredom を指す。", "boredom は単数。", "「私たち自身のため」では意味が通らない。", "his が指すものがない。"],
        "for its own sake＝それ自体のために",
        [["指すもの", "{{boredom}}（単数・物）→ its。"], ["表現", "seek out boredom {{for its own sake}}。"]]),
      ch("b8", 2, G("setsuzokushi"), B(8), ["that", "what", "which", "whether"], 0,
        ["正解。The point is that ～＝要点は～ということだ。後ろは完全な文。", "what のあとは名詞が欠けた文が必要。", "which は補語の名詞節を作らない。", "whether では「～かどうか」となり、筆者の主張にならない。"],
        "The point is that S V",
        [["後ろ", "occasional moments … are not … wasted（完全な文）。"], ["接続詞", "補語の名詞節 → {{that}}。"]]),
      ch("b9", 2, G("kandai"), B(9), ["happens", "happen", "happening", "to happen"], 0,
        ["正解。What happens in ～＝～の中で起こること。what は単数扱い。", "what が主語のときは単数で受ける。", "述語動詞が必要。", "述語動詞が必要。"],
        "主語の what は単数扱い",
        [["構造", "{{What ( 9 ) in those quiet minutes}} が主語、may surprise が述語。"], ["形", "what 節の中の述語 → {{happens}}。"]]),
    ],
  ),
];

// =====================================================================
// 第8問　長文の総合読解
// =====================================================================

const L8 = "次の英文を読み、問いに答えよ。";

const T8: ExamPoolSection[] = [
  R(
    8,
    "read-roads",
    CHOBUN,
    "標識のない道路",
    L8,
    "Roads Without Signs",
    `Most of us assume that traffic is made safer by rules. Signs tell drivers how fast to go, lines show where to stop, and traffic lights decide who may cross. The more dangerous a road seems, the more instructions we tend to add. Yet in some European towns, planners have tried the opposite approach. They have removed signs, lights, and even the raised edges that separate the road from the sidewalk, creating what is sometimes called a "shared space."

The idea behind this experiment is simple, though it may seem strange at first. When a road is full of clear instructions, drivers feel that their responsibility ends with following them. As long as the light is green, they may drive through a town center without paying much attention to the people around them. (A) In a shared space, by contrast, nobody is quite sure who has the right of way. Drivers, cyclists, and pedestrians must look at one another, slow down, and negotiate their movements, often through eye contact or a simple wave of the hand.

Supporters of the idea claim that this uncertainty makes people more careful. In several places where shared spaces were introduced, they report that cars began to move more slowly and that accidents did not increase as many had feared. Some shopkeepers were pleased as well, because the streets became more pleasant places to walk and ( 1 ).

The approach has its critics, however. People who are blind or have poor eyesight cannot rely on eye contact, and many depend on the edges of the sidewalk and the sound of signals at crossings to find their way. For them, a street without clear boundaries may be (B) frightening rather than freeing. Parents of young children have raised similar concerns. Critics also point out that what works in a small town center with modest traffic may not work on a busy road in a large city.

The debate over shared spaces is not really about signs and lights. It is about a deeper question: do people behave better when they are told exactly what to do, or when they are trusted to use their own judgment? The answer is probably that it depends on the situation. Clear rules are valuable when speed is high and mistakes are deadly; trust and attention may work better where people move slowly and can see one another's faces.

What the experiment does show is that rules have side effects. Every instruction we give people also tells them, without saying so, what they no longer need to think about. (C) A good set of rules, therefore, is not the one with the most instructions, but the one that leaves people paying attention to what matters.`,
    7,
    [
      ch("q1", 1, CHOBUN, "空所( 1 )に入る最も適切なものを選べ。", ["shop", "drive", "park", "hurry"], 0,
        ["正解。店主が喜んだ理由 → 歩いて「買い物をする」のに快適な通りになった。", "車で走りやすくなったのでは、店主の喜ぶ理由にならず、車が遅くなった内容とも合わない。", "駐車は walk と並ばない。", "急ぐのに快適な通りでは、pleasant places to walk と合わない。"],
        "主語（店主）が喜ぶ理由を考える",
        [["主語", "{{shopkeepers}} were pleased。"], ["並び", "pleasant places to {{walk}} and {{shop}}。"]]),
      ch("q2", 2, CHOBUN, "下線部(A)の状況で人々がどうするかについて、本文の内容に合うものを選べ。", ["They communicate with one another to decide who goes first.", "They follow the traffic lights more carefully than before.", "They drive faster because there are no signs to obey.", "They wait for the police to tell them when to move."], 0,
        ["正解。negotiate their movements, often through eye contact or a simple wave of the hand。", "シェアド・スペースには信号がない。", "本文は slow down とあり、逆。", "警察が指示するとは書いていない。"],
        "下線部の直後の文に具体的な行動がある",
        [["下線部", "だれに {{優先権}} があるかはっきりしない。"], ["直後", "look at one another, {{slow down}}, and {{negotiate}} → 合図で決めあう。"]]),
      ch("q3", 2, CHOBUN, "第2段落によると、指示の多い道路にはどのような問題があるか。", ["Drivers may stop paying attention once they are following the instructions.", "Drivers cannot understand so many different signs.", "Pedestrians are not allowed to cross the road at all.", "Traffic lights often break down in town centers."], 0,
        ["正解。drivers feel that their responsibility ends with following them … without paying much attention。", "標識が理解できないとは書いていない。", "歩行者が渡れないとは書いていない。", "信号の故障は書いていない。"],
        "responsibility ends with ～＝責任は～で終わる",
        [["根拠", "their responsibility {{ends with following them}}。"], ["結果", "青信号なら周りの人に {{注意を払わない}} ことがある。"]]),
      ch("q4", 2, CHOBUN, "下線部(B) frightening rather than freeing の意味として最も適切なものを選べ。", ["It may cause fear instead of giving a sense of freedom.", "It may be both exciting and relaxing.", "It may be expensive instead of free of charge.", "It may make them feel free to walk anywhere."], 0,
        ["正解。A rather than B＝BよりむしろA。自由を感じさせるより、こわい。", "「わくわくして気楽」は frightening と合わない。", "freeing を「無料の」と取った誤り。お金の話ではない。", "rather than の前後を逆に取った誤り。"],
        "A rather than B＝BというよりむしろA",
        [["構文", "{{frightening}} rather than {{freeing}} → 中心は frightening。"], ["文脈", "目の不自由な人は {{eye contact}} に頼れない → こわい。"]]),
      ch("q5", 1, CHOBUN, "第3段落によると、支持者はシェアド・スペースの結果について何と報告しているか。", ["Cars moved more slowly, and accidents did not increase.", "Accidents completely disappeared from the towns.", "Shopkeepers asked the towns to put the signs back.", "More drivers began to use the roads at high speed."], 0,
        ["正解。cars began to move more slowly and that accidents did not increase。", "「増えなかった」であって「なくなった」とは書いていない。", "店主は喜んだとある。", "車は遅くなったとあり、逆。"],
        "did not increase と disappeared のちがい",
        [["根拠", "cars began to move {{more slowly}}、accidents {{did not increase}}。"], ["注意", "「増えなかった」≠「ゼロになった」。言いすぎの選択肢に注意。"]]),
      ch("q6", 2, CHOBUN, "第4段落で批判として挙げられていないものを選べ。", ["Shared spaces cost too much money to build.", "People with poor eyesight cannot rely on eye contact.", "Parents of young children have similar worries.", "The idea may not suit busy roads in large cities."], 0,
        ["正解（挙げられていない）。費用の話は本文にない。", "People who are blind or have poor eyesight cannot rely on eye contact。", "Parents of young children have raised similar concerns。", "may not work on a busy road in a large city。"],
        "「挙げられていないもの」は1つずつ本文と照らす",
        [["本文の批判", "① {{目の不自由な人}} ② {{小さな子の親}} ③ {{大都市の交通量の多い道}}。"], ["残り", "{{費用}} は書かれていない。"]]),
      ch("q7", 3, CHOBUN, "第5段落の筆者の考えとして最も適切なものを選べ。", ["Whether rules or trust works better depends on conditions such as speed.", "People always behave better when they are trusted.", "Clear rules are never necessary in towns.", "The debate is mainly about the design of signs."], 0,
        ["正解。it depends on the situation。速度が高いときは規則、遅いときは信頼と注意。", "always とは言っていない。状況による。", "速度が高いときは規則が valuable と言っている。", "not really about signs and lights と言っている。"],
        "it depends＝状況による、が筆者の答え",
        [["筆者の答え", "{{it depends on the situation}}。"], ["具体", "速度が高い→{{規則}}、遅く顔が見える→{{信頼と注意}}。"]]),
      ch("q8", 3, CHOBUN, "下線部(C)の言いかえとして最も適切なものを選べ。", ["Rules should be designed so that people keep noticing important things.", "Rules are better when there are as many of them as possible.", "Rules should be removed from every road as soon as possible.", "Rules work only when people do not have to think at all."], 0,
        ["正解。leaves people paying attention to what matters＝大切なことに注意を払い続けさせる。", "the most instructions を否定している。", "すべての道からなくせとは言っていない。", "前の文で「指示が考えなくてよいことを伝えてしまう」のを問題にしている。逆。"],
        "not A but B の B が筆者の言いたいこと",
        [["構文", "{{not}} the one with the most instructions, {{but}} the one that …。"], ["意味", "leave O ～ing＝O が～している状態にしておく → 大切なことに {{注意を払い続けさせる}}。"]]),
      ch("q9", 2, CHOBUN, "本文の内容に合うものを選べ。", ["Feeling uncertain can make some road users more careful.", "The author believes every town should remove its traffic lights.", "Shared spaces were first created in large Asian cities.", "Critics say shared spaces make cars move faster."], 0,
        ["正解。this uncertainty makes people more careful。", "筆者は状況によると言っている。", "本文は some European towns。", "批判は目の不自由な人・子ども・大都市の道について。速度の話ではない。"],
        "uncertainty と careful の関係が主張の中心",
        [["根拠", "Supporters … claim that {{this uncertainty makes people more careful}}。"], ["他の選択肢", "European towns・{{depends on the situation}} と照らして消す。"]]),
      ch("q10", 2, CHOBUN, "本文の表題として最も適切なものを選べ。", ["Fewer Rules, More Attention? The Debate over Shared Spaces", "How Traffic Lights Were Invented", "Why Shopkeepers Like European Towns", "The Dangers of Walking at Night"], 0,
        ["正解。標識を減らすと注意が増すのか、という論争と、規則の副作用を論じている。", "信号の発明は扱っていない。", "店主は例の1つにすぎない。", "夜道の話はない。"],
        "全体の対立（規則⇔判断）を表す題",
        [["主題", "規則に従わせるか、{{自分の判断}}にまかせるか。"], ["結論", "規則には {{副作用}} がある → 「規則が少ないほど注意が増す？」が全体を表す。"]]),
    ],
  ),
  R(
    8,
    "read-habits",
    CHOBUN,
    "習慣の力",
    L8,
    "The Quiet Power of Habits",
    `Think about what you did this morning before leaving home. You probably brushed your teeth, got dressed, and perhaps made a cup of tea, all without making a single conscious decision. Psychologists estimate that a large part of our daily behavior is carried out in this way, more or less automatically. We tend to think of ourselves as people who choose what we do, but much of the time we are simply repeating what we did yesterday.

Habits are not a sign of laziness. On the contrary, they are one of the brain's most efficient tools. Making decisions requires effort, and if we had to think carefully about every small action, we would be exhausted before lunch. (A) By handing routine tasks over to habit, the mind frees itself to deal with problems that are genuinely new.

A habit usually forms when an action is repeated in the same situation. At first, the action requires attention: a new employee has to think about which route to take to the office. After many repetitions, however, the situation itself begins to trigger the action. The sight of a particular corner, the time on the clock, or even a feeling such as boredom can start a sequence of behavior before we have decided anything. This is why habits are so ( 1 ) to break. Knowing that something is bad for us does not stop the situation from triggering the action.

This understanding has practical consequences for anyone who wants to change their behavior. Relying on willpower alone is often ineffective, because willpower must be used again and again, while the habit is always ready. A more successful strategy is to change the situation. People who want to eat less sugar, for example, may find it easier simply not to keep sweets in the house than to resist them every evening. (B) Those who seem to have remarkable self-control, some researchers suggest, may simply be better at arranging their lives so that temptation rarely appears.

New habits can be built in a similar way. Instead of making a vague promise to "exercise more," a person might decide to go for a short walk immediately after dinner every day. Linking the new action to an existing routine gives it a clear trigger. At first the walk will require effort, but if it is repeated consistently, it will gradually become automatic. How long this takes varies a great deal from person to person and from habit to habit.

Habits, then, are neither good nor bad in themselves. They are the brain's way of saving effort, and they will serve whatever behavior we repeat. (C) The real choice we face is not whether to have habits, but which ones we allow to grow.`,
    7,
    [
      ch("q1", 1, CHOBUN, "空所( 1 )に入る最も適切なものを選べ。", ["hard", "easy", "pleasant", "necessary"], 0,
        ["正解。悪いとわかっていても状況が行動を引き起こす → やめるのが「難しい」。", "次の文（わかっていても止められない）と逆。", "「やめるのが楽しい」は意味が通らない。", "「やめる必要がある」は so … to break の形に合わない。"],
        "次の文が理由の説明",
        [["次の文", "Knowing that something is bad … {{does not stop}} the situation from triggering the action。"], ["結論", "だから習慣はやめるのが {{hard}}。"]]),
      ch("q2", 1, CHOBUN, "第1段落の要点として最も適切なものを選べ。", ["Much of what we do each day is done without conscious choice.", "Most people make careful decisions every morning.", "Psychologists believe that habits make people lazy.", "We should stop repeating what we did yesterday."], 0,
        ["正解。a large part of our daily behavior is carried out … more or less automatically。", "without making a single conscious decision と逆。", "第2段落で Habits are not a sign of laziness と否定している。", "やめるべきだとは言っていない。"],
        "but のあとの文が段落の結論",
        [["根拠", "a large part of our daily behavior … {{automatically}}。"], ["結び", "{{but}} much of the time we are simply repeating …。"]]),
      ch("q3", 2, CHOBUN, "下線部(A)の意味として最も適切なものを選べ。", ["Habits let the mind save its energy for unfamiliar problems.", "Habits make it impossible for the mind to solve new problems.", "The mind forgets routine tasks when it faces new problems.", "The mind should give all its tasks to other people."], 0,
        ["正解。決まった作業を習慣にまかせることで、本当に新しい問題に取り組めるようになる。", "frees itself to deal with と逆。", "忘れるとは言っていない。", "handing … over to {{habit}}（習慣に）であって、他人にではない。"],
        "free oneself to do＝～できるように自由になる",
        [["前半", "By handing routine tasks over to {{habit}}（習慣にまかせることで）。"], ["後半", "the mind {{frees itself}} to deal with {{genuinely new}} problems。"]]),
      ch("q4", 2, CHOBUN, "第3段落によると、習慣はどのようにしてできるか。", ["An action is repeated in the same situation until the situation itself starts it.", "A person decides to form a habit and never changes the decision.", "Habits form only when people are bored.", "A habit forms after a single important experience."], 0,
        ["正解。repeated in the same situation → the situation itself begins to trigger the action。", "決心で習慣ができるとは書いていない。", "退屈は引き金の例の1つにすぎない。only は誤り。", "After many repetitions とあり、1回の経験ではない。"],
        "例の1つを「だけ」とする選択肢に注意",
        [["根拠", "an action is {{repeated in the same situation}}。"], ["その後", "{{the situation itself}} begins to {{trigger}} the action。"]]),
      ch("q5", 2, CHOBUN, "第4段落によると、意志の力だけに頼るのがうまくいかないのはなぜか。", ["Willpower has to be used repeatedly, while the habit is always ready.", "Willpower is only available in the evening.", "People who rely on willpower eat more sugar.", "Willpower makes the situation harder to change."], 0,
        ["正解。because willpower must be used again and again, while the habit is always ready。", "夕方の話は甘いものの例にすぎない。", "そのような因果は書いていない。", "書いていない。"],
        "because 以下がそのまま理由",
        [["根拠", "{{because}} willpower must be used {{again and again}}。"], ["対比", "{{while the habit is always ready}}（習慣はいつでも待ちかまえている）。"]]),
      ch("q6", 3, CHOBUN, "下線部(B)が示していることとして最も適切なものを選べ。", ["People with strong self-control may avoid temptation rather than fight it.", "People with strong self-control are born with special brains.", "Self-control cannot be improved at all.", "Researchers think temptation is good for us."], 0,
        ["正解。誘惑がめったに現れないように生活を整えるのがうまいだけかもしれない。", "生まれつきの脳の話はない。", "生活の整え方しだいと言っており、改善できないとは言っていない。", "誘惑がよいとは言っていない。"],
        "simply＝ただ～にすぎない",
        [["下線部", "may {{simply}} be better at {{arranging their lives}}。"], ["意味", "so that temptation {{rarely appears}} → 誘惑とたたかうより、誘惑に会わない。"]]),
      ch("q7", 2, CHOBUN, "第5段落の内容に合う、新しい習慣のつくり方を選べ。", ["Connect the new action to something you already do regularly.", "Make a general promise such as \"exercise more.\"", "Wait until the new action becomes automatic before starting.", "Try the new action only when you feel like it."], 0,
        ["正解。Linking the new action to an existing routine gives it a clear trigger。", "vague promise（あいまいな約束）のかわりに、と言っている。逆。", "最初は努力が要り、くり返すうちに自動になる。順序が逆。", "consistently（一貫して）くり返すことが必要。"],
        "Instead of ～ の内容は筆者がすすめないもの",
        [["すすめない", "{{Instead of}} making a vague promise …。"], ["すすめる", "{{Linking the new action to an existing routine}}（夕食のすぐあとに散歩）。"]]),
      ch("q8", 2, CHOBUN, "本文の内容と一致しないものを選べ。", ["A new habit always becomes automatic within three weeks.", "Habits are an efficient tool of the brain.", "A feeling such as boredom can trigger a habit.", "Habits are neither good nor bad in themselves."], 0,
        ["正解（一致しない）。How long this takes varies a great deal とあり、期間は決まっていない。", "one of the brain's most efficient tools。", "even a feeling such as boredom can start a sequence of behavior。", "neither good nor bad in themselves。"],
        "always・within など断定の語に注意",
        [["本文", "How long this takes {{varies a great deal}}。"], ["判断", "「必ず3週間以内」は本文にない → 一致しない。"]]),
      ch("q9", 3, CHOBUN, "下線部(C)の意味として最も適切なものを選べ。", ["We cannot avoid having habits, but we can decide which ones to develop.", "We should decide whether to have any habits at all.", "We have no control over which habits we form.", "It is better to have as few habits as possible."], 0,
        ["正解。not whether to have habits, but which ones … ＝習慣をもつかではなく、どの習慣を育てるか。", "not whether to have habits と否定している。", "allow to grow（育つのを許す）とあり、選べると言っている。", "習慣の数を減らせとは言っていない。"],
        "not A but B の B が筆者の主張",
        [["構文", "{{not}} whether to have habits, {{but}} which ones we allow to grow。"], ["意味", "習慣はなくせない → どれを育てるかが {{本当の選択}}。"]]),
      ch("q10", 1, VOCAB, "第5段落の consistently に最も近い意味のものを選べ。", ["regularly, without changing the pattern", "quickly, without thinking", "rarely, only when necessary", "carefully, with great effort"], 0,
        ["正解。consistently＝一貫して・変わらずに。", "「すばやく」の意味はない。", "「めったに」は逆。", "「努力して」の意味はない。"],
        "consistent＝一貫した",
        [["語", "{{consistent}}（一貫した）の副詞。"], ["文脈", "毎日夕食後に散歩する → {{変わらずくり返す}}。"]]),
    ],
  ),
  R(
    8,
    "read-bench",
    CHOBUN,
    "駅前のベンチ（物語）",
    L8,
    "The Bench by the Station",
    `Every morning for nearly a year, Kenji passed the same old man sitting on a bench outside the station. The man was always there before seven, wearing a gray coat and holding a paper cup of coffee in both hands. He did not seem to be waiting for a train. He simply watched the people rushing past, and now and then he nodded to someone, though nobody ever nodded back.

Kenji was usually in too much of a hurry to think about him. He had a long commute, a demanding boss, and a habit of checking his email while he walked. But one rainy Monday, when his train was delayed and the platform was too crowded to stand on, he went back outside and found himself sitting at the other end of the same bench.

For a while neither of them spoke. Then the old man said, without turning his head, "You usually walk faster than this." Kenji laughed, surprised that he had been noticed at all. (A) It had never occurred to him that while he was ignoring the old man, the old man had been watching him.

They talked until the trains began to run again. The old man, whose name was Mr. Ota, had worked at the station for forty years, first selling tickets and later managing the office. After he retired, he found that he could not stop coming. "My wife says I am waiting for something," he said. "But I think I just like to see the city wake up. Everyone is going somewhere. It makes me feel that the day is ( 1 )."

After that, Kenji began to leave home five minutes earlier. He did not always stay long; sometimes there was only enough time to say good morning and talk about the weather. Yet he noticed that the rest of his day felt different. He checked his email less on the way to the office, and he was less irritated when his boss changed plans at the last minute. (B) The five minutes cost him almost nothing, but they seemed to give him something he had not known he was missing.

One morning in early spring, the bench was empty. It was empty the next day, too, and the day after that. Kenji asked a station employee, who told him that Mr. Ota had moved to another city to live with his daughter. He had left a small card for "the young man who sits on the bench," and the employee handed it to Kenji. On it, in careful handwriting, were a few words: "Walk slowly sometimes. Thank you."

Kenji still takes the same train. He walks a little more slowly now, and occasionally, when he sees someone sitting alone on that bench, he nods. Some of them nod back.`,
    7,
    [
      ch("q1", 2, CHOBUN, "空所( 1 )に入る最も適切なものを選べ。", ["full of promise", "already finished", "not worth starting", "too dangerous"], 0,
        ["正解。だれもがどこかへ向かう朝の町を見ると、その日が「希望に満ちている」と感じる。", "朝に町が目覚めるのを見て「もう終わった」は合わない。", "見るのが好きだと言っているので逆。", "危険の話ではない。"],
        "前の文（好きなもの）と同じ方向の内容",
        [["前の文", "I just {{like to see the city wake up}}。Everyone is {{going somewhere}}。"], ["当てはめ", "前向きな気持ち → the day is {{full of promise}}。"]]),
      ch("q2", 1, CHOBUN, "第1段落の老人について、本文の内容に合うものを選べ。", ["He watched people passing by and sometimes nodded to them.", "He was waiting for his train every morning.", "He sold coffee to people outside the station.", "Many people nodded back to him."], 0,
        ["正解。He simply watched the people rushing past, and now and then he nodded to someone。", "He did not seem to be waiting for a train。", "コーヒーを手に持っていただけで、売ってはいない。", "nobody ever nodded back。"],
        "not seem to ～・nobody など否定の語を見落とさない",
        [["根拠", "{{watched}} the people rushing past … {{nodded}} to someone。"], ["否定", "{{did not seem}} to be waiting、{{nobody}} ever nodded back。"]]),
      ch("q3", 1, CHOBUN, "ある月曜日、ケンジがベンチに座ったのはなぜか。", ["His train was delayed and the platform was too crowded.", "He wanted to talk to the old man.", "His boss told him to come in late.", "It was a sunny day and he wanted to rest."], 0,
        ["正解。when his train was delayed and the platform was too crowded to stand on。", "found himself sitting＝気づいたら座っていた。話すつもりではなかった。", "上司の指示は書いていない。", "rainy Monday とあり、晴れではない。"],
        "find oneself ～ing＝気づくと～していた",
        [["根拠", "his train was {{delayed}} and the platform was {{too crowded}}。"], ["表現", "{{found himself sitting}}＝気がつくと座っていた（目的があったのではない）。"]]),
      ch("q4", 2, CHOBUN, "下線部(A)の意味として最も適切なものを選べ。", ["Kenji had not imagined that the man he ignored had been noticing him.", "Kenji had always known that the old man was watching him.", "The old man had been ignoring Kenji for a long time.", "Kenji had been watching the old man carefully every day."], 0,
        ["正解。It never occurred to him that ～＝～とは思いもしなかった。", "never occurred とあり、知らなかった。", "老人が無視していたのではなく、見ていた。", "ケンジは老人を ignoring していた。"],
        "It occurs to 人 that ～＝人が～と思いつく",
        [["構文", "It had {{never occurred to him}} that …＝…とは思いもしなかった。"], ["内容", "自分が {{無視していた}} 間、老人は自分を {{見ていた}}。"]]),
      ch("q5", 1, CHOBUN, "オオタさんの経歴として本文に合うものを選べ。", ["He worked at the station for forty years before he retired.", "He was a train driver for forty years.", "He still works in the station office.", "He came to the station for the first time after he retired."], 0,
        ["正解。had worked at the station for forty years … After he retired。", "切符を売り、のちに事務所を管理した。運転士ではない。", "After he retired とあり、もう退職している。", "40年働いていたので「はじめて」ではない。"],
        "first … later … で職の順を確かめる",
        [["根拠", "worked at the station {{for forty years}}, first {{selling tickets}} and later {{managing the office}}。"], ["今", "{{After he retired}}, he … could not stop coming。"]]),
      ch("q6", 3, CHOBUN, "下線部(B)の something he had not known he was missing が表すものとして最も適切なものを選べ。", ["a calm moment of human contact that changed how his day felt", "extra money that he saved by not taking the train", "a better position at his company", "more time to check his email"], 0,
        ["正解。あいさつと天気の話だけの短い時間で、1日の感じ方が変わった（イライラが減った）。", "お金の話はない。", "昇進の話はない。", "メールを見ることは減った（checked his email less）。逆。"],
        "前の2文の変化から「得たもの」を考える",
        [["変化", "the rest of his day {{felt different}}、{{less irritated}}。"], ["原因", "老人との {{短い会話}}（人とのふれあい・落ち着いた時間）。"]]),
      ch("q7", 2, CHOBUN, "ベンチで過ごすようになってからのケンジの変化として本文に合うものを選べ。", ["He became less irritated by sudden changes at work.", "He began to check his email more often while walking.", "He started arriving at work five minutes later.", "He decided to quit his demanding job."], 0,
        ["正解。he was less irritated when his boss changed plans at the last minute。", "checked his email less とあり、逆。", "家を5分早く出たので、遅れたとは言えない。", "仕事をやめたとは書いていない。"],
        "less ～＝前より～でない",
        [["根拠", "{{less irritated}} when his boss changed plans at the last minute。"], ["他", "email は {{less}}、家を出るのは {{five minutes earlier}}。"]]),
      ch("q8", 1, CHOBUN, "ある春の朝からベンチが空になったのはなぜか。", ["Mr. Ota had moved to another city to live with his daughter.", "Mr. Ota had started working at the station again.", "The bench had been removed by the station.", "Mr. Ota was angry with Kenji."], 0,
        ["正解。Mr. Ota had moved to another city to live with his daughter。", "再び働きはじめたとは書いていない。", "ベンチは残っている（最終段落）。", "感謝のカードを残しており、怒ってはいない。"],
        "駅員の説明の文をそのまま確かめる",
        [["根拠", "Mr. Ota had {{moved to another city}} to live with {{his daughter}}。"], ["確認", "カードには {{Thank you}}。"]]),
      ch("q9", 3, CHOBUN, "最終段落から読みとれることとして最も適切なものを選べ。", ["Kenji has begun to pass on the kindness he received.", "Kenji now avoids the bench because it makes him sad.", "Kenji has stopped taking the train to work.", "Nobody ever responds to Kenji's greetings."], 0,
        ["正解。かつて老人がしていたように、ベンチの人にうなずく。オオタさんからもらったものを人に渡している。", "ベンチを避けてはいない。", "still takes the same train とあり、逆。", "Some of them nod back とあり、逆。"],
        "第1段落の老人の姿と重ねて読む",
        [["対応", "第1段落の老人：{{he nodded to someone}}／最終段落のケンジ：{{he nods}}。"], ["ちがい", "老人には nobody nodded back、ケンジには {{Some of them nod back}}。"]]),
      ch("q10", 3, CHOBUN, "本文の内容と一致しないものを選べ。", ["Mr. Ota's wife believed he simply enjoyed watching the city wake up.", "Mr. Ota usually held a paper cup of coffee in both hands.", "Kenji began to leave home a little earlier than before.", "Mr. Ota left a card with a short message for Kenji."], 0,
        ["正解（一致しない）。妻は「何かを待っている」と言い、町の目覚めが好きだと言ったのはオオタさん自身。", "holding a paper cup of coffee in both hands。", "began to leave home five minutes earlier。", "He had left a small card … Walk slowly sometimes. Thank you。"],
        "だれの発言・考えかを区別する",
        [["妻", "My wife says I am {{waiting for something}}。"], ["本人", "{{But I think}} I just like to see the city wake up → 本人の考え。"]]),
    ],
  ),
];

export const U_CHUO_EIGO: UnivExam = {
  key: K,
  univ: "中央大学",
  kamoku: "英語",
  tier: "MARCH",
  order: 107,
  basis: "法学部の学部別選抜（一般方式）の傾向を参考（90分・150点。和訳・英訳の記述と、多義語・整序・誤り指摘・長文2題）",
  format: "大問8題・90分。英文和訳と指定語つき和文英訳の記述に、多義語・整序・文法・誤り指摘と長文2題。",
  minutes: 90,
  groups: ["語彙", "文法", "技能"],
  sections: [
    { title: "第1問　英文和訳", lead: L1, count: [2, 2], mix: [0.2, 0.5, 0.3], points: 20, prefer: "material", poolTag: `${K}:1` },
    { title: "第2問　和文英訳", lead: L2, count: [1, 1], mix: [0.2, 0.5, 0.3], points: 15, prefer: "material", poolTag: `${K}:2` },
    { title: "第3問　同じ綴りの語の空所補充", lead: L3, count: [4, 4], mix: [0.2, 0.5, 0.3], points: 12, prefer: "material", poolTag: `${K}:3` },
    { title: "第4問　整序英作文", lead: L4, count: [4, 4], mix: [0.2, 0.5, 0.3], points: 16, prefer: "material", poolTag: `${K}:4` },
    { title: "第5問　文法・語法の空所補充", lead: L5, count: [5, 5], mix: [0.2, 0.5, 0.3], points: 15, prefer: "material", poolTag: `${K}:5` },
    { title: "第6問　誤り指摘", lead: L6, count: [4, 4], mix: [0.2, 0.5, 0.3], points: 12, prefer: "material", poolTag: `${K}:6` },
    { title: "第7問　長文読解（空所補充）", lead: L7, count: [6, 6], mix: [0.2, 0.5, 0.3], points: 24, prefer: "material", poolTag: `${K}:7` },
    { title: "第8問　長文読解（総合）", lead: L8, count: [7, 7], mix: [0.2, 0.5, 0.3], points: 36, prefer: "material", poolTag: `${K}:8` },
  ],
  pool: [...T1, ...T2, ...T3, ...T4, ...T5, ...T6, ...T7, ...T8],
};
