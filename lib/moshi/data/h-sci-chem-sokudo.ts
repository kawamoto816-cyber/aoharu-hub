// 化学「反応速度」の単元模試 (A: 計算3問 ＋ B: プール8問から3問)。問題はすべてオリジナル。
// 検算: 濃度変化・時間・倍率はきれいな値の組だけを選び、calc (問題の数から答えを出す式) を scripts/check-moshi.ts が
//   シード1〜100で照合する。速度式の問題は、架空の反応 A＋B → C の実験結果を、決めた次数 x・y から作る。
//   B の事実 (触媒・活性化エネルギー・10 K で2〜3倍・律速段階) はレクチャーの記述だけを使う。
import type { QuestionB, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-sci-chem-sokudo";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "反応速度は「単位時間あたりの濃度変化」");
const S2 = L(2, "速さを変える4つの条件");
const S3 = L(3, "活性化エネルギーと触媒");
const S4 = L(4, "温度を10 K上げると、速さは2〜3倍");
const S5 = L(5, "反応はいくつかの段階で進む");

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const m1 = (x: number) => (Math.abs(x * 10 - Math.round(x * 10)) < 1e-9 ? x.toFixed(1) : f(x));
const clean = (x: number, d = 3) => Math.abs(x * 10 ** d - Math.round(x * 10 ** d)) < 1e-6;

function heikin(r: Rng): QuestionBody {
  const o2 = r.bool();
  const combos: [number, number, number][] = [];
  for (const c0 of [0.5, 0.6, 0.8, 1.0, 1.2]) for (const dc of [0.1, 0.2, 0.3, 0.4]) for (const t of [10, 20, 25, 40, 50])
    if (clean((dc / t) * 1000 * (o2 ? 0.5 : 1), 2)) combos.push([c0, dc, t]);
  const [c0, dc, t] = r.pick(combos);
  const c1 = f(c0 - dc);
  const v = (dc / t) * 1000;
  const ans = f(o2 ? v / 2 : v);
  return {
    prompt: `過酸化水素の分解 2H₂O₂ → 2H₂O＋O₂ で、[H₂O₂] が ${t} 秒間に ${f(c0)} mol/L から ${c1} mol/L に減りました。この間の${o2 ? "酸素 O₂ が生成する平均の速さ" : "H₂O₂ の平均の分解速度"}は何 mol/(L·s) ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [ans], unit: "×10⁻³ mol/(L·s)", calc: `(${c0}-${c1})/${t}*1000${o2 ? "/2" : ""}` },
    point: o2 ? "まず H₂O₂ の速さ。O₂ は係数の比で 1/2" : "v＝−Δ[A]/Δt（減った量÷時間）",
    steps: [
      { title: "H₂O₂ の速さ", body: `減った量 ${f(c0)}−${c1}＝${f(dc)} mol/L。${f(dc)}÷${t}＝{{${f(v)}×10⁻³ mol/(L·s)}}。`, trap: "濃度の差は正の値にそろえる（マイナスをつけて減る量を正に）。", back: [S1] },
      ...(o2 ? [{ title: "係数の比で直す", body: `H₂O₂：O₂＝2：1 なので、${f(v)}×1/2＝{{${ans}×10⁻³ mol/(L·s)}}。`, back: [S1] }] : []),
    ],
  };
}

function ondo(r: Rng): QuestionBody {
  const k = r.pick([2, 3]);
  const t1 = r.pick([10, 15, 20, 25, 30]);
  const dT = r.pick(k === 2 ? [10, 20, 30, 40] : [10, 20, 30]);
  const t2 = t1 + dT;
  const n = dT / 10;
  const x = k ** n;
  return {
    prompt: `温度を 10 K 上げるごとに反応速度が ${k} 倍になる反応があります。温度を ${t1}℃ から ${t2}℃ に上げると、反応速度は何倍になりますか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(x)], unit: "倍", calc: `${k}^${n}` },
    point: "10 K ごとに k 倍 → n 回なら kⁿ 倍",
    steps: [
      { title: "10 K が何回分か", body: `${t2}−${t1}＝${dT} K で、{{${n} 回分}}。`, back: [S4] },
      { title: "かけ算でふえる", body: `${Array(n).fill(k).join("×")}＝{{${x} 倍}}。`, trap: `${k}×${n} のように足し算的に考えない。毎回 ${k} 倍される。`, back: [S4] },
    ],
  };
}

