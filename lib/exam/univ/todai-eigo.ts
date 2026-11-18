import type { UnivExam } from "./types";
import type { ExamPoolSection } from "../pool/types";
import type { Material, Question, QuestionB, QuestionC, Skill, SolutionStep } from "@/lib/moshi/types";

// 東京大学型 英語（国公立・2次試験）。文科・理科共通の問題の傾向を参考にした形式（英文・放送文・設問はすべて書き下ろし）。
//   120分・120点・大問5題（実際は小問(A)(B)(C)に分かれるので、ここでは (A)(B) を別の大問として9つに分けた（リスニングは講義と会話の2つ）。配点は大学非公表のため予備校の推定に寄せた目安）。
//   1(A) 英文の要約（日本語70〜80字）／1(B) 文・語句の補充と並べかえ／2(A) 自由英作文（60〜80語）／2(B) 和文英訳／
//   3 リスニング（(A) 講義・(B) インタビュー・会話・討論。放送は2回まで。実際の3パートより1つ少ない）／4(A) 誤り指摘（下線部5か所から1つ）／4(B) 下線部和訳／5 物語・エッセイの長文読解。
//   人名・町・団体・研究者はすべて架空。実在の人物の発言は使っていない。
// 参考:
//   https://study-search.jp/columns/366 （東大英語の大問構成・時間配分・リスニングの比重）
//   https://www.haradaeigo.com/?p=15715 （東大英語の各大問の形式・語数）
//   https://resemom.jp/article/2026/03/19/85530.html （2026年度 東大英語の出題傾向の分析）

const U = {
  chobun: "h-eng-skill-chobun",
  wabun: "h-eng-skill-wabun",
  jiyu: "h-eng-skill-jiyu",
  listen: "h-eng-skill-listening",
  vocab: "h-eng-vocab-2000",
  jukugo: "h-eng-vocab-jukugo",
  setsuzoku: "h-eng-gram-setsuzokushi",
  futeishi: "h-eng-gram-futeishi",
  domeishi: "h-eng-gram-domeishi",
  bunshi: "h-eng-gram-bunshi",
  jisei: "h-eng-gram-jisei",
  kanryo: "h-eng-gram-kanryo",
  kateiho: "h-eng-gram-kateiho",
  meishi: "h-eng-gram-meishi",
  daimeishi: "h-eng-gram-daimeishi",
  keiyoshi: "h-eng-gram-keiyoshi",
  zenchishi: "h-eng-gram-zenchishi",
  kandai: "h-eng-gram-kandai",
  judo: "h-eng-gram-judo",
  bunkei: "h-eng-gram-bunkei",
  tokushu: "h-eng-gram-tokushu",
} as const;

type St = [string, string];
const steps = (s: St[]): SolutionStep[] => s.map(([title, body]) => ({ title, body }));
const K: Skill = "知識・技能";
const S: Skill = "思考・判断・表現";
const tagOf = (n: number) => `todai-eigo:${n}`;

/** 選択 */
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
  return { id, type: "B", difficulty, points: 3, seconds: 60 + 30 * difficulty, skill, unit, prompt, answer: { kind: "choice", options, correct, why }, point, steps: steps(st) };
}

/** 並べかえ */
function O(id: string, difficulty: 1 | 2 | 3, unit: string, prompt: string, tokens: string[], point: string, st: St[]): QuestionB {
  return { id, type: "B", difficulty, points: 3, seconds: 120, skill: K, unit, prompt, answer: { kind: "order", tokens }, point, steps: steps(st) };
}

type Rub = [string, number, string[]][];
const written = (limit: { min?: number; max?: number; unit: "語" | "字" } | undefined, model: string, rubric: Rub, also?: string[]) => ({
  kind: "written" as const,
  ...(limit ? { limit } : {}),
  model,
  rubric: rubric.map(([label, points, keywords]) => ({ label, points, keywords })),
  ...(also ? { alsoModels: also } : {}),
});
const sum = (r: Rub) => r.reduce((s, x) => s + x[1], 0);

/** 記述 (B: pick の節で使う。和訳・英訳の下線部) */
function WB(id: string, difficulty: 1 | 2 | 3, unit: string, prompt: string, model: string, rubric: Rub, point: string, st: St[], seconds: number, also?: string[]): QuestionB {
  return { id, type: "B", difficulty, points: sum(rubric), seconds, skill: S, unit, prompt, answer: written(undefined, model, rubric, also), point, steps: steps(st) };
}

/** 記述 (C: 要約・英作文の節に1問だけ置く) */
function WC(
  id: string,
  difficulty: 1 | 2 | 3,
  unit: string,
  prompt: string,
  limit: { min?: number; max?: number; unit: "語" | "字" },
  model: string,
  rubric: Rub,
  point: string,
  st: St[],
  seconds: number,
  also?: string[],
): QuestionC {
  return { id, type: "C", difficulty, points: sum(rubric), seconds, skill: S, unit, prompt, answer: written(limit, model, rubric, also), point, steps: steps(st) };
}

function sec(
  tag: number,
  id: string,
  unit: string,
  title: string,
  lead: string,
  material: Material[],
  questions: Question[],
  style: "reading" | "writing" | "mix",
  pick?: number,
): ExamPoolSection {
  return {
    unit,
    tag: tagOf(tag),
    section: { id: `todai-en-${id}`, title, lead, style, examOnly: true, material, ...(pick !== undefined ? { pick } : {}), questions },
  };
}
const en = (title: string, body: string): Material => ({ kind: "passage", lang: "en", title, body });
const ja = (body: string): Material => ({ kind: "passage", lang: "ja", body });

// =====================================================================
// 第1問(A)　英文の要約（日本語70〜80字）
// =====================================================================

const SUM_LEAD = "次の英文の要旨を、70〜80字の日本語にまとめよ。句読点も字数に含める。";
const SUM_PROMPT = "上の英文の要旨を、70〜80字の日本語にまとめよ。";
const SUM_LIMIT = { min: 70, max: 80, unit: "字" as const };

const P1: ExamPoolSection[] = [
  sec(1, "sum-boredom", U.chobun, "要約（退屈という感情の役割）", SUM_LEAD, [
    en("The Uses of Boredom", `Most of us treat boredom as a small problem to be solved as quickly as possible. A few seconds of waiting at a bus stop or in a queue is enough to make us reach for our phones, and the device is always ready to offer something: a message, a video, a headline. In this sense, boredom has become one of the easiest feelings in modern life to escape. But it may also be one of the most useful feelings to keep.

Psychologists who study boredom often describe it not as an absence of feeling but as a signal. Like hunger, which tells us that the body needs food, boredom tells us that what we are doing no longer satisfies us and that something should change. A bored child left alone on a rainy afternoon may begin by complaining, but often ends up inventing a game, building something out of cardboard, or drawing a map of an imaginary country. The discomfort pushes the mind to look for its own way out.

When we remove that discomfort instantly, we also remove the push. Filling every empty moment with ready-made entertainment means that the mind rarely has to wander, and a wandering mind is where many plans, memories and new connections between ideas are formed. The problem, then, is not that phones are entertaining, but that they are entertaining at exactly the moments when we might otherwise have begun to think. Learning to tolerate a little boredom may be less a matter of self-control than of giving our own imagination a chance to work.`),
  ], [
    WC("summary", 3, U.chobun, SUM_PROMPT, SUM_LIMIT,
      "退屈は今していることを変えよという合図であり、その不快さが自ら考え工夫する力を引き出すが、空いた時間をすぐ娯楽で埋めると、発想が生まれる機会が失われる。",
      [
        ["退屈は「変化を求める合図」だとまとめている", 3, ["合図", "変える"]],
        ["退屈の不快さが自分で考え工夫する力を引き出す", 3, ["不快", "工夫", "考え"]],
        ["すぐ娯楽で埋めると、思考・想像の機会が失われる", 3, ["娯楽", "埋める", "機会"]],
        ["70〜80字の自然な日本語で、例（子ども・雨の日）を入れていない", 1, []],
      ],
      "具体例を捨て、主張と理由の筋だけを残す",
      [
        ["主張", "第1段落の最後：退屈は{{逃げやすいが、とっておくべき役に立つ感情}}。"],
        ["理由", "第2段落：退屈は{{変化を求める合図}}で、不快さが心に出口を探させる。子どもの例は{{要約に入れない}}。"],
        ["結論", "第3段落：不快さをすぐ消すと{{考え始める機会}}も消える。字数は句読点を含めて70〜80字。"],
      ], 900),
  ], "writing"),
  sec(1, "sum-navigation", U.chobun, "要約（道案内アプリと場所の記憶）", SUM_LEAD, [
    en("Knowing a Place", `For most of history, finding your way through an unfamiliar city meant paying attention. Travelers studied maps before setting out, noticed churches, rivers and unusual buildings, and gradually built up a picture of how one street connected to another. Today, a voice from a phone tells us when to turn left and when to turn right, and we can reach almost any address without forming any picture of the city at all.

This convenience has obvious benefits. Fewer people get lost, deliveries arrive faster, and drivers no longer need to unfold a paper map at a red light. Yet studies of how people remember routes suggest that there is a cost. When people follow step-by-step instructions, they tend to remember far less about the places they pass through than those who plan their own route. They arrive, but they could not easily find their way back without help, and they would struggle to draw even a rough sketch of the area.

The loss is not only practical. Knowing a place well is part of feeling at home in it. A neighborhood that we have explored on our own, with its shortcuts, wrong turns and favorite corners, becomes connected to our memories in a way that a series of instructions never can. None of this means that we should throw away our navigation apps. But it may be worth switching them off from time to time, especially in the places where we live, so that the city becomes something we know rather than something we merely pass through.`),
  ], [
    WC("summary", 3, U.chobun, SUM_PROMPT, SUM_LIMIT,
      "道案内に従うだけの移動は便利だが、通った場所の記憶や土地への愛着が育ちにくくなるので、住んでいる場所ではときに案内を切り、自分で道を探すことが望ましい。",
      [
        ["道案内は便利だという譲歩を入れている", 2, ["便利"]],
        ["案内に従うと場所の記憶が残りにくい", 3, ["記憶", "残りにくい", "育ちにくい"]],
        ["土地への愛着（なじみ・わが家の感覚）も育たない", 2, ["愛着", "なじみ"]],
        ["ときに案内を切り自分で道を探す、という提案", 2, ["切る", "自分で"]],
        ["70〜80字の自然な日本語", 1, []],
      ],
      "譲歩→問題点→提案の三段で組む",
      [
        ["譲歩", "第2段落前半：{{便利さ}}（迷わない・配達が速い）は認めている。"],
        ["問題点", "Yet 以下：{{通った場所を覚えていない}}。第3段落：場所に{{なじむ感覚}}も失う。"],
        ["提案", "最後の文：アプリを捨てるのではなく、{{ときどき切る}}。"],
      ], 900),
  ], "writing"),
  sec(1, "sum-repair", U.chobun, "要約（物を修理することの意味）", SUM_LEAD, [
    en("Why Fix Things?", `In many homes, a broken toaster or a cracked phone screen leads to the same decision: throw it away and buy a new one. Often this is the sensible choice in purely financial terms. Replacement parts can be hard to find, repair shops have become rare, and a new product may cost little more than having the old one fixed. Many manufacturers design goods that are difficult to open, with parts glued together rather than held by screws.

Yet a growing number of people are questioning this habit. In community "repair cafés," volunteers with practical skills meet regularly to help their neighbors fix lamps, bicycles, clothes and small machines. Those who bring their broken objects are encouraged not simply to hand them over but to watch and take part. Many of them say that the most valuable thing they take home is not the repaired object but a new understanding of how it works.

That understanding matters. When we know how a thing is made, we tend to take better care of it, and we begin to notice which products are built to last and which are not. Repair also reduces the amount of waste that ends up in landfills and the energy needed to manufacture replacements. Seen this way, fixing an old kettle is not merely a way of saving money. It is a small act that changes our relationship with the things we own, turning us from mere consumers into people who understand, maintain and value the objects around us.`),
  ], [
    WC("summary", 3, U.chobun, SUM_PROMPT, SUM_LIMIT,
      "壊れた物は買い替えるほうが経済的とされがちだが、修理は物のしくみへの理解を深めて物を大切にする姿勢を育て、廃棄物も減らし、人と物との関係を変える行為である。",
      [
        ["買い替えが経済的に合理的とされる現状（譲歩）", 2, ["買い替え", "経済的"]],
        ["修理で物のしくみの理解が深まる", 3, ["しくみ", "理解"]],
        ["物を大切にする・長持ちする物を見分けるようになる", 2, ["大切", "長持ち"]],
        ["廃棄物を減らし、物との関係を変える", 2, ["廃棄", "関係"]],
        ["70〜80字の自然な日本語", 1, []],
      ],
      "「お金の節約にとどまらない」が筆者の主張",
      [
        ["譲歩", "第1段落：買い替えは{{お金の面では合理的}}。"],
        ["中心", "第2・3段落：修理で得る一番のものは{{しくみの理解}}。理解すると{{物を大切にする}}。"],
        ["結論", "最後：修理は節約ではなく{{物との関係を変える}}行為。修理カフェの例は入れない。"],
      ], 900),
  ], "writing"),
  sec(1, "sum-stories", U.chobun, "要約（物語と統計）", SUM_LEAD, [
    en("One Face and a Million Numbers", `Charities have long known that a photograph of one hungry child raises more money than a report showing that millions of children are hungry. This may seem strange. If we care about suffering, surely more suffering should move us more. But human attention does not work like a calculator. A single person with a name and a face allows us to imagine their situation, while large numbers remain abstract, and abstract things rarely stir strong emotions.

This tendency is not simply a weakness. Our ability to feel for an individual is what makes friendship, care and cooperation possible, and stories are one of the oldest ways in which people have passed on knowledge. The difficulty arises when decisions that affect many people are guided by whichever story happens to be most vivid. A single dramatic accident can lead to expensive new rules, while a quieter problem that harms thousands every year receives little attention because it produces no memorable images.

The answer is not to stop telling stories, but to use them more carefully. A good journalist or teacher can begin with one person's experience and then show how it fits into a larger pattern revealed by the numbers. In that way, the story gives the statistics meaning, and the statistics keep the story honest. Learning to move between the two may be one of the most important skills for citizens who must make judgments about a complex world.`),
  ], [
    WC("summary", 3, U.chobun, SUM_PROMPT, SUM_LIMIT,
      "人は大きな数字より一人の具体的な話に心を動かされ、それは大切な性質でもあるが判断をゆがめうるので、物語と統計を組み合わせ、互いに補わせることが必要だ。",
      [
        ["人は数字より個人の話に心を動かされる", 3, ["数字", "一人", "心を動かされ"]],
        ["その性質自体は悪いものではない（共感・協力のもと）", 2, ["大切", "悪くない"]],
        ["多くの人に関わる判断をゆがめうる", 2, ["判断", "ゆがめ"]],
        ["物語と統計を組み合わせる、という結論", 2, ["組み合わせ", "補"]],
        ["70〜80字の自然な日本語", 1, []],
      ],
      "「物語をやめる」ではなく「統計と組み合わせる」",
      [
        ["現象", "第1段落：一人の写真は{{大きな数字より}}人を動かす。"],
        ["評価", "第2段落：それは{{弱さだけではない}}が、多くの人に関わる{{判断をゆがめる}}ことがある。"],
        ["結論", "第3段落：物語が統計に{{意味}}を与え、統計が物語を{{正直に保つ}}。"],
      ], 900),
  ], "writing"),
];

// =====================================================================
// 第1問(B)　文・語句の補充と並べかえ
// =====================================================================

const GAP_LEAD = "次の英文を読み、空所［ア］〜［エ］・［X］に入るもの、［並べかえ］の語の順序、内容について問いに答えよ。";
const gapP = (k: string) => `空所［${k}］に入る最も適切な文を選べ。`;
const ORDER_P = "［並べかえ］の語を、意味が通るように正しく並べかえよ。";

