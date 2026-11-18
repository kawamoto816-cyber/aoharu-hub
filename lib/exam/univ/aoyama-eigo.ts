import type { UnivExam } from "./types";
import type { ExamPoolSection } from "../pool/types";
import type { Question } from "@/lib/moshi/types";

// 青山学院大学型 英語（MARCH）。全学部日程の傾向を参考にした練習用の形式。
// 参考にした形式の情報（問題文・設問文・英文は使っていない）:
//   https://www.aoyama.ac.jp/wp-content/uploads/2026/03/ad_shutsudai_20260207_01_eigo_rZ2jL893.pdf  （2026年度 全学部日程 英語の出題意図：I 長文読解・II 長文読解（語彙・文法・語法の空所補充）・III 文法（誤り指摘／空所補充）・IV 対話文（イディオムの意味））
//   https://www.aoyama.ac.jp/wp-content/uploads/2025/08/ad_20250207_01_eigo_shutsudai_B4hM8xU7.pdf  （2025年度 全学部日程 英語の出題意図：同じ4題構成・すべて選択式）
//   https://jyuke-labo.com/daigakujyukentaisaku/aoyamagakuindaigaku/kamokubetsu/  （全学部日程の英語：80分・150点・マーク式中心）
// 全学部日程: 80分・150点・大問4題・すべて選択式。
//   第1問 論説文の内容一致・語の意味／第2問 説明文・伝記的な文の空所補充（語彙・語法・文法）と内容／
//   第3問 文法（誤り指摘・空所補充）／第4問 対話文のイディオムの意味。
// 英文はすべてこの模試のための書き下ろし（人物・地名の入った話は架空）。

const K = "aoyama-eigo";
type St = [string, string][];

const steps = (s: St) => s.map(([title, body]) => ({ title, body }));

const CHO = "h-eng-skill-chobun";
const V2000 = "h-eng-vocab-2000";
const JUKU = "h-eng-vocab-jukugo";
const KAIWA = "h-eng-vocab-kaiwa";
const G = (s: string) => `h-eng-gram-${s}`;

/** 4択 (think=true で「思考・判断・表現」、keep=true で選択肢の順を固定) */
function ch(
  id: string,
  d: 1 | 2 | 3,
  unit: string,
  sec: number,
  prompt: string,
  options: string[],
  correct: number,
  why: string[],
  point: string,
  st: St,
  opt: { think?: boolean; keep?: boolean } = {},
): Question {
  return {
    id,
    type: "B",
    ...(opt.keep ? { keepOrder: true } : {}),
    difficulty: d,
    points: 5,
    seconds: sec,
    skill: opt.think ? "思考・判断・表現" : "知識・技能",
    unit,
    prompt,
    answer: { kind: "choice", options, correct, why },
    point,
    steps: steps(st),
  } as Question;
}

/** 誤り指摘 (sentence の中に {{(A) …}} の形で4か所の下線を書く。parts はその4つ) */
function err(id: string, d: 1 | 2 | 3, unit: string, sentence: string, parts: [string, string, string, string], wrong: number, why: string[], point: string, st: St): Question {
  return ch(id, d, unit, 40, `誤りを含む下線部を1つ選べ。\n${sentence}`, parts.map((p, i) => `(${"ABCD"[i]}) ${p}`), wrong, why, point, st, { keep: true });
}

/** 空所補充 (文法・語法) */
function fill(id: string, d: 1 | 2 | 3, unit: string, sentence: string, options: string[], correct: number, why: string[], point: string, st: St): Question {
  return ch(id, d, unit, 30, `空所に入る最も適切なものを選べ。\n${sentence}`, options, correct, why, point, st);
}

function P(n: number, id: string, unit: string, title: string, lead: string, ptitle: string, body: string, pick: number, questions: Question[], notes?: { word: string; meaning: string }[]): ExamPoolSection {
  return {
    unit,
    tag: `${K}:${n}`,
    section: {
      id: `aye-${id}`,
      title,
      lead,
      style: "reading",
      examOnly: true,
      pick,
      material: [{ kind: "passage", lang: "en", title: ptitle, body, ...(notes ? { notes } : {}) }],
      questions,
    },
  };
}

function Gs(id: string, unit: string, title: string, questions: Question[]): ExamPoolSection {
  return {
    unit,
    tag: `${K}:3`,
    section: { id: `aye-${id}`, title, lead: "次の各問いに答えよ。", style: "mix", examOnly: true, questions },
  };
}

// =====================================================================
// 第1問　長文読解（論説文）
// =====================================================================

const L1 = "次の英文を読み、問いに答えよ。";

