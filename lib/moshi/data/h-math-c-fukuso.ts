// 数学C「複素数平面」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 極形式の問題は、先に r と偏角 θ (30° の倍数など) を決めてから a＋bi を作る。絶対値は √(a²＋b²) を calc に書く。
//   ド・モアブルの定理の問題は、(a＋bi)ⁿ を二項定理で展開した実部・虚部の式を equations に書いて照合する。
//   回転は (z−w)ω＋w を成分の式で、アポロニウスの円は中心 (k²b−a)/(k²−1)、半径 k|a−b|/(k²−1) と、
//   半径²＝中心²−(k²b²−a²)/(k²−1) の両方を equations で確かめる。scripts/check-moshi.ts がシード1〜100で照合する。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-c-fukuso";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "a＋bi を点 (a, b) として平面にかく");
const S2 = L(2, "極形式は「距離」と「角度」で表す");
const S3 = L(3, "かけ算は「絶対値はかけ、偏角はたす」");
const S4 = L(4, "ド・モアブルの定理で、n 乗が一気に計算できる");
const S5 = L(5, "複素数の式で、円・直線・角をとらえる");

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
function surd(n: number): string {
  let out = 1;
  let k = n;
  for (let p = 2; p * p <= k; p++) while (k % (p * p) === 0) { k /= p * p; out *= p; }
  return k === 1 ? String(out) : `${out === 1 ? "" : out}√${k}`;
}
/** k または k√3 の表示 (ASCII の "-") */
const part = (k: number, s3: boolean) => (!s3 || k === 0 ? String(k) : k === 1 ? "√3" : k === -1 ? "-√3" : `${k}√3`);
/** a＋bi の表示 (成分は part の文字列) */
function cx(re: string, im: string): string {
  const R = re === "0" ? "" : D(re);
  if (im === "0") return R || "0";
  const neg = im.startsWith("-");
  const m = neg ? im.slice(1) : im;
  const I = `${m === "1" ? "" : m}${m.includes("√") ? " " : ""}i`;
  return R ? `${R} ${neg ? "−" : "＋"} ${I}` : `${neg ? "−" : ""}${I}`;
}
/** cos θ・sin θ を「n/2 (×√3)」の形で返す (θ は 30° の倍数) */
function trig(th: number): [[number, boolean], [number, boolean]] {
  const f = (v: number): [number, boolean] => {
    const c = v * 2;
    if (Math.abs(c - Math.round(c)) < 1e-9) return [Math.round(c), false];
    return [Math.round(c / Math.sqrt(3)), true];
  };
  const rad = (th * Math.PI) / 180;
  return [f(Math.cos(rad)), f(Math.sin(rad))];
}
/** n/2 (×√3) の表示 */
const half = (n: number, s3: boolean) => (n === 0 ? "0" : D(s3 ? `${n < 0 ? "-" : ""}${Math.abs(n) === 1 ? "" : Math.abs(n)}√3/2` : fr(n, 2)));
const ANG30 = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

function zettai(r: Rng): QuestionBody {
  const a = [r.int(-5, 5), r.int(-5, 5)];
  let d = [nz(r, -5, 5), r.int(-5, 5)];
  if (r.bool()) {
    d = [nz(r, -6, 6), nz(r, -6, 6)];
    const s2 = d[0] ** 2 + d[1] ** 2;
    return {
      prompt: `複素数 z＝${cx(String(d[0]), String(d[1]))} の絶対値 |z| を求めなさい。`,
      answer: { kind: "num", answerKind: "surd", answer: [surd(s2)], calc: `√${s2}`, labels: ["|z| ="] },
      point: "|a＋bi|＝√(a²＋b²)。原点からの距離",
      steps: [{ title: "原点からの距離", body: `z は点 (${D(d[0])}, ${D(d[1])})。|z|＝√(${pa(d[0])}²＋${pa(d[1])}²)＝√${s2}＝{{${surd(s2)}}}。`, back: [S1], trap: "b² の b は i を除いた実数。i² を入れて引き算にしない。" }],
    };
  }
  const b = [a[0] + d[0], a[1] + d[1]];
  const s2 = d[0] ** 2 + d[1] ** 2;
  return {
    prompt: `複素数平面上の2点 α＝${cx(String(a[0]), String(a[1]))}、β＝${cx(String(b[0]), String(b[1]))} の間の距離を求めなさい。`,
    answer: { kind: "num", answerKind: "surd", answer: [surd(s2)], calc: `√${s2}` },
    point: "2点間の距離は |β−α|",
    steps: [
      { title: "差をとる", body: `β−α＝${cx(String(d[0]), String(d[1]))}。`, back: [S1] },
      { title: "絶対値", body: `|β−α|＝√(${pa(d[0])}²＋${pa(d[1])}²)＝{{${surd(s2)}}}。` },
    ],
  };
}

