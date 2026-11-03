// 数学B「いろいろな数列（Σ）」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: Σ の値は公式 n(n＋1)/2、n(n＋1)(2n＋1)/6、a(rⁿ−1)/(r−1)、部分分数で消し合った式を calc に書き、
//   生成関数の中で実際に k＝1〜n を足した値と同じになるように作る。階差数列の一般項は a₁＋Σ を展開した式 (expr)。
//   scripts/check-moshi.ts がシード1〜100で calc と答えを照合する。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-b-sigma";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "Σ の読み方：k に順に数を入れて全部たす");
const S2 = L(2, "Σk：逆向きに並べて組にする");
const S3 = L(3, "覚える和の公式は4つ");
const S4 = L(4, "和・差・定数倍に分けてから公式を使う");
const S5 = L(5, "階差数列：となりの差から一般項を求める");

const D = (s: string | number) => String(s).replace(/-/g, "−");
const pa = (n: number) => (n < 0 ? `(−${-n})` : String(n));
const nz = (r: Rng, a: number, b: number) => {
  let v = 0;
  while (v === 0) v = r.int(a, b);
  return v;
};
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
const fr = (n: number, d: number) => {
  const g = gcd(n, d) * (d < 0 ? -1 : 1);
  return d / g === 1 ? String(n / g) : `${n / g}/${d / g}`;
};
function poly(ts: [number, string][], ascii = false): string {
  let out = "";
  for (const [c, m0] of ts) {
    if (c === 0) continue;
    const m = ascii ? m0.replace(/²/g, "^2") : m0;
    const a = Math.abs(c);
    const body = m && a === 1 ? m : `${a}${m}`;
    if (!out) out = (c < 0 ? (ascii ? "-" : "−") : "") + body;
    else out += ascii ? `${c < 0 ? "-" : "+"}${body}` : ` ${c < 0 ? "−" : "+"} ${body}`;
  }
  return out || "0";
}
const sum = (n: number, f: (k: number) => number) => Array.from({ length: n }, (_, i) => f(i + 1)).reduce((s, x) => s + x, 0);

function ichiji(r: Rng): QuestionBody {
  const p = nz(r, -5, 6);
  const q = r.int(-8, 8);
  const n = r.int(10, 40);
  const S = sum(n, (k) => p * k + q);
  const term = poly([[p, "k"], [q, ""]]);
  return {
    prompt: `Σ[k=1→${n}] (${term}) を計算しなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(S)], calc: `${p}*${n}*(${n}+1)/2+(${q})*${n}` },
    point: "Σ(pk＋q)＝pΣk＋qn。定数の Σ は n 倍",
    steps: [
      { title: "分ける", body: `Σ(${term})＝${D(p)}Σk＋Σ${pa(q)} と分けます。`, back: [S4] },
      { title: "公式を使う", body: `${D(p)}×${n}×${n + 1}÷2${q === 0 ? "" : `＋${pa(q)}×${n}`}＝{{${D(S)}}}。`, back: [S2, S3], trap: `定数 ${D(q)} の Σ は ${D(q)} ではなく ${D(q)}×${n}。k＝1〜${n} の ${n} 回たす。` },
    ],
  };
}

function nijo(r: Rng): QuestionBody {
  const n = r.int(6, 20);
  const c = r.pick([0, 1, -1, 2, -2, 3]);
  const S = sum(n, (k) => k * k + c * k);
  const term = poly([[1, "k²"], [c, "k"]]);
  return {
    prompt: `Σ[k=1→${n}] ${c === 0 ? "k²" : `(${term})`} を計算しなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(S)], calc: `${n}*(${n}+1)*(2*${n}+1)/6+(${c})*${n}*(${n}+1)/2` },
    point: "Σk²＝n(n＋1)(2n＋1)/6",
    steps: [
      { title: "Σk²", body: `Σk²＝${n}×${n + 1}×${2 * n + 1}÷6＝${(n * (n + 1) * (2 * n + 1)) / 6}。`, back: [S3] },
      { title: "合わせる", body: c === 0 ? `答えは {{${S}}}。` : `${D(c)}Σk＝${D(c)}×${(n * (n + 1)) / 2}＝${D((c * n * (n + 1)) / 2)}。合わせて {{${D(S)}}}。`, back: [S4], trap: "2n＋1 を n＋2 などとまちがえない。n＝1 で 1 になるか確かめると安心。" },
    ],
  };
}

