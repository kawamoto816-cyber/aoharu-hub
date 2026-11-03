// 生物基礎「遺伝子とDNA」の単元模試 (B: プール8問から4問 ＋ A: シャルガフの規則の計算2問)。問題はすべてオリジナル。
// 検算: 2本鎖DNAでは A＝T、G＝C (A＋G＝50％)。A の割合 x を先に決め、ほかの塩基の割合・数を calc で作り、
//   scripts/check-moshi.ts がシード1〜100で計算して照合する。塩基の数は「塩基対の数×2＝塩基の総数」から求める。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-biob-dna";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "遺伝子・DNA・染色体の関係");
const S2 = L(2, "ヌクレオチドがつながった二重らせん");
const S3 = L(3, "シャルガフの規則：A＝T、G＝C");
const S4 = L(4, "遺伝子の本体がDNAとわかるまで");
const S5 = L(5, "ゲノム：生きるのに必要な1組の情報");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
const b = (id: string, d: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty: d, points: P[d], seconds: T[d], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...b("nucleotide", 1),
    prompt: "DNA の構成単位で、リン酸・糖・塩基からなるものを何といいますか。",
    answer: { kind: "term", accept: ["ヌクレオチド"], near: [{ text: "塩基", why: "塩基はヌクレオチドの一部。リン酸・糖・塩基がそろった単位がヌクレオチドです。" }] },
    point: "リン酸＋糖＋塩基＝ヌクレオチド",
    steps: [{ title: "DNA の単位", body: "{{ヌクレオチド}}はリン酸・糖（デオキシリボース）・塩基からなり、これがつながって鎖になります。", back: [S2] }],
  },
  {
    ...b("deoxy", 1),
    prompt: "DNA にふくまれる糖はどれですか。",
    answer: {
      kind: "choice",
      options: ["デオキシリボース", "リボース", "グルコース", "セルロース"],
      correct: 0,
      why: ["DNA は「デオキシリボ核酸」。糖はデオキシリボース。", "リボースは RNA の糖。", "グルコースは呼吸などに使われる糖で、DNA の材料ではない。", "セルロースは細胞壁の主成分。"],
    },
    point: "DNA の糖はデオキシリボース",
    steps: [{ title: "名前に入っている", body: "DNA＝{{デオキシリボ}}核酸。リボースは RNA の糖です。", back: [S2] }],
  },
  {
    ...b("tsui", 1),
    prompt: "DNA の二重らせんで、アデニン（A）と対になる塩基はどれですか。",
    answer: {
      kind: "choice",
      options: ["チミン（T）", "グアニン（G）", "シトシン（C）", "アデニン（A）"],
      correct: 0,
      why: ["A は T と対になる（相補性）。", "G は C と対になる。", "C は G と対になる。", "同じ塩基どうしは対にならない。"],
    },
    point: "A−T、G−C",
    steps: [{ title: "相補性", body: "{{A と T}}、{{G と C}}が必ず対になります。片方の鎖が決まれば、もう片方も決まります。", back: [S2] }],
  },
  // ---- 標準 ----
  {
    ...b("ookisa", 2),
    prompt: "遺伝子・DNA・染色体を、大きい順に正しく並べたものはどれですか。",
    keepOrder: true,
    answer: {
      kind: "choice",
      options: ["染色体 ＞ DNA ＞ 遺伝子", "DNA ＞ 染色体 ＞ 遺伝子", "遺伝子 ＞ DNA ＞ 染色体", "染色体 ＞ 遺伝子 ＞ DNA"],
      correct: 0,
      why: ["DNA がヒストンに巻きついて染色体をつくり、遺伝子は DNA の一部の区間。", "染色体は DNA をふくむので、DNA より大きい。", "遺伝子は DNA の一部なので最も小さい。", "遺伝子は DNA の一部の区間なので、DNA より小さい。"],
    },
    point: "染色体 ＞ DNA ＞ 遺伝子",
    steps: [{ title: "ふくむ関係", body: "染色体は DNA と{{ヒストン}}でできていて、{{遺伝子}}は DNA の塩基配列の一部の区間です。", back: [S1] }],
  },
  {
    ...b("hershey", 2),
    prompt: "ファージを使った実験で、遺伝子の本体が DNA であることを示した研究者はだれですか。",
    answer: {
      kind: "choice",
      options: ["ハーシーとチェイス", "ワトソンとクリック", "グリフィス", "シャルガフ"],
      correct: 0,
      why: ["ハーシーとチェイスはファージの実験で、遺伝子の本体が DNA であることを示した。", "ワトソンとクリックは二重らせん構造のモデルを発表した。", "グリフィスは肺炎球菌の実験で形質転換を見つけた。", "シャルガフは A＝T、G＝C の規則を見つけた。"],
    },
    point: "ファージの実験＝ハーシーとチェイス",
    steps: [{ title: "研究者と業績", body: "グリフィス（形質転換）→エイブリー→{{ハーシーとチェイス}}（ファージ）で DNA が本体と確かめられ、ワトソンとクリックが二重らせんを示しました。", back: [S4] }],
  },
  {
    ...b("genome", 2),
    prompt: "ゲノムについて正しい説明はどれですか。",
    answer: {
      kind: "choice",
      options: ["生殖細胞がもつ1組の遺伝情報で、ヒトの体細胞は2組もつ", "体細胞がもつ遺伝情報のすべてで、ヒトでは1組", "遺伝子だけを集めたもので、DNA のほかの部分はふくまない", "ヒトのゲノムは約2万塩基対である"],
      correct: 0,
      why: [
        "ゲノムは生殖細胞がもつ1組の遺伝情報。体細胞は父母から1組ずつ受けつぐ。",
        "体細胞はゲノムを2組もつ。",
        "ゲノムには遺伝子としてはたらかない部分も多くふくまれる。",
        "ヒトのゲノムは約30億塩基対。約2万は遺伝子の数。",
      ],
    },
    point: "ゲノム＝生殖細胞の1組。体細胞は2組",
    steps: [{ title: "1組か2組か", body: "{{生殖細胞}}がもつ1組の遺伝情報がゲノム。ヒトの体細胞は{{2組}}もちます。", back: [S5] }],
  },
  // ---- 発展 ----
  {
    ...b("ag50", 3, "思考・判断・表現"),
    prompt: "2本鎖 DNA の塩基の割合について、どの生物でも成り立つものはどれですか。",
    answer: {
      kind: "choice",
      options: ["A と G の割合の和は 50％ になる", "A と T の割合の和は 50％ になる", "4種類の塩基がそれぞれ 25％ ずつになる", "G の割合は A の割合と等しい"],
      correct: 0,
      why: [
        "A＝T、G＝C なので A＋T＋G＋C＝2(A＋G)＝100％。A＋G＝50％。",
        "A＋T は生物によってちがう（A が30％なら60％）。",
        "割合は生物によってちがい、25％ずつとは限らない。",
        "等しいのは A と T、G と C。",
      ],
    },
    point: "A＝T、G＝C より A＋G＝50％",
    steps: [{ title: "式で確かめる", body: "A＝T、G＝C を代入すると 2A＋2G＝100 なので {{A＋G＝50％}}。", back: [S3] }],
  },
  {
    ...b("idenshi-ichibu", 3, "思考・判断・表現"),
    prompt: "「遺伝子とDNAは同じもの」という考えについて、正しい説明はどれですか。",
    answer: {
      kind: "choice",
      options: ["誤り。遺伝子は DNA の塩基配列のうち、タンパク質のつくり方を決めている一部の区間", "正しい。DNA の全体が遺伝子としてはたらく", "誤り。遺伝子はタンパク質でできている", "誤り。遺伝子は染色体より大きい"],
      correct: 0,
      why: [
        "DNA には遺伝子としてはたらかない部分も多い。遺伝子は一部の区間。",
        "ヒトのゲノムのうち遺伝子としてはたらく部分はごく一部。",
        "遺伝子の本体は DNA。タンパク質ではない。",
        "遺伝子は DNA の一部で、染色体より小さい。",
      ],
    },
    point: "遺伝子は DNA の一部の区間",
    steps: [{ title: "DNA と遺伝子", body: "遺伝子は DNA の{{一部の区間}}。ゲノムの多くはタンパク質のつくり方を直接決めていない部分です。", back: [S1, S5] }],
  },
];

