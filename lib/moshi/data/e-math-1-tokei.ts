// 小1算数「時計の読み方」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// はりの位置は rng から作る。ながいはりは すうじ1つで5ふん (ふん＝すうじ×5)。「なんじ」は num の calc、「なんじなんぷん」は選択肢で、
// 正解は (じ, ふん) から作る。ふん・ぷんの読みは 0で終わる数は「ぷん」、5で終わる数は「ふん」(5とびの数だけを使う)。
import type { ChoiceQ, NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-1-tokei";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_HARI = L(1, "2本の はり");
const B_CHODO = L(2, "ちょうどの とき");
const B_FUN = L(3, "なんぷんを よむ");
const B_AWASE = L(4, "「じ」と「ふん」を あわせて");

const num = (ans: number, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [String(ans)], calc, ...(unit ? { unit } : {}) });
/** items の先頭が正解。同じ文字の選択肢はのぞき、r で並べかえる */
function choice(r: Rng, items: [string, string][]): ChoiceQ {
  const seen = new Set<string>();
  const its = items.filter(([o]) => !seen.has(o) && !!seen.add(o));
  const order = r.shuffle(its.map((_, i) => i));
  return { kind: "choice", options: order.map((i) => its[i][0]), why: order.map((i) => its[i][1]), correct: order.indexOf(0) };
}

/** 5とびの ふん (5〜55) の よみ */
const fun = (m: number) => `${m}${m % 10 === 0 ? "ぷん" : "ふん"}`;
const nextH = (h: number) => (h === 12 ? 1 : h + 1);
const prevH = (h: number) => (h === 1 ? 12 : h - 1);

function chodo(r: Rng): QuestionBody {
  const h = r.int(1, 12);
  return {
    prompt: `みじかい はりが ${h}、ながい はりが 12を さして います。なんじですか。`,
    answer: num(h, `${h}`, "じ"),
    point: "ながい はりが 12なら「ちょうど」",
    steps: [{ title: "ちょうどの とき", body: `ながい はりが 12なので「ちょうど」。みじかい はりの ${h}を よんで {{${h}じ}} です。`, ...(h === 12 ? {} : { trap: "ながい はりの 12を よんで「12じ」と しない。" }), back: [B_HARI, B_CHODO] }],
  };
}

function nagai(r: Rng): QuestionBody {
  const n = r.int(1, 11);
  const m = n * 5;
  return {
    prompt: `ながい はりが ${n}を さして います。なんぷんですか。`,
    answer: choice(r, [
      [fun(m), `すうじ 1つで 5ふん。${n}なら 5が ${n}${n >= 10 ? "こ" : "つ"}で ${fun(m)}です。`],
      [`${n}${[1, 3, 4, 6, 8, 10, 11].includes(n) ? "ぷん" : "ふん"}`, `すうじの ${n}を そのまま よんで います。ながい はりは、すうじ 1つで 5ふんです。`],
      [fun(m + 5), `${fun(m + 5)}は、ながい はりが ${n + 1}の とき です。`],
      [fun(m - 5 || 55), m === 5 ? "55ふんは、ながい はりが 11の とき です。" : `${fun(m - 5)}は、ながい はりが ${n - 1}の とき です。`],
    ]),
    point: "ながい はりは、すうじ 1つで 5ふん",
    steps: [{ title: "5とびで かぞえる", body: `1から ${n}まで「5、10、15…」と かぞえて {{${fun(m)}}} です。`, back: [B_FUN] }],
  };
}

function hanpun(r: Rng): QuestionBody {
  const h = r.int(1, 12);
  const n = r.int(1, 11);
  const m = n * 5;
  return {
    prompt: `${h}じ${fun(m)}の とき、ながい はりは どの すうじを さして いますか。`,
    answer: num(n, `${m}/5`),
    point: "ふんを 5とびで かぞえて、すうじを 見つける",
    steps: [{ title: "5とびで かぞえる", body: `「5、10、15…」と ${m}まで かぞえると、{{${n}}}こめの すうじです。`, trap: `みじかい はりの ${h}と まちがえない。ながい はりは「ふん」を あらわします。`, back: [B_FUN] }],
  };
}

