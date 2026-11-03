// 小1算数「ひき算」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 数は rng から作り、ひかれる数は 10 まで (くり下がりなし)。num は calc (ひき算・たし算) で答えを検算する (scripts/check-moshi.ts がシード100個で確かめる)。
// 選択肢は、正解と同じ文字がまざらないように作り、r で並べかえる。
import type { ChoiceQ, NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-1-hikizan";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_NOKORI = L(1, "のこりは、いくつ");
const B_CHIGAI = L(2, "ちがいは、いくつ");
const B_IKUTSU = L(3, "ひきざんは、いくつと いくつ");
const B_0 = L(4, "0の ひきざん");

const num = (ans: number, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [String(ans)], calc, ...(unit ? { unit } : {}) });
/** items の先頭が正解。同じ文字の選択肢はのぞき、r で並べかえる */
function choice(r: Rng, items: [string, string][]): ChoiceQ {
  const seen = new Set<string>();
  const its = items.filter(([o]) => !seen.has(o) && !!seen.add(o));
  const order = r.shuffle(its.map((_, i) => i));
  return { kind: "choice", options: order.map((i) => its[i][0]), why: order.map((i) => its[i][1]), correct: order.indexOf(0) };
}

/** a − b (a は 3〜10、b は 1〜a−1) */
function pair(r: Rng): [number, number] {
  const a = r.int(3, 10);
  return [a, r.int(1, a - 1)];
}

function keisan(r: Rng): QuestionBody {
  const [a, b] = pair(r);
  return {
    prompt: `${a}−${b}は いくつですか。`,
    answer: num(a - b, `${a}-${b}`),
    point: "−は とって のこりを かんがえる",
    steps: [{ title: "いくつと いくつ", body: `${a}は ${b}と ${a - b}。だから ${a}−${b}＝{{${a - b}}} です。`, back: [B_IKUTSU] }],
  };
}

function nokori(r: Rng): QuestionBody {
  const [a, b] = pair(r);
  const [f, v] = r.pick([
    ["あめ", "たべる"],
    ["シール", "あげる"],
    ["クッキー", "たべる"],
  ]);
  return {
    prompt: `${f}が ${a}こ あります。${b}こ ${v}と、のこりは なんこですか。`,
    answer: num(a - b, `${a}-${b}`, "こ"),
    point: "「のこりは」は ひきざん",
    steps: [
      { title: "のこりは ひきざん", body: `はじめの ${a}こから ${b}こ へるので、しきは ${a}−${b}。`, back: [B_NOKORI] },
      { title: "こたえ", body: `${a}−${b}＝{{${a - b}}}。のこりは ${a - b}こです。` },
    ],
  };
}

function chigai(r: Rng): QuestionBody {
  const a = r.int(4, 10);
  const b = r.int(1, a - 1);
  return {
    prompt: `男の子が ${a}人、女の子が ${b}人 います。男の子は 女の子より なん人 おおいですか。`,
    answer: num(a - b, `${a}-${b}`, "人"),
    point: "「ちがいは」「なん人 おおい」は ひきざん",
    steps: [
      { title: "1人ずつ ならべる", body: `1人ずつ むかいあわせに ならべると、男の子が ${a - b}人 あまります。これが {{ちがい}} です。`, back: [B_CHIGAI] },
      { title: "しき", body: `${a}−${b}＝{{${a - b}}}。${a - b}人 おおいです。`, trap: `${a}＋${b} と たさない。ちがいは ひきざんです。` },
    ],
  };
}