function shiki(r: Rng): QuestionBody {
  const x = r.pick([1, 2]);
  const y = r.pick([0, 1, 2]);
  const a = r.pick([0.1, 0.2]);
  const bb = r.pick([0.1, 0.2, 0.3]);
  const v1 = r.pick([1.0, 1.5, 2.0, 2.5, 3.0]);
  const p = r.pick([2, 3]);
  const q = r.pick([2, 3]);
  const ans = f(v1 * p ** x * q ** y);
  const ord = (e: number) => (e === 0 ? "0（速さは変わらない）" : e === 1 ? "1（2倍で2倍）" : "2（2倍で4倍）");
  return {
    prompt: `反応 A＋B → C について、はじめの濃度と反応のはじめの速さ v を測ると、次のようになりました。\n実験1：[A]＝${f(a)} mol/L、[B]＝${f(bb)} mol/L、v＝${m1(v1)}×10⁻⁴ mol/(L·s)\n実験2：[A]＝${f(2 * a)} mol/L、[B]＝${f(bb)} mol/L、v＝${m1(v1 * 2 ** x)}×10⁻⁴ mol/(L·s)\n実験3：[A]＝${f(a)} mol/L、[B]＝${f(2 * bb)} mol/L、v＝${m1(v1 * 2 ** y)}×10⁻⁴ mol/(L·s)\n同じ温度で [A]＝${f(p * a)} mol/L、[B]＝${f(q * bb)} mol/L にすると、はじめの速さは何 mol/(L·s) になりますか。`,
    answer: { kind: "num", answerKind: "num", answer: [ans], unit: "×10⁻⁴ mol/(L·s)", calc: `${v1}*${p}^${x}*${q}^${y}` },
    point: "片方だけ変えた実験から次数を読み、v＝k[A]ˣ[B]ʸ",
    steps: [
      { title: "次数を読む", body: `実験1→2で [A] だけ2倍、v は ${f(2 ** x)} 倍なので x＝${ord(x)}。実験1→3で [B] だけ2倍、v は ${f(2 ** y)} 倍なので y＝${ord(y)}。`, trap: "次数は反応式の係数（どちらも1）から決めない。実験で決まる。", back: [S2, S5] },
      { title: "倍率をかける", body: `実験1から [A] は ${p} 倍、[B] は ${q} 倍。v は ${p}${x === 2 ? "²" : ""}×${q}${y === 2 ? "²" : y === 0 ? "⁰" : ""}＝${f(p ** x * q ** y)} 倍。`, back: [S2] },
      { title: "答え", body: `${f(v1)}×${f(p ** x * q ** y)}＝{{${ans}×10⁻⁴ mol/(L·s)}}。` },
    ],
  };
}

const P = { 1: 15, 2: 17, 3: 18 } as const;
const T = { 1: 45, 2: 60, 3: 75 } as const;
const b = (id: string, d: 1 | 2 | 3, skill: QuestionB["skill"] = "知識・技能") => ({ id, type: "B" as const, difficulty: d, points: P[d], seconds: T[d], skill });

