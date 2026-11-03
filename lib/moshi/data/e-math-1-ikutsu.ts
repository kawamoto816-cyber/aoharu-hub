// 小1算数「いくつといくつ」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 数は rng から作り、あつかう数は 10まで。num は calc (たし算・ひき算) で答えを検算する (scripts/check-moshi.ts がシード100個で確かめる)。
// 選択肢は、正解と同じものがまざらないように作り、r で並べかえる。
import type { ChoiceQ, NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-1-ikutsu";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_WAKERU = L(1, "かずを 2つに わける");
const B_JUN = L(2, "わけかたは、じゅんばんに");
const B_10 = L(3, "10は いくつと いくつ");
const B_KAKURE = L(4, "かくれた かずを 見つける");

const num = (ans: number, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [String(ans)], calc, ...(unit ? { unit } : {}) });
/** items の先頭が正解。同じ文字の選択肢はのぞき、r で並べかえる */
function choice(r: Rng, items: [string, string][]): ChoiceQ {
  const seen = new Set<string>();
  const its = items.filter(([o]) => !seen.has(o) && !!seen.add(o));
  const order = r.shuffle(its.map((_, i) => i));
  return { kind: "choice", options: order.map((i) => its[i][0]), why: order.map((i) => its[i][1]), correct: order.indexOf(0) };
}

function bunkai(r: Rng): QuestionBody {
  const n = r.int(3, 9);
  const a = r.int(1, n - 1);
  return {
    prompt: `${n}は ${a}と いくつですか。`,
    answer: num(n - a, `${n}-${a}`),
    point: "おはじきを 2つに わけて かんがえる",
    steps: [{ title: "2つに わける", body: `おはじきを ${n}こ ならべて、${a}こと のこりに わけます。のこりは {{${n - a}}}こ。${n}は ${a}と ${n - a}です。`, back: [B_WAKERU] }],
  };
}

function gousei(r: Rng): QuestionBody {
  const a = r.int(1, 8);
  const b = r.int(1, 9 - a + 1);
  return {
    prompt: `${a}と ${b}で いくつに なりますか。`,
    answer: num(a + b, `${a}+${b}`),
    point: "2つを あわせた かずを かんがえる",
    steps: [{ title: "あわせる", body: `${a}この おはじきと ${b}この おはじきを あわせて かぞえると、{{${a + b}}}こです。`, back: [B_WAKERU] }],
  };
}

function ten(r: Rng): QuestionBody {
  const a = r.int(1, 9);
  const ctx = r.bool();
  return {
    prompt: ctx ? `10は ${a}と いくつですか。` : `おはじきが 10こ あります。${a}こ を 右に わけると、左は なんこですか。`,
    answer: num(10 - a, `10-${a}`, ctx ? undefined : "こ"),
    point: "10を つくる くみあわせを おぼえる",
    steps: [
      { title: "10の わけかた", body: `10は 1と9、2と8、3と7、4と6、5と5 に わけられます。${a}と くみに なるのは {{${10 - a}}} です。`, trap: "10の くみを 1つ ずらして おぼえて いないか、おはじきで たしかめます。", back: [B_10] },
    ],
  };
}

function kakure(r: Rng): QuestionBody {
  const n = r.int(4, 10);
  const a = r.int(1, n - 1);
  const f = r.pick(["おはじき", "あめ", "ビー玉"]);
  return {
    prompt: `${f}が ${n}こ あります。${a}こは 見えて います。かくれて いるのは なんこですか。`,
    answer: num(n - a, `${n}-${a}`, "こ"),
    point: "ぜんぶの かずを 2つに わけて かんがえる",
    steps: [{ title: "いくつと いくつ", body: `${n}は ${a}と ${n - a}。見えて いるのが ${a}こ なので、かくれて いるのは {{${n - a}}}こです。`, back: [B_KAKURE] }],
  };
}

function kumi(r: Rng): QuestionBody {
  const t = r.int(6, 10);
  const a = r.int(1, t - 2);
  return {
    prompt: r.pick([`あわせて ${t}に なる くみは どれですか。`, `${t}を 2つに わけた くみは どれですか。`, `おはじきを 2つの てに わけて もちます。あわせて ${t}こに なる くみは どれですか。`]),
    answer: choice(r, [
      [`${a}と ${t - a}`, `${a}と ${t - a}で ${t}です。`],
      [`${a}と ${t - 1 - a}`, `${a}と ${t - 1 - a}は ${t - 1}です。${t}には 1 たりません。`],
      [`${a}と ${t + 1 - a}`, `${a}と ${t + 1 - a}は ${t + 1}です。${t}より 1 おおい。`],
      [`${a + 1}と ${t - a}`, `${a + 1}と ${t - a}は ${t + 1}です。`],
    ]),
    point: "いくつと いくつを おぼえて いるか",
    steps: [{ title: `${t}に なる くみ`, body: `${t}は ${a}と {{${t - a}}}。だから「${a}と ${t - a}」です。`, ...(t === 10 ? { back: [B_10] } : { back: [B_WAKERU] }) }],
  };
}

function toori(r: Rng): QuestionBody {
  const n = r.int(4, 10);
  const f = r.pick(["おはじき", "あめ", "どんぐり"]);
  const list = Array.from({ length: n - 1 }, (_, i) => `${i + 1}と${n - 1 - i}`);
  return {
    prompt: `${f} ${n}こを、2つの さらに わけます。どちらの さらにも 1こ いじょう のせます。わけかたは なんとおり ありますか。`,
    answer: num(n - 1, `${n}-1`, "とおり"),
    point: "1つずつ ずらすと、もれなく 見つかる",
    steps: [
      { title: "1つずつ ずらす", body: `左の さらを 1こ、2こ、3こ…と ふやすと、右は 1こずつ へります。${list.slice(0, 3).join("、")}…`, back: [B_JUN] },
      { title: "かぞえる", body: `左は 1こから ${n - 1}こまで なので、ぜんぶで {{${n - 1}}}とおり です。`, trap: "「1と3」と「3と1」は、さらが ちがうので べつの わけかたです。" },
    ],
  };
}

export const E_MATH_1_IKUTSU_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小1",
  minutes: 6,
  review: { status: "draft" },
  sections: [
    {
      title: "いくつと いくつ",
      lead: "つぎの もんだいに こたえなさい。",
      style: "calc",
      questions: [
        { id: "bunkai", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: bunkai },
        { id: "gousei", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: gousei },
      ],
    },
    {
      title: "10を つくる",
      lead: "つぎの もんだいに こたえなさい。",
      style: "mix",
      questions: [
        { id: "ten", type: "A", difficulty: 2, points: 17, seconds: 60, skill: "知識・技能", generate: ten },
        { id: "kumi", type: "A", difficulty: 2, points: 17, seconds: 60, skill: "知識・技能", generate: kumi },
      ],
    },
    {
      title: "かくれた かず・わけかた",
      lead: "つぎの もんだいに こたえなさい。",
      style: "word",
      questions: [
        { id: "kakure", type: "A", difficulty: 2, points: 17, seconds: 60, skill: "思考・判断・表現", generate: kakure },
        { id: "toori", type: "A", difficulty: 3, points: 21, seconds: 90, skill: "思考・判断・表現", generate: toori },
      ],
    },
  ],
};
