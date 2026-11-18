import type { UnivExam } from "./types";
import type { ExamPoolSection } from "../pool/types";
import type { Difficulty, QuestionB, QuestionC, Skill } from "@/lib/moshi/types";

// 上智大学型 英語（早慶上智）。練習用の型。
// 上智大学の一般選抜は、TEAPスコア利用方式・共通テスト利用方式では独自の英語試験がなく (英語は TEAP または共通テストで判定)、
// 学部学科試験・共通テスト併用方式でも多くの学科は英語を共通テストで判定する。独自の英語試験があるのは併用方式の一部の学科で、
// その代表が 文学部英文学科の学部学科試験「英語適性検査」(75分・100点、マーク式・記述式併用。英語の長文読解と、その内容に基づく英作文)。
// この型はその英語適性検査の形 (長文2題＋課題文にもとづく英作文) に寄せた。英文・設問はすべてこの型のために書き下ろしたもの
// (過去問・書籍・記事の英文は使っていない。登場する主張は架空の筆者のもの)。
// 参考:
//   https://adm.sophia.ac.jp/assets/uploads/sites/2/2025/05/p09-11_2026_heiyou-bosyu.pdf (2026年度 学部学科試験・共通テスト併用方式 募集要項: 英文学科 英語適性検査 75分・100点)
//   https://search.keinet.ne.jp/2221/topics/12 (河合塾 Kei-Net: 上智大学 一般選抜の特徴。TEAP方式は独自の英語試験なし)
//   https://adm.sophia.ac.jp/assets/uploads/sites/2/2024/10/2025_ippan_youkou1105.pdf (2025年度 一般選抜 入学試験要項)

const K: Skill = "知識・技能";
const T: Skill = "思考・判断・表現";
const P = { 1: 4, 2: 5, 3: 6 } as const;
const S = { 1: 60, 2: 90, 3: 120 } as const;
type St = [string, string][];
const steps = (st: St) => st.map(([title, body]) => ({ title, body }));

const CHOBUN = "h-eng-skill-chobun";
const VOCAB = "h-eng-vocab-2000";
const JIYU = "h-eng-skill-jiyu";

/** 4択 (o は [選択肢, 理由]。c が正解の番号) */
function ch(a: { id: string; u?: string; d: Difficulty; s?: Skill; p: string; o: [string, string][]; c?: number; pt: string; st: St; keep?: boolean }): QuestionB {
  return {
    id: a.id,
    type: "B",
    difficulty: a.d,
    points: P[a.d],
    seconds: S[a.d],
    skill: a.s ?? (a.d === 1 ? K : T),
    unit: a.u ?? CHOBUN,
    prompt: a.p,
    ...(a.keep ? { keepOrder: true } : {}),
    answer: { kind: "choice", options: a.o.map((x) => x[0]), correct: a.c ?? 0, why: a.o.map((x) => x[1]) },
    point: a.pt,
    steps: steps(a.st),
  };
}

/** 並べかえ (tokens は正しい順) */
function od(a: { id: string; u: string; d: Difficulty; p: string; tokens: string[]; distractor?: string; alsoOk?: number[][]; pt: string; st: St }): QuestionB {
  return {
    id: a.id,
    type: "B",
    difficulty: a.d,
    points: P[a.d],
    seconds: S[a.d],
    skill: K,
    unit: a.u,
    prompt: a.p,
    answer: { kind: "order", tokens: a.tokens, ...(a.distractor ? { distractor: a.distractor } : {}), ...(a.alsoOk ? { alsoOk: a.alsoOk } : {}) },
    point: a.pt,
    steps: steps(a.st),
  };
}

/** 課題文にもとづく英作文 (毎回出す) */
function wr(a: { id: string; p: string; lim: [number, number]; model: string; rub: { label: string; points: number; keywords?: string[] }[]; pt: string; st: St }): QuestionC {
  const points = a.rub.reduce((x, r) => x + r.points, 0);
  return {
    id: a.id,
    type: "C",
    difficulty: 3,
    points,
    seconds: 1200,
    skill: T,
    unit: JIYU,
    prompt: a.p,
    answer: { kind: "written", limit: { min: a.lim[0], max: a.lim[1], unit: "語" }, model: a.model, rubric: a.rub },
    point: a.pt,
    steps: steps(a.st),
  };
}

const KEY = "sophia-eigo";
const TAG1 = `${KEY}:1`;
const TAG2 = `${KEY}:2`;
const TAG3 = `${KEY}:3`;
const LEAD1 = "Read the following passage and answer the questions.";

// =====================================================================
// 第1問　言語・文学・文化の長文 (語の意味・空所・内容理解・並べかえ。1回6問。1節9〜10問から6問)
// =====================================================================