const P2: ExamPoolSection[] = [
  sec(2, "gap-birdsong", U.chobun, "文の補充（都市の鳥のさえずり）", GAP_LEAD, [
    en("Singing over the Traffic", `Anyone who has walked through a city park at dawn knows that urban areas are far from silent places for wildlife. Many species of birds have made their homes among buildings and busy roads. For these birds, however, city life presents a problem that their relatives in the forest rarely face: noise. Birdsong is not decoration. It is how many birds defend their territory and attract partners, and a song that cannot be heard is a song that does not work.

［ア］ In several species, researchers have found that individuals living near busy roads sing at a higher pitch than those living in quieter places. Traffic noise is concentrated at low frequencies, so a higher song is less likely to be drowned out. Some birds also sing more loudly, or shift their singing to times of day when the roads are less crowded. ［イ］

These adjustments raise an interesting question. Are city birds learning to sing differently, or are they changing genetically over many generations? For songbirds, which learn their songs partly by listening to adults, the answer may be both. A young bird growing up beside a highway hears adults singing at a higher pitch and copies them, so a local "accent" can spread quickly without any change in genes. ［ウ］

The changes are not without cost. A song sung at a higher pitch may carry less information, or it may be less attractive to potential partners who prefer deeper, more powerful voices. In other words, a bird that ［X］ to be heard may have to accept being heard less favorably. Some researchers also worry that species unable to adjust their songs will gradually disappear from cities, leaving urban parks with fewer kinds of birds than they might otherwise support.

What makes these findings important is not only what they tell us about birds. ［エ］ We often think of adaptation as a process that takes place slowly, in remote places, over thousands of years. The birds singing outside our windows suggest that cities are themselves environments in which change is happening now, quickly enough for us to observe it within a single human lifetime. Reducing noise, by planting trees or limiting traffic near parks, may therefore help not only people but also the other creatures that ［並べかえ：have / learned / to / share / our / streets］.`),
  ], [
    C("gap-a", 2, U.chobun, gapP("ア"), [
      "Birds have responded to this challenge in a number of ways.",
      "In this way, culture can work faster than evolution.",
      "They also remind us that the natural world does not exist only far away from us.",
      "As a result, most city birds have stopped singing altogether.",
    ], 0, [
      "正解。前の段落の「騒音という問題」を this challenge で受け、後ろに対応のしかた（高い声・大きな声・時間をずらす）が並ぶ。",
      "culture（学習で広まること）の話はまだ出ていない。第3段落の内容。",
      "They が指すものがなく、段落の頭に置けない。第5段落の内容。",
      "鳥は歌い方を変えて歌い続けている。本文と逆。",
    ], "段落の頭の空所は、後ろに続く内容のまとめ", [
      ["前後", "前：都市の鳥には{{騒音}}という問題。後：高い声で歌う・大きく歌う・時間をずらす。"],
      ["選ぶ", "問題を {{this challenge}} で受け、後ろの具体例をまとめる文。"],
    ]),
    C("gap-i", 2, U.chobun, gapP("イ"), [
      "A few even sing at night, when the city is at its quietest.",
      "In this way, culture can work faster than evolution.",
      "They also remind us that the natural world does not exist only far away from us.",
      "As a result, most city birds have stopped singing altogether.",
    ], 0, [
      "正解。直前の「道路のすいた時間に歌う」の延長（even で「夜に歌うものさえいる」）。",
      "まだ学習・遺伝の話をしていない。",
      "They が birds を指すとしても「自然は遠くだけにあるのではない」は段落の内容と合わない。",
      "歌い方を変えている段落なので「歌うのをやめた」は合わない。",
    ], "even は直前の例をさらに強める", [
      ["直前", "shift their singing to times of day when the roads are {{less crowded}}。"],
      ["つながり", "{{even}}（〜さえ）で、いちばん静かな夜に歌う例を加える。"],
    ]),
    C("gap-u", 3, U.chobun, gapP("ウ"), [
      "In this way, culture can work faster than evolution.",
      "A few even sing at night, when the city is at its quietest.",
      "They also remind us that the natural world does not exist only far away from us.",
      "Forest birds, by contrast, have no need to defend their territory.",
    ], 0, [
      "正解。若い鳥がまねをして「なまり」が遺伝子の変化なしに広まる＝学習（文化）は進化より速い、というまとめ。",
      "時間をずらす話は第2段落。学習と遺伝の段落には合わない。",
      "鳥の研究が人に教えることは、第5段落で述べる内容。",
      "森の鳥もなわばりを守る（第1段落：歌は多くの鳥がなわばりを守る手段）。本文と食いちがう。",
    ], "段落の最後の空所は、段落のまとめ", [
      ["段落の問い", "学習か、{{遺伝}}か。答え：両方の可能性。"],
      ["まとめ", "まねで{{遺伝子の変化なしに}}すばやく広まる → {{culture}} が {{evolution}} より速い。"],
    ]),
    C("gap-e", 2, U.chobun, gapP("エ"), [
      "They also remind us that the natural world does not exist only far away from us.",
      "Birds have responded to this challenge in a number of ways.",
      "In this way, culture can work faster than evolution.",
      "Forest birds, by contrast, have no need to defend their territory.",
    ], 0, [
      "正解。not only what they tell us about birds（鳥について教えることだけでなく）を受け、「自然は遠くだけのものではない」と述べ、後ろの「遠い場所でゆっくり起こると思いがち」につながる。",
      "this challenge が指すものがない。",
      "直前の「鳥について以外のこと」に答えていない。",
      "第1段落の内容と食いちがい、ここの話題とも関係がない。",
    ], "not only A の後には「A 以外に教えること」", [
      ["直前", "大事なのは{{鳥について教えてくれることだけではない}}。"],
      ["直後", "適応は{{遠い場所で}}ゆっくり起こると思いがち。→ 自然は遠くだけのものではない。"],
    ]),
    C("gap-x", 2, U.vocab, "空所［X］に入る最も適切な語を選べ。", ["struggles", "refuses", "pretends", "forgets"], 0, [
      "正解。「聞いてもらおうと苦労する鳥は、好まれにくい聞かれ方を受け入れねばならない」。",
      "聞いてもらうことを拒むなら、高い声で歌う理由がない。",
      "聞いてもらうふりをする、では意味が通らない。",
      "聞いてもらうことを忘れる、では文脈と合わない。",
    ], "struggle to do＝〜しようと苦労する", [
      ["文の意味", "高い声で{{聞いてもらう}}代わりに、{{好まれにくくなる}}代償。"],
      ["語を選ぶ", "{{struggles to be heard}}（聞いてもらおうと苦労する）。"],
    ], K),
    O("order", 2, U.chobun, ORDER_P, ["have", "learned", "to", "share", "our", "streets"], "learn to do＝〜できるようになる", [
      ["骨組み", "the other creatures {{that have learned}}（関係代名詞＋現在完了）。"],
      ["残り", "{{learned to share our streets}}（私たちの通りを共有するようになった）。"],
    ]),
    C("why-pitch", 1, U.chobun, "都市の鳥が高い声で歌うと聞こえやすくなる理由として、本文に合うものを選べ。", [
      "交通の騒音は低い周波数に集中しているから",
      "高い声のほうが遠くの森まで届くから",
      "若い鳥は高い声しかまねできないから",
      "高い声のほうが相手に好まれるから",
    ], 0, [
      "正解。Traffic noise is concentrated at low frequencies の言いかえ。",
      "森まで届く、という話はない。",
      "若い鳥は大人の歌をまねる。高い声しかまねできないとは言っていない。",
      "第4段落：高い声は相手に好まれにくいかもしれない、と逆のことを言っている。",
    ], "理由は so の前にある", [
      ["探す", "Traffic noise is concentrated at {{low frequencies}}, so a higher song is less likely to be drowned out."],
    ], K),
    C("content", 3, U.chobun, "本文の内容に合うものを選べ。", [
      "若い鳥は、まわりの大人の高い歌をまねることで、遺伝子の変化なしに歌い方を身につけることがある。",
      "研究者たちは、都市の鳥の歌の変化は遺伝の変化だけで説明できると考えている。",
      "歌い方を変えられない種は、都市でかえって数を増やすと予想されている。",
      "筆者は、都市の騒音を減らしても鳥にはほとんど意味がないと述べている。",
    ], 0, [
      "正解。第3段落 copies them, so a local \"accent\" can spread quickly without any change in genes。",
      "the answer may be both（両方かもしれない）と言っており、遺伝だけではない。",
      "第4段落：都市から徐々に消えるのではと心配されている。逆。",
      "最後の文：騒音を減らすことは人だけでなく鳥も助けうる。逆。",
    ], "内容一致は本文の該当箇所と1つずつ照合", [
      ["照合", "学習と遺伝は {{may be both}}。若い鳥は{{まねる}}。"],
      ["逆の選択肢", "消える（{{disappear}}）・鳥も助ける（{{help … other creatures}}）と食いちがう選択肢を外す。"],
    ]),
  ], "reading", 5),
  sec(2, "gap-loanwords", U.chobun, "文の補充（言語の借用語）", GAP_LEAD, [
    en("Borrowed Words", `Every language borrows. English, for example, took thousands of words from French after the eleventh century, and it has continued to absorb words from almost every language its speakers have come into contact with. Japanese has done the same, first borrowing heavily from Chinese and later from Portuguese, Dutch, English and many other languages. Borrowing is so common, in fact, that a language without loanwords would be a far more unusual thing than one full of them.

［ア］ Some people see the arrival of foreign words as a threat to the purity of their language and call for native alternatives to be used instead. Committees have sometimes been set up to invent such alternatives, with mixed results. ［イ］ Speakers, it seems, choose the words they find useful, whatever their origin, and it is difficult for any authority to tell them otherwise.

Loanwords rarely stay exactly as they were. When a word moves from one language into another, it is usually adjusted to fit the sounds of its new home, and its meaning often changes as well. A word may come to refer to only one narrow part of what it meant originally, or it may take on a meaning that speakers of the original language would not recognize at all. ［ウ］ In this sense, a borrowed word is less a copy than a new creation, shaped by the needs and habits of the people who adopted it.

This is why studying loanwords can reveal so much about history. The words a language has borrowed, and the periods in which it borrowed them, show which peoples were in contact, what they traded, and which of them held power or prestige at the time. ［X］ a careful look at the vocabulary of cooking, religion or law in a language can tell a story of contact and exchange that no written record preserves in such detail.

［エ］ When we worry that foreign words are damaging a language, we may be forgetting that much of what we now consider native was once foreign too. Languages are not museums whose collections must be protected from change; they are tools that are constantly ［並べかえ：reshaped / by / the / people / who］ use them.`),
  ], [
    C("gap-a", 2, U.chobun, gapP("ア"), [
      "Not everyone welcomes this process, however.",
      "Many of the invented words never caught on, while the foreign words they were meant to replace remained in everyday use.",
      "Perhaps the most important lesson of loanwords concerns our attitudes to language itself.",
      "For this reason, loanwords always keep their original pronunciation.",
    ], 0, [
      "正解。第1段落の「借用はどこにでもある」を this process で受け、however で「歓迎しない人もいる」と転じ、後ろの「純粋さへの脅威と見る人」につながる。",
      "invented words（作られた語）はまだ出ていない。委員会の話の後に置く文。",
      "段落の内容（借用への反発）を導く文ではない。最後の段落向き。",
      "第3段落：音は新しい言語に合わせて変わる。本文と逆。",
    ], "however は前の段落の内容からの転換", [
      ["前", "借用は{{ごく当たり前}}。"],
      ["後", "外来語を{{純粋さへの脅威}}と見る人もいる → 「歓迎しない人もいる」。"],
    ]),
    C("gap-i", 2, U.chobun, gapP("イ"), [
      "Many of the invented words never caught on, while the foreign words they were meant to replace remained in everyday use.",
      "Not everyone welcomes this process, however.",
      "The Japanese word for a part-time job, borrowed from German, is a familiar example.",
      "As a result, English no longer contains any words of French origin.",
    ], 0, [
      "正解。with mixed results（結果はまちまち）の中身を説明し、後ろの「話し手は役に立つ語を選ぶ」につながる。",
      "反発の話はすでに始まっている。ここで「歓迎しない人もいる」は重なる。",
      "意味が変わった借用語の例。第3段落の内容。",
      "第1段落：英語はフランス語から何千語も借りた。本文と食いちがう。",
    ], "mixed results の中身を具体的に説明する文", [
      ["前", "代わりの語を作る委員会、{{結果はまちまち}}。"],
      ["後", "話し手は{{由来にかかわらず}}役に立つ語を選ぶ → 作った語は広まらなかった。"],
    ]),
    C("gap-u", 2, U.chobun, gapP("ウ"), [
      "The Japanese word for a part-time job, borrowed from German, is a familiar example.",
      "Many of the invented words never caught on, while the foreign words they were meant to replace remained in everyday use.",
      "Perhaps the most important lesson of loanwords concerns our attitudes to language itself.",
      "For this reason, loanwords always keep their original pronunciation.",
    ], 0, [
      "正解。「元の言語の話し手にはわからない意味になることがある」の具体例（ドイツ語の「働く・仕事」から、日本語では「アルバイト」）。",
      "委員会の話は第2段落。ここでは意味の変化を述べている。",
      "まとめの文で、意味の変化の段落の途中には合わない。",
      "音は新しい言語に合わせて変わる、と直前に書いてある。逆。",
    ], "抽象的な説明の直後には具体例", [
      ["直前", "元の言語の話し手には{{わからない意味}}になることがある。"],
      ["例", "ドイツ語から借りた{{アルバイト}}は日本語で「臨時の仕事」の意味。"],
    ]),
    C("gap-e", 2, U.chobun, gapP("エ"), [
      "Perhaps the most important lesson of loanwords concerns our attitudes to language itself.",
      "Many of the invented words never caught on, while the foreign words they were meant to replace remained in everyday use.",
      "The Japanese word for a part-time job, borrowed from German, is a familiar example.",
      "As a result, English no longer contains any words of French origin.",
    ], 0, [
      "正解。最後の段落の頭で、外来語を心配する「言語への態度」について結論を述べる流れを導く。",
      "委員会の話は第2段落で終わっている。",
      "意味の変化の具体例で、結論の段落には合わない。",
      "本文と食いちがう。",
    ], "最終段落の頭は全体の結論を導く文", [
      ["後ろ", "外来語を心配するとき、今の母語の多くもかつては{{外来}}だったことを忘れている。"],
      ["選ぶ", "{{our attitudes to language itself}} について述べる文。"],
    ]),
    C("gap-x", 2, U.setsuzoku, "空所［X］に入る最も適切な語句を選べ。", ["Indeed,", "Nevertheless,", "Instead,", "Otherwise,"], 0, [
      "正解。前の文（借用語は歴史を明らかにする）をさらに具体的に強める。",
      "前の内容と逆のことは述べていない。",
      "何かの代わりを述べる文ではない。",
      "「そうでなければ」では意味が通らない。",
    ], "前の主張を強めて具体化するのは Indeed", [
      ["前後", "前：借用語から{{だれと接触したか}}がわかる。後：料理・宗教・法律の語を見ると{{詳しい物語}}がわかる。"],
      ["つなぎ", "同じ向きで強める → {{Indeed}}。"],
    ], K),
    O("order", 2, U.chobun, ORDER_P, ["reshaped", "by", "the", "people", "who"], "受け身＋by＋関係代名詞の who", [
      ["骨組み", "tools that are constantly {{reshaped by}} 〜（〜によって作りかえられる）。"],
      ["残り", "{{the people who}} use them（それを使う人々）。"],
    ]),
    C("committee", 1, U.chobun, "第2段落の内容に合うものを選べ。", [
      "外来語の代わりの語を作っても、話し手が使うとはかぎらない。",
      "委員会が作った語は、すべて外来語にとって代わった。",
      "外来語を使うことは法律で禁じられることが多い。",
      "外来語を脅威と見る人は、ほとんどいない。",
    ], 0, [
      "正解。it is difficult for any authority to tell them otherwise（どんな権威も話し手に指図するのは難しい）。",
      "with mixed results（結果はまちまち）。すべてではない。",
      "法律の話は出てこない。",
      "Some people see … as a threat と言っており、いる。",
    ], "with mixed results＝成功も失敗もあった", [
      ["該当箇所", "{{with mixed results}}、話し手は{{役に立つ語を選ぶ}}。"],
    ], K),
    C("content", 3, U.chobun, "本文の内容に合うものを選べ。", [
      "借用された語は、元の言語とは異なる意味を持つようになることがあり、写しというより新しい創造物である。",
      "借用語がまったくない言語のほうが、借用語の多い言語より一般的である。",
      "借用語の研究からは、言語どうしの接触の歴史はほとんどわからない。",
      "筆者は、言語は変化から守られるべき博物館のようなものだと考えている。",
    ], 0, [
      "正解。第3段落 a borrowed word is less a copy than a new creation。",
      "第1段落：借用語のない言語のほうがずっと珍しい。逆。",
      "第4段落：借用語は歴史を多く明らかにする。逆。",
      "最後の文：言語は博物館ではない（not museums）。逆。",
    ], "less A than B＝A というより B", [
      ["照合", "{{less a copy than a new creation}}＝写しというより新しい創造物。"],
      ["否定の文", "{{Languages are not museums}} を読み落とさない。"],
    ]),
  ], "reading", 5),
  sec(2, "gap-spotlight", U.chobun, "文の補充（「見られている」という思いこみ）", GAP_LEAD, [
    en("Nobody Is Watching", `Imagine walking into a classroom and realizing, too late, that you are wearing a shirt with a large coffee stain on the front. For the rest of the morning, you are sure that everyone has noticed. You cross your arms, avoid raising your hand, and replay the moment in your head long after class has finished. Yet if you asked your classmates later, most of them would probably have no memory of the stain at all.

Psychologists call this tendency to overestimate how much others notice us the "spotlight effect." ［ア］ In a typical experiment, participants are asked to wear an unusual or embarrassing item of clothing into a room full of strangers and then to guess how many of those people noticed it. Their guesses are regularly far higher than the true number. ［イ］

Why do we make this mistake? Part of the answer is that each of us is, quite naturally, at the center of our own experience. We know every detail of our appearance and every small error we make, and it is hard to remember that other people do not share this knowledge. ［ウ］ They are busy worrying about their own shirts, their own words, and their own mistakes. Ironically, the very fact that everyone feels watched means that hardly anyone is watching.

The effect applies to more than appearance. People tend to believe that a nervous moment during a presentation, a forgotten word, or a joke that falls flat will be remembered and judged harshly. In reality, observers are often less aware of such moments than the speaker is, and even when they notice them, they are ［X］ to judge them as harshly as the speaker fears.

［エ］ Knowing that we are less closely observed than we believe can make it easier to try new things, to ask questions in public, and to recover from small embarrassments. That does not mean that other people never notice or care. It means only that the audience in our heads is usually larger, and far more critical, ［並べかえ：than / the / one / in / the / room］.`),
  ], [
    C("gap-a", 2, U.chobun, gapP("ア"), [
      "The name suggests a stage on which a single bright light follows one performer wherever they go.",
      "Other people, meanwhile, are at the center of their own experience, not ours.",
      "Understanding the spotlight effect can be surprisingly freeing.",
      "As a result, most participants refused to take part in the experiment.",
    ], 0, [
      "正解。直前で示した名前 spotlight effect の由来を説明する。",
      "なぜまちがえるかの説明は第3段落。ここではまだ理由を述べていない。",
      "効果の意義は最後の段落。名前を紹介した直後には早すぎる。",
      "直後に実験の結果が続くので、参加を断ったでは矛盾する。",
    ], "用語の直後は、その用語の説明", [
      ["直前", "この傾向を {{\"spotlight effect\"}} と呼ぶ。"],
      ["選ぶ", "名前の{{由来}}（舞台で一人を照らす光）を説明する文。"],
    ]),
    C("gap-i", 2, U.chobun, gapP("イ"), [
      "In other words, people imagine that a spotlight is on them when it is not.",
      "The name suggests a stage on which a single bright light follows one performer wherever they go.",
      "Understanding the spotlight effect can be surprisingly freeing.",
      "This is why people rarely feel nervous in front of strangers.",
    ], 0, [
      "正解。実験の結果（推測が実際よりずっと多い）を In other words で言いかえてまとめる。",
      "名前の由来は、名前を出した直後に述べるもの。実験の結果のあとには合わない。",
      "意義のまとめは最後の段落の役割。",
      "実験の結果は、見知らぬ人の前で気にしすぎることを示す。逆。",
    ], "In other words は直前の言いかえ", [
      ["直前", "推測は{{実際の人数よりずっと多い}}。"],
      ["まとめ", "照らされていないのに{{照らされていると思う}}。"],
    ]),
    C("gap-u", 3, U.chobun, gapP("ウ"), [
      "Other people, meanwhile, are at the center of their own experience, not ours.",
      "The name suggests a stage on which a single bright light follows one performer wherever they go.",
      "Understanding the spotlight effect can be surprisingly freeing.",
      "As a result, most participants refused to take part in the experiment.",
    ], 0, [
      "正解。「自分は自分の経験の中心にいる」と対になり、直後の They（＝他人）は自分のことで忙しい、につながる。",
      "名前の由来は第2段落の話。",
      "まだ理由の説明の途中で、結論には早い。",
      "実験の話はこの段落にない。",
    ], "直後の代名詞 They が何を指すかで決める", [
      ["直後", "{{They}} are busy worrying about their own shirts … → They は{{他人}}。"],
      ["対比", "自分は自分の中心・{{他人も他人の中心}}。"],
    ]),
    C("gap-e", 2, U.chobun, gapP("エ"), [
      "Understanding the spotlight effect can be surprisingly freeing.",
      "Other people, meanwhile, are at the center of their own experience, not ours.",
      "In other words, people imagine that a spotlight is on them when it is not.",
      "This is why people rarely feel nervous in front of strangers.",
    ], 0, [
      "正解。直後の「思うほど見られていないと知れば、新しいことに挑戦しやすくなる」＝自由になれる、の導入。",
      "理由の説明は第3段落で終わっている。",
      "実験結果の言いかえで、最後の段落の頭には合わない。",
      "本文の主張と逆。",
    ], "最後の段落の頭は、直後の内容を一言でまとめる", [
      ["直後", "挑戦しやすく、質問しやすく、{{立ち直りやすく}}なる。"],
      ["まとめ", "→ {{freeing}}（気持ちを自由にする）。"],
    ]),
    C("gap-x", 2, U.vocab, "空所［X］に入る最も適切な語を選べ。", ["unlikely", "certain", "eager", "quick"], 0, [
      "正解。「気づいても、話し手が恐れるほど厳しく判断する可能性は低い」。In reality で始まる、思いこみを否定する文。",
      "「必ず厳しく判断する」では In reality（実際は）の流れと逆。",
      "「進んで厳しく判断する」も流れと逆。",
      "「すぐに厳しく判断する」も流れと逆。",
    ], "be unlikely to do＝〜しそうにない", [
      ["流れ", "{{In reality}}：思いこみを否定する文。even when they notice（気づいたとしても）。"],
      ["語", "厳しく判断{{しそうにない}} → unlikely。"],
    ], K),
    O("order", 2, U.chobun, ORDER_P, ["than", "the", "one", "in", "the", "room"], "比較の than の後に、比べる相手（the one）", [
      ["比較", "larger, and far more critical, {{than}} 〜。"],
      ["相手", "頭の中の観客と比べるのは{{the one in the room}}（部屋にいる観客）。one＝audience。"],
    ]),
    C("experiment", 1, U.chobun, "第2段落の実験について、本文に合うものを選べ。", [
      "参加者は、自分の服に気づいた人の数を実際より多く見積もった。",
      "参加者は、自分の服に気づいた人の数を正確に当てた。",
      "見知らぬ人たちは、参加者の服をほぼ全員が覚えていた。",
      "参加者は、自分で選んだ服を着て部屋に入った。",
    ], 0, [
      "正解。Their guesses are regularly far higher than the true number。",
      "far higher（ずっと多い）と言っており、正確ではない。",
      "第1段落の例のとおり、実際に気づく人は少ない。",
      "are asked to wear（着るように頼まれる）。自分で選んだのではない。",
    ], "far higher than the true number を読み取る", [
      ["該当箇所", "推測は{{実際の人数よりずっと多い}}。"],
    ], K),
    C("content", 3, U.chobun, "本文の内容に合うものを選べ。", [
      "だれもが自分は見られていると感じているので、実際にはほとんどだれも他人を見ていない。",
      "スポットライト効果は外見にだけ当てはまり、話し方には当てはまらない。",
      "筆者は、他人は私たちのことをまったく気にしていないと述べている。",
      "発表での小さな失敗は、話し手よりも聞き手のほうがよく覚えている。",
    ], 0, [
      "正解。第3段落 the very fact that everyone feels watched means that hardly anyone is watching。",
      "第4段落：外見以上のものに当てはまる（applies to more than appearance）。",
      "最後の段落：他人が決して気にしないという意味ではない（That does not mean …）。",
      "第4段落：聞き手は話し手ほど気づいていない。逆。",
    ], "筆者の限定（That does not mean …）に注意", [
      ["照合", "{{hardly anyone is watching}}（ほとんどだれも見ていない）。"],
      ["限定", "{{That does not mean that other people never notice}}：言い過ぎの選択肢を外す。"],
    ]),
  ], "reading", 5),
];

