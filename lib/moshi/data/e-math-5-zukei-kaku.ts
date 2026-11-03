// 小5算数「図形の角」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 角は整数で作り、答えも整数になる組だけ (二等辺三角形は等しい辺の間の角を偶数に、正多角形は1つの角が整数になる n だけ)。
// calc (問題の数から答えを出す式) で答えを検算する (scripts/check-moshi.ts がシード100個で確かめる)。
import type { NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-5-zukei-kaku";
const L = (n: number) => `/learn/lecture/${U}#lec-s${n}`;
const BACK_180 = { label: "三角形の3つの角を集めると一直線", href: L(1) };
const BACK_HIKU = { label: "わからない角は、180°からひく", href: L(3) };
const BACK_SHIKAKU = { label: "四角形は、三角形2つに分ける", href: L(4) };
const BACK_TAKAKU = { label: "多角形は、三角形がいくつできるかで考える", href: L(5) };

const f = (x: number) => String(Math.round(x * 1000) / 1000);
const num = (answer: number, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [f(answer)], calc, ...(unit ? { unit } : {}) });
const NAME: Record<number, string> = { 5: "五", 6: "六", 7: "七", 8: "八", 9: "九", 10: "十", 11: "十一", 12: "十二", 15: "十五", 18: "十八", 20: "二十", 24: "二十四", 30: "三十" };

function sankaku(r: Rng): QuestionBody {
  const a = r.int(25, 95);
  const b = r.int(20, 150 - a);
  const c = 180 - a - b;
  return {
    prompt: `三角形の2つの角が ${a}° と ${b}° のとき、残りの角は何度ですか。`,
    answer: num(c, `180-${a}-${b}`, "°"),
    point: "三角形の3つの角の和は180°",
    steps: [
      { title: "180°からひく", body: `3つの角の和は180°なので、180−${a}−${b}＝{{${c}}}（°）です。`, back: [BACK_180, BACK_HIKU] },
    ],
  };
}

function nitohen(r: Rng): QuestionBody {
  const top = r.step(20, 140, 2);
  const base = (180 - top) / 2;
  return {
    prompt: `二等辺三角形で、等しい2つの辺の間の角が ${top}° です。残りの2つの角は、それぞれ何度ですか。`,
    answer: num(base, `(180-${top})/2`, "°"),
    point: "二等辺三角形の残りの2つの角は等しい",
    steps: [
      { title: "残り2つの角の和", body: `180−${top}＝${180 - top}（°）が、残り2つの角の和です。`, back: [BACK_HIKU] },
      { title: "2つに分ける", body: `二等辺三角形では、残りの2つの角は等しいので、${180 - top}÷2＝{{${base}}}（°）です。`, trap: `${180 - top}° で止めない。それは2つ分の和です。` },
    ],
  };
}

function shikaku(r: Rng): QuestionBody {
  const a = r.int(60, 120);
  const b = r.int(60, 120);
  const c = r.int(60, Math.min(120, 330 - a - b));
  const d = 360 - a - b - c;
  return {
    prompt: `四角形の3つの角が ${a}°、${b}°、${c}° のとき、残りの角は何度ですか。`,
    answer: num(d, `360-${a}-${b}-${c}`, "°"),
    point: "四角形の4つの角の和は360°（三角形2つ分）",
    steps: [
      { title: "四角形の角の和", body: "対角線で三角形2つに分けられるので、4つの角の和は 180×2＝{{360°}} です。", back: [BACK_SHIKAKU] },
      { title: "360°からひく", body: `360−${a}−${b}−${c}＝{{${d}}}（°）です。`, trap: "180°からひかない。四角形は三角形2つ分です。" },
    ],
  };
}

function wa(r: Rng): QuestionBody {
  const n = r.pick([5, 6, 7, 8, 9, 10, 11, 12, 15, 18, 20]);
  const s = 180 * (n - 2);
  return {
    prompt: `${NAME[n]}角形の角の大きさの和は何度ですか。`,
    answer: num(s, `180*(${n}-2)`, "°"),
    point: "1つの頂点《ちょうてん》から対角線をひくと、三角形は（辺の数−2）こ",
    steps: [
      { title: "三角形がいくつできるか", body: `1つの頂点《ちょうてん》から対角線をひくと、${NAME[n]}角形は ${n}−2＝${n - 2}（こ）の三角形に分けられます。`, back: [BACK_TAKAKU] },
      { title: "180°をかける", body: `180×${n - 2}＝{{${s}}}（°）です。`, trap: `180×${n} としない。三角形の数は辺の数より2つ少なくなります。` },
    ],
  };
}

function seitakaku(r: Rng): QuestionBody {
  const n = r.pick([5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30]);
  const one = (180 * (n - 2)) / n;
  return {
    prompt: `正${NAME[n]}角形の1つの角の大きさは何度ですか。`,
    answer: num(one, `180*(${n}-2)/${n}`, "°"),
    point: "角の和を求めてから、角の数でわる",
    steps: [
      { title: "角の和", body: `${NAME[n]}角形の角の和は 180×${n - 2}＝${180 * (n - 2)}（°）です。`, back: [BACK_TAKAKU] },
      { title: "等しく分ける", body: `正${NAME[n]}角形の角はすべて等しいので、${180 * (n - 2)}÷${n}＝{{${one}}}（°）です。` },
    ],
  };
}

function nankakukei(r: Rng): QuestionBody {
  const n = r.int(5, 16);
  const s = 180 * (n - 2);
  return {
    prompt: `角の大きさの和が ${s}° になる多角形は、何角形ですか。`,
    answer: num(n, `${s}/180+2`, "角形"),
    point: "三角形の数＝和÷180、辺の数＝三角形の数＋2",
    steps: [
      { title: "三角形がいくつ分か", body: `${s}÷180＝${n - 2} なので、三角形${n - 2}こ分の角の和です。`, back: [BACK_TAKAKU] },
      { title: "辺の数にもどす", body: `1つの頂点《ちょうてん》から分けたとき、三角形の数は辺の数より2少ないので、${n - 2}＋2＝{{${n}}}。${n}角形です。`, trap: `${n - 2}角形としない。三角形の数と辺の数はちがいます。` },
    ],
  };
}

export const E_MATH_5_ZUKEI_KAKU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小5",
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "三角形と四角形の角",
      lead: "次の問いに答えなさい。",
      style: "calc",
      questions: [
        { id: "sankaku", type: "A", difficulty: 1, points: 15, seconds: 45, skill: "知識・技能", generate: sankaku },
        { id: "nitohen", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: nitohen },
        { id: "shikaku", type: "A", difficulty: 1, points: 15, seconds: 60, skill: "知識・技能", generate: shikaku },
      ],
    },
    {
      title: "多角形の角",
      lead: "次の問いに答えなさい。",
      style: "mix",
      questions: [
        { id: "wa", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "知識・技能", generate: wa },
        { id: "seitakaku", type: "A", difficulty: 2, points: 17, seconds: 90, skill: "思考・判断・表現", generate: seitakaku },
      ],
    },
    {
      title: "角の和から形を考える",
      lead: "次の問いに答えなさい。",
      style: "word",
      questions: [{ id: "nankakukei", type: "A", difficulty: 3, points: 21, seconds: 150, skill: "思考・判断・表現", generate: nankakukei }],
    },
  ],
};