const POOL: QuestionB[] = [
  // ---- 基本 ----
  {
    ...b("kasseika", 1),
    prompt: "反応物が活性化状態に達するのに必要な、最小のエネルギーを何といいますか。",
    answer: { kind: "term", accept: ["活性化エネルギー"], near: [{ text: "反応エンタルピー", why: "反応エンタルピー ΔH は、はじめと終わりのエンタルピーの差です。山をこえるのに必要なのは活性化エネルギーです。" }] },
    point: "山をこえる最小のエネルギー＝活性化エネルギー",
    steps: [{ title: "用語", body: "活性化状態をこえるのに必要な最小のエネルギーが{{活性化エネルギー}}です。", back: [S3] }],
  },
  {
    ...b("hyomenseki", 1),
    prompt: "鉄のかたまりは火であぶっても燃えにくいのに、スチールウールは火花を散らして燃えます。速さを変えている条件はどれですか。",
    answer: {
      kind: "choice",
      options: ["表面積", "触媒", "温度", "反応物の種類"],
      correct: 0,
      why: ["細い繊維にすると表面積が大きくなり、反応できる場所がふえて速くなる。", "どちらも触媒は加えていない。", "同じ火であぶっているので、温度のちがいではない。", "どちらも同じ鉄。"],
    },
    point: "固体は細かくすると表面積がふえて速くなる",
    steps: [{ title: "固体の表面", body: "固体の反応は表面で起こるので、細かくして{{表面積}}を大きくすると速くなります。", back: [S2] }],
  },
  {
    ...b("shokubai-dh", 1),
    prompt: "反応に触媒を加えたときの変化として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["活性化エネルギーが小さくなり、ΔH は変わらない", "活性化エネルギーも ΔH も小さくなる", "活性化エネルギーは変わらず、ΔH が小さくなる", "触媒自身が反応して別の物質に変わる"],
      correct: 0,
      why: ["触媒は活性化エネルギーの小さい別の道すじをつくる。はじめと終わりは同じなので ΔH は変わらない。", "ΔH ははじめと終わりの状態で決まり、触媒では変わらない。", "触媒が変えるのは活性化エネルギー。", "触媒は反応の前後で変化しない。"],
    },
    point: "触媒は活性化エネルギーを下げる。ΔH は不変",
    steps: [{ title: "触媒のはたらき", body: "触媒は{{活性化エネルギーの小さい道すじ}}をつくります。ΔH は変わりません。", back: [S3] }],
  },
  // ---- 標準 ----
  {
    ...b("ondo-riyu", 2, "思考・判断・表現"),
    prompt: "温度を 10 K 上げると反応速度が2〜3倍になるおもな理由として、正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["活性化エネルギーをこえる分子の割合が大きくふえるから", "活性化エネルギーが小さくなるから", "分子どうしの衝突の回数が2〜3倍になるから", "反応エンタルピーが大きくなるから"],
      correct: 0,
      why: ["温度が上がるとエネルギー分布のすそが持ち上がり、山をこえられる分子の割合が大きくふえる。", "活性化エネルギーを下げるのは触媒。温度では変わらない。", "衝突の回数は数％ほどしかふえない。", "温度で反応が速くなる理由は ΔH ではない。"],
    },
    point: "衝突の回数より、山をこえる分子の割合がふえる",
    steps: [{ title: "エネルギー分布", body: "温度を上げると、{{活性化エネルギーをこえる分子の割合}}が大きくふえます。衝突回数のふえ方はわずかです。", back: [S4] }],
  },
  {
    ...b("jisu", 2),
    prompt: "速度式 v＝k[A]ˣ[B]ʸ の次数 x・y の決め方として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["濃度を変えて速さを測る実験で決める", "反応式の係数をそのまま使う", "反応エンタルピー ΔH の大きさで決める", "生成物の数で決める"],
      correct: 0,
      why: ["次数は、濃度を変えて反応のはじめの速さを測る実験で決まる。", "係数と一致するとは限らない。反応は段階を経て進むことが多い。", "ΔH と次数は関係がない。", "生成物の数とは関係がない。"],
    },
    point: "次数は係数ではなく実験で決まる",
    steps: [{ title: "速度式", body: "次数は{{実験で決まり}}、反応式の係数と一致するとは限りません。", back: [S2, S5] }],
  },
  {
    ...b("noudo", 2),
    prompt: "線香は空気中では赤くくすぶるだけですが、酸素の中に入れると炎を上げて燃えます。速さが大きくなった理由として正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["酸素の濃度が大きく、単位時間あたりの衝突の回数がふえたから", "酸素が触媒としてはたらいたから", "酸素の中では活性化エネルギーが大きくなるから", "酸素の中では線香の表面積が大きくなるから"],
      correct: 0,
      why: ["濃度（分圧）が大きいほど、同じ体積中の粒子がふえて衝突の回数がふえる。", "酸素は反応物で、触媒ではない。", "活性化エネルギーが大きくなると、反応は遅くなる。", "線香の形は変わっていない。"],
    },
    point: "濃度が大きいほど衝突の回数がふえる",
    steps: [{ title: "濃度", body: "反応物の{{濃度}}（気体なら分圧）が大きいと、衝突の回数がふえて反応が速くなります。", back: [S2] }],
  },
  // ---- 発展 ----
  {
    ...b("ritsusoku", 3, "思考・判断・表現"),
    prompt: "いくつかの素反応が続いて進む反応で、全体の反応の速さを決めるものはどれですか。",
    answer: {
      kind: "choice",
      options: ["いちばん遅い素反応（律速段階）", "いちばん速い素反応", "最初の素反応", "すべての素反応の速さの平均"],
      correct: 0,
      why: ["全体の速さは、いちばん遅い段階＝律速段階で決まる。", "速い段階がいくら速くても、遅い段階で待たされる。", "最初の段階が遅いとは限らない。", "平均では決まらない。流れ作業でいちばん時間のかかる工程が全体を決める。"],
    },
    point: "全体の速さ＝いちばん遅い段階（律速段階）",
    steps: [{ title: "律速段階", body: "段階が続くとき、全体の速さは{{いちばん遅い段階}}で決まります。これを律速段階といいます。", back: [S5] }],
  },
  {
    ...b("ichiji", 3, "思考・判断・表現"),
    prompt: "速度式が v＝k[A] で表される一次反応について、正しいものはどれですか。",
    answer: {
      kind: "choice",
      options: ["濃度が半分になるまでの時間は、はじめの濃度によらず一定", "濃度が半分になるまでの時間は、はじめの濃度に比例して長くなる", "速さは時間がたっても変わらない", "速度定数 k は濃度が下がると小さくなる"],
      correct: 0,
      why: ["一次反応では速さが濃度に比例するので、半減期ははじめの濃度によらず一定。", "一次反応の半減期は一定。", "濃度が下がると速さも下がる。", "k は温度や触媒で変わるが、濃度には関係しない。"],
    },
    point: "一次反応の半減期は一定。k は濃度で変わらない",
    steps: [{ title: "一次反応", body: "速さが濃度に比例するので、濃度が半分になるまでの時間（{{半減期}}）は一定です。", back: [S5] }],
  },
];

export const H_SCI_CHEM_SOKUDO_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sci",
  grade: "化学",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "反応速度の計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "heikin", type: "A", difficulty: 1, points: 15, seconds: 75, skill: "知識・技能", generate: heikin },
        { id: "ondo", type: "A", difficulty: 2, points: 17, seconds: 60, skill: "知識・技能", generate: ondo },
        { id: "shiki", type: "A", difficulty: 3, points: 18, seconds: 180, skill: "思考・判断・表現", generate: shiki },
      ],
    },
    {
      title: "速さを決めるしくみ",
      lead: "次の問いに答えなさい。",
      style: "word",
      pick: 3,
      questions: POOL,
    },
  ],
};