// =====================================================================
// 第2問(A)　自由英作文（60〜80語）
// =====================================================================

const ES_LEAD = "次の問いについて、あなたの考えを60〜80語の英語で述べよ。";
const ES_LIMIT = { min: 60, max: 80, unit: "語" as const };
const esRubric = (pos: string[], reason: string[], lang: string[]): Rub => [
  ["立場・答えがはっきりしている", 3, pos],
  ["理由・具体例が筋道立って示されている", 5, reason],
  ["文法・語法・語数（60〜80語）が適切", 6, lang],
];

const P3: ExamPoolSection[] = [
  sec(3, "es-paper-books", U.jiyu, "自由英作文（紙の本の将来）", ES_LEAD, [
    ja("「いずれ紙の本は電子書籍に完全に置きかわる」という意見がある。あなたはこの意見に賛成か、反対か。"),
  ], [
    WC("essay", 2, U.jiyu, "上の意見に賛成か反対かを明らかにし、理由を添えて60〜80語の英語で述べよ。", ES_LIMIT,
      `I disagree with this opinion. Electronic books are certainly convenient, because we can carry hundreds of them in one small device. However, paper books offer an experience that a screen cannot easily replace. When I read a printed book, I can feel how far I have read, write notes in the margins, and lend it to a friend without any special equipment. For these reasons, I believe paper books will continue to exist alongside electronic ones.`,
      esRubric(["I disagree", "I agree"], ["However", "For these reasons", "convenient"], ["alongside", "without any"]),
      "譲歩（確かに〜）→反論→理由→結論の順",
      [
        ["立場", "最初の文で {{I disagree / I agree}} をはっきり書く。"],
        ["理由", "電子書籍の利点を{{譲歩}}で認め、However で紙の本の利点を具体的に（手ざわり・書きこみ・貸し借り）。"],
        ["語数", "60〜80語。最後に{{結論}}を1文でくり返すと形が整う。"],
      ], 900),
  ], "writing"),
  sec(3, "es-failure", U.jiyu, "自由英作文（失敗から学ぶこと）", ES_LEAD, [
    ja("「人は成功からよりも、失敗からより多くのことを学ぶ」という考え方がある。"),
  ], [
    WC("essay", 2, U.jiyu, "この考え方について、あなたの経験を例に挙げながら、60〜80語の英語で考えを述べよ。", ES_LIMIT,
      `I agree that we learn more from failure than from success. When I was in junior high school, I failed an important English test because I had only memorized words without practicing how to use them. This failure forced me to change the way I studied, and I began reading short stories every day. Success often makes us repeat the same methods without thinking, while failure makes us ask what went wrong and how we can improve.`,
      esRubric(["I agree", "I disagree"], ["When I was", "forced me to", "while"], ["learn more from", "what went wrong"]),
      "自分の経験は「何が起き、何を変えたか」まで書く",
      [
        ["立場", "{{I agree that …}} と考え方をくり返して立場を示す。"],
        ["経験", "失敗の{{原因}}と、それで{{何を変えたか}}を具体的に。"],
        ["一般化", "最後に成功と失敗を{{対比}}（while …）して、意見にまとめる。"],
      ], 900),
  ], "writing"),
  sec(3, "es-one-year", U.jiyu, "自由英作文（1年間だけ暮らすなら）", ES_LEAD, [
    ja("もしあなたが、どこでも好きな場所で1年間だけ暮らせるとしたら、どこを選ぶか。"),
  ], [
    WC("essay", 2, U.jiyu, "場所を1つ挙げ、そこを選ぶ理由を、60〜80語の英語で述べよ。実在の場所でも、架空の場所でもよい。", ES_LIMIT,
      `If I could live anywhere for one year, I would choose a small fishing village by the sea. I have always lived in a big city, so I have never experienced a life that follows the rhythm of nature. In a village, I could wake up early, help the fishermen, and learn how people there depend on the weather and on each other. I think such a year would teach me things that no textbook could.`,
      esRubric(["I would choose", "If I could"], ["so", "I could", "teach me"], ["would", "could"]),
      "仮定の問いには仮定法（would・could）で答える",
      [
        ["形", "{{If I could live … , I would choose …}} と仮定法で書き出す。"],
        ["理由", "今の自分との{{ちがい}}（都会に住んでいる）から、そこで何を{{したいか}}・何を学べるか。"],
        ["結び", "その1年が自分に何をもたらすかを1文で。"],
      ], 900),
  ], "writing"),
  sec(3, "es-ai-translation", U.jiyu, "自由英作文（機械翻訳と外国語学習）", ES_LEAD, [
    ja("Some people say that, because machine translation is improving rapidly, students will no longer need to learn foreign languages."),
  ], [
    WC("essay", 3, U.jiyu, "上の意見について、あなたはどう考えるか。理由を添えて、60〜80語の英語で述べよ。", ES_LIMIT,
      `I do not think that machine translation will make learning foreign languages unnecessary. It is true that translation software is useful for reading signs or simple emails. However, learning a language is not only about exchanging information. When we study another language, we also learn how its speakers see the world, and we can build real friendships without a machine between us. Therefore, students should continue to learn foreign languages even as technology improves.`,
      esRubric(["I do not think", "I think"], ["It is true that", "However", "Therefore"], ["unnecessary", "not only"]),
      "「確かに便利だが、学ぶ意味は情報だけではない」",
      [
        ["立場", "{{I do not think that …}} と意見の文を受けて立場を示す。"],
        ["譲歩", "{{It is true that …}} で機械翻訳の便利さを認める。"],
        ["理由", "However で、言語学習は{{情報のやりとりだけではない}}（ものの見方・人との関係）。"],
      ], 900),
  ], "writing"),
];

// =====================================================================
// 第2問(B)　和文英訳（下線部）
// =====================================================================

const TR_LEAD = "次の文章の下線部を英語に訳せ。";
const TR_PROMPT = "下線部を英語に訳せ。";
const trRubric = (frame: string[], words: string[], content: string[]): Rub => [
  ["文の骨組み（構文・時制・語順）が正しい", 4, frame],
  ["語句の選び方・語法が適切", 3, words],
  ["内容にぬけ・つけ足しがない", 3, content],
];

const P4: ExamPoolSection[] = [
  sec(4, "tr-travel", U.wabun, "和文英訳（旅の価値）", TR_LEAD, [
    ja("旅の楽しみは、目的地に着くことだけではない。{{むしろ、思いがけない出来事に出会い、それまで当たり前だと思っていたことを見直すきっかけを得ることにこそ、旅の本当の価値があるのかもしれない。}}"),
  ], [
    WC("translate", 3, U.wabun, TR_PROMPT, { unit: "語" },
      "Rather, the true value of travel may lie in encountering unexpected events and getting a chance to reconsider what we had taken for granted.",
      trRubric(["the true value of travel may lie in", "-ing"], ["unexpected", "take for granted", "reconsider"], ["思いがけない出来事", "見直すきっかけ", "当たり前"]),
      "「〜にこそ価値がある」＝ the value lies in 〜",
      [
        ["骨組み", "主語を{{the true value of travel}} にして、{{may lie in}} ＋動名詞（〜にあるのかもしれない）。"],
        ["語句", "「当たり前だと思う」＝ {{take … for granted}}。それまで、なので {{had taken}}（taken でも可）。"],
        ["きっかけ", "「見直すきっかけを得る」＝ get a chance / an opportunity {{to reconsider}}。"],
      ], 480,
      ["Instead, what really makes travel worthwhile may be coming across unexpected events and having an opportunity to rethink things we used to take for granted."]),
  ], "writing"),
  sec(4, "tr-explain", U.wabun, "和文英訳（説明できないということ）", TR_LEAD, [
    ja("{{私たちは、何かを知っているつもりになっているときほど、それについて人に説明しようとすると言葉に詰まるものだ。}}説明できないということは、まだ理解が足りないということでもある。"),
  ], [
    WC("translate", 3, U.wabun, TR_PROMPT, { unit: "語" },
      "The more confident we are that we understand something, the more likely we are to be lost for words when we try to explain it to someone else.",
      trRubric(["The more …, the more …", "when we try to"], ["be lost for words", "explain it to"], ["知っているつもり", "言葉に詰まる"]),
      "「〜ほど…」は the＋比較級, the＋比較級",
      [
        ["骨組み", "「〜ときほど…ものだ」→ {{The more …, the more likely we are to …}}。"],
        ["つもり", "「知っているつもり」＝ we think we know / are confident that we understand。"],
        ["語句", "「言葉に詰まる」＝ {{be lost for words}} / cannot find the right words。"],
      ], 480,
      ["We often find ourselves at a loss for words when we try to explain something to others, especially when we believe we already know it well."]),
  ], "writing"),
  sec(4, "tr-hometown", U.wabun, "和文英訳（子どものころの町）", TR_LEAD, [
    ja("子どものころ住んでいた町を久しぶりに訪れると、{{記憶の中では広く感じた通りが、意外なほど狭く見えて驚くことがある。}}体が大きくなったせいもあるが、それだけではないだろう。"),
  ], [
    WC("translate", 2, U.wabun, TR_PROMPT, { unit: "語" },
      "we are sometimes surprised to find that a street which seemed wide in our memory looks much narrower than we expected.",
      trRubric(["be surprised to find that", "which seemed"], ["in our memory", "narrower than we expected"], ["記憶の中で広い", "意外なほど狭い", "驚く"]),
      "「意外なほど」は than we expected で表せる",
      [
        ["骨組み", "「驚くことがある」＝ {{we are sometimes surprised to find that …}}。"],
        ["修飾", "「記憶の中では広く感じた通り」＝ a street {{which seemed wide in our memory}}。"],
        ["比較", "「意外なほど狭い」＝ {{much narrower than we expected}} / surprisingly narrow。"],
      ], 420,
      ["you may be surprised that streets you remember as wide now look surprisingly narrow."]),
  ], "writing"),
  sec(4, "tr-tools", U.wabun, "和文英訳（便利な道具と自分の手）", TR_LEAD, [
    ja("{{便利な道具が増えるにつれて、私たちが自分の手でできることは、かえって減っているのではないだろうか。}}たとえば、地図を読む力や、簡単な料理をする力がそうだ。"),
  ], [
    WC("translate", 2, U.wabun, TR_PROMPT, { unit: "語" },
      "Isn't it possible that, as we get more and more convenient tools, there are actually fewer things we can do with our own hands?",
      trRubric(["as …", "Isn't it possible that"], ["convenient tools", "with our own hands"], ["増えるにつれて", "かえって減っている"]),
      "「〜につれて」＝ as ＋比較・変化の表現",
      [
        ["骨組み", "「〜のではないだろうか」＝ {{Isn't it possible that …?}} / I wonder if …。"],
        ["つれて", "「増えるにつれて」＝ {{as}} convenient tools increase / as we get more convenient tools。"],
        ["かえって", "「かえって減っている」＝ {{actually}} fewer things … / are decreasing instead。"],
      ], 420,
      ["I wonder if the number of things we can do with our own hands is actually decreasing as convenient tools increase."]),
  ], "writing"),
];

// =====================================================================
// 第3問　リスニング（(A) 講義／(B) インタビュー・会話・討論。放送は2回まで）
// =====================================================================

const LS_LEAD = "放送を聞き、問いに対する答えとして最も適切なものを選べ。放送は2回まで聞くことができる。";
const L = (s: string): Material => ({ kind: "text", body: `〔放送〕${s}〔/放送〕` });
const LQ = (
  id: string,
  difficulty: 1 | 2 | 3,
  prompt: string,
  options: string[],
  correct: number,
  why: string[],
  point: string,
  st: St[],
): QuestionB => ({ ...C(id, difficulty, U.listen, prompt, options, correct, why, point, st, difficulty === 1 ? K : S), seconds: 40 + 15 * difficulty });

const NIGHT = `Good evening, everyone. Tonight I want to talk about something most of us never think about: darkness. For almost all of the history of life on Earth, nights were dark. The only light came from the moon and the stars. Today, in much of the world, that is no longer true. Street lamps, office buildings, car headlights and advertising screens fill the night sky with a glow that can be seen from many kilometers away. Scientists call this light pollution.

You might think that extra light at night is harmless, or even helpful. After all, it makes streets feel safer. But for many living things, darkness is not simply the absence of light. It is a signal. Many insects, for example, find their way by keeping the moon at a fixed angle. A bright lamp confuses them, and they circle it until they are exhausted or eaten. Some birds that travel long distances at night use the stars to find their way, and the glow of a large city can pull them off course. Every year, large numbers of these birds crash into brightly lit buildings.

Humans are affected too. Our bodies follow a daily rhythm that is set partly by the cycle of light and dark. Bright light late in the evening, especially the bluish light from screens and some modern lamps, can make it harder to fall asleep.

The good news is that light pollution is one of the easiest kinds of pollution to reduce. Unlike chemicals in a river, it disappears the moment we switch the lights off. Some cities now ask office buildings to turn off unnecessary lights during the seasons when birds migrate. Others are replacing old street lamps with ones that point downward, so that light falls on the road instead of spreading into the sky. These changes often save money as well, because less energy is wasted. So the next time you walk home at night, look up. If you cannot see the stars, ask yourself whether all that light is really needed.`;