const T1: ExamPoolSection[] = [
  P(1, "boredom", CHO, "退屈の効用", L1, "In Defense of Boredom",
    `Few people would list boredom among their favorite feelings. It is usually described as something to escape, and modern life offers more ways of escaping it than ever before. A phone in the pocket means that a few minutes of waiting for a bus or standing in a line need never be empty. Yet a growing number of psychologists argue that ①{{this constant escape comes at a cost}}, and that boredom, uncomfortable as it is, may serve a useful purpose.

To understand why, it helps to ask what boredom actually is. Researchers generally define it not as having nothing to do, but as wanting to be engaged and failing to find anything engaging. A bored person is not calm or relaxed; he or she is restless, searching for something that feels worth the effort. In this sense, boredom works rather like hunger. Hunger is unpleasant, but it pushes us to look for food. Boredom, in the same way, pushes us to look for a new goal when the current activity no longer satisfies us.

Some studies suggest that this push can lead to creative thinking. In one kind of experiment, participants are first given a ②{{deliberately}} dull task, such as copying numbers from a list, and are then asked to think of as many uses as possible for an ordinary object like a paper cup. People who have just completed the dull task often produce more ideas, and more unusual ones, than people who skipped it. One explanation is that when the outside world offers little stimulation, the mind begins to wander, and a wandering mind makes connections it would not make while focused.

If this is true, then the habit of filling every spare moment with a screen may quietly reduce our chances of having such ideas. Scrolling through short videos or messages is not exactly interesting, but it is just stimulating enough to stop the mind from ③{{drifting}}. The result is a strange middle state in which we are ④{{neither truly bored nor truly engaged}}.

None of this means that boredom is always good. When people feel bored for long periods, for example in a job that offers no variety or control, boredom is linked to stress, poor concentration, and even risky behavior. Boredom is a signal, and like any signal, it is useful only if we respond to it wisely. Someone who feels bored at work might take it as a sign to look for new responsibilities rather than simply reaching for a distraction.

Perhaps, then, the lesson is not that we should seek out boredom, but that we should stop running from it so quickly. The next time you find yourself waiting with nothing to do, you might try leaving your phone in your pocket for a few minutes. The discomfort will pass, and you may be surprised by where your thoughts take you.`,
    8,
    [
      ch("define", 2, CHO, 80, "第2段落によると、研究者は boredom をどのようなものと定義しているか。",
        ["a state of wanting to be engaged but finding nothing engaging", "a state of having no tasks to do at all", "a calm feeling that people have after hard work", "a kind of physical hunger caused by stress"], 0,
        ["正しい。not as having nothing to do, but as wanting to be engaged and failing to find anything engaging の言いかえ。", "誤り。本文は not as having nothing to do（何もすることがない状態ではない）と打ち消している。", "誤り。A bored person is not calm or relaxed とあり、落ち着いた状態ではない。", "誤り。hunger は「たとえ」として出てくるだけで、退屈が空腹そのものだとは言っていない。"],
        "not A but B の B が定義の中身", [["構文をつかむ", "{{not as A, but as B}}：「A ではなく B と定義する」。"], ["B を言いかえる", "wanting to be engaged and failing to find anything engaging ＝ 夢中になりたいのに、夢中になれるものが見つからない状態。"]], { think: true }),
      ch("hunger", 2, CHO, 80, "第2段落で筆者が boredom を hunger にたとえているのはなぜか。",
        ["To show that boredom, though unpleasant, pushes people to look for something new.", "To show that bored people tend to eat more than others.", "To explain that boredom is a kind of illness of the body.", "To argue that boredom disappears once people get enough rest."], 0,
        ["正しい。Hunger is unpleasant, but it pushes us to look for food. ／ Boredom, in the same way, pushes us to look for a new goal に合う。", "誤り。退屈な人が多く食べるという話はない。", "誤り。体の病気だとは述べていない。", "誤り。休めば消えるとは書かれていない。退屈は休息ではなく新しい目標を求めさせる。"],
        "たとえは「共通点」を読む", [["たとえの共通点", "空腹も退屈も{{不快だが、行動へと押しだす}}点が同じ。"], ["本文の対応", "food ↔ a new goal。何か新しいものを探させる、が答え。"]], { think: true }),
      ch("experiment", 2, CHO, 90, "第3段落の実験について、本文の内容に合うものを選べ。",
        ["Participants who first did a dull task tended to think of more uses for a paper cup.", "Participants were asked to copy numbers as quickly as possible to win a prize.", "Participants who skipped the dull task produced the most unusual ideas.", "The experiment showed that boredom makes people unable to focus on any task."], 0,
        ["正しい。People who have just completed the dull task often produce more ideas … than people who skipped it に合う。", "誤り。数字を写すのは退屈な課題の例で、速さや賞品の話はない。", "誤り。逆。退屈な課題を飛ばした人のほうが、アイデアが少なかった。", "誤り。集中できなくなることを示した実験ではない。アイデアの数を比べている。"],
        "比べている2つのグループを取りちがえない", [["2つのグループ", "退屈な課題を{{した人}}と{{飛ばした人}}を比べている。"], ["結果", "した人のほうが more ideas, and more unusual ones を出した。"]], { think: true }),
      ch("cost", 2, CHO, 70, "下線部①の意味に最も近いものを選べ。",
        ["Always avoiding boredom has some disadvantages.", "Carrying a phone everywhere is expensive.", "Escaping boredom costs people nothing at all.", "People must pay money to wait in lines."], 0,
        ["正しい。come at a cost は「代償をともなう」。いつも退屈から逃げることには不利な点がある、という意味。", "誤り。cost を「お金」と読んだ誤り。ここは比ゆ的な「代償」。", "誤り。逆の意味。", "誤り。cost を文字どおりに読んだ誤り。"],
        "come at a cost＝代償をともなう", [["語句の意味", "{{come at a cost}}：よいことの裏に代償がある。"], ["文脈", "this constant escape はスマホで退屈から逃げつづけること。そのあとの and that boredom … may serve a useful purpose とつながる。"]]),
      ch("wander", 2, CHO, 80, "第3段落によると、退屈な課題のあとにアイデアが多く出るのはなぜだと考えられているか。",
        ["Because the mind wanders when there is little stimulation and links ideas in new ways.", "Because people become more competitive after a boring task.", "Because the boring task teaches people how to use a paper cup.", "Because people who focus hard on a task always produce better ideas."], 0,
        ["正しい。when the outside world offers little stimulation, the mind begins to wander, and a wandering mind makes connections に合う。", "誤り。競争心の話はない。", "誤り。数字を写す課題と紙コップの使い道は関係がない。", "誤り。本文は逆に、集中していないときに生まれるつながりがあると述べている（it would not make while focused）。"],
        "One explanation is … のあとが理由", [["理由の目印", "{{One explanation is that …}} が理由の説明。"], ["中身", "刺激が少ない → 心がさまよう → 集中しているときにはない{{つながり}}が生まれる。"]], { think: true }),
      ch("middle", 3, CHO, 90, "下線部④の状態の説明として最も適切なものを選べ。",
        ["Screens give us just enough stimulation to stop our minds from wandering, without truly interesting us.", "We are so bored by our phones that we stop using them.", "We are deeply interested in everything we see on a screen.", "We feel relaxed because we have nothing to do."], 0,
        ["正しい。直前の not exactly interesting, but … just stimulating enough to stop the mind from drifting の言いかえ。", "誤り。スマホを使うのをやめるとは書いていない。", "誤り。not exactly interesting（それほどおもしろくはない）とある。", "誤り。画面を見ているので「何もしていない」状態ではない。"],
        "「中間の状態」は直前の文が説明している", [["直前の文", "画面は{{それほどおもしろくない}}が、心がさまようのを止める程度には刺激がある。"], ["まとめ", "本当に退屈でもなく、本当に夢中でもない ＝ アイデアも生まれにくい。"]], { think: true }),
      ch("longbored", 2, CHO, 80, "第5段落の内容に合うものを選べ。",
        ["Long periods of boredom in a job without variety are linked to stress.", "Boredom at work should always be met with a quick distraction.", "Feeling bored for a long time improves people's concentration.", "Boredom is never connected with risky behavior."], 0,
        ["正しい。in a job that offers no variety or control, boredom is linked to stress に合う。", "誤り。筆者は rather than simply reaching for a distraction と、気晴らしに手をのばすことをすすめていない。", "誤り。poor concentration（集中力の低下）と結びつくとある。", "誤り。even risky behavior と、危険な行動とも結びつくとある。"],
        "譲歩の段落：退屈の「悪い面」を読む", [["段落の役割", "{{None of this means that boredom is always good.}}：退屈がいつもよいわけではない。"], ["中身", "長い退屈は stress・poor concentration・risky behavior と結びつく。"]], { think: true }),
      ch("deliberately", 1, V2000, 40, "下線部②の語の意味に最も近いものを選べ。",
        ["intentionally", "accidentally", "slightly", "rapidly"], 0,
        ["正しい。deliberately は「わざと・意図的に」。実験のためにわざと退屈な課題にしている。", "誤り。「偶然に」で逆の意味。", "誤り。「わずかに」。", "誤り。「急速に」。"],
        "deliberately＝on purpose", [["語の意味", "{{deliberately}}＝intentionally＝on purpose。"], ["文脈", "実験者が「わざと」退屈な課題を与えている。"]]),
      ch("drifting", 1, V2000, 40, "下線部③の語の意味に最も近いものを選べ。",
        ["wandering", "sleeping", "hurrying", "recovering"], 0,
        ["正しい。drift は「ただよう・さまよう」。第3段落の the mind begins to wander の言いかえ。", "誤り。「眠る」。", "誤り。「急ぐ」。", "誤り。「回復する」。"],
        "drift＝wander（ただよう）", [["語の意味", "{{drift}}：流されるようにただよう。"], ["本文の対応", "第3段落の {{wander}} と同じことを言っている。"]]),
      ch("advice", 2, CHO, 70, "第5段落で、職場で退屈を感じる人に筆者がすすめていることは何か。",
        ["To look for new responsibilities.", "To quit the job immediately.", "To check the phone more often.", "To ignore the feeling completely."], 0,
        ["正しい。take it as a sign to look for new responsibilities に合う。", "誤り。仕事をすぐやめるとは書いていない。", "誤り。気晴らしに手をのばすことはすすめていない。", "誤り。退屈を signal（合図）として受けとめよと言っている。"],
        "退屈＝新しいことを探せという合図", [["根拠", "{{take it as a sign to look for new responsibilities}}。"], ["反対の行動", "rather than simply reaching for a distraction：気晴らしに逃げるのではなく。"]]),
      ch("claim", 3, CHO, 90, "筆者の主張に最も近いものを選べ。",
        ["We do not have to seek boredom, but we should not escape from it too quickly.", "We should spend as much time as possible being bored.", "Boredom is harmful, so we should always keep ourselves busy.", "Phones should be banned in public places such as bus stops."], 0,
        ["正しい。最終段落 the lesson is not that we should seek out boredom, but that we should stop running from it so quickly に合う。", "誤り。not that we should seek out boredom と、退屈を求めよとは言っていない。", "誤り。筆者は退屈の効用を述べており、いつも忙しくせよとは言っていない。", "誤り。禁止すべきとは述べていない。ポケットに入れておくことを提案しているだけ。"],
        "最終段落の not A but B が主張", [["主張の場所", "最終段落 {{the lesson is not that A, but that B}}。"], ["B の中身", "退屈から{{すぐに逃げるのをやめる}}こと。"]], { think: true }),
      ch("title", 2, CHO, 70, "本文のタイトルとして最も適切なものを選べ。",
        ["Boredom: An Unpleasant but Useful Signal", "How Smartphones Cure Boredom", "The History of Psychology Experiments", "Why Boredom Must Be Avoided at All Costs"], 0,
        ["正しい。不快だが役に立つ合図、という本文全体の内容に合う。", "誤り。スマホは退屈から逃げる道具として述べられ、むしろ問題視されている。", "誤り。実験は例の1つで、心理学の歴史の話ではない。", "誤り。筆者の主張と逆。"],
        "タイトルは全体の主張をまとめたもの", [["全体の流れ", "退屈は不快 → でも新しいことを求めさせる → {{役に立つ合図}}。"], ["選ぶ", "一部だけ・逆の主張の選択肢を外す。"]], { think: true }),
    ]),

  P(1, "trees", CHO, "都市の暑さと街路樹", L1, "Cooling Cities with Trees",
    `On a hot summer afternoon, the center of a large city can be several degrees warmer than the countryside around it. This difference, known as the urban heat island effect, has several causes. Roads, roofs, and walls made of asphalt, concrete, and brick ①{{absorb}} sunlight during the day and release the stored heat slowly at night. Cars, air conditioners, and factories add heat of their own. And because buildings stand close together, the warm air has fewer chances to move away.

As summers grow hotter in many parts of the world, city governments are looking for ways to reduce this effect. One of the simplest is also one of the oldest: planting trees. Trees cool their surroundings in two main ways. First, their leaves block sunlight before it reaches the ground, so the pavement beneath them stays cooler. Second, trees take up water through their roots and release it as vapor from their leaves. Turning liquid water into vapor uses energy, and that energy is taken from the surrounding air, which therefore becomes cooler.

The effect can be surprisingly large. Measurements in many cities have found that, on a sunny day, the surface of a street shaded by trees can be far cooler than that of a nearby street without shade. For people walking outside, the difference between a shaded and an unshaded sidewalk is not merely a matter of comfort. During heat waves, it can affect health, especially for elderly people and young children, who are more sensitive to high temperatures.

However, planting trees is not as easy as it sounds. In crowded city centers, there is often little space above ground, and even less below it, where pipes and cables ②{{compete with roots}}. Young trees need regular watering, and many die in their first few years if they are not cared for. In addition, trees are not always planted where they are needed most. In some cities, wealthier neighborhoods have far more trees than poorer ones, which means that ③{{the people least able to afford air conditioning often live on the hottest streets}}.

For these reasons, experts ④{{emphasize}} that tree planting works best as part of a wider plan. Choosing species that can survive dry periods, designing streets with enough room for roots, and involving local residents in caring for young trees can all improve the chances of success. Some cities have also begun to combine trees with other measures, such as roofs painted in light colors that reflect sunlight.

Trees cannot solve the problem of rising temperatures by themselves. Still, few other measures offer so many benefits at once: shade, cleaner air, homes for birds and insects, and streets that people actually enjoy walking along. For a city facing hotter summers, a tree may be one of the wisest investments it can make.`,
    8,
    [
      ch("causes", 2, CHO, 80, "第1段落で、urban heat island effect の原因として挙げられていないものを選べ。",
        ["a lack of rain in city centers", "materials that store heat from the sun", "heat produced by cars and air conditioners", "buildings that stop warm air from moving away"], 0,
        ["これが答え。雨が少ないことは原因として挙げられていない。", "挙げられている。asphalt, concrete, and brick absorb sunlight … release the stored heat。", "挙げられている。Cars, air conditioners, and factories add heat of their own。", "挙げられている。because buildings stand close together, the warm air has fewer chances to move away。"],
        "「挙げられていないもの」は本文と1つずつ照合", [["原因を数える", "①熱をためる素材 ②車・冷房・工場の熱 ③建物が密集して空気が動かない。"], ["照合", "{{雨}}の話は本文にない。"]], { think: true }),
      ch("vapor", 3, CHO, 90, "第2段落によると、木が水を蒸気として出すと周りの空気が冷えるのはなぜか。",
        ["Because changing water into vapor takes energy from the surrounding air.", "Because the water falls on the streets and cools them like rain.", "Because the roots take heat away from the ground.", "Because the vapor reflects sunlight back into the sky."], 0,
        ["正しい。Turning liquid water into vapor uses energy, and that energy is taken from the surrounding air に合う。", "誤り。水が道路に落ちるとは書いていない。", "誤り。根は水を吸い上げるもので、地面から熱をうばうとは書いていない。", "誤り。日光を反射するのは、明るい色の屋根の話（第5段落）。"],
        "水→水蒸気で空気の熱がうばわれる", [["2つの方法", "①葉が日光をさえぎる ②水を{{蒸気}}として出す。"], ["②のしくみ", "水が蒸気になるときにエネルギーが使われ、それが{{周りの空気}}からうばわれる。"]], { think: true }),
      ch("health", 2, CHO, 80, "第3段落で、木かげのある歩道とない歩道のちがいが not merely a matter of comfort とされるのはなぜか。",
        ["Because the difference can affect the health of people who are sensitive to heat.", "Because shaded sidewalks are more expensive to build.", "Because people walk faster on sidewalks without shade.", "Because young children prefer to play in the sun."], 0,
        ["正しい。During heat waves, it can affect health, especially for elderly people and young children に合う。", "誤り。建設費の話はない。", "誤り。歩く速さの話はない。", "誤り。子どもの好みの話はない。"],
        "not merely A ＝ A だけでなく B も", [["構文", "{{not merely a matter of comfort}}：快適さだけの問題ではない。"], ["B の中身", "次の文の {{affect health}}：高齢者・子どもの健康に関わる。"]], { think: true }),
      ch("difficulty", 2, CHO, 80, "第4段落で、木を植えることの難しさとして述べられていないものを選べ。",
        ["Trees release so much vapor that streets become uncomfortably wet.", "There is little room underground because of pipes and cables.", "Young trees often die unless they are watered regularly.", "Trees are not always planted in the places that need them most."], 0,
        ["これが答え。蒸気で道がぬれて不快になるとは書いていない。", "述べられている。even less below it, where pipes and cables compete with roots。", "述べられている。Young trees need regular watering, and many die …。", "述べられている。trees are not always planted where they are needed most。"],
        "However のあとに難しさが並ぶ", [["段落の役割", "{{However, planting trees is not as easy as it sounds.}}"], ["照合", "空間・水やり・場所のかたよりの3つ。{{蒸気}}の害は書かれていない。"]], { think: true }),
      ch("poor", 3, CHO, 90, "下線部③が意味することとして最も適切なものを選べ。",
        ["Those who suffer most from the heat are often those with the least money to protect themselves.", "Poor neighborhoods use air conditioning more than wealthy ones.", "People in hot streets should buy more air conditioners.", "Wealthy people prefer to live on streets without trees."], 0,
        ["正しい。冷房を買う余裕のない人ほど、木が少なく暑い通りに住んでいる、ということ。", "誤り。冷房を「買う余裕がない」と言っており、多く使うとは言っていない。", "誤り。冷房を買うべきだという主張ではない。", "誤り。豊かな地域ほど木が多い（wealthier neighborhoods have far more trees）。"],
        "least able to afford＝いちばん買う余裕がない", [["語句", "{{be able to afford}}：〜を買う余裕がある。least がつくと「いちばん余裕がない」。"], ["前の文と", "豊かな地域ほど木が多い → 貧しい地域は暑い通り。"]], { think: true }),
      ch("measures", 1, CHO, 60, "第5段落で、木と組み合わせる対策の例として挙げられているものを選べ。",
        ["painting roofs in light colors", "building taller apartment buildings", "banning cars from city centers", "covering roads with dark materials"], 0,
        ["正しい。roofs painted in light colors that reflect sunlight とある。", "誤り。高い建物を建てる話はない。", "誤り。車を禁止する話はない。", "誤り。暗い色の素材は熱をためる側（第1段落）。"],
        "such as のあとが具体例", [["目印", "{{such as}} roofs painted in light colors。"], ["理由", "明るい色は日光を反射するので、熱をためにくい。"]]),
      ch("absorb", 1, V2000, 40, "下線部①の語の意味に最も近いものを選べ。",
        ["take in", "give off", "keep out", "turn down"], 0,
        ["正しい。absorb は「吸収する」＝ take in。", "誤り。「（熱・においを）出す」で、直後の release に近い。", "誤り。「中に入れない」。", "誤り。「断る・音を小さくする」。"],
        "absorb＝take in（吸収する）", [["語の意味", "{{absorb}}：吸いこむ・吸収する。"], ["文の対比", "昼に吸収し（absorb）、夜に出す（release）。"]]),
      ch("emphasize", 1, V2000, 40, "下線部④の語の意味に最も近いものを選べ。",
        ["stress", "deny", "doubt", "forget"], 0,
        ["正しい。emphasize は「強調する」＝ stress。", "誤り。「否定する」。", "誤り。「疑う」。", "誤り。「忘れる」。"],
        "emphasize＝stress（強調する）", [["語の意味", "{{emphasize}}＝stress＝highlight。"], ["文脈", "専門家が「大きな計画の一部としてこそうまくいく」と強調している。"]]),
      ch("compete", 2, CHO, 70, "下線部②の内容として最も適切なものを選べ。",
        ["Pipes and cables take up underground space that roots also need.", "Pipes and cables help roots grow faster.", "Roots are used to protect pipes and cables.", "Pipes and cables carry water to the roots."], 0,
        ["正しい。地下の限られた空間を、管・ケーブルと根が取りあっている。", "誤り。compete は「競う・取りあう」で、助けるのではない。", "誤り。根が管を守るとは書いていない。", "誤り。水やりは人が行う（Young trees need regular watering）。"],
        "compete with＝〜と取りあう", [["語句", "{{compete with}}：〜と競う・取りあう。"], ["文脈", "地上も地下も空間が少ない → 地下では管・ケーブルと根が場所を取りあう。"]], { think: true }),
      ch("view", 3, CHO, 90, "本文の内容に合わないものを選べ。",
        ["Planting trees alone is enough to solve the problem of rising temperatures.", "Trees offer several benefits besides shade.", "Local residents can help young trees survive.", "Choosing trees that can survive dry periods is important."], 0,
        ["これが答え。最終段落 Trees cannot solve the problem of rising temperatures by themselves と食いちがう。", "合う。shade, cleaner air, homes for birds and insects … と、多くの利点が挙げられている。", "合う。involving local residents in caring for young trees。", "合う。Choosing species that can survive dry periods。"],
        "by themselves＝それだけで", [["食いちがう所", "{{cannot solve … by themselves}}：木だけでは解決できない。"], ["筆者の立場", "それでも利点が多い、よい投資だ、という主張。"]], { think: true }),
      ch("title", 2, CHO, 70, "本文のタイトルとして最も適切なものを選べ。",
        ["Trees as a Tool Against Urban Heat", "Why Cities Are Getting Colder", "How to Build Cheaper Roads", "The Dangers of Planting Trees"], 0,
        ["正しい。都市の暑さを和らげる手段としての木、という全体の内容に合う。", "誤り。都市は暑くなっている。", "誤り。道路の建設費の話ではない。", "誤り。難しさは述べているが、危険だという話ではない。"],
        "全体：都市の暑さ × 木の効果と課題", [["流れ", "原因 → 木の効果 → 難しさ → 計画の必要 → {{よい投資}}。"], ["選ぶ", "全体を言い表す {{Trees … Against Urban Heat}}。"]], { think: true }),
    ]),

  P(1, "loanwords", CHO, "借用語と言語の歴史", L1, "Why Languages Borrow Words",
    `No language exists in complete isolation. Whenever people from different communities trade, travel, or live side by side, words pass from one language to another. Linguists call these words loanwords, although ①{{the name is a little misleading}}: a language that "borrows" a word almost never gives it back.

The most obvious reason for borrowing is need. When a new object or idea arrives from abroad, it often arrives with its name attached. Japanese, for instance, took the word pan from Portuguese traders in the sixteenth century, along with bread itself. Much later, words such as terebi and konpyūtā entered the language together with the technologies they describe. In such cases, borrowing is simply the quickest way to fill a gap.

But need does not explain everything. Languages often borrow words for things they could already name perfectly well. Here, social prestige plays an important role. After the Norman Conquest of 1066, French became the language of the ruling class in England for several centuries. As a result, English took in thousands of French words, especially in areas connected with power and ②{{refinement}}, such as law, government, and fine food. The animals in the fields kept their old English names, such as cow, pig, and sheep, while the meat served at the tables of the rich came to be called beef, pork, and mutton, words of French origin.

Once a word has been borrowed, it rarely stays exactly the same. Its pronunciation is adjusted to fit the sounds of the new language, and its meaning may shift. The Japanese word baiku, from English bike, usually refers to a motorcycle rather than a bicycle. Such changes are sometimes criticized as mistakes, but they show that the borrowing language is not ③{{a passive receiver}}. It reshapes what it takes to suit its own needs.

Some people worry that too many loanwords can damage a language. In several countries, official bodies have tried to replace foreign words with newly created native ones. These efforts have had mixed results. Some of the new words become widely used, while others are ignored by ordinary speakers, who tend to choose whichever word feels most natural to them.

In the end, loanwords are less a threat than a record of history. Each borrowed word is a small ④{{trace}} of contact between peoples, whether through trade, conquest, invention, or friendship. To study the loanwords in a language is, in a sense, to read the story of the people who have spoken it.`,
    8,
    [
      ch("misleading", 2, CHO, 80, "下線部①のように筆者が述べる理由として最も適切なものを選べ。",
        ["A language that borrows a word almost never returns it.", "Most loanwords are used only for a short time.", "Linguists do not agree on what a loanword is.", "Loanwords are usually taken by force from other languages."], 0,
        ["正しい。コロンのあと a language that “borrows” a word almost never gives it back が理由。「借りる」のに返さない。", "誤り。短い間しか使われないとは書いていない。", "誤り。学者の意見が分かれるという話はない。", "誤り。力ずくで取るとは書いていない。"],
        "コロン（:）のあとが説明", [["目印", "{{コロン}}のあとで、名前が誤解をまねく理由を述べている。"], ["中身", "borrow（借りる）と言うのに、{{返さない}}。"]], { think: true }),
      ch("need", 2, CHO, 80, "第2段落で pan の例が示していることとして最も適切なものを選べ。",
        ["A word may enter a language together with the thing it names.", "Japanese had several words for bread before the sixteenth century.", "Portuguese traders refused to sell bread in Japan.", "Words for food are borrowed more often than words for technology."], 0,
        ["正しい。took the word pan … along with bread itself：物と名前がいっしょに入ってきた例。", "誤り。パンという物も名前も外から来た例で、もとから語があったとは言っていない。", "誤り。そのような話はない。", "誤り。食べ物と技術の語の多さは比べていない。"],
        "例は直前の一般論を支える", [["一般論", "{{it often arrives with its name attached}}：新しい物は名前つきでやってくる。"], ["例", "pan は bread itself といっしょに入った。"]], { think: true }),
      ch("prestige", 2, CHO, 80, "第3段落の内容に合うものを選べ。",
        ["Many French words entered English in fields related to power, such as law and government.", "English borrowed French words mainly because it had no names for farm animals.", "French was spoken by most farmers in England after 1066.", "The Norman Conquest made English the language of the ruling class."], 0,
        ["正しい。especially in areas connected with power and refinement, such as law, government, and fine food に合う。", "誤り。家畜は old English names を保ったとある。", "誤り。フランス語は the ruling class（支配階級）の言語。", "誤り。支配階級の言語になったのはフランス語。"],
        "prestige＝威信。支配層の言葉が入る", [["段落の主題", "必要がなくても、{{社会的な威信}}で語が借りられる。"], ["例", "1066年以後、支配階級のフランス語から法・政治・料理の語が入った。"]], { think: true }),
      ch("beef", 3, CHO, 90, "第3段落によると、beef や pork がフランス語に由来するのはなぜか。",
        ["Because the meat was eaten at the tables of the French-speaking ruling class.", "Because English farmers learned to raise animals from the French.", "Because the old English words for meat had been forgotten.", "Because the French brought new kinds of animals to England."], 0,
        ["正しい。the meat served at the tables of the rich came to be called beef, pork … とある。食卓に出す側＝支配階級の言葉。", "誤り。飼い方を学んだという話はない。", "誤り。忘れられたとは書いていない。", "誤り。新しい動物を持ちこんだとは書いていない。"],
        "畑の動物＝英語、食卓の肉＝フランス語", [["対比", "{{fields}} の動物は cow・pig（英語）、{{tables of the rich}} の肉は beef・pork（フランス語）。"], ["理由", "肉を食べる側が、フランス語を話す支配階級だったから。"]], { think: true }),
      ch("baiku", 2, CHO, 70, "第4段落で baiku の例が示していることとして最も適切なものを選べ。",
        ["The meaning of a word can change after it is borrowed.", "Japanese speakers often confuse motorcycles and bicycles.", "Borrowed words always keep their original meanings.", "English speakers use the word bike for motorcycles only."], 0,
        ["正しい。its meaning may shift の具体例。英語の bike は自転車をさすことが多いが、baiku はふつうオートバイをさす。", "誤り。日本語の話し手が混同しているのではなく、語の意味が変わったという話。", "誤り。逆。", "誤り。英語の使い方について、そのような説明はない。"],
        "例は直前の「意味が変わる」を示す", [["一般論", "{{its meaning may shift}}：意味がずれることがある。"], ["例", "bike → baiku でさすものが変わった。"]], { think: true }),
      ch("passive", 3, CHO, 90, "下線部③について、筆者が言いたいこととして最も適切なものを選べ。",
        ["The borrowing language actively changes the words it takes.", "The borrowing language should not accept foreign words.", "The borrowing language makes many careless mistakes.", "The borrowing language gives words back to the original language."], 0,
        ["正しい。直後の It reshapes what it takes to suit its own needs：自分に合うように作りかえる。", "誤り。受け入れるべきでないとは言っていない。", "誤り。筆者は「まちがい」と批判されることに反論している。", "誤り。第1段落のとおり、ほとんど返さない。"],
        "not a passive receiver＝ただ受けとるだけではない", [["語句", "{{passive}}：受け身の。それを not で打ち消している。"], ["次の文", "reshapes … to suit its own needs：自分に合うように作りかえる。"]], { think: true }),
      ch("replace", 2, CHO, 80, "第5段落の内容に合うものを選べ。",
        ["Efforts to replace foreign words with native ones have had mixed results.", "All the newly created native words have replaced foreign ones.", "Ordinary speakers always follow the advice of official bodies.", "No country has ever tried to limit the use of loanwords."], 0,
        ["正しい。These efforts have had mixed results に合う。", "誤り。others are ignored by ordinary speakers と、使われない語もある。", "誤り。ふつうの話し手は自然に感じる語を選ぶ。", "誤り。In several countries, official bodies have tried … とある。"],
        "mixed results＝うまくいったりいかなかったり", [["語句", "{{mixed results}}：結果がまちまち。"], ["中身", "広まった語もあれば、無視された語もある。"]], { think: true }),
      ch("refinement", 2, V2000, 40, "下線部②の語の意味に最も近いものを選べ。",
        ["elegance", "violence", "poverty", "simplicity"], 0,
        ["正しい。refinement は「洗練・上品さ」。fine food（上等な料理）の例とも合う。", "誤り。「暴力」。", "誤り。「貧困」。", "誤り。「簡素さ」で、むしろ逆。"],
        "refinement＝洗練（refined＝上品な）", [["語の形", "{{refine}}（精製する・洗練する）＋ -ment。"], ["文脈", "power and refinement の例が law, government（力）と fine food（洗練）。"]]),
      ch("trace", 2, V2000, 40, "下線部④の語の意味に最も近いものを選べ。",
        ["sign", "threat", "rule", "price"], 0,
        ["正しい。trace は「あと・痕跡」。接触があったしるし。", "誤り。「おどし・脅威」。直前の less a threat と取りちがえないこと。", "誤り。「規則」。", "誤り。「値段」。"],
        "trace＝あと・痕跡（しるし）", [["語の意味", "{{trace}}：何かがあったあと・形跡。"], ["文脈", "借用語は、民族どうしが接触した小さな{{しるし}}。"]]),
      ch("notsay", 2, CHO, 80, "本文の内容に合わないものを選べ。",
        ["Most borrowed words keep their original pronunciation.", "Languages sometimes borrow words for things they can already name.", "Words for new technologies have entered Japanese from abroad.", "Studying loanwords can tell us about a people's history."], 0,
        ["これが答え。第4段落 Its pronunciation is adjusted to fit the sounds of the new language と食いちがう。", "合う。第3段落 Languages often borrow words for things they could already name perfectly well。", "合う。第2段落 terebi and konpyūtā。", "合う。最終段落 to read the story of the people who have spoken it。"],
        "「合わないもの」は本文と逆の1つを探す", [["食いちがう所", "第4段落：発音は新しい言語に合わせて{{変えられる}}。"], ["ほかの選択肢", "第2・3・6段落とそれぞれ合う。"]], { think: true }),
      ch("title", 2, CHO, 70, "本文のタイトルとして最も適切なものを選べ。",
        ["Loanwords as Records of Contact Between Peoples", "How to Avoid Using Foreign Words", "The French Influence on Japanese", "Why Languages Never Change"], 0,
        ["正しい。借用語の理由・変化をたどり、歴史の記録だとまとめる全体に合う。", "誤り。筆者は借用語を脅威とは見ていない。", "誤り。フランス語の影響は英語の例。", "誤り。言語は借用で変わっていく。"],
        "結論の段落がタイトルの中心", [["結論", "{{a record of history}}：借用語は歴史の記録。"], ["選ぶ", "内容の一部や逆の主張を外す。"]], { think: true }),
    ]),
];

