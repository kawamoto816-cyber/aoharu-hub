// 小4算数「分数（仮分数・帯分数）」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 分母と、分母と1以外の公約数がない分子だけを使う (約分のいらない答え)。帯分数は「整数の部分・分数の部分」の2つの欄で答え、
// equations (整数＋分数＝もとの大きさ) と calc で確かめる (scripts/check-moshi.ts がシード100個)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-4-bunsu";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_1YORI = L(1, "1より大きい分数もある");
const B_NAKAMA = L(2, "分数の3つのなかま");
const B_1 = L(3, "仮分数《かぶんすう》の中にある「1」を見つける");
const B_NAOSU = L(4, "わり算とかけ算で直す");
const B_TASU = L(5, "帯分数のたし算");

const KABUN = "仮分数《かぶんすう》";
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
function bunshi(r: Rng, d: number, lo = 1, hi = d - 1): number {
  const c: number[] = [];
  for (let n = lo; n <= hi; n++) if (gcd(n, d) === 1) c.push(n);
  return r.pick(c);
}
const TAI = ["整数の部分", "分数の部分"];

function toTai(r: Rng): QuestionBody {
  const d = r.pick([3, 4, 5, 6, 7, 8, 9]);
  const w = r.int(1, 4);
  const k = bunshi(r, d);
  const n = w * d + k;
  return {
    prompt: `${KABUN} ${n}/${d} を帯分数に直しなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(w), `${k}/${d}`], labels: TAI, calc: `(${n}-${n % d})/${d}`, equations: [`x+y=${n}/${d}`] },
    point: "分子÷分母の商が整数の部分、あまりが分子",
    steps: [
      { title: `1/${d}を${d}こずつ組にする`, body: `${n}÷${d}＝${w}あまり${k}。1が${w}つできて、1/${d}が${k}こあまります。`, back: [B_1, B_NAOSU] },
      { title: "帯分数に", body: `{{${w}と${k}/${d}}} です。`, trap: "分母はかわりません。" },
    ],
  };
}

function toKa(r: Rng): QuestionBody {
  const d = r.pick([3, 4, 5, 6, 7, 8, 9]);
  const w = r.int(1, 5);
  const k = bunshi(r, d);
  const n = w * d + k;
  return {
    prompt: `帯分数 ${w}と${k}/${d} を${KABUN}に直しなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [`${n}/${d}`], calc: `${w}+${k}/${d}` },
    point: "整数×分母＋分子 が新しい分子",
    steps: [{ title: "新しい分子", body: `${w}×${d}＋${k}＝${n}。分母はそのままで {{${n}/${d}}} です。`, trap: `${w}×${k}＋${d} のようにしないようにします。`, back: [B_NAOSU] }],
  };
}

function nakama(r: Rng): QuestionBody {
  const d = r.int(3, 9);
  const kind = r.int(0, 2);
  const n = kind === 0 ? r.int(1, d - 1) : kind === 1 ? r.int(d, 2 * d + 3) : r.int(1, d - 1);
  const w = r.int(1, 4);
  const shown = kind === 2 ? `${w}と${n}/${d}` : `${n}/${d}`;
  const opts = ["真分数", KABUN, "帯分数"];
  return {
    prompt: `${shown} は、次のどのなかまの分数ですか。`,
    answer: {
      kind: "choice",
      options: opts,
      correct: kind,
      why: [
        kind === 0 ? `分子${n}が分母${d}より小さいので、真分数です。` : "真分数は、分子が分母より小さい分数です。",
        kind === 1 ? `分子${n}が分母${d}と同じか大きいので、${KABUN}です。` : `${KABUN}は、分子が分母と同じか大きい分数です。`,
        kind === 2 ? "整数と真分数を合わせているので、帯分数です。" : "帯分数は、整数と真分数を合わせた分数です。",
      ],
    },
    point: "分子と分母をくらべる。整数がついていれば帯分数",
    steps: [{ title: "分子と分母をくらべる", body: `答えは{{${opts[kind]}}}です。`, back: [B_NAKAMA] }],
  };
}

