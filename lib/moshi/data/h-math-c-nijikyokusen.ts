// 数学C「二次曲線」の単元模試 (A: 係数を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 放物線 y²＝4px の焦点 (p, 0)・準線 x＝−p、楕円 x²/a²＋y²/b²＝1 の焦点 c＝√(a²−b²)、
//   双曲線 x²/a²−y²/b²＝1 の焦点 c＝√(a²＋b²)・漸近線の傾き b/a を equations・calc に書く。
//   平行移動した式は中心 (p, q) を先に決めて展開し、中心を x 係数÷(−2×x² 係数) で確かめる。離心率は e＝c/a。
//   scripts/check-moshi.ts がシード1〜100で照合する。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-c-nijikyokusen";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "放物線：焦点と準線から等しい距離");
const S2 = L(2, "楕円：2つの焦点からの距離の和が一定");
const S3 = L(3, "双曲線：距離の差が一定。漸近線をもつ");
const S4 = L(4, "式の形で曲線を見分ける");
const S5 = L(5, "焦点の性質と離心率：戻る彗星、戻らない彗星");

const D = (s: string | number) => String(s).replace(/-/g, "−");
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
const dn = (v: string, n: number) => (n === 1 ? `${v}²` : `${v}²/${n}`);
const term = (co: number, v: string) => (co === 0 ? "" : ` ${co < 0 ? "−" : "＋"} ${Math.abs(co) === 1 ? "" : Math.abs(co)}${v}`);

function hobutsu(r: Rng): QuestionBody {
  const c = nz(r, -12, 12);
  const ySide = r.bool();
  const p = fr(c, 4);
  const mp = fr(-c, 4);
  const [v, w] = ySide ? ["y", "x"] : ["x", "y"];
  return {
    prompt: `放物線 ${v}²＝${c === 1 ? "" : c === -1 ? "−" : D(c)}${w} の焦点の座標を (${ySide ? "p, 0" : "0, p"}) と表すときの p と、準線の方程式 ${w}＝k の k を求めなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [p, mp], labels: ["p =", "k ="], equations: [`4*p=${c}`, `k=-p`] },
    point: `${v}²＝4p${w} の焦点は p、準線は ${w}＝−p`,
    steps: [
      { title: "4p の形にする", body: `${D(c)}＝4p より {{p＝${D(p)}}}。`, back: [S1] },
      { title: "焦点と準線", body: `焦点 (${ySide ? `${D(p)}, 0` : `0, ${D(p)}`})、準線 {{${w}＝${D(mp)}}}。`, trap: `${D(c)} をそのまま p にしない。4 でわる。` },
    ],
  };
}

function daen(r: Rng): QuestionBody {
  let a = r.int(2, 7);
  let b = r.int(1, 6);
  if (a === b) a += 1;
  if (a < b) [a, b] = [b, a];
  const tall = r.bool();
  const A = a * a;
  const B = b * b;
  const c2 = A - B;
  const [X, Y] = tall ? [B, A] : [A, B];
  const form = r.bool() ? `${dn("x", X)}＋${dn("y", Y)}＝1` : `${Y}x²＋${X}y²＝${X * Y}`;
  return {
    prompt: `楕円 ${form} の焦点の座標を (${tall ? "0, ±c" : "±c, 0"}) (c＞0) と表すとき、c の値を求めなさい。`,
    answer: { kind: "num", answerKind: "surd", answer: [surd(c2)], calc: `√${c2}`, labels: ["c ="] },
    point: "楕円の焦点は c＝√(大きいほう−小さいほう)",
    steps: [
      { title: "標準形にする", body: `${dn("x", X)}＋${dn("y", Y)}＝1。${tall ? "y" : "x"}² の分母のほうが大きいので、焦点は ${tall ? "y" : "x"} 軸上。`, back: [S2, S4] },
      { title: "c を求める", body: `c²＝${A}−${B}＝${c2}。{{c＝${surd(c2)}}}。`, trap: "双曲線の c²＝a²＋b² と取りちがえない。楕円はひき算。" },
    ],
  };
}

const PY: [number, number, number][] = [[3, 4, 5], [4, 3, 5], [6, 8, 10], [8, 6, 10], [5, 12, 13], [12, 5, 13], [8, 15, 17], [15, 8, 17], [1, 1, 0], [2, 1, 0], [1, 2, 0], [2, 3, 0]];
function sokyoku(r: Rng): QuestionBody {
  const [a, b, c0] = r.pick(PY);
  if (c0 === 0) {
    const c2 = a * a + b * b;
    return {
      prompt: `双曲線 ${dn("x", a * a)}−${dn("y", b * b)}＝1 の焦点の座標を (±c, 0) (c＞0) と表すとき、c の値を求めなさい。`,
      answer: { kind: "num", answerKind: "surd", answer: [surd(c2)], calc: `√${c2}`, labels: ["c ="] },
      point: "双曲線の焦点は c＝√(a²＋b²)",
      steps: [
        { title: "a² と b²", body: `a²＝${a * a}、b²＝${b * b}。`, back: [S3] },
        { title: "c を求める", body: `c²＝${a * a}＋${b * b}＝${c2}。{{c＝${surd(c2)}}}。`, trap: "楕円とちがい、双曲線はたし算。" },
      ],
    };
  }
  return {
    prompt: `双曲線 ${dn("x", a * a)}−${dn("y", b * b)}＝1 の焦点の座標を (±c, 0) (c＞0) とする。c の値と、漸近線のうち傾きが正のものの傾き m を求めなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(c0), fr(b, a)], labels: ["c =", "m ="], equations: [`c^2=${a * a}+${b * b}`, `m=${b}/${a}`] },
    point: "c²＝a²＋b²、漸近線 y＝±(b/a)x",
    steps: [
      { title: "焦点", body: `c²＝${a * a}＋${b * b}＝${c0 * c0}。{{c＝${c0}}}。`, back: [S3] },
      { title: "漸近線", body: `${dn("x", a * a)}−${dn("y", b * b)}＝0 より y＝±(${b}/${a})x。{{m＝${fr(b, a)}}}。`, trap: "傾きは b/a。a/b と逆にしない (x² の下が a²)。" },
    ],
  };
}

