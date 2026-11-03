// 小5算数「角柱と円柱」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// □角柱の面・辺・頂点の数は底面の辺の数 n から (面 n+2、辺 3n、頂点 2n)。円柱の展開図は円周率3.14 (レクチャーと同じ)。
// calc (問題の数から答えを出す式) で答えを検算する (scripts/check-moshi.ts がシード100個で確かめる)。
import type { NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-5-kakuchu";
const L = (n: number) => `/learn/lecture/${U}#lec-s${n}`;
const BACK_NAMAE = { label: "底面の形で名前が決まる", href: L(1) };
const BACK_KAZU = { label: "面・辺・頂点《ちょうてん》の数は、底面の辺の数から", href: L(2) };
const BACK_SOKU = { label: "側面の形と高さ", href: L(3) };
const BACK_EN = { label: "円柱の展開図《てんかいず》：側面は長方形", href: L(4) };
const BACK_KAKU = { label: "角柱の展開図《てんかいず》をかく順番", href: L(5) };

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const num = (answer: number, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [f(answer)], calc, ...(unit ? { unit } : {}) });
const NAME: Record<number, string> = { 3: "三", 4: "四", 5: "五", 6: "六", 7: "七", 8: "八", 9: "九", 10: "十", 11: "十一", 12: "十二", 15: "十五", 20: "二十" };
const NS = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 20];

function men(r: Rng): QuestionBody {
  const n = r.pick(NS);
  return {
    prompt: `${NAME[n]}角柱の面の数は、全部でいくつですか。`,
    answer: num(n + 2, `${n}+2`, "こ"),
    point: "面の数＝側面（底面の辺の数）＋底面2つ",
    steps: [{ title: "側面と底面", body: `側面は底面の辺の数と同じ${n}こ、底面は上と下の2こ。${n}＋2＝{{${n + 2}}}（こ）です。`, back: [BACK_KAZU, BACK_NAMAE] }],
  };
}

function henQ(r: Rng): QuestionBody {
  const n = r.pick(NS);
  return {
    prompt: `${NAME[n]}角柱の辺の数は、全部でいくつですか。`,
    answer: num(3 * n, `${n}*3`, "本"),
    point: "辺の数＝上の底面＋下の底面＋側面の間の辺",
    steps: [{ title: "3つに分けて数える", body: `上の底面に${n}本、下の底面に${n}本、上と下をつなぐ辺が${n}本。${n}×3＝{{${3 * n}}}（本）です。`, back: [BACK_KAZU] }],
  };
}

function chouten(r: Rng): QuestionBody {
  const n = r.pick(NS);
  return {
    prompt: `${NAME[n]}角柱の頂点《ちょうてん》の数は、全部でいくつですか。`,
    answer: num(2 * n, `${n}*2`, "こ"),
    point: "頂点《ちょうてん》は、上と下の底面に n こずつ",
    steps: [{ title: "上と下に分ける", body: `上の底面に${n}こ、下の底面に${n}こ。${n}×2＝{{${2 * n}}}（こ）です。`, back: [BACK_KAZU] }],
  };
}

function namae(r: Rng): QuestionBody {
  const n = r.pick([4, 5, 6, 7, 8, 9, 10, 12]);
  const mode = r.pick(["辺", "頂点《ちょうてん》", "面"] as const);
  const v = mode === "辺" ? 3 * n : mode === "面" ? n + 2 : 2 * n;
  const calc = mode === "辺" ? `${v}/3` : mode === "面" ? `${v}-2` : `${v}/2`;
  const how = mode === "辺" ? `辺の数は底面の辺の数の3倍なので、${v}÷3＝${n}` : mode === "面" ? `面の数は底面の辺の数より2多いので、${v}−2＝${n}` : `頂点《ちょうてん》の数は底面の辺の数の2倍なので、${v}÷2＝${n}`;
  return {
    prompt: `${mode}の数が ${v} の角柱があります。この角柱は何角柱ですか。数字で答えなさい。`,
    answer: num(n, calc, "角柱"),
    point: "面・辺・頂点《ちょうてん》の数から、底面の辺の数にもどす",
    steps: [
      { title: "底面の辺の数を求める", body: `${how}。`, back: [BACK_KAZU] },
      { title: "名前", body: `底面が${n}角形なので、{{${n}角柱}}（${NAME[n]}角柱）です。`, back: [BACK_NAMAE] },
    ],
  };
}