const S1: ExamPoolSection[] = [
  {
    unit: CHOBUN,
    tag: TAG1,
    section: {
      id: "sophia-eigo-1-loanwords",
      title: "借用語の「第二の人生」",
      lead: LEAD1,
      style: "reading",
      pick: 6,
      material: [
        {
          kind: "passage",
          lang: "en",
          title: "The Second Life of Borrowed Words",
          body: `Every language is, in a sense, a collector. Over the centuries, speakers pick up words from their neighbors, their trading partners, and sometimes their conquerors, and fit them into their own speech. Yet a borrowed word is seldom a perfect copy of the original. Once it crosses a linguistic border, it begins a second life, and that life often looks quite different from the first.

The most obvious change is in sound. A word must be pronounced with the sounds the borrowing language already has, so unfamiliar consonants are replaced and awkward clusters are broken up with extra vowels. Speakers do not usually notice this process; to them, the new pronunciation simply sounds natural. Over time, the foreign origin of the word may be (1)obscured so completely that only a dictionary can reveal it.

Less obvious, but often more interesting, is the change in meaning. A language rarely borrows a word to name something it can already name perfectly well. ( 2 ), a borrowed word usually arrives to fill a gap, and the gap it fills is often narrower than the word's original range. A word that means "a meal" in general in its home language may come to mean only one particular kind of meal in its new home. In other cases, the borrowed word gradually takes on a shade of meaning that the original never had, such as a sense of fashion, formality, or even humor.

Why does this happen? One reason is competition. When a new word enters a language, it must share space with older words that cover similar ground. Rather than replacing them, the newcomer tends to claim a small, specialized corner of meaning. The older word keeps the general sense, while the borrowed one becomes the word for a more specific or more stylish version of the same thing. In this way, ( 4 ) rather than simply larger.

Another reason is that words travel without their contexts. A speaker who borrows a word usually meets it in a limited set of situations, such as on a menu, in an advertisement, or in a song, and learns it from those situations alone. The full network of associations that the word carries in its original language is left behind. (3)What survives the journey is a kind of snapshot: the meaning the word happened to have in the places where the borrowers first encountered it.

Purists sometimes complain that borrowed words "corrupt" a language, and from time to time governments have tried to replace them with native creations. Such campaigns have had mixed results. Some invented words catch on, but many are quietly ignored, because speakers value the borrowed word precisely for the special flavor it has acquired. The history of borrowing suggests that languages are not damaged by contact with one another. They are shaped by it, and the shapes they take reveal a great deal about the people who speak them: what they admired, what they needed, and whom they met along the way.

Learners of a foreign language should therefore be careful. A word that looks familiar because it has been borrowed into their own language may not mean what they expect. The resemblance can be a helpful clue, but it can also be a trap.`,
          notes: [
            { word: "consonant(s)", meaning: "子音" },
            { word: "cluster(s)", meaning: "（子音の）連続" },
            { word: "purist(s)", meaning: "（言語の）純粋主義者" },
          ],
        },
      ],
      questions: [
        ch({
          id: "obscured",
          u: VOCAB,
          d: 1,
          p: "Which of the following is closest in meaning to the underlined word (1) \"obscured\"?",
          o: [
            ["hidden", "正解。obscure は「見えにくくする・わかりにくくする」。辞書でしかわからないほど起源が「隠れる」という文脈に合う。"],
            ["explained", "「説明される」では、辞書でしか起源がわからないという後半と食いちがう。"],
            ["shortened", "語が「短くなる」話ではなく、起源が見えなくなる話。"],
            ["celebrated", "「たたえられる」は文脈と無関係。"],
          ],
          pt: "only a dictionary can reveal it から意味を逆算",
          st: [
            ["後ろの説明を見る", "{{only a dictionary can reveal it}}（辞書だけが明らかにできる）＝ふつうは見えない状態。"],
            ["意味を決める", "reveal（明らかにする）の反対の方向 → obscured ＝ {{hidden}}。"],
          ],
        }),
        ch({
          id: "blank-instead",
          d: 2,
          p: "Which of the following best fills blank ( 2 )?",
          o: [
            ["Instead", "正解。「すでに名づけられるものには借りない。そうではなく、すき間を埋めるために来る」という対比を作る。"],
            ["Nevertheless", "「それにもかかわらず」は前の文と逆の結果を述べるときの語。ここは「その代わりに」と言いかえる流れ。"],
            ["Similarly", "「同様に」では、前の文（借りない場合）と後の文（借りる場合）の対比が伝わらない。"],
            ["Otherwise", "「そうでなければ」は条件の裏を述べる語で、文がつながらない。"],
          ],
          pt: "否定文（rarely）のあとの「そうではなく」＝Instead",
          st: [
            ["前の文を読む", "「すでに名づけられるものに語を借りることは {{rarely}}（めったにない）」。"],
            ["後ろの文を読む", "「借用語はすき間を埋めるために来る」。否定のあとに本当のことを言う → {{Instead}}。"],
          ],
        }),
        ch({
          id: "meaning-narrow",
          d: 2,
          p: "According to the third paragraph, which of the following is true about the meaning of a borrowed word?",
          o: [
            ["It often covers a narrower range than it did in the original language.", "正解。the gap it fills is often narrower than the word's original range と、「食事」一般→特定の食事の例。"],
            ["It always keeps exactly the meaning it had in the original language.", "第3段落は意味が変わる話。always keeps exactly は本文と逆。"],
            ["It usually replaces an older native word with the same meaning.", "第4段落に Rather than replacing them とあり、古い語を置きかえない。"],
            ["It always acquires a humorous meaning in its new language.", "humor は In other cases の例の1つで、always ではない。"],
          ],
          pt: "always などの言い切りの選択肢は本文の範囲をこえやすい",
          st: [
            ["該当の文を探す", "{{the gap it fills is often narrower than the word's original range}}。"],
            ["例で確かめる", "「食事」一般の語が、新しい言語では {{一種類の食事だけ}} を指す。範囲がせまくなっています。"],
          ],
        }),
        ch({
          id: "competition",
          d: 3,
          p: "According to the passage, why does a borrowed word tend to take on a specialized meaning?",
          o: [
            ["Because it has to share space with older words that cover similar ground.", "正解。One reason is competition. ... it must share space with older words that cover similar ground。"],
            ["Because governments decide what each borrowed word should mean.", "政府の話は第6段落の「置きかえ運動」で、意味を決めるとは書いていない。"],
            ["Because its pronunciation changes when it enters a new language.", "発音の変化は第2段落の別の話で、意味がせまくなる理由としては述べていない。"],
            ["Because speakers believe that foreign words are grammatically incorrect.", "本文にない。むしろ話し手は借用語の special flavor を好む。"],
          ],
          pt: "Why does this happen? の後の One reason を探す",
          st: [
            ["理由の目印", "第4段落 {{One reason is competition}}。第5段落 Another reason は別の理由。"],
            ["内容をまとめる", "古い語と {{同じ領域を分け合う}} ので、新しい語は小さく専門的な意味の「すみ」を取ります。"],
          ],
        }),
        ch({
          id: "snapshot",
          d: 3,
          p: "What does the author mean by the underlined part (3), \"What survives the journey is a kind of snapshot\"?",
          o: [
            ["A borrowed word keeps only the meaning it had in the limited situations where borrowers first met it.", "正解。コロンの後に the meaning the word happened to have in the places where the borrowers first encountered it とある。"],
            ["Borrowed words are usually learned by looking at photographs.", "snapshot は比喩。写真で覚えるという意味ではない。"],
            ["A borrowed word brings with it all the associations it had in its original language.", "The full network of associations ... is left behind と本文は逆のことを言う。"],
            ["The meaning of a borrowed word changes every time it is used.", "「一瞬を切りとった写真」の比喩は、意味が固定されることを表す。毎回変わるのではない。"],
          ],
          pt: "比喩の直後のコロン（:）の説明を読む",
          st: [
            ["比喩をほどく", "snapshot ＝ ある {{一瞬だけを写した写真}}。"],
            ["コロンの説明", "{{the meaning the word happened to have in the places where the borrowers first encountered it}}。最初に出会った場面の意味だけが残ります。"],
          ],
        }),
        ch({
          id: "campaigns",
          d: 2,
          p: "Which of the following best describes the author's view of campaigns to replace borrowed words?",
          o: [
            ["The author doubts that they are necessary, because contact shapes languages rather than damaging them.", "正解。languages are not damaged by contact ... They are shaped by it。"],
            ["The author strongly supports them as a way to protect a language.", "筆者は purists の不満を紹介するだけで、支持していない。"],
            ["The author claims that such campaigns have never produced a single word that people use.", "Some invented words catch on とあり、全部失敗とは言っていない。"],
            ["The author argues that only governments should be allowed to create new words.", "本文にない主張。"],
          ],
          pt: "mixed results ＝成功も失敗もある。全否定の選択肢は誤り",
          st: [
            ["結果の評価", "{{mixed results}}：受け入れられた語もあるが、多くは無視された。"],
            ["筆者の考え", "{{languages are not damaged by contact}}。借用語を「害」と見る考えに筆者は否定的です。"],
          ],
        }),
        od({
          id: "order-richer",
          u: "h-eng-gram-bunkei",
          d: 2,
          p: "Put the words in the correct order to fill blank ( 4 ) in the fourth paragraph.\n\"In this way, ( 4 ) rather than simply larger.\"",
          tokens: ["borrowing", "can", "make", "a vocabulary", "richer and more precise"],
          distractor: "making",
          pt: "make O C ＝「O を C にする」。C は形容詞",
          st: [
            ["主語と動詞", "主語は {{borrowing}}（借用）、動詞は助動詞つきの {{can make}}。"],
            ["make O C", "O ＝ a vocabulary、C ＝ richer and more precise。後ろの {{rather than simply larger}} も C の比較級と対になります。"],
          ],
        }),
        ch({
          id: "not-menu",
          d: 1,
          p: "Which of the following is NOT mentioned as a situation in which speakers first meet a borrowed word?",
          o: [
            ["in a textbook", "正解。本文の例は on a menu, in an advertisement, in a song の3つで、教科書は出てこない。"],
            ["on a menu", "第5段落に on a menu とある。"],
            ["in an advertisement", "第5段落に in an advertisement とある。"],
            ["in a song", "第5段落に in a song とある。"],
          ],
          pt: "NOT 問題は本文の例を1つずつ消していく",
          st: [
            ["例の部分を探す", "第5段落 {{such as on a menu, in an advertisement, or in a song}}。"],
            ["消去する", "残るのは {{in a textbook}}。"],
          ],
        }),
        ch({
          id: "learners",
          d: 3,
          p: "What advice does the author give to learners of a foreign language in the last paragraph?",
          o: [
            ["They should not assume that a familiar-looking word has the meaning they expect.", "正解。may not mean what they expect ... it can also be a trap。"],
            ["They should avoid learning any words that have been borrowed into their own language.", "筆者は resemblance can be a helpful clue とも言い、避けよとは言っていない。"],
            ["They should learn pronunciation before learning meaning.", "最終段落に発音の順番の話はない。"],
            ["They should always trust the resemblance between two languages.", "resemblance は trap にもなりうる、と本文は警告している。"],
          ],
          pt: "clue でもあり trap でもある＝うのみにしない",
          st: [
            ["最終段落の主張", "見なれた借用語は {{may not mean what they expect}}。"],
            ["両面を見る", "似ていることは {{helpful clue}} にも {{trap}} にもなる → 意味を決めつけない、が助言です。"],
          ],
        }),
        ch({
          id: "title-loan",
          d: 3,
          p: "Which of the following is the most appropriate title for the passage?",
          o: [
            ["How Borrowed Words Change in Their New Homes", "正解。発音・意味の変化とその理由が全体の中心。"],
            ["Why Governments Must Protect Their Languages", "政府の運動は1段落の話題にすぎず、筆者は否定的。"],
            ["The Sounds That No Language Can Borrow", "発音は第2段落だけの話で、「借りられない音」は本文の主張ではない。"],
            ["Learning Grammar Through Borrowed Words", "文法の学習は本文で扱っていない。"],
          ],
          pt: "題は全段落をおおうものを選ぶ",
          st: [
            ["各段落の話題", "発音の変化 → 意味の変化 → その理由（競争・文脈の欠落）→ 純粋主義への反論 → 学習者への注意。"],
            ["共通点", "すべて {{借用語が新しい言語でどう変わるか}} の話です。"],
          ],
        }),
      ],
    },
  },
  {
    unit: CHOBUN,
    tag: TAG1,
    section: {
      id: "sophia-eigo-1-rereading",
      title: "本を読み返す楽しみ",
      lead: LEAD1,
      style: "reading",
      pick: 6,
      material: [
        {
          kind: "passage",
          lang: "en",
          title: "The Pleasure of Reading a Book Twice",
          body: `Most of us were taught to treat reading as a kind of journey with a destination. We open a novel, follow the plot to its end, and close the book with a sense of having arrived. Once we know how the story turns out, there seems little reason to go back. After all, the suspense that carried us through the pages has disappeared.

And yet many devoted readers return again and again to the same books, and they often say that the second or third reading is richer than the first. This might seem (1)puzzling. If the pleasure of a story lies in not knowing what happens next, rereading should be a disappointment. That it so often is not suggests that suspense is only one of the pleasures that fiction offers, and perhaps not the most important one.

On a first reading, our attention is largely directed forward. We read quickly, hungry for events, and we tend to skip over descriptions or conversations that do not seem to move the story along. Details that will later turn out to matter pass by almost unnoticed. When we reread, ( 2 ). Freed from the need to find out what happens, we can notice how the writer prepares for each event, how a minor remark in an early chapter echoes in a later one, and how the language itself creates a mood. In a sense, the first reading shows us what the story is, while later readings show us how it works.

Rereading also reveals something about the reader. A book read at fifteen and again at forty is, in one sense, the same book: not a single word has changed. But the reader has changed a great deal. Characters who once seemed admirable may now look foolish, and a parent who seemed merely strict may now appear frightened or lonely. Returning to a familiar book can therefore be a way of measuring our own growth, (3)much as a mark on a doorframe records how tall a child has become.

Some critics have gone further and argued that a serious book cannot really be read at all; it can only be reread. Their point is not that the first reading is worthless, but that it is incomplete. A complex work contains more patterns and connections than any reader can take in at once, so understanding builds up in layers over several encounters.

None of this means that we should read only old favorites. New books bring new ideas, and a life ( 4 ) would be a narrow one. But in a culture that encourages us to consume stories as quickly as possible and move on to the next, there is something to be said for slowing down. The habit of rereading teaches a kind of attention that is valuable well beyond literature: the willingness to look again at something we think we already know.`,
          notes: [
            { word: "suspense", meaning: "（先がどうなるかという）はらはらする気持ち" },
            { word: "doorframe", meaning: "ドアの枠" },
            { word: "there is something to be said for ~", meaning: "～にも一理ある" },
          ],
        },
      ],
      questions: [
        ch({
          id: "puzzling",
          u: VOCAB,
          d: 1,
          p: "Which of the following is closest in meaning to the underlined word (1) \"puzzling\"?",
          o: [
            ["difficult to understand", "正解。直後に「先を知らないことが楽しみなら、読み返しはがっかりのはず」と、理屈に合わない点を説明している。"],
            ["pleasant to experience", "puzzling は「楽しい」ではなく「不可解な」。"],
            ["completely ordinary", "「ありふれた」では、直後の「理屈に合わない」という説明とつながらない。"],
            ["physically dangerous", "文脈と無関係。"],
          ],
          pt: "直後の If の文が「不可解さ」の中身",
          st: [
            ["語の形", "puzzle（なぞ）＋ -ing ＝ {{なぞめいた・不可解な}}。"],
            ["文脈で確かめる", "「先を知らない楽しみがないのに、読み返しのほうが豊か」という {{矛盾}} を指しています。"],
          ],
        }),
        ch({
          id: "blank-attention",
          d: 2,
          p: "Which of the following best fills blank ( 2 )?",
          o: [
            ["our attention is no longer pulled only forward", "正解。直前の「最初は注意が前へ向く」と対比し、直後の Freed from the need to find out what happens につながる。"],
            ["we usually read even faster than before", "後ろで writer の準備や言葉の雰囲気に気づくと述べ、速く読む話ではない。"],
            ["the suspense becomes stronger than ever", "第1段落で、結末を知ると suspense は消えるとされている。"],
            ["we forget the details we noticed the first time", "最初の読みでは細部を見のがすとあり、「気づいた細部を忘れる」は流れに合わない。"],
          ],
          pt: "空所の前後の対比（first reading ↔ reread）をつかむ",
          st: [
            ["前の内容", "最初の読み：{{attention is largely directed forward}}（先へ先へ）。"],
            ["後ろの内容", "{{Freed from the need to find out what happens}}：先を急ぐ必要がなくなる → 注意が前だけに向かなくなる。"],
          ],
        }),
        ch({
          id: "first-reading",
          d: 2,
          p: "According to the third paragraph, what often happens on a first reading?",
          o: [
            ["Readers miss details that later turn out to be important.", "正解。Details that will later turn out to matter pass by almost unnoticed。"],
            ["Readers pay close attention to how the language creates a mood.", "言葉が雰囲気を作ることに気づくのは、読み返したとき。"],
            ["Readers read slowly in order to enjoy every description.", "We read quickly ... skip over descriptions とあり逆。"],
            ["Readers already know how the story will end.", "結末を知っているのは2回目以降。"],
          ],
          pt: "first reading と reread の性質を入れかえた選択肢に注意",
          st: [
            ["最初の読み", "{{read quickly}}・描写を {{skip}}・大事な細部が {{unnoticed}}。"],
            ["照合", "選択肢の miss ＝ pass by unnoticed の言いかえです。"],
          ],
        }),
        ch({
          id: "how-it-works",
          d: 3,
          p: "What does the author mean by saying that \"later readings show us how it works\"?",
          o: [
            ["Rereading allows us to see the techniques the writer uses to build the story.", "正解。直前の how the writer prepares for each event, how a minor remark ... echoes などをまとめた表現。"],
            ["Rereading teaches us how to repair old books.", "works を「機械が動く」と取りちがえた読み。"],
            ["Rereading shows us how much money the writer earned.", "本文と無関係。"],
            ["Rereading helps us find out what happens at the end.", "それは最初の読みで得るもの（what the story is）。"],
          ],
          pt: "what it is（中身）と how it works（しくみ）の対比",
          st: [
            ["対の表現", "first reading → {{what the story is}}、later readings → {{how it works}}。"],
            ["具体例", "前の文の {{how the writer prepares ... / how a minor remark echoes / how the language creates a mood}} ＝ 作家の技法です。"],
          ],
        }),
        ch({
          id: "doorframe",
          d: 3,
          p: "Why does the author mention \"a mark on a doorframe\" in the underlined part (3)?",
          o: [
            ["To suggest that rereading a book can show how much the reader has changed over time.", "正解。本は変わらないが読み手は変わる。変わらない基準（ドア枠の印）で成長を測るという比喩。"],
            ["To show that children should read books while standing near doors.", "比喩を文字どおりに取った誤り。"],
            ["To argue that books, like doorframes, become damaged with use.", "本の傷みの話ではない。not a single word has changed とある。"],
            ["To explain why children prefer short books.", "本文と無関係。"],
          ],
          pt: "比喩は「何と何が対応するか」で読む",
          st: [
            ["対応を作る", "ドア枠の印＝{{変わらない基準}}、子どもの背＝{{読み手}}。"],
            ["主張", "同じ本を読み返すと、{{自分の成長}} がわかる（measuring our own growth）。"],
          ],
        }),
        ch({
          id: "critics",
          d: 2,
          p: "What do \"some critics\" mentioned in the fifth paragraph argue?",
          o: [
            ["A complex book cannot be fully understood in a single reading.", "正解。the first reading ... is incomplete; understanding builds up in layers over several encounters。"],
            ["The first reading of a book has no value at all.", "Their point is not that the first reading is worthless とはっきり否定されている。"],
            ["Serious books should be read only once, very carefully.", "主張は逆で、くり返し読むことで理解が深まる。"],
            ["Readers should avoid complex works.", "本文にない。"],
          ],
          pt: "not A but B の B が主張の中心",
          st: [
            ["not A but B", "{{not that the first reading is worthless, but that it is incomplete}}。"],
            ["理由", "複雑な作品は一度に取りこめないほどの模様とつながりを持つので、理解は {{何回かの読みで層になる}}。"],
          ],
        }),
        ch({
          id: "final-view",
          d: 3,
          p: "Which of the following best expresses the author's view in the last paragraph?",
          o: [
            ["Rereading is valuable, but it should not be the only kind of reading we do.", "正解。None of this means that we should read only old favorites と、rereading の価値の両方を述べる。"],
            ["We should stop reading new books and return to old favorites.", "None of this means that we should read only old favorites と否定されている。"],
            ["New books are less valuable than old ones.", "New books bring new ideas と、新しい本の価値も認めている。"],
            ["We should try to read as many stories as possible as quickly as possible.", "それは筆者が問題視する文化のあり方。筆者は slowing down をすすめる。"],
          ],
          pt: "None of this means ～ は「行きすぎ」の否定",
          st: [
            ["譲歩", "{{None of this means that we should read only old favorites}}：古い本だけでよいわけではない。"],
            ["主張", "それでも {{slowing down}}（ゆっくり読み返すこと）には価値がある。"],
          ],
        }),
        ch({
          id: "not-noticed",
          d: 1,
          p: "Which of the following is NOT mentioned as something readers can notice when they reread?",
          o: [
            ["the number of pages in each chapter", "正解。本文の例は3つ（出来事の準備、発言の響き合い、言葉が作る雰囲気）で、ページ数は出てこない。"],
            ["how the writer prepares for each event", "第3段落に how the writer prepares for each event とある。"],
            ["how an early remark echoes in a later chapter", "how a minor remark in an early chapter echoes in a later one の言いかえ。"],
            ["how the language creates a mood", "how the language itself creates a mood とある。"],
          ],
          pt: "本文の3つの how を1つずつ消す",
          st: [
            ["例を探す", "第3段落 {{we can notice how ..., how ..., and how ...}}。"],
            ["消去する", "残る {{ページ数}} が本文にないもの。"],
          ],
        }),
        od({
          id: "order-spent",
          u: "h-eng-gram-bunshi",
          d: 2,
          p: "Put the words in the correct order to fill blank ( 4 ) in the last paragraph.\n\"New books bring new ideas, and a life ( 4 ) would be a narrow one.\"",
          tokens: ["spent", "rereading", "the same", "few", "titles"],
          distractor: "spending",
          pt: "過去分詞 spent が後ろから a life を説明する",
          st: [
            ["名詞を後ろから説明", "a life {{spent}} doing ＝「～して過ごされる人生」。spend time doing の受け身の形。"],
            ["語順", "spent ＋ {{rereading}} ＋ {{the same few titles}}（同じ少しの本）。the same few の順に注意。"],
          ],
        }),
      ],
    },
  },
  {
    unit: CHOBUN,
    tag: TAG1,
    section: {
      id: "sophia-eigo-1-silence",
      title: "会話の中の沈黙",
      lead: LEAD1,
      style: "reading",
      pick: 6,
      material: [
        {
          kind: "passage",
          lang: "en",
          title: "What Silence Says",
          body: `We usually think of conversation as an exchange of words, but much of what happens in a conversation happens between the words. Pauses, hesitations, and moments of silence are not simply empty spaces. They carry meaning, and speakers interpret them constantly, even if they are rarely aware of doing so.

Consider how quickly people take turns in ordinary talk. Researchers who have recorded and measured everyday conversations have found that the gap between one speaker finishing and the next one beginning is often remarkably short, frequently less than half a second. Because this is too short to plan a reply from scratch, listeners must begin preparing their answer while the other person is still talking. A conversation, in other words, is (1)a feat of prediction as much as of listening.

Against this background of rapid exchange, a longer silence stands out. If you ask a friend whether she enjoyed the dinner you cooked and she pauses for two full seconds before saying "Yes," you are likely to doubt her answer. The delay itself tells you something that the word does not. Studies of conversation suggest that delayed responses are often associated with answers the speaker would rather not give, such as refusals, disagreements, or unwelcome news. ( 2 ), a quick "yes" sounds sincere, while a slow one sounds reluctant.

However, the meaning of silence is not the same everywhere. Communities differ in how long a pause can last before it feels uncomfortable. In some, a silence of several seconds in the middle of a conversation is perfectly acceptable and may even suggest thoughtfulness or respect. In others, the same silence would feel awkward, and someone would hurry to fill it. These differences can cause misunderstandings when people from different backgrounds talk to each other. One speaker may interpret the other's silence as coldness, while the other may regard the first speaker's constant talk as a failure to listen. Neither is being rude; each is simply following the rules they learned without realizing it.

Such rules are learned early and held deeply. Children absorb them long before they can explain them, by watching and listening to the adults around them. For this reason, people often find it easier to learn the vocabulary and grammar of a new language than to adjust to its rhythm of speaking and pausing. (3)A learner may speak with perfect grammar and still seem slightly "off" to native speakers without either side being able to say exactly why.

Understanding the role of silence can make us more generous listeners. When a pause makes us uncomfortable, we might ask ( 4 ) from the other person's intentions or merely from our own expectations. Silence, after all, is part of the conversation, and like any part of a language, it has to be learned.`,
          notes: [
            { word: "from scratch", meaning: "ゼロから・最初から" },
            { word: "reluctant", meaning: "気が進まない" },
            { word: "off", meaning: "（ここでは）どこか変な・ずれている" },
          ],
        },
      ],
      questions: [
        ch({
          id: "feat",
          u: VOCAB,
          d: 1,
          p: "Which of the following is closest in meaning to the underlined part (1) \"a feat\"?",
          o: [
            ["an impressive achievement", "正解。feat は「（技術や力のいる）偉業・離れわざ」。0.5秒未満で返答を準備するのは見事な予測の技だという文脈。"],
            ["a careless habit", "「不注意な習慣」では、すばやく予測する能力をほめる文脈と合わない。"],
            ["a simple rule", "「単純な規則」ではない。予測は高度な働き。"],
            ["an unexpected accident", "「思いがけない事故」は文脈と無関係。"],
          ],
          pt: "feat ＝偉業。前の段落の「すばやさ」が手がかり",
          st: [
            ["前の内容", "返答の間は {{less than half a second}}、話し終わる前に {{準備を始める}} 必要がある。"],
            ["語の意味", "それをこなすことは {{a feat}}（見事な離れわざ）。"],
          ],
        }),
        ch({
          id: "blank-inshort",
          d: 2,
          p: "Which of the following best fills blank ( 2 )?",
          o: [
            ["In short", "正解。前の内容（遅い返答は望まない答えと結びつく）を「速い yes は本心、遅い yes は気が進まない」と短くまとめている。"],
            ["On the contrary", "「それどころか逆に」は前の内容を打ち消す語。ここは打ち消していない。"],
            ["Despite this", "「それにもかかわらず」では、前の内容と逆の結論になるはずだが、後ろは同じ方向のまとめ。"],
            ["Until then", "時間の表現で、論理がつながらない。"],
          ],
          pt: "後ろが前の要約なら In short / In other words",
          st: [
            ["前の内容", "遅い返答は {{refusals, disagreements, unwelcome news}} と結びつきやすい。"],
            ["後ろの内容", "速い yes ＝ sincere、遅い yes ＝ reluctant。前の内容の {{まとめ}} → In short。"],
          ],
        }),
        ch({
          id: "prepare-early",
          d: 2,
          p: "According to the second paragraph, why must listeners begin preparing their answer while the other person is still talking?",
          o: [
            ["Because the usual gap between turns is too short to plan a reply from the beginning.", "正解。Because this is too short to plan a reply from scratch。"],
            ["Because speakers usually become angry if they have to wait.", "相手が怒るとは書いていない。"],
            ["Because researchers have told them to do so.", "研究者は会話を測っただけで、指示はしていない。"],
            ["Because long silences are considered polite everywhere.", "第4段落で、沈黙の受けとり方は地域でちがうと述べている。"],
          ],
          pt: "Because ... の文がそのまま理由",
          st: [
            ["事実", "交代の間は {{less than half a second}} が多い。"],
            ["理由", "{{too short to plan a reply from scratch}}：ゼロから考えるには短すぎる。"],
          ],
        }),
        ch({
          id: "two-seconds",
          d: 2,
          p: "What does the example of the friend who pauses before saying \"Yes\" illustrate?",
          o: [
            ["A delay can communicate something that the spoken word itself does not.", "正解。The delay itself tells you something that the word does not。"],
            ["People always tell the truth when they answer slowly.", "遅い返答は本心を疑わせると述べており、逆。"],
            ["It is impolite to ask friends about the food you have cooked.", "質問の礼儀の話ではない。"],
            ["Two seconds is the normal length of a pause in conversation.", "ふつうの間は half a second 未満。2秒は「目立つ長さ」の例。"],
          ],
          pt: "例の直後の一般化の文が答え",
          st: [
            ["例", "「料理はおいしかった？」に {{2秒}} おいて「うん」→ 答えを疑う。"],
            ["一般化", "{{The delay itself tells you something that the word does not}}。"],
          ],
        }),
        ch({
          id: "misunderstanding",
          d: 3,
          p: "According to the fourth paragraph, what causes misunderstandings between people from different backgrounds?",
          o: [
            ["Each side unconsciously follows different rules about how long a pause should last.", "正解。each is simply following the rules they learned without realizing it。"],
            ["One side is deliberately trying to be rude to the other.", "Neither is being rude とはっきり否定されている。"],
            ["One side does not know the vocabulary of the other's language.", "語彙ではなく、沈黙の長さの感じ方のちがいの話。"],
            ["Both sides talk constantly and never pause at all.", "片方の constant talk と、もう片方の silence の対比。両方が話し続けるのではない。"],
          ],
          pt: "Neither is being rude の打ち消しを見のがさない",
          st: [
            ["何がちがうか", "{{how long a pause can last before it feels uncomfortable}}（気まずくなる沈黙の長さ）。"],
            ["原因", "どちらも {{無意識に学んだ規則}} に従っているだけ（without realizing it）。"],
          ],
        }),
        ch({
          id: "seem-off",
          d: 3,
          p: "What does the underlined sentence (3) suggest?",
          o: [
            ["Speaking a language naturally involves more than correct grammar, including its rhythm of pausing.", "正解。直前の「語彙・文法より話し方と間のリズムに合わせるほうが難しい」を受けた例。"],
            ["Native speakers are usually unable to understand learners with perfect grammar.", "「少し変に感じる」だけで、理解できないとは言っていない。"],
            ["Learners should stop studying grammar and focus only on silence.", "本文は文法の学習をやめろとは言っていない。"],
            ["Native speakers can always explain exactly what is wrong with a learner's speech.", "without either side being able to say exactly why と逆。"],
          ],
          pt: "For this reason の段落の流れで下線部を読む",
          st: [
            ["前の文", "語彙・文法より {{rhythm of speaking and pausing}} のほうが身につけにくい。"],
            ["下線部", "文法が完ぺきでも {{間のリズム}} がずれると「どこか変」に感じられる。理由はどちらも言えない。"],
          ],
        }),
        ch({
          id: "learned-early",
          d: 2,
          p: "According to the passage, why do people often find it hard to adjust to the rhythm of speaking and pausing in a new language?",
          o: [
            ["Because rules about pausing are absorbed early in childhood and held deeply.", "正解。Such rules are learned early and held deeply. ... For this reason。"],
            ["Because the rhythm of speaking is never taught to children.", "子どもは大人を見聞きして身につけるとあり、「身につかない」のではない。"],
            ["Because grammar is much more complicated than pausing.", "本文は逆に、文法のほうが身につけやすいことが多いと言っている。"],
            ["Because native speakers refuse to pause when talking to learners.", "本文にない。"],
          ],
          pt: "For this reason の前に理由がある",
          st: [
            ["目印", "{{For this reason}}, people often find it easier to learn the vocabulary and grammar ... の前の文を見る。"],
            ["理由", "{{learned early and held deeply}}、説明できるようになるよりずっと前に身につく。"],
          ],
        }),
        ch({
          id: "true-silence",
          d: 3,
          p: "Which of the following is consistent with the passage?",
          o: [
            ["In some communities, a long pause may be taken as a sign of respect.", "正解。may even suggest thoughtfulness or respect とある。"],
            ["Delayed answers are always lies.", "often associated with ... と傾向を述べるだけで、always lies ではない。"],
            ["Children learn rules about silence mainly through explanations at school.", "by watching and listening to the adults around them とあり、学校での説明ではない。"],
            ["Researchers have found that the usual gap between turns is longer than two seconds.", "frequently less than half a second とある。"],
          ],
          pt: "内容一致は本文の一語と選択肢の一語を照らす",
          st: [
            ["各選択肢の場所", "沈黙と敬意 → 第4段落、遅い返答 → 第3段落、子ども → 第5段落、間の長さ → 第2段落。"],
            ["一致", "第4段落 {{may even suggest thoughtfulness or respect}} と一致。"],
          ],
        }),
        od({
          id: "order-whether",
          u: "h-eng-gram-setsuzokushi",
          d: 2,
          p: "Put the words in the correct order to fill blank ( 4 ) in the last paragraph.\n\"When a pause makes us uncomfortable, we might ask ( 4 ) from the other person's intentions or merely from our own expectations.\"",
          tokens: ["whether", "our", "discomfort", "comes"],
          distractor: "does",
          pt: "ask whether S V ＝「S が V するかどうかを問う」",
          st: [
            ["名詞節を作る", "ask の目的語は {{whether}}（～かどうか）で始まる節。"],
            ["語順", "節の中はふつうの語順 {{our discomfort comes}}。疑問文の語順（does ... come）にしない。"],
          ],
        }),
      ],
    },
  },
];

