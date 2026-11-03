// 小5算数「四角形と三角形の面積」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 長さは整数で作り、÷2 がある公式は答えが整数か小数第1位になる。逆算の問題は先に答えの長さを決めてから面積を作る。
// calc (問題の数から答えを出す式) で答えを検算する (scripts/check-moshi.ts がシード100個で確かめる)。
import type { NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-5-menseki";
const L = (n: number) => `/learn/lecture/${U}#lec-s${n}`;
const BACK_HEIKOU = { label: "平行四辺形は、切って動かすと長方形", href: L(1) };
const BACK_SANKAKU = { label: "三角形は、平行四辺形の半分", href: L(2) };
const BACK_TAKASA = { label: "高さは「底辺に垂直《すいちょく》」な長さ", href: L(3) };
const BACK_DAIKEI = { label: "台形とひし形も、知っている形に直す", href: L(4) };
const BACK_HIREI = { label: "高さが2倍、3倍になると、面積も2倍、3倍", href: L(5) };

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const num = (answer: number, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [f(answer)], calc, ...(unit ? { unit } : {}) });

function heikou(r: Rng): QuestionBody {
  const a = r.int(4, 20);
  const h = r.int(3, 15);
  return {
    prompt: `底辺が ${a}cm、高さが ${h}cm の平行四辺形の面積は何cm²ですか。`,
    answer: num(a * h, `${a}*${h}`, "cm²"),
    point: "平行四辺形の面積＝底辺×高さ",
    steps: [{ title: "底辺×高さ", body: `切って動かすと、たて${h}cm・横${a}cmの長方形になるので、${a}×${h}＝{{${a * h}}}（cm²）です。`, back: [BACK_HEIKOU] }],
  };
}

function sankaku(r: Rng): QuestionBody {
  const a = r.int(4, 20);
  const h = r.int(3, 15);
  const s = (a * h) / 2;
  return {
    prompt: `底辺が ${a}cm、高さが ${h}cm の三角形の面積は何cm²ですか。`,
    answer: num(s, `${a}*${h}/2`, "cm²"),
    point: "三角形の面積＝底辺×高さ÷2",
    steps: [{ title: "平行四辺形の半分", body: `同じ三角形を2つ合わせると平行四辺形になるので、${a}×${h}÷2＝{{${f(s)}}}（cm²）です。`, trap: "÷2 をわすれない。", back: [BACK_SANKAKU] }],
  };
}

function daikei(r: Rng): QuestionBody {
  const a = r.int(3, 10);
  const b = r.int(a + 2, 18);
  const h = r.int(3, 12);
  const s = ((a + b) * h) / 2;
  return {
    prompt: `上底が ${a}cm、下底が ${b}cm、高さが ${h}cm の台形の面積は何cm²ですか。`,
    answer: num(s, `(${a}+${b})*${h}/2`, "cm²"),
    point: "台形の面積＝（上底＋下底）×高さ÷2",
    steps: [{ title: "2つ合わせて平行四辺形", body: `同じ台形を2つ合わせると、底辺 ${a}＋${b}＝${a + b}（cm）の平行四辺形になります。${a + b}×${h}÷2＝{{${f(s)}}}（cm²）です。`, back: [BACK_DAIKEI] }],
  };
}

function hishigata(r: Rng): QuestionBody {
  const p = r.int(4, 16);
  const q = r.int(4, 16);
  const s = (p * q) / 2;
  return {
    prompt: `2本の対角線の長さが ${p}cm と ${q}cm のひし形の面積は何cm²ですか。`,
    answer: num(s, `${p}*${q}/2`, "cm²"),
    point: "ひし形の面積＝対角線×対角線÷2",
    steps: [{ title: "長方形の半分", body: `ひし形は、たて${p}cm・横${q}cmの長方形の半分なので、${p}×${q}÷2＝{{${f(s)}}}（cm²）です。`, back: [BACK_DAIKEI] }],
  };
}

