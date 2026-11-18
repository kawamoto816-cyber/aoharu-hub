import type { UnivExam } from "./types";
import type { ExamPoolSection } from "../pool/types";
import type { Question } from "@/lib/moshi/types";

// 法政大学型 英語（MARCH）。経営学部 A方式（個別日程）の傾向を参考にした練習用の形式（英文・設問はすべて書き下ろし）。
// 参考にした形式の情報（問題文・設問文・英文は使っていない）:
//   https://jyuke-labo.com/daigakujyukentaisaku/houseidaigaku/keieigakubu/  （経営学部 A方式・T日程：英語 90分・150点。長文が中心、文法語彙・整序・会話文）
//   https://jyuke-labo.com/daigakujyukentaisaku/houseidaigaku/kamokubetsu/  （社会科学・人文科学・自然科学の長文が複数、空所補充・誤文訂正・並べ替え）
//   https://search.keinet.ne.jp/2279/topics/33  （河合塾 Kei-Net：マークシート方式。内容一致・空所補充・語義・タイトル選択）
// 90分・150点・全問マーク。会話文の空所補充、文法・語彙（4択・誤り指摘）、語句整序、
// 社会の長文と科学・文化の長文（空所補充・語義・下線部・内容一致・整序・表題）の5題。

const K = "hosei-eigo";
type St = [string, string][];

const CHOBUN = "h-eng-skill-chobun";
const KAIWA = "h-eng-vocab-kaiwa";
const VOC = "h-eng-vocab-2000";
const JUKU = "h-eng-vocab-jukugo";
const G = (s: string) => `h-eng-gram-${s}`;

const steps = (s: St) => s.map(([title, body]) => ({ title, body }));
const sec = (d: 1 | 2 | 3) => (d === 1 ? 45 : d === 2 ? 70 : 90);
const pts = (d: 1 | 2 | 3) => (d === 1 ? 4 : d === 2 ? 5 : 6);

/** 4択 */
function ch(id: string, d: 1 | 2 | 3, unit: string, prompt: string, options: string[], correct: number, why: string[], point: string, st: St): Question {
  return {
    id,
    type: "B",
    difficulty: d,
    points: pts(d),
    seconds: sec(d),
    skill: d === 1 ? "知識・技能" : "思考・判断・表現",
    unit,
    prompt,
    answer: { kind: "choice", options, correct, why },
    point,
    steps: steps(st),
  };
}

/** 誤り指摘 (選択肢は①〜④の順のまま) */
function er(id: string, d: 1 | 2 | 3, unit: string, prompt: string, options: string[], correct: number, why: string[], point: string, st: St): Question {
  return { ...ch(id, d, unit, prompt, options, correct, why, point, st), keepOrder: true } as Question;
}

/** 並べかえ (tokens は正しい順) */
function od(id: string, d: 1 | 2 | 3, unit: string, prompt: string, tokens: string[], point: string, st: St): Question {
  return {
    id,
    type: "B",
    difficulty: d,
    points: pts(d),
    seconds: 90,
    skill: "思考・判断・表現",
    unit,
    prompt,
    answer: { kind: "order", tokens },
    point,
    steps: steps(st),
  };
}

function S(n: number, id: string, unit: string, title: string, lead: string, passageTitle: string | undefined, body: string, pick: number, questions: Question[], lang: "en" | "text" = "en"): ExamPoolSection {
  return {
    unit,
    tag: `${K}:${n}`,
    section: {
      id: `ho-${id}`,
      title,
      lead,
      style: "reading",
      examOnly: true,
      pick,
      material: lang === "en" ? [{ kind: "passage", lang: "en", title: passageTitle, body }] : [{ kind: "text", body }],
      questions,
    },
  };
}

const READ = "次の英文を読み、問いに答えよ。";
const CLEAD = "次の会話文を読み、空所に入る最も適切なものを選べ。";
const GLEAD = "次の各問いに答えよ。";
const OLEAD = "日本文の意味になるように、与えられた語句を並べかえて英文を完成させよ。";

// =====================================================================
// 第1問　会話文
// =====================================================================

