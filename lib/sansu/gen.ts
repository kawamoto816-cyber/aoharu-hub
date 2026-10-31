import { fAdd, fDiv, fMul, fSub, frac, gcd, type Frac } from "../math/value";
import { decStr, evalExpr, fracStr, isTerminating, mixedStr, type Field } from "./check";
import { STEPS } from "./steps";

// 小学算数の段それぞれの問題の作り方。式の問題は、答えを問題の式を読んで計算する (表示と答えが食い違わないように)。
// □・x の問題は先に答えを決めてから式を作る。数は教科書の水準で、答えが大きくなりすぎない範囲。

export interface Problem {
  /** 前置きの文 (例 "約分しましょう") */
  lead?: string;
  /** 式 (SansuText で描く)。文だけの問題は "" */
  q: string;
  fields: Field[];
  /** 入力欄の前の文字 (例 ["商", "あまり"]、["□ ="]) */
  labels?: string[];
  /** 入力欄のあとの文字 (例 ["cm²"]、["割", "分"]) */
  units?: string[];
  /** 正解の見せ方 (fields から作るものと変えたいとき) */
  show?: string[];
  /** 自己テスト用：□ に欄の答えを入れると成り立つ式 (欄ごと。a:b=c:d の比の式も可) */
  verify?: (string | null)[];
  /** 自己テスト用：あまりのあるわり算 (a÷b) */
  rem?: { a: number; b: number };
}

// ---- 乱数 ----
export type Rand = () => number;
const R = (rnd: Rand, a: number, b: number) => a + Math.floor(rnd() * (b - a + 1));
const pick = <T,>(rnd: Rand, xs: readonly T[]): T => xs[Math.floor(rnd() * xs.length)];
/** 10 の倍数でない数 (小数の問題で、小数点以下が消えないように) */
const RN10 = (rnd: Rand, a: number, b: number) => {
  for (;;) {
    const v = R(rnd, a, b);
    if (v % 10 !== 0) return v;
  }
};
/** a と互いに素な 1〜max の数 */
const coprime = (rnd: Rand, a: number, max: number) => {
  for (;;) {
    const v = R(rnd, 1, max);
    if (gcd(v, a) === 1) return v;
  }
};
const lcm = (a: number, b: number) => (a / gcd(a, b)) * b;

// ---- 欄 ----
const intF = (v: number): Field => ({ kind: "int", value: v });
const decF = (v: Frac): Field => ({ kind: "dec", value: v });
const anyF = (v: Frac, dec = false): Field => ({ kind: "frac", value: v, form: "any", reduce: true, dec });
const ds = (f: Frac) => decStr(f);
const d10 = (n: number) => frac(n, 10);
const d100 = (n: number) => frac(n, 100);
const fs = (n: number, d: number) => `${n}/${d}`;
/** 帯分数・真分数・仮分数を問題文の書き方に (仮分数は帯分数にしない) */
const ms = (w: number, n: number, d: number) => (w ? `${w}と${n}/${d}` : `${n}/${d}`);

function check(cond: boolean) {
  if (!cond) throw new Retry();
}
class Retry extends Error {}

/** 整数になる式 */
function exInt(q: string): Problem {
  const v = evalExpr(q);
  check(v.d === 1 && v.n >= 0);
  return { q, fields: [intF(v.n)], verify: [`${q}=□`] };
}
/** 小数になる式 */
function exDec(q: string): Problem {
  const v = evalExpr(q);
  check(v.n >= 0 && isTerminating(v));
  return { q, fields: [decF(v)], verify: [`${q}=□`] };
}
/** 分数になる式 (約分まで、仮分数・帯分数どちらでも) */
function exFrac(q: string, dec = false): Problem {
  const v = evalExpr(q);
  check(v.n > 0 && v.d <= 200);
  const f = anyF(v, dec);
  // 帯分数の問題は、答えも帯分数で見せる (仮分数でも正解)
  return { q, fields: [f], show: q.includes("と") ? [mixedStr(v)] : undefined, verify: [`${q}=□`] };
}
/** 分母が同じ分数の式 (約分しなくてよい)。mixed なら帯分数で答える */
function exSameDen(q: string, d: number, mode: "improper" | "mixed"): Problem {
  const v = evalExpr(q);
  check(v.n > 0);
  const N = (v.n * d) / v.d;
  const show = mode === "mixed" ? mixedStr(v, d) : N % d === 0 ? String(N / d) : fs(N, d);
  return { q, fields: [{ kind: "frac", value: v, form: mode, reduce: false }], show: [show], verify: [`${q}=□`] };
}
/** あまりのあるわり算 */
function remDiv(a: number, b: number): Problem {
  return { q: `${a}÷${b}`, fields: [intF(Math.floor(a / b)), intF(a % b)], labels: ["商", "あまり"], rem: { a, b } };
}
/** □ (または x) の値を求める式 */
function box(q: string, ans: Field, label = "□ ="): Problem {
  return { q, fields: [ans], labels: [label], verify: [q.replace("x", "□")] };
}

