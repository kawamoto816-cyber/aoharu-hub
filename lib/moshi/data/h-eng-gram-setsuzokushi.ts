// 高校英語（文法）「接続詞」の単元模試 (B: 問題プールからシードで選ぶ)。問題・例文はすべてオリジナル (教科書・過去問・市販教材の文は使っていない)。
// 節1 語法 (プール12問: 基本4・標準4・発展4) から5問 (基本2・標準2・発展1)、
// 節2 並べかえ (プール4問: 基本2・標準2) から2問 (基本1・標準1)。1回7問・100点 (13×3＋15×3＋16＝100)。
// A (生成) は使っていないので数値の検算はなし。choice・term・order の正答は check-moshi が採点器で満点になるか確かめる。
import type { QuestionB, UnitMoshi } from "../types";

const U = "h-eng-gram-setsuzokushi";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "等位接続詞は、対等につなぐ");
const S2 = L(2, "2つで1組の接続詞と、動詞の数");
const S3 = L(3, "従属接続詞は、主の文に節をくっつける");
const S4 = L(4, "時・条件の副詞節では、未来のことも現在形");
const S5 = L(5, "名作の書き出しを、接続詞で読みとく");

const P = { 1: 13, 2: 15, 3: 16 } as const;
const T = { 1: 45, 2: 60, 3: 90 } as const;
const TO = { 1: 60, 2: 75, 3: 90 } as const;
type Sk = QuestionB["skill"];
const base = (id: string, difficulty: 1 | 2 | 3, skill: Sk = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });
const ord = (id: string, difficulty: 1 | 2 | 3) => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: TO[difficulty], skill: "知識・技能" as Sk });
const ASK = "空所に入る最も適切なものはどれですか。";
const NARABE = "日本語に合うように語句を並べかえなさい。使わない語が1つあります。";