function nanameHen(r: Rng): QuestionBody {
  const a = r.int(6, 15);
  const h = r.int(3, 9);
  const side = h + r.int(1, 4);
  return {
    prompt: `平行四辺形で、となり合う2つの辺の長さは ${a}cm と ${side}cm です。${a}cm の辺を底辺としたとき、高さは ${h}cm です。この平行四辺形の面積は何cm²ですか。`,
    answer: num(a * h, `${a}*${h}`, "cm²"),
    point: "高さは、底辺に垂直《すいちょく》な長さ。ななめの辺ではない",
    steps: [
      { title: "使う長さを選ぶ", body: `底辺は${a}cm、高さは底辺に垂直《すいちょく》な ${h}cm です。${side}cmの辺は高さではありません。`, back: [BACK_TAKASA] },
      { title: "底辺×高さ", body: `${a}×${h}＝{{${a * h}}}（cm²）です。`, trap: `${a}×${side}＝${a * side} としない。ななめの辺は高さより長くなります。` },
    ],
  };
}

function takasa(r: Rng): QuestionBody {
  const a = r.int(4, 16);
  const h = r.int(3, 14);
  const s = (a * h) / 2;
  return {
    prompt: `面積が ${f(s)}cm² で、底辺が ${a}cm の三角形があります。高さは何cmですか。`,
    answer: num(h, `${f(s)}*2/${a}`, "cm"),
    point: "底辺×高さ÷2＝面積 から、高さ＝面積×2÷底辺",
    steps: [
      { title: "式に表す", body: `${a}×高さ÷2＝${f(s)} です。`, back: [BACK_SANKAKU] },
      { title: "逆にたどる", body: `高さ＝${f(s)}×2÷${a}＝{{${h}}}（cm）です。`, trap: `${f(s)}÷${a} だけでは、÷2 の分がもどっていない。`, back: [BACK_HIREI] },
    ],
  };
}

function kasoku(r: Rng): QuestionBody {
  const a = r.int(3, 9);
  const h = r.int(3, 10);
  const b = r.int(a + 2, 16);
  const s = ((a + b) * h) / 2;
  return {
    prompt: `上底が ${a}cm、高さが ${h}cm の台形の面積が ${f(s)}cm² です。下底は何cmですか。`,
    answer: num(b, `${f(s)}*2/${h}-${a}`, "cm"),
    point: "（上底＋下底）＝面積×2÷高さ",
    steps: [
      { title: "上底＋下底を求める", body: `（${a}＋下底）×${h}÷2＝${f(s)} なので、${a}＋下底＝${f(s)}×2÷${h}＝${a + b} です。`, back: [BACK_DAIKEI] },
      { title: "上底をひく", body: `下底＝${a + b}−${a}＝{{${b}}}（cm）です。`, trap: `${a + b} を答えにしない。それは上底と下底の合計です。` },
    ],
  };
}

export const E_MATH_5_MENSEKI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小5",
  review: { status: "draft" },
  sections: [
    {
      title: "面積の公式",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "heikou", type: "A", difficulty: 1, points: 12, seconds: 45, skill: "知識・技能", generate: heikou },
        { id: "sankaku", type: "A", difficulty: 1, points: 12, seconds: 45, skill: "知識・技能", generate: sankaku },
        { id: "daikei", type: "A", difficulty: 1, points: 12, seconds: 60, skill: "知識・技能", generate: daikei },
      ],
    },
    {
      title: "高さを見ぬく・逆に求める",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "hishigata", type: "A", difficulty: 2, points: 15, seconds: 60, skill: "知識・技能", generate: hishigata },
        { id: "naname", type: "A", difficulty: 2, points: 15, seconds: 90, skill: "思考・判断・表現", generate: nanameHen },
        { id: "takasa", type: "A", difficulty: 2, points: 15, seconds: 90, skill: "思考・判断・表現", generate: takasa },
      ],
    },
    {
      title: "台形の面積から考える",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [{ id: "kasoku", type: "A", difficulty: 3, points: 19, seconds: 150, skill: "思考・判断・表現", generate: kasoku }],
    },
  ],
};
