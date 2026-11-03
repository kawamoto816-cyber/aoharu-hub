// 数学Ⅰ「図形の計量」の単元模試 (A: 辺・角を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 面積は S＝(1/2)bc sin A を calc に書いて照合する。3辺からの面積は (a+b+c)(−a+b+c)(a−b+c)(a+b−c)＝16S² を使い、
//   解き方の cos → sin → 面積の流れと同じ値になることを生成関数の中で確かめる。空間図形は座標で三角形の面積 (1/2)√(p²q²+q²r²+r²p²) を出して照合。
//   scripts/check-moshi.ts がシード1〜100で calc と答えを照合する。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-1-keiryo";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "2辺とその間の角から面積");
const S2 = L(2, "3辺だけなら、cos → sin → 面積の順");
const S3 = L(3, "内接円の半径は、面積を3つに分けて");
const S4 = L(4, "空間図形は、平面の三角形を取り出す");
const S5 = L(5, "測量：辺と角で国土を写しとる");

// ---- 式の書き方 (表示は −・²、答えと calc は ASCII) ----
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
const D = (s: string | number) => String(s).replace(/-/g, "−");
function frac(n: number, d: number, ascii = false): string {
  if (d < 0) [n, d] = [-n, -d];
  const g = gcd(n, d) || 1;
  const s = d / g === 1 ? `${n / g}` : `${n / g}/${d / g}`;
  return ascii ? s : D(s);
}
function sq(n: number): [number, number] {
  let k = 1;
  let m = n;
  for (let i = 2; i * i <= m; i++) while (m % (i * i) === 0) { m /= i * i; k *= i; }
  return [k, m];
}
function surd(p: number, q: number, t: number, d = 1, ascii = false): string {
  const [k, m] = sq(t);
  q *= k;
  t = m;
  if (t === 1 || q === 0) { p += q * (t === 1 ? 1 : 0); q = 0; }
  if (d < 0) [p, q, d] = [-p, -q, -d];
  const g = gcd(gcd(p, q), d) || 1;
  [p, q, d] = [p / g, q / g, d / g];
  let s: string;
  if (q === 0) s = frac(p, d, true);
  else {
    const r = `${Math.abs(q) === 1 ? "" : Math.abs(q)}√${t}`;
    if (p === 0) s = `${q < 0 ? "-" : ""}${r}${d === 1 ? "" : `/${d}`}`;
    else {
      const inner = `${p}${q < 0 ? "-" : "+"}${r}`;
      s = d === 1 ? inner : `(${inner})/${d}`;
    }
  }
  return ascii ? s : D(s);
}

/** sin θ＝√m/2 の m */
const M: Record<number, number> = { 30: 1, 45: 2, 60: 3, 120: 3, 135: 2, 150: 1 };
const sinT = (th: number) => (M[th] === 1 ? "1/2" : `√${M[th]}/2`);

function menseki(r: Rng): QuestionBody {
  const A = r.pick([30, 45, 60, 120, 135, 150]);
  const b = r.int(2, 10);
  const c = r.int(2, 10);
  const S = surd(0, b * c, M[A], 4);
  return {
    prompt: `△ABC で、AB＝${c}、AC＝${b}、∠A＝${A}° のとき、△ABC の面積を求めなさい。`,
    answer: { kind: "num", answerKind: "surd", answer: [surd(0, b * c, M[A], 4, true)], calc: `(1/2)*${b}*${c}*(${sinT(A)})` },
    point: "S＝(1/2)×2辺×（間の角の sin）",
    steps: [
      { title: "公式にあてはめる", body: `S＝(1/2)×${c}×${b}×sin ${A}°。sin ${A}°＝${sinT(A)}。`, back: [S1] },
      { title: "計算する", body: `S＝{{${S}}}。`, trap: A > 90 ? `${A}° は鈍角でも sin ${A}°＝sin ${180 - A}° で正。` : "高さは AC×sin A。底辺と高さの組で考えても同じになる。" },
    ],
  };
}

/** 3辺 (3〜9 の異なる整数) で、面積が k√m (m ≦ 15) と簡単になる組。P＝(a+b+c)(−a+b+c)(a−b+c)(a+b−c)＝16S² */
const heronP = (a: number, b: number, c: number) => (a + b + c) * (-a + b + c) * (a - b + c) * (a + b - c);
const TRI: [number, number, number][] = [];
for (let a = 3; a <= 9; a++)
  for (let b = a + 1; b <= 9; b++)
    for (let c = b + 1; c < Math.min(10, a + b); c++) if (sq(heronP(a, b, c))[1] <= 15) TRI.push([a, b, c]);