const MUSIC = `Host: Welcome back. My guest today is Doctor Mara Linden, who studies how adults learn new skills. Doctor Linden, many people believe that if you didn't learn a musical instrument as a child, it's too late. Is that true?
Linden: It's one of the most common beliefs I hear, and it's mostly wrong. Children do have some advantages. They often have more free time, and they're less worried about sounding bad. But adults have advantages too. They can understand how a piece of music is built, they can plan their practice, and they usually know why they want to learn.
Host: So why do so many adults give up?
Linden: In my experience, the main reason isn't ability. It's expectations. Adults are used to being good at their jobs, and they find it uncomfortable to be beginners again. When they compare themselves with a professional recording, they feel discouraged after a few weeks.
Host: What would you advise them to do?
Linden: First, practice for short periods, but often. Fifteen minutes every day is far more effective than two hours once a week. Second, record yourself once a month and compare the new recording with the old one, not with a professional. That way you can actually hear your progress. And third, find other people to play with. Even a small group of beginners keeps people going, because no one wants to let the others down.
Host: Does it matter which instrument you choose?
Linden: Less than people think. The best instrument is the one you'll actually want to pick up every day. If you love the sound of the cello, don't choose the piano just because someone told you it's easier to start.
Host: And what about the benefits? Is it just about enjoying music?
Linden: Enjoyment is the main thing, but there may be other benefits. Learning something truly new keeps adults mentally active, and playing in a group gives people a sense of belonging. Several of the people in my studies told me that their weekly group practice had become the highlight of their week.
Host: Doctor Linden, thank you very much.`;

const QUEUE = `Today's topic may sound unimportant, but it affects all of us several times a week: waiting in line. Whether we are at a supermarket, a bank, or a theme park, we spend a surprising amount of our lives waiting. What researchers have found is that how long a wait feels can matter as much as how long it actually is.

Let me give you three principles. The first is that empty time feels longer than occupied time. If you have nothing to do, every minute seems to stretch. This is why many buildings put mirrors near elevators, or screens near the checkout. They don't make the wait shorter, but they give people something to look at, and the wait feels shorter.

The second principle is that uncertain waits feel longer than known waits. If a sign tells you that the next train will arrive in eight minutes, you can relax, check your messages, or plan what to do. If there is no information, you keep looking down the track, and the same eight minutes feel much longer. Many theme parks now display estimated waiting times for their rides, and some are said to show times that are a little longer than the real wait, so that visitors are pleasantly surprised when they reach the front sooner than expected.

The third principle concerns fairness. People hate seeing someone who arrived after them being served first. In a shop with several separate lines, you often feel that the line next to yours is moving faster, and sometimes it really is. A single line that leads to several counters may look longer, but customers tend to prefer it, because everyone is served in the order in which they arrived.

What can we learn from all this? Businesses that want satisfied customers should think not only about reducing waiting times, which can be expensive, but also about managing how those waits are experienced, which is often cheap. And as customers, perhaps we can be a little kinder to the staff, knowing that our impatience is partly a trick of the mind.`;

const LIBRARY = `Ken: Thanks for coming, everyone. As you know, the town council has to decide what to do about the old library on Hill Street. The building is nearly eighty years old, and the roof leaks every winter. Ruth, you've been looking into the costs.
Ruth: Yes. Repairing the roof and bringing the building up to modern safety standards would cost about two million dollars. Building a new library near the station would cost about five million. So repairing the old one is clearly cheaper.
Daniel: In the short term, yes. But the old building is expensive to heat, and it has no space for the things people want from a library today: study rooms, a children's area, computers. We would spend two million dollars and still have a building that doesn't work very well.
Ruth: I understand that, but the old library is part of the town's history. People have held weddings in the garden there. My grandmother learned to read in that building. If we move the library, the building may be sold and turned into apartments.
Ken: Daniel, what about the location? Not everyone lives near the station.
Daniel: Actually, that's one of my main points. Most young families now live in the new houses near the station, and the buses from the older neighborhoods all stop there. The Hill Street library is at the top of a steep hill, which is hard for older people and for anyone pushing a baby carriage.
Ruth: That's fair. I hadn't thought about the hill. Maybe there's a compromise. What if we built the new library near the station, but kept the old building as a local history museum and meeting space, run by volunteers?
Daniel: I'd support that, as long as the town can afford to keep both buildings. Running two places costs more than running one.
Ken: That sounds like something we should ask the residents about. Let's prepare a survey with three options: repair the old library, build a new one, or Ruth's combined plan. We'll present the results at next month's meeting.`;

const HABIT = `Good morning. Today I'd like to talk about habits: the things we do every day almost without thinking, like brushing our teeth or checking our phones as soon as we wake up. About half of what we do on a normal day may be done out of habit rather than by careful choice. That is not a bad thing. If we had to think about every small action, we would be exhausted before lunch.

So how does a habit form? Researchers often describe it as a loop with three parts. First, there is a cue, something that starts the behavior, such as a time of day, a place, or a feeling. Second, there is the routine, the behavior itself. And third, there is a reward, something pleasant that makes the brain want to repeat the loop. Each time the loop is repeated, the link between the cue and the routine becomes stronger, until the behavior starts automatically.

How long does this take? You may have heard that it takes twenty-one days to form a new habit. In fact, there is no fixed number. Simple habits, like drinking a glass of water with breakfast, may form in a few weeks, while more difficult ones, like running every evening, can take several months. Missing a day now and then does not seem to ruin the process, which is good news for most of us.

What about breaking bad habits? Here, the most useful advice is that it is usually easier to replace a habit than to simply stop it. If you always eat sweets when you feel bored in the afternoon, the cue, boredom, will not go away. But you can keep the cue and change the routine, for example by taking a short walk instead. You still get a reward, a break from boredom, but from a healthier routine.

Finally, remember that our surroundings matter more than we often think. If you want to read more, leave a book on your pillow. If you want to use your phone less, keep it in another room. Making good habits easy and bad habits difficult is often more effective than relying on willpower alone.`;

const PROJECT = `Sara: Tom, have you got a minute? We need to decide on the topic for our group presentation. It's due in three weeks.
Tom: Sure. I was thinking about plastic bottles. Our school sells hundreds of them every day from the vending machines.
Sara: That's a good idea, but isn't it a bit too common? Every group did something about plastic last year.
Tom: Maybe, but we could make it more local. Instead of talking about plastic in general, we could count how many bottles are thrown away at our school in one week.
Sara: Oh, I like that. Real numbers from our own school would be much more interesting than numbers from the internet. But who would do the counting?
Tom: The cleaning staff empty the recycling boxes every afternoon. I could ask them if we can look in the boxes before they take them away.
Sara: Good. And I could make a short questionnaire for students. We could ask why they buy bottled drinks instead of bringing their own.
Tom: Great. But we should keep it short. Nobody wants to answer thirty questions.
Sara: Five questions at most, I promise. What about the solution part? Our teacher said every presentation should end with a realistic proposal.
Tom: We could suggest putting water fountains in each building. Then students could refill their own bottles.
Sara: That might be expensive, though. I'm not sure the school would agree. How about starting with something cheaper, like selling reusable bottles at the school shop?
Tom: Why not suggest both? We can present the cheaper idea as the first step and the water fountains as a longer-term goal.
Sara: Perfect. Let's meet again on Friday after we've collected some numbers. I'll send you the questions tonight so you can check them.
Tom: Sounds good. I'll talk to the cleaning staff tomorrow morning.`;

const HABIT_QS: QuestionB[] = [
  LQ("habit-why", 1, "According to the speaker, why are habits useful?", [
    "Without them, we would be exhausted from thinking about every small action.",
    "They make us more careful about our choices.",
    "They help us remember to check our phones.",
    "They make the morning pass more quickly.",
  ], 0, [
    "正解。If we had to think about every small action, we would be exhausted before lunch。",
    "habit rather than careful choice と言っており、注意深い選択とは逆。",
    "電話を見るのは習慣の例で、役に立つ理由ではない。",
    "朝が早く過ぎる、とは言っていない。",
  ], "仮定法 If we had to … の文が理由", [
    ["聞きどころ", "That is not a bad thing. {{If we had to think about every small action, we would be exhausted}}。"],
  ]),
  LQ("habit-loop", 2, "Which of the following correctly describes the three parts of the habit loop?", [
    "A cue that starts the behavior, the routine itself, and a reward",
    "A goal, a plan, and a result",
    "A feeling, a memory, and a decision",
    "A place, a time, and a person",
  ], 0, [
    "正解。First, there is a cue … Second, there is the routine … And third, there is a reward。",
    "goal・plan は出てこない。",
    "feeling は cue の例の1つ。3つの部分ではない。",
    "time・place は cue の例。",
  ], "First・Second・third の順に聞き取る", [
    ["聞きどころ", "{{cue}} → {{routine}} → {{reward}}。"],
    ["わな", "time of day, a place, a feeling は {{cue の例}}。"],
  ]),
  LQ("habit-stronger", 2, "What happens each time the loop is repeated?", [
    "The link between the cue and the routine becomes stronger.",
    "The reward becomes less pleasant.",
    "The brain stops noticing the cue.",
    "The routine takes more time to complete.",
  ], 0, [
    "正解。the link between the cue and the routine becomes stronger, until the behavior starts automatically。",
    "報酬が弱まるとは言っていない。",
    "合図に気づかなくなる、とは言っていない。",
    "時間が長くなる話はない。",
  ], "Each time … のあとに変化が述べられる", [
    ["聞きどころ", "{{the link between the cue and the routine becomes stronger}}。"],
  ]),
  LQ("habit-days", 3, "What does the speaker say about the idea that a new habit takes twenty-one days to form?", [
    "There is no fixed number; it depends on how difficult the habit is.",
    "It is true for simple habits but not for running.",
    "It is correct as long as you never miss a day.",
    "Most habits actually form in less than a week.",
  ], 0, [
    "正解。In fact, there is no fixed number. 簡単な習慣は数週間、難しいものは数か月。",
    "簡単な習慣も a few weeks で、21日と決まってはいない。",
    "1日休んでもだめにはならない（does not seem to ruin the process）。",
    "1週間未満とは言っていない。",
  ], "You may have heard … In fact は俗説の否定", [
    ["否定", "{{In fact, there is no fixed number}}。"],
    ["補足", "簡単＝{{a few weeks}}、難しい＝{{several months}}。休んでも {{does not seem to ruin}}。"],
  ]),
  LQ("habit-replace", 2, "According to the speaker, what is the most useful advice for breaking a bad habit?", [
    "Keep the cue but change the routine to a healthier one.",
    "Stop the behavior completely on a single day.",
    "Avoid every situation that makes you feel bored.",
    "Give yourself a bigger reward for stopping.",
  ], 0, [
    "正解。it is usually easier to replace a habit than to simply stop it. … keep the cue and change the routine。",
    "やめるより置きかえるほうが簡単、と言っている。",
    "退屈という合図はなくならない（will not go away）。",
    "大きなごほうびの話はない。",
  ], "replace（置きかえる）と stop（やめる）の対比", [
    ["聞きどころ", "easier to {{replace}} a habit than to simply {{stop}} it。"],
    ["例", "{{keep the cue and change the routine}}：お菓子 → 短い散歩。"],
  ]),
  LQ("habit-walk", 2, "In the speaker's example, what does a person get from taking a short walk instead of eating sweets?", [
    "A break from boredom, through a healthier routine",
    "More energy to eat sweets later",
    "A chance to meet friends",
    "A way to stop feeling bored forever",
  ], 0, [
    "正解。You still get a reward, a break from boredom, but from a healthier routine。",
    "あとでお菓子を食べる話はない。",
    "友だちの話はない。",
    "合図（退屈）はなくならない、と言っている。",
  ], "報酬は同じで、行動だけを変える", [
    ["聞きどころ", "You still get {{a reward, a break from boredom}}, but from {{a healthier routine}}。"],
  ]),
  LQ("habit-surroundings", 3, "What is the speaker's final point?", [
    "Arranging our surroundings to make good habits easy is often more effective than willpower alone.",
    "Willpower is the most important factor in changing habits.",
    "People should read in bed instead of using their phones.",
    "Phones should never be kept in the bedroom.",
  ], 0, [
    "正解。Making good habits easy and bad habits difficult is often more effective than relying on willpower alone。",
    "意志の力だけにたよるより効果的、と言っている。逆。",
    "本を枕に置くのは例。寝床で読めという主張ではない。",
    "電話を別の部屋に置くのも例で、never とまでは言っていない。",
  ], "Finally のあとが講義のまとめ", [
    ["まとめ", "{{our surroundings matter}}：本は枕の上、電話は別の部屋。"],
    ["結論", "more effective than {{relying on willpower alone}}。"],
  ]),
];

const PROJECT_QS: QuestionB[] = [
  LQ("proj-worry", 1, "What is Sara's first concern about Tom's topic?", [
    "Many groups already chose a topic about plastic last year.",
    "The vending machines are going to be removed.",
    "There is not enough information on the internet.",
    "The presentation is due tomorrow.",
  ], 0, [
    "正解。isn't it a bit too common? Every group did something about plastic last year。",
    "自動販売機がなくなる話はない。",
    "インターネットの数字より学校の数字がよい、という話。",
    "締め切りは3週間後（in three weeks）。",
  ], "too common＝ありふれすぎ", [
    ["聞きどころ", "a bit {{too common}}? {{Every group did something about plastic last year}}。"],
  ]),
  LQ("proj-local", 2, "How does Tom suggest making the topic more interesting?", [
    "By counting how many bottles are thrown away at their school in one week",
    "By comparing their school with schools in other countries",
    "By interviewing companies that make plastic bottles",
    "By collecting numbers from the internet",
  ], 0, [
    "正解。count how many bottles are thrown away at our school in one week。",
    "ほかの国の学校との比較の話はない。",
    "会社への取材の話はない。",
    "インターネットの数字より自分たちの学校の数字がよい、と Sara が言っている。",
  ], "Instead of A, B の B が提案", [
    ["聞きどころ", "Instead of talking about plastic in general, we could {{count how many bottles are thrown away at our school}}。"],
  ]),
  LQ("proj-staff", 2, "Why does Tom plan to talk to the cleaning staff?", [
    "To ask if they can look in the recycling boxes before the boxes are emptied",
    "To ask them to answer the questionnaire",
    "To find out how much the water fountains cost",
    "To ask them to stop selling bottled drinks",
  ], 0, [
    "正解。I could ask them if we can look in the boxes before they take them away。",
    "アンケートは生徒向け（questionnaire for students）。",
    "水飲み場の費用の話は掃除の人とはしない。",
    "飲み物を売っているのは自動販売機。",
  ], "だれに・何を頼むか", [
    ["聞きどころ", "The cleaning staff {{empty the recycling boxes}} … I could ask them if we can {{look in the boxes}}。"],
  ]),
  LQ("proj-questions", 1, "How many questions does Sara promise to put in the questionnaire?", [
    "No more than five",
    "Exactly three",
    "About ten",
    "Thirty",
  ], 0, [
    "正解。Five questions at most（多くても5問）。",
    "3問とは言っていない。",
    "10問とは言っていない。",
    "30問は Tom の「だれも答えたくない」例。",
  ], "at most＝多くても", [
    ["聞きどころ", "{{Five questions at most}}, I promise。"],
    ["わな", "{{thirty}} は「長すぎる」例として出た数。"],
  ]),
  LQ("proj-fountain", 2, "Why is Sara unsure about Tom's idea of water fountains?", [
    "It might be too expensive for the school to accept.",
    "Students do not like drinking tap water.",
    "There is no space for them in the buildings.",
    "The teacher has already rejected the idea.",
  ], 0, [
    "正解。That might be expensive, though. I'm not sure the school would agree。",
    "水道水を好まない話はない。",
    "場所の話はない。",
    "先生が却下した、とは言っていない。",
  ], "though＝でも（文末で懸念を添える）", [
    ["聞きどころ", "That {{might be expensive}}, though. I'm not sure {{the school would agree}}。"],
  ]),
  LQ("proj-final", 3, "What do Sara and Tom finally decide to propose?", [
    "Selling reusable bottles first, and water fountains as a longer-term goal",
    "Only water fountains, because they are the most effective",
    "Only reusable bottles, because fountains are too expensive",
    "Removing all the vending machines from the school",
  ], 0, [
    "正解。present the cheaper idea as the first step and the water fountains as a longer-term goal。",
    "両方を提案する（Why not suggest both?）。",
    "水飲み場も長期の目標として残す。",
    "自動販売機をなくす話はない。",
  ], "Why not 〜?＝〜してはどう？（提案）", [
    ["聞きどころ", "{{Why not suggest both?}}"],
    ["中身", "安い案を {{the first step}}、水飲み場を {{a longer-term goal}}。"],
  ]),
  LQ("proj-next", 2, "What will Sara do tonight?", [
    "Send Tom the questions so that he can check them",
    "Talk to the cleaning staff",
    "Count the bottles in the recycling boxes",
    "Meet Tom to collect numbers",
  ], 0, [
    "正解。I'll send you the questions tonight so you can check them。",
    "掃除の人と話すのは Tom（明日の朝）。",
    "数えるのは金曜までにすること。今夜とは言っていない。",
    "会うのは金曜日。",
  ], "だれが・いつ・何をするかを区別", [
    ["Sara", "{{tonight}}：アンケートの質問を送る。"],
    ["Tom", "{{tomorrow morning}}：掃除の人と話す。会うのは {{Friday}}。"],
  ]),
];