const FORMS: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("hurry-or", 1),
    prompt: `Put on your coat, (　　) you'll catch a cold.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["or", "and", "but", "so"],
      correct: 0,
      why: [
        "命令文, or 〜 ＝「〜しなさい、さもないと…」。コートを着ないとかぜをひく。",
        "命令文, and 〜 は「そうすれば…」。かぜをひくことが「よい結果」になってしまう。",
        "but は逆の内容をつなぐが、命令文のあとの決まった形ではない。",
        "so は「だから」で、命令文のあとでは意味が通らない。",
      ],
    },
    point: "命令文, or ＝さもないと",
    steps: [{ title: "命令文のあと", body: "命令文のあと、{{and}} は「そうすれば」、{{or}} は「さもないと」。かぜをひくのは悪い結果なので or。", back: [S1] }],
  },
  {
    ...base("both-and", 1),
    prompt: `Both my father (　　) my mother grew up in Hiroshima.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["and", "or", "nor", "but"],
      correct: 0,
      why: ["both A and B ＝「AもBも両方」。", "or は either A or B と組む。", "nor は neither A nor B と組む。", "but は not A but B や not only A but also B と組む。"],
    },
    point: "both A and B",
    steps: [{ title: "2つで1組", body: "{{both}} と組むのは {{and}}。either は or、neither は nor と組みます。", back: [S2] }],
  },
  {
    ...base("when-arrive", 1),
    prompt: `I'll send you a message when I (　　) at the airport.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["arrive", "will arrive", "arrived", "arriving"],
      correct: 0,
      why: [
        "時を表す when の副詞節の中は、未来のことでも現在形。",
        "時の副詞節の中では will を使わない。",
        "過去形では未来のことにならない。",
        "-ing だけでは動詞にならない。",
      ],
    },
    point: "時・条件の副詞節の中は現在形",
    steps: [{ title: "副詞節の時制", body: "when 〜 は「いつ送るか」を表す{{副詞節}}。中は未来でも{{現在形}}の arrive。", back: [S4] }],
  },
  {
    ...base("because-raining", 1),
    prompt: `We played cards inside (　　) it was snowing heavily.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["because", "though", "or", "unless"],
      correct: 0,
      why: [
        "大雪だった（理由）→ 中でトランプをした（結果）。理由を表す because。",
        "though（〜だけれど）だと、理由と結果がつながらない。",
        "or は「または」で、理由を表さない。",
        "unless は「〜しない限り」で意味が合わない。",
      ],
    },
    point: "because ＋理由",
    steps: [{ title: "理由をくっつける", body: "{{because}} は理由の節を主の文にくっつける従属接続詞。because の後ろが{{理由}}です。", back: [S3] }],
  },
  // ---- 標準 ----
  {
    ...base("either-or-has", 2),
    prompt: `Either you or your brother (　　) to clean the bath today.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["has", "have", "are", "were"],
      correct: 0,
      why: [
        "either A or B が主語のとき、動詞は近い方の B（your brother）に合わせる。3人称単数なので has。",
        "have は you に合わせた形。近い方の your brother に合わせる。",
        "are は複数の主語に合う形。近い方の your brother は単数。",
        "were は過去形で、today の予定と合わず、数も合わない。",
      ],
    },
    point: "either A or B ＋動詞は B に合わせる",
    steps: [{ title: "動詞の数", body: "either A or B・neither A nor B は、動詞を{{近い方（B）}}に合わせます。your brother → {{has}}。", back: [S2] }],
  },
  {
    ...base("not-only-was", 2),
    prompt: `Not only the players but also the coach (　　) very excited after the win.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["was", "were", "are", "be"],
      correct: 0,
      why: [
        "not only A but also B は B が中心。動詞は the coach（単数）に合わせて was。",
        "were は the players に合わせた形。中心は B。",
        "are は現在形で、after the win（過去の話）と合わない。",
        "be は原形で、文の動詞にならない。",
      ],
    },
    point: "not only A but also B は B に合わせる",
    steps: [{ title: "中心はB", body: "言いたい中心は {{B}}（the coach）。単数で過去なので {{was}}。", back: [S2] }],
  },
  {
    ...base("if-noun-will", 2, "思考・判断・表現"),
    prompt: `I'm not sure if Ms. Sato (　　) the meeting next Monday.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["will attend", "attends", "attended", "attending"],
      correct: 0,
      why: [
        "if 節は sure の内容「〜かどうか」を表す名詞節。条件ではないので、未来のことは will で表す。",
        "現在形にするのは、条件を表す副詞節のとき。",
        "過去形は next Monday と合わない。",
        "-ing だけでは動詞にならない。",
      ],
    },
    point: "「〜かどうか」の if 節は未来なら will",
    steps: [
      { title: "名詞節か副詞節か", body: "ここの if は「もし」ではなく「{{〜かどうか}}」。名詞節です。", back: [S4] },
      { title: "時制", body: "名詞節では未来のことを {{will}} で表します。", back: [S4] },
    ],
  },
  {
    ...base("so-tired", 2),
    prompt: `I had a fever last night, (　　) I stayed home from school today.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["so", "but", "or", "because"],
      correct: 0,
      why: [
        "熱があった（原因）→ 学校を休んだ（結果）。結果の前に置くのは so。",
        "but は逆の内容のとき。",
        "or は「または」。",
        "because は理由の前に置く。ここは後ろが結果。",
      ],
    },
    point: "原因, so 結果",
    steps: [{ title: "原因と結果", body: "前が原因、後ろが結果なので {{so}}（だから）。", back: [S1] }],
  },
  // ---- 発展 ----
  {
    ...base("though-young", 3),
    prompt: `(　　) she is only fifteen, she speaks three languages.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["Though", "Because", "Unless", "Until"],
      correct: 0,
      why: [
        "まだ15歳（予想）なのに3か国語を話す。予想と逆の内容をつなぐ譲歩の though。",
        "Because だと「15歳だから話せる」となり、意味が通らない。",
        "Unless は「〜しない限り」。",
        "Until は「〜するまで」。",
      ],
    },
    point: "Though S V, ＝ S V だけれど",
    steps: [{ title: "譲歩", body: "15歳 → ふつうは話せない、なのに話せる。予想と逆なので {{Though}}（〜だけれども）。", back: [S3] }],
  },
  {
    ...base("unless-finish", 3),
    prompt: `You can't watch TV (　　) you clean up your room first.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["unless", "because", "though", "so"],
      correct: 0,
      why: [
        "unless ＝ if 〜 not（〜しない限り）。部屋を片づけない限りテレビは見られない。",
        "because だと「片づけるからテレビが見られない」となり、意味が通らない。",
        "though は「〜だけれど」で意味が合わない。",
        "so は「だから」で、後ろに結果が来るはず。",
      ],
    },
    point: "unless ＝ if … not",
    steps: [{ title: "条件の否定", body: "{{unless}} は「〜しない限り」。if you don't clean up … と同じ意味です。", back: [S3] }],
  },
  {
    ...base("so-that-result", 3, "思考・判断・表現"),
    prompt: `The soup was (　　) hot that I couldn't eat it right away.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["so", "such", "very", "too"],
      correct: 0,
      why: [
        "so ＋形容詞＋ that 〜 ＝「とても…なので〜」。",
        "such の後ろには名詞のかたまりが来る（such hot soup that …）。",
        "very は that と組んで結果を表さない。",
        "too は too … to 〜 の形と組む。",
      ],
    },
    point: "so ＋形容詞＋ that 〜",
    steps: [{ title: "so … that", body: "{{so}} hot {{that}} I couldn't eat it で「とても熱かったので食べられなかった」。that 以下が結果です。", back: [S5] }],
  },
  {
    ...base("neither-nor-am", 3),
    prompt: `Neither my sister nor I (　　) good at cooking.\n${ASK}`,
    answer: {
      kind: "choice",
      options: ["am", "is", "are", "be"],
      correct: 0,
      why: [
        "neither A nor B は動詞を近い方の B（I）に合わせる。I なので am。",
        "is は my sister に合わせた形。",
        "are は2人まとめた形。neither … nor では近い方に合わせる。",
        "be は原形で、文の動詞にならない。",
      ],
    },
    point: "neither A nor B ＋動詞は B に合わせる",
    steps: [{ title: "動詞の数", body: "近い方の主語は {{I}}。だから {{am}}。", back: [S2] }],
  },
];

const ORDER: QuestionB[] = [
  // ---- 基本 ----
  {
    ...ord("narabe-hurry-and", 1),
    prompt: `${NARABE}\n「急ぎなさい、そうすれば始発のバスに間に合いますよ。」`,
    answer: { kind: "order", tokens: ["Hurry up,", "and", "you", "will", "catch", "the first bus."], distractor: "or" },
    point: "命令文, and ＝そうすれば",
    steps: [{ title: "命令文のあと", body: "よい結果が続くので {{and}}。or だと「さもないと」になります。", back: [S1] }],
  },
  {
    ...ord("narabe-until-comes", 1),
    prompt: `${NARABE}\n「ケンが来るまで、ここで待ちましょう。」`,
    answer: { kind: "order", tokens: ["Let's", "wait", "here", "until", "Ken", "comes."], distractor: "will" },
    point: "until 節の中は現在形",
    steps: [{ title: "時の副詞節", body: "{{until Ken comes}} は時の副詞節なので、未来でも現在形 comes。will は使いません。", back: [S4] }],
  },
  // ---- 標準 ----
  {
    ...ord("narabe-if-sunny", 2),
    prompt: `${NARABE}\n「明日晴れたら、私たちは山に登ります。」`,
    answer: { kind: "order", tokens: ["We", "will", "climb", "the mountain", "if", "it", "is", "sunny", "tomorrow."], distractor: "be" },
    point: "if の中は現在形、外は will",
    steps: [{ title: "中と外", body: "外の文は未来なので {{will climb}}、if の中は未来でも {{it is sunny}}。", back: [S4] }],
  },
  {
    ...ord("narabe-know-that", 2),
    prompt: `${NARABE}\n「私は、彼女が正直な人だということを知っています。」`,
    answer: { kind: "order", tokens: ["I", "know", "that", "she", "is", "an honest person."], distractor: "what" },
    point: "know that ＋主語＋動詞",
    steps: [{ title: "that の名詞節", body: "{{that she is an honest person}} が know の目的語になる名詞節。", back: [S3] }],
  },
];

export const H_ENG_GRAM_SETSUZOKUSHI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "文法",
  minutes: 10,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    { title: "接続詞の使い分け", lead: "次の問いに答えなさい。", style: "word", pick: 5, questions: FORMS },
    { title: "並べかえ", lead: "日本語に合うように、語（語句）を並べかえなさい。文の最初の語は大文字で始めてあります。", style: "word", pick: 2, questions: ORDER },
  ],
};
