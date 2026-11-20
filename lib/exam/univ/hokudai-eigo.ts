import type { UnivExam } from "./types";
import type { ExamPoolSection } from "../pool/types";
import type { QuestionB, Skill, SolutionStep } from "@/lib/moshi/types";

// 北海道大学型 英語（国公立・2次試験 前期日程の共通問題）。文系学部（英語150点）の傾向を参考にした形式（英文・設問はすべて書き下ろし）。
//   90分・150点・大問4題。I は論説の長文読解（下線部和訳・内容説明の記述が中心）、
//   II は長文読解（語句・接続表現の空所補充・言いかえ・内容一致・要約文の空所補充に、和訳と内容説明が少し）、
//   III は日本文の下線部の和文英訳、IV は意見を述べる自由英作文（80〜100語）。
//   英文の題材・地名（Nordhaven など）・登場する人物はすべて架空。実在の人物の発言は使っていない。
// 参考:
//   https://jyuke-labo.com/daigakujyukentaisaku/hokkaidodaigaku/kamokubetsu/ （令和8年度：英語90分・150点・大問4題。和訳・内容説明・語句補充・内容一致・言いかえ・意見記述の英作文）
//   https://manabi.benesse.ne.jp/daigaku/school/1025/senpai/report_202310251201090.html （受験生の声：長文の要約文を英語で補う問題と、長文にまつわる自由英作文）
//   https://www.hokkaido-np.co.jp/article/1282949/ （北大2次試験 前期日程の英語：長文読解の出題）

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

/** 4択 */
function C(id: string, difficulty: 2 | 3, unit: string, prompt: string, options: string[], why: string[], point: string, st: St[], skill: Skill = S): QuestionB {
  return { id, type: "B", difficulty, points: 9, seconds: 150, skill, unit, prompt, answer: { kind: "choice", options, correct: 0, why }, point, steps: steps(st) };
}

/** 下線部和訳 */
const WY = (id: string, n: number, d: 2 | 3, unit: string, model: string, rb: Rb, point: string, st: St[]) =>
  W(id, d, unit, `下線部(${n})を和訳せよ。`, model, rb, point, st, undefined, 480);

/** 内容説明 (字数) */
const WS = (id: string, d: 2 | 3, prompt: string, max: number, model: string, rb: Rb, point: string, st: St[]) =>
  W(id, d, U.chobun, `${prompt}（${max}字以内）`, model, rb, point, st, { max, unit: "字" }, 420);

const READ_LEAD = "次の英文を読み、下の設問に答えよ。";

function reading(tag: number, id: string, title: string, ptitle: string, body: string, questions: QuestionB[]): ExamPoolSection {
  return {
    unit: U.chobun,
    tag: `hokudai-eigo:${tag}`,
    section: {
      id: `hokudai-en-${id}`,
      title,
      lead: READ_LEAD,
      style: "reading",
      examOnly: true,
      material: [{ kind: "passage", lang: "en", title: ptitle, body }],
      pick: 5,
      questions,
    },
  };
}

// =====================================================================
// 第1問　長文読解（論説。下線部和訳と内容説明）
//   どの節も 和訳3（難3）→ 内容説明3（難2・3・3）→ 主旨の選択1（難2）の7問から5問
// =====================================================================