function enchu(r: Rng): QuestionBody {
  const d = r.int(2, 20);
  const h = r.int(3, 20);
  const yoko = (314 * d) / 100;
  const askYoko = r.bool();
  return {
    prompt: `底面の直径が ${d}cm、高さが ${h}cm の円柱の展開図《てんかいず》をかきます。側面の長方形の${askYoko ? "横" : "たて"}の長さは何cmですか。${askYoko ? "円周率は3.14とします。" : ""}（側面の長方形の横は、底面の円のまわりにくっつく辺とします。）`,
    answer: askYoko ? num(yoko, `${d}*3.14`, "cm") : num(h, `${h}`, "cm"),
    point: askYoko ? "側面の横の長さ＝底面の円周＝直径×3.14" : "側面のたての長さ＝円柱の高さ",
    steps: askYoko
      ? [{ title: "底面の円周と同じ", body: `側面の横は底面の円のまわりにぴったりつくので、円周と同じです。${d}×3.14＝{{${f(yoko)}}}（cm）です。`, trap: `直径の${d}cmにしない。円のまわりにまきつく長さです。`, back: [BACK_EN] }]
      : [{ title: "高さと同じ", body: `側面のたての長さは円柱の高さと同じで、{{${h}cm}} です。`, back: [BACK_EN, BACK_SOKU] }],
  };
}

function sokumen(r: Rng): QuestionBody {
  const n = r.pick([3, 4, 5, 6, 8]);
  const a = r.int(2, 9);
  const h = r.int(3, 12);
  return {
    prompt: `底面が1辺 ${a}cm の${n === 4 ? "正方形" : `正${NAME[n]}角形`}で、高さが ${h}cm の${NAME[n]}角柱があります。この角柱の展開図《てんかいず》で、側面を1つの長方形になるようにならべてかきました。その長方形の面積は何cm²ですか。`,
    answer: num(n * a * h, `${n}*${a}*${h}`, "cm²"),
    point: "側面全体の長方形の横＝底面のまわりの長さ",
    steps: [
      { title: "側面の長方形の横", body: `側面は${n}つの長方形で、ならべると横は底面のまわりの長さ ${a}×${n}＝${a * n}（cm）、たては高さの${h}cmです。`, back: [BACK_KAKU, BACK_SOKU] },
      { title: "面積", body: `${a * n}×${h}＝{{${n * a * h}}}（cm²）です。`, trap: `${a}×${h} は側面1つ分。側面は${n}つあります。` },
    ],
  };
}

export const E_MATH_5_KAKUCHU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小5",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "面・辺・頂点《ちょうてん》の数",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "men", type: "A", difficulty: 1, points: 15, seconds: 45, skill: "知識・技能", generate: men },
        { id: "hen", type: "A", difficulty: 1, points: 15, seconds: 45, skill: "知識・技能", generate: henQ },
        { id: "chouten", type: "A", difficulty: 1, points: 15, seconds: 45, skill: "知識・技能", generate: chouten },
      ],
    },
    {
      title: "角柱の名前と円柱の展開図《てんかいず》",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "namae", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "思考・判断・表現", generate: namae },
        { id: "enchu", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "知識・技能", generate: enchu },
      ],
    },
    {
      title: "角柱の展開図《てんかいず》と側面",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [{ id: "sokumen", type: "A", difficulty: 3, points: 21, seconds: 150, skill: "思考・判断・表現", generate: sokumen }],
    },
  ],
};
