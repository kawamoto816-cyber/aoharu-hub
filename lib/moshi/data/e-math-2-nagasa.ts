// 小2算数「長さ（cm・mm）」の単元模試 (A: 数値を入れかえる生成型)。問題はすべてオリジナル。
// 長さは「cm の数」と「mm の数 (0〜9)」から作り、mm にそろえた値 (10×cm＋mm) で計算する。num は calc で検算 (scripts/check-moshi.ts がシード100個で確かめる)。
// ○cm○mm で答える問題は選択肢にし、正解は mm にそろえた値から作る (よくある まちがい: 1cm＝100mm・くり上げわすれ)。
import type { ChoiceQ, NumQ, QuestionBody, UnitMoshi } from "../types";
import type { Rng } from "../rng";

const U = "e-math-2-nagasa";
const L = (n: number, label: string) => ({ label, href: `/learn/lecture/${U}#lec-s${n}` });
const B_CM = L(1, "1cmの いくつ分");
const B_MM = L(2, "1cmより みじかい 長さは mm");
const B_MATOME = L(3, "cmと mmを まとめて あらわす");
const B_KEISAN = L(4, "長さの 計算は たんいを そろえる");

const num = (ans: number, calc: string, unit?: string): NumQ => ({ kind: "num", answerKind: "num", answer: [String(ans)], calc, ...(unit ? { unit } : {}) });
/** items の先頭が正解。同じ文字の選択肢はのぞき、r で並べかえる */
function choice(r: Rng, items: [string, string][]): ChoiceQ {
  const seen = new Set<string>();
  const its = items.filter(([o]) => !seen.has(o) && !!seen.add(o));
  const order = r.shuffle(its.map((_, i) => i));
  return { kind: "choice", options: order.map((i) => its[i][0]), why: order.map((i) => its[i][1]), correct: order.indexOf(0) };
}

/** mm の数 → 「7cm3mm」(mm が 0 なら「7cm」) */
const cmmm = (x: number) => `${Math.floor(x / 10)}cm${x % 10 ? `${x % 10}mm` : ""}`;

function cmToMm(r: Rng): QuestionBody {
  const c = r.int(2, 19);
  return {
    prompt: `${c}cmは 何mmですか。`,
    answer: num(10 * c, `10*${c}`, "mm"),
    point: "1cm＝10mm",
    steps: [{ title: "1cm＝10mm", body: `1cmは 10mm。${c}cmは 10mmの ${c}${c >= 10 ? "こ" : "つ"}分で {{${10 * c}mm}} です。`, trap: "1cm＝100mm と しない。1cmを 10こに 分けた 1つが 1mmです。", back: [B_CM, B_MM] }],
  };
}

function cmmmToMm(r: Rng): QuestionBody {
  const c = r.int(2, 15);
  const m = r.int(1, 9);
  return {
    prompt: `${c}cm${m}mmは 何mmですか。`,
    answer: num(10 * c + m, `10*${c}+${m}`, "mm"),
    point: "cmを mmに なおして、のこりの mmを たす",
    steps: [
      { title: "cmを mmに", body: `${c}cm＝${10 * c}mm。`, back: [B_MM] },
      { title: "mmを あわせる", body: `${10 * c}mmと ${m}mmで {{${10 * c + m}mm}} です。`, back: [B_MATOME] },
    ],
  };
}

function mmToCm(r: Rng): QuestionBody {
  const x = r.int(21, 149);
  const c = Math.floor(x / 10);
  const m = x % 10 || 5;
  const v = 10 * c + m;
  return {
    prompt: `${v}mmは、${c}cmと 何mmですか。`,
    answer: num(m, `${v}-10*${c}`, "mm"),
    point: "10mmで 1cm",
    steps: [{ title: "10mmずつ まとめる", body: `${c}cmは ${10 * c}mm。${v}mmから ${10 * c}mmを とると {{${m}mm}}。${v}mm＝${c}cm${m}mmです。`, back: [B_MATOME] }],
  };
}

function tasu(r: Rng): QuestionBody {
  let a = 0;
  let b = 0;
  do {
    a = r.int(11, 89);
    b = r.int(11, 59);
  } while ((a % 10) + (b % 10) < 10 || a % 10 === 0 || b % 10 === 0);
  const s = a + b;
  const raw = `${Math.floor(a / 10) + Math.floor(b / 10)}cm${(a % 10) + (b % 10)}mm`;
  return {
    prompt: `${cmmm(a)}の テープと ${cmmm(b)}の テープが あります。2本の 長さを あわせると、どれだけに なりますか。`,
    answer: choice(r, [
      [cmmm(s), `cmどうし、mmどうしを たし、${(a % 10) + (b % 10)}mmを 1cm${(a % 10) + (b % 10) - 10}mm に なおします。`],
      [raw, `${(a % 10) + (b % 10)}mmは 10mmより 長いので、10mmを 1cmに なおします。`],
      [cmmm(s - 10), "くり上げた 1cmを たしわすれて います。"],
      [cmmm(s + 10), "1cmを 2回 たして います。"],
    ]),
    point: "mmが 10を こえたら、10mmを 1cmに",
    steps: [
      { title: "同じ たんいどうし", body: `cmは ${Math.floor(a / 10)}＋${Math.floor(b / 10)}＝${Math.floor(a / 10) + Math.floor(b / 10)}、mmは ${a % 10}＋${b % 10}＝${(a % 10) + (b % 10)}。`, back: [B_KEISAN] },
      { title: "10mmを 1cmに", body: `${(a % 10) + (b % 10)}mm＝1cm${(a % 10) + (b % 10) - 10}mm。答えは {{${cmmm(s)}}} です。` },
    ],
  };
}

