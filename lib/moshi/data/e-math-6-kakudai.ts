// 小6算数「拡大図と縮図」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 拡大・縮小の倍率と縮尺 (1/1000 など) を先に決め、長さは掛け算で作る。答えは整数か小数第2位まで。
// calc (問題の数から答えを出す式) で答えを検算する (scripts/check-moshi.ts がシード100個で確かめる)。
import type { NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-6-kakudai";
const L = (n: number) => `/learn/lecture/${U}#lec-s${n}`;
const BACK_KATACHI = { label: "形を変えずに大きく・小さくした図", href: L(1) };
const BACK_SENBUN = { label: "辺の長さを線分図でくらべる", href: L(2) };
const BACK_NANBAI = { label: "何倍かを求めて、ほかの辺に使う", href: L(3) };
const BACK_SHUKU = { label: "縮尺：実際の長さをどれだけ縮めたか", href: L(4) };
const BACK_CHIZU = { label: "地図のものさしで読む", href: L(5) };
const BACK_KAGE = { label: "かげの縮図で、測れない高さを求める", href: L(6) };

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const num = (answer: number, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [f(answer)], calc, ...(unit ? { unit } : {}) });

function hen(r: Rng): QuestionBody {
  const big = r.bool();
  const k = big ? r.pick([2, 3, 4]) : r.pick([2, 3, 4]);
  const base = big ? r.int(2, 9) : r.int(2, 9) * k;
  const ans = big ? base * k : base / k;
  const name = big ? `${k}倍の拡大図` : `1/${k}の縮図`;
  return {
    prompt: `三角形ABCの${name}を三角形DEFとします（AとD、BとE、CとFが対応）。辺BCが ${base}cm のとき、辺EFは何cmですか。`,
    answer: num(ans, big ? `${base}*${k}` : `${base}/${k}`, "cm"),
    point: big ? `${k}倍の拡大図では、どの辺も${k}倍` : `1/${k}の縮図では、どの辺も1/${k}`,
    steps: [{ title: "対応する辺を同じ倍に", body: `辺EFは辺BCに対応するので、${base}${big ? `×${k}` : `÷${k}`}＝{{${f(ans)}}}（cm）です。`, back: [BACK_KATACHI] }],
  };
}

function kaku(r: Rng): QuestionBody {
  const k = r.pick([2, 3, 4]);
  const big = r.bool();
  const b = r.int(30, 80);
  const c = r.int(30, 150 - b);
  return {
    prompt: `三角形ABCの角Bは ${b}°、角Cは ${c}° です。三角形ABCの${big ? `${k}倍の拡大図` : `1/${k}の縮図`}を三角形DEFとすると（BとE、CとFが対応）、角Eは何度ですか。`,
    answer: num(b, `${b}`, "°"),
    point: "拡大図・縮図では、対応する角の大きさは変わらない",
    steps: [{ title: "角はそのまま", body: `形を変えずに大きさだけ変えるので、対応する角は等しく、角E＝角B＝{{${b}°}} です。`, trap: `${b}${big ? "×" : "÷"}${k} としない。倍にするのは辺の長さだけです。`, back: [BACK_KATACHI] }],
  };
}

const SCALES = [1000, 2000, 2500, 5000, 10000, 20000, 25000, 50000];

function jissai(r: Rng): QuestionBody {
  const s = r.pick(SCALES);
  const cm = r.int(2, 16) / (s >= 20000 ? 2 : 1);
  const m = (cm * s) / 100;
  const km = s >= 20000;
  const ans = km ? m / 1000 : m;
  return {
    prompt: `縮尺 1/${s} の地図で、${f(cm)}cm の長さは、実際には何${km ? "km" : "m"}ですか。`,
    answer: num(ans, km ? `${f(cm)}*${s}/100000` : `${f(cm)}*${s}/100`, km ? "km" : "m"),
    point: "実際の長さ＝地図の長さ×縮尺の分母。最後に単位を直す",
    steps: [
      { title: "分母をかける", body: `${f(cm)}×${s}＝${f(cm * s)}（cm）です。`, back: [BACK_SHUKU] },
      { title: "単位を直す", body: km ? `${f(cm * s)}cm＝${f(m)}m＝{{${f(ans)}km}} です。` : `${f(cm * s)}cm＝{{${f(m)}m}} です。`, trap: "cm のまま答えない。100cm＝1m、1000m＝1km。" },
    ],
  };
}

