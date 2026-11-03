// 生物基礎「遺伝情報の発現」の単元模試 (B: プール8問から4問 ＋ A: 転写の塩基配列1問 ＋ C: 記述1問)。問題はすべてオリジナル。
// 検算: A は鋳型鎖の塩基をランダムに作り、対応 A→U、T→A、G→C、C→G (レクチャーの表) で mRNA を作る (数値の calc はない)。
//   T をふくむ答え (DNA の相補鎖) は near にして「あと一歩」にする。
import type { QuestionB, QuestionBody, QuestionC, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-biob-hatsugen";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "遺伝情報は一方向に流れる");
const S2 = L(2, "転写：DNAの片方の鎖を鋳型に写す");
const S3 = L(3, "翻訳：3つの塩基で1つのアミノ酸");
const S4 = L(4, "同じDNAでも、使う遺伝子が細胞ごとにちがう");
const S5 = L(5, "だ腺染色体のパフ：遺伝子が使われる場所が見える");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
const b = (id: string, d: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty: d, points: P[d], seconds: T[d], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...b("tensha", 1),
    prompt: "DNA の遺伝子の情報を mRNA に写しとる過程を何といいますか。",
    answer: { kind: "term", accept: ["転写"], near: [{ text: "翻訳", why: "翻訳は mRNA の情報をもとにアミノ酸をつなぐ過程。写しとるのは転写です。" }] },
    point: "写す＝転写、読みかえる＝翻訳",
    steps: [{ title: "2つの過程", body: "DNA → mRNA が{{転写}}、mRNA → タンパク質が{{翻訳}}です。", back: [S1] }],
  },
  {
    ...b("uracil", 1),
    prompt: "RNA にあって、DNA にはない塩基はどれですか。",
    answer: {
      kind: "choice",
      options: ["ウラシル（U）", "チミン（T）", "アデニン（A）", "グアニン（G）"],
      correct: 0,
      why: ["RNA は T のかわりに U をもつ。", "T は DNA にあり、RNA にはない。", "A は DNA にも RNA にもある。", "G は DNA にも RNA にもある。"],
    },
    point: "RNA は T のかわりに U",
    steps: [{ title: "RNA の塩基", body: "RNA の塩基は A・{{U}}・G・C。DNA の T のかわりに {{U（ウラシル）}}があります。", back: [S2] }],
  },
  {
    ...b("central", 1),
    prompt: "DNA → RNA → タンパク質 という遺伝情報の流れの考え方を何といいますか。",
    answer: { kind: "term", accept: ["セントラルドグマ"], near: [{ text: "相補性", why: "相補性は A と T（U）、G と C が対になる性質。遺伝情報の流れの考え方はセントラルドグマです。" }] },
    point: "DNA → RNA → タンパク質＝セントラルドグマ",
    steps: [{ title: "一方向の流れ", body: "遺伝情報が DNA → RNA → タンパク質と一方向に流れる考え方を{{セントラルドグマ}}といいます。", back: [S1] }],
  },
  // ---- 標準 ----
  {
    ...b("codon", 2),
    prompt: "mRNA で、1つのアミノ酸を指定する塩基の組（コドン）は、塩基いくつでできていますか。",
    answer: {
      kind: "choice",
      options: ["3つ", "1つ", "2つ", "4つ"],
      correct: 0,
      why: ["塩基3つで1組（コドン）になり、1つのアミノ酸を指定する。", "塩基は4種類しかないので、1つずつでは20種類のアミノ酸を指定できない。", "2つでは16通りしかなく、20種類に足りない。", "4つではない。"],
    },
    point: "塩基3つで1つのアミノ酸",
    steps: [{ title: "組み合わせの数", body: "塩基は4種類。{{3つ}}組なら 4×4×4＝64 通りで、20種類のアミノ酸を指定できます。", back: [S3] }],
  },
  {
    ...b("ribosome", 2),
    prompt: "真核細胞で、翻訳が行われる場所はどこですか。",
    answer: {
      kind: "choice",
      options: ["細胞質のリボソーム", "核の中", "ミトコンドリアの中だけ", "細胞膜の上"],
      correct: 0,
      why: ["核の中でつくられた mRNA が細胞質へ出て、リボソームで翻訳される。", "核の中で行われるのは転写。", "翻訳はおもに細胞質のリボソームで行われる。", "細胞膜は翻訳の場所ではない。"],
    },
    point: "転写は核、翻訳は細胞質のリボソーム",
    steps: [{ title: "場所を分ける", body: "真核細胞では{{核で転写}}、mRNA が細胞質へ出て{{リボソームで翻訳}}されます。", back: [S3] }],
  },
  {
    ...b("puff", 2),
    prompt: "ユスリカなどのだ腺染色体に見られる「パフ」について正しい説明はどれですか。",
    answer: {
      kind: "choice",
      options: ["DNA がほどけて転写がさかんに行われている部分", "DNA が複製されている部分", "遺伝子がない部分", "翻訳が行われている部分"],
      correct: 0,
      why: ["パフでは DNA がほどけ、転写がさかんに行われている。", "パフは複製の場所ではない。", "パフは遺伝子が使われている場所。", "翻訳は細胞質のリボソームで行われる。"],
    },
    point: "パフ＝転写がさかんな場所",
    steps: [{ title: "パフで起きていること", body: "パフでは DNA がほどけて{{転写}}がさかん。位置は発生の時期や環境で変わります。", back: [S5] }],
  },
  // ---- 発展 ----
  {
    ...b("bunka", 3, "思考・判断・表現"),
    prompt: "ヒトの皮膚の細胞と筋肉の細胞で、つくられるタンパク質がちがう理由として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["同じ遺伝情報をもつが、発現する遺伝子が細胞の種類によってちがうから", "細胞ごとにもっている遺伝情報がちがうから", "いらない遺伝子を細胞がなくしているから", "細胞ごとに使うアミノ酸の種類がちがうから"],
      correct: 0,
      why: [
        "からだの細胞は同じ遺伝情報をもち、発現する遺伝子のちがいで分化する。",
        "体細胞分裂でふえるので、遺伝情報は同じ。",
        "分化した細胞が遺伝子を失っているわけではない。",
        "アミノ酸の種類は共通。ちがうのはどの遺伝子が発現するか。",
      ],
    },
    point: "分化＝発現する遺伝子のちがい",
    steps: [{ title: "遺伝情報は同じ", body: "からだの細胞はどれも同じ遺伝情報をもちます。{{発現する遺伝子}}がちがうので、つくられるタンパク質がちがいます。", back: [S4] }],
  },
  {
    ...b("amino-hairetsu", 3, "思考・判断・表現"),
    prompt: "DNA の塩基配列が変わってアミノ酸の並び方が変わると、どのようなことが起こりうると考えられますか。",
    answer: {
      kind: "choice",
      options: ["タンパク質の形が変わり、はたらきが変わることがある", "タンパク質の形もはたらきもまったく変わらない", "mRNA がつくられなくなり、細胞がすぐに死ぬ", "DNA の糖がリボースに変わる"],
      correct: 0,
      why: [
        "アミノ酸の並び方がタンパク質の形とはたらきを決めるので、変わることがある。",
        "並び方が変われば、形やはたらきが変わることがある。",
        "塩基配列が変わっても転写は行われる。すぐに死ぬとは限らない。",
        "DNA の糖はデオキシリボースのまま。",
      ],
    },
    point: "アミノ酸配列 → 形 → はたらき",
    steps: [{ title: "つながりを考える", body: "塩基配列 → {{アミノ酸の並び方}} → タンパク質の{{形とはたらき}}と決まっていきます。", back: [S3] }],
  },
];

