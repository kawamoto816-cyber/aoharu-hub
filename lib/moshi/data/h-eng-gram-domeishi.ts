// 高校英語（文法）「動名詞」の単元模試 (B: 問題プール12問からシードで6問)。問題・例文はすべてオリジナル (教科書・過去問・市販教材の文は使っていない)。
// プール12問 (基本4・標準4・発展4)。1回に基本2・標準2・発展2 (15×2＋17×2＋18×2＝100点)。選択肢の順もシードで変わる。A (生成) は使っていないので検算式はなし。
import type { QuestionB, UnitMoshi } from "../types";

const U = "h-eng-gram-domeishi";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "動名詞は名詞の席ならどこにでも座れる");
const S2 = L(2, "動名詞だけをとる動詞、不定詞だけをとる動詞");
const S3 = L(3, "どちらもとれるが、意味が変わる動詞");
const S4 = L(4, "意味上の主語・否定・完了形");
const S5 = L(5, "-ing を見分ける：名詞の席か、説明の役か");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 40, 2: 60, 3: 75 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("enjoyed-talking", 1),
    prompt: "We enjoyed (　　) with our old classmates at the reunion.\n空所に入る最も適切な語句はどれですか。",
    answer: {
      kind: "choice",
      options: ["talking", "to talk", "talk", "talked"],
      correct: 0,
      why: [
        "enjoy は目的語に動名詞だけをとる動詞。enjoy -ing。",
        "enjoy は to 不定詞を目的語にとらない。",
        "動詞の後ろに原形をそのまま置くことはできない。",
        "enjoyed talked のように動詞を2つ続けることはできない。",
      ],
    },
    point: "enjoy・finish・stop・mind は -ing",
    steps: [{ title: "動詞で決まる", body: "{{enjoy}} は目的語に{{動名詞だけ}}をとる → talking。", back: [S2] }],
  },
  {
    ...base("subject-reading", 1),
    prompt: "(　　) old novels is my favorite way to relax.\n空所に入る最も適切な語はどれですか。",
    answer: {
      kind: "choice",
      options: ["Reading", "Read", "Reads", "Readed"],
      correct: 0,
      why: [
        "文の主語（〜すること）になるのは動名詞。Reading old novels が主語、is が動詞。",
        "原形で始めると命令文になり、is とつながらない。",
        "Reads は動詞で、主語の席に座れない。",
        "read の過去形は read。Readed という形はない。",
      ],
    },
    point: "動名詞は主語の席に座れる",
    steps: [{ title: "名詞の席", body: "文の動詞は is。その前の{{主語}}の席には名詞の働きをする {{Reading}} 〜 が入ります。単数扱い。", back: [S1] }],
  },
  {
    ...base("good-at-term", 1),
    prompt: "My sister is good at (　　).\n空所に swim を適切な形にして、英語1語で書きなさい。",
    answer: { kind: "term", accept: ["swimming"], near: [{ text: "swiming", why: "swim は m を重ねて swimming と書きます。" }, { text: "swim", why: "前置詞 at の後ろには名詞の働きをする動名詞 swimming を置きます。" }] },
    point: "前置詞の後ろは動名詞",
    steps: [{ title: "前置詞の目的語", body: "at は{{前置詞}}。後ろに動詞を置くときは{{動名詞}}にします。swim → {{swimming}}。", back: [S1] }],
  },
  {
    ...base("thank-for-helping", 1),
    prompt: "Thank you for (　　) me with my report.\n空所に入る最も適切な語句はどれですか。",
    answer: {
      kind: "choice",
      options: ["helping", "to help", "help", "helped"],
      correct: 0,
      why: [
        "for は前置詞。前置詞の後ろは動名詞 helping。",
        "前置詞の後ろに to 不定詞は置かない。",
        "前置詞の後ろに原形は置かない。",
        "helped は過去形・過去分詞で、名詞の働きをしない。",
      ],
    },
    point: "Thank you for -ing ＝ 〜してくれてありがとう",
    steps: [{ title: "前置詞の後ろ", body: "for の後ろは名詞の席 → {{helping}}。", back: [S1] }],
  },
  // ---- 標準 ----
  {
    ...base("decided-to-study", 2),
    prompt: "After high school, Aya decided (　　) design in Italy.\n空所に入る最も適切な語句はどれですか。",
    answer: {
      kind: "choice",
      options: ["to study", "studying", "study", "studied"],
      correct: 0,
      why: [
        "decide は目的語に to 不定詞だけをとる。これから先のことを決めるので to。",
        "decide は動名詞を目的語にとらない。",
        "動詞の後ろに原形を続けることはできない。",
        "decided studied と動詞を2つ続けることはできない。",
      ],
    },
    point: "decide・hope・plan・want は to 不定詞",
    steps: [{ title: "これから先のこと", body: "{{decide}}（決める）はこれからのことなので {{to}} 不定詞だけをとります。", back: [S2] }],
  },
  {
    ...base("remember-singing", 2),
    prompt: "I remember (　　) this song with my grandmother when I was little.\n空所に入る最も適切な語句はどれですか。",
    answer: {
      kind: "choice",
      options: ["singing", "to sing", "sing", "sang"],
      correct: 0,
      why: [
        "when I was little（小さいころ）のことを覚えている → すでにしたこと → remember -ing。",
        "remember to 〜 は「忘れずに〜する（これからのこと）」。小さいころの話と合わない。",
        "remember の後ろに原形は置かない。",
        "remember sang と動詞を2つ続けることはできない。",
      ],
    },
    point: "remember -ing ＝ 〜したことを覚えている",
    steps: [{ title: "意味が変わる動詞", body: "過去のことを覚えている → {{-ing}}。これからすることを忘れない → to 〜。", back: [S3] }],
  },
  {
    ...base("mind-my-opening", 2),
    prompt: "Do you mind (　　) the window? It's a little hot in here.\n「私が窓を開けてもかまいませんか」という意味になるように、空所に入る最も適切な語句を選びなさい。",
    answer: {
      kind: "choice",
      options: ["my opening", "to open", "I open", "opened"],
      correct: 0,
      why: [
        "開けるのは「私」。動名詞の前に所有格 my を置いて、意味上の主語を示す。",
        "mind は to 不定詞をとらない。",
        "mind の後ろに主語＋動詞（I open）を直接置くことはできない。",
        "opened では名詞の働きをしない。",
      ],
    },
    point: "意味上の主語は動名詞の前に所有格（目的格）",
    steps: [{ title: "だれがするのか", body: "Do you mind opening 〜 なら「あなたが開ける」。「私が」なら {{my}} opening と{{意味上の主語}}を前に置きます。", back: [S4] }],
  },
  {
    ...base("order-used-to-getting", 2),
    prompt: "「私は朝早く起きることに慣れている」となるように、語句を正しい順に並べなさい。",
    answer: { kind: "order", tokens: ["I", "am", "used", "to", "getting up", "early", "in the morning."], distractor: "get up" },
    point: "be used to -ing ＝ 〜することに慣れている",
    steps: [
      { title: "to は前置詞", body: "be used to 〜 の {{to}} は前置詞。後ろは動名詞。", back: [S1] },
      { title: "語順", body: "I am used to {{getting up}} early in the morning.", back: [S1] },
    ],
  },
  // ---- 発展 ----
  {
    ...base("stopped-looking", 3, "思考・判断・表現"),
    prompt: "My father stopped (　　) at his phone and listened to me carefully.\n空所に入る最も適切な語句はどれですか。",
    answer: {
      kind: "choice",
      options: ["looking", "to look", "look", "looked"],
      correct: 0,
      why: [
        "スマホを見るのをやめて、話を聞いてくれた → stop -ing（〜するのをやめる）。",
        "stop to 〜 は「〜するために立ち止まる・手を止める」。スマホを見るために手を止めた、では後半とつながらない。",
        "stop の後ろに原形は置かない。",
        "stopped looked と動詞を2つ続けることはできない。",
      ],
    },
    point: "stop -ing ＝ やめる／stop to 〜 ＝ 〜するために止まる",
    steps: [{ title: "文脈で選ぶ", body: "後半 listened to me（私の話を聞いた）から、スマホを見るのを{{やめた}} → {{looking}}。", back: [S3] }],
  },
  {
    ...base("ashamed-having", 3),
    prompt: "Ken is ashamed of (　　) told a lie to his friend yesterday.\n空所に入る最も適切な語はどれですか。",
    answer: {
      kind: "choice",
      options: ["having", "being", "to have", "have"],
      correct: 0,
      why: [
        "うそをついたのは昨日（今恥じているより前）。前のことは having＋過去分詞。",
        "being told だと「言われている」という受け身になり、意味が合わない。",
        "前置詞 of の後ろに to 不定詞は置かない。",
        "前置詞の後ろに原形は置かない。",
      ],
    },
    point: "having＋過去分詞 ＝ 前にしたこと",
    steps: [{ title: "時のずれ", body: "is ashamed（今）より told a lie（昨日）が前 → 完了形の動名詞 {{having}} told。", back: [S4] }],
  },
  {
    ...base("sure-of-his", 3),
    prompt: "I'm sure that he will win the race.\n= I'm sure of (　　) winning the race.\n空所に入る英語1語を書きなさい。",
    answer: { kind: "term", accept: ["his", "him"], near: [{ text: "he", why: "意味上の主語は動名詞の前に所有格（または目的格）で置きます。his（him）です。" }] },
    point: "that 節の主語 → 動名詞の前に所有格",
    steps: [{ title: "意味上の主語", body: "勝つのは「彼」で、主語の I とちがう。動名詞の前に {{his}}（口語では him）を置きます。", back: [S4] }],
  },
  {
    ...base("which-gerund", 3, "思考・判断・表現"),
    prompt: "次の文の -ing のうち、{{動名詞}}はどれですか。",
    answer: {
      kind: "choice",
      options: ["My hobby is {{collecting}} old coins.", "The baby is {{sleeping}} on the sofa.", "Look at the {{sleeping}} cat.", "I saw him {{running}} in the park."],
      correct: 0,
      why: [
        "My hobby ＝ collecting old coins（集めること）。名詞の席（補語）に入る動名詞。",
        "is sleeping は進行形。「〜すること」ではない。",
        "the sleeping cat は「眠っている（ねこ）」と名詞を説明する現在分詞。",
        "saw him running は「彼が走っているのを見た」。him を説明する現在分詞。",
      ],
    },
    point: "「〜すること」と訳せて名詞の席なら動名詞",
    steps: [{ title: "席を見る", body: "hobby ＝ collecting（{{集めること}}）。名詞の席なら動名詞、名詞を{{説明}}しているなら分詞。", back: [S5] }],
  },
];

export const H_ENG_GRAM_DOMEISHI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "文法",
  minutes: 8,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [{ title: "動名詞の働きと使い分け", lead: "次の問いに答えなさい。", style: "word", pick: 6, questions: POOL }],
};
