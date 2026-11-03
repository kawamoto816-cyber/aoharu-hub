// 小4算数「わり算の筆算（÷2けた）」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 先に わる数・商・あまり (あまり < わる数) を決め、わられる数＝わる数×商＋あまり で作る。calc・equations で答えを確かめる (scripts/check-moshi.ts がシード100個)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-4-wari-hissan2";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_TEJUN = L(1, "手順は ÷1けたと同じ4つのくり返し");
const B_KENTOU = L(2, "わる数を「何十」と見て、商の見当をつける");
const B_NAOSU = L(3, "大きすぎたら1小さく、小さすぎたら1大きく");
const B_3KETA = L(4, "3けた÷2けたは、商が立つ位から");
const B_TASHIKA = L(5, "たしかめ：わる数×商＋あまり＝わられる数");

function nanjuu(r: Rng): QuestionBody {
  const b = r.int(2, 9) * 10;
  const q = r.int(2, 9);
  const m = r.int(0, b / 10 - 1) * 10;
  const a = b * q + m;
  return {
    prompt: m === 0 ? `${a}÷${b} を計算しなさい。` : `${a}÷${b} を計算しなさい。商とあまりを書きなさい。`,
    answer: m === 0 ? { kind: "num", answerKind: "num", answer: [String(q)], calc: `${a}/${b}` } : { kind: "num", answerKind: "pair", answer: [String(q), String(m)], labels: ["商", "あまり"], calc: `(${a}-${m})/${b}`, equations: [`${b}*x+y=${a}`] },
    point: "10のまとまりで考える",
    steps: [{ title: "10のいくつ分", body: `${a}は10が${a / 10}こ、${b}は10が${b / 10}こ。${a / 10}÷${b / 10}＝${q}${m ? `あまり${m / 10}` : ""}。${m ? `あまりは10が${m / 10}こなので${m}。` : ""}答えは {{${m ? `${q}あまり${m}` : q}}}。`, trap: m ? `あまりを${m / 10}としない。10のまとまりで考えたので、あまりは${m}です。` : undefined, back: [B_KENTOU] }],
  };
}

function niketa(r: Rng): QuestionBody {
  const b = r.int(12, 39);
  const q = r.int(2, Math.floor(98 / b));
  const m = r.int(1, Math.min(b - 1, 99 - b * q));
  const a = b * q + m;
  return {
    prompt: `${a}÷${b} を筆算で計算しなさい。商とあまりを書きなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(q), String(m)], labels: ["商", "あまり"], calc: `(${a}-${m})/${b}`, equations: [`${b}*x+y=${a}`] },
    point: "わる数を何十と見て、商の見当をつける",
    steps: [
      { title: "見当", body: `${b}を${Math.round(b / 10) * 10}と見て、${a}÷${Math.round(b / 10) * 10} で見当をつけます。`, back: [B_KENTOU] },
      { title: "直してたしかめる", body: `${b}×${q}＝${b * q}、${a}−${b * q}＝${m}。${m}は${b}より小さいので、{{${q}あまり${m}}}。`, back: [B_NAOSU, B_TASHIKA] },
    ],
  };
}

function sanketa1(r: Rng): QuestionBody {
  const b = r.int(21, 89);
  const q = r.int(Math.ceil(100 / b), 9);
  const a = b * q;
  return {
    prompt: `${a}÷${b} を筆算で計算しなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(q)], calc: `${a}/${b}` },
    point: "上から2けたでわれなければ、商は一の位にたつ",
    steps: [
      { title: "商のたつ位", body: `上から2けたの${Math.floor(a / 10)}は${b}より小さいので、商は{{一の位}}にたちます。`, back: [B_3KETA] },
      { title: "計算", body: `${b}×${q}＝${a} なので、答えは {{${q}}}。`, back: [B_TASHIKA] },
    ],
  };
}

