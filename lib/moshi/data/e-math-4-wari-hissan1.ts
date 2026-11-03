// 小4算数「わり算の筆算（÷1けた）」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 先に わる数・商・あまり (あまり < わる数) を決め、わられる数＝わる数×商＋あまり で作る。calc・equations で答えを確かめる (scripts/check-moshi.ts がシード100個)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-4-wari-hissan1";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_TABA = L(1, "10のたばから先に分ける");
const B_TEJUN = L(2, "4つの手順をくり返す");
const B_JUU = L(3, "156÷3 を1けたずつ");
const B_AMARI = L(4, "あまりは、わる数より小さい");
const B_ZERO = L(5, "商がたたないときは0をたてる");

function niketa(r: Rng): QuestionBody {
  const b = r.int(2, 6);
  const q = r.int(11, Math.floor(99 / b));
  const a = b * q;
  return {
    prompt: `${a}÷${b} を筆算で計算しなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(q)], calc: `${a}/${b}` },
    point: "大きい位から、たてる→かける→ひく→おろす",
    steps: [
      { title: "十の位から", body: `${Math.floor(a / 10)}÷${b}＝${Math.floor(Math.floor(a / 10) / b)}あまり${Math.floor(a / 10) % b}。十の位に${Math.floor(Math.floor(a / 10) / b)}をたてます。`, back: [B_TABA, B_TEJUN] },
      { title: "一の位をおろす", body: `のこりの${Math.floor(a / 10) % b}と一の位の${a % 10}で ${(Math.floor(a / 10) % b) * 10 + (a % 10)}。${(Math.floor(a / 10) % b) * 10 + (a % 10)}÷${b}＝${q % 10}。答えは {{${q}}}。` },
    ],
  };
}

function sanketa(r: Rng): QuestionBody {
  const b = r.int(3, 9);
  const q = r.int(Math.ceil(100 / b), 99);
  const a = b * q;
  if (a >= 1000 || q < 10 || Math.floor(a / 100) >= b) return sanketa(r);
  return {
    prompt: `${a}÷${b} を筆算で計算しなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(q)], calc: `${a}/${b}` },
    point: "百の位でわれないときは、商は十の位から",
    steps: [
      { title: "商のたつ位", body: `百の位の${Math.floor(a / 100)}は${b}でわれないので、上から2けたの${Math.floor(a / 10)}で考え、{{商は十の位から}}たちます。`, back: [B_JUU] },
      { title: "くり返す", body: `たてる→かける→ひく→おろす をくり返して、答えは {{${q}}}。`, back: [B_TEJUN] },
    ],
  };
}

