// 高校英語（文法）「分詞構文」の単元模試 (B: 問題プール12問からシードで6問)。問題・例文はすべてオリジナル (教科書・過去問・市販教材の文は使っていない)。
// プール12問 (基本4・標準4・発展4)。1回に基本2・標準2・発展2 (15×2＋17×2＋18×2＝100点)。選択肢の順もシードで変わる。A (生成) は使っていないので検算式はなし。
import type { QuestionB, UnitMoshi } from "../types";

const U = "h-eng-gram-bunshikobun";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "作り方：接続詞と主語を消して、動詞を -ing に");
const S2 = L(2, "意味は文脈で決まる。接続詞にもどして考える");
const S3 = L(3, "形の選び方：する・される・前のこと・主語がちがう");
const S4 = L(4, "Having ＋過去分詞は「時のずれ」のしるし");
const S5 = L(5, "with ＋名詞＋分詞");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 40, 2: 60, 3: 75 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("opening-window", 1),
    prompt: "(　　) the window, I felt a cold wind on my face.\n空所に入る最も適切な語はどれですか。",
    answer: {
      kind: "choice",
      options: ["Opening", "Opened", "Open", "Opens"],
      correct: 0,
      why: [
        "主語 I が窓を「開ける」側なので -ing。When I opened the window の分詞構文。",
        "Opened だと I が「開けられた」ことになる。",
        "原形で始めると命令文になり、後ろの I felt とつながらない。",
        "Opens は動詞で、主語がないので置けない。",
      ],
    },
    point: "主語が「する」側なら -ing で始める",
    steps: [{ title: "元の文にもどす", body: "When {{I opened}} the window → 接続詞と主語を消して {{Opening}} the window。", back: [S1] }],
  },
  {
    ...base("walking-meaning", 1),
    prompt: "{{Walking}} along the beach, we found a beautiful shell.\nこの文の意味として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["浜辺を歩いていると、私たちは美しい貝を見つけた。", "浜辺を歩くために、私たちは美しい貝を見つけた。", "浜辺を歩いたが、私たちは美しい貝を見つけられなかった。", "浜辺を歩かなければ、私たちは美しい貝を見つけた。"],
      correct: 0,
      why: [
        "While we were walking 〜 と考えると自然。歩いているときに見つけた。",
        "「〜するために」は to 不定詞の意味。分詞構文にはない。",
        "「見つけられなかった」とは書いていない。",
        "否定の Not もなく、条件の意味でもない。",
      ],
    },
    point: "意味は接続詞にもどして文脈で選ぶ",
    steps: [{ title: "接続詞を補う", body: "{{While}} we were walking along the beach と補うと「歩いているとき」。", back: [S2] }],
  },
  {
    ...base("arriving-term", 1),
    prompt: "When I arrived at the station, I called my mother.\n= (　　) at the station, I called my mother.\n空所に入る英語1語を書きなさい。",
    answer: { kind: "term", accept: ["arriving"], near: [{ text: "arrived", why: "分詞構文は接続詞と主語を消して、動詞を -ing にします。Arriving です。" }] },
    point: "When ＋ S ＋ V → V-ing",
    steps: [{ title: "作り方", body: "接続詞 When と主語 I を消し、arrived を {{Arriving}} に。主節と主語が同じなので消せます。", back: [S1] }],
  },
  {
    ...base("feeling-tired", 1),
    prompt: "{{Feeling}} tired, I went to bed early.\nこの文の意味として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["疲れていたので、私は早く寝た。", "疲れていたけれど、私は早く寝なかった。", "疲れるように、私は早く寝た。", "疲れたら、私は早く寝るだろう。"],
      correct: 0,
      why: [
        "Because I felt tired と補える。疲れていた → だから早く寝た、と自然につながる。",
        "主節は went to bed early で、否定ではない。",
        "「〜するように」の意味はない。",
        "主節が went（過去）なので、未来の条件ではない。",
      ],
    },
    point: "理由の分詞構文：Because ＋ S ＋ V",
    steps: [{ title: "前後の関係", body: "疲れていた → 早く寝た。{{理由}}の関係なので Because I felt tired と同じ。", back: [S2] }],
  },
  // ---- 標準 ----
  {
    ...base("seen-from-hill", 2),
    prompt: "(　　) from the top of the hill, the town looks like a toy.\n空所に入る最も適切な語はどれですか。",
    answer: {
      kind: "choice",
      options: ["Seen", "Seeing", "See", "Saw"],
      correct: 0,
      why: [
        "主語 the town は丘から「見られる」側なので過去分詞 Seen（Being seen の Being を省いた形）。",
        "Seeing だと町が何かを「見る」ことになる。",
        "原形では命令文になってしまう。",
        "Saw は動詞の過去形で、主語がないので置けない。",
      ],
    },
    point: "主語が「される」側なら過去分詞で始める",
    steps: [{ title: "主語との関係", body: "主節の主語は {{the town}}。町は{{見られる}}側 → (Being) {{Seen}} from 〜。", back: [S3] }],
  },
  {
    ...base("having-finished-meaning", 2, "思考・判断・表現"),
    prompt: "{{Having finished}} my homework, I watched a movie.\nこの文からわかることとして最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["宿題を終えたのは、映画を見たときより前である。", "宿題をしながら映画を見た。", "映画を見たあとで宿題を終えた。", "宿題を終えるために映画を見た。"],
      correct: 0,
      why: [
        "Having＋過去分詞は、主節（watched）より前のことを表す。",
        "「しながら」なら Doing my homework の形になる。",
        "順番が逆。Having finished は主節より前。",
        "「〜するために」の意味はない。",
      ],
    },
    point: "Having＋過去分詞 ＝ 主節より前のこと",
    steps: [{ title: "時のずれ", body: "{{Having finished}} は主節の過去（watched）よりさらに{{前}}。After I had finished 〜 と同じ。", back: [S4] }],
  },
  {
    ...base("order-turning-right", 2),
    prompt: "「その角を右に曲がると、銀行が見えます」となるように、語句を正しい順に並べなさい。",
    answer: { kind: "order", tokens: ["Turning", "right", "at the corner,", "you", "will see", "the bank."], distractor: "Turned" },
    point: "条件の分詞構文：If ＋ S ＋ V",
    steps: [
      { title: "元の文", body: "{{If you turn}} right at the corner, you will see the bank. の If と you を消します。", back: [S1, S2] },
      { title: "形", body: "you が曲がる（する側）→ {{Turning}}。", back: [S3] },
    ],
  },
  {
    ...base("with-legs-crossed", 2),
    prompt: "She was reading a magazine with her legs (　　).\n空所に入る最も適切な語はどれですか。",
    answer: {
      kind: "choice",
      options: ["crossed", "crossing", "cross", "to cross"],
      correct: 0,
      why: [
        "脚は「組まれた」状態なので過去分詞。with＋名詞＋過去分詞で「〜が…された状態で」。",
        "crossing だと脚が何かを「横切っている」ことになる。",
        "with＋名詞の後ろに原形は置かない。",
        "to cross だと「これから組む」ことになり、状態を表せない。",
      ],
    },
    point: "with＋名詞＋分詞 ＝ 〜が…の状態で",
    steps: [{ title: "名詞と分詞の関係", body: "her legs は{{組まれる}}側 → {{crossed}}。with her legs crossed ＝ 脚を組んで。", back: [S5] }],
  },
  // ---- 発展 ----
  {
    ...base("weather-being", 3),
    prompt: "(　　) fine, we went on a picnic.\n空所に入る最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["The weather being", "Being", "The weather is", "Having been"],
      correct: 0,
      why: [
        "晴れているのは「天気」で、主節の主語 we とちがう。ちがう主語は残す（独立分詞構文）。",
        "主語を消すと、主節の we が fine だったことになる。",
        "接続詞がないまま S＋V を2つつなぐことはできない。",
        "主語がないので we のことになり、時もずれる。",
      ],
    },
    point: "主語がちがうときは主語を残す",
    steps: [{ title: "主語を比べる", body: "Because {{the weather}} was fine, {{we}} went 〜。主語がちがうので the weather を残して {{The weather being}} fine。", back: [S3] }],
  },
  {
    ...base("written-easy", 3),
    prompt: "(　　) in easy English, this book is good for beginners.\n空所に入る最も適切な語句はどれですか。",
    answer: {
      kind: "choice",
      options: ["Written", "Writing", "Having written", "To write"],
      correct: 0,
      why: [
        "this book は「書かれている」側。(Being) written の Being を省いた形。",
        "Writing だと本が何かを書くことになる。",
        "Having written も本が「書いた」ことになる。",
        "To write では「書くために」となり、意味が通らない。",
      ],
    },
    point: "「される」側の分詞構文は過去分詞で始まる",
    steps: [{ title: "主語との関係", body: "Because {{this book is written}} in easy English → Being を省いて {{Written}}。", back: [S3] }],
  },
  {
    ...base("order-having-finished", 3),
    prompt: "「部屋のそうじを終えてから、私は買い物に出かけた」となるように、語句を正しい順に並べなさい。",
    answer: { kind: "order", tokens: ["Having", "cleaned", "my room,", "I", "went", "shopping."], distractor: "Had" },
    point: "前のことは Having＋過去分詞",
    steps: [
      { title: "時のずれ", body: "そうじは出かけるより{{前}} → {{Having cleaned}}。", back: [S4] },
      { title: "主節", body: "主語が同じ I なので主節にだけ残します。I went shopping.", back: [S1] },
    ],
  },
  {
    ...base("not-having-term", 3),
    prompt: "Since I didn't have any money, I couldn't buy the ticket.\n= (　　) having any money, I couldn't buy the ticket.\n空所に入る英語1語を書きなさい。",
    answer: { kind: "term", accept: ["not"], near: [{ text: "no", why: "分詞構文の否定は、-ing の前に Not を置きます。" }, { text: "don't", why: "分詞構文には主語も助動詞もありません。-ing の前に Not を置きます。" }] },
    point: "否定は Not＋-ing",
    steps: [{ title: "否定の分詞構文", body: "didn't have を分詞構文にすると {{Not}} having。not は分詞の{{前}}に置きます。", back: [S3] }],
  },
];

export const H_ENG_GRAM_BUNSHIKOBUN_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "文法",
  minutes: 8,
  review: { status: "draft" },
  sections: [{ title: "分詞構文の形と意味", lead: "次の問いに答えなさい。", style: "word", pick: 6, questions: POOL }],
};
