import type { UnivExam } from "./types";
import type { ExamPoolSection } from "../pool/types";
import type { QuestionB, Skill, SolutionStep } from "@/lib/moshi/types";

// 慶應義塾大学型 英語（早慶上智）。経済学部の一般選抜の傾向を参考にした形式（英文・設問はすべて書き下ろし）。
//   100分・200点・大問5題。I〜III は社会・経済・科学の論説の長文読解（マーク：空所補充・下線部の意味・内容一致・
//   筆者の立場・アクセント）、IV は会話文・短い論評の和文英訳（記述）、V は資料の見解を引用して論じる自由英作文（記述）。
//   英文の題材・登場する会社や町・資料の著者名はすべて架空。実在の人物の発言は使っていない。
// 参考:
//   https://study-search.jp/columns/238 （経済学部の英語：100分・200点・大問5題・長文3題＋和文英訳＋自由英作文）
//   https://www.haradaeigo.com/?p=13553 （経済学部の英語：各長文の語数・設問形式・自由英作文の条件）
//   https://passnavi.obunsha.co.jp/univ/2370/subject/?facultyID=010 （経済学部の配点と出題範囲）

const U = {
  chobun: "h-eng-skill-chobun",
  wabun: "h-eng-skill-wabun",
  jiyu: "h-eng-skill-jiyu",
  vocab: "h-eng-vocab-2000",
  jukugo: "h-eng-vocab-jukugo",
  hatsuon: "h-eng-vocab-hatsuon",
  setsuzoku: "h-eng-gram-setsuzokushi",
  tokushu: "h-eng-gram-tokushu",
  hikaku: "h-eng-gram-hikaku",
  bunshi: "h-eng-gram-bunshikobun",
  futeishi: "h-eng-gram-futeishi",
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
  return { id, type: "B", difficulty, points: 6, seconds: 120, skill: K, unit, prompt, answer: { kind: "order", tokens }, point, steps: steps(st) };
}

/** 英作文 (和文英訳・自由英作文) */
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

const READ_LEAD = "次の英文を読み、空所・下線部に関する問いに答えよ。";

function reading(tag: number, id: string, title: string, ptitle: string, body: string, questions: QuestionB[], notes?: { word: string; meaning: string }[]): ExamPoolSection {
  return {
    unit: U.chobun,
    tag: `keio-eigo:${tag}`,
    section: {
      id: `keio-en-${id}`,
      title,
      lead: READ_LEAD,
      style: "reading",
      examOnly: true,
      material: [{ kind: "passage", lang: "en", title: ptitle, body, ...(notes ? { notes } : {}) }],
      pick: 8,
      questions,
    },
  };
}

// =====================================================================
// 第1問　長文読解（社会・経済の論説：ある政策・考え方を支持する立場）
// =====================================================================

