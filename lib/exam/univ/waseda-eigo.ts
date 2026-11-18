import type { UnivExam } from "./types";
import type { ExamPoolSection } from "../pool/types";
import type { Question } from "@/lib/moshi/types";

// 早稲田大学型 英語（早慶上智）。文化構想学部（文学部もほぼ同じ形式）の傾向を参考にした練習用の形式。
// 参考にした形式の情報（問題文・設問文・英文は使っていない）:
//   https://study-search.jp/columns/327  （学部別の試験時間・配点・大問構成）
//   https://www.toshin.com/kanamachi/post/2024/02/24/2024%e5%b9%b4%e5%ba%a6%e6%97%a9%e7%a8%b2%e7%94%b0%e5%a4%a7%e5%ad%a6%e6%96%87%e5%8c%96%e6%a7%8b%e6%83%b3%e5%ad%a6%e9%83%a8%e3%81%ae%e5%95%8f%e9%a1%8c%e5%88%86%e6%9e%90%ef%bc%81/  （文化構想学部の問題分析）
//   https://passnavi.obunsha.co.jp/article/keisetsu_jidai/2602/02/  （出題傾向の解説）
// 文化構想学部: 90分・75点・大問5題。Ⅰ 長文の空所補充（語句）、Ⅱ 長文の内容一致（長さのちがう英文）、
// Ⅲ 段落の空所に文を補う、Ⅳ 会話文の空所補充（口語表現）、Ⅴ 英文の要旨を英語1文でまとめる。
// 英文はすべてこの模試のために書き下ろしたもの（人物・場面は架空）。

const K = "waseda-eigo";
type St = [string, string][];

const steps = (s: St) => s.map(([title, body]) => ({ title, body }));
const sec = (d: 1 | 2 | 3, base: number) => base + (d - 1) * 15;
const pts = (d: 1 | 2 | 3) => (d === 3 ? 3 : 2);

const CHOBUN = "h-eng-skill-chobun";
const KAIWA = "h-eng-vocab-kaiwa";
const VOCAB = "h-eng-vocab-2000";
const JUKUGO = "h-eng-vocab-jukugo";
const G = (s: string) => `h-eng-gram-${s}`;

/** 4択。options の先頭が正解（画面では並べかえる） */
function ch(id: string, d: 1 | 2 | 3, unit: string, prompt: string, options: string[], why: string[], point: string, st: St, base = 60): Question {
  return {
    id,
    type: "B",
    difficulty: d,
    points: pts(d),
    seconds: sec(d, base),
    skill: d === 1 ? "知識・技能" : "思考・判断・表現",
    unit,
    prompt,
    answer: { kind: "choice", options, correct: 0, why },
    point,
    steps: steps(st),
  };
}

/** 空所補充（語句・会話） */
const bl = (id: string, d: 1 | 2 | 3, unit: string, label: string, options: string[], why: string[], point: string, st: St) =>
  ({ ...ch(id, d, unit, `空所（ ${label} ）に入る最も適切なものを選べ。`, options, why, point, st, 40), skill: "知識・技能" as const });

/** 文の補充 */
const sn = (id: string, d: 1 | 2 | 3, label: string, options: string[], why: string[], point: string, st: St) =>
  ch(id, d, CHOBUN, `空所［ ${label} ］に入る最も適切な文を選べ。`, options, why, point, st, 70);

function S(n: number, id: string, unit: string, title: string, body: string, questions: Question[], pick: number, lead = "次の英文を読み、問いに答えよ。"): ExamPoolSection {
  return {
    unit,
    tag: `${K}:${n}`,
    section: {
      id: `we-${id}`,
      title,
      lead,
      style: "reading",
      examOnly: true,
      pick,
      material: [{ kind: "passage", lang: "en", body }],
      questions,
    },
  };
}

// =====================================================================
// 第1問　長文の空所補充（語彙・語法・つなぎの語）
// =====================================================================

