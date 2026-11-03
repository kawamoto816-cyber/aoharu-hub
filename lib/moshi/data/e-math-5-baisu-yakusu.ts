// 小5算数「偶数と奇数・倍数と約数」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 最小公倍数・最大公約数・約数の個数はコードで数えて答えにし、calc (問題の数から答えを出す式) で検算する (scripts/check-moshi.ts がシード100個で確かめる)。
import type { NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-5-baisu-yakusu";
const L = (n: number) => `/learn/lecture/${U}#lec-s${n}`;
const BACK_GUKI = { label: "偶数《ぐうすう》と奇数《きすう》は、2でわり切れるかどうか", href: L(1) };
const BACK_BAISU = { label: "倍数と公倍数", href: L(2) };
const BACK_YAKUSU = { label: "約数は、長方形にならべて見つける", href: L(3) };
const BACK_KOYAKU = { label: "公約数と最大公約数", href: L(4) };

const num = (answer: number, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [String(answer)], calc, ...(unit ? { unit } : {}) });
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
const divisors = (n: number) => Array.from({ length: n }, (_, i) => i + 1).filter((d) => n % d === 0);

function kisu(r: Rng): QuestionBody {
  const n = r.int(21, 99);
  const odd = r.bool();
  const ans = odd ? Math.ceil(n / 2) : Math.floor(n / 2);
  const calc = odd ? (n % 2 ? `(${n}+1)/2` : `${n}/2`) : n % 2 ? `(${n}-1)/2` : `${n}/2`;
  const w = odd ? "奇数《きすう》" : "偶数《ぐうすう》";
  return {
    prompt: `1から${n}までの整数のうち、${w}は何こありますか。`,
    answer: num(ans, calc, "こ"),
    point: "偶数《ぐうすう》と奇数《きすう》は、1つおきにかわりばんこにならぶ",
    steps: [
      { title: "2つずつ組にする", body: `1と2、3と4、…と2つずつ組にすると、どの組にも${w}が1つずつ入ります。`, back: [BACK_GUKI] },
      { title: "数える", body: `${n}は${n % 2 ? "奇数《きすう》" : "偶数《ぐうすう》"}なので、${w}は {{${ans}こ}} です。`, trap: n % 2 ? `${n}÷2 はわり切れない。最後の${n}だけが組からはみ出すので、${odd ? "奇数《きすう》は1こ多く" : "偶数《ぐうすう》は1こ少なく"}なります。` : undefined },
    ],
  };
}

function lcm(r: Rng): QuestionBody {
  let a = 0;
  let b = 0;
  do {
    a = r.int(4, 18);
    b = r.int(4, 18);
  } while (a === b || a % b === 0 || b % a === 0);
  const g = gcd(a, b);
  const m = (a * b) / g;
  return {
    prompt: `${a} と ${b} の最小公倍数を求めなさい。`,
    answer: num(m, `${a}*${b}/${g}`),
    point: "大きい方の数の倍数を順に調べ、小さい方でもわり切れる数",
    steps: [
      { title: "大きい方の倍数を書く", body: `${Math.max(a, b)}の倍数 ${Math.max(a, b)}、${Math.max(a, b) * 2}、${Math.max(a, b) * 3}、… を順に、${Math.min(a, b)}でわり切れるか調べます。`, back: [BACK_BAISU] },
      { title: "いちばん小さい公倍数", body: `はじめて${Math.min(a, b)}でもわり切れるのは {{${m}}} です。`, trap: `${a}×${b}＝${a * b} がいつも最小とはかぎらない。` },
    ],
  };
}

function gcdQ(r: Rng): QuestionBody {
  const g = r.pick([2, 3, 4, 5, 6, 7, 8, 9, 12]);
  let p = 0;
  let q = 0;
  do {
    p = r.int(2, 9);
    q = r.int(2, 9);
  } while (p === q || gcd(p, q) !== 1);
  const a = g * p;
  const b = g * q;
  return {
    prompt: `${a} と ${b} の最大公約数を求めなさい。`,
    answer: num(g, `${a}/${p}`),
    point: "小さい方の約数のうち、大きい方もわり切れるいちばん大きい数",
    steps: [
      { title: "小さい方の約数", body: `${Math.min(a, b)}の約数は ${divisors(Math.min(a, b)).join("、")} です。`, back: [BACK_YAKUSU] },
      { title: "大きい方もわり切れるか", body: `このうち${Math.max(a, b)}もわり切れるいちばん大きい数は {{${g}}} です。`, back: [BACK_KOYAKU] },
    ],
  };
}