const T1: ExamPoolSection[] = [
  S(
    1,
    "abroad",
    KAIWA,
    "留学の相談（大学の国際交流センター）",
    CLEAD,
    "At the International Office",
    `Advisor: Good afternoon. ( 1 )
Ken: Hi. I'm thinking about studying abroad next year, but I have no idea where to start.
Advisor: Don't worry. ( 2 ) Have you chosen a country yet?
Ken: Not yet. I want to improve my English, so ( 3 )
Advisor: That makes sense. And how long are you hoping to stay?
Ken: Ideally a full year. ( 4 ) My parents are worried about the cost.
Advisor: I understand. In that case, you might be interested in our exchange program. Students pay their usual tuition here, not at the partner school.
Ken: Really? ( 5 )
Advisor: It does. However, places are limited, and you'll need a good English test score.
Ken: ( 6 ) What score do I need?
Advisor: It depends on the school, but most ask for a fairly high level. When is your next test?
Ken: I haven't signed up for one yet.
Advisor: ( 7 ) Registration for the December test closes this Friday.
Ken: This Friday? I'll do it tonight. ( 8 )
Advisor: Yes. Start thinking about a study plan, and ask one of your professors for a letter of recommendation.
Ken: All right. ( 9 )
Advisor: Not at all. Come back anytime if you have more questions.`,
    6,
    [
      ch("k1", 1, KAIWA, "空所( 1 )に入る最も適切なものを選べ。", ["What can I do for you today?", "Have we met somewhere before?", "Would you like some more?", "How much is it?"], 0,
        ["正解。窓口の担当者が来訪者に用件をたずねる決まり文句。", "初対面かどうかを気にする場面ではなく、Ken も相談の用件を話し始めている。", "食べ物などのおかわりをすすめる表現。", "値段をたずねる表現で、窓口の最初の一言に合わない。"],
        "窓口での「ご用件は？」の言い方",
        [["場面", "国際交流センターの {{担当者}} が最初に話しかけている。"], ["次の発言", "Ken が {{相談の中身}} を話し始める → 用件をたずねる表現。"]]),
      ch("k2", 2, KAIWA, "空所( 2 )に入る最も適切なものを選べ。", ["That's exactly what we're here for.", "Nobody in this office can help you.", "I'm afraid the office is closed today.", "You don't need to study at all."], 0,
        ["正解。Don't worry. に続けて「それを手伝うのが私たちの仕事です」と安心させる。", "Don't worry. と言ったあとに「だれも手伝えない」は矛盾する。", "このあとも相談を続けており、閉まっているのではない。", "留学の相談に「勉強はまったく必要ない」は合わない。"],
        "Don't worry. のあとは安心させる内容",
        [["直前", "{{Don't worry.}}（心配しないで）"], ["続き", "相談に乗るのが仕事＝{{That's exactly what we're here for.}}"]]),
      ch("k3", 1, KAIWA, "空所( 3 )に入る最も適切なものを選べ。", ["somewhere English-speaking would be best.", "I'd rather go where English isn't used.", "I've decided to stay in Japan.", "my English is already perfect."], 0,
        ["正解。英語を伸ばしたい → 英語圏がいい、と so でつながる。", "英語を伸ばしたいのに英語を使わない国では so の流れに合わない。", "留学の相談をしているので、日本に残ると決めたのは矛盾。", "英語が完璧なら improve したいとは言わない。"],
        "so の前後は「理由→結論」",
        [["理由", "{{I want to improve my English}}。"], ["結論", "so → {{英語圏}} がいい。"]]),
      ch("k4", 2, KAIWA, "空所( 4 )に入る最も適切なものを選べ。", ["I'm not sure we can afford it, though.", "Money is no problem for my family.", "I've already paid for everything.", "A week would be too long for me."], 0,
        ["正解。次の文「両親が費用を心配している」につながる。", "次の文の「費用の心配」と矛盾する。", "まだ国も決まっておらず、支払いずみはありえない。", "1年いたいと言った直後に「1週間でも長すぎる」は矛盾。"],
        "次の文（費用の心配）から逆算する",
        [["次の文", "{{My parents are worried about the cost.}}"], ["空所", "費用をまかなえるか不安＝{{I'm not sure we can afford it}}。"]]),
      ch("k5", 2, KAIWA, "空所( 5 )に入る最も適切なものを選べ。", ["That would make a big difference.", "That sounds much more expensive.", "Then I'll give up on the idea.", "I'm sorry to hear that."], 0,
        ["正解。ふだんの学費だけですむなら大助かり。担当者の It does.（そうなんです）にも合う。", "ふだんの学費だけですむので、高くなるのではない。", "費用の心配が軽くなる話なので、あきらめる理由にならない。", "よい知らせに「お気の毒に」は合わない。"],
        "よい知らせへの反応を選ぶ",
        [["前の情報", "学費は {{usual tuition here}} だけ → 費用の心配が減る。"], ["応答", "{{That would make a big difference.}}（大きなちがいだ）"]]),
      ch("k6", 2, KAIWA, "空所( 6 )に入る最も適切なものを選べ。", ["I was afraid of that.", "Thanks, but I don't need any help.", "Congratulations on your score.", "I've never heard of English tests."], 0,
        ["正解。「枠が少なく、試験の点が必要」という条件に「やっぱりそうか」と受ける。", "このあと必要な点をたずねており、助けがいらないのではない。", "まだ受験していないので、点数を祝うのは合わない。", "このあと必要な点をたずねており、試験を知らないのは不自然。"],
        "I was afraid of that.＝やはりそうか",
        [["前の情報", "{{places are limited}}・試験の点が必要＝厳しい条件。"], ["応答", "心配していたとおり＝{{I was afraid of that.}}"]]),
      ch("k7", 2, KAIWA, "空所( 7 )に入る最も適切なものを選べ。", ["Then you'd better do it soon.", "Then there's no need to hurry.", "Then you've already missed your chance.", "Then you'll have to wait until next year."], 0,
        ["正解。申しこみの締め切りが今週の金曜 → 早くしたほうがいい。", "締め切りが目前なので「急がなくてよい」は逆。", "締め切りは今週金曜（これから）なので、まだ間に合う。", "12月の試験にまだ申しこめるので、来年まで待つ必要はない。"],
        "had better＝～したほうがいい",
        [["次の文", "締め切りは {{this Friday}}（まだ先）。"], ["助言", "すぐ申しこむべき＝{{you'd better do it soon}}。"]]),
      ch("k8", 2, KAIWA, "空所( 8 )に入る最も適切なものを選べ。", ["Is there anything else I should prepare?", "Could you take the test for me?", "Why did you close the office?", "Which test did you fail?"], 0,
        ["正解。担当者の Yes. と、計画や推薦状の準備の助言につながる。", "試験の代わりを頼むのは不正で、Yes. の答えとも合わない。", "事務所は閉まっていない。", "まだ受けていない試験に落ちたはずがない。"],
        "次の返事（Yes.＋準備の助言）から逆算",
        [["次の返事", "{{Yes.}} のあとに、計画・推薦状という {{準備}} の話。"], ["空所", "ほかに準備することは？＝{{anything else I should prepare}}。"]]),
      ch("k9", 1, KAIWA, "空所( 9 )に入る最も適切なものを選べ。", ["Thank you so much for your time.", "You're welcome.", "Same to you.", "It's my pleasure to help you."], 0,
        ["正解。相談に乗ってもらったお礼。返事の Not at all.（どういたしまして）と合う。", "お礼を言われた側の返事で、ここでは逆。", "「あなたもね」はあいさつへの返し。", "助けた側（担当者）が言うことば。"],
        "Not at all. はお礼への返事",
        [["次の返事", "{{Not at all.}}＝どういたしまして。"], ["空所", "その前はお礼＝{{Thank you so much for your time.}}"]]),
    ],
  ),
  S(
    1,
    "return",
    KAIWA,
    "商品の交換（電器店で）",
    CLEAD,
    "At an Electronics Store",
    `Clerk: Hello. ( 1 )
Emma: Yes. I bought these headphones here last week, but the left side has stopped working.
Clerk: I'm sorry to hear that. ( 2 )
Emma: Yes, here it is.
Clerk: Thank you. Let me see... ( 3 ) That means you can either exchange them or get a refund.
Emma: ( 4 ) I really like the sound quality.
Clerk: Certainly. ( 5 ) We're out of black ones at the moment.
Emma: Hmm, what colors do you have?
Clerk: White and dark blue.
Emma: Dark blue, then. ( 6 )
Clerk: Good choice. ( 7 ) It'll only take a few minutes.
Emma: Thanks. By the way, ( 8 )
Clerk: Try not to wrap the cable tightly around the headphones. That often damages the wire inside.
Emma: Oh, ( 9 ) That's exactly what I've been doing.`,
    6,
    [
      ch("k1", 1, KAIWA, "空所( 1 )に入る最も適切なものを選べ。", ["Is there anything I can help you with?", "Do you have the time?", "Here's your change.", "Long time no see."], 0,
        ["正解。店員が客に用件をたずねる表現。Emma の Yes. と用件の説明につながる。", "時刻をたずねる表現で、店員の最初の一言に合わない。", "おつりを渡すのは会計のあと。", "久しぶりに会った知り合いへのあいさつ。"],
        "店員の「何かお困りですか」",
        [["次の発言", "{{Yes.}} のあとに買った品の不具合を説明している。"], ["空所", "用件をたずねる＝{{anything I can help you with}}。"]]),
      ch("k2", 1, KAIWA, "空所( 2 )に入る最も適切なものを選べ。", ["Do you have the receipt with you?", "Did you enjoy the concert?", "How did you know my name?", "Would you like them gift-wrapped?"], 0,
        ["正解。返品・交換ではまずレシートを確かめる。Emma の here it is.（はいどうぞ）と合う。", "コンサートの話は出ていない。", "名前の話は出ていない。", "故障品をプレゼント用に包むのは不自然。"],
        "here it is＝（物を渡して）はいどうぞ",
        [["次の発言", "{{here it is}} → 何かを手渡している。"], ["空所", "返品で必要なもの＝{{receipt}}。"]]),
      ch("k3", 2, KAIWA, "空所( 3 )に入る最も適切なものを選べ。", ["You're still within the return period.", "I'm afraid the return period has ended.", "These were on sale, so we can't help you.", "You bought them at another store."], 0,
        ["正解。次の That means（つまり）交換か返金ができる、につながる。", "期限切れなら交換も返金もできず、次の文と矛盾する。", "助けられないなら、次の「交換か返金ができる」と矛盾する。", "Emma は here（この店）で買ったと言っている。"],
        "That means の前後は「理由→結果」",
        [["次の文", "That means you can {{exchange them or get a refund}}。"], ["空所", "その理由＝まだ {{返品の期間内}}。"]]),
      ch("k4", 2, KAIWA, "空所( 4 )に入る最も適切なものを選べ。", ["I'd prefer a new pair of the same model.", "I never want to see them again.", "Could you fix my phone instead?", "I'd like to buy another receipt."], 0,
        ["正解。音質が気に入っている → 同じ型の新品と交換したい。", "音質が気に入っていると言っており、二度と見たくないは矛盾。", "スマートフォンの修理の話ではない。", "レシートは買うものではない。"],
        "次の文（音質が好き）から、交換を選ぶ",
        [["次の文", "{{I really like the sound quality.}}"], ["空所", "返金より {{同じ型の新品}} がいい。"]]),
      ch("k5", 2, KAIWA, "空所( 5 )に入る最も適切なものを選べ。", ["Would you mind a different color?", "Would you like a paper bag?", "Do you want to pay in cash?", "Have you used them before?"], 0,
        ["正解。黒が品切れ → ちがう色でもいいかとたずねる。Emma も色をたずね返す。", "袋の話では次の「黒が品切れ」とつながらない。", "交換なので支払いは発生しない。", "1週間使っていたことはすでにわかっている。"],
        "次の文（黒が品切れ）から逆算",
        [["次の文", "{{We're out of black ones}}＝黒は品切れ。"], ["空所", "ほかの色でいいか＝{{Would you mind a different color?}}"]]),
      ch("k6", 2, KAIWA, "空所( 6 )に入る最も適切なものを選べ。", ["It's not so different from black.", "I can't stand dark colors.", "I'll take both of them for free.", "White is the only color I like."], 0,
        ["正解。もとの黒に近い紺を選んだ理由として自然。", "dark blue を選んだ直後に「暗い色はがまんできない」は矛盾。", "交換は1つで、両方をただでもらうのはありえない。", "紺を選んだのに「白しか好きでない」は矛盾。"],
        "選んだ理由として筋の通るものを",
        [["選んだ色", "{{Dark blue}}。もとは black。"], ["理由", "黒と {{それほどちがわない}} から。"]]),
      ch("k7", 1, KAIWA, "空所( 7 )に入る最も適切なものを選べ。", ["Let me get a new pair from the back.", "Please come back next month.", "You'll have to order them online.", "Let me call the factory overseas."], 0,
        ["正解。数分で終わる＝奥（倉庫）から新しいものを取ってくる。", "数分で終わると言っているので、来月来るのは合わない。", "在庫の紺があるので、ネットで注文する必要はない。", "数分で終わる手続きと合わない。"],
        "次の文（数分で終わる）が手がかり",
        [["次の文", "{{It'll only take a few minutes.}}"], ["空所", "その場でできること＝{{get a new pair from the back}}。"]]),
      ch("k8", 2, KAIWA, "空所( 8 )に入る最も適切なものを選べ。", ["is there a way to avoid this problem in the future?", "where did you buy these headphones?", "why are you giving me a refund?", "how much did I pay you yesterday?"], 0,
        ["正解。店員がこわれないための注意（コードをきつく巻かない）を答えている。", "店員ではなく Emma が買った。", "返金ではなく交換を選んでいる。", "買ったのは先週で、昨日ではない。"],
        "次の返事（使い方の注意）から逆算",
        [["次の返事", "{{Try not to wrap the cable tightly}} … と予防の助言。"], ["空所", "今後ふせぐ方法＝{{a way to avoid this problem}}。"]]),
      ch("k9", 2, KAIWA, "空所( 9 )に入る最も適切なものを選べ。", ["that explains it.", "that's none of your business.", "I'm glad you agree.", "I'll keep doing that, then."], 0,
        ["正解。まさにそうしていた → 故障の理由がわかった＝that explains it。", "助言をくれた店員に失礼で、流れに合わない。", "店員は同意したのではなく助言をした。", "こわれる原因と知ったのに続けるのは不自然。"],
        "That explains it.＝それで納得がいく",
        [["次の文", "{{That's exactly what I've been doing.}}（まさにそうしていた）"], ["空所", "原因がわかった＝{{that explains it}}。"]]),
    ],
  ),
  S(
    1,
    "farewell",
    KAIWA,
    "先生の送別会の計画（高校の友人どうし）",
    CLEAD,
    "Planning a Surprise",
    `Yuta: Hey, Lisa. Did you hear that Ms. Brown is going back to Canada next month?
Lisa: ( 1 ) She's been teaching here for six years.
Yuta: Some of us want to throw a surprise party for her. ( 2 )
Lisa: Of course! ( 3 )
Yuta: On the last Friday before she leaves. The problem is where to hold it.
Lisa: How about the music room? ( 4 )
Yuta: Good idea, but ( 5 ) She often practices the piano there after school.
Lisa: Oh, I forgot about that. Then what about the meeting room in the library?
Yuta: ( 6 ) I'll ask the librarian tomorrow.
Lisa: And what should we give her as a present?
Yuta: ( 7 )
Lisa: Well, she always says she loves the cherry trees at our school. Maybe a photo album of the school in spring?
Yuta: ( 8 ) Everyone could write a message under each photo, too.
Lisa: Then let's start collecting photos this week. ( 9 )
Yuta: Don't worry. My lips are sealed.`,
    6,
    [
      ch("k1", 1, KAIWA, "空所( 1 )に入る最も適切なものを選べ。", ["Yes, I can hardly believe it.", "No, she's never been to Canada.", "Yes, she just arrived yesterday.", "I'm glad she's staying here."], 0,
        ["正解。6年も教えてくれた先生が帰ってしまう → 信じられない。", "going back（帰る）と言われており、カナダに行ったことがないは矛盾。", "6年教えている先生が昨日着いたのではない。", "帰国の話なので「残ってくれてうれしい」は逆。"],
        "can hardly believe＝ほとんど信じられない",
        [["前の情報", "Ms. Brown が {{going back to Canada}}。"], ["反応", "6年いた先生が去る → {{I can hardly believe it.}}"]]),
      ch("k2", 1, KAIWA, "空所( 2 )に入る最も適切なものを選べ。", ["Would you like to help?", "Please don't tell anyone I'm leaving.", "Have you ever thrown a ball?", "Why didn't you invite me?"], 0,
        ["正解。計画に誘う表現。Lisa の Of course! と合う。", "帰国するのは Yuta ではなく先生。", "throw a party の throw を「投げる」と取った誤り。", "誘っているのは Yuta のほう。"],
        "Of course! はさそい・頼みへの返事",
        [["次の返事", "{{Of course!}}（もちろん）"], ["空所", "さそい＝{{Would you like to help?}}"]]),
      ch("k3", 2, KAIWA, "空所( 3 )に入る最も適切なものを選べ。", ["When are you planning to have it?", "Who is Ms. Brown, anyway?", "How long have you lived in Canada?", "Where did she buy it?"], 0,
        ["正解。Yuta が「最後の金曜日に」と日にちで答えている。", "直前に6年教えている先生だと話しており、不自然。", "カナダに住んでいたのは Yuta ではない。", "it が指すものがなく、日にちの答えとも合わない。"],
        "次の答え（日にち）から疑問詞を決める",
        [["次の答え", "{{On the last Friday}} … → 日にち。"], ["空所", "いつ？＝{{When are you planning to have it?}}"]]),
      ch("k4", 2, KAIWA, "空所( 4 )に入る最も適切なものを選べ。", ["It's big enough for everyone.", "It's too small for even five people.", "Nobody is allowed to use it.", "It's always locked on Fridays."], 0,
        ["正解。会場の案として勧める理由。Yuta の Good idea にも合う。", "狭すぎるなら自分の案の勧め方として矛盾する。", "使えない部屋を勧めるのは矛盾。", "金曜に会を開くので、金曜にいつも閉まっている部屋は案にならない。"],
        "提案のあとは、勧める理由",
        [["提案", "{{How about the music room?}}"], ["理由", "みんなが入れる＝{{big enough for everyone}}。"]]),
      ch("k5", 2, KAIWA, "空所( 5 )に入る最も適切なものを選べ。", ["she might find out about it.", "it's too far from her house.", "she hates music.", "we've already cleaned it."], 0,
        ["正解。先生がよく音楽室でピアノを練習する → サプライズがばれるかもしれない。", "家からの距離は次の文の理由と関係がない。", "ピアノを練習しており、音楽が嫌いとは矛盾。", "but のあとに「だめな理由」が来るので合わない。"],
        "but のあとは案の欠点",
        [["次の文", "{{She often practices the piano there}}。"], ["欠点", "サプライズが {{ばれる}}＝find out。"]]),
      ch("k6", 1, KAIWA, "空所( 6 )に入る最も適切なものを選べ。", ["That could work.", "That's out of the question.", "I've never been to school.", "You're welcome."], 0,
        ["正解。「うまくいくかも」と賛成し、図書館の人に聞きに行く。", "「問題外」なら司書に頼みに行くのは矛盾。", "学校の生徒どうしの会話で不自然。", "お礼への返事で、提案への答えではない。"],
        "次の行動（司書にたずねる）から賛成を選ぶ",
        [["次の文", "{{I'll ask the librarian tomorrow.}}"], ["空所", "賛成＝{{That could work.}}"]]),
      ch("k7", 2, KAIWA, "空所( 7 )に入る最も適切なものを選べ。", ["I was going to ask you the same thing.", "I gave it to her yesterday.", "She already sent it back.", "Thank you for the present."], 0,
        ["正解。自分も決めていない → Lisa が案を出す流れにつながる。", "まだ贈り物を決めておらず、Lisa が案を出している。", "まだ何も渡していない。", "贈り物をもらったのではない。"],
        "次に Lisa が案を出すことに注意",
        [["次の発言", "Lisa が {{Maybe a photo album …?}} と案を出す。"], ["空所", "Yuta も決めていない＝{{ask you the same thing}}。"]]),
      ch("k8", 1, KAIWA, "空所( 8 )に入る最も適切なものを選べ。", ["That's a wonderful idea.", "That sounds boring to me.", "I don't think she'd like it.", "We don't have a school."], 0,
        ["正解。賛成し、「写真の下にメッセージも」と案をふくらませる。", "too（～も）で案に付け足しており、つまらないとは矛盾。", "否定してから案を付け足すのは矛盾。", "学校の写真の話で不自然。"],
        "次の文で案を付け足している＝賛成",
        [["次の文", "Everyone could write a message …, {{too}}."], ["空所", "賛成＝{{That's a wonderful idea.}}"]]),
      ch("k9", 2, KAIWA, "空所( 9 )に入る最も適切なものを選べ。", ["Just make sure she doesn't find out!", "Let's tell her about the party today.", "Don't forget to invite her to Canada.", "Let's ask her to bring the album."], 0,
        ["正解。サプライズなので秘密に。返事の My lips are sealed.（口外しない）と合う。", "サプライズを本人に話すのは矛盾。", "カナダに招く話ではない。", "贈り物を本人に持ってこさせるのは不自然。"],
        "My lips are sealed.＝だれにも言わない",
        [["次の返事", "{{My lips are sealed.}}"], ["空所", "秘密を守って＝{{make sure she doesn't find out}}。"]]),
    ],
  ),
];

// =====================================================================
// 第2問　文法・語彙（4択・誤り指摘）
// =====================================================================

const GBODY = "各問いは独立している。英文の空所は（　）で示す。誤り指摘の問いでは、下線部を①〜④の番号で示す。";
const ERR = "次の英文の下線部①〜④のうち、誤りをふくむものを1つ選べ。\n";