// =====================================================================
// 第2問　社会・科学・歴史の論説文 (論旨・推論・内容一致。1回6問。1節9問から6問)
// =====================================================================

const LEAD2 = "Read the following passage and answer the questions.";

const S2: ExamPoolSection[] = [
  {
    unit: CHOBUN,
    tag: TAG2,
    section: {
      id: "sophia-eigo-2-boredom",
      title: "退屈を弁護する",
      lead: LEAD2,
      style: "reading",
      pick: 6,
      material: [
        {
          kind: "passage",
          lang: "en",
          title: "In Defense of Boredom",
          body: `Few experiences have a worse reputation than boredom. We describe it as something to be "killed," and modern life offers us endless weapons for the job. A few seconds of waiting at a bus stop or in a queue is now enough to make many people reach for their phones. It is possible to go through an entire day without ever being left alone with nothing to do. For most of us, this seems like progress. But a growing number of psychologists have begun to wonder whether we have lost something along the way.

Boredom, they point out, is not simply the absence of stimulation. It is an uncomfortable state of wanting to be engaged and failing to find anything engaging. That discomfort, like hunger or thirst, may serve a purpose: it pushes us to change what we are doing. In this view, boredom is a signal that our current activity is not meeting our needs, and it motivates us to look for something more meaningful. If we always silence the signal the moment it appears, we may never hear what it is trying to tell us.

Some researchers have also explored a possible link between boredom and creativity. In a typical experiment, one group of participants is first given a deliberately dull task, such as copying numbers from a list, while another group goes straight to a creative task, such as thinking of as many uses as possible for an ordinary object. In several studies of this kind, the participants who had been bored first came up with more ideas. One explanation is that a dull task leaves the mind free to wander, and a wandering mind makes unexpected connections. However, the researchers themselves caution that the effect is often small and that not every study has found it. Boredom is not a magic recipe for originality.

It is also important to distinguish between different kinds of boredom. The restless, temporary boredom of a long train journey is very different from a deep and lasting sense that nothing in one's life is worth doing. The latter is associated with serious problems and should not be romanticized. Defenders of boredom are speaking only about the first kind: the ordinary, short-lived moments of emptiness that once filled the gaps in everyone's day.

What, then, should we do? Few people would suggest throwing away our phones. The point is rather that we might allow ourselves, from time to time, to sit with boredom instead of escaping it immediately. A walk without headphones, a wait without a screen, a quiet evening without a plan: these small experiments cost little. At worst, they are mildly uncomfortable. At best, they give the mind the space it needs to notice what it really wants.

In a world designed to keep us constantly occupied, being bored may require a deliberate choice. That choice may turn out to be more valuable than it looks.`,
          notes: [
            { word: "stimulation", meaning: "刺激" },
            { word: "engaged / engaging", meaning: "夢中になっている／夢中にさせる" },
            { word: "romanticize", meaning: "美化する" },
          ],
        },
      ],
      questions: [
        ch({
          id: "killed",
          d: 1,
          p: "The author writes that we describe boredom as something to be \"killed.\" What does this expression show?",
          o: [
            ["People generally see boredom as something to get rid of.", "正解。直後に「現代の生活はそのための武器を無数にくれる」と、退屈を消す道具（スマホなど）の話が続く。"],
            ["Boredom can be physically dangerous.", "比喩であり、身体の危険の話ではない。"],
            ["People enjoy being bored for a long time.", "Few experiences have a worse reputation とあり逆。"],
            ["Psychologists want to protect people from boredom.", "心理学者はむしろ退屈の価値を見直している。"],
          ],
          pt: "kill time と同じ発想：消してしまいたいもの",
          st: [
            ["直前の文", "{{Few experiences have a worse reputation than boredom}}：退屈は評判がとても悪い。"],
            ["比喩", "「殺す」もの＝ {{なくしたいもの}}。武器＝スマホなどの気晴らし。"],
          ],
        }),
        ch({
          id: "signal",
          d: 2,
          p: "What is the main point of the second paragraph?",
          o: [
            ["Boredom may be a useful signal that pushes us to change what we are doing.", "正解。boredom is a signal that our current activity is not meeting our needs, and it motivates us ...。"],
            ["Boredom is simply the absence of anything to do.", "is not simply the absence of stimulation と否定されている。"],
            ["Boredom is caused by hunger or thirst.", "hunger or thirst はたとえ（like）で、原因ではない。"],
            ["We should silence boredom as soon as it appears.", "If we always silence the signal ... we may never hear ... と、すぐ消すことに否定的。"],
          ],
          pt: "like hunger or thirst は「たとえ」。原因と取らない",
          st: [
            ["定義", "退屈＝{{夢中になりたいのに、夢中になれるものがない}} 不快な状態。"],
            ["役割", "空腹のように {{行動を変えさせる合図}} になる。"],
          ],
        }),
        ch({
          id: "experiment",
          d: 2,
          p: "In the experiments described in the third paragraph, which participants came up with more ideas?",
          o: [
            ["Those who had first done a deliberately dull task", "正解。the participants who had been bored first came up with more ideas。"],
            ["Those who went straight to the creative task", "直接、創造的な課題に取り組んだのは比べる側のグループ。"],
            ["Those who were allowed to use their phones", "実験の説明にスマホは出てこない。"],
            ["Those who copied the most numbers correctly", "数字を写す正確さで比べてはいない。"],
          ],
          pt: "2つのグループの条件を整理してから答える",
          st: [
            ["グループ", "A：まず {{退屈な課題}}（数字を写す）→ 創造的課題。B：すぐに創造的課題。"],
            ["結果", "{{bored first}} のグループのほうがアイデアが多かった。"],
          ],
        }),
        ch({
          id: "caution",
          d: 3,
          p: "Why does the author mention that \"the researchers themselves caution that the effect is often small\"?",
          o: [
            ["To show that the link between boredom and creativity should not be overstated.", "正解。直後に Boredom is not a magic recipe for originality と続く。"],
            ["To prove that the experiments were badly designed.", "実験の設計が悪いとは書いていない。"],
            ["To argue that boredom has no connection with creativity at all.", "several studies で効果が見られたとあり、全否定ではない。"],
            ["To suggest that readers should avoid creative tasks.", "本文にない。"],
          ],
          pt: "However の後は「言いすぎ」へのブレーキ",
          st: [
            ["流れ", "効果があった研究 → {{However}}、効果は小さく、見られない研究もある。"],
            ["筆者の意図", "{{not a magic recipe}}：魔法の方法ではない。言いすぎないための注意です。"],
          ],
        }),
        ch({
          id: "two-kinds",
          d: 3,
          p: "Why does the author distinguish between different kinds of boredom in the fourth paragraph?",
          o: [
            ["To make clear that the argument applies only to ordinary, short-lived boredom.", "正解。Defenders of boredom are speaking only about the first kind。"],
            ["To argue that deep and lasting boredom is the most creative kind.", "The latter ... should not be romanticized と、深い退屈を美化しないよう述べる。"],
            ["To show that train journeys are the main cause of boredom.", "列車の旅は一時的な退屈の例にすぎない。"],
            ["To claim that all kinds of boredom are equally harmful.", "2種類を区別しているのだから、同じとは言っていない。"],
          ],
          pt: "the latter（後者）が何を指すかを確かめる",
          st: [
            ["2種類", "一時的な退屈（長い列車の旅）／{{深く長く続く}}「何もする価値がない」感覚。"],
            ["区別の目的", "弁護の対象は {{the first kind}} だけ、と範囲をはっきりさせるため。"],
          ],
        }),
        ch({
          id: "suggestion",
          d: 2,
          p: "What does the author suggest we should do?",
          o: [
            ["Occasionally allow ourselves to stay with boredom instead of escaping it at once.", "正解。we might allow ourselves, from time to time, to sit with boredom instead of escaping it immediately。"],
            ["Throw away our phones and never use screens again.", "Few people would suggest throwing away our phones と否定されている。"],
            ["Spend every evening without any plan.", "例は from time to time（ときどき）の小さな試み。毎晩ではない。"],
            ["Find a new activity as soon as we feel bored.", "それはまさに筆者が見直そうとしている「すぐ逃げる」行動。"],
          ],
          pt: "from time to time を言いすぎた選択肢は誤り",
          st: [
            ["否定されている案", "{{Few people would suggest throwing away our phones}}。"],
            ["筆者の案", "{{from time to time}}、退屈から {{すぐ逃げない}}。"],
          ],
        }),
        ch({
          id: "not-consistent",
          d: 3,
          p: "Which of the following is NOT consistent with the passage?",
          o: [
            ["Deep and lasting boredom should be encouraged because it leads to creativity.", "正解（本文と合わない）。深く長く続く退屈は should not be romanticized。創造性との結びつきは一時的な退屈の話。"],
            ["Many people now reach for their phones after only a few seconds of waiting.", "第1段落に A few seconds of waiting ... is now enough to make many people reach for their phones とある。"],
            ["A dull task may leave the mind free to wander.", "第3段落の One explanation の内容と一致。"],
            ["Small experiments with boredom cost little.", "第5段落 these small experiments cost little と一致。"],
          ],
          pt: "NOT consistent は「合わない1つ」を選ぶ",
          st: [
            ["1つずつ照合", "スマホ → 第1段落、心がさまよう → 第3段落、小さな試み → 第5段落。いずれも一致。"],
            ["合わない1つ", "深い退屈は {{should not be romanticized}}。すすめるとは逆です。"],
          ],
        }),
        ch({
          id: "purpose-boredom",
          d: 3,
          p: "What is the author's main purpose in writing this passage?",
          o: [
            ["To argue that brief moments of boredom may have a value that we often overlook.", "正解。題の In Defense of Boredom と最終段落の more valuable than it looks。"],
            ["To report the exact results of a single scientific experiment.", "実験は1段落の話題で、数値も出していない。"],
            ["To warn readers that phones are destroying human creativity.", "スマホを捨てよとは言っておらず、言いすぎ。"],
            ["To explain how to treat serious, long-lasting boredom.", "深い退屈は扱いの範囲外とした。"],
          ],
          pt: "題と最終段落が筆者の目的を示す",
          st: [
            ["題", "{{In Defense of Boredom}}（退屈の弁護）。"],
            ["結論", "退屈を選ぶことは {{more valuable than it looks}}。見のがされている価値の主張です。"],
          ],
        }),
        ch({
          id: "romanticized",
          u: VOCAB,
          d: 2,
          p: "In the fourth paragraph, the word \"romanticized\" is closest in meaning to",
          o: [
            ["treated as more attractive than it really is", "正解。romanticize は「実際より美しく・魅力的に描く」。深刻な問題をよいもののように扱うな、という文脈。"],
            ["described in a foreign language", "Roman（ローマ）から連想した誤り。"],
            ["studied by scientists", "「研究される」では should not の文意が通らない。"],
            ["forgotten completely", "「すっかり忘れられる」は意味がちがう。"],
          ],
          pt: "serious problems と結びつく語は「美化」",
          st: [
            ["文脈", "深い退屈は {{serious problems}} と結びつく → 美しいものとして扱うべきでない。"],
            ["意味", "romanticize ＝ {{美化する}}。"],
          ],
        }),
      ],
    },
  },
  {
    unit: CHOBUN,
    tag: TAG2,
    section: {
      id: "sophia-eigo-2-dark",
      title: "消えていく夜の闇",
      lead: LEAD2,
      style: "reading",
      pick: 6,
      material: [
        {
          kind: "passage",
          lang: "en",
          title: "The Disappearing Dark",
          body: `For almost all of human history, the night sky was a shared inheritance. Anyone who stepped outside on a clear night, in a village or a city, could see thousands of stars and the pale band of the Milky Way stretching overhead. Today, a large proportion of the world's population lives under skies so bright that the Milky Way is never visible. Many children have grown up without once seeing it. The cause is not clouds or smoke but our own lights.

Artificial light at night, often called light pollution, has spread with remarkable speed. Streetlights, illuminated advertisements, sports grounds, and the windows of office buildings all send light upward and outward, where it is scattered by particles in the air and creates a glow over populated areas. This glow can be seen from great distances. A town that seems small on a map may light up the sky for many kilometers around it.

For a long time, the loss of the stars was regarded mainly as a problem for astronomers, who have had to move their telescopes to ever more remote mountaintops. But scientists now recognize that artificial light affects living things in ways that go far beyond the beauty of the sky. Many animals depend on darkness. Some insects are drawn to lamps and circle them until they die of exhaustion. Young sea turtles, which hatch on beaches at night, normally find the sea by moving toward the brighter horizon over the water; near brightly lit coastlines, they may crawl inland instead. Migrating birds can become confused by the lights of tall buildings. Even plants respond to changes in the length of the night.

Humans, too, are affected. Our bodies follow a daily rhythm that is regulated partly by the cycle of light and darkness. Exposure to bright light late in the evening can delay sleep and disturb this rhythm. Researchers are still investigating how serious the long-term effects may be, but the basic principle is clear: we evolved in a world with dark nights, and our bodies still expect them.

The encouraging news is that light pollution, unlike many environmental problems, can be reduced quickly. Light does not linger once it is switched off. Simple changes can make a noticeable difference: shielding lamps so that they shine downward rather than into the sky, using warmer and dimmer light where bright light is not needed, and turning off lights that serve no purpose late at night. Some towns have adopted such measures and have been rewarded with darker skies, lower energy bills, and, in some cases, visitors who come specifically to see the stars.

None of this requires us to return to a world without lights. Light at night brings real benefits, including safety and convenience. The question is not whether to use light, but how to use it wisely: to light what we need, when we need it, and no more.`,
          notes: [
            { word: "inheritance", meaning: "受けつがれたもの・遺産" },
            { word: "scatter", meaning: "散らす・散乱させる" },
            { word: "hatch", meaning: "（卵から）かえる" },
          ],
        },
      ],
      questions: [
        ch({
          id: "cause-bright",
          d: 1,
          p: "According to the first paragraph, why can many people no longer see the Milky Way?",
          o: [
            ["Because artificial lights make the night sky too bright.", "正解。The cause is not clouds or smoke but our own lights。"],
            ["Because the air is full of clouds and smoke.", "not clouds or smoke と否定されている。"],
            ["Because the Milky Way has moved farther from the earth.", "本文にない。"],
            ["Because children are not interested in the stars.", "見えないのは関心の問題ではなく、空の明るさのため。"],
          ],
          pt: "not A but B の B が原因",
          st: [
            ["該当の文", "{{The cause is not clouds or smoke but our own lights}}。"],
            ["言いかえ", "our own lights ＝ {{artificial lights}}。"],
          ],
        }),
        ch({
          id: "glow-distance",
          d: 2,
          p: "What point does the author make with the example of \"a town that seems small on a map\"?",
          o: [
            ["The glow from a town's lights can spread far beyond the town itself.", "正解。This glow can be seen from great distances ... may light up the sky for many kilometers around it。"],
            ["Small towns produce no light pollution at all.", "小さく見える町でも周囲何キロも空を明るくする、と逆のことを述べる。"],
            ["Maps do not show the real size of towns.", "地図の正確さの話ではない。"],
            ["Only large cities have streetlights.", "本文にない。"],
          ],
          pt: "例の直前の文（This glow can be seen ...）と結ぶ",
          st: [
            ["前の文", "{{This glow can be seen from great distances}}。"],
            ["例の役割", "地図では小さな町でも、光は {{many kilometers around it}} に広がる。"],
          ],
        }),
        ch({
          id: "astronomers",
          d: 3,
          p: "Why does the author mention astronomers in the third paragraph?",
          o: [
            ["To show that light pollution was once thought of mainly as their problem, before its wider effects were recognized.", "正解。For a long time ... regarded mainly as a problem for astronomers. But scientists now recognize ...。"],
            ["To argue that telescopes are the main cause of light pollution.", "望遠鏡は光害の原因ではなく、光害を避けて山に移された。"],
            ["To praise astronomers for solving the problem of light pollution.", "解決したとは書いていない。"],
            ["To explain why mountaintops are brighter than cities.", "山頂は暗いから望遠鏡が移されたのであり逆。"],
          ],
          pt: "For a long time ... But now ＝見方の変化",
          st: [
            ["昔の見方", "星が見えないのは {{天文学者の問題}} だった。"],
            ["今の見方", "{{But scientists now recognize}}：生き物全体に影響する。天文学者はその対比のために出てきます。"],
          ],
        }),
        ch({
          id: "turtles",
          d: 2,
          p: "According to the passage, what may happen to young sea turtles near brightly lit coastlines?",
          o: [
            ["They may move away from the sea instead of toward it.", "正解。near brightly lit coastlines, they may crawl inland instead。"],
            ["They may hatch during the day instead of at night.", "かえる時間が変わるとは書いていない。"],
            ["They may circle the lamps until they die of exhaustion.", "それは一部の昆虫（Some insects）の説明。"],
            ["They may find the sea more quickly than usual.", "明るい海岸では海とは逆の陸側へ進んでしまう。"],
          ],
          pt: "生き物ごとの説明を取りちがえない",
          st: [
            ["ふつうの場合", "{{brighter horizon over the water}}（海の上の明るい地平線）へ向かって海を見つける。"],
            ["明るい海岸", "陸側のほうが明るくなるので {{crawl inland}}（内陸へはう）。"],
          ],
        }),
        ch({
          id: "humans",
          d: 3,
          p: "Which of the following best summarizes what the fourth paragraph says about humans?",
          o: [
            ["Light at night can disturb our daily rhythm, although its long-term effects are still being studied.", "正解。delay sleep and disturb this rhythm と Researchers are still investigating の両方をふくむ。"],
            ["Scientists have proved that light at night causes serious diseases.", "how serious the long-term effects may be は調査中で、証明されたとは書いていない。"],
            ["Human bodies are no longer affected by light and darkness.", "our bodies still expect them（暗い夜を今も前提にしている）と逆。"],
            ["Bright light in the evening helps people fall asleep earlier.", "can delay sleep とあり逆。"],
          ],
          pt: "研究中のことを「証明された」とする選択肢は誤り",
          st: [
            ["わかっていること", "夜の強い光は {{睡眠を遅らせ}}、体のリズムを乱しうる。"],
            ["わかっていないこと", "{{long-term effects}} の深刻さは研究中。両方を正しく言っている選択肢を選ぶ。"],
          ],
        }),
        ch({
          id: "reduce-quickly",
          d: 3,
          p: "According to the passage, why can light pollution be reduced more quickly than many other environmental problems?",
          o: [
            ["Because light disappears as soon as the source is switched off.", "正解。Light does not linger once it is switched off。"],
            ["Because most people do not use lights at night.", "本文にない。光は広く使われている。"],
            ["Because governments have already banned bright lights.", "禁止の話はない。最終段落は光を使いつづける前提。"],
            ["Because light pollution affects only astronomers.", "第3段落で、生き物全体に影響すると述べている。"],
          ],
          pt: "主張（can be reduced quickly）の直後の文が理由",
          st: [
            ["主張", "{{unlike many environmental problems, can be reduced quickly}}。"],
            ["理由", "{{Light does not linger once it is switched off}}：消せばすぐなくなり、残らない。"],
          ],
        }),
        ch({
          id: "not-solution",
          d: 1,
          p: "Which of the following is NOT mentioned as a way to reduce light pollution?",
          o: [
            ["banning all outdoor lighting at night", "正解。本文は None of this requires us to return to a world without lights と、全廃をすすめていない。"],
            ["shielding lamps so that they shine downward", "第5段落に shielding lamps so that they shine downward とある。"],
            ["using warmer and dimmer light where possible", "using warmer and dimmer light where bright light is not needed の言いかえ。"],
            ["turning off lights that serve no purpose late at night", "第5段落にそのままある。"],
          ],
          pt: "本文の3つの対策を消していく",
          st: [
            ["対策を探す", "第5段落：{{shielding / warmer and dimmer / turning off}} の3つ。"],
            ["残り", "「すべての屋外照明を禁止」は最終段落の考えと逆です。"],
          ],
        }),
        ch({
          id: "position-light",
          d: 3,
          p: "Which of the following best describes the author's overall position?",
          o: [
            ["We should use artificial light more carefully rather than give it up.", "正解。The question is not whether to use light, but how to use it wisely。"],
            ["We should return to a world without artificial light.", "None of this requires us to return to a world without lights と否定。"],
            ["Light pollution is a minor problem that does not deserve attention.", "生き物・人への影響を述べ、軽い問題とはしていない。"],
            ["Only astronomers need to worry about light pollution.", "それは昔の見方として紹介されたもの。"],
          ],
          pt: "not whether A but how B の B が結論",
          st: [
            ["最終段落", "{{not whether to use light, but how to use it wisely}}。"],
            ["まとめ", "必要なところに、必要なときだけ。{{上手に使う}} が筆者の立場です。"],
          ],
        }),
        ch({
          id: "linger",
          u: VOCAB,
          d: 2,
          p: "In the fifth paragraph, the word \"linger\" is closest in meaning to",
          o: [
            ["remain", "正解。linger は「（なかなか去らずに）残る」。消したあと光が残らない、という文脈。"],
            ["shine", "「光る」では文意が通らない（消したら光らないのは当然で、論点にならない）。"],
            ["travel", "「進む」は意味がちがう。"],
            ["increase", "「増える」は意味がちがう。"],
          ],
          pt: "他の公害との対比（残るもの／残らないもの）",
          st: [
            ["対比", "多くの環境問題は {{汚れが長く残る}}。光はちがう。"],
            ["意味", "does not linger ＝ {{残らない}} → remain。"],
          ],
        }),
      ],
    },
  },
  {
    unit: CHOBUN,
    tag: TAG2,
    section: {
      id: "sophia-eigo-2-below",
      title: "ふつうの人びとの歴史",
      lead: LEAD2,
      style: "reading",
      pick: 6,
      material: [
        {
          kind: "passage",
          lang: "en",
          title: "History from Below",
          body: `For a long time, history was largely the story of the powerful. Historians wrote about kings and generals, treaties and battles, because these were the subjects that official records described in detail. The lives of ordinary people, such as farmers, servants, shopkeepers, and children, appeared, if at all, only as numbers in tax lists or as nameless crowds in the background of great events.

During the twentieth century, a growing number of historians set out to change this. They argued that the past could not be understood fully by looking only at those who held power, and they began searching for the voices of people who had left few traces. This approach, sometimes called "history from below," required new kinds of sources. Historians turned to court records, in which ordinary people described their quarrels and complaints; to parish registers that recorded births, marriages, and deaths; to private letters and diaries; and, for more recent periods, to recorded interviews with elderly people about their memories.

Each of these sources has its limitations. Court records show people at moments of conflict, which may give a misleading picture of daily life. Diaries were usually kept by those who could read and write, so the poorest members of society are still underrepresented. Memories recorded decades after the events they describe may be shaped by later experiences. Careful historians do not ignore these problems. Instead, they read such sources critically, comparing them with one another and asking who produced each document, for what purpose, and for what audience.

Despite these difficulties, the results have been remarkable. Historians have reconstructed how families divided their work, how neighbors settled disputes without going to court, and how people coped with illness, hunger, and loss. They have shown that ordinary people were not merely passive victims of events but often found ways to resist, adapt, and shape their own circumstances. In some cases, a single collection of letters has allowed historians to follow the life of an otherwise unknown individual in rich detail, revealing hopes and fears that no official record would have preserved.

This shift has also changed the relationship between historians and the public. Local history societies, schools, and families have joined in collecting old photographs, letters, and memories, recognizing that the materials sitting in a drawer or an attic may one day be valuable evidence. In this sense, history from below is not only a method of studying the past but also an invitation to everyone to take part in preserving it.

The kings and generals have not disappeared from history books, nor should they. But they now share the pages with many others, and our picture of the past is fuller and more human as a result.`,
          notes: [
            { word: "parish register(s)", meaning: "（教会の）教区の記録簿" },
            { word: "attic", meaning: "屋根裏部屋" },
            { word: "passive", meaning: "受け身の" },
          ],
        },
      ],
      questions: [
        ch({
          id: "why-powerful",
          d: 1,
          p: "According to the first paragraph, why did historians once write mainly about the powerful?",
          o: [
            ["Because official records described such people and events in detail.", "正解。because these were the subjects that official records described in detail。"],
            ["Because ordinary people asked not to be written about.", "本文にない。"],
            ["Because kings and generals wrote all the history books themselves.", "書いたのは historians。"],
            ["Because ordinary people did not exist in tax lists.", "税の記録に「数として」は出てくる（only as numbers in tax lists）。"],
          ],
          pt: "because の後がそのまま理由",
          st: [
            ["理由の文", "{{because these were the subjects that official records described in detail}}。"],
            ["ふつうの人は", "税の記録の {{数}} や、名のない群衆としてしか出てこなかった。"],
          ],
        }),
        ch({
          id: "not-source",
          d: 2,
          p: "Which of the following is NOT mentioned as a new kind of source used in \"history from below\"?",
          o: [
            ["secret military plans of governments", "正解。本文の資料は裁判記録・教区記録簿・手紙と日記・聞き取りで、軍の計画は出てこない（むしろ「権力者の歴史」の側）。"],
            ["court records", "第2段落に court records とある。"],
            ["parish registers", "第2段落に parish registers とある。"],
            ["recorded interviews with elderly people", "for more recent periods, to recorded interviews with elderly people とある。"],
          ],
          pt: "セミコロン（;）で区切られた資料を1つずつ数える",
          st: [
            ["列挙を探す", "{{court records; parish registers; private letters and diaries; recorded interviews}}。"],
            ["消去する", "残る {{軍の計画}} は本文にない。"],
          ],
        }),
        ch({
          id: "diaries-limit",
          d: 3,
          p: "According to the third paragraph, what is a limitation of diaries as historical sources?",
          o: [
            ["They were mostly kept by people who could read and write, so the poorest are still underrepresented.", "正解。Diaries were usually kept by those who could read and write, so the poorest members of society are still underrepresented。"],
            ["They show people only at moments of conflict.", "それは court records の限界。"],
            ["They were written decades after the events they describe.", "それは後から記録された memories の限界。"],
            ["They were usually destroyed by governments.", "本文にない。"],
          ],
          pt: "資料と限界の組み合わせを入れかえた選択肢に注意",
          st: [
            ["3つの限界", "裁判記録＝{{対立の場面}}／日記＝{{読み書きできる人}}／記憶＝{{後の経験で変わる}}。"],
            ["日記の限界", "最も貧しい人びとは {{まだ少ししか表れない}}。"],
          ],
        }),
        ch({
          id: "critically",
          d: 3,
          p: "How do careful historians deal with the limitations of their sources?",
          o: [
            ["They compare sources and ask who produced each one, for what purpose, and for whom.", "正解。comparing them with one another and asking who produced each document, for what purpose, and for what audience。"],
            ["They use only official records, which have no limitations.", "公式記録にかぎるのは「下からの歴史」の逆。"],
            ["They ignore the problems because the sources are too valuable.", "Careful historians do not ignore these problems とある。"],
            ["They rely only on the memories of elderly people.", "記憶にも限界があると述べている。"],
          ],
          pt: "Instead 以下が答え",
          st: [
            ["否定", "{{do not ignore these problems}}。"],
            ["方法", "{{read such sources critically}}：くらべ合わせ、作り手・目的・読み手を問う。"],
          ],
        }),
        ch({
          id: "not-passive",
          d: 2,
          p: "According to the fourth paragraph, what have historians shown about ordinary people?",
          o: [
            ["They often actively resisted, adapted to, and shaped their own circumstances.", "正解。not merely passive victims of events but often found ways to resist, adapt, and shape their own circumstances。"],
            ["They were merely passive victims of great events.", "not merely passive victims と否定されている。"],
            ["They always settled their disputes in court.", "how neighbors settled disputes without going to court とあり逆。"],
            ["They left no letters or other personal records.", "a single collection of letters ... の例があり逆。"],
          ],
          pt: "not merely A but B の B が発見の中身",
          st: [
            ["否定", "{{not merely passive victims}}：ただの受け身の犠牲者ではない。"],
            ["肯定", "{{resist, adapt, and shape}}：抵抗し、適応し、自分の状況を形づくった。"],
          ],
        }),
        ch({
          id: "invitation",
          d: 3,
          p: "What does the author mean by calling history from below \"an invitation to everyone to take part in preserving it\"?",
          o: [
            ["Ordinary people can help by collecting and keeping materials that may become historical evidence.", "正解。直前に地域の歴史の会・学校・家族が古い写真や手紙を集めるとある。"],
            ["Everyone should become a professional historian.", "専門家になれとは言っていない。"],
            ["Historians invite the public to rewrite official records.", "公式記録を書きかえる話ではない。"],
            ["Only families with famous ancestors can contribute to history.", "引き出しや屋根裏の資料はふつうの家にもある。"],
          ],
          pt: "In this sense の this は直前の内容",
          st: [
            ["直前の内容", "地域・学校・家族が {{写真・手紙・記憶}} を集める。引き出しの中の物も {{evidence}} になりうる。"],
            ["意味", "だれでも {{過去を残す作業に加われる}}、ということ。"],
          ],
        }),
        ch({
          id: "kings-view",
          d: 3,
          p: "Which of the following best describes the author's view of kings and generals in history books?",
          o: [
            ["They should remain in history books, but alongside many other people.", "正解。have not disappeared ..., nor should they. But they now share the pages with many others。"],
            ["They should be removed from history books entirely.", "nor should they（消えるべきでもない）とある。"],
            ["They are more important than ordinary people.", "筆者は両方がそろってこそ fuller and more human と言う。"],
            ["They were invented by historians who relied on official records.", "本文にない。"],
          ],
          pt: "nor should they ＝「消えるべきでもない」",
          st: [
            ["最終段落1文目", "{{have not disappeared from history books, nor should they}}。"],
            ["2文目", "{{share the pages with many others}}：ほかの多くの人とページを分け合う。"],
          ],
        }),
        ch({
          id: "court-mislead",
          d: 2,
          p: "Why might court records give \"a misleading picture of daily life\"?",
          o: [
            ["Because they show people at moments of conflict rather than in ordinary situations.", "正解。Court records show people at moments of conflict, which may give a misleading picture of daily life。"],
            ["Because they were written by the poorest members of society.", "日記の限界（読み書きできる人が書いた）と混同した誤り。"],
            ["Because they contain only numbers.", "数だけなのは tax lists の説明。裁判記録では人びとが争いや苦情を述べている。"],
            ["Because they were recorded decades later.", "それは聞き取りの記憶の限界。"],
          ],
          pt: "which の先行詞（前の内容）が原因",
          st: [
            ["文の形", "Court records show people at {{moments of conflict}}, {{which}} may give a misleading picture ...。"],
            ["理由", "争いの場面ばかりなので、{{ふだんの暮らし}} を正しく映さないおそれがある。"],
          ],
        }),
        ch({
          id: "underrepresented",
          u: VOCAB,
          d: 2,
          p: "In the third paragraph, the word \"underrepresented\" is closest in meaning to",
          o: [
            ["appearing less than their real share would suggest", "正解。under-（不足）＋ represented（表される）。人数の割に資料に少ししか表れない。"],
            ["completely absent from all records", "「まったくない」ではない。still underrepresented は「まだ少ない」。"],
            ["described more often than other groups", "逆の意味（overrepresented）。"],
            ["described with great accuracy", "「正確に描かれる」は意味がちがう。"],
          ],
          pt: "under-（足りない）＋ represent（代表される）",
          st: [
            ["語の組み立て", "{{under}}（不足）＋ {{represented}}（表される）。"],
            ["文脈", "日記は読み書きできる人が書いた → 最も貧しい人は {{割合より少ししか}} 表れない。"],
          ],
        }),
      ],
    },
  },
];