function kosu(r: Rng): QuestionBody {
  const n = r.pick([12, 16, 18, 20, 24, 28, 30, 32, 36, 40, 42, 45, 48, 50, 54, 60, 64, 72]);
  const ds = divisors(n);
  const pairs: string[] = [];
  for (const d of ds) if (d * d <= n) pairs.push(d * d === n ? `${d}×${d}` : `${d}×${n / d}`);
  return {
    prompt: `${n} の約数は、全部で何こありますか。`,
    answer: num(ds.length, `${ds.length}`, "こ"),
    point: "かけて n になる2つの数の組を、小さい方から順に",
    steps: [
      { title: "かけ算の組を見つける", body: `${pairs.join("、")}。長方形にならべる方法を全部さがすのと同じです。`, back: [BACK_YAKUSU] },
      { title: "数える", body: `約数は ${ds.join("、")} の {{${ds.length}こ}} です。`, trap: "1とその数自身もわすれずに数える。" },
    ],
  };
}

function bus(r: Rng): QuestionBody {
  let a = 0;
  let b = 0;
  do {
    a = r.pick([6, 8, 9, 10, 12, 15, 16, 18, 20]);
    b = r.pick([6, 8, 9, 10, 12, 15, 16, 18, 20]);
  } while (a >= b || b % a === 0);
  const g = gcd(a, b);
  const m = (a * b) / g;
  const h = r.int(7, 9);
  return {
    prompt: `駅から、Aのバスは${a}分ごとに、Bのバスは${b}分ごとに出発します。午前${h}時にAとBのバスが同時に出発しました。次に同時に出発するのは、何分後ですか。`,
    answer: num(m, `${a}*${b}/${g}`, "分後"),
    point: "「同時に」は、公倍数のことが多い",
    steps: [
      { title: "それぞれが出発する時間", body: `Aは ${a}、${a * 2}、${a * 3}…分後、Bは ${b}、${b * 2}、${b * 3}…分後に出発します。どちらにも出てくるのは、${a}と${b}の公倍数です。`, back: [BACK_BAISU] },
      { title: "いちばん小さい公倍数", body: `${a}と${b}の最小公倍数は {{${m}}} なので、${m}分後です。` },
    ],
  };
}

function seihokei(r: Rng): QuestionBody {
  const g = r.pick([3, 4, 5, 6, 8, 9, 10, 12]);
  let p = 0;
  let q = 0;
  do {
    p = r.int(2, 7);
    q = r.int(2, 7);
  } while (p >= q || gcd(p, q) !== 1);
  const a = g * p;
  const b = g * q;
  return {
    prompt: `たて${a}cm、横${b}cmの長方形の紙があります。この紙を、あまりが出ないように、同じ大きさのできるだけ大きい正方形に切り分けます。正方形は何まいできますか。`,
    answer: num(p * q, `(${a}/${g})*(${b}/${g})`, "まい"),
    point: "正方形の1辺は、たてと横の最大公約数",
    steps: [
      { title: "正方形の1辺", body: `1辺の長さは、${a}も${b}もわり切れる数（公約数）です。できるだけ大きいので、最大公約数の${g}cmです。`, back: [BACK_KOYAKU] },
      { title: "まい数を数える", body: `たてに ${a}÷${g}＝${p}（まい）、横に ${b}÷${g}＝${q}（まい）ならぶので、${p}×${q}＝{{${p * q}}}（まい）です。`, trap: `1辺の長さ${g}cmを答えにしない。聞かれているのはまい数です。` },
    ],
  };
}

export const E_MATH_5_BAISU_YAKUSU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小5",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "偶数《ぐうすう》と奇数《きすう》・倍数と約数",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "kisu", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: kisu },
        { id: "lcm", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: lcm },
        { id: "gcd", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: gcdQ },
      ],
    },
    {
      title: "約数の数・公倍数の文章題",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "kosu", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "知識・技能", generate: kosu },
        { id: "bus", type: "A", difficulty: 2, points: 17, seconds: 120, skill: "思考・判断・表現", generate: bus },
      ],
    },
    {
      title: "公約数の文章題",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [{ id: "seihokei", type: "A", difficulty: 3, points: 21, seconds: 180, skill: "思考・判断・表現", generate: seihokei }],
    },
  ],
};