const P1: ExamPoolSection[] = [
  reading(
    1,
    "four-day-week",
    "週4日勤務を支持する論説",
    "The Quiet Case for a Shorter Working Week",
    `For most of the twentieth century, the length of the working week fell steadily in industrial economies. Workers who had once spent six long days in factories gradually won the right to a two-day weekend, and many economists assumed that the trend would continue as machines took over more routine tasks. Yet for several decades the standard week has hardly moved. People now carry computers in their pockets that are far more powerful than the machines that guided the first astronauts to the moon, and still they work roughly the same hours as their grandparents did. [ 1 ], it is worth asking whether the five-day week is a law of nature or simply a habit.

Supporters of a four-day week begin with a simple observation: the number of hours a person spends at work is a poor measure of what that person produces. Anyone who has sat through a meeting that could have been an email knows that time at a desk is not the same as useful effort. Most office workers will admit that they are truly productive for only part of the day, and that their concentration declines sharply after a certain point. If that is true, cutting the week from five days to four need not reduce output by a fifth. It might reduce it by much less, or {{(A) not at all}}, if workers use the remaining time more carefully.

Consider a mid-sized design company, which we will call Northbank. When its managers announced a trial in which staff would work four eight-hour days for the same pay, many employees were [ 2 ]. Some feared that they would simply be asked to squeeze five days of work into four, leaving them more exhausted than before. In the first month, there were indeed problems: clients complained that calls went unanswered on Fridays, and several teams struggled to finish projects on time. But the company responded by changing how work was organized rather than abandoning the experiment. Meetings were limited to thirty minutes, staff agreed to check messages only at set times, and a rotating group answered client calls on the day off. By the end of the trial, the firm had completed as many projects as in the previous year, while the number of sick days had fallen noticeably.

The Northbank story illustrates a point that is often missed in debates about working time. A shorter week is not merely a reward that employers give to their staff; it is a constraint that forces an organization to [ 3 ] what really matters. When time is plentiful, waste goes unnoticed. When it is scarce, people begin to question every meeting, every report, and every approval process that slows them down. {{(B) In this sense, the extra day off works less like a holiday than like a deadline.}}

There are also benefits that do not appear in a company's accounts. Workers with an extra free day can care for children or elderly parents, pursue further education, or simply rest. Parents, in particular, may find it easier to remain in full-time employment rather than being pushed into part-time jobs that pay less and offer fewer chances of promotion. Over time, this could help narrow the gap in earnings between men and women, since it is still more often women who cut their working hours when family responsibilities grow. A shorter week might even benefit the environment: fewer days of commuting mean less traffic and lower energy use in office buildings.

None of this means that a four-day week can be introduced everywhere overnight. Hospitals, schools and shops cannot simply close for an extra day, and in such places the change would require hiring more staff, which costs money. Critics are right to point out that many of the most encouraging trials have taken place in office-based businesses, where a culture of long hours may have hidden a good deal of inefficiency. [ 4 ], supporters would be wise to claim less than they sometimes do. The lesson of these trials is not that every workplace should follow the same model. It is that the length of the working week is a choice, and like any choice, it deserves to be examined rather than simply inherited.`,
    [
      C("blank1", 2, U.setsuzoku, "空所［ 1 ］に入る最も適切なものを選べ。", ["In light of this", "By contrast", "For instance", "On the other hand"], 0, [
        "正解。「技術は進んだのに労働時間は変わらない」という前の内容を受けて「これをふまえると」と問いを立てる流れ。",
        "対比のつなぎ。前の内容と反対のことを述べてはいない。",
        "具体例を出すつなぎ。後ろは例ではなく問題提起。",
        "別の面を示すつなぎ。前の内容をふまえて結論的に問いを立てる文には合わない。",
      ], "前の段落の事実を受けて問いを立てる流れ", [
        ["前後の関係", "前：技術は大きく進歩したのに{{労働時間はほぼ同じ}}。後：週5日は自然の法則か、ただの習慣か{{問うべきだ}}。"],
        ["つなぎを決める", "前の事実を根拠に問いを立てるので {{In light of this}}（これをふまえると）。"],
      ], K),
      C("blank2", 1, U.vocab, "空所［ 2 ］に入る最も適切なものを選べ。", ["skeptical", "delighted", "grateful", "careless"], 0, [
        "正解。直後に「5日分の仕事を4日に詰めこまされるのでは」と心配した社員の話が続く。",
        "喜んだのなら、直後の Some feared … とつながらない。",
        "感謝は、直後の不安の内容と合わない。",
        "「不注意な」は、試行への反応を表す語として文脈に合わない。",
      ], "直後の具体的な説明が空所の言いかえ", [
        ["直後を見る", "{{Some feared that …}}：仕事を詰めこまされ、かえって疲れるのではと恐れた。"],
        ["語を選ぶ", "提案を疑ってかかる態度なので {{skeptical}}（懐疑的な）。"],
      ], K),
      C("blank3", 2, U.vocab, "空所［ 3 ］に入る最も適切なものを選べ。", ["identify", "ignore", "postpone", "exaggerate"], 0, [
        "正解。時間が限られると、何が本当に大事かを見きわめざるをえない、という流れ。",
        "直後で「むだを問い直す」とあり、大事なことを無視するのでは逆。",
        "「先送りする」では、制約が組織に何かを強いるという意味にならない。",
        "「誇張する」は、むだを見直す話と合わない。",
      ], "constraint（制約）が何を強いるかを考える", [
        ["前後の文", "When it is scarce, people begin to {{question every meeting}}…：時間が乏しいとむだを問い直す。"],
        ["語を選ぶ", "本当に大切なことを{{見きわめる}}よう強いる → {{identify}}。"],
      ], K),
      C("blank4", 3, U.setsuzoku, "空所［ 4 ］に入る最も適切なものを選べ。", ["For this reason", "Nevertheless", "Otherwise", "Above all"], 0, [
        "正解。批判にも一理ある（成功例はオフィス中心）ので、支持者は主張をひかえめにすべきだ、という因果の流れ。",
        "逆接。批判を認めたことと「主張をひかえめに」は対立せず、むしろ結果の関係。",
        "「さもなければ」は前の条件が満たされない場合を述べるつなぎで、ここには合わない。",
        "「何よりも」は、いくつかの点のうち最重要のものを示すつなぎで、因果を表せない。",
      ], "譲歩を認めた結果、どうすべきかを述べる", [
        ["前の文", "Critics are {{right}}：成功した試行の多くは、むだが隠れていたオフィスでのもの。"],
        ["後の文", "支持者は{{主張をひかえめに}}すべき。前が理由、後が結論なので {{For this reason}}。"],
      ]),
      C("not-at-all", 2, U.chobun, "下線部(A)の意味として最も適切なものを選べ。", [
        "a four-day week might not reduce output at all",
        "workers might not use their time carefully at all",
        "concentration might not decline at all",
        "output might not be measured at all",
      ], 0, [
        "正解。It might reduce it by much less, or not at all の省略を補うと it might not reduce it (= output) at all。",
        "主語は「週4日にすること」で、労働者の時間の使い方ではない。",
        "集中力の低下は前の文の話で、この文の主語・目的語とは別。",
        "測定の話ではなく、生産量が減るかどうかの話。",
      ], "or のあとの省略は前の動詞と目的語を補う", [
        ["省略を補う", "It might reduce it by much less, or (it might reduce it) {{not at all}}。"],
        ["指すものを確かめる", "it は cutting the week（週を短くすること）、目的語の it は {{output}}。"],
      ]),
      C("holiday-deadline", 3, U.chobun, "下線部(B)の内容として最も適切なものを選べ。", [
        "休みが1日増えることは、くつろぐ時間というより、仕事のむだを見直させる期限のようにはたらく。",
        "休みの日にも、締め切りに追われて働かなければならなくなる。",
        "休みが1日増えると、社員は休暇を取ることをためらうようになる。",
        "休みを増やすには、まず仕事の締め切りを延ばす必要がある。",
      ], 0, [
        "正解。前の文の「時間が乏しいと、会議や報告をいちいち問い直す」を受け、制約としての休日を「期限」にたとえている。",
        "休日に働くという話は本文にない。比喩を文字どおりに取っている。",
        "休暇を取るのをためらうという記述はない。",
        "締め切りを延ばすとは書いていない。むしろ時間を限ることの効果を述べている。",
      ], "less A than B は「A というより B」", [
        ["構文", "works {{less like a holiday than like a deadline}}：休日のようというより期限のようにはたらく。"],
        ["前の文と結ぶ", "期限があると人はむだを削る。休みの1日も同じく{{むだを見直させる}}はたらきをする。"],
      ]),
      C("northbank", 2, U.chobun, "第3段落の内容と一致するものを選べ。", [
        "Northbank changed the way work was organized when the trial ran into early difficulties.",
        "Northbank's employees worked ten-hour days so that they could take Fridays off.",
        "By the end of the trial, Northbank had completed more projects than in the previous year.",
        "Clients were satisfied with the new schedule from the very first month.",
      ], 0, [
        "正解。the company responded by changing how work was organized rather than abandoning the experiment に一致。",
        "本文は four eight-hour days（1日8時間×4日）。10時間ではない。",
        "本文は as many projects as in the previous year（前年と同じ数）。more ではない。",
        "最初の月は clients complained（苦情があった）。",
      ], "数の比較（as many as / more）に注意", [
        ["選択肢を照らす", "勤務時間は{{eight-hour days}}、成果は{{as many projects as}}前年。"],
        ["一致を確かめる", "問題が起きたとき、試行をやめずに{{仕事の進め方を変えた}}。"],
      ]),
      C("benefits", 3, U.chobun, "第5段落の内容と一致するものを選べ。", [
        "A shorter week could make it easier for parents to stay in full-time jobs.",
        "Women already reduce their working hours less often than men do.",
        "The benefits of a shorter week are easy to see in a company's accounts.",
        "A four-day week would increase the energy used in office buildings.",
      ], 0, [
        "正解。Parents … may find it easier to remain in full-time employment に一致。",
        "本文は it is still more often women who cut their working hours（時間を減らすのはまだ女性のほうが多い）で逆。",
        "段落の冒頭は benefits that do not appear in a company's accounts（帳簿に出ない利点）。",
        "本文は lower energy use（エネルギーの使用が減る）。",
      ], "比較の主語の向き（more often women）を正確に", [
        ["根拠", "Parents … may find it easier to {{remain in full-time employment}}。"],
        ["誤りの確認", "時間を減らすのは{{more often women}}、エネルギーは{{lower}}。"],
      ]),
      C("author-critics", 3, U.chobun, "最終段落での筆者の考えとして最も適切なものを選べ。", [
        "The author accepts some of the critics' points but still believes the length of the working week should be reconsidered.",
        "The author rejects the critics' views and insists that every workplace should adopt a four-day week at once.",
        "The author agrees with the critics that the five-day week cannot be changed.",
        "The author argues that hospitals and schools are the best places to begin four-day trials.",
      ], 0, [
        "正解。Critics are right … と一部を認めつつ、the length of the working week is a choice … deserves to be examined と結ぶ。",
        "筆者は not that every workplace should follow the same model と述べ、一律の導入を主張していない。",
        "筆者は週の長さを「選択」とし、変えられないとは考えていない。",
        "病院・学校は「すぐには休めない」例として挙げられている。",
      ], "譲歩（Critics are right）と主張を分ける", [
        ["譲歩", "{{Critics are right}}：成功例はオフィスに多い。"],
        ["主張", "週の長さは{{a choice}}であり、受け継ぐだけでなく{{examined}}されるべき。"],
      ]),
      C("title", 2, U.chobun, "本文の表題として最も適切なものを選べ。", [
        "Working Time as a Choice Worth Examining",
        "Why Machines Will Soon Replace Office Workers",
        "The Failure of a Design Company's Experiment",
        "How Hospitals Can Close One Day a Week",
      ], 0, [
        "正解。最終文の the length of the working week is a choice … deserves to be examined が全体の主張。",
        "機械が人に代わる話は導入の背景にすぎない。",
        "Northbank の試行は成功例として紹介されている。",
        "病院はすぐには導入できない例で、主題ではない。",
      ], "表題は最終段落の主張から選ぶ", [
        ["主張を探す", "最終段落：週の長さは{{a choice}}で、検討に値する。"],
        ["選ぶ", "部分的な話題（機械・病院）ではなく、全体を覆うものを選ぶ。"],
      ]),
      O("only-when", 3, U.tokushu, "第4段落の内容をふまえ、「時間が乏しくなって初めて、人はむだに気づく」という意味になるように語句を並べかえよ。", ["Only", "when", "time", "is", "scarce", "do", "people", "notice", "waste."], "Only＋副詞節が文頭に出ると倒置", [
        ["骨組み", "「〜して初めて」＝ {{Only when 〜}}。文頭に置くと、後ろの主節は疑問文の語順になります。"],
        ["倒置", "people notice → {{do people notice}} waste。"],
      ]),
    ],
    [
      { word: "constraint", meaning: "制約" },
      { word: "inherit", meaning: "（前の世代から）受け継ぐ" },
    ],
  ),
  reading(
    1,
    "congestion",
    "都市の渋滞課金を支持する論説",
    "Paying for the Road",
    `Few things in modern city life seem as free as a public road. Drivers pay for fuel, insurance and parking, but once they have entered the street, they may use it for as long as they like without paying anything more. Economists have long argued that this arrangement, however natural it may seem, is the main reason why traffic jams are so hard to cure. When something valuable is given away at no charge, people tend to use too much of it, and road space at rush hour is very valuable indeed.

The logic is easiest to see by thinking about a single driver. When she decides to drive into the city center at eight in the morning, she considers her own costs: the time she will spend in traffic, the price of fuel, and perhaps the stress of finding a parking space. What she does not consider is the delay that her car imposes on everyone else. Each additional vehicle slows the flow of traffic slightly, and at busy times these small delays add up to a large loss shared by thousands of people. Because no driver pays for the time {{(A) he or she takes from others}}, the roads become more crowded than anyone would choose if they could all agree in advance.

Congestion pricing attempts to [ 1 ] this problem by charging drivers a fee for entering busy areas at busy times. The fee is not meant to punish drivers but to make visible a cost that was previously hidden. Some trips that seemed worthwhile when the road was free will no longer seem so. A delivery might be moved to the afternoon, a shopping trip might be combined with another errand, and some commuters might take a train or a bus instead. Only a modest share of drivers need to change their behavior for traffic to flow much more smoothly, because congestion grows rapidly once a road is close to its capacity.

Imagine a city, which we will call Calverton, whose council introduces such a charge for its central district. In the months before the scheme begins, opinion polls show that most residents oppose it. Shop owners warn that customers will stay away, and drivers complain that they are being asked to pay twice for roads their taxes have already built. Yet a year after the charge is introduced, the picture looks rather different. Bus journeys have become faster and more reliable, the air in the center is noticeably cleaner, and the number of people walking along the main shopping streets has risen. [ 2 ], support for the charge has grown, and a proposal to abolish it is defeated in a local vote.

This pattern, in which strong opposition before a scheme begins is followed by acceptance once its effects can be seen, is worth taking seriously. It suggests that people judge such policies less by abstract arguments than by their own experience. {{(B) Before the charge, the benefits are imaginary while the costs are only too real.}} After it, residents can see the emptier lanes and the punctual buses for themselves.

Critics raise a serious objection: a flat fee is harder for poor drivers to bear than for rich ones. A nurse who must drive to an early shift may pay the same charge as a wealthy executive, yet the payment takes a much larger share of her income. This concern is real, but it is an argument for designing the scheme carefully rather than for [ 3 ] it altogether. The money raised can be used to improve public transport, which is used more heavily by people on lower incomes, and discounts can be offered to essential workers or to residents with disabilities. In many cities, in fact, a large number of the poorest households do not own a car at all, and they are among the main beneficiaries of faster buses and cleaner air.

Roads will never be truly free; the only question is how we pay for them. At present we pay in wasted hours, polluted air and unreliable journeys, and we pay whether or not we drive. A price at the entrance to the city is simply a more honest way of [ 4 ] the bill.`,
    [
      C("blank1", 2, U.vocab, "空所［ 1 ］に入る最も適切なものを選べ。", ["address", "create", "ignore", "repeat"], 0, [
        "正解。address a problem＝問題に取り組む。料金で渋滞を減らそうとする試みの説明。",
        "渋滞課金が問題を「生み出す」のでは、後の説明（交通が円滑になる）と逆。",
        "「無視する」では、料金を課す目的の説明にならない。",
        "「くり返す」は文脈に合わない。",
      ], "address a problem（問題に取り組む）", [
        ["文の役割", "Congestion pricing が料金によって渋滞の問題に{{取り組む}}しくみを説明する文。"],
        ["語法", "{{address}} は「（問題に）取り組む・対処する」。"],
      ], K),
      C("blank2", 2, U.setsuzoku, "空所［ 2 ］に入る最も適切なものを選べ。", ["As a result", "In contrast", "Until then", "Instead"], 0, [
        "正解。バスが速くなり空気がきれいになった結果、支持が増えた、という因果。",
        "前の改善と、支持が増えたことは対立しない。",
        "「それまでは」では、1年後の変化を受ける文にならない。",
        "「代わりに」は、前のことをしないで別のことをする意味。",
      ], "良い変化 → 支持の増加は因果", [
        ["前", "バスが{{速く}}、空気が{{きれいに}}、歩く人が{{増えた}}。"],
        ["後", "支持が増え、廃止案は否決。前が原因なので {{As a result}}。"],
      ], K),
      C("blank3", 2, U.bunshi, "空所［ 3 ］に入る最も適切なものを選べ。", ["rejecting", "improving", "designing", "supporting"], 0, [
        "正解。「慎重に設計することの根拠であって、まるごと退けることの根拠ではない」。altogether と合う。",
        "改善は「慎重に設計する」と同じ方向で、rather than の対比にならない。",
        "designing は前の語と同じで対比にならない。",
        "批判を受けて「支持すること」の根拠ではない、では意味が通らない。",
      ], "rather than の前後は対比になる", [
        ["対比を見る", "an argument for {{designing carefully}} rather than for [ 3 ] it {{altogether}}。"],
        ["選ぶ", "「慎重に設計する」の反対で、altogether（まったく）と合う {{rejecting}}。"],
      ], K),
      C("blank4", 3, U.vocab, "空所［ 4 ］に入る最も適切なものを選べ。", ["settling", "hiding", "avoiding", "delaying"], 0, [
        "正解。settle the bill＝勘定を支払う。料金は、すでに払っている費用を「より正直に支払う」方法。",
        "「隠す」は honest と矛盾する。",
        "筆者は、どのみち費用は払っていると述べており、「避ける」方法ではない。",
        "「先延ばし」は honest way の説明にならない。",
      ], "settle the bill＝支払いをすませる", [
        ["前の文", "今も、むだな時間・汚れた空気で{{払っている}}。"],
        ["語を選ぶ", "料金は、その勘定を{{より正直に払う}}方法 → {{settling}}。"],
      ], K),
      C("takes-from", 2, U.chobun, "下線部(A)の内容として最も適切なものを選べ。", [
        "the time other drivers lose because of his or her car",
        "the time he or she spends looking for a parking space",
        "the time he or she saves by driving instead of taking a bus",
        "the time other drivers spend paying a fee",
      ], 0, [
        "正解。前の文の the delay that her car imposes on everyone else（自分の車がほかの人に与える遅れ）の言いかえ。",
        "駐車場探しは、本人が考える自分の費用。",
        "バスとの比較は述べていない。",
        "この段落では料金はまだ出てこない。",
      ], "下線部は前の文の言いかえ", [
        ["前の文", "What she does not consider is {{the delay that her car imposes on everyone else}}。"],
        ["結ぶ", "ほかの人から「奪う」時間＝自分の車のせいで{{他人が失う時間}}。"],
      ]),
      C("imaginary", 3, U.chobun, "下線部(B)の内容として最も適切なものを選べ。", [
        "導入前は、料金を払う負担ははっきり感じられるが、渋滞が減るなどの利点は想像するしかない。",
        "導入前は、料金の利点は誰の目にも明らかだが、費用がいくらかかるかはわからない。",
        "導入後も、料金の利点は想像上のものにすぎず、負担だけが残る。",
        "導入前は、利点も負担もどちらも実際には存在しない。",
      ], 0, [
        "正解。直前の「人は抽象的な議論より自分の経験で判断する」と、直後の「導入後は空いた車線を自分の目で見られる」をつなぐ文。",
        "利点と費用の関係が逆。",
        "直後の文で、導入後は利点が目に見えると述べている。",
        "costs are only too real（費用はあまりにも現実的）と矛盾する。",
      ], "Before と After の対比で読む", [
        ["対比", "Before：利点は{{imaginary}}、費用は{{only too real}}。After：利点を{{自分の目で見られる}}。"],
        ["意味", "only too ～＝「残念ながら非常に～」。負担だけが実感される。"],
      ]),
      C("single-driver", 2, U.chobun, "第2段落の内容と一致するものを選べ。", [
        "A driver deciding whether to make a trip usually does not take into account how her car slows down others.",
        "A single extra car has no effect at all on the flow of traffic.",
        "Drivers always agree in advance about how crowded the roads should be.",
        "The price of fuel is the only cost that drivers consider.",
      ], 0, [
        "正解。What she does not consider is the delay that her car imposes on everyone else に一致。",
        "本文は slows the flow of traffic slightly（わずかに遅らせる）。影響がないのではない。",
        "本文は if they could all agree in advance と仮定で述べており、実際には合意できない。",
        "時間・燃料代・駐車のストレスなど複数の費用を考える。",
      ], "仮定の if と事実を区別する", [
        ["根拠", "{{What she does not consider}} is the delay … と、考えない費用を明示。"],
        ["誤りの確認", "1台の影響は{{slightly}}。費用は燃料代だけではない。"],
      ]),
      C("modest-share", 3, U.chobun, "第3段落の内容と一致するものを選べ。", [
        "Traffic can improve greatly even if only a small proportion of drivers change their behavior.",
        "The main purpose of the fee is to punish drivers who enter the city.",
        "Most drivers must give up their cars for congestion pricing to work.",
        "Congestion grows slowly even when a road is close to its capacity.",
      ], 0, [
        "正解。Only a modest share of drivers need to change their behavior for traffic to flow much more smoothly に一致。",
        "本文は The fee is not meant to punish drivers（罰するためではない）。",
        "少数が行動を変えればよい、と述べている。",
        "本文は congestion grows rapidly（急速に増える）。",
      ], "modest share＝ほどほどの割合", [
        ["根拠", "{{Only a modest share}} of drivers need to change …"],
        ["理由", "容量に近い道路では渋滞が{{rapidly}}増えるので、少し減るだけで大きく改善する。"],
      ]),
      C("calverton", 2, U.chobun, "第4段落の Calverton について、本文の内容と一致するものを選べ。", [
        "Support for the charge increased after it had been in place for about a year.",
        "Shop owners welcomed the charge from the beginning.",
        "Fewer people walked along the main shopping streets after the charge began.",
        "Residents voted to abolish the charge in a local vote.",
      ], 0, [
        "正解。a year after the charge is introduced … support for the charge has grown に一致。",
        "Shop owners warn that customers will stay away と、反対していた。",
        "本文は the number of people walking … has risen（増えた）。",
        "廃止の提案は is defeated（否決された）。",
      ], "変化の前と後を分けて読む", [
        ["前", "多くの住民が反対、商店主も{{警告}}。"],
        ["後", "1年後には支持が{{増え}}、廃止案は{{否決}}。"],
      ]),
      C("fairness", 3, U.chobun, "第6段落で、筆者は「料金は貧しい人に重い」という批判にどう答えているか。最も適切なものを選べ。", [
        "It accepts the concern as real but argues that careful design, such as discounts and better public transport, can deal with it.",
        "It denies that a flat fee places a heavier burden on people with low incomes.",
        "It concludes that the charge should be abolished because it is unfair to nurses.",
        "It argues that wealthy executives should be banned from driving into the city.",
      ], 0, [
        "正解。This concern is real, but … designing the scheme carefully … discounts … improve public transport に一致。",
        "筆者は This concern is real と、批判を認めている。",
        "廃止ではなく、慎重な設計を主張している。",
        "運転の禁止は述べていない。",
      ], "認める（real）→ しかし（but）→ 対案", [
        ["譲歩", "{{This concern is real}}：批判を認める。"],
        ["反論", "but 以下：収入を{{公共交通}}に使い、{{割引}}を設ければよい。"],
      ]),
      O("the-closer", 3, U.hikaku, "第3段落の内容をふまえ、「道路が容量に近ければ近いほど、渋滞は速く増える」という意味になるように語句を並べかえよ。", ["The closer", "a road", "is", "to", "its capacity,", "the faster", "congestion", "grows."], "the＋比較級 …, the＋比較級 ～", [
        ["構文", "「～すればするほど…」＝ {{The＋比較級 S V, the＋比較級 S V}}。"],
        ["組み立て", "The closer a road is to its capacity, {{the faster congestion grows}}。"],
      ]),
    ],
    [
      { word: "impose", meaning: "（負担などを）負わせる" },
      { word: "capacity", meaning: "容量・収容力" },
      { word: "abolish", meaning: "廃止する" },
    ],
  ),
  reading(
    1,
    "nudge",
    "「選択の設計」を支持する論説",
    "Designing Better Choices",
    `Traditional economics pictured the consumer as a careful calculator who weighs every option and chooses the one that serves her best. Real people are rather different. We postpone decisions, we stick with whatever is already in place, and we are easily influenced by the order in which options are presented. In recent decades, a number of researchers have argued that governments and businesses should take these habits into account when they design the choices people face. Their approach is often described as "nudging": changing the way options are arranged so that people are more likely to choose well, without forbidding any option or significantly changing its price.

The best-known example concerns saving for retirement. In many companies, employees used to join a pension plan only if they filled out a form. Although most of them said they wanted to save more, large numbers never got around to signing up. When some employers reversed the rule, so that workers were enrolled automatically unless they chose to leave, participation rose dramatically. Nothing about the plan itself had changed. Workers remained completely free to [ 1 ], and a single form was all it took. What changed was the default, the outcome that occurs when a person does nothing.

Defaults are powerful because doing nothing is easy. {{(A) Every decision, however small, demands a little attention}}, and attention is a resource most of us have in short supply. When the default is a sensible one, people who are busy, distracted, or simply unsure end up in a reasonable position. When it is a poor one, the same people are quietly harmed. Since some option must always be the default, the designers of a system cannot avoid influencing the result; [ 2 ] is whether they do so thoughtfully or carelessly.

Consider a school cafeteria. A manager who places fruit at eye level near the cash register and moves sugary desserts to a lower shelf at the back has not banned anything. A student who wants cake can still buy it. Yet small changes in placement of this kind can shift what people choose, because many decisions about food are made quickly and without much thought. Critics sometimes describe such arrangements as manipulation. Supporters reply that there is no neutral way to arrange a cafeteria. The food has to be put somewhere, and {{(B) a layout chosen at random is no more respectful of students' freedom than one chosen with their health in mind}}.

Nudges also have the practical advantage of being cheap. Sending a letter that tells households how their energy use compares with that of their neighbors, or simplifying a complicated application form, costs little compared with building new programs or offering financial rewards. For governments with tight budgets, this is an attractive feature. A simplified form that allows more eligible students to apply for financial aid may do more good than an increase in the aid itself, if the original form was so confusing that many students [ 3 ] applying.

This does not mean that nudges can solve every problem. Some challenges, such as climate change or poverty, are too large to be addressed by rearranging options; they require taxes, regulations and investment. Nudges work best at the margins, helping people act on intentions they already have. There is also a legitimate concern about transparency. A nudge that would only work if people did not know about it should make us uneasy. The best nudges are those that could be announced openly without losing their effect. An automatic pension plan, for instance, works just as well when employees are told exactly how it operates.

The deeper lesson of this research is that freedom of choice and the design of choices are not opposites. People are always choosing within some structure, whether or not anyone intended it. [ 4 ] that structure is designed with care, it is likely to serve the interests of whoever happened to build it rather than those of the people who use it.`,
    [
      C("blank1", 2, U.jukugo, "空所［ 1 ］に入る最も適切なものを選べ。", ["opt out", "sign up", "save more", "retire early"], 0, [
        "正解。自動加入でも、用紙1枚で「抜ける」自由は残っていた。unless they chose to leave と対応。",
        "自動で加入しているので、「申しこむ」自由では意味が通らない。",
        "直後の a single form was all it took（用紙1枚で済んだ）と合わない。",
        "退職の時期の話はしていない。",
      ], "opt out＝（制度から）抜ける", [
        ["前の文", "workers were enrolled automatically {{unless they chose to leave}}。"],
        ["選ぶ", "制度は変わらず、{{抜ける}}自由も残っていた → {{opt out}}。"],
      ], K),
      C("blank2", 2, U.bunshi, "空所［ 2 ］に入る最も適切なものを選べ。", ["the only question", "the main exception", "no one knows", "it is unclear"], 0, [
        "正解。設計者が影響を与えることは避けられない。だから「唯一の問題は、それを慎重にするか不注意にするかだ」。",
        "例外の話ではない。",
        "「誰も知らない」では、前の「避けられない」からの論理がつながらない。",
        "it is unclear whether … の形にはなるが、筆者の主張（どう設計するかが大事）を表さない。",
      ], "「避けられない」→「問題はどうするかだ」", [
        ["前半", "設計者は結果に影響を与えることを{{避けられない}}。"],
        ["後半", "{{the only question is whether}} …：問題は慎重にやるかどうかだけ。"],
      ], K),
      C("blank3", 1, U.jukugo, "空所［ 3 ］に入る最も適切なものを選べ。", ["gave up", "insisted on", "looked forward to", "succeeded in"], 0, [
        "正解。用紙が分かりにくすぎて、多くの学生が申請を「あきらめた」。",
        "「申請を強く求めた」では、用紙が分かりにくいことと合わない。",
        "「楽しみにした」は文脈に合わない。",
        "申請に成功したのなら、用紙を簡単にする意味がない。",
      ], "give up ～ing＝～するのをあきらめる", [
        ["文脈", "用紙が{{so confusing}}（とても分かりにくい）だった。"],
        ["選ぶ", "その結果、申請を{{gave up}}（あきらめた）。"],
      ], K),
      C("blank4", 3, U.setsuzoku, "空所［ 4 ］に入る最も適切なものを選べ。", ["Unless", "Because", "Once", "Since"], 0, [
        "正解。「慎重に設計されないかぎり、作った人の利益に役立ちがちだ」。",
        "「慎重に設計されているので作った人の利益に役立つ」では、筆者の主張と逆。",
        "「いったん慎重に設計されると作った人の利益に…」では意味が通らない。",
        "Since も理由を表し、Because と同じく意味が逆になる。",
      ], "否定の条件 unless＝～しないかぎり", [
        ["後半", "it is likely to serve the interests of {{whoever happened to build it}}：作った人の都合に合う。"],
        ["条件", "それは慎重に設計{{されないとき}}に起きる → {{Unless}}。"],
      ], K),
      C("attention", 2, U.chobun, "下線部(A)の内容として最も適切なものを選べ。", [
        "どんなに小さな決定でも、いくらかの注意力を必要とする。",
        "小さな決定ほど、多くの注意を集めてしまう。",
        "決定をするたびに、注意力は少しずつ増えていく。",
        "小さな決定には、注意を払う必要がまったくない。",
      ], 0, [
        "正解。however small は「どんなに小さくても」。demand は「必要とする」。",
        "「小さいほど多く」という比例の意味はない。",
        "直後で、注意力は short supply（不足しがち）と述べている。",
        "demands a little attention と矛盾する。",
      ], "however＋形容詞＝どんなに～でも", [
        ["構文", "{{however small}}（どんなに小さくても）は挿入された譲歩。"],
        ["つながり", "注意力は{{不足しがち}}なので、何もしない（デフォルトに従う）ほうが楽。"],
      ]),
      C("layout", 3, U.chobun, "下線部(B)の内容として最も適切なものを選べ。", [
        "でたらめに決めた配置も、健康を考えて決めた配置と同じく、生徒の自由をより尊重しているわけではない。",
        "でたらめに決めた配置のほうが、健康を考えた配置よりも生徒の自由を尊重している。",
        "健康を考えた配置は、生徒の自由をまったく尊重していない。",
        "生徒の自由を守るためには、配置はでたらめに決めるべきだ。",
      ], 0, [
        "正解。no more A than B は「B と同様に A でない」。でたらめの配置が自由を尊重する度合いは、健康を考えた配置より上ではない。",
        "no more … than は「より～だ」の意味にはならない。",
        "健康を考えた配置を否定する文ではない。",
        "支持者の主張は「中立な配置はない」で、でたらめを勧めていない。",
      ], "no more … than は両方を否定的に比べる", [
        ["構文", "A is {{no more}} respectful {{than}} B：A は B と比べて少しも尊重的でない。"],
        ["文脈", "支持者は「{{中立な配置はない}}」と答えている。どこかに置くなら健康を考えてよい。"],
      ]),
      C("pension", 2, U.chobun, "第2段落の内容と一致するものを選べ。", [
        "Participation in the pension plan rose even though the plan itself remained the same.",
        "Employees joined the plan because the employer offered them higher wages.",
        "Most employees said they did not want to save for retirement.",
        "After the change, employees could no longer leave the plan.",
      ], 0, [
        "正解。participation rose dramatically. Nothing about the plan itself had changed に一致。",
        "賃金の上乗せの話はない。変わったのはデフォルトだけ。",
        "本文は most of them said they wanted to save more（もっと貯めたいと言った）。",
        "抜ける自由は残っていた（unless they chose to leave）。",
      ], "変わったのはデフォルトだけ", [
        ["根拠", "参加は{{rose dramatically}}、しかし{{Nothing about the plan itself had changed}}。"],
        ["誤りの確認", "社員は貯金を{{望んでいた}}。抜けることも{{できた}}。"],
      ]),
      C("cheap", 2, U.chobun, "第5段落の内容と一致するものを選べ。", [
        "Making an application form simpler can sometimes help more students than increasing the amount of aid.",
        "Nudges are attractive to governments because they are more expensive than financial rewards.",
        "Letters comparing a household's energy use with its neighbors' are costly to send.",
        "Governments with tight budgets should stop offering financial aid.",
      ], 0, [
        "正解。A simplified form … may do more good than an increase in the aid itself に一致。",
        "本文は being cheap（安いこと）が利点。",
        "本文は costs little（費用は少ない）。",
        "援助をやめよとは述べていない。",
      ], "may do more good than＝～よりも役に立ちうる", [
        ["根拠", "簡単な用紙は{{援助額を増やすより}}役立つことがある。"],
        ["条件", "元の用紙が分かりにくく、多くの学生が申請をあきらめていた場合。"],
      ]),
      C("transparency", 3, U.chobun, "第6段落の内容と一致するものを選べ。", [
        "The author thinks a good nudge should still work even when people are told about it.",
        "The author believes nudges are the best way to solve climate change.",
        "The author argues that nudges work only if people do not know about them.",
        "The author thinks automatic pension plans stop working once employees understand them.",
      ], 0, [
        "正解。The best nudges are those that could be announced openly without losing their effect に一致。",
        "気候変動は、nudge では足りず税・規制・投資が要る例。",
        "知られないと効かない nudge は should make us uneasy（不安にさせる）と批判している。",
        "本文は works just as well when employees are told（説明されても同じく効く）。",
      ], "筆者が「よい」とする条件を探す", [
        ["根拠", "{{The best nudges}} are those that could be announced openly {{without losing their effect}}。"],
        ["例", "自動加入の年金は、仕組みを説明されても{{同じように}}効く。"],
      ]),
      C("main-idea", 3, U.chobun, "本文全体の主張として最も適切なものを選べ。", [
        "Since choices are always made within some structure, that structure should be designed carefully.",
        "People always choose rationally, so governments should not try to influence them.",
        "Nudges can replace taxes and regulations in solving most social problems.",
        "Freedom of choice requires that options be arranged at random.",
      ], 0, [
        "正解。最終段落：人はいつも何らかの構造の中で選ぶ → 慎重に設計すべきだ。",
        "冒頭で「現実の人は計算機のようではない」と否定している。",
        "第6段落で、nudge だけでは足りない問題があると述べている。",
        "第4段落で、でたらめの配置が自由を尊重するわけではないと述べている。",
      ], "主張は最終段落の deeper lesson", [
        ["最終段落", "選択の自由と選択の設計は{{opposites}}ではない。"],
        ["結論", "構造は必ずある。だから{{designed with care}}であるべき。"],
      ]),
      O("not-until", 3, U.tokushu, "第2段落の内容をふまえ、「雇い主が規則を逆にして初めて、参加者が増えた」という意味になるように語句を並べかえよ。", ["It", "was", "not until", "employers", "reversed", "the rule", "that", "participation", "rose."], "It was not until A that B＝A して初めて B", [
        ["構文", "「～して初めて…した」＝ {{It was not until ～ that …}}。"],
        ["組み立て", "It was not until {{employers reversed the rule}} that {{participation rose}}。"],
      ]),
    ],
    [
      { word: "default", meaning: "初期設定（何もしないときにそうなるもの）" },
      { word: "pension plan", meaning: "年金制度" },
      { word: "eligible", meaning: "資格のある" },
    ],
  ),
];

