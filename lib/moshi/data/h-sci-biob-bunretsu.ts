// 生物基礎「DNAの複製と細胞分裂」の単元模試 (B: プール8問から4問 ＋ A: 各期の長さ・メセルソンとスタールの実験の計算2問)。問題はすべてオリジナル。
// 検算: 各期の長さは「細胞周期の長さ×その時期の細胞の割合」(レクチャーの式)。先に長さを決め、細胞の数が整数になる組だけを使う。
//   半保存的複製では、n 回分裂後の DNA 2ⁿ 本 (2本鎖の数) のうち中間の重さは2本、残りは軽い。
//   どちらも calc を scripts/check-moshi.ts がシード1〜100で計算して照合する。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-biob-bunretsu";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "細胞周期：間期と分裂期のくり返し");
const S2 = L(2, "複製：それぞれの鎖が鋳型になる");
const S3 = L(3, "メセルソンとスタールの実験");
const S4 = L(4, "DNA量の変化と分裂期の流れ");
const S5 = L(5, "体細胞分裂を観察する");
const S6 = L(6, "各期の長さを細胞の数から求める");

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
const b = (id: string, d: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty: d, points: P[d], seconds: T[d], skill });
const f = (x: number) => String(Math.round(x * 1000) / 1000);

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...b("sphase", 1),
    prompt: "細胞周期のうち、DNA が複製される時期はどれですか。",
    answer: {
      kind: "choice",
      options: ["S期", "G1期", "G2期", "分裂期（M期）"],
      correct: 0,
      why: ["間期の S期に DNA が複製される。", "G1期は DNA 合成の準備の時期。", "G2期は分裂の準備の時期。", "分裂期は、すでに2倍になった DNA を分ける時期。"],
    },
    point: "DNA の複製は間期の S期",
    steps: [{ title: "間期の3つ", body: "間期は {{G1期}}（準備）→ {{S期}}（複製）→ {{G2期}}（分裂の準備）。", back: [S1] }],
  },
  {
    ...b("hanhozon", 1),
    prompt: "新しくできた DNA が、もとの鎖1本と新しい鎖1本からなる複製のしかたを何といいますか。",
    answer: { kind: "term", accept: ["半保存的複製"], near: [{ text: "保存的複製", why: "もとの2本鎖がそのまま残るのが保存的複製。実際は、もとの鎖を1本ずつ受けつぐ半保存的複製です。" }] },
    point: "もとの鎖1本＋新しい鎖1本＝半保存的複製",
    steps: [{ title: "鋳型から考える", body: "それぞれの鎖が{{鋳型}}になるので、新しい DNA にはもとの鎖が1本ずつ残ります。", back: [S2] }],
  },
  {
    ...b("chuki", 1),
    prompt: "体細胞分裂で、染色体が赤道面に並ぶ時期はどれですか。",
    answer: {
      kind: "choice",
      options: ["中期", "前期", "後期", "終期"],
      correct: 0,
      why: ["中期に染色体が赤道面に並ぶ。", "前期は染色体が太く短くなる時期。", "後期は染色体が両極へ分かれる時期。", "終期は細胞質が分かれる時期。"],
    },
    point: "前期→中期（赤道面）→後期→終期",
    steps: [{ title: "分裂期の流れ", body: "{{前期}}太く短く → {{中期}}赤道面に並ぶ → {{後期}}両極へ → {{終期}}細胞質が分かれる。", back: [S4] }],
  },
  // ---- 標準 ----
  {
    ...b("dna-ryo", 2),
    prompt: "細胞1個あたりの DNA 量の変化について正しい説明はどれですか。",
    answer: {
      kind: "choice",
      options: ["S期で2倍になり、分裂期の終わりにもとの量にもどる", "G1期で2倍になり、S期でもとにもどる", "分裂期の前期で2倍になる", "細胞周期を通して変わらない"],
      correct: 0,
      why: ["S期の複製で2倍になり、分裂で2つの細胞に分かれてもとの量にもどる。", "2倍になるのは S期。", "前期にはすでに2倍になっている。", "S期で2倍、分裂で半分と変化する。"],
    },
    point: "S期で2倍 → 分裂でもとにもどる",
    steps: [{ title: "グラフを思いうかべる", body: "DNA 量は {{S期で2倍}}になり、{{分裂期の終わり}}に2つの細胞に分かれてもとの量にもどります。", back: [S4] }],
  },
  {
    ...b("kansatsu", 2),
    prompt: "タマネギの根の先で体細胞分裂を観察するときの処理の順として正しいものはどれですか。",
    keepOrder: true,
    answer: {
      kind: "choice",
      options: ["固定 → 解離 → 染色 → 押しつぶし", "解離 → 固定 → 染色 → 押しつぶし", "染色 → 固定 → 解離 → 押しつぶし", "固定 → 染色 → 押しつぶし → 解離"],
      correct: 0,
      why: ["固定で細胞の活動を止め、解離で細胞どうしを離れやすくし、染色して押しつぶす。", "先に固定して、細胞のようすをそのまま止める。", "染色は解離のあと。", "解離は押しつぶしの前に行う。"],
    },
    point: "固定 → 解離 → 染色 → 押しつぶし",
    steps: [{ title: "処理の順", body: "{{固定}} → {{解離}} → {{染色}} → 押しつぶし で、細胞が1層に広がります。", back: [S5] }],
  },
  {
    ...b("kanki-ooi", 2, "思考・判断・表現"),
    prompt: "根の先の分裂組織を顕微鏡で見ると、ほとんどの細胞が間期にありました。その理由として最も適切なものはどれですか。",
    answer: {
      kind: "choice",
      options: ["細胞周期の中で、間期の長さが分裂期より長いから", "間期の細胞だけが染色されるから", "分裂期の細胞は押しつぶすとこわれるから", "根の先の細胞は分裂しないから"],
      correct: 0,
      why: [
        "ある時期の細胞の割合は、その時期の長さの割合に等しい。間期が長いので間期の細胞が多い。",
        "分裂期の細胞の染色体もよく染まる。",
        "分裂期の細胞もこわれずに観察できる。",
        "根の先は分裂がさかんな分裂組織。",
      ],
    },
    point: "細胞の数の割合＝時期の長さの割合",
    steps: [{ title: "割合と長さ", body: "細胞周期がそろっていなければ、ある時期の細胞の割合は{{その時期の長さの割合}}。間期が長いからです。", back: [S6, S1] }],
  },
  // ---- 発展 ----
  {
    ...b("omoi-nokoru", 3, "思考・判断・表現"),
    prompt: "メセルソンとスタールの実験で、¹⁵N だけで育てた大腸菌を ¹⁴N の培地に移して何回も分裂させたとき、正しい説明はどれですか。",
    answer: {
      kind: "choice",
      options: ["もとの重い鎖2本は何回分裂しても2本のまま残るが、重い DNA（2本とも ¹⁵N）は1回目の分裂でなくなる", "重い DNA が毎回半分ずつ残る", "2回分裂後には、重い DNA と軽い DNA が 1:1 になる", "何回分裂しても、中間の重さの DNA だけができる"],
      correct: 0,
      why: [
        "¹⁵N の鎖はそれぞれ ¹⁴N の新しい鎖と組になるので、重い DNA は1回目で消え、中間の DNA が2本ずつ残り続ける。",
        "重い DNA（2本鎖とも ¹⁵N）は1回目の分裂後にはない。",
        "2回分裂後は 中間：軽い＝1:1 で、重い DNA はない。",
        "2回目以降は軽い DNA がふえていく。",
      ],
    },
    point: "¹⁵N の鎖は2本のまま、重い DNA はすぐ消える",
    steps: [{ title: "鎖1本ずつ追う", body: "もとの {{¹⁵N 鎖2本}}は、それぞれ ¹⁴N 鎖と組になって中間の DNA として残ります。2本とも ¹⁵N の DNA はもうできません。", back: [S3] }],
  },
  {
    ...b("hozonteki", 3, "思考・判断・表現"),
    prompt: "もし DNA の複製が、もとの2本鎖をそのまま残して、まったく新しい2本鎖を1つつくるしくみだったとしたら、メセルソンとスタールの実験で1回分裂後に見られる DNA はどうなると考えられますか。",
    answer: {
      kind: "choice",
      options: ["重い DNA と軽い DNA が 1:1 で、中間の DNA はない", "中間の重さの DNA だけ", "重い DNA だけ", "中間の DNA と軽い DNA が 1:1"],
      correct: 0,
      why: [
        "もとの ¹⁵N の2本鎖（重い）がそのまま残り、¹⁴N だけの新しい2本鎖（軽い）が1つできる。",
        "中間だけになるのは半保存的複製の場合。実際の結果はこれだった。",
        "新しい ¹⁴N の DNA もできるので、重いものだけにはならない。",
        "これは半保存的複製の2回分裂後の結果。",
      ],
    },
    point: "結果が「中間だけ」だから半保存的複製",
    steps: [{ title: "仮説から予想する", body: "もとが残るなら1回後は{{重い：軽い＝1:1}}。実際は{{中間だけ}}だったので、半保存的複製と確かめられました。", back: [S3, S2] }],
  },
];