function tasu(r: Rng): QuestionBody {
  const d = r.pick([5, 7, 8, 9]);
  let a = 0, b = 0, s = 0;
  for (let i = 0; i < 40; i++) {
    a = r.int(1, d - 1);
    b = r.int(1, d - 1);
    s = a + b - d;
    if (s > 0 && gcd(s, d) === 1) break;
  }
  if (!(s > 0 && gcd(s, d) === 1)) [a, b, s] = [d - 1, 2, 1];
  const w1 = r.int(1, 3);
  const w2 = r.int(1, 3);
  return {
    prompt: `${w1}と${a}/${d}＋${w2}と${b}/${d} を計算し、帯分数で答えなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(w1 + w2 + 1), `${s}/${d}`], labels: TAI, calc: `${w1}+${w2}+1`, equations: [`x+y=${w1}+${a}/${d}+${w2}+${b}/${d}`] },
    point: "分数の部分が1をこえたら、整数にくり上げる",
    steps: [
      { title: "整数どうし・分数どうし", body: `${w1}＋${w2}＝${w1 + w2}、${a}/${d}＋${b}/${d}＝${a + b}/${d}。`, back: [B_TASU] },
      { title: "くり上げる", body: `${a + b}/${d}＝1と${s}/${d} なので、答えは {{${w1 + w2 + 1}と${s}/${d}}}。`, trap: `${w1 + w2}と${a + b}/${d} のままにしない。帯分数の分数の部分は真分数にします。`, back: [B_1] },
    ],
  };
}

function hiku(r: Rng): QuestionBody {
  const d = r.pick([5, 7, 8, 9]);
  let a = 0, b = 0, s = 0;
  for (let i = 0; i < 40; i++) {
    a = r.int(1, d - 2);
    b = r.int(a + 1, d - 1);
    s = a + d - b;
    if (gcd(s, d) === 1) break;
  }
  if (gcd(s, d) !== 1) [a, b, s] = [1, 2, d - 1];
  const w1 = r.int(3, 5);
  const w2 = r.int(1, w1 - 2);
  const w = w1 - w2 - 1;
  return {
    prompt: `${w1}と${a}/${d}−${w2}と${b}/${d} を計算し、帯分数で答えなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(w), `${s}/${d}`], labels: TAI, calc: `${w1}-${w2}-1`, equations: [`x+y=${w1}+${a}/${d}-${w2}-${b}/${d}`] },
    point: "分数の部分がひけないときは、整数から1をくずす",
    steps: [
      { title: "1をくずす", body: `${a}/${d}から${b}/${d}はひけないので、${w1}と${a}/${d}を ${w1 - 1}と${a + d}/${d} と見ます。`, back: [B_1] },
      { title: "ひく", body: `${w1 - 1}−${w2}＝${w}、${a + d}/${d}−${b}/${d}＝${s}/${d}。答えは {{${w}と${s}/${d}}}。`, back: [B_TASU] },
    ],
  };
}

function kuraberu(r: Rng): QuestionBody {
  const d = r.pick([3, 4, 5, 6, 7, 8]);
  const w = r.int(1, 3);
  const k = r.int(1, d - 1);
  const delta = r.pick([-1, 0, 1]);
  const n = w * d + k + delta;
  const opts = [`${n}/${d}`, `${w}と${k}/${d}`, "同じ大きさ"];
  const correct = delta > 0 ? 0 : delta < 0 ? 1 : 2;
  return {
    prompt: `${n}/${d} と ${w}と${k}/${d} では、どちらが大きいですか。`,
    answer: {
      kind: "choice",
      options: opts,
      correct,
      why: [
        correct === 0 ? `${w}と${k}/${d}＝${w * d + k}/${d}。${n}/${d}のほうが大きい。` : `${w}と${k}/${d}を${KABUN}にすると${w * d + k}/${d}で、${n}/${d}は大きくありません。`,
        correct === 1 ? `${w}と${k}/${d}＝${w * d + k}/${d} で、${n}/${d}より大きい。` : `${w}と${k}/${d}＝${w * d + k}/${d} で、大きくありません。`,
        correct === 2 ? `${w}と${k}/${d}＝${w * d + k}/${d} で、同じ大きさです。` : `${w * d + k}/${d} と ${n}/${d} は分子がちがいます。`,
      ],
    },
    point: "どちらかに直して、同じ形でくらべる",
    steps: [
      { title: `${KABUN}にそろえる`, body: `${w}と${k}/${d}＝${w}×${d}＋${k}＝${w * d + k} で、${w * d + k}/${d} です。`, back: [B_NAOSU] },
      { title: "分子をくらべる", body: `分母が同じなので分子をくらべて、答えは{{${opts[correct]}}}。`, back: [B_1YORI] },
    ],
  };
}

export const E_MATH_4_BUNSU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小4",
  review: { status: "draft" },
  sections: [
    {
      title: `${KABUN}と帯分数`,
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "nakama", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: nakama },
        { id: "to-tai", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: toTai },
        { id: "to-ka", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: toKa },
        { id: "kuraberu", type: "A", difficulty: 2, points: 18, seconds: 75, skill: "思考・判断・表現", generate: kuraberu },
      ],
    },
    {
      title: "帯分数の計算",
      lead: "次の計算をしなさい。",
      style: "calc",
      questions: [
        { id: "tasu", type: "A", difficulty: 2, points: 18, seconds: 90, skill: "知識・技能", generate: tasu },
        { id: "hiku", type: "A", difficulty: 3, points: 22, seconds: 120, skill: "思考・判断・表現", generate: hiku },
      ],
    },
  ],
};