function kyokei(r: Rng): QuestionBody {
  const th = r.pick(ANG30.filter((x) => x % 90 !== 0));
  const R = r.pick([2, 4, 6, 8, 10]);
  const [[cn, cs], [sn, ss]] = trig(th);
  const re = part((cn * R) / 2, cs);
  const im = part((sn * R) / 2, ss);
  const a2 = ((cn * R) / 2) ** 2 * (cs ? 3 : 1);
  const b2 = ((sn * R) / 2) ** 2 * (ss ? 3 : 1);
  return {
    prompt: `複素数 z＝${cx(re, im)} を極形式 z＝r(cos θ＋i sin θ) (r＞0、0°≦θ＜360°) で表すとき、r と θ を求めなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(R), String(th)], labels: ["r =", "θ ="], equations: [`x=√${a2 + b2}`, `y=${th}`] },
    point: "r＝|z|。cos θ＝a/r、sin θ＝b/r から角を決める",
    steps: [
      { title: "絶対値", body: `r＝√(${a2}＋${b2})＝{{${R}}}。`, back: [S2] },
      { title: "角", body: `cos θ＝${half(cn, cs)}、sin θ＝${half(sn, ss)}。点 (a, b) は第${re.startsWith("-") ? (im.startsWith("-") ? 3 : 2) : im.startsWith("-") ? 4 : 1}象限にあるので {{θ＝${th}°}}。`, trap: "tan θ だけで決めると、反対向きの角 (180° ずれ) とまちがえやすい。象限を確かめる。" },
    ],
  };
}

function kakezan(r: Rng): QuestionBody {
  const r1 = r.int(1, 6);
  const r2 = r.int(1, 5);
  const a = r.int(1, 23) * 15;
  const b = r.int(1, 23) * 15;
  const div = r.bool();
  const R = div ? fr(r1, r2) : String(r1 * r2);
  const th = (((div ? a - b : a + b) % 360) + 360) % 360;
  const z = (k: number, t: number) => `${k === 1 ? "" : k}(cos ${t}°＋i sin ${t}°)`;
  return {
    prompt: `z₁＝${z(r1, a)}、z₂＝${z(r2, b)} のとき、${div ? "z₁/z₂" : "z₁z₂"} を極形式 r(cos θ＋i sin θ) (r＞0、0°≦θ＜360°) で表しなさい。r と θ を答えなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [R, String(th)], labels: ["r =", "θ ="], equations: [div ? `x=${r1}/${r2}` : `x=${r1}*${r2}`, `y=${th}`] },
    point: div ? "わり算は「絶対値はわり、偏角はひく」" : "かけ算は「絶対値はかけ、偏角はたす」",
    steps: [
      { title: "絶対値", body: `r＝${r1}${div ? "÷" : "×"}${r2}＝{{${R}}}。`, back: [S3] },
      { title: "偏角", body: `${a}°${div ? "−" : "＋"}${b}°＝${div ? a - b : a + b}°。0°≦θ＜360° にそろえて {{θ＝${th}°}}。`, trap: "360° 以上や負の角になったら、360° をひく・たして範囲に入れる。" },
    ],
  };
}