const T1: ExamPoolSection[] = [
  S(1, "maps", VOCAB, "地図と世界の見え方",
    `Every map is a kind of argument. To show the round surface of the earth on a flat sheet of paper, a mapmaker must ( a ) something: shapes, distances, or the relative sizes of land masses. No projection can preserve all of them at once. The projection published by Gerardus Mercator in 1569 is a famous example. It was designed for sailors, and its great ( b ) was that a line of constant compass direction appears as a straight line on the map. ( c ), the price of this convenience was a growing distortion of area toward the poles. On a Mercator map, Greenland looks roughly as large as Africa, ( d ) Africa is in fact about fourteen times larger.

For centuries, such distortions mattered little to most people, because few ever looked at a world map. Today, however, maps surround us, and the images they present can quietly shape the way we ( e ) the world. A student who grows up looking at one kind of map may come to think of some regions as larger, and perhaps more important, than they really are. This does not mean that mapmakers set out to deceive anyone. It means that every map reflects choices, and that those choices are ( f ) visible to the people who use the map.

Digital maps have added a new layer to this old problem. When we search for a restaurant on a phone, the map we see is not the same map that someone else sees. It is ( g ) to our location, our past searches, and sometimes the businesses that have paid to be shown. The map has become personal, and in becoming personal it has become harder to question. We rarely ask what has been left out, because we do not know what we are missing.

None of this is a reason to stop using maps. It is a reason to read them ( h ) we read any other text: with attention to who made it, for what purpose, and at what cost. A map that ( i ) us the way home is a remarkable tool. A map that tells us what the world is like deserves a second look.`,
    [
      bl("a", 2, VOCAB, "a", ["sacrifice", "preserve", "multiply", "imitate"],
        ["正解。直後の「すべてを同時には保てない」から、何かを「犠牲にする」。", "直後の No projection can preserve all of them と逆になる。", "「増やす」では意味が通らない。", "「まねる」では意味が通らない。"],
        "直後の文が言いかえのヒント", [["後ろを読む", "次の文 {{No projection can preserve all of them}} ＝ すべては保てない。"], ["語を選ぶ", "だから何かを {{sacrifice}}（犠牲に）しなければならない。"]]),
      bl("b", 1, VOCAB, "b", ["advantage", "defect", "origin", "expense"],
        ["正解。船乗りのために作られ、方位が直線になるのは「利点」。", "「欠点」は次の文の the price（代償）の側で、ここでは逆。", "「起源」では内容に合わない。", "「費用」では内容に合わない。"],
        "長所→（逆接）→代償の流れ", [["流れ", "船乗り向けの長所を述べ、次の文で {{the price of this convenience}}（代償）を述べる。"], ["語", "ここは長所＝{{advantage}}。"]]),
      bl("c", 1, G("setsuzokushi"), "c", ["However", "Therefore", "Moreover", "For instance"],
        ["正解。長所（convenience）から代償（price）へ、内容が逆になる。", "「したがって」は因果。長所の結果が代償になるわけではない。", "「さらに」は同じ方向の追加。", "「たとえば」は具体例。"],
        "長所→短所は逆接の However", [["前後の関係", "前：方位が直線になる利点。後：{{面積のゆがみ}}という代償。"], ["つなぎ", "逆の内容なので {{However}}。"]]),
      bl("d", 2, G("setsuzokushi"), "d", ["although", "because", "unless", "so that"],
        ["正解。「同じくらいに見えるが、実際は14倍」という譲歩・対比。", "理由ではない。", "「〜でない限り」では意味が通らない。", "目的ではない。"],
        "見かけと事実の食いちがい＝although", [["前後", "見かけ：同じくらいの大きさ。事実：{{fourteen times larger}}。"], ["つなぎ", "食いちがいを表す {{although}}（〜だけれども）。"]]),
      bl("e", 2, VOCAB, "e", ["perceive", "invent", "govern", "abandon"],
        ["正解。地図の像が世界の「とらえ方」を形づくる。直後の文も、地域を実際より大きく思う例。", "世界を「発明する」では意味が通らない。", "「統治する」では意味が通らない。", "「捨てる」では意味が通らない。"],
        "shape the way we perceive＝見方を形づくる", [["例を読む", "次の文は、ある地域を {{実際より大きく思う}} という例。"], ["語", "世界の見え方＝the way we {{perceive}} the world。"]]),
      bl("f", 2, VOCAB, "f", ["rarely", "always", "deliberately", "equally"],
        ["正解。地図をつくるときの選択は、使う人には「めったに見えない」。quietly（知らないうちに）とつながる。", "「いつも見える」なら、知らないうちに見方が形づくられることはない。", "「わざと見える」では意味が通らない。", "「等しく見える」では意味が通らない。"],
        "quietly shape と合う否定の副詞を選ぶ", [["前の段落", "地図は {{quietly}}（気づかないうちに）見方を形づくる。"], ["語", "だから選択は {{rarely visible}}（ほとんど見えない）。"]]),
      bl("g", 2, VOCAB, "g", ["tailored", "opposed", "compared", "reduced"],
        ["正解。be tailored to 〜＝〜に合わせて作られる。位置や検索の履歴に合わせた「個人向け」の地図。", "be opposed to＝〜に反対する。意味が通らない。", "be compared to＝〜にたとえられる。意味が通らない。", "be reduced to＝〜に減らされる。意味が通らない。"],
        "be tailored to＝〜に合わせて作られる", [["手がかり", "次の文 {{The map has become personal}}。"], ["語", "人ごとに合わせる＝{{tailored to}}。"]]),
      bl("h", 3, G("setsuzokushi"), "h", ["as", "than", "unless", "whether"],
        ["正解。接続詞の as＝〜するように。「ほかの文章を読むように地図を読む」。", "than は比較級のあとに使う。", "「〜でない限り」では意味が通らない。", "「〜かどうか」では意味が通らない。"],
        "接続詞 as＝〜するように（様態）", [["形", "read them ( ) we read any other text。前に比較級はない。"], ["意味", "「ほかの文章を読む {{ように}}」＝様態の {{as}}。"]]),
      bl("i", 3, G("bunkei"), "i", ["shows", "explains", "says", "speaks"],
        ["正解。show＋人＋もの（第4文型）。show us the way home＝家への道を示す。", "explain は人を直後に置けない（explain the way to us）。", "say は人を直後に置けない。", "speak は「人に道を」の形をとらない。"],
        "show＋人＋物の第4文型。explain・say は不可", [["形を見る", "( ) {{us the way home}}＝動詞＋人＋もの。"], ["第4文型をとる動詞", "{{show}} は可。explain・say は人を直後に置けない（explain it to us）。"]]),
    ], 6),
  S(1, "borrowing", VOCAB, "借用語と言語の変化",
    `Languages are rarely as pure as their speakers imagine. English, for example, has ( a ) words from almost every language its speakers have come into contact with. After the Norman Conquest of 1066, French became the language of the ruling class in England for several centuries, and thousands of French words entered English. A well-known ( b ) of this history can still be found at the dinner table. The names of many farm animals, such as cow, pig, and sheep, come from Old English, ( c ) the names of their meat, beef, pork, and mutton, come from French. The people who raised the animals spoke English; the people who ate the meat often spoke French.

Borrowing is not a sign of weakness in a language. ( d ), it is one of the main ways in which a language grows. A new word usually arrives together with a new thing or a new idea, and it fills a gap that speakers had not ( e ) existed until then. Japanese offers a clear example. Over many centuries it took in a vast number of words from Chinese, and in more recent times it has absorbed words from Portuguese, Dutch, and English. Some of these words have been used for so long that few speakers ( f ) them as foreign at all.

What happens to a word after it is borrowed is often more interesting than the borrowing itself. Words change their sounds to fit the new language, and they frequently change their meanings as well. A word that once ( g ) a broad idea may come to refer to something very specific, or the other way around. In this sense, a borrowed word is less like a guest and more like an immigrant: it settles down, adapts to local customs, and eventually becomes difficult to ( h ) from those who were born there.

Some people worry that too many borrowed words will damage their language. History suggests that such fears are usually ( i ). Languages that borrow freely have not disappeared; they have simply become richer.`,
    [
      bl("a", 1, VOCAB, "a", ["borrowed", "protected", "rejected", "concealed"],
        ["正解。borrow A from B＝BからAを借りる。続く文で何千ものフランス語の語が入ったとある。", "「守った」では from の意味が通らない。", "「拒んだ」は続く内容（多くの語が入った）と逆。", "「隠した」では意味が通らない。"],
        "borrow A from B＝BからAを借りる", [["形", "has ( ) words {{from}} almost every language。"], ["内容", "続く文で {{thousands of French words entered English}}。借りた＝borrowed。"]]),
      bl("b", 2, VOCAB, "b", ["reminder", "contradiction", "cause", "denial"],
        ["正解。食卓の語に今も残る、歴史を「思い出させるもの」。", "歴史と「矛盾するもの」ではなく、歴史を示すもの。", "食卓の語が歴史の「原因」ではない。", "「否定」では意味が通らない。"],
        "a reminder of＝〜を思い出させるもの", [["内容", "動物の名と肉の名のちがいが、{{1066年以後の歴史}}を今に伝える。"], ["語", "{{reminder}}＝思い出させるもの・なごり。"]]),
      bl("c", 1, G("setsuzokushi"), "c", ["while", "because", "so", "unless"],
        ["正解。対比の while（一方で）。動物の名は英語、肉の名はフランス語。", "理由ではない。", "結果ではない。", "条件ではない。"],
        "対比の while＝〜する一方で", [["前後", "動物の名＝{{Old English}}、肉の名＝{{French}}。"], ["つなぎ", "2つを並べて比べる {{while}}。"]]),
      bl("d", 2, G("setsuzokushi"), "d", ["On the contrary", "In addition", "As a result", "Likewise"],
        ["正解。「弱さのしるしではない。それどころか、成長の主な方法だ」。否定のあとに逆の主張を置く。", "前の否定の文に「付け加える」関係ではない。", "因果ではない。", "「同様に」では否定と主張がつながらない。"],
        "not A. On the contrary, B＝それどころか", [["前の文", "Borrowing is {{not}} a sign of weakness。"], ["つなぎ", "否定を受けて逆の主張を出す {{On the contrary}}。"]]),
      bl("e", 3, VOCAB, "e", ["realized", "denied", "hoped", "pretended"],
        ["正解。a gap that speakers had not realized existed＝話し手が存在に気づいていなかった空白。", "「存在を否定していなかった」では意味が通らない。", "hope は「存在していたと望む」の形にならない。", "「存在するふりをしていなかった」では意味が通らない。"],
        "関係詞の後ろに動詞が2つ（realized＋existed）", [["構造", "a gap that speakers had not ( ) {{existed}}：that は existed の主語。"], ["意味", "新しい語が来るまで、空白が {{あると気づかなかった}}＝realized。"]]),
      bl("f", 2, VOCAB, "f", ["recognize", "confuse", "prohibit", "compose"],
        ["正解。recognize A as B＝AをBと認識する。長く使われて、外来語と気づく人が少ない。", "「混同する」では as foreign とつながらない。", "「禁止する」では意味が通らない。", "「作曲する・組み立てる」では意味が通らない。"],
        "recognize A as B＝AをBと認める", [["内容", "so long that…＝{{とても長く使われたので}}。"], ["語", "外来語と {{recognize}}（気づく）人が少ない。"]]),
      bl("g", 2, G("bunkei"), "g", ["expressed", "belonged", "consisted", "happened"],
        ["正解。express は目的語 a broad idea をとる他動詞。", "belong は自動詞（belong to）。目的語をとらない。", "consist は自動詞（consist of）。", "happen は自動詞。"],
        "目的語をとれるのは他動詞だけ", [["形", "A word that once ( ) {{a broad idea}}＝空所の後に目的語。"], ["動詞", "他動詞は {{expressed}} だけ。belong・consist・happen は自動詞。"]]),
      bl("h", 2, VOCAB, "h", ["distinguish", "protect", "obtain", "invite"],
        ["正解。distinguish A from B＝AをBと区別する。移民のように、生まれた人と区別がつかなくなる。", "protect A from B は「Bから守る」で意味が通らない。", "「得る」では意味が通らない。", "「招く」では意味が通らない。"],
        "distinguish A from B＝区別する", [["比喩", "借用語＝{{immigrant}}。地元になじむ。"], ["語", "最後には生まれた人と {{区別できない}}＝difficult to distinguish from。"]]),
      bl("i", 1, VOCAB, "i", ["exaggerated", "justified", "confirmed", "accurate"],
        ["正解。最後の文「よく借りる言語は消えず、豊かになった」から、心配は「大げさ」。", "「正当な」は最後の文と逆。", "「確かめられた」は最後の文と逆。", "「正確な」は最後の文と逆。"],
        "次の文が、心配が当たっていないことを示す", [["次の文", "{{have not disappeared; they have simply become richer}}。"], ["語", "心配は当たらない＝{{exaggerated}}（大げさ）。"]]),
    ], 6),
  S(1, "boredom", VOCAB, "退屈の価値",
    `Not long ago, waiting was an ordinary part of life. People waited for buses, for appointments, for the kettle to boil, and during those empty minutes their minds ( a ). Today, such moments have almost disappeared. The smartphone in our pocket ( b ) that we never need to be bored again, and most of us accept the offer without a second thought.

It is worth asking what we lose in the exchange. Researchers who study the mind have suggested that boredom is not simply an unpleasant state to be ( c ) as quickly as possible. It may serve a purpose. When the outside world fails to hold our attention, the mind turns inward. It replays past events, imagines future ones, and makes connections that a busy mind would ( d ). Some studies have found that people who first complete a dull task, such as copying numbers from a list, later produce more original ideas than those who go straight to the creative task. The findings are not ( e ) conclusive, but they point in an interesting direction.

If boredom has value, then the habit of filling every gap with a screen may come at a hidden cost. The cost is hard to notice ( f ) it consists of things that never happen: the idea that does not arrive, the plan that is never made, the problem that is never quietly solved in the back of the mind. We are not aware of missing what we have never had.

This is not an argument against technology. A phone can connect us with friends, teach us a new skill, or ( g ) us from real danger. The point is ( h ) that a tool so convenient deserves to be used on purpose rather than by habit. Leaving the phone in a bag while waiting for a train may feel strange at first. Yet the slight discomfort that follows may be ( i ) the mind needs in order to wander somewhere new.`,
    [
      bl("a", 2, VOCAB, "a", ["wandered", "surrendered", "shrank", "interrupted"],
        ["正解。待つあいだ、心は「さまよった」。最後の文 the mind … wander somewhere new とも対応する。", "「降伏した」では意味が通らない。", "「縮んだ」では意味が通らない。", "interrupt は他動詞で目的語が必要。"],
        "最後の文の wander と対応する", [["文脈", "{{empty minutes}}（空いた時間）に心はどうしたか。"], ["対応", "最後の文 the mind … {{wander}}。ここも wandered。"]]),
      bl("b", 1, VOCAB, "b", ["promises", "regrets", "doubts", "denies"],
        ["正解。スマホは「二度と退屈しなくてよい」と約束し、私たちはその申し出（the offer）を受け入れる。", "「後悔する」では the offer とつながらない。", "「疑う」では the offer とつながらない。", "「否定する」では意味が逆になる。"],
        "後ろの the offer（申し出）が手がかり", [["後ろ", "most of us accept {{the offer}}＝申し出を受け入れる。"], ["語", "申し出になるのは {{promises}}（約束する）。"]]),
      bl("c", 1, VOCAB, "c", ["escaped", "celebrated", "invented", "shared"],
        ["正解。不快な状態は、できるだけ早く「逃れる」もの。", "不快な状態を「祝う」は合わない。", "「発明する」は合わない。", "「分かち合う」は合わない。"],
        "unpleasant state → 逃れたいもの", [["前", "{{an unpleasant state}}＝不快な状態。"], ["語", "as quickly as possible とつながる {{escaped}}。"]]),
      bl("d", 2, VOCAB, "d", ["overlook", "establish", "require", "enjoy"],
        ["正解。退屈した心が作るつながりは、忙しい心なら「見落とす」もの。", "「確立する」では、忙しい心も同じことをすることになり、対比にならない。", "「必要とする」は合わない。", "「楽しむ」は合わない。"],
        "退屈な心と忙しい心の対比", [["対比", "退屈な心はつながりを作る ⇔ {{a busy mind}} は？"], ["語", "見落とす＝{{overlook}}。"]]),
      bl("e", 2, VOCAB, "e", ["yet", "already", "hardly", "seldom"],
        ["正解。not yet＝まだ〜ない。「まだ決定的ではないが、興味深い方向を示す」。", "not already は不自然。", "not hardly は二重否定になり誤り。", "not seldom は二重否定になり誤り。"],
        "not yet＝まだ〜ない", [["形", "are {{not}} ( ) conclusive。"], ["語", "否定と合うのは {{yet}}。hardly・seldom はそれ自体が否定。"]]),
      bl("f", 2, G("setsuzokushi"), "f", ["because", "unless", "although", "until"],
        ["正解。気づきにくい「理由」は、起こらなかったことでできているから。", "条件ではない。", "逆接ではない。", "「〜まで」では意味が通らない。"],
        "後ろが前の理由になっている", [["前後", "前：コストに気づきにくい。後：{{起こらないこと}}でできている。"], ["つなぎ", "理由の {{because}}。"]]),
      bl("g", 2, G("waho"), "g", ["protect", "deprive", "remind", "accuse"],
        ["正解。protect A from B＝AをBから守る。", "deprive A of B（AからBを奪う）で、from はとらない。", "remind A of B で、from はとらない。", "accuse A of B で、from はとらない。"],
        "protect A from B。deprive などは A of B", [["形", "( ) us {{from}} real danger。"], ["語法", "A from B をとるのは {{protect}}。ほかは A of B。"]]),
      bl("h", 3, VOCAB, "h", ["simply", "hardly", "never", "rarely"],
        ["正解。The point is simply that…＝要点はただ〜ということだ。", "「ほとんど〜ない」では主張が打ち消される。", "「決して〜ない」では主張が打ち消される。", "「めったに〜ない」では主張が打ち消される。"],
        "否定の副詞を入れると主張が消える", [["文の役割", "技術に反対ではない、と言ったあとの {{本当の要点}}。"], ["語", "否定の語は不可。{{simply}}（ただ）。"]]),
      bl("i", 3, G("kandai"), "i", ["exactly what", "so that", "rather than", "as if"],
        ["正解。関係代名詞 what が needs の目的語になる。「心が必要とするもの、まさにそれ」。", "so that は目的・結果で、be の補語にならない。", "rather than では文が成り立たない。", "as if では文が成り立たない。"],
        "needs の目的語が欠けている→関係代名詞 what", [["欠けているもの", "the mind needs ( 目的語がない )。"], ["語", "先行詞をふくむ {{what}}。exactly で強める。"]]),
    ], 6),
];

// =====================================================================
// 第2問　長文の内容一致
// =====================================================================

