// 数学A「確率」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 確率は「あてはまる場合の数／全部の場合の数」を問題の数から calc に書き、答えは既約分数 (fr で約分)。
// さいころの場合の数は 36 通りを全部調べて数える。scripts/check-moshi.ts がシード1〜100で calc と答えを照合する。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-a-kakuritsu";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const BACK_KIHON = L(1, "同様に確からしい場合で数える");
const BACK_YO = L(2, "余事象：「少なくとも」は反対から");
const BACK_WA = L(3, "和事象：重なりをひく");
const BACK_DOKU = L(4, "独立な試行");
const BACK_HAN = L(5, "反復試行");
const BACK_KI = L(6, "期待値");

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
/** 既約分数の文字列 ("3/8"、整数なら "2") */
const fr = (n: number, d: number) => {
  const g = gcd(n, d);
  return d / g === 1 ? String(n / g) : `${n / g}/${d / g}`;
};
const fact = (n: number): number => (n <= 1 ? 1 : n * fact(n - 1));
const C = (n: number, r: number) => fact(n) / (fact(r) * fact(n - r));

const PAIRS = Array.from({ length: 36 }, (_, i) => [Math.floor(i / 6) + 1, (i % 6) + 1] as const);

function dice(r: Rng): QuestionBody {
  const kind = r.pick(["sum", "ge", "diff", "prod"] as const);
  let cond = "";
  let test: (a: number, b: number) => boolean;
  if (kind === "sum") {
    const s = r.int(3, 11);
    cond = `出る目の和が ${s} になる`;
    test = (a, b) => a + b === s;
  } else if (kind === "ge") {
    const s = r.int(8, 11);
    cond = `出る目の和が ${s} 以上になる`;
    test = (a, b) => a + b >= s;
  } else if (kind === "diff") {
    const s = r.int(1, 4);
    cond = `出る目の差が ${s} になる`;
    test = (a, b) => Math.abs(a - b) === s;
  } else {
    const m = r.pick([4, 6, 12]);
    cond = `出る目の積が ${m} の倍数になる`;
    test = (a, b) => (a * b) % m === 0;
  }
  const hits = PAIRS.filter(([a, b]) => test(a, b));
  const n = hits.length;
  const list = hits.length <= 8 ? `(大, 小) で ${hits.map(([a, b]) => `(${a}, ${b})`).join("、")} の` : "6×6 の表に○をつけて数えると";
  return {
    prompt: `大小2個のさいころを同時に投げるとき、${cond}確率を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [fr(n, 36)], calc: `${n}/36` },
    point: "大小を区別して全部で36通り。表で数える",
    steps: [
      { title: "全部の場合", body: "大の6通りそれぞれに小の6通りがあり、どれも同様に確からしいので {{36通り}}。", back: [BACK_KIHON] },
      { title: "あてはまる場合", body: `${list}{{${n}通り}}。確率は ${n}/36＝{{${fr(n, 36)}}}。`, trap: "大小を区別しないで数えると、(1, 2) と (2, 1) が1通りになり、同様に確からしくなくなります。" },
    ],
  };
}

function tama(r: Rng): QuestionBody {
  const a = r.int(3, 6);
  const b = r.int(2, 6);
  const N = a + b;
  const all = C(N, 2);
  const kind = r.pick(["aka2", "betsu"] as const);
  if (kind === "aka2") {
    const k = C(a, 2);
    return {
      prompt: `赤玉${a}個と白玉${b}個が入った袋から、同時に2個の玉を取り出す。2個とも赤玉である確率を求めなさい。`,
      answer: { kind: "num", answerKind: "num", answer: [fr(k, all)], calc: `${k}/${all}` },
      point: "同時に取り出すときは組合せで数える",
      steps: [
        { title: "全部の場合", body: `玉を1個ずつ区別すると、${N}個から2個選ぶので ${N}C2＝{{${all}}}（通り）。`, back: [BACK_KIHON] },
        { title: "2個とも赤", body: `赤${a}個から2個で ${a}C2＝${k}（通り）。確率は ${k}/${all}＝{{${fr(k, all)}}}。` },
      ],
    };
  }
  const k = a * b;
  return {
    prompt: `赤玉${a}個と白玉${b}個が入った袋から、同時に2個の玉を取り出す。赤玉と白玉が1個ずつである確率を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [fr(k, all)], calc: `${a}*${b}/${all}` },
    point: "赤の選び方×白の選び方。全体は組合せ",
    steps: [
      { title: "全部の場合", body: `${N}個から2個選ぶので ${N}C2＝{{${all}}}（通り）。`, back: [BACK_KIHON] },
      { title: "赤1個・白1個", body: `赤の選び方${a}通りそれぞれに白${b}通りで ${a}×${b}＝${k}（通り）。確率は ${k}/${all}＝{{${fr(k, all)}}}。`, trap: "分母を順列 (並べる) で、分子を組合せで数えるなど、数え方をそろえないとずれる。" },
    ],
  };
}