const BASES: { re: string; im: string; R2: number; th: number; ns: number[] }[] = [
  { re: "1", im: "1", R2: 2, th: 45, ns: [4, 5, 6, 7, 8, 10] },
  { re: "1", im: "-1", R2: 2, th: 315, ns: [4, 5, 6, 7, 8] },
  { re: "-1", im: "1", R2: 2, th: 135, ns: [3, 4, 5, 6, 8] },
  { re: "√3", im: "1", R2: 4, th: 30, ns: [3, 6, 9] },
  { re: "1", im: "√3", R2: 4, th: 60, ns: [3, 6, 9] },
  { re: "-1", im: "√3", R2: 4, th: 120, ns: [3, 6] },
  { re: "√3", im: "-1", R2: 4, th: 330, ns: [3, 6, 9] },
  { re: "-√3", im: "1", R2: 4, th: 150, ns: [3, 6] },
];
const fact = (n: number): number => (n <= 1 ? 1 : n * fact(n - 1));
const C = (n: number, k: number) => fact(n) / (fact(k) * fact(n - k));
/** (a＋bi)ⁿ の実部・虚部を二項定理で書いた式 */
function binom(a: string, b: string, n: number): [string, string] {
  const re: string[] = [];
  const im: string[] = [];
  for (let j = 0; j <= n; j++) {
    const sg = j % 4 === 0 || j % 4 === 1 ? 1 : -1;
    const t = `${sg * C(n, j)}*(${a})^${n - j}*(${b})^${j}`;
    (j % 2 === 0 ? re : im).push(t);
  }
  return [re.join("+").replace(/\+-/g, "-"), im.join("+").replace(/\+-/g, "-")];
}
function demoivre(r: Rng): QuestionBody {
  const B = r.pick(BASES);
  const n = r.pick(B.ns);
  const Rn = Math.sqrt(B.R2) ** n;
  const ang = (B.th * n) % 360;
  const re = Math.round(Rn * Math.cos((ang * Math.PI) / 180));
  const im = Math.round(Rn * Math.sin((ang * Math.PI) / 180));
  const [eRe, eIm] = binom(B.re, B.im, n);
  const rS = B.R2 === 4 ? "2" : "√2";
  const rn = B.R2 === 4 ? String(2 ** n) : n % 2 === 0 ? String(2 ** (n / 2)) : `${2 ** ((n - 1) / 2) === 1 ? "" : 2 ** ((n - 1) / 2)}√2`;
  return {
    prompt: `(${cx(B.re, B.im)})${String(n).split("").map((c) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[Number(c)]).join("")} を計算し、a＋bi (a, b は実数) の形で表しなさい。a と b を答えなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(re), String(im)], labels: ["a =", "b ="], equations: [`a=${eRe}`, `b=${eIm}`] },
    point: "極形式にして、ド・モアブルの定理で n 乗する",
    steps: [
      { title: "極形式", body: `${cx(B.re, B.im)}＝${rS}(cos ${B.th}°＋i sin ${B.th}°)。`, back: [S2] },
      { title: "ド・モアブルの定理", body: `n 乗すると ${rn}(cos ${B.th * n}°＋i sin ${B.th * n}°)。${B.th * n}° は ${ang}° と同じ向き。`, back: [S4], trap: "絶対値も n 乗する。偏角だけ n 倍して絶対値を忘れやすい。" },
      { title: "a＋bi に直す", body: `cos ${ang}°、sin ${ang}° を入れて {{${cx(String(re), String(im))}}}。` },
    ],
  };
}

const OMEGA: { c: number; d: number; say: string }[] = [
  { c: 0, d: 1, say: "90° 回転" },
  { c: 0, d: -1, say: "−90° 回転" },
  { c: -1, d: 0, say: "180° 回転" },
  { c: 1, d: 1, say: "45° 回転して √2 倍に拡大" },
  { c: 1, d: -1, say: "−45° 回転して √2 倍に拡大" },
];
function kaiten(r: Rng): QuestionBody {
  const z = [r.int(-5, 6), r.int(-5, 6)];
  const w = r.bool() ? [0, 0] : [r.int(-3, 3), r.int(-3, 3)];
  const o = r.pick(OMEGA);
  const u = [z[0] - w[0], z[1] - w[1]];
  const x = u[0] * o.c - u[1] * o.d + w[0];
  const y = u[0] * o.d + u[1] * o.c + w[1];
  const center = w[0] === 0 && w[1] === 0 ? "原点" : `点 w＝${cx(String(w[0]), String(w[1]))} `;
  const om = cx(String(o.c), String(o.d));
  return {
    prompt: `点 z＝${cx(String(z[0]), String(z[1]))} を、${center}を中心として ${o.say}した点を a＋bi と表すとき、a と b を求めなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(x), String(y)], labels: ["a =", "b ="], equations: [`a=(${u[0]})*(${o.c})-(${u[1]})*(${o.d})+(${w[0]})`, `b=(${u[0]})*(${o.d})+(${u[1]})*(${o.c})+(${w[1]})`] },
    point: "中心 w のまわりの回転は (z−w)×ω＋w",
    steps: [
      { title: "かける数", body: `${o.say}は ${om} をかけることにあたります。`, back: [S3] },
      { title: "中心を原点に移す", body: w[0] === 0 && w[1] === 0 ? `中心が原点なので z×(${om}) を計算します。` : `z−w＝${cx(String(u[0]), String(u[1]))} にしてから回し、最後に w をたします。`, back: [S5] },
      { title: "計算", body: `(${cx(String(u[0]), String(u[1]))})(${om})${w[0] === 0 && w[1] === 0 ? "" : `＋(${cx(String(w[0]), String(w[1]))})`}＝{{${cx(String(x), String(y))}}}。`, trap: "i²＝−1 を使って実部と虚部を整理する。中心が原点でないときは、w をひいてから回し、あとで w をたす。" },
    ],
  };
}