// =====================================================================
// 第3問　課題文の内容にもとづく英作文 (毎回1問。課題文を変えた節を4つ)
// =====================================================================

const LEAD3 = "Read the following passage and write an essay in English as instructed.";
const PROMPT3 = "In about 100 English words (80–120 words), first summarize the writer's main claim in your own words, and then explain whether you agree or disagree with it, giving at least one reason or example.";
const RUB = (claim: string, kw: string[]) => [
  { label: `課題文の主張（${claim}）を、本文の文を写さず自分のことばで1〜2文にまとめている`, points: 10, keywords: kw },
  { label: "賛成か反対かをはっきり示し、それを支える理由や具体例を少なくとも1つ書いている", points: 12, keywords: ["I agree", "I disagree", "because", "For example"] },
  { label: "語数（80〜120語）を守り、文法・語法・つづりの誤りが少なく、つなぎの語で論理が追える", points: 8, keywords: ["However", "Therefore", "In conclusion"] },
];
const STEPS3: St = [
  ["要約（1〜2文）", "課題文の {{主張の1文}} を見つけ、本文の語を言いかえてまとめます（The writer argues that ...）。"],
  ["立場と理由", "{{I agree / I disagree}} をはっきり書き、理由か具体例を1つ以上。最後に一文で結論をくり返すと読みやすくなります。"],
  ["見直し", "{{80〜120語}} か、時制・冠詞・三単現の s を確かめます。"],
];