const T2: ExamPoolSection[] = [
  S(
    2,
    "gram-a",
    G("jisei"),
    "文法・語彙（1）",
    GLEAD,
    undefined,
    GBODY,
    10,
    [
      ch("bytime", 2, G("kanryo"), "By the time we arrived at the theater, the movie (　).", ["had already started", "has already started", "already starts", "will have started"], 0,
        ["正解。到着（過去）より前に始まっていた → 過去完了。", "現在完了は過去の一時点（arrived）を基準にできない。", "現在形では過去の話と合わない。", "未来完了は未来の一時点が基準。"],
        "過去の一時点より前は過去完了",
        [["基準", "{{By the time we arrived}}＝過去の一時点。"], ["時制", "それより前に完了 → {{had already started}}。"]]),
      ch("notuntil", 3, G("tokushu"), "Not until he lost his job (　) the value of money.", ["did he realize", "he realized", "he did realize", "realized he"], 0,
        ["正解。否定語句（Not until ～）が文頭に出ると、あとは疑問文の語順（倒置）。", "倒置していない。", "did を使うなら did he realize の順。", "一般動詞の過去形をそのまま主語の前に出す倒置はしない。"],
        "否定語句が文頭 → 疑問文の語順",
        [["文頭", "{{Not until}} ～（否定語句）。"], ["倒置", "助動詞＋S＋原形＝{{did he realize}}。"]]),
      ch("number", 2, G("meishi"), "The number of tourists visiting the town (　) increased sharply.", ["has", "have", "are", "were"], 0,
        ["正解。主語の中心は The number（数）で単数 → has increased。", "tourists に引かれた誤り。主語は The number。", "are increased は「増やされる」の受け身で意味が合わない。", "were も複数で、受け身にもなり合わない。"],
        "the number of ～ は単数あつかい",
        [["主語", "中心は {{The number}}（単数）。"], ["動詞", "単数＋現在完了＝{{has}} increased。"]]),
      ch("wereit", 3, G("kateiho"), "(　) it not for the scholarship, she could not study abroad.", ["Were", "Had", "If", "Should"], 0,
        ["正解。If it were not for ～ の if を省いた倒置＝Were it not for ～（～がなければ）。", "Had を使うなら Had it not been for ～ で been が必要。", "If を使うなら If it were not for ～ で were が必要。", "Should it not for ～ という形はない。"],
        "Were it not for ～＝～がなければ",
        [["主節", "{{could not study}}＝仮定法過去。"], ["倒置", "If it were not for → {{Were it not for}}。"]]),
      ch("where", 1, G("kandai"), "This is the house (　) my grandfather was born.", ["where", "which", "what", "whose"], 0,
        ["正解。my grandfather was born は欠けのない文 → 場所の関係副詞 where。", "which なら born in which / which … was born in の形が必要。", "what は先行詞をとらない。", "whose のあとには名詞が必要。"],
        "後ろが完全な文なら関係副詞",
        [["後ろの文", "my grandfather was born＝{{欠けがない}}。"], ["先行詞", "場所（the house）→ {{where}}。"]]),
      ch("incase", 2, G("setsuzokushi"), "You should take an umbrella (　) it rains.", ["in case", "unless", "even though", "as if"], 0,
        ["正解。in case ～＝～するといけないから（念のため）。", "unless（～しないかぎり）では「雨が降らないなら持っていけ」で意味が通らない。", "even though（～だけれども）は事実を受ける。", "as if（まるで～のように）は合わない。"],
        "in case ～＝～の場合にそなえて",
        [["意味", "雨が降る {{場合にそなえて}} かさを持つ。"], ["接続詞", "{{in case}} S V。"]]),
      ch("calloff", 1, JUKU, "The meeting was (　) because of the typhoon.", ["called off", "called on", "put on", "taken off"], 0,
        ["正解。call off＝中止する。", "call on は「（人を）訪ねる」。", "put on は「身につける・上演する」。", "take off は「脱ぐ・離陸する」。"],
        "call off＝cancel",
        [["文脈", "台風のために会議が → {{中止された}}。"], ["熟語", "{{call off}}＝cancel。"]]),
      ch("fillout", 1, JUKU, "Please (　) this form and hand it to the receptionist.", ["fill out", "carry out", "give out", "run out"], 0,
        ["正解。fill out a form＝用紙に記入する。", "carry out は「実行する」。", "give out は「配る」。", "run out は「尽きる」で目的語をとらない。"],
        "fill out (in) a form＝用紙に記入する",
        [["目的語", "{{this form}}（用紙）。"], ["熟語", "用紙に書きこむ＝{{fill out}}。"]]),
      ch("kindof", 1, G("futeishi"), "It is (　) of you to help the old woman with her bag.", ["kind", "kindness", "kindly", "kinder"], 0,
        ["正解。It is＋人の性質を表す形容詞＋of 人＋to do。", "名詞は It is ～ of you の補語の形にならない。", "副詞は補語にならない。", "比較の対象がない。"],
        "It is 形容詞 of 人 to do",
        [["形", "It is {{形容詞}} {{of you}} to do。"], ["品詞", "人の性質の形容詞＝{{kind}}。"]]),
      ch("themore", 2, G("hikaku"), "The more you practice, (　) you will become.", ["the better", "the best", "better", "more better"], 0,
        ["正解。The＋比較級 ～, the＋比較級 …＝～すればするほど…。", "最上級は使わない。", "後半にも the が必要。", "more better という形はない。"],
        "The 比較級 ～, the 比較級 …",
        [["前半", "{{The more}} you practice。"], ["後半", "同じ形で {{the better}}。"]]),
      er("err-each", 2, G("meishi"), `${ERR}Each of the students ①have to ②submit a report ③by the end of ④this week.`, ["① have", "② submit", "③ by", "④ this"], 0,
        ["正解。主語は Each（単数）なので has to にする。", "have to のあとは原形でよい。", "by＝～までに（期限）で正しい。", "this week で正しい。"],
        "Each of ～ は単数あつかい",
        [["主語", "{{Each}} of the students＝単数。"], ["動詞", "have → {{has}} to。"]]),
      er("err-suggest", 3, G("jodoshi"), `${ERR}She ①suggested that he ②goes to see a doctor ③as soon as ④possible.`, ["① suggested", "② goes", "③ as soon as", "④ possible"], 1,
        ["suggested で正しい。", "正解。suggest that S（should）原形 → go にする。", "as soon as possible＝できるだけ早く。", "as soon as possible の一部で正しい。"],
        "提案の that 節は（should）原形",
        [["動詞", "{{suggest}}・demand・insist などの that 節。"], ["形", "（should）＋{{原形}} → goes を go に。"]]),
      ch("cause", 2, VOC, "Heavy rain (　) the river to overflow.", ["caused", "made", "let", "had"], 0,
        ["正解。cause O to do＝Oに～させる（原因となる）。", "make O のあとは原形（to が入らない）。", "let O のあとも原形。", "have O のあとも原形。"],
        "cause O to do／make O 原形",
        [["形", "O のあとに {{to overflow}}。"], ["動詞", "to をとるのは {{cause}}。make・let・have は原形。"]]),
    ],
    "text",
  ),
  S(
    2,
    "gram-b",
    G("bunshi"),
    "文法・語彙（2）",
    GLEAD,
    undefined,
    GBODY,
    10,
    [
      ch("wish", 2, G("kateiho"), "I wish I (　) how to swim when I was a child.", ["had learned", "learned", "have learned", "would learn"], 0,
        ["正解。過去の事実に反する願望は I wish＋過去完了。", "過去形は「今」の事実に反する願望。when I was a child と合わない。", "現在完了は wish のあとに使わない。", "would learn は未来への願望で、子どものころの話に合わない。"],
        "I wish＋過去完了＝あのとき～だったら",
        [["時", "{{when I was a child}}＝過去。"], ["形", "過去の反対の願望＝{{had learned}}。"]]),
      ch("haverepaired", 2, G("bunshi"), "I had my bike (　) yesterday.", ["repaired", "repair", "repairing", "to repair"], 0,
        ["正解。have O p.p.＝Oを～してもらう。自転車は直される側。", "have O 原形は O が人で動作をするとき。", "have O ～ing は「Oに～させておく」。", "have O のあとに to は入らない。"],
        "have O 過去分詞＝Oを～してもらう",
        [["関係", "自転車は {{直される}} 側。"], ["形", "have O {{過去分詞}}＝repaired。"]]),
      ch("seen", 2, G("bunshikobun"), "(　) from the hill, the city looks beautiful.", ["Seen", "Seeing", "To see", "Having seen"], 0,
        ["正解。主語 the city は「見られる」側 → 受け身の分詞構文。", "Seeing だと町が「見る」ことになる。", "To see は目的・条件の意味で、主語の町と合わない。", "Having seen も町が見る側になる。"],
        "分詞構文の主語と能動・受動",
        [["主語", "{{the city}} は見られる側。"], ["形", "受け身の分詞構文＝{{Seen}}。"]]),
      ch("usedto", 1, G("domeishi"), "He is used to (　) up early.", ["getting", "get", "got", "be got"], 0,
        ["正解。be used to ～ing＝～に慣れている（to は前置詞）。", "used to 原形は「以前は～した」で、be がつくと形が合わない。", "過去形は置けない。", "be got は形として不自然。"],
        "be used to ～ing＝～に慣れている",
        [["形", "{{be used to}} の to は前置詞。"], ["後ろ", "前置詞のあとは {{動名詞}}＝getting。"]]),
      ch("much", 1, G("hikaku"), "This book is (　) more interesting than that one.", ["much", "very", "so", "too"], 0,
        ["正解。比較級を強めるのは much・far・even など。", "very は比較級を強めない。", "so は比較級を強めない。", "too は比較級を強めない。"],
        "比較級の強調は much・far・even",
        [["形", "{{more interesting than}}＝比較級。"], ["強調", "{{much}} を使う（very は不可）。"]]),
      ch("aslong", 2, G("setsuzokushi"), "I'll lend you the money (　) you promise to pay it back by Monday.", ["as long as", "unless", "so that", "even if"], 0,
        ["正解。as long as ～＝～しさえすれば（条件）。", "unless では「約束しないなら貸す」になり逆。", "so that は目的。", "even if（たとえ～でも）では条件にならない。"],
        "as long as＝～という条件で",
        [["意味", "返すと約束する {{ならば}} 貸す。"], ["接続詞", "条件＝{{as long as}}。"]]),
      ch("what", 2, G("kandai"), "(　) surprised me most was his calm attitude.", ["What", "That", "Which", "It"], 0,
        ["正解。what＝～すること・もの（先行詞をふくむ関係代名詞）。What … most が主語。", "That では主語の節に surprised の主語が欠けたまま。", "Which は先行詞が必要。", "It では文が2つの動詞を持ち成り立たない。"],
        "what＝the thing(s) which",
        [["構造", "{{___ surprised me most}} が主語、was が動詞。"], ["関係詞", "先行詞なしで主語になる＝{{What}}。"]]),
      ch("canthave", 2, G("jodoshi"), "You (　) have seen Ken at the party; he was in London then.", ["can't", "must", "should", "need"], 0,
        ["正解。can't have p.p.＝～したはずがない。ロンドンにいたので見たはずがない。", "must have p.p. は「～したにちがいない」で逆。", "should have p.p. は「～すべきだった」。", "need have p.p. は否定で使い、ここでは合わない。"],
        "can't have p.p.＝～したはずがない",
        [["根拠", "{{he was in London then}}。"], ["推量", "見たはずがない＝{{can't have seen}}。"]]),
      ch("make-mistakes", 1, JUKU, "Everyone (　) mistakes when learning a new language.", ["makes", "does", "gives", "takes"], 0,
        ["正解。make a mistake＝まちがえる。", "do a mistake とは言わない。", "give a mistake とは言わない。", "take a mistake とは言わない。"],
        "make a mistake＝まちがえる",
        [["名詞", "{{mistakes}} と結びつく動詞。"], ["連語", "{{make}} a mistake。"]]),
      ch("takeeffect", 2, JUKU, "The new rule will (　) effect next April.", ["take", "make", "give", "bring"], 0,
        ["正解。take effect＝（法律・規則が）効力を発する。", "make effect とは言わない。", "give effect は「実施する」の意味で目的語の形がちがう。", "bring effect とは言わない（bring into effect O の形）。"],
        "take effect＝実施される",
        [["主語", "{{The new rule}}（規則）。"], ["熟語", "効力を持つ＝{{take effect}}。"]]),
      er("err-although", 2, G("setsuzokushi"), `${ERR}①Although it was raining heavily, ②but we ③went out ④for a walk.`, ["① Although", "② but", "③ went out", "④ for a walk"], 1,
        ["Although で始めるのは正しい。", "正解。Although と but を同時に使わない。but を取る。", "went out で正しい。", "go out for a walk＝散歩に出る。"],
        "although と but は重ねない",
        [["接続詞", "{{Although}} ～, S V. でひとつの文。"], ["誤り", "{{but}} が重なっている。"]]),
      er("err-furniture", 2, G("meishi"), `${ERR}There ①is a lot of ②furnitures in the room, and ③most of it ④is old.`, ["① is", "② furnitures", "③ most of it", "④ is old"], 1,
        ["数えられない名詞を受けるので is でよい。", "正解。furniture は数えられない名詞で、複数形にしない。", "furniture を it で受けるのは正しい。", "most of it（単数）を受けるので is でよい。"],
        "furniture は不可算名詞",
        [["名詞", "{{furniture}}・information・advice は数えられない。"], ["形", "複数形 -s はつけない。"]]),
      ch("hightime", 3, G("kateiho"), "It's high time you (　) to bed.", ["went", "go", "will go", "have gone"], 0,
        ["正解。It is (high) time S＋過去形＝もう～してもよいころだ。", "現在形は標準の形ではない。", "will は使わない。", "現在完了は使わない。"],
        "It's time S 過去形＝もう～する時間だ",
        [["形", "{{It's high time}} のあとの節は過去形。"], ["当てはめ", "go → {{went}}。"]]),
    ],
    "text",
  ),
  S(
    2,
    "gram-c",
    G("domeishi"),
    "文法・語彙（3）",
    GLEAD,
    undefined,
    GBODY,
    10,
    [
      ch("hadi", 3, G("kateiho"), "(　) I known the truth, I would have told you.", ["Had", "If", "Were", "Should"], 0,
        ["正解。If I had known の if を省いた倒置＝Had I known。", "If なら If I had known と had が必要。", "Were I known は意味をなさない。", "Should I known という形はない。"],
        "If S had p.p. → Had S p.p.",
        [["主節", "{{would have told}}＝仮定法過去完了。"], ["倒置", "{{Had I known}} the truth。"]]),
      ch("seento", 2, G("judo"), "She was seen (　) the building at midnight.", ["to enter", "enter", "entered", "entering to"], 0,
        ["正解。see O 原形 の受け身は be seen to do。", "受け身では to が必要。", "過去分詞では意味が合わない。", "entering なら to は不要（was seen entering）。"],
        "知覚動詞の受け身は be seen to do",
        [["能動", "They saw her {{enter}} the building."], ["受け身", "She was seen {{to enter}} …。"]]),
      ch("mindmy", 2, G("domeishi"), "Would you mind my (　) the window?", ["opening", "open", "to open", "opened"], 0,
        ["正解。mind のあとは動名詞。my は動名詞の意味上の主語。", "原形は置けない。", "mind は to 不定詞をとらない。", "過去分詞は置けない。"],
        "mind ～ing・意味上の主語は所有格",
        [["動詞", "{{mind}} は動名詞をとる。"], ["意味上の主語", "{{my}} opening＝私が開けること。"]]),
      ch("bestever", 1, G("kandai"), "This is the best movie (　) I have ever seen.", ["that", "what", "where", "whose"], 0,
        ["正解。最上級のついた先行詞には that がよく使われる。seen の目的語が欠けている。", "what は先行詞をとらない。", "where は後ろが完全な文のとき。", "whose のあとは名詞が必要。"],
        "最上級の先行詞 → that",
        [["先行詞", "{{the best movie}}（最上級）。"], ["後ろ", "seen の目的語が欠けている → {{that}}。"]]),
      ch("without", 2, G("zenchishi"), "There is no rule (　) exceptions.", ["without", "except", "besides", "beyond"], 0,
        ["正解。no ～ without …＝…のない～はない（例外のない規則はない）。", "except は「～を除いて」で意味が通らない。", "besides は「～に加えて」。", "beyond は「～をこえて」。"],
        "no A without B＝BのないAはない",
        [["形", "{{no rule}} ＋ ___ exceptions。"], ["意味", "例外の {{ない}} 規則はない＝without。"]]),
      ch("sothat", 1, G("setsuzokushi"), "He was (　) tired that he couldn't walk any farther.", ["so", "such", "too", "very"], 0,
        ["正解。so＋形容詞＋that ～＝とても…なので～。", "such のあとは（a）形容詞＋名詞。", "too は that 節でなく to 不定詞と使う。", "very は that 節と組み合わない。"],
        "so 形容詞 that ～",
        [["後ろ", "{{tired}}（形容詞だけ）＋{{that}}。"], ["形", "{{so}} tired that ～。"]]),
      ch("kept", 1, G("domeishi"), "The baby kept (　) all night.", ["crying", "to cry", "cried", "cry"], 0,
        ["正解。keep ～ing＝～し続ける。", "keep は to 不定詞をとらない。", "過去形は置けない。", "原形は置けない。"],
        "keep ～ing＝～し続ける",
        [["動詞", "{{keep}} は動名詞をとる。"], ["形", "kept {{crying}}。"]]),
      ch("notlong", 2, G("setsuzokushi"), "It was not long (　) the rain stopped.", ["before", "after", "since", "until"], 0,
        ["正解。It is not long before ～＝まもなく～する。", "after では「止んだあと長くなかった」で意味をなさない。", "since は「～以来」。", "until は「～まで」で慣用表現にならない。"],
        "It is not long before ～＝まもなく～",
        [["慣用表現", "{{It was not long before}} ～。"], ["意味", "まもなく雨が止んだ。"]]),
      ch("consist", 1, G("zenchishi"), "Water consists (　) hydrogen and oxygen.", ["of", "in", "from", "with"], 0,
        ["正解。consist of ～＝～から成る。", "consist in ～ は「～にある（本質）」で意味がちがう。", "consist from とは言わない。", "consist with は「一致する」の古い言い方。"],
        "consist of＝be made up of",
        [["意味", "水は水素と酸素 {{から成る}}。"], ["前置詞", "consist {{of}}。"]]),
      ch("putup", 1, JUKU, "I can't (　) up with his rude behavior any longer.", ["put", "keep", "catch", "come"], 0,
        ["正解。put up with ～＝～をがまんする。", "keep up with は「～に遅れずについていく」。", "catch up with は「～に追いつく」。", "come up with は「～を思いつく」。"],
        "put up with＝stand・bear",
        [["文脈", "失礼なふるまいを {{もう～できない}}。"], ["熟語", "がまんする＝{{put up with}}。"]]),
      ch("favor", 1, JUKU, "Could you (　) me a favor?", ["do", "make", "give", "take"], 0,
        ["正解。do 人 a favor＝人の頼みを聞く。", "make a favor とは言わない。", "give a favor とは言わない。", "take a favor とは言わない。"],
        "do 人 a favor＝頼みを聞く",
        [["名詞", "{{a favor}}（親切な行い）。"], ["連語", "{{do}} me a favor。"]]),
      er("err-beautiful", 2, G("keiyoshi"), `${ERR}The scenery ①was so ②beautifully that we ③stopped the car to ④take pictures.`, ["① was", "② beautifully", "③ stopped", "④ take"], 1,
        ["主語 The scenery は単数で was でよい。", "正解。be 動詞の補語は形容詞 → beautiful にする。", "stopped the car で正しい。", "to take pictures（目的）で正しい。"],
        "補語は形容詞（副詞は補語にならない）",
        [["構造", "The scenery {{was}} so ___ → 補語。"], ["品詞", "副詞 beautifully → 形容詞 {{beautiful}}。"]]),
      er("err-will", 2, G("jisei"), `${ERR}If I ①will have time tomorrow, I ②will ③help you ④with your homework.`, ["① will have", "② will", "③ help", "④ with"], 0,
        ["正解。条件の副詞節では未来のことも現在形 → If I have time。", "主節は未来なので will でよい。", "will のあとの原形で正しい。", "help 人 with ～＝人の～を手伝う。"],
        "条件・時の副詞節は未来でも現在形",
        [["節", "{{If}} ～ tomorrow＝条件の副詞節。"], ["時制", "will have → {{have}}。"]]),
    ],
    "text",
  ),
];