const RNA: Record<string, string> = { A: "U", T: "A", G: "C", C: "G" };
const DNA: Record<string, string> = { A: "T", T: "A", G: "C", C: "G" };

function tenshaA(r: Rng): QuestionBody {
  const n = r.pick([6, 9]);
  const seq = Array.from({ length: n }, () => r.pick(["A", "T", "G", "C"]));
  if (!seq.includes("A")) seq[r.int(0, n - 1)] = "A";
  const s = seq.join("");
  const ans = seq.map((x) => RNA[x]).join("");
  const near = seq.map((x) => DNA[x]).join("");
  return {
    prompt: `DNA の鋳型となる鎖の塩基配列が ${s} のとき、転写されてできる mRNA の塩基配列を、A・U・G・C の記号で答えなさい。`,
    answer: { kind: "term", accept: [ans], caseSensitive: false, near: [{ text: near, why: "これは DNA の相補鎖。RNA には T がなく、A に対しては U がつきます。" }] },
    point: "A→U、T→A、G→C、C→G",
    steps: [
      { title: "対応を確かめる", body: "鋳型の塩基に相補的な RNA の塩基がつく。{{A には U}}、T には A、G には C、C には G。", back: [S2] },
      { title: "順に写す", body: `${s} → {{${ans}}}。`, trap: "A に T をつけない。RNA には T がない。" },
      { title: "アミノ酸の数", body: `この mRNA は塩基 ${n} 個なので、コドンは ${n / 3} 個分です。`, back: [S3] },
    ],
  };
}

const FIX: QuestionC[] = [
  {
    id: "bunka-setsumei",
    type: "C",
    difficulty: 3,
    points: 18,
    seconds: 180,
    skill: "思考・判断・表現",
    prompt: "からだの細胞はどれも同じ遺伝情報をもつのに、細胞がそれぞれ特定の形とはたらきをもつようになるのはなぜですか。「発現」という語を使って50字以内で説明しなさい。",
    answer: {
      kind: "written",
      limit: { max: 50, unit: "字" },
      model: "細胞の種類によって発現する遺伝子がちがい、つくられるタンパク質がちがうから。",
      rubric: [
        { label: "発現する遺伝子が細胞によってちがうこと", points: 10, keywords: ["発現", "遺伝子がちが"] },
        { label: "つくられるタンパク質がちがうこと", points: 8, keywords: ["タンパク質"] },
      ],
    },
    point: "発現する遺伝子 → タンパク質 → 形とはたらき",
    steps: [{ title: "分化のしくみ", body: "遺伝情報は同じでも{{発現する遺伝子}}がちがうので、つくられる{{タンパク質}}がちがい、細胞が分化します。", back: [S4] }],
  },
];

export const H_SCI_BIOB_HATSUGEN_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "生物基礎",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    { title: "転写と翻訳", lead: "次の問いに答えなさい。", style: "word", pick: 4, questions: POOL },
    { title: "塩基配列を写す", lead: "次の問いに答えなさい。", style: "mix", questions: [{ id: "tensha-hairetsu", type: "A", difficulty: 2, points: 17, seconds: 75, skill: "知識・技能", generate: tenshaA }] },
    { title: "細胞の分化", lead: "次の問いに答えなさい。", style: "writing", questions: FIX },
  ],
};
