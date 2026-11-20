import type { UnivExam } from "./types";
import type { ExamPoolSection } from "../pool/types";
import type { QuestionB, Skill, SolutionStep } from "@/lib/moshi/types";

// 名古屋大学型 英語（国公立・2次試験）。文系学部の個別学力検査の傾向を参考にした形式（英文・和文・設問はすべて書き下ろし）。
//   105分・大問4題。I 長文読解（人文・社会の論説：下線部和訳・内容説明（日本語）・空所・文の挿入・内容一致）、
//   II 長文読解（科学・研究の論説：和訳・字数指定の説明・英語の抜き出し・段落の内容・内容一致）、
//   III 会話文（空所補充・語句の意味・内容理解・空所に入る英文の記述・会話をふまえた意見の英作文（30〜50語））、
//   IV 資料（表）を読んで書く英作文（傾向と例外の説明・利点と欠点）。
//   配点は学部で異なるため、ここでは200点満点に換算している。
//   英文の題材・登場する町や人物・表の数字はすべて架空。実在の人物の発言は使っていない。
// 参考:
//   https://www.nagoya-u.ac.jp/admissions/exam/upload/5_r8ito_kaitorei_eng_1.pdf （公式の出題意図・解答例：I・II 学術的な長文、III 対話文＋約40語の意見英作文、IV グラフを読んで説明・利点と欠点の英作文）
//   https://www.nagoya-u.ac.jp/admissions/exam/upload/R3kaitourei_eigo.pdf （公式の出題意図：下線部和訳・日本語の要約・選択、会話文の英作文、グラフの傾向と例外を説明する英作文）
//   https://jyuke-labo.com/daigakujyukentaisaku/nagoyadaigaku/eigo/ （105分・大問4題。長文2題・対話文・自由英作文。自由英作文は30〜50語程度が多い）

