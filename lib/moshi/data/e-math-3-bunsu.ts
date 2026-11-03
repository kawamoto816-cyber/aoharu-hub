// 小3算数「分数」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 分母・分子は答えが約分のいらない分数 (分母と分子が1以外の数でわれない) になる組だけを使い、calc で答えを確かめる (scripts/check-moshi.ts がシード100個)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-3-bunsu";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_TOUBUN = L(1, "1mを3等分した1こ分は1/3m");
const B_BUNBO = L(2, "分母と分子");
const B_MOTO = L(3, "「1/4m」と「2mの1/4」はちがう");
const B_SHOSU = L(4, "1/10は0.1と同じ");
const B_TASU = L(5, "分母が同じ分数のたし算・ひき算");

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
/** 分母 d、1〜d-1 で d と1以外の公約数がない分子 */
function coprime(r: Rng, d: number, lo = 1, hi = d - 1): number {
  const c: number[] = [];
  for (let n = lo; n <= hi; n++) if (gcd(n, d) === 1) c.push(n);
  return r.pick(c);
}

function nanKoBun(r: Rng): QuestionBody {
  const d = r.pick([3, 4, 5, 6, 7, 8, 9]);
  const n = coprime(r, d, 2);
  const what = r.pick(["テープ", "リボン", "ひも"]);
  return {
    prompt: `1mの${what}を${d}つに等しく分けた1こ分の、${n}こ分の長さは何mですか。分数で答えなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [`${n}/${d}`], unit: "m", calc: `${n}/${d}` },
    point: "1を□こに分けた○こ分は ○/□",
    steps: [{ title: "分母と分子を決める", body: `1mを${d}つに分けた1こ分は 1/${d}m。その${n}こ分なので {{${n}/${d}m}} です。`, back: [B_TOUBUN, B_BUNBO] }],
  };
}

function ikutsu(r: Rng): QuestionBody {
  const d = r.pick([5, 6, 7, 8, 9, 10]);
  const k = r.bool() ? d : coprime(r, d, 2);
  return {
    prompt: k === d ? `1/${d}L を何こ集めると、1Lになりますか。` : `${k}/${d}L は、1/${d}L を何こ集めたかさですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(k)], unit: "こ", calc: `${k}/${d}*${d}` },
    point: "分子は「1/分母の何こ分か」",
    steps: [
      {
        title: "分子を見る",
        body: k === d ? `${d}/${d}L は1Lと同じです。1/${d}L が{{${d}こ}}で1Lになります。` : `分子の${k}は、1/${d}L の何こ分かを表しています。{{${k}こ}}です。`,
        back: [B_BUNBO],
      },
    ],
  };
}

function shosu(r: Rng): QuestionBody {
  const n = r.int(1, 9);
  if (r.bool()) {
    return {
      prompt: `${n}/10 を小数で表しなさい。`,
      answer: { kind: "num", answerKind: "num", answer: [`0.${n}`], calc: `${n}/10` },
      point: "1/10＝0.1。○/10 は0.1の○こ分",
      steps: [{ title: "0.1の何こ分か", body: `${n}/10 は 1/10 の${n}こ分。1/10＝0.1 なので、0.1の${n}こ分で {{0.${n}}} です。`, back: [B_SHOSU] }],
    };
  }
  const nn = coprime(r, 10, 1, 9);
  return {
    prompt: `0.${nn} を、分母が10の分数で表しなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [`${nn}/10`], calc: `${nn}/10` },
    point: "0.1＝1/10。0.○ は ○/10",
    steps: [{ title: "1/10の何こ分か", body: `0.${nn} は 0.1 の${nn}こ分。0.1＝1/10 なので {{${nn}/10}} です。`, back: [B_SHOSU] }],
  };
}

function tasu(r: Rng): QuestionBody {
  const d = r.pick([5, 7, 8, 9, 10, 11]);
  const s = coprime(r, d, 2);
  const a = r.int(1, s - 1);
  const b = s - a;
  return {
    prompt: `${a}/${d}＋${b}/${d} を計算しなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [`${s}/${d}`], calc: `${a}/${d}+${b}/${d}` },
    point: "分母はそのまま、分子どうしをたす",
    steps: [
      { title: `1/${d}の何こ分か`, body: `1/${d}が${a}こと${b}こで、${a}＋${b}＝${s}（こ）。答えは {{${s}/${d}}} です。`, trap: `分母どうしもたして ${s}/${2 * d} としない。分母は「分け方」なので、かわりません。`, back: [B_TASU] },
    ],
  };
}

function hiku(r: Rng): QuestionBody {
  const d = r.pick([5, 6, 7, 8, 9, 10]);
  const k = coprime(r, d, 1);
  const a = d - k;
  return {
    prompt: `1−${a}/${d} を計算しなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [`${k}/${d}`], calc: `1-${a}/${d}` },
    point: "1を 分母/分母 と見てからひく",
    steps: [
      { title: `1を${d}/${d}と見る`, body: `1＝${d}/${d}。${d}/${d}−${a}/${d} は、1/${d}が ${d}−${a}＝${k}（こ）なので {{${k}/${d}}} です。`, back: [B_TASU] },
    ],
  };
}

function motoWa(r: Rng): QuestionBody {
  const m = r.pick([2, 3, 4, 6]);
  const k = r.pick([2, 4, 5].filter((x) => (m * 100) % x === 0));
  const ans = (m * 100) / k;
  const what = r.pick(["テープ", "リボン", "ロープ"]);
  return {
    prompt: `${m}mの${what}の 1/${k} の長さは何cmですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(ans)], unit: "cm", calc: `${m}*100/${k}` },
    point: "「○mの1/□」は、○mをもとにして□つに分ける",
    steps: [
      { title: "もとは何か", body: `もとにするのは${m}m（${m * 100}cm）です。それを${k}つに等しく分けた1こ分です。`, back: [B_MOTO] },
      { title: "分ける", body: `${m * 100}÷${k}＝{{${ans}}}（cm）。`, trap: `1/${k}m（${100 / k}cm）とまちがえない。1/${k}m は1mをもとにした長さです。` },
    ],
  };
}

export const E_MATH_3_BUNSU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小3",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "分数の大きさ",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "nanko-bun", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: nanKoBun },
        { id: "ikutsu", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: ikutsu },
        { id: "shosu", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: shosu },
      ],
    },
    {
      title: "分数の計算と、もとにする大きさ",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "tasu", type: "A", difficulty: 2, points: 18, seconds: 60, skill: "知識・技能", generate: tasu },
        { id: "hiku", type: "A", difficulty: 2, points: 18, seconds: 60, skill: "知識・技能", generate: hiku },
        { id: "moto", type: "A", difficulty: 3, points: 22, seconds: 120, skill: "思考・判断・表現", generate: motoWa },
      ],
    },
  ],
};
