// 小4算数「変わり方」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: きまり (△＝○×4、○＋△＝和、△−○＝差、△＝2×○＋2 など) から数を作り、答えは calc と equations (x に答えを入れて式が成り立つか) で確かめる (scripts/check-moshi.ts がシード100個)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-4-kawarikata";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_HYO = L(1, "まず表に整理する");
const B_WA = L(2, "和がいつも同じになる");
const B_SA = L(3, "差がいつも同じになる");
const B_SHIKI = L(4, "きまりを式にすると、どんな数でも求められる");
const B_HAJIME = L(5, "はじめの1つだけ、ふえ方がちがう");

function seihoukei(r: Rng): QuestionBody {
  const n = r.int(6, 25);
  return {
    prompt: `1辺が○cmの正方形のまわりの長さを△cmとします。○が1、2、3…のとき、△は4、8、12…と変わります。○が${n}のとき、△はいくつですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(4 * n)], calc: `${n}*4`, equations: [`x=4*${n}`] },
    point: "△＝○×4",
    steps: [
      { title: "きまりを見つける", body: "表をたてに見ると、△はいつも○の4倍です。", back: [B_HYO] },
      { title: "式で求める", body: `△＝${n}×4＝{{${4 * n}}}。表をのばさなくても求められます。`, back: [B_SHIKI] },
    ],
  };
}

function wa(r: Rng): QuestionBody {
  const half = r.int(8, 20);
  const a = r.int(2, half - 2);
  return {
    prompt: `まわりの長さが${half * 2}cmの長方形を、たてと横の長さを変えていろいろ作ります。たてが${a}cmのとき、横は何cmですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(half - a)], unit: "cm", calc: `${half * 2}/2-${a}`, equations: [`${a}+x=${half}`] },
    point: "たて＋横は、まわりの半分",
    steps: [
      { title: "たて＋横", body: `たてと横は2本ずつあるので、たて＋横＝${half * 2}÷2＝${half}（cm）。`, back: [B_WA] },
      { title: "横", body: `${half}−${a}＝{{${half - a}}}（cm）。`, trap: `${half * 2}−${a} としない。まわりにはたても横も2本ずつあります。` },
    ],
  };
}

function sa(r: Rng): QuestionBody {
  const d = r.int(2, 7);
  const now = r.int(5, 9);
  const later = r.int(now + 3, now + 25);
  const [o, y] = r.pick([["姉", "妹"], ["兄", "弟"]]);
  return {
    prompt: `${o}は${now + d}才、${y}は${now}才です。${y}が${later}才になったとき、${o}は何才ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(later + d)], unit: "才", calc: `${later}+(${now + d}-${now})`, equations: [`x-${later}=${d}`] },
    point: "2人の年の差は、何年たってもかわらない",
    steps: [
      { title: "差を出す", body: `${now + d}−${now}＝${d}（才）。何年たっても差は${d}才です。`, back: [B_SA] },
      { title: "式", body: `${y}を○才、${o}を△才とすると △−○＝${d}。${later}＋${d}＝{{${later + d}}}（才）。`, back: [B_SHIKI] },
    ],
  };
}

function gyaku(r: Rng): QuestionBody {
  const k = r.int(3, 9);
  const n = r.int(4, 15);
  const what = r.pick([
    { a: "1こ", b: "円", t: `1こ${k * 10}円のあめを○こ買うと、代金は△円です。`, per: k * 10 },
    { a: "1たば", b: "まい", t: `1たば${k}まいの色紙を○たば用意すると、色紙は全部で△まいです。`, per: k },
  ]);
  const total = what.per * n;
  return {
    prompt: `${what.t}△が${total}のとき、○はいくつですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(n)], calc: `${total}/${what.per}`, equations: [`${what.per}x=${total}`] },
    point: "×のきまりは、わり算でもどす",
    steps: [
      { title: "きまりを式に", body: `△＝○×${what.per} です。`, back: [B_SHIKI] },
      { title: "わり算でもどす", body: `○＝△÷${what.per}＝${total}÷${what.per}＝{{${n}}}。`, back: [B_HYO] },
    ],
  };
}

function tsukue(r: Rng): QuestionBody {
  const n = r.int(5, 20);
  return {
    prompt: `正方形のつくえを横1列につなげます。つくえ1つのときは4人、2つのときは6人、3つのときは8人すわれます。つくえを${n}こつなげると、何人すわれますか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(2 * n + 2)], unit: "人", calc: `2*${n}+2`, equations: [`x=4+2*(${n}-1)`] },
    point: "1つふえるごとに2人ずつふえる",
    steps: [
      { title: "ふえ方", body: "つくえが1つふえると、すわれる人は2人ずつふえます。つなげたところにはすわれないからです。", back: [B_HAJIME] },
      { title: "式", body: `△＝2×○＋2。2×${n}＋2＝{{${2 * n + 2}}}（人）。`, trap: `4×${n} にしない。つなげたところの席はなくなります。`, back: [B_SHIKI] },
    ],
  };
}

function matchi(r: Rng): QuestionBody {
  const n = r.int(6, 30);
  const sticks = 3 * n + 1;
  return {
    prompt: `同じ長さのぼうを使って、正方形を横1列につなげてならべます。正方形1つでは4本、2つでは7本、3つでは10本使います。ぼうを${sticks}本使うと、正方形はいくつできますか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(n)], unit: "こ", calc: `(${sticks}-1)/3`, equations: [`3x+1=${sticks}`] },
    point: "はじめの1本と、正方形1つごとの3本",
    steps: [
      { title: "きまり", body: "正方形が1つふえると、ぼうは3本ずつふえます。はじめの1本に3本ずつたしていくと考えて、△＝3×○＋1 です。", back: [B_HAJIME, B_HYO] },
      { title: "もどす", body: `3×○＋1＝${sticks} なので、3×○＝${sticks - 1}、○＝${sticks - 1}÷3＝{{${n}}}。`, back: [B_SHIKI] },
    ],
  };
}

export const E_MATH_4_KAWARIKATA_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小4",
  review: { status: "draft" },
  sections: [
    {
      title: "ともなって変わる2つの量",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "seihoukei", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: seihoukei },
        { id: "wa", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: wa },
        { id: "sa", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: sa },
        { id: "gyaku", type: "A", difficulty: 2, points: 18, seconds: 75, skill: "思考・判断・表現", generate: gyaku },
      ],
    },
    {
      title: "きまりを見つけて考える",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [
        { id: "tsukue", type: "A", difficulty: 2, points: 18, seconds: 90, skill: "思考・判断・表現", generate: tsukue },
        { id: "matchi", type: "A", difficulty: 3, points: 22, seconds: 150, skill: "思考・判断・表現", generate: matchi },
      ],
    },
  ],
};
