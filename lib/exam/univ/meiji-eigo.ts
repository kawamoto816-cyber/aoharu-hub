import type { UnivExam } from "./types";
import type { ExamPoolSection } from "../pool/types";
import type { Question } from "@/lib/moshi/types";

// 明治大学型 英語（MARCH）。商学部の学部別入試の傾向を参考にした練習用の形式（英文・設問はすべて書き下ろし）。
// 参考にした形式の情報（問題文・設問文・英文は使っていない）:
//   https://www.meiji.ac.jp/koho/guidebook/univ/examinfo2025.pdf  （商学部 学部別入試：外国語 80分・150点）
//   https://search.keinet.ne.jp/2286/topics/33  （河合塾 Kei-Net：商学部は単独の文法4択・会話文を出題。空所補充で英単語を書かせる問題も）
//   https://jyuke-labo.com/daigakujyukentaisaku/meijidaigaku/kamokubetsu/  （商学部はビジネス・経済・社会論の長文、空所補充・整序・語彙文法）
// 商学部: 80分・150点。社会・経済の長文、文化・科学の長文（空所補充・同意語・下線部の言いかえ・内容一致・整序）、
// 会話文の空所補充、文法・語法（4択・語形を変えて1語を書く・整序）の4題。

const K = "meiji-eigo";
type St = [string, string][];

const CHOBUN = "h-eng-skill-chobun";
const KAIWA = "h-eng-vocab-kaiwa";
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

/** 語形を変えて1語を書く */
function tw(id: string, d: 1 | 2 | 3, unit: string, prompt: string, accept: string[], point: string, st: St): Question {
  return {
    id,
    type: "B",
    difficulty: d,
    points: pts(d),
    seconds: 40,
    skill: "知識・技能",
    unit,
    prompt,
    answer: { kind: "term", accept, script: "any" },
    point,
    steps: steps(st),
  };
}

