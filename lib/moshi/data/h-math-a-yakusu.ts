// 数学A「約数と倍数」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 数は素因数の指数から作り、約数の個数 (a+1)(b+1)…・総和・最大公約数・最小公倍数・n! の素因数の個数を
// 問題の数から calc に書く。倍数判定の □ は 0〜9 を全部調べて答えが1つになる組だけを使う。
// scripts/check-moshi.ts がシード1〜100で calc と答えを照合する。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-a-yakusu";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const BACK_SOINSU = L(1, "素因数分解");
const BACK_KOSU = L(2, "約数の個数は「指数+1」のかけ算");
const BACK_GL = L(3, "最大公約数・最小公倍数");
const BACK_HANTEI = L(4, "倍数の判定");

const SUP: Record<string, string> = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };
const sup = (n: number) => [...String(n)].map((c) => SUP[c]).join("");
/** {2:3, 3:1} → "2³×3" */
const show = (f: [number, number][]) =>
  f
    .filter(([, e]) => e > 0)
    .map(([p, e]) => (e === 1 ? `${p}` : `${p}${sup(e)}`))
    .join("×");
const val = (f: [number, number][]) => f.reduce((x, [p, e]) => x * p ** e, 1);

function kosu(r: Rng): QuestionBody {
  const f: [number, number][] = [
    [2, r.int(1, 4)],
    [3, r.int(1, 3)],
    [5, r.int(0, 2)],
  ];
  const N = val(f);
  const fs = f.filter(([, e]) => e > 0);
  const ans = fs.reduce((x, [, e]) => x * (e + 1), 1);
  return {
    prompt: `${N} の正の約数は何個あるか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(ans)], unit: "個", calc: fs.map(([, e]) => `(${e}+1)`).join("*") },
    point: "素因数分解して、指数＋1 をかけ合わせる",
    steps: [
      { title: "素因数分解", body: `${N}＝{{${show(f)}}}。`, back: [BACK_SOINSU] },
      { title: "指数＋1 のかけ算", body: `約数は各素因数の指数を 0 から選んでかけた数。選び方は ${fs.map(([, e]) => `${e + 1}`).join("×")}＝{{${ans}個}}。`, trap: "指数そのものをかけない。指数 0（その素因数を使わない）も選べるので、＋1 します。", back: [BACK_KOSU] },
    ],
  };
}

function souwa(r: Rng): QuestionBody {
  const a = r.int(1, 4);
  const b = r.int(1, 3);
  const N = 2 ** a * 3 ** b;
  const s2 = 2 ** (a + 1) - 1;
  const s3 = (3 ** (b + 1) - 1) / 2;
  const t2 = Array.from({ length: a + 1 }, (_, i) => 2 ** i).join("+");
  const t3 = Array.from({ length: b + 1 }, (_, i) => 3 ** i).join("+");
  return {
    prompt: `${N} の正の約数の総和を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(s2 * s3)], calc: `(${t2})*(${t3})` },
    point: "(1＋2＋…)(1＋3＋…) を展開すると、約数が1回ずつ出る",
    steps: [
      { title: "素因数分解", body: `${N}＝{{${show([[2, a], [3, b]])}}}。`, back: [BACK_SOINSU] },
      { title: "和のかけ算", body: `(${t2.replace(/\+/g, "＋")})(${t3.replace(/\+/g, "＋")})＝${s2}×${s3}＝{{${s2 * s3}}}。展開した各項が約数1つずつです。`, back: [BACK_KOSU] },
    ],
  };
}