const T2: ExamPoolSection[] = [
  S(2, "shade", CHOBUN, "都市の暑さと日かげ",
    `On a summer afternoon, the center of a large city can be several degrees warmer than the farmland that surrounds it. This difference, known as the urban heat island effect, has been recognized for a long time, but it has only recently begun to receive serious attention from city planners. The reasons for the effect are not mysterious. Asphalt roads and dark roofs absorb sunlight during the day and release the stored heat slowly at night. Tall buildings trap warm air and block the breezes that might otherwise carry it away. Air conditioners, cars, and factories add heat of their own. A city, in short, is a machine that collects warmth and is poorly designed to get rid of it.

For a long time, the standard response to rising temperatures was technical: more efficient air conditioners, better insulation, reflective paint for roofs. These measures help, and no serious planner would reject them. Yet they share a limitation. ①Most of them protect people only when they are indoors. A worker waiting at a bus stop, a child walking home from school, or an elderly person who cannot afford to run an air conditioner all day receives little benefit from a well-insulated office tower.

This is where trees come in. A large tree cools its surroundings in two ways. The first is obvious: its leaves block sunlight, so the ground and the people beneath it stay cooler. The second is less visible. Trees draw water from the soil and release it through their leaves as vapor, and this process uses energy that would otherwise heat the air. A street lined with mature trees can feel dramatically more comfortable than a bare street only a few blocks away, even when the two have the same official temperature.

It might seem, then, that the solution is simply to plant more trees. ②The reality is more complicated. A young tree provides little shade, and it may take twenty years or more before it grows large enough to make a real difference. During that time it needs water, care, and protection from damage. In crowded neighborhoods, the space beneath the sidewalk is often filled with pipes and cables, leaving little room for roots. And because trees have traditionally been planted where residents could pay for them or ask for them, the greenest streets in many cities are found in wealthier districts, while poorer areas, which often have more pavement and fewer parks, remain the hottest.

For these reasons, some urban researchers have begun to argue that shade should be treated not as a decoration but as infrastructure, in the same category as roads, water pipes, and street lights. The idea sounds abstract, but its consequences are practical. Infrastructure is planned in advance, paid for from public funds, and maintained according to a schedule. Nobody expects a neighborhood to install its own water pipes, and, according to this argument, nobody should expect it to provide its own shade.

Thinking of shade in this way also changes the questions that planners ask. Instead of asking how many trees a city has, they begin to ask where people actually walk and wait, and how long they must stand in the sun to reach a hospital, a school, or a train station. In some places, the answer may be trees. In others, where roots cannot grow, it may be awnings, covered walkways, or simple shelters at bus stops. ③The goal is not greenery for its own sake but a city in which nobody has to choose between going outside and staying safe.

Hot summers are likely to become more common in the coming decades. Cities cannot be rebuilt overnight, but they can begin to treat the shadow of a tree, or of a roof over a bench, as something as essential as the light of a street lamp.`,
    [
      ch("causes", 2, CHOBUN, "第1段落で、都市の中心部が周辺より暑くなる理由として挙げられていないものを選べ。",
        ["Cities receive less rain than the countryside around them.", "Dark surfaces store heat during the day and release it at night.", "Tall buildings keep warm air from being carried away by the wind.", "Machines and vehicles in the city produce heat themselves."],
        ["正解。雨の量は本文に書かれていない。", "Asphalt roads and dark roofs absorb sunlight … release the stored heat slowly at night と合う。", "Tall buildings trap warm air and block the breezes と合う。", "Air conditioners, cars, and factories add heat of their own と合う。"],
        "「挙げられていない」は本文に根拠がないもの", [["理由を拾う", "第1段落の理由は3つ：{{暗い表面}}・{{高い建物}}・{{機械の熱}}。"], ["外れを探す", "雨の量はどこにも出てこない。"]]),
      ch("indoors", 2, CHOBUN, "下線部①が述べている、技術的な対策の限界として最も適切なものを選べ。",
        ["They mainly benefit people who are inside buildings.", "They are too expensive for most cities to introduce.", "They can be used only in newly built office towers.", "They have not been shown to lower indoor temperatures."],
        ["正解。protect people only when they are indoors。直後のバス停で待つ人・下校中の子どもの例も、屋外の人が守られないことを示す。", "費用が高すぎるとは書いていない。", "新しいビルだけに使えるとは書いていない。", "These measures help とあり、効果は認めている。"],
        "下線部の直後の具体例で意味を確かめる", [["下線部", "{{only when they are indoors}}＝屋内にいるときだけ守る。"], ["具体例", "バス停の労働者・下校中の子ども＝{{屋外にいる人}}は守られない。"]], 80),
      ch("vapor", 2, CHOBUN, "第3段落によると、木が周囲を冷やす2つ目の仕組みはどれか。",
        ["Water released from the leaves as vapor uses energy that would otherwise warm the air.", "The roots take heat out of the ground and carry it deep underground.", "The leaves reflect sunlight back into the sky like reflective paint.", "The branches create breezes that blow warm air out of the street."],
        ["正解。Trees draw water from the soil and release it … as vapor, and this process uses energy that would otherwise heat the air と合う。", "根が熱を地中に運ぶとは書いていない。", "反射する塗料は第2段落の技術的な対策で、木の仕組みではない。", "木が風を起こすとは書いていない（風をさえぎるのは高い建物）。"],
        "The first … The second … で2つの仕組みを分ける", [["1つ目", "{{葉が日光をさえぎる}}（日かげ）。"], ["2つ目", "{{水を蒸気として出す}}ことで、空気を暖めるはずのエネルギーが使われる。"]], 80),
      ch("complicated", 2, CHOBUN, "下線部②について、本文が挙げている理由として当てはまらないものを選べ。",
        ["Trees tend to make narrow streets too dark and unsafe at night.", "Newly planted trees take many years to give much shade.", "Pipes and cables under sidewalks leave little space for roots.", "Trees have often been planted mainly in richer neighborhoods."],
        ["正解。夜に暗く危険になるとは書いていない。", "A young tree provides little shade … twenty years or more と合う。", "the space beneath the sidewalk is often filled with pipes and cables と合う。", "the greenest streets … are found in wealthier districts と合う。"],
        "下線部②の後に理由が3つ並ぶ", [["理由を拾う", "{{育つまでの年月}}・{{地下の配管}}・{{豊かな地区にかたよる}}。"], ["外れ", "夜の暗さ・安全の話は出てこない。"]], 80),
      ch("infra", 3, CHOBUN, "第5段落の、日かげをインフラとして扱うという考えの内容として最も適切なものを選べ。",
        ["Shade should be planned and paid for publicly rather than left to each neighborhood.", "Trees should be removed to make room for roads and street lights.", "Each neighborhood should pay for the trees on its own streets.", "Shade is valuable mainly as a decoration that makes streets attractive."],
        ["正解。planned in advance, paid for from public funds と、nobody should expect it to provide its own shade に合う。", "道路・街灯は同じ「分類」の例で、木を取り除くという話ではない。", "地区ごとに自分で用意させない、という考えと逆。", "not as a decoration と逆。"],
        "インフラ＝計画・公費・維持。地区まかせにしない", [["定義", "インフラは {{前もって計画}}・{{公費}}・{{予定どおり維持}}。"], ["たとえ", "水道管を地区に作らせないのと同じく、{{日かげも地区まかせにしない}}。"]], 80),
      ch("goal", 3, CHOBUN, "下線部③の意味として最も適切なものを選べ。",
        ["Cities should let everyone go outside safely, using trees or other kinds of shade.", "Cities should plant as many trees as possible, wherever they can grow.", "People should be encouraged to stay indoors during the hottest hours.", "Green spaces matter mainly because they make a city more beautiful."],
        ["正解。木が育たない場所では日よけ・屋根つきの通路などでもよく、目標は外出と安全を両立させること。", "not greenery for its own sake（緑そのものが目的ではない）と逆。", "外に出ることと安全を両立させたいので、屋内にとどまらせるのは逆。", "緑の美しさが目的ではない。"],
        "not A but B の B が筆者の主張", [["構造", "not {{greenery for its own sake}} but {{a city in which…}}。"], ["意味", "誰も {{外出か安全か}} を選ばなくてよい都市＝外に出ても安全な都市。"]], 80),
      ch("same-temp", 2, CHOBUN, "本文の内容に合うものを選べ。",
        ["Two streets with the same official temperature can feel quite different to people walking along them.", "City planners have paid close attention to the heat island effect for more than a century.", "The author thinks air conditioners should be replaced by trees.", "Poorer districts usually have more parks than wealthier ones."],
        ["正解。第3段落 even when the two have the same official temperature と合う。", "第1段落 only recently begun to receive serious attention と食いちがう。", "第2段落 no serious planner would reject them と食いちがう。", "第4段落 poorer areas … fewer parks と食いちがう。"],
        "内容一致は本文の該当箇所と1つずつ照らす", [["照合", "選択肢の語（{{official temperature}}・recently・reject・parks）を本文で探す。"], ["判断", "第3段落の最後の文だけが一致する。"]], 80),
      ch("questions", 3, CHOBUN, "第6段落によると、日かげをインフラと考えることで、計画する人の問いはどう変わるか。",
        ["From counting trees to asking where people walk and wait in the sun", "From asking where people walk to counting the number of trees", "From planting trees to building more air-conditioned buildings", "From protecting people on foot to protecting drivers"],
        ["正解。Instead of asking how many trees a city has, they begin to ask where people actually walk and wait と合う。", "変化の向きが逆。", "冷房のきいた建物をふやす話ではない。", "車を運転する人の話は出てこない。"],
        "Instead of A, B＝AではなくBへ", [["Instead of", "前の問い：{{木が何本あるか}}。"], ["後の問い", "{{人がどこを歩き、待つか}}・日なたに何分立つか。"]], 80),
      ch("mature", 1, VOCAB, "第3段落の mature の意味に最も近いものを選べ。",
        ["fully grown", "newly planted", "carefully cut", "rarely seen"],
        ["正解。mature＝成熟した。第4段落の「若い木は日かげが少ない」と対になる。", "若い木は日かげが少ない（第4段落）ので、文脈と合わない。", "「手入れして刈った」の意味はない。", "「めったに見ない」の意味はない。"],
        "mature＝成熟した。young tree と対になる", [["文脈", "{{dramatically more comfortable}} な通り＝大きな木が並ぶ。"], ["対", "第4段落 {{A young tree provides little shade}}。"]], 45),
      ch("title", 3, CHOBUN, "本文の題として最も適切なものを選べ。",
        ["Shade for Everyone: Why Cities Should Plan for Cooling Outdoors", "The History of Air Conditioning in Modern Cities", "How to Grow a Large Tree in Twenty Years", "Why Cities Are Warmer at Night Than in the Day"],
        ["正解。屋外の暑さ対策として日かげを公共に計画すべきだ、という全体の主張をまとめている。", "冷房の歴史は本文の主題ではない。", "木の育て方は本文の主題ではない。", "昼と夜の比較は本文の主題ではない（比べているのは都市と周辺）。"],
        "題は全体の主張。一部だけの話は外れ", [["主張", "日かげを {{インフラ}} として、{{屋外にいる人}} のために計画する。"], ["外れ", "冷房・木の育て方は一部の話題にすぎない。"]], 70),
    ], 7),
  S(2, "memory", CHOBUN, "記憶の作り直し",
    `Most of us picture memory as a kind of archive. Something happens, the brain makes a record of it, and later, when we need the information, we go back and take the record out of storage. If the record is faded or incomplete, we assume that it has been damaged by time, much as an old photograph loses its color. This picture is natural, and in everyday life it serves us reasonably well. It is, however, ①misleading in an important way.

Research on memory over the past century has shown that remembering is not a matter of retrieving a fixed copy. Each time we recall an event, we rebuild it from fragments, filling the gaps with what we know, what we expect, and what we have been told since. The rebuilt version then becomes the memory we carry forward, until it is rebuilt again. A memory, in other words, is less like a photograph than like a story that is retold many times, and stories change in the telling.

Experiments have demonstrated this in a variety of ways. In a typical study, participants watch a short film of a minor traffic accident and are later asked questions about it. When the question uses a dramatic verb, suggesting that the cars "smashed" into each other, participants tend to estimate a higher speed than when a milder verb is used. Some even report seeing broken glass that never appeared in the film. ②The wording of a single question has quietly entered the memory and become part of it.

What makes such errors troubling is not that they occur but that they feel exactly like accurate memories. People who remember something incorrectly are often just as confident as people who remember it correctly. Confidence, which we naturally treat as a sign of accuracy, turns out to be a poor guide. This has serious consequences in courts of law, where the testimony of a confident eyewitness can be highly persuasive to a jury. Many legal systems have begun to change the way witnesses are questioned, avoiding leading questions and recording the first account a witness gives, before later conversations have a chance to reshape it.

It would be easy to conclude from all this that memory is simply defective. Yet ③that conclusion may miss the point. A memory system that stored every detail perfectly would be expensive and, in many ways, unhelpful. What we usually need from the past is not a complete record but a useful summary: which places were dangerous, which people could be trusted, what worked last time. A flexible memory that keeps the general meaning of events and updates it as new information arrives may be well suited to that purpose. The same flexibility that allows errors to enter also allows us to learn, to imagine, and to plan for situations we have never faced.

Seen in this light, the reconstructive nature of memory is less a flaw than a trade-off. We gain the ability to use the past creatively, and we pay for it with a certain amount of inaccuracy. The practical lesson is not to distrust our memories entirely, which would be impossible, but to hold them with appropriate humility. When two people remember the same evening differently, it is quite possible that neither is lying, and that both are sincerely telling the story their minds have built.

Perhaps the archive was never the right image. A better one might be a garden: something we tend and rearrange over the years, so that what grows there is shaped both by what was planted and by the hands that have cared for it since.`,
    [
      ch("archive", 2, CHOBUN, "下線部①で、記憶を保管庫（archive）とみなす考えが misleading だとされる理由として最も適切なものを選べ。",
        ["Memories are rebuilt each time they are recalled rather than taken out unchanged.", "Memories fade with time just as old photographs lose their color.", "The brain stores far more information than any archive could hold.", "Most people never try to recall events from the distant past."],
        ["正解。第2段落 remembering is not a matter of retrieving a fixed copy. Each time we recall an event, we rebuild it と合う。", "これは保管庫のイメージそのもの（第1段落）で、誤りの理由ではない。", "容量の話は本文にない。", "本文に書かれていない。"],
        "misleading の理由は次の段落に書かれる", [["下線部", "保管庫のイメージは {{misleading}}（誤解をまねく）。"], ["理由", "第2段落：思い出すたびに {{作り直す}}。固定した写しを取り出すのではない。"]], 80),
      ch("story", 2, CHOBUN, "第2段落で、記憶が写真よりも物語に似ているとされるのはなぜか。",
        ["Like a story told many times, a memory changes each time it is rebuilt.", "Like a story, a memory always has a clear beginning and end.", "Stories are easier to remember than pictures.", "Memories are usually shared with other people as stories."],
        ["正解。a story that is retold many times, and stories change in the telling と合う。", "始まりと終わりの話はない。", "覚えやすさの比較はない。", "人に話すかどうかの話ではない。"],
        "less like A than like B＝AよりもBに近い", [["比べ方", "{{写真}}＝固定 ⇔ {{何度も語られる物語}}＝変わる。"], ["理由", "stories {{change in the telling}}。"]], 80),
      ch("smashed", 2, CHOBUN, "第3段落の実験の結果として本文に述べられているものを選べ。",
        ["A more dramatic verb in a question led people to estimate a higher speed.", "People who watched the film twice remembered it more accurately.", "Most participants refused to answer questions about the accident.", "People remembered the accident more accurately when a mild verb was used."],
        ["正解。participants tend to estimate a higher speed と合う。", "2回見た人の話はない。", "答えを拒んだ話はない。", "おだやかな動詞で正確になったとは書いていない。比べたのは見積もった速さ。"],
        "実験は「条件」と「結果」を分けて読む", [["条件", "質問の動詞が {{smashed}}（激しい）か、おだやかか。"], ["結果", "激しい動詞のほうが {{速さを高く見積もる}}。ないガラスを見たと言う人も。"]], 80),
      ch("wording", 3, CHOBUN, "下線部②の意味として最も適切なものを選べ。",
        ["The way a question was phrased changed what people later believed they had seen.", "People chose their words carefully when describing the accident.", "The question reminded people of details they had forgotten.", "People openly disagreed with the words used in the question."],
        ["正解。質問の言い方が、気づかないうちに記憶の一部になった。ないガラスの例がそれを示す。", "参加者の言葉の選び方の話ではない。", "忘れていた本当の細部を思い出したのではない（ガラスは映像になかった）。", "反対したとは書いていない。quietly（気づかないうちに）と逆。"],
        "wording＝言い方。quietly＝気づかないうちに", [["語", "{{The wording of a single question}}＝1つの質問の言い方。"], ["根拠", "映像にない {{broken glass}} を見たと言う＝言い方が記憶に入りこんだ。"]], 80),
      ch("confidence", 2, CHOBUN, "第4段落によると、記憶の誤りがとくに問題になるのはなぜか。",
        ["False memories can feel just as certain as accurate ones.", "People with false memories usually know that they are wrong.", "False memories occur only in courts of law.", "Confident witnesses are usually lying on purpose."],
        ["正解。they feel exactly like accurate memories … just as confident と合う。", "本人は誤りに気づかない。feel exactly like accurate memories と逆。", "法廷は影響が大きい場の例で、そこでだけ起こるのではない。", "わざとうそをつくとは書いていない。最後から2段落目でも neither is lying とある。"],
        "not A but B：問題は起こることでなく、正しく感じること", [["構造", "not that they occur but that {{they feel exactly like accurate memories}}。"], ["結論", "{{自信}} は正確さの目安にならない。"]], 80),
      ch("courts", 2, CHOBUN, "第4段落で述べられている、法の場での変化として正しいものを選べ。",
        ["Recording the first account a witness gives", "Refusing to listen to witnesses who seem confident", "Asking witnesses the same leading question several times", "Allowing members of the jury to question witnesses directly"],
        ["正解。recording the first account a witness gives と合う。", "自信のある証言者を退けるとは書いていない。", "avoiding leading questions（誘導する質問を避ける）と逆。", "陪審が直接質問する話はない。"],
        "変化は2つ：誘導質問を避ける・最初の証言を記録", [["該当文", "{{avoiding leading questions}} and {{recording the first account}}。"], ["理由", "あとの会話で記憶が作り直される前に記録する。"]], 70),
      ch("conclusion", 2, CHOBUN, "下線部③の that conclusion が指す内容として最も適切なものを選べ。",
        ["the idea that memory is simply defective", "the idea that memory works like a garden", "the idea that witnesses should be questioned carefully", "the idea that confidence is a good sign of accuracy"],
        ["正解。直前の文 conclude … that memory is simply defective を指す。", "庭のたとえは最後の段落で、下線部より後。", "法廷の話は前の段落で、conclusion ではない。", "自信が目安になるという考えは、本文が否定したもの。"],
        "指示語は直前の文から探す", [["直前", "It would be easy to {{conclude}} … that memory is {{simply defective}}。"], ["対応", "conclude → {{that conclusion}}。"]], 60),
      ch("flexible", 3, CHOBUN, "第5段落で、柔軟な記憶の利点として述べられているものを選べ。",
        ["It keeps the general meaning of events and helps us learn and plan.", "It stores every detail of the past perfectly.", "It prevents errors from entering our memories.", "It helps us forget which places were dangerous."],
        ["正解。keeps the general meaning … allows us to learn, to imagine, and to plan と合う。", "すべてを完全に覚える仕組みは unhelpful とされている。", "同じ柔軟さが allows errors to enter とあり、逆。", "危険な場所を覚えておくことが必要なものの例で、忘れるのではない。"],
        "柔軟さ＝誤りも入るが、学び・想像・計画もできる", [["必要なもの", "完全な記録ではなく {{useful summary}}。"], ["利点", "{{learn, imagine, plan}}。誤りが入るのと同じ柔軟さ。"]], 80),
      ch("not-match", 3, CHOBUN, "本文の内容に合わないものを選べ。",
        ["The author advises readers to stop trusting their memories altogether.", "Two people may remember the same evening differently without either of them lying.", "A memory system that recorded everything perfectly might be unhelpful.", "The image of an archive serves us reasonably well in everyday life."],
        ["正解（合わない）。第6段落 not to distrust our memories entirely, which would be impossible と食いちがう。", "第6段落 neither is lying と合う。", "第5段落 would be expensive and … unhelpful と合う。", "第1段落 it serves us reasonably well と合う。"],
        "「合わないもの」は本文と食いちがう1つ", [["照合", "各選択肢を {{第1・5・6段落}} と照らす。"], ["決め手", "筆者は {{appropriate humility}}（ほどよい謙虚さ）を勧め、全く信じるなとは言っていない。"]], 80),
      ch("garden", 3, CHOBUN, "最終段落で記憶を庭（garden）にたとえているのはなぜか。",
        ["Memory is shaped both by what happened and by how we have tended it since.", "Memory, like a garden, needs water and sunlight to stay healthy.", "Memory is a quiet place where we can rest from daily life.", "Memory grows only when we stop thinking about the past."],
        ["正解。shaped both by what was planted and by the hands that have cared for it since と合う。", "水や日光は庭の世話の一般論で、記憶の説明になっていない。", "休む場所というたとえではない。", "過去を考えるのをやめると育つ、とは書いていない。"],
        "both A and B：起きたことと、その後の手入れ", [["たとえ", "植えたもの＝{{起きた出来事}}、世話する手＝{{その後の作り直し}}。"], ["保管庫との差", "保管庫は変わらないが、庭は {{手入れで形が変わる}}。"]], 80),
    ], 7),
  S(2, "notebooks", CHOBUN, "海辺の家の気象ノート",
    `When Mina agreed to spend the summer helping her great-aunt Ruth move out of the house by the sea, she imagined a few weeks of packing boxes and carrying them to a van. She had not imagined the notebooks.

There were forty-three of them, stacked on a shelf in the small room at the back of the house, each covered in the same plain brown cardboard. Inside, in small, careful handwriting, were records of the weather: the temperature at seven in the morning and at seven in the evening, the direction of the wind, the amount of rain, and a short line about the sea. "Grey and restless." "Flat as a plate." "White waves all the way to the island."

"Your great-uncle Thomas kept those," Ruth said, when Mina carried the first one into the kitchen. "Every day for forty-one years. He missed only the week he was in hospital, and he made me do it for him then." She smiled. "①I was not very good at it. I kept writing that the sea looked 'nice.' He said that was not a scientific observation."

Mina laughed, but later that night she sat on the floor of the back room and turned the pages slowly. She was studying environmental science at university, and she knew that long, unbroken records of this kind were rare. Official weather stations measured temperature far more precisely, of course, but the nearest one was thirty kilometers inland. Nobody, as far as she knew, had measured anything on this particular stretch of coast for as long as Thomas had.

The next morning she asked Ruth whether she could take the notebooks with her. Ruth looked surprised. "I was going to give them to the recycling man," she said. "I thought nobody would want them. They're just numbers."

"They're not just numbers," Mina said, and then found it hard to explain what else they were.

Over the following weeks, between trips to the van, Mina began copying the figures into a spreadsheet on her laptop. It was slow work. Some pages were stained with tea, and in the early notebooks Thomas had used abbreviations that took her a while to understand. But patterns began to appear. The first frost of the year arrived, on average, almost two weeks later in the final decade of the record than in the first. The number of days with strong winds from the south-west had increased. ②None of this proved anything on its own, but it was the kind of local detail that larger studies often lacked.

One evening she showed Ruth a graph. The old woman put on her glasses and looked at it for a long time without speaking.

"He used to say that someone would find them useful one day," she said at last. "I thought he was just being stubborn. He liked having a reason to go outside at seven o'clock, even in January." She touched the line on the screen with one finger. "So he was right."

At the end of the summer, the house was empty except for the shelf in the back room. Mina had arranged for the notebooks to be scanned by her university's library, and her supervisor had suggested that the data might form part of her final-year project. Ruth was moving to a flat in town, closer to her doctor and to her sister.

On the last morning, Mina found a forty-fourth notebook on the kitchen table, brand new, its cover still unmarked. Inside the front page, in Ruth's handwriting, were the words: "For whoever wants to continue."

Mina stood at the window. The sea was grey and quiet, with a thin line of light near the island. She took a pencil from her pocket, checked the time, and wrote the date. Then, after thinking for a moment, she added: "Calm. ③Not just nice."`,
    [
      ch("expect", 1, CHOBUN, "Mina がこの夏に予想していたことは何か。",
        ["A few weeks of packing boxes and carrying them to a van", "Studying old weather records for her university project", "Learning to write daily notes about the sea", "Helping her great-aunt find a new house by the sea"],
        ["正解。第1段落 she imagined a few weeks of packing boxes and carrying them to a van と合う。", "気象の記録は予想していなかった（She had not imagined the notebooks）。", "海のメモを書くことは予想していない。", "Ruth は海辺の家から町のアパートへ移る。新しい海辺の家を探すのではない。"],
        "imagined と had not imagined を区別する", [["予想", "{{packing boxes}}・van に運ぶ数週間。"], ["予想外", "{{the notebooks}}。"]], 50),
      ch("contents", 2, CHOBUN, "ノートに記録されていた内容として本文にないものを選べ。",
        ["The number of ships that passed the island", "The temperature in the morning and in the evening", "The direction of the wind", "A short description of the sea"],
        ["正解。船の数は書かれていない。", "the temperature at seven in the morning and at seven in the evening と合う。", "the direction of the wind と合う。", "a short line about the sea と合う。"],
        "コロンの後の列挙を1つずつ確かめる", [["列挙", "{{気温（朝7時・夕7時）}}・風向き・雨量・海のひとこと。"], ["外れ", "船の話はない（island は海の描写に出るだけ）。"]], 60),
      ch("nice", 2, CHOBUN, "下線部①で Ruth が「得意ではなかった」と言うのはなぜか。",
        ["Her notes on the sea were too vague to count as scientific observations.", "She often forgot to record the temperature at seven o'clock.", "She could not read Thomas's small handwriting.", "She refused to go outside in bad weather."],
        ["正解。海が nice だと書き続け、Thomas に科学的な観察ではないと言われた。", "時刻を忘れたとは書いていない。", "字が読めなかったとは書いていない。", "外に出るのを拒んだとは書いていない。"],
        "下線部の直後の具体的なエピソードが理由", [["直後", "I kept writing that the sea looked {{'nice'}}。"], ["評価", "Thomas：{{not a scientific observation}}＝あいまいすぎる。"]], 70),
      ch("rare", 2, CHOBUN, "Mina がノートを貴重だと考えた理由として最も適切なものを選べ。",
        ["They were a long, unbroken record from a place where nobody else had measured for so long.", "Their measurements were more precise than those of official weather stations.", "They were the only weather records kept anywhere in the country.", "They contained the first scientific study of the island."],
        ["正解。long, unbroken records … were rare と、Nobody … had measured anything on this particular stretch of coast と合う。", "公式の観測所のほうが far more precisely とあり、逆。", "国じゅうで唯一とは書いていない。", "島の研究とは書いていない。"],
        "of course＋but で「弱み」と「強み」を分ける", [["弱み", "精度は {{公式の観測所}} のほうが上。"], ["強み", "{{長く途切れない}}記録で、その海岸では誰も測っていない。"]], 80),
      ch("recycle", 1, CHOBUN, "Mina が持ち帰りたいと頼む前、Ruth はノートをどうするつもりだったか。",
        ["Give them to the man who collected recycling", "Send them to the nearest weather station", "Keep them on the shelf in the back room", "Give them to her sister in town"],
        ["正解。I was going to give them to the recycling man と合う。", "観測所に送るとは書いていない。", "棚に残すつもりだったとは書いていない（最後に残ったのは棚だけ）。", "妹は町に住む人として出るだけ。"],
        "was going to＝〜するつもりだった", [["該当文", "I was going to give them to {{the recycling man}}。"], ["理由", "{{They're just numbers}}＝誰も欲しがらないと思った。"]], 50),
      ch("frost", 2, CHOBUN, "Mina がデータから見つけた傾向として正しいものを選べ。",
        ["The first frost tended to come later in the last ten years of the record.", "The first frost tended to come earlier in the last ten years of the record.", "Strong winds from the south-west became less frequent.", "The amount of rain doubled over the forty years."],
        ["正解。almost two weeks later in the final decade of the record than in the first と合う。", "later と逆。", "南西の強風の日は increased（ふえた）。", "雨の量の変化は書いていない。"],
        "比較の向き（later・increased）を正確に読む", [["霜", "最後の10年は最初の10年より {{約2週間遅い}}。"], ["風", "南西の強風の日は {{ふえた}}。"]], 70),
      ch("proof", 3, CHOBUN, "下線部②の意味として最も適切なものを選べ。",
        ["The patterns proved nothing alone, but they offered local detail that bigger studies often lacked.", "The patterns proved that the climate of the whole world was changing.", "The patterns were useless because the notebooks contained too many errors.", "Larger studies had already found the same patterns on that coast."],
        ["正解。None of this proved anything on its own, but … local detail that larger studies often lacked の言いかえ。", "on its own では何も証明しない、とある。", "役に立たないとは言っていない。むしろ大きな研究にない細部として価値がある。", "大きな研究にはこうした細部が lacked（欠けていた）とあり、逆。"],
        "not … on its own, but … ＝単独では弱いが価値はある", [["前半", "{{on its own}}（それだけでは）何も証明しない。"], ["後半", "大きな研究に {{欠けがちな地域の細部}}。"]], 80),
      ch("graph", 3, CHOBUN, "グラフを見たときの Ruth の気持ちとして最も適切なものを選べ。",
        ["She realized that her husband's belief in the notebooks had been right.", "She was annoyed that Mina had spent the summer on numbers.", "She was disappointed that the graph showed no clear pattern.", "She was surprised that Thomas had kept the notebooks secret."],
        ["正解。He used to say that someone would find them useful … So he was right と合う。", "いらだっている描写はない。", "グラフには傾向が出ており、がっかりしていない。", "ノートは秘密ではなかった（Ruth 自身も代わりに書いた）。"],
        "セリフの最後 So he was right が気持ちの中心", [["前", "頑固なだけだと {{思っていた}}。"], ["後", "{{So he was right}}＝夫の言ったとおりだった。"]], 80),
      ch("calm", 3, CHOBUN, "下線部③から読み取れることとして最も適切なものを選べ。",
        ["She meant to continue the notebook in the careful spirit that Thomas had valued.", "She wanted to correct a mistake that Ruth had written in the new notebook.", "She thought the sea looked less beautiful than it had in the past.", "She had decided to stop keeping weather records after that day."],
        ["正解。Ruth の nice が非科学的だと言われた話をふまえ、Thomas のように正確に書こうとしている。", "新しいノートに Ruth が書いたのは表紙の裏の言葉だけで、誤りを直したのではない。", "海の美しさを比べてはいない。", "日付と時刻を書いて続けようとしている。"],
        "前半のエピソード（nice）と結末が対応する", [["伏線", "Ruth：海は {{'nice'}} と書き、科学的でないと言われた。"], ["結末", "Mina は {{Calm}} と書き、nice ではないと添えた＝Thomas の流儀を引き継ぐ。"]], 80),
      ch("not-match", 3, CHOBUN, "本文の内容に合わないものを選べ。",
        ["Thomas himself wrote in the notebooks every single day for forty-one years.", "Mina's supervisor suggested using the data in her final-year project.", "Ruth was moving to a flat closer to her doctor and her sister.", "The university library was going to scan the notebooks."],
        ["正解（合わない）。入院中の1週間は Ruth が代わりに書いた（he made me do it for him then）。", "her supervisor had suggested … final-year project と合う。", "a flat in town, closer to her doctor and to her sister と合う。", "the notebooks to be scanned by her university's library と合う。"],
        "記録は途切れないが、本人が毎日書いたのではない", [["該当文", "He missed only the week he was in hospital, and {{he made me do it}}。"], ["判断", "Thomas {{himself}} が毎日書いた、は食いちがう。"]], 80),
    ], 7),
];