function sides(r: Rng): [number, number, number, number] {
  const [a, b, c] = r.shuffle(r.pick(TRI));
  return [a, b, c, heronP(a, b, c)];
}

function naisetsu(r: Rng): QuestionBody {
  const [a, b, c, P] = sides(r);
  const S = surd(0, 1, P, 4);
  const rr = surd(0, 1, P, 2 * (a + b + c));
  return {
    prompt: `3辺の長さが ${a}、${b}、${c} の三角形の面積は ${S} である。この三角形の内接円の半径 r を求めなさい。`,
    answer: { kind: "num", answerKind: "surd", answer: [surd(0, 1, P, 2 * (a + b + c), true)], calc: `2*(√${P}/4)/(${a}+${b}+${c})` },
    point: "S＝(1/2)r(a＋b＋c)。内心で3つの三角形に分ける",
    steps: [
      { title: "面積を3つに分ける", body: `内心と3つの頂点を結ぶと、高さがどれも r の三角形が3つできる。{{S＝(1/2)r(a＋b＋c)}}。`, back: [S3] },
      { title: "r を求める", body: `${S}＝(1/2)×r×${a + b + c} より、{{r＝${rr}}}。`, trap: "a＋b＋c（周の長さ）の半分をかける。周の長さそのものをかけない。" },
    ],
  };
}

function heron(r: Rng): QuestionBody {
  const [a, b, c, P] = sides(r);
  // cos A＝(b²+c²−a²)/(2bc)、sin A＝√P/(2bc) (P＝(2bc)²−(b²+c²−a²)²)
  const n = b * b + c * c - a * a;
  if ((2 * b * c) ** 2 - n * n !== P) throw new Error("ヘロンの式と cos→sin がずれた");
  const S = surd(0, 1, P, 4);
  return {
    prompt: `△ABC で、a＝${a}、b＝${b}、c＝${c} のとき、△ABC の面積を求めなさい。`,
    answer: { kind: "num", answerKind: "surd", answer: [surd(0, 1, P, 4, true)], calc: `(1/2)*${b}*${c}*(√${P}/(2*${b}*${c}))` },
    point: "余弦定理で cos、相互関係で sin、最後に (1/2)bc sin A",
    steps: [
      { title: "cos A", body: `cos A＝(${b}² + ${c}² − ${a}²)/(2×${b}×${c})＝{{${frac(n, 2 * b * c)}}}。`, back: [S2] },
      { title: "sin A", body: `sin A＝√(1 − cos²A)＝${surd(0, 1, P, 2 * b * c)}（A は三角形の角なので sin A＞0）。` },
      { title: "面積", body: `S＝(1/2)×${b}×${c}×sin A＝{{${S}}}。`, back: [S1], trap: "cos A をそのまま面積の公式に入れない。sin A に直してから使う。" },
    ],
  };
}

function nitobun(r: Rng): QuestionBody {
  const A = r.pick([60, 90, 120]);
  const b = r.int(2, 9);
  let c = r.int(2, 9);
  if (c === b) c = b === 9 ? 3 : b + 1;
  const m = A === 60 ? 3 : A === 90 ? 2 : 1;
  const h = A / 2;
  const ans = surd(0, b * c, m, b + c);
  const sinA = A === 90 ? "1" : "√3/2";
  const sinH = h === 30 ? "1/2" : h === 45 ? "√2/2" : "√3/2";
  return {
    prompt: `△ABC で、AB＝${c}、AC＝${b}、∠A＝${A}° とする。∠A の二等分線と辺 BC の交点を D とするとき、AD の長さを求めなさい。`,
    answer: { kind: "num", answerKind: "surd", answer: [surd(0, b * c, m, b + c, true)], calc: `${b}*${c}*(${sinA})/((${b}+${c})*(${sinH}))` },
    point: "△ABC＝△ABD＋△ACD を、AD＝x として式にする",
    steps: [
      { title: "面積で式を立てる", body: `AD＝x とすると、∠BAD＝∠CAD＝${h}°。{{(1/2)×${c}×${b}×sin ${A}°＝(1/2)×${c}×x×sin ${h}° + (1/2)×${b}×x×sin ${h}°}}。`, back: [S1] },
      { title: "x について解く", body: `sin ${A}°＝${sinA}、sin ${h}°＝${sinH} を入れて整理すると、x＝{{${ans}}}。`, trap: "∠A の半分の角の sin を使う。sin A のままにしない。" },
    ],
  };
}