const S3: ExamPoolSection[] = [
  {
    unit: JIYU,
    tag: TAG3,
    section: {
      id: "sophia-eigo-3-translation",
      title: "機械翻訳と外国語学習",
      lead: LEAD3,
      style: "writing",
      material: [
        {
          kind: "passage",
          lang: "en",
          body: `Translation software has improved so much that a traveler can now hold a simple conversation in almost any language by speaking into a phone. Some people conclude that learning a foreign language at school is becoming a waste of time. I believe the opposite is true. A machine can tell us what a sentence means, but it cannot give us the experience of thinking in another language. When we learn a language ourselves, we discover that other people divide the world into different categories, joke about different things, and express politeness in different ways. This discovery changes how we see our own language and culture. No translation, however accurate, can do that work for us. The better our machines become, the more clearly we can see that the real value of language learning was never simply communication.`,
        },
      ],
      questions: [
        wr({
          id: "essay-translation",
          p: PROMPT3,
          lim: [80, 120],
          model:
            "The writer claims that even though translation software is now very useful, learning a foreign language is still worthwhile, because it lets us experience a different way of thinking and see our own culture more clearly. I agree with this view. When I studied English, I noticed that English speakers often say \"I\" and \"you\" clearly, while Japanese speakers tend to leave them out. This small difference made me think about how each language treats the relationship between speakers. A machine could have translated my sentences, but it could not have given me that insight. Therefore, I believe schools should continue to teach foreign languages.",
          rub: RUB("機械翻訳が進んでも、別の考え方にふれて自国の言語・文化を見直せるので外国語学習には価値がある", ["translation", "thinking", "culture", "worthwhile"]),
          pt: "要約は「機械翻訳があっても学ぶ価値がある」とその理由",
          st: STEPS3,
        }),
      ],
    },
  },
  {
    unit: JIYU,
    tag: TAG3,
    section: {
      id: "sophia-eigo-3-literature",
      title: "文学は他者の理解を深めるか",
      lead: LEAD3,
      style: "writing",
      material: [
        {
          kind: "passage",
          lang: "en",
          body: `Schools are often asked to spend less time on novels and poems and more time on subjects that seem directly useful for future jobs. I think this would be a mistake. Literature is one of the few places where we can live, for a few hours, inside the mind of someone completely different from ourselves: a person from another century, another country, or another social class. A good novel does not simply tell us that other people have feelings; it makes us share those feelings and follow the reasons behind them. This practice in imagining other lives is not a luxury. In a society where people with very different backgrounds must work and live together, the ability to understand others may be the most useful skill of all.`,
        },
      ],
      questions: [
        wr({
          id: "essay-literature",
          p: PROMPT3,
          lim: [80, 120],
          model:
            "The writer argues that schools should not reduce the time spent on literature, because reading novels and poems trains us to imagine and understand people who are very different from us, which is an important skill in a diverse society. I partly agree. Reading a story about a girl who moved to a new country helped me understand how lonely my new classmate from abroad might feel. However, I think understanding also comes from real experience, such as working with others on a project. Therefore, schools should keep literature in the curriculum while also giving students chances to meet people with different backgrounds.",
          rub: RUB("文学は異なる他者の心を想像し理解する練習になり、多様な社会で役に立つので減らすべきでない", ["literature", "understand", "imagine", "different"]),
          pt: "主張は「文学＝他者を想像する練習。だから減らすな」",
          st: STEPS3,
        }),
      ],
    },
  },
  {
    unit: JIYU,
    tag: TAG3,
    section: {
      id: "sophia-eigo-3-streets",
      title: "街の中心を歩行者に",
      lead: LEAD3,
      style: "writing",
      material: [
        {
          kind: "passage",
          lang: "en",
          body: `In many cities, the widest and most central public spaces are given to cars. Streets that could hold markets, benches, and trees are instead used for traffic and parking. I believe city centers should be closed to private cars and returned to people on foot. When cars are removed, streets become quieter and safer, and the air becomes cleaner. People begin to linger, talk to neighbors, and visit small shops instead of driving past them. Of course, deliveries, emergency vehicles, and people who cannot walk long distances must still be served, and good public transport is essential. But a street is not only a route from one place to another. It is also a place in itself, and we have forgotten how much life it can contain.`,
        },
      ],
      questions: [
        wr({
          id: "essay-streets",
          p: PROMPT3,
          lim: [80, 120],
          model:
            "The writer believes that private cars should be banned from city centers so that streets can become quiet, safe, and lively places for people, while deliveries, emergency vehicles, and people with special needs are still served. I disagree with a complete ban. In my town, many elderly people live far from the station, and buses run only once an hour. If cars were banned, it would be difficult for them to shop or see a doctor in the center. Instead, I think cities should first improve public transport and close only some streets on weekends. In this way, people could enjoy the street without losing access.",
          rub: RUB("街の中心から自家用車をなくし、歩行者のための静かで安全な場所に戻すべきだ（配達・緊急車両・歩けない人への配慮はする）", ["cars", "city center", "people", "streets"]),
          pt: "条件つきの主張は、条件（Of course ...）もふくめて要約",
          st: STEPS3,
        }),
      ],
    },
  },
  {
    unit: JIYU,
    tag: TAG3,
    section: {
      id: "sophia-eigo-3-letters",
      title: "手書きの手紙の価値",
      lead: LEAD3,
      style: "writing",
      material: [
        {
          kind: "passage",
          lang: "en",
          body: `Most of the messages we send today are typed, sent in seconds, and forgotten almost as quickly. I would like to argue that the handwritten letter still deserves a place in our lives. Writing by hand is slow, and that slowness is exactly its value. Because we cannot easily delete and rewrite, we think more carefully about what we want to say. The person who receives the letter can see our handwriting, the places where we hesitated, and the time we were willing to spend on them. A letter can also be kept for years, in a way that a stream of short messages rarely is. In an age of speed, choosing to write slowly is itself a message: it tells someone that they matter.`,
        },
      ],
      questions: [
        wr({
          id: "essay-letters",
          p: PROMPT3,
          lim: [80, 120],
          model:
            "The writer argues that handwritten letters are still valuable because writing slowly makes us think carefully, shows the receiver how much time and care we spent, and creates something that can be kept for a long time. I agree with the writer. Last year, my grandmother sent me a handwritten card for my birthday. Although it was short, I could feel her warmth in every line, and I still keep it on my desk. I receive many typed messages every day, but I cannot remember most of them. For important moments, I think we should take the time to write by hand.",
          rub: RUB("手書きの手紙は遅いからこそ考えて書け、相手を大切に思う気持ちが伝わり、長く残るので今も価値がある", ["handwritten", "slow", "care", "kept"]),
          pt: "理由は3つ（考える・気持ちが伝わる・残る）を短くまとめる",
          st: STEPS3,
        }),
      ],
    },
  },
];

