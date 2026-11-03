// 小5算数「正多角形と円周」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 円周率はレクチャーと同じ 3.14。直径・半径は整数で作り、円周から直径を求める問題は先に直径を決めて円周を作る。
// calc (問題の数から答えを出す式) で答えを検算する (scripts/check-moshi.ts がシード100個で確かめる)。
import type { ChoiceQ, NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-5-seitakakkei";
const L = (n: number) => `/learn/lecture/${U}#lec-s${n}`;
const BACK_SEI = { label: "正多角形は「辺も角も」すべて等しい", href: L(1) };
const BACK_KAKU = { label: "円の中心のまわりの角を等分してかく", href: L(2) };
const BACK_314 = { label: "円周は、直径の約3.14倍", href: L(3) };
const BACK_HASAMU = { label: "円を正多角形ではさむ（昔の人の考え方）", href: L(4) };
const BACK_SHIKI = { label: "円周＝直径×3.14、直径＝円周÷3.14", href: L(5) };

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const num = (answer: number, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [f(answer)], calc, ...(unit ? { unit } : {}) });
function choice(r: Rng, right: [string, string], wrongs: [string, string][]): ChoiceQ {
  const all = r.shuffle([{ t: right[0], w: right[1], ok: true }, ...wrongs.map(([t, w]) => ({ t, w, ok: false }))]);
  return { kind: "choice", options: all.map((x) => x.t), correct: all.findIndex((x) => x.ok), why: all.map((x) => x.w) };
}
/** 3.14×整数 を誤差なく */
const pi = (k: number) => (314 * k) / 100;
const NAME: Record<number, string> = { 3: "三", 4: "四", 5: "五", 6: "六", 8: "八", 9: "九", 10: "十", 12: "十二", 15: "十五", 18: "十八", 20: "二十" };

function enshu(r: Rng): QuestionBody {
  const d = r.int(2, 40);
  const c = pi(d);
  return {
    prompt: `直径が ${d}cm の円の、円周の長さは何cmですか。円周率は3.14とします。`,
    answer: num(c, `${d}*3.14`, "cm"),
    point: "円周＝直径×3.14",
    steps: [{ title: "直径×3.14", body: `${d}×3.14＝{{${f(c)}}}（cm）です。`, back: [BACK_SHIKI] }],
  };
}

function chokkei(r: Rng): QuestionBody {
  const d = r.int(2, 50);
  const c = pi(d);
  return {
    prompt: `円周の長さが ${f(c)}cm の円の、直径は何cmですか。円周率は3.14とします。`,
    answer: num(d, `${f(c)}/3.14`, "cm"),
    point: "直径＝円周÷3.14",
    steps: [{ title: "円周÷3.14", body: `直径×3.14＝${f(c)} なので、直径＝${f(c)}÷3.14＝{{${d}}}（cm）です。`, back: [BACK_SHIKI] }],
  };
}

function chushin(r: Rng): QuestionBody {
  const n = r.pick([3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20]);
  return {
    prompt: `円の中心のまわりの角を等分して、${n === 4 ? "正方形" : `正${NAME[n]}角形`}をかきます。中心のまわりの角を何度ずつに分ければよいですか。`,
    answer: num(360 / n, `360/${n}`, "°"),
    point: "中心のまわりの角360°を、辺の数で等分する",
    steps: [{ title: "360°を等分", body: `${n === 4 ? "正方形" : `正${NAME[n]}角形`}は辺が${n}本なので、360÷${n}＝{{${360 / n}}}（°）ずつに分けます。`, back: [BACK_KAKU] }],
  };
}

function hankei(r: Rng): QuestionBody {
  const rr = r.int(2, 25);
  const c = pi(rr * 2);
  const what = r.pick(["円", "丸い池", "丸いお皿"]);
  const unit = what === "丸い池" ? "m" : "cm";
  return {
    prompt: what === "円" ? `半径が ${rr}${unit} の円の、まわりの長さは何${unit}ですか。円周率は3.14とします。` : `半径が ${rr}${unit} の${what}があります。${what.slice(2)}のまわりの長さは何${unit}ですか。円周率は3.14とします。`,
    answer: num(c, `${rr}*2*3.14`, unit),
    point: "半径なら、まず2倍して直径に",
    steps: [
      { title: "直径を出す", body: `直径は半径の2倍なので、${rr}×2＝${rr * 2}（${unit}）です。`, back: [BACK_SHIKI] },
      { title: "直径×3.14", body: `${rr * 2}×3.14＝{{${f(c)}}}（${unit}）です。`, trap: `${rr}×3.14 としない。円周は「直径」の約3.14倍です。`, back: [BACK_314] },
    ],
  };
}

