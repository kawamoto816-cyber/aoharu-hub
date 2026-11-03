// 小2算数「かけ算（九九）」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// かけられる数・かける数を 1〜9 から rng で選び、num は calc (かけ算・わり算) で答えを検算する (scripts/check-moshi.ts がシード100個で確かめる)。
// しきの選択肢は「1つ分の数 × いくつ分」を正解にし、前後を入れかえた しき・たし算の しきを まちがいに使う (同じ文字はのぞく)。
import type { ChoiceQ, NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-2-kakezan";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_IKUTSU = L(1, "同じ 数ずつ、いくつ分");
const B_MAE = L(2, "かけられる数と かける数");
const B_DAN = L(3, "九九の だんは、同じ 数ずつ ふえる");
const B_IREKAE = L(4, "入れかえても 答えは 同じ");

const num = (ans: number, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [String(ans)], calc, ...(unit ? { unit } : {}) });
/** items の先頭が正解。同じ文字の選択肢はのぞき、r で並べかえる */
function choice(r: Rng, items: [string, string][]): ChoiceQ {
  const seen = new Set<string>();
  const its = items.filter(([o]) => !seen.has(o) && !!seen.add(o));
  const order = r.shuffle(its.map((_, i) => i));
  return { kind: "choice", options: order.map((i) => its[i][0]), why: order.map((i) => its[i][1]), correct: order.indexOf(0) };
}

/** 1つ分・いくつ分の ばめん (u: 1つ分の ものの 数え方) */
const BAMEN = [
  { p: (a: number, b: number) => `1さらに ${a}こずつ、${b}さら分の みかんが あります。みかんは ぜんぶで 何こですか。`, u: "こ", one: "1さらの 数" },
  { p: (a: number, b: number) => `1はこに ${a}本ずつ 入った えんぴつが、${b}はこ あります。えんぴつは ぜんぶで 何本ですか。`, u: "本", one: "1はこの 数" },
  { p: (a: number, b: number) => `1人に ${a}まいずつ、${b}人に 色紙を くばります。色紙は 何まい いりますか。`, u: "まい", one: "1人分の 数" },
  { p: (a: number, b: number) => `長いすが ${b}つ あり、1つに ${a}人ずつ すわります。みんなで 何人 すわれますか。`, u: "人", one: "長いす 1つ分の 数" },
];

function kuku(r: Rng): QuestionBody {
  const a = r.int(2, 9);
  const b = r.int(1, 9);
  return {
    prompt: `${a}×${b}を 計算しなさい。`,
    answer: num(a * b, `${a}*${b}`),
    point: `${a}の だんの 九九`,
    steps: [{ title: `${a}の だん`, body: `${a}が ${b}つ分。${a}の だんで ${a}×${b}＝{{${a * b}}} です。`, back: [B_DAN] }],
  };
}

function bun(r: Rng): QuestionBody {
  const a = r.int(2, 9);
  const b = r.int(2, 9);
  const s = r.pick(BAMEN);
  return {
    prompt: s.p(a, b),
    answer: num(a * b, `${a}*${b}`, s.u),
    point: "1つ分の数 × いくつ分",
    steps: [
      { title: "1つ分と いくつ分", body: `${s.one}は ${a}、それが ${b}つ分。しきは {{${a}×${b}}}。`, back: [B_MAE] },
      { title: "答え", body: `${a}×${b}＝${a * b}。${a * b}${s.u}です。`, back: [B_IKUTSU] },
    ],
  };
}

function dan(r: Rng): QuestionBody {
  const a = r.int(2, 9);
  const b = r.int(1, 8);
  return {
    prompt: `${a}×${b}の 答えに いくつを たすと、${a}×${b + 1}の 答えに なりますか。`,
    answer: num(a, `${a}*${b + 1}-${a}*${b}`),
    point: "かける数が 1 ふえると、かけられる数だけ ふえる",
    steps: [{ title: "だんは 同じ 数ずつ ふえる", body: `${a}×${b}＝${a * b}、${a}×${b + 1}＝${a * (b + 1)}。${a}の だんは 答えが {{${a}}}ずつ ふえます。`, back: [B_DAN] }],
  };
}