function amari(r: Rng): QuestionBody {
  const b = r.int(3, 9);
  const q = r.int(12, Math.floor(999 / b) - 1);
  const m = r.int(1, b - 1);
  const a = b * q + m;
  return {
    prompt: `${a}÷${b} を筆算で計算しなさい。商とあまりを書きなさい。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(q), String(m)], labels: ["商", "あまり"], calc: `(${a}-${m})/${b}`, equations: [`${b}*x+y=${a}`] },
    point: "あまりは、いつもわる数より小さい",
    steps: [
      { title: "筆算", body: `大きい位から4つの手順をくり返して、${a}÷${b}＝{{${q}あまり${m}}}。`, back: [B_TEJUN] },
      { title: "たしかめ", body: `${b}×${q}＋${m}＝${a}。あまり${m}は${b}より小さいので正しい。`, back: [B_AMARI] },
    ],
  };
}

function zero(r: Rng): QuestionBody {
  const b = r.int(2, 9);
  const h = r.int(1, Math.floor(9 / b));
  const o = r.int(1, 9);
  const q = h * 100 + o;
  const m = r.bool() ? 0 : r.int(1, b - 1);
  const a = b * q + m;
  if (a >= 1000) return zero(r);
  return {
    prompt: m === 0 ? `${a}÷${b} を筆算で計算しなさい。` : `${a}÷${b} を筆算で計算しなさい。商とあまりを書きなさい。`,
    answer:
      m === 0
        ? { kind: "num", answerKind: "num", answer: [String(q)], calc: `${a}/${b}` }
        : { kind: "num", answerKind: "pair", answer: [String(q), String(m)], labels: ["商", "あまり"], calc: `(${a}-${m})/${b}`, equations: [`${b}*x+y=${a}`] },
    point: "商がたたない位には0をたてる",
    steps: [
      { title: "十の位", body: `百の位の計算のあと、十の位をおろしても${b}でわれません。十の位に{{0}}をたてます。`, back: [B_ZERO] },
      { title: "一の位", body: `一の位をおろして計算し、答えは {{${m === 0 ? q : `${q}あまり${m}`}}}。`, trap: `0をわすれると${h * 10 + o}のようになってしまいます。` },
    ],
  };
}

function bunsho(r: Rng): QuestionBody {
  const b = r.int(3, 8);
  const q = r.int(12, 45);
  const m = r.int(1, b - 1);
  const a = b * q + m;
  const what = r.pick(["色紙", "シール", "カード"]);
  return {
    prompt: `${what}が${a}まいあります。${b}人で同じ数ずつ分けると、1人分は何まいで、何まいあまりますか。`,
    answer: { kind: "num", answerKind: "pair", answer: [String(q), String(m)], labels: ["1人分", "あまり"], unit: "まい", calc: `(${a}-${m})/${b}`, equations: [`${b}*x+y=${a}`] },
    point: "1人分＝全部÷人数。あまりも書く",
    steps: [
      { title: "式", body: `${a}÷${b}＝{{${q}あまり${m}}}。`, back: [B_TEJUN] },
      { title: "たしかめ", body: `${b}×${q}＋${m}＝${a}。`, back: [B_AMARI] },
    ],
  };
}

function nissu(r: Rng): QuestionBody {
  const b = r.int(6, 9);
  const q = r.int(12, 40);
  const m = r.int(1, b - 1);
  const a = b * q + m;
  return {
    prompt: `${a}ページの本を、1日${b}ページずつ読みます。全部読み終わるのは、読みはじめてから何日目ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(q + 1)], unit: "日目", calc: `(${a}-${m})/${b}+1` },
    point: "あまりのページを読む日も、1日いる",
    steps: [
      { title: "わり算", body: `${a}÷${b}＝${q}あまり${m}。${q}日で${b * q}ページ読み、${m}ページのこります。`, back: [B_TEJUN] },
      { title: "あまりをどうするか", body: `のこりの${m}ページを読む日がもう1日いるので、${q}＋1＝{{${q + 1}}}（日目）。`, trap: `商の${q}だけを答えると、${m}ページが読めていません。`, back: [B_AMARI] },
    ],
  };
}

export const E_MATH_4_WARI_HISSAN1_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小4",
  review: { status: "draft" },
  sections: [
    {
      title: "わり算の筆算",
      lead: "次の計算をしなさい。",
      style: "calc",
      questions: [
        { id: "niketa", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: niketa },
        { id: "sanketa", type: "A", difficulty: 1, points: 14, seconds: 75, skill: "知識・技能", generate: sanketa },
        { id: "amari", type: "A", difficulty: 1, points: 14, seconds: 90, skill: "知識・技能", generate: amari },
        { id: "zero", type: "A", difficulty: 2, points: 18, seconds: 90, skill: "知識・技能", generate: zero },
      ],
    },
    {
      title: "文章の問題",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [
        { id: "bunsho", type: "A", difficulty: 2, points: 18, seconds: 90, skill: "思考・判断・表現", generate: bunsho },
        { id: "nissu", type: "A", difficulty: 3, points: 22, seconds: 120, skill: "思考・判断・表現", generate: nissu },
      ],
    },
  ],
};
