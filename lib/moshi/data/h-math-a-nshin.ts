// 数学A「n進法」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: n進法→10進法は「各けたの数字×位の大きさ」の和を calc に書く。10進法→n進法・2進法のたし算は、
// 答えの数字の並びを toString(n) で作り、もとの数に戻して一致を確かめてから出す (term で採点)。
// 小数は 1/n, 1/n², … の和を calc に書く。scripts/check-moshi.ts がシード1〜100で照合する。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-a-nshin";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const BACK_KURAI = L(1, "位の大きさがちがうだけ");
const BACK_TO10 = L(2, "n進法 → 10進法");
const BACK_FROM10 = L(3, "10進法 → n進法");
const BACK_SHOSU = L(4, "小数も位の大きさで考える");
const BACK_60 = L(5, "時計の中に生きる60進法");

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
const fr = (n: number, d: number) => {
  const g = gcd(n, d);
  return d / g === 1 ? String(n / g) : `${n / g}/${d / g}`;
};
const SUB = "₀₁₂₃₄₅₆₇₈₉";
const base = (n: number) => `₍${[...String(n)].map((c) => SUB[Number(c)]).join("")}₎`;
const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";
const pow = (n: number, e: number) => `${n}${[...String(e)].map((c) => SUP[Number(c)]).join("")}`;

function to10(r: Rng): QuestionBody {
  const n = r.int(2, 7);
  const k = n === 2 ? r.int(5, 7) : r.int(3, 4);
  const ds = [r.int(1, n - 1), ...Array.from({ length: k - 1 }, () => r.int(0, n - 1))];
  const s = ds.join("");
  const val = parseInt(s, n);
  const terms = ds.map((d, i) => ({ d, e: k - 1 - i })).filter((t) => t.d > 0);
  return {
    prompt: `${n}進法で表された数 ${s}${base(n)} を、10進法で表しなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(val)], calc: terms.map((t) => `${t.d}*${n}^${t.e}`).join("+") },
    point: "右から 1, n, n², … の位。数字×位の大きさをたす",
    steps: [
      { title: "位の大きさ", body: `右から ${Array.from({ length: k }, (_, i) => n ** i).join(", ")} の位です。`, back: [BACK_KURAI] },
      { title: "かけてたす", body: `${terms.map((t) => `${t.d}×${t.e === 0 ? "1" : t.e === 1 ? n : pow(n, t.e)}`).join("＋")}＝{{${val}}}。`, trap: `いちばん右の位を ${n}¹ から始めない。右はしは ${n}⁰＝1 の位です。`, back: [BACK_TO10] },
    ],
  };
}

function from10(r: Rng): QuestionBody {
  const n = r.int(2, 5);
  const N = n === 2 ? r.int(20, 120) : r.int(30, 250);
  const s = N.toString(n);
  // 割り算の列
  const rows: string[] = [];
  for (let q = N; q > 0; q = Math.floor(q / n)) rows.push(`${q}÷${n}＝${Math.floor(q / n)} 余り ${q % n}`);
  if (parseInt(s, n) !== N) throw new Error("変換の検算に失敗");
  return {
    prompt: `10進法で表された数 ${N} を、${n}進法で表しなさい。（数字だけを答えなさい）`,
    answer: { kind: "term", accept: [s, `${s}(${n})`, `${s}${base(n)}`] },
    point: `${n} で割り続け、余りを下から順に並べる`,
    steps: [
      { title: `${n} で割り続ける`, body: rows.join("、"), back: [BACK_FROM10] },
      { title: "余りを下から", body: `最後に出た余りを左はしにして並べると {{${s}${base(n)}}}。`, trap: "余りを上から順に並べると、数字の順が逆になる。" },
    ],
  };
}

function shosu(r: Rng): QuestionBody {
  const n = r.pick([2, 2, 3, 4, 5]);
  const k = n === 2 ? 3 : 2;
  let ds: number[] = [];
  do ds = Array.from({ length: k }, () => r.int(0, n - 1));
  while (ds[k - 1] === 0);
  const den = n ** k;
  const num = ds.reduce((x, d, i) => x + d * n ** (k - 1 - i), 0);
  const parts = ds.map((d, i) => ({ d, e: i + 1 })).filter((t) => t.d > 0);
  return {
    prompt: `${n}進法で表された小数 0.${ds.join("")}${base(n)} を、10進法の分数で表しなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [fr(num, den)], calc: parts.map((t) => `${t.d}/${n}^${t.e}`).join("+") },
    point: "小数点の右は 1/n、1/n²、… の位",
    steps: [
      { title: "位の大きさ", body: `小数点の右は 1/${n}、1/${n * n}${k === 3 ? `、1/${n ** 3}` : ""} の位です。`, back: [BACK_SHOSU] },
      { title: "かけてたす", body: `${parts.map((t) => `${t.d}×1/${n ** t.e}`).join("＋")}＝${num}/${den}＝{{${fr(num, den)}}}。`, trap: `0.${ds.join("")} を10進法の小数としてそのまま読まない。位の大きさがちがいます。` },
    ],
  };
}