// =====================================================================
// 第2問　長文読解（社会・経済の論説：通念を批判的に見直す立場）
// =====================================================================

const P2: ExamPoolSection[] = [
  reading(
    2,
    "sharing-economy",
    "シェアリング・エコノミーを問い直す論説",
    "What the Word \"Sharing\" Conceals",
    `When smartphone apps first made it possible to hire a stranger's car, rent a stranger's spare room, or pay someone nearby to assemble a bookshelf, the change was celebrated as the birth of a "sharing economy." The phrase suggested neighbors helping neighbors, idle resources being put to good use, and ordinary people earning a little extra money on their own terms. More than a decade later, it is worth asking how much of that promise has been [ 1 ].

Consider first the idea of flexibility. Platforms often describe the people who work through them as independent entrepreneurs who can switch the app on and off whenever they please. For a student who drives a few evenings a month, this description may be accurate. But a large share of the work on many platforms is done by people who depend on it as their main source of income. For them, the freedom to log off is {{(A) largely theoretical}}. If demand is highest late at night or on weekends, that is when they must work, and if the platform lowers its rates, they have little choice but to accept.

The second problem concerns risk. In a traditional job, an employer bears many of the costs of doing business: it buys equipment, pays for insurance, and continues to pay wages when work is slow. Platform workers, by contrast, typically use their own cars, phones and tools, and they are paid only for completed tasks. When a driver waits an hour for a passenger, the waiting is unpaid. When a car breaks down, the driver pays for the repair. {{(B) What looks like efficiency from the company's point of view is often simply a transfer of risk from the firm to the individual.}}

Third, the sharing economy has had effects on people who never use it. In some popular tourist districts, the conversion of ordinary apartments into short-term rentals has reduced the number of homes available to local residents, pushing up rents. A building where neighbors once knew each other may become a place where strangers come and go with suitcases every few days. The owners of these apartments benefit, and so do the visitors, but some of the costs are [ 2 ] by tenants who have no part in the transaction.

Defenders of the platforms reply that they have created opportunities that did not exist before. People who struggled to find conventional jobs, because of a gap in their work history, for example, or because they needed to care for a family member during the day, have been able to earn money. Consumers, too, have gained: prices for many services have fallen, and it has become far easier to find a ride or a room in an unfamiliar city. These benefits are real, and any serious criticism must [ 3 ] them.

The point, then, is not that the sharing economy should be abolished, but that the word "sharing" has concealed some important questions. Who carries the risk when things go wrong? Who decides the rates? Who pays for the effects on neighborhoods? In older industries, societies answered such questions over many years through labor laws, safety standards and local planning rules. The new platforms grew so quickly that they were often able to operate outside those rules, [ 4 ] that they were merely technology companies connecting buyers and sellers. Now that they have become a permanent part of economic life, the time has come to ask them to follow rules that reflect what they actually do.`,
    [
      C("blank1", 2, U.vocab, "空所［ 1 ］に入る最も適切なものを選べ。", ["fulfilled", "forgiven", "borrowed", "postponed"], 0, [
        "正解。promise を主語にして「約束（期待）がどれだけ果たされたか」。後の段落で期待とのずれを検討する。",
        "約束が「許される」では意味が通らない。",
        "約束が「借りられる」では意味が通らない。",
        "「延期された」では、10年以上たった今の評価を問う文にならない。",
      ], "fulfill a promise＝約束を果たす", [
        ["語の組み合わせ", "{{promise}} と結びつく動詞は {{fulfill}}（果たす）。"],
        ["文脈", "以下の段落で、期待が{{どれだけ実現したか}}を順に検討する。"],
      ], K),
      C("blank2", 2, U.vocab, "空所［ 2 ］に入る最も適切なものを選べ。", ["borne", "avoided", "denied", "earned"], 0, [
        "正解。costs are borne by ～＝費用は～が負担する。bear の過去分詞。",
        "取引に関係ない借家人が費用を「避ける」なら、批判にならない。",
        "「否定される」では意味が通らない。",
        "費用を「稼ぐ」は語の組み合わせとして不自然。",
      ], "bear the cost＝費用を負担する（受け身 borne）", [
        ["文脈", "所有者と旅行者は得をする。{{but}} 費用は取引と無関係の{{借家人}}にかかる。"],
        ["語法", "be {{borne}} by ～＝～によって負担される。"],
      ], K),
      C("blank3", 2, U.vocab, "空所［ 3 ］に入る最も適切なものを選べ。", ["acknowledge", "exaggerate", "prevent", "replace"], 0, [
        "正解。These benefits are real と述べたうえで、「まじめな批判はそれを認めなければならない」。",
        "利点を「誇張する」べきだとは言わない。",
        "利点を「防ぐ」では意味が通らない。",
        "利点を「置きかえる」では意味が通らない。",
      ], "real と認めた直後は「認める」", [
        ["前", "{{These benefits are real}}：利点は本物だ。"],
        ["選ぶ", "批判する側もそれを{{acknowledge}}（認める）べきだ。"],
      ], K),
      C("blank4", 3, U.bunshi, "空所［ 4 ］に入る最も適切なものを選べ。", ["arguing", "argue", "argued", "to be argued"], 0, [
        "正解。分詞構文。「自分たちは技術企業にすぎないと主張して」規則の外で営業できた。主語 they と能動の関係。",
        "原形は、文の途中で接続詞なしに置けない。",
        "過去形にすると、接続詞なしに動詞が2つ並ぶ。過去分詞と見ると受け身（主張される）になり意味が合わない。",
        "受け身の不定詞では、主語が「主張される」側になる。",
      ], "コンマのあとの分詞構文：主語と能動なら -ing", [
        ["形", "コンマのあとに接続詞がない → {{分詞構文}}。"],
        ["能動か受け身か", "主語 they（企業）が{{主張する}}ので {{arguing}}。"],
      ], K),
      C("theoretical", 2, U.chobun, "下線部(A)の内容として最も適切なものを選べ。", [
        "ログオフする自由は形の上ではあるが、実際にはほとんど使えない。",
        "ログオフする自由は、理論の研究によって初めて明らかになった。",
        "ログオフする自由は、学生よりも本業の人のほうが大きい。",
        "ログオフする自由は、法律で完全に守られている。",
      ], 0, [
        "正解。直後に、需要の多い時間に働かざるをえず、料金を下げられても受け入れるしかない、と説明がある。",
        "theoretical は「理屈の上だけの」。研究の話ではない。",
        "逆。学生には当てはまるが、収入を頼る人には当てはまらない。",
        "法律の保護の話はない。",
      ], "largely theoretical＝ほとんど理屈の上だけ", [
        ["語の意味", "theoretical＝理論上の → {{実際にはない}}に近い。"],
        ["根拠", "直後：需要が多い時間に{{働かねばならず}}、値下げも{{受け入れるしかない}}。"],
      ]),
      C("transfer-risk", 3, U.chobun, "下線部(B)の内容として最も適切なものを選べ。", [
        "会社にとって効率的に見えることの多くは、費用や損失の危険を会社から働く人個人に移しているにすぎない。",
        "会社が効率を上げると、働く人の危険も同時に小さくなる。",
        "働く人は、会社よりも効率的に危険を管理できる。",
        "会社は効率を上げるために、働く人に保険を提供している。",
      ], 0, [
        "正解。直前の例（待ち時間は無給、修理代は運転手が払う）を一般化した文。",
        "危険が小さくなるのではなく、移るだけだと述べている。",
        "個人のほうが上手に管理できるとは述べていない。",
        "保険を払うのは従来の雇い主の例。プラットフォームは逆。",
      ], "具体例のあとの一般化の文", [
        ["例", "待ち時間は{{無給}}、修理代は{{運転手持ち}}。"],
        ["一般化", "会社の効率＝{{危険を個人に移すこと}}。transfer from A to B＝A から B へ移す。"],
      ]),
      C("flexibility", 2, U.chobun, "第2段落の内容と一致するものを選べ。", [
        "The description of platform workers as free to work whenever they like fits occasional workers better than those who rely on the income.",
        "Most platform work is done by students who drive a few evenings a month.",
        "Platform workers can refuse lower rates without any loss of income.",
        "Demand for platform work is highest on weekday mornings.",
      ], 0, [
        "正解。学生には this description may be accurate、本業の人には largely theoretical。",
        "本文は a large share of the work … is done by people who depend on it as their main source of income。",
        "本文は they have little choice but to accept（受け入れるしかない）。",
        "本文は if demand is highest late at night or on weekends と例を挙げている。",
      ], "誰に当てはまるかを区別する", [
        ["学生", "たまに働く人には説明が{{accurate}}。"],
        ["本業の人", "収入を頼る人にはその自由は{{largely theoretical}}。"],
      ]),
      C("risk-costs", 2, U.chobun, "第3段落の内容と一致するものを選べ。", [
        "Platform drivers are not paid for the time they spend waiting for passengers.",
        "Platforms usually provide cars and phones for their workers.",
        "Traditional employers stop paying wages whenever work is slow.",
        "Platforms pay for repairs when a driver's car breaks down.",
      ], 0, [
        "正解。When a driver waits an hour for a passenger, the waiting is unpaid に一致。",
        "本文は typically use their own cars, phones and tools（自分のものを使う）。",
        "従来の雇い主は continues to pay wages when work is slow。",
        "本文は the driver pays for the repair。",
      ], "by contrast の前後で主体が入れかわる", [
        ["前", "従来の雇い主：設備・保険・{{仕事が少ないときの賃金}}を負担。"],
        ["後", "プラットフォームの働き手：道具は{{自前}}、待ち時間は{{無給}}。"],
      ]),
      C("neighbors", 2, U.chobun, "第4段落の内容と一致するものを選べ。", [
        "Short-term rentals can raise rents for local people who are not involved in the rentals.",
        "Short-term rentals have increased the number of homes available to local residents.",
        "Visitors who use short-term rentals bear most of the costs for the neighborhood.",
        "Neighbors in such buildings now know each other better than before.",
      ], 0, [
        "正解。reduced the number of homes available to local residents, pushing up rents に一致。",
        "本文は reduced（減らした）。",
        "旅行者は benefit する側。費用を負うのは tenants。",
        "本文は逆に、見知らぬ人が出入りする場所になると述べている。",
      ], "使っていない人への影響（外部への費用）", [
        ["根拠", "住宅が{{減り}}、家賃が{{上がる}}。"],
        ["誰が負担するか", "{{tenants who have no part in the transaction}}。"],
      ]),
      C("defenders", 3, U.chobun, "第5段落に対する筆者の態度として最も適切なものを選べ。", [
        "The author regards the defenders' points as valid but does not think they settle the matter.",
        "The author completely rejects the claim that platforms have helped consumers.",
        "The author believes the defenders have proved that no regulation is needed.",
        "The author thinks that people with gaps in their work history should avoid platform work.",
      ], 0, [
        "正解。These benefits are real と認めたうえで、次の段落で「規則に従わせるべきだ」と主張を続ける。",
        "筆者は利点が real だと認めている。",
        "最終段落で、規則を求めるべきだと結論している。",
        "そのような人にも収入の機会ができたことを、利点として紹介している。",
      ], "認めたうえで主張を続ける（譲歩→主張）", [
        ["譲歩", "{{These benefits are real}}：反論の利点を認める。"],
        ["主張", "最終段落：廃止ではなく、{{実態に合った規則}}を求める。"],
      ]),
      C("main-point", 3, U.chobun, "本文の主張として最も適切なものを選べ。", [
        "Platforms should be expected to follow rules that match the work they actually organize.",
        "The sharing economy should be abolished because it harms workers.",
        "Platforms are only technology companies, so labor laws should not apply to them.",
        "The word \"sharing\" accurately describes how the platforms operate.",
      ], 0, [
        "正解。the time has come to ask them to follow rules that reflect what they actually do に一致。",
        "本文は The point … is not that the sharing economy should be abolished。",
        "「技術企業にすぎない」は企業側の言い分で、筆者は退けている。",
        "筆者は sharing という語が問題を concealed（隠した）と述べる。",
      ], "not A but B の B が主張", [
        ["構文", "The point is {{not that}} 廃止すべき, {{but that}} 「シェア」の語が問題を隠した。"],
        ["結論", "実態に合った{{規則に従わせる}}べきだ。"],
      ]),
      O("so-that", 2, U.setsuzoku, "第6段落の内容をふまえ、「新しいプラットフォームはあまりに急速に成長したので、規則の外で営業できた」という意味になるように語句を並べかえよ。", ["The new platforms", "grew", "so", "quickly", "that", "they", "could operate", "outside the rules."], "so ～ that …＝とても～なので…", [
        ["構文", "「あまりに～なので…」＝ {{so ～ that …}}。so のあとに副詞 quickly。"],
        ["組み立て", "The new platforms grew {{so quickly that}} they could operate outside the rules."],
      ]),
    ],
    [
      { word: "platform", meaning: "（アプリなどの）取引の場・基盤" },
      { word: "tenant", meaning: "借家人" },
      { word: "conceal", meaning: "隠す" },
    ],
  ),
  reading(
    2,
    "metrics",
    "数値目標への依存を批判する論説",
    "When Numbers Take Over",
    `Organizations today collect more numbers about their own performance than ever before. Hospitals count how quickly patients are seen, schools publish test scores, universities track how many papers their researchers publish, and call centers time every conversation. The reasoning behind this enthusiasm seems hard to argue with. If you cannot measure something, how can you know whether it is improving? Yet there is growing reason to believe that an excessive reliance on numerical targets can [ 1 ] the very goals it is meant to serve.

The basic difficulty is that most important goals are complex, while measurements are simple. A hospital wants patients to be treated well, which involves accurate diagnosis, kindness, safety and much else. Waiting time captures only one part of this. Once staff are judged mainly by how quickly patients are seen, they have reason to concentrate on that one figure, perhaps by rushing examinations or by moving patients to a different list so that the official clock stops. The number improves, but the care may not. {{(A) An indicator that was useful as long as nobody paid much attention to it becomes misleading once careers depend on it.}}

A second problem is that measurement favors what is easy to count over what matters. A teacher whose pay depends on test results may spend more time drilling the kinds of questions that appear on the test and less time on discussion, creative writing, or the patient work of helping a struggling student gain confidence. None of these activities is worthless; they are simply harder to [ 2 ]. Over time, an organization guided by numbers may come to believe that what it cannot count does not exist.

Third, targets can damage the motivation of the people they are meant to guide. Many professionals choose their work because they care about it. A nurse, a researcher or a social worker typically takes pride in doing the job well. When every activity is monitored and scored, such people may feel that they are no longer trusted, and some begin to do only what is required. In this way, a system designed to raise standards can, [ 3 ], lower them.

None of this is an argument against measurement as such. Data can reveal problems that would otherwise remain hidden, such as a dangerous pattern of infections in a particular ward or a group of students who are falling behind. The trouble begins when numbers are used not to understand a situation but to reward and punish individuals. {{(B) Measurement is a good servant but a poor master.}} Information gathered in order to learn tends to be honest; information gathered in order to judge tends to be shaped by the people being judged.

What would a wiser approach look like? First, organizations could use a range of indicators rather than one or two headline figures, so that improving one at the expense of the others becomes difficult. Second, they could combine numbers with the judgment of experienced people who understand the work, rather than treating the data as if they explained themselves. Third, and perhaps most important, they could ask the people whose work is being measured to help decide what should be counted, [ 4 ]. Those closest to a task usually know best which numbers reveal its quality and which merely invite clever ways of improving the score.`,
    [
      C("blank1", 2, U.vocab, "空所［ 1 ］に入る最も適切なものを選べ。", ["undermine", "clarify", "reward", "define"], 0, [
        "正解。Yet で前の「測ることはよいことに見える」を打ち消し、「数値目標に頼りすぎると目的そのものを損なう」。",
        "「明確にする」では Yet の逆接にならない。",
        "目標を「報いる」は語の組み合わせとして不自然。",
        "「定める」では、以下の段落の弊害の話につながらない。",
      ], "Yet のあとは前と逆の評価", [
        ["前", "測ることの理屈は{{反論しにくい}}。"],
        ["後", "Yet：頼りすぎると目的を{{undermine}}（損なう）。以下で弊害を3つ挙げる。"],
      ], K),
      C("blank2", 2, U.vocab, "空所［ 2 ］に入る最も適切なものを選べ。", ["quantify", "afford", "avoid", "invent"], 0, [
        "正解。段落の主題は「数えやすいものが優先される」。討論や生徒の自信は数値にしにくい。",
        "「余裕がある」は活動の性質の説明にならない。",
        "「避けにくい」では、テスト対策に時間を取られる話と合わない。",
        "「発明しにくい」は意味が通らない。",
      ], "段落の冒頭の文が空所の手がかり", [
        ["主題", "measurement favors {{what is easy to count}}。"],
        ["選ぶ", "討論・創作・自信は価値があるが、{{数値にしにくい}} → {{quantify}}。"],
      ], K),
      C("blank3", 2, U.vocab, "空所［ 3 ］に入る最も適切なものを選べ。", ["ironically", "fortunately", "obviously", "deliberately"], 0, [
        "正解。水準を上げるための仕組みが、かえって水準を下げる。意図と逆の結果なので「皮肉にも」。",
        "水準が下がるのは「幸い」ではない。",
        "前の段落までの論旨は、この結果が見落とされやすいというもので、「明らかに」は合わない。",
        "下げることは仕組みの意図ではない（designed to raise standards）。",
      ], "意図と逆の結果＝皮肉", [
        ["意図", "a system designed to {{raise}} standards。"],
        ["結果", "standards を{{lower}}する。逆の結果なので {{ironically}}。"],
      ], K),
      C("blank4", 3, U.bunshi, "空所［ 4 ］に入る最も適切なものを選べ。", ["and how", "so that", "unless", "even if"], 0, [
        "正解。help decide what should be counted, and how (it should be counted)＝何を、どのように数えるか。",
        "so that のあとに節が必要。ここで文が終わるので不可。",
        "unless のあとにも節が必要。",
        "even if のあとにも節が必要。",
      ], "and how のあとは前と同じ部分の省略", [
        ["形", "空所のあとは文末。接続詞だけでは文が終わらない。"],
        ["省略", "what should be counted, {{and how}} (it should be counted)。"],
      ], K),
      C("indicator", 3, U.chobun, "下線部(A)の内容として最も適切なものを選べ。", [
        "あまり注目されていなかったときには役に立った指標も、昇進や評価がそれで決まるようになると、実態を正しく示さなくなる。",
        "誰も注目しない指標は、はじめから役に立たない。",
        "指標に注目が集まるほど、その指標は実態を正しく示すようになる。",
        "職員の経歴を調べるための指標は、病院では役に立たない。",
      ], 0, [
        "正解。直前の例（診察を急がせる・別のリストに移して時計を止める）で、評価に使われると数字が操作される。",
        "as long as nobody paid much attention to it（注目されないうちは）役に立った、と述べている。",
        "逆。注目されると misleading（誤解を招く）になる。",
        "careers depend on it は「経歴がそれ次第になる」＝評価・昇進が決まる、の意味。",
      ], "as long as … と once … の対比", [
        ["前半", "{{as long as nobody paid much attention}}：注目されないうちは有用。"],
        ["後半", "{{once careers depend on it}}：評価に使われると {{misleading}}。"],
      ]),
      C("servant", 3, U.chobun, "下線部(B)の内容として最も適切なものを選べ。", [
        "測定は、状況を理解するために使えば役立つが、人を賞罰で動かす主人のように使うと害になる。",
        "測定する人は、使用人のように主人の命令に従うべきだ。",
        "測定は、主人よりも使用人のほうが上手に行える。",
        "測定は、どのように使っても害になる。",
      ], 0, [
        "正解。直前の「数字を理解ではなく賞罰に使うと問題が始まる」をことわざ風に言いかえたもの。",
        "人の上下関係の話ではなく、測定の使い方の比喩。",
        "誰が測るかの話ではない。",
        "段落の冒頭で None of this is an argument against measurement as such と述べている。",
      ], "比喩は直前の文の言いかえ", [
        ["直前", "数字を{{理解}}のために使うのはよい。{{賞罰}}に使うと問題。"],
        ["比喩", "{{good servant}}＝道具として使えば有用、{{poor master}}＝支配させると有害。"],
      ]),
      C("hospital", 2, U.chobun, "第2段落の内容と一致するものを選べ。", [
        "A shorter official waiting time does not necessarily mean that patients receive better care.",
        "Waiting time is the best single measure of how well a hospital treats patients.",
        "Hospitals rarely measure how quickly patients are seen.",
        "Rushing examinations always improves the accuracy of diagnosis.",
      ], 0, [
        "正解。The number improves, but the care may not に一致。",
        "本文は Waiting time captures only one part of this。",
        "第1段落で、病院は診察の早さを数えていると述べている。",
        "診察を急ぐことは、数字だけを良くする手段の例。",
      ], "数字の改善＝中身の改善ではない", [
        ["根拠", "{{The number improves, but the care may not}}。"],
        ["理由", "待ち時間は治療の質の{{一部}}しか表さない。"],
      ]),
      C("teacher", 2, U.chobun, "第3段落の内容と一致するものを選べ。", [
        "A teacher paid according to test results may spend less time on activities that tests do not measure.",
        "The author believes discussion and creative writing are worthless.",
        "Test scores capture everything that a good teacher does.",
        "Organizations guided by numbers pay more attention to what they cannot count.",
      ], 0, [
        "正解。spend more time drilling … and less time on discussion, creative writing … に一致。",
        "本文は None of these activities is worthless。",
        "数えにくい活動があると述べている。",
        "本文は逆に、数えられないものは存在しないと思いこむようになると述べる。",
      ], "more A and less B の両方を確かめる", [
        ["根拠", "テスト対策は{{more}}、討論・創作・励ましは{{less}}。"],
        ["筆者の評価", "それらは{{worthless ではない}}。数えにくいだけ。"],
      ]),
      C("motivation", 2, U.chobun, "第4段落の内容と一致するものを選べ。", [
        "Professionals who feel they are not trusted may begin to do no more than what is required.",
        "Most nurses and researchers choose their jobs mainly for the high pay.",
        "Constant monitoring makes professionals take greater pride in their work.",
        "Targets have no effect on the motivation of social workers.",
      ], 0, [
        "正解。they are no longer trusted, and some begin to do only what is required に一致。",
        "本文は choose their work because they care about it。",
        "監視されると誇りではなく不信を感じると述べる。",
        "targets can damage the motivation と述べている。",
      ], "do only what is required＝最低限しかしない", [
        ["根拠", "すべて監視されると{{信頼されていない}}と感じる。"],
        ["結果", "{{only what is required}}（求められたことだけ）をするようになる。"],
      ]),
      C("proposals", 3, U.chobun, "最終段落で筆者が提案していないものを選べ。", [
        "Replacing all numerical indicators with written reports by managers.",
        "Using several indicators instead of relying on one or two main figures.",
        "Combining data with the judgment of experienced people.",
        "Involving the people being measured in deciding what to count.",
      ], 0, [
        "正解（提案していない）。筆者は数値をやめるのではなく、使い方を変えることを提案している。",
        "First：a range of indicators rather than one or two headline figures。",
        "Second：combine numbers with the judgment of experienced people。",
        "Third：ask the people whose work is being measured to help decide what should be counted。",
      ], "First・Second・Third を1つずつ照らす", [
        ["提案", "① 指標を{{複数}}に ② {{経験者の判断}}と組み合わせる ③ {{測られる人}}も決定に加える。"],
        ["本文にないもの", "数値を{{すべてやめる}}とは言っていない（None of this is an argument against measurement）。"],
      ]),
      C("data-view", 3, U.chobun, "第5段落の内容と一致するものを選べ。", [
        "Information collected to judge people is likely to be influenced by those being judged.",
        "Data should never be used to discover problems in hospitals or schools.",
        "Information gathered in order to learn is usually less honest than other information.",
        "The author argues that measurement should be abolished entirely.",
      ], 0, [
        "正解。information gathered in order to judge tends to be shaped by the people being judged に一致。",
        "感染の傾向や遅れている生徒を見つける例を、データの利点として挙げている。",
        "本文は Information gathered in order to learn tends to be honest。",
        "None of this is an argument against measurement as such と述べている。",
      ], "目的（learn / judge）で情報の性質が変わる", [
        ["learn", "学ぶための情報は{{honest}}になりやすい。"],
        ["judge", "評価のための情報は、評価される人に{{shaped}}（形を変えられる）。"],
      ]),
      O("in-order-to", 2, U.futeishi, "第5段落の内容をふまえ、「学ぶために集められた情報は、正直なものになりやすい」という意味になるように語句を並べかえよ。", ["Information", "gathered", "in order", "to learn", "tends", "to be", "honest."], "過去分詞の後置修飾＋tend to do", [
        ["主語", "Information {{gathered in order to learn}}：過去分詞のかたまりが後ろから名詞を修飾。"],
        ["述語", "{{tends to be honest}}：～しやすい。"],
      ]),
    ],
    [
      { word: "indicator", meaning: "指標" },
      { word: "ward", meaning: "病棟" },
      { word: "headline figure", meaning: "代表として示される数字" },
    ],
  ),
  reading(
    2,
    "remote-work",
    "在宅勤務の見えにくい費用を論じる論説",
    "The Office We Did Not Know We Needed",
    `When offices around the world emptied during the pandemic, many workers discovered that they could do their jobs perfectly well from their kitchen tables. Commutes vanished, families saw more of each other, and companies learned that video calls could replace many business trips. It is no surprise that a large number of employees now wish to work from home permanently. Yet the enthusiasm for remote work may be [ 1 ] some of its less obvious costs, especially for younger workers and for the long-term health of organizations.

Much of what people learn at work is never written down. A new employee picks up how to handle a difficult client by overhearing a colleague on the phone, or learns which mistakes matter by watching how a manager reacts to them. This kind of knowledge passes from person to person almost by accident, through conversations in corridors and questions asked over a shoulder. {{(A) It is precisely the accidental quality of such learning that makes it hard to reproduce online.}} A video call must be scheduled, and people rarely schedule a meeting to ask a question they consider too minor to bother anyone with.

Experienced workers may hardly notice this loss. They already have networks of colleagues and a store of practical knowledge built up over years in the office. For them, working from home may bring little but gains. Those at the beginning of their careers, however, are in a very different position. A graduate who joins a company and spends most days alone in a small apartment may [ 2 ] the informal guidance that earlier generations received without even asking for it. The cost may not appear for several years, when such employees find that they have been promoted more slowly or have fewer people to turn to for advice.

Organizations, too, may lose something that is hard to measure. New ideas often emerge when people from different departments meet by chance and discover that a problem in one area resembles a problem in another. Remote work tends to strengthen ties within existing teams, which continue to hold regular calls, while weakening the looser connections between teams. Over time, a company may become a collection of efficient but isolated groups, each [ 3 ] of what the others are doing.

None of this is an argument for forcing everyone back to their desks five days a week. Many tasks require long periods of quiet concentration, which is often easier to find at home than in a noisy open-plan office. Employees with long commutes or caring responsibilities benefit greatly from flexibility, and companies that refuse to offer it may lose talented staff to competitors that do. The question is not whether remote work is good or bad, but which kinds of work it suits and for whom.

A sensible approach might be to treat the office less as a place for individual tasks and more as a place for the things that are difficult to do apart: training new staff, starting projects, solving problems that cross departments, and building the trust that makes later cooperation possible. If teams agreed to come in on the same days, [ 4 ] each person choosing days at random, the time spent in the office would be far more valuable. {{(B) An office visited on the wrong days combines the disadvantages of both worlds}}: workers endure the commute, only to spend the day on video calls with colleagues who stayed at home.`,
    [
      C("blank1", 3, U.vocab, "空所［ 1 ］に入る最も適切なものを選べ。", ["obscuring", "celebrating", "measuring", "repairing"], 0, [
        "正解。在宅勤務への熱狂が、目立たない費用を「見えにくくしている」。less obvious costs と合う。",
        "熱狂が費用を「祝う」では意味が通らない。",
        "熱狂が費用を「測る」では意味が通らない。",
        "熱狂が費用を「修理する」では意味が通らない。",
      ], "less obvious（目立たない）と結びつく動詞", [
        ["主語と目的語", "主語 the enthusiasm、目的語 {{less obvious costs}}。"],
        ["選ぶ", "熱狂のせいで費用が{{見えにくくなる}} → {{obscuring}}。"],
      ], K),
      C("blank2", 2, U.jukugo, "空所［ 2 ］に入る最も適切なものを選べ。", ["miss out on", "make up for", "put up with", "look down on"], 0, [
        "正解。一人で働く新人は、以前の世代が自然に受けていた助言を「受けそこなう」。",
        "「埋め合わせる」では、助言が得られないという話と合わない。",
        "助言を「がまんする」では意味が通らない。",
        "助言を「見下す」では意味が通らない。",
      ], "miss out on＝（よい機会を）逃す", [
        ["状況", "新人が{{ほとんど毎日一人}}で働く。"],
        ["選ぶ", "非公式な助言を{{受けそこなう}} → {{miss out on}}。"],
      ], K),
      C("blank3", 2, U.vocab, "空所［ 3 ］に入る最も適切なものを選べ。", ["unaware", "capable", "fond", "ashamed"], 0, [
        "正解。孤立したグループは、ほかのグループが何をしているかを「知らない」。isolated と合う。",
        "be capable of＋名詞節は不自然で、孤立の説明にもならない。",
        "「好きだ」は孤立の説明にならない。",
        "「恥じる」は孤立の説明にならない。",
      ], "isolated（孤立した）と結びつく形容詞", [
        ["文脈", "チーム間のつながりが{{弱まる}} → efficient but {{isolated}} groups。"],
        ["選ぶ", "ほかの動きを{{知らない}} → {{unaware of}}。"],
      ], K),
      C("blank4", 2, U.jukugo, "空所［ 4 ］に入る最も適切なものを選べ。", ["rather than", "as well as", "in addition to", "because of"], 0, [
        "正解。「各自がばらばらに日を選ぶのではなく、チームが同じ日に出社する」。",
        "同じ日に集まることと、ばらばらに選ぶことは両立しない。",
        "in addition to も「～に加えて」で両立が前提になり、不可。",
        "「ばらばらに選ぶために同じ日に集まる」では意味が通らない。",
      ], "両立しない2つをくらべる rather than", [
        ["前", "チームが{{same days}} に出社する。"],
        ["後", "各自が{{at random}} に選ぶ。両立しないので {{rather than}}。"],
      ], K),
      C("accidental", 3, U.chobun, "下線部(A)の内容として最も適切なものを選べ。", [
        "職場での学びは偶然に起こるものだからこそ、オンラインでは再現しにくい。",
        "職場での学びは偶然の失敗から生まれるので、オンラインのほうが学びやすい。",
        "オンラインで学ぶと、偶然に誤った知識を覚えてしまう。",
        "職場での学びは、正確に記録すればオンラインでも簡単に再現できる。",
      ], 0, [
        "正解。It is … that の強調構文。偶然性こそが再現を難しくしている。直後の「ビデオ通話は予定を入れる必要がある」が理由。",
        "オンラインのほうが学びやすいとは述べていない。",
        "誤った知識の話はない。",
        "段落の冒頭で、こうした学びは never written down（書き留められない）と述べている。",
      ], "It is precisely A that B＝まさに A が B だ", [
        ["構文", "{{It is precisely the accidental quality … that}} makes it hard …：強調構文。"],
        ["理由", "ビデオ通話は{{予定を入れる}}必要があり、ささいな質問はしにくい。"],
      ]),
      C("both-worlds", 3, U.chobun, "下線部(B)の内容として最も適切なものを選べ。", [
        "出社する日がそろわないと、通勤の負担とオンラインの不便さの両方を味わうことになる。",
        "出社する日がそろわないと、在宅とオフィスの両方の利点を得られる。",
        "オフィスに行く日を間違えると、会社から罰を受ける。",
        "在宅勤務とオフィス勤務には、どちらにも欠点がない。",
      ], 0, [
        "正解。コロンのあとに具体的な説明：通勤をがまんしたのに、一日中、家にいる同僚とのビデオ通話をする。",
        "利点ではなく disadvantages（欠点）を組み合わせると述べている。",
        "罰の話はない。",
        "both worlds の欠点を組み合わせると述べている。",
      ], "コロンのあとが具体的な言いかえ", [
        ["下線部", "{{disadvantages of both worlds}}：両方の欠点。"],
        ["説明", "通勤を{{endure}}し、そのうえ一日中{{ビデオ通話}}。"],
      ]),
      C("tacit", 2, U.chobun, "第2段落の内容と一致するものを選べ。", [
        "New employees often learn by observing and overhearing their colleagues.",
        "Most of what people learn at work is recorded in written manuals.",
        "People frequently schedule video calls to ask very small questions.",
        "Managers rarely react to the mistakes made by new employees.",
      ], 0, [
        "正解。by overhearing a colleague … by watching how a manager reacts に一致。",
        "本文は Much of what people learn at work is never written down。",
        "本文は people rarely schedule a meeting to ask a question they consider too minor。",
        "上司の反応を見て学ぶ例が挙げられている。",
      ], "具体例の動詞（overhear・watch）に注目", [
        ["根拠", "{{overhearing}} a colleague、{{watching}} how a manager reacts。"],
        ["誤りの確認", "学びは{{書き留められない}}。小さな質問のために会議は{{めったに}}入れない。"],
      ]),
      C("young-workers", 2, U.chobun, "第3段落の内容と一致するものを選べ。", [
        "The effects of remote work on young employees may not become clear until years later.",
        "Experienced workers suffer the most from working at home.",
        "Young employees working from home are usually promoted faster.",
        "Earlier generations had to ask repeatedly before receiving any guidance.",
      ], 0, [
        "正解。The cost may not appear for several years に一致。",
        "経験者は may hardly notice this loss（ほとんど気づかない）。",
        "本文は promoted more slowly の可能性を述べている。",
        "本文は without even asking for it（頼みもしないで）受けていた。",
      ], "費用が「いつ」現れるかを確かめる", [
        ["根拠", "{{The cost may not appear for several years}}。"],
        ["誤りの確認", "経験者は損失に{{気づきにくい}}。昇進は{{遅れる}}かもしれない。"],
      ]),
      C("teams", 3, U.chobun, "第4段落の内容と一致するものを選べ。", [
        "Remote work tends to keep ties inside teams strong while weakening links between teams.",
        "Remote work strengthens connections between different departments.",
        "Teams that work remotely stop holding regular meetings.",
        "New ideas usually come from people within the same small team.",
      ], 0, [
        "正解。strengthen ties within existing teams … while weakening the looser connections between teams に一致。",
        "逆。部署間のつながりは弱まる。",
        "本文は continue to hold regular calls（定期的な通話を続ける）。",
        "本文は people from different departments meet by chance から新しい考えが生まれると述べる。",
      ], "within と between を区別する", [
        ["within", "チームの{{中}}のつながりは強まる。"],
        ["between", "チームの{{間}}のゆるいつながりは弱まる。"],
      ]),
      C("not-forcing", 3, U.chobun, "第5段落・第6段落から読みとれる筆者の考えとして最も適切なものを選べ。", [
        "The office should mainly be used for activities that are hard to do separately, such as training new staff.",
        "All employees should return to the office five days a week.",
        "Remote work is bad for every kind of task and every kind of worker.",
        "Workers should choose their office days at random to avoid crowding.",
      ], 0, [
        "正解。treat the office … more as a place for the things that are difficult to do apart: training new staff … に一致。",
        "本文は None of this is an argument for forcing everyone back … five days a week。",
        "集中が必要な仕事には在宅が向くと述べている。",
        "筆者は同じ日に集まることを勧め、at random は退けている。",
      ], "譲歩（None of this）のあとの提案を読む", [
        ["譲歩", "週5日の出社を{{強制すべきではない}}。"],
        ["提案", "オフィスは{{一緒でないと難しいこと}}（新人の育成など）に使う。"],
      ]),
      O("too-to", 2, U.futeishi, "第2段落の内容をふまえ、「その質問は、会議を開くほどの価値もないほどささいなものに思えた」という意味になるように語句を並べかえよ。", ["The question", "seemed", "too", "minor", "to be", "worth", "a meeting."], "too ～ to …＝…するには～すぎる", [
        ["構文", "「…するには～すぎる」＝ {{too ～ to …}}。"],
        ["worth", "be {{worth}}＋名詞：～の価値がある。to be worth a meeting。"],
      ]),
    ],
    [
      { word: "commute", meaning: "通勤（する）" },
      { word: "open-plan office", meaning: "仕切りのない大部屋のオフィス" },
    ],
  ),
];