// =====================================================================
// 第3問　語句整序
// =====================================================================

const OBODY = "各問いは独立している。文頭に来る語も、与えられた語句のとおりに書いてある。";

const T3: ExamPoolSection[] = [
  S(
    3,
    "order-a",
    G("futeishi"),
    "語句整序（1）",
    OLEAD,
    undefined,
    OBODY,
    5,
    [
      od("o-idea", 2, G("bunkei"), "「この本を読めば、その国の歴史がよくわかるだろう。」", ["This book", "will", "give", "you", "a good idea", "of", "the country's history"],
        "無生物主語＋give 人 a good idea of ～",
        [["発想", "「この本があなたに考えを与える」と無生物を主語にする。"], ["形", "{{give 人 a good idea of ～}}＝～がよくわかる。"]]),
      od("o-howto", 1, G("futeishi"), "「彼女は私に、駅までの行き方を教えてくれた。」", ["She", "told", "me", "how", "to get", "to", "the station"],
        "how to do＝～のしかた",
        [["文型", "{{tell 人 ～}}（SVOO）。"], ["目的語", "行き方＝{{how to get to}} the station。"]]),
      od("o-asas", 2, G("hikaku"), "「その問題は思っていたほど難しくなかった。」", ["The problem", "was not", "as difficult", "as", "I had expected"],
        "not as ～ as …＝…ほど～でない",
        [["比較", "{{not as difficult as}} ～。"], ["時制", "思っていた（それより前）＝{{had expected}}。"]]),
      od("o-nomatter", 2, G("setsuzokushi"), "「彼が何と言おうと、私の決心は変わらない。」", ["No matter", "what", "he says,", "I", "will not", "change", "my mind"],
        "no matter what＝何を～しても",
        [["譲歩", "{{No matter what}} he says,（＝Whatever he says）。"], ["主節", "決心を変えない＝{{will not change my mind}}。"]]),
      od("o-with", 2, G("bunshikobun"), "「窓を開けたまま寝てはいけない。」", ["Don't", "go to sleep", "with", "the window", "open"],
        "with O C＝OをCにしたまま",
        [["付帯状況", "{{with}}＋O＋C。"], ["当てはめ", "with {{the window open}}（open は形容詞）。"]]),
      od("o-person", 2, G("kandai"), "「彼こそ、私がずっと会いたいと思っていた人だった。」", ["He", "was", "the person", "I", "had", "long wanted", "to meet"],
        "目的格の関係代名詞の省略",
        [["骨組み", "He was {{the person}}。"], ["修飾", "（whom）{{I had long wanted to meet}}。"]]),
      od("o-glad", 1, G("futeishi"), "「その知らせを聞いて、彼女はとても喜んだ。」", ["She", "was", "very", "glad", "to hear", "the news"],
        "感情の原因の to 不定詞",
        [["骨組み", "She was very {{glad}}。"], ["原因", "～して＝{{to hear}} the news。"]]),
      od("o-earlier", 3, G("kateiho"), "「もっと早く起きていれば、電車に間に合ったのに。」", ["If", "I", "had", "gotten up", "earlier,", "I could have", "caught the train"],
        "仮定法過去完了 If S had p.p., S could have p.p.",
        [["条件", "過去の反対＝{{If I had gotten up earlier}}。"], ["主節", "間に合ったのに＝{{could have caught}}。"]]),
    ],
    "text",
  ),
  S(
    3,
    "order-b",
    G("futeishi"),
    "語句整序（2）",
    OLEAD,
    undefined,
    OBODY,
    5,
    [
      od("o-toohot", 2, G("futeishi"), "「この部屋は暑すぎて勉強できない。」", ["This room", "is", "too", "hot", "to", "study in"],
        "too ～ to do（文末の前置詞に注意）",
        [["構文", "{{too hot to}} do。"], ["前置詞", "study in this room の this room が主語になったので {{study in}} で終わる。"]]),
      od("o-piano", 2, G("kanryo"), "「彼女は3年前からピアノを習っている。」", ["She", "has been", "taking", "piano lessons", "for", "three years"],
        "現在完了進行形＋for 期間",
        [["時制", "今も続いている＝{{has been taking}}。"], ["期間", "3年前から＝{{for three years}}。"]]),
      od("o-nobody", 1, G("bunkei"), "「何が起きたのか、だれにもわからなかった。」", ["Nobody", "knew", "what", "had", "happened"],
        "間接疑問（what が主語の疑問文）",
        [["主語", "だれも～ない＝{{Nobody}} knew。"], ["目的語", "{{what had happened}}（what が主語なので語順はそのまま）。"]]),
      od("o-few", 2, G("keiyoshi"), "「その計画に反対する人はほとんどいなかった。」", ["Few", "people", "were", "against", "the plan"],
        "few＝ほとんどない（否定）",
        [["否定の主語", "ほとんどいない＝{{Few people}}。"], ["前置詞", "～に反対＝{{against}}。"]]),
      od("o-had", 2, G("futeishi"), "「私は彼に車を洗ってもらった。」", ["I", "had", "him", "wash", "my car"],
        "have 人 原形＝人に～してもらう",
        [["使役", "{{have}} 人 原形。"], ["当てはめ", "had {{him wash}} my car。"]]),
      od("o-nothing", 2, G("hikaku"), "「健康ほど大切なものはない。」", ["Nothing", "is", "more", "important", "than", "health"],
        "Nothing is 比較級 than ～＝～ほど…はない",
        [["否定の主語", "{{Nothing}} is …。"], ["比較", "{{more important than}} health。"]]),
      od("o-feeling", 3, G("bunshikobun"), "「疲れていたので、彼は早く寝た。」", ["Feeling", "tired,", "he", "went", "to bed", "early"],
        "理由を表す分詞構文",
        [["分詞構文", "疲れていたので＝{{Feeling tired}},。"], ["主節", "{{he went to bed early}}。"]]),
      od("o-dangerous", 1, G("futeishi"), "「その川で泳ぐのは危険だ。」", ["It", "is", "dangerous", "to swim", "in", "the river"],
        "形式主語 It … to do",
        [["形式主語", "{{It is dangerous}}。"], ["真主語", "{{to swim in the river}}。"]]),
    ],
    "text",
  ),
  S(
    3,
    "order-c",
    G("hikaku"),
    "語句整序（3）",
    OLEAD,
    undefined,
    OBODY,
    5,
    [
      od("o-kindest", 1, G("hikaku"), "「彼女は私が今まで会った中でいちばん親切な人だ。」", ["She", "is", "the kindest", "person", "I", "have ever", "met"],
        "最上級＋（that）S have ever p.p.",
        [["最上級", "{{the kindest person}}。"], ["修飾", "今まで会った＝{{I have ever met}}。"]]),
      od("o-putoff", 2, G("judo"), "「雨のせいで試合は延期された。」", ["The game", "was", "put off", "because of", "the rain"],
        "群動詞の受け身 be put off",
        [["受け身", "延期された＝{{was put off}}。"], ["理由", "名詞の前は {{because of}}。"]]),
      od("o-everytime", 2, G("setsuzokushi"), "「その映画を見るたびに、私は泣いてしまう。」", ["Every time", "I see", "the movie,", "I", "end up", "crying"],
        "every time S V＝～するたびに",
        [["接続詞", "{{Every time}} I see the movie,。"], ["主節", "結局～してしまう＝{{end up crying}}。"]]),
      od("o-soas", 2, G("futeishi"), "「彼は医者になるために一生懸命勉強した。」", ["He", "studied", "hard", "so as", "to", "become", "a doctor"],
        "so as to do＝～するために",
        [["骨組み", "{{He studied hard}}。"], ["目的", "{{so as to become}} a doctor。"]]),
      od("o-since", 3, G("kanryo"), "「この町に来てから5年になる。」", ["Five years", "have", "passed", "since", "I", "came to", "this town"],
        "期間 have passed since S 過去形",
        [["主語", "{{Five years}} を主語にする。"], ["形", "{{have passed since}} I came …（since のあとは過去形）。"]]),
      od("o-whatwant", 2, G("kandai"), "「私が言いたいのは、時間を大切にすべきだということだ。」", ["What", "I", "want to say", "is", "that", "we", "should value time"],
        "What S V is that ～＝SがVするのは～ということ",
        [["主語", "{{What I want to say}}（what の名詞節）。"], ["補語", "is {{that we should value time}}。"]]),
      od("o-forme", 2, G("futeishi"), "「その箱は重すぎて私には運べなかった。」", ["The box", "was", "too heavy", "for", "me", "to carry"],
        "too ～ for 人 to do",
        [["構文", "{{too heavy to carry}}。"], ["意味上の主語", "to の前に {{for me}}。"]]),
      od("o-whether", 3, G("setsuzokushi"), "「彼女が来るかどうかは、天気しだいだ。」", ["Whether", "she", "comes", "or not", "depends", "on", "the weather"],
        "Whether ～ or not が主語の名詞節",
        [["主語", "{{Whether she comes or not}}（名詞節・単数）。"], ["動詞", "～しだい＝{{depends on}}。"]]),
    ],
    "text",
  ),
];

// =====================================================================
// 第4問　長文読解（社会）
// =====================================================================

