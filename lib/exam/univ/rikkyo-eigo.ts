import type { UnivExam } from "./types";
import type { ExamPoolSection } from "../pool/types";
import type { Question } from "@/lib/moshi/types";

// 立教大学型 英語（MARCH）。立教大学の一般入試は、多くの日程で英語の独自試験を課さず、英語資格・検定試験か共通テスト「英語」の得点を使う。
// 独自の英語試験（75分）を課すのは文学部（2月11日の日程）だけなので、その形式を参考にした練習用の型。
// 参考にした形式の情報（問題文・設問文は使っていない）:
//   https://www.rikkyo.ac.jp/admissions/undergraduate/mknpps000003zs4v-att/mknpps000003zscs.pdf  （2026年度 一般入試「英語」の出題意図: Ⅰ読解(選択)・Ⅱ読解(選択＋英文和訳)・Ⅲ文法(誤り箇所の指摘)・Ⅳ会話文(空所補充)・Ⅴ作文(英文の空所に適語を記述)）
//   https://search.keinet.ne.jp/2290/topics/12  （独自の英語試験は文学部のみ・それ以外は外部試験か共通テストを利用）
//   https://jyuke-labo.com/daigakujyukentaisaku/rikkyodaigaku/bungakubu/  （文学部の英語: 75分・200点・論説文の読解中心）
// 75分・200点・大問5題。英文・会話文はすべてこの模試のための書き下ろし（人物・場面は架空）。

const K = "rikkyo-eigo";
const CH = "h-eng-skill-chobun";
const G = (s: string) => `h-eng-gram-${s}`;
const V = (s: string) => `h-eng-vocab-${s}`;
type D = 1 | 2 | 3;
type St = [string, string][];

const steps = (s: St) => s.map(([title, body]) => ({ title, body }));
const sec = (d: D) => (d === 1 ? 45 : d === 2 ? 60 : 80);
const pts = (d: D) => (d === 1 ? 4 : d === 2 ? 5 : 6);

/** 4択 */
function ch(id: string, d: D, unit: string, prompt: string, options: string[], correct: number, why: string[], point: string, st: St, keepOrder = false): Question {
  return {
    id,
    type: "B",
    ...(keepOrder ? { keepOrder: true } : {}),
    difficulty: d,
    points: pts(d),
    seconds: sec(d),
    skill: d === 3 ? "思考・判断・表現" : "知識・技能",
    unit,
    prompt,
    answer: { kind: "choice", options, correct, why },
    point,
    steps: steps(st),
  };
}

/** 誤り箇所の指摘。sentence の ［…］ を順に (a)〜(d) とする */
function er(id: string, d: D, unit: string, sentence: string, wrong: number, why: string[], point: string, st: St): Question {
  const parts: string[] = [];
  const L = ["a", "b", "c", "d"];
  const shown = sentence.replace(/［([^］]+)］/g, (_, p: string) => {
    parts.push(p);
    return `(${L[parts.length - 1]})［${p}］`;
  });
  if (parts.length !== 4) throw new Error(`${id}: 下線部が4つでない`);
  return ch(id, d, unit, `次の英文の下線部(a)〜(d)のうち、文法・語法上誤っているものを1つ選べ。\n${shown}`, parts.map((p, i) => `(${L[i]}) ${p}`), wrong, why, point, st, true);
}

/** 英文和訳 (毎回出す) */
function wa(id: string, d: D, prompt: string, model: string, rubric: [string, number, string[]?][], point: string, st: St): Question {
  const total = rubric.reduce((s, r) => s + r[1], 0);
  return {
    id,
    type: "C",
    difficulty: d,
    points: total,
    seconds: 240,
    skill: "思考・判断・表現",
    unit: CH,
    prompt,
    answer: {
      kind: "written",
      limit: { max: 120, unit: "字" },
      model,
      rubric: rubric.map(([label, points, keywords]) => ({ label, points, ...(keywords ? { keywords } : {}) })),
    },
    point,
    steps: steps(st),
  };
}

/** 空所に入る英語1語の記述 */
function tm(id: string, d: D, unit: string, blank: string, first: string, accept: string[], point: string, st: St): Question {
  return {
    id,
    type: "B",
    difficulty: d,
    points: pts(d),
    seconds: sec(d),
    skill: d === 1 ? "知識・技能" : "思考・判断・表現",
    unit,
    prompt: `空所（${blank}）に入る最も適切な英語1語を書け。ただし、与えられた文字「${first}」で始まる語とする。`,
    answer: { kind: "term", accept, script: "any" },
    point,
    steps: steps(st),
  };
}

function S(n: number, id: string, unit: string, title: string, lead: string, lang: "ja" | "en", body: string, pick: number, questions: Question[], ptitle?: string): ExamPoolSection {
  return {
    unit,
    tag: `${K}:${n}`,
    section: {
      id: `re-${id}`,
      title,
      lead,
      style: "reading",
      examOnly: true,
      pick,
      material: [{ kind: "passage", lang, ...(ptitle ? { title: ptitle } : {}), body }],
      questions,
    },
  };
}

const LEAD1 = "次の英文を読み、問いに答えよ。";
const LEAD2 = "次の英文を読み、問いに答えよ。下線部(A)(B)は日本語に訳せ。";

// =====================================================================
// Ⅰ　読解（選択式）
// =====================================================================