function yoji(r: Rng): QuestionBody {
  if (r.bool()) {
    const n = r.int(2, 4);
    const eye = r.int(1, 6);
    const no = 5 ** n;
    const all = 6 ** n;
    return {
      prompt: `1個のさいころを${n}回投げるとき、${eye}の目が少なくとも1回出る確率を求めなさい。`,
      answer: { kind: "num", answerKind: "num", answer: [fr(all - no, all)], calc: `1-(5/6)^${n}` },
      point: "「少なくとも1回」は、1−（1回も出ない確率）",
      steps: [
        { title: "余事象を考える", body: `余事象は「${n}回とも${eye}以外が出る」。各回 5/6 で独立なので (5/6)^${n}＝${no}/${all}。`, back: [BACK_YO, BACK_DOKU] },
        { title: "1からひく", body: `1−${no}/${all}＝{{${fr(all - no, all)}}}。`, trap: `1/6×${n} とたしてはいけない。2回以上出る場合を重ねて数えます。` },
      ],
    };
  }
  const a = r.int(2, 5);
  const b = r.int(3, 6);
  const k = 3;
  const N = a + b;
  const all = C(N, k);
  const no = C(b, k);
  return {
    prompt: `当たりくじ${a}本、はずれくじ${b}本の合計${N}本から、同時に3本を引く。少なくとも1本当たる確率を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [fr(all - no, all)], calc: `1-${no}/${all}` },
    point: "「少なくとも1本」は、全部はずれの反対",
    steps: [
      { title: "全部はずれの確率", body: `${N}C3＝${all}（通り）のうち、3本ともはずれは ${b}C3＝${no}（通り）。確率は ${fr(no, all)}。`, back: [BACK_YO] },
      { title: "1からひく", body: `1−${fr(no, all)}＝{{${fr(all - no, all)}}}。`, trap: "1本当たり・2本当たり・3本当たりを全部数えるのは手間がかかり、数え落としやすい。" },
    ],
  };
}

const PQ: [number, number][] = [
  [2, 3],
  [3, 5],
  [2, 5],
  [4, 6],
  [3, 4],
  [4, 10],
  [6, 9],
];
const lcm = (a: number, b: number) => (a * b) / gcd(a, b);
function wajisho(r: Rng): QuestionBody {
  const N = r.step(30, 100, 10);
  const [p, q] = r.pick(PQ);
  const l = lcm(p, q);
  const np = Math.floor(N / p);
  const nq = Math.floor(N / q);
  const nl = Math.floor(N / l);
  const k = np + nq - nl;
  return {
    prompt: `1 から ${N} までの整数が1つずつ書かれた ${N} 枚のカードから1枚引く。引いたカードの数が ${p} の倍数または ${q} の倍数である確率を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [fr(k, N)], calc: `(${np}+${nq}-${nl})/${N}` },
    point: "P(A∪B)＝P(A)＋P(B)−P(A∩B)。重なりは最小公倍数",
    steps: [
      { title: "それぞれの個数", body: `${p}の倍数は ${np}個、${q}の倍数は ${nq}個。`, back: [BACK_WA] },
      { title: "重なりをひく", body: `両方の倍数は ${l}（最小公倍数）の倍数で ${nl}個。${np}＋${nq}−${nl}＝${k}（個）なので、確率は {{${fr(k, N)}}}。`, trap: `${p}×${q}＝${p * q} の倍数を重なりとしない。重なりは最小公倍数 ${l} の倍数です。` },
    ],
  };
}

