// 小3算数「小数」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 検算: 小数は「0.1が何こ」(整数) で持って計算し、表示は f() で整える。答えは calc で確かめる (scripts/check-moshi.ts がシード100個)。
import type { QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-3-shosu";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_01 = L(1, "1を10こに分けた1こ分が0.1");
const B_IKUTSU = L(2, "0.1のいくつ分で見る");
const B_TASU = L(3, "たし算は0.1のいくつ分で考える");
const B_HISSAN = L(4, "筆算は小数点をたてにそろえる");

/** 0.1 が t こ → 「2.4」 */
const f = (t: number) => String(Math.round(t) / 10);

function atsumeru(r: Rng): QuestionBody {
  const t = r.int(11, 99);
  if (t % 10 === 0) return atsumeru(r);
  return {
    prompt: `0.1を${t}こ集めた数はいくつですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(t)], calc: `0.1*${t}` },
    point: "0.1が10こで1",
    steps: [{ title: "10こずつまとめる", body: `0.1が10こで1なので、${t}こは 1が${Math.floor(t / 10)}こと0.1が${t % 10}こ。{{${f(t)}}} です。`, back: [B_01, B_IKUTSU] }],
  };
}

function nanko(r: Rng): QuestionBody {
  const t = r.int(11, 89);
  if (t % 10 === 0) return nanko(r);
  return {
    prompt: `${f(t)} は、0.1を何こ集めた数ですか。`,
    answer: { kind: "num", answerKind: "num", answer: [String(t)], unit: "こ", calc: `${f(t)}/0.1` },
    point: "1は0.1が10こ",
    steps: [{ title: "1と0.1に分ける", body: `${f(t)}は1が${Math.floor(t / 10)}こ（0.1が${Math.floor(t / 10) * 10}こ）と0.1が${t % 10}こ。合わせて{{${t}こ}}です。`, back: [B_IKUTSU] }],
  };
}

function tasu(r: Rng): QuestionBody {
  const a = r.int(11, 59);
  const b = r.int(11, 49);
  return {
    prompt: `${f(a)}＋${f(b)} を計算しなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [f(a + b)], calc: `${f(a)}+${f(b)}` },
    point: "0.1のいくつ分で考えると、整数のたし算",
    steps: [
      { title: "0.1のいくつ分", body: `0.1が${a}こと${b}こで ${a}＋${b}＝${a + b}（こ）。`, back: [B_TASU] },
      { title: "小数にもどす", body: `0.1が${a + b}こで {{${f(a + b)}}} です。`, back: [B_HISSAN] },
    ],
  };
}

function hiku(r: Rng): QuestionBody {
  const n = r.int(2, 9);
  const b = r.int(1, n * 10 - 1);
  const bb = b % 10 === 0 ? b + 1 : b;
  return {
    prompt: `${n}−${f(bb)} を計算しなさい。`,
    answer: { kind: "num", answerKind: "num", answer: [f(n * 10 - bb)], calc: `${n}-${f(bb)}` },
    point: "整数は ○.0 と見て、小数点をそろえる",
    steps: [{ title: "小数点をそろえる", body: `${n}を${n}.0と見て、小数点をたてにそろえて計算します。${n}.0−${f(bb)}＝{{${f(n * 10 - bb)}}}。`, trap: `${f(bb)}の小数点を、${n}の一の位《くらい》にそろえます。右はしにそろえないようにします。`, back: [B_HISSAN] }],
  };
}

function nokori(r: Rng): QuestionBody {
  const a = r.int(15, 29);
  const b = r.int(3, a - 4);
  const what = r.pick(["お茶", "牛にゅう", "ジュース"]);
  return {
    prompt: `${what}が${f(a)}Lありました。${f(b)}L飲むと、のこりは何Lですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(a - b)], unit: "L", calc: `${f(a)}-${f(b)}` },
    point: "のこりはひき算。0.1のいくつ分で考える",
    steps: [{ title: "ひき算", body: `0.1が${a}こから${b}こをひいて ${a - b}こ。{{${f(a - b)}}}L です。`, back: [B_TASU, B_HISSAN] }],
  };
}

function mittsu(r: Rng): QuestionBody {
  const a = r.int(12, 48);
  const b = r.int(12, 48);
  const c = r.int(5, Math.min(a + b - 5, 60));
  const who = r.pick(["はるかさん", "けいたさん", "まなさん"]);
  return {
    prompt: `${who}は、${f(a)}mのテープと${f(b)}mのテープを持っています。工作で、合わせて${f(c)}mを使いました。のこりのテープは、合わせて何mですか。`,
    answer: { kind: "num", answerKind: "num", answer: [f(a + b - c)], unit: "m", calc: `${f(a)}+${f(b)}-${f(c)}` },
    point: "先に合わせてから、使った分をひく",
    steps: [
      { title: "合わせる", body: `${f(a)}＋${f(b)}＝${f(a + b)}（m）。`, back: [B_TASU] },
      { title: "使った分をひく", body: `${f(a + b)}−${f(c)}＝{{${f(a + b - c)}}}（m）。`, back: [B_HISSAN] },
    ],
  };
}

export const E_MATH_3_SHOSU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小3",
  review: { status: "draft" },
  sections: [
    {
      title: "小数のしくみ",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "atsumeru", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: atsumeru },
        { id: "nanko", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: nanko },
        { id: "tasu", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: tasu },
        { id: "hiku", type: "A", difficulty: 2, points: 18, seconds: 75, skill: "知識・技能", generate: hiku },
      ],
    },
    {
      title: "小数の文章の問題",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [
        { id: "nokori", type: "A", difficulty: 2, points: 18, seconds: 75, skill: "思考・判断・表現", generate: nokori },
        { id: "mittsu", type: "A", difficulty: 3, points: 22, seconds: 120, skill: "思考・判断・表現", generate: mittsu },
      ],
    },
  ],
};