const SEI: [string, string][] = [
  ["正方形", "4つの辺の長さも、4つの角の大きさもすべて等しいので正多角形です。"],
  ["正三角形", "3つの辺も3つの角もすべて等しいので正多角形です。"],
  ["正六角形", "6つの辺も6つの角もすべて等しいので正多角形です。"],
];
const NOT_SEI: [string, string][] = [
  ["ひし形", "辺の長さはすべて等しいが、角の大きさが等しいとはかぎらないので、正多角形とはいえません。"],
  ["長方形", "角はすべて等しいが、辺の長さが等しいとはかぎらないので、正多角形とはいえません。"],
  ["二等辺三角形", "2つの辺しか等しくないので、正多角形ではありません。"],
  ["平行四辺形", "辺も角も、すべて等しいとはかぎらないので、正多角形ではありません。"],
];

function teigi(r: Rng): QuestionBody {
  const yes = r.bool();
  return {
    prompt: yes ? "次の図形のうち、正多角形はどれですか。" : "次の図形のうち、正多角形ではないものはどれですか。",
    answer: yes ? choice(r, r.pick(SEI), r.sample(NOT_SEI, 3)) : choice(r, r.pick(NOT_SEI), r.sample(SEI, 3)),
    point: "辺の長さも角の大きさも、すべて等しいのが正多角形",
    steps: [{ title: "辺と角の両方を確かめる", body: "{{辺の長さがすべて等しく、角の大きさもすべて等しい}}多角形を正多角形といいます。どちらか一方だけでは正多角形ではありません。", back: [BACK_SEI] }],
  };
}

function rokkaku(r: Rng): QuestionBody {
  const rr = r.int(3, 20);
  const c = pi(rr * 2);
  return {
    prompt: `半径 ${rr}cm の円の中に、6つの頂点《ちょうてん》が円周の上にある正六角形をかきました。正六角形のまわりの長さと円周の長さのちがいは何cmですか。円周率は3.14とします。`,
    answer: num(c - 6 * rr, `${rr}*2*3.14-6*${rr}`, "cm"),
    point: "正六角形の1辺は半径と同じ。まわりは半径の6倍",
    steps: [
      { title: "正六角形のまわり", body: `正六角形は、1辺が半径と等しい正三角形6つに分けられます。まわりは ${rr}×6＝${6 * rr}（cm）です。`, back: [BACK_HASAMU] },
      { title: "円周", body: `${rr * 2}×3.14＝${f(c)}（cm）です。`, back: [BACK_SHIKI] },
      { title: "ちがい", body: `${f(c)}−${6 * rr}＝{{${f(c - 6 * rr)}}}（cm）。円周の方が少し長くなります。` },
    ],
  };
}

function hanen(r: Rng): QuestionBody {
  const d = r.step(4, 40, 2);
  const arc = pi(d) / 2;
  const ans = arc + d;
  return {
    prompt: `直径 ${d}cm の円を、直径で半分に切った形（半円）があります。この半円のまわりの長さは何cmですか。円周率は3.14とします。`,
    answer: num(ans, `${d}*3.14/2+${d}`, "cm"),
    point: "半円のまわり＝円周の半分＋直径",
    steps: [
      { title: "曲線の部分", body: `円周の半分なので、${d}×3.14÷2＝${f(arc)}（cm）です。`, back: [BACK_SHIKI] },
      { title: "直線の部分をたす", body: `切り口の直径${d}cmをたして、${f(arc)}＋${d}＝{{${f(ans)}}}（cm）です。`, trap: `${f(arc)}cm で止めない。まわりには、まっすぐな直径の部分もあります。` },
    ],
  };
}

export const E_MATH_5_SEITAKAKKEI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小5",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "円周と正多角形",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "enshu", type: "A", difficulty: 1, points: 12, seconds: 45, skill: "知識・技能", generate: enshu },
        { id: "chokkei", type: "A", difficulty: 1, points: 12, seconds: 60, skill: "知識・技能", generate: chokkei },
        { id: "chushin", type: "A", difficulty: 1, points: 12, seconds: 45, skill: "知識・技能", generate: chushin },
      ],
    },
    {
      title: "半径・正多角形の考え方",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "hankei", type: "A", difficulty: 2, points: 15, seconds: 60, skill: "知識・技能", generate: hankei },
        { id: "teigi", type: "A", difficulty: 2, points: 15, seconds: 60, skill: "知識・技能", generate: teigi },
        { id: "rokkaku", type: "A", difficulty: 2, points: 15, seconds: 120, skill: "思考・判断・表現", generate: rokkaku },
      ],
    },
    {
      title: "半円のまわりの長さ",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [{ id: "hanen", type: "A", difficulty: 3, points: 19, seconds: 150, skill: "思考・判断・表現", generate: hanen }],
    },
  ],
};