function tohi(r: Rng): QuestionBody {
  const c = r.pick([1, 2, 3, 5]);
  const q = r.pick([2, 3, -2]);
  const n = Math.abs(q) === 2 ? r.int(5, 10) : r.int(4, 7);
  const S = sum(n, (k) => c * q ** (k - 1));
  const term = `${c === 1 ? "" : `${c}·`}${q < 0 ? `(−${-q})` : q}^(k−1)`;
  return {
    prompt: `Σ[k=1→${n}] ${term} を計算しなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(S)], calc: `${c}*((${q})^${n}-1)/((${q})-1)` },
    point: "Σ a·r^(k−1) は初項 a、公比 r、項数 n の等比数列の和",
    steps: [
      { title: "等比数列とみる", body: `k＝1, 2, 3 を入れると ${c}, ${D(c * q)}, ${D(c * q * q)}, …。初項 ${c}、公比 ${D(q)}、項数 ${n}。`, back: [S1] },
      { title: "等比数列の和", body: `${c}×{${pa(q)}^${n}−1}÷(${D(q)}−1)＝{{${D(S)}}}。`, back: [S3], trap: "項数は n＝" + n + "。指数の k−1 にまどわされて n−1 項としない。" },
    ],
  };
}

function seki(r: Rng): QuestionBody {
  const c = r.int(1, 4);
  const n = r.int(6, 15);
  const S = sum(n, (k) => k * (k + c));
  return {
    prompt: `Σ[k=1→${n}] k(k＋${c}) を計算しなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(S)], calc: `${n}*(${n}+1)*(2*${n}+1)/6+${c}*${n}*(${n}+1)/2` },
    point: "展開して k² と k に分けてから公式",
    steps: [
      { title: "展開して分ける", body: `k(k＋${c})＝k²＋${c === 1 ? "" : c}k なので、Σk²＋${c === 1 ? "" : c}Σk。`, back: [S4], trap: "Σ{k(k＋c)} を (Σk)(Σ(k＋c)) と、かけ算のまま分けてはいけない。" },
      { title: "公式を使う", body: `${(n * (n + 1) * (2 * n + 1)) / 6}＋${c}×${(n * (n + 1)) / 2}＝{{${S}}}。`, back: [S3] },
    ],
  };
}

function kaisa(r: Rng): QuestionBody {
  const h = nz(r, -3, 3);
  const p = 2 * h;
  const q = r.int(-4, 6);
  const a1 = r.int(-5, 8);
  const b = (k: number) => p * k + q;
  const a: number[] = [a1];
  for (let k = 1; k < 5; k++) a.push(a[k - 1] + b(k));
  // aₙ＝a1＋Σ[k=1→n−1](pk＋q)＝h n² ＋ (q−h) n ＋ (a1−q)
  const co: [number, string][] = [[h, "n²"], [q - h, "n"], [a1 - q, ""]];
  return {
    prompt: `数列 ${a.map(D).join(", ")}, … の階差数列が等差数列であるとき、もとの数列の一般項 aₙ を n の式で表しなさい。`,
    answer: { kind: "num", answerKind: "expr", answer: [poly(co, true)], labels: ["aₙ ="] },
    point: "n≧2 で aₙ＝a₁＋Σ[k=1→n−1]bₖ。n＝1 も確かめる",
    steps: [
      { title: "階差数列", body: `となりの差は ${[1, 2, 3, 4].map((k) => D(b(k))).join(", ")}, …。公差 ${D(p)} の等差数列で、{{bₖ＝${poly([[p, "k"], [q, ""]])}}}。`, back: [S5] },
      { title: "Σ でたす", body: `n≧2 のとき aₙ＝${D(a1)}＋Σ[k=1→n−1](${poly([[p, "k"], [q, ""]])})＝${D(a1)}＋${pa(p)}×(n−1)n/2＋${pa(q)}(n−1)。`, back: [S3], trap: "Σ の上は n−1。n にすると1項多い。" },
      { title: "整理と確認", body: `aₙ＝{{${poly(co)}}}。n＝1 を入れると ${D(a1)} になり、n＝1 でも成り立ちます。` },
    ],
  };
}

