// 高校英語（語彙）「発音・アクセント」の単元模試 (B: 問題プール12問からシードで6問)。問題はすべてオリジナル (教科書・過去問・市販教材の問題は使っていない)。
// プール12問 (基本4・標準4・発展4)。1回に基本2・標準2・発展2 (15×2＋17×2＋18×2＝100点)。選択肢の順もシードで変わる。A (生成) は使っていないので検算式はなし。
// 発音記号・アクセントの位置はレクチャー (lib/lecture/data/h-eng-vocab-hatsuon.ts) の表・例と、一般的な辞書の表記に合わせた。
import type { QuestionB, UnitMoshi } from "../types";

const U = "h-eng-vocab-hatsuon";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "同じつづりでも、音はいくつかに分かれる");
const S2 = L(2, "-ed の発音は、直前の音で3つに分かれる");
const S3 = L(3, "語の終わり（接尾辞）がアクセントの位置を決める");
const S4 = L(4, "名詞は前、動詞は後ろ（名前動後）");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 40, 2: 60, 3: 75 } as const;
const base = (id: string, difficulty: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty, points: P[difficulty], seconds: T[difficulty], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...base("ea-head", 1),
    prompt: "ea の部分の発音が、ほかの3つと{{異なる}}ものはどれですか。",
    answer: {
      kind: "choice",
      options: ["head", "meat", "dream", "teach"],
      correct: 0,
      why: ["head の ea は短い /e/。", "meat の ea は /iː/。", "dream の ea は /iː/。", "teach の ea は /iː/。"],
    },
    point: "ea は /iː/ が基本。head・bread は /e/",
    steps: [{ title: "基本と例外", body: "ea は {{/iː/}}（meat・dream・teach）が基本。head・bread・weather は {{/e/}}、great・break は /eɪ/。", back: [S1] }],
  },
  {
    ...base("ed-id", 1),
    prompt: "-ed の発音が /ɪd/ になるものはどれですか。",
    answer: {
      kind: "choice",
      options: ["wanted", "played", "washed", "called"],
      correct: 0,
      why: ["直前が /t/ なので /ɪd/。", "直前が母音（有声音）なので /d/。", "直前が /ʃ/（無声音）なので /t/。", "直前が /l/（有声音）なので /d/。"],
    },
    point: "直前が /t/・/d/ なら /ɪd/",
    steps: [{ title: "直前の音", body: "-ed の直前が {{/t/・/d/}} なら /ɪd/、無声音なら /t/、有声音なら /d/。wanted は t のあと。", back: [S2] }],
  },
  {
    ...base("ed-t", 1),
    prompt: "-ed の発音が /t/ になるものはどれですか。",
    answer: {
      kind: "choice",
      options: ["stopped", "opened", "lived", "ended"],
      correct: 0,
      why: ["直前が /p/（無声音）なので /t/。", "直前が /n/（有声音）なので /d/。", "直前が /v/（有声音）なので /d/。", "直前が /d/ なので /ɪd/。"],
    },
    point: "のどがふるえない音のあとは /t/",
    steps: [{ title: "のどに手を当てる", body: "/p/・/k/・/s/・/ʃ/ などは{{無声音}}。そのあとの -ed は無声の {{/t/}} にそろいます。", back: [S2] }],
  },
  {
    ...base("hotel", 1),
    prompt: "第2音節を最も強く読む語はどれですか。",
    answer: {
      kind: "choice",
      options: ["hotel", "father", "water", "happy"],
      correct: 0,
      why: ["ho-TEL。カタカナの「ホテル」とちがい、後ろが強い。", "FA-ther。第1音節。", "WA-ter。第1音節。", "HAP-py。第1音節。"],
    },
    point: "hotel は ho-TEL（後ろが強い）",
    steps: [{ title: "カタカナに注意", body: "古くからの英語（father・water・happy）は前が強い語が多い一方、{{hotel}} は {{ho-TEL}} と後ろが強くなります。", back: [S3] }],
  },
  // ---- 標準 ----
  {
    ...base("ow-know", 2),
    prompt: "ow の部分の発音が、ほかの3つと{{異なる}}ものはどれですか。",
    answer: {
      kind: "choice",
      options: ["know", "cow", "town", "flower"],
      correct: 0,
      why: ["know の ow は /oʊ/。", "cow の ow は /aʊ/。", "town の ow は /aʊ/。", "flower の ow は /aʊ/。"],
    },
    point: "ow は /aʊ/ と /oʊ/ の2通り",
    steps: [{ title: "2つの読み", body: "ow は {{/aʊ/}}（cow・town・flower）と {{/oʊ/}}（snow・know・window）の2通り。語ごとに覚えます。", back: [S1] }],
  },
  {
    ...base("education", 2),
    prompt: "education（ed-u-ca-tion）で最も強く読む音節はどれですか。",
    keepOrder: true,
    answer: {
      kind: "choice",
      options: ["ed", "u", "ca", "tion"],
      correct: 2,
      why: ["ED-u-cate（動詞）なら第1音節だが、名詞 education ではちがう。", "u は弱く読まれる。", "-tion の直前の ca が強い（ed-u-CA-tion）。", "-tion そのものは強くならない。"],
    },
    point: "-tion の直前の音節が強い",
    steps: [{ title: "接尾辞を見る", body: "{{-tion}} で終わる語は、その{{直前の音節}}が強い。ED-u-cate → ed-u-{{CA}}-tion とアクセントが動きます。", back: [S3] }],
  },
  {
    ...base("s-iz", 2),
    prompt: "語尾の -s / -es の発音が /ɪz/ になるものはどれですか。",
    answer: {
      kind: "choice",
      options: ["watches", "books", "dogs", "plays"],
      correct: 0,
      why: ["直前が /tʃ/ なので /ɪz/。", "直前が /k/（無声音）なので /s/。", "直前が /g/（有声音）なので /z/。", "直前が母音（有声音）なので /z/。"],
    },
    point: "/s/・/z/・/ʃ/・/tʃ/ などのあとは /ɪz/",
    steps: [{ title: "-ed と同じ考え方", body: "無声音のあとは {{/s/}}、有声音のあとは {{/z/}}、/s/・/z/・/ʃ/・/tʃ/ などのあとは {{/ɪz/}}。", back: [S2] }],
  },
  {
    ...base("ea-break", 2),
    prompt: "ea の部分の発音が、great の ea と同じものはどれですか。",
    answer: {
      kind: "choice",
      options: ["steak", "bread", "heat", "ready"],
      correct: 0,
      why: ["great・break・steak の ea は /eɪ/。", "bread の ea は /e/。", "heat の ea は /iː/。", "ready の ea は /e/。"],
    },
    point: "great・break・steak の ea は /eɪ/",
    steps: [{ title: "少数派を覚える", body: "ea を {{/eɪ/}} と読むのは great・break・{{steak}} など少数。少数派だけ別に覚えると効率的です。", back: [S1] }],
  },
  // ---- 発展 ----
  {
    ...base("increase-verb", 3, "思考・判断・表現"),
    prompt: "Prices will increase next year.\nこの文の increase の読み方として正しいものはどれですか。（大文字が強い音節）",
    answer: {
      kind: "choice",
      options: ["in-CREASE（動詞なので後ろが強い）", "IN-crease（動詞なので前が強い）", "IN-crease（名詞なので前が強い）", "in-CREASE（名詞なので後ろが強い）"],
      correct: 0,
      why: [
        "will のあとなので動詞。名前動後で、動詞は後ろの in-CREASE。",
        "動詞は後ろが強い。前が強いのは名詞。",
        "will のあとに置かれているので名詞ではない。",
        "名詞なら前が強い（IN-crease）。ここは動詞。",
      ],
    },
    point: "文の中の品詞を見てから読む",
    steps: [
      { title: "品詞を見ぬく", body: "助動詞 {{will}} のあとなので動詞。a sharp increase なら名詞。", back: [S4] },
      { title: "名前動後", body: "名詞は前（IN-crease）、動詞は後ろ（{{in-CREASE}}）。", back: [S4] },
    ],
  },
  {
    ...base("not-meizendogo", 3),
    prompt: "名詞と動詞で同じつづりになる語のうち、「名前動後」に{{当てはまらない}}（品詞が変わっても同じ位置が強い）ものはどれですか。",
    answer: {
      kind: "choice",
      options: ["visit", "record", "present", "export"],
      correct: 0,
      why: [
        "visit は名詞でも動詞でも VIS-it と前が強い。",
        "REC-ord（記録）／re-CORD（記録する）で名前動後。",
        "PRES-ent（贈り物）／pre-SENT（贈る）で名前動後。",
        "EX-port（輸出）／ex-PORT（輸出する）で名前動後。",
      ],
    },
    point: "visit・answer は品詞が変わっても前が強い",
    steps: [{ title: "例外を押さえる", body: "名前動後はすべての語に当てはまるわけではありません。{{visit}}・answer は名詞でも動詞でも{{前}}が強い。", back: [S4] }],
  },
  {
    ...base("japanese", 3),
    prompt: "Japanese（Jap-a-nese）で最も強く読む音節はどれですか。",
    keepOrder: true,
    answer: {
      kind: "choice",
      options: ["Jap", "a", "nese"],
      correct: 2,
      why: ["Japan は Ja-PAN で後ろが強いが、Japanese では Jap は強くない。", "a は弱い /ə/ になる。", "-ese はその部分そのものが強い（Jap-a-NESE）。"],
    },
    point: "-ese・-ee はその部分が強い",
    steps: [{ title: "強くなる接尾辞", body: "-tion・-ic・-ity は直前が強いが、{{-ese}}・-ee は{{その部分そのもの}}が強い（Jap-a-NESE、employ-EE）。", back: [S3] }],
  },
  {
    ...base("photographer", 3, "思考・判断・表現"),
    prompt: "photograph（PHO-to-graph）と photographer、photographic のアクセントについて正しいものはどれですか。（大文字が強い音節）",
    answer: {
      kind: "choice",
      options: [
        "pho-TOG-ra-pher、pho-to-GRAPH-ic と、強い位置がそれぞれ動く",
        "どれも PHO が強く、位置は変わらない",
        "pho-TO-gra-pher、PHO-to-graph-ic になる",
        "photographer も photographic も、最後の音節が強い",
      ],
      correct: 0,
      why: [
        "接尾辞がつくと強い位置が動く。-ic は直前の GRAPH が強い。",
        "接尾辞 -er・-ic がつくとアクセントは動く。",
        "photographer は第2音節の TOG、photographic は -ic の直前の GRAPH が強い。",
        "-er・-ic そのものは強くならない。",
      ],
    },
    point: "仲間の語でも、接尾辞で強い位置が動く",
    steps: [{ title: "語尾で決まる", body: "PHO-to-graph → pho-{{TOG}}-ra-pher → pho-to-{{GRAPH}}-ic。-ic は直前が強い、のきまりで確かめられます。", back: [S3] }],
  },
];

export const H_ENG_VOCAB_HATSUON_MOSHI: UnitMoshi = {
  unit: U,
  subject: "eng",
  grade: "語彙",
  minutes: 8,
  review: { status: "draft" },
  sections: [{ title: "発音・アクセント", lead: "次の問いに答えなさい。", style: "word", pick: 6, questions: POOL }],
};