function teigi(r: Rng): QuestionBody {
  const c = r.int(1, 6);
  if (r.bool()) {
    const a = c + r.int(1, 4);
    return {
      prompt: `2点 F(${c}, 0)、F′(−${c}, 0) からの距離の和が ${2 * a} である点 P の軌跡は楕円である。この楕円の方程式を x²/A＋y²/B＝1 と表すとき、A、B を求めなさい。`,
      answer: { kind: "num", answerKind: "pair", answer: [String(a * a), String(a * a - c * c)], labels: ["A =", "B ="], equations: [`x=(${2 * a}/2)^2`, `y=x-${c}^2`] },
      point: "和 2a、焦点 ±c の楕円は x²/a²＋y²/(a²−c²)＝1",
      steps: [
        { title: "a を決める", body: `距離の和が 2a＝${2 * a} なので {{a＝${a}}}。`, back: [S2] },
        { title: "b² を決める", body: `b²＝a²−c²＝${a * a}−${c * c}＝${a * a - c * c}。よって {{A＝${a * a}、B＝${a * a - c * c}}}。`, trap: "距離の和 " + 2 * a + " をそのまま a にしない。和は 2a。" },
      ],
    };
  }
  const a = r.int(1, c - 1 > 0 ? c - 1 : 1);
  const cc = a >= c ? a + 1 : c;
  return {
    prompt: `2点 F(${cc}, 0)、F′(−${cc}, 0) からの距離の差が ${2 * a} である点 P の軌跡は双曲線である。この双曲線の方程式を x²/A−y²/B＝1 と表すとき、A、B を求めなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(a * a), String(cc * cc - a * a)], labels: ["A =", "B ="], equations: [`x=(${2 * a}/2)^2`, `y=${cc}^2-x`] },
    point: "差 2a、焦点 ±c の双曲線は x²/a²−y²/(c²−a²)＝1",
    steps: [
      { title: "a を決める", body: `距離の差が 2a＝${2 * a} なので {{a＝${a}}}。`, back: [S3] },
      { title: "b² を決める", body: `b²＝c²−a²＝${cc * cc}−${a * a}＝${cc * cc - a * a}。よって {{A＝${a * a}、B＝${cc * cc - a * a}}}。`, trap: "双曲線は b²＝c²−a²。楕円の a²−c² と逆。" },
    ],
  };
}

function chushin(r: Rng): QuestionBody {
  const a2 = r.pick([4, 9, 16, 25]);
  let b2 = r.pick([1, 4, 9, 16]);
  if (b2 === a2) b2 = 1;
  const p = nz(r, -4, 4);
  const q = nz(r, -4, 4);
  const hyp = r.bool();
  const sg = hyp ? -1 : 1;
  // b²(x−p)² ± a²(y−q)² ＝ a²b²
  const X2 = b2;
  const Y2 = sg * a2;
  const X1 = -2 * b2 * p;
  const Y1 = -2 * sg * a2 * q;
  const K = b2 * p * p + sg * a2 * q * q - a2 * b2;
  const eq = `${X2 === 1 ? "" : X2}x² ${Y2 < 0 ? "−" : "＋"} ${Math.abs(Y2) === 1 ? "" : Math.abs(Y2)}y²${term(X1, "x")}${term(Y1, "y")}${K === 0 ? "" : ` ${K < 0 ? "−" : "＋"} ${Math.abs(K)}`}＝0`;
  return {
    prompt: `方程式 ${eq} が表す${hyp ? "双曲線" : "楕円"}の中心の座標を求めなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(p), String(q)], labels: ["x 座標", "y 座標"], equations: [`x=(${X1})/(-2*${X2})`, `y=(${Y1})/(-2*(${Y2}))`] },
    point: "x、y それぞれ平方完成して、平行移動の量を読む",
    steps: [
      { title: "平方完成", body: `${X2 === 1 ? "" : X2}(x ${p < 0 ? "＋" : "−"} ${Math.abs(p)})² ${hyp ? "−" : "＋"} ${a2}(y ${q < 0 ? "＋" : "−"} ${Math.abs(q)})²＝${a2 * b2}。`, back: [S4] },
      { title: "標準形", body: `両辺を ${a2 * b2} でわると (x ${p < 0 ? "＋" : "−"} ${Math.abs(p)})²/${a2} ${hyp ? "−" : "＋"} ${dn(`(y ${q < 0 ? "＋" : "−"} ${Math.abs(q)})`, b2)}＝1。中心は {{(${D(p)}, ${D(q)})}}。`, trap: "(x−p)² の中心は p。かっこの中の符号のまま −p としない。" },
    ],
  };
}