function hiku(r: Rng): QuestionBody {
  let a = 0;
  let b = 0;
  do {
    a = r.int(41, 99);
    b = r.int(11, 39);
  } while (a % 10 < b % 10 || a % 10 === 0 || b % 10 === 0 || a - b < 11);
  const d = a - b;
  return {
    prompt: `${cmmm(a)}の リボンから、${cmmm(b)} 切りとりました。のこりの 長さは どれですか。`,
    answer: choice(r, [
      [cmmm(d), `cmどうし ${Math.floor(a / 10)}−${Math.floor(b / 10)}、mmどうし ${a % 10}−${b % 10} を 計算します。`],
      [cmmm(a + b), "たし算に なって います。のこりは ひき算です。"],
      [`${Math.floor(d / 10)}cm${(a % 10) + (b % 10)}mm`, "mmを たして しまって います。"],
      [cmmm(d + 10), "cmの ひき算を まちがえて います。"],
    ]),
    point: "cmどうし、mmどうしを ひく",
    steps: [
      { title: "同じ たんいどうし", body: `cmは ${Math.floor(a / 10)}−${Math.floor(b / 10)}＝${Math.floor(d / 10)}、mmは ${a % 10}−${b % 10}＝${d % 10}。`, back: [B_KEISAN] },
      { title: "答え", body: `のこりは {{${cmmm(d)}}} です。` },
    ],
  };
}

function kurabe(r: Rng): QuestionBody {
  let a = 0;
  let b = 0;
  do {
    a = r.int(31, 99);
    b = r.int(31, 99);
  } while (a === b || a % 10 === 0 || Math.abs(a - b) > 15);
  const [x, y] = r.pick([
    ["えんぴつ", "クレヨン"],
    ["はさみ", "のり"],
    ["スプーン", "フォーク"],
  ] as [string, string][]);
  const win = a > b ? x : y;
  return {
    prompt: `${x}の 長さは ${cmmm(a)}、${y}の 長さは ${b}mm です。どちらが 長いですか。`,
    answer: choice(r, [
      [win, `${cmmm(a)}＝${a}mm。${a}mmと ${b}mmで、${win}の ほうが ${Math.abs(a - b)}mm 長い。`],
      [win === x ? y : x, `たんいを mmに そろえると、${a}mmと ${b}mm。${win}の ほうが 長い。`],
      ["同じ 長さ", `${a}mmと ${b}mmで、同じでは ありません。`],
    ]),
    point: "たんいを そろえてから くらべる",
    steps: [
      { title: "mmに そろえる", body: `${cmmm(a)}＝${Math.floor(a / 10)}0mm＋${a % 10}mm＝${a}mm。`, back: [B_MATOME] },
      { title: "くらべる", body: `${a}mmと ${b}mm。{{${win}}}の ほうが 長い。`, trap: `${b}と ${Math.floor(a / 10)}の 数だけで くらべない。` },
    ],
  };
}

function tsunagu(r: Rng): QuestionBody {
  let a = 0;
  let b = 0;
  do {
    a = r.int(21, 69);
    b = r.int(21, 69);
  } while ((a % 10) + (b % 10) < 10 || a % 10 === 0 || b % 10 === 0);
  return {
    prompt: `${cmmm(a)}の 直線と ${cmmm(b)}の 直線を、まっすぐ つなげて 1本の 直線に しました。ぜんたいの 長さは 何mmですか。`,
    answer: num(a + b, `${a}+${b}`, "mm"),
    point: "mmに そろえてから たす",
    steps: [
      { title: "mmに そろえる", body: `${cmmm(a)}＝${a}mm、${cmmm(b)}＝${b}mm。`, back: [B_MATOME] },
      { title: "たす", body: `${a}＋${b}＝{{${a + b}}}。${a + b}mm（${cmmm(a + b)}）です。`, back: [B_KEISAN] },
    ],
  };
}

export const E_MATH_2_NAGASA_MOSHI: UnitMoshi = {
  unit: U,
  subject: "sansu",
  grade: "小2",
  minutes: 10,
  review: { status: "checked", by: "ai-review", at: "2026-11-04" },
  sections: [
    {
      title: "cmと mm",
      lead: "つぎの もんだいに 答えなさい。",
      style: "calc",
      questions: [
        { id: "cm-mm", type: "A", difficulty: 1, points: 12, seconds: 45, skill: "知識・技能", generate: cmToMm },
        { id: "cmmm-mm", type: "A", difficulty: 1, points: 12, seconds: 60, skill: "知識・技能", generate: cmmmToMm },
        { id: "mm-cm", type: "A", difficulty: 1, points: 12, seconds: 60, skill: "知識・技能", generate: mmToCm },
      ],
    },
    {
      title: "長さの 計算と くらべ方",
      lead: "つぎの もんだいに 答えなさい。",
      style: "mix",
      questions: [
        { id: "tasu", type: "A", difficulty: 2, points: 15, seconds: 90, skill: "知識・技能", generate: tasu },
        { id: "hiku", type: "A", difficulty: 2, points: 15, seconds: 90, skill: "知識・技能", generate: hiku },
        { id: "kurabe", type: "A", difficulty: 2, points: 15, seconds: 90, skill: "思考・判断・表現", generate: kurabe },
      ],
    },
    {
      title: "直線を つなぐ",
      lead: "つぎの もんだいに 答えなさい。",
      style: "word",
      questions: [{ id: "tsunagu", type: "A", difficulty: 3, points: 19, seconds: 120, skill: "思考・判断・表現", generate: tsunagu }],
    },
  ],
};