function shiki(r: Rng): QuestionBody {
  let a = 0;
  let b = 0;
  do {
    a = r.int(2, 9);
    b = r.int(2, 9);
  } while (a === b);
  const s = r.pick(BAMEN);
  return {
    prompt: `${s.p(a, b).replace(/。[^。]*か。$/, "。")}ぜんぶの 数を もとめる しきは どれですか。`,
    answer: choice(r, [
      [`${a}×${b}`, `${s.one} ${a}が ${b}つ分なので ${a}×${b}。`],
      [`${b}×${a}`, `答えは 同じですが、「${b}が ${a}つ分」の しきに なって います。1つ分の 数を 前に 書きます。`],
      [`${a}＋${b}`, `${a}と ${b}を たすと、${a}が ${b}つ分には なりません。`],
      [`${a}×${a}`, `いくつ分は ${b}です。`],
    ]),
    point: "かけ算の しきは、1つ分の数が 前",
    steps: [{ title: "1つ分を 見つける", body: `${s.one}は ${a}、いくつ分は ${b}。{{前が 1つ分、後ろが いくつ分}}なので ${a}×${b} です。`, back: [B_MAE] }],
  };
}

function irekae(r: Rng): QuestionBody {
  let a = 0;
  let b = 0;
  do {
    a = r.int(2, 9);
    b = r.int(2, 9);
  } while (a === b);
  return {
    prompt: `□に 入る 数は 何ですか。\n${a}×${b}＝${b}×□`,
    answer: num(a, `${a}*${b}/${b}`),
    point: "かけられる数と かける数を 入れかえても 答えは 同じ",
    steps: [{ title: "入れかえる", body: `${a}×${b}＝${a * b}。${b}×${a}も ${a * b}。入れかえても 答えは 同じなので、□は {{${a}}} です。`, back: [B_IREKAE] }],
  };
}

function hiku(r: Rng): QuestionBody {
  const a = r.int(2, 9);
  const b = r.int(3, 9);
  const c = r.int(1, a - 1);
  return {
    prompt: `1人に ${a}こずつ、${b}人に あめを くばると、${c}こ あまりました。あめは はじめに 何こ ありましたか。`,
    answer: num(a * b + c, `${a}*${b}+${c}`, "こ"),
    point: "くばった 数を かけ算で 出して、あまりを たす",
    steps: [
      { title: "くばった 数", body: `${a}こずつ ${b}人分なので ${a}×${b}＝${a * b}（こ）。`, back: [B_IKUTSU] },
      { title: "あまりを たす", body: `${a * b}＋${c}＝{{${a * b + c}}}。はじめは ${a * b + c}こです。`, trap: `${a}×${b} で 止めない。あまった ${c}こも はじめに あった あめです。` },
    ],
  };
}

function sagasu(r: Rng): QuestionBody {
  const a = r.int(2, 9);
  const b = r.int(2, 9);
  const front = r.bool();
  return {
    prompt: front ? `□に 入る 数は 何ですか。\n□×${b}＝${a * b}` : `□に 入る 数は 何ですか。\n${a}×□＝${a * b}`,
    answer: num(front ? a : b, front ? `${a * b}/${b}` : `${a * b}/${a}`),
    point: "九九を となえて、答えが 合う ものを さがす",
    steps: [
      front
        ? { title: `${b}の だんで さがす`, body: `入れかえて ${b}×□＝${a * b} と 考え、${b}の だんを となえると ${b}×${a}＝${a * b}。□は {{${a}}}。`, back: [B_IREKAE] }
        : { title: `${a}の だんで さがす`, body: `${a}の だんを となえると、${a}×${b}＝${a * b}。□は {{${b}}} です。`, back: [B_DAN] },
    ],
  };
}

export const E_MATH_2_KAKEZAN_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小2",
  minutes: 10,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "九九",
      lead: "つぎの もんだいに 答えなさい。",
      style: "calc",
      questions: [
        { id: "kuku", type: "A", difficulty: 1, points: 12, seconds: 30, skill: "知識・技能", generate: kuku },
        { id: "dan", type: "A", difficulty: 1, points: 12, seconds: 60, skill: "知識・技能", generate: dan },
        { id: "irekae", type: "A", difficulty: 1, points: 12, seconds: 45, skill: "知識・技能", generate: irekae },
      ],
    },
    {
      title: "かけ算の しきと 文しょうの もんだい",
      lead: "つぎの もんだいに 答えなさい。",
      style: "word",
      questions: [
        { id: "bun", type: "A", difficulty: 2, points: 15, seconds: 90, skill: "思考・判断・表現", generate: bun },
        { id: "shiki", type: "A", difficulty: 2, points: 15, seconds: 90, skill: "思考・判断・表現", generate: shiki },
        { id: "sagasu", type: "A", difficulty: 2, points: 15, seconds: 60, skill: "知識・技能", generate: sagasu },
      ],
    },
    {
      title: "かけ算を つかって 考える",
      lead: "つぎの もんだいに 答えなさい。",
      style: "word",
      questions: [{ id: "hiku", type: "A", difficulty: 3, points: 19, seconds: 120, skill: "思考・判断・表現", generate: hiku }],
    },
  ],
};