const NAME: Record<string, string> = { A: "アデニン（A）", T: "チミン（T）", G: "グアニン（G）", C: "シトシン（C）" };

function wariai(r: Rng): QuestionBody {
  const x = r.int(15, 35);
  const giveA = r.bool();
  const [given, gv] = giveA ? [r.pick(["A", "T"]), x] : [r.pick(["G", "C"]), 50 - x];
  const ask = r.pick(["A", "T", "G", "C"].filter((s) => s !== given));
  const pair: Record<string, string> = { A: "T", T: "A", G: "C", C: "G" };
  const same = pair[given] === ask;
  const ans = same ? gv : 50 - gv;
  return {
    prompt: `ある生物の2本鎖 DNA では、${NAME[given]}が全塩基の ${gv}％ をしめていました。${NAME[ask]}は全塩基の何％ ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(ans)], unit: "％", calc: same ? `${gv}` : `(100-2*${gv})/2` },
    point: same ? "対になる塩基は同じ割合" : "A＋G＝50％（T＋C＝50％）",
    steps: same
      ? [{ title: "対になる塩基", body: `${given} と ${ask} は対になるので、同じ割合の {{${ans}％}}。`, back: [S3] }]
      : [
          { title: "対の塩基をそろえる", body: `${given} と対になる ${pair[given]} も ${gv}％。2つで ${2 * gv}％。`, back: [S3] },
          { title: "残りを半分ずつ", body: `残り ${100 - 2 * gv}％ を ${ask} と ${pair[ask]} で半分ずつ分けるので {{${ans}％}}。`, trap: `100 − ${gv} としない。対の ${pair[given]} の分も引く。` },
        ],
  };
}

function kosu(r: Rng): QuestionBody {
  const N = r.pick([500, 1000, 1500, 2000, 3000, 5000]);
  const x = r.pick([15, 20, 25, 30, 35, 40]);
  const ask = r.pick(["G", "C", "T"]);
  const pct = ask === "T" ? x : 50 - x;
  const ans = (2 * N * pct) / 100;
  return {
    prompt: `${N} 塩基対からなる2本鎖 DNA があり、アデニン（A）は全塩基の ${x}％ でした。この DNA にふくまれる${NAME[ask]}は何個ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(ans)], unit: "個", calc: `2*${N}*${ask === "T" ? x : `(50-${x})`}/100` },
    point: "塩基の総数は塩基対の数の2倍",
    steps: [
      { title: "塩基の総数", body: `${N} 塩基対なので、塩基は全部で {{${2 * N} 個}}。`, trap: "塩基対の数をそのまま塩基の数にしない。1対に塩基は2個。", back: [S2] },
      { title: "割合を出す", body: ask === "T" ? `T＝A なので ${x}％。` : `A＋G＝50％ より ${ask}＝50 − ${x}＝${pct}％。`, back: [S3] },
      { title: "個数", body: `${2 * N} × ${pct}/100 ＝ {{${ans} 個}}。` },
    ],
  };
}

export const H_SCI_BIOB_DNA_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "生物基礎",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    { title: "遺伝子と DNA", lead: "次の問いに答えなさい。", style: "word", pick: 4, questions: POOL },
    {
      title: "塩基の割合と数",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "wariai", type: "A", difficulty: 2, points: 17, seconds: 75, skill: "知識・技能", generate: wariai },
        { id: "kosu", type: "A", difficulty: 3, points: 18, seconds: 120, skill: "思考・判断・表現", generate: kosu },
      ],
    },
  ],
};
