import type { UnivExam } from "./types";
import type { ExamPoolSection } from "../pool/types";
import type { QuestionB, Skill, SolutionStep } from "@/lib/moshi/types";

// 東京科学大学型 英語（国公立・2次）。旧東京工業大学の理工学系（理学院・工学院・物質理工学院・情報理工学院・生命理工学院・環境・社会理工学院）の
// 一般選抜 個別学力検査「英語」の形式を参考にした練習用の型（英文・和文・設問はすべてこの型のために書き下ろしたもの。過去問の文・設定は使っていない）。
// 形式: 90分・150点（英語150・数学300・理科300）・長文読解の大問2題（1題は長く、もう1題はやや短い）。設問は記述が中心で、
//   下線部和訳・日本語の内容説明（字数制限つき）・本文中に日本語で示された部分の英訳（和文英訳）に、語の意味・空所・内容一致の選択を組み合わせる。
//   題材は理工系の読み手に向けた科学・技術の論説。リスニングと独立した自由英作文はない。
// 練習用として決めた点（公開情報では確かめられなかった・合わせていない点）:
//   ・実際の長文は2題で総語数3,000語をこえることがあるが、この型の本文は1題 450〜700語ほどに短くしてある。
//   ・大問ごとの配点（第1問90点・第2問60点）と設問の数・種類の割り振りは練習用に決めたもの（大学は内訳を公表していない）。
//   ・本文の題材・登場する施設や研究はすべて一般的な話題として書いたもので、特定の論文・人物の発言は使っていない。
// 参考:
//   https://manabi.benesse.ne.jp/daigaku/school/1165/nyushi/hoshiki/ippan/index.html （東京科学大学 一般選抜の入試科目・配点：理工学系の英語150点）
//   https://passnavi.obunsha.co.jp/univ/0280/subject/?facultyID=035 （東京科学大学 理工学系の入試科目・配点）
//   https://www.kobekyo.com/study-info/4807/ （理工学系の英語：90分・150点・長文読解2題で総語数3,000語以上、和訳・英訳・内容説明の記述と同義語選択・内容一致）
//   https://jyuke-labo.com/daigakujyukentaisaku/toukyoukougyoudaigaku/kamokubetsu/ （旧東工大の英語：大問2題とも長文、本文の一部を日本語で示して英訳させる問題・英文和訳・字数制限つきの内容説明）

const KEY = "kagakudai-eigo";
const TAG = (i: number) => `${KEY}:${i}`;