function gl(r: Rng): QuestionBody {
  const P = [2, 3, 5, 7];
  const fa: [number, number][] = P.map((p, i) => [p, r.int(0, i < 2 ? 3 : 1)]);
  const fb: [number, number][] = P.map((p, i) => [p, r.int(0, i < 2 ? 3 : 1)]);
  // どちらも 1 にならず、共通の素因数を少なくとも1つもつように
  if (fa[0][1] === 0 && fb[0][1] === 0) {
    fa[0][1] = 1;
    fb[0][1] = 2;
  }
  if (val(fa) === val(fb)) fb[1][1] = fb[1][1] === 0 ? 1 : 0;
  const a = val(fa);
  const b = val(fb);
  const fg: [number, number][] = P.map((p, i) => [p, Math.min(fa[i][1], fb[i][1])]);
  const fl: [number, number][] = P.map((p, i) => [p, Math.max(fa[i][1], fb[i][1])]);
  const G = val(fg);
  const Lc = val(fl);
  const askG = r.bool();
  const ans = askG ? G : Lc;
  const ex = (f: [number, number][]) => f.map(([p, e]) => `${p}^${e}`).join("*");
  return {
    prompt: `${a} と ${b} の${askG ? "最大公約数" : "最小公倍数"}を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(ans)], calc: ex(askG ? fg : fl) },
    point: askG ? "共通な素因数の、指数の小さい方をかける" : "すべての素因数の、指数の大きい方をかける",
    steps: [
      { title: "素因数分解", body: `${a}＝${show(fa) || "1"}、${b}＝${show(fb) || "1"}。`, back: [BACK_SOINSU] },
      askG
        ? { title: "指数の小さい方", body: `素因数ごとに小さい方の指数をとって、${show(fg) || "1"}＝{{${G}}}。`, trap: "片方にしかない素因数は、最大公約数には入らない。", back: [BACK_GL] }
        : { title: "指数の大きい方", body: `素因数ごとに大きい方の指数をとって、${show(fl)}＝{{${Lc}}}。`, trap: `${a}×${b} は公倍数だが、最小とはかぎらない。`, back: [BACK_GL] },
    ],
  };
}

function hantei(r: Rng): QuestionBody {
  // 4けた「x□yz」で□に入る数字が1つに決まる組をさがす
  for (let i = 0; i < 100; i++) {
    const x = r.int(1, 9);
    const y = r.int(0, 9);
    const z = r.int(0, 9);
    const m = r.pick([9, 3, 6] as const);
    const ok = Array.from({ length: 10 }, (_, d) => d).filter((d) => (1000 * x + 100 * d + 10 * y + z) % m === 0);
    if (m === 9) {
      if (ok.length !== 1) continue;
    } else if (!ok.length) continue;
    const d = m === 9 ? ok[0] : Math.max(...ok);
    const num = `${x}□${y}${z}`;
    const full = 1000 * x + 100 * d + 10 * y + z;
    const ask = m === 9 ? `が ${m} の倍数となるような□` : `が ${m} の倍数となるような□のうち、もっとも大きいもの`;
    const s = x + y + z;
    return {
      prompt: `4けたの整数 ${num} ${ask}に入る数字を求めなさい。`,
      answer: { kind: "num", answerKind: "num", answer: [String(d)], calc: `(${full}-${1000 * x + 10 * y + z})/100` },
      point: m === 9 ? "各位の数の和が9の倍数" : m === 3 ? "各位の数の和が3の倍数" : "6の倍数＝2の倍数かつ3の倍数",
      steps: [
        m === 6
          ? { title: "2の倍数か", body: `一の位が ${z}（偶数）なので2の倍数。あとは3の倍数になればよい。`, back: [BACK_HANTEI] }
          : { title: "各位の数の和", body: `${x}＋□＋${y}＋${z}＝{{${s}＋□}} が ${m} の倍数になればよい。`, back: [BACK_HANTEI] },
        m === 6
          ? { title: "各位の数の和", body: `${s}＋□ が3の倍数になる□は ${ok.join(", ")}。もっとも大きいのは {{${d}}}（${full}）。` }
          : { title: "□を決める", body: m === 9 ? `□は0〜9なので、${s}＋□ が 9 の倍数になるのは □＝{{${d}}}（${full}）。` : `${s}＋□ が3の倍数になる□は ${ok.join(", ")}。もっとも大きいのは {{${d}}}（${full}）。`, trap: m === 9 ? "3の倍数と9の倍数の条件を混同しない。" : `${ok.length > 1 ? `ほかに ${ok.filter((v) => v !== d).join(", ")} もあるが、もっとも大きいものを答える。` : "和が3の倍数かどうかで判定する。"}` },
      ],
    };
  }
  return {
    prompt: "4けたの整数 5□28 が 9 の倍数となるような□に入る数字を求めなさい。",
    answer: { kind: "num", answerKind: "num", answer: ["3"], calc: "(5328-5028)/100" },
    point: "各位の数の和が9の倍数",
    steps: [{ title: "各位の数の和", body: "5＋□＋2＋8＝15＋□ が9の倍数なので □＝{{3}}。", back: [BACK_HANTEI] }],
  };
}

function glKankei(r: Rng): QuestionBody {
  for (;;) {
    const G = r.int(2, 12);
    const m = r.int(2, 9);
    const n = r.int(2, 9);
    if (m === n) continue;
    const g = (x: number, y: number): number => (y ? g(y, x % y) : x);
    if (g(m, n) !== 1) continue;
    const a = G * m;
    const b = G * n;
    const Lc = G * m * n;
    return {
      prompt: `自然数 n と ${a} の最大公約数は ${G}、最小公倍数は ${Lc} である。n を求めなさい。`,
      answer: { kind: "num", answerKind: "num", answer: [String(b)], equations: [`${a}*x=${G}*${Lc}`] },
      point: "2数の積＝最大公約数×最小公倍数",
      steps: [
        { title: "積の関係", body: `a＝Ga′、b＝Gb′（a′, b′ は互いに素）とおくと L＝Ga′b′ なので、{{ab＝GL}}。`, back: [BACK_GL] },
        { title: "代入", body: `${a}×n＝${G}×${Lc} より、n＝${G * Lc}÷${a}＝{{${b}}}。`, trap: `${Lc}÷${G} とすると、n ではなく a′b′＝${m * n} が出てしまう。` },
      ],
    };
  }
}

function kaijo(r: Rng): QuestionBody {
  const n = r.int(20, 120);
  const zero = r.bool();
  const p = zero ? 5 : r.pick([2, 3]);
  const terms: number[] = [];
  for (let q = p; q <= n; q *= p) terms.push(Math.floor(n / q));
  const ans = terms.reduce((x, y) => x + y, 0);
  const powers = terms.map((_, i) => p ** (i + 1));
  const prompt = zero
    ? `${n}! を計算すると、末尾には 0 が連続して何個並ぶか。`
    : `${n}! を素因数分解したとき、素因数 ${p} の指数を求めなさい。`;
  return {
    prompt,
    answer: { kind: "num", answerKind: "num", answer: [String(ans)], unit: zero ? "個" : undefined, calc: terms.join("+") },
    point: zero ? "0 の個数＝素因数5の個数 (2は5より多い)" : "p の倍数、p² の倍数、… の個数をたす",
    steps: [
      ...(zero ? [{ title: "10＝2×5 の個数", body: "末尾の 0 は因数 10＝2×5 の個数。2 は 5 より多くあるので、{{素因数5の個数}}を数えればよい。", back: [BACK_SOINSU] }] : []),
      { title: `${p} の累乗の倍数を数える`, body: `1〜${n} に ${powers.map((q, i) => `${q} の倍数が ${terms[i]}個`).join("、")}。`, trap: `${p} の倍数の個数だけでは足りない。${p * p} の倍数は ${p} を2つふくむので、もう1回数えます。`, back: [BACK_HANTEI] },
      { title: "たす", body: `${terms.join("＋")}＝{{${ans}}}。` },
    ],
  };
}

export const H_MATH_A_YAKUSU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学A",
  review: { status: "draft" },
  sections: [
    {
      title: "約数と素因数分解",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "kosu", type: "A", difficulty: 1, points: 14, seconds: 90, skill: "知識・技能", generate: kosu },
        { id: "gl", type: "A", difficulty: 1, points: 14, seconds: 90, skill: "知識・技能", generate: gl },
        { id: "souwa", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "知識・技能", generate: souwa },
      ],
    },
    {
      title: "倍数の判定と最大公約数・最小公倍数の関係",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "hantei", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "思考・判断・表現", generate: hantei },
        { id: "gl-kankei", type: "A", difficulty: 2, points: 18, seconds: 150, skill: "思考・判断・表現", generate: glKankei },
        { id: "kaijo", type: "A", difficulty: 3, points: 22, seconds: 240, skill: "思考・判断・表現", generate: kaijo },
      ],
    },
  ],
};
