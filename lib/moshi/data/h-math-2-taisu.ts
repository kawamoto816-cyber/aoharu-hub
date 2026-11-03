// 数学Ⅱ「対数関数」の単元模試 (A: 底・真数を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 対数の値は底と真数を同じ素数 c の累乗 cⁱ・cʲ で作り、j/i を calc に書く。和・差は真数の積が底の累乗になるように作る。
//   底の変換は (j/i)(l/k) を calc に、対数方程式は真数の積の式を equations に (もう1つの解が真数の条件で捨てられるように作る)。
//   桁数は与えた常用対数の値 (小数3桁) と本当の値で整数部分が一致する n だけを使う。log の2次方程式は2つの解を先に決める
//   (scripts/check-moshi.ts がシード1〜100で照合する)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-2-taisu";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const S1 = L(1, "logₐM は「a を何乗すると M か」");
const S2 = L(2, "積は和に、累乗は係数になる");
const S3 = L(3, "対数の方程式は、最後に真数の条件");
const S5 = L(5, "常用対数で、巨大な数の桁がわかる");

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
const D = (s: string | number) => String(s).replace(/-/g, "−");
function frac(n: number, d: number, ascii = false): string {
  if (d < 0) [n, d] = [-n, -d];
  const g = gcd(n, d) || 1;
  const s = d / g === 1 ? `${n / g}` : `${n / g}/${d / g}`;
  return ascii ? s : D(s);
}
const SUP: Record<string, string> = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹", "-": "⁻" };
const sup = (n: number) => [...String(n)].map((c) => SUP[c]).join("");
const SUB: Record<string, string> = { "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄", "5": "₅", "6": "₆", "7": "₇", "8": "₈", "9": "₉" };
const log = (b: number) => `log${[...String(b)].map((c) => SUB[c]).join("")}`;
const pv = (c: number, e: number) => (e >= 0 ? String(c ** e) : `1/${c ** -e}`);
const xm = (a: number) => (a === 0 ? "x" : `(x ${a < 0 ? "＋" : "−"} ${Math.abs(a)})`);
const tm = (a: number) => xm(a).replace("x", "t");
/** log の前の係数 (1 は書かない) */
const cl = (n: number) => (n === 1 ? "" : String(n));