function tashizan(r: Rng): QuestionBody {
  const a = r.int(9, 31);
  let b = r.int(5, 31);
  if (b === a) b = a - 3;
  const add = r.bool();
  const [x, y] = add || a >= b ? [a, b] : [b, a];
  const sx = x.toString(2);
  const sy = y.toString(2);
  const v = add ? x + y : x - y;
  const s = v.toString(2);
  if (parseInt(s, 2) !== v || v < 0) throw new Error("検算に失敗");
  const op = add ? "＋" : "−";
  return {
    prompt: `2進法で表された数の計算 ${sx}${base(2)} ${op} ${sy}${base(2)} をして、答えを2進法で表しなさい。（数字だけを答えなさい）`,
    answer: { kind: "term", accept: [s, `${s}(2)`, `${s}${base(2)}`] },
    point: add ? "2 たまったら1つ上の位へくり上げる" : "上の位から借りると、下の位では 2",
    steps: [
      { title: add ? "下の位からくり上げて計算" : "下の位から借りて計算", body: add ? "1＋1＝10₍₂₎ なので、1 をくり上げます。" : "0−1 のときは上の位から1借りて、10₍₂₎−1＝1。", back: [BACK_SHOSU] },
      { title: "10進法で確かめる", body: `${sx}${base(2)}＝${x}、${sy}${base(2)}＝${y}。${x}${op}${y}＝${v}＝{{${s}${base(2)}}}。`, back: [BACK_TO10, BACK_FROM10] },
    ],
  };
}

function rokujuu(r: Rng): QuestionBody {
  const h = r.int(1, 5);
  const m = r.int(1, 59);
  const s = r.int(1, 59);
  const N = h * 3600 + m * 60 + s;
  if (r.bool()) {
    return {
      prompt: `${h}時間${m}分${s}秒は、何秒か。`,
      answer: { kind: "num", answerKind: "num", answer: [String(N)], unit: "秒", calc: `${h}*60^2+${m}*60+${s}` },
      point: "60進法の位は 1, 60, 60²＝3600",
      steps: [{ title: "位の大きさをかけてたす", body: `${h}×3600＋${m}×60＋${s}＝{{${N}}}（秒）。`, back: [BACK_60] }],
    };
  }
  const q1 = Math.floor(N / 60);
  return {
    prompt: `${N}秒は、何時間何分何秒か。「○時間○分○秒」の形で答えなさい。`,
    answer: { kind: "term", accept: [`${h}時間${m}分${s}秒`] },
    point: "60で割り続ける。n進法への変換と同じ",
    steps: [
      { title: "60で割る", body: `${N}÷60＝${q1} 余り ${s}。${s}秒が残ります。`, back: [BACK_60] },
      { title: "もう一度60で割る", body: `${q1}÷60＝${h} 余り ${m}。答えは {{${h}時間${m}分${s}秒}}。`, trap: `${N}÷3600 だけで時間を出し、残りを100で割るなど、10進法の感覚で区切らない。`, back: [BACK_FROM10] },
    ],
  };
}

