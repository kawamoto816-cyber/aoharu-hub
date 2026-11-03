// 小5算数「体積」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 長さは整数 (水の深さは小数第1位まで) で作り、答えは整数になる。calc (問題の数から答えを出す式) で答えを検算する (scripts/check-moshi.ts がシード100個で確かめる)。
import type { NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-5-taiseki";
const L = (n: number) => `/learn/lecture/${U}#lec-s${n}`;
const BACK_1CM = { label: "1cm³の立方体がいくつ分", href: L(1) };
const BACK_KOSHIKI = { label: "公式は「1段《だん》の数×段《だん》の数」", href: L(2) };
const BACK_TANI = { label: "大きな体積の単位", href: L(3) };
const BACK_WAKE = { label: "形を分けて、たして求める", href: L(4) };
const BACK_MIZU = { label: "でこぼこの形の体積は、水で調べる", href: L(5) };

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const num = (answer: number, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [f(answer)], calc, ...(unit ? { unit } : {}) });

function chokuho(r: Rng): QuestionBody {
  const a = r.int(3, 15);
  const b = r.int(3, 15);
  const c = r.int(2, 12);
  const v = a * b * c;
  return {
    prompt: `たて ${a}cm、横 ${b}cm、高さ ${c}cm の直方体の体積は何cm³ですか。`,
    answer: num(v, `${a}*${b}*${c}`, "cm³"),
    point: "直方体の体積＝たて×横×高さ",
    steps: [
      { title: "1だん分の数", body: `1cm³の立方体が、1だんに ${a}×${b}＝${a * b}（こ）ならびます。`, back: [BACK_1CM] },
      { title: "だんの数をかける", body: `それが ${c}だんあるので、${a * b}×${c}＝{{${v}}}（cm³）です。`, back: [BACK_KOSHIKI] },
    ],
  };
}

function rippo(r: Rng): QuestionBody {
  const a = r.int(2, 12);
  const v = a * a * a;
  return {
    prompt: `1辺が ${a}cm の立方体の体積は何cm³ですか。`,
    answer: num(v, `${a}*${a}*${a}`, "cm³"),
    point: "立方体の体積＝1辺×1辺×1辺",
    steps: [
      { title: "1辺を3回かける", body: `${a}×${a}×${a}＝{{${v}}}（cm³）です。`, trap: `${a}×3 としない。たて・横・高さの3つをかけ合わせます。`, back: [BACK_KOSHIKI] },
    ],
  };
}

function tanni(r: Rng): QuestionBody {
  const mode = r.int(0, 2);
  if (mode === 0) {
    const x = r.int(2, 40) / 2;
    const ans = x * 1000000;
    return {
      prompt: `${f(x)}m³ は何cm³ですか。`,
      answer: num(ans, `${f(x)}*1000000`, "cm³"),
      point: "1m³＝100cm×100cm×100cm＝1000000cm³",
      steps: [
        { title: "1m³ は何cm³か", body: "1m＝100cm なので、1m³＝100×100×100＝{{1000000}}（cm³）です。", trap: "1m³＝100cm³ や 1000cm³ ではない。たて・横・高さのそれぞれが100倍になります。", back: [BACK_TANI] },
        { title: "かける", body: `${f(x)}×1000000＝{{${ans}}}（cm³）です。` },
      ],
    };
  }
  if (mode === 1) {
    const l = r.int(2, 30);
    const cm = l * 1000;
    return {
      prompt: `${cm}cm³ は何Lですか。`,
      answer: num(l, `${cm}/1000`, "L"),
      point: "1L＝1000cm³（1辺10cmの立方体）",
      steps: [{ title: "1L＝1000cm³", body: `1Lは1辺10cmの立方体の体積で、1000cm³です。${cm}÷1000＝{{${l}}}（L）です。`, back: [BACK_TANI] }],
    };
  }
  const m = r.int(2, 9);
  const l = m * 1000;
  return {
    prompt: `${m}m³ は何Lですか。`,
    answer: num(l, `${m}*1000`, "L"),
    point: "1m³＝1000L",
    steps: [{ title: "1m³＝1000L", body: `1m³＝1000000cm³、1L＝1000cm³ なので、1m³＝1000Lです。${m}×1000＝{{${l}}}（L）です。`, back: [BACK_TANI] }],
  };
}