// =====================================================================
// 第3問　段落の空所に文を補う
// =====================================================================

const T3: ExamPoolSection[] = [
  S(3, "translation", CHOBUN, "翻訳という仕事",
    `A translator is often described as a bridge between two languages. [ A ] A bridge simply connects two places that already exist, while a translator must, in a sense, build the second place as well. Every sentence in the original has to be made again from the materials of another language, and those materials never fit together in quite the same way.

The difficulty is clearest with humor. [ B ] A pun, for example, depends on a single word that has two meanings or two words that sound alike. When the joke is translated word for word, the second meaning simply disappears. [ C ] Some replace the original pun with a new one that works in the target language, even if its content is different. Others explain the joke in a note, which preserves the meaning but, as anyone who has had a joke explained knows, ruins the fun.

Poetry presents a similar problem on a larger scale. [ D ] A translator may be able to keep the meaning of a poem, or its rhythm, or its rhymes, but rarely all three at once. Choosing which to keep is not a technical decision but an artistic one, and two skilled translators may make very different choices with the same poem.

[ E ] Even an apparently simple instruction, such as a sign telling visitors not to touch the paintings, can be phrased politely or bluntly, and the right level of politeness differs from culture to culture. A translation that is accurate word for word may still sound rude, or strangely formal, to its readers.

For these reasons, many translators prefer to think of their work as a kind of performance. [ F ] A pianist playing a piece by another composer does not change the notes, but every performance is shaped by countless small decisions about speed, emphasis, and feeling. In the same way, a translator follows the original closely while making choices that no dictionary can make for them.

[ G ] It means that a good translation is not a copy but a new work that deserves to be read with attention, and that the translator, so often invisible, deserves to be recognized as an author in her or his own right.`,
    [
      sn("a", 2, "A", ["The image is attractive, but it is not quite accurate.", "Machine translation has already solved most of these problems.", "The comparison with music is a helpful one.", "Translators have developed several strategies for dealing with this problem."],
        ["正解。直後で橋と翻訳者のちがいを述べるので、「橋のたとえは正確ではない」が入る。", "本文全体が翻訳の難しさを述べており、内容と食いちがう。", "音楽のたとえは第5段落で出てくる。ここではまだ音楽の話はない。", "this problem が指す問題がまだ出ていない。"],
        "直後の while による対比が手がかり", [["直後", "橋は {{つなぐだけ}}、翻訳者は {{向こう側も作る}}。"], ["判断", "前の「橋」のたとえを {{not quite accurate}} と修正する文。"]]),
      sn("b", 2, "B", ["Jokes often rely on features of a language that have no equivalent elsewhere.", "This view has an important consequence for readers.", "Difficulties of this kind are not limited to literature.", "Most readers never notice which language a book was first written in."],
        ["正解。直後の「しゃれは1語の2つの意味に頼る」は、その具体例。", "This view が指す見方がまだない。", "ユーモアの話を始めたばかりで、文学の外へ広げるのは早い（第4段落の頭の文）。", "読者が原語に気づくかどうかは本文の話題ではない。"],
        "抽象（一般論）→ for example（具体例）", [["直後", "{{A pun, for example}}＝しゃれは例。"], ["判断", "例の前には、冗談が {{その言語だけの特徴}} に頼るという一般論。"]]),
      sn("c", 2, "C", ["Translators have developed several strategies for dealing with this problem.", "The image is attractive, but it is not quite accurate.", "The comparison with music is a helpful one.", "Machine translation has already solved most of these problems."],
        ["正解。直後の Some … Others … が、その方法（戦略）を2つ挙げる。", "橋のたとえの話は第1段落で終わっている。", "音楽の話はまだ出ていない。", "Some … Others … の工夫が必要だという流れと食いちがう。"],
        "Some … Others … の前には「いくつかの方法」", [["直前", "訳すと2つ目の意味が {{消える}}＝問題。"], ["直後", "{{Some}} 新しいしゃれに、{{Others}} 注で説明＝対処の方法。"]]),
      sn("d", 2, "D", ["In a poem, sound and sense are woven together so closely that they are hard to separate.", "Jokes often rely on features of a language that have no equivalent elsewhere.", "This view has an important consequence for readers.", "Most readers never notice which language a book was first written in."],
        ["正解。直後の「意味・リズム・韻のすべては保てない」の理由になる。", "冗談の話は第2段落。ここは詩の段落。", "This view が指す見方がない。", "本文の話題ではない。"],
        "段落の話題（詩）に合い、直後の理由になる文", [["話題", "{{Poetry}} の段落。"], ["直後", "意味・リズム・韻の {{3つを同時に保てない}}＝音と意味が分けにくいから。"]]),
      sn("e", 2, "E", ["Difficulties of this kind are not limited to literature.", "Translators have developed several strategies for dealing with this problem.", "The image is attractive, but it is not quite accurate.", "Machine translation has already solved most of these problems."],
        ["正解。直後の Even an apparently simple instruction（絵にさわらないでという掲示）は、文学の外の例。", "直後は対処法ではなく、新しい例。", "橋のたとえの話ではない。", "直後に訳のむずかしさの例が続くので食いちがう。"],
        "Even … は話題を広げる合図", [["前の段落", "しゃれ・詩＝{{文学}}。"], ["直後", "{{Even}} 簡単な掲示でも＝文学の外へ広げる。"]]),
      sn("f", 2, "F", ["The comparison with music is a helpful one.", "In a poem, sound and sense are woven together so closely that they are hard to separate.", "Jokes often rely on features of a language that have no equivalent elsewhere.", "Most readers never notice which language a book was first written in."],
        ["正解。直後でピアニストの演奏と翻訳を比べている。", "詩の話は第3段落。", "冗談の話は第2段落。", "本文の話題ではない。"],
        "直後の具体例（ピアニスト）をまとめる文", [["直前", "翻訳を {{performance}}（演奏）と考える。"], ["直後", "{{A pianist}} の例 → 音楽とのたとえ。"]]),
      sn("g", 3, "G", ["This view has an important consequence for readers.", "Difficulties of this kind are not limited to literature.", "Translators have developed several strategies for dealing with this problem.", "Machine translation has already solved most of these problems."],
        ["正解。直後の It means … の It は This view（翻訳は演奏だという見方）の帰結を指す。", "難しさの例を広げる文で、まとめの段落に合わない。", "対処法の話ではない。", "本文の主張と食いちがう。"],
        "直後の It が何を指すかで決める", [["直後", "{{It means that}} 良い訳は新しい作品・翻訳者も作者。"], ["判断", "It＝{{This view}}（翻訳は演奏）。その帰結を述べる。"]]),
    ], 5),
  S(3, "clutter", CHOBUN, "使わない物を捨てられない理由",
    `Most homes contain objects that nobody uses. There are cables for machines that were thrown away years ago, books that will never be reread, and kitchen tools bought for a single recipe. [ A ] Yet when the time comes to get rid of them, many people hesitate, and the objects go back into the drawer.

Psychologists have offered several explanations for this behavior. [ B ] Once we own something, we tend to value it more highly than we would if it belonged to someone else. In experiments, people who are given a simple object, such as a mug, often ask for a higher price to sell it than they would be willing to pay to buy the same mug. [ C ]

A second explanation concerns the future. [ D ] The broken lamp might be repaired; the old coat might come back into fashion; the cable might turn out to fit something after all. Throwing an object away means accepting that these possibilities will never come true, and accepting a small loss is surprisingly hard.

[ E ] A ticket from a concert, a cheap souvenir, or a child's drawing may have almost no practical value, but it carries a memory. To discard it can feel like discarding part of one's own past, even though the memory itself remains.

[ F ] Clearing out a house after a move or the death of a relative often brings these feelings to the surface all at once. People who help with such work report that the hardest part is rarely the physical labor. It is deciding, one object at a time, what deserves to be kept.

Some writers on the subject recommend a simple test: keep only what you use or what genuinely makes you happy. [ G ] Others point out that a certain amount of clutter is harmless, and that the effort to own as little as possible can become a burden of its own. Perhaps the healthiest attitude lies somewhere between the two: to keep things deliberately, rather than simply because we have not yet decided to let them go.`,
    [
      sn("a", 2, "A", ["Most of us would agree, if asked, that these things are useless.", "Simply owning the mug, it seems, makes it feel more valuable.", "The advice is easy to state but difficult to follow.", "Shops have started to charge customers for plastic bags."],
        ["正解。直後の Yet（それでも捨てるとなるとためらう）と逆接でつながる。", "マグカップの話はまだ出ていない。", "助言（advice）がまだ出ていない。", "本文の話題ではない。"],
        "Yet の前後は逆の内容", [["直後", "{{Yet}} 捨てる段になるとためらう。"], ["判断", "前は「役に立たないと {{認める}}」。"]]),
      sn("b", 2, "B", ["One is that ownership itself changes the way we see an object.", "Simply owning the mug, it seems, makes it feel more valuable.", "Old furniture is usually worth more than new furniture.", "The advice is easy to state but difficult to follow."],
        ["正解。several explanations の1つ目を示し、直後の「持つと高く評価する」につながる。後の A second explanation とも対応する。", "マグカップはまだ出ていない。", "本文の話題ではない。", "助言はまだ出ていない。"],
        "One … → A second … の列挙", [["直前", "{{several explanations}}。"], ["後ろ", "第3段落 {{A second explanation}} → ここは1つ目の One is that…。"]]),
      sn("c", 2, "C", ["Simply owning the mug, it seems, makes it feel more valuable.", "Some objects, however, are kept for reasons that have nothing to do with use.", "Shops have started to charge customers for plastic bags.", "The advice is easy to state but difficult to follow."],
        ["正解。マグカップの実験の結果を一般化してまとめる。", "次の段落は「未来」の説明で始まり、記憶の話への橋渡しはここでは早い。", "本文の話題ではない。", "助言はまだ出ていない。"],
        "実験の後には、その意味をまとめる文", [["直前", "売るときは {{買うときより高い値}} をつける。"], ["まとめ", "{{持っているだけで}} 価値が高く感じられる。"]]),
      sn("d", 2, "D", ["An unused object often represents a possibility rather than a present need.", "Simply owning the mug, it seems, makes it feel more valuable.", "These different motives rarely operate alone.", "Old furniture is usually worth more than new furniture."],
        ["正解。直後のランプ・コート・ケーブルは、どれも「〜かもしれない」という可能性の例。", "マグカップの話は前の段落で終わった。", "動機がまだ2つしか出ておらず、まとめは早い。", "本文の話題ではない。"],
        "直後の might の例＝可能性", [["話題", "{{the future}}（未来）についての説明。"], ["直後", "直るかも・はやるかも・合うかも＝{{possibility}}。"]]),
      sn("e", 2, "E", ["Some objects, however, are kept for reasons that have nothing to do with use.", "One is that ownership itself changes the way we see an object.", "The advice is easy to state but difficult to follow.", "Shops have started to charge customers for plastic bags."],
        ["正解。直後の券・おみやげ・子どもの絵は、実用ではなく思い出のために取っておく物。", "1つ目の説明はすでに第2段落で出ている。", "助言はまだ出ていない。", "本文の話題ではない。"],
        "直後の例の共通点＝実用でない価値", [["直後", "{{almost no practical value}}、but it carries a memory。"], ["判断", "{{使うこととは関係ない}} 理由で取っておく物。"]]),
      sn("f", 3, "F", ["These different motives rarely operate alone.", "An unused object often represents a possibility rather than a present need.", "Simply owning the mug, it seems, makes it feel more valuable.", "Old furniture is usually worth more than new furniture."],
        ["正解。直後の「家を片づけると、これらの気持ちが一度に表に出る」と対応する。", "可能性の話は第3段落。", "マグカップの話は第2段落。", "本文の話題ではない。"],
        "these feelings … all at once に合うまとめ", [["直後", "{{these feelings}} が {{all at once}}（一度に）表に出る。"], ["判断", "それまでの動機は {{単独で働くことは少ない}}。"]]),
      sn("g", 2, "G", ["The advice is easy to state but difficult to follow.", "One is that ownership itself changes the way we see an object.", "Some objects, however, are kept for reasons that have nothing to do with use.", "Shops have started to charge customers for plastic bags."],
        ["正解。直前の a simple test（簡単な基準）を The advice で受ける。", "説明の1つ目は第2段落。", "思い出の物の話は第4段落。", "本文の話題ではない。"],
        "直前の内容を受ける名詞（The advice）を探す", [["直前", "{{recommend a simple test}}＝助言。"], ["判断", "それを {{The advice}} で受け、守るのは難しいと述べる。"]]),
    ], 5),
  S(3, "garden", CHOBUN, "手入れしすぎない庭",
    `For much of the twentieth century, the ideal garden in many countries was neat and orderly. Lawns were cut short, flower beds were kept free of weeds, and fallen leaves were swept away as soon as they appeared. [ A ] In recent years, however, a growing number of gardeners have begun to question it.

Their concern is not mainly about appearance. [ B ] A closely mown lawn of a single type of grass offers almost nothing to eat for bees, butterflies, and other insects that feed on flowers. Dead leaves and old stems, which tidy gardeners remove, are where many small creatures spend the winter. [ C ]

The decline of insects in many parts of the world has given these arguments new urgency. [ D ] Gardens alone cannot solve the problem, but taken together they cover a large area, and they are places where individual people can make decisions immediately, without waiting for new laws.

[ E ] Some gardeners leave one corner of the lawn uncut for the summer. Others replace part of the grass with native wild flowers, or simply wait until spring before clearing away the dead stems of last year's plants. [ F ]

Not everyone welcomes the change. Neighbors may see an uncut lawn as a sign of laziness, and some local rules still require front gardens to be kept short. [ G ] A small sign explaining that a patch of grass has been left long on purpose can turn a source of complaint into a subject of conversation, and sometimes into an example that others decide to follow.`,
    [
      sn("a", 2, "A", ["This style of gardening was seen as a sign of care and good citizenship.", "None of these steps requires special knowledge or expensive equipment.", "Experience suggests that explanation can help.", "Most insects are harmful to garden plants and should be removed."],
        ["正解。直後の question it の it が「この庭の作り方」を指せる。", "steps（手順）がまだ出ていない。", "説明の話はまだ出ていない。", "本文の主張（虫のための庭）と逆。"],
        "直後の it が指すものを用意する文", [["直後", "{{question it}}＝それを疑う。"], ["判断", "it＝きちんとした庭の {{style}}。それが良いとされた、という文。"]]),
      sn("b", 2, "B", ["It is about what a garden provides for the creatures that live in it.", "This style of gardening was seen as a sign of care and good citizenship.", "None of these steps requires special knowledge or expensive equipment.", "Lawns are the only kind of garden that birds will visit."],
        ["正解。not mainly about appearance を受けて「庭が生き物に何を与えるか」と言いかえる。直後の虫のえさ・冬ごしの例とも合う。", "庭の作り方の評価は第1段落の話。", "steps がまだ出ていない。", "本文と食いちがう。"],
        "not A → 本当はB の形", [["直前", "{{not mainly about appearance}}。"], ["直後", "えさ・冬ごし＝{{生き物に与えるもの}}。"]]),
      sn("c", 2, "C", ["By removing them, we may be clearing away shelter as well as untidiness.", "The changes that gardeners make are often very modest.", "Experience suggests that explanation can help.", "Most insects are harmful to garden plants and should be removed."],
        ["正解。them は直前の dead leaves and old stems。取り除くとすみかもなくなる。", "庭の工夫の話は第4段落。", "説明の話は第5段落。", "本文の主張と逆。"],
        "them が直前の名詞を受けるか確かめる", [["直前", "{{Dead leaves and old stems}} は冬ごしの場所。"], ["判断", "それを取ると {{shelter}}（すみか）も失う。"]]),
      sn("d", 3, "D", ["Insects pollinate many crops and are an important source of food for birds.", "It is about what a garden provides for the creatures that live in it.", "None of these steps requires special knowledge or expensive equipment.", "Lawns are the only kind of garden that birds will visit."],
        ["正解。虫の減少がなぜ急ぐべき問題かの理由になる。", "It が指すものがなく、第2段落の内容のくり返しになる。", "steps がまだ出ていない。", "本文と食いちがう。"],
        "urgency（急ぐ必要）の理由を述べる文", [["直前", "{{The decline of insects}} が議論を急がせる。"], ["判断", "虫は {{作物の受粉}}・鳥のえさ＝減ると困る理由。"]]),
      sn("e", 2, "E", ["The changes that gardeners make are often very modest.", "By removing them, we may be clearing away shelter as well as untidiness.", "Insects pollinate many crops and are an important source of food for birds.", "Most insects are harmful to garden plants and should be removed."],
        ["正解。直後の「一角を刈らない」「春まで待つ」は、どれも小さな変化の例。", "them が指すものがない。", "虫の大切さの話は第3段落。", "本文の主張と逆。"],
        "直後の Some … Others … の例をまとめる文", [["直後", "{{Some}} 一角を刈らない、{{Others}} 野の花に・春まで待つ。"], ["判断", "どれも {{modest}}（ささやかな）変化。"]]),
      sn("f", 2, "F", ["None of these steps requires special knowledge or expensive equipment.", "It is about what a garden provides for the creatures that live in it.", "This style of gardening was seen as a sign of care and good citizenship.", "Lawns are the only kind of garden that birds will visit."],
        ["正解。these steps が直前の工夫を受け、だれでもできると補う。", "It が指すものがない。", "昔の庭の評価の話は第1段落。", "本文と食いちがう。"],
        "these steps＝直前に並んだ工夫", [["直前", "刈らない・野の花・{{春まで待つ}}。"], ["判断", "それらを {{these steps}} で受ける。"]]),
      sn("g", 2, "G", ["Experience suggests that explanation can help.", "The changes that gardeners make are often very modest.", "Insects pollinate many crops and are an important source of food for birds.", "Most insects are harmful to garden plants and should be removed."],
        ["正解。直後の「わざと伸ばしていると説明する小さな札」が、その具体例。", "工夫の話は第4段落。", "虫の大切さの話は第3段落。", "本文の主張と逆。"],
        "直後の具体例（札で説明）とつながる文", [["直前", "近所の人は {{なまけ}} と見るかもしれない。"], ["直後", "{{A small sign explaining}} … ＝説明が役立つ例。"]]),
    ], 5),
];