// =====================================================================
// 第2問　長文読解（空所補充・語彙・語法）
// =====================================================================

const L2 = "次の英文を読み、空所に入る最も適切なものを選べ。また、本文の内容に関する問いに答えよ。";

const T2: ExamPoolSection[] = [
  P(2, "ada", CHO, "雲を見つめた人（伝記的な物語）", L2, "Ada Morrow and the Clouds",
    `Ada Morrow grew up in a small fishing village where the weather decided almost everything. Whether the boats went out, whether the nets came back full, and sometimes whether the men came back at all [ 1 ] on the sky. As a child, Ada spent hours on the cliffs, watching clouds form and break apart, and she soon noticed that certain shapes tended to [ 2 ] storms by several hours.

Her father, a fisherman, was amused at first by her habit of drawing clouds in a notebook. [ 3 ], when one of her warnings kept him at home on a morning that ended in a violent storm, he began to take her seriously. Before long, other fishermen were asking the girl what she thought of the sky.

Ada wanted to study science, but in her time few universities [ 4 ] women as students. Instead, she read every book on weather she could borrow and wrote letters to scientists in the capital, describing her observations in careful detail. Most of the letters went unanswered. One, however, reached a professor who was so impressed by her records [ 5 ] he invited her to work as his assistant.

For the next twenty years, Ada collected data from a network of observers along the coast. She was rarely given credit in the professor's publications, and she earned far [ 6 ] than the men who did similar work. Yet she never stopped recording. Her notebooks, which [ 7 ] of thousands of daily observations, later became one of the most valuable sources for researchers studying the region's climate.

Today, a weather station on the cliffs where she once stood [ 8 ] her name. Visitors who read the small sign beside it learn not only about a forgotten scientist, but also about how much can be achieved through patient observation.

(This story is fictional.)`,
    8,
    [
      ch("b1", 2, G("bunkei"), 40, "空所 [ 1 ] に入る最も適切なものを選べ。",
        ["depended", "consisted", "insisted", "concentrated"], 0,
        ["正しい。depend on「〜しだいである」。漁に出るか・網が満ちるかは空（天気）しだい。主語は Whether … の3つの名詞節。", "誤り。consist of「〜から成る」で、on とは結びつかない。", "誤り。insist on「〜を言いはる」で、主語が人でないと合わない。", "誤り。concentrate on「〜に集中する」で、意味が合わない。"],
        "Whether … depends on ～＝…かどうかは～しだい", [["主語を見ぬく", "長い主語は {{Whether the boats went out, …}} の3つの名詞節。"], ["動詞＋on", "「空しだいだった」→ {{depended on}}。"]]),
      ch("b2", 2, V2000, 40, "空所 [ 2 ] に入る最も適切なものを選べ。",
        ["precede", "resemble", "prevent", "delay"], 0,
        ["正しい。precede「〜に先立つ」。ある形の雲が嵐の数時間前に現れる。のちの「警告」の話とつながる。", "誤り。resemble「〜に似ている」は by several hours と合わない。", "誤り。雲が嵐を「防ぐ」のではない。", "誤り。雲が嵐を「遅らせる」のではない。"],
        "precede＝〜より前に来る", [["手がかり", "{{by several hours}}（数時間の差で）と、第2段落の warnings（警告）。"], ["選ぶ", "雲が嵐の{{前に}}現れる → precede。"]]),
      ch("b3", 1, G("setsuzokushi"), 35, "空所 [ 3 ] に入る最も適切なものを選べ。",
        ["However", "Therefore", "Moreover", "Similarly"], 0,
        ["正しい。最初はおもしろがっていた → しかし、警告に救われて本気にした。逆接。", "誤り。「したがって」は因果で、前後が逆の内容なので合わない。", "誤り。「さらに」は追加。", "誤り。「同様に」は似た内容を並べるとき。"],
        "前後が反対の内容なら逆接", [["前", "父は最初 {{amused}}（おもしろがっていた）。"], ["後", "やがて {{take her seriously}}（本気にした）→ 逆接の However。"]]),
      ch("b4", 2, V2000, 40, "空所 [ 4 ] に入る最も適切なものを選べ。",
        ["admitted", "attended", "applied", "belonged"], 0,
        ["正しい。admit A as …「A を…として受け入れる（入学を認める）」。", "誤り。attend は「（学校に）通う」で、主語が大学では合わない。", "誤り。apply は「申しこむ」で、目的語を直接とらない。", "誤り。belong to「〜に属する」で、目的語を直接とらない。"],
        "admit＝入学・入場を認める", [["主語と目的語", "大学が女性を学生として{{受け入れる}}。"], ["語法", "{{admit A as B}}。attend・apply・belong は主語や形が合わない。"]]),
      ch("b5", 1, G("kandai"), 35, "空所 [ 5 ] に入る最も適切なものを選べ。",
        ["that", "which", "as", "what"], 0,
        ["正しい。so … that ～「とても…なので～」。", "誤り。which は関係代名詞で、so と組まない。", "誤り。so … as to do の形ならあるが、as のあとに節（he invited …）は続かない。", "誤り。what は先行詞をふくむ関係代名詞で、ここでは使えない。"],
        "so … that ～（とても…なので～）", [["目印", "前に {{so impressed}} がある。"], ["構文", "so … {{that}} he invited her：とても感心したので彼女を招いた。"]]),
      ch("b6", 2, G("hikaku"), 40, "空所 [ 6 ] に入る最も適切なものを選べ。",
        ["less", "fewer", "lower", "little"], 0,
        ["正しい。earn less (money) than …「…より少なく稼ぐ」。far は比較級を強める。", "誤り。fewer は数えられる名詞の数に使う。", "誤り。lower は wages や income が主語・目的語のとき。earn far lower than とは言わない。", "誤り。than があるので比較級が必要。"],
        "far＋比較級＋than", [["目印", "{{far}} … {{than}}：比較級が入る。"], ["語法", "稼ぐ「量」が少ない → {{less}}（much の比較級の反対）。"]]),
      ch("b7", 2, G("bunkei"), 40, "空所 [ 7 ] に入る最も適切なものを選べ。",
        ["consisted", "contained", "composed", "belonged"], 0,
        ["正しい。consist of「〜から成る」。of とつながる。", "誤り。contain は他動詞で of をとらない（contained thousands of … ならよい）。", "誤り。compose は受け身で be composed of とする。", "誤り。belong は to をとる。"],
        "consist of＝be made up of", [["空所のあと", "空所の直後が {{of}}。"], ["形", "自動詞で of をとるのは {{consist}}。compose は be composed of。"]]),
      ch("b8", 2, V2000, 40, "空所 [ 8 ] に入る最も適切なものを選べ。",
        ["bears", "calls", "names", "says"], 0,
        ["正しい。bear one's name「〜の名を冠している」。", "誤り。call one's name は「名前を呼ぶ」。", "誤り。name は「名づける」で、目的語に her name をとらない。", "誤り。say は「言う」。"],
        "bear A's name＝A の名がついている", [["主語", "主語は {{a weather station}}（単数・現在）。"], ["語法", "建物などが名を「持つ」→ {{bear}}。"]]),
      ch("father", 2, CHO, 70, "父が Ada を本気にするようになったのはなぜか。",
        ["Her warning kept him from going out on a day when a storm struck.", "She won a prize for her drawings of clouds.", "A professor wrote to him about her talent.", "Other fishermen told him to listen to her."], 0,
        ["正しい。one of her warnings kept him at home on a morning that ended in a violent storm とある。", "誤り。賞の話はない。", "誤り。教授が手紙を出したのは Ada に対して、しかもずっとあと。", "誤り。順番が逆。父が本気にしたあとで、ほかの漁師も彼女にたずねるようになった。"],
        "when … のあとが、本気にしたきっかけ", [["根拠", "{{when one of her warnings kept him at home}} …"], ["順番", "父が信じる → ほかの漁師もたずねる。"]], { think: true }),
      ch("career", 2, CHO, 80, "Ada の仕事について本文の内容に合うものを選べ。",
        ["She collected weather data for many years but was rarely given credit.", "She studied at a university in the capital.", "She was paid more than the men who did similar work.", "She stopped recording after the professor died."], 0,
        ["正しい。For the next twenty years … ／ She was rarely given credit in the professor's publications に合う。", "誤り。大学では学べず、本を借りて独学した。", "誤り。earned far less than the men とある。", "誤り。she never stopped recording とある。教授の死の話もない。"],
        "Yet の前後で、不遇と努力を読み分ける", [["不遇", "rarely given credit ／ earned far less。"], ["努力", "{{Yet she never stopped recording.}}"]], { think: true }),
      ch("lesson", 2, CHO, 70, "最終段落から読み取れることとして最も適切なものを選べ。",
        ["Patient observation can lead to great achievements.", "Scientists should work alone without help from others.", "Weather stations should always be built on cliffs.", "Forgotten scientists rarely leave useful records."], 0,
        ["正しい。how much can be achieved through patient observation に合う。", "誤り。Ada は観測者のネットワークからデータを集めており、一人で働けという話ではない。", "誤り。建てる場所の一般論ではない。", "誤り。Ada のノートは貴重な資料になった。"],
        "物語の結びが教訓", [["結び", "{{not only A but also B}} の B が中心。"], ["中身", "辛抱強い観察で多くのことが成しとげられる。"]], { think: true }),
    ]),

  P(2, "deepsea", CHO, "深海の光（説明文）", L2, "Living Light in the Deep Sea",
    `Below a depth of about 1,000 meters, sunlight never reaches the ocean. One might expect this world to be completely dark, but it is [ 1 ] with points of light. A large number of the animals that live there can produce their own light, an ability known as bioluminescence.

The light is created by a chemical reaction inside the animal's body. A substance called luciferin reacts with oxygen, and this reaction, [ 2 ] by a special protein, releases energy in the form of light. Unlike an ordinary light bulb, which wastes much of its energy as heat, this process produces very little heat, [ 3 ] it is sometimes called "cold light."

Why would an animal in the deep sea need light? Scientists have found that it serves many purposes. Some fish use a glowing part of their bodies to [ 4 ] small animals close enough to be eaten. Others flash light to [ 5 ] partners of their own species in the dark. Still others use light for defense: certain shrimp, when attacked, release a cloud of glowing liquid that confuses the attacker and gives the shrimp time to escape.

One of the most surprising uses is a kind of camouflage. In the middle depths, where a little sunlight still [ 6 ] down from the surface, an animal's body forms a dark shadow when seen from below. Some animals solve this problem by producing light on their undersides that matches the faint light coming from above. [ 7 ] this way, they become nearly invisible to predators looking up.

Studying these animals is difficult, because many of them cannot survive being brought to the surface. Nevertheless, new underwater cameras and robots are allowing researchers to observe them in their natural environment, and each expedition seems to reveal species that [ 8 ] never been seen before.`,
    8,
    [
      ch("b1", 2, V2000, 40, "空所 [ 1 ] に入る最も適切なものを選べ。",
        ["dotted", "deprived", "emptied", "short"], 0,
        ["正しい。be dotted with「〜が点在している」。暗いと思いきや光の点が散らばっている。", "誤り。be deprived of「〜をうばわれている」で、with とは結びつかない。", "誤り。be emptied of のような形で使い、意味も逆。", "誤り。be short of「〜が足りない」で、with とは結びつかない。"],
        "be dotted with＝〜が点々とある", [["but の前後", "真っ暗だと思われる {{but}} 光の点がある。"], ["語法", "空所のあとが {{with}}。dotted with points of light。"]]),
      ch("b2", 2, G("bunshi"), 40, "空所 [ 2 ] に入る最も適切なものを選べ。",
        ["helped", "helping", "to help", "helps"], 0,
        ["正しい。this reaction, (which is) helped by a special protein,：反応は「助けられる」側なので過去分詞。", "誤り。現在分詞だと反応がたんぱく質を助けることになる。", "誤り。不定詞では意味がつながらない。", "誤り。動詞の形は、主節の動詞 releases と重なり文が成り立たない。"],
        "名詞と分詞の関係：〜される→過去分詞", [["修飾の関係", "this reaction が「助けられる」。"], ["形", "受け身の意味の後置修飾 → {{過去分詞}} helped。"]]),
      ch("b3", 2, G("kandai"), 40, "空所 [ 3 ] に入る最も適切なものを選べ。",
        ["which is why", "in spite of", "so as", "unless"], 0,
        ["正しい。, which is why ～「そしてそれが～の理由だ」。熱が少ない → だから cold light とよばれる。", "誤り。in spite of は前置詞で、あとに節は続かない。", "誤り。so as to do の形でないと使えない。", "誤り。unless「〜でないかぎり」は意味が合わない。"],
        ", which is why ～＝だから～", [["前後の関係", "熱をほとんど出さない → {{cold light}} とよばれる（原因→結果）。"], ["形", "前の内容を受ける {{, which is why}} ＋ 節。"]]),
      ch("b4", 3, V2000, 40, "空所 [ 4 ] に入る最も適切なものを選べ。",
        ["lure", "avoid", "warn", "hide"], 0,
        ["正しい。lure「おびき寄せる」。光でえものを食べられるほど近くに寄せる。", "誤り。「さける」では close enough to be eaten と合わない。", "誤り。「警告する」では意味が合わない。", "誤り。「かくす」では意味が合わない。"],
        "lure＝おびき寄せる（attract）", [["手がかり", "{{close enough to be eaten}}：食べられるほど近くに。"], ["選ぶ", "近くに来させる → {{lure}}。"]]),
      ch("b5", 1, V2000, 35, "空所 [ 5 ] に入る最も適切なものを選べ。",
        ["find", "escape", "frighten", "punish"], 0,
        ["正しい。暗やみで同じ種の相手を「見つける」ために光を点滅させる。", "誤り。「逃れる」相手は捕食者で、partners ではない。", "誤り。相手をこわがらせる理由がない。", "誤り。「罰する」は意味が合わない。"],
        "partners は「さがす」相手", [["目的語", "{{partners of their own species}}：同じ種の相手。"], ["文脈", "暗やみで相手を{{見つける}}ための光。"]]),
      ch("b6", 3, V2000, 40, "空所 [ 6 ] に入る最も適切なものを選べ。",
        ["filters", "prevents", "rises", "blocks"], 0,
        ["正しい。filter down「（光が）しみこむように届く」。中くらいの深さにはわずかな日光が届く。", "誤り。prevent は他動詞で目的語が必要。", "誤り。「上がる」は down from the surface と合わない。", "誤り。block は他動詞で目的語が必要。"],
        "filter down＝光がわずかに差しこむ", [["手がかり", "{{a little sunlight}}・{{down from the surface}}。"], ["形", "目的語がない → 自動詞の {{filters}}。"]]),
      ch("b7", 1, G("zenchishi"), 30, "空所 [ 7 ] に入る最も適切なものを選べ。",
        ["In", "On", "By", "At"], 0,
        ["正しい。in this way「このようにして」。", "誤り。on this way とは言わない（on the way なら「途中で」）。", "誤り。by the way は「ところで」。by this way とは言わない。", "誤り。at this way とは言わない。"],
        "in this way＝このようにして", [["熟語", "{{in this way}}：前の方法を受ける。"], ["前の文", "腹側に光を出して影を消す方法を受けている。"]]),
      ch("b8", 1, G("kanryo"), 30, "空所 [ 8 ] に入る最も適切なものを選べ。",
        ["have", "has", "are", "were"], 0,
        ["正しい。先行詞 species はここでは複数。never been seen と現在完了の受け身 → have。", "誤り。has は単数の主語のとき。", "誤り。are never been とは言えない。", "誤り。were never been とは言えない。"],
        "been の前は have/has。主語の数も確認", [["形", "{{been}} の前に来るのは have／has／had。"], ["主語", "先行詞 {{species}}（ここは複数）→ have。"]]),
      ch("cold", 1, CHO, 60, "bioluminescence が cold light とよばれるのはなぜか。",
        ["Because it produces very little heat.", "Because it is found only in cold water.", "Because it appears blue to human eyes.", "Because it works only at low temperatures."], 0,
        ["正しい。this process produces very little heat とある。", "誤り。水の冷たさが理由とは書いていない。", "誤り。色の話はない。", "誤り。低い温度でしか働かないとは書いていない。"],
        "電球との対比が理由", [["対比", "電球は熱としてエネルギーをむだにするが、この反応は{{熱をほとんど出さない}}。"], ["結論", "だから cold light。"]], { think: true }),
      ch("notuse", 2, CHO, 70, "本文で、深海の生物が光を使う目的として述べられていないものを選べ。",
        ["to warm their bodies", "to catch food", "to defend themselves", "to hide from predators"], 0,
        ["これが答え。体を温めるという目的は述べられていない（熱はほとんど出ない）。", "述べられている。えものをおびき寄せる。", "述べられている。光る液を出して敵を混乱させる。", "述べられている。腹側を光らせて影を消す（camouflage）。"],
        "目的を本文から順に数える", [["本文の目的", "えさ・相手さがし・防御・{{カムフラージュ}}。"], ["照合", "熱はほとんど出ないので、温めるは合わない。"]], { think: true }),
      ch("study", 2, CHO, 70, "最終段落によると、深海の生物の研究が難しいのはなぜか。",
        ["Many of them die when they are brought to the surface.", "They are too small to be seen with cameras.", "They live only in waters that are too cold for robots.", "They stop producing light when they are observed."], 0,
        ["正しい。many of them cannot survive being brought to the surface とある。", "誤り。カメラでは観察できるようになってきている。", "誤り。ロボットが使えないとは書いていない。", "誤り。観察されると光らなくなるとは書いていない。"],
        "because のあとが理由", [["根拠", "{{because many of them cannot survive being brought to the surface}}。"], ["対策", "Nevertheless のあと：カメラやロボットで自然の環境のまま観察する。"]], { think: true }),
    ]),

  P(2, "container", CHO, "コンテナと貿易（説明文）", L2, "The Box That Changed Trade",
    `For most of history, loading a ship was slow, hard work. Goods arrived at the port in sacks, barrels, and crates of every size, and teams of workers had to carry them on board one by one. A large ship could spend more time [ 1 ] in port than at sea, and goods were often damaged or stolen along the way.

In the middle of the twentieth century, an idea spread that seems almost too simple to be important: putting goods into large steel boxes of a standard size. Once packed, a box could be lifted by a crane from a truck or train and placed directly onto a ship without [ 2 ] opened. At the other end of the journey, the process was simply reversed.

The real power of the idea lay in standardization. Because every container had the same shape, ships, cranes, trucks, and trains could all be designed to [ 3 ] them. A box packed in a factory far inland could travel by road, rail, and sea and arrive at a store on another continent without anyone touching the goods inside. Loading that [ 4 ] taken days could now be completed in hours.

The effects reached far beyond the ports. As the cost of moving goods fell, it became practical for companies to make different parts of a product in different countries and [ 5 ] them in yet another. Many of the cheap goods we take for granted today exist [ 6 ] this global system.

The change was not painless, however. Many dock workers lost their jobs, since machines now did [ 7 ] had once required hundreds of people. Old port areas in some cities fell into decline, while new, larger ports were built where there was room for huge cranes and storage yards.

Today, millions of containers are moving around the world at any given moment. Most people never think about them, yet they are [ 8 ] to the way we live.`,
    8,
    [
      ch("b1", 1, G("domeishi"), 35, "空所 [ 1 ] に入る最も適切なものを選べ。",
        ["waiting", "wait", "to wait", "waited"], 0,
        ["正しい。spend＋時間＋-ing「〜して時間を過ごす」。", "誤り。原形は続かない。", "誤り。spend time to do とは言わない。", "誤り。過去形・過去分詞では意味が合わない。"],
        "spend＋時間＋-ing", [["目印", "{{spend more time}} のあと。"], ["形", "spend 時間 {{doing}}：〜して時間を使う。"]]),
      ch("b2", 2, G("judo"), 40, "空所 [ 2 ] に入る最も適切なものを選べ。",
        ["being", "been", "be", "having"], 0,
        ["正しい。without being opened「開けられることなく」。前置詞のあとの受け身の動名詞。", "誤り。過去分詞だけでは前置詞のあとに置けない。", "誤り。原形は前置詞のあとに置けない。", "誤り。having opened だと能動の完了になり、箱が自分で何かを開けたことになる。"],
        "前置詞＋being＋過去分詞（受け身の動名詞）", [["前置詞のあと", "{{without}} のあとは名詞か動名詞。"], ["受け身", "箱は「開けられる」側 → {{being opened}}。"]]),
      ch("b3", 2, V2000, 40, "空所 [ 3 ] に入る最も適切なものを選べ。",
        ["handle", "refuse", "ignore", "resemble"], 0,
        ["正しい。handle「（物を）扱う」。船もクレーンもトラックも、同じ形の箱を扱えるように設計できた。", "誤り。「断る」では標準化の利点と合わない。", "誤り。「無視する」では意味が合わない。", "誤り。「〜に似る」では意味が合わない。"],
        "handle＝扱う・処理する", [["文脈", "同じ形だから、どの乗り物も箱を{{扱える}}ように作れた。"], ["選ぶ", "標準化の利点に合うのは {{handle}}。"]]),
      ch("b4", 2, G("kanryo"), 40, "空所 [ 4 ] に入る最も適切なものを選べ。",
        ["had", "has", "was", "have"], 0,
        ["正しい。could now be completed（過去）より前に「何日もかかっていた」→ 過去完了 had taken。", "誤り。現在完了は過去の話と合わない。", "誤り。was taken では受け身で「取られた」となり、days と合わない。", "誤り。主語 Loading は単数で、時制も合わない。"],
        "過去の基準より前→過去完了", [["基準の時", "{{could now be completed}}：コンテナ以後（過去）。"], ["それより前", "以前は何日もかかっていた → {{had taken}}。"]]),
      ch("b5", 2, V2000, 40, "空所 [ 5 ] に入る最も適切なものを選べ。",
        ["assemble", "dismiss", "abandon", "conceal"], 0,
        ["正しい。assemble「組み立てる」。部品をちがう国で作り、さらに別の国で組み立てる。", "誤り。「退ける・解雇する」。", "誤り。「捨てる」。", "誤り。「かくす」。"],
        "部品→組み立てる（assemble）", [["前とのつながり", "make different {{parts}} … and ［5］ them in yet another。"], ["選ぶ", "部品を{{組み立てる}}。"]]),
      ch("b6", 2, JUKU, 40, "空所 [ 6 ] に入る最も適切なものを選べ。",
        ["thanks to", "in spite of", "instead of", "regardless of"], 0,
        ["正しい。thanks to「〜のおかげで」。安い品物はこの世界的なしくみのおかげで存在する。", "誤り。「〜にもかかわらず」は逆接で合わない。", "誤り。「〜のかわりに」は意味が合わない。", "誤り。「〜に関係なく」は意味が合わない。"],
        "thanks to＝〜のおかげで（原因）", [["前の文", "輸送費が下がった → 部品を世界中で作れる。"], ["つなぐ", "安い品物は、このしくみの{{おかげで}}ある。"]]),
      ch("b7", 2, G("kandai"), 40, "空所 [ 7 ] に入る最も適切なものを選べ。",
        ["what", "which", "that", "those"], 0,
        ["正しい。what「〜すること・もの」。did の目的語で、had once required の主語にもなる。先行詞がない。", "誤り。which には先行詞が必要。", "誤り。関係代名詞の that にも先行詞が必要。", "誤り。those のあとに who などがないと文が続かない。"],
        "先行詞がない→what", [["前を見る", "did のあとに{{先行詞になる名詞がない}}。"], ["選ぶ", "名詞節を作る {{what}}：「かつて何百人も必要だったこと」。"]]),
      ch("b8", 1, V2000, 35, "空所 [ 8 ] に入る最も適切なものを選べ。",
        ["essential", "indifferent", "inferior", "opposed"], 0,
        ["正しい。be essential to「〜に欠かせない」。ふだん意識されない（yet）が、生活に欠かせない。", "誤り。be indifferent to「〜に無関心だ」は、人について言う。", "誤り。be inferior to「〜より劣る」は意味が合わない。", "誤り。be opposed to「〜に反対だ」は意味が合わない。"],
        "yet の前後は対照：意識されない⇔欠かせない", [["対照", "{{never think about them, yet …}}"], ["選ぶ", "意識されないけれど{{欠かせない}} → essential。"]]),
      ch("before", 1, CHO, 60, "第1段落によると、コンテナが使われる前の船の荷積みにはどのような問題があったか。",
        ["It took a long time, and goods were often damaged or stolen.", "Ships were too small to carry heavy goods.", "Workers refused to load barrels and sacks.", "Goods could only be carried by train."], 0,
        ["正しい。slow, hard work ／ more time … in port than at sea ／ goods were often damaged or stolen に合う。", "誤り。船の大きさの話はない。", "誤り。労働者が断ったとは書いていない。", "誤り。鉄道しか使えなかったとは書いていない。"],
        "時間がかかる・こわれる・ぬすまれる", [["根拠1", "{{slow, hard work}}、港にいる時間のほうが長い。"], ["根拠2", "{{damaged or stolen}}。"]], { think: true }),
      ch("power", 2, CHO, 80, "第3段落によると、コンテナの考えの本当の強みは何か。",
        ["Its standard size allowed all kinds of transport to be designed around it.", "Its steel was much stronger than wood.", "It could be opened easily at every port.", "It made ships travel faster at sea."], 0,
        ["正しい。The real power of the idea lay in standardization. Because every container had the same shape, ships, cranes, trucks, and trains could all be designed to … に合う。", "誤り。鋼と木の強さは比べていない。", "誤り。中を開けずに運べることが利点。", "誤り。船の速さの話はない。"],
        "lay in ～＝強みは～にある", [["目印", "{{The real power … lay in standardization}}。"], ["中身", "同じ形 → 船・クレーン・トラック・列車をそれに合わせて作れる。"]], { think: true }),
      ch("pain", 2, CHO, 70, "第5段落で述べられている変化のマイナス面として正しいものを選べ。",
        ["Many dock workers lost their jobs.", "Ports became too crowded with workers.", "Goods became more expensive to move.", "New ports were built in old city centers."], 0,
        ["正しい。Many dock workers lost their jobs とある。", "誤り。機械が人の仕事をするようになり、逆に働き手は減った。", "誤り。運ぶ費用は下がった（第4段落）。", "誤り。新しい港は広い場所に造られ、古い港の地域は衰えた。"],
        "not painless＝痛みもあった", [["目印", "{{The change was not painless, however.}}"], ["中身", "港湾労働者の失業・古い港の地域の衰退。"]], { think: true }),
    ]),
];

