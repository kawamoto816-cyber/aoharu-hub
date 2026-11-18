import type { UnivExam } from "./types";
import type { ExamPoolSection } from "../pool/types";
import type { QuestionB, Skill, SolutionStep } from "@/lib/moshi/types";

// 一橋大学型 英語（国公立・2次試験）。前期日程（全学部共通問題）の傾向を参考にした形式（英文・設問はすべて書き下ろし）。
//   120分・大問3題。I は社会・文化の論説の長文読解（日本語の内容説明・下線部和訳・語句選択）、
//   II は科学・歴史の論説の長文読解（that・what などの文法・語法、空所補充、語句整序、内容一致）、
//   III は自由英作文（100〜140語）。聞き取り試験は行われていない。
//   学部ごとの英語の配点（230〜280点）は換算なので、ここでは200点に置きかえた（I 80・II 70・III 50）。
//   英文の題材・登場する店や町はすべて架空。実在の人物の発言は使っていない。
// 参考:
//   https://juken.hit-u.ac.jp/admission/info/files/R7_04_eigo_zenki_ito.pdf （大学公表の出題の意図：大問3題・説明・和訳・文法語法・整序・100〜140語の自由英作文）
//   https://jyuke-labo.com/daigakujyukentaisaku/hitotsubashidaigaku/kamokubetsu/ （120分・大問3題・学部別配点・聞き取り試験なし）
//   https://passnavi.obunsha.co.jp/univ/0330/jittai_report/ （入試の実態・配点）

const U = {
  chobun: "h-eng-skill-chobun",
  jiyu: "h-eng-skill-jiyu",
  vocab: "h-eng-vocab-2000",
  jukugo: "h-eng-vocab-jukugo",
  setsuzoku: "h-eng-gram-setsuzokushi",
  kandai: "h-eng-gram-kandai",
  kanfuku: "h-eng-gram-kanfuku",
  zenchi: "h-eng-gram-zenchishi",
  tokushu: "h-eng-gram-tokushu",
  waho: "h-eng-gram-waho",
  futeishi: "h-eng-gram-futeishi",
  meishi: "h-eng-gram-meishi",
  judo: "h-eng-gram-judo",
  keiyo: "h-eng-gram-keiyoshi",
  hikaku: "h-eng-gram-hikaku",
} as const;

type St = [string, string];
const steps = (s: St[]): SolutionStep[] => s.map(([title, body]) => ({ title, body }));
const K: Skill = "知識・技能";
const S: Skill = "思考・判断・表現";

/** 4択 */
function C(
  id: string,
  difficulty: 1 | 2 | 3,
  unit: string,
  prompt: string,
  options: string[],
  correct: number,
  why: string[],
  point: string,
  st: St[],
  skill: Skill = S,
): QuestionB {
  return { id, type: "B", difficulty, points: 6, seconds: 90 + 30 * difficulty, skill, unit, prompt, answer: { kind: "choice", options, correct, why }, point, steps: steps(st) };
}

/** 並べかえ */
function O(id: string, difficulty: 1 | 2 | 3, unit: string, prompt: string, tokens: string[], point: string, st: St[]): QuestionB {
  return { id, type: "B", difficulty, points: 6, seconds: 150, skill: K, unit, prompt, answer: { kind: "order", tokens }, point, steps: steps(st) };
}

