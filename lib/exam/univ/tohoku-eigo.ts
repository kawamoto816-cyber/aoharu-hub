import type { UnivExam } from "./types";
import type { ExamPoolSection } from "../pool/types";
import type { QuestionB, Skill, SolutionStep } from "@/lib/moshi/types";

// 東北大学型 英語（国公立・2次試験）。前期日程の個別学力検査（外国語・英語）の傾向を参考にした形式（英文・和文・設問はすべて書き下ろし）。
//   100分・200点・大問4題・全問記述（選択も含む）。I・II は論説の長文読解（空所補充・下線部和訳・指示語を明らかにした和訳・
//   日本語の内容説明・英語での説明・内容一致）、III は会話文の読解（空所補充）とそれをふまえた自由英作文（賛否を述べる）、
//   IV は日本文の下線部の和文英訳。リスニングはない。
//   英文の題材・登場する町や人物はすべて架空。実在の人物の発言は使っていない。
// 参考:
//   https://jyuke-labo.com/daigakujyukentaisaku/touhokudaigaku/eigo/ （100分・全問記述・大問4題：長文2題・会話文と自由英作文・和文英訳。リスニングなし）
//   https://ja.wikibooks.org/wiki/%E6%9D%B1%E5%8C%97%E5%A4%A7%E5%AF%BE%E7%AD%96 （長文の空欄補充・下線部和訳・内容正誤、会話文の空欄補充、英語で説明させる設問、オーソドックスな和文英訳）
//   https://jyuke-labo.com/daigakujyukentaisaku/touhokudaigaku/kamokubetsu/ （学部ごとの科目・配点）
//   https://adchan.ihe.tohoku.ac.jp/wp-content/uploads/2021/04/644cc326c9626514d79286fffce328d4.pdf （東北大学 入試の出題方針）

const U = {
  chobun: "h-eng-skill-chobun",
  wabun: "h-eng-skill-wabun",
  jiyu: "h-eng-skill-jiyu",
  vocab: "h-eng-vocab-2000",
  setsuzoku: "h-eng-gram-setsuzokushi",
  zenchishi: "h-eng-gram-zenchishi",
  kandai: "h-eng-gram-kandai",
  tokushu: "h-eng-gram-tokushu",
  hikaku: "h-eng-gram-hikaku",
  bunshi: "h-eng-gram-bunshikobun",
} as const;

type St = [string, string];
type Rb = [string, number, string[]][];
const steps = (s: St[]): SolutionStep[] => s.map(([title, body]) => ({ title, body }));
const K: Skill = "知識・技能";
const S: Skill = "思考・判断・表現";