const P5: ExamPoolSection[] = [
  sec(5, "ls-habit", U.listen, "リスニング（講義：習慣のしくみ）", LS_LEAD, [L(HABIT)], HABIT_QS, "mix", 5),
  sec(6, "ls-project", U.listen, "リスニング（会話：発表の準備）", LS_LEAD, [L(PROJECT)], PROJECT_QS, "mix", 5),
  sec(5, "ls-night", U.listen, "リスニング（講義：夜の明かりと生き物）", LS_LEAD, [L(NIGHT)], [
    LQ("insects", 1, "According to the speaker, how do many insects find their way at night?", [
      "By keeping the moon at a fixed angle",
      "By following the smell of flowers",
      "By flying toward the brightest light they can see",
      "By listening to the sounds of other insects",
    ], 0, [
      "正解。find their way by keeping the moon at a fixed angle と言っている。",
      "においの話は出てこない。",
      "明るい灯りに引き寄せられるのは「混乱した」結果で、道を見つける方法ではない。",
      "音の話は出てこない。",
    ], "方法は by -ing のあとを聞く", [
      ["聞きどころ", "Many insects … find their way {{by keeping the moon at a fixed angle}}。"],
      ["わな", "灯りのまわりを回るのは{{混乱した結果}}（A bright lamp confuses them）。"],
    ]),
    LQ("birds", 2, "What does the speaker say happens to some birds that travel at night?", [
      "Many of them crash into brightly lit buildings.",
      "They learn to use city lights instead of the stars.",
      "They stop traveling and stay in the city.",
      "They travel only on nights when the moon is full.",
    ], 0, [
      "正解。large numbers of these birds crash into brightly lit buildings。",
      "街の光は鳥を進路からそらす（pull them off course）。光を使うようになるのではない。",
      "移動をやめるとは言っていない。",
      "満月の話は出てこない。",
    ], "off course＝進路からはずれて", [
      ["聞きどころ", "the glow … can {{pull them off course}}。Every year, large numbers … {{crash into}} brightly lit buildings。"],
    ]),
    LQ("humans", 2, "Why can bright light late in the evening be a problem for people?", [
      "It can disturb the body's daily rhythm and make it harder to fall asleep.",
      "It makes people feel less safe on the streets.",
      "It damages people's eyes if they look at it directly.",
      "It makes people wake up too early in the morning.",
    ], 0, [
      "正解。毎日のリズムは光と闇で整えられ、夜の明るい光は眠りにくくする。",
      "明かりは街を安全に感じさせる（makes streets feel safer）と言っている。逆。",
      "目をいためる話はしていない。",
      "朝早く目が覚める、とは言っていない。眠りにつきにくい（harder to fall asleep）。",
    ], "fall asleep＝寝つく", [
      ["聞きどころ", "a daily rhythm … set partly by {{the cycle of light and dark}}。"],
      ["結論", "can make it {{harder to fall asleep}}。"],
    ]),
    LQ("easy", 2, "Why does the speaker say light pollution is one of the easiest kinds of pollution to reduce?", [
      "Because it disappears as soon as the lights are switched off",
      "Because most cities have already solved the problem",
      "Because new lamps are much brighter than old ones",
      "Because it affects only a small number of animals",
    ], 0, [
      "正解。it disappears the moment we switch the lights off。",
      "すでに解決した、とは言っていない。取り組みを始めた都市がある、という話。",
      "明るさの比較はしていない。",
      "虫・鳥・人に影響するので、少数の動物だけではない。",
    ], "the moment S V＝S が V するとすぐに", [
      ["聞きどころ", "Unlike chemicals in a river, it disappears {{the moment we switch the lights off}}。"],
    ]),
    LQ("cities", 1, "What do some cities ask office buildings to do?", [
      "Turn off unnecessary lights during the seasons when birds migrate",
      "Use only bluish lamps in the evening",
      "Close their offices earlier in the winter",
      "Put advertising screens on their roofs",
    ], 0, [
      "正解。turn off unnecessary lights during the seasons when birds migrate。",
      "青っぽい光は眠りを妨げる光として出てきた。",
      "閉館時刻の話はない。",
      "広告の画面は光害の原因として挙げられている。",
    ], "時期の限定（during the seasons when …）まで聞く", [
      ["聞きどころ", "ask office buildings to {{turn off unnecessary lights}} {{during the seasons when birds migrate}}。"],
    ]),
    LQ("money", 2, "According to the speaker, what is an additional benefit of these changes?", [
      "They often save money because less energy is wasted.",
      "They make it easier for drivers to see road signs.",
      "They attract more insects to city parks.",
      "They allow buildings to stay open later at night.",
    ], 0, [
      "正解。These changes often save money as well, because less energy is wasted。",
      "道路標識の話はない。",
      "虫を引き寄せるのは問題として述べられた。",
      "遅くまで開ける、という話はない。",
    ], "as well＝〜もまた（追加の利点）", [
      ["聞きどころ", "These changes often {{save money as well}}, because {{less energy is wasted}}。"],
    ]),
    LQ("ending", 3, "What does the speaker ask the listeners to do at the end of the talk?", [
      "Look at the night sky and ask whether all the light is really needed",
      "Avoid walking home alone after dark",
      "Write to the city council about street lamps",
      "Count the number of stars they can see each night",
    ], 0, [
      "正解。look up. If you cannot see the stars, ask yourself whether all that light is really needed。",
      "安全のために歩かないように、とは言っていない。",
      "市議会に手紙を書く話はない。",
      "星を数える、とは言っていない。見えるかどうかを確かめる。",
    ], "講義の最後の呼びかけを聞き取る", [
      ["聞きどころ", "the next time you walk home at night, {{look up}}。"],
      ["続き", "{{ask yourself whether all that light is really needed}}。"],
    ]),
  ], "mix", 5),
  sec(6, "ls-music", U.listen, "リスニング（インタビュー：大人の楽器の学習）", LS_LEAD, [L(MUSIC)], [
    LQ("adult-adv", 2, "According to Doctor Linden, what is one advantage that adults have when learning an instrument?", [
      "They can understand how music is built and plan their practice.",
      "They usually have more free time than children.",
      "They are less worried about sounding bad.",
      "They can hear small differences in sound better than children.",
    ], 0, [
      "正解。They can understand how a piece of music is built, they can plan their practice。",
      "自由な時間が多いのは子どものほう。",
      "下手に聞こえるのを気にしないのも子どものほう。",
      "聞き分けの能力の比較はしていない。",
    ], "children と adults の利点を区別する", [
      ["子ども", "{{more free time}}・{{less worried about sounding bad}}。"],
      ["大人", "But adults have advantages too → {{understand how … music is built}}・{{plan their practice}}。"],
    ]),
    LQ("give-up", 2, "What does Doctor Linden think is the main reason many adults give up?", [
      "They find it uncomfortable to be beginners and compare themselves with professionals.",
      "They do not have enough natural ability for music.",
      "Musical instruments are too expensive for most adults.",
      "Their teachers expect them to practice for too many hours.",
    ], 0, [
      "正解。the main reason isn't ability. It's expectations. … uncomfortable to be beginners again … compare themselves with a professional recording。",
      "isn't ability（能力ではない）と否定している。",
      "値段の話は出てこない。",
      "先生の要求の話はない。",
    ], "not A. It's B. の B が答え", [
      ["聞きどころ", "the main reason {{isn't ability}}. It's {{expectations}}。"],
      ["中身", "{{beginners again}} が居心地悪く、プロの録音と比べて落ちこむ。"],
    ]),
    LQ("practice", 1, "What kind of practice does Doctor Linden recommend?", [
      "Short periods of practice every day",
      "Two hours of practice once a week",
      "Practice only when you feel like it",
      "Long sessions with a professional teacher",
    ], 0, [
      "正解。practice for short periods, but often. Fifteen minutes every day …。",
      "far more effective than two hours once a week と比べられた、効果の低いほう。",
      "気が向いたときだけ、とは言っていない。",
      "プロの先生との長時間の練習の話はない。",
    ], "比較の than のあとは「劣るほう」", [
      ["聞きどころ", "{{Fifteen minutes every day}} is far more effective than two hours once a week。"],
    ]),
    LQ("record", 2, "Why does Doctor Linden suggest recording yourself once a month?", [
      "So that you can hear your own progress by comparing new and old recordings",
      "So that you can send the recording to a professional for advice",
      "So that you can share your music with friends online",
      "So that you can check whether your instrument needs repair",
    ], 0, [
      "正解。compare the new recording with the old one, not with a professional. That way you can actually hear your progress。",
      "not with a professional（プロとは比べない）と言っている。",
      "共有の話はない。",
      "楽器の修理の話はない。",
    ], "That way＝そうすれば（目的）", [
      ["聞きどころ", "compare the new recording {{with the old one, not with a professional}}。"],
      ["目的", "That way you can actually {{hear your progress}}。"],
    ]),
    LQ("group", 2, "Why does playing with other people help learners continue?", [
      "Because no one wants to let the others down",
      "Because group lessons are cheaper than private lessons",
      "Because the others can correct their mistakes",
      "Because playing in a group is easier than playing alone",
    ], 0, [
      "正解。no one wants to let the others down（だれも仲間をがっかりさせたくない）。",
      "料金の話はない。",
      "まちがいを直してもらう、とは言っていない。",
      "一人より簡単、とは言っていない。",
    ], "let 人 down＝人をがっかりさせる", [
      ["聞きどころ", "keeps people going, {{because no one wants to let the others down}}。"],
    ]),
    LQ("instrument", 3, "What is Doctor Linden's advice about choosing an instrument?", [
      "Choose the instrument you will actually want to play every day.",
      "Start with the piano because it is the easiest instrument.",
      "Choose an instrument that is popular among other beginners.",
      "Try several instruments before you buy any of them.",
    ], 0, [
      "正解。The best instrument is the one you'll actually want to pick up every day。",
      "ピアノが簡単だからと選ぶな、と言っている。逆。",
      "人気の話はない。",
      "いくつか試すとは言っていない。",
    ], "don't … just because ～＝～だけの理由で…するな", [
      ["聞きどころ", "the one you'll actually {{want to pick up every day}}。"],
      ["わな", "{{don't choose the piano just because}} someone told you it's easier。"],
    ]),
    LQ("benefit", 2, "Which benefit of learning an instrument does Doctor Linden mention?", [
      "Playing in a group can give people a sense of belonging.",
      "Adults who play music sleep better at night.",
      "Musicians are more successful in their jobs.",
      "Learning an instrument helps people earn extra money.",
    ], 0, [
      "正解。playing in a group gives people a sense of belonging。",
      "睡眠の話はない。",
      "仕事での成功の話はない。",
      "収入の話はない。",
    ], "述べられた利点は2つ（頭の活性化・仲間意識）", [
      ["聞きどころ", "keeps adults {{mentally active}}、a {{sense of belonging}}。"],
    ]),
  ], "mix", 5),
  sec(5, "ls-queue", U.listen, "リスニング（講義：行列で待つ時間の心理）", LS_LEAD, [L(QUEUE)], [
    LQ("main", 2, "What is the main point of the lecture?", [
      "How long a wait feels can matter as much as how long it really is.",
      "Waiting in line is a serious problem only at theme parks.",
      "Businesses should always reduce waiting times, whatever it costs.",
      "People today are less patient than people in the past.",
    ], 0, [
      "正解。how long a wait feels can matter as much as how long it actually is。",
      "スーパー・銀行・テーマパークなど、どこでも起こる。",
      "短くするのは費用がかかるので、感じ方を管理するのが安上がり、という結論。",
      "昔との比較はしていない。",
    ], "講義の冒頭の What researchers have found が主題", [
      ["聞きどころ", "how long a wait {{feels}} can matter as much as how long it {{actually is}}。"],
    ]),
    LQ("mirrors", 1, "Why are mirrors often placed near elevators, according to the lecture?", [
      "They give people something to look at, so the wait feels shorter.",
      "They make the elevators arrive more quickly.",
      "They help people check whether the elevator is full.",
      "They make the waiting area look larger.",
    ], 0, [
      "正解。They don't make the wait shorter, but they give people something to look at, and the wait feels shorter。",
      "They don't make the wait shorter と否定している。",
      "満員かを確かめる話はない。",
      "広く見せる話はない。",
    ], "don't A, but B の B が答え", [
      ["原則", "{{empty time feels longer than occupied time}}。"],
      ["例", "鏡は待ち時間を短くは{{しない}}が、{{見るもの}}を与える。"],
    ]),
    LQ("train", 2, "What does the speaker say about the sign showing that the next train will arrive in eight minutes?", [
      "It allows people to relax and use the time as they like.",
      "It makes the eight minutes feel longer.",
      "It is usually wrong by a few minutes.",
      "It encourages people to walk to the next station.",
    ], 0, [
      "正解。you can relax, check your messages, or plan what to do。",
      "長く感じるのは情報がないとき。",
      "表示がまちがっている、とは言っていない。",
      "歩く話はない。",
    ], "known と uncertain の対比", [
      ["原則", "{{uncertain waits feel longer than known waits}}。"],
      ["例", "表示があれば {{you can relax}}、なければ線路の先を見続けて長く感じる。"],
    ]),
    LQ("theme-park", 3, "Why are some theme parks said to show waiting times that are a little longer than the real wait?", [
      "So that visitors are pleasantly surprised when the wait turns out to be shorter",
      "So that fewer visitors join the line for popular rides",
      "So that visitors buy food while they are waiting",
      "So that the staff have extra time to prepare each ride",
    ], 0, [
      "正解。so that visitors are pleasantly surprised when they reach the front sooner than expected。",
      "客を減らすため、とは言っていない。",
      "食べ物の話はない。",
      "準備の話はない。",
    ], "so that 〜＝〜するように（目的）", [
      ["聞きどころ", "a little longer than the real wait, {{so that visitors are pleasantly surprised}}。"],
    ]),
    LQ("single-line", 2, "Why do customers tend to prefer a single line that leads to several counters?", [
      "Because everyone is served in the order in which they arrived",
      "Because a single line is always shorter",
      "Because they can choose which counter to go to",
      "Because the staff work faster at a single line",
    ], 0, [
      "正解。because everyone is served in the order in which they arrived（公平さ）。",
      "may look longer（長く見えるかもしれない）と言っている。",
      "窓口を選べる、とは言っていない。",
      "店員が速く働く話はない。",
    ], "第3の原則は fairness（公平さ）", [
      ["原則", "The third principle concerns {{fairness}}。"],
      ["理由", "{{served in the order in which they arrived}}。"],
    ]),
    LQ("advice", 3, "What does the speaker suggest businesses should do?", [
      "Manage how waits are experienced, which is often cheap, as well as reduce waiting times",
      "Reduce waiting times at any cost because customers hate waiting",
      "Stop telling customers how long they will have to wait",
      "Use several separate lines so that customers can choose",
    ], 0, [
      "正解。not only about reducing waiting times, which can be expensive, but also about managing how those waits are experienced, which is often cheap。",
      "短くするのは費用がかかる（can be expensive）と言っている。",
      "待ち時間を知らせるほうがよい（第2の原則）。逆。",
      "別々の列は不公平に感じられる（第3の原則）。逆。",
    ], "not only A but also B の B に重心", [
      ["聞きどころ", "{{not only}} reducing waiting times … {{but also}} managing how those waits are experienced。"],
    ]),
    LQ("not-principle", 3, "Which of the following is NOT one of the three principles in the lecture?", [
      "Waits feel shorter when people are standing rather than sitting.",
      "Empty time feels longer than occupied time.",
      "Uncertain waits feel longer than known waits.",
      "Unfair waits are especially annoying.",
    ], 0, [
      "正解。立つ・座るの話は出てこない。",
      "第1の原則。",
      "第2の原則。",
      "第3の原則（fairness）。",
    ], "NOT 問題は出てきたものを消していく", [
      ["整理", "1 {{empty / occupied}}、2 {{uncertain / known}}、3 {{fairness}}。"],
    ]),
  ], "mix", 5),
  sec(6, "ls-library", U.listen, "リスニング（討論：町の図書館をどうするか）", LS_LEAD, [L(LIBRARY)], [
    LQ("problem", 1, "What problem with the old library is mentioned at the beginning?", [
      "The roof leaks every winter.",
      "The building is too small for the books.",
      "The library is closed on weekends.",
      "There is no parking near the building.",
    ], 0, [
      "正解。the roof leaks every winter。",
      "本が入りきらない、とは言っていない。",
      "開館日の話はない。",
      "駐車場の話はない。",
    ], "冒頭の状況説明を聞きのがさない", [
      ["聞きどころ", "nearly eighty years old, and {{the roof leaks every winter}}。"],
    ]),
    LQ("cost", 2, "According to Ruth, how much more would a new library cost than repairing the old one?", [
      "About three million dollars more",
      "About two million dollars more",
      "About five million dollars more",
      "About the same amount",
    ], 0, [
      "正解。新築 five million − 修理 two million ＝ 約3百万ドル多い。",
      "2百万ドルは修理の費用そのもの。",
      "5百万ドルは新築の費用そのもの。",
      "差がある。",
    ], "2つの数を聞いて差を計算する", [
      ["数", "修理 {{two million}}、新築 {{five million}}。"],
      ["計算", "5−2＝{{3}}（百万ドル）。"],
    ]),
    LQ("daniel-repair", 2, "Why is Daniel against simply repairing the old library?", [
      "It would still lack space for things people want from a modern library.",
      "Repairing the roof would take more than ten years.",
      "He thinks nobody uses libraries anymore.",
      "The old building could not be made safe.",
    ], 0, [
      "正解。no space for … study rooms, a children's area, computers … still have a building that doesn't work very well。",
      "期間の話はない。",
      "図書館を使わないとは言っていない。新しい機能を求めている。",
      "安全基準に合わせる費用は Ruth が示しており、できないとは言っていない。",
    ], "In the short term, yes. But … のあとが反対の理由", [
      ["聞きどころ", "暖房費が高い・{{no space for}} study rooms, a children's area, computers。"],
    ]),
    LQ("ruth-history", 2, "Why does Ruth want to keep the old building?", [
      "Because it is an important part of the town's history",
      "Because it is closer to the station",
      "Because it is cheaper to heat than a new building",
      "Because the volunteers do not want to move",
    ], 0, [
      "正解。the old library is part of the town's history（結婚式・祖母が字を覚えた）。",
      "駅に近いのは新しい図書館の予定地。",
      "暖房費が高いと言ったのは Daniel。",
      "ボランティアの気持ちの話はない。",
    ], "だれの発言かを区別する", [
      ["聞きどころ", "Ruth：{{part of the town's history}}、売られてアパートになるかもしれない。"],
    ]),
    LQ("location", 2, "Why does Daniel think the station area is a better location?", [
      "Many young families live there and buses from older neighborhoods stop there.",
      "The land near the station is cheaper than on Hill Street.",
      "Most older people prefer to live near the station.",
      "The station area has a beautiful garden for weddings.",
    ], 0, [
      "正解。Most young families now live … near the station, and the buses from the older neighborhoods all stop there。",
      "土地の値段の話はない。",
      "高齢者は坂がつらい、という話で、駅の近くに住むとは言っていない。",
      "結婚式の庭は古い図書館の話。",
    ], "理由は2つ（住む人・バス）", [
      ["聞きどころ", "{{young families}} live near the station、{{the buses … all stop there}}。"],
      ["補足", "古い図書館は{{急な坂の上}}。"],
    ]),
    LQ("compromise", 3, "What compromise does Ruth suggest?", [
      "Building the new library near the station and using the old building as a history museum and meeting space",
      "Repairing only the roof of the old library and adding computers",
      "Selling the old building and using the money to build apartments",
      "Moving the library to the station for a few years and then moving it back",
    ], 0, [
      "正解。built the new library near the station, but kept the old building as a local history museum and meeting space, run by volunteers。",
      "屋根だけ直す案は出ていない。",
      "売ってアパートにすることを Ruth は心配している。逆。",
      "戻す話はない。",
    ], "What if …? は提案の合図", [
      ["聞きどころ", "{{What if}} we built the new library near the station, but kept the old building as a {{local history museum and meeting space}}?"],
    ]),
    LQ("next", 1, "What will Ken do next?", [
      "Prepare a survey for residents with three options",
      "Ask the council to choose Ruth's plan",
      "Start repairing the roof before winter",
      "Visit other towns' libraries for ideas",
    ], 0, [
      "正解。Let's prepare a survey with three options。",
      "住民に聞く、と言っており、案を決めてはいない。",
      "修理を始める話はない。",
      "ほかの町を訪ねる話はない。",
    ], "Let's … は次の行動", [
      ["聞きどころ", "{{Let's prepare a survey with three options}}：修理・新築・Ruth の案。"],
    ]),
  ], "mix", 5),
];