function takasa(r: Rng): QuestionBody {
  const a = r.int(4, 20);
  const b = r.int(4, 20);
  const c = r.int(3, 15);
  const v = a * b * c;
  return {
    prompt: `体積が ${v}cm³ で、たて ${a}cm、横 ${b}cm の直方体があります。高さは何cmですか。`,
    answer: num(c, `${v}/(${a}*${b})`, "cm"),
    point: "高さ＝体積÷（たて×横）",
    steps: [
      { title: "1だん分の体積", body: `高さ1cm分の体積は ${a}×${b}＝${a * b}（cm³）です。`, back: [BACK_KOSHIKI] },
      { title: "何だん分か", body: `${v}÷${a * b}＝{{${c}}} なので、高さは ${c}cm です。` },
    ],
  };
}

function lji(r: Rng): QuestionBody {
  const a = r.int(4, 10);
  const b = r.int(8, 16);
  const c = r.int(6, 12);
  const d = r.int(2, b - 3);
  const e = r.int(2, c - 2);
  const v = a * b * c - a * d * e;
  return {
    prompt: `たて ${a}cm、横 ${b}cm、高さ ${c}cm の直方体の角から、たて ${a}cm、横 ${d}cm、高さ ${e}cm の直方体を切り取りました。残った立体の体積は何cm³ですか。`,
    answer: num(v, `${a}*${b}*${c}-${a}*${d}*${e}`, "cm³"),
    point: "大きい直方体から、切り取った分をひく",
    steps: [
      { title: "もとの直方体", body: `${a}×${b}×${c}＝${a * b * c}（cm³）です。`, back: [BACK_KOSHIKI] },
      { title: "切り取った分をひく", body: `切り取った直方体は ${a}×${d}×${e}＝${a * d * e}（cm³）。${a * b * c}−${a * d * e}＝{{${v}}}（cm³）です。`, trap: "2つの直方体に分けてたしても、同じ答えになります。どちらで求めても、長さを取りちがえないように。", back: [BACK_WAKE] },
    ],
  };
}

function mizu(r: Rng): QuestionBody {
  const a = r.pick([10, 20, 25, 30, 40]);
  const b = r.pick([20, 30, 40, 50]);
  const h1 = r.int(8, 20);
  const up = r.pick([0.5, 1, 1.5, 2, 2.5, 3, 4]);
  const h2 = h1 + up;
  const v = a * b * up;
  return {
    prompt: `内のりが、たて ${a}cm、横 ${b}cm の直方体の水そうに、深さ ${h1}cm まで水が入っています。この中に石をしずめたら、水の深さが ${f(h2)}cm になりました。石の体積は何cm³ですか。`,
    answer: num(v, `${a}*${b}*(${f(h2)}-${h1})`, "cm³"),
    point: "ふえた水の部分の体積が、石の体積",
    steps: [
      { title: "ふえた深さ", body: `水の深さは ${f(h2)}−${h1}＝${f(up)}（cm）ふえました。`, back: [BACK_MIZU] },
      { title: "ふえた部分の体積", body: `ふえた部分は、たて ${a}cm、横 ${b}cm、高さ ${f(up)}cm の直方体と同じなので、${a}×${b}×${f(up)}＝{{${v}}}（cm³）です。`, trap: `${a}×${b}×${f(h2)} としない。それは石と水を合わせた体積です。` },
    ],
  };
}

export const E_MATH_5_TAISEKI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小5",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "直方体と立方体の体積",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "chokuho", type: "A", difficulty: 1, points: 15, seconds: 45, skill: "知識・技能", generate: chokuho },
        { id: "rippo", type: "A", difficulty: 1, points: 15, seconds: 45, skill: "知識・技能", generate: rippo },
        { id: "tanni", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: tanni },
      ],
    },
    {
      title: "体積から考える",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "takasa", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "思考・判断・表現", generate: takasa },
        { id: "lji", type: "A", difficulty: 2, points: 17, seconds: 120, skill: "思考・判断・表現", generate: lji },
      ],
    },
    {
      title: "水を使って体積を調べる",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [{ id: "mizu", type: "A", difficulty: 3, points: 21, seconds: 180, skill: "思考・判断・表現", generate: mizu }],
    },
  ],
};