type Gen = (r: Rand) => Problem;

const GENS: Record<number, Gen> = {
  // ---- 小1 ----
  1: (r) => {
    const a = R(r, 1, 9);
    return exInt(`${a}+${R(r, 1, 10 - a)}`);
  },
  2: (r) => {
    const a = R(r, 2, 10);
    return exInt(`${a}-${r() < 0.1 ? a : R(r, 1, a - 1)}`);
  },
  3: (r) => {
    const a = R(r, 1, 9);
    return exInt(pick(r, [`10+${a}`, `${a}+10`, `${10 + a}-${a}`, `${10 + a}-10`]));
  },
  4: (r) => {
    const a = R(r, 2, 9);
    return exInt(`${a}+${R(r, 11 - a, 9)}`);
  },
  5: (r) => {
    const a = R(r, 11, 18);
    return exInt(`${a}-${R(r, Math.max(2, a - 9), 9)}`);
  },
  6: (r) => {
    let v = R(r, 1, 10);
    let q = String(v);
    for (let i = 0; i < 2; i++) {
      const n = R(r, 1, 9);
      if (r() < 0.5 && v + n <= 20) {
        v += n;
        q += `+${n}`;
      } else {
        check(v - n >= 0);
        v -= n;
        q += `-${n}`;
      }
    }
    return exInt(q);
  },
  7: (r) => {
    const a = R(r, 1, 9);
    const c = R(r, 1, 9);
    return exInt(
      pick(r, [
        () => `${a * 10}+${R(r, 1, 10 - a) * 10}`,
        () => `${(a + 1) * 10}-${R(r, 1, a) * 10}`,
        () => `${a * 10}+${c}`,
        () => `${a * 10 + c}-${c}`,
        () => `${a * 10 + c}+${R(r, 0, 9 - c) || 1}`,
        () => `${a * 10 + c}-${R(r, 1, c)}`,
      ])(),
    );
  },
  // ---- 小2 ----
  8: (r) => {
    const a = R(r, 10, 80);
    return exInt(r() < 0.8 ? `${a}+${R(r, 10, 99 - a)}` : `${a}+${R(r, 2, Math.min(9, 99 - a))}`);
  },
  9: (r) => {
    const a = R(r, 21, 99);
    return exInt(r() < 0.8 ? `${a}-${R(r, 10, a - 1)}` : `${a}-${R(r, 2, 9)}`);
  },
  10: (r) => {
    const a = R(r, 20, 99);
    return exInt(`${a}+${R(r, Math.max(20, 100 - a), 99)}`);
  },
  11: (r) => {
    const a = R(r, 100, 198);
    const b = R(r, Math.max(10, a - 99), 99);
    return exInt(`${a}-${b}`);
  },
  12: (r) => {
    if (r() < 0.5) {
      const a = R(r, 100, 899);
      return exInt(`${a}+${R(r, 2, Math.min(99, 999 - a))}`);
    }
    const a = R(r, 110, 999);
    return exInt(`${a}-${R(r, 2, Math.min(99, a - 100))}`);
  },
  13: (r) => exInt(`${pick(r, [2, 5])}×${R(r, 1, 9)}`),
  14: (r) => exInt(`${pick(r, [3, 4])}×${R(r, 1, 9)}`),
  15: (r) => exInt(`${pick(r, [6, 7])}×${R(r, 1, 9)}`),
  16: (r) => exInt(`${pick(r, [8, 9, 1])}×${R(r, 1, 9)}`),
  17: (r) => exInt(`${R(r, 2, 9)}×${R(r, 2, 9)}`),
  18: (r) => {
    const a = R(r, 1, 9);
    const b = R(r, 1, 9);
    const c = R(r, 11, 18);
    return exInt(
      pick(r, [
        () => `${a * 100}+${R(r, 1, 10 - a) * 100}`,
        () => `${a * 100}+${b * 100}`,
        () => `${(a + 1) * 100}-${R(r, 1, a) * 100}`,
        () => `1000-${a * 100}`,
        () => `${Math.max(a, 2) * 10}+${R(r, 11 - Math.max(a, 2), 9) * 10}`,
        () => `${c * 10}-${R(r, c - 9, 9) * 10}`,
      ])(),
    );
  },
  // ---- 小3 ----
  19: (r) => {
    const b = R(r, 2, 9);
    return exInt(`${b * R(r, 1, 9)}÷${b}`);
  },
  20: (r) => {
    const b = R(r, 2, 9);
    return remDiv(b * R(r, 1, 9) + R(r, 1, b - 1), b);
  },
  21: (r) => (r() < 0.6 ? exInt(`${R(r, 100, 999)}+${R(r, 100, 999)}`) : exInt(`${R(r, 1000, 8999)}+${R(r, 100, 999)}`)),
  22: (r) => {
    const f = pick(r, [0, 1, 2]);
    if (f === 0) {
      const a = R(r, 300, 999);
      return exInt(`${a}-${R(r, 100, a - 1)}`);
    }
    if (f === 1) {
      const a = R(r, 2, 9) * 100 + R(r, 0, 9); // 703 のように十の位が 0
      return exInt(`${a}-${R(r, 100, a - 1)}`);
    }
    return exInt(`${R(r, 1000, 9999)}-${R(r, 100, 999)}`);
  },
  23: (r) =>
    exInt(
      pick(r, [
        () => `${R(r, 1, 9) * 10}×${R(r, 2, 9)}`,
        () => `${R(r, 1, 9) * 100}×${R(r, 2, 9)}`,
        () => `${R(r, 11, 99)}×${R(r, 2, 9)}`,
        () => `${R(r, 11, 99)}×${R(r, 2, 9)}`,
      ])(),
    ),
  24: (r) => exInt(`${R(r, 101, 999)}×${R(r, 2, 9)}`),
  25: (r) => (r() < 0.15 ? exInt(`${R(r, 2, 9) * 10}×${R(r, 2, 9) * 10}`) : exInt(`${R(r, 11, 99)}×${R(r, 11, 99)}`)),
  26: (r) => exInt(`${R(r, 101, 999)}×${R(r, 11, 99)}`),
  27: (r) => {
    if (r() < 0.4) {
      const b = R(r, 2, 9);
      return exInt(`${b * R(r, 1, Math.floor(9 / b)) * 10}÷${b}`);
    }
    const b = R(r, 2, 4);
    const m = Math.floor(9 / b);
    return exInt(`${b * (10 * R(r, 1, m) + R(r, 0, m))}÷${b}`);
  },
  28: (r) => {
    const x = R(r, 10, 99);
    const a = R(r, 2, 99);
    return pick(r, [
      () => box(`□+${a}=${x + a}`, intF(x)),
      () => box(`${a}+□=${x + a}`, intF(x)),
      () => {
        const b = R(r, 2, x - 1);
        return box(`□-${b}=${x - b}`, intF(x));
      },
      () => {
        const b = R(r, x + 1, 120);
        return box(`${b}-□=${b - x}`, intF(x));
      },
    ])();
  },
  29: (r) => {
    const b = R(r, 2, 9);
    const x = R(r, 2, 9);
    return pick(r, [
      () => box(`□×${b}=${b * x}`, intF(x)),
      () => box(`${b}×□=${b * x}`, intF(x)),
      () => box(`□÷${b}=${x}`, intF(b * x)),
      () => box(`${b * x}÷□=${x}`, intF(b)),
    ])();
  },
  30: (r) => {
    const A = R(r, 1, 99);
    const B = R(r, 1, 99);
    return pick(r, [
      () => exDec(`${ds(d10(RN10(r, 1, 99)))}+${ds(d10(RN10(r, 1, 99)))}`),
      () => {
        check(A !== B && (A % 10 !== 0 || B % 10 !== 0));
        return exDec(`${ds(d10(Math.max(A, B)))}-${ds(d10(Math.min(A, B)))}`);
      },
      () => {
        const n = R(r, 1, 9);
        return exDec(`${n}-${ds(d10(RN10(r, 1, n * 10 - 1)))}`);
      },
    ])();
  },
  31: (r) => {
    const d = R(r, 3, 10);
    return pick(r, [
      () => {
        const a = R(r, 1, d - 2);
        return exSameDen(`${fs(a, d)}+${fs(R(r, 1, d - a), d)}`, d, "improper");
      },
      () => {
        const a = R(r, 2, d - 1);
        return exSameDen(`${fs(a, d)}-${fs(R(r, 1, a - 1), d)}`, d, "improper");
      },
      () => exSameDen(`1-${fs(R(r, 1, d - 1), d)}`, d, "improper"),
    ])();
  },
  // ---- 小4 ----
  32: (r) => {
    const b = R(r, 2, 9);
    return exInt(`${b * R(r, 12, Math.floor(999 / b))}÷${b}`);
  },
  33: (r) => {
    const b = R(r, 2, 9);
    const a = b * R(r, 10, Math.floor(990 / b)) + R(r, 1, b - 1);
    return remDiv(a, b);
  },
  34: (r) =>
    pick(r, [
      () => {
        const b = R(r, 2, 9) * 10;
        return exInt(`${b * R(r, 2, Math.min(9, Math.floor(990 / b)))}÷${b}`);
      },
      () => {
        const b = R(r, 11, 49);
        return exInt(`${b * R(r, 2, Math.floor(99 / b))}÷${b}`);
      },
      () => {
        const b = R(r, 12, 99);
        const q = R(r, Math.ceil(100 / b), 9);
        check(q >= 2 && q <= 9);
        return exInt(`${b * q}÷${b}`);
      },
      () => {
        const b = R(r, 12, 40);
        return exInt(`${b * R(r, 10, Math.floor(999 / b))}÷${b}`);
      },
    ])(),
  35: (r) => {
    if (r() < 0.25) {
      const k = R(r, 2, 9);
      return remDiv(k * 10 * R(r, 2, 9) + R(r, 1, k - 1) * 10, k * 10);
    }
    const b = R(r, 11, 59);
    const q = R(r, 2, Math.floor(999 / b) - 1);
    return remDiv(b * q + R(r, 1, b - 1), b);
  },
  36: (r) => {
    const n = R(r, 1000, 99999);
    const L = String(n).length;
    const PLACES: [number, string][] = [
      [10, "十"],
      [100, "百"],
      [1000, "千"],
      [10000, "一万"],
    ];
    if (r() < 0.3) {
      const p = 10 ** (L - 2);
      return { lead: "四捨五入して、上から2けたの がい数に しましょう", q: String(n), fields: [intF(Math.floor((n + p / 2) / p) * p)] };
    }
    const [p, name] = pick(
      r,
      PLACES.filter(([v]) => v * 10 <= n),
    );
    return { lead: `四捨五入して、${name}の位までの がい数に しましょう`, q: String(n), fields: [intF(Math.floor((n + p / 2) / p) * p)] };
  },
  37: (r) => {
    const a = R(r, 2, 9);
    const b = R(r, 2, 9);
    return exInt(
      pick(r, [
        () => `${R(r, 2, 50)}+${a}×${b}`,
        () => `${R(r, a * b, a * b + 50)}-${a}×${b}`,
        () => `${a}×${b}-${R(r, 1, a * b)}`,
        () => `(${R(r, 2, 20)}+${R(r, 2, 20)})×${a}`,
        () => {
          const x = R(r, 10, 30);
          return `(${x}-${R(r, 1, x - 1)})×${a}`;
        },
        () => `${a * b}÷${a}+${R(r, 1, 30)}`,
        () => {
          const t = a * R(r, 2, 12);
          const x = R(r, 1, t - 1);
          return `(${x}+${t - x})÷${a}`;
        },
        () => `${R(r, 1, 30)}+${a * b}÷${a}×${R(r, 2, 5)}`,
        () => {
          const x = R(r, 20, 99);
          const y = R(r, 1, x - 2);
          return `${x}-(${y}+${R(r, 1, x - y - 1)})`;
        },
        () => `${a * R(r, 1, 9)}×${b}÷${a}`,
      ])(),
    );
  },
  38: (r) =>
    pick(r, [
      () => exDec(`${ds(d100(RN10(r, 101, 999)))}+${ds(d10(RN10(r, 1, 99)))}`),
      () => exDec(`${ds(d100(RN10(r, 101, 999)))}+${ds(d100(RN10(r, 11, 999)))}`),
      () => {
        const A = RN10(r, 101, 999);
        const B = RN10(r, 11, A - 1);
        return exDec(`${ds(d100(A))}-${ds(d100(B))}`);
      },
      () => {
        const A = RN10(r, 11, 99);
        const B = RN10(r, 11, A * 10 - 1);
        return exDec(`${ds(d10(A))}-${ds(d100(B))}`);
      },
      () => {
        const n = R(r, 1, 9);
        return exDec(`${n}-${ds(d100(RN10(r, 1, n * 100 - 1)))}`);
      },
    ])(),
  39: (r) =>
    pick(r, [
      () => exDec(`${ds(d10(RN10(r, 2, 99)))}×${R(r, 2, 9)}`),
      () => exDec(`${ds(d100(RN10(r, 2, 299)))}×${R(r, 2, 9)}`),
      () => exDec(`${ds(d10(RN10(r, 2, 99)))}×${R(r, 11, 30)}`),
    ])(),
  40: (r) => {
    const x = r() < 0.6 ? d10(RN10(r, 2, 99)) : d100(RN10(r, 2, 299));
    const b = r() < 0.8 ? R(r, 2, 9) : R(r, 11, 20);
    const a = fMul(x, frac(b));
    check(a.d <= 100);
    return exDec(`${ds(a)}÷${b}`);
  },
  41: (r) => {
    const d = R(r, 2, 9);
    const n = R(r, d + 1, d * 5);
    const v = frac(n, d);
    return { lead: "帯分数か 整数に なおしましょう", q: fs(n, d), fields: [{ kind: "frac", value: v, form: "mixed", reduce: false }], show: [mixedStr(v, d)], verify: [`${fs(n, d)}=□`] };
  },
  42: (r) => {
    const d = R(r, 2, 9);
    const w = R(r, 1, 5);
    const n = R(r, 1, d - 1);
    const q = ms(w, n, d);
    return { lead: "仮分数に なおしましょう", q, fields: [{ kind: "frac", value: evalExpr(q), form: "improper", reduce: false }], show: [fs(w * d + n, d)], verify: [`${q}=□`] };
  },
  43: (r) => {
    const d = R(r, 3, 9);
    const a = coprime(r, d, d - 1);
    const b = coprime(r, d, d - 1);
    const w = R(r, 1, 4);
    const v = R(r, 1, 4);
    return pick(r, [
      () => exSameDen(`${ms(w, a, d)}+${ms(v, b, d)}`, d, "mixed"),
      () => exSameDen(`${fs(a, d)}+${ms(v, b, d)}`, d, "mixed"),
      () => {
        check(w * d + a !== v * d + b);
        const [hi, lo] = w * d + a > v * d + b ? [[w, a], [v, b]] : [[v, b], [w, a]];
        return exSameDen(`${ms(hi[0], hi[1], d)}-${ms(lo[0], lo[1], d)}`, d, "mixed");
      },
      () => {
        const n = R(r, 2, 6);
        return exSameDen(`${n}-${ms(R(r, 1, n - 1), b, d)}`, d, "mixed");
      },
    ])();
  },
  // ---- 小5 ----
  44: (r) =>
    pick(r, [
      () => exDec(`${ds(d10(RN10(r, 2, 99)))}×${ds(d10(RN10(r, 2, 99)))}`),
      () => exDec(`${ds(d10(RN10(r, 2, 99)))}×${ds(d10(RN10(r, 2, 9)))}`),
      () => exDec(`${ds(d100(RN10(r, 2, 299)))}×${ds(d10(RN10(r, 2, 49)))}`),
    ])(),
  45: (r) => {
    let b: Frac;
    let x: Frac;
    if (r() < 0.75) {
      b = d10(RN10(r, 2, 99));
      x = r() < 0.6 ? frac(R(r, 2, 20)) : d10(RN10(r, 2, 99));
    } else {
      b = d100(RN10(r, 2, 99));
      x = frac(R(r, 2, 30));
    }
    const a = fMul(b, x);
    check(a.d <= 100);
    return exDec(`${ds(a)}÷${ds(b)}`);
  },
  46: (r) => {
    const g = R(r, 2, 9);
    const m1 = R(r, 1, 9);
    const m2 = R(r, 2, 9);
    check(m1 !== m2 && gcd(m1, m2) === 1);
    const [a, b] = [g * Math.min(m1, m2), g * Math.max(m1, m2)];
    check(a >= 4 && b <= 72);
    if (r() < 0.5) return { lead: `${a} と ${b} の 最大公約数`, q: "", fields: [intF(g)] };
    const l = lcm(a, b);
    check(l <= 200);
    return { lead: `${a} と ${b} の 最小公倍数`, q: "", fields: [intF(l)] };
  },
  47: (r) => {
    const d = R(r, 2, 12);
    const n = coprime(r, d, d - 1);
    const k = R(r, 2, 9);
    check(n * k < 100 && d * k <= 100);
    const q = fs(n * k, d * k);
    return { lead: "約分しましょう", q, fields: [anyF(frac(n, d))], verify: [`${q}=□`] };
  },
  48: (r) => {
    const d1 = R(r, 2, 12);
    const d2 = R(r, 2, 12);
    check(d1 < d2);
    const L = lcm(d1, d2);
    check(L <= 48);
    const a = coprime(r, d1, d1 - 1);
    const b = coprime(r, d2, d2 - 1);
    const f = (n: number, d: number): Field => ({ kind: "frac", value: frac(n, d), form: "any", reduce: false, den: L });
    return { lead: "通分しましょう", q: `${fs(a, d1)} と ${fs(b, d2)}`, fields: [f(a, d1), f(b, d2)], verify: [`${fs(a, d1)}=□`, `${fs(b, d2)}=□`] };
  },
  49: (r) => {
    const d1 = R(r, 2, 10);
    const d2 = R(r, 2, 12);
    check(d1 !== d2 && lcm(d1, d2) <= 36);
    const a = coprime(r, d1, d1 - 1);
    const b = coprime(r, d2, d2 - 1);
    return r() < 0.7 ? exFrac(`${fs(a, d1)}+${fs(b, d2)}`) : exFrac(`${ms(R(r, 1, 3), a, d1)}+${fs(b, d2)}`);
  },
  50: (r) => {
    const d1 = R(r, 2, 10);
    const d2 = R(r, 2, 12);
    check(d1 !== d2 && lcm(d1, d2) <= 36);
    const a = coprime(r, d1, d1 - 1);
    const b = coprime(r, d2, d2 - 1);
    const q = pick(r, [`${fs(a, d1)}-${fs(b, d2)}`, `${ms(R(r, 1, 3), a, d1)}-${fs(b, d2)}`, `${ms(R(r, 2, 4), a, d1)}-${ms(1, b, d2)}`]);
    return exFrac(q);
  },
  51: (r) => {
    const f = pick(r, [0, 1, 2]);
    if (f === 0) {
      const d = pick(r, [2, 4, 5, 8, 10, 20, 25]);
      const n = coprime(r, d, d * 2);
      return { lead: "小数で 表しましょう", q: fs(n, d), fields: [decF(frac(n, d))], verify: [`${fs(n, d)}=□`] };
    }
    if (f === 1) {
      const x = r() < 0.5 ? d10(RN10(r, 1, 29)) : d100(RN10(r, 1, 199));
      return { lead: "分数で 表しましょう", q: ds(x), fields: [anyF(x)], verify: [`${ds(x)}=□`] };
    }
    const a = R(r, 1, 12);
    const b = R(r, 2, 12);
    check(a % b !== 0);
    return { lead: "商を 分数で 表しましょう", q: `${a}÷${b}`, fields: [anyF(frac(a, b))], verify: [`${a}÷${b}=□`] };
  },
  52: (r) => {
    const k = R(r, 1, 9);
    const m = R(r, 1, 9);
    return pick(r, [
      () => {
        const x = R(r, 1, 150);
        return { lead: "百分率で 表しましょう", q: ds(d100(x)), fields: [intF(x)], units: ["%"], verify: [`${ds(d100(x))}×100=□`] };
      },
      () => {
        const x = R(r, 1, 150);
        return { lead: "小数で 表しましょう", q: `${x}%`, fields: [decF(d100(x))], verify: [`${x}÷100=□`] };
      },
      () => ({ lead: "歩合で 表しましょう", q: ds(d100(10 * k + m)), fields: [intF(k), intF(m)], units: ["割", "分"] }),
      () => ({ lead: "小数で 表しましょう", q: `${k}割${m}分`, fields: [decF(d100(10 * k + m))], verify: [`${k}÷10+${m}÷100=□`] }),
    ])();
  },
  53: (r) => {
    const base = pick(r, [20, 40, 50, 60, 80, 120, 150, 200, 240, 300, 400, 500, 600, 800, 1000]);
    const p = pick(r, [5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 120, 150]);
    check((base * p) % 100 === 0);
    const cmp = (base * p) / 100;
    const u = pick(r, ["円", "人", "m", "g"]);
    return pick(r, [
      (): Problem => ({ lead: `${base}${u} の ${p}% は いくつですか`, q: "", fields: [intF(cmp)], units: [u], verify: [`${base}×${p}÷100=□`] }),
      (): Problem => ({ lead: `${cmp}${u} は、${base}${u} の 何% ですか`, q: "", fields: [intF(p)], units: ["%"], verify: [`${base}×□÷100=${cmp}`] }),
      (): Problem => ({ lead: `□${u} の ${p}% が ${cmp}${u} です。□に あてはまる数は いくつですか`, q: "", fields: [intF(base)], labels: ["□ ="], verify: [`□×${p}÷100=${cmp}`] }),
    ])();
  },
  54: (r) => {
    const n = R(r, 3, 5);
    const small = r() < 0.5;
    const vals = Array.from({ length: n }, () => (small ? R(r, 1, 20) : R(r, 40, 100)));
    const sum = vals.reduce((s, v) => s + v, 0);
    check((sum * 10) % n === 0);
    return { lead: `${vals.join("、")} の 平均は いくつですか`, q: "", fields: [decF(frac(sum, n))], verify: [`(${vals.join("+")})÷${n}=□`] };
  },
  55: (r) => {
    const kind = pick(r, [
      { name: "時速", u: "km", t: "時間", s: [20, 80], tt: [2, 6] },
      { name: "分速", u: "m", t: "分", s: [50, 300], tt: [5, 30] },
      { name: "秒速", u: "m", t: "秒", s: [2, 30], tt: [5, 40] },
    ]);
    const s = kind.name === "分速" ? R(r, kind.s[0] / 10, kind.s[1] / 10) * 10 : R(r, kind.s[0], kind.s[1]);
    const t = R(r, kind.tt[0], kind.tt[1]);
    const d = s * t;
    return pick(r, [
      (): Problem => ({ lead: `${kind.name} ${s}${kind.u} で ${t}${kind.t} 進むと、道のりは 何${kind.u}ですか`, q: "", fields: [intF(d)], units: [kind.u], verify: [`${s}×${t}=□`] }),
      (): Problem => ({ lead: `${d}${kind.u} を ${t}${kind.t} で 進むときの 速さは、${kind.name} 何${kind.u}ですか`, q: "", fields: [intF(s)], labels: [kind.name], units: [kind.u], verify: [`${d}÷${t}=□`] }),
      (): Problem => ({ lead: `${d}${kind.u} を ${kind.name} ${s}${kind.u} で 進むと、何${kind.t} かかりますか`, q: "", fields: [intF(t)], units: [kind.t], verify: [`${d}÷${s}=□`] }),
    ])();
  },
  // ---- 小6 ----
  56: (r) => {
    const d = R(r, 2, 12);
    const n = coprime(r, d, Math.min(d * 2, 15));
    const k = R(r, 2, 9);
    return r() < 0.5 ? exFrac(`${fs(n, d)}×${k}`) : exFrac(`${fs(n, d)}÷${k}`);
  },
  57: (r) => {
    const d1 = R(r, 2, 12);
    const d2 = R(r, 2, 12);
    const a = coprime(r, d1, Math.min(d1 * 2, 15));
    const b = coprime(r, d2, Math.min(d2 * 2, 15));
    return pick(r, [
      () => exFrac(`${fs(a, d1)}×${fs(b, d2)}`),
      () => exFrac(`${fs(a, d1)}×${fs(b, d2)}`),
      () => exFrac(`${R(r, 2, 12)}×${fs(b, d2)}`),
      () => exFrac(`${ms(R(r, 1, 2), coprime(r, d1, d1 - 1), d1)}×${fs(b, d2)}`),
    ])();
  },
  58: (r) => {
    const d1 = R(r, 2, 12);
    const d2 = R(r, 2, 12);
    const a = coprime(r, d1, Math.min(d1 * 2, 15));
    const b = coprime(r, d2, Math.min(d2 * 2, 15));
    return pick(r, [
      () => exFrac(`${fs(a, d1)}÷${fs(b, d2)}`),
      () => exFrac(`${fs(a, d1)}÷${fs(b, d2)}`),
      () => exFrac(`${R(r, 2, 12)}÷${fs(b, d2)}`),
      () => exFrac(`${ms(R(r, 1, 2), coprime(r, d1, d1 - 1), d1)}÷${fs(b, d2)}`),
    ])();
  },
  59: (r) => {
    const dec = () => ds(d10(RN10(r, 1, 29)));
    const fr = () => {
      const d = R(r, 2, 9);
      return fs(coprime(r, d, d * 2 - 1), d);
    };
    const q = pick(r, [
      () => `${dec()}×${fr()}`,
      () => `${fr()}÷${dec()}`,
      () => `${dec()}×${fr()}÷${fr()}`,
      () => `${fr()}÷${dec()}×${R(r, 2, 9)}`,
      () => `${dec()}÷${fr()}×${fr()}`,
      () => `${fr()}+${dec()}`,
      () => `${dec()}-${fr()}`,
    ])();
    const p = exFrac(q, true);
    check(p.fields[0].kind === "frac" && p.fields[0].value.d <= 60 && p.fields[0].value.n <= 200);
    return p;
  },
  60: (r) => {
    const a = R(r, 1, 12);
    const b = R(r, 1, 12);
    check(a !== b && gcd(a, b) === 1);
    const ans: Field = { kind: "ratio", a, b };
    const done = (q: string): Problem => ({ lead: "比を 簡単に しましょう", q, fields: [ans], verify: [`${q}=□`] });
    const f = pick(r, [0, 0, 1, 2]);
    if (f === 0) {
      const k = R(r, 2, 12);
      check(a * k <= 150 && b * k <= 150);
      return done(`${a * k}:${b * k}`);
    }
    if (f === 1) {
      const k = R(r, 1, 9);
      check((a * k) % 10 !== 0 || (b * k) % 10 !== 0);
      check(a * k <= 99 && b * k <= 99);
      return done(`${ds(d10(a * k))}:${ds(d10(b * k))}`);
    }
    // 分数の比 p1/q1 : p2/q2 = a : b になるように、x:y を分数で作る
    const x = frac(a, R(r, 2, 6));
    const y = fDiv(fMul(x, frac(b)), frac(a));
    check(x.d > 1 && y.d > 1 && x.d <= 12 && y.d <= 12);
    return done(`${fracStr(x)}:${fracStr(y)}`);
  },
  61: (r) => {
    const a = R(r, 1, 12);
    const b = R(r, 2, 12);
    check(a !== b);
    if (r() < 0.4) return { lead: "比の値を 求めましょう", q: `${a}:${b}`, fields: [anyF(frac(a, b), true)], verify: [`${a}÷${b}=□`] };
    check(gcd(a, b) === 1);
    const k = R(r, 2, 9);
    return pick(r, [
      () => box(`${a}:${b}=${a * k}:□`, intF(b * k)),
      () => box(`${a}:${b}=□:${b * k}`, intF(a * k)),
      () => box(`${a * k}:${b * k}=${a}:□`, intF(b)),
      () => box(`□:${b * k}=${a}:${b}`, intF(a * k)),
    ])();
  },
  62: (r) => {
    const x = r() < 0.6 ? d10(RN10(r, 2, 99)) : frac(R(r, 2, 30));
    const a = d10(RN10(r, 2, 99));
    const k = R(r, 2, 9);
    const L = "x =";
    return pick(r, [
      () => box(`x+${ds(a)}=${ds(fAdd(x, a))}`, decF(x), L),
      () => {
        const y = fSub(x, a);
        check(y.n > 0);
        return box(`x-${ds(a)}=${ds(y)}`, decF(x), L);
      },
      () => box(`x×${k}=${ds(fMul(x, frac(k)))}`, decF(x), L),
      () => box(`${k}×x=${ds(fMul(x, frac(k)))}`, decF(x), L),
      () => box(`x÷${k}=${ds(x)}`, decF(fMul(x, frac(k))), L),
    ])();
  },
  63: (r) => {
    const pi = frac(314, 100);
    return pick(r, [
      () => {
        const rr = R(r, 1, 10);
        return { lead: `半径 ${rr}cm の 円の 面積は 何cm² ですか`, q: "", fields: [decF(fMul(pi, frac(rr * rr)))], units: ["cm²"], verify: [`${rr}×${rr}×3.14=□`] };
      },
      () => {
        const rr = R(r, 1, 10);
        return { lead: `直径 ${rr * 2}cm の 円の 面積は 何cm² ですか`, q: "", fields: [decF(fMul(pi, frac(rr * rr)))], units: ["cm²"], verify: [`${rr}×${rr}×3.14=□`] };
      },
      () => {
        const rr = R(r, 2, 10);
        return { lead: `半径 ${rr}cm の 半円の 面積は 何cm² ですか`, q: "", fields: [decF(fMul(pi, frac(rr * rr, 2)))], units: ["cm²"], verify: [`${rr}×${rr}×3.14÷2=□`] };
      },
    ])();
  },
};

export function generate(step: number, rnd: Rand = Math.random): Problem {
  const g = GENS[step];
  if (!g) throw new Error(`no step ${step}`);
  for (let i = 0; i < 500; i++) {
    try {
      return g(rnd);
    } catch (e) {
      if (!(e instanceof Retry)) throw e;
    }
  }
  throw new Error(`step ${step}: could not make a problem`);
}

export function makeSet(step: number, count = 10, rnd: Rand = Math.random): Problem[] {
  const out: Problem[] = [];
  const seen = new Set<string>();
  let guard = 0;
  while (out.length < count && guard++ < 300) {
    const pr = generate(step, rnd);
    const key = `${pr.lead ?? ""}|${pr.q}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(pr);
  }
  return out;
}

/** 段の表と作り方がそろっているか (自己テスト用) */
export function missingGens(): number[] {
  return STEPS.filter((s) => !GENS[s.no]).map((s) => s.no);
}
