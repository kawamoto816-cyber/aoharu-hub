// 小4算数「直方体と立方体」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 直方体は同じ長さの辺が4本ずつ3組 (辺の合計＝(たて＋横＋高さ)×4)、立方体の展開図《てんかいず》のまわりは1辺の14こ分。答えは calc で確かめる (scripts/check-moshi.ts がシード100個)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-4-chokuhotai";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_CHIGAI = L(1, "直方体と立方体のちがい");
const B_HEN = L(2, "見取図と、辺が12本になるわけ");
const B_HEIKOU = L(3, "向かい合う面は平行、となり合う面は垂直《すいちょく》");
const B_TENKAI = L(4, "展開図《てんかいず》は、箱を切り開いた形");
const B_ICHI = L(5, "位置は数の組で表す");

function henGoukei(r: Rng): QuestionBody {
  const a = r.int(3, 12);
  const b = r.int(3, 12);
  const c = r.int(2, 10);
  return {
    prompt: `たて${a}cm、横${b}cm、高さ${c}cmの直方体があります。この直方体の辺の長さを全部たすと、何cmですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(4 * (a + b + c))], unit: "cm", calc: `(${a}+${b}+${c})*4` },
    point: "同じ長さの辺が4本ずつ、3組ある",
    steps: [
      { title: "4本ずつ3組", body: `たての辺・横の辺・高さの辺が、それぞれ4本ずつあります（合わせて12本）。`, back: [B_HEN] },
      { title: "たす", body: `(${a}＋${b}＋${c})×4＝${a + b + c}×4＝{{${4 * (a + b + c)}}}（cm）。`, trap: `${a}＋${b}＋${c} で止めない。辺は12本あります。` },
    ],
  };
}

function rippoutai(r: Rng): QuestionBody {
  const a = r.int(2, 15);
  const what = r.pick(["サイコロ", "つみ木", "箱"]);
  return {
    prompt: `1辺が${a}cmの立方体の${what}があります。辺の長さを全部たすと、何cmですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(12 * a)], unit: "cm", calc: `${a}*12` },
    point: "立方体の辺は12本で、みんな同じ長さ",
    steps: [{ title: "12本分", body: `立方体の辺は12本とも${a}cmなので、${a}×12＝{{${12 * a}}}（cm）。`, back: [B_CHIGAI, B_HEN] }],
  };
}