// =====================================================================
// 第4問(A)　誤り指摘（各段落の下線部(a)〜(e)から、誤りを含むものを1つ）
// =====================================================================

const ERR_LEAD = "次の英文の各段落の下線部(a)〜(e)のうち、文法・語法または文脈の上で誤りを含むものを、段落ごとに1つずつ選べ。";

interface Para {
  /** 段落の記号 (A〜F) */
  k: string;
  /** 下線部を {{(a) …}} で書いた段落 */
  text: string;
  /** 誤りの下線部 (0=a … 4=e) */
  wrong: number;
  /** 誤りの説明 (正しい形を含める) */
  fix: string;
  unit: string;
  difficulty: 1 | 2 | 3;
  point: string;
}

const segsOf = (text: string) => [...text.matchAll(/\{\{\(([a-e])\) ([^}]+)\}\}/g)].map((m) => `(${m[1]}) ${m[2]}`);

function errSec(id: string, title: string, ptitle: string, paras: Para[]): ExamPoolSection {
  const body = paras.map((p) => `【${p.k}】 ${p.text}`).join("\n\n");
  const questions: QuestionB[] = paras.map((p) => {
    const options = segsOf(p.text);
    if (options.length !== 5) throw new Error(`${id} ${p.k}: 下線部が ${options.length} 個`);
    const why = options.map((o, i) => (i === p.wrong ? `誤り。${p.fix}` : `正しい。${o.slice(4)} は文法・文脈とも問題ない。`));
    return {
      ...C(`para-${p.k.toLowerCase()}`, p.difficulty, p.unit, `段落【${p.k}】の下線部(a)〜(e)のうち、誤りを含むものを1つ選べ。`, options, p.wrong, why, p.point, [
        ["文の骨組み", "下線部ごとに、{{主語と動詞}}・{{時制}}・{{後ろに続く形}}を確かめる。"],
        ["誤りの箇所", p.fix],
      ], K),
      keepOrder: true,
    };
  });
  return sec(7, id, U.chobun, title, ERR_LEAD, [en(ptitle, body)], questions, "reading", 4);
}

const P6: ExamPoolSection[] = [
  errSec("err-garden", "誤り指摘（祖母の庭）", "My Grandmother's Garden", [
    {
      k: "A",
      text: "When my grandmother gave me a small corner of her garden, I {{(a) had no idea}} what to do with it. I {{(b) had never grown}} anything before, and the seeds she handed me looked {{(c) too small to}} become anything at all. She simply told me to {{(d) be patient}} and to {{(e) watering them}} every morning.",
      wrong: 4,
      fix: "told me to … and {{to water them}}。to のあとは動詞の原形。",
      unit: U.futeishi,
      difficulty: 1,
      point: "tell 人 to do の to のあとは原形",
    },
    {
      k: "B",
      text: "For the first two weeks, nothing happened. I checked the soil {{(a) so often that}} my grandmother laughed at me. {{(b) Then one morning}}, I noticed tiny green leaves {{(c) pushing their way}} through the earth, and I felt {{(d) as excited as}} if I {{(e) have discovered}} treasure.",
      wrong: 4,
      fix: "as if のあとで過去の事実に反すること（実際は宝を見つけていない）は、過去の時点より前なので {{had discovered}}。",
      unit: U.kateiho,
      difficulty: 2,
      point: "as if の中は仮定法（過去・過去完了）",
    },
    {
      k: "C",
      text: "Not all of my plants survived. Some {{(a) were eaten}} by insects, and others died because I {{(b) gave them}} too much water. My grandmother explained that plants, {{(c) like people}}, can suffer from {{(d) too much}} care as well as from {{(e) too few}}.",
      wrong: 4,
      fix: "care は数えられない名詞なので too few ではなく {{too little}}。",
      unit: U.meishi,
      difficulty: 2,
      point: "数えられない名詞には little・much",
    },
    {
      k: "D",
      text: "By the end of the summer, I {{(a) had grown}} enough tomatoes to share with our neighbors. {{(b) What surprised me most}} was not the size of the harvest but how {{(c) differently}} the tomatoes tasted from {{(d) the ones}} we usually {{(e) bought}} at the supermarket.",
      wrong: 2,
      fix: "taste は「〜な味がする」（SVC）なので、補語は形容詞 {{different}}。",
      unit: U.bunkei,
      difficulty: 3,
      point: "taste・look・sound の補語は形容詞",
    },
    {
      k: "E",
      text: "Gardening taught me {{(a) that}} some things cannot be hurried. In a world {{(b) where}} almost everything can be delivered {{(c) within}} a day, it is {{(d) worth to remember}} that a tomato still takes months {{(e) to ripen}}.",
      wrong: 3,
      fix: "worth のあとは動名詞。{{worth remembering}}（覚えておく価値がある）。",
      unit: U.domeishi,
      difficulty: 2,
      point: "be worth -ing（〜する価値がある）",
    },
    {
      k: "F",
      text: "My grandmother {{(a) passed away}} two years ago, but her garden {{(b) is still}} there. Every spring I plant the seeds {{(c) which}} I save from the previous year, and each time I {{(d) am reminded}} of the morning she first {{(e) has shown}} me how to plant them.",
      wrong: 4,
      fix: "the morning（過去の特定の時）のことなので現在完了は使えない。{{showed}}。",
      unit: U.kanryo,
      difficulty: 2,
      point: "過去の特定の時には現在完了を使わない",
    },
  ]),
  errSec("err-cycling", "誤り指摘（自転車の町）", "A City on Two Wheels", [
    {
      k: "A",
      text: "Ten years ago, very few people in our city {{(a) rode}} bicycles to work. The roads were {{(b) crowded with}} cars, and cycling was {{(c) considered}} both dangerous and unfashionable. {{(d) Most people}} who owned a bicycle used it only {{(e) in weekends}}.",
      wrong: 4,
      fix: "週末は {{on weekends}}（イギリス英語では at weekends）。in は使わない。",
      unit: U.zenchishi,
      difficulty: 1,
      point: "曜日・週末の前置詞は on",
    },
    {
      k: "B",
      text: "Things began to change when the city {{(a) decided to}} build a network of protected cycle lanes. At first, many shop owners {{(b) complained}} that removing parking spaces would {{(c) drive}} customers away. They feared that {{(d) fewer}} people would visit, and that their businesses {{(e) will suffer}}.",
      wrong: 4,
      fix: "feared（過去）に続く that 節なので、時制をそろえて {{would suffer}}。",
      unit: U.jisei,
      difficulty: 2,
      point: "主節が過去なら that 節の will は would",
    },
    {
      k: "C",
      text: "In fact, the opposite happened. People on bicycles {{(a) tend to}} stop more often than drivers, and they find it easier {{(b) to visiting}} small shops {{(c) along}} their route. Within a few years, several shops reported that their sales {{(d) had risen}}, and some owners {{(e) who had opposed}} the lanes began to support them.",
      wrong: 1,
      fix: "find it easier to do の形式目的語の構文なので {{to visit}}（不定詞）。",
      unit: U.futeishi,
      difficulty: 2,
      point: "find it 形容詞 to do（形式目的語）",
    },
    {
      k: "D",
      text: "The change has also {{(a) affected}} the health of residents. A short ride to work each day provides exercise {{(b) that}} many busy people {{(c) would otherwise}} not get. Doctors in the city say that they now see fewer patients {{(d) suffering}} from problems {{(e) causing}} by lack of exercise.",
      wrong: 4,
      fix: "problems は「引き起こされる」側なので過去分詞 {{caused}} by …。",
      unit: U.bunshi,
      difficulty: 2,
      point: "名詞と分詞の関係が受け身なら過去分詞",
    },
    {
      k: "E",
      text: "Of course, not everyone is {{(a) able to}} cycle. Older people and those with disabilities still {{(b) depend on}} buses and cars, and the city must make sure that {{(c) their needs}} are not {{(d) forgotten}}. A transport system that works only for the young and healthy {{(e) are}} not a fair one.",
      wrong: 4,
      fix: "主語は A transport system（単数）。関係詞節にまどわされず {{is}}。",
      unit: U.bunkei,
      difficulty: 2,
      point: "長い主語は中心の名詞で数を決める",
    },
    {
      k: "F",
      text: "Other cities {{(a) have begun}} to send officials to study our experience. {{(b) That}} they usually discover is that the lanes themselves were {{(c) less important}} than the decision to {{(d) treat}} cyclists as ordinary road users {{(e) rather than}} as a problem to be solved.",
      wrong: 1,
      fix: "discover の目的語が欠けた節が主語になるので、関係代名詞 {{What}}（〜こと）。",
      unit: U.kandai,
      difficulty: 3,
      point: "目的語の欠けた名詞節は what でまとめる",
    },
  ]),
  errSec("err-letters", "誤り指摘（手紙とメッセージ）", "Letters and Messages", [
    {
      k: "A",
      text: "When I was a student, I {{(a) used to}} write letters to a friend who {{(b) had moved}} abroad. Each letter took about a week to arrive, so by the time she read my news, it was {{(c) already}} old. Still, I looked forward to her replies {{(d) more than}} anything else, and I kept every one of {{(e) it}}.",
      wrong: 4,
      fix: "指すのは her replies（複数）なので {{every one of them}}。",
      unit: U.daimeishi,
      difficulty: 1,
      point: "代名詞は指す名詞の数に合わせる",
    },
    {
      k: "B",
      text: "Writing by hand {{(a) forced me}} to think before I wrote. Because I could not easily delete a sentence, I {{(b) tended to}} plan what I wanted to say. My letters were {{(c) much}} shorter than the messages I send today, but they were {{(d) much}} more carefully {{(e) composing}}.",
      wrong: 4,
      fix: "手紙は「書かれる」側なので受け身 were … {{composed}}。",
      unit: U.judo,
      difficulty: 2,
      point: "主語が動作を受ける側なら be＋過去分詞",
    },
    {
      k: "C",
      text: "Today, I exchange messages with friends {{(a) almost}} every day. It is {{(b) conveniently}} to be able to reply {{(c) within}} seconds, and I {{(d) would not want}} to give it up. However, I have noticed that I rarely read an old message {{(e) a second time}}.",
      wrong: 1,
      fix: "It is ＋補語＋to do の構文なので、補語は形容詞 {{convenient}}。",
      unit: U.keiyoshi,
      difficulty: 1,
      point: "It is 形容詞 to do。副詞は補語にならない",
    },
    {
      k: "D",
      text: "One reason {{(a) may be}} that messages arrive {{(b) so}} frequently. When something is always available, we stop {{(c) to value}} it. A letter that arrives once a month {{(d) feels}} like an event, while a message is just one of {{(e) many}}.",
      wrong: 2,
      fix: "「大切にするのをやめる」は stop -ing。stop to value は「大切にするために立ち止まる」で文脈に合わない。{{stop valuing}}。",
      unit: U.domeishi,
      difficulty: 3,
      point: "stop -ing＝やめる／stop to do＝立ち止まって〜",
    },
    {
      k: "E",
      text: "I do not mean that we {{(a) should}} return to the past. Messages {{(b) have made}} it possible for people {{(c) living}} far apart to stay close {{(d) in}} ways that {{(e) was}} unimaginable fifty years ago.",
      wrong: 4,
      fix: "関係代名詞 that の先行詞は ways（複数）なので {{were}}。",
      unit: U.kandai,
      difficulty: 2,
      point: "関係詞節の動詞は先行詞の数に合わせる",
    },
    {
      k: "F",
      text: "Recently, I decided to write a letter by hand to my old friend for the first time {{(a) since}} many years. It took me {{(b) nearly}} an hour, and my handwriting {{(c) had become}} rather poor. When she called to thank me, she said she {{(d) had}} almost forgotten {{(e) how it felt}} to receive one.",
      wrong: 0,
      fix: "「何年ぶりかで」は for the first time {{in}} many years。since のあとには起点（since 2010 など）が来る。",
      unit: U.zenchishi,
      difficulty: 3,
      point: "for the first time in 〜 years＝〜年ぶりに",
    },
  ]),
];

// =====================================================================
// 第4問(B)　下線部和訳
// =====================================================================

const WA_LEAD = "次の英文を読み、下線部を和訳せよ。";
const waRubric = (frame: string[], words: string[], nat: string[]): Rub => [
  ["構文の取り方（主語・述語・修飾関係）が正しい", 5, frame],
  ["語句の意味が正しく訳されている", 3, words],
  ["自然な日本語になっている", 2, nat],
];
const WA = (id: string, d: 1 | 2 | 3, label: string, model: string, rubric: Rub, point: string, st: St[]): QuestionB =>
  WB(id, d, U.wabun, `下線部${label}を和訳せよ。`, model, rubric, point, st, 360);