const P1: ExamPoolSection[] = [
  reading(
    1,
    "north-farm",
    "北国の農業と気候の変化を論じた文章",
    "A Warmer North, a Harder Choice",
    `For generations, farmers in the far north have worked within narrow limits. The growing season is short, the first frost can arrive before the harvest is finished, and many crops that flourish further south simply cannot ripen in time. It might seem, then, that a warming climate would be welcome news for such regions. Longer summers would allow farmers to plant earlier, harvest later and experiment with crops that were once out of reach. In some northern valleys this is already happening: fields that grew only potatoes and hardy grains a few decades ago now produce wine grapes and sweet corn. {{(1) Yet those who look more closely at these changes warn that a longer season is not the same thing as an easier one, and that the gains which are easiest to see may hide losses that are harder to measure.}}

One of these hidden losses concerns snow. In a cold region, a thick layer of snow acts like a blanket. It traps the heat that remains in the ground and keeps the soil from freezing deeply, so that roots and the tiny organisms that live among them survive the winter. When winters become milder, it is natural to assume that the soil will be warmer too. But milder winters often bring less snow and more rain, and bare ground loses heat quickly on clear nights. In one northern farming district, researchers found that the soil had frozen more deeply during several recent warm winters than during the colder winters remembered by older farmers. {{(2) What looks like a paradox becomes less surprising once we realize that it is not the temperature of the air but the presence of snow that decides how cold the soil becomes.}}

A second concern is timing. Plants respond to warmth by beginning to grow, but a warm spell in early spring may be followed by a sudden frost that destroys young buds. Insects that once died during the long winter may now survive in greater numbers, and pests from the south may arrive before farmers have learned how to deal with them. Each of these problems can be managed, but managing them requires knowledge that northern farmers have had little reason to acquire.

This points to the deepest difficulty. Farming in a harsh climate has always depended on knowledge built up slowly over many seasons: which slope dries first in spring, which variety of grain can survive a cold August, when it is safe to plant. Much of this knowledge was never written down; it was passed from parents to children and tested year after year against the weather. {{(3) When the climate changes faster than knowledge can be handed down from one generation to the next, such knowledge may become less reliable at the very moment when farmers most need something to rely on.}}

None of this means that northern farmers should refuse the opportunities that warming brings. Some have begun to treat their farms as places of careful experiment, growing a new crop on a small part of their land while keeping familiar ones elsewhere, and sharing the results with their neighbors. Such caution may seem slow, but it spreads the risk and turns individual successes and failures into knowledge that a whole community can use. The future of farming in the north may depend less on how quickly farmers adopt new crops than on how well they learn together.`,
    [
      WY("tr1", 1, 3, U.kankei, "しかし、こうした変化をもっと詳しく見る人々は、生育期間が長くなることは楽になることと同じではなく、最も目につきやすい利益が、測るのがより難しい損失を覆い隠しているかもしれないと警告する。", [
        ["those who look more closely at these changes を「こうした変化をもっと詳しく見る人々」と訳す", 4, ["詳しく見る人"]],
        ["a longer season is not the same thing as an easier one を訳す（one = season）", 4, ["同じではない", "楽"]],
        ["the gains which are easiest to see may hide losses that are harder to measure の二つの関係詞節を訳す", 4, ["目につきやすい", "測る", "隠"]],
      ], "warn that … and that … で警告の中身が二つ", [
        ["骨組み", "those who … {{warn that A, and that B}}：that 節が二つ並ぶ。"],
        ["代名詞", "an easier {{one}} の one ＝ season。「より楽な生育期間」。"],
      ]),
      WY("tr2", 2, 3, U.tokushu, "逆説のように見えることも、土壌がどれほど冷たくなるかを決めるのは空気の温度ではなく雪があるかどうかなのだと気づけば、それほど意外ではなくなる。", [
        ["What looks like a paradox を「逆説のように見えること」と訳す", 4, ["逆説"]],
        ["once we realize that … を「…と気づけば」と訳す", 3, ["気づけば", "わかれば"]],
        ["it is not A but B that decides … を強調構文として「…を決めるのはAではなくBだ」と訳す", 5, ["ではなく", "決める"]],
      ], "it is not A but B that ～ は強調構文", [
        ["接続詞 once", "{{once S V}}：「いったん…すれば」。"],
        ["強調構文", "{{it is not the temperature of the air but the presence of snow that}} decides …。how cold the soil becomes は間接疑問。"],
      ]),
      WY("tr3", 3, 3, U.hikaku, "気候が、知識が世代から世代へと受け継がれるよりも速く変化するとき、そうした知識は、農家が頼れるものを最も必要としているまさにその時に、あてにならなくなるかもしれない。", [
        ["faster than knowledge can be handed down from one generation to the next を訳す", 4, ["受け継がれる", "速く"]],
        ["at the very moment when … を「まさに…その時に」と訳す", 4, ["まさに"]],
        ["less reliable / something to rely on を「あてにならない」「頼れるもの」と訳す", 4, ["あてにならな", "頼れる"]],
      ], "the very ～ は「まさにその～」", [
        ["比較", "changes {{faster than knowledge can be handed down}}：比較の対象は「知識が受け継がれる速さ」。"],
        ["語句", "something {{to rely on}}：不定詞の形容詞用法で「頼れるもの」。"],
      ]),
      WS("blanket", 2, "第2段落で、寒冷地の厚い雪が「毛布」にたとえられているのはなぜか。説明せよ。", 60,
        "厚い雪が地中に残る熱を閉じこめて土が深く凍るのを防ぎ、根や土の中の小さな生物が冬を越せるようにするから。", [
          ["地中の熱を閉じこめ、土が深く凍るのを防ぐ", 6, ["熱", "凍る"]],
          ["根や小さな生物が冬を越せる", 6, ["根", "冬を越"]],
        ], "acts like a blanket の直後の文が理由", [
          ["根拠", "It {{traps the heat}} that remains in the ground and {{keeps the soil from freezing deeply}}。"],
          ["結果", "so that {{roots and the tiny organisms}} … survive the winter。"],
        ]),
      WS("timing", 3, "第3段落で、時期（timing）にかかわる問題として挙げられているものを二点説明せよ。", 80,
        "早春の暖かさで育ち始めた若い芽が、その後の急な霜で枯れてしまうこと。冬に死んでいた害虫が多く生き残り、南の害虫も対処法を学ぶ前にやって来ること。", [
          ["早春の暖かさのあとの急な霜で若い芽がやられる", 6, ["霜", "芽"]],
          ["害虫が冬を生きのび、南からも来る", 6, ["害虫", "南"]],
        ], "二点は but と Insects … の文に分かれる", [
          ["一点目", "a warm spell in early spring may be followed by {{a sudden frost that destroys young buds}}。"],
          ["二点目", "Insects … may now survive …, and {{pests from the south may arrive}} before farmers have learned …。"],
        ]),
      WS("experiment", 3, "第5段落で紹介されている農家の取り組みとはどのようなもので、筆者はそれにどのような利点を認めているか。説明せよ。", 90,
        "土地の一部で新しい作物を試し、残りでは慣れた作物を育てて、結果を近所と共有すること。危険を分散し、個々の成功や失敗を地域全体が使える知識に変える点。", [
          ["土地の一部で新作物を試し、他では慣れた作物を続ける", 5, ["一部", "慣れた"]],
          ["結果を近所と共有する", 3, ["共有"]],
          ["危険を分散し、地域全体の知識にする", 4, ["分散", "地域"]],
        ], "取り組みと利点を分けて書く", [
          ["取り組み", "growing a new crop {{on a small part of their land}} while keeping familiar ones elsewhere, and {{sharing the results}}。"],
          ["利点", "it {{spreads the risk}} and turns … into {{knowledge that a whole community can use}}。"],
        ]),
      C("main", 2, U.chobun, "本文の主張として最も適切なものを選べ。", [
        "A warmer climate offers northern farmers new chances, but it also brings less visible risks, so they need to learn carefully and together.",
        "A warmer climate will make farming in the north easier in every respect.",
        "Northern farmers should refuse to grow any new crops until the climate stops changing.",
        "Traditional knowledge has become useless, so farmers should rely only on written research.",
      ], [
        "正解。第1段落の「長い季節は楽な季節ではない」と、最終段落の「どれだけうまく共に学ぶか」に一致。",
        "第1段落 a longer season is not the same thing as an easier one と食いちがう。",
        "最終段落 None of this means that northern farmers should refuse the opportunities と食いちがう。",
        "第4段落は知識が「あてにならなくなるかもしれない」と言うだけで、無用だとも書かれた研究だけに頼れとも言っていない。",
      ], "機会と危険の両方を含む選択肢", [
        ["主張", "最終段落：未来は{{新しい作物をどれだけ早く採り入れるか}}より{{どれだけ共に学ぶか}}にかかる。"],
        ["誤りを消す", "「あらゆる点で楽」「新作物を拒め」は第1段落・最終段落と逆。"],
      ]),
    ],
  ),
  reading(
    1,
    "migration",
    "渡り鳥の追跡研究を論じた文章",
    "What the Tiny Travelers Taught Us",
    `Every autumn, millions of small birds leave the northern forests where they have raised their young and fly thousands of kilometers south. For most of history, people could only guess where they went. Some ancient writers believed that swallows spent the winter asleep at the bottom of ponds, and even a century ago scientists knew little more than that certain birds disappeared in one season and returned in another. The main method available to them was to place a small numbered ring on a bird's leg and hope that someone, somewhere, would find it again. {{(1) Since only a tiny fraction of the birds that were ringed were ever seen again, the picture that emerged was based on a few scattered points rather than on complete journeys.}}

This situation has changed dramatically in recent decades. Devices light enough to be carried by a bird weighing no more than a few coins now record where it is, sometimes every few minutes. When researchers first examined the data from such devices, many of their assumptions turned out to be wrong. Birds that were thought to fly south along the coast were found to cross open sea or desert without stopping. Others did not travel in a single straight line but made long detours, apparently to follow winds that saved them energy. Some individuals of the same species, breeding in the same forest, spent the winter in completely different countries.

Perhaps the most important lesson, however, concerns the places where birds rest along the way. A small bird cannot fly from the far north to the tropics on the fat it carries when it sets out. It must stop, often several times, to feed and recover its strength. These stopover sites, which may be a muddy shore, a patch of wetland or a strip of woodland beside a river, were once regarded as minor details in the story of migration. {{(2) The tracking data suggest instead that the survival of a whole population may depend on a handful of such places, and that the loss of a single one could matter more than the loss of large areas of the forest where the birds breed.}}

This has uncomfortable consequences for conservation. A country may protect its forests carefully and still watch the birds that nest there decline, because the cause of the decline lies far away, in a wetland that has been drained for farmland or on a coast that has been covered with buildings. {{(3) No single nation, however much it cares about wildlife, can protect a migratory species by acting within its own borders alone.}} Effective protection requires cooperation among all the countries a bird passes through, many of which have other urgent priorities.

The new knowledge also brings a new kind of responsibility. It is no longer possible to say that we do not know where these birds go or what they need. The journeys that once seemed mysterious have become maps, and the maps show where action is required. Whether that action is taken is no longer a scientific question but a political one.`,
    [
      WY("tr1", 1, 3, U.kankei, "標識をつけられた鳥のうち、ふたたび目撃されたのはほんのわずかな割合にすぎなかったので、そこから浮かび上がった全体像は、旅の全体ではなく、散らばったいくつかの点にもとづくものだった。", [
        ["only a tiny fraction of the birds that were ringed were ever seen again を「標識をつけた鳥のうちほんのわずかしか再び見られなかった」と訳す", 4, ["わずか", "ふたたび"]],
        ["the picture that emerged を「浮かび上がった全体像」と訳す", 4, ["浮かび上が", "像"]],
        ["based on A rather than on B を「BではなくAにもとづく」と訳す", 4, ["ではなく", "もとづ"]],
      ], "Since は理由、rather than は対比", [
        ["理由", "{{Since}} only a tiny fraction of the birds {{that were ringed}} were ever seen again：主語は fraction。"],
        ["対比", "based on {{a few scattered points rather than on complete journeys}}。"],
      ]),
      WY("tr2", 2, 3, U.hikaku, "追跡データはむしろ、個体群全体の存続がそうした場所のほんの数か所にかかっているかもしれず、そのうちのたった一か所が失われることのほうが、鳥が繁殖する森の広い範囲が失われることよりも重大でありうることを示している。", [
        ["suggest instead that … and that … を「むしろ…ということと…ということを示している」と訳す", 4, ["むしろ", "示し"]],
        ["depend on a handful of such places を「ほんの数か所にかかっている」と訳す", 4, ["数か所", "かかって"]],
        ["the loss of a single one could matter more than the loss of … を比較として訳す", 4, ["一か所", "重大", "より"]],
      ], "matter は動詞で「重要である」", [
        ["骨組み", "The tracking data {{suggest instead that A, and that B}}：instead は「かつての見方とは反対に」。"],
        ["比較", "the loss of a single one {{could matter more than}} the loss of large areas …：one = stopover site。"],
      ]),
      WY("tr3", 3, 3, U.tokushu, "どれほど野生生物を大切に思っていても、自国の国境の内側だけで行動することによって渡りをする種を守ることのできる国は一つもない。", [
        ["No single nation … can … を「…できる国は一つもない」と訳す", 4, ["一つもない"]],
        ["however much it cares about wildlife を譲歩として訳す", 4, ["どれほど"]],
        ["by acting within its own borders alone を「自国の国境の内側だけで行動して」と訳す", 4, ["国境", "だけ"]],
      ], "however much S V は「どれほど…しても」", [
        ["譲歩", "{{however much it cares}}：it = nation。挿入された譲歩節。"],
        ["否定", "{{No single nation}} … can protect …：全体を「〜できる国はない」とまとめる。"],
      ]),
      WS("wrong", 2, "第2段落で、追跡装置のデータによって誤りだとわかった想定の例として、どのようなことが挙げられているか。二つ説明せよ。", 80,
        "海岸沿いに南下すると考えられていた鳥が、休まず海や砂漠を横断していたこと。また、一直線に進まず、エネルギーを節約できる風に乗るため大きく遠回りする鳥がいたこと。", [
          ["海岸沿いと思われていた鳥が海や砂漠を休まず横断した", 6, ["海岸", "横断"]],
          ["一直線でなく、風に乗るため遠回りした（または同じ森の鳥が別々の国で越冬した）", 6, ["遠回り", "風", "別々"]],
        ], "三つの例から二つを選ぶ", [
          ["一つ目", "Birds that were thought to fly south {{along the coast}} were found to {{cross open sea or desert}}。"],
          ["二つ目", "{{made long detours}}, apparently to follow winds that saved them energy。同じ森の鳥が別の国で越冬した例でもよい。"],
        ]),
      WS("stopover", 3, "第3段落で、中継地がかつての見方とは違って重要であるのはなぜか。鳥の側の事情に即して説明せよ。", 70,
        "小さな鳥は出発時に蓄えた脂肪だけでは北から熱帯まで飛べず、途中で何度も降りて食べ物をとり、体力を回復しなければならないから。", [
          ["出発時の脂肪だけでは目的地まで飛べない", 6, ["脂肪", "飛べ"]],
          ["途中で何度も止まり、食べて体力を回復する", 6, ["途中", "回復"]],
        ], "cannot fly … on the fat it carries が核", [
          ["根拠", "A small bird {{cannot fly … on the fat it carries when it sets out}}。"],
          ["続き", "It must stop, often several times, {{to feed and recover its strength}}。"],
        ]),
      WS("decline", 3, "第4段落で、ある国が森を手厚く守っていても、そこで繁殖する鳥が減ることがあるのはなぜか。説明せよ。", 70,
        "減少の原因が遠く離れた場所にあり、渡りの途中の湿地が農地のために干拓されたり、海岸が建物で覆われたりしているから。", [
          ["原因が遠く離れた場所にある", 6, ["遠く"]],
          ["中継地の湿地・海岸が失われている", 6, ["湿地", "海岸"]],
        ], "because 以下をそのまま具体化する", [
          ["根拠", "because {{the cause of the decline lies far away}}。"],
          ["具体", "a wetland that has been {{drained for farmland}} / a coast that has been {{covered with buildings}}。"],
        ]),
      C("main", 2, U.chobun, "最終段落の内容をふまえ、本文全体の主張として最も適切なものを選べ。", [
        "Now that tracking has revealed where migratory birds go and what they need, protecting them has become a matter of political will.",
        "Scientists still know almost nothing about where small birds spend the winter.",
        "Protecting the forests where birds breed is enough to save migratory species.",
        "Stopover sites are minor details compared with the forests where birds nest.",
      ], [
        "正解。最終段落：行き先も必要なものも「わからない」とはもう言えず、行動するかどうかは政治の問題だ、に一致。",
        "第2段落以降、追跡装置で多くのことがわかったと述べている。",
        "第4段落：森を守っても鳥が減ることがある、と食いちがう。",
        "第3段落：かつてはそう見なされたが、データはむしろ逆を示す、とある。",
      ], "「科学の問題」から「政治の問題」へ", [
        ["主張の箇所", "最終段落：{{no longer a scientific question but a political one}}。"],
        ["誤りを消す", "「森だけで足りる」「中継地はささいなこと」は第3・4段落と逆。"],
      ]),
    ],
  ),
  reading(
    1,
    "dialect",
    "方言の変化を論じた文章",
    "Dialects That Refuse to Disappear",
    `For much of the last century, it was widely predicted that regional dialects would soon disappear. Radio and then television brought the standard language into every home, schools taught children to speak "correctly," and people moved in growing numbers from villages to cities, where they mixed with speakers from many regions. It seemed only a matter of time before the varied speech of the countryside gave way to a single national way of talking. {{(1) Linguists who have returned to the same towns again and again over several decades, however, describe something more complicated than a simple disappearance.}}

It is true that many old dialect words have been lost. Words for farming tools that are no longer used, or for kinds of weather that were once important to fishermen, have faded along with the activities that gave them meaning. Grandparents in one small coastal town, for example, could name a dozen kinds of wind, while their grandchildren recognize only two or three. But the loss of vocabulary is only part of the story. Features of pronunciation and grammar have proved far more durable. Young people who never use their grandparents' words may still speak with the rhythm and intonation of their region, and they may use local grammatical endings without being aware that they are doing so.

More surprisingly, dialects do not only lose features; they also create new ones. When people from different regions settle together in a new town, their children do not simply adopt the standard language. Instead, they often develop a mixed variety that combines elements from several dialects and that none of their parents spoke. Within a generation or two, this mixture can become the recognizable speech of the town. {{(2) A dialect, in other words, is better thought of as a living process than as a set of old words waiting to be collected before they vanish.}}

Why do dialects survive at all, when the standard language is so easily available? Part of the answer is that speech does more than carry information. It also signals who we are and where we belong. A young woman who speaks the standard language at her office in the capital may slip back into her local speech the moment she telephones her mother. {{(3) Far from being a sign that she has failed to master the standard, this ability to move between two ways of speaking allows her to show different sides of herself to different people.}} Many speakers value their dialect precisely because it is not used everywhere; it marks a bond that strangers do not share.

This suggests that efforts to preserve dialects by recording old words, valuable as they are, capture only part of what a dialect is. A dialect stays alive not because it is stored in a dictionary but because people continue to find it useful for saying something that the standard language cannot say as well: that they come from somewhere in particular.`,
    [
      WY("tr1", 1, 3, U.kankei, "しかし、何十年にもわたって同じ町に何度も足を運んできた言語学者たちは、単純な消滅よりも複雑な事態を描き出している。", [
        ["who have returned to the same towns again and again over several decades を現在完了の継続・反復として訳す", 4, ["何十年", "何度も"]],
        ["describe something more complicated than a simple disappearance を訳す", 5, ["複雑", "消滅"]],
        ["however を逆接として訳す", 3, ["しかし"]],
      ], "however は文中に挿入された逆接", [
        ["主語", "{{Linguists who have returned …}}：関係詞節が長い主語。動詞は describe。"],
        ["比較", "something {{more complicated than}} a simple disappearance：「単なる消滅より複雑なこと」。"],
      ]),
      WY("tr2", 2, 3, U.hikaku, "つまり、方言とは、消えてしまう前に集められるのを待っている古い言葉の集まりとしてよりも、生きている過程として考えるほうがよいのである。", [
        ["in other words を「つまり」と訳す", 3, ["つまり"]],
        ["is better thought of as A than as B を「BとしてよりAとして考えるほうがよい」と訳す", 5, ["よりも", "ほうがよい"]],
        ["a set of old words waiting to be collected before they vanish を訳す", 4, ["集められる", "待って", "消え"]],
      ], "think of A as B の受動態＋比較", [
        ["構文", "A dialect is {{better thought of as}} a living process {{than as}} a set of old words …。"],
        ["分詞", "old words {{waiting to be collected}}：現在分詞が後ろから修飾。"],
      ]),
      WY("tr3", 3, 3, U.domeishi, "それは彼女が標準語を身につけそこなったしるしであるどころか、二つの話し方を行き来するこの能力のおかげで、彼女は異なる人々に自分の異なる面を見せることができるのである。", [
        ["Far from being a sign that … を「…というしるしであるどころか」と訳す", 4, ["どころか"]],
        ["this ability to move between two ways of speaking を訳す", 4, ["行き来", "能力"]],
        ["allows her to show different sides of herself to different people を訳す", 4, ["異なる面", "見せ"]],
      ], "far from -ing は「〜どころか」", [
        ["熟語", "{{Far from being}} a sign that she has failed to master the standard：that 節は sign の同格。"],
        ["無生物主語", "this ability … {{allows her to show}} …：「この能力のおかげで彼女は…できる」。"],
      ]),
      WS("predict", 2, "第1段落で、方言はやがて消えると予測された理由として挙げられていることを三点説明せよ。", 80,
        "ラジオやテレビで標準語がすべての家庭に届いたこと、学校で「正しい」話し方が教えられたこと、人々が村から都市へ移り多くの地方の人と交わったこと。", [
          ["ラジオ・テレビで標準語が家庭に届いた", 4, ["ラジオ", "テレビ"]],
          ["学校で「正しく」話すよう教えた", 4, ["学校"]],
          ["村から都市へ移り、各地の人と交わった", 4, ["都市", "交わ"]],
        ], "第2文の三つの並列をそのまま拾う", [
          ["並列", "{{Radio and then television}} …, {{schools}} taught …, and {{people moved}} …。"],
          ["まとめる", "メディア・学校・人の移動の三点。"],
        ]),
      WS("durable", 3, "第2段落によれば、方言のうち失われやすいものと残りやすいものはそれぞれ何か。失われやすい理由も含めて説明せよ。", 90,
        "使われなくなった道具や天気を表す語彙は、それに意味を与えた活動とともに失われやすいが、発音の調子や文法の語尾は残りやすく、若者も知らずに使い続けている。", [
          ["語彙は、意味を与えた活動とともに失われる", 6, ["語彙", "活動"]],
          ["発音・抑揚・文法の語尾は残る", 6, ["発音", "文法"]],
        ], "語彙と発音・文法の対比", [
          ["失われるもの", "Words for farming tools … have faded {{along with the activities that gave them meaning}}。"],
          ["残るもの", "{{Features of pronunciation and grammar}} have proved far more durable。"],
        ]),
      WS("create", 3, "第3段落で述べられている、方言が「新しい特徴を生み出す」とはどのようなことか。説明せよ。", 90,
        "異なる地方の人が新しい町に住むと、子どもたちは標準語をそのまま使うのではなく、複数の方言を組み合わせた、親のだれも話さなかった言葉を生み、それが町の話し方になるということ。", [
          ["子どもは標準語をそのまま採り入れるのではない", 3, ["標準語"]],
          ["複数の方言を混ぜた、親のだれも話さない言葉を生む", 5, ["混", "組み合わせ", "親"]],
          ["一、二世代で町の話し方になる", 4, ["町", "世代"]],
        ], "do not simply A. Instead, B", [
          ["否定", "their children {{do not simply adopt the standard language}}。"],
          ["中身", "a mixed variety that combines elements from several dialects and {{that none of their parents spoke}}。"],
        ]),
      C("main", 2, U.chobun, "本文の主張として最も適切なものを選べ。", [
        "Dialects keep changing and surviving because people use them to show where they come from and belong.",
        "Regional dialects have almost completely disappeared, just as people predicted a century ago.",
        "The best way to keep a dialect alive is to record its old words in a dictionary.",
        "People who use their dialect at home have usually failed to learn the standard language.",
      ], [
        "正解。第4段落 speech … signals who we are and where we belong と最終段落に一致。",
        "第1段落の予測に対し、言語学者は「単純な消滅より複雑」と述べている。",
        "最終段落：辞書に保存されているからではなく、人々が役立つと思うから生きつづける、とある。",
        "第4段落 Far from being a sign that she has failed to master the standard と食いちがう。",
      ], "辞書（記録）より使い手の意識", [
        ["主張", "最終段落：A dialect stays alive {{not because it is stored in a dictionary but because people continue to find it useful}}。"],
        ["誤りを消す", "「ほぼ消えた」「辞書が一番」は第1段落・最終段落と逆。"],
      ]),
    ],
  ),
];