// =====================================================================
// 第4問　会話文の空所補充
// =====================================================================

const T4: ExamPoolSection[] = [
  S(4, "presentation", KAIWA, "グループ発表の相談",
    `Kenji: Hi, Ana. Do you have a minute? It's about the presentation next Thursday.
Ana: Sure. Is something wrong?
Kenji: Well, I'm a bit worried. We've divided the topic into four parts, but as far as I know, nobody has started yet.
Ana: Really? I thought Leo had ( a ).
Kenji: He said he would, but he's been busy with his part-time job. I don't want to ( b ), but if we don't start soon, we'll be in trouble.
Ana: You're right. Why don't we meet this weekend and get things moving?
Kenji: That would be great. Saturday afternoon?
Ana: Saturday is ( c ) for me. I have a family event. How about Sunday morning?
Kenji: Sunday works. I'll ( d ) the others and see if they can come.
Ana: Good. And maybe we should decide who is going to speak first. Last time, nobody wanted to, and we wasted ten minutes arguing.
Kenji: Ha, I remember. Honestly, I don't mind going first. I'd rather ( e ).
Ana: Really? That's brave of you. I always get nervous at the beginning.
Kenji: So do I, but once I start talking, I'm fine. Anyway, what about the slides? Should each person make their own?
Ana: I think that's risky. Last semester, one group's slides all looked different, and the teacher said the talk was hard to ( f ).
Kenji: Good point. Then maybe one person should put everything together at the end.
Ana: I can do that, ( g ) everyone sends me their part by Friday.
Kenji: Deal. You're a lifesaver, Ana.
Ana: ( h ). Let's just make sure we don't leave everything until the last minute this time.
Kenji: Agreed. I'll send a message to the group right now.
Ana: Great. And Kenji, don't forget to tell Leo directly. He might ( i ) if he hears about it from someone else.`,
    [
      bl("a", 2, KAIWA, "a", ["already started on his part", "already dropped the class", "asked to change groups", "lost interest in the topic"],
        ["正解。直後の He said he would（やると言っていた）とつながる。", "授業をやめたなら、He said he would と合わない。", "グループを変えるなら、He said he would と合わない。", "興味を失ったなら、He said he would と合わない。"],
        "次の人の返事（He said he would）から逆算", [["返事", "{{He said he would}}＝やると言っていた。"], ["判断", "would の後に省略されているのは {{start on his part}}。"]]),
      bl("b", 2, KAIWA, "b", ["be pushy", "be honest", "be lucky", "be absent"],
        ["正解。pushy＝押しつけがましい。「せかしたくはないけれど」。", "「正直になりたくない」は文脈に合わない。", "「運がよくなりたくない」は合わない。", "「欠席したくない」は but 以下とつながらない。"],
        "I don't want to …, but＝〜したくはないが", [["but の後", "早く始めないと {{困ったことになる}}。"], ["前半", "言いにくいことを言う前置き＝{{pushy}} になりたくない。"]]),
      bl("c", 1, KAIWA, "c", ["out", "free", "fine", "open"],
        ["正解。Saturday is out for me＝土曜はむり。後の family event とつながる。", "空いているなら、日曜を提案しない。", "都合がよいなら、日曜を提案しない。", "空いているなら、日曜を提案しない。"],
        "be out＝（予定として）むり", [["後ろ", "{{I have a family event}}。日曜を提案。"], ["語", "土曜はむり＝{{out}}。"]]),
      bl("d", 2, JUKUGO, "d", ["check with", "look after", "put up with", "run out of"],
        ["正解。check with＝〜に確かめる。", "look after＝〜の世話をする。", "put up with＝〜をがまんする。", "run out of＝〜を切らす。"],
        "check with＋人＝〜に確認する", [["後ろ", "{{see if they can come}}＝来られるか確かめる。"], ["熟語", "人に確認＝{{check with}}。"]]),
      bl("e", 2, KAIWA, "e", ["get it over with", "keep it to myself", "take it easy", "make it up to you"],
        ["正解。get it over with＝（いやなことを）さっさと済ませる。最初に話すほうがいい理由。", "keep it to oneself＝人に言わない。", "take it easy＝のんびりする。", "make it up to you＝埋め合わせをする。"],
        "get it over with＝さっさと済ませる", [["前", "最初に話してもいい。I'd rather（むしろ）〜したい。"], ["表現", "緊張する番を {{さっさと済ませる}}＝get it over with。"]]),
      bl("f", 1, VOCAB, "f", ["follow", "ignore", "afford", "deny"],
        ["正解。hard to follow＝（話の筋に）ついていきにくい。", "「無視しにくい」では批判にならない。", "afford＝〜する余裕がある。合わない。", "「否定しにくい」は合わない。"],
        "hard to follow＝わかりにくい", [["状況", "スライドが {{all looked different}}。"], ["語", "話についていきにくい＝hard to {{follow}}。"]]),
      bl("g", 2, G("setsuzokushi"), "g", ["as long as", "even if", "unless", "in case"],
        ["正解。as long as＝〜しさえすれば（条件）。金曜までに送ってくれれば、まとめる。", "「たとえ送っても」では意味が通らない。", "「送らない限り」では逆になる。", "「送る場合に備えて」では意味が通らない。"],
        "as long as＝〜する限り・〜さえすれば", [["関係", "まとめるための {{条件}}＝金曜までに送ること。"], ["語", "条件の {{as long as}}。unless は逆の意味。"]]),
      bl("h", 1, KAIWA, "h", ["Don't mention it", "I'm afraid not", "That's a shame", "Never mind"],
        ["正解。お礼・ほめ言葉への返し＝どういたしまして。", "断りの返事で、合わない。", "「残念だ」は合わない。", "Never mind は謝罪や「気にしないで、もういい」の返事で、ほめ言葉への返しではない。"],
        "感謝への返事＝Don't mention it", [["前", "{{You're a lifesaver}}＝助かるよ（感謝）。"], ["返し", "{{Don't mention it}}＝どういたしまして。"]]),
      bl("i", 2, KAIWA, "i", ["feel left out", "feel at home", "take over", "come in handy"],
        ["正解。feel left out＝仲間外れにされたと感じる。人づてに聞くと、そう感じるかもしれない。", "feel at home＝くつろぐ。合わない。", "take over＝引き継ぐ。合わない。", "come in handy＝役に立つ。人には使わない。"],
        "feel left out＝仲間外れに感じる", [["状況", "Leo に {{直接}} 伝える。人づてに聞くと…"], ["表現", "{{feel left out}}（のけ者にされた気がする）。"]]),
    ], 6, "次の会話文を読み、問いに答えよ。"),
  S(4, "neighbors", KAIWA, "上の階の物音",
    `Sam: You look exhausted. Didn't you sleep?
Mei: Hardly at all. The people upstairs were moving furniture again until two in the morning.
Sam: Again? That's the third time this week. I'm a heavy sleeper, so I didn't notice, but it sounds ( a ).
Mei: It is. I have an exam this afternoon, and I can barely keep my eyes open.
Sam: Have you thought about talking to them?
Mei: I've thought about it, but I don't even know who they are. They only moved in last month. I don't want to ( b ) on the wrong foot.
Sam: I understand. But if you say nothing, they'll never know there's a problem. Maybe they have no idea how far the noise ( c ).
Mei: That's possible, I suppose. The building is old, and the floors are thin.
Sam: Why don't we write a short note? Something friendly. We could ( d ) by saying we're the people downstairs, and then ask if they could keep things quieter after eleven.
Mei: A note feels a bit cold, though. ( e ), I'd knock on their door and talk face to face.
Sam: Fair enough. Do you want me to come with you?
Mei: Would you? That would ( f ). I'm not good at this kind of thing.
Sam: No problem. Let's go this evening, after your exam.
Mei: Thanks. And if talking doesn't work, then what?
Sam: Then we can ( g ) the building manager. But let's not get ahead of ourselves.
Mei: You're right. I'm probably ( h ). They might be perfectly nice people.
Sam: Exactly. Now, go and get some coffee before your exam. You look like you could ( i ).
Mei: Very funny. But you're right.`,
    [
      bl("a", 1, KAIWA, "a", ["awful", "peaceful", "convenient", "harmless"],
        ["正解。夜中の2時まで家具を動かす音は「ひどい」。Mei も It is. と同意する。", "「静か」は状況と逆。", "「便利」は合わない。", "「害がない」は Mei の返事 It is.（寝不足）と合わない。"],
        "相手の返事 It is. と状況から判断", [["状況", "{{夜中の2時まで}} 家具の音、今週3回目。"], ["語", "ひどい＝{{awful}}。"]]),
      bl("b", 2, JUKUGO, "b", ["get off", "put off", "take off", "give off"],
        ["正解。get off on the wrong foot＝最初からつまずく・第一印象を悪くする。", "put off＝延期する。", "take off＝離陸する・脱ぐ。on the wrong foot と結びつかない。", "give off＝（においなどを）出す。"],
        "get off on the wrong foot＝出だしでつまずく", [["状況", "{{先月越してきたばかり}} で、知らない人。"], ["熟語", "関係の始まりを悪くしたくない＝{{get off on the wrong foot}}。"]]),
      bl("c", 2, VOCAB, "c", ["carries", "stops", "fades", "ends"],
        ["正解。carry（自動詞）＝（音が）届く。音がどこまで届くか知らないのかもしれない。", "「どこまで止まるか」では意味が通らない。", "「どこまで薄れるか」では問題を知らない理由にならない。", "「どこまで終わるか」では意味が通らない。"],
        "自動詞 carry＝音・声が届く", [["文脈", "相手は {{問題があると知らない}} かもしれない。"], ["語", "音が下まで {{届く}}＝the noise carries。後の「床が薄い」とも合う。"]]),
      bl("d", 2, VOCAB, "d", ["begin", "deny", "refuse", "insist"],
        ["正解。begin by doing＝まず〜することから始める。自己紹介をしてから頼む。", "deny は by doing の形をとらず、意味も合わない。", "refuse は by doing の形をとらない。", "insist は on をとる。意味も合わない。"],
        "begin by doing＝まず〜して始める", [["形", "We could ( ) {{by saying}} …, and then ask …。"], ["語", "順序の最初＝{{begin}} by。"]]),
      bl("e", 3, KAIWA, "e", ["If it were up to me", "Against my will", "By no means", "In vain"],
        ["正解。If it were up to me＝私が決めていいなら。仮定法と I'd がつながる。", "「心ならずも」では、自分の好みを言う文にならない。", "「決して〜ない」では後の文が打ち消される。", "「むだに」では意味が通らない。"],
        "be up to＋人＝〜しだい。仮定法の I'd と呼応", [["後ろ", "{{I'd}} knock … ＝私ならこうする。"], ["表現", "私が決めるなら＝{{If it were up to me}}。"]]),
      bl("f", 2, KAIWA, "f", ["mean a lot", "make no difference", "go without saying", "be too bad"],
        ["正解。That would mean a lot＝そうしてくれたらとてもありがたい。", "「何も変わらない」では、喜んでいる Would you? と合わない。", "go without saying＝言うまでもない。合わない。", "「残念だ」は合わない。"],
        "That would mean a lot＝とてもありがたい", [["前", "{{Would you?}}＝来てくれるの？（喜び）"], ["表現", "ありがたさ＝{{mean a lot}}。"]]),
      bl("g", 2, JUKUGO, "g", ["take it up with", "look up to", "catch up with", "come up with"],
        ["正解。take it up with＝（問題を）〜に持ちこむ・相談する。", "look up to＝尊敬する。", "catch up with＝追いつく。", "come up with＝思いつく。"],
        "take it up with＝〜に問題を持ちこむ", [["状況", "話してもだめなら {{管理人}} に。"], ["熟語", "問題を持ちこむ＝{{take it up with}}。"]]),
      bl("h", 2, KAIWA, "h", ["overthinking it", "running late", "giving it away", "looking forward to it"],
        ["正解。overthink＝考えすぎる。「いい人たちかもしれない」と続く。", "「遅れている」は合わない。", "「（秘密を）もらす」は合わない。", "「楽しみにしている」は合わない。"],
        "後ろの「いい人かもしれない」から考えすぎと判断", [["前", "{{let's not get ahead of ourselves}}＝先走らないで。"], ["語", "Mei：たぶん {{考えすぎ}}＝overthinking it。"]]),
      bl("i", 2, KAIWA, "i", ["use some", "skip it", "afford it", "do without"],
        ["正解。could use some＝少しほしいところだ。コーヒーが必要そうに見える。", "「抜いてもよさそう」では、コーヒーをすすめる前の文と逆。", "「買う余裕がある」は合わない。", "「なしで済ませる」は前の文と逆。"],
        "could use＝〜がほしい・あるとありがたい", [["前", "{{go and get some coffee}}。"], ["表現", "疲れた顔＝コーヒーが {{必要そう}}＝You look like you could use some。"]]),
    ], 6, "次の会話文を読み、問いに答えよ。"),
  S(4, "extension", KAIWA, "提出期限の相談",
    `Yuki: Excuse me, Professor Clarke. Do you have a moment?
Professor: Of course, Yuki. Come in. What can I do for you?
Yuki: It's about the essay that's due on Monday. I'm afraid I'm ( a ) with it.
Professor: I see. How far have you got?
Yuki: I've done most of the reading, and I have an outline, but I've only written about a third of it. My grandmother was in hospital last week, and I went home to help my family.
Professor: I'm sorry to hear that. Is she ( b ) now?
Yuki: Yes, she's much better, thank you. She's back home.
Professor: Good. Well, ( c ) the circumstances, I think an extension is reasonable. Would one more week be enough?
Yuki: That would be more than enough. Thank you so much.
Professor: Not at all. But I'd like you to send me your outline by Wednesday, just so I can see that you're ( d ).
Yuki: Of course. Actually, I wanted to ask you about that too. I'm not sure whether my main argument ( e ).
Professor: Tell me briefly what it is.
Yuki: I want to argue that the museum's new policy has made it more open to the public, but that it has also made the exhibitions less ambitious.
Professor: That sounds promising. Just make sure you ( f ) both claims with evidence. It's easy to spend all your energy on the first point and leave the second one weak.
Yuki: That's exactly what I'm worried about. I have lots of material on the first point, but ( g ) on the second.
Professor: Then you might ( h ) the number of visitors before and after the change with the kinds of exhibitions that were held. The library has the museum's annual reports.
Yuki: That's a great idea. I hadn't thought of that.
Professor: Well, that's what office hours are for. Don't hesitate to ( i ) if you get stuck again.
Yuki: I won't. Thank you, Professor.`,
    [
      bl("a", 2, KAIWA, "a", ["falling behind", "keeping up", "getting ahead", "coming along nicely"],
        ["正解。fall behind with＝〜が遅れる。I'm afraid（残念ながら）と、3分の1しか書けていないことに合う。", "「遅れずについていく」では相談にならない。", "「先に進んでいる」は逆。", "「順調に進む」は逆。"],
        "I'm afraid＋遅れ＝fall behind", [["前", "{{I'm afraid}}＝あいにく（悪い知らせ）。"], ["後", "{{a third}} しか書いていない → 遅れている。"]]),
      bl("b", 1, KAIWA, "b", ["all right", "in charge", "out of the question", "on duty"],
        ["正解。Is she all right now?＝もう大丈夫？ 返事の much better と合う。", "「担当している」は合わない。", "「論外」は合わない。", "「勤務中」は合わない。"],
        "返事 she's much better から逆算", [["返事", "{{much better}}, back home。"], ["問い", "具合をたずねる＝{{all right}}。"]]),
      bl("c", 2, G("zenchishi"), "c", ["given", "despite", "unless", "instead of"],
        ["正解。given＝〜を考えると（前置詞的）。事情を考えれば延長は妥当。", "「事情にもかかわらず」では理由にならない。", "unless は接続詞で名詞を直接とらない。", "「事情の代わりに」は意味が通らない。"],
        "given＋名詞＝〜を考慮すると", [["関係", "事情 → だから {{延長は妥当}}（理由）。"], ["語", "理由を表す {{given}}。despite は逆接。"]]),
      bl("d", 2, KAIWA, "d", ["on track", "off duty", "in the dark", "out of place"],
        ["正解。on track＝順調に進んでいる。概要を見て確かめたい。", "off duty＝非番。", "in the dark＝事情を知らない。", "out of place＝場ちがい。"],
        "on track＝予定どおり進んでいる", [["状況", "延長のかわりに {{水曜までに概要}}。"], ["語", "進んでいるか確認＝you're {{on track}}。"]]),
      bl("e", 3, JUKUGO, "e", ["holds up", "gives up", "shows off", "turns down"],
        ["正解。hold up＝（議論が）持ちこたえる・成り立つ。", "give up＝あきらめる。議論が主語では合わない。", "show off＝見せびらかす。", "turn down＝断る。"],
        "argument holds up＝議論が成り立つ", [["文脈", "主張が {{通用するか}} 不安。"], ["熟語", "成り立つ＝{{hold up}}。"]]),
      bl("f", 2, JUKUGO, "f", ["back up", "make up", "put off", "do away with"],
        ["正解。back up A with evidence＝Aを証拠で裏づける。", "make up＝作り上げる・でっち上げる。", "put off＝延期する。", "do away with＝廃止する。"],
        "back up＝裏づける", [["後ろ", "both claims {{with evidence}}。"], ["熟語", "証拠で支える＝{{back up}}。"]]),
      bl("g", 1, G("meishi"), "g", ["very little", "a great deal", "plenty", "too much"],
        ["正解。but で前の lots of と対比。2つ目の点の材料は「ほとんどない」。", "lots of と同じ方向で、but と合わない。", "lots of と同じ方向で、but と合わない。", "多すぎるなら心配の理由にならない。"],
        "but の前後で量を対比", [["前", "1つ目は {{lots of material}}。"], ["後", "but → 2つ目は {{very little}}。"]]),
      bl("h", 2, G("waho"), "h", ["compare", "confuse", "replace", "exchange"],
        ["正解。compare A with B＝AとBを比べる。来館者数と展示の種類を比べて2つ目の主張の根拠にする。", "confuse A with B＝AとBを混同する。", "replace A with B＝AをBで置きかえる。", "exchange A for B の形で、意味も合わない。"],
        "compare A with B＝比べる", [["目的", "2つ目の主張（展示が控えめになった）の {{根拠}}。"], ["語法", "来館者数と展示の種類を {{compare A with B}}。"]]),
      bl("i", 2, JUKUGO, "i", ["drop by", "drop out", "put up", "hold back"],
        ["正解。drop by＝ちょっと立ち寄る。オフィスアワーに来てよい。", "drop out＝中退する。", "put up＝掲げる・泊める。", "hold back＝ためらう・控える。Don't hesitate と重なり意味が通らない。"],
        "drop by＝立ち寄る", [["前", "{{office hours}} はそのためにある。"], ["熟語", "困ったら {{立ち寄って}}＝drop by。"]]),
    ], 6, "次の会話文を読み、問いに答えよ。"),
];

