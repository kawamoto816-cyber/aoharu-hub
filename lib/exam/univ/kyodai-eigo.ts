import type { UnivExam } from "./types";
import type { ExamPoolSection } from "../pool/types";
import type { QuestionB, Skill, SolutionStep } from "@/lib/moshi/types";

// 京都大学型 英語（国公立・2次試験）。文学部など英語150点の学部の傾向を参考にした形式（英文・設問はすべて書き下ろし）。
//   120分・150点・大問4題。I・II は人文・科学の論説の長文読解（下線部和訳・内容説明が中心の記述。II は空所補充・内容一致も少し）、
//   III は日本文の下線部の和文英訳、IV は条件つきの英作文（自由英作文・会話文や文章の空所を英文で補う）。
//   英文の題材・登場する人物はすべて架空。実在の人物の発言は使っていない。
// 参考:
//   https://study-search.jp/columns/296 （京大英語：120分・150点・大問4題・配点 50/50/25/25・各大問の形式）
//   https://jyuke-labo.com/daigakujyukentaisaku/kyoutodaigaku/kamokubetsu/ （2026年度の大問構成・条件付き自由英作文・学部ごとの配点）
//   https://search.keinet.ne.jp/2489/topics/33 （京都大学の入試情報）

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
  return { id, type: "B", difficulty, points: 12, seconds: 150, skill, unit, prompt, answer: { kind: "choice", options, correct: 0, why }, point, steps: steps(st) };
}

/** 下線部和訳 */
const WY = (id: string, n: number, d: 2 | 3, unit: string, model: string, rb: Rb, point: string, st: St[]) =>
  W(id, d, unit, `下線部(${n})を和訳せよ。`, model, rb, point, st, undefined, 480);

/** 内容説明 (字数) */
const WS = (id: string, d: 2 | 3, prompt: string, max: number, model: string, rb: Rb, point: string, st: St[]) =>
  W(id, d, U.chobun, `${prompt}（${max}字以内）`, model, rb, point, st, { max, unit: "字" }, 420);

const READ_LEAD = "次の文章を読み、下の設問に答えよ。";

function reading(tag: number, id: string, title: string, ptitle: string, body: string, questions: QuestionB[]): ExamPoolSection {
  return {
    unit: U.chobun,
    tag: `kyodai-eigo:${tag}`,
    section: {
      id: `kyodai-en-${id}`,
      title,
      lead: READ_LEAD,
      style: "reading",
      examOnly: true,
      material: [{ kind: "passage", lang: "en", title: ptitle, body }],
      pick: 4,
      questions,
    },
  };
}

// =====================================================================
// 第1問　長文読解（人文・科学の論説。下線部和訳と内容説明）
// =====================================================================