function bubun(r: Rng): QuestionBody {
  const kind = r.int(0, 2);
  const n = r.int(8, 30);
  if (kind === 0) {
    return {
      prompt: `Σ[k=1→${n}] 1/{k(k＋1)} を計算しなさい。`,
      answer: { kind: "num", answerKind: "num", answer: [fr(n, n + 1)], calc: `1-1/(${n}+1)` },
      point: "1/{k(k＋1)}＝1/k−1/(k＋1) と分けて消し合う",
      steps: [
        { title: "部分分数に分ける", body: "1/{k(k＋1)}＝{{1/k−1/(k＋1)}}。", back: [S4] },
        { title: "消し合う", body: `(1−1/2)＋(1/2−1/3)＋…＋(1/${n}−1/${n + 1}) で、まん中が消えて 1−1/${n + 1}＝{{${fr(n, n + 1)}}}。` },
      ],
    };
  }
  if (kind === 1) {
    return {
      prompt: `Σ[k=1→${n}] 1/{(2k−1)(2k＋1)} を計算しなさい。`,
      answer: { kind: "num", answerKind: "num", answer: [fr(n, 2 * n + 1)], calc: `(1-1/(2*${n}+1))/2` },
      point: "差が2のときは 1/2 をかけて分ける",
      steps: [
        { title: "部分分数に分ける", body: "1/{(2k−1)(2k＋1)}＝{{(1/2)·{1/(2k−1)−1/(2k＋1)}}}。", back: [S4], trap: "1/(2k−1)−1/(2k＋1) は 2/{(2k−1)(2k＋1)}。1/2 を忘れると答えが2倍になる。" },
        { title: "消し合う", body: `(1/2)(1−1/${2 * n + 1})＝{{${fr(n, 2 * n + 1)}}}。` },
      ],
    };
  }
  const v = fr(3 * n * n + 5 * n, 4 * (n + 1) * (n + 2));
  return {
    prompt: `Σ[k=1→${n}] 1/{k(k＋2)} を計算しなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [v], calc: `(1+1/2-1/(${n}+1)-1/(${n}+2))/2` },
    point: "1つおきに消えるので、はじめ2つと最後2つが残る",
    steps: [
      { title: "部分分数に分ける", body: "1/{k(k＋2)}＝{{(1/2)·{1/k−1/(k＋2)}}}。", back: [S4] },
      { title: "残る項", body: `1/3 以降は k＋2 の側で消えるので、(1/2)(1＋1/2−1/${n + 1}−1/${n + 2}) が残ります。`, trap: "となりどうしでなく1つおきに消える。残るのは前の2つと後ろの2つ。" },
      { title: "計算する", body: `答えは {{${v}}}。` },
    ],
  };
}

export const H_MATH_B_SIGMA_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学B",
  review: { status: "draft" },
  sections: [
    {
      title: "Σ の計算",
      lead: "次の和を計算しなさい。",
      style: "calc",
      questions: [
        { id: "ichiji", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: ichiji },
        { id: "nijo", type: "A", difficulty: 1, points: 14, seconds: 75, skill: "知識・技能", generate: nijo },
        { id: "tohi", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "知識・技能", generate: tohi },
      ],
    },
    {
      title: "階差数列と部分分数",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "kaisa", type: "A", difficulty: 2, points: 16, seconds: 150, skill: "思考・判断・表現", generate: kaisa },
        { id: "seki", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "知識・技能", generate: seki },
        { id: "bubun", type: "A", difficulty: 3, points: 24, seconds: 150, skill: "思考・判断・表現", generate: bubun },
      ],
    },
  ],
};