function sokuryo(r: Rng): QuestionBody {
  let B = 45;
  let P = 60;
  for (let i = 0; i < 40; i++) {
    B = r.pick([30, 45, 60, 120, 135]);
    P = r.pick([30, 45, 60]);
    if (B !== P && 180 - B - P >= 15) break;
  }
  if (B === P || 180 - B - P < 15) [B, P] = [45, 60];
  const A = 180 - B - P;
  const d = r.step(20, 200, 20);
  const ans = surd(0, d, M[B] * M[P], M[P]);
  return {
    prompt: `川の向こう岸にある地点 P までの距離を測るため、こちらの岸に ${d}m はなれた2地点 A、B をとり、∠PAB＝${A}°、∠PBA＝${B}° を測った。A と P の距離は何m ですか。`,
    answer: { kind: "num", answerKind: "surd", answer: [surd(0, d, M[B] * M[P], M[P], true)], unit: "m", calc: `${d}*(${sinT(B)})/(${sinT(P)})` },
    point: "残りの角 ∠APB を出して、正弦定理で AP を求める",
    steps: [
      { title: "残りの角", body: `∠APB＝180° − ${A}° − ${B}°＝{{${P}°}}。`, back: [S5] },
      { title: "正弦定理", body: `AP/sin ${B}°＝${d}/sin ${P}° なので、AP＝${d}×(${sinT(B)})÷(${sinT(P)})＝{{${ans}}}（m）。`, trap: `AP の向かいの角は ∠B（${B}°）。∠A の ${A}° を使わない。` },
    ],
  };
}

function kukan(r: Rng): QuestionBody {
  const [p, q, s] = [r.int(1, 6), r.int(1, 6), r.int(1, 6)];
  // 座標 B(p,0,0)、D(0,q,0)、E(0,0,s) で外積 BD×BE＝(qs, ps, pq) → |外積|²＝N。解き方の BD²BE²−(内積)² と calc で照合する
  const N = p * p * q * q + q * q * s * s + s * s * p * p;
  const BD = p * p + q * q;
  const BE = p * p + s * s;
  const DE = q * q + s * s;
  return {
    prompt: `AB＝${p}、AD＝${q}、AE＝${s} の直方体 ABCD-EFGH がある。△BDE の面積を求めなさい。`,
    answer: { kind: "num", answerKind: "surd", answer: [surd(0, 1, N, 2, true)], calc: `(1/2)*√${BD * BE - p ** 4}` },
    point: "面の対角線で3辺を出し、cos → sin → 面積",
    steps: [
      { title: "3辺を出す", body: `三平方の定理で BD＝${surd(0, 1, BD)}、BE＝${surd(0, 1, BE)}、DE＝${surd(0, 1, DE)}。`, back: [S4] },
      { title: "cos∠DBE", body: `余弦定理で cos∠DBE＝(${BD} + ${BE} − ${DE})/(2×BD×BE)＝${2 * p * p}/(2×${surd(0, 1, BD * BE)})。`, back: [S2] },
      { title: "sin と面積", body: `sin∠DBE＝√(1 − cos²)。S＝(1/2)×BD×BE×sin∠DBE＝(1/2)√(${BD}×${BE} − ${p ** 4})＝{{${surd(0, 1, N, 2)}}}。`, trap: "空間のまま考えず、△BDE を平面に取り出して辺の長さから計算する。" },
    ],
  };
}

export const H_MATH_1_KEIRYO_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学Ⅰ",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "三角形の面積と内接円",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "menseki", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: menseki },
        { id: "naisetsu", type: "A", difficulty: 1, points: 14, seconds: 75, skill: "知識・技能", generate: naisetsu },
      ],
    },
    {
      title: "3辺からの面積・角の二等分線・測量",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "heron", type: "A", difficulty: 2, points: 16, seconds: 180, skill: "知識・技能", generate: heron },
        { id: "nitobun", type: "A", difficulty: 2, points: 16, seconds: 150, skill: "思考・判断・表現", generate: nitobun },
        { id: "sokuryo", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "思考・判断・表現", generate: sokuryo },
      ],
    },
    {
      title: "空間図形の計量",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [{ id: "kukan", type: "A", difficulty: 3, points: 24, seconds: 240, skill: "思考・判断・表現", generate: kukan }],
    },
  ],
};