const U = {
  chobun: "h-eng-skill-chobun",
  jiyu: "h-eng-skill-jiyu",
  vocab: "h-eng-vocab-2000",
  jukugo: "h-eng-vocab-jukugo",
  kaiwa: "h-eng-vocab-kaiwa",
  setsuzoku: "h-eng-gram-setsuzokushi",
  kandai: "h-eng-gram-kandai",
  zenchishi: "h-eng-gram-zenchishi",
  tokushu: "h-eng-gram-tokushu",
  hikaku: "h-eng-gram-hikaku",
  kateiho: "h-eng-gram-kateiho",
  judo: "h-eng-gram-judo",
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

/** 記述 (和訳・内容説明・英文の記述・英作文) */
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

/** 本文からの抜き出し (英語) */
function T(id: string, difficulty: 1 | 2 | 3, unit: string, prompt: string, accept: string[], point: string, st: St[]): QuestionB {
  return { id, type: "B", difficulty, points: 5, seconds: 150, skill: S, unit, prompt, answer: { kind: "term", accept, script: "any", chars: accept[0].length }, point, steps: steps(st) };
}

type Mat =
  | { kind: "passage"; lang: "ja" | "en"; title?: string; body: string; notes?: { word: string; meaning: string }[] }
  | { kind: "table"; caption: string; head: string[]; rows: string[][]; source?: string };

function sec(tag: number, id: string, unit: string, title: string, lead: string, material: Mat[], questions: QuestionB[], pick: number, style: "reading" | "writing"): ExamPoolSection {
  return {
    unit,
    tag: `nagoya-eigo:${tag}`,
    section: {
      id: `nagoya-en-${id}`,
      title,
      lead,
      style,
      examOnly: true,
      material,
      pick,
      questions,
    },
  };
}

/** 英文和訳の採点基準 (10点) */
const jtRubric = (frame: string, fk: string[], word: string, wk: string[]): Rub => [
  [`構文の把握：${frame}`, 4, fk],
  [`語句の訳：${word}`, 3, wk],
  ["日本語として自然で、訳しもれ・つけ足しがない", 3, []],
];
const JT = (id: string, d: 2 | 3, label: string, model: string, rub: Rub, point: string, st: St[], unit: string = U.chobun, extra = ""): QuestionB =>
  Wr(id, d, unit, `下線部${label}を${extra}日本語に訳せ。`, undefined, model, rub, point, st, 360);

/** 内容説明 (日本語) の採点基準 (9点) */
const exRubric = (a: [string, string[]], b: [string, string[]]): Rub => [
  [a[0], 4, a[1]],
  [b[0], 3, b[1]],
  ["字数の条件を守り、日本語として筋が通っている", 2, []],
];
const EX = (id: string, d: 2 | 3, prompt: string, max: number, model: string, rub: Rub, point: string, st: St[]): QuestionB =>
  Wr(id, d, U.chobun, `${prompt}（${max}字以内の日本語で）`, { max, unit: "字" }, model, rub, point, st, 300);

const INSERT_OPTS = ["［ア］", "［イ］", "［ウ］", "［エ］"];

// =====================================================================
// 第1問　長文読解（人文・社会の論説）
//   7問から6問。難易度の並び：和訳2・和訳3・説明3・空所2・挿入2・内容2・一致3
// =====================================================================

const READ_LEAD = "次の英文を読み、下の問いに答えよ。";

const P1: ExamPoolSection[] = [
  sec(1, "r1-craft", U.chobun, "長文読解（職人の技の継承）", READ_LEAD, [{
    kind: "passage",
    lang: "en",
    title: "Learning a Craft Without Words",
    body: `In the mountain village of Orvel, there is a small workshop where wooden bowls have been turned on a lathe by the same family for five generations. When a visitor once asked the present owner, a woman in her sixties, how she had learned the trade, she laughed and said that nobody had ever really taught her. She had simply spent years sweeping the floor, sharpening tools and watching. {{(A) Only after she had swept that floor for almost three years was she allowed to touch a piece of wood that would actually be sold.}}

To many people today, this sounds like a waste of time. If a skill is worth passing on, why not write it down? Modern training courses divide a task into steps, explain each one clearly and test whether the learner can repeat it. ［ア］ This approach works well for many things. But researchers who study traditional crafts point out that a large part of what a skilled worker knows cannot be put into words. ［イ］ A potter can tell from the sound of the wheel whether the clay is too wet; a carpenter knows from the feel of a plane when the blade needs sharpening. {{(B) Such knowledge lives in the hands and ears rather than in the head, and the expert is often unaware of possessing it until something goes wrong.}}

This is why long periods of watching are not as wasteful as they seem. An apprentice who observes the same movements thousands of times is gradually [ 1 ] the rhythm of the work, including countless small adjustments that the master would never think of mentioning. ［ウ］ When the apprentice finally picks up the tools, much of the learning has already taken place.

Nevertheless, this way of passing on skills is under serious threat. In many countries, workshops like the one in Orvel are closing because young people are unwilling to spend years earning little money before they are trusted with real work. Once the last master in a region retires, knowledge that took centuries to accumulate can disappear within a single generation. ［エ］ Some governments have responded by filming experts at work, hoping that video will preserve what books cannot.

Such recordings are valuable, but they have limits. A video shows what a master's hands do; it does not show what she notices, or why she decides to stop at a particular moment. The workshop owner in Orvel has her own solution. She now accepts students for short stays and, instead of explaining, asks them questions while they work: What do you hear? What does the wood feel like now? {{(C) Her aim is not to hand over her knowledge but to help each student develop the kind of attention that produced it in the first place.}}`,
    notes: [{ word: "lathe", meaning: "旋盤（ろくろ）" }, { word: "apprentice", meaning: "弟子・見習い" }, { word: "plane", meaning: "かんな" }],
  }], [
    JT("tr-a", 2, "(A)", "彼女はその床をほぼ3年間掃き続けて、はじめて、実際に売られることになる木材に触れることを許された。",
      jtRubric("Only after SV＋倒置（was she allowed）「～してはじめて…」", ["はじめて", "てから"], "be allowed to・would actually be sold", ["許され", "売られる"]),
      "Only＋副詞節が文頭に出ると倒置が起こる", [
        ["倒置", "{{Only after she had swept …}} が文頭 → 主節が {{was she allowed}} と疑問文の語順になる。"],
        ["訳し方", "only after ～ は「～してはじめて」。a piece of wood that {{would actually be sold}}＝「実際に売られる（ことになる）木材」。"],
      ], U.tokushu),
    JT("tr-b", 3, "(B)", "そうした知識は頭の中よりもむしろ手や耳に宿っており、熟練者は、何かがうまくいかなくなるまで、自分がそれを持っていることに気づいていないことが多い。",
      jtRubric("A rather than B「BよりむしろA」・be unaware of doing", ["よりも", "むしろ", "気づいていない"], "lives in・possessing it・until something goes wrong", ["宿", "持っている", "うまくいかなく"]),
      "A rather than B の A・B は同じ形（前置詞句）", [
        ["比較", "lives {{in the hands and ears rather than in the head}}：「頭よりもむしろ手や耳に宿る」。"],
        ["動名詞", "unaware of {{possessing it}}：it は such knowledge。「それを持っていることに気づいていない」。"],
      ], U.hikaku),
    EX("ex-c", 3, "下線部(C)で、工房の主がめざしていることを、彼女の教え方にふれながら具体的に説明せよ。", 70,
      "知識をことばで説明して渡すのではなく、作業中に音や手ざわりを問いかけ、熟練の知識を生んだような注意力を生徒自身が育てられるよう助けること。",
      exRubric(["知識を説明して渡すのではない／作業中に問いかけるという教え方を書いている", ["説明", "問いかけ", "質問"]], ["生徒自身が（知識を生んだ）注意力を育てることを書いている", ["注意", "自身", "育て"]]),
      "not A but B の B が目的の中心", [
        ["教え方", "instead of explaining, {{asks them questions while they work}}：What do you hear? など。"],
        ["目的", "{{not to hand over her knowledge but to help each student develop the kind of attention}}：知識そのものではなく、それを生んだ「注意力」。"],
      ]),
    C("blank1", 2, U.vocab, "空所［ 1 ］に入る最も適切なものを選べ。", ["absorbing", "ignoring", "forgetting", "explaining"], 0, [
      "正解。何千回も同じ動きを見るうちに、仕事のリズムを少しずつ「吸収している」。次の文「道具を手にするころには学びの多くがすでに起きている」と合う。",
      "見ているうちにリズムを「無視する」では、長く見ることがむだではないという段落の主張と逆になる。",
      "「忘れている」では、学びがすでに起きているという次の文と食いちがう。",
      "見習いが「説明している」のではない。説明しないのは師匠の側。",
    ], "段落の主張（見ることはむだでない）に合う語", [
      ["段落の主張", "long periods of watching are {{not as wasteful as they seem}}。"],
      ["語を選ぶ", "見るうちにリズムを{{吸収している}}（absorbing）→ 学びはすでに起きている。"],
    ], K),
    C("insert", 2, U.chobun, "次の英文を本文に入れるとき、最も適切な位置を［ア］～［エ］から選べ。\nThe loss is not only of products but of a way of seeing.", INSERT_OPTS, 3, [
      "［ア］の後ろは「この方法は多くのことにうまくいく」で、何かが失われる話はまだ出ていない。",
      "［イ］の後ろは陶工や大工の具体例で、loss を受ける内容がない。",
      "［ウ］は見習いが学ぶ過程の話で、失われるものの話ではない。",
      "正解。直前の「最後の師匠が引退すると、何世紀もかけて積み上げた知識が一世代で消えうる」を The loss が受け、失われるのは製品だけでなく「ものの見方」だと述べる。",
    ], "挿入文の名詞（The loss）が受ける内容をさがす", [
      ["手がかり", "{{The loss}}：定冠詞つき → 直前に「失われる」話がある。"],
      ["位置", "直前：knowledge … can {{disappear within a single generation}} → ［エ］。"],
    ]),
    C("approach", 2, U.chobun, "第2段落の This approach が指すものとして最も適切なものを選べ。", [
      "作業を段階に分け、一つずつ明確に説明し、学ぶ人がくり返せるかを確かめる教え方",
      "何年も床を掃き、道具を研ぎながら師匠の仕事を見て覚える教え方",
      "熟練者の仕事を映像に記録して残すやり方",
      "作業中の生徒に、音や手ざわりについて問いかける教え方",
    ], 0, [
      "正解。直前の文 Modern training courses divide a task into steps, explain each one clearly and test whether the learner can repeat it を指す。",
      "これは第1段落の工房の主の修業のしかたで、This approach と対比される側。",
      "映像の記録は第4段落の話で、まだ出てきていない。",
      "問いかけは第5段落の工房の主のやり方。",
    ], "this は直前の文の内容を指す", [
      ["指す内容", "直前：{{divide a task into steps, explain each one clearly and test …}}。"],
      ["対比", "この方法は多くのことに有効だが、{{ことばにできない知識}}がある、と But で続く。"],
    ]),
    C("agree", 3, U.chobun, "本文の内容と一致するものを選べ。", [
      "The writer suggests that video recordings cannot fully show what a skilled worker pays attention to.",
      "The owner of the workshop in Orvel was given detailed instructions by her parents.",
      "According to the passage, young people are closing workshops because they prefer modern machines.",
      "The writer believes that traditional crafts can be learned most efficiently from books.",
    ], 0, [
      "正解。第5段落 A video shows what a master's hands do; it does not show what she notices に一致。",
      "第1段落で、だれも本当には教えてくれなかった（nobody had ever really taught her）と言っている。",
      "工房が閉じるのは、若者が何年も低い収入で働くことを望まないからで、機械を好むからではない。",
      "第4段落の video will preserve what books cannot から、本ではとらえきれないと考えていることがわかる。",
    ], "本文にない理由（prefer modern machines）に注意", [
      ["正解の根拠", "it does {{not show what she notices}}, or why she decides to stop。"],
      ["誤りの根拠", "{{nobody had ever really taught her}}・young people are {{unwilling to spend years earning little money}}。"],
    ]),
  ], 6, "reading"),

  sec(1, "r1-colour", U.chobun, "長文読解（色の見え方の文化差）", READ_LEAD, [{
    kind: "passage",
    lang: "en",
    title: "Is Blue the Same Everywhere?",
    body: `If you ask a group of people to name the colours of a rainbow, their answers may depend on where they grew up. Many languages make distinctions that English speakers rarely think about, while others combine colours that English treats as clearly separate. In some languages, for example, a single word covers both green and blue, so the colour of a traffic light that means "go" is described with the same word as the sky. {{(A) This does not mean that speakers of such languages are unable to tell the two colours apart, any more than English speakers are unable to tell light blue from dark blue.}}

Still, the words we have may affect how quickly and how easily we notice differences. ［ア］ In one type of experiment, people are shown three coloured squares and asked which one is different from the other two. When the odd square falls under a different colour word in the participant's language, it tends to be found a little faster. ［イ］ The effect is small, measured in fractions of a second, but it appears consistently. Interestingly, it is stronger when the squares appear on the right side of the viewer's field of vision, which is handled mainly by the left half of the brain, where much of language processing takes place.

Culture also shapes which colour differences people care about. ［ウ］ Communities whose way of life depends on cattle, for instance, may have an unusually rich vocabulary for the colours and patterns of animal skins, because these distinctions matter in everyday trade. Painters, dyers and designers develop a similar sensitivity through years of training. {{(B) What counts as an obvious difference to one group may be hardly worth mentioning to another.}}

The history of colour words points in the same direction. Words for black, white and red seem to appear early in many languages, while words for blue often arrive much later. One possible reason is that blue objects were rare in the surroundings of early communities, and blue dyes were difficult to [ 1 ]. A word tends to be created when people need to talk about something often. ［エ］

None of this suggests that each culture lives in a completely separate world of colour. The human eye works in much the same way everywhere, and people from very different backgrounds agree remarkably well when asked to choose the best example of red or green. Language and culture do not change what we are able to see; {{(C) they influence what we pay attention to, which differences we find worth naming, and therefore how easily we can share what we see with others.}}`,
    notes: [{ word: "dyer", meaning: "染め物職人" }, { word: "field of vision", meaning: "視野" }],
  }], [
    JT("tr-c", 2, "(C)", "言語と文化は、私たちが何に注意を向けるか、どの違いに名前をつける価値があると思うか、そしてそれゆえに、自分が見ているものをどれほど容易に他人と共有できるかに影響を与えるのである。",
      jtRubric("influence の目的語の間接疑問3つ（what … / which differences … / how easily …）", ["何に", "どの違い", "どれほど"], "pay attention to・find worth naming・therefore", ["注意", "価値", "それゆえ", "したがって"]),
      "and でつながる3つの名詞節を見ぬく", [
        ["主語", "they＝{{language and culture}}（直前の主語）。訳では「言語と文化は」と明らかにする。"],
        ["目的語", "influence ［{{what}} …］,［{{which differences}} …］, and therefore ［{{how easily}} …］：3つの間接疑問。"],
      ], U.kandai, "they の内容を明らかにして"),
    JT("tr-a", 3, "(A)", "このことは、そのような言語の話し手が二つの色を見分けられないということではない。それは英語の話し手が明るい青と暗い青を見分けられないわけではないのと同じである。",
      jtRubric("not A any more than B「Bでないのと同様にAでない」", ["と同じ", "同様"], "tell A apart・tell A from B", ["見分け", "区別"]),
      "not … any more than ～＝～でないのと同じく…でない", [
        ["構文", "This does {{not}} mean that A {{any more than}} B：B（英語話者が明るい青と暗い青を見分けられない）が「ありえない」ことを基準に A も否定。"],
        ["語句", "{{tell the two colours apart}}＝二つの色を見分ける。tell A from B も同じ意味。"],
      ], U.hikaku),
    EX("ex-b", 3, "下線部(B)の具体例として本文で挙げられていることを一つ選び、どのような違いがなぜ重視されるのかを説明せよ。", 60,
      "牛に頼って暮らす共同体では、日々の取り引きで重要なので、動物の皮の色や模様を区別する語彙がとても豊かになる。",
      exRubric(["牛に頼る共同体（または画家・染色家・デザイナー）の例を正しく挙げている", ["牛", "画家", "染", "デザイナー"]], ["その違いが重視される理由（取り引きで重要・訓練）を書いている", ["取り引き", "取引", "訓練"]]),
      "抽象的な一文は直前の具体例とセットで読む", [
        ["具体例", "{{Communities whose way of life depends on cattle}} → 動物の皮の色や模様の語彙が豊か。"],
        ["理由", "because these distinctions {{matter in everyday trade}}。画家なども {{through years of training}}。"],
      ]),
    C("blank1", 2, U.vocab, "空所［ 1 ］に入る最も適切なものを選べ。", ["produce", "avoid", "waste", "notice"], 0, [
      "正解。青い物が自然の中に少なく、青い染料も「作る」のが難しかった → 青について話す必要が少なく、語ができるのが遅れた。",
      "染料を「避ける」のが難しい、では青の語が遅れて現れた理由にならない。",
      "染料を「むだにする」のが難しい、では意味が通らない。",
      "染料に「気づく」のが難しい、は不自然で、次の文（話す必要があるとき語ができる）にもつながらない。",
    ], "and でつながる2つの理由は同じ方向", [
      ["並ぶ理由", "blue objects were {{rare}}, and blue dyes were {{difficult to ＿}}：どちらも青が身近でなかった理由。"],
      ["語を選ぶ", "青い染料は{{作る}}（produce）のが難しかった。"],
    ], K),
    C("insert", 2, U.chobun, "次の英文を本文に入れるとき、最も適切な位置を［ア］～［エ］から選べ。\nBefore cheap dyes became available, few people would ever have needed to describe a blue object.", INSERT_OPTS, 3, [
      "［ア］は実験の話の前で、染料の話はまだ出ていない。",
      "［イ］は実験の結果の説明の途中で、染料とは関係がない。",
      "［ウ］は文化によって重視する違いが変わるという話の始まりで、青い物の話につながらない。",
      "正解。直前の「人はよく話す必要があるものに語をつくる」と、青い染料が作りにくかったことを受け、「安い染料が出回るまで青い物を描写する必要はほとんどなかった」と結ぶ。",
    ], "挿入文のキーワード（dyes・blue）が出る段落をさがす", [
      ["手がかり", "{{dyes}}・{{blue object}} → 第4段落の青の語の歴史。"],
      ["位置", "直前：A word tends to be created when people {{need to talk about something often}} → ［エ］。"],
    ]),
    C("experiment", 2, U.chobun, "第2段落の実験の結果として本文の内容に合うものを選べ。", [
      "仲間外れの四角が自分の言語で別の色の名前に入るとき、それはやや早く見つけられる。",
      "同じ色の名前に入る四角は、別の名前に入る四角より早く見つけられる。",
      "効果は大きく、数秒の差になって現れる。",
      "視野の左側に四角が出たときに、効果がもっとも強くなる。",
    ], 0, [
      "正解。When the odd square falls under a different colour word …, it tends to be found a little faster に一致。",
      "早く見つかるのは「別の名前」に入るときで、逆。",
      "measured in fractions of a second（1秒未満で測られる）とあり、効果は小さい。",
      "効果が強いのは視野の右側に出たとき（言語を扱う脳の左半分が処理する）。",
    ], "比較の向き（faster）と条件（different word）を確かめる", [
      ["根拠", "falls under {{a different colour word}} → found {{a little faster}}。"],
      ["誤りの根拠", "効果は {{small, measured in fractions of a second}}・強いのは {{right side}}。"],
    ]),
    C("agree", 3, U.chobun, "本文の内容と一致するものを選べ。", [
      "The writer argues that language and culture affect what people notice, though not what their eyes can detect.",
      "The writer claims that people from different cultures cannot agree on the best example of a colour.",
      "According to the passage, words for blue usually appear earlier than words for red.",
      "Speakers of languages with one word for green and blue cannot see the difference between them.",
    ], 0, [
      "正解。最終段落 Language and culture do not change what we are able to see; they influence what we pay attention to に一致。",
      "最終段落で、背景のちがう人々も最もよい赤や緑の例についておどろくほど一致すると述べている。",
      "第4段落で、黒・白・赤の語が早く、青の語はずっと遅れて現れるとある。",
      "第1段落の下線部(A)で、見分けられないということではないと述べている。",
    ], "筆者の結論は最終段落のセミコロンの前後", [
      ["正解の根拠", "do {{not change what we are able to see}}; they {{influence what we pay attention to}}。"],
      ["誤りの根拠", "{{agree remarkably well}}・blue {{often arrive much later}}。"],
    ]),
  ], 6, "reading"),

  sec(1, "r1-time", U.chobun, "長文読解（標準時と鉄道）", READ_LEAD, [{
    kind: "passage",
    lang: "en",
    title: "When Every Town Kept Its Own Time",
    body: `Today we take it for granted that everyone in a country, or at least in a large region, shares the same time. Two hundred years ago this was not the case. Each town set its clocks by the sun, declaring noon to be the moment when the sun stood highest in the sky. Because the sun reaches that point slightly later as one travels west, a town a hundred kilometres to the west of another kept a time several minutes behind it. {{(A) For most people this caused no difficulty at all, since few of them ever travelled far enough or fast enough for the difference to matter.}}

The railway changed everything. ［ア］ A train that left one city at ten o'clock and arrived at another two hours later might, according to the local clocks, appear to have taken two hours and five minutes, or one hour and fifty-five. Timetables became extremely confusing, and some stations displayed two clocks side by side, one showing local time and the other showing the time used by the railway company. ［イ］ Passengers missed connections, and, more seriously, the risk of collisions increased when trains on the same line followed different times.

The solution, adopted first by railway companies and later by governments, was to divide the land into zones, each sharing a single standard time. ［ウ］ This was not accepted everywhere without protest. In some towns, people complained that the clock no longer told the truth about the sun, and a few local clocks continued to show the old time for years. {{(B) To them, standard time seemed to replace something natural with something invented for the convenience of distant businesses.}}

Their complaint was not entirely unreasonable. Standard time is indeed a social agreement rather than a fact of nature. Its value lies precisely in the fact that it is shared: a clock is useful [ 1 ] it agrees with other clocks. ［エ］ Once millions of people organize their working days, school hours and broadcasts around the same numbers, the agreement becomes so deeply built into daily life that it begins to feel natural.

The story of standard time offers a lesson that applies to many modern systems, from units of measurement to the technical rules that allow computers to communicate. {{(C) Arrangements that once seemed strange and even threatening can, within a few generations, become so familiar that people forget they were ever chosen.}} Remembering that they were chosen reminds us that they could, if necessary, be chosen again.`,
    notes: [{ word: "collision", meaning: "衝突" }, { word: "standard time", meaning: "標準時" }],
  }], [
    JT("tr-a", 2, "(A)", "たいていの人にとって、このことはまったく何の問題も生まなかった。というのも、その違いが問題になるほど遠くへ、あるいは速く旅をする人は、ほとんどいなかったからである。",
      jtRubric("since SV（理由）・形容詞／副詞＋enough for O to do", ["から", "ほど"], "few of them・matter", ["ほとんどいなかった", "問題になる", "重要"]),
      "enough for O to do は「Oが～するほど」", [
        ["理由", "{{since}} few of them ever travelled …：since は「～なので」。few は「ほとんど～ない」と否定的に。"],
        ["程度", "far enough or fast enough {{for the difference to matter}}：「その違いが問題になるほど遠く・速く」。"],
      ], U.setsuzoku),
    JT("tr-c", 3, "(C)", "かつては奇妙で、脅威にさえ思われた取り決めも、数世代のうちに、それがそもそも選ばれたものだということを人々が忘れてしまうほどなじみ深いものになりうる。",
      jtRubric("so … that SV「とても…なので～／～するほど…」・関係詞節つきの主語", ["ほど", "ので"], "threatening・within a few generations・were ever chosen", ["脅威", "数世代", "選ばれた"]),
      "長い主語（関係詞節つき）と so … that を見ぬく", [
        ["主語", "{{Arrangements that once seemed strange and even threatening}}：that は主格の関係代名詞。"],
        ["構文", "can … become {{so familiar that}} people forget they were {{ever}} chosen：ever は「そもそも・かつて」と強める。"],
      ], U.setsuzoku),
    EX("ex-b", 3, "下線部(B)のように人々が感じたのはなぜか。本文に即して説明せよ。", 60,
      "太陽の位置で決めていた町の時刻が、遠くの鉄道会社などの都合で人為的に定めた共通の時刻に置きかえられたから。",
      exRubric(["もとの時刻が太陽にもとづく自然なものだったことを書いている", ["太陽", "自然"]], ["標準時が遠くの企業（鉄道会社）の都合で人為的に定められたと感じたことを書いている", ["都合", "企業", "鉄道", "人為", "作られた"]]),
      "natural と invented を本文で言いかえる", [
        ["自然なもの", "{{set its clocks by the sun}}：太陽がもっとも高いときを正午にしていた。"],
        ["作られたもの", "{{invented for the convenience of distant businesses}}：鉄道会社が始めた区域ごとの時刻。"],
      ]),
    C("blank1", 2, U.setsuzoku, "空所［ 1 ］に入る最も適切なものを選べ。", ["only when", "even if", "unless", "although"], 0, [
      "正解。標準時の価値は共有されることにある → 時計は「ほかの時計と一致するときにだけ」役に立つ。",
      "「一致していても役に立つ」では、共有されることに価値があるという前半とつながらない。",
      "「一致しないかぎり役に立つ」では意味が逆になる。",
      "「一致しているけれども役に立つ」では、譲歩の関係にならない。",
    ], "コロンの後ろは前半の言いかえ", [
      ["前半", "Its value lies precisely in the fact that {{it is shared}}。"],
      ["言いかえ", "a clock is useful {{only when}} it agrees with other clocks：一致してはじめて役に立つ。"],
    ], K),
    C("insert", 2, U.chobun, "次の英文を本文に入れるとき、最も適切な位置を［ア］～［エ］から選べ。\nA clock that shows the 'true' time of one town but disagrees with every other clock is of little use to a traveller.", INSERT_OPTS, 3, [
      "［ア］の直後に鉄道の時刻の混乱の具体例が続き、ここで旅行者に役立たない時計を言うのは早すぎる。",
      "［イ］は乗客が乗りかえに失敗する話の前で、つながらなくはないが、「ほかの時計と一致しない」ことの価値の話はまだ出ていない。",
      "［ウ］は標準時が導入されたことと抗議の話の間で、合わない。",
      "正解。直前の「時計はほかの時計と一致するときにだけ役に立つ」を、旅行者の例で具体的に言いかえている。",
    ], "挿入文が直前の一般論の具体化になる位置", [
      ["手がかり", "{{disagrees with every other clock}} is {{of little use}}：一致しない時計は役に立たない。"],
      ["位置", "直前：a clock is useful only when {{it agrees with other clocks}} → ［エ］。"],
    ]),
    C("railway", 2, U.chobun, "第2段落で、鉄道によって町ごとの時刻が問題になった理由として本文の内容に合うものを選べ。", [
      "町ごとに時刻がちがうため、時刻表がわかりにくくなり、同じ線路の列車が衝突する危険も高まったから。",
      "鉄道会社が駅の時計を一つにするよう町に命じたから。",
      "列車が速すぎて、乗客が時計を合わせる時間がなかったから。",
      "駅に時計がなく、乗客が出発の時刻を知ることができなかったから。",
    ], 0, [
      "正解。Timetables became extremely confusing と the risk of collisions increased when trains on the same line followed different times に一致。",
      "駅によっては二つの時計を並べていた。町に命令したという記述はない。",
      "乗客が時計を合わせる時間の話はない。",
      "駅には二つの時計が並んでいたとあり、時計がなかったのではない。",
    ], "結果（混乱・衝突）を2つとも押さえる", [
      ["結果1", "{{Timetables became extremely confusing}}・乗りかえの失敗。"],
      ["結果2", "more seriously, {{the risk of collisions increased}}。"],
    ]),
    C("agree", 3, U.chobun, "本文の内容と一致するものを選べ。", [
      "The writer regards standard time as an agreement whose value comes from being shared.",
      "The writer thinks the people who protested against standard time were completely foolish.",
      "According to the passage, standard time was first introduced by governments and later by railway companies.",
      "Before the railway, towns to the west kept a time that was several minutes ahead of towns to the east.",
    ], 0, [
      "正解。第4段落 Standard time is indeed a social agreement … Its value lies precisely in the fact that it is shared に一致。",
      "Their complaint was not entirely unreasonable（まったく不合理というわけではなかった）とあり、逆。",
      "adopted first by railway companies and later by governments で、順序が逆。",
      "西の町は数分「遅れた」時刻（several minutes behind）だった。",
    ], "順序（first … later）や向き（behind / ahead）に注意", [
      ["正解の根拠", "a {{social agreement}} … its value lies in the fact that {{it is shared}}。"],
      ["誤りの根拠", "{{not entirely unreasonable}}・{{first by railway companies}}・{{behind}}。"],
    ]),
  ], 6, "reading"),
];

// =====================================================================
// 第2問　長文読解（科学・研究の論説）
//   7問から6問。難易度の並び：和訳2・説明3・抜き出し2・空所2・段落2・和訳3・一致3
// =====================================================================

const P2: ExamPoolSection[] = [
  sec(2, "r2-autodrive", U.chobun, "長文読解（自動運転と責任）", READ_LEAD, [{
    kind: "passage",
    lang: "en",
    title: "Who Is Responsible When No One Is Driving?",
    body: `For more than a century, the question of who is to blame after a road accident has usually had a simple starting point: the driver. Laws, insurance systems and our everyday sense of fairness all assume that a human being is in control of the vehicle and can be expected to pay attention. Self-driving cars challenge this assumption. {{(A) If a car steers, brakes and chooses its route by itself, it becomes much harder to say who should be held responsible when something goes wrong.}}

At first sight, the answer might seem obvious: if the machine was driving, the company that built it should pay. But the situation is rarely so clear. Most cars now on the road with automated features still require a human to watch the road and take over when the system asks. Studies in driving simulators have found that people who are told to monitor an automated car quickly lose concentration. When a warning finally sounds, it may take them several seconds to understand what is happening, by which time it may be too late to react. Researchers call this problem the "handover gap."

The handover gap creates what some legal scholars describe as a "moral crumple zone." A crumple zone is the part of a car designed to absorb the force of a crash and protect the passengers. In the same way, the human behind the wheel may end up absorbing the blame for a failure that was largely the result of the system's design. The person is held responsible not because she had real control but because she was the nearest human being when the accident happened.

Some experts argue that the only fair solution is to [ 1 ] the idea of a human supervisor altogether. In their view, a car should be driven either fully by a person or fully by a machine, and in the second case the manufacturer should accept responsibility for every accident. Others worry that placing all responsibility on companies could slow down the development of a technology that might, in the long run, save many lives, since human error plays a part in the great majority of road accidents.

A third approach looks less at blame and more at learning. In aviation, accident investigators focus on discovering what went wrong rather than on punishing individuals, and their reports are shared across the industry so that the same mistake is not repeated. A similar system for automated vehicles would require companies to record and share detailed data about failures. {{(B) Such an arrangement would not answer every question about responsibility, but it might make the roads safer more quickly than arguments in court ever could.}}`,
    notes: [{ word: "simulator", meaning: "模擬装置" }, { word: "aviation", meaning: "航空" }],
  }], [
    JT("tr-a", 2, "(A)", "車が自分でハンドルを切り、ブレーキをかけ、道筋を選ぶのであれば、何かがうまくいかなかったときにだれが責任を負わされるべきかを言うのは、ずっと難しくなる。",
      jtRubric("形式主語 it becomes harder to say＋間接疑問 who should be held responsible", ["難しく", "だれが"], "by itself・be held responsible・goes wrong", ["自分で", "責任", "うまくいかな"]),
      "it は to say 以下を受ける形式主語", [
        ["形式主語", "it becomes much harder {{to say}} …：「～を言うのはずっと難しくなる」。much は比較級の強め。"],
        ["間接疑問", "{{who should be held responsible}}：hold O responsible「Oに責任を負わせる」の受け身。"],
      ], U.kandai),
    EX("ex-gap", 3, "本文中の the \"handover gap\" とはどのような問題か。説明せよ。", 50,
      "自動運転の車を見張るよう言われた人がすぐ集中を失い、警告が鳴っても状況を理解して対応するまでに時間がかかりすぎる問題。",
      exRubric(["監視役の人がすぐ集中を失うことを書いている", ["集中", "見張", "監視"]], ["警告後、状況を理解して対応するのが間に合わないことを書いている", ["警告", "時間", "間に合わ", "遅"]]),
      "呼び名（this problem）の直前の数文が内容", [
        ["原因", "people who are told to monitor an automated car {{quickly lose concentration}}。"],
        ["結果", "it may take them {{several seconds to understand}} … {{too late to react}}。"],
      ]),
    T("term", 2, U.chobun, "第3段落で、実際には制御できなかったのに事故の責めを負わされてしまう人間の立場を、車の一部にたとえて表した語句を、本文中から英語3語で抜き出せ。",
      ["moral crumple zone"], "たとえの語句は引用符（\" \"）で示されることが多い", [
        ["さがす", "第3段落の最初：what some legal scholars describe as a {{\"…\"}}。"],
        ["たとえ", "crumple zone＝衝撃を吸収する部分 → 人間が{{責めを吸収する}}。"],
      ]),
    C("blank1", 2, U.vocab, "空所［ 1 ］に入る最も適切なものを選べ。", ["abandon", "strengthen", "introduce", "require"], 0, [
      "正解。直後の「車は人か機械のどちらかが完全に運転すべきだ」から、人間の監視役という考えを「すっかり捨てる」。",
      "監視役の考えを「強める」では、どちらか一方が完全に運転すべきだという意見と逆。",
      "監視役はすでに求められているので、「導入する」では話がつながらない。",
      "「求める」では、監視役を置かない立場の説明にならない。",
    ], "altogether（すっかり）と後ろの説明から推す", [
      ["後ろの説明", "a car should be driven {{either fully by a person or fully by a machine}}。"],
      ["語を選ぶ", "人間の監視役という中間の形を{{すっかり捨てる}}（abandon … altogether）。"],
    ], K),
    C("para4", 2, U.chobun, "第4段落の内容として最も適切なものを選べ。", [
      "責任をすべて製造会社に負わせるべきだという意見と、それでは命を救いうる技術の開発が遅れるという心配が対比されている。",
      "人間の運転のほうが機械よりも安全だということが、統計によって示されている。",
      "製造会社がすでにすべての事故の責任を負っていることが説明されている。",
      "人間の監視役を置くことが、もっとも公平な解決策だと結論づけられている。",
    ], 0, [
      "正解。Some experts argue … と Others worry … の2つの立場が並べられている。",
      "human error plays a part in the great majority of road accidents とあり、人間のほうが安全だとは言っていない。",
      "製造会社が責任を負う「べきだ」という意見で、すでに負っているのではない。",
      "監視役という考えを捨てるのが公平だ、という意見が紹介されている。",
    ], "Some … Others … は対立する2つの立場", [
      ["立場1", "{{Some experts argue}}：完全に機械が運転するなら会社がすべての責任を。"],
      ["立場2", "{{Others worry}}：会社に責任を集めると、命を救いうる技術の開発が遅れる。"],
    ]),
    JT("tr-b", 3, "(B)", "そのような仕組みは、責任をめぐるあらゆる問いに答えるわけではないだろうが、法廷での議論がこれまでにできたであろうよりも早く、道路を安全にするかもしれない。",
      jtRubric("not … every「すべて～するわけではない」（部分否定）・比較 more quickly than … ever could", ["わけではない", "よりも"], "arrangement・make O C・arguments in court", ["仕組み", "安全に", "法廷"]),
      "not＋every は部分否定", [
        ["部分否定", "would {{not answer every question}}：「すべての問いに答えるわけではない」。"],
        ["比較", "make the roads safer more quickly {{than arguments in court ever could}} (make them safe)：「法廷の議論ができるよりも早く」。"],
      ], U.hikaku),
    C("agree", 3, U.chobun, "本文の内容と一致するものを選べ。", [
      "The writer describes an approach that focuses on sharing information about failures so that mistakes are not repeated.",
      "According to the passage, people monitoring an automated car can react to a warning immediately.",
      "The writer claims that the handover gap was invented by car manufacturers to avoid blame.",
      "In aviation, accident investigators mainly try to identify and punish the people responsible.",
    ], 0, [
      "正解。最終段落 their reports are shared across the industry so that the same mistake is not repeated と、同じ仕組みを自動車にも、という提案に一致。",
      "警告から理解するまで数秒かかり、手おくれになりうるとあり、逆。",
      "handover gap は研究者が問題につけた呼び名で、会社が作ったものではない。",
      "rather than on punishing individuals（個人を罰することよりも）とあり、逆。",
    ], "rather than の前後のどちらが主張かを確かめる", [
      ["正解の根拠", "reports are {{shared across the industry}} so that the same mistake is {{not repeated}}。"],
      ["誤りの根拠", "focus on discovering what went wrong {{rather than on punishing individuals}}。"],
    ]),
  ], 6, "reading"),

  sec(2, "r2-volunteer", U.chobun, "長文読解（ボランティアと幸福感）", READ_LEAD, [{
    kind: "passage",
    lang: "en",
    title: "Does Helping Others Make Us Happier?",
    body: `Large surveys in many countries have found that people who do volunteer work report higher levels of life satisfaction than people who do not. The finding is so common that it is often presented as simple advice: if you want to be happier, help others. {{(A) Yet a link between two things does not by itself tell us which one causes the other.}} It may be that volunteering makes people happier, but it may equally be that happy people are more likely to volunteer in the first place.

Researchers have tried to separate these possibilities in several ways. One method is to follow the same people over many years and see whether their well-being changes after they start or stop volunteering. Such studies suggest that both explanations are partly correct. People who are already satisfied with their lives are more likely to take up volunteer work, but their satisfaction also tends to rise a little further once they begin. The increase is modest, and it is not the same for everyone.

Age appears to be one important factor. In several studies, the benefits of volunteering were [ 1 ] among older adults, especially those who had recently retired. For people who have lost the daily structure and social contact of a workplace, volunteering may provide a sense of purpose and a reason to leave the house. Younger people, who are often busy with study, work and family, seem to gain less, and some even report feeling stressed when volunteer duties are added to an already full schedule.

Motivation also matters. Volunteers who say they help mainly because they care about others tend to benefit more than those who volunteer mainly to improve their own image or career prospects. This creates an interesting puzzle: the people who volunteer in order to become happier may be the ones least likely to succeed. One possible explanation is that attention focused on one's own feelings makes it difficult to experience the sense of connection that helping others can bring.

The amount of time spent volunteering is another consideration. The benefits seem to increase up to a point, perhaps a few hours a week, and then level off. {{(B) Beyond that, volunteering may begin to feel like an obligation rather than a choice, and the very activity that once gave pleasure can turn into a source of pressure.}} Taken together, these findings suggest that the familiar advice should be stated more carefully. Helping others can contribute to a good life, but its effects depend on who is helping, why, and how much.`,
    notes: [{ word: "life satisfaction", meaning: "生活の満足度" }, { word: "well-being", meaning: "幸福・心身の健康" }],
  }], [
    JT("tr-a", 2, "(A)", "しかし、二つの物事の間に関連があるからといって、それだけでは、どちらがもう一方の原因なのかはわからない。",
      jtRubric("無生物主語 a link … does not tell us＋間接疑問 which one causes the other", ["わからない", "どちらが"], "link・by itself・the other", ["関連", "それだけ", "もう一方"]),
      "無生物主語は「～からといって」と副詞的に訳す", [
        ["無生物主語", "{{a link between two things}} does not … tell us：「二つの物事の関連は教えてくれない」→「関連があっても、わからない」。"],
        ["語句", "{{by itself}}＝それだけでは。which one causes {{the other}}＝どちらがもう一方を引き起こすか。"],
      ], U.kandai),
    EX("ex-puzzle", 3, "第4段落の an interesting puzzle とはどのようなことか。その理由として考えられていることもふくめて説明せよ。", 70,
      "幸せになるためにボランティアをする人ほど幸福感を得にくいということで、自分の気持ちに注意が向き、人とのつながりを感じにくいためと考えられる。",
      exRubric(["幸せになる目的で活動する人ほど幸福感を得にくいことを書いている", ["幸せになる", "目的", "得にくい"]], ["自分の気持ちに注意が向き、つながりを感じにくいという理由を書いている", ["自分の気持ち", "注意", "つながり"]]),
      "コロンの後ろが puzzle の中身、次の文が理由", [
        ["中身", "the people who volunteer {{in order to become happier}} may be the ones {{least likely to succeed}}。"],
        ["理由", "{{attention focused on one's own feelings}} makes it difficult to experience the sense of connection。"],
      ]),
    T("term", 2, U.chobun, "第3段落で、高齢者、とくに退職したばかりの人にとってボランティアが与えうるものとして挙げられているもののうち、「生きがい・目的意識」にあたる語句を、本文中から英語4語で抜き出せ。",
      ["a sense of purpose"], "日本語の意味から本文の名詞句をさがす", [
        ["さがす", "For people who have lost the daily structure … volunteering may provide {{＿＿}} and a reason to leave the house。"],
        ["語数", "冠詞もふくめて{{4語}}。"],
      ]),
    C("blank1", 2, U.vocab, "空所［ 1 ］に入る最も適切なものを選べ。", ["greatest", "smallest", "absent", "unknown"], 0, [
      "正解。後ろで、退職者には目的意識や外出の理由を与え、若者は得るものが少ないと対比している。高齢者で効果が「最も大きい」。",
      "「最も小さい」では、若者のほうが得るものが少ないという後半と逆になる。",
      "「ない」では、高齢者に目的意識を与えるという次の文と食いちがう。",
      "「わかっていない」では、続く説明（目的意識を与える）とつながらない。",
    ], "対比（Younger people … gain less）から逆算する", [
      ["対比", "{{Younger people … seem to gain less}}：若者は少ない。"],
      ["語を選ぶ", "だから高齢者では効果が{{最も大きい}}（greatest）。"],
    ], K),
    C("para2", 2, U.chobun, "第2段落の研究からわかったこととして最も適切なものを選べ。", [
      "もともと満足している人がボランティアを始めやすく、始めると満足度がさらに少し上がる。",
      "ボランティアを始めても満足度は変わらず、幸せな人が活動しやすいだけである。",
      "ボランティアを始めると、だれでも満足度が大きく上がる。",
      "ボランティアをやめた人は、例外なく満足度が下がる。",
    ], 0, [
      "正解。both explanations are partly correct のあと、両方の向きの説明が続く。",
      "satisfaction also tends to rise a little further once they begin とあり、変わらないのではない。",
      "The increase is modest, and it is not the same for everyone とあり、大きく、だれでも、ではない。",
      "やめた人について「例外なく下がる」という記述はない。",
    ], "both explanations are partly correct の中身", [
      ["向き1", "already satisfied people are {{more likely to take up}} volunteer work。"],
      ["向き2", "satisfaction {{tends to rise a little further}} once they begin（ただし modest）。"],
    ]),
    JT("tr-b", 3, "(B)", "それを超えると、ボランティアは選択というよりも義務のように感じられはじめ、かつては喜びを与えてくれたまさにその活動が、重圧の源に変わってしまうこともある。",
      jtRubric("Beyond that「それを超えると」・A rather than B・the very＋名詞「まさにその」", ["超え", "というより", "まさに"], "obligation・once gave pleasure・source of pressure", ["義務", "かつて", "重圧", "負担"]),
      "the very は名詞を強める「まさにその」", [
        ["指す内容", "Beyond {{that}}：that は「週に数時間ほどの点」。それを超えると。"],
        ["強調", "{{the very activity that once gave pleasure}}：「かつて喜びを与えたまさにその活動」。"],
      ], U.hikaku),
    C("agree", 3, U.chobun, "本文の内容と一致するものを選べ。", [
      "The writer suggests that the advice \"help others to be happier\" is too simple.",
      "According to the passage, the more hours people volunteer, the happier they always become.",
      "Younger volunteers generally benefit more than older ones because they have more energy.",
      "People who volunteer to improve their career prospects benefit the most.",
    ], 0, [
      "正解。最終段落 the familiar advice should be stated more carefully に一致。",
      "効果は週に数時間ほどまで増え、そのあと頭打ちになる（level off）とあり、always ではない。",
      "若者は得るものが少ないとある。",
      "他人を思って活動する人のほうが、自分の評判や仕事のために活動する人より効果が大きい。",
    ], "always・the most など言いすぎの選択肢に注意", [
      ["正解の根拠", "the familiar advice {{should be stated more carefully}}。"],
      ["誤りの根拠", "{{level off}}・younger people {{seem to gain less}}。"],
    ]),
  ], 6, "reading"),

  sec(2, "r2-seeds", U.chobun, "長文読解（種子の銀行）", READ_LEAD, [{
    kind: "passage",
    lang: "en",
    title: "A Library of Seeds",
    body: `On a cold hillside on the northern island of Nordhavn stands a building that looks from the outside like an ordinary warehouse. Inside, kept at a temperature well below freezing, are hundreds of thousands of small packets of seeds. The building is a seed bank, and its purpose is to protect the genetic variety of the plants that humans depend on for food.

Why is such a place necessary? Over the past century, farming has become increasingly uniform. Farmers around the world have replaced thousands of local varieties of rice, wheat and potatoes with a small number of high-yielding types. {{(A) These modern varieties produce more food per field, but growing the same plants over huge areas makes the whole food supply more vulnerable to a single disease or a change in climate.}} When a crop has little genetic variety, a disease that attacks one plant can attack them all.

Old local varieties, by contrast, often carry useful traits that have developed over centuries: resistance to a particular insect, the ability to survive long periods without rain, or tolerance of salty soil. Plant breeders can use these traits to develop new varieties suited to changing conditions. But once a variety stops being grown and its seeds are lost, those traits are lost with it. A seed bank works as a kind of insurance [ 1 ] such losses.

Storing seeds, however, is not as simple as putting them in a freezer and forgetting about them. Even under ideal conditions, seeds slowly lose their ability to grow. Every few decades, samples must be planted, grown to maturity and harvested to produce fresh seeds. For some plants, such as certain fruit trees, seeds cannot be stored at all, and the variety must be kept alive as growing plants in fields. The work therefore requires not only buildings and machines but also generations of people with the skill and patience to care for living things.

Some scientists also warn that seed banks alone cannot preserve everything that matters. A variety kept in a freezer is protected, but it stops changing. In farmers' fields, by contrast, plants continue to adapt to local insects and weather year after year. For this reason, many experts now argue that seed banks should be combined with support for farmers who continue to grow traditional crops. {{(B) What is needed, in other words, is a system in which the safety of storage and the flexibility of living fields support rather than replace each other.}} Frozen seeds keep the past safe; living fields allow it to keep developing.`,
    notes: [{ word: "high-yielding", meaning: "収穫量の多い" }, { word: "vulnerable", meaning: "弱い・被害を受けやすい" }, { word: "plant breeder", meaning: "品種改良家" }],
  }], [
    JT("tr-a", 2, "(A)", "これらの現代の品種は畑一枚あたりより多くの食料を生み出すが、広大な地域で同じ植物を育てることで、食料の供給全体が、一つの病気や気候の変化に対してより弱くなってしまう。",
      jtRubric("動名詞の主語 growing … makes O C「～することでOがCになる」", ["ことで", "により", "なる"], "per field・vulnerable to・food supply", ["あたり", "弱", "供給"]),
      "動名詞の主語＋make O C は「～するとOがCになる」", [
        ["主語", "{{growing the same plants over huge areas}}：動名詞のまとまりが主語。"],
        ["補語", "makes the whole food supply {{more vulnerable to}} …：「食料供給全体を～に対してより弱くする」。"],
      ], "h-eng-gram-domeishi"),
    EX("ex-people", 3, "第4段落で、種子の保存に機械だけでなく何世代にもわたる人が必要だとされるのはなぜか。説明せよ。", 70,
      "種子は理想的な条件でも少しずつ発芽力を失うので数十年ごとに育てて採り直す必要があり、種で保存できない植物は畑で育て続けなければならないから。",
      exRubric(["種子が発芽力を失うため、定期的に育てて採り直す必要があることを書いている", ["発芽", "育てる力", "数十年", "採り直"]], ["種で保存できない植物（果樹など）は生きた植物として育て続ける必要があることを書いている", ["果樹", "保存できない", "育て続け"]]),
      "therefore の前の数文が理由", [
        ["理由1", "seeds slowly {{lose their ability to grow}} → {{Every few decades}}, samples must be planted … harvested。"],
        ["理由2", "some plants … seeds {{cannot be stored at all}} → 畑で生きた植物として保つ。"],
      ]),
    T("term", 2, U.chobun, "第3段落で、古い在来品種が何世紀もかけて身につけてきた「（病害虫への強さなどの）有用な性質」を表す1語を、本文中から英語で抜き出せ（複数形のまま）。",
      ["traits"], "コロンの後ろの具体例をまとめる語をさがす", [
        ["さがす", "often carry useful {{＿＿}} that have developed over centuries: resistance …, the ability …, or tolerance …。"],
        ["確認", "後ろの文でも Plant breeders can use these {{＿＿}} とくり返されている。"],
      ]),
    C("blank1", 2, U.zenchishi, "空所［ 1 ］に入る最も適切なものを選べ。", ["against", "for", "with", "into"], 0, [
      "正解。insurance against ～ で「～に備える保険」。品種が失われることへの備えになる。",
      "insurance for は「～のための保険」で、守る対象（for the house など）に使い、損失そのものには使わない。",
      "insurance with は保険会社などを示し、意味が通らない。",
      "insurance into という言い方はない。",
    ], "insurance against＝～に備える保険", [
      ["語法", "{{insurance against}} loss / fire：損失や災害に備える。"],
      ["文脈", "品種と性質が{{失われること}}（such losses）に備える。"],
    ], K),
    C("para5", 2, U.chobun, "第5段落で、一部の科学者が種子銀行だけでは足りないと考える理由として最も適切なものを選べ。", [
      "冷凍された品種は守られるが変化しなくなり、畑で育つ植物のように地域の虫や天候に適応し続けないから。",
      "冷凍庫が故障すると、すべての種子が一度に失われるから。",
      "種子銀行にある品種は、収穫量が少なく役に立たないから。",
      "農家は種子銀行の種子を使うことを禁じられているから。",
    ], 0, [
      "正解。A variety kept in a freezer is protected, but it stops changing. In farmers' fields, by contrast, plants continue to adapt に一致。",
      "冷凍庫の故障の話はない。",
      "古い品種は有用な性質をもつと述べており、役に立たないとは言っていない。",
      "使用の禁止についての記述はない。",
    ], "by contrast の前後の対比を読む", [
      ["冷凍庫", "{{protected, but it stops changing}}。"],
      ["畑", "plants {{continue to adapt}} to local insects and weather。"],
    ]),
    JT("tr-b", 3, "(B)", "言いかえれば、必要なのは、保存による安全と生きた畑のもつ柔軟さとが、互いに取って代わるのではなく支え合うような仕組みなのである。",
      jtRubric("What is needed is …・前置詞＋関係代名詞 a system in which …・A rather than B", ["必要なのは", "ような仕組み", "ではなく"], "in other words・flexibility・support each other", ["言いかえれば", "柔軟", "支え合"]),
      "support と replace は each other が共通の目的語", [
        ["骨組み", "{{What is needed}} … is {{a system in which}} S V：「必要なのは～する仕組み」。"],
        ["並列", "S＝the safety of storage and the flexibility of living fields／V＝{{support rather than replace}} each other。"],
      ], U.kandai),
    C("agree", 3, U.chobun, "本文の内容と一致するものを選べ。", [
      "The writer suggests that relying on a few high-yielding varieties increases the risk to the food supply.",
      "According to the passage, seeds stored in a freezer can be kept forever without any further work.",
      "Old local varieties are described as weaker and less useful than modern ones in every way.",
      "Many experts now argue that farmers should stop growing traditional crops.",
    ], 0, [
      "正解。第2段落 makes the whole food supply more vulnerable to a single disease or a change in climate に一致。",
      "第4段落で、理想的な条件でも少しずつ発芽力を失うので数十年ごとに育て直すとある。",
      "第3段落で、古い品種は害虫への強さなど有用な性質をもつとある。",
      "伝統作物を育て続ける農家を支援すべきだと述べており、逆。",
    ], "in every way・forever など極端な語に注意", [
      ["正解の根拠", "the whole food supply {{more vulnerable}} to a single disease。"],
      ["誤りの根拠", "seeds {{slowly lose their ability to grow}}・{{support for farmers who continue to grow traditional crops}}。"],
    ]),
  ], 6, "reading"),
];

// =====================================================================
// 第3問　会話文（空所・語句の意味・内容・空所の英文記述・意見の英作文）
//   6問すべて。難易度の並び：空所2・空所2・語句2・内容2・英文記述3・英作文3
// =====================================================================

const TALK_LEAD = "次の会話文を読み、下の問いに答えよ。";
/** 空所に入る英文の記述 (6点) */
const fillRubric = (fit: string[]): Rub => [
  ["前後の流れに合う内容になっている", 3, fit],
  ["文法・語法の誤りがない", 2, []],
  ["語数の条件を守っている", 1, []],
];
/** 会話をふまえた意見の英作文 (10点) */
const opRubric = (stance: string[]): Rub => [
  ["問いに正面から答え、立場がはっきりしている", 3, stance],
  ["理由・具体例で支えている（会話の内容をそのまま写していない）", 3, ["because", "For example"]],
  ["文法・語法・つづりの誤りが少ない", 3, []],
  ["語数（30〜50語）を守っている", 1, []],
];
const FILL = (id: string, label: string, model: string, also: string[], fit: string[], point: string, st: St[]): QuestionB =>
  Wr(id, 3, U.jiyu, `空所${label}に入る英文を、会話の流れに合うように8〜15語で書け。`, { min: 8, max: 15, unit: "語" }, model, fillRubric(fit), point, st, 360, also);
const OP = (id: string, q: string, model: string, stance: string[], point: string, st: St[]): QuestionB =>
  Wr(id, 3, U.jiyu, `会話の内容をふまえ、次の問いに対するあなたの考えを30〜50語の英語で書け。\n問い：${q}`, { min: 30, max: 50, unit: "語" }, model, opRubric(stance), point, st, 720);

const P3: ExamPoolSection[] = [
  sec(3, "t-concert", U.kaiwa, "会話文（ライブと配信）", TALK_LEAD, [{
    kind: "passage",
    lang: "en",
    title: "After the Concert",
    body: `Hana: That was amazing! I'm so glad we got tickets. My ears are still ringing.
Leo: Same here. ( 1 ) I almost didn't come, you know.
Hana: Really? Why not? You've been talking about this band for months.
Leo: The tickets were expensive, and I can watch their concerts online whenever I want. Last month I streamed one of their shows from my bedroom, and the sound quality was actually better than tonight.
Hana: Maybe, but it's not the same thing at all. Tonight, when everyone started singing the chorus together, I got goosebumps. You can't get that feeling through a screen.
Leo: I know what you mean. Still, streaming has its advantages. I can pause the show, watch it again, and I don't have to stand behind someone tall. {{(a) That guy in front of me was a head taller than everyone else.}}
Hana: Ha! I noticed. But think about the band, too. The guitarist said they had changed the song list because the audience was so lively. ( 2 )
Leo: True. They played that old song nobody expected. That was the best moment of the night.
Hana: Exactly. A live show is something we create together with the musicians. It's different every night.
Leo: OK, you've {{(b) won me over}}. But if live shows are so special, why are so many small concert halls closing down?
Hana: That's a good question. ( 3 )
Leo: That makes sense. Maybe I should spend less on streaming subscriptions and more on tickets, then.`,
    notes: [{ word: "goosebumps", meaning: "鳥肌" }, { word: "subscription", meaning: "定額の利用契約" }],
  }], [
    C("blank1", 2, U.kaiwa, "空所( 1 )に入る最も適切なものを選べ。", [
      "To be honest, it was worth every penny.",
      "To be honest, I'd rather have stayed at home.",
      "I've never heard of this band before.",
      "Let's leave before the concert starts.",
    ], 0, [
      "正解。Same here（ぼくもだ）と感動に同意し、「正直、払ったお金の価値は十分あった」。次の「来ないところだった」ともつながる。",
      "Same here と感動に同意した直後に「家にいたかった」は矛盾する。",
      "Hana が「何か月もこのバンドの話をしていた」と言っている。",
      "コンサートはもう終わっている。",
    ], "Same here は直前の感想への同意", [
      ["直前", "Hana：{{That was amazing!}} → Leo：{{Same here.}}"],
      ["次の文", "I almost didn't come → それでも{{来てよかった}}（worth every penny）。"],
    ], K),
    C("blank2", 2, U.kaiwa, "空所( 2 )に入る最も適切なものを選べ。", [
      "A recorded show can't respond to the people watching it.",
      "The band should play the same songs every night.",
      "That's why I prefer watching concerts online.",
      "The guitarist didn't seem to enjoy playing tonight.",
    ], 0, [
      "正解。観客が盛り上がったので曲目を変えた → 録画の公演は観客に反応できない。Leo の True. と後の「ライブは一緒につくるもの」につながる。",
      "毎晩同じ曲をという主張は、曲目を変えたことをほめる流れと逆。",
      "Hana はライブの良さを主張しており、配信を好む理由にならない。",
      "観客が盛り上がって曲目を変えたのだから、楽しんでいなかったとは言えない。",
    ], "Hana の主張（ライブは特別）を支える一文", [
      ["根拠", "they had changed the song list {{because the audience was so lively}}。"],
      ["主張", "録画は観客に{{反応できない}} → ライブは {{different every night}}。"],
    ], K),
    C("phrase", 2, U.kaiwa, "下線部(b) won me over の意味として最も適切なものを選べ。", [
      "persuaded me to agree with you",
      "defeated me in a game",
      "made me feel tired",
      "taken my ticket away",
    ], 0, [
      "正解。win O over は「Oを説得して味方にする」。Hana の主張に納得した、という意味。",
      "ゲームで負かしたのではない。",
      "疲れさせたという意味はない。",
      "チケットを取り上げたのではない。",
    ], "win O over＝Oを説得して味方につける", [
      ["流れ", "Hana の「ライブは一緒につくるもの」に、Leo が {{OK}} と応じている。"],
      ["意味", "{{win O over}}＝説得して自分の側に引き入れる。"],
    ], K),
    C("leo-a", 2, U.kaiwa, "下線部(a)で Leo が言おうとしていることとして最も適切なものを選べ。", [
      "背の高い人の後ろに立ったので、ステージが見えにくかった。",
      "前の人がとても親切だった。",
      "自分がだれよりも背が高かった。",
      "前の人が大声で歌って、音楽が聞こえなかった。",
    ], 0, [
      "正解。直前の「配信なら背の高い人の後ろに立たなくてよい」の具体例として、今夜の不便を言っている。",
      "親切だったという話ではない。",
      "a head taller than everyone else なのは前の男性。",
      "歌声の話は出ていない。",
    ], "直前の一般論の具体例として読む", [
      ["直前", "I don't have to {{stand behind someone tall}}（配信の利点）。"],
      ["具体例", "前の人は {{a head taller than everyone else}} → 見えにくかった。"],
    ]),
    FILL("fill3", "( 3 )", "Many people only stream music now, so small halls cannot sell enough tickets.",
      ["Perhaps more people watch concerts online now, so small halls are losing their audiences.", "If everyone streams shows at home, small halls cannot earn enough money to stay open."],
      ["stream", "online", "tickets", "money"],
      "次の That makes sense と配信を減らす話につなげる", [
        ["問い", "Leo：ライブが特別なら、なぜ小さなホールが{{閉館している}}のか。"],
        ["答えの方向", "次の Leo の「配信を減らしてチケットに使おう」から → {{配信のせいで客・収入が減る}}。"],
      ]),
    OP("op", "Do you think live concerts will remain popular in the future, even though music can easily be streamed at home?",
      "I think live concerts will remain popular. Streaming is convenient, but people want to share strong feelings with others. For example, singing together with thousands of fans is an experience that a screen cannot give. That is why people will keep buying tickets.",
      ["I think", "will remain popular"], "会話の理由をそのまま使わず自分の例を足す", [
        ["構成", "① 立場 ② 相手側の利点を認める（{{convenient, but}}） ③ 理由と{{具体例}} ④ 結論。"],
        ["語数", "30〜50語は{{3〜4文}}。理由は1つにしぼってくわしく。"],
      ]),
  ], 6, "reading"),

  sec(3, "t-secondhand", U.kaiwa, "会話文（古着とフリーマーケット）", TALK_LEAD, [{
    kind: "passage",
    lang: "en",
    title: "At the Flea Market",
    body: `Mei: Look at this jacket! It's only five hundred yen, and it looks almost new.
Sam: Nice. But are you sure you want to wear something that belonged to a stranger?
Mei: Why not? It's been washed. ( 1 )
Sam: I suppose so. I've just never bought secondhand clothes before. My family always buys new things.
Mei: I used to be the same, but then we studied the fashion industry in our social studies class. Did you know that a huge amount of clothing is thrown away every year, much of it hardly worn?
Sam: I've heard something like that. But one person buying a used jacket isn't going to change much, is it?
Mei: Maybe not by itself. ( 2 ) If more people did the same, factories would have to produce less.
Sam: That's a fair point. Still, new clothes fit better, and you can choose the exact size and colour you want.
Mei: That's true. Sometimes I have to {{(a) try on}} five or six things before I find one that fits. But that's part of the fun. It's like a treasure hunt.
Sam: Ha, I can see you've {{(b) made up your mind}}. Are you buying that jacket?
Mei: Definitely. What about you? There's a stall over there selling old records and books.
Sam: Hmm. ( 3 )
Mei: See? You're starting to enjoy this already.`,
    notes: [{ word: "stall", meaning: "屋台・売り場" }],
  }], [
    C("blank1", 2, U.kaiwa, "空所( 1 )に入る最も適切なものを選べ。", [
      "Besides, someone else might as well enjoy it.",
      "Besides, I never wear jackets.",
      "Actually, it's far too expensive for me.",
      "Actually, I'm the one who sold it.",
    ], 0, [
      "正解。洗ってあるし、それに（だれかが手放した物を）ほかの人が楽しんでもいいはず、と知らない人の物を着ることへの心配に答えている。",
      "ジャケットを買おうとしているのに「ジャケットは着ない」は矛盾する。",
      "500円で「安い」と言ったばかり。",
      "自分が売った物を「見て！」と勧めるのは不自然。",
    ], "Besides は理由をもう一つ足す", [
      ["相手の心配", "something that {{belonged to a stranger}}。"],
      ["答え", "It's been washed.（理由1）＋ {{Besides}} …（理由2）。"],
    ], K),
    C("blank2", 2, U.kaiwa, "空所( 2 )に入る最も適切なものを選べ。", [
      "But small choices add up when many people make them.",
      "But I'm going to stop buying clothes completely.",
      "So it's not worth thinking about.",
      "So we should throw away more clothes.",
    ], 0, [
      "正解。一人では変わらないかもしれないが、多くの人が選べば積み重なる → 次の「もっと多くの人が同じことをすれば工場は生産を減らす」とつながる。",
      "服を一切買わないという話は出ていない。",
      "直後で多くの人がすれば変わると言っており、「考える価値がない」は矛盾する。",
      "服を捨てることが問題だという話と逆。",
    ], "次の If more people did the same から逆算", [
      ["直前", "Maybe not {{by itself}}（一人だけでは変わらないかも）。"],
      ["次の文", "{{If more people did the same}}, factories would have to produce less。"],
    ], K),
    C("phrase", 2, U.kaiwa, "下線部(b) made up your mind の意味として最も適切なものを選べ。", [
      "decided",
      "forgotten",
      "changed the subject",
      "become confused",
    ], 0, [
      "正解。make up one's mind は「決心する」。次の Are you buying that jacket? と Definitely. に合う。",
      "忘れたという意味はない。",
      "話題を変えたのではない。",
      "混乱したのではない。",
    ], "make up one's mind＝決心する", [
      ["熟語", "{{make up one's mind}}＝決める・決心する（＝decide）。"],
      ["確認", "Mei の {{Definitely.}}（もちろん買う）と合う。"],
    ], K),
    C("sam", 2, U.kaiwa, "会話の内容から、Sam について言えることとして最も適切なものを選べ。", [
      "古着を買ったことはないが、Mei の話を聞いて少しずつ興味をもち始めている。",
      "ふだんから古着をよく買っている。",
      "授業で服の産業について Mei に教えた。",
      "最後まで古着に強く反対している。",
    ], 0, [
      "正解。I've just never bought secondhand clothes before と言い、最後に Mei が You're starting to enjoy this already と言っている。",
      "古着を買ったことがないと言っている。",
      "授業で学んだのは Mei。",
      "That's a fair point. と認めたり、最後には興味を示したりしている。",
    ], "最初と最後の発言で気持ちの変化をとらえる", [
      ["最初", "{{I've just never bought secondhand clothes before}}。"],
      ["最後", "Mei：{{You're starting to enjoy this already}}。"],
    ]),
    FILL("fill3", "( 3 )", "Maybe I'll take a look. I might find a record my father would like.",
      ["Actually, I've been looking for an old comic book, so let's go and check.", "OK, let's go and see. I might find a cheap book for my history report."],
      ["look", "find", "go", "check"],
      "次の You're starting to enjoy this から逆算", [
        ["誘い", "Mei：古いレコードや本の{{売り場がある}}。"],
        ["答えの方向", "次の Mei の「もう楽しみ始めてる」から → Sam は{{見に行く気になる}}。"],
      ]),
    OP("op", "Would you rather buy new clothes or secondhand clothes? Explain why.",
      "I would rather buy secondhand clothes. They are much cheaper, so I can try different styles without spending too much money. Also, buying used clothes helps reduce waste. However, I would buy new shoes, because shoes need to fit my feet perfectly.",
      ["I would rather"], "立場＋理由2つ＋例外で締める", [
        ["構成", "① 立場（{{I would rather}}） ② 理由（安い・ごみが減る） ③ 例外（{{However}}）。"],
        ["注意", "会話の表現をそのまま写さず、{{自分のことば}}で。"],
      ]),
  ], 6, "reading"),

  sec(3, "t-abroad", U.kaiwa, "会話文（短期留学）", TALK_LEAD, [{
    kind: "passage",
    lang: "en",
    title: "A Summer Program",
    body: `Ken: Have you decided about the summer program in New Zealand? The deadline is on Friday.
Aya: Not yet. I really want to go, but three weeks is a long time to be away from home.
Ken: Three weeks will go by in no time. ( 1 )
Aya: Easy for you to say. You lived abroad when you were a child.
Ken: That's true, but I was nervous too. On my first day at school there, I couldn't understand a word. I just smiled and nodded all day.
Aya: That sounds terrible! How did you survive?
Ken: A boy in my class started sitting next to me at lunch. He didn't speak any Japanese, so I had no choice but to use English. {{(a) Within a month, I was chatting away.}}
Aya: I'm not sure three weeks would be enough to make that kind of progress, though.
Ken: Maybe not in your English. ( 2 ) Living with a host family teaches you how people in another country think about everyday things, like meals or time.
Aya: I hadn't thought of it that way. What worries me most is the cost. The program isn't cheap.
Ken: Have you checked the school website? There's a scholarship for students who write a short essay about their goals.
Aya: Really? I had no idea. ( 3 )
Ken: That's the spirit. I'm sure you'll {{(b) make the most of}} it.`,
    notes: [{ word: "scholarship", meaning: "奨学金" }, { word: "host family", meaning: "ホームステイ先の家族" }],
  }], [
    C("blank1", 2, U.kaiwa, "空所( 1 )に入る最も適切なものを選べ。", [
      "And you'll be surprised how quickly you get used to it.",
      "And you'll probably regret going.",
      "But I wouldn't go if I were you.",
      "But the program has already been cancelled.",
    ], 0, [
      "正解。3週間はあっという間 → すぐに慣れることに驚くよ、と不安な Aya をはげましている。",
      "後悔するだろう、ははげましの流れと逆。",
      "行かないほうがいい、は Ken の態度（行くようすすめる）と逆。",
      "締め切りが金曜だと言ったばかりで、中止は矛盾する。",
    ], "Ken は一貫して Aya をはげましている", [
      ["直前", "{{Three weeks will go by in no time.}}（あっという間）"],
      ["同じ方向", "{{you'll be surprised how quickly you get used to it}}。"],
    ], K),
    C("blank2", 2, U.kaiwa, "空所( 2 )に入る最も適切なものを選べ。", [
      "But you'd learn a lot more than just the language.",
      "But your English is already perfect.",
      "So you should choose a longer program.",
      "So there's no point in going.",
    ], 0, [
      "正解。英語は3週間では伸びないかもしれないが、ことば以外に多くを学べる → 次の「ホストファミリーとの生活で考え方を学べる」と合う。",
      "Aya の英語が完ぺきだという話はない。",
      "次の文は長い留学の話ではなく、ホームステイで学べること。",
      "行く意味がない、は Ken の主張と逆。",
    ], "Maybe not … But ～ で別の利点を示す", [
      ["譲歩", "{{Maybe not in your English.}}：英語の上達はそれほどでなくても。"],
      ["主張", "次の文：host family teaches you {{how people in another country think}}。"],
    ], K),
    C("phrase", 2, U.kaiwa, "下線部(b) make the most of の意味として最も適切なものを選べ。", [
      "use as well as possible",
      "spend as much money as possible on",
      "complain about",
      "give up",
    ], 0, [
      "正解。make the most of は「～を最大限に活用する」。留学の機会を最大限に生かすだろう、という意味。",
      "お金をできるだけ使うという意味ではない。",
      "不平を言うという意味ではない。",
      "あきらめるという意味ではない。",
    ], "make the most of＝最大限に生かす", [
      ["熟語", "{{make the most of}} O＝Oを最大限に活用する。"],
      ["文脈", "That's the spirit.（その意気だ）のあとのはげまし。"],
    ], K),
    C("ken-a", 2, U.kaiwa, "下線部(a)から、Ken について言えることとして最も適切なものを選べ。", [
      "1か月たたないうちに、英語で気軽におしゃべりできるようになっていた。",
      "1か月のあいだ、だれとも話さなかった。",
      "1か月後に日本に帰ってきた。",
      "1か月のあいだ、同級生に日本語を教えていた。",
    ], 0, [
      "正解。within a month は「1か月以内に」、chat away は「どんどんおしゃべりする」。",
      "同級生と昼食をとり、英語を使うしかなかった、とあり、逆。",
      "帰国の話ではない。",
      "その男の子は日本語を話さず、Ken は英語を使った。",
    ], "within は「～以内に」", [
      ["前置詞", "{{Within a month}}＝1か月以内に。"],
      ["動詞", "{{chat away}}：away は「どんどん・さかんに」。"],
    ]),
    FILL("fill3", "( 3 )", "Then I'll write the essay tonight and apply before Friday.",
      ["In that case, I'll try writing an essay about my goals and apply for it.", "Then I'll check the website as soon as I get home and apply this week."],
      ["essay", "apply", "Friday", "website"],
      "次の That's the spirit.（その意気だ）から逆算", [
        ["情報", "Ken：目標についての短い作文を書けば{{奨学金}}がある。"],
        ["答えの方向", "That's the spirit. と言われる前向きな決心 → {{作文を書いて申しこむ}}。"],
      ]),
    OP("op", "Should high school students take part in short study abroad programs? Explain your opinion.",
      "I think high school students should take part in short study abroad programs. Even a few weeks in another country can show us that there are many ways of living. For example, eating meals with a host family teaches us manners and values we cannot learn from textbooks.",
      ["I think", "should"], "賛否＋理由＋具体例の3文で十分", [
        ["構成", "① 立場 ② 理由（{{生き方の多様さ}}） ③ {{For example}} で具体化。"],
        ["語法", "take part in＝参加する。{{Even a few weeks}} で「短くても」を強調。"],
      ]),
  ], 6, "reading"),
];

// =====================================================================
// 第4問　資料（表）を読んで書く英作文
//   3問すべて。難易度の並び：傾向と例外3・利点2・欠点2
// =====================================================================

const DATA_LEAD = "次の表を見て、下の問いに英語で答えよ（表の数字は説明のために作った架空のもの）。";
/** 傾向と例外の説明 (14点) */
const trendRubric = (trend: string[], exc: string[]): Rub => [
  ["表の全体の傾向を正しく読み取っている", 4, trend],
  ["傾向にあてはまらない例を正しく挙げている", 3, exc],
  ["その理由を自分の考えとして筋道立てて述べている", 3, ["because", "probably", "may"]],
  ["文法・語法の誤りが少ない", 3, []],
  ["語数（50〜70語）を守っている", 1, []],
];
/** 利点・欠点 (10点) */
const proRubric = (key: string[]): Rub => [
  ["問われた点（利点／欠点）を一つ、はっきり示している", 3, key],
  ["理由・具体例で支えている", 3, ["because", "For example"]],
  ["文法・語法・つづりの誤りが少ない", 3, []],
  ["語数（30〜40語）を守っている", 1, []],
];
const TREND = (id: string, q: string, model: string, trend: string[], exc: string[], point: string, st: St[]): QuestionB =>
  Wr(id, 3, U.jiyu, `${q}（50〜70語）`, { min: 50, max: 70, unit: "語" }, model, trendRubric(trend, exc), point, st, 900);
const PRO = (id: string, q: string, model: string, key: string[], point: string, st: St[]): QuestionB =>
  Wr(id, 2, U.jiyu, `${q}（30〜40語）`, { min: 30, max: 40, unit: "語" }, model, proRubric(key), point, st, 600);

const P4: ExamPoolSection[] = [
  sec(4, "d-bicycle", U.jiyu, "資料英作文（自転車通勤）", DATA_LEAD, [{
    kind: "table",
    caption: "表　5つの都市の自転車通勤（架空の数字）",
    head: ["都市", "自転車で通勤する人の割合（%）", "自転車専用道の長さ（km）", "冬の平均気温（℃）"],
    rows: [
      ["City A", "38", "410", "3"],
      ["City B", "27", "350", "5"],
      ["City C", "19", "160", "8"],
      ["City D", "9", "120", "11"],
      ["City E", "6", "380", "−9"],
    ],
  }], [
    TREND("trend", "表から読み取れる全体の傾向を述べ、その傾向にあてはまらない都市を一つ挙げて、そうなっている理由として考えられることを書け。",
      "In general, cities with longer bicycle lanes have a higher percentage of people who cycle to work. City A, with 410 kilometers of lanes, has the highest rate, 38 percent. However, City E has 380 kilometers of lanes but only 6 percent cycle. This is probably because its winters are very cold and snowy, so cycling becomes dangerous for several months.",
      ["longer", "higher percentage", "lanes"], ["City E", "cold"],
      "傾向→例外→理由の順に、数字を一つ二つ引く", [
        ["傾向", "専用道が{{長い}}ほど自転車通勤の割合が{{高い}}（A・B・C・D の順）。"],
        ["例外", "{{City E}}：専用道は長い（380km）のに 6%。冬の平均気温 {{−9℃}} → 寒さ・雪が理由と考える。"],
      ]),
    PRO("merit", "自転車で通勤・通学することの利点を一つ挙げ、説明せよ。",
      "One advantage of cycling to work or school is that it keeps us healthy. Riding a bicycle every day is good exercise, so people can stay fit without spending extra time at a gym. It also reduces stress.",
      ["advantage", "healthy", "exercise", "cheap", "environment"], "利点は一つにしぼって理由を足す", [
        ["書き出し", "{{One advantage of cycling … is that}} SV で問いに正面から答える。"],
        ["支え", "理由（{{good exercise}}）と効果（ジムに行く時間がいらない）。"],
      ]),
    PRO("demerit", "自転車通勤を増やそうとする都市が直面しうる問題を一つ挙げ、説明せよ。",
      "One problem is safety. If many more people cycle on busy roads, accidents between bicycles and cars may increase. To prevent this, the city would need to build separate lanes, which costs a lot of money and takes time.",
      ["problem", "safety", "accidents", "weather", "parking"], "問題＋その結果（または対策のむずかしさ）", [
        ["書き出し", "{{One problem is}} safety. と短く示す。"],
        ["支え", "{{If many more people cycle}} … accidents may increase → 対策（専用道）にお金と時間。"],
      ]),
  ], 3, "writing"),

  sec(4, "d-news", U.jiyu, "資料英作文（ニュースの入手手段）", DATA_LEAD, [{
    kind: "table",
    caption: "表　ある国の年代別「ニュースを主に何で知るか」（架空の数字・単位は%）",
    head: ["年代", "紙の新聞", "テレビ", "スマートフォン", "ニュースはほとんど見ない"],
    rows: [
      ["10代", "3", "20", "62", "15"],
      ["20代", "5", "25", "58", "12"],
      ["40代", "18", "45", "31", "6"],
      ["60代", "46", "40", "10", "4"],
    ],
  }], [
    TREND("trend", "表から読み取れる全体の傾向を述べ、注目すべき点を一つ挙げて、その理由として考えられることを書け。",
      "The table shows that younger people mainly get news from smartphones, while older people rely on newspapers and television. For example, 62 percent of teenagers use smartphones, but only 10 percent of people in their sixties do. It is also notable that 15 percent of teenagers hardly follow the news. This may be because news on phones competes with games and videos, so young people easily skip it.",
      ["younger", "smartphones", "older", "newspapers"], ["15 percent", "hardly", "teenagers"],
      "年代による差を対比（while）で一文に", [
        ["傾向", "若い世代は{{スマートフォン}}、上の世代は{{新聞・テレビ}}。"],
        ["注目点", "10代の {{15%}} はニュースをほとんど見ない → 動画やゲームと競合する、などの理由。"],
      ]),
    PRO("merit", "紙の新聞でニュースを読むことの利点を一つ挙げ、説明せよ。",
      "One advantage of reading a paper newspaper is that we see news we did not search for. While turning pages, we notice articles on politics, so our interests become wider than when we choose only what we like online.",
      ["advantage", "articles", "wider", "reliable"], "比較の相手（オンライン）を出すと利点がはっきりする", [
        ["書き出し", "{{One advantage of reading a paper newspaper is that}} SV。"],
        ["対比", "{{than when we choose only what we like online}}：スマホとの比較で説得力を。"],
      ]),
    PRO("demerit", "スマートフォンでニュースを知ることの問題点を一つ挙げ、説明せよ。",
      "One problem is that false information spreads easily on smartphones. Anyone can post a story online, and it may be shared thousands of times before anyone checks it. As a result, people may believe news that is not true.",
      ["problem", "false information", "true", "only"], "問題→しくみ→結果の3文", [
        ["書き出し", "{{One problem is that}} false information spreads easily。"],
        ["結果", "{{As a result}}, people may believe news that is not true。"],
      ]),
  ], 3, "writing"),

  sec(4, "d-parttime", U.jiyu, "資料英作文（高校生のアルバイト）", DATA_LEAD, [{
    kind: "table",
    caption: "表　4つの国の高校生（架空の数字）",
    head: ["国", "アルバイトをしている高校生（%）", "学校外での勉強時間（時間／週）", "「将来の仕事について考えたことがある」（%）"],
    rows: [
      ["Country P", "45", "6", "78"],
      ["Country Q", "30", "9", "64"],
      ["Country R", "12", "14", "41"],
      ["Country S", "8", "5", "36"],
    ],
  }], [
    TREND("trend", "表から読み取れる全体の傾向を述べ、その傾向にあてはまらない国を一つ挙げて、その理由として考えられることを書け。",
      "In countries where more high school students work part-time, more students have thought about their future jobs, but they study less outside school. However, Country S does not follow this pattern: few students work, and they also study only five hours a week. Perhaps students there spend a lot of time on club activities or helping their families.",
      ["work part-time", "future jobs", "study less"], ["Country S", "five hours"],
      "列が3つあるときは2つずつの関係を見る", [
        ["傾向", "アルバイトが{{多い}}国ほど、将来の仕事を考えた割合が{{高く}}、勉強時間は{{短い}}。"],
        ["例外", "{{Country S}}：アルバイト 8% なのに勉強も 5時間。部活や家の手伝いなど、ほかの理由を考える。"],
      ]),
    PRO("merit", "高校生がアルバイトをすることの利点を一つ挙げ、説明せよ。",
      "One advantage is that students can learn what working is really like. For example, working at a supermarket teaches them how to serve customers and work in a team, which may help them choose a future career.",
      ["advantage", "learn", "career", "money"], "表の内容（将来の仕事）と結びつけてもよい", [
        ["書き出し", "{{One advantage is that}} SV。"],
        ["具体例", "{{For example}}, working at a supermarket …：具体的な場面で支える。"],
      ]),
    PRO("demerit", "高校生がアルバイトをすることの欠点を一つ挙げ、説明せよ。",
      "One disadvantage is that students may not have enough time to study. If they work late in the evening, they will be too tired to do their homework, and their grades may fall as a result.",
      ["disadvantage", "time to study", "tired", "grades"], "too … to do で結果を示す", [
        ["書き出し", "{{One disadvantage is that}} SV。"],
        ["結果", "{{too tired to do their homework}} → grades may fall。"],
      ]),
  ], 3, "writing"),
];

// =====================================================================

export const U_NAGOYA_EIGO: UnivExam = {
  key: "nagoya-eigo",
  univ: "名古屋大学",
  kamoku: "英語",
  tier: "国公立",
  order: 115,
  basis: "文系学部の傾向を参考（配点は学部で異なるため200点に換算）",
  format: "大問4題・105分・200点。学術的な長文2題（和訳・内容説明）、会話文と意見の英作文、表を読んで書く英作文。",
  minutes: 105,
  groups: ["語彙", "文法", "技能"],
  sections: [
    { title: "第1問　長文読解（人文・社会の論説）", lead: READ_LEAD, count: [6, 6], mix: [0, 0.4, 0.6], points: 60, prefer: "material", poolTag: "nagoya-eigo:1" },
    { title: "第2問　長文読解（科学・研究の論説）", lead: READ_LEAD, count: [6, 6], mix: [0, 0.4, 0.6], points: 60, prefer: "material", poolTag: "nagoya-eigo:2" },
    { title: "第3問　会話文と意見の英作文", lead: TALK_LEAD, count: [6, 6], mix: [0, 0.4, 0.6], points: 40, prefer: "material", poolTag: "nagoya-eigo:3" },
    { title: "第4問　資料を読んで書く英作文", lead: DATA_LEAD, count: [3, 3], mix: [0, 0.4, 0.6], points: 40, prefer: "material", poolTag: "nagoya-eigo:4" },
  ],
  pool: [...P1, ...P2, ...P3, ...P4],
};
