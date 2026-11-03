// 小6算数「およその面積と体積」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 身のまわりの形を知っている図形とみて、がい数にした長さで計算する。がい数にする前の長さも rng で作り、四捨五入した値はコードで求めてから問題の式に使う。
// 円周率はレクチャーと同じ 3.14。calc (がい数にした長さから答えを出す式) で答えを検算する (scripts/check-moshi.ts がシード100個で確かめる)。
import type { NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-6-oyoso";
const L = (n: number) => `/learn/lecture/${U}#lec-s${n}`;
const BACK_MIRU = { label: "身のまわりの形を、知っている図形とみる", href: L(1) };
const BACK_TEJUN = { label: "求め方の手順", href: L(2) };
const BACK_GAISU = { label: "長さをがい数にすると計算が楽", href: L(3) };
const BACK_HOGAN = { label: "方眼を数えて、およその面積", href: L(4) };
const BACK_TAISEKI = { label: "体積も同じ考え方で", href: L(5) };

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const num = (answer: number, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [f(answer)], calc, ...(unit ? { unit } : {}) });
const pi = (k: number) => (314 * k) / 100;

function ike(r: Rng): QuestionBody {
  const d = r.step(10, 60, 2);
  const a = d / 2;
  const s = pi(a * a);
  const what = r.pick(["池", "花だん", "広場"]);
  return {
    prompt: `ある公園の${what}は、ほぼ円の形をしていて、直径はおよそ ${d}m です。この${what}を円とみると、面積はおよそ何m²ですか。円周率は3.14とします。`,
    answer: num(s, `(${d}/2)*(${d}/2)*3.14`, "m²"),
    point: "円とみて、半径×半径×3.14",
    steps: [
      { title: "知っている形とみる", body: `${what}を、直径${d}m（半径${a}m）の円とみます。`, back: [BACK_MIRU] },
      { title: "円の面積", body: `${a}×${a}×3.14＝{{${f(s)}}}（m²）です。`, back: [BACK_TEJUN] },
    ],
  };
}

function daikei(r: Rng): QuestionBody {
  const a = r.step(20, 60, 10);
  const b = r.step(a + 10, 120, 10);
  const h = r.step(20, 80, 10);
  const s = ((a + b) * h) / 2;
  return {
    prompt: `ある田んぼは、ほぼ台形の形をしています。上底をおよそ ${a}m、下底をおよそ ${b}m、高さをおよそ ${h}m とみると、面積はおよそ何m²ですか。`,
    answer: num(s, `(${a}+${b})*${h}/2`, "m²"),
    point: "台形とみて、（上底＋下底）×高さ÷2",
    steps: [{ title: "台形の面積", body: `（${a}＋${b}）×${h}÷2＝{{${f(s)}}}（m²）です。`, back: [BACK_MIRU, BACK_TEJUN] }],
  };
}

function gaisu(r: Rng): QuestionBody {
  const A = r.int(3, 9) * 10;
  const B = r.int(3, 12) * 10;
  // 四捨五入して A, B になる長さ (一の位まで) を作る
  const a = A + r.pick([-4, -3, -2, -1, 1, 2, 3, 4]) + r.int(1, 9) / 10;
  const b = B + r.pick([-4, -3, -2, -1, 1, 2, 3]) + r.int(1, 9) / 10;
  const ra = Math.round(a / 10) * 10;
  const rb = Math.round(b / 10) * 10;
  return {
    prompt: `ほぼ長方形の形をした運動場のたてと横の長さをはかると、${f(a)}m と ${f(b)}m でした。それぞれ一の位を四捨五入して、十の位までのがい数にしてから計算すると、面積はおよそ何m²ですか。`,
    answer: num(ra * rb, `${ra}*${rb}`, "m²"),
    point: "長さをがい数にしてから計算すると楽",
    steps: [
      { title: "がい数にする", body: `${f(a)}m は約${ra}m、${f(b)}m は約${rb}m です（一の位を四捨五入）。`, back: [BACK_GAISU] },
      { title: "長方形の面積", body: `${ra}×${rb}＝{{${ra * rb}}}（m²）です。`, trap: "はかった長さのまま計算すると、細かい数になって手間がふえる。がい数にしてからかけます。" },
    ],
  };
}

