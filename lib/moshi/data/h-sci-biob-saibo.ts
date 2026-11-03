// 生物基礎「細胞の構造」の単元模試 (B: プール8問から4問 ＋ A: 長さの単位の換算1問 ＋ C: 記述1問)。問題はすべてオリジナル。
// 検算: A は 1 mm＝1000 μm、1 μm＝1000 nm (レクチャーの値) から、答えが小数第3位までになる値だけを選び、
//   calc (×1000 または ÷1000) を scripts/check-moshi.ts がシード1〜100で計算して照合する。
import type { QuestionB, QuestionBody, QuestionC, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-biob-saibo";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "細胞の発見と細胞説");
const S2 = L(2, "細胞の大きさと単位");
const S3 = L(3, "真核細胞のつくりとはたらき");
const S4 = L(4, "動物細胞と植物細胞");
const S5 = L(5, "ミトコンドリアと葉緑体はもとは別の生物？");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
const b = (id: string, d: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty: d, points: P[d], seconds: T[d], skill });
const f = (x: number) => String(Math.round(x * 1000) / 1000);

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...b("hook", 1),
    prompt: "コルクの薄片を顕微鏡で観察し、小さな部屋のような構造を「細胞（cell）」と名づけた人物はだれですか。",
    answer: {
      kind: "choice",
      options: ["フック", "シュライデン", "シュワン", "メンデル"],
      correct: 0,
      why: ["1665年、フックがコルクを観察して cell と名づけた。", "シュライデンは植物について細胞説をとなえた。", "シュワンは動物について細胞説をとなえた。", "メンデルは遺伝の法則で知られ、細胞の命名とは関係ない。"],
    },
    point: "細胞の命名はフック（1665年）",
    steps: [{ title: "人物と業績", body: "{{フック}}が細胞を名づけ、シュライデン（植物）とシュワン（動物）が{{細胞説}}をとなえました。", back: [S1] }],
  },
  {
    ...b("mito", 1),
    prompt: "呼吸を行い、ATP をつくる細胞小器官を何といいますか。",
    answer: { kind: "term", accept: ["ミトコンドリア"], near: [{ text: "葉緑体", why: "葉緑体は光合成を行う細胞小器官。呼吸で ATP をつくるのはミトコンドリアです。" }] },
    point: "呼吸＝ミトコンドリア、光合成＝葉緑体",
    steps: [{ title: "はたらきと名前", body: "呼吸で ATP をつくるのが{{ミトコンドリア}}、光合成をするのが{{葉緑体}}です。", back: [S3] }],
  },
  {
    ...b("saibomaku", 1),
    prompt: "細胞を包み、物質の出入りを調節しているつくりはどれですか。",
    answer: {
      kind: "choice",
      options: ["細胞膜", "細胞壁", "液胞", "核膜"],
      correct: 0,
      why: ["細胞膜が物質の出入りを調節する。", "細胞壁は細胞の形を保ち支えるもので、ほとんどの物質を通す。", "液胞は物質をためる細胞小器官。", "核膜は核を包む膜で、細胞全体を包むのではない。"],
    },
    point: "出入りの調節は細胞膜",
    steps: [{ title: "膜と壁のちがい", body: "物質の出入りを調節するのは{{細胞膜}}。細胞壁は形を保ち支える役目です。", back: [S3] }],
  },
  // ---- 標準 ----
  {
    ...b("shokubutsu-dake", 2),
    prompt: "植物細胞にはあるが、動物細胞にはふつう見られないつくりの組み合わせはどれですか。",
    answer: {
      kind: "choice",
      options: ["葉緑体と細胞壁", "ミトコンドリアと細胞壁", "核と葉緑体", "細胞膜と液胞"],
      correct: 0,
      why: ["葉緑体と、セルロースが主成分の細胞壁は植物細胞だけにある。", "ミトコンドリアは動物細胞にも植物細胞にもある。", "核はどちらの細胞にもある。", "細胞膜はどちらにもある。液胞は植物細胞で大きく発達する。"],
    },
    point: "植物細胞だけ：葉緑体・細胞壁",
    steps: [{ title: "共通と植物だけ", body: "核・細胞膜・ミトコンドリアは共通。植物細胞だけにあるのが{{葉緑体}}と{{細胞壁}}です。", back: [S4] }],
  },
  {
    ...b("kogaku", 2),
    prompt: "光学顕微鏡で見分けることができる大きさの限界として最も近いものはどれですか。",
    answer: {
      kind: "choice",
      options: ["約 0.2 μm", "約 0.1 mm", "約 2 mm", "約 0.2 nm"],
      correct: 0,
      why: ["光学顕微鏡では約 0.2 μm までのものを見分けられる。", "約 0.1 mm はヒトの目で見分けられる限界。", "2 mm なら目で見分けられる。", "0.2 nm は光学顕微鏡では見分けられない。"],
    },
    point: "目は約0.1 mm、光学顕微鏡は約0.2 μm",
    steps: [{ title: "見分けられる限界", body: "ヒトの目は約 {{0.1 mm}}、光学顕微鏡は約 {{0.2 μm}} までのものを見分けられます。", back: [S2] }],
  },
  {
    ...b("ekiho", 2),
    prompt: "植物細胞で大きく発達し、物質をためるはたらきをもつ細胞小器官を何といいますか。",
    answer: { kind: "term", accept: ["液胞"], near: [{ text: "細胞質基質", why: "細胞質基質は細胞小器官のすき間を満たす液体。物質をためる袋のような細胞小器官は液胞です。" }] },
    point: "物質をためる＝液胞（植物で発達）",
    steps: [{ title: "液胞", body: "{{液胞}}は物質をためる細胞小器官で、植物細胞で特に大きく発達しています。", back: [S3, S4] }],
  },
  // ---- 発展 ----
  {
    ...b("shokubutsu-kokyu", 3, "思考・判断・表現"),
    prompt: "「植物は光合成をするので、ミトコンドリアをもたない」という考えについて、正しい説明はどれですか。",
    answer: {
      kind: "choice",
      options: ["誤り。植物細胞もミトコンドリアをもち、呼吸で ATP をつくっている", "正しい。植物は葉緑体で ATP をすべてまかなう", "正しい。ミトコンドリアは動物細胞だけにある", "誤り。植物細胞は葉緑体をもたず、ミトコンドリアだけをもつ"],
      correct: 0,
      why: [
        "植物も光合成でつくった有機物を呼吸で分解し、ATP をとり出している。",
        "植物も呼吸を行い、ミトコンドリアをもつ。",
        "ミトコンドリアは植物細胞にもある。",
        "植物細胞は葉緑体ももつ。",
      ],
    },
    point: "植物も呼吸する → ミトコンドリアをもつ",
    steps: [{ title: "光合成と呼吸", body: "植物は光合成で有機物をつくり、{{呼吸}}でそれを分解して ATP をとり出すので、{{ミトコンドリア}}をもちます。", back: [S4] }],
  },
  {
    ...b("kyoseisetsu", 3, "思考・判断・表現"),
    prompt: "細胞内共生説で、葉緑体のもとになったと考えられている生物はどれですか。",
    answer: {
      kind: "choice",
      options: ["シアノバクテリア", "呼吸をする細菌", "ウイルス", "酵母"],
      correct: 0,
      why: ["光合成をする原核生物のシアノバクテリアが、葉緑体のもとと考えられている。", "呼吸をする細菌はミトコンドリアのもとと考えられている。", "ウイルスは細胞の構造をもたない。", "酵母は真核生物で、葉緑体のもとではない。"],
    },
    point: "葉緑体＝シアノバクテリア、ミトコンドリア＝呼吸する細菌",
    steps: [{ title: "もとの生物", body: "葉緑体のもとは{{シアノバクテリア}}、ミトコンドリアのもとは{{呼吸をする細菌}}と考えられています。", back: [S5] }],
  },
];