const T1: ExamPoolSection[] = [
  S(1, "boredom", CH, "退屈の効用（心理）", LEAD1, "en",
    `Most of us treat boredom as a problem to be solved as quickly as possible. The moment a train is delayed or a meeting drags on, we reach for our phones, and the uncomfortable feeling disappears almost before we have noticed it. Yet a growing number of psychologists argue that this habit may come at a hidden cost. Boredom, they suggest, is not simply an empty state but a signal, and like other signals it can be (a)worth listening to.

Consider what boredom actually tells us. When we feel bored, our attention has nowhere satisfying to go. The activity in front of us fails to engage us, and the mind begins to search for something else. In this sense, boredom works much like hunger. Hunger is unpleasant, but it pushes us to look for food; boredom is unpleasant, but it pushes us to look for meaning or challenge. ( ア ) we silence the feeling every time it appears, we may also silence the search it was meant to start.

Some researchers have tried to test this idea in simple experiments. In one typical design, participants in one group are first given a dull task, such as copying numbers from a long list, while a second group goes straight to the next stage. Both groups are then asked to think of as many uses as possible for an ordinary object, like a brick or a paper cup. In several studies of this kind, the people who had been bored came up with more ideas, and more unusual ones. The results are not always (b)consistent, and the effect tends to be small, but they suggest that a period of mild boredom may prepare the mind to wander in productive directions.

Mind-wandering is the key. When nothing outside us holds our interest, our thoughts drift toward memories, plans, and loose associations. Much of this drifting is useless, but some of it is not. People often report that solutions to problems they had given up on came to them in the shower or on a long walk, moments when there was little to do but think. Boredom, ( イ ), may be the price we pay for a mental space in which new connections can form.

None of this means that all boredom is good. Chronic boredom, the kind that lasts for months and is tied to a lack of purpose, is linked to poorer well-being and should not be (c)dismissed as a creative opportunity. A student trapped in classes that never challenge her, or a worker whose job offers no variety, is not simply being given time to think. The useful kind of boredom is short and temporary; it appears, makes us restless, and then (d)gives way to something new.

What, then, should we do the next time we find ourselves waiting with nothing to do? The answer is not to seek out boredom for its own sake, but perhaps to resist the reflex of escaping it immediately. Leaving the phone in a pocket for ten minutes is a small experiment anyone can try. The discomfort may pass more quickly than expected, and what ( ウ ) it could be an idea worth keeping.`,
    7,
    [
      ch("worth", 1, CH, "下線部(a)の意味に最も近いものを選べ。",
        ["something that deserves our attention", "something that is too quiet to hear", "something that only experts can understand", "something that should be ignored"], 0,
        ["正しい。be worth listening to＝「耳を傾ける価値がある」＝注意を向けるに値する。", "worth は「価値」。音の大小の話ではない。", "専門家だけが理解できる、という内容は本文にない。", "反対の意味。筆者は退屈を「合図」として聞く価値があると言う。"],
        "be worth ～ing＝～する価値がある", [["形を見る", "{{be worth ～ing}} は「～する価値がある」。"], ["文脈", "直前で退屈は「合図（signal）」だと言っているので、「聞く価値がある」合図です。"]]),
      ch("consistent", 2, V("2000"), "下線部(b)の意味に最も近いものを選べ。",
        ["the same each time", "easy to measure", "widely reported", "carefully planned"], 0,
        ["正しい。consistent＝一貫した。実験の結果がいつも同じとは限らない、という文脈。", "measure（測る）の話ではない。", "広く報じられた、の意味はない。", "計画の話ではない。"],
        "consistent＝一貫した・矛盾のない", [["語の意味", "{{consistent}} は「一貫した、いつも同じ」。"], ["文脈", "but the effect tends to be small と続き、結果に「ばらつき」があることを認めている文です。"]]),
      ch("dismissed", 2, V("2000"), "下線部(c)の意味に最も近いものを選べ。",
        ["rejected as unimportant", "welcomed with enthusiasm", "explained in detail", "measured accurately"], 0,
        ["正しい。dismiss A as B＝AをBとして退ける・片づける。", "反対の方向。", "詳しく説明する、ではない。", "測定する、ではない。"],
        "dismiss A as B＝AをBだとして片づける", [["語の意味", "{{dismiss}} は「（考えなどを）退ける、取り合わない」。"], ["文脈", "慢性的な退屈を「創造の機会だ」と軽く片づけてはいけない、という主張です。"]]),
      ch("giveway", 2, V("jukugo"), "下線部(d)の意味に最も近いものを選べ。",
        ["is replaced by", "is caused by", "is opposed to", "is hidden from"], 0,
        ["正しい。give way to A＝Aに取って代わられる。", "原因の意味はない。", "反対する、ではない。", "隠れる、ではない。"],
        "give way to A＝Aに取って代わられる", [["熟語", "{{give way to A}} は「Aに道をゆずる」→「Aに取って代わられる」。"], ["文脈", "役に立つ退屈は短く、やがて新しい何かに変わる、という流れです。"]]),
      ch("blank-a", 1, G("setsuzokushi"), "空所（ア）に入る最も適切なものを選べ。",
        ["If", "Unless", "Although", "Until"], 0,
        ["正しい。「毎回その感覚を消してしまうなら、始まるはずの探索も消してしまうかもしれない」。", "「消さないかぎり」では意味が逆になる。", "譲歩では前後がつながらない。", "「消すまで」では意味が通らない。"],
        "条件と結果の関係を読む", [["前後の関係", "前半「感覚を毎回消す」→後半「探索も消すかもしれない」は{{条件と結果}}。"], ["答え", "{{If}} を入れると自然につながります。"]]),
      ch("blank-i", 2, CH, "空所（イ）に入る最も適切なものを選べ。",
        ["in other words", "on the contrary", "for example", "nevertheless"], 0,
        ["正しい。前の段落の内容（何もすることがないときに解決策が浮かぶ）を言いかえてまとめている。", "前の内容と反対のことを述べてはいない。", "具体例ではなく、まとめの文である。", "逆接ではない。"],
        "まとめ・言いかえの合図を選ぶ", [["文の役割", "この文は、直前の「シャワー中や散歩中にひらめく」をまとめ直しています。"], ["答え", "言いかえの {{in other words}}。"]]),
      ch("blank-u", 2, CH, "空所（ウ）に入る最も適切なものを選べ。",
        ["follows", "precedes", "prevents", "resembles"], 0,
        ["正しい。「その不快感のあとに続くもの」がとっておく価値のある考えかもしれない。", "「不快感の前に来るもの」では、スマホをしまう実験の結果にならない。", "「不快感をさまたげるもの」では意味が通らない。", "「不快感に似たもの」では文意に合わない。"],
        "時間の流れ（退屈→ひらめき）を追う", [["流れ", "退屈が「新しいものに変わる」という第5段落の内容を受けています。"], ["答え", "不快感の{{あとに来るもの}}＝{{follows}}。"]]),
      ch("second-group", 2, CH, "第3段落の実験で、2つ目のグループがしたこととして最も適切なものを選べ。",
        ["They did the idea task without doing the dull task first.", "They copied numbers for a longer time than the first group.", "They were not asked to think of any uses for an object.", "They used their phones while waiting for the next stage."], 0,
        ["正しい。goes straight to the next stage＝退屈な作業をせずに次の段階（使い道を考える課題）へ進んだ。", "数字を写したのは1つ目のグループ。", "Both groups are then asked … とあり、両方とも課題をした。", "スマホを使ったという記述はない。"],
        "go straight to＝直接～へ進む", [["該当箇所", "while a second group {{goes straight to the next stage}}。"], ["確かめる", "次の段階は、ありふれた物の使い道をできるだけ多く考える課題です。"]]),
      ch("true", 2, CH, "本文の内容と一致するものを選べ。",
        ["In the experiments described, people who first did a dull task tended to produce more ideas.", "The writer believes that people should try to be bored as often as possible.", "Chronic boredom is described as a valuable source of creativity.", "Boredom is compared to hunger because both feelings are pleasant."], 0,
        ["正しい。the people who had been bored came up with more ideas と一致する。", "最終段落 not to seek out boredom for its own sake と食いちがう。", "第5段落で慢性的な退屈は well-being の低下と結びつくとし、創造の機会として扱うなと述べる。", "第2段落で両方とも unpleasant（不快）とされている。"],
        "内容一致は本文の該当箇所と照らす", [["選択肢の語を探す", "dull task・hunger・chronic など、選択肢の語を本文で探します。"], ["食いちがいを見る", "「できるだけ退屈を」「慢性の退屈は創造の源」は本文の主張と逆です。"]]),
      ch("false", 3, CH, "本文の内容と一致しないものを選べ。",
        ["Studies have shown that the effect of boredom on creativity is large and reliable.", "Many people reach for their phones as soon as they have to wait.", "Some people find answers to old problems while walking or showering.", "The kind of boredom that helps us is brief rather than long-lasting."], 0,
        ["一致しない（これが答え）。第3段落 not always consistent, and the effect tends to be small と食いちがう。", "第1段落の内容と一致する。", "第4段落の内容と一致する。", "第5段落 short and temporary と一致する。"],
        "「大きく確実」は本文の留保と矛盾", [["留保に注意", "研究の結果には {{not always consistent}}・{{small}} という留保があります。"], ["答え", "「大きく確実な効果」は言いすぎで、本文と一致しません。"]]),
      ch("title", 3, CH, "本文の表題として最も適切なものを選べ。",
        ["The Hidden Usefulness of Brief Boredom", "Why Smartphones Make Us Bored", "Chronic Boredom in Schools and Offices", "How to Design a Psychology Experiment"], 0,
        ["正しい。短い退屈が心をさまよわせ、新しい考えにつながる、という全体の主旨に合う。", "スマホは導入の例にすぎない。", "慢性の退屈は第5段落の一部の話題。", "実験は主張を支える材料で、主題ではない。"],
        "表題は全体の主旨・一部の話題は外す", [["主旨", "短い退屈は{{合図}}であり、心を生産的にさまよわせる、が全体の主張。"], ["消去", "スマホ・慢性の退屈・実験は、それぞれ一部の話題です。"]]),
    ], "Listening to Boredom"),

  S(1, "birdsong", CH, "都市の鳥のさえずり（環境・科学）", LEAD1, "en",
    `Anyone who lives near a busy road knows how hard it can be to hold a conversation outdoors. Birds face a similar difficulty, and for them the problem is more serious. Many songbirds rely on their songs to defend territory and attract mates, so a song that cannot be heard is, in a sense, a song that has failed. Over the past few decades, scientists studying birds in cities have found that some species have begun to adjust the way they sing.

The most common change involves pitch. Traffic noise is concentrated at low frequencies, the deep rumble of engines and tyres. A bird whose song contains low notes will find those notes (a)drowned out, while higher notes travel more clearly above the noise. Researchers comparing populations of the same species in cities and in nearby forests have often found that urban birds sing at a slightly higher minimum pitch. The difference is not dramatic, but it is large enough to be measured, and it ( ア ) in many cities on different continents.

Timing is another tool. In some cities, birds that normally sing at dawn have been recorded starting earlier, before the morning traffic builds up. Others sing more during quiet periods, such as weekends, or simply sing louder when noise levels rise. This last response is familiar to humans: we, too, raise our voices without thinking when a room becomes noisy.

These adjustments raise an interesting question. Are urban birds changing because their genes have changed over generations, or are individual birds learning to sing differently during their own lifetimes? For many songbirds, singing is partly learned. Young birds listen to adults and practise until their songs (b)resemble the ones they hear. This means that a change in song can spread through a population quickly, without any change in genes. In at least some species, individual birds have been observed shifting their pitch up or down depending on how noisy their surroundings are at the moment. ( イ ), the rapid changes seen in cities may owe more to flexibility than to evolution.

Adapting, however, has its limits and its costs. A higher song may carry better through traffic, but it may also be less attractive to potential mates if females of that species prefer deeper songs. Singing louder or longer uses energy that could be spent on finding food. And not all species are able to adjust. Birds whose songs are fixed, or whose low notes are essential to their communication, may simply (c)avoid noisy areas altogether. In this way, noise does not only change how birds sing; it may also change which birds live in a city in the first place.

For city planners, these findings offer a practical lesson. Quieter road surfaces, lower speed limits near parks, and belts of trees that absorb sound all make cities more pleasant for people. They may also give birds a better chance of being heard. Protecting urban wildlife, it turns out, is not only about providing trees and water. It is also about ( ウ ) room for sound.`,
    7,
    [
      ch("drowned", 2, V("jukugo"), "下線部(a)の意味に最も近いものを選べ。",
        ["made impossible to hear by louder sounds", "repeated many times by other birds", "made more beautiful by the noise", "sung only near water"], 0,
        ["正しい。drown out＝（大きな音が）かき消す。", "ほかの鳥がくり返す、の意味はない。", "騒音で美しくなる、ではない。", "drown（おぼれる）からの連想で、水の話ではない。"],
        "drown out＝（大きな音が）かき消す", [["熟語", "{{drown out}} は「大きな音で聞こえなくする」。"], ["文脈", "低い音は交通騒音に消され、高い音は騒音の上をよく通る、という対比です。"]]),
      ch("resemble", 1, V("2000"), "下線部(b)の意味に最も近いものを選べ。",
        ["are similar to", "are louder than", "are different from", "are shorter than"], 0,
        ["正しい。resemble＝～に似ている。", "大きさの比較ではない。", "反対の意味。", "長さの比較ではない。"],
        "resemble＝～に似ている（他動詞）", [["語の意味", "{{resemble}} は「～に似ている」。前置詞なしで目的語をとります。"], ["文脈", "若い鳥は、聞いた歌に似るまで練習する＝歌は学習される。"]]),
      ch("avoid", 2, CH, "下線部(c)の内容として最も適切なものを選べ。",
        ["stay away from noisy places completely", "sing more quietly in noisy places", "move to noisy places in large groups", "change their songs to match the noise"], 0,
        ["正しい。avoid A altogether＝Aを完全に避ける。", "歌い方を変えられない鳥の話なので、静かに歌うのではない。", "騒がしい場所へ移るのは逆。", "歌を変えられない鳥についての文。"],
        "altogether＝完全に・すっかり", [["語の意味", "{{avoid}}＝避ける、{{altogether}}＝完全に。"], ["文脈", "歌を調整できない種は騒がしい場所にそもそも住まなくなる→都市に住む鳥の種類が変わる、と続きます。"]]),
      ch("blank-a", 2, G("judo"), "空所（ア）に入る最も適切なものを選べ。",
        ["has been observed", "has been ignored", "has been prevented", "has been invented"], 0,
        ["正しい。「その違いは各大陸の多くの都市で観察されてきた」。", "測定できる違いが「無視されてきた」では前と合わない。", "「防がれてきた」では意味が通らない。", "「発明された」では意味が通らない。"],
        "主語 it＝その違い に合う動詞を選ぶ", [["主語", "it は前の {{the difference}}（都市の鳥のほうが少し高い音で歌う違い）。"], ["答え", "測定でき、各地の都市で{{観察されてきた}}。"]]),
      ch("blank-i", 2, CH, "空所（イ）に入る最も適切なものを選べ。",
        ["Thus", "However", "Instead", "Meanwhile"], 0,
        ["正しい。歌は学習される・個体が音の高さを変える→だから都市での速い変化は柔軟性による、という結論。", "前の内容と逆のことは言っていない。", "「その代わりに」では前後がつながらない。", "「一方そのころ」では因果が示せない。"],
        "根拠→結論の流れに合う語", [["前の内容", "歌は{{学習される}}、個体が騒音に応じて音の高さを変える。"], ["結論", "→ 変化は進化より{{柔軟性}}による。因果をつなぐ {{Thus}}。"]]),
      ch("blank-u", 1, V("jukugo"), "空所（ウ）に入る最も適切なものを選べ。",
        ["making", "losing", "filling", "selling"], 0,
        ["正しい。make room for A＝Aのための余地をつくる。", "余地を失う、では保護にならない。", "fill room は熟語にならない。", "意味が通らない。"],
        "make room for A＝Aのための場所を空ける", [["熟語", "{{make room for A}}「Aのための余地をつくる」。"], ["文脈", "静かな道路などで、音が届く余地をつくることも保護になる、という結び。"]]),
      ch("last-response", 2, CH, "第3段落の This last response が指す内容として最も適切なものを選べ。",
        ["singing louder when it becomes noisy", "singing earlier before the traffic starts", "singing more on weekends", "singing at a higher pitch"], 0,
        ["正しい。直前の「最後に挙げた反応」は sing louder when noise levels rise。人間も騒がしいと声を大きくする、と続く。", "最初に挙げた反応。", "2番目に挙げた反応。", "第2段落の話題で、この段落の反応ではない。"],
        "last＝並べたものの最後のもの", [["並びを確認", "早く歌う → 静かな時間に歌う → {{大きな声で歌う}}の順に並んでいます。"], ["確かめる", "人も騒がしい部屋で声を大きくする、という説明と合います。"]]),
      ch("low-notes", 2, CH, "第2段落によると、低い音が都市で不利なのはなぜか。",
        ["Traffic noise is mostly made up of low sounds.", "Low notes use more energy than high notes.", "Females of every species prefer high songs.", "Low notes cannot travel through trees."], 0,
        ["正しい。Traffic noise is concentrated at low frequencies と一致。", "エネルギーの話は第5段落で、低音が不利な理由ではない。", "第5段落は低い歌を好む種もありうると述べている。", "木の話は本文にない。"],
        "理由は直前の文にある", [["該当箇所", "Traffic noise is concentrated at {{low frequencies}}."], ["つなげる", "低い音は騒音と重なって消され、高い音はよく通ります。"]]),
      ch("true", 2, CH, "本文の内容と一致するものを選べ。",
        ["Some birds in cities have been recorded singing earlier in the morning than usual.", "Urban birds sing at a much lower pitch than forest birds of the same species.", "Scientists have proved that city birdsong changes only through genetic change.", "Every species of songbird can easily adjust its song to traffic noise."], 0,
        ["正しい。第3段落 have been recorded starting earlier, before the morning traffic builds up と一致。", "第2段落は都市の鳥のほうが少し「高い」と言う。", "第4段落は学習・柔軟性による可能性を述べている。", "第5段落 not all species are able to adjust と食いちがう。"],
        "much・only・every など強い語に注意", [["該当箇所", "第3段落 birds … {{starting earlier}}。"], ["消去", "lower・only・every は本文と食いちがう言いすぎです。"]]),
      ch("false", 3, CH, "本文の内容と一致しないものを選べ。",
        ["A higher song is always more attractive to potential mates.", "Singing louder may take energy away from finding food.", "Noise may affect which species live in a city.", "Belts of trees can make cities quieter for both people and birds."], 0,
        ["一致しない（これが答え）。第5段落は高い歌が相手にとって魅力が「劣る」こともありうると述べる。", "第5段落と一致する。", "第5段落最後の文と一致する。", "第6段落と一致する。"],
        "always は本文の may と矛盾", [["該当箇所", "A higher song … {{may also be less attractive}} to potential mates。"], ["答え", "「いつも魅力的」は本文と逆です。"]]),
      ch("title", 3, CH, "本文の表題として最も適切なものを選べ。",
        ["How Noise Is Reshaping Birdsong in Cities", "The Best Trees to Plant in a City Park", "Why Birds Sing Only at Dawn", "Human Voices in Noisy Rooms"], 0,
        ["正しい。騒音に応じて鳥の歌い方（高さ・時間・大きさ）が変わる、という全体の主題。", "木は最終段落の一部の提案。", "夜明けの歌は例の一つで、only も本文に合わない。", "人の声は比喩として出てくるだけ。"],
        "全体の主題＝騒音と鳥の歌の変化", [["主題", "どの段落も{{騒音}}と{{鳥の歌}}の関係を扱っています。"], ["消去", "木・夜明け・人の声は部分的な話題です。"]]),
    ], "Songs Above the Noise"),

  S(1, "translation", CH, "翻訳者の選択（言語・文化）", LEAD1, "en",
    `When we read a novel in translation, we rarely think about the person who stood between the author and us. Yet every page of a translated book is the result of hundreds of small decisions, and two translators working on the same text will almost never produce the same result. Understanding why helps us see that translation is less a mechanical process than a form of careful, creative reading.

The first difficulty is that words in different languages seldom match perfectly. A word may have one central meaning but also carry associations, a tone, or a history that its closest equivalent lacks. A term that sounds warm and old-fashioned in one language may have a neutral or even official ring in another. The translator must decide which part of the meaning matters most in a particular sentence, knowing that something will (a)inevitably be lost.

Sound and rhythm create further problems. Poetry is the obvious example, since a poem's effect often depends on rhyme, repetition, or the number of syllables in a line. But prose has rhythm too. A writer who uses long, flowing sentences creates a very different mood from one who prefers short, sharp ones. Some languages allow sentences to be built in ways that would sound clumsy in others, so the translator must find a structure that ( ア ) the original's effect even when it cannot copy its form.

Then there is the question of culture. A story may mention a festival, a type of food, or a polite expression that readers of the original language understand immediately but foreign readers do not. The translator has several options. She can keep the original word and trust readers to work out its meaning from the context. She can replace it with something familiar to the new audience. Or she can add a short explanation, either in the text or in a note. Each choice has (b)drawbacks. Keeping the original may confuse readers; replacing it may erase the very details that make the story feel rooted in a particular place; adding explanations may slow the story down.

Because of these choices, translators are sometimes described as invisible, and a good translation is often praised for reading "as if it had been written in English." This ideal is not shared by everyone. Some translators believe that readers should be ( イ ) that they are reading a foreign work, and they deliberately keep unusual phrases or word orders. In their view, a translation that sounds too smooth hides the differences between cultures that make reading foreign literature worthwhile.

Neither approach is simply right or wrong. What matters is that the translator's decisions are thoughtful and consistent. A reader who compares two translations of the same book can learn a great deal, not only about the translators but also about the original. The places where the versions (c)differ most are often the places where the original is richest, where a single phrase holds more than any one language can easily carry. Seen in this light, the existence of many translations is not a sign of failure but ( ウ ) evidence of how much a great book contains.`,
    7,
    [
      ch("inevitably", 2, V("2000"), "下線部(a)の意味に最も近いものを選べ。",
        ["unavoidably", "occasionally", "deliberately", "rapidly"], 0,
        ["正しい。inevitably＝避けられずに、必ず。", "「ときどき」では「必ず何かが失われる」の意味にならない。", "「わざと」ではない。", "「速く」ではない。"],
        "inevitably＝避けられずに", [["語の意味", "{{inevitable}}＝避けられない。in-（否定）＋evitable（避けられる）。"], ["文脈", "語は完全には一致しないので、訳せば{{必ず}}何かが失われる。"]]),
      ch("drawbacks", 1, V("2000"), "下線部(b)の意味に最も近いものを選べ。",
        ["disadvantages", "translations", "examples", "rewards"], 0,
        ["正しい。drawback＝欠点・不利な点。直後に3つの選択それぞれの欠点が並ぶ。", "翻訳そのものではない。", "例ではない。", "反対の意味。"],
        "drawback＝欠点", [["語の意味", "{{drawback}} は「欠点・難点」。"], ["確かめる", "直後に「混乱させる」「細部を消す」「話を遅くする」と、欠点が並びます。"]]),
      ch("differ", 2, CH, "下線部(c)の内容として最も適切なものを選べ。",
        ["The two translations are least alike.", "The two translations are most accurate.", "The two translations are most popular.", "The two translations are easiest to read."], 0,
        ["正しい。differ most＝最も異なる＝最も似ていない。", "正確さの話ではない。", "人気の話ではない。", "読みやすさの話ではない。"],
        "differ＝異なる、most＝最も", [["語の意味", "{{differ}}＝異なる。most がついて「いちばん違う」。"], ["言いかえ", "least alike（最も似ていない）が同じ意味です。"]]),
      ch("blank-a", 2, CH, "空所（ア）に入る最も適切なものを選べ。",
        ["preserves", "ignores", "reduces", "copies"], 0,
        ["正しい。形は写せなくても、元の文の効果を保つ構造を探す。", "効果を無視する、では訳者の努力にならない。", "効果を弱める、では目的に反する。", "even when it cannot copy its form と矛盾する。"],
        "even when 以下との対比で考える", [["対比", "形（form）は写せない ↔ {{効果}}（effect）は保ちたい。"], ["答え", "{{preserves}}（保つ）。"]]),
      ch("blank-i", 2, CH, "空所（イ）に入る最も適切なものを選べ。",
        ["reminded", "prevented", "forbidden", "unaware"], 0,
        ["正しい。be reminded that …＝…ということを思い出させられる。外国の作品だと気づかせるため、わざと珍しい表現を残す。", "be prevented that の形はとらない。", "be forbidden that の形はとらない。", "「気づかないように」では、わざと珍しい語順を残す理由と逆になる。"],
        "remind A that …＝Aに…を思い出させる", [["語法", "{{remind A that …}} の受け身 A is reminded that …。"], ["文脈", "わざと変わった表現を残す＝外国の作品だと{{気づかせる}}ため。"]]),
      ch("blank-u", 3, CH, "空所（ウ）に入る最も適切なものを選べ。",
        ["rather", "hardly", "never", "scarcely"], 0,
        ["正しい。not A but rather B＝AではなくむしろB。", "hardly では「ほとんど証拠ではない」となり、but の後と合わない。", "never でも同じく否定になり矛盾する。", "scarcely も否定で矛盾する。"],
        "not A but (rather) B の形", [["形", "{{not}} a sign of failure {{but}} … と続く、not A but B の形。"], ["答え", "強めの {{rather}} が入ります。否定語は入りません。"]]),
      ch("not-option", 2, CH, "第4段落で、文化に根ざした語について訳者がとりうる方法として挙げられていないものを選べ。",
        ["leaving out the passage that contains the word", "keeping the original word", "replacing it with something familiar", "adding a short explanation"], 0,
        ["挙げられていない（これが答え）。その部分を削る方法は本文にない。", "keep the original word として挙がっている。", "replace it with something familiar として挙がっている。", "add a short explanation として挙がっている。"],
        "挙げられた3つを本文で確かめる", [["数える", "第4段落の選択肢は {{keep}}・{{replace}}・{{add}} の3つ。"], ["答え", "削除（leave out）は挙がっていません。"]]),
      ch("this-ideal", 3, CH, "第5段落の This ideal が指す内容として最も適切なものを選べ。",
        ["a translation that reads as if it were originally written in English", "a translation that keeps unusual word orders", "a translation that adds many notes", "a translation that is done word by word"], 0,
        ["正しい。直前の「最初から英語で書かれたかのように読める」翻訳をほめる考え。", "これは This ideal に反対する訳者のやり方。", "注を増やすことは理想として述べられていない。", "逐語訳は本文で理想とされていない。"],
        "This＋名詞 は直前の内容を指す", [["直前の文", "a good translation is praised for reading {{as if it had been written in English}}。"], ["確かめる", "このあと、この理想に賛成しない訳者もいる、と続きます。"]]),
      ch("true", 2, CH, "本文の内容と一致するものを選べ。",
        ["Some translators intentionally keep unusual expressions so that readers notice the work is foreign.", "The writer argues that only one correct translation exists for each book.", "According to the passage, prose has no rhythm, unlike poetry.", "Translators always choose to explain cultural terms in notes."], 0,
        ["正しい。第5段落 deliberately keep unusual phrases or word orders と一致。", "第6段落 Neither approach is simply right or wrong、多くの訳の存在は失敗ではない、と食いちがう。", "第3段落 But prose has rhythm too と食いちがう。", "注は選択肢の一つにすぎず、always ではない。"],
        "deliberately＝intentionally の言いかえ", [["言いかえ", "{{deliberately}} は {{intentionally}}（わざと）と同じ。"], ["消去", "only one・no rhythm・always は本文と食いちがいます。"]]),
      ch("false", 3, CH, "本文の内容と一致しないものを選べ。",
        ["Comparing two translations tells us nothing about the original work.", "Two translators rarely produce the same version of a text.", "A word's tone can differ between languages.", "Replacing a cultural detail may make a story feel less tied to a place."], 0,
        ["一致しない（これが答え）。第6段落 not only about the translators but also about the original と食いちがう。", "第1段落 will almost never produce the same result と一致。", "第2段落と一致。", "第4段落と一致。"],
        "not only A but also B を正確に読む", [["該当箇所", "learn a great deal, not only about the translators but {{also about the original}}。"], ["答え", "「原作について何もわからない」は逆です。"]]),
      ch("title", 3, CH, "本文の主旨として最も適切なものを選べ。",
        ["Translation involves many thoughtful choices, and different versions reveal the richness of the original.", "Translation is a mechanical process that computers will soon replace.", "Poetry cannot be translated, so readers should learn foreign languages.", "Translators should always make their work sound completely natural in English."], 0,
        ["正しい。第1段落の「創造的な読み」と第6段落の結論をまとめている。", "第1段落 less a mechanical process と食いちがう。", "詩の難しさは一つの例で、翻訳できないとは言っていない。", "その理想に反対する立場も紹介され、どちらも正しいとは言えないとしている。"],
        "主旨は最初と最後の段落で確かめる", [["最初と最後", "第1段落：翻訳は{{創造的な読み}}。第6段落：多くの訳は原作の{{豊かさ}}の証拠。"], ["答え", "両方をまとめた選択肢を選びます。"]]),
    ], "The Choices Behind a Translation"),
];