export const U_SOPHIA_EIGO: UnivExam = {
  key: KEY,
  univ: "上智大学",
  kamoku: "英語",
  tier: "早慶上智",
  order: 103,
  basis: "一般選抜 学部学科試験・共通テスト併用方式のうち、文学部英文学科の学部学科試験「英語適性検査」の傾向を参考（TEAP方式などは独自の英語試験なし）",
  format: "大問3題・75分。人文・社会の長文2題を英語の設問で読み、課題文の内容をふまえた英作文（約100語）を書く。",
  minutes: 75,
  groups: ["語彙", "文法", "技能"],
  sections: [
    { title: "第1問　長文読解（言語・文学・文化）", lead: LEAD1, count: [6, 6], mix: [0.1, 0.4, 0.5], points: 35, prefer: "material", poolTag: TAG1 },
    { title: "第2問　長文読解（社会・科学・歴史の論説）", lead: LEAD2, count: [6, 6], mix: [0.1, 0.4, 0.5], points: 35, prefer: "material", poolTag: TAG2 },
    { title: "第3問　課題文にもとづく英作文（約100語）", lead: LEAD3, count: [1, 1], mix: [0, 0, 1], points: 30, prefer: "material", poolTag: TAG3 },
  ],
  pool: [...S1, ...S2, ...S3],
};