function yomu(r: Rng): QuestionBody {
  const h = r.int(1, 12);
  const n = r.int(1, 11);
  const m = n * 5;
  return {
    prompt: `みじかい はりが ${h}と ${nextH(h)}の あいだ、ながい はりが ${n}を さして います。なんじ なんぷんですか。`,
    answer: choice(r, [
      [`${h}じ${fun(m)}`, `みじかい はりは まだ ${nextH(h)}に ついて いないので ${h}じ。ながい はりの ${n}は ${fun(m)}です。`],
      [`${nextH(h)}じ${fun(m)}`, `みじかい はりは まだ ${nextH(h)}に ついて いません。`],
      [`${n}じ${h === 12 ? "" : fun(h * 5)}`, "みじかい はりと ながい はりを ぎゃくに よんで います。"],
      [`${h}じ${n}${[1, 3, 4, 6, 8, 10, 11].includes(n) ? "ぷん" : "ふん"}`, "ながい はりの すうじを そのまま よんで います。すうじ 1つで 5ふんです。"],
    ]),
    point: "みじかい はりで「じ」、ながい はりで「ふん」",
    steps: [
      { title: "みじかい はりで「じ」", body: `みじかい はりは ${h}と ${nextH(h)}の あいだ。まだ ${nextH(h)}に ついて いないので {{${h}じ}}。`, back: [B_AWASE] },
      { title: "ながい はりで「ふん」", body: `ながい はりは ${n}。5が ${n}${n >= 10 ? "こ" : "つ"}で {{${fun(m)}}}。あわせて ${h}じ${fun(m)}です。`, back: [B_FUN] },
    ],
  };
}

function han(r: Rng): QuestionBody {
  const h = r.int(1, 12);
  return {
    prompt: `「${h}じはん」は、なんじ なんぷんの ことですか。`,
    answer: choice(r, [
      [`${h}じ30ぷん`, "「はん」は、ながい はりが 6を さす 30ぷんの ことです。"],
      [`${h}じ6ぷん`, "ながい はりの すうじ 6を そのまま よんで います。"],
      [`${h}じ15ふん`, "15ふんは、ながい はりが 3の とき です。"],
      [`${nextH(h)}じ30ぷん`, `「${h}じはん」は ${h}じの つぎの 30ぷんです。じは ${h}の ままです。`],
    ]),
    point: "「はん」は 30ぷん",
    steps: [{ title: "はんは 30ぷん", body: `ながい はりが 6まで きて、時計《とけい》の はんぶん。5が 6つで 30ぷんです。${h}じはんは {{${h}じ30ぷん}}。`, back: [B_FUN] }],
  };
}

function ato(r: Rng): QuestionBody {
  const h = r.int(1, 12);
  const k = r.pick([5, 10, 15]);
  const ph = prevH(h);
  const m = 60 - k;
  return {
    prompt: `あと ${fun(k)}で ${h}じに なります。いまは なんじ なんぷんですか。`,
    answer: choice(r, [
      [`${ph}じ${fun(m)}`, `${h}じの ${fun(k)} まえは、まだ ${ph}じ。ながい はりは 12の ${k / 5}つ まえの ${12 - k / 5}で ${fun(m)}です。`],
      [`${h}じ${fun(m)}`, `まだ ${h}じに なって いないので、「じ」は ${ph}です。`],
      [`${h}じ${fun(k)}`, `${h}じ${fun(k)}は、${h}じを すぎて ${fun(k)} たった ときです。`],
      [`${ph}じ${fun(k)}`, `${ph}じ${fun(k)}から ${h}じまでは、${fun(k)}より ずっと ながいです。`],
    ]),
    point: "ちょうどの まえは、まだ 1つ まえの「じ」",
    steps: [
      { title: "ながい はりを もどす", body: `${h}じちょうどは ながい はりが 12。${fun(k)} もどすと、すうじ ${k / 5}つ もどって ${12 - k / 5}。{{${fun(m)}}}です。`, back: [B_FUN] },
      { title: "「じ」を きめる", body: `まだ ${h}じに なって いないので、みじかい はりは ${ph}と ${h}の あいだ。{{${ph}じ${fun(m)}}} です。`, back: [B_AWASE] },
    ],
  };
}

export const E_MATH_1_TOKEI_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小1",
  minutes: 7,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "時計《とけい》の はりを よむ",
      lead: "つぎの もんだいに こたえなさい。",
      style: "mix",
      questions: [
        { id: "chodo", type: "A", difficulty: 1, points: 14, seconds: 45, skill: "知識・技能", generate: chodo },
        { id: "nagai", type: "A", difficulty: 1, points: 14, seconds: 60, skill: "知識・技能", generate: nagai },
        { id: "yomu", type: "A", difficulty: 2, points: 17, seconds: 75, skill: "知識・技能", generate: yomu },
      ],
    },
    {
      title: "時計《とけい》で かんがえる",
      lead: "つぎの もんだいに こたえなさい。",
      style: "mix",
      questions: [
        { id: "han", type: "A", difficulty: 2, points: 17, seconds: 60, skill: "知識・技能", generate: han },
        { id: "hanpun", type: "A", difficulty: 2, points: 17, seconds: 60, skill: "思考・判断・表現", generate: hanpun },
        { id: "ato", type: "A", difficulty: 3, points: 21, seconds: 90, skill: "思考・判断・表現", generate: ato },
      ],
    },
  ],
};