// =====================================================================
// Ⅱ　読解（選択式＋英文和訳）
// =====================================================================

const T2: ExamPoolSection[] = [
  S(2, "museum", CH, "博物館の収蔵庫（文化・歴史）", LEAD2, "en",
    `Visitors to a large museum may spend a whole day walking through its galleries and still feel they have seen only a fraction of what is there. In fact, they have seen far less than they imagine. Most major museums display only a small percentage of their collections at any one time; the rest is kept in storerooms, carefully labelled and packed away, sometimes for decades. To many people this seems like a waste. Why collect objects that no one will see?

The answer begins with the purpose of a collection. A museum is not only a place for exhibitions but also an archive for research. A scientist studying how a species of beetle has changed over a century needs hundreds of examples, not the three or four that might fit in a display case. A historian of clothing may need to compare dozens of garments from the same period to understand how ordinary people dressed. (A)Objects that would look almost identical to a casual visitor can be extremely valuable to a specialist, precisely because they allow small differences to be noticed.

There are also practical reasons for keeping objects out of sight. Light, heat, and humidity slowly damage many materials. Paper fades, textiles weaken, and certain colours change if they are exposed for too long. For this reason, some fragile items are shown only for a few months and then (a)rested in darkness for several years. Rotating objects in this way allows a museum to share its treasures with the public while ( ア ) them for future generations.

Storerooms, however, are not without problems. Keeping millions of objects in suitable conditions is expensive, and many museums struggle to find enough space and staff. Some objects arrive with little information about where they came from, which makes them hard to study or display. In recent years, museums have also faced difficult questions about objects taken from other countries during periods of colonial rule. When an object has been in storage for a long time, people may reasonably ask whether it should remain there or be returned to the community that (b)originally made it.

New technology is changing the relationship between storerooms and the public. Many museums now photograph their collections in high detail and publish the images online, so that anyone can examine objects that were previously ( イ ) to all but a few researchers. Some have opened "visible storage" areas, where visitors can look through glass at shelves of objects that are not formally exhibited. These efforts do not replace the experience of standing in front of a real object, but they make the hidden part of a museum less hidden.

(B)Perhaps the most important change is in how we think about what a museum is for. A museum that measures its success only by the number of visitors to its galleries will always see its storerooms as a burden. One that sees itself as a guardian of knowledge, however, will (c)regard them as one of its greatest strengths.`,
    5,
    [
      wa("wayaku-a", 2, "下線部(A)を日本語に訳せ。",
        "何気なく見る来館者にはほとんど同じに見える物が、専門家にとってはきわめて貴重でありうる。それはまさに、そうした物によって小さな違いに気づくことができるからである。",
        [["Objects that would look almost identical to a casual visitor（関係代名詞節が Objects を修飾）を「何気ない来館者にはほとんど同じに見える物」と訳せている", 2, ["ほとんど同じ", "来館者"]], ["can be extremely valuable to a specialist を「専門家にはきわめて貴重でありうる」と訳せている", 2, ["専門家", "貴重"]], ["precisely because を「まさに～だからこそ」と訳せている", 2, ["まさに"]], ["allow small differences to be noticed（allow O to V）を「小さな違いに気づくことを可能にする」と訳せている", 2, ["違い", "気づく"]]],
        "関係詞節と allow O to V をおさえる", [["骨組み", "主語は {{Objects that … visitor}}、動詞は {{can be}}。that 節が Objects を修飾します。"], ["後半", "{{precisely because}}＝まさに～だから。{{allow O to be noticed}}＝Oが気づかれるのを可能にする。"]]),
      wa("wayaku-b", 2, "下線部(B)を日本語に訳せ。",
        "おそらく最も重要な変化は、博物館が何のためにあるのかについての私たちの考え方にある。",
        [["Perhaps the most important change is を「おそらく最も重要な変化は～にある」と訳せている", 2, ["最も重要な変化"]], ["in how we think about を「～についての私たちの考え方に」と訳せている", 3, ["考え方"]], ["what a museum is for を「博物館が何のためにあるのか」と訳せている", 3, ["何のため"]]],
        "what A is for＝Aは何のためにあるか", [["骨組み", "{{the change is in ～}}＝変化は～にある。how we think about ～＝～についての考え方。"], ["前置詞の for", "{{what a museum is for}} は「博物館は何のためのものか」。for が文末に残る形です。"]]),
      ch("rested", 2, CH, "下線部(a)の内容として最も適切なものを選べ。",
        ["kept in storage without being shown", "cleaned and repaired by experts", "sent to other museums for exhibitions", "displayed under strong light"], 0,
        ["正しい。光などによる傷みを防ぐため、数年間暗い所で休ませる＝展示せず保管する。", "修理の話ではない。", "貸し出しの話ではない。", "光は傷みの原因で、逆。"],
        "rest＝（展示から）休ませる", [["文脈", "数か月だけ展示し、そのあと{{暗い所}}で数年休ませる。"], ["理由", "光・熱・湿気が素材を傷めるからです。"]]),
      ch("originally", 1, V("2000"), "下線部(b)の意味に最も近いものを選べ。",
        ["at first", "carefully", "recently", "secretly"], 0,
        ["正しい。originally＝もともと、最初に。", "「注意深く」ではない。", "「最近」は反対に近い。", "「ひそかに」ではない。"],
        "originally＝もともと", [["語の意味", "{{origin}}（起源）の副詞形で「もともと、最初は」。"], ["文脈", "それを{{もともと作った}}共同体に返すべきか、という問い。"]]),
      ch("regard", 2, V("2000"), "下線部(c)の意味に最も近いものを選べ。",
        ["consider", "ignore", "repair", "rent"], 0,
        ["正しい。regard A as B＝AをBとみなす（consider A (to be) B）。", "反対に近い。", "修理ではない。", "貸すではない。"],
        "regard A as B＝AをBとみなす", [["語法", "{{regard A as B}}＝AをBとみなす。"], ["対比", "来館者数だけで測る館は収蔵庫を「重荷」と見る ↔ 知の守り手は「強み」と見る。"]]),
      ch("blank-a", 2, CH, "空所（ア）に入る最も適切なものを選べ。",
        ["protecting", "selling", "damaging", "forgetting"], 0,
        ["正しい。公開しつつ、将来の世代のために守る。", "売る話ではない。", "傷めないための工夫なので逆。", "忘れる、では意味が通らない。"],
        "while ～ing＝～しながら（同時に）", [["対比", "share with the public（公開する）と for future generations（将来のため）を両立させる。"], ["答え", "{{protecting}}（守る）。"]]),
      ch("blank-i", 2, CH, "空所（イ）に入る最も適切なものを選べ。",
        ["unavailable", "open", "familiar", "useful"], 0,
        ["正しい。以前はごく少数の研究者以外には見られなかった物を、今は誰でも見られる。", "open to all but a few では「少数以外の全員に公開」となり、now anyone can と対比にならない。", "「なじみがある」では対比にならない。", "役に立つ、では意味が合わない。"],
        "all but A＝A以外のすべて", [["表現", "{{all but a few researchers}}＝ごく少数の研究者以外の全員。"], ["対比", "今は {{anyone}} が見られる ↔ 以前は少数以外は{{見られなかった}}。"]]),
      ch("true", 2, CH, "本文の内容と一致するものを選べ。",
        ["Some fragile objects are displayed only for limited periods to reduce damage.", "Most major museums display the majority of their collections at once.", "Online images have completely replaced visits to real museums.", "Objects in storerooms are never used for research."], 0,
        ["正しい。第3段落 shown only for a few months と一致。", "第1段落 only a small percentage と食いちがう。", "第5段落 do not replace the experience と食いちがう。", "第2段落で収蔵品は研究用の資料とされる。"],
        "数量・程度の語に注意して照合", [["該当箇所", "fragile items are shown {{only for a few months}}。"], ["消去", "majority・completely・never は本文と食いちがいます。"]]),
      ch("problem", 3, CH, "第4段落で収蔵庫の問題として挙げられていないものを選べ。",
        ["Visitors complain that the galleries are too crowded.", "Keeping objects in suitable conditions costs a lot.", "Some objects come with little information about their origin.", "Some objects were taken from other countries under colonial rule."], 0,
        ["挙げられていない（これが答え）。展示室の混雑は本文にない。", "expensive として挙がっている。", "little information about where they came from として挙がっている。", "colonial rule の問題として挙がっている。"],
        "挙げられた問題を一つずつ照合", [["挙がっている問題", "{{費用}}・{{来歴の情報不足}}・{{植民地時代に持ち出された物}}。"], ["答え", "展示室の混雑は述べられていません。"]]),
    ], "What Museums Keep Out of Sight"),

  S(2, "sleep", CH, "睡眠と記憶（科学）", LEAD2, "en",
    `For a long time, sleep was seen mainly as a period of rest, a pause in which the body recovered and the mind switched off. Research over the past several decades has made this picture look far too simple. The sleeping brain, it turns out, is remarkably busy, and one of its most important jobs appears to be ( ア ) the experiences of the day.

During waking hours, we take in an enormous amount of information. Only a small part of it will be useful later, and the brain cannot keep everything. Sleep seems to play a role in deciding what stays and what goes. When researchers teach people a list of word pairs or a simple sequence of finger movements and then test them the next day, those who have slept in between usually perform better than those who have stayed awake for the same length of time. (A)The improvement is not simply because the sleepers were less tired when tested; similar results appear even when both groups are tested at the same time of day.

What happens during the night to (a)account for this? One widely discussed explanation is that the brain "replays" recent experiences while we sleep. Studies in animals have shown that patterns of brain activity recorded while they learned a route through a maze can reappear, in compressed form, during later sleep. Many scientists believe that this replay helps to move memories from a temporary store into more lasting networks, a process known as consolidation.

Sleep may also help us to see connections we missed while awake. In some experiments, people are given a problem containing a hidden rule that would make it much easier to solve. Those who sleep after first working on the problem are more likely to discover the rule the next day than those who do not. It seems that sleep does not merely preserve memories ( イ ) they were stored; it can reorganize them, highlighting patterns and links.

These findings have practical implications, especially for students. Staying up all night before an exam may feel productive, but it may (b)undermine the very process that turns study into lasting knowledge. Spreading study over several days, with sleep in between, is likely to be more effective than (c)cramming the same amount of work into a single session.

(B)Much remains unknown, and researchers continue to argue about how different stages of sleep contribute to memory. Yet the overall message is clear enough. Sleep is not time taken away from learning; it is part of learning itself.`,
    5,
    [
      wa("wayaku-a", 2, "下線部(A)を日本語に訳せ。",
        "その向上は、単に眠った人たちがテストを受けたときに疲れが少なかったからというわけではない。両方の集団が一日の同じ時刻にテストを受けたときでさえ、同様の結果が現れるのである。",
        [["The improvement is not simply because を「その向上は単に～だからではない」と訳せている", 3, ["単に", "ではない"]], ["the sleepers were less tired when tested を「眠った人たちがテストのとき疲れが少なかった」と訳せている", 2, ["疲れ"]], ["even when both groups are tested at the same time of day を「両方の集団が一日の同じ時刻にテストされるときでさえ」と訳せている", 3, ["でさえ", "同じ時刻"]]],
        "not simply because＝単に～だからではない", [["前半", "{{not simply because}} は部分否定に近く「単に～だからというわけではない」。when tested＝when they were tested。"], ["後半", "{{even when}}＝～するときでさえ。the same time of day＝一日の同じ時刻。"]]),
      wa("wayaku-b", 2, "下線部(B)を日本語に訳せ。",
        "まだわかっていないことが多く、研究者たちは、睡眠のさまざまな段階が記憶にどのように寄与するのかについて議論を続けている。",
        [["Much remains unknown を「多くのことがまだわかっていない」と訳せている", 2, ["わかっていない"]], ["continue to argue about を「～について議論し続けている」と訳せている", 2, ["議論"]], ["how different stages of sleep contribute to memory を「睡眠のさまざまな段階が記憶にどう寄与するか」と訳せている", 4, ["段階", "記憶"]]],
        "remain＋形容詞＝～のままである", [["前半", "{{Much}} は代名詞「多くのこと」。remains unknown＝わからないままである。"], ["後半", "how 以下は間接疑問。{{contribute to}}＝～に寄与する。"]]),
      ch("account", 2, V("jukugo"), "下線部(a)の意味に最も近いものを選べ。",
        ["explain", "prevent", "measure", "repeat"], 0,
        ["正しい。account for＝～を説明する、～の原因となる。", "防ぐ、ではない。", "測る、ではない。", "くり返す、ではない。"],
        "account for＝～を説明する", [["熟語", "{{account for}} は「～を説明する、～の理由となる」。"], ["文脈", "眠った人の成績が上がることを{{説明する}}のは何か、と問い、replay の説明が続きます。"]]),
      ch("undermine", 3, V("2000"), "下線部(b)の意味に最も近いものを選べ。",
        ["weaken", "support", "speed up", "explain"], 0,
        ["正しい。undermine＝（土台を）弱める、損なう。", "反対の意味。", "速める、ではない。", "説明する、ではない。"],
        "undermine＝土台を掘りくずす→弱める", [["語の成り立ち", "under（下）＋mine（掘る）→ {{土台を弱める}}。"], ["文脈", "徹夜は、勉強を知識に変える過程そのものを{{損なう}}かもしれない。"]]),
      ch("cramming", 2, CH, "下線部(c)の内容として最も適切なものを選べ。",
        ["trying to study a lot in a very short time", "studying a little every day", "sleeping between study sessions", "studying together with friends"], 0,
        ["正しい。cram A into B＝AをBに詰めこむ→短時間に大量に勉強する（一夜漬け）。", "これは本文が勧める分散学習のほう。", "これも勧められているほう。", "友人との勉強の話はない。"],
        "cram＝詰めこむ（一夜漬け）", [["語の意味", "{{cram}}＝ぎゅうぎゅうに詰めこむ。"], ["対比", "数日に分けて勉強する ↔ 1回に{{詰めこむ}}。"]]),
      ch("blank-a", 1, CH, "空所（ア）に入る最も適切なものを選べ。",
        ["processing", "ignoring", "avoiding", "inventing"], 0,
        ["正しい。眠っている脳の重要な仕事は、その日の経験を処理すること。", "無視するでは「忙しく働く」と合わない。", "避ける、では意味が通らない。", "経験を作り出す、ではない。"],
        "「脳は忙しい」に合う仕事を選ぶ", [["手がかり", "The sleeping brain … is {{remarkably busy}}。"], ["答え", "その日の経験を{{処理する}}＝processing。"]]),
      ch("blank-i", 3, CH, "空所（イ）に入る最も適切なものを選べ。",
        ["exactly as", "long before", "so that", "unless"], 0,
        ["正しい。「記憶を蓄えられたとおりにそのまま保つだけでなく、組みかえることもある」。", "「蓄えられるずっと前に」では意味が通らない。", "目的の意味では文が成り立たない。", "条件の意味では文が成り立たない。"],
        "not merely A; B の対比をつかむ", [["対比", "{{そのまま保つ}}（preserve）↔ {{組みかえる}}（reorganize）。"], ["答え", "「蓄えられた{{とおりに}}」＝exactly as。"]]),
      ch("true", 2, CH, "本文の内容と一致するものを選べ。",
        ["In animal studies, brain activity from learning a route reappeared during later sleep.", "People who stayed awake usually remembered word pairs better the next day.", "Scientists now fully understand how each stage of sleep affects memory.", "The writer recommends staying up all night before important exams."], 0,
        ["正しい。第3段落 patterns of brain activity … can reappear … during later sleep と一致。", "第2段落では眠った人のほうがよくできた。", "最終段落 Much remains unknown と食いちがう。", "第5段落は徹夜が逆効果かもしれないと述べる。"],
        "研究の結果の向きを正確に読む", [["該当箇所", "迷路の道順を学んだときの脳の活動が、{{後の睡眠中に再び現れる}}。"], ["消去", "起きていた人が上・完全に解明・徹夜を勧める、はすべて逆です。"]]),
      ch("main", 3, CH, "本文の主張に最も近いものを選べ。",
        ["Sleep should be seen as part of the learning process.", "Students should sleep instead of studying for exams.", "The brain is completely inactive while we sleep.", "Memories are lost every night during sleep."], 0,
        ["正しい。最終段落 it is part of learning itself と一致。", "勉強をやめよとは言っていない。分けて勉強し、間に眠るのがよいとする。", "第1段落で否定された古い見方。", "睡眠は記憶を残し、組みかえるとしている。"],
        "結論は最終段落にある", [["最終段落", "Sleep is not time taken away from learning; it is {{part of learning itself}}."], ["消去", "「勉強の代わりに眠る」は言いすぎです。"]]),
    ], "What the Sleeping Brain Does"),

  S(2, "maps", CH, "地図が映すもの（地理・社会）", LEAD2, "en",
    `We tend to think of a map as a neutral picture of the world, a simple record of where things are. But every map is the product of choices, and those choices reflect the purposes and assumptions of the people who made it. (A)Learning to read a map well means asking not only what it shows but also what it leaves out.

The most basic choice concerns projection. The Earth is round, and a flat map cannot show its surface without distortion. Some projections keep the shapes of coastlines accurate over small areas but greatly enlarge regions far from the equator. Others keep the relative sizes of countries correct but stretch their shapes. No projection is perfect; each one ( ア ) one kind of accuracy for another. A map designed to help sailors keep a steady course will look very different from one designed to compare the areas of continents.

Another choice concerns what goes in the centre. Many people grow up with world maps that place their own region in the middle, and they may come to feel that this arrangement is natural. A traveller who sees a map printed in another country, with a different ocean at its centre, can find the experience surprisingly (a)disorienting. Nothing about the world has changed, yet it suddenly looks unfamiliar. This small shock is a useful reminder that the usual view is a convention, not a fact.

Maps also reflect power. Throughout history, those who controlled territory often controlled how it was drawn. Borders were marked according to the claims of governments, while the names used by local people were sometimes replaced or simply ignored. Areas that mapmakers considered unimportant might be left almost blank, giving the false impression that no one lived there. In this way, maps did not only describe the world; they helped to (b)shape how people understood who owned it and who belonged in it.

Today, digital maps have made it easier than ever to find our way. A phone can show us the fastest route to a station or the nearest café within seconds. These maps, too, involve choices. They highlight some businesses and not others, and the routes they suggest can change patterns of traffic in whole neighbourhoods. ( イ ) we rarely see the decisions behind them, they can feel even more neutral than printed maps.

(B)None of this means that maps are untrustworthy or that we should stop using them. It means that a map is best understood as an argument about the world rather than a perfect copy of it. Reading maps with this in mind makes us (c)more alert to the ways in which a picture of a place can guide what we think about it.`,
    5,
    [
      wa("wayaku-a", 2, "下線部(A)を日本語に訳せ。",
        "地図をうまく読めるようになるということは、地図が何を示しているかだけでなく、何を省いているかも問うことを意味する。",
        [["Learning to read a map well means（動名詞が主語・mean ～ing）を「地図をうまく読めるようになるとは～を意味する」と訳せている", 3, ["読めるようになる", "意味する"]], ["not only A but also B を「AだけでなくBも」と訳せている", 2, ["だけでなく"]], ["what it shows / what it leaves out を「何を示しているか／何を省いているか」と訳せている", 3, ["省いている"]]],
        "mean ～ing＝～することを意味する", [["骨組み", "主語は動名詞 {{Learning to read a map well}}、動詞は {{means}}、目的語は asking …。"], ["後半", "{{not only A but also B}}。leave out＝省く。"]]),
      wa("wayaku-b", 2, "下線部(B)を日本語に訳せ。",
        "こうしたことはどれも、地図が信頼できないということや、私たちが地図を使うのをやめるべきだということを意味するわけではない。",
        [["None of this means を「このことはどれも～を意味しない」と訳せている", 3, ["どれも", "意味"]], ["that maps are untrustworthy を「地図が信頼できない（ということ）」と訳せている", 2, ["信頼できない"]], ["or that we should stop using them を「または地図を使うのをやめるべきだ（ということ）」と訳せている", 3, ["やめる"]]],
        "None of this means that … or that …", [["骨組み", "{{None of this}} が主語で全体を否定。means の目的語は that 節が2つ（or で並列）。"], ["語", "{{untrustworthy}}＝信頼できない。stop ～ing＝～するのをやめる。"]]),
      ch("disorienting", 3, V("2000"), "下線部(a)の意味に最も近いものを選べ。",
        ["confusing", "relaxing", "boring", "convincing"], 0,
        ["正しい。disorienting＝方向感覚を失わせる、まごつかせる。", "くつろがせる、ではない。", "退屈な、ではない。", "納得させる、ではない。"],
        "disorient＝方向感覚を失わせる", [["語の成り立ち", "dis-（否定）＋orient（方角を定める）→ {{方向を見失わせる}}。"], ["文脈", "世界は何も変わらないのに、急に見なれないものに見える。"]]),
      ch("shape", 2, V("2000"), "下線部(b)の意味に最も近いものを選べ。",
        ["influence", "measure", "decorate", "copy"], 0,
        ["正しい。動詞の shape＝形づくる、影響を与える。", "測る、ではない。", "飾る、ではない。", "写す、では「世界を描写するだけではなかった」との対比にならない。"],
        "動詞 shape＝形づくる・影響する", [["対比", "地図は世界を {{describe}}（描く）だけでなく、人の理解を {{shape}}（形づくる）。"], ["答え", "{{influence}} が最も近い。"]]),
      ch("alert", 2, CH, "下線部(c)の意味に最も近いものを選べ。",
        ["more aware of", "more afraid of", "less interested in", "more tired of"], 0,
        ["正しい。be alert to＝～に注意を払っている、気づいている。", "恐れる、ではない。", "反対の方向。", "あきる、ではない。"],
        "be alert to＝～に注意を向けている", [["語の意味", "{{alert}}＝油断のない、注意を払っている。"], ["文脈", "地図を「主張」として読めば、地図が考えを導くしかたに{{気づきやすくなる}}。"]]),
      ch("blank-a", 2, V("jukugo"), "空所（ア）に入る最も適切なものを選べ。",
        ["trades", "gains", "repeats", "measures"], 0,
        ["正しい。trade A for B＝AをBと交換する。ある正確さをあきらめて別の正確さを得る。", "gain A for B では意味が通らない。", "くり返す、ではない。", "測る、ではない。"],
        "trade A for B＝AとBを交換する", [["文脈", "形を正しくすると大きさがゆがみ、大きさを正しくすると形がゆがむ。"], ["答え", "一つの正確さを別の正確さと{{交換する}}＝trades。"]]),
      ch("blank-i", 2, G("setsuzokushi"), "空所（イ）に入る最も適切なものを選べ。",
        ["Because", "Unless", "Although", "Until"], 0,
        ["正しい。背後の判断がめったに見えない「から」、紙の地図より中立に感じられる。", "「見ないかぎり」では意味が通らない。", "前後は逆接ではなく因果の関係。", "「見るまで」では意味が通らない。"],
        "理由→結果の関係を見ぬく", [["関係", "判断が{{見えない}} → だから{{中立に感じる}}。"], ["答え", "理由の {{Because}}。"]]),
      ch("true", 2, CH, "本文の内容と一致するものを選べ。",
        ["Some areas were left almost empty on maps, suggesting falsely that nobody lived there.", "There is one projection that shows both the shapes and the sizes of countries perfectly.", "Digital maps involve no choices because they are made by computers.", "Placing one's own region at the centre of a map is a fact, not a convention."], 0,
        ["正しい。第4段落 left almost blank, giving the false impression that no one lived there と一致。", "第2段落 No projection is perfect と食いちがう。", "第5段落 These maps, too, involve choices と食いちがう。", "第3段落 a convention, not a fact と逆。"],
        "本文の否定表現と照合する", [["該当箇所", "{{left almost blank}} → 誰も住んでいないという{{誤った印象}}。"], ["消去", "完全な図法・選択のない地図・中心は事実、はどれも本文と逆です。"]]),
      ch("main", 3, CH, "本文の主張に最も近いものを選べ。",
        ["A map should be read as an argument about the world rather than a perfect copy.", "Printed maps are more accurate than digital maps.", "People should stop using maps because they are not neutral.", "Sailors' maps are the most reliable kind of map."], 0,
        ["正しい。最終段落 best understood as an argument about the world と一致。", "紙と電子の正確さを比べてはいない。", "最終段落で使うのをやめよという意味ではないと明言。", "船乗りの地図は図法の例にすぎない。"],
        "結論の段落で主張を確かめる", [["結論", "a map is best understood as {{an argument about the world}}."], ["消去", "「使うのをやめよ」は最終段落の None of this means … で否定されています。"]]),
    ], "Reading What Maps Leave Out"),
];