const P1: ExamPoolSection[] = [
  reading(
    1,
    "forgetting",
    "忘れることの効用を論じた文章",
    "The Uses of Forgetting",
    `We usually speak of forgetting as a kind of failure. When a name slips away at the very moment we need it, or when we stand in a kitchen unable to recall why we walked in, we blame our memory as if it were a machine that had broken down. Behind this attitude lies a familiar picture of the mind as a storehouse: experiences are placed on its shelves, and a good memory is one that loses nothing. Yet a growing number of researchers suspect that this picture gets things almost exactly backwards. {{(1) Forgetting, they argue, is not simply what happens when remembering goes wrong, but an activity in its own right, one without which memory itself could hardly do its job.}}

To see why, imagine a person who could forget nothing. Every conversation, every street corner, every meal would remain as vivid as on the day it happened. At first this might seem like a gift. But such a person would find it remarkably hard to think. Asked where she had parked her car, she would be confronted not with one memory but with hundreds, each as clear as the others, and she would have no way of telling which belonged to today. Remembering well, in other words, depends less on keeping everything than on letting most things fade so that the few that matter can stand out.

There is a further point. When we recall an event, we rarely need its every detail; what we need is its general shape. A child who has been bitten by one dog learns to be careful around dogs in general, not merely around a brown dog with a torn ear that lived on a particular street. {{(2) It is precisely because the details of individual experiences grow faint over time that we are able to draw from them lessons that apply to situations we have never met before.}} A memory that preserved everything perfectly would bind us to the past instead of preparing us for the future.

None of this means that forgetting is always welcome. Diseases that destroy memory are among the cruelest a family can face, and anyone who has lost an important document knows how costly a lapse can be. The claim is not that more forgetting is always better, but that a healthy memory keeps a balance between holding on and letting go. Problems arise when that balance tips too far in either direction. People who cannot stop recalling a painful event, for example, may suffer as much from too much memory as others suffer from too little.

It is worth asking why the storehouse picture remains so persuasive. Part of the answer may lie in the technologies we use to record our lives. Libraries, photographs and now digital devices seem to promise that nothing need ever be lost, and it is tempting to judge our own minds by the standard of these machines. {{(3) But a device that stores ten thousand photographs does not know which of them are worth looking at again, whereas a person who has forgotten most of a holiday may still remember the one afternoon that changed her.}} The value of human memory lies not in its capacity but in its judgment, however imperfect.

Perhaps, then, we should be a little kinder to ourselves when a name escapes us. The lapse is annoying, but it is the price of a system that is constantly sorting, simplifying and discarding, so that what remains can guide us. A mind that never forgot would be less like a perfect library than like a room so crowded with furniture that no one could move through it.`,
    [
      WY("tr1", 1, 3, U.kankei, "忘れることは、記憶がうまくいかないときに起こることにすぎないのではなく、それ自体で一つの働きであり、それがなければ記憶そのものがほとんどその役目を果たせないようなものだ、と彼らは主張する。", [
        ["not simply A but B（AにすぎないのではなくB）を正しく訳す", 4, ["にすぎない", "ではなく"]],
        ["an activity in its own right を「それ自体で一つの働き」と訳す", 4, ["それ自体"]],
        ["one without which … を「それがなければ…ほとんど〜できない」と関係詞を正しく処理する", 4, ["なければ", "ほとんど"]],
      ], "前置詞＋関係代名詞 without which は「それなしでは」", [
        ["骨組み", "Forgetting is {{not simply A but B}}。they argue は挿入なので「〜と彼らは主張する」と文末で。"],
        ["同格の one", "one = {{an activity}}。one without which memory could hardly do its job：「それがなければ記憶がほとんど役目を果たせない働き」。"],
      ]),
      WY("tr2", 2, 3, U.tokushu, "個々の経験の細部が時とともに薄れていくからこそ、私たちはそうした経験から、これまで出会ったことのない状況にもあてはまる教訓を引き出すことができるのである。", [
        ["It is precisely because … that ～ を強調構文として「…からこそ～」と訳す", 5, ["からこそ"]],
        ["grow faint over time を「時とともに薄れる」と訳す", 3, ["薄れ"]],
        ["draw from them lessons that apply to … の目的語と関係詞節を正しくとる", 4, ["教訓", "あてはまる"]],
      ], "It is because … that ～ は強調構文", [
        ["構文を見ぬく", "{{It is precisely because S V that S V}}：because 節を強調した構文。「まさに…だからこそ～」。"],
        ["語順", "draw {{from them}} lessons：目的語 lessons が長いので後ろに回っている。them = individual experiences。"],
      ]),
      WY("tr3", 3, 3, U.chobun, "しかし、一万枚の写真を保存する機器は、そのうちどれが見返す価値があるのかを知らないのに対し、休暇のほとんどを忘れてしまった人でも、自分を変えたある一日の午後のことは覚えているかもしれない。", [
        ["which of them are worth looking at again を「どれが見返す価値があるか」と訳す", 4, ["価値"]],
        ["whereas を対比（〜のに対し）として訳す", 4, ["に対し", "一方"]],
        ["may still remember the one afternoon that changed her を正しく訳す", 4, ["変えた", "午後"]],
      ], "whereas は二つのものの対比", [
        ["前半", "a device … {{does not know which of them are worth looking at again}}：間接疑問。"],
        ["後半", "{{whereas}}（〜のに対し）。may still remember：「それでも覚えているかもしれない」。"],
      ]),
      WS("why-hard", 2, "第2段落で、何も忘れることのできない人は考えることがきわめて難しくなると述べられているが、それはなぜか。本文に即して説明せよ。", 80,
        "何も忘れない人は、たとえば車をとめた場所を思い出そうとしても、同じくらい鮮明な無数の記憶が一度に浮かび、どれが今日のものかを区別できないから。", [
          ["同じくらい鮮明な記憶が無数に浮かぶ", 6, ["鮮明", "無数"]],
          ["どれが今日（必要なもの）かを区別できない", 6, ["区別", "今日"]],
        ], "具体例（駐車場所）を一般化して答える", [
          ["根拠の箇所", "Asked where she had parked her car, she would be confronted {{not with one memory but with hundreds}}。"],
          ["まとめる", "記憶が{{どれも同じくらい鮮明}}なので、{{どれが今日のものか}}わからない、の2点を入れる。"],
        ]),
      WS("balance", 2, "第4段落によれば、健全な記憶とはどのようなものか。説明せよ。", 60,
        "記憶を保持することと手放すことの釣り合いが保たれ、どちらか一方に大きく傾いていない記憶。", [
          ["保持と手放すことの釣り合い（balance）", 7, ["保持", "手放す", "釣り合い"]],
          ["どちらにも傾きすぎていない", 5, ["傾", "どちら"]],
        ], "holding on と letting go の両方を訳出", [
          ["根拠", "a healthy memory keeps {{a balance between holding on and letting go}}。"],
          ["補う", "Problems arise when that balance {{tips too far in either direction}} を裏返して答える。"],
        ]),
      WS("storehouse", 3, "第5段落で、記憶を「倉庫」とみなす考えがいまも説得力をもつ理由として、筆者はどのようなことを挙げているか。説明せよ。", 80,
        "図書館や写真、デジタル機器など、何も失わずに記録できると約束するように見える技術があり、人はその機械を基準に自分の心を評価してしまいがちだから。", [
          ["記録の技術が何も失わないことを約束するように見える", 6, ["技術", "失わ"]],
          ["その機械を基準に自分の心を判断してしまう", 6, ["基準", "心"]],
        ], "理由は第5段落の Part of the answer 以下", [
          ["根拠", "Libraries, photographs and now digital devices seem to promise that {{nothing need ever be lost}}。"],
          ["もう1点", "it is tempting to {{judge our own minds by the standard of these machines}}。"],
        ]),
      WS("room", 3, "最終段落の最終文で筆者が述べていることを、比喩の意味を明らかにしてわかりやすく説明せよ。", 100,
        "何も忘れない心は、すべてを完全に保管した理想的な図書館のようなものではなく、家具であふれて身動きのとれない部屋のように、記憶が多すぎて必要なものを取り出して考えることができなくなる、ということ。", [
          ["完全な図書館（理想的な保管）のようではない", 4, ["図書館"]],
          ["物があふれて動けない部屋のようだ", 4, ["部屋", "身動き", "あふれ"]],
          ["記憶が多すぎて考えたり必要な記憶を使ったりできない", 4, ["多すぎ", "考え"]],
        ], "less like A than like B は「AというよりB」", [
          ["構文", "would be {{less like a perfect library than like a room}} …：完璧な図書館というより、むしろ…部屋に似ている。"],
          ["比喩を開く", "部屋の家具＝{{記憶}}、動けない＝{{考えられない}}（第2段落の内容）。"],
        ]),
    ],
  ),
  reading(
    1,
    "translation",
    "翻訳で失われるものと得られるものを論じた文章",
    "What Survives Translation",
    `It is often said that something is always lost in translation. The remark is usually made with a sigh, as though a translator were a careless messenger who drops a few coins from every bag he carries. Poems, in particular, are thought to suffer: their sounds, their rhythms and the double meanings of their words seem bound so tightly to one language that any attempt to move them into another must leave them damaged. There is some truth in this complaint. Yet if we take it too seriously, we are led to a strange conclusion, namely that most of what humanity has thought and imagined is closed to anyone who does not happen to speak the language in which it was first expressed.

Consider what actually happens when a skilled translator works on a novel. She does not replace each word with its nearest equivalent, as a dictionary might. A sentence that sounds natural in one language may sound stiff or even comic when rendered word for word in another, and a joke that depends on a pun may vanish entirely. {{(1) The translator's task is therefore not to copy the surface of the original but to work out what the sentence is doing, whether it is meant to amuse, to warn or to comfort, and then to find a way of doing the same thing with quite different materials.}} In this sense, translation resembles performance more than copying. Two pianists may play the same piece very differently, and we do not usually say that either has failed to play it.

Seen in this light, the losses of translation look less like simple damage and more like the cost of any act of interpretation. Even readers of the original do not all receive the same work. A novel written two centuries ago meant something different to its first readers than it means to us, because the words have shifted and the world they describe has changed. {{(2) If we do not conclude from this that the novel is lost to modern readers, it is hard to see why we should reach that conclusion merely because the book has crossed from one language into another.}}

Translation can also give as well as take. A translator who must decide exactly what a phrase means is forced to read it more closely than almost anyone else, and in doing so she may notice possibilities that native readers pass over. Some writers have even said that they understood their own books better after discussing them with their translators. Moreover, translations change the language into which they are made. New words, images and ways of building sentences enter a language through translated books, and over time readers come to treat them as their own.

None of this makes translation easy, and some things really do resist it. Poems that play with the shape of letters, or that rhyme on every line, may require the translator to choose which qualities to keep and which to give up. {{(3) What matters is that such choices be made openly and thoughtfully, rather than hidden behind the pretense that a perfect copy is possible.}} A reader who knows that a translation is one reading among many is in a better position to enjoy it than one who expects it to be the original in disguise.

The common saying, then, might be turned around. Something is always lost in translation, but something is also found: a new reader, a new reading, and sometimes a new way of seeing what the original was trying to do.`,
    [
      WY("tr1", 1, 3, U.futeishi, "したがって翻訳者の仕事は、原文の表面を写すことではなく、その文が何をしているのか、つまり笑わせようとしているのか、警告しようとしているのか、慰めようとしているのかを見きわめ、そのうえでまったく異なる材料を使って同じことをする方法を見つけることである。", [
        ["not to copy … but to work out … and then to find … の並列を正しくとる", 5, ["ではなく", "見つける"]],
        ["what the sentence is doing と whether 節（〜か…か）を訳す", 4, ["何をしている", "か"]],
        ["with quite different materials を「まったく異なる材料で」と訳す", 3, ["異なる材料"]],
      ], "not A but B の B に不定詞が2つ並ぶ", [
        ["骨組み", "The task is {{not to copy A but to work out B and then to find C}}。"],
        ["挿入", "whether it is meant to amuse, to warn or to comfort は {{what the sentence is doing の言いかえ}}。"],
      ]),
      WY("tr2", 2, 3, U.chobun, "もしこのことから、その小説が現代の読者には失われていると結論づけないのであれば、本がある言語から別の言語へ渡ったというだけで、なぜその結論に達しなければならないのかはわかりにくい。", [
        ["conclude from this that … を「このことから…と結論づける」と訳す", 4, ["このことから", "結論"]],
        ["it is hard to see why … を「なぜ…かはわかりにくい」と訳す", 4, ["わかりにくい", "なぜ"]],
        ["merely because … を「…というだけで」と訳す", 4, ["だけで"]],
      ], "it is hard to see why … は反語に近い", [
        ["条件", "If we do not conclude {{from this}} that …：this = 二百年前の小説が当時と今とで違う意味をもつこと。"],
        ["主節", "{{it is hard to see why we should …}}：「なぜ…すべきなのか理解しがたい」＝そう結論づける理由はない。"],
      ]),
      WY("tr3", 3, 3, U.bunshi, "大切なのは、そうした選択が、完璧な写しが可能であるというふりの陰に隠されるのではなく、公然と、そしてよく考えたうえでなされることである。", [
        ["What matters is that … を「大切なのは…ことだ」と訳す", 4, ["大切なのは"]],
        ["be made（仮定法現在）と rather than hidden の対比を訳す", 4, ["ではなく", "隠"]],
        ["the pretense that a perfect copy is possible の同格を訳す", 4, ["ふり", "完璧"]],
      ], "that 節中の原形 be は「〜すべきだ」の含み", [
        ["主語", "{{What matters}} is that …：「重要なのは…ことだ」。"],
        ["同格", "the pretense {{that a perfect copy is possible}}：「完璧な写しが可能だというふり」。"],
      ]),
      WS("strange", 2, "第1段落の a strange conclusion とはどのような結論か。具体的に説明せよ。", 60,
        "人類が考え想像してきたことの大半は、それが最初に表現された言語を話さない人には閉ざされている、という結論。", [
          ["人類が考え想像してきたことの大半", 6, ["大半", "考え"]],
          ["最初の言語を話さない人には閉ざされている", 6, ["閉ざされ", "話さない"]],
        ], "namely 以下が conclusion の中身", [
          ["根拠", "a strange conclusion, {{namely that}} most of what humanity has thought and imagined is closed …。"],
          ["訳出", "the language in which it was first expressed：{{最初に表現された言語}}。"],
        ]),
      WS("performance", 3, "第2段落で、筆者が翻訳を「写すこと」よりも「演奏」に似ているとするのはなぜか。説明せよ。", 90,
        "翻訳者は原文の表面を写すのではなく、文が笑わせる、警告するなどの働きを見きわめ、別の材料で同じ働きを実現するので、同じ曲を異なる仕方で弾く演奏に近いから。", [
          ["表面を写すのではない", 4, ["表面", "写す"]],
          ["文の働きを見きわめ、別の材料で同じ働きをする", 4, ["働き", "材料"]],
          ["同じ曲を違う仕方で弾いても失敗とはいわない演奏と同じ", 4, ["演奏", "曲"]],
        ], "In this sense の this が指す内容をまとめる", [
          ["this の中身", "直前の下線部(1)：{{表面を写さず}}、文の{{働き}}を別の材料で実現する。"],
          ["たとえ", "二人のピアニストが{{同じ曲を違うふうに}}弾いても、失敗とは言わない。"],
        ]),
      WS("give", 3, "第4段落で、翻訳が「与える」ものとしてどのようなことが挙げられているか。二点にまとめて説明せよ。", 100,
        "一つは、翻訳者が語句の意味を正確に決めるために誰よりも丁寧に読み、母語の読者が見落とす可能性に気づくこと。もう一つは、翻訳を通して新しい語や文の作り方が訳す側の言語に入り、それを変えること。", [
          ["翻訳者が誰よりも丁寧に読み、母語の読者が見落とすものに気づく", 6, ["丁寧", "見落と"]],
          ["新しい語・イメージ・文の作り方が入り、訳す側の言語を変える", 6, ["言語", "変え"]],
        ], "Moreover の前後で二点に分ける", [
          ["一点目", "forced to read it {{more closely than almost anyone else}} … notice possibilities that native readers pass over。"],
          ["二点目", "{{Moreover}}, translations change the language into which they are made。"],
        ]),
      C("found", 2, U.chobun, "最終段落の内容をふまえ、本文全体の主張として最も適切なものを選べ。", [
        "Although translation inevitably loses something, it can also bring new readers and new ways of understanding the original.",
        "Translation is impossible, so serious readers should learn the original language of every book.",
        "Good translators replace each word with its closest equivalent in the other language.",
        "Poems lose nothing at all when they are translated by skilled translators.",
      ], [
        "正解。最終段落の Something is always lost …, but something is also found に一致。",
        "筆者は「元の言語を話さない人には閉ざされる」という結論を strange（奇妙）として退けている。",
        "第2段落で She does not replace each word with its nearest equivalent と否定。",
        "第5段落で some things really do resist it、詩は何を残すか選ばねばならないとある。",
      ], "譲歩（lost）と主張（found）の両方を含む選択肢", [
        ["主張の箇所", "最終段落：lost もあるが {{something is also found}}。"],
        ["誤りを消す", "「不可能」「一語ずつ置きかえ」「何も失わない」は、それぞれ{{第1・2・5段落}}と食いちがう。"],
      ]),
    ],
  ),
  reading(
    1,
    "lucky-accident",
    "科学の「幸運な偶然」を論じた文章",
    "The Myth of the Lucky Accident",
    `Popular histories of science are full of happy accidents. A dish is left uncovered, a chemical is spilled, a machine is switched on by mistake, and suddenly a great discovery appears, as if nature had decided to reward someone for being careless. These stories are attractive because they make science seem less forbidding: if discoveries simply happen, then anyone might stumble upon one. But the stories also mislead. {{(1) What they leave out is that the same accident had usually happened many times before, in front of people who saw nothing in it worth remarking on.}}

Imagine two laboratory assistants who notice, on the same morning, that a sample has changed color overnight. The first throws it away and prepares a new one; the change is a nuisance that has spoiled the day's work. The second pauses, because she knows what color the sample ought to be and cannot think of any reason why it should be otherwise. Only the second has made an observation. The difference between them is not luck, since the accident was identical, but expectation. {{(2) An unexpected result can only be recognized as unexpected by someone who already has a clear idea of what was supposed to happen, and the clearer that idea, the more sharply the surprise stands out.}}

This suggests that the familiar contrast between careful planning and lucky chance is too simple. Discoveries that appear accidental are often the product of long preparation, but the preparation is of an unusual kind. It consists not in knowing in advance what one will find, but in knowing the ordinary so thoroughly that the extraordinary cannot slip past unnoticed. A naturalist who has watched the same patch of forest for twenty years is far more likely to notice a new species of beetle than a visitor who walks through it once, even though the visitor may have sharper eyesight.

There is, however, a second condition. Noticing an oddity is not enough; one must also be willing to take it seriously. Laboratories are busy places, and a researcher who stopped to investigate every small irregularity would never finish anything. Most strange results really are mistakes, such as a dirty instrument or a mislabeled bottle, and experienced scientists learn to ignore them. {{(3) The difficulty is that the habit which protects a researcher from wasting time on trivial errors is the very habit that may lead her to dismiss the one irregularity that matters.}}

How, then, can this tension be managed? There is no rule that tells us in advance which oddities deserve attention. But some research groups set aside time in which members describe results that puzzled them, however minor, without having to explain them. Such discussions cost little, and they make it more likely that a strange observation will be examined by several minds rather than forgotten by one.

If the stories of lucky accidents teach anything, it is not that discovery depends on chance. It is that chance is everywhere, constantly offering hints that most of us fail to see, and that the scientist's real skill lies in being ready to see them.`,
    [
      WY("tr1", 1, 3, U.kankei, "それらの話が省いているのは、同じ偶然がたいていそれ以前に何度も起きていて、しかもそれが、そこに注目に値するものを何も見いださなかった人々の目の前で起きていたということである。", [
        ["What they leave out is that … を「それらの話が省いているのは…ということだ」と訳す", 4, ["省いて"]],
        ["had happened many times before（過去完了）を「それ以前に何度も起きていた」と訳す", 4, ["以前", "何度も"]],
        ["people who saw nothing in it worth remarking on を正しく訳す", 4, ["注目", "見いださ"]],
      ], "see nothing in it worth -ing の形容詞句の修飾", [
        ["主語", "{{What they leave out}}：they = the stories。「その話が取り落としていること」。"],
        ["修飾", "saw {{nothing}} in it {{worth remarking on}}：worth 以下が nothing を後ろから修飾。"],
      ]),
      WY("tr2", 2, 3, U.hikaku, "予想外の結果を予想外のものと認められるのは、何が起こるはずだったのかについてすでに明確な考えをもっている人だけであり、その考えが明確であればあるほど、驚きはいっそうはっきりと際立つ。", [
        ["can only be recognized … by someone who … を「…人だけが認められる」と訳す", 4, ["だけ"]],
        ["what was supposed to happen を「何が起こるはずだったか」と訳す", 4, ["はず"]],
        ["the clearer …, the more sharply … を「明確であるほど、いっそう…」と訳す", 4, ["ほど"]],
      ], "the 比較級, the 比較級 は「〜すればするほど」", [
        ["受動態", "can {{only}} be recognized as unexpected {{by someone who}} …：only は by 以下にかかる。"],
        ["比較", "{{the clearer that idea (is), the more sharply the surprise stands out}}。"],
      ]),
      WY("tr3", 3, 3, U.kankei, "困ったことに、ささいな誤りに時間を浪費しないよう研究者を守ってくれる習慣こそが、重要な一つの異常を研究者に退けさせてしまうかもしれない習慣そのものなのである。", [
        ["the habit which protects a researcher from wasting time を「時間を浪費しないよう守る習慣」と訳す", 4, ["守", "浪費"]],
        ["the very habit を「まさにその習慣」と強めて訳す", 4, ["こそ", "そのもの"]],
        ["lead her to dismiss the one irregularity that matters を正しく訳す", 4, ["退け", "重要"]],
      ], "the very ～ は「まさにその～」", [
        ["骨組み", "The difficulty is that {{the habit (which …) is the very habit (that …)}}。"],
        ["語法", "protect A {{from -ing}}（AがVしないよう守る）、lead A {{to do}}（AにVさせる）。"],
      ]),
      WS("two", 2, "第2段落の二人の助手の違いはどこにあると筆者は述べているか。説明せよ。", 60,
        "違いは運ではなく予想にあり、試料の本来の色を知る二人目だけが、変化を説明のつかない異常として気づけた。", [
          ["違いは運ではなく予想（expectation）", 6, ["運", "予想"]],
          ["本来の色を知る二人目だけが異常として気づいた", 6, ["本来", "気づ"]],
        ], "not luck … but expectation が答えの核", [
          ["根拠", "The difference between them is {{not luck}} … {{but expectation}}。"],
          ["具体化", "二人目は what color the sample {{ought to be}} を知っていた。"],
        ]),
      WS("prep", 3, "第3段落で筆者のいう「普通でない種類の準備」とは、どのようなものか。説明せよ。", 60,
        "何を見つけるかを前もって知ることではなく、ふだんの状態を知りつくし、並はずれたことを見のがさないようにしておくこと。", [
          ["前もって何を見つけるかを知ることではない", 5, ["前もって"]],
          ["ふだんのことを知りつくし、異常を見のがさない", 7, ["ふだん", "見のが"]],
        ], "consists not in A but in B", [
          ["根拠", "It consists {{not in knowing in advance}} what one will find, {{but in knowing the ordinary}} so thoroughly …。"],
          ["so … that", "so thoroughly {{that the extraordinary cannot slip past unnoticed}}：程度を表す。"],
        ]),
      WS("groups", 3, "第5段落で紹介されている研究グループの工夫とはどのようなもので、それにはどのような利点があるか。説明せよ。", 90,
        "小さなことでも戸惑った結果を、説明を求められずに報告し合う時間を設けること。費用がほとんどかからず、奇妙な観察が一人に忘れられず、複数の人に検討されやすくなる。", [
          ["戸惑った結果を説明なしに報告し合う時間を設ける", 5, ["時間", "報告"]],
          ["費用が少ない", 3, ["費用"]],
          ["一人に忘れられず複数の人に検討される", 4, ["複数", "忘れ"]],
        ], "工夫と利点を分けて書く", [
          ["工夫", "set aside time in which members describe results that puzzled them, however minor, {{without having to explain them}}。"],
          ["利点", "{{cost little}}、examined by {{several minds}} rather than forgotten by one。"],
        ]),
      C("main", 2, U.chobun, "本文の主張として最も適切なものを選べ。", [
        "Chance offers hints all the time, and the skill of a scientist lies in being prepared to notice them.",
        "Most important discoveries have been made by researchers who worked carelessly.",
        "Scientists should stop to investigate every irregularity they find in the laboratory.",
        "Chance plays almost no role in the history of scientific discovery.",
      ], [
        "正解。最終段落 chance is everywhere … the scientist's real skill lies in being ready to see them に一致。",
        "第1段落で「不注意へのごほうび」という見方は誤解を招く（mislead）とされている。",
        "第4段落で、すべての異常を調べる研究者は would never finish anything とある。",
        "最終段落で chance is everywhere と、偶然そのものは否定していない。",
      ], "偶然を否定せず「気づく準備」を重視する", [
        ["主張", "最終段落：発見は偶然次第ではなく、{{偶然はどこにでもある}}。大事なのは{{気づく準備}}。"],
        ["誤りを消す", "「すべての異常を調べる」は第4段落の {{would never finish anything}} と食いちがう。"],
      ]),
    ],
  ),
];

