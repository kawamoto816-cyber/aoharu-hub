// 小2算数「長い長さ（m）」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 長さは cm にそろえた値 (100×m＋cm) で作り、num は calc で検算する (scripts/check-moshi.ts がシード100個で確かめる)。
// ○m○cm で答える問題は選択肢にし、正解は cm にそろえた値から作る (よくある まちがい: 1m＝10cm・100cm を 1m に なおしわすれ)。
// たんい えらびの ものの長さは、ふつうの 大きさ (こくばん 数m、えんぴつ 十数cm、つめ 1cm くらい) にしている。
import type { ChoiceQ, NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-2-m";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_1M = L(1, "1m は 100cm");
const B_MCM = L(2, "1m20cm は 120cm");
const B_TANI = L(3, "ものに 合う たんいを えらぶ");
const B_KEISAN = L(4, "たし算は、同じ たんいどうし");

const num = (ans: number, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [String(ans)], calc, ...(unit ? { unit } : {}) });
/** items の先頭が正解。同じ文字の選択肢はのぞき、r で並べかえる */
function choice(r: Rng, items: [string, string][]): ChoiceQ {
  const seen = new Set<string>();
  const its = items.filter(([o]) => !seen.has(o) && !!seen.add(o));
  const order = r.shuffle(its.map((_, i) => i));
  return { kind: "choice", options: order.map((i) => its[i][0]), why: order.map((i) => its[i][1]), correct: order.indexOf(0) };
}

/** cm の数 → 「1m20cm」(cm が 0 なら「2m」) */
const mcm = (x: number) => `${Math.floor(x / 100)}m${x % 100 ? `${x % 100}cm` : ""}`;

function mToCm(r: Rng): QuestionBody {
  const m = r.int(2, 9);
  if (r.bool()) {
    return {
      prompt: `${100 * m}cmは 何mですか。`,
      answer: num(m, `${100 * m}/100`, "m"),
      point: "100cm＝1m",
      steps: [{ title: "100cmで 1m", body: `${100 * m}cmは 100cmの ${m}つ分。100cm＝1mなので {{${m}m}} です。`, back: [B_1M] }],
    };
  }
  return {
    prompt: `${m}mは 何cmですか。`,
    answer: num(100 * m, `100*${m}`, "cm"),
    point: "1m＝100cm",
    steps: [{ title: "1m＝100cm", body: `1mは 100cm。${m}mは 100cmの ${m}つ分で {{${100 * m}cm}} です。`, trap: "1m＝10cm と しない。1cm＝10mm と まぜないように します。", back: [B_1M] }],
  };
}

function mcmToCm(r: Rng): QuestionBody {
  const m = r.int(1, 4);
  const c = r.bool(0.3) ? r.int(1, 9) : r.int(10, 99);
  return {
    prompt: `${m}m${c}cmは 何cmですか。`,
    answer: num(100 * m + c, `100*${m}+${c}`, "cm"),
    point: "mを cmに なおして、のこりの cmを たす",
    steps: [{ title: "mを cmに", body: `${m}m＝${100 * m}cm。${100 * m}cmと ${c}cmで {{${100 * m + c}cm}} です。`, ...(c < 10 ? { trap: `${m}${c}cm や ${m}0${c}cm と しない。${100 * m}＋${c}です。` } : {}), back: [B_MCM] }],
  };
}

function cmToM(r: Rng): QuestionBody {
  const m = r.int(1, 3);
  const c = r.int(5, 95);
  const v = 100 * m + c;
  return {
    prompt: `${v}cmは、${m}mと 何cmですか。`,
    answer: num(c, `${v}-100*${m}`, "cm"),
    point: "100cmで 1m",
    steps: [{ title: "100cmずつ まとめる", body: `${m}mは ${100 * m}cm。${v}cmから ${100 * m}cmを とると {{${c}cm}}。${v}cm＝${m}m${c}cmです。`, back: [B_MCM] }],
  };
}

const MONO: { name: string; n: number; u: "m" | "cm" | "mm" }[] = [
  { name: "こくばんの よこの 長さ", n: 4, u: "m" },
  { name: "教室の たての 長さ", n: 8, u: "m" },
  { name: "ろうかの 長さ", n: 30, u: "m" },
  { name: "プールの たての 長さ", n: 25, u: "m" },
  { name: "えんぴつの 長さ", n: 17, u: "cm" },
  { name: "ノートの たての 長さ", n: 25, u: "cm" },
  { name: "下じきの よこの 長さ", n: 18, u: "cm" },
  { name: "1円玉の はばの 長さ", n: 20, u: "mm" },
  { name: "けしゴムの あつさ", n: 12, u: "mm" },
  { name: "おはしの 長さ", n: 21, u: "cm" },
];
const TANI_WHY: Record<string, string> = { m: "m は こくばんや ろうかの ような 長い ものに つかいます。", cm: "cm は ノートや えんぴつくらいの ものに つかいます。", mm: "mm は 1cmより みじかい ところまで はかる 小さい ものに つかいます。" };

const RANK: Record<string, number> = { m: 3, cm: 2, mm: 1 };

