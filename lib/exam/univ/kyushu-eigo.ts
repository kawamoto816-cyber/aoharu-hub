import type { UnivExam } from "./types";
import type { ExamPoolSection } from "../pool/types";
import type { QuestionB, Skill, SolutionStep } from "@/lib/moshi/types";

// 九州大学型 英語（国公立・2次試験）。前期日程の個別学力検査の傾向を参考にした形式（英文・和文・設問はすべて書き下ろし）。
//   120分・大問5題。〔1〕〜〔3〕長文読解（下線部和訳・内容説明（日本語）・空所・語の意味・内容一致。〔3〕は本文の要旨を英語でまとめる）、
//   〔4〕自由英作文（100語程度の意見文）、〔5〕和文英訳。配点は学部で異なるので、ここでは200点満点にした。
//   英文の題材・登場する町や島・人物はすべて架空。実在の人物の発言は使っていない。
// 参考:
//   https://www.kyushu-u.ac.jp/f/65352/2026_ito_eigo_kyudai.pdf （令和8年度 前期日程 英語 出題の意図：大問5題。〔1〕〜〔3〕読解、〔3〕は趣旨を英語で表現、〔4〕自由英作文、〔5〕提示された事象を英語で表現）
//   https://jyuke-labo.com/daigakujyukentaisaku/kyushudaigaku/eigo/ （120分・大問5題・記述中心。長文3題は和訳・内容説明、後半2題は英作文。200点）
//   https://ja.wikibooks.org/wiki/%E4%B9%9D%E5%B7%9E%E5%A4%A7%E5%AF%BE%E7%AD%96 （九大対策：長文読解・和文英訳・自由英作文の構成）