// =====================================================================
// 第3問　文法（誤り指摘・空所補充）
// =====================================================================

const T3: ExamPoolSection[] = [
  Gs("gram-jisei", G("jisei"), "時制・準動詞・態", [
    err("e-since", 2, G("kanryo"), "I {{(A) have known}} her {{(B) since}} we {{(C) were}} children, and she {{(D) has visited}} me last week.",
      ["have known", "since", "were", "has visited"], 3,
      ["正しい。since＋過去の時点と現在完了で「ずっと知っている」。", "正しい。「〜以来」。", "正しい。子どもだったのは過去。", "これが誤り。last week（はっきりした過去）は現在完了と使えない。visited にする。"],
      "過去をはっきり示す語と現在完了は使えない", [["目印", "文末の {{last week}}。"], ["直す", "has visited → {{visited}}。"]]),
    err("e-passive", 1, G("judo"), "The museum, {{(A) which}} {{(B) was built}} in 1920, {{(C) is visiting}} by thousands of tourists {{(D) every year}}.",
      ["which", "was built", "is visiting", "every year"], 2,
      ["正しい。非制限用法の関係代名詞。", "正しい。博物館は「建てられた」。", "これが誤り。博物館は「訪れられる」側。by … とあるので受け身 is visited にする。", "正しい。毎年。"],
      "by＋人があれば受け身を疑う", [["主語と動詞", "museum は「訪れる」のではなく{{訪れられる}}。"], ["直す", "is visiting → {{is visited}}。"]]),
    err("e-suggest", 2, G("domeishi"), "She suggested {{(A) to go}} to the beach, but it {{(B) started}} raining {{(C) before}} we {{(D) could leave}}.",
      ["to go", "started", "before", "could leave"], 0,
      ["これが誤り。suggest は動名詞をとる。going にする。", "正しい。start＋-ing。", "正しい。接続詞「〜する前に」。", "正しい。過去の可能。"],
      "suggest は -ing（不定詞はとらない）", [["語法", "{{suggest doing}}：〜しようと提案する。"], ["直す", "to go → {{going}}。"]]),
    err("e-forward", 1, G("domeishi"), "I'm looking forward {{(A) to see}} you again {{(B) when}} you {{(C) come}} back {{(D) to}} Tokyo.",
      ["to see", "when", "come", "to"], 0,
      ["これが誤り。look forward to の to は前置詞なので、あとは動名詞 seeing。", "正しい。時を表す接続詞。", "正しい。時の副詞節は未来でも現在形。", "正しい。come back to＋場所。"],
      "look forward to -ing（to は前置詞）", [["見分け", "look forward {{to}} の to は前置詞。"], ["直す", "to see → {{to seeing}}。"]]),
    err("e-bythetime", 2, G("kanryo"), "By the time we {{(A) arrived}} at the station, the train {{(B) has already left}}, so we {{(C) had to}} wait {{(D) for}} an hour.",
      ["arrived", "has already left", "had to", "for"], 1,
      ["正しい。過去の時点。", "これが誤り。着いた（過去）ときにはすでに出ていた → 過去完了 had already left。", "正しい。過去の義務。", "正しい。期間の for。"],
      "過去の時点より前→過去完了", [["基準", "{{By the time we arrived}}（過去）。"], ["直す", "has already left → {{had already left}}。"]]),
    err("e-before", 1, G("domeishi"), "It is important {{(A) for}} students {{(B) to get}} enough sleep, {{(C) especially}} before {{(D) take}} an exam.",
      ["for", "to get", "especially", "take"], 3,
      ["正しい。不定詞の意味上の主語。", "正しい。It is … to do。", "正しい。副詞「特に」。", "これが誤り。前置詞 before のあとは動名詞 taking。"],
      "前置詞のあとの動詞は -ing", [["品詞", "ここの {{before}} は前置詞（あとに主語がない）。"], ["直す", "take → {{taking}}。"]]),
    err("e-usedto", 2, G("domeishi"), "My brother {{(A) is used to}} {{(B) get up}} early because he {{(C) has worked}} at a bakery {{(D) for}} five years.",
      ["is used to", "get up", "has worked", "for"], 1,
      ["正しい。be used to「〜に慣れている」。", "これが誤り。be used to の to は前置詞なので getting up にする。", "正しい。5年間ずっと（継続）。", "正しい。期間の for。"],
      "be used to -ing＝〜に慣れている", [["見分け", "{{used to do}}（以前は〜した）と {{be used to doing}}（慣れている）。"], ["直す", "get up → {{getting up}}。"]]),
    fill("f-assoon", 1, G("jisei"), "I'll call you as soon as I (　　) the results.",
      ["get", "will get", "would get", "had got"], 0,
      ["正しい。時の副詞節（as soon as …）では、未来のことも現在形。", "誤り。時の副詞節では will を使わない。", "誤り。仮定の意味になり合わない。", "誤り。過去完了は合わない。"],
      "時・条件の副詞節は未来も現在形", [["節の種類", "{{as soon as}} …：時の副詞節。"], ["形", "未来のことでも{{現在形}} get。"]]),
    fill("f-sitting", 2, G("bunshi"), "The man (　　) next to me on the train kept talking on his phone.",
      ["sitting", "sits", "to be sat", "has sat"], 0,
      ["正しい。the man sitting next to me「となりに座っている男性」。現在分詞の後置修飾。", "誤り。文の動詞は kept なので、もう1つ動詞の形は置けない。", "誤り。不自然な形。", "誤り。現在完了は名詞を修飾できない。"],
      "名詞＋-ing＋語句＝〜している…", [["文の骨組み", "主語 The man、動詞 {{kept}}。"], ["修飾", "男性が「座っている」→ 現在分詞 {{sitting}}。"]]),
    fill("f-remember", 2, G("domeishi"), "I remember (　　) this book before, but I can't recall the ending.",
      ["reading", "to read", "read", "to have been read"], 0,
      ["正しい。remember doing「（過去に）〜したことを覚えている」。before が手がかり。", "誤り。remember to do は「忘れずに〜する」（これからのこと）。", "誤り。原形は続かない。", "誤り。受け身で意味が合わない。"],
      "remember -ing＝したことを覚えている", [["見分け", "{{remember doing}}（過去）と {{remember to do}}（未来）。"], ["手がかり", "before：前に読んだ → reading。"]]),
    fill("f-repaired", 2, G("judo"), "The bridge (　　) now, so we have to take another route.",
      ["is being repaired", "is repairing", "has repaired", "repairs"], 0,
      ["正しい。橋は「修理されている最中」→ 進行形の受け身。", "誤り。橋が何かを修理していることになる。", "誤り。能動の現在完了で、目的語もない。", "誤り。能動で意味が合わない。"],
      "進行形の受け身：be being＋過去分詞", [["主語", "橋は修理{{される}}側。"], ["now", "いま最中 → {{is being repaired}}。"]]),
    fill("f-stolen", 1, G("bunshikobun"), "She had her bicycle (　　) yesterday.",
      ["stolen", "steal", "stealing", "to steal"], 0,
      ["正しい。have＋O＋過去分詞「O を〜される（被害）」。自転車は「盗まれる」側。", "誤り。have＋O＋原形だと、自転車が盗むことになる。", "誤り。-ing だと自転車が盗んでいることになる。", "誤り。have＋O＋to do の形はとらない。"],
      "have＋O＋過去分詞＝O を〜される", [["O と動詞", "自転車は{{盗まれる}}側。"], ["形", "have her bicycle {{stolen}}。"]]),
    fill("f-written", 2, G("bunshikobun"), "(　　) in simple English, the book is easy for beginners to read.",
      ["Written", "Writing", "To write", "Having written"], 0,
      ["正しい。本は「書かれている」→ 過去分詞で始まる分詞構文。", "誤り。本が書く側になる。", "誤り。目的の意味になり合わない。", "誤り。能動の完了で、本が書いたことになる。"],
      "分詞構文：主語との関係で -ing か過去分詞か", [["主語", "主節の主語 {{the book}}。"], ["関係", "本は「書かれる」→ {{Written}}。"]]),
    fill("f-mind", 1, G("domeishi"), "Do you mind (　　) the window? It's getting cold.",
      ["closing", "to close", "close", "closed"], 0,
      ["正しい。mind doing「〜するのをいやがる」。Do you mind closing …?「閉めてもらえますか」。", "誤り。mind は不定詞をとらない。", "誤り。原形は続かない。", "誤り。過去分詞は続かない。"],
      "mind -ing（不定詞はとらない）", [["語法", "{{mind}}・enjoy・finish・avoid などは -ing。"], ["形", "Do you mind {{closing}} …?"]]),
  ]),

  Gs("gram-kankei", G("kandai"), "関係詞・比較・接続詞", [
    err("e-cheaper", 1, G("hikaku"), "The hotel {{(A) at which}} we stayed {{(B) was}} much {{(C) more cheaper}} than we {{(D) had expected}}.",
      ["at which", "was", "more cheaper", "had expected"], 2,
      ["正しい。stay at＋場所 → at which。", "正しい。主語 The hotel は単数。", "これが誤り。cheaper がすでに比較級なので more は不要。much cheaper にする。", "正しい。泊まる前に予想していた → 過去完了。"],
      "比較級に more を重ねない", [["形", "{{cheaper}} は -er の比較級。"], ["直す", "more cheaper → {{cheaper}}（much で強める）。"]]),
    err("e-anyother", 2, G("hikaku"), "Tokyo is larger than {{(A) any other}} {{(B) cities}} in Japan, {{(C) and}} it is {{(D) also}} the busiest.",
      ["any other", "cities", "and", "also"], 1,
      ["正しい。比較級＋than any other …。", "これが誤り。any other のあとは単数名詞。city にする。", "正しい。等位接続詞。", "正しい。副詞「〜も」。"],
      "比較級＋than any other＋単数名詞", [["形", "{{any other}} ＋ {{単数}}名詞。"], ["直す", "cities → {{city}}。"]]),
    err("e-although", 1, G("setsuzokushi"), "{{(A) Although}} it was raining hard, {{(B) but}} the game {{(C) was not}} {{(D) canceled}}.",
      ["Although", "but", "was not", "canceled"], 1,
      ["正しい。「〜だけれども」。", "これが誤り。Although と but を重ねない。but をとる。", "正しい。過去の受け身の否定。", "正しい。試合は「中止される」側。"],
      "Although と but は重ねない", [["接続詞の数", "2つの節をつなぐ接続詞は{{1つ}}。"], ["直す", "but をとる。"]]),
    err("e-both", 2, G("kandai"), "I have two sisters, {{(A) both of them}} {{(B) live}} {{(C) in}} Osaka {{(D) now}}.",
      ["both of them", "live", "in", "now"], 0,
      ["これが誤り。コンマだけで2つの節をつなげないので、関係代名詞を使って both of whom にする。", "正しい。主語は複数（2人）。", "正しい。live in＋都市。", "正しい。副詞。"],
      "コンマ＋both of whom（関係代名詞）", [["節の数", "I have … と … live in Osaka の2つの節を{{接続詞なしで}}つないでいる。"], ["直す", "both of them → {{both of whom}}。"]]),
    err("e-themore", 1, G("hikaku"), "{{(A) The more}} you practice, {{(B) the better}} you {{(C) will}} {{(D) becoming}}.",
      ["The more", "the better", "will", "becoming"], 3,
      ["正しい。The＋比較級 …, the＋比較級 …。", "正しい。", "正しい。助動詞。", "これが誤り。助動詞 will のあとは原形 become。"],
      "助動詞のあとは原形", [["構文", "{{The＋比較級 …, the＋比較級 …}}：〜すればするほど…。"], ["直す", "will becoming → will {{become}}。"]]),
    err("e-notsomuch", 3, G("hikaku"), "She is {{(A) not so much}} a singer {{(B) than}} an actor {{(C) who}} {{(D) happens to}} sing.",
      ["not so much", "than", "who", "happens to"], 1,
      ["正しい。not so much A as B「A というよりむしろ B」。", "これが誤り。not so much A as B なので than ではなく as。", "正しい。先行詞 an actor（人）。", "正しい。happen to do「たまたま〜する」。"],
      "not so much A as B＝A というより B", [["構文", "{{not so much A as B}}。"], ["直す", "than → {{as}}。"]]),
    err("e-whatwas", 2, G("kandai"), "{{(A) What}} surprised me {{(B) most}} {{(C) were}} the kindness {{(D) of}} the local people.",
      ["What", "most", "were", "of"], 2,
      ["正しい。What 節が主語（「〜したこと」）。", "正しい。副詞「最も」。", "これが誤り。補語の the kindness は単数で、What 節の主語も単数あつかい。was にする。", "正しい。the kindness of …。"],
      "What 節の主語は単数あつかい", [["主語", "{{What surprised me most}}：名詞節で単数。"], ["直す", "were → {{was}}（補語の kindness も単数）。"]]),
    fill("f-notuntil", 2, G("tokushu"), "It was not until he lost his job (　　) he realized how much he had depended on it.",
      ["that", "when", "which", "then"], 0,
      ["正しい。It was not until A that B「A して初めて B した」（強調構文）。", "誤り。強調構文には that を使う。", "誤り。which は先行詞が必要。", "誤り。then は接続詞ではない。"],
      "It is not until A that B＝A して初めて B", [["構文", "{{It was not until … that …}}：強調構文。"], ["意味", "仕事を失って初めて、どれほど頼っていたか気づいた。"]]),
    fill("f-where", 1, G("kanfuku"), "This is the place (　　) I lost my wallet.",
      ["where", "which", "what", "whose"], 0,
      ["正しい。I lost my wallet は欠けた語のない完全な文。場所の先行詞 → 関係副詞 where。", "誤り。which のあとは名詞の欠けた文が続く。", "誤り。what は先行詞をとらない。", "誤り。whose のあとには名詞が続く。"],
      "うしろが完全な文→関係副詞", [["うしろの文", "I lost my wallet：主語・目的語がそろっている。"], ["先行詞", "the place（場所）→ {{where}}。"]]),
    fill("f-much", 1, G("hikaku"), "She is (　　) taller than her mother.",
      ["much", "very", "more", "so"], 0,
      ["正しい。比較級を強めるのは much・far・even など。", "誤り。very は比較級を強めない。", "誤り。taller がすでに比較級。", "誤り。so は比較級を強めない。"],
      "比較級を強める much／far／even", [["形", "{{taller}} は比較級。"], ["強める語", "very ではなく {{much}}。"]]),
    fill("f-unless", 2, G("setsuzokushi"), "(　　) you leave now, you will miss the bus.",
      ["Unless", "If", "Because", "Since"], 0,
      ["正しい。Unless「〜しないかぎり」。いま出ないと、バスに乗り遅れる。", "誤り。「いま出れば乗り遅れる」となり意味が通らない。", "誤り。「いま出るので乗り遅れる」は意味が通らない。", "誤り。Because と同じく理由で、意味が通らない。"],
      "unless＝if … not", [["意味", "{{Unless you leave now}}＝If you don't leave now。"], ["確かめ", "出ない → 乗り遅れる。筋が通る。"]]),
    fill("f-whichever", 2, G("kanfuku"), "Choose (　　) you like best.",
      ["whichever", "whoever", "however", "wherever"], 0,
      ["正しい。whichever「どれでも〜するものを」。choose の目的語になる名詞節。", "誤り。whoever は人。", "誤り。however は副詞節「どんなに〜でも」で、目的語にならない。", "誤り。wherever は場所の副詞節。"],
      "複合関係代名詞 whichever＝どれでも", [["空所の役割", "choose の{{目的語}}になる名詞節。"], ["選ぶ", "もの → {{whichever}}。"]]),
    fill("f-that", 2, G("hikaku"), "The population of this city is larger than (　　) of Kyoto.",
      ["that", "those", "it", "one"], 0,
      ["正しい。比べるのは「人口」と「京都の人口」。the population の代わりに that を使う。", "誤り。those は複数の名詞の代わり。", "誤り。it は of … で修飾できない。", "誤り。one は数えられる名詞の代わりで、the population には使わない。"],
      "比較の相手をそろえる that of ～", [["比べるもの", "この市の{{人口}}と京都の{{人口}}。"], ["代名詞", "単数の the population → {{that}} of Kyoto。"]]),
    fill("f-aslong", 2, G("setsuzokushi"), "I'll lend you the money (　　) you pay it back by Friday.",
      ["as long as", "as far as", "even if", "in case of"], 0,
      ["正しい。as long as「〜しさえすれば（条件）」。", "誤り。as far as は「〜の範囲では」。", "誤り。「たとえ〜でも」は意味が合わない。", "誤り。in case of は前置詞句で、節は続かない。"],
      "as long as＝〜しさえすれば（条件）", [["意味", "金曜までに返すなら貸す → {{条件}}。"], ["見分け", "as far as は範囲（as far as I know）。"]]),
  ]),

  Gs("gram-katei", G("kateiho"), "仮定法・助動詞・語法", [
    err("e-hadhad", 2, G("kateiho"), "If I {{(A) had}} more time yesterday, I {{(B) would have finished}} the report {{(C) before}} the meeting {{(D) started}}.",
      ["had", "would have finished", "before", "started"], 0,
      ["これが誤り。yesterday の過去の事実に反する仮定 → 仮定法過去完了 had had。", "正しい。仮定法過去完了の帰結。", "正しい。接続詞。", "正しい。過去の事実。"],
      "過去の事実の反対→if＋had＋過去分詞", [["時", "{{yesterday}}：過去の仮定。"], ["直す", "had → {{had had}}。"]]),
    err("e-wish", 1, G("kateiho"), "I wish I {{(A) can}} speak French {{(B) as}} fluently {{(C) as}} my friend {{(D) does}}.",
      ["can", "as", "as", "does"], 0,
      ["これが誤り。I wish のあとは仮定法。could にする。", "正しい。as … as。", "正しい。as … as。", "正しい。speaks の代わりの does。"],
      "I wish＋仮定法（過去形）", [["形", "{{I wish}} のあとは過去形（現在の願望）。"], ["直す", "can → {{could}}。"]]),
    err("e-info", 1, G("meishi"), "She gave me {{(A) some}} {{(B) useful}} {{(C) informations}} {{(D) about}} the city.",
      ["some", "useful", "informations", "about"], 2,
      ["正しい。some は数えられない名詞にも使える。", "正しい。形容詞。", "これが誤り。information は数えられない名詞で、-s をつけない。", "正しい。「〜についての」。"],
      "information は不可算名詞", [["名詞の種類", "{{information}}・advice・furniture は数えられない。"], ["直す", "informations → {{information}}。"]]),
    err("e-hadbetter", 1, G("jodoshi"), "You {{(A) had better}} {{(B) not to}} {{(C) tell}} him {{(D) about}} the party.",
      ["had better", "not to", "tell", "about"], 1,
      ["正しい。had better「〜したほうがよい」。", "これが誤り。had better の否定は had better not＋原形。to は不要。", "正しい。原形。", "正しい。tell A about B。"],
      "had better not＋原形", [["形", "{{had better}} は助動詞のはたらき → あとは原形。"], ["否定", "had better {{not}} tell。to は入らない。"]]),
    err("e-let", 1, G("bunkei"), "My father {{(A) let}} me {{(B) to use}} his car {{(C) when}} I {{(D) passed}} my driving test.",
      ["let", "to use", "when", "passed"], 1,
      ["正しい。let は過去形も let。", "これが誤り。let＋O＋原形（使役）。use にする。", "正しい。時の接続詞。", "正しい。pass a test「合格する」。"],
      "使役 let＋O＋原形", [["語法", "{{let}}・make・have＋O＋原形。"], ["直す", "to use → {{use}}。"]]),
    err("e-explain", 2, G("waho"), "{{(A) Please}} {{(B) explain}} {{(C) me}} how this machine {{(D) works}}.",
      ["Please", "explain", "me", "works"], 2,
      ["正しい。", "正しい。", "これが誤り。explain は人を直接の目的語にとらない。explain to me にする。", "正しい。間接疑問で、主語 this machine に合わせて works。"],
      "explain to＋人（explain 人 物 は不可）", [["語法", "{{explain}} は第4文型をとらない。"], ["直す", "me → {{to me}}。"]]),
    err("e-hightime", 3, G("kateiho"), "It's high time we {{(A) leave}}, {{(B) or}} we {{(C) will be}} late {{(D) for}} the concert.",
      ["leave", "or", "will be", "for"], 0,
      ["これが誤り。It's high time＋仮定法過去 → left にする。", "正しい。命令・必要のあとの or「さもないと」。", "正しい。", "正しい。be late for。"],
      "It's (high) time＋過去形", [["構文", "{{It's high time S＋過去形}}：もう〜すべき時だ。"], ["直す", "leave → {{left}}。"]]),
    fill("f-without", 2, G("kateiho"), "(　　) your help, I could not have finished the project.",
      ["Without", "Unless", "Except", "Despite"], 0,
      ["正しい。Without＋名詞「〜がなかったら」（仮定法）。", "誤り。Unless は接続詞で、あとに節が必要。", "誤り。「〜を除いて」は意味が合わない。", "誤り。「〜にもかかわらず」は意味が合わない。"],
      "Without ～＝～がなかったら", [["主節", "{{could not have finished}}：仮定法過去完了。"], ["条件", "名詞だけで条件を表す {{Without}}。"]]),
    fill("f-cant", 2, G("jodoshi"), "He (　　) have been at home last night; I saw him at the concert.",
      ["can't", "mustn't", "shouldn't", "needn't"], 0,
      ["正しい。can't have＋過去分詞「〜したはずがない」。コンサートで見たので家にいたはずがない。", "誤り。mustn't have＋過去分詞は「〜したはずがない」の意味では使わない。", "誤り。「いるべきではなかった」は意味が合わない。", "誤り。「いる必要はなかった」は意味が合わない。"],
      "can't have＋過去分詞＝〜したはずがない", [["根拠", "コンサートで見た → 家にいた{{はずがない}}。"], ["形", "{{can't have been}}。"]]),
    fill("f-rather", 2, G("kateiho"), "I'd rather you (　　) smoke here.",
      ["didn't", "don't", "won't", "not"], 0,
      ["正しい。would rather＋S＋過去形「S に〜してほしい」（仮定法）。", "誤り。仮定法なので過去形にする。", "誤り。will は使わない。", "誤り。動詞の形が欠けている。"],
      "would rather＋S＋過去形", [["構文", "{{I'd rather S＋過去形}}：S に〜してもらいたい。"], ["否定", "didn't smoke。"]]),
    fill("f-advise", 1, G("futeishi"), "The doctor advised him (　　) drinking.",
      ["to stop", "stopping", "stop", "stopped"], 0,
      ["正しい。advise＋人＋to do「人に〜するよう忠告する」。", "誤り。advise 人 doing とは言わない。", "誤り。原形は続かない。", "誤り。過去形は続かない。"],
      "advise＋人＋to do", [["語法", "{{advise}}・tell・ask・want＋人＋to do。"], ["形", "advised him {{to stop}}。"]]),
    fill("f-mindif", 2, G("kateiho"), "Would you mind (　　) I opened the window?",
      ["if", "that", "what", "whether"], 0,
      ["正しい。Would you mind if I＋過去形 …?「〜してもかまいませんか」。", "誤り。mind that … の形でたずねない。", "誤り。what は合わない。", "誤り。whether では許可をたずねる文にならない。"],
      "Would you mind if I＋過去形？", [["形", "{{Would you mind if I …?}}：していいかたずねる。"], ["答え方", "No, not at all.（どうぞ）"]]),
    fill("f-helplaugh", 1, G("domeishi"), "I couldn't help (　　) when I saw his funny hat.",
      ["laughing", "to laugh", "laugh", "laughed"], 0,
      ["正しい。cannot help doing「〜せずにはいられない」。", "誤り。不定詞は続かない。", "誤り。原形は続かない。", "誤り。過去形は続かない。"],
      "cannot help -ing＝〜せずにいられない", [["構文", "{{cannot help doing}}。"], ["意味", "おかしな帽子を見て笑わずにいられなかった。"]]),
    fill("f-twothirds", 2, G("meishi"), "Two thirds of the students (　　) in favor of the plan.",
      ["were", "was", "is", "has been"], 0,
      ["正しい。分数＋of＋名詞は、of のあとの名詞に数を合わせる。students は複数。", "誤り。単数の動詞。", "誤り。単数で時制も合わない。", "誤り。単数の動詞。"],
      "分数 of A の数は A に合わせる", [["主語の中心", "{{of the students}}（複数）。"], ["形", "複数の過去 {{were}}。"]]),
  ]),
];