function tani(r: Rng): QuestionBody {
  const kind = r.int(0, 3);
  if (kind === 0) {
    const x = r.pick([3, 5, 8, 12, 25, 40, 60, 80, 120, 150]);
    return {
      prompt: `長さ ${x} μm の細胞は何 mm ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(x / 1000)], unit: "mm", calc: `${x}/1000` },
      point: "1 mm ＝ 1000 μm",
      steps: [
        { title: "関係を書く", body: "{{1 mm ＝ 1000 μm}} なので、μm を mm にするには 1000 でわる。", back: [S2] },
        { title: "計算", body: `${x} ÷ 1000 ＝ {{${f(x / 1000)} mm}}。`, trap: "100 でわらない。マイクロは 10⁻⁶、ミリは 10⁻³ で、差は 1000 倍。" },
      ],
    };
  }
  if (kind === 1) {
    const x = r.pick([0.02, 0.05, 0.08, 0.1, 0.15, 0.25, 0.4, 0.6]);
    return {
      prompt: `長さ ${f(x)} mm の細胞は何 μm ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(x * 1000)], unit: "μm", calc: `${f(x)}*1000` },
      point: "1 mm ＝ 1000 μm",
      steps: [
        { title: "関係を書く", body: "{{1 mm ＝ 1000 μm}} なので、mm を μm にするには 1000 をかける。", back: [S2] },
        { title: "計算", body: `${f(x)} × 1000 ＝ {{${f(x * 1000)} μm}}。`, trap: "小さい単位に直すと数は大きくなる。わり算にしない。" },
      ],
    };
  }
  if (kind === 2) {
    const x = r.pick([100, 200, 300, 500, 800, 1500, 2500]);
    return {
      prompt: `長さ ${x} nm のものは何 μm ですか。`,
      answer: { kind: "num", answerKind: "num", answer: [f(x / 1000)], unit: "μm", calc: `${x}/1000` },
      point: "1 μm ＝ 1000 nm",
      steps: [
        { title: "関係を書く", body: "{{1 μm ＝ 1000 nm}} なので、nm を μm にするには 1000 でわる。", back: [S2] },
        { title: "計算", body: `${x} ÷ 1000 ＝ {{${f(x / 1000)} μm}}。` },
      ],
    };
  }
  const x = r.pick([0.002, 0.005, 0.01, 0.02, 0.05]);
  return {
    prompt: `長さ ${f(x)} mm のものは何 nm ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(x * 1000000)], unit: "nm", calc: `${f(x)}*1000*1000` },
    point: "mm → μm → nm と1000倍ずつ",
    steps: [
      { title: "2段階で直す", body: `${f(x)} mm ＝ ${f(x * 1000)} μm（×1000）。`, back: [S2] },
      { title: "もう一度", body: `${f(x * 1000)} μm ＝ {{${f(x * 1000000)} nm}}（×1000）。`, trap: "1回だけ1000倍して止めない。mm から nm は 100万倍。" },
    ],
  };
}

const FIX: QuestionC[] = [
  {
    id: "kyosei-konkyo",
    type: "C",
    difficulty: 3,
    points: 18,
    seconds: 180,
    skill: "思考・判断・表現",
    prompt: "ミトコンドリアと葉緑体が、もとは別の生物だったと考えられている根拠を2つ、50字以内で書きなさい。",
    answer: {
      kind: "written",
      limit: { max: 50, unit: "字" },
      model: "独自のDNAをもつこと、細胞の中で分裂してふえること。",
      alsoModels: ["二重の膜で包まれていること、独自のDNAをもつこと。"],
      rubric: [
        { label: "根拠1（独自のDNA・分裂してふえる・二重膜のいずれか）", points: 9, keywords: ["DNA", "分裂", "二重"] },
        { label: "根拠2（上とちがうもう1つ）", points: 9, keywords: ["DNA", "分裂", "二重"] },
      ],
    },
    point: "独自のDNA・分裂でふえる・二重膜",
    steps: [{ title: "根拠を挙げる", body: "{{独自の DNA}}をもつ、細胞の中で{{分裂してふえる}}、{{二重の膜}}で包まれている、の3つから2つ書きます。", back: [S5] }],
  },
];

export const H_SCI_BIOB_SAIBO_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "生物基礎",
  review: { status: "draft" },
  sections: [
    { title: "細胞のつくりとはたらき", lead: "次の問いに答えなさい。", style: "word", pick: 4, questions: POOL },
    { title: "細胞の大きさ", lead: "次の問いに答えなさい。", style: "calc", questions: [{ id: "tani", type: "A", difficulty: 2, points: 17, seconds: 60, skill: "知識・技能", generate: tani }] },
    { title: "細胞内共生説", lead: "次の問いに答えなさい。", style: "writing", questions: FIX },
  ],
};