// =====================================================================
// 第2問　長文読解（空所補充・言いかえ・内容一致・要約文の空所補充に、和訳と内容説明）
//   どの節も 空所A・空所B・言いかえ（難2）→ 和訳・内容説明（難3）→ 内容一致（難2）→ 要約文の空所（難3）の7問から5問
// =====================================================================

const P2: ExamPoolSection[] = [
  reading(
    2,
    "snow-city",
    "雪と都市計画を論じた文章",
    "Learning to Live with Snow",
    `In cities that receive heavy snow, winter has traditionally been treated as an enemy to be defeated. Each year, fleets of trucks and ploughs work through the night to clear the roads, and huge sums are spent carrying snow away and dumping it into rivers or onto empty land outside the city. The aim is to make the winter city function as much as possible like a summer one. This approach has obvious benefits: ambulances can reach patients, buses can run, and shops can stay open. [ A ], it is expensive, it uses large amounts of fuel, and it rests on an assumption that a growing number of planners are beginning to question.

The assumption is that snow is simply a problem. Consider a northern city, which we will call Nordhaven, where snow covers the ground for nearly five months of the year. When its planners surveyed residents about winter, they expected complaints about icy pavements and blocked roads, and they received many. But they also found that many residents, especially children and older people, said that they rarely went outside at all between December and March. {{(1) The city had spent enormous sums keeping its roads open for cars, while giving little thought to whether people actually wanted to be outdoors in winter, or to what might make them want to.}}

This discovery led the planners to turn the problem on its head. Instead of asking how to remove snow as quickly as possible, they began to ask how the city could be designed so that winter was something to enjoy rather than merely survive. Some of the answers were simple. Paths in parks were cleared first, before less-used roads, and benches were placed where they would catch the low winter sun. New buildings were planned so as to block the coldest winds rather than funnel them down the street. Snow cleared from the city center was piled up in a park, where it became a hill for children to slide down.

Other ideas treated snow as a resource. Snow is, in effect, stored cold. A large mound of it, covered with a thick layer of wood chips, can last well into summer, and the cold water that melts from it can be used to cool buildings when the weather turns hot. [ B ] this method is not suitable for every building, a hospital in Nordhaven now meets part of its summer cooling needs in this way, saving both money and electricity.

None of these measures makes snow disappear, and the roads still have to be cleared. What has changed is the question the city asks. A city that sees winter only as a threat will measure its success by how little of the winter its residents notice. A city that accepts winter as part of its character may measure success differently: by how many people are out on its streets on a snowy afternoon.`,
    [
      C("blank-a", 2, U.setsuzoku, "空所［ A ］に入る最も適切なものを選べ。", ["However", "For instance", "In other words", "Therefore"], [
        "正解。直前の「明らかな利点」に対し、費用・燃料・前提への疑問という欠点を続ける逆接。",
        "後ろは前の利点の例ではない。",
        "後ろは前の言いかえではなく、反対の面を述べている。",
        "利点から「だから高くつく」とはつながらない。",
      ], "利点 → 欠点の転換", [
        ["前後の関係", "前：{{obvious benefits}}。後：{{expensive}}・fuel・question される前提。"],
        ["選ぶ", "反対の内容を導くので {{However}}。"],
      ], K),
      C("blank-b", 2, U.setsuzoku, "空所［ B ］に入る最も適切なものを選べ。", ["Although", "Because", "Unless", "Once"], [
        "正解。「すべての建物に向くわけではないが、病院では使っている」という譲歩。",
        "「向かないから使っている」では意味が通らない。",
        "「向かないのでなければ」では後ろの事実とつながらない。",
        "「いったん向かなくなると」では意味が通らない。",
      ], "前半と後半が逆向きなら譲歩", [
        ["前後の関係", "前半：{{not suitable for every building}}。後半：病院では{{使っている}}。"],
        ["選ぶ", "逆向きの二つを一文にまとめる譲歩の {{Although}}。"],
      ], K),
      C("head", 2, U.vocab, "第3段落の turn the problem on its head の意味に最も近いものを選べ。", [
        "look at the problem from the opposite direction",
        "make the problem much worse than before",
        "give up trying to solve the problem",
        "solve the problem by spending more money",
      ], [
        "正解。直後の Instead of asking … they began to ask … が、問いの立て方を逆にしたことを示している。",
        "問題が悪化したという記述はない。",
        "解決をあきらめたのではなく、別の問いを立てた。",
        "費用をふやしたのではなく、考え方を変えた。",
      ], "直後の Instead of で中身を確かめる", [
        ["文脈", "{{Instead of asking how to remove snow}} … {{they began to ask how the city could be designed}} …。"],
        ["意味", "on its head＝さかさまに。問題の{{見方を逆転させる}}こと。"],
      ], K),
      WY("tr1", 1, 3, U.domeishi, "市は、車のために道路を通れるようにしておくことに莫大な金額を費やしてきた一方で、人々が冬に実際に外にいたいと思っているのかどうか、あるいは何があれば外に出たくなるのかについては、ほとんど考えてこなかったのである。", [
        ["had spent enormous sums keeping its roads open を「道路を通れるようにしておくことに莫大な金額を費やしてきた」と訳す", 4, ["莫大", "費やし"]],
        ["while giving little thought to … を「一方で…はほとんど考えなかった」と訳す", 4, ["一方", "ほとんど"]],
        ["whether … or what might make them want to (be outdoors) を補って訳す", 4, ["かどうか", "何があれば"]],
      ], "spend 金 -ing と want to の後ろの省略", [
        ["語法", "{{spend + 金額 + -ing}}：〜することに金を使う。keep A open：Aを開けておく。"],
        ["省略", "what might make them {{want to (be outdoors)}}：to の後ろを補う。"],
      ]),
      WS("resource", 3, "第4段落で、雪を「資源」として扱うとはどのようなことか。具体的に説明せよ。", 80,
        "雪を蓄えられた冷たさとみなし、木くずで覆った大きな雪山を夏まで残して、とけた冷たい水で暑い時期に建物を冷やすということ。", [
          ["雪は蓄えられた冷たさだ", 4, ["冷たさ"]],
          ["木くずで覆った雪山を夏まで残す", 4, ["木くず", "夏"]],
          ["とけた冷たい水で建物を冷やす", 4, ["とけ", "冷や"]],
        ], "stored cold の言いかえを具体例で補う", [
          ["定義", "Snow is, in effect, {{stored cold}}。"],
          ["具体", "covered with {{a thick layer of wood chips}} … the cold water that melts from it can be used {{to cool buildings}}。"],
        ]),
      C("match", 2, U.chobun, "本文の内容と一致するものを選べ。", [
        "The planners found that many children and older people seldom went outside in winter.",
        "Nordhaven decided to stop clearing its roads in winter.",
        "Snow cleared from the city center was dumped into a river.",
        "Every building in Nordhaven is now cooled with snow in summer.",
      ], [
        "正解。第2段落 many residents, especially children and older people, said that they rarely went outside に一致。",
        "最終段落 the roads still have to be cleared と食いちがう。",
        "第3段落：中心部の雪は公園に積まれ、子どものそり山になった。",
        "第4段落：すべての建物に向くわけではなく、例は病院。",
      ], "every・stop など言いすぎの語に注意", [
        ["根拠", "第2段落：especially children and older people … {{rarely went outside at all}}。"],
        ["誤りの確認", "{{still have to be cleared}}（最終段落）・{{not suitable for every building}}（第4段落）。"],
      ]),
      C("summary", 3, U.chobun, "次は本文の要約である。空所に入る最も適切なものを選べ。\nRather than treating snow only as a problem to be removed, a city can (　　　).", [
        "design itself so that people enjoy winter and even make use of the snow",
        "stop spending money on ambulances and buses during the winter",
        "move most of its residents to warmer places until spring",
        "cover all of its streets so that no snow reaches the ground",
      ], [
        "正解。第3段落（冬を楽しめる街の設計）と第4段落（雪を資源に）の両方をまとめている。",
        "救急車やバスを止めるという話はない。利点として挙げられている。",
        "住民を移すという話はない。",
        "通りを覆うという話はない。",
      ], "要約は複数の段落をまとめた選択肢", [
        ["段落の要点", "第3段落：{{something to enjoy}}。第4段落：{{snow as a resource}}。"],
        ["選ぶ", "両方を含む選択肢が要約になる。"],
      ]),
    ],
  ),
  reading(
    2,
    "short-stop",
    "渡りをやめる鳥を論じた文章",
    "Staying Closer to Home",
    `Migration is one of the most impressive habits in the animal world, but it is also one of the most dangerous. A bird that flies thousands of kilometers each autumn must cross mountains, seas and deserts, and it faces storms, predators and the risk of finding no food when it lands. Large numbers of young birds die on their first journey. Why, then, do so many species take such risks? The usual answer is that the northern winter would be even more dangerous: food becomes scarce, days are short, and cold nights use up energy that a small body cannot easily replace. Migration, in this view, is the lesser of two evils.

If this explanation is correct, we would expect migration to change when winters change, and that is [ A ] what researchers have begun to observe. In several parts of northern Europe and Asia, birds of species that once left every autumn are now seen in growing numbers throughout the winter. Some of them have not simply stayed in their breeding grounds; they have shortened their journeys, wintering a few hundred kilometers to the south instead of crossing to another continent. {{(1) For these birds, the shorter trip appears to offer a better balance between the dangers of traveling far and the dangers of staying where winter is severe.}}

Milder winters are not the only cause. In many towns, people put out food for birds in winter, and gardens are full of plants that keep their berries until spring. A bird that might once have starved in January may now survive comfortably on what it finds near houses. Studies of one small songbird have shown that individuals wintering near towns return to their breeding sites earlier in spring than those that travel far, and so they can claim the best territories. [ B ], staying behind can bring advantages that last well beyond the winter itself.

It would be a mistake, however, to conclude that these birds have found an easy solution. Winters in the north are still unpredictable, and a single severe cold spell can kill large numbers of birds that have chosen not to leave. In years when such a spell arrives, it is the birds that migrated as usual that survive. Migration, in other words, is less a fixed rule than a bet, and different individuals in the same population may be placing different bets.

This variety may turn out to be important. A population in which every bird behaves in the same way can be wiped out by a single unexpected event. A population that contains both travelers and stay-at-homes is more likely to have some survivors whatever the winter brings. Scientists studying these changes are therefore interested not only in where birds go, but in why individuals of the same species make different choices, and how quickly those choices can shift as the climate continues to change.`,
    [
      C("blank-a", 2, U.vocab, "空所［ A ］に入る最も適切な語を選べ。", ["exactly", "hardly", "rarely", "never"], [
        "正解。「冬が変われば渡りも変わるはず」という予想どおりのことが観察されている、の意。直後に越冬する鳥の増加が続く。",
        "「ほとんど観察していない」では、直後の具体例と食いちがう。",
        "「めったに観察しない」では、直後の具体例と食いちがう。",
        "「決して観察しない」では、直後の具体例と食いちがう。",
      ], "直後の具体例が予想を裏づけている", [
        ["前後の関係", "予想：{{migration to change when winters change}}。後ろ：冬にとどまる鳥が{{in growing numbers}}。"],
        ["選ぶ", "that is {{exactly}} what …「それこそまさに…だ」。"],
      ], K),
      C("blank-b", 2, U.setsuzoku, "空所［ B ］に入る最も適切なものを選べ。", ["In this way", "On the other hand", "Even so", "Instead"], [
        "正解。春に早く戻ってよいなわばりを得る、という前の内容を受けて「このように、とどまることには冬の後まで続く利点がある」とまとめる。",
        "前後は対立していない。",
        "「それでも」では、前の利点と後ろの利点がつながらない。",
        "「その代わりに」では意味が通らない。",
      ], "前の具体例をまとめる語句", [
        ["前後の関係", "前：{{return … earlier}}、{{the best territories}}。後：冬の後まで続く利点。"],
        ["選ぶ", "具体例をまとめる {{In this way}}。"],
      ], K),
      C("evils", 2, U.vocab, "第1段落の the lesser of two evils の意味に最も近いものを選べ。", [
        "the less harmful of two bad choices",
        "the more exciting of two adventures",
        "the only choice that involves no danger",
        "a choice that is just as bad as the other one",
      ], [
        "正解。渡りも危険だが、北の冬はさらに危険なので、ましなほう、という意味。",
        "「冒険」の楽しさの話ではない。",
        "渡りにも多くの危険があると第1段落にある。",
        "lesser（より小さい）なので、同じくらい悪いのではない。",
      ], "lesser は little の比較級（より小さい）", [
        ["文脈", "the northern winter would be {{even more dangerous}}：冬のほうが危険。"],
        ["意味", "the lesser of two evils：二つの悪いことのうち{{ましなほう}}。"],
      ], K),
      WY("tr1", 1, 3, U.chobun, "こうした鳥にとって、より短い旅は、遠くまで移動することの危険と、冬が厳しい場所にとどまることの危険とのあいだで、よりよい釣り合いをもたらしているように思われる。", [
        ["appears to offer を「もたらしているように思われる」と訳す", 4, ["思われる", "ようだ"]],
        ["a better balance between A and B を「AとBのあいだのよりよい釣り合い」と訳す", 4, ["釣り合い", "あいだ"]],
        ["the dangers of staying where winter is severe を訳す", 4, ["厳しい", "とどまる"]],
      ], "where は「〜する場所に」の関係副詞", [
        ["骨組み", "the shorter trip {{appears to offer}} a better balance {{between A and B}}。"],
        ["関係副詞", "staying {{where winter is severe}}：「冬が厳しい所にとどまること」。"],
      ]),
      WS("bet", 3, "第4段落で、筆者が渡りを「決まった規則というより賭けだ」と述べているのはなぜか。説明せよ。", 80,
        "北の冬は今も予測できず、厳しい寒波が来ると残った鳥が大量に死ぬ一方で、ふだんどおり渡った鳥が生き残るので、どちらが有利かは年によって変わるから。", [
          ["北の冬は今も予測できない", 4, ["予測"]],
          ["寒波の年は残った鳥が死に、渡った鳥が生き残る", 4, ["寒波", "生き残"]],
          ["どちらが有利かは年によって変わる", 4, ["年", "有利"]],
        ], "less A than B は「AというよりB」", [
          ["根拠", "Winters in the north are {{still unpredictable}}, and a single severe cold spell can kill …。"],
          ["強調構文", "it is {{the birds that migrated as usual}} that survive。"],
        ]),
      C("match", 2, U.chobun, "本文の内容と一致するものを選べ。", [
        "Some birds that used to cross to another continent now spend the winter only a few hundred kilometers south.",
        "Milder winters are the only reason why some birds no longer migrate far.",
        "Birds that winter near towns return to their breeding sites later than those that travel far.",
        "A population in which every bird behaves in the same way is the safest.",
      ], [
        "正解。第2段落 wintering a few hundred kilometers to the south instead of crossing to another continent に一致。",
        "第3段落 Milder winters are not the only cause と食いちがう。",
        "第3段落 return … earlier in spring と逆。",
        "最終段落：一度の思いがけない出来事で全滅しうる、とある。",
      ], "only・later など一語の違いに注意", [
        ["根拠", "第2段落：they have {{shortened their journeys}}。"],
        ["誤りの確認", "{{not the only cause}}（第3段落）・{{earlier}}（第3段落）と照らす。"],
      ]),
      C("summary", 3, U.chobun, "次は本文の要約である。空所に入る最も適切なものを選べ。\nSome northern birds now stay closer to home in winter, partly because winters are milder and food is easy to find near towns. However, because winters remain unpredictable, (　　　).", [
        "a mix of birds that migrate and birds that stay may help a population survive",
        "all birds would be wiser to stop migrating at once",
        "scientists have stopped studying where birds go",
        "migration has become safer than staying in the north",
      ], [
        "正解。最終段落：旅する鳥ととどまる鳥の両方がいる個体群は、どんな冬でも生き残りが出やすい。",
        "第4段落：とどまるのは「簡単な解決」ではないと述べている。",
        "最終段落：科学者は行き先だけでなく選択の理由にも関心を持っている。",
        "どちらが安全かは年によって変わる、というのが本文の考え方。",
      ], "However の後は第4・5段落の内容", [
        ["要約の流れ", "前半：第2・3段落（とどまる理由）。後半：第4・5段落（{{予測できない冬}}と{{多様性}}）。"],
        ["選ぶ", "both travelers and stay-at-homes … {{more likely to have some survivors}}。"],
      ]),
    ],
  ),
  reading(
    2,
    "snow-signs",
    "農作業の目じるしと気候の変化を論じた文章",
    "Reading the Mountain",
    `In many farming villages in the north, the right day to plant was not found on a calendar. It was read from the landscape. In one valley, farmers waited until the melting snow on a nearby mountain formed a shape that looked like a running horse; in another, they sowed their beans when a certain tree came into flower. To an outsider, such customs may look like superstition. In fact, they were often remarkably precise. The melting of snow on a mountain slope and the flowering of a tree both respond to the warmth that builds up through the spring, and so they [ A ] the condition of the soil in the fields below far more accurately than a fixed date could.

These signs worked because the relationship between them and the fields remained stable over long periods. The snow on the mountain and the soil in the valley were warmed by the same spring, at roughly the same pace, year after year. {{(1) It was this stability, rather than any special power in the signs themselves, that allowed knowledge gathered by one generation to serve the next.}}

A changing climate threatens precisely this stability. Warming does not affect every part of a landscape in the same way. Snow high on a mountain may melt at a different rate from snow lower down, and some trees respond more strongly than others to warm spells in late winter. In several northern valleys, older farmers report that the old signs have begun to "lie." The horse appears on the mountain, but a late frost still damages the young plants; or the tree flowers early, long before the fields are warm enough. [ B ], a sign that once linked two events reliably may now point the farmer in the wrong direction.

It might seem that the answer is simply to replace the old signs with modern instruments. Many farmers now use soil thermometers and weather forecasts, and these tools are certainly useful. Yet some researchers argue that the traditional signs should not be thrown away too quickly. They contain records of how the landscape behaved over centuries, records that may help scientists understand what is changing and how fast. A village that remembers when the horse appeared on the mountain in its grandparents' time holds, in effect, a long series of observations that no instrument was present to make.

Some communities have begun to combine the two kinds of knowledge. Farmers continue to note when the old signs appear, but they also record the temperature of the soil and the dates of frosts, and they share these notes with researchers. In this way, a custom that might have disappeared as useless is being given a new purpose: not to tell farmers when to plant, but to help everyone see how the north is changing.`,
    [
      C("blank-a", 2, U.vocab, "空所［ A ］に入る最も適切な語を選べ。", ["reflected", "ignored", "prevented", "replaced"], [
        "正解。雪どけも開花も春の暖かさに応じるので、畑の土の状態を正確に「反映していた」。",
        "「無視していた」では、正確だったという直前の文と食いちがう。",
        "「妨げていた」では意味が通らない。",
        "「取って代わった」では、土の状態そのものを置きかえることになり意味が通らない。",
      ], "「より正確に」に合う動詞", [
        ["前後の関係", "{{both respond to the warmth}} … and so they ( ) the condition of the soil {{far more accurately}}。"],
        ["選ぶ", "土の状態を正確に{{映し出す}} reflected。"],
      ], K),
      C("blank-b", 2, U.setsuzoku, "空所［ B ］に入る最も適切なものを選べ。", ["As a result", "Nevertheless", "By contrast", "For instance"], [
        "正解。しるしと畑の状態がずれてきた結果、しるしが農家を誤った方へ導くことがある。",
        "前後は逆接の関係ではない。",
        "前後は対比ではなく、原因と結果。",
        "後ろは前の例ではなく、前から導かれる結論。",
      ], "原因 → 結果のつなぎ", [
        ["前後の関係", "前：しるしが{{lie}}（ずれる）具体例。後：しるしが{{wrong direction}}へ導く。"],
        ["選ぶ", "結果を導く {{As a result}}。"],
      ], K),
      C("lie", 2, U.vocab, "第3段落の the old signs have begun to \"lie\" とはどういうことか。最も適切なものを選べ。", [
        "The signs no longer show reliably when the fields are ready for planting.",
        "The older farmers have started to tell false stories about the signs.",
        "The signs have stopped appearing on the mountain altogether.",
        "The signs are now ignored by every farmer in the valley.",
      ], [
        "正解。直後の例：馬の形が出ても遅霜がある、木が早く咲いても畑はまだ冷たい。",
        "うそをつくのは農家ではなく、しるしのたとえ。",
        "The horse appears on the mountain とあり、しるしは今も現れる。",
        "最終段落で、農家は今もしるしを記録している。",
      ], "引用符つきの lie は比喩", [
        ["例で確かめる", "The horse appears …, {{but a late frost still damages the young plants}}。"],
        ["意味", "しるしと畑の状態の{{結びつきがくずれた}}ということ。"],
      ], K),
      WY("tr1", 1, 3, U.tokushu, "ある世代が集めた知識が次の世代の役に立つことを可能にしたのは、しるしそのものに何か特別な力があったからではなく、この安定性だったのである。", [
        ["It was … that ～ を強調構文として「～したのは…だった」と訳す", 4, ["のは"]],
        ["rather than any special power in the signs themselves を訳す", 4, ["特別な力", "ではなく"]],
        ["allowed knowledge gathered by one generation to serve the next を訳す", 4, ["世代", "役に立"]],
      ], "It was A, rather than B, that ～", [
        ["強調構文", "{{It was this stability, rather than …, that}} allowed …：強調されるのは this stability。"],
        ["語法", "allow A {{to do}}：Aが〜するのを可能にする。the next ＝ the next generation。"],
      ]),
      WS("records", 3, "第4段落で、伝統的なしるしをすぐに捨てるべきではないと一部の研究者が主張する理由を説明せよ。", 80,
        "しるしには何世紀にもわたる土地のふるまいの記録が含まれ、計器のなかった時代の長い観察として、何がどれほど速く変わっているかを科学者が理解する助けになるから。", [
          ["何世紀もの土地のふるまいの記録である", 4, ["何世紀", "記録"]],
          ["計器のない時代の観察である", 4, ["計器"]],
          ["何がどれだけ速く変わるかの理解に役立つ", 4, ["変わ", "速"]],
        ], "They contain records … の文が理由の核", [
          ["根拠", "They contain {{records of how the landscape behaved over centuries}} … understand {{what is changing and how fast}}。"],
          ["補う", "{{observations that no instrument was present to make}}：計器では得られない観察。"],
        ]),
      C("match", 2, U.chobun, "本文の内容と一致するものを選べ。", [
        "The flowering of a tree and the melting of snow both respond to the warmth that builds up in spring.",
        "The author thinks that the traditional signs were nothing but superstition.",
        "Warming affects every part of a landscape in the same way.",
        "Farmers who note the old signs have stopped using soil thermometers.",
      ], [
        "正解。第1段落 both respond to the warmth that builds up through the spring に一致。",
        "第1段落：よそ者には迷信に見えても、実際は驚くほど正確だった。",
        "第3段落 Warming does not affect every part of a landscape in the same way と逆。",
        "最終段落：しるしに加えて土の温度も記録している。",
      ], "may look like と In fact の対比に注意", [
        ["根拠", "第1段落：{{both respond to the warmth}} that builds up through the spring。"],
        ["誤りの確認", "{{In fact, they were often remarkably precise}}（第1段落）・{{does not}}（第3段落）。"],
      ]),
      C("summary", 3, U.chobun, "次は本文の要約である。空所に入る最も適切なものを選べ。\nTraditional signs in the landscape once told northern farmers when to plant, but as the climate changes, they have become less reliable. Even so, (　　　).", [
        "records of these signs can help people understand how the north is changing",
        "farmers should trust them more than modern instruments",
        "they will become accurate again once the warming stops",
        "researchers have proved that they were never useful",
      ], [
        "正解。第4・最終段落：しるしの記録は変化を理解する新しい役目を与えられている。",
        "本文は二つの知識を組み合わせることをすすめている。",
        "温暖化が止まれば元にもどる、という記述はない。",
        "第1段落：実際には驚くほど正確だった。",
      ], "Even so の後は第4・5段落の内容", [
        ["要約の流れ", "前半：第1〜3段落。後半：しるしの{{new purpose}}（最終段落）。"],
        ["選ぶ", "{{to help everyone see how the north is changing}} を言いかえた選択肢。"],
      ]),
    ],
  ),
];