const P7: ExamPoolSection[] = [
  sec(8, "wa-silence", U.chobun, "下線部和訳（会話の沈黙）", WA_LEAD, [
    en("The Meaning of Silence", `In some cultures, a pause in conversation is felt to be awkward, and people rush to fill it. In others, a short silence is a sign of respect, showing that the listener is taking time to consider what has been said. {{ア　Neither attitude is more correct than the other, but misunderstandings arise when people from different backgrounds assume that their own habits are universal.}} A visitor who is used to quick replies may conclude that a thoughtful host is bored or unfriendly, while the host may find the visitor's constant talk exhausting.

{{イ　What makes such misunderstandings hard to correct is that we are rarely aware of the rules we follow.}} Nobody teaches us how long to wait before answering a question; we simply absorb these patterns as children by watching the people around us. {{ウ　It is only when we meet someone whose patterns differ from ours that we realize there were rules at all.}} In that sense, an uncomfortable silence can teach us something about ourselves. {{エ　The next time a conversation suddenly goes quiet, it might be worth resisting the urge to fill the gap and seeing what the other person says.}}`),
  ], [
    WA("a", 2, "ア", "どちらの態度がもう一方より正しいということはないが、異なる背景をもつ人々が自分の習慣はどこでも通用すると思いこむと、誤解が生じる。",
      waRubric(["Neither … than the other", "when … assume that"], ["universal", "backgrounds"], ["どちらも", "誤解が生じる"]), "Neither … than the other＝どちらも他より〜でない", [
        ["前半", "{{Neither attitude is more correct than the other}}＝どちらの態度も他方より正しくはない。"],
        ["後半", "when 節が条件。{{universal}}＝どこでも通用する・普遍的な。"],
      ]),
    WA("i", 2, "イ", "そうした誤解を正すのが難しいのは、私たちが自分の従っている決まりにめったに気づかないからだ。",
      waRubric(["What makes … is that", "make O C"], ["rarely", "be aware of"], ["〜のは…からだ"]), "What makes O C is that 〜＝O を C にするのは〜だ", [
        ["骨組み", "{{What makes such misunderstandings hard to correct}} が主語、{{is that …}} が補語。"],
        ["訳し方", "「〜を難しくしているのは…ということだ」→「〜が難しいのは…からだ」と自然に。"],
      ]),
    WA("u", 3, "ウ", "自分とは異なる型をもつ人に出会ってはじめて、私たちはそもそも決まりがあったのだと気づくのだ。",
      waRubric(["It is only when … that", "強調構文"], ["whose patterns", "at all"], ["〜してはじめて"]), "It is only when 〜 that …＝〜してはじめて…", [
        ["強調構文", "{{It is only when … that we realize …}}：when 節を強調。「〜したときにだけ」→「{{〜してはじめて}}」。"],
        ["語句", "{{there were rules at all}}＝そもそも決まりがあった（at all は強め）。"],
      ]),
    WA("e", 2, "エ", "今度会話が急に静まりかえったら、その間を埋めたいという衝動をこらえて、相手が何を言うか見てみるのもよいかもしれない。",
      waRubric(["The next time S V", "it might be worth -ing"], ["resist the urge", "fill the gap"], ["〜するのもよいかもしれない"]), "the next time S V＝今度 S が V するときは", [
        ["接続", "{{The next time}} a conversation … goes quiet＝今度会話が静かになったら。"],
        ["述部", "{{it might be worth resisting … and seeing …}}：resisting と seeing が並列。"],
      ]),
  ], "writing", 3),
  sec(8, "wa-confidence", U.chobun, "下線部和訳（自信と専門知識）", WA_LEAD, [
    en("Confidence and Knowledge", `We tend to trust people who speak with confidence. A doctor who gives a clear diagnosis seems more competent than one who admits uncertainty, even when the second doctor is being more honest. {{ア　Yet in many fields, the people who know the most are often the most aware of how much remains unknown.}} Beginners, by contrast, may not know enough to recognize the limits of their knowledge.

{{イ　This creates an awkward situation in which the voices we find most convincing are not necessarily the ones most worth listening to.}} {{ウ　It would be a mistake, however, to conclude that confidence is always a warning sign.}} An experienced pilot who calmly takes control in an emergency is confident because of long training, not in spite of it. The real question is whether a person's confidence is supported by evidence and experience. {{エ　Learning to ask that question, rather than simply responding to how certain someone sounds, is an important part of thinking for ourselves.}}`),
  ], [
    WA("a", 2, "ア", "しかし多くの分野で、最もよく知っている人ほど、まだどれほど多くのことがわかっていないかを最もよく自覚していることが多い。",
      waRubric(["the people who know the most", "how much remains unknown"], ["be aware of", "fields"], ["〜ほど", "自覚"]), "how much remains unknown＝どれほど多くが未知のままか", [
        ["主語", "{{the people who know the most}}＝最もよく知っている人。"],
        ["目的語", "{{how much remains unknown}}：間接疑問。remain＋形容詞＝〜のままである。"],
      ]),
    WA("i", 3, "イ", "このため、私たちが最も説得力があると感じる声が、必ずしも最も耳を傾ける価値のある声ではないという、困った状況が生まれる。",
      waRubric(["in which …", "find O C"], ["not necessarily", "worth listening to"], ["必ずしも〜ない"]), "not necessarily＝必ずしも〜ない（部分否定）", [
        ["関係詞", "{{in which}} 以下が situation を説明。"],
        ["中身", "the voices {{we find most convincing}}（最も説得力があると感じる声）は {{not necessarily}} the ones {{most worth listening to}}。"],
      ]),
    WA("u", 2, "ウ", "しかし、自信は常に危険の合図だと結論づけるのはまちがいだろう。",
      waRubric(["It would be … to conclude", "形式主語"], ["warning sign", "always"], ["〜のはまちがいだろう"]), "It は形式主語、真主語は to conclude 以下", [
        ["骨組み", "{{It would be a mistake … to conclude that …}}：It＝to 以下。"],
        ["部分否定に注意", "{{always}} は that 節の中。「常に危険の合図だ」と結論づけること、がまちがい。"],
      ]),
    WA("e", 3, "エ", "ある人がどれほど確信ありげに聞こえるかにただ反応するのではなく、その問いを立てられるようになることが、自分の頭で考えることの重要な一部である。",
      waRubric(["Learning to … is", "rather than"], ["how certain someone sounds", "think for ourselves"], ["〜のではなく"]), "動名詞の主語が長い。動詞 is を見つける", [
        ["主語", "{{Learning to ask that question}}（その問いを立てられるようになること）が主語、動詞は {{is}}。"],
        ["挿入", "{{rather than simply responding to how certain someone sounds}}＝どれほど確信ありげに聞こえるかにただ反応するのではなく。"],
      ]),
  ], "writing", 3),
  sec(8, "wa-photographs", U.chobun, "下線部和訳（古い写真と笑顔）", WA_LEAD, [
    en("Why No One Smiled", `When we look at photographs from a hundred years ago, people rarely seem to be smiling. It is tempting to conclude that life was harder then, or that people were simply more serious. {{ア　But the explanation probably has less to do with how people felt than with what they thought a photograph was for.}} In the early days, having one's picture taken was a rare and expensive event, and a portrait was expected to show a person's character with dignity. {{イ　A broad smile, which lasts only a moment, seemed out of place in an image meant to last for generations.}}

{{ウ　As cameras became cheaper and photographs more common, they came to be used to record moments rather than to preserve a fixed image of a person.}} Smiling became the natural expression for a happy occasion. {{エ　This reminds us that even something as apparently simple as a facial expression in a picture is shaped by the customs of its time.}}`),
  ], [
    WA("a", 3, "ア", "しかしその理由はおそらく、人々がどう感じていたかよりも、写真が何のためのものだと考えていたかに関係している。",
      waRubric(["has less to do with A than with B"], ["what … was for", "how people felt"], ["AよりもBに関係"]), "less to do with A than with B＝AよりBに関係", [
        ["構文", "{{has less to do with A than with B}}：A より B と関係が深い。"],
        ["B", "{{what they thought a photograph was for}}＝写真は何のためのものだと考えていたか（they thought は挿入）。"],
      ]),
    WA("i", 2, "イ", "満面の笑みはほんの一瞬しか続かないので、何世代にもわたって残ることを意図した画像にはふさわしくないように思われた。",
      waRubric(["which lasts only a moment", "an image meant to"], ["out of place", "for generations"], ["ふさわしくない"]), "非制限の which は「〜なので」と訳すと自然", [
        ["挿入", "{{, which lasts only a moment,}}：満面の笑みは一瞬しか続かない（理由のように訳す）。"],
        ["語句", "{{out of place}}＝場違いな、{{meant to last}}＝残ることを意図された。"],
      ]),
    WA("u", 2, "ウ", "カメラが安くなり写真がよりありふれたものになるにつれて、写真は人の決まった姿を残すためではなく、瞬間を記録するために使われるようになった。",
      waRubric(["As …", "came to be used", "rather than"], ["preserve", "record moments"], ["〜につれて", "〜ようになった"]), "photographs のあとに became が省略されている", [
        ["省略", "As cameras became cheaper and photographs {{(became)}} more common。"],
        ["述部", "{{came to be used to record … rather than to preserve …}}＝〜ではなく…するために使われるようになった。"],
      ]),
    WA("e", 3, "エ", "このことは、写真の中の表情のように一見単純なものでさえ、その時代の習慣によって形づくられていることを私たちに思い出させる。",
      waRubric(["reminds us that", "even something as … as"], ["apparently", "be shaped by", "customs"], ["一見", "さえ"]), "something as 形容詞 as A＝A のように〜なもの", [
        ["骨組み", "{{This reminds us that …}}＝このことは…を思い出させる。"],
        ["主語", "{{even something as apparently simple as a facial expression}}＝表情のように一見単純なものでさえ。"],
      ]),
  ], "writing", 3),
];

// =====================================================================
// 第5問　長文読解（物語・エッセイ）
// =====================================================================

const LONG_LEAD = "次の英文を読み、問いに答えよ。";