function rishin(r: Rng): QuestionBody {
  const hyp = r.bool();
  const a = r.int(2, 8);
  let c = r.int(1, 9);
  if (hyp) {
    if (c <= a) c = a + r.int(1, 3);
  } else if (c >= a) {
    c = r.int(1, a - 1);
  }
  const e = fr(c, a);
  const B = hyp ? c * c - a * a : a * a - c * c;
  return {
    prompt: `焦点の1つが (${c}, 0) で、中心が原点、離心率が ${e} である${hyp ? "双曲線 x²/A−y²/B＝1" : "楕円 x²/A＋y²/B＝1"} について、A、B を求めなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(a * a), String(B)], labels: ["A =", "B ="], equations: [`x=(${c}/(${e}))^2`, hyp ? `y=${c}^2-x` : `y=x-${c}^2`] },
    point: "離心率 e＝c/a から a を求める",
    steps: [
      { title: "a を求める", body: `e＝c/a＝${e}、c＝${c} より {{a＝${a}}}。${hyp ? "e＞1 なので双曲線" : "0＜e＜1 なので楕円"}です。`, back: [S5] },
      { title: "b²", body: `b²＝${hyp ? `c²−a²＝${c * c}−${a * a}` : `a²−c²＝${a * a}−${c * c}`}＝${B}。{{A＝${a * a}、B＝${B}}}。`, back: [hyp ? S3 : S2], trap: "A は a²。a のままにしない。" },
    ],
  };
}

export const H_MATH_C_NIJIKYOKUSEN_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学C",
  review: { status: "draft" },
  sections: [
    {
      title: "放物線・楕円・双曲線の焦点",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "hobutsu", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: hobutsu },
        { id: "daen", type: "A", difficulty: 1, points: 14, seconds: 75, skill: "知識・技能", generate: daen },
        { id: "sokyoku", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "知識・技能", generate: sokyoku },
      ],
    },
    {
      title: "定義・平行移動・離心率",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "teigi", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "思考・判断・表現", generate: teigi },
        { id: "chushin", type: "A", difficulty: 2, points: 16, seconds: 150, skill: "知識・技能", generate: chushin },
        { id: "rishin", type: "A", difficulty: 3, points: 24, seconds: 150, skill: "思考・判断・表現", generate: rishin },
      ],
    },
  ],
};