const U = {
  chobun: "h-eng-skill-chobun",
  wabun: "h-eng-skill-wabun",
  jiyu: "h-eng-skill-jiyu",
  vocab: "h-eng-vocab-2000",
  jukugo: "h-eng-vocab-jukugo",
  setsuzoku: "h-eng-gram-setsuzokushi",
  kandai: "h-eng-gram-kandai",
  zenchishi: "h-eng-gram-zenchishi",
  bunshi: "h-eng-gram-bunshikobun",
  tokushu: "h-eng-gram-tokushu",
  hikaku: "h-eng-gram-hikaku",
  futeishi: "h-eng-gram-futeishi",
  jodoshi: "h-eng-gram-jodoshi",
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

/** 記述 (和訳・内容説明・要約・英訳・英作文) */
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
    tag: `kyushu-eigo:${tag}`,
    section: {
      id: `kyushu-en-${id}`,
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

// ---- 長文読解で共通に使う形 ----
const READ_LEAD = "次の英文を読み、下の問いに答えよ。";
const READ3_LEAD = "次の英文を読み、下の問いに答えよ。問6は英語で答えること。";
/** 英文和訳の採点基準 (10点) */
const jtRubric = (frame: string, fk: string[], word: string, wk: string[]): Rub => [
  [`構文の把握：${frame}`, 4, fk],
  [`語句の訳：${word}`, 3, wk],
  ["日本語として自然で、訳しもれ・つけ足しがない", 3, []],
];
const JT = (id: string, d: 1 | 2 | 3, label: string, model: string, rub: Rub, point: string, st: St[], unit: string = U.chobun): QuestionB =>
  Wr(id, d, unit, `下線部${label}を日本語に訳せ。`, undefined, model, rub, point, st, 360);
/** 内容説明 (日本語) の採点基準 (9点) */
const exRubric = (a: [string, string[]], b: [string, string[]]): Rub => [
  [a[0], 4, a[1]],
  [b[0], 3, b[1]],
  ["字数の条件を守り、日本語として筋が通っている", 2, []],
];
const EX = (id: string, d: 2 | 3, prompt: string, max: number, model: string, rub: Rub, point: string, st: St[]): QuestionB =>
  Wr(id, d, U.chobun, `${prompt}（${max}字以内の日本語で）`, { max, unit: "字" }, model, rub, point, st, 300);
/** 英語の要約 (12点) */
const sumRubric = (a: [string, string[]], b: [string, string[]]): Rub => [
  [a[0], 4, a[1]],
  [b[0], 4, b[1]],
  ["自分のことばで言いかえ、文法・語法の誤りが少なく、語数（30〜40語）を守っている", 4, []],
];
const SUM = (id: string, model: string, rub: Rub, point: string, st: St[]): QuestionB =>
  Wr(id, 3, U.chobun, "本文の要旨を30〜40語の英語でまとめよ。", { min: 30, max: 40, unit: "語" }, model, rub, point, st, 600);

// =====================================================================
// 第1問　長文読解（社会・歴史の論説）
//   並び: 空所(d1)・和訳(d2)・内容説明(d2)・語の意味(d2)・和訳(d3)・内容一致(d3)
// =====================================================================

const P1: ExamPoolSection[] = [
  sec(1, "rd-kelantara", U.chobun, "長文読解（風を待つ港町）", READ_LEAD, {
    lang: "en",
    title: "A Town That Waited for the Wind",
    body: `For centuries, the busiest ports of maritime Asia were not necessarily the ones with the best harbors or the richest hinterlands. Many of them owed their success to something far less visible: the wind. Before the age of steam, ships crossing the seas between the Indian Ocean and the South China Sea depended on the monsoons, which blow from one direction for part of the year and from the opposite direction for the rest. A merchant who arrived with one monsoon often had to wait several months [ 1 ] he could sail home.

Consider the imaginary but typical port of Kelantara, on a narrow strait between two seas. Its harbor was shallow, and the land behind it produced little except fish and coconuts. Yet for nearly four hundred years Kelantara was one of the wealthiest towns in the region. {{(A) Its fortune came not from what it produced but from where it stood: it lay at the point where ships from the west and ships from the east could meet without having to complete the whole journey.}} A trader carrying cotton cloth from India did not need to sail all the way to China; he could exchange his goods in Kelantara for porcelain and silk, and return home with the next change of wind.

Because merchants had to stay for months at a time, the town became far more than a marketplace. Traders rented houses, married local women, built places of worship and hired interpreters. Separate quarters grew up for communities from different shores, each with its own leader who settled disputes and dealt with the ruler on its behalf. {{(B) The rulers of Kelantara understood that their prosperity depended on keeping these foreigners content, and so they kept taxes low and treated all merchants alike, whatever their religion or origin.}} A visitor might hear a dozen languages in a single afternoon in the market.

The arrival of steamships in the nineteenth century changed all this. Ships that carried their own power no longer had to wait for the wind, and they could sail directly between distant ports. At the same time, new colonial harbors with deep water and modern docks attracted the larger vessels. Within a few decades, Kelantara had lost most of its trade. The foreign quarters emptied, and the town returned to fishing.

{{(C) It is tempting to see the story of such towns simply as one of decline, but it may tell us something about what made them flourish in the first place.}} Kelantara was rich because people were forced to stop there, and while they stopped, they talked, bargained and learned from one another. Today, when goods and information move faster than ever, places where people are obliged to pause together have become rare. Perhaps that is one reason why historians find these old harbor towns so fascinating.`,
    notes: [{ word: "monsoon", meaning: "季節風" }, { word: "strait", meaning: "海峡" }],
  }, [
    C("blank1", 1, U.setsuzoku, "空所［ 1 ］に入る最も適切なものを選べ。", ["before", "after", "since", "unless"], 0, [
      "正解。wait several months before SV で「何か月も待ってからようやく～できる」。次の季節風を待ってから帰る、という内容に合う。",
      "after では「帰れるようになった後に待つ」となり、順序が逆になる。",
      "since は「～して以来」の意味で、wait several months と未来の帰航をつなげない。",
      "unless では「帰れない限り待つ」となり意味が通らない。",
    ], "wait ～ before SV＝～待ってようやく…する", [
      ["文脈", "一つの季節風で来た商人は、{{反対向きの季節風}}を待たないと帰れない。"],
      ["接続詞", "wait several months {{before}} he could sail home＝「何か月も待ってから帰航できた」。"],
    ], K),
    JT("tr-a", 2, "(A)",
      "その町の富は、そこで生産されるものからではなく、その位置から生まれた。そこは、西から来る船と東から来る船が、航海の全行程を終えなくても出会うことのできる地点にあったのである。",
      jtRubric("not from A but from B・関係副詞 where が導く the point を説明する節", ["ではなく", "地点"], "fortune・where it stood・without having to complete", ["富", "位置", "全行程", "終えなくても"]),
      "not A but B の A・B は from で形がそろっている", [
        ["骨組み", "Its fortune came {{not from}} [what it produced] {{but from}} [where it stood]：what・where の名詞節が対になる。"],
        ["後半", "the point {{where}} ships … could meet：「船が出会える地点」。{{without having to}} complete＝「完了しなくても」。"],
      ]),
    EX("ex-b", 2, "下線部(B)のように統治者がふるまったのはなぜか。本文に即して説明せよ。", 70,
      "町の土地からはほとんど産物がなく、富は外国商人の交易によるものだったので、繁栄を保つには彼らを満足させ続ける必要があったから。",
      exRubric(["町の富が（産物ではなく）外国商人の交易によっていたことを書いている", ["交易", "外国商人", "産物"]], ["繁栄を保つには商人を満足させる必要があったことを書いている", ["満足", "繁栄"]]),
      "理由は下線部の前半と第2段落にある", [
        ["下線部の前半", "prosperity {{depended on keeping these foreigners content}}：繁栄は外国人を満足させておくことにかかっていた。"],
        ["背景", "第2段落：土地は {{produced little}}。富は「どこにあるか」＝交易の中継から来ていた。"],
      ]),
    C("hinter", 2, U.vocab, "本文中の hinterlands の意味として最も適切なものを選べ。", [
      "the areas of land lying behind a coast or port",
      "the deep water close to a harbor",
      "the routes followed by ships between two seas",
      "the markets in the center of a town",
    ], 0, [
      "正解。第2段落の the land behind it produced little と対応し、港の背後に広がる土地を指す。",
      "港の深い水は harbor の良し悪しの話で、richest（豊かな）とは結びつかない。",
      "船の航路なら routes などと言う。豊かさを比べる対象として不自然。",
      "町の中心の市場は、港の背後の土地ではない。",
    ], "後ろの段落の言いかえから意味を推す", [
      ["対応", "第1段落 the richest {{hinterlands}} ↔ 第2段落 {{the land behind it}} produced little。"],
      ["意味", "港や海岸の{{後背地}}＝the areas of land lying behind a coast or port。"],
    ], K),
    JT("tr-c", 3, "(C)",
      "そうした町の歴史を単に衰退の物語として見たくなるが、その歴史は、そもそも何がそうした町を繁栄させたのかについて、何かを教えてくれるかもしれない。",
      jtRubric("It is tempting to do「～したくなる」・see A as B・one は story の代わり", ["したくなる", "として"], "decline・what made them flourish・in the first place", ["衰退", "繁栄", "そもそも"]),
      "It is tempting to do は「つい～したくなる」", [
        ["前半", "{{It is tempting to}} see A {{as}} B：「AをBと見たくなる」。one of decline の one＝{{story}}。"],
        ["後半", "what {{made them flourish}}＝「何がそれらを繁栄させたか」。{{in the first place}}＝「そもそも」。"],
      ]),
    C("agree", 3, U.chobun, "本文の内容と一致するものを選べ。", [
      "Kelantara lost most of its trade partly because ships no longer needed to wait for the monsoons.",
      "Kelantara became rich because its deep harbor could receive the largest ships of the time.",
      "Each foreign community in Kelantara was governed directly by the ruler, without any leader of its own.",
      "The writer argues that modern cities should return to depending on the wind for trade.",
    ], 0, [
      "正解。第4段落：蒸気船は風を待つ必要がなくなり、遠い港の間を直接航行できるようになった。深い港の新しい港も大きな船を引きつけた。",
      "第2段落：Its harbor was shallow とあり、深い港ではない。",
      "第3段落：各居留区には紛争を解決し統治者と交渉する独自の leader がいた。",
      "筆者は、人々がともに立ち止まる場所がまれになったと述べるだけで、風に頼る交易に戻れとは言っていない。",
    ], "partly because のように理由が一つでない書き方にも注意", [
      ["正解の根拠", "Ships … {{no longer had to wait for the wind}}, and … could sail directly …。"],
      ["誤りの根拠", "Its harbor was {{shallow}}／each with {{its own leader}}。"],
    ]),
  ], 6, "reading"),

  sec(1, "rd-halimun", U.chobun, "長文読解（市場で生まれたことば）", READ_LEAD, {
    lang: "en",
    title: "A Language Born in the Market",
    body: `When people who share no common language need to trade, they rarely wait until one side has learned the other's language properly. Instead, they put together a simple means of communication from whatever words are at hand. Linguists call such a makeshift language a pidgin. Pidgins have often been looked down on as "broken" versions of some other language, but the history of harbor towns suggests that they deserve far more respect.

Imagine the market of Halimun, a port on an island where ships from at least five different regions regularly called. In its early days, sellers and buyers relied on gestures, numbers written in the dust and a handful of shared words. Over time this small vocabulary grew. A word for "rice" might be borrowed from one language, a word for "money" from another, and the word for "tomorrow" from a third. {{(A) The grammar was kept as simple as possible, since what mattered was not elegance but whether a deal could be made before the ship left.}}

For a long time, nobody spoke this market language as a mother tongue. It was a tool used by adults for a limited purpose, much [ 1 ] a hammer is used only when there is a nail to drive. But in towns like Halimun, traders from different communities often married, and their children grew up hearing the market language at home more than any other. {{(B) What these children did with it is perhaps the most remarkable part of the story: they did not simply repeat what they heard, but turned it into a complete language capable of expressing anything their parents' languages could.}} They added ways of marking time, of distinguishing "I might go" from "I will go," and of telling stories, joking and arguing. Linguists call a language that develops in this way a creole.

The birth of a creole shows that children do not merely absorb a language; they actively build one. It also challenges the common belief that mixed languages are somehow inferior. A creole is not a failed attempt to speak one of its parent languages, any more than English is a failed attempt to speak French or German, from which it borrowed so many words. {{(C) Every language now spoken is, in a sense, the result of contact and borrowing, and the only difference is how long ago the mixing took place.}}

Unfortunately, the speakers of creoles have often been taught at school that their own way of speaking is incorrect. In some places, children have been punished for using it in class. Such attitudes do more than hurt feelings. They tell children that the language in which they think most easily has no value, and they ignore the creativity of the generations who made it. The market of Halimun may be long gone, but the language that grew there is evidence of what human beings can achieve when they need to understand one another.`,
    notes: [{ word: "pidgin", meaning: "ピジン語（交易などで生まれる簡略な接触言語）" }, { word: "creole", meaning: "クレオール語（ピジンが母語となって発達した言語）" }],
  }, [
    C("blank1", 1, U.setsuzoku, "空所［ 1 ］に入る最も適切なものを選べ。", ["as", "that", "so", "than"], 0, [
      "正解。much as SV で「ちょうど～するように」。ハンマーが釘を打つときだけ使われるのと同じように、という比喩になる。",
      "much that という言い方はなく、後ろの節とつながらない。",
      "much so では後ろの完全な文を導けない。",
      "than の前に比較級がないので使えない。",
    ], "much as SV＝ちょうど～のように", [
      ["形", "much {{as}} a hammer is used …：as は「～のように」の接続詞。much が意味を強める。"],
      ["比喩", "限られた目的の道具 ↔ {{釘があるときだけ}}使うハンマー。"],
    ], K),
    JT("tr-a", 2, "(A)",
      "文法はできるだけ単純に保たれた。というのも、大切なのは優雅さではなく、船が出る前に取引がまとまるかどうかだったからである。",
      jtRubric("be kept as … as possible・since SV（理由）・what mattered was not A but B", ["できるだけ", "ではなく", "から"], "elegance・whether a deal could be made", ["優雅", "取引", "かどうか"]),
      "since が文中で理由を表すときは「というのも～だから」", [
        ["前半", "The grammar {{was kept as simple as possible}}：keep O C の受け身。"],
        ["後半", "{{what mattered was not}} elegance {{but}} [whether …]：「大切なのはAではなくB」。"],
      ], U.kandai),
    EX("ex-b", 2, "下線部(B)の these children がしたこととは、どのようなことか。本文に即して具体的に説明せよ。", 70,
      "聞いた市場のことばをそのまま繰り返すのではなく、時の表し方や確かさの区別などを加え、何でも表現できる完全な言語に作りかえたこと。",
      exRubric(["市場のことばを完全な言語に作りかえたことを書いている", ["完全な言語", "作りかえ"]], ["時の表し方・可能性と意志の区別などの具体例を書いている", ["時", "区別", "物語"]]),
      "「具体的に」とあれば次の文の例も使う", [
        ["下線部", "did not simply repeat … but {{turned it into a complete language}}。"],
        ["具体例", "次の文：ways of {{marking time}}、{{\"I might go\" と \"I will go\" の区別}}、物語・冗談・議論。"],
      ]),
    C("makeshift", 2, U.vocab, "本文中の makeshift の意味として最も適切なものを選べ。", [
      "made quickly from whatever is available, for temporary use",
      "carefully planned by experts over a long period",
      "spoken only by children in the home",
      "used mainly in writing rather than in speech",
    ], 0, [
      "正解。直前の put together … from whatever words are at hand（手もとにある語なら何でも使って組み立てる）の言いかえ。",
      "専門家が長い時間をかけて計画したのではなく、取引の必要から急ごしらえされたもの。",
      "第3段落：初めはだれの母語でもなく、大人の道具だった。",
      "第2段落：身ぶりや地面に書いた数字など、話しことばの場面が中心。",
    ], "直前の文の言いかえを探す", [
      ["前文", "put together a simple means … from {{whatever words are at hand}}。"],
      ["意味", "such a {{makeshift}} language＝その場にあるもので作った{{間に合わせの}}言語。"],
    ], K),
    JT("tr-c", 3, "(C)",
      "現在話されているすべての言語は、ある意味で接触と借用の結果であり、違いはただ、その混ざり合いがどれほど昔に起こったかということにすぎない。",
      jtRubric("in a sense の挿入・the only difference is 間接疑問 how long ago …", ["ある意味", "にすぎない", "だけ"], "contact and borrowing・the mixing took place", ["接触", "借用", "混ざ"]),
      "the only difference is ～ は「違いは～だけだ」", [
        ["挿入", "Every language now spoken is, {{in a sense}}, the result of …：「ある意味で」。"],
        ["補語", "the only difference is {{how long ago the mixing took place}}：間接疑問「どれほど前に起こったか」。"],
      ]),
    C("agree", 3, U.chobun, "本文の内容と一致するものを選べ。", [
      "The writer compares creoles with English to show that borrowing many words does not make a language inferior.",
      "In Halimun, the market language was first spoken as a mother tongue by adult traders.",
      "The grammar of the market language became more complex because traders valued elegance.",
      "According to the passage, schools have generally encouraged children to use creoles in class.",
    ], 0, [
      "正解。第4段落：英語がフランス語・ドイツ語を話しそこなったものでないのと同じく、クレオールも失敗作ではない（not … any more than …）。",
      "第3段落：長いあいだ、だれもこのことばを母語としては話さなかった。母語にしたのは子どもたち。",
      "第2段落：大切なのは優雅さではなかったので、文法はできるだけ単純に保たれた。",
      "第5段落：学校では自分の話し方はまちがいだと教えられ、罰せられた場所もあった。",
    ], "not A any more than B＝Bと同様Aでない", [
      ["正解の根拠", "A creole is not a failed attempt …, {{any more than English is}} a failed attempt …。"],
      ["誤りの根拠", "{{nobody spoke this market language as a mother tongue}}／{{not elegance}}。"],
    ]),
  ], 6, "reading"),

  sec(1, "rd-wreck", U.chobun, "長文読解（沈没船の積み荷）", READ_LEAD, {
    lang: "en",
    title: "What a Sunken Ship Carried",
    body: `Some years ago, fishermen working near a small island that we will call Sena began pulling up pieces of old pottery in their nets. Divers who followed them down found the remains of a wooden ship lying on the sea floor, and over the following seasons archaeologists recovered tens of thousands of objects from it.

The cargo was surprising. Historians had long assumed that before modern times, long-distance trade by sea was mostly a trade in luxuries: rare spices, fine silk and precious stones, carried in small quantities for a wealthy few. The ship near Sena told a different story. Most of its cargo consisted of ordinary bowls, plates and jars, many of them almost identical in shape and decoration. {{(A) There were so many of them, and they were so similar, that they can only have been made in large workshops producing goods for distant customers whom the makers would never meet.}}

Some of the bowls carried designs that were clearly intended for buyers in particular regions. A pattern popular in one market appeared on one group of bowls, while another group bore words in a script that the potters themselves probably could not read. In other words, the workshops seem to have studied what customers far away wanted and adjusted their products [ 1 ]. This is something we usually associate with modern companies, not with craftsmen who lived more than a thousand years ago.

The way the cargo was packed was just as revealing. Smaller bowls had been placed inside larger jars, and the spaces between them had been filled with straw and, in some cases, with dried spices that would themselves be sold at the end of the voyage. Nothing was wasted. {{(B) Such careful packing suggests that the merchants were not occasional adventurers but people engaged in a regular trade, who knew exactly how much space they had and how to make the most of it.}}

Of course, a single ship cannot tell us everything. We do not know why it sank, where exactly it was going, or whether its voyage was typical. Wrecks are found largely by chance, and those that survive are often the ones that sank in conditions that happened to preserve them. {{(C) Historians must therefore be careful not to build too large a picture on too small a piece of evidence.}} Yet when wrecks found in different places point in the same direction, as many now do, the old view becomes difficult to defend. Long before container ships and global brands, the seas of Asia seem to have carried a steady flow of everyday goods, connecting people who made things with people who used them across thousands of kilometers.`,
    notes: [{ word: "archaeologist", meaning: "考古学者" }, { word: "script", meaning: "文字（体系）" }],
  }, [
    C("blank1", 1, U.vocab, "空所［ 1 ］に入る最も適切なものを選べ。", ["accordingly", "nevertheless", "otherwise", "instead"], 0, [
      "正解。accordingly は「それに応じて」。遠くの客が望むものを調べ、それに合わせて製品を調整した、という意味になる。",
      "nevertheless（それにもかかわらず）では、調べたことと調整したことが対立してしまう。",
      "otherwise（さもなければ・別のやり方で）では、客の望みに合わせたという文脈に合わない。",
      "instead（その代わりに）では、何の代わりなのかが示されていない。",
    ], "accordingly＝それに応じて・それに合わせて", [
      ["文脈", "studied what customers far away wanted and adjusted their products ＿：{{調べた結果に合わせて}}調整。"],
      ["語", "{{accordingly}}＝in a way that suits what has just been mentioned。"],
    ], K),
    JT("tr-a", 2, "(A)",
      "それらはあまりに数が多く、しかも互いによく似ていたので、作り手が決して会うことのない遠方の客に向けて品物を生産する大きな工房で作られたとしか考えられない。",
      jtRubric("so … that ～「あまりに…なので～」・can only have been made「～されたとしか考えられない」", ["あまりに", "ので", "としか"], "workshops producing goods・whom the makers would never meet", ["工房", "生産", "決して会う"]),
      "can only have p.p. は「～したに違いない」に近い強い推量", [
        ["骨組み", "There were {{so}} many …, and they were {{so}} similar, {{that}} …：二つの so を一つの that で受ける。"],
        ["推量", "they {{can only have been made}} in …：「～で作られたとしか考えられない」。producing は workshops を後ろから修飾。"],
      ], U.jodoshi),
    EX("ex-b", 2, "下線部(B)のように言えるのはなぜか。積み荷の詰め方の具体的な内容にふれて説明せよ。", 70,
      "小さな椀を大きな壺に入れ、すき間にわらや売り物の干した香辛料を詰めるなど空間を無駄なく使っており、決まった交易に慣れていたと考えられるから。",
      exRubric(["小さな椀を壺に入れ、すき間にわらや香辛料を詰めたことを書いている", ["椀", "壺", "わら", "香辛料"]], ["空間を無駄なく使っていた（＝慣れた定期的な交易）ことを書いている", ["無駄", "空間", "定期"]]),
      "根拠は下線部の直前の具体例", [
        ["具体例", "Smaller bowls … {{inside larger jars}}、spaces … filled with {{straw}} and {{dried spices}}。"],
        ["結論", "{{Nothing was wasted}} → 空間を知りつくした{{定期的な交易}}の担い手。"],
      ]),
    C("revealing", 2, U.vocab, "本文中の revealing の意味として最も適切なものを選べ。", [
      "giving information that was not known before",
      "difficult to understand or explain",
      "extremely expensive to produce",
      "carefully hidden from other people",
    ], 0, [
      "正解。just as revealing は、詰め方も積み荷と同じように、交易の実態について新しいことを教えてくれる、という意味。",
      "詰め方の説明はわかりやすく、そこから結論を引き出している。",
      "値段の話は出てこない。",
      "reveal は「明らかにする」で、「隠された」とは逆。",
    ], "reveal＝明らかにする → revealing＝多くを物語る", [
      ["語源", "{{reveal}}（明らかにする）の形容詞形。"],
      ["文脈", "詰め方から{{商人が定期的な交易をしていた}}ことがわかる → 多くを教えてくれる。"],
    ], K),
    JT("tr-c", 3, "(C)",
      "したがって歴史家は、小さすぎる証拠をもとに、大きすぎる全体像を組み立てないよう注意しなければならない。",
      jtRubric("be careful not to do・too large a picture（too＋形容詞＋a＋名詞）", ["ないよう", "注意"], "therefore・build … on・piece of evidence", ["したがって", "もとに", "証拠"]),
      "too large a picture は「大きすぎる像」(語順に注意)", [
        ["否定の不定詞", "be careful {{not to build}} …：「～しないよう注意する」。"],
        ["語順", "{{too large a picture}} on {{too small a piece of evidence}}：too＋形容詞＋a＋名詞。"],
      ], U.futeishi),
    C("agree", 3, U.chobun, "本文の内容と一致するものを選べ。", [
      "Some of the bowls appear to have been decorated to suit the tastes of buyers in specific places.",
      "The writer believes that the ship near Sena alone is enough to prove that the old view was wrong.",
      "The potters who made the bowls wrote the words on them in their own language.",
      "Archaeologists know exactly why the ship sank and where it was going.",
    ], 0, [
      "正解。第3段落：特定の地域の買い手に向けたと明らかにわかる模様があった。",
      "第5段落：一隻の船ではすべてはわからない。別々の場所の沈没船が同じ方向を示すとき、古い見方は守りにくくなる。",
      "第3段落：陶工たち自身はおそらく読めなかった文字の語が書かれていた。",
      "第5段落：なぜ沈んだのか、どこへ向かっていたのかはわからない。",
    ], "「一つの証拠で十分」という言いすぎの選択肢に注意", [
      ["正解の根拠", "designs that were clearly {{intended for buyers in particular regions}}。"],
      ["誤りの根拠", "{{a single ship cannot tell us everything}}／a script that the potters {{probably could not read}}。"],
    ]),
  ], 6, "reading"),
];

// =====================================================================
// 第2問　長文読解（自然科学の記事）
//   並び: 空所(d1)・内容説明(d2)・和訳(d2)・理由の選択(d2)・内容説明(d3)・内容一致(d3)
// =====================================================================

const P2: ExamPoolSection[] = [
  sec(2, "rd-plankton", U.chobun, "長文読解（動物プランクトンとプラスチック）", READ_LEAD, {
    lang: "en",
    title: "Small Animals, Small Plastics",
    body: `When people picture the harm that plastic does to the ocean, they usually imagine large animals: a whale with a stomach full of bags, or a seabird tangled in fishing line. These images are real and disturbing. However, some of the most worrying effects of plastic may involve creatures so small that most of us never think about them at all.

Zooplankton are tiny animals that drift in the sea, many of them no bigger than a grain of rice. They are among the most numerous animals on Earth, and they play a central role in ocean life. They feed on even smaller plant-like organisms near the surface and are in turn eaten by fish, which are eaten by larger animals. {{(A) If something goes wrong at this level, the effects can spread far beyond the plankton themselves.}}

The problem is that the ocean now contains enormous numbers of microplastics, fragments of plastic smaller than five millimeters. Many of these pieces are about the same size as the food that zooplankton eat. In laboratory experiments, researchers have filmed zooplankton swallowing tiny beads of plastic, apparently unable to tell them [ 1 ] real food. Animals that fill their stomachs with plastic take in less food, and some grow more slowly or produce fewer eggs.

There is a further, less obvious consequence. Zooplankton help to move carbon from the surface of the sea to the deep ocean. When they eat near the surface, they produce small waste pellets which are heavy enough to sink. As these pellets fall, they carry carbon with them, and some of it ends up stored at great depths for hundreds of years. This process is one of the ways in which the ocean helps to slow the build-up of carbon dioxide in the atmosphere. {{(B) In experiments, however, pellets containing plastic sank much more slowly than normal ones, because plastic is lighter than the natural material it replaces.}} Slower-sinking pellets are more likely to be broken down before they reach the deep sea, releasing their carbon closer to the surface.

Scientists are careful to point out that these results come mainly from laboratories, where the amount of plastic is often higher than in most parts of the ocean. It is not yet known how large the effect is in the open sea. But the studies remind us that pollution does not only kill animals directly. {{(C) It can also quietly interfere with natural processes that we depend on without noticing, and by the time such damage becomes visible, it may be difficult to reverse.}}

The fragments that worry scientists most did not begin small. Most microplastics come from larger objects, such as bottles and packaging, that have been broken apart by sunlight and waves. Reducing the amount of plastic that reaches the sea today is therefore the most effective way to protect the smallest animals of tomorrow.`,
    notes: [{ word: "zooplankton", meaning: "動物プランクトン" }, { word: "pellet", meaning: "小さな粒（ここではふんの粒）" }],
  }, [
    C("blank1", 1, U.zenchishi, "空所［ 1 ］に入る最も適切なものを選べ。", ["from", "with", "of", "against"], 0, [
      "正解。tell A from B で「AとBを見分ける」。プラスチックの粒を本物の餌と見分けられない、という意味。",
      "tell A with B という言い方はない。",
      "tell A of B は「AにBのことを話す」で、ここでは意味が通らない。",
      "tell A against B という言い方はない。",
    ], "tell A from B＝AとBを区別する", [
      ["熟語", "{{tell A from B}}＝distinguish A from B。"],
      ["文脈", "apparently {{unable to tell}} them (= beads of plastic) {{from}} real food。"],
    ], K),
    EX("ex-a", 2, "下線部(A)のように言えるのはなぜか。動物プランクトンの役割にふれて説明せよ。", 60,
      "動物プランクトンは海面近くの小さな生物を食べ、自らは魚などに食べられるという、海の食物のつながりの中心にいるから。",
      exRubric(["小さな生物を食べ、魚などに食べられることを書いている", ["食べ", "魚"]], ["海の生物（食物連鎖）の中心にいることを書いている", ["中心", "つながり", "連鎖"]]),
      "this level が指すものを前の文で確かめる", [
        ["指示語", "at {{this level}}＝食べる・食べられるの{{つながりの中の動物プランクトンの段階}}。"],
        ["根拠", "play a {{central role}}／feed on … and are {{in turn eaten by fish}}。"],
      ]),
    JT("tr-b", 2, "(B)",
      "しかし実験では、プラスチックを含んだ排出物の粒は、通常のものよりもはるかにゆっくり沈んだ。プラスチックは、それが置き換わった自然の物質よりも軽いからである。",
      jtRubric("much more slowly than・because SV・ones＝pellets", ["はるかに", "より", "から"], "containing plastic・the natural material it replaces", ["含", "置き換", "自然の物質"]),
      "much は比較級を強める「はるかに」", [
        ["比較", "sank {{much more slowly than}} normal {{ones}}（= pellets）。"],
        ["関係詞", "the natural material {{(that) it replaces}}：目的格の関係代名詞の省略。"],
      ], U.hikaku),
    C("why", 2, U.chobun, "第3段落によると、プラスチックを飲みこんだ動物プランクトンの成長が遅くなることがあるのはなぜか。最も適切なものを選べ。", [
      "胃がプラスチックで満たされ、取りこむ食物が少なくなるから。",
      "プラスチックに含まれる有害な物質が卵を傷つけるから。",
      "プラスチックが海面の水温を上げてしまうから。",
      "プラスチックのせいで魚に見つかりやすくなるから。",
    ], 0, [
      "正解。Animals that fill their stomachs with plastic take in less food に一致。",
      "有害な物質の話は本文に出てこない。卵が減ることは述べられているが、理由は食物が減ること。",
      "水温の話は出てこない。",
      "魚に見つかりやすくなるという記述はない。",
    ], "本文に書かれた因果だけを選ぶ", [
      ["根拠", "fill their stomachs with plastic → {{take in less food}} → grow more slowly。"],
      ["除外", "毒・水温・捕食は{{本文にない}}情報。"],
    ]),
    EX("ex-c", 3, "プラスチックが排出物の粒の沈む速さを変えることは、なぜ問題なのか。本文に即して説明せよ。", 80,
      "遅く沈む粒は深海に届く前に分解されやすく、炭素が海面近くで放出されるため、海が大気中の二酸化炭素の増加をおさえる働きが弱まるから。",
      exRubric(["粒が深海に届く前に分解され、炭素が海面近くで放出されることを書いている", ["分解", "海面近く", "炭素"]], ["海が二酸化炭素の増加をおさえる働きが弱まることを書いている", ["二酸化炭素", "おさえ", "弱"]]),
      "第4段落の「ふつうの働き」と「プラスチックの影響」を対比する", [
        ["ふつうの働き", "粒が沈む → 炭素が{{深海に何百年も}}たくわえられる → CO₂ の増加を{{遅らせる}}。"],
        ["影響", "遅く沈む粒は {{broken down before they reach the deep sea}} → 炭素が海面近くで放出。"],
      ]),
    C("agree", 3, U.chobun, "本文の内容と一致するものを選べ。", [
      "The writer admits that the size of the effect in the open ocean is still uncertain.",
      "Most microplastics are produced as tiny beads and do not come from larger objects.",
      "According to the passage, zooplankton can easily tell plastic from their food.",
      "The writer thinks that images of large animals harmed by plastic are exaggerated.",
    ], 0, [
      "正解。第5段落：It is not yet known how large the effect is in the open sea。",
      "最終段落：多くのマイクロプラスチックは、瓶や包装などの大きな物が日光と波で砕けたもの。",
      "第3段落：本物の餌と見分けられないらしい。",
      "第1段落：These images are real and disturbing。誇張だとは言っていない。",
    ], "研究の限界を述べる部分は内容一致でよく問われる", [
      ["正解の根拠", "{{It is not yet known how large the effect is}} in the open sea。"],
      ["誤りの根拠", "come from {{larger objects}}／images are {{real}}。"],
    ]),
  ], 6, "reading"),

  sec(2, "rd-turtle", U.chobun, "長文読解（ウミガメはなぜプラスチックを食べるのか）", READ_LEAD, {
    lang: "en",
    title: "Why Turtles Mistake Plastic for Food",
    body: `For many years, it was widely believed that sea turtles eat plastic bags because the bags look like jellyfish. A floating bag, moving gently in the water, does resemble a jellyfish, and some species of turtle eat jellyfish regularly. This explanation seemed so obvious that few people questioned it. Yet turtles of all ages swallow plastic objects that look nothing like jellyfish, such as bottle caps, pieces of rope and hard fragments. {{(A) Sight alone, it seems, cannot account for the behavior.}}

A group of researchers decided to test another sense: smell. Their idea was based on something that happens to every object that spends time in the sea. Within days, its surface is covered by a thin layer of bacteria, algae and other tiny living things. This layer gives off chemicals similar to those released by the turtles' natural food. {{(B) To a hungry turtle, therefore, a piece of plastic that has been in the water for some weeks may smell much like a meal, whatever it looks like.}}

To find out, the researchers placed young turtles, one at a time, in a tank. Through tubes above the water, they released different smells: clean water, the smell of the turtles' usual food, the smell of new plastic, and the smell of plastic that had been soaked in seawater for five weeks. The turtles paid little attention to clean water or new plastic. However, when the smell of the soaked plastic was released, they reacted [ 1 ] they did to real food: they raised their noses above the surface more often and kept them there longer, as if searching for something to eat.

The results do not mean that sight plays no part. Turtles probably use several senses together, and a bag that both looks and smells like food may be especially dangerous. But the experiment suggests an important reason why plastic is so attractive to these animals. It also helps to explain why simply making plastic objects look less like food would not solve the problem. {{(C) Once an object has been in the sea long enough to be covered by living things, it will smell attractive, no matter what shape or color it originally had.}}

This finding has worrying implications for other animals as well. Seabirds, fish and whales are also known to swallow plastic, and many of them rely heavily on smell to find food. If plastic in the ocean acts as a kind of trap that attracts hungry animals, the danger is greater than was once thought. Because the smell develops naturally in the sea, the only reliable solution is to stop plastic from entering the water in the first place.`,
    notes: [{ word: "algae", meaning: "藻類" }, { word: "soak", meaning: "（液体に）ひたす" }],
  }, [
    C("blank1", 1, U.setsuzoku, "空所［ 1 ］に入る最も適切なものを選べ。", ["in the same way as", "as if", "so that", "even though"], 0, [
      "正解。reacted in the same way as they did to real food＝本物の餌に反応したのと同じように反応した。did は reacted の代動詞。",
      "as if のあとなら仮定の内容（as if it were food など）が来る。they did to real food とはつながらない。",
      "so that（～するために）では、目的の意味になり文脈に合わない。",
      "even though（～にもかかわらず）では、前後が対立せず意味が通らない。",
    ], "代動詞 did が何を指すかで形を決める", [
      ["代動詞", "they {{did}} to real food＝they {{reacted}} to real food。"],
      ["比較の形", "react {{in the same way as}} …＝「～と同じように反応する」。コロンの後が同じ反応の中身。"],
    ], K),
    EX("ex-a", 2, "下線部(A)のように言えるのはなぜか。本文に即して説明せよ。", 60,
      "ウミガメはクラゲに似たレジ袋だけでなく、瓶のふたやロープなど、クラゲにまったく似ていないプラスチックも飲みこむから。",
      exRubric(["クラゲに似ていないプラスチックも飲みこむことを書いている", ["似ていない", "クラゲ"]], ["瓶のふた・ロープ・かたい破片などの例を書いている", ["ふた", "ロープ", "破片"]]),
      "直前の Yet で始まる文が根拠", [
        ["通説", "袋は{{クラゲに見える}}から食べる → 視覚による説明。"],
        ["反証", "{{Yet}} turtles … swallow plastic objects that {{look nothing like jellyfish}}：ふた・ロープ・破片。"],
      ]),
    JT("tr-b", 2, "(B)",
      "したがって、空腹のウミガメにとって、数週間水中にあったプラスチック片は、見た目がどうであれ、食事とよく似たにおいがするのかもしれない。",
      jtRubric("To A, S may V・whatever it looks like「見た目がどうであれ」", ["にとって", "どうであれ"], "smell much like a meal・has been in the water for some weeks", ["におい", "数週間", "食事"]),
      "whatever SV は譲歩「何が～でも」", [
        ["骨組み", "{{To a hungry turtle}}, … a piece of plastic … {{may smell much like}} a meal。"],
        ["譲歩", "{{whatever it looks like}}＝no matter what it looks like「見た目がどうであれ」。"],
      ], U.kandai),
    C("why", 2, U.chobun, "第3段落の実験で、海水につけたプラスチックのにおいにウミガメが反応したと言える根拠として最も適切なものを選べ。", [
      "本物の餌のにおいのときと同じように、鼻を水面より上に出す回数が増え、その時間も長くなったから。",
      "新しいプラスチックのにおいにも、同じように強く反応したから。",
      "水槽に入れたプラスチック片を、実際にかんで食べたから。",
      "きれいな水のにおいよりも、新しいプラスチックのにおいを好んだから。",
    ], 0, [
      "正解。they raised their noses above the surface more often and kept them there longer に一致。",
      "新しいプラスチックにはほとんど注意を払わなかった（paid little attention）。",
      "実験はにおいを流すもので、プラスチックを食べたという記述はない。",
      "きれいな水にも新しいプラスチックにも、ほとんど注意を払わなかった。",
    ], "コロンの後ろが反応の中身", [
      ["根拠", "they reacted …: they {{raised their noses above the surface more often}} and kept them there {{longer}}。"],
      ["比較の対象", "clean water・{{new plastic}} には paid little attention。"],
    ]),
    EX("ex-c", 3, "下線部(C)をふまえ、プラスチック製品の形や色を餌に似ないようにしても問題が解決しないのはなぜか。本文に即して説明せよ。", 80,
      "海に長くあるプラスチックは表面が細菌や藻などの生物の膜におおわれ、餌に似た化学物質のにおいを出すため、元の形や色に関係なくウミガメを引きつけるから。",
      exRubric(["表面が細菌や藻などの膜におおわれ、餌に似たにおいを出すことを書いている", ["細菌", "藻", "膜", "におい"]], ["元の形や色に関係なく引きつけることを書いている", ["形や色", "関係なく"]]),
      "第2段落のしくみと下線部(C)を結びつける", [
        ["しくみ", "第2段落：表面が {{a thin layer of bacteria, algae …}} でおおわれ、{{chemicals similar to … natural food}} を出す。"],
        ["結論", "{{no matter what shape or color}} it originally had → 見た目を変えても効果がない。"],
      ]),
    C("agree", 3, U.chobun, "本文の内容と一致するものを選べ。", [
      "The writer suggests that turtles may use both sight and smell when they look for food.",
      "The experiment showed that turtles are strongly attracted to the smell of new plastic.",
      "According to the passage, only turtles are likely to be affected by the smell of plastic.",
      "The researchers concluded that the old explanation based on sight was completely wrong.",
    ], 0, [
      "正解。第4段落：Turtles probably use several senses together。",
      "第3段落：新しいプラスチックのにおいにはほとんど注意を払わなかった。",
      "最終段落：海鳥・魚・クジラの多くもにおいで餌を探すので、影響が心配される。",
      "第4段落：視覚が何の役割も果たさないということではない。",
    ], "not … no part（一部は認める）を読み落とさない", [
      ["正解の根拠", "The results {{do not mean that sight plays no part}}. Turtles probably use {{several senses together}}。"],
      ["誤りの根拠", "paid {{little attention}} to … new plastic／Seabirds, fish and whales {{as well}}。"],
    ]),
  ], 6, "reading"),

  sec(2, "rd-raft", U.chobun, "長文読解（漂うプラスチックに乗る生き物）", READ_LEAD, {
    lang: "en",
    title: "Travelers on Floating Plastic",
    body: `Far from land, in the middle of the North Pacific, there is a region where currents collect floating plastic from all around the ocean. Scientists who sampled pieces of this debris expected to find a few open-ocean creatures living on them. Instead, they found something that surprised them: small crabs, sea anemones and other animals that normally live only along coasts, thousands of kilometers from the nearest shore.

Animals have always traveled across the sea on floating objects. After storms, tree trunks and masses of seaweed can carry insects, lizards and small crabs to distant islands, and biologists believe that many islands were first reached by life in this way. But natural rafts do not last long. Wood eventually sinks or is eaten by worms, and seaweed breaks apart. {{(A) Most of the passengers die before they reach anywhere, and only a lucky few survive long enough to arrive on a new shore.}}

Plastic has changed this situation in two ways. First, there is far more of it than there ever was of natural floating material in the open ocean. Second, it lasts much longer. A plastic crate or a fishing net can remain afloat for years, [ 1 ] enough time for coastal animals not only to survive the journey but also to grow, reproduce and form whole communities in the middle of the sea. {{(B) In the samples from the North Pacific, some of the coastal species were found with eggs and young, which suggests that they were not simply surviving but living there for generation after generation.}}

This discovery raises new questions for biologists. Until recently, the open ocean was thought to be an environment in which coastal species could not survive for long, because it offers little food and nothing to hold on to. Plastic seems to provide the surface that these animals need, while their food may come from tiny organisms carried by the currents. Some researchers have even suggested that floating plastic has created a new kind of habitat.

It might seem that new life in the ocean is good news, but most scientists see it as a warning. Animals carried on plastic may eventually wash up on shores far from their homes. {{(C) There, they may compete with local species for food and space, or bring diseases against which the local animals have no defense.}} Islands are especially at risk, since their plants and animals have often developed in isolation. Moreover, these communities show how deeply human waste has changed the ocean. A region once thought to be almost empty of coastal life now holds animals that would never have been there without us.`,
    notes: [{ word: "debris", meaning: "漂流物・ごみ" }, { word: "sea anemone", meaning: "イソギンチャク" }, { word: "habitat", meaning: "生息地" }],
  }, [
    C("blank1", 1, U.bunshi, "空所［ 1 ］に入る最も適切なものを選べ。", ["giving", "given", "to give", "gives"], 0, [
      "正解。分詞構文 giving enough time …「（その結果）…に十分な時間を与える」。主語は前の節の内容（何年も浮いていること）。",
      "given（与えられて）では受け身になり、後ろの enough time と目的語の関係が合わない。",
      "to give では「与えるために」と目的の意味になり、浮いている目的としては不自然。",
      "gives は接続詞なしでは前の節とつなげない。",
    ], "コンマ＋-ing の分詞構文は「そして～する」", [
      ["形", "… can remain afloat for years, {{giving}} enough time for … to do：結果の分詞構文。"],
      ["除外", "{{gives}} は節を二つ接続詞なしで並べることになる。"],
    ], K),
    EX("ex-a", 2, "下線部(A)のようなことが起こるのはなぜか。本文に即して説明せよ。", 60,
      "自然のいかだである木はやがて沈んだり虫に食べられたりし、海藻もばらばらになるなど、長く浮いていられないから。",
      exRubric(["自然のいかだは長くもたないことを書いている", ["長く", "もたない", "浮いて"]], ["木が沈む・食べられる、海藻がばらばらになる例を書いている", ["木", "沈", "海藻"]]),
      "直前の natural rafts do not last long が鍵", [
        ["主張", "{{natural rafts do not last long}}。"],
        ["具体例", "Wood {{sinks or is eaten by worms}}, and seaweed {{breaks apart}}。"],
      ]),
    JT("tr-b", 2, "(B)",
      "北太平洋の試料では、沿岸の種の一部が卵や幼生とともに見つかった。このことは、それらがただ生きのびていたのではなく、何世代にもわたってそこで暮らしていたことを示している。",
      jtRubric("非制限の which（前の節全体）・not simply A but B", ["このことは", "ではなく"], "eggs and young・generation after generation", ["卵", "幼生", "何世代"]),
      "コンマ＋which は前の文全体を受けることがある", [
        ["関係詞", ", {{which suggests that}} …：which は「卵や幼生とともに見つかったこと」。"],
        ["対比", "they were {{not simply surviving but living}} there：「ただ生きのびていたのではなく暮らしていた」。"],
      ], U.kandai),
    C("why", 2, U.chobun, "第3段落で、プラスチックが状況を変えた点として挙げられているものとして最も適切なものを選べ。", [
      "海に浮かぶ量が自然の漂流物よりはるかに多く、しかもずっと長くもつこと。",
      "自然の漂流物よりも軽く、遠くまで速く運ばれること。",
      "沿岸の動物の餌になり、その成長を早めること。",
      "海流の向きを変え、動物を島々に集めること。",
    ], 0, [
      "正解。First, there is far more of it … Second, it lasts much longer に一致。",
      "重さや速さは述べられていない。",
      "餌は海流に運ばれる小さな生物から得ている可能性がある（第4段落）。プラスチックが餌になるとは書いていない。",
      "海流がプラスチックを集めるのであって、プラスチックが海流を変えるのではない。",
    ], "First / Second の列挙を探す", [
      ["一つ目", "{{First}}, there is {{far more of it}}。"],
      ["二つ目", "{{Second}}, it {{lasts much longer}}。"],
    ]),
    EX("ex-c", 3, "多くの科学者が、外洋にできた沿岸の生き物の集団を「警告」とみなすのはなぜか。本文に即して二点説明せよ。", 80,
      "プラスチックに乗った動物が遠い海岸に流れ着き、在来の種と餌や場所を争ったり病気をもちこんだりするおそれがあるうえ、人間の廃棄物が海を深く変えたことを示すから。",
      exRubric(["流れ着いた先で在来種と争う・病気をもちこむおそれを書いている", ["在来", "争", "病気"]], ["人間の廃棄物が海を深く変えたことを示すことを書いている", ["廃棄物", "ごみ", "変え"]]),
      "Moreover の前後で理由が二つに分かれる", [
        ["一点目", "wash up on shores far from their homes → {{compete with local species}}・{{bring diseases}}。"],
        ["二点目", "{{Moreover}}, … show how deeply {{human waste has changed the ocean}}。"],
      ]),
    C("agree", 3, U.chobun, "本文の内容と一致するものを選べ。", [
      "Natural objects such as tree trunks have long carried living things to distant islands.",
      "The scientists expected to find many coastal animals in the North Pacific samples.",
      "The writer believes that the new communities on plastic are good news for islands.",
      "Coastal animals in the open ocean are known to feed on the plastic they live on.",
    ], 0, [
      "正解。第2段落：嵐のあと、木の幹や海藻のかたまりが虫やトカゲ、小さなカニを遠くの島に運ぶ。",
      "第1段落：外洋の生き物が少しいると予想していたが、沿岸の動物が見つかって驚いた。",
      "最終段落：多くの科学者は警告とみなし、島はとくに危険にさらされている。",
      "第4段落：餌は海流に運ばれる小さな生物から来るのかもしれない、とある。",
    ], "予想と結果（expected … Instead）の区別に注意", [
      ["正解の根拠", "Animals {{have always traveled}} across the sea on floating objects … tree trunks …。"],
      ["誤りの根拠", "expected to find {{a few open-ocean creatures}}. {{Instead}}, … coastal animals。"],
    ]),
  ], 6, "reading"),
];

// =====================================================================
// 第3問　長文読解（論説・要旨を英語で）
//   並び: 空所(d1)・和訳(d2)・内容説明(d2)・選択(d2)・内容一致(d2)・英語の要約(d3)
// =====================================================================

const P3: ExamPoolSection[] = [
  sec(3, "rd-laugh-together", U.chobun, "長文読解（いっしょに笑うこと）", READ3_LEAD, {
    lang: "en",
    title: "Why We Laugh Together",
    body: `Ask people why they laugh, and most will say that they laugh because something is funny. It seems a reasonable answer. Yet when researchers have actually recorded when and where people laugh in everyday life, the picture that emerges is rather different. In one well-known type of study, observers listened to ordinary conversations in public places and noted what was said just before each burst of laughter. Surprisingly, only a small proportion of the laughter followed anything that could be called a joke. Most of it came after quite ordinary remarks, such as "See you later" or "I know what you mean."

Another striking finding is that we laugh far more when we are with others than when we are alone. People who watch a comedy by themselves may find it amusing, but they laugh out loud much less [ 1 ] they would if they were watching it with friends. {{(A) This suggests that laughter is not mainly a reaction to humor but a form of communication, a signal sent from one person to another.}}

What does the signal mean? One answer is that laughter tells others that we are relaxed and that the situation is safe and friendly. When two people laugh together, they show each other that they share an understanding, and this can strengthen the relationship between them. {{(B) Some scientists have pointed out that young apes make a similar sound when they play, which suggests that laughter may have begun as a way of saying, "This is only a game; I do not mean to hurt you."}}

Laughter is also highly contagious. Hearing someone else laugh makes us more likely to laugh ourselves, even when we do not know what started it. This is why television comedies have long used recorded laughter, and why a single person laughing in a theater can set off the whole audience. The effect is strongest among people who know each other well. In experiments, listeners found the laughter of friends more catching than the laughter of strangers.

{{(C) Seen in this light, the fact that we laugh at remarks that are not funny is not so strange.}} When someone laughs at a friend's ordinary comment, they are not judging how clever it was; they are saying, "I am with you." Of course, laughter can also be used to exclude people, as anyone who has been laughed at knows. But in most cases its purpose is to bring people closer. Perhaps, then, the best way to understand laughter is not to study jokes but to study relationships.`,
    notes: [{ word: "contagious", meaning: "（感情などが）うつりやすい" }, { word: "ape", meaning: "類人猿" }],
  }, [
    C("blank1", 1, U.hikaku, "空所［ 1 ］に入る最も適切なものを選べ。", ["than", "as", "so", "that"], 0, [
      "正解。much less … than they would (laugh) if …：比較級 less を than で受ける。",
      "as は as … as の形で使うもので、比較級 less とは組まない。",
      "so では比較の相手を示せない。",
      "that では比較の相手を示せない。",
    ], "比較級があれば than を探す", [
      ["比較", "laugh out loud {{much less}} ＿ they would …：比較級 less → {{than}}。"],
      ["仮定", "they would (laugh) {{if they were watching}} it with friends：仮定法過去。"],
    ], K),
    JT("tr-a", 2, "(A)",
      "このことは、笑いが主にユーモアへの反応ではなく、意思伝達の一つの形、つまりある人から別の人へ送られる信号であることを示している。",
      jtRubric("not mainly A but B・同格のコンマ（a form of communication, a signal …）", ["ではなく", "つまり"], "a reaction to humor・a signal sent from one person to another", ["反応", "信号", "伝達"]),
      "コンマで並んだ名詞は言いかえ（同格）", [
        ["骨組み", "laughter is {{not mainly}} a reaction to humor {{but}} a form of communication。"],
        ["同格", "a form of communication{{, a signal}} sent from …：「つまり、～へ送られる信号」。sent は過去分詞の後置修飾。"],
      ]),
    EX("ex-b", 2, "下線部(B)で、科学者たちは笑いがもともとどのような働きをもっていたと考えているか。本文に即して説明せよ。", 60,
      "遊んでいる最中に、これはただの遊びであって相手を傷つけるつもりはないということを、相手に伝える働き。",
      exRubric(["遊びの最中に発せられるものであることを書いている", ["遊び"]], ["傷つけるつもりはないと伝える働きであることを書いている", ["傷つけるつもりはない", "伝える"]]),
      "引用符の中身を日本語でまとめる", [
        ["根拠", "young apes make a similar sound {{when they play}}。"],
        ["働き", "\"This is only a game; {{I do not mean to hurt you}}.\" と伝える方法として始まった。"],
      ]),
    C("light", 2, U.chobun, "下線部(C)の this light が指す内容として最も適切なものを選べ。", [
      "笑いは主に、相手と気持ちを共有し親しさを示すための信号だという考え方。",
      "笑いは、面白いことに対する自然な反応だという考え方。",
      "笑いは、人を仲間はずれにするために使われるという考え方。",
      "テレビ番組では、録音された笑い声が使われているという事実。",
    ], 0, [
      "正解。第2〜4段落で述べた、笑いはコミュニケーションの信号で、親しい人ほどうつりやすいという見方。その見方に立てば、面白くない発言に笑うのもふしぎではない。",
      "これは第1段落で否定された、ふつうの人の答え。",
      "仲間はずれは直後で「もちろん～もある」と例外として触れられているだけ。",
      "録音の笑い声は、笑いがうつりやすいことの一例にすぎない。",
    ], "in this light＝この観点から見ると（前の議論全体）", [
      ["表現", "{{Seen in this light}}＝「この観点から見れば」。直前までの議論を受ける。"],
      ["続き", "直後：they are saying, \"{{I am with you}}.\" → 笑い＝親しさの信号。"],
    ]),
    C("agree", 2, U.chobun, "本文の内容と一致するものを選べ。", [
      "In experiments, people were more likely to catch the laughter of friends than that of strangers.",
      "Most of the laughter recorded in public places followed jokes.",
      "People laugh out loud more when they watch comedies alone than with friends.",
      "The writer claims that laughter is never used to exclude people.",
    ], 0, [
      "正解。第4段落：友人の笑い声のほうが、知らない人の笑い声よりうつりやすかった。",
      "第1段落：冗談のあとの笑いはごく一部で、大部分はふつうの発言のあと。",
      "第2段落：一人のときは、友人といるときよりずっと声を出して笑わない。",
      "最終段落：笑いが人を排除するのに使われることもある、と認めている。",
    ], "never・most など範囲を表す語を本文と照らす", [
      ["正解の根拠", "listeners found {{the laughter of friends more catching}} than the laughter of strangers。"],
      ["誤りの根拠", "only {{a small proportion}} … followed … a joke／laughter {{can also be used to exclude}} people。"],
    ]),
    SUM("summary",
      "Research shows that people laugh mostly at ordinary remarks and far more often with others than alone. Laughter is therefore mainly a social signal that shows friendliness and shared understanding, bringing people closer together.",
      sumRubric(["笑いはおもに冗談ではなくふつうの発言に対して、また人といるときに起こることを書いている", ["ordinary", "others", "alone", "not jokes"]], ["笑いは親しさを示し人を結びつける社会的な信号だという主張を書いている", ["signal", "social", "closer", "relationship"]]),
      "要約は「観察事実→そこから言える主張」の2文で", [
        ["事実", "① ふつうの発言で笑う ② {{一人より人といるとき}}に笑う。"],
        ["主張", "笑いは {{a social signal}} で、人を {{bring closer}}。本文の語句をそのまま写さず言いかえる。"],
      ]),
  ], 6, "reading"),

  sec(3, "rd-humor", U.chobun, "長文読解（何がおかしさを生むのか）", READ3_LEAD, {
    lang: "en",
    title: "The Puzzle of What Makes Us Laugh",
    body: `Philosophers have been trying to explain humor for more than two thousand years, and they have still not agreed. One of the oldest ideas is that we laugh when we feel superior to others, for example when someone slips on a banana skin. There is some truth in this, but it cannot explain why we laugh at a clever play on words, which makes no one look foolish, or why small children laugh when an adult pretends to be a dog.

A more popular explanation today is that humor depends on incongruity, that is, on something that does not fit our expectations. A joke typically leads us to expect one thing and then gives us another. {{(A) The pleasure comes at the moment when we suddenly see that the unexpected ending makes sense after all, in a way we had not imagined.}} A child who sees a parent barking on all fours is enjoying exactly this kind of surprise: the familiar person is doing something that a parent should not do, yet it is obviously still the same parent.

But incongruity alone is not enough. Many surprises are not funny at all. If you open your front door and find a stranger in your kitchen, the situation is certainly unexpected, but you are unlikely to laugh. {{(B) For something unexpected to be funny, it seems, we must also feel that it is harmless, or at least that no one is really in danger.}} The man slipping on a banana skin is funny only as long as we believe he has not broken his leg. Once we see that he is badly hurt, the laughter stops.

This idea helps to explain why the same joke can delight one person and offend another. Whether a situation feels harmless depends on who we are and what we care about. A joke about a particular group may seem like innocent fun to people outside it but feel like an attack to those within it. Similarly, a joke about a painful event may be welcome many years later but cruel if told [ 1 ] after it happened. {{(C) Timing and distance, in other words, can turn something hurtful into something we are able to laugh at, and the reverse is also true.}}

None of these theories can capture everything about humor, which may be too varied to be reduced to a single formula. Still, they suggest that a sense of humor is not a trivial gift. To find something funny, we must notice what does not fit, understand why it fits after all, and judge whether laughing at it will cause harm. Laughter, in this view, is a sign of a mind that is working hard, even while it seems to be at play.`,
    notes: [{ word: "incongruity", meaning: "不調和・つじつまの合わなさ" }, { word: "on all fours", meaning: "四つんばいで" }],
  }, [
    C("blank1", 1, U.vocab, "空所［ 1 ］に入る最も適切なものを選べ。", ["shortly", "lately", "hardly", "nearly"], 0, [
      "正解。shortly after ～ で「～の直後に」。何年も後（many years later）との対比になる。",
      "lately は「最近」で、after it happened を修飾できない。",
      "hardly は「ほとんど～ない」の否定語で、意味が通らない。",
      "nearly after という言い方はしない。",
    ], "shortly after＝～のすぐ後に", [
      ["対比", "{{many years later}} ↔ {{shortly after}} it happened。"],
      ["語法", "shortly＝soon。shortly before / after の形でよく使う。"],
    ], K),
    JT("tr-a", 2, "(A)",
      "喜びが生じるのは、意外な結末が、想像もしなかったかたちで結局は筋が通っていると、突然わかる瞬間である。",
      jtRubric("the moment when SV（関係副詞）・make sense after all", ["瞬間", "結局"], "the unexpected ending・in a way we had not imagined", ["意外", "結末", "想像"]),
      "make sense＝筋が通る・意味をなす", [
        ["骨組み", "The pleasure comes {{at the moment when}} we suddenly see that …。"],
        ["語句", "{{makes sense after all}}＝「結局は筋が通っている」。in a way {{(that) we had not imagined}}。"],
      ]),
    EX("ex-b", 2, "下線部(B)の考えを、本文のバナナの皮の例を用いて説明せよ。", 60,
      "バナナの皮で滑った男は、足を折っていないと思えるあいだだけおかしく、ひどいけがだとわかると笑いは止まるということ。",
      exRubric(["けがをしていないと思えるあいだだけおかしいことを書いている", ["あいだだけ", "折っていない", "けがをしていない"]], ["ひどいけがだとわかると笑いが止まることを書いている", ["けが", "止まる"]]),
      "as long as と Once の対比を使う", [
        ["条件", "funny {{only as long as}} we believe he has not broken his leg。"],
        ["反対", "{{Once}} we see that he is badly hurt, the laughter stops。"],
      ]),
    C("superior", 2, U.chobun, "第1段落で、「優越感から笑う」という考え方では説明できない例として挙げられているものとして最も適切なものを選べ。", [
      "だれも愚かに見せることのない、巧みなことば遊びに笑うこと。",
      "バナナの皮で滑った人を見て笑うこと。",
      "家の台所に知らない人がいるのを見つけること。",
      "痛ましい出来事についての冗談に腹を立てること。",
    ], 0, [
      "正解。a clever play on words, which makes no one look foolish：だれも見下されないのに笑う。",
      "これは優越の考え方の典型例として挙げられている。",
      "これは第3段落の、意外でもおかしくない例。",
      "これは第4段落の、時期によって冗談が残酷になる例。",
    ], "cannot explain why … の後ろが説明できない例", [
      ["根拠", "it {{cannot explain why}} we laugh at a clever play on words, which {{makes no one look foolish}}。"],
      ["もう一つの例", "大人が{{犬のまねをする}}のを見て子どもが笑うこと。"],
    ]),
    C("agree", 2, U.chobun, "本文の内容と一致するものを選べ。", [
      "The writer suggests that the same joke can seem harmless to some people and hurtful to others.",
      "According to the writer, every surprise is likely to make people laugh.",
      "The writer believes that humor can easily be explained by a single formula.",
      "The superiority theory explains why small children laugh at adults pretending to be dogs.",
    ], 0, [
      "正解。第4段落：ある集団についての冗談は、外の人には無邪気な楽しみでも、中の人には攻撃に感じられることがある。",
      "第3段落：多くの驚きはまったくおかしくない。",
      "最終段落：ユーモアは多様すぎて一つの公式にはまとめられないかもしれない。",
      "第1段落：これは優越の考え方では説明できない例として挙げられている。",
    ], "筆者の留保（may be too varied）を読み落とさない", [
      ["正解の根拠", "may seem like {{innocent fun}} to people outside it but {{feel like an attack}} to those within it。"],
      ["誤りの根拠", "{{Many surprises are not funny at all}}／too varied to be reduced to {{a single formula}}。"],
    ]),
    SUM("summary",
      "Humor seems to arise when something unexpected turns out to make sense, but only if it also feels harmless. Because this depends on who we are and on timing, finding something funny requires active thinking.",
      sumRubric(["意外なものが結局は筋が通るときにおかしさが生まれる（不調和）ことを書いている", ["unexpected", "make sense", "does not fit"]], ["害がないと感じられる必要があり、それは人や時期によって変わる・頭を働かせる営みだと書いている", ["harmless", "timing", "thinking", "mind"]]),
      "理論の流れ（不調和→無害→人と時期→頭の働き）をつなぐ", [
        ["骨組み", "① {{incongruity}}（意外だが筋が通る） ② ただし {{harmless}} であること。"],
        ["結論", "人と時期で変わる → おかしさを感じるには{{頭が働いている}}。"],
      ]),
  ], 6, "reading"),

  sec(3, "rd-robot", U.chobun, "長文読解（ロボットと介護）", READ3_LEAD, {
    lang: "en",
    title: "Can a Machine Care?",
    body: `In many countries, the number of elderly people who need daily help is growing faster than the number of people available to provide it. Care workers are often overworked and poorly paid, and many leave the profession within a few years. Against this background, robots designed to assist in care homes have attracted growing interest. Some can lift a person from a bed into a wheelchair, a task that frequently causes back injuries among human staff. Others remind residents to take their medicine, or talk with them and play simple games.

Supporters argue that such machines will not replace human carers but free them. {{(A) If a robot takes over heavy lifting and routine checks, the staff will have more time for the parts of the job that only a human can do, such as listening to a resident's worries or holding a hand.}} In a care home in a small town that we will call Midori, staff who began using a lifting robot reported fewer injuries and said they felt less exhausted at the end of each shift.

Critics, however, see a danger in this reasoning. Care, they point out, is not simply a set of tasks to be completed. {{(B) When a nurse helps someone out of bed, the physical act is accompanied by a greeting, a joke or a glance that tells the person that they are noticed and valued.}} If the lifting is done by a machine, these small moments may disappear, and nobody may notice that they are gone. There is also the concern that managers under financial pressure might use robots not to give staff more time with residents but to reduce the number of staff. [ 1 ] that happened, the people receiving care could end up lonelier than before.

The experience of Midori suggests that the outcome depends less on the technology itself than on how it is introduced. There, the decision to buy the robot was made together with the care workers, who were asked which tasks they most wanted help with. The time saved was deliberately set aside for conversation and outdoor walks with residents. {{(C) In other homes, where robots were introduced mainly to cut costs, residents complained that they saw fewer familiar faces than before.}}

The question, then, is not simply whether a machine can care. In the full sense of the word, it probably cannot, since care involves understanding of and concern for another person. The more important question is whether we use machines in a way that allows humans to care better. Answering it requires us to be clear about what we value in care before we decide what to hand over to robots.`,
    notes: [{ word: "resident", meaning: "（施設の）入居者" }, { word: "shift", meaning: "（交代制の）勤務時間" }],
  }, [
    C("blank1", 1, U.setsuzoku, "空所［ 1 ］に入る最も適切なものを選べ。", ["If", "Unless", "Although", "Whether"], 0, [
      "正解。If that happened, … could end up lonelier：「もしそうなれば、より孤独になりかねない」という仮定。",
      "Unless（～しない限り）では、職員が減らされない限り孤独になる、と逆の意味になる。",
      "Although（～だけれども）では、前後が対立せず意味が通らない。",
      "Whether の節は、or not などを伴わずに条件の副詞節としては使いにくく、意味も通らない。",
    ], "後ろの could に合う仮定の接続詞を選ぶ", [
      ["文脈", "that＝{{職員の数を減らすこと}}。それが起これば入居者は孤独になりうる。"],
      ["形", "{{If}} that happened, … {{could}} end up …：仮定法過去で可能性を控えめに述べる。"],
    ], K),
    JT("tr-a", 2, "(A)",
      "もしロボットが重い物を持ち上げる作業や決まった確認を引き受ければ、職員は、入居者の心配ごとに耳を傾けたり手を握ったりといった、人間にしかできない仕事の部分に、より多くの時間を使えるようになるだろう。",
      jtRubric("If SV, S will V・the parts of the job that only a human can do（関係詞）", ["もし", "にしかできない"], "take over・routine checks・such as", ["引き受け", "確認", "といった"]),
      "only a human can do＝人間にしかできない", [
        ["条件", "{{If}} a robot {{takes over}} heavy lifting and routine checks：take over＝引き継ぐ。"],
        ["関係詞", "the parts of the job {{that only a human can do}}, such as …：such as 以下が具体例。"],
      ]),
    EX("ex-b", 2, "下線部(B)を通して、批判する人々は介護についてどのようなことを言おうとしているか。本文に即して説明せよ。", 60,
      "介護は作業の集まりではなく、体の手助けに伴うあいさつや視線が、相手に大切にされていると伝えているということ。",
      exRubric(["介護は単なる作業の集まりではないことを書いている", ["作業", "ではない"]], ["手助けに伴うあいさつ・冗談・視線が、気にかけていると伝えることを書いている", ["あいさつ", "視線", "大切", "伝え"]]),
      "直前の「介護は作業の集まりではない」が主張", [
        ["主張", "Care is {{not simply a set of tasks}} to be completed。"],
        ["具体例", "the physical act is {{accompanied by}} a greeting, a joke or a glance → {{noticed and valued}}。"],
      ]),
    C("why", 2, U.chobun, "下線部(C)のような不満が生じた理由として、本文から推測できる最も適切なものを選べ。", [
      "ロボットが主に費用を減らすために導入され、職員の数が減らされたから。",
      "ロボットが入居者と会話したり遊んだりできなかったから。",
      "職員がロボットの使い方を知らず、けがが増えたから。",
      "ロボットを買うかどうかを、職員と長く話し合いすぎたから。",
    ], 0, [
      "正解。第3段落の「経営者がロボットを職員を減らすために使うかもしれない」という懸念と、mainly to cut costs・fewer familiar faces が結びつく。",
      "第1段落：会話やゲームをするロボットもある。不満の理由として書かれていない。",
      "けがが増えたという記述はない。Midori ではけがが減った。",
      "職員と相談したのは Midori の例で、うまくいった側。",
    ], "前の段落の「懸念」が具体化した例として読む", [
      ["懸念", "第3段落：managers … might use robots … {{to reduce the number of staff}}。"],
      ["具体化", "introduced mainly {{to cut costs}} → saw {{fewer familiar faces}}（なじみの職員が減った）。"],
    ]),
    C("agree", 2, U.chobun, "本文の内容と一致するものを選べ。", [
      "In Midori, the time saved by the robot was intentionally used for conversation and walks with residents.",
      "The robot in Midori was bought by the managers without consulting the care workers.",
      "The writer believes that machines can care for people in the full sense of the word.",
      "Staff in Midori reported more injuries after they began using the lifting robot.",
    ], 0, [
      "正解。第4段落：The time saved was deliberately set aside for conversation and outdoor walks with residents。",
      "第4段落：購入は介護職員といっしょに決め、何を手伝ってほしいか尋ねた。",
      "最終段落：ことばの完全な意味では、おそらくできない（probably cannot）。",
      "第2段落：けがが減り、疲れも少なくなったと報告した。",
    ], "deliberately ≒ intentionally の言いかえ", [
      ["正解の根拠", "The time saved was {{deliberately set aside}} for conversation and outdoor walks。"],
      ["誤りの根拠", "made {{together with the care workers}}／it {{probably cannot}}。"],
    ]),
    SUM("summary",
      "Care robots can free staff from heavy, routine tasks, but they may also remove small human moments or be used to cut staff. Whether they improve care depends on how people choose to introduce them.",
      sumRubric(["ロボットの利点（重い作業から解放）と懸念（人間的なふれあいが消える・人員削減）の両面を書いている", ["free", "routine", "cut", "moments"]], ["結果は技術そのものより導入のしかたによるという結論を書いている", ["depends on how", "introduce", "way"]]),
      "賛否の両面→筆者の結論、の順でまとめる", [
        ["両面", "利点：{{free staff}}／懸念：{{small moments}} が消える・{{reduce staff}}。"],
        ["結論", "depends {{less on the technology than on how it is introduced}} を自分のことばで。"],
      ]),
  ], 6, "reading"),
];

// =====================================================================
// 第4問　自由英作文（100語程度の意見文）
// =====================================================================

const ES_LEAD = "次の問いについて、あなたの考えを100語程度の英語で述べよ。";
const esRubric = (stance: string[]): Rub => [
  ["問いに正面から答え、立場・主張がはっきりしている", 4, stance],
  ["理由・具体例で主張を支え、段落として論理がつながっている", 5, ["First", "For example", "However", "because"]],
  ["文法・語法・つづりの誤りが少なく、表現が適切", 4, []],
  ["語数（100語程度）を守り、結論でまとめている", 2, []],
];
const ES = (id: string, d: 2 | 3, q: string, model: string, stance: string[], point: string, st: St[]): QuestionB =>
  Wr(id, d, U.jiyu, `${ES_LEAD}\n問い：${q}`, { min: 85, max: 120, unit: "語" }, model, esRubric(stance), point, st, 1200);

const P4: ExamPoolSection[] = [
  sec(4, "es-school", U.jiyu, "自由英作文（学校で学ぶこと）", ES_LEAD, null, [
    ES("volunteer", 2, "Should all high school students be required to do volunteer work? Explain your opinion with reasons.",
      "I believe that high school students should be encouraged, but not required, to do volunteer work. Volunteering can teach young people a great deal. For example, helping at a local care home or cleaning a beach shows them problems in their community that they may never have noticed. However, if volunteering becomes compulsory, many students will do it only to meet the requirement, and the experience may lose its meaning. Some students also have to look after family members or work part-time after school. Therefore, schools should offer a wide range of opportunities and let students choose freely whether to take part.",
      ["I believe", "encouraged, but not required"], "賛否の中間の立場は「条件」をはっきり書く", [
        ["立場", "{{encouraged, but not required}}：義務化には反対、参加の推奨には賛成。"],
        ["構成", "① 利点の例 ② {{However}} 義務化の欠点 ③ 事情のある生徒 ④ {{Therefore}} 提案。"],
      ]),
    ES("money", 3, "Should schools teach students how to manage money? Explain your opinion with reasons.",
      "In my opinion, schools should teach students how to manage money. Today, young people can buy things online with a few clicks, and many of them use smartphone payments every day. As a result, it is easy to spend more than they realize. If students learn how to make a budget and compare prices at school, they will be able to avoid serious debt in the future. In addition, understanding basic ideas such as interest and saving will help them make better decisions when they begin to work. Parents can teach these things too, but not every family has the time or knowledge to do so.",
      ["In my opinion", "should teach"], "現代の状況→学ぶ効果→予想される反論、の順に", [
        ["背景", "{{online}}・{{smartphone payments}} → 気づかず使いすぎる。"],
        ["反論への答え", "Parents can teach these things too, {{but}} not every family …：家庭任せにできない理由。"],
      ]),
  ], 1, "writing"),

  sec(4, "es-tech", U.jiyu, "自由英作文（技術と人のつながり）", ES_LEAD, null, [
    ES("ai-elderly", 2, "Should elderly people be encouraged to use smartphones and AI assistants in their daily lives? Explain your opinion.",
      "I think elderly people should be encouraged to use smartphones and AI assistants, as long as they receive enough support. These tools can make daily life much easier. For example, my grandmother lives alone, and she now uses a video call app to talk with our family every week. An AI assistant can also remind people to take their medicine or tell them about the weather. However, many older people find new devices confusing, so local governments and families should offer simple lessons. With proper help, technology can allow elderly people to live independently and stay connected with others for longer.",
      ["I think", "should be encouraged"], "具体例は身近な一人の経験で十分", [
        ["条件", "{{as long as they receive enough support}}：賛成に条件をつける。"],
        ["例", "my grandmother … {{video call app}}：具体的な場面で説得力を出す。"],
      ]),
    ES("online-friends", 3, "Some people say that friendships made online are as valuable as those made face to face. Do you agree? Explain your opinion.",
      "I partly agree that friendships made online can be as valuable as face-to-face ones. Online, we can meet people who share unusual interests, and these friends may understand us better than classmates do. For example, I have a friend abroad whom I met through a language-learning site, and we have supported each other for two years. However, online friendships can end easily, because either person can simply stop replying. When we spend time with someone in person, we see how they act in difficult situations, which builds deeper trust. Therefore, I think online friendships are valuable, but they become strongest when we eventually meet.",
      ["I partly agree", "as valuable as"], "partly agree は両面を書いて結論で統合する", [
        ["両面", "利点：{{share unusual interests}}／欠点：{{end easily}}。"],
        ["結論", "online friendships are valuable, {{but}} they become strongest when we eventually meet。"],
      ]),
  ], 1, "writing"),

  sec(4, "es-community", U.jiyu, "自由英作文（地域と暮らし）", ES_LEAD, null, [
    ES("move", 2, "Is it better to live in the same town all your life or to move to different places? Explain your opinion.",
      "I think it is better to live in several different places, at least when we are young. Moving to a new town forces us to meet new people and adapt to different customs, which helps us become more flexible. For example, when my family moved to another prefecture, I had to make new friends from the beginning, and I learned how to start conversations with strangers. On the other hand, living in one town allows people to build long-lasting relationships. So after gaining various experiences, I would like to settle down in one place and contribute to that community.",
      ["I think", "better to live in several different places"], "「時期」で立場を分けると両方の利点を生かせる", [
        ["立場", "{{at least when we are young}}：若いうちは移り住むほうがよい。"],
        ["締め", "{{On the other hand}} で相手側の利点 → after gaining experiences … settle down。"],
      ]),
    ES("local-history", 3, "Do you think it is important for young people to learn about the history of the area where they live? Explain your opinion.",
      "Yes, I think it is important for young people to learn about the history of their local area. First, local history makes the past feel real. When students learn that a battle, a flood or a great trade once took place on the streets they walk every day, history is no longer just names in a textbook. Second, knowing why their town developed as it did can make young people proud of it and more interested in solving its problems. Of course, world history is also necessary, but understanding our own area gives us a starting point from which to understand the wider world.",
      ["Yes, I think", "important"], "First / Second で理由を二つ、Of course で譲歩", [
        ["理由", "{{First}} 過去が身近になる／{{Second}} 町への誇りと関心。"],
        ["譲歩", "{{Of course}}, world history is also necessary, {{but}} …：反論を先取りして結論へ。"],
      ]),
  ], 1, "writing"),
];

// =====================================================================
// 第5問　和文英訳
// =====================================================================

const TR_LEAD = "次の文章の下線部を英語に訳せ。";
/** 和文英訳の採点基準 (10点) */
const trRubric = (frame: string[], words: string[], content: string[]): Rub => [
  ["文の骨組み（構文・時制・語順）が正しい", 4, frame],
  ["語句の選び方・語法が適切", 3, words],
  ["内容にぬけ・つけ足しがない", 3, content],
];
const TR = (id: string, d: 1 | 2 | 3, label: string, model: string, also: string[], rub: Rub, point: string, st: St[]): QuestionB =>
  Wr(id, d, U.wabun, `下線部${label}を英語に訳せ。`, undefined, model, rub, point, st, 480, also);

const P5: ExamPoolSection[] = [
  sec(5, "tr-walk", U.wabun, "和文英訳（散歩と考えごと）", TR_LEAD, {
    lang: "ja",
    body: `考えごとに行きづまると、私はよく近所を散歩する。{{ア　机の前でいくら悩んでも出てこなかった答えが、歩いているうちにふと浮かぶことがある。}}{{イ　体を動かしていると、頭の中のこわばりがほぐれて、ふだんなら結びつかない考え同士が出会うのかもしれない。}}{{ウ　大事なのは、答えを見つけようと意気込みすぎず、目に入るものに気を取られるにまかせることだ。}}`,
  }, [
    TR("a", 2, "ア", "Sometimes an answer that I could not find no matter how long I worried at my desk suddenly comes to me while I am walking.",
      ["An answer that never came to me, however hard I thought at my desk, sometimes occurs to me while I am out walking."],
      trRubric(["Sometimes", "no matter how", "while I am walking"], ["come to me", "occur to", "worry"], ["いくら悩んでも", "ふと", "歩いているうちに"]),
      "「いくら～しても」は no matter how / however", [
        ["譲歩", "いくら悩んでも＝ {{no matter how long I worried}}／however hard I thought。"],
        ["浮かぶ", "答えが浮かぶ＝ an answer {{comes to me}}／{{occurs to me}}。"],
      ]),
    TR("i", 3, "イ", "Perhaps moving my body loosens the stiffness in my mind, so that ideas which would not normally be connected can meet.",
      ["It may be that when I move my body, my mind relaxes and thoughts that usually have nothing to do with each other come together."],
      trRubric(["Perhaps / It may be that", "so that", "would not normally"], ["loosen", "stiffness", "be connected"], ["体を動かす", "こわばりがほぐれ", "ふだんなら結びつかない"]),
      "「～のかもしれない」は文全体を Perhaps で包む", [
        ["推量", "～のかもしれない＝ {{Perhaps}} …／{{It may be that}} …。"],
        ["仮定の含み", "ふだんなら結びつかない＝ ideas which {{would not normally be connected}}。"],
      ]),
    TR("u", 3, "ウ", "What is important is not to try too hard to find an answer, but to let yourself be distracted by whatever you see.",
      ["The important thing is to allow your attention to be caught by whatever comes into view, rather than being too eager to find an answer."],
      trRubric(["What is important is", "not A but B", "let O do"], ["try too hard", "be distracted", "whatever you see"], ["意気込みすぎず", "目に入るもの", "まかせる"]),
      "「～にまかせる」は let O do（受け身なら let O be p.p.）", [
        ["構文", "{{What is important is not to}} … {{but to}} …：不定詞をそろえる。"],
        ["使役", "気を取られるにまかせる＝ {{let yourself be distracted}} by …。"],
      ]),
  ], 2, "writing"),

  sec(5, "tr-dialect", U.wabun, "和文英訳（方言と故郷）", TR_LEAD, {
    lang: "ja",
    body: `進学のために故郷を離れて、初めて自分の話し方に方言が多いことに気づいた。{{ア　友人に言葉の意味を聞き返されるたびに、恥ずかしくて、なるべく標準語で話そうとした。}}{{イ　ところが、何年かたって帰省したとき、祖母の話す方言を聞いて、なんとも言えない懐かしさを覚えた。}}{{ウ　ことばは単に情報を伝える手段ではなく、それを話す人々の暮らしや記憶と切り離せないものなのだろう。}}`,
  }, [
    TR("a", 2, "ア", "Every time my friends asked me what a word meant, I felt embarrassed and tried to speak standard Japanese as much as possible.",
      ["Whenever my friends asked me the meaning of a word I had used, I was ashamed, so I tried to use standard Japanese as often as I could."],
      trRubric(["Every time / Whenever", "tried to", "過去形"], ["embarrassed", "standard Japanese", "as much as possible"], ["聞き返される", "恥ずかしくて", "なるべく"]),
      "「～するたびに」は every time SV / whenever SV", [
        ["接続詞", "～たびに＝ {{every time}} SV（接続詞として使える）。"],
        ["受け身の処理", "聞き返される → 友人を主語に {{my friends asked me what a word meant}}。"],
      ]),
    TR("i", 3, "イ", "However, when I went home a few years later and heard my grandmother speaking in our dialect, I felt a nostalgia that I could not put into words.",
      ["But when I returned to my hometown several years later, hearing my grandmother's dialect filled me with an indescribable sense of longing for the past."],
      trRubric(["However, when …", "hear O doing", "that I could not …"], ["go home", "dialect", "put into words", "nostalgia"], ["何年かたって", "祖母の話す方言", "なんとも言えない"]),
      "「なんとも言えない」は I could not put into words", [
        ["知覚動詞", "祖母が話すのを聞く＝ {{heard my grandmother speaking}}。"],
        ["表現", "なんとも言えない懐かしさ＝ a nostalgia {{that I could not put into words}}。"],
      ]),
    TR("u", 3, "ウ", "Perhaps a language is not merely a means of conveying information but something that cannot be separated from the lives and memories of the people who speak it.",
      ["Language is probably not just a tool for passing on information; it is closely tied to the lives and memories of those who speak it."],
      trRubric(["not merely A but B", "something that cannot be"], ["means of conveying information", "be separated from"], ["単に", "暮らしや記憶", "切り離せない"]),
      "「AではなくB」は not merely A but B で形をそろえる", [
        ["構文", "{{not merely}} a means … {{but}} something that …：名詞どうしを対にする。"],
        ["語句", "切り離せない＝ {{cannot be separated from}}。「それを話す人々」＝ the people who speak it。"],
      ]),
  ], 2, "writing"),

  sec(5, "tr-teach", U.wabun, "和文英訳（教わることと待つこと）", TR_LEAD, {
    lang: "ja",
    body: `子どものころ、祖父に魚のさばき方を教わったことがある。{{ア　祖父は手本を一度見せただけで、あとは私が失敗しても黙って見ているだけだった。}}{{イ　当時は不親切だと思ったが、今では、自分で考えさせるためにわざと口を出さなかったのだとわかる。}}{{ウ　人に何かを教えるときには、すぐに正解を与えるより、相手が自分でたどり着くのを待つほうが難しいが、得るものも大きい。}}`,
  }, [
    TR("a", 2, "ア", "My grandfather showed me how to do it only once, and after that he just watched in silence even when I made mistakes.",
      ["He demonstrated it just once; after that, even when I failed, he only watched me without saying a word."],
      trRubric(["showed me how to do it", "only once", "even when"], ["in silence", "without saying a word", "make mistakes"], ["一度見せただけ", "失敗しても", "黙って見ている"]),
      "「～しても」は even when / even if", [
        ["語句", "手本を見せる＝ {{show me how to do it}}／demonstrate。"],
        ["譲歩", "失敗しても＝ {{even when I made mistakes}}。黙って＝ {{in silence}}。"],
      ]),
    TR("i", 3, "イ", "At the time I thought he was unkind, but now I understand that he deliberately kept quiet in order to make me think for myself.",
      ["I thought he was being unfriendly then, but I now realize that he intentionally said nothing so that I would think on my own."],
      trRubric(["At the time … but now", "in order to / so that", "make O do"], ["deliberately", "keep quiet", "think for myself"], ["当時は", "わざと", "口を出さなかった"]),
      "「わざと」は deliberately / on purpose", [
        ["対比", "{{At the time}} I thought …, {{but now}} I understand …：時の対比。"],
        ["目的", "自分で考えさせるために＝ {{in order to make me think for myself}}。"],
      ]),
    TR("u", 3, "ウ", "When you teach someone something, it is harder to wait for them to reach the answer by themselves than to give them the right answer immediately, but they gain more from it.",
      ["In teaching, waiting until the learner finds the answer on their own is more difficult than handing them the correct answer at once, but it is also more rewarding."],
      trRubric(["it is harder to A than to B", "wait for O to do", "but"], ["reach the answer", "by themselves", "immediately"], ["すぐに正解を与える", "自分でたどり着く", "得るもの"]),
      "比べる二つを to 不定詞でそろえる", [
        ["比較", "{{it is harder to}} wait … {{than to}} give …：形式主語 it と不定詞の比較。"],
        ["語法", "相手がたどり着くのを待つ＝ {{wait for them to reach}} the answer。"],
      ]),
  ], 2, "writing"),
];

// =====================================================================

export const U_KYUSHU_EIGO: UnivExam = {
  key: "kyushu-eigo",
  univ: "九州大学",
  kamoku: "英語",
  tier: "国公立",
  order: 116,
  basis: "前期日程の傾向を参考（配点は学部で異なる。ここでは200点）",
  format: "大問5題・120分・200点。長文3題は和訳・内容説明の記述が中心で、英語での要約、100語程度の自由英作文、和文英訳が続く。",
  minutes: 120,
  groups: ["語彙", "文法", "技能"],
  sections: [
    { title: "第1問　長文読解（社会・歴史の論説）", lead: READ_LEAD, count: [6, 6], mix: [0, 0.4, 0.6], points: 45, prefer: "material", poolTag: "kyushu-eigo:1" },
    { title: "第2問　長文読解（自然科学の記事）", lead: READ_LEAD, count: [6, 6], mix: [0, 0.4, 0.6], points: 45, prefer: "material", poolTag: "kyushu-eigo:2" },
    { title: "第3問　長文読解（論説・英語での要約）", lead: READ3_LEAD, count: [6, 6], mix: [0, 0.4, 0.6], points: 50, prefer: "material", poolTag: "kyushu-eigo:3" },
    { title: "第4問　自由英作文（100語程度）", lead: ES_LEAD, count: [1, 1], mix: [0, 0.4, 0.6], points: 30, prefer: "material", poolTag: "kyushu-eigo:4" },
    { title: "第5問　和文英訳", lead: TR_LEAD, count: [2, 2], mix: [0, 0.4, 0.6], points: 30, prefer: "material", poolTag: "kyushu-eigo:5" },
  ],
  pool: [...P1, ...P2, ...P3, ...P4, ...P5],
};