const T4: ExamPoolSection[] = [
  S(
    4,
    "remote",
    CHOBUN,
    "在宅勤務と都市",
    READ,
    "Working from Anywhere",
    `For most of the twentieth century, the question of where to live was closely tied to the question of where to work. People moved to large cities because that was where the jobs were, and they accepted long commutes, small apartments, and high rents as the price of a career. In recent years, however, this connection has begun to ( 1 ). Thanks to fast internet connections and online meeting tools, a growing number of office workers can now do their jobs from home, at least for part of the week.

At first glance, this seems like good news for everyone. Workers save the time and money they used to spend on commuting, and many say they can concentrate better without the noise of a busy office. Companies, for their part, may be able to (A) cut down on the cost of renting large office spaces. Some small towns have even begun to advertise themselves to remote workers, offering cheap housing and a quieter life in the hope of attracting new residents.

Yet the picture is more complicated than it first appears. One concern is that remote work is not available to everyone. Nurses, shop assistants, bus drivers, and factory workers cannot do their jobs through a computer screen. If only certain kinds of workers are able to choose where they live, the gap between different groups in society may grow ( 2 ).

Another concern has to do with learning. Much of what people know about their jobs is never written down in a manual. Young employees often pick up skills simply by watching experienced colleagues, overhearing how they deal with problems, or asking a quick question at the next desk. (B) This kind of informal learning is difficult to reproduce online, where conversations usually have to be scheduled in advance. Some managers worry that new workers who rarely visit the office may develop more slowly as a result.

There are also effects on cities themselves. When fewer people travel to city centers each day, the restaurants, cafés, and shops that depend on office workers may lose customers. On the other hand, the neighborhoods where people live may become livelier, as residents spend more of their time and money close to home. In this sense, remote work does not simply reduce economic activity; it ( 3 ) it from one place to another.

Because of these mixed effects, many organizations have settled on a hybrid model, in which employees work from home on some days and come to the office on others. Supporters argue that this arrangement combines the best of both worlds: the freedom of remote work and the personal contact of the office. Critics reply that it can also combine the worst, if workers end up commuting on crowded days only to spend their time in online meetings.

What seems clear is that the office will not disappear, but its role is changing. Rather than being a place where people go simply because they must, it may become a place where people go for things that are hard to do alone: meeting new colleagues, solving problems together, and building trust.`,
    8,
    [
      ch("b1", 2, CHOBUN, "空所( 1 )に入る最も適切なものを選べ。", ["weaken", "strengthen", "appear", "continue"], 0,
        ["正解。however で前の「住む場所と働く場所の強い結びつき」と逆になる。在宅で働ける＝結びつきが弱まる。", "however があるので、結びつきが「強まる」は流れと逆。", "結びつきはすでにあったので「現れる」は合わない。", "however のあとで「続く」では対比にならない。"],
        "however の前後で向きが変わる",
        [["前", "住む場所は働く場所と {{closely tied}}（強く結びついていた）。"], ["後", "{{however}} → 在宅勤務で結びつきが {{weaken}}。"]]),
      ch("b2", 1, CHOBUN, "空所( 2 )に入る最も適切なものを選べ。", ["wider", "smaller", "closer", "weaker"], 0,
        ["正解。一部の人だけが住む場所を選べる → 格差（gap）が「広がる」。", "格差が縮まるのでは「懸念」にならない。", "gap が closer になるという言い方は意味が通らない。", "gap が weaker は不自然な言い方。"],
        "gap は grow wider（広がる）",
        [["段落の話題", "{{One concern}}＝心配ごと。"], ["連語", "格差が広がる＝the gap {{grows wider}}。"]]),
      ch("b3", 2, CHOBUN, "空所( 3 )に入る最も適切なものを選べ。", ["shifts", "stops", "doubles", "hides"], 0,
        ["正解。from one place to another と組み、都心から住宅地へ経済活動を「移す」。", "not simply reduce と言っているので「止める」は合わない。", "「倍にする」は from one place to another と合わない。", "「隠す」は意味が通らない。"],
        "from A to B と組む動詞を選ぶ",
        [["前の文", "都心の店は客が減り、{{住宅地はにぎやかに}}なる。"], ["空所", "活動を {{from one place to another}} へ＝{{shifts}}。"]]),
      ch("ul-a", 1, JUKU, "下線部(A) cut down on に最も近い意味のものを選べ。", ["reduce", "increase", "explain", "compare"], 0,
        ["正解。cut down on ～＝～を減らす。", "逆の意味。", "「説明する」ではない。", "「比べる」ではない。"],
        "cut down on＝reduce",
        [["熟語", "{{cut down on}} ～＝～を減らす。"], ["文脈", "大きな事務所の賃料を {{減らせる}}＝会社の利点。"]]),
      ch("ul-b", 2, CHOBUN, "下線部(B) This kind of informal learning が指す内容として最も適切なものを選べ。", ["learning skills by watching and talking with colleagues nearby", "learning from manuals written by the company", "taking online courses that are scheduled in advance", "studying for qualifications at home on weekends"], 0,
        ["正解。直前の文の「先輩を見る・やりとりを耳にする・となりの席でたずねる」をまとめている。", "前の文に never written down in a manual とあり、マニュアルではない。", "オンラインでは再現しにくい、と言っている側の話で逆。", "週末の資格の勉強は本文に出てこない。"],
        "This kind of ～ は直前の文をまとめる",
        [["直前の文", "{{watching experienced colleagues}}・{{overhearing}}・{{asking a quick question}}。"], ["まとめ", "近くの同僚から自然に学ぶこと。"]]),
      ch("town", 1, CHOBUN, "第2段落によると、小さな町が在宅勤務の人に宣伝しているのはなぜか。", ["They hope to attract new residents.", "They want to build large offices.", "They need more factory workers.", "They plan to raise housing prices."], 0,
        ["正解。in the hope of attracting new residents。", "大きな事務所を建てるとは書いていない。", "工場の働き手を求めるとは書いていない。", "cheap housing（安い住まい）を売りにしており、値上げではない。"],
        "in the hope of ～ing＝～を期待して",
        [["根拠", "{{in the hope of attracting new residents}}。"], ["確認", "{{cheap housing}} から、値上げの選択肢は誤り。"]]),
      ch("concern", 2, CHOBUN, "第3段落で述べられている懸念として最も適切なものを選べ。", ["Some jobs cannot be done through a computer.", "Remote workers earn less than other workers.", "Nurses prefer to work from home.", "Internet connections are too slow in cities."], 0,
        ["正解。看護師や運転手などは画面ごしに仕事ができない → 在宅勤務はすべての人のものではない。", "収入の比較は書かれていない。", "看護師は在宅でできない仕事の例。", "通信の速さは第1段落で利点として出てくるだけ。"],
        "具体例（看護師・運転手）が何の例かを考える",
        [["段落の頭", "{{remote work is not available to everyone}}。"], ["例", "看護師・店員・運転手＝{{画面ごしにできない仕事}}。"]]),
      ch("managers", 2, CHOBUN, "第4段落で、一部の管理職が心配していることは何か。", ["New workers may not develop their skills as quickly.", "Experienced workers will stop writing manuals.", "Employees will ask too many questions.", "Online meetings will become too short."], 0,
        ["正解。new workers who rarely visit the office may develop more slowly。", "マニュアルを書くのをやめるとは書いていない。", "質問が多すぎるという心配ではない。", "会議の長さは書かれていない。"],
        "段落の最後の文に心配の中身がある",
        [["根拠", "Some managers worry that new workers … {{may develop more slowly}}。"], ["言いかえ", "develop more slowly ＝ not develop as quickly。"]]),
      ch("cities", 2, CHOBUN, "第5段落の内容に合うものを選べ。", ["Residential areas may become more active.", "City centers will gain many new customers.", "All shops in cities will close.", "People will spend less money overall."], 0,
        ["正解。the neighborhoods where people live may become livelier。", "都心の店は客を失うかもしれない（may lose customers）と逆。", "all（すべて）とは書いていない。", "not simply reduce economic activity とあり、全体で減るとは言っていない。"],
        "livelier＝more active",
        [["根拠", "neighborhoods where people live may become {{livelier}}。"], ["注意", "{{not simply reduce}} → 全体で減るとは言っていない。"]]),
      ch("hybrid", 2, CHOBUN, "第6段落で、ハイブリッド型を批判する人が言っていることとして最も適切なものを選べ。", ["Workers may commute to the office only to attend online meetings.", "Hybrid work gives employees too much freedom.", "Offices will become too quiet to work in.", "Employees will refuse to work at home."], 0,
        ["正解。commuting on crowded days only to spend their time in online meetings。", "自由すぎるという批判ではない。", "事務所が静かすぎるとは書いていない。", "在宅勤務をこばむとは書いていない。"],
        "only to do＝結局～するだけ",
        [["根拠", "commuting … {{only to spend their time in online meetings}}。"], ["意味", "混んだ日に通勤したのに、結局オンライン会議だけ＝{{the worst}}。"]]),
      ch("match", 3, CHOBUN, "本文の内容に合うものを選べ。", ["The author expects offices to remain but to serve different purposes.", "The author believes offices will soon disappear completely.", "The author argues that remote work only reduces economic activity.", "The author thinks informal learning is easy to reproduce online."], 0,
        ["正解。最終段落 the office will not disappear, but its role is changing。", "will not disappear と逆。", "第5段落で not simply reduce と否定している。", "第4段落で difficult to reproduce online と逆。"],
        "最終段落の not A but B に筆者の考え",
        [["最終段落", "the office {{will not disappear}}, but {{its role is changing}}。"], ["ほかの選択肢", "第4・5段落の否定の表現と照らす。"]]),
      ch("title", 2, CHOBUN, "本文の表題として最も適切なものを選べ。", ["How Remote Work Is Changing Workplaces and Cities", "The History of the Internet", "Why Small Towns Are Disappearing", "How to Become a Good Manager"], 0,
        ["正解。在宅勤務が働き方・学び方・都市・事務所の役割にあたえる影響を論じている。", "インターネットの歴史は主題ではない。", "小さな町は例の1つで、消えている話でもない。", "管理職は心配する人として出るだけ。"],
        "例ではなく、全体の話題を表す題を",
        [["くり返される語", "{{remote work}}・{{office}}・{{cities}}。"], ["結論", "事務所の役割が変わる＝働く場と都市の変化。"]]),
    ],
  ),
  S(
    4,
    "foodwaste",
    CHOBUN,
    "形の悪い野菜と食品ロス",
    READ,
    "Imperfect Vegetables",
    `Every year, a surprisingly large share of the food produced around the world is never eaten. Some of it is thrown away by households that buy more than they need, and some of it spoils during transport. But a considerable amount is lost before it even reaches a store, for a simple reason: it does not look right. A carrot with two legs, an apple with a small mark on its skin, or a cucumber that is too curved may be perfectly safe and tasty, yet it is often (A) rejected because it does not meet the standards that stores set for size and shape.

These standards did not appear by accident. Supermarkets have long believed that customers prefer fruit and vegetables that look uniform, and that a shelf of identical tomatoes sells better than a shelf of irregular ones. Uniform products are also easier to pack, transport, and price. From the stores' point of view, then, strict standards make business ( 1 ).

The cost of this system, however, is paid by others. Farmers must either sell imperfect produce at a very low price, use it as animal feed, or simply leave it in the field. All the water, energy, and labor used to grow that food is wasted as well. As awareness of these problems has grown, a number of businesses have begun to ask whether the standards are really necessary.

One response has been to sell "ugly" produce at a discount. Some stores have created special sections for oddly shaped vegetables, while online services deliver boxes of them directly to customers' homes. The results have been encouraging. Many shoppers, it turns out, are ( 2 ) to buy a crooked carrot if it is cheaper and they understand that it is just as good. Restaurants and food factories, which cut vegetables into pieces anyway, have also shown interest.

Not everyone is convinced, though. Some farmers worry that if imperfect produce becomes popular at low prices, customers will begin to expect lower prices for all vegetables, including the perfect-looking ones. 【 X 】. In that case, a solution to one problem could create (B) another.

There is also a limit to what selling imperfect produce can achieve. In many wealthy countries, the largest single source of food waste is not the farm or the store but the home. People buy food on impulse, forget what is in the refrigerator, and throw away items as soon as the date on the package has passed, even when the food is still safe to eat. Changing these habits may be harder than changing the appearance of a supermarket shelf, because it requires millions of small decisions in millions of kitchens.

Still, the debate over ugly vegetables has had a valuable effect: it has made people think about where their food comes from and what is lost along the way. In the end, reducing food waste will depend not on one clever idea but on changes ( 3 ) every stage, from the field to the dinner table.`,
    8,
    [
      ch("b1", 1, CHOBUN, "空所( 1 )に入る最も適切なものを選べ。", ["simpler", "harder", "slower", "riskier"], 0,
        ["正解。そろった商品は売れやすく、詰める・運ぶ・値をつけるのも楽 → 商売が「簡単に」なる。", "利点を並べたあとの then（それなら）で「難しく」は逆。", "運びやすいので「遅く」は逆。", "売れやすいので「危険に」は逆。"],
        "then の前の利点をまとめる語",
        [["前の文", "{{sells better}}・{{easier to pack, transport, and price}}。"], ["まとめ", "店から見ると商売が {{simpler}} になる。"]]),
      ch("b2", 1, CHOBUN, "空所( 2 )に入る最も適切なものを選べ。", ["willing", "unable", "afraid", "forbidden"], 0,
        ["正解。be willing to do＝進んで～する。結果は encouraging（心強い）だった。", "「買えない」では encouraging と合わない。", "「こわがる」では encouraging と合わない。", "「禁じられている」は意味が通らない。"],
        "be willing to do＝いとわず～する",
        [["前の文", "The results have been {{encouraging}}。"], ["空所", "安ければ買う気がある＝{{willing}} to buy。"]]),
      ch("b3", 2, G("zenchishi"), "空所( 3 )に入る最も適切なものを選べ。", ["at", "on", "by", "for"], 0,
        ["正解。at every stage＝あらゆる段階で。", "on every stage は「舞台の上で」の意味になり合わない。", "by every stage は意味が通らない。", "for every stage では「各段階のための」になり文意がずれる。"],
        "at every stage＝あらゆる段階で",
        [["名詞", "{{stage}}（段階）。"], ["前置詞", "段階の一点を表す {{at}}。"]]),
      ch("ul-a", 1, JUKU, "下線部(A) rejected に最も近い意味のものを選べ。", ["turned down", "picked up", "looked after", "set up"], 0,
        ["正解。turn down＝断る・はねつける。", "「拾い上げる」は逆。", "「世話をする」ではない。", "「設立する」ではない。"],
        "reject＝turn down",
        [["文脈", "基準に {{合わない}} ので → 受け入れられない。"], ["言いかえ", "reject ＝ {{turn down}}。"]]),
      ch("ul-b", 2, CHOBUN, "下線部(B) another が指すものとして最も適切なものを選べ。", ["another problem", "another vegetable", "another store", "another farmer"], 0,
        ["正解。a solution to one problem could create another (problem)。1つの問題の解決が別の問題を生む。", "野菜の話ではなく problem の言いかえ。", "店は出てこない。", "農家の数の話ではない。"],
        "another は前の名詞（problem）を受ける",
        [["文の形", "a solution to one {{problem}} could create {{another}}。"], ["中身", "農家の収入が減るという {{別の問題}}。"]]),
      ch("standards", 2, CHOBUN, "第2段落によると、店が厳しい基準を設けてきたのはなぜか。", ["Uniform products are thought to sell better and are easier to handle.", "Customers asked stores to sell curved cucumbers.", "The law requires all vegetables to be the same size.", "Farmers prefer to grow identical products."], 0,
        ["正解。そろった商品はよく売れると考えられ、詰める・運ぶ・値づけも楽。", "曲がったきゅうりを求めたとは書いていない。", "法律の話はない。", "農家の好みの話ではない。"],
        "理由は2つ（売れる・扱いやすい）",
        [["理由1", "{{sells better}}（よく売れると考えられている）。"], ["理由2", "{{easier to pack, transport, and price}}。"]]),
      ch("farmers", 1, CHOBUN, "第3段落によると、形の悪い農産物はどうなることが多いか。", ["It may be sold cheaply or used to feed animals.", "It is always sold at the same price as perfect produce.", "It is sent to other countries.", "It is used to make packaging."], 0,
        ["正解。sell … at a very low price, use it as animal feed, or simply leave it in the field。", "very low price とあり、同じ値段ではない。", "外国に送るとは書いていない。", "包装に使うとは書いていない。"],
        "either A, B, or C の中身を確かめる",
        [["根拠", "{{at a very low price}}・{{animal feed}}・{{leave it in the field}}。"], ["言いかえ", "animal feed ＝ feed animals。"]]),
      ch("restaurants", 2, CHOBUN, "第4段落で、飲食店や食品工場が関心を示した理由として最も適切なものを選べ。", ["They cut vegetables into pieces, so the shape does not matter.", "They want to sell vegetables online.", "They can grow their own vegetables.", "They prefer vegetables with marks on them."], 0,
        ["正解。which cut vegetables into pieces anyway（どうせ切るので）形は問題にならない。", "ネット販売は別の取り組み。", "自分で育てるとは書いていない。", "傷のある野菜を好むとは書いていない。"],
        "anyway＝どうせ（形は関係ない）",
        [["根拠", "which {{cut vegetables into pieces anyway}}。"], ["推論", "切ってしまうなら {{形は関係ない}}。"]]),
      od("x-order", 3, CHOBUN, "【 X 】には「そうなると、農家が生計を立てるのはさらに難しくなりかねない」という意味の英文が入る。与えられた語句を正しく並べかえよ。", ["This", "could", "make", "it", "harder", "for farmers", "to earn a living"],
        "make it 形容詞 for 人 to do（形式目的語）",
        [["骨組み", "This could {{make it harder}}（it は形式目的語）。"], ["真の目的語", "{{for farmers to earn a living}}。"]]),
      ch("home", 2, CHOBUN, "第6段落によると、多くの豊かな国で食品ロスがいちばん多く生まれる場所はどこか。", ["households", "farms", "supermarkets", "factories"], 0,
        ["正解。the largest single source of food waste is not the farm or the store but the home。", "not the farm と否定されている。", "not … the store と否定されている。", "工場は挙げられていない。"],
        "not A or B but C の C が答え",
        [["構文", "not the farm or the store {{but the home}}。"], ["言いかえ", "home ＝ {{households}}。"]]),
      ch("date", 2, CHOBUN, "第6段落で、家庭での食品ロスの原因として挙げられていないものを選べ。", ["cooking meals that are too spicy", "buying food on impulse", "forgetting what is in the refrigerator", "throwing food away when the date has passed"], 0,
        ["正解。辛すぎる料理の話は本文にない。", "buy food on impulse として挙げられている。", "forget what is in the refrigerator として挙げられている。", "throw away items as soon as the date … has passed として挙げられている。"],
        "「挙げられていない」は本文と1つずつ照らす",
        [["本文の3つ", "{{on impulse}}・{{forget what is in the refrigerator}}・{{the date … has passed}}。"], ["答え", "どれにも当たらないものを選ぶ。"]]),
      ch("match", 3, CHOBUN, "本文の内容に合うものを選べ。", ["The author believes that no single idea can solve food waste.", "The author says ugly vegetables taste better than perfect ones.", "The author argues that stores should stop selling vegetables.", "All farmers support selling imperfect produce cheaply."], 0,
        ["正解。最終文 not on one clever idea but on changes at every stage。", "just as good（同じくらいよい）とあり、よりおいしいとは言っていない。", "野菜の販売をやめるべきとは言っていない。", "第5段落で、心配する農家もいる（Not everyone is convinced）。"],
        "最終文の not A but B",
        [["最終文", "{{not on one clever idea but on changes at every stage}}。"], ["確認", "第4段落 {{just as good}}、第5段落 {{Not everyone is convinced}}。"]]),
      ch("title", 2, CHOBUN, "本文の表題として最も適切なものを選べ。", ["Ugly Vegetables and the Problem of Food Waste", "How to Grow Perfect Carrots", "The Rise of Online Shopping", "Why Supermarkets Are Closing"], 0,
        ["正解。形の悪い野菜を入り口に、食品ロス全体を論じている。", "完ぺきなにんじんの育て方ではない。", "ネット販売は例の1つ。", "スーパーが閉店する話ではない。"],
        "最初と最後の段落の話題を見る",
        [["第1段落", "{{food … never eaten}}（食べられない食品）。"], ["最終段落", "{{reducing food waste}}。"]]),
    ],
  ),
  S(
    4,
    "library",
    CHOBUN,
    "図書館の新しい役割",
    READ,
    "The Changing Library",
    `When people imagine a public library, they usually picture quiet rooms filled with shelves of books, where visitors are asked to speak in whispers. For a long time, that image was accurate. Libraries existed mainly to collect books and lend them to anyone who wanted to read, free of charge. In an age when books were expensive and information was hard to find, this was an extremely valuable service.

Today, however, much of the information people need can be found in seconds on a smartphone. Some people have therefore asked whether public libraries are still necessary. If almost anything can be looked up online, why should a town spend money on buildings full of printed books?

Librarians have answered this question not by defending the old model but by ( 1 ) it. Many libraries now offer far more than books. Visitors can use computers and printers, attend classes on how to apply for jobs online, or join reading groups for children and their parents. Some libraries lend out unusual items such as musical instruments or gardening tools. Others provide rooms where local groups can meet without paying rent.

These changes reflect a broader idea: that a library is not only a storehouse of information but also a public space. In many towns, there are few places where people can spend time indoors without being expected to buy something. Cafés and shopping malls are open to the public, but they are, after all, businesses. A library, by contrast, welcomes students doing homework, older people reading newspapers, and parents with young children, whether or not they spend any money. For people who live alone, (A) a visit to the library may be one of the few chances they have to see others in the community.

The digital age has also given libraries a new task. Because so much information is now available online, the problem is often not finding information but judging whether it can be ( 2 ). Librarians are trained to evaluate sources, and many libraries now hold workshops that teach people how to tell reliable websites from misleading ones. In this sense, the library's original mission of helping people learn has not disappeared; it has simply taken a new form.

Of course, these new roles bring new challenges. Libraries that host classes, events, and noisy activities for children may find it harder to keep quiet areas for those who come to read or study. Budgets are often tight, and staff are asked to do more with less. Some critics also worry that if libraries try to do everything, they may lose sight of (B) what made them special in the first place.

Even so, the history of the library suggests that it is an institution that can adapt. Whether people come for a novel, a computer, or simply a warm place to sit, the library remains one of the few spaces that ( 3 ) to everyone equally.`,
    8,
    [
      ch("b1", 2, CHOBUN, "空所( 1 )に入る最も適切なものを選べ。", ["expanding", "abandoning", "copying", "ignoring"], 0,
        ["正解。not by defending … but by expanding it。次の文「本よりはるかに多くを提供」と合う。", "本の貸し出しをやめたのではなく、それに加えている（far more than books）。", "「まねる」では意味が通らない。", "「無視する」では次の具体例とつながらない。"],
        "not A but B と次の具体例から考える",
        [["次の文", "Many libraries now offer {{far more than books}}。"], ["空所", "古い型を {{広げる}}＝expanding。"]]),
      ch("b2", 1, CHOBUN, "空所( 2 )に入る最も適切なものを選べ。", ["trusted", "lost", "ignored", "printed"], 0,
        ["正解。情報を探すことより、それが「信頼できる」か判断することが問題。次の文の reliable と合う。", "「なくす」では意味が通らない。", "「無視される」では判断の話にならない。", "印刷できるかどうかの話ではない。"],
        "次の文の reliable が手がかり",
        [["次の文", "how to tell {{reliable}} websites from misleading ones。"], ["空所", "信頼できるか＝can be {{trusted}}。"]]),
      ch("b3", 2, CHOBUN, "空所( 3 )に入る最も適切なものを選べ。", ["belongs", "refuses", "costs", "listens"], 0,
        ["正解。belong to everyone equally＝だれのものでもある（全員に開かれている）。", "「拒む」は本文の主張と逆。", "costs to everyone は語法として成り立たず、無料という話とも合わない。", "listens to everyone は場所の説明として不自然。"],
        "belong to ～＝～のものである",
        [["文脈", "お金を使わなくても {{だれでも歓迎}}（第4段落）。"], ["空所", "全員に平等に {{belongs}} to everyone。"]]),
      ch("past", 1, CHOBUN, "第1段落によると、かつての図書館のサービスがとても価値があったのはなぜか。", ["Books were expensive and information was hard to find.", "Libraries sold books at low prices.", "People were not allowed to talk at home.", "Libraries were the only buildings in town."], 0,
        ["正解。In an age when books were expensive and information was hard to find。", "free of charge（無料で）貸していた。売ってはいない。", "家での話はない。", "ほかに建物がなかったとは書いていない。"],
        "In an age when ～＝～の時代には",
        [["根拠", "{{books were expensive}} and {{information was hard to find}}。"], ["確認", "{{free of charge}}＝無料（売っていない）。"]]),
      ch("question", 2, CHOBUN, "第2段落で、図書館はまだ必要かという疑問が出てきた理由は何か。", ["Much information can now be found quickly online.", "Libraries have become too noisy.", "Printed books are no longer produced.", "Librarians have stopped working."], 0,
        ["正解。much of the information … can be found in seconds on a smartphone。", "うるさくなった話は第6段落の課題で、疑問の理由ではない。", "本が作られなくなったとは書いていない。", "司書が働かなくなったとは書いていない。"],
        "therefore の前に理由がある",
        [["根拠", "information … can be found {{in seconds on a smartphone}}。"], ["つながり", "Some people have {{therefore}} asked …"]]),
      ch("items", 1, CHOBUN, "第3段落で、図書館が貸し出すめずらしい物の例として挙げられているものを選べ。", ["musical instruments", "bicycles", "smartphones", "cooking pots"], 0,
        ["正解。such as musical instruments or gardening tools。", "自転車は挙げられていない。", "スマートフォンは第2段落で情報を調べる道具として出るだけ。", "なべは挙げられていない。"],
        "such as ～ のあとに例",
        [["根拠", "unusual items {{such as musical instruments or gardening tools}}。"], ["注意", "smartphone は別の段落の別の話。"]]),
      ch("ul-a", 2, CHOBUN, "下線部(A)の内容として最も適切なものを選べ。", ["Going to the library can be a rare opportunity to meet other local people.", "People who live alone visit the library to borrow many books.", "Visiting the library is the only way to read newspapers.", "People who live alone should not go to the library."], 0,
        ["正解。one of the few chances … to see others in the community＝地域の人と会う数少ない機会。", "本をたくさん借りるという話ではない。", "新聞は例の1つで、唯一の方法とは言っていない。", "行くべきでないとは言っていない。"],
        "one of the few chances＝数少ない機会",
        [["語句", "{{one of the few chances}}＝数少ない機会の1つ。"], ["中身", "{{to see others in the community}}＝地域の人と会う。"]]),
      ch("cafe", 2, CHOBUN, "第4段落で、図書館がカフェやショッピングモールとちがうとされる点は何か。", ["Visitors are not expected to spend money there.", "It is closed to the public.", "It serves better coffee.", "Only students are welcome there."], 0,
        ["正解。カフェやモールは businesses。図書館は whether or not they spend any money 歓迎する。", "public space と言っており、閉ざされていない。", "コーヒーの話はない。", "学生・お年寄り・親子など、だれでも歓迎している。"],
        "by contrast の前後を対比する",
        [["カフェ・モール", "{{they are, after all, businesses}}。"], ["図書館", "{{whether or not they spend any money}} 歓迎。"]]),
      ch("task", 2, CHOBUN, "第5段落によると、デジタル時代に図書館が担う新しい仕事は何か。", ["teaching people how to judge whether information is reliable", "selling e-books to members", "building faster internet networks", "deciding which websites people may visit"], 0,
        ["正解。workshops that teach people how to tell reliable websites from misleading ones。", "電子書籍を売る話はない。", "回線を作る話はない。", "見てよいサイトを決めるのではなく、見分け方を教える。"],
        "tell A from B＝AとBを見分ける",
        [["根拠", "teach people how to {{tell reliable websites from misleading ones}}。"], ["要点", "情報を {{判断する力}} を育てる。"]]),
      ch("ul-b", 3, CHOBUN, "下線部(B) what made them special in the first place の内容として最も適切なものを選べ。", ["their original role as places for reading and learning", "their role as businesses that sell goods", "their large budgets and many staff members", "their noisy events for children"], 0,
        ["正解。in the first place＝そもそも。本を読み学ぶ場であること（第1段落・第5段落の original mission）。", "第4段落で、図書館は business ではないと対比している。", "予算は tight（苦しい）とあり逆。", "にぎやかな行事は新しい役割で、そもそもの特長ではない。"],
        "in the first place＝そもそも・もともと",
        [["語句", "{{in the first place}}＝そもそも。"], ["もとの役割", "第5段落 {{the library's original mission of helping people learn}}。"]]),
      ch("match", 3, CHOBUN, "本文の内容に合うものを選べ。", ["The author believes the library's mission of helping people learn continues in a new form.", "The author thinks libraries should only lend books.", "The author says cafés are better public spaces than libraries.", "Librarians have refused to change the way libraries work."], 0,
        ["正解。has not disappeared; it has simply taken a new form。", "本だけでなく多くの役割を肯定的に紹介している。", "カフェは businesses として図書館と対比されている。", "第3段落で、古い型を広げて変わってきたとある。"],
        "セミコロン（;）の前後は言いかえ",
        [["根拠", "{{has not disappeared}}; it has simply {{taken a new form}}。"], ["確認", "第3段落の変化と照らして、ほかの選択肢を消す。"]]),
      ch("title", 2, CHOBUN, "本文の表題として最も適切なものを選べ。", ["New Roles for the Library in a Digital Age", "How to Find Information on a Smartphone", "Why Cafés Are Popular with Students", "The Best Novels to Read in Winter"], 0,
        ["正解。スマートフォンの時代に図書館が役割を広げていることを論じている。", "スマートフォンは図書館の存在意義を問うきっかけ。", "カフェは図書館と対比されるだけ。", "小説は最後の文の例の1つ。"],
        "全体をつらぬく話題を表す題",
        [["話題", "{{library}} がくり返される。"], ["主張", "役割を広げ、{{新しい形}} で使命を果たす。"]]),
    ],
  ),
];