function chizu(r: Rng): QuestionBody {
  const s = r.pick([10000, 20000, 25000, 50000]);
  const cm = r.int(2, 20) / 2;
  const realM = (cm * s) / 100;
  return {
    prompt: `家から駅までの実際の道のりは ${f(realM)}m です。縮尺 1/${s} の地図では、何cmになりますか。`,
    answer: num(cm, `${f(realM)}*100/${s}`, "cm"),
    point: "地図の長さ＝実際の長さ÷縮尺の分母（単位をcmにそろえて）",
    steps: [
      { title: "cm にそろえる", body: `${f(realM)}m＝${f(realM * 100)}cm です。`, back: [BACK_CHIZU] },
      { title: "分母でわる", body: `${f(realM * 100)}÷${s}＝{{${f(cm)}}}（cm）です。`, back: [BACK_SHUKU] },
    ],
  };
}

function nanbai(r: Rng): QuestionBody {
  const k = r.pick([1.5, 2.5, 3, 1.2, 0.5, 0.4]);
  const ab = r.int(3, 9) * 2;
  const bc = r.int(3, 9) * 2;
  const de = (ab * k * 10) / 10;
  const ef = (bc * k * 10) / 10;
  const shrink = k < 1;
  return {
    prompt: `三角形DEFは三角形ABCの${shrink ? "縮図" : "拡大図"}で、AとD、BとE、CとFが対応しています。辺ABは ${ab}cm、辺BCは ${bc}cm、辺DEは ${f(de)}cm です。辺EFは何cmですか。`,
    answer: num(ef, `${bc}*${f(de)}/${ab}`, "cm"),
    point: "わかっている対応する辺の組から、何倍かを求める",
    steps: [
      { title: "何倍か", body: `辺DEは辺ABの ${f(de)}÷${ab}＝${f(k)}（倍）です。`, back: [BACK_NANBAI, BACK_SENBUN] },
      { title: "ほかの辺にも使う", body: `辺EF＝${bc}×${f(k)}＝{{${f(ef)}}}（cm）です。`, trap: `${bc}＋（${f(de)}−${ab}）のように、ちがいをたさない。長さは「何倍」でつながっています。` },
    ],
  };
}

function kage(r: Rng): QuestionBody {
  const stick = r.pick([1, 1.5, 2]);
  const shadow = r.pick([0.8, 1.2, 1.5, 2, 2.4, 3]);
  const k = r.int(3, 12);
  const treeShadow = shadow * k;
  const tree = stick * k;
  const thing = r.pick(["木", "校舎", "電柱"]);
  return {
    prompt: `晴れた日の同じ時こくに、長さ ${f(stick)}m のぼうを地面に垂直に立てたら、かげの長さは ${f(shadow)}m でした。${thing}のかげの長さは ${f(treeShadow)}m でした。${thing}の高さは何mですか。`,
    answer: num(tree, `${f(stick)}*${f(treeShadow)}/${f(shadow)}`, "m"),
    point: "ぼうとかげの三角形は、木とかげの三角形の縮図",
    steps: [
      { title: "かげは何倍か", body: `${thing}のかげは、ぼうのかげの ${f(treeShadow)}÷${f(shadow)}＝${k}（倍）です。`, back: [BACK_KAGE] },
      { title: "高さも同じ倍", body: `${thing}の高さも、ぼうの${k}倍なので、${f(stick)}×${k}＝{{${f(tree)}}}（m）です。`, trap: `${f(treeShadow)}×${f(stick)} のように、かげの長さにぼうの長さをかけない。`, back: [BACK_NANBAI] },
    ],
  };
}

export const E_MATH_6_KAKUDAI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小6",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "拡大図・縮図と縮尺",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "hen", type: "A", difficulty: 1, points: 15, seconds: 45, skill: "知識・技能", generate: hen },
        { id: "kaku", type: "A", difficulty: 1, points: 15, seconds: 45, skill: "知識・技能", generate: kaku },
        { id: "jissai", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: jissai },
      ],
    },
    {
      title: "何倍かを求めて使う",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "chizu", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "知識・技能", generate: chizu },
        { id: "nanbai", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "思考・判断・表現", generate: nanbai },
      ],
    },
    {
      title: "測れない高さを求める",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [{ id: "kage", type: "A", difficulty: 3, points: 21, seconds: 180, skill: "思考・判断・表現", generate: kage }],
    },
  ],
};