/** 記述 (説明・和訳・英作文) */
function Wr(
  id: string,
  difficulty: 1 | 2 | 3,
  unit: string,
  prompt: string,
  limit: { min?: number; max?: number; unit: "語" | "字" } | undefined,
  model: string,
  rubric: [string, number, string[]][],
  point: string,
  st: St[],
  seconds: number,
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

/** 内容説明 (日本語・字数制限つき・10点) */
const EX = (id: string, d: 1 | 2 | 3, prompt: string, max: number, model: string, rubric: [string, number, string[]][], point: string, st: St[]): QuestionB =>
  Wr(id, d, U.chobun, `${prompt}（${max}字以内の日本語で）`, { max, unit: "字" }, model, rubric, point, st, 240 + 60 * d);

/** 下線部和訳 (10点) */
const WA = (id: string, d: 1 | 2 | 3, label: string, model: string, frame: string[], words: string[], point: string, st: St[]): QuestionB =>
  Wr(id, d, U.chobun, `下線部${label}を日本語に訳せ。`, undefined, model, [
    ["文の構造（主語・述語・修飾関係）を正しくとらえている", 4, frame],
    ["重要な語句・表現を文脈に合わせて訳している", 4, words],
    ["自然な日本語になっている", 2, []],
  ], point, st, 300);

const READ1_LEAD = "次の英文を読み、設問に答えよ。説明は日本語で、指定された字数以内で書くこと。";
const READ2_LEAD = "次の英文を読み、文法・語法と内容に関する設問に答えよ。";
const ES_LEAD = "次の問いに、100〜140語の英語で答えよ。";

function reading(tag: number, id: string, title: string, lead: string, ptitle: string, body: string, questions: QuestionB[], pick: number, notes?: { word: string; meaning: string }[]): ExamPoolSection {
  return {
    unit: U.chobun,
    tag: `hitotsubashi-eigo:${tag}`,
    section: {
      id: `hit-en-${id}`,
      title,
      lead,
      style: "reading",
      examOnly: true,
      material: [{ kind: "passage", lang: "en", title: ptitle, body, ...(notes ? { notes } : {}) }],
      pick,
      questions,
    },
  };
}

// =====================================================================
// 第1問　長文読解（社会・文化の論説：内容説明・下線部和訳）
// =====================================================================

const P1: ExamPoolSection[] = [
  reading(
    1,
    "trust-strangers",
    "見知らぬ人どうしの信頼と評価の数字",
    READ1_LEAD,
    "Trust Among Strangers",
    `For most of human history, people bought goods and services from those they knew. A farmer sold eggs to neighbors who had bought from him for years, and a shoemaker who cheated a customer could expect the whole village to hear about it within days. Trust, in such a world, was a matter of memory: people relied on what they and their friends had experienced over a long time. {{(1) The problem with this arrangement was not that it failed, but that it could not grow beyond the small circle of people who shared those memories.}}

Modern cities broke that circle. When millions of people live side by side, most of the transactions they make are with strangers whom they will never meet again. For a long time, the answer to this problem was the brand. A traveler arriving in an unfamiliar town might not know which restaurant was honest, but she knew what to expect from a chain whose name she recognized. Large companies, in effect, sold reputation along with their products, and they had strong reasons to protect it, since a single scandal could damage sales across the entire country.

The internet has added a third system, one that in some ways resembles the village more than the brand. Online ratings allow ordinary customers to report their experiences, and the reports of thousands of strangers are combined into a single score. {{(2) A small guesthouse with no advertising budget can now compete with a famous hotel, provided that the people who stay there are willing to say good things about it.}} In this sense, ratings have restored something of the village's memory, but on a scale that no village could ever have achieved.

Yet the new system has weaknesses of its own. In a village, people knew who was speaking, and they could judge whether a complaint came from a fair-minded neighbor or from someone with a grudge. A rating, by contrast, arrives without a face. Some reviews are written by friends of the owner; others are written by competitors, or even by people paid to praise products they have never used. Moreover, because a low score can ruin a small business, many customers hesitate to give one, and the result is that almost everything appears to be excellent. {{(3) When nearly every restaurant has four and a half stars, the stars tell us very little about which one to choose.}}

There is also a subtler cost. Workers whose income depends on ratings, such as drivers and delivery staff, may feel that they are being watched by every customer at every moment. A driver who is polite only because a bad score could cost him his job is behaving well, but not necessarily because he respects his passengers. [ ア ] ratings may produce good behavior, they do not necessarily produce the kind of relationship on which village trust was built.

None of this means that we should abandon online ratings. They have made it possible for millions of people to deal with strangers more confidently than ever before. {{(4) What it does suggest is that a number is not a substitute for judgment.}} The most useful reviews are often not the scores but the written comments that explain what went well and what did not, because they allow readers to decide for themselves whether the writer's concerns are ones they share.`,
    [
      EX("arrangement", 2, "下線部(1)の「この仕組みの問題」とは何か。本文に即して説明せよ。", 60,
        "信頼が経験や記憶を共有する知り合いどうしの間でしか成り立たず、その小さな範囲を超えて広げられなかったこと。",
        [
          ["信頼が「記憶・経験の共有」にもとづくことを押さえている", 4, ["記憶", "経験"]],
          ["その範囲が小さな仲間（知り合い）に限られることを書いている", 3, ["知り合い", "小さな"]],
          ["「範囲を超えて広がらない」ことを問題として説明している", 3, ["超え", "広げられ"]],
        ],
        "not A but B の B が「問題」の中身",
        [
          ["構文", "{{not that it failed, but that it could not grow}}：失敗したことではなく、広がれなかったことが問題。"],
          ["範囲", "beyond the small circle of people who {{shared those memories}}：記憶を共有する小さな集まりの外へ。"],
        ]),
      WA("guesthouse", 2, "(2)",
        "宣伝費のない小さな宿でも、泊まった人々がその宿をすすんでほめてくれさえすれば、今では有名なホテルと張り合うことができる。",
        ["can now compete with", "provided that"], ["advertising budget", "be willing to", "say good things about"],
        "provided that は「～という条件で・～ならば」",
        [
          ["骨組み", "主語 A small guesthouse（with no advertising budget が修飾）→ {{can now compete with}} a famous hotel。"],
          ["条件", "{{provided that}} ～：～ならば。{{be willing to}}：すすんで～する。"],
        ]),
      EX("stars", 3, "下線部(3)のように言えるのはなぜか。本文に即して説明せよ。", 80,
        "低い評価をつけるとその店をつぶしかねないため、多くの客が低評価をためらい、ほとんどすべての店が高い点数になって、点数に店どうしの差が表れなくなるから。",
        [
          ["低評価が小さな店をつぶしうることを書いている", 3, ["つぶ", "損な"]],
          ["客が低い点をつけるのをためらうことを書いている", 3, ["ためら"]],
          ["その結果、ほぼすべてが高評価になり差が出ないことを説明している", 4, ["差", "高い点", "すべて"]],
        ],
        "直前の Moreover の文が理由になっている",
        [
          ["理由の文", "because a low score can {{ruin a small business}}, many customers {{hesitate}} to give one。"],
          ["結果", "the result is that {{almost everything appears to be excellent}} → 星で選べない。"],
        ]),
      WA("judgment", 2, "(4)",
        "しかし、そのことが示しているのは、数値は判断の代わりにはならないということである。",
        ["What it does suggest is that", "強調の does"], ["substitute for", "judgment"],
        "What … is that ～：「…なのは～ということだ」",
        [
          ["構文", "{{What it does suggest}} が主語（does は suggest を強める）。is that ～ が補語。"],
          ["語句", "{{a substitute for}} ～：～の代わり。it は前文の「評価をやめるべきではない、という話全体」を受ける。"],
        ]),
      C("blank-a", 2, U.setsuzoku, "空所［ ア ］に入る最も適切なものを選べ。", ["While", "Because", "Unless", "Once"], 0, [
        "正解。「評価は良いふるまいを生むかもしれないが、村の信頼の土台となった関係までは生まない」という譲歩。",
        "「良いふるまいを生むので、関係を生まない」では因果がつながらない。",
        "「生まないかぎり」では意味が通らない。",
        "「いったん生むと」では後半の否定とつながらない。",
      ], "may … , but ～ と同じ譲歩の流れ", [
        ["前後の関係", "前：評価は良いふるまいを{{生むかもしれない}}。後：信頼の関係は{{必ずしも生まない}}。"],
        ["つなぎ", "譲歩なので {{While}}（～ではあるが）。"],
      ], K),
      C("brand", 2, U.chobun, "第2段落の内容と一致するものを選べ。", [
        "Large companies had good reason to keep their reputation, because one scandal could harm their sales nationwide.",
        "Travelers in unfamiliar towns preferred small restaurants to chains whose names they knew.",
        "Brands became less important as cities grew larger.",
        "In modern cities, people mostly deal with neighbors whom they meet again and again.",
      ], 0, [
        "正解。they had strong reasons to protect it, since a single scandal could damage sales across the entire country に一致。",
        "本文は、名前を知っているチェーンなら何を期待できるかわかった、と述べている。",
        "都市の拡大で見知らぬ人との取引がふえ、ブランドがその答えになった、と逆のことを述べている。",
        "本文は most of the transactions … are with strangers whom they will never meet again。",
      ], "ブランド＝評判を商品といっしょに売るしくみ", [
        ["段落の要点", "都市では{{見知らぬ人}}との取引がふえ、その解決策が{{ブランド}}だった。"],
        ["照合", "{{a single scandal could damage sales across the entire country}} が選択肢の言いかえ。"],
      ]),
      C("content", 3, U.chobun, "本文の内容と一致するものを選べ。", [
        "Some reviews are written by people who have never used the products they praise.",
        "The author believes that online ratings should be replaced by the opinions of neighbors.",
        "Drivers who depend on ratings are polite because they respect every passenger.",
        "In a village, people could not tell whether a complaint was fair.",
      ], 0, [
        "正解。people paid to praise products they have never used に一致。",
        "最終段落で None of this means that we should abandon online ratings と述べている。",
        "本文は「仕事を失うのがこわくて礼儀正しいだけで、必ずしも敬意からではない」と述べる。",
        "村では誰が話しているかわかり、公平な苦情か恨みかを判断できた、と述べている。",
      ], "否定・限定の語（not necessarily など）に注意", [
        ["第4段落", "評価は{{顔が見えない}}。店主の友人・競争相手・{{お金で雇われた人}}が書くこともある。"],
        ["ほかの選択肢", "第5段落の {{not necessarily because he respects}}、最終段落の {{None of this means … abandon}} と照らす。"],
      ]),
      EX("useful-review", 3, "筆者が最も役に立つと考える評価はどのようなものか。その理由とともに説明せよ。", 80,
        "点数ではなく、何がよく何がよくなかったかを説明した文章の感想である。読み手が、書き手の気にした点が自分にも当てはまるかを自分で判断できるから。",
        [
          ["点数ではなく文章の感想（コメント）だと書いている", 4, ["点数ではなく", "文章", "コメント"]],
          ["よかった点・よくなかった点を説明するものだと書いている", 2, ["よかった", "よくなかった"]],
          ["読み手が自分で判断できることを理由として書いている", 4, ["自分で判断"]],
        ],
        "because 以下が理由。主語は readers",
        [
          ["何か", "not the scores but {{the written comments that explain what went well and what did not}}。"],
          ["理由", "they allow readers to {{decide for themselves}} whether the writer's concerns are ones they share。"],
        ]),
    ],
    5,
    [
      { word: "grudge", meaning: "恨み" },
      { word: "guesthouse", meaning: "小さな宿" },
    ],
  ),
  reading(
    1,
    "boredom",
    "退屈の価値",
    READ1_LEAD,
    "The Uses of Boredom",
    `Few feelings have as bad a reputation as boredom. Children are told that only boring people get bored, and adults go to great lengths to avoid the experience, filling every spare moment in a queue or on a train with a glance at a screen. It is now possible to go through an entire day without being bored for more than a few seconds. {{(1) This would seem to be an achievement worth celebrating}}, yet a growing number of psychologists suspect that we may have lost something in the process.

Boredom, they argue, is not simply an absence of interest. It is an uncomfortable signal that our present activity is failing to satisfy us, and like hunger or pain, it pushes us to do something about it. In the past, that push often led people to invent games, to start conversations with strangers, or simply to let their minds wander. [ ア ] unpleasant it felt at the time, the restlessness of an empty afternoon was frequently the starting point of something new.

Mind-wandering in particular seems to play an important role in creative thinking. When we are not concentrating on a task, the mind does not switch off. Instead, it begins to move freely among memories, plans and loosely connected ideas, and it is in this state that people sometimes find solutions to problems that resisted their deliberate efforts. {{(2) Many people report that their best ideas come to them not at their desks but in the shower or on a long walk, when there is nothing in particular to think about.}}

The difficulty with constant entertainment is that it answers the signal of boredom too quickly. A phone offers an endless supply of small rewards: a new message, a short video, a piece of news. Each one relieves the discomfort for a moment, so the mind never has the chance to drift far enough to arrive anywhere interesting. {{(3) In a sense, we have become so skilled at escaping boredom that we rarely stay long enough to discover what it might lead to.}}

This does not mean that boredom is always good. Long periods of it, especially among people who have little control over their lives, can lead to frustration and unhealthy habits. A worker trapped in a repetitive job with no prospect of change gains little from being told that his boredom is a source of creativity. The kind of boredom that seems valuable is short and voluntary: a period of quiet that a person can choose to tolerate, knowing that it will end.

Some teachers have begun to experiment with this idea by giving students short periods with no instructions and no devices. At first, many students find the experience almost painful. After a few weeks, however, some begin to use the time to draw, to write, or to think through questions that had been bothering them. {{(4) The lesson may be that the ability to tolerate a little emptiness is not a weakness to be cured but a skill to be practiced.}}`,
    [
      EX("achievement", 1, "下線部(1)の an achievement とは、具体的にどのようなことを指すか。", 40,
        "一日中、数秒以上退屈を感じずに過ごせるようになったこと。",
        [
          ["一日中ほとんど退屈しないで過ごせることを書いている", 6, ["一日", "退屈"]],
          ["それが「可能になった」という変化として書いている", 4, ["できる", "可能"]],
        ],
        "This は直前の文の内容を指す",
        [
          ["指示語", "{{This}} ＝ 直前の文 It is now possible to go through an entire day without being bored …。"],
          ["まとめる", "「{{一日中ほとんど退屈せずに過ごせる}}ようになったこと」。"],
        ]),
      WA("shower", 2, "(2)",
        "最良の考えは、机に向かっているときではなく、特に考えるべきことが何もないシャワーの最中や長い散歩の途中に浮かぶと、多くの人が述べている。",
        ["report that", "not A but B"], ["come to them", "nothing in particular", "when 以下は前の場面を説明"],
        "not at A but in B の対比を訳に出す",
        [
          ["骨組み", "Many people {{report that}} ～：～と多くの人が述べる。their best ideas {{come to them}}：考えが浮かぶ。"],
          ["修飾", "{{not at their desks but in the shower or on a long walk}}、when 以下はその場面の説明（非制限）。"],
        ]),
      WA("so-skilled", 3, "(3)",
        "ある意味で、私たちは退屈から逃れるのがあまりにうまくなったので、退屈が何をもたらしうるのかを知るほど長く、そこにとどまることがめったにない。",
        ["so … that", "rarely"], ["be skilled at", "long enough to", "lead to"],
        "so ～ that の結果と long enough to をていねいに",
        [
          ["構文", "{{so skilled at escaping boredom that}} …：あまりに退屈から逃れるのがうまいので…。"],
          ["語句", "{{rarely}}：めったに～ない。{{long enough to discover}}：知るのに十分なほど長く。it＝boredom。"],
        ]),
      EX("signal", 2, "第2段落で、心理学者たちは退屈をどのようなものと説明しているか。", 80,
        "退屈は単なる興味の欠如ではなく、今の活動に満たされていないことを知らせる不快な合図であり、空腹や痛みのように、何かをするよう人を促すものだ。",
        [
          ["「単なる興味の欠如ではない」ことを書いている", 2, ["興味の欠如"]],
          ["今の活動に満足していないことを知らせる不快な合図だと書いている", 5, ["合図", "満たされて", "満足"]],
          ["空腹や痛みのように行動を促すと書いている", 3, ["空腹", "促す"]],
        ],
        "not simply A. It is B の B を中心に",
        [
          ["否定", "{{not simply an absence of interest}}：単に興味がないことではない。"],
          ["中身", "{{an uncomfortable signal}} that our present activity is failing to satisfy us ＋ like hunger or pain, it {{pushes us}} to do something。"],
        ]),
      C("blank-a", 2, U.kanfuku, "空所［ ア ］に入る最も適切なものを選べ。", ["However", "Whatever", "Although", "Though"], 0, [
        "正解。However＋形容詞＋S V：どんなに～でも。However unpleasant it felt＝どんなに不快に感じられても。",
        "Whatever のあとに形容詞だけを置いて「どんなに～でも」とはできない。",
        "Although のあとには S V が直接続く。Although unpleasant it felt の語順にはならない。",
        "Though も同じく、形容詞を前に出すこの語順にはならない（unpleasant though it felt なら可）。",
      ], "However＋形容詞＋S V＝どんなに～でも", [
        ["形を見る", "空所のあと：{{形容詞 unpleasant ＋ it felt}}。"],
        ["選ぶ", "形容詞を前に引きつけられるのは複合関係副詞 {{However}}。"],
      ], K),
      EX("valuable", 2, "第5段落によると、価値があると思われるのはどのような退屈か。", 60,
        "短く、自分から選んだ退屈で、いずれ終わるとわかったうえで本人が耐えることを選べる静かな時間。",
        [
          ["短いことを書いている", 3, ["短"]],
          ["自発的（自分で選んだ）ものだと書いている", 4, ["自分", "選"]],
          ["終わるとわかったうえで耐えられる静かな時間だと書いている", 3, ["終わる", "耐え"]],
        ],
        "コロンのあとが short and voluntary の言いかえ",
        [
          ["キーワード", "{{short and voluntary}}：短く、自発的な。"],
          ["言いかえ", "a period of quiet that a person {{can choose to tolerate}}, {{knowing that it will end}}。"],
        ]),
      C("lesson", 3, U.chobun, "下線部(4)の内容に最も近いものを選べ。", [
        "Being able to bear a short period with nothing to do is something people can improve with practice.",
        "Students who feel bored should be given more instructions by their teachers.",
        "Feeling empty is a serious weakness that schools ought to remove completely.",
        "Students should be allowed to use their devices whenever they feel bored.",
      ], 0, [
        "正解。not a weakness to be cured but a skill to be practiced＝治すべき弱さではなく、練習して身につける技能。",
        "本文の試みは「指示も機器もない時間」を与えるもので、指示をふやすのとは逆。",
        "下線部は「治すべき弱さではない」と述べている。",
        "試みは機器を使わない時間であり、逆の内容。",
      ], "not A but B の B＝筆者の主張", [
        ["構文", "the ability to tolerate a little emptiness is {{not a weakness to be cured but a skill to be practiced}}。"],
        ["言いかえ", "tolerate→{{bear}}、a little emptiness→{{a short period with nothing to do}}。"],
      ]),
      C("phone", 2, U.chobun, "第4段落の内容と一致するものを選べ。", [
        "Small rewards from a phone end our discomfort so quickly that the mind cannot wander far.",
        "A phone makes us more bored because its rewards are too small.",
        "Constant entertainment makes the signal of boredom stronger over time.",
        "The author suggests that news is more harmful than short videos.",
      ], 0, [
        "正解。Each one relieves the discomfort for a moment, so the mind never has the chance to drift far enough に一致。",
        "本文は、退屈を強めるのではなく、すぐに和らげてしまうことを問題にしている。",
        "本文は「合図にすぐ答えすぎる」と述べ、合図が強まるとは言っていない。",
        "ニュースと動画を比べてはいない。どちらも小さなごほうびの例。",
      ], "answers the signal too quickly＝すぐ解消してしまう", [
        ["問題点", "constant entertainment {{answers the signal of boredom too quickly}}。"],
        ["結果", "the mind {{never has the chance to drift far enough}}：心が遠くまでさまよえない。"],
      ]),
    ],
    5,
    [
      { word: "restlessness", meaning: "落ち着かなさ" },
      { word: "tolerate", meaning: "がまんする・耐える" },
    ],
  ),
  reading(
    1,
    "mental-map",
    "道案内アプリと頭の中の地図",
    READ1_LEAD,
    "The Map We No Longer Draw",
    `Not long ago, finding one's way through an unfamiliar city required a certain amount of effort. Travelers studied paper maps, asked for directions, and paid attention to churches, rivers and other landmarks that might help them later. Today, a voice from a phone tells us when to turn left and when to turn right, and we can arrive at almost any address without having formed any picture of the streets we have passed through. {{(1) The convenience is undeniable, but it raises a question that is easy to overlook: what happens to the ability we no longer use?}}

Research on spatial memory suggests that the answer is not simple. People who navigate actively, working out their own routes and correcting their mistakes, tend to build what psychologists call a mental map: an internal sense of how places relate to one another. Those who follow instructions step by step can reach their destinations just as reliably, but they often remember far less about the journey. Asked to point toward their starting point, they may have no idea [ ア ].

Some observers worry that this represents a kind of decline, as if a muscle were wasting away from lack of exercise. Others reply that human beings have always handed over mental tasks to tools. Writing reduced the need to memorize long poems, and calculators reduced the need for mental arithmetic, yet few people would wish to give up either. {{(2) On this view, the question is not whether we depend on tools, but whether what we gain is worth more than what we lose.}}

In the case of navigation, the losses may be larger than they first appear. A mental map is not only a tool for getting from one place to another. It is also part of how people come to feel at home in a place. Someone who knows that the bakery is two streets behind the station, and that the river can be reached by a short cut through the park, has a relationship with the town that goes beyond a list of addresses. {{(3) It is hard to grow attached to a place that one has only ever experienced as a series of instructions.}}

There are practical consequences too. When the battery runs out or the signal disappears, a person with no mental map may be almost helpless. More importantly, people who never learn their surroundings may notice less of what is in them: the new shop, the old building that has been taken down, the neighbor's garden coming into flower. Such details may seem trivial, but taken together they form the texture of daily life.

The solution is probably not to abandon navigation apps, which are genuinely useful in unfamiliar places and in emergencies. A more modest approach would be to use them as a map rather than as a set of commands: to look at the whole route before setting out, to notice where one is going, and occasionally to walk without assistance in places where getting lost would cost nothing more than a little time. Getting lost, after all, is one of the ways in which people have always come to know a place.`,
    [
      EX("ability", 1, "下線部(1)の the ability we no longer use とは、どのような能力を指すか。本文に即して説明せよ。", 40,
        "地図を読み、目印に注意しながら、見知らぬ土地で自分で道を見つける能力。",
        [
          ["自分で道を見つける能力だと書いている", 6, ["自分で", "道"]],
          ["地図・目印に注意するなど具体的な中身にふれている", 4, ["地図", "目印"]],
        ],
        "第1段落前半の「昔の旅人がしたこと」が中身",
        [
          ["昔", "studied paper maps, asked for directions, paid attention to {{landmarks}}。"],
          ["今", "声の指示に従うので、{{自分で道を見つける力}}を使わなくなった。"],
        ]),
      WA("tools-view", 2, "(2)",
        "この見方によれば、問題は私たちが道具に頼っているかどうかではなく、得るものが失うものよりも価値があるかどうかである。",
        ["not whether A, but whether B"], ["On this view", "what we gain", "be worth more than"],
        "not whether A but whether B の対比",
        [
          ["骨組み", "the question is {{not whether}} we depend on tools, {{but whether}} …。"],
          ["主語", "whether 節の中の主語は {{what we gain}}（得るもの）、比べる相手は what we lose。"],
        ]),
      WA("attached", 2, "(3)",
        "一連の指示としてしか経験したことのない場所に愛着を抱くようになるのは難しい。",
        ["It is hard to ～（形式主語）", "関係代名詞 that"], ["grow attached to", "only ever", "a series of instructions"],
        "形式主語 It と関係詞節の修飾",
        [
          ["骨組み", "{{It is hard to grow attached to a place}}：場所に愛着を持つようになるのは難しい。"],
          ["修飾", "that one has {{only ever experienced as a series of instructions}}：指示の連なりとしてしか経験したことのない。"],
        ]),
      C("blank-a", 2, U.waho, "空所［ ア ］に入る最も適切なものを選べ。", ["which way it lies", "where does it lie", "what it lies", "how they lie"], 0, [
        "正解。have no idea のあとの間接疑問。which way it lies＝それがどちらの方向にあるか（it＝their starting point）。",
        "間接疑問は S V の語順にする。does を使った疑問文の語順にはならない。",
        "lie は自動詞なので、目的語の what を置けない。",
        "they（人）が横たわる様子の話ではない。出発点の方向をたずねている。",
      ], "間接疑問は「疑問詞＋S＋V」の語順", [
        ["形", "have no idea ＋ {{間接疑問}}：～かまったくわからない。"],
        ["語順", "疑問詞のかたまり {{which way}} ＋ S（it）＋ V（lies）。"],
      ], K),
      EX("defense", 2, "第3段落で、道具に頼ることを心配しない人々は、どのような根拠を挙げているか。", 80,
        "人間は昔から頭の仕事を道具に任せてきた。文字は長い詩を覚える必要を、計算機は暗算の必要を減らしたが、それらを手放したいと思う人はほとんどいない。",
        [
          ["人間は昔から頭の仕事を道具に任せてきたと書いている", 4, ["昔から", "道具"]],
          ["文字・計算機の例を挙げている", 3, ["文字", "計算機"]],
          ["それらを手放したい人はほとんどいないことを書いている", 3, ["手放"]],
        ],
        "Others reply that … 以下が反論の根拠",
        [
          ["主張", "human beings have {{always handed over mental tasks to tools}}。"],
          ["例", "Writing・calculators → それでも {{few people would wish to give up either}}。"],
        ]),
      EX("home", 3, "第4段落で筆者は、頭の中の地図には道を進むための道具であるほかに、どのような役割があると述べているか。", 60,
        "人がある土地になじみ、そこを自分の居場所だと感じられるようになるための一部となる役割。",
        [
          ["土地になじむ・居場所と感じる助けになることを書いている", 7, ["なじ", "居場所", "親しみ"]],
          ["「道具であるだけでなく」という対比をふまえている", 3, ["一部", "だけでなく"]],
        ],
        "not only A. It is also B の B",
        [
          ["対比", "{{not only a tool for getting from one place to another}}。"],
          ["中身", "It is also part of how people come to {{feel at home in a place}}。"],
        ]),
      C("content", 2, U.chobun, "本文の内容と一致するものを選べ。", [
        "People who follow step-by-step instructions can reach their destinations, but they tend to remember less of the route.",
        "People who navigate actively usually arrive at their destinations more reliably.",
        "The author thinks the small details of a town are too trivial to matter.",
        "Calculators made people better at mental arithmetic.",
      ], 0, [
        "正解。can reach their destinations just as reliably, but they often remember far less about the journey に一致。",
        "本文は「指示に従う人も同じくらい確実に着ける」と述べている。",
        "細かなことは trivial に見えるが、合わさって日々の暮らしの手ざわりになる、と述べている。",
        "本文は計算機が暗算の必要を減らした、と述べている。",
      ], "just as reliably＝同じくらい確実に", [
        ["第2段落", "指示に従う人：着くのは{{同じくらい確実}}、道のりの記憶は{{ずっと少ない}}。"],
        ["他の選択肢", "{{may seem trivial, but}} … のように、筆者の評価がどちらかを確かめる。"],
      ]),
      C("proposal", 3, U.chobun, "最終段落の筆者の提案に最も近いものを選べ。", [
        "Use navigation apps to see the whole route, and sometimes walk without them where getting lost does little harm.",
        "Stop using navigation apps except in emergencies.",
        "Always follow the voice instructions exactly so that one never gets lost.",
        "Use paper maps instead of phones in unfamiliar cities.",
      ], 0, [
        "正解。use them as a map rather than as a set of commands … occasionally to walk without assistance … に一致。",
        "The solution is probably not to abandon navigation apps と述べている。",
        "命令としてではなく地図として使う、という提案と逆。",
        "紙の地図への切りかえは提案していない。",
      ], "A rather than B＝B ではなく A", [
        ["提案", "use them {{as a map rather than as a set of commands}}。"],
        ["具体策", "全体の道を{{先に見る}}・行き先に注意する・害のない場所で{{ときどき使わずに歩く}}。"],
      ]),
    ],
    5,
    [
      { word: "spatial", meaning: "空間の" },
      { word: "texture", meaning: "手ざわり・質感" },
    ],
  ),
];

// =====================================================================
// 第2問　長文読解（科学・歴史の論説：文法・語法・整序・内容）
// =====================================================================

const P2: ExamPoolSection[] = [
  reading(
    2,
    "plants",
    "植物は「動かない」のか",
    READ2_LEAD,
    "The Busy Life of Still Things",
    `It is easy to think of plants as {{passive}}. They cannot run from danger, and they appear to do little more than stand in the sun and grow. Over the past few decades, however, scientists have found that many plants respond to their surroundings in ways [ 1 ] are surprisingly active. A plant cannot move away from an insect that is eating its leaves, but it can change the chemistry of those leaves, making them less pleasant or even harmful to eat.

Some of these responses spread beyond the leaf under attack. When certain plants are damaged, they release chemicals into the air. Neighboring plants may detect these chemicals and begin to strengthen their own defenses before any insect has reached them. Whether this should be called "communication" is a matter of debate. The damaged plant may not be sending a message at all; its neighbors may simply be making use of [ 2 ] would have been released anyway.

The chemicals can also affect other species. Some of them attract insects that feed on the very insects that are eating the plant, so that a plant under attack {{in effect}} calls for help. [ ア ] about this system is that the plant does not need to "know" anything. Over many generations, plants that happened to release useful chemicals survived and reproduced more successfully than those that did not.

Plants also respond to their physical environment in ways that resemble learning. Roots grow toward water and away from obstacles, and some climbing plants seem to search for a support, moving their tips in slow circles until they touch something they can hold. [ 3 ], researchers are careful not to describe such behavior as if plants had minds. A plant has no brain, and its responses are produced by chemical and electrical processes spread throughout its body.

Why, then, does the language of communication and learning keep appearing in descriptions of plants? Part of the answer is that ordinary words are the only tools we have for describing unfamiliar behavior. To say that a plant "warns" its neighbors is shorter than saying that it releases chemicals which other plants detect and respond to. The danger is that a convenient expression [ イ ], and that readers begin to imagine plants holding conversations.

Still, the discoveries have changed how many scientists think about plants. Rather than seeing them [ 4 ] simple living machines, they increasingly regard them as organisms that sense and respond to a constantly changing world. This view may even have practical uses. Farmers who understand how crops defend themselves might be able to rely less on chemical pesticides. {{(ウ) Studying plants closely, in other words, reminds us that being still is not the same as doing nothing.}}`,
    [
      C("blank1", 2, U.kandai, "空所［ 1 ］に入る最も適切なものを選べ。", ["that", "what", "where", "whose"], 0, [
        "正解。先行詞 ways を受け、関係詞節の中で主語になる関係代名詞（ways that are surprisingly active）。",
        "what は先行詞をふくむので、前に ways があると使えない。",
        "where（関係副詞）のあとは主語のそろった完全な文が続く。ここは主語がない。",
        "whose のあとには名詞が必要。",
      ], "先行詞あり＋主語がない → that", [
        ["空所のあと", "{{are surprisingly active}}：主語がぬけた不完全な形。"],
        ["先行詞", "前に {{ways}} があるので what ではなく {{that}}。"],
      ], K),
      C("blank2", 2, U.kandai, "空所［ 2 ］に入る最も適切なものを選べ。", ["what", "that", "which", "whose"], 0, [
        "正解。前置詞 of の目的語になる名詞節で、節の中の主語がない。先行詞がないので what（～するもの）。",
        "that を関係代名詞として使うには先行詞が必要。名詞節の that なら後ろは完全な文になる。",
        "which にも先行詞が必要。",
        "whose のあとには名詞が必要。",
      ], "先行詞なし＋不完全な文 → what", [
        ["空所の前", "making use of ［ ］：前置詞のあとなので{{名詞のかたまり}}が入る。"],
        ["空所のあと", "would have been released anyway：{{主語がない}} → what＝「どのみち放たれていたであろうもの」。"],
      ], K),
      O("order-a", 3, U.kandai, "空所［ ア ］に入るように、与えられた語を並べかえよ（「この仕組みで最も驚くべきことは」の意味）。", ["What", "is", "most", "striking"], "What is ＋形容詞＋ about ～ is that …", [
        ["形", "{{What is most striking about this system}} が主語、is that … が補語。"],
        ["語順", "what が節の主語なので、すぐあとに {{is}}、補語 {{most striking}} が続く。"],
      ]),
      O("order-i", 3, U.judo, "空所［ イ ］に入るように、与えられた語を並べかえよ（「便利な表現が、文字どおりに受け取られるようになるかもしれない」の意味）。", ["may", "come", "to", "be", "taken", "literally"], "come to do＝～するようになる＋受動態", [
        ["骨組み", "{{may come to}} ～：～するようになるかもしれない。"],
        ["受動", "表現が「受け取られる」ので {{be taken literally}}。"],
      ]),
      C("blank3", 2, U.setsuzoku, "空所［ 3 ］に入る最も適切なものを選べ。", ["Even so", "As a result", "In addition", "For example"], 0, [
        "正解。「学習に似たふるまいがある。それでも研究者は心があるかのように言うのを避ける」という逆接。",
        "「その結果、慎重になる」では、学習に似ていることと慎重さの関係が逆になる。",
        "追加ではなく、前の内容から予想されることと反対の内容が続く。",
        "後ろは前の段落の具体例ではない。",
      ], "前の内容から予想されることと逆 → 逆接", [
        ["前", "根やつる植物は{{学習に似た}}ふるまいをする。"],
        ["後", "研究者は{{心があるかのように}}言わないよう注意する → {{Even so}}（それでも）。"],
      ], K),
      C("blank4", 1, U.zenchi, "空所［ 4 ］に入る最も適切なものを選べ。", ["as", "to", "by", "for"], 0, [
        "正解。see A as B：A を B とみなす。後ろの regard them as … と対になっている。",
        "see A to B という形はない。",
        "by では「単純な機械によって見る」となり意味が通らない。",
        "see A for B（A を B のためにみる）は文脈に合わない。",
      ], "see / regard A as B＝A を B とみなす", [
        ["対の表現", "後半に {{regard them as organisms}} がある。"],
        ["形", "{{see them as}} simple living machines：単純な生きた機械とみなす。"],
      ], K),
      C("in-effect", 2, U.jukugo, "下線部 in effect の意味に最も近いものを選べ。", ["in practice", "by accident", "on purpose", "in theory"], 0, [
        "正解。in effect＝事実上・実際には。植物は意図していないが、結果として助けを呼んでいるのと同じ。",
        "「偶然に」ではない。結果として同じ働きをすることを言っている。",
        "「わざと」では、植物は何も知る必要がないという次の文と矛盾する。",
        "「理論上は」は反対の意味に近い。",
      ], "in effect＝事実上", [
        ["文脈", "敵の敵を呼びよせる → {{実際には}}助けを呼んでいるのと同じ。"],
        ["次の文", "the plant does not need to \"know\" anything：わざとではない → {{in practice}}。"],
      ], K),
      C("debate", 2, U.chobun, "第2段落の内容と一致するものを選べ。", [
        "It is possible that the damaged plant is not trying to send any message to its neighbors.",
        "All scientists agree that plants communicate with one another.",
        "Neighboring plants strengthen their defenses only after insects reach them.",
        "The chemicals are released only when neighboring plants are nearby.",
      ], 0, [
        "正解。The damaged plant may not be sending a message at all に一致。",
        "Whether this should be called \"communication\" is a matter of debate（議論が分かれる）と述べている。",
        "本文は before any insect has reached them（虫が来る前に）。",
        "would have been released anyway（どのみち放たれていた）と述べ、近くの植物の有無とは関係がない。",
      ], "may not … at all＝まったく～していないかもしれない", [
        ["議論", "「{{コミュニケーション}}と呼ぶべきか」は議論が分かれる。"],
        ["見方", "傷ついた植物は{{メッセージを送っていない}}かもしれず、まわりがそれを利用しているだけかもしれない。"],
      ]),
      C("evolution", 3, U.chobun, "第3段落によると、植物が「何も知る必要がない」のはなぜか。", [
        "Plants that happened to release useful chemicals survived and reproduced better over many generations.",
        "Insects teach plants which chemicals to release.",
        "Plants remember which insects attacked them in the past.",
        "Neighboring plants tell the damaged plant what to do.",
      ], 0, [
        "正解。Over many generations, plants that happened to release useful chemicals survived and reproduced more successfully に一致。",
        "虫が植物に教えるとは述べていない。",
        "過去の虫を覚えているとは述べていない。",
        "まわりの植物が指示するとは述べていない。",
      ], "happened to＝たまたま～した（意図ではない）", [
        ["理由の文", "{{happened to release}} useful chemicals：たまたま役立つ物質を出した植物が"],
        ["結果", "{{survived and reproduced more successfully}}：生きのびて子孫を残した。"],
      ]),
      C("still", 3, U.chobun, "下線部(ウ)の内容に最も近いものを選べ。", [
        "Even though plants do not move, they are constantly sensing and responding to the world.",
        "Plants that do not move are less important than animals.",
        "Studying plants teaches us that resting is a waste of time.",
        "Plants become active only when farmers use pesticides.",
      ], 0, [
        "正解。being still is not the same as doing nothing＝じっとしていることは何もしていないことと同じではない。",
        "植物と動物の重要さは比べていない。",
        "人が休むことの話ではない。",
        "農薬を減らせる可能性にふれているだけで、農薬で活発になるとは言っていない。",
      ], "A is not the same as B＝A と B はちがう", [
        ["下線部", "{{being still}}（動かないこと）≠ {{doing nothing}}（何もしないこと）。"],
        ["文脈", "直前の段落：植物は {{sense and respond to a constantly changing world}}。"],
      ]),
    ],
    7,
    [
      { word: "pesticide", meaning: "農薬・殺虫剤" },
      { word: "literally", meaning: "文字どおりに" },
    ],
  ),
  reading(
    2,
    "sleep",
    "眠りと記憶",
    READ2_LEAD,
    "What the Sleeping Brain Does",
    `For a long time, sleep was regarded as little more than a period of rest, a pause [ 1 ] which the body and the brain recovered from the efforts of the day. It is now clear that the sleeping brain is {{far from idle}}. During certain stages of sleep, brain activity is nearly as intense as when we are awake, and much of this activity appears to be related to memory.

Experiments with both animals and people suggest that sleep helps to strengthen what was learned during the day. In a typical study, participants learn a list of words or a simple task, and some of them are allowed to sleep before being tested while others stay awake for the same length of time. Those who sleep usually perform better. This does not mean [ ア ]; rather, sleep seems to help the brain keep what it has already taken in.

One explanation is that the brain replays recent experiences while we sleep. Researchers recording the activity of nerve cells in animals have observed patterns during sleep [ 2 ] closely resemble those seen while the animals were exploring a new place earlier in the day. It is thought that this replay helps to move memories from a temporary store into more lasting forms, and to connect them with knowledge that is already there.

Sleep may also help us forget. Not every experience is worth keeping, and a brain that stored everything would quickly become crowded with useless detail. Some scientists believe that during sleep many of the connections between nerve cells that were strengthened during the day are partly weakened again, so that only the most important ones remain strong. If this is correct, [ イ ], keeping what matters and cutting what does not.

These findings have practical implications, especially for students. Staying up all night before an examination may allow a student to cover more material, but it may also prevent the brain from holding on to [ 3 ] has been studied. Teenagers face a particular problem: their natural sleep patterns shift later during adolescence, so they tend to feel sleepy late at night and find it hard to wake early. [ 4 ] schools start early in the morning, many young people regularly get less sleep than they need.

Some schools have experimented with later starting times, and several have reported that students were more alert in class. Of course, sleep alone cannot make up for a lack of study. {{(ウ) But the evidence suggests that the hours spent asleep are not time taken away from learning; they are part of the learning itself.}}`,
    [
      C("blank1", 2, U.kandai, "空所［ 1 ］に入る最も適切なものを選べ。", ["during", "while", "until", "since"], 0, [
        "正解。前置詞＋関係代名詞：a pause during which …＝その間に…する休止。",
        "while は接続詞で、関係代名詞 which の前に置けない。",
        "until which では「その時まで回復した」となり、休止の間の回復という意味にならない。",
        "since which は「それ以来」で文脈に合わない。",
      ], "前置詞＋which：前置詞を先に決める", [
        ["もとの文", "the body recovered {{during the pause}}：休止の間に回復した。"],
        ["関係詞", "前置詞を前に出して {{during which}}。while は接続詞なので不可。"],
      ], K),
      C("idle", 1, U.vocab, "下線部 far from idle の意味に最も近いものを選べ。", ["very active", "almost asleep", "quite empty", "rather slow"], 0, [
        "正解。far from ～＝決して～ではない。idle＝何もしていない。直後に活動がとても激しいとある。",
        "眠っている脳がほとんど眠っている、では意味がない。",
        "far from があるので「空っぽ」とは逆の意味になる。",
        "直後の nearly as intense as when we are awake と合わない。",
      ], "far from ～＝少しも～でない", [
        ["語句", "{{far from}}＝決して～ではない、{{idle}}＝何もしていない。"],
        ["裏づけ", "直後：brain activity is {{nearly as intense as when we are awake}}。"],
      ], K),
      O("order-a", 3, U.setsuzoku, "空所［ ア ］に入るように、与えられた語を並べかえよ（「私たちが眠っている間に新しい情報を学ぶということ」の意味）。", ["that", "we", "learn", "new", "information", "in", "our", "sleep"], "mean that S V＋; rather で対比", [
        ["骨組み", "This does not mean {{that we learn new information in our sleep}}。"],
        ["対比", "セミコロンのあと {{rather}}：むしろすでに取り入れたものを保つ助けになる。"],
      ]),
      C("blank2", 2, U.kandai, "空所［ 2 ］に入る最も適切なものを選べ。", ["that", "what", "where", "when"], 0, [
        "正解。先行詞 patterns を受け、関係詞節の主語になる関係代名詞（patterns that closely resemble …）。",
        "what は先行詞をふくむので、前に patterns があると使えない。",
        "where のあとは完全な文が続く。ここは主語がない。",
        "when も関係副詞で、後ろは完全な文になる。",
      ], "先行詞あり＋主語がない → that", [
        ["空所のあと", "{{closely resemble those …}}：主語がない。"],
        ["先行詞", "patterns（during sleep は挿入の修飾）→ 関係代名詞 {{that}}。"],
      ], K),
      O("order-i", 3, U.zenchi, "空所［ イ ］に入るように、与えられた語句を並べかえよ（「眠りは録音機としてではなく、編集者として働く」の意味）。", ["sleep", "acts", "not", "as a recorder", "but", "as an editor"], "not A but B＝A ではなく B", [
        ["骨組み", "{{sleep acts}}：眠りは働く。"],
        ["対比", "{{not as a recorder but as an editor}}：録音機ではなく編集者として。後ろの分詞構文 keeping … cutting … と合う。"],
      ]),
      C("blank3", 2, U.kandai, "空所［ 3 ］に入る最も適切なものを選べ。", ["what", "that", "which", "it"], 0, [
        "正解。前置詞 to の目的語になり、節の中の主語がない。先行詞がないので what（～したもの）。",
        "that は先行詞がないと関係代名詞として使えない。",
        "which も先行詞が必要。",
        "it has been studied では to のあとに文が来て、文の形が成り立たない。",
      ], "前置詞のあと＋主語のない節 → what", [
        ["空所の前", "holding on to ［ ］：前置詞 to のあとは{{名詞のかたまり}}。"],
        ["空所のあと", "has been studied：主語がない → {{what}}＝勉強したこと。"],
      ], K),
      C("blank4", 1, U.setsuzoku, "空所［ 4 ］に入る最も適切なものを選べ。", ["Because", "Unless", "Although", "Until"], 0, [
        "正解。「学校が朝早く始まるので、多くの若者が必要な睡眠をとれない」という理由。",
        "「始まらないかぎり」では、睡眠不足の理由にならない。",
        "「始まるけれども」では、後半の睡眠不足とつながらない。",
        "「始まるまで」では意味が通らない。",
      ], "前半が理由、後半が結果", [
        ["前の文", "10代は{{夜型にずれる}}ので朝早く起きにくい。"],
        ["つなぎ", "学校が朝早い → 睡眠が足りない：理由の {{Because}}。"],
      ], K),
      C("experiment", 2, U.chobun, "第2段落の実験について、本文の内容と一致するものを選べ。", [
        "Participants who slept before being tested usually did better than those who stayed awake.",
        "Participants who stayed awake were tested after a longer time.",
        "The experiment showed that people learn new words while they are asleep.",
        "Only animals took part in the experiments.",
      ], 0, [
        "正解。Those who sleep usually perform better に一致。",
        "起きていた人も for the same length of time（同じ時間）。",
        "This does not mean that … と、眠りながら新しく学ぶことは否定している。",
        "Experiments with both animals and people と述べている。",
      ], "比べる条件は「同じ時間」", [
        ["しくみ", "学ぶ → 一方は{{眠る}}、一方は{{同じ時間起きている}} → テスト。"],
        ["結果", "{{Those who sleep usually perform better}}。"],
      ]),
      C("forget", 3, U.chobun, "第4段落によると、眠りが「忘れる」ことを助けるのはなぜ役に立つのか。", [
        "Because a brain that kept everything would soon be filled with unimportant details.",
        "Because people should forget what they learned during the day.",
        "Because nerve cells become stronger only when they are not used.",
        "Because important memories are weakened during sleep.",
      ], 0, [
        "正解。a brain that stored everything would quickly become crowded with useless detail に一致。",
        "忘れるのは「すべて」ではなく、重要でない結びつき。",
        "使われない細胞が強くなるとは述べていない。",
        "only the most important ones remain strong（重要なものは強いまま残る）と逆。",
      ], "仮定法：すべて覚えたら～になってしまう", [
        ["理由", "a brain that {{stored everything}} would quickly become {{crowded with useless detail}}。"],
        ["しくみ", "結びつきを{{部分的に弱め}}、{{重要なものだけ}}を強く残す。"],
      ]),
      C("part-of", 3, U.chobun, "下線部(ウ)の内容に最も近いものを選べ。", [
        "Sleeping is itself one of the processes through which learning takes place.",
        "Students should sleep instead of studying before an examination.",
        "Time spent asleep is wasted because no learning happens.",
        "Learning is more important than sleeping.",
      ], 0, [
        "正解。they are part of the learning itself＝眠っている時間は学習そのものの一部である。",
        "直前に sleep alone cannot make up for a lack of study（眠りだけでは勉強不足を補えない）とある。",
        "not time taken away from learning と述べ、逆の内容。",
        "どちらが重要かを比べてはいない。",
      ], "not A; B＝A ではなく B", [
        ["否定", "{{not time taken away from learning}}：学習からうばわれた時間ではない。"],
        ["肯定", "{{part of the learning itself}}：学習そのものの一部。"],
      ]),
    ],
    7,
    [
      { word: "adolescence", meaning: "思春期" },
      { word: "alert", meaning: "頭がさえた・注意深い" },
    ],
  ),
  reading(
    2,
    "railway-time",
    "鉄道と「時刻」の誕生",
    READ2_LEAD,
    "When Clocks Began to Agree",
    `Today most people {{take it for granted}} that clocks in different towns should show the same time. Two centuries ago, this was not the case. Each town set its clocks by the sun, so that noon was the moment [ 1 ] the sun stood highest in the sky. Because the sun appears to move from east to west, a town to the west of another would be a few minutes behind it. For most of history, such differences hardly mattered. A journey between two towns took so long [ 2 ] nobody could notice a gap of a few minutes.

The railway changed this. Trains made it possible to travel between distant cities in a matter of hours, and timetables had to tell passengers when a train would leave one station and arrive at another. If every town kept its own time, a timetable became extremely confusing. Railway companies in Britain therefore began to [ ア ] in the nineteenth century, and eventually a single standard time was adopted across the whole country. Later, countries around the world gradually adopted systems of time zones.

Standard time did more than make timetables easier to read. It changed people's sense of what it meant to be on time. In a world of local time, noon was a natural event that anyone could observe. In a world of standard time, it was a number agreed upon by distant authorities, and it was the clock, not the sun, [ 3 ] told people when to begin work. As factories spread, employers came to measure work by the hour, and workers who arrived a few minutes late could lose part of their wages.

Punctuality thus became [ イ ]. Schools taught children to respond to bells, and being late came to be seen as a sign of poor character rather than as an ordinary accident. Some historians argue that this training was [ 4 ] for an industrial economy, in which large numbers of people had to perform connected tasks at the same moment.

Today, digital devices have made the measurement of time more precise than ever. Phones adjust themselves automatically, and few people need to set a clock by hand. Yet attitudes to punctuality still vary widely. In some societies, arriving ten minutes after an agreed time is rude; in others, it is perfectly normal, and arriving exactly on time may even seem slightly odd. {{(ウ) Such differences remind us that the precision of our clocks does not determine how we choose to use them.}}`,
    [
      C("blank1", 2, U.kanfuku, "空所［ 1 ］に入る最も適切なものを選べ。", ["when", "which", "what", "whose"], 0, [
        "正解。先行詞 the moment（時）を受け、後ろに完全な文（the sun stood highest）が続く関係副詞。",
        "which は関係代名詞で、後ろに主語か目的語のぬけた文が続く。ここは完全な文。",
        "what は先行詞をふくむので、the moment のあとには置けない。",
        "whose のあとには名詞が必要。",
      ], "先行詞が時＋後ろが完全な文 → when", [
        ["先行詞", "{{the moment}}：時を表す名詞。"],
        ["空所のあと", "the sun stood highest in the sky：{{主語も動詞もそろった完全な文}} → 関係副詞 when。"],
      ], K),
      C("blank2", 1, U.setsuzoku, "空所［ 2 ］に入る最も適切なものを選べ。", ["that", "as", "than", "what"], 0, [
        "正解。so ～ that …：とても～なので…。旅が長すぎて数分の差に気づけなかった。",
        "so ～ as … は「…ほど～」の比較（否定文で使う形）で、ここでは結果を表せない。",
        "than は比較級と組む。so のあとには続かない。",
        "what は so ～ と組む形がない。",
      ], "so ～ that …＝とても～なので…", [
        ["形を見る", "{{so long}} ＋ 空所 ＋ 文（nobody could notice …）。"],
        ["選ぶ", "結果を表す {{so ～ that …}}。"],
      ], K),
      C("granted", 1, U.jukugo, "下線部 take it for granted の意味に最も近いものを選べ。", ["assume without question", "doubt seriously", "learn with difficulty", "refuse to accept"], 0, [
        "正解。take it for granted that …＝…を当然のことと思う。",
        "「深く疑う」は反対の意味。",
        "「苦労して学ぶ」ではない。",
        "「受け入れるのを拒む」は反対の意味。",
      ], "take it for granted that …＝…を当然と思う", [
        ["形", "{{it}} は that 以下を指す形式目的語。"],
        ["意味", "「当然のことと思う」＝ {{assume without question}}。"],
      ], K),
      O("order-a", 3, U.zenchi, "空所［ ア ］に入るように、与えられた語句を並べかえよ（「路線上のすべての駅で同じ時刻を使う」の意味）。", ["keep", "the same time", "at", "all the stations", "along", "their lines"], "keep the same time＋場所の前置詞句", [
        ["骨組み", "began to {{keep the same time}}：同じ時刻を保ちはじめた。"],
        ["場所", "{{at all the stations along their lines}}：路線にそったすべての駅で。"],
      ]),
      C("blank3", 2, U.tokushu, "空所［ 3 ］に入る最も適切なものを選べ。", ["that", "what", "where", "whom"], 0, [
        "正解。強調構文 it was ～ that …：人々にいつ仕事を始めるかを告げたのは、太陽ではなく時計だった。",
        "what は強調構文の that の位置には入らない。",
        "where は場所を強調するときの形で、ここは主語 the clock を強調している。",
        "whom は人を表す目的格。the clock は人ではなく、ここでは主語。",
      ], "It was A, not B, that …＝…なのは B ではなく A", [
        ["形を見る", "{{it was the clock, not the sun,}} ＋ 空所 ＋ told people …。"],
        ["強調構文", "it was と that を取ると {{the clock told people …}} の完全な文 → that。"],
      ], K),
      O("order-i", 3, U.hikaku, "空所［ イ ］に入るように、与えられた語句を並べかえよ（「便利さというより、むしろ美徳」の意味）。", ["less", "a convenience", "than", "a virtue"], "less A than B＝A というより B", [
        ["形", "{{less A than B}}：A というより、むしろ B。"],
        ["文脈", "直後に遅刻が{{人格の問題}}と見られた、とある → 美徳が B の位置。"],
      ]),
      C("blank4", 2, U.keiyo, "空所［ 4 ］に入る最も適切なものを選べ。", ["essential", "optional", "harmful", "unknown"], 0, [
        "正解。多くの人が同時に連動した作業をする工業経済には、時間を守る訓練が欠かせなかった。",
        "「なくてもよい」では、in which 以下の説明と合わない。",
        "害があったとは述べていない。in which 以下は必要な理由の説明。",
        "「知られていない」では意味が通らない。",
      ], "in which 以下が理由の説明", [
        ["後ろの説明", "large numbers of people had to perform {{connected tasks at the same moment}}。"],
        ["選ぶ", "そのような経済には訓練が {{essential}}（不可欠）。"],
      ], K),
      C("local-time", 2, U.chobun, "第1段落によると、町ごとに時刻がちがっても長い間問題にならなかったのはなぜか。", [
        "Because travel between towns was so slow that a difference of a few minutes went unnoticed.",
        "Because every town used the same clock as its neighbors.",
        "Because people did not care about the position of the sun.",
        "Because the sun moved faster in the past.",
      ], 0, [
        "正解。A journey between two towns took so long that nobody could notice a gap of a few minutes に一致。",
        "町ごとに太陽で時計を合わせていたので、同じではなかった。",
        "正午は太陽がいちばん高い時と決めており、太陽の位置を気にしていた。",
        "本文にない。",
      ], "直後の文が理由の説明", [
        ["事実", "各町は{{太陽で}}時計を合わせ、西の町は数分遅れた。"],
        ["理由", "移動に{{時間がかかりすぎて}}、数分の差に誰も気づけなかった。"],
      ]),
      C("sense", 3, U.chobun, "第3段落の内容と一致するものを選べ。", [
        "Under standard time, noon became a figure decided by distant authorities rather than something people saw for themselves.",
        "Standard time made it harder for passengers to read timetables.",
        "Factory workers were paid more when they arrived early.",
        "In a world of local time, only experts could observe noon.",
      ], 0, [
        "正解。a number agreed upon by distant authorities に一致。地方時では誰でも観察できる自然の出来事だった。",
        "Standard time did more than make timetables easier to read と述べ、読みやすくしたことが前提。",
        "早く来ると多く払われたとは述べていない。遅れると賃金を失うことがあった。",
        "a natural event that anyone could observe（誰でも観察できた）と逆。",
      ], "local time と standard time の対比をつかむ", [
        ["地方時", "noon＝{{anyone could observe}} な自然の出来事。"],
        ["標準時", "noon＝{{distant authorities}} が決めた数字。"],
      ]),
      C("precision", 3, U.chobun, "下線部(ウ)の内容に最も近いものを選べ。", [
        "However accurate clocks become, each society still decides how strictly to keep to time.",
        "More precise clocks will eventually make all societies equally punctual.",
        "People who arrive late do so because their clocks are inaccurate.",
        "Digital devices have made punctuality unimportant.",
      ], 0, [
        "正解。時計の正確さは、それをどう使うか（時間をどれほど厳しく守るか）を決めない。",
        "正確さが使い方を決めない、という下線部と逆。",
        "遅れる理由を時計の不正確さに求めてはいない。社会による態度のちがいを述べている。",
        "時間を守ることが重要でなくなった、とは述べていない。",
      ], "does not determine＝決めるわけではない", [
        ["主語と目的語", "{{the precision of our clocks}} does not determine {{how we choose to use them}}。"],
        ["文脈", "直前：10分遅れが失礼な社会も、ふつうの社会もある → {{社会が選ぶ}}。"],
      ]),
    ],
    7,
    [
      { word: "punctuality", meaning: "時間を守ること" },
      { word: "authority", meaning: "当局・権威のある機関" },
    ],
  ),
];

// =====================================================================
// 第3問　自由英作文（100〜140語）
// =====================================================================

/** 自由英作文の採点基準 (大学公表の観点：content・organization・language) */
const esRubric = (content: string[], org: string[], lang: string[]): [string, number, string[]][] => [
  ["内容：問いに正面から答え、理由・具体例で自分の考えを示している", 6, content],
  ["構成：主張→理由・例→（反対意見への応答）→結論の流れが論理的", 4, org],
  ["言語：語彙・文法が正確で、表現に幅がある（100〜140語）", 6, lang],
];

const ES = (id: string, d: 2 | 3, question: string, model: string, rubric: [string, number, string[]][], point: string, st: St[]): QuestionB =>
  Wr(id, d, U.jiyu, `${question}\n（100〜140語）`, { min: 100, max: 140, unit: "語" }, model, rubric, point, st, 1500);

function esec(id: string, title: string, questions: QuestionB[]): ExamPoolSection {
  return {
    unit: U.jiyu,
    tag: "hitotsubashi-eigo:3",
    section: { id: `hit-en-${id}`, title, lead: ES_LEAD, style: "writing", examOnly: true, pick: 1, questions },
  };
}

const P3: ExamPoolSection[] = [
  esec("es-tech", "自由英作文（テクノロジーと暮らし）", [
    ES("phones-children", 3, "Should children under the age of twelve be allowed to have their own smartphones? Explain your opinion.", `I do not think that children under twelve should have their own smartphones. First, young children find it very hard to control how long they use such devices. Games and videos are designed to keep users watching, and a child who stays up late with a phone may be too tired to concentrate at school the next day. Second, a smartphone exposes children to strangers and to harmful content that their parents cannot always check. Some people argue that children need phones for safety, for example to contact their families in an emergency. However, a simple phone that can only make calls would meet this need without the risks. For these reasons, I believe parents should wait until their children are old enough to use smartphones responsibly.`,
      esRubric(["First", "Second", "for example"], ["Some people argue", "However", "For these reasons"], ["exposes", "responsibly"]),
      "反対意見（安全のため）に代案で答える", [
        ["立場", "最初の1文で{{賛成か反対か}}をはっきり書く。"],
        ["理由", "{{First / Second}} で理由を2つ。反対意見には{{通話だけの携帯}}という代案で答える。"],
      ]),
    ES("paper-screen", 2, "Do you prefer reading books on paper or on a screen? Explain your choice.", `I prefer reading books on paper, even though I use screens for almost everything else. The main reason is that I remember more of what I read on paper. When I hold a printed book, I can feel how far I have read and recall where on the page a certain idea appeared, which helps me follow long arguments. Screens, on the other hand, tempt me to check messages, so my attention is constantly broken. Of course, electronic books have clear advantages. They are light, cheap and convenient when traveling. Still, for books that I want to understand deeply, such as novels or history books, paper allows me to slow down and think. In the end, reading feels more valuable when nothing else is competing for my attention.`,
      esRubric(["remember", "attention"], ["The main reason", "on the other hand", "Of course", "Still"], ["tempt", "competing"]),
      "相手側の長所を認めてから自分の側に戻る", [
        ["理由", "紙のほうが{{記憶に残る}}：どこまで読んだか・どこに書いてあったかがわかる。"],
        ["譲歩", "{{Of course}} で電子書籍の長所を認め、{{Still}} で自分の立場に戻る。"],
      ]),
  ]),
  esec("es-education", "自由英作文（教育と学び）", [
    ES("study-abroad", 3, "Should all university students be required to spend some time studying abroad? Explain your opinion.", `Although studying abroad is a valuable experience, I do not believe it should be required of all university students. The biggest problem is cost. Living in another country for several months is expensive, and a rule that forces everyone to go would place a heavy burden on students from families with limited income. In addition, some students have good reasons to stay at home, such as caring for a family member or working to support themselves. Instead of making it compulsory, universities should make studying abroad easier by offering scholarships and short programs. They could also create chances for international exchange on campus, for example by inviting foreign students to join seminars. In this way, many students could gain an international outlook without anyone being excluded.`,
      esRubric(["cost", "burden", "scholarships"], ["Although", "In addition", "Instead of", "In this way"], ["compulsory", "excluded"]),
      "「義務化に反対」＋「代わりの方法」の型", [
        ["立場", "{{Although}} で価値を認めつつ、義務化には反対と示す。"],
        ["代案", "{{Instead of making it compulsory}}：奨学金・短期プログラム・学内の交流。"],
      ]),
    ES("skill-school", 2, "What is one skill that schools should teach but usually do not? Explain why.", `I think schools should teach students how to manage their personal finances. Most young people leave school without knowing how to make a budget, how loans and interest work, or how to avoid common scams. As a result, some fall into debt soon after they start living on their own, simply because they did not understand the contracts they signed. Learning these skills at school would protect students and give them more freedom to plan their futures. For example, a class could ask students to plan a month of living costs based on a realistic salary. Some may say that families should teach money matters at home. However, not all parents have the knowledge or time to do so, and school is the one place where every child can learn equally.`,
      esRubric(["budget", "debt", "For example"], ["As a result", "Some may say", "However"], ["manage", "realistic"]),
      "技能を1つにしぼり、なぜ学校かまで答える", [
        ["技能", "1つにしぼる：{{お金の管理}}（予算・ローン・詐欺）。"],
        ["なぜ学校か", "家庭で教えればよい、という意見に「{{すべての子が平等に学べる}}のは学校」と答える。"],
      ]),
  ]),
  esec("es-society", "自由英作文（社会のしくみ）", [
    ES("city-town", 2, "Is it better to live in a large city or in a small town? Give reasons for your answer.", `In my opinion, it is better to live in a small town, at least for people who are raising children. First, small towns are usually quieter and safer, and children can play outside or walk to school without their parents worrying too much. Second, people in a small community tend to know one another, so neighbors can help each other in difficult times, such as after a natural disaster. Of course, large cities offer more jobs, better hospitals and a wider range of cultural activities. However, improvements in transport and online services have reduced many of these differences. Today, it is possible to work remotely, shop online and still visit a city when necessary. For these reasons, I believe a small town offers a more balanced way of life.`,
      esRubric(["safer", "neighbors", "First", "Second"], ["Of course", "However", "For these reasons"], ["remotely", "balanced"]),
      "条件（子育て中なら）をつけると論点がしぼれる", [
        ["条件", "{{at least for people who are raising children}} と範囲をしぼる。"],
        ["譲歩と反論", "都市の長所を認め、{{交通・オンライン}}で差が縮まったと答える。"],
      ]),
    ES("voting", 3, "Should voting in national elections be made compulsory in Japan? Explain your opinion.", `I do not think that voting should be made compulsory in Japan. It is true that low turnout is a serious problem, especially among young people, and that a government chosen by only half of the voters may not reflect the views of the whole nation. However, forcing people to vote does not make them better informed. Someone who votes only to avoid a fine may choose a candidate at random, which adds little value to the result. A better solution would be to make voting easier and more attractive. For example, the government could allow people to vote online, and schools could teach students how to compare the policies of different parties. If citizens understand why their vote matters, they will take part willingly, and the result will be more meaningful.`,
      esRubric(["turnout", "informed", "For example"], ["It is true that", "However", "A better solution"], ["compulsory", "willingly"]),
      "It is true that … However … で譲歩してから反論", [
        ["譲歩", "{{It is true that}} 投票率の低さは問題だ、と認める。"],
        ["反論と代案", "強制しても{{知識はふえない}} → {{オンライン投票}}・学校での教育という代案。"],
      ]),
  ]),
  esec("es-personal", "自由英作文（自分の経験と価値観）", [
    ES("good-friend", 2, "What do you think makes someone a good friend? Explain with an example.", `In my view, a good friend is someone who is honest with you even when honesty is uncomfortable. It is easy to find people who agree with everything you say, but such people cannot help you grow. When I was in junior high school, a close friend told me that I often interrupted others during group work. At first I felt hurt, but I soon realized she was right, and I began to listen more carefully. Her comment improved my relationships with many classmates. Of course, honesty must be combined with kindness. A good friend chooses the right moment and the right words, and makes it clear that criticism comes from care rather than from a wish to hurt. Friendships built on this kind of trust last much longer than those built on flattery.`,
      esRubric(["honest", "When I was", "example"], ["In my view", "At first", "Of course"], ["interrupted", "flattery"]),
      "定義→体験の例→条件づけ→まとめ", [
        ["定義", "最初に{{「良い友人とは～な人」}}と1文で示す。"],
        ["例", "自分の{{具体的な体験}}（いつ・何があり・どう変わったか）で裏づける。"],
      ]),
    ES("failure", 3, "Describe a failure from which you learned something important.", `Last year, I failed to win a place on my school's debate team, although I had practiced for weeks. I had memorized long speeches and believed that my preparation would be enough. During the selection, however, the other speakers asked unexpected questions, and I could not answer them because I had only prepared what I wanted to say. At first I was very disappointed, but the experience taught me an important lesson: real preparation means understanding the other side as well as your own. After that, I began reading articles that disagreed with my opinions and discussing them with friends. This year I joined the team, and more importantly, I have become better at listening to people whose views differ from mine. Failure showed me what my confidence had hidden.`,
      esRubric(["failed", "lesson", "After that"], ["During", "At first", "This year"], ["memorized", "unexpected"]),
      "失敗→原因→教訓→その後の変化を時の順に", [
        ["出来事", "{{何に失敗したか}}と、その{{原因}}を具体的に。"],
        ["教訓", "コロンで{{教訓を1文}}にまとめ、その後の行動の変化で示す。"],
      ]),
  ]),
];

// =====================================================================

export const U_HITOTSUBASHI_EIGO: UnivExam = {
  key: "hitotsubashi-eigo",
  univ: "一橋大学",
  kamoku: "英語",
  tier: "国公立",
  order: 111,
  basis: "前期日程（全学部共通問題）の傾向を参考",
  format: "大問3題・120分。論説の長文2題（日本語の説明・和訳、文法語法・整序）と100〜140語の自由英作文。",
  minutes: 120,
  groups: ["語彙", "文法", "技能"],
  sections: [
    { title: "第1問　長文読解（社会・文化の論説：説明・和訳）", lead: READ1_LEAD, count: [5, 5], mix: [0, 0.4, 0.6], points: 80, prefer: "material", poolTag: "hitotsubashi-eigo:1" },
    { title: "第2問　長文読解（科学・歴史の論説：文法・語法）", lead: READ2_LEAD, count: [7, 7], mix: [0, 0.4, 0.6], points: 70, prefer: "material", poolTag: "hitotsubashi-eigo:2" },
    { title: "第3問　自由英作文（100〜140語）", lead: ES_LEAD, count: [1, 1], mix: [0, 0.4, 0.6], points: 50, prefer: "material", poolTag: "hitotsubashi-eigo:3" },
  ],
  pool: [...P1, ...P2, ...P3],
};