// =====================================================================
// 第5問　長文読解（科学・文化）
// =====================================================================

const T5: ExamPoolSection[] = [
  S(
    5,
    "sleep",
    CHOBUN,
    "睡眠と記憶",
    READ,
    "Sleeping on It",
    `Most students have had the experience of staying up late to study before an important test. It seems logical: the more hours you spend reviewing, the more you should remember. Yet research on sleep suggests that this strategy may often ( 1 ). Sleep, it turns out, is not simply a period of rest for the brain. It is a time when the brain is busy with important work, including the work of storing what we have learned.

During the day, our brains take in a large amount of information. Much of it is held only temporarily, a little like notes written on a whiteboard. For this information to last, it needs to be (A) transferred into a more stable form. Scientists believe that a great deal of this process takes place while we are asleep. In experiments, people who learn a list of words or a new skill and then sleep tend to perform better when they are tested later than people who spend the same amount of time awake.

Sleep does not seem to strengthen all memories equally, however. Some studies suggest that the brain gives priority to information that it expects to be useful in the future. In one type of experiment, participants learned two sets of material, and some of them were told that they would be tested on one set the next day. After a night of sleep, those participants tended to remember that set especially well. 【 X 】.

Sleep may also help us see connections that we missed while awake. There are many stories of people who went to bed puzzled by a problem and woke up with a fresh idea. While such stories are hard to prove, some laboratory studies have found that people are more likely to discover a hidden pattern in a task after they have slept. The brain, it seems, continues to ( 2 ) information even when we are not aware of it.

What happens when we do not get enough sleep? Students who stay up all night may feel that they have gained extra study time, but they often find it harder to concentrate the next day. Lack of sleep affects attention and mood, making it more difficult to learn anything new. In other words, cutting sleep in order to study can be (B) self-defeating: it reduces the very ability that studying depends on.

None of this means that sleep can replace effort. A person who never studies will not wake up knowing the material. But it does suggest that studying and sleeping work best as partners. Reviewing material in the evening and then getting a full night's rest may be more effective than studying until dawn.

Researchers are still learning exactly how sleep supports memory, and many questions remain. Still, the basic message is ( 3 ) enough for anyone to follow. If you want to remember what you study, give your brain the time it needs to do its quiet work at night.`,
    8,
    [
      ch("b1", 3, CHOBUN, "空所( 1 )に入る最も適切なものを選べ。", ["backfire", "succeed", "continue", "matter"], 0,
        ["正解。backfire＝裏目に出る。Yet で「理にかなって見える」と逆になり、のちの段落の「睡眠不足で集中できない」と合う。", "Yet のあとで「うまくいく」では対比にならない。", "「続く」では研究の示す内容にならない。", "「重要だ」では Yet の逆接が生きない。"],
        "Yet の前後で評価が逆になる",
        [["前", "{{It seems logical}}（理にかなって見える）。"], ["後", "{{Yet}} 研究は → 裏目に出る＝{{backfire}}。"]]),
      ch("b2", 2, CHOBUN, "空所( 2 )に入る最も適切なものを選べ。", ["process", "forget", "ignore", "delete"], 0,
        ["正解。眠っている間も情報を「処理し」、かくれた規則に気づける。", "忘れるのでは新しいひらめきにつながらない。", "無視するのでは段落の内容と逆。", "消すのでは段落の内容と逆。"],
        "段落の主張（眠るとつながりに気づく）から",
        [["段落の主張", "眠ると {{hidden pattern}} を見つけやすい。"], ["空所", "気づかないうちに情報を {{process}} し続ける。"]]),
      ch("b3", 1, CHOBUN, "空所( 3 )に入る最も適切なものを選べ。", ["simple", "difficult", "strange", "expensive"], 0,
        ["正解。形容詞＋enough for anyone to follow＝だれでも従えるほど簡単。", "「だれでも従えるほど難しい」は矛盾。", "「だれでも従えるほど奇妙」は意味が通らない。", "お金の話ではない。"],
        "形容詞 enough for 人 to do",
        [["形", "___ {{enough for anyone to follow}}。"], ["意味", "だれでも従える＝{{simple}}。"]]),
      ch("ul-a", 1, VOC, "下線部(A) transferred に最も近い意味のものを選べ。", ["moved", "removed", "invented", "ignored"], 0,
        ["正解。transfer＝移す。一時的な形から安定した形へ「移される」。", "removed は「取り除かれる」で、記憶が残る話と逆。", "「発明される」ではない。", "「無視される」ではない。"],
        "transfer A into B＝AをBに移す",
        [["語の意味", "{{transfer}}＝移す・移しかえる。"], ["文脈", "ホワイトボードのメモ → {{more stable form}} へ。"]]),
      ch("whiteboard", 2, CHOBUN, "第2段落で、ホワイトボードのたとえが表しているのはどのようなことか。", ["Much information is kept only for a short time.", "The brain likes to write things down.", "Information is easy to read.", "Students should take notes in class."], 0,
        ["正解。Much of it is held only temporarily, a little like notes written on a whiteboard。消されやすい一時的なメモのたとえ。", "書くのが好きという話ではない。", "読みやすさの話ではない。", "ノートを取れという助言ではない。"],
        "たとえは直前の内容を説明している",
        [["直前", "{{held only temporarily}}（一時的に保たれる）。"], ["たとえ", "ホワイトボード＝すぐ {{消せる}} メモ。"]]),
      ch("exp1", 2, CHOBUN, "第2段落の実験の結果として最も適切なものを選べ。", ["People who slept after learning did better than those who stayed awake for the same time.", "People who stayed awake learned more words.", "Sleep had no effect on learning new skills.", "Only people who slept for ten hours remembered the words."], 0,
        ["正解。sleep tend to perform better … than people who spend the same amount of time awake。", "起きていた人のほうが成績はよくない。", "a new skill でも効果があるとしている。", "10時間という数字は出てこない。"],
        "比較の than のあとをていねいに読む",
        [["根拠", "people who … then sleep {{tend to perform better}}。"], ["比べる相手", "{{the same amount of time awake}} の人。"]]),
      ch("priority", 2, CHOBUN, "第3段落によると、睡眠中の脳が優先すると考えられているのはどのような情報か。", ["information it expects to be useful later", "information learned most recently", "information that is easiest to understand", "information about dreams"], 0,
        ["正解。gives priority to information that it expects to be useful in the future。", "最も新しい情報とは書いていない。", "わかりやすさの話ではない。", "夢の話はない。"],
        "give priority to ～＝～を優先する",
        [["根拠", "{{gives priority to}} information that it {{expects to be useful in the future}}。"], ["実験", "翌日テストに出ると言われた組をよく覚えていた。"]]),
      od("x-order", 3, CHOBUN, "【 X 】には「眠っている脳は、何を覚えておくべきかを選んでいるようだ」という意味の英文が入る。与えられた語句を正しく並べかえよ。", ["The sleeping brain", "seems", "to choose", "what", "it should", "remember"],
        "seem to do＋間接疑問 what S should do",
        [["骨組み", "{{The sleeping brain seems to choose}} ～。"], ["目的語", "何を覚えておくべきか＝{{what it should remember}}。"]]),
      ch("pattern", 2, CHOBUN, "第4段落の実験室の研究でわかったこととして最も適切なものを選べ。", ["People were more likely to find a hidden pattern after sleeping.", "People always woke up with a fresh idea.", "Stories about dreams were proven true.", "People forgot the task after sleeping."], 0,
        ["正解。more likely to discover a hidden pattern in a task after they have slept。", "always とは書いていない。ひらめきの話は hard to prove（証明しにくい）。", "そうした話は hard to prove とある。", "忘れたのではなく、気づきやすくなった。"],
        "研究の結果と「よくある話」を区別する",
        [["よくある話", "such stories are {{hard to prove}}。"], ["研究の結果", "{{more likely to discover a hidden pattern}}。"]]),
      ch("ul-b", 3, CHOBUN, "下線部(B) self-defeating の意味として最も適切なものを選べ。", ["working against its own purpose", "helping a person win a game", "making a person more confident", "being decided by oneself"], 0,
        ["正解。コロンのあと「勉強がたよる能力そのものを減らす」＝目的に反する（自滅的）。", "勝負に勝つ話ではない。", "自信が増す話ではない。", "「自分で決める」という意味ではない。"],
        "コロン（:）のあとが言いかえ",
        [["コロンのあと", "it reduces {{the very ability that studying depends on}}。"], ["意味", "勉強のための行動が勉強をじゃまする＝{{目的に反する}}。"]]),
      ch("effort", 3, CHOBUN, "本文の内容に合うものを選べ。", ["Sleep works together with study but cannot replace it.", "Sleep alone allows people to learn without studying.", "Studying in the evening is useless.", "Scientists fully understand how sleep supports memory."], 0,
        ["正解。None of this means that sleep can replace effort … work best as partners。", "A person who never studies will not wake up knowing the material と逆。", "夜に復習して眠るのが効果的とあり、逆。", "最終段落 many questions remain と逆。"],
        "None of this means ～ で誤解をふせいでいる",
        [["根拠", "{{None of this means that sleep can replace effort}}。"], ["結論", "studying and sleeping {{work best as partners}}。"]]),
      ch("title", 2, CHOBUN, "本文の表題として最も適切なものを選べ。", ["Sleep: The Brain's Quiet Study Partner", "How to Stay Awake All Night", "The History of Whiteboards", "Why Dreams Tell the Future"], 0,
        ["正解。睡眠が記憶を助け、勉強と睡眠は partners だという内容。", "徹夜は勧めていない。", "ホワイトボードはたとえにすぎない。", "夢で未来がわかる話ではない。"],
        "最終段落の主張を表す題を",
        [["主張", "studying and sleeping {{work best as partners}}。"], ["最終文", "脳が夜に {{quiet work}} をする時間を与えよ。"]]),
    ],
  ),
  S(
    5,
    "language",
    CHOBUN,
    "消えゆく言語",
    READ,
    "When a Language Disappears",
    `There are roughly seven thousand languages spoken in the world today, but they are far from equal in the number of their speakers. A small number of major languages are used by billions of people, while thousands of others are spoken by only a few hundred or a few thousand. Many linguists estimate that a large proportion of these smaller languages may stop being spoken within this century.

Languages rarely disappear because their speakers suddenly decide to abandon them. More often, the change happens gradually over several generations. Parents who speak a minority language may decide that their children will have better opportunities at school and work if they use the language of the majority. The children grow up understanding their parents' language but ( 1 ) speaking it, and their own children may not learn it at all. Within a few decades, the language may be spoken only by the oldest members of the community.

Why should this matter to anyone outside that community? One answer is that every language contains knowledge that may not exist anywhere else. Communities that have lived in one area for a long time often have detailed words for local plants, animals, and weather patterns. Some of this knowledge, such as which plants can be used as medicine, may be (A) passed down only through speech. When a language is lost, such knowledge can disappear along with it.

Languages also show the remarkable variety of ways in which humans organize their thoughts. Some languages describe directions not with words like "left" and "right" but with words similar to "north" and "south," even when speaking about objects on a small table. Others require speakers to show, through grammar, how they know something: whether they saw it themselves or heard it from someone else. Studying such differences helps scientists understand what is common to all human languages and what can ( 2 ).

For the speakers themselves, however, the most important loss may be personal. A language is tied to songs, stories, jokes, and ways of greeting one another. Many people describe feeling that a part of their identity is missing when they cannot speak the language of their grandparents.

In recent years, a number of communities have worked to (B) revive their languages. Some have opened schools where children are taught entirely in the local language. Others have recorded older speakers telling stories, or created dictionaries and smartphone apps. Not every effort succeeds, and reviving a language requires enormous time and commitment. Yet there are examples of languages that were once spoken by very few people and are now being learned again by the young.

【 X 】. The future of the world's smaller languages will depend largely on whether younger generations see them as something worth keeping. A language, after all, survives not in dictionaries but in daily ( 3 ).`,
    8,
    [
      ch("b1", 2, CHOBUN, "空所( 1 )に入る最も適切なものを選べ。", ["rarely", "often", "always", "happily"], 0,
        ["正解。理解はできるが「めったに話さない」。but の対比と、次の世代が学ばないことにつながる。", "but のあとで「よく話す」では対比にならない。", "「いつも話す」では次の世代が学ばない流れと合わない。", "「喜んで話す」では言語が消える話と逆。"],
        "understanding … but ___ speaking の対比",
        [["対比", "{{understanding}}（わかる）but ___ {{speaking}}（話す）。"], ["流れ", "次の世代は {{may not learn it at all}} → rarely。"]]),
      ch("b2", 3, CHOBUN, "空所( 2 )に入る最も適切なものを選べ。", ["vary", "be shared by all", "never change", "be heard"], 0,
        ["正解。what is common to all（共通するもの）と対になる「ちがいうるもの」。", "be shared by all は what is common と同じ意味で対比にならない。", "「決して変わらない」も共通性の側で対比にならない。", "聞こえるかどうかの話ではない。"],
        "what A and what B は対になる",
        [["前半", "{{what is common to all human languages}}。"], ["後半", "その反対＝言語によって {{vary}}（ちがう）もの。"]]),
      ch("b3", 1, CHOBUN, "空所( 3 )に入る最も適切なものを選べ。", ["use", "prices", "silence", "rules"], 0,
        ["正解。辞書の中ではなく、日々の「使用」の中で生き残る。", "値段の話ではない。", "「沈黙」の中では言語は生き残らない。", "規則は辞書の側の話で、not in dictionaries but と対比にならない。"],
        "not in A but in B の対比",
        [["対比", "not in {{dictionaries}} but in daily ___。"], ["空所", "毎日 {{使うこと}}＝use。"]]),
      ch("ul-a", 1, JUKU, "下線部(A) passed down に最も近い意味のものを選べ。", ["handed on to later generations", "written in books", "sold to other communities", "completely forgotten"], 0,
        ["正解。pass down＝（次の世代へ）伝える。", "only through speech（話しことばだけで）とあり、本に書かれるのではない。", "売る話ではない。", "伝えられるのであって、忘れられるのではない。"],
        "pass down＝hand down（後世に伝える）",
        [["熟語", "{{pass down}}＝次の世代へ伝える。"], ["文脈", "{{only through speech}}＝口伝えだけで。"]]),
      ch("gradual", 2, CHOBUN, "第2段落によると、言語はふつうどのように消えていくか。", ["Gradually, as families choose the majority language over several generations.", "Suddenly, when speakers decide to stop using it.", "Because governments ban minority languages.", "Because children refuse to understand their parents."], 0,
        ["正解。the change happens gradually over several generations。親が多数派の言語を選ぶことが例。", "rarely … suddenly decide と否定されている。", "政府の禁止は書かれていない。", "子どもは親のことばを理解できる（understanding）。"],
        "rarely A. More often B. の B が答え",
        [["否定", "{{rarely}} … suddenly decide to abandon them。"], ["肯定", "{{More often}}, … {{gradually over several generations}}。"]]),
      ch("parents", 1, CHOBUN, "第2段落で、親が多数派の言語を使わせようとする理由は何か。", ["They think their children will have better chances at school and work.", "They have forgotten their own language.", "They want their children to move abroad.", "Their children asked them to stop speaking it."], 0,
        ["正解。their children will have better opportunities at school and work。", "親は少数言語を話せる。", "外国に移る話ではない。", "子どもが頼んだとは書いていない。"],
        "opportunities＝chances",
        [["根拠", "{{better opportunities at school and work}}。"], ["言いかえ", "opportunities ＝ {{chances}}。"]]),
      ch("knowledge", 2, CHOBUN, "第3段落で、言語とともに失われうる知識の例として挙げられているものを選べ。", ["which plants can be used as medicine", "how to build tall buildings", "how to use smartphones", "the history of major languages"], 0,
        ["正解。such as which plants can be used as medicine。", "建物の話はない。", "スマートフォンは第6段落の取り組みで出るだけ。", "主要言語の歴史の話ではない。"],
        "such as のあとに例",
        [["根拠", "this knowledge, {{such as which plants can be used as medicine}}。"], ["要点", "地域の動植物・天候のくわしいことば。"]]),
      ch("direction", 2, CHOBUN, "第4段落で紹介されている言語の特徴として最も適切なものを選べ。", ["Some languages use words like north and south even for objects on a table.", "Some languages have no words for directions.", "All languages show through grammar how speakers know something.", "Some languages use left and right only for large distances."], 0,
        ["正解。with words similar to north and south, even when speaking about objects on a small table。", "方向を表すことばがないとは書いていない。", "All ではなく Others（ほかのいくつかの言語）。", "左右を遠い距離に使うとは書いていない。"],
        "Some … Others … は「一部の言語」",
        [["根拠", "words similar to {{north}} and {{south}}, even … {{on a small table}}。"], ["注意", "{{Others}} require … であって All ではない。"]]),
      ch("identity", 2, CHOBUN, "第5段落によると、話し手自身にとって最も大きな損失は何か。", ["a feeling that part of their identity is lost", "the loss of money from selling dictionaries", "the need to learn a new grammar", "the loss of their jobs"], 0,
        ["正解。a part of their identity is missing。言語は歌・物語・あいさつと結びついている。", "辞書の売り上げの話ではない。", "新しい文法の話ではない。", "仕事を失う話ではない。"],
        "personal（個人的な）損失の中身",
        [["段落の頭", "the most important loss may be {{personal}}。"], ["中身", "{{a part of their identity is missing}}。"]]),
      ch("ul-b", 2, CHOBUN, "下線部(B) revive の意味として最も適切なものを選べ。", ["bring back into use", "translate into English", "keep secret", "replace with another language"], 0,
        ["正解。revive＝よみがえらせる。学校・録音・辞書・アプリで再び使われるようにする。", "英語に訳す話ではない。", "秘密にする話ではない。", "別の言語に置きかえるのは逆。"],
        "revive＝生き返らせる（re＋vive）",
        [["語の成り立ち", "re（再び）＋vive（生きる）＝{{よみがえらせる}}。"], ["具体例", "地元のことばで教える学校・{{recorded older speakers}}。"]]),
      od("x-order", 3, CHOBUN, "【 X 】には「これらの例が示しているのは、言語の消滅は避けられないものではないということだ」という意味の英文が入る。与えられた語句を正しく並べかえよ。", ["What", "these examples", "show", "is", "that", "language loss", "is not unavoidable"],
        "What S V is that ～",
        [["主語", "{{What these examples show}}（what の名詞節）。"], ["補語", "is {{that language loss is not unavoidable}}。"]]),
      ch("match", 3, CHOBUN, "本文の内容に合うものを選べ。", ["The author suggests that a language survives only if people keep using it.", "The author says that all small languages will disappear this century.", "According to the passage, reviving a language is quick and easy.", "The author argues that minority languages contain no useful knowledge."], 0,
        ["正解。最終文 survives not in dictionaries but in daily use と、若い世代が守る価値を見いだすかどうか。", "a large proportion … may stop とあり、すべてとは言っていない。", "enormous time and commitment が必要とあり逆。", "ほかにない知識をふくむとあり逆。"],
        "最終段落と数量の表現（all・a large proportion）",
        [["最終文", "survives {{not in dictionaries but in daily use}}。"], ["注意", "第1段落は {{a large proportion}}（大部分）で all ではない。"]]),
      ch("title", 2, CHOBUN, "本文の表題として最も適切なものを選べ。", ["What We Lose When Languages Disappear", "How to Learn Seven Thousand Languages", "The Grammar of Directions", "Why Major Languages Are Easy"], 0,
        ["正解。言語が消える過程・失われるもの・よみがえらせる努力を論じている。", "全部を学ぶ話ではない。", "方向のことばは例の1つ。", "主要言語の難しさの話ではない。"],
        "段落ごとの話題をまとめる",
        [["流れ", "消え方 → {{失われるもの}}（知識・考え方・自分らしさ）→ 復活。"], ["題", "{{What We Lose}} …"]]),
    ],
  ),
  S(
    5,
    "birds",
    CHOBUN,
    "都市の騒音と鳥の歌",
    READ,
    "Birds in the Noisy City",
    `Cities are not designed with birds in mind. Tall buildings, bright lights, and heavy traffic create an environment very different from the forests and fields where most birds evolved. Yet many species have managed not only to survive in urban areas but to ( 1 ) there. Scientists who study urban wildlife have become increasingly interested in how these birds adjust to city life, and one of the most interesting areas of research concerns sound.

For many birds, song is essential. Males sing to attract partners and to warn rivals to stay away from their territory. A song that cannot be heard is therefore of little use. In cities, however, birds must compete with a constant background of noise from cars, trains, and construction. Much of this noise is low in pitch, like the deep rumble of a passing truck.

Researchers comparing city birds with members of the same species living in quieter areas have noticed some striking differences. In several species, city birds tend to sing at a higher pitch than their country relatives. Because higher sounds are less (A) masked by low traffic noise, they are more likely to reach the ears of other birds. Some city birds also sing more loudly, and some change the time of day when they sing. In certain cities, robins have been observed singing at night, when the streets are quieter.

These findings raise an interesting question. Are the birds simply ( 2 ) their behavior from moment to moment, as a person might raise their voice in a noisy room? Or have city populations gradually changed over many generations? The answer appears to be that both may be happening. Some birds seem to adjust their songs quickly when noise levels rise, while there is also evidence that young birds learn songs from others in their area, so that a local "city style" can develop over time.

【 X 】. Not every species is able to adapt in this way. Birds whose songs are naturally low may struggle to be heard, and some of them have become less common in noisy areas. Moreover, singing at a higher pitch or volume may have costs. It can require more energy, and in some species, females appear to prefer lower songs, which may be a sign of a larger, healthier male. A city bird that changes its song in order to be heard may therefore make itself (B) less attractive at the same time.

Studies like these remind us that human activity affects wildlife in ways that are not always obvious. Noise, unlike pollution in a river, leaves no visible trace. Yet it can shape how animals communicate, where they live, and perhaps even how they evolve. Some cities have begun to consider noise when planning parks and roads, for example by planting trees that help absorb sound. Such steps may benefit not only birds but also the people who live ( 3 ) them.`,
    8,
    [
      ch("b1", 1, CHOBUN, "空所( 1 )に入る最も適切なものを選べ。", ["thrive", "disappear", "escape", "hide"], 0,
        ["正解。not only to survive but to thrive＝生きのびるだけでなく、さかえる。", "Yet（それでも）のあとで「消える」は流れと逆。", "「逃げる」では survive と並ばない。", "「隠れる」では not only A but B の強まりにならない。"],
        "not only A but B は B のほうが強い",
        [["形", "not only {{to survive}} but {{to ___}}。"], ["空所", "生きのびる以上＝{{thrive}}（さかえる）。"]]),
      ch("b2", 2, CHOBUN, "空所( 2 )に入る最も適切なものを選べ。", ["adjusting", "hiding", "losing", "recording"], 0,
        ["正解。騒がしい部屋で声を大きくするように、その場その場で行動を「調整する」。", "行動を隠す話ではない。", "行動を失う話ではない。", "録音する話ではない。"],
        "たとえ（騒がしい部屋で声を上げる）から",
        [["たとえ", "{{as a person might raise their voice in a noisy room}}。"], ["空所", "その場で {{adjusting}} する。次の文の adjust とも合う。"]]),
      ch("b3", 2, CHOBUN, "空所( 3 )に入る最も適切なものを選べ。", ["alongside", "without", "against", "instead of"], 0,
        ["正解。鳥と「ともに」暮らす人にも役立つ。", "鳥のいない人では、鳥と人の両方に役立つ話にならない。", "「鳥に反対して暮らす」は意味が通らない。", "「鳥の代わりに」は意味が通らない。"],
        "not only birds but also people の関係",
        [["前", "{{not only birds but also the people}} …"], ["空所", "鳥と {{ともに}} 暮らす＝live {{alongside}} them。"]]),
      ch("song", 1, CHOBUN, "第2段落によると、多くの鳥のオスが歌うのはなぜか。", ["to attract partners and keep rivals away", "to tell other birds where food is", "to imitate the sound of traffic", "to wake people up in the morning"], 0,
        ["正解。to attract partners and to warn rivals to stay away from their territory。", "えさの場所の話はない。", "交通の音をまねる話ではない。", "人を起こす話ではない。"],
        "目的の不定詞（to do）を探す",
        [["根拠", "Males sing {{to attract partners}} and {{to warn rivals}} …"], ["言いかえ", "warn rivals to stay away ＝ keep rivals away。"]]),
      ch("noise", 2, CHOBUN, "第2段落で、都市の騒音について述べられていることを選べ。", ["Much of it is low in pitch.", "It is mostly very high in pitch.", "It is heard only at night.", "It comes mainly from birds."], 0,
        ["正解。Much of this noise is low in pitch。", "low と逆。", "夜だけとは書いていない。constant（たえまない）。", "車・電車・工事の音。"],
        "low in pitch＝音が低い",
        [["根拠", "Much of this noise is {{low in pitch}}。"], ["たとえ", "通りすぎるトラックの {{deep rumble}}。"]]),
      ch("ul-a", 2, VOC, "下線部(A) masked に最も近い意味のものを選べ。", ["hidden", "repeated", "created", "improved"], 0,
        ["正解。mask＝おおい隠す。低い騒音に高い音はかき消されにくい。", "「くり返される」ではない。", "「作られる」ではない。", "「よくされる」ではない。"],
        "mask＝cover・hide",
        [["文脈", "高い音は低い騒音に ___ されにくい → {{届きやすい}}。"], ["意味", "mask ＝ {{hide}}（かき消す）。"]]),
      ch("robins", 1, CHOBUN, "第3段落によると、一部の都市のコマドリ（robins）はどうしているか。", ["They sing at night, when the streets are quieter.", "They stop singing completely.", "They sing only during rush hour.", "They move to the countryside every winter."], 0,
        ["正解。robins have been observed singing at night, when the streets are quieter。", "歌うのをやめたのではない。", "通勤時間だけとは書いていない。静かな夜。", "冬の移動の話はない。"],
        "change the time of day の具体例",
        [["根拠", "{{singing at night}}, when the streets are {{quieter}}。"], ["前の文", "歌う {{時間帯を変える}} 鳥の例。"]]),
      ch("both", 3, CHOBUN, "第4段落の問いに対して、本文が示している答えとして最も適切なものを選べ。", ["Both quick adjustment and gradual change over generations may be happening.", "Only quick adjustment is happening.", "Only gradual change over many generations is happening.", "Neither explanation is supported by evidence."], 0,
        ["正解。The answer appears to be that both may be happening。", "both とあり、片方だけではない。", "both とあり、片方だけではない。", "どちらにも根拠（seem to adjust・evidence that young birds learn）がある。"],
        "2つの問いのあとの both に注目",
        [["問い", "その場の調整か？ {{Or}} 何世代もかけた変化か？"], ["答え", "{{both may be happening}}。"]]),
      od("x-order", 2, CHOBUN, "【 X 】には「しかし、これは話の一部にすぎない」という意味の英文が入る（「しかし」は訳さなくてよい）。与えられた語句を正しく並べかえよ。", ["This", "is", "only", "part", "of", "the story"],
        "only part of ～＝～の一部にすぎない",
        [["骨組み", "{{This is}} ～。"], ["補語", "一部にすぎない＝{{only part of the story}}。"]]),
      ch("ul-b", 3, CHOBUN, "下線部(B)のように、歌を変えた鳥が less attractive になりうるのはなぜか。", ["In some species, females seem to prefer lower songs.", "Higher songs cannot be heard at all.", "Females cannot hear at night.", "Larger males always sing higher songs."], 0,
        ["正解。females appear to prefer lower songs, which may be a sign of a larger, healthier male。", "高い歌は届きやすいと第3段落にある。", "夜に聞こえない話はない。", "低い歌が大きく健康なオスのしるしで、逆。"],
        "therefore の前に理由がある",
        [["理由", "{{females appear to prefer lower songs}}。"], ["結論", "高く歌うと届くが、同時に {{less attractive}}。"]]),
      ch("lowsong", 2, CHOBUN, "第5段落の内容に合うものを選べ。", ["Some birds with naturally low songs have become less common in noisy areas.", "Every species can easily change its song.", "Singing more loudly requires no extra energy.", "Low songs are easier to hear in cities."], 0,
        ["正解。Birds whose songs are naturally low may struggle … some of them have become less common in noisy areas。", "Not every species is able to adapt と逆。", "It can require more energy と逆。", "低い歌は低い騒音にまぎれやすく、may struggle to be heard とある。"],
        "Not every ～＝すべてが～とはかぎらない",
        [["根拠", "naturally low … {{have become less common in noisy areas}}。"], ["確認", "{{Not every species}}・{{require more energy}} で誤りを消す。"]]),
      ch("cities", 1, CHOBUN, "最終段落で、一部の都市が始めている取り組みとして挙げられているものを選べ。", ["planting trees that help absorb sound", "banning cars from all roads", "playing recorded bird songs", "building quieter trains"], 0,
        ["正解。by planting trees that help absorb sound。", "すべての道路で車を禁止するとは書いていない。", "録音した歌を流す話はない。", "静かな電車の話はない。"],
        "for example のあとに具体例",
        [["根拠", "{{for example by planting trees that help absorb sound}}。"], ["目的", "公園や道路の計画で {{騒音}} を考える。"]]),
      ch("title", 2, CHOBUN, "本文の表題として最も適切なものを選べ。", ["How City Noise Changes the Way Birds Sing", "The Best Places to Watch Birds", "Why Trucks Are So Loud", "How Forests Were Formed"], 0,
        ["正解。都市の騒音の中で鳥が歌の高さ・大きさ・時間を変えることと、その代償を論じている。", "観察に適した場所の話ではない。", "トラックは低い騒音のたとえ。", "森の成り立ちの話ではない。"],
        "全体の話題（騒音と歌）を表す題",
        [["第1段落", "研究の中心は {{sound}}。"], ["全体", "騒音 → {{歌を変える}} → 代償と人への教訓。"]]),
    ],
  ),
];