// =====================================================================
// 第5問　英文の要旨を英語1文でまとめる（記述）
// =====================================================================

function W(id: string, title: string, body: string, model: string, rubric: { label: string; points: number; keywords?: string[] }[], point: string, st: St): ExamPoolSection {
  return {
    unit: CHOBUN,
    tag: `${K}:5`,
    section: {
      id: `we-${id}`,
      title,
      lead: "次の英文を読み、問いに答えよ。",
      style: "writing",
      examOnly: true,
      material: [{ kind: "passage", lang: "en", body }],
      questions: [
        {
          id: "summary",
          type: "C",
          difficulty: 3,
          points: 12,
          seconds: 600,
          skill: "思考・判断・表現",
          unit: CHOBUN,
          prompt: "本文の要旨を、英語1文（15〜25語）でまとめよ。本文の文をそのまま写さず、自分の英語で書くこと。",
          answer: { kind: "written", limit: { min: 15, max: 25, unit: "語" }, model, rubric },
          point,
          steps: steps(st),
        },
      ],
    },
  };
}

const ACC = { label: "英語として正しい1文で、15〜25語に収まっている（文法・語法の誤り1つにつき1点減）", points: 4 };

const T5: ExamPoolSection[] = [
  W("light", "夜の明かり",
    `For most of human history, anyone who looked up on a clear night could see thousands of stars and the pale band of the Milky Way. Today, a large share of the world's population lives under skies so bright that the Milky Way is no longer visible. The cause is artificial light: street lamps, illuminated signs, and lit windows that send a glow into the atmosphere. This change is often treated as a small aesthetic loss, regrettable but unimportant. Yet the effects of artificial light at night reach well beyond astronomy. Many animals rely on darkness. Some birds that migrate at night can be confused by the lights of cities, and young sea turtles, which normally move toward the brighter horizon over the sea after hatching, may crawl inland toward roads instead. Human beings are affected too, since exposure to bright light late in the evening can disturb the body's daily rhythms and make sleep more difficult. Unlike many environmental problems, however, this one is relatively easy to reduce. Lamps can be shielded so that they shine downward rather than into the sky, lights can be dimmed or switched off when they are not needed, and warmer colors can be used in place of harsh white ones. A darker night does not require us to give up the benefits of light; it only asks us to use light more carefully.`,
    "Artificial light at night hides the stars and harms animals and human sleep, but simple changes in how we use light can reduce it.",
    [
      { label: "問題：夜の人工の光は星を見えなくするだけでなく、動物や人の睡眠にも害がある", points: 4, keywords: ["animals", "sleep", "harm"] },
      { label: "解決：光の使い方を少し変えれば（向き・明るさ・色）、比較的かんたんに減らせる", points: 4, keywords: ["reduce", "easily", "carefully"] },
      ACC,
    ],
    "Yet と however の後に筆者の主張がある", [["主張の位置", "{{Yet}} 影響は天文学をこえる／{{however}} 減らすのは比較的かんたん。"], ["まとめ方", "「害（星・動物・睡眠）」＋「but 対策はかんたん」を1文に。例は入れない。"]]),
  W("praise", "子どものほめ方",
    `When children succeed at a task, adults naturally want to praise them. The words they choose, however, may matter more than they realize. Praise that focuses on a child's ability, such as "You're so clever," seems kind and encouraging. But it can send an unintended message: that success comes from a fixed talent that one either has or lacks. A child who believes this may begin to avoid difficult challenges, because failing at them would suggest that the talent is missing after all. Praise that focuses on effort or strategy, such as "You kept trying different ways until it worked," sends a different message. It suggests that success is the result of things the child can control and improve. Some research suggests that children who hear this kind of praise are more likely to see mistakes as part of learning rather than as proof of failure. None of this means that adults should stop praising children or should invent praise for poor work. Honest praise remains valuable. The point is to praise the process—the effort, the strategies, the willingness to keep going—rather than a quality the child cannot change. In this way, praise becomes not only a reward for past success but also a preparation for future difficulty.`,
    "Praising children's effort and strategies rather than their fixed ability helps them accept challenges and see mistakes as part of learning.",
    [
      { label: "対比：生まれつきの能力ではなく、努力・やり方（過程）をほめる", points: 4, keywords: ["effort", "ability", "process", "strategies"] },
      { label: "効果：むずかしい課題に向かい、失敗を学びの一部と見るようになる", points: 4, keywords: ["challenges", "mistakes", "learning"] },
      ACC,
    ],
    "The point is … が要旨。rather than の対比を残す", [["主張の位置", "{{The point is to praise the process … rather than a quality the child cannot change}}。"], ["まとめ方", "「能力でなく努力をほめる」＋「その結果どうなるか」を1文に。"]]),
  W("repair", "修理の文化",
    `In many households, a broken toaster or a phone with a cracked screen is simply replaced. Buying a new product is often quicker, and sometimes cheaper, than having the old one fixed. Many products are also designed in ways that make repair difficult: parts are glued together, special tools are needed to open the case, and spare parts are hard to find. As a result, large quantities of electronic goods are thrown away each year, even though many of them could have been made to work again. In response, volunteers in a number of countries have organized "repair cafés," events at which people bring broken items and learn, with the help of experienced volunteers, how to fix them. The cafés save objects from the rubbish heap, but their organizers often say that their most important product is knowledge and confidence. A person who has opened a lamp and replaced a switch is less likely to see the next broken object as useless. Some governments have also begun to introduce rules requiring manufacturers to make spare parts and repair information available. Together, these efforts aim to change not only how products are made but also how people think about the things they own.`,
    "Because many products are hard to repair and often thrown away, repair cafés and new rules try to make fixing things easier and more common.",
    [
      { label: "背景：製品は修理しにくく、直せる物まで大量に捨てられている", points: 4, keywords: ["hard to repair", "thrown away"] },
      { label: "取り組み：修理カフェや新しい規則が、修理をしやすく・身近にしようとしている（物の作り方と考え方を変える）", points: 4, keywords: ["repair cafés", "rules", "fix"] },
      ACC,
    ],
    "As a result→In response→Together の流れ", [["流れ", "{{修理しにくい}} → 捨てられる → {{In response}} 修理カフェ・規則。"], ["まとめ方", "最後の {{Together}} の文（作り方と考え方を変える）を軸に1文にする。"]]),
  W("library", "図書館の新しい役割",
    `When information became available online, many people predicted that public libraries would gradually disappear. Why visit a building full of books when almost any fact can be found on a phone in seconds? The prediction has not come true, at least not in the way it was expected. Although some libraries have closed, many others have remained busy by changing what they offer. Besides lending books, they now provide free internet access, help with filling in official forms, language classes, and quiet spaces for students who have nowhere else to study. For people who cannot afford a computer or who live alone, the library may be one of the few public places where they can spend time without being expected to buy anything. In this sense, the library's most valuable resource may no longer be its collection but its space and its staff. Librarians increasingly act as guides, helping visitors to judge which sources can be trusted in a world that offers more information than anyone can check. The library, then, has not been made unnecessary by the internet. It has found a new role precisely because of it.`,
    "Instead of disappearing because of the internet, libraries have survived by offering free space, services, and guidance in judging information.",
    [
      { label: "予想との対比：インターネットで消えるという予想に反して、図書館は残っている", points: 4, keywords: ["internet", "disappear", "survived"] },
      { label: "理由：本を貸すだけでなく、無料の場所・サービス・情報を見きわめる手助けという新しい役割を得た", points: 4, keywords: ["space", "services", "guidance", "role"] },
      ACC,
    ],
    "予想→実際→最終文の new role がまとめ", [["流れ", "消えると {{予想}} → 実際は {{提供するものを変えて}} 残った。"], ["まとめ方", "最終文 {{found a new role}} を軸に、その中身（場所・サービス・案内）を短く。"]]),
];