const PH: [string, number[]][] = [
  ["分裂期", [1, 1.5, 2, 2.5, 3]],
  ["前期", [0.5, 1, 1.5]],
  ["中期", [0.25, 0.5, 0.75]],
  ["間期", [15, 18, 20, 21]],
];
const KIKAN: [string, number, number, number][] = [];
for (const [name, ls] of PH) for (const Tc of [16, 20, 24, 25]) for (const N of [200, 400, 500, 800, 1000]) for (const Lh of ls) {
  const k = (Lh * N) / Tc;
  if (Lh < Tc && Number.isInteger(k)) KIKAN.push([name, Tc, N, Lh]);
}

function kikan(r: Rng): QuestionBody {
  const [name, Tc, N, Lh] = r.pick(KIKAN);
  const k = (Lh * N) / Tc;
  return {
    prompt: `細胞周期が ${Tc} 時間の細胞の集団を固定して観察すると、${N} 個の細胞のうち ${k} 個が${name}でした。${name}の長さは何時間ですか。細胞周期はそろっていないものとします。`,
    answer: { kind: "num", answerKind: "num", answer: [f(Lh)], unit: "時間", calc: `${Tc}*${k}/${N}` },
    point: "時期の長さ＝細胞周期×その時期の細胞の割合",
    steps: [
      { title: "割合を出す", body: `${name}の細胞の割合は ${k}/${N}。`, back: [S6] },
      { title: "長さを出す", body: `${Tc} 時間 × ${k}/${N} ＝ {{${f(Lh)} 時間}}。`, trap: "細胞の数をそのまま時間にしない。割合を細胞周期の長さにかける。" },
    ],
  };
}