// =====================================================================
// 第3問　和文英訳（日本文の下線部を英語に）
//   どの節も ア（難2）・イ（難3）・ウ（難3）から2つ
// =====================================================================

const TR_LEAD = "次の文章の下線部を英訳せよ。";

function wsec(tag: number, id: string, unit: string, title: string, lead: string, material: { lang: "ja" | "en"; title?: string; body: string }, questions: QuestionB[], pick?: number): ExamPoolSection {
  return {
    unit,
    tag: `hokudai-eigo:${tag}`,
    section: {
      id: `hokudai-en-${id}`,
      title,
      lead,
      style: "writing",
      examOnly: true,
      material: [{ kind: "passage", ...material }],
      ...(pick ? { pick } : {}),
      questions,
    },
  };
}

const trRubric = (frame: string[], usage: string[], ja: string[]): Rb => [
  ["文の骨組み（主語・動詞・構文）が日本文の意味を正しく表している", 6, frame],
  ["語句・語法が適切で、日本語の細かな意味（" + ja.join("・") + "）を落としていない", 5, usage],
  ["時制・冠詞・数・つづりの誤りがない", 4, []],
];
const TR = (id: string, d: 2 | 3, mark: string, model: string, also: string[], rb: Rb, point: string, st: St[]): QuestionB => {
  const q = W(id, d, U.wabun, `下線部${mark}を英訳せよ。`, model, rb, point, st, undefined, 540);
  if (q.answer.kind === "written") q.answer.alsoModels = also;
  return q;
};