// =====================================================================
// 第3問　長文読解（科学・文化・心理の論説。アクセントの問いを含む）
// =====================================================================

const ACC = "次の語のうち、第一強勢（最も強く読む音節）の位置が他の3つと異なるものを選べ。（いずれも本文中の語）";

const P3: ExamPoolSection[] = [
  reading(
    3,
    "urban-trees",
    "都市の暑さと街路樹",
    "Cooling the City",
    `On a hot summer afternoon, the temperature in the center of a large city can be several degrees higher than in the surrounding countryside. This phenomenon, known as the urban heat island effect, has several causes. Asphalt and concrete absorb sunlight during the day and release the stored heat slowly at night. Tall buildings trap warm air and block the breezes that might otherwise carry it away. Air conditioners, cars and factories add heat of their own. As a result, city nights often fail to cool down, and residents who cannot afford air conditioning may find it difficult to sleep or even to stay healthy.

As summers become hotter, city governments are searching for ways to [ 1 ] the problem. One of the simplest is to plant more trees. A mature tree cools its surroundings in two ways. First, its leaves block sunlight before it reaches the ground, so that the pavement beneath remains cooler. Second, trees draw water from the soil and release it as vapor through their leaves, a process that uses heat energy and lowers the temperature of the nearby air, much as sweat cools the human body. On a sunny day, the surface of a shaded sidewalk can be far cooler than one exposed to direct sunlight.

Trees offer other benefits as well. They absorb rainwater, reducing the risk of flooding during heavy storms, and they provide homes for birds and insects. Many residents say that a walk along a leafy street makes them feel calmer. Even property owners may gain, since homes on tree-lined streets often sell for higher prices. It is not surprising, then, that many cities have announced ambitious plans to plant large numbers of new trees over the coming decades.

Planting trees, however, is easier than keeping them alive. A young tree on a city street faces a hostile environment: its roots are squeezed by pipes and cables, its soil is packed hard by foot traffic, and it may receive little water during the dry summer months, precisely when it is most needed. In some cities, a considerable proportion of newly planted street trees die within their first few years. {{(A) A program that counts the trees it plants rather than the trees that survive may look impressive on paper while achieving little.}} Successful programs therefore budget not only for planting but also for years of watering and care.

There is also the question of where trees are planted. In many cities, wealthy neighborhoods already enjoy generous tree cover, while poorer districts, often more densely built and with less green space, have far fewer trees. Because those districts also tend to have more residents without air conditioning, they suffer most during heat waves. [ 2 ], a policy that simply plants trees wherever there happens to be open space, which is more common in wealthier areas, may benefit those who need it least. Planners increasingly use maps of surface temperature to decide where new trees will make the greatest difference.

Trees are not a complete solution. They take years to grow large enough to provide significant shade, and in the narrowest streets of old city centers there may be no room for them at all. Other measures, such as painting roofs in light colors that reflect sunlight, or replacing dark pavements with materials that stay cooler, can be introduced more quickly. [ 3 ], few measures combine as many benefits as a well-placed, well-cared-for tree. {{(B) In the long run, the cities that stay livable may be those that think of trees not as decoration but as infrastructure}}, as essential to public health as drains or power lines.`,
    [
      C("blank1", 1, U.vocab, "空所［ 1 ］に入る最も適切なものを選べ。", ["ease", "spread", "worsen", "admire"], 0, [
        "正解。暑さの問題を「やわらげる」方法を探す。直後に木を植える対策が続く。",
        "問題を「広げる」方法を探すのでは逆。",
        "問題を「悪化させる」方法を探すのでは逆。",
        "問題を「賞賛する」は意味が通らない。",
      ], "直後の対策の話から考える", [
        ["直後", "One of the simplest is to {{plant more trees}}：対策の例。"],
        ["選ぶ", "問題を{{やわらげる}} → {{ease}}。"],
      ], K),
      C("blank2", 2, U.setsuzoku, "空所［ 2 ］に入る最も適切なものを選べ。", ["Consequently", "Nevertheless", "Meanwhile", "Similarly"], 0, [
        "正解。貧しい地区ほど木が少なく暑さに苦しむ → その結果、空き地に植えるだけの政策は必要の少ない人に役立ってしまう。",
        "前の内容と後の内容は対立しない。",
        "「その間に」は同時に起こる別の出来事を示し、因果を表せない。",
        "「同様に」では、前の事実から導かれる結論を示せない。",
      ], "前の事実から導かれる結論＝Consequently", [
        ["前", "貧しい地区は木が{{少なく}}、暑さで{{最も苦しむ}}。空き地は豊かな地区に{{多い}}。"],
        ["後", "空き地に植えるだけでは、必要の{{少ない}}人に役立つ。結論なので {{Consequently}}。"],
      ], K),
      C("blank3", 2, U.setsuzoku, "空所［ 3 ］に入る最も適切なものを選べ。", ["Still", "Therefore", "For example", "Otherwise"], 0, [
        "正解。木の限界（時間がかかる・場所がない）を認めたうえで、「それでも、木ほど多くの利点をもつ対策は少ない」。",
        "限界を述べたあとに「したがって利点が多い」では論理が逆。",
        "後ろは例ではない。",
        "「さもなければ」は意味が通らない。",
      ], "限界を認めたあとの「それでも」", [
        ["前", "木は{{完全な解決ではない}}：育つのに時間がかかる、植える場所がない。"],
        ["後", "それでも利点の多さは{{抜きんでている}} → {{Still}}。"],
      ], K),
      C("counts", 3, U.chobun, "下線部(A)の内容として最も適切なものを選べ。", [
        "生き残った木ではなく植えた木の数で成果を数える計画は、書類の上では立派に見えても、実際にはほとんど成果をあげないことがある。",
        "植えた木の数を正確に数えないと、計画は成功しない。",
        "書類の上で成果を示すためには、木を植える数を増やすべきだ。",
        "木が生き残るかどうかは、植える数とは関係なく決まる。",
      ], 0, [
        "正解。直前の「新しく植えた街路樹の多くが数年で枯れる」を受け、植えた数だけを数える評価を批判している。",
        "正確に数えることではなく、何を数えるかが問題。",
        "筆者は植える数を増やすことより、世話の予算を勧めている。",
        "そのような記述はない。",
      ], "A rather than B＝B ではなく A", [
        ["構文", "counts {{the trees it plants}} rather than {{the trees that survive}}。"],
        ["結論", "直後：成功する計画は植樹だけでなく{{水やりと世話}}にも予算を組む。"],
      ]),
      C("infrastructure", 3, U.chobun, "下線部(B)の内容として最も適切なものを選べ。", [
        "木を飾りではなく、下水道や電線のように暮らしに欠かせない基盤と考える都市が、住みやすさを保てるだろう。",
        "木を植えるより、下水道や電線を整備する都市のほうが住みやすい。",
        "木は飾りとして美しいので、都市の住みやすさに役立つ。",
        "長い目で見れば、都市の木は飾りとして植えるのがよい。",
      ], 0, [
        "正解。not A but B＝A ではなく B。infrastructure（社会の基盤）の例として drains or power lines が続く。",
        "木と下水道を比べているのではなく、同じくらい必要なものとして並べている。",
        "飾り（decoration）として見るのを退けている。",
        "同上。飾りとしてではなく基盤として考えよ、という主張。",
      ], "not A but B と as … as の比較", [
        ["not A but B", "木を{{decoration}} ではなく {{infrastructure}} と考える。"],
        ["as … as", "{{as essential to public health as}} drains or power lines：下水道や電線と同じくらい必要。"],
      ]),
      C("how-cool", 2, U.chobun, "第2段落で述べられている、木がまわりを涼しくするしくみとして正しいものを選べ。", [
        "Trees release water through their leaves, and this process lowers the temperature of the air nearby.",
        "Trees absorb heat from the pavement through their roots.",
        "Trees reflect sunlight back into the sky with their light-colored leaves.",
        "Trees create strong winds that carry hot air away from the city.",
      ], 0, [
        "正解。trees draw water from the soil and release it as vapor through their leaves … lowers the temperature of the nearby air に一致。",
        "根が舗装の熱を吸うとは書いていない。",
        "光を反射するのは、明るい色に塗った屋根の例（第6段落）。",
        "風を起こすとは書いていない。風をさえぎるのは高い建物（第1段落）。",
      ], "First と Second の2つのしくみ", [
        ["First", "葉が日光を{{さえぎる}}。"],
        ["Second", "葉から水を{{蒸発させ}}、熱を使って空気を冷やす（汗と同じ）。"],
      ]),
      C("survival", 2, U.chobun, "第4段落の内容と一致するものを選べ。", [
        "Young street trees often lack water in summer, the very season when they need it most.",
        "Street trees grow best in soil that is packed hard by people walking.",
        "Almost all newly planted street trees survive their first few years.",
        "Successful programs spend money only on planting new trees.",
      ], 0, [
        "正解。it may receive little water during the dry summer months, precisely when it is most needed に一致。",
        "固い土は hostile environment（厳しい環境）の例。",
        "本文は a considerable proportion … die within their first few years。",
        "本文は not only for planting but also for years of watering and care。",
      ], "precisely when＝まさに～のときに", [
        ["根拠", "夏の乾いた時期、{{precisely when it is most needed}} に水が足りない。"],
        ["誤りの確認", "かなりの割合が{{枯れる}}。予算は{{世話にも}}。"],
      ]),
      C("inequality", 3, U.chobun, "第5段落の内容と一致するものを選べ。", [
        "Poorer districts tend to have fewer trees and suffer more during heat waves.",
        "Wealthy neighborhoods usually have less tree cover than poorer districts.",
        "Planting trees wherever there is open space helps the poorest residents most.",
        "Planners no longer use temperature maps when deciding where to plant trees.",
      ], 0, [
        "正解。poorer districts … have far fewer trees … they suffer most during heat waves に一致。",
        "逆。豊かな地区は generous tree cover（木が多い）。",
        "本文は may benefit those who need it least（必要の少ない人に役立つ）。",
        "本文は Planners increasingly use maps of surface temperature。",
      ], "far fewer・suffer most など比較の向き", [
        ["根拠", "貧しい地区は木が{{far fewer}}、暑さで{{suffer most}}。"],
        ["対策", "地表の温度の地図で、効果の{{大きい}}場所を選ぶ。"],
      ]),
      C("accent1", 2, U.hatsuon, ACC, ["phenomenon", "environment", "considerable", "infrastructure"], 3, [
        "phe-nóm-e-non：第2音節。",
        "en-ví-ron-ment：第2音節。",
        "con-síd-er-a-ble：第2音節。",
        "正解。ín-fra-struc-ture：第1音節。",
      ], "長い語も強勢の位置は1つずつ確かめる", [
        ["音節に分ける", "phe・NOM・e・non／en・VI・ron・ment／con・SID・er・a・ble。"],
        ["ちがうもの", "{{IN}}・fra・struc・ture だけが第1音節。"],
      ], K),
      C("accent2", 1, U.hatsuon, ACC, ["absorb", "release", "surface", "reduce"], 2, [
        "ab-sórb：第2音節。",
        "re-léase：第2音節。",
        "正解。súr-face：第1音節。",
        "re-dúce：第2音節。",
      ], "2音節の動詞は後ろ、名詞は前が多い", [
        ["動詞", "ab{{SORB}}・re{{LEASE}}・re{{DUCE}}：第2音節。"],
        ["名詞", "{{SUR}}face：第1音節。"],
      ], K),
      C("title", 2, U.chobun, "本文の表題として、内容を最もよく表すものを選べ。", [
        "Trees as a Lasting Defense Against Urban Heat",
        "Why Air Conditioners Are the Best Solution",
        "The History of Asphalt in Old City Centers",
        "How to Paint Roofs in Light Colors",
      ], 0, [
        "正解。都市の暑さへの対策としての木（効果・課題・位置づけ）が全体の主題。",
        "エアコンは熱を加える原因の1つとして出てくるだけ。",
        "アスファルトの歴史は扱っていない。",
        "屋根の塗装は、ほかの対策の例として出てくるだけ。",
      ], "部分的な例ではなく全体の主題を選ぶ", [
        ["主題", "都市の熱 → {{木}}の効果 → 枯れる・偏るという課題 → {{基盤}}として扱え。"],
        ["選ぶ", "木を対策の中心にすえた表題を選ぶ。"],
      ]),
    ],
    [
      { word: "urban heat island effect", meaning: "ヒートアイランド現象" },
      { word: "vapor", meaning: "水蒸気" },
      { word: "infrastructure", meaning: "社会の基盤となる設備" },
    ],
  ),
  reading(
    3,
    "languages",
    "消えゆく言語と再生の試み",
    "When a Language Falls Silent",
    `Roughly seven thousand languages are spoken in the world today, but they are very unevenly distributed. A small number of languages have hundreds of millions of speakers, while a great many are used by only a few thousand people, and some by fewer than a hundred. Linguists warn that a considerable proportion of the world's languages may no longer be spoken by the end of this century. When the last fluent speaker of a language dies, something [ 1 ] is lost.

Languages rarely disappear because their speakers die out. More often, they fade through a quieter process. Parents who speak a minority language decide that their children will have better chances in school and at work if they grow up speaking the dominant language of the country. The children may understand their grandparents' language but answer them in another. Within two or three generations, the old language is used only at ceremonies or by the elderly, and then not at all. {{(A) No one decides to abandon a language; it is abandoned one conversation at a time.}}

Why should this matter to anyone who does not speak the language in question? One answer is that every language contains knowledge accumulated over centuries. Communities that have lived in one region for a long time often have detailed vocabularies for local plants, animals, weather and landscapes, and these words can [ 2 ] information that is not recorded anywhere else: which plants have medicinal uses, for example, or how the behavior of certain birds signals a change in the season. When the words disappear, the knowledge they carry often disappears with them.

A second answer concerns the study of the human mind. Languages differ in fascinating ways. Some describe the position of objects mainly by directions such as north and south rather than by words like "left" and "right"; others mark in their grammar whether a speaker witnessed an event personally or heard about it from someone else. Each language that disappears removes one example from the evidence scientists can use to understand what human languages have in common and how far they can differ.

For the speakers themselves, the stakes are more personal. A language is bound up with songs, jokes, prayers and ways of addressing elders. Many people who grew up without learning their ancestral language describe a sense of loss, as though a door to their own family history had been closed. It is this feeling, more than any scientific argument, that has [ 3 ] a growing number of revival movements around the world.

Such movements have shown that decline is not always permanent. Some communities have created "language nests," preschools in which young children are cared for entirely in the threatened language by fluent elders. Others have paired learners with speakers for intensive one-to-one practice, recorded elders telling stories, and produced dictionaries and phone apps. Where a language has survived mainly in written documents, determined learners have even managed to bring it back into daily use. [ 4 ], revival is slow and demanding. A language cannot be saved by recordings alone; it survives only if people use it to talk about ordinary things such as breakfast, homework and the weather. {{(B) A dictionary can tell us what a language was; only its speakers can decide what it will become.}}`,
    [
      C("blank1", 2, U.vocab, "空所［ 1 ］に入る最も適切なものを選べ。", ["irreplaceable", "ordinary", "temporary", "affordable"], 0, [
        "正解。最後の話し手が亡くなると「かけがえのないもの」が失われる。以下で、その価値を説明していく。",
        "「ありふれたもの」が失われる、では以下の議論（知識・心の研究・個人の歴史）と合わない。",
        "「一時的なもの」では、失われる重大さを述べる文にならない。",
        "「安価なもの」では意味が通らない。",
      ], "以下の段落で何の価値を論じるか", [
        ["文脈", "以下の段落で、言語が失われると{{知識}}・{{研究の材料}}・{{個人の歴史}}が失われると述べる。"],
        ["選ぶ", "{{irreplaceable}}（取りかえのきかない）。"],
      ], K),
      C("blank2", 2, U.vocab, "空所［ 2 ］に入る最も適切なものを選べ。", ["preserve", "conceal", "reject", "exchange"], 0, [
        "正解。ほかのどこにも記録されていない情報を、ことばが「保存している」。直後の文「ことばが消えると知識も消える」と合う。",
        "情報を「隠す」では、ことばが知識を運ぶという話と合わない。",
        "情報を「拒む」では意味が通らない。",
        "情報を「交換する」では、not recorded anywhere else と結びつかない。",
      ], "直後の文が空所の言いかえ", [
        ["直後", "When the words disappear, {{the knowledge they carry}} often disappears。"],
        ["選ぶ", "ことばが知識を{{保存している}} → {{preserve}}。"],
      ], K),
      C("blank3", 2, U.vocab, "空所［ 3 ］に入る最も適切なものを選べ。", ["inspired", "prevented", "ended", "predicted"], 0, [
        "正解。喪失感こそが、ますます多くの再生運動を「生み出してきた」。次の段落で運動の例が続く。",
        "運動を「妨げた」では、次の段落の運動の成果と合わない。",
        "運動を「終わらせた」では、a growing number（増えている）と矛盾する。",
        "運動を「予測した」では意味が通らない。",
      ], "a growing number（増えている）と合う動詞", [
        ["文", "It is this feeling … that has [ 3 ] {{a growing number of}} revival movements。"],
        ["選ぶ", "感情が運動を{{かき立てた}} → {{inspired}}。"],
      ], K),
      C("blank4", 2, U.setsuzoku, "空所［ 4 ］に入る最も適切なものを選べ。", ["Even so", "As a result", "In short", "For instance"], 0, [
        "正解。再生に成功した例を挙げたあと、「それでも、再生は時間がかかり大変だ」と逆の面を述べる。",
        "成功例の結果として「時間がかかる」のではない。",
        "前の内容のまとめではなく、逆の面を加えている。",
        "後ろは例ではない。",
      ], "成功例のあとの「それでも」", [
        ["前", "言語の巣・一対一の練習・辞書やアプリ：{{成功例}}。"],
        ["後", "再生は{{遅く大変}}。前と逆の面なので {{Even so}}。"],
      ], K),
      C("one-conversation", 3, U.chobun, "下線部(A)の内容として最も適切なものを選べ。", [
        "言語は、誰かが捨てようと決めて消えるのではなく、日々の会話で使われなくなることが積み重なって消えていく。",
        "言語は、ある日の一度の会話をきっかけに突然消えてしまう。",
        "言語を捨てるかどうかは、会話のたびに話し合って決められる。",
        "誰も言語を捨てないので、言語が消えることはない。",
      ], 0, [
        "正解。前の段落の過程（親が主要な言語を選び、子どもが別の言語で答え、数世代で使われなくなる）をまとめた文。",
        "one conversation at a time は「一度に会話1つずつ」＝少しずつ。突然ではない。",
        "話し合って決めるのではなく、No one decides と述べている。",
        "後半で it is abandoned と、言語は捨てられると述べている。",
      ], "one ～ at a time＝1つずつ・少しずつ", [
        ["前半", "{{No one decides}}：誰かが決めるのではない。"],
        ["後半", "{{one conversation at a time}}：会話1つずつ、少しずつ捨てられる。"],
      ]),
      C("dictionary", 3, U.chobun, "下線部(B)の内容として最も適切なものを選べ。", [
        "辞書は言語の過去の姿を記録できるが、言語がこれからどうなるかは、それを話す人々にしか決められない。",
        "辞書があれば、話す人がいなくても言語の未来は守られる。",
        "話し手は、辞書を作ることで言語の過去を決めることができる。",
        "辞書は、言語がこれから変わる方向を正確に予測できる。",
      ], 0, [
        "正解。直前の「録音だけでは救えない。日常のことを話すのに使われてはじめて生き残る」の言いかえ。",
        "直前で A language cannot be saved by recordings alone と述べている。",
        "過去を決めるのではなく、未来を決めるのが話し手。",
        "辞書にできるのは what a language was（過去の姿）を示すこと。",
      ], "was（過去）と will become（未来）の対比", [
        ["辞書", "{{what a language was}}：かつての姿。"],
        ["話し手", "{{what it will become}}：これからの姿は話し手が決める。"],
      ]),
      C("process", 2, U.chobun, "第2段落の内容と一致するものを選べ。", [
        "Parents may stop passing on a minority language because they hope it will improve their children's chances.",
        "Most languages disappear because all of their speakers die at the same time.",
        "Children in such families usually cannot understand their grandparents at all.",
        "The old language is used more often at ceremonies as generations pass.",
      ], 0, [
        "正解。their children will have better chances in school and at work if they grow up speaking the dominant language に一致。",
        "本文は Languages rarely disappear because their speakers die out。",
        "本文は may understand their grandparents' language but answer them in another。",
        "儀式でだけ使われるようになり、やがて使われなくなる。使用が増えるのではない。",
      ], "rarely（めったにない）と more often（多くは）", [
        ["根拠", "親が、子の{{学校・仕事での機会}}のために主要な言語を選ぶ。"],
        ["誤りの確認", "話し手の死滅で消えるのは{{rarely}}。子は{{理解はできる}}。"],
      ]),
      C("diversity", 3, U.chobun, "第4段落の内容と一致するものを選べ。", [
        "Some languages show in their grammar whether the speaker saw an event directly.",
        "All languages use words like \"left\" and \"right\" to describe positions.",
        "Scientists do not need examples from small languages to study the human mind.",
        "Languages differ so little that the loss of one makes no difference to research.",
      ], 0, [
        "正解。others mark in their grammar whether a speaker witnessed an event personally に一致。",
        "本文は、方角で位置を表す言語もあると述べている。",
        "1つの言語が消えると証拠が1つ減る、と述べている。",
        "本文は Languages differ in fascinating ways。",
      ], "Some … ; others … で2つの例", [
        ["例1", "位置を{{方角}}で表す言語。"],
        ["例2", "出来事を{{自分で見たか}}を文法で示す言語。"],
      ]),
      C("nests", 2, U.chobun, "第6段落の内容と一致するものを選べ。", [
        "In \"language nests,\" young children spend their time with fluent elders who use only the threatened language.",
        "\"Language nests\" are recordings of elders telling stories.",
        "Revival movements have never succeeded with languages that survived only in writing.",
        "According to the author, recordings alone are enough to save a language.",
      ], 0, [
        "正解。preschools in which young children are cared for entirely in the threatened language by fluent elders に一致。",
        "言語の巣は preschools（就学前の施設）。録音は別の取り組み。",
        "本文は determined learners have even managed to bring it back into daily use。",
        "本文は A language cannot be saved by recordings alone。",
      ], "定義のあとのコンマ以下が説明", [
        ["定義", "\"language nests,\" {{preschools in which}} …：就学前の施設。"],
        ["内容", "子どもを{{その言語だけで}}世話するのは{{流ちょうな年長者}}。"],
      ]),
      C("accent1", 2, U.hatsuon, ACC, ["ceremony", "dominant", "fascinating", "vocabulary"], 3, [
        "cér-e-mo-ny：第1音節。",
        "dóm-i-nant：第1音節。",
        "fás-ci-nat-ing：第1音節。",
        "正解。vo-cáb-u-lar-y：第2音節。",
      ], "-ary・-ony の語も強勢は1つずつ確かめる", [
        ["第1音節", "{{CER}}emony・{{DOM}}inant・{{FAS}}cinating。"],
        ["ちがうもの", "vo{{CAB}}ulary だけが第2音節。"],
      ], K),
      C("accent2", 2, U.hatsuon, ACC, ["permanent", "document", "evidence", "determined"], 3, [
        "pér-ma-nent：第1音節。",
        "dóc-u-ment：第1音節。",
        "év-i-dence：第1音節。",
        "正解。de-tér-mined：第2音節。",
      ], "接頭辞 de- のあとに強勢がくる語", [
        ["第1音節", "{{PER}}manent・{{DOC}}ument・{{EV}}idence。"],
        ["ちがうもの", "de{{TER}}mined は第2音節。"],
      ], K),
    ],
    [
      { word: "dominant", meaning: "支配的な・主要な" },
      { word: "ancestral", meaning: "祖先の" },
      { word: "revival", meaning: "復活・再生" },
    ],
  ),
  reading(
    3,
    "risk",
    "危険の感じ方の心理",
    "Why We Fear the Wrong Things",
    `Many people feel nervous when they board an airplane, yet think nothing of driving to the airport, even though, mile for mile, travel by car is far more dangerous. Parents worry about rare dangers that receive heavy media coverage while paying less attention to common hazards in their own homes. Psychologists who study how people judge risk have found that these inconsistencies are not random. They follow patterns that reveal a great deal about how the human mind works.

One important pattern concerns memorable events. When people estimate how likely something is, they tend to rely on how easily examples come to mind. A dramatic accident that is reported again and again on television stays in memory far longer than the quiet statistics of everyday injuries. As a result, events that are vivid and unusual are often judged to be more common than they really are, while ordinary dangers that rarely make the news are [ 1 ].

A second pattern concerns control. People generally accept risks they have chosen for themselves more readily than risks imposed on them by others. A driver feels in charge of the car, even though the behavior of other drivers is beyond his control; a passenger on a plane has no such feeling. Similarly, many people are more troubled by tiny amounts of an unfamiliar chemical in their food than by the far greater health risks of habits they enjoy, such as eating too much sugar. {{(A) What feels voluntary feels safer, whether or not it actually is.}}

A third factor is the nature of the harm. Risks that could kill many people at once, such as a major industrial accident, tend to frighten us more than risks that kill the same number of people one at a time over many years. A single catastrophe is shocking in a way that a steady stream of individual tragedies is not. From a purely statistical point of view, this reaction may seem irrational. Yet it may also reflect a reasonable concern: a sudden disaster can [ 2 ] an entire community at once, damaging hospitals, schools and businesses together.

These patterns matter for public policy. Governments face pressure to spend large sums on preventing dramatic but rare dangers while giving less attention to common ones that cause far more harm in total. A city might respond to a single shocking incident by installing expensive new equipment, while doing little about a dangerous junction where minor accidents occur every week. {{(B) Resources, in other words, tend to follow fear rather than numbers.}}

It would be a mistake, however, to conclude that ordinary people are simply foolish and that experts should make all decisions about risk. Public concerns often contain information that statistics leave out, such as whether a risk is shared fairly, or whether the people responsible for it can be trusted. [ 3 ], experts themselves are not immune to the same biases. The most useful response is not to dismiss people's fears but to present information in ways that make comparisons easier: for example, by expressing risks as the number of people affected out of a thousand rather than as abstract percentages, and by setting new dangers alongside familiar ones.`,
    [
      C("blank1", 2, U.vocab, "空所［ 1 ］に入る最も適切なものを選べ。", ["underestimated", "exaggerated", "reported", "remembered"], 0, [
        "正解。while の対比：めずらしい出来事は実際より多いと判断され、ニュースにならない日常の危険は「過小評価される」。",
        "「誇張される」では while の対比にならない。",
        "rarely make the news（めったに報道されない）と矛盾する。",
        "思い浮かびにくいという段落の論旨と逆。",
      ], "while の前後は対比", [
        ["前", "めずらしい出来事は{{more common than they really are}} と判断される。"],
        ["後", "日常の危険はその逆 → {{underestimated}}（過小評価される）。"],
      ], K),
      C("blank2", 2, U.vocab, "空所［ 2 ］に入る最も適切なものを選べ。", ["overwhelm", "reassure", "overlook", "entertain"], 0, [
        "正解。突然の災害は、病院・学校・会社を同時に傷つけ、地域全体を一度に「圧倒する」。",
        "「安心させる」では damaging … と矛盾する。",
        "「見落とす」は災害を主語にすると意味が通らない。",
        "「楽しませる」は意味が通らない。",
      ], "コロン以下の damaging … が手がかり", [
        ["後ろ", "{{damaging hospitals, schools and businesses together}}。"],
        ["選ぶ", "地域全体を一度に{{打ちのめす}} → {{overwhelm}}。"],
      ], K),
      C("blank3", 2, U.setsuzoku, "空所［ 3 ］に入る最も適切なものを選べ。", ["Moreover", "Otherwise", "Instead", "In contrast"], 0, [
        "正解。「専門家がすべて決めるべきではない」理由を2つ目として加える。「さらに、専門家も同じ偏りをまぬかれない」。",
        "「さもなければ」は意味が通らない。",
        "「その代わりに」では、前の理由に加える流れにならない。",
        "前の文（一般の人の懸念にも情報がある）と後の文は対立せず、同じ方向の理由。",
      ], "同じ方向の理由を加える Moreover", [
        ["主張", "専門家にすべて任せるのは{{間違い}}。"],
        ["理由", "① 一般の懸念にも情報がある ＋ ② 専門家も{{偏りをまぬかれない}} → {{Moreover}}。"],
      ], K),
      C("voluntary", 3, U.chobun, "下線部(A)の内容として最も適切なものを選べ。", [
        "自分で選んだと感じられることは、実際に安全かどうかにかかわらず、より安全に感じられる。",
        "自分で選んだことは、実際にもより安全である。",
        "安全だと感じることは、自分で選ぶことができない。",
        "自分で選んだことでも、危険だと感じれば避けるべきだ。",
      ], 0, [
        "正解。whether or not it actually is (safer)＝実際にそうであるかどうかにかかわらず。運転と飛行機の例をまとめた文。",
        "whether or not it actually is と、実際の安全とは関係ないと述べている。",
        "選べるかどうかの話ではない。",
        "そのような助言はしていない。",
      ], "whether or not＝～かどうかにかかわらず", [
        ["前半", "{{What feels voluntary}} feels safer：自分で選んだと感じることは安全に感じる。"],
        ["後半", "{{whether or not it actually is}}：実際に安全かどうかは関係ない。"],
      ]),
      C("follow-fear", 3, U.chobun, "下線部(B)の内容として最も適切なものを選べ。", [
        "予算などの資源は、実際の被害の大きさよりも、人々の恐れの強さに応じて配られがちだ。",
        "人々は、数字よりも資源を恐れる傾向がある。",
        "資源を配るときには、恐れを数字で表すべきだ。",
        "資源を多く使うほど、人々の恐れは小さくなる。",
      ], 0, [
        "正解。直前の例（衝撃的な1件には高価な設備、毎週事故が起きる交差点は放置）を in other words でまとめている。",
        "資源を恐れるという話ではない。",
        "最終段落で提示のしかたを述べるが、この文は現状の説明。",
        "資源と恐れの大きさの因果は述べていない。",
      ], "in other words は前の例のまとめ", [
        ["例", "1件の衝撃的な事件には{{高価な設備}}、毎週事故の交差点は{{放置}}。"],
        ["まとめ", "資源は{{numbers}}（被害の数）ではなく{{fear}}に従う。"],
      ]),
      C("availability", 2, U.chobun, "第2段落の内容と一致するものを選べ。", [
        "People tend to judge an event as likely if examples of it come to mind easily.",
        "People usually remember everyday injuries longer than dramatic accidents.",
        "Vivid and unusual events are generally judged to be rarer than they really are.",
        "Television reports have no effect on how people estimate risk.",
      ], 0, [
        "正解。they tend to rely on how easily examples come to mind に一致。",
        "本文は逆。劇的な事故のほうが長く記憶に残る。",
        "本文は more common than they really are（実際より多い）と判断される。",
        "何度も報道されると記憶に残り、判断に影響する、と述べている。",
      ], "思い浮かびやすさで頻度を判断する", [
        ["根拠", "{{how easily examples come to mind}} に頼る。"],
        ["結果", "劇的な出来事は{{実際より多い}}と判断される。"],
      ]),
      C("control", 2, U.chobun, "第3段落の内容と一致するものを選べ。", [
        "People tend to accept risks they have chosen more easily than risks forced on them.",
        "Passengers on planes feel more in control than drivers of cars.",
        "Drivers can fully control the behavior of other drivers.",
        "Most people worry more about eating too much sugar than about unfamiliar chemicals.",
      ], 0, [
        "正解。People generally accept risks they have chosen for themselves more readily than risks imposed on them に一致。",
        "飛行機の乗客には has no such feeling（その感覚がない）。",
        "本文は the behavior of other drivers is beyond his control。",
        "逆。見知らぬ化学物質のほうを気にする。",
      ], "more readily than＝～より進んで", [
        ["根拠", "自分で選んだ危険を{{more readily}} 受け入れる。"],
        ["例", "運転者は{{自分が操る}}と感じる。乗客はそう感じない。"],
      ]),
      C("catastrophe", 3, U.chobun, "第4段落で、一度に多くの人が亡くなる危険を特に恐れることについて、筆者はどう述べているか。最も適切なものを選べ。", [
        "It may look irrational in purely statistical terms, but it can reflect a sensible concern about damage to a whole community.",
        "It is completely irrational and should be ignored by governments.",
        "It shows that statistics are always wrong about disasters.",
        "It proves that individual tragedies are more harmful than disasters.",
      ], 0, [
        "正解。this reaction may seem irrational. Yet it may also reflect a reasonable concern に一致。",
        "筆者は Yet で、合理的な面もあると述べている。",
        "統計が誤りだとは述べていない。",
        "そのような比較はしていない。",
      ], "may seem … Yet … の2つの見方", [
        ["統計の見方", "{{may seem irrational}}：不合理に見える。"],
        ["もう1つの見方", "{{Yet}}：地域全体が一度に傷つくという{{合理的な懸念}}。"],
      ]),
      C("author-view", 3, U.chobun, "最終段落での筆者の考えとして最も適切なものを選べ。", [
        "Risks should be presented in forms that make comparison easier, such as numbers out of a thousand.",
        "Ordinary people are foolish, so experts should make every decision about risk.",
        "Experts are completely free from the biases that affect ordinary people.",
        "Abstract percentages are the clearest way to explain risks to the public.",
      ], 0, [
        "正解。present information in ways that make comparisons easier … the number of people affected out of a thousand に一致。",
        "本文は It would be a mistake … to conclude that ordinary people are simply foolish。",
        "本文は experts themselves are not immune to the same biases。",
        "本文は rather than as abstract percentages と、百分率を退けている。",
      ], "not A but B の B が筆者の提案", [
        ["退けるもの", "人々の恐れを{{dismiss}}すること。"],
        ["提案", "{{比べやすい形}}（1000人中何人）で示す。"],
      ]),
      C("accent1", 2, U.hatsuon, ACC, ["statistics", "catastrophe", "industrial", "accident"], 3, [
        "sta-tís-tics：第2音節。",
        "ca-tás-tro-phe：第2音節。",
        "in-dús-tri-al：第2音節。",
        "正解。ác-ci-dent：第1音節。",
      ], "-ic(s)・-ial の語は直前の音節に強勢", [
        ["第2音節", "sta{{TIS}}tics・ca{{TAS}}trophe・in{{DUS}}trial。"],
        ["ちがうもの", "{{AC}}cident だけが第1音節。"],
      ], K),
      C("accent2", 1, U.hatsuon, ACC, ["control", "impose", "habit", "prevent"], 2, [
        "con-tról：第2音節（名詞でも動詞でも）。",
        "im-póse：第2音節。",
        "正解。háb-it：第1音節。",
        "pre-vént：第2音節。",
      ], "control は名詞でも第2音節", [
        ["第2音節", "con{{TROL}}・im{{POSE}}・pre{{VENT}}。"],
        ["ちがうもの", "{{HAB}}it だけが第1音節。"],
      ], K),
    ],
    [
      { word: "hazard", meaning: "危険（の原因）" },
      { word: "vivid", meaning: "鮮やかな・印象の強い" },
      { word: "immune to", meaning: "～をまぬかれている" },
    ],
  ),
];