// =====================================================================
// Ⅲ　文法（誤り箇所の指摘）
// =====================================================================

const ER_LEAD = "次の各英文について、下線部(a)〜(d)のうち文法・語法上誤っているものを1つ選べ。";
const ER_BODY = (theme: string) => `各問の英文で ［　］ で示した部分が下線部 (a)〜(d) である。誤りは各問に1つだけある。（題材：${theme}）`;

const T3: ExamPoolSection[] = [
  S(3, "er-campus", G("waho"), "誤り指摘（大学生活）", ER_LEAD, "ja", ER_BODY("大学生活"), 5, [
    er("each", 1, G("daimeishi"), "Each of the students ［are required］ ［to submit］ a report ［by］ the end of ［the month］.", 0,
      ["誤り（これが答え）。Each of ～ は単数扱いなので is required。", "be required to V で正しい。", "期限の by で正しい。", "the end of the month で正しい。"],
      "Each of＋複数名詞 は単数扱い", [["主語を見る", "主語は {{Each}}（それぞれ）。of the students は修飾。"], ["直す", "単数扱い → {{is required}}。"]]),
    er("since", 2, G("kanryo"), "I ［have known］ her ［since］ we ［have been］ children, and she ［has always been］ kind to me.", 2,
      ["現在完了＋since で正しい。", "since＋過去の起点で正しい。", "誤り（これが答え）。since 節は過去の一時点なので過去形 were。", "always と現在完了で正しい。"],
      "since 節の中は過去形", [["since の働き", "since の後は{{過去の起点}}（子どもだったとき）。"], ["直す", "have been → {{were}}。主節が現在完了です。"]]),
    er("suggest", 3, G("kateiho"), "The professor ［suggested］ that he ［reads］ the article ［carefully］ before ［writing］ his essay.", 1,
      ["suggest that … の形で正しい。", "誤り（これが答え）。suggest that S (should) 原形 なので read。", "副詞で動詞を修飾して正しい。", "前置詞 before の後の動名詞で正しい。"],
      "提案の that 節は（should）＋原形", [["語法", "{{suggest that S (should) V原形}}。仮定法現在とも言います。"], ["直す", "reads → {{read}}（主節が過去でも原形）。"]]),
    er("ifmiss", 2, G("kateiho"), "If she ［had left］ home ten minutes earlier yesterday, she ［would not miss］ the train ［that］ ［left］ at eight.", 1,
      ["過去の事実の反対を表す仮定法過去完了で正しい。", "誤り（これが答え）。過去の結果なので would not have missed。", "関係代名詞で正しい。", "過去の事実なので過去形で正しい。"],
      "仮定法過去完了は would have＋過去分詞", [["時を見る", "yesterday の出来事なので、帰結も{{過去}}。"], ["直す", "would not miss → {{would not have missed}}。"]]),
    er("where", 2, G("kanfuku"), "The library is the place ［which］ I ［spend］ most of my free time ［reading］ ［novels］.", 0,
      ["誤り（これが答え）。後ろが完全な文（spend time ～ing）なので関係副詞 where（in which）。", "spend＋時間＋～ing で正しい。", "spend time ～ing の ～ing で正しい。", "目的語で正しい。"],
      "後ろが完全な文なら関係副詞", [["後ろを見る", "I spend most of my free time reading novels は{{欠けのない文}}。"], ["直す", "which → {{where}}（または in which）。"]]),
    er("usedto", 2, G("domeishi"), "She ［is used to］ ［get up］ early because she ［has worked］ at a bakery ［for］ three years.", 1,
      ["be used to＋（動）名詞で「～に慣れている」。正しい。", "誤り（これが答え）。be used to の to は前置詞なので getting up。", "継続の現在完了で正しい。", "期間の for で正しい。"],
      "be used to ～ing＝～に慣れている", [["区別", "{{used to V}}（以前は～した）と {{be used to ～ing}}（～に慣れている）。"], ["直す", "get up → {{getting up}}。"]]),
    er("heavier", 1, G("hikaku"), "This bag is ［much］ ［more heavier］ ［than］ the one I ［bought］ last year.", 1,
      ["比較級を強める much で正しい。", "誤り（これが答え）。heavier がすでに比較級なので more は不要。", "比較級＋than で正しい。", "last year なので過去形で正しい。"],
      "-er の比較級に more は重ねない", [["形", "heavy → {{heavier}}。more heavy とはしません。"], ["直す", "more heavier → {{heavier}}。much は強めで正しい。"]]),
    er("discuss", 1, G("waho"), "We ［discussed about］ the plan ［for］ the festival ［until］ late ［in］ the evening.", 0,
      ["誤り（これが答え）。discuss は他動詞なので about は不要。", "the plan for ～ で正しい。", "継続の until で正しい。", "in the evening で正しい。"],
      "discuss は他動詞（about 不要）", [["語法", "{{discuss A}}＝Aについて話し合う。about をつけません。"], ["なかま", "{{enter}}・{{marry}}・{{approach}} も前置詞なしで目的語をとります。"]]),
    er("indirect", 3, G("waho"), "He asked me ［where］ ［did I live］ and ［how long］ I ［had been］ in the city.", 1,
      ["間接疑問の疑問詞で正しい。", "誤り（これが答え）。間接疑問は平叙文の語順なので where I lived。", "間接疑問の疑問詞で正しい。", "asked より前からの継続で過去完了。正しい。"],
      "間接疑問は「疑問詞＋S＋V」の語順", [["語順", "文の中に入った疑問文は {{疑問詞＋S＋V}} の順。"], ["直す", "did I live → {{I lived}}（時制も asked に合わせる）。"]]),
  ]),

  S(3, "er-science", G("waho"), "誤り指摘（科学と自然）", ER_LEAD, "ja", ER_BODY("科学と自然"), 5, [
    er("ago", 2, G("kanryo"), "Water ［boils］ at 100 degrees Celsius, ［which］ scientists ［have known］ for ［centuries ago］.", 3,
      ["不変の事実は現在形で正しい。", "前の文の内容を受ける非制限用法の which で正しい。", "継続の現在完了で正しい。", "誤り（これが答え）。ago は過去形と使い、現在完了の for とは使わない。for centuries。"],
      "ago は現在完了と使わない", [["時制", "{{ago}} は過去の一点を表し、過去形と使います。"], ["直す", "for centuries ago → {{for centuries}}。"]]),
    er("number", 1, G("meishi"), "The number of ［species］ that ［live］ in the forest ［have decreased］ ［sharply］.", 2,
      ["species は単複同形で正しい。", "関係詞の先行詞 species（複数）に合わせて正しい。", "誤り（これが答え）。主語は The number（数）なので単数 has decreased。", "動詞を修飾する副詞で正しい。"],
      "The number of ～ は単数扱い", [["主語", "中心は {{The number}}（～の数）。"], ["区別", "{{A number of ～}}（多くの～）なら複数扱いです。"]]),
    er("let", 2, G("futeishi"), "The scientist ［let］ her students ［to use］ the new microscope ［for］ their ［own］ research.", 1,
      ["使役の let（過去形も let）で正しい。", "誤り（これが答え）。let O 原形 なので use。", "目的の for で正しい。", "所有格を強める own で正しい。"],
      "let＋O＋原形不定詞", [["語法", "使役動詞 {{let / make / have}} は O の後に{{原形}}。"], ["直す", "to use → {{use}}。"]]),
    er("inorder", 1, G("futeishi"), "Plants ［need］ sunlight ［in order to］ ［producing］ the energy ［they need］.", 2,
      ["一般的な事実の現在形で正しい。", "目的を表す in order to で正しい。", "誤り（これが答え）。in order to の後は原形 produce。", "目的格の関係代名詞が省略された形で正しい。"],
      "in order to の後は原形", [["形", "{{in order to V原形}}＝～するために。"], ["直す", "producing → {{produce}}。"]]),
    er("despite", 2, G("zenchishi"), "［Although］ the heavy rain, the researchers ［continued］ ［collecting］ samples ［along］ the river.", 0,
      ["誤り（これが答え）。後ろが名詞句なので前置詞 Despite（In spite of）。", "過去形で正しい。", "continue ～ing で正しい。", "along the river で正しい。"],
      "名詞の前は前置詞、文の前は接続詞", [["後ろを見る", "the heavy rain は{{名詞句}}で、S＋V がありません。"], ["直す", "Although → {{Despite}}（Although なら it rained heavily のような文が必要）。"]]),
    er("seenfly", 3, G("judo"), "The bird ［was seen］ ［fly］ across the lake ［by］ several visitors ［early］ in the morning.", 1,
      ["知覚動詞の受け身で正しい。", "誤り（これが答え）。知覚動詞の受け身では to 不定詞になる（was seen to fly）。", "受け身の動作主の by で正しい。", "early in the morning で正しい。"],
      "知覚動詞の受け身は to がつく", [["能動と受動", "能動 see O {{fly}} → 受動 be seen {{to fly}}。"], ["直す", "fly → {{to fly}}（flying も可）。"]]),
    er("hardly", 3, G("tokushu"), "Hardly ［had］ the experiment ［begun］ ［than］ the power ［went］ out.", 2,
      ["否定語が文頭に出た倒置で正しい。", "過去完了の過去分詞で正しい。", "誤り（これが答え）。Hardly … when [before] ～ の形。than は No sooner と組む。", "過去形で正しい。"],
      "Hardly … when ～／No sooner … than ～", [["組み合わせ", "{{Hardly [Scarcely] … when [before]}}、{{No sooner … than}}。"], ["直す", "than → {{when}}。"]]),
    er("lives", 2, G("kandai"), "It is important ［for］ us ［to protect］ the animals ［that］ ［lives］ in the area.", 3,
      ["不定詞の意味上の主語 for us で正しい。", "形式主語 It の真主語で正しい。", "関係代名詞 that で正しい。", "誤り（これが答え）。先行詞 the animals は複数なので live。"],
      "関係詞節の動詞は先行詞に合わせる", [["先行詞", "that の先行詞は {{the animals}}（複数）。"], ["直す", "lives → {{live}}。"]]),
    er("few", 2, G("meishi"), "Few ［of］ the stars we see at night ［is］ ［as］ close to us ［as］ the Sun.", 1,
      ["Few of the ～ で正しい。", "誤り（これが答え）。Few（ほとんどない）は複数扱いなので are。", "as … as の前の as で正しい。", "as … as の後の as で正しい。"],
      "Few of ～ は複数扱い", [["主語", "{{Few}} は数えられる名詞の複数を受け、複数扱い。"], ["直す", "is → {{are}}。"]]),
  ]),

  S(3, "er-society", G("waho"), "誤り指摘（社会と歴史）", ER_LEAD, "ja", ER_BODY("社会と歴史"), 5, [
    er("everyyear", 1, G("meishi"), "The castle, ［which］ ［was built］ in the sixteenth century, ［attracts］ thousands of tourists ［every years］.", 3,
      ["非制限用法の which で正しい。", "受け身の過去で正しい。", "主語 The castle（単数）に合わせて正しい。", "誤り（これが答え）。every の後は単数名詞なので every year。"],
      "every＋単数名詞", [["形", "{{every}} の後の名詞は単数。"], ["直す", "every years → {{every year}}。"]]),
    er("bornin", 1, G("zenchishi"), "She ［was born］ ［on］ 1990 in a small town ［that］ is now ［part of］ the city.", 1,
      ["be born で正しい。", "誤り（これが答え）。年の前は in。in 1990。", "関係代名詞で正しい。", "part of ～ で正しい。"],
      "年・月は in、日付・曜日は on", [["前置詞", "年・月・季節は {{in}}、特定の日・曜日は {{on}}。"], ["直す", "on 1990 → {{in 1990}}。"]]),
    er("forward", 1, G("domeishi"), "I am looking forward to ［visit］ the museum ［with］ my family ［during］ ［the summer vacation］.", 0,
      ["誤り（これが答え）。look forward to の to は前置詞なので visiting。", "with my family で正しい。", "期間の during で正しい。", "during の目的語で正しい。"],
      "look forward to ～ing", [["見分け", "{{look forward to}} の to は{{前置詞}}。"], ["直す", "visit → {{visiting}}。"]]),
    er("interesting", 2, G("bunshi"), "The old man told us an ［interested］ story ［about］ the war ［that］ he ［had experienced］ as a boy.", 0,
      ["誤り（これが答え）。物語が人を「おもしろがらせる」ので interesting。", "about で正しい。", "関係代名詞で正しい。", "told より前の経験なので過去完了で正しい。"],
      "物が主体なら -ing、人の感情なら -ed", [["見分け", "story は人を興味をもたせる側 → {{interesting}}。"], ["比較", "人が興味をもつなら {{interested}}（He was interested in the story）。"]]),
    er("hadleft", 2, G("kanryo"), "When I ［arrived］ at the station, the train ［already left］, so I ［had to］ wait ［for］ the next one.", 1,
      ["過去形で正しい。", "誤り（これが答え）。到着より前に出発していたので過去完了 had already left。", "過去の義務で正しい。", "wait for で正しい。"],
      "過去のある時より前は過去完了", [["時の前後", "電車が出た → 私が着いた。先に起きたほうが{{過去完了}}。"], ["直す", "already left → {{had already left}}。"]]),
    er("prohibit", 3, G("waho"), "The government ［made］ a law ［which］ ［prohibits］ people ［to smoke］ in public parks.", 3,
      ["make a law で正しい。", "関係代名詞で正しい。", "先行詞 a law（単数）に合わせて正しい。現在も有効な法。", "誤り（これが答え）。prohibit O from ～ing の形。from smoking。"],
      "prohibit O from ～ing", [["語法", "{{prohibit / prevent / keep O from ～ing}}＝Oが～するのを妨げる。"], ["直す", "to smoke → {{from smoking}}。"]]),
    er("notonly", 2, G("tokushu"), "Not only ［did］ the festival ［bring］ money to the town, ［but］ it also ［bringing］ people together.", 3,
      ["否定語 Not only が文頭に出た倒置で正しい。", "did の後の原形で正しい。", "not only … but also で正しい。", "誤り（これが答え）。主語 it の述語動詞なので過去形 brought。"],
      "but also の後も文の形にそろえる", [["形", "前半は倒置、後半 {{it also V}} はふつうの語順。"], ["直す", "bringing → {{brought}}。"]]),
    er("themore", 2, G("hikaku"), "The more people ［learn］ about history, ［the］ ［well］ they ［understand］ the present.", 2,
      ["現在形で正しい。", "The＋比較級 の the で正しい。", "誤り（これが答え）。The 比較級, the 比較級 なので better。", "現在形で正しい。"],
      "The 比較級 …, the 比較級 ～", [["形", "{{The＋比較級 …, the＋比較級 ～}}＝…すればするほど～。"], ["直す", "well → {{better}}。"]]),
    er("information", 2, G("meishi"), "There ［are］ ［a lot of］ information about the war ［available］ ［in］ the archive.", 0,
      ["誤り（これが答え）。information は数えられない名詞で単数扱いなので is。", "a lot of は不可算名詞にも使えて正しい。", "後ろから修飾する形容詞で正しい。", "in the archive で正しい。"],
      "information は不可算・単数扱い", [["名詞の種類", "{{information}}・{{advice}}・{{furniture}} は数えられない名詞。"], ["直す", "There are → {{There is}}。"]]),
  ]),
];