function zero(r: Rng): QuestionBody {
  const a = r.int(1, 10);
  const all = r.bool();
  const s = all ? `${a}−${a}` : `${a}−0`;
  const ans = all ? 0 : a;
  return {
    prompt: `${s}は いくつですか。`,
    answer: num(ans, all ? `${a}-${a}` : `${a}-0`),
    point: all ? "ぜんぶ とると 0" : "0を ひいても、かずは かわらない",
    steps: [
      all
        ? { title: "ぜんぶ とる", body: `${a}こ あって ${a}こ とると、1つも のこりません。${s}＝{{0}} です。`, back: [B_0] }
        : { title: "なにも とらない", body: `0を ひくのは、なにも とらない こと。${a}の ままなので ${s}＝{{${a}}} です。`, trap: `${s}＝0 と しない。`, back: [B_0] },
    ],
  };
}

function shiki(r: Rng): QuestionBody {
  const [a, b] = pair(r);
  return {
    prompt: `こうえんで 子どもが ${a}人 あそんで いました。${b}人 かえりました。のこりは なん人ですか。この もんだいの しきは どれですか。`,
    answer: choice(r, [
      [`${a}−${b}`, `はじめの ${a}人から、かえった ${b}人を ひきます。`],
      [`${b}−${a}`, "はじめの かずを さきに かきます。"],
      [`${a}＋${b}`, "かえると 人は へるので、たしざんでは ありません。"],
    ]),
    point: "はじめの かずから、へった かずを ひく",
    steps: [{ title: "しきを つくる", body: `はじめは ${a}人。${b}人 へったので {{${a}−${b}}}。こたえは ${a - b}人です。`, back: [B_NOKORI] }],
  };
}

function shikaku(r: Rng): QuestionBody {
  const [a, b] = pair(r);
  const c = a - b;
  if (r.bool()) {
    return {
      prompt: `□に はいる かずは いくつですか。\n${a}−□＝${c}`,
      answer: num(b, `${a}-${c}`),
      point: "いくつと いくつで かんがえる",
      steps: [
        { title: "いくつと いくつ", body: `${a}から いくつ とると ${c}が のこるかを かんがえます。${a}は ${c}と {{${b}}}。`, back: [B_IKUTSU] },
        { title: "たしかめる", body: `${a}−${b}＝${c} なので、□は ${b}です。` },
      ],
    };
  }
  return {
    prompt: `□に はいる かずは いくつですか。\n□−${b}＝${c}`,
    answer: num(a, `${c}+${b}`),
    point: "たしざんで もとの かずに もどす",
    steps: [
      { title: "もとの かずを かんがえる", body: `${b} とって ${c} のこったので、もとは ${c}と ${b}を あわせた かずです。${c}＋${b}＝{{${a}}}。`, back: [B_IKUTSU] },
      { title: "たしかめる", body: `${a}−${b}＝${c} なので、□は ${a}です。`, trap: `${c}−${b} と ひかない。□は いちばん 大きい かずです。` },
    ],
  };
}

export const E_MATH_1_HIKIZAN_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小1",
  minutes: 6,
  review: { status: "draft" },
  sections: [
    {
      title: "ひきざんの けいさん",
      lead: "つぎの もんだいに こたえなさい。",
      style: "calc",
      questions: [
        { id: "keisan", type: "A", difficulty: 1, points: 14, seconds: 40, skill: "知識・技能", generate: keisan },
        { id: "zero", type: "A", difficulty: 2, points: 17, seconds: 45, skill: "知識・技能", generate: zero },
      ],
    },
    {
      title: "のこり・ちがい",
      lead: "つぎの もんだいに こたえなさい。",
      style: "word",
      questions: [
        { id: "nokori", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: nokori },
        { id: "chigai", type: "A", difficulty: 2, points: 17, seconds: 60, skill: "思考・判断・表現", generate: chigai },
      ],
    },
    {
      title: "しきを かんがえる",
      lead: "つぎの もんだいに こたえなさい。",
      style: "mix",
      questions: [
        { id: "shiki", type: "A", difficulty: 2, points: 17, seconds: 60, skill: "思考・判断・表現", generate: shiki },
        { id: "shikaku", type: "A", difficulty: 3, points: 21, seconds: 75, skill: "思考・判断・表現", generate: shikaku },
      ],
    },
  ],
};