// =====================================================================
// 第4問　和文英訳（会話文・短い論評の下線部を英語に）
// =====================================================================

function wsec(tag: number, id: string, unit: string, title: string, lead: string, material: { lang: "ja" | "en"; title?: string; body: string }, questions: QuestionB[], pick: number): ExamPoolSection {
  return {
    unit,
    tag: `keio-eigo:${tag}`,
    section: {
      id: `keio-en-${id}`,
      title,
      lead,
      style: "writing",
      examOnly: true,
      material: [{ kind: "passage", ...material }],
      pick,
      questions,
    },
  };
}

const TR_LEAD = "次の文章を読み、下線部を英語に訳せ。";
/** 和文英訳の採点基準 (10点) */
const trRubric = (frame: string[], words: string[], content: string[]): [string, number, string[]][] => [
  ["文の骨組み（構文・時制・語順）が正しい", 4, frame],
  ["語句の選び方・語法が適切", 3, words],
  ["内容にぬけ・つけ足しがない", 3, content],
];
const TR = (id: string, d: 1 | 2 | 3, label: string, model: string, also: string[], rubric: [string, number, string[]][], point: string, st: St[]): QuestionB => {
  const q = Wr(id, d, U.wabun, `下線部${label}を英語に訳せ。`, undefined, model, rubric, point, st, 300);
  if (q.answer.kind === "written") q.answer.alsoModels = also;
  return q;
};