function meselson(r: Rng): QuestionBody {
  const n = r.int(2, 6);
  const total = Math.pow(2, n);
  if (r.bool()) {
    const ans = total / 2 - 1;
    return {
      prompt: `¹⁵N だけをふくむ培地で育てた大腸菌を ¹⁴N の培地に移し、${n} 回分裂させました。このとき、軽い DNA（2本鎖とも ¹⁴N）は、中間の重さの DNA の何倍ありますか。`,
      answer: { kind: "num", answerKind: "num", answer: [String(ans)], unit: "倍", calc: `(2^${n}-2)/2` },
      point: "中間の DNA はいつも2本、残りが軽い",
      steps: [
        { title: "DNA の数", body: `1個の DNA から ${n} 回分裂で ${total} 個。そのうち ¹⁵N 鎖をふくむ中間の DNA は{{2個}}。`, back: [S3] },
        { title: "比を出す", body: `軽い DNA は ${total} − 2 ＝ ${total - 2} 個。${total - 2} ÷ 2 ＝ {{${ans} 倍}}。`, trap: "中間の DNA が回数とともにふえると考えない。¹⁵N 鎖は2本しかない。" },
      ],
    };
  }
  const ans = f(100 / (total / 2));
  return {
    prompt: `¹⁵N だけをふくむ培地で育てた大腸菌を ¹⁴N の培地に移し、${n} 回分裂させました。このとき、中間の重さの DNA は、すべての DNA の何％ ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [ans], unit: "％", calc: `2/2^${n}*100` },
    point: "中間の DNA は2個 ÷ 全体 2ⁿ 個",
    steps: [
      { title: "DNA の数", body: `${n} 回分裂で DNA は ${total} 個。中間の DNA は{{2個}}。`, back: [S3] },
      { title: "割合", body: `2 ÷ ${total} × 100 ＝ {{${ans}％}}。`, trap: "重い DNA は1回目の分裂でなくなる。中間と軽いだけを考える。" },
    ],
  };
}

export const H_SCI_BIOB_BUNRETSU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "生物基礎",
  review: { status: "draft" },
  sections: [
    { title: "DNA の複製と細胞分裂", lead: "次の問いに答えなさい。", style: "word", pick: 4, questions: POOL },
    {
      title: "細胞周期と複製の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "kikan", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "思考・判断・表現", generate: kikan },
        { id: "meselson", type: "A", difficulty: 3, points: 18, seconds: 120, skill: "思考・判断・表現", generate: meselson },
      ],
    },
  ],
};