const U = {
  chobun: "h-eng-skill-chobun",
  wabun: "h-eng-skill-wabun",
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

/** 記述 (和訳・内容説明・英訳)。配点は採点基準の合計 */
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
/** 本文中の日本文の英訳の採点基準 (10点) */
const tr = (frame: string[], words: string[], content: string[]): Rb => [
  ["文の骨組み（構文・時制・語順）が正しい", 4, frame],
  ["語句の選び方・語法が適切", 3, words],
  ["内容にぬけ・つけ足しがなく、前後の英文の流れに合う", 3, content],
];

const V = (id: string, label: string, options: string[], why: string[], point: string, st: St[]) =>
  C(id, 2, U.vocab, `下線部${label}の語の意味に最も近いものを選べ。`, options, why, point, st, K);
const WY = (id: string, label: string, unit: string, model: string, rb: Rb, point: string, st: St[]) =>
  W(id, 2, unit, `下線部${label}を和訳せよ。`, model, rb, point, st, undefined, 420);
const WZ = (id: string, label: string, word: string, unit: string, model: string, rb: Rb, point: string, st: St[]) =>
  W(id, 3, unit, `下線部${label}を、${word} が指す内容を明らかにして和訳せよ。`, model, rb, point, st, undefined, 480);
const WS = (id: string, prompt: string, max: number, model: string, rb: Rb, point: string, st: St[]) =>
  W(id, 3, U.chobun, `${prompt}（${max}字以内の日本語で）`, model, rb, point, st, { max, unit: "字" }, 420);
const TR = (id: string, d: 2 | 3, label: string, model: string, also: string[], rb: Rb, point: string, st: St[]) =>
  W(id, d, U.wabun, `本文中の下線部${label}の日本文を、前後の文脈に合うように英語に訳せ。`, model, rb, point, st, undefined, 480, also);

const READ_LEAD = "次の英文を読み、下の問いに答えよ。";

function reading(tag: number, id: string, title: string, ptitle: string, body: string, questions: QuestionB[], notes?: { word: string; meaning: string }[]): ExamPoolSection {
  return {
    unit: U.chobun,
    tag: TAG(tag),
    section: {
      id: `kagakudai-en-${id}`,
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

// =====================================================================
// 第1問　長文読解（科学・技術の論説。長め）
//   どの節も 7問：語の意味(2)・空所(2)・下線部和訳(2)・内容説明(3)・日本文の英訳(3)・和訳または指示語つき和訳(2〜3)・内容一致(2)
// =====================================================================

const P1: ExamPoolSection[] = [
  reading(1, "r-bridge", "長文読解（橋の「声」を聞く）", "Listening to Bridges", `When engineers in the past wanted to know whether a bridge was safe, they sent inspectors to look at it. Inspectors climbed under the deck, tapped the steel with hammers, and searched for cracks and rust. This method worked reasonably well, but it had an obvious (a){{drawback}}: it could only reveal damage that was already visible on the surface, and only on the days when someone happened to be looking.

Today, many large bridges are fitted with hundreds of small sensors that measure how the structure moves. A bridge is never perfectly still. It bends slightly as trucks cross it, expands on hot afternoons, and sways in the wind. Each bridge also has its own natural frequencies, the rates at which it tends to vibrate when it is disturbed, much as a guitar string produces a particular note when it is plucked. {{(A) These frequencies depend on how stiff the structure is, so if a hidden crack makes part of the bridge less stiff, the note that the bridge "sings" changes slightly, even before any damage can be seen.}}

The idea is simple, but putting it into practice is not. A bridge's frequencies change for many reasons that have nothing to do with damage. On a cold morning, steel and concrete become stiffer, and the frequencies rise; on a hot day they fall again. Heavy traffic adds mass to the deck and lowers them. These effects can be large. [ 1 ], the change caused by a small crack is often tiny. {{(B) Finding the signal of damage, then, is like trying to hear a single wrong note played by one violin in the middle of a loud orchestra.}}

To solve this problem, engineers collect data for months or even years while the bridge is known to be healthy. They use this record to learn how temperature and traffic normally affect the bridge's vibrations, and then build a model that predicts what the frequencies should be under any given conditions. When the measured frequencies drift away from the prediction, and the difference cannot be explained by the weather or the traffic, the system raises an alarm. {{(D) こうした方法の利点は、点検員が見に行くよりずっと前に異常の兆しに気づける可能性があることだ。}}

Monitoring of this kind does not replace human inspectors. A sensor can tell engineers that something has changed, but not exactly what has happened or how serious it is. Someone still has to go and look. What sensors do is tell inspectors where and when to look, so that their limited time is spent where it matters most. {{(C) In a country with thousands of ageing bridges and too few engineers to examine them all closely, this may be the most valuable thing that the technology offers.}}

There is also a less obvious benefit. Long records of how real bridges behave are teaching designers things that laboratory tests could not. Some bridges have turned out to be stiffer than their designers assumed, others more flexible. Such information allows the next generation of structures to be designed with greater confidence, and perhaps with less material. A bridge that is listened to carefully, it seems, has a great deal to say.`, [
    V("vocab-a", "(a)", ["disadvantage", "advantage", "purpose", "origin"], [
      "正解。drawback は「欠点・不利な点」。直後のコロン以下（表面に見える損傷しかわからない）が欠点の中身。",
      "反対の意味。直前の but とも合わない。",
      "「目的」では、コロン以下の内容（限界）と合わない。",
      "「起源」では意味が通らない。",
    ], "コロンの後ろが語の中身を説明している", [
      ["文脈", "worked reasonably well, {{but}} it had an obvious ___ → 長所の後の but なので短所。"],
      ["中身", "コロン以下：{{表面に見える損傷}}しか、{{見ている日}}にしかわからない＝欠点。"],
    ]),
    C("blank1", 2, U.setsuzoku, "空所［ 1 ］に入る最も適切なものを選べ。", ["By contrast", "Therefore", "For example", "Similarly"], [
      "正解。「気温や交通の影響は大きい。それに対して、小さなひび割れによる変化はごくわずか」という対比。",
      "影響が大きいことは、ひび割れの変化が小さい理由ではない。",
      "後ろの文は、前の文（影響が大きい）の具体例ではない。",
      "「同様に」では、大きい↔小さいの対比が表せない。",
    ], "large ↔ tiny の対比を読む", [
      ["前", "These effects can be {{large}}（気温・交通による変化）。"],
      ["後", "the change caused by a small crack is often {{tiny}} → 対比の {{By contrast}}。"],
    ], K),
    WY("tr-a", "(A)", U.setsuzoku, "これらの振動数は構造物の硬さによって決まるので、もし隠れたひび割れによって橋の一部の硬さが低下すると、損傷が目に見えるようになる前であっても、橋が「歌う」音がわずかに変わる。",
      jt("depend on 間接疑問（how stiff …）・so if SV, SV・even before SV", ["によって決まる", "ので", "前であっても", "前でも"], "stiff・make O less stiff・the note the bridge sings", ["硬", "音", "歌う"]),
      "how stiff S is＝「Sがどれほど硬いか」", [
        ["前半", "These frequencies {{depend on how stiff the structure is}}：「振動数は構造物の硬さで決まる」。"],
        ["後半", "make part of the bridge {{less stiff}}（SVOC）→「硬さを下げる」。{{even before}} any damage can be seen＝「損傷が見える前でさえ」。"],
      ]),
    WS("ex-b", "下線部(B)はどのようなことをたとえているか。本文に即して説明せよ。", 70,
      "橋の振動数は気温や交通量によって大きく変わるので、その中から小さなひび割れによるごくわずかな変化を見分けるのは非常に難しいということ。",
      ex(["気温や交通量による振動数の変化が大きいことを書いている", ["気温", "交通", "大きく"]], ["その中で小さなひび割れによるわずかな変化を見分けるのが難しいことを書いている", ["ひび割れ", "わずか", "見分け", "難し"]]),
      "たとえの「オーケストラ」と「一つの音」が何にあたるかを決める", [
        ["オーケストラ", "大きな音＝{{気温・交通}}による振動数の大きな変化。"],
        ["一つの音", "一挺のバイオリンの間違った音＝{{小さなひび割れ}}による tiny な変化。"],
      ]),
    TR("en-d", 2, "(D)", "The advantage of this approach is that it may allow engineers to notice signs of trouble long before an inspector goes to look.",
      ["What is good about such a method is that it may make it possible to detect early signs of damage well before inspectors come to check the bridge."],
      tr(["The advantage … is that", "may"], ["notice / detect", "signs of", "long before"], ["利点", "ずっと前に", "兆し"]),
      "「利点は〜ことだ」は The advantage is that SV", [
        ["骨組み", "{{The advantage of this approach is that}} it may allow engineers to notice …。"],
        ["「ずっと前に」", "{{long before}} / well before an inspector goes to look（時の副詞節なので現在形）。"],
      ]),
    WZ("tr-c", "(C)", "this", U.kandai, "老朽化した橋が何千もあり、それをすべて細かく調べるには技術者が少なすぎる国では、どこをいつ調べるべきかを点検員に教え、限られた時間を最も重要なところに使えるようにすることこそ、この技術がもたらす最も価値のあることかもしれない。",
      jz("this ＝ センサーが点検員にどこをいつ調べるべきかを教え、限られた時間を最も重要なところに使えるようにすること", ["どこ", "いつ", "限られた時間"], "too few engineers to do・the most valuable thing that S offers", ["少なすぎ", "最も価値"]),
      "this は直前の段落の「センサーがすること」を受ける", [
        ["指示語", "直前：What sensors do is {{tell inspectors where and when to look}}, so that their limited time is spent where it matters most。"],
        ["構文", "with thousands of ageing bridges and {{too few engineers to examine them all}}：「すべてを調べるには少なすぎる技術者」。"],
      ]),
    C("agree", 2, U.chobun, "本文の内容と一致するものを選べ。", [
      "Long records of how real bridges behave can help engineers design future structures.",
      "Sensors can now tell engineers exactly what kind of damage has occurred.",
      "A bridge's natural frequencies stay the same whatever the temperature is.",
      "The writer believes that human inspectors will soon be unnecessary.",
    ], [
      "正解。最終段落 Such information allows the next generation of structures to be designed with greater confidence に一致。",
      "not exactly what has happened とあり、逆。",
      "寒い朝には上がり、暑い日には下がる。逆。",
      "does not replace human inspectors・Someone still has to go and look とあり、逆。",
    ], "exactly・same など強い言い方を本文と照らす", [
      ["正解の根拠", "Long records … are teaching designers things → {{the next generation of structures}}。"],
      ["誤りの根拠", "{{not exactly}} what has happened・frequencies {{rise}} / {{fall}}・{{does not replace}}。"],
    ]),
  ], [{ word: "deck", meaning: "（橋の）床版・路面" }, { word: "natural frequency", meaning: "固有振動数" }, { word: "ageing", meaning: "老朽化した" }]),

  reading(1, "r-null", "長文読解（「うまくいかなかった実験」の価値）", "The Value of Experiments That Fail", `Imagine that twenty research groups around the world test the same idea: that a certain food supplement improves memory. Suppose, too, that the supplement in fact does nothing at all. By chance alone, one of the twenty groups is likely to find what looks like an effect. That group writes up its results, and a journal, impressed by the surprising finding, publishes them. The other nineteen groups, having found nothing, put their data in a drawer and move on. Anyone who reads the scientific literature will now see a single study showing that the supplement works, and no studies showing that it does not.

This problem is known as publication bias, and it is one of the quieter dangers facing modern science. No one in the story has lied or made a mistake. Each group did its experiment honestly. {{(A) The distortion arises not from any single study but from the way results are filtered before they reach the reader.}} Journals prefer results that are new and positive, and researchers, whose careers depend on publishing, have little reason to spend months writing up an experiment that "didn't work".

The consequences can be serious. In medicine, doctors may (a){{overestimate}} the benefits of a treatment because the trials that found no benefit were never published. In engineering and the physical sciences, the damage is usually less dramatic but still real: other groups waste time and money repeating experiments that have already failed, simply because they have no way of knowing that someone else has tried. {{(B) A failed experiment that is recorded is a signpost; one that is hidden is a trap waiting for the next person to fall into.}}

Several remedies have been proposed. One is pre-registration, in which researchers publicly describe what they plan to do and how they will analyse their data before collecting it. [ 1 ] the plan is public, it becomes much harder to quietly abandon a study whose results are disappointing, or to keep changing the analysis after seeing the data until something interesting appears. Some journals now go further and agree to publish a study on the basis of its design alone, before the results are known. {{(D) 結果がどうであれ論文が掲載されるとわかっていれば、研究者には「失敗」を隠す理由がなくなる。}}

Critics point out that such measures add paperwork to research that is already slow, and that not every kind of science can be planned in advance. Exploratory work, in which a scientist simply examines a new material or a new organism to see what happens, would be poorly served by rigid rules. Most supporters accept this. They argue only that when a study is designed to test a particular claim, the result should be made public whatever it turns out to be.

{{(C) Behind these debates lies a simple point that is easy to forget: knowing that something does not work is itself knowledge.}} A map that shows only the roads that lead somewhere, and leaves out the ones that end at a cliff, is not a complete map. Science, which is often described as a map of the world, needs its dead ends drawn in too.`, [
    V("vocab-a", "(a)", ["judge to be greater than it really is", "fail to notice at all", "measure with great accuracy", "deliberately keep secret"], [
      "正解。over-（過度に）＋estimate（見積もる）＝「過大評価する」。効果がないという試験が公表されないので、効果を大きく見積もってしまう。",
      "「まったく気づかない」では、効果を大きく見るという文脈と合わない。",
      "公表されない試験があるのだから、正確には測れない。逆。",
      "隠しているのは医師ではなく、公表されなかった試験の側。",
    ], "接頭辞 over- は「過度に」", [
      ["語の成り立ち", "{{over}}（過度に）＋ {{estimate}}（見積もる）。"],
      ["文脈", "because the trials that found no benefit were {{never published}} → 効果を実際より大きく見る。"],
    ]),
    C("blank1", 2, U.setsuzoku, "空所［ 1 ］に入る最も適切なものを選べ。", ["Once", "Unless", "Although", "Before"], [
      "正解。「いったん計画が公開されると、都合の悪い研究をこっそりやめるのは難しくなる」。once SV は「いったん〜すると」。",
      "「公開されない限り難しくなる」では逆の意味になる。",
      "「公開されているけれども難しくなる」では、譲歩の関係が成り立たない。",
      "事前登録はデータを集める前に計画を公開するもので、「公開される前に」では意味が通らない。",
    ], "接続詞 once＝「いったん〜すると」", [
      ["前提", "pre-registration：計画を{{データを集める前に公開}}する。"],
      ["因果", "計画が公開されると → こっそりやめることが {{much harder}} → {{Once}}。"],
    ], K),
    WY("tr-a", "(A)", U.kandai, "そのゆがみは、どれか一つの研究から生じるのではなく、結果が読み手に届く前にふるいにかけられるそのやり方から生じるのである。",
      jt("not from A but from B・the way SV", ["ではなく", "やり方", "しかた"], "distortion・arise from・be filtered", ["ゆがみ", "生じる", "ふるい", "選別"]),
      "not A but B の A・B はどちらも from 句", [
        ["骨組み", "The distortion arises {{not from any single study but from the way}} …：「一つの研究からではなく、〜のやり方から生じる」。"],
        ["the way SV", "the way results {{are filtered}} before they reach the reader：「結果が読み手に届く前に選別されるやり方」。"],
      ]),
    WS("ex-b", "下線部(B)で、記録された失敗実験が「道しるべ」、隠された失敗実験が「わな」にたとえられているのはなぜか。本文に即して説明せよ。", 90,
      "記録された失敗は、後の研究者にその実験がうまくいかないことを知らせて無駄を省くが、隠された失敗は、他の研究者に同じ実験を繰り返させ、時間とお金を浪費させるから。",
      ex(["隠された失敗が、他の研究者に同じ実験を繰り返させ時間とお金を浪費させることを書いている", ["繰り返", "時間", "お金", "費用", "浪費", "無駄"]], ["記録された失敗は、うまくいかないことを後の人に知らせることを書いている", ["知らせ", "うまくいかない", "後の"]]),
      "直前の文（同じ失敗の繰り返し）がたとえの中身", [
        ["わな", "直前：other groups {{waste time and money repeating experiments that have already failed}}。"],
        ["道しるべ", "記録されていれば、その道が{{行き止まり}}だとわかる → 同じ失敗を避けられる。"],
      ]),
    TR("en-d", 3, "(D)", "If researchers know that their paper will be published whatever the results are, they will have no reason to hide their \"failures\".",
      ["Once researchers know that their work will appear in print regardless of the results, they no longer have any reason to hide their \"failures\"."],
      tr(["If SV, S will", "know that"], ["whatever the results are / regardless of", "be published", "no reason to hide"], ["結果がどうであれ", "掲載される", "隠す理由がなくなる"]),
      "「〜がどうであれ」は whatever S is / regardless of", [
        ["骨組み", "{{If researchers know that}} their paper will be published …, they will have {{no reason to hide}} …。"],
        ["譲歩", "結果がどうであれ＝ {{whatever the results are}}（本文の whatever it turns out to be と同じ形）。"],
      ]),
    WZ("tr-c", "(C)", "these debates", U.tokushu, "事前登録のような対策が、すでに時間のかかる研究に事務作業を増やし、あらかじめ計画できない探索的な研究には向かないのではないかという議論の背後には、忘れられやすい単純な点がある。それは、何かがうまくいかないと知ることは、それ自体が知識だということである。",
      jz("these debates ＝ 事前登録などの対策が研究に事務作業を増やし、探索的な研究には向かないのではないかという議論", ["事前登録", "事務", "探索"], "Behind A lies B（倒置）・knowing that … is itself knowledge", ["背後", "それ自体"]),
      "Behind … lies S は場所の句を前に出した倒置", [
        ["指示語", "these debates＝前段落の批判（{{add paperwork}}・{{not every kind of science can be planned}}）とそれへの応答。"],
        ["倒置", "{{Behind these debates lies a simple point}}：主語は a simple point。コロン以下がその中身。"],
      ]),
    C("agree", 2, U.chobun, "本文の内容と一致するものを選べ。", [
      "In the writer's example, none of the research groups behaved dishonestly.",
      "Pre-registration is suitable for every kind of scientific research.",
      "Publication bias does more serious damage in engineering than in medicine.",
      "Most journals now publish studies before their results are known.",
    ], [
      "正解。第2段落 No one in the story has lied or made a mistake. Each group did its experiment honestly に一致。",
      "探索的な研究には rigid rules は向かないとあり、支持者もそれを認めている。",
      "工学では usually less dramatic とあり、逆。",
      "Some journals（一部の雑誌）であって、多くの雑誌ではない。",
    ], "Some ↔ Most のような数量の言いかえに注意", [
      ["正解の根拠", "No one … has {{lied or made a mistake}}・did its experiment {{honestly}}。"],
      ["誤りの根拠", "{{Some}} journals・{{less dramatic}}・poorly served by {{rigid rules}}。"],
    ]),
  ], [{ word: "supplement", meaning: "栄養補助食品" }, { word: "pre-registration", meaning: "事前登録" }, { word: "exploratory", meaning: "探索的な" }]),

  reading(1, "r-heat", "長文読解（計算の見えないコスト）", "The Hidden Cost of Computation", `Every time we send a message, stream a video or ask a search engine a question, a machine somewhere does some work. Because that machine is out of sight, it is easy to imagine that digital activity has no physical cost. It does. The data centres that store and process the world's information consume a significant share of the electricity produced in many countries, and almost all of that electricity ends up, in the end, as heat.

{{(A) That a computer should turn nearly all the energy it uses into heat may seem surprising, since its purpose is to process information rather than to warm a room.}} Yet from the point of view of physics, a computer resembles an electric heater that happens to perform calculations along the way. The electrical energy that flows through its circuits is not stored in the answers it produces; it is (a){{dissipated}} as the tiny switches inside the chips turn on and off billions of times every second.

This heat creates a second problem. If it is not removed, the chips overheat and fail. In a large data centre, cooling can use a considerable amount of electricity in addition to that consumed by the computers themselves. For this reason, engineers have long judged the efficiency of a data centre by comparing the total energy it uses with the energy delivered to its computing equipment. In older facilities, the cooling and other systems could consume almost as much as the computers did. Careful design has reduced this overhead greatly. {{(B) Some operators have even built their facilities in cold regions, where outside air can do much of the work that air-conditioning machines once did.}}

Others have begun to treat heat not as waste but as a resource. In several northern cities, the warm water produced by cooling data centres is piped into district heating networks and used to warm homes and offices. {{(D) コンピューターが計算のついでに生み出す熱で何千もの家庭が冬を暖かく過ごせるのなら、それを捨ててしまうのはもったいない。}} Such schemes have limits, of course. They work only where there is a demand for heat close to the data centre, and the water from computers is warm rather than hot, so it often needs to be heated further before it can be used.

The most effective way to reduce the energy cost of computing, however, may be to compute more cleverly. The efficiency of chips has improved enormously over the decades, so that the energy needed for a single calculation is a tiny fraction of what it once was. [ 1 ], total energy use has continued to rise, because cheaper computation has encouraged us to compute far more. {{(C) This pattern, in which greater efficiency leads to greater consumption rather than less, has been observed with many technologies, from steam engines to lighting.}}

None of this means that we should feel guilty every time we look something up. But it does suggest that the digital world is part of the physical one, governed by the same laws of energy, and that its costs, though hidden, are real.`, [
    V("vocab-a", "(a)", ["lost by spreading out", "carefully stored", "produced again", "measured exactly"], [
      "正解。dissipate は「（エネルギー・熱などを）散らして失う」。エネルギーは答えの中に蓄えられず、スイッチの切り替えのたびに熱として散っていく。",
      "直前の is not stored in the answers と逆。",
      "「再び作られる」では、熱になって失われるという流れに合わない。",
      "「正確に測られる」では文意が通らない。",
    ], "セミコロンの前後（stored ↔ dissipated）の対比", [
      ["対比", "is {{not stored}} in the answers; it is {{dissipated}} → 蓄えられずに散っていく。"],
      ["段落の主張", "コンピューターは{{電気ヒーター}}のようなもの → エネルギーは熱として失われる。"],
    ]),
    C("blank1", 2, U.setsuzoku, "空所［ 1 ］に入る最も適切なものを選べ。", ["Nevertheless", "Therefore", "For example", "In other words"], [
      "正解。「1回の計算に要るエネルギーはごくわずかになった。それにもかかわらず、総使用量は増え続けた」という逆接。",
      "効率が上がったことから、総使用量が増えたという結論は導けない（理由は because 以下）。",
      "後ろの文は前の文の具体例ではない。",
      "後ろの文は前の文の言いかえではなく、予想に反する結果。",
    ], "予想（効率↑→使用量↓）に反する結果は逆接", [
      ["前", "energy needed for a single calculation is {{a tiny fraction}} of what it once was。"],
      ["後", "total energy use has {{continued to rise}} → {{Nevertheless}}。"],
    ], K),
    WY("tr-a", "(A)", U.bunshi, "コンピューターが使うエネルギーのほとんどすべてを熱に変えてしまうというのは意外に思えるかもしれない。コンピューターの目的は、部屋を暖めることではなく情報を処理することだからである。",
      jt("That 節の主語・may seem surprising・since SV（理由）・A rather than B", ["というのは", "ことは", "から", "ではなく"], "turn A into B・process information", ["熱に変え", "処理"]),
      "文頭の That SV は名詞節の主語。should は驚きを表すので訳さない", [
        ["主語", "{{That a computer should turn nearly all the energy it uses into heat}}：「コンピューターが使うエネルギーのほぼすべてを熱に変えること」。"],
        ["理由", "{{since}} its purpose is to process information {{rather than}} to warm a room：「部屋を暖めるのではなく情報を処理するのが目的だから」。"],
      ]),
    WS("ex-b", "下線部(B)のように、寒い地域にデータセンターを建てる事業者がいるのはなぜか。本文に即して説明せよ。", 70,
      "寒い地域では外気でコンピューターを冷やせるので、冷房の機械に使っていた電力を減らし、データセンター全体のエネルギーの無駄を小さくできるから。",
      ex(["外気で冷やせるので冷房の電力を減らせることを書いている", ["外気", "冷", "電力"]], ["データセンター全体の効率が上がる（冷却などの余分なエネルギーが減る）ことを書いている", ["効率", "無駄", "全体"]]),
      "前の文脈（冷却に電気がかかる）と結びつける", [
        ["問題", "cooling can use {{a considerable amount of electricity}}・古い施設では冷却などがコンピューターと同じくらい使った。"],
        ["解決", "寒い地域では {{outside air}} が冷房の機械の仕事をする → 冷却の電力が減る。"],
      ]),
    TR("en-d", 3, "(D)", "If the heat that computers produce as a by-product of calculation can keep thousands of homes warm in winter, it would be a waste to throw it away.",
      ["When the heat generated by computers while they calculate is able to keep thousands of households warm through the winter, it is a pity to simply throw it away."],
      tr(["If SV, it would be … to do", "keep O C"], ["by-product / while calculating", "waste / pity", "throw away"], ["計算のついでに", "何千もの家庭", "もったいない"]),
      "「もったいない」は it would be a waste to do", [
        ["骨組み", "If the heat … can {{keep thousands of homes warm}} in winter, {{it would be a waste to throw it away}}。"],
        ["「ついでに」", "{{as a by-product of calculation}}：本文の perform calculations along the way を意識すると流れに合う。"],
      ]),
    WY("tr-c", "(C)", U.kandai, "効率が上がることが消費の減少ではなくかえって増加につながるというこのパターンは、蒸気機関から照明に至るまで、多くの技術で観察されてきた。",
      jt("This pattern, in which SV, has been observed・A rather than B", ["パターン", "観察されて", "ではなく"], "lead to・from A to B", ["つながる", "至るまで"]),
      "主語と動詞の間に関係詞節がはさまっている", [
        ["骨組み", "{{This pattern}}, in which …, {{has been observed}} with many technologies：主語と動詞をまず結ぶ。"],
        ["関係詞節", "in which greater efficiency {{leads to greater consumption rather than less}}：「効率向上が消費の減少ではなく増加につながる」。"],
      ]),
    C("agree", 2, U.chobun, "本文の内容と一致するものを選べ。", [
      "Using waste heat from data centres for heating works only where there is a demand for heat nearby.",
      "Computers store most of the energy they use in the answers they produce.",
      "Improvements in chip efficiency have reduced the total energy used for computing.",
      "The writer argues that people should feel guilty about searching online.",
    ], [
      "正解。第4段落 They work only where there is a demand for heat close to the data centre に一致。",
      "is not stored in the answers とあり、逆。",
      "total energy use has continued to rise とあり、逆。",
      "None of this means that we should feel guilty とあり、逆。",
    ], "否定（not・None）を含む文を逆に読まない", [
      ["正解の根拠", "They work {{only where there is a demand for heat}} close to the data centre。"],
      ["誤りの根拠", "{{not stored}}・{{continued to rise}}・{{None of this means}} …。"],
    ]),
  ], [{ word: "data centre", meaning: "データセンター" }, { word: "overhead", meaning: "（本来の仕事以外にかかる）余分な負担・経費" }, { word: "district heating", meaning: "地域暖房" }]),

  reading(1, "r-battery", "長文読解（電池の進歩はなぜゆっくりか）", "Why Batteries Improve Slowly", `Over the past half century, the number of transistors that can be placed on a chip has grown by a factor of many millions. Batteries have improved too, but far more slowly. The amount of energy that the best rechargeable batteries can store for a given weight has increased only several times over the same period. To people used to the rapid progress of electronics, this can look like a failure of effort or imagination. In fact, it reflects a basic difference between the two technologies.

The progress of chips depended largely on making their parts smaller. A smaller switch uses less energy and works faster, so shrinking everything brought benefits on several fronts at once. {{(A) A battery cannot be improved in the same way, because the energy it stores is held in chemical bonds, and no amount of shrinking will make those bonds hold more energy.}} To store more energy in the same weight, battery scientists must find materials that react more strongly, or that can hold more of the charged particles that carry energy back and forth between the battery's two ends.

Such materials exist, but they bring difficulties of their own. Some swell so much when they are charged that they crack after a few cycles. Others react with the liquid inside the battery and slowly use it up. Still others perform well in the laboratory but are too rare or too expensive to be used in millions of cars. {{(B) A new battery material, in other words, must pass not one test but many, and failing any one of them is enough to keep it out of the market.}} It must store a great deal of energy, survive thousands of charges, remain safe if damaged, and be cheap to make in enormous quantities.

Safety deserves particular attention. A battery is, in a sense, a container of energy that is designed to be released slowly. If something goes wrong, for example if the thin layer that separates the two ends is damaged, the energy may be released all at once as heat. The more energy a battery stores, the more (a){{severe}} the consequences of such a failure can be. {{(D) 電池の性能を高めることは、同時にその危険性を高めることでもあるという点を忘れてはならない。}}

[ 1 ] these obstacles, batteries have steadily become cheaper and better, and the improvement has had large effects. Electric cars that once seemed impractical are now common in many countries, and large batteries are increasingly used to store electricity from solar and wind power for use when the sun is not shining and the wind is not blowing. {{(C) These changes have come less from any single breakthrough than from thousands of small improvements in materials, design and manufacturing.}}

This may be the most important lesson of battery research. Progress in technology is often imagined as a series of dramatic discoveries. In many fields, however, it looks more like the slow, patient work of an engineer who adjusts one thing at a time, tests it, and adjusts again.`, [
    V("vocab-a", "(a)", ["serious", "slight", "predictable", "temporary"], [
      "正解。severe は「（被害などが）深刻な・ひどい」。蓄えるエネルギーが多いほど、一度に放出されたときの結果は深刻になる。",
      "「わずかな」は反対の意味。",
      "「予測できる」では、エネルギー量が多いほど…という比例の関係と合わない。",
      "「一時的な」では文意が通らない。",
    ], "The more …, the more ～ の比例関係から考える", [
      ["比例", "{{The more energy}} a battery stores, {{the more severe}} the consequences → 多いほど深刻。"],
      ["前文", "the energy may be released {{all at once as heat}}（一度に放出）→ 深刻な結果。"],
    ]),
    C("blank1", 2, U.zenchishi, "空所［ 1 ］に入る最も適切なものを選べ。", ["Despite", "Because of", "Instead of", "Apart from"], [
      "正解。「これらの障害にもかかわらず、電池は着実に安くよくなってきた」。",
      "障害が原因で安くよくなった、という因果関係は成り立たない。",
      "「障害の代わりに」では意味が通らない。",
      "「障害は別として」は、障害を乗りこえて進歩したという流れより弱く、文意もずれる。",
    ], "障害 ↔ 進歩 の逆接は前置詞 despite", [
      ["前", "these obstacles＝{{膨張・液との反応・高価}}・{{安全性}}の問題。"],
      ["後", "batteries have {{steadily become cheaper and better}} → 「〜にもかかわらず」の {{Despite}}。"],
    ], K),
    WY("tr-a", "(A)", U.tokushu, "電池は同じやり方で改良することはできない。電池が蓄えるエネルギーは化学結合の中に保たれており、どれほど小さくしても、それらの結合により多くのエネルギーを保たせることはできないからである。",
      jt("because SV, and SV・no amount of doing will …（どれほど〜してもできない）", ["からである", "どれほど", "いくら"], "chemical bonds・make O do", ["化学結合", "保たせ", "蓄え"]),
      "no amount of A will do は「どれだけAしても〜しない」", [
        ["前半", "A battery {{cannot be improved in the same way}}：同じやり方＝前文の{{部品を小さくすること}}。"],
        ["否定", "{{no amount of shrinking}} will make those bonds hold more energy：「いくら小さくしても〜させられない」。"],
      ]),
    WS("ex-b", "下線部(B)の many tests とは、具体的にどのような条件か。本文に即して説明せよ。", 80,
      "同じ重さでより多くのエネルギーを蓄えられ、何千回もの充電に耐え、損傷しても安全で、大量に安く製造できるという条件をすべて満たすこと。",
      ex(["多くのエネルギーを蓄えること・何千回もの充電に耐えることを書いている", ["エネルギー", "充電", "耐え"]], ["損傷しても安全であること・大量に安く作れることを書いている", ["安全", "安く", "大量"]]),
      "直後の It must … の文に条件が並んでいる", [
        ["条件", "直後：store a great deal of energy／{{survive thousands of charges}}／{{remain safe if damaged}}／{{be cheap to make}}。"],
        ["補足", "一つでも満たさなければ市場に出られない（{{failing any one of them}} is enough …）。"],
      ]),
    TR("en-d", 2, "(D)", "We must not forget that improving the performance of a battery also means increasing its danger.",
      ["It should be remembered that making a battery perform better makes it more dangerous at the same time."],
      tr(["We must not forget that", "動名詞の主語"], ["improve the performance", "also / at the same time", "danger / dangerous"], ["性能を高める", "同時に", "危険性を高める"]),
      "「AはBでもある」は doing A also means doing B", [
        ["骨組み", "{{We must not forget that}} SV：「〜という点を忘れてはならない」。"],
        ["動名詞", "{{improving the performance}} of a battery {{also means increasing}} its danger。"],
      ]),
    WZ("tr-c", "(C)", "These changes", U.hikaku, "かつては実用的でないと思われていた電気自動車が多くの国でありふれたものになり、太陽光や風力の電気を蓄えるために大型の電池がますます使われるようになったという変化は、何か一つの大発見によるというよりも、材料・設計・製造における何千もの小さな改良によってもたらされた。",
      jz("These changes ＝ 電気自動車が普及し、太陽光・風力の電気を大型電池に蓄えるようになったこと", ["電気自動車", "太陽", "風力", "蓄え"], "come less from A than from B（AよりむしろBから生じる）", ["というよりも", "よりむしろ"]),
      "less A than B は「AというよりむしろB」", [
        ["指示語", "直前：{{Electric cars}} … are now common・large batteries are used to {{store electricity from solar and wind power}}。"],
        ["比較", "have come {{less from any single breakthrough than from thousands of small improvements}}。"],
      ]),
    C("agree", 2, U.chobun, "本文の内容と一致するものを選べ。", [
      "Some promising battery materials are too rare or too expensive for mass production.",
      "Batteries have improved as quickly as computer chips have.",
      "Making battery parts smaller is the main way to increase the energy they store.",
      "Most progress in batteries has come from one dramatic discovery.",
    ], [
      "正解。第3段落 Still others … are too rare or too expensive to be used in millions of cars に一致。",
      "far more slowly とあり、逆。",
      "no amount of shrinking will make those bonds hold more energy とあり、逆。",
      "less from any single breakthrough than from thousands of small improvements とあり、逆。",
    ], "比較（as … as・far more）の向きを確かめる", [
      ["正解の根拠", "{{too rare or too expensive}} to be used in millions of cars。"],
      ["誤りの根拠", "{{far more slowly}}・{{no amount of shrinking}}・{{less from any single breakthrough}}。"],
    ]),
  ], [{ word: "transistor", meaning: "トランジスタ" }, { word: "chemical bond", meaning: "化学結合" }, { word: "charged particle", meaning: "荷電粒子" }]),

  reading(1, "r-model", "長文読解（モデルとシミュレーションの使い方）", "Useful Simplifications", `Before a new aircraft flies, before a skyscraper is built, and before a weather forecast is announced, someone has run a model. A model, in this sense, is a simplified description of some part of the world, usually written as equations and solved by a computer. It allows engineers and scientists to ask "What would happen if ...?" without having to build the aircraft or wait for the storm.

Every model leaves things out. A model of the air flowing over a wing may ignore the tiny scratches on its surface; a weather model divides the atmosphere into boxes several kilometres wide and treats everything inside each box as if it were the same. {{(A) Far from being a weakness, this simplification is what makes models useful, for a model as detailed as the world itself would be as difficult to understand as the world.}} The skill of the modeller lies in deciding what can safely be left out.

That decision, however, depends on the question being asked. A model that ignores surface scratches may predict the lift of a wing very well, but it will tell us nothing about how ice forms on the wing in cold weather. {{(B) Trouble begins when a model built to answer one question is quietly used to answer another.}} Because its results come out as precise numbers on a screen, it is easy to forget the assumptions that lie behind them.

How, then, can we know whether a model is good enough? The most important test is comparison with reality. Weather forecasters check every day whether yesterday's forecast came true, and they have used decades of such checks to improve their models steadily. Engineers test small models of bridges and aircraft in wind tunnels and compare the measurements with their calculations. [ 1 ] such checks, a model is little more than an educated guess, however impressive its mathematics may be.

Another useful practice is to run a model many times with slightly different starting conditions. Weather forecasters do this (a){{routinely}}. If most of the runs predict rain tomorrow, the forecast can be given with confidence; if they disagree widely, the honest answer is that the future is uncertain. {{(D) 予測がどのくらい確かなのかを示すことは、予測そのものと同じくらい重要である。}} A forecast of "a 70 percent chance of rain" is more useful than a confident but unreliable promise of sunshine.

{{(C) Models, then, are best understood not as crystal balls but as tools for thinking, which help us to reason clearly about systems too complicated to grasp all at once.}} Used with an awareness of their limits, they are among the most powerful instruments science has ever produced. Used without it, they can give a false sense of certainty that is more dangerous than having no model at all.`, [
    V("vocab-a", "(a)", ["as a regular practice", "only in emergencies", "for the first time", "without permission"], [
      "正解。routinely は「いつも決まって・日常的に」。予報官は条件を少し変えてモデルを何度も走らせることを日常的に行っている。",
      "「緊急時だけ」では、次の文の毎日の予報の説明と合わない。",
      "「初めて」では、予報官がふだんしていることという文脈に合わない。",
      "「許可なく」では意味が通らない。",
    ], "routine（決まった手順）の副詞形", [
      ["語", "{{routine}}（決まった手順）→ {{routinely}}（いつも決まって）。"],
      ["文脈", "次の文：If most of the runs predict rain tomorrow … → {{ふだんの予報}}のやり方。"],
    ]),
    C("blank1", 2, U.zenchishi, "空所［ 1 ］に入る最も適切なものを選べ。", ["Without", "With", "Through", "Besides"], [
      "正解。「そうした照合がなければ、モデルは数学がどれほど見事でも推測にすぎない」。",
      "「照合があればただの推測」では、照合が最も重要な試験だという主張と逆。",
      "「照合を通じてただの推測になる」では意味が通らない。",
      "「照合に加えて」では、little more than an educated guess とつながらない。",
    ], "little more than ～（～にすぎない）と組む条件は否定", [
      ["主張", "The most important test is {{comparison with reality}}。"],
      ["後半", "a model is {{little more than an educated guess}} → 照合が{{なければ}}：{{Without}}。"],
    ], K),
    WY("tr-a", "(A)", U.hikaku, "この単純化は弱点であるどころか、モデルを役に立つものにしているものである。というのも、世界そのものと同じくらい詳しいモデルは、世界と同じくらい理解しにくいだろうからである。",
      jt("Far from being A・what makes O C・for SV（理由）・as … as", ["どころか", "ものである", "というのも", "同じくらい"], "simplification・detailed", ["単純化", "詳し", "詳細"]),
      "far from A は「Aどころか・決してAではない」", [
        ["前半", "{{Far from being a weakness}}, this simplification is {{what makes models useful}}：「弱点どころか、モデルを役立つものにしているもの」。"],
        ["理由", "{{for}} a model {{as detailed as the world itself}} would be {{as difficult to understand as}} the world：仮定の would。"],
      ]),
    WS("ex-b", "下線部(B)のようなことが起こる例を本文から挙げ、それがなぜ見落とされやすいのかも含めて説明せよ。", 80,
      "翼の揚力を予測するため表面の傷を無視したモデルを、着氷の予測に使うような場合で、結果が画面上に精密な数値で示されるため、前提となる仮定が忘れられやすいから。",
      ex(["揚力用に表面の傷を無視したモデルを着氷の予測に使う例を書いている", ["揚力", "傷", "着氷", "氷"]], ["結果が精密な数値で示されるため仮定が忘れられやすいことを書いている", ["精密", "数値", "仮定", "前提"]]),
      "直前の具体例と直後の理由の両方を使う", [
        ["例", "直前：傷を無視したモデルは {{lift}} はよく予測するが {{how ice forms}} については何も教えない。"],
        ["理由", "直後：results come out as {{precise numbers on a screen}} → {{assumptions}} を忘れやすい。"],
      ]),
    TR("en-d", 3, "(D)", "Showing how reliable a forecast is matters as much as the forecast itself.",
      ["Indicating how certain a prediction is is just as important as the prediction itself."],
      tr(["動名詞の主語", "as … as", "間接疑問（how reliable S is）"], ["matter / be important", "forecast / prediction", "itself"], ["どのくらい確か", "予測そのもの", "同じくらい重要"]),
      "「どのくらい確かか」は how reliable S is", [
        ["主語", "{{Showing how reliable a forecast is}}：間接疑問は〈how＋形容詞＋S＋V〉の語順。"],
        ["比較", "{{matters as much as the forecast itself}}：is is が続くのを避けるなら matter を使う。"],
      ]),
    WY("tr-c", "(C)", U.kandai, "したがって、モデルは水晶玉としてではなく、一度に把握するには複雑すぎるシステムについて明晰に推論する助けとなる、考えるための道具として理解するのがいちばんよい。",
      jt("be best understood not as A but as B・too … to do", ["ではなく", "いちばんよい", "すぎる"], "crystal ball・reason clearly・grasp", ["水晶玉", "推論", "把握"]),
      "not as A but as B「Aとしてではなく、Bとして」", [
        ["骨組み", "Models are {{best understood not as crystal balls but as tools for thinking}}：「〜として理解するのが最もよい」。"],
        ["後ろの修飾", "which help us to reason … about systems {{too complicated to grasp all at once}}：「一度に把握するには複雑すぎる」。"],
      ]),
    C("agree", 2, U.chobun, "本文の内容と一致するものを選べ。", [
      "Weather forecasters have improved their models by checking past forecasts against what actually happened.",
      "A good model should include every detail of the real world.",
      "If different runs of a model disagree widely, the forecast can be given with confidence.",
      "The writer thinks that having no model is always better than using one.",
    ], [
      "正解。第4段落 they have used decades of such checks to improve their models steadily に一致。",
      "単純化こそモデルを役立つものにしているとあり、逆。",
      "大きく食い違うなら the future is uncertain と答えるのが正直だとあり、逆。",
      "限界を意識せずに使った場合に限っての話で、always ではない。",
    ], "条件つきの主張（Used without it …）を一般化しない", [
      ["正解の根拠", "decades of such checks to {{improve their models steadily}}。"],
      ["誤りの根拠", "{{Far from being a weakness}}・if they disagree widely … {{uncertain}}・{{Used without it}}（条件つき）。"],
    ]),
  ], [{ word: "lift", meaning: "揚力" }, { word: "wind tunnel", meaning: "風洞" }, { word: "crystal ball", meaning: "（占いに使う）水晶玉" }]),
];

// =====================================================================
// 第2問　長文読解（研究と技術の現場。やや短め）
//   どの節も 5問：空所(2)・下線部和訳(2)・内容説明(3)・日本文の英訳(2〜3)・内容一致(2)
// =====================================================================

const P2: ExamPoolSection[] = [
  reading(2, "r-notebook", "長文読解（実験ノートを書く理由）", "Why Researchers Keep Notebooks", `In most laboratories, every researcher keeps a notebook. Into it go the date, the materials used, the settings of each instrument, and the results of each experiment, including the ones that seem to have gone wrong. To a new student, this can feel like tiresome bookkeeping. Why write down what the thermometer read at ten o'clock, when the experiment has clearly failed?

The answer is that no one knows in advance which details will turn out to matter. A result that makes no sense today may become meaningful months later, when someone notices that it was obtained on an unusually humid day, or with a new bottle of a chemical from a different supplier. {{(A) If those conditions were never recorded, there is no way of going back to find out what made the difference.}} More than one surprising discovery has begun with a researcher looking back through old records and noticing a pattern that no one had been looking for.

Careful records matter for another reason as well: they allow others to repeat the work. [ 1 ] a result has been reproduced by another group, it remains a single observation that might have been caused by an error, an impurity, or simple chance. {{(B) Yet a published paper rarely contains every detail of how an experiment was carried out, and other researchers who try to repeat it often find that they cannot.}} In such cases, the original notebook may be the only place where the missing information can be found.

Today, many laboratories are moving from paper notebooks to electronic ones. These make records easier to search and share, and instruments can send their readings directly into them, which reduces errors in copying numbers by hand. {{(C) しかし、記録の道具が変わっても、何をなぜ記録するのかを考える習慣の大切さは変わらない。}} A notebook, whether paper or electronic, is only as useful as the care with which it is kept.`, [
    C("blank1", 2, U.setsuzoku, "空所［ 1 ］に入る最も適切なものを選べ。", ["Until", "Because", "Although", "If"], [
      "正解。「ほかのグループが再現するまでは、その結果は誤りや偶然によるかもしれない一回の観察にすぎない」。",
      "再現されたことが、一回の観察にとどまる理由にはならない。",
      "「再現されたけれども一回の観察のまま」では矛盾する。",
      "「再現されたら一回の観察にすぎない」では逆の意味になる。",
    ], "remains（〜のままである）と組むのは until", [
      ["主節", "it {{remains}} a single observation：まだ確かめられていない状態が続く。"],
      ["接続詞", "その状態が終わるのは再現されたとき → {{Until}}「〜するまでは」。"],
    ], K),
    WY("tr-a", "(A)", U.kandai, "もしそうした条件が記録されていなかったなら、何が違いを生んだのかを確かめるためにさかのぼる方法はない。",
      jt("If S were never done, there is no way of doing・find out 間接疑問", ["もし", "方法はない", "すべはない"], "those conditions（湿度の高い日・別の業者の薬品）・make a difference", ["条件", "違いを生ん", "さかのぼ"]),
      "there is no way of doing は「〜する方法がない」", [
        ["条件", "{{If those conditions were never recorded}}：those conditions＝直前の{{湿度の高い日}}・{{別の業者の新しい薬品}}。"],
        ["主節", "{{there is no way of going back to find out what made the difference}}：「何が違いを生んだのかを知るためにさかのぼる方法はない」。"],
      ]),
    WS("ex-b", "下線部(B)のような場合に、元の実験ノートが重要になるのはなぜか。本文に即して説明せよ。", 60,
      "論文には実験の細部がすべては書かれていないので、再現に必要なのに論文から抜けている情報が元のノートにしか残っていないことがあるから。",
      ex(["論文には実験の細部がすべては書かれていないことを書いている", ["論文", "細部", "すべて"]], ["抜けている情報がノートにしか残っていないことを書いている", ["ノート", "しか", "抜けて"]]),
      "直後の In such cases の文が答えの中心", [
        ["問題", "a published paper {{rarely contains every detail}} → 再現できないことがある。"],
        ["ノート", "the original notebook may be {{the only place}} where {{the missing information}} can be found。"],
      ]),
    TR("en-c", 2, "(C)", "However, even if the tools for keeping records change, the importance of the habit of thinking about what to record and why does not.",
      ["But no matter how the tools we use for record-keeping change, it remains just as important to get into the habit of considering what should be recorded and why."],
      tr(["even if SV", "S does not (change)"], ["the habit of doing", "what to record and why", "importance"], ["道具が変わっても", "何をなぜ", "習慣の大切さ"]),
      "「〜しても」は even if。くり返しの動詞は does not で受ける", [
        ["骨組み", "{{even if the tools for keeping records change}}, the importance … {{does not}}（change の省略）。"],
        ["名詞句", "何をなぜ記録するのか＝ {{what to record and why}}：疑問詞＋to do。"],
      ]),
    C("agree", 2, U.chobun, "本文の内容と一致するものを選べ。", [
      "Electronic notebooks can reduce mistakes made when numbers are copied by hand.",
      "Researchers should record only the results of successful experiments.",
      "A result observed only once is usually accepted as reliable.",
      "Published papers normally include every detail of how an experiment was done.",
    ], [
      "正解。第4段落 instruments can send their readings directly into them, which reduces errors in copying numbers by hand に一致。",
      "including the ones that seem to have gone wrong とあり、失敗も記録する。",
      "誤り・不純物・偶然によるかもしれない一回の観察にすぎない、とあり逆。",
      "rarely contains every detail とあり、逆。",
    ], "only・every などの限定語を本文と照らす", [
      ["正解の根拠", "which {{reduces errors in copying numbers by hand}}。"],
      ["誤りの根拠", "{{including the ones that seem to have gone wrong}}・{{rarely contains every detail}}。"],
    ]),
  ], [{ word: "bookkeeping", meaning: "記帳・記録の作業" }, { word: "impurity", meaning: "不純物" }]),

  reading(2, "r-concrete", "長文読解（自分でひび割れを直すコンクリート）", "Concrete That Heals Itself", `Concrete is the most widely used building material in the world, and it has one persistent weakness: it cracks. Small cracks are almost unavoidable as concrete dries and as buildings are loaded and unloaded over the years. On their own they are rarely dangerous, but they allow water and salt to reach the steel bars inside, which then begin to rust. {{(A) Because rust takes up more space than the steel from which it forms, it pushes the surrounding concrete apart and turns small cracks into large ones.}}

For decades, the only remedy was repair: inspecting structures, finding cracks, and filling them by hand. In recent years, however, researchers have explored a different approach. They mix into the concrete the spores of certain bacteria that can survive for years in a dormant state, together with a source of food. As long as the concrete remains intact, nothing happens. When a crack forms and water enters, the bacteria wake up, consume the food, and produce a mineral similar to limestone, which gradually fills the crack.

{{(B) The idea is appealing because it turns the very thing that causes damage, water entering a crack, into the signal that starts the repair.}} In laboratory tests, cracks a fraction of a millimetre wide have been sealed within a few weeks. [ 1 ], many questions remain. The bacteria add to the cost of the concrete, and it is not yet clear how long they can survive in real structures, which may stand for a century or more. Wider cracks, too, are beyond what the bacteria can fill.

{{(C) それでも、ひび割れが小さいうちに自然にふさがれば、補修にかかる費用と手間を大きく減らせるかもしれない。}} Engineers are therefore testing the material first in places where cracks are hard to reach, such as tunnels and underground walls.`, [
    C("blank1", 2, U.setsuzoku, "空所［ 1 ］に入る最も適切なものを選べ。", ["However", "Therefore", "For instance", "Likewise"], [
      "正解。「実験室では数週間でひびがふさがった。しかし、多くの疑問が残っている」という逆接。",
      "実験がうまくいったことは、疑問が残る理由ではない。",
      "後ろの文は前の文の具体例ではない。",
      "「同様に」では、成功↔課題の対比が表せない。",
    ], "成果のあとに課題が続けば逆接", [
      ["前", "cracks … {{have been sealed within a few weeks}}（成果）。"],
      ["後", "{{many questions remain}}（費用・寿命・幅の広いひび）→ {{However}}。"],
    ], K),
    WY("tr-a", "(A)", U.kandai, "さびはそれができるもとの鋼よりも大きな体積を占めるので、周りのコンクリートを押し広げ、小さなひび割れを大きなひび割れに変えてしまう。",
      jt("Because SV, S pushes … and turns A into B・the steel from which it forms", ["ので", "変えて", "もとの"], "take up space・push apart", ["体積", "場所", "占め", "押し広げ"]),
      "from which it forms は「それ（さび）ができるもとの」", [
        ["理由", "rust {{takes up more space than the steel from which it forms}}：「さびは、それが生じるもとの鋼より多くの場所を占める」。"],
        ["結果", "{{pushes the surrounding concrete apart}} and {{turns small cracks into large ones}}。"],
      ]),
    WS("ex-b", "下線部(B)の「損傷を引き起こすもの」が「修復を始める合図」になるとは、どういうことか。本文に即して説明せよ。", 70,
      "ひび割れから入る水は鉄筋をさびさせる原因だが、その水が眠っていた細菌を目覚めさせ、ひびを埋める鉱物を作らせるきっかけになるということ。",
      ex(["ひび割れから入る水が、細菌を目覚めさせ鉱物でひびを埋めさせるきっかけになることを書いている", ["細菌", "目覚め", "鉱物", "埋め"]], ["その水が本来は鉄筋をさびさせる損傷の原因であることを書いている", ["さび", "鉄筋", "原因"]]),
      "同格の water entering a crack が「損傷の原因」の中身", [
        ["損傷の原因", "{{water entering a crack}}：第1段落で水と塩が鉄筋に届き{{さびる}}。"],
        ["修復の合図", "When a crack forms and water enters, {{the bacteria wake up}} … produce a mineral → ひびを埋める。"],
      ]),
    TR("en-c", 3, "(C)", "Even so, if cracks were sealed naturally while they were still small, the cost and effort of repairs might be greatly reduced.",
      ["Still, if cracks could close up by themselves while they are small, it might be possible to save a great deal of the money and labour spent on repairs."],
      tr(["Even so", "if S were done, S might be done（仮定法）"], ["seal / close up", "while still small", "cost and effort"], ["小さいうちに", "自然に", "大きく減らせる"]),
      "「〜うちに」は while S is still …", [
        ["つなぎ", "直前の課題を受けて「それでも」＝ {{Even so}} / Still。"],
        ["骨組み", "if cracks {{were sealed naturally while they were still small}}, the cost … {{might be greatly reduced}}。"],
      ]),
    C("agree", 2, U.chobun, "本文の内容と一致するものを選べ。", [
      "The bacteria remain inactive as long as the concrete has no cracks.",
      "The bacteria can fill cracks of any width.",
      "Self-healing concrete has already been shown to last for a century.",
      "Small cracks in concrete are usually dangerous in themselves.",
    ], [
      "正解。第2段落 As long as the concrete remains intact, nothing happens に一致。",
      "Wider cracks … are beyond what the bacteria can fill とあり、逆。",
      "how long they can survive in real structures は not yet clear。",
      "On their own they are rarely dangerous とあり、逆。",
    ], "not yet clear（まだわからない）を「証明された」と読まない", [
      ["正解の根拠", "As long as the concrete {{remains intact}}, {{nothing happens}}。"],
      ["誤りの根拠", "Wider cracks … {{beyond}}・{{not yet clear}}・{{rarely dangerous}}。"],
    ]),
  ], [{ word: "spore", meaning: "胞子・芽胞" }, { word: "dormant", meaning: "休眠中の" }, { word: "limestone", meaning: "石灰岩" }]),

  reading(2, "r-birds", "長文読解（録音で森の鳥を数える）", "Counting Birds by Ear", `Counting wild animals has always been slow, expensive work. To survey the birds of a forest, trained observers walk set routes at dawn, noting every species they see or hear. Their knowledge is remarkable, but there are never enough of them, and a single survey records only one morning in one place.

A cheaper method is now spreading: leaving small recorders in the forest for weeks at a time. The recorders capture every sound, day and night, producing thousands of hours of audio. {{(A) No human could listen to so much material, which is why researchers have turned to computer programs trained to recognize the calls of particular species.}} Given many examples of a bird's song, such a program learns to pick it out from the noise of wind, rain and insects, and can process a month of recordings in a few hours.

The results have been striking. Recorders have detected rare species in places where observers had never found them, often because the birds called only at night or in bad weather, when no one was there to listen. [ 1 ], the programs make mistakes. They may confuse two species with similar calls, or miss a bird singing far from the microphone. {{(B) For this reason, researchers still check a sample of the program's identifications by ear, and the experts whose work the machines were supposed to replace have become more important, not less.}} Their judgments are needed both to train the programs and to correct them.

{{(C) この技術は鳥の調査員に取って代わるものではなく、彼らの耳を何百もの場所に同時に届けるものだと言えるだろう。}} Used in this way, a few experts and a few hundred recorders can follow changes in a whole region over many years.`, [
    C("blank1", 2, U.setsuzoku, "空所［ 1 ］に入る最も適切なものを選べ。", ["Nevertheless", "As a result", "In addition", "In other words"], [
      "正解。「結果はめざましい。それでもプログラムは間違える」という逆接。",
      "めざましい成果の結果として間違える、という因果関係はない。",
      "「さらに」では、成果↔欠点の対比が表せない。",
      "後ろの文は前の文の言いかえではない。",
    ], "長所のあとに短所が続けば逆接", [
      ["前", "The results have been {{striking}}：珍しい種を見つけた。"],
      ["後", "the programs {{make mistakes}} → {{Nevertheless}}。"],
    ], K),
    WY("tr-a", "(A)", U.kandai, "これほど多くの録音を聞くことのできる人間はいないだろう。そのため研究者たちは、特定の種の鳴き声を聞き分けるよう訓練されたコンピューターのプログラムに頼るようになった。",
      jt("No human could do・, which is why SV（それが〜の理由だ）", ["人間はいない", "そのため", "だから"], "turn to・trained to recognize", ["頼る", "訓練され", "聞き分け", "認識"]),
      ", which is why SV は「そしてそれが〜する理由だ＝だから〜」", [
        ["前半", "{{No human could listen to so much material}}：「これほど多くの素材を聞ける人はいない」（仮定の could）。"],
        ["後半", "{{which is why}} researchers have {{turned to}} computer programs {{trained to recognize}} …。"],
      ]),
    WS("ex-b", "下線部(B)で、機械に置きかえられるはずだった専門家がかえって重要になったと言えるのはなぜか。本文に即して説明せよ。", 70,
      "プログラムは鳴き声の似た種を取り違えたり遠くの声を聞き逃したりするので、プログラムを訓練することにも誤りを直すことにも専門家の判断が必要だから。",
      ex(["プログラムを訓練し、誤りを直すのに専門家の判断が必要なことを書いている", ["訓練", "直す", "修正", "判断"]], ["プログラムが似た種を取り違えたり聞き逃したりすることを書いている", ["似た", "取り違え", "混同", "聞き逃"]]),
      "For this reason の this（前の文）と、直後の文の両方を使う", [
        ["理由", "直前：{{confuse two species with similar calls}}・{{miss a bird}} far from the microphone。"],
        ["役割", "直後：judgments are needed both {{to train the programs}} and {{to correct them}}。"],
      ]),
    TR("en-c", 3, "(C)", "It could be said that this technology does not replace bird surveyors but carries their ears to hundreds of places at the same time.",
      ["We might say that, rather than taking the place of the people who survey birds, this technology lets them listen in hundreds of places at once."],
      tr(["It could be said that", "not A but B"], ["replace / take the place of", "at the same time / at once", "hundreds of"], ["取って代わる", "耳を届ける", "同時に"]),
      "「AではなくB」は not A but B。動詞の形をそろえる", [
        ["骨組み", "{{It could be said that}} this technology {{does not replace}} … {{but carries}} …：動詞をそろえる。"],
        ["語句", "同時に＝ {{at the same time}} / at once、何百もの場所＝ {{hundreds of places}}。"],
      ]),
    C("agree", 2, U.chobun, "本文の内容と一致するものを選べ。", [
      "Recorders have found rare birds that call only at night or in bad weather.",
      "The computer programs never confuse species with similar calls.",
      "Trained observers can survey a forest at all hours of the day and night.",
      "The programs need more time than humans to process recordings.",
    ], [
      "正解。第3段落 the birds called only at night or in bad weather, when no one was there to listen に一致。",
      "They may confuse two species with similar calls とあり、逆。",
      "調査員は夜明けに決まった道を歩くもので、1回の調査は one morning in one place。",
      "a month of recordings in a few hours とあり、人間よりずっと速い。",
    ], "never・all など極端な語の選択肢を疑う", [
      ["正解の根拠", "called {{only at night or in bad weather}}, when no one was there。"],
      ["誤りの根拠", "{{may confuse}}・{{one morning in one place}}・{{in a few hours}}。"],
    ]),
  ], [{ word: "survey", meaning: "（生物の）調査をする" }, { word: "identification", meaning: "（種の）同定・判別" }]),

  reading(2, "r-kilogram", "長文読解（1キログラムの決め方）", "Redefining the Kilogram", `For more than a century, the kilogram was defined by a single object: a small metal cylinder kept in a locked vault near Paris. By definition, it had a mass of exactly one kilogram, and copies of it were sent to countries around the world so that their own scales could be checked against it. The arrangement worked, but it had a curious flaw. {{(A) When the copies were brought back and compared with the original, their masses were found to have drifted apart by tiny amounts, and there was no way to tell whether the copies had gained mass or the original had lost it.}}

This mattered little to shoppers buying vegetables, but it troubled scientists. A unit of measurement is supposed to be fixed, and a unit that might be changing is a poor foundation for precise work. [ 1 ], in 2019 the kilogram was redefined. It is now tied not to an object but to a constant of nature, a number that, as far as we know, is the same everywhere in the universe and does not change over time.

{{(B) The practical effect of the change on daily life was almost nothing, which was exactly what its designers intended.}} A kilogram of rice weighs what it did before. The difference is that the definition no longer depends on the condition of one piece of metal. {{(C) 原理的には、必要な装置さえあれば、世界中のどの研究所でも基準となる質量を自分で実現できるようになったのである。}}

The kilogram followed a path already taken by other units. The metre, once the length of a metal bar, has for decades been defined by the distance that light travels in a vacuum in a tiny fixed fraction of a second. In each case, scientists replaced something made by human hands with something given by nature.`, [
    C("blank1", 2, U.setsuzoku, "空所［ 1 ］に入る最も適切なものを選べ。", ["For this reason", "In contrast", "Even so", "For example"], [
      "正解。「変わるかもしれない単位は精密な仕事の土台として不十分だ。そのため、2019年に定義し直された」という因果。",
      "後ろの文は前の文と対比されていない。",
      "問題があったから定義し直したのであり、逆接ではない。",
      "定義し直したことは、前の文の具体例ではない。",
    ], "問題 → 対策 は因果のつなぎ", [
      ["前", "a unit that might be changing is {{a poor foundation}} for precise work（問題）。"],
      ["後", "the kilogram {{was redefined}}（対策）→ {{For this reason}}。"],
    ], K),
    WY("tr-a", "(A)", U.bunshi, "複製を持ち帰って原器と比べたところ、それらの質量はごくわずかずつずれてきていることがわかったが、複製の質量が増えたのか、原器の質量が減ったのかを見分ける方法はなかった。",
      jt("S were found to have done（完了不定詞）・there was no way to tell whether A or B", ["わかった", "見分ける方法はなかった", "のか"], "drift apart・gain / lose mass", ["ずれ", "増えた", "減った"]),
      "be found to have done＝「〜していたとわかる」", [
        ["前半", "their masses {{were found to have drifted apart}} by tiny amounts：「わずかにずれてきていたことがわかった」。"],
        ["後半", "{{no way to tell whether}} the copies had gained mass {{or}} the original had lost it：「〜か…かを見分ける方法がない」。"],
      ]),
    WS("ex-b", "下線部(B)について、定義の変更によって何が変わらず、何が変わったのかを、本文に即して説明せよ。", 70,
      "米1キロの重さなど日常の質量は以前と変わらないが、定義が一個の金属の状態に左右されず、変化しない自然の定数にもとづくものになった。",
      ex(["定義が一つの金属ではなく、変わらない自然の定数にもとづくようになったことを書いている", ["定数", "自然", "金属"]], ["日常の質量（米1キロの重さ）は変わらないことを書いている", ["日常", "米", "変わらない"]]),
      "変わらない点と変わった点を対にして書く", [
        ["変わらない", "A kilogram of rice {{weighs what it did before}}。"],
        ["変わった", "the definition {{no longer depends on the condition of one piece of metal}} → {{a constant of nature}} にもとづく。"],
      ]),
    TR("en-c", 3, "(C)", "In principle, any laboratory in the world can now realize the standard mass by itself, as long as it has the necessary equipment.",
      ["In theory, it has become possible for a laboratory anywhere in the world to produce the reference mass on its own, provided that it has the equipment required."],
      tr(["can now do / it has become possible for A to do", "as long as / provided that"], ["in principle", "realize / produce the standard", "by itself / on its own"], ["原理的には", "装置さえあれば", "自分で実現"]),
      "「〜さえあれば」は as long as / provided that", [
        ["骨組み", "{{In principle}}, any laboratory in the world {{can now realize}} the standard mass {{by itself}}。"],
        ["条件", "必要な装置さえあれば＝ {{as long as it has the necessary equipment}}。"],
      ]),
    C("agree", 2, U.chobun, "本文の内容と一致するものを選べ。", [
      "Copies of the metal cylinder were used to check scales in other countries.",
      "Scientists proved that the original cylinder had lost mass.",
      "After the redefinition, a kilogram of rice weighs slightly more than before.",
      "The new definition depends on an object kept near Paris.",
    ], [
      "正解。第1段落 copies of it were sent to countries … so that their own scales could be checked against it に一致。",
      "no way to tell whether … とあり、どちらかはわからない。",
      "weighs what it did before とあり、変わっていない。",
      "not to an object but to a constant of nature とあり、逆。",
    ], "「わからない」と書かれたことを「証明した」と読まない", [
      ["正解の根拠", "copies … sent to countries … so that their own scales {{could be checked against it}}。"],
      ["誤りの根拠", "{{no way to tell}}・{{weighs what it did before}}・{{not to an object}}。"],
    ]),
  ], [{ word: "vault", meaning: "金庫室" }, { word: "constant of nature", meaning: "自然定数（物理定数）" }, { word: "vacuum", meaning: "真空" }]),

  reading(2, "r-robot", "長文読解（ロボットにとって難しいこと）", "Why Easy Things Are Hard for Robots", `Computers can now beat the best human players at chess, solve complicated equations in seconds, and translate between dozens of languages. Yet a robot that can reliably fold a pile of laundry, or pick up an unfamiliar object from a crowded table, remains a difficult engineering challenge. {{(A) What seems hard to us often turns out to be relatively easy for machines, while what any small child can do without thinking may be extremely hard to build into one.}}

Part of the explanation lies in how we judge difficulty. We regard chess as hard because it requires conscious effort and years of study. Picking up a cup, by contrast, feels effortless, so we assume that it must be simple. But the ease is an illusion. To grasp a cup, the brain must judge its shape, weight and slipperiness from what the eyes see, control dozens of muscles, and adjust the grip in a fraction of a second if the cup begins to slip. {{(B) We are unaware of all this work precisely because evolution has had hundreds of millions of years to make it automatic.}}

Robots, which lack this long history, must have such skills built or learned from scratch. The real world adds further difficulty. A chessboard always has sixty-four squares, and the pieces move according to fixed rules. A kitchen table, [ 1 ], may hold objects of any shape, some soft, some slippery, some partly hidden behind others. A robot that works perfectly in a tidy laboratory may fail completely in an ordinary home.

{{(C) 機械にとって何が難しいのかを知ることは、私たち自身の知能がどのようなものかを理解する手がかりにもなる。}} The abilities we take most for granted may be the ones that deserve the most wonder.`, [
    C("blank1", 2, U.setsuzoku, "空所［ 1 ］に入る最も適切なものを選べ。", ["on the other hand", "as a result", "for example", "in short"], [
      "正解。「チェス盤はいつも64マスで規則も決まっている。一方、台所のテーブルにはどんな形の物でもありうる」という対比。",
      "チェス盤の規則が決まっていることの結果として、テーブルの物の形がばらばらになるわけではない。",
      "台所のテーブルはチェス盤の具体例ではない。",
      "前の内容のまとめではなく、対比になっている。",
    ], "決まった規則 ↔ 何でもありうる の対比", [
      ["前", "A chessboard {{always}} has sixty-four squares・{{fixed rules}}。"],
      ["後", "A kitchen table may hold objects of {{any shape}} → 対比の {{on the other hand}}。"],
    ], K),
    WY("tr-a", "(A)", U.kandai, "私たちにとって難しく思えることが、機械には比較的やさしいとわかることが多い一方で、どんな幼い子どもでも考えずにできることを機械に組み込むのは、きわめて難しいことがある。",
      jt("What SV（名詞節の主語）・turn out to be・while SV（対比）", ["こと", "わかる", "一方で"], "without thinking・build A into one（＝a machine）", ["考えずに", "組み込む", "機械に"]),
      "二つの what 節が主語。while は対比", [
        ["前半", "{{What seems hard to us}} often {{turns out to be}} relatively easy for machines。"],
        ["後半", "{{while}} what any small child can do without thinking may be extremely hard {{to build into one}}：one＝a machine。"],
      ]),
    WS("ex-b", "下線部(B)の all this work とは何か。本文に即して具体的に説明せよ。", 70,
      "コップをつかむときに、目に見えるものから形・重さ・滑りやすさを判断し、多くの筋肉を制御し、滑りかけたら一瞬で握り方を調整すること。",
      ex(["形・重さ・滑りやすさを目から判断し、多くの筋肉を制御することを書いている", ["形", "重さ", "滑り", "筋肉"]], ["滑りかけたら瞬時に握りを調整することを書いている", ["調整", "一瞬", "瞬時"]]),
      "all this work は直前の文の中身を受ける", [
        ["中身", "直前：{{judge its shape, weight and slipperiness}}・{{control dozens of muscles}}・{{adjust the grip}}。"],
        ["まとめ", "それを「{{コップをつかむとき}}に脳がすること」として書く。"],
      ]),
    TR("en-c", 2, "(C)", "Knowing what is difficult for machines also gives us a clue to understanding what our own intelligence is like.",
      ["Learning what machines find hard can also help us understand the nature of our own intelligence."],
      tr(["動名詞の主語", "間接疑問（what is difficult）"], ["give a clue to / help us understand", "what … is like", "also"], ["何が難しいのか", "手がかり", "私たち自身の知能"]),
      "「〜がどのようなものか」は what S is like", [
        ["主語", "{{Knowing what is difficult for machines}}：動名詞＋間接疑問。"],
        ["述部", "{{gives us a clue to understanding}} {{what our own intelligence is like}}（to は前置詞なので動名詞）。"],
      ]),
    C("agree", 2, U.chobun, "本文の内容と一致するものを選べ。", [
      "A robot that performs well in a laboratory may not work well in an ordinary home.",
      "Picking up a cup requires very little work from the brain.",
      "Robots have inherited their skills from a long evolutionary history.",
      "Computers still cannot beat top human players at chess.",
    ], [
      "正解。第3段落 A robot that works perfectly in a tidy laboratory may fail completely in an ordinary home に一致。",
      "the ease is an illusion とあり、脳は多くの仕事をしている。",
      "Robots, which lack this long history とあり、逆。",
      "can now beat the best human players at chess とあり、逆。",
    ], "illusion（見かけだけ）など評価の語に注意", [
      ["正解の根拠", "works perfectly in a {{tidy laboratory}} may {{fail completely in an ordinary home}}。"],
      ["誤りの根拠", "{{the ease is an illusion}}・{{lack this long history}}・{{can now beat}}。"],
    ]),
  ], [{ word: "slipperiness", meaning: "滑りやすさ" }, { word: "from scratch", meaning: "ゼロから" }]),
];

// =====================================================================

export const U_KAGAKUDAI_EIGO: UnivExam = {
  key: KEY,
  univ: "東京科学大学",
  kamoku: "英語",
  tier: "国公立",
  order: 113,
  basis: "旧東京工業大学の理工学系（理学院・工学院・情報理工学院など）の一般選抜 個別学力検査「英語」の傾向を参考（90分・150点・長文読解2題）",
  format: "90分・150点・科学・技術の長文読解2題。下線部和訳・日本語の内容説明・本文中の日本文の英訳を中心に、語の意味・空所・内容一致の選択。",
  minutes: 90,
  groups: ["語彙", "文法", "技能"],
  sections: [
    { title: "第1問　長文読解（科学・技術の論説）", lead: READ_LEAD, count: [7, 7], mix: [0, 0.5, 0.5], points: 90, prefer: "material", poolTag: TAG(1) },
    { title: "第2問　長文読解（研究と技術の現場）", lead: READ_LEAD, count: [5, 5], mix: [0, 0.5, 0.5], points: 60, prefer: "material", poolTag: TAG(2) },
  ],
  pool: [...P1, ...P2],
};