const P4: ExamPoolSection[] = [
  wsec(4, "tr-bookshop", U.wabun, "会話文の和文英訳（町の古本屋）", TR_LEAD, {
    lang: "ja",
    body: `友人どうしの会話。
A：駅前の古本屋、来月で閉まるんだって。
B：えっ、本当？　{{ア　子どものころから通っていたのに、なくなるなんて信じられない。}}
A：ネットで買うほうが安いし早いからね。{{イ　でも、探していなかった本にたまたま出会えるのは、ああいう店ならではだと思う。}}
B：{{ウ　閉まる前に、もう一度だけ行っておこうよ。}}`,
  }, [
    TR("a", 2, "ア", "I can't believe it's going to disappear. I've been going there since I was a child.", ["It's hard to believe that it will be gone. I've been going there ever since I was little."], trRubric(["have been going", "since I was"], ["can't believe", "disappear"], ["子どものころから", "なくなる"]), "「～のころから通っている」は現在完了進行形", [
      ["文を分ける", "「信じられない」と「子どものころから通っていた」を{{2文}}に分けると書きやすい。"],
      ["時制", "今も続く習慣は {{I've been going there since I was a child}}。"],
    ]),
    TR("i", 3, "イ", "But I think coming across a book you weren't looking for is something you can only experience in a shop like that.", ["But I think only a shop like that lets you happen to find a book you weren't searching for."], trRubric(["I think", "is something", "only"], ["come across", "happen to"], ["探していなかった", "ああいう店ならでは"]), "「～ならでは」は only を使って言いかえる", [
      ["主語を決める", "「本にたまたま出会うこと」＝ {{coming across a book}}（動名詞）を主語に。"],
      ["ならでは", "「ああいう店でしかできない」と考えて {{only … in a shop like that}}。"],
    ]),
    TR("u", 1, "ウ", "Let's go there one more time before it closes.", ["Let's visit it once more before it closes down."], trRubric(["Let's", "before it closes"], ["one more time", "once more"], ["もう一度だけ", "閉まる前に"]), "時の副詞節の中は未来でも現在形", [
      ["形", "「～しよう」＝ {{Let's}}＋動詞の原形。"],
      ["時制", "before のあとは未来のことでも{{現在形}}：before it {{closes}}。"],
    ]),
  ], 2),
  wsec(4, "tr-smartphone", U.wabun, "会話文の和文英訳（スマートフォンの使い方）", TR_LEAD, {
    lang: "ja",
    body: `兄と妹の会話。
妹：最近、スマホを見ている時間が長すぎる気がする。
兄：{{ア　一日に何時間使っているか、確かめたことはある？}}
妹：ない。{{イ　知ったら落ちこみそうで、見る気になれないんだ。}}
兄：{{ウ　数字を知ることが、習慣を変える第一歩になるかもしれないよ。}}`,
  }, [
    TR("a", 1, "ア", "Have you ever checked how many hours a day you use it?", ["Have you ever found out how many hours you spend on it each day?"], trRubric(["Have you ever", "how many hours"], ["check", "a day"], ["一日に", "確かめた"]), "間接疑問は「疑問詞＋S＋V」の語順", [
      ["経験", "「～したことはある？」＝ {{Have you ever＋過去分詞}}。"],
      ["間接疑問", "how many hours {{you use it}}（S＋V の順）。do you use にしない。"],
    ]),
    TR("i", 3, "イ", "No. I'm afraid I'd feel depressed if I found out, so I don't feel like looking.", ["No. I don't feel like checking, because I think the result would make me feel down."], trRubric(["if I found out", "I'd", "so"], ["feel like", "depressed"], ["落ちこみそう", "見る気になれない"]), "「～する気になれない」＝ don't feel like -ing", [
      ["仮定", "まだ知らないことの想像なので {{I'd feel depressed if I found out}}（仮定法過去）。"],
      ["気になれない", "{{don't feel like}} looking。feel like のあとは動名詞。"],
    ]),
    TR("u", 2, "ウ", "Knowing the numbers might be the first step toward changing your habits.", ["Finding out the numbers could be your first step to changing your habits."], trRubric(["Knowing", "might be"], ["the first step toward", "habits"], ["数字を知ること", "第一歩"]), "step toward のあとは動名詞", [
      ["主語", "「数字を知ること」＝ {{Knowing the numbers}}。"],
      ["語法", "the first step {{toward changing}}：前置詞のあとは動名詞。"],
    ]),
  ], 2),
  wsec(4, "tr-cleanup", U.wabun, "会話文の和文英訳（川の清掃活動）", TR_LEAD, {
    lang: "ja",
    body: `同じクラスの二人の会話。
A：週末の川の清掃、参加する？
B：行きたいけど、{{ア　雨が降ったら中止になるのかな。}}
A：小雨なら行うって。{{イ　去年は思っていたよりずっと多くの人が集まって、二時間で終わったよ。}}
B：{{ウ　それなら、弟も誘ってみるね。人手は多いほうがいいだろうし。}}`,
  }, [
    TR("a", 2, "ア", "I wonder if it will be canceled if it rains.", ["I wonder whether they'll call it off if it rains."], trRubric(["I wonder if", "if it rains"], ["be canceled", "call off"], ["雨が降ったら", "中止"]), "名詞節の if は未来形、条件の if は現在形", [
      ["名詞節", "「～かな」＝ {{I wonder if}} …。この if 節は名詞節なので {{will be canceled}}。"],
      ["条件", "「雨が降ったら」は条件の副詞節なので {{if it rains}}（現在形）。"],
    ]),
    TR("i", 3, "イ", "Last year, far more people came than we had expected, and we finished in two hours.", ["Last year, many more people showed up than we expected, so it was over in two hours."], trRubric(["far more people", "than we had expected"], ["far / many more", "in two hours"], ["思っていたより", "二時間で終わった"]), "比較級の強調は far・much（数なら many）", [
      ["比較", "「ずっと多くの人」＝ {{far more people}}。数えられる名詞なので many more も可。"],
      ["時制", "集まった時より前の予想なので {{had expected}}。expected でも可。"],
    ]),
    TR("u", 2, "ウ", "In that case, I'll ask my brother to come too. The more people, the better.", ["Then I'll invite my younger brother as well. I guess the more people we have, the better."], trRubric(["I'll ask", "to come", "The more"], ["In that case", "the better"], ["弟も誘う", "人手は多いほうがいい"]), "「多いほどよい」＝ The more, the better", [
      ["誘う", "「誘ってみる」＝ {{ask him to come}} / {{invite him}}。その場で決めたことなので {{I'll}}。"],
      ["比較", "{{The more people, the better}}（the＋比較級, the＋比較級）。"],
    ]),
  ], 2),
  wsec(4, "tr-waiting", U.wabun, "論評文の和文英訳（待つことの価値）", TR_LEAD, {
    lang: "ja",
    body: `{{ア　便利になればなるほど、私たちは待つことが苦手になる。}}注文した品物が翌日に届くのが当たり前になると、三日かかるだけで不満を感じる。{{イ　しかし、待つ時間があるからこそ、楽しみが大きくなることもあるのではないだろうか。}}{{ウ　手紙の返事を何日も待った経験は、今の若い人にはほとんどないだろう。}}`,
  }, [
    TR("a", 2, "ア", "The more convenient life becomes, the worse we get at waiting.", ["The more convenient our lives become, the less patient we become."], trRubric(["The more convenient", "the worse"], ["be bad at", "waiting"], ["便利になる", "待つことが苦手"]), "the＋比較級 …, the＋比較級 ～", [
      ["構文", "「～すればするほど…」＝ {{The more convenient life becomes, the …}}。"],
      ["苦手", "be bad at の比較級で {{the worse we get at waiting}}。"],
    ]),
    TR("i", 3, "イ", "However, isn't it sometimes because we have to wait that our pleasure becomes greater?", ["But don't we sometimes enjoy things more precisely because we have to wait for them?"], trRubric(["because", "isn't it", "that"], ["pleasure", "greater"], ["待つ時間があるからこそ", "こともある"]), "「～からこそ」は強調構文か precisely because", [
      ["からこそ", "{{It is because … that ～}} の強調構文、または {{precisely because}}。"],
      ["ではないだろうか", "否定疑問で控えめに主張：{{isn't it …?}} / {{don't we …?}}。"],
    ]),
    TR("u", 3, "ウ", "Few young people today have ever waited days for a reply to a letter.", ["Hardly any young people today have had the experience of waiting several days for an answer to a letter."], trRubric(["Few", "have ever waited"], ["a reply to", "for days"], ["何日も", "ほとんどない"]), "「ほとんどない」は few を主語の前に", [
      ["主語", "「ほとんどの若者にない」＝ {{Few young people}} have …。"],
      ["経験", "現在完了で {{have ever waited days for a reply to a letter}}。"],
    ]),
  ], 2),
];