function kazu(r: Rng): QuestionBody {
  const n = r.int(2, 9);
  const kind = r.int(0, 2);
  const [name, per] = kind === 0 ? ["面", 6] : kind === 1 ? ["辺", 12] : ["頂点《ちょうてん》", 8];
  const what = r.pick(["直方体の箱", "立方体のサイコロ"]);
  return {
    prompt: `${what}が${n}こあります。${n}こ全部の${name}の数を合わせると、いくつですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(per * n)], calc: `${per}*${n}` },
    point: "直方体も立方体も、面6・辺12・頂点《ちょうてん》8",
    steps: [{ title: `1こ分の${name}の数`, body: `直方体も立方体も、${name}は1こに${per}あります。${per}×${n}＝{{${per * n}}}。`, back: [B_CHIGAI, B_HEN] }],
  };
}

function tenkai(r: Rng): QuestionBody {
  const a = r.int(2, 15);
  return {
    prompt: `1辺が${a}cmの立方体を、辺にそって切り開いて展開図《てんかいず》をつくりました。展開図《てんかいず》のまわりの長さは何cmですか。（どんな切り開き方をしても同じになります。）`,
    answer: { kind: "num", answerKind: "num", answer: [String(14 * a)], unit: "cm", calc: `(4*6-5*2)*${a}` },
    point: "つながったままの辺は、まわりに入らない",
    steps: [
      { title: "まわりの辺の数", body: `正方形6まいで、辺は 4×6＝24（本分）。展開図《てんかいず》では正方形が5か所でつながっていて、そこは2本分がまわりに出ません。24−5×2＝14（本分）です。`, back: [B_TENKAI] },
      { title: "長さにする", body: `${a}×14＝{{${14 * a}}}（cm）。`, trap: "4×6＝24本分のままにしない。つながっている辺は、まわりに出ません。" },
    ],
  };
}

function heikou(r: Rng): QuestionBody {
  const a = r.int(3, 9);
  let b = r.int(3, 9);
  if (b === a) b = a + 1;
  const c = r.int(2, 8);
  const kind = r.bool();
  const opts = kind ? ["1つ", "2つ", "4つ", "5つ"] : ["1つ", "2つ", "4つ", "6つ"];
  const correct = kind ? 0 : 2;
  return {
    prompt: `たて${a}cm、横${b}cm、高さ${c}cmの直方体で、上の面に${kind ? "平行" : "垂直《すいちょく》"}な面はいくつありますか。`,
    answer: {
      kind: "choice",
      options: opts,
      correct,
      why: opts.map((o, i) =>
        i === correct
          ? kind
            ? "上の面と向かい合う下の面だけが平行です。"
            : "上の面ととなり合う、まわりの4つの面が垂直《すいちょく》です。"
          : kind
            ? "平行なのは、向かい合う面だけです。向かい合う面は1つです。"
            : "垂直《すいちょく》なのは、となり合う面です。上の面にとなり合う面は4つです。",
      ),
    },
    point: "向かい合う面は平行、となり合う面は垂直《すいちょく》",
    steps: [{ title: "面の関係《かんけい》", body: `1つの面から見ると、平行な面は1つ、垂直《すいちょく》な面は4つ。答えは{{${opts[correct]}}}です。`, back: [B_HEIKOU] }],
  };
}

function ichi(r: Rng): QuestionBody {
  const a = r.int(2, 9);
  const b = r.int(2, 9);
  const c = r.int(2, 9);
  const right = `（横${a}cm、たて${b}cm、高さ${c}cm）`;
  const ws = [`（横${a}cm、たて${b}cm、高さ0cm）`, `（横${b}cm、たて${a}cm、高さ${c}cm）`, `（横${a}cm、たて0cm、高さ${c}cm）`].filter((w) => w !== right);
  const options = r.shuffle([right, ...new Set(ws)]);
  return {
    prompt: `横${a}cm、たて${b}cm、高さ${c}cmの直方体の箱があります。頂点《ちょうてん》Aの位置を（横0cm、たて0cm、高さ0cm）とするとき、Aから一番遠い頂点《ちょうてん》の位置はどれですか。`,
    answer: { kind: "choice", options, correct: options.indexOf(right), why: options.map((o) => (o === right ? "横・たて・高さのどれも、箱のはしまで進んだ頂点《ちょうてん》です。" : "横・たて・高さのどれかが、まだはしまで進んでいません（または横とたてが入れかわっています）。")) },
    point: "箱の中の位置は、横・たて・高さの3つの数",
    steps: [{ title: "3つの数で表す", body: `一番遠い頂点《ちょうてん》は、横に${a}cm、たてに${b}cm、高さ${c}cm進んだところ。{{${right}}}です。`, back: [B_ICHI] }],
  };
}

function takasa(r: Rng): QuestionBody {
  const a = r.int(3, 10);
  const b = r.int(3, 10);
  const c = r.int(2, 9);
  const t = 4 * (a + b + c);
  return {
    prompt: `たて${a}cm、横${b}cmの直方体があります。辺の長さを全部たすと${t}cmでした。高さは何cmですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(c)], unit: "cm", calc: `${t}/4-${a}-${b}` },
    point: "全部の辺÷4 で、たて＋横＋高さ が出る",
    steps: [
      { title: "4でわる", body: `同じ組の辺が4本ずつなので、たて＋横＋高さ＝${t}÷4＝${t / 4}（cm）。`, back: [B_HEN] },
      { title: "高さ", body: `${t / 4}−${a}−${b}＝{{${c}}}（cm）。` },
    ],
  };
}

export const E_MATH_4_CHOKUHOTAI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小4",
  review: { status: "draft" },
  sections: [
    {
      title: "面・辺・頂点《ちょうてん》",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "kazu", type: "A", difficulty: 1, points: 12, seconds: 45, skill: "知識・技能", generate: kazu },
        { id: "rippoutai", type: "A", difficulty: 1, points: 12, seconds: 45, skill: "知識・技能", generate: rippoutai },
        { id: "hen-goukei", type: "A", difficulty: 1, points: 12, seconds: 60, skill: "知識・技能", generate: henGoukei },
        { id: "heikou", type: "A", difficulty: 2, points: 14, seconds: 60, skill: "知識・技能", generate: heikou },
      ],
    },
    {
      title: "展開図《てんかいず》・位置・辺の長さ",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "ichi", type: "A", difficulty: 2, points: 14, seconds: 75, skill: "思考・判断・表現", generate: ichi },
        { id: "tenkai", type: "A", difficulty: 2, points: 16, seconds: 90, skill: "思考・判断・表現", generate: tenkai },
        { id: "takasa", type: "A", difficulty: 3, points: 20, seconds: 120, skill: "思考・判断・表現", generate: takasa },
      ],
    },
  ],
};