/** 記述 (和訳・内容説明・英語での説明・英作文・英訳)。配点は採点基準の合計 */
function W(id: string, difficulty: 2 | 3, unit: string, prompt: string, model: string, rubric: Rb, point: string, st: St[], limit?: { min?: number; max?: number; unit: "語" | "字" }, seconds = 420, also?: string[]): QuestionB {
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

/** 4択 (正解は options[0]) */
function C(id: string, difficulty: 2 | 3, unit: string, prompt: string, options: string[], why: string[], point: string, st: St[], skill: Skill = S): QuestionB {
  return { id, type: "B", difficulty, points: 6, seconds: 120, skill, unit, prompt, answer: { kind: "choice", options, correct: 0, why }, point, steps: steps(st) };
}

/** 下線部和訳の採点基準 (10点) */
const jt = (frame: string, fk: string[], word: string, wk: string[]): Rb => [
  [`構文の把握：${frame}`, 4, fk],
  [`語句の訳：${word}`, 3, wk],
  ["日本語として自然で、訳しもれ・つけ足しがない", 3, []],
];
/** 指示語を明らかにした和訳の採点基準 (12点) */
const jz = (ref: string, rk: string[], frame: string, fk: string[]): Rb => [
  [`指示語の内容：${ref}`, 4, rk],
  [`構文の把握：${frame}`, 5, fk],
  ["日本語として自然で、訳しもれ・つけ足しがない", 3, []],
];
/** 内容説明 (日本語) の採点基準 (10点) */
const ex = (a: [string, string[]], b: [string, string[]]): Rb => [
  [a[0], 5, a[1]],
  [b[0], 3, b[1]],
  ["字数の条件を守り、日本語として筋が通っている", 2, []],
];
/** 英語での説明の採点基準 (10点) */
const ee = (a: [string, string[]], b: [string, string[]]): Rb => [
  [a[0], 4, a[1]],
  [b[0], 3, b[1]],
  ["文法・語法の誤りがなく、本文の丸写しでなく自分の英語でまとめている", 3, []],
];

const WY = (id: string, label: string, unit: string, model: string, rb: Rb, point: string, st: St[]) =>
  W(id, 2, unit, `下線部${label}を和訳せよ。`, model, rb, point, st, undefined, 420);
const WZ = (id: string, label: string, word: string, unit: string, model: string, rb: Rb, point: string, st: St[]) =>
  W(id, 3, unit, `下線部${label}を、${word} が指す内容を明らかにして和訳せよ。`, model, rb, point, st, undefined, 480);
const WS = (id: string, prompt: string, max: number, model: string, rb: Rb, point: string, st: St[]) =>
  W(id, 3, U.chobun, `${prompt}（${max}字以内の日本語で）`, model, rb, point, st, { max, unit: "字" }, 420);
const WE = (id: string, prompt: string, model: string, rb: Rb, point: string, st: St[]) =>
  W(id, 3, U.chobun, `${prompt} Answer in English (20–35 words).`, model, rb, point, st, { min: 20, max: 35, unit: "語" }, 480);

const READ_LEAD = "次の英文を読み、下の問いに答えよ。";

function reading(tag: number, id: string, title: string, ptitle: string, body: string, questions: QuestionB[], notes?: { word: string; meaning: string }[]): ExamPoolSection {
  return {
    unit: U.chobun,
    tag: `tohoku-eigo:${tag}`,
    section: {
      id: `tohoku-en-${id}`,
      title,
      lead: READ_LEAD,
      style: "reading",
      examOnly: true,
      material: [{ kind: "passage", lang: "en", title: ptitle, body, ...(notes ? { notes } : {}) }],
      pick: questions.length,
      questions,
    },
  };
}

function wsec(tag: number, id: string, unit: string, title: string, lead: string, material: { lang: "ja" | "en"; title?: string; body: string }, questions: QuestionB[]): ExamPoolSection {
  return {
    unit,
    tag: `tohoku-eigo:${tag}`,
    section: {
      id: `tohoku-en-${id}`,
      title,
      lead,
      style: tag === 3 ? "reading" : "writing",
      examOnly: true,
      material: [{ kind: "passage", ...material }],
      pick: questions.length,
      questions,
    },
  };
}

// =====================================================================
// 第1問　長文読解（社会・文化の論説）
//   どの節も 6問：空所(2)・下線部和訳(2)・内容説明(3)・指示語つき和訳(3)・英語での説明(3)・内容一致(2)
// =====================================================================

const P1: ExamPoolSection[] = [
  reading(1, "r-stones", "長文読解（災害の記憶を受け継ぐ）", "Stones That Remember", `Along parts of the coast, travellers sometimes come across old stone markers standing on hillsides far above the sea. Most are weathered, and the words carved on them are hard to read. In the fishing village of Kirinohama, one such stone carries a short warning: "Do not build your houses below this point." It was set up about a century ago by survivors of a great wave that destroyed almost every home in the village. For decades, the villagers obeyed it. Then, as the memory of the disaster faded and the population grew, new houses gradually crept down toward the harbour, [ 1 ] the stone remained exactly where it had always been.

The story of Kirinohama illustrates a problem that researchers who study disasters call the fading of memory. {{(A) People who have lived through a disaster rarely need to be told how dangerous it was; the difficulty lies in passing that knowledge on to those who have not.}} Within two or three generations, a catastrophe that once shaped every decision in a community can become little more than a date in a history book. Official records may survive, but records alone seldom change how people behave.

Why should this be so? One reason is that a warning carved in stone tells people what to do but not why. A child who reads "Do not build below this point" may obey out of respect for the adults who explain it to her, but her grandchildren, who have never seen the sea rise, are likely to treat the rule as an old superstition, especially when land near the harbour is cheaper and more convenient. {{(B) Knowledge that is not connected to anyone's experience is easily outweighed by the ordinary concerns of daily life.}}

Some communities have tried to keep memories alive in other ways. In a town further along the coast, schoolchildren interview elderly residents every year and turn their stories into short plays, which are performed on the anniversary of the disaster. The children do not simply learn that a wave once came; they hear how a grandmother ran uphill carrying her younger brother, and which paths were blocked by fallen trees. What they gain is detailed knowledge of what happened and how people survived. {{(C) Because it is passed on as a story rather than as a rule, it is far more likely to be remembered, and acted upon, when it is needed.}}

Such efforts matter because technology cannot do all the work. Modern warning systems can detect an earthquake within seconds and send messages to millions of phones. Yet a warning is useful only if people believe it and know where to go. Studies of past evacuations have found that many residents waited to see what their neighbours would do before moving, and that those who had heard vivid accounts of earlier disasters tended to leave sooner.

The stone in Kirinohama still stands. In recent years, the village has added a small sign beside it explaining who put it there and what they had seen. It is a modest change, but it reflects an important idea: a community's memory is not something that can be stored in a single object. It has to be renewed by each generation, or it will be lost.`, [
    C("blank1", 2, U.setsuzoku, "空所［ 1 ］に入る最も適切なものを選べ。", ["while", "because", "unless", "until"], [
      "正解。「家々は港のほうへ下りていったが、一方で石碑は元の場所にあった」という対比。while は「〜する一方で」。",
      "石碑が同じ場所にあったことは、家が下りていった理由ではない。",
      "「石碑が元の場所にない限り」では意味が通らない。",
      "「石碑が元の場所にあるまで」では意味が通らない。",
    ], "前後が対比なら while「〜する一方で」", [
      ["前後の関係", "家は{{下へ移っていった}} ↔ 石碑は{{元の場所のまま}}。"],
      ["接続詞", "対比を表す {{while}}。"],
    ], K),
    WY("tr-a", "(A)", U.chobun, "災害を生きのびた人々に、それがどれほど危険だったかを教える必要はほとんどない。難しいのは、その知識を、災害を経験していない人々に伝えることである。",
      jt("rarely need to be told・the difficulty lies in doing・those who have not (lived through a disaster)", ["ほとんど", "難しいのは", "経験していない"], "live through・pass on", ["生きのび", "伝える"]),
      "have not の後ろの省略を補う", [
        ["前半", "People who have {{lived through}} a disaster：「災害を生きのびた人々」。rarely need to be told：「教えられる必要はほとんどない」。"],
        ["省略", "those who have not ＝ those who have not {{lived through a disaster}}。"],
      ]),
    WS("ex-b", "下線部(B)は Kirinohama ではどのようなことを指しているか。本文に即して説明せよ。", 80,
      "大災害を見たことのない子孫には石碑の警告が理由のわからない迷信のように思われ、港の近くの土地が安く便利だという日常の事情のほうが優先されたこと。",
      ex(["警告が理由とつながらず、経験のない子孫には迷信のように思われることを書いている", ["理由", "迷信", "見たことのない", "経験"]], ["港近くの土地が安く便利だという日常の事情が優先されたことを書いている", ["安く", "便利"]]),
      "抽象的な一文は、直前の具体例に戻して説明する", [
        ["具体例", "直前：grandchildren, who have never seen the sea rise, … treat the rule as an {{old superstition}}。"],
        ["日常の事情", "land near the harbour is {{cheaper and more convenient}} → 警告より優先される。"],
      ]),
    WZ("tr-c", "(C)", "it", U.kandai, "何が起き、人々がどう生きのびたかについての詳しい知識は、規則としてではなく物語として受け継がれるので、必要なときに思い出され、そして実際の行動に生かされる可能性がはるかに高い。",
      jz("it ＝ 何が起き、人々がどう生きのびたかについての詳しい知識", ["知識", "生きのび", "起き"], "as A rather than as B・be far more likely to be remembered, and acted upon", ["ではなく", "はるかに", "行動"]),
      "it は直前の文の knowledge を受ける", [
        ["指示語", "it ＝直前の {{detailed knowledge of what happened and how people survived}}：祖母が坂を駆け上がった話・ふさがれた道などから得る知識。"],
        ["構文", "{{as a story rather than as a rule}}「規則としてではなく物語として」。act upon は「〜にもとづいて行動する」。"],
      ]),
    WE("en", "Why does the writer think the school plays are more effective than the stone marker?",
      "The plays pass on survivors' real experiences as vivid stories, showing why and how people escaped, while the stone only gives a rule without reasons, which later generations may ignore.",
      ee(["劇は体験を（生き生きとした）物語として伝えることを書いている", ["story", "stories", "experience"]], ["石碑は理由のない規則しか伝えないことを書いている", ["rule", "reason", "why"]]),
      "対比の両側（劇・石碑）を一文ずつ", [
        ["劇", "第4段落：{{as a story rather than as a rule}}、具体的な逃げ方まで伝わる。"],
        ["石碑", "第3段落：tells people what to do but {{not why}}。"],
      ]),
    C("agree", 2, U.chobun, "本文の内容と一致するものを選べ。", [
      "Residents who had heard vivid accounts of earlier disasters tended to evacuate sooner.",
      "The stone in Kirinohama was moved closer to the harbour as the village grew.",
      "Modern warning systems have made the memory of past disasters unnecessary.",
      "The writer believes that official records are enough to change people's behaviour.",
    ], [
      "正解。第5段落 those who had heard vivid accounts of earlier disasters tended to leave sooner に一致。",
      "石碑は exactly where it had always been（元の場所のまま）。動いたのは家。",
      "technology cannot do all the work とあり、逆。",
      "records alone seldom change how people behave とあり、逆。",
    ], "alone・only の否定に注意して照合する", [
      ["正解の根拠", "those who had heard {{vivid accounts}} … tended to {{leave sooner}}。"],
      ["誤りの根拠", "records {{alone seldom}} change …・technology {{cannot do all}} the work。"],
    ]),
  ], [{ word: "weathered", meaning: "風雨にさらされて傷んだ" }, { word: "catastrophe", meaning: "大災害" }, { word: "evacuation", meaning: "避難" }]),

  reading(1, "r-museum", "長文読解（博物館の役割の変化）", "From Treasure House to Meeting Place", `For much of their history, museums were places of quiet admiration. Visitors walked slowly past glass cases, read small labels written by experts, and left without having said a word. The message was clear: the museum knew, and the public came to learn. {{(A) Few people questioned this arrangement, since it seemed only natural that those who had spent their lives studying objects should decide how they were presented.}}

Over the past few decades, however, many museums have begun to rethink their role. [ 1 ] simply displaying their collections, they increasingly invite visitors to take part. At a small city museum in the northern town of Arnsby, for example, residents were asked to bring in everyday objects that reminded them of their childhood: a school bag, a radio, a tin of buttons. The objects were displayed alongside the owners' own handwritten notes. The exhibition attracted more visitors in three months than the museum normally received in a year.

Why should such exhibitions be so popular? Part of the answer is that people enjoy seeing their own lives treated as worth remembering. But there is a deeper reason. {{(B) Traditional displays tend to present history as something that happened to other people, far away and long ago.}} When ordinary objects appear in a museum, visitors begin to see themselves as part of the story, and the distance between past and present shrinks.

This change has not been welcomed by everyone. Some critics worry that museums are turning into entertainment centres, more concerned with attracting crowds than with scholarship. If every visitor's memory is treated as equally valuable, they ask, who will tell the difference between what is accurate and what is merely popular? {{(C) These are fair questions, and they cannot be dismissed simply by pointing to the number of tickets sold.}}

Many curators reply that participation and expertise need not be opposed. A curator at Arnsby explains that her job has changed from deciding what visitors should think to helping them think well. She still checks dates, identifies materials and corrects mistaken stories, but she also listens. Visitors, in turn, often provide information that no book contains: how a tool was actually used, for instance, or what a song meant to the people who sang it.

Seen in this way, the museum is becoming less a treasure house than a meeting place, where specialists and the public examine the past together. Its authority now depends not only on what it owns but also on whom it is willing to listen to.`, [
    C("blank1", 2, U.zenchishi, "空所［ 1 ］に入る最も適切なものを選べ。", ["Instead of", "According to", "Because of", "In spite of"], [
      "正解。「単に収蔵品を展示する代わりに、来館者に参加を求める」。instead of doing は「〜する代わりに」。",
      "according to は「〜によれば」で、後ろに displaying を置いても意味が通らない。",
      "「展示するために参加を求める」という因果関係は本文にない。",
      "「展示するにもかかわらず」では、役割を見直したという流れに合わない。",
    ], "instead of doing＝〜する代わりに", [
      ["文脈", "役割を見直した → 単に展示する{{のではなく}}、参加を求める。"],
      ["語法", "{{Instead of}} simply displaying …：前置詞なので後ろは動名詞。"],
    ], K),
    WY("tr-a", "(A)", U.kandai, "このしくみに疑問をもつ人はほとんどいなかった。生涯をかけて物を研究してきた人々が、それをどのように展示するかを決めるのは、まったく当然のことに思われたからである。",
      jt("Few people …「ほとんどいない」・since SV（理由）・it seemed natural that S should do", ["ほとんどいなかった", "から", "当然"], "arrangement・spend one's life doing・be presented", ["しくみ", "あり方", "生涯", "展示"]),
      "当然を表す that 節の should は訳さない", [
        ["前半", "{{Few people}} questioned …：「疑問をもつ人はほとんどいなかった」。"],
        ["後半", "since＝理由。{{it seemed only natural that}} …「〜は当然に思われた」。they＝objects。"],
      ]),
    WS("ex-b", "下線部(B)のような展示に対して、日用品を集めた展示はどのような効果をもつと筆者は述べているか。説明せよ。", 60,
      "来館者が自分も歴史の一部であると感じるようになり、過去と現在の隔たりが縮まるという効果。",
      ex(["来館者が自分を歴史（物語）の一部と見るようになることを書いている", ["一部", "自分"]], ["過去と現在の距離が縮まることを書いている", ["過去", "現在", "縮"]]),
      "(B) の直後の When … の文が答え", [
        ["対比", "従来：歴史は{{遠い昔の他人}}のこと。"],
        ["効果", "visitors begin to see themselves as {{part of the story}}, and the distance between past and present {{shrinks}}。"],
      ]),
    WZ("tr-c", "(C)", "These", U.kandai, "すべての来館者の記憶が等しく価値あるものとして扱われるなら、正確なものとただ人気があるだけのものとの区別をだれがつけるのか、という批判者たちの問いはもっともな問いであり、入場券の販売数を示すだけで退けることはできない。",
      jz("These ＝ 来館者の記憶をすべて等しく扱えば、正確なものと人気があるだけのものをだれが区別するのかという問い", ["正確", "人気", "区別"], "cannot be dismissed simply by doing「〜するだけで退けることはできない」", ["だけで", "退け"]),
      "複数の These は直前の問い（they ask …）を受ける", [
        ["指示語", "直前：who will tell the difference between what is {{accurate}} and what is merely {{popular}}?"],
        ["構文", "{{cannot be dismissed simply by pointing to}} the number of tickets sold：「入場者数を持ち出すだけで片づけることはできない」。"],
      ]),
    WE("en", "How has the job of the curator at Arnsby changed?",
      "She used to decide what visitors should think, but now she helps them think well, checking facts while also listening to the information visitors bring.",
      ee(["以前は来館者が何を考えるべきかを決めていたことを書いている", ["decide", "should think"]], ["今は来館者がよく考える手助けをし、話にも耳を傾けることを書いている", ["help", "listen"]]),
      "from A to B「AからBへ」の両側を書く", [
        ["根拠", "her job has changed {{from deciding what visitors should think}} {{to helping them think well}}。"],
        ["補足", "She still checks dates …, but she also {{listens}}。"],
      ]),
    C("agree", 2, U.chobun, "本文の内容と一致するものを選べ。", [
      "Visitors to museums can sometimes provide information that cannot be found in books.",
      "The exhibition at Arnsby attracted fewer visitors than the museum usually received.",
      "The writer thinks that critics of the new museums are simply wrong.",
      "Curators at Arnsby have stopped checking the facts that visitors give them.",
    ], [
      "正解。第5段落 Visitors … often provide information that no book contains に一致。",
      "3か月で通常1年分より多くの来館者を集めた。逆。",
      "These are fair questions（もっともな問い）と認めている。",
      "She still checks dates … and corrects mistaken stories とあり、逆。",
    ], "筆者が批判をどう扱っているかに注意", [
      ["正解の根拠", "information that {{no book contains}}。"],
      ["誤りの根拠", "{{These are fair questions}}・She {{still checks}} dates。"],
    ]),
  ], [{ word: "curator", meaning: "学芸員" }, { word: "scholarship", meaning: "学問・学術研究" }]),

  reading(1, "r-hand", "長文読解（手書きとタイピング）", "The Slow Hand", `In many university lecture halls today, the sound of pens on paper has been replaced by the quiet clicking of keys. Laptops allow students to record far more of what a lecturer says, and their notes are neat, searchable and easy to share. It seems obvious that more complete notes should lead to better learning. Yet a number of studies suggest that the opposite may be true.

In a typical experiment, students watch a short lecture and take notes, some by hand and some on a computer. Later they are tested on what they have heard. Those who type usually produce longer notes, often copying the lecturer's words almost exactly. [ 1 ], when the questions require understanding rather than simple recall, the students who write by hand tend to perform better.

The explanation most often given concerns speed. Most people can type much faster than they can write, fast enough to take down a lecture nearly word for word. {{(A) Because writing by hand is too slow for that, students who use a pen are forced to decide what is important and to put it into their own words.}} This act of selecting and summarizing is itself a form of thinking, and it helps fix ideas in memory.

Some researchers add a second explanation. Forming letters by hand involves a complex series of movements, each slightly different from the last, whereas pressing a key produces the same action whatever letter is typed. Brain scans have suggested that handwriting activates a wider network of areas than typing does. {{(B) Whether this activity directly improves learning is still debated, but it may help explain why children who practise writing letters by hand often learn to recognize them more quickly.}}

None of this means that laptops should be banned from classrooms. A keyboard is a great help for students with certain disabilities, and typed notes are easier to organize later. Moreover, the advantage of handwriting seems to disappear when typists are trained to summarize instead of copying everything down. {{(C) What matters, in other words, is not the tool itself but the kind of mental work it encourages.}}

Perhaps the real lesson concerns the value of a certain kind of difficulty. We tend to assume that anything which makes a task easier must also make it more effective. In learning, this is not always the case. Sometimes the slower path, which forces us to think as we go, is the one that leads further.`, [
    C("blank1", 2, U.setsuzoku, "空所［ 1 ］に入る最も適切なものを選べ。", ["However", "Therefore", "For example", "In other words"], [
      "正解。「タイプした学生のほうが長いノートをとる。しかし、理解を問う問題では手書きの学生のほうが成績がよい」という逆接。",
      "長いノートをとることから、手書きのほうが成績がよいという結果は導けない。",
      "後ろの文は前の文の具体例ではない。",
      "後ろの文は前の文の言いかえではなく、予想に反する結果。",
    ], "予想（長いノート＝よい成績）に反する結果は逆接", [
      ["前", "タイプした学生は{{長いノート}}をとる。"],
      ["後", "それでも理解を問うと{{手書きの学生のほうがよい}} → {{However}}。"],
    ], K),
    WY("tr-a", "(A)", U.bunshi, "手で書くのはそれをするには遅すぎるので、ペンを使う学生は、何が重要かを判断し、それを自分のことばで言い表さざるをえない。",
      jt("Because SV, S are forced to do A and to do B", ["ので", "ざるをえない", "強いられ"], "too slow for that（＝講義をほぼ一語一語書き取ること）・put it into their own words", ["遅すぎ", "自分のことば"]),
      "be forced to do は「〜せざるをえない」", [
        ["that の内容", "too slow {{for that}}：that＝講義を{{ほぼ一語一語書き取ること}}（直前の文）。"],
        ["並列", "forced {{to decide}} … and {{to put}} …：二つの不定詞が forced に続く。"],
      ]),
    WS("ex-c", "下線部(C)のように筆者が言う根拠を、本文に即して説明せよ。", 80,
      "要約するよう訓練されればタイピングでも手書きの利点が消えるので、学習の効果を決めるのは道具ではなく、要点を選び自分のことばでまとめる頭の働きだから。",
      ex(["要約するよう訓練するとタイピングでも手書きの利点が消えることを書いている", ["訓練", "要約", "消え"]], ["効果を決めるのは要点を選び自分のことばでまとめる頭の働きであることを書いている", ["選", "まとめ", "頭の働き", "考え"]]),
      "in other words は直前の文の言いかえ", [
        ["直前", "the advantage of handwriting seems to {{disappear when typists are trained to summarize}}。"],
        ["つなぐ", "第3段落：{{selecting and summarizing}} is itself a form of thinking。"],
      ]),
    WZ("tr-b", "(B)", "this activity", U.kandai, "手書きによって脳の広い範囲の領域が働くことが学習を直接高めるのかどうかはまだ議論されているが、そのことは、手で文字を書く練習をする子どもがしばしば文字をより早く見分けられるようになる理由を説明する助けになるかもしれない。",
      jz("this activity ＝ 手書きによってタイピングより広い範囲の脳の領域が働くこと", ["脳", "広い", "領域"], "Whether SV is debated・help explain why SV", ["かどうか", "理由", "助け"]),
      "Whether 節が主語になっている", [
        ["指示語", "直前：handwriting activates {{a wider network of areas}} than typing does。"],
        ["構文", "{{Whether this activity directly improves learning}} is still debated：「〜かどうかはまだ議論されている」。"],
      ]),
    WE("en", "What does the writer mean by \"the value of a certain kind of difficulty\"?",
      "The writer means that a slower, harder way of learning, such as writing by hand, can be more effective because it forces us to think while we are working.",
      ee(["遅い・手間のかかる方法のほうが効果的なことがあると書いている", ["slow", "harder", "difficult"]], ["それが考えることを強いるからだと理由を書いている", ["think", "force"]]),
      "最終段落の最後の文が中心", [
        ["根拠", "the slower path, which {{forces us to think as we go}}, is the one that {{leads further}}。"],
        ["前提", "易しくする＝効果的、とは{{限らない}}（this is not always the case）。"],
      ]),
    C("agree", 2, U.chobun, "本文の内容と一致するものを選べ。", [
      "The writer argues that laptops can still be useful in classrooms.",
      "Students who type their notes usually write less than those who write by hand.",
      "Brain scans have proved that handwriting directly improves learning.",
      "Handwriting has an advantage even when typists are trained to summarize.",
    ], [
      "正解。第5段落 None of this means that laptops should be banned … typed notes are easier to organize later に一致。",
      "タイプした学生のほうが longer notes をとる。逆。",
      "学習を直接高めるかは still debated（議論中）。",
      "要約するよう訓練すると手書きの利点は disappear する。逆。",
    ], "proved・always など強い言い方を本文と照らす", [
      ["正解の根拠", "None of this means that laptops should be {{banned}}。"],
      ["誤りの根拠", "{{still debated}}・the advantage … seems to {{disappear}}。"],
    ]),
  ], [{ word: "recall", meaning: "思い出すこと・記憶の再生" }, { word: "disability", meaning: "障害" }]),
];

// =====================================================================
// 第2問　長文読解（科学・行動の論説）
//   どの節も 6問：空所(2)・下線部和訳(2)・内容説明(3)・指示語つき和訳(3)・英語での説明(3)・内容一致(2)
// =====================================================================

const P2: ExamPoolSection[] = [
  reading(2, "r-sleep", "長文読解（眠りと記憶の科学）", "What the Sleeping Brain Does", `Students preparing for examinations often treat sleep as a luxury. When time is short, an hour in bed seems like an hour lost, and staying up late to study appears to be a sensible trade. Research on sleep and memory suggests that this trade is usually a poor one.

Scientists once assumed that the sleeping brain was simply resting, like a machine switched off for the night. We now know that it remains remarkably active. Brain cells continue to fire, and some regions are almost as busy as they are during the day. What matters for memory is not only how much activity there is but what kind. During certain stages of sleep, patterns of activity recorded while an animal was learning something, such as a route through a maze, appear again, as if the brain were replaying the experience. {{(A) The more often a pattern is replayed, the better the animal seems to perform when it is tested the following day.}}

In humans, too, sleep appears to strengthen what has been learned. In one kind of study, volunteers memorize pairs of words in the evening and are tested the next morning; others learn the same pairs in the morning and are tested in the evening, after a day awake. [ 1 ] both groups wait the same number of hours, those who have slept usually remember more.

Sleep does not simply protect memories from fading. It also seems to reorganize them. Researchers have found that people who sleep after learning a set of facts are more likely to notice a hidden rule linking them than those who stay awake. It is as though the brain, freed from the need to deal with new information, uses the night to sort through the day's experiences and decide what is worth keeping.

This has practical consequences. A student who stays up until three in the morning may cover more pages, but much of what she reads is unlikely to be retained. Worse, lack of sleep makes it harder to concentrate the next day, so that she learns less in class as well. {{(B) Cutting sleep, then, does not so much create extra time for learning as borrow it at a high rate of interest.}}

None of this means that studying late is always useless, and individuals differ in how much sleep they need. But the evidence suggests that a good night's sleep is not time taken away from learning. It is part of the learning process itself.`, [
    C("blank1", 2, U.setsuzoku, "空所［ 1 ］に入る最も適切なものを選べ。", ["Although", "Because", "Unless", "Once"], [
      "正解。「両グループは同じ時間待つが、眠った人のほうがよく覚えている」という譲歩。待つ時間が同じだからこそ、睡眠の効果だとわかる。",
      "同じ時間待つことは、眠った人のほうがよく覚えている理由ではない。",
      "「同じ時間待たない限り」では意味が通らない。",
      "「いったん同じ時間待つと」では、眠った人とそうでない人の差を説明できない。",
    ], "条件が同じなのに結果が違う → 譲歩", [
      ["前後", "待つ時間は{{同じ}} ↔ 覚えている量は{{違う}}。"],
      ["接続詞", "譲歩の {{Although}}「〜だけれども」。"],
    ], K),
    WY("tr-a", "(A)", U.hikaku, "ある活動のパターンがくり返し再生されればされるほど、その動物は翌日テストされたときに成績がよくなるようである。",
      jt("The＋比較級 …, the＋比較級 ～「…すればするほど～」", ["ほど"], "be replayed・perform・the following day", ["再生", "成績", "翌日"]),
      "the＋比較級, the＋比較級 は「〜すればするほど」", [
        ["比較", "{{The more often}} a pattern is replayed, {{the better}} the animal seems to perform。"],
        ["語句", "perform は「（テストで）よい成績を出す」。seems to は「〜ようだ」。"],
      ]),
    WS("ex-d", "第4段落で、睡眠は記憶に対してどのような働きをすると述べられているか。二点にまとめて説明せよ。", 70,
      "記憶が薄れるのを防ぐ働きと、記憶を整理し直して、覚えた事柄どうしを結ぶ隠れた規則に気づきやすくする働き。",
      ex(["記憶が薄れるのを防ぐことを書いている", ["薄れ", "防"]], ["記憶を整理し直し、事柄を結ぶ規則に気づきやすくすることを書いている", ["整理", "規則"]]),
      "not simply A … also B の A・B が二点", [
        ["一点目", "Sleep does not simply {{protect memories from fading}}。"],
        ["二点目", "It also seems to {{reorganize}} them：{{hidden rule}} に気づきやすくなる。"],
      ]),
    WZ("tr-b", "(B)", "it", U.hikaku, "したがって、睡眠を削ることは、学習のための時間を余分に生み出すというより、むしろその時間を高い利子で借りるようなものである。",
      jz("it ＝ 学習のための（余分な）時間", ["時間"], "not so much A as B「AというよりむしろB」・then「したがって」", ["というより", "むしろ", "利子"]),
      "not so much A as B は「AというよりB」", [
        ["構文", "does {{not so much}} create extra time {{as}} borrow it：A・B は同じ原形動詞。"],
        ["比喩", "{{borrow it at a high rate of interest}}：翌日の集中力という形で高い利子を払う。"],
      ]),
    WE("en", "According to the passage, why might a student who stays up very late learn less?",
      "She is unlikely to retain much of what she reads late at night, and lack of sleep makes it harder for her to concentrate in class the next day.",
      ee(["夜遅くに読んだことがあまり記憶に残らないことを書いている", ["retain", "remember"]], ["睡眠不足で翌日の授業に集中しにくいことを書いている", ["concentrate", "class"]]),
      "第5段落の二つの理由を拾う", [
        ["理由1", "much of what she reads is {{unlikely to be retained}}。"],
        ["理由2", "lack of sleep makes it {{harder to concentrate the next day}}。"],
      ]),
    C("agree", 2, U.chobun, "本文の内容と一致するものを選べ。", [
      "The writer admits that people differ in how much sleep they need.",
      "Scientists have always known that the brain is active during sleep.",
      "People who stay awake after learning are better at finding hidden rules.",
      "The writer says that studying late at night is always a waste of time.",
    ], [
      "正解。最終段落 individuals differ in how much sleep they need に一致。",
      "かつては simply resting（休んでいるだけ）と考えられていた。",
      "隠れた規則に気づきやすいのは眠った人。逆。",
      "None of this means that studying late is always useless とあり、逆。",
    ], "once assumed（かつては考えられた）は今の考えと逆", [
      ["正解の根拠", "{{individuals differ}} in how much sleep they need。"],
      ["誤りの根拠", "Scientists {{once assumed}} … simply resting・{{not … always useless}}。"],
    ]),
  ], [{ word: "maze", meaning: "迷路" }, { word: "retain", meaning: "保持する・覚えておく" }]),

  reading(2, "r-drill", "長文読解（避難訓練と心のくせ）", "Rehearsing for the Unexpected", `When a fire alarm rings in an office building, a surprising number of people do not move at once. They look around, finish typing a sentence, or wait to see whether anyone else is leaving. Specialists in disaster behaviour have observed this hesitation again and again, in fires, floods and earthquakes. It is not usually a sign of foolishness. {{(A) It reflects a deep tendency of the mind to interpret unusual events as normal ones for as long as possible.}}

This tendency, sometimes called normalcy bias, has obvious advantages in ordinary life. If we panicked at every strange noise, we would exhaust ourselves. But in a real emergency, the minutes spent deciding whether the danger is real can be the minutes that matter most. [ 1 ] people need to act quickly, their minds are often working hard to persuade them that nothing is wrong.

Another difficulty is that stress narrows attention. Under pressure, people tend to fall back on familiar behaviour. Survivors of building fires have described walking past emergency exits in order to leave by the door they had entered through, simply because it was the only route they knew. In a crisis, in other words, people do not so much do what they have planned as what they are used to doing.

This is why drills matter. A drill is not mainly a way of teaching information; most people already know that they should leave a burning building. Its purpose is to turn knowledge into habit, so that the right action becomes the familiar one. In the coastal town of Minase, residents hold an evacuation drill every spring at a time that is not announced in advance. Children learn to run uphill without waiting for their parents, and families agree beforehand on where they will meet. {{(B) Because each member of a family trusts the others to head for the hill on their own, no one needs to waste time searching for them.}}

Drills are effective, however, only if they are realistic. A drill held at the same time each year, after everyone has been warned, may teach people little more than how to stand in line. Some schools now vary their drills, starting them during lunch breaks or blocking one of the usual exits, so that students must think about what to do. These small surprises are uncomfortable, but that discomfort is precisely what prepares people for the real thing.

No amount of practice can remove the danger of a disaster. What it can do is shorten the moment of hesitation between hearing a warning and acting on it. That moment, measured perhaps in seconds or minutes, often decides who survives.`, [
    C("blank1", 2, U.setsuzoku, "空所［ 1 ］に入る最も適切なものを選べ。", ["Just when", "As long as", "Unless", "So that"], [
      "正解。「まさにすばやく行動する必要があるときに、心は何も問題がないと思いこませようとしている」。just when は「ちょうど〜するときに」。",
      "as long as は「〜する限り」で、条件の意味になり文脈に合わない。",
      "「すばやく行動する必要がない限り」では意味が逆になる。",
      "so that は目的・結果を表し、文頭に置いて主節を続けると意味が通らない。",
    ], "皮肉な一致（まさにそのときに）は just when", [
      ["文脈", "すばやく{{動くべきとき}}に、心は{{何も問題ないと思わせる}} → 皮肉な一致。"],
      ["接続詞", "{{Just when}}「ちょうど〜するときに」。"],
    ], K),
    WY("tr-a", "(A)", U.zenchishi, "それは、ふつうでない出来事を、できるだけ長くふつうの出来事として解釈しようとする、心の根深い傾向を反映しているのである。",
      jt("a tendency of the mind to do・interpret A as B", ["傾向", "として"], "reflect・unusual / normal ones・for as long as possible", ["反映", "ふつう", "できるだけ長く"]),
      "interpret A as B は「AをBと解釈する」", [
        ["骨組み", "It {{reflects}} a deep tendency … {{to interpret}} A as B：不定詞は tendency を説明。"],
        ["語句", "normal {{ones}}＝normal events。{{for as long as possible}}「できるだけ長く」。"],
      ]),
    WS("ex-e", "第5段落で、どのような避難訓練は効果が小さいと述べられているか。その理由とともに説明せよ。", 80,
      "毎年同じ時期に予告して行う訓練で、並び方を覚える程度にとどまり、予想外の状況で自分で考えて動く準備にならないから。",
      ex(["毎年同じ時期に、予告して行う訓練であることを書いている", ["同じ時期", "予告"]], ["並び方を覚える程度で、予想外の状況で考えて動く準備にならないことを書いている", ["並び", "予想外", "考え"]]),
      "対比される「現実的な訓練」の特徴から理由を補う", [
        ["効果が小さい訓練", "held at {{the same time each year}}, after everyone has been {{warned}}。"],
        ["理由", "little more than {{how to stand in line}}／現実的な訓練は students {{must think}} about what to do。"],
      ]),
    WZ("tr-b", "(B)", "them", U.kandai, "家族の一人一人が、ほかの家族はそれぞれ自分で高台へ向かうと信じているので、だれもほかの家族を探して時間をむだにする必要がない。",
      jz("them ＝ ほかの家族（the others）", ["ほかの家族", "家族"], "trust O to do「Oが〜すると信じる」・no one needs to do", ["信じ", "だれも", "必要がない"]),
      "trust O to do は「Oが〜すると信頼する」", [
        ["指示語", "them＝{{the others}}：自分以外の家族。"],
        ["構文", "{{trusts the others to head for the hill}} on their own：「ほかの家族が自力で高台へ向かうと信じる」。"],
      ]),
    WE("en", "What is the main purpose of drills, according to the writer?",
      "Their main purpose is not to teach new information but to turn what people already know into habit, so that the right action feels familiar in an emergency.",
      ee(["新しい情報を教えることではないと書いている", ["not", "information"]], ["知識を習慣に変え、正しい行動をなじみのあるものにすることを書いている", ["habit", "familiar"]]),
      "not mainly A；Its purpose is B の B が答え", [
        ["根拠", "Its purpose is to {{turn knowledge into habit}}, so that the right action becomes the {{familiar}} one。"],
        ["背景", "第3段落：危機の中では{{慣れたこと}}をしてしまう。"],
      ]),
    C("agree", 2, U.chobun, "本文の内容と一致するものを選べ。", [
      "Under stress, people tend to choose routes that are familiar to them.",
      "The writer thinks that people who hesitate during an alarm are foolish.",
      "In Minase, children are taught to wait for their parents before running uphill.",
      "The writer believes that enough practice can remove the danger of disasters.",
    ], [
      "正解。第3段落 people tend to fall back on familiar behaviour … the only route they knew に一致。",
      "It is not usually a sign of foolishness とあり、逆。",
      "without waiting for their parents とあり、逆。",
      "No amount of practice can remove the danger とあり、逆。",
    ], "否定語（not・without・No amount）を見落とさない", [
      ["正解の根拠", "fall back on {{familiar behaviour}}・the only route they knew。"],
      ["誤りの根拠", "{{without waiting}} for their parents・{{No amount of practice}} can remove …。"],
    ]),
  ], [{ word: "normalcy bias", meaning: "正常性バイアス" }, { word: "drill", meaning: "訓練" }]),

  reading(2, "r-teen", "長文読解（十代の体内時計と始業時刻）", "The Teenage Clock", `Parents of teenagers often complain that their children stay up too late and cannot get out of bed in the morning. It is tempting to blame smartphones or simple laziness, and both may play a part. But biology also seems to be involved. Around the time of puberty, the body's internal clock shifts, so that teenagers naturally begin to feel sleepy later in the evening than they did as children.

This shift would cause few problems if teenagers could also wake up later. School, however, usually begins early in the morning. {{(A) As a result, many teenagers are required to be awake and alert at an hour when their bodies are still telling them to sleep.}} Surveys in several countries have found that a large proportion of high school students sleep well under the eight or more hours that experts recommend.

The effects go beyond tiredness. Sleep plays an important role in fixing what we have learned during the day, and students who sleep too little tend to remember less. Lack of sleep also affects mood, making young people more likely to feel irritable or anxious. [ 1 ], it can be dangerous: tired teenage drivers are more likely to be involved in accidents.

Some school districts have responded by moving the start of the school day later. In one district, classes that had begun at 7:30 were moved to 8:30. Over the following years, teachers reported that students were more attentive in morning classes, and attendance in the first period improved. Not every school that has tried the change has seen such clear results, but few have chosen to return to the earlier time.

Critics point out that a later start creates difficulties of its own. Buses must be rescheduled, after-school activities finish later, and parents who leave early for work may find it harder to organize their mornings. There is also a worry that teenagers will simply go to bed later, cancelling out any benefit. {{(B) The evidence so far suggests that this happens less often than was feared: most students in the districts studied used the extra time to sleep.}}

The debate over school hours raises a broader question. Schools are usually organized around the needs of adults: transport systems, working hours and tradition. Taking the biology of young people seriously may require us to ask whether a timetable designed for convenience is also one designed for learning.`, [
    C("blank1", 2, U.setsuzoku, "空所［ 1 ］に入る最も適切なものを選べ。", ["In addition", "On the contrary", "Nevertheless", "Otherwise"], [
      "正解。記憶・気分への影響に続けて、さらに危険でもあると影響をつけ加えている。",
      "on the contrary は前の内容を否定するときに使う。ここは影響を重ねている。",
      "nevertheless は「それにもかかわらず」で、前後が対立していない。",
      "otherwise は「さもなければ」で、意味が通らない。",
    ], "影響を並べて足すときは In addition", [
      ["流れ", "記憶 → 気分 → {{さらに}}危険。"],
      ["つなぎの語", "追加の {{In addition}}。"],
    ], K),
    WY("tr-a", "(A)", U.kandai, "その結果、多くの十代の若者は、体がまだ眠るようにと告げている時刻に、目を覚まして頭がはっきりした状態でいることを求められている。",
      jt("be required to do・an hour when SV（関係副詞）", ["求められ", "時刻"], "awake and alert・tell O to do", ["目を覚まし", "はっきり", "告げ"]),
      "関係副詞 when は時を表す名詞を説明する", [
        ["骨組み", "many teenagers {{are required to be}} awake and alert：「〜でいることを求められる」。"],
        ["関係副詞", "at {{an hour when}} their bodies are still telling them to sleep：「体がまだ眠れと言っている時刻に」。"],
      ]),
    WS("ex-f", "第3段落で述べられている睡眠不足の影響を三つ挙げて説明せよ。", 70,
      "学んだことを記憶しにくくなること、いらいらや不安を感じやすくなること、運転中に事故を起こしやすくなること。",
      ex(["記憶しにくくなること・気分（いらいら・不安）に影響することを書いている", ["記憶", "いらいら", "不安"]], ["（運転中に）事故を起こしやすくなることを書いている", ["事故"]]),
      "段落の中の Also・In addition が区切りの目印", [
        ["一つ目・二つ目", "students who sleep too little tend to {{remember less}}／{{irritable or anxious}}。"],
        ["三つ目", "tired teenage drivers are more likely to be involved in {{accidents}}。"],
      ]),
    WZ("tr-b", "(B)", "this", U.hikaku, "これまでの証拠からは、十代の若者が単に寝る時刻を遅らせて始業を遅くした利点を打ち消してしまうということは、心配されていたほど起こっていないことがうかがえる。調査された地区のほとんどの生徒は、増えた時間を眠ることに使ったのである。",
      jz("this ＝ 十代の若者がただ寝る時刻を遅らせ、利点を打ち消してしまうこと", ["寝る", "遅", "打ち消"], "happens less often than was feared「心配されていたほど起こらない」", ["ほど", "心配"]),
      "than was feared は「心配されていたより」", [
        ["指示語", "直前：teenagers will simply {{go to bed later, cancelling out any benefit}}。"],
        ["比較", "happens {{less often than was feared}}：than の後ろの主語は省略（it was feared）。"],
      ]),
    WE("en", "Why do many teenagers find it hard to get up early in the morning?",
      "Around puberty their internal clock shifts, so they naturally feel sleepy later at night, but school still starts early, which leaves many of them short of sleep.",
      ee(["思春期に体内時計がずれて夜遅くまで眠くならないことを書いている", ["clock", "later", "puberty"]], ["それでも学校が早く始まり、睡眠が足りなくなることを書いている", ["school", "early"]]),
      "生物学的な理由と学校の時刻の二つを組み合わせる", [
        ["生物学", "the body's {{internal clock shifts}} → {{feel sleepy later}}。"],
        ["学校", "School, however, usually {{begins early}}。"],
      ]),
    C("agree", 2, U.chobun, "本文の内容と一致するものを選べ。", [
      "Few schools that moved their starting time later have returned to the earlier time.",
      "The writer believes that teenagers' late nights are caused only by smartphones.",
      "Every school that started later saw clear improvements in attendance.",
      "Most students in the districts studied used the extra time to stay up later.",
    ], [
      "正解。第4段落 few have chosen to return to the earlier time に一致。",
      "スマートフォンや怠け心も一因かもしれないが、生物学的な要因もあると述べている。",
      "Not every school … has seen such clear results とあり、逆。",
      "used the extra time to sleep（眠ることに使った）。逆。",
    ], "only・every などの言い過ぎに注意", [
      ["正解の根拠", "{{few have chosen to return}} to the earlier time。"],
      ["誤りの根拠", "{{Not every school}} …・used the extra time {{to sleep}}。"],
    ]),
  ], [{ word: "puberty", meaning: "思春期" }, { word: "irritable", meaning: "いらいらしやすい" }]),
];

// =====================================================================
// 第3問　会話文の読解と自由英作文
//   どの節も 3問：空所の文選択(2)・空所の文選択(2)・自由英作文 50〜70語(3)
// =====================================================================

const CV_LEAD = "次の会話文を読み、下の問いに答えよ。";
/** 自由英作文の採点基準 (16点) */
const esRubric = (stance: string[]): Rb => [
  ["問いに正面から答え、賛否（立場）がはっきりしている", 4, stance],
  ["理由を二つ挙げ、具体例や説明で支えている", 6, ["First", "Second", "because", "For example"]],
  ["文法・語法・つづりの誤りが少ない", 4, []],
  ["語数（50〜70語）を守り、まとまりがある", 2, []],
];
const ES = (id: string, prompt: string, model: string, stance: string[], point: string, st: St[]): QuestionB =>
  W(id, 3, U.jiyu, `${prompt}（50〜70語の英語で）`, model, esRubric(stance), point, st, { min: 50, max: 70, unit: "語" }, 900);

const P3: ExamPoolSection[] = [
  wsec(3, "cv-volunteer", U.jiyu, "会話文と自由英作文（ボランティアの義務化）", CV_LEAD, {
    lang: "en",
    body: `Mika: Did you hear? Our school is thinking about making volunteer work a requirement for graduation.
Daniel: Really? How many hours would we have to do?
Mika: Twenty hours a year, apparently. Things like cleaning the park or helping at the community centre.
Daniel: ( 1 ) If you're forced to help others, is it really volunteering?
Mika: I see your point. But a lot of students would never try it unless the school pushed them a little. My cousin had to do it at her school, and now she helps at a children's library every weekend because she enjoyed it so much.
Daniel: That's great for her. ( 2 ) Some students already have part-time jobs or have to look after their younger brothers and sisters after school.
Mika: True. Maybe the school could let those students count that kind of work, too.
Daniel: That would be fairer. I'd still like to hear what the others think, though.`,
  }, [
    C("blank1", 2, U.chobun, "空所( 1 )に入る最も適切なものを選べ。", [
      "I'm not sure that makes sense.",
      "That sounds like a wonderful idea.",
      "I've already finished mine.",
      "The park is too far away.",
    ], [
      "正解。直後の「強制されて人を助けるのは本当にボランティアか」という疑問につながり、Mika の I see your point とも合う。",
      "賛成の返事では、直後の疑問の投げかけと合わない。",
      "まだ検討中の制度なので、すでに終えたというのは不自然。",
      "公園の遠さは、直後の「強制されたら本当にボランティアか」という論点と関係がない。",
    ], "空所の直後の文と、相手の返事の両方に合わせる", [
      ["直後", "If you're {{forced}} to help others, is it really volunteering? → 疑問・反対の立場。"],
      ["相手の返事", "Mika：{{I see your point}} → Daniel は反対意見を述べている。"],
    ]),
    C("blank2", 2, U.chobun, "空所( 2 )に入る最も適切なものを選べ。", [
      "But not everyone has free time to spare.",
      "So everyone should do the same thing.",
      "That's why I want to work at a library.",
      "She must be tired of it by now.",
    ], [
      "正解。直後の「アルバイトや弟妹の世話がある生徒もいる」が、その具体例になる。",
      "直後の文は、全員が同じことをすべきでない理由になっている。逆。",
      "Daniel が図書館で働きたいという話は出てこない。",
      "いとこは楽しんで続けているので、うんざりしているはずはない。",
    ], "空所の後ろが具体例なら、空所は一般的な主張", [
      ["直後", "Some students already have {{part-time jobs}} or have to {{look after}} …。"],
      ["主張", "それを一般化すると「{{自由な時間がない人もいる}}」。"],
    ]),
    ES("essay", "Mika と Daniel の会話をふまえて、「高校は生徒にボランティア活動を義務づけるべきだ」という意見に賛成か反対か、理由を二つ挙げて書け。",
      "I agree that high schools should require students to do some volunteer work. First, many students never try volunteering because they do not know where to start, and a requirement gives them a chance to discover activities they may enjoy. Second, helping in the community teaches responsibility and lets students meet people of different ages. However, schools should also count family care or part-time work.",
      ["I agree", "should require"], "立場→理由2つ→会話の論点への配慮で締める", [
        ["構成", "① 賛否 ② {{First}} … ③ {{Second}} … ④ 反対側の論点（時間がない生徒）への配慮。"],
        ["会話の活用", "Daniel の懸念（{{part-time jobs}}・家族の世話）に触れると、会話をふまえたことが伝わる。"],
      ]),
  ]),

  wsec(3, "cv-ai", U.jiyu, "会話文と自由英作文（宿題とAI）", CV_LEAD, {
    lang: "en",
    body: `Ken: I used an AI chatbot to check my English essay last night. It found so many mistakes.
Sara: Did it rewrite the whole essay for you?
Ken: No, I only asked it to point out grammar errors. Then I corrected them myself.
Sara: ( 1 ) My brother just copies whatever it produces and hands it in.
Ken: That's the problem, isn't it? The tool itself isn't good or bad. It depends on how you use it.
Sara: Maybe, but teachers can't see how we use it. ( 2 ) That's why some schools have banned it completely.
Ken: Banning it seems unrealistic to me. We'll probably be using these tools at work in the future anyway.
Sara: So you think schools should teach us how to use them properly?
Ken: Exactly. Pretending they don't exist won't help anyone.`,
  }, [
    C("blank1", 2, U.chobun, "空所( 1 )に入る最も適切なものを選べ。", [
      "That sounds like a sensible way to use it.",
      "Then you didn't learn anything at all.",
      "I've never made a grammar mistake.",
      "Your brother must be a good writer.",
    ], [
      "正解。自分で直した Ken の使い方を認め、直後で丸写しする弟の使い方と対比している。",
      "Ken は誤りを自分で直しており、何も学ばなかったとは言えない。直後の弟との対比とも合わない。",
      "自分の文法の話は、会話の流れと関係がない。",
      "弟の話はまだ出ておらず、丸写しする弟が文章がうまいという流れにはならない。",
    ], "直後の文との対比（Ken ↔ 弟）を読む", [
      ["Ken", "誤りの指摘だけを頼み、{{自分で直した}}。"],
      ["弟", "{{just copies}} whatever it produces → Ken の使い方は{{賢明}}。"],
    ]),
    C("blank2", 2, U.chobun, "空所( 2 )に入る最も適切なものを選べ。", [
      "They can only see the finished essay.",
      "They always know who used it.",
      "So they never give us homework.",
      "They use it more than we do.",
    ], [
      "正解。「先生は使い方が見えない。見えるのは完成した作文だけ」とつながり、禁止の理由になる。",
      "直前の can't see how we use it と矛盾する。",
      "宿題を出さないという話は出てこず、禁止の理由にもならない。",
      "先生のほうがよく使うことは、禁止の理由にならない。",
    ], "直前の主張を言いかえ、直後の That's why につなげる", [
      ["直前", "teachers {{can't see how we use it}}。"],
      ["直後", "{{That's why}} some schools have banned it → 見えるのは{{結果だけ}}だから。"],
    ]),
    ES("essay", "Ken と Sara の会話をふまえて、「生徒が宿題に AI のツールを使うことを認めるべきだ」という意見に賛成か反対か、理由を二つ挙げて書け。",
      "I think students should be allowed to use AI tools for homework, as long as they use them properly. First, AI can point out mistakes immediately, so students can learn from them without waiting for a teacher. Second, we will need these tools in our future jobs, and school is the best place to learn how to use them wisely. Simply banning them will not stop students from using them.",
      ["I think", "should be allowed"], "条件（as long as）で立場に幅をもたせる", [
        ["条件", "{{as long as they use them properly}}：Sara の懸念（丸写し）に答える。"],
        ["理由", "① すぐに誤りがわかる ② {{将来の仕事}}で必要。Ken の発言を自分のことばで使う。"],
      ]),
  ]),

  wsec(3, "cv-dorm", U.jiyu, "会話文と自由英作文（大学の寮か一人暮らしか）", CV_LEAD, {
    lang: "en",
    body: `Aya: I got a letter from the university today. First-year students can choose to live in the dormitory or find their own apartment.
Leo: Which are you going to choose?
Aya: I haven't decided yet. The dormitory is cheaper, and meals are included.
Leo: ( 1 ) You'd have to share a kitchen and bathrooms with lots of people.
Aya: That doesn't bother me much. Actually, I think it would be a good way to make friends quickly, since I won't know anyone in the city.
Leo: That's true. But there might be rules about what time you have to be back at night. ( 2 )
Aya: Hmm, I hadn't thought of that. I want to join a band, and practice might finish late.
Leo: Why don't you ask someone who lives there now?
Aya: Good idea. I'll send a message to the student office.`,
  }, [
    C("blank1", 2, U.chobun, "空所( 1 )に入る最も適切なものを選べ。", [
      "But wouldn't you miss having your own space?",
      "Then you should cook for yourself every day.",
      "I hear the apartments include meals, too.",
      "That's why the dormitory is so expensive.",
    ], [
      "正解。直後の「台所や浴室を大勢と共用」という寮の欠点の指摘につながる。",
      "寮では食事がつくので、毎日自炊すべきだという流れにならない。",
      "アパートにも食事がつくという話は、直後の共用の話とつながらない。",
      "寮は cheaper（安い）と言ったばかりなので矛盾する。",
    ], "直後の文が欠点なら、空所は懸念を示す", [
      ["直後", "You'd have to {{share}} a kitchen and bathrooms → 寮の{{欠点}}。"],
      ["選ぶ", "欠点を切り出す疑問 {{wouldn't you miss having your own space?}}。"],
    ]),
    C("blank2", 2, U.chobun, "空所( 2 )に入る最も適切なものを選べ。", [
      "That could be a problem if you join a club.",
      "So you'll have more free time in the evenings.",
      "That's the best part of dormitory life.",
      "Everyone in the city goes to bed early.",
    ], [
      "正解。帰寮時刻の規則が、部活動などに入ったときに困るという指摘。Aya が「バンドの練習が遅く終わるかも」と応じる。",
      "門限があることから、夜の自由な時間が増えるとは言えない。",
      "門限を最もよい点とするのは、But で始まる懸念の流れと合わない。",
      "町の人の就寝時刻は、寮の規則の話と関係がない。",
    ], "相手の返事（バンドの練習）から逆算する", [
      ["直前", "rules about what time you have to {{be back at night}}（門限）。"],
      ["直後", "Aya：practice might {{finish late}} → 活動に入ると{{困る}}。"],
    ]),
    ES("essay", "Aya と Leo の会話をふまえて、「大学1年生は一人暮らしよりも寮で暮らすほうがよい」という意見に賛成か反対か、理由を二つ挙げて書け。",
      "I agree that first-year students should live in a dormitory. First, it is much cheaper than renting an apartment, and meals are often included, so students can focus on their studies. Second, living with other students is a quick way to make friends, which is important for someone who has just moved to a new city. Rules about time may be strict, but students can discuss them with the staff.",
      ["I agree", "dormitory"], "反対側の論点（門限）に一言ふれて締める", [
        ["理由", "① {{費用}}と食事 ② {{友人}}ができやすい。会話の内容を自分のことばで使う。"],
        ["締め", "Leo の懸念（{{rules about time}}）に答えると、会話をふまえたことが伝わる。"],
      ]),
  ]),
];

// =====================================================================
// 第4問　和文英訳（日本文の下線部）
//   どの節も 2問：(1) 標準(2)・(2) やや難(3)
// =====================================================================

const TR_LEAD = "次の文章の下線部(1)(2)を英語に訳せ。";
/** 和文英訳の採点基準 (10点) */
const trRubric = (frame: string[], words: string[], content: string[]): Rb => [
  ["文の骨組み（構文・時制・語順）が正しい", 4, frame],
  ["語句の選び方・語法が適切", 3, words],
  ["内容にぬけ・つけ足しがない", 3, content],
];
const TR = (id: string, d: 2 | 3, label: string, model: string, also: string[], rb: Rb, point: string, st: St[]): QuestionB =>
  W(id, d, U.wabun, `下線部${label}を英語に訳せ。`, model, rb, point, st, undefined, 480, also);

const P4: ExamPoolSection[] = [
  wsec(4, "tr-dialect", U.wabun, "和文英訳（ふるさとのことば）", TR_LEAD, {
    lang: "ja",
    body: `大学に入って東京で暮らし始めたころ、私は自分の話し方が気になってしかたがなかった。{{(1) 友人たちは私の方言をおもしろがってくれたが、私は何か言うたびに笑われているような気がしていた。}}けれども、何年かたつうちに考えが変わった。{{(2) 生まれ育った土地のことばは、そこで暮らしてきた人々の記憶が詰まった、かけがえのない財産なのだと思うようになったのである。}}`,
  }, [
    TR("t1", 2, "(1)", "My friends found my dialect amusing, but I felt as if I were being laughed at every time I said something.",
      ["My friends enjoyed the way I spoke, but whenever I said anything, I felt that they were laughing at me."],
      trRubric(["but", "felt as if", "every time"], ["find O C", "dialect", "be laughed at"], ["おもしろがって", "何か言うたびに", "笑われている"]),
      "「〜するたびに」は every time / whenever", [
        ["骨組み", "My friends {{found my dialect amusing}}, but I {{felt as if}} I were being laughed at …。"],
        ["受け身の進行形", "笑われている＝ {{be being laughed at}}（laugh at の受け身）。"],
      ]),
    TR("t2", 3, "(2)", "I came to think that the language of the place where I was born and raised is an irreplaceable treasure, full of the memories of the people who have lived there.",
      ["I began to feel that the dialect of my hometown is a precious asset that holds the memories of those who have lived in that area."],
      trRubric(["came to think that", "the place where"], ["irreplaceable", "be born and raised", "full of"], ["生まれ育った土地", "記憶が詰まった", "かけがえのない"]),
      "「〜するようになる」は come to do", [
        ["骨組み", "{{I came to think that}} S is a treasure：思うようになった＝ come to think。"],
        ["名詞の説明", "土地＝ {{the place where I was born and raised}}、記憶が詰まった＝ {{full of the memories of}} …。"],
      ]),
  ]),

  wsec(4, "tr-rain", U.wabun, "和文英訳（雨の日の楽しみ）", TR_LEAD, {
    lang: "ja",
    body: `子どものころ、私は雨の日が嫌いだった。外で遊べないからである。{{(1) ところが大人になってみると、雨の音を聞きながら家で本を読む時間ほど心が落ち着くものはないと感じるようになった。}}雨そのものは少しも変わっていない。{{(2) 同じ出来事でも、見方を少し変えるだけで、まったく違った意味をもつことがあるのだろう。}}`,
  }, [
    TR("t1", 2, "(1)", "Now that I have grown up, however, I have come to feel that nothing calms me more than reading a book at home while listening to the sound of the rain.",
      ["As an adult, however, I feel that there is nothing more relaxing than spending time reading at home as I listen to the rain."],
      trRubric(["nothing … more than", "have come to feel"], ["calm", "while listening to", "the sound of the rain"], ["大人になって", "家で本を読む", "落ち着く"]),
      "「AほどBなものはない」は nothing is more B than A", [
        ["比較", "{{nothing calms me more than}} reading …：最上級の意味を否定＋比較級で。"],
        ["付帯", "雨の音を聞きながら＝ {{while listening to the sound of the rain}}。"],
      ]),
    TR("t2", 3, "(2)", "Perhaps even the same event can take on a completely different meaning if we change the way we look at it just a little.",
      ["Even the same experience may mean something entirely different when we look at it from a slightly different angle."],
      trRubric(["can", "if we change"], ["take on a meaning", "the way we look at it", "just a little"], ["同じ出来事でも", "見方を少し変える", "まったく違った意味"]),
      "「〜だけで」は just / only を動詞句にそえる", [
        ["骨組み", "{{Even the same event can take on}} a completely different meaning：「〜こともある」は can。"],
        ["条件", "見方を少し変えるだけで＝ if we change {{the way we look at it}} {{just a little}}。"],
      ]),
  ]),

  wsec(4, "tr-map", U.wabun, "和文英訳（道をたずねる）", TR_LEAD, {
    lang: "ja",
    body: `最近は、知らない町を歩くときもスマートフォンの地図があれば迷うことはほとんどない。{{(1) しかし、道に迷わなくなった代わりに、私たちは地元の人に道を尋ねる機会を失ってしまったのではないだろうか。}}以前、旅先で道を尋ねたとき、その人は目的地まで一緒に歩いてくれた。{{(2) あのとき交わした短い会話は、どの名所よりも強く記憶に残っている。}}`,
  }, [
    TR("t1", 2, "(1)", "However, I wonder if, in exchange for no longer getting lost, we have lost the chance to ask local people the way.",
      ["But although we no longer lose our way, perhaps we have lost the opportunity to ask people who live there for directions."],
      trRubric(["I wonder if", "have lost", "in exchange for"], ["no longer", "ask O the way", "local people"], ["道に迷わなくなった", "代わりに", "機会を失って"]),
      "「〜ではないだろうか」は I wonder if", [
        ["問いかけ", "{{I wonder if}} we have lost …：現在完了で「失ってしまった」。"],
        ["代償", "迷わなくなった代わりに＝ {{in exchange for no longer getting lost}}。"],
      ]),
    TR("t2", 3, "(2)", "The short conversation we had then has stayed in my memory more vividly than any of the famous sights.",
      ["I remember the brief conversation we had at that time more clearly than any famous place I visited."],
      trRubric(["has stayed", "more … than any"], ["the conversation we had", "vividly", "famous sights"], ["交わした短い会話", "どの名所よりも", "記憶に残って"]),
      "「どの〜よりも」は比較級＋than any (other)", [
        ["主語", "交わした短い会話＝ {{the short conversation we had then}}（関係詞の省略）。"],
        ["比較", "{{more vividly than any of the famous sights}}：名所と会話は別物なので other は不要。"],
      ]),
  ]),
];

// =====================================================================

export const U_TOHOKU_EIGO: UnivExam = {
  key: "tohoku-eigo",
  univ: "東北大学",
  kamoku: "英語",
  tier: "国公立",
  order: 114,
  basis: "前期日程の全学部共通の問題の傾向を参考（配点は200点に換算）",
  format: "大問4題・100分・200点・全問記述。論説の長文2題（空所・下線部和訳・内容説明・英語での説明・内容一致）、会話文と賛否を述べる自由英作文、日本文の下線部の和文英訳。",
  minutes: 100,
  groups: ["語彙", "文法", "技能"],
  sections: [
    { title: "第1問　長文読解（社会・文化の論説）", lead: READ_LEAD, count: [6, 6], mix: [0, 0.5, 0.5], points: 60, prefer: "material", poolTag: "tohoku-eigo:1" },
    { title: "第2問　長文読解（科学・行動の論説）", lead: READ_LEAD, count: [6, 6], mix: [0, 0.5, 0.5], points: 60, prefer: "material", poolTag: "tohoku-eigo:2" },
    { title: "第3問　会話文と自由英作文", lead: CV_LEAD, count: [3, 3], mix: [0, 0.5, 0.5], points: 40, prefer: "material", poolTag: "tohoku-eigo:3" },
    { title: "第4問　和文英訳", lead: TR_LEAD, count: [2, 2], mix: [0, 0.5, 0.5], points: 40, prefer: "material", poolTag: "tohoku-eigo:4" },
  ],
  pool: [...P1, ...P2, ...P3, ...P4],
};