// =====================================================================
// 第2問　長文読解（論説。和訳・内容説明に、空所補充・内容一致）
// =====================================================================

const P2: ExamPoolSection[] = [
  reading(
    2,
    "boredom",
    "退屈の役割を論じた文章",
    "In Defense of Boredom",
    `Few feelings have a worse reputation than boredom. We treat it as a problem to be solved as quickly as possible, and modern life offers an almost endless supply of solutions. A few seconds of waiting at a bus stop or in a queue is enough to make many of us reach for a phone, and children who complain that they have nothing to do are often handed a screen before the complaint is finished. It rarely occurs to us to ask whether boredom might have a purpose. Yet a feeling that appears so regularly, and in so many people, is unlikely to be [ A ] useless.

One way to understand boredom is to compare it with hunger. Hunger is unpleasant, but its unpleasantness is useful: it pushes us to look for food before our bodies run short of energy. Boredom may work in a similar way. It is the discomfort we feel when what we are doing no longer engages us, and it pushes us to look for something that will. {{(1) Seen in this way, boredom is not the absence of a desire but the presence of one, a desire for meaning or challenge that our present situation fails to satisfy.}}

If this is right, then the way we usually respond to boredom deserves a second look. When we escape it by turning to the nearest source of entertainment, we remove the discomfort without answering the question it raises. It is a little like quieting hunger with sweets: the feeling goes away, but the need behind it is left unmet, and it soon returns. A person who never allows herself to be bored may never discover what would truly hold her interest, because the signal that might have led her there is always switched off too soon.

There is also some reason to think that boredom can encourage creativity. When the mind is not occupied by a task or a screen, it tends to wander, moving freely between memories, plans and half-formed ideas. Much of this wandering leads nowhere. But occasionally two thoughts that would never have met during focused work come together, and something new results. {{(2) Many people report that their best ideas come to them not while they are working hard at a problem but while they are walking, bathing or staring out of a train window, that is, at moments when they have nothing in particular to do.}}

It would be foolish, of course, to praise every kind of boredom. A worker trapped for years in a job that uses none of her abilities is not being prepared for creative breakthroughs; she is being worn down. Boredom is useful as a signal only when we are free to act on it. Where we are not, the problem lies not in the feeling but in the situation that produces it, and the remedy is to change that situation rather than to learn to enjoy it.

What, then, should we do the next time we find ourselves with nothing to do? Perhaps simply wait a little before reaching for a distraction. The few minutes of discomfort may tell us something about what we want, or they may give an idea the space it needs to appear. {{(3) Either way, the cost of putting up with boredom for a while is small compared with what we might learn by listening to it.}}`,
    [
      C("blank-a", 2, U.vocab, "空所［ A ］に入る最も適切な語を選べ。", ["entirely", "partly", "rarely", "hardly"], [
        "正解。is unlikely to be entirely useless＝「まったく役に立たないということはありそうにない」。何度も現れる感情には目的があるはず、という流れ。",
        "「一部役に立たない」では、退屈に目的があるかもしれないという主張につながらない。",
        "rarely useless は is unlikely to と重なって意味が通らない。",
        "hardly は否定の語で、unlikely と重ねると二重否定になり意味が通らない。",
      ], "部分否定 not entirely（まったく〜というわけではない）", [
        ["前後の流れ", "直前：退屈に目的があるか問うことはまれ。{{Yet}}：何度も多くの人に現れる感情は…。"],
        ["語を選ぶ", "unlikely to be {{entirely}} useless＝「まったく無用とは考えにくい」。"],
      ], K),
      WY("tr1", 1, 3, U.chobun, "このように見ると、退屈とは欲求がないことではなく欲求があること、つまり今の状況では満たされない、意味や手ごたえを求める欲求があることなのである。", [
        ["Seen in this way を分詞構文として「このように見ると」と訳す", 3, ["このように"]],
        ["not the absence of a desire but the presence of one を対比して訳す", 5, ["ない", "ある"]],
        ["a desire for meaning or challenge that … fails to satisfy の同格・関係詞を訳す", 4, ["満たされない", "意味"]],
      ], "one は a desire の代わり", [
        ["対比", "{{not the absence of a desire but the presence of one}}：one = a desire。"],
        ["同格", "a desire for meaning or challenge が {{one を言いかえて}}説明している。"],
      ]),
      WY("tr2", 2, 3, U.chobun, "多くの人は、最良の考えが浮かぶのは、問題に懸命に取り組んでいるときではなく、歩いたり、入浴したり、列車の窓から外を眺めたりしているとき、つまり、とくにすることが何もないときだと言う。", [
        ["not while A but while B を「AしているときではなくBしているとき」と訳す", 5, ["ではなく", "とき"]],
        ["come to them を「浮かぶ・思いつく」と自然に訳す", 3, ["浮か", "思いつ"]],
        ["that is, at moments when … を「つまり…ときに」と訳す", 4, ["つまり", "何もない"]],
      ], "that is,（つまり）は言いかえの合図", [
        ["骨組み", "report that their best ideas come to them {{not while … but while …}}。"],
        ["言いかえ", "{{that is}}, at moments when they have nothing in particular to do：前の三つの例をまとめる。"],
      ]),
      WY("tr3", 3, 2, U.hikaku, "いずれにせよ、しばらく退屈をがまんすることの代償は、退屈に耳を傾けることで学べるかもしれないことに比べれば小さい。", [
        ["Either way を「いずれにせよ」と訳す", 3, ["いずれにせよ"]],
        ["the cost of putting up with boredom を「退屈をがまんすることの代償」と訳す", 5, ["がまん", "代償"]],
        ["small compared with what we might learn … を訳す", 4, ["比べ", "学べる"]],
      ], "put up with は「がまんする」", [
        ["熟語", "{{put up with}} ＝ tolerate（がまんする）。"],
        ["比較", "small {{compared with}} what we might learn by listening to it：it = boredom。"],
      ]),
      WS("sweets", 2, "第3段落の「甘いもので空腹をしずめる」というたとえは、どのようなことを表しているか。説明せよ。", 80,
        "手近な娯楽で退屈から逃れても不快感が消えるだけで、退屈が示す意味や手ごたえへの欲求は満たされず、やがてまた退屈がもどってくるということ。", [
          ["手近な娯楽で逃れると不快感だけが消える", 4, ["娯楽", "不快"]],
          ["退屈の背後にある欲求は満たされない", 4, ["欲求", "満たされ"]],
          ["退屈はやがてまたもどってくる", 4, ["もど", "再び"]],
        ], "たとえの両側（甘いもの・娯楽）を対応させる", [
          ["対応", "sweets ＝ {{the nearest source of entertainment}}、hunger ＝ {{boredom}}。"],
          ["内容", "the feeling goes away, but {{the need behind it is left unmet}}, and it soon returns。"],
        ]),
      WS("free", 3, "第5段落で、退屈が合図として役に立つための条件と、その条件が満たされない場合に筆者がすすめることを説明せよ。", 80,
        "退屈が役立つのは、それに応じて行動する自由があるときだけである。その自由がないなら問題は感情ではなく状況にあり、状況を変えるべきだ。", [
          ["行動する自由があるときだけ役立つ", 6, ["自由", "行動"]],
          ["自由がなければ問題は状況にあり、状況を変える", 6, ["状況", "変え"]],
        ], "only when … と Where we are not を対にする", [
          ["条件", "useful as a signal {{only when we are free to act on it}}。"],
          ["対処", "Where we are not：問題は{{the situation}}で、remedy は {{change that situation}}。"],
        ]),
      C("match", 2, U.chobun, "本文の内容と一致するものを選べ。", [
        "The author compares boredom to hunger because both unpleasant feelings push us to seek something we lack.",
        "According to the author, every kind of boredom eventually leads to creative ideas.",
        "The author says that most mind-wandering produces valuable new ideas.",
        "The author argues that a worker stuck in a dull job should learn to enjoy it.",
      ], [
        "正解。第2段落：空腹は食べ物を探させ、退屈も「夢中になれるもの」を探させる、と同じはたらきとして比べている。",
        "第5段落 It would be foolish … to praise every kind of boredom と食いちがう。",
        "第4段落 Much of this wandering leads nowhere と食いちがう。",
        "第5段落 the remedy is to change that situation rather than to learn to enjoy it と食いちがう。",
      ], "every・most などの量の語に注意", [
        ["根拠", "第2段落：hunger … pushes us to look for food。boredom … {{pushes us to look for something that will}}（engage us）。"],
        ["誤りの確認", "{{every kind}}（第5段落）・{{most}}（第4段落）・{{enjoy}}（第5段落）がそれぞれ本文と逆。"],
      ]),
    ],
  ),
  reading(
    2,
    "night",
    "夜の暗さが失われたことを論じた文章",
    "The Disappearing Dark",
    `For almost all of human history, night was dark. Once the sun had set, the only light came from the moon, the stars and whatever fires people could keep burning. Within a little over a century, that darkness has largely disappeared from the places where most people live. Streets, shops, offices and homes now glow through the night, and the glow spreads upward into the sky, where it hides all but the brightest stars. A child growing up in a large city today may never have seen the band of light that our ancestors saw stretching across the sky on every clear night. {{(1) We have lost something that was once so common that no one thought of it as something that could be lost.}}

Artificial light has, of course, brought enormous benefits. It allows people to work, study and travel after sunset, and well-lit streets make many people feel safer. No one seriously proposes a return to the darkness of earlier centuries. The question is not whether we should use light at night but how much, and where. Much outdoor lighting is wasted: it shines sideways or upward rather than onto the ground where it is needed, or it burns all night in places where no one is present to use it.

The costs of this waste are not only financial. Many animals depend on the regular alternation of light and dark. Insects gather around street lamps in such numbers that the lamps become traps, and young sea turtles, which find their way to the ocean by moving toward the brightest horizon, may crawl inland toward the lights of hotels instead. [ A ], there is growing evidence that bright light late in the evening can disturb human sleep, since our bodies take darkness as a sign that it is time to rest.

What makes the problem unusual is that it is, in principle, easy to solve. Unlike many forms of pollution, light leaves nothing behind when it is switched off. {{(2) A town that decided tomorrow to shield its street lamps and turn off the lights of empty buildings could recover much of its night sky within a single evening, without waiting decades for the damage to be repaired.}} Some communities have already done something like this, and their residents report that they can see far more stars than before, while their streets remain lit where people actually walk.

Why, then, has so little been done? Part of the reason is that the loss of darkness happened gradually. Each new lamp made only a small difference, and no single decision seemed to change the night very much. Another reason is that we tend to associate light with progress and darkness with danger and poverty. {{(3) To argue for less light can therefore sound like arguing against modern life itself, even when what is being proposed is simply light that is better aimed.}}

Perhaps the most persuasive argument for protecting the night is not scientific but personal. Anyone who has stood under a truly dark sky and seen it crowded with stars knows that the experience is hard to forget. It reminds us that the world is larger than the cities we have built, and it is an experience that could be returned to millions of people at very little cost.`,
    [
      C("blank-a", 2, U.setsuzoku, "空所［ A ］に入る最も適切なものを選べ。", ["In addition", "In contrast", "As a result", "Nevertheless"], [
        "正解。動物への害に続けて、人間の睡眠への害という別の損失を付け加えている。",
        "前後は「むだな光の害」という同じ方向の内容で、対比ではない。",
        "人の睡眠の乱れは、虫やウミガメへの害の結果ではない。",
        "逆接。前後は対立していない。",
      ], "害を並べて付け加えるつなぎ", [
        ["前後の関係", "前：{{動物}}への害。後：{{人間の睡眠}}への害。どちらも The costs of this waste の例。"],
        ["選ぶ", "同じ方向の内容を足すので {{In addition}}。"],
      ], K),
      WY("tr1", 1, 2, U.bunshi, "私たちは、かつてあまりにありふれていたので、失われうるものだとはだれも考えなかったものを失ってしまったのだ。", [
        ["so common that … を「あまりにありふれていたので…」と訳す", 4, ["ありふれ", "ので"]],
        ["no one thought of it as … を「だれも…とは考えなかった」と訳す", 4, ["だれも"]],
        ["something that could be lost を「失われうるもの」と訳す", 4, ["失われうる", "失われる"]],
      ], "so ～ that … は程度・結果", [
        ["構文", "something that was once {{so common that}} no one thought of it as …。"],
        ["語法", "think of A {{as}} B：AをBとみなす。"],
      ]),
      WY("tr2", 2, 3, U.kateiho, "ある町が明日、街灯に覆いをつけ、だれもいない建物の明かりを消すことに決めたとしたら、被害が回復するのを何十年も待つことなく、たった一晩のうちに夜空の多くを取りもどすことができるだろう。", [
        ["A town that decided … could … の仮定の意味（〜としたら…だろう）を訳す", 5, ["としたら", "だろう"]],
        ["shield its street lamps / turn off the lights of empty buildings を訳す", 3, ["覆い", "消す"]],
        ["without waiting decades for the damage to be repaired を訳す", 4, ["何十年", "待つ"]],
      ], "主語に仮定の意味がこもる（仮定法）", [
        ["仮定", "decided … could recover：過去形で{{仮定}}を表す。主語の A town that … が if 節のはたらき。"],
        ["語法", "wait {{for the damage to be repaired}}：for A to do（Aが〜するのを待つ）。"],
      ]),
      WY("tr3", 3, 3, U.chobun, "したがって、光を減らすべきだと主張することは、提案されているのが単にもっとうまく向けられた光にすぎない場合でさえ、現代の生活そのものに反対しているように聞こえかねない。", [
        ["To argue for less light を「光を減らすべきだと主張すること」と訳す", 4, ["主張"]],
        ["sound like arguing against modern life itself を訳す", 4, ["反対", "聞こえ"]],
        ["even when what is being proposed is simply light that is better aimed を訳す", 4, ["でさえ", "向け"]],
      ], "argue for / against は「賛成・反対を論じる」", [
        ["主語", "{{To argue for less light}}：不定詞の名詞用法。"],
        ["譲歩", "{{even when}} what is being proposed is simply light that is better aimed：「単に向きのよい光」の提案でも。"],
      ]),
      WS("waste", 2, "第2段落で、筆者が「むだ」だとしている屋外照明は、どのようなものか。二つ挙げて説明せよ。", 60,
        "必要な地面ではなく横や上を照らす照明と、利用する人がだれもいない場所で一晩中ついている照明。", [
          ["地面ではなく横や上を照らす", 6, ["横", "上"]],
          ["だれもいない場所で一晩中ついている", 6, ["一晩中", "いない"]],
        ], "コロン（:）の後ろが wasted の中身", [
          ["根拠", "Much outdoor lighting is wasted{{:}} it shines sideways or upward … or it burns all night …。"],
          ["まとめる", "{{向きのむだ}}と{{時間・場所のむだ}}の二つ。"],
        ]),
      WS("why-little", 3, "第5段落で、光の問題への対策がほとんど進んでこなかった理由として挙げられている二点を説明せよ。", 100,
        "暗さの喪失が少しずつ進み、一つ一つの照明や決定では夜が大きく変わったように見えなかったこと。また、人は光を進歩と、暗さを危険や貧しさと結びつけがちなこと。", [
          ["喪失が少しずつ進み、一つ一つの変化は小さく見えた", 6, ["少しずつ", "小さ"]],
          ["光を進歩、暗さを危険・貧しさと結びつける", 6, ["進歩", "危険"]],
        ], "Part of the reason / Another reason の二点", [
          ["一点目", "the loss of darkness happened {{gradually}}。Each new lamp made only {{a small difference}}。"],
          ["二点目", "we tend to associate {{light with progress}} and {{darkness with danger and poverty}}。"],
        ]),
      C("match", 2, U.chobun, "本文の内容と一致するものを選べ。", [
        "Some young sea turtles move toward hotel lights because they head for the brightest horizon.",
        "The author proposes that cities return to the darkness of earlier centuries.",
        "Like other forms of pollution, light takes decades to disappear.",
        "Communities that shielded their lamps had to leave their streets completely dark.",
      ], [
        "正解。第3段落：ウミガメは最も明るい水平線に向かって海へ進むため、ホテルの明かりの方へ陸を進むことがある。",
        "第2段落 No one seriously proposes a return to the darkness of earlier centuries と食いちがう。",
        "第4段落 Unlike many forms of pollution, light leaves nothing behind when it is switched off と逆。",
        "第4段落 their streets remain lit where people actually walk と食いちがう。",
      ], "Unlike / Like の取りちがえに注意", [
        ["根拠", "sea turtles, which find their way … {{by moving toward the brightest horizon}}, may crawl inland toward the lights of hotels。"],
        ["誤りの確認", "{{Unlike}} many forms of pollution（第4段落）を Like とした選択肢は逆。"],
      ]),
    ],
  ),
  reading(
    2,
    "lost",
    "道に迷うことの意味を論じた文章",
    "The Value of Getting Lost",
    `Not long ago, finding your way in an unfamiliar city required effort. Travelers studied paper maps, asked strangers for directions, and paid attention to landmarks, such as a church tower or a bend in a river, that would help them return to where they had started. Today a phone can guide us from door to door, telling us when to turn and how many minutes remain. It is hard to complain about a tool that saves so much time and anxiety. Yet some researchers have begun to wonder what we give up when we hand over the task of finding our way.

One answer concerns what we remember of the places we pass through. When we navigate for ourselves, we build up a kind of map in our heads: we know not only the route from the station to the hotel but also roughly where the hotel lies in relation to the river, the market and the hills. People who follow turn-by-turn instructions, by contrast, tend to reach their destination with only a vague idea of how they got there. {{(1) They have traveled through the city without, in a sense, having been in it, since their attention was fixed on a small screen rather than on the streets around them.}}

This might not matter if the device were always available. But batteries run out, signals fail, and the moment we are forced to rely on our own sense of direction is often the moment we are least prepared to do so. More importantly, the mental map that we build through our own efforts is not only a means of getting from one place to another. It also shapes how we feel about a place. [ A ] a neighborhood that we have explored on foot, with its shortcuts and dead ends, comes to feel like our own, a city that we know only as a series of instructions remains strangely foreign.

There is also the matter of chance. A person who takes a wrong turn may discover a small bookshop, a quiet garden or a view of the harbor that no guide would have recommended, because no one thought to search for it. {{(2) Getting lost, in other words, is not merely a failure to reach a goal; it can be a way of meeting what we did not know we were looking for.}} A tool designed to take us efficiently to the places we have already chosen is, by its nature, poor at offering us what we have not.

None of this is an argument for throwing away our phones. The point is rather that the way we use a tool can matter as much as the tool itself. Some people now study a map before setting out and then put the phone away, checking it only when they are truly unsure. {{(3) In this way they keep most of the convenience the device offers while still giving themselves the chance to learn the shape of the place they are in.}}

Cities reward those who pay attention to them. A route that we have found for ourselves, even with a few mistakes along the way, is one that we are likely to remember, and with it, the place it led us through.`,
    [
      C("blank-a", 2, U.setsuzoku, "空所［ A ］に入る最も適切な語を選べ。", ["Whereas", "Because", "Unless", "Until"], [
        "正解。「歩いて探った地域は自分のものに感じられる」と「指示でしか知らない都市はよそよそしい」を対比している。",
        "理由のつなぎでは、前半が後半の原因になってしまい意味が通らない。",
        "「〜しないかぎり」では、前後の対比が表せない。",
        "「〜するまで」では、二つの都市の感じ方の対比にならない。",
      ], "二つの節の対比は whereas", [
        ["前後の関係", "前半：歩いた地域は{{自分のもの}}に感じる。後半：指示だけの都市は{{よそよそしい}}。"],
        ["選ぶ", "対比を表す接続詞 {{Whereas}}（〜なのに対し）。"],
      ], K),
      WY("tr1", 1, 3, U.domeishi, "ある意味で、彼らはその都市の中にいることなしにその都市を通り抜けてきたのである。というのも、彼らの注意は周囲の街路ではなく小さな画面に注がれていたからだ。", [
        ["without having been in it を「その中にいたことなしに」と訳す", 4, ["いた", "なしに", "いないまま"]],
        ["in a sense を「ある意味で」と訳す", 3, ["ある意味"]],
        ["since … の理由と rather than の対比を訳す", 5, ["からだ", "ではなく", "画面"]],
      ], "without having been は完了の動名詞", [
        ["骨組み", "They have traveled through the city {{without … having been in it}}：in a sense は挿入。"],
        ["理由", "{{since}} their attention was fixed on a small screen {{rather than}} on the streets。"],
      ]),
      WY("tr2", 2, 2, U.kankei, "つまり、道に迷うことは単に目的地にたどり着けないということではない。それは、自分が探していると気づいていなかったものに出会う一つの方法になりうるのだ。", [
        ["in other words と not merely … を訳す", 4, ["つまり", "単に"]],
        ["a failure to reach a goal を「目的地にたどり着けないこと」と訳す", 3, ["たどり着け", "失敗"]],
        ["what we did not know we were looking for を正しく訳す", 5, ["探して", "知らなかった", "気づいて"]],
      ], "what の後ろに S know S V が続く連鎖関係詞", [
        ["前半", "Getting lost is {{not merely a failure to reach a goal}}。"],
        ["関係詞", "what (= the thing which) we did not know {{we were looking for}}：「探していると知らなかったもの」。"],
      ]),
      WY("tr3", 3, 3, U.chobun, "こうして彼らは、その機器がもたらす便利さの大部分を保ちながらも、自分がいる場所の形を知る機会を自分自身に与えているのである。", [
        ["In this way を「こうして」と訳す", 3, ["こうして"]],
        ["most of the convenience the device offers の関係詞の省略を訳す", 4, ["便利さ", "もたらす"]],
        ["while still giving themselves the chance to learn … を訳す", 5, ["ながら", "機会"]],
      ], "the convenience (that) the device offers", [
        ["省略", "the convenience {{(that) the device offers}}：目的格の関係代名詞の省略。"],
        ["付帯", "{{while still giving}} themselves the chance：「それでもなお…機会を自分に与えながら」。"],
      ]),
      WS("map", 3, "第2・3段落によれば、自分の力で道を探すことで頭の中にできる「地図」には、どのような働きがあるか。説明せよ。", 80,
        "道順だけでなく場所どうしの位置関係がわかるので、機器が使えないときにも道を見つけられ、さらにその土地を自分のものと感じさせてくれる。", [
          ["道順だけでなく場所の位置関係がわかる", 4, ["位置関係", "道順"]],
          ["機器が使えないときにも役立つ", 4, ["使えない", "電池"]],
          ["その土地を自分のものと感じさせる", 4, ["自分のもの", "感じ"]],
        ], "第3段落の More importantly 以下も入れる", [
          ["第2段落", "know {{not only the route}} … {{but also roughly where the hotel lies in relation to}} …。"],
          ["第3段落", "It also {{shapes how we feel about a place}}：探った地域は feel like our own。"],
        ]),
      WS("tool", 3, "第4段落の最終文の内容を、わかりやすく説明せよ。", 80,
        "すでに選んだ場所へ効率よく連れて行くよう作られた道具は、その性質上、自分がまだ選んでいない思いがけないものとの出会いを与えるのが苦手だということ。", [
          ["すでに選んだ場所へ効率よく連れて行く道具", 6, ["選んだ", "効率"]],
          ["まだ選んでいないもの（思いがけない出会い）を与えにくい", 6, ["選んでいない", "思いがけない"]],
        ], "what we have not の後ろの省略を補う", [
          ["省略", "what we have not ＝ what we have not {{(already chosen)}}。"],
          ["語法", "be poor at -ing：〜するのが{{苦手}}。by its nature：{{その性質上}}。"],
        ]),
      C("match", 2, U.chobun, "本文の内容と一致するものを選べ。", [
        "People who follow turn-by-turn instructions often arrive with little idea of how they got there.",
        "The author argues that phones should not be used for finding one's way at all.",
        "According to the author, a mental map is useful only for getting from one place to another.",
        "The author says that taking a wrong turn always leads to a pleasant discovery.",
      ], [
        "正解。第2段落 tend to reach their destination with only a vague idea of how they got there に一致。",
        "第5段落 None of this is an argument for throwing away our phones と食いちがう。",
        "第3段落 is not only a means of getting from one place to another と食いちがう。",
        "第4段落は may discover（見つけるかもしれない）で、always とは言っていない。",
      ], "only・always などの言いすぎを見ぬく", [
        ["根拠", "第2段落：with only {{a vague idea of how they got there}}。"],
        ["誤りの確認", "{{not only a means}}（第3段落）・{{may}} discover（第4段落）と照らす。"],
      ]),
    ],
  ),
];