const EVENTS: [string, number, number][] = [
  ["1の目", 1, 6],
  ["3の倍数の目", 1, 3],
  ["偶数の目", 1, 2],
  ["5以上の目", 1, 3],
  ["4以下の目", 2, 3],
];
function hanpuku(r: Rng): QuestionBody {
  const [ev, pa, pb] = r.pick(EVENTS);
  const n = r.int(3, 5);
  const k = r.int(1, n - 1);
  const qa = pb - pa;
  const c = C(n, k);
  const num = c * pa ** k * qa ** (n - k);
  const den = pb ** n;
  return {
    prompt: `1個のさいころを${n}回投げるとき、${ev}がちょうど${k}回出る確率を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [fr(num, den)], calc: `${c}*(${pa}/${pb})^${k}*(${qa}/${pb})^${n - k}` },
    point: "nCr pʳ(1−p)ⁿ⁻ʳ。nCr は「どの回に出るか」",
    steps: [
      { title: "1回の確率", body: `${ev}が出る確率は ${fr(pa, pb)}、出ない確率は ${fr(qa, pb)}。`, back: [BACK_HAN] },
      { title: "どの回に出るか", body: `${n}回のうち出る${k}回の選び方は ${n}C${k}＝{{${c}}}（通り）。`, trap: `${n}C${k} をかけ忘れると、「最初の${k}回に出る」場合だけになります。` },
      { title: "かけ合わせる", body: `${c}×(${fr(pa, pb)})^${k}×(${fr(qa, pb)})^${n - k}＝{{${fr(num, den)}}}。` },
    ],
  };
}

function kitaichi(r: Rng): QuestionBody {
  const a = r.int(2, 5);
  const b = r.int(2, 5);
  const x = r.step(10, 100, 10);
  const N = a + b;
  const all = C(N, 2);
  const p0 = C(b, 2);
  const p1 = a * b;
  const p2 = C(a, 2);
  const num = (p1 + 2 * p2) * x;
  return {
    prompt: `赤玉${a}個と白玉${b}個が入った袋から、同時に2個の玉を取り出し、取り出した赤玉1個につき ${x} 点もらえるゲームをする。もらえる点数の期待値を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [fr(num, all)], unit: "点", calc: `(0*${p0}+${x}*${p1}+${2 * x}*${p2})/${all}` },
    point: "とりうる値ごとの確率を出し、値×確率をたす",
    steps: [
      { title: "とりうる値と確率", body: `全部で ${N}C2＝${all}通り。赤0個（0点）${p0}通り、赤1個（${x}点）${p1}通り、赤2個（${2 * x}点）${p2}通り。`, back: [BACK_KIHON] },
      { title: "値×確率をたす", body: `0×${p0}/${all}＋${x}×${p1}/${all}＋${2 * x}×${p2}/${all}＝${num}/${all}＝{{${fr(num, all)}}}（点）。`, trap: "確率の合計が1になるか（3つの通り数の和が全部の数か）を確かめると、数え落としに気づけます。", back: [BACK_KI] },
    ],
  };
}

export const H_MATH_A_KAKURITSU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学A",
  review: { status: "draft" },
  sections: [
    {
      title: "確率の基本",
      lead: "次の問いに答えなさい。答えが分数のときは既約分数で答えなさい。",
      style: "calc",
      questions: [
        { id: "dice", type: "A", difficulty: 1, points: 14, seconds: 90, skill: "知識・技能", generate: dice },
        { id: "tama", type: "A", difficulty: 1, points: 14, seconds: 90, skill: "知識・技能", generate: tama },
      ],
    },
    {
      title: "余事象・和事象・反復試行",
      lead: "次の問いに答えなさい。答えが分数のときは既約分数で答えなさい。",
      style: "mix",
      questions: [
        { id: "yoji", type: "A", difficulty: 2, points: 16, seconds: 150, skill: "思考・判断・表現", generate: yoji },
        { id: "wajisho", type: "A", difficulty: 2, points: 16, seconds: 150, skill: "知識・技能", generate: wajisho },
        { id: "hanpuku", type: "A", difficulty: 2, points: 18, seconds: 150, skill: "知識・技能", generate: hanpuku },
      ],
    },
    {
      title: "期待値",
      lead: "次の問いに答えなさい。答えが分数のときは既約分数で答えなさい。",
      style: "word",
      questions: [{ id: "kitaichi", type: "A", difficulty: 3, points: 22, seconds: 240, skill: "思考・判断・表現", generate: kitaichi }],
    },
  ],
};