// =====================================================================
// 第5問　自由英作文（資料の見解を引用して論じる）
// =====================================================================

const ES_LEAD = "次の資料を読み、問いに英語で答えよ。";
const esPrompt = (q: string) =>
  `資料の見解を参考に、次の問いについてあなたの考えを英語で論じよ（140〜200語）。\n問い：${q}\n条件：① 自分の立場をはっきり示す。② 資料の見解を少なくとも1つ、著者名と年を示し、自分のことばで言いかえて取り上げる。③ 自分と異なる意見に触れ、それに反論する。④ 具体例を1つ以上挙げる。`;
const esRubric = (cite: string[]): [string, number, string[]][] => [
  ["立場がはっきりしていて、全体が一貫している", 6, ["I believe", "In my view"]],
  ["資料の見解を著者名・年つきで、自分のことばで言いかえて取り上げている", 6, cite],
  ["異なる意見に触れ、根拠をもって反論している", 6, ["Some may argue", "however"]],
  ["具体例が主張を支えている", 6, ["For example", "For instance"]],
  ["文法・語法・つづりの誤りが少なく、語数の条件を守っている", 6, []],
];
const ES = (id: string, d: 2 | 3, q: string, model: string, cite: string[], point: string, st: St[]): QuestionB =>
  Wr(id, d, U.jiyu, esPrompt(q), { min: 140, max: 200, unit: "語" }, model, esRubric(cite), point, st, 1500);