const P8: ExamPoolSection[] = [
  sec(9, "long-tuner", U.chobun, "長文読解（ピアノの調律師）", LONG_LEAD, [
    en("The Piano Tuner", `The piano in our living room had belonged to my great-aunt, and by the time it came to us it was badly out of tune. Nobody in the family could play it well, but my mother insisted that a piano should be cared for whether or not anyone played it. So, twice a year, Mr. Abel came to tune it.

He was a small, quiet man of about seventy, who always arrived exactly on time and always refused a cup of tea until the work was finished. I was eleven the first time I watched him. I had expected him to play beautiful music, but instead he struck the same note again and again, turning a small metal key with tiny movements of his wrist. It was, to be honest, the most boring thing I had ever seen. ［X］, I could not stop watching.

"What are you listening for?" I finally asked.

He did not look up. "For the moment two notes stop arguing," he said. He played two keys together, and I heard a faint wobble in the sound, like a voice that cannot decide whether to laugh or cry. He turned the key a little, and the wobble slowed, then disappeared. "There," he said. "Now they agree."

After that, I made sure to be home whenever he came. He taught me to hear the wobble myself, and then to notice how it changed when he adjusted the string. I was surprised to find how much there was to hear in a single note once I knew how to listen. {{(A) My ears, it seemed, had been working all along; I had simply never asked them to do anything.}}

One spring, when I was fifteen, Mr. Abel was late. When he finally arrived, he moved more slowly than before, and I noticed that he held the edge of the piano as he sat down. He worked in silence for a long time. Then he did something he had never done: he asked me to sit beside him.

"Tell me when they agree," he said, and handed me the key.

My hand was shaking. I struck the two notes and listened. The wobble was there, fast and nervous. I turned the key the way I had seen him do a hundred times, but too far, and the sound grew worse. Mr. Abel said nothing. I tried again, more gently this time, and slowly the wobble ［Y］ until the two notes sounded like one.

"Good," he said simply. It was the only praise I ever received from him, and {{(B) I have treasured it more than any prize I have won since.}}

He came only once more after that. A few months later, my mother received a letter from his daughter explaining that he had retired because of his health. Inside the envelope was a small metal key, wrapped in paper, with a note in shaky handwriting: "For the one who knows how to listen."

I did not become a piano tuner. I work as a nurse now, and most of my days are spent in busy hospital wards where there is little time for anything as slow as tuning a piano. But I often think of Mr. Abel when I sit with a patient who is struggling to explain what is wrong. The most important information, I have learned, is rarely in the first thing someone says. You have to wait, and pay attention, and listen for the small change ［並べかえ：that / tells / you / something / is / wrong］.`),
  ], [
    C("blank-x", 2, U.setsuzoku, "空所［X］に入る最も適切なものを選べ。", ["Even so", "As a result", "For example", "In other words"], 0, [
      "正解。「いちばん退屈だった。それでも目が離せなかった」という逆接。",
      "退屈だった結果として目が離せない、では因果が逆。",
      "前の文の例ではない。",
      "前の文の言いかえではなく、反対の内容。",
    ], "前後が食いちがう内容なら逆接", [
      ["前後", "前：{{the most boring thing}}。後：{{could not stop watching}}。"],
      ["つなぎ", "逆接 → {{Even so}}（それでも）。"],
    ], K),
    C("blank-y", 1, U.vocab, "空所［Y］に入る最も適切な語を選べ。", ["faded", "grew", "returned", "doubled"], 0, [
      "正解。ゆれがだんだん弱まり、2つの音が1つに聞こえるようになった。",
      "大きくなったのなら、音が1つにはならない。",
      "ゆれは消えていく途中で、戻ってはいない。",
      "倍になったのなら、音は合わない。",
    ], "until 以下の結果から逆算する", [
      ["結果", "{{until the two notes sounded like one}}（2つの音が1つに聞こえるまで）。"],
      ["語", "ゆれは{{弱まって消えた}} → faded。"],
    ], K),
    C("arguing", 2, U.chobun, "Mr. Abel の言う \"the moment two notes stop arguing\" とは、どのような時か。", [
      "2つの音のゆれが消え、音がそろった時",
      "2つの鍵盤を同時に強くたたいた時",
      "ピアノの持ち主が演奏をやめた時",
      "2つの音の高さが大きくちがって聞こえた時",
    ], 0, [
      "正解。ゆれ（wobble）がおさまり消えると \"Now they agree\" と言っている。arguing（言い争う）はゆれの比喩。",
      "同時に弾くのはゆれを聞くための手段で、言い争いがやむ時ではない。",
      "持ち主の演奏の話ではない。",
      "音がちがって聞こえるのは「言い争っている」状態。",
    ], "比喩は直後の具体的な描写で確かめる", [
      ["描写", "the wobble slowed, then {{disappeared}}. \"Now they {{agree}}.\""],
      ["比喩", "arguing＝{{ゆれがある}}状態、agree＝ゆれが消えて{{そろった}}状態。"],
    ]),
    WB("translate-a", 3, U.wabun, "下線部(A)を和訳せよ。", "どうやら私の耳はずっと働いていたようだ。ただ私が耳に何かをするよう求めたことが一度もなかっただけなのだ。",
      [
        ["it seemed を挿入として「どうやら〜らしい」と訳している", 2, ["どうやら", "ようだ"]],
        ["had been working all along（ずっと働いていた）", 2, ["ずっと"]],
        ["simply never asked them to do anything（何かをするよう求めなかっただけ）", 2, ["だけ", "求めた"]],
      ],
      "挿入の it seemed は「どうやら〜らしい」", [
        ["挿入", "{{My ears, it seemed, had been working}}：it seemed を外すと文の骨組みが見える。"],
        ["後半", "{{simply}}＝ただ〜だけ。ask O to do＝O に〜するよう頼む。them＝my ears。"],
      ], 360),
    C("late", 2, U.chobun, "15歳の春の訪問で Mr. Abel が語り手を隣に座らせたことから、どのようなことが推測できるか。", [
      "体の衰えを感じ、語り手に自分の技を試させてみようと思った。",
      "語り手が調律の邪魔をするので、近くで見張ろうとした。",
      "道具をなくしたので、語り手に探してもらいたかった。",
      "語り手にピアノの演奏を教えようと思った。",
    ], 0, [
      "正解。遅れて来て動きが遅く、ピアノのふちにつかまって座る＝衰え。その日に初めて鍵（道具）を渡して \"Tell me when they agree\"。",
      "邪魔をしていた描写はない。むしろ聞き方を教えていた。",
      "鍵は自分の手から渡している。なくしていない。",
      "演奏ではなく調律をさせている。",
    ], "描写の積み重ね（遅刻・動き・手すり）から推測", [
      ["描写", "{{late}}、{{moved more slowly}}、{{held the edge of the piano}}：体の衰え。"],
      ["行動", "初めて{{隣に座らせ}}、鍵を渡して音をそろえさせた。"],
    ]),
    C("praise", 2, U.chobun, "下線部(B)のように語り手がその言葉を大切にしてきたのはなぜか。", [
      "めったにほめない Mr. Abel からのただ一度のほめ言葉で、聞く力を身につけたと認められたから",
      "その言葉のおかげで、調律の賞を取ることができたから",
      "Mr. Abel が、語り手は調律師になるべきだと言ったから",
      "その日の調律で、ピアノが初めて完全に直ったから",
    ], 0, [
      "正解。It was the only praise I ever received from him。自分でゆれを消した直後の \"Good\"。",
      "賞を取った話はない。any prize I have won since はほかの賞と比べているだけ。",
      "調律師になるよう言われていない。語り手は看護師になった。",
      "ピアノが初めて直った、という話はない。",
    ], "the only＝ただ1つの", [
      ["根拠", "{{the only praise I ever received from him}}。"],
      ["場面", "自分で{{音をそろえられた}}直後のことば。"],
    ]),
    C("key", 2, U.chobun, "手紙に同封された鍵とメモは、何を伝えていると考えられるか。", [
      "語り手には聞く力があると Mr. Abel が認め、自分の道具を託したこと",
      "語り手に、ピアノの修理代を払ってほしいということ",
      "Mr. Abel が、語り手の家のピアノをもう調律しないこと",
      "語り手が、鍵を返しに来るべきだということ",
    ], 0, [
      "正解。\"For the one who knows how to listen\"＝聞き方を知っている人へ。調律の鍵を託した。",
      "お金の話はない。",
      "引退は娘の手紙でわかったことで、鍵とメモが伝えている中心ではない。",
      "返すようにとは書いていない。",
    ], "メモの the one は語り手を指す", [
      ["メモ", "{{For the one who knows how to listen}}。"],
      ["意味", "教えてきた{{聞く力}}を認め、{{道具を託す}}。"],
    ]),
    C("nurse", 3, U.chobun, "本文の内容に合うものを選べ。", [
      "語り手は、Mr. Abel から学んだ聞き方を、看護師として患者に接するときに生かしている。",
      "語り手は Mr. Abel にあこがれ、調律師として働いている。",
      "Mr. Abel は、仕事の前にいつもお茶を飲んでいた。",
      "語り手は、最初に調律を見たとき、美しい音楽が聞けて感動した。",
    ], 0, [
      "正解。患者が説明に苦しむとき Mr. Abel を思い出し、待って注意深く聞く。",
      "I did not become a piano tuner。看護師。",
      "仕事が終わるまでお茶を断っていた（refused a cup of tea until the work was finished）。",
      "音楽を期待したが、同じ音をくり返すだけで退屈だった。",
    ], "最後の段落が物語の主題につながる", [
      ["照合", "{{I often think of Mr. Abel when I sit with a patient}}。"],
      ["逆の選択肢", "{{refused … until the work was finished}}・{{boring}} と食いちがうものを外す。"],
    ]),
    O("order", 2, U.chobun, "［並べかえ］の語を、意味が通るように正しく並べかえよ。", ["that", "tells", "you", "something", "is", "wrong"], "tell 人 that 節の that は省略されている", [
      ["関係詞", "the small change {{that tells you}} 〜（〜を教えてくれる小さな変化）。"],
      ["目的語", "tell you {{something is wrong}}（何かがおかしいと）。"],
    ]),
  ], "reading", 6),
  sec(9, "long-wrong", U.chobun, "長文読解（まちがえることを学ぶ）", LONG_LEAD, [
    en("Points for Being Wrong", `In my second year of high school, I had a science teacher named Ms. Okada who began each term with a strange announcement. "In this class," she would say, "you will get extra points for being wrong." We laughed, assuming she was joking. She was not.

Her rule worked like this. Whenever we did an experiment, we had to write down our prediction before we began. If the result turned out to be different from what we had predicted, we could earn extra points by explaining, in writing, why we had expected something else and what the result had taught us. A correct prediction earned nothing extra. "If you were right," she said, "you have only confirmed what you already believed. If you were wrong, you have learned something."

At first, most of us tried to ［X］ the system. Some students deliberately made silly predictions so that they could collect the extra points. Ms. Okada was not fooled. A prediction, she insisted, had to be supported by a reason, and the explanation afterwards had to show exactly where that reason had gone wrong. {{(A) Writing a convincing account of a mistake you had not really made turned out to be harder than simply making an honest guess.}} Within a few weeks, the silly predictions stopped.

What happened instead surprised me. I began to look forward to being wrong. When I dropped two balls of different weights and saw them hit the floor at almost the same moment, my first feeling was not embarrassment but curiosity. Why had I been so sure that the heavier ball would fall faster? Where had that belief come from? Answering those questions taught me more than any correct prediction ever had.

I did not fully appreciate Ms. Okada's method until years later, when I started my first job. My manager was a talented woman, but she could not bear to admit an error. When a project she had planned began to fail, she found reasons to blame the market, the weather, or her colleagues, and the same mistakes were repeated the following year. {{(B) I remember thinking that she would have done badly in Ms. Okada's class.}}

It is easy to say that mistakes are valuable; almost everyone agrees with the idea in principle. The difficulty is that most schools and workplaces reward people for being right and quietly punish them for being wrong. Under such conditions, the sensible thing to do is to hide one's errors, or to avoid situations in which one might make them. Ms. Okada understood that if she wanted us to learn from mistakes, she had to change ［Y］ we were rewarded, not just tell us that mistakes were good.

I sometimes wonder whether her rule could work outside a classroom. Perhaps not exactly. But I have tried, in my own small team, to ask a simple question at the end of every project: "What did we expect that turned out not to be true?" The answers are rarely comfortable. They are, however, almost always useful, and over time they have made it easier for all of us to ［並べかえ：admit / that / we / were / wrong］.`),
  ], [
    C("blank-x", 2, U.vocab, "空所［X］に入る最も適切な語を選べ。", ["beat", "follow", "design", "ignore"], 0, [
      "正解。beat the system＝制度の裏をかく。直後の「点を集めるためにわざとおかしな予想をした」がその中身。",
      "ふつうに従ったのなら、わざとおかしな予想はしない。",
      "生徒が制度を作ったのではない。",
      "無視したのなら、点を集めようとはしない。",
    ], "直後の具体例が空所の中身", [
      ["直後", "{{deliberately made silly predictions}} so that they could collect the extra points。"],
      ["語", "制度の{{裏をかく}} → beat the system。"],
    ], K),
    C("blank-y", 2, U.kandai, "空所［Y］に入る最も適切な語を選べ。", ["how", "what", "whether", "which"], 0, [
      "正解。change how we were rewarded＝評価のされ方を変える。we were rewarded は完全な文なので how。",
      "what のあとは名詞が1つ欠けた形が来る。we were rewarded は欠けていない。",
      "「評価されるかどうかを変える」では意味が通らない。",
      "which のあとに名詞がなく、意味も通らない。",
    ], "後ろが完全な文なら how（関係副詞・疑問副詞）", [
      ["後ろの形", "{{we were rewarded}}：主語・動詞がそろい、欠けている名詞がない。"],
      ["意味", "{{how}} we were rewarded＝どのように評価されるか（評価のしかた）。"],
    ], K),
    C("rule", 1, U.chobun, "Ms. Okada の決まりで、追加の点がもらえるのはどのような場合か。", [
      "実験の結果が予想とちがい、なぜそう予想したか・何を学んだかを書いて説明した場合",
      "実験の結果を正しく予想した場合",
      "実験の前に予想を書かなかった場合",
      "実験をくり返して、同じ結果を出した場合",
    ], 0, [
      "正解。If the result turned out to be different … we could earn extra points by explaining, in writing …。",
      "A correct prediction earned nothing extra。",
      "予想は実験の前に必ず書く（had to write down）。",
      "くり返しの話はない。",
    ], "条件 If と方法 by -ing を両方読む", [
      ["条件", "{{If the result turned out to be different}} from what we had predicted。"],
      ["方法", "{{by explaining, in writing}}, why … and what …。"],
    ], K),
    C("why-right", 2, U.chobun, "Ms. Okada が、正しい予想に追加の点を与えなかった理由として本文に合うものを選べ。", [
      "正しい予想は、すでに信じていたことを確かめただけだから",
      "正しい予想は、たいてい他人の答えを写したものだから",
      "正しい予想をした生徒は、すでに十分な点を持っているから",
      "正しい予想は、実験の結果とは関係がないから",
    ], 0, [
      "正解。\"If you were right, you have only confirmed what you already believed.\"",
      "写したという話はない。",
      "点の多さの話はない。",
      "予想は結果と比べるもので、関係がないとは言っていない。",
    ], "only confirmed＝確かめただけ", [
      ["根拠", "you have {{only confirmed what you already believed}}。"],
      ["対比", "If you were wrong, you have {{learned something}}。"],
    ]),
    WB("translate-a", 3, U.wabun, "下線部(A)を和訳せよ。", "実際にはしていないまちがいについて説得力のある説明を書くことは、正直に予想を立てるだけのことよりも難しいとわかった。",
      [
        ["主語 Writing … made を正しくとらえている", 2, ["説明を書くこと"]],
        ["a mistake you had not really made（実際にはしていないまちがい）", 2, ["実際にはしていない"]],
        ["turned out to be harder than（〜より難しいとわかった）", 2, ["とわかった", "より難しい"]],
      ],
      "長い動名詞の主語のあとの動詞 turned out を見つける", [
        ["主語", "{{Writing a convincing account of a mistake you had not really made}}：you had not really made は mistake を修飾。"],
        ["述部", "{{turned out to be harder than simply making an honest guess}}＝正直に予想するだけより難しいとわかった。"],
      ], 360),
    C("balls", 2, U.chobun, "重さのちがう2つの球を落とした場面で、語り手が最初に感じたのはどのような気持ちか。", [
      "なぜ自分は重い球が速く落ちると思いこんでいたのかという好奇心",
      "予想をまちがえたことへの恥ずかしさ",
      "予想どおりの結果が出たことへの満足",
      "実験がうまくいかなかったことへのいらだち",
    ], 0, [
      "正解。my first feeling was not embarrassment but curiosity。",
      "not embarrassment（恥ずかしさではない）と否定している。",
      "重い球が速く落ちると予想していたので、予想どおりではない。",
      "いらだちの話はない。",
    ], "not A but B の B が答え", [
      ["根拠", "{{not embarrassment but curiosity}}。"],
      ["中身", "{{Why had I been so sure}} that the heavier ball would fall faster?"],
    ]),
    C("manager", 2, U.chobun, "下線部(B)で、語り手が上司について「Ms. Okada の授業ではうまくいかなかっただろう」と思ったのはなぜか。", [
      "上司は自分のまちがいを認めることができず、そこから学ばなかったから",
      "上司は科学の知識がまったくなかったから",
      "上司は計画を立てるのが苦手だったから",
      "上司は同僚に厳しすぎたから",
    ], 0, [
      "正解。could not bear to admit an error、ほかのせいにして同じまちがいをくり返した。まちがいを説明して学ぶ授業とは正反対。",
      "科学の知識の話はない。",
      "talented woman と言っており、計画が苦手とは言っていない。",
      "同僚のせいにしたが、厳しすぎたという話ではない。",
    ], "Ms. Okada の授業の要点と上司を対比する", [
      ["上司", "{{could not bear to admit an error}}、ほかのせいにした → {{同じまちがい}}をくり返した。"],
      ["授業", "まちがいの{{理由を説明して学ぶ}}ことに点が出る。"],
    ]),
    C("title", 3, U.chobun, "本文の主旨として最も適切なものを選べ。", [
      "まちがいから学ぶには、まちがいを認めて説明することが報われるしくみが必要だ。",
      "科学の授業では、正しい予想をすることが何より大切だ。",
      "学校の教え方は、会社ではまったく役に立たない。",
      "人は、まちがいを隠すほうが結局は成功する。",
    ], 0, [
      "正解。she had to change how we were rewarded, not just tell us that mistakes were good、最後の段落のチームでの試み。",
      "正しい予想には追加の点がない、という話。逆。",
      "筆者は授業の方法を自分のチームで試している。",
      "隠すのは「今の評価のしかたでは合理的」というだけで、筆者の主張ではない。",
    ], "筆者の主張は「報い方を変える」", [
      ["主張", "she had to {{change how we were rewarded}}, not just tell us that mistakes were good。"],
      ["発展", "自分のチームでも「{{予想と違ったことは何か}}」と問う。"],
    ]),
    O("order", 2, U.chobun, "［並べかえ］の語を、意味が通るように正しく並べかえよ。", ["admit", "that", "we", "were", "wrong"], "make it easier for 人 to do", [
      ["形", "made it easier for all of us {{to admit}} 〜：to のあとに動詞の原形。"],
      ["目的語", "admit {{that we were wrong}}（自分たちがまちがっていたと認める）。"],
    ]),
  ], "reading", 6),
  sec(9, "long-train", U.chobun, "長文読解（まちがえた列車）", LONG_LEAD, [
    en("The Wrong Train", `I was twenty and traveling alone abroad for the first time when I got on the wrong train. I had studied the timetable carefully the night before, and I was so confident that I did not bother to check the sign on the platform. It was only when the train had left the city far behind, and the fields outside the window had turned into steep, wooded hills, that I began to suspect something was wrong.

The woman sitting opposite me was knitting something long and blue. When I showed her my ticket, she studied it for a moment, then shook her head and laughed — not unkindly, but in the way people laugh at a child who has put his shoes on the wrong feet. She spoke almost no English, and I spoke only a few words of her language, but with the help of my map and a great deal of pointing, she made me understand that the next stop was more than an hour away and that there would be no train back until the following morning.

I remember the panic very clearly. I had a reservation at a hostel in the city, a plan for the next day, and very little money. Traveling alone was supposed to make me feel free; ［X］, I felt foolish and afraid.

When the train finally stopped at a small station in a valley, the woman stood up, put away her knitting, and gestured for me to follow her. I hesitated. Everything I had been told about traveling safely warned me against going off with a stranger. But the station was empty, it was getting dark, and there was nowhere else to go.

She led me to a house at the edge of the village, where her husband was cooking dinner. He did not seem at all surprised to see a young foreigner standing in his kitchen, and {{(A) I later learned that this was not the first time his wife had brought home a lost traveler from the train.}} They gave me soup, bread and a bed in a room full of old books, and the next morning the husband drove me to the station and waited on the platform until my train arrived.

I tried to give them money, but they refused it so ［Y］ that I felt embarrassed for having offered. The woman pressed something into my hands as I got on the train. It was the blue scarf she had been knitting, now finished.

In the years since, I have been to many places that were far more famous than that small valley. I have seen great cathedrals and crowded markets, and I have, I hope, become a more careful reader of train timetables. But when people ask me about the best journey I ever made, I always tell them about the wrong train. {{(B) The places I planned to visit taught me about the world; the place I never meant to see taught me about people.}}

I still have the scarf. It is too warm for most of the year where I live now, but every winter, when I wrap it around my neck, I remember that sometimes the most valuable things in life ［並べかえ：are / the / ones / we / never / planned / for］.`),
  ], [
    C("blank-x", 1, U.setsuzoku, "空所［X］に入る最も適切な語を選べ。", ["instead", "moreover", "therefore", "for example"], 0, [
      "正解。「自由を感じるはずだった。ところが代わりに、愚かで不安に感じた」。",
      "「さらに」では、反対の内容をつなげない。",
      "「だから」では、自由を感じるはず→不安、の因果にならない。",
      "前の文の例ではない。",
    ], "was supposed to（〜のはずだった）の後は期待と逆", [
      ["前後", "前：{{feel free}} のはずだった。後：{{foolish and afraid}}。"],
      ["語", "期待の代わりに → {{instead}}。"],
    ], K),
    C("blank-y", 2, U.vocab, "空所［Y］に入る最も適切な語を選べ。", ["firmly", "rarely", "slightly", "lately"], 0, [
      "正解。「とてもきっぱり断られたので、申し出たことが恥ずかしくなった」。",
      "rarely（めったに〜ない）では so … that の意味が通らない。",
      "少しだけ断った、では恥ずかしくなる理由にならない。",
      "lately（最近）は時を表し、意味が通らない。",
    ], "so 副詞 that 〜：that 以下の結果に合う程度", [
      ["結果", "{{I felt embarrassed for having offered}}（申し出たことが恥ずかしかった）。"],
      ["語", "それほど{{きっぱり}}断った → firmly。"],
    ], K),
    C("notice", 1, U.chobun, "語り手が、列車をまちがえたのではないかと思いはじめたのはなぜか。", [
      "窓の外の景色が、畑から木の茂った険しい丘に変わったから",
      "車掌に切符を見せて、まちがいを指摘されたから",
      "ホームの表示を確かめたら、行き先がちがっていたから",
      "向かいの女性が、英語で教えてくれたから",
    ], 0, [
      "正解。the fields outside the window had turned into steep, wooded hills, that I began to suspect …。",
      "車掌は出てこない。",
      "ホームの表示を確かめなかった（did not bother to check）。",
      "女性はほとんど英語を話せなかった。しかも疑いはじめたのは女性に切符を見せる前。",
    ], "It was only when … that ～＝…してはじめて～", [
      ["強調構文", "{{It was only when}} the train had left the city … {{that}} I began to suspect。"],
      ["わな", "{{did not bother to check the sign}}：表示は見ていない。"],
    ]),
    C("communicate", 2, U.chobun, "向かいの女性は、どのようにして語り手に状況を伝えたか。", [
      "地図を使い、何度も指さしをして伝えた。",
      "流ちょうな英語で説明した。",
      "紙に絵を描いて説明した。",
      "近くの乗客に通訳を頼んだ。",
    ], 0, [
      "正解。with the help of my map and a great deal of pointing。",
      "She spoke almost no English。",
      "絵を描いた話はない。",
      "通訳の話はない。",
    ], "with the help of 〜＝〜の助けを借りて", [
      ["根拠", "{{with the help of my map and a great deal of pointing}}。"],
    ], K),
    C("hesitate", 2, U.chobun, "女性について来るよう合図されたとき、語り手がためらったのはなぜか。", [
      "知らない人について行くなと、安全な旅について聞かされていたから",
      "ホステルの予約を取り消したくなかったから",
      "女性の言葉がまったく理解できなかったから",
      "駅で次の列車を待つつもりだったから",
    ], 0, [
      "正解。Everything I had been told about traveling safely warned me against going off with a stranger。",
      "予約の心配はパニックの理由で、ためらいの理由としては書かれていない。",
      "地図と指さしで状況は理解できていた。",
      "翌朝まで列車はないとわかっていた。",
    ], "ためらいの直後の文が理由", [
      ["根拠", "{{warned me against going off with a stranger}}。"],
      ["その後", "But … {{there was nowhere else to go}}：それでもついて行った。"],
    ]),
    WB("translate-a", 2, U.wabun, "下線部(A)を和訳せよ。", "後になって私は、彼の妻が迷った旅行者を列車から家に連れて帰ってきたのはこれが初めてではないと知った。",
      [
        ["I later learned that（後になって〜と知った）", 2, ["後になって", "知った"]],
        ["this was not the first time S had done（S が〜したのは初めてではない）", 3, ["初めてではない"]],
        ["brought home a lost traveler（迷った旅行者を家に連れて帰る）", 1, ["迷った旅行者"]],
      ],
      "the first time S had done＝S が〜した初めての時", [
        ["骨組み", "{{I later learned that …}}：that 節が learned の目的語。"],
        ["構文", "{{this was not the first time his wife had brought home …}}＝妻が〜を連れ帰ったのはこれが初めてではない。"],
      ], 300),
    C("meaning-b", 3, U.chobun, "下線部(B)の内容として最も適切なものを選べ。", [
      "計画して訪れた名所は世界について教えてくれたが、思いがけず訪れた谷は人の優しさについて教えてくれた。",
      "計画どおりの旅のほうが、思いがけない旅よりも多くのことを教えてくれた。",
      "有名な場所を訪れたことで、人とのつきあい方を学んだ。",
      "列車をまちがえたことで、地図の読み方を学んだ。",
    ], 0, [
      "正解。セミコロンの前後で the places I planned to visit／the place I never meant to see、the world／people を対比している。",
      "best journey はまちがえた列車の旅。逆。",
      "人について教えてくれたのは、思いがけない谷のほう。",
      "地図の読み方の話ではない（時刻表を注意深く読むようになった、とはある）。",
    ], "セミコロンの前後の対比を読む", [
      ["対比", "{{The places I planned to visit}} → the world ／ {{the place I never meant to see}} → people。"],
      ["中身", "見知らぬ夫婦の{{もてなし}}が「人について」の中身。"],
    ]),
    C("content", 2, U.chobun, "本文の内容に合うものを選べ。", [
      "女性は、列車の中で編んでいた青いスカーフを、別れぎわに語り手に手渡した。",
      "夫婦は、泊めたお礼としてお金を受け取った。",
      "夫は、語り手を駅まで送ると、すぐに帰っていった。",
      "語り手は、今も一年じゅうそのスカーフを身につけている。",
    ], 0, [
      "正解。It was the blue scarf she had been knitting, now finished。",
      "お金はきっぱり断られた。",
      "列車が来るまでホームで待っていた（waited on the platform until my train arrived）。",
      "暑すぎて一年の大半は使えず、冬に巻く。",
    ], "細部は本文の該当箇所で一つずつ確かめる", [
      ["照合", "{{the blue scarf she had been knitting, now finished}}。"],
      ["逆の選択肢", "{{refused it}}・{{waited on the platform}}・{{too warm for most of the year}}。"],
    ]),
    O("order", 2, U.chobun, "［並べかえ］の語を、意味が通るように正しく並べかえよ。", ["are", "the", "ones", "we", "never", "planned", "for"], "目的格の関係代名詞の省略＋前置詞が文末に", [
      ["骨組み", "the most valuable things in life {{are the ones}}（もの＝things）。"],
      ["関係詞節", "the ones {{(that) we never planned for}}：plan for 〜 の for が文末に残る。"],
    ]),
  ], "reading", 6),
];

// =====================================================================

export const U_TODAI_EIGO: UnivExam = {
  key: "todai-eigo",
  univ: "東京大学",
  kamoku: "英語",
  tier: "国公立",
  order: 109,
  basis: "文科・理科共通の2次試験（前期日程）の傾向を参考",
  format: "大問5題・120分・120点。要約・文補充、自由英作文と和文英訳、講義と会話のリスニング、誤り指摘と和訳、物語の長文。",
  minutes: 120,
  groups: ["語彙", "文法", "技能"],
  sections: [
    { title: "第1問(A)　英文の要約", lead: SUM_LEAD, count: [1, 1], mix: [0, 0.4, 0.6], points: 10, prefer: "material", poolTag: "todai-eigo:1" },
    { title: "第1問(B)　文・語句の補充と並べかえ", lead: GAP_LEAD, count: [5, 5], mix: [0, 0.4, 0.6], points: 14, prefer: "material", poolTag: "todai-eigo:2" },
    { title: "第2問(A)　自由英作文", lead: ES_LEAD, count: [1, 1], mix: [0, 0.4, 0.6], points: 14, prefer: "material", poolTag: "todai-eigo:3" },
    { title: "第2問(B)　和文英訳", lead: TR_LEAD, count: [1, 1], mix: [0, 0.4, 0.6], points: 10, prefer: "material", poolTag: "todai-eigo:4" },
    { title: "第3問(A)　リスニング（講義）", lead: LS_LEAD, count: [5, 5], mix: [0, 0.4, 0.6], points: 15, prefer: "material", poolTag: "todai-eigo:5" },
    { title: "第3問(B)　リスニング（会話・討論）", lead: LS_LEAD, count: [5, 5], mix: [0, 0.4, 0.6], points: 15, prefer: "material", poolTag: "todai-eigo:6" },
    { title: "第4問(A)　誤り指摘", lead: ERR_LEAD, count: [4, 4], mix: [0, 0.4, 0.6], points: 10, prefer: "material", poolTag: "todai-eigo:7" },
    { title: "第4問(B)　下線部和訳", lead: WA_LEAD, count: [3, 3], mix: [0, 0.4, 0.6], points: 14, prefer: "material", poolTag: "todai-eigo:8" },
    { title: "第5問　長文読解（物語・エッセイ）", lead: LONG_LEAD, count: [6, 6], mix: [0, 0.4, 0.6], points: 18, prefer: "material", poolTag: "todai-eigo:9" },
  ],
  pool: [...P1, ...P2, ...P3, ...P4, ...P5, ...P6, ...P7, ...P8],
};