export const U_HOSEI_EIGO: UnivExam = {
  key: K,
  univ: "法政大学",
  kamoku: "英語",
  tier: "MARCH",
  order: 108,
  basis: "経営学部 A方式（個別日程）の傾向を参考（90分・150点・全問マーク。会話文・文法語彙・整序・長文2題）",
  format: "大問5題・90分・全問マーク。会話文・文法語彙（誤り指摘あり）・語句整序と、社会・科学の長文2題。",
  minutes: 90,
  groups: ["語彙", "文法", "技能"],
  sections: [
    { title: "第1問　会話文", lead: CLEAD, count: [5, 6], mix: [0.2, 0.5, 0.3], points: 20, prefer: "material", poolTag: `${K}:1` },
    { title: "第2問　文法・語彙", lead: GLEAD, count: [8, 10], mix: [0.2, 0.5, 0.3], points: 25, prefer: "material", poolTag: `${K}:2` },
    { title: "第3問　語句整序", lead: OLEAD, count: [4, 5], mix: [0.2, 0.5, 0.3], points: 20, prefer: "material", poolTag: `${K}:3` },
    { title: "第4問　長文読解（社会）", lead: READ, count: [7, 8], mix: [0.2, 0.5, 0.3], points: 40, prefer: "material", poolTag: `${K}:4` },
    { title: "第5問　長文読解（科学・文化）", lead: READ, count: [7, 8], mix: [0.2, 0.5, 0.3], points: 45, prefer: "material", poolTag: `${K}:5` },
  ],
  pool: [...T1, ...T2, ...T3, ...T4, ...T5],
};
