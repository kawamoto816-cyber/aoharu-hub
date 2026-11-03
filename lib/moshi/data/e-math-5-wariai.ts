// 小5算数「割合」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 先に割合 (百分率は整数%) ともとにする量を決め、比べる量を掛け算で作る。答えは整数か小数第3位まで。
// calc (問題の数から答えを出す式) で答えを検算する (scripts/check-moshi.ts がシード100個で確かめる)。
import type { NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-5-wariai";
const L = (n: number) => `/learn/lecture/${U}#lec-s${n}`;
const BACK_3 = { label: "3つの量：もとにする量・比べる量・割合《わりあい》", href: L(1) };
const BACK_MOTO = { label: "「〜の」「〜をもとにすると」の前が、もとにする量", href: L(2) };
const BACK_ZU = { label: "面積図で3つの式をまとめる", href: L(3) };
const BACK_HENKEI = { label: "式は1つ、あとは変形", href: L(4) };
const BACK_HYAKU = { label: "百分率・歩合は、割合《わりあい》の言いかえ", href: L(5) };
const BACK_BIKI = { label: "「〜%引き」は残りの割合《わりあい》で考える", href: L(6) };

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const num = (answer: number, calc: string, unit?: string, labels?: string[]): NumQ => ({ kind: "num", answerKind: "num", answer: [f(answer)], calc, ...(unit ? { unit } : {}), ...(labels ? { labels } : {}) });

function wariai(r: Rng): QuestionBody {
  const p = r.pick([5, 10, 15, 20, 25, 30, 35, 40, 45, 60, 65, 70, 75, 80, 85, 90]);
  const base = r.pick([20, 40, 60, 80, 100, 200]);
  const comp = (base * p) / 100;
  const ctx = r.pick([
    { s: `定員${base}人のバスに${comp}人乗っています。乗っている人数は、定員の`, b: "定員", c: "乗っている人数" },
    { s: `${base}問のテストで${comp}問正かいしました。正かいした問題の数は、全部の問題の数の`, b: "全部の問題の数", c: "正かいした数" },
  ]);
  if (!Number.isInteger(comp)) return wariai(r);
  return {
    prompt: `${ctx.s}何倍ですか。小数で答えなさい。`,
    answer: num(p / 100, `${comp}/${base}`, "倍"),
    point: "割合《わりあい》＝比べる量÷もとにする量",
    steps: [
      { title: "もとにする量を見つける", body: `「${ctx.b}の」とあるので、もとにする量は${ctx.b}（${base}）、比べる量は${ctx.c}（${comp}）です。`, back: [BACK_MOTO] },
      { title: "わる", body: `${comp}÷${base}＝{{${f(p / 100)}}} です。`, trap: `${base}÷${comp} と、逆にわらない。もとにする量でわります。`, back: [BACK_3] },
    ],
  };
}

function kuraberu(r: Rng): QuestionBody {
  const p = r.pick([12, 15, 18, 20, 24, 25, 30, 35, 40, 45, 60, 75]);
  const base = r.step(200, 3000, 100);
  const comp = (base * p) / 100;
  return {
    prompt: `${base}円の ${p}% は何円ですか。`,
    answer: num(comp, `${base}*${p}/100`, "円"),
    point: "比べる量＝もとにする量×割合《わりあい》",
    steps: [
      { title: "百分率を小数に", body: `${p}% は ${f(p / 100)} です。`, back: [BACK_HYAKU] },
      { title: "かける", body: `${base}×${f(p / 100)}＝{{${f(comp)}}}（円）です。`, back: [BACK_ZU] },
    ],
  };
}

function iikae(r: Rng): QuestionBody {
  const mode = r.int(0, 2);
  if (mode === 0) {
    const x = r.int(1, 999) / 1000;
    const pct = Math.round(x * 1000) / 10;
    return {
      prompt: `割合《わりあい》を表す小数 ${f(x)} を、百分率で表しなさい。`,
      answer: num(pct, `${f(x)}*100`, "%"),
      point: "小数の割合《わりあい》×100＝百分率",
      steps: [{ title: "100倍する", body: `1が100%なので、${f(x)}×100＝{{${f(pct)}}}（%）です。`, back: [BACK_HYAKU] }],
    };
  }
  if (mode === 1) {
    const w = r.int(1, 9);
    const b = r.int(0, 9);
    const x = (w * 10 + b) / 100;
    return {
      prompt: `${w}割《わり》${b ? `${b}分《ぶ》` : ""} を、小数で表しなさい。`,
      answer: num(x, `${w}/10+${b}/100`),
      point: "1割《わり》＝0.1、1分《ぶ》＝0.01",
      steps: [{ title: "歩合を小数に", body: `${w}割《わり》は ${f(w / 10)}${b ? `、${b}分《ぶ》は ${f(b / 100)}` : ""}。合わせて {{${f(x)}}} です。`, back: [BACK_HYAKU] }],
    };
  }
  const p = r.int(1, 99);
  return {
    prompt: `${p}% を、小数で表しなさい。`,
    answer: num(p / 100, `${p}/100`),
    point: "百分率÷100＝小数の割合《わりあい》",
    steps: [{ title: "100でわる", body: `100%が1なので、${p}÷100＝{{${f(p / 100)}}} です。`, trap: "1% は 0.1 ではなく 0.01。", back: [BACK_HYAKU] }],
  };
}

function moto(r: Rng): QuestionBody {
  const p = r.pick([20, 25, 30, 40, 60, 75, 80, 120, 125, 150]);
  const base = r.step(20, 400, 20);
  const comp = (base * p) / 100;
  if (!Number.isInteger(comp)) return moto(r);
  const ctx = r.pick(["花だん", "畑", "公園"]);
  return {
    prompt: `${ctx}Aの面積は ${comp}m² で、これは${ctx}Bの面積の ${p}% にあたります。${ctx}Bの面積は何m²ですか。`,
    answer: num(base, `${comp}/(${p}/100)`, "m²"),
    point: "もとにする量＝比べる量÷割合《わりあい》",
    steps: [
      { title: "もとにする量はどれか", body: `「${ctx}Bの面積の${p}%」なので、もとにする量は${ctx}Bの面積です。わからないので□とします。`, back: [BACK_MOTO] },
      { title: "式を変形する", body: `□×${f(p / 100)}＝${comp} なので、□＝${comp}÷${f(p / 100)}＝{{${base}}}（m²）です。`, trap: `${comp}×${f(p / 100)} としない。もとにする量を□にして式を作ると、まちがえません。`, back: [BACK_HENKEI] },
    ],
  };
}

function biki(r: Rng): QuestionBody {
  const p = r.pick([10, 15, 20, 25, 30, 35, 40, 45]);
  const price = r.step(800, 6000, 200);
  const sale = (price * (100 - p)) / 100;
  if (!Number.isInteger(sale)) return biki(r);
  const thing = r.pick(["くつ", "かばん", "上着"]);
  return {
    prompt: `定価 ${price}円の${thing}が、${p}%引きで売られています。売りねは何円ですか。`,
    answer: num(sale, `${price}*(1-${p}/100)`, "円"),
    point: `${p}%引き ＝ 残りは ${100 - p}%`,
    steps: [
      { title: "残りの割合《わりあい》", body: `${p}%引きなので、売りねは定価の 100−${p}＝${100 - p}（%）です。`, back: [BACK_BIKI] },
      { title: "かける", body: `${price}×${f((100 - p) / 100)}＝{{${sale}}}（円）です。`, trap: `${price}×${f(p / 100)}＝${(price * p) / 100} は、引かれる金がく。そこで止めない。` },
    ],
  };
}

function teika(r: Rng): QuestionBody {
  const p = r.pick([10, 20, 25, 30, 40]);
  const price = r.step(1000, 8000, 200);
  const sale = (price * (100 - p)) / 100;
  if (!Number.isInteger(sale)) return teika(r);
  const thing = r.pick(["ゲーム", "自転車のライト", "うで時計"]);
  return {
    prompt: `${thing}を、定価の ${p}%引きで買ったら、代金は ${sale}円でした。この${thing}の定価は何円ですか。`,
    answer: num(price, `${sale}/(1-${p}/100)`, "円"),
    point: "代金は定価の（100−□）%。定価がもとにする量",
    steps: [
      { title: "代金は定価の何%か", body: `${p}%引きなので、代金${sale}円は定価の ${100 - p}%（${f((100 - p) / 100)}）にあたります。`, back: [BACK_BIKI] },
      { title: "もとにする量を求める", body: `定価×${f((100 - p) / 100)}＝${sale} なので、定価＝${sale}÷${f((100 - p) / 100)}＝{{${price}}}（円）です。`, trap: `${sale}×${f(1 + p / 100)} のように、${p}%たしてもどしてはいけない。もとにする量がちがいます。`, back: [BACK_HENKEI] },
    ],
  };
}

export const E_MATH_5_WARIAI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小5",
  review: { status: "draft" },
  sections: [
    {
      title: "割合《わりあい》・比べる量・百分率",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "wariai", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: wariai },
        { id: "kuraberu", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: kuraberu },
        { id: "iikae", type: "A", difficulty: 1, points: 15, seconds: 45, skill: "知識・技能", generate: iikae },
      ],
    },
    {
      title: "もとにする量と「〜%引き」",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [
        { id: "moto", type: "A", difficulty: 2, points: 17, seconds: 120, skill: "思考・判断・表現", generate: moto },
        { id: "biki", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "思考・判断・表現", generate: biki },
      ],
    },
    {
      title: "定価を求める",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [{ id: "teika", type: "A", difficulty: 3, points: 21, seconds: 180, skill: "思考・判断・表現", generate: teika }],
    },
  ],
};
