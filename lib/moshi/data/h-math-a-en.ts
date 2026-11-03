// 数学A「円の性質」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 角は円周角の定理・内接四角形・接弦定理の式を calc に、長さは方べきの定理・三平方の定理の等式を equations に書く
// (√ の答えは x² の等式に代入して確かめる)。scripts/check-moshi.ts がシード1〜100で照合する。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-a-en";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const BACK_ENSHU = L(1, "円周角の定理");
const BACK_NAI = L(2, "円に内接する四角形");
const BACK_SETSU = L(3, "接弦定理");
const BACK_HOU = L(4, "方べきの定理");
const BACK_NIEN = L(5, "2つの円の位置関係");

/** √n を "k√m" に (n が平方数なら整数) */
function sq(n: number): { text: string; kind: "num" | "surd" } {
  let k = 1;
  let m = n;
  for (let d = 2; d * d <= m; d++)
    while (m % (d * d) === 0) {
      m /= d * d;
      k *= d;
    }
  if (m === 1) return { text: String(k), kind: "num" };
  return { text: `${k === 1 ? "" : k}√${m}`, kind: "surd" };
}

function enshukaku(r: Rng): QuestionBody {
  const kind = r.pick(["chushin", "chokkei", "onaji"] as const);
  if (kind === "chushin") {
    const t = r.int(20, 80);
    return {
      prompt: `円 O の周上に3点 A、B、C があり、点 C は弧 AB のうち長いほうの上にある。∠AOB＝${2 * t}° のとき、∠ACB の大きさを求めなさい。`,
      answer: { kind: "num", answerKind: "num", answer: [String(t)], unit: "°", calc: `${2 * t}/2` },
      point: "円周角は、同じ弧に対する中心角の半分",
      steps: [{ title: "中心角の半分", body: `∠ACB は弧 AB に対する円周角なので、${2 * t}°÷2＝{{${t}°}}。`, back: [BACK_ENSHU] }],
    };
  }
  if (kind === "chokkei") {
    const t = r.int(15, 75);
    return {
      prompt: `線分 AB を直径とする円の周上に点 C がある。∠CAB＝${t}° のとき、∠ABC の大きさを求めなさい。`,
      answer: { kind: "num", answerKind: "num", answer: [String(90 - t)], unit: "°", calc: `180-90-${t}` },
      point: "直径に対する円周角は 90°",
      steps: [
        { title: "直径に対する円周角", body: "AB は直径なので {{∠ACB＝90°}}。", back: [BACK_ENSHU] },
        { title: "三角形の内角", body: `∠ABC＝180°−90°−${t}°＝{{${90 - t}°}}。` },
      ],
    };
  }
  const x = r.int(20, 60);
  const y = r.int(20, 60);
  return {
    prompt: `円周上に4点 A、B、C、D がこの順にあり、対角線 AC と BD の交点を P とする。∠BDC＝${x}°、∠ABD＝${y}° のとき、∠APD の大きさを求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(x + y)], unit: "°", calc: `${x}+${y}` },
    point: "同じ弧の円周角を移し、三角形の外角を使う",
    steps: [
      { title: "同じ弧に対する円周角", body: `∠BAC と ∠BDC はどちらも弧 BC に対する円周角なので、{{∠BAC＝${x}°}}。`, back: [BACK_ENSHU] },
      { title: "△ABP の外角", body: `∠APD は △ABP の頂点 P における外角なので、∠PAB＋∠PBA＝${x}°＋${y}°＝{{${x + y}°}}。`, trap: `180°−${x}°−${y}°＝${180 - x - y}° は ∠APB。求める角とまちがえない。` },
    ],
  };
}

function naisetsu(r: Rng): QuestionBody {
  const a = r.int(50, 130);
  if (r.bool()) {
    return {
      prompt: `四角形 ABCD は円に内接している。∠BAD＝${a}° のとき、∠BCD の大きさを求めなさい。`,
      answer: { kind: "num", answerKind: "num", answer: [String(180 - a)], unit: "°", calc: `180-${a}` },
      point: "円に内接する四角形の対角の和は 180°",
      steps: [{ title: "対角の和", body: `∠BCD＝180°−${a}°＝{{${180 - a}°}}。`, trap: "となり合う角ではなく、向かい合う角（対角）の和が 180°。", back: [BACK_NAI] }],
    };
  }
  return {
    prompt: `四角形 ABCD は円に内接している。辺 BC を C の側に延長した直線上に点 E をとる。∠BAD＝${a}° のとき、∠DCE の大きさを求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(a)], unit: "°", calc: `180-(180-${a})` },
    point: "外角は、となりの内角の対角に等しい",
    steps: [
      { title: "対角の和", body: `∠BCD＝180°−${a}°＝${180 - a}°。`, back: [BACK_NAI] },
      { title: "外角", body: `∠DCE＝180°−∠BCD＝{{${a}°}}。∠BAD と等しくなります。` },
    ],
  };
}