// =====================================================================
// 第4問　対話文（イディオムの意味）
// =====================================================================

const L4 = "次の対話文を読み、下線部の意味に最も近いものを選べ。また、対話の内容に関する問いに答えよ。";

const idm = (id: string, d: 1 | 2 | 3, no: string, options: string[], why: string[], point: string, st: St) =>
  ch(id, d, JUKU, 35, `下線部${no}の意味に最も近いものを選べ。`, options, 0, why, point, st);

const T4: ExamPoolSection[] = [
  P(4, "hiking", KAIWA, "週末のハイキングの相談", L4, "Planning a Hike",
    `Mika: Tom, are you still ①{{up for}} the hiking trip this weekend?
Tom: Of course. But I heard it might rain on Saturday. Should we ②{{call it off}}?
Mika: Let's not decide yet. The forecast changes all the time. We can ③{{play it by ear}} and check again on Friday night.
Tom: Sounds good. By the way, who's driving? My car is being repaired.
Mika: No problem. My sister said she'd lend me hers, so I can ④{{pick you up}} at eight.
Tom: Great. I'll bring the snacks. Oh, and don't forget that Ken wants to come too.
Mika: Ken? He always ⑤{{drags his feet}} on the trail, and we end up finishing after dark.
Tom: Come on, ⑥{{give him a break}}. He's been working out at the gym, so he might surprise us.
Mika: All right, all right. But if he's late in the morning, we're leaving without him.
Tom: Fair enough. I'll ⑦{{drop him a line}} tonight and tell him to be on time.
Mika: Thanks. Honestly, I can't wait. I've been ⑧{{cooped up}} indoors studying for weeks.`,
    6,
    [
      idm("upfor", 2, "①", ["willing to take part in", "worried about", "tired of", "responsible for"],
        ["正しい。be up for ～「〜に乗り気だ・参加するつもりだ」。", "誤り。「心配している」。", "誤り。「あきている」。", "誤り。「責任がある」。"],
        "be up for ～＝〜する気がある", [["語句", "{{be up for}}：〜に乗り気だ。"], ["返事", "Tom の Of course. と合う。"]]),
      idm("calloff", 1, "②", ["cancel it", "start it earlier", "make it longer", "invite more people"],
        ["正しい。call off「中止する」。雨なので中止すべきかとたずねている。", "誤り。「早く始める」。", "誤り。「長くする」。", "誤り。「人を増やす」。"],
        "call off＝cancel", [["語句", "{{call off}}＝cancel。"], ["文脈", "雨かもしれない → 中止する？"]]),
      idm("byear", 2, "③", ["decide later depending on the situation", "listen to the weather report on the radio", "follow a strict plan", "ask an expert for advice"],
        ["正しい。play it by ear「その場の状況に応じて決める」。金曜の夜にまた確かめる、とつながる。", "誤り。ear から「聞く」と考えた誤り。", "誤り。逆の意味。", "誤り。専門家にたずねる話ではない。"],
        "play it by ear＝臨機応変に決める", [["語句", "{{play it by ear}}：楽譜なしで弾く→その場で決める。"], ["文脈", "Let's not decide yet と合う。"]]),
      idm("pickup", 1, "④", ["come to get you by car", "lift you off the ground", "choose you for a team", "call you on the phone"],
        ["正しい。pick up＋人「車で迎えに行く」。車の話の流れに合う。", "誤り。文字どおりの「持ち上げる」。", "誤り。「選ぶ」は pick だけの意味。", "誤り。電話の話ではない。"],
        "pick 人 up＝車で迎えに行く", [["語句", "{{pick … up}}：（車で）拾う・迎えに行く。"], ["文脈", "姉の車を借りて、8時に迎えに行く。"]]),
      idm("dragfeet", 2, "⑤", ["moves very slowly", "complains loudly", "gets lost", "walks too fast"],
        ["正しい。drag one's feet「足を引きずる→のろのろする」。だから暗くなってから終わる。", "誤り。文句を言うのではない。", "誤り。道に迷う話ではない。", "誤り。逆の意味。"],
        "drag one's feet＝のろのろする", [["語句", "{{drag one's feet}}：足を引きずる・ぐずぐずする。"], ["結果", "we end up finishing after dark：遅いから。"]]),
      idm("break", 2, "⑥", ["stop being so hard on him", "let him take a rest", "break your promise to him", "give him a present"],
        ["正しい。give 人 a break「（人を）大目に見る・責めるのをやめる」。", "誤り。break を「休けい」と読んだ誤り。", "誤り。約束を破る話ではない。", "誤り。プレゼントの話ではない。"],
        "give 人 a break＝大目に見てやって", [["語句", "{{Give him a break.}}：かんべんしてやって。"], ["文脈", "Ken を悪く言う Mika に Tom が反論している。"]]),
      idm("dropline", 2, "⑦", ["send him a short message", "stop talking to him", "draw a picture for him", "wait in line for him"],
        ["正しい。drop 人 a line「（人に）短い便りを送る」。", "誤り。「話すのをやめる」ではない。", "誤り。line を「線」と読んだ誤り。", "誤り。line を「列」と読んだ誤り。"],
        "drop 人 a line＝ひとこと連絡する", [["語句", "{{drop … a line}}：手紙・メッセージを送る。"], ["文脈", "今夜連絡して、時間を守るよう伝える。"]]),
      idm("cooped", 2, "⑧", ["kept inside without going out", "cooking food at home", "sleeping very little", "worried about exams"],
        ["正しい。be cooped up「（せまい所に）閉じこめられる」。何週間も家にこもって勉強していた。", "誤り。料理の話ではない。", "誤り。睡眠の話ではない。", "誤り。不安の話ではない。"],
        "be cooped up＝閉じこもる", [["語句", "{{cooped up}}：鳥小屋（coop）に入れられた→閉じこもった。"], ["文脈", "だから外に出るハイキングが待ちきれない。"]]),
      ch("plan", 2, KAIWA, 60, "対話の内容に合うものを選べ。",
        ["If Ken is late in the morning, Mika and Tom will leave without him.", "Tom will drive because Mika's car is being repaired.", "They have already decided to cancel the trip because of rain.", "Mika is glad that Ken is coming with them."], 0,
        ["正しい。if he's late in the morning, we're leaving without him に合う。", "誤り。修理中なのは Tom の車で、運転するのは Mika。", "誤り。まだ決めず、金曜の夜に確かめる。", "誤り。Mika は最初、Ken が来ることに不満そうだった。"],
        "だれの車か・だれが言ったかを確かめる", [["車", "修理中は {{Tom}} の車。Mika が姉の車で迎えに行く。"], ["Ken", "遅れたら置いていく、と Mika が条件をつけた。"]], { think: true }),
    ]),

  P(4, "cafe", KAIWA, "アルバイト先での会話", L4, "At the Café",
    `Lisa: Hi, Jun. You look exhausted. Is everything OK?
Jun: Not really. I've been ①{{burning the midnight oil}} to finish my report for the seminar.
Lisa: Again? You should ②{{take it easy}}. You can't keep going like this.
Jun: I know, but the deadline is tomorrow, and I'm ③{{behind schedule}}.
Lisa: Why don't you ask Professor Hill for a few more days? She seems pretty understanding.
Jun: I thought about it, but I don't want to ④{{make a fuss}} about it.
Lisa: It's not a small thing if you're getting sick from lack of sleep. Anyway, the manager says we're ⑤{{short-handed}} today, so we'll be busy.
Jun: Great, just what I needed. Well, I'll do my best to ⑥{{keep up}}.
Lisa: Tell you what. I'll ⑦{{cover for}} you during the lunch rush so you can take a short nap in the back room.
Jun: Really? You're a lifesaver. I ⑧{{owe you one}}.
Lisa: Don't mention it. Just bring me a coffee next time.`,
    6,
    [
      idm("midnight", 2, "①", ["working late into the night", "cooking dinner very late", "saving money on electricity", "sleeping through the morning"],
        ["正しい。burn the midnight oil「夜おそくまで勉強・仕事をする」。", "誤り。料理の話ではない。", "誤り。電気代の話ではない。", "誤り。逆に寝ていない。"],
        "burn the midnight oil＝夜ふかしして働く", [["語句", "{{burn the midnight oil}}：真夜中に油（ランプ）を燃やす。"], ["文脈", "疲れきっている理由。"]]),
      idm("easy", 1, "②", ["relax and not work so hard", "find an easy topic", "finish quickly", "take the easiest class"],
        ["正しい。take it easy「むりをしない・のんびりする」。", "誤り。課題を簡単にする話ではない。", "誤り。「急いで終える」は逆。", "誤り。授業の選び方の話ではない。"],
        "take it easy＝むりをしない", [["語句", "{{take it easy}}：気楽にやる。"], ["文脈", "You can't keep going like this と続く。"]]),
      idm("behind", 1, "③", ["later than planned in my work", "ahead of the others", "waiting for the bus", "absent from class"],
        ["正しい。behind schedule「予定より遅れて」。", "誤り。「先に進んでいる」は ahead of schedule。", "誤り。バスの話ではない。", "誤り。欠席の話ではない。"],
        "behind schedule＝予定より遅れて", [["語句", "{{behind schedule}}⇔ahead of schedule。"], ["文脈", "締め切りは明日なのに、まだ終わっていない。"]]),
      idm("fuss", 2, "④", ["cause trouble by complaining", "make a joke", "keep a secret", "make a promise"],
        ["正しい。make a fuss「大さわぎする・文句を言ってさわぎたてる」。", "誤り。冗談の話ではない。", "誤り。秘密の話ではない。", "誤り。約束の話ではない。"],
        "make a fuss＝さわぎたてる", [["語句", "{{make a fuss (about)}}：（つまらないことで）さわぐ。"], ["文脈", "締め切りの延長をたのむのは大げさだと思っている。"]]),
      idm("short", 2, "⑤", ["without enough workers", "closing early", "out of coffee", "very quiet"],
        ["正しい。short-handed「人手が足りない」。だから忙しくなる。", "誤り。早じまいの話ではない。", "誤り。品切れの話ではない。", "誤り。逆に忙しい。"],
        "short-handed＝人手不足の", [["語句", "{{short-handed}}：hand（働き手）が short（足りない）。"], ["結果", "so we'll be busy。"]]),
      idm("keepup", 2, "⑥", ["work fast enough to manage", "stay awake all night", "keep the café open", "save some money"],
        ["正しい。keep up「（ペースに）ついていく」。忙しい店の仕事についていく。", "誤り。一晩中起きている話ではない。", "誤り。店を開けておく話ではない。", "誤り。お金の話ではない。"],
        "keep up＝ついていく", [["語句", "{{keep up (with)}}：おくれずについていく。"], ["文脈", "人手不足で忙しい日に、なんとかやっていく。"]]),
      idm("cover", 2, "⑦", ["do your work in your place", "hide you from the manager", "pay for your lunch", "protect you from the rain"],
        ["正しい。cover for 人「（人の）代わりに仕事をする」。", "誤り。cover を「かくす」と読んだ誤り。", "誤り。cover を「（費用を）まかなう」と読んだ誤り。", "誤り。cover を「おおう」と読んだ誤り。"],
        "cover for 人＝代わりを務める", [["語句", "{{cover for}}：人の代わりをする。"], ["文脈", "その間に仮眠できる。"]]),
      idm("oweone", 2, "⑧", ["I should do you a favor in return.", "I have to pay you back the money.", "I am sorry I was late.", "I need one more coffee."],
        ["正しい。I owe you one.「借りができた・恩に着る」。", "誤り。お金を借りたのではない。", "誤り。遅刻の話ではない。", "誤り。コーヒーの数の話ではない。"],
        "I owe you one＝借りができたね", [["語句", "{{owe}}：借りがある。one は1回分の親切。"], ["返事", "Don't mention it（どういたしまして）と合う。"]]),
      ch("lisa", 2, KAIWA, 60, "対話の内容に合うものを選べ。",
        ["Lisa suggests that Jun ask his professor for more time.", "Jun has already finished his report.", "The café has more workers than usual today.", "Lisa asks Jun to work during the lunch rush."], 0,
        ["正しい。Why don't you ask Professor Hill for a few more days? に合う。", "誤り。予定より遅れていて、まだ終わっていない。", "誤り。short-handed で人手が足りない。", "誤り。逆。Lisa が昼の忙しい時間を代わってくれる。"],
        "Why don't you ～?＝提案", [["提案", "{{Why don't you …?}}：〜したらどう？"], ["中身", "教授に数日の延長をたのむこと。"]], { think: true }),
    ]),

  P(4, "moving", KAIWA, "引っ越しの相談", L4, "Moving Day",
    `Ben: Hey, Yuki. I heard you're moving next month. How's the apartment hunting going?
Yuki: It's been ①{{a pain in the neck}}. Everything near the station ②{{costs an arm and a leg}}.
Ben: That's the city for you. Have you thought about living a little farther out?
Yuki: Yes, and I finally found a place I like. The rent is reasonable, and the owner seems nice. I'm going to ③{{sleep on it}} before I sign anything, though.
Ben: Smart move. Do you need help on moving day? I've got a truck, so I can ④{{lend a hand}}.
Yuki: Really? That would be great. But I don't want to ⑤{{put you out}}.
Ben: Not at all. I'm free that weekend anyway. Just ⑥{{give me a heads-up}} about the date.
Yuki: Will do. And I'll treat you to dinner afterwards. It's ⑦{{the least I can do}}.
Ben: Deal. By the way, are you going to get rid of that old sofa?
Yuki: I haven't ⑧{{made up my mind}} yet. It's old, but I'm attached to it.`,
    6,
    [
      idm("pain", 1, "①", ["very annoying", "very painful for my body", "great fun", "very cheap"],
        ["正しい。a pain in the neck「やっかいなこと・うんざりすること」。", "誤り。文字どおりの「首の痛み」ではない。", "誤り。逆の意味。", "誤り。値段の話ではない。"],
        "a pain in the neck＝やっかいなもの", [["語句", "{{a pain in the neck}}：悩みの種。"], ["文脈", "部屋さがしがうまくいかず、うんざりしている。"]]),
      idm("armleg", 1, "②", ["is extremely expensive", "is very dangerous", "is hard to reach", "is very small"],
        ["正しい。cost an arm and a leg「とても高くつく」。", "誤り。危険の話ではない。", "誤り。駅の近くなので行きにくくはない。", "誤り。広さの話ではない。"],
        "cost an arm and a leg＝目が飛び出るほど高い", [["語句", "{{cost an arm and a leg}}：腕と脚ほど高い。"], ["次の発言", "もう少し離れた所はどう？ と続く。"]]),
      idm("sleep", 2, "③", ["think about it overnight before deciding", "stay there for one night", "move in immediately", "forget about it"],
        ["正しい。sleep on it「一晩よく考える」。契約の前に考える。", "誤り。文字どおり泊まるのではない。", "誤り。逆。すぐには決めない。", "誤り。忘れるのではない。"],
        "sleep on it＝一晩考える", [["語句", "{{sleep on it}}：決める前に一晩おく。"], ["文脈", "before I sign anything、Ben も Smart move とほめる。"]]),
      idm("hand", 1, "④", ["help", "wave", "borrow money", "drive fast"],
        ["正しい。lend a hand「手を貸す・手伝う」。", "誤り。「手をふる」ではない。", "誤り。lend を「お金を貸す」と読んだ誤り。", "誤り。運転の速さの話ではない。"],
        "lend a hand＝手伝う", [["語句", "{{lend a hand}}＝help。"], ["文脈", "トラックがあるから引っ越しを手伝える。"]]),
      idm("putout", 3, "⑤", ["cause you trouble", "make you leave", "turn off your lights", "tell you a secret"],
        ["正しい。put 人 out「（人に）めいわくをかける」。", "誤り。「追い出す」と読んだ誤り。", "誤り。put out「（火・明かりを）消す」との混同。", "誤り。秘密の話ではない。"],
        "put 人 out＝めいわくをかける", [["語句", "{{put … out}}：人を不便にさせる。"], ["返事", "Not at all.（ぜんぜん）と合う。"]]),
      idm("headsup", 2, "⑥", ["tell me in advance", "look up at the sky", "pay attention to your health", "wake me up early"],
        ["正しい。give 人 a heads-up「前もって知らせる」。", "誤り。文字どおり上を見るのではない。", "誤り。健康の話ではない。", "誤り。起こす話ではない。"],
        "give a heads-up＝前もって知らせる", [["語句", "{{a heads-up}}：事前の知らせ。"], ["返事", "Will do.（そうする）＝日にちを知らせる。"]]),
      idm("least", 2, "⑦", ["a small way to thank you", "the cheapest dinner I can find", "the last thing I want to do", "something I am not able to do"],
        ["正しい。the least I can do「せめてそれくらいはさせて」。お礼の気持ち。", "誤り。安さの話ではない。", "誤り。「いちばんしたくないこと」は逆。", "誤り。できないことではない。"],
        "the least I can do＝せめてものお礼", [["語句", "{{the least I can do}}：私にできる最低限のこと。"], ["文脈", "手伝ってもらうお礼に夕食をおごる。"]]),
      idm("mind", 1, "⑧", ["decided", "remembered", "cleaned", "sold"],
        ["正しい。make up one's mind「決心する」。", "誤り。「覚えていた」ではない。", "誤り。「きれいにした」ではない。", "誤り。「売った」ではない。"],
        "make up one's mind＝決める", [["語句", "{{make up one's mind}}＝decide。"], ["文脈", "古いけれど愛着があり、まだ決めていない。"]]),
      ch("yuki", 2, KAIWA, 60, "対話の内容に合うものを選べ。",
        ["Yuki has found an apartment but has not signed anything yet.", "Yuki has decided to live near the station.", "Ben is busy on the weekend of the move.", "Yuki has already thrown away the old sofa."], 0,
        ["正しい。I finally found a place I like ／ I'm going to sleep on it before I sign anything に合う。", "誤り。駅の近くは高い。少し離れた所で見つけた。", "誤り。I'm free that weekend anyway とある。", "誤り。まだ決めていない（I haven't made up my mind yet）。"],
        "見つけた＝契約した、ではない", [["見つけた", "{{found a place I like}}。"], ["まだ", "{{before I sign anything}}：契約はこれから。"]]),
    ]),
];