function hogan(r: Rng): QuestionBody {
  const all = r.int(12, 60);
  const part = r.step(8, 40, 2);
  const unit = r.pick([1, 4, 100]);
  const s = (all + part / 2) * unit;
  const u = unit === 100 ? "m²" : "cm²";
  const intro =
    unit === 100
      ? "公園の地図に、1辺が実際の10mにあたる方眼を重ねて、池の面積を調べました。池"
      : `${unit === 4 ? "1辺2cm" : "1辺1cm"}の方眼を重ねて、木の葉の面積を調べました。葉`;
  return {
    prompt: `${intro}の中に全部入っている方眼は ${all}こ、ふちにかかって一部だけ入っている方眼は ${part}こでした。一部だけ入っている方眼は半分とみると、面積はおよそ何${u}ですか。`,
    answer: num(s, `(${all}+${part}/2)*${unit}`, u),
    point: "全部入っている方眼は1こ、一部だけは1/2こ",
    steps: [
      { title: "方眼何こ分か", body: `${all}＋${part}÷2＝${all + part / 2}（こ分）です。`, back: [BACK_HOGAN] },
      { title: "1こ分の面積をかける", body: unit === 1 ? `1こ1cm²なので、{{${f(s)}}}cm² です。` : `1こ${unit}${u}なので、${all + part / 2}×${unit}＝{{${f(s)}}}（${u}）です。`, trap: unit === 1 ? undefined : "方眼の数をそのまま面積にしない。1こ分が何cm²（m²）かを確かめます。" },
    ],
  };
}

function hako(r: Rng): QuestionBody {
  const a = r.step(20, 60, 10);
  const b = r.step(20, 80, 10);
  const c = r.step(10, 40, 5);
  const v = a * b * c;
  const what = r.pick(["スーツケース", "ランドセル", "おもちゃ箱"]);
  return {
    prompt: `${what}を直方体とみて、たて およそ ${a}cm、横 およそ ${b}cm、高さ およそ ${c}cm としました。${what}の体積はおよそ何cm³ですか。`,
    answer: num(v, `${a}*${b}*${c}`, "cm³"),
    point: "直方体とみて、たて×横×高さ",
    steps: [{ title: "直方体の体積", body: `${a}×${b}×${c}＝{{${v}}}（cm³）です。`, back: [BACK_TAISEKI, BACK_MIRU] }],
  };
}

function suisou(r: Rng): QuestionBody {
  const d = r.step(20, 60, 10);
  const h = r.step(20, 60, 10);
  const a = d / 2;
  const cm3 = pi(a * a * h);
  const l = cm3 / 1000;
  return {
    prompt: `ほぼ円柱の形をした水そうがあります。内側の底の直径をおよそ ${d}cm、深さをおよそ ${h}cm とみると、この水そうに入る水はおよそ何Lですか。円周率は3.14とします。`,
    answer: num(l, `(${d}/2)*(${d}/2)*3.14*${h}/1000`, "L"),
    point: "円柱とみて体積を出し、1L＝1000cm³ で直す",
    steps: [
      { title: "円柱の体積", body: `${a}×${a}×3.14×${h}＝${f(cm3)}（cm³）です。`, back: [BACK_TAISEKI] },
      { title: "L に直す", body: `1L＝1000cm³ なので、${f(cm3)}÷1000＝{{${f(l)}}}（L）です。`, trap: "cm³ のまま答えない。聞かれている単位は L です。" },
    ],
  };
}

export const E_MATH_6_OYOSO_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小6",
  review: { status: "draft" },
  sections: [
    {
      title: "知っている図形とみる",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [
        { id: "ike", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: ike },
        { id: "daikei", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: daikei },
        { id: "hako", type: "A", difficulty: 1, points: 15, seconds: 45, skill: "知識・技能", generate: hako },
      ],
    },
    {
      title: "がい数と方眼",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [
        { id: "gaisu", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "思考・判断・表現", generate: gaisu },
        { id: "hogan", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "思考・判断・表現", generate: hogan },
      ],
    },
    {
      title: "およその体積と容積",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [{ id: "suisou", type: "A", difficulty: 3, points: 21, seconds: 180, skill: "思考・判断・表現", generate: suisou }],
    },
  ],
};