function setsugen(r: Rng): QuestionBody {
  const t = r.int(30, 80);
  const f = r.int(30, 140 - t);
  return {
    prompt: `△ABC は円 O に内接している。点 A における円 O の接線 ℓ 上に、直線 AB に関して C と反対側に点 T をとる。∠TAB＝${t}°、∠BAC＝${f}° のとき、∠ABC の大きさを求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(180 - t - f)], unit: "°", calc: `180-${t}-${f}` },
    point: "接線と弦の角＝その角の中にある弧の円周角",
    steps: [
      { title: "接弦定理", body: `∠TAB は弦 AB と接線がつくる角なので、弧 AB に対する円周角 ∠ACB に等しく、{{∠ACB＝${t}°}}。`, back: [BACK_SETSU] },
      { title: "三角形の内角", body: `∠ABC＝180°−${f}°−${t}°＝{{${180 - t - f}°}}。`, trap: "∠TAB を ∠ABC に等しいとしない。等しいのは、角の内部の弧 AB に対する円周角 ∠ACB。" },
    ],
  };
}

function houbekiNai(r: Rng): QuestionBody {
  const pc = r.int(2, 10);
  const pd = r.int(2, 10);
  const prod = pc * pd;
  const divs = Array.from({ length: 11 }, (_, i) => i + 2).filter((x) => prod % x === 0 && prod / x >= 2 && prod / x <= 15 && x !== pc && prod / x !== pc);
  const pa = divs.length ? r.pick(divs) : pd;
  const pb = prod / pa;
  return {
    prompt: `円の2つの弦 AB、CD が、円の内部の点 P で交わっている。PA＝${pa}、PB＝${pb}、PC＝${pc} のとき、PD の長さを求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(pd)], equations: [`${pa}*${pb}=${pc}*x`] },
    point: "PA×PB＝PC×PD。P から交点までの長さをかける",
    steps: [
      { title: "方べきの定理", body: `PA×PB＝PC×PD より、${pa}×${pb}＝${pc}×PD。`, back: [BACK_HOU] },
      { title: "解く", body: `PD＝${pa * pb}÷${pc}＝{{${pd}}}。`, trap: "PA×PC＝PB×PD のように、ちがう弦の長さを組にしない。同じ弦の2つの部分をかけます。" },
    ],
  };
}

function houbekiSessen(r: Rng): QuestionBody {
  const pa = r.int(2, 9);
  const ab = r.int(2, 12);
  const pb = pa + ab;
  const t = sq(pa * pb);
  return {
    prompt: `円の外部の点 P から引いた直線が円と2点 A、B で交わり、PA＝${pa}、AB＝${ab} である（A は P と B の間にある）。P から円に引いた接線の接点を T とするとき、PT の長さを求めなさい。`,
    answer: { kind: "num", answerKind: t.kind, answer: [t.text], equations: [`x^2=${pa}*(${pa}+${ab})`] },
    point: "PT²＝PA×PB。PB は PA＋AB",
    steps: [
      { title: "PB を出す", body: `PB＝PA＋AB＝${pa}＋${ab}＝{{${pb}}}。`, trap: `PA×AB とかけない。どちらも P から測った長さ PA と PB をかけます。`, back: [BACK_HOU] },
      { title: "方べきの定理", body: `PT²＝PA×PB＝${pa}×${pb}＝${pa * pb}。PT＞0 なので PT＝{{${t.text}}}。` },
    ],
  };
}

function kyotsuSessen(r: Rng): QuestionBody {
  const R = r.int(3, 8);
  const rr = r.int(1, R - 1);
  const d = r.int(R + rr + 1, R + rr + 8);
  const outer = r.bool();
  const leg = outer ? R - rr : R + rr;
  const t = sq(d * d - leg * leg);
  const name = outer ? "共通外接線" : "共通内接線";
  return {
    prompt: `半径 ${R} の円 O と半径 ${rr} の円 O′ があり、中心間の距離は OO′＝${d} である。2円の${name}の1本が、円 O、O′ とそれぞれ点 A、B で接するとき、線分 AB の長さを求めなさい。`,
    answer: { kind: "num", answerKind: t.kind, answer: [t.text], equations: [`x^2=${d}^2-(${R}${outer ? "-" : "+"}${rr})^2`] },
    point: "AB を平行移動して、斜辺 OO′ の直角三角形をつくる",
    steps: [
      { title: "位置関係", body: `${d}＞${R}＋${rr} なので2円は離れていて、共通接線は4本あります。`, back: [BACK_NIEN] },
      { title: "直角三角形をつくる", body: `O′ を通り AB に平行な直線を引くと、斜辺 OO′＝${d}、もう1辺が ${outer ? `${R}−${rr}` : `${R}＋${rr}`}＝${leg} の直角三角形ができ、残りの辺が AB と等しい。`, trap: outer ? "外接線では半径の差、内接線では半径の和。逆にしない。" : "内接線は2円の間を横切るので、半径の和になる。外接線（半径の差）と区別する。" },
      { title: "三平方の定理", body: `AB²＝${d}²−${leg}²＝${d * d - leg * leg}。AB＝{{${t.text}}}。` },
    ],
  };
}

export const H_MATH_A_EN_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学A",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "円周角と内接四角形",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "enshukaku", type: "A", difficulty: 1, points: 14, seconds: 90, skill: "知識・技能", generate: enshukaku },
        { id: "naisetsu", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: naisetsu },
      ],
    },
    {
      title: "接弦定理と方べきの定理",
      lead: "次の問いに答えなさい。根号をふくむ答えは、根号の中をできるだけ小さい整数にして答えなさい。",
      style: "mix",
      questions: [
        { id: "setsugen", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "思考・判断・表現", generate: setsugen },
        { id: "houbeki-nai", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "知識・技能", generate: houbekiNai },
        { id: "houbeki-sessen", type: "A", difficulty: 2, points: 18, seconds: 120, skill: "知識・技能", generate: houbekiSessen },
      ],
    },
    {
      title: "2つの円と共通接線",
      lead: "次の問いに答えなさい。根号をふくむ答えは、根号の中をできるだけ小さい整数にして答えなさい。",
      style: "word",
      questions: [{ id: "kyotsu-sessen", type: "A", difficulty: 3, points: 22, seconds: 240, skill: "思考・判断・表現", generate: kyotsuSessen }],
    },
  ],
};
