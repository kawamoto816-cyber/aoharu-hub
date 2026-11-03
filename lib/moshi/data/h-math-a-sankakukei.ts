// 数学A「三角形の性質」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 角の二等分線の比・重心の 2:1・∠BOC＝2∠A・∠BIC＝90°＋∠A/2・チェバ/メネラウスの式を、問題の数から calc に書く。
// 比の値は既約分数 (fr)。scripts/check-moshi.ts がシード1〜100で calc と答えを照合する。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "h-math-a-sankakukei";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const BACK_NITO = L(1, "角の二等分線と辺の比");
const BACK_SHIN = L(2, "重心・外心・内心");
const BACK_CM = L(3, "チェバの定理とメネラウスの定理");
const BACK_JOKEN = L(4, "三角形ができる条件");

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
const fr = (n: number, d: number) => {
  const g = gcd(n, d);
  return d / g === 1 ? String(n / g) : `${n / g}/${d / g}`;
};

function seiritsu(r: Rng): QuestionBody {
  const a = r.int(3, 12);
  let b = r.int(3, 12);
  if (b === a) b = a + 2;
  const lo = Math.abs(a - b);
  const hi = a + b;
  const ans = hi - lo - 1;
  return {
    prompt: `3辺の長さが ${a}、${b}、x である三角形がある。x がとりうる整数の値は何個あるか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(ans)], unit: "個", calc: `(${hi}-1)-(${lo}+1)+1` },
    point: "|b−c|＜a＜b＋c。等号は入らない",
    steps: [
      { title: "三角形ができる条件", body: `|${a}−${b}|＜x＜${a}＋${b} より、{{${lo}＜x＜${hi}}}。`, back: [BACK_JOKEN] },
      { title: "整数を数える", body: `x＝${lo + 1}, …, ${hi - 1} の {{${ans}個}}。`, trap: `x＝${hi} や x＝${lo} では3点が一直線に並び、三角形になりません。` },
    ],
  };
}

function juushin(r: Rng): QuestionBody {
  const kind = r.pick(["ag", "gm", "men"] as const);
  if (kind === "ag") {
    const am = 3 * r.int(2, 9);
    return {
      prompt: `△ABC の重心を G、辺 BC の中点を M とする。AM＝${am} のとき、AG の長さを求めなさい。`,
      answer: { kind: "num", answerKind: "num", answer: [String((am * 2) / 3)], calc: `${am}*2/3` },
      point: "重心は中線を頂点から 2:1 に内分する",
      steps: [{ title: "2:1 に分ける", body: `AG:GM＝2:1 なので AG＝${am}×2/3＝{{${(am * 2) / 3}}}。`, trap: "1:2 と逆にしない。頂点に近いほうが長い。", back: [BACK_SHIN] }],
    };
  }
  if (kind === "gm") {
    const ag = 2 * r.int(2, 9);
    return {
      prompt: `△ABC の重心を G とし、直線 AG と辺 BC の交点を M とする。AG＝${ag} のとき、中線 AM の長さを求めなさい。`,
      answer: { kind: "num", answerKind: "num", answer: [String((ag * 3) / 2)], calc: `${ag}+${ag}/2` },
      point: "AG:GM＝2:1。GM は AG の半分",
      steps: [{ title: "2:1 を使う", body: `GM＝${ag}÷2＝${ag / 2} なので AM＝${ag}＋${ag / 2}＝{{${(ag * 3) / 2}}}。`, back: [BACK_SHIN] }],
    };
  }
  const S = 6 * r.int(3, 15);
  return {
    prompt: `面積が ${S} の △ABC の重心を G とする。△GBC の面積を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(S / 3)], calc: `${S}/3` },
    point: "底辺が同じなら、面積の比は高さの比",
    steps: [
      { title: "高さの比", body: "A を通る中線 AM 上で GM:AM＝1:3 なので、BC を底辺とすると △GBC の高さは △ABC の 1/3。", back: [BACK_SHIN] },
      { title: "面積", body: `△GBC＝${S}×1/3＝{{${S / 3}}}。` },
    ],
  };
}

function nitoubun(r: Rng): QuestionBody {
  let c = 0;
  let b = 0;
  let a = 0;
  for (let i = 0; i < 50; i++) {
    c = r.int(4, 12);
    b = r.int(3, 11);
    a = r.int(4, 13);
    if (c !== b && a < b + c && b < a + c && c < a + b) break;
  }
  const bd = fr(a * c, b + c);
  return {
    prompt: `△ABC において、AB＝${c}、AC＝${b}、BC＝${a} とする。∠A の二等分線と辺 BC の交点を D とするとき、BD の長さを求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [bd], calc: `${a}*${c}/(${c}+${b})` },
    point: "BD:DC＝AB:AC。BC をその比に分ける",
    steps: [
      { title: "辺の比", body: `BD:DC＝AB:AC＝{{${c}:${b}}}。`, back: [BACK_NITO] },
      { title: "BC を分ける", body: `BD＝${a}×${c}/(${c}＋${b})＝{{${bd}}}。`, trap: `BD:DC を BC の長さで決めない。比を決めるのは、となりの2辺 AB と AC です。` },
    ],
  };
}

function kakudo(r: Rng): QuestionBody {
  const A = r.step(30, 80, 2);
  if (r.bool()) {
    return {
      prompt: `△ABC の外心を O とする。∠BAC＝${A}° のとき、∠BOC の大きさを求めなさい。`,
      answer: { kind: "num", answerKind: "num", answer: [String(2 * A)], unit: "°", calc: `2*${A}` },
      point: "外心は外接円の中心。中心角＝円周角の2倍",
      steps: [
        { title: "外接円で見る", body: "O は外接円の中心なので、∠BOC は弧 BC に対する中心角、∠BAC は円周角です。", back: [BACK_SHIN] },
        { title: "2倍", body: `∠BOC＝2×${A}°＝{{${2 * A}°}}。`, trap: "内心 I の ∠BIC（90°＋∠A/2）と混同しない。" },
      ],
    };
  }
  const ans = 90 + A / 2;
  return {
    prompt: `△ABC の内心を I とする。∠BAC＝${A}° のとき、∠BIC の大きさを求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [String(ans)], unit: "°", calc: `180-(180-${A})/2` },
    point: "内心は角の二等分線の交点。∠B、∠C の半分をたす",
    steps: [
      { title: "∠B＋∠C", body: `∠B＋∠C＝180°−${A}°＝${180 - A}°。BI、CI は二等分線なので、∠IBC＋∠ICB＝${(180 - A) / 2}°。`, back: [BACK_SHIN] },
      { title: "△IBC の内角", body: `∠BIC＝180°−${(180 - A) / 2}°＝{{${ans}°}}。`, trap: "外心のように 2 倍（∠BOC＝2∠A）にしない。" },
    ],
  };
}