function S(n: number, id: string, unit: string, title: string, lead: string, passageTitle: string | undefined, body: string, pick: number, questions: Question[], lang: "en" | "text" = "en"): ExamPoolSection {
  return {
    unit,
    tag: `${K}:${n}`,
    section: {
      id: `me-${id}`,
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

// =====================================================================
// 第1問　長文読解（社会・経済）
// =====================================================================

const T1: ExamPoolSection[] = [
  S(
    1,
    "queue",
    CHOBUN,
    "行列と公平さ",
    READ,
    "The Price of Waiting",
    `Almost everyone has stood in a long line and wondered whether there is a better way. At theme parks, airports, and popular restaurants, waiting has become something that can be bought and sold. Many parks now offer a special ticket that allows visitors to skip the regular line, and some airlines let passengers pay extra to pass through security more quickly. To an economist, this is not surprising. Time is a limited resource, and when something is limited, people are often willing to pay for more of it.

Supporters of these systems point out that they can make everyone better off. A business traveler who must get to an important meeting may value an hour far more than a student on vacation. If the traveler pays for faster service, the company earns more money, which it can use to ( 1 ) regular prices or improve its facilities. In this view, a price simply helps match a scarce resource with the people who want it most.

Critics, however, argue that a line is one of the few places where money has traditionally not mattered. Whether you are rich or poor, you must wait your turn. This principle, often summarized as "first come, first served," is (A) deeply rooted in many societies, and people tend to feel that it is fair. When some customers can pay to move ahead, those left behind may feel that they are being treated as (B) second-class. Their anger is not only about the extra minutes they spend waiting; it is about the message that their time is worth less.

There is also a practical problem. When a company sells priority access, the regular line may actually become slower, because staff and space are shifted to serve paying customers. In that case, the business even has a reason to make ordinary waiting ( 2 ), since a longer line makes the special ticket more attractive. What began as a convenience can turn into a kind of pressure.

Some organizations have searched for (C) a middle path. One approach is the virtual queue: instead of standing in place, visitors receive a time slot on their phones and are free to walk around until it is their turn. Nobody pays to go first, but nobody has to stand still for an hour either. Another approach is to give priority based on need rather than money, for example to people with small children or physical disabilities. Such rules show that a line does not have to be organized purely by arrival time or purely by price.

【 X 】. People do not judge a system only by how efficient it is; they also ask whether it respects them. A queue that is fast but feels unfair may produce more complaints than one that is slow but treats everyone the same. For businesses, therefore, the real challenge is not simply to reduce waiting time. It is to design a system that customers ( 3 ) as both reasonable and fair.`,
    8,
    [
      ch("b1", 1, CHOBUN, "空所( 1 )に入る最も適切なものを選べ。", ["lower", "raise", "hide", "ignore"], 0,
        ["正解。追加の収入で通常料金を「下げる」なら、みんなが得をする（better off）という支持者の主張に合う。", "料金を上げると通常の客は損をし、「みんなが得をする」に合わない。", "料金を「隠す」では施設の改善と並ばず、意味が通らない。", "料金を「無視する」では意味が通らない。"],
        "段落の主張（みんなが得をする）に合う動詞を選ぶ",
        [["段落の主張", "支持者は {{make everyone better off}}（みんなを得させる）と言っています。"], ["空所の働き", "or improve its facilities と並ぶので、客の得になる行動＝{{lower}} regular prices。"]]),
      ch("b2", 2, CHOBUN, "空所( 2 )に入る最も適切なものを選べ。", ["uncomfortable", "pleasant", "shorter", "optional"], 0,
        ["正解。通常の行列がつらいほど特別券が魅力的になる（since a longer line makes the special ticket more attractive）。", "行列を快適にすると特別券を買う理由が減り、since 以下と合わない。", "since 以下は「長い行列」のほうが特別券が売れると言っている。shorter は逆。", "「任意の」では、なぜ特別券が魅力的になるのかの説明にならない。"],
        "since 以下の理由から、会社の動機を読みとる",
        [["理由の文", "{{since a longer line makes the special ticket more attractive}}。"], ["結論", "会社には通常の待ち時間を {{uncomfortable}} にする動機さえある、という流れ。"]]),
      ch("b3", 2, G("waho"), "空所( 3 )に入る最も適切なものを選べ。", ["regard", "think", "look", "call"], 0,
        ["正解。regard A as B で「AをBとみなす」。", "think は think of A as B の形にする。think A as B とは言わない。", "look は look on A as B の形。look A as B とは言わない。", "call A B は as をとらない（call A as B は誤り）。"],
        "regard A as B＝AをBとみなす",
        [["形を見る", "空所のあとに {{as both reasonable and fair}} がある。"], ["語法", "目的語のあとに as をとる動詞は {{regard}}。think・look は of・on が必要。"]]),
      ch("ul-a", 1, "h-eng-vocab-2000", "下線部(A) deeply rooted に最も近い意味のものを選べ。", ["firmly established", "rarely discussed", "recently introduced", "widely criticized"], 0,
        ["正解。rooted（根を張った）＝しっかり定着した。", "「めったに論じられない」は rooted の意味をふくまない。", "「最近取り入れられた」は deeply rooted（深く根づいた）と逆。", "直後に people tend to feel that it is fair とあり、批判されているのではない。"],
        "rooted＝根づいた。established が同意",
        [["語の成り立ち", "root（根）→ {{deeply rooted}}＝深く根づいた。"], ["文脈", "直後の「公平だと感じられている」とも合うのは {{firmly established}}。"]]),
      ch("ul-b", 2, CHOBUN, "下線部(B) second-class の意味として最も適切なものを選べ。", ["less important than other people", "more patient than other people", "better educated than other people", "younger than other people"], 0,
        ["正解。直後の「自分の時間の価値が低いというメッセージ」と合う。second-class＝二流の・格下の。", "我慢強さの話ではない。", "教育の程度は本文に出てこない。", "年齢の話ではない。"],
        "直後の文の「時間の価値が低い」が手がかり",
        [["言いかえを探す", "次の文に {{the message that their time is worth less}}。"], ["意味", "second-class＝ほかの人より {{格下に扱われる}}。"]]),
      ch("ul-c", 2, CHOBUN, "下線部(C) a middle path が指す内容として最も適切なものを選べ。", ["a way that relies neither only on price nor only on order of arrival", "a way of making lines move faster by charging higher prices", "a way of keeping visitors in the middle of the park", "a way of letting staff decide who goes first"], 0,
        ["正解。段落の最後に not … purely by arrival time or purely by price とある。両極のあいだの方法。", "お金で順番を買う方法そのもので、中間の道ではない。", "path を文字どおりの道と取った誤り。", "スタッフが決めるとは書いていない。優先の基準は need（必要）。"],
        "middle path＝両極端の中間の方法",
        [["両極は何か", "この文章の対立は「{{price（お金）}}」と「{{first come, first served（到着順）}}」。"], ["段落の結び", "a line does not have to be organized purely by arrival time or purely by price で中間の道を確認する。"]]),
      ch("why-support", 2, CHOBUN, "第2段落によると、優先券の支持者はなぜそれが「みんなを得させる」と考えるのか。", ["The extra money can be used for things that benefit all customers.", "Business travelers always pay more than students.", "Regular customers do not mind waiting at all.", "Prices make lines disappear completely."], 0,
        ["正解。the company earns more money, which it can use to … regular prices or improve its facilities。", "「必ず多く払う」とは書いていない。時間の価値がちがうという例にすぎない。", "待つのを気にしないとは書いていない。", "行列が完全になくなるとは書いていない。"],
        "which 以下に「お金の使いみち」がある",
        [["根拠の文", "{{which it can use to}} … regular prices or improve its facilities。"], ["言いかえ", "得たお金が {{全員のための改善}} に回る＝選択肢の things that benefit all customers。"]]),
      ch("practical", 2, CHOBUN, "第4段落で述べられている「実際上の問題」として最も適切なものを選べ。", ["Selling priority access may make the regular line slower.", "Virtual queues need expensive smartphones.", "Paying customers often complain about the price.", "Staff refuse to work in crowded places."], 0,
        ["正解。the regular line may actually become slower, because staff and space are shifted …。", "バーチャル待ち行列は第5段落の解決策で、問題として挙げていない。", "優先券を買った客の不満は書かれていない。", "スタッフが働くのをこばむとは書いていない。スタッフは有料の客へ回されるだけ。"],
        "段落の頭の文の直後に中身がある",
        [["段落の頭", "{{There is also a practical problem.}} のすぐあとに中身がある。"], ["内容", "人手と場所が有料客に回され、{{通常の列が遅くなる}}。"]]),
      ch("virtual", 1, CHOBUN, "virtual queue（バーチャル待ち行列）について本文の内容に合うものを選べ。", ["Visitors do not have to stand in one place while they wait.", "Visitors pay extra to receive an earlier time slot.", "Only people with small children can use it.", "It makes visitors wait in line twice."], 0,
        ["正解。instead of standing in place … free to walk around until it is their turn。", "Nobody pays to go first とあり、お金は払わない。", "小さな子のいる人への優先は、別の方法（Another approach）として書かれている。", "2回並ぶとは書いていない。"],
        "instead of ～ing＝～するかわりに",
        [["根拠", "{{instead of standing in place}}, visitors receive a time slot。"], ["確認", "Nobody pays to go first から、お金で早い枠を買う選択肢は誤り。"]]),
      ch("critics", 3, CHOBUN, "本文の内容に合うものを選べ。", ["Critics believe paying to skip a line suggests that some people's time matters less.", "Critics are angry mainly because they lose a few extra minutes.", "The author concludes that price is the best way to organize a line.", "The author says priority based on need has never been tried."], 0,
        ["正解。it is about the message that their time is worth less。", "not only about the extra minutes とあり、数分の損だけが理由ではない。", "筆者の結論は「効率だけでなく公平さ」。値段が最善とは言っていない。", "need に基づく優先は Another approach として紹介されており、試されたことがないとは言っていない。"],
        "not only A; B の B に筆者の重点がある",
        [["不満の中身", "Their anger is {{not only about the extra minutes}}; it is about the message …。"], ["他の選択肢", "最終段落の結論（効率と公平の両方）と照らして、筆者の意見を確かめる。"]]),
      od("x-order", 3, CHOBUN, "【 X 】には「大切なのは、ある仕組みが人々にどう感じさせるかである」という意味の英文が入る。与えられた語句を正しく並べかえよ。", ["What matters", "is", "how", "a system", "makes", "people", "feel"],
        "what matters is ～＝大切なのは～だ",
        [["主語", "「大切なのは」＝{{What matters}}（関係代名詞 what の名詞節）。"], ["補語", "is のあとに疑問詞節 {{how a system makes people feel}}（make O 原形）。"]]),
      ch("title", 2, CHOBUN, "本文の表題として最も適切なものを選べ。", ["Waiting in Line: Efficiency and Fairness", "How to Build a Theme Park", "Why Airlines Raise Their Prices", "The History of Smartphones"], 0,
        ["正解。効率（値段で時間を配る）と公平さ（到着順）の対立と、その中間の道を論じている。", "テーマパークは例の1つにすぎない。", "航空会社は例の1つ。値上げの理由が主題ではない。", "スマートフォンはバーチャル待ち行列の説明で出るだけ。"],
        "例ではなく、全体をつらぬく対立を表す題を選ぶ",
        [["くり返される語", "{{fair}}／{{efficient}} が最初から最後まで出てくる。"], ["最終段落", "効率だけでなく公平さも、という結論を表す題が正解。"]]),
    ],
  ),
  S(
    1,
    "samples",
    CHOBUN,
    "無料の試供品の経済学",
    READ,
    "Why Free Samples Are Not Really Free",
    `Walk through the food section of a large department store, and you will probably be offered a small piece of cheese, a cup of tea, or a slice of cake. Free samples are so common that we rarely stop to think about them. Yet from a business point of view, giving products away seems strange. Why would a company spend money on something that brings in no income?

The most obvious answer is that samples let customers try a product without risk. A new kind of yogurt may sound unappealing on the label, but one taste can change a shopper's mind. In this sense, a sample works like a short advertisement that people experience with their own senses rather than simply read or watch. For products whose quality is hard to judge from the outside, such as food or cosmetics, this direct experience can be far more ( 1 ) than any written description.

However, researchers in psychology have suggested a second, less obvious reason. Humans have a strong tendency to return favors. When someone gives us something, even something small, we often feel a quiet pressure to give something back. A shopper who has accepted a free sample from a smiling employee may feel slightly uncomfortable walking away without buying anything. The sample, in other words, creates a small sense of (A) obligation. This feeling is not necessarily conscious; many people would deny that it affects them at all.

【 X 】. Some customers learn to avoid sample counters altogether because they do not want to feel pushed. Others accept the sample happily but make a point of not buying, as if to prove that they cannot be influenced. If a company offers samples too aggressively, it may ( 2 ) the very trust it hopes to build. Customers who feel manipulated are unlikely to become loyal.

For this reason, the most successful sample programs tend to be relaxed rather than pushy. The employee offers a taste, answers questions, and lets the customer decide. The goal is not to win one sale at that moment but to create a positive memory of the brand. A person who enjoyed a sample last month may (B) reach for the same product on the shelf weeks later, without remembering exactly why.

The digital world has its own version of the free sample. Many apps and online services allow users to try basic features for nothing, hoping that some of them will later pay for a fuller version. The logic is similar: let people experience the value first, and payment may follow. ( 3 ), the risk is also similar. If the free version feels like a trap, users will simply leave.

Free samples, then, are not really free. They are a carefully considered investment in experience, memory, and human psychology. Whether they succeed depends less on what is given away than on how it is given.`,
    8,
    [
      ch("b1", 1, CHOBUN, "空所( 1 )に入る最も適切なものを選べ。", ["convincing", "expensive", "confusing", "careful"], 0,
        ["正解。実際に味わう体験は、文字の説明より「説得力がある」。前の one taste can change a shopper's mind と合う。", "費用の比較をしている段落ではない。", "直接の体験が「まぎらわしい」では、試供品の利点の説明にならない。", "体験が「注意深い」は意味が通らない。"],
        "段落の流れ（試供品の利点）に合う形容詞",
        [["前の文", "{{one taste can change a shopper's mind}}（ひと口で気が変わる）。"], ["比較", "書いた説明より直接の体験のほうが {{convincing}}（説得力がある）。"]]),
      ch("b2", 2, CHOBUN, "空所( 2 )に入る最も適切なものを選べ。", ["damage", "earn", "deserve", "increase"], 0,
        ["正解。押しつけがましいと、築きたい信頼をかえって「損なう」。次の文の「操られたと感じる客は常連にならない」と合う。", "信頼を「得る」では、too aggressively（強引すぎる）の結果と合わない。", "「値する」では文意が通らない。", "強引な売り方で信頼が「増える」は流れと逆。"],
        "If … too aggressively の結果は悪いこと",
        [["条件", "{{too aggressively}}（強引すぎる）なら悪い結果になる。"], ["次の文", "Customers who feel manipulated are unlikely to become loyal. → 信頼を {{damage}} する。"]]),
      ch("b3", 2, G("setsuzokushi"), "空所( 3 )に入る最も適切なものを選べ。", ["However", "For example", "As a result", "In other words"], 0,
        ["正解。「理屈は同じ（よい面）」→「しかし危険も同じ」と、よい面から悪い面へ転じる。", "前の内容の具体例ではない。", "前の文の結果として危険が生じるのではない。", "前の文の言いかえではなく、別の面（危険）を述べている。"],
        "よい面→悪い面の転換は However",
        [["前後の関係", "前：{{The logic is similar}}（よい面）。後：{{the risk is also similar}}（悪い面）。"], ["つなぎ語", "向きが変わるので逆接の {{However}}。"]]),
      ch("ul-a", 1, "h-eng-vocab-2000", "下線部(A) obligation に最も近い意味のものを選べ。", ["duty", "curiosity", "relief", "suspicion"], 0,
        ["正解。obligation＝義務（感）。お返しをしなければという気持ち。", "「好奇心」はお返しの話と合わない。", "「安心」は、何も買わずに立ち去ると落ち着かない（uncomfortable）という話と逆。", "「疑い」ではない。"],
        "obligation＝義務・恩義",
        [["前の文", "何も買わずに去ると {{uncomfortable}}。"], ["意味", "お返しをすべきだという気持ち＝{{duty}}。"]]),
      ch("ul-b", 2, CHOBUN, "下線部(B) reach for の意味に最も近いものを選べ。", ["pick up and choose", "refuse to buy", "complain about", "recommend to others"], 0,
        ["正解。棚の商品に手をのばす＝手に取って選ぶ。前向きな記憶の結果。", "前向きな記憶があるのに「買わない」は流れと逆。", "不満を言う話ではない。", "人にすすめる話ではない。棚から取る動作。"],
        "reach for ～＝～を取ろうと手をのばす",
        [["語の意味", "reach for ～＝{{～に手をのばす}}。"], ["文脈", "試供品のよい記憶 → 何週間かあとに同じ商品を {{手に取る}}。"]]),
      ch("quality", 1, CHOBUN, "第2段落によると、試供品が特に役立つのはどのような商品か。", ["Products whose quality is difficult to judge by looking at them", "Products that are very cheap to make", "Products that are already famous", "Products that can be sold only online"], 0,
        ["正解。For products whose quality is hard to judge from the outside, such as food or cosmetics。", "製造費の安さは書かれていない。", "すでに有名な商品とは書いていない。例は新しいヨーグルト。", "オンライン限定の商品の話ではない。"],
        "whose quality is hard to judge が根拠",
        [["根拠", "{{whose quality is hard to judge from the outside}}。"], ["言いかえ", "from the outside ＝ by looking at them。"]]),
      ch("second", 2, CHOBUN, "第3段落で述べられている「第二の理由」の内容として最も適切なものを選べ。", ["People tend to want to give something back after receiving a gift.", "People always buy the products they taste.", "Employees are paid more when they smile.", "Shoppers are usually hungry in department stores."], 0,
        ["正解。Humans have a strong tendency to return favors。", "always とは書いていない。気まずさを感じることがある（may feel）程度。", "店員の給料の話はない。", "空腹の話はない。"],
        "return favors＝恩を返す",
        [["根拠", "{{Humans have a strong tendency to return favors.}}"], ["言いかえ", "return favors ＝ {{give something back}}。"]]),
      ch("refuse", 2, CHOBUN, "第4段落で、試供品は受け取るがわざと買わない客がいるのはなぜか。", ["They want to show that they cannot be influenced.", "They think the samples taste bad.", "They have no money with them.", "They plan to buy the product online."], 0,
        ["正解。as if to prove that they cannot be influenced。", "味が悪いとは書いていない。accept the sample happily とある。", "お金の有無は書かれていない。", "オンラインで買うとは書いていない。"],
        "as if to prove ～＝～を証明するかのように",
        [["根拠", "make a point of not buying, {{as if to prove that they cannot be influenced}}。"], ["要点", "影響されないことを示したい＝反発の心理。"]]),
      ch("relaxed", 2, CHOBUN, "第5段落によると、うまくいく試供品のやり方の目的は何か。", ["To leave customers with a good impression of the brand", "To make customers buy something immediately", "To collect customers' personal information", "To reduce the number of employees"], 0,
        ["正解。The goal is not to win one sale at that moment but to create a positive memory of the brand。", "not to win one sale at that moment と否定されている。", "個人情報の話はない。", "人員の話はない。"],
        "not A but B の B が目的",
        [["構文", "The goal is {{not}} to win one sale … {{but}} to create a positive memory。"], ["言いかえ", "positive memory ＝ good impression。"]]),
      ch("summary", 3, CHOBUN, "本文の内容に合うものを選べ。", ["The author suggests that the way a sample is offered matters more than the sample itself.", "The author argues that free samples should be banned.", "According to the passage, online services never offer free versions.", "Most people admit that free samples affect their decisions."], 0,
        ["正解。最終文 depends less on what is given away than on how it is given。", "禁止すべきとは言っていない。", "アプリやオンラインサービスの無料版は本文の例。", "many people would deny that it affects them とあり、逆。"],
        "less A than B＝AよりむしろB",
        [["最終文", "depends {{less on what is given away than on how it is given}}。"], ["確認", "第3段落末の deny（否定する）で、admit の選択肢が誤りとわかる。"]]),
      od("x-order", 3, CHOBUN, "【 X 】には「しかし、この効果がいつも売り手に有利に働くとはかぎらない」という意味の英文が入る（「しかし」は訳さなくてよい）。与えられた語句を正しく並べかえよ。", ["This effect", "does not", "always", "work", "in", "the seller's", "favor"],
        "not always＝いつも～とはかぎらない（部分否定）",
        [["部分否定", "「いつも～とはかぎらない」＝{{does not always}} ＋動詞。"], ["熟語", "「～に有利に」＝{{in ～'s favor}}。in the seller's favor。"]]),
      ch("digital", 1, CHOBUN, "第6段落で「デジタルの世界の試供品」の例として挙げられているものを選べ。", ["Apps that let users try basic features for free", "Online stores that sell cheese and cake", "Advertisements shown before videos", "Websites that ask users to write reviews"], 0,
        ["正解。Many apps and online services allow users to try basic features for nothing。", "チーズやケーキはデパートの例（第1段落）。", "動画の前の広告は書かれていない。", "レビューを書く話はない。"],
        "for nothing＝無料で",
        [["根拠", "allow users to try basic features {{for nothing}}。"], ["語句", "for nothing ＝ {{for free}}。"]]),
    ],
  ),
  S(
    1,
    "sharing",
    CHOBUN,
    "シェアリング・エコノミーの利点と限界",
    READ,
    "Sharing Instead of Owning",
    `Many households own an electric drill that spends almost all of its life in a drawer. It may be used to put up a shelf or two, and then it is forgotten for years. Multiply this by thousands of homes, and you have a huge number of tools that are paid for but rarely used. This simple observation lies behind what is often called the sharing economy: the idea that people can get more value from goods by sharing access to them instead of each owning a separate copy.

Consider a tool library, a service that lends out tools in the same way that an ordinary library lends out books. Members pay a small yearly fee and can borrow a ladder, a saw, or a garden tool when they need one. For the members, the benefit is clear. They save money and storage space, and they can try equipment they could never ( 1 ) to buy. For the neighborhood, fewer products need to be manufactured, which may reduce waste.

Car sharing and bicycle sharing follow the same logic on a larger scale. A private car, after all, is parked for most of the day. If several people can use one vehicle at different times, the city may need fewer parking spaces, and the space saved could be turned into parks or housing.

Yet sharing is not as simple as it sounds. (A) The tool that sits unused in my drawer is at least always there when I want it. When I depend on a shared system, I may find that the item I need is already being used by someone else, often on exactly the same sunny weekend that everyone else wants to work in the garden. Sharing works best for things that people need at different times, and ( 2 ) well for things that everyone needs at once.

There is also the question of care. People tend to treat their own belongings more carefully than things they borrow. Shared bicycles are sometimes left in poor condition, and borrowed tools may come back broken. To deal with this, many services rely on ratings, deposits, or membership rules that make users responsible for damage. In a sense, they try to recreate the feeling of (B) ownership without actual ownership.

Finally, some observers worry that large companies have used the language of "sharing" for businesses that are really just rental services run for profit. 【 X 】. A community tool library run by volunteers and a global app that earns money from every ride are both called "sharing," but they are organized in very different ways.

None of this means that sharing is a bad idea. It simply means that sharing is a tool, not a magic solution. Used wisely, it can help people consume less and connect more with their neighbors. Used carelessly, it can create as many problems as it ( 3 ).`,
    8,
    [
      ch("b1", 1, G("waho"), "空所( 1 )に入る最も適切なものを選べ。", ["afford", "allow", "prevent", "insist"], 0,
        ["正解。can afford to do＝～する（金銭的な）余裕がある。自分では買えない道具を試せる、という利点。", "allow は allow O to do の形で、目的語が必要。", "prevent は prevent O from ～ing の形で、to 不定詞をとらない。", "insist は insist on ～ing の形で、to 不定詞をとらない。"],
        "can't afford to do＝～する余裕がない",
        [["文脈", "会員の利点：お金と場所の節約、そして {{自分では買えない}} 道具を試せる。"], ["語法", "to buy をとって「余裕がある」を表すのは {{afford}}。"]]),
      ch("b2", 2, CHOBUN, "空所( 2 )に入る最も適切なものを選べ。", ["less", "more", "better", "most"], 0,
        ["正解。みんなが同時に必要とする物は、共有だと順番待ちになるので「あまりうまくいかない」。", "同じ週末に使えなかったという例と逆。", "同時に必要な物ほどうまくいく、は例と逆。", "works best と対にするなら最上級ではなく、対照の less。"],
        "best（うまくいく）と対になる語",
        [["対比", "works {{best}} for things that people need at different times ↔ ( 2 ) well for things that everyone needs at once。"], ["例", "晴れた週末にみんなが同時に使う → {{less}} well。"]]),
      ch("b3", 2, CHOBUN, "空所( 3 )に入る最も適切なものを選べ。", ["solves", "causes", "ignores", "hides"], 0,
        ["正解。「解決するのと同じくらい多くの問題を生む」＝使い方を誤ると利点が帳消しになる。", "「生み出すのと同じだけの問題を生む」では意味をなさない。", "「無視する問題と同じだけ」は文脈と合わない。", "「隠す問題と同じだけ」は文脈と合わない。"],
        "Used wisely ↔ Used carelessly の対比",
        [["対比", "{{Used wisely}}（うまく使えば）よい／{{Used carelessly}}（雑に使えば）悪い。"], ["結論", "解決する（{{solves}}）のと同じだけ問題を生む＝差し引きで得にならない。"]]),
      ch("ul-a", 3, CHOBUN, "下線部(A)で筆者が言おうとしていることとして最も適切なものを選べ。", ["Owning something has the advantage that it is available whenever you need it.", "Tools kept in drawers are usually broken.", "People should throw away tools they do not use.", "Shared tools are always easier to find than one's own."], 0,
        ["正解。at least always there when I want it＝少なくとも、使いたいときにいつもある。直後の「共有だと他の人が使っている」と対比。", "壊れているとは書いていない。", "捨てるべきとは言っていない。", "直後に、共有だと使われていることがある、とあり逆。"],
        "at least＝少なくとも（持つことの利点を認める）",
        [["下線部の要点", "使わない道具でも {{always there when I want it}}（必要なときにある）。"], ["対比", "次の文 When I depend on a shared system … already being used by someone else。"]]),
      ch("ul-b", 2, CHOBUN, "下線部(B) ownership の感覚を作るための方法として本文に挙げられているものを選べ。", ["Making users responsible for any damage", "Giving each member a tool to keep", "Asking volunteers to repair every item for free", "Allowing members to borrow tools without any rules"], 0,
        ["正解。ratings, deposits, or membership rules that make users responsible for damage。", "1人に1つ渡すなら共有ではなくなる。", "ボランティアの無料修理は書かれていない。", "ルールを使うと書いてあり、逆。"],
        "前の文の方法が、所有の感覚を作るしくみ",
        [["方法", "{{ratings, deposits, or membership rules}}。"], ["目的", "壊したら責任を負う＝自分の物のように大切に扱わせる＝ownership の感覚。"]]),
      ch("library", 1, CHOBUN, "第2段落の tool library について本文の内容に合うものを選べ。", ["Members pay a small fee each year to borrow tools.", "Members must buy the tools after borrowing them.", "It lends out books as well as tools.", "It is run by a large international company."], 0,
        ["正解。Members pay a small yearly fee and can borrow …。", "買わなければならないとは書いていない。", "本を貸すのは ordinary library。たとえとして出るだけ。", "第6段落に community tool library run by volunteers とある。大企業ではない。"],
        "yearly fee＝年会費",
        [["根拠", "Members pay a small {{yearly fee}}。"], ["たとえ", "in the same way that an ordinary library lends out books は「図書館と同じように」というたとえ。"]]),
      ch("car", 2, CHOBUN, "第3段落によると、車を共有することで都市にどのような利点があるか。", ["Less space may be needed for parking, so it can be used for other purposes.", "Cars can be driven faster in the city.", "Every family can own two cars.", "People no longer need to walk."], 0,
        ["正解。the city may need fewer parking spaces, and the space saved could be turned into parks or housing。", "速度の話はない。", "所有台数が増える話ではない。", "歩かなくてよくなるとは書いていない。"],
        "the space saved の使いみちを確かめる",
        [["根拠", "{{fewer parking spaces}} → {{the space saved}} could be turned into parks or housing。"], ["言いかえ", "公園や住宅に＝other purposes。"]]),
      ch("worry", 2, CHOBUN, "第6段落で一部の人が心配していることとして最も適切なものを選べ。", ["Some profit-making rental businesses call themselves \"sharing.\"", "Volunteers are paid too much money.", "Global apps do not earn any money.", "Tool libraries are becoming too large."], 0,
        ["正解。used the language of \"sharing\" for businesses that are really just rental services run for profit。", "ボランティアの報酬の話はない。", "earns money from every ride とあり、逆。", "道具図書館が大きくなりすぎるとは書いていない。"],
        "really just ～＝実はただの～にすぎない",
        [["根拠", "businesses that are {{really just rental services run for profit}}。"], ["例", "ボランティアの道具図書館と、乗るたびに稼ぐ世界的アプリ。"]]),
      od("x-order", 3, CHOBUN, "【 X 】には「それ自体は何も悪くないが、そのちがいは重要だ」という意味の英文が入る。与えられた語句を正しく並べかえよ。", ["There is", "nothing wrong", "with this,", "but", "the difference", "matters"],
        "There is nothing wrong with ～＝～に悪いところはない",
        [["前半", "{{There is nothing wrong with this}}＝これに悪いところはない。"], ["後半", "matter は動詞で「重要である」：{{the difference matters}}。"]]),
      ch("main", 3, CHOBUN, "本文の主旨として最も適切なものを選べ。", ["Sharing can be useful, but it has limits and must be used wisely.", "Sharing is a perfect solution to the problem of waste.", "People should stop buying tools altogether.", "Sharing services are always run for profit."], 0,
        ["正解。sharing is a tool, not a magic solution／Used wisely … Used carelessly …。", "not a magic solution と否定している。", "買うのをやめるべきとは言っていない。", "ボランティアの道具図書館の例があり、always は誤り。"],
        "最終段落の not A but B 型の言いかえが主旨",
        [["結論の文", "sharing is {{a tool, not a magic solution}}。"], ["確認", "Used wisely（利点）と Used carelessly（限界）の両方をふくむ選択肢を選ぶ。"]]),
      ch("care", 1, CHOBUN, "第5段落によると、人は一般に借りた物をどう扱う傾向があるか。", ["Less carefully than their own belongings", "More carefully than their own belongings", "Exactly as carefully as their own belongings", "Only when they are paid to do so"], 0,
        ["正解。People tend to treat their own belongings more carefully than things they borrow＝借りた物は、自分の物ほど大切に扱わない。", "比較の向きが逆。", "同じではなく、差があると言っている。", "お金をもらうときだけ、とは書いていない。"],
        "比較の向きを取りちがえない",
        [["根拠", "own belongings {{more carefully than}} things they borrow。"], ["裏返す", "借りた物は自分の物より {{less carefully}}。"]]),
      ch("drill", 1, CHOBUN, "第1段落のドリルの例が示していることとして最も適切なものを選べ。", ["Many things people buy are seldom used.", "Electric drills break easily.", "Shelves are difficult to put up.", "Most homes have too many drawers."], 0,
        ["正解。tools that are paid for but rarely used。", "壊れやすいとは書いていない。", "棚が取りつけにくいとは書いていない。", "引き出しの数の話ではない。"],
        "例のあとに筆者のまとめがある",
        [["まとめの文", "a huge number of tools that are {{paid for but rarely used}}。"], ["言いかえ", "rarely ＝ {{seldom}}。"]]),
    ],
  ),
];

// =====================================================================
// 第2問　長文読解（文化・科学）
// =====================================================================

const T2: ExamPoolSection[] = [
  S(
    2,
    "birdsong",
    CHOBUN,
    "鳥はどうやって歌を覚えるか",
    READ,
    "Learning to Sing",
    `In early spring, the woods are full of birdsong. To human ears, the songs may sound like simple, cheerful noise, but for many birds they are a serious matter. Males of many species sing to defend their territory and to attract a mate, and a poorly sung song can mean failure in both. What is surprising is that, in many songbirds, this important skill is not entirely inborn. It has to be learned.

Scientists have long studied how young songbirds (B) acquire their songs. In a typical case, a young male first listens to adult males of his own species, often his father, and stores a memory of the song. At this stage he may not sing at all. Later, he begins to produce quiet, rambling sounds that are often compared to the babbling of a human baby. Little by little, by comparing his own sounds with the memory he has stored, he ( 1 ) his song until it closely matches the model.

Experiments have shown that the timing of this process matters. Many species seem to have a sensitive period, a window of time early in life when learning a song is especially easy. A bird that does not hear adult song during this period may later produce a song that sounds strange to other members of its species. (A) In some species, the window closes quite early; in others, birds continue to add new songs throughout their lives.

Hearing their own voice is also important. Young birds that cannot hear themselves while practicing usually fail to develop a normal song, even if they heard a good model earlier. This suggests that learning is not simply copying. It is a process of trial and error, in which the bird listens, adjusts, and tries again.

【 X 】. Like young birds, human infants pass through a stage of babbling before producing real words, and they, too, need to hear the language around them. Children who learn a second language early in life often find pronunciation easier than adults who start later, although the exact reasons are still debated. Of course, birdsong is not language in the human sense. A song does not combine words into sentences that express new ideas. Still, the similarities have made songbirds a valuable ( 2 ) for researchers interested in how brains learn complex sounds.

Birdsong also varies from place to place. Birds of the same species living in different regions may sing slightly different versions of a song, much as people in different areas speak with different accents. These local "dialects" are passed from one generation to the next through learning, and they can change gradually over time.

The next time you hear a bird singing outside your window, you might remember that its song is ( 3 ) a product of instinct alone. It is the result of careful listening, months of practice, and a tradition handed down from older birds.`,
    8,
    [
      ch("b1", 2, CHOBUN, "空所( 1 )に入る最も適切なものを選べ。", ["refines", "forgets", "hides", "borrows"], 0,
        ["正解。記憶と比べながら少しずつ「みがき上げ」、手本に近づける。", "記憶と比べて手本に近づけるので、「忘れる」は逆。", "歌を「隠す」では until it closely matches the model と合わない。", "「借りる」は意味が通らない。"],
        "Little by little … until ～ は少しずつ近づける動き",
        [["手がかり", "{{Little by little}}, by comparing … {{until it closely matches the model}}。"], ["語", "少しずつ改良する＝{{refine}}。"]]),
      ch("b2", 2, CHOBUN, "空所( 2 )に入る最も適切なものを選べ。", ["model", "threat", "rival", "cost"], 0,
        ["正解。人間の音声学習を調べるための「手本・モデル（研究の対象）」。", "研究者にとって「脅威」ではない。", "研究者の「競争相手」ではない。", "「費用」では valuable と合わない。"],
        "似ているから研究のモデルになる",
        [["前の文", "{{the similarities}}（人間との似た点）があるから…"], ["結論", "脳が複雑な音を学ぶしくみを調べる {{valuable model}}（貴重なモデル）。"]]),
      ch("b3", 1, CHOBUN, "空所( 3 )に入る最も適切なものを選べ。", ["not", "always", "mainly", "simply"], 0,
        ["正解。鳥の歌は本能だけの産物ではない。次の文で学習・練習・伝統の結果だと言っている。", "「いつも本能だけの産物」は本文全体の主張と逆。", "「主に本能の産物」は次の文と合わない。", "「単に本能だけの産物」では次の文と矛盾する。"],
        "次の文（学習の結果）と合うように否定する",
        [["次の文", "It is the result of {{careful listening, months of practice, and a tradition}}。"], ["結論", "本能だけの産物では {{not}} ない。"]]),
      ch("ul-a", 3, CHOBUN, "下線部(A)の内容として最も適切なものを選べ。", ["Some birds can learn songs only when young, while others keep learning new ones as adults.", "All birds stop learning songs at the same age.", "Birds learn songs faster in windows near the forest.", "Birds that sing early in the morning learn more songs."], 0,
        ["正解。window＝学びやすい期間。早く閉じる種と、一生新しい歌を加える種がある。", "種によってちがう（In some species … in others …）と言っている。", "window を「窓」と取った誤り。", "朝の早さの話ではない。"],
        "window＝ここでは「期間（機会の窓）」",
        [["語の意味", "前の文で {{a window of time}}（ある期間）と定義している。"], ["対比", "{{In some species}} 早く閉じる ↔ {{in others}} 一生加え続ける。"]]),
      ch("ul-b", 1, "h-eng-vocab-2000", "下線部(B) acquire に最も近い意味のものを選べ。", ["learn", "forget", "reject", "sell"], 0,
        ["正解。acquire＝身につける・習得する。", "「忘れる」は逆。", "「拒む」は逆。", "「売る」は意味が通らない。"],
        "acquire＝習得する・手に入れる",
        [["意味", "{{acquire}}＝身につける。"], ["文脈", "この段落は若い鳥が歌を {{learn}} する過程の説明。"]]),
      ch("stage", 1, CHOBUN, "第2段落によると、若いオスがまずすることは何か。", ["He listens to adult males and remembers their song.", "He sings loudly to attract a mate.", "He babbles like a human baby.", "He teaches his song to other young birds."], 0,
        ["正解。first listens to adult males … and stores a memory of the song。", "なわばり・つがいのための歌は大人の役割（第1段落）。", "ぶつぶつ言う段階は Later（そのあと）。", "ほかの若い鳥に教えるとは書いていない。"],
        "first／Later の順序の語に注目",
        [["順序", "{{first}} 聞いて覚える → {{Later}} 小さな声で練習。"], ["確認", "At this stage he may not sing at all＝最初は歌わないこともある。"]]),
      ch("hear", 2, CHOBUN, "第4段落の実験から筆者が導いていることとして最も適切なものを選べ。", ["Learning a song involves trying, listening, and correcting.", "Birds can sing well without ever hearing a model.", "Copying is the only thing birds need to do.", "Birds that hear themselves sing more quietly."], 0,
        ["正解。learning is not simply copying. It is a process of trial and error。", "手本を聞いていても自分の声が聞こえないと失敗する、と言っており、手本なしでうまく歌えるとは言っていない。", "not simply copying と否定している。", "声の大きさの話はない。"],
        "This suggests ～ のあとが筆者の結論",
        [["結論の文", "learning is {{not simply copying}}。"], ["言いかえ", "trial and error＝listens, adjusts, and tries again。"]]),
      ch("diff", 2, CHOBUN, "第5段落によると、鳥の歌と人間の言語のちがいは何か。", ["A song does not put words together into sentences that express new ideas.", "Human babies do not babble before speaking.", "Birds do not need to hear other birds to learn.", "Humans cannot learn a second language."], 0,
        ["正解。A song does not combine words into sentences that express new ideas。", "人間の赤ちゃんも babbling の段階を通る、と書いてある。", "鳥も聞く必要がある、が本文の内容。", "第二言語を学ぶ子どもの例があり、誤り。"],
        "Of course … のあとに「ちがい」が来る",
        [["転換", "{{Of course, birdsong is not language in the human sense.}}"], ["中身", "語を組み合わせて新しい考えを表す文にしない。"]]),
      ch("dialect", 2, CHOBUN, "第6段落の dialects について本文の内容に合うものを選べ。", ["They are passed on through learning and may slowly change.", "They never change once they appear.", "They are found only in human languages.", "They make birds of the same species unable to live together."], 0,
        ["正解。passed from one generation to the next through learning, and they can change gradually over time。", "change gradually とあり、変わらないは誤り。", "鳥の歌の地域差を dialects と呼んでいる。", "いっしょに暮らせなくなるとは書いていない。"],
        "gradually＝少しずつ ↔ never change",
        [["根拠", "{{through learning}}／{{change gradually over time}}。"], ["語", "gradually ＝ slowly。"]]),
      od("x-order", 3, CHOBUN, "【 X 】には「こうした発見は、多くの人に子どもが話せるようになる過程を思い起こさせる」という意味の英文が入る。与えられた語句を正しく並べかえよ。", ["These findings", "remind", "many people", "of", "how", "children", "learn", "to speak"],
        "remind A of B＝AにBを思い出させる",
        [["骨組み", "{{remind A of B}}：These findings remind many people of ～。"], ["B の部分", "of のあとに疑問詞節 {{how children learn to speak}}。"]]),
      ch("title", 2, CHOBUN, "本文の表題として最も適切なものを選べ。", ["How Young Songbirds Learn Their Songs", "Why Birds Fly South in Winter", "The Dangers of Living in the Woods", "How to Teach a Parrot to Talk"], 0,
        ["正解。歌は学ぶもの、その過程・時期・練習・方言を順に説明している。", "渡りの話はない。", "森の危険の話ではない。", "オウムに話させる方法ではない。"],
        "各段落に共通する話題（歌の学習）",
        [["第1段落の結び", "{{It has to be learned.}}（学ばなければならない）"], ["全体", "学ぶ過程・時期・自分の声・人間との比較・方言 → 歌の学習。"]]),
      ch("purpose", 1, CHOBUN, "第1段落によると、多くの種のオスが歌うのは何のためか。", ["To protect their area and to find a partner", "To warn humans about danger", "To teach their fathers new songs", "To keep themselves warm in spring"], 0,
        ["正解。to defend their territory and to attract a mate。", "人間への警告ではない。", "父親から学ぶのであって、父に教えるのではない。", "体温の話はない。"],
        "to 不定詞（目的）を2つ読む",
        [["根拠", "sing {{to defend their territory}} and {{to attract a mate}}。"], ["言いかえ", "territory＝area、mate＝partner。"]]),
    ],
  ),
  S(
    2,
    "silence",
    CHOBUN,
    "会話の中の沈黙",
    READ,
    "The Meaning of Silence",
    `Imagine two people talking. One asks a question, and the other pauses for three seconds before answering. In some settings, this pause would seem perfectly natural, even polite: it shows that the listener is thinking carefully. In others, the same pause might seem awkward, or might be taken as a sign that the speaker is unwilling to answer. Silence, it turns out, is not simply the absence of communication. It is part of communication, and its meaning depends heavily on context.

Researchers who study conversation have found that speakers in many languages take turns remarkably quickly. The gap between one person finishing and the next person starting is often very short, sometimes only a fraction of a second. To manage this, listeners must begin planning their reply while the other person is still talking. A long gap therefore stands out, and listeners tend to interpret it as ( 1 ): perhaps the speaker disagrees, does not know the answer, or is about to say something unwelcome.

At the same time, the length of a comfortable pause is not identical everywhere. In some communities, people value quick, overlapping talk as a sign of enthusiasm and closeness. In others, people prefer to leave space between turns, and interrupting is considered rude. (A) Neither style is better than the other, but when people from different backgrounds meet, the difference can cause misunderstanding. A speaker used to fast exchanges may think a quieter partner is cold or uninterested, while the quieter partner may think the fast talker is pushy.

Silence also carries meaning beyond the timing of turns. A teacher who stays silent after asking a question gives students time to think, and studies of classrooms suggest that slightly longer waiting times can lead to fuller answers. In a negotiation, a person who remains silent after hearing an offer may ( 2 ) the other side into improving it. Among close friends, silence can simply be comfortable, a sign that nobody feels the need to fill every moment with words.

【 X 】. People who are learning a foreign language often focus on vocabulary and grammar, but they may not realize that the rhythm of conversation also differs. Knowing when to speak, and when not to, is part of being a skilled communicator in any language. A learner who answers every question instantly, or who leaves very long pauses, may (B) give an impression they did not intend.

None of this means that we should time our pauses with a stopwatch. Instead, it means that we should be careful before drawing conclusions from silence. When someone does not answer right away, they may be thinking, being polite, or following the habits of their own community. Treating silence as a message ( 3 ) than as an empty space can make us better listeners.`,
    8,
    [
      ch("b1", 2, CHOBUN, "空所( 1 )に入る最も適切なものを選べ。", ["meaningful", "meaningless", "accidental", "invisible"], 0,
        ["正解。コロンのあとに「反対かも・知らないのかも・言いにくいことを言うのかも」と意味の読みとりが並ぶ。", "コロン以下で意味を読みとっているので逆。", "「偶然の」ではコロン以下の推測と合わない。", "「目に見えない」は stands out（目立つ）と合わない。"],
        "コロン（:）のあとが空所の具体的な中身",
        [["コロン以下", "{{perhaps the speaker disagrees, does not know …}}＝沈黙に意味を読みこむ。"], ["語", "意味があるものと解釈する＝interpret it as {{meaningful}}。"]]),
      ch("b2", 2, G("waho"), "空所( 2 )に入る最も適切なものを選べ。", ["pressure", "prevent", "warn", "thank"], 0,
        ["正解。pressure O into ～ing＝Oに圧力をかけて～させる。", "prevent は prevent O from ～ing。into はとらない。", "warn は warn O of／against ～。into はとらない。", "thank は thank O for ～。"],
        "動詞 O into ～ing＝Oに～させる",
        [["形", "空所 ＋ {{the other side into improving it}}。"], ["語法", "into ～ing をとるのは {{pressure}}（talk O into ～ing と同じ形）。"]]),
      ch("b3", 1, G("hikaku"), "空所( 3 )に入る最も適切なものを選べ。", ["rather", "less", "other", "sooner"], 0,
        ["正解。A rather than B＝BではなくむしろA。沈黙を空白ではなくメッセージとして扱う。", "less than にすると「空白としてより少なくメッセージとして」となり、筆者の主張と逆。", "other than は「～以外の」。意味が通らない。", "sooner than は時の比較。意味が通らない。"],
        "A rather than B＝BよりむしろA",
        [["主張", "筆者は沈黙を {{a message}} として扱うようすすめている。"], ["構文", "as a message {{rather than}} as an empty space。"]]),
      ch("ul-a", 3, CHOBUN, "下線部(A)の内容として最も適切なものを選べ。", ["Both conversation styles are acceptable, but mixing them can lead to misunderstanding.", "Fast talkers are usually ruder than quiet speakers.", "Quiet speakers should learn to interrupt more often.", "People from different backgrounds never misunderstand each other."], 0,
        ["正解。Neither style is better＝どちらも優劣はない。but 以下＝出会うと誤解が起きうる。", "どちらが上とは言っていない（Neither）。", "直すべきだとは言っていない。", "the difference can cause misunderstanding と逆。"],
        "Neither ～＝どちらも～ない",
        [["前半", "{{Neither style is better than the other}}＝優劣はない。"], ["後半", "but … {{can cause misunderstanding}}。両方をふくむ選択肢を選ぶ。"]]),
      ch("ul-b", 2, CHOBUN, "下線部(B) give an impression they did not intend の意味に最も近いものを選べ。", ["be seen in a way they did not mean", "make a speech they had not prepared", "forget what they wanted to say", "answer a question nobody asked"], 0,
        ["正解。意図しない印象を与える＝思ってもいない受けとられ方をする。", "準備していないスピーチの話ではない。", "言いたいことを忘れる話ではない。", "だれも聞いていない質問に答える話ではない。"],
        "impression＝印象（相手にどう見えるか）",
        [["語", "{{impression}}＝印象、{{intend}}＝意図する。"], ["文脈", "すぐ答えすぎる・間を空けすぎると、思わぬ見え方をする。"]]),
      ch("gap", 2, CHOBUN, "第2段落によると、聞き手が相手の話の途中で返事を考え始めるのはなぜか。", ["Because the gaps between speakers' turns are usually very short", "Because speakers often forget their questions", "Because listening is considered rude", "Because long pauses are always polite"], 0,
        ["正解。the gap … is often very short … To manage this, listeners must begin planning …。", "質問を忘れるとは書いていない。", "聞くことが失礼とは書いていない。", "長い間はかえって目立ち、意味を読まれる。always polite は誤り。"],
        "To manage this の this が指すもの",
        [["指示語", "{{this}}＝前の文の「交代の間がとても短いこと」。"], ["結論", "短い間で返すために、相手が話しているうちに準備する。"]]),
      ch("fast", 1, CHOBUN, "第3段落によると、速いやりとりに慣れた人は、口数の少ない相手をどう思うことがあるか。", ["Cold or uninterested", "Pushy", "Enthusiastic and close", "Skilled and polite"], 0,
        ["正解。may think a quieter partner is cold or uninterested。", "pushy は、静かな側が速い話し手に感じる印象。", "熱意・親しさは、速い会話を好む共同体が速いやりとりに感じるもの。", "本文にない。"],
        "だれがだれをどう思うか、主語を取りちがえない",
        [["根拠", "A speaker used to fast exchanges may think a quieter partner is {{cold or uninterested}}。"], ["注意", "{{pushy}} は逆向き（静かな人 → 速い人）。"]]),
      ch("teacher", 2, CHOBUN, "第4段落で教師の沈黙について述べられていることとして最も適切なものを選べ。", ["Waiting a little longer after a question may help students give fuller answers.", "Teachers should never ask questions.", "Students prefer teachers who talk all the time.", "Silent teachers make students nervous."], 0,
        ["正解。slightly longer waiting times can lead to fuller answers。", "質問するなとは言っていない。", "本文にない。", "緊張させるとは書いていない。時間を与える（gives students time to think）。"],
        "lead to ～＝～につながる",
        [["根拠", "slightly longer waiting times {{can lead to fuller answers}}。"], ["言いかえ", "lead to ＝ help ～ give。"]]),
      ch("advice", 3, CHOBUN, "最終段落で筆者がすすめていることとして最も適切なものを選べ。", ["To avoid judging others too quickly when they are silent", "To measure every pause with a stopwatch", "To always answer questions without pausing", "To stop talking to people from other communities"], 0,
        ["正解。we should be careful before drawing conclusions from silence。", "None of this means that we should time our pauses with a stopwatch と否定。", "すぐ答えすぎるのも誤解のもと（第5段落）。", "本文にない。"],
        "None of this means … Instead, ～ の後半が主張",
        [["否定", "{{None of this means}} … stopwatch＝計れということではない。"], ["主張", "{{Instead}}, … be careful before drawing conclusions from silence。"]]),
      od("x-order", 2, CHOBUN, "【 X 】には「このことは、言語を学ぶ人にとって重要な意味をもつ」という意味の英文が入る。与えられた語句を正しく並べかえよ。", ["This", "has", "important", "consequences", "for", "language learners"],
        "have consequences for ～＝～に影響・結果をもたらす",
        [["骨組み", "This（このこと）＋ {{has}} ＋ {{important consequences}}。"], ["対象", "「～にとって」＝{{for language learners}}。"]]),
      ch("main", 2, CHOBUN, "本文の主旨として最も適切なものを選べ。", ["Silence is part of communication, and its meaning depends on the situation.", "Silence always means that a person disagrees.", "Fast conversation is better than slow conversation.", "Grammar is more important than the rhythm of conversation."], 0,
        ["正解。第1段落 It is part of communication, and its meaning depends heavily on context を全体で説明している。", "考えている・礼儀・習慣など、いろいろな意味がある。always は誤り。", "Neither style is better と言っている。", "リズムも大切だという主張で、逆。"],
        "第1段落の結論が全体の主旨",
        [["主題文", "Silence … {{is part of communication}}, and its meaning {{depends heavily on context}}。"], ["確認", "最終段落も「沈黙から早く結論を出すな」と同じ方向。"]]),
      ch("friends", 1, CHOBUN, "第4段落によると、親しい友人の間の沈黙はどのようなものになりうるか。", ["A comfortable sign that words are not always necessary", "A sign that the friends are angry", "A way to improve an offer", "A signal to end the friendship"], 0,
        ["正解。silence can simply be comfortable, a sign that nobody feels the need to fill every moment with words。", "怒りのしるしとは書いていない。", "申し出を良くさせるのは交渉の例。", "友情を終える合図ではない。"],
        "Among close friends のあとを読む",
        [["根拠", "silence can simply be {{comfortable}}。"], ["補足", "{{nobody feels the need to fill every moment with words}}。"]]),
    ],
  ),
  S(
    2,
    "trees",
    CHOBUN,
    "都市の樹木と暑さ",
    READ,
    "Cooling Cities with Trees",
    `On a hot summer afternoon, the center of a large city can feel noticeably hotter than the surrounding countryside. This effect, known as the urban heat island, occurs partly because cities are full of materials such as concrete and asphalt that absorb the sun's energy during the day and release it slowly at night. Buildings block the wind, and air conditioners, cars, and factories add heat of their own. As a result, city nights in particular may stay uncomfortably warm.

One of the simplest ways to reduce this effect is to plant trees. Trees cool their surroundings in two main ways. First, they provide shade. A street covered by a thick layer of leaves receives far less direct sunlight than an open road, so the ground and the walls of nearby buildings stay cooler. Second, trees release water vapor through their leaves, a process called transpiration. When water changes from liquid to gas, it takes heat from the surrounding air, in much the same way that sweat cools our skin.

The benefits go beyond comfort. Cooler streets mean that people use less electricity for air conditioning, which can lower energy costs. Heat can also be dangerous, especially for older people and those with health problems, so shade on a hot day may ( 1 ) protect lives. In addition, trees provide homes for birds and insects and can make neighborhoods more pleasant places to walk.

However, planting trees in a city is not as easy as it might seem. Space is limited, and roots need room to grow beneath pavements that are also crowded with pipes and cables. City trees often suffer from poor soil, pollution, and damage from vehicles. (A) A young tree planted in a narrow hole in the sidewalk may never reach its full size. For this reason, experts (B) emphasize that it is not enough simply to plant trees; they must also be cared for, sometimes for many years, before they provide much shade.

There is also the question of where trees are planted. In many cities, wealthier neighborhoods already have more green space than poorer ones. If new trees are planted mainly where residents ask for them most loudly, the gap may grow even ( 2 ). Some cities therefore use maps of surface temperature to identify the hottest streets and give them priority.

【 X 】. Trees take time to grow, and a young tree planted today will not cast much shade for years. Other measures, such as roofs painted in light colors that reflect sunlight, can work more quickly. Most experts see these approaches as working together rather than ( 3 ) each other.

In the end, the shade of a tree may be one of the oldest forms of air conditioning. As summers become hotter, cities are rediscovering its value.`,
    8,
    [
      ch("b1", 2, CHOBUN, "空所( 1 )に入る最も適切なものを選べ。", ["even", "never", "hardly", "rarely"], 0,
        ["正解。快適さを超えて「命を守ることさえある」。段落の頭 The benefits go beyond comfort と合う。", "暑さが危険なので日陰は役立つ。never は逆。", "hardly（ほとんど～ない）は流れと逆。", "rarely（めったに～ない）は流れと逆。"],
        "go beyond comfort → 命を守ることさえ",
        [["段落の頭", "{{The benefits go beyond comfort.}}"], ["文の流れ", "暑さは危険 → so 日陰は命を守ることさえある＝{{even}}。"]]),
      ch("b2", 2, CHOBUN, "空所( 2 )に入る最も適切なものを選べ。", ["wider", "smaller", "narrower", "closer"], 0,
        ["正解。声の大きい地区（もともと緑の多い豊かな地区）に植えると、差はさらに「広がる」。", "差が縮む結果にはならない。", "narrower は「せまくなる」で逆。", "gap に closer は使わない。"],
        "gap が grow する→wider",
        [["状況", "豊かな地区はすでに緑が多い。"], ["結果", "そこへさらに植えると格差は even {{wider}}。"]]),
      ch("b3", 2, CHOBUN, "空所( 3 )に入る最も適切なものを選べ。", ["competing with", "helping", "supporting", "joining"], 0,
        ["正解。A rather than B で「互いに張り合うのではなく、協力して働く」。", "helping は working together と同じ方向で、rather than で対比できない。", "supporting も同じ方向で対比にならない。", "joining も同じ方向で対比にならない。"],
        "rather than の前後は反対の内容",
        [["対比", "{{working together}} rather than ( 3 ) each other。"], ["語", "協力と反対＝{{competing with}}（競い合う）。"]]),
      ch("ul-a", 3, CHOBUN, "下線部(A)が示していることとして最も適切なものを選べ。", ["Poor conditions in cities can stop trees from growing fully.", "Young trees grow faster in narrow places.", "Sidewalks should have no trees at all.", "Every tree in a city reaches its full size."], 0,
        ["正解。せまい穴・悪い土・汚染などで、十分な大きさに育たないことがある。", "never reach its full size と逆。", "木を植えるなとは言っていない。世話が必要と言う。", "never reach its full size と逆。"],
        "前の文の「悪条件」の具体例として読む",
        [["前の文", "{{poor soil, pollution, and damage from vehicles}}。"], ["下線部", "せまい穴の若木は {{never reach its full size}} かもしれない。"]]),
      ch("ul-b", 1, "h-eng-vocab-2000", "下線部(B) emphasize に最も近い意味のものを選べ。", ["stress", "doubt", "deny", "forget"], 0,
        ["正解。emphasize＝強調する＝stress。", "「疑う」ではない。", "「否定する」ではない。", "「忘れる」ではない。"],
        "emphasize＝stress（強調する）",
        [["意味", "{{emphasize}}＝強調する。"], ["同意語", "名詞 emphasis、同意の動詞 {{stress}}。"]]),
      ch("night", 1, CHOBUN, "第1段落によると、都市の夜が暑いままになりやすい理由の1つは何か。", ["Concrete and asphalt release the heat they absorbed slowly at night.", "There are more trees in cities than in the countryside.", "The sun shines longer in cities.", "People turn off air conditioners at night."], 0,
        ["正解。absorb the sun's energy during the day and release it slowly at night。", "木の多さは理由ではない。むしろ木は冷やす側。", "日照時間の話はない。", "エアコンは熱を加える（add heat）側として出てくる。"],
        "absorb（吸収）→ release（放出）の流れ",
        [["根拠", "{{absorb}} the sun's energy during the day and {{release it slowly at night}}。"], ["結果", "As a result, city nights … stay uncomfortably warm。"]]),
      ch("transpiration", 2, CHOBUN, "第2段落によると、transpiration が周りの空気を冷やすのはなぜか。", ["Water takes heat from the air when it turns into gas.", "Leaves block the wind completely.", "Trees produce cold water from their roots.", "Birds living in trees cool the air."], 0,
        ["正解。When water changes from liquid to gas, it takes heat from the surrounding air。", "風をさえぎるのは建物（第1段落）。", "根から冷たい水を出すとは書いていない。", "鳥は第3段落の別の利点。"],
        "汗が肌を冷やすのと同じしくみ",
        [["根拠", "When water changes {{from liquid to gas}}, it {{takes heat}} from the surrounding air。"], ["たとえ", "in much the same way that sweat cools our skin。"]]),
      ch("electric", 1, CHOBUN, "第3段落で述べられている、快適さ以外の利点として本文に合うものを選べ。", ["People may use less electricity for air conditioning.", "Cars can drive faster on cooler streets.", "Trees reduce the number of insects.", "Houses become cheaper to build."], 0,
        ["正解。people use less electricity for air conditioning, which can lower energy costs。", "車の速さの話はない。", "虫に住みかを与える（provide homes for … insects）と逆。", "家の建築費の話はない。"],
        "Cooler streets mean that ～ の中身",
        [["根拠", "Cooler streets mean that people use {{less electricity}} for air conditioning。"], ["確認", "insects は「減らす」ではなく「住みかを与える」。"]]),
      ch("maps", 2, CHOBUN, "第5段落によると、地表の温度の地図を使う都市があるのはなぜか。", ["To plant trees first where the need is greatest", "To find out which residents complain most loudly", "To decide where to build new air conditioners", "To show tourists the coolest places"], 0,
        ["正解。identify the hottest streets and give them priority＝いちばん暑い通りを優先する。声の大きさではなく必要の大きさで決める。", "声の大きい所に植えると格差が広がる、と問題にしている。逆。", "エアコンの設置の話ではない。", "観光客の話ではない。"],
        "therefore の前の「問題」と後ろの「対策」",
        [["問題", "声の大きい所に植えると格差が広がる。"], ["対策", "{{therefore}} 温度の地図で {{the hottest streets}} を優先。"]]),
      od("x-order", 2, CHOBUN, "【 X 】には「木だけでこの問題を解決することはできない」という意味の英文が入る。与えられた語句を正しく並べかえよ。", ["Trees", "cannot", "solve", "the problem", "by", "themselves"],
        "by oneself＝それだけで・独力で",
        [["骨組み", "Trees ＋ {{cannot solve}} ＋ the problem。"], ["熟語", "「それだけで」＝{{by themselves}}（主語 Trees に合わせて themselves）。"]]),
      ch("roofs", 2, CHOBUN, "第6段落の明るい色の屋根について本文の内容に合うものを選べ。", ["It can have an effect sooner than planting trees.", "It takes longer to work than planting trees.", "It is the only answer to the heat problem.", "It absorbs more sunlight than dark roofs."], 0,
        ["正解。Trees take time to grow … roofs painted in light colors … can work more quickly。", "more quickly とあり、逆。", "approaches as working together とあり、唯一の答えではない。", "reflect sunlight（反射する）とあり、逆。"],
        "Trees take time ↔ work more quickly の対比",
        [["木", "{{Trees take time to grow}}。"], ["屋根", "light colors that {{reflect}} sunlight, can {{work more quickly}}。"]]),
      ch("title", 2, CHOBUN, "本文の表題として最も適切なものを選べ。", ["Trees and the Fight against City Heat", "How to Paint a Roof", "Why People Move to the Countryside", "The History of Air Conditioners"], 0,
        ["正解。ヒートアイランドを木で和らげるしくみ・利点・難しさ・公平さ・他の方法を論じている。", "屋根の色は1つの例にすぎない。", "田舎へ移る話ではない。", "エアコンの歴史ではない。最後の文はたとえ。"],
        "最初と最後の段落の話題をつなぐ",
        [["最初", "{{urban heat island}}。"], ["最後", "the shade of a tree … oldest forms of air conditioning → 木と都市の暑さ。"]]),
    ],
  ),
];

// =====================================================================
// 第3問　会話文
// =====================================================================

const T3: ExamPoolSection[] = [
  S(
    3,
    "presentation",
    KAIWA,
    "発表の準備（大学の友人どうし）",
    "次の会話文を読み、空所に入る最も適切なものを選べ。",
    "Planning a Presentation",
    `Mika: Hi, Daniel. Do you have a minute? I wanted to talk about our marketing presentation.
Daniel: Sure. ( 1 )
Mika: Well, the deadline is next Friday, and we still haven't chosen a company to analyze.
Daniel: You're right. ( 2 ) How about that new juice shop near the station? It's always crowded.
Mika: That's a good idea, but ( 3 ) Another group is already doing it.
Daniel: Oh, really? ( 4 ) What about the bookstore that opened a café inside last year?
Mika: Interesting. They've been attracting a lot of young customers. ( 5 )
Daniel: Possibly. My cousin works there part-time, so ( 6 )
Mika: Perfect. Then let's divide the work. ( 7 )
Daniel: I'm better with numbers, so I'll collect the sales data.
Mika: Great. I'll design the slides, then. ( 8 )
Daniel: How about Wednesday after class? That gives us two days to practice.
Mika: ( 9 ) See you then.`,
    6,
    [
      ch("k1", 1, KAIWA, "空所( 1 )に入る最も適切なものを選べ。", ["What's on your mind?", "I'm afraid I've never met you.", "It took me an hour.", "No, I don't have a watch."], 0,
        ["正解。「どうしたの？（何の話？）」と相手の話をうながす。", "名前を呼んで話しかけられており、初対面ではない。", "時間の長さを答える場面ではない。", "Do you have a minute? は「少し時間ある？」で、時計の有無ではない。"],
        "Do you have a minute?＝少し時間ある？",
        [["相手の発言", "{{Do you have a minute?}}＝ちょっと時間ある？"], ["応答", "Sure. のあとに話をうながす {{What's on your mind?}}。"]]),
      ch("k2", 2, KAIWA, "空所( 2 )に入る最も適切なものを選べ。", ["We'd better decide today.", "There's no hurry at all.", "I've already finished my part.", "Let's ask the shop to close."], 0,
        ["正解。締め切りが近いのに会社が決まっていない → 今日決めたほうがいい、と言ってすぐ案を出す。", "You're right（締め切りが近いのはそのとおり）と矛盾する。", "会社も決まっていないので、自分の分が終わっているはずがない。", "店を閉めさせる話ではない。"],
        "You're right. の後は相手に同意する内容",
        [["同意の中身", "締め切りは来週、会社は {{まだ決まっていない}}。"], ["次の行動", "{{We'd better decide today.}} と言い、すぐ案を出している。"]]),
      ch("k3", 2, KAIWA, "空所( 3 )に入る最も適切なものを選べ。", ["I'm afraid someone beat us to it.", "I've heard their juice is delicious.", "it's very close to the station.", "I'd love to go there now."], 0,
        ["正解。beat O to it＝Oより先にやる。次の文「別のグループがもうやっている」と合う。", "but のあとにほめ言葉では逆接にならない。", "near the station は Daniel がすでに言っており、but でつなぐ反論にならない。", "but のあとに続く理由として合わない。"],
        "but のあとに「だめな理由」が来る",
        [["次の文", "{{Another group is already doing it.}}"], ["表現", "先をこされた＝{{someone beat us to it}}。"]]),
      ch("k4", 1, KAIWA, "空所( 4 )に入る最も適切なものを選べ。", ["That's too bad.", "Congratulations!", "Same to you.", "Help yourself."], 0,
        ["正解。案が使えなくて「それは残念」。", "残念な知らせに「おめでとう」は合わない。", "「あなたもね」はあいさつへの返し。", "「ご自由にどうぞ」は食べ物などをすすめる表現。"],
        "残念な知らせへの返事",
        [["状況", "提案した店は {{ほかのグループが使っている}}。"], ["返事", "{{That's too bad.}} と言い、次の案を出す。"]]),
      ch("k5", 2, KAIWA, "空所( 5 )に入る最も適切なものを選べ。", ["Do you think we could interview the manager?", "Why did it close down?", "I've never heard of a bookstore.", "Who told you I like coffee?"], 0,
        ["正解。次の Possibly.（たぶんね）と、いとこが働いているので頼める、につながる。", "若い客を集めている店が閉店したのではない。", "本屋を聞いたことがないのは不自然。", "Possibly. の答えとつながらない。"],
        "次の返事（Possibly.＋いとこ）から逆算",
        [["次の発言", "{{Possibly.}} My cousin works there …"], ["逆算", "可能性をたずねる質問＝{{Do you think we could …?}}。"]]),
      ch("k6", 2, KAIWA, "空所( 6 )に入る最も適切なものを選べ。", ["I can ask her to introduce us.", "I've never been inside.", "she doesn't know anyone there.", "the café is closed on Mondays."], 0,
        ["正解。いとこが働いている → so 紹介してもらえる。次の Perfect. と合う。", "so の結果として「入ったことがない」は合わない。", "そこで働いているのに知り合いがいないは不自然。", "so の結果ではなく、Perfect. ともつながらない。"],
        "so のあとは前の文の結果",
        [["原因", "{{My cousin works there part-time}}。"], ["結果", "so {{I can ask her to introduce us}} → Perfect.。"]]),
      ch("k7", 2, KAIWA, "空所( 7 )に入る最も適切なものを選べ。", ["Would you rather do the research or make the slides?", "Have you finished the presentation yet?", "Shall we give up the project?", "Did you enjoy the juice?"], 0,
        ["正解。分担を決める質問。次の「数字が得意だからデータを集める」と合う。", "まだ会社を決めたところで、発表は終わっていない。", "let's divide the work と言ったばかりで、やめる提案は矛盾する。", "ジュースの話はもう終わっている。"],
        "divide the work → どちらを担当するか",
        [["直前", "{{let's divide the work}}。"], ["次の返事", "I'll collect the sales data → research を選んでいる。"]]),
      ch("k8", 2, KAIWA, "空所( 8 )に入る最も適切なものを選べ。", ["When should we meet to put it together?", "Why don't you design them instead?", "How much did the slides cost?", "Where did you buy that data?"], 0,
        ["正解。次の How about Wednesday after class? が日時の提案。", "I'll design the slides と言った直後に「あなたが作れば」は矛盾する。", "スライドを買う話ではない。", "データはこれから集める。"],
        "How about + 日時 ← When の質問",
        [["次の発言", "{{How about Wednesday after class?}}"], ["逆算", "日時をたずねる {{When should we meet …?}}。"]]),
      ch("k9", 1, KAIWA, "空所( 9 )に入る最も適切なものを選べ。", ["Sounds good to me.", "I'm sorry to hear that.", "It's up to me.", "Take care of yourself."], 0,
        ["正解。提案に賛成し、See you then. で締める。", "悪い知らせへの返事で、提案には合わない。", "「私しだい」は提案への返事として不自然。", "別れ際の言葉としてはありうるが、提案（水曜）への返事になっていない。"],
        "提案への賛成は Sounds good",
        [["直前", "水曜の授業後という {{提案}}。"], ["返事", "{{Sounds good to me.}} See you then.（じゃあそのときに）。"]]),
    ],
  ),
  S(
    3,
    "return",
    KAIWA,
    "店での返品・交換",
    "次の会話文を読み、空所に入る最も適切なものを選べ。",
    "At a Clothing Store",
    `Clerk: Good afternoon. How can I help you?
Customer: Hi. I bought this jacket here last week, but ( 1 )
Clerk: I'm very sorry about that. ( 2 )
Customer: Yes, here it is.
Clerk: Thank you. Would you like a refund, or ( 3 )
Customer: I really like the design, so I'd rather have the same jacket.
Clerk: Let me check. ... I'm afraid ( 4 )
Customer: Oh, no. ( 5 )
Clerk: Certainly. It should arrive in about a week. ( 6 )
Customer: Yes, please. My number is on the receipt.
Clerk: ( 7 ) And again, I apologize for the trouble.
Customer: ( 8 ) These things happen.
Clerk: Thank you for understanding. ( 9 )`,
    6,
    [
      ch("k1", 1, KAIWA, "空所( 1 )に入る最も適切なものを選べ。", ["the zipper broke the first time I used it.", "I'd like to buy two more.", "I've never been to this store.", "it fits me perfectly."], 0,
        ["正解。but のあとに不具合。次の店員の I'm very sorry about that. と合う。", "店員がおわびする理由にならない。", "here last week（先週ここで買った）と矛盾する。", "but でつなぐ不満にならず、おわびとも合わない。"],
        "店員のおわびから、客の不満を逆算",
        [["次の発言", "{{I'm very sorry about that.}}"], ["逆算", "商品の不具合＝{{the zipper broke}}。"]]),
      ch("k2", 1, KAIWA, "空所( 2 )に入る最も適切なものを選べ。", ["Do you have the receipt with you?", "Would you like it gift-wrapped?", "Have you tried our new café?", "Is this your first visit?"], 0,
        ["正解。次の Yes, here it is.（はい、これです）と、あとの on the receipt につながる。", "返品の場面で包装をすすめるのは不自然。here it is ともつながらない。", "here it is とつながらない。", "先週も来ており、here it is ともつながらない。"],
        "here it is＝物を手わたすときの言葉",
        [["次の発言", "{{Yes, here it is.}}＝物を差し出している。"], ["あとの手がかり", "My number is {{on the receipt}} → レシート。"]]),
      ch("k3", 2, KAIWA, "空所( 3 )に入る最も適切なものを選べ。", ["would you prefer to exchange it for a new one?", "would you like to pay by card?", "did you buy it online?", "is it a present for someone?"], 0,
        ["正解。返金か交換か。客の I'd rather have the same jacket（同じ物がいい）と合う。", "返品の場面で支払い方法を聞くのは合わない。", "先週ここで買ったと言っている。", "A or B の選択の形になっていない。"],
        "A or B の B は A（返金）と並ぶ選択肢",
        [["形", "Would you like {{a refund}}, or ～？"], ["客の答え", "{{I'd rather have the same jacket}} → 交換。"]]),
      ch("k4", 2, KAIWA, "空所( 4 )に入る最も適切なものを選べ。", ["we've sold out of that color in your size.", "we have plenty in stock.", "the jacket is very popular with you.", "you look great in it."], 0,
        ["正解。I'm afraid（残念ですが）＋在庫切れ。次の Oh, no. と取り寄せの依頼に合う。", "I'm afraid と Oh, no. に合わない。", "with you は不自然で、Oh, no. ともつながらない。", "Oh, no. につながらない。"],
        "I'm afraid のあとは相手に悪い知らせ",
        [["前後", "{{I'm afraid}} ～ → {{Oh, no.}}"], ["中身", "在庫切れ＝{{sold out}}。"]]),
      ch("k5", 2, KAIWA, "空所( 5 )に入る最も適切なものを選べ。", ["Is there any way you could order one for me?", "Then I'll take three.", "Why did you make it?", "I'm glad to hear that."], 0,
        ["正解。次の Certainly. It should arrive in about a week.（取り寄せ）と合う。", "在庫がないのに3着買うのは矛盾する。", "店員が作ったのではない。", "Oh, no. のあとに「うれしい」は矛盾する。"],
        "次の arrive in about a week から逆算",
        [["次の発言", "Certainly. It should {{arrive}} in about a week。"], ["逆算", "取り寄せの依頼＝{{order one for me}}。"]]),
      ch("k6", 2, KAIWA, "空所( 6 )に入る最も適切なものを選べ。", ["Would you like us to call you when it comes in?", "Would you like to try it on now?", "Could you come back yesterday?", "Do you know where the station is?"], 0,
        ["正解。次の Yes, please. My number is on the receipt.（電話番号）と合う。", "まだ届いていないので今は試着できない。", "yesterday は未来の依頼に使えない。", "電話番号の返事とつながらない。"],
        "My number（電話番号）← call you",
        [["次の発言", "Yes, please. {{My number}} is on the receipt。"], ["逆算", "届いたら電話する申し出＝{{call you when it comes in}}。"]]),
      ch("k7", 1, KAIWA, "空所( 7 )に入る最も適切なものを選べ。", ["I'll make a note of it.", "I'll throw it away.", "That's none of my business.", "You'd better hurry."], 0,
        ["正解。電話番号を「控えておきます」。", "レシートを捨てるのは不自然。", "「私には関係ない」は接客として不適切。", "急ぐ理由はない。"],
        "make a note of ～＝～を書き留める",
        [["直前", "電話番号はレシートにある。"], ["応答", "{{I'll make a note of it.}}（控えておきます）"]]),
      ch("k8", 2, KAIWA, "空所( 8 )に入る最も適切なものを選べ。", ["Don't worry about it.", "You're welcome to it.", "I hope so.", "Help yourself."], 0,
        ["正解。おわびへの返事。These things happen.（よくあることです）と合う。", "「どうぞご自由に」は物をゆずるときの表現。", "おわびへの返事として合わない。", "食べ物などをすすめる表現。"],
        "おわびへの返事は Don't worry about it.",
        [["直前", "{{I apologize for the trouble.}}"], ["返事", "{{Don't worry about it.}} These things happen。"]]),
      ch("k9", 1, KAIWA, "空所( 9 )に入る最も適切なものを選べ。", ["Have a nice day.", "Nice to meet you, too.", "I beg your pardon?", "Here's your change."], 0,
        ["正解。接客の締めのあいさつ。", "初対面のあいさつへの返しで、ここでは合わない。", "聞き返す場面ではない。", "支払いはしていない（取り寄せの予約だけ）。"],
        "会話の締めのあいさつ",
        [["場面", "{{Thank you for understanding.}} で話をまとめている。"], ["締め", "{{Have a nice day.}}"]]),
    ],
  ),
  S(
    3,
    "interview",
    KAIWA,
    "アルバイトの面接",
    "次の会話文を読み、空所に入る最も適切なものを選べ。",
    "A Job Interview at a Café",
    `Manager: Thanks for coming in, Ken. Please have a seat.
Ken: Thank you. ( 1 )
Manager: So, why are you interested in working here?
Ken: I come here often, and ( 2 )
Manager: That's nice to hear. Have you ever worked in a restaurant or café before?
Ken: ( 3 ) But I worked at a bookstore for a year, so I'm used to dealing with customers.
Manager: That experience will be useful. ( 4 )
Ken: Three, I think. I have classes on Monday and Wednesday mornings, but ( 5 )
Manager: Weekends are our busiest time, so ( 6 )
Ken: Great. ( 7 )
Manager: Just bring comfortable shoes. We'll give you an apron. ( 8 )
Ken: ( 9 ) Thank you so much.`,
    6,
    [
      ch("k1", 1, KAIWA, "空所( 1 )に入る最も適切なものを選べ。", ["It's nice to meet you.", "See you again soon.", "I'm sorry, I'm leaving now.", "It was nothing."], 0,
        ["正解。面接のはじめのあいさつ。", "別れのあいさつで、はじめに言うのは不自然。", "座るようすすめられた直後に帰るのは矛盾する。", "お礼への返事（どういたしまして）で、ここでは合わない。"],
        "会話のはじめのあいさつ",
        [["場面", "{{Please have a seat.}}（面接のはじまり）"], ["あいさつ", "{{It's nice to meet you.}}"]]),
      ch("k2", 2, KAIWA, "空所( 2 )に入る最も適切なものを選べ。", ["I've always liked the friendly atmosphere.", "I'd like to complain about the service.", "it's my first time here.", "I've forgotten my wallet."], 0,
        ["正解。働きたい理由。次の That's nice to hear. と合う。", "苦情は志望理由にならず、nice to hear とも合わない。", "I come here often と矛盾する。", "志望理由にならない。"],
        "志望理由＋相手の「うれしい」",
        [["質問", "{{why are you interested in working here?}}"], ["次の返事", "{{That's nice to hear.}} → 店をほめる内容。"]]),
      ch("k3", 2, KAIWA, "空所( 3 )に入る最も適切なものを選べ。", ["No, not exactly.", "Yes, for five years.", "I'd love to.", "Here you are."], 0,
        ["正解。飲食店の経験はない、But 本屋の経験はある、とつながる。", "But 以下で別の経験を出しているので、Yes とは合わない。", "経験の有無への答えにならない。", "物をわたす表現。"],
        "But のあとで「別の経験」を出している",
        [["質問", "Have you ever worked in a restaurant or café?"], ["次の文", "{{But}} I worked at a bookstore → 飲食店は {{No}}。"]]),
      ch("k4", 1, KAIWA, "空所( 4 )に入る最も適切なものを選べ。", ["How many days a week can you work?", "How long have you been here today?", "Why did you quit school?", "What did you have for lunch?"], 0,
        ["正解。次の Three, I think.（週3日）と、授業の予定の説明に合う。", "Three だけでは今日いる時間の答えとして不自然で、授業の話ともつながらない。", "学校をやめたのではない（授業がある）。", "面接の質問として不自然。"],
        "Three ＋ 授業の予定 → 週何日か",
        [["次の返事", "{{Three, I think.}} I have classes on …"], ["逆算", "{{How many days a week}} can you work?"]]),
      ch("k5", 2, KAIWA, "空所( 5 )に入る最も適切なものを選べ。", ["I'm free most afternoons and on weekends.", "I can't work at all.", "I have classes every day.", "I don't know my schedule."], 0,
        ["正解。月・水の午前は授業、but ほかは空いている。次の Weekends are our busiest time と合う。", "Three（週3日）と矛盾する。", "授業は月・水の午前だけ、と言った直後で矛盾する。", "授業の曜日を言ったばかりで矛盾する。"],
        "but のあとは「働ける時間」",
        [["前半", "授業は Monday and Wednesday mornings。"], ["but 以下", "{{free most afternoons and on weekends}} → 店長が週末の話を続ける。"]]),
      ch("k6", 1, KAIWA, "空所( 6 )に入る最も適切なものを選べ。", ["that would be a big help.", "we don't need anyone then.", "we close on weekends.", "you can take weekends off."], 0,
        ["正解。週末がいちばん忙しい → so 週末に入れるのは助かる。", "いちばん忙しいのに人がいらないは矛盾する。", "週末がいちばん忙しいのに閉店は矛盾する。", "忙しい時期に休んでいいは so の結果として合わない。"],
        "busiest time → so 助かる",
        [["原因", "{{Weekends are our busiest time}}。"], ["結果", "so {{that would be a big help}}。"]]),
      ch("k7", 2, KAIWA, "空所( 7 )に入る最も適切なものを選べ。", ["Is there anything I should prepare before starting?", "Do I have to come to the interview?", "Can I start working last month?", "Do you serve coffee here?"], 0,
        ["正解。次の Just bring comfortable shoes.（持ち物の答え）と合う。", "今まさに面接中。", "last month は過去で、これから働くことと合わない。", "よく来る店なので知っているはず。答えともつながらない。"],
        "Just bring ～ ← 準備するものの質問",
        [["次の返事", "{{Just bring comfortable shoes.}}"], ["逆算", "{{anything I should prepare}}？"]]),
      ch("k8", 2, KAIWA, "空所( 8 )に入る最も適切なものを選べ。", ["Could you come in for training next Saturday?", "Could you bring your own apron?", "Have you ever been to a café?", "Did you enjoy working at the bookstore?"], 0,
        ["正解。次の Yes, I'll be there.（行きます）と合う。", "We'll give you an apron と言った直後で矛盾する。", "よく来ると言っている。I'll be there ともつながらない。", "I'll be there とつながらない。"],
        "I'll be there ← 来られるかの依頼",
        [["次の返事", "{{Yes, I'll be there.}}"], ["逆算", "日時と場所への誘い＝{{come in for training next Saturday}}。"]]),
      ch("k9", 1, KAIWA, "空所( 9 )に入る最も適切なものを選べ。", ["Yes, I'll be there.", "No, I've never had one.", "I'm afraid I can't hear you.", "It doesn't matter who comes."], 0,
        ["正解。研修への誘いを受け、Thank you so much. で締める。", "研修への誘いの答えにならない。", "聞こえないなら Thank you so much. と続かない。", "自分が行くかどうかの答えにならない。"],
        "誘いを受けて礼を言う",
        [["直前", "研修に来られるかの依頼。"], ["答え", "{{Yes, I'll be there.}} Thank you so much。"]]),
    ],
  ),
];

// =====================================================================
// 第4問　文法・語法
// =====================================================================

const GLEAD = "次の各英文の空所に入る最も適切なものを選べ（語形を変える問い・並べかえの問いは、その指示にしたがえ）。";

const T4: ExamPoolSection[] = [
  S(
    4,
    "gram-a",
    G("kateiho"),
    "文法・語法（1）",
    GLEAD,
    undefined,
    "各問いは独立している。英文の空所は（　）で示す。",
    10,
    [
      ch("kateiho", 2, G("kateiho"), "If I (　) more time yesterday, I would have finished the report.", ["had had", "have had", "would have", "had"], 0,
        ["正解。過去の事実に反する仮定は if 節が過去完了（had had）。", "現在完了は仮定法の if 節に使わない。", "if 節に would は使わない。", "had（過去形）は現在の事実に反する仮定。yesterday と合わない。"],
        "仮定法過去完了：If S had p.p., S would have p.p.",
        [["時", "{{yesterday}}・主節 {{would have finished}} → 過去の仮定。"], ["形", "if 節は過去完了 {{had had}}。"]]),
      ch("putoff", 1, "h-eng-vocab-jukugo", "The meeting was put (　) until next week because the manager was sick.", ["off", "on", "up", "out"], 0,
        ["正解。put off＝延期する。until next week と合う。", "put on＝着る。", "put up＝掲げる・泊める。", "put out＝消す。"],
        "put off＝postpone（延期する）",
        [["手がかり", "{{until next week}}・病気 → 延期。"], ["熟語", "{{put off}}＝postpone。"]]),
      ch("lookforward", 1, G("domeishi"), "I'm looking forward to (　) you at the conference.", ["seeing", "see", "be seen", "have seen"], 0,
        ["正解。look forward to の to は前置詞なので動名詞。", "to のあとに原形は誤り（不定詞ではない）。", "受け身にする理由がなく、to の後にも合わない。", "to のあとに have seen は誤り。"],
        "look forward to ～ing（to は前置詞）",
        [["見分け", "look forward {{to}} の to は {{前置詞}}。"], ["形", "前置詞のあとは名詞・動名詞 → {{seeing}}。"]]),
      ch("where", 2, G("kanfuku"), "This is the town (　) my grandfather was born.", ["where", "which", "what", "that"], 0,
        ["正解。後ろが完全な文（was born）なので関係副詞 where。", "which なら was born in のように前置詞が必要。", "what は先行詞をとらない。", "that だけでは前置詞が足りない（the town that … was born in なら可）。"],
        "後ろが完全な文 → 関係副詞",
        [["後ろを見る", "my grandfather was born は {{欠けた要素がない}}。"], ["選ぶ", "場所の先行詞＋完全な文 → {{where}}。"]]),
      ch("since", 1, G("setsuzokushi"), "She has been working at the company (　) she graduated.", ["since", "for", "during", "by"], 0,
        ["正解。現在完了進行形＋since（～以来）＋節。", "for は期間を表す前置詞で、節をとらない。", "during は前置詞で、節をとらない。", "by は「～までに」で、継続と合わない。"],
        "現在完了＋since S V（～して以来）",
        [["時制", "{{has been working}}＝ずっと続いている。"], ["形", "あとに節（she graduated）→ 接続詞 {{since}}。"]]),
      ch("notuntil", 3, G("tokushu"), "Not until the next morning (　) the mistake.", ["did he notice", "he noticed", "he did notice", "noticed he"], 0,
        ["正解。否定語句が文頭に出ると倒置（疑問文の語順）。", "倒置していない。", "do を使った強調で、倒置ではない。", "一般動詞はそのまま主語の前に出せない。"],
        "否定語句が文頭 → 疑問文の語順",
        [["文頭", "{{Not until}} ～ が前に出ている。"], ["倒置", "一般動詞の過去は {{did + S + 原形}}。"]]),
      ch("themore", 2, G("hikaku"), "The more you practice, (　) you will become.", ["the better", "better", "the best", "best"], 0,
        ["正解。the 比較級 ～, the 比較級 …＝～すればするほど…。", "the がない。", "最上級は使わない。", "the もなく最上級。"],
        "the 比較級, the 比較級",
        [["前半", "{{The more}} you practice。"], ["後半", "同じ形で {{the better}} you will become。"]]),
      ch("forto", 2, G("futeishi"), "It is necessary for every student (　) the rules.", ["to follow", "following", "follows", "followed"], 0,
        ["正解。It is ～ for 人 to do。", "形式主語 it の真主語は to 不定詞。", "動詞の形のままでは文が成り立たない。", "過去形・過去分詞は合わない。"],
        "It is 形容詞 for 人 to do",
        [["形", "{{It is necessary for}} 人 ＋ 空所。"], ["真主語", "形式主語 it の中身 → {{to follow}}。"]]),
      ch("seen", 2, G("bunshikobun"), "(　) from a distance, the rock looks like a human face.", ["Seen", "Seeing", "To see", "Having seen"], 0,
        ["正解。主語 the rock は「見られる」側なので過去分詞の分詞構文。", "Seeing だと岩が「見る」ことになる。", "To see（見るために）では意味が通らない。", "Having seen も岩が見る側になる。"],
        "分詞構文は主語との関係で能動・受動を決める",
        [["主語", "文の主語は {{the rock}}。"], ["関係", "岩は見られる側 → 受け身の {{Seen}}。"]]),
      tw("tw-built", 2, G("bunshi"), "（　）内の語を適切な形にして1語で書け。\nThe bridge (build) ten years ago is still in good condition.", ["built"],
        "名詞を後ろから修飾する過去分詞",
        [["関係", "橋は「建てられた」側 → 受け身の意味。"], ["形", "build の過去分詞は {{built}}（buildt ではない）。"]]),
      tw("tw-beautiful", 1, G("keiyoshi"), "（　）内の語を適切な形にして1語で書け。\nI have never seen such a (beauty) sunset.", ["beautiful"],
        "名詞を修飾するのは形容詞",
        [["位置", "such a ＋ 空所 ＋ 名詞 sunset → {{形容詞}}。"], ["形", "beauty → {{beautiful}}。"]]),
      od("od-what", 2, G("bunkei"), "日本文に合うように与えられた語句を並べかえよ。\n「なぜ気が変わったのですか。」", ["What", "made", "you", "change", "your mind"],
        "無生物主語：What made you ～?",
        [["発想", "「何があなたに～させたのか」と考える。"], ["形", "{{make O 原形}}：What made you change your mind?"]]),
      ch("number", 2, G("meishi"), "The number of tourists visiting this city (　) increasing every year.", ["is", "are", "have", "be"], 0,
        ["正解。主語は The number（数）で単数。", "tourists に合わせた誤り。主語は number。", "have increasing は形として成り立たない。", "原形は使えない。"],
        "the number of ～ は単数、a number of ～ は複数",
        [["主語", "{{The number}} of tourists → 中心は number。"], ["一致", "単数 → {{is}} increasing。"]]),
    ],
    "text",
  ),
  S(
    4,
    "gram-b",
    G("kanryo"),
    "文法・語法（2）",
    GLEAD,
    undefined,
    "各問いは独立している。英文の空所は（　）で示す。",
    10,
    [
      ch("wish", 2, G("kateiho"), "I wish I (　) speak French as well as you.", ["could", "can", "will", "have"], 0,
        ["正解。I wish＋仮定法過去（現在の事実に反する願望）。", "I wish のあとに現在形は使わない。", "will は仮定法にならない。", "have speak は形として成り立たない。"],
        "I wish＋仮定法過去＝今～ならいいのに",
        [["形", "{{I wish}} のあとは仮定法。"], ["時", "今できないことへの願い → 過去形 {{could}}。"]]),
      ch("bythetime", 2, G("kanryo"), "By the time we arrived at the station, the train (　).", ["had already left", "has already left", "already leaves", "will have left"], 0,
        ["正解。過去のある時点（着いた時）より前に完了 → 過去完了。", "現在完了は過去の時点を基準にできない。", "現在形は合わない。", "未来完了は未来の時点が基準。"],
        "過去の基準時より前 → had p.p.",
        [["基準", "{{we arrived}}（過去）が基準。"], ["形", "それより前に出発 → {{had already left}}。"]]),
      ch("only-that", 2, G("kandai"), "He is the only person (　) I can trust completely.", ["that", "what", "whose", "where"], 0,
        ["正解。先行詞に the only がつくと that が好まれる。trust の目的語が欠けている。", "what は先行詞をとらない。", "whose のあとには名詞が必要。", "where は場所で、目的語の欠けた文とも合わない。"],
        "the only＋先行詞 → that",
        [["後ろ", "I can trust ＿ → {{目的語が欠けている}}。"], ["先行詞", "{{the only person}} → 関係代名詞 {{that}}。"]]),
      ch("should-have", 3, G("jodoshi"), "You (　) have told her the truth; she was very upset to find out later.", ["should", "must", "can", "will"], 0,
        ["正解。should have p.p.＝～すべきだったのに（しなかった）。あとで知って動揺した、と合う。", "must have p.p. は「～したにちがいない」で、あとで知ったことと矛盾する。", "can have p.p. は肯定文では使わない。", "will have p.p. は未来完了で合わない。"],
        "should have p.p.＝～すべきだったのに",
        [["状況", "彼女はあとで知って {{upset}} → 本当のことを言わなかった。"], ["形", "過去への後悔・非難 → {{should have told}}。"]]),
      ch("goodat", 1, G("zenchishi"), "My sister is good (　) cooking.", ["at", "in", "for", "on"], 0,
        ["正解。be good at ～＝～が得意だ。", "be good in は一般的ではない。", "be good for ～ は「～に役立つ・～に良い」。", "on は合わない。"],
        "be good at ～＝～が得意",
        [["熟語", "{{be good at}} ～。"], ["区別", "be good {{for}} ～ は「～に良い」。"]]),
      ch("remember-to", 2, G("futeishi"), "Please remember (　) this letter on your way to school.", ["to mail", "mailing", "mail", "mailed"], 0,
        ["正解。remember to do＝（これから）忘れずに～する。", "remember ～ing は「～したことを覚えている」（過去）。", "原形は remember のあとに置けない。", "過去形・過去分詞は合わない。"],
        "remember to do（未来）／～ing（過去）",
        [["時", "on your way to school＝これからすること。"], ["形", "未来 → {{remember to mail}}。"]]),
      ch("translated", 2, G("judo"), "The novel (　) into many languages since it was published.", ["has been translated", "has translated", "was translating", "translates"], 0,
        ["正解。小説は「翻訳される」側＋since → 現在完了の受け身。", "能動態で、小説が翻訳する側になる。", "過去進行の能動で、since とも合わない。", "能動の現在形。"],
        "現在完了の受け身：have been p.p.",
        [["関係", "小説は {{翻訳される}} 側 → 受け身。"], ["時制", "{{since}} → 現在完了。合わせて {{has been translated}}。"]]),
      ch("although", 1, G("setsuzokushi"), "(　) it rained heavily, the game was not canceled.", ["Although", "Because", "Unless", "Since"], 0,
        ["正解。大雨なのに中止されなかった → 譲歩。", "因果関係が逆（大雨だから中止されなかった、は不自然）。", "「降らなければ」では意味が通らない。", "Since は理由。Because と同じく合わない。"],
        "予想と反対の結果 → 譲歩の接続詞",
        [["前後の関係", "大雨 ↔ {{中止されなかった}}（予想の反対）。"], ["接続詞", "{{Although}}（～だけれども）。"]]),
      ch("with-closed", 2, G("bunshi"), "With his eyes (　), he listened to the music.", ["closed", "closing", "close", "to close"], 0,
        ["正解。with O 過去分詞＝Oが～された状態で。目は「閉じられた」側。", "目が自分で閉じる動作をしていることになる。", "原形は with O のあとに置かない。", "to close では付帯状況にならない。"],
        "with O＋分詞（付帯状況）",
        [["形", "{{with}} his eyes ＋ 分詞。"], ["関係", "目は閉じられる側 → {{closed}}。"]]),
      ch("times", 2, G("hikaku"), "This box is three times (　) that one.", ["as large as", "larger as", "as larger than", "large as"], 0,
        ["正解。倍数＋as 原級 as。", "比較級と as はいっしょに使わない。", "as と than を混ぜた誤り。", "最初の as が足りない。"],
        "X times as 原級 as ～",
        [["形", "倍数（three times）＋ {{as 原級 as}}。"], ["確認", "比較級なら three times {{larger than}}（選択肢にない）。"]]),
      tw("tw-kindness", 1, G("meishi"), "（　）内の語を適切な形にして1語で書け。\nThank you for your (kind).", ["kindness"],
        "所有格＋名詞",
        [["位置", "your のあと → {{名詞}}。"], ["形", "kind → {{kindness}}。"]]),
      tw("tw-lay", 3, G("waho"), "（　）内の語を適切な形にして1語で書け。\nHe (lie) on the sofa all afternoon yesterday.", ["lay"],
        "lie（横たわる）-lay-lain",
        [["時", "{{yesterday}} → 過去形。"], ["活用", "自動詞 lie（横たわる）は {{lie-lay-lain}}。lied は「うそをついた」。"]]),
      od("od-noidea", 2, G("setsuzokushi"), "日本文に合うように与えられた語句を並べかえよ。\n「彼が何を言おうとしているのか、私にはさっぱりわからない。」", ["I", "have", "no idea", "what", "he", "is trying", "to say"],
        "have no idea＋間接疑問（平叙文の語順）",
        [["骨組み", "「さっぱりわからない」＝{{I have no idea}}。"], ["間接疑問", "{{what he is trying to say}}（S V の順）。"]]),
    ],
    "text",
  ),
  S(
    4,
    "gram-c",
    G("kandai"),
    "文法・語法（3）",
    GLEAD,
    undefined,
    "各問いは独立している。英文の空所は（　）で示す。",
    10,
    [
      ch("without", 2, G("kateiho"), "(　) your help, I could not have finished the work.", ["Without", "Unless", "Despite", "Because"], 0,
        ["正解。Without ～＝～がなければ（仮定法）。後ろが名詞だけでもよい。", "Unless は接続詞で、後ろに節が必要。", "Despite（～にもかかわらず）は意味が逆。", "Because は接続詞で後ろに節が必要（because of なら名詞）。"],
        "Without ～＝If it had not been for ～",
        [["主節", "{{could not have finished}} → 仮定法過去完了。"], ["条件", "名詞だけで「～がなければ」＝{{Without}}。"]]),
      ch("hasbeen", 2, G("kanryo"), "She (　) to Kyoto three times so far.", ["has been", "has gone", "went", "goes"], 0,
        ["正解。have been to ～＝～へ行ったことがある（経験）。", "has gone to は「行ってしまった（今いない）」で、回数と合わない。", "so far（これまでに）は現在完了と使う。", "現在形は合わない。"],
        "経験は have been to、完了・結果は have gone to",
        [["手がかり", "{{three times so far}} → 経験。"], ["形", "{{has been to}} Kyoto。"]]),
      ch("whether", 2, G("setsuzokushi"), "I don't know (　) he will come to the party or not.", ["whether", "that", "what", "unless"], 0,
        ["正解。whether ～ or not＝～かどうか。", "that では「かどうか」の意味にならず or not と合わない。", "what のあとは名詞の欠けた文が必要。", "unless は「～しないかぎり」で合わない。"],
        "whether ～ or not＝～かどうか",
        [["手がかり", "文末の {{or not}}。"], ["接続詞", "「～かどうか」＝{{whether}}。"]]),
      ch("whose", 2, G("kandai"), "The girl (　) mother is a doctor is my classmate.", ["whose", "who", "which", "whom"], 0,
        ["正解。the girl's mother の所有格 → whose。", "who のあとに名詞（mother）が続く形にならない。", "which は人以外で、所有格でもない。", "whom は目的格。"],
        "関係代名詞のあとに名詞 → whose",
        [["後ろ", "空所のすぐあとに {{mother}}（名詞）。"], ["意味", "少女の母 → 所有格 {{whose}}。"]]),
      ch("apologize", 1, G("zenchishi"), "He apologized (　) being late.", ["for", "to", "of", "with"], 0,
        ["正解。apologize (to 人) for ～＝～のことで（人に）謝る。", "to のあとは謝る相手。", "of は使わない。", "with は使わない。"],
        "apologize to 人 for 理由",
        [["形", "{{apologize to}} 人 {{for}} 理由。"], ["当てはめ", "being late は理由 → {{for}}。"]]),
      ch("assoonas", 1, G("jisei"), "I'll call you as soon as I (　) home.", ["get", "will get", "got", "getting"], 0,
        ["正解。時を表す副詞節では未来のことも現在形。", "副詞節の中では will を使わない。", "過去形は未来の内容に合わない。", "動詞の形になっていない。"],
        "時・条件の副詞節は未来でも現在形",
        [["節の種類", "{{as soon as}} ～＝時の副詞節。"], ["時制", "未来のことでも現在形 {{get}}。"]]),
      ch("nouse", 2, G("domeishi"), "It's no use (　) over spilt milk.", ["crying", "to cry", "cry", "cried"], 0,
        ["正解。It is no use ～ing＝～してもむだだ。", "It is no use のあとは動名詞が標準。", "原形は置けない。", "過去形・過去分詞は合わない。"],
        "It is no use ～ing＝～してもむだ",
        [["慣用表現", "{{It is no use ～ing}}。"], ["ことわざ", "覆水盆に返らず＝It's no use {{crying}} over spilt milk。"]]),
      ch("made-clean", 2, G("futeishi"), "She made her son (　) his room.", ["clean", "to clean", "cleaning", "cleaned"], 0,
        ["正解。使役の make O 原形。", "能動態の make O のあとに to は入らない（受け身なら was made to clean）。", "make O ～ing の形はとらない。", "息子は掃除する側なので過去分詞は合わない。"],
        "make O 原形（使役）",
        [["動詞", "{{make}}（使役）＋O＋{{原形}}。"], ["注意", "受け身なら He was made {{to}} clean … と to が出る。"]]),
      ch("hardly", 3, G("tokushu"), "Hardly had I sat down (　) the phone rang.", ["when", "than", "that", "then"], 0,
        ["正解。Hardly had S p.p. when ～＝～するとすぐに…。", "than は No sooner … than の組み合わせ。", "that は組み合わせにない。", "then は接続詞ではない。"],
        "Hardly … when／No sooner … than",
        [["組み合わせ", "{{Hardly}} … {{when}}（before も可）。"], ["区別", "{{No sooner}} … {{than}}。"]]),
      ch("suchan", 2, G("setsuzokushi"), "This is (　) interesting book that I read it twice.", ["such an", "so an", "such", "so"], 0,
        ["正解。such a(n) 形容詞＋名詞 that ～。", "so は so 形容詞 a 名詞 の語順（so interesting a book）。", "数えられる名詞の単数に an が足りない。", "so のあとに形容詞＋名詞は直接置けない。"],
        "such a 形容詞＋名詞／so 形容詞 a 名詞",
        [["後ろ", "interesting book（形容詞＋数えられる名詞）。"], ["形", "{{such an}} interesting book that ～。"]]),
      tw("tw-decision", 1, G("meishi"), "（　）内の語を適切な形にして1語で書け。\nThe (decide) to close the factory surprised everyone.", ["decision"],
        "the＋名詞 to do",
        [["位置", "The のあと・動詞 surprised の主語 → {{名詞}}。"], ["形", "decide → {{decision}}。"]]),
      tw("tw-held", 2, G("judo"), "（　）内の語を適切な形にして1語で書け。\nThe festival is (hold) every August.", ["held"],
        "受け身 be＋過去分詞",
        [["関係", "祭りは「開かれる」側 → 受け身。"], ["形", "hold-held-held → is {{held}}。"]]),
      od("od-remind", 2, G("bunkei"), "日本文に合うように与えられた語句を並べかえよ。\n「この写真を見ると、いつも子どものころを思い出す。」", ["This picture", "always", "reminds", "me", "of", "my childhood"],
        "無生物主語＋remind O of ～",
        [["発想", "「この写真が私に思い出させる」と考える。"], ["形", "{{remind O of ～}}、頻度の副詞 always は一般動詞の前。"]]),
    ],
    "text",
  ),
];

export const U_MEIJI_EIGO: UnivExam = {
  key: K,
  univ: "明治大学",
  kamoku: "英語",
  tier: "MARCH",
  order: 104,
  basis: "商学部の学部別入試の傾向を参考（80分・150点。長文読解2題・会話文・文法語法）",
  format: "大問4題・80分。社会・文化の長文2題（空所・同意語・内容一致・整序）と会話文、文法・語法の4択と語形変化。",
  minutes: 80,
  groups: ["語彙", "文法", "技能"],
  sections: [
    { title: "第1問　長文読解（社会・経済）", lead: READ, count: [7, 8], mix: [0.2, 0.5, 0.3], points: 45, prefer: "material", poolTag: `${K}:1` },
    { title: "第2問　長文読解（文化・科学）", lead: READ, count: [7, 8], mix: [0.2, 0.5, 0.3], points: 45, prefer: "material", poolTag: `${K}:2` },
    { title: "第3問　会話文", lead: "次の会話文を読み、空所に入る最も適切なものを選べ。", count: [5, 6], mix: [0.2, 0.5, 0.3], points: 30, prefer: "material", poolTag: `${K}:3` },
    { title: "第4問　文法・語法", lead: GLEAD, count: [8, 10], mix: [0.2, 0.5, 0.3], points: 30, prefer: "material", poolTag: `${K}:4` },
  ],
  pool: [...T1, ...T2, ...T3, ...T4],
};