// =====================================================================
// 第3問　和文英訳（日本文の下線部を英語に）
// =====================================================================

const TR_LEAD = "次の文章の下線部を英訳せよ。";

function wsec(tag: number, id: string, unit: string, title: string, lead: string, material: { lang: "ja" | "en"; title?: string; body: string }, questions: QuestionB[], pick?: number): ExamPoolSection {
  return {
    unit,
    tag: `kyodai-eigo:${tag}`,
    section: {
      id: `kyodai-en-${id}`,
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
  ["文の骨組み（主語・動詞・構文）が日本文の意味を正しく表している", 5, frame],
  ["語句・語法が適切で、日本語の細かな意味（" + ja.join("・") + "）を落としていない", 4, usage],
  ["時制・冠詞・数・つづりの誤りがない", 3, []],
];
const TR = (id: string, d: 2 | 3, mark: string, model: string, also: string[], rb: Rb, point: string, st: St[]): QuestionB => {
  const q = W(id, d, U.wabun, `下線部${mark}を英訳せよ。`, model, rb, point, st, undefined, 540);
  if (q.answer.kind === "written") q.answer.alsoModels = also;
  return q;
};

const P3: ExamPoolSection[] = [
  wsec(3, "tr-travel", U.wabun, "随筆の和文英訳（旅と土地）", TR_LEAD, {
    lang: "ja",
    body: `{{ア　知らない町を訪れたとき、ガイドブックに載っている名所よりも、地元の人が通う小さな店のほうが記憶に残ることがある。}}{{イ　それは、そこでの出来事が自分だけのものだと感じられるからかもしれない。}}{{ウ　旅の価値は、どれだけ多くの場所を見たかではなく、どれだけ深くその土地に触れたかで決まるのだろう。}}`,
  }, [
    TR("a", 2, "ア", "When we visit an unfamiliar town, a small shop that local people often go to sometimes stays in our memory longer than the famous sights listed in guidebooks.", ["When you visit a town you do not know, you may remember a little shop the locals use more clearly than the well-known places in the guidebooks."], trRubric(["When we visit", "stays in our memory", "than"], ["local people", "listed in guidebooks"], ["地元の人が通う", "記憶に残る"]), "「記憶に残る」は stay in one's memory", [
      ["主語を決める", "日本文の主語は「店」。{{a small shop … stays in our memory}} とするか、{{we remember a small shop}} と人を主語にする。"],
      ["修飾", "「地元の人が通う」は関係詞で {{that local people often go to}}。go to の to を落とさない。"],
    ]),
    TR("i", 2, "イ", "That may be because we feel that what happened there belongs to us alone.", ["This is perhaps because we feel that the experience we had there is ours and no one else's."], trRubric(["That may be because"], ["what happened there", "belongs to us alone"], ["自分だけのもの", "かもしれない"]), "「それは〜からかもしれない」＝ That may be because", [
      ["構文", "「それは〜だからかもしれない」＝ {{That may be because S V}}。"],
      ["名詞節", "「そこでの出来事」＝ {{what happened there}}。「自分だけのもの」＝ belongs to us alone / is ours alone。"],
    ]),
    TR("u", 3, "ウ", "The value of a trip probably depends not on how many places we see but on how deeply we come into contact with the place we visit.", ["What makes a journey worthwhile is probably not the number of places we see but how deeply we experience the place we are in."], trRubric(["depends not on", "but on"], ["how many places", "how deeply"], ["どれだけ多く", "触れた", "のだろう"]), "depend not on A but on B と間接疑問", [
      ["構文", "「AではなくBで決まる」＝ {{depends not on A but on B}}。「のだろう」は probably。"],
      ["間接疑問", "{{how many places we see}} / {{how deeply we come into contact with}} …（S＋V の語順）。"],
    ]),
  ], 2),
  wsec(3, "tr-writing", U.wabun, "随筆の和文英訳（書くことと考えること）", TR_LEAD, {
    lang: "ja",
    body: `{{ア　自分の考えを言葉にしてみて初めて、それがいかにあいまいだったかに気づくことがある。}}{{イ　頭の中ではわかっているつもりでも、人に説明しようとすると、うまく言えないのである。}}{{ウ　だから、書くことは、考えをまとめた後にする作業というより、考えるための方法そのものだと言ってよい。}}`,
  }, [
    TR("a", 3, "ア", "It is sometimes only when we try to put our thoughts into words that we realize how vague they were.", ["Sometimes we do not realize how unclear our ideas are until we try to express them in words."], trRubric(["only when", "that we realize"], ["put … into words", "how vague"], ["初めて", "いかにあいまい"]), "「〜して初めて」は It is only when … that", [
      ["構文", "{{It is only when S V that S V}}（強調構文）か {{not … until}}。"],
      ["感嘆の名詞節", "「いかにあいまいだったか」＝ {{how vague they were}}。"],
    ]),
    TR("i", 2, "イ", "Even if we think we understand something in our heads, we find that we cannot explain it well when we try to make it clear to someone else.", ["We may believe we understand it in our minds, but when we try to explain it to others, we cannot put it well."], trRubric(["Even if we think", "when we try to"], ["explain it", "someone else"], ["わかっているつもり", "うまく言えない"]), "「〜つもり」は think / believe で", [
      ["つもり", "「わかっているつもり」＝ {{think we understand}}。"],
      ["説明", "「人に説明する」＝ explain it {{to someone else}}（explain 人 としない）。"],
    ]),
    TR("u", 3, "ウ", "Writing, therefore, can be said to be not so much a task we do after organizing our thoughts as a way of thinking itself.", ["So we may say that writing is not just what we do after we have sorted out our ideas, but a method of thinking in itself."], trRubric(["not so much A as B", "can be said"], ["organizing our thoughts", "a way of thinking"], ["というより", "そのもの"]), "「AというよりB」＝ not so much A as B", [
      ["構文", "「AというよりむしろB」＝ {{not so much A as B}}（B rather than A も可）。"],
      ["言ってよい", "{{can be said to be}} / {{we may say that}}。"],
    ]),
  ], 2),
  wsec(3, "tr-failure", U.wabun, "論説文の和文英訳（実験の失敗）", TR_LEAD, {
    lang: "ja",
    body: `{{ア　実験がうまくいかなかったとき、多くの学生はすぐに自分のやり方が悪かったのだと考えがちだ。}}{{イ　しかし、予想と違う結果こそが、新しい発見の手がかりになることも少なくない。}}{{ウ　大切なのは、失敗を恐れずに、なぜそうなったのかを最後まで考え抜く姿勢である。}}`,
  }, [
    TR("a", 2, "ア", "When an experiment does not go well, many students tend to assume at once that they did something wrong.", ["When an experiment fails, many students are likely to think immediately that their method was wrong."], trRubric(["tend to", "When an experiment"], ["go well", "at once"], ["すぐに", "がちだ"]), "「〜しがちだ」＝ tend to / be likely to", [
      ["がち", "「〜しがち」＝ {{tend to do}} / {{be likely to do}}。"],
      ["やり方が悪い", "{{they did something wrong}} / {{their method was wrong}}。"],
    ]),
    TR("i", 3, "イ", "However, it is often a result that differs from what was expected that provides a clue to a new discovery.", ["But results that are different from our predictions often lead to new discoveries."], trRubric(["it is … that", "often"], ["differs from what was expected", "a clue to"], ["こそ", "少なくない"]), "「〜こそ」は強調構文、「少なくない」は often", [
      ["こそ", "{{It is A that V}} の強調構文で「Aこそが」。"],
      ["少なくない", "「〜することも少なくない」＝ {{often}}。not a few にすると不自然になりやすい。"],
    ]),
    TR("u", 2, "ウ", "What matters is the attitude of thinking through to the end why it happened, without being afraid of failure.", ["The important thing is to keep thinking until you understand why it happened, without fearing failure."], trRubric(["What matters is", "without being afraid of"], ["think through", "why it happened"], ["最後まで考え抜く", "恐れずに"]), "「大切なのは」＝ What matters is", [
      ["主語", "{{What matters is}} / {{The important thing is}}。"],
      ["考え抜く", "{{think through to the end}} / {{keep thinking until …}}。間接疑問 why it happened。"],
    ]),
  ], 2),
  wsec(3, "tr-seasons", U.wabun, "随筆の和文英訳（季節を感じる）", TR_LEAD, {
    lang: "ja",
    body: `{{ア　冷暖房が普及した今では、季節の移り変わりを肌で感じる機会が減ってしまった。}}{{イ　それでも、ふと窓を開けたときに風のにおいが変わっていることに気づくと、夏が終わったのだと思う。}}{{ウ　便利さと引きかえに、私たちは何を手放してきたのか、ときどき立ち止まって考えてみるのも悪くない。}}`,
  }, [
    TR("a", 2, "ア", "Now that air conditioning has become widespread, we have fewer opportunities to feel the change of the seasons directly.", ["Since air conditioners are now common, we rarely get the chance to experience the changing seasons with our own bodies."], trRubric(["Now that", "fewer opportunities"], ["widespread", "the change of the seasons"], ["普及した今では", "肌で感じる", "減ってしまった"]), "「〜した今では」＝ Now that", [
      ["接続", "「〜した今では」＝ {{Now that S V}}。"],
      ["減った", "「機会が減った」＝ {{we have fewer opportunities to}} …。「肌で」は directly / with our own bodies。"],
    ]),
    TR("i", 3, "イ", "Even so, when I happen to open a window and notice that the smell of the wind has changed, I realize that summer is over.", ["Still, when I open the window without thinking and find that the wind smells different, I feel that summer has ended."], trRubric(["Even so", "notice that", "realize that"], ["happen to", "has changed"], ["ふと", "においが変わっている"]), "「ふと〜する」＝ happen to do", [
      ["ふと", "{{happen to open}} a window / open a window {{without thinking}}。"],
      ["時制", "「変わっている」は現在完了 {{has changed}}。「夏が終わった」は summer {{is over}}。"],
    ]),
    TR("u", 3, "ウ", "It is not a bad idea to stop from time to time and think about what we have given up in exchange for convenience.", ["Now and then, we might do well to pause and ask ourselves what we have lost in return for convenience."], trRubric(["It is not a bad idea to", "what we have given up"], ["in exchange for", "from time to time"], ["引きかえに", "手放してきた", "立ち止まって"]), "「〜も悪くない」＝ It is not a bad idea to", [
      ["構文", "「〜してみるのも悪くない」＝ {{It is not a bad idea to}} …。"],
      ["間接疑問", "{{what we have given up in exchange for convenience}}：現在完了で「手放してきた」。"],
    ]),
  ], 2),
];

// =====================================================================
// 第4問　条件英作文（自由英作文・会話文や文章の空所を英文で補う）
// =====================================================================

const ES_LEAD = "次の問いに英語で答えよ。";
const esRubric = (content: string[], logic: string[]): Rb => [
  ["問いの条件・文脈に合った内容になっている", 8, content],
  ["主張と理由・具体例が論理的につながっている", 7, logic],
  ["文法・語法・つづりの誤りが少ない", 6, []],
  ["語数の条件を守り、自然な英語になっている", 4, []],
];
const ESQ = (id: string, d: 2 | 3, prompt: string, limit: { min: number; max: number }, model: string, rb: Rb, point: string, st: St[]): QuestionB =>
  W(id, d, U.jiyu, prompt, model, rb, point, st, { ...limit, unit: "語" }, 1500);

const P4: ExamPoolSection[] = [
  wsec(4, "es-university", U.jiyu, "自由英作文（高校と大学の学び）", ES_LEAD, {
    lang: "ja",
    body: "高校までの学びと大学での学びは、どのような点で異なると考えるか。",
  }, [
    ESQ("q", 3, "上の問いについて、具体例を1つ挙げて、あなたの考えを英語で述べよ（80〜120語）。", { min: 80, max: 120 },
      `I think the biggest difference is that at university, students are expected to ask their own questions rather than simply answer the ones they are given. In high school, most lessons aim to prepare us for exams, so we usually learn what the textbook says and practice problems that already have correct answers. At university, however, many questions have no single answer. For example, in a history seminar, students might compare several accounts of the same event and decide for themselves which is more convincing. To do this, they must read critically and explain their reasons to others. For this reason, I believe university study requires more independence, but it also offers more freedom to think.`,
      esRubric(["difference", "university", "high school"], ["For example", "For this reason"]), "違いを一つにしぼり、対比と具体例で支える", [
        ["構成", "① 違いを一文で示す ② 高校の場合 ③ {{however}} で大学の場合 ④ {{For example}} ⑤ まとめ。"],
        ["語数", "80〜120語なら主張は{{一つ}}にしぼる。二つ以上並べると具体例が書けなくなる。"],
      ]),
  ]),
  wsec(4, "es-diary", U.jiyu, "条件英作文（会話文の空所補充：紙の日記）", "次の会話文を読み、問いに答えよ。", {
    lang: "en",
    body: `Ken: I've decided to start keeping a diary again, but this time on paper.
Mia: On paper? Why not just use an app on your phone? It's much more convenient.
Ken: That's true, but ( a ).
Mia: I see your point. Still, I'm worried that I would lose a paper diary, or that someone might read it.
Ken: ( b ).
Mia: Maybe I'll give it a try, then.`,
  }, [
    ESQ("q", 2, "空所(a)(b)に、会話の流れに合うように、それぞれ15〜25語程度の英語を書け。(a)では紙の日記のよい点を、(b)ではミアの心配に答える内容を書くこと（合計30〜50語）。", { min: 30, max: 50 },
      `(a) when I write by hand, I have to slow down and think about what really happened, so I remember the day much better
(b) You could keep it in a locked drawer at home, and since it isn't online, nobody could ever hack into it`,
      esRubric(["write by hand", "remember", "drawer"], ["so", "since"]), "空所の前後のせりふとつながるか確かめる", [
        ["(a)", "直前の {{That's true, but}} の後なので、便利さを認めたうえで{{紙ならではの利点}}を書く。小文字で始める。"],
        ["(b)", "Mia の心配は {{lose}} と {{someone might read it}} の二つ。少なくとも一方に具体的に答える。"],
      ]),
  ]),
  wsec(4, "es-translation-ai", U.jiyu, "自由英作文（機械翻訳と外国語学習）", ES_LEAD, {
    lang: "ja",
    body: "機械翻訳がさらに発達しても、外国語を学ぶことには意味があるだろうか。",
  }, [
    ESQ("q", 3, "上の問いについて、あなたの考えを、理由とともに英語で述べよ（80〜120語）。", { min: 80, max: 120 },
      `I believe that learning a foreign language will remain valuable even if machine translation keeps improving. It is true that translation apps already help travelers read menus and ask for directions, and they will probably become even more accurate. However, communication is more than exchanging information. When we speak to people in their own language, we show respect and interest, and this helps build trust in a way that a device cannot. In addition, learning another language teaches us how differently people can see the world. For example, a language may have several words for a feeling that Japanese expresses with only one, and noticing this makes us think about our own culture.`,
      esRubric(["I believe", "machine translation", "language"], ["It is true that", "However", "In addition"]), "譲歩（It is true that）→反論で深める", [
        ["譲歩", "{{It is true that}} 機械翻訳は便利だ、と認めてから {{However}} で自分の主張へ。"],
        ["理由", "理由を二つ（{{信頼}}・{{ものの見方}}）。それぞれ一文以上で具体化する。"],
      ]),
  ]),
  wsec(4, "es-library", U.jiyu, "条件英作文（文章の空所補充：公共図書館）", "次の文章を読み、問いに答えよ。", {
    lang: "en",
    body: `Some people say that public libraries are no longer necessary, because almost any information can now be found online. I disagree. ( a ) For these reasons, I think that cities should continue to support their libraries, even if fewer people come to borrow books.`,
  }, [
    ESQ("q", 2, "空所(a)に、前後の文と論理的につながるように、公共図書館が今も必要である理由を二つ挙げた英文を書け（40〜60語）。", { min: 40, max: 60 },
      `First, a library is one of the few places where anyone can stay for free, whether they want to study quietly, read newspapers or simply escape the summer heat. Second, librarians can help people judge which sources are reliable, which is becoming more important as false information on the internet increases.`,
      esRubric(["First", "Second", "library"], ["For these reasons", "First", "Second"]), "後ろの For these reasons に合わせて理由を二つ", [
        ["文脈", "直後に {{For these reasons}} とあるので、理由を{{二つ}}、First / Second で示す。"],
        ["反論", "前の「情報はネットで見つかる」への答えになる理由（{{場所}}・{{情報の信頼性}}）を選ぶ。"],
      ]),
  ]),
  wsec(4, "es-festival", U.jiyu, "条件英作文（会話文の空所補充：文化祭のキャッシュレス）", "次の会話文を読み、問いに答えよ。", {
    lang: "en",
    body: `Yui: For the school festival, I'd like our class café to accept only cashless payments this year.
Tom: Hmm, I'm not sure that's a good idea. ( a )
Yui: That's a good point. Then how about accepting both cash and cashless payments?
Tom: That sounds better. But if we accept both, ( b )
Yui: OK, let's discuss it with the others tomorrow.`,
  }, [
    ESQ("q", 3, "空所(a)(b)に、会話の流れに合うように、それぞれ15〜25語程度の英語を書け。(a)では反対の理由を具体的に、(b)では両方を受けつける場合に起こりうる問題を書くこと（合計30〜50語）。", { min: 30, max: 50 },
      `(a) Some visitors, like small children and elderly people, may not have a card or a smartphone, so they couldn't buy anything.
(b) we will need someone to look after the cash box and count the money at the end of each day, which takes extra time.`,
      esRubric(["children", "cash", "smartphone"], ["so", "which"]), "(b) は if 節の主節として文を完成させる", [
        ["(a)", "Yui が {{That's a good point}} と認める、具体的な反対理由（支払い手段をもたない客）。"],
        ["(b)", "{{if we accept both,}} に続く主節。we will need … のように{{未来の問題}}を書く。"],
      ]),
  ]),
];

// =====================================================================

export const U_KYODAI_EIGO: UnivExam = {
  key: "kyodai-eigo",
  univ: "京都大学",
  kamoku: "英語",
  tier: "国公立",
  order: 110,
  basis: "文学部など英語150点の学部の傾向を参考",
  format: "大問4題・120分・150点。論説の長文2題は下線部和訳と内容説明の記述が中心で、和文英訳と条件英作文が続く。",
  minutes: 120,
  groups: ["語彙", "文法", "技能"],
  sections: [
    { title: "第1問　長文読解（人文・科学の論説）", lead: READ_LEAD, count: [4, 4], mix: [0, 0.4, 0.6], points: 50, prefer: "material", poolTag: "kyodai-eigo:1" },
    { title: "第2問　長文読解（論説・和訳と内容説明）", lead: READ_LEAD, count: [4, 4], mix: [0, 0.4, 0.6], points: 50, prefer: "material", poolTag: "kyodai-eigo:2" },
    { title: "第3問　和文英訳", lead: TR_LEAD, count: [2, 2], mix: [0, 0.4, 0.6], points: 25, prefer: "material", poolTag: "kyodai-eigo:3" },
    { title: "第4問　条件英作文", lead: ES_LEAD, count: [1, 1], mix: [0, 0.4, 0.6], points: 25, prefer: "material", poolTag: "kyodai-eigo:4" },
  ],
  pool: [...P1, ...P2, ...P3, ...P4],
};