function teigi(r: Rng): QuestionBody {
  const c = r.pick([2, 3, 5]);
  const maxE = c === 2 ? 6 : c === 3 ? 4 : 3;
  const i = r.int(1, c === 2 ? 3 : 2);
  let j = 0;
  while (j === 0 || j === i) j = r.int(-maxE, maxE);
  const a = c ** i;
  const M = pv(c, j);
  const ans = frac(j, i, true);
  return {
    prompt: `${log(a)}${M.includes("/") ? `(${M})` : M} の値を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [ans], calc: `${j}/${i}` },
    point: "底と真数を同じ数の累乗で表す",
    steps: [
      { title: "同じ底の累乗に", body: `${a}＝${c}${sup(i)}、${M}＝${c}${sup(j)}。`, back: [S1] },
      { title: "何乗か", body: `${a}ᵖ＝${c}${i === 1 ? "" : sup(i)}ᵖ＝${c}${sup(j)} なので ${i === 1 ? "" : i}p＝${D(j)}、p＝{{${frac(j, i)}}}。`, trap: "真数が1より小さいとき、対数は負になる。" },
    ],
  };
}

function keisan(r: Rng): QuestionBody {
  const a = r.pick([2, 3]);
  const others = a === 2 ? [3, 5, 7] : [2, 5, 7];
  const twice = r.bool(0.35);
  if (twice) {
    const m = r.pick(others);
    const i = r.int(1, 2);
    const j = r.int(0, 2);
    const X = m * a ** i;
    const Y = m * m * a ** j;
    const v = 2 * i - j;
    return {
      prompt: `次の式の値を求めなさい。\n2${log(a)}${X} − ${log(a)}${Y}`,
      answer: { kind: "num", answerKind: "num", answer: [String(v)], calc: `2*${i}-${j}` },
      point: "係数は真数の指数に、差は真数の商にまとめる",
      steps: [
        { title: "1つの log にまとめる", body: `2${log(a)}${X}＝${log(a)}${X * X}。差は商なので ${log(a)}(${X * X}÷${Y})＝${log(a)}${(X * X) / Y}。`, back: [S2] },
        { title: "値を出す", body: `${(X * X) / Y}＝${a}${sup(v)} なので {{${D(v)}}}。`, trap: "2log M を log 2M としない。2 は M の指数になる。" },
      ],
    };
  }
  const [m, n] = r.sample(others, 2);
  let i = r.int(0, 3);
  const j = r.int(0, 2);
  if (i + j === 0) i = 1;
  const X = m * a ** i;
  const Y = n * a ** j;
  const Z = m * n;
  const v = i + j;
  return {
    prompt: `次の式の値を求めなさい。\n${log(a)}${X} ＋ ${log(a)}${Y} − ${log(a)}${Z}`,
    answer: { kind: "num", answerKind: "num", answer: [String(v)], calc: `${i}+${j}` },
    point: "和は真数の積、差は真数の商にまとめる",
    steps: [
      { title: "1つの log にまとめる", body: `${log(a)}(${X}×${Y}÷${Z})＝${log(a)}${(X * Y) / Z}。`, back: [S2] },
      { title: "値を出す", body: `${(X * Y) / Z}＝${a}${sup(v)} なので {{${v}}}。`, trap: "log(M＋N) のように和の log にはまとめられない。積・商だけ。" },
    ],
  };
}

function teikan(r: Rng): QuestionBody {
  const [p, q] = r.sample([2, 3, 5], 2);
  const lim = (c: number) => (c === 2 ? 4 : c === 3 ? 3 : 2);
  const i = r.int(1, lim(p));
  const j = r.int(1, lim(q));
  const k = r.int(1, lim(q));
  const l = r.int(1, lim(p));
  const ans = frac(j * l, i * k, true);
  return {
    prompt: `次の式の値を求めなさい。\n${log(p ** i)}${q ** j} × ${log(q ** k)}${p ** l}`,
    answer: { kind: "num", answerKind: "num", answer: [ans], calc: `${j}*${l}/(${i}*${k})` },
    point: "底の変換公式で、同じ底（たとえば 10）にそろえる",
    steps: [
      { title: "底をそろえる", body: `logₐb＝log b/log a を使うと、(${cl(j)}log ${q}/${cl(i)}log ${p}) × (${cl(l)}log ${p}/${cl(k)}log ${q})。`, back: [S2] },
      { title: "約分する", body: `log ${p} と log ${q} が消えて、${j}×${l}/(${i}×${k})＝{{${frac(j * l, i * k)}}}。`, trap: "底の指数は分母に、真数の指数は分子に出る。" },
    ],
  };
}

function hoteishiki(r: Rng): QuestionBody {
  const b = r.pick([2, 3]);
  const [s, t] = r.sample(b === 2 ? [0, 1, 2, 3] : [0, 1, 2], 2);
  const a = r.int(-3, 3);
  const x0 = a + b ** s;
  const c = x0 - b ** t;
  const k = s + t;
  const x1 = a + c - x0;
  return {
    prompt: `方程式 ${log(b)}${xm(a)} ＋ ${log(b)}${xm(c)} ＝ ${k} を解きなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(x0)], labels: ["x ="], equations: [`(x-(${a}))*(x-(${c}))=${b}^${k}`] },
    point: "真数の条件を先に書き、最後に解を確かめる",
    steps: [
      { title: "真数の条件", body: `${xm(a).replace(/[()]/g, "")}＞0 かつ ${xm(c).replace(/[()]/g, "")}＞0 から、{{x＞${Math.max(a, c)}}}。`, back: [S3] },
      { title: "1つの log にまとめる", body: `${log(b)}${xm(a)}${xm(c)}＝${log(b)}${b ** k} なので、${xm(a)}${xm(c)}＝${b ** k}。これを解くと x＝${D(x0)}、${D(x1)}。` },
      { title: "条件で選ぶ", body: `x＞${Math.max(a, c)} をみたすのは {{x＝${D(x0)}}}。`, trap: `x＝${D(x1)} は真数が負になるので解ではない。` },
    ],
  };
}

const LG: { c: string; v: number; how: string }[] = [
  { c: "2", v: 0.301, how: "log₁₀2" },
  { c: "3", v: 0.477, how: "log₁₀3" },
  { c: "6", v: 0.778, how: "log₁₀2＋log₁₀3" },
  { c: "5", v: 0.699, how: "1−log₁₀2" },
  { c: "12", v: 1.079, how: "2log₁₀2＋log₁₀3" },
];