function cheva(r: Rng): QuestionBody {
  let p = 0;
  let q = 0;
  let s = 0;
  let t = 0;
  for (let i = 0; i < 40; i++) {
    p = r.int(1, 5);
    q = r.int(1, 5);
    s = r.int(1, 5);
    t = r.int(1, 5);
    if (gcd(p, q) === 1 && gcd(s, t) === 1 && !(p === q && s === t)) break;
  }
  const ans = fr(q * t, p * s);
  return {
    prompt: `△ABC の内部に点 P があり、直線 AP、BP、CP と辺 BC、CA、AB の交点をそれぞれ D、E、F とする。AF:FB＝${p}:${q}、BD:DC＝${s}:${t} のとき、CE/EA の値を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [ans], calc: `1/((${s}/${t})*(${p}/${q}))` },
    point: "(BD/DC)(CE/EA)(AF/FB)＝1。頂点→分点→頂点と1周",
    steps: [
      { title: "チェバの定理", body: `(BD/DC)×(CE/EA)×(AF/FB)＝1 に入れて、(${s}/${t})×(CE/EA)×(${p}/${q})＝1。`, back: [BACK_CM] },
      { title: "解く", body: `CE/EA＝(${t}/${s})×(${q}/${p})＝{{${ans}}}。`, trap: "分子と分母の向きをそろえる。B→D→C→E→A→F→B と1周する順に辺を書きます。" },
    ],
  };
}

function menelaus(r: Rng): QuestionBody {
  let m = 0;
  let n = 0;
  let u = 0;
  let v = 0;
  for (let i = 0; i < 40; i++) {
    m = r.int(1, 5);
    n = r.int(1, 5);
    u = r.int(1, 5);
    v = r.int(1, 5);
    if (gcd(m, n) === 1 && gcd(u, v) === 1 && !(m === n && u === v)) break;
  }
  const ans = fr((m + n) * v, m * u);
  return {
    prompt: `△ABC の辺 BC を ${m}:${n} に内分する点を D、辺 CA を ${u}:${v} に内分する点を E とし、線分 AD と BE の交点を P とする。AP/PD の値を求めなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [ans], calc: `1/((${m}/(${m}+${n}))*(${u}/${v}))` },
    point: "△ADC と直線 BE でメネラウスの定理を使う",
    steps: [
      { title: "三角形と直線を決める", body: `△ADC と、B, P, E を通る直線で考えます。BD:DC＝${m}:${n} なので {{DB:BC＝${m}:${m + n}}}。`, back: [BACK_CM] },
      { title: "メネラウスの定理", body: `(AP/PD)×(DB/BC)×(CE/EA)＝1 より、(AP/PD)×(${m}/${m + n})×(${u}/${v})＝1。`, trap: `DB/BC を BD/DC（${m}/${n}）にしない。△ADC の辺 DC の延長上の点 B で分けた比です。` },
      { title: "解く", body: `AP/PD＝(${m + n}/${m})×(${v}/${u})＝{{${ans}}}。` },
    ],
  };
}

export const H_MATH_A_SANKAKUKEI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "math",
  grade: "数学A",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "三角形の成立条件と重心",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "seiritsu", type: "A", difficulty: 1, points: 14, seconds: 90, skill: "知識・技能", generate: seiritsu },
        { id: "juushin", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: juushin },
      ],
    },
    {
      title: "二等分線・外心・内心・チェバの定理",
      lead: "次の問いに答えなさい。答えが分数のときは既約分数で答えなさい。",
      style: "mix",
      questions: [
        { id: "nitoubun", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "知識・技能", generate: nitoubun },
        { id: "kakudo", type: "A", difficulty: 2, points: 16, seconds: 120, skill: "思考・判断・表現", generate: kakudo },
        { id: "cheva", type: "A", difficulty: 2, points: 18, seconds: 150, skill: "知識・技能", generate: cheva },
      ],
    },
    {
      title: "メネラウスの定理",
      lead: "次の問いに答えなさい。答えが分数のときは既約分数で答えなさい。",
      style: "word",
      questions: [{ id: "menelaus", type: "A", difficulty: 3, points: 22, seconds: 240, skill: "思考・判断・表現", generate: menelaus }],
    },
  ],
};