function ketasu(r: Rng): QuestionBody {
  const n = r.int(2, 7);
  const k = r.int(3, 5);
  const kind = r.pick(["kosu", "max", "min"] as const);
  if (kind === "kosu") {
    const ans = (n - 1) * n ** (k - 1);
    return {
      prompt: `${n}進法で表すと、ちょうど${k}けたになる自然数は何個あるか。`,
      answer: { kind: "num", answerKind: "num", answer: [String(ans)], unit: "個", calc: `${n}^${k}-${n}^${k - 1}` },
      point: `${k}けたは ${n}^${k - 1} 以上 ${n}^${k} 未満`,
      steps: [
        { title: "範囲で考える", body: `いちばん小さい ${k}けたの数は 1${"0".repeat(k - 1)}${base(n)}＝${pow(n, k - 1)}、${k + 1}けたの最小は ${pow(n, k)}。`, back: [BACK_KURAI] },
        { title: "数える", body: `${pow(n, k)}−${pow(n, k - 1)}＝${n ** k}−${n ** (k - 1)}＝{{${ans}}}（個）。最上位が ${n - 1}通り、ほかが${n}通りずつと考えても ${n - 1}×${pow(n, k - 1)} です。`, trap: "最上位の位に 0 は置けない。" },
      ],
    };
  }
  if (kind === "max") {
    const ans = n ** k - 1;
    const dg = String(n - 1).repeat(k);
    return {
      prompt: `${n}進法で表すと${k}けたになる自然数のうち、最大のものを10進法で表しなさい。`,
      answer: { kind: "num", answerKind: "num", answer: [String(ans)], calc: Array.from({ length: k }, (_, i) => `${n - 1}*${n}^${i}`).join("+") },
      point: `最大は、すべての位が ${n - 1}。次の位の1つ手前`,
      steps: [
        { title: "最大の数", body: `すべての位が ${n - 1} の ${dg}${base(n)} です。`, back: [BACK_KURAI] },
        { title: "10進法に", body: `1 をたすと 1${"0".repeat(k)}${base(n)}＝${pow(n, k)}＝${n ** k} になるので、${n ** k}−1＝{{${ans}}}。`, back: [BACK_TO10] },
      ],
    };
  }
  const ans = n ** (k - 1);
  return {
    prompt: `${n}進法で表すと${k}けたになる自然数のうち、最小のものを10進法で表しなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(ans)], calc: `${n}^${k - 1}` },
    point: `最小は 1 のあとに 0 が ${k - 1} 個`,
    steps: [
      { title: "最小の数", body: `1${"0".repeat(k - 1)}${base(n)} です。`, back: [BACK_KURAI] },
      { title: "10進法に", body: `いちばん左は ${pow(n, k - 1)} の位なので、{{${ans}}}。`, trap: `${pow(n, k)} としない。${k}けた目の位の大きさは ${pow(n, k - 1)} です。`, back: [BACK_TO10] },
    ],
  };
}

export const H_MATH_A_NSHIN_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学A",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "n進法と10進法の変換",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "to10", type: "A", difficulty: 1, points: 14, seconds: 90, skill: "知識・技能", generate: to10 },
        { id: "from10", type: "A", difficulty: 1, points: 14, seconds: 120, skill: "知識・技能", generate: from10 },
      ],
    },
    {
      title: "n進法の小数・計算・60進法",
      lead: "次の問いに答えなさい。分数は既約分数で答えなさい。",
      style: "mix",
      questions: [
        { id: "shosu", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "知識・技能", generate: shosu },
        { id: "tashizan", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "知識・技能", generate: tashizan },
        { id: "rokujuu", type: "A", difficulty: 2, points: 18, seconds: 120, skill: "思考・判断・表現", generate: rokujuu },
      ],
    },
    {
      title: "けた数と n進法",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [{ id: "ketasu", type: "A", difficulty: 3, points: 22, seconds: 180, skill: "思考・判断・表現", generate: ketasu }],
    },
  ],
};
