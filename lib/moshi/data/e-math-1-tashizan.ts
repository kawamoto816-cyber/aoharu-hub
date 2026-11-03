// 小1算数「たし算」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 数は rng から作り、答えは 10 まで (くり上がりなし)。num は calc (たし算・ひき算) で答えを検算する (scripts/check-moshi.ts がシード100個で確かめる)。
// 選択肢は、正解と同じ値・同じ文字がまざらないように作り、r で並べかえる。
import type { ChoiceQ, NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-1-tashizan";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_AWASE = L(1, "あわせると、いくつ");
const B_FUERU = L(2, "ふえると、いくつ");
const B_SHIKI = L(3, "しきの よみかた");
const B_0 = L(4, "0の たしざんと、いれかえ");

const num = (ans: number, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [String(ans)], calc, ...(unit ? { unit } : {}) });
/** items の先頭が正解。同じ文字の選択肢はのぞき、r で並べかえる */
function choice(r: Rng, items: [string, string][]): ChoiceQ {
  const seen = new Set<string>();
  const its = items.filter(([o]) => !seen.has(o) && !!seen.add(o));
  const order = r.shuffle(its.map((_, i) => i));
  return { kind: "choice", options: order.map((i) => its[i][0]), why: order.map((i) => its[i][1]), correct: order.indexOf(0) };
}

/** a + b ≦ 10 (どちらも 1 いじょう) */
function pair(r: Rng): [number, number] {
  const a = r.int(1, 9);
  return [a, r.int(1, 10 - a)];
}

function keisan(r: Rng): QuestionBody {
  const [a, b] = pair(r);
  return {
    prompt: `${a}＋${b}は いくつですか。`,
    answer: num(a + b, `${a}+${b}`),
    point: "＋は あわせる こと",
    steps: [{ title: "あわせて かぞえる", body: `${a}こと ${b}こを あわせると {{${a + b}}}こ。${a}＋${b}＝${a + b} です。`, back: [B_SHIKI] }],
  };
}

function awase(r: Rng): QuestionBody {
  const [a, b] = pair(r);
  const [x, y] = r.pick([
    ["りんご", "みかん"],
    ["あかい ふうせん", "あおい ふうせん"],
    ["おにぎり", "サンドイッチ"],
  ]);
  return {
    prompt: `${x}が ${a}こ、${y}が ${b}こ あります。あわせて なんこですか。`,
    answer: num(a + b, `${a}+${b}`, "こ"),
    point: "「あわせて」は たしざん",
    steps: [{ title: "あわせる ときは たしざん", body: `しきは ${a}＋${b}。こたえは {{${a + b}こ}} です。`, back: [B_AWASE] }],
  };
}

function fueru(r: Rng): QuestionBody {
  const [a, b] = pair(r);
  if (r.bool()) {
    return {
      prompt: `こうえんに 子どもが ${a}人 います。${b}人 きました。みんなで なん人に なりましたか。`,
      answer: num(a + b, `${a}+${b}`, "人"),
      point: "「ふえると」も たしざん",
      steps: [{ title: "ふえる ときも たしざん", body: `はじめの ${a}人に ${b}人 ふえたので、${a}＋${b}＝{{${a + b}}}。${a + b}人です。`, back: [B_FUERU] }],
    };
  }
  return {
    prompt: `でんせんに すずめが ${a}わ います。${b}わ とんで きました。ぜんぶで なんわに なりましたか。`,
    answer: num(a + b, `${a}+${b}`, "わ"),
    point: "「ふえると」も たしざん",
    steps: [{ title: "ふえる ときも たしざん", body: `はじめの ${a}に ${b} ふえたので、${a}＋${b}＝{{${a + b}}} です。`, back: [B_FUERU] }],
  };
}

function zero(r: Rng): QuestionBody {
  const a = r.int(1, 10);
  const front = r.bool();
  const s = front ? `0＋${a}` : `${a}＋0`;
  return {
    prompt: `${s}は いくつですか。`,
    answer: num(a, front ? `0+${a}` : `${a}+0`),
    point: "0を たしても、かずは かわらない",
    steps: [{ title: "0は なにも ない こと", body: `0は「1つも ない」こと。${a}に なにも ふえないので、${s}＝{{${a}}} です。`, trap: `${s}＝0 と しない。0を たしても ${a}の ままです。`, back: [B_0] }],
  };
}

function irekae(r: Rng): QuestionBody {
  let a = 0;
  let b = 0;
  do [a, b] = pair(r);
  while (a === b);
  const b2 = a + b + 1 <= 10 ? b + 1 : b - 1;
  return {
    prompt: `${a}＋${b}と おなじ こたえに なる しきは どれですか。`,
    answer: choice(r, [
      [`${b}＋${a}`, `たす じゅんを いれかえても、こたえは ${a + b}で おなじです。`],
      [`${a}＋${b2}`, `${a}＋${b2}＝${a + b2}。${a + b}では ありません。`],
      [`${b}＋${b}`, `${b}＋${b}＝${b + b}。${a + b}では ありません。`],
    ]),
    point: "いれかえても、こたえは おなじ",
    steps: [{ title: "いれかえる", body: `${a}＋${b}＝${a + b}、${b}＋${a}＝${a + b}。たす じゅんを {{いれかえても}} こたえは おなじです。`, back: [B_0] }],
  };
}

function shikaku(r: Rng): QuestionBody {
  const [a, b] = pair(r);
  const c = a + b;
  return {
    prompt: `□に はいる かずは いくつですか。\n${a}＋□＝${c}`,
    answer: num(b, `${c}-${a}`),
    point: "いくつと いくつで かんがえる",
    steps: [
      { title: "いくつと いくつ", body: `${a}に なにを たすと ${c}に なるかを かんがえます。${c}は ${a}と {{${b}}}。`, back: [B_SHIKI] },
      { title: "たしかめる", body: `${a}＋${b}＝${c} なので、□は ${b}です。`, trap: `${a}＋${c} と たさない。こたえが ${c}に なる かずを さがします。` },
    ],
  };
}

export const E_MATH_1_TASHIZAN_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小1",
  minutes: 6,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "たしざんの けいさん",
      lead: "つぎの もんだいに こたえなさい。",
      style: "calc",
      questions: [
        { id: "keisan", type: "A", difficulty: 1, points: 14, seconds: 40, skill: "知識・技能", generate: keisan },
        { id: "zero", type: "A", difficulty: 2, points: 17, seconds: 45, skill: "知識・技能", generate: zero },
      ],
    },
    {
      title: "ぶんしょうの もんだい",
      lead: "つぎの もんだいに こたえなさい。",
      style: "word",
      questions: [
        { id: "awase", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: awase },
        { id: "fueru", type: "A", difficulty: 2, points: 17, seconds: 60, skill: "思考・判断・表現", generate: fueru },
      ],
    },
    {
      title: "しきを かんがえる",
      lead: "つぎの もんだいに こたえなさい。",
      style: "mix",
      questions: [
        { id: "irekae", type: "A", difficulty: 2, points: 17, seconds: 60, skill: "思考・判断・表現", generate: irekae },
        { id: "shikaku", type: "A", difficulty: 3, points: 21, seconds: 75, skill: "思考・判断・表現", generate: shikaku },
      ],
    },
  ],
};