const P3: ExamPoolSection[] = [
  wsec(3, "tr-walk", U.wabun, "随筆の和文英訳（歩きながら考える）", TR_LEAD, {
    lang: "ja",
    body: `{{ア　目的もなく歩いていると、机に向かっているときには思いつかなかった考えが浮かぶことがある。}}{{イ　歩く速さは、まわりの景色を眺めながら考えごとをするのにちょうどよいのかもしれない。}}{{ウ　忙しい毎日だからこそ、何もしない時間を意識してつくることが大切だと私は思う。}}`,
  }, [
    TR("a", 2, "ア", "When I walk without any particular purpose, ideas that never occurred to me at my desk sometimes come to mind.", ["Sometimes, while walking with no special aim, I come up with ideas that I could not think of while sitting at my desk."], trRubric(["When I walk", "come to mind", "sometimes"], ["without any particular purpose", "occurred to me"], ["目的もなく", "思いつかなかった", "ことがある"]), "「考えが浮かぶ」＝ come to mind", [
      ["主語", "「考えが浮かぶ」は {{ideas come to mind}} か、人を主語に {{I come up with ideas}}。"],
      ["修飾", "「机に向かっているときには思いつかなかった」＝ {{that never occurred to me at my desk}}。"],
    ]),
    TR("i", 3, "イ", "Perhaps walking speed is just right for thinking while looking at the scenery around us.", ["The pace at which we walk may be exactly suited to thinking things over as we look at our surroundings."], trRubric(["Perhaps", "is just right for"], ["walking speed", "while looking at"], ["ちょうどよい", "眺めながら", "かもしれない"]), "「〜にちょうどよい」＝ just right for -ing", [
      ["構文", "「〜するのにちょうどよい」＝ {{be just right for -ing}} / {{be well suited to -ing}}。"],
      ["付帯", "「眺めながら」＝ {{while looking at}} / {{as we look at}}。"],
    ]),
    TR("u", 3, "ウ", "It is precisely because our days are so busy that I think it is important to make time to do nothing on purpose.", ["I believe that, especially when we are busy every day, we should deliberately set aside time for doing nothing."], trRubric(["It is … because … that", "it is important to"], ["make time", "on purpose"], ["だからこそ", "意識して", "何もしない時間"]), "「〜だからこそ」＝ It is because … that", [
      ["こそ", "{{It is precisely because S V that S V}} の強調構文。"],
      ["意識して", "{{on purpose}} / {{deliberately}}。「時間をつくる」＝ make time / set aside time。"],
    ]),
  ], 2),
  wsec(3, "tr-grandmother", U.wabun, "随筆の和文英訳（祖母の昔話）", TR_LEAD, {
    lang: "ja",
    body: `{{ア　子どものころ、私は祖母が昔の暮らしについて話してくれるのを聞くのが好きだった。}}{{イ　当時は気づかなかったが、その話には教科書には載っていない歴史が含まれていたのだ。}}{{ウ　身近な人の記憶は、書き残しておかなければ、いつのまにか失われてしまうものである。}}`,
  }, [
    TR("a", 2, "ア", "When I was a child, I loved listening to my grandmother talk about how people used to live.", ["As a child, I enjoyed hearing my grandmother tell me about life in the old days."], trRubric(["When I was a child", "loved listening to"], ["listen to A talk", "used to live"], ["子どものころ", "昔の暮らし", "好きだった"]), "「AがVするのを聞く」＝ listen to A do", [
      ["知覚動詞", "{{listen to my grandmother talk}}（原形）。hear A tell me … でもよい。"],
      ["昔の暮らし", "{{how people used to live}} / {{life in the old days}}。"],
    ]),
    TR("i", 3, "イ", "I did not realize it at the time, but her stories contained history that cannot be found in textbooks.", ["Although I was not aware of it then, those stories included a kind of history that is not written in any textbook."], trRubric(["did not realize it at the time", "but"], ["contained", "cannot be found in textbooks"], ["当時は", "載っていない", "含まれていた"]), "「教科書に載っていない」＝ not found in textbooks", [
      ["時制", "気づかなかったのは過去なので {{did not realize}}。「当時は」＝ {{at the time}} / then。"],
      ["載っていない", "{{that cannot be found in textbooks}} / {{that is not written in any textbook}}。"],
    ]),
    TR("u", 3, "ウ", "Unless we write them down, the memories of the people close to us will be lost before we know it.", ["If we do not record them in writing, the memories of those around us tend to disappear without our noticing."], trRubric(["Unless we write them down", "will be lost"], ["people close to us", "before we know it"], ["身近な人", "いつのまにか", "ものである"]), "「いつのまにか」＝ before we know it", [
      ["条件", "「〜しなければ」＝ {{Unless S V}} / If S do not V。代名詞 them で memories を受ける。"],
      ["いつのまにか", "{{before we know it}} / {{without our noticing}}。一般論の「ものだ」は tend to でも表せる。"],
    ]),
  ], 2),
  wsec(3, "tr-question", U.wabun, "論説文の和文英訳（授業で質問する）", TR_LEAD, {
    lang: "ja",
    body: `{{ア　授業中にわからないことがあっても、質問するのをためらう学生は多い。}}{{イ　自分だけが理解できていないのではないかと心配になるからだろう。}}{{ウ　しかし実際には、一人が手を挙げることで、ほかの多くの学生も助かることが少なくない。}}`,
  }, [
    TR("a", 2, "ア", "Many students hesitate to ask questions even when there is something they do not understand in class.", ["There are many students who are reluctant to ask a question, even if they cannot follow something in a lesson."], trRubric(["Many students hesitate to", "even when"], ["ask questions", "something they do not understand"], ["ためらう", "わからないこと", "あっても"]), "「〜するのをためらう」＝ hesitate to do", [
      ["主語", "「〜する学生は多い」＝ {{Many students …}} / {{There are many students who …}}。"],
      ["譲歩", "「〜があっても」＝ {{even when}} / even if there is something they do not understand。"],
    ]),
    TR("i", 3, "イ", "This is probably because they worry that they may be the only one who does not understand.", ["Perhaps it is because they are afraid that they alone have failed to understand."], trRubric(["This is probably because", "worry that"], ["the only one who", "may be"], ["自分だけ", "のではないか", "からだろう"]), "「自分だけが〜」＝ the only one who", [
      ["構文", "「〜からだろう」＝ {{This is probably because S V}}。"],
      ["だけ", "「自分だけが理解できない」＝ {{they may be the only one who does not understand}}。"],
    ]),
    TR("u", 3, "ウ", "In reality, however, when one student raises a hand, many others are often helped as well.", ["But in fact, a single student raising a hand often benefits many other students, too."], trRubric(["In reality, however", "are often helped"], ["raises a hand", "many others"], ["実際には", "少なくない", "ほかの多くの学生も"]), "「〜ことが少なくない」＝ often", [
      ["少なくない", "「〜することが少なくない」は {{often}} で表すのが自然。"],
      ["主語の工夫", "{{a single student raising a hand}} を主語に benefits many others とまとめてもよい。"],
    ]),
  ], 2),
];