// =====================================================================
// Ⅳ　会話文（空所補充）
// =====================================================================

const KW = V("kaiwa");
const T4: ExamPoolSection[] = [
  S(4, "kaiwa-library", KW, "会話文（大学の図書館で）", "次の会話文を読み、空所に入る最も適切なものを選べ。", "en",
    `Librarian: Good afternoon. ( ア )
Mika: Yes, I'm looking for a book on the history of printing, but I can't find it on the shelf.
Librarian: Let me check the system... It says the book is on loan at the moment.
Mika: Oh no. ( イ )
Librarian: It's due back next Tuesday. Would you like to reserve it?
Mika: Yes, please. ( ウ ) I need it for a presentation on Thursday.
Librarian: I'll put your name on the list. You'll get an email as soon as it's returned.
Mika: Thank you. By the way, can I borrow magazines too?
Librarian: ( エ ) Only books and DVDs can be taken out. Magazines have to be read here.
Mika: I see. Is there somewhere quiet I can read them?
Librarian: The reading room on the third floor, right at the top of the stairs. ( オ ) It's usually very quiet in the mornings.
Mika: Great. Oh, and one more thing. Could I make copies of a few pages?
Librarian: Of course. The copy machines are next to the stairs. ( カ )
Mika: Ten yen a page? That's fine.
Librarian: Remember that you can copy only part of a book, though.
Mika: ( キ ) I just need two short chapters.
Librarian: Then there's no problem. Anything else?
Mika: No, that's all. ( ク )
Librarian: You're welcome. Good luck with your presentation.`,
    5,
    [
      ch("a", 1, KW, "空所（ア）に入る最も適切なものを選べ。", ["Can I help you?", "Where have you been?", "Did you call me?", "What a surprise!"], 0,
        ["正しい。係の人が用件をたずねる決まり文句。Mika が Yes, I'm looking for … と答える。", "久しぶりの相手への言葉で、初対面の場面に合わない。", "Mika は呼んでいない。", "驚く理由がない。"],
        "Can I help you?＝ご用件は？", [["次の発言", "Mika が {{Yes, I'm looking for …}} と用件を言っています。"], ["答え", "用件をたずねる {{Can I help you?}}。"]]),
      ch("i", 2, KW, "空所（イ）に入る最も適切なものを選べ。", ["Do you know when it will be back?", "Do you know who wrote it?", "Can you lend me some money?", "Is the library open on Sundays?"], 0,
        ["正しい。返事が It's due back next Tuesday（来週火曜に返却予定）。", "返事が著者名ではない。", "お金の話ではない。", "返事が開館日ではない。"],
        "答えの内容から質問を逆算する", [["返事", "{{It's due back next Tuesday.}}（返却予定日）"], ["答え", "いつ戻るかをたずねる文。"]]),
      ch("u", 2, KW, "空所（ウ）に入る最も適切なものを選べ。", ["I hope it comes back in time.", "I've already finished reading it.", "I don't need it anymore.", "I'd rather buy it right now."], 0,
        ["正しい。木曜の発表に使うので、火曜に戻れば間に合ってほしい。", "まだ借りられていないので矛盾。", "Yes, please. と予約したことと矛盾。", "予約を頼んだことと矛盾。"],
        "in time＝間に合って", [["前後", "予約を頼み、{{木曜の発表}}に必要だと言っています。"], ["答え", "{{in time}}（間に合うように）戻ってほしい。"]]),
      ch("e", 1, KW, "空所（エ）に入る最も適切なものを選べ。", ["I'm afraid not.", "Sure, take as many as you like.", "Of course you can.", "I'm glad to hear that."], 0,
        ["正しい。直後に「借りられるのは本とDVDだけ」と続く。", "直後の説明と矛盾。", "直後の説明と矛盾。", "質問への答えにならない。"],
        "I'm afraid not.＝残念ながらできません", [["直後", "{{Only books and DVDs}} can be taken out."], ["答え", "ていねいに断る {{I'm afraid not.}}"]]),
      ch("o", 2, KW, "空所（オ）に入る最も適切なものを選べ。", ["You can't miss it.", "You must be kidding.", "It's none of your business.", "It's on me."], 0,
        ["正しい。階段を上がったすぐの所なので「すぐわかりますよ」。", "冗談だと責める理由がない。", "失礼で、場面に合わない。", "「私がおごります」で場面に合わない。"],
        "You can't miss it.＝すぐわかりますよ", [["前", "right at the top of the stairs（階段を上がってすぐ）と場所を説明。"], ["答え", "道案内の決まり文句 {{You can't miss it.}}"]]),
      ch("ka", 2, KW, "空所（カ）に入る最も適切なものを選べ。", ["They cost ten yen a page.", "They are free for everyone.", "They don't work at all.", "They're only for the staff."], 0,
        ["正しい。Mika が Ten yen a page? とくり返している。", "Mika の確認と合わない。", "直前に Of course と言っており矛盾。", "Of course と言っており矛盾。"],
        "相手のくり返しから前の発言を推す", [["次の発言", "Mika: {{Ten yen a page?}}"], ["答え", "料金を伝える文。"]]),
      ch("ki", 2, KW, "空所（キ）に入る最も適切なものを選べ。", ["Don't worry.", "Congratulations.", "Same to you.", "Go ahead."], 0,
        ["正しい。「心配いりません。短い2章だけです」と、一部だけのコピーであることを伝える。", "祝う場面ではない。", "相手の言葉を返す場面ではない。", "許可を与える立場ではない。"],
        "注意に対して「大丈夫です」と返す", [["前", "一部しかコピーできない、という注意。"], ["答え", "{{Don't worry.}} 2章だけなので問題ない、と続きます。"]]),
      ch("ku", 1, KW, "空所（ク）に入る最も適切なものを選べ。", ["Thanks for your help.", "Help yourself.", "You're welcome.", "Never mind."], 0,
        ["正しい。係の人が You're welcome. と返している。", "「ご自由にどうぞ」で、Mika が言う言葉ではない。", "お礼を言われたときの返事で、係の人の言葉。", "「気にしないで」では次の You're welcome. とつながらない。"],
        "You're welcome. の前はお礼", [["次の発言", "Librarian: {{You're welcome.}}"], ["答え", "お礼の {{Thanks for your help.}}"]]),
    ]),

  S(4, "kaiwa-trip", KW, "会話文（休みの旅行の計画）", "次の会話文を読み、空所に入る最も適切なものを選べ。", "en",
    `Emma: Have you decided where to go during the spring break?
Sota: Not yet. I was thinking about Kyoto, but ( ア )
Emma: Too crowded? I know what you mean. Everyone goes there in spring.
Sota: Exactly. Do you have any better ideas?
Emma: How about a small island? My cousin went to one last year, and ( イ )
Sota: Really? What did she like about it?
Emma: The beaches were beautiful, and the people were really friendly. ( ウ )
Sota: That sounds nice. But how do you get there?
Emma: You take a ferry from the port. It takes about two hours.
Sota: Two hours on a boat? ( エ ) I get seasick easily.
Emma: Oh, I didn't know that. ( オ ) There's also a small airport on the island.
Sota: A plane would be more expensive, though.
Emma: True, but if you book early, ( カ )
Sota: OK, I'll check the prices tonight. Would you like to come along?
Emma: ( キ ) I've wanted to go there ever since my cousin showed me her photos.
Sota: Great! Then let's ( ク ) on Friday.
Emma: Sounds good. I'll bring my laptop.`,
    5,
    [
      ch("a", 1, KW, "空所（ア）に入る最も適切なものを選べ。", ["I'm afraid it'll be packed with tourists.", "my parents live there.", "it's my favourite city.", "I've already booked a hotel."], 0,
        ["正しい。Emma が Too crowded? と言いかえて確かめている。", "混雑の話につながらない。", "but の後で、迷う理由にならない。", "まだ決めていないことと矛盾。"],
        "be packed with＝～でいっぱい", [["次の発言", "Emma: {{Too crowded?}}"], ["答え", "{{packed with tourists}}（観光客でいっぱい）が混雑の言いかえ。"]]),
      ch("i", 1, KW, "空所（イ）に入る最も適切なものを選べ。", ["she loved it.", "she got lost on the way.", "she has never been abroad.", "she didn't enjoy it at all."], 0,
        ["正しい。Sota が What did she like about it? と続けている。", "気に入った点の質問につながらない。", "島の話と関係がない。", "気に入った点を聞くこととと矛盾。"],
        "次の質問の前提を考える", [["次の発言", "{{What did she like about it?}}"], ["答え", "いとこは島を{{気に入った}}。"]]),
      ch("u", 2, KW, "空所（ウ）に入る最も適切なものを選べ。", ["She said she'd love to go back.", "She said she'd never go back.", "She said it rained every day.", "She said the food was terrible."], 0,
        ["正しい。浜辺も人もよかった、の後に続く好意的な感想。", "直前のほめ言葉と矛盾。", "直前の好意的な感想と合わない。", "直前の好意的な感想と合わない。"],
        "前の文と同じ方向の内容を選ぶ", [["前", "浜辺は美しく、人々は親切だった（よい点）。"], ["答え", "また行きたいと言っていた。"]]),
      ch("e", 2, KW, "空所（エ）に入る最も適切なものを選べ。", ["I'm not sure about that.", "That's exactly what I wanted.", "I can't wait.", "How lucky!"], 0,
        ["正しい。船酔いしやすいので、2時間の船はちょっと…と迷う。", "船酔いの話と矛盾。", "楽しみにする理由がない。", "喜ぶ場面ではない。"],
        "直後の理由から気持ちを読む", [["直後", "{{I get seasick easily.}}（船酔いしやすい）"], ["答え", "ためらいを表す {{I'm not sure about that.}}"]]),
      ch("o", 2, KW, "空所（オ）に入る最も適切なものを選べ。", ["Don't worry, though.", "Good for you.", "Help yourself.", "Same here."], 0,
        ["正しい。「でも心配いらないよ。島には空港もある」。", "相手をほめる場面ではない。", "「ご自由に」で意味が通らない。", "Emma は船酔いの話をしていない。"],
        "相手の不安に代わりの案で答える", [["直後", "There's also a small {{airport}}.（別の行き方）"], ["答え", "不安をやわらげる {{Don't worry.}}"]]),
      ch("ka", 3, KW, "空所（カ）に入る最も適切なものを選べ。", ["you can get a cheap ticket.", "it will cost twice as much.", "you can't get a seat.", "the ferry will be faster."], 0,
        ["正しい。True, but … で「高い」に反論し、早く予約すれば安いと言う。", "反論にならない。", "早めに予約する利点にならない。", "飛行機の話から外れる。"],
        "True, but … は一部認めて反論", [["前", "飛行機は高い、という Sota の心配。"], ["答え", "True（そうだね）, but 早めに予約すれば{{安い}}。"]]),
      ch("ki", 1, KW, "空所（キ）に入る最も適切なものを選べ。", ["I'd love to!", "I'm afraid I can't.", "I'd rather not.", "Not this time."], 0,
        ["正しい。誘いを喜んで受ける。ずっと行きたかったと続く。", "直後の「ずっと行きたかった」と矛盾。", "同じく矛盾。", "同じく矛盾。"],
        "誘いへの返事は直後の理由で判断", [["直後", "{{I've wanted to go there}} ever since …"], ["答え", "喜んで受ける {{I'd love to!}}"]]),
      ch("ku", 2, KW, "空所（ク）に入る最も適切なものを選べ。", ["plan the details together", "cancel the trip", "forget about it", "go separately"], 0,
        ["正しい。金曜にくわしい計画を立てよう。Emma はノートパソコンを持ってくると言う。", "Great! の後に合わない。", "同じく合わない。", "一緒に行くことになった流れと矛盾。"],
        "直後の行動から提案を推す", [["直後", "{{I'll bring my laptop.}}（調べもの・計画の準備）"], ["答え", "一緒に{{計画を立てる}}。"]]),
    ]),

  S(4, "kaiwa-shop", KW, "会話文（店での交換）", "次の会話文を読み、空所に入る最も適切なものを選べ。", "en",
    `Clerk: Hello. How can I help you today?
Customer: I bought this jacket here last week, but ( ア )
Clerk: Oh, it's too small? Would you like to try a larger size?
Customer: Yes, please. ( イ )
Clerk: Let me see... Yes, we have it in medium and large.
Customer: Could I try the large one?
Clerk: Certainly. ( ウ ) The fitting rooms are over there.
(A few minutes later)
Clerk: How does it fit?
Customer: ( エ ) The sleeves are just the right length.
Clerk: Great. Would you like to exchange it, then?
Customer: Yes. Do I need to pay anything extra?
Clerk: ( オ ) It's the same price.
Customer: Good. Oh, I don't have the receipt with me. ( カ )
Clerk: That's all right. We can check your purchase if you paid by card.
Customer: I did. Here's my card.
Clerk: Thank you... All done. ( キ )
Customer: No, that's everything. Thanks a lot.
Clerk: ( ク ) Enjoy your new jacket.`,
    5,
    [
      ch("a", 1, KW, "空所（ア）に入る最も適切なものを選べ。", ["it's a little tight around the shoulders.", "I like it very much.", "I lost it on the train.", "it's too big for me."], 0,
        ["正しい。店員が it's too small? と言いかえている。", "but の後で、来店の理由にならない。", "上着を持ってきているので矛盾。", "店員の too small? と逆。"],
        "tight＝きつい", [["次の発言", "Clerk: {{it's too small?}}"], ["答え", "{{tight}}（きつい）が「小さい」の言いかえ。"]]),
      ch("i", 2, KW, "空所（イ）に入る最も適切なものを選べ。", ["Do you have this in a bigger size?", "Do you have this in another colour?", "How much is this?", "Where is the exit?"], 0,
        ["正しい。店員が medium と large がある、とサイズで答えている。", "返事はサイズで、色ではない。", "返事は値段ではない。", "返事は出口の場所ではない。"],
        "Do you have this in ～?＝～はありますか", [["返事", "we have it in {{medium and large}}（サイズ）。"], ["答え", "大きいサイズがあるかをたずねる文。"]]),
      ch("u", 1, KW, "空所（ウ）に入る最も適切なものを選べ。", ["Here you are.", "Keep the change.", "I'll take it.", "Help yourself to some cake."], 0,
        ["正しい。物を手渡すときの言葉。試着用の上着を渡している。", "おつりの話ではない。", "客が買うときの言葉。", "場面に合わない。"],
        "Here you are.＝はい、どうぞ（手渡す）", [["場面", "客が試着したいと言い、店員が{{上着を渡す}}。"], ["答え", "{{Here you are.}}"]]),
      ch("e", 1, KW, "空所（エ）に入る最も適切なものを選べ。", ["It fits perfectly.", "It's much too tight.", "I can't move my arms.", "It doesn't suit me at all."], 0,
        ["正しい。袖の長さもちょうどよい、と続く。", "直後のほめ言葉と矛盾。", "同じく矛盾。", "交換を希望する流れと矛盾。"],
        "fit＝サイズが合う", [["質問", "How does it {{fit}}?（サイズはどうですか）"], ["答え", "ぴったりだ、と答え、袖もちょうどよいと続く。"]]),
      ch("o", 2, KW, "空所（オ）に入る最も適切なものを選べ。", ["No, you don't.", "Yes, you must.", "Yes, ten dollars more.", "I'm not sure."], 0,
        ["正しい。同じ値段なので追加の支払いは不要。", "直後の the same price と矛盾。", "同じく矛盾。", "直後ではっきり同じ値段と言っている。"],
        "Do I need to …? への No, you don't.", [["直後", "It's {{the same price}}."], ["答え", "払う必要はない → {{No, you don't.}}"]]),
      ch("ka", 2, KW, "空所（カ）に入る最も適切なものを選べ。", ["Is that a problem?", "Can I have a discount?", "Is this on sale?", "Do you sell shoes?"], 0,
        ["正しい。レシートがないが問題か、とたずね、店員が That's all right. と答える。", "返事が割引の話ではない。", "返事がセールの話ではない。", "返事が靴の話ではない。"],
        "That's all right. の前は心配の質問", [["次の発言", "Clerk: {{That's all right.}}"], ["答え", "レシートがないのは{{問題か}}をたずねる文。"]]),
      ch("ki", 2, KW, "空所（キ）に入る最も適切なものを選べ。", ["Is there anything else I can do for you?", "Would you like to return the jacket?", "Do you want your money back?", "Shall I call the manager?"], 0,
        ["正しい。客が No, that's everything. と答えている。", "すでに交換が終わっており、流れに合わない。", "交換が終わっており、返金の話ではない。", "呼ぶ理由がない。"],
        "No, that's everything. の前はほかの用件", [["次の発言", "Customer: {{No, that's everything.}}"], ["答え", "ほかに用件はないかをたずねる文。"]]),
      ch("ku", 1, KW, "空所（ク）に入る最も適切なものを選べ。", ["My pleasure.", "Excuse me.", "I'm afraid so.", "Bless you."], 0,
        ["正しい。お礼への返事。", "呼びかけ・おわびで、お礼への返事ではない。", "「残念ながらそうです」で合わない。", "くしゃみをした人への言葉。"],
        "お礼への返事＝My pleasure.", [["前", "客が {{Thanks a lot.}} とお礼を言った。"], ["答え", "{{My pleasure.}}（どういたしまして）"]]),
    ]),
];