function sanketa2(r: Rng): QuestionBody {
  const b = r.int(12, 45);
  const q = r.int(11, Math.floor(999 / b));
  const a = b * q;
  return {
    prompt: `${a}÷${b} を筆算で計算しなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(q)], calc: `${a}/${b}` },
    point: "上から2けたでわれれば、商は十の位から",
    steps: [
      { title: "商のたつ位", body: `上から2けたの${Math.floor(a / 10)}は${b}以上なので、商は{{十の位}}からたちます。`, back: [B_3KETA] },
      { title: "くり返す", body: `たてる→かける→ひく→おろす をくり返して、答えは {{${q}}}。${b}×${q}＝${a} でたしかめます。`, back: [B_TEJUN, B_TASHIKA] },
    ],
  };
}

function kentou(r: Rng): QuestionBody {
  let b = 0, a = 0, est = 0, q = 0;
  const want = r.int(0, 1); // 0: 大きすぎ、1: 小さすぎ
  for (let i = 0; i < 80; i++) {
    b = r.int(12, 49);
    a = r.int(b * 2, 99);
    const bb = Math.round(b / 10) * 10;
    est = Math.floor(a / bb);
    q = Math.floor(a / b);
    if (est >= 1 && (want === 0 ? est > q : est < q)) break;
  }
  const bb = Math.round(b / 10) * 10;
  const opts = ["商を1小さくする", "商を1大きくする", "そのままでよい"];
  const correct = est > q ? 0 : est < q ? 1 : 2;
  return {
    prompt: `${a}÷${b} の筆算で、${b}を${bb}と見て、商の見当を${est}にしました。このあと、どうしますか。`,
    answer: {
      kind: "choice",
      options: opts,
      correct,
      why: [
        est > q ? `${b}×${est}＝${b * est} は${a}より大きく、ひけません。商が大きすぎます。` : `${b}×${est}＝${b * est} はひけるので、小さくする必要はありません。`,
        est < q ? `${a}−${b * est}＝${a - b * est} は わる数の${b}以上なので、商が小さすぎます。` : `ひいたあとが${b}より小さくならないか、大きくしすぎないように見ます。`,
        correct === 2 ? `${b}×${est}＝${b * est}、${a}−${b * est}＝${a - b * est} は${b}より小さいので、そのままでよい。` : "見当のままでは、正しい商になりません。",
      ],
    },
    point: "ひけない→1小さく、ひいた数≧わる数→1大きく",
    steps: [
      { title: "見当の商でかけてみる", body: `${b}×${est}＝${b * est}。${est > q ? `${a}より大きいのでひけません。` : `${a}−${b * est}＝${a - b * est}。`}`, back: [B_KENTOU] },
      { title: "直す", body: `{{${opts[correct]}}}。正しい商は${q}で、あまりは${a - b * q}です。`, back: [B_NAOSU] },
    ],
  };
}

function bunsho(r: Rng): QuestionBody {
  const b = r.int(12, 35);
  const q = r.int(6, 25);
  const m = r.int(1, b - 1);
  const a = b * q + m;
  return {
    prompt: `${a}本のえんぴつを、${b}本ずつ箱につめます。${b}本入った箱は何箱できて、何本あまりますか。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(q), String(m)], labels: ["箱", "あまり"], calc: `(${a}-${m})/${b}`, equations: [`${b}*x+y=${a}`] },
    point: "いくつ分もわり算。あまりはわる数より小さい",
    steps: [
      { title: "わり算", body: `${a}÷${b}＝{{${q}あまり${m}}}。${q}箱できて、${m}本あまります。`, back: [B_TEJUN] },
      { title: "たしかめ", body: `${b}×${q}＋${m}＝${b * q}＋${m}＝${a}。`, back: [B_TASHIKA] },
    ],
  };
}

export const E_MATH_4_WARI_HISSAN2_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小4",
  review: { status: "draft" },
  sections: [
    {
      title: "÷2けたの計算",
      lead: "次の計算をしなさい。",
      style: "calc",
      questions: [
        { id: "nanjuu", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: nanjuu },
        { id: "niketa", type: "A", difficulty: 1, points: 14, seconds: 75, skill: "知識・技能", generate: niketa },
        { id: "sanketa1", type: "A", difficulty: 1, points: 14, seconds: 75, skill: "知識・技能", generate: sanketa1 },
        { id: "sanketa2", type: "A", difficulty: 2, points: 18, seconds: 120, skill: "知識・技能", generate: sanketa2 },
      ],
    },
    {
      title: "商の見当と文章の問題",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "kentou", type: "A", difficulty: 2, points: 18, seconds: 90, skill: "思考・判断・表現", generate: kentou },
        { id: "bunsho", type: "A", difficulty: 3, points: 22, seconds: 120, skill: "思考・判断・表現", generate: bunsho },
      ],
    },
  ],
};