function keta(r: Rng): QuestionBody {
  const e = r.pick(LG);
  const small = r.bool(0.35) && (e.c === "2" || e.c === "3");
  let n = 20;
  let y = 0;
  for (let i = 0; i < 40; i++) {
    n = r.int(15, 60);
    y = Math.round(n * e.v * 1000) / 1000;
    const exact = n * Math.log10(Number(e.c));
    const fr = y - Math.floor(y);
    if (Math.floor(y) === Math.floor(exact) && fr > 0.03 && fr < 0.97) break;
  }
  const fl = Math.floor(y);
  const ans = fl + 1;
  const ys = y.toFixed(3);
  return {
    prompt: small
      ? `log₁₀2＝0.301、log₁₀3＝0.477 とする。(1/${e.c})${sup(n)} を小数で表すと、小数第何位に初めて 0 でない数字が現れますか。`
      : `log₁₀2＝0.301、log₁₀3＝0.477 とする。${e.c}${sup(n)} は何桁の整数ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(ans)], unit: small ? "位" : "桁", labels: small ? ["小数第"] : undefined, calc: `${fl}+1` },
    point: small ? "10⁻ᵏ⁻¹ ≦ N ＜ 10⁻ᵏ の形にはさむ" : "10ᵏ ≦ N ＜ 10ᵏ⁺¹ なら k＋1 桁",
    steps: [
      { title: "常用対数をとる", body: `${log(10)}${small ? `(1/${e.c})${sup(n)}＝−${n}×` : `${e.c}${sup(n)}＝${n}×`}${log(10)}${e.c}＝${small ? "−" : ""}${n}×${e.how === `log₁₀${e.c}` ? e.v.toFixed(3) : `(${e.how})`}＝${small ? "−" : ""}${ys}。`, back: [S5] },
      small
        ? { title: "10 の累乗ではさむ", body: `−${fl + 1}＜−${ys}＜−${fl} なので、10⁻${sup(fl + 1)} ＜ (1/${e.c})${sup(n)} ＜ 10⁻${sup(fl)}。小数第 {{${ans}}} 位に初めて 0 でない数字が現れます。`, trap: `−${ys} の整数部分を ${fl} とすると1つずれる。負の数のはさみ方に注意。` }
        : { title: "10 の累乗ではさむ", body: `${fl}＜${ys}＜${fl + 1} なので、10${sup(fl)}＜${e.c}${sup(n)}＜10${sup(fl + 1)}。{{${ans}}} 桁です。`, trap: `10${sup(fl)} は ${fl + 1} 桁の最小の数。${fl} 桁としない。` },
    ],
  };
}

function nijiho(r: Rng): QuestionBody {
  const b = r.pick([2, 3]);
  const [s, t] = r.sample(b === 2 ? [-2, -1, 0, 1, 2, 3, 4] : [-2, -1, 0, 1, 2, 3], 2).sort((x, y) => x - y);
  const sm = s + t;
  const pr = s * t;
  const v1 = pv(b, s);
  const v2 = pv(b, t);
  const X = `${log(b)}x`;
  const mid = sm === 0 ? "" : ` ${sm > 0 ? "−" : "＋"} ${Math.abs(sm) === 1 ? "" : Math.abs(sm)}${X}`;
  const cst = pr === 0 ? "" : ` ${pr < 0 ? "−" : "＋"} ${Math.abs(pr)}`;
  return {
    prompt: `方程式 (${X})²${mid}${cst} ＝ 0 を解きなさい。`,
    answer: { kind: "num", answerKind: "roots", answer: [v1, v2], labels: ["x =", "x ="], equations: [`(x-${b}^${s >= 0 ? s : 0}${s < 0 ? `/${b}^${-s}` : ""})*(x-${b}^${t >= 0 ? t : 0}${t < 0 ? `/${b}^${-t}` : ""})=0`] },
    point: "t＝logₐx とおくと、t の2次方程式",
    steps: [
      { title: "おきかえ", body: `真数の条件は x＞0。t＝${X} とおくと t² ${sm === 0 ? "" : `${sm > 0 ? "−" : "＋"} ${Math.abs(sm) === 1 ? "" : Math.abs(sm)}t`}${cst} ＝ 0。`, back: [S3] },
      { title: "t を求める", body: `${tm(s)}${tm(t)}＝0 なので、t＝${D(s)}、${D(t)}。` },
      { title: "x にもどす", body: `${X}＝${D(s)} から x＝${b}${sup(s)}＝${v1}、${X}＝${D(t)} から x＝${b}${sup(t)}＝${v2}。答えは {{x＝${v1}、${v2}}}。`, back: [S1], trap: "t の値をそのまま答えにしない。x＝aᵗ にもどす。" },
    ],
  };
}

export const H_MATH_2_TAISU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学Ⅱ",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "対数の値と計算",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "teigi", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: teigi },
        { id: "keisan", type: "A", difficulty: 1, points: 14, seconds: 75, skill: "知識・技能", generate: keisan },
      ],
    },
    {
      title: "底の変換・方程式・桁数",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "teikan", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "知識・技能", generate: teikan },
        { id: "hoteishiki", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "思考・判断・表現", generate: hoteishiki },
        { id: "keta", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "思考・判断・表現", generate: keta },
      ],
    },
    {
      title: "おきかえで解く対数方程式",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [{ id: "nijiho", type: "A", difficulty: 3, points: 24, seconds: 180, skill: "思考・判断・表現", generate: nijiho }],
    },
  ],
};