// =====================================================================
// Ⅴ　作文（英文の空所に適語を記述）
// =====================================================================

const T5LEAD = "次の英文の空所（ア）〜（ク）に入る最も適切な英語1語を、それぞれ与えられた文字で始まる形で書け。";
const T5: ExamPoolSection[] = [
  S(5, "fill-volunteer", V("2000"), "適語記述（海外ボランティア）", T5LEAD, "en",
    `More and more students are choosing to spend a summer working as volunteers in other countries. Many hope to make a （ア）d________ in the lives of the people they meet. Such programs can be valuable, but they are not always as helpful as they appear. Volunteers who stay for only two or three weeks may not have enough time to （イ）l________ the local language or understand the needs of the community. In some cases, they take on tasks that local workers could do better, such as building houses, for which they have no special （ウ）s________. Experts therefore advise students to （エ）r________ an organization carefully before joining it. A good program will explain clearly how its projects are chosen and who （オ）b________ from them. It will also prepare volunteers for the cultural challenges they are likely to （カ）f________. Volunteering, in the end, is not only about giving. It is also an （キ）o________ to grow, and the most successful volunteers are those who arrive with open minds and return with a deeper （ク）u________ of the world.`,
    5,
    [
      tm("difference", 1, V("jukugo"), "ア", "d", ["difference"], "make a difference＝変化をもたらす", [["熟語", "{{make a difference}}（in ～）＝（～に）よい変化をもたらす。"], ["答え", "{{difference}}。"]]),
      tm("learn", 1, V("2000"), "イ", "l", ["learn"], "to の後は原形・言語を「身につける」", [["形", "to の後なので動詞の原形。目的語は the local language。"], ["答え", "言葉を身につける {{learn}}。"]]),
      tm("skills", 2, V("2000"), "ウ", "s", ["skills", "skill"], "no special skills＝特別な技能がない", [["文脈", "家を建てる仕事で、現地の人のほうが上手にできる＝ボランティアには{{技能}}がない。"], ["答え", "{{skills}}（skill も可）。"]]),
      tm("research", 2, V("2000"), "エ", "r", ["research", "review"], "advise O to V＋調べる動詞", [["形", "{{advise O to V}} の V。目的語は an organization。"], ["答え", "参加する前に団体を{{よく調べる}}＝research（review も可）。"]]),
      tm("benefits", 3, V("jukugo"), "オ", "b", ["benefits", "benefit"], "benefit from＝～から恩恵を受ける", [["熟語", "{{benefit from ～}}＝～から利益・恩恵を受ける。"], ["形", "主語は who（単数扱い）なので {{benefits}}。"]]),
      tm("face", 2, V("2000"), "カ", "f", ["face"], "face a challenge＝困難に直面する", [["形", "be likely to V の V。目的語は前の challenges（関係詞の省略）。"], ["答え", "困難に{{直面する}}＝face。"]]),
      tm("opportunity", 2, V("2000"), "キ", "o", ["opportunity"], "an opportunity to V＝～する機会", [["形", "冠詞 an の後の名詞で、to grow が後ろから修飾。"], ["答え", "{{opportunity}}（機会）。"]]),
      tm("understanding", 2, V("2000"), "ク", "u", ["understanding"], "a deeper understanding of＝～のより深い理解", [["形", "a deeper の後なので名詞。of the world が続く。"], ["答え", "{{understanding}}（理解）。"]]),
    ]),

  S(5, "fill-notes", V("2000"), "適語記述（手書きのノートとパソコン）", T5LEAD, "en",
    `Many students now take notes on laptops instead of by hand. Typing is faster, so it might seem （ア）o________ that laptop notes would be better. However, some studies （イ）s________ the opposite. Because typing is so quick, students tend to record a lecture word for word without thinking about its （ウ）m________. Writing by hand, on the other hand, is slower, which （エ）f________ students to choose what is important and put it into their own words. This extra effort seems to help them （オ）r________ the material later. Of course, laptops have （カ）a________ too: notes can be searched, shared, and stored easily. The best （キ）c________ may depend on the subject and the student. What matters most is not the tool itself but whether it encourages active thinking rather than passive （ク）c________.`,
    5,
    [
      tm("obvious", 2, V("2000"), "ア", "o", ["obvious"], "it seems obvious that＝～は明らかに思える", [["形", "it might seem ＋形容詞＋that ～。"], ["文脈", "打つほうが速い、だから〜は{{当然}}に思える → {{obvious}}。"]]),
      tm("suggest", 2, V("2000"), "イ", "s", ["suggest", "show"], "研究が「示す」＝suggest / show", [["文脈", "However で前と逆の結果。研究が{{逆を示す}}。"], ["答え", "{{suggest}}（show も可）。主語 studies は複数なので s をつけない。"]]),
      tm("meaning", 2, V("2000"), "ウ", "m", ["meaning", "message"], "its の後は名詞＝講義の「意味」", [["形", "所有格 its の後なので名詞。"], ["答え", "考えずに一語一語写す＝講義の{{意味}}を考えない → {{meaning}}。"]]),
      tm("forces", 3, V("2000"), "エ", "f", ["forces"], "force O to V＝Oに～させる", [["語法", "{{force O to V}}＝Oにむりやり～させる。"], ["形", "主語は which（前の内容＝単数扱い）なので {{forces}}。"]]),
      tm("remember", 1, V("2000"), "オ", "r", ["remember", "recall", "retain"], "help O V＝Oが～するのを助ける", [["形", "{{help O 原形}}。目的語は the material。"], ["答え", "あとで{{思い出す}}＝remember（recall・retain も可）。"]]),
      tm("advantages", 2, V("2000"), "カ", "a", ["advantages", "advantage"], "advantage＝利点", [["文脈", "Of course … too で手書きと対比し、コロンの後に検索・共有・保存という{{利点}}を並べる。"], ["答え", "{{advantages}}。"]]),
      tm("choice", 2, V("2000"), "キ", "c", ["choice"], "the best choice＝最善の選択", [["形", "The best の後なので名詞。"], ["答え", "手書きかパソコンか → {{choice}}（選択）。"]]),
      tm("copying", 3, V("2000"), "ク", "c", ["copying"], "active thinking ↔ passive copying", [["対比", "{{active thinking}} ↔ passive ～ing。"], ["答え", "第3文の「一語一語写す」を受けて {{copying}}。"]]),
    ]),

  S(5, "fill-bus", V("2000"), "適語記述（地方の交通）", T5LEAD, "en",
    `In many rural towns, the number of buses has been cut because fewer people use them. This creates a serious problem for older residents who can no longer （ア）w________ long distances. Without a car or a bus, even a short trip to the hospital or the supermarket can become （イ）d________. Some towns have （ウ）i________ "on-demand" services, in which a small vehicle picks up passengers only when they （エ）r________ a ride by phone or app. Such services cost less to （オ）o________ than regular buses that run on fixed routes even when they are empty. They are not a perfect （カ）s________, however. Some older people find the booking system hard to use, and drivers are （キ）i________ hard to find. Still, many communities see these services as a （ク）p________ way to keep residents connected.`,
    5,
    [
      tm("walk", 1, V("2000"), "ア", "w", ["walk"], "can no longer V＝もはや～できない", [["形", "can no longer の後は原形。long distances が目的語のように続く。"], ["答え", "長い距離を{{歩く}}＝walk。"]]),
      tm("difficult", 1, V("2000"), "イ", "d", ["difficult"], "become＋形容詞", [["形", "become の後は形容詞（補語）。"], ["答え", "車もバスもなければ短い移動も{{むずかしい}}＝difficult。"]]),
      tm("introduced", 2, V("2000"), "ウ", "i", ["introduced"], "have＋過去分詞＝導入した", [["形", "have の後なので過去分詞（現在完了）。"], ["答え", "新しい仕組みを{{導入した}}＝introduced。"]]),
      tm("request", 2, V("2000"), "エ", "r", ["request", "reserve"], "電話やアプリで乗車を「頼む」", [["形", "主語 they（複数）の現在形。目的語は a ride。"], ["答え", "{{request}}（reserve も可）。"]]),
      tm("operate", 3, V("2000"), "オ", "o", ["operate"], "cost less to operate＝運行費が安い", [["形", "cost less to V＝～するのに費用が少なくてすむ。"], ["答え", "サービスを{{運行する}}＝operate。"]]),
      tm("solution", 2, V("2000"), "カ", "s", ["solution"], "a perfect solution＝完全な解決策", [["形", "a perfect の後なので名詞。"], ["答え", "問題の{{解決策}}＝solution。however で欠点が続きます。"]]),
      tm("increasingly", 3, V("2000"), "キ", "i", ["increasingly"], "increasingly＝ますます", [["形", "形容詞 hard を修飾する副詞。"], ["答え", "運転手は{{ますます}}見つけにくい＝increasingly。"]]),
      tm("promising", 3, V("2000"), "ク", "p", ["promising", "practical", "possible"], "promising＝見こみのある", [["形", "a ＿ way の間なので形容詞。"], ["文脈", "Still（それでも）で欠点のあとに前向きな評価 → {{promising}}（practical・possible も可）。"]]),
    ]),
];