function tani(r: Rng): QuestionBody {
  const t = r.pick(MONO);
  return {
    prompt: `${t.name}は、およそ ${t.n}□です。□に 入る たんいは どれですか。`,
    answer: choice(r, [t.u, ...(["m", "cm", "mm"] as const).filter((u) => u !== t.u)].map((u): [string, string] => [u, u === t.u ? `${t.n}${u}が ちょうど よい 長さです。${TANI_WHY[u]}` : `${t.n}${u}では ${RANK[u] > RANK[t.u] ? "長すぎ" : "みじかすぎ"}ます。`])),
    point: "長い ものは m、ふつうは cm、小さい ものは mm",
    steps: [{ title: "長さを 思いうかべる", body: `${t.name}を 思いうかべます。${t.n}${t.u}が 合います。{{${t.u}}} です。`, back: [B_TANI] }],
  };
}

function tasu(r: Rng): QuestionBody {
  let a = 0;
  let b = 0;
  do {
    a = 100 + r.step(10, 90, 10);
    b = r.step(30, 90, 10);
  } while ((a % 100) + b < 100);
  const s = a + b;
  return {
    prompt: `${mcm(a)}の ひもと ${b}cmの ひもを あわせた 長さは どれですか。`,
    answer: choice(r, [
      [mcm(s), `cmどうし ${a % 100}＋${b}＝${(a % 100) + b}cm。100cmを 1mに なおして ${mcm(s)}。`],
      [`1m${(a % 100) + b}cm`, `${(a % 100) + b}cmの 中の 100cmを 1mに なおして いません。`],
      [mcm(s - 100), "なおした 1mを たしわすれて います。"],
      [`${1 + b}m${a % 100}cm`, "cmを mに たして しまって います。たんいを そろえます。"],
    ]),
    point: "cmが 100を こえたら、100cmを 1mに",
    steps: [
      { title: "同じ たんいどうし", body: `cmどうしを たします。${a % 100}＋${b}＝${(a % 100) + b}（cm）。`, back: [B_KEISAN] },
      { title: "100cmを 1mに", body: `${(a % 100) + b}cm＝1m${(a % 100) + b - 100 ? `${(a % 100) + b - 100}cm` : ""}。1mと あわせて {{${mcm(s)}}} です。` },
    ],
  };
}

function hiku(r: Rng): QuestionBody {
  const a = r.int(2, 3) * 100;
  const b = r.step(10, 90, 10);
  const d = a - b;
  return {
    prompt: `${a / 100}mの テープから ${b}cm 切りとりました。のこりは どれだけですか。`,
    answer: choice(r, [
      [mcm(d), `${a / 100}m＝${a}cm。${a}−${b}＝${d}cm＝${mcm(d)}。`],
      [`${a / 100}m${100 - b}cm`, `1mを cmに なおした ぶん、mも 1 へります。`],
      [`${a / 100 - 1}m${b}cm`, `${100 - b}cmの はずが ${b}cmに なって います。`],
      [mcm(d - 100), "1m 多く ひいて います。"],
    ]),
    point: "mを cmに なおしてから ひく",
    steps: [
      { title: "cmに そろえる", body: `${a / 100}m＝${a}cm。`, back: [B_1M] },
      { title: "ひく", body: `${a}−${b}＝${d}（cm）。${d}cm＝{{${mcm(d)}}} です。`, back: [B_MCM] },
    ],
  };
}

function monosashi(r: Rng): QuestionBody {
  const k = r.int(3, 6);
  const c = r.int(4, 25);
  const v = 30 * k + c;
  return {
    prompt: `30cmの ものさしで、まどの はばを はかりました。ものさし ${k}つ分と、あと ${c}cm でした。まどの はばは 何cmですか。`,
    answer: num(v, `30*${k}+${c}`, "cm"),
    point: "30cmの いくつ分と のこりを あわせる",
    steps: [
      { title: "ものさし いくつ分", body: `30cmが ${k}つ分で 30×${k}＝${30 * k}（cm）。`, back: [B_1M] },
      { title: "のこりを たす", body: `${30 * k}＋${c}＝{{${v}}}。${v}cm（${mcm(v)}）です。`, back: [B_MCM] },
    ],
  };
}

export const E_MATH_2_M_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小2",
  minutes: 10,
  review: { status: "draft" },
  sections: [
    {
      title: "m と cm",
      lead: "つぎの もんだいに 答えなさい。",
      style: "calc",
      questions: [
        { id: "m-cm", type: "A", difficulty: 1, points: 12, seconds: 45, skill: "知識・技能", generate: mToCm },
        { id: "mcm-cm", type: "A", difficulty: 1, points: 12, seconds: 60, skill: "知識・技能", generate: mcmToCm },
        { id: "cm-m", type: "A", difficulty: 1, points: 12, seconds: 60, skill: "知識・技能", generate: cmToM },
      ],
    },
    {
      title: "たんいと 長さの 計算",
      lead: "つぎの もんだいに 答えなさい。",
      style: "mix",
      questions: [
        { id: "tani", type: "A", difficulty: 2, points: 15, seconds: 60, skill: "思考・判断・表現", generate: tani },
        { id: "tasu", type: "A", difficulty: 2, points: 15, seconds: 90, skill: "知識・技能", generate: tasu },
        { id: "hiku", type: "A", difficulty: 2, points: 15, seconds: 90, skill: "知識・技能", generate: hiku },
      ],
    },
    {
      title: "ものさしで はかる",
      lead: "つぎの もんだいに 答えなさい。",
      style: "word",
      questions: [{ id: "monosashi", type: "A", difficulty: 3, points: 19, seconds: 120, skill: "思考・判断・表現", generate: monosashi }],
    },
  ],
};