// =====================================================================
// 第4問　自由英作文（意見を述べる・80〜100語）
// =====================================================================

const ES_LEAD = "次の問いについて、あなたの考えを英語で述べよ。";
const esRubric = (content: string[], logic: string[]): Rb => [
  ["問いに正面から答え、立場がはっきりしている", 10, content],
  ["理由・具体例が主張と論理的につながっている", 8, logic],
  ["文法・語法・つづりの誤りが少ない", 7, []],
  ["語数の条件を守り、自然な英語になっている", 5, []],
];
const ESQ = (id: string, prompt: string, model: string, rb: Rb, point: string, st: St[]): QuestionB =>
  W(id, 3, U.jiyu, prompt, model, rb, point, st, { min: 80, max: 100, unit: "語" }, 1500);
const ES_PROMPT = "上の問いについて、理由を含めて、あなたの考えを80〜100語の英語で書け。";

const P4: ExamPoolSection[] = [
  wsec(4, "es-hometown", U.jiyu, "自由英作文（地元に残るか都市へ出るか）", ES_LEAD, {
    lang: "en",
    body: "Some young people choose to stay in the town where they grew up, while others move to a big city. Which do you think is better for a young person, and why?",
  }, [
    ESQ("q", ES_PROMPT,
      `I think it is better for young people to spend at least a few years in a big city. First, a large city offers a wider range of universities and jobs, so young people can find work that really matches their interests. Second, living among people from many different backgrounds teaches us to see our own hometown from a new angle. Some of my older friends who moved to Tokyo have come back with ideas for improving our town. Leaving home, therefore, does not mean abandoning it; it can be a way of helping it later.`,
      esRubric(["better", "big city", "hometown"], ["First", "Second", "therefore"]), "立場を一文目で示し、理由を二つ", [
        ["構成", "① 立場 ② {{First}} ③ {{Second}}（具体例つき）④ まとめ。"],
        ["深める", "反対の立場（地元に残る）にも一言ふれると、まとめが説得力をもつ。"],
      ]),
  ]),
  wsec(4, "es-digital", U.jiyu, "自由英作文（紙の教科書とデジタル教科書）", ES_LEAD, {
    lang: "en",
    body: "Some schools are replacing paper textbooks with digital ones. Do you think this is a good idea? Explain your opinion.",
  }, [
    ESQ("q", ES_PROMPT,
      `I do not think schools should replace paper textbooks completely. It is true that digital textbooks are light and can include videos and sound, which make some subjects easier to understand. However, when I study with a paper book, I can write notes in the margins and see at a glance where an important point is on the page. This helps me remember what I have learned. In addition, reading on a screen for many hours can make our eyes tired. For these reasons, I believe schools should use both kinds of textbooks.`,
      esRubric(["paper textbooks", "digital"], ["It is true that", "However", "In addition"]), "譲歩（It is true that）→反論の型", [
        ["譲歩", "{{It is true that}} デジタルの利点を認め、{{However}} で自分の主張へ。"],
        ["理由", "理由は二つ（{{書きこみと記憶}}・{{目の疲れ}}）。それぞれ一文以上で具体化する。"],
      ]),
  ]),
  wsec(4, "es-volunteer", U.jiyu, "自由英作文（大学生のボランティア義務化）", ES_LEAD, {
    lang: "en",
    body: "Some people say that all university students should be required to do volunteer work in their local community. Do you agree or disagree?",
  }, [
    ESQ("q", ES_PROMPT,
      `I disagree with the idea of making volunteer work a requirement for all university students. Volunteer work is valuable precisely because people choose to do it. If students are forced to take part, many of them may simply count the hours instead of caring about the people they are helping. Moreover, some students already have little free time because they work part-time to pay for their studies. Instead of making it compulsory, universities should offer more information about local volunteer activities so that students who are interested can join easily.`,
      esRubric(["disagree", "volunteer", "required"], ["because", "Moreover", "Instead of"]), "反対なら代わりの案まで書く", [
        ["主張", "一文目で {{I disagree with …}} と立場を示す。"],
        ["しめくくり", "{{Instead of making it compulsory}}, … と代案を出すと、ただの反対で終わらない。"],
      ]),
  ]),
  wsec(4, "es-visitor", U.jiyu, "自由英作文（海外からの訪問者にすすめる季節）", ES_LEAD, {
    lang: "en",
    body: "A friend from abroad wants to visit the region where you live. Which season would you recommend for the visit, and why?",
  }, [
    ESQ("q", ES_PROMPT,
      `I would recommend that my friend visit my region in winter. Many people think winter is too cold for sightseeing, but it is the season when my town looks most beautiful. The fields and mountains are covered with snow, and in February there is a festival with large snow sculptures made by local people. My friend could also try winter sports such as skiing, which may be difficult to enjoy in his own country. Finally, hot local dishes taste especially good after a day in the snow, so winter is the best time to come.`,
      esRubric(["recommend", "winter", "season"], ["but", "also", "Finally"]), "季節を一つにしぼり、理由を具体的に", [
        ["構成", "① {{I would recommend that my friend visit}}（原形）② 景色 ③ 体験 ④ 食べ物。"],
        ["具体性", "行事・食べ物など{{その地域ならでは}}の例を入れると説得力が出る。"],
      ]),
  ]),
];