export const U_AOYAMA_EIGO: UnivExam = {
  key: K,
  univ: "青山学院大学",
  kamoku: "英語",
  tier: "MARCH",
  order: 105,
  basis: "全学部日程の傾向を参考（80分・150点・大問4題・すべて選択式。個別学部日程は学部ごとに形式が異なる）",
  format: "大問4題・80分・マーク式。論説文と空所補充型の長文、誤り指摘をふくむ文法、対話文のイディオムを問う。",
  minutes: 80,
  groups: ["語彙", "文法", "技能"],
  sections: [
    { title: "第1問　長文読解（論説文）", lead: "次の英文を読み、問いに答えよ。", count: [7, 8], mix: [0.2, 0.5, 0.3], points: 50, prefer: "material", poolTag: `${K}:1` },
    { title: "第2問　長文読解（空所補充・内容理解）", lead: "次の英文を読み、問いに答えよ。", count: [7, 8], mix: [0.2, 0.5, 0.3], points: 40, prefer: "material", poolTag: `${K}:2` },
    { title: "第3問　文法・語法（誤り指摘・空所補充）", lead: "次の各問いに答えよ。", count: [9, 10], mix: [0.2, 0.5, 0.3], points: 35, prefer: "single", poolTag: `${K}:3` },
    { title: "第4問　対話文（イディオム）", lead: "次の対話文を読み、問いに答えよ。", count: [5, 6], mix: [0.2, 0.5, 0.3], points: 25, prefer: "material", poolTag: `${K}:4` },
  ],
  pool: [...T1, ...T2, ...T3, ...T4],
};