export const U_RIKKYO_EIGO: UnivExam = {
  key: K,
  univ: "立教大学",
  kamoku: "英語",
  tier: "MARCH",
  order: 106,
  basis: "文学部（大学独自の英語試験を課す日程）の傾向を参考。ほかの日程は外部試験・共通テストを利用",
  format: "大問5題・75分。論説文2題（選択・英文和訳）、文法の誤り指摘、会話文の空所補充、英文の適語記述。",
  minutes: 75,
  groups: ["語彙", "文法", "技能"],
  sections: [
    { title: "第1問　長文読解（論説文）", lead: LEAD1, count: [7, 7], mix: [0.2, 0.5, 0.3], points: 60, prefer: "material", poolTag: `${K}:1` },
    { title: "第2問　長文読解と英文和訳", lead: LEAD2, count: [5, 7], mix: [0.2, 0.5, 0.3], points: 60, prefer: "material", poolTag: `${K}:2` },
    { title: "第3問　文法・語法（誤り指摘）", lead: ER_LEAD, count: [5, 5], mix: [0.2, 0.5, 0.3], points: 25, prefer: "material", poolTag: `${K}:3` },
    { title: "第4問　会話文（空所補充）", lead: "次の会話文を読み、空所に入る最も適切なものを選べ。", count: [5, 5], mix: [0.2, 0.5, 0.3], points: 25, prefer: "material", poolTag: `${K}:4` },
    { title: "第5問　英文の空所補充（適語記述）", lead: T5LEAD, count: [5, 5], mix: [0.2, 0.5, 0.3], points: 30, prefer: "material", poolTag: `${K}:5` },
  ],
  pool: [...T1, ...T2, ...T3, ...T4, ...T5],
};