const P5: ExamPoolSection[] = [
  wsec(5, "es-four-day", U.jiyu, "自由英作文（週4日勤務）", ES_LEAD, {
    lang: "en",
    title: "Two Views on the Four-Day Week",
    body: `View 1 — Harlan (2021): Long hours do not guarantee high output. Tired employees make more mistakes and lose focus, so firms that cut the working week to four days can often keep production at the same level while improving their workers' health.

View 2 — Osei (2023): A four-day week may suit office jobs, but services such as hospitals, care homes and shops must operate every day. For them, a shorter week means hiring more staff, which raises costs. In some firms, employees are also pressured to work much longer days to make up for the lost day.`,
  }, [
    ES("opinion", 3, "Should companies in Japan introduce a four-day working week?", `I believe that Japanese companies should introduce a four-day working week, at least for office jobs. As Harlan (2021) argues, working longer does not automatically mean producing more, because exhausted employees tend to make errors. For example, a team with one fewer day may hold shorter meetings and spend its time on the tasks that really matter. An extra day off would also allow parents to look after their children without giving up full-time work.

Some may argue, as Osei (2023) does, that hospitals and shops must stay open every day, so a shorter week would force them to hire more staff. This is a fair point, but it does not mean that no company should change. Firms could introduce the system step by step, beginning with departments whose results are easy to check, and adjust it if problems appear. In my view, the benefits for workers' health and family life are too important to ignore, and the costs can be managed with careful planning.`, ["Harlan (2021)", "Osei (2023)"], "引用→例→反論→再主張の順に組み立てる", [
      ["構成", "① 立場 ② 資料の見解（{{著者名・年}}）と例 ③ 反対意見と{{反論}} ④ 結論。"],
      ["言いかえ", "資料の文をそのまま写さず、{{working longer does not automatically mean producing more}} のように自分のことばで。"],
    ]),
    ES("policy", 3, "What should the government do to reduce long working hours in Japan? Propose one policy and explain why it would work.", `In my view, the most effective policy would be to require every company to record its employees' working hours electronically and to publish the average amount of overtime each year. At present, many people stay late because overtime is hidden and therefore easy to ignore. Harlan (2021) points out that long hours do not guarantee high output, since tired workers make more mistakes. If overtime figures were public, firms would have a strong reason to organize work more efficiently.

For example, students choosing where to work could compare companies and avoid those with very long hours, so employers would compete to improve conditions. Some may argue that this rule would be a burden for small businesses. However, simple time-recording apps are now cheap and easy to use, and the government could provide them free of charge. A rule that makes the problem visible is fairer than one that simply bans overtime, because it lets each workplace find its own solution while still being held responsible.`, ["Harlan (2021)"], "政策提言型は「政策→しくみ→例→反論」", [
      ["提案を1つに", "政策は{{1つ}}にしぼり、なぜ効くのか（しくみ）を説明する。"],
      ["反論", "予想される反対（{{小さな会社の負担}}）に触れ、対策を示して答える。"],
    ]),
  ], 1),
  wsec(5, "es-city-traffic", U.jiyu, "自由英作文（都市の車の利用）", ES_LEAD, {
    lang: "en",
    title: "Two Views on Charging Drivers in City Centers",
    body: `View 1 — Brandt (2020): Charging drivers a fee to enter crowded city centers reduces traffic jams and air pollution. The money collected can be spent on faster and more frequent buses, which benefits everyone, including people who do not own a car.

View 2 — Lindqvist (2022): A flat entry fee is unfair to low-income workers who must drive, such as those who start work before trains run. It may also drive customers away from small shops in the center. Cities should improve public transport first and consider charges only afterward.`,
  }, [
    ES("opinion", 3, "Should large cities in Japan charge drivers a fee for entering their central areas?", `I believe that large Japanese cities should charge drivers a fee for entering their busiest central areas. Brandt (2020) explains that such a fee cuts traffic and pollution, and that the income can be used to improve buses. In other words, the charge does not simply punish drivers; it pays for better alternatives. For example, if the money funded buses that ran every five minutes, many commuters would gladly leave their cars at home.

Some may argue, as Lindqvist (2022) does, that a flat fee is unfair to people on low incomes who have no choice but to drive early in the morning. This concern is reasonable, but it can be solved through discounts for essential workers rather than by abandoning the idea. Moreover, many of the poorest residents do not own a car at all, so they would benefit from cleaner air and more reliable buses. In my view, a carefully designed charge would make city centers healthier and fairer for everyone.`, ["Brandt (2020)", "Lindqvist (2022)"], "反対意見は「一理ある→対策で解決」で返す", [
      ["引用", "{{Brandt (2020) explains that …}} のように、著者名と年を示して言いかえる。"],
      ["反論", "Lindqvist の懸念を認めつつ、{{割引}}という対策で答える。"],
    ]),
    ES("policy", 2, "What is the most effective way to reduce traffic in large cities? Propose one measure and explain why it would work.", `In my view, the most effective way to reduce traffic in large cities is to make buses faster by giving them their own lanes on major roads. Lindqvist (2022) argues that cities should improve public transport before asking drivers to pay, and I agree that people will only leave their cars if they have a convenient alternative. A bus that is stuck in the same traffic as cars offers no real advantage.

For example, if a bus lane allowed a commuter to reach the city center in twenty minutes instead of forty, many drivers would switch, and the remaining traffic would flow more smoothly. Some may argue that taking a lane away from cars will make traffic jams even worse. However, one bus can carry dozens of passengers in the space of two or three cars, so moving people onto buses uses road space far more efficiently. Dedicated bus lanes are also cheap compared with building new railways, so cities could introduce them quickly.`, ["Lindqvist (2022)"], "対策のしくみを数字の例で具体的に", [
      ["しくみ", "バス専用レーン → バスが{{速くなる}} → 車から{{乗りかえる}}。"],
      ["反論", "「車線が減って渋滞が悪化する」に、{{1台で何十人も運べる}}と答える。"],
    ]),
  ], 1),
  wsec(5, "es-remote", U.jiyu, "自由英作文（在宅勤務）", ES_LEAD, {
    lang: "en",
    title: "Two Views on Working from Home",
    body: `View 1 — Maddox (2022): Working from home allows employees to concentrate without the noise of a busy office and saves the hours they would spend commuting. Companies that offer this flexibility find it easier to keep talented staff.

View 2 — Ferreira (2024): Employees who rarely meet their colleagues learn less, especially at the start of their careers. Much practical knowledge is passed on through casual conversations, and offices help build the trust that teams need to work well together.`,
  }, [
    ES("opinion", 3, "Should companies require their employees to work in the office at least three days a week?", `I believe that companies should not require all employees to come to the office three days a week, although they should encourage teams to meet regularly. As Maddox (2022) notes, working from home lets people focus without the distractions of a crowded office and saves them the time they would otherwise spend on trains. For example, a programmer who spends two hours a day commuting could use that time to rest or to study.

Some may argue, like Ferreira (2024), that young employees learn less when they rarely see their colleagues. This is an important point, but a fixed rule for everyone is not the best answer. Instead, companies could ask new staff and their mentors to come in together on the same days, while allowing experienced workers to choose. In my view, flexible arrangements that match the needs of each job are more effective than a single rule, and they help companies keep skilled people who might otherwise leave for more flexible competitors.`, ["Maddox (2022)", "Ferreira (2024)"], "一律の規則と柔軟な対案をくらべる", [
      ["立場", "賛否をはっきり。部分的に認める場合も{{どちらの側か}}を最初に示す。"],
      ["反論", "Ferreira の懸念を認め、{{新人とメンターが同じ日に出社}}という対案で答える。"],
    ]),
    ES("policy", 2, "How can companies help new employees learn their jobs when many staff work from home? Propose one measure and explain why it would work.", `In my view, companies should pair every new employee with an experienced mentor and ask them to work in the office together on two fixed days each week. Ferreira (2024) points out that much practical knowledge is passed on through casual conversation, so new staff who work alone at home may miss out on it. A mentor who sits nearby can answer small questions immediately, which is difficult to do through scheduled video calls.

For example, a new member of a sales team could listen to how her mentor handles a difficult phone call and then discuss it with him over lunch. Some may argue that this system would take up too much of the mentor's time. However, the time spent helping a newcomer early on saves far more time later, because the new employee will make fewer mistakes. Companies could also reward mentors in their evaluations, so that guiding others is treated as part of the job rather than as an extra burden.`, ["Ferreira (2024)"], "提案は「誰が・いつ・何を」まで具体的に", [
      ["具体化", "新人と{{メンター}}を組み、{{週2日}}同じ日に出社、と具体的に。"],
      ["反論", "「メンターの負担」に、{{後で時間が節約される}}・評価に反映、と答える。"],
    ]),
  ], 1),
  wsec(5, "es-languages", U.jiyu, "自由英作文（消えゆく言語と方言）", ES_LEAD, {
    lang: "en",
    title: "Two Views on Protecting Endangered Languages",
    body: `View 1 — Okonkwo (2019): When a language or dialect disappears, a community loses knowledge, stories and a part of its identity that cannot be recovered. Spending public money on classes, recordings and dictionaries is a small price for protecting something irreplaceable.

View 2 — Reyes (2021): Public budgets are limited. Money for education should go first to teaching widely used languages, which help young people find jobs and communicate across borders. Communities that wish to keep a local language can do so through their own efforts.`,
  }, [
    ES("opinion", 3, "Should governments spend public money to protect endangered languages and regional dialects?", `I believe that governments should spend public money to protect endangered languages and regional dialects. Okonkwo (2019) argues that when a language disappears, the knowledge and identity it carries are lost forever, and I agree that this loss cannot be undone later. For example, the dialect of a fishing village may contain words for local winds and tides that are not recorded in any textbook.

Some may argue, as Reyes (2021) does, that limited budgets should be used to teach widely spoken languages such as English, because they help young people find jobs. However, these two goals do not compete as much as this view suggests. Recording elderly speakers and producing simple dictionaries costs very little compared with national education budgets. Moreover, communities often lack the money and skills to do this work by themselves, which is exactly why public support is needed. In my view, a small investment now is far wiser than regretting the loss of a language once its last speakers have gone.`, ["Okonkwo (2019)", "Reyes (2021)"], "反論は「両立できる」と示すのも有効", [
      ["引用", "{{Okonkwo (2019) argues that …}} と示し、資料の語句は言いかえる。"],
      ["反論", "Reyes の「予算は限られる」に、{{費用は小さい}}・{{地域だけでは難しい}}と答える。"],
    ]),
    ES("policy", 2, "What can be done to keep a minority language or regional dialect in everyday use? Propose one measure and explain why it would work.", `In my view, the best way to keep a minority language or regional dialect alive is to create after-school clubs where children spend time with elderly speakers and use the language in games, cooking and storytelling. Okonkwo (2019) stresses that a language carries knowledge and identity that cannot be recovered once it is gone, but recordings alone cannot keep it in daily use. Children need real conversations with people who speak it naturally.

For example, a club in a farming town could invite grandparents to teach the local names of vegetables while the children help prepare a meal. Some may argue, like Reyes (2021), that children would be better off spending that time learning English. However, a club that meets once or twice a week would hardly prevent anyone from studying other languages, and learning one language does not stop a child from learning another. Most importantly, such clubs would connect generations and give children pride in where they come from.`, ["Okonkwo (2019)", "Reyes (2021)"], "「日常で使う場」をつくる提案にする", [
      ["提案", "録音ではなく、子どもと話者が{{実際に話す場}}をつくる。"],
      ["反論", "「英語の時間が減る」に、{{週1〜2回}}なら妨げにならないと答える。"],
    ]),
  ], 1),
];

// =====================================================================

export const U_KEIO_EIGO: UnivExam = {
  key: "keio-eigo",
  univ: "慶應義塾大学",
  kamoku: "英語",
  tier: "早慶上智",
  order: 102,
  basis: "経済学部の傾向を参考",
  format: "大問5題・100分・200点。論説の長文3題（空所・内容一致・アクセント）に、和文英訳と資料を引用する自由英作文。",
  minutes: 100,
  groups: ["語彙", "文法", "技能"],
  sections: [
    { title: "第1問　長文読解（社会・経済の論説）", lead: READ_LEAD, count: [8, 8], mix: [0.1, 0.4, 0.5], points: 50, prefer: "material", poolTag: "keio-eigo:1" },
    { title: "第2問　長文読解（通念を問い直す論説）", lead: READ_LEAD, count: [8, 8], mix: [0.1, 0.4, 0.5], points: 50, prefer: "material", poolTag: "keio-eigo:2" },
    { title: "第3問　長文読解（科学・文化の論説）", lead: READ_LEAD, count: [8, 8], mix: [0.1, 0.4, 0.5], points: 50, prefer: "material", poolTag: "keio-eigo:3" },
    { title: "第4問　和文英訳", lead: TR_LEAD, count: [2, 2], mix: [0.1, 0.4, 0.5], points: 20, prefer: "material", poolTag: "keio-eigo:4" },
    { title: "第5問　自由英作文", lead: ES_LEAD, count: [1, 1], mix: [0.1, 0.4, 0.5], points: 30, prefer: "material", poolTag: "keio-eigo:5" },
  ],
  pool: [...P1, ...P2, ...P3, ...P4, ...P5],
};