const zm = (v: string, c: number) => (c === 0 ? v : `${v} ${c < 0 ? "＋" : "−"} ${Math.abs(c)}`);
function apo(r: Rng): QuestionBody {
  const k = r.pick([2, 3]);
  const a = r.int(-6, 6);
  let b = r.int(-6, 6);
  if (b === a) b = a + r.pick([-3, 3]);
  const k2 = k * k;
  const cN = k2 * b - a;
  const rN = k * Math.abs(a - b);
  return {
    prompt: `複素数平面上で、|${zm("z", a)}|＝${k}|${zm("z", b)}| をみたす点 z 全体は円を描く。この円の中心 (実数) と半径を求めなさい。`,
    answer: {
      kind: "num",
      answerKind: "pair",
      answer: [fr(cN, k2 - 1), fr(rN, k2 - 1)],
      labels: ["中心", "半径"],
      equations: [`x=(${k2}*(${b})-(${a}))/${k2 - 1}`, `y=${rN}/${k2 - 1}`, `y^2=x^2-(${k2}*(${b})^2-(${a})^2)/${k2 - 1}`],
    },
    point: "z＝x＋yi とおき、両辺を2乗して x, y の式にする",
    steps: [
      { title: "2乗する", body: `z＝x＋yi とおくと、${a === 0 ? "x²" : `(${zm("x", a)})²`}＋y²＝${k2}{${b === 0 ? "x²" : `(${zm("x", b)})²`}＋y²}。`, back: [S5] },
      { title: "整理する", body: `${k2 - 1}(x²＋y²)${-2 * cN < 0 ? "−" : "＋"}${Math.abs(2 * cN)}x${k2 * b * b - a * a < 0 ? "−" : "＋"}${Math.abs(k2 * b * b - a * a)}＝0。両辺を ${k2 - 1} でわって平方完成します。`, trap: "|z−α|＝k|z−β| は k＝1 のとき垂直二等分線 (直線)、k≠1 のとき円になる。" },
      { title: "中心と半径", body: `中心 {{${D(fr(cN, k2 - 1))}}}、半径 {{${fr(rN, k2 - 1)}}}。` },
    ],
  };
}

export const H_MATH_C_FUKUSO_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学C",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "絶対値と極形式",
      lead: "次の問いに答えなさい。角は度数法で答えなさい。",
      style: "calc",
      questions: [
        { id: "zettai", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: zettai },
        { id: "kyokei", type: "A", difficulty: 1, points: 14, seconds: 90, skill: "知識・技能", generate: kyokei },
        { id: "kakezan", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "知識・技能", generate: kakezan },
      ],
    },
    {
      title: "n 乗・回転・円",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "demoivre", type: "A", difficulty: 2, points: 16, seconds: 150, skill: "知識・技能", generate: demoivre },
        { id: "kaiten", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "思考・判断・表現", generate: kaiten },
        { id: "apo", type: "A", difficulty: 3, points: 24, seconds: 240, skill: "思考・判断・表現", generate: apo },
      ],
    },
  ],
};