export const U_WASEDA_EIGO: UnivExam = {
  key: K,
  univ: "早稲田大学",
  kamoku: "英語",
  tier: "早慶上智",
  order: 101,
  basis: "文化構想学部の傾向を参考（文学部もほぼ同じ形式。法・政経・商などは大問数や英作文の有無が学部ごとにちがう）",
  format: "大問5題・90分。長文の空所補充と内容一致、文の補充、会話文、最後に英文の要旨を英語1文でまとめる。",
  minutes: 90,
  groups: ["語彙", "文法", "技能"],
  sections: [
    { title: "第1問　長文の空所補充", lead: "次の英文を読み、問いに答えよ。", count: [5, 6], mix: [0.1, 0.4, 0.5], points: 14, prefer: "material", poolTag: `${K}:1` },
    { title: "第2問　長文の内容一致", lead: "次の英文を読み、問いに答えよ。", count: [6, 7], mix: [0.1, 0.4, 0.5], points: 24, prefer: "material", poolTag: `${K}:2` },
    { title: "第3問　文の補充", lead: "次の英文を読み、問いに答えよ。", count: [4, 5], mix: [0.1, 0.4, 0.5], points: 12, prefer: "material", poolTag: `${K}:3` },
    { title: "第4問　会話文の空所補充", lead: "次の会話文を読み、問いに答えよ。", count: [5, 6], mix: [0.1, 0.4, 0.5], points: 13, prefer: "material", poolTag: `${K}:4` },
    { title: "第5問　英文の要約", lead: "次の英文を読み、問いに答えよ。", count: [1, 1], mix: [0, 0, 1], points: 12, prefer: "material", poolTag: `${K}:5` },
  ],
  pool: [...T1, ...T2, ...T3, ...T4, ...T5],
};