// =====================================================================

export const U_HOKUDAI_EIGO: UnivExam = {
  key: "hokudai-eigo",
  univ: "北海道大学",
  kamoku: "英語",
  tier: "国公立",
  order: 117,
  basis: "前期日程の共通問題（文系学部・英語150点）の傾向を参考",
  format: "大問4題・90分・150点。長文2題（和訳・内容説明・空所補充・要約）に、和文英訳と80〜100語の自由英作文。",
  minutes: 90,
  groups: ["語彙", "文法", "技能"],
  sections: [
    { title: "第1問　長文読解（論説：和訳と内容説明）", lead: READ_LEAD, count: [5, 5], mix: [0, 0.4, 0.6], points: 45, prefer: "material", poolTag: "hokudai-eigo:1" },
    { title: "第2問　長文読解（空所補充・内容一致・要約）", lead: READ_LEAD, count: [5, 5], mix: [0, 0.4, 0.6], points: 45, prefer: "material", poolTag: "hokudai-eigo:2" },
    { title: "第3問　和文英訳", lead: TR_LEAD, count: [2, 2], mix: [0, 0.4, 0.6], points: 30, prefer: "material", poolTag: "hokudai-eigo:3" },
    { title: "第4問　自由英作文（80〜100語）", lead: ES_LEAD, count: [1, 1], mix: [0, 0.4, 0.6], points: 30, prefer: "material", poolTag: "hokudai-eigo:4" },
  ],
  pool: [...P1, ...P2, ...P3, ...P4],
};
